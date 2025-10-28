/**
 * News Categories Structure for MoneyCal Finance News Portal
 * Comprehensive category system for high-traffic finance/business news
 * Based on best practices for news website architecture
 */

export interface NewsSubcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  subcategories: NewsSubcategory[];
  featured: boolean;
  priority: number;
}

export const newsCategories: NewsCategory[] = [
  // 1. MARKETS
  {
    id: 'markets',
    name: 'Markets',
    slug: 'markets',
    description: 'Latest updates on Indian and global markets, stock movements, IPOs, commodities, and forex',
    icon: 'TrendingUp',
    color: 'blue',
    featured: true,
    priority: 1,
    subcategories: [
      {
        id: 'india-markets',
        name: 'India Markets',
        slug: 'india-markets',
        description: 'NSE, BSE, Nifty, Sensex updates and Indian stock market news',
        keywords: ['nifty 50', 'sensex', 'indian stock market', 'bse', 'nse', 'market today'],
        priority: 'high'
      },
      {
        id: 'global-markets',
        name: 'Global Markets',
        slug: 'global-markets',
        description: 'International markets, US stocks, global indices, and foreign exchange',
        keywords: ['dow jones', 'nasdaq', 's&p 500', 'global markets', 'international stocks'],
        priority: 'medium'
      },
      {
        id: 'ipos-listings',
        name: 'IPOs & Listings',
        slug: 'ipos-listings',
        description: 'Latest IPO launches, GMP, subscription status, and listing gains in India',
        keywords: ['ipo', 'initial public offering', 'mainboard ipo', 'sme ipo', 'listing gains'],
        priority: 'high'
      },
      {
        id: 'stocks-shares',
        name: 'Stocks & Shares',
        slug: 'stocks-shares',
        description: 'Company-specific stock analysis, share price movements, and investment opportunities',
        keywords: ['stock analysis', 'share price', 'buy sell recommendations', 'stock picks'],
        priority: 'high'
      },
      {
        id: 'commodities-forex',
        name: 'Commodities & Forex',
        slug: 'commodities-forex',
        description: 'Gold, silver, crude oil prices, currency exchange rates, and commodity trading',
        keywords: ['gold price', 'crude oil', 'forex', 'commodity market', 'currency rates'],
        priority: 'medium'
      }
    ]
  },

  // 2. ECONOMY & POLICY
  {
    id: 'economy-policy',
    name: 'Economy & Policy',
    slug: 'economy-policy',
    description: 'Economic indicators, government policies, RBI decisions, fiscal and monetary policy updates',
    icon: 'Building',
    color: 'green',
    featured: true,
    priority: 2,
    subcategories: [
      {
        id: 'india-economy',
        name: 'India Economy',
        slug: 'india-economy',
        description: 'GDP, inflation, employment, and key Indian economic indicators',
        keywords: ['indian economy', 'gdp growth', 'inflation rate', 'economic indicators india'],
        priority: 'high'
      },
      {
        id: 'global-economy',
        name: 'Global Economy',
        slug: 'global-economy',
        description: 'International economic trends, trade policies, and global economic outlook',
        keywords: ['global economy', 'international trade', 'world bank', 'imf'],
        priority: 'medium'
      },
      {
        id: 'govt-policy',
        name: 'Government Policy & Regulation',
        slug: 'govt-policy',
        description: 'Budget announcements, policy changes, regulatory updates, and compliance news',
        keywords: ['government policy', 'budget 2025', 'regulatory changes', 'compliance'],
        priority: 'high'
      },
      {
        id: 'fiscal-monetary',
        name: 'Fiscal & Monetary Policy',
        slug: 'fiscal-monetary',
        description: 'RBI rate decisions, monetary policy updates, fiscal measures, and central bank actions',
        keywords: ['rbi policy', 'repo rate', 'monetary policy', 'fiscal policy', 'central bank'],
        priority: 'high'
      }
    ]
  },

  // 3. STARTUPS & ENTREPRENEURSHIP
  {
    id: 'startups',
    name: 'Startups & Entrepreneurship',
    slug: 'startups',
    description: 'Startup funding, founder stories, MSME updates, and entrepreneurship insights',
    icon: 'Rocket',
    color: 'purple',
    featured: true,
    priority: 3,
    subcategories: [
      {
        id: 'startup-funding',
        name: 'Startup Funding & News',
        slug: 'startup-funding',
        description: 'Funding rounds, venture capital, startup valuations, and success stories',
        keywords: ['startup funding', 'venture capital', 'seed funding', 'series a', 'unicorn startups'],
        priority: 'high'
      },
      {
        id: 'founder-stories',
        name: 'Founder Stories',
        slug: 'founder-stories',
        description: 'Inspiring journeys of Indian entrepreneurs and startup founders',
        keywords: ['founder story', 'entrepreneur journey', 'startup success', 'founder interview'],
        priority: 'medium'
      },
      {
        id: 'msme-regional',
        name: 'MSME & Regional Business',
        slug: 'msme-regional',
        description: 'Small business news, MSME schemes, tier-2/3 city entrepreneurship',
        keywords: ['msme india', 'small business', 'regional business', 'tier 2 cities'],
        priority: 'high'
      },
      {
        id: 'women-entrepreneurs',
        name: 'Women Entrepreneurs',
        slug: 'women-entrepreneurs',
        description: 'Stories and opportunities for women in business and entrepreneurship',
        keywords: ['women entrepreneurs', 'women business india', 'female founders'],
        priority: 'medium'
      }
    ]
  },

  // 4. FINTECH & INNOVATION
  {
    id: 'fintech',
    name: 'Fintech & Innovation',
    slug: 'fintech',
    description: 'Digital payments, blockchain, insurtech, and financial technology innovations',
    icon: 'Smartphone',
    color: 'indigo',
    featured: true,
    priority: 4,
    subcategories: [
      {
        id: 'payments-banking-tech',
        name: 'Payments & Banking Tech',
        slug: 'payments-banking-tech',
        description: 'UPI, digital wallets, neo-banks, and payment innovations',
        keywords: ['upi payments', 'digital wallet', 'neobanking', 'payment innovation'],
        priority: 'high'
      },
      {
        id: 'blockchain-crypto',
        name: 'Blockchain & Crypto',
        slug: 'blockchain-crypto',
        description: 'Cryptocurrency, blockchain technology, and Web3 in India',
        keywords: ['cryptocurrency india', 'blockchain', 'bitcoin', 'ethereum', 'web3'],
        priority: 'medium'
      },
      {
        id: 'insurtech-proptech',
        name: 'Insurtech, Proptech & Greentech',
        slug: 'insurtech-proptech',
        description: 'Insurance technology, property tech, and green finance innovations',
        keywords: ['insurtech', 'proptech', 'green finance', 'sustainable finance'],
        priority: 'low'
      },
      {
        id: 'future-tech-finance',
        name: 'Future Tech in Finance',
        slug: 'future-tech-finance',
        description: 'AI in finance, robo-advisors, algorithmic trading, and emerging technologies',
        keywords: ['ai finance', 'robo advisor', 'algorithmic trading', 'fintech trends'],
        priority: 'medium'
      }
    ]
  },

  // 5. PERSONAL FINANCE
  {
    id: 'personal-finance',
    name: 'Personal Finance',
    slug: 'personal-finance',
    description: 'Investment tips, tax planning, retirement strategies, and personal money management',
    icon: 'Wallet',
    color: 'emerald',
    featured: true,
    priority: 5,
    subcategories: [
      {
        id: 'investing-savings',
        name: 'Investing & Savings',
        slug: 'investing-savings',
        description: 'Mutual funds, SIP, stocks, fixed deposits, and investment strategies',
        keywords: ['investment tips', 'mutual funds', 'sip', 'savings schemes', 'portfolio'],
        priority: 'high'
      },
      {
        id: 'taxation-loans',
        name: 'Taxation & Loans',
        slug: 'taxation-loans',
        description: 'Tax-saving tips, loan management, EMI planning, and debt strategies',
        keywords: ['tax saving', 'income tax', 'home loan', 'personal loan', 'emi calculator'],
        priority: 'high'
      },
      {
        id: 'retirement-insurance',
        name: 'Retirement & Insurance',
        slug: 'retirement-insurance',
        description: 'Retirement planning, pension schemes, insurance coverage, and protection',
        keywords: ['retirement planning', 'pension', 'nps', 'life insurance', 'health insurance'],
        priority: 'medium'
      },
      {
        id: 'budgeting-tools',
        name: 'Budgeting & Financial Tools',
        slug: 'budgeting-tools',
        description: 'Budget planning, expense tracking, and how to use financial calculators',
        keywords: ['budget planner', 'expense tracker', 'financial calculator', 'money management'],
        priority: 'medium'
      }
    ]
  },

  // 6. BUSINESS ANALYSIS & OPINION
  {
    id: 'analysis-opinion',
    name: 'Business Analysis & Opinion',
    slug: 'analysis-opinion',
    description: 'Expert commentary, deep-dive analysis, trend reports, and market forecasts',
    icon: 'FileText',
    color: 'orange',
    featured: false,
    priority: 6,
    subcategories: [
      {
        id: 'deep-dives',
        name: 'Deep Dives & Case Studies',
        slug: 'deep-dives',
        description: 'In-depth analysis of companies, sectors, and business models',
        keywords: ['business analysis', 'case study', 'sector analysis', 'company deep dive'],
        priority: 'medium'
      },
      {
        id: 'expert-commentary',
        name: 'Expert Commentary',
        slug: 'expert-commentary',
        description: 'Opinion pieces and insights from finance and business experts',
        keywords: ['expert opinion', 'market commentary', 'analyst view', 'expert insights'],
        priority: 'medium'
      },
      {
        id: 'trend-reports',
        name: 'Trend Reports & Forecasts',
        slug: 'trend-reports',
        description: 'Market trends, future predictions, and industry forecasts',
        keywords: ['market trends', 'forecast', 'future outlook', 'industry report'],
        priority: 'low'
      }
    ]
  },

  // 7. TOOLS & CALCULATORS NEWS
  {
    id: 'tools-news',
    name: 'Tools & Calculators',
    slug: 'tools-news',
    description: 'How-to guides, calculator tutorials, and financial planning tools updates',
    icon: 'Calculator',
    color: 'teal',
    featured: false,
    priority: 7,
    subcategories: [
      {
        id: 'calculator-guides',
        name: 'Calculator Guides',
        slug: 'calculator-guides',
        description: 'How to use financial calculators effectively for planning',
        keywords: ['calculator guide', 'how to calculate', 'financial tools tutorial'],
        priority: 'high'
      },
      {
        id: 'planning-scenarios',
        name: 'Planning Scenarios',
        slug: 'planning-scenarios',
        description: 'Real-life financial planning examples and scenarios',
        keywords: ['financial planning', 'case scenarios', 'planning examples'],
        priority: 'medium'
      }
    ]
  },

  // 8. REGIONAL & LOCAL FOCUS
  {
    id: 'regional',
    name: 'Regional Focus',
    slug: 'regional',
    description: 'Business and finance news from Indian states, tier-2/3 cities, and regional markets',
    icon: 'MapPin',
    color: 'rose',
    featured: false,
    priority: 8,
    subcategories: [
      {
        id: 'north-india',
        name: 'North India Business',
        slug: 'north-india',
        description: 'Delhi, UP, Punjab, Haryana business and finance news',
        keywords: ['delhi business', 'up startups', 'punjab msme', 'north india finance'],
        priority: 'medium'
      },
      {
        id: 'south-india',
        name: 'South India Business',
        slug: 'south-india',
        description: 'Karnataka, Tamil Nadu, Kerala, Telangana business updates',
        keywords: ['bangalore startups', 'chennai business', 'south india finance'],
        priority: 'medium'
      },
      {
        id: 'east-india',
        name: 'East India Business',
        slug: 'east-india',
        description: 'West Bengal, Bihar, Odisha, North East business news',
        keywords: ['kolkata business', 'bihar msme', 'east india finance'],
        priority: 'medium'
      },
      {
        id: 'west-india',
        name: 'West India Business',
        slug: 'west-india',
        description: 'Maharashtra, Gujarat, Rajasthan, Goa business updates',
        keywords: ['mumbai finance', 'gujarat business', 'maharashtra startups'],
        priority: 'medium'
      },
      {
        id: 'tier2-tier3-cities',
        name: 'Tier-2/3 Cities',
        slug: 'tier2-tier3-cities',
        description: 'Emerging business hubs in smaller Indian cities',
        keywords: ['tier 2 cities', 'tier 3 business', 'emerging hubs india'],
        priority: 'high'
      }
    ]
  },

  // 9. TRENDING & DAILY NEWS
  {
    id: 'trending',
    name: 'Trending Today',
    slug: 'trending',
    description: 'Breaking news, daily highlights, and trending finance stories',
    icon: 'Flame',
    color: 'red',
    featured: true,
    priority: 9,
    subcategories: [
      {
        id: 'breaking-news',
        name: 'Breaking News',
        slug: 'breaking-news',
        description: 'Latest breaking financial and business news',
        keywords: ['breaking news', 'latest news', 'finance news today'],
        priority: 'high'
      },
      {
        id: 'daily-digest',
        name: 'Daily Digest',
        slug: 'daily-digest',
        description: 'What you need to know today - curated daily finance updates',
        keywords: ['daily news', 'market wrap', 'today highlights', 'news summary'],
        priority: 'high'
      },
      {
        id: 'trending-topics',
        name: 'Trending Topics',
        slug: 'trending-topics',
        description: 'Viral finance stories and trending business discussions',
        keywords: ['trending', 'viral finance', 'hot topics', 'popular stories'],
        priority: 'medium'
      }
    ]
  }
];

// Helper functions
export const getCategoryBySlug = (slug: string): NewsCategory | undefined => {
  return newsCategories.find(cat => cat.slug === slug);
};

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string): NewsSubcategory | undefined => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
};

export const getAllSubcategories = (): NewsSubcategory[] => {
  return newsCategories.flatMap(cat => cat.subcategories);
};

export const getFeaturedCategories = (): NewsCategory[] => {
  return newsCategories.filter(cat => cat.featured).sort((a, b) => a.priority - b.priority);
};

export const getHighPrioritySubcategories = (): NewsSubcategory[] => {
  return getAllSubcategories().filter(sub => sub.priority === 'high');
};

