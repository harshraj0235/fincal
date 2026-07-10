/**
 * Generate Clean, Optimized Sitemap
 * Removes duplicates and adds proper priorities for Google ranking
 */

const fs = require('fs');

// Read unique URLs
const urls = fs.readFileSync('sitemap-urls-clean.txt', 'utf8')
  .split('\n')
  .map(url => url.trim())
  .filter(url => url && url.startsWith('https://moneycal.in'));

console.log(`Total unique URLs: ${urls.length}`);

// Categorize URLs by priority and type
const categorizedUrls = urls.map(url => {
  let priority = 0.5;
  let changefreq = 'monthly';
  let category = 'other';

  // Homepage - Highest priority
  if (url === 'https://moneycal.in/' || url === 'https://moneycal.in') {
    priority = 1.0;
    changefreq = 'daily';
    category = 'homepage';
  }
  // Top calculators - Very high priority
  else if (url.match(/\/calculators\/(emi-calculator|sip-calculator|income-tax-calculator|home-loan-calculator|personal-loan-calculator|fd-calculator|ppf-calculator|nps-calculator)/)) {
    priority = 0.9;
    changefreq = 'weekly';
    category = 'top-calculator';
  }
  // Calculator pages - High priority
  else if (url.includes('/calculators/')) {
    priority = 0.8;
    changefreq = 'weekly';
    category = 'calculator';
  }
  // Main hub pages
  else if (url.match(/\/tools$|\/finance-tools$|\/tax-tools$|\/gst-tools$|\/insurance-tools$|\/corporate-finance$|\/loan-tools$/)) {
    priority = 0.9;
    changefreq = 'weekly';
    category = 'hub';
  }
  // Blog posts - High priority
  else if (url.includes('/blog/') || url.includes('/finance-blog/')) {
    priority = 0.7;
    changefreq = 'weekly';
    category = 'blog';
  }
  // Government schemes - Medium-high
  else if (url.includes('/government-schemes/')) {
    priority = 0.7;
    changefreq = 'monthly';
    category = 'government-scheme';
  }
  // Crypto content
  else if (url.includes('/crypto/')) {
    priority = 0.6;
    changefreq = 'monthly';
    category = 'crypto';
  }
  // Finance tools
  else if (url.includes('/finance-tools/')) {
    priority = 0.7;
    changefreq = 'weekly';
    category = 'finance-tool';
  }
  // Tax tools
  else if (url.includes('/tax-tools/')) {
    priority = 0.7;
    changefreq = 'monthly';
    category = 'tax-tool';
  }
  // GST tools
  else if (url.includes('/gst-tools/')) {
    priority = 0.7;
    changefreq = 'monthly';
    category = 'gst-tool';
  }
  // Excel tools
  else if (url.includes('/excel-tools/') || url.includes('/exceltool/')) {
    priority = 0.6;
    changefreq = 'monthly';
    category = 'excel-tool';
  }
  // Insurance tools
  else if (url.includes('/insurance-tools/')) {
    priority = 0.7;
    changefreq = 'monthly';
    category = 'insurance-tool';
  }
  // Invoicing tools
  else if (url.includes('/invoicing-tools/')) {
    priority = 0.6;
    changefreq = 'monthly';
    category = 'invoicing-tool';
  }
  // Loan tools
  else if (url.includes('/loan-tools/')) {
    priority = 0.7;
    changefreq = 'monthly';
    category = 'loan-tool';
  }
  // Festival tools - Lower priority (seasonal)
  else if (url.includes('/festival-tools/')) {
    priority = 0.4;
    changefreq = 'yearly';
    category = 'festival-tool';
  }
  // Gold tools
  else if (url.includes('/gold-tools/')) {
    priority = 0.6;
    changefreq = 'weekly';
    category = 'gold-tool';
  }
  // Astro finance - Medium priority
  else if (url.includes('/astro-finance/')) {
    priority = 0.5;
    changefreq = 'monthly';
    category = 'astro-finance';
  }
  // Stock market lessons
  else if (url.includes('/stock-market/')) {
    priority = 0.6;
    changefreq = 'monthly';
    category = 'stock-market';
  }
  // Important static pages
  else if (url.match(/\/(about-us|contact-us|privacy-policy|terms-of-service|disclaimer)$/)) {
    priority = 0.6;
    changefreq = 'monthly';
    category = 'static-page';
  }
  // Tools
  else if (url.includes('/tools/')) {
    priority = 0.6;
    changefreq = 'monthly';
    category = 'tool';
  }

  return { url, priority, changefreq, category };
});

// Sort by priority (highest first) then by category
const sortedUrls = categorizedUrls.sort((a, b) => {
  if (b.priority !== a.priority) {
    return b.priority - a.priority;
  }
  return a.category.localeCompare(b.category);
});

// Generate XML sitemap
const currentDate = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Generated: ${currentDate} -->
  <!-- Total URLs: ${sortedUrls.length} (duplicates removed: ${urls.length - sortedUrls.length}) -->
  <!-- Organized by priority for optimal Google indexing -->

  <!-- PRIORITY 1.0: Homepage -->
`;

let currentPriority = null;
let currentCategory = null;

sortedUrls.forEach(({ url, priority, changefreq, category }) => {
  // Add category comment when changing
  if (priority !== currentPriority) {
    xml += `\n  <!-- PRIORITY ${priority}: ${getCategoryLabel(priority)} -->\n`;
    currentPriority = priority;
  }

  xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
});

xml += `</urlset>`;

// Helper function to get category label
function getCategoryLabel(priority) {
  if (priority === 1.0) return 'Homepage';
  if (priority === 0.9) return 'Top Calculators & Hub Pages';
  if (priority === 0.8) return 'All Calculators';
  if (priority === 0.7) return 'Blog Posts, Tools, Schemes';
  if (priority === 0.6) return 'Crypto, Excel Tools, Static Pages';
  if (priority === 0.5) return 'Astro Finance, Misc';
  if (priority === 0.4) return 'Festival Tools (Seasonal)';
  return 'Other Pages';
}

// Save clean sitemap
fs.writeFileSync('public/sitemap-clean.xml', xml, 'utf8');

console.log('\n✅ Clean sitemap generated!');
console.log(`📄 File: public/sitemap-clean.xml`);
console.log(`📊 Unique URLs: ${sortedUrls.length}`);
console.log(`🗑️  Duplicates removed: ${urls.length - sortedUrls.length}`);

// Generate statistics
const stats = {};
sortedUrls.forEach(({ category }) => {
  stats[category] = (stats[category] || 0) + 1;
});

console.log('\n📈 URL Distribution:');
Object.entries(stats)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} URLs`);
  });

console.log('\n✅ Done! Now replace public/sitemap.xml with public/sitemap-clean.xml');

