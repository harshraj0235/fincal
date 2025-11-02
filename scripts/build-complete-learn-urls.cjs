/**
 * ═══════════════════════════════════════════════════════════════════════
 * COMPLETE LEARN URL BUILDER - ALL 159 LESSONS
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Extracts ALL lesson slugs from all 10 lesson files
 * Builds complete URL list for sitemap
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://moneycal.in';
const LEARN_DATA_DIR = path.join(__dirname, '../src/data/learn');
const OUTPUT_PATH = path.join(__dirname, '../public/all-learn-urls.txt');

console.log('═══════════════════════════════════════════════════════════════════════');
console.log('📚 BUILDING COMPLETE LEARN URL LIST');
console.log('═══════════════════════════════════════════════════════════════════════\n');

const allLearnUrls = [];

// Add main learn page
allLearnUrls.push(`${BASE_URL}/learn`);

// Category mappings (file → category slug)
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

let totalLessons = 0;

// Scan each lesson file
Object.entries(categoryMappings).forEach(([filename, categorySlug]) => {
  const filePath = path.join(LEARN_DATA_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filename} not found, skipping`);
    return;
  }
  
  // Add category hub page
  allLearnUrls.push(`${BASE_URL}/learn/${categorySlug}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract lesson slugs
    const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
    const lessonSlugs = slugMatches
      .map(match => match.match(/['"]([^'"]+)['"]/)[1])
      .filter(slug => slug !== categorySlug); // Remove category slug itself
    
    // Add each lesson URL
    lessonSlugs.forEach(slug => {
      const url = `${BASE_URL}/learn/${categorySlug}/${slug}`;
      allLearnUrls.push(url);
    });
    
    totalLessons += lessonSlugs.length;
    console.log(`✅ ${filename.padEnd(35)} → ${lessonSlugs.length.toString().padStart(2)} lessons`);
    
  } catch (error) {
    console.log(`⚠️  Error reading ${filename}: ${error.message}`);
  }
});

// Save to file
fs.writeFileSync(OUTPUT_PATH, allLearnUrls.join('\n'));

console.log('\n═══════════════════════════════════════════════════════════════════════');
console.log('✅ LEARN URL BUILD COMPLETE!');
console.log('═══════════════════════════════════════════════════════════════════════');
console.log(`📚 Total URLs: ${allLearnUrls.length}`);
console.log(`   📖 Categories: 10`);
console.log(`   📄 Lessons: ${totalLessons}`);
console.log(`   🏠 Main page: 1`);
console.log(`💾 Saved to: ${OUTPUT_PATH}`);
console.log('═══════════════════════════════════════════════════════════════════════\n');

module.exports = { allLearnUrls };




