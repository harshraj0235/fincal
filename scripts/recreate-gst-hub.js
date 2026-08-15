const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../../src/pages/GSTTools.tsx');
const destClientPath = path.join(__dirname, '../src/app/gst-tools/GSTToolsClient.tsx');
const destPagePath = path.join(__dirname, '../src/app/gst-tools/page.tsx');

let content = fs.readFileSync(srcPath, 'utf8');

// Port to Next.js
content = content.replace(/import \{ Link as RouterLink \} from 'react-router-dom';/, "import Link from 'next/link';");
content = content.replace(/import SEOHelmet from '\.\.\/components\/SEOHelmet';\n?/, "");
content = content.replace(/<SEOHelmet[\s\S]*?\/>/, "");
content = content.replace(/<RouterLink/g, "<Link");
content = content.replace(/<\/RouterLink>/g, "</Link>");
content = content.replace(/to=\{\`/g, "href={`");
content = content.replace(/to='/g, "href='");

// Set the exact implemented slugs so we don't show the 404 ones!
const implementedList = [
    'composition-scheme-checker',
    'gst-amount-calculator',
    'gst-calculator',
    'gst-composition-eligibility',
    'gst-due-date-tracker',
    'gst-e-invoice-qrvalidator',
    'gst-eway-distance-calculator',
    'gst-hsn-sac-finder',
    'gst-itc-reconciliation',
    'gst-invoice-generator',
    'gst-liability-calculator',
    'gst-penalty-interest-calculator',
    'gst-rcm-calculator',
    'gst-r3b-auto-prep',
    'gst-r3b-deadline-calculator',
    'gst-rate-impact-analyzer',
    'gst-refund-checker',
    'gst-slab-calculator',
    'gst-slab-finder',
    'gst-turnover-tracker',
    'hsn-sac-finder',
    'itc-eligibility-checker',
    'rcm-applicability-checker',
    'reverse-gst-calculator'
];
const setString = `\nconst implementedSlugs = new Set([\n  '${implementedList.join("',\n  '")}'\n]);\n`;
content = content.replace(/const implementedSlugs = new Set\(\[[\s\S]*?\]\);/, setString);
content = content.replace(/const availableTools = gstTools;/, "const availableTools = gstTools.filter(tool => implementedSlugs.has(tool.slug));");
content = content.replace(/export default function GSTTools\(\) \{/, 'export default function GSTToolsClient() {');

// Fix lucide icon rendering crash
content = content.replace(/<tool\.icon/g, "<tool.icon as any");
content = content.replace(/<categoryIcon\.icon/g, "<categoryIcon.icon as any");

fs.writeFileSync(destClientPath, content, 'utf8');

const pageContent = `import { Metadata } from 'next';
import GSTToolsClient from './GSTToolsClient';

export const metadata: Metadata = {
  title: 'GST Tools Hub | MoneyCal',
  description: 'Explore our comprehensive suite of GST calculators and compliance tools.',
  alternates: { canonical: 'https://moneycal.in/gst-tools' }
};

export default function GSTToolsPage() {
  return <GSTToolsClient />;
}
`;

fs.writeFileSync(destPagePath, pageContent, 'utf8');
console.log('Restored GSTTools Hub!');
