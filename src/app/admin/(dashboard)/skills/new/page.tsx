import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import type { CustomFieldDef } from "@/lib/customFields";
import { SkillForm } from "../SkillForm";

export const dynamic = "force-dynamic";

export default async function NewSkillPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: fieldDefinitions } = await supabase
    .from("field_definitions")
    .select("*")
    .eq("content_type", "skill")
    .order("sort_order");

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Add skill</h1>
      <SkillForm fieldDefinitions={(fieldDefinitions ?? []) as CustomFieldDef[]} />
    </div>
  );
}
