/** Shared content types — mirror the DB columns in supabase/schema.sql
 * (Section 5 of SPEC.md) so seed data and live DB reads share one shape. */

import type { CustomFieldValue } from "./customFields";

export type ProjectStatus = "live" | "in_progress" | "archived";

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  dateRange: string;
  problem: string;
  approach: string;
  result?: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  teamNote?: string;
  customFields?: CustomFieldValue[];
};

export type Experience = {
  roleTitle: string;
  organization: string;
  dateRange: string;
  locationType: "on_site" | "remote" | "hybrid";
  description: string;
  mentors?: string[];
  customFields?: CustomFieldValue[];
};

export type Skill = {
  name: string;
  customFields?: CustomFieldValue[];
};

export type SkillGroup = {
  group: string;
  skills: Skill[];
};

export type Achievement = {
  title: string;
  result: string;
  context: string;
  date: string;
  customFields?: CustomFieldValue[];
};

export type Hero = {
  fullName: string;
  roleLine: string;
  bio: string;
  photo?: string;
};

export type SnapshotStat = { label: string; value: string };

export type FooterLink = { label: string; url: string };
