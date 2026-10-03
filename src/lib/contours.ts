/** Deterministic contour-line generator for the Survey Sheet visuals.
 * Same seed → same lines, so server and client render identically and each
 * project keeps its own plate. Purely decorative geometry; no Math.random. */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Nested, slightly irregular closed rings around (cx, cy), like contour
 * lines around a hill. Returns SVG path `d` strings, outermost first. */
export function contourRings(seed: number, cx: number, cy: number, maxRadius: number, rings: number): string[] {
  const rand = mulberry32(seed);
  const points = 16;
  // One shared wobble per angle keeps the rings parallel rather than random.
  const wobble = Array.from({ length: points }, () => 0.82 + rand() * 0.36);
  const stretch = 1 + rand() * 0.6;
  const paths: string[] = [];

  for (let ring = 0; ring < rings; ring++) {
    const scale = 1 - ring / (rings + 0.6);
    const pts = wobble.map((w, i) => {
      const angle = (i / points) * Math.PI * 2;
      const jitter = 1 + (rand() - 0.5) * 0.08;
      const r = maxRadius * scale * w * jitter;
      return [cx + Math.cos(angle) * r * stretch, cy + Math.sin(angle) * r] as const;
    });

    const mid = (a: readonly [number, number], b: readonly [number, number]) =>
      [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] as const;

    const start = mid(pts[points - 1], pts[0]);
    let d = `M${start[0].toFixed(1)} ${start[1].toFixed(1)}`;
    for (let i = 0; i < points; i++) {
      const control = pts[i];
      const end = mid(pts[i], pts[(i + 1) % points]);
      d += ` Q${control[0].toFixed(1)} ${control[1].toFixed(1)} ${end[0].toFixed(1)} ${end[1].toFixed(1)}`;
    }
    paths.push(`${d}Z`);
  }
  return paths;
}
