const fs = require('fs');
const path = require('path');

const viteSrcDir = path.join(__dirname, '../../src');
const nextAppDir = path.join(__dirname, '../src/app');
const targetDir = path.join(nextAppDir, 'invoice-generator-business');

// 1. Delete existing fake hub files
const hubClientFile = path.join(targetDir, 'InvoiceGeneratorBusinessClient.tsx');
if (fs.existsSync(hubClientFile)) fs.unlinkSync(hubClientFile);
const hubPageFile = path.join(targetDir, 'page.tsx');
if (fs.existsSync(hubPageFile)) fs.unlinkSync(hubPageFile);

// 2. Read Vite file
const viteFile = path.join(viteSrcDir, 'pages', 'InvoiceGeneratorBusiness.tsx');
let content = fs.readFileSync(viteFile, 'utf8');

// 3. Fix syntax
content = '"use client";\n' + content;
content = content.replace(/react-router-dom/g, 'next/navigation');
const topLevelDirs = ['components', 'data', 'utils', 'hooks', 'calculators', 'services'];
content = content.replace(/from\s+['"](?:\.\.\/)+([a-zA-Z0-9_-]+)\/?(.*?)['"]/g, (match, dirName, restPath) => {
  if (topLevelDirs.includes(dirName)) {
    return `from '@/${dirName}${restPath ? '/' + restPath : ''}'`;
  }
  return match;
});
if (/from\s+['"]lucide-react['"]/.test(content) && /{.*?\bLink\b.*?}/.test(content)) {
  content = content.replace(/(import\s+{.*?\b)Link(\b.*?}\s+from\s+['"]lucide-react['"])/g, '$1Link as LinkIcon$2');
  content = content.replace(/LinkIconIcon+/g, 'LinkIcon');
  content = content.replace(/<Link(?![^>]*href=)/g, '<LinkIcon');
}

// 4. Write Client Component
fs.writeFileSync(path.join(targetDir, 'InvoiceGeneratorBusinessClient.tsx'), content, 'utf8');

// 5. Write Page Component
const pageContent = `import React from 'react';
import { Metadata } from 'next';
import InvoiceGeneratorBusinessClient from './InvoiceGeneratorBusinessClient';

export const metadata: Metadata = {
  title: 'Invoice Generator Business | MoneyCal.in',
  description: 'Create professional business invoices instantly.',
  alternates: {
    canonical: 'https://moneycal.in/invoice-generator-business'
  }
};

export default function Page() {
  return <InvoiceGeneratorBusinessClient />;
}
`;
fs.writeFileSync(path.join(targetDir, 'page.tsx'), pageContent, 'utf8');

console.log('✅ Migrated InvoiceGeneratorBusiness tool successfully.');
