"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

const INITIAL_COUNT = 6;

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState(false);

  if (projects.length === 0) return null;

  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const remaining = projects.length - INITIAL_COUNT;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="mt-16 scroll-mt-8 sm:mt-24">
      <SectionHeading id="projects-heading">Projects</SectionHeading>

      <div id="project-list" className="mt-6 divide-y divide-line">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {remaining > 0 ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="project-list"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 inline-flex min-h-11 items-center text-sm text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          {expanded ? "Show fewer projects" : `Show ${remaining} more project${remaining === 1 ? "" : "s"}`}
        </button>
      ) : null}
    </section>
  );
}
