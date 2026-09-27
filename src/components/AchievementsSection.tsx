import type { Achievement } from "@/lib/types";

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  if (achievements.length === 0) return null;

  return (
    <section aria-labelledby="achievements-heading" className="mt-16 sm:mt-24">
      <h2
        id="achievements-heading"
        className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink sm:text-3xl"
      >
        Achievements
      </h2>

      <ul className="mt-6 divide-y divide-line border-t border-line">
        {achievements.map((achievement) => (
          <li key={achievement.title} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-ink">{achievement.title}</p>
              <span className="font-mono text-xs text-ink-muted">{achievement.date}</span>
            </div>
            <p className="mt-1 font-mono text-sm text-green-deep">{achievement.result}</p>
            {achievement.context ? (
              <p className="mt-1 max-w-[68ch] text-sm text-ink-muted">{achievement.context}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
