/**
 * Phase 6: Complete Route Fix, SEO, and Cleanup Script
 * Handles: missing index routes, missing SEO routes, react-helmet cleanup, dead code removal
 */
const fs = require('fs');
const path = require('path');

const PROJECT = path.join(__dirname, '..');
const APP = path.join(PROJECT, 'src', 'app');

// ─── 1. Create Missing Index Routes ───────────────────────────────────────
const indexRoutes = [
  {
    dir: 'ipo',
    title: 'IPO Dashboard 2026 - Upcoming IPOs, GMP, Allotment Status | MoneyCal',
    description: 'Track upcoming IPOs, Grey Market Premium (GMP), allotment status, listing date predictions. Real-time IPO dashboard for Indian stock market investors.',
    keywords: 'IPO 2026, upcoming IPO, IPO GMP today, IPO allotment status, IPO listing date, mainboard IPO, SME IPO, IPO grey market premium',
    canonical: '/ipo',
    clientDir: 'ipo-hub',
    clientFile: 'IpoHubClient'
  },
  {
    dir: 'news',
    title: 'Finance News India - Stock Market, Economy & Business News | MoneyCal',
    description: 'Latest finance news India - stock market updates, economy news, business news, RBI policy, budget updates, mutual fund news & more.',
    keywords: 'finance news India, stock market news, economy news, business news India, RBI news, budget 2026, mutual fund news',
    canonical: '/news',
    clientDir: 'news-home-page-revamped',
    clientFile: 'NewsHomePageRevampedClient'
  },
  {
    dir: 'learn',
    title: 'Learn Finance Free - Personal Finance Courses in Hindi & English | MoneyCal',
    description: 'Free financial literacy courses - learn about loans, investing, taxation, credit score, insurance, mutual funds & more in Hindi & English.',
    keywords: 'learn finance free, financial literacy India, personal finance course Hindi, loan basics, investing course, tax guide India',
    canonical: '/learn',
    clientDir: null, // Will use a hub component inline
    clientFile: null,
    isHub: true,
    hubType: 'learn'
  },
  {
    dir: 'games',
    title: 'Finance Games - Learn Money Management Through Fun Games | MoneyCal',
    description: 'Play free finance games - Stock Simulator, Budget Challenge, Millionaire Quiz, Finance Wordle & more. Learn money management through gaming.',
    keywords: 'finance games, money games, stock simulator game, budget challenge, financial literacy games, millionaire quiz',
    canonical: '/games',
    clientDir: 'games-hub',
    clientFile: 'GamesHubClient'
  },
  {
    dir: 'gold',
    title: 'Gold Investment Tools - Gold Rate, Calculator & Analysis | MoneyCal',
    description: 'Gold investment tools - check gold rate today, gold price calculator, gold loan calculator, jewellery price estimator & investment analysis.',
    keywords: 'gold rate today, gold price India, gold investment, gold calculator, gold loan, 22K gold rate, 24K gold rate',
    canonical: '/gold',
    clientDir: null,
    redirect: '/market/market-rates-hub'
  },
  {
    dir: 'gst',
    title: 'GST Tools India - GST Calculator, GSTR Filing & Compliance | MoneyCal',
    description: 'Free GST tools - GST calculator, GSTR-1 deadline tracker, GST invoice generator, HSN code finder & compliance tools for Indian businesses.',
    keywords: 'GST calculator, GSTR-1, GST filing, GST tools, HSN code, GST invoice, GST compliance India',
    canonical: '/gst',
    clientDir: null,
    redirect: '/gst-tools'
  },
  {
    dir: 'insurance',
    title: 'Insurance Tools & Guides - Compare Plans & Calculate Premium | MoneyCal',
    description: 'Free insurance tools - compare health insurance, life insurance, term insurance plans. Premium calculator, claim guide & expert advice.',
    keywords: 'insurance calculator, health insurance comparison, term insurance, life insurance India, insurance premium calculator',
    canonical: '/insurance',
    clientDir: null,
    redirect: '/insurance-tools'
  },
  {
    dir: 'market',
    title: 'Market Rates Today - Gold, Silver, Forex & Commodity Prices | MoneyCal',
    description: 'Live market rates - gold rate today, silver rate today, forex rates, commodity prices. City-wise gold rates & historical price charts.',
    keywords: 'gold rate today, silver rate today, market rates India, commodity prices, forex rates India',
    canonical: '/market',
    clientDir: 'market-rates-hub',
    clientFile: 'MarketRatesHubClient'
  },
  {
    dir: 'stamp-duty',
    title: 'Stamp Duty Calculator India - State-wise Rates & Registration Charges | MoneyCal',
    description: 'Calculate stamp duty & registration charges for property in all Indian states. State-wise stamp duty rates, exemptions & guide.',
    keywords: 'stamp duty calculator, registration charges, stamp duty rates India, property registration, stamp duty Maharashtra, stamp duty Delhi',
    canonical: '/stamp-duty',
    clientDir: null,
    redirect: '/calculators/stamp-duty-calculator'
  },
  {
    dir: 'corporate',
    title: 'Corporate Finance Tools - Business Calculators & Analysis | MoneyCal',
    description: 'Corporate finance tools - ROI calculator, break-even analysis, cash flow tools, business valuation & corporate tax calculators.',
    keywords: 'corporate finance tools, ROI calculator, break-even calculator, business valuation, corporate tax calculator India',
    canonical: '/corporate',
    clientDir: null,
    redirect: '/corporate-finance'
  },
  {
    dir: 'festival',
    title: 'Festival Finance Guide - Festival Shopping, Budget & Planning | MoneyCal',
    description: 'Festival finance tips - Diwali budget planner, festival shopping deals, muhurat trading guide, festival loan offers & savings tips.',
    keywords: 'festival finance, Diwali budget, festival shopping tips, muhurat trading, festival offers India',
    canonical: '/festival',
    clientDir: null,
    redirect: '/festival-tools'
  },
  {
    dir: 'gk',
    title: 'Financial GK - Finance General Knowledge Quiz & Learning | MoneyCal',
    description: 'Test your financial knowledge - banking GK, economy quiz, finance general knowledge, competitive exam preparation for banking & finance.',
    keywords: 'financial GK, banking GK quiz, economy general knowledge, finance quiz, banking exam preparation',
    canonical: '/gk',
    clientDir: null,
    redirect: '/moneycal-gk'
  },
  {
    dir: 'invoicing-tools',
    title: 'Free Invoice Generator & Billing Tools India | MoneyCal',
    description: 'Free online invoice generator, GST invoice maker, billing tools for Indian freelancers & small businesses. Download PDF invoices instantly.',
    keywords: 'invoice generator free, GST invoice maker, billing software India, free invoice template, online invoice generator',
    canonical: '/invoicing-tools',
    clientDir: null,
    redirect: '/invoice-generator-business'
  },
  {
    dir: 'loan-tools',
    title: 'Loan Tools - EMI Calculator, Eligibility Checker & Comparison | MoneyCal',
    description: 'Free loan tools - EMI calculator, loan eligibility checker, loan comparison tool, prepayment calculator & interest rate comparison.',
    keywords: 'loan calculator, EMI calculator, loan eligibility, loan comparison, home loan calculator, personal loan calculator India',
    canonical: '/loan-tools',
    clientDir: null,
    isHub: true,
    hubType: 'loan-tools'
  },
  {
    dir: 'personal-finance',
    title: 'Personal Finance Hub - Budgeting, Savings & Money Management | MoneyCal',
    description: 'Personal finance tools & guides - budget planner, expense tracker, savings calculator, net worth calculator, financial planning India.',
    keywords: 'personal finance India, budget planner, expense tracker, savings calculator, money management, financial planning',
    canonical: '/personal-finance',
    clientDir: null,
    redirect: '/personal-finance-management'
  },
  {
    dir: 'religious',
    title: 'Religious & Traditional Finance Tools - Muhurat, Panchang & More | MoneyCal',
    description: 'Traditional finance tools - muhurat calculator, panchang, auspicious dates for investment, religious finance calculators & astro finance.',
    keywords: 'muhurat calculator, panchang, auspicious investment dates, astro finance, religious finance tools India',
    canonical: '/religious',
    clientDir: null,
    redirect: '/religious-traditional-tools'
  }
];

