"use server";

import { revalidatePath } from "next/cache";
import { createAuthServerClient } from "@/lib/supabase/serverAuth";
import { slugifyKey, type ContentType, type CustomFieldType } from "@/lib/customFields";

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

const CONTENT_TYPES: ContentType[] = ["project", "experience", "skill", "achievement"];
const REVALIDATE_PATHS: Record<ContentType, string> = {
  project: "/admin/projects",
  experience: "/admin/experience",
  skill: "/admin/skills",
  achievement: "/admin/achievements",
};

export async function createFieldDefinition(_prevState: FormState, formData: FormData): Promise<FormState> {
  let supabase;
  try {
    supabase = await requireOwner();
  } catch (err) {
    return { error: (err as Error).message };
  }

  const contentType = formData.get("content_type");
  const label = formData.get("label");
  const type = formData.get("type");

  if (typeof contentType !== "string" || !CONTENT_TYPES.includes(contentType as ContentType)) {
    return { error: "Invalid content type." };
  }
  if (typeof label !== "string" || label.trim().length === 0) {
    return { error: "Field label is required." };
  }
  if (typeof type !== "string") {
    return { error: "Field type is required." };
  }

  const key = slugifyKey(label);
  if (!key) return { error: "Field label must contain at least one letter or number." };

  const { count } = await supabase
    .from("field_definitions")
    .select("id", { count: "exact", head: true })
    .eq("content_type", contentType);

  const { error } = await supabase.from("field_definitions").insert({
    content_type: contentType as ContentType,
    key,
    label: label.trim(),
    type: type as CustomFieldType,
    sort_order: count ?? 0,
  });

  if (error) return { error: error.code === "23505" ? "A field with that name already exists on this type." : error.message };

  revalidatePath("/admin/fields");
  revalidatePath(REVALIDATE_PATHS[contentType as ContentType]);
  return null;
}

export async function deleteFieldDefinition(formData: FormData) {
  const supabase = await requireOwner();
  const id = formData.get("id");
  const contentType = formData.get("content_type");
  if (typeof id !== "string") return;

  const { error } = await supabase.from("field_definitions").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/fields");
  if (typeof contentType === "string" && contentType in REVALIDATE_PATHS) {
    revalidatePath(REVALIDATE_PATHS[contentType as ContentType]);
  }
}
