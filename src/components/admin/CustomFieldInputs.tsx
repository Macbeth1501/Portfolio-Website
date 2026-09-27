import type { CustomFieldDef, CustomFieldValue } from "@/lib/customFields";

const inputClass = "rounded-sm border border-line bg-paper px-3 py-2 text-ink";
const labelClass = "text-sm text-ink-muted";

const htmlInputType: Record<string, string> = {
  text: "text",
  number: "number",
  date: "date",
  url: "url",
};

export function CustomFieldInputs({
  definitions,
  values,
}: {
  definitions: CustomFieldDef[];
  values?: CustomFieldValue[];
}) {
  if (definitions.length === 0) return null;

  return (
    <>
      {definitions.map((def) => {
        const existing = values?.find((value) => value.key === def.key);
        const name = `custom__${def.key}`;

        if (def.type === "boolean") {
          return (
            <label key={def.id} className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" name={name} defaultChecked={existing?.value === "true"} />
              {def.label}
            </label>
          );
        }

        if (def.type === "long_text") {
          return (
            <div key={def.id} className="flex flex-col gap-1">
              <label htmlFor={name} className={labelClass}>
                {def.label}
              </label>
              <textarea id={name} name={name} rows={3} defaultValue={existing?.value} className={inputClass} />
            </div>
          );
        }

        return (
          <div key={def.id} className="flex flex-col gap-1">
            <label htmlFor={name} className={labelClass}>
              {def.label}
            </label>
            <input
              id={name}
              name={name}
              type={htmlInputType[def.type] ?? "text"}
              defaultValue={existing?.value}
              className={inputClass}
            />
          </div>
        );
      })}
    </>
  );
}
