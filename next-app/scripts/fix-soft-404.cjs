/**
 * FIX GOOGLE SOFT 404 ERRORS
 * Removes broken URLs from sitemap that don't have actual pages
 */

const fs = require('fs');
const path = require('path');

const BROKEN_URLS = [
  // Festival info pages (don't exist in codebase)
  '/festival-info/calendar-history-visualizer',
  '/festival-info/interactive-india-map',
  '/festival-info/ritual-meaning-interpreter',
  '/festival-info/global-comparison',
  '/festival-info/past-future-predictor',
  '/festival-info/festival-history-quiz',
  
  // AMP page (not used)
  '/amp-index.html',
  
  // Broken blog URLs
  '/blog/financial-investment-guide-nan',
  '/blog/financial-investment-guide-673',
  '/blog/financial-investment-guide-674',
  '/blog/financial-investment-guide-676',
  '/blog/financial-investment-guide-677',
  '/blog/financial-investment-guide-678',
  '/blog/financial-investment-guide-679',
  '/blog/financial-investment-guide-680',
  '/blog/financial-investment-guide-681'
];

console.log('═══════════════════════════════════════════════════════════════════');
console.log('🔧 FIXING GOOGLE SOFT 404 ERRORS');
console.log('═══════════════════════════════════════════════════════════════════\n');

// Read master URL list
const masterUrlsPath = path.join(__dirname, '../public/all-urls-complete.txt');
let urls = fs.readFileSync(masterUrlsPath, 'utf-8').split('\n').filter(Boolean);

console.log(`📊 Current URLs: ${urls.length}`);

// Remove broken URLs
const originalCount = urls.length;
urls = urls.filter(url => {
  const path = url.replace('https://moneycal.in', '');
  return !BROKEN_URLS.includes(path);
});

const removed = originalCount - urls.length;

console.log(`🗑️  Removed ${removed} broken URLs`);
console.log(`✅ Remaining URLs: ${urls.length}\n`);

// Save cleaned list
fs.writeFileSync(masterUrlsPath, urls.join('\n'), 'utf-8');

console.log('═══════════════════════════════════════════════════════════════════');
console.log('✅ SOFT 404 FIX COMPLETE!');
console.log('═══════════════════════════════════════════════════════════════════');
console.log(`\n📝 Next: Run npm run generate-sitemaps to update sitemaps\n`);

