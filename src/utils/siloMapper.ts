/**
 * Silo Mapper - Defines the semantic relationships between News Categories and Calculators.
 * This helps in creating "Semantic Silos" for SEO, where topical authority is shared.
 */

export interface SiloMapping {
  newsCategory: string;
  calculatorIds: string[];
  calculatorCategory?: string;
}

export const siloMappings: SiloMapping[] = [
  {
    newsCategory: 'markets',
    calculatorIds: ['sip-calculator', 'mutual-fund-returns-calculator', 'lumpsum-calculator', 'margin-trading-calculator', 'step-up-sip-calculator', 'liquid-fund-calculator'],
    calculatorCategory: 'Investment Calculators'
  },
  {
    newsCategory: 'economy',
    calculatorIds: ['income-tax-calculator', 'inflation-calculator', 'gst-calculator', 'advance-tax-calculator'],
    calculatorCategory: 'Tax Calculators'
  },
  {
    newsCategory: 'personal-finance',
    calculatorIds: ['emi-calculator', 'home-loan-calculator', 'sip-calculator', 'liquid-fund-calculator', 'retirement-calculator', 'ppf-calculator', 'personal-loan-calculator', 'debt-payoff-calculator', 'budget-calculator'],
    calculatorCategory: 'Personal Finance'
  },
  {
    newsCategory: 'business',
    calculatorIds: ['gst-calculator', 'profit-margin-calculator', 'break-even-calculator', 'business-loan-calculator'],
    calculatorCategory: 'Business Calculators'
  },
  {
    newsCategory: 'ipo',
    calculatorIds: ['sip-calculator', 'lumpsum-calculator', 'capital-gains-tax-calculator'], // Added general investment tools for IPO readers
    calculatorCategory: 'Investment Calculators'
  },
  {
    newsCategory: 'startups',
    calculatorIds: ['break-even-calculator', 'profit-margin-calculator', 'business-loan-calculator'],
    calculatorCategory: 'Business Calculators'
  },
  {
    newsCategory: 'global',
    calculatorIds: ['currency-converter', 'inflation-calculator', 'gold-investment-calculator'],
    calculatorCategory: 'Banking & Finance Tools'
  }
];

/**
 * Gets the related calculator IDs for a given news category.
 * If no specific mapping is found, returns a default set of popular tools.
 */
export const getRelatedCalculatorsForCategory = (category: string): string[] => {
  const mapping = siloMappings.find(m => m.newsCategory === category);
  if (mapping) return mapping.calculatorIds;
  
  // Default general tools
  return ['sip-calculator', 'emi-calculator', 'income-tax-calculator', 'gst-calculator'];
};

/**
 * Gets the related news category for a given calculator ID (by checking mappings).
 */
export const getNewsCategoryForCalculator = (calculatorId: string): string | undefined => {
  const mapping = siloMappings.find(m => m.calculatorIds.includes(calculatorId));
  return mapping?.newsCategory;
};
