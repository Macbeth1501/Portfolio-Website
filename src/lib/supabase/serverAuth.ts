import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Cookie-aware Supabase client for Server Components / Route Handlers under
 * /admin. Unlike `createServerSupabaseClient` (the anon, cookie-less client
 * used for public reads), this one carries the visitor's auth session so
 * `auth.getUser()` / `rpc('is_owner')` reflect who's actually signed in.
 */
export async function createAuthServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component render, where cookies can't be
          // written — middleware.ts is what actually refreshes the session
          // cookie on navigation, so this is safe to ignore here.
        }
      },
    },
  });
}
