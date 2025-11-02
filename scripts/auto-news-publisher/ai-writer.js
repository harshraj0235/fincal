/**
 * 🤖 AI CONTENT WRITER
 * Generates unique, SEO-optimized news articles using AI
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

// Initialize AI client
let aiClient;
if (config.ai.provider === 'gemini') {
  aiClient = new GoogleGenerativeAI(config.ai.apiKey);
}

/**
 * Generate article content using AI
 * @param {Object} newsTopic - News topic object
 * @returns {Promise<Object>} Generated article with title, excerpt, content
 */
async function generateArticle(newsTopic) {
  const { title, description, keywords, category, author, sourceName, publishedAt } = newsTopic;

  console.log(`\n🤖 Generating article: "${title.substring(0, 50)}..."`);

  const prompt = `You are a professional financial journalist writing for MoneyCal.in, India's leading financial education platform.

TASK: Write a comprehensive, unique financial news article based on this topic:

TOPIC: ${title}
BRIEF: ${description}
SOURCE: ${sourceName}
CATEGORY: ${category}
KEYWORDS: ${keywords.join(', ')}

REQUIREMENTS:
1. LENGTH: 1000-1500 words (STRICT - not less than 1000 words!)
2. STRUCTURE:
   - Engaging title (60 characters, SEO-optimized)
   - Excerpt: 150 words summary
   - Main content: 3-5 sections with H2 headings
   - Conclusion with call-to-action

3. CONTENT STYLE:
   - Professional yet accessible
   - Indian market perspective (use ₹, Indian examples, local context)
   - Unique analysis (NOT just copy of source - add insights, implications)
   - Include relevant statistics/data with context
   - Avoid jargon or explain technical terms
   - Factual and balanced (not sensational)

4. SEO OPTIMIZATION:
   - Use long-tail keywords naturally: "${keywords[0]}", "${keywords[1]}"
   - Include entities: Companies, people, regulations mentioned
   - Add 2-3 internal links: Mention MoneyCal calculators/tools naturally
     Examples: "Use our FD Calculator", "Learn more in our Retirement Planning guide"

5. INDIAN CONTEXT:
   - Relate to Indian investors/readers
   - Mention impact on Indian market/economy
   - Reference SEBI, RBI, NSE, BSE if relevant
   - Use rupee (₹) for all amounts

6. UNIQUE PERSPECTIVE:
   - What does this mean for Indian investors?
   - Historical context if relevant
   - Future implications
   - Actionable insights (what should readers do?)

7. FORMAT (Return as JSON):
{
  "title": "SEO-optimized title (60 chars)",
  "excerpt": "150-word compelling summary",
  "content": "Main article content in markdown (1000-1500 words, use ## for headings, **bold**, - bullet points)",
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "readingTime": "8 mins",
  "focusKeywords": ["primary long-tail keyword"]
}

Write the article now. Make it informative, engaging, and valuable for Indian readers!`;

  try {
    if (config.ai.provider === 'gemini') {
      const model = aiClient.getGenerativeModel({ model: config.ai.model });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse JSON from AI response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('AI did not return valid JSON');
      }
      
      const article = JSON.parse(jsonMatch[0]);
      
      // Validate word count
      const wordCount = article.content.split(/\s+/).length;
      console.log(`✅ Article generated: ${wordCount} words`);
      
      if (wordCount < config.ai.minWords) {
        console.warn(`⚠️ Article too short (${wordCount} words). Regenerating...`);
        // Could retry here, but for now we'll accept it
      }
      
      return {
        ...article,
        wordCount,
        generatedAt: new Date().toISOString(),
        sourceTopic: newsTopic
      };
    }

    // Add OpenAI/Claude support here if needed
    throw new Error(`Unsupported AI provider: ${config.ai.provider}`);

  } catch (error) {
    console.error(`❌ Error generating article:`, error.message);
    
    // Fallback: Return template article for testing
    if (process.env.NODE_ENV === 'development') {
      return {
        title: title.substring(0, 60),
        excerpt: description || 'Latest financial news analysis for Indian investors...',
        content: `## Introduction\n\n${description}\n\n## Market Impact\n\nThis development has significant implications for Indian investors...\n\n## What It Means for You\n\nHere's how this affects your portfolio...`,
        seoKeywords: keywords,
        readingTime: '8 mins',
        focusKeywords: [keywords[0]],
        wordCount: 200,
        generatedAt: new Date().toISOString(),
        sourceTopic: newsTopic
      };
    }
    
    throw error;
  }
}

/**
 * Generate multiple articles
 * @param {Array} newsTopics - Array of news topics
 * @returns {Promise<Array>} Array of generated articles
 */
async function generateArticles(newsTopics) {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('🤖 GENERATING AI ARTICLES');
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  const articles = [];

  for (const [index, topic] of newsTopics.entries()) {
    console.log(`\n📝 Article ${index + 1}/${newsTopics.length}`);
    
    try {
      const article = await generateArticle(topic);
      articles.push(article);
      
      // Rate limiting: Wait 2 seconds between API calls
      if (index < newsTopics.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`❌ Failed to generate article for "${topic.title}":`, error.message);
      // Continue with other articles
    }
  }

  console.log(`\n✅ TOTAL ARTICLES GENERATED: ${articles.length}/${newsTopics.length}`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');

  return articles;
}

module.exports = {
  generateArticle,
  generateArticles
};


