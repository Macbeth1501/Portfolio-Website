export const SECTION_KEYS = ["experience", "achievements", "projects", "skills"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export const SECTION_LABELS: Record<SectionKey, string> = {
  experience: "Experience",
  achievements: "Achievements",
  projects: "Projects",
  skills: "Skills",
};

/** Turns a stored order (possibly missing, partial or containing unknown keys)
 * into a complete order: known keys in stored order, then any missing ones in
 * their default position. */
export function normalizeSectionOrder(stored: unknown): SectionKey[] {
  const known = new Set<string>(SECTION_KEYS);
  const order: SectionKey[] = [];
  if (Array.isArray(stored)) {
    for (const key of stored) {
      if (typeof key === "string" && known.has(key) && !order.includes(key as SectionKey)) {
        order.push(key as SectionKey);
      }
    }
  }
  for (const key of SECTION_KEYS) if (!order.includes(key)) order.push(key);
  return order;
}
