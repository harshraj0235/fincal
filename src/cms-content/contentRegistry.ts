// Central registry for all news articles
// This file is auto-updated when new articles are added

export interface NewsArticleMetadata {
  id: string;
  slug: string;
  category: string;
  subCategory?: string;
  title: string;
  authorId: string;
  datePublished: string;
  image: string;
}

export const contentRegistry: NewsArticleMetadata[] = [
  // Markets Category
  {
    id: 'article-01-lenskart-ipo-matters',
    slug: 'lenskart-ipo-announcement-hindi',
    category: 'markets',
    title: 'Why Lenskart's upcoming IPO matters for Indian eyewear',
    authorId: 'raushan-kumar',
    datePublished: '2025-01-15',
    image: '/images/news/lenskart-ipo.jpg'
  },
  {
    id: 'article-02-valuation-breakdown',
    slug: 'lenskart-valuation-67000-crore-analysis',
    category: 'markets',
    title: 'Breaking down Lenskart's valuation: What ₹70,000 crore means',
    authorId: 'raushan-kumar',
    datePublished: '2025-01-16',
    image: '/images/news/lenskart-valuation.jpg'
  },
  {
    id: 'article-06-ipo-risks',
    slug: 'lenskart-ipo-10-risks-paytm-comparison',
    category: 'markets',
    title: 'Is Lenskart's IPO over-priced? Risks investors should know',
    authorId: 'raushan-kumar',
    datePublished: '2025-01-20',
    image: '/images/news/lenskart-risks.jpg'
  },
  {
    id: 'article-10-retail-investor-guide',
    slug: 'lenskart-ipo-retail-investor-guide',
    category: 'markets',
    title: 'Lenskart's IPO: What retail investors should watch',
    authorId: 'saurabh-kumar',
    datePublished: '2025-01-24',
    image: '/images/news/lenskart-retail.jpg'
  },
  
  // Business Analysis Category
  {
    id: 'article-03-omnichannel-footprint',
    slug: 'lenskart-2000-stores-omnichannel-strategy',
    category: 'business-analysis',
    title: 'From online to 2,000+ stores: How Lenskart built its omnichannel footprint',
    authorId: 'harsh-raj',
    datePublished: '2025-01-17',
    image: '/images/news/lenskart-stores.jpg'
  },
  {
    id: 'article-05-ipo-proceeds-usage',
    slug: 'lenskart-ipo-6000-crore-spending-plan',
    category: 'business-analysis',
    title: 'What Lenskart will do with IPO proceeds: Expansion, tech & brand building',
    authorId: 'saurabh-kumar',
    datePublished: '2025-01-19',
    image: '/images/news/lenskart-expansion.jpg'
  },
  {
    id: 'article-09-market-trends-support',
    slug: 'eyewear-market-trends-2025',
    category: 'business-analysis',
    title: 'How the eyewear market trend supports Lenskart's growth story',
    authorId: 'harsh-raj',
    datePublished: '2025-01-23',
    image: '/images/news/eyewear-trends.jpg'
  },
  {
    id: 'article-12-eyewear-purchase-behavior',
    slug: 'eyewear-purchase-behavior-trends',
    category: 'business-analysis',
    title: 'Emerging eyewear purchase behaviour: More frequent buys, style changes',
    authorId: 'harsh-raj',
    datePublished: '2025-01-26',
    image: '/images/news/consumer-behavior.jpg'
  },
  
  // Startups Category
  {
    id: 'article-04-major-investors',
    slug: 'lenskart-investors-softbank-premji-returns',
    category: 'startups',
    title: 'Major investors behind Lenskart: Who's backing the eyewear boom?',
    authorId: 'vikram-kumar',
    datePublished: '2025-01-18',
    image: '/images/news/lenskart-investors.jpg'
  },
  {
    id: 'article-08-founder-stake-strategy',
    slug: 'founder-stake-increase-strategy',
    category: 'startups',
    title: 'How the founder increased his stake ahead of listing',
    authorId: 'harsh-raj',
    datePublished: '2025-01-22',
    image: '/images/news/founder-strategy.jpg'
  },
  
  // Economy Category
  {
    id: 'article-07-regulatory-nod',
    slug: 'sebi-approval-lenskart-eyewear-industry-impact',
    category: 'economy',
    title: 'Lenskart gets regulatory nod for IPO — what this means for the Indian eyewear sector',
    authorId: 'raushan-kumar',
    datePublished: '2025-01-21',
    image: '/images/news/sebi-approval.jpg'
  },
  {
    id: 'article-11-eyewear-market-growth',
    slug: 'india-eyewear-market-growth-forecast',
    category: 'economy',
    title: 'Why the eyewear market in India is poised to grow at double-digit rates',
    authorId: 'raushan-kumar',
    datePublished: '2025-01-25',
    image: '/images/news/market-growth.jpg'
  }
];

