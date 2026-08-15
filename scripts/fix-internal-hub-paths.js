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

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('Client.tsx'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // We want to find objects in the data array and intelligently fix their `path: '/tools'`
    // A simplistic way using regex to catch standard objects that have id/name and path/link.
    // Instead of complex AST parsing, we can just replace path: '/tools' with a slugified version of the tool's name if we can match it.
    
    // We'll replace it block by block
    const blocks = content.split('},');
    const newBlocks = blocks.map(block => {
      if (block.includes("'/tools'")) {
        // Try to find id or title or name
        let slug = '';
        const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
        const nameMatch = block.match(/(?:name|title):\s*['"]([^'"]+)['"]/);
        
        if (idMatch) {
          slug = idMatch[1];
        } else if (nameMatch) {
          slug = nameMatch[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        
        if (slug) {
          // Replace both link and path just in case
          return block.replace(/path:\s*['"]\/tools['"]/g, `path: '/${hub}/${slug}'`)
                      .replace(/link:\s*['"]\/tools['"]/g, `link: '/${hub}/${slug}'`);
        }
      }
      return block;
    });
    
    content = newBlocks.join('},');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed internal paths in ${hub}/${file}`);
  }
}
