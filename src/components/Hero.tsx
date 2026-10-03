import Image from "next/image";
import type { FooterLink, Hero as HeroData } from "@/lib/types";
import { linkClass } from "./linkClass";

export function Hero({ hero, links }: { hero: HeroData; links: FooterLink[] }) {
  return (
    <section aria-label="Introduction" className="flex flex-col gap-6 pt-16 sm:flex-row sm:items-start sm:gap-10 sm:pt-24">
      <div className="flex-1">
        <h1 className="hero-settle font-[family-name:var(--font-display)] text-4xl font-semibold text-ink sm:text-6xl">
          {hero.fullName}
        </h1>
        <p className="hero-settle-delay mt-3 text-base text-blue">{hero.roleLine}</p>
        <p className="hero-settle-delay mt-5 max-w-[62ch] text-base text-ink sm:text-lg">{hero.bio}</p>
        {links.length > 0 ? (
          <nav aria-label="Contact" className="hero-settle-delay mt-3 flex flex-wrap gap-x-6 text-sm">
            {links.map((link) => (
              <a key={link.label} href={link.url} className={linkClass}>
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>

      {hero.photo ? (
        <div className="hero-settle-delay relative h-48 w-40 shrink-0 self-start overflow-hidden sm:mt-2 sm:ml-auto sm:h-56 sm:w-44">
          <Image
            src={hero.photo}
            alt={`Portrait of ${hero.fullName}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}
    </section>
  );
}
