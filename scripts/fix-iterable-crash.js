const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

const hubsToFix = [
  'bank-tools',
  'insurance-tools',
  'corporate-finance',
  'invoice-generator-business'
];

for (const hub of hubsToFix) {
  const dirPath = path.join(appDir, hub);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('Client.tsx'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract the exact array name using a simple regex searching for "const something = ["
    let dataMatch = content.match(/const\s+(\w+)\s*=\s*\[/);
    if (!dataMatch) {
      console.log(`Could not find array name in ${file}`);
      continue;
    }
    
    let arrayName = dataMatch[1];
    
    // The buggy line looks something like:
    // const allTools = [...(typeof tools !== 'undefined' ? tools : []), ...(typeof businessTools !== 'undefined' ? businessTools : [])...].filter(...)
    // We want to replace it entirely with:
    // const allTools = ARRAYNAME.filter((v: any, i: number, a: any) => a.findIndex((t: any) => t.name === v.name) === i);
    
    // First, find the line starting with "const allTools ="
    const allToolsRegex = /const\s+allTools\s*=\s*\[.*?\].filter.*?;/s;
    if (content.match(allToolsRegex)) {
      content = content.replace(
        allToolsRegex,
        `const allTools = ${arrayName}.filter((v: any, i: number, a: any) => a.findIndex((t: any) => t.name === v.name) === i);`
      );
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed iterable crash in ${file} (Array: ${arrayName})`);
    } else {
      console.log(`Could not find buggy allTools line in ${file}`);
    }
  }
}
