import type { Achievement } from "@/lib/types";
import { isMeasured } from "@/lib/measured";
import { BenchmarkMark } from "./BenchmarkMark";
import { FitImage } from "./FitImage";
import { CustomFieldsList } from "./CustomFieldsList";
import { SectionHeading } from "./SectionHeading";

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) return null;

  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="mt-16 scroll-mt-8 sm:mt-24">
      <SectionHeading id="achievements-heading">Achievements</SectionHeading>

      <ul className="mt-6 divide-y divide-line">
        {achievements.map((achievement) => (
          <li key={achievement.title} className="py-6 md:grid md:grid-cols-[9rem_1fr] md:gap-x-8">
            <p className="font-mono text-xs text-ink-muted md:pt-2">{achievement.date}</p>
            <div className="mt-2 md:mt-0">
              <p
                className={`flex items-center gap-2 ${
                  !isMeasured(achievement.result)
                    ? "text-lg text-ink sm:text-xl"
                    : achievement.result.length > 40
                      ? "text-base text-green-deep"
                      : achievement.result.length > 28
                        ? "font-mono text-base text-green-deep"
                        : "font-mono text-lg text-green-deep sm:text-xl"
                }`}
              >
                {isMeasured(achievement.result) ? <BenchmarkMark /> : null}
                <span className="min-w-0 [overflow-wrap:anywhere]">{achievement.result}</span>
              </p>
              <p className="mt-1 text-ink">{achievement.title}</p>
              {achievement.context ? (
                <p className="mt-1 max-w-[68ch] text-sm text-ink-muted">{achievement.context}</p>
              ) : null}
              {achievement.imageUrl ? (
                <div className="mt-4">
                  <FitImage src={achievement.imageUrl} alt={achievement.title} />
                </div>
              ) : null}
              <CustomFieldsList fields={achievement.customFields} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
