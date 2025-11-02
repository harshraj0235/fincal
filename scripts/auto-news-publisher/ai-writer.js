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
    
    // Fallback to template-based article
    console.log(`↪️  Using template fallback for this article...`);
    return generateTemplateArticle(newsTopic);
  }
}

/**
 * Generate article using template (fallback when AI fails)
 * @param {Object} newsTopic - News topic
 * @returns {Object} Template-based article
 */
function generateTemplateArticle(newsTopic) {
  const { title, description, keywords, category, author } = newsTopic;
  
  const content = `<div class="prose max-w-none">
<p class="text-lg leading-relaxed mb-6">${description} This development marks a significant moment for the Indian financial landscape and has important implications for investors and market participants.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Key Highlights</h2>
<p class="mb-4">The announcement comes at a crucial time when Indian markets are experiencing dynamic changes. Here are the key points investors need to understand about this development and its potential impact on portfolio strategies.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Market Impact Analysis</h2>
<p class="mb-4">This news has created immediate ripples across various sectors of the Indian economy. Market analysts are closely watching how this will affect different asset classes and investment strategies in the coming weeks and months.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">What Indian Investors Should Know</h2>
<p class="mb-4">For retail and institutional investors, understanding the nuances of this development is crucial. The implications extend beyond immediate market movements to longer-term investment strategies and portfolio positioning.</p>

<ul class="list-disc pl-6 mb-6 space-y-2">
<li>Short-term market volatility may present both opportunities and risks for active traders</li>
<li>Long-term investors should consider rebalancing portfolios based on changing fundamentals</li>
<li>Diversification remains key in navigating uncertain market conditions</li>
<li>Regulatory changes may impact specific sectors more than others</li>
</ul>

<h2 class="text-2xl font-bold mt-8 mb-4">Expert Perspectives</h2>
<p class="mb-4">Financial experts and market analysts suggest that investors should maintain a balanced approach during this period. Rather than making hasty decisions based on short-term news, focusing on long-term fundamentals and diversified asset allocation remains the prudent strategy.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Action Plan for Investors</h2>
<p class="mb-4">Investors can use <a href="/calculators/sip-calculator" class="text-blue-600 hover:underline">MoneyCal SIP Calculator</a> to plan systematic investments and <a href="/learn/investing-wealth-creation" class="text-blue-600 hover:underline">explore our comprehensive investing guides</a> to build a solid financial foundation.</p>

<p class="mb-4">For tax-efficient investment planning, refer to our <a href="/learn/taxation-compliance" class="text-blue-600 hover:underline">Taxation Guide</a> and use the <a href="/calculators/tax-saving-calculator" class="text-blue-600 hover:underline">Tax Saving Calculator</a>.</p>

<h2 class="text-2xl font-bold mt-8 mb-4">Looking Ahead</h2>
<p class="mb-4">While near-term uncertainty exists, India's long-term growth story remains intact. Investors should focus on quality assets, maintain discipline, and avoid making emotional decisions based on short-term market movements.</p>

<div class="mt-8 p-4 bg-gray-100 rounded-lg">
<p class="text-sm text-gray-600"><em>Disclaimer: This article is for informational purposes only and should not be considered as investment advice. Please consult with a qualified financial advisor before making investment decisions.</em></p>
</div>
</div>`;

  return {
    title: title.substring(0, 60),
    excerpt: description.substring(0, 155),
    content: content,
    seoKeywords: keywords.slice(0, 5),
    readingTime: '8 mins',
    focusKeywords: [keywords[0]],
    wordCount: 450,
    generatedAt: new Date().toISOString(),
    sourceTopic: newsTopic
  };
}

/**
 * Generate multiple articles
 * @param {Array} newsTopics - News topics
 * @returns {Promise<Array>} Generated articles
 */
async function generateArticles(newsTopics) {
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log(`🤖 GENERATING ARTICLES (${config.ai.provider === 'gemini' ? 'AI' : 'TEMPLATE'})`);
  console.log('═══════════════════════════════════════════════════════════════════════\n');
  
  // If template mode, skip AI and use templates directly
  if (config.ai.provider === 'template') {
    console.log('📝 Using template-based generation (fallback mode)');
    return newsTopics.map(topic => generateTemplateArticle(topic));
  }

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
