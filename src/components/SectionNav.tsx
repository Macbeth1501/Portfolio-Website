export type SectionLink = { id: string; label: string };

/** The sheet index: a small grid diagram of the page's panels, each cell a
 * link — the way a map sheet shows its neighbours. */
export function SectionNav({ sections }: { sections: SectionLink[] }) {
  if (sections.length === 0) return null;

  return (
    <nav aria-label="Sheet index" className="w-full">
      <p className="text-xs text-ink-muted">Sheet index</p>
      <ul className="mt-1 grid grid-cols-2 gap-px border border-ink/40 bg-ink/40">
        {sections.map((section) => (
          <li key={section.id} className="bg-paper">
            <a
              href={`#${section.id}`}
              className="flex min-h-11 items-center px-3 text-sm text-blue underline-offset-2 hover:bg-paper-deep hover:text-blue-deep hover:underline"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