let created = 0;

for (const route of indexRoutes) {
  const dir = path.join(APP, route.dir);
  const pagePath = path.join(dir, 'page.tsx');

  if (fs.existsSync(pagePath)) {
    console.log(`  SKIP ${route.dir}/page.tsx (already exists)`);
    continue;
  }

  // Ensure directory exists
  fs.mkdirSync(dir, { recursive: true });

  let content;

  if (route.redirect) {
    // Redirect page
    content = `import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${route.title.replace(/'/g, "\\'")}',
  description: '${route.description.replace(/'/g, "\\'")}',
  keywords: '${route.keywords}',
  alternates: { canonical: 'https://moneycal.in${route.canonical}' }
};

export default function Page() {
  redirect('${route.redirect}');
}
`;
  } else if (route.clientDir) {
    // Render existing client component
    content = `import React from 'react';
import { Metadata } from 'next';
import ClientComponent from './${route.clientDir}/${route.clientFile}';

export const metadata: Metadata = {
  title: '${route.title.replace(/'/g, "\\'")}',
  description: '${route.description.replace(/'/g, "\\'")}',
  keywords: '${route.keywords}',
  alternates: { canonical: 'https://moneycal.in${route.canonical}' }
};

export default function Page() {
  return <ClientComponent />;
}
`;
  } else if (route.isHub && route.hubType === 'learn') {
    content = `import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${route.title.replace(/'/g, "\\'")}',
  description: '${route.description.replace(/'/g, "\\'")}',
  keywords: '${route.keywords}',
  alternates: { canonical: 'https://moneycal.in${route.canonical}' }
};

const LEARN_CATEGORIES = [
  { name: 'Personal Loans', slug: 'personal-loans', desc: 'Everything about personal loans - eligibility, interest rates, EMI & more', icon: '💰' },
  { name: 'Home Loans', slug: 'home-loans', desc: 'Home loan guide - rates, eligibility, tax benefits & tips', icon: '🏠' },
  { name: 'Credit Score', slug: 'credit-score', desc: 'Improve your CIBIL score - tips, factors & monitoring', icon: '📊' },
  { name: 'Credit Cards', slug: 'credit-cards', desc: 'Best credit cards, rewards, cashback & management tips', icon: '💳' },
  { name: 'Education Loans', slug: 'education-loans', desc: 'Education loan guide - abroad & India, interest rates', icon: '🎓' },
  { name: 'Investing & Wealth', slug: 'investing', desc: 'Mutual funds, SIP, stocks & wealth building strategies', icon: '📈' },
  { name: 'Savings Bank', slug: 'savings-bank', desc: 'Best savings accounts, FD, RD rates & banking tips', icon: '🏦' },
  { name: 'Insurance', slug: 'insurance', desc: 'Health, life & term insurance - comparison & guide', icon: '🛡️' },
  { name: 'Taxation', slug: 'taxation', desc: 'Income tax, GST, TDS - filing guide & saving tips', icon: '📋' },
  { name: 'Gold Loans', slug: 'gold-loans', desc: 'Gold loan guide - rates, eligibility & best banks', icon: '🥇' },
  { name: 'Vehicle Loans', slug: 'vehicle-loans', desc: 'Car & bike loan guide - EMI, rates & comparison', icon: '🚗' },
  { name: 'Business Loans', slug: 'business-loans', desc: 'MSME & business loans - eligibility & application', icon: '🏢' },
  { name: 'Money Management', slug: 'money-management', desc: 'Budgeting, saving & managing money effectively', icon: '💵' },
];

export default function LearnHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">📚 FREE COURSES</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Learn Finance — Free</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Master personal finance with our comprehensive courses in Hindi & English. From loans to investing — learn everything for free.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARN_CATEGORIES.map(cat => (
            <Link key={cat.slug} href={\`/learn/\${cat.slug}\`} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 p-6">
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors mb-2">{cat.name}</h2>
              <p className="text-sm text-gray-500">{cat.desc}</p>
              <div className="mt-4 text-violet-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">Start Learning →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
`;
  } else if (route.isHub && route.hubType === 'loan-tools') {
    content = `import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${route.title.replace(/'/g, "\\'")}',
  description: '${route.description.replace(/'/g, "\\'")}',
  keywords: '${route.keywords}',
  alternates: { canonical: 'https://moneycal.in${route.canonical}' }
};

const LOAN_TOOLS = [
  { name: 'EMI Calculator', slug: 'emi-calculator', desc: 'Calculate monthly EMI for any loan', icon: '💰' },
  { name: 'Home Loan Calculator', slug: 'home-loan-calculator', desc: 'Home loan EMI & eligibility', icon: '🏠' },
  { name: 'Personal Loan Calculator', slug: 'personal-loan-calculator', desc: 'Personal loan EMI calculator', icon: '👤' },
  { name: 'Car Loan Calculator', slug: 'car-loan-calculator', desc: 'Car loan EMI & comparison', icon: '🚗' },
  { name: 'Education Loan Calculator', slug: 'education-loan-calculator', desc: 'Education loan planning', icon: '🎓' },
  { name: 'Loan Comparison', slug: 'loan-comparison-calculator', desc: 'Compare different loan offers', icon: '⚖️' },
  { name: 'Prepayment Calculator', slug: 'prepayment-calculator', desc: 'Loan prepayment savings', icon: '📉' },
  { name: 'Gold Loan EMI', slug: 'gold-loan-emi-calculator', desc: 'Gold loan EMI calculator', icon: '🥇' },
];

export default function LoanToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">🏦 LOAN TOOLS</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Loan Calculators & Tools</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Calculate EMI, compare loans, plan prepayment & more — all free.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {LOAN_TOOLS.map(tool => (
            <Link key={tool.slug} href={\`/calculators/\${tool.slug}\`} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 p-6">
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">{tool.name}</h2>
              <p className="text-sm text-gray-500">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
`;
  }

  fs.writeFileSync(pagePath, content);
  console.log(`  ✅ Created ${route.dir}/page.tsx`);
  created++;
}

