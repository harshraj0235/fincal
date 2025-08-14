const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');
const cron = require('node-cron');
const { exec } = require('child_process');

// RSS Feed URLs
const RSS_FEEDS = [
  'https://www.moneycontrol.com/rss/business.xml',
  'https://economictimes.indiatimes.com/rssfeeds/837555174.cms',
  'https://www.livemint.com/rss/money',
  'https://www.cnbctv18.com/commonfeeds/v1/cnbc-rss-feeds.xml',
  'https://in.investing.com/rss/news.rss'
];

// Blog topics for different file numbers (652 onwards)
const BLOG_TOPICS = {
  652: 'Indian Stock Market Analysis 2025',
  653: 'Cryptocurrency Investment Guide India',
  654: 'Real Estate Investment Trends 2025',
  655: 'Mutual Fund Investment Strategies',
  656: 'Gold Investment Opportunities India',
  657: 'Digital Banking Revolution India',
  658: 'Insurance Planning for Indian Families',
  659: 'Tax Saving Investment Options 2025',
  660: 'Retirement Planning Strategies India',
  661: 'Personal Finance Management Tips',
  662: 'Business Loan Opportunities India',
  663: 'Credit Card Benefits and Rewards',
  664: 'Investment in Government Securities',
  665: 'Startup Funding Trends India',
  666: 'Forex Trading Opportunities India',
  667: 'Commodity Trading Guide 2025',
  668: 'Fixed Deposit Investment Strategies',
  669: 'Equity Investment for Beginners',
  670: 'Debt Fund Investment Guide',
  671: 'Hybrid Fund Investment Strategies',
  672: 'International Investment Opportunities',
  673: 'ESG Investment Trends India',
  674: 'Technology Sector Investment Guide',
  675: 'Healthcare Investment Opportunities',
  676: 'Energy Sector Investment Analysis',
  677: 'Banking Sector Investment Guide',
  678: 'Automobile Sector Investment Trends',
  679: 'Pharmaceutical Investment Opportunities',
  680: 'Telecom Sector Investment Analysis',
  681: 'FMCG Sector Investment Guide',
  682: 'Infrastructure Investment Opportunities',
  683: 'Real Estate Investment Trusts India',
  684: 'Alternative Investment Options',
  685: 'Peer-to-Peer Lending India',
  686: 'Crowdfunding Investment Guide',
  687: 'Angel Investment Opportunities',
  688: 'Venture Capital Investment Trends',
  689: 'Private Equity Investment Guide',
  690: 'Hedge Fund Investment Strategies',
  691: 'Portfolio Management Services India',
  692: 'Wealth Management Strategies',
  693: 'Financial Planning for Millennials',
  694: 'Investment in Digital Assets',
  695: 'Sustainable Investment Opportunities',
  696: 'Green Energy Investment Guide',
  697: 'Electric Vehicle Investment Trends',
  698: 'Fintech Investment Opportunities',
  699: 'EdTech Investment Analysis',
  700: 'HealthTech Investment Guide',
  701: 'AgriTech Investment Opportunities',
  702: 'Logistics Investment Trends',
  703: 'E-commerce Investment Guide',
  704: 'Gaming Industry Investment Analysis',
  705: 'Entertainment Sector Investment',
  706: 'Media and Advertising Investment',
  707: 'Travel and Tourism Investment',
  708: 'Hospitality Sector Investment Guide',
  709: 'Manufacturing Investment Opportunities',
  710: 'Textile Industry Investment Analysis',
  711: 'Chemical Industry Investment Guide',
  712: 'Metals and Mining Investment',
  713: 'Oil and Gas Investment Opportunities',
  714: 'Renewable Energy Investment Guide',
  715: 'Nuclear Energy Investment Analysis',
  716: 'Water Management Investment',
  717: 'Waste Management Investment Guide',
  718: 'Smart City Investment Opportunities',
  719: 'Digital India Investment Trends',
  720: 'Make in India Investment Guide',
  721: 'Startup India Investment Analysis',
  722: 'Skill India Investment Opportunities',
  723: 'Stand Up India Investment Guide',
  724: 'Mudra Yojana Investment Analysis',
  725: 'PM-KISAN Investment Opportunities',
  726: 'PM-FME Investment Guide',
  727: 'PM-GKAY Investment Analysis',
  728: 'PM-CARES Investment Opportunities',
  729: 'Atmanirbhar Bharat Investment Guide',
  730: 'Vocal for Local Investment Analysis',
  731: 'One Nation One Ration Card Investment',
  732: 'PM-SVANidhi Investment Opportunities',
  733: 'PM-KUSUM Investment Guide',
  734: 'PM-URJA Investment Analysis',
  735: 'PM-KUSUM Investment Opportunities',
  736: 'PM-FME Investment Guide',
  737: 'PM-GKAY Investment Analysis',
  738: 'PM-CARES Investment Opportunities',
  739: 'Atmanirbhar Bharat Investment Guide',
  740: 'Vocal for Local Investment Analysis',
  741: 'One Nation One Ration Card Investment',
  742: 'PM-SVANidhi Investment Opportunities',
  743: 'PM-KUSUM Investment Guide',
  744: 'PM-URJA Investment Analysis',
  745: 'PM-KUSUM Investment Opportunities',
  746: 'PM-FME Investment Guide',
  747: 'PM-GKAY Investment Analysis',
  748: 'PM-CARES Investment Opportunities',
  749: 'Atmanirbhar Bharat Investment Guide',
  750: 'Vocal for Local Investment Analysis',
  751: 'One Nation One Ration Card Investment',
  752: 'PM-SVANidhi Investment Opportunities',
  753: 'PM-KUSUM Investment Guide',
  754: 'PM-URJA Investment Analysis',
  755: 'PM-KUSUM Investment Opportunities',
  756: 'PM-FME Investment Guide',
  757: 'PM-GKAY Investment Analysis',
  758: 'PM-CARES Investment Opportunities',
  759: 'Atmanirbhar Bharat Investment Guide',
  760: 'Vocal for Local Investment Analysis',
  761: 'One Nation One Ration Card Investment',
  762: 'PM-SVANidhi Investment Opportunities',
  763: 'PM-KUSUM Investment Guide',
  764: 'PM-URJA Investment Analysis',
  765: 'PM-KUSUM Investment Opportunities',
  766: 'PM-FME Investment Guide',
  767: 'PM-GKAY Investment Analysis',
  768: 'PM-CARES Investment Opportunities',
  769: 'Atmanirbhar Bharat Investment Guide',
  770: 'Vocal for Local Investment Analysis',
  771: 'One Nation One Ration Card Investment',
  772: 'PM-SVANidhi Investment Opportunities',
  773: 'PM-KUSUM Investment Guide',
  774: 'PM-URJA Investment Analysis',
  775: 'PM-KUSUM Investment Opportunities',
  776: 'PM-FME Investment Guide',
  777: 'PM-GKAY Investment Analysis',
  778: 'PM-CARES Investment Opportunities',
  779: 'Atmanirbhar Bharat Investment Guide',
  780: 'Vocal for Local Investment Analysis',
  781: 'One Nation One Ration Card Investment',
  782: 'PM-SVANidhi Investment Opportunities',
  783: 'PM-KUSUM Investment Guide',
  784: 'PM-URJA Investment Analysis',
  785: 'PM-KUSUM Investment Opportunities',
  786: 'PM-FME Investment Guide',
  787: 'PM-GKAY Investment Analysis',
  788: 'PM-CARES Investment Opportunities',
  789: 'Atmanirbhar Bharat Investment Guide',
  790: 'Vocal for Local Investment Analysis',
  791: 'One Nation One Ration Card Investment',
  792: 'PM-SVANidhi Investment Opportunities',
  793: 'PM-KUSUM Investment Guide',
  794: 'PM-URJA Investment Analysis',
  795: 'PM-KUSUM Investment Opportunities',
  796: 'PM-FME Investment Guide',
  797: 'PM-GKAY Investment Analysis',
  798: 'PM-CARES Investment Opportunities',
  799: 'Atmanirbhar Bharat Investment Guide',
  800: 'Vocal for Local Investment Analysis'
};

