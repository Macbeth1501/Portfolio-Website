"use client";

import { useActionState } from "react";
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
  achievement?: Achievement & { id: string };
  fieldDefinitions: CustomFieldDef[];
}) {
  const isEdit = Boolean(achievement);
  const action = isEdit ? updateAchievement : createAchievement;
  const [state, formAction] = useActionState<FormState, FormData>(action, null);

  return (
    <form action={formAction} className="mt-8 flex max-w-xl flex-col gap-5">
      {isEdit ? <input type="hidden" name="id" value={achievement!.id} /> : null}

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

      <CustomFieldInputs definitions={fieldDefinitions} values={achievement?.customFields} />

      {state?.error ? <p className="text-sm text-amber-deep">{state.error}</p> : null}

      <div>
        <SubmitButton>{isEdit ? "Save changes" : "Add achievement"}</SubmitButton>
      </div>
    </form>
  );
}
