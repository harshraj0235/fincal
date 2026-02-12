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

const safeAddUrl = (url) => {
  if (!url) return;
  const normalized = url.startsWith('/') ? `${BASE_URL}${url}` : url;
  if (normalized.startsWith('http')) {
    allUrls.add(normalized);
  }
};

const addSlugsFromFile = (filePath, prefix) => {
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  slugMatches.forEach((match) => {
    const slug = match.match(/['"]([^'"]+)['"]/)[1];
    safeAddUrl(`${BASE_URL}${prefix}/${slug}`);
  });
  return slugMatches.length;
};

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
  const categorySet = new Set();
  
  for (let i = 0; i < slugMatches.length; i++) {
    const slug = slugMatches[i].match(/['"]([^'"]+)['"]/)[1];
    const category = categoryMatches[i] ? categoryMatches[i].match(/['"]([^'"]+)['"]/)[1] : 'markets';
    const url = `${BASE_URL}/news/${category}/${slug}`;
    allUrls.add(url);
    categorySet.add(category);
  }
  
  // Add category pages
  categorySet.forEach((cat) => {
    safeAddUrl(`${BASE_URL}/news/${cat}`);
  });
  safeAddUrl(`${BASE_URL}/news`);
  
  console.log(`✅ Added ${allUrls.size - beforeCount2} news URLs (total now: ${allUrls.size})`);
}

// ═══════════════════════════════════════════════════════════════════════
// 5. FROM calculatorData.ts (calculator and category routes)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 5: calculatorData.ts (calculator and category routes)...');
const calculatorDataPath = path.join(SRC_DIR, 'data/calculatorData.ts');
if (fs.existsSync(calculatorDataPath)) {
  const content = fs.readFileSync(calculatorDataPath, 'utf-8');
  const calculatorMatches = content.match(/id:\s*['"]([^'"]+)['"][^}]*?category:\s*['"][^'"]+['"]/gs) || [];
  const categoryMatches = content.match(/id:\s*['"]([^'"]+)['"][^}]*?calculators:\s*\[/gs) || [];
  const before = allUrls.size;
  
  calculatorMatches.forEach((match) => {
    const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      safeAddUrl(`${BASE_URL}/calculators/${idMatch[1]}`);
    }
  });
  
  categoryMatches.forEach((match) => {
    const idMatch = match.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      safeAddUrl(`${BASE_URL}/category/${idMatch[1]}`);
    }
  });
  
  console.log(`✅ Added ${allUrls.size - before} calculator/category URLs`);
}

// ═══════════════════════════════════════════════════════════════════════
// 6. FROM blog data (blog posts)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 6: Blog data (blog posts)...');
const blogDataDir = path.join(SRC_DIR, 'data');
const blogsDir = path.join(SRC_DIR, 'data/blogs');
let blogCount = 0;
if (fs.existsSync(blogDataDir)) {
  const blogFiles = fs.readdirSync(blogDataDir).filter((file) => file.startsWith('blogData') && file.endsWith('.ts'));
  blogFiles.forEach((file) => {
    blogCount += addSlugsFromFile(path.join(blogDataDir, file), '/blog');
  });
}
if (fs.existsSync(blogsDir)) {
  const walk = (dir) => {
    fs.readdirSync(dir).forEach((entry) => {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.ts')) {
        blogCount += addSlugsFromFile(fullPath, '/blog');
      }
    });
  };
  walk(blogsDir);
}
console.log(`✅ Added ${blogCount} blog URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 7. FROM governmentSchemesData.ts (government scheme posts)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 7: Government schemes...');
const schemeDataPath = path.join(SRC_DIR, 'data/governmentSchemesData.ts');
const schemeCount = addSlugsFromFile(schemeDataPath, '/government-schemes');
console.log(`✅ Added ${schemeCount} government scheme URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 8. FROM cryptoData.ts (crypto articles)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 8: Crypto articles...');
const cryptoDataPath = path.join(SRC_DIR, 'data/cryptoData.ts');
const cryptoCount = addSlugsFromFile(cryptoDataPath, '/crypto');
console.log(`✅ Added ${cryptoCount} crypto URLs`);

// ═══════════════════════════════════════════════════════════════════════
// 9. FROM teamProfiles.ts (news author pages)
// ═══════════════════════════════════════════════════════════════════════

console.log('\n📂 Source 9: News author profiles...');
const teamProfilesPath = path.join(SRC_DIR, 'data/teamProfiles.ts');
if (fs.existsSync(teamProfilesPath)) {
  const content = fs.readFileSync(teamProfilesPath, 'utf-8');
  const authorMatches = content.match(/id:\s*['"]([^'"]+)['"]/g) || [];
  const before = allUrls.size;
  authorMatches.forEach((match) => {
    const id = match.match(/['"]([^'"]+)['"]/)[1];
    safeAddUrl(`${BASE_URL}/news/author/${id}`);
  });
  console.log(`✅ Added ${allUrls.size - before} author URLs`);
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

