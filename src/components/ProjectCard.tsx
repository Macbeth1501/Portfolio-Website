import { FitImage } from "./FitImage";
import type { Project } from "@/lib/types";
import { isMeasured } from "@/lib/measured";
import { StatusBadge } from "./StatusBadge";
import { CustomFieldsList } from "./CustomFieldsList";
import { linkClass } from "./linkClass";
import { ContourPlate } from "./ContourPlate";
import { BenchmarkMark } from "./BenchmarkMark";

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
        <div className="mb-4">
          {project.imageUrl ? (
            <FitImage src={project.imageUrl} alt={`Screenshot of ${project.title}`} />
          ) : (
            <ContourPlate seed={project.slug} />
          )}
        </div>

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
                className={`mt-1 flex max-w-[68ch] items-start gap-2 text-base ${
                  !isMeasured(project.result)
                    ? "text-ink"
                    : project.result.length <= 40
                      ? "font-mono text-green-deep"
                      : "text-green-deep"
                }`}
              >
                {isMeasured(project.result) ? <BenchmarkMark className="mt-1.5" /> : null}
                <span>{project.result}</span>
              </dd>
            </div>
          ) : null}
        </dl>

        {project.techStack.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
            {project.techStack.map((tag) => (
              <li
                key={tag}
                className="text-sm text-ink-muted after:content-[','] last:after:content-none"
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
