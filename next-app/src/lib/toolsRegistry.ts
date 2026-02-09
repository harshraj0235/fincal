/**
 * Tools registry for server-side SEO content.
 * Maps tool slugs to title and description for /tools, /finance-tools, /tax-tools, etc.
 */

export interface ToolMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/** Override title/description for specific tools. Fallback: slugToTitle + generic description. */
const TOOL_OVERRIDES: Record<string, { title?: string; description: string }> = {
  'bank-returns-optimizer': { description: 'Optimize your bank FD and savings returns. Compare rates, tenures, and find the best options.' },
  'discount-profit-calculator': { description: 'Calculate discounts, profit margins, and markup. Essential for retail and e-commerce pricing.' },
  'emi-affordability-checker': { description: 'Check how much EMI you can afford based on income, existing obligations, and eligibility.' },
  'time-zone-converter': { description: 'Convert times across time zones. Useful for global teams and scheduling.' },
  'sip-delay-loss-calculator': { description: 'See how much you lose by delaying your SIP start. Time in market matters.' },
  'mutual-fund-expense-ratio-calculator': { description: 'Calculate the impact of expense ratio on your mutual fund returns over time.' },
  'income-tax-calculator': { description: 'Estimate income tax under old and new regime. Plan deductions and investments.' },
  'xirr-calculator': { description: 'Calculate XIRR for irregular investments and withdrawals. True returns on your portfolio.' },
  'old-vs-new-tax-regime-helper': { description: 'Compare old vs new tax regime. Find which regime saves you more tax.' },
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  tools: 'Free business and productivity tools. No sign-up required.',
  'finance-tools': 'Mutual fund analysis, SIP tools, portfolio calculators, and investment helpers.',
  'tax-tools': 'Income tax, TDS, capital gains, and tax planning tools for Indian users.',
  'gst-tools': 'GST calculators and compliance tools for businesses in India.',
  'insurance-tools': 'Insurance premium calculators and comparison tools.',
};

export function getToolMeta(category: string, slug: string): ToolMeta {
  const override = TOOL_OVERRIDES[slug];
  const title = override?.title ?? slugToTitle(slug);
  const desc = override?.description ?? CATEGORY_DESCRIPTIONS[category] ?? 'Free online tool for financial planning.';
  return { slug, title, description: desc, category };
}

export function getCategoryDescription(category: string): string {
  return CATEGORY_DESCRIPTIONS[category] ?? 'Free online tools for India.';
}