console.log(`\n✅ Created ${created} missing index routes.\n`);

// ─── 2. Create Missing Critical SEO Routes ──────────────────────────────
const seoRoutes = [
  {
    dir: 'gold-rate',
    title: 'Gold Rate Today India - 22K & 24K Gold Price | MoneyCal',
    description: 'Check today\'s gold rate in India. 22K & 24K gold price per gram in Mumbai, Delhi, Bangalore, Chennai & all cities. Historical gold price chart & analysis.',
    keywords: 'gold rate today, gold price today India, 22K gold rate, 24K gold rate, gold rate Mumbai, gold rate Delhi, gold price per gram',
    canonical: '/gold-rate',
    clientDir: '../market/market-rates-hub',
    clientFile: 'MarketRatesHubClient'
  },
  {
    dir: 'silver-rate',
    title: 'Silver Rate Today India - Silver Price Per Gram & KG | MoneyCal',
    description: 'Check today\'s silver rate in India. Silver price per gram, per kg in all Indian cities. Historical silver price chart, analysis & investment guide.',
    keywords: 'silver rate today, silver price India, silver rate per gram, silver rate per kg, silver price today, silver investment',
    canonical: '/silver-rate',
    clientDir: '../market/market-rates-hub',
    clientFile: 'MarketRatesHubClient'
  },
  {
    dir: 'excel-tools',
    title: 'Free Excel Templates & Financial Spreadsheets India | MoneyCal',
    description: 'Download free Excel templates - budget tracker, EMI calculator, salary slip, invoice template, stock portfolio tracker & more financial spreadsheets.',
    keywords: 'free Excel templates, financial spreadsheet, budget tracker Excel, EMI calculator Excel, salary slip template, invoice template Excel',
    canonical: '/excel-tools',
    clientDir: '../excel-tools-page',
    clientFile: null,
    redirect: '/excel-tools-page'
  }
];

