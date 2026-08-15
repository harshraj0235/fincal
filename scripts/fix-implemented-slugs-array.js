const fs = require('fs');
const path = require('path');

const clientPath = path.join(__dirname, '../src/app/gst-tools/GSTToolsClient.tsx');
let content = fs.readFileSync(clientPath, 'utf8');

// The clean slugs that actually have physical Next.js pages implemented:
const implementedList = [
    'composition-scheme-checker',
    'gst-amount-calculator',
    'gst-calculator',
    'gst-composition-eligibility',
    'gst-due-date-tracker',
    'gst-e-invoice-qr-validator',
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

const setString = `const implementedSlugs = new Set([\n  '${implementedList.join("',\n  '")}'\n]);`;

// Replace the existing implementedSlugs block with the CORRECT one that matches the Next.js folders
content = content.replace(/const implementedSlugs = new Set\(\[[\s\S]*?\]\);/, setString);

fs.writeFileSync(clientPath, content, 'utf8');
console.log('Fixed implementedSlugs in GSTToolsClient.tsx with exact physical Next.js routes');
