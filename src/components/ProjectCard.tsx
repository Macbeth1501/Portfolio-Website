import Image from "next/image";
import type { Project } from "@/lib/types";
import { isMeasured } from "@/lib/measured";
import { StatusBadge } from "./StatusBadge";
import { CustomFieldsList } from "./CustomFieldsList";
import { linkClass } from "./linkClass";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="py-8 md:grid md:grid-cols-[9rem_1fr] md:gap-x-8">
      <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start md:gap-2 md:pt-1">
        {project.dateRange ? (
          <span className="font-mono text-xs text-ink-muted">{project.dateRange}</span>
        ) : null}
        <StatusBadge status={project.status} />
      </div>

      <div className="mt-3 md:mt-0">
        {project.imageUrl ? (
          <div className="relative mb-4 h-48 w-full overflow-hidden sm:h-64">
            <Image src={project.imageUrl} alt={`Screenshot of ${project.title}`} fill className="object-cover" />
          </div>
        ) : null}

        <h3 className="max-w-[52ch] text-lg font-medium text-ink">{project.title}</h3>

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
              <dd
                className={`mt-1 max-w-[68ch] text-base ${
                  isMeasured(project.result) ? "font-mono text-green-deep" : "text-ink"
                }`}
              >
                {project.result}
              </dd>
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

        <CustomFieldsList fields={project.customFields} />

        {project.liveUrl || project.repoUrl ? (
          <p className="mt-2 flex flex-wrap gap-x-6 text-sm">
            {project.liveUrl ? (
              <a href={project.liveUrl} className={linkClass}>
                View live
              </a>
            ) : null}
            {project.repoUrl ? (
              <a href={project.repoUrl} className={linkClass}>
                Repository
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </article>
  );
}
