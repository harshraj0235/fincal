import { BlogPost } from '../data/blogs/types';

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category?: string;
}

export interface RSSFeed {
  name: string;
  url: string;
  description: string;
}

export const RSS_FEEDS: RSSFeed[] = [
  {
    name: 'Moneycontrol',
    url: 'https://www.moneycontrol.com/rss/business.xml',
    description: 'Financial news, economic trends, and personal finance'
  },
  {
    name: 'Economic Times',
    url: 'https://economictimes.indiatimes.com/rssfeeds/837555174.cms',
    description: 'Personal finance, banking, and economic policies'
  },
  {
    name: 'Mint (Livemint)',
    url: 'https://www.livemint.com/rss/money',
    description: 'Personal finance, banking, and investments'
  },
  {
    name: 'CNBC-TV18',
    url: 'https://www.cnbctv18.com/commonfeeds/v1/cnbc-rss-feeds.xml',
    description: 'Real-time financial news and global markets'
  },
  {
    name: 'Investing.com India',
    url: 'https://in.investing.com/rss/news.rss',
    description: 'Financial markets and economic news'
  }
];

export async function fetchRSSFeed(feedUrl: string): Promise<RSSItem[]> {
  try {
    const response = await fetch(feedUrl);
    const text = await response.text();
    
    // Parse XML to extract RSS items
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');
    
    const rssItems: RSSItem[] = [];
    
    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      
      rssItems.push({
        title,
        description,
        link,
        pubDate,
        source: feedUrl
      });
    });
    
    return rssItems;
  } catch (error) {
    console.error(`Error fetching RSS feed ${feedUrl}:`, error);
    return [];
  }
}

export async function fetchAllRSSFeeds(): Promise<RSSItem[]> {
  const allItems: RSSItem[] = [];
  
  for (const feed of RSS_FEEDS) {
    try {
      const items = await fetchRSSFeed(feed.url);
      allItems.push(...items);
    } catch (error) {
      console.error(`Error fetching feed ${feed.name}:`, error);
    }
  }
  
  // Sort by publication date (newest first)
  return allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}

export function getNextBlogId(): number {
  // This will be managed by the blog generation system
  // Starting from 652, incrementing by 20 each day
  const today = new Date();
  const startDate = new Date('2025-01-14'); // Starting date
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return 652 + (daysDiff * 20);
}

export function generateBlogSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60);
}

export function extractKeywords(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const keywords = [
    'finance', 'investment', 'money', 'banking', 'economy', 'market', 'stock', 'mutual fund',
    'insurance', 'tax', 'loan', 'credit', 'savings', 'retirement', 'wealth', 'financial planning',
    'budget', 'expense', 'income', 'profit', 'loss', 'trading', 'portfolio', 'asset', 'liability',
    'interest rate', 'inflation', 'GDP', 'RBI', 'SEBI', 'NSE', 'BSE', 'India', 'Indian economy'
  ];
  
  return keywords.filter(keyword => text.includes(keyword)).slice(0, 10);
}

export function extractCategories(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const categories = [
    'Finance', 'Investment', 'Banking', 'Economy', 'Markets', 'Personal Finance',
    'Insurance', 'Taxation', 'Loans', 'Credit', 'Savings', 'Retirement Planning',
    'Wealth Management', 'Financial Planning', 'Budgeting', 'Trading', 'Portfolio Management'
  ];
  
  return categories.filter(category => text.includes(category.toLowerCase())).slice(0, 5);
}
