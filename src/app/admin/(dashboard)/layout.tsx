import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { SignOutButton } from "@/components/admin/SignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // A valid session alone isn't proof of ownership — check the RLS-backing
  // is_owner() function (supabase/schema.sql) rather than trusting any
  // authenticated user, in case that ever stops being the same thing.
  const { data: isOwner, error: ownerCheckError } = await supabase.rpc("is_owner");
  if (ownerCheckError || !isOwner) redirect("/admin/login");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24 sm:px-8">
      <div className="flex items-baseline justify-between border-b border-line pb-6">
        <div>
          <p className="font-mono text-xs text-ink-muted">Admin</p>
          <p className="mt-1 text-sm text-ink">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
