/**
 * ═══════════════════════════════════════════════════════════════════════
 * PRODUCTION SITEMAP GENERATOR - COMPLETE CODEBASE SCAN
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Optimized Phase 8 - Consolidates all sitemaps into a single index
 * 
 * Sources:
 * 1. App.tsx - All routes
 * 2. contentRegistry.ts - News articles
 * 3. All lesson files - Learn lessons
 * 4. all-urls-master.txt - Merged URL list
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_URL = 'https://moneycal.in';
const PUBLIC_DIR = path.join(__dirname, '../public');
const SRC_DIR = path.join(__dirname, '../src');
const TODAY = new Date().toISOString().split('T')[0];
const MAX_URLS_PER_SITEMAP = 45000;

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🚀 PRODUCTION SITEMAP - COMPLETE CODEBASE SCAN (PHASE 8)');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log(`📅 Date: ${TODAY}\n`);

// ═══════════════════════════════════════════════════════════════════════
// PRE-STEP: Generate GK School JSON bundles
// ═══════════════════════════════════════════════════════════════════════
try {
  const GK_DIR = path.join(PUBLIC_DIR, 'gk');
  const readJson = (name) => {
    try {
      const fp = path.join(GK_DIR, name);
      const raw = fs.readFileSync(fp, 'utf8');
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  };
  const readParts = (base, count = 4) => {
    const out = [];
    for (let i = 1; i <= count; i += 1) {
      out.push(...readJson(`${base}-part${i}.json`));
    }
    return out;
  };
  const writeJson = (slug, items) => {
    const fp = path.join(GK_DIR, `${slug}.json`);
    fs.writeFileSync(fp, JSON.stringify(items, null, 2), 'utf8');
  };
  const dedupe = (items) => {
    const seen = new Set();
    const out = [];
    for (const it of items) {
      const key = `${(it.question || '').trim().toLowerCase()}|${(it.answer || '').trim().toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(it);
      }
    }
    return out;
  };
  const pick = (items, limit = 200, filter = {}) => {
    let list = items.slice();
    if (filter.language) list = list.filter(q => q.language === filter.language);
    if (filter.levels) list = list.filter(q => filter.levels.includes(q.level));
    if (filter.categories) list = list.filter(q => filter.categories.includes(q.category));
    list = dedupe(list);
    return list.slice(0, limit);
  };
  
  const general = readJson('general-knowledge-in-hindi.json');
  const india = readJson('india-gk-questions-in-hindi.json');
  const animals = readParts('animals-gk-in-hindi');
  const history = readParts('indian-history-gk-in-hindi');
  const geography = readParts('indian-geography-gk-in-hindi');
  const science = readParts('science-gk-questions-in-hindi');
  const symbols = readParts('national-symbols-gk-in-hindi');
  
  writeJson('kids-gk-in-hindi', pick([...animals, ...general, ...symbols], 200, { language: 'hi', levels: ['easy'] }));
  writeJson('class-6-gk-questions-in-hindi', pick([...general, ...india, ...science, ...geography], 200, { language: 'hi', levels: ['easy'] }));
  writeJson('class-7-gk-questions-in-hindi', pick([...general, ...history, ...science], 200, { language: 'hi', levels: ['easy', 'medium'] }));
  writeJson('class-8-gk-questions-in-hindi', pick([...general, ...india, ...geography, ...science], 200, { language: 'hi', levels: ['easy', 'medium'] }));

  console.log('✅ GK School JSON bundles generated');
} catch (err) {
  console.log('⚠️ GK JSON generation skipped:', err.message);
}

// ═══════════════════════════════════════════════════════════════════════
// STEP 1: REBUILD URL LISTS
// ═══════════════════════════════════════════════════════════════════════
console.log('\n🔍 STEP 1: Rebuilding URL sources...');
try {
  execSync('node scripts/extract-all-routes-from-code.cjs', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  execSync('node scripts/merge-all-urls.cjs', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
} catch (error) {
  console.log('⚠️ Source rebuild had warnings, proceeding with existing master list...');
}

// ═══════════════════════════════════════════════════════════════════════
// STEP 2: CATEGORIZATION & NORMALIZATION
// ═══════════════════════════════════════════════════════════════════════
const sitemapConfigs = [
  { name: 'news-pages', pattern: /\/news\//, priority: 0.9, changefreq: 'hourly' },
  { name: 'games', pattern: /\/games(\/|$)/, priority: 0.9, changefreq: 'daily' },
  { name: 'calculators', pattern: /\/calculators\//, priority: 0.8, changefreq: 'daily' },
  { name: 'learn', pattern: /\/learn\//, priority: 0.8, changefreq: 'daily' },
  { name: 'government', pattern: /\/government-schemes\//, priority: 0.8, changefreq: 'daily' },
  { name: 'strategic', pattern: /(\/msme-subsidies\/|\/land-records\/|\/scholarships\/|\/youth-banking\/|\/taxation-2026\/|\/scam-diagnostics\/|\/trading-terminals\/|\/macro-trends\/|\/insurance-niche\/)/, priority: 0.9, changefreq: 'daily' },
  { name: 'blog', pattern: /\/blog\//, priority: 0.7, changefreq: 'daily' },
  { name: 'loan-tools', pattern: /\/loan-tools\//, priority: 0.8, changefreq: 'weekly' },
  { name: 'gst-tools', pattern: /\/gst-tools\//, priority: 0.8, changefreq: 'weekly' },
  { name: 'ipo', pattern: /\/ipo(\/|$)/, priority: 0.8, changefreq: 'daily' },
  { name: 'tools', pattern: /(\/finance-tools\/|\/tax-tools\/|\/insurance-tools\/|\/bank-tools\/|\/excel-tools\/)/, priority: 0.7, changefreq: 'weekly' },
  { name: 'festivals', pattern: /\/festival-tools\//, priority: 0.5, changefreq: 'monthly' },
  { name: 'market', pattern: /(\/gold-rate|\/silver-rate)/, priority: 0.8, changefreq: 'daily' }
];

function isLowValueUrl(url) {
  const u = url.toLowerCase();
  const thinPatterns = [
    '/festival-tools', // Remove all festival tools completely
    '/gk/', // Remove all general knowledge
    '/astro-finance', // Remove all astro finance
    '/puja/',
    '/chhath-puja',
    '/bihu',
    '/makar-sankranti',
    '/lohri',
    '/eid',
    '/ramadan',
    '/parsi',
    '/onam',
    '/akshaya-tritiya',
    '/buddha-purnima',
    '/easter',
    '/design-tools',
    '/seo-tools',
    '/fun-engagement',
    '/backlink-building',
    '/ai-personalization',
    '/analytics',
    '/author/',
    '/embed/',
    '/2026-financial-strategy',
    '/staging',
    '/test'
  ];
  return thinPatterns.some(p => u.includes(p));
}

function escapeXml(str) {
  return str.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
    }
  });
}

async function generateSitemaps() {
  const masterListPath = path.join(PUBLIC_DIR, 'all-urls-master.txt');
  if (!fs.existsSync(masterListPath)) {
    console.error('❌ Error: master list missing.');
    return;
  }

  const allUrls = fs.readFileSync(masterListPath, 'utf-8')
    .split('\n')
    .map(u => u.trim())
    .filter(u => u && !isLowValueUrl(u));

  console.log(`📊 Processing ${allUrls.length} unique base URLs...`);

  // Expand URLs for i18n
  const expandedUrls = [];
  allUrls.forEach(url => {
    // Strip trailing slashes to keep things clean
    const cleanUrl = url.replace(/\/$/, '');
    const pathPart = cleanUrl.replace(BASE_URL, '') || '/';
    const hiUrl = `${BASE_URL}/hi${pathPart === '/' ? '' : pathPart}`;
    
    // English entry
    expandedUrls.push({
      loc: cleanUrl,
      en: cleanUrl,
      hi: hiUrl
    });
    
    // Hindi entry
    expandedUrls.push({
      loc: hiUrl,
      en: cleanUrl,
      hi: hiUrl
    });
  });

  console.log(`🌍 Expanded to ${expandedUrls.length} total URLs (including /hi/ variants)`);

  const buckets = {};
  sitemapConfigs.forEach(c => buckets[c.name] = []);
  buckets['other'] = [];

  expandedUrls.forEach(item => {
    const config = sitemapConfigs.find(c => c.pattern.test(item.loc));
    const targetBucket = config ? config.name : 'other';
    buckets[targetBucket].push(item);
  });

  const processedFiles = [];

  for (const [name, urls] of Object.entries(buckets)) {
    if (urls.length === 0) continue;
    const config = sitemapConfigs.find(c => c.name === name) || { priority: 0.6, changefreq: 'weekly' };
    
    for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
      const chunk = urls.slice(i, i + MAX_URLS_PER_SITEMAP);
      const filename = urls.length > MAX_URLS_PER_SITEMAP 
        ? `sitemap-${name}-${Math.floor(i / MAX_URLS_PER_SITEMAP) + 1}.xml`
        : `sitemap-${name}.xml`;

      let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<!-- MoneyCal ${name.toUpperCase()} - ${chunk.length} URLs - ${TODAY} -->\n`;

      chunk.forEach(item => {
        xml += `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(item.en)}" />
    <xhtml:link rel="alternate" hreflang="hi" href="${escapeXml(item.hi)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(item.en)}" />
    <lastmod>${TODAY}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority.toFixed(1)}</priority>
  </url>\n`;
      });

      xml += '</urlset>';
      fs.writeFileSync(path.join(PUBLIC_DIR, filename), xml);
      processedFiles.push(filename);
      console.log(`✅ ${filename} (${chunk.length} URLs)`);
    }
  }

  // Generate Master Index
  const masterPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<!-- Master Sitemap Index - Total ${processedFiles.length} sitemaps -->\n`;

  processedFiles.forEach(file => {
    indexXml += `  <sitemap>
    <loc>${BASE_URL}/${file}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>\n`;
  });

  // Include Discover/Web Stories sitemap
  if (fs.existsSync(path.join(PUBLIC_DIR, 'sitemap-discover.xml'))) {
    indexXml += `  <sitemap>
    <loc>${BASE_URL}/sitemap-discover.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>\n`;
  }

  indexXml += '</sitemapindex>';
  fs.writeFileSync(masterPath, indexXml);
  console.log(`\n🎉 SUCCESS! sitemap.xml generated with ${processedFiles.length} entries.`);
}

generateSitemaps().catch(console.error);
