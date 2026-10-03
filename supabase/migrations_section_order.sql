-- Run once in the Supabase SQL editor to let the admin reorder homepage sections.
alter table site_settings add column if not exists section_order jsonb not null default '["experience","achievements","projects","skills"]';
