import type { ProjectStatus } from "@/lib/types";

const statusCopy: Record<ProjectStatus, string> = {
  live: "Live",
  in_progress: "In progress",
  archived: "Archived",
};

const statusClass: Record<ProjectStatus, string> = {
  live: "text-green-deep border-green/40",
  in_progress: "text-amber-deep border-amber/40",
  archived: "text-ink-muted border-line",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-xs ${statusClass[status]}`}
    >
      {statusCopy[status]}
    </span>
  );
}
