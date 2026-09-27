import { redirect, notFound } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { AchievementForm } from "../../AchievementForm";

export const dynamic = "force-dynamic";

export default async function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: row, error } = await supabase.from("achievements").select("*").eq("id", id).maybeSingle();
  if (error || !row) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Edit achievement</h1>
      <AchievementForm
        achievement={{
          id: row.id,
          title: row.title,
          result: row.result ?? "",
          context: row.context ?? "",
          date: row.date ?? "",
        }}
      />
    </div>
  );
}
