const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');
const hubs = [
  'bank-tools',
  'insurance-tools',
  'corporate-finance',
  'invoice-generator-business',
  'finance-tools',
  'gst-tools',
  'gold-tools',
  'tax-tools',
  'loan-tools',
  'festival-tools'
];

for (const hub of hubs) {
  const dirPath = path.join(appDir, hub);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('Client.tsx') || f === 'page.tsx');

  for (const file of files) {
    // Only process the Client.tsx or the loan-tools/page.tsx which holds the array
    if (file === 'page.tsx' && hub !== 'loan-tools') continue;

    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Rename title: to name:
    content = content.replace(/\btitle\s*:/g, 'name:');
    
    // Rename desc: to description:
    content = content.replace(/\bdesc\s*:/g, 'description:');

    // Convert link: to path:
    content = content.replace(/\blink\s*:/g, 'path:');

    // Convert slug: 'something' to path: '/hub/something'
    // Specifically in loan-tools and gst-tools
    content = content.replace(/\bslug\s*:\s*['"]([^'"]+)['"]/g, `path: '/${hub}/$1'`);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Standardized array properties in ${hub}/${file}`);
  }
}
