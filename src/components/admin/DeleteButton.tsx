"use client";

export function DeleteButton({ confirmLabel }: { confirmLabel: string }) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        if (!window.confirm(`Delete "${confirmLabel}"? This can't be undone.`)) {
          event.preventDefault();
        }
      }}
      className="font-mono text-xs text-amber-deep underline underline-offset-2 hover:text-ink"
    >
      Delete
    </button>
  );
}
