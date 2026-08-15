const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');
const hubs = fs.readdirSync(appDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name.includes('-tools') || dirent.name === 'corporate-finance' || dirent.name === 'invoice-generator-business')
  .map(dirent => dirent.name);

for (const hub of hubs) {
  const dirPath = path.join(appDir, hub);
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('Client.tsx') || f === 'page.tsx');

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Look for array declarations
    const arrayMatch = content.match(/const\s+(\w+)\s*=\s*\[/);
    if (arrayMatch) {
      console.log(`\nFound array '${arrayMatch[1]}' in ${hub}/${file}`);
      
      // Look for the first object
      const objMatch = content.match(/{\s*id:.*?}/s) || content.match(/{\s*name:.*?}/s) || content.match(/{\s*title:.*?}/s);
      if (objMatch) {
        console.log(`First object signature:`);
        const lines = objMatch[0].split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));
        console.log(lines.slice(0, 5).join(' | '));
      } else {
        console.log("Could not parse object structure easily.");
      }
    }
  }
}
