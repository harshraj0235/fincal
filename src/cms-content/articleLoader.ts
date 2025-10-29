/**
 * Article Content Loader
 * Imports all CMS content articles and maps them to their IDs
 */

import { NewsGuideSection } from '../components/NewsGuideTemplate';

// Economy Articles
import { indianEyewearGrowth } from './news-articles/economy/article-11-eyewear-market-growth';
import { regulatoryNod } from './news-articles/economy/article-07-regulatory-nod';

// Markets Articles
import { lenskartIPOMatters } from './news-articles/markets/article-01-lenskart-ipo-matters';
import { valuationBreakdown } from './news-articles/markets/article-02-valuation-breakdown';
import { ipoRisks } from './news-articles/markets/article-06-ipo-risks';
import { retailInvestorGuide } from './news-articles/markets/article-10-retail-investor-guide';

// Business Analysis Articles
// Add more business analysis articles as they are created

// Startups Articles
import { lenskartInvestorsBacking } from './news-articles/startups/article-04-major-investors';
import { founderStakeStrategy } from './news-articles/startups/article-08-founder-stake-strategy';

// Article content map - maps article IDs to their full content
export const articleContentMap: Record<string, NewsGuideSection> = {
  // Economy
  'article-07-regulatory-nod': regulatoryNod,
  'article-11-eyewear-market-growth': indianEyewearGrowth,
  
  // Markets
  'article-01-lenskart-ipo-matters': lenskartIPOMatters,
  'article-02-valuation-breakdown': valuationBreakdown,
  'article-06-ipo-risks': ipoRisks,
  'article-10-retail-investor-guide': retailInvestorGuide,
  
  // Business Analysis
  // 'article-03-omnichannel-footprint': omnichannelFootprint,
  // 'article-05-ipo-proceeds-usage': ipoProceedsUsage,
  // 'article-09-market-trends-support': marketTrendsSupport,
  // 'article-12-eyewear-purchase-behavior': purchaseBehavior,
  
  // Startups
  'article-04-major-investors': lenskartInvestorsBacking,
  'article-08-founder-stake-strategy': founderStakeStrategy,
  
  // Add more articles as they are imported above
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

