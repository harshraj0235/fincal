const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

function fixImportsInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fixImportsInDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // Replace import paths ending with .tsx
      // e.g. import ClientComponent from './FinanceGPTClient.tsx';
      // to import ClientComponent from './FinanceGPTClient';
      content = content.replace(/from\s+['"]([^'"]+)\.tsx['"]/g, "from '$1'");

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed import in ${filePath}`);
      }
    }
  }
}

fixImportsInDir(appDir);
console.log('Finished fixing .tsx imports.');
