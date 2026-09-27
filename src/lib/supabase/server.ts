import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the public anon key.
 *
 * Safe to use in Server Components / route handlers. Protection against
 * unauthorized writes comes from Postgres Row-Level Security policies tied
 * to the authenticated owner's user ID (see supabase/schema.sql), not from
 * keeping this key secret — the anon key is designed to be public.
 */
export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
