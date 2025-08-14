const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Cloud-Based Auto Blog Generator...');
console.log('⏰ Time:', new Date().toISOString());
console.log('🌍 Environment: GitHub Actions');

// Ensure we're in the right directory
process.chdir(process.env.GITHUB_WORKSPACE || process.cwd());

// RSS Feed URLs
const RSS_FEEDS = [
  'https://www.moneycontrol.com/rss/business.xml',
  'https://economictimes.indiatimes.com/rssfeeds/837555174.cms',
  'https://www.livemint.com/rss/money',
  'https://in.investing.com/rss/news.rss'
];

// Finance topics for content generation
const FINANCE_TOPICS = [
  'Indian Stock Market Analysis',
  'Personal Finance Strategies',
  'Investment Opportunities',
  'Digital Banking Trends',
  'Cryptocurrency Markets',
  'Mutual Fund Analysis',
  'Insurance Planning',
  'Tax Optimization',
  'Retirement Planning',
  'Wealth Management',
  'Real Estate Investment',
  'Gold and Commodities',
  'Fixed Income Securities',
  'International Markets',
  'Economic Policy Impact',
  'Fintech Innovations',
  'ESG Investing',
  'Portfolio Diversification',
  'Risk Management',
  'Market Volatility'
];

// Different content templates for variety
const CONTENT_TEMPLATES = [
  {
    intro: "The financial landscape is experiencing unprecedented changes, and ${topic} has emerged as a critical area of focus for investors and financial professionals. This comprehensive analysis delves into the latest developments, market dynamics, and strategic implications that every investor should understand.",
    overview: "Recent developments in ${topic} have created significant opportunities and challenges across various market segments. Industry experts and market analysts are closely monitoring these trends, as they could fundamentally reshape investment strategies and financial planning approaches.",
    insights: "Market research and expert analysis reveal several compelling insights about ${topic}. These findings provide crucial context for understanding market movements and identifying potential investment opportunities in the current economic environment.",
    analysis: "Financial experts and market analysts have provided detailed perspectives on ${topic}. Their comprehensive analysis covers market dynamics, investment opportunities, risk factors, and strategic considerations for different types of investors.",
    recommendations: "Based on thorough analysis of ${topic}, several strategic recommendations emerge for investors and financial planners. These insights are designed to help navigate current market conditions while maximizing opportunities and managing potential risks effectively.",
    conclusion: "The developments in ${topic} represent a transformative period in financial markets. As we move forward, staying informed about these changes and their implications will be crucial for making sound investment decisions and achieving long-term financial goals."
  },
  {
    intro: "In today's rapidly evolving financial markets, ${topic} has become increasingly important for both individual and institutional investors. This detailed examination explores the current state, future prospects, and strategic implications of this critical financial area.",
    overview: "The current landscape of ${topic} presents unique opportunities and challenges that require careful analysis and strategic planning. Market participants are actively adapting to these changes, which could have lasting implications for investment strategies and portfolio management.",
    insights: "Comprehensive market analysis of ${topic} reveals several key trends and patterns that investors should consider. These insights provide valuable guidance for understanding market dynamics and identifying strategic investment opportunities.",
    analysis: "Leading financial experts and market analysts have conducted extensive research on ${topic}. Their findings offer critical insights into market trends, investment opportunities, risk management strategies, and future market developments.",
    recommendations: "Drawing from expert analysis of ${topic}, several strategic recommendations have emerged for investors and financial professionals. These guidelines are designed to help optimize investment strategies while effectively managing market risks and uncertainties.",
    conclusion: "The ongoing developments in ${topic} signal important changes in the financial landscape. Understanding these trends and their implications will be essential for investors seeking to navigate current market conditions and achieve their financial objectives."
  },
  {
    intro: "As financial markets continue to evolve, ${topic} has emerged as a key area of interest for investors and financial planners. This in-depth analysis examines the current trends, market dynamics, and strategic considerations that are shaping this important financial sector.",
    overview: "The evolving landscape of ${topic} is creating new opportunities and challenges for market participants. Industry professionals and financial experts are closely monitoring these developments, which could significantly impact investment strategies and financial planning approaches.",
    insights: "Recent market analysis of ${topic} has uncovered several important trends and patterns. These findings provide essential context for understanding market movements and identifying potential investment opportunities in today's dynamic financial environment.",
    analysis: "Financial experts and market analysts have provided comprehensive insights into ${topic}. Their detailed analysis covers market trends, investment opportunities, risk factors, and strategic considerations for various types of investors and financial professionals.",
    recommendations: "Based on thorough analysis of ${topic}, several strategic recommendations have been developed for investors and financial planners. These insights are designed to help optimize investment strategies while effectively managing risks and maximizing opportunities.",
    conclusion: "The developments in ${topic} represent a significant evolution in financial markets. Staying informed about these changes and their implications will be crucial for investors seeking to make informed decisions and achieve their long-term financial objectives."
  }
];

