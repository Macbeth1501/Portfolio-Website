import type { Project } from "@/lib/content";
import { StatusBadge } from "./StatusBadge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="max-w-[52ch] text-lg font-medium text-ink">{project.title}</h3>
        <div className="flex items-center gap-3">
          {project.dateRange ? (
            <span className="font-mono text-xs text-ink-muted">{project.dateRange}</span>
          ) : null}
          <StatusBadge status={project.status} />
        </div>
      </div>

      <dl className="mt-4 space-y-3">
        <div>
          <dt className="text-xs text-ink-muted">Problem</dt>
          <dd className="mt-1 max-w-[68ch] text-ink">{project.problem}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-muted">Approach</dt>
          <dd className="mt-1 max-w-[68ch] text-ink">{project.approach}</dd>
        </div>
        {project.result ? (
          <div>
            <dt className="text-xs text-ink-muted">Result</dt>
            <dd className="mt-1 max-w-[68ch] font-mono text-sm text-green-deep">{project.result}</dd>
          </div>
        ) : null}
      </dl>

      {project.techStack.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {project.teamNote ? <p className="mt-3 text-sm text-ink-muted">{project.teamNote}</p> : null}

      {project.liveUrl || project.repoUrl ? (
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {project.liveUrl ? (
            <a href={project.liveUrl} className="text-blue underline underline-offset-2 hover:text-blue-deep">
              View live
            </a>
          ) : null}
          {project.repoUrl ? (
            <a href={project.repoUrl} className="text-blue underline underline-offset-2 hover:text-blue-deep">
              Repository
            </a>
          ) : null}
        </p>
      ) : null}
    </article>
  );
}