for (const route of seoRoutes) {
  const dir = path.join(APP, route.dir);
  const pagePath = path.join(dir, 'page.tsx');

  if (fs.existsSync(pagePath)) {
    console.log(`  SKIP ${route.dir}/page.tsx (already exists)`);
    continue;
  }

  fs.mkdirSync(dir, { recursive: true });

  let content;
  if (route.redirect) {
    content = `import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${route.title.replace(/'/g, "\\'")}',
  description: '${route.description.replace(/'/g, "\\'")}',
  keywords: '${route.keywords}',
  alternates: { canonical: 'https://moneycal.in${route.canonical}' }
};

export default function Page() {
  redirect('${route.redirect}');
}
`;
  } else {
    content = `import React from 'react';
import { Metadata } from 'next';
import ClientComponent from '${route.clientDir}/${route.clientFile}';

export const metadata: Metadata = {
  title: '${route.title.replace(/'/g, "\\'")}',
  description: '${route.description.replace(/'/g, "\\'")}',
  keywords: '${route.keywords}',
  alternates: { canonical: 'https://moneycal.in${route.canonical}' }
};

export default function Page() {
  return <ClientComponent />;
}
`;
  }

  fs.writeFileSync(pagePath, content);
  console.log(`  ✅ Created ${route.dir}/page.tsx`);
  created++;
}

