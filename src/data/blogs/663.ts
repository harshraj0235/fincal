import { blogPosts } from '../blogData1';

const blog663 = {
  id: 663,
  slug: 'bengaluru-salary-tax-2025-smart-switch-new-old-regime',
  title: 'Bengaluru Salaried in 2025: Smart Switch Between New and Old Tax Regimes',
  author: 'Harsh Raj',
  authorTitle: 'Software Engineer & Finance Enthusiast',
  authorImage: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg',
  authorBio: 'Educational content. Not legal/tax advice.',
  metaDescription: 'How Bengaluru salaried employees can compare new vs old tax regimes in 2025 with simple rules of thumb and calculators.',
  excerpt: 'Matching your deductions to the right regime can improve in-hand salary. Use our calculator and quick checks.',
  categories: ['Guides', 'Bengaluru', 'Income Tax'],
  keywords: ['new vs old regime 2025', 'Bengaluru tax', 'salary calculator India'],
  date: new Date().toISOString().split('T')[0],
  coverImage: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
  content: [
    { type: 'heading', content: 'Quick regime chooser' },
    { type: 'paragraph', content: 'If your total deductions (80C, 80D, HRA, home loan interest) are low, new regime often wins. If they’re high and stable, old regime can be optimal.' },
    { type: 'subheading', content: 'Try the calculator' },
    { type: 'paragraph', content: 'Use our Income Tax Calculator to simulate both regimes with your exact figures. Revisit after bonus or rent changes.' }
  ],
  publishedDate: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  readingTime: 2,
  schema: { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: 'Smart Switch: New vs Old Regime (2025)' },
  openGraph: {
    title: 'Bengaluru 2025: Smart Switch Between New and Old Tax Regimes',
    description: 'Simple rules + calculator for better in-hand salary.',
    image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg',
    url: '/blog/bengaluru-salary-tax-2025-smart-switch-new-old-regime',
    type: 'article',
    siteName: 'MoneyCal India'
  },
  discoverOptimized: { highQualityImages: true, originalReporting: false, expertiseSignals: true, freshContent: true }
};

export const relatedBlogPosts = blogPosts.filter(p => p.categories?.some(c => blog663.categories.includes(c))).slice(0, 3);
export default blog663;


