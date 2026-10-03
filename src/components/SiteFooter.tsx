import type { FooterLink } from "@/lib/types";
import { linkClass } from "./linkClass";

export function SiteFooter({ links }: { links: FooterLink[] }) {
  return (
    <footer className="mt-16 border-t border-line py-8 sm:mt-24">
      <nav aria-label="Contact links" className="flex flex-wrap gap-x-6 text-sm">
        {links.map((link) => (
          <a key={link.label} href={link.url} className={linkClass}>
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
