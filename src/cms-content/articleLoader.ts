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

// NEW Economy/Tech Trending 2025 Articles (20 comprehensive articles)
import {
  indiaGdp7Percent,
  aiCallCenterJobs,
  exportsPushChallenges,
  digitalRupeeDataLaw,
  greenEconomyGreenwash,
  itSectorRisks,
  defenceTechBoom
} from './news-articles/economy/economy-tech-trending-2025';

import {
  dataCenterExplosion,
  workforceAutomation,
  bankingSectorTransform,
  stateEconomyDivide,
  manufacturingBoomReal,
  globalLayoffsImpact,
  infrastructureSpending,
  consumerTaxCuts,
  innovationStartupEco,
  telecomJioAirtelWar,
  publicPrivateCapital,
  aiFactoryRace,
  creditGdpRisks
} from './news-articles/economy/economy-remaining-13';

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

// Startups Trending 2025 - 10 Dynamic Startup Ecosystem Articles
import {
  campusStartupsRise,
  deepTechFund,
  tier2StartupBoom,
  aiStartupWave,
  startupIpoTracker,
  vcPlaybookShift,
  femaleFunderGap,
  climateAgriFood,
  foundersGoingGlobal,
  privatVsPublicMarkets
} from './news-articles/startups/startups-trending-2025';

