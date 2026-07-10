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

// NEW 2025: Diwali Rally & Startup Funding Winter articles are NewsArticle type (plain content)
// They will render via the fallback path in NewsArticlePage, not via NewsGuideTemplate
// import { marketRallyDiwali2025 } from './news-articles/markets/market-rally-diwali-2025-analysis';
// import { startupFundingWinter2025 } from './news-articles/startups/startup-funding-winter-2025-survival-guide';

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
  goldVsEquities2025 as goldVsEquities2025Trending
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

import { viralFinanceArticles } from './news-articles/viral-finance-feb-2026';
import { viralFinanceMarch2026 } from '../data/news-articles/viral-finance-news-march-2026';

// Batch 2: 1 March 2026 - 10 New Viral News Articles (Hindi)
import niftyBankReshuffle2026 from '../data/news-articles/nifty-bank-reshuffle-yes-bank-union-bank-2026';
import directForeignEquity2026 from '../data/news-articles/direct-foreign-equity-investment-for-indians-2026';
import holiMarketHoliday2026 from '../data/news-articles/holi-market-holiday-impact-trading-2026';
import consumerStocksBoom2026 from '../data/news-articles/fmcg-consumer-stocks-rally-march-2026';
import niftyBullishPatterns2026 from '../data/news-articles/nifty-technical-analysis-bullish-patterns-march-2026';
import smeIpoRegulations2026 from '../data/news-articles/sebi-sme-ipo-regulations-crackdown-march-2026';
import esgReportingMandate2026 from '../data/news-articles/esg-reporting-mandate-top-1000-companies-2026';
import indexVsActiveFund2026 from '../data/news-articles/index-vs-active-mutual-fund-performance-2026';
import retailParticipationPeak2026 from '../data/news-articles/india-retail-investor-participation-milestone-2026';
import reitsVsGold2026 from '../data/news-articles/reits-vs-gold-investment-comparison-2026';

// Batch 1: 1 March 2026 - 10 New Viral News Articles (Hindi)
import upiBiometricSecurity2026 from '../data/news-articles/upi-biometric-authentication-2026';
import idfcFirstBankFraud2026 from '../data/news-articles/idfc-first-bank-590-crore-fraud-case';
import psbMinimumBalanceRules2026 from '../data/news-articles/psb-reduction-minimum-balance-charges-2026';
import lpgCommercialPriceCut2026 from '../data/news-articles/lpg-commercial-price-cut-march-2026';
import atfPriceHike2026 from '../data/news-articles/atf-price-hike-airfare-impact-2026';
import epfoInterestRate2026 from '../data/news-articles/epfo-interest-rate-8-25-percent-2026';
import digitalRupeeOfflineMode2026 from '../data/news-articles/digital-rupee-offline-mode-rbi-launch-2026';
import indiaHouseholdDebtRatio2026 from '../data/news-articles/india-household-debt-credit-to-gdp-ratio-2026';
import tPlusZeroSettlement2026 from '../data/news-articles/t-plus-zero-instant-settlement-stock-market-india-2026';
import schoolFinancialLiteracy2026 from '../data/news-articles/financial-literacy-mandatory-indian-schools-2026';

// 1 March 2026: 9 New Viral News Articles (Hindi)
import { rbiDigitalRupee2026 } from '../data/news-articles/rbi-digital-rupee-expansion-2026';
import { indiaItAiCrisis2026 } from '../data/news-articles/india-it-ai-crisis-citrini-report';
import { smeIpoWave2026 } from '../data/news-articles/sme-ipo-wave-march-2026-analysis';
import { semiconductorMission2026 } from '../data/news-articles/india-semiconductor-mission-2-micron';
import { cryptoTax2026 } from '../data/news-articles/crypto-tax-2026-penalty-rules';
import { indiaGreenEnergy2026 } from '../data/news-articles/india-green-energy-250gw-milestone';
import { fireMovementIndia2026 } from '../data/news-articles/fire-movement-india-youth-retirement';
import { sttHikeImpact2026 } from '../data/news-articles/stt-hike-derivative-trading-impact-2026';
import { indiaGdpRevamp2026 } from '../data/news-articles/india-gdp-revamp-2026-growth-analysis';