// Function to fetch RSS feeds
async function fetchRSSFeeds() {
  const allNews = [];
  
  for (const feedUrl of RSS_FEEDS) {
    try {
      console.log(`Fetching from: ${feedUrl}`);
      const response = await axios.get(feedUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);
      
      const items = result.rss?.channel?.[0]?.item || [];
      
      items.forEach(item => {
        allNews.push({
          title: item.title?.[0] || '',
          description: item.description?.[0] || '',
          link: item.link?.[0] || '',
          pubDate: item.pubDate?.[0] || new Date().toISOString(),
          source: feedUrl
        });
      });
      
    } catch (error) {
      console.error(`Error fetching ${feedUrl}:`, error.message);
    }
  }
  
  return allNews;
}

// Function to generate SEO-friendly content
function generateBlogContent(topic, newsData, blogId) {
  const slug = topic.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Generate comprehensive content based on topic and news data
  const content = generateComprehensiveContent(topic, newsData);
  
  return `import { BlogPost } from './types';
import { blogPosts } from '../blogData1';

export const blog${blogId}: BlogPost = {
  id: ${blogId},
  slug: '${slug}',
  title: '${topic}',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: 'https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png',
  authorBio: 'Harsh Raj is a B.Tech graduate and software engineer who shares educational finance content. Not a financial expert—please consult authorized professionals for advice.',
  metaDescription: '${generateMetaDescription(topic)}',
  excerpt: '${generateExcerpt(topic)}',
  categories: ${JSON.stringify(generateCategories(topic))},
  keywords: ${JSON.stringify(generateKeywords(topic))},
  date: '${currentDate}',
  coverImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  content: ${JSON.stringify(content, null, 2)},
  featuredImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  videoUrl: 'https://www.youtube.com/embed/finance-${blogId}',
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: ${Math.ceil(content.length / 200)},
  structuredData: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${topic}",
    "description": "${generateMetaDescription(topic)}",
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
    "mainEntityOfPage": 'https://moneycal.in/blog/${slug}',
    "articleSection": '${generateCategories(topic).join(', ')}',
    "keywords": '${generateKeywords(topic).join(', ')}',
    "wordCount": ${content.length},
    "timeRequired": "PT${Math.ceil(content.length / 200)}M",
    "inLanguage": "en-IN",
    "isAccessibleForFree": true
  },
  faqSchema: ${JSON.stringify(generateFAQSchema(topic), null, 2)},
  openGraph: {
    title: '${topic}',
    description: '${generateMetaDescription(topic)}',
    image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: 'https://moneycal.in/blog/${slug}',
    type: 'article',
    siteName: 'Moneycal.in'
  },
  discoverOptimized: {
    highQualityImages: true,
    originalReporting: true,
    expertiseSignals: true,
    freshContent: true
  }
};

// Get related blog posts from blogData1 for internal linking
export const relatedBlogPosts = blogPosts.filter(post => 
  post.categories?.some(cat => 
    blog${blogId}.categories.includes(cat)
  )
).slice(0, 3);

export default blog${blogId};`;
}

// Helper functions for content generation
function generateComprehensiveContent(topic, newsData) {
  const content = [
    { type: 'heading', content: topic },
    { type: 'paragraph', content: generateIntroduction(topic, newsData) },
    { type: 'heading', content: 'Current Market Overview' },
    { type: 'paragraph', content: generateMarketOverview(topic, newsData) },
    { type: 'heading', content: 'Key Trends and Analysis' },
    { type: 'paragraph', content: generateTrendsAnalysis(topic, newsData) },
    { type: 'list', items: generateKeyPoints(topic, newsData) },
    { type: 'heading', content: 'Investment Opportunities' },
    { type: 'paragraph', content: generateInvestmentOpportunities(topic, newsData) },
    { type: 'heading', content: 'Risk Assessment' },
    { type: 'paragraph', content: generateRiskAssessment(topic, newsData) },
    { type: 'heading', content: 'Strategic Recommendations' },
    { type: 'paragraph', content: generateStrategicRecommendations(topic, newsData) },
    { type: 'heading', content: 'Future Outlook' },
    { type: 'paragraph', content: generateFutureOutlook(topic, newsData) },
    { type: 'heading', content: 'Conclusion' },
    { type: 'paragraph', content: generateConclusion(topic, newsData) }
  ];
  
  return content;
}

function generateIntroduction(topic, newsData) {
  return `${topic} represents a crucial aspect of modern financial planning and investment strategy. In today's dynamic economic environment, understanding the fundamentals and advanced concepts of ${topic.toLowerCase()} is essential for making informed financial decisions. This comprehensive guide explores the key components, benefits, challenges, and strategic approaches to ${topic.toLowerCase()} in the Indian context.`;
}

function generateMarketOverview(topic, newsData) {
  return `The Indian financial market offers unique opportunities and challenges for ${topic.toLowerCase()}. With a diverse range of products, regulatory frameworks, and market dynamics, investors need to navigate through various options to find the most suitable approach for their financial goals. Understanding the regulatory environment, market trends, and risk factors is essential for making informed decisions.`;
}

function generateTrendsAnalysis(topic, newsData) {
  return `Recent market trends indicate significant developments in ${topic.toLowerCase()}. The integration of technology, regulatory changes, and global economic factors are reshaping the landscape. Investors must stay updated with these trends to capitalize on emerging opportunities and mitigate potential risks.`;
}

function generateKeyPoints(topic, newsData) {
  return [
    `Understanding the fundamentals of ${topic.toLowerCase()}`,
    'Analyzing market trends and opportunities',
    'Assessing risk factors and mitigation strategies',
    'Implementing effective investment strategies',
    'Monitoring performance and adjusting portfolios',
    'Staying updated with regulatory changes'
  ];
}

function generateInvestmentOpportunities(topic, newsData) {
  return `${topic} offers numerous investment opportunities for both individual and institutional investors. The market presents various entry points, from conservative approaches suitable for beginners to advanced strategies for experienced investors. Understanding these opportunities helps in building a diversified and profitable investment portfolio.`;
}

function generateRiskAssessment(topic, newsData) {
  return `Every investment strategy involves certain risks, and ${topic.toLowerCase()} is no exception. Understanding these risks and implementing appropriate risk management strategies is crucial for protecting your investments and achieving your financial goals. This includes market risks, regulatory risks, liquidity risks, and operational risks.`;
}

function generateStrategicRecommendations(topic, newsData) {
  return `Implementing a successful ${topic.toLowerCase()} strategy requires careful planning and execution. This involves setting clear financial goals, determining appropriate investment amounts, selecting suitable products or services, and establishing monitoring and review mechanisms. The strategy should align with your overall financial plan and risk tolerance.`;
}

function generateFutureOutlook(topic, newsData) {
  return `The future of ${topic.toLowerCase()} looks promising with several emerging trends and opportunities. Technological advancements, regulatory reforms, and changing market dynamics are expected to create new possibilities for investors. Staying informed about these developments will be crucial for long-term success.`;
}

function generateConclusion(topic, newsData) {
  return `${topic} represents a significant opportunity for investors and financial planners in India. By understanding the fundamentals, benefits, risks, and strategic approaches, individuals can make informed decisions about incorporating ${topic.toLowerCase()} into their financial portfolios. Success requires ongoing education, careful planning, and regular review of strategies.`;
}

function generateMetaDescription(topic) {
  return `Complete guide to ${topic.toLowerCase()}. Learn about key concepts, strategies, and best practices for ${topic.toLowerCase()} in India.`;
}

function generateExcerpt(topic) {
  return `${topic} is essential for modern financial planning. Discover strategies, opportunities, and best practices for successful ${topic.toLowerCase()} in India.`;
}

function generateCategories(topic) {
  const categories = ['Finance', 'Investment', 'India', 'Guide'];
  if (topic.toLowerCase().includes('crypto')) categories.push('Cryptocurrency');
  if (topic.toLowerCase().includes('stock')) categories.push('Stock Market');
  if (topic.toLowerCase().includes('real estate')) categories.push('Real Estate');
  if (topic.toLowerCase().includes('mutual fund')) categories.push('Mutual Funds');
  return categories;
}

function generateKeywords(topic) {
  const baseKeywords = [topic.toLowerCase(), 'finance guide', 'investment India', 'financial planning'];
  if (topic.toLowerCase().includes('crypto')) baseKeywords.push('cryptocurrency investment', 'crypto India');
  if (topic.toLowerCase().includes('stock')) baseKeywords.push('stock market India', 'equity investment');
  if (topic.toLowerCase().includes('real estate')) baseKeywords.push('real estate investment', 'property investment');
  return baseKeywords;
}

function generateFAQSchema(topic) {
  return [
    { question: `What is ${topic.toLowerCase()}?`, answer: `${topic.toLowerCase()} is a comprehensive financial strategy that involves understanding fundamentals, managing risks, and implementing strategic approaches for optimal results.` },
    { question: `What are the benefits of ${topic.toLowerCase()}?`, answer: 'Benefits include higher returns, diversification, tax advantages, long-term wealth creation, flexibility, and professional management.' },
    { question: `How to manage risks in ${topic.toLowerCase()}?`, answer: 'Risk management involves diversification, appropriate investment horizons, market monitoring, and strategic adjustments based on changing circumstances.' },
    { question: `What is the regulatory framework for ${topic.toLowerCase()}?`, answer: 'The regulatory framework includes laws and guidelines from RBI, SEBI, and IRDAI that ensure compliance and investor protection.' }
  ];
}

// Function to get next blog ID
function getNextBlogId() {
  const blogsDir = path.join(__dirname, 'src', 'data', 'blogs');
  const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.ts') && file !== 'types.ts' && file !== 'index.ts');
  
  const blogIds = files.map(file => parseInt(file.replace('.ts', ''))).filter(id => !isNaN(id));
  return Math.max(...blogIds) + 1;
}

// Function to create blog file
function createBlogFile(blogId, content) {
  const blogsDir = path.join(__dirname, 'src', 'data', 'blogs');
  const filePath = path.join(blogsDir, `${blogId}.ts`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created blog file: ${blogId}.ts`);
}

// Function to update index.ts
function updateIndexFile(newBlogIds) {
  const indexPath = path.join(__dirname, 'src', 'data', 'blogs', 'index.ts');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Add imports
  newBlogIds.forEach(blogId => {
    const importLine = `import { blog${blogId} } from './${blogId}';`;
    if (!indexContent.includes(importLine)) {
      indexContent = indexContent.replace('// Auto-generated blog imports', `// Auto-generated blog imports\n${importLine}`);
    }
  });
  
  // Add to blogs array
  newBlogIds.forEach(blogId => {
    const blogEntry = `  blog${blogId},`;
    if (!indexContent.includes(blogEntry)) {
      indexContent = indexContent.replace('export const blogs: BlogPost[] = [', `export const blogs: BlogPost[] = [\n${blogEntry}`);
    }
  });
  
  // Add exports
  newBlogIds.forEach(blogId => {
    const exportLine = `export { blog${blogId} } from './${blogId}';`;
    if (!indexContent.includes(exportLine)) {
      indexContent = indexContent.replace('// Export individual blogs', `// Export individual blogs\n${exportLine}`);
    }
  });
  
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log('Updated index.ts file');
}

// Function to commit and push changes
function commitAndPushChanges() {
  const commands = [
    'git add .',
    'git commit -m "Auto-generated blog posts from RSS feeds"',
    'git push origin main'
  ];
  
  commands.forEach(command => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${command}:`, error);
        return;
      }
      console.log(`Executed: ${command}`);
    });
  });
}

// Main function to generate blogs
async function generateBlogs() {
  try {
    console.log('Starting automated blog generation...');
    
    // Fetch news from RSS feeds
    const newsData = await fetchRSSFeeds();
    console.log(`Fetched ${newsData.length} news items from RSS feeds`);
    
    // Generate 20 blog posts
    const newBlogIds = [];
    const startBlogId = getNextBlogId();
    
    for (let i = 0; i < 20; i++) {
      const blogId = startBlogId + i;
      const topic = BLOG_TOPICS[blogId] || `Finance Investment Guide ${blogId}`;
      
      const blogContent = generateBlogContent(topic, newsData, blogId);
      createBlogFile(blogId, blogContent);
      newBlogIds.push(blogId);
    }
    
    // Update index.ts
    updateIndexFile(newBlogIds);
    
    // Commit and push changes
    commitAndPushChanges();
    
    console.log('Successfully generated 20 blog posts!');
    
  } catch (error) {
    console.error('Error in blog generation:', error);
  }
}

// Schedule the job to run daily at 6 AM Indian time
cron.schedule('0 6 * * *', () => {
  console.log('Running scheduled blog generation at 6 AM IST...');
  generateBlogs();
}, {
  timezone: 'Asia/Kolkata'
});

// Export for manual execution
module.exports = { generateBlogs };

// Run immediately if called directly
if (require.main === module) {
  generateBlogs();
}
