/** A result is "measured" (JetBrains Mono + Result Green, per DESIGN.md) only
 * when it states a number. Prose outcomes render as ordinary ink text. */
export function isMeasured(result: string): boolean {
  // Ordinals ("1st", "2nd") are ranks, not measurements.
  return /\d/.test(result.replace(/\b\d+(st|nd|rd|th)\b/gi, ""));
}
