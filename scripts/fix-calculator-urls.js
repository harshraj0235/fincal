const fs = require('fs');
const path = require('path');

// Step 1: Scan src/app for all page.tsx files and map their directory name to their URL path
const appDir = path.join(__dirname, '../src/app');
const toolsMap = {};

function scanDirectory(dir, currentUrl) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // Ignore dynamic routes
      if (!file.startsWith('[')) {
        scanDirectory(fullPath, `${currentUrl}/${file}`);
      }
    } else if (file === 'page.tsx') {
      const id = path.basename(dir);
      toolsMap[id] = currentUrl;
    }
  }
}
scanDirectory(appDir, '');

console.log('Found physical paths:', toolsMap);

// Step 2: Update calculatorData.ts
const dataPath = path.join(__dirname, '../src/data/calculatorData.ts');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// We'll iterate through toolsMap and inject `url: '...'` into the object definition if it's missing
for (const [id, url] of Object.entries(toolsMap)) {
  // Regex to find the start of the object: { id: 'email-signature-generator', ... }
  // We want to add url: '${url}', right after the id line if it doesn't exist.
  const regex = new RegExp(`({\\s*id:\\s*'${id}'\\s*,)`, 'g');
  
  if (regex.test(dataContent)) {
    // Check if url is already defined nearby (approx 500 chars)
    const index = dataContent.indexOf(`id: '${id}'`);
    const chunk = dataContent.substring(index, index + 300);
    
    if (!chunk.includes('url:')) {
      console.log(`Injecting url for ${id} -> ${url}`);
      dataContent = dataContent.replace(regex, `$1\n        url: '${url}',`);
    } else {
        // if it already has a URL, maybe it's wrong?
        const urlMatch = chunk.match(/url:\s*'([^']+)'/);
        if (urlMatch && urlMatch[1] !== url && !urlMatch[1].startsWith('http')) {
            console.log(`Updating url for ${id} from ${urlMatch[1]} to ${url}`);
            // This is trickier, let's just do a manual replace for the exact url string
            dataContent = dataContent.replace(new RegExp(`url:\\s*'${urlMatch[1]}'`), `url: '${url}'`);
        }
    }
  }
}

fs.writeFileSync(dataPath, dataContent, 'utf8');
console.log('Successfully updated calculatorData.ts URLs!');
