/** Section title with a trailing map-line rule — the sheet's panel heading. */
export function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2
        id={id}
        className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink sm:text-3xl"
      >
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-ink/30" />
    </div>
  );
}
