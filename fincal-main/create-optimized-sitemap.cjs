/**
 * Create Optimized Sitemap - Removes Duplicates & Adds Strategic Priorities
 * Run with: node create-optimized-sitemap.cjs
 */

const fs = require('fs');

console.log('🔍 Reading URLs from sitemap...');

// Read unique URLs from the extracted file
const urlsRaw = fs.readFileSync('sitemap-urls-clean.txt', 'utf-8');
const allUrls = urlsRaw.split('\n')
  .map(url => url.trim())
  .filter(url => url && url.startsWith('https://moneycal.in'));

// Remove fragments (URLs with #)
const urlsWithoutFragments = allUrls.filter(url => !url.includes('#'));

// Remove duplicates
const uniqueUrls = [...new Set(urlsWithoutFragments)];

console.log(`📊 Total URLs extracted: ${allUrls.length}`);
console.log(`✂️  URLs with fragments removed: ${allUrls.length - urlsWithoutFragments.length}`);
console.log(`✅ Unique URLs: ${uniqueUrls.length}`);
console.log(`🗑️  Total duplicates removed: ${allUrls.length - uniqueUrls.length}`);

// Function to get URL priority and metadata
function getUrlInfo(url) {
  let priority = 0.5;
  let changefreq = 'monthly';
  let category = 'other';
  
  // Homepage
  if (url === 'https://moneycal.in/' || url === 'https://moneycal.in') {
    return { priority: 1.0, changefreq: 'daily', category: 'homepage' };
  }
  
  // Top 15 most important calculators
  const topCalculators = [
    'emi-calculator', 'sip-calculator', 'income-tax-calculator', 'home-loan-calculator',
    'personal-loan-calculator', 'fd-calculator', 'ppf-calculator', 'nps-calculator',
    'gst-calculator', 'budget-calculator', 'retirement-calculator', 'mutual-fund-calculator',
    'car-loan-calculator', 'gratuity-calculator', 'hra-calculator'
  ];
  if (topCalculators.some(calc => url.endsWith('/' + calc))) {
    return { priority: 0.9, changefreq: 'weekly', category: 'top-calculator' };
  }
  
  // Main hub pages
  if (url.match(/\/(tools|finance-tools|tax-tools|gst-tools|insurance-tools|corporate-finance|loan-tools|blog|calculators|excel-tools|government-schemes|crypto|invoicing-tools)$/)) {
    return { priority: 0.9, changefreq: 'weekly', category: 'hub' };
  }
  
  // All calculator pages
  if (url.includes('/calculators/')) {
    return { priority: 0.8, changefreq: 'weekly', category: 'calculator' };
  }
  
  // Blog posts - High value content
  if (url.includes('/blog/') || url.includes('/finance-blog/')) {
    return { priority: 0.7, changefreq: 'weekly', category: 'blog' };
  }
  
  // Government schemes
  if (url.includes('/government-schemes/')) {
    return { priority: 0.7, changefreq: 'monthly', category: 'government-scheme' };
  }
  
  // All tool categories
  if (url.match('\/(finance-tools|tax-tools|gst-tools|loan-tools|insurance-tools|corporate-finance)\/' in url)) {
    return { priority: 0.7, changefreq: 'weekly', category: 'tool' };
  }
  
  // Crypto content
  if (url.includes('/crypto/')) {
    return { priority: 0.6, changefreq: 'monthly', category: 'crypto' };
  }
  
  // Excel tools
  if (url.includes('/excel-tools/') || url.includes('/exceltool/')) {
    return { priority: 0.6, changefreq: 'monthly', category: 'excel-tool' };
  }
  
  // Stock market
  if (url.includes('/stock-market/')) {
    return { priority: 0.6, changefreq: 'monthly', category: 'stock-market' };
  }
  
  // Invoicing tools
  if (url.includes('/invoicing-tools/')) {
    return { priority: 0.6, changefreq: 'monthly', category: 'invoicing-tool' };
  }
  
  // Gold tools
  if (url.includes('/gold-tools/')) {
    return { priority: 0.6, changefreq: 'weekly', category: 'gold-tool' };
  }
  
  // Important static pages
  if (url.match(/\/(about-us|contact-us|privacy-policy|terms-of-service|disclaimer|help-center|sitemap)$/)) {
    return { priority: 0.6, changefreq: 'monthly', category: 'static-page' };
  }
  
  // Astro finance
  if (url.includes('/astro-finance/')) {
    return { priority: 0.5, changefreq: 'monthly', category: 'astro-finance' };
  }
  
  // General tools
  if (url.includes('/tools/')) {
    return { priority: 0.6, changefreq: 'monthly', category: 'tool' };
  }
  
  // Festival tools (seasonal - lower priority)
  if (url.includes('/festival-tools/')) {
    return { priority: 0.4, changefreq: 'yearly', category: 'festival-tool' };
  }
  
  return { priority, changefreq, category };
}

