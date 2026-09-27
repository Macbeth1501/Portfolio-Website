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
    <section aria-labelledby="experience-heading" className="mt-16 sm:mt-24">
      <h2
        id="experience-heading"
        className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink sm:text-3xl"
      >
        Experience
      </h2>

      <ul className="mt-6 divide-y divide-line border-t border-line">
        {experience.map((entry) => (
          <li key={`${entry.organization}-${entry.roleTitle}`} className="py-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium text-ink">{entry.roleTitle}</h3>
              <span className="font-mono text-xs text-ink-muted">{entry.dateRange}</span>
            </div>
            <p className="mt-1 text-sm text-ink-muted">
              {entry.organization} ({locationLabel[entry.locationType]})
            </p>
            <p className="mt-3 max-w-[68ch] text-ink">{entry.description}</p>
            {entry.mentors && entry.mentors.length > 0 ? (
              <p className="mt-3 text-sm text-ink-muted">Mentors: {entry.mentors.join(", ")}</p>
            ) : null}
            <CustomFieldsList fields={entry.customFields} />
          </li>
        ))}
      </ul>
    </section>
  );
}
