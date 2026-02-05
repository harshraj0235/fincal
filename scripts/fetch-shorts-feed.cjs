/**
 * Fetches Indian + Hindi news from RSS every 2 hours.
 * Writes public/shorts-feed.json in NewsShort format with 360+ char summary, image, full story link.
 * Run by GitHub Action (cron every 2h). Uses rss2json (free, 10 items/feed).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';
const MIN_SUMMARY_CHARS = 360;
const DEFAULT_IMAGE = 'https://moneycal.in/images/optimized/pexels-photo-7063778.jpeg';

const FEEDS = [
  { url: 'https://www.moneycontrol.com/rss/latestnews.xml', name: 'Moneycontrol', category: 'markets' },
  { url: 'https://economictimes.indiatimes.com/rssfeedstopstories.cms', name: 'Economic Times', category: 'economy' },
  { url: 'https://www.business-standard.com/rss/home_page_top_stories.rss', name: 'Business Standard', category: 'business' },
  { url: 'https://www.livemint.com/rss/companies', name: 'Livemint', category: 'business' },
  { url: 'https://www.financialexpress.com/feed/', name: 'Financial Express', category: 'economy' },
  { url: 'https://feeds.feedburner.com/ndtvnews-hindi', name: 'NDTV Hindi', category: 'economy' },
  { url: 'https://www.bhaskar.com/rss', name: 'Dainik Bhaskar', category: 'economy' },
  { url: 'https://www.bbc.com/hindi/index.xml', name: 'BBC Hindi', category: 'economy' },
];

function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Build one quality paragraph (360+ chars) summarizing the whole content. */
function ensureSummary360(title, description, source) {
  const raw = stripHtml(description || '') || '';
  let paragraph = raw ? raw.slice(0, 500).trim() : title;
  const closing = ` For the full story and latest updates, read the complete article. Source: ${source}.`;
  if (paragraph.length + closing.length < MIN_SUMMARY_CHARS && raw.length > paragraph.length) {
    paragraph += ' ' + raw.slice(500, 500 + (MIN_SUMMARY_CHARS - paragraph.length - closing.length)).trim();
  }
  return paragraph.trim() + closing;
}

function extractFirstImageUrl(html) {
  if (!html || typeof html !== 'string') return undefined;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : undefined;
}

function slugify(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0900-\u097F\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'news';
}

function toNewsShort(item, sourceName, category) {
  const title = item?.title?.trim();
  const link = item?.link?.trim();
  if (!title || !link) return null;
  const id = 'feed-' + crypto.createHash('md5').update(link).digest('hex').slice(0, 12);
  const description = item?.description || '';
  const summary = ensureSummary360(title, description, sourceName);
  const imageUrl = item?.thumbnail || extractFirstImageUrl(description) || DEFAULT_IMAGE;
  const pubDate = item?.pubDate || new Date().toISOString();
  return {
    id,
    slug: slugify(title) + '-' + id.slice(-6),
    category,
    headline: title,
    whyItMatters: [summary.slice(0, 200)],
    whatToDo: 'Read full article for more.',
    summaryParagraphs: [summary],
    fullStoryLink: link,
    fullStoryPath: link,
    datePublished: pubDate,
    readTimeSeconds: 50,
    imageUrl,
    source: 'feed',
  };
}

async function fetchOneFeed(feedUrl, sourceName, category) {
  const encoded = encodeURIComponent(feedUrl);
  const url = `${RSS2JSON_API}?rss_url=${encoded}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  if (data.status !== 'ok' || !Array.isArray(data.items)) return [];
  return data.items
    .map((item) => toNewsShort(item, sourceName, category))
    .filter(Boolean);
}

function mergeAndSort(items) {
  const seen = new Set();
  const out = [];
  for (const i of items) {
    const key = (i.fullStoryLink || i.id || '').toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(i);
  }
  out.sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime());
  return out.slice(0, 50);
}

async function main() {
  const all = [];
  for (const { url, name, category } of FEEDS) {
    try {
      const list = await fetchOneFeed(url, name, category);
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
  const outPath = path.join(publicDir, 'shorts-feed.json');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote ${items.length} shorts to ${outPath}`);
  if (items.length === 0) {
    console.warn('No items — check RSS URLs. File still written.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
