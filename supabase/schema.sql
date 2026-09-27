-- Rochan Awasthi Portfolio — Supabase schema
-- Maps to SPEC.md Section 5. Safe to re-run: every statement is
-- idempotent (IF NOT EXISTS / OR REPLACE / ON CONFLICT DO NOTHING).
--
-- Run this whole file once in the Supabase SQL Editor (see SETUP.md step 2).

-- ============================================================
-- 0. Extensions
-- ============================================================
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. updated_at trigger helper
-- ============================================================
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- 2. Owner / auth
-- ============================================================
-- Exactly one row per authorized owner account (SPEC.md: "gate /admin to
-- one owner account"). You'll insert a row here in SETUP.md step 3.
create table if not exists app_owner (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table app_owner enable row level security;
-- No policies are defined for app_owner, so it is unreadable/unwritable
-- by anon and authenticated roles alike; only is_owner() (below, as
-- security definer) can see into it.

create or replace function is_owner()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from app_owner where user_id = auth.uid()
  );
$$;

-- ============================================================
-- 3. Content tables (SPEC.md Section 5)
-- ============================================================

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null default 'in_progress' check (status in ('live', 'in_progress', 'archived')),
  date_range text,
  problem text,
  approach text,
  result text,
  tech_stack text[] not null default '{}',
  image_path text,
  live_url text,
  repo_url text,
  team_note text,
  custom_fields jsonb not null default '[]',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  role_title text not null,
  organization text not null,
  date_range text,
  location_type text check (location_type in ('on_site', 'remote', 'hybrid')),
  description text,
  mentors text[] not null default '{}',
  custom_fields jsonb not null default '[]',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  "group" text not null,
  custom_fields jsonb not null default '[]',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  result text,
  context text,
  date text,
  custom_fields jsonb not null default '[]',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Backs the "manage fields" admin control (SPEC.md Phase 7): each row
-- describes one custom field available on one content type's add/edit form.
create table if not exists field_definitions (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('project', 'experience', 'skill', 'achievement')),
  key text not null,
  label text not null,
  type text not null check (type in ('text', 'long_text', 'number', 'date', 'url', 'boolean')),
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  unique (content_type, key)
);

-- Single-record static "settings" sections (Hero, Snapshot stats,
-- Contact/footer) — id is pinned to 1 so there is always exactly one row.
create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  full_name text not null default '',
  role_line text,
  bio text,
  photo_path text,
  snapshot_stats jsonb not null default '[]', -- ordered [{ "label": "...", "value": "..." }]
  contact_links jsonb not null default '[]',  -- [{ "label": "...", "url": "..." }]
  updated_at timestamptz not null default now()
);

-- ============================================================
-- 4. updated_at triggers
-- ============================================================
drop trigger if exists set_updated_at on projects;
create trigger set_updated_at before update on projects
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on experiences;
create trigger set_updated_at before update on experiences
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on skills;
create trigger set_updated_at before update on skills
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on achievements;
create trigger set_updated_at before update on achievements
  for each row execute function set_updated_at();

drop trigger if exists set_updated_at on site_settings;
create trigger set_updated_at before update on site_settings
  for each row execute function set_updated_at();

-- ============================================================
-- 5. Row Level Security — public read, owner-only write
-- ============================================================
alter table projects enable row level security;
alter table experiences enable row level security;
alter table skills enable row level security;
alter table achievements enable row level security;
alter table field_definitions enable row level security;
alter table site_settings enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['projects', 'experiences', 'skills', 'achievements', 'field_definitions', 'site_settings']
  loop
    execute format('drop policy if exists "%1$s_public_read" on %1$s', t);
    execute format('create policy "%1$s_public_read" on %1$s for select using (true)', t);

    execute format('drop policy if exists "%1$s_owner_insert" on %1$s', t);
    execute format('create policy "%1$s_owner_insert" on %1$s for insert with check (is_owner())', t);

    execute format('drop policy if exists "%1$s_owner_update" on %1$s', t);
    execute format('create policy "%1$s_owner_update" on %1$s for update using (is_owner()) with check (is_owner())', t);

    execute format('drop policy if exists "%1$s_owner_delete" on %1$s', t);
    execute format('create policy "%1$s_owner_delete" on %1$s for delete using (is_owner())', t);
  end loop;
end $$;

-- ============================================================
-- 6. Storage bucket for uploaded images
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media_owner_insert" on storage.objects;
create policy "media_owner_insert" on storage.objects
  for insert with check (bucket_id = 'media' and is_owner());

drop policy if exists "media_owner_update" on storage.objects;
create policy "media_owner_update" on storage.objects
  for update using (bucket_id = 'media' and is_owner())
  with check (bucket_id = 'media' and is_owner());

drop policy if exists "media_owner_delete" on storage.objects;
create policy "media_owner_delete" on storage.objects
  for delete using (bucket_id = 'media' and is_owner());

-- ============================================================
-- 7. Seed site_settings (Phase 1: Hero name/role + contact links only —
--    profile.md → the rest of the schema happens in Phase 4)
-- ============================================================
insert into site_settings (id, full_name, role_line, contact_links)
values (
  1,
  'Rochan Shrish Awasthi',
  'AI Intern @ CS Tech AI · Ex-Research Intern @ IIIT Hyderabad',
  '[
    {"label": "Email", "url": "mailto:rochansawasthi@gmail.com"},
    {"label": "GitHub", "url": "https://github.com/Macbeth1501"},
    {"label": "LinkedIn", "url": "https://www.linkedin.com/in/rochan-awasthi-393242302/"},
    {"label": "LeetCode", "url": "https://leetcode.com/u/MACBETH1501/"}
  ]'::jsonb
)
on conflict (id) do nothing;
