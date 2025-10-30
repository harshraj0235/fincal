/**
 * VERIFICATION SCRIPT - Run this to verify all articles have content
 * node VERIFY_ALL_ARTICLES.js
 */

const { contentRegistry } = require('./src/cms-content/contentRegistry.ts');
const { articleContentMap } = require('./src/cms-content/articleLoader.ts');

console.log('🔍 VERIFYING ALL ARTICLES HAVE CONTENT...\n');

let total = 0;
let missing = 0;
let found = 0;

contentRegistry.forEach(article => {
  total++;
  const hasContent = !!articleContentMap[article.slug];
  
  if (hasContent) {
    found++;
    console.log(`✅ ${article.slug}`);
  } else {
    missing++;
    console.log(`❌ MISSING: ${article.slug} (ID: ${article.id})`);
  }
});

console.log('\n' + '='.repeat(70));
console.log(`\n📊 SUMMARY:`);
console.log(`   Total Articles: ${total}`);
console.log(`   Content Found: ${found} ✅`);
console.log(`   Missing Content: ${missing} ❌`);
console.log(`   Success Rate: ${((found/total)*100).toFixed(1)}%`);
console.log('\n' + '='.repeat(70));

if (missing > 0) {
  console.log('\n⚠️  FIX REQUIRED: Add missing articles to articleLoader.ts\n');
  process.exit(1);
} else {
  console.log('\n🎉 PERFECT! All articles have content!\n');
  process.exit(0);
}

