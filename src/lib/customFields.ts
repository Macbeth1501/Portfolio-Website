/** Shared helpers for the "manage fields" system (SPEC.md Phase 7 / §5).
 * `field_definitions` (supabase/schema.sql) describes what custom fields
 * exist per content type; each content row's `custom_fields` jsonb column
 * stores the actual `{ key, label, type, value }` entries for that row. */

export type CustomFieldType = "text" | "long_text" | "number" | "date" | "url" | "boolean";

export const CUSTOM_FIELD_TYPES: CustomFieldType[] = ["text", "long_text", "number", "date", "url", "boolean"];

export type ContentType = "project" | "experience" | "skill" | "achievement";

export type CustomFieldDef = {
  id: string;
  content_type: ContentType;
  key: string;
  label: string;
  type: CustomFieldType;
  sort_order: number;
};

export type CustomFieldValue = {
  key: string;
  label: string;
  type: CustomFieldType;
  value: string;
};

export function slugifyKey(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** Reads `custom__<key>` fields out of submitted form data and pairs them
 * with the content type's field definitions to build the `custom_fields`
 * jsonb payload for an insert/update. */
export function buildCustomFieldsPayload(
  definitions: Pick<CustomFieldDef, "key" | "label" | "type">[],
  formData: FormData,
): CustomFieldValue[] {
  return definitions.map((def) => {
    const raw = formData.get(`custom__${def.key}`);
    const value = def.type === "boolean" ? (raw === "on" ? "true" : "false") : typeof raw === "string" ? raw.trim() : "";
    return { key: def.key, label: def.label, type: def.type, value };
  });
}

export function formatCustomFieldValue(field: CustomFieldValue): string {
  if (field.type === "boolean") return field.value === "true" ? "Yes" : "No";
  if (field.type === "date" && field.value) {
    const parsed = new Date(field.value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }
  }
  return field.value;
}
