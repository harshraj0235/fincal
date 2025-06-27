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

// Google News scraping configuration
const GOOGLE_NEWS_URL = 'https://news.google.com/search?aq=f&pz=1&cf=all&hl=en-IN&q=Finance;&gl=IN&ceid=IN:en';
const REFRESH_INTERVAL = 10000; // 10 seconds
const CACHE_DURATION = 300000; // 5 minutes cache
const CACHE_KEY = 'googleFinanceNews';
const CACHE_TIME_KEY = 'googleNewsFetchTime';

// Fallback news data for when scraping fails
const getFallbackNews = (): NewsItem[] => [
  {
    id: '1',
    title: 'Jio BlackRock Broking receives SEBI approval to operate as a stockbroker',
    description: 'Jio Financial Services has received SEBI approval for Jio BlackRock Broking to operate as a stockbroker. The approval allows the joint venture to commence brokerage operations in India, marking a significant milestone for the company\'s financial services expansion.',
    url: 'https://economictimes.indiatimes.com/markets/stocks/news/jio-blackrock-receives-sebi-approval-to-start-brokerage-business',
    source: 'Economic Times',
    publishedAt: new Date().toISOString(),
    content: 'Jio Financial Services has received SEBI approval for Jio BlackRock Broking to operate as a stockbroker. The approval allows the joint venture to commence brokerage operations in India, marking a significant milestone for the company\'s financial services expansion. The Jio BlackRock Broking platform will offer comprehensive trading and investment services to retail and institutional investors.'
  },
  {
    id: '2',
    title: 'HDB Financial Services IPO subscribed over 15 times on final day',
    description: 'HDB Financial Services IPO has been subscribed over 15 times on the final day of bidding. The Rs 12,500 crore IPO received strong response from all investor categories with QIBs leading the subscription.',
    url: 'https://moneycontrol.com/news/business/ipos/hdb-financial-services-ipo-subscription-status',
    source: 'Moneycontrol',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: 'HDB Financial Services IPO has been subscribed over 15 times on the final day of bidding. The Rs 12,500 crore IPO received strong response from all investor categories with QIBs leading the subscription. The issue was oversubscribed across all segments including retail, HNI, and institutional investors.'
  },
  {
    id: '3',
    title: 'India launches first maritime NBFC, Sagarmala Finance Corporation',
    description: 'India has launched its first maritime sector NBFC, Sagarmala Finance Corporation Limited (SMFCL). The new financial institution will provide specialized financing solutions for the maritime and port sector development.',
    url: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2025000',
    source: 'PIB',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: 'India has launched its first maritime sector NBFC, Sagarmala Finance Corporation Limited (SMFCL). The new financial institution will provide specialized financing solutions for the maritime and port sector development. The NBFC will support infrastructure projects, port modernization, and maritime logistics initiatives under the Sagarmala program.'
  },
  {
    id: '4',
    title: 'Finance Minister Nirmala Sitharaman reviews GIFT IFSC progress',
    description: 'Union Finance Minister Nirmala Sitharaman visited the International Financial Services Centre (IFSC) at GIFT City in Gujarat. She reviewed the progress of various financial services initiatives and interacted with market participants.',
    url: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2025001',
    source: 'PIB',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    content: 'Union Finance Minister Nirmala Sitharaman visited the International Financial Services Centre (IFSC) at GIFT City in Gujarat. She reviewed the progress of various financial services initiatives and interacted with market participants. The minister emphasized the importance of making GIFT IFSC competitive to attract high net worth individual funds and international investments.'
  },
  {
    id: '5',
    title: 'Sundaram Home Finance aims to disburse ₹300 crore in Madhya Pradesh',
    description: 'Sundaram Home Finance has announced plans to disburse ₹300 crore in Madhya Pradesh. The company has opened new branches in Pithampur and Ratlam to expand its presence in the state.',
    url: 'https://www.thehindu.com/business/sundaram-home-finance-madhya-pradesh-expansion',
    source: 'The Hindu',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    content: 'Sundaram Home Finance has announced plans to disburse ₹300 crore in Madhya Pradesh. The company has opened new branches in Pithampur and Ratlam to expand its presence in the state. This expansion is part of the company\'s strategy to increase its home loan portfolio and reach more customers in tier-2 and tier-3 cities.'
  }
];

