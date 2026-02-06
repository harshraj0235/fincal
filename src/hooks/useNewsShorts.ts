import { useState, useEffect, useCallback } from 'react';
import { getNewsShorts, SHORTS_FEED_JSON_PATH, normalizeShortSummary, sortShortsByDateLatestFirst, type NewsShort } from '../data/newsShortsData';

export interface UseNewsShortsResult {
  shorts: NewsShort[];
  loading: boolean;
  refetch: () => void;
}

const SHORTS_FEED_CACHE_KEY = 'moneycal_shorts_feed';
const SHORTS_FEED_CACHE_TTL_MS = 5 * 60 * 1000; // 5 min — feed updates every 10 min

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
 * Returns news shorts: feed (Indian/Hindi RSS, 360+ char summary) + static + custom.
 * Feed is from shorts-feed.json (India news, 360+ char summary, auto every 10 min); merged and sorted by date.
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
            const merged = sortShortsByDateLatestFirst([...items, ...staticAndCustom]);
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
      const merged = sortShortsByDateLatestFirst([...feedItems, ...staticAndCustom]);
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
