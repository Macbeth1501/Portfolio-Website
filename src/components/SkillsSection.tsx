import type { SkillGroup } from "@/lib/types";
import { SectionHeading } from "./SectionHeading";
import { formatCustomFieldValue } from "@/lib/customFields";

export function SkillsSection({ skillGroups }: { skillGroups: SkillGroup[] }) {
  if (skillGroups.length === 0) return null;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="mt-16 scroll-mt-8 sm:mt-24">
      <SectionHeading id="skills-heading">Skills</SectionHeading>

      <div className="mt-6 divide-y divide-line">
        {skillGroups.map((group) => (
          <div key={group.group} className="py-4 md:grid md:grid-cols-[9rem_1fr] md:gap-x-8">
            <h3 className="text-sm font-medium text-ink">{group.group}</h3>
            <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 md:mt-0">
              {group.skills.map((skill) => {
                const extras = (skill.customFields ?? []).filter((field) => field.value.length > 0);
                return (
                  <li
                    key={skill.name}
                    className="text-sm text-ink after:text-ink-muted after:content-[','] last:after:content-none"
                  >
                    {skill.name}
                    {extras.map((field) => (
                      <span key={field.key} className="block text-xs text-ink-muted">
                        {field.label}: {formatCustomFieldValue(field)}
                      </span>
                    ))}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
