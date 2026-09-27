import { Hero } from "@/components/Hero";
import { SnapshotStrip } from "@/components/SnapshotStrip";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const { content, error } = await getSiteContent();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 sm:px-8">
      {error ? (
        <p className="mt-8 max-w-xl text-ink-muted">
          <span className="text-amber-deep" aria-hidden="true">
            ⚠
          </span>{" "}
          Supabase is not connected yet: {error}
        </p>
      ) : null}

      <Hero hero={content.hero} />
      <SnapshotStrip stats={content.snapshotStats} />
      <ExperienceSection experience={content.experience} />
      <ProjectsSection projects={content.projects} />
      <SkillsSection skillGroups={content.skillGroups} />
      <AchievementsSection achievements={content.achievements} />
      <SiteFooter links={content.footerLinks} />
    </main>
  );
}
