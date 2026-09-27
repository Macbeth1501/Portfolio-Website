"use client";

import { useActionState, useState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { updateSiteSettings, type FormState } from "./actions";

const inputClass = "rounded-sm border border-line bg-paper px-3 py-2 text-ink";
const labelClass = "text-sm text-ink-muted";

type Pair = { label: string; value: string };

export function SettingsForm({
  settings,
}: {
  settings: {
    fullName: string;
    roleLine: string;
    bio: string;
    photoUrl?: string;
    photoPath: string | null;
    snapshotStats: Pair[];
    contactLinks: { label: string; url: string }[];
  };
}) {
  const [state, formAction] = useActionState<FormState, FormData>(updateSiteSettings, null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [stats, setStats] = useState<Pair[]>(settings.snapshotStats.length > 0 ? settings.snapshotStats : [{ label: "", value: "" }]);
  const [links, setLinks] = useState<Pair[]>(
    settings.contactLinks.length > 0
      ? settings.contactLinks.map((link) => ({ label: link.label, value: link.url }))
      : [{ label: "", value: "" }],
  );

  return (
    <form action={formAction} className="mt-8 flex max-w-xl flex-col gap-8">
      <input type="hidden" name="existing_photo_path" value={settings.photoPath ?? ""} />

      <fieldset className="flex flex-col gap-5">
        <legend className="text-lg font-medium text-ink">Hero</legend>

        <div className="flex flex-col gap-1">
          <label htmlFor="full_name" className={labelClass}>
            Full name
          </label>
          <input id="full_name" name="full_name" required defaultValue={settings.fullName} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="role_line" className={labelClass}>
            Role line
          </label>
          <input id="role_line" name="role_line" defaultValue={settings.roleLine} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bio" className={labelClass}>
            Bio
          </label>
          <textarea id="bio" name="bio" rows={4} defaultValue={settings.bio} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="photo" className={labelClass}>
            Photo
          </label>
          {settings.photoUrl ? (
            <div className="mb-2 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={settings.photoUrl} alt="" className="h-24 w-20 object-cover" />
              <label className="flex items-center gap-2 text-sm text-ink-muted">
                <input
                  type="checkbox"
                  name="remove_photo"
                  checked={removePhoto}
                  onChange={(event) => setRemovePhoto(event.target.checked)}
                />
                Remove photo
              </label>
            </div>
          ) : null}
          <input id="photo" name="photo" type="file" accept="image/*" className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-lg font-medium text-ink">Snapshot stats</legend>
        {stats.map((stat, index) => (
          <div key={index} className="flex items-end gap-3">
            <div className="flex flex-1 flex-col gap-1">
              <label className={labelClass}>Label</label>
              <input
                name="stat_label"
                defaultValue={stat.label}
                className={inputClass}
                placeholder="e.g. CGPA"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className={labelClass}>Value</label>
              <input
                name="stat_value"
                defaultValue={stat.value}
                className={inputClass}
                placeholder="e.g. 9.01 / 10"
              />
            </div>
            <button
              type="button"
              onClick={() => setStats((current) => current.filter((_, i) => i !== index))}
              className="font-mono text-xs text-amber-deep underline underline-offset-2 hover:text-ink"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setStats((current) => [...current, { label: "", value: "" }])}
          className="self-start font-mono text-sm text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          Add stat
        </button>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-lg font-medium text-ink">Contact / footer links</legend>
        {links.map((link, index) => (
          <div key={index} className="flex items-end gap-3">
            <div className="flex flex-1 flex-col gap-1">
              <label className={labelClass}>Label</label>
              <input
                name="link_label"
                defaultValue={link.label}
                className={inputClass}
                placeholder="e.g. GitHub"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className={labelClass}>URL</label>
              <input
                name="link_url"
                defaultValue={link.value}
                className={inputClass}
                placeholder="https://…"
              />
            </div>
            <button
              type="button"
              onClick={() => setLinks((current) => current.filter((_, i) => i !== index))}
              className="font-mono text-xs text-amber-deep underline underline-offset-2 hover:text-ink"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setLinks((current) => [...current, { label: "", value: "" }])}
          className="self-start font-mono text-sm text-blue underline underline-offset-2 hover:text-blue-deep"
        >
          Add link
        </button>
      </fieldset>

      {state && "error" in state ? <p className="text-sm text-amber-deep">{state.error}</p> : null}
      {state && "success" in state ? <p className="text-sm text-green-deep">Saved.</p> : null}

      <div>
        <SubmitButton>Save settings</SubmitButton>
      </div>
    </form>
  );
}