// Different FAQ templates for variety
const FAQ_TEMPLATES = [
  [
    { question: "What are the key factors driving ${topic}?", answer: "The key factors include market dynamics, regulatory changes, technological innovations, and evolving investor preferences that are collectively shaping the landscape of ${topic}." },
    { question: "How can investors benefit from ${topic}?", answer: "Investors can benefit by understanding market trends, identifying strategic opportunities, diversifying portfolios, and implementing risk management strategies aligned with ${topic} developments." },
    { question: "What risks should investors consider with ${topic}?", answer: "Investors should consider market volatility, regulatory changes, economic uncertainties, and the need for proper diversification when engaging with ${topic} opportunities." },
    { question: "What is the long-term outlook for ${topic}?", answer: "The long-term outlook suggests continued evolution with opportunities for growth, though success will depend on staying informed about market changes and adapting strategies accordingly." }
  ],
  [
    { question: "Why is ${topic} important for financial planning?", answer: "${topic} is crucial because it represents significant opportunities and risks that can impact investment returns, portfolio performance, and overall financial planning strategies." },
    { question: "What strategies work best for ${topic}?", answer: "Effective strategies include thorough research, diversification, risk management, and staying updated with market developments and expert insights related to ${topic}." },
    { question: "How does ${topic} affect different types of investors?", answer: "Different investors may be affected differently based on their risk tolerance, investment goals, and portfolio composition when considering ${topic} opportunities." },
    { question: "What should investors watch for in ${topic}?", answer: "Investors should monitor market trends, regulatory developments, technological changes, and expert analysis to make informed decisions about ${topic} opportunities." }
  ],
  [
    { question: "What makes ${topic} unique in today's market?", answer: "${topic} stands out due to its current market relevance, growth potential, and the unique opportunities it presents for investors seeking to diversify and optimize their portfolios." },
    { question: "How can beginners approach ${topic}?", answer: "Beginners should start with education, research, and potentially consulting with financial advisors to understand the basics and develop appropriate strategies for ${topic}." },
    { question: "What are the current trends in ${topic}?", answer: "Current trends include technological innovation, regulatory evolution, changing investor preferences, and market dynamics that are reshaping the landscape of ${topic}." },
    { question: "What resources are available for learning about ${topic}?", answer: "Resources include financial publications, expert analysis, market reports, educational materials, and professional financial advisors who can provide guidance on ${topic}." }
  ]
];

// Simple HTTP request function
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AutoBlogGenerator/1.0)'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Simple XML parser for RSS feeds
function parseRSSFeed(xmlText) {
  const items = [];
  
  // Extract items using regex (simple but effective for RSS)
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match;
  
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];
    
    // Extract title
    const titleMatch = itemContent.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Financial News Update';
    
    // Extract description
    const descMatch = itemContent.match(/<description[^>]*>([^<]+)<\/description>/i);
    const description = descMatch ? descMatch[1].trim() : 'Latest financial market update';
    
    // Extract link
    const linkMatch = itemContent.match(/<link[^>]*>([^<]+)<\/link>/i);
    const link = linkMatch ? linkMatch[1].trim() : '';
    
    // Extract pubDate
    const dateMatch = itemContent.match(/<pubDate[^>]*>([^<]+)<\/pubDate>/i);
    const pubDate = dateMatch ? dateMatch[1].trim() : new Date().toISOString();
    
    items.push({
      title,
      description,
      link,
      pubDate,
      source: 'RSS Feed'
    });
  }
  
  return items;
}

async function fetchRSSFeed(url) {
  try {
    console.log(`📡 Fetching RSS feed: ${url}`);
    const xmlText = await makeRequest(url);
    const items = parseRSSFeed(xmlText);
    console.log(`✅ Fetched ${items.length} items from ${url}`);
    return items;
  } catch (error) {
    console.error(`❌ Error fetching ${url}:`, error.message);
    return [];
  }
}

