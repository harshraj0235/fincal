import { blogPosts } from '../blogData1';

const blog667 = {
  id: 667,
  slug: 'noida-msme-credit-2025-new-eligibility-rules',
  title: 'Noida MSME Credit in 2025: New Eligibility Rules and How to Improve Approval Odds',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: 'https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg',
  authorBio: 'Educational content. Not financial advice.',
  metaDescription: 'Noida MSME credit in 2025: updated eligibility rules, document expectations, and a simple plan to improve approvals.',
  excerpt: 'Clean GST trails, bank statements with steady inflows, and invoice hygiene matter more in 2025. A quick MSME guide for Noida.',
  categories: ['Guides', 'Noida', 'MSME'],
  keywords: ['MSME credit Noida 2025', 'MSME loan eligibility India', 'Noida GST loans'],
  date: new Date().toISOString().split('T')[0],
  coverImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
  content: [
    { type: 'heading', content: 'What changed' },
    { type: 'list', items: [
      'Consistency over spikes in revenue',
      'GST return discipline; invoice reconciliation',
      'Digital footprint credibility: website, invoicing, payroll'
    ]},
    { type: 'subheading', content: 'Checklist' },
    { type: 'list', items: [
      'MSME Loan Eligibility Checker',
      'Bank statement analyzer (export to CSV)',
      'EMI Affordability for safe planning'
    ]}
  ],
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 3,
  schema: { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: 'Noida MSME Credit: 2025 Rules' },
  openGraph: {
    title: 'Noida MSME Credit in 2025: Improve Approval Odds',
    description: 'Eligibility changes and a practical checklist for founders.',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
    url: '/blog/noida-msme-credit-2025-new-eligibility-rules',
    type: 'article',
    siteName: 'MoneyCal India'
  },
  discoverOptimized: { highQualityImages: true, originalReporting: true, expertiseSignals: true, freshContent: true }
};

export const relatedBlogPosts = blogPosts.filter(p => p.categories?.some(c => blog667.categories.includes(c))).slice(0, 3);
export default blog667;


