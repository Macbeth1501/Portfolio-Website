"use client";

import { useActionState, useState } from "react";
import type { Achievement } from "@/lib/types";
import type { CustomFieldDef } from "@/lib/customFields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { CustomFieldInputs } from "@/components/admin/CustomFieldInputs";
import { createAchievement, updateAchievement, type FormState } from "./actions";

const inputClass = "rounded-sm border border-line bg-paper px-3 py-2 text-ink";
const labelClass = "text-sm text-ink-muted";

export function AchievementForm({
  achievement,
  fieldDefinitions,
}: {
  achievement?: Achievement & { id: string; imagePath?: string | null };
  fieldDefinitions: CustomFieldDef[];
}) {
  const isEdit = Boolean(achievement);
  const action = isEdit ? updateAchievement : createAchievement;
  const [state, formAction] = useActionState<FormState, FormData>(action, null);
  const [removeImage, setRemoveImage] = useState(false);

  return (
    <form action={formAction} className="mt-8 flex max-w-xl flex-col gap-5">
      {isEdit ? <input type="hidden" name="id" value={achievement!.id} /> : null}
      {isEdit ? <input type="hidden" name="existing_image_path" value={achievement?.imagePath ?? ""} /> : null}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input id="title" name="title" required defaultValue={achievement?.title} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="result" className={labelClass}>
          Result
        </label>
        <input id="result" name="result" defaultValue={achievement?.result} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="context" className={labelClass}>
          Context
        </label>
        <textarea id="context" name="context" rows={3} defaultValue={achievement?.context} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className={labelClass}>
          Date
        </label>
        <input id="date" name="date" defaultValue={achievement?.date} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="image" className={labelClass}>
          Image (certificate, photo or screenshot)
        </label>
        {isEdit && achievement?.imageUrl ? (
          <div className="mb-2 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={achievement.imageUrl} alt="" className="h-20 w-32 border border-line bg-paper-deep object-contain" />
            <label className="flex items-center gap-2 text-sm text-ink-muted">
              <input
                type="checkbox"
                name="remove_image"
                checked={removeImage}
                onChange={(event) => setRemoveImage(event.target.checked)}
              />
              Remove image
            </label>
          </div>
        ) : null}
        <input id="image" name="image" type="file" accept="image/*" className={inputClass} />
      </div>

      <CustomFieldInputs definitions={fieldDefinitions} values={achievement?.customFields} />

      {state?.error ? <p className="text-sm text-amber-deep">{state.error}</p> : null}

      <div>
        <SubmitButton>{isEdit ? "Save changes" : "Add achievement"}</SubmitButton>
      </div>
    </form>
  );
}