// 2 March 2026: 5 New Market Impact News Articles
import { iranIsraelWarStockMarketCrash2026 } from '../data/news-articles/iran-israel-war-indian-stock-market-crash-2026';
import { newFinancialRulesMarch1_2026 } from '../data/news-articles/new-financial-rules-march-1-2026-sbi-upi';
import { sebiMutualFundRulesOverhaul2026 } from '../data/news-articles/sebi-mutual-fund-rules-overhaul-sip-2026';
import { indiaGdpGrowth4thEconomy2026 } from '../data/news-articles/india-gdp-growth-world-4th-largest-economy-2026';
import { goldSilverPriceSurgeMarch2026 } from '../data/news-articles/gold-silver-price-surge-march-2026-investing';
import { pmegpLoanSubsidy2026 } from '../data/news-articles/pmegp-loan-subsidy-2026-guide-100-percent-approval';
import { upChikitsaPratipoorti2026 } from '../data/news-articles/up-chikitsa-pratipoorti-yojana-2026-guide';

// Batch 10: Insurance & Real Estate (Hindi)
import aiPersonalFinance2026 from '../data/news-articles/ai-personal-finance-2026';
import web3BankingRevolution2026 from '../data/news-articles/web3-banking-revolution-2026';
import greenHydrogenInvestment2026 from '../data/news-articles/green-hydrogen-investment-2026';
import evInfrastructureStocks2026 from '../data/news-articles/ev-infrastructure-stocks-2026';
import circularEconomyBusiness2026 from '../data/news-articles/circular-economy-business-2026';
import quantumComputingFinance2026 from '../data/news-articles/quantum-computing-finance-2026';
import carbonCreditTradingGuide2026 from '../data/news-articles/carbon-credit-trading-guide-2026';
import verticalFarmingStartups2026 from '../data/news-articles/vertical-farming-startups-2026';
import cybersecurityInsurance2026 from '../data/news-articles/cybersecurity-insurance-2026';
import spaceTechEconomy2026 from '../data/news-articles/space-tech-economy-2026';

import termInsuranceGuide2026 from '../data/news-articles/term-insurance-buying-guide-2026';
import healthClaimHacks2026 from '../data/news-articles/health-insurance-claim-rejection-2026';
import motorRules2026 from '../data/news-articles/motor-insurance-rule-changes-2026';
import ulipVsMf2026 from '../data/news-articles/ulip-vs-mutual-fund-2026';
import reraImpact2026 from '../data/news-articles/rera-impact-2026-india';
import affordableHousing2026 from '../data/news-articles/affordable-housing-scheme-2026';
import rentalYield2026 from '../data/news-articles/rental-yield-analysis-india-2026';
import coliving2026 from '../data/news-articles/coliving-investment-passive-income-2026';
import smartCity2026 from '../data/news-articles/smart-city-real-estate-buy-2026';
import propertyTax2026 from '../data/news-articles/property-tax-online-payment-guide-2026';

// Batch 9: Economy & Policy (Hindi)
import gdpJourney2026 from '../data/news-articles/india-gdp-5-trillion-journey-2026';
import rupeeIntl2026 from '../data/news-articles/rupee-internationalization-global-currency-2026';
import pliResults2026 from '../data/news-articles/pli-scheme-results-manufacturing-2026';
import chinaPlusOne2026 from '../data/news-articles/china-plus-one-india-benefit-2026';
import msmeCrisis2026 from '../data/news-articles/msme-crisis-guide-india-2026';
import gigWorkersRights2026 from '../data/news-articles/gig-economy-workers-rights-india-2026';
import evSubsidy2026 from '../data/news-articles/ev-subsidy-fame3-impact-2026';
import greenHydrogen2026 from '../data/news-articles/green-hydrogen-mission-india-2026';
import semiconductor2026 from '../data/news-articles/semiconductor-mission-india-fab-2026';
import africaTrade2026 from '../data/news-articles/india-africa-trade-new-era-2026';

// Batch 8: Digital India & Fintech (Hindi)
import upiInternational2026 from '../data/news-articles/upi-international-launch-2026';
import digitalRupeeUpdate2026 from '../data/news-articles/digital-rupee-expansion-update-2026';
import ondcVsAmazon2026 from '../data/news-articles/ondc-vs-amazon-ecommerce-2026';
import fintechLayoffs2026 from '../data/news-articles/fintech-layoffs-sector-outlook-2026';
import neobankVsTraditional2026 from '../data/news-articles/neobank-vs-traditional-bank-comparison-2026';
import accountAggregator2026 from '../data/news-articles/account-aggregator-revolution-india-2026';
import rbiSandbox2026 from '../data/news-articles/rbi-sandbox-innovations-2026';
import digilockerFinance2026 from '../data/news-articles/digilocker-financial-integration-guide-2026';
import openBanking2026 from '../data/news-articles/open-banking-india-future-2026';
import aiChatbotBanking2026 from '../data/news-articles/ai-chatbot-banking-revolution-2026';

