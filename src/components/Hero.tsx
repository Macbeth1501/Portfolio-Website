import Image from "next/image";
import type { Hero as HeroData } from "@/lib/types";
import { HeroContours } from "./HeroContours";
import { SectionNav, type SectionLink } from "./SectionNav";

/** Corner registration marks around the photo plate, like a print register. */
function RegistrationMarks() {
  const mark = "absolute h-3 w-3 border-ink/60";
  return (
    <>
      <span aria-hidden="true" className={`${mark} -top-2 -left-2 border-t border-l`} />
      <span aria-hidden="true" className={`${mark} -top-2 -right-2 border-t border-r`} />
      <span aria-hidden="true" className={`${mark} -bottom-2 -left-2 border-b border-l`} />
      <span aria-hidden="true" className={`${mark} -right-2 -bottom-2 border-r border-b`} />
    </>
  );
}

export function Hero({ hero, sections }: { hero: HeroData; sections: SectionLink[] }) {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate grid gap-8 pt-14 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-10 md:pt-20"
    >
      <HeroContours />

      <div>
        <h1 className="hero-settle font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.02] text-ink sm:text-7xl">
          {hero.fullName}
        </h1>
        <p className="hero-settle-delay mt-4 text-base font-medium text-blue">{hero.roleLine}</p>
        <p className="hero-settle-delay mt-5 max-w-[60ch] text-base text-ink sm:text-lg">{hero.bio}</p>
      </div>

      <div className="hero-settle-delay flex flex-col gap-6 sm:flex-row sm:items-start md:flex-col">
        {hero.photo ? (
          <div className="relative h-52 w-44 shrink-0 md:h-64 md:w-full">
            <RegistrationMarks />
            <Image
              src={hero.photo}
              alt={`Portrait of ${hero.fullName}`}
              fill
              sizes="(min-width: 768px) 240px, 176px"
              className="border border-ink/40 object-cover"
              priority
            />
          </div>
        ) : null}
        <SectionNav sections={sections} />
      </div>
    </section>
  );
}
