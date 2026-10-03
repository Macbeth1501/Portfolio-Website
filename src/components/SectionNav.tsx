import { linkClass } from "./linkClass";

export type SectionLink = { id: string; label: string };

/** One quiet line of in-page anchors — no icons, no arrows, not sticky. */
export function SectionNav({ sections }: { sections: SectionLink[] }) {
  if (sections.length === 0) return null;

  return (
    <nav aria-label="Sections" className="mt-2 flex flex-wrap gap-x-6 text-sm">
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`} className={linkClass}>
          {section.label}
        </a>
      ))}
    </nav>
  );
}
