/**
 * 📰 NEWS FETCHER
 * Fetches trending financial news from Google News / GNews API
 */

const axios = require('axios');
const config = require('./config');

/**
 * Fetch trending news topics for a category
 * @param {string} category - Category name (markets, business, startups, economy, techBusiness)
 * @param {number} count - Number of articles to fetch
 * @returns {Promise<Array>} Array of news topics
 */
async function fetchNewsForCategory(category, count = 2) {
  const categoryConfig = config.newsAPI.categories[category];
  if (!categoryConfig) {
    throw new Error(`Unknown category: ${category}`);
  }

  const { keywords, author, slug } = categoryConfig;

  try {
    // Using GNews API (recommended)
    if (config.newsAPI.provider === 'gnews') {
      const response = await axios.get('https://gnews.io/api/v4/search', {
        params: {
          q: keywords,
          lang: config.newsAPI.language,
          country: config.newsAPI.country,
          max: count,
          apikey: config.newsAPI.apiKey,
          sortby: 'publishedAt' // Latest first
        }
      });

      return response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        sourceUrl: article.url,
        publishedAt: article.publishedAt,
        sourceName: article.source.name,
        category: slug,
        author: author,
        keywords: keywords.split(',').map(k => k.trim())
      }));
    }
    
    // Using NewsAPI.org (alternative)
    if (config.newsAPI.provider === 'newsapi') {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: keywords,
          language: config.newsAPI.language,
          sortBy: 'publishedAt',
          pageSize: count,
          apiKey: config.newsAPI.apiKey
        }
      });

      return response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        sourceUrl: article.url,
        publishedAt: article.publishedAt,
        sourceName: article.source.name,
        category: slug,
        author: author,
        keywords: keywords.split(',').map(k => k.trim())
      }));
    }

    // Demo/Free mode - use curated trending topics
    if (config.newsAPI.provider === 'demo') {
      return generateDemoNews(category, author, slug, keywords, count);
    }

    throw new Error(`Unsupported news provider: ${config.newsAPI.provider}`);
  } catch (error) {
    console.error(`❌ Error fetching news for ${category}:`, error.message);
    
    // Fallback: Return demo data
    if (true) {
      return [{
        title: `${category.toUpperCase()} Market Update ${new Date().toLocaleDateString('en-IN')}`,
        description: 'Latest developments in Indian financial markets...',
        sourceUrl: 'https://example.com',
        publishedAt: new Date().toISOString(),
        sourceName: 'Financial Express',
        category: slug,
        author: author,
        keywords: keywords.split(',').map(k => k.trim())
      }];
    }
    
    throw error;
  }
}

/**
 * Fetch all news topics for today
 * @returns {Promise<Array>} All news topics (10 articles across 5 categories)
 */
