"use server";

import { revalidatePath } from "next/cache";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";

export type FormState = { error: string } | { success: true; savedAt: number } | null;

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

function zipPairs(formData: FormData, labelKey: string, valueKey: string): { label: string; value: string }[] {
  const labels = formData.getAll(labelKey);
  const values = formData.getAll(valueKey);
  const pairs: { label: string; value: string }[] = [];
  for (let i = 0; i < labels.length; i++) {
    const label = typeof labels[i] === "string" ? (labels[i] as string).trim() : "";
    const value = typeof values[i] === "string" ? (values[i] as string).trim() : "";
    if (label && value) pairs.push({ label, value });
  }
  return pairs;
}

async function uploadHeroPhoto(supabase: Awaited<ReturnType<typeof createAuthServerClient>>, file: File) {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `site/hero-${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase!.storage.from("media").upload(path, file, {
    contentType: file.type || undefined,
  });
  if (error) throw new Error(`Photo upload failed: ${error.message}`);
  return path;
}

export async function updateSiteSettings(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const fullName = str(formData, "full_name");
  if (!fullName) return { error: "Full name is required." };

  const existingPhotoPath = str(formData, "existing_photo_path");
  let photoPath = existingPhotoPath;

  const photoFile = formData.get("photo");
  if (photoFile instanceof File && photoFile.size > 0) {
    try {
      photoPath = await uploadHeroPhoto(supabase, photoFile);
    } catch (err) {
      return { error: (err as Error).message };
    }
    if (existingPhotoPath) {
      await supabase.storage.from("media").remove([existingPhotoPath]);
    }
  }

  const removePhoto = formData.get("remove_photo") === "on";
  if (removePhoto && !photoFile) {
    if (existingPhotoPath) await supabase.storage.from("media").remove([existingPhotoPath]);
    photoPath = null;
  }

  const snapshotStats = zipPairs(formData, "stat_label", "stat_value");
  const contactLinks = zipPairs(formData, "link_label", "link_url");

  const { error } = await supabase
    .from("site_settings")
    .update({
      full_name: fullName,
      role_line: str(formData, "role_line"),
      bio: str(formData, "bio"),
      photo_path: photoPath,
      snapshot_stats: snapshotStats,
      contact_links: contactLinks,
    })
    .eq("id", 1);

  if (error) return { error: error.message };

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true, savedAt: Date.now() };
}