// Batch 7: Stock Market & Trading (Hindi)
import niftyAt25000Guide2026 from '../data/news-articles/nifty-50-record-high-25000-analysis-2026';
import sebiFnoWarning2026 from '../data/news-articles/sebi-warning-retail-fno-trading-losses-2026';
import multibaggerStrategy2026 from '../data/news-articles/multibagger-stocks-identifying-strategy-2026';
import ipoAllotmentTricks2026 from '../data/news-articles/ipo-vs-direct-listing-comparison-2026';
import highDividendStocks2026 from '../data/news-articles/high-dividend-yield-stocks-india-2026';
import sectoralFundRotation2026 from '../data/news-articles/sectoral-mutual-fund-rotation-strategy-2026';
import pennyStocksTrap2026 from '../data/news-articles/penny-stocks-investment-risks-warning-2026';
import dematHiddenCharges2026 from '../data/news-articles/demat-account-hidden-charges-comparison-2026';
import zerodhaVsGroww2026 from '../data/news-articles/zerodha-vs-groww-brokerage-comparison-2026';
import marketCrashGuide2026 from '../data/news-articles/stock-market-crash-survival-guide-2026';

// Batch 6: Personal Finance Hacks (Hindi)
import creditCardRewards2026 from '../data/news-articles/credit-card-rewards-hacking-2026';
import emiTrap2026 from '../data/news-articles/emi-trap-hidden-charges-2026';
import section80C2026 from '../data/news-articles/section-80c-tax-saving-guide-2026';
import hraGuide2026 from '../data/news-articles/hra-tax-exemption-guide-2026';
import sukanyaSamriddhi2026 from '../data/news-articles/sukanya-samriddhi-yojana-guide-2026';
import gratuityCalculation2026 from '../data/news-articles/gratuity-calculation-rules-2026';
import pfWithdrawal2026 from '../data/news-articles/pf-withdrawal-rules-2026';
import mutualFundMistakes2026 from '../data/news-articles/mutual-fund-sip-mistakes-2026';
import upiCreditLine2026 from '../data/news-articles/upi-credit-line-feature-2026';
import fdRateComparison2026 from '../data/news-articles/fd-rate-comparison-all-banks-2026';

// Batch 5: 1 March 2026 - Investment & Wealth Building (Hindi)
import sipStepUp2026 from '../data/news-articles/step-up-sip-strategy-crorepati-2026';
import emergencyFund2026 from '../data/news-articles/emergency-fund-guide-india-2026';
import goldVsFd2026 from '../data/news-articles/gold-vs-fd-comparison-2026';
import smallCapRisk2026 from '../data/news-articles/small-cap-risks-strategy-2026';
import creditScore2026 from '../data/news-articles/cibil-score-improvement-guide-2026';
import retirementPlanning2026 from '../data/news-articles/retirement-planning-guide-2026';
import rupeeDepreciation2026 from '../data/news-articles/rupee-depreciation-impact-2026';
import gstChanges2026 from '../data/news-articles/gst-changes-april-2026';
import firstTimeSalary2026 from '../data/news-articles/first-salary-money-management-2026';
import realEstateVsStock2026 from '../data/news-articles/real-estate-vs-stock-market-2026';

// Batch 4: 1 March 2026 - Tax & Personal Finance (Hindi)
import newVsOldTaxRegime2026 from '../data/news-articles/new-vs-old-tax-regime-comparison-2026';
import npsVatsalya2026 from '../data/news-articles/nps-vatsalya-children-pension-scheme-2026';
import capitalGainsTax2026 from '../data/news-articles/capital-gains-tax-changes-2026';
import sgbExitStrategy2026 from '../data/news-articles/sovereign-gold-bond-exit-strategy-2026';
import healthInsuranceSurge2026 from '../data/news-articles/health-insurance-premium-surge-2026';
import homeLoanRates2026 from '../data/news-articles/home-loan-interest-rate-trends-2026';
import ppfElssNps2026 from '../data/news-articles/ppf-elss-nps-comparison-2026';
import cryptoTaxCompliance2026 from '../data/news-articles/crypto-tax-compliance-india-2026';
import scssBenefits2026 from '../data/news-articles/senior-citizen-savings-scheme-2026';
import itrDeadline2026 from '../data/news-articles/itr-filing-deadline-penalties-2026';

