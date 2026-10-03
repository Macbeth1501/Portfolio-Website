/** Turns what an owner types into a link a browser will actually follow.
 * "github.com/x" would otherwise be a relative path on this site; a bare
 * address becomes mailto:. Already-complete URLs pass through unchanged. */
export function normalizeUrl(raw: string): string {
  const value = raw.trim();
  if (!value) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return value; // https:, mailto:, tel:
  if (value.startsWith("/") || value.startsWith("#")) return value;
  if (/^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(value)) return `mailto:${value}`;
  return `https://${value.replace(/^\/+/, "")}`;
}

export function isExternal(url: string): boolean {
  return /^https?:/i.test(url);
}

/** Contact links were once saved as {label, value}; accept both shapes. */
export function readLinks(raw: unknown): { label: string; url: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const entry = item as { label?: string; url?: string; value?: string };
      return { label: entry.label ?? "", url: normalizeUrl(entry.url ?? entry.value ?? "") };
    })
    .filter((link) => link.label && link.url);
}
