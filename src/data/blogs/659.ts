import { blogPosts } from '../blogData1';

const blog659 = {
  id: 659,
  slug: 'mumbai-mutual-funds-shift-to-short-duration-bonds-2025',
  title: 'Mumbai Fund Managers Shift to Short-Duration Bonds: What It Means for SIP Investors (2025)',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
  authorBio: 'Harsh Raj writes educational content on finance in India. Not investment advice.',
  metaDescription: 'Short-duration bonds gain traction among Mumbai mutual funds in 2025. Understand the why, the risks, and how SIP investors can adapt.',
  excerpt: 'Interest-rate volatility is pushing Mumbai fund houses toward short-duration debt. Should retail SIP investors re-balance? We break it down.',
  categories: ['News', 'Mumbai', 'Mutual Funds', 'Bonds'],
  keywords: ['short duration funds', 'Mumbai mutual funds 2025', 'SIP rebalancing', 'debt funds India'],
  date: new Date().toISOString().split('T')[0],
  coverImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
  content: [
    { type: 'heading', content: 'Debt strategy pivots to shorter duration' },
    { type: 'paragraph', content: 'Amid rate uncertainty, several Mumbai-based AMCs are rotating into short-duration bonds and money-market instruments to preserve NAV and manage risk. Corporate treasuries are mirroring the move with laddered maturities.' },
    { type: 'subheading', content: 'Impact for SIP investors' },
    { type: 'list', items: [
      'Lower duration risk but potentially capped upside if rates fall fast',
      'Better liquidity and mark-to-market stability',
      'Consider hybrid allocation for balanced exposure'
    ]},
    { type: 'subheading', content: 'Simple rebalancing framework' },
    { type: 'list', items: [
      'Emergency corpus: liquid/overnight funds',
      'Near-term goals (1–3y): short duration funds',
      'Long-term (5y+): equity index + PPF/NPS blend'
    ]},
    { type: 'subheading', content: 'Try these tools' },
    { type: 'list', items: ['SIP Calculator', 'PPF Calculator', 'NPS Calculator']}
  ],
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 4,
  schema: {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Mumbai Fund Managers Shift to Short-Duration Bonds (2025)',
    image: ['https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg'],
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: { '@type': 'Person', name: 'Harsh Raj', url: '/author/harsh-raj' },
    publisher: { '@type': 'Organization', name: 'MoneyCal India' }
  },
  openGraph: {
    title: 'Short-Duration Bonds: What It Means for SIP Investors (2025)',
    description: 'Why Mumbai funds are rotating duration and how retail can adapt.',
    image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
    url: '/blog/mumbai-mutual-funds-shift-to-short-duration-bonds-2025',
    type: 'article',
    siteName: 'MoneyCal India'
  },
  discoverOptimized: { highQualityImages: true, originalReporting: true, expertiseSignals: true, freshContent: true }
};

export const relatedBlogPosts = blogPosts.filter(p => p.categories?.some(c => blog659.categories.includes(c))).slice(0, 3);
export default blog659;


