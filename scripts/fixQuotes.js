import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('href="/calculators"')) {
    // Only replace it if it looks like it replaced quotes
    let newContent = content.replace(/href="\/calculators"/g, '"');
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Fixed quotes in ${filePath}`);
  }
}

const file1 = path.join(process.cwd(), 'src/components/FinanceGPTResponseRenderer.tsx');
fixFile(file1);

const file2 = path.join(process.cwd(), 'src/app/festival-tools/FestivalToolsClient.tsx');
// Wait, the error in FestivalToolsClient was:
// Error: Export festivalTools doesn't exist in target module
// The export festivalTools was not found in module src/data/festivalTools.ts
