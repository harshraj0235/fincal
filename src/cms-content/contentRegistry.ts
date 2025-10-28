/**
 * CMS Content Registry
 * Central index for all news articles organized by category
 * Makes it easy to track, update, and manage content
 */

import { NewsGuideSection } from '../components/NewsGuideTemplate';

export interface ArticleMetadata {
  id: string;
  slug: string;
  category: string;
  subcategory: string;
  title: string;
  titleHindi: string;
  author: string;
  publishDate: string;
  lastUpdated: string;
  wordCount: number;
  readTime: number;
  tags: string[];
  featured: boolean;
  trending: boolean;
  status: 'draft' | 'published' | 'scheduled';
  filePath: string;
}

export interface CategoryStructure {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  subcategories: {
    id: string;
    name: string;
    nameHindi: string;
    slug: string;
  }[];
  articles: ArticleMetadata[];
}

// Complete Article Registry - All 100 Articles Organized
export const articleRegistry: ArticleMetadata[] = [
  // MARKETS CATEGORY - IPOs & Listings
  {
    id: 'lenskart-ipo-main-hindi',
    slug: 'lenskart-ipo-announcement-hindi',
    category: 'markets',
    subcategory: 'ipos-listings',
    title: 'Lenskart IPO: Indian Eyewear Industry Transformation',
    titleHindi: 'लेंसकार्ट IPO: भारतीय आईवियर इंडस्ट्री में सबसे बड़ा बदलाव',
    author: 'raushan-kumar',
    publishDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    wordCount: 2200,
    readTime: 8,
    tags: ['Lenskart', 'IPO', 'Eyewear', 'Markets', 'Investment'],
    featured: true,
    trending: true,
    status: 'published',
    filePath: 'cms-content/news-articles/markets/article-01-lenskart-ipo-main.ts'
  },
  {
    id: 'lenskart-valuation-breakdown',
    slug: 'lenskart-valuation-67000-crore-analysis',
    category: 'markets',
    subcategory: 'ipos-listings',
    title: 'Breaking Down Lenskart Valuation',
    titleHindi: 'लेंसकार्ट का ₹67,000 करोड़ वैल्यूएशन: पूरा विश्लेषण',
    author: 'raushan-kumar',
    publishDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    wordCount: 2800,
    readTime: 10,
    tags: ['Valuation', 'IPO', 'Lenskart', 'P/S Ratio', 'Analysis'],
    featured: true,
    trending: true,
    status: 'published',
    filePath: 'cms-content/news-articles/markets/article-02-valuation-breakdown.ts'
  },
  {
    id: 'lenskart-omnichannel-case-study',
    slug: 'lenskart-2000-stores-omnichannel-strategy',
    category: 'business-analysis',
    subcategory: 'case-studies',
    title: 'Lenskart Omnichannel Success Story',
    titleHindi: '2000+ स्टोर्स का जादू! लेंसकार्ट की ओम्नीचैनल सक्सेस स्टोरी',
    author: 'harsh-raj',
    publishDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    wordCount: 2600,
    readTime: 9,
    tags: ['Omnichannel', 'Retail Strategy', 'Case Study', 'D2C'],
    featured: false,
    trending: true,
    status: 'published',
    filePath: 'cms-content/news-articles/business-analysis/article-03-omnichannel.ts'
  },
  {
    id: 'lenskart-investors-backing',
    slug: 'lenskart-investors-softbank-premji-returns',
    category: 'startups',
    subcategory: 'startup-funding',
    title: 'Major Investors Behind Lenskart',
    titleHindi: '₹5,000 करोड़ कमाने वाले निवेशक! SoftBank से Azim Premji तक',
    author: 'vikram-kumar',
    publishDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    wordCount: 3100,
    readTime: 11,
    tags: ['Investors', 'SoftBank', 'Premji Invest', 'Funding', 'Returns'],
    featured: false,
    trending: true,
    status: 'published',
    filePath: 'cms-content/news-articles/startups/article-04-investors.ts'
  },
  {
    id: 'lenskart-ipo-proceeds-usage',
    slug: 'lenskart-ipo-6000-crore-spending-plan',
    category: 'business-analysis',
    subcategory: 'trend-reports',
    title: 'Lenskart IPO Proceeds Usage Plan',
    titleHindi: '₹6,000 करोड़ का खजाना! कहां खर्च होंगे IPO के पैसे',
    author: 'saurabh-kumar',
    publishDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    wordCount: 3000,
    readTime: 10,
    tags: ['IPO Proceeds', 'Expansion', 'Technology', 'Investment Plan'],
    featured: false,
    trending: false,
    status: 'published',
    filePath: 'cms-content/news-articles/business-analysis/article-05-proceeds.ts'
  },
  {
    id: 'lenskart-ipo-risks',
    slug: 'lenskart-ipo-10-risks-paytm-comparison',
    category: 'markets',
    subcategory: 'ipos-listings',
    title: 'Lenskart IPO Risks Analysis',
    titleHindi: 'खतरे की घंटी! लेंसकार्ट IPO के 10 बड़े खतरे | Paytm जैसा?',
    author: 'raushan-kumar',
    publishDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    wordCount: 2900,
    readTime: 10,
    tags: ['Risks', 'IPO', 'Paytm Comparison', 'Investment Warning'],
    featured: true,
    trending: true,
    status: 'published',
    filePath: 'cms-content/news-articles/markets/article-06-risks.ts'
  },
  {
    id: 'lenskart-sebi-approval-impact',
    slug: 'sebi-approval-lenskart-eyewear-industry-impact',
    category: 'economy',
    subcategory: 'government-policy',
    title: 'SEBI Approval Impact on Eyewear Sector',
    titleHindi: 'बड़ी खबर! SEBI की हरी झंडी - पूरी इंडस्ट्री बदल जाएगी',
    author: 'raushan-kumar',
    publishDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    wordCount: 2800,
    readTime: 9,
    tags: ['SEBI', 'Regulation', 'Industry Impact', 'Policy'],
    featured: false,
    trending: true,
    status: 'published',
    filePath: 'cms-content/news-articles/economy/article-07-sebi-approval.ts'
  }
  // Articles 8-100 will be added as they're written
];

// Helper functions
export const getArticlesByCategory = (category: string): ArticleMetadata[] => {
  return articleRegistry.filter(article => article.category === category && article.status === 'published');
};

export const getFeaturedArticles = (): ArticleMetadata[] => {
  return articleRegistry.filter(article => article.featured && article.status === 'published');
};

export const getTrendingArticles = (): ArticleMetadata[] => {
  return articleRegistry.filter(article => article.trending && article.status === 'published');
};

export const getArticleById = (id: string): ArticleMetadata | undefined => {
  return articleRegistry.find(article => article.id === id);
};

export const getArticleBySlug = (slug: string): ArticleMetadata | undefined => {
  return articleRegistry.find(article => article.slug === slug);
};

export const searchArticles = (query: string): ArticleMetadata[] => {
  const lowerQuery = query.toLowerCase();
  return articleRegistry.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.titleHindi.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export default articleRegistry;

