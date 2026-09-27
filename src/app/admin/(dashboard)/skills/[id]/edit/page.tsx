import { redirect, notFound } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { SkillForm } from "../../SkillForm";

export const dynamic = "force-dynamic";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: row, error } = await supabase.from("skills").select("*").eq("id", id).maybeSingle();
  if (error || !row) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Edit skill</h1>
      <SkillForm skill={{ id: row.id, name: row.name, group: row.group }} />
    </div>
  );
}
