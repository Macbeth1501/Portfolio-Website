const sections = [
  { label: "Projects", description: "Add, edit, reorder, and delete projects." },
  { label: "Experience", description: "Add, edit, reorder, and delete experience entries." },
  { label: "Skills", description: "Add, edit, and delete skills, grouped by domain." },
  { label: "Achievements", description: "Add, edit, reorder, and delete achievements." },
  { label: "Site settings", description: "Edit Hero, Snapshot stats, and Footer/contact links." },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Dashboard</h1>
      <p className="mt-2 max-w-[60ch] text-sm text-ink-muted">
        Signed in and gated correctly. Content editing (add/edit/delete, image upload, reordering) lands in
        Phase 6 — for now this confirms only an owner can reach /admin.
      </p>

      <ul className="mt-8 divide-y divide-line border-t border-line">
        {sections.map((section) => (
          <li key={section.label} className="py-4">
            <p className="text-ink">{section.label}</p>
            <p className="mt-1 text-sm text-ink-muted">{section.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
