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
};

/**
 * Get plain article content by slug
 */
export const getPlainArticleContent = (slug: string): any | null => {
  return plainArticleContentMap[slug] || null;
};

