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

// ═══════════════════════════════════════════════════════════════════════
// 1. FROM App.tsx (routes)
// ═══════════════════════════════════════════════════════════════════════

console.log('📂 Source 1: App.tsx routes...');
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
// 2. FROM all-urls-complete.txt (existing)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 2: all-urls-complete.txt...');
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
// 3. FROM contentRegistry.ts (all news)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 3: contentRegistry.ts (news articles)...');
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
// 4. FROM Lesson Files (all learn URLs)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 4: All lesson files...');
const learnDataDir = path.join(SRC_DIR, 'data/learn');
const beforeCount3 = allUrls.size;

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

Object.entries(categoryMappings).forEach(([filename, categorySlug]) => {
  const filePath = path.join(learnDataDir, filename);
  if (!fs.existsSync(filePath)) return;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  
  slugMatches.forEach(match => {
    const slug = match.match(/['"]([^'"]+)['"]/)[1];
    allUrls.add(`${BASE_URL}/learn/${categorySlug}/${slug}`);
  });
});

console.log(`✅ Added ${allUrls.size - beforeCount3} learn lesson URLs (total now: ${allUrls.size})`);

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

