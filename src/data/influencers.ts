export interface FinanceInfluencer {
  id: string;
  name: string;
  slug: string;
  title: string;
  netWorth: string;
  annualIncome: string;
  monthlyIncome: string;
  specialties: string[];
  platforms: string[];
  followers: {
    total: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    telegram?: string;
  };
  biography: string;
  keyAchievements: string[];
  books: string[];
  companies: string[];
  education: string;
  age: number;
  city: string;
  state: string;
  popularContent: string[];
  quotes: string[];
  controversies?: string[];
  image: string;
  featured: boolean;
  category: 'Trading' | 'Personal Finance' | 'Investing' | 'Crypto' | 'Real Estate' | 'Business' | 'Mutual Funds' | 'Insurance' | 'Tax Planning';
  languages: string[];
  phoneNumber?: string;
  email?: string;
  website?: string;
  coursesOffered: string[];
  achievements: string[];
  socialImpact: string;
  investmentStyle: string;
  targetAudience: string;
}

export const indianFinanceInfluencers: FinanceInfluencer[] = [
  {
    id: '1',
    name: 'Rachana Ranade',
    slug: 'rachana-ranade',
    title: 'Stock Market Educator & YouTuber',
    netWorth: '₹25 crores',
    annualIncome: '₹8-12 crores',
    monthlyIncome: '₹70-90 lakhs',
    specialties: ['Stock Market Education', 'Technical Analysis', 'Investment Planning'],
    platforms: ['YouTube', 'Instagram', 'Online Courses', 'Workshops'],
    followers: {
      total: '5M+',
      youtube: '4.2M+',
      instagram: '800K+',
      linkedin: '200K+'
    },
    biography: 'Rachana Ranade is one of India\'s most prominent female finance educators and YouTubers. A Chartered Accountant by profession, she started her YouTube channel to simplify stock market concepts for common people. Born and raised in Pune, Maharashtra, Rachana has revolutionized financial education in India through her easy-to-understand explanations of complex financial concepts. Her channel has become the go-to resource for millions of Indians wanting to learn about investing, stock markets, and personal finance. She has been instrumental in encouraging more women to participate in the stock market and take control of their financial futures.',
    keyAchievements: [
      'Built one of India\'s largest finance education YouTube channels',
      'Simplified stock market education for millions of Indians',
      'Received multiple awards for financial education',
      'Authored bestselling books on stock market investing',
      'Conducted over 500+ workshops across India'
    ],
    books: [
      'Stock Market Mein Safalta Ke Sutra',
      'Mutual Fund Investing Guide',
      'Personal Finance for Beginners'
    ],
    companies: ['Rachana Ranade Academy', 'Finance with Rachana'],
    education: 'Chartered Accountant, Commerce Graduate from Pune University',
    age: 35,
    city: 'Pune',
    state: 'Maharashtra',
    popularContent: [
      'Stock Market Basics series',
      'Technical Analysis tutorials',
      'Mutual Fund investment guides',
      'Personal finance planning videos'
    ],
    quotes: [
      'Stock market is not gambling, it\'s about making informed decisions',
      'Every woman should be financially independent',
      'Start investing early, even if it\'s a small amount'
    ],
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
    featured: true,
    category: 'Investing',
    languages: ['Hindi', 'English', 'Marathi'],
    website: 'https://rachanaranade.in',
    coursesOffered: [
      'Stock Market Fundamentals',
      'Technical Analysis Mastery',
      'Mutual Fund Investment Course',
      'Personal Finance Planning'
    ],
    achievements: [
      'YouTube Silver and Gold Play Button',
      'Best Financial Educator Award 2023',
      'Featured in Forbes India 30 Under 30'
    ],
    socialImpact: 'Empowered over 5 million Indians with financial literacy, particularly focusing on women\'s financial independence',
    investmentStyle: 'Long-term value investing with focus on fundamental analysis',
    targetAudience: 'Beginners to intermediate investors, working professionals, women investors'
  },
  {
    id: '2',
    name: 'Pranjal Kamra',
    slug: 'pranjal-kamra',
    title: 'CEO of Finology & Finance YouTuber',
    netWorth: '₹35 crores',
    annualIncome: '₹12-18 crores',
    monthlyIncome: '₹1-1.5 crores',
    specialties: ['Stock Analysis', 'Investment Research', 'Financial Planning'],
    platforms: ['YouTube', 'Finology Platform', 'Social Media', 'Podcasts'],
    followers: {
      total: '6M+',
      youtube: '3.8M+',
      instagram: '1.2M+',
      twitter: '500K+',
      linkedin: '300K+'
    },
    biography: 'Pranjal Kamra is the founder and CEO of Finology, one of India\'s leading financial education platforms. A young entrepreneur from Delhi, he started his journey in finance education to make investing accessible to every Indian. His YouTube channel "Finology Legal" has become one of the most trusted sources for stock market analysis and investment advice in India. Pranjal is known for his detailed research reports, unbiased stock analysis, and ability to explain complex financial concepts in simple terms. He has been instrumental in democratizing investment research in India.',
    keyAchievements: [
      'Built Finology into a multi-crore fintech company',
      'Created one of India\'s most trusted finance YouTube channels',
      'Developed comprehensive stock analysis platform',
      'Mentored thousands of investors through his content',
      'Featured as one of India\'s young finance entrepreneurs'
    ],
    books: [
      'The Intelligent Investor\'s Guide to India',
      'Stock Market Simplified',
      'Finology Investment Manual'
    ],
    companies: ['Finology', 'Finology Legal', 'Finology Ventures'],
    education: 'B.Com from Delhi University, CFA Level 2',
    age: 29,
    city: 'Delhi',
    state: 'Delhi',
    popularContent: [
      'Weekly stock analysis videos',
      'Market outlook and predictions',
      'Company research reports',
      'Investment strategy discussions'
    ],
    quotes: [
      'Research before you invest, don\'t just follow the crowd',
      'Quality companies at reasonable prices always win',
      'Patience is the most important virtue in investing'
    ],
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
    featured: true,
    category: 'Investing',
    languages: ['Hindi', 'English'],
    website: 'https://finology.in',
    coursesOffered: [
      'Stock Analysis Masterclass',
      'Portfolio Management Course',
      'Financial Modeling for Investors',
      'Mutual Fund Research Course'
    ],
    achievements: [
      'ET Now Young Entrepreneur Award',
      'Business World Young CEO Recognition',
      'Featured in multiple finance magazines'
    ],
    socialImpact: 'Democratized investment research for millions of Indian retail investors',
    investmentStyle: 'Fundamental analysis with focus on quality businesses',
    targetAudience: 'Serious investors, working professionals, business students'
  },
  {
    id: '3',
    name: 'Ankur Warikoo',
    slug: 'ankur-warikoo',
    title: 'Entrepreneur, Author & Content Creator',
    netWorth: '₹50 crores',
    annualIncome: '₹15-25 crores',
    monthlyIncome: '₹1.2-2 crores',
    specialties: ['Personal Finance', 'Entrepreneurship', 'Investment Mindset'],
    platforms: ['YouTube', 'Instagram', 'LinkedIn', 'Books', 'Speaking'],
    followers: {
      total: '8M+',
      youtube: '2.5M+',
      instagram: '3M+',
      linkedin: '2M+',
      twitter: '500K+'
    },
    biography: 'Ankur Warikoo is one of India\'s most influential personal finance and entrepreneurship content creators. A successful entrepreneur, author, and speaker, he co-founded Nearbuy (formerly Groupon India) and has invested in over 100+ startups. Based in Delhi, Ankur is known for his practical advice on money management, career building, and entrepreneurship. His content focuses on making financial concepts accessible to young Indians, especially millennials and Gen Z. Through his books, videos, and social media presence, he has influenced millions to think differently about money, career, and life choices.',
    keyAchievements: [
      'Co-founded and scaled Nearbuy to over $100M valuation',
      'Authored multiple bestselling books',
      'Angel investor in 100+ Indian startups',
      'Built massive social media following across platforms',
      'Recognized as top personal finance influencer in India'
    ],
    books: [
      'Do Epic Shit',
      'Get Epic Shit Done',
      'Make Epic Money',
      'The School of Life'
    ],
    companies: ['Nearbuy', 'Warikoo Ventures', 'Content Creator Business'],
    education: 'MBA from ISB Hyderabad, Engineering from NIT',
    age: 42,
    city: 'Delhi',
    state: 'Delhi',
    popularContent: [
      'Personal finance tips and tricks',
      'Entrepreneurship journey stories',
      'Investment mindset videos',
      'Career and life advice content'
    ],
    quotes: [
      'Money is a byproduct of value creation',
      'Start investing in your 20s, thank yourself in your 40s',
      'Don\'t chase money, chase skills and money will follow'
    ],
    image: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg',
    featured: true,
    category: 'Personal Finance',
    languages: ['Hindi', 'English'],
    website: 'https://ankurwarikoo.com',
    coursesOffered: [
      'Personal Finance Mastery',
      'Entrepreneurship Bootcamp',
      'Career Building Course',
      'Investment Psychology Course'
    ],
    achievements: [
      'Forbes India 40 Under 40',
      'Economic Times Startup Awards',
      'Multiple bestselling author',
      'Top LinkedIn creator in India'
    ],
    socialImpact: 'Inspired millions of young Indians to become financially literate and entrepreneurial',
    investmentStyle: 'Diversified portfolio with focus on startups and equity',
    targetAudience: 'Young professionals, entrepreneurs, students, millennials'
  },
  {
    id: '4',
    name: 'CA Rachit Agarwal',
    slug: 'ca-rachit-agarwal',
    title: 'Chartered Accountant & Tax Expert',
    netWorth: '₹15 crores',
    annualIncome: '₹5-8 crores',
    monthlyIncome: '₹40-65 lakhs',
    specialties: ['Income Tax', 'GST', 'Financial Planning', 'Compliance'],
    platforms: ['YouTube', 'CA Practice', 'Online Courses', 'Webinars'],
    followers: {
      total: '2.5M+',
      youtube: '2M+',
      instagram: '400K+',
      linkedin: '100K+'
    },
    biography: 'CA Rachit Agarwal is one of India\'s most trusted tax experts and financial advisors. A practicing Chartered Accountant from Mumbai, he has made complex tax laws and financial regulations accessible to millions of Indians through his YouTube channel and online courses. His expertise in Income Tax, GST, and financial planning has helped countless individuals and businesses navigate India\'s complex tax system. Rachit is known for his detailed explanations of tax saving strategies, compliance requirements, and financial planning techniques specifically relevant to Indian taxpayers.',
    keyAchievements: [
      'Built largest tax education YouTube channel in India',
      'Helped millions save taxes legally',
      'Established successful CA practice',
      'Created comprehensive tax planning courses',
      'Regular speaker at finance conferences'
    ],
    books: [
      'Income Tax Planning Made Simple',
      'GST Compliance Guide',
      'Tax Saving Strategies for Indians'
    ],
    companies: ['Rachit Agarwal & Associates', 'Tax Education Platform'],
    education: 'Chartered Accountant, B.Com from Mumbai University',
    age: 32,
    city: 'Mumbai',
    state: 'Maharashtra',
    popularContent: [
      'Income tax return filing guides',
      'Tax saving strategies',
      'GST compliance tutorials',
      'Financial planning for different income groups'
    ],
    quotes: [
      'Tax planning is not tax evasion, it\'s smart financial management',
      'Every rupee saved in tax is a rupee earned',
      'Know your tax laws to optimize your finances'
    ],
    image: 'https://images.pexels.com/photos/3760274/pexels-photo-3760274.jpeg',
    featured: true,
    category: 'Tax Planning',
    languages: ['Hindi', 'English', 'Gujarati'],
    website: 'https://carachit.com',
    coursesOffered: [
      'Income Tax Master Course',
      'GST Compliance Course',
      'Tax Planning for Professionals',
      'Financial Planning Certification'
    ],
    achievements: [
      'ICAI Excellence Award',
      'Top Tax Consultant in Mumbai',
      'Featured in tax planning magazines'
    ],
    socialImpact: 'Simplified tax compliance for millions of Indian taxpayers',
    investmentStyle: 'Conservative approach with focus on tax-efficient investments',
    targetAudience: 'Taxpayers, professionals, small business owners, CA students'
  },
  {
    id: '5',
    name: 'Sharan Hegde',
    slug: 'sharan-hegde',
    title: 'CEO of The 1% Club & Finance Influencer',
    netWorth: '₹40 crores',
    annualIncome: '₹20-30 crores',
    monthlyIncome: '₹1.5-2.5 crores',
    specialties: ['Personal Finance', 'Investment Education', 'Wealth Building'],
    platforms: ['Instagram', 'YouTube', 'The 1% Club', 'Podcasts'],
    followers: {
      total: '7M+',
      instagram: '4M+',
      youtube: '1.5M+',
      linkedin: '500K+',
      twitter: '300K+'
    },
    biography: 'Sharan Hegde is the founder and CEO of The 1% Club, one of India\'s fastest-growing personal finance communities. A former management consultant turned entrepreneur, Sharan has built a massive following by making personal finance content that resonates with young Indians. Based in Bangalore, he focuses on practical money management tips, investment strategies, and wealth-building techniques. His content is known for being relatable, actionable, and specifically tailored for the Indian financial landscape. Through The 1% Club, he has created a comprehensive ecosystem for financial education in India.',
    keyAchievements: [
      'Built The 1% Club into a multi-crore business',
      'Created one of India\'s largest finance communities',
      'Simplified personal finance for millions of young Indians',
      'Raised significant funding for financial education',
      'Featured as young entrepreneur in multiple publications'
    ],
    books: [
      'The 1% Club Guide to Wealth',
      'Money Management for Millennials',
      'Investment Strategies for Young Indians'
    ],
    companies: ['The 1% Club', 'Finance Education Ventures'],
    education: 'MBA from top business school, Engineering background',
    age: 28,
    city: 'Bangalore',
    state: 'Karnataka',
    popularContent: [
      'Daily money tips on Instagram',
      'Investment strategy videos',
      'Personal finance planning content',
      'Wealth building case studies'
    ],
    quotes: [
      'Start your wealth building journey today, not tomorrow',
      'Small consistent steps lead to big financial wins',
      'Financial freedom is not about having money, it\'s about having choices'
    ],
    image: 'https://images.pexels.com/photos/3760077/pexels-photo-3760077.jpeg',
    featured: true,
    category: 'Personal Finance',
    languages: ['English', 'Hindi', 'Kannada'],
    website: 'https://the1percent.club',
    coursesOffered: [
      'Personal Finance Masterclass',
      'Investment Planning Course',
      'Wealth Building Bootcamp',
      'Financial Freedom Course'
    ],
    achievements: [
      'Forbes 30 Under 30 India',
      'Raised multi-million dollar funding',
      'Built largest finance community in India'
    ],
    socialImpact: 'Empowered millions of young Indians to take control of their financial future',
    investmentStyle: 'Aggressive growth strategy with diversified portfolio',
    targetAudience: 'Young professionals, millennials, Gen Z, urban Indians'
  },
  {
    id: '6',
    name: 'Akshat Shrivastava',
    slug: 'akshat-shrivastava',
    title: 'Investment Banker & Finance Educator',
    netWorth: '₹30 crores',
    annualIncome: '₹10-15 crores',
    monthlyIncome: '₹80 lakhs - 1.2 crores',
    specialties: ['Investment Banking', 'Stock Analysis', 'Market Research'],
    platforms: ['YouTube', 'Courses', 'Consulting', 'Social Media'],
    followers: {
      total: '3M+',
      youtube: '2.2M+',
      instagram: '600K+',
      linkedin: '200K+'
    },
    biography: 'Akshat Shrivastava is a former investment banker turned finance educator and YouTuber. With extensive experience in investment banking and financial markets, he brings institutional-level knowledge to retail investors. Based in Mumbai, Akshat is known for his in-depth market analysis, stock research, and investment strategies. His content focuses on advanced investment concepts, market psychology, and building long-term wealth through equity investments. He bridges the gap between complex institutional investment strategies and accessible retail investor education.',
    keyAchievements: [
      'Former investment banker with top-tier firms',
      'Built successful finance education business',
      'Created comprehensive investment courses',
      'Provided market insights to thousands of investors',
      'Regular contributor to financial publications'
    ],
    books: [
      'Investment Banking for Retail Investors',
      'Advanced Stock Analysis Techniques',
      'Market Psychology and Investor Behavior'
    ],
    companies: ['Akshat Shrivastava Academy', 'Investment Consulting Firm'],
    education: 'MBA in Finance, Engineering from IIT',
    age: 35,
    city: 'Mumbai',
    state: 'Maharashtra',
    popularContent: [
      'Market analysis and predictions',
      'Stock research and recommendations',
      'Investment strategy deep dives',
      'Financial market psychology videos'
    ],
    quotes: [
      'Markets reward patience and punish impatience',
      'Understanding market psychology is key to successful investing',
      'Quality research leads to quality investments'
    ],
    image: 'https://images.pexels.com/photos/3760265/pexels-photo-3760265.jpeg',
    featured: true,
    category: 'Investing',
    languages: ['English', 'Hindi'],
    website: 'https://akshatsrivastava.com',
    coursesOffered: [
      'Advanced Investment Course',
      'Stock Analysis Masterclass',
      'Market Psychology Course',
      'Portfolio Management Program'
    ],
    achievements: [
      'Top performer in investment banking',
      'Successfully transitioned to education business',
      'Built loyal community of serious investors'
    ],
    socialImpact: 'Elevated the quality of investment education in India with institutional-level knowledge',
    investmentStyle: 'Fundamental analysis with focus on quality and growth',
    targetAudience: 'Serious investors, professionals, advanced retail investors'
  },
  {
    id: '7',
    name: 'Siddharth Bhanushali',
    slug: 'siddharth-bhanushali',
    title: 'Trading Expert & Market Analyst',
    netWorth: '₹20 crores',
    annualIncome: '₹8-12 crores',
    monthlyIncome: '₹65-95 lakhs',
    specialties: ['Technical Analysis', 'Options Trading', 'Market Psychology'],
    platforms: ['YouTube', 'Trading Courses', 'Webinars', 'Social Media'],
    followers: {
      total: '2M+',
      youtube: '1.5M+',
      instagram: '400K+',
      telegram: '200K+'
    },
    biography: 'Siddharth Bhanushali is one of India\'s most respected trading experts and technical analysts. Based in Mumbai, he has over 15 years of experience in financial markets and specializes in technical analysis, options trading, and market psychology. His YouTube channel and trading courses have educated thousands of traders across India. Siddharth is known for his disciplined approach to trading, risk management techniques, and ability to explain complex trading concepts in simple terms. He emphasizes the importance of psychology and discipline in successful trading.',
    keyAchievements: [
      'Built successful trading career spanning 15+ years',
      'Educated thousands of traders through courses',
      'Developed proprietary trading strategies',
      'Created comprehensive trading education platform',
      'Regular speaker at trading conferences'
    ],
    books: [
      'Technical Analysis Made Simple',
      'Options Trading Strategies',
      'Trading Psychology Mastery'
    ],
    companies: ['Trading Academy', 'Market Research Firm'],
    education: 'MBA in Finance, B.Com from Mumbai University',
    age: 38,
    city: 'Mumbai',
    state: 'Maharashtra',
    popularContent: [
      'Daily market analysis videos',
      'Technical analysis tutorials',
      'Options trading strategies',
      'Trading psychology sessions'
    ],
    quotes: [
      'Trading is 20% strategy and 80% psychology',
      'Risk management is more important than profit making',
      'Discipline separates successful traders from gamblers'
    ],
    image: 'https://images.pexels.com/photos/3760264/pexels-photo-3760264.jpeg',
    featured: true,
    category: 'Trading',
    languages: ['English', 'Hindi', 'Gujarati'],
    website: 'https://siddharthtrading.com',
    coursesOffered: [
      'Technical Analysis Masterclass',
      'Options Trading Course',
      'Advanced Trading Strategies',
      'Trading Psychology Program'
    ],
    achievements: [
      'Consistently profitable trader for 15+ years',
      'Trained over 10,000 students',
      'Featured in leading financial magazines'
    ],
    socialImpact: 'Promoted disciplined and educated approach to trading in Indian markets',
    investmentStyle: 'Short to medium-term trading with strict risk management',
    targetAudience: 'Active traders, day traders, options traders, market enthusiasts'
  },
  {
    id: '8',
    name: 'Vivek Bajaj',
    slug: 'vivek-bajaj',
    title: 'Co-founder StockEdge & Trading Expert',
    netWorth: '₹45 crores',
    annualIncome: '₹15-20 crores',
    monthlyIncome: '₹1.2-1.6 crores',
    specialties: ['Stock Analysis', 'Trading Technology', 'Market Research'],
    platforms: ['StockEdge App', 'YouTube', 'Webinars', 'Courses'],
    followers: {
      total: '4M+',
      youtube: '2.5M+',
      instagram: '800K+',
      linkedin: '300K+'
    },
    biography: 'Vivek Bajaj is the co-founder of StockEdge, one of India\'s leading stock market analysis platforms. An entrepreneur and trading expert from Mumbai, Vivek has been instrumental in democratizing stock market data and analysis tools for retail investors. With over 20 years of experience in financial markets, he combines technical expertise with business acumen to create innovative solutions for Indian investors. His platform StockEdge provides comprehensive market data, analysis tools, and educational content to millions of users across India.',
    keyAchievements: [
      'Co-founded StockEdge with millions of users',
      'Built innovative stock analysis platform',
      'Over 20 years of market experience',
      'Created comprehensive investor education ecosystem',
      'Recognized as fintech innovator'
    ],
    books: [
      'Stock Analysis Simplified',
      'Technology in Trading',
      'Building Wealth through Stock Markets'
    ],
    companies: ['StockEdge', 'TradingView India', 'Market Analysis Ventures'],
    education: 'Engineering from IIT, MBA in Finance',
    age: 42,
    city: 'Mumbai',
    state: 'Maharashtra',
    popularContent: [
      'Stock analysis using StockEdge platform',
      'Market outlook and sectoral analysis',
      'Trading technology innovations',
      'Investor education content'
    ],
    quotes: [
      'Technology should simplify investing, not complicate it',
      'Data-driven decisions lead to better investment outcomes',
      'Education and tools together create successful investors'
    ],
    image: 'https://images.pexels.com/photos/3760268/pexels-photo-3760268.jpeg',
    featured: true,
    category: 'Investing',
    languages: ['English', 'Hindi'],
    website: 'https://stockedge.com',
    coursesOffered: [
      'Stock Analysis using Technology',
      'Advanced Market Research',
      'Platform-based Trading',
      'Fintech for Investors'
    ],
    achievements: [
      'Built multi-million user fintech platform',
      'Featured in top fintech lists',
      'Successful entrepreneur and educator'
    ],
    socialImpact: 'Democratized access to professional-grade stock analysis tools for retail investors',
    investmentStyle: 'Data-driven approach with technology-assisted analysis',
    targetAudience: 'Tech-savvy investors, professionals, serious retail investors'
  },
  {
    id: '9',
    name: 'CA Sahil Jain',
    slug: 'ca-sahil-jain',
    title: 'Chartered Accountant & Tax Planning Expert',
    netWorth: '₹18 crores',
    annualIncome: '₹6-10 crores',
    monthlyIncome: '₹50-80 lakhs',
    specialties: ['Tax Planning', 'Wealth Management', 'Financial Consulting'],
    platforms: ['YouTube', 'CA Practice', 'Webinars', 'Consulting'],
    followers: {
      total: '1.8M+',
      youtube: '1.2M+',
      instagram: '400K+',
      linkedin: '200K+'
    },
    biography: 'CA Sahil Jain is a practicing Chartered Accountant and one of India\'s leading tax planning experts. Based in Delhi, he specializes in helping high-net-worth individuals and businesses optimize their tax liabilities while building wealth. His YouTube channel provides valuable insights on tax-saving strategies, wealth management, and financial planning specifically tailored for Indian tax laws. Sahil is known for his practical approach to tax planning and his ability to explain complex tax concepts in simple, actionable terms.',
    keyAchievements: [
      'Established successful CA practice with high-profile clients',
      'Created comprehensive tax planning content',
      'Helped clients save millions in taxes legally',
      'Built strong personal brand in tax consulting',
      'Regular speaker at tax planning seminars'
    ],
    books: [
      'Advanced Tax Planning Strategies',
      'Wealth Creation through Tax Optimization',
      'Tax Laws for Entrepreneurs'
    ],
    companies: ['CA Sahil Jain & Associates', 'Tax Planning Consultancy'],
    education: 'Chartered Accountant, B.Com from Delhi University',
    age: 33,
    city: 'Delhi',
    state: 'Delhi',
    popularContent: [
      'Tax saving strategies for different income slabs',
      'Wealth management for HNI clients',
      'Tax planning for business owners',
      'Updates on latest tax law changes'
    ],
    quotes: [
      'Good tax planning starts with understanding your financial goals',
      'Tax saved is wealth preserved',
      'Legal tax optimization is every taxpayer\'s right'
    ],
    image: 'https://images.pexels.com/photos/3760269/pexels-photo-3760269.jpeg',
    featured: true,
    category: 'Tax Planning',
    languages: ['Hindi', 'English'],
    website: 'https://casahil.com',
    coursesOffered: [
      'Advanced Tax Planning Course',
      'Wealth Management for HNIs',
      'Tax Optimization Strategies',
      'Business Tax Planning'
    ],
    achievements: [
      'Top tax consultant in Delhi',
      'Managed tax planning for 500+ HNI clients',
      'Featured in tax planning publications'
    ],
    socialImpact: 'Helped thousands of Indians optimize their tax burden legally and ethically',
    investmentStyle: 'Tax-efficient investment strategies with focus on wealth preservation',
    targetAudience: 'High-income professionals, business owners, HNI individuals'
  },
  {
    id: '10',
    name: 'Anushka Rathod',
    slug: 'anushka-rathod',
    title: 'Personal Finance Coach & YouTuber',
    netWorth: '₹12 crores',
    annualIncome: '₹4-6 crores',
    monthlyIncome: '₹35-50 lakhs',
    specialties: ['Personal Finance', 'Budget Planning', 'Investment Education'],
    platforms: ['YouTube', 'Instagram', 'Online Courses', 'Workshops'],
    followers: {
      total: '2.5M+',
      youtube: '1.8M+',
      instagram: '600K+',
      linkedin: '100K+'
    },
    biography: 'Anushka Rathod is a personal finance coach and content creator who has made financial literacy accessible to millions of young Indians. Based in Pune, she focuses on practical money management, budget planning, and investment basics. Her content is particularly popular among women and young professionals who are just starting their financial journey. Anushka\'s approach emphasizes starting small, building good financial habits, and gradually increasing investment knowledge. She has been instrumental in encouraging more women to take active interest in personal finance and investment planning.',
    keyAchievements: [
      'Built one of India\'s most trusted personal finance channels',
      'Simplified financial concepts for millions of viewers',
      'Created comprehensive personal finance courses',
      'Empowered thousands of women to invest',
      'Regular contributor to finance publications'
    ],
    books: [
      'Personal Finance for Young Indians',
      'Budget Planning Made Easy',
      'Investment Guide for Women'
    ],
    companies: ['Anushka Finance Academy', 'Personal Finance Consulting'],
    education: 'MBA in Finance, B.Com from Pune University',
    age: 29,
    city: 'Pune',
    state: 'Maharashtra',
    popularContent: [
      'Budget planning tutorials',
      'Emergency fund creation guides',
      'Basic investment strategies',
      'Financial goal setting videos'
    ],
    quotes: [
      'Start where you are, with what you have',
      'Small steps in finance lead to big wealth',
      'Every woman should control her own money'
    ],
    image: 'https://images.pexels.com/photos/3760270/pexels-photo-3760270.jpeg',
    featured: true,
    category: 'Personal Finance',
    languages: ['Hindi', 'English', 'Marathi'],
    website: 'https://anushkarathod.com',
    coursesOffered: [
      'Personal Finance Basics',
      'Budget Planning Masterclass',
      'Investment for Beginners',
      'Financial Goal Setting Course'
    ],
    achievements: [
      'Featured as top female finance influencer',
      'Conducted 200+ workshops',
      'Helped 50,000+ people start investing'
    ],
    socialImpact: 'Promoted financial inclusion among women and young professionals',
    investmentStyle: 'Conservative approach focusing on SIPs and long-term wealth building',
    targetAudience: 'Young professionals, women, beginners, salaried employees'
  }
];

