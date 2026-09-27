import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import type { CustomFieldDef } from "@/lib/customFields";
import { ProjectForm } from "../ProjectForm";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data: fieldDefinitions } = await supabase
    .from("field_definitions")
    .select("*")
    .eq("content_type", "project")
    .order("sort_order");

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Add project</h1>
      <ProjectForm fieldDefinitions={(fieldDefinitions ?? []) as CustomFieldDef[]} />
    </div>
  );
}
