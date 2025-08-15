#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const xml2js = require('xml2js');
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
  671: 'Hybrid Fund Investment Strategies'
};

// Function to fetch news from RSS feeds
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
      
      if (result.rss && result.rss.channel && result.rss.channel[0].item) {
        const items = result.rss.channel[0].item.slice(0, 4); // Get latest 4 items
        items.forEach(item => {
          allNews.push({
            title: item.title ? item.title[0] : '',
            description: item.description ? item.description[0] : '',
            link: item.link ? item.link[0] : '',
            pubDate: item.pubDate ? item.pubDate[0] : new Date().toISOString(),
            source: feedUrl
          });
        });
      }
    } catch (error) {
      console.error(`Error fetching from ${feedUrl}:`, error.message);
    }
  }
  
  return allNews;
}

// Function to get next blog ID
function getNextBlogId() {
  const blogsDir = path.join(__dirname, 'src', 'data', 'blogs');
  const files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');
  
  if (files.length === 0) {
    return 652; // Start from 652
  }
  
  const ids = files.map(file => {
    const num = parseInt(file.replace('.ts', ''));
    return isNaN(num) ? 0 : num;
  }).filter(id => id > 0);
  
  if (ids.length === 0) {
    return 652;
  }
  
  return Math.max(...ids) + 1;
}

// Function to generate blog content
function generateBlogContent(topic, newsItems, blogId) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `import { BlogPost } from '../types';

export const blog${blogId}: BlogPost = {
  id: ${blogId},
  slug: '${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}',
  title: '${topic}',
  author: 'Finance Expert',
  authorTitle: 'Financial Analyst',
  authorImage: 'https://moneycal.in/images/authors/finance-expert.jpg',
  authorBio: 'Experienced financial analyst with expertise in Indian markets and investment strategies.',
  metaDescription: 'Comprehensive guide on ${topic.toLowerCase()}. Learn about the latest trends, strategies, and opportunities in the Indian financial market.',
  excerpt: 'Discover the latest insights and strategies for ${topic.toLowerCase()}. This comprehensive guide covers everything you need to know about making informed financial decisions.',
  categories: ['Investment', 'Finance', 'India'],
  keywords: ['${topic.toLowerCase()}', 'investment', 'finance', 'india', 'financial planning'],
  date: '${currentDate}',
  coverImage: 'https://moneycal.in/images/blogs/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg',
  content: [
    { type: 'heading', content: '${topic}' },
    { type: 'paragraph', content: 'The Indian financial market is experiencing significant changes in 2025, with new opportunities emerging for savvy investors. This comprehensive guide explores the latest trends and strategies for ${topic.toLowerCase()}.' },
    { type: 'heading', content: 'Current Market Trends' },
    { type: 'paragraph', content: 'Recent developments in the Indian financial sector have created new opportunities for investors. Understanding these trends is crucial for making informed investment decisions.' },
    { type: 'heading', content: 'Key Investment Strategies' },
    { type: 'list', items: [
      'Diversify your portfolio across different asset classes',
      'Focus on long-term investment goals',
      'Stay updated with market news and trends',
      'Consider tax implications of your investments',
      'Regularly review and rebalance your portfolio'
    ]},
    { type: 'heading', content: 'Risk Management' },
    { type: 'paragraph', content: 'Effective risk management is essential for successful investing. Always consider your risk tolerance and investment horizon before making decisions.' },
    { type: 'heading', content: 'Conclusion' },
    { type: 'paragraph', content: '${topic} offers significant opportunities for Indian investors. By following sound investment principles and staying informed about market trends, you can build a strong financial foundation for the future.' }
  ],
  featuredImage: 'https://moneycal.in/images/blogs/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-featured.jpg',
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 5,
  schema: {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "${topic}",
    "image": [
      "https://moneycal.in/images/blogs/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg"
    ],
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "Finance Expert",
      "url": "https://moneycal.in/author/finance-expert"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Moneycal.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://moneycal.in/images/logo.png"
      }
    },
    "mainEntityOfPage": "https://moneycal.in/blog/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    "articleSection": "Investment, Finance, India",
    "keywords": "${topic.toLowerCase()}, investment, finance, india, financial planning",
    "wordCount": 1200,
    "timeRequired": "PT5M",
    "inLanguage": "en-IN",
    "isAccessibleForFree": true
  },
  faqSchema: [
    { question: 'What are the key factors to consider for ${topic.toLowerCase()}?', answer: 'Key factors include market trends, risk tolerance, investment horizon, and tax implications.' },
    { question: 'How can I start investing in this area?', answer: 'Start by researching the market, understanding your goals, and consulting with financial advisors.' },
    { question: 'What are the risks involved?', answer: 'All investments carry some risk. It\'s important to diversify and understand your risk tolerance.' },
    { question: 'How often should I review my investments?', answer: 'Regular reviews, at least quarterly, help ensure your portfolio aligns with your goals.' }
  ],
  openGraph: {
    title: "${topic}",
    description: "Comprehensive guide on ${topic.toLowerCase()}. Learn about the latest trends, strategies, and opportunities in the Indian financial market.",
    image: "https://moneycal.in/images/blogs/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg",
    url: "https://moneycal.in/blog/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    type: "article",
    siteName: "Moneycal.in"
  },
  discoverOptimized: {
    highQualityImages: true,
    originalReporting: true,
    expertiseSignals: true,
    freshContent: true
  }
};

export default blog${blogId};`;
}

// Function to update sitemap
function updateSitemap(blogId, slug) {
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  const currentDate = new Date().toISOString().split('T')[0];
  
  const newUrl = `    <url>
      <loc>https://moneycal.in/blog/${slug}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
  
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  // Insert new URL before the closing </urlset> tag
  sitemapContent = sitemapContent.replace('</urlset>', `${newUrl}\n</urlset>`);
  
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log(`✅ Updated sitemap with new blog: ${slug}`);
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting manual blog generation...');
    
    // Fetch news from RSS feeds
    const newsItems = await fetchRSSFeeds();
    console.log(`📰 Fetched ${newsItems.length} news items from RSS feeds`);
    
    // Generate 5 new blog posts
    for (let i = 0; i < 5; i++) {
      const blogId = getNextBlogId();
      const topic = BLOG_TOPICS[blogId] || `Financial Investment Guide ${blogId}`;
      
      console.log(`📝 Generating blog ${blogId}: ${topic}`);
      
      // Generate blog content
      const blogContent = generateBlogContent(topic, newsItems, blogId);
      
      // Write blog file
      const blogPath = path.join(__dirname, 'src', 'data', 'blogs', `${blogId}.ts`);
      fs.writeFileSync(blogPath, blogContent);
      
      // Update sitemap
      const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      updateSitemap(blogId, slug);
      
      console.log(`✅ Generated blog ${blogId}: ${topic}`);
    }
    
    console.log('🎉 Manual blog generation completed successfully!');
    console.log('📊 Generated 5 new blog posts');
    console.log('🌐 Updated sitemap.xml');
    console.log('💡 Next steps:');
    console.log('   1. Review the generated blog posts');
    console.log('   2. Commit and push changes to GitHub');
    console.log('   3. Deploy to your hosting platform');
    
  } catch (error) {
    console.error('❌ Error during blog generation:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, fetchRSSFeeds, generateBlogContent };
