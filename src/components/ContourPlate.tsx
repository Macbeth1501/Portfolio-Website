import { contourRings, hashString } from "@/lib/contours";

/** Authored placeholder visual for a project with no uploaded image: a small
 * survey-sheet plate of contour lines, unique per project. Decorative only —
 * it is replaced by the real image the moment one is uploaded in /admin. */
export function ContourPlate({ seed }: { seed: string }) {
  const hash = hashString(seed);
  const cx = 110 + (hash % 380);
  const cy = 58 + ((hash >>> 8) % 16);
  const rings = contourRings(hash, cx, cy, 38 + ((hash >>> 12) % 14), 5 + ((hash >>> 16) % 5));

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 128"
      preserveAspectRatio="xMidYMid slice"
      className="h-32 w-full border border-line bg-paper-deep text-contour"
    >
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {rings.map((d, index) => (
          <path key={index} d={d} className={index === rings.length - 1 ? "text-blue" : undefined} />
        ))}
      </g>
      <g stroke="var(--ink-muted)" strokeWidth="1" opacity="0.6">
        <path d="M16 112h72M16 108v8M52 109v6M88 108v8" fill="none" />
      </g>
      <g stroke="var(--line)" strokeWidth="1">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={(i + 1) * 50} y1="0" x2={(i + 1) * 50} y2="6" />
        ))}
      </g>
    </svg>
  );
}