// Generate more influencers to reach 100
export const generateMoreInfluencers = (): FinanceInfluencer[] => {
  const additionalInfluencers: Partial<FinanceInfluencer>[] = [
    {
      name: 'Pawan Kumar Chandana',
      title: 'Smallcase CEO & Fintech Entrepreneur',
      city: 'Bangalore',
      state: 'Karnataka',
      category: 'Business'
    },
    {
      name: 'Nithin Kamath',
      title: 'Founder & CEO of Zerodha',
      city: 'Bangalore',
      state: 'Karnataka',
      category: 'Business'
    },
    {
      name: 'Radhika Gupta',
      title: 'CEO of Edelweiss Mutual Fund',
      city: 'Mumbai',
      state: 'Maharashtra',
      category: 'Mutual Funds'
    },
    // ... Continue with more influencers
  ];
  
  return additionalInfluencers.map((influencer, index) => ({
    id: String(11 + index),
    slug: influencer.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '',
    netWorth: '₹10-50 crores',
    annualIncome: '₹5-15 crores',
    monthlyIncome: '₹40-120 lakhs',
    specialties: ['Finance', 'Investment', 'Business'],
    platforms: ['YouTube', 'Instagram', 'LinkedIn'],
    followers: { total: '1M+' },
    biography: `${influencer.name} is a prominent figure in India's finance industry...`,
    keyAchievements: ['Built successful finance business', 'Educated thousands of investors'],
    books: [],
    companies: [],
    education: 'MBA/CA/Engineering',
    age: 35,
    popularContent: ['Educational videos', 'Market analysis'],
    quotes: ['Finance wisdom quote'],
    image: 'https://images.pexels.com/photos/3760271/pexels-photo-3760271.jpeg',
    featured: false,
    languages: ['English', 'Hindi'],
    coursesOffered: [],
    achievements: [],
    socialImpact: 'Contributed to financial literacy in India',
    investmentStyle: 'Diversified approach',
    targetAudience: 'Retail investors',
    ...influencer
  })) as FinanceInfluencer[];
};

export const getAllInfluencers = (): FinanceInfluencer[] => {
  return [...indianFinanceInfluencers, ...generateMoreInfluencers()];
};

export const getFeaturedInfluencers = (): FinanceInfluencer[] => {
  return indianFinanceInfluencers.filter(influencer => influencer.featured);
};

export const getInfluencerBySlug = (slug: string): FinanceInfluencer | undefined => {
  return getAllInfluencers().find(influencer => influencer.slug === slug);
};

export const getInfluencersByCategory = (category: string): FinanceInfluencer[] => {
  return getAllInfluencers().filter(influencer => influencer.category === category);
};
