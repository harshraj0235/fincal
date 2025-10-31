/**
 * SLUG VERIFICATION SCRIPT
 * Checks if all contentRegistry slugs exist in articleLoader
 * Run: node scripts/verify-article-slugs.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFYING ALL ARTICLE SLUG MAPPINGS...\n');

// Read contentRegistry
const registryPath = path.join(__dirname, '../src/cms-content/contentRegistry.ts');
const registryContent = fs.readFileSync(registryPath, 'utf-8');

// Extract all slugs from contentRegistry
const slugMatches = registryContent.matchAll(/slug: '([^']+)'/g);
const registrySlugs = [...slugMatches].map(m => m[1]);

// Read articleLoader
const loaderPath = path.join(__dirname, '../src/cms-content/articleLoader.ts');
const loaderContent = fs.readFileSync(loaderPath, 'utf-8');

// Extract all keys from articleContentMap
const keyMatches = loaderContent.matchAll(/'([^']+)':\s*\w+,/g);
const loaderKeys = [...keyMatches].map(m => m[1]);

console.log(`📊 Found ${registrySlugs.length} slugs in contentRegistry`);
console.log(`📊 Found ${loaderKeys.length} keys in articleLoader\n`);

// Find missing mappings
const missing = [];
const found = [];

registrySlugs.forEach(slug => {
  if (loaderKeys.includes(slug)) {
    found.push(slug);
  } else {
    missing.push(slug);
  }
});

// Results
console.log('='.repeat(80));
console.log(`\n✅ FOUND: ${found.length}/${registrySlugs.length} articles have content mappings`);

if (missing.length > 0) {
  console.log(`\n❌ MISSING: ${missing.length} articles NOT mapped in articleLoader:\n`);
  missing.forEach((slug, i) => {
    console.log(`   ${i + 1}. ${slug}`);
  });
  console.log(`\n⚠️  These articles will show "Coming Soon" until mapped!\n`);
  console.log('='.repeat(80));
  process.exit(1);
} else {
  console.log(`\n🎉 PERFECT! All ${registrySlugs.length} articles are properly mapped!`);
  console.log(`\n✅ Zero "Coming Soon" messages expected!\n`);
  console.log('='.repeat(80));
  process.exit(0);
}



