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

    throw new Error(`Unsupported news provider: ${config.newsAPI.provider}`);
  } catch (error) {
    console.error(`❌ Error fetching news for ${category}:`, error.message);
    
    // Fallback: Return mock data for testing
    if (process.env.NODE_ENV === 'development') {
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

module.exports = {
  fetchAllNews,
  fetchNewsForCategory,
  generateSlug
};


