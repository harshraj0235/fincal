/**
 * Category 9: Macro-Economic Trends and Geopolitical Sentiment Analysis
 * High-DA content for long-term financial planning.
 */
export interface MacroTrend {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  description: string;
  excerptHindi: string;
  impactScale: 'National' | 'Global' | 'Regional';
  sectorsAffected: string[];
  faqSchema: { question: string; answer: string }[];
  keywords: string[];
}

export const macroTrends: MacroTrend[] = [
  {
    id: 'india-gdp-7-percent-impact-2026',
    slug: 'india-gdp-7-percent-growth-2026-sectors-to-watch',
    title: 'India GDP 7% Growth 2026: Top 5 Sectors Poised for Massive Growth',
    titleHindi: 'भारत की 7% जीडीपी वृद्धि 2026: भारी वृद्धि के लिए तैयार शीर्ष 5 क्षेत्र',
    category: 'Macro Trends',
    description: 'Detailed analysis of India\'s projected 7% GDP growth in 2026 and investment opportunities.',
    excerptHindi: '2026 में भारत की अनुमानित 7% जीडीपी वृद्धि और निवेश के अवसरों का विस्तृत विश्लेषण।',
    impactScale: 'National',
    sectorsAffected: ['Banking & Finance', 'Infrastructure', 'Green Energy', 'Information Technology', 'Semiconductors'],
    keywords: ['India GDP forecast 2026', 'best sectors for investment 2026', 'India economic growth future'],
    faqSchema: [
      { question: 'Is 7% GDP growth sustainable for India?', answer: 'Economists believe strong domestic consumption and infra spending will support this trend.' },
      { question: 'Which sector will benefit most from 7% growth?', answer: 'Infrastructure and Green Energy are expected to see significant policy support.' }
    ]
  },
  {
    id: 'bse-sensex-100k-2026',
    slug: 'bse-sensex-100000-prediction-2026-analysis',
    title: 'BSE Sensex 100,000: Technical Analysis & Prediction for Late 2026',
    titleHindi: 'BSE सेंसेक्स 100,000: 2026 के अंत के लिए तकनीकी विश्लेषण और भविष्यवाणी',
    category: 'Macro Trends',
    description: 'Expert analysis of Sensex reaching the 100,000 milestone in 2026 and equity market sentiment.',
    excerptHindi: '2026 में सेंसेक्स के 100,000 के मील का पत्थर छूने और शेयर बाजार की धारणा का विशेषज्ञ विश्लेषण।',
    impactScale: 'National',
    sectorsAffected: ['Banking', 'IT Services', 'Auto', 'Consumer Goods'],
    keywords: ['Sensex 100k prediction 2026', 'Indian stock market outlook 2026', 'BSE target price 2026'],
    faqSchema: [
      { question: 'When will Sensex touch 100,000?', answer: 'Technical indicators suggest a potential touchpoint in Q3 or Q4 of 2026.' }
    ]
  },
  {
    id: 'india-fertility-rate-economy-2026',
    slug: 'india-demographic-dividend-update-2026-economic-impact',
    title: 'India Demographic Dividend 2026: Shift in Labor & Consumption Patterns',
    titleHindi: 'भारत जनसांख्यिकीय लाभांश 2026: श्रम और उपभोग पैटर्न में बदलाव',
    category: 'Macro Trends',
    description: 'Impact of changing demographic trends on Indian domestic consumption and labor markets in 2026.',
    excerptHindi: '2026 में भारतीय घरेलू खपत और श्रम बाजारों पर बदलते जनसांख्यिकीय रुझानों का प्रभाव।',
    impactScale: 'National',
    sectorsAffected: ['Healthcare', 'Education', 'FMCG', 'Real Estate'],
    keywords: ['India demographic dividend 2026', 'consumption trends 2026', 'impact on labor market India'],
    faqSchema: [
      { question: 'Is India\'s demographic dividend ending?', answer: 'No, but 2026 marks a critical shift toward "Silver Economy" and higher value consumption.' }
    ]
  }
];
