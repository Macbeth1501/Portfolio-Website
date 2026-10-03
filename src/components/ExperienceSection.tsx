import type { Experience } from "@/lib/types";
import { CustomFieldsList } from "./CustomFieldsList";
import { SectionHeading } from "./SectionHeading";

const locationLabel: Record<string, string> = {
  on_site: "On-site",
  remote: "Remote",
  hybrid: "Hybrid",
};

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  if (experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="mt-16 scroll-mt-8 sm:mt-24">
      <SectionHeading id="experience-heading">Experience</SectionHeading>

      <ul className="mt-6 divide-y divide-line">
        {experience.map((entry) => (
          <li
            key={`${entry.organization}-${entry.roleTitle}`}
            className="py-6 md:grid md:grid-cols-[9rem_1fr] md:gap-x-8"
          >
            <div className="text-xs text-ink-muted md:pt-1">
              <p className="font-mono">{entry.dateRange}</p>
              <p className="mt-1">{locationLabel[entry.locationType]}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <h3 className="text-lg font-medium text-ink">{entry.roleTitle}</h3>
              <p className="mt-1 text-base text-ink">{entry.organization}</p>
              <p className="mt-3 max-w-[68ch] text-ink">{entry.description}</p>
              {entry.mentors && entry.mentors.length > 0 ? (
                <p className="mt-3 text-sm text-ink-muted">Mentors: {entry.mentors.join(", ")}</p>
              ) : null}
              <CustomFieldsList fields={entry.customFields} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
