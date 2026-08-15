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
    if (slug === '[...slug]') continue;

    const files = fs.readdirSync(path.join(hubDir, slug)).filter(f => f.endsWith('.tsx') && f !== 'page.tsx');

    for (const file of files) {
      const filePath = path.join(hubDir, slug, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // Deduplicate next/link imports
      content = content.replace(/import Link from 'next\/link';\nimport Link from 'next\/link';/g, "import Link from 'next/link';");

      // Check if lucide-react imports Link
      if (/from\s+['"]lucide-react['"]/.test(content) && /{.*?\bLink\b.*?}/.test(content)) {
        // Change `Link` to `Link as LinkIcon` in the lucide-react import
        content = content.replace(/(import\s+{.*?\b)Link(\b.*?}\s+from\s+['"]lucide-react['"])/g, '$1Link as LinkIcon$2');
        
        // Change `<Link ... />` to `<LinkIcon ... />` ONLY if it doesn't have an href
        // Regex logic: Find `<Link ` followed by anything EXCEPT `href=` before the closing `>`
        // Since attributes can span multiple lines, we need to be careful. 
        // A simpler way is to replace ALL `<Link ` and `</Link>` with `<LinkIcon ` and `</LinkIcon>`,
        // EXCEPT if the tag has an href. But `next/link` ALWAYS has an href.
        // Actually, it's easier to find `<Link className=` or `<Link size=` since lucide icons use these.
        content = content.replace(/<Link(?![^>]*href=)/g, '<LinkIcon');
      }

      // Also clean up duplicate Router imports if they happened
      content = content.replace(/import { useRouter } from 'next\/navigation';\nimport { useRouter } from 'next\/navigation';/g, "import { useRouter } from 'next/navigation';");

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
      }
    }
  }
}

console.log(`✅ Fixed 'Link' naming collisions in ${fixedCount} components.`);
