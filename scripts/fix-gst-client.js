const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/gst-tools/GSTToolsClient.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Change `path: '/gst-tools/...'` to `slug: '...'`
content = content.replace(/path:\s*'\/gst-tools\/([^']+)'/g, "slug: '$1'");

// 2. Change `href={\`/tools/\${tool.slug}\`}` to `href={\`/gst-tools/\${tool.slug}\`}`
content = content.replace(/href=\{`\/tools\/\$\{tool\.slug\}`\}/g, "href={`/gst-tools/${tool.slug}`}");

// 3. Since ALL the tools now have physical pages (because of the automated port),
// we shouldn't filter them out by `implementedSlugs`!
// Let's remove the `implementedSlugs.has(...)` filter so ALL 50+ tools show up on the page!
content = content.replace(/const availableTools = gstTools\.filter\(tool => implementedSlugs\.has\(tool\.slug\)\);/, "const availableTools = gstTools;");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed GSTToolsClient.tsx');
