"use client";

import { useActionState } from "react";
import type { SkillGroup } from "@/lib/types";
import type { CustomFieldDef, CustomFieldValue } from "@/lib/customFields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { CustomFieldInputs } from "@/components/admin/CustomFieldInputs";
import { createSkill, updateSkill, type FormState } from "./actions";

const inputClass = "rounded-sm border border-line bg-paper px-3 py-2 text-ink";
const labelClass = "text-sm text-ink-muted";

const KNOWN_GROUPS: SkillGroup["group"][] = [
  "Languages",
  "ML/DL",
  "LLM/GenAI",
  "Geospatial",
  "Web/Backend",
  "Blockchain",
];

export function SkillForm({
  skill,
  fieldDefinitions,
}: {
  skill?: { id: string; name: string; group: string; customFields?: CustomFieldValue[] };
  fieldDefinitions: CustomFieldDef[];
}) {
  const isEdit = Boolean(skill);
  const action = isEdit ? updateSkill : createSkill;
  const [state, formAction] = useActionState<FormState, FormData>(action, null);

  return (
    <form action={formAction} className="mt-8 flex max-w-xl flex-col gap-5">
      {isEdit ? <input type="hidden" name="id" value={skill!.id} /> : null}

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" name="name" required defaultValue={skill?.name} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="group" className={labelClass}>
          Group <span className="text-ink-muted">(existing or a new domain label)</span>
        </label>
        <input id="group" name="group" required defaultValue={skill?.group} list="skill-groups" className={inputClass} />
        <datalist id="skill-groups">
          {KNOWN_GROUPS.map((group) => (
            <option key={group} value={group} />
          ))}
        </datalist>
      </div>

      <CustomFieldInputs definitions={fieldDefinitions} values={skill?.customFields} />

      {state?.error ? <p className="text-sm text-amber-deep">{state.error}</p> : null}

      <div>
        <SubmitButton>{isEdit ? "Save changes" : "Add skill"}</SubmitButton>
      </div>
    </form>
  );
}
