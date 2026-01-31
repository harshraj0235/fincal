/**
 * ═══════════════════════════════════════════════════════════════════════
 * COMPLETE ROUTE EXTRACTOR - SCANS App.tsx FOR ALL ROUTES
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Extracts EVERY route from App.tsx (617 routes!)
 * Output: all-urls-from-code.txt (complete URL list)
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://moneycal.in';
const APP_TSX_PATH = path.join(__dirname, '../src/App.tsx');
const OUTPUT_PATH = path.join(__dirname, '../public/all-urls-from-code.txt');

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🔍 EXTRACTING ALL ROUTES FROM App.tsx');
console.log('═══════════════════════════════════════════════════════════════════════\n');

try {
  // Read App.tsx
  const content = fs.readFileSync(APP_TSX_PATH, 'utf-8');
  
  // Extract all path=" patterns
  const pathMatches = content.match(/path="([^"]+)"/g) || [];
  const routes = pathMatches
    .map(match => match.match(/path="([^"]+)"/)[1])
    .filter(path => !path.includes(':')) // Remove dynamic routes like /:slug
    .filter(path => path !== '*') // Remove catch-all
    .map(path => path.startsWith('/') ? path : `/${path}`);
  
  // Deduplicate
  const uniqueRoutes = [...new Set(routes)];
  
  // Strip duplicate domain in path (e.g. /moneycal.in/learn -> /learn) for indexing fix
  const normalizeRoute = (r) => {
    let p = (r || '').replace(/^\/moneycal\.in(\/|$)/i, '/').replace(/^moneycal\.in(\/|$)/i, '/').replace(/\/+/g, '/');
    return (p === '' || !p) ? '/' : (p.startsWith('/') ? p : '/' + p);
  };
  
  // Convert to full URLs (normalized)
  const urls = uniqueRoutes.map(route => `${BASE_URL}${normalizeRoute(route)}`).sort();
  
  // Categorize
  const categories = {
    learn: urls.filter(u => u.includes('/learn')),
    news: urls.filter(u => u.includes('/news')),
    blog: urls.filter(u => u.includes('/blog')),
    calculators: urls.filter(u => u.includes('/calculator')),
    tools: urls.filter(u => u.includes('/tool')),
    government: urls.filter(u => u.includes('/government')),
    crypto: urls.filter(u => u.includes('/crypto')),
    astro: urls.filter(u => u.includes('/astro')),
    pages: urls.filter(u => !u.includes('/learn') && !u.includes('/news') && !u.includes('/blog') && !u.includes('/calculator') && !u.includes('/tool') && !u.includes('/government') && !u.includes('/crypto') && !u.includes('/astro'))
  };
  
  // Write to file
  fs.writeFileSync(OUTPUT_PATH, urls.join('\n'));
  
  // Summary
  console.log('📊 EXTRACTION COMPLETE!\n');
  console.log(`✅ Total Routes Found: ${uniqueRoutes.length}`);
  console.log(`📰 News: ${categories.news.length}`);
  console.log(`📚 Learn: ${categories.learn.length}`);
  console.log(`📝 Blog: ${categories.blog.length}`);
  console.log(`🔢 Calculators: ${categories.calculators.length}`);
  console.log(`🛠️  Tools: ${categories.tools.length}`);
  console.log(`🏛️  Government: ${categories.government.length}`);
  console.log(`₿  Crypto: ${categories.crypto.length}`);
  console.log(`⭐ Astro: ${categories.astro.length}`);
  console.log(`📄 Pages: ${categories.pages.length}`);
  console.log(`\n💾 Saved to: ${OUTPUT_PATH}\n`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}




