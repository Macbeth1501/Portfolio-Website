import type { SkillGroup } from "@/lib/types";

export function SkillsSection({ skillGroups }: { skillGroups: SkillGroup[] }) {
  if (skillGroups.length === 0) return null;

  return (
    <section aria-labelledby="skills-heading" className="mt-16 sm:mt-24">
      <h2
        id="skills-heading"
        className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink sm:text-3xl"
      >
        Skills
      </h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.group}>
            <h3 className="text-sm font-medium text-ink">{group.group}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs text-ink-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
