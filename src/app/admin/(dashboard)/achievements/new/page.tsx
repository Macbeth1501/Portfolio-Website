import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import type { CustomFieldDef } from "@/lib/customFields";
import { AchievementForm } from "../AchievementForm";

export const dynamic = "force-dynamic";

export default async function NewAchievementPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: fieldDefinitions } = await supabase
    .from("field_definitions")
    .select("*")
    .eq("content_type", "achievement")
    .order("sort_order");

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Add achievement</h1>
      <AchievementForm fieldDefinitions={(fieldDefinitions ?? []) as CustomFieldDef[]} />
    </div>
  );
}
