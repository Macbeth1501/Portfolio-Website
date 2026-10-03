import Link from "next/link";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { StatusBadge } from "@/components/StatusBadge";
import { ReorderList } from "@/components/admin/ReorderList";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProject, moveProject } from "./actions";
import type { ProjectStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: rows, error } = await supabase
    .from("projects")
    .select("id, title, status, date_range")
    .order("sort_order")
    .order("created_at");

  if (error) {
    return <p className="mt-8 text-sm text-amber-deep">{error.message}</p>;
  }

  const items = (rows ?? []).map((project) => ({
    id: project.id,
    content: (
      <>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-ink">{project.title}</p>
            <StatusBadge status={project.status as ProjectStatus} />
            {project.date_range ? (
              <span className="font-mono text-xs text-ink-muted">{project.date_range}</span>
            ) : null}
          </div>
        </div>

        <Link
          href={`/admin/projects/${project.id}/edit`}
          className="font-mono text-xs text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          Edit
        </Link>

        <form action={deleteProject}>
          <input type="hidden" name="id" value={project.id} />
          <DeleteButton confirmLabel={project.title} />
        </form>
      </>
    ),
  }));

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Projects</h1>
        <Link href="/admin/projects/new" className="font-mono text-sm text-blue underline underline-offset-2 hover:text-blue-deep">
          Add project
        </Link>
      </div>

      <ReorderList items={items} moveAction={moveProject} emptyMessage="No projects yet." />
    </div>
  );
}
