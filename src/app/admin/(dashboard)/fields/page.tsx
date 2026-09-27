import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { FieldForm } from "./FieldForm";
import { deleteFieldDefinition } from "./actions";
import type { ContentType, CustomFieldDef } from "@/lib/customFields";

export const dynamic = "force-dynamic";

const SECTIONS: { contentType: ContentType; label: string }[] = [
  { contentType: "project", label: "Projects" },
  { contentType: "experience", label: "Experience" },
  { contentType: "skill", label: "Skills" },
  { contentType: "achievement", label: "Achievements" },
];

export default async function AdminFieldsPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: rows, error } = await supabase
    .from("field_definitions")
    .select("*")
    .order("content_type")
    .order("sort_order");

  if (error) {
    return <p className="mt-8 text-sm text-amber-deep">{error.message}</p>;
  }

  const definitions = (rows ?? []) as CustomFieldDef[];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Manage fields</h1>
      <p className="mt-2 max-w-[60ch] text-sm text-ink-muted">
        Add a custom field to a content type and it appears on that type&apos;s add/edit form, and publicly under
        the entry&apos;s core fields, without any code change.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {SECTIONS.map(({ contentType, label }) => {
          const sectionDefs = definitions.filter((def) => def.content_type === contentType);
          return (
            <section key={contentType}>
              <h2 className="text-lg font-medium text-ink">{label}</h2>

              <ul className="mt-3 divide-y divide-line border-t border-line">
                {sectionDefs.map((def) => (
                  <li key={def.id} className="flex items-center gap-4 py-2">
                    <div className="min-w-0 flex-1">
                      <span className="text-ink">{def.label}</span>{" "}
                      <span className="font-mono text-xs text-ink-muted">({def.type})</span>
                    </div>
                    <form action={deleteFieldDefinition}>
                      <input type="hidden" name="id" value={def.id} />
                      <input type="hidden" name="content_type" value={def.content_type} />
                      <DeleteButton confirmLabel={def.label} />
                    </form>
                  </li>
                ))}
                {sectionDefs.length === 0 ? (
                  <li className="py-2 text-sm text-ink-muted">No custom fields yet.</li>
                ) : null}
              </ul>

              <FieldForm contentType={contentType} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
