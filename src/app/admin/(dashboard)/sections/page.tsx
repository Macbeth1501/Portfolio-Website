import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { ReorderList } from "@/components/admin/ReorderList";
import { SECTION_LABELS, normalizeSectionOrder } from "@/lib/sections";
import { moveSection } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSectionsPage() {
  const supabase = await createAuthServerClient();
  if (!supabase) redirect("/admin/login");

  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) {
    return <p className="mt-8 text-sm text-amber-deep">{error.message}</p>;
  }

  const missingColumn = !!data && !("section_order" in data);
  const items = normalizeSectionOrder(data?.section_order).map((key) => ({
    id: key,
    content: <p className="flex-1 text-ink">{SECTION_LABELS[key]}</p>,
  }));

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">Section order</h1>
      <p className="mt-2 max-w-prose text-sm text-ink-muted">
        Sets the order of the sections on the homepage and in its Sheet index. Contact always stays last.
      </p>

      {missingColumn ? (
        <p className="mt-4 text-sm text-amber-deep">
          Saving needs a one-time database update: run supabase/migrations_section_order.sql in the Supabase SQL editor.
        </p>
      ) : null}

      <ReorderList items={items} moveAction={moveSection} emptyMessage="No sections." />
    </div>
  );
}
