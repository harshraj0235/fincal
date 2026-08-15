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

    const files = fs.readdirSync(path.join(hubDir, slug)).filter(f => f.endsWith('.tsx'));

    for (const file of files) {
      const filePath = path.join(hubDir, slug, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;

      // Replace LinkIconIcon or LinkIconIconIcon with LinkIcon
      content = content.replace(/LinkIconIcon+/g, 'LinkIcon');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
      }
    }
  }
}

console.log(`✅ Fixed LinkIconIcon typos in ${fixedCount} components.`);
