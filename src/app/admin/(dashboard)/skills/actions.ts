"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";

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

  const { error } = await supabase.from("skills").insert({ name, group });
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

  const { error } = await supabase.from("skills").update({ name, group }).eq("id", id);
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
