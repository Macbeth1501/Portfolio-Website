import type { SnapshotStat } from "@/lib/types";

export function SnapshotStrip({ stats }: { stats: SnapshotStat[] }) {
  if (stats.length === 0) return null;

  return (
    <dl className="mt-10 grid grid-cols-2 gap-y-4 border-y border-line py-4 sm:mt-14 sm:flex sm:flex-wrap sm:divide-x sm:divide-line">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1 sm:px-6 sm:first:pl-0 sm:last:pr-0">
          <dt className="text-xs text-ink-muted">{stat.label}</dt>
          <dd className="font-mono text-sm text-ink sm:text-base">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
