"use client";

const buttonClass =
  "flex h-8 w-8 items-center justify-center border border-line font-mono text-sm text-blue transition-colors hover:bg-blue hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-blue";

export function ReorderButtons({
  onMove,
  isFirst,
  isLast,
  disabled,
}: {
  onMove: (direction: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={isFirst || disabled}
        aria-label="Move up"
        onClick={() => onMove("up")}
        className={buttonClass}
      >
        ↑
      </button>
      <button
        type="button"
        disabled={isLast || disabled}
        aria-label="Move down"
        onClick={() => onMove("down")}
        className={buttonClass}
      >
        ↓
      </button>
    </div>
  );
}
