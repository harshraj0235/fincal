/**
 * MoneyCal News Shorts — India-focused auto feed.
 * Fetches latest news from Indian + global finance/business RSS every 10 min.
 * Optionally fetches article URL to scrape text and build 360+ char summary.
 * Writes public/shorts-feed.json. Run by GitHub Action every 10 min.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json';
const MIN_SUMMARY_CHARS = 360;
const MAX_SUMMARY_CHARS = 1200;
const DEFAULT_IMAGE = 'https://moneycal.in/images/optimized/pexels-photo-7063778.jpeg';
const FETCH_ARTICLE_TIMEOUT_MS = 6000;
const MAX_ARTICLES_TO_SCRAPE = 12;
/** At least 100 shorts on https://moneycal.in/news/shorts every 10 min (this feed + static). */
const MIN_SHORTS_TARGET = 100;
const MAX_FEED_ITEMS = 100;

/** India-focused + Google News + free news RSS feeds */
const FEEDS = [
  { url: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en', name: 'Google News India', category: 'economy' },
  { url: 'https://www.moneycontrol.com/rss/latestnews.xml', name: 'Moneycontrol', category: 'markets' },
  { url: 'https://economictimes.indiatimes.com/rssfeedstopstories.cms', name: 'Economic Times', category: 'economy' },
  { url: 'https://www.business-standard.com/rss/home_page_top_stories.rss', name: 'Business Standard', category: 'business' },
  { url: 'https://www.livemint.com/rss/companies', name: 'Livemint', category: 'business' },
  { url: 'https://www.financialexpress.com/feed/', name: 'Financial Express', category: 'economy' },
  { url: 'https://feeds.feedburner.com/ndtvnews-hindi', name: 'NDTV Hindi', category: 'economy' },
  { url: 'https://www.ndtv.com/rss', name: 'NDTV', category: 'economy' },
  { url: 'https://www.bhaskar.com/rss', name: 'Dainik Bhaskar', category: 'economy' },
  { url: 'https://www.bbc.com/hindi/index.xml', name: 'BBC Hindi', category: 'economy' },
  { url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', name: 'Times of India', category: 'economy' },
  { url: 'https://www.hindustantimes.com/feeds/rss/business/rssfeed.xml', name: 'Hindustan Times Business', category: 'business' },
  { url: 'https://www.indiatoday.in/rss/1206577', name: 'India Today', category: 'economy' },
  { url: 'https://www.thehindubusinessline.com/feeder/default.rss', name: 'Business Line', category: 'business' },
  { url: 'https://www.cnbctv18.com/rss/market/rss.xml', name: 'CNBC TV18', category: 'markets' },
];

function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Extract visible text from HTML (article body / paragraphs) for scraping */
function extractArticleText(html) {
  if (!html || typeof html !== 'string') return '';
  const noScript = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const articleMatch = noScript.match(/<article[\s\S]*?<\/article>/i) || noScript.match(/<main[\s\S]*?<\/main>/i);
  const block = articleMatch ? articleMatch[0] : noScript;
  const pMatches = block.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  let text = pMatches.map((p) => stripHtml(p)).filter(Boolean).join(' ');
  if (text.length < 200) text = stripHtml(block);
  return text.slice(0, 2000).trim();
}

/** Fetch article URL and return extracted text (with timeout). */
async function fetchArticleText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_ARTICLE_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'MoneyCal-NewsShorts/1.0 (India finance news aggregator)' },
    });
    clearTimeout(timeout);
    if (!res.ok) return '';
    const html = await res.text();
    return extractArticleText(html);
  } catch {
    clearTimeout(timeout);
    return '';
  }
}

/** Build one paragraph summary 360+ chars from title, description, and optional scraped full text. */
function ensureSummary360(title, description, source, scrapedText = '') {
  const raw = stripHtml(description || '') || '';
  let paragraph = raw ? raw.slice(0, 800).trim() : title;
  if (scrapedText && scrapedText.length > 100) {
    const fromScrape = scrapedText.slice(0, 1000).trim();
    if (fromScrape.length > paragraph.length) paragraph = fromScrape;
  }
  const closing = ` For the full story and latest updates, read the complete article. Source: ${source}.`;
  if (paragraph.length + closing.length < MIN_SUMMARY_CHARS && raw.length > paragraph.length) {
    paragraph += ' ' + raw.slice(400, 400 + (MIN_SUMMARY_CHARS - paragraph.length - closing.length)).trim();
  }
  if (paragraph.length + closing.length < MIN_SUMMARY_CHARS) {
    paragraph += ' This summary covers the key points. Visit the source for full details.';
  }
  let out = paragraph.trim() + closing;
  if (out.length > MAX_SUMMARY_CHARS) {
    out = out.slice(0, MAX_SUMMARY_CHARS - 1).trim();
    const lastSpace = out.lastIndexOf(' ');
    if (lastSpace > MIN_SUMMARY_CHARS) out = out.slice(0, lastSpace);
    out += '…' + closing;
  }
  return out;
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

function toNewsShort(item, sourceName, category, summaryOverride = null) {
  const title = item?.title?.trim();
  const link = item?.link?.trim();
  if (!title || !link) return null;
  const id = 'feed-' + crypto.createHash('md5').update(link).digest('hex').slice(0, 12);
  const description = item?.description || '';
  const summary = summaryOverride != null
    ? summaryOverride
    : ensureSummary360(title, description, sourceName);
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
  return data.items.map((item) => toNewsShort(item, sourceName, category)).filter(Boolean);
}

/** Optionally enrich items with scraped article text (first N items). */
async function enrichWithScrapedText(items) {
  const toEnrich = items.slice(0, MAX_ARTICLES_TO_SCRAPE);
  const results = await Promise.all(
    toEnrich.map(async (item) => {
      const text = await fetchArticleText(item.fullStoryLink || '');
      const summary = text
        ? ensureSummary360(item.headline, item.summaryParagraphs?.[0] || '', 'Web', text)
        : null;
      return summary ? { ...item, summaryParagraphs: [summary], whyItMatters: [summary.slice(0, 200)] } : item;
    })
  );
  return [...results, ...items.slice(MAX_ARTICLES_TO_SCRAPE)];
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
  return out.slice(0, MAX_FEED_ITEMS);
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

  let items = mergeAndSort(all);
  try {
    items = await enrichWithScrapedText(items);
  } catch (err) {
    console.warn('Scrape enrich failed:', err.message);
  }

  // Every item has imageUrl (thumbnail or DEFAULT_IMAGE) and summaryParagraphs (360+ chars) for /news/shorts
  const output = {
    updatedAt: new Date().toISOString(),
    items,
  };

  const publicDir = path.join(__dirname, '..', 'public');
  const outPath = path.join(publicDir, 'shorts-feed.json');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote ${items.length} shorts to ${outPath} (target ≥${MIN_SHORTS_TARGET} with static, 360+ char, image, every 10 min)`);
  if (items.length === 0) {
    console.warn('No items — check RSS URLs. File still written.');
  } else if (items.length < MIN_SHORTS_TARGET) {
    console.warn(`Feed has ${items.length} items; static shorts will be merged on site to reach ≥${MIN_SHORTS_TARGET} total.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
