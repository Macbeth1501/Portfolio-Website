import { formatCustomFieldValue, type CustomFieldValue } from "@/lib/customFields";

/** Renders any `custom_fields` an entry carries, generically and formatted
 * by their declared type — so a brand-new field defined in /admin/fields
 * shows up here with no code change (SPEC.md Phase 7). */
export function CustomFieldsList({ fields }: { fields?: CustomFieldValue[] }) {
  const populated = (fields ?? []).filter((field) => field.value.length > 0);
  if (populated.length === 0) return null;

  return (
    <dl className="mt-3 space-y-2">
      {populated.map((field) => (
        <div key={field.key}>
          <dt className="text-xs text-ink-muted">{field.label}</dt>
          <dd className="mt-1 max-w-[68ch] text-sm text-ink">{formatCustomFieldValue(field)}</dd>
        </div>
      ))}
    </dl>
  );
}
