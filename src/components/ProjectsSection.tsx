"use client";

import { useState } from "react";
import { projects } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

const INITIAL_COUNT = 6;

export function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const remaining = projects.length - INITIAL_COUNT;

  return (
    <section aria-labelledby="projects-heading" className="mt-16 sm:mt-24">
      <h2
        id="projects-heading"
        className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink sm:text-3xl"
      >
        Projects
      </h2>

      <div className="divide-y divide-line border-t border-line">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {remaining > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 font-mono text-sm text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          {expanded ? "Show fewer projects" : `Show ${remaining} more project${remaining === 1 ? "" : "s"}`}
        </button>
      ) : null}
    </section>
  );
}
