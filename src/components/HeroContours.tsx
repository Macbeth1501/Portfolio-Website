import { contourRings } from "@/lib/contours";

/** The page's one authored motion: contour lines drawing in behind the title
 * block on load (see .contour-draw in globals.css). Decorative. */
export function HeroContours() {
  const rings = contourRings(20260, 360, 210, 190, 9);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 720 420"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-contour opacity-30 md:opacity-40 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
      preserveAspectRatio="xMaxYMin meet"
    >
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {rings.map((d, index) => (
          <path
            key={index}
            d={d}
            pathLength={1}
            className="contour-draw"
            style={{ animationDelay: `${index * 70}ms` }}
          />
        ))}
      </g>
    </svg>
  );
}
