import { createServerSupabaseClient } from "@/lib/supabase/server";

export const revalidate = 60;

type SiteSettings = {
  full_name: string;
  role_line: string | null;
};

async function getSiteSettings(): Promise<{
  settings: SiteSettings | null;
  error: string | null;
}> {
  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return {
      settings: null,
      error:
        "NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. Follow SETUP.md, then add them to .env.local.",
    };
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select("full_name, role_line")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    return { settings: null, error: error.message };
  }

  if (!data) {
    return {
      settings: null,
      error:
        "Connected to Supabase, but no row was found in site_settings. Re-run supabase/schema.sql.",
    };
  }

  return { settings: data, error: null };
}

export default async function Home() {
  const { settings, error } = await getSiteSettings();

  return (
    <main className="flex flex-1 flex-col items-start justify-center px-6 py-24 sm:px-16">
      <p className="font-mono text-sm text-ink-muted">Phase 1 — pipeline check</p>

      {settings ? (
        <>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink sm:text-5xl">
            {settings.full_name}
          </h1>
          {settings.role_line ? (
            <p className="mt-2 font-mono text-sm text-blue">{settings.role_line}</p>
          ) : null}
          <p className="mt-8 text-green">
            <span aria-hidden="true">✓</span> Supabase connected — read from{" "}
            <code className="font-mono">site_settings</code>.
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold text-ink sm:text-5xl">
            Rochan Awasthi
          </h1>
          <p className="mt-8 max-w-xl text-ink-muted">
            <span className="text-amber" aria-hidden="true">
              ⚠
            </span>{" "}
            Supabase is not connected yet: {error}
          </p>
        </>
      )}
    </main>
  );
}