console.log(`\n✅ Created critical SEO routes.\n`);

// ─── 3. Strip react-helmet imports from all .tsx files ──────────────────
function stripHelmet(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += stripHelmet(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('react-helmet')) {
        // Remove import lines
        const before = content;
        content = content.replace(/import\s+.*from\s+['"]react-helmet-async['"];?\s*\n?/g, '');
        content = content.replace(/import\s+.*from\s+['"]react-helmet['"];?\s*\n?/g, '');
        
        // Remove <Helmet>...</Helmet> blocks (single-line and multi-line)
        content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>\s*/g, '');
        content = content.replace(/<Helmet\s[^>]*\/>\s*/g, '');
        
        // Remove <HelmetProvider>...</HelmetProvider> wrapper
        content = content.replace(/<HelmetProvider>\s*/g, '');
        content = content.replace(/<\/HelmetProvider>\s*/g, '');
        
        if (content !== before) {
          fs.writeFileSync(fullPath, content);
          count++;
        }
      }
    }
  }
  return count;
}

const helmetStripped = stripHelmet(path.join(PROJECT, 'src'));
console.log(`✅ Stripped react-helmet from ${helmetStripped} files.\n`);

// ─── 4. Delete Dead Code ────────────────────────────────────────────────
const toDelete = [
  'src/fino',
  'src/components/SEOHelmet.tsx',
  'src/app/home-investopedia-backup-oct25-2025',
  'src/app/home-new-backup-mar01',
  'src/app/home-investopedia-new-oct25-2025',
  'scripts/fix-header.js',
  'scripts/fix-footer.js',
  'scripts/fix-links.js',
  'scripts/fix-header-labels.js',
  'scripts/bulk-migrate.js',
];

let deleted = 0;
for (const rel of toDelete) {
  const full = path.join(PROJECT, rel);
  if (fs.existsSync(full)) {
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      fs.rmSync(full, { recursive: true, force: true });
    } else {
      fs.unlinkSync(full);
    }
    console.log(`  🗑️  Deleted ${rel}`);
    deleted++;
  }
}
console.log(`\n✅ Deleted ${deleted} dead code items.\n`);

console.log('Phase 6 automation complete!');
