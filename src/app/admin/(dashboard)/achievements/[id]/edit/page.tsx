import { redirect, notFound } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { AchievementForm } from "../../AchievementForm";
import type { CustomFieldDef } from "@/lib/customFields";

export const dynamic = "force-dynamic";

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const [{ data: row, error }, { data: fieldDefinitions }] = await Promise.all([
    supabase.from("achievements").select("*").eq("id", id).maybeSingle(),
    supabase.from("field_definitions").select("*").eq("content_type", "achievement").order("sort_order"),
  ]);
  if (error || !row) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Edit achievement</h1>
      <AchievementForm
        fieldDefinitions={(fieldDefinitions ?? []) as CustomFieldDef[]}
        achievement={{
          id: row.id,
          title: row.title,
          result: row.result ?? "",
          context: row.context ?? "",
          date: row.date ?? "",
          customFields: row.custom_fields ?? [],
        }}
      />
    </div>
  );
}
