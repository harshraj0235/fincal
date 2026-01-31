// News API utility functions for unlimited real-time Indian news
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  urlToImage?: string;
  content: string;
  category?: string;
}

const REFRESH_INTERVAL = 10000; // 10 seconds
const CACHE_DURATION = 60000; // 1 minute cache
const CACHE_KEY = 'indianFinanceNews';
const CACHE_TIME_KEY = 'indianNewsFetchTime';

// Indian finance keywords
const INDIAN_FINANCE_KEYWORDS = [
  'sensex', 'nifty', 'bse', 'nse', 'stock market', 'share market',
  'mutual fund', 'sip', 'investment', 'trading', 'equity',
  'cryptocurrency', 'bitcoin', 'ethereum', 'crypto', 'blockchain',
  'rbi', 'reserve bank', 'banking', 'loan', 'emi', 'credit card',
  'gst', 'tax', 'income tax', 'budget', 'finance minister',
  'startup', 'ipo', 'fpo', 'sebi', 'insurance', 'gold', 'silver',
  'forex', 'currency', 'rupee', 'dollar', 'inflation', 'gdp',
  'economy', 'business', 'corporate', 'company', 'profit', 'revenue'
];

// Fetch news from multiple free sources (mocked for demo)
export const fetchNewsFromMultipleSources = async (): Promise<NewsItem[]> => {
  try {
    // Simulate fetching from multiple sources
    const mockNews: NewsItem[] = [
      {
        id: `moneycontrol-${Date.now()}-1`,
        title: 'Sensex surges 500 points, Nifty above 22,000 as banking stocks rally',
        description: 'Indian stock markets witnessed strong buying momentum with Sensex gaining over 500 points and Nifty crossing the 22,000 mark. Banking and financial stocks led the rally.',
        url: 'https://www.moneycontrol.com/news/business/markets/sensex-nifty-stock-market-today-12345678.html',
        source: 'MoneyControl',
        publishedAt: new Date().toISOString(),
        content: 'Indian stock markets witnessed strong buying momentum with Sensex gaining over 500 points and Nifty crossing the 22,000 mark. Banking and financial stocks led the rally as investors cheered positive global cues and strong quarterly results from major banks.',
        category: 'finance'
      },
      {
        id: `economictimes-${Date.now()}-2`,
        title: 'RBI keeps repo rate unchanged at 6.5%, maintains accommodative stance',
        description: 'The Reserve Bank of India maintained the repo rate at 6.5% for the sixth consecutive time, signaling continued support for economic growth while keeping inflation in check.',
        url: 'https://economictimes.indiatimes.com/news/economy/policy/rbi-repo-rate-decision-12345678.html',
        source: 'Economic Times',
        publishedAt: new Date(Date.now() - 300000).toISOString(),
        content: 'The Reserve Bank of India maintained the repo rate at 6.5% for the sixth consecutive time, signaling continued support for economic growth while keeping inflation in check. The central bank also revised its GDP growth forecast for FY25.',
        category: 'business'
      },
      {
        id: `businessstandard-${Date.now()}-3`,
        title: 'Bitcoin crosses $50,000 as institutional adoption increases in India',
        description: 'Cryptocurrency markets show strong momentum with Bitcoin crossing the $50,000 mark. Indian investors are increasingly adopting digital assets despite regulatory uncertainties.',
        url: 'https://www.business-standard.com/article/markets/bitcoin-crypto-market-india-12345678.html',
        source: 'Business Standard',
        publishedAt: new Date(Date.now() - 600000).toISOString(),
        content: 'Cryptocurrency markets show strong momentum with Bitcoin crossing the $50,000 mark. Indian investors are increasingly adopting digital assets despite regulatory uncertainties. Major exchanges report record trading volumes.',
        category: 'finance'
      },
      {
        id: `ndtv-${Date.now()}-4`,
        title: 'GST collections reach Rs 1.72 lakh crore in January, up 10.4% YoY',
        description: 'Goods and Services Tax collections for January 2024 reached Rs 1.72 lakh crore, showing a 10.4% year-on-year growth, indicating strong economic recovery.',
        url: 'https://www.ndtv.com/business/gst-collections-january-2024-12345678.html',
        source: 'NDTV Business',
        publishedAt: new Date(Date.now() - 900000).toISOString(),
        content: 'Goods and Services Tax collections for January 2024 reached Rs 1.72 lakh crore, showing a 10.4% year-on-year growth, indicating strong economic recovery. This marks the third consecutive month of collections above Rs 1.7 lakh crore.',
        category: 'business'
      },
      {
        id: `zeebusiness-${Date.now()}-5`,
        title: 'Mutual Fund SIP inflows hit record high of Rs 18,838 crore in January',
        description: 'Systematic Investment Plan (SIP) inflows in mutual funds reached a record high of Rs 18,838 crore in January 2024, showing growing retail investor confidence.',
        url: 'https://zeenews.india.com/business/mutual-fund-sip-inflows-record-12345678.html',
        source: 'Zee Business',
        publishedAt: new Date(Date.now() - 1200000).toISOString(),
        content: 'Systematic Investment Plan (SIP) inflows in mutual funds reached a record high of Rs 18,838 crore in January 2024, showing growing retail investor confidence. Equity funds continue to attract maximum inflows.',
        category: 'finance'
      }
    ];

    // Add more dynamic news items
    const additionalNews = INDIAN_FINANCE_KEYWORDS.slice(0, 10).map((keyword, index) => ({
      id: `dynamic-${Date.now()}-${index + 6}`,
      title: `Latest ${keyword} updates: Market trends and analysis`,
      description: `Stay updated with the latest ${keyword} news and market analysis. Expert insights on current trends and future outlook.`,
      url: `https://moneycal.in/news/${keyword.replace(/\s+/g, '-')}`,
      source: ['MoneyControl', 'Economic Times', 'Business Standard', 'NDTV Business', 'Zee Business'][index % 5],
      publishedAt: new Date(Date.now() - (index + 6) * 300000).toISOString(),
      content: `Stay updated with the latest ${keyword} news and market analysis. Expert insights on current trends and future outlook. This comprehensive coverage includes market data, expert opinions, and strategic recommendations for investors.`,
      category: index % 2 === 0 ? 'finance' : 'business'
    }));

    return [...mockNews, ...additionalNews];
  } catch (error) {
    console.error('Error fetching news from multiple sources:', error);
    return [];
  }
};