// Article content map - maps article IDs to their full content
export const articleContentMap: Record<string, NewsGuideSection> = {
  // Economy - Original Lenskart articles (using SLUGS as keys)
  'india-eyewear-market-growth-forecast': indianEyewearGrowth,
  'sebi-approval-lenskart-eyewear-industry-impact': regulatoryNod,
  
  // Economy - NEW comprehensive Google News-optimized articles (8 - using SLUGS as keys)
  'india-gdp-growth-7-2-percent-fastest-economy-china': indiaGDPGrowth2025,
  'india-export-growth-1-trillion-target-2030-fta-challenges': exportGrowthChallenges2025,
  'india-inflation-5-4-percent-rbi-rate-cuts-food-prices': inflationControl2025,
  'india-infrastructure-boom-111-lakh-crore-roads-metros-ports': infrastructureBoom2025,
  'digital-rupee-rbi-cbdc-pilot-10-lakh-users-upi': digitalRupeeLaunch,
  'india-renewable-energy-500-gw-target-solar-wind-green-hydrogen': greenEnergyTransition,
  'india-agriculture-crisis-farmer-income-msp-rural-distress': agricultureCrisis2025,
  'india-employment-jobs-10-million-annually-gig-economy-youth': employmentChallenge2025,
  
  // Markets - Original Lenskart articles (using SLUGS as keys)
  'lenskart-ipo-announcement-hindi': lenskartIPOMatters,
  'lenskart-valuation-67000-crore-analysis': valuationBreakdown,
  'lenskart-ipo-10-risks-paytm-comparison': ipoRisks,
  'lenskart-ipo-retail-investor-guide': retailInvestorGuide,
  
  // Markets - NEW comprehensive articles (10 - using SLUGS as keys)
  'india-stock-market-boom-2026-30000-nifty': stockMarket2026Boom,
  'rbi-repo-rate-cut-impact-stocks-bonds-fd': rbiRepoRateImpact2025,
  '3-midcap-stocks-hidden-gems-250-percent-return': midCapStocksOutperform,
  'rupee-dollar-volatility-portfolio-risk-2025': rupeeVolatilityRisk2025,
  'sector-rotation-strategy-portfolio-rebalancing': sectorRotationStrategy2025,
  'fixed-income-fd-bonds-hidden-risks-real-returns': fixedIncomeRisk2025,
  'gold-vs-equities-2025-2030-investment-battle': goldVsEquities2025,
  'fii-foreign-investment-india-risks-opportunities': foreignMoneyRisks2025,
  'smallcap-bubble-warning-overvaluation-correction-risk': smallCapBubble2025,
  'government-policy-portfolio-impact-budget-rbi': govPolicyImpact2025,
  
  // Business Analysis - Original Lenskart articles (using SLUGS as keys)
  'lenskart-2000-stores-omnichannel-strategy': omnichannelFootprint,
  'lenskart-ipo-6000-crore-spending-plan': ipoProceedsUsage,
  'eyewear-market-trends-2025': marketTrendsSupport,
  'eyewear-purchase-behavior-trends': purchaseBehavior,
  
  // Business Analysis - NEW comprehensive articles (7 - using SLUGS as keys)
  'reliance-disney-merger-70000-crore-ott-jiocinema-hotstar': relianceDisneyMerger,
  'make-in-india-pli-scheme-dixon-waaree-success': manufacturingPLISuccess,
  'tata-motors-ev-market-share-70-percent-nexon-punch': tataEVDominance,
  'india-pharma-api-self-reliance-import-reduction-china': pharmaAPIIndependence,
  'office-real-estate-vacancy-crisis-wfh-hybrid-bangalore-mumbai': realEstateOfficeCrisis,
  'fmcg-rural-slowdown-india-hul-britannia-itc-demand-crisis': fmcgRuralSlowdown,
  
  // Startups - Original Lenskart articles (using SLUGS as keys)
  'lenskart-investors-softbank-premji-returns': majorInvestors,
  'founder-stake-increase-strategy': founderStakeStrategy,
  
  // Startups - NEW comprehensive Google News-optimized articles (8 - using SLUGS as keys)
  'india-unicorns-110-billion-dollar-startups-funding-vc': indiaUnicornFactory2025,
  'tier2-tier3-startups-jaipur-indore-coimbatore-funding': tier2StartupRevolution,
  'ai-startups-india-10-billion-chatgpt-openai-boom': aiStartupsBoom,
  'quick-commerce-zepto-blinkit-swiggy-10-minute-delivery': quickCommerceBattle,
  'd2c-brands-consolidation-mamaearth-boat-sugar-survive': d2cBrandsConsolidation,
  'edtech-crisis-byjus-unacademy-1-lakh-crore-collapse': edtechCrisis2025,
  'india-b2b-saas-exports-12-billion-freshworks-postman': b2bSaasExports,
  'fintech-regulation-rbi-phonepe-paytm-razorpay-rules': fintechRegulation2025,
  
  // Tech Business - NEW comprehensive Google News-optimized articles (10 - using SLUGS as keys)
  'ai-enterprise-adoption-india-50000-crore-chatgpt-automation': aiEnterpriseAdoption,
  '5g-india-rollout-500000-towers-jio-airtel-monetization': fiveGRolloutIndia,
  'it-services-automation-tcs-infosys-margins-ai-threat': itServicesAutomation,
  'india-semiconductor-mission-76000-crore-chip-fabs': semiconductorMission,
  'upi-global-expansion-10-countries-200-billion-opportunity': upiGlobalExpansion,
  'cloud-computing-india-1-lakh-crore-aws-azure-google': cloudAdoptionIndia,
  'cybersecurity-india-35000-crore-breaches-skills-shortage': cybersecurityIndia,
  'it-exports-slowdown-200-billion-us-recession-automation': itExportsSlowdown,
  'manufacturing-automation-industry-4-robots-iot-ai': manufacturingAutomation,
  'tech-talent-shortage-india-ai-ml-cloud-cybersecurity-jobs': techTalentShortage,
  
  // Economy/Tech Trending 2025 - ALL 20 comprehensive articles
  'india-gdp-7-percent-growth-fy26-test': indiaGdp7Percent,
  'ai-chatbots-replacing-call-centre-2-lakh-jobs': aiCallCenterJobs,
  'india-exports-1-trillion-target-challenges': exportsPushChallenges,
  'digital-rupee-data-law-privacy-2026': digitalRupeeDataLaw,
  'green-economy-15-lakh-crore-greenwashing': greenEconomyGreenwash,
  'it-sector-200-billion-revenue-ai-recession-risk': itSectorRisks,
  'defence-tech-spending-75000-crore-tata-lt': defenceTechBoom,
  'data-center-boom-2-lakh-crore-yotta-airtel': dataCenterExplosion,
  'workforce-automation-5-million-jobs-risk': workforceAutomation,
  'banking-sector-fintech-50000-crore-disruption': bankingSectorTransform,
  'state-economy-divide-maharashtra-tn-up-bihar': stateEconomyDivide,
  'make-in-india-100-lakh-crore-30-delivered': manufacturingBoomReal,
  'global-tech-layoffs-350000-india-it-impact': globalLayoffsImpact,
  'infrastructure-spending-111-lakh-crore-lt-adani': infrastructureSpending,
  'tax-cut-expectations-2026-50000-relief': consumerTaxCuts,
  'india-innovation-startups-150000-crore-funding': innovationStartupEco,
  'telecom-war-jio-airtel-5g-tariff-hikes': telecomJioAirtelWar,
  'public-private-capital-5-lakh-crore-psu': publicPrivateCapital,
  'india-ai-factory-reliance-tata-adani-1-lakh-crore': aiFactoryRace,
  'credit-gdp-ratio-58-percent-household-debt-risk': creditGdpRisks,
  
  // Markets Trending 2025 - Dynamic market-based articles (10 - using SLUGS as keys)
  'sensex-plunges-500-points-india-bear-phase-analysis': sensexBearPhase2025,
  'rupee-dollar-88-43-currency-crash-portfolio-risk': rupeeSlips88Crisis,
  'metal-stocks-collapse-global-demand-commodity-bet-fail': metalStocksCollapse,
  'top-stock-picks-october-30-2025-buy-wishlist': topBuyPicks2025,
  'sebi-fee-cuts-amc-selloff-mutual-fund-impact': sebiFeeCutImpact,
  'ipo-season-explodes-india-8-billion-yearend-blitz': ipoSeasonExplodes,
  'foreign-money-india-two-edged-sword-markets': foreignMoneyDoubleEdged,
  'small-caps-surge-big-caps-stumble-market-rotation': smallCapRotation,
  'us-interest-rate-hike-india-crash-trigger': usRateHikeCrash,
  
  // Business Analysis Trending 2025 - Dynamic business sector articles (10 - using SLUGS as keys)
  'honda-india-key-growth-market-auto-sector-impact': hondaIndiaGrowth,
  'india-corporate-debt-70-lakh-crore-boom-bubble': corporateDebtBomb,
  'manufacturing-3-india-states-factory-hubs-future': manufacturing3States,
  'retail-disruption-quick-commerce-eating-market-share': retailDisruption,
  'ev-push-trap-auto-suppliers-hidden-costs-margins': evSupplierTrap,
  'csr-esg-transformation-indian-businesses-playbook': csrToEsg,
  'supply-chains-india-china-plus-one-opportunity': supplyChainIndia,
  'banks-fintech-india-financial-sector-2028-transformation': banksVsFintech2028,
  'real-estate-india-risk-sector-12-lakh-crore-debt': realEstateRisk,
  'infrastructure-spending-delivery-mechanism-failing-11-lakh-stuck': infraSpendingDelivery,
  
  // Startups Trending 2025 - Dynamic startup ecosystem articles (10 - using SLUGS as keys)
  'campus-startups-india-next-unicorn-hostel': campusStartupsRise,
  'deeptech-fund-10000-crore-government-india-startup-future': deepTechFund,
  'tier2-tier3-cities-startup-boom-jaipur-indore': tier2StartupBoom,
  'ai-startup-wave-india-25000-crore-winning-losing': aiStartupWave,
  'india-startup-ipo-tracker-2025-44000-crore-public': startupIpoTracker,
  'vcs-india-shifting-profitability-growth-founders': vcPlaybookShift,
  'female-founder-funding-india-3-percent-1-2-lakh-crore': femaleFunderGap,
  'climate-agri-foodtech-india-startup-35000-crore': climateAgriFood,
  'indian-founders-global-day-one-50000-crore-overseas': foundersGoingGlobal,
  'startups-preferring-public-markets-44000-crore-ipo': privatVsPublicMarkets,
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

