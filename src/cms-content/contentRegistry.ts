// Central registry for all news articles
// This file is auto-updated when new articles are added

export interface NewsArticleMetadata {
  id: string;
  slug: string;
  category: string;
  subCategory?: string;
  title: string;
  excerpt?: string;
  authorId: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  readTime?: number; // in minutes
  tags?: string[];
}

export const contentRegistry: NewsArticleMetadata[] = [
  // Markets Category
  {
    id: 'article-01-lenskart-ipo-matters',
    slug: 'lenskart-ipo-announcement-hindi',
    category: 'markets',
    subCategory: 'IPOs & Listings',
    title: 'Why Lenskart\'s upcoming IPO matters for Indian eyewear',
    excerpt: 'Lenskart का ₹6,000 करोड़ IPO at ₹67,000 करोड़ valuation - India की पहली exclusive eyewear retail listing। Retail investors के लिए complete analysis in Hindi.',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-06',
    dateModified: '2025-10-29',
    image: '/images/news/lenskart-ipo.jpg',
    readTime: 10,
    tags: ['Lenskart IPO', 'IPO 2025', 'eyewear stocks', 'retail investors', 'SEBI approval', 'Hindi news']
  },
  {
    id: 'article-02-valuation-breakdown',
    slug: 'lenskart-valuation-67000-crore-analysis',
    category: 'markets',
    subCategory: 'IPOs & Listings',
    title: 'Breaking down Lenskart\'s valuation: What ₹70,000 crore means',
    excerpt: 'Lenskart ki ₹67,000 crore valuation expensive hai ya sahi? Complete breakdown - 12.9x P/S ratio analysis, comparison with Nykaa, Titan aur global peers। Hindi mein samjho.',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-07',
    dateModified: '2025-10-29',
    image: '/images/news/lenskart-valuation.jpg',
    readTime: 12,
    tags: ['Lenskart valuation', 'IPO analysis', 'P/S ratio', 'stock valuation', 'investment guide', 'Hindi finance']
  },
  {
    id: 'article-06-ipo-risks',
    slug: 'lenskart-ipo-10-risks-paytm-comparison',
    category: 'markets',
    subCategory: 'IPOs & Listings',
    title: 'Is Lenskart\'s IPO over-priced? Risks investors should know',
    excerpt: '10 bade risks jo Lenskart IPO mein hain - Paytm jaisa crash ho sakta? Competition, China dependency, overvaluation। Hindi mein samjho har risk.',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-20',
    dateModified: '2025-10-29',
    image: '/images/news/lenskart-risks.jpg',
    readTime: 11,
    tags: ['IPO risks', 'Lenskart dangers', 'Paytm comparison', 'investment warning', 'Hindi investor guide']
  },
  {
    id: 'article-10-retail-investor-guide',
    slug: 'lenskart-ipo-retail-investor-guide',
    category: 'markets',
    subCategory: 'IPOs & Listings',
    title: 'Lenskart\'s IPO: What retail investors should watch',
    excerpt: 'Lenskart IPO mein invest karne se pehle 7 cheezein jaan lo - Application process, allotment chances, listing strategy। Complete beginner guide Hindi mein.',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-24',
    dateModified: '2025-10-29',
    image: '/images/news/lenskart-retail.jpg',
    readTime: 9,
    tags: ['retail investor guide', 'IPO application process', 'Hindi investment', 'beginner IPO', 'UPI ASBA']
  },
  
  // Business Analysis Category
  {
    id: 'article-03-omnichannel-footprint',
    slug: 'lenskart-2000-stores-omnichannel-strategy',
    category: 'business-analysis',
    subCategory: 'Deep Dives & Case Studies',
    title: 'From online to 2,000+ stores: How Lenskart built its omnichannel footprint',
    excerpt: 'Online से 2,000+ stores तक का journey - Lenskart ने omnichannel model crack कैसे किया? ₹2,000 करोड़ investment, 80% profitable stores। Hindi case study.',
    authorId: 'harsh-raj',
    datePublished: '2025-10-17',
    dateModified: '2025-10-29',
    image: '/images/news/lenskart-stores.jpg',
    readTime: 10,
    tags: ['omnichannel retail', 'Lenskart stores', 'business strategy', 'retail expansion', 'Hindi business']
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
    title: 'How the eyewear market trend supports Lenskart\'s growth story',
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
    subCategory: 'Startup Funding & News',
    title: 'Major investors behind Lenskart: Who\'s backing the eyewear boom?',
    excerpt: 'SoftBank, Premji Invest, Temasek ने कमाए 7-9x returns! Lenskart के बड़े investors की complete story - kitna lagaya, kitna kamaya। Hindi mein जानो।',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-18',
    dateModified: '2025-10-29',
    image: '/images/news/lenskart-investors.jpg',
    readTime: 12,
    tags: ['SoftBank India', 'Premji Invest', 'startup funding', 'investor returns', 'Hindi startup news']
  },
  {
    id: 'article-08-founder-stake-strategy',
    slug: 'founder-stake-increase-strategy',
    category: 'startups',
    subCategory: 'Founder Stories',
    title: 'How the founder increased his stake ahead of listing',
    excerpt: 'Peyush Bansal ने ₹800 करोड़ लगाकर अपनी stake 18% से 22% बढ़ाई IPO से पहले। Genius strategy या risky bet? Complete analysis Hindi mein।',
    authorId: 'harsh-raj',
    datePublished: '2025-10-22',
    dateModified: '2025-10-29',
    image: '/images/news/founder-strategy.jpg',
    readTime: 11,
    tags: ['Peyush Bansal', 'founder strategy', 'stake management', 'startup dilution', 'Shark Tank judge', 'Hindi startup']
  },
  
  // Economy Category
  {
    id: 'article-07-regulatory-nod',
    slug: 'sebi-approval-lenskart-eyewear-industry-impact',
    category: 'economy',
    subCategory: 'Government Policy & Regulation',
    title: 'Lenskart gets regulatory nod for IPO — what this means for the Indian eyewear sector',
    excerpt: 'SEBI से approval मिला Lenskart को - eyewear sector organized होगा। Small shops के लिए warning, consumers के लिए फायदा। Complete impact analysis Hindi mein.',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-06',
    dateModified: '2025-10-29',
    image: '/images/news/sebi-approval.jpg',
    readTime: 10,
    tags: ['SEBI approval', 'eyewear regulation', 'organized retail', 'government policy', 'Hindi business news']
  },
  {
    id: 'article-11-eyewear-market-growth',
    slug: 'india-eyewear-market-growth-forecast',
    category: 'economy',
    title: 'Why the eyewear market in India is poised to grow at double-digit rates',
    excerpt: 'India ka eyewear market ₹45,000 crore se ₹1,05,000 crore tak grow hoga 2030 tak - 18% CAGR. Key drivers, opportunities aur Lenskart IPO investors ke liye kya matlab। Hindi analysis.',
    authorId: 'raushan-kumar',
    datePublished: '2025-01-25',
    dateModified: '2025-01-26',
    image: '/images/news/market-growth.jpg',
    readTime: 8,
    tags: ['eyewear market', 'Lenskart IPO', 'India economy', 'retail sector', 'growth forecast']
  }
];

