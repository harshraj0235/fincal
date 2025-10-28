/**
 * Internal Linking Utility System
 * Smart suggestions for related calculators and articles
 * Boosts SEO through proper internal link structure
 */

import { getAllCalculators } from '../data/calculatorData';

// Calculator-to-Article topic mapping
export const calculatorArticleMapping: Record<string, string[]> = {
  // LOAN CALCULATORS
  'emi-calculator': ['markets/rbi-rate-decision', 'personal-finance/home-loan-guide', 'personal-finance/loan-planning'],
  'home-loan-calculator': ['economy-policy/budget-housing', 'personal-finance/property-investment', 'personal-finance/tax-benefits-home-loan'],
  'personal-loan-calculator': ['personal-finance/debt-management', 'personal-finance/credit-score-guide', 'fintech/personal-loan-apps'],
  'car-loan-calculator': ['personal-finance/vehicle-finance', 'markets/auto-sector-analysis', 'personal-finance/emi-planning'],
  
  // INVESTMENT CALCULATORS
  'sip-calculator': ['personal-finance/wealth-building-sip', 'markets/mutual-fund-analysis', 'personal-finance/retirement-corpus'],
  'mutual-fund-returns-calculator': ['personal-finance/mutual-fund-guide', 'markets/fund-performance', 'personal-finance/tax-on-gains'],
  'ppf-calculator': ['personal-finance/tax-saving-investments', 'economy-policy/small-savings-rates', 'personal-finance/retirement-planning'],
  'nps-calculator': ['personal-finance/pension-planning', 'economy-policy/nps-policy-updates', 'personal-finance/retirement-strategies'],
  
  // TAX CALCULATORS
  'income-tax-calculator': ['economy-policy/budget-tax-changes', 'personal-finance/tax-planning', 'personal-finance/old-vs-new-regime'],
  'gst-calculator': ['startups/gst-compliance-msme', 'economy-policy/gst-updates', 'personal-finance/business-taxation'],
  'capital-gains-tax-calculator': ['markets/equity-taxation', 'personal-finance/investment-tax-planning', 'markets/ltcg-stcg-guide'],
  
  // RETIREMENT CALCULATORS
  'retirement-calculator': ['personal-finance/retirement-corpus-planning', 'personal-finance/pension-schemes-comparison', 'personal-finance/post-retirement-income'],
  'pension-calculator': ['economy-policy/pension-reforms', 'personal-finance/eps-vs-nps', 'personal-finance/senior-citizen-benefits'],
  
  // BUSINESS CALCULATORS
  'break-even-calculator': ['startups/business-planning', 'startups/startup-finance', 'analysis-opinion/business-viability'],
  'profit-margin-calculator': ['startups/pricing-strategy', 'analysis-opinion/sector-margins', 'regional/msme-profitability'],
  
  // PROPERTY CALCULATORS
  'stamp-duty-calculator': ['personal-finance/property-registration', 'regional/state-stamp-duty', 'economy-policy/real-estate-policy'],
  'rent-vs-buy-calculator': ['personal-finance/property-investment', 'markets/real-estate-analysis', 'personal-finance/housing-decision']
};

// Article topic keywords to calculator mapping
export const topicToCalculatorMapping: Record<string, string[]> = {
  // Keywords → Suggested Calculators
  'emi': ['emi-calculator', 'home-loan-calculator', 'car-loan-calculator'],
  'loan': ['personal-loan-calculator', 'home-loan-calculator', 'loan-comparison-calculator'],
  'sip': ['sip-calculator', 'step-up-sip-calculator', 'mutual-fund-returns-calculator'],
  'mutual fund': ['sip-calculator', 'mutual-fund-returns-calculator', 'mutual-fund-cost-calculator'],
  'tax': ['income-tax-calculator', 'gst-calculator', 'capital-gains-tax-calculator'],
  'retirement': ['retirement-calculator', 'pension-calculator', 'nps-calculator'],
  'investment': ['sip-calculator', 'compound-interest-calculator', 'future-value-calculator'],
  'home': ['home-loan-calculator', 'stamp-duty-calculator', 'rent-vs-buy-calculator'],
  'business': ['break-even-calculator', 'profit-margin-calculator', 'gst-calculator'],
  'gst': ['gst-calculator', 'gst-seller-calculator'],
  'ppf': ['ppf-calculator', 'tax-saving-investment-calculator'],
  'nps': ['nps-calculator', 'retirement-calculator'],
  'property': ['stamp-duty-calculator', 'property-investment-calculator', 'rent-vs-buy-calculator'],
  'insurance': ['term-insurance-calculator', 'health-insurance-calculator'],
  'gold': ['gold-investment-calculator', 'gold-loan-calculator']
};

