"use client";

import { useOptimistic, useTransition } from "react";
import { ReorderButtons } from "./ReorderButtons";

export type ReorderItem = { id: string; content: React.ReactNode };

/** A list whose rows swap places the instant a reorder arrow is clicked
 * (optimistically); the server action then saves in the background. */
export function ReorderList({
  items,
  moveAction,
  emptyMessage,
}: {
  items: ReorderItem[];
  moveAction: (id: string, direction: "up" | "down") => Promise<void>;
  emptyMessage: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [ordered, applyMove] = useOptimistic(
    items,
    (state, move: { id: string; direction: "up" | "down" }) => {
      const index = state.findIndex((item) => item.id === move.id);
      const target = move.direction === "up" ? index - 1 : index + 1;
      if (index === -1 || target < 0 || target >= state.length) return state;
      const next = state.slice();
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    },
  );

  function handleMove(id: string, direction: "up" | "down") {
    startTransition(async () => {
      applyMove({ id, direction });
      await moveAction(id, direction);
    });
  }

  return (
    <div>
      <ul className="mt-8 divide-y divide-line border-t border-line" aria-busy={isPending}>
        {ordered.map((item, index) => (
          <li key={item.id} className="flex items-center gap-4 py-4">
            <ReorderButtons
              onMove={(direction) => handleMove(item.id, direction)}
              isFirst={index === 0}
              isLast={index === ordered.length - 1}
              disabled={isPending}
            />
            {item.content}
          </li>
        ))}
        {ordered.length === 0 ? <li className="py-4 text-sm text-ink-muted">{emptyMessage}</li> : null}
      </ul>
      <p role="status" className="mt-2 h-4 font-mono text-xs text-ink-muted">
        {isPending ? "Saving order…" : ""}
      </p>
    </div>
  );
}
