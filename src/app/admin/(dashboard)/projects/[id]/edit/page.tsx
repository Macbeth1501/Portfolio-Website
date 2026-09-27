import { redirect, notFound } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { ProjectForm } from "../../ProjectForm";
import type { ProjectStatus } from "@/lib/types";
import type { CustomFieldDef } from "@/lib/customFields";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const [{ data: row, error }, { data: fieldDefinitions }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).maybeSingle(),
    supabase.from("field_definitions").select("*").eq("content_type", "project").order("sort_order"),
  ]);
  if (error || !row) notFound();

  const mediaUrl = (path: string | null) =>
    path ? supabase.storage.from("media").getPublicUrl(path).data.publicUrl : undefined;

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Edit project</h1>
      <ProjectForm
        fieldDefinitions={(fieldDefinitions ?? []) as CustomFieldDef[]}
        project={{
          id: row.id,
          slug: row.id,
          title: row.title,
          status: row.status as ProjectStatus,
          dateRange: row.date_range ?? "",
          problem: row.problem ?? "",
          approach: row.approach ?? "",
          result: row.result ?? undefined,
          techStack: row.tech_stack ?? [],
          imageUrl: mediaUrl(row.image_path),
          imagePath: row.image_path,
          liveUrl: row.live_url ?? undefined,
          repoUrl: row.repo_url ?? undefined,
          teamNote: row.team_note ?? undefined,
          customFields: row.custom_fields ?? [],
        }}
      />
    </div>
  );
}
