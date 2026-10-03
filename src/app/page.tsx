import { Hero } from "@/components/Hero";
import { Legend } from "@/components/Legend";
import type { SectionLink } from "@/components/SectionNav";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const { content, error } = await getSiteContent();
  if (error) console.error(error);

  const sections: (SectionLink & { present: boolean })[] = [
    { id: "experience", label: "Experience", present: content.experience.length > 0 },
    { id: "achievements", label: "Achievements", present: content.achievements.length > 0 },
    { id: "projects", label: "Projects", present: content.projects.length > 0 },
    { id: "skills", label: "Skills", present: content.skillGroups.length > 0 },
  ];

  return (
    <div className="sheet mx-auto my-3 w-[calc(100%-1.5rem)] max-w-5xl sm:my-8 sm:w-[calc(100%-4rem)]">
    <main id="main" className="px-5 pb-16 sm:px-10">
      {error ? (
        <p className="mt-8 max-w-xl text-amber-deep">
          Some content could not be loaded right now. Please try again shortly.
        </p>
      ) : null}

      <Hero hero={content.hero} sections={sections.filter((section) => section.present)} />
      <Legend stats={content.snapshotStats} links={content.footerLinks} />
      <ExperienceSection experience={content.experience} />
      <AchievementsSection achievements={content.achievements} />
      <ProjectsSection projects={content.projects} />
      <SkillsSection skillGroups={content.skillGroups} />
      <SiteFooter links={content.footerLinks} />
    </main>
    </div>
  );
}
