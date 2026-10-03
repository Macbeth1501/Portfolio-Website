/** A result is "measured" (JetBrains Mono + Result Green, per DESIGN.md) only
 * when it states a number. Prose outcomes render as ordinary ink text. */
export function isMeasured(result: string): boolean {
  return /\d/.test(result);
}