/**
 * Get suggested calculators based on article content
 */
export const getSuggestedCalculators = (
  articleContent: string,
  categorySlug: string,
  limit: number = 3
): string[] => {
  const contentLower = articleContent.toLowerCase();
  const suggestions = new Set<string>();

  // Check topic keywords
  Object.entries(topicToCalculatorMapping).forEach(([keyword, calculators]) => {
    if (contentLower.includes(keyword)) {
      calculators.forEach(calc => suggestions.add(calc));
    }
  });

  // Category-specific suggestions
  if (categorySlug.includes('personal-finance')) {
    ['sip-calculator', 'income-tax-calculator', 'retirement-calculator'].forEach(c => suggestions.add(c));
  } else if (categorySlug.includes('markets')) {
    ['sip-calculator', 'brokerage-calculator', 'mutual-fund-returns-calculator'].forEach(c => suggestions.add(c));
  } else if (categorySlug.includes('startups')) {
    ['break-even-calculator', 'business-loan-calculator', 'gst-calculator'].forEach(c => suggestions.add(c));
  }

  return Array.from(suggestions).slice(0, limit);
};

/**
 * Get related articles based on category and tags
 */
export const getRelatedArticles = (
  currentArticleId: string,
  category: string,
  tags: string[],
  allArticles: any[],
  limit: number = 4
): any[] => {
  return allArticles
    .filter(article => 
      article.id !== currentArticleId &&
      (article.category === category || article.tags.some((tag: string) => tags.includes(tag)))
    )
    .sort((a, b) => {
      // Prioritize same category
      const aCategoryMatch = a.category === category ? 1 : 0;
      const bCategoryMatch = b.category === category ? 1 : 0;
      
      if (aCategoryMatch !== bCategoryMatch) {
        return bCategoryMatch - aCategoryMatch;
      }
      
      // Then by views (popularity)
      return (b.views || 0) - (a.views || 0);
    })
    .slice(0, limit);
};

/**
 * Generate SEO-friendly anchor text for calculator links
 */
export const generateCalculatorAnchorText = (calculatorId: string, context: string = 'default'): string => {
  const anchorTexts: Record<string, string[]> = {
    'emi-calculator': [
      'Calculate your EMI instantly',
      'Use our EMI Calculator',
      'Check your monthly EMI',
      'Free EMI Calculator tool'
    ],
    'sip-calculator': [
      'Calculate SIP returns',
      'Use our SIP Calculator',
      'Plan your SIP investments',
      'Free SIP Calculator'
    ],
    'income-tax-calculator': [
      'Calculate your tax liability',
      'Use our Income Tax Calculator',
      'Check how much tax you owe',
      'Free Tax Calculator'
    ],
    'home-loan-calculator': [
      'Calculate home loan EMI',
      'Use our Home Loan Calculator',
      'Check your home loan eligibility',
      'Free Home Loan EMI Calculator'
    ]
  };

  const texts = anchorTexts[calculatorId] || ['Calculate now', 'Use our calculator', 'Try our free tool'];
  return texts[Math.floor(Math.random() * texts.length)];
};

/**
 * Build internal linking recommendations for article
 */
export interface LinkRecommendation {
  type: 'calculator' | 'article' | 'category';
  id: string;
  title: string;
  url: string;
  relevanceScore: number;
  suggestedAnchorText: string;
}

export const getArticleLinkRecommendations = (
  articleContent: string,
  category: string,
  tags: string[]
): LinkRecommendation[] => {
  const recommendations: LinkRecommendation[] = [];

  // Get calculator suggestions
  const suggestedCalcs = getSuggestedCalculators(articleContent, category, 5);
  const allCalculators = getAllCalculators();

  suggestedCalcs.forEach(calcId => {
    const calc = allCalculators.find(c => c.id === calcId);
    if (calc) {
      recommendations.push({
        type: 'calculator',
        id: calcId,
        title: calc.name,
        url: `/calculators/${calcId}`,
        relevanceScore: 0.9,
        suggestedAnchorText: generateCalculatorAnchorText(calcId)
      });
    }
  });

  return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

export default {
  getSuggestedCalculators,
  getRelatedArticles,
  generateCalculatorAnchorText,
  getArticleLinkRecommendations
};

