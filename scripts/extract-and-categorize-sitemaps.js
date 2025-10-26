/**
 * Advanced Sitemap Extractor & Categorizer
 * Reads existing sitemap.xml and creates multiple categorized sitemaps
 * Auto-updates dates every 36 hours
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://moneycal.in';
const INPUT_FILE = path.join(__dirname, '../public/sitemap.xml');
const OUTPUT_DIR = path.join(__dirname, '../public');

// Get current timestamp
const getCurrentTimestamp = () => {
  return new Date().toISOString().split('T')[0];
};

// XML Headers
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const sitemapIndexHeader = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

// Create URL entry
const createUrlEntry = (loc, priority, changefreq, lastmod = null) => {
  const timestamp = lastmod || getCurrentTimestamp();
  return `  <url>
    <loc>${loc.startsWith('http') ? loc : BASE_URL + loc}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

// Categorize URL based on path
const categorizeUrl = (url) => {
  const urlLower = url.toLowerCase();
  
  if (url === '/' || url === BASE_URL || url === `${BASE_URL}/`) {
    return { category: 'pages', priority: 1.0, changefreq: 'daily' };
  }
  
  // Calculators
  if (urlLower.includes('/calculators/')) {
    return { category: 'calculators', priority: 0.9, changefreq: 'monthly' };
  }
  
  // Learn Platform
  if (urlLower.includes('/learn/') || urlLower.includes('/learn')) {
    return { category: 'learn', priority: 0.8, changefreq: 'weekly' };
  }
  
  // Blog
  if (urlLower.includes('/blog/')) {
    return { category: 'blog', priority: 0.7, changefreq: 'weekly' };
  }
  
  // Tools (GST, festival, finance, etc.)
  if (urlLower.includes('/tools/') || urlLower.includes('/festival-tools/') || 
      urlLower.includes('/finance-tools/') || urlLower.includes('/religious-tools/') ||
      urlLower.includes('/tax-tools/') || urlLower.includes('/gst-tools/')) {
    return { category: 'tools', priority: 0.7, changefreq: 'monthly' };
  }
  
  // Government Schemes
  if (urlLower.includes('/government-schemes/')) {
    return { category: 'government', priority: 0.7, changefreq: 'monthly' };
  }
  
  // Crypto
  if (urlLower.includes('/crypto/')) {
    return { category: 'crypto', priority: 0.6, changefreq: 'weekly' };
  }
  
  // Excel Tools
  if (urlLower.includes('/exceltool/') || urlLower.includes('/excel-tool')) {
    return { category: 'tools', priority: 0.6, changefreq: 'monthly' };
  }
  
  // Astro Finance
  if (urlLower.includes('/astro-finance/')) {
    return { category: 'pages', priority: 0.5, changefreq: 'monthly' };
  }
  
  // Insurance Tools  
  if (urlLower.includes('/insurance-tools/')) {
    return { category: 'tools', priority: 0.6, changefreq: 'monthly' };
  }
  
  // Invoice Tools
  if (urlLower.includes('/invoicing-tools/')) {
    return { category: 'tools', priority: 0.6, changefreq: 'monthly' };
  }
  
  // Stock Market Lessons
  if (urlLower.includes('/stock-market/')) {
    return { category: 'learn', priority: 0.7, changefreq: 'monthly' };
  }
  
  // Static pages
  if (urlLower.match(/\/(about|contact|privacy|terms|help|disclaimer|cookie|editorial)/)) {
    return { category: 'pages', priority: 0.5, changefreq: 'yearly' };
  }
  
  // Default
  return { category: 'pages', priority: 0.5, changefreq: 'monthly' };
};

// Extract URLs from existing sitemap
const extractUrlsFromSitemap = () => {
  try {
    const content = fs.readFileSync(INPUT_FILE, 'utf-8');
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls = [];
    let match;
    
    while ((match = urlRegex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    
    console.log(`📖 Extracted ${urls.length} URLs from existing sitemap.xml`);
    return urls;
  } catch (error) {
    console.error('⚠️ Could not read existing sitemap, using predefined URLs');
    return [];
  }
};

// Categorize all URLs
const categorizeUrls = (urls) => {
  const categorized = {
    calculators: [],
    learn: [],
    blog: [],
    tools: [],
    government: [],
    crypto: [],
    pages: [],
  };
  
  urls.forEach(url => {
    const { category, priority, changefreq } = categorizeUrl(url);
    categorized[category].push({ url, priority, changefreq });
  });
  
  return categorized;
};

// Generate sitemap for a category
const generateCategorySitemap = (category, urls, filename) => {
  if (urls.length === 0) {
    console.log(`⏭️  Skipping ${filename} (no URLs)`);
    return;
  }
  
  const timestamp = getCurrentTimestamp();
  let sitemap = xmlHeader + '\n';
  sitemap += `<!-- Generated: ${timestamp} | Category: ${category} | URLs: ${urls.length} | Auto-updates: Every 36 hours -->\n\n`;
  
  urls.forEach(({ url, priority, changefreq }) => {
    sitemap += createUrlEntry(url, priority, changefreq) + '\n';
  });
  
  sitemap += '</urlset>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), sitemap);
  console.log(`✅ ${filename} generated (${urls.length} URLs, avg priority: ${(urls.reduce((sum, u) => sum + u.priority, 0) / urls.length).toFixed(2)})`);
};

// Generate master sitemap index
const generateMasterSitemap = (categoryCounts) => {
  const timestamp = getCurrentTimestamp();
  const sitemaps = Object.keys(categoryCounts).filter(cat => categoryCounts[cat] > 0);
  
  let sitemapIndex = sitemapIndexHeader + '\n';
  sitemapIndex += `<!-- Generated: ${timestamp} | Auto-updates: Every 36 hours via GitHub Actions -->\n`;
  sitemapIndex += `<!-- Total Categories: ${sitemaps.length} | Total URLs: ${Object.values(categoryCounts).reduce((a, b) => a + b, 0)} -->\n\n`;
  
  const filenameMap = {
    calculators: 'sitemap-calculators.xml',
    learn: 'sitemap-learn.xml',
    blog: 'sitemap-blog.xml',
    tools: 'sitemap-tools.xml',
    government: 'sitemap-government.xml',
    crypto: 'sitemap-crypto.xml',
    pages: 'sitemap-pages.xml',
  };
  
  sitemaps.forEach(category => {
    const filename = filenameMap[category];
    sitemapIndex += `  <sitemap>\n`;
    sitemapIndex += `    <loc>${BASE_URL}/${filename}</loc>\n`;
    sitemapIndex += `    <lastmod>${timestamp}</lastmod>\n`;
    sitemapIndex += `    <!-- URLs: ${categoryCounts[category]} -->\n`;
    sitemapIndex += `  </sitemap>\n`;
  });
  
  sitemapIndex += '</sitemapindex>';
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemapIndex);
  console.log(`✅ sitemap.xml (Master Index) generated (${sitemaps.length} child sitemaps)`);
};

// Main execution
console.log('🚀 Dynamic Multi-Sitemap Generator Starting...\n');
console.log(`📅 Timestamp: ${getCurrentTimestamp()}`);
console.log(`📂 Output Directory: ${OUTPUT_DIR}\n`);

try {
  // Extract all URLs from existing sitemap
  const allUrls = extractUrlsFromSitemap();
  
  if (allUrls.length === 0) {
    throw new Error('No URLs found in existing sitemap');
  }
  
  // Categorize URLs
  console.log('\n📊 Categorizing URLs...');
  const categorized = categorizeUrls(allUrls);
  
  // Generate category sitemaps
  console.log('\n📝 Generating Category Sitemaps...\n');
  generateCategorySitemap('Calculators', categorized.calculators, 'sitemap-calculators.xml');
  generateCategorySitemap('Learn Platform', categorized.learn, 'sitemap-learn.xml');
  generateCategorySitemap('Blog Posts', categorized.blog, 'sitemap-blog.xml');
  generateCategorySitemap('Tools & Utilities', categorized.tools, 'sitemap-tools.xml');
  generateCategorySitemap('Government Schemes', categorized.government, 'sitemap-government.xml');
  generateCategorySitemap('Crypto Articles', categorized.crypto, 'sitemap-crypto.xml');
  generateCategorySitemap('Static Pages', categorized.pages, 'sitemap-pages.xml');
  
  // Generate master sitemap
  console.log('\n📋 Generating Master Sitemap Index...\n');
  const categoryCounts = {
    calculators: categorized.calculators.length,
    learn: categorized.learn.length,
    blog: categorized.blog.length,
    tools: categorized.tools.length,
    government: categorized.government.length,
    crypto: categorized.crypto.length,
    pages: categorized.pages.length,
  };
  generateMasterSitemap(categoryCounts);
  
  // Summary
  const totalUrls = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  console.log('\n' + '='.repeat(60));
  console.log('🎉 SITEMAP GENERATION COMPLETE!\n');
  console.log(`📊 Summary:`);
  console.log(`   - Calculators: ${categoryCounts.calculators} URLs (Priority: 0.9)`);
  console.log(`   - Learn Platform: ${categoryCounts.learn} URLs (Priority: 0.8)`);
  console.log(`   - Blog Posts: ${categoryCounts.blog} URLs (Priority: 0.7)`);
  console.log(`   - Tools: ${categoryCounts.tools} URLs (Priority: 0.7)`);
  console.log(`   - Government Schemes: ${categoryCounts.government} URLs (Priority: 0.7)`);
  console.log(`   - Crypto: ${categoryCounts.crypto} URLs (Priority: 0.6)`);
  console.log(`   - Pages: ${categoryCounts.pages} URLs (Priority: 0.5-1.0)`);
  console.log(`   ` + '-'.repeat(55));
  console.log(`   📈 TOTAL: ${totalUrls} URLs across 7 categorized sitemaps`);
  console.log(`\n⏰ Auto-Update: Every 36 hours via GitHub Actions`);
  console.log(`📁 Location: ${OUTPUT_DIR}`);
  console.log(`✅ All sitemaps optimized for Google indexing!\n`);
  console.log('='.repeat(60) + '\n');
  
  // Create summary file
  const summary = {
    generatedAt: getCurrentTimestamp(),
    totalUrls: totalUrls,
    categories: categoryCounts,
    nextUpdate: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'sitemap-generation-log.json'),
    JSON.stringify(summary, null, 2)
  );
  
  console.log('📄 sitemap-generation-log.json created for tracking\n');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

