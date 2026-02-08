/**
 * Central search index for MoneyCal – calculators, tools, pages.
 * Used by home page search and SEO internal linking.
 */
import { calculatorCategories } from './calculatorData';

export type SearchItemType = 'calculator' | 'tool' | 'page';

export interface SearchItem {
  name: string;
  path: string;
  category: string;
  keywords: string;
  description?: string;
  type: SearchItemType;
}

// Tool hubs and main pages – keyword-rich for search
const TOOL_HUBS: Omit<SearchItem, 'type'>[] = [
  { name: 'Tax Tools', path: '/tax-tools', category: 'Tools', keywords: 'income tax TDS GST capital gains tax saving section 80C 80D advance tax calculator India' },
  { name: 'Gold Tools', path: '/gold-tools', category: 'Tools', keywords: 'gold calculator gold loan gold price gold investment India' },
  { name: 'GST Tools', path: '/gst-tools', category: 'Tools', keywords: 'GST calculator GST return HSN SAC invoice India' },
  { name: 'Finance Tools', path: '/finance-tools', category: 'Tools', keywords: 'SIP mutual fund FD PPF NPS calculator investment India' },
  { name: 'Excel Tools', path: '/excel-tools', category: 'Tools', keywords: 'Excel financial template budget calculator spreadsheet India' },
  { name: 'Bank Tools', path: '/bank-tools', category: 'Tools', keywords: 'bank IFSC ATM interest rate savings FD India' },
  { name: 'Loan Tools', path: '/loan-tools', category: 'Tools', keywords: 'loan EMI home loan personal loan car loan calculator India' },
  { name: 'Insurance Tools', path: '/insurance-tools', category: 'Tools', keywords: 'insurance term life health premium calculator India' },
  { name: 'Festival Tools', path: '/festival-tools', category: 'Tools', keywords: 'festival date calendar Diwali Holi Chhath panchang India' },
  { name: 'Invoicing Tools', path: '/invoicing-tools', category: 'Tools', keywords: 'invoice GST bill generator India' },
  { name: 'Corporate Finance Tools', path: '/corporate-finance', category: 'Tools', keywords: 'corporate finance business valuation CFO tools' },
  { name: 'All Tools', path: '/tools', category: 'Tools', keywords: 'all calculators tools finance tax gold GST loan insurance' },
];

const MAIN_PAGES: Omit<SearchItem, 'type'>[] = [
  { name: 'Calculators', path: '/calculators', category: 'Calculators', keywords: 'EMI SIP tax PPF FD loan calculator India' },
  { name: 'Learn Finance', path: '/learn', category: 'Learn', keywords: 'learn finance loans credit card investment personal finance India' },
  { name: 'Blog', path: '/blog', category: 'Blog', keywords: 'financial blog articles tips investment tax India' },
  { name: 'News', path: '/news', category: 'News', keywords: 'financial news market IPO business economy India' },
  { name: 'Government Schemes', path: '/government-schemes', category: 'Schemes', keywords: 'government scheme PMAY subsidy India' },
  { name: 'Crypto', path: '/crypto', category: 'Crypto', keywords: 'crypto cryptocurrency bitcoin India' },
  { name: 'Astro Finance', path: '/astro-finance', category: 'Astro', keywords: 'astro finance horoscope zodiac money' },
];

/** Build static search items (calculators + tool hubs + main pages) */
export function getStaticSearchItems(): SearchItem[] {
  const calculators: SearchItem[] = calculatorCategories.flatMap((cat) =>
    cat.calculators.map((calc) => ({
      name: calc.name,
      path: `/calculators/${calc.id}`,
      category: cat.name,
      keywords: (calc.keywords || []).join(' '),
      description: calc.description,
      type: 'calculator' as SearchItemType,
    }))
  );
  const tools: SearchItem[] = TOOL_HUBS.map((t) => ({ ...t, type: 'tool' as SearchItemType }));
  const pages: SearchItem[] = MAIN_PAGES.map((p) => ({ ...p, type: 'page' as SearchItemType }));
  return [...calculators, ...tools, ...pages];
}

/** Search across static items by query */
export function searchStatic(query: string, limit = 20): SearchItem[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  const items = getStaticSearchItems();
  return items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    )
    .slice(0, limit);
}
