const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../src/app');

// Hubs that need dynamic catch-all routing
const hubs = [
  { dir: 'finance-tools', name: 'Finance Tool' },
  { dir: 'gst-tools', name: 'GST Tool' },
  { dir: 'gold-tools', name: 'Gold Tool' },
  { dir: 'tax-tools', name: 'Tax Tool' },
  { dir: 'insurance-tools', name: 'Insurance Tool' },
  { dir: 'corporate-finance', name: 'Corporate Finance Tool' },
  { dir: 'loan-tools', name: 'Loan Tool' },
  { dir: 'bank-tools', name: 'Banking Tool' },
  { dir: 'invoice-generator-business', name: 'Business Tool' },
  { dir: 'festival-tools', name: 'Festival Tool' }
];

function formatSlug(slugs) {
  if (!slugs || slugs.length === 0) return '';
  const lastSlug = slugs[slugs.length - 1];
  return lastSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

for (const hub of hubs) {
  const hubPath = path.join(appDir, hub.dir);
  
  if (!fs.existsSync(hubPath)) {
    console.log(`Skipping ${hub.dir} (not found)`);
    continue;
  }
  
  const catchAllPath = path.join(hubPath, '[...slug]');
  if (!fs.existsSync(catchAllPath)) {
    fs.mkdirSync(catchAllPath, { recursive: true });
  }
  
  const pageTsxPath = path.join(catchAllPath, 'page.tsx');
  
  const content = `import React from 'react';
import { Metadata } from 'next';
import ToolPlaceholderClient from '@/app/tools/tool-placeholder/ToolPlaceholderClient';

type Props = {
  params: { slug: string[] }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugArray = params.slug || [];
  const lastSlug = slugArray[slugArray.length - 1] || 'Tool';
  const formattedTitle = lastSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: \`\${formattedTitle} | MoneyCal India\`,
    description: \`Use our free \${formattedTitle} online. \${hub.name} provided by MoneyCal for fast, accurate results.\`,
    alternates: {
      canonical: \`https://moneycal.in/${hub.dir}/\${slugArray.join('/')}\`
    }
  };
}

export default function DynamicHubToolPage({ params }: Props) {
  const slugArray = params.slug || [];
  const lastSlug = slugArray[slugArray.length - 1] || 'Tool';
  const formattedTitle = lastSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <>
      <ToolPlaceholderClient />
      {/* We pass the formattedTitle as a hidden SEO element or modify ToolPlaceholderClient later to accept it */}
      <h1 className="sr-only">{formattedTitle} - ${hub.name}</h1>
    </>
  );
}
`;

  fs.writeFileSync(pageTsxPath, content, 'utf8');
  console.log(`✅ Created catch-all route for ${hub.dir}`);
}

console.log("Finished generating all dynamic hub routes.");
