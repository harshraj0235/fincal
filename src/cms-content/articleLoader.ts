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
  tier2StartupRevolution,
  aiStartupsBoom,
  quickCommerceBattle,
  d2cBrandsConsolidation,
  edtechCrisis2025,
  b2bSaasExports,
  fintechRegulation2025
} from './news-articles/startups/startups-funding-ecosystem-2025';

// NEW Economy Articles (8 comprehensive Google News-optimized articles)
import {
  indiaGDPGrowth2025,
  exportGrowthChallenges2025,
  inflationControl2025,
  infrastructureBoom2025,
  digitalRupeeLaunch,
  greenEnergyTransition,
  agricultureCrisis2025,
  employmentChallenge2025
} from './news-articles/economy/economy-analysis-2025';

// NEW Tech Business Articles (10 comprehensive Google News-optimized articles)
import {
  aiEnterpriseAdoption,
  fiveGRolloutIndia,
  itServicesAutomation,
  semiconductorMission,
  upiGlobalExpansion,
  cloudAdoptionIndia,
  cybersecurityIndia,
  itExportsSlowdown,
  manufacturingAutomation,
  techTalentShortage
} from './news-articles/tech-business/tech-business-2025';

// Markets Trending 2025 - 10 Dynamic Market-Based Articles
import {
  sensexBearPhase2025,
  rupeeSlips88Crisis,
  metalStocksCollapse,
  topBuyPicks2025,
  sebiFeeCutImpact,
  ipoSeasonExplodes,
  foreignMoneyDoubleEdged,
  smallCapRotation,
  usRateHikeCrash,
  goldVsEquities2025
} from './news-articles/markets/markets-trending-2025';

// Business Analysis Trending 2025 - 10 Dynamic Business Sector Articles
import {
  hondaIndiaGrowth,
  corporateDebtBomb,
  manufacturing3States,
  retailDisruption,
  evSupplierTrap,
  csrToEsg,
  supplyChainIndia,
  banksVsFintech2028,
  realEstateRisk,
  infraSpendingDelivery
} from './news-articles/business/business-trending-2025';

// Article content map - maps article IDs to their full content
export const articleContentMap: Record<string, NewsGuideSection> = {
  // Economy - Original Lenskart articles
  'article-11-eyewear-market-growth': indianEyewearGrowth,
  'article-07-regulatory-nod': regulatoryNod,
  
  // Economy - NEW comprehensive Google News-optimized articles (8)
  'india-gdp-growth-2025': indiaGDPGrowth2025,
  'export-growth-challenges-2025': exportGrowthChallenges2025,
  'inflation-control-2025': inflationControl2025,
  'infrastructure-boom-2025': infrastructureBoom2025,
  'digital-rupee-launch-2025': digitalRupeeLaunch,
  'green-energy-transition-2025': greenEnergyTransition,
  'agriculture-crisis-2025': agricultureCrisis2025,
  'employment-challenge-2025': employmentChallenge2025,
  
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
  'ai-startups-boom-2025': aiStartupsBoom,
  'quick-commerce-battle-2025': quickCommerceBattle,
  'd2c-brands-consolidation-2025': d2cBrandsConsolidation,
  'edtech-crisis-2025': edtechCrisis2025,
  'b2b-saas-exports-2025': b2bSaasExports,
  'fintech-regulation-2025': fintechRegulation2025,
  
  // Tech Business - NEW comprehensive Google News-optimized articles (10)
  'ai-enterprise-adoption-2025': aiEnterpriseAdoption,
  '5g-rollout-india-2025': fiveGRolloutIndia,
  'it-services-automation-2025': itServicesAutomation,
  'semiconductor-mission-india-2025': semiconductorMission,
  'upi-global-expansion-2025': upiGlobalExpansion,
  'cloud-computing-india-2025': cloudAdoptionIndia,
  'cybersecurity-india-2025': cybersecurityIndia,
  'it-exports-slowdown-2025': itExportsSlowdown,
  'manufacturing-automation-2025': manufacturingAutomation,
  'tech-talent-shortage-2025': techTalentShortage,
  
  // Markets Trending 2025 - Dynamic market-based articles (10)
  'sensex-bear-phase-2025': sensexBearPhase2025,
  'rupee-crisis-88-2025': rupeeSlips88Crisis,
  'metal-stocks-collapse-2025': metalStocksCollapse,
  'top-stock-picks-oct-2025': topBuyPicks2025,
  'sebi-fee-cut-amc-2025': sebiFeeCutImpact,
  'ipo-season-8billion-2025': ipoSeasonExplodes,
  'fii-double-edged-2025': foreignMoneyDoubleEdged,
  'smallcap-rotation-2025': smallCapRotation,
  'us-rate-hike-crash-2025': usRateHikeCrash,
  'gold-vs-equities-2025': goldVsEquities2025,
  
  // Business Analysis Trending 2025 - Dynamic business sector articles (10)
  'honda-india-growth-2025': hondaIndiaGrowth,
  'corporate-debt-bomb-2025': corporateDebtBomb,
  'manufacturing-states-2025': manufacturing3States,
  'retail-disruption-2025': retailDisruption,
  'ev-supplier-trap-2025': evSupplierTrap,
  'csr-esg-transformation-2025': csrToEsg,
  'supply-chain-india-2025': supplyChainIndia,
  'banks-fintech-2028': banksVsFintech2028,
  'real-estate-risk-2025': realEstateRisk,
  'infra-delivery-failure-2025': infraSpendingDelivery,
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

