import { readLinks } from "@/lib/url";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: row, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error || !row) {
    return <p className="mt-8 text-sm text-amber-deep">{error?.message ?? "site_settings row not found."}</p>;
  }

  const photoUrl = row.photo_path
    ? supabase.storage.from("media").getPublicUrl(row.photo_path).data.publicUrl
    : undefined;

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Site settings</h1>
      <p className="mt-2 max-w-[60ch] text-sm text-ink-muted">Edit Hero, Snapshot stats, and Footer/contact links.</p>
      <SettingsForm
        settings={{
          fullName: row.full_name,
          roleLine: row.role_line ?? "",
          bio: row.bio ?? "",
          photoUrl,
          photoPath: row.photo_path,
          snapshotStats: row.snapshot_stats ?? [],
          contactLinks: readLinks(row.contact_links),
        }}
      />
    </div>
  );
}
