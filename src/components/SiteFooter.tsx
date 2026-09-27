import { footerLinks } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line py-8 sm:mt-24">
      <nav aria-label="Contact links" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {footerLinks.map((link) => (
          <a key={link.label} href={link.url} className="text-blue underline underline-offset-2 hover:text-blue-deep">
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
