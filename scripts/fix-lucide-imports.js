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

    // 1. Find all possible icon usages: `icon: IconName` or `<IconName className`
    const iconRegex = /(?:icon:\s*([A-Z][a-zA-Z0-9]+))|(?:<([A-Z][a-zA-Z0-9]+)\s+className)/g;
    const usedIcons = new Set();
    
    let match;
    while ((match = iconRegex.exec(content)) !== null) {
      if (match[1]) usedIcons.add(match[1]);
      if (match[2]) usedIcons.add(match[2]);
    }

    // These are standard React/Next components we should NOT import from lucide-react
    const exclude = ['Link', 'React', 'WhatsAppBanner', 'ToolArticle', 'motion', 'Fragment', 'AnimatePresence'];
    
    const iconsToImport = Array.from(usedIcons).filter(icon => !exclude.includes(icon));

    // 2. Find existing lucide-react import
    const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/;
    const importMatch = content.match(importRegex);

    if (importMatch) {
      const existingImports = importMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      const allImports = new Set([...existingImports, ...iconsToImport]);
      
      const newImportString = `import { ${Array.from(allImports).join(', ')} } from 'lucide-react';`;
      content = content.replace(importRegex, newImportString);
    } else {
      // Create new import
      if (iconsToImport.length > 0) {
         content = `import { ${iconsToImport.join(', ')} } from 'lucide-react';\n` + content;
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed imports in ${hub}/${file}`);
  }
}
