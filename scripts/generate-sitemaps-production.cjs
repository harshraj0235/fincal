/**
 * ═══════════════════════════════════════════════════════════════════════
 * PRODUCTION SITEMAP GENERATOR - COMPLETE CODEBASE SCAN
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Nov 2025 - Scans ENTIRE codebase
 * 
 * Sources:
 * 1. App.tsx - ALL 617 routes
 * 2. contentRegistry.ts - 100+ news articles
 * 3. All 10 lesson files - 159 learn lessons
 * 4. all-urls-complete.txt - backup
 * 
 * Ensures:
 * ✅ Every URL from codebase included
 * ✅ No duplicates
 * ✅ Proper categorization
 * ✅ Google News format for news
 * ✅ Auto-splits large categories (50k limit)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_URL = 'https://moneycal.in';
const PUBLIC_DIR = path.join(__dirname, '../public');
const SRC_DIR = path.join(__dirname, '../src');
const TODAY = new Date().toISOString().split('T')[0];
const MAX_URLS_PER_SITEMAP = 50000;

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🚀 PRODUCTION SITEMAP - COMPLETE CODEBASE SCAN');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log(`📅 Date: ${TODAY}\n`);

// ═══════════════════════════════════════════════════════════════════════
// STEP 1: EXTRACT ALL ROUTES FROM App.tsx
// ═══════════════════════════════════════════════════════════════════════

console.log('🔍 STEP 1: Extracting routes from App.tsx...\n');

try {
  execSync('node scripts/extract-all-routes-from-code.cjs', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  Route extraction failed, continuing with other sources...');
}

// ═══════════════════════════════════════════════════════════════════════
// STEP 2: MERGE ALL SOURCES
// ═══════════════════════════════════════════════════════════════════════

console.log('\n🔀 STEP 2: Merging all URL sources...\n');

try {
  execSync('node scripts/merge-all-urls.cjs', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  URL merge failed, using fallback...');
}

// ═══════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createStandardUrl(url, priority, changefreq, lastmod = TODAY) {
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function createGoogleNewsUrl(url, title, pubDate, keywords) {
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <news:news>
      <news:publication>
        <news:name>MoneyCal</news:name>
        <news:language>hi</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(title)}</news:title>
      <news:keywords>${escapeXml(keywords)}</news:keywords>
    </news:news>
    <lastmod>${pubDate.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

// ═══════════════════════════════════════════════════════════════════════
// STEP 3: READ MASTER URL LIST & CATEGORIZE
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 STEP 3: Reading master URL list...\n');

const masterPath = path.join(PUBLIC_DIR, 'all-urls-master.txt');
const fallbackPath = path.join(PUBLIC_DIR, 'all-urls-complete.txt');

let allUrls = [];

if (fs.existsSync(masterPath)) {
  const content = fs.readFileSync(masterPath, 'utf-8');
  allUrls = content.split('\n').map(line => line.trim()).filter(line => line && line.startsWith('http'));
  console.log(`✅ Loaded ${allUrls.length} URLs from all-urls-master.txt`);
} else if (fs.existsSync(fallbackPath)) {
  const content = fs.readFileSync(fallbackPath, 'utf-8');
  allUrls = content.split('\n').map(line => line.trim()).filter(line => line && line.startsWith('http'));
  console.log(`✅ Loaded ${allUrls.length} URLs from all-urls-complete.txt (fallback)`);
} else {
  console.log('❌ No URL source found! Exiting...');
  process.exit(1);
}

// Categorize
const categories = {
  news: [],
  blog: [],
  learn: [],
  calculators: [],
  financeTools: [],
  taxTools: [],
  gstTools: [],
  insuranceTools: [],
  festivalTools: [],
  religionTools: [],
  invoicingTools: [],
  excelTools: [],
  bankTools: [],
  government: [],
  crypto: [],
  astro: [],
  pages: []
};

// Enhanced categorization
allUrls.forEach(url => {
  const urlPath = url.replace(BASE_URL, '').toLowerCase();
  
  if (urlPath.includes('/news/')) categories.news.push(url);
  else if (urlPath.includes('/blog/')) categories.blog.push(url);
  else if (urlPath.includes('/learn')) categories.learn.push(url);
  else if (urlPath.includes('/calculator')) categories.calculators.push(url);
  else if (urlPath.includes('/finance-tools/')) categories.financeTools.push(url);
  else if (urlPath.includes('/tax-tools/')) categories.taxTools.push(url);
  else if (urlPath.includes('/gst-tools/')) categories.gstTools.push(url);
  else if (urlPath.includes('/insurance-tools/')) categories.insuranceTools.push(url);
  else if (urlPath.includes('/festival-tools/')) categories.festivalTools.push(url);
  else if (urlPath.includes('/religious-tools/')) categories.religionTools.push(url);
  else if (urlPath.includes('/invoicing-tools/')) categories.invoicingTools.push(url);
  else if (urlPath.includes('/excel-tool')) categories.excelTools.push(url);
  else if (urlPath.includes('/bank-tools')) categories.bankTools.push(url);
  else if (urlPath.includes('/tool')) categories.financeTools.push(url); // Generic tools
  else if (urlPath.includes('/government')) categories.government.push(url);
  else if (urlPath.includes('/crypto')) categories.crypto.push(url);
  else if (urlPath.includes('/astro')) categories.astro.push(url);
  else categories.pages.push(url);
});

console.log('\n📊 CATEGORIZATION:');
console.log(`   📰 News: ${categories.news.length}`);
console.log(`   📚 Learn: ${categories.learn.length}`);
console.log(`   📝 Blog: ${categories.blog.length}`);
console.log(`   🔢 Calculators: ${categories.calculators.length}`);
console.log(`   💵 Finance Tools: ${categories.financeTools.length}`);
console.log(`   📄 Tax Tools: ${categories.taxTools.length}`);
console.log(`   💰 GST Tools: ${categories.gstTools.length}`);
console.log(`   🛡️  Insurance Tools: ${categories.insuranceTools.length}`);
console.log(`   🎉 Festival Tools: ${categories.festivalTools.length}`);
console.log(`   🙏 Religious Tools: ${categories.religionTools.length}`);
console.log(`   📑 Invoicing Tools: ${categories.invoicingTools.length}`);
console.log(`   📊 Excel Tools: ${categories.excelTools.length}`);
console.log(`   🏦 Bank Tools: ${categories.bankTools.length}`);
console.log(`   🏛️  Government: ${categories.government.length}`);
console.log(`   ₿  Crypto: ${categories.crypto.length}`);
console.log(`   ⭐ Astro: ${categories.astro.length}`);
console.log(`   📄 Pages: ${categories.pages.length}`);

// ═══════════════════════════════════════════════════════════════════════
// STEP 4: LOAD NEWS METADATA
// ═══════════════════════════════════════════════════════════════════════

function loadNewsMetadata() {
  const registryPath = path.join(SRC_DIR, 'cms-content/contentRegistry.ts');
  if (!fs.existsSync(registryPath)) return [];
  
  const content = fs.readFileSync(registryPath, 'utf-8');
  const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  const categoryMatches = content.match(/category:\s*['"]([^'"]+)['"]/g) || [];
  const dateMatches = content.match(/datePublished:\s*['"]([^'"]+)['"]/g) || [];
  // Title: single line with optional \' inside
  const titleMatches = content.match(/title:\s*['`]((?:[^'`\n\\]|\\.)*)['`]/g) || [];
  
  const articles = [];
  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i].match(/['"]([^'"]+)['"]/)[1];
    const category = categoryMatches[i] ? categoryMatches[i].match(/['"]([^'"]+)['"]/)[1] : 'markets';
    const dateRaw = dateMatches[i] ? dateMatches[i].match(/['"]([^'"]+)['"]/)[1] : TODAY;
    let title = '';
    if (titleMatches[i]) {
      const m = titleMatches[i].match(/title:\s*['`]((?:[^'`\n\\]|\\.)*)['`]/);
      if (m) title = m[1].replace(/\\'/g, "'");
    }
    articles.push({
      slug,
      category,
      title,
      date: dateRaw
    });
  }
  
  return articles;
}

// ═══════════════════════════════════════════════════════════════════════
// STEP 5: GENERATE SITEMAPS
// ═══════════════════════════════════════════════════════════════════════

function generateSitemap(name, urls, priority, changefreq, isGoogleNews = false, newsArticles = null) {
  if (urls.length === 0) return [];
  
  const generatedFiles = [];
  const chunks = [];
  
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
    chunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
  }
  
  chunks.forEach((chunk, index) => {
    const suffix = chunks.length > 1 ? `-${index + 1}` : '';
    const filename = `sitemap-${name}${suffix}.xml`;
    
    let xmlHeader;
    if (isGoogleNews) {
      xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- MoneyCal ${name.toUpperCase()} - Google News - ${chunk.length} URLs - ${TODAY} -->`;
    } else {
      xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- MoneyCal ${name.toUpperCase()} - ${chunk.length} URLs - ${TODAY} -->`;
    }
    
    let urlEntries;
    if (isGoogleNews && newsArticles) {
      urlEntries = chunk.map(url => {
        const article = newsArticles.find(a => url.includes(a.slug));
        if (article && article.title) {
          const pubDate = article.date.includes('T') ? article.date : `${article.date}T10:00:00+05:30`;
          const keywords = `${article.category}, India, Finance, News`;
          return createGoogleNewsUrl(url, article.title, pubDate, keywords);
        }
        return createStandardUrl(url, priority, changefreq);
      });
    } else {
      urlEntries = chunk.map(url => createStandardUrl(url, priority, changefreq));
    }
    
    const xml = `${xmlHeader}\n${urlEntries.join('\n')}\n</urlset>`;
    fs.writeFileSync(path.join(PUBLIC_DIR, filename), xml);
    
    generatedFiles.push({ filename, count: chunk.length });
    console.log(`✅ ${filename.padEnd(35)} → ${chunk.length.toString().padStart(5)} URLs (${priority})`);
  });
  
  return generatedFiles;
}

function generateMasterIndex(allFiles, urlCounts) {
  const total = Object.values(urlCounts).reduce((sum, count) => sum + count, 0);
  
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!--
    MoneyCal Master Sitemap - Complete Codebase Scan
    Generated: ${TODAY}
    Sitemaps: ${allFiles.length}
    Total URLs: ${total}
  -->`;
  
  const entries = allFiles.map(f => `  <sitemap>
    <loc>${BASE_URL}/${f.filename}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`);
  
  const xml = `${header}\n${entries.join('\n')}\n</sitemapindex>`;
  
  const masterPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  if (fs.existsSync(masterPath)) {
    fs.copyFileSync(masterPath, path.join(PUBLIC_DIR, `sitemap-backup-${TODAY}.xml`));
  }
  
  fs.writeFileSync(masterPath, xml);
  console.log(`\n✅ sitemap.xml (Master) → ${allFiles.length} sitemaps, ${total} URLs\n`);
  
  return { total, fileCount: allFiles.length };
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════

try {
  console.log('📝 STEP 3: Generating category sitemaps...\n');
  console.log('──────────────────────────────────────────────────────────────────────');
  
  const allFiles = [];
  const urlCounts = {};
  
  // Load news metadata and build full news URL list from contentRegistry (all articles)
  const newsArticles = loadNewsMetadata();
  const newsStatic = [
    `${BASE_URL}/news`,
    `${BASE_URL}/news/shorts`,
    `${BASE_URL}/news/markets`,
    `${BASE_URL}/news/business`,
    `${BASE_URL}/news/startups`,
    `${BASE_URL}/news/economy`,
    `${BASE_URL}/news/tech-business`,
    `${BASE_URL}/news/business-analysis`
  ];
  const newsUrls = [...newsStatic, ...newsArticles.map(a => `${BASE_URL}/news/${a.category}/${a.slug}`)];
  
  // Generate all sitemaps (news = all registry articles in Google News format)
  const sitemapConfigs = [
    { name: 'news', urls: newsUrls, priority: 0.8, changefreq: 'daily', isNews: true },
    { name: 'calculators', urls: categories.calculators, priority: 0.9, changefreq: 'monthly' },
    { name: 'learn', urls: categories.learn, priority: 0.8, changefreq: 'weekly' },
    { name: 'blog', urls: categories.blog, priority: 0.7, changefreq: 'weekly' },
    { name: 'finance-tools', urls: categories.financeTools, priority: 0.75, changefreq: 'monthly' },
    { name: 'tax-tools', urls: categories.taxTools, priority: 0.75, changefreq: 'monthly' },
    { name: 'gst-tools', urls: categories.gstTools, priority: 0.75, changefreq: 'monthly' },
    { name: 'insurance-tools', urls: categories.insuranceTools, priority: 0.75, changefreq: 'monthly' },
    { name: 'festival-tools', urls: categories.festivalTools, priority: 0.7, changefreq: 'monthly' },
    { name: 'religious-tools', urls: categories.religionTools, priority: 0.7, changefreq: 'monthly' },
    { name: 'invoicing-tools', urls: categories.invoicingTools, priority: 0.75, changefreq: 'monthly' },
    { name: 'excel-tools', urls: categories.excelTools, priority: 0.7, changefreq: 'monthly' },
    { name: 'bank-tools', urls: categories.bankTools, priority: 0.75, changefreq: 'monthly' },
    { name: 'government', urls: categories.government, priority: 0.7, changefreq: 'monthly' },
    { name: 'crypto', urls: categories.crypto, priority: 0.65, changefreq: 'weekly' },
    { name: 'astro', urls: categories.astro, priority: 0.65, changefreq: 'weekly' },
    { name: 'pages', urls: categories.pages, priority: 0.6, changefreq: 'monthly' }
  ];
  
  sitemapConfigs.forEach(config => {
    if (config.urls.length > 0) {
      const files = generateSitemap(
        config.name,
        config.urls,
        config.priority,
        config.changefreq,
        config.isNews || false,
        config.isNews ? newsArticles : null
      );
      allFiles.push(...files);
      urlCounts[config.name] = config.urls.length;
    }
  });
  
  console.log('──────────────────────────────────────────────────────────────────────');
  
  // Generate master
  const result = generateMasterIndex(allFiles, urlCounts);
  
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('🎉 SITEMAP GENERATION COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log(`✅ ${result.fileCount} sitemaps | ${result.total.toLocaleString()} URLs`);
  console.log(`📁 Output: ${PUBLIC_DIR}`);
  console.log('\n🌐 Submit: https://moneycal.in/sitemap.xml');
  console.log('═══════════════════════════════════════════════════════════════════════\n');
  
  process.exit(0);
  
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
  process.exit(1);
}