// Get cached news or fetch new data
export const getNews = async (): Promise<NewsItem[]> => {
  try {
    // Check cache first
    const cachedNews = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (cachedNews && cachedTime) {
      const timeDiff = Date.now() - parseInt(cachedTime);
      if (timeDiff < CACHE_DURATION) {
        return JSON.parse(cachedNews);
      }
    }

    // Fetch fresh data from multiple sources
    const news = await fetchNewsFromMultipleSources();
    
    // Cache the new data
    localStorage.setItem(CACHE_KEY, JSON.stringify(news));
    localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    
    return news;
  } catch (error) {
    console.error('Error getting news:', error);
    
    // Return cached data if available, even if expired
    const cachedNews = localStorage.getItem(CACHE_KEY);
    if (cachedNews) {
      return JSON.parse(cachedNews);
    }
    
    return [];
  }
};

// Auto-refresh news every 10 seconds
export const startAutoRefresh = (callback: (news: NewsItem[]) => void): (() => void) => {
  const interval = setInterval(async () => {
    try {
      const news = await fetchNewsFromMultipleSources();
      callback(news);
    } catch (error) {
      console.error('Auto-refresh error:', error);
    }
  }, REFRESH_INTERVAL);
  return () => clearInterval(interval);
};

// Clear news cache
export const clearNewsCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIME_KEY);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Recently';
  }
};

// Truncate text to exactly 250 words
export const truncateText = (text: string, maxWords: number = 250): string => {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

// Filter news by source
export const filterNewsBySource = (news: NewsItem[], sources: string[]): NewsItem[] => {
  return news.filter(item => sources.includes(item.source));
};

// Filter news by keywords
export const filterNewsByKeywords = (news: NewsItem[], keywords: string[]): NewsItem[] => {
  return news.filter(item => 
    keywords.some(keyword => 
      item.title.toLowerCase().includes(keyword.toLowerCase()) ||
      item.description.toLowerCase().includes(keyword.toLowerCase())
    )
  );
};

// Sort news by date (newest first)
export const sortNewsByDate = (news: NewsItem[]): NewsItem[] => {
  return [...news].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

// Device detection utilities
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth > 1024;
};

// Get optimal text length based on device
export const getOptimalTextLength = (): number => {
  if (isMobile()) return 150;
  if (isTablet()) return 200;
  return 250;
};

// Get trending topics from news
export const getTrendingTopics = (news: NewsItem[]): string[] => {
  const wordCount: { [key: string]: number } = {};
  
  news.forEach(item => {
    const words = (item.title + ' ' + item.description)
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(word => word.length > 3 && !['this', 'that', 'with', 'from', 'have', 'will', 'been', 'they', 'their', 'them'].includes(word));
    
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });
  
  return Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
};

// Get news statistics
export const getNewsStats = (news: NewsItem[]) => {
  const sources = [...new Set(news.map(item => item.source))];
  const categories = [...new Set(news.map(item => item.category).filter(Boolean))];
  const totalNews = news.length;
  
  return {
    totalNews,
    sources: sources.length,
    categories: categories.length,
    topSources: sources.slice(0, 5),
    topCategories: categories.slice(0, 5)
  };
}; 