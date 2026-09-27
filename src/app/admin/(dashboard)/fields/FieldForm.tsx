"use client";

import { useActionState, useRef, useEffect } from "react";
import { CUSTOM_FIELD_TYPES, type ContentType } from "@/lib/customFields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createFieldDefinition, type FormState } from "./actions";

const inputClass = "rounded-sm border border-line bg-paper px-3 py-2 text-ink";

const typeLabel: Record<string, string> = {
  text: "Text",
  long_text: "Long text",
  number: "Number",
  date: "Date",
  url: "URL",
  boolean: "Yes / No",
};

export function FieldForm({ contentType }: { contentType: ContentType }) {
  const [state, formAction] = useActionState<FormState, FormData>(createFieldDefinition, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state === null) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mt-3 flex flex-wrap items-end gap-3">
      <input type="hidden" name="content_type" value={contentType} />

      <div className="flex flex-col gap-1">
        <label htmlFor={`${contentType}-label`} className="text-xs text-ink-muted">
          New field label
        </label>
        <input id={`${contentType}-label`} name="label" required className={`${inputClass} text-sm`} placeholder="e.g. Co-authors" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={`${contentType}-type`} className="text-xs text-ink-muted">
          Type
        </label>
        <select id={`${contentType}-type`} name="type" defaultValue="text" className={`${inputClass} text-sm`}>
          {CUSTOM_FIELD_TYPES.map((type) => (
            <option key={type} value={type}>
              {typeLabel[type]}
            </option>
          ))}
        </select>
      </div>

      <SubmitButton>Add field</SubmitButton>

      {state?.error ? <p className="w-full text-sm text-amber-deep">{state.error}</p> : null}
    </form>
  );
}
