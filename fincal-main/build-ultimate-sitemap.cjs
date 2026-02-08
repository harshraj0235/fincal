// Ultimate Sitemap Builder - Merge backup + current with smart prioritization
const fs = require('fs');

const BASE_URL = 'https://moneycal.in';
const TODAY = '2025-01-20';

// Read unique URLs from backup
const backupUrls = fs.readFileSync('unique-urls-backup.txt', 'utf8')
  .split('\n')
  .map(url => url.trim())
  .filter(url => url && url.startsWith('https://moneycal.in/'));

console.log(`Total URLs from backup: ${backupUrls.length}`);

// Categorize URLs
const enhanced19 = backupUrls.filter(url => [
  '/emi-calculator', '/sip-calculator', '/home-loan-calculator', '/personal-loan-calculator',
  '/nps-calculator', '/retirement-calculator', '/gst-calculator', '/mutual-fund-returns-calculator',
  '/income-tax-calculator', '/compound-interest-calculator', '/car-loan-calculator',
  '/gratuity-calculator', '/hra-exemption-calculator', '/credit-card-emi-calculator',
  '/life-insurance-calculator', '/health-insurance-calculator', '/term-insurance-calculator',
  '/advance-tax-calculator', '/capital-gains-tax-calculator'
].some(calc => url.includes(calc)));

const allCalculators = backupUrls.filter(url => url.includes('/calculators/') && !url.includes('/blog/'));
const blogPosts = backupUrls.filter(url => url.includes('/blog/') && !url.includes('/write'));
const cryptoPosts = backupUrls.filter(url => url.includes('/crypto/'));
const tools = backupUrls.filter(url => (url.includes('/tools/') || url.includes('/finance-tools/') || url.includes('/tax-tools/')) && !url.includes('/blog/'));
const hubPages = backupUrls.filter(url => {
  const path = url.replace(BASE_URL, '');
  return path === '/' || ['/calculators', '/blog', '/tools', '/finance-tools', '/tax-tools', '/gst-tools', 
    '/insurance-tools', '/loan-tools', '/excel-tools', '/government-schemes', '/crypto', '/stock-market',
    '/personal-finance-management', '/finance-blog', '/corporate-finance', '/invoicing-tools'].includes(path);
});

console.log(`Enhanced 19: ${enhanced19.length}`);
console.log(`All Calculators: ${allCalculators.length}`);
console.log(`Blog Posts: ${blogPosts.length}`);
console.log(`Crypto Posts: ${cryptoPosts.length}`);
console.log(`Tools: ${tools.length}`);
console.log(`Hub Pages: ${hubPages.length}`);

function generateURL(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- 
    ULTIMATE COMPREHENSIVE SITEMAP FOR MONEYCAL.IN
    Generated: ${TODAY}
    Total URLs: ${allCalculators.length + blogPosts.slice(0,150).length + cryptoPosts.slice(0,60).length + tools.length + hubPages.length}
    Source: Merged from backup (1,640 unique) + current optimizations
    
    Strategy: All calculators + Top blogs + All tools
    - Priority 1.0: Homepage
    - Priority 0.9: 19 Enhanced Calculators (UPDATED TODAY!)
    - Priority 0.9: Hub Pages
    - Priority 0.8: All Other Calculators
    - Priority 0.7: Blog Posts & Crypto Articles
    - Priority 0.6: Tools & Utilities
  -->

  <!-- PRIORITY 1.0: Homepage -->
${generateURL(`${BASE_URL}/`, TODAY, 'daily', '1.0')}
  <!-- PRIORITY 0.9: TOP 19 ENHANCED CALCULATORS - Updated Today! -->\n`;

// Add 19 enhanced calculators
enhanced19.forEach(url => {
  sitemap += generateURL(url, TODAY, 'weekly', '0.9');
});

// Add hub pages
sitemap += `\n  <!-- PRIORITY 0.9: Hub & Category Pages -->\n`;
hubPages.filter(url => url !== `${BASE_URL}/`).forEach(url => {
  sitemap += generateURL(url, TODAY, 'daily', '0.9');
});

// Add ALL other calculators
sitemap += `\n  <!-- PRIORITY 0.8: All Other Calculators -->\n`;
allCalculators.filter(url => !enhanced19.includes(url)).forEach(url => {
  sitemap += generateURL(url, '2024-12-20', 'monthly', '0.8');
});

// Add top 150 blog posts
sitemap += `\n  <!-- PRIORITY 0.7: Top Blog Posts -->\n`;
blogPosts.slice(0, 150).forEach(url => {
  sitemap += generateURL(url, '2024-12-20', 'monthly', '0.7');
});

// Add crypto articles (top 60)
sitemap += `\n  <!-- PRIORITY 0.7: Crypto Articles -->\n`;
cryptoPosts.slice(0, 60).forEach(url => {
  sitemap += generateURL(url, '2024-12-20', 'monthly', '0.7');
});

// Add all tools
sitemap += `\n  <!-- PRIORITY 0.6: Finance & Other Tools -->\n`;
tools.forEach(url => {
  sitemap += generateURL(url, '2024-12-20', 'monthly', '0.6');
});

sitemap += '\n</urlset>';

// Save sitemap
fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');

const totalUrls = sitemap.split('<url>').length - 1;
console.log(`\n✅ ULTIMATE SITEMAP GENERATED!`);
console.log(`📁 Saved to: public/sitemap.xml`);
console.log(`📊 Total URLs: ${totalUrls}`);
console.log(`🎯 19 Enhanced calculators: Priority 0.9, Date: ${TODAY}`);
console.log(`📈 All ${allCalculators.length} calculators included!`);
console.log(`📝 Top 150 blog posts included!`);
console.log(`🚀 Ready for Google Search Console!`);

