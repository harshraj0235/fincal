/**
 * Shared data for home page (used by both React and Svelte home).
 */
import { calculatorCategories as calcCategories } from './calculatorData';
import { blogPosts as blogPosts0 } from './blogData';
import { blogPosts as blogPosts1 } from './blogData1';

export interface SearchItem {
  name: string;
  path: string;
  category: string;
  keywords: string;
  description: string;
}

export function buildSearchDatabase(): SearchItem[] {
  const calculators = calcCategories.flatMap((category) =>
    category.calculators.map((calc) => ({
      name: calc.name,
      path: `/calculators/${calc.id}`,
      category: category.name,
      keywords: calc.keywords.join(' '),
      description: calc.description,
    }))
  );
  const blogs = [
    ...blogPosts0.slice(0, 20).map((post) => ({
      name: post.title,
      path: `/blog/${post.slug}`,
      category: 'Blog',
      keywords: post.categories?.join(' ') || '',
      description: post.excerpt || '',
    })),
    ...blogPosts1.slice(0, 20).map((post) => ({
      name: post.title,
      path: `/blog/${post.slug}`,
      category: 'Blog',
      keywords: post.categories?.join(' ') || '',
      description: post.excerpt || '',
    })),
  ];
  return [...calculators, ...blogs];
}

export const calculatorCategories = calcCategories;
export const totalCalculators = calcCategories.reduce((s, c) => s + c.calculators.length, 0);

export const popularCalculators = [
  { id: 'emi-calculator', name: 'EMI', path: '/calculators/emi-calculator' },
  { id: 'sip-calculator', name: 'SIP', path: '/calculators/sip-calculator' },
  { id: 'income-tax-calculator', name: 'Income Tax', path: '/calculators/income-tax-calculator' },
  { id: 'gst-calculator', name: 'GST', path: '/calculators/gst-calculator' },
  { id: 'ppf-calculator', name: 'PPF', path: '/calculators/ppf-calculator' },
  { id: 'home-loan-calculator', name: 'Home Loan', path: '/calculators/home-loan-calculator' },
  { id: 'fd-calculator', name: 'FD', path: '/calculators/fd-calculator' },
  { id: 'retirement-calculator', name: 'Retirement', path: '/calculators/retirement-calculator' },
];

export const toolsList = [
  { name: 'Finance Tools', path: '/finance-tools', count: '25+' },
  { name: 'Tax Tools', path: '/tax-tools', count: '40+' },
  { name: 'GST Tools', path: '/gst-tools', count: '20+' },
  { name: 'Excel Tools', path: '/excel-tools', count: '50+' },
  { name: 'Bank Tools', path: '/bank-tools', count: '10+' },
  { name: 'Loan Tools', path: '/loan-tools', count: '15+' },
  { name: 'Insurance Tools', path: '/insurance-tools', count: '8+' },
  { name: 'Gold Tools', path: '/gold-tools', count: '5+' },
  { name: 'Invoicing Tools', path: '/invoicing-tools', count: '12+' },
  { name: 'Festival Tools', path: '/festival-tools', count: '10+' },
  { name: 'Corporate Tools', path: '/corporate-finance', count: '20+' },
  { name: 'All Tools', path: '/tools', count: '200+' },
];

export const resourcesList = [
  { name: 'Learn', path: '/learn', count: '40+' },
  { name: 'Blog', path: '/blog', count: '150+' },
  { name: 'News', path: '/news', count: '100+' },
  { name: 'Govt Schemes', path: '/government-schemes', count: '50+' },
  { name: 'Crypto', path: '/crypto', count: '30+' },
  { name: 'Astro Finance', path: '/astro-finance', count: '13+' },
  { name: 'Festival', path: '/festival-tools', count: '25+' },
  { name: 'Corporate', path: '/corporate-finance', count: '15+' },
  { name: 'Personal Finance', path: '/personal-finance-management', count: '20+' },
  { name: 'Religious', path: '/religious-tools', count: '10+' },
];
