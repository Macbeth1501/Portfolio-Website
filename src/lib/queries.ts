import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Achievement, Experience, FooterLink, Hero, Project, SkillGroup, SnapshotStat } from "@/lib/types";

export type SiteContent = {
  hero: Hero;
  snapshotStats: SnapshotStat[];
  footerLinks: FooterLink[];
  experience: Experience[];
  projects: Project[];
  skillGroups: SkillGroup[];
  achievements: Achievement[];
};

const EMPTY_CONTENT: SiteContent = {
  hero: { fullName: "Rochan Awasthi", roleLine: "", bio: "" },
  snapshotStats: [],
  footerLinks: [],
  experience: [],
  projects: [],
  skillGroups: [],
  achievements: [],
};

/** Reads every public-site content type from Supabase in one pass. Returns
 * `EMPTY_CONTENT` (never throws) when Supabase isn't configured or a query
 * fails, so the page can render a connection notice instead of crashing. */
export async function getSiteContent(): Promise<{ content: SiteContent; error: string | null }> {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return {
      content: EMPTY_CONTENT,
      error:
        "NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. Follow SETUP.md, then add them to .env.local.",
    };
  }

  const mediaUrl = (path: string | null) =>
    path ? supabase.storage.from("media").getPublicUrl(path).data.publicUrl : undefined;

  const [siteSettings, experienceRows, projectRows, skillRows, achievementRows] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("experiences").select("*").order("sort_order").order("created_at"),
    supabase.from("projects").select("*").order("sort_order").order("created_at"),
    supabase.from("skills").select("*").order("sort_order").order("created_at"),
    supabase.from("achievements").select("*").order("sort_order").order("created_at"),
  ]);

  const firstError =
    siteSettings.error?.message ??
    experienceRows.error?.message ??
    projectRows.error?.message ??
    skillRows.error?.message ??
    achievementRows.error?.message ??
    null;

  if (firstError) {
    return { content: EMPTY_CONTENT, error: firstError };
  }

  if (!siteSettings.data) {
    return {
      content: EMPTY_CONTENT,
      error: "Connected to Supabase, but no row was found in site_settings. Re-run supabase/schema.sql.",
    };
  }

  const hero: Hero = {
    fullName: siteSettings.data.full_name,
    roleLine: siteSettings.data.role_line ?? "",
    bio: siteSettings.data.bio ?? "",
    photo: mediaUrl(siteSettings.data.photo_path),
  };

  const snapshotStats: SnapshotStat[] = siteSettings.data.snapshot_stats ?? [];
  const footerLinks: FooterLink[] = siteSettings.data.contact_links ?? [];

  const experience: Experience[] = (experienceRows.data ?? []).map((row) => ({
    roleTitle: row.role_title,
    organization: row.organization,
    dateRange: row.date_range ?? "",
    locationType: row.location_type,
    description: row.description ?? "",
    mentors: row.mentors ?? [],
    customFields: row.custom_fields ?? [],
  }));

  const projects: Project[] = (projectRows.data ?? []).map((row) => ({
    slug: row.id,
    title: row.title,
    status: row.status,
    dateRange: row.date_range ?? "",
    problem: row.problem ?? "",
    approach: row.approach ?? "",
    result: row.result ?? undefined,
    techStack: row.tech_stack ?? [],
    imageUrl: mediaUrl(row.image_path),
    liveUrl: row.live_url ?? undefined,
    repoUrl: row.repo_url ?? undefined,
    teamNote: row.team_note ?? undefined,
    customFields: row.custom_fields ?? [],
  }));

  const skillGroups: SkillGroup[] = [];
  for (const row of skillRows.data ?? []) {
    const existing = skillGroups.find((g) => g.group === row.group);
    if (existing) {
      existing.skills.push(row.name);
    } else {
      skillGroups.push({ group: row.group, skills: [row.name] });
    }
  }

  const achievements: Achievement[] = (achievementRows.data ?? []).map((row) => ({
    title: row.title,
    result: row.result ?? "",
    context: row.context ?? "",
    date: row.date ?? "",
    customFields: row.custom_fields ?? [],
  }));

  return {
    content: { hero, snapshotStats, footerLinks, experience, projects, skillGroups, achievements },
    error: null,
  };
}