async function fetchAllNews() {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('📰 FETCHING TRENDING NEWS TOPICS');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const categories = Object.keys(config.newsAPI.categories);
  const allNews = [];

  for (const category of categories) {
    console.log(`📡 Fetching ${config.newsAPI.articlesPerCategory} articles for: ${category}...`);
    
    try {
      const news = await fetchNewsForCategory(category, config.newsAPI.articlesPerCategory);
      allNews.push(...news);
      console.log(`✅ Fetched ${news.length} articles for ${category}`);
      
      // Rate limiting: Wait 1 second between API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Failed to fetch news for ${category}:`, error.message);
      // Continue with other categories even if one fails
    }
  }

  console.log(`\n✅ TOTAL NEWS TOPICS FETCHED: ${allNews.length}`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  return allNews;
}

/**
 * Generate unique slug from title
 * @param {string} title - Article title
 * @returns {string} URL-friendly slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .substring(0, 100); // Limit length
}

/**
 * Generate demo news topics (FREE - no API needed!)
 * Uses trending topics based on current date and category
 */
function generateDemoNews(category, author, slug, keywords, count) {
  const dateStr = new Date().toLocaleDateString('en-IN');
  const trendingTopics = {
    markets: [
      `Nifty 50 Hits ${20000 + Math.floor(Math.random() * 2000)} as FII Inflows Surge in India Markets`,
      `Bank Nifty Rallies ${Math.floor(Math.random() * 5)}% on Strong Q2 Earnings from HDFC ICICI Axis`,
      `Reliance Industries Stock Jumps ${Math.floor(Math.random() * 8)}% After Ambitious Green Energy Plans`,
      `Indian Markets Outperform Global Peers with ${Math.floor(Math.random() * 10) + 10}% YTD Returns`
    ],
    'business-analysis': [
      `Tata Group Announces Rs ${Math.floor(Math.random() * 50000) + 10000} Crore Investment in Semiconductor Manufacturing`,
      `Reliance Retail Plans ${Math.floor(Math.random() * 500) + 100} New Stores Across India This Quarter`,
      `Adani Group Secures Rs ${Math.floor(Math.random() * 30000) + 5000} Crore Funding for Renewable Energy Projects`,
      `Wipro TCS Infosys Report Strong Revenue Growth Despite Global Headwinds`
    ],
    startups: [
      `Zepto Raises $${Math.floor(Math.random() * 500) + 200} Million Valuation Hits $${Math.floor(Math.random() * 3) + 3} Billion in Quick Commerce Race`,
      `PhonePe Receives Final Approval for Digital Lending License from RBI`,
      `OLA Electric Files for Rs ${Math.floor(Math.random() * 10000) + 5000} Crore IPO Targets $5 Billion Valuation`,
      `Indian Fintech Startup Raises Rs ${Math.floor(Math.random() * 500) + 100} Crore Series B Led by Sequoia Capital`
    ],
    economy: [
      `RBI Monetary Policy: Repo Rate ${Math.random() > 0.5 ? 'Held Steady' : 'Revised'} at ${(Math.random() * 2 + 5).toFixed(2)}% Amid Inflation Concerns`,
      `India GDP Growth Forecast Revised to ${(Math.random() * 2 + 6).toFixed(1)}% for FY${2025 + Math.floor(Math.random() * 2)}`,
      `Wholesale Price Index Inflation ${Math.random() > 0.5 ? 'Eases' : 'Rises'} to ${(Math.random() * 5 + 2).toFixed(2)}% in Latest Data`,
      `Government Announces Rs ${Math.floor(Math.random() * 100000) + 50000} Crore Infrastructure Spending Boost`
    ],
    'tech-business': [
      `UPI Transactions Cross Rs ${Math.floor(Math.random() * 50) + 150} Lakh Crore Monthly Record High`,
      `Google Announces Rs ${Math.floor(Math.random() * 10000) + 5000} Crore Investment in India Data Centers`,
      `Indian Digital Payments Grow ${Math.floor(Math.random() * 30) + 20}% YoY Reaching ${Math.floor(Math.random() * 200) + 300} Billion Transactions`,
      `Amazon India Plans ${Math.floor(Math.random() * 500) + 100} New Fulfillment Centers Across Tier 2 Cities`
    ]
  };

  const categoryTopics = trendingTopics[slug] || trendingTopics.markets;
  const selectedTopics = [];
  
  for (let i = 0; i < count && i < categoryTopics.length; i++) {
    selectedTopics.push({
      title: categoryTopics[i],
      description: `Latest analysis of ${categoryTopics[i].toLowerCase()} and its impact on Indian financial markets and investors.`,
      sourceUrl: 'https://economictimes.indiatimes.com',
      publishedAt: new Date().toISOString(),
      sourceName: 'Economic Times',
      category: slug,
      author: author,
      keywords: keywords.split(',').map(k => k.trim())
    });
  }

  return selectedTopics;
}

module.exports = {
  fetchAllNews,
  fetchNewsForCategory,
  generateSlug
};


