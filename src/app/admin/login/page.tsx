import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  const supabase = await createAuthServerClient();

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/admin");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pt-24 pb-24 sm:px-8">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-ink-muted">Owner access only — this site has no public sign-up.</p>
      <LoginForm />
    </main>
  );
}
