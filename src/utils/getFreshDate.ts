/**
 * Returns a date string that updates every 48 hours.
 * Used for "Last updated" and dateModified in schema so Google sees fresh content signals.
 * Backlinko: content satisfaction + freshness signals help rankings and AI visibility.
 */

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

/**
 * Get a date that changes every 48 hours (floor of now to 48h bucket).
 * e.g. Jan 1 00:00 and Jan 2 12:00 both return the same date until 48h has passed.
 */
export function getFreshDateLast48h(): Date {
  const now = Date.now();
  const bucket = Math.floor(now / FORTY_EIGHT_HOURS_MS) * FORTY_EIGHT_HOURS_MS;
  return new Date(bucket);
}

/** ISO date string (YYYY-MM-DD) that updates every 48 hours */
export function getFreshDateString48h(): string {
  return getFreshDateLast48h().toISOString().split('T')[0];
}

/** Full ISO string for schema dateModified */
export function getFreshDateISO48h(): string {
  return getFreshDateLast48h().toISOString();
}
