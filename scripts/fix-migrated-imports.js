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

let fixedCount = 0;

for (const hub of hubs) {
  const hubDir = path.join(appDir, hub);
  if (!fs.existsSync(hubDir)) continue;

  const slugs = fs.readdirSync(hubDir).filter(f => fs.statSync(path.join(hubDir, f)).isDirectory());
  
  for (const slug of slugs) {
    if (slug === '[...slug]') continue; // Skip dynamic catch-all

    const files = fs.readdirSync(path.join(hubDir, slug)).filter(f => f.endsWith('.tsx') && f !== 'page.tsx');

    for (const file of files) {
      const filePath = path.join(hubDir, slug, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      let originalContent = content;

      // 1. Remove SEOHelmet imports
      content = content.replace(/import\s+SEOHelmet\s+from\s+['"].*?SEOHelmet['"];?/g, '');
      
      // 2. Remove <SEOHelmet ... /> instances (handling multi-line)
      content = content.replace(/<SEOHelmet[\s\S]*?\/>/g, '');

      // 3. Convert relative imports for components, data, and utils to absolute Next.js aliases
      // Matches imports like: import X from '../../components/Y' or '../../../data/Z'
      content = content.replace(/from\s+['"](?:\.\.\/)+components\/(.*?)['"]/g, "from '@/components/$1'");
      content = content.replace(/from\s+['"](?:\.\.\/)+data\/(.*?)['"]/g, "from '@/data/$1'");
      content = content.replace(/from\s+['"](?:\.\.\/)+utils\/(.*?)['"]/g, "from '@/utils/$1'");

      // Also fix `import { goldTools } from '../goldTools'` or similar if any exist
      content = content.replace(/from\s+['"](?:\.\.\/)+([a-zA-Z0-9_-]+)['"]/g, (match, p1) => {
          // If it's importing a common file from root or data, let's just make it '@/data/X' if it's data
          if (p1.includes('Tools') || p1 === 'calculatorData') {
              return `from '@/data/${p1}'`;
          }
          return match;
      });

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
      }
    }
  }
}

console.log(`✅ Fixed imports and removed SEOHelmet in ${fixedCount} components.`);
