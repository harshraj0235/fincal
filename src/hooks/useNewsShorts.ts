import { useState, useEffect, useCallback } from 'react';
import { getNewsShorts, SHORTS_FEED_JSON_PATH, type NewsShort } from '../data/newsShortsData';

export interface UseNewsShortsResult {
  shorts: NewsShort[];
  loading: boolean;
  refetch: () => void;
}

const SHORTS_FEED_CACHE_KEY = 'moneycal_shorts_feed';
const SHORTS_FEED_CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

/** Fetch feed shorts from JSON (updated every 2h by GitHub Action). */
async function fetchShortsFeed(baseUrl: string): Promise<NewsShort[]> {
  const res = await fetch(baseUrl + SHORTS_FEED_JSON_PATH, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  if (!data?.items || !Array.isArray(data.items)) return [];
  return data.items.map((item: Record<string, unknown>) => ({
    ...item,
    source: 'feed' as const,
  })) as NewsShort[];
}

/**
 * Returns news shorts: feed (Indian/Hindi RSS, 360+ char summary) + static + custom.
 * Feed is fetched from shorts-feed.json (updated every 2h); merged and sorted by date.
 */
export function useNewsShorts(): UseNewsShortsResult {
  const [shorts, setShorts] = useState<NewsShort[]>(() => getNewsShorts());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (skipCache = false) => {
    setLoading(true);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const staticAndCustom = getNewsShorts();

    if (typeof window !== 'undefined' && !skipCache) {
      try {
        const raw = localStorage.getItem(SHORTS_FEED_CACHE_KEY);
        if (raw) {
          const { items, _ts }: { items: NewsShort[]; _ts?: number } = JSON.parse(raw);
          if (items?.length && _ts && Date.now() - _ts < SHORTS_FEED_CACHE_TTL_MS) {
            const merged = [...items, ...staticAndCustom].sort(
              (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
            );
            setShorts(merged);
            setLoading(false);
            return;
          }
        }
      } catch {
        // ignore cache errors
      }
    }

    try {
      const feedItems = await fetchShortsFeed(baseUrl);
      if (typeof window !== 'undefined' && feedItems.length > 0) {
        localStorage.setItem(
          SHORTS_FEED_CACHE_KEY,
          JSON.stringify({ items: feedItems, _ts: Date.now() })
        );
      }
      const merged = [...feedItems, ...staticAndCustom].sort(
        (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
      );
      setShorts(merged);
    } catch {
      setShorts(staticAndCustom);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refetch = useCallback(() => load(true), [load]);

  return {
    shorts,
    loading,
    refetch,
  };
}
