/**
 * 🤖 AI CONTENT WRITER - PURE REST API VERSION
 * Generates unique, SEO-optimized news articles using Gemini API
 * NO SDK - Direct HTTP calls only
 */

const axios = require('axios');
const config = require('./config');

/**
 * Generate article content using Gemini REST API
 * @param {Object} newsTopic - News topic object
 * @returns {Promise<Object>} Generated article
 */
async function generateArticle(newsTopic) {
  const { title, description, keywords, category, author, sourceName, publishedAt } = newsTopic;

  console.log(`\n🤖 Generating article: "${title.substring(0, 50)}..."`);

  const prompt = `You are a professional financial journalist writing for MoneyCal.in.

Write a comprehensive 1000-1500 word article on: ${title}

Context: ${description}
Category: ${category}
Keywords: ${keywords.join(', ')}

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "title": "SEO title 60 chars",
  "excerpt": "150 word summary",
  "content": "Article in clean HTML format with <h2>, <p>, <ul>, <li> tags. 1000+ words. NO asterisks or hash symbols!",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "readingTime": "8 mins",
  "focusKeywords": ["primary keyword"]
}`;

  try {
    // Get clean API key from environment
    let apiKey = process.env.GEMINI_API_KEY || config.ai.apiKey || '';
    apiKey = apiKey.trim().replace(/^["'\s]+|["'\s]+$/g, '');
    
    if (!apiKey || apiKey.length < 30) {
      throw new Error(`Invalid API key (length: ${apiKey.length})`);
    }

    console.log(`🔑 API Key: ${apiKey.substring(0, 12)}...${apiKey.substring(apiKey.length - 3)} (${apiKey.length} chars)`);
    
    // Use Gemini v1beta REST API
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    
    console.log(`📡 Calling: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`);

    const response = await axios.post(
      apiUrl,
      {
        contents: [{
          parts: [{ text: prompt }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      }
    );

    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      throw new Error('Invalid API response structure');
    }

    const text = response.data.candidates[0].content.parts[0].text;
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI did not return valid JSON');
    }
    
    const article = JSON.parse(jsonMatch[0]);
    const wordCount = article.content.split(/\s+/).length;
    
    console.log(`✅ Generated: ${wordCount} words`);
    
    return {
      ...article,
      wordCount,
      generatedAt: new Date().toISOString(),
      sourceTopic: newsTopic
    };

  } catch (error) {
    console.error(`❌ Generation failed:`, error.message);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data:`, JSON.stringify(error.response.data).substring(0, 200));
    }
    throw error;
  }
}

/**
 * Generate multiple articles
 * @param {Array} newsTopics - News topics
 * @returns {Promise<Array>} Generated articles
 */
async function generateArticles(newsTopics) {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('🤖 GENERATING AI ARTICLES (PURE REST API)');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const articles = [];

  for (const [index, topic] of newsTopics.entries()) {
    console.log(`\n📝 Article ${index + 1}/${newsTopics.length}`);
    
    try {
      const article = await generateArticle(topic);
      articles.push(article);
      
      // Rate limiting
      if (index < newsTopics.length - 1) {
        console.log('⏳ Waiting 3 seconds (rate limit)...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(`❌ Failed: "${topic.title.substring(0, 50)}..."`);
      console.error(`   Error: ${error.message}`);
      // Continue with others
    }
  }

  console.log(`\n✅ TOTAL GENERATED: ${articles.length}/${newsTopics.length}`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  return articles;
}

module.exports = {
  generateArticle,
  generateArticles
};
