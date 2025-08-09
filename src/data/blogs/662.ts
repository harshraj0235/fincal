import { blogPosts } from '../blogData1';

const blog662 = {
  id: 662,
  slug: 'mumbai-ppf-nsc-rates-q3-2025-planning-guide',
  title: 'Mumbai Investors: PPF and NSC Rates in Q3 2025 — Simple Planning Guide',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
  authorBio: 'Educational finance content for Indian readers. Not investment advice.',
  metaDescription: 'PPF and NSC rates for Q3 2025: how to use them in a simple goal-based plan for Mumbai investors, with calculators.',
  excerpt: 'Goal-first allocation using PPF and NSC can simplify your 2025 plan. Here’s a quick framework and calculators to try.',
  categories: ['News', 'Mumbai', 'PPF', 'NSC'],
  keywords: ['PPF rate 2025', 'NSC rate 2025', 'Mumbai investors PPF', 'goal-based planning India'],
  date: new Date().toISOString().split('T')[0],
  coverImage: 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg',
  content: [
    { type: 'heading', content: 'Rates + goals = clarity' },
    { type: 'paragraph', content: 'Rather than chasing rates, align PPF/NSC with goal timelines. Use PPF for long-term compounding and NSC for medium-term certainty.' },
    { type: 'subheading', content: 'A simple allocation example' },
    { type: 'list', items: [
      'Emergency: liquid funds',
      '3–5 years: NSC for stability',
      '10–15 years: PPF + equity index SIP'
    ]},
    { type: 'subheading', content: 'Use these tools' },
    { type: 'list', items: ['PPF Calculator', 'SIP Calculator', 'Income Tax Calculator']}
  ],
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 3,
  schema: { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: 'PPF and NSC Rates in Q3 2025' },
  openGraph: {
    title: 'PPF and NSC Rates in Q3 2025 — Simple Planning Guide',
    description: 'A goal-first framework with calculators for Mumbai investors.',
    image: 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg',
    url: '/blog/mumbai-ppf-nsc-rates-q3-2025-planning-guide',
    type: 'article',
    siteName: 'MoneyCal India'
  },
  discoverOptimized: { highQualityImages: true, originalReporting: false, expertiseSignals: true, freshContent: true }
};

export const relatedBlogPosts = blogPosts.filter(p => p.categories?.some(c => blog662.categories.includes(c))).slice(0, 3);
export default blog662;


