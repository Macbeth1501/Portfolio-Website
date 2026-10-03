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
  const { data } = await supabase!.from("field_definitions").select("key, label, type").eq("content_type", "skill");
  return data ?? [];
}

export async function createSkill(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const name = str(formData, "name");
  const group = str(formData, "group");
  if (!name || !group) return { error: "Name and group are required." };

  const fieldDefinitions = await getFieldDefinitions(supabase);
  const { error } = await supabase
    .from("skills")
    .insert({ name, group, custom_fields: buildCustomFieldsPayload(fieldDefinitions, formData) });
  if (error) return { error: error.message };

  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function updateSkill(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const id = str(formData, "id");
  if (!id) return { error: "Missing skill id." };

  const name = str(formData, "name");
  const group = str(formData, "group");
  if (!name || !group) return { error: "Name and group are required." };

  const fieldDefinitions = await getFieldDefinitions(supabase);
  const { error } = await supabase
    .from("skills")
    .update({ name, group, custom_fields: buildCustomFieldsPayload(fieldDefinitions, formData) })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  const supabase = await requireOwner();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/skills");
  revalidatePath("/");
}

export async function moveSkill(id: string, direction: "up" | "down") {
  const supabase = await requireOwner();

  const { data: current, error: currentError } = await supabase
    .from("skills")
    .select("id, group, sort_order")
    .eq("id", id)
    .single();
  if (currentError || !current) return;

  const { data: rows, error } = await supabase
    .from("skills")
    .select("id, sort_order")
    .eq("group", current.group)
    .order("sort_order")
    .order("created_at");
  if (error) throw new Error(error.message);

  const index = (rows ?? []).findIndex((row) => row.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= (rows ?? []).length) return;

  const swap = rows![swapIndex];

  await Promise.all([
    supabase.from("skills").update({ sort_order: swap.sort_order }).eq("id", current.id),
    supabase.from("skills").update({ sort_order: current.sort_order }).eq("id", swap.id),
  ]);

  revalidatePath("/admin/skills");
  revalidatePath("/");
}
