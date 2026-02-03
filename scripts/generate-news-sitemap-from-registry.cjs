/**
 * Generate sitemap-news.xml from contentRegistry.ts
 * Includes: /news, /news/shorts, all category pages, and every article in Google News format.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://moneycal.in';
const SRC_DIR = path.join(__dirname, '..', 'src');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const REGISTRY_PATH = path.join(SRC_DIR, 'cms-content', 'contentRegistry.ts');
const TODAY = new Date().toISOString().split('T')[0];

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createStandardUrl(url, priority = 0.85, changefreq = 'daily', lastmod = TODAY) {
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function createGoogleNewsUrl(url, title, pubDate, keywords) {
  const pubDateNorm = pubDate.includes('T') ? pubDate : `${pubDate}T10:00:00+05:30`;
  const lastmod = pubDateNorm.split('T')[0];
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <news:news>
      <news:publication>
        <news:name>MoneyCal</news:name>
        <news:language>en-in</news:language>
      </news:publication>
      <news:publication_date>${pubDateNorm}</news:publication_date>
      <news:title>${escapeXml(title)}</news:title>
      <news:keywords>${escapeXml(keywords)}</news:keywords>
    </news:news>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

function parseRegistry(content) {
  const articles = [];
  // Match each article block: from "slug:" through "datePublished:" and "image:"
  const blockRegex = /\{\s*id:\s*['"]([^'"]+)['"].*?slug:\s*['"]([^'"]+)['"].*?category:\s*['"]([^'"]+)['"].*?title:\s*['`]((?:[^'`\\]|\\.)*)['`].*?datePublished:\s*['"]([^'"]+)['"]/gs;
  let m;
  while ((m = blockRegex.exec(content)) !== null) {
    const [, id, slug, category, title, datePublished] = m;
    const cleanTitle = (title || '').replace(/\\'/g, "'").trim();
    articles.push({
      id,
      slug,
      category,
      title: cleanTitle,
      datePublished,
    });
  }
  return articles;
}

// Fallback: line-by-line extraction if block regex misses some (e.g. title with newlines)
function parseRegistryFallback(content) {
  const slugs = [];
  const categories = [];
  const titles = [];
  const dates = [];
  const slugRe = /slug:\s*['"]([^'"]+)['"]/g;
  const categoryRe = /category:\s*['"]([^'"]+)['"]/g;
  const dateRe = /datePublished:\s*['"]([^'"]+)['"]/g;
  let s; while ((s = slugRe.exec(content)) !== null) slugs.push(s[1]);
  let c; while ((c = categoryRe.exec(content)) !== null) categories.push(c[1]);
  let d; while ((d = dateRe.exec(content)) !== null) dates.push(d[1]);
  // Title: match '...' or `...` (single line, may have \')
  const titleRe = /title:\s*['`]((?:[^'`\n\\]|\\.)*)['`]/g;
  let t; while ((t = titleRe.exec(content)) !== null) titles.push(t[1].replace(/\\'/g, "'"));
  const len = Math.min(slugs.length, categories.length, titles.length, dates.length);
  const articles = [];
  for (let i = 0; i < len; i++) {
    articles.push({
      slug: slugs[i],
      category: categories[i],
      title: titles[i] || '',
      datePublished: dates[i] || TODAY,
    });
  }
  return articles;
}

function main() {
  console.log('Reading contentRegistry.ts...');
  const content = fs.readFileSync(REGISTRY_PATH, 'utf-8');
  let articles = parseRegistry(content);
  if (articles.length === 0) {
    console.log('Block parse got 0, using fallback line parse...');
    articles = parseRegistryFallback(content);
  }
  console.log(`Found ${articles.length} articles in registry.`);

  const newsCategories = ['markets', 'business', 'startups', 'economy', 'tech-business'];

  const urlEntries = [];

  // 1) Static news pages
  urlEntries.push(createStandardUrl(`${BASE_URL}/news`, 0.9, 'daily'));
  urlEntries.push(createStandardUrl(`${BASE_URL}/news/shorts`, 0.85, 'daily'));
  newsCategories.forEach((cat) => {
    urlEntries.push(createStandardUrl(`${BASE_URL}/news/${cat}`, 0.85, 'daily'));
  });

  // 2) Every article in Google News format
  articles.forEach((a) => {
    const url = `${BASE_URL}/news/${a.category}/${a.slug}`;
    const keywords = `${a.category}, India, finance, news`;
    urlEntries.push(createGoogleNewsUrl(url, a.title, a.datePublished, keywords));
  });

  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- MoneyCal NEWS - Google News format - ${urlEntries.length} URLs - ${TODAY} -->`;

  const xml = `${header}\n${urlEntries.join('\n')}\n</urlset>`;
  const outPath = path.join(PUBLIC_DIR, 'sitemap-news.xml');
  fs.writeFileSync(outPath, xml, 'utf-8');
  console.log(`Wrote ${outPath} with ${urlEntries.length} URLs.`);
}

main();
