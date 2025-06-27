// News API utility functions
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  urlToImage?: string;
  content: string;
}

// Mock news data for development (replace with actual API calls)
export const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Sensex Surges 500 Points as RBI Maintains Repo Rate',
    description: 'The BSE Sensex jumped over 500 points today after the Reserve Bank of India kept the repo rate unchanged at 6.5%. Banking stocks led the rally with HDFC Bank and ICICI Bank gaining 2-3%.',
    url: 'https://moneycontrol.com/news/business/markets/sensex-surges-500-points-rbi-repo-rate-1234567.html',
    source: 'Moneycontrol',
    publishedAt: new Date().toISOString(),
    content: 'The Reserve Bank of India maintained the repo rate at 6.5% in its latest monetary policy meeting, providing relief to equity markets. The Sensex surged over 500 points, while the Nifty gained 150 points. Banking stocks were the top performers, with HDFC Bank and ICICI Bank leading the gains. Analysts expect the market rally to continue as inflation remains under control and economic growth shows positive signs.'
  },
  {
    id: '2',
    title: 'Reliance Industries Q3 Results Beat Estimates',
    description: 'Reliance Industries reported better-than-expected Q3 results with net profit rising 15% year-on-year. The company\'s digital and retail segments showed strong growth.',
    url: 'https://economictimes.indiatimes.com/markets/stocks/news/reliance-q3-results-beat-estimates-1234568.html',
    source: 'Economic Times',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: 'Reliance Industries Limited reported robust third-quarter results that exceeded market expectations. The company\'s net profit increased by 15% year-on-year to ₹19,641 crore. Revenue from operations grew 3.6% to ₹2.48 lakh crore. The digital services segment (Jio) and retail business showed strong performance, contributing significantly to the overall growth. The company\'s oil-to-chemicals business also performed well despite global challenges.'
  },
  {
    id: '3',
    title: 'Bitcoin Crosses $50,000 Mark for First Time in 2024',
    description: 'Bitcoin has crossed the $50,000 mark for the first time this year, driven by institutional adoption and positive market sentiment. Indian crypto exchanges report increased trading volumes.',
    url: 'https://cointelegraph.com/news/bitcoin-50000-2024-india-crypto-1234569.html',
    source: 'CoinTelegraph',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: 'Bitcoin has successfully crossed the $50,000 mark for the first time in 2024, marking a significant milestone for the cryptocurrency market. The rally is attributed to increased institutional adoption, positive regulatory developments, and growing investor confidence. Indian crypto exchanges have reported a surge in trading volumes, with many investors showing renewed interest in digital assets. Analysts suggest this could be the beginning of a new bullish phase for cryptocurrencies.'
  },
  {
    id: '4',
    title: 'HDFC Bank Launches New Digital Banking Features',
    description: 'HDFC Bank has introduced new digital banking features including AI-powered investment recommendations and enhanced security measures for online transactions.',
    url: 'https://business-standard.com/article/finance/hdfc-bank-digital-features-ai-investment-1234570.html',
    source: 'Business Standard',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    content: 'HDFC Bank has launched a comprehensive suite of new digital banking features aimed at enhancing customer experience and security. The new features include AI-powered investment recommendations, enhanced biometric authentication, and real-time fraud detection. The bank has also introduced a new mobile app interface with improved user experience and faster transaction processing. These developments come as part of the bank\'s digital transformation initiative.'
  },
  {
    id: '5',
    title: 'NSE Introduces New Derivatives Products',
    description: 'The National Stock Exchange has launched new derivative products including sector-specific indices and volatility-based instruments to provide more trading opportunities.',
    url: 'https://livemint.com/market/stock-market-news/nse-new-derivatives-products-1234571.html',
    source: 'LiveMint',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    content: 'The National Stock Exchange (NSE) has introduced a range of new derivative products to provide investors with more trading opportunities and risk management tools. The new products include sector-specific indices, volatility-based instruments, and options on various underlying assets. These additions are expected to increase market liquidity and provide better hedging opportunities for institutional and retail investors. The exchange has also enhanced its trading platform to support these new products.'
  },
  {
    id: '6',
    title: 'SEBI Introduces New Guidelines for Mutual Fund Investments',
    description: 'The Securities and Exchange Board of India has announced new guidelines for mutual fund investments, focusing on transparency and investor protection.',
    url: 'https://moneycontrol.com/news/business/markets/sebi-mutual-fund-guidelines-1234572.html',
    source: 'Moneycontrol',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    content: 'SEBI has introduced comprehensive new guidelines for mutual fund investments aimed at enhancing transparency and protecting investor interests. The new regulations include stricter disclosure requirements, improved fee structures, and enhanced risk management protocols. These changes are expected to make mutual fund investments more accessible and transparent for retail investors while ensuring better governance standards across the industry.'
  },
  {
    id: '7',
    title: 'Gold Prices Hit Record High in Indian Markets',
    description: 'Gold prices have reached a new record high in Indian markets, driven by global economic uncertainty and strong domestic demand.',
    url: 'https://economictimes.indiatimes.com/markets/commodities/gold-price-record-high-india-1234573.html',
    source: 'Economic Times',
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    content: 'Gold prices have surged to a new record high in Indian markets, crossing ₹65,000 per 10 grams. The rally is attributed to global economic uncertainty, geopolitical tensions, and strong domestic demand during the wedding season. Analysts expect the upward trend to continue as investors seek safe-haven assets amid market volatility.'
  },
  {
    id: '8',
    title: 'UPI Transactions Cross 10 Billion Mark',
    description: 'UPI transactions have crossed the 10 billion mark for the first time, marking a significant milestone in India\'s digital payment revolution.',
    url: 'https://business-standard.com/article/technology/upi-transactions-10-billion-milestone-1234574.html',
    source: 'Business Standard',
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    content: 'UPI transactions have achieved a historic milestone by crossing 10 billion transactions, demonstrating the rapid adoption of digital payments in India. The growth is driven by increased smartphone penetration, government initiatives, and the convenience offered by UPI. This achievement highlights India\'s leadership in digital payment innovation.'
  }
];

// Cache configuration
const CACHE_DURATION = 3600000; // 1 hour in milliseconds
const CACHE_KEY = 'financeNews';
const CACHE_TIME_KEY = 'newsFetchTime';

// Fetch news from API (replace with actual API call in production)
export const fetchNewsFromAPI = async (): Promise<NewsItem[]> => {
  try {
    // In production, replace this with actual API call
    // const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    // const response = await fetch(
    //   `https://newsapi.org/v2/everything?q=india+finance+stock+market+crypto&sources=moneycontrol,economic-times,business-standard&apiKey=${API_KEY}&pageSize=20&sortBy=publishedAt`
    // );
    // const data = await response.json();
    // return data.articles.map((article: any, index: number) => ({
    //   id: String(index + 1),
    //   title: article.title,
    //   description: article.description,
    //   url: article.url,
    //   source: article.source.name,
    //   publishedAt: article.publishedAt,
    //   urlToImage: article.urlToImage,
    //   content: article.content
    // }));

    // For now, simulate API delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockNewsData;
  } catch (error) {
    console.error('Error fetching news from API:', error);
    throw new Error('Failed to fetch news from API');
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

    // Fetch fresh data
    const news = await fetchNewsFromAPI();
    
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
    
    throw error;
  }
};

// Clear news cache
export const clearNewsCache = (): void => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIME_KEY);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString('en-IN');
};

// Truncate text to specified length
export const truncateText = (text: string, maxLength: number = 200): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
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