const fetch = require('node-fetch');
const { parseString } = require('xml2js');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const parseXML = promisify(parseString);

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

async function fetchRSSFeed(url) {
  try {
    console.log(`📡 Fetching RSS feed: ${url}`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AutoBlogGenerator/1.0)'
      },
      timeout: 10000
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const xmlText = await response.text();
    const result = await parseXML(xmlText);
    
    const items = result.rss?.channel?.[0]?.item || [];
    console.log(`✅ Fetched ${items.length} items from ${url}`);
    
    return items.map(item => ({
      title: item.title?.[0] || 'Financial News Update',
      description: item.description?.[0] || 'Latest financial market update',
      link: item.link?.[0] || '',
      pubDate: item.pubDate?.[0] || new Date().toISOString(),
      source: url
    }));
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
  
  return `import { BlogPost } from './types';

export const blog${blogId}: BlogPost = {
  id: ${blogId},
  slug: '${slug}',
  title: '${rssItem.title} 2025: Complete Analysis and Insights',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: 'https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png',
  authorBio: 'Harsh Raj is a B.Tech graduate and software engineer who shares educational finance content. Not a financial expert—please consult authorized professionals for advice.',
  metaDescription: 'Complete analysis of ${rssItem.title.toLowerCase()}. Learn about the latest trends, insights, and expert opinions on this important financial topic.',
  excerpt: '${rssItem.description}',
  categories: ${JSON.stringify(categories)},
  keywords: ${JSON.stringify(keywords)},
  date: '${new Date().toISOString().split('T')[0]}',
  coverImage: '${coverImage}',
  content: [
    { type: 'heading', content: '${rssItem.title} 2025: Complete Analysis and Insights' },
    { type: 'paragraph', content: 'In today\\'s dynamic financial landscape, understanding the implications of ${rssItem.title.toLowerCase()} is crucial for investors, businesses, and individuals alike. This comprehensive analysis explores the latest developments, market implications, and strategic insights that can help you make informed financial decisions.' },
    { type: 'heading', content: 'Market Overview and Current Trends' },
    { type: 'paragraph', content: 'The financial markets are constantly evolving, and recent developments in ${rssItem.title.toLowerCase()} have significant implications for various sectors. Market analysts and experts are closely monitoring these changes, as they could impact investment strategies, business decisions, and economic policies.' },
    { type: 'heading', content: 'Key Insights and Analysis' },
    { type: 'paragraph', content: 'Based on the latest data and expert analysis, several key insights emerge regarding ${rssItem.title.toLowerCase()}. These insights provide valuable context for understanding the broader implications and potential opportunities in the current market environment.' },
    { type: 'list', items: [
      'Market impact and potential opportunities',
      'Risk factors and considerations for investors',
      'Long-term implications for financial planning',
      'Expert recommendations and best practices',
      'Regulatory considerations and compliance requirements'
    ]},
    { type: 'heading', content: 'Detailed Analysis and Expert Opinions' },
    { type: 'paragraph', content: 'Financial experts and market analysts have provided detailed insights into the implications of ${rssItem.title.toLowerCase()}. Their analysis covers various aspects including market dynamics, investment opportunities, risk management strategies, and future outlook.' },
    { type: 'paragraph', content: 'The consensus among industry professionals suggests that these developments could create both challenges and opportunities for different market participants. Understanding these dynamics is essential for making informed investment and business decisions.' },
    { type: 'heading', content: 'Strategic Recommendations and Best Practices' },
    { type: 'paragraph', content: 'Based on the comprehensive analysis of ${rssItem.title.toLowerCase()}, several strategic recommendations emerge for investors and businesses. These recommendations are designed to help navigate the current market environment effectively while maximizing opportunities and minimizing risks.' },
    { type: 'heading', content: 'Conclusion and Future Outlook' },
    { type: 'paragraph', content: 'The developments surrounding ${rssItem.title.toLowerCase()} represent a significant moment in the financial markets. As we move forward, it\\'s essential to stay informed about ongoing developments and their implications for various market segments.' },
    { type: 'paragraph', content: 'By understanding the current landscape and staying updated with the latest trends, investors and businesses can position themselves strategically to capitalize on opportunities while managing potential risks effectively. The key is to maintain a balanced approach that considers both short-term market dynamics and long-term strategic objectives.' }
  ],
  featuredImage: '${coverImage}',
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  publishedDate: '${new Date().toISOString()}',
  lastModified: '${new Date().toISOString()}',
  readingTime: 6,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${rssItem.title} 2025: Complete Analysis and Insights",
    "description": "Complete analysis of ${rssItem.title.toLowerCase()}. Learn about the latest trends, insights, and expert opinions on this important financial topic.",
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
  faqSchema: [
    { question: "What are the key implications of ${rssItem.title.toLowerCase()}?", answer: "The key implications include market impact, investment opportunities, risk considerations, and strategic planning requirements for various market participants." },
    { question: "How does this affect individual investors?", answer: "Individual investors should consider the impact on their portfolios, potential opportunities for diversification, and the need to review their investment strategies." },
    { question: "What should businesses consider in light of these developments?", answer: "Businesses should evaluate the impact on their operations, consider strategic adjustments, and stay informed about regulatory changes and market dynamics." },
    { question: "What are the long-term implications?", answer: "Long-term implications include potential structural changes in the market, evolving regulatory frameworks, and the need for adaptive strategies in financial planning." }
  ],
  openGraph: {
    title: "${rssItem.title} 2025: Complete Analysis and Insights",
    description: "Complete analysis of ${rssItem.title.toLowerCase()}. Learn about the latest trends, insights, and expert opinions on this important financial topic.",
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
          title: `${topic} 2025`,
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
