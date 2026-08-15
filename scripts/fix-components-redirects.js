const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      replaceInDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // Ensure we only replace exactly the route path (so we don't break `/excel-tools/budget-template` if it exists, wait, do those exist?)
      // Actually `/excel-tools/budget-template` is broken anyway if the real folder is `/excel-tools-page/budget-template`...
      // Let's just replace the exact hub paths for now.
      content = content.replace(/['"]\/excel-tools['"]/g, "'/excel-tools-page'");
      content = content.replace(/['"]\/invoicing-tools['"]/g, "'/invoice-generator-business'");

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${file}`);
      }
    }
  }
}

replaceInDir(componentsDir);
console.log('Finished updating components.');