// Batch 3: 1 March 2026 - 10 New Viral News Articles (Hindi)
import ondcExpansion2026 from '../data/news-articles/ondc-expansion-india-2026';
import aiPersonalFinance2026_batch3 from '../data/news-articles/ai-personal-finance-revolution-2026';
import phonepeVsGooglePay2026 from '../data/news-articles/phonepe-googlepay-market-share-2026';
import bnplCrisis2026 from '../data/news-articles/bnpl-crisis-india-regulations-2026';
import insurtechBoom2026 from '../data/news-articles/insurtech-boom-india-2026';
import wealthtechRural2026 from '../data/news-articles/wealthtech-rural-india-growth-2026';
import whatsappBanking2026 from '../data/news-articles/whatsapp-banking-popularity-2026';
import neobankCybersecurity2026 from '../data/news-articles/cybersecurity-neobanks-protection-2026';
import digitalLending2026 from '../data/news-articles/digital-lending-guidelines-rbi-2026';
import fintechUnicorns2026 from '../data/news-articles/fintech-unicorn-pipeline-2026';

// Article content map - maps article IDs to their full content
export const articleContentMap: Record<string, NewsGuideSection> = {
  ...viralFinanceArticles,
  'viral-finance-news-march-2026': viralFinanceMarch2026,

  // 2 March 2026: 5 New Market Impact News Articles
  'iran-israel-war-indian-stock-market-crash-2026': iranIsraelWarStockMarketCrash2026,
  'new-financial-rules-march-1-2026-sbi-upi': newFinancialRulesMarch1_2026,
  'sebi-mutual-fund-rules-overhaul-sip-2026': sebiMutualFundRulesOverhaul2026,
  'india-gdp-growth-world-4th-largest-economy-2026': indiaGdpGrowth4thEconomy2026,
  'gold-silver-price-surge-march-2026-investing': goldSilverPriceSurgeMarch2026,
  'pmegp-loan-subsidy-2026-guide-100-percent-approval': pmegpLoanSubsidy2026,
  'up-chikitsa-pratipoorti-yojana-2026-guide': upChikitsaPratipoorti2026,

  // Batch 10
  'ai-personal-finance-2026': aiPersonalFinance2026,
  'web3-banking-revolution-2026': web3BankingRevolution2026,
  'green-hydrogen-investment-2026': greenHydrogenInvestment2026,
  'ev-infrastructure-stocks-2026': evInfrastructureStocks2026,
  'circular-economy-business-2026': circularEconomyBusiness2026,
  'quantum-computing-finance-2026': quantumComputingFinance2026,
  'carbon-credit-trading-guide-2026': carbonCreditTradingGuide2026,
  'vertical-farming-startups-2026': verticalFarmingStartups2026,
  'cybersecurity-insurance-2026': cybersecurityInsurance2026,
  'space-tech-economy-2026': spaceTechEconomy2026,
  'term-insurance-buying-guide-2026': termInsuranceGuide2026,
  'health-insurance-claim-rejection-2026': healthClaimHacks2026,
  'motor-insurance-rule-changes-2026': motorRules2026,
  'ulip-vs-mutual-fund-2026': ulipVsMf2026,
  'rera-impact-2026-india': reraImpact2026,
  'affordable-housing-scheme-2026': affordableHousing2026,
  'rental-yield-analysis-india-2026': rentalYield2026,
  'coliving-investment-passive-income-2026': coliving2026,
  'smart-city-real-estate-buy-2026': smartCity2026,
  'property-tax-online-payment-guide-2026': propertyTax2026,

  // Batch 9
  'india-gdp-5-trillion-journey-2026': gdpJourney2026,
  'rupee-internationalization-global-currency-2026': rupeeIntl2026,
  'pli-scheme-results-manufacturing-2026': pliResults2026,
  'china-plus-one-india-benefit-2026': chinaPlusOne2026,
  'msme-crisis-guide-india-2026': msmeCrisis2026,
  'gig-economy-workers-rights-india-2026': gigWorkersRights2026,
  'ev-subsidy-fame3-impact-2026': evSubsidy2026,
  'green-hydrogen-mission-india-2026': greenHydrogen2026,
  'semiconductor-mission-india-fab-2026': semiconductor2026,
  'india-africa-trade-new-era-2026': africaTrade2026,

  // Batch 8
  'upi-international-launch-2026': upiInternational2026,
  'digital-rupee-expansion-update-2026': digitalRupeeUpdate2026,
  'ondc-vs-amazon-ecommerce-2026': ondcVsAmazon2026,
  'fintech-layoffs-sector-outlook-2026': fintechLayoffs2026,
  'neobank-vs-traditional-bank-comparison-2026': neobankVsTraditional2026,
  'account-aggregator-revolution-india-2026': accountAggregator2026,
  'rbi-sandbox-innovations-2026': rbiSandbox2026,
  'digilocker-financial-integration-guide-2026': digilockerFinance2026,
  'open-banking-india-future-2026': openBanking2026,
  'ai-chatbot-banking-revolution-2026': aiChatbotBanking2026,

  // Batch 7
  'nifty-50-record-high-25000-analysis-2026': niftyAt25000Guide2026,
  'sebi-warning-retail-fno-trading-losses-2026': sebiFnoWarning2026,
  'multibagger-stocks-identifying-strategy-2026': multibaggerStrategy2026,
  'ipo-vs-direct-listing-comparison-2026': ipoAllotmentTricks2026,
  'high-dividend-yield-stocks-india-2026': highDividendStocks2026,
  'sectoral-mutual-fund-rotation-strategy-2026': sectoralFundRotation2026,
  'penny-stocks-investment-risks-warning-2026': pennyStocksTrap2026,
  'demat-account-hidden-charges-comparison-2026': dematHiddenCharges2026,
  'zerodha-vs-groww-brokerage-comparison-2026': zerodhaVsGroww2026,
  'stock-market-crash-survival-guide-2026': marketCrashGuide2026,

  // Batch 6
  'credit-card-rewards-hacking-2026': creditCardRewards2026,
  'emi-trap-hidden-charges-2026': emiTrap2026,
  'section-80c-tax-saving-guide-2026': section80C2026,
  'hra-tax-exemption-guide-2026': hraGuide2026,
  'sukanya-samriddhi-yojana-guide-2026': sukanyaSamriddhi2026,
  'gratuity-calculation-rules-2026': gratuityCalculation2026,
  'pf-withdrawal-rules-2026': pfWithdrawal2026,
  'mutual-fund-sip-mistakes-2026': mutualFundMistakes2026,
  'upi-credit-line-feature-2026': upiCreditLine2026,
  'fd-rate-comparison-all-banks-2026': fdRateComparison2026,

  // Batch 5
  'step-up-sip-strategy-crorepati-2026': sipStepUp2026,
  'emergency-fund-guide-india-2026': emergencyFund2026,
  'gold-vs-fd-comparison-2026': goldVsFd2026,
  'small-cap-risks-strategy-2026': smallCapRisk2026,
  'cibil-score-improvement-guide-2026': creditScore2026,
  'retirement-planning-guide-2026': retirementPlanning2026,
  'rupee-depreciation-impact-2026': rupeeDepreciation2026,
  'gst-changes-april-2026': gstChanges2026,
  'first-salary-money-management-2026': firstTimeSalary2026,
  'real-estate-vs-stock-market-2026': realEstateVsStock2026,

  // Batch 4
  'new-vs-old-tax-regime-comparison-2026': newVsOldTaxRegime2026,
  'nps-vatsalya-children-pension-scheme-2026': npsVatsalya2026,
  'capital-gains-tax-changes-2026': capitalGainsTax2026,
  'sovereign-gold-bond-exit-strategy-2026': sgbExitStrategy2026,
  'health-insurance-premium-surge-2026': healthInsuranceSurge2026,
  'home-loan-interest-rate-trends-2026': homeLoanRates2026,
  'ppf-elss-nps-comparison-2026': ppfElssNps2026,
  'crypto-tax-compliance-india-2026': cryptoTaxCompliance2026,
  'senior-citizen-savings-scheme-2026': scssBenefits2026,
  'itr-filing-deadline-penalties-2026': itrDeadline2026,

  // Batch 3
  'ondc-expansion-india-2026': ondcExpansion2026,
  'ai-personal-finance-revolution-2026': aiPersonalFinance2026_batch3,
  'phonepe-googlepay-market-share-2026': phonepeVsGooglePay2026,
  'bnpl-crisis-india-regulations-2026': bnplCrisis2026,
  'insurtech-boom-india-2026': insurtechBoom2026,
  'wealthtech-rural-india-growth-2026': wealthtechRural2026,
  'whatsapp-banking-popularity-2026': whatsappBanking2026,
  'cybersecurity-neobanks-protection-2026': neobankCybersecurity2026,
  'digital-lending-guidelines-rbi-2026': digitalLending2026,
  'fintech-unicorn-pipeline-2026': fintechUnicorns2026,

  // Batch 2: 1 March 2026 - 10 New Viral News Articles (Hindi)
  'nifty-bank-reshuffle-yes-bank-union-bank-2026': niftyBankReshuffle2026,
  'direct-foreign-equity-investment-for-indians-2026': directForeignEquity2026,
  'holi-market-holiday-impact-trading-2026': holiMarketHoliday2026,
  'fmcg-consumer-stocks-rally-march-2026': consumerStocksBoom2026,
  'nifty-technical-analysis-bullish-patterns-march-2026': niftyBullishPatterns2026,
  'sebi-sme-ipo-regulations-crackdown-march-2026': smeIpoRegulations2026,
  'esg-reporting-mandate-top-1000-companies-2026': esgReportingMandate2026,
  'index-vs-active-mutual-fund-performance-2026': indexVsActiveFund2026,
  'india-retail-investor-participation-milestone-2026': retailParticipationPeak2026,
  'reits-vs-gold-investment-comparison-2026': reitsVsGold2026,

  // Batch 1: 1 March 2026 - 10 New Viral News Articles (Hindi)
  'upi-biometric-authentication-2026': upiBiometricSecurity2026,
  'idfc-first-bank-590-crore-fraud-case': idfcFirstBankFraud2026,
  'psb-reduction-minimum-balance-charges-2026': psbMinimumBalanceRules2026,
  'lpg-commercial-price-cut-march-2026': lpgCommercialPriceCut2026,
  'atf-price-hike-airfare-impact-2026': atfPriceHike2026,
  'epfo-interest-rate-8-25-percent-2026': epfoInterestRate2026,
  'digital-rupee-offline-mode-rbi-launch-2026': digitalRupeeOfflineMode2026,
  'india-household-debt-credit-to-gdp-ratio-2026': indiaHouseholdDebtRatio2026,
  't-plus-zero-instant-settlement-stock-market-india-2026': tPlusZeroSettlement2026,
  'financial-literacy-mandatory-indian-schools-2026': schoolFinancialLiteracy2026,

  // 1 March 2026: 9 New Viral News Articles (Hindi)
  'rbi-digital-rupee-expansion-2026': rbiDigitalRupee2026,
  'india-it-ai-crisis-citrini-report': indiaItAiCrisis2026,
  'sme-ipo-wave-march-2026-analysis': smeIpoWave2026,
  'india-semiconductor-mission-2-micron': semiconductorMission2026,
  'crypto-tax-2026-penalty-rules': cryptoTax2026,
  'india-green-energy-250gw-milestone': indiaGreenEnergy2026,
  'fire-movement-india-youth-retirement': fireMovementIndia2026,
  'stt-hike-derivative-trading-impact-2026': sttHikeImpact2026,
  'india-gdp-revamp-2026-growth-analysis': indiaGdpRevamp2026,
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

  // NEW 2025: Hindi News Articles are NOT in NewsGuideSection format, so not mapped here
  // They will render as plain content via the fallback path in NewsArticlePage
  // 'bharatiya-share-bazar-diwali-2025-rally-kyon-aayi-analysis': marketRallyDiwali2025,
  // 'bharat-startup-funding-gir-gayi-2025-kaise-bachein-hindi-guide': startupFundingWinter2025,

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

  // Startups - NEW comprehensive Google News-optimized articles (8 - EXACT SLUGS from contentRegistry)
  'india-unicorn-startups-110-billion-dollar-companies-funding': indiaUnicornFactory2025,
  'tier-2-cities-startup-indore-jaipur-kochi-unicorns': tier2StartupRevolution,
  'ai-startups-india-10-billion-funding-chatgpt-boom': aiStartupsBoom,
  'zepto-blinkit-swiggy-instamart-10-minute-delivery-war': quickCommerceBattle,
  'd2c-brands-consolidation-mamaearth-boat-survival': d2cBrandsConsolidation,
  'edtech-crisis-byjus-collapse-unacademy-layoffs': edtechCrisis2025,
  'india-b2b-saas-exports-12-billion-freshworks-postman': b2bSaasExports,
  'fintech-regulation-rbi-phonepe-paytm-razorpay-compliance': fintechRegulation2025,

  // Tech Business - NEW comprehensive Google News-optimized articles (10 - EXACT SLUGS from contentRegistry)
  'ai-adoption-indian-enterprises-50000-crore-tcs-infosys-wipro': aiEnterpriseAdoption,
  '5g-india-rollout-500000-towers-jio-airtel-monetization': fiveGRolloutIndia,
  'it-services-automation-tcs-infosys-margins-compression': itServicesAutomation,
  'india-semiconductor-mission-76000-crore-micron-tata-chip-fabs': semiconductorMission,
  'upi-global-expansion-10-countries-200-billion-opportunity': upiGlobalExpansion,
  'cloud-computing-india-1-lakh-crore-aws-azure-google': cloudAdoptionIndia,
  'cybersecurity-india-35000-crore-breaches-skills-shortage': cybersecurityIndia,
  'it-exports-slowdown-200-billion-us-recession-automation': itExportsSlowdown,
  'manufacturing-automation-industry-4-robots-iot-tata-mahindra': manufacturingAutomation,
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

  // Markets Trending 2025 - Dynamic market-based articles (10 - EXACT SLUGS from contentRegistry)
  'sensex-plunges-500-points-india-bear-phase-analysis': sensexBearPhase2025,
  'rupee-slips-88-43-dollar-currency-crash-portfolio-risk': rupeeSlips88Crisis,
  'metal-stocks-collapse-global-demand-china-slowdown': metalStocksCollapse,
  'top-stock-picks-october-2025-hdfc-reliance-tcs': topBuyPicks2025,
  'sebi-fee-cuts-amc-selloff-mutual-fund-impact': sebiFeeCutImpact,
  'ipo-season-india-8-billion-hyundai-swiggy-ola': ipoSeasonExplodes,
  'foreign-money-india-fii-inflows-two-edged-sword': foreignMoneyDoubleEdged,
  'small-caps-surge-big-caps-stumble-market-rotation': smallCapRotation,
  'us-interest-rate-hike-india-market-crash-risk': usRateHikeCrash,
  'gold-vs-equities-india-investment-next-five-years': goldVsEquities2025Trending,

  // Business Analysis Trending 2025 - Dynamic business sector articles (10 - EXACT SLUGS from contentRegistry)
  'honda-motors-india-key-growth-market-auto-sector': hondaIndiaGrowth,
  'india-corporate-debt-time-bomb-70-lakh-crore': corporateDebtBomb,
  'manufacturing-3-india-states-factory-hubs': manufacturing3States,
  'retail-giants-disrupted-quick-commerce-blinkit-zepto': retailDisruption,
  'ev-push-trap-auto-suppliers-hidden-costs': evSupplierTrap,
  'csr-to-esg-indian-businesses-playbook-carbon-neutral': csrToEsg,
  'global-supply-chains-india-china-plus-one-ready': supplyChainIndia,
  'banks-vs-fintech-india-financial-sector-2028': banksVsFintech2028,
  'real-estate-india-next-big-risk-sector-debt': realEstateRisk,
  'infrastructure-spending-delivery-mechanism-failing': infraSpendingDelivery,

  // Startups Trending 2025 - Dynamic startup ecosystem articles (10 - EXACT SLUGS from contentRegistry)
  'campus-startups-india-next-unicorn-from-hostel': campusStartupsRise,
  'deeptech-battleground-10000-crore-fund-of-funds': deepTechFund,
  'tier2-tier3-cities-india-hidden-startup-boom-zones': tier2StartupBoom,
  'ai-startup-wave-india-25000-crore-who-winning': aiStartupWave,
  'india-startup-ipo-tracker-2025-breakout-year': startupIpoTracker,
  'vcs-india-shifting-playbook-profitability-over-growth': vcPlaybookShift,
  'female-founder-funding-india-gap-how-changing': femaleFunderGap,
  'climate-tech-agritech-foodtech-india-next-big-three': climateAgriFood,
  'indian-founders-going-global-day-one-50000-crore': foundersGoingGlobal,
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

