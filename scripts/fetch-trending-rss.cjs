/**
 * Fetches Indian finance RSS feeds via rss2json, merges and writes public/trending-rss-feed.json.
 * Run by GitHub Action every 2 hours. No API key = 10 items per feed (rss2json free tier).
 */

const fs = require('fs');
const path = require('path');

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';

const INDIAN_TRENDING_RSS_FEEDS = [
  { url: 'https://www.moneycontrol.com/rss/latestnews.xml', name: 'Moneycontrol' },
  { url: 'https://economictimes.indiatimes.com/rssfeedstopstories.cms', name: 'Economic Times' },
  { url: 'https://www.business-standard.com/rss/home_page_top_stories.rss', name: 'Business Standard' },
  { url: 'https://www.livemint.com/rss/companies', name: 'Livemint' },
  { url: 'https://www.financialexpress.com/feed/', name: 'Financial Express' },
];

function extractFirstImageUrl(html) {
  if (!html || typeof html !== 'string') return undefined;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : undefined;
}

function parseItem(item, sourceName) {
  const title = item?.title?.trim();
  const link = item?.link?.trim();
  if (!title || !link) return null;
  const thumbnail = item?.thumbnail || extractFirstImageUrl(item?.description || '');
  return {
    title,
    link,
    pubDate: item?.pubDate || new Date().toISOString(),
    thumbnail: thumbnail || undefined,
    description: item?.description ? item.description.replace(/<[^>]+>/g, '').slice(0, 200) : undefined,
    source: sourceName,
  };
}

async function fetchOneFeed(feedUrl, sourceName) {
  const encoded = encodeURIComponent(feedUrl);
  const url = `${RSS2JSON_API}?rss_url=${encoded}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) return [];
  return data.items.map((item) => parseItem(item, sourceName)).filter(Boolean);
}

function mergeAndSort(items) {
  const seen = new Set();
  const out = [];
  for (const i of items) {
    const key = (i.link || '').toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(i);
  }
  out.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return out.slice(0, 30);
}

async function main() {
  const all = [];
  for (const { url, name } of INDIAN_TRENDING_RSS_FEEDS) {
    try {
      const list = await fetchOneFeed(url, name);
      all.push(...list);
    } catch (err) {
      console.warn(`Feed ${name} failed:`, err.message);
    }
  }

  const items = mergeAndSort(all);
  const output = {
    updatedAt: new Date().toISOString(),
    items,
  };

  const publicDir = path.join(__dirname, '..', 'public');
  const outPath = path.join(publicDir, 'trending-rss-feed.json');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote ${items.length} items to ${outPath}`);
  if (items.length === 0) {
    console.warn('No items fetched — check RSS URLs or network. File still written for auto mode.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
