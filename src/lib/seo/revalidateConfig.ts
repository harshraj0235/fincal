/**
 * ISR / revalidate config per category (SEO + Cloudflare).
 * Aligns with Moneycal architecture: content freshness vs cache efficiency.
 */

export const REVALIDATE = {
  /** News: 30 min (1800s) */
  NEWS: 1800,
  /** Learn: 7 days */
  LEARN: 604800,
  /** Blog: 1 hour */
  BLOG: 3600,
  /** Blog post: 1 hour */
  BLOG_POST: 3600,
  /** Tax tools: 24h */
  TAX: 86400,
  /** GST tools: 24h */
  GST: 86400,
  /** Crypto: 24h */
  CRYPTO: 86400,
  /** Government schemes: 7 days */
  GOVERNMENT: 604800,
  /** Festival tools: 365 days (seasonal) */
  FESTIVAL: 31536000,
  /** Finance tools: 1 hour */
  FINANCE_TOOLS: 3600,
  /** Insurance tools: 24h */
  INSURANCE: 86400,
  /** Calculators: force-dynamic (SSR) - use null */
  CALCULATORS: null,
} as const;

/** Map first path segment to revalidate (seconds) or null for force-dynamic. */
export function getRevalidateForPath(pathname: string): number | null {
  const seg = pathname.split('/').filter(Boolean)[0];
  const map: Record<string, number | null> = {
    news: REVALIDATE.NEWS,
    learn: REVALIDATE.LEARN,
    blog: REVALIDATE.BLOG,
    'tax-tools': REVALIDATE.TAX,
    'gst-tools': REVALIDATE.GST,
    crypto: REVALIDATE.CRYPTO,
    'government-schemes': REVALIDATE.GOVERNMENT,
    'finance-tools': REVALIDATE.FINANCE_TOOLS,
    'insurance-tools': REVALIDATE.INSURANCE,
    calculators: REVALIDATE.CALCULATORS,
    tools: 3600,
  };
  return map[seg] ?? 3600;
}
