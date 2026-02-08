import { useState, useEffect, useCallback } from 'react';
import { getNewsShorts, SHORTS_FEED_JSON_PATH, normalizeShortSummary, sortShortsByDateLatestFirst, type NewsShort } from '../data/newsShortsData';

/** Ensure every short has image + 360+ char paragraph for display on /news/shorts */
function ensureImageAndParagraph(shorts: NewsShort[]): NewsShort[] {
  return shorts.map(normalizeShortSummary);
}

export interface UseNewsShortsResult {
  shorts: NewsShort[];
  loading: boolean;
  refetch: () => void;
}

const SHORTS_FEED_CACHE_KEY = 'moneycal_shorts_feed';
const SHORTS_FEED_LAST_FETCH_KEY = 'moneycal_shorts_last_fetch_ts';
const SHORTS_FEED_CACHE_TTL_MS = 10 * 60 * 1000; // 10 min — MUST align with feed update
const REFETCH_INTERVAL_MS = 10 * 60 * 1000; // MUST refetch every 10 min on /news/shorts

/** Fetch feed shorts from JSON (India-focused, 360+ char summary, updated every 10 min). */
async function fetchShortsFeed(baseUrl: string): Promise<NewsShort[]> {
  const res = await fetch(baseUrl + SHORTS_FEED_JSON_PATH, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  if (!data?.items || !Array.isArray(data.items)) return [];
  return data.items.map((item: Record<string, unknown>) =>
    normalizeShortSummary({ ...item, source: 'feed' as const } as NewsShort)
  );
}

/**
 * Returns news shorts: 100% from auto-fetch (dynamic) when available; static only when feed is empty.
 * All shorts shown are dynamic from shorts-feed.json (every 10 min). Latest + category tabs; image + paragraph on every card.
 */
export function useNewsShorts(): UseNewsShortsResult {
  const [shorts, setShorts] = useState<NewsShort[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (skipCache = false) => {
    setLoading(true);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const staticFallback = getNewsShorts();

    // Use cached feed (all dynamic) when valid
    if (typeof window !== 'undefined' && !skipCache) {
      try {
        const raw = localStorage.getItem(SHORTS_FEED_CACHE_KEY);
        if (raw) {
          const { items, _ts }: { items: NewsShort[]; _ts?: number } = JSON.parse(raw);
          if (items?.length && _ts && Date.now() - _ts < SHORTS_FEED_CACHE_TTL_MS) {
            setShorts(ensureImageAndParagraph(sortShortsByDateLatestFirst(items)));
            setLoading(false);
            return;
          }
        }
      } catch {
        // ignore
      }
    }

    try {
      const feedItems = await fetchShortsFeed(baseUrl);
      const now = Date.now();
      if (typeof window !== 'undefined') {
        if (feedItems.length > 0) {
          localStorage.setItem(SHORTS_FEED_CACHE_KEY, JSON.stringify({ items: feedItems, _ts: now }));
        }
        localStorage.setItem(SHORTS_FEED_LAST_FETCH_KEY, String(now));
      }
      // Show only auto-fetched (dynamic) when we have any; otherwise fallback to static
      if (feedItems.length > 0) {
        setShorts(ensureImageAndParagraph(sortShortsByDateLatestFirst(feedItems)));
      } else {
        setShorts(ensureImageAndParagraph(staticFallback));
      }
    } catch {
      setShorts(ensureImageAndParagraph(staticFallback));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // MUST refetch every 10 min — interval (survives tab focus)
  useEffect(() => {
    const interval = setInterval(() => load(true), REFETCH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [load]);

  // When user returns to tab after 10+ min, refetch so fresh data shows anyhow
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return;
      try {
        const raw = localStorage.getItem(SHORTS_FEED_LAST_FETCH_KEY);
        const lastTs = raw ? parseInt(raw, 10) : 0;
        if (Date.now() - lastTs >= REFETCH_INTERVAL_MS) load(true);
      } catch {
        load(true);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [load]);

  const refetch = useCallback(() => load(true), [load]);

  return {
    shorts,
    loading,
    refetch,
  };
}
