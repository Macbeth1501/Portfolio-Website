import type { Experience } from "@/lib/types";
import { CustomFieldsList } from "./CustomFieldsList";

const locationLabel: Record<string, string> = {
  on_site: "On-site",
  remote: "Remote",
  hybrid: "Hybrid",
};

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  if (experience.length === 0) return null;

  return (
    <section id="experience" aria-labelledby="experience-heading" className="mt-16 scroll-mt-8 sm:mt-24">
      <h2
        id="experience-heading"
        className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink sm:text-3xl"
      >
        Experience
      </h2>

      <ul className="mt-6 divide-y divide-line border-t border-line">
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
