import Link from "next/link";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSkill } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: rows, error } = await supabase
    .from("skills")
    .select("id, name, group")
    .order("sort_order")
    .order("created_at");

  if (error) {
    return <p className="mt-8 text-sm text-amber-deep">{error.message}</p>;
  }

  const skills = rows ?? [];
  const groups = Array.from(new Set(skills.map((skill) => skill.group)));

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="font-mono text-sm text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          Add skill
        </Link>
      </div>

      {groups.map((group) => (
        <div key={group} className="mt-8">
          <h2 className="text-sm font-medium text-ink">{group}</h2>
          <ul className="mt-2 divide-y divide-line border-t border-line">
            {skills
              .filter((skill) => skill.group === group)
              .map((skill) => (
                <li key={skill.id} className="flex items-center gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-ink">{skill.name}</p>
                  </div>

                  <Link
                    href={`/admin/skills/${skill.id}/edit`}
                    className="font-mono text-xs text-blue underline underline-offset-2 hover:text-blue-deep"
                  >
                    Edit
                  </Link>

                  <form action={deleteSkill}>
                    <input type="hidden" name="id" value={skill.id} />
                    <DeleteButton confirmLabel={skill.name} />
                  </form>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {skills.length === 0 ? <p className="mt-8 text-sm text-ink-muted">No skills yet.</p> : null}
    </div>
  );
}
