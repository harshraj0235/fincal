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

// Re-add the implementedSlugs Set
const setString = `\nconst implementedSlugs = new Set([\n  '${implementedList.join("',\n  '")}'\n]);\n`;

// Find where to inject it (before the component definition)
if (!content.includes('const implementedSlugs = new Set')) {
    content = content.replace(/export default function GSTToolsHubClient\(\) \{/, `${setString}\nexport default function GSTToolsHubClient() {`);
    content = content.replace(/export default function HubPageClient\(\) \{/, `${setString}\nexport default function HubPageClient() {`);
    content = content.replace(/export default function GSTToolsClient\(\) \{/, `${setString}\nexport default function GSTToolsClient() {`);
}

// Re-add the filter logic that I removed earlier!
content = content.replace(/const availableTools = gstTools;/, "const availableTools = gstTools.filter(tool => implementedSlugs.has(tool.slug));");

fs.writeFileSync(clientPath, content, 'utf8');
console.log('Restored implementedSlugs filter in GSTToolsClient.tsx');
