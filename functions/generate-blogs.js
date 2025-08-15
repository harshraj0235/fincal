// functions/generate-blogs.js
export default {
  async scheduled(event, env, ctx) {
    console.log('🚀 Starting automated blog generation...');
    
    try {
      // Fetch RSS feeds
      const rssFeeds = [
        'https://www.moneycontrol.com/rss/business.xml',
        'https://economictimes.indiatimes.com/rssfeeds/837555174.cms',
        'https://www.livemint.com/rss/money',
        'https://in.investing.com/rss/news.rss'
      ];
      
      // Generate blog content
      const blogContent = await generateBlogContent(rssFeeds);
      
      // Update GitHub repository via GitHub API
      await updateGitHubRepository(blogContent, env.GITHUB_TOKEN);
      
      console.log('✅ Blog generation completed successfully');
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Blogs generated successfully',
        timestamp: new Date().toISOString(),
        blogsGenerated: 5
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('❌ Error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};

async function generateBlogContent(rssFeeds) {
  const allNews = [];
  
  for (const feedUrl of rssFeeds) {
    try {
      console.log(`Fetching from: ${feedUrl}`);
      const response = await fetch(feedUrl);
      const xmlText = await response.text();
      
      // Parse XML and extract news items
      const newsItems = parseRSSFeed(xmlText);
      allNews.push(...newsItems.slice(0, 4));
    } catch (error) {
      console.error(`Error fetching from ${feedUrl}:`, error.message);
    }
  }
  
  // Generate blog topics
  const blogTopics = [
    'Indian Stock Market Analysis 2025',
    'Cryptocurrency Investment Guide India',
    'Real Estate Investment Trends 2025',
    'Mutual Fund Investment Strategies',
    'Gold Investment Opportunities India'
  ];
  
  const blogs = [];
  for (let i = 0; i < 5; i++) {
    const blogId = 657 + i; // Start from 657
    const topic = blogTopics[i];
    
    blogs.push({
      id: blogId,
      title: topic,
      content: generateBlogPostContent(topic, allNews),
      slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      date: new Date().toISOString().split('T')[0]
    });
  }
  
  return blogs;
}

function parseRSSFeed(xmlText) {
  // Simple XML parsing for RSS feeds
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemContent = match[1];
    const title = extractTag(itemContent, 'title');
    const description = extractTag(itemContent, 'description');
    const link = extractTag(itemContent, 'link');
    
    if (title) {
      items.push({ title, description, link });
    }
  }
  
  return items;
}

function extractTag(content, tagName) {
  const regex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`);
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function generateBlogPostContent(topic, newsItems) {
  return `# ${topic}

The Indian financial market is experiencing significant changes in 2025, with new opportunities emerging for savvy investors. This comprehensive guide explores the latest trends and strategies for ${topic.toLowerCase()}.

## Current Market Trends

Recent developments in the Indian financial sector have created new opportunities for investors. Understanding these trends is crucial for making informed investment decisions.

## Key Investment Strategies

- Diversify your portfolio across different asset classes
- Focus on long-term investment goals
- Stay updated with market news and trends
- Consider tax implications of your investments
- Regularly review and rebalance your portfolio

## Risk Management

Effective risk management is essential for successful investing. Always consider your risk tolerance and investment horizon before making decisions.

## Conclusion

${topic} offers significant opportunities for Indian investors. By following sound investment principles and staying informed about market trends, you can build a strong financial foundation for the future.`;
}

async function updateGitHubRepository(blogs, githubToken) {
  if (!githubToken) {
    console.log('⚠️ No GitHub token provided, skipping repository update');
    return;
  }
  
  try {
    // Create new blog files
    for (const blog of blogs) {
      const fileName = `${blog.id}.ts`;
      const fileContent = `import { BlogPost } from '../types';

export const blog${blog.id}: BlogPost = {
  id: ${blog.id},
  slug: '${blog.slug}',
  title: '${blog.title}',
  author: 'Finance Expert',
  authorTitle: 'Financial Analyst',
  metaDescription: 'Comprehensive guide on ${blog.title.toLowerCase()}.',
  excerpt: 'Discover the latest insights and strategies for ${blog.title.toLowerCase()}.',
  categories: ['Investment', 'Finance', 'India'],
  keywords: ['${blog.title.toLowerCase()}', 'investment', 'finance', 'india'],
  date: '${blog.date}',
  content: [
    { type: 'heading', content: '${blog.title}' },
    { type: 'paragraph', content: '${blog.content.replace(/'/g, "\\'")}' }
  ],
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 5
};

export default blog${blog.id};`;

      // Use GitHub API to create/update file
      await createGitHubFile(fileName, fileContent, githubToken);
    }
    
    console.log('✅ GitHub repository updated successfully');
  } catch (error) {
    console.error('❌ Error updating GitHub repository:', error);
  }
}

async function createGitHubFile(fileName, content, token) {
  const response = await fetch(`https://api.github.com/repos/harshraj0235/fincal/contents/src/data/blogs/${fileName}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Cloudflare-Worker'
    },
    body: JSON.stringify({
      message: `🤖 Auto-generated blog post: ${fileName}`,
      content: btoa(content), // Base64 encode content
      branch: 'main'
    })
  });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}
