import Link from "next/link";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { ReorderButtons } from "@/components/admin/ReorderButtons";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteAchievement, moveAchievement } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: rows, error } = await supabase
    .from("achievements")
    .select("id, title, result, date")
    .order("sort_order")
    .order("created_at");

  if (error) {
    return <p className="mt-8 text-sm text-amber-deep">{error.message}</p>;
  }

  const achievements = rows ?? [];

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Achievements</h1>
        <Link
          href="/admin/achievements/new"
          className="font-mono text-sm text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          Add achievement
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-line border-t border-line">
        {achievements.map((entry, index) => (
          <li key={entry.id} className="flex items-center gap-4 py-4">
            <ReorderButtons
              upAction={moveAchievement.bind(null, entry.id, "up")}
              downAction={moveAchievement.bind(null, entry.id, "down")}
              isFirst={index === 0}
              isLast={index === achievements.length - 1}
            />

            <div className="min-w-0 flex-1">
              <p className="text-ink">{entry.title}</p>
              <p className="mt-1 flex gap-3 font-mono text-xs text-ink-muted">
                {entry.result ? <span className="text-green-deep">{entry.result}</span> : null}
                {entry.date ? <span>{entry.date}</span> : null}
              </p>
            </div>

            <Link
              href={`/admin/achievements/${entry.id}/edit`}
              className="font-mono text-xs text-blue underline underline-offset-2 hover:text-blue-deep"
            >
              Edit
            </Link>

            <form action={deleteAchievement}>
              <input type="hidden" name="id" value={entry.id} />
              <DeleteButton confirmLabel={entry.title} />
            </form>
          </li>
        ))}

        {achievements.length === 0 ? <li className="py-4 text-sm text-ink-muted">No achievements yet.</li> : null}
      </ul>
    </div>
  );
}
