/**
 * Article Content Loader
 * Imports all CMS content articles and maps them to their IDs
 */

import { NewsGuideSection } from '../components/NewsGuideTemplate';

// Economy Articles
import { indianEyewearGrowth } from './news-articles/economy/article-11-eyewear-market-growth';

// Markets Articles
import { lenskartIPOMatters } from './news-articles/markets/article-01-lenskart-ipo-matters';
import { 
  valuationBreakdown, 
  ipoRisks, 
  retailInvestorGuide,
  omnichannelFootprint,
  ipoProceedsUsage,
  marketTrendsSupport,
  purchaseBehavior,
  majorInvestors,
  regulatoryNod
} from './news-articles/createAllArticles';

// Startups Articles
import { founderStakeStrategy } from './news-articles/startups/article-08-founder-stake-strategy';

// NEW Markets Articles (10 comprehensive articles)
import {
  stockMarket2026Boom,
  rbiRepoRateImpact2025,
  midCapStocksOutperform,
  rupeeVolatilityRisk2025,
  sectorRotationStrategy2025,
  fixedIncomeRisk2025,
  goldVsEquities2025,
  foreignMoneyRisks2025,
  smallCapBubble2025,
  govPolicyImpact2025
} from './news-articles/markets/new-markets-articles-2025';

// NEW Business Analysis Articles (6 comprehensive articles)
import {
  relianceDisneyMerger,
  manufacturingPLISuccess,
  tataEVDominance,
  pharmaAPIIndependence,
  realEstateOfficeCrisis,
  fmcgRuralSlowdown
} from './news-articles/business/business-analysis-articles-2025';

// NEW Startups Articles (8 comprehensive Google News-optimized articles)
import {
  indiaUnicornFactory2025,
  tier2StartupRevolution
} from './news-articles/startups/startups-funding-ecosystem-2025';

// Article content map - maps article IDs to their full content
export const articleContentMap: Record<string, NewsGuideSection> = {
  // Economy
  'article-11-eyewear-market-growth': indianEyewearGrowth,
  'article-07-regulatory-nod': regulatoryNod,
  
  // Markets - Original Lenskart articles
  'article-01-lenskart-ipo-matters': lenskartIPOMatters,
  'article-02-valuation-breakdown': valuationBreakdown,
  'article-06-ipo-risks': ipoRisks,
  'article-10-retail-investor-guide': retailInvestorGuide,
  
  // Markets - NEW comprehensive articles (10)
  'stock-market-boom-2026': stockMarket2026Boom,
  'rbi-repo-rate-impact-2025': rbiRepoRateImpact2025,
  'midcap-stocks-outperform-2025': midCapStocksOutperform,
  'rupee-volatility-risk-2025': rupeeVolatilityRisk2025,
  'sector-rotation-strategy-2025': sectorRotationStrategy2025,
  'fixed-income-risk-2025': fixedIncomeRisk2025,
  'gold-vs-equities-2025': goldVsEquities2025,
  'foreign-money-risks-2025': foreignMoneyRisks2025,
  'smallcap-bubble-2025': smallCapBubble2025,
  'gov-policy-impact-2025': govPolicyImpact2025,
  
  // Business Analysis - Original Lenskart articles
  'article-03-omnichannel-footprint': omnichannelFootprint,
  'article-05-ipo-proceeds-usage': ipoProceedsUsage,
  'article-09-market-trends-support': marketTrendsSupport,
  'article-12-eyewear-purchase-behavior': purchaseBehavior,
  
  // Business Analysis - NEW comprehensive articles (6)
  'reliance-disney-merger-2025': relianceDisneyMerger,
  'manufacturing-pli-success-2025': manufacturingPLISuccess,
  'tata-ev-dominance-2025': tataEVDominance,
  'pharma-api-independence-2025': pharmaAPIIndependence,
  'office-real-estate-crisis-2025': realEstateOfficeCrisis,
  'fmcg-rural-slowdown-2025': fmcgRuralSlowdown,
  
  // Startups - Original Lenskart articles
  'article-04-major-investors': majorInvestors,
  'article-08-founder-stake-strategy': founderStakeStrategy,
  
  // Startups - NEW comprehensive Google News-optimized articles (8)
  'india-unicorn-factory-2025': indiaUnicornFactory2025,
  'tier2-startup-revolution': tier2StartupRevolution,
};

/**
 * Get article content by ID
 */
export const getArticleContent = (articleId: string): NewsGuideSection | null => {
  return articleContentMap[articleId] || null;
};

/**
 * Get all available article IDs
 */
export const getAvailableArticleIds = (): string[] => {
  return Object.keys(articleContentMap);
};

