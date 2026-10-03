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

async function uploadAchievementImage(
  supabase: Awaited<ReturnType<typeof createAuthServerClient>>,
  file: File,
): Promise<string> {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `achievements/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase!.storage.from("media").upload(path, file, {
    contentType: file.type || undefined,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return path;
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

  let imagePath: string | null = null;
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imagePath = await uploadAchievementImage(supabase, imageFile);
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  const fieldDefinitions = await getFieldDefinitions(supabase);

  const { error } = await supabase.from("achievements").insert({
    ...(imagePath ? { image_path: imagePath } : {}),
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

  const existingImagePath = str(formData, "existing_image_path");
  let imagePath = existingImagePath;
  let imageChanged = false;

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imagePath = await uploadAchievementImage(supabase, imageFile);
    } catch (err) {
      return { error: (err as Error).message };
    }
    imageChanged = true;
    if (existingImagePath) await supabase.storage.from("media").remove([existingImagePath]);
  } else if (formData.get("remove_image") === "on" && existingImagePath) {
    await supabase.storage.from("media").remove([existingImagePath]);
    imagePath = null;
    imageChanged = true;
  }

  const fieldDefinitions = await getFieldDefinitions(supabase);

  const { error } = await supabase
    .from("achievements")
    .update({
      ...(imageChanged ? { image_path: imagePath } : {}),
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

  const { data: row } = await supabase.from("achievements").select("image_path").eq("id", id).maybeSingle();
  const { error } = await supabase.from("achievements").delete().eq("id", id);
  if (error) throw new Error(error.message);
  if (row?.image_path) await supabase.storage.from("media").remove([row.image_path]);

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
