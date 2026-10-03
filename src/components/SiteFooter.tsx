import type { FooterLink } from "@/lib/types";
import { linkClass } from "./linkClass";

export function SiteFooter({ links }: { links: FooterLink[] }) {
  return (
    <footer className="mt-16 border-t border-ink/40 py-8 sm:mt-24">
      {links.length > 0 ? (
        <nav aria-label="Contact links" className="flex flex-wrap gap-x-6 text-sm">
          {links.map((link) => (
            <a key={link.label} href={link.url} className={linkClass}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
      <p className="font-mono text-xs text-ink-muted">Nagpur, Maharashtra · 21°09′N 79°05′E · Edition 2026</p>
    </footer>
  );
}
