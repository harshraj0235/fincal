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

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('🔀 MERGING ALL URL SOURCES');
console.log('═══════════════════════════════════════════════════════════════════════\n');

const allUrls = new Set();

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
    const url = line.trim();
    if (url && url.startsWith('http')) allUrls.add(url);
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
    const url = line.trim();
    if (url && url.startsWith('http')) allUrls.add(url);
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
    const url = line.trim();
    if (url && url.startsWith('http')) allUrls.add(url);
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
  const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  const categoryMatches = content.match(/category:\s*['"]([^'"]+)['"]/g) || [];
  
  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i].match(/['"]([^'"]+)['"]/)[1];
    const category = categoryMatches[i] ? categoryMatches[i].match(/['"]([^'"]+)['"]/)[1] : 'markets';
    const url = `${BASE_URL}/news/${category}/${slug}`;
    allUrls.add(url);
  }
  
  // Add category pages
  ['markets', 'business', 'business-analysis', 'startups', 'economy', 'tech-business'].forEach(cat => {
    allUrls.add(`${BASE_URL}/news/${cat}`);
  });
  allUrls.add(`${BASE_URL}/news`);
  
  console.log(`✅ Added ${allUrls.size - beforeCount2} news URLs (total now: ${allUrls.size})`);
}

// ═══════════════════════════════════════════════════════════════════════
// SAVE MERGED MASTER LIST
// ═══════════════════════════════════════════════════════════════════════

const sortedUrls = Array.from(allUrls).sort();
const outputPath = path.join(PUBLIC_DIR, 'all-urls-master.txt');
fs.writeFileSync(outputPath, sortedUrls.join('\n'));

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log('🎉 URL MERGE COMPLETE!');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log(`✅ Total Unique URLs: ${sortedUrls.length}`);
console.log(`💾 Saved to: all-urls-master.txt`);
console.log('\n✨ This is the COMPLETE URL list (no duplicates, from entire codebase)');
console.log('═══════════════════════════════════════════════════════════════════════\n');

