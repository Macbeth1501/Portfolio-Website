import type { FooterLink, SnapshotStat } from "@/lib/types";
import { ButtonLink } from "./ButtonLink";

/** The map legend: snapshot stats and contact links in one ruled box. */
export function Legend({ stats, links }: { stats: SnapshotStat[]; links: FooterLink[] }) {
  if (stats.length === 0 && links.length === 0) return null;

  return (
    <section aria-label="Legend" className="mt-10 border border-ink/40 sm:mt-14">
      {stats.length > 0 ? (
        <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 bg-paper px-4 py-3">
              <dt className="text-xs text-ink-muted">{stat.label}</dt>
              <dd className="font-mono text-base text-ink sm:text-lg">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {links.length > 0 ? (
        <nav
          aria-label="Contact"
          className={`grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-3 p-4 ${stats.length > 0 ? "border-t border-ink/40" : ""}`}
        >
          {links.map((link) => (
            <ButtonLink key={link.label} href={link.url}>
              {link.label}
            </ButtonLink>
          ))}
        </nav>
      ) : null}
    </section>
  );
}
