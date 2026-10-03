import Link from "next/link";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { ReorderList } from "@/components/admin/ReorderList";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteExperience, moveExperience } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: rows, error } = await supabase
    .from("experiences")
    .select("id, role_title, organization, date_range")
    .order("sort_order")
    .order("created_at");

  if (error) {
    return <p className="mt-8 text-sm text-amber-deep">{error.message}</p>;
  }

  const items = (rows ?? []).map((entry) => ({
    id: entry.id,
    content: (
      <>
        <div className="min-w-0 flex-1">
          <p className="text-ink">
            {entry.role_title} <span className="text-ink-muted">— {entry.organization}</span>
          </p>
          {entry.date_range ? <p className="mt-1 font-mono text-xs text-ink-muted">{entry.date_range}</p> : null}
        </div>

        <Link
          href={`/admin/experience/${entry.id}/edit`}
          className="font-mono text-xs text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          Edit
        </Link>

        <form action={deleteExperience}>
          <input type="hidden" name="id" value={entry.id} />
          <DeleteButton confirmLabel={entry.role_title} />
        </form>
      </>
    ),
  }));

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="font-mono text-sm text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          Add experience
        </Link>
      </div>

      <ReorderList items={items} moveAction={moveExperience} emptyMessage="No experience entries yet." />
    </div>
  );
}
