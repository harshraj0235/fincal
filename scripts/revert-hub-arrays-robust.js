const fs = require('fs');
const path = require('path');

const viteSrcDir = path.join(__dirname, '../../src');
const nextAppDir = path.join(__dirname, '../src/app');

const hubs = [
  { vite: 'CorporateFinance.tsx', next: 'corporate-finance/CorporateFinanceClient.tsx' },
  { vite: 'GoldTools.tsx', next: 'gold-tools/GoldToolsClient.tsx' },
  { vite: 'FestivalTools.tsx', next: 'festival-tools/FestivalToolsClient.tsx' },
  { vite: 'InvoicingReceivablesHub.tsx', next: 'invoice-generator-business/InvoiceGeneratorBusinessClient.tsx' }
];

let updatedCount = 0;

for (const hub of hubs) {
  const vitePath = path.join(viteSrcDir, 'pages', hub.vite);
  const nextPath = path.join(nextAppDir, hub.next);

  if (!fs.existsSync(vitePath) || !fs.existsSync(nextPath)) continue;

  const viteContent = fs.readFileSync(vitePath, 'utf8');
  let nextContent = fs.readFileSync(nextPath, 'utf8');
  let originalNextContent = nextContent;

  const toolNameRegex = /name:\s*['"](.*?)['"]/g;
  let match;
  
  while ((match = toolNameRegex.exec(nextContent)) !== null) {
    const toolName = match[1];
    const safeToolName = toolName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Find tool block in Vite
    const objBlockRegex = new RegExp(`{[^{}]*name:\\s*['"]${safeToolName}['"][\\s\\S]*?}`, 'g');
    const objMatch = objBlockRegex.exec(viteContent);
    
    if (objMatch) {
      const objBlock = objMatch[0];
      let correctPath = null;
      
      const pathPropMatch = /(?:path|link):\s*['"](.*?)['"]/.exec(objBlock);
      if (pathPropMatch) {
        correctPath = pathPropMatch[1];
      } else {
        const slugPropMatch = /slug:\s*['"](.*?)['"]/.exec(objBlock);
        if (slugPropMatch) {
          if (hub.vite === 'InvoicingReceivablesHub.tsx') correctPath = `/invoicing-tools/${slugPropMatch[1]}`;
          if (hub.vite === 'GoldTools.tsx') correctPath = `/gold-tools/${slugPropMatch[1]}`;
        }
      }
      
      if (correctPath) {
        // Find tool block in Next.js
        const nextObjBlockRegex = new RegExp(`({[^{}]*name:\\s*['"]${safeToolName}['"][\\s\\S]*?})`, 'g');
        nextContent = nextContent.replace(nextObjBlockRegex, (nextObjMatch) => {
           if (nextObjMatch.match(/path:\s*['"]/)) {
             return nextObjMatch.replace(/path:\s*['"].*?['"]/, `path: '${correctPath}'`);
           } else if (nextObjMatch.match(/slug:\s*['"]/)) {
             // For Invoicing, maybe it still has slug
             return nextObjMatch; 
           }
           return nextObjMatch;
        });
      }
    }
  }

  // Handle GoldTools and Invoicing that might still use slug mapping instead of path
  // If nextContent uses slug, we don't need to change it, the original array already had slug and we map to `/invoicing-tools/${slug}` in the JSX!
  // Let's check if we actually need to change the JSX instead.

  if (nextContent !== originalNextContent) {
    fs.writeFileSync(nextPath, nextContent, 'utf8');
    updatedCount++;
    console.log(`Updated paths in ${hub.next}`);
  }
}

console.log(`✅ Reverted data arrays in ${updatedCount} Next.js Hub clients.`);
