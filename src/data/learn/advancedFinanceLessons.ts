/**
 * Advanced Topics / Specialised Finance - Complete Lesson Registry  
 * Category: advanced-finance
 * Total Lessons: 7 comprehensive lessons
 * Target: Experienced Indian investors (Hindi + English)
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

export const advancedFinanceCategory = {
  id: 'advanced-finance',
  slug: 'advanced-specialised-finance',
  name: 'Advanced Topics / Specialised Finance',
  nameHindi: 'उन्नत विषय / विशेष वित्त',
  icon: '🎯',
  description: 'Real estate investment, commodities trading, global markets, alternative investments for experienced Indian investors',
  descriptionHindi: 'रियल एस्टेट निवेश, कमोडिटी ट्रेडिंग, वैश्विक बाजार, अनुभवी भारतीय निवेशकों के लिए वैकल्पिक निवेश',
  color: 'from-purple-500 to-pink-600',
  totalLessons: 7,
  estimatedHours: 6
};

export const advancedFinanceLessons: LearnLesson[] = [
  {
    id: 'real-estate-investment',
    slug: 'real-estate-investment-india-residential-commercial-reits-property-guide-2025',
    title: 'Real Estate Investment: Residential, Commercial, REITs, Property Guide (India 2025)',
    titleHindi: 'रियल एस्टेट निवेश: आवासीय, वाणिज्यिक, REITs, संपत्ति गाइड (भारत 2025)',
    description: 'Complete real estate guide: Residential vs commercial, REITs (₹10K minimum), rental yield (3-5%), capital appreciation, stamp duty, property taxes, legal due diligence',
    descriptionHindi: 'संपूर्ण रियल एस्टेट गाइड: आवासीय बनाम वाणिज्यिक, REITs (₹10K न्यूनतम), किराया उपज (3-5%), पूंजी वृद्धि, स्टाम्प ड्यूटी, संपत्ति कर, कानूनी परिश्रम',
    duration: '55 mins',
    difficulty: 'advanced',
    tags: ['Real Estate', 'REITs', 'Property Investment', 'Rental Yield', 'Hindi'],
    relatedCalculators: [],
    order: 1
  },
  {
    id: 'commodities-trading',
    slug: 'commodities-trading-india-gold-silver-crude-oil-mcx-ncdex-guide-2025',
    title: 'Commodities Trading: Gold, Silver, Crude Oil - MCX & NCDEX Guide (India 2025)',
    titleHindi: 'कमोडिटी ट्रेडिंग: सोना, चांदी, कच्चा तेल - MCX और NCDEX गाइड (भारत 2025)',
    description: 'Trade commodities: MCX (Multi Commodity Exchange), NCDEX (agricultural), gold/silver futures, crude oil, margin trading, hedging strategies, commodity ETFs',
    descriptionHindi: 'कमोडिटी ट्रेड करें: MCX (मल्टी कमोडिटी एक्सचेंज), NCDEX (कृषि), सोना/चांदी फ्यूचर्स, कच्चा तेल, मार्जिन ट्रेडिंग, हेजिंग रणनीतियां, कमोडिटी ETFs',
    duration: '50 mins',
    difficulty: 'advanced',
    tags: ['Commodities', 'MCX', 'Gold Trading', 'Futures', 'Hindi'],
    relatedCalculators: [],
    order: 2
  },
  {
    id: 'global-investing',
    slug: 'global-investing-us-stocks-international-mutual-funds-liberalized-remittance-scheme-india-2025',
    title: 'Global Investing: US Stocks, International Mutual Funds, LRS (India 2025)',
    titleHindi: 'वैश्विक निवेश: US स्टॉक्स, अंतर्राष्ट्रीय म्यूचुअल फंड्स, LRS (भारत 2025)',
    description: 'Invest globally: US stocks via Vested/Groww ($250K LRS limit), international mutual funds (Nasdaq 100, S&P 500), currency risk, TDS on global investments',
    descriptionHindi: 'वैश्विक निवेश करें: Vested/Groww के माध्यम से US स्टॉक्स ($250K LRS सीमा), अंतर्राष्ट्रीय म्यूचुअल फंड्स (Nasdaq 100, S&P 500), मुद्रा जोखिम, वैश्विक निवेश पर TDS',
    duration: '55 mins',
    difficulty: 'advanced',
    tags: ['Global Investing', 'US Stocks', 'International MF', 'LRS', 'Hindi'],
    relatedCalculators: [],
    order: 3
  },
  {
    id: 'derivatives-trading',
    slug: 'derivatives-trading-futures-options-nifty-bank-nifty-hedging-india-2025',
    title: 'Derivatives Trading: Futures & Options (F&O), Nifty, Bank Nifty, Hedging (India 2025)',
    titleHindi: 'डेरिवेटिव ट्रेडिंग: फ्यूचर्स और ऑप्शंस (F&O), निफ्टी, बैंक निफ्टी, हेजिंग (भारत 2025)',
    description: 'Master F&O trading: Call & put options, futures contracts, Nifty/Bank Nifty, margin requirements, Greeks (delta, gamma), hedging portfolio risk, options strategies',
    descriptionHindi: 'F&O ट्रेडिंग में महारत: कॉल और पुट ऑप्शंस, फ्यूचर्स कॉन्ट्रैक्ट्स, निफ्टी/बैंक निफ्टी, मार्जिन आवश्यकताएं, ग्रीक्स (डेल्टा, गामा), पोर्टफोलियो जोखिम हेजिंग, ऑप्शंस रणनीतियां',
    duration: '60 mins',
    difficulty: 'advanced',
    tags: ['Derivatives', 'F&O', 'Options', 'Futures', 'Nifty', 'Hindi'],
    relatedCalculators: [],
    order: 4
  },
  {
    id: 'cryptocurrency-guide',
    slug: 'cryptocurrency-investment-bitcoin-ethereum-tax-regulations-india-2025',
    title: 'Cryptocurrency Investment: Bitcoin, Ethereum, Tax (30% + 1% TDS), Regulations (India 2025)',
    titleHindi: 'क्रिप्टोकरेंसी निवेश: बिटकॉइन, एथेरियम, टैक्स (30% + 1% TDS), नियम (भारत 2025)',
    description: 'Invest in crypto: Bitcoin, Ethereum, crypto exchanges (WazirX, CoinDCX), tax (30% flat + 1% TDS on transactions), legal status, wallet security, risks',
    descriptionHindi: 'क्रिप्टो में निवेश करें: बिटकॉइन, एथेरियम, क्रिप्टो एक्सचेंज (WazirX, CoinDCX), टैक्स (30% फ्लैट + लेनदेन पर 1% TDS), कानूनी स्थिति, वॉलेट सुरक्षा, जोखिम',
    duration: '50 mins',
    difficulty: 'advanced',
    tags: ['Cryptocurrency', 'Bitcoin', 'Ethereum', 'Crypto Tax', 'Hindi'],
    relatedCalculators: [],
    order: 5
  },
  {
    id: 'alternative-investments',
    slug: 'alternative-investments-india-aif-pms-gold-bonds-sovereign-bonds-invoice-discounting-2025',
    title: 'Alternative Investments: AIF, PMS, Gold Bonds, Sovereign Bonds, Invoice Discounting (India 2025)',
    titleHindi: 'वैकल्पिक निवेश: AIF, PMS, सोने के बॉन्ड, सॉवरेन बॉन्ड, इनवॉइस डिस्काउंटिंग (भारत 2025)',
    description: 'Explore alternatives: AIF (₹1Cr minimum, category I/II/III), PMS (₹50L), Sovereign Gold Bonds (2.5% interest + gold appreciation), invoice discounting, P2P lending',
    descriptionHindi: 'विकल्प तलाशें: AIF (₹1Cr न्यूनतम, श्रेणी I/II/III), PMS (₹50L), सॉवरेन गोल्ड बॉन्ड (2.5% ब्याज + सोने की वृद्धि), इनवॉइस डिस्काउंटिंग, P2P लेंडिंग',
    duration: '55 mins',
    difficulty: 'advanced',
    tags: ['Alternative Investments', 'AIF', 'PMS', 'Gold Bonds', 'Hindi'],
    relatedCalculators: [],
    order: 6
  },
  {
    id: 'estate-planning-inheritance',
    slug: 'estate-planning-inheritance-tax-wealth-transfer-family-office-india-2025',
    title: 'Estate Planning & Inheritance: Wealth Transfer, Family Office (No Inheritance Tax in India 2025)',
    titleHindi: 'संपदा योजना और विरासत: धन हस्तांतरण, पारिवारिक कार्यालय (भारत में कोई विरासत कर नहीं 2025)',
    description: 'Plan wealth transfer: Will vs trust, succession planning, HUF (Hindu Undivided Family) benefits, family office (₹100Cr+ wealth), gifting strategies (no gift tax to relatives)',
    descriptionHindi: 'धन हस्तांतरण की योजना बनाएं: वसीयत बनाम ट्रस्ट, उत्तराधिकार योजना, HUF (हिंदू अविभाजित परिवार) लाभ, पारिवारिक कार्यालय (₹100Cr+ धन), उपहार देने की रणनीतियां (रिश्तेदारों को कोई उपहार कर नहीं)',
    duration: '55 mins',
    difficulty: 'advanced',
    tags: ['Estate Planning', 'Inheritance', 'Family Office', 'Will', 'Hindi'],
    relatedCalculators: [],
    order: 7
  }
];

// SEO keywords for the category
export const advancedFinanceSEO = {
  metaTitle: 'Advanced Topics & Specialised Finance Guide for Indians | MoneyCal Learn',
  metaDescription: 'Master real estate investment, commodities trading (MCX/NCDEX), global investing (US stocks), derivatives (F&O), cryptocurrency, alternative investments (AIF/PMS), estate planning in Hindi & English. 7 advanced lessons for experienced investors.',
  keywords: 'real estate investment India, commodities trading MCX, global investing US stocks, derivatives F&O, cryptocurrency Bitcoin, alternative investments AIF PMS, estate planning, उन्नत वित्त विषय',
  canonicalUrl: '/learn/advanced-specialised-finance'
};






