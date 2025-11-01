/**
 * Plain Article Content Loader
 * For articles that are simple content objects, not structured NewsGuideSection
 */

// Import the plain content articles
import { marketRallyDiwali2025 } from './news-articles/markets/market-rally-diwali-2025-analysis';
import { startupFundingWinter2025 } from './news-articles/startups/startup-funding-winter-2025-survival-guide';
import { bullMarketRetailInvestors2025 } from './news-articles/markets/bull-market-coming-retail-investors-2025';

// Plain article content map - maps slugs to full article objects
export const plainArticleContentMap: Record<string, any> = {
  'bharatiya-share-bazar-diwali-2025-rally-kyon-aayi-analysis': marketRallyDiwali2025,
  'bharat-startup-funding-gir-gayi-2025-kaise-bachein-hindi-guide': startupFundingWinter2025,
  'kya-agla-bull-market-aa-raha-hai-bharat-retail-investors-taiyari-2025': bullMarketRetailInvestors2025,
};

/**
 * Get plain article content by slug
 */
export const getPlainArticleContent = (slug: string): any | null => {
  return plainArticleContentMap[slug] || null;
};

