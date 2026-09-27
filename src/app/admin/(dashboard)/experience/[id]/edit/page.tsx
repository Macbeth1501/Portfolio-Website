import { redirect, notFound } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { ExperienceForm } from "../../ExperienceForm";
import type { Experience } from "@/lib/types";
import type { CustomFieldDef } from "@/lib/customFields";

export const dynamic = "force-dynamic";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const [{ data: row, error }, { data: fieldDefinitions }] = await Promise.all([
    supabase.from("experiences").select("*").eq("id", id).maybeSingle(),
    supabase.from("field_definitions").select("*").eq("content_type", "experience").order("sort_order"),
  ]);
  if (error || !row) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Edit experience</h1>
      <ExperienceForm
        fieldDefinitions={(fieldDefinitions ?? []) as CustomFieldDef[]}
        experience={{
          id: row.id,
          roleTitle: row.role_title,
          organization: row.organization,
          dateRange: row.date_range ?? "",
          locationType: row.location_type as Experience["locationType"],
          description: row.description ?? "",
          mentors: row.mentors ?? [],
          customFields: row.custom_fields ?? [],
        }}
      />
    </div>
  );
}
