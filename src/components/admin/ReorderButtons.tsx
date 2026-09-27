export function ReorderButtons({
  upAction,
  downAction,
  isFirst,
  isLast,
}: {
  upAction?: () => Promise<void>;
  downAction?: () => Promise<void>;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col">
      <form action={upAction}>
        <button
          type="submit"
          disabled={isFirst}
          aria-label="Move up"
          className="font-mono text-xs text-blue hover:text-blue-deep disabled:opacity-30"
        >
          ↑
        </button>
      </form>
      <form action={downAction}>
        <button
          type="submit"
          disabled={isLast}
          aria-label="Move down"
          className="font-mono text-xs text-blue hover:text-blue-deep disabled:opacity-30"
        >
          ↓
        </button>
      </form>
    </div>
  );
}
