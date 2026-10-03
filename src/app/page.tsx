import { Fragment } from "react";
import { SECTION_LABELS, type SectionKey } from "@/lib/sections";
import { Hero } from "@/components/Hero";
import { Legend } from "@/components/Legend";
import type { SectionLink } from "@/components/SectionNav";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ContactSection } from "@/components/ContactSection";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const { content, error } = await getSiteContent();
  if (error) console.error(error);

  const present: Record<SectionKey, boolean> = {
    experience: content.experience.length > 0,
    achievements: content.achievements.length > 0,
    projects: content.projects.length > 0,
    skills: content.skillGroups.length > 0,
  };
  const rendered: Record<SectionKey, React.ReactNode> = {
    experience: <ExperienceSection experience={content.experience} />,
    achievements: <AchievementsSection achievements={content.achievements} />,
    projects: <ProjectsSection projects={content.projects} />,
    skills: <SkillsSection skillGroups={content.skillGroups} />,
  };

  const sections: SectionLink[] = content.sectionOrder
    .filter((key) => present[key])
    .map((key) => ({ id: key, label: SECTION_LABELS[key] }));
  if (content.footerLinks.some((link) => link.url.toLowerCase().startsWith("mailto:"))) {
    sections.push({ id: "contact", label: "Contact" });
  }

  return (
    <div className="sheet mx-auto my-3 w-[calc(100%-1.5rem)] max-w-5xl xl:max-w-6xl sm:my-8 sm:w-[calc(100%-4rem)]">
    <main id="main" className="px-5 pb-16 sm:px-10">
      {error ? (
        <p className="mt-8 max-w-xl text-amber-deep">
          Some content could not be loaded right now. Please try again shortly.
        </p>
      ) : null}

      <Hero hero={content.hero} sections={sections} />
      <Legend stats={content.snapshotStats} links={content.footerLinks} />
      {content.sectionOrder.map((key) => (
        <Fragment key={key}>{rendered[key]}</Fragment>
      ))}
      <ContactSection links={content.footerLinks} />
      <SiteFooter links={content.footerLinks} />
    </main>
    </div>
  );
}
