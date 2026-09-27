"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import type { ProjectStatus } from "@/lib/types";
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

function parseTechStack(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function str(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function uploadProjectImage(
  supabase: Awaited<ReturnType<typeof createAuthServerClient>>,
  file: File,
): Promise<string> {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `projects/${crypto.randomUUID()}.${ext}`;
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
    .eq("content_type", "project");
  return data ?? [];
}

async function deleteProjectImage(
  supabase: Awaited<ReturnType<typeof createAuthServerClient>>,
  path: string,
) {
  await supabase!.storage.from("media").remove([path]);
}

export async function createProject(_prevState: FormState, formData: FormData): Promise<FormState> {
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
      imagePath = await uploadProjectImage(supabase, imageFile);
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  const fieldDefinitions = await getFieldDefinitions(supabase);

  const { error } = await supabase.from("projects").insert({
    title,
    status: (str(formData, "status") ?? "in_progress") as ProjectStatus,
    date_range: str(formData, "date_range"),
    problem: str(formData, "problem"),
    approach: str(formData, "approach"),
    result: str(formData, "result"),
    tech_stack: parseTechStack(formData.get("tech_stack")),
    image_path: imagePath,
    live_url: str(formData, "live_url"),
    repo_url: str(formData, "repo_url"),
    team_note: str(formData, "team_note"),
    custom_fields: buildCustomFieldsPayload(fieldDefinitions, formData),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const id = str(formData, "id");
  if (!id) return { error: "Missing project id." };

  const title = str(formData, "title");
  if (!title) return { error: "Title is required." };

  const existingImagePath = str(formData, "existing_image_path");
  let imagePath = existingImagePath;

  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    try {
      imagePath = await uploadProjectImage(supabase, imageFile);
    } catch (err) {
      return { error: (err as Error).message };
    }
    if (existingImagePath) {
      await deleteProjectImage(supabase, existingImagePath);
    }
  }

  const removeImage = formData.get("remove_image") === "on";
  if (removeImage && !imageFile) {
    if (existingImagePath) await deleteProjectImage(supabase, existingImagePath);
    imagePath = null;
  }

  const fieldDefinitions = await getFieldDefinitions(supabase);

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      status: (str(formData, "status") ?? "in_progress") as ProjectStatus,
      date_range: str(formData, "date_range"),
      problem: str(formData, "problem"),
      approach: str(formData, "approach"),
      result: str(formData, "result"),
      tech_stack: parseTechStack(formData.get("tech_stack")),
      image_path: imagePath,
      live_url: str(formData, "live_url"),
      repo_url: str(formData, "repo_url"),
      team_note: str(formData, "team_note"),
      custom_fields: buildCustomFieldsPayload(fieldDefinitions, formData),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await requireOwner();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const { data: row } = await supabase.from("projects").select("image_path").eq("id", id).maybeSingle();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (row?.image_path) {
    await deleteProjectImage(supabase, row.image_path);
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
}

export async function moveProject(id: string, direction: "up" | "down") {
  const supabase = await requireOwner();

  const { data: rows, error } = await supabase
    .from("projects")
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
    supabase.from("projects").update({ sort_order: swap.sort_order }).eq("id", current.id),
    supabase.from("projects").update({ sort_order: current.sort_order }).eq("id", swap.id),
  ]);

  revalidatePath("/admin/projects");
  revalidatePath("/");
}
