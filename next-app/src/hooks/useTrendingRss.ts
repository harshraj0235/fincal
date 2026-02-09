import { useState, useEffect, useCallback } from 'react';
import type { TrendingRssItem, TrendingRssFeedResult } from '../data/trendingRssFeeds';
import {
  TRENDING_RSS_JSON_PATH,
  TRENDING_RSS_CACHE_KEY,
  TRENDING_RSS_CACHE_TTL_MS,
  INDIAN_TRENDING_RSS_FEEDS,
} from '../data/trendingRssFeeds';

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

function extractFirstImageUrl(html: string): string | undefined {
  if (!html) return undefined;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : undefined;
}

function parseRss2JsonItem(item: { title?: string; link?: string; pubDate?: string; thumbnail?: string; description?: string }, source: string): TrendingRssItem | null {
  const title = item?.title?.trim();
  const link = item?.link?.trim();
  if (!title || !link) return null;
  const thumbnail = item?.thumbnail || extractFirstImageUrl(item?.description || '');
  return {
    title,
    link,
    pubDate: item?.pubDate || new Date().toISOString(),
    thumbnail,
    description: item?.description?.replace(/<[^>]+>/g, '').slice(0, 200),
    source,
  };
}

/** Fetch one feed via rss2json (no API key = 10 items per feed). */
async function fetchOneFeed(feedUrl: string, sourceName: string): Promise<TrendingRssItem[]> {
  const encoded = encodeURIComponent(feedUrl);
  const url = `${RSS2JSON_API}?rss_url=${encoded}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) return [];
  return data.items
    .map((item: Record<string, unknown>) => parseRss2JsonItem(item as Parameters<typeof parseRss2JsonItem>[0], sourceName))
    .filter(Boolean) as TrendingRssItem[];
}

/** Merge and dedupe by link, sort by pubDate desc. */
function mergeAndSort(items: TrendingRssItem[]): TrendingRssItem[] {
  const seen = new Set<string>();
  const out: TrendingRssItem[] = [];
  for (const i of items) {
    const key = i.link.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(i);
  }
  out.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return out.slice(0, 30);
}

export interface UseTrendingRssResult {
  items: TrendingRssItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updatedAt: string | null;
}

/**
 * Fetches trending Indian news from RSS.
 * 1) Tries static JSON at TRENDING_RSS_JSON_PATH (updated every 2h by GitHub Action).
 * 2) If missing or cache expired, uses rss2json for each feed and caches in localStorage (2h TTL).
 */
export function useTrendingRss(): UseTrendingRssResult {
  const [items, setItems] = useState<TrendingRssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const fetchFromStatic = useCallback(async (): Promise<TrendingRssFeedResult | null> => {
    try {
      const base = typeof window !== 'undefined' ? window.location.origin : '';
      const res = await fetch(base + TRENDING_RSS_JSON_PATH, { cache: 'no-store' });
      if (!res.ok) return null;
      const data = await res.json();
      if (data?.items && Array.isArray(data.items)) {
        return { items: data.items, updatedAt: data.updatedAt || new Date().toISOString() };
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const fetchFromRss2Json = useCallback(async (): Promise<TrendingRssFeedResult> => {
    const all: TrendingRssItem[] = [];
    await Promise.all(
      INDIAN_TRENDING_RSS_FEEDS.map(async ({ url, name }) => {
        try {
          const list = await fetchOneFeed(url, name);
          all.push(...list);
        } catch {
          // skip failed feed
        }
      })
    );
    return { items: mergeAndSort(all), updatedAt: new Date().toISOString() };
  }, []);

  const load = useCallback(async (skipCache = false) => {
    setLoading(true);
    setError(null);
    try {
      if (!skipCache && typeof window !== 'undefined') {
        const raw = localStorage.getItem(TRENDING_RSS_CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as TrendingRssFeedResult & { _ts?: number };
          const ts = parsed._ts ?? 0;
          if (Date.now() - ts < TRENDING_RSS_CACHE_TTL_MS && parsed.items?.length) {
            setItems(parsed.items);
            setUpdatedAt(parsed.updatedAt || null);
            setLoading(false);
            return;
          }
        }
      }

      const staticData = await fetchFromStatic();
      if (staticData?.items?.length) {
        setItems(staticData.items);
        setUpdatedAt(staticData.updatedAt);
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            TRENDING_RSS_CACHE_KEY,
            JSON.stringify({ ...staticData, _ts: Date.now() })
          );
        }
        setLoading(false);
        return;
      }

      // Static empty or missing — fetch live from RSS (e.g. before first Action run)
      const liveData = await fetchFromRss2Json();
      setItems(liveData.items);
      setUpdatedAt(liveData.updatedAt);
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          TRENDING_RSS_CACHE_KEY,
          JSON.stringify({ ...liveData, _ts: Date.now() })
        );
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load trending news');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFromStatic, fetchFromRss2Json]);

  useEffect(() => {
    load();
  }, [load]);

  const refetch = useCallback(() => load(true), [load]);

  return { items, loading, error, refetch, updatedAt };
}
