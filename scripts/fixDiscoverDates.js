import fs from 'fs';
import path from 'path';

const discoverDir = path.join(process.cwd(), 'src/data/discover');

if (!fs.existsSync(discoverDir)) {
  console.error("Directory not found:", discoverDir);
  process.exit(1);
}

const files = fs.readdirSync(discoverDir).filter(f => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts' && f !== 'metadata.ts');

console.log(`Found ${files.length} Discover articles. Validating dates...`);

let fixedCount = 0;
const baseDate = new Date(); // 2026-08-15
baseDate.setHours(12, 0, 0, 0);

files.forEach((file, index) => {
  const filePath = path.join(discoverDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let needsUpdate = false;
  
  // Find date property
  const dateRegex = /(date|publishedAt):\s*['"](.*?)['"]/;
  const match = content.match(dateRegex);
  
  if (match) {
    const existingDateStr = match[2];
    // Check if hallucinated (e.g., 2023, 2024, or placeholder like YYYY-MM-DD)
    if (!existingDateStr.startsWith('2026') || existingDateStr.includes('YYYY')) {
      needsUpdate = true;
    }
  } else {
    // Missing date? We should probably inject it, but the schema usually requires it
    needsUpdate = true;
  }
  
  if (needsUpdate) {
    // Generate a unique date in 2026 by subtracting hours based on index so they sort chronologically
    const newDate = new Date(baseDate.getTime() - (index * 60 * 60 * 1000));
    const newDateStr = newDate.toISOString();
    
    if (match) {
      content = content.replace(dateRegex, `$1: '${newDateStr}'`);
    } else {
      // If no date field exists, try inserting it after author
      content = content.replace(/(author:\s*['"].*?['"],?)/, `$1\n  date: '${newDateStr}',`);
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
    fixedCount++;
  }
});

console.log(`Fixed dates in ${fixedCount} files.`);
