/**
 * Investing & Wealth Creation - Complete Lesson Registry
 * Category: investing-wealth
 * Total Lessons: 10 comprehensive lessons
 * Target: Indian audience (Hindi + English)
 * SEO: Optimized for Google ranking
 */

export interface LearnLesson {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  relatedCalculators: string[];
  order: number;
}

export const investingCategory = {
  id: 'investing-wealth',
  slug: 'investing-wealth',
  name: 'Investing & Wealth Creation',
  nameHindi: 'निवेश और संपत्ति निर्माण',
  icon: '📈',
  description: 'Stocks, mutual funds, SIPs, asset allocation for long-term wealth building',
  descriptionHindi: 'शेयर, म्यूचुअल फंड, एसआईपी, दीर्घकालिक धन निर्माण के लिए संपत्ति आवंटन',
  color: 'from-purple-500 to-indigo-600',
  totalLessons: 10,
  estimatedHours: 8
};

export const investingLessons: LearnLesson[] = [
  {
    id: 'stock-market-basics',
    slug: 'stock-market-basics-shares-nse-bse-demat-india',
    title: 'Stock Market Basics: Shares, NSE, BSE, Demat Account',
    titleHindi: 'शेयर बाजार की बुनियादी बातें: शेयर, NSE, BSE, डीमैट खाता',
    description: 'Understand how stock market works in India, how to open demat account, buy/sell shares, and make your first investment',
    descriptionHindi: 'समझें कि भारत में शेयर बाजार कैसे काम करता है, डीमैट खाता कैसे खोलें, शेयर कैसे खरीदें/बेचें, और अपना पहला निवेश कैसे करें',
    duration: '50 mins',
    difficulty: 'beginner',
    tags: ['Stock Market', 'Demat Account', 'NSE', 'BSE', 'Hindi'],
    relatedCalculators: ['/calculators/sip-calculator', '/calculators/stock-return-calculator'],
    order: 1
  },
  {
    id: 'mutual-funds-complete',
    slug: 'mutual-funds-complete-guide-sip-nav-expense-ratio-india',
    title: 'Mutual Funds Complete Guide: SIP, NAV, Expense Ratio, Types',
    titleHindi: 'म्यूचुअल फंड संपूर्ण गाइड: SIP, NAV, व्यय अनुपात, प्रकार',
    description: 'Master mutual funds: How they work, SIP vs lumpsum, NAV calculation, expense ratio, types (equity/debt/hybrid), and how to choose best funds',
    descriptionHindi: 'म्यूचुअल फंड में महारत: वे कैसे काम करते हैं, SIP बनाम एकमुश्त, NAV गणना, व्यय अनुपात, प्रकार (इक्विटी/डेट/हाइब्रिड), और सर्वश्रेष्ठ फंड कैसे चुनें',
    duration: '60 mins',
    difficulty: 'beginner',
    tags: ['Mutual Funds', 'SIP', 'NAV', 'Expense Ratio', 'Hindi'],
    relatedCalculators: ['/calculators/sip-calculator', '/calculators/mutual-fund-returns-calculator'],
    order: 2
  },
  {
    id: 'sip-mastery',
    slug: 'sip-systematic-investment-plan-strategy-india-wealth-building',
    title: 'SIP Mastery: How to Build ₹1 Crore with Monthly Investments',
    titleHindi: 'SIP में महारत: मासिक निवेश से ₹1 करोड़ कैसे बनाएं',
    description: 'Deep dive into SIP: Power of rupee cost averaging, SIP calculator usage, choosing right amount, step-up SIPs, and achieving ₹1 crore goal',
    descriptionHindi: 'SIP में गहराई: रुपये की लागत औसत की शक्ति, SIP कैलकुलेटर उपयोग, सही राशि चुनना, स्टेप-अप SIP, और ₹1 करोड़ लक्ष्य प्राप्त करना',
    duration: '55 mins',
    difficulty: 'intermediate',
    tags: ['SIP', 'Wealth Building', 'Rupee Cost Averaging', 'Hindi'],
    relatedCalculators: ['/calculators/sip-calculator', '/calculators/step-up-sip-calculator'],
    order: 3
  },
  {
    id: 'index-funds-etfs',
    slug: 'index-funds-etfs-nifty-sensex-passive-investing-india',
    title: 'Index Funds & ETFs: Nifty 50, Sensex - Passive Investing Guide',
    titleHindi: 'इंडेक्स फंड और ETF: निफ्टी 50, सेंसेक्स - निष्क्रिय निवेश गाइड',
    description: 'Learn passive investing with index funds and ETFs. Why Nifty 50 beats 80% active funds, how to invest, taxation, and long-term wealth building',
    descriptionHindi: 'इंडेक्स फंड और ETF के साथ निष्क्रिय निवेश सीखें। क्यों निफ्टी 50, 80% सक्रिय फंड को हराता है, कैसे निवेश करें, कराधान, और दीर्घकालिक धन निर्माण',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Index Funds', 'ETF', 'Nifty 50', 'Passive Investing', 'Hindi'],
    relatedCalculators: ['/calculators/index-fund-calculator', '/calculators/sip-calculator'],
    order: 4
  },
  {
    id: 'asset-allocation',
    slug: 'asset-allocation-equity-debt-gold-diversification-india',
    title: 'Asset Allocation: Equity, Debt, Gold - Diversification Strategy',
    titleHindi: 'परिसंपत्ति आवंटन: इक्विटी, डेट, गोल्ड - विविधीकरण रणनीति',
    description: 'Master portfolio diversification: 60-30-10 rule, age-based allocation, rebalancing, risk management for Indian investors',
    descriptionHindi: 'पोर्टफोलियो विविधीकरण में महारत: 60-30-10 नियम, उम्र-आधारित आवंटन, पुनर्संतुलन, भारतीय निवेशकों के लिए जोखिम प्रबंधन',
    duration: '50 mins',
    difficulty: 'intermediate',
    tags: ['Asset Allocation', 'Diversification', 'Portfolio', 'Hindi'],
    relatedCalculators: ['/calculators/asset-allocation-planner', '/calculators/portfolio-rebalancing'],
    order: 5
  },
  {
    id: 'direct-vs-regular-funds',
    slug: 'direct-vs-regular-mutual-funds-expense-ratio-comparison-india',
    title: 'Direct vs Regular Mutual Funds: Save ₹15L with Direct Plans',
    titleHindi: 'डायरेक्ट बनाम रेगुलर म्यूचुअल फंड: डायरेक्ट प्लान से ₹15L बचाएं',
    description: 'Understand direct vs regular plans, expense ratio difference, how commissions work, and why direct plans save ₹15L+ over 30 years',
    descriptionHindi: 'डायरेक्ट बनाम रेगुलर प्लान को समझें, व्यय अनुपात अंतर, कमीशन कैसे काम करता है, और क्यों डायरेक्ट प्लान 30 वर्षों में ₹15L+ बचाते हैं',
    duration: '40 mins',
    difficulty: 'intermediate',
    tags: ['Direct Plans', 'Regular Plans', 'Expense Ratio', 'Hindi'],
    relatedCalculators: ['/calculators/direct-vs-regular-calculator'],
    order: 6
  },
  {
    id: 'tax-on-investments',
    slug: 'taxation-on-investments-ltcg-stcg-equity-debt-india',
    title: 'Taxation on Investments: LTCG, STCG (Equity, Debt, Gold)',
    titleHindi: 'निवेश पर कर: LTCG, STCG (इक्विटी, डेट, गोल्ड)',
    description: 'Complete tax guide for investors: Long-term vs short-term capital gains, taxation on equity, debt, gold. Tax-saving strategies.',
    descriptionHindi: 'निवेशकों के लिए संपूर्ण कर गाइड: दीर्घकालिक बनाम अल्पकालिक पूंजीगत लाभ, इक्विटी, डेट, गोल्ड पर कराधान। कर-बचत रणनीतियां',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Taxation', 'LTCG', 'STCG', 'Capital Gains', 'Hindi'],
    relatedCalculators: ['/calculators/capital-gains-tax-calculator'],
    order: 7
  },
  {
    id: 'value-vs-growth-investing',
    slug: 'value-investing-vs-growth-investing-warren-buffett-strategy-india',
    title: 'Value vs Growth Investing: Warren Buffett Strategy for India',
    titleHindi: 'वैल्यू बनाम ग्रोथ निवेश: भारत के लिए वॉरेन बफेट रणनीति',
    description: 'Learn value investing (buy undervalued stocks) vs growth investing (high-growth companies). Which works better in India?',
    descriptionHindi: 'वैल्यू निवेश (कम मूल्य वाले शेयर खरीदें) बनाम ग्रोथ निवेश (उच्च-विकास कंपनियां) सीखें। भारत में कौन बेहतर काम करता है?',
    duration: '50 mins',
    difficulty: 'advanced',
    tags: ['Value Investing', 'Growth Investing', 'Warren Buffett', 'Hindi'],
    relatedCalculators: ['/calculators/stock-valuation-calculator'],
    order: 8
  },
  {
    id: 'nism-certification-guide',
    slug: 'nism-certification-investment-advisor-mutual-fund-india',
    title: 'NISM Certifications: Become Investment Advisor (Series V-A, X-A)',
    titleHindi: 'NISM प्रमाणपत्र: निवेश सलाहकार बनें (सीरीज V-A, X-A)',
    description: 'Guide to NISM certifications for aspiring investment advisors: Series V-A (MF Distributors), X-A (Investment Advisers). Career in finance.',
    descriptionHindi: 'इच्छुक निवेश सलाहकारों के लिए NISM प्रमाणपत्र गाइड: सीरीज V-A (MF वितरक), X-A (निवेश सलाहकार)। वित्त में करियर',
    duration: '40 mins',
    difficulty: 'advanced',
    tags: ['NISM', 'Certification', 'Investment Advisor', 'Career', 'Hindi'],
    relatedCalculators: ['/calculators/investment-returns-calculator'],
    order: 9
  },
  {
    id: 'common-investing-mistakes',
    slug: 'investing-mistakes-to-avoid-panic-selling-timing-market-india',
    title: 'Top 10 Investing Mistakes: Panic Selling, Timing Market, Over-Trading',
    titleHindi: 'शीर्ष 10 निवेश गलतियाँ: घबराहट में बेचना, बाजार का समय, अधिक ट्रेडिंग',
    description: 'Learn from expensive mistakes: Panic selling in crashes, trying to time market, over-diversification, chasing returns. Avoid ₹5-10L losses.',
    descriptionHindi: 'महंगी गलतियों से सीखें: दुर्घटनाओं में घबराहट में बेचना, बाजार का समय देना, अधिक विविधीकरण, रिटर्न का पीछा करना। ₹5-10L नुकसान से बचें',
    duration: '45 mins',
    difficulty: 'beginner',
    tags: ['Mistakes', 'Panic Selling', 'Market Timing', 'Hindi'],
    relatedCalculators: ['/calculators/sip-calculator', '/calculators/investment-loss-calculator'],
    order: 10
  }
];

// SEO keywords for the category
export const investingSEO = {
  metaTitle: 'Investing & Wealth Creation Guide for Indians | MoneyCal Learn',
  metaDescription: 'Master stock market, mutual funds, SIPs, asset allocation in Hindi & English. 10 comprehensive lessons with Indian examples, calculators & NISM guide.',
  keywords: 'stock market India, mutual funds guide, SIP investing, asset allocation, index funds, value investing, NISM certification, direct vs regular, capital gains tax, निवेश गाइड, शेयर बाजार',
  canonicalUrl: 'https://moneycal.in/learn/investing-wealth'
};



