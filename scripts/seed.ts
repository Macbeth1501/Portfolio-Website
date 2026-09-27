/**
 * One-time seed script (SPEC.md Phase 4): writes the content already
 * reviewed in `src/lib/content.ts` into Supabase, replacing what's there.
 * Safe to re-run — each table is cleared before it's re-inserted.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (Project Settings → API
 * → service_role — NOT the anon key, this one bypasses Row Level Security).
 * Never commit that key or use it client-side; remove it from .env.local
 * once you're done seeding if you'd rather not keep it around.
 *
 * Run with: npm run seed
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
import { achievements, experience, footerLinks, hero, projects, skillGroups, snapshotStats } from "../src/lib/content";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local. See scripts/seed.ts for what's needed."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey);

async function replaceTable(table: string, rows: Record<string, unknown>[]) {
  const { error: deleteError } = await supabase.from(table).delete().not("id", "is", null);
  if (deleteError) throw new Error(`${table}: delete failed — ${deleteError.message}`);

  if (rows.length === 0) return;

  const { error: insertError } = await supabase.from(table).insert(rows);
  if (insertError) throw new Error(`${table}: insert failed — ${insertError.message}`);
}

async function main() {
  const { error: settingsError } = await supabase
    .from("site_settings")
    .upsert(
      {
        id: 1,
        full_name: hero.fullName,
        role_line: hero.roleLine,
        bio: hero.bio,
        snapshot_stats: snapshotStats,
        contact_links: footerLinks,
      },
      { onConflict: "id" }
    );
  if (settingsError) throw new Error(`site_settings: upsert failed — ${settingsError.message}`);
  console.log("✓ site_settings");

  await replaceTable(
    "experiences",
    experience.map((entry, index) => ({
      role_title: entry.roleTitle,
      organization: entry.organization,
      date_range: entry.dateRange,
      location_type: entry.locationType,
      description: entry.description,
      mentors: entry.mentors ?? [],
      sort_order: index,
    }))
  );
  console.log(`✓ experiences (${experience.length})`);

  await replaceTable(
    "projects",
    projects.map((project, index) => ({
      title: project.title,
      status: project.status,
      date_range: project.dateRange,
      problem: project.problem,
      approach: project.approach,
      result: project.result ?? null,
      tech_stack: project.techStack,
      live_url: project.liveUrl ?? null,
      repo_url: project.repoUrl ?? null,
      team_note: project.teamNote ?? null,
      sort_order: index,
    }))
  );
  console.log(`✓ projects (${projects.length})`);

  const skillRows = skillGroups.flatMap((group, groupIndex) =>
    group.skills.map((skill, skillIndex) => ({
      name: skill,
      group: group.group,
      sort_order: groupIndex * 1000 + skillIndex,
    }))
  );
  await replaceTable("skills", skillRows);
  console.log(`✓ skills (${skillRows.length})`);

  await replaceTable(
    "achievements",
    achievements.map((achievement, index) => ({
      title: achievement.title,
      result: achievement.result,
      context: achievement.context,
      date: achievement.date,
      sort_order: index,
    }))
  );
  console.log(`✓ achievements (${achievements.length})`);

  console.log("\nSeed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
