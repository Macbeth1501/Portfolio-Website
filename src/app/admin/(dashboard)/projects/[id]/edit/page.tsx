import { redirect, notFound } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { ProjectForm } from "../../ProjectForm";
import type { ProjectStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: row, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error || !row) notFound();

  const mediaUrl = (path: string | null) =>
    path ? supabase.storage.from("media").getPublicUrl(path).data.publicUrl : undefined;

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Edit project</h1>
      <ProjectForm
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
        }}
      />
    </div>
  );
}
