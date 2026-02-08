/**
 * Canonical URL normalizer to fix "Crawled - currently not indexed" and duplicate paths.
 * Prevents https://moneycal.in/moneycal.in/... (double domain in path).
 */

const BASE_URL = 'https://moneycal.in';

/**
 * Strip duplicate domain from path (e.g. /moneycal.in/learn/... -> /learn/...).
 * Handles pathname or relative path that incorrectly contains "moneycal.in".
 */
export function normalizePath(path: string): string {
  if (!path || typeof path !== 'string') return '/';
  let p = path.trim();
  // Strip leading /moneycal.in or moneycal.in from path (case-insensitive)
  p = p.replace(/^\/moneycal\.in(\/|$)/i, '/').replace(/^moneycal\.in(\/|$)/i, '/');
  if (!p.startsWith('/')) p = '/' + p;
  // Collapse multiple slashes
  p = p.replace(/\/+/g, '/');
  return p === '' ? '/' : p;
}

/**
 * Build a single canonical URL from base + path, and ensure no duplicate domain in path.
 */
export function normalizeCanonicalUrl(urlOrPath: string): string {
  if (!urlOrPath || typeof urlOrPath !== 'string') return `${BASE_URL}/`;
  const s = urlOrPath.trim();
  if (s.startsWith('http://') || s.startsWith('https://')) {
    // Full URL: strip duplicate path and normalize
    try {
      const u = new URL(s);
      if (u.origin !== BASE_URL && u.origin !== 'https://www.moneycal.in') return s;
      const path = normalizePath(u.pathname);
      return `${BASE_URL}${path === '/' ? '/' : path}`;
    } catch {
      return s.replace(/https?:\/\/[^/]+\/moneycal\.in(\/|$)/gi, `${BASE_URL}/`);
    }
  }
  const path = normalizePath(s);
  return `${BASE_URL}${path === '/' ? '/' : path}`;
}

/**
 * Ensure final href never contains moneycal.in twice (safety net).
 */
export function ensureNoDuplicateDomain(href: string): string {
  if (!href) return BASE_URL + '/';
  return href.replace(/^(https?:\/\/[^/]+)\/moneycal\.in(\/|$)/gi, '$1/');
}