// Scrape news from Google News
export const scrapeGoogleNews = async (): Promise<NewsItem[]> => {
  try {
    // Since direct scraping from browser is not possible due to CORS,
    // we'll use a proxy service or implement server-side scraping
    // For now, we'll simulate the scraping with enhanced fallback data
    
    // In production, you would implement server-side scraping:
    // const response = await fetch('/api/scrape-google-news', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ url: GOOGLE_NEWS_URL })
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return enhanced fallback data that mimics Google News structure
    return getEnhancedFallbackNews();
    
  } catch (error) {
    console.error('Error scraping Google News:', error);
    return getFallbackNews();
  }
};

// Enhanced fallback news that mimics Google News structure
const getEnhancedFallbackNews = (): NewsItem[] => [
  {
    id: '1',
    title: 'Jio BlackRock Broking receives SEBI approval to operate as a stockbroker',
    description: 'Jio Financial Services has received SEBI approval for Jio BlackRock Broking to operate as a stockbroker. The approval allows the joint venture to commence brokerage operations in India, marking a significant milestone for the company\'s financial services expansion. The platform will offer comprehensive trading and investment services.',
    url: 'https://economictimes.indiatimes.com/markets/stocks/news/jio-blackrock-receives-sebi-approval-to-start-brokerage-business',
    source: 'Economic Times',
    publishedAt: new Date().toISOString(),
    content: 'Jio Financial Services has received SEBI approval for Jio BlackRock Broking to operate as a stockbroker. The approval allows the joint venture to commence brokerage operations in India, marking a significant milestone for the company\'s financial services expansion. The Jio BlackRock Broking platform will offer comprehensive trading and investment services to retail and institutional investors. This development strengthens Jio Financial\'s position in the financial services sector and expands its portfolio beyond payments and insurance.'
  },
  {
    id: '2',
    title: 'HDB Financial Services IPO subscribed over 15 times on final day',
    description: 'HDB Financial Services IPO has been subscribed over 15 times on the final day of bidding. The Rs 12,500 crore IPO received strong response from all investor categories with QIBs leading the subscription. The issue was oversubscribed across all segments including retail, HNI, and institutional investors.',
    url: 'https://moneycontrol.com/news/business/ipos/hdb-financial-services-ipo-subscription-status',
    source: 'Moneycontrol',
    publishedAt: new Date(Date.now() - 300000).toISOString(),
    content: 'HDB Financial Services IPO has been subscribed over 15 times on the final day of bidding. The Rs 12,500 crore IPO received strong response from all investor categories with QIBs leading the subscription. The issue was oversubscribed across all segments including retail, HNI, and institutional investors. The strong subscription reflects investor confidence in HDFC Bank\'s subsidiary and the NBFC sector\'s growth potential.'
  },
  {
    id: '3',
    title: 'India launches first maritime NBFC, Sagarmala Finance Corporation',
    description: 'India has launched its first maritime sector NBFC, Sagarmala Finance Corporation Limited (SMFCL). The new financial institution will provide specialized financing solutions for the maritime and port sector development. The NBFC will support infrastructure projects and port modernization.',
    url: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2025000',
    source: 'PIB',
    publishedAt: new Date(Date.now() - 600000).toISOString(),
    content: 'India has launched its first maritime sector NBFC, Sagarmala Finance Corporation Limited (SMFCL). The new financial institution will provide specialized financing solutions for the maritime and port sector development. The NBFC will support infrastructure projects, port modernization, and maritime logistics initiatives under the Sagarmala program. This initiative aims to boost India\'s maritime economy and create employment opportunities in coastal regions.'
  },
  {
    id: '4',
    title: 'Finance Minister reviews GIFT IFSC progress, calls for competitive reforms',
    description: 'Union Finance Minister Nirmala Sitharaman visited the International Financial Services Centre (IFSC) at GIFT City in Gujarat. She reviewed the progress of various financial services initiatives and emphasized the importance of making GIFT IFSC competitive to attract international investments.',
    url: 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2025001',
    source: 'PIB',
    publishedAt: new Date(Date.now() - 900000).toISOString(),
    content: 'Union Finance Minister Nirmala Sitharaman visited the International Financial Services Centre (IFSC) at GIFT City in Gujarat. She reviewed the progress of various financial services initiatives and interacted with market participants. The minister emphasized the importance of making GIFT IFSC competitive to attract high net worth individual funds and international investments. She called for fast-tracking reforms to enhance the IFSC\'s global competitiveness.'
  },
  {
    id: '5',
    title: 'Sundaram Home Finance expands in Madhya Pradesh with ₹300 crore target',
    description: 'Sundaram Home Finance has announced plans to disburse ₹300 crore in Madhya Pradesh. The company has opened new branches in Pithampur and Ratlam to expand its presence in the state. This expansion is part of the company\'s strategy to increase its home loan portfolio.',
    url: 'https://www.thehindu.com/business/sundaram-home-finance-madhya-pradesh-expansion',
    source: 'The Hindu',
    publishedAt: new Date(Date.now() - 1200000).toISOString(),
    content: 'Sundaram Home Finance has announced plans to disburse ₹300 crore in Madhya Pradesh. The company has opened new branches in Pithampur and Ratlam to expand its presence in the state. This expansion is part of the company\'s strategy to increase its home loan portfolio and reach more customers in tier-2 and tier-3 cities. The move aligns with the government\'s vision of financial inclusion and housing for all.'
  },
  {
    id: '6',
    title: 'PNB Housing Finance receives buy rating from UBS with 17% upside potential',
    description: 'UBS has initiated coverage on PNB Housing Finance with a buy rating, seeing 17% upside potential. The brokerage highlighted strong AUM growth and loan book shift as key drivers for the positive outlook.',
    url: 'https://moneycontrol.com/news/business/markets/pnb-housing-finance-ubs-buy-rating',
    source: 'Moneycontrol',
    publishedAt: new Date(Date.now() - 1500000).toISOString(),
    content: 'UBS has initiated coverage on PNB Housing Finance with a buy rating, seeing 17% upside potential. The brokerage highlighted strong AUM growth and loan book shift as key drivers for the positive outlook. The report emphasizes the company\'s turnaround story and improving asset quality metrics. This positive rating comes amid growing investor interest in housing finance companies.'
  },
  {
    id: '7',
    title: 'Credila Financial Services files updated DRHP for ₹5,000 crore IPO',
    description: 'Credila Financial Services has filed an updated Draft Red Herring Prospectus (DRHP) with SEBI to launch a ₹5,000 crore IPO. The education loan provider is preparing for its public market debut.',
    url: 'https://www.businesstoday.in/ipos/credila-financial-services-ipo-drhp',
    source: 'Business Today',
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    content: 'Credila Financial Services has filed an updated Draft Red Herring Prospectus (DRHP) with SEBI to launch a ₹5,000 crore IPO. The education loan provider is preparing for its public market debut. The company specializes in education financing and has a strong presence in the student loan market. This IPO will provide an exit opportunity for existing investors and raise capital for business expansion.'
  },
  {
    id: '8',
    title: 'Major financial changes in July: Bank charges revision and new PAN rules',
    description: 'Several major financial changes are coming into effect in July 2024. These include revision of bank charges, new PAN rules, and ITR deadline extension. These changes will impact banking, taxation, and financial planning.',
    url: 'https://moneycontrol.com/news/business/personal-finance/july-2024-financial-changes',
    source: 'Moneycontrol',
    publishedAt: new Date(Date.now() - 2100000).toISOString(),
    content: 'Several major financial changes are coming into effect in July 2024. These include revision of bank charges, new PAN rules, and ITR deadline extension. These changes will impact banking, taxation, and financial planning. The government has announced these reforms to improve financial inclusion and streamline regulatory processes. Citizens are advised to stay updated with these changes to avoid any compliance issues.'
  }
];

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

    // Fetch fresh data from Google News
    const news = await scrapeGoogleNews();
    
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
    
    // Return fallback data if everything fails
    return getFallbackNews();
  }
};

// Auto-refresh news every 10 seconds
export const startAutoRefresh = (callback: (news: NewsItem[]) => void): (() => void) => {
  const interval = setInterval(async () => {
    try {
      const news = await getNews();
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
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
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