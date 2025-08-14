import { BlogPost } from './types';

import { blogPosts } from '../blogData1';

export const blog666: BlogPost = {
  id: 666,
  slug: 'bengaluru-esops-2025-taxation-and-liquidity-checklist',
  title: 'Bengaluru ESOPs in 2025: Taxation and Liquidity Checklist for Employees',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
  authorBio: 'Educational content. Not legal/tax advice.',
  metaDescription: 'A concise ESOP checklist for Bengaluru startup employees in 2025: tax timing, sell windows, and risk control.',
  excerpt: 'Understand grant vs vest vs exercise taxes, and map liquidity windows early. Simple checklist inside.',
  categories: ['Guides', 'Bengaluru', 'ESOP'],
  keywords: ['ESOP tax 2025', 'Bengaluru startups ESOP', 'ESOP liquidity India'],
  date: new Date().toISOString().split('T')[0],
  coverImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
  content: [
    { type: 'heading', content: 'ESOP basics' },
    { type: 'list', items: [
      'Grant: no tax generally; Vest: no tax; Exercise: perquisite tax may apply',
      'Sale: capital gains tax depending on holding period',
      'Prefer clear policy on buybacks and secondary windows'
    ]},
    { type: 'subheading', content: 'Plan ahead' },
    { type: 'list', items: ['Track vesting; maintain cash buffer for exercise tax; diversify post-liquidity']}
  ],
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 3,
  schema: { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: 'Bengaluru ESOPs: 2025 Checklist' },
  openGraph: {
    title: 'Bengaluru ESOPs in 2025: Taxation and Liquidity Checklist',
    description: 'Understand taxes and liquidity windows with a simple checklist.',
    image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
    url: '/blog/bengaluru-esops-2025-taxation-and-liquidity-checklist',
    type: 'article',
    siteName: 'MoneyCal India'
  },
  discoverOptimized: { highQualityImages: true, originalReporting: false, expertiseSignals: true, freshContent: true }
};

export const relatedBlogPosts = blogPosts.filter(p => p.categories?.some(c => blog666.categories.includes(c))).slice(0, 3);
export default blog666;


