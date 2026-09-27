import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import type { CustomFieldDef } from "@/lib/customFields";
import { ExperienceForm } from "../ExperienceForm";

export const dynamic = "force-dynamic";

export default async function NewExperiencePage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: fieldDefinitions } = await supabase
    .from("field_definitions")
    .select("*")
    .eq("content_type", "experience")
    .order("sort_order");

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Add experience</h1>
      <ExperienceForm fieldDefinitions={(fieldDefinitions ?? []) as CustomFieldDef[]} />
    </div>
  );
}
