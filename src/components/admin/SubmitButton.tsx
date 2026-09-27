"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-sm border border-blue px-4 py-2 font-mono text-sm text-blue hover:bg-blue hover:text-paper disabled:opacity-50"
    >
      {pending ? "Saving…" : children}
    </button>
  );
}