// Process URLs
const processedUrls = uniqueUrls.map(url => {
  const info = getUrlInfo(url);
  return { url, ...info };
});

// Sort by priority (highest first), then by category
processedUrls.sort((a, b) => {
  if (b.priority !== a.priority) return b.priority - a.priority;
  return a.category.localeCompare(b.category);
});

// Generate clean sitemap XML
const currentDate = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- 
    CLEAN & OPTIMIZED SITEMAP
    Generated: ${currentDate}
    Total Unique URLs: ${processedUrls.length}
    Duplicates Removed: ${allUrls.length - uniqueUrls.length}
    
    Priority Strategy:
    1.0 = Homepage (maximum visibility)
    0.9 = Top Calculators & Hub Pages (very high traffic potential)
    0.8 = All Calculators (core product)
    0.7 = Blogs, Tools, Government Schemes (valuable content)
    0.6 = Crypto, Excel, Static Pages (supporting content)
    0.5 = Astro Finance (niche content)
    0.4 = Festival Tools (seasonal, low priority)
  -->

`;

let currentPriority = null;

processedUrls.forEach(item => {
  // Add priority section comment
  if (item.priority !== currentPriority) {
    const labels = {
      1.0: "Homepage - Maximum Priority",
      0.9: "Top Calculators & Hub Pages - Very High Priority",
      0.8: "All Calculators - High Priority",
      0.7: "Blogs, Tools, Government Schemes - High Priority",
      0.6: "Crypto, Excel, Stock Market, Static Pages - Medium Priority",
      0.5: "Astro Finance, Misc - Medium-Low Priority",
      0.4: "Festival Tools (Seasonal) - Low Priority"
    };
    const label = labels[item.priority] || "Other Pages";
    xml += `\n  <!-- PRIORITY ${item.priority}: ${label} -->\n`;
    currentPriority = item.priority;
  }
  
  xml += `  <url>
    <loc>${item.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>
`;
});

xml += '</urlset>\n';

// Save clean sitemap
fs.writeFileSync('public/sitemap-clean.xml', xml, 'utf-8');

console.log('\n✅ Clean sitemap generated successfully!');
console.log('📄 File: public/sitemap-clean.xml');
console.log(`📊 Unique URLs: ${processedUrls.length}`);
console.log(`🗑️  Removed: ${allUrls.length - uniqueUrls.length} duplicates + fragments`);

// Statistics
const stats = {};
processedUrls.forEach(item => {
  stats[item.category] = (stats[item.category] || 0) + 1;
});

console.log('\n📈 URL Distribution by Category:');
Object.entries(stats)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} URLs`);
  });

// Priority distribution
const priorityStats = {};
processedUrls.forEach(item => {
  priorityStats[item.priority] = (priorityStats[item.priority] || 0) + 1;
});

console.log('\n⭐ Priority Distribution:');
Object.entries(priorityStats)
  .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
  .forEach(([pri, count]) => {
    console.log(`  Priority ${pri}: ${count} URLs`);
  });

console.log('\n📝 Next Steps:');
console.log('1. Review public/sitemap-clean.xml');
console.log('2. If satisfied: mv public/sitemap-clean.xml public/sitemap.xml');
console.log('3. git add public/sitemap.xml');
console.log('4. git commit -m "fix: Remove 218 duplicate URLs from sitemap"');
console.log('5. git push origin main');
console.log('\n🚀 This will significantly improve Google indexing!');