async function fetchAllRSSFeeds() {
  const allItems = [];
  
  for (const feedUrl of RSS_FEEDS) {
    try {
      const items = await fetchRSSFeed(feedUrl);
      allItems.push(...items);
    } catch (error) {
      console.error(`Failed to fetch ${feedUrl}:`, error.message);
    }
  }
  
  // Sort by publication date (newest first)
  return allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

function extractCategories(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const categories = [
    'Finance', 'Investment', 'Banking', 'Economy', 'Markets', 'Personal Finance',
    'Insurance', 'Taxation', 'Loans', 'Credit', 'Savings', 'Retirement Planning',
    'Wealth Management', 'Financial Planning', 'Budgeting', 'Trading', 'Portfolio Management'
  ];
  
  return categories.filter(category => text.includes(category.toLowerCase())).slice(0, 5) || ['Finance', 'Investment', 'Markets'];
}

function extractKeywords(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const keywords = [
    'finance', 'investment', 'money', 'banking', 'economy', 'market', 'stock', 'mutual fund',
    'insurance', 'tax', 'loan', 'credit', 'savings', 'retirement', 'wealth', 'financial planning',
    'budget', 'expense', 'income', 'profit', 'loss', 'trading', 'portfolio', 'asset', 'liability',
    'interest rate', 'inflation', 'GDP', 'RBI', 'SEBI', 'NSE', 'BSE', 'India', 'Indian economy'
  ];
  
  return keywords.filter(keyword => text.includes(keyword)).slice(0, 10) || ['finance', 'investment', 'money', 'banking', 'economy'];
}

function getCoverImage(title) {
  const keywords = title.toLowerCase().split(' ');
  const imageMap = {
    'finance': 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'money': 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'investment': 'https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'banking': 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'economy': 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'market': 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'stock': 'https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'crypto': 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  };
  
  for (const keyword of keywords) {
    if (imageMap[keyword]) {
      return imageMap[keyword];
    }
  }
  
  return imageMap['finance'];
}

function generateBlogContent(rssItem, blogId) {
  const slug = rssItem.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').substring(0, 60);
  const categories = extractCategories(rssItem.title, rssItem.description);
  const keywords = extractKeywords(rssItem.title, rssItem.description);
  const coverImage = getCoverImage(rssItem.title);
  
  // Select random template for variety
  const templateIndex = Math.floor(Math.random() * CONTENT_TEMPLATES.length);
  const faqIndex = Math.floor(Math.random() * FAQ_TEMPLATES.length);
  const template = CONTENT_TEMPLATES[templateIndex];
  const faqTemplate = FAQ_TEMPLATES[faqIndex];
  
  // Use the actual RSS title as the topic
  const topic = rssItem.title;
  
  return `import { BlogPost } from './types';

export const blog${blogId}: BlogPost = {
  id: ${blogId},
  slug: '${slug}',
  title: '${topic}: Complete Analysis and Strategic Insights',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: 'https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png',
  authorBio: 'Harsh Raj is a B.Tech graduate and software engineer who shares educational finance content. Not a financial expert—please consult authorized professionals for advice.',
  metaDescription: 'Comprehensive analysis of ${topic.toLowerCase()}. Discover the latest trends, expert insights, and strategic recommendations for informed financial decision-making.',
  excerpt: '${rssItem.description}',
  categories: ${JSON.stringify(categories)},
  keywords: ${JSON.stringify(keywords)},
  date: '${new Date().toISOString().split('T')[0]}',
  coverImage: '${coverImage}',
  content: [
    { type: 'heading', content: '${topic}: Complete Analysis and Strategic Insights' },
    { type: 'paragraph', content: '${template.intro.replace(/\${topic}/g, topic)}' },
    { type: 'heading', content: 'Market Overview and Current Trends' },
    { type: 'paragraph', content: '${template.overview.replace(/\${topic}/g, topic)}' },
    { type: 'heading', content: 'Key Insights and Analysis' },
    { type: 'paragraph', content: '${template.insights.replace(/\${topic}/g, topic)}' },
    { type: 'list', items: [
      'Market dynamics and investment opportunities',
      'Risk assessment and management strategies',
      'Long-term planning considerations',
      'Expert recommendations and best practices',
      'Regulatory and compliance requirements'
    ]},
    { type: 'heading', content: 'Detailed Analysis and Expert Opinions' },
    { type: 'paragraph', content: '${template.analysis.replace(/\${topic}/g, topic)}' },
    { type: 'paragraph', content: 'Industry professionals and financial experts emphasize the importance of understanding these developments and their implications for different types of investors. The consensus suggests that staying informed and adapting strategies accordingly will be crucial for success in this evolving landscape.' },
    { type: 'heading', content: 'Strategic Recommendations and Best Practices' },
    { type: 'paragraph', content: '${template.recommendations.replace(/\${topic}/g, topic)}' },
    { type: 'heading', content: 'Conclusion and Future Outlook' },
    { type: 'paragraph', content: '${template.conclusion.replace(/\${topic}/g, topic)}' },
    { type: 'paragraph', content: 'As the financial landscape continues to evolve, understanding and adapting to changes in ${topic.toLowerCase()} will be essential for investors seeking to optimize their portfolios and achieve their financial objectives. The key is to maintain a balanced approach that considers both current opportunities and long-term strategic planning.' }
  ],
  featuredImage: '${coverImage}',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  publishedDate: '${new Date().toISOString()}',
  lastModified: '${new Date().toISOString()}',
  readingTime: 6,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${topic}: Complete Analysis and Strategic Insights",
    "description": "Comprehensive analysis of ${topic.toLowerCase()}. Discover the latest trends, expert insights, and strategic recommendations for informed financial decision-making.",
    "author": {
      "@type": "Person",
      "name": "Harsh Raj",
      "url": "https://moneycal.in/author/harsh-raj"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moneycal.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moneycal.in/images/logo.png"
      }
    },
    "mainEntityOfPage": "https://moneycal.in/blog/${slug}",
    "articleSection": "${categories.join(', ')}",
    "keywords": "${keywords.join(', ')}",
    "wordCount": 1200,
    "timeRequired": "PT6M",
    "inLanguage": "en-IN",
    "isAccessibleForFree": true,
    "datePublished": "${new Date().toISOString()}",
    "dateModified": "${new Date().toISOString()}"
  },
  faqSchema: ${JSON.stringify(faqTemplate.map(faq => ({
    question: faq.question.replace(/\${topic}/g, topic),
    answer: faq.answer.replace(/\${topic}/g, topic)
  })))},
  openGraph: {
    title: "${topic}: Complete Analysis and Strategic Insights",
    description: "Comprehensive analysis of ${topic.toLowerCase()}. Discover the latest trends, expert insights, and strategic recommendations for informed financial decision-making.",
    image: "${coverImage}",
    url: "https://moneycal.in/blog/${slug}",
    type: "article",
    siteName: "Moneycal.in"
  },
  discoverOptimized: {
    highQualityImages: false,
    originalReporting: true,
    expertiseSignals: true,
    freshContent: true
  }
};

export default blog${blogId};`;
}

function updateIndexFile(startId, count) {
  const indexFile = path.join(process.cwd(), 'src', 'data', 'blogs', 'index.ts');
  
  let importLines = ["import { blog651 } from './651';"];
  let exportLines = ["export { blog651 } from './651';"];
  let blogArrayItems = ["blog651"];
  
  for (let i = 0; i < count; i++) {
    const blogId = startId + i;
    importLines.push(`import { blog${blogId} } from './${blogId}';`);
    exportLines.push(`export { blog${blogId} } from './${blogId}';`);
    blogArrayItems.push(`blog${blogId}`);
  }
  
  const newIndexContent = `import { BlogPost } from './types';

// Auto-generated blog imports
${importLines.join('\n')}

// Auto-generated blog array
export const blogs: BlogPost[] = [
  ${blogArrayItems.join(',\n  ')},
];

// Auto-update blog dates
export function autoUpdateBlogDates() {
  const currentDate = new Date().toISOString().split('T')[0];
  blogs.forEach(blog => {
    if (blog.lastModified !== currentDate) {
      blog.lastModified = currentDate;
    }
  });
}

// Export individual blogs
${exportLines.join('\n')}
`;
  
  fs.writeFileSync(indexFile, newIndexContent, 'utf8');
}

async function generateBlogs() {
  try {
    console.log('📡 Fetching RSS feeds...');
    const rssItems = await fetchAllRSSFeeds();
    
    if (rssItems.length === 0) {
      console.log('⚠️ No RSS items fetched, using fallback topics...');
      // Create fallback items from topics
      for (let i = 0; i < 20; i++) {
        const topic = FINANCE_TOPICS[i % FINANCE_TOPICS.length];
        rssItems.push({
          title: `${topic} Trends and Opportunities`,
          description: `Comprehensive analysis of ${topic.toLowerCase()} trends and opportunities`,
          link: `https://example.com/${topic.toLowerCase().replace(/\s+/g, '-')}`,
          pubDate: new Date().toISOString(),
          source: 'Auto Generated'
        });
      }
    }

    console.log(`✅ Total RSS items available: ${rssItems.length}`);

    // Generate blog posts
    const blogsDir = path.join(process.cwd(), 'src', 'data', 'blogs');
    const startId = 652; // Starting blog ID
    const blogsToGenerate = Math.min(20, rssItems.length);

    for (let i = 0; i < blogsToGenerate; i++) {
      const blogId = startId + i;
      const rssItem = rssItems[i];
      
      const blogContent = generateBlogContent(rssItem, blogId);
      const filename = `${blogId}.ts`;
      const filepath = path.join(blogsDir, filename);
      
      fs.writeFileSync(filepath, blogContent, 'utf8');
      console.log(`📄 Created blog file: ${filename}`);
    }

    // Update index.ts
    updateIndexFile(startId, blogsToGenerate);
    console.log('📝 Updated index.ts file');

    return true;
  } catch (error) {
    console.error('❌ Error generating blogs:', error);
    return false;
  }
}

// Run the blog generation
generateBlogs().then(success => {
  if (success) {
    console.log('🎉 Blog generation completed successfully!');
    process.exit(0);
  } else {
    console.log('❌ Blog generation failed!');
    process.exit(1);
  }
});
