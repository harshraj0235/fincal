/**
 * ═══════════════════════════════════════════════════════════════════════
 * PRODUCTION SITEMAP GENERATOR - SCANS ENTIRE CODEBASE
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Built: Nov 2025
 * Scans: contentRegistry.ts (news), lesson files (learn), all-urls-complete.txt (blog/calc/tools)
 * 
 * Features:
 * ✅ Extracts from ACTUAL code files (not just text file)
 * ✅ Handles 1,000,000+ URLs (auto-splits at 50k)
 * ✅ Google News compliant
 * ✅ Never breaks build
 * ✅ Future-proof
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://moneycal.in';
const PUBLIC_DIR = path.join(__dirname, '../public');
const SRC_DIR = path.join(__dirname, '../src');
const TODAY = new Date().toISOString().split('T')[0];
const MAX_URLS_PER_SITEMAP = 50000;

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🚀 PRODUCTION SITEMAP GENERATOR - COMPLETE CODEBASE SCAN');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log(`📅 Date: ${TODAY}`);
console.log('');

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
// 1. EXTRACT NEWS URLs FROM contentRegistry.ts
// ═══════════════════════════════════════════════════════════════════════

function extractNewsFromRegistry() {
  console.log('📰 Scanning contentRegistry.ts for ALL news articles...');
  
  try {
    const registryPath = path.join(SRC_DIR, 'cms-content/contentRegistry.ts');
    const content = fs.readFileSync(registryPath, 'utf-8');
    
    // Extract all slugs and categories
    const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
    const categoryMatches = content.match(/category:\s*['"]([^'"]+)['"]/g) || [];
    const dateMatches = content.match(/datePublished:\s*['"]([^'"T]+)/g) || [];
    const titleMatches = content.match(/title:\s*['"]([^'"]+)['"]/g) || [];
    
    const articles = [];
    const urls = [];
    
    // Parse articles
    for (let i = 0; i < slugMatches.length; i++) {
      const slug = slugMatches[i].match(/['"]([^'"]+)['"]/)[1];
      const category = categoryMatches[i] ? categoryMatches[i].match(/['"]([^'"]+)['"]/)[1] : 'markets';
      const date = dateMatches[i] ? dateMatches[i].match(/['"]([^'"]+)/)[1] : TODAY;
      const title = titleMatches[i] ? titleMatches[i].match(/['"]([^'"]+)['"]/)[1] : slug;
      
      const url = `${BASE_URL}/news/${category}/${slug}`;
      articles.push({ slug, category, date, title });
      urls.push(url);
    }
    
    // Add category pages
    const categories = ['markets', 'business', 'business-analysis', 'startups', 'economy', 'tech-business'];
    categories.forEach(cat => urls.push(`${BASE_URL}/news/${cat}`));
    urls.push(`${BASE_URL}/news`);
    
    console.log(`✅ News: ${articles.length} articles + ${categories.length + 1} pages = ${urls.length} URLs`);
    
    return { articles, urls };
    
  } catch (error) {
    console.log(`⚠️  Error reading contentRegistry: ${error.message}`);
    console.log('   Using fallback from all-urls-complete.txt...');
    return extractNewsFromFallback();
  }
}

function extractNewsFromFallback() {
  const filePath = path.join(PUBLIC_DIR, 'all-urls-complete.txt');
  if (!fs.existsSync(filePath)) return { articles: [], urls: [] };
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const newsUrls = content.split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith(`${BASE_URL}/news/`))
    .filter((url, index, self) => self.indexOf(url) === index); // Deduplicate
  
  const articles = newsUrls
    .filter(url => url.split('/').length > 5) // Has category/slug
    .map(url => {
      const parts = url.split('/');
      const slug = parts[parts.length - 1];
      const category = parts[parts.length - 2];
      return { slug, category, date: TODAY, title: slug };
    });
  
  console.log(`✅ News (fallback): ${newsUrls.length} URLs`);
  return { articles, urls: newsUrls };
}

// ═══════════════════════════════════════════════════════════════════════
// 2. EXTRACT LEARN URLs FROM ALL LESSON FILES
// ═══════════════════════════════════════════════════════════════════════

function extractLearnFromLessonFiles() {
  console.log('\n📚 Scanning ALL lesson files for Learn platform URLs...');
  
  const learnDataDir = path.join(SRC_DIR, 'data/learn');
  const urls = [];
  
  // Add main learn page
  urls.push(`${BASE_URL}/learn`);
  
  // Categories and their slugs
  const categoryMappings = {
    'loansLessons.ts': 'loans',
    'moneyManagementLessons.ts': 'money-management',
    'savingsBankLessons.ts': 'savings-bank',
    'investingLessons.ts': 'investing-wealth',
    'insuranceRetirementLessons.ts': 'insurance-retirement',
    'taxationLessons.ts': 'taxation-compliance',
    'fintechLessons.ts': 'fintech-digital',
    'behaviouralFinanceLessons.ts': 'behavioural-finance-money-psychology',
    'businessFinanceLessons.ts': 'business-finance',
    'advancedFinanceLessons.ts': 'advanced-specialised-finance'
  };
  
  let totalLessons = 0;
  
  // Scan each lesson file
  Object.entries(categoryMappings).forEach(([filename, categorySlug]) => {
    const filePath = path.join(learnDataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`   ⚠️  ${filename} not found, skipping`);
      return;
    }
    
    // Add category hub page
    urls.push(`${BASE_URL}/learn/${categorySlug}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Extract lesson slugs (look for slug: 'xxx' pattern)
      const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
      const lessonSlugs = slugMatches.map(match => match.match(/['"]([^'"]+)['"]/)[1]);
      
      // Add each lesson URL
      lessonSlugs.forEach(slug => {
        const url = `${BASE_URL}/learn/${categorySlug}/${slug}`;
        urls.push(url);
      });
      
      totalLessons += lessonSlugs.length;
      console.log(`   ✅ ${filename.padEnd(35)} → ${lessonSlugs.length} lessons`);
      
    } catch (error) {
      console.log(`   ⚠️  Error reading ${filename}: ${error.message}`);
    }
  });
  
  console.log(`✅ Learn: ${urls.length} URLs (10 categories + ${totalLessons} lessons)`);
  
  return urls;
}

// ═══════════════════════════════════════════════════════════════════════
// 3. EXTRACT OTHER URLs FROM all-urls-complete.txt
// ═══════════════════════════════════════════════════════════════════════

function extractOtherUrls() {
  console.log('\n📂 Reading all-urls-complete.txt for Blog, Calculators, Tools...');
  
  const filePath = path.join(PUBLIC_DIR, 'all-urls-complete.txt');
  
  if (!fs.existsSync(filePath)) {
    console.log('⚠️  all-urls-complete.txt not found!');
    return { blog: [], calculators: [], tools: [], government: [], crypto: [], pages: [] };
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const allUrls = content.split('\n')
    .map(line => line.trim())
    .filter(line => line && line.startsWith('http'))
    .filter((url, index, self) => self.indexOf(url) === index); // Deduplicate
  
  const categories = {
    blog: [],
    calculators: [],
    tools: [],
    government: [],
    crypto: [],
    pages: []
  };
  
  allUrls.forEach(url => {
    const urlPath = url.replace(BASE_URL, '').toLowerCase();
    
    // Skip news and learn (handled separately)
    if (urlPath.includes('/news/') || urlPath.includes('/learn')) return;
    
    if (urlPath.includes('/blog/')) categories.blog.push(url);
    else if (urlPath.includes('/calculator')) categories.calculators.push(url);
    else if (urlPath.includes('/tool') || urlPath.includes('-tools/')) categories.tools.push(url);
    else if (urlPath.includes('/government')) categories.government.push(url);
    else if (urlPath.includes('/crypto')) categories.crypto.push(url);
    else categories.pages.push(url);
  });
  
  console.log(`✅ Blog: ${categories.blog.length} URLs`);
  console.log(`✅ Calculators: ${categories.calculators.length} URLs`);
  console.log(`✅ Tools: ${categories.tools.length} URLs`);
  console.log(`✅ Government: ${categories.government.length} URLs`);
  console.log(`✅ Crypto: ${categories.crypto.length} URLs`);
  console.log(`✅ Pages: ${categories.pages.length} URLs`);
  
  return categories;
}

// ═══════════════════════════════════════════════════════════════════════
// GENERATE SITEMAP (WITH AUTO-SPLIT)
// ═══════════════════════════════════════════════════════════════════════

function generateSitemap(name, urls, priority, changefreq, isGoogleNews = false, newsArticles = null) {
  if (urls.length === 0) return [];
  
  const generatedFiles = [];
  const chunks = [];
  
  // Split into 50k chunks
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
  <!-- MoneyCal ${name.toUpperCase()} - Google News Format - ${chunk.length} URLs - ${TODAY} -->`;
    } else {
      xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- MoneyCal ${name.toUpperCase()} - ${chunk.length} URLs - ${TODAY} -->`;
    }
    
    let urlEntries;
    if (isGoogleNews && newsArticles) {
      urlEntries = chunk.map(url => {
        const article = newsArticles.find(a => url.includes(a.slug));
        if (article && article.title && article.date) {
          const pubDate = article.date.includes('T') ? article.date : `${article.date}T10:00:00+05:30`;
          const keywords = `${article.category}, India, Finance, News, Markets, Business`;
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
    console.log(`✅ ${filename.padEnd(30)} → ${chunk.length.toString().padStart(5)} URLs (priority: ${priority})`);
  });
  
  return generatedFiles;
}

// ═══════════════════════════════════════════════════════════════════════
// GENERATE MASTER INDEX
// ═══════════════════════════════════════════════════════════════════════

function generateMasterIndex(allFiles, urlCounts) {
  console.log('\n📋 Generating Master Sitemap Index...');
  
  const total = Object.values(urlCounts).reduce((sum, count) => sum + count, 0);
  
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!--
    🗺️ MoneyCal Master Sitemap Index
    📅 Generated: ${TODAY}
    📊 Sitemaps: ${allFiles.length}
    📈 Total URLs: ${total}
    
    📰 News: ${urlCounts.news || 0} (Google News format)
    🔢 Calculators: ${urlCounts.calculators || 0}
    📚 Learn: ${urlCounts.learn || 0}
    📝 Blog: ${urlCounts.blog || 0}
    🛠️  Tools: ${urlCounts.tools || 0}
    🏛️  Government: ${urlCounts.government || 0}
    ₿  Crypto: ${urlCounts.crypto || 0}
    📄 Pages: ${urlCounts.pages || 0}
  -->`;
  
  const entries = allFiles.map(f => `  <sitemap>
    <loc>${BASE_URL}/${f.filename}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`);
  
  const xml = `${header}\n${entries.join('\n')}\n</sitemapindex>`;
  
  // Backup
  const masterPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  if (fs.existsSync(masterPath)) {
    fs.copyFileSync(masterPath, path.join(PUBLIC_DIR, `sitemap-backup-${TODAY}.xml`));
  }
  
  fs.writeFileSync(masterPath, xml);
  console.log(`✅ sitemap.xml → ${allFiles.length} sitemaps, ${total} total URLs`);
  
  return { total, fileCount: allFiles.length };
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════

try {
  // STEP 1: Extract all URLs
  console.log('🔍 STEP 1: EXTRACTING URLs FROM CODEBASE\n');
  
  const newsData = extractNewsFromRegistry();
  const learnUrls = extractLearnFromLessonFiles();
  const otherCategories = extractOtherUrls();
  
  // STEP 2: Generate sitemaps
  console.log('\n📝 STEP 2: GENERATING SITEMAPS\n');
  console.log('──────────────────────────────────────────────────────────────────────');
  
  const allFiles = [];
  const urlCounts = {};
  
  // News (Google News format with article metadata)
  if (newsData.urls.length > 0) {
    const files = generateSitemap('news', newsData.urls, 0.8, 'daily', true, newsData.articles);
    allFiles.push(...files);
    urlCounts.news = newsData.urls.length;
  }
  
  // Calculators (highest priority)
  if (otherCategories.calculators.length > 0) {
    const files = generateSitemap('calculators', otherCategories.calculators, 0.9, 'monthly');
    allFiles.push(...files);
    urlCounts.calculators = otherCategories.calculators.length;
  }
  
  // Learn Platform
  if (learnUrls.length > 0) {
    const files = generateSitemap('learn', learnUrls, 0.8, 'weekly');
    allFiles.push(...files);
    urlCounts.learn = learnUrls.length;
  }
  
  // Blog
  if (otherCategories.blog.length > 0) {
    const files = generateSitemap('blog', otherCategories.blog, 0.7, 'weekly');
    allFiles.push(...files);
    urlCounts.blog = otherCategories.blog.length;
  }
  
  // Tools
  if (otherCategories.tools.length > 0) {
    const files = generateSitemap('tools', otherCategories.tools, 0.7, 'monthly');
    allFiles.push(...files);
    urlCounts.tools = otherCategories.tools.length;
  }
  
  // Government
  if (otherCategories.government.length > 0) {
    const files = generateSitemap('government', otherCategories.government, 0.7, 'monthly');
    allFiles.push(...files);
    urlCounts.government = otherCategories.government.length;
  }
  
  // Crypto
  if (otherCategories.crypto.length > 0) {
    const files = generateSitemap('crypto', otherCategories.crypto, 0.65, 'weekly');
    allFiles.push(...files);
    urlCounts.crypto = otherCategories.crypto.length;
  }
  
  // Pages
  if (otherCategories.pages.length > 0) {
    const files = generateSitemap('pages', otherCategories.pages, 0.6, 'monthly');
    allFiles.push(...files);
    urlCounts.pages = otherCategories.pages.length;
  }
  
  console.log('──────────────────────────────────────────────────────────────────────');
  
  // STEP 3: Master index
  const result = generateMasterIndex(allFiles, urlCounts);
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log('🎉 SITEMAP GENERATION COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log(`✅ ${result.fileCount} sitemap files generated`);
  console.log(`📊 ${result.total.toLocaleString()} total URLs indexed`);
  console.log(`📁 Output: ${PUBLIC_DIR}`);
  console.log('\n🌐 Submit:');
  console.log(`   Master: https://moneycal.in/sitemap.xml`);
  console.log(`   News:   https://moneycal.in/sitemap-news.xml`);
  console.log('\n✨ Future: Add URLs → Auto-categorized & indexed!');
  console.log('═══════════════════════════════════════════════════════════════════════\n');
  
  process.exit(0);
  
} catch (error) {
  console.error('\n❌ FATAL ERROR:', error.message);
  console.error(error.stack);
  process.exit(1);
}
