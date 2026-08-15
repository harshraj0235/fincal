const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');
const hubs = [
  'insurance-tools',
  'bank-tools',
  'corporate-finance',
  'invoice-generator-business',
  'festival-tools',
  'gold-tools',
  'gst-tools',
  'loan-tools',
  'tax-tools'
];

// Top-level directories that exist in src/
const topLevelDirs = ['calculators', 'components', 'data', 'engine', 'hooks', 'lib', 'services', 'styles', 'types', 'utils', 'pages', 'assets'];

let fixedCount = 0;

for (const hub of hubs) {
  const hubDir = path.join(appDir, hub);
  if (!fs.existsSync(hubDir)) continue;

  const slugs = fs.readdirSync(hubDir).filter(f => fs.statSync(path.join(hubDir, f)).isDirectory());
  
  for (const slug of slugs) {
    if (slug === '[...slug]') continue;

    const files = fs.readdirSync(path.join(hubDir, slug)).filter(f => f.endsWith('.tsx') && f !== 'page.tsx');

    for (const file of files) {
      const filePath = path.join(hubDir, slug, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // Fix any relative imports like ../../calculators/X or ../../../hooks/Y
      // This regex captures the top-level directory name and the rest of the path
      content = content.replace(/from\s+['"](?:\.\.\/)+([a-zA-Z0-9_-]+)\/?(.*?)['"]/g, (match, dirName, restPath) => {
        if (topLevelDirs.includes(dirName)) {
          return `from '@/${dirName}${restPath ? '/' + restPath : ''}'`;
        }
        return match; // Leave it alone if it's not a known top-level dir
      });
      
      // Some files might just have `from '../../calculatorData'`
      content = content.replace(/from\s+['"](?:\.\.\/)+(calculatorData|financeCategories)['"]/g, "from '@/data/$1'");

      // And we need to fix Lucide React imports if they are broken, but next.js error log didn't explicitly say lucide was broken.
      // Wait, there was one error: at <unknown> (https://nextjs.org/docs/messages/module-not-found)
      // I will leave lucide alone.

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
      }
    }
  }
}

console.log(`✅ Fixed missing relative imports in ${fixedCount} components.`);
