const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// The 11 hubs
const hubs = [
  'finance-tools',
  'tax-tools',
  'gst-tools',
  'excel-tools-page',
  'loan-tools',
  'insurance-tools',
  'bank-tools',
  'gold-tools',
  'invoice-generator-business',
  'corporate-finance',
  'festival-tools'
];

let totalFixed = 0;

for (const hub of hubs) {
  const hubPath = path.join(appDir, hub);
  if (!fs.existsSync(hubPath)) continue;

  const files = fs.readdirSync(hubPath).filter(f => f.endsWith('.tsx'));

  for (const file of files) {
    const filePath = path.join(hubPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const regexps = [
      /path:\s*['"](\/(?:finance-tools|tax-tools|gst-tools|excel-tools-page|loan-tools|insurance-tools|bank-tools|gold-tools|invoice-generator-business|corporate-finance|festival-tools|calculators|astro-finance)[^'"]+)['"]/g,
      /href=['"](\/(?:finance-tools|tax-tools|gst-tools|excel-tools-page|loan-tools|insurance-tools|bank-tools|gold-tools|invoice-generator-business|corporate-finance|festival-tools|calculators|astro-finance)[^'"]+)['"]/g
    ];

    let fileNeedsFix = false;

    for (const regex of regexps) {
      const matches = [...content.matchAll(regex)];

      for (const match of matches) {
        const routeUrl = match[1];
        
        // Skip correct /calculators routes that are handled by [id] dynamic routing
        // The /calculators/[id] dynamic route handles things like /calculators/sip-calculator
        // To be safe, if it's /calculators/..., we should check if the slug is valid in calculatorData.ts
        // But for simplicity, we know /corporate-finance/xxx and /insurance-tools/xxx are broken.
        
        if (routeUrl.startsWith('/calculators/')) {
           // We can check if it exists in src/data/calculatorData.ts
           const calcData = fs.readFileSync(path.join(__dirname, '../src/data/calculatorData.ts'), 'utf8');
           const slug = routeUrl.split('/calculators/')[1];
           if (calcData.includes(`id: '${slug}'`)) {
             continue; // Valid dynamic route
           }
        } else {
           const segments = routeUrl.split('/').filter(Boolean);
           const dirPath = path.join(appDir, ...segments);
           if (fs.existsSync(dirPath) && fs.existsSync(path.join(dirPath, 'page.tsx'))) {
             continue; // Valid static route
           }
        }

        // If it reaches here, it's definitively a broken route
        console.log(`🔧 Redirecting broken link to /tools: ${routeUrl}`);
        content = content.replace(new RegExp(`['"]${routeUrl}['"]`, 'g'), `'/tools'`);
        fileNeedsFix = true;
        totalFixed++;
      }
    }

    if (fileNeedsFix) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`💾 Saved ${hub}/${file}`);
    }
  }
}

console.log(`\nReplaced ${totalFixed} fundamentally broken links with /tools.`);
