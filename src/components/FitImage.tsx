import Image from "next/image";

/** Shows an uploaded image whole, at its own aspect ratio, never cropped.
 * Width/height are only the aspect hint next/image needs; CSS (h-auto w-auto)
 * lets the real proportions through, and very tall images are contained. */
export function FitImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex justify-center border border-line bg-paper-deep">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        sizes="(min-width: 768px) 640px, 100vw"
        className="h-auto max-h-[36rem] w-auto max-w-full object-contain"
      />
    </div>
  );
}
