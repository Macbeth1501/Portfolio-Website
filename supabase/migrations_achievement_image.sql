-- Run once in the Supabase SQL editor to add images to achievements.
alter table achievements add column if not exists image_path text;
