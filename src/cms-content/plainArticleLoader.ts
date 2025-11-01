/**
 * Plain Article Content Loader
 * For articles that are simple content objects, not structured NewsGuideSection
 */

// Import the plain content articles
import { marketRallyDiwali2025 } from './news-articles/markets/market-rally-diwali-2025-analysis';
import { startupFundingWinter2025 } from './news-articles/startups/startup-funding-winter-2025-survival-guide';
import { bullMarketRetailInvestors2025 } from './news-articles/markets/bull-market-coming-retail-investors-2025';
import { ruralTier3StartupEcosystem2025 } from './news-articles/startups/rural-tier3-startup-ecosystem-2025';
import { gdpGrowthRate202526 } from './news-articles/economy/gdp-growth-rate-2025-26-india';
import { indiaAIGlobalRace2025 } from './news-articles/tech/india-ai-global-race-2025';
import { manufacturingVsServices2025 } from './news-articles/business/manufacturing-vs-services-sector-india-2025';
import { goldSilverCommoditiesBoom2025 } from './news-articles/markets/gold-silver-commodities-boom-2025';
import { indiaSpaceTechStartups2025 } from './news-articles/startups/india-space-tech-startups-2025';
import { inflationImpactCommonPeople2025 } from './news-articles/economy/inflation-impact-common-people-2025';
import { greenEnergyIndiaSector2025 } from './news-articles/business/green-energy-renewable-sector-india-2025';
import { mutualFundsVsDirectStocks2025 } from './news-articles/markets/mutual-funds-vs-direct-stocks-comparison-2025';
import { digitalEconomyIndia2025 } from './news-articles/economy/digital-economy-india-cashless-upi-2025';
import { fiveGIoTSmartCities2025 } from './news-articles/tech/five-g-iot-smart-cities-india-2025';
import { deepTechStartupsIndia2025 } from './news-articles/startups/deep-tech-startups-india-ai-robotics-2025';
import { femalFoundersWomenStartups2025 } from './news-articles/startups/female-founders-women-startups-india-2025';
import { cryptoVsStockMarket2025 } from './news-articles/markets/cryptocurrency-vs-stock-market-india-2025';
import { jobMarketEmploymentIndia2025 } from './news-articles/economy/job-market-employment-india-2025';
import { vcInvestmentDeclineFundingWinter2025 } from './news-articles/business/vc-investment-decline-funding-winter-2025';
import { cybersecurityDataPrivacyIndia2025 } from './news-articles/tech/cybersecurity-data-privacy-india-2025';
import { fpiImpactIndia2025 } from './news-articles/markets/fpi-foreign-investment-india-impact-2025';
import { startupFailuresAnalysis2025 } from './news-articles/startups/startup-failures-analysis-byju-dunzo-2025';

// Plain article content map - maps slugs to full article objects
export const plainArticleContentMap: Record<string, any> = {
  'bharatiya-share-bazar-diwali-2025-rally-kyon-aayi-analysis': marketRallyDiwali2025,
  'bharat-startup-funding-gir-gayi-2025-kaise-bachein-hindi-guide': startupFundingWinter2025,
  'kya-agla-bull-market-aa-raha-hai-bharat-retail-investors-taiyari-2025': bullMarketRetailInvestors2025,
  'gramin-tier3-shahar-startup-ecosystem-avsar-chunauti-2025': ruralTier3StartupEcosystem2025,
  'bharat-gdp-growth-rate-2025-26-badhti-ghatati-economic-forecast': gdpGrowthRate202526,
  'bharat-aur-ai-global-race-artificial-intelligence-india-2025': indiaAIGlobalRace2025,
  'manufacturing-vs-services-sector-bharat-chunauti-avsar-2025': manufacturingVsServices2025,
  'sona-chandi-copper-commodities-teji-bharat-2025-munafa-jokhim': goldSilverCommoditiesBoom2025,
  'bharat-space-tech-startups-agni-skyroot-pixxel-isro-2025': indiaSpaceTechStartups2025,
  'mehngai-inflation-aam-aadmi-assar-kharch-badha-bachat-ghati-2025': inflationImpactCommonPeople2025,
  'green-energy-solar-wind-renewable-bharat-sector-analysis-2025': greenEnergyIndiaSector2025,
  'mutual-fund-vs-khud-ka-stock-investment-kaun-behtar-2025': mutualFundsVsDirectStocks2025,
  'digital-economy-bharat-cashless-upi-fintech-2025-growth': digitalEconomyIndia2025,
  '5g-iot-smart-cities-jio-airtel-bharat-2025-future': fiveGIoTSmartCities2025,
  'deep-tech-startups-bharat-ai-robotics-quantum-drone-2025': deepTechStartupsIndia2025,
  'mahila-female-founders-women-startups-bharat-funding-gap-2025': femalFoundersWomenStartups2025,
  'cryptocurrency-vs-stock-market-bitcoin-ethereum-bharat-2025': cryptoVsStockMarket2025,
  'naukri-bazar-badlav-jobs-india-ai-automation-2025': jobMarketEmploymentIndia2025,
  'venture-capital-investment-giravat-funding-winter-bharat-2025': vcInvestmentDeclineFundingWinter2025,
  'cybersecurity-data-privacy-breaches-india-hacks-2025': cybersecurityDataPrivacyIndia2025,
  'fpi-foreign-portfolio-investment-bharat-market-impact-2025': fpiImpactIndia2025,
  'startup-failures-byju-dunzo-gomechanic-kyon-fail-2025': startupFailuresAnalysis2025,
};

/**
 * Get plain article content by slug
 */
export const getPlainArticleContent = (slug: string): any | null => {
  return plainArticleContentMap[slug] || null;
};

