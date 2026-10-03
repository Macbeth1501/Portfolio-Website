import type { FooterLink } from "@/lib/types";
import { ButtonLink } from "./ButtonLink";
import { SectionHeading } from "./SectionHeading";

/** "Mail me": built from the owner's Email contact link (a mailto: URL set in
 * /admin/settings). Hidden until one exists. */
export function ContactSection({ links }: { links: FooterLink[] }) {
  const email = links.find((link) => link.url.toLowerCase().startsWith("mailto:"));
  if (!email) return null;
  const address = email.url.replace(/^mailto:/i, "").split("?")[0];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mt-16 scroll-mt-8 sm:mt-24">
      <SectionHeading id="contact-heading">Contact</SectionHeading>
      <div className="mt-8 flex flex-col items-center text-center">
        <p className="max-w-[48ch] text-lg text-ink">
          Have a role, a project or a research idea in mind? Send me a note and I will reply.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <ButtonLink href={email.url} variant="primary">
            Email me
          </ButtonLink>
          <span className="font-mono text-sm text-ink-muted">{address}</span>
        </div>
      </div>
    </section>
  );
}
