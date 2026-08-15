const fs = require('fs');
const path = require('path');

const hubsToPort = [
  { legacy: 'TaxToolsHub.tsx', route: 'tax-tools' },
  { legacy: 'FinanceTools.tsx', route: 'finance-tools' }, // Check if this exists, else skip
  { legacy: 'GSTTools.tsx', route: 'gst-tools' },
  { legacy: 'GoldTools.tsx', route: 'gold-tools' },
  { legacy: 'InsuranceTools.tsx', route: 'insurance-tools' },
  { legacy: 'LoanToolsHub.tsx', route: 'loan-tools' }, // Optional, will check if exists
  { legacy: 'StockMarketHub.tsx', route: 'stock-market' },
  { legacy: 'CorporateFinance.tsx', route: 'corporate-finance' }, // Let's check
];

hubsToPort.forEach(hub => {
  const legacyPath = path.join(__dirname, 'src/pages', hub.legacy);
  if (!fs.existsSync(legacyPath)) {
    console.log(`Skipping ${hub.legacy} - not found.`);
    return;
  }

  let content = fs.readFileSync(legacyPath, 'utf8');

  // Fix imports
  content = content.replace(/import SEOHelmet.*/g, '');
  content = content.replace(/<SEOHelmet[\s\S]*?\/>/g, '');
  content = content.replace(/\.\.\/components\//g, '@/components/');
  
  if (!content.includes('"use client"')) {
    content = '"use client";\n' + content;
  }

  // Create dir
  const appDirPath = path.join(__dirname, 'src/app', hub.route);
  fs.mkdirSync(appDirPath, { recursive: true });

  // Write client component
  const clientComponentName = `${hub.legacy.replace('.tsx', '')}Client.tsx`;
  fs.writeFileSync(path.join(appDirPath, clientComponentName), content);

  // Write server page
  const pageTsx = `import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './${clientComponentName}';

export const metadata: Metadata = {
  title: '${hub.route.replace('-', ' ').toUpperCase()} | MoneyCal',
  description: 'Explore the best financial tools and calculators for ${hub.route.replace('-', ' ')} in India.',
  alternates: {
    canonical: 'https://moneycal.in/${hub.route}'
  }
};

export default function HubPage() {
  return <ClientComponent />;
}
`;
  fs.writeFileSync(path.join(appDirPath, 'page.tsx'), pageTsx);
  console.log(`Successfully ported ${hub.legacy} to /${hub.route}`);
});
