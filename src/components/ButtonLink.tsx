import { isExternal } from "@/lib/url";

const base =
  "inline-flex min-h-11 items-center justify-center border px-4 text-sm font-medium transition-colors duration-150 ease-out motion-reduce:transition-none";

const variants = {
  quiet: "border-ink/40 text-ink hover:bg-ink hover:text-paper",
  primary: "border-ink bg-ink text-paper hover:border-blue-deep hover:bg-blue-deep",
};

/** A bordered, hover-filled link for the page's few real actions (contact). */
export function ButtonLink({
  href,
  children,
  variant = "quiet",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
}) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
