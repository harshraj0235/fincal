/**
 * Article 5: Lenskart IPO Proceeds Usage Plan
 * Category: Business Analysis → Strategy
 * Author: Saurabh Kumar
 * Slug: lenskart-ipo-6000-crore-spending-plan
 */

import { lenskartIpoProceeds } from '../../../data/news-articles/lenskart-markets-series';
import { convertGuideToHtml } from '../../../utils/convertGuideToHtml';

const article = {
  id: 'article-05-ipo-proceeds-usage',
  slug: 'lenskart-ipo-6000-crore-spending-plan',
  title: '₹6,000 करोड़ का खजाना! लेंसकार्ट IPO से मिले पैसे कहां खर्च होंगे? | पूरी inside स्टोरी',
  excerpt: 'Technology से लेकर Store Expansion तक - जानें हर एक रुपये की योजना और आपके लिए क्या मतलब है',
  content: convertGuideToHtml(lenskartIpoProceeds),
  category: 'business-analysis',
  subCategory: 'strategy',
  authorId: 'saurabh-kumar',
  datePublished: '2025-01-19',
  image: '/images/news/lenskart-expansion.jpg',
  tags: ['Lenskart', 'IPO', 'Business Strategy', 'Expansion', 'Investment Planning', 'Hindi'],
  readTime: 14,
  views: 8750
};

export default article;

