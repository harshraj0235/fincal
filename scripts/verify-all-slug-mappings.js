/**
 * Comprehensive Slug Verification Script
 * Extracts ALL slugs from contentRegistry and verifies articleLoader mappings
 */

const fs = require('fs');
const path = require('path');

// Read files
const contentRegistryPath = path.join(__dirname, '../src/cms-content/contentRegistry.ts');
const articleLoaderPath = path.join(__dirname, '../src/cms-content/articleLoader.ts');

const registryContent = fs.readFileSync(contentRegistryPath, 'utf-8');
const loaderContent = fs.readFileSync(articleLoaderPath, 'utf-8');

// Extract all slugs from contentRegistry
const slugPattern = /slug:\s*['"]([^'"]+)['"]/g;
let match;
const registrySlugs = [];

while ((match = slugPattern.exec(registryContent)) !== null) {
  registrySlugs.push(match[1]);
}

// Extract all keys from articleContentMap
const mapKeyPattern = /['"]([^'"]+)['"]\s*:/g;
const mapSection = loaderContent.substring(
  loaderContent.indexOf('export const articleContentMap'),
  loaderContent.lastIndexOf('};')
);

const loaderKeys = [];
while ((match = mapKeyPattern.exec(mapSection)) !== null) {
  // Skip if it's a comment or type definition
  if (!match[1].includes('//') && match[1] !== 'articleContentMap') {
    loaderKeys.push(match[1]);
  }
}

console.log('\n📊 COMPREHENSIVE SLUG VERIFICATION REPORT\n');
console.log('='.repeat(70));
console.log(`\n✅ Total slugs in contentRegistry: ${registrySlugs.length}`);
console.log(`✅ Total keys in articleContentMap: ${loaderKeys.length}`);

// Find mismatches
const missingInLoader = registrySlugs.filter(slug => !loaderKeys.includes(slug));
const extraInLoader = loaderKeys.filter(key => !registrySlugs.includes(key));

if (missingInLoader.length > 0) {
  console.log(`\n❌ MISSING in articleLoader (${missingInLoader.length}):`);
  console.log('='.repeat(70));
  missingInLoader.forEach((slug, i) => {
    console.log(`${i + 1}. ${slug}`);
  });
}

if (extraInLoader.length > 0) {
  console.log(`\n⚠️ EXTRA keys in articleLoader (not in registry) (${extraInLoader.length}):`);
  console.log('='.repeat(70));
  extraInLoader.forEach((key, i) => {
    console.log(`${i + 1}. ${key}`);
  });
}

if (missingInLoader.length === 0 && extraInLoader.length === 0) {
  console.log('\n🎉 PERFECT MATCH! All slugs are correctly mapped!\n');
  process.exit(0);
} else {
  console.log(`\n\n❌ VERIFICATION FAILED: Found ${missingInLoader.length + extraInLoader.length} mismatches!\n`);
  process.exit(1);
}

