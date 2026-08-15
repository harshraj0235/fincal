const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dataDir = path.join(__dirname, '../src/data/discover');
const publicDir = path.join(__dirname, '../public');
const defaultImage = '/images/discover/top-business-trends-exploding.png';

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'metadata.ts' && f !== 'types.ts');

let fixedCount = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Match coverImage: '/images/discover/...',
  const match = content.match(/coverImage:\s*['"]([^'"]+)['"]/);
  if (match) {
    const imagePath = match[1];
    const fullImagePath = path.join(publicDir, imagePath);

    if (!fs.existsSync(fullImagePath)) {
      console.log(`❌ Image not found for ${file}: ${imagePath}. Replacing with default...`);
      content = content.replace(match[0], `coverImage: '${defaultImage}'`);
      fs.writeFileSync(filePath, content, 'utf8');
      fixedCount++;
    } else {
      console.log(`✅ Image OK for ${file}: ${imagePath}`);
    }
  }
}

console.log(`\nFixed ${fixedCount} articles with missing cover images.`);

if (fixedCount > 0) {
  console.log('Running metadata regeneration script...');
  try {
    execSync('npx tsx scripts/generateDiscoverMetadata.ts', { stdio: 'inherit' });
    console.log('Metadata regenerated successfully!');
  } catch (err) {
    console.error('Failed to regenerate metadata', err);
  }
}
