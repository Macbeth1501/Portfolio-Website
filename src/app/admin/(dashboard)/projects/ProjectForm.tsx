"use client";

import { useActionState, useState } from "react";
import type { Project } from "@/lib/types";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createProject, updateProject, type FormState } from "./actions";

const inputClass = "rounded-sm border border-line bg-paper px-3 py-2 text-ink";
const labelClass = "text-sm text-ink-muted";

export function ProjectForm({ project }: { project?: Project & { id: string; imagePath?: string | null } }) {
  const isEdit = Boolean(project);
  const action = isEdit ? updateProject : createProject;
  const [state, formAction] = useActionState<FormState, FormData>(action, null);
  const [removeImage, setRemoveImage] = useState(false);

  return (
    <form action={formAction} className="mt-8 flex max-w-xl flex-col gap-5">
      {isEdit ? <input type="hidden" name="id" value={project!.id} /> : null}
      {isEdit ? (
        <input type="hidden" name="existing_image_path" value={project!.imagePath ?? ""} />
      ) : null}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input id="title" name="title" required defaultValue={project?.title} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className={labelClass}>
          Status
        </label>
        <select id="status" name="status" defaultValue={project?.status ?? "in_progress"} className={inputClass}>
          <option value="live">Live</option>
          <option value="in_progress">In progress</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date_range" className={labelClass}>
          Date range
        </label>
        <input id="date_range" name="date_range" defaultValue={project?.dateRange} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="problem" className={labelClass}>
          Problem
        </label>
        <textarea id="problem" name="problem" rows={3} defaultValue={project?.problem} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="approach" className={labelClass}>
          Approach
        </label>
        <textarea id="approach" name="approach" rows={3} defaultValue={project?.approach} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="result" className={labelClass}>
          Result <span className="text-ink-muted">(leave empty if nothing measured yet)</span>
        </label>
        <input id="result" name="result" defaultValue={project?.result} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="tech_stack" className={labelClass}>
          Tech stack <span className="text-ink-muted">(comma-separated)</span>
        </label>
        <input
          id="tech_stack"
          name="tech_stack"
          defaultValue={project?.techStack.join(", ")}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="image" className={labelClass}>
          Image
        </label>
        {isEdit && project?.imageUrl ? (
          <div className="mb-2 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.imageUrl} alt="" className="h-20 w-32 object-cover" />
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

      <div className="flex flex-col gap-1">
        <label htmlFor="live_url" className={labelClass}>
          Live URL
        </label>
        <input id="live_url" name="live_url" type="url" defaultValue={project?.liveUrl} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="repo_url" className={labelClass}>
          Repository URL
        </label>
        <input id="repo_url" name="repo_url" type="url" defaultValue={project?.repoUrl} className={inputClass} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="team_note" className={labelClass}>
          Team note
        </label>
        <input id="team_note" name="team_note" defaultValue={project?.teamNote} className={inputClass} />
      </div>

      {state?.error ? <p className="text-sm text-amber-deep">{state.error}</p> : null}

      <div>
        <SubmitButton>{isEdit ? "Save changes" : "Add project"}</SubmitButton>
      </div>
    </form>
  );
}
