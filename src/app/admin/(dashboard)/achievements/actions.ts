"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { buildCustomFieldsPayload } from "@/lib/customFields";

export type FormState = { error: string } | null;

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

function str(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function getFieldDefinitions(supabase: Awaited<ReturnType<typeof createAuthServerClient>>) {
  const { data } = await supabase!
    .from("field_definitions")
    .select("key, label, type")
    .eq("content_type", "achievement");
  return data ?? [];
}

export async function createAchievement(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const title = str(formData, "title");
  if (!title) return { error: "Title is required." };

  const fieldDefinitions = await getFieldDefinitions(supabase);

  const { error } = await supabase.from("achievements").insert({
    title,
    result: str(formData, "result"),
    context: str(formData, "context"),
    date: str(formData, "date"),
    custom_fields: buildCustomFieldsPayload(fieldDefinitions, formData),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/achievements");
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function updateAchievement(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const id = str(formData, "id");
  if (!id) return { error: "Missing achievement id." };

  const title = str(formData, "title");
  if (!title) return { error: "Title is required." };

  const fieldDefinitions = await getFieldDefinitions(supabase);

  const { error } = await supabase
    .from("achievements")
    .update({
      title,
      result: str(formData, "result"),
      context: str(formData, "context"),
      date: str(formData, "date"),
      custom_fields: buildCustomFieldsPayload(fieldDefinitions, formData),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/achievements");
  revalidatePath("/");
  redirect("/admin/achievements");
}

export async function deleteAchievement(formData: FormData) {
  const supabase = await requireOwner();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const { error } = await supabase.from("achievements").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/achievements");
  revalidatePath("/");
}

export async function moveAchievement(id: string, direction: "up" | "down") {
  const supabase = await requireOwner();

  const { data: rows, error } = await supabase
    .from("achievements")
    .select("id, sort_order")
    .order("sort_order")
    .order("created_at");
  if (error) throw new Error(error.message);

  const index = (rows ?? []).findIndex((row) => row.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= (rows ?? []).length) return;

  const current = rows![index];
  const swap = rows![swapIndex];

  await Promise.all([
    supabase.from("achievements").update({ sort_order: swap.sort_order }).eq("id", current.id),
    supabase.from("achievements").update({ sort_order: current.sort_order }).eq("id", swap.id),
  ]);

  revalidatePath("/admin/achievements");
  revalidatePath("/");
}
