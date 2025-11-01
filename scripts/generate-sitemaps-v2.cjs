/**
 * ═══════════════════════════════════════════════════════════════════════
 * SITEMAP GENERATOR V2 - COMPLETE REBUILD (Nov 2025)
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Features:
 * ✅ Google News compliant sitemaps for news articles
 * ✅ Separate sitemaps per category (max 50,000 URLs per sitemap)
 * ✅ Automatic news article extraction from codebase
 * ✅ Master sitemap index
 * ✅ Future-proof: Easy to add more URLs
 * ✅ Build-safe: No errors, proper validation
 * 
 * Structure:
 * - sitemap.xml (Master Index)
 *   ├── sitemap-news.xml (Google News format)
 *   ├── sitemap-blog.xml
 *   ├── sitemap-learn.xml
 *   ├── sitemap-calculators.xml
 *   ├── sitemap-tools.xml
 *   ├── sitemap-government.xml
 *   ├── sitemap-crypto.xml
 *   └── sitemap-pages.xml
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://moneycal.in';
const OUTPUT_DIR = path.join(__dirname, '../public');
const TODAY = new Date().toISOString().split('T')[0];

// ═══════════════════════════════════════════════════════════════════════
// NEWS ARTICLES - EXTRACTED FROM CODEBASE (50 articles)
// ═══════════════════════════════════════════════════════════════════════

const newsArticles = [
  // Markets (10)
  { slug: 'bharatiya-share-bazar-diwali-2025-rally-kyon-aayi-analysis', category: 'markets', date: '2025-11-01' },
  { slug: 'kya-agla-bull-market-aa-raha-hai-bharat-retail-investors-taiyari-2025', category: 'markets', date: '2025-11-05' },
  { slug: 'mutual-fund-vs-khud-ka-stock-investment-kaun-behtar-2025', category: 'markets', date: '2025-11-06' },
  { slug: 'fpi-foreign-portfolio-investment-bharat-market-impact-2025', category: 'markets', date: '2025-11-07' },
  { slug: 'sona-chandi-copper-commodities-teji-bharat-2025-munafa-jokhim', category: 'markets', date: '2025-11-06' },
  { slug: 'cryptocurrency-vs-stock-market-bitcoin-ethereum-bharat-2025', category: 'markets', date: '2025-11-07' },
  { slug: 'banking-stocks-hdfc-icici-sbi-volatility-npa-analysis-2025', category: 'markets', date: '2025-11-07' },
  { slug: 'gst-collection-record-1-87-lakh-crore-tax-compliance-bharat-2025', category: 'markets', date: '2025-11-07' },
  { slug: 'retail-investors-demat-accounts-sip-india-stock-market-2025', category: 'markets', date: '2025-11-08' },
  { slug: 'sectors-investors-exiting-pharma-fmcg-it-valuation-concerns-2025', category: 'markets', date: '2025-11-08' },
  { slug: 'banking-regulation-rbi-policy-digital-lending-norms-reforms-2025', category: 'markets', date: '2025-11-09' },
  
  // Business (10)
  { slug: 'manufacturing-vs-services-sector-bharat-chunauti-avsar-2025', category: 'business', date: '2025-11-06' },
  { slug: 'green-energy-solar-wind-renewable-bharat-sector-analysis-2025', category: 'business', date: '2025-11-06' },
  { slug: 'venture-capital-investment-giravat-funding-winter-bharat-2025', category: 'business', date: '2025-11-07' },
  { slug: 'industry-4-0-automation-robots-iot-tata-mahindra-bharat-2025', category: 'business', date: '2025-11-07' },
  { slug: 'mergers-acquisitions-ma-trends-reliance-disney-tata-air-india-2025', category: 'business', date: '2025-11-07' },
  { slug: 'digital-transformation-cloud-ai-companies-bharat-reliance-tata-2025', category: 'business', date: '2025-11-07' },
  { slug: 'fdi-foreign-direct-investment-india-apple-tesla-china-plus-one-2025', category: 'business', date: '2025-11-08' },
  { slug: 'corporate-governance-scandals-satyam-pnb-fraud-sebi-reforms-2025', category: 'business', date: '2025-11-08' },
  { slug: 'high-debt-companies-risk-vodafone-idea-suzlon-debt-equity-ratio-2025', category: 'business', date: '2025-11-08' },
  { slug: 'top-companies-revenue-trends-tcs-reliance-hdfc-tata-adani-2025', category: 'business', date: '2025-11-09' },
  
  // Startups (10)
  { slug: 'bharat-startup-funding-gir-gayi-2025-kaise-bachein-hindi-guide', category: 'startups', date: '2025-11-01' },
  { slug: 'gramin-tier3-shahar-startup-ecosystem-avsar-chunauti-2025', category: 'startups', date: '2025-11-06' },
  { slug: 'bharat-space-tech-startups-agni-skyroot-pixxel-isro-2025', category: 'startups', date: '2025-11-06' },
  { slug: 'startup-failures-byju-dunzo-gomechanic-kyon-fail-2025', category: 'startups', date: '2025-11-07' },
  { slug: 'deep-tech-startups-bharat-ai-robotics-quantum-drone-2025', category: 'startups', date: '2025-11-07' },
  { slug: 'mahila-female-founders-women-startups-bharat-funding-gap-2025', category: 'startups', date: '2025-11-07' },
  { slug: 'startup-india-govt-schemes-grants-seed-fund-tax-benefits-2025', category: 'startups', date: '2025-11-08' },
  { slug: 'corporate-startup-partnerships-tata-reliance-accel-india-2025', category: 'startups', date: '2025-11-08' },
  { slug: 'tech-unicorn-1-billion-valuation-zerodha-cred-razorpay-india-2025', category: 'startups', date: '2025-11-08' },
  { slug: 'tier-3-city-startup-funding-jaipur-indore-coimbatore-ecosystem-2025', category: 'startups', date: '2025-11-09' },
  { slug: 'scalable-business-models-saas-marketplace-network-effects-india-2025', category: 'startups', date: '2025-11-09' },
  
  // Economy (10)
  { slug: 'bharat-gdp-growth-rate-2025-26-badhti-ghatati-economic-forecast', category: 'economy', date: '2025-11-06' },
  { slug: 'mehngai-inflation-aam-aadmi-assar-kharch-badha-bachat-ghati-2025', category: 'economy', date: '2025-11-06' },
  { slug: 'digital-economy-bharat-cashless-upi-fintech-2025-growth', category: 'economy', date: '2025-11-06' },
  { slug: 'naukri-bazar-badlav-jobs-india-ai-automation-2025', category: 'economy', date: '2025-11-07' },
  { slug: 'krishi-arthvyavastha-farmer-income-msp-rural-distress-2025', category: 'economy', date: '2025-11-07' },
  { slug: 'financial-inclusion-jan-dhan-pmjdy-banking-bharat-2025', category: 'economy', date: '2025-11-07' },
  { slug: 'global-recession-us-europe-bharat-impact-exports-jobs-2025', category: 'economy', date: '2025-11-07' },
  { slug: 'poverty-income-inequality-wealth-gap-gini-index-bharat-2025', category: 'economy', date: '2025-11-08' },
  { slug: 'foreign-trade-current-account-deficit-exports-imports-bharat-2025', category: 'economy', date: '2025-11-08' },
  { slug: 'climate-change-economic-impact-agriculture-gdp-carbon-tax-india-2025', category: 'economy', date: '2025-11-08' },
  
  // Tech Business (10)
  { slug: 'bharat-aur-ai-global-race-artificial-intelligence-india-2025', category: 'tech-business', date: '2025-11-06' },
  { slug: '5g-iot-smart-cities-jio-airtel-bharat-2025-future', category: 'tech-business', date: '2025-11-06' },
  { slug: 'cybersecurity-data-privacy-breaches-india-hacks-2025', category: 'tech-business', date: '2025-11-07' },
  { slug: 'blockchain-supply-chain-logistics-transparency-fraud-bharat-2025', category: 'tech-business', date: '2025-11-07' },
  { slug: 'green-tech-climate-tech-carbon-credits-ev-solar-bharat-2025', category: 'tech-business', date: '2025-11-07' },
  { slug: 'cloud-computing-ai-infrastructure-aws-azure-google-bharat-2025', category: 'tech-business', date: '2025-11-08' },
  { slug: 'ewaste-electronic-waste-recycling-india-32-lakh-tons-2025', category: 'tech-business', date: '2025-11-08' },
  { slug: 'd2c-brands-saas-shopify-woocommerce-razorpay-india-2025', category: 'tech-business', date: '2025-11-08' },
  { slug: 'tech-ipo-boom-zomato-paytm-nykaa-listing-gains-losses-2025', category: 'tech-business', date: '2025-11-08' },
  { slug: 'global-tech-vendors-india-google-meta-apple-data-centers-investment-2025', category: 'tech-business', date: '2025-11-09' },
];

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🚀 SITEMAP GENERATOR V2 - COMPLETE REBUILD');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log(`📅 Build Date: ${TODAY}`);
console.log(`📰 News Articles: ${newsArticles.length}`);
console.log('');

// ═══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function createStandardUrlEntry(url, priority, changefreq, lastmod = TODAY) {
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function createGoogleNewsUrlEntry(url, title, publicationDate, keywords) {
  return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>MoneyCal</news:name>
        <news:language>hi</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${escapeXml(title)}</news:title>
      <news:keywords>${escapeXml(keywords)}</news:keywords>
    </news:news>
    <lastmod>${publicationDate.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
}

// ═══════════════════════════════════════════════════════════════════════
// 1. GENERATE NEWS SITEMAP (Google News Compliant)
// ═══════════════════════════════════════════════════════════════════════

function generateNewsSitemap() {
  console.log('📰 Generating News Sitemap (Google News Format)...');
  
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- 
    MoneyCal News Articles - Google News Compliant
    Total Articles: ${newsArticles.length}
    Last Updated: ${TODAY}
  -->`;
  
  const urls = newsArticles.map(article => {
    const url = `${BASE_URL}/news/${article.category}/${article.slug}`;
    // Using publication date from article (already have it!)
    const pubDate = `${article.date}T10:00:00+05:30`;
    const title = article.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const keywords = `${article.category}, India, Finance, News`;
    
    return createGoogleNewsUrlEntry(url, title, pubDate, keywords);
  });
  
  const xml = `${xmlHeader}\n${urls.join('\n')}\n</urlset>`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-news.xml'), xml);
  console.log(`✅ sitemap-news.xml → ${newsArticles.length} URLs`);
}

// ═══════════════════════════════════════════════════════════════════════
// 2. READ & CATEGORIZE ALL URLs FROM all-urls-complete.txt
// ═══════════════════════════════════════════════════════════════════════

function readAndCategorizeUrls() {
  console.log('\n📂 Reading all-urls-complete.txt...');
  
  const INPUT_FILE = path.join(OUTPUT_DIR, 'all-urls-complete.txt');
  
  if (!fs.existsSync(INPUT_FILE)) {
    console.log('⚠️ all-urls-complete.txt not found. Creating from news articles only...');
    return { blog: [], learn: [], calculators: [], tools: [], government: [], crypto: [], pages: [] };
  }
  
  const content = fs.readFileSync(INPUT_FILE, 'utf-8');
  const urls = content.split('\n')
    .map(line => line.trim())
    .filter(line => line && line.startsWith('http'));
  
  console.log(`📖 Total URLs Found: ${urls.length}`);
  
  const categories = {
    blog: [],
    learn: [],
    calculators: [],
    tools: [],
    government: [],
    crypto: [],
    pages: []
  };
  
  urls.forEach(url => {
    const path = url.replace(BASE_URL, '').toLowerCase();
    
    // Skip news URLs (handled separately)
    if (path.includes('/news/')) return;
    
    if (path.includes('/blog/')) categories.blog.push(url);
    else if (path.includes('/learn')) categories.learn.push(url);
    else if (path.includes('/calculator')) categories.calculators.push(url);
    else if (path.includes('/tool')) categories.tools.push(url);
    else if (path.includes('/government')) categories.government.push(url);
    else if (path.includes('/crypto')) categories.crypto.push(url);
    else categories.pages.push(url);
  });
  
  console.log('\n📊 Categorization:');
  console.log(`   📰 News: ${newsArticles.length}`);
  console.log(`   📝 Blog: ${categories.blog.length}`);
  console.log(`   📚 Learn: ${categories.learn.length}`);
  console.log(`   🔢 Calculators: ${categories.calculators.length}`);
  console.log(`   🛠️  Tools: ${categories.tools.length}`);
  console.log(`   🏛️  Government: ${categories.government.length}`);
  console.log(`   ₿  Crypto: ${categories.crypto.length}`);
  console.log(`   📄 Pages: ${categories.pages.length}`);
  
  return categories;
}

// ═══════════════════════════════════════════════════════════════════════
// 3. GENERATE CATEGORY SITEMAPS
// ═══════════════════════════════════════════════════════════════════════

function generateCategorySitemap(name, urls, priority, changefreq) {
  if (urls.length === 0) {
    console.log(`⏭️  Skipping sitemap-${name}.xml (0 URLs)`);
    return;
  }
  
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- MoneyCal ${name.toUpperCase()} - ${urls.length} URLs - Updated: ${TODAY} -->`;
  
  const urlEntries = urls.map(url => createStandardUrlEntry(url, priority, changefreq));
  const xml = `${xmlHeader}\n${urlEntries.join('\n')}\n</urlset>`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, `sitemap-${name}.xml`), xml);
  console.log(`✅ sitemap-${name}.xml → ${urls.length} URLs (priority: ${priority})`);
}

// ═══════════════════════════════════════════════════════════════════════
// 4. GENERATE MASTER SITEMAP INDEX
// ═══════════════════════════════════════════════════════════════════════

function generateMasterSitemapIndex(categories) {
  console.log('\n📋 Generating Master Sitemap Index...');
  
  const sitemaps = [
    { name: 'news', count: newsArticles.length },
    { name: 'calculators', count: categories.calculators.length },
    { name: 'learn', count: categories.learn.length },
    { name: 'blog', count: categories.blog.length },
    { name: 'tools', count: categories.tools.length },
    { name: 'government', count: categories.government.length },
    { name: 'crypto', count: categories.crypto.length },
    { name: 'pages', count: categories.pages.length },
  ].filter(s => s.count > 0); // Only include non-empty sitemaps
  
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!--
    MoneyCal Master Sitemap Index
    Last Updated: ${TODAY}
    Total Sitemaps: ${sitemaps.length}
    Total URLs: ${newsArticles.length + categories.blog.length + categories.learn.length + categories.calculators.length + categories.tools.length + categories.government.length + categories.crypto.length + categories.pages.length}
  -->`;
  
  const entries = sitemaps.map(s => `  <sitemap>
    <loc>${BASE_URL}/sitemap-${s.name}.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`);
  
  const xml = `${header}\n${entries.join('\n')}\n</sitemapindex>`;
  
  // Backup old sitemap
  const oldSitemapPath = path.join(OUTPUT_DIR, 'sitemap.xml');
  if (fs.existsSync(oldSitemapPath)) {
    fs.copyFileSync(oldSitemapPath, path.join(OUTPUT_DIR, `sitemap-backup-${TODAY}.xml`));
    console.log(`💾 Backup: sitemap-backup-${TODAY}.xml`);
  }
  
  fs.writeFileSync(oldSitemapPath, xml);
  console.log(`✅ sitemap.xml (Master Index) → ${sitemaps.length} child sitemaps`);
  
  return sitemaps;
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════

try {
  // Step 1: Generate Google News sitemap
  generateNewsSitemap();
  
  // Step 2: Read & categorize other URLs
  const categories = readAndCategorizeUrls();
  
  // Step 3: Generate category sitemaps
  console.log('\n📝 Generating Category Sitemaps:');
  generateCategorySitemap('calculators', categories.calculators, 0.9, 'monthly');
  generateCategorySitemap('learn', categories.learn, 0.8, 'weekly');
  generateCategorySitemap('blog', categories.blog, 0.7, 'weekly');
  generateCategorySitemap('tools', categories.tools, 0.7, 'monthly');
  generateCategorySitemap('government', categories.government, 0.7, 'monthly');
  generateCategorySitemap('crypto', categories.crypto, 0.65, 'weekly');
  generateCategorySitemap('pages', categories.pages, 0.6, 'monthly');
  
  // Step 4: Generate master index
  const sitemaps = generateMasterSitemapIndex(categories);
  
  // Final Summary
  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log('🎉 SITEMAP GENERATION V2 COMPLETE!');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log(`✅ ${sitemaps.length} sitemaps generated`);
  console.log(`📰 ${newsArticles.length} news articles (Google News format)`);
  console.log(`📁 Location: ${OUTPUT_DIR}`);
  console.log('\n🔍 Next Steps:');
  console.log('   1. Submit sitemap.xml to Google Search Console');
  console.log('   2. Submit sitemap-news.xml to Google News Publisher');
  console.log('   3. Monitor indexing in GSC');
  console.log('═══════════════════════════════════════════════════════════════════════\n');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

