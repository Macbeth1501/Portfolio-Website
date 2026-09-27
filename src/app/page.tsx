import { Hero } from "@/components/Hero";
import { SnapshotStrip } from "@/components/SnapshotStrip";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { AchievementsSection } from "@/components/AchievementsSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 pb-24 sm:px-8">
      <Hero />
      <SnapshotStrip />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementsSection />
      <SiteFooter />
    </main>
  );
}
