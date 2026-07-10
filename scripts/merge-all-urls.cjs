/**
 * ═══════════════════════════════════════════════════════════════════════
 * URL MERGER - COMBINES ALL SOURCES
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Merges:
 * 1. all-urls-from-code.txt (from App.tsx scan)
 * 2. all-urls-complete.txt (existing URLs)
 * 3. contentRegistry.ts news articles
 * 4. All lesson files
 * 
 * Output: all-urls-master.txt (COMPLETE, NO DUPLICATES)
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SRC_DIR = path.join(__dirname, '../src');
const BASE_URL = 'https://moneycal.in';

function normalizeUrl(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const input = raw.trim();
  if (!input.startsWith('http')) return null;

  let parsed;
  try {
    parsed = new URL(input);
  } catch {
    return null;
  }

  // Force canonical origin
  parsed.protocol = 'https:';
  parsed.hostname = 'moneycal.in';
  parsed.port = '';
  parsed.search = '';
  parsed.hash = '';

  // Aggressively remove duplicate domain path segment occurrences (handles triple+ domains too)
  let cleanPath = parsed.pathname;
  while (cleanPath.toLowerCase().includes('/moneycal.in')) {
    cleanPath = cleanPath.replace(/\/moneycal\.in(?=\/|$)/gi, '');
  }

  if (!cleanPath || cleanPath === '') cleanPath = '/';
  cleanPath = cleanPath.replace(/\/{2,}/g, '/');

  // Remove trailing slashes (except for homepage)
  if (cleanPath !== '/' && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  parsed.pathname = cleanPath;
  return parsed.toString();
}

function isIndexableUrl(url) {
  const u = url.toLowerCase();
  const blockedPatterns = [
    '/admin/',
    '/private/',
    '/api/',
    '/blog/write',
    '/hi/',
    '/amp-',
    '/404',
    '/error',
    '/redirect',
    '/duplicate',
    '/copy',
    '/staging',
    '/test',
    '/astro-finance/',
    '/gk/',
    '/fun-engagement',
    '/backlink-building',
    '/ai-personalization',
    '/seo-tools/',
    '/analytics',
  ];
  return !blockedPatterns.some((p) => u.includes(p));
}

function addUrl(rawUrl, bucket) {
  const normalized = normalizeUrl(rawUrl);
  if (!normalized) return;
  if (!isIndexableUrl(normalized)) return;
  bucket.add(normalized);
}

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🔀 MERGING ALL URL SOURCES');
console.log('═══════════════════════════════════════════════════════════════════════\n');

const allUrls = new Set();

const safeAddUrl = (url) => {
  if (!url) return;
  const normalized = url.startsWith('/') ? `${BASE_URL}${url}` : url;
  addUrl(normalized, allUrls);
};

const addSlugsFromFile = (filePath, prefix) => {
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  slugMatches.forEach((match) => {
    const slug = match.match(/['"]([^'"]+)['"]/)[1];
    safeAddUrl(`${BASE_URL}${prefix}/${slug}`);
  });
  return slugMatches.length;
};

// First, build complete learn URLs
console.log('📚 Step 1: Building complete learn URLs...\n');
try {
  require('./build-complete-learn-urls.cjs');
} catch (error) {
  console.log('⚠️  Learn URL builder failed:', error.message);
}

// ═══════════════════════════════════════════════════════════════════════
// 1. FROM all-learn-urls.txt (complete learn platform)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 1: all-learn-urls.txt (complete learn platform)...');
const learnPath = path.join(PUBLIC_DIR, 'all-learn-urls.txt');
if (fs.existsSync(learnPath)) {
  const content = fs.readFileSync(learnPath, 'utf-8');
  content.split('\n').forEach(line => {
    addUrl(line, allUrls);
  });
  console.log(`✅ Added ${allUrls.size} learn URLs`);
}

// ═══════════════════════════════════════════════════════════════════════
// 2. FROM App.tsx (routes)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 2: App.tsx routes...');
const fromCodePath = path.join(PUBLIC_DIR, 'all-urls-from-code.txt');
if (fs.existsSync(fromCodePath)) {
  const content = fs.readFileSync(fromCodePath, 'utf-8');
  content.split('\n').forEach(line => {
    addUrl(line, allUrls);
  });
  console.log(`✅ Added ${allUrls.size} URLs from App.tsx`);
}

// ═══════════════════════════════════════════════════════════════════════
// 3. FROM all-urls-complete.txt (existing)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 3: all-urls-complete.txt...');
const completePath = path.join(PUBLIC_DIR, 'all-urls-complete.txt');
const beforeCount = allUrls.size;
if (fs.existsSync(completePath)) {
  const content = fs.readFileSync(completePath, 'utf-8');
  content.split('\n').forEach(line => {
    addUrl(line, allUrls);
  });
  console.log(`✅ Added ${allUrls.size - beforeCount} new URLs (total now: ${allUrls.size})`);
}

// ═══════════════════════════════════════════════════════════════════════
// 4. FROM contentRegistry.ts (all news)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 4: contentRegistry.ts (news articles)...');
const registryPath = path.join(SRC_DIR, 'cms-content/contentRegistry.ts');
const beforeCount2 = allUrls.size;
if (fs.existsSync(registryPath)) {
  const content = fs.readFileSync(registryPath, 'utf-8');
  // Split by object boundaries
  const blocks = content.split(/\n\s*\{/).slice(1);
  const categorySet = new Set();

  blocks.forEach(block => {
    const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
    const categoryMatch = block.match(/category:\s*['"]([^'"]+)['"]/);

    if (slugMatch) {
      const slug = slugMatch[1];
      const category = categoryMatch ? categoryMatch[1] : 'markets';
      addUrl(`${BASE_URL}/news/${category}/${slug}`, allUrls);
      categorySet.add(category);
    }
  });

  // Add category pages
  categorySet.forEach((cat) => {
    addUrl(`${BASE_URL}/news/${cat}`, allUrls);
  });
  addUrl(`${BASE_URL}/news`, allUrls);

  console.log(`✅ Added ${allUrls.size - beforeCount2} news URLs (total now: ${allUrls.size})`);
}

// ═══════════════════════════════════════════════════════════════════════
// 5. FROM calculatorData.ts (calculator and category routes)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 5: calculatorData.ts (calculator and category routes)...');
const calculatorDataPath = path.join(SRC_DIR, 'data/calculatorData.ts');
if (fs.existsSync(calculatorDataPath)) {
  const content = fs.readFileSync(calculatorDataPath, 'utf-8');
  const calculatorMatches = content.match(/id:\s*['"]([^'"]+)['"][^}]*?category:\s*['"][^'"]+['"]/gs) || [];
  const categoryMatches = content.match(/id:\s*['"]([^'"]+)['"][^}]*?calculators:\s*\[/gs) || [];
  const before = allUrls.size;

  calculatorMatches.forEach((match) => {
    const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      safeAddUrl(`${BASE_URL}/calculators/${idMatch[1]}`);
    }
  });

  categoryMatches.forEach((match) => {
    const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      safeAddUrl(`${BASE_URL}/category/${idMatch[1]}`);
    }
  });

  console.log(`✅ Added ${allUrls.size - before} calculator/category URLs`);
}

// ═══════════════════════════════════════════════════════════════════════
// 6. FROM blog data (blog posts)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 6: Blog data (blog posts)...');
const blogDataDir = path.join(SRC_DIR, 'data');
const blogsDir = path.join(SRC_DIR, 'data/blogs');
let blogCount = 0;
if (fs.existsSync(blogDataDir)) {
  const blogFiles = fs.readdirSync(blogDataDir).filter((file) => file.startsWith('blogData') && file.endsWith('.ts'));
  blogFiles.forEach((file) => {
    blogCount += addSlugsFromFile(path.join(blogDataDir, file), '/blog');
  });
  blogCount += addSlugsFromFile(path.join(blogDataDir, 'optimizedBlogPosts.ts'), '/blog');
}
if (fs.existsSync(blogsDir)) {
  const walk = (dir) => {
    fs.readdirSync(dir).forEach((entry) => {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.ts')) {
        blogCount += addSlugsFromFile(fullPath, '/blog');
      }
    });
  };
  walk(blogsDir);
}
console.log(`✅ Added ${blogCount} blog URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 7. FROM Excel tool posts (ExcelToolPost)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 7: Excel tool blog posts...');
const excelPostCount =
  addSlugsFromFile(path.join(SRC_DIR, 'data/exceltooldata.ts'), '/exceltool') +
  addSlugsFromFile(path.join(SRC_DIR, 'data/newExcelData.ts'), '/exceltool');
console.log(`✅ Added ${excelPostCount} Excel tool post URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 8. FROM Excel tools (ExcelToolDetail)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 8: Excel tools...');
const excelToolsCount = addSlugsFromFile(path.join(SRC_DIR, 'data/excelToolsData.ts'), '/excel-tools');
console.log(`✅ Added ${excelToolsCount} Excel tool URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 9. FROM festival tools (FestivalLanding + FestivalToolPage)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 9: Festival tools...');
const festivalDataPath = path.join(SRC_DIR, 'data/festivalTools.ts');
if (fs.existsSync(festivalDataPath)) {
  const content = fs.readFileSync(festivalDataPath, 'utf-8');
  const festivalSlugs = new Set();
  let currentFestival = null;
  content.split('\n').forEach((line) => {
    const festivalMatch = line.match(/^\s{4}slug:\s*['"]([^'"]+)['"]/);
    if (festivalMatch) {
      currentFestival = festivalMatch[1];
      festivalSlugs.add(currentFestival);
      return;
    }
    const toolMatch = line.match(/^\s{6,8}slug:\s*['"]([^'"]+)['"]/);
    if (toolMatch && currentFestival) {
      safeAddUrl(`${BASE_URL}/festival-tools/${currentFestival}/${toolMatch[1]}`);
    }
  });
  festivalSlugs.forEach((slug) => safeAddUrl(`${BASE_URL}/festival-tools/${slug}`));
  console.log(`✅ Added ${festivalSlugs.size} festivals and tool URLs`);
}

// ═══════════════════════════════════════════════════════════════════════
// 10. FROM gold tools (GoldToolPage)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 10: Gold tools...');
const goldToolsCount = addSlugsFromFile(path.join(SRC_DIR, 'data/goldTools.ts'), '/gold-tools');
console.log(`✅ Added ${goldToolsCount} gold tool URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 11. FROM governmentSchemesData.ts (government scheme posts)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 11: Government schemes...');
const schemeDataPath = path.join(SRC_DIR, 'data/governmentSchemesData.ts');
const schemeCount = addSlugsFromFile(schemeDataPath, '/government-schemes');
console.log(`✅ Added ${schemeCount} government scheme URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 12. FROM cryptoData.ts (crypto articles)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 12: Crypto articles...');
const cryptoDataPath = path.join(SRC_DIR, 'data/cryptoData.ts');
const cryptoCount = addSlugsFromFile(cryptoDataPath, '/crypto');
console.log(`✅ Added ${cryptoCount} crypto URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 13. FROM 2026 Strategic Silos (msme, land, etc.)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 13: 2026 Strategic Silos...');
const SILOS_DIR = path.join(SRC_DIR, 'data/silos');
const siloCount = 
  addSlugsFromFile(path.join(SILOS_DIR, 'msmeSubsidiesData.ts'), '/msme-subsidies') +
  addSlugsFromFile(path.join(SILOS_DIR, 'landRecordsData.ts'), '/land-records') +
  addSlugsFromFile(path.join(SILOS_DIR, 'scholarshipsData.ts'), '/scholarships') +
  addSlugsFromFile(path.join(SILOS_DIR, 'youthBankingData.ts'), '/youth-banking') +
  addSlugsFromFile(path.join(SILOS_DIR, 'taxation2026Data.ts'), '/taxation-2026') +
  addSlugsFromFile(path.join(SILOS_DIR, 'scamDiagnosticsData.ts'), '/scam-diagnostics') +
  addSlugsFromFile(path.join(SILOS_DIR, 'tradingTerminalsData.ts'), '/trading-terminals') +
  addSlugsFromFile(path.join(SILOS_DIR, 'macroTrendsData.ts'), '/macro-trends') +
  addSlugsFromFile(path.join(SILOS_DIR, 'insuranceNicheData.ts'), '/insurance-niche');
console.log(`✅ Added ${siloCount} strategic silo URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 13. FROM teamProfiles.ts (news author pages)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 13: News author profiles...');
const teamProfilesPath = path.join(SRC_DIR, 'data/teamProfiles.ts');
if (fs.existsSync(teamProfilesPath)) {
  const content = fs.readFileSync(teamProfilesPath, 'utf-8');
  const authorMatches = content.match(/id:\s*['"]([^'"]+)['"]/g) || [];
  const before = allUrls.size;
  authorMatches.forEach((match) => {
    const id = match.match(/['"]([^'"]+)['"]/)[1];
    safeAddUrl(`${BASE_URL}/news/author/${id}`);
  });
  console.log(`✅ Added ${allUrls.size - before} author URLs`);
}

// ═══════════════════════════════════════════════════════════════════════
// 14. FROM src/data/ipo (IPO articles)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 14: IPO articles...');
const ipoDataDir = path.join(SRC_DIR, 'data/ipo');
let ipoCount = 0;
if (fs.existsSync(ipoDataDir)) {
  ipoCount += addSlugsFromFile(path.join(SRC_DIR, 'services/ipoApi.ts'), '/ipo');

  const ipoFiles = fs.readdirSync(ipoDataDir).filter(f => f.endsWith('.ts'));
  ipoFiles.forEach(file => {
    ipoCount += addSlugsFromFile(path.join(ipoDataDir, file), '/ipo');
  });
}
console.log(`✅ Added ${ipoCount} IPO URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 14b. FROM src/data/discover (Discover articles & Web Stories)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 14b: Discover & Web Stories...');
const discoverDataDir = path.join(SRC_DIR, 'data/discover');
let discoverCount = 0;
if (fs.existsSync(discoverDataDir)) {
  const discoverFiles = fs.readdirSync(discoverDataDir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');
  discoverFiles.forEach(file => {
    discoverCount += addSlugsFromFile(path.join(discoverDataDir, file), '/discover');
  });
}
const storiesDataDir = path.join(SRC_DIR, 'data/web-stories');
if (fs.existsSync(storiesDataDir)) {
  const storiesFiles = fs.readdirSync(storiesDataDir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');
  storiesFiles.forEach(file => {
    discoverCount += addSlugsFromFile(path.join(storiesDataDir, file), '/web-stories');
  });
}
console.log(`✅ Added ${discoverCount} Discover & Web Stories URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 15. GK URLs excluded from sitemap (off-brand / duplicate patterns)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 15: GK topics (skipped — excluded from index)');

// ═══════════════════════════════════════════════════════════════════════
// SAVE MERGED MASTER LIST
// ═══════════════════════════════════════════════════════════════════════

const sortedUrls = Array.from(allUrls).sort((a, b) => a.localeCompare(b));
const outputPath = path.join(PUBLIC_DIR, 'all-urls-master.txt');
fs.writeFileSync(outputPath, sortedUrls.join('\n'));

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log('🎉 URL MERGE COMPLETE!');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log(`✅ Total Unique URLs: ${sortedUrls.length}`);
console.log(`💾 Saved to: all-urls-master.txt`);
console.log('\n✨ This is the COMPLETE URL list (no duplicates, from entire codebase)');
console.log('═══════════════════════════════════════════════════════════════════════\n');

