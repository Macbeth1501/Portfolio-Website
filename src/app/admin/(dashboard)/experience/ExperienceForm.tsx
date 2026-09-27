"use client";

import { useActionState } from "react";
import type { Experience } from "@/lib/types";
import type { CustomFieldDef } from "@/lib/customFields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { CustomFieldInputs } from "@/components/admin/CustomFieldInputs";
import { createExperience, updateExperience, type FormState } from "./actions";

const inputClass = "rounded-sm border border-line bg-paper px-3 py-2 text-ink";
const labelClass = "text-sm text-ink-muted";

export function ExperienceForm({
  experience,
  fieldDefinitions,
}: {
  experience?: Experience & { id: string };
  fieldDefinitions: CustomFieldDef[];
}) {
  const isEdit = Boolean(experience);
  const action = isEdit ? updateExperience : createExperience;
  const [state, formAction] = useActionState<FormState, FormData>(action, null);

  return (
    <form action={formAction} className="mt-8 flex max-w-xl flex-col gap-5">
      {isEdit ? <input type="hidden" name="id" value={experience!.id} /> : null}

      <div className="flex flex-col gap-1">
        <label htmlFor="role_title" className={labelClass}>
          Role title
        </label>
        <input
          id="role_title"
          name="role_title"
          required
          defaultValue={experience?.roleTitle}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="organization" className={labelClass}>
          Organization
        </label>
        <input
          id="organization"
          name="organization"
          required
          defaultValue={experience?.organization}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date_range" className={labelClass}>
          Date range
        </label>
        <input id="date_range" name="date_range" defaultValue={experience?.dateRange} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="location_type" className={labelClass}>
          Location type
        </label>
        <select
          id="location_type"
          name="location_type"
          defaultValue={experience?.locationType ?? "on_site"}
          className={inputClass}
        >
          <option value="on_site">On site</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={experience?.description}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="mentors" className={labelClass}>
          Mentors <span className="text-ink-muted">(comma-separated)</span>
        </label>
        <input
          id="mentors"
          name="mentors"
          defaultValue={experience?.mentors?.join(", ")}
          className={inputClass}
        />
      </div>

      <CustomFieldInputs definitions={fieldDefinitions} values={experience?.customFields} />

      {state?.error ? <p className="text-sm text-amber-deep">{state.error}</p> : null}

      <div>
        <SubmitButton>{isEdit ? "Save changes" : "Add experience"}</SubmitButton>
      </div>
    </form>
  );
}
