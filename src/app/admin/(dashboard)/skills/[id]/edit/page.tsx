import { redirect, notFound } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { SkillForm } from "../../SkillForm";
import type { CustomFieldDef } from "@/lib/customFields";

export const dynamic = "force-dynamic";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const [{ data: row, error }, { data: fieldDefinitions }] = await Promise.all([
    supabase.from("skills").select("*").eq("id", id).maybeSingle(),
    supabase.from("field_definitions").select("*").eq("content_type", "skill").order("sort_order"),
  ]);
  if (error || !row) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Edit skill</h1>
      <SkillForm
        fieldDefinitions={(fieldDefinitions ?? []) as CustomFieldDef[]}
        skill={{ id: row.id, name: row.name, group: row.group, customFields: row.custom_fields ?? [] }}
      />
    </div>
  );
}
