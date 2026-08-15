const fs = require('fs');
const path = require('path');

// 1. Create the Client Component for ToolsHub
let hubContent = fs.readFileSync('src/pages/ToolsHub.tsx', 'utf8');

// Fix imports for components (since it was in src/pages and is moving to src/app/tools)
hubContent = hubContent.replace(/import SEOHelmet.*/g, '');
hubContent = hubContent.replace(/<SEOHelmet[\s\S]*?\/>/g, '');
hubContent = hubContent.replace(/\.\.\/components\//g, '@/components/');

fs.mkdirSync('src/app/tools', { recursive: true });
fs.writeFileSync('src/app/tools/ToolsHubClient.tsx', hubContent);

// 2. Create the Server Component (page.tsx)
const pageTsx = `import React from 'react';
import { Metadata } from 'next';
import ToolsHubClient from './ToolsHubClient';

export const metadata: Metadata = {
  title: '200+ Free Financial Tools & Calculators | MoneyCal',
  description: 'Explore India\\'s largest collection of free financial calculators. SIP, EMI, Income Tax, PPF, NPS, GST, and more.',
  alternates: {
    canonical: 'https://moneycal.in/tools'
  }
};

export default function ToolsHubPage() {
  return <ToolsHubClient />;
}
`;

fs.writeFileSync('src/app/tools/page.tsx', pageTsx);

// 3. Make /calculators the exact same as /tools (Redirect or exact copy)
fs.mkdirSync('src/app/calculators', { recursive: true });
const calcPageTsx = `import React from 'react';
import { Metadata } from 'next';
import ToolsHubClient from '../tools/ToolsHubClient';

export const metadata: Metadata = {
  title: 'Free Financial Calculators India | MoneyCal',
  description: 'Use our free SIP calculator, EMI calculator, Income Tax calculator, PPF, NPS and 200+ other calculators.',
  alternates: {
    canonical: 'https://moneycal.in/calculators'
  }
};

export default function CalculatorsHubPage() {
  return <ToolsHubClient />;
}
`;
fs.writeFileSync('src/app/calculators/page.tsx', calcPageTsx);

console.log('Successfully created /tools and /calculators hubs in App Router!');
