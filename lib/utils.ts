/**
 * Simple utility to conditionally join class names.
 * Filters out falsy values and joins with a space.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format a number with a + suffix if needed
 */
export function formatStat(value: number, suffix: string = ''): string {
  return `${value}${suffix}`
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
