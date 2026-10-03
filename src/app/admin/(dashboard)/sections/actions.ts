"use server";

import { revalidatePath } from "next/cache";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { normalizeSectionOrder } from "@/lib/sections";

async function requireOwner() {
  const supabase = await createAuthServerClient();
  if (!supabase) throw new Error("Supabase is not configured.");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { data: isOwner, error } = await supabase.rpc("is_owner");
  if (error || !isOwner) throw new Error("Not authorized.");

  return supabase;
}

export async function moveSection(id: string, direction: "up" | "down") {
  const supabase = await requireOwner();

  const { data, error } = await supabase.from("site_settings").select("section_order").eq("id", 1).maybeSingle();
  if (error) throw new Error(error.message);

  const order = normalizeSectionOrder(data?.section_order);
  const index = order.findIndex((key) => key === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= order.length) return;
  [order[index], order[swapIndex]] = [order[swapIndex], order[index]];

  const { error: updateError } = await supabase.from("site_settings").update({ section_order: order }).eq("id", 1);
  if (updateError) throw new Error(updateError.message);

  revalidatePath("/admin/sections");
  revalidatePath("/");
}
