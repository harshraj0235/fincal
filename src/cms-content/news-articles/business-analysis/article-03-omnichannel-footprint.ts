/**
 * Article 3: Lenskart Omnichannel Strategy
 * Category: Business Analysis → Case Studies
 * Author: Harsh Raj
 * Slug: lenskart-2000-stores-omnichannel-strategy
 */

import { lenskartOmnichannelCaseStudy } from '../../../data/news-articles/lenskart-markets-series';
import { convertGuideToHtml } from '../../../utils/convertGuideToHtml';

const article = {
  id: 'article-03-omnichannel-footprint',
  slug: 'lenskart-2000-stores-omnichannel-strategy',
  title: '2000+ स्टोर्स का जादू! कैसे लेंसकार्ट ने ऑनलाइन से ऑफलाइन तक डोमिनेट किया? | पूरी सक्सेस स्टोरी',
  excerpt: 'एक छोटी वेबसाइट से 15 साल में ₹67,000 करोड़ की कंपनी - भारत का सबसे बड़ा ओम्नीचैनल रिटेल केस स्टडी',
  content: convertGuideToHtml(lenskartOmnichannelCaseStudy),
  category: 'business-analysis',
  subCategory: 'case-studies',
  authorId: 'harsh-raj',
  datePublished: '2025-01-17',
  image: '/images/news/lenskart-stores.jpg',
  tags: ['Lenskart', 'Omnichannel', 'Retail Strategy', 'Case Study', 'Business Model', 'Hindi'],
  readTime: 16,
  views: 9800
};

export default article;

