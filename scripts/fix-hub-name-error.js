const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// Hubs with dynamic catch-all routes
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
  const filePath = path.join(appDir, hub, '[...slug]', 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace ${hub.name} with ${formattedTitle} or just remove it
    content = content.replace(/\$\{hub\.name\}/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed hub.name reference in ${hub}`);
  }
}
