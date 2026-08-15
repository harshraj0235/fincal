const fs = require('fs');
const path = require('path');

const viteSrcDir = path.join(__dirname, '../../src');
const appTsxPath = path.join(viteSrcDir, 'App.tsx');
const nextAppDir = path.join(__dirname, '../src/app');

// 1. Parse App.tsx to create a mapping of RoutePath -> SourceFilePath
const appTsxContent = fs.readFileSync(appTsxPath, 'utf8');

const importRegex = /const\s+([A-Za-z0-9_]+)\s*=\s*lazy\(\(\)\s*=>\s*import\(['"](\.\/.*?)['"]\)\)/g;
const routeRegex = /<Route\s+path=['"](.*?)['"]\s+element=\{<([A-Za-z0-9_]+)\s*\/>\}\s*\/>/g;

const componentToSource = {};
let match;
while ((match = importRegex.exec(appTsxContent)) !== null) {
  const componentName = match[1];
  let sourcePath = match[2].replace('./', '');
  if (!sourcePath.endsWith('.tsx') && !sourcePath.endsWith('.jsx')) {
    sourcePath += '.tsx';
  }
  componentToSource[componentName] = sourcePath;
}

const pathToComponent = {};
while ((match = routeRegex.exec(appTsxContent)) !== null) {
  const routePath = match[1];
  const componentName = match[2];
  pathToComponent[routePath] = componentName;
}

// 2. Define the Hubs we need to restore
const targetHubs = [
  { viteFile: 'BankTools.tsx', nextHub: 'bank-tools' },
  { viteFile: 'CorporateFinance.tsx', nextHub: 'corporate-finance' },
  { viteFile: 'GoldTools.tsx', nextHub: 'gold-tools' },
  { viteFile: 'FestivalTools.tsx', nextHub: 'festival-tools' },
  { viteFile: 'InvoicingReceivablesHub.tsx', nextHub: 'invoice-generator-business' }
];

let generatedCount = 0;
let notFoundCount = 0;

for (const hub of targetHubs) {
  const viteHubPath = path.join(viteSrcDir, 'pages', hub.viteFile);
  if (!fs.existsSync(viteHubPath)) continue;
  
  const viteHubContent = fs.readFileSync(viteHubPath, 'utf8');
  
  // Extract all `path: '/some/path'` or `link: '/some/path'` or `slug: 'some-slug'` from the Vite hub file
  const pathRegex = /(?:path|link):\s*['"](.*?)['"]/g;
  const slugRegex = /slug:\s*['"](.*?)['"]/g;
  
  const legacyPaths = new Set();
  
  while ((match = pathRegex.exec(viteHubContent)) !== null) {
    legacyPaths.add(match[1]);
  }
  
  while ((match = slugRegex.exec(viteHubContent)) !== null) {
    let slug = match[1];
    // Reconstruct the path based on the hub
    if (hub.viteFile === 'InvoicingReceivablesHub.tsx') {
       legacyPaths.add(`/invoicing-tools/${slug}`);
    }
  }

  // Iterate over extracted legacy paths and generate Next.js pages
  for (let routePath of legacyPaths) {
    // If it's just a root hash or empty, skip
    if (!routePath || routePath === '/' || routePath.startsWith('#')) continue;
    
    // Clean trailing slash
    if (routePath.endsWith('/')) routePath = routePath.slice(0, -1);
    
    const componentName = pathToComponent[routePath];
    if (!componentName) {
       console.log(`Could not find component mapping for route: ${routePath}`);
       notFoundCount++;
       continue;
    }
    
    const sourceFilePath = componentToSource[componentName];
    if (!sourceFilePath) {
       console.log(`Could not find source file for component: ${componentName}`);
       continue;
    }
    
    const fullSourcePath = path.join(viteSrcDir, sourceFilePath);
    if (!fs.existsSync(fullSourcePath)) {
       console.log(`Source file does not exist: ${fullSourcePath}`);
       continue;
    }
    
    // Create Next.js directory structure
    // routePath is something like `/calculators/bank-locker-finder`
    const nextJsDirPath = path.join(nextAppDir, routePath.replace(/^\//, '')); // remove leading slash
    fs.mkdirSync(nextJsDirPath, { recursive: true });
    
    // Copy the component code
    const clientComponentName = `${componentName}Client.tsx`;
    const destComponentPath = path.join(nextJsDirPath, clientComponentName);
    
    let componentCode = fs.readFileSync(fullSourcePath, 'utf8');
    if (!componentCode.startsWith('"use client";')) {
       componentCode = '"use client";\n' + componentCode;
    }
    
    fs.writeFileSync(destComponentPath, componentCode, 'utf8');
    
    // Create page.tsx
    // Helper to extract title
    const titleMatch = componentCode.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : `${componentName} | MoneyCal India`;

    const descMatch = componentCode.match(/<meta\s+name="description"\s+content="(.*?)"/);
    const desc = descMatch ? descMatch[1] : `Free online ${componentName} tool by MoneyCal India.`;

    const pageContent = `import React from 'react';
import { Metadata } from 'next';
import ${componentName} from './${clientComponentName.replace('.tsx', '')}';

export const metadata: Metadata = {
  title: '${title.replace(/'/g, "\\'")}',
  description: '${desc.replace(/'/g, "\\'")}',
  alternates: {
    canonical: 'https://moneycal.in${routePath}',
  }
};

export default function Page() {
  return <${componentName} />;
}
`;
    fs.writeFileSync(path.join(nextJsDirPath, 'page.tsx'), pageContent, 'utf8');
    console.log(`✅ Restored legacy route: ${routePath} -> ${sourceFilePath}`);
    generatedCount++;
  }
}

console.log(`\n🎉 Successfully restored ${generatedCount} legacy routes.`);
if (notFoundCount > 0) {
  console.log(`⚠️ Could not resolve ${notFoundCount} routes from App.tsx.`);
}
