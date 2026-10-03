/** Survey triangulation-point glyph (triangle with a centre dot): marks a
 * measured result the way a benchmark marks a measured height. */
export function BenchmarkMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`inline-block h-3.5 w-3.5 shrink-0 ${className ?? ""}`}>
      <path d="M8 2 14.5 13.5h-13Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="8" cy="10" r="1.3" fill="currentColor" />
    </svg>
  );
}
