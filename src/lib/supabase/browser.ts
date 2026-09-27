import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client, used from client components — starting
 * with the /admin auth flow added in Phase 5.
 */
export function createBrowserSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient(url, anonKey);
}
