import Link from "next/link";

const sections = [
  { label: "Projects", href: "/admin/projects", description: "Add, edit, reorder, and delete projects." },
  { label: "Experience", href: "/admin/experience", description: "Add, edit, reorder, and delete experience entries." },
  { label: "Skills", href: "/admin/skills", description: "Add, edit, and delete skills, grouped by domain." },
  { label: "Achievements", href: "/admin/achievements", description: "Add, edit, reorder, and delete achievements." },
  { label: "Manage fields", href: "/admin/fields", description: "Define custom fields that appear on each type's form and publicly." },
  { label: "Site settings", href: null, description: "Edit Hero, Snapshot stats, and Footer/contact links." },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Dashboard</h1>
      <p className="mt-2 max-w-[60ch] text-sm text-ink-muted">
        Projects, Experience, Skills, and Achievements have full add/edit/delete and reordering (Projects
        also has image upload), plus custom fields via Manage fields. Site settings editability is Phase 8.
      </p>

      <ul className="mt-8 divide-y divide-line border-t border-line">
        {sections.map((section) => (
          <li key={section.label} className="py-4">
            {section.href ? (
              <Link href={section.href} className="text-blue underline underline-offset-2 hover:text-blue-deep">
                {section.label}
              </Link>
            ) : (
              <p className="text-ink">{section.label}</p>
            )}
            <p className="mt-1 text-sm text-ink-muted">{section.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
