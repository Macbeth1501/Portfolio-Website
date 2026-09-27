"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import type { Experience } from "@/lib/types";

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

function parseMentors(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

export async function createExperience(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const roleTitle = str(formData, "role_title");
  const organization = str(formData, "organization");
  if (!roleTitle || !organization) return { error: "Role title and organization are required." };

  const { error } = await supabase.from("experiences").insert({
    role_title: roleTitle,
    organization,
    date_range: str(formData, "date_range"),
    location_type: str(formData, "location_type") as Experience["locationType"] | null,
    description: str(formData, "description"),
    mentors: parseMentors(formData.get("mentors")),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function updateExperience(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const id = str(formData, "id");
  if (!id) return { error: "Missing experience id." };

  const roleTitle = str(formData, "role_title");
  const organization = str(formData, "organization");
  if (!roleTitle || !organization) return { error: "Role title and organization are required." };

  const { error } = await supabase
    .from("experiences")
    .update({
      role_title: roleTitle,
      organization,
      date_range: str(formData, "date_range"),
      location_type: str(formData, "location_type") as Experience["locationType"] | null,
      description: str(formData, "description"),
      mentors: parseMentors(formData.get("mentors")),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function deleteExperience(formData: FormData) {
  const supabase = await requireOwner();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/experience");
  revalidatePath("/");
}

export async function moveExperience(id: string, direction: "up" | "down") {
  const supabase = await requireOwner();

  const { data: rows, error } = await supabase
    .from("experiences")
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
    supabase.from("experiences").update({ sort_order: swap.sort_order }).eq("id", current.id),
    supabase.from("experiences").update({ sort_order: current.sort_order }).eq("id", swap.id),
  ]);

  revalidatePath("/admin/experience");
  revalidatePath("/");
}
