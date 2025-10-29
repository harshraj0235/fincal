/**
 * Article 6: Lenskart IPO Risks Analysis
 * Category: Markets → IPOs & Listings
 * Author: Raushan Kumar
 * Slug: lenskart-ipo-10-risks-paytm-comparison
 */

import { lenskartIpoRisks } from '../../../data/news-articles/lenskart-markets-series';
import { convertGuideToHtml } from '../../../utils/convertGuideToHtml';

const article = {
  id: 'article-06-ipo-risks',
  slug: 'lenskart-ipo-10-risks-paytm-comparison',
  title: 'खतरे की घंटी! लेंसकार्ट IPO में निवेश से पहले ये 10 बड़े खतरे जान लें | Paytm जैसा हो सकता है?',
  excerpt: '₹67,000 करोड़ Overpriced है? Competition, Profitability, और 8 और Risks - Full Analysis',
  content: convertGuideToHtml(lenskartIpoRisks),
  category: 'markets',
  subCategory: 'ipos-listings',
  authorId: 'raushan-kumar',
  datePublished: '2025-01-20',
  image: '/images/news/lenskart-risks.jpg',
  tags: ['Lenskart', 'IPO', 'Risk Analysis', 'Paytm', 'Investment Warning', 'Hindi'],
  readTime: 18,
  views: 10250
};

export default article;

