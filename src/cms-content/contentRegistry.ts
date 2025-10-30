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
    title: 'Why Lenskart\'s upcoming IPO matters for Indian eyewear',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'article-02-valuation-breakdown',
    slug: 'lenskart-valuation-67000-crore-analysis',
    category: 'markets',
    title: 'Breaking down Lenskart\'s valuation: What ₹70,000 crore means',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'article-06-ipo-risks',
    slug: 'lenskart-ipo-10-risks-paytm-comparison',
    category: 'markets',
    title: 'Is Lenskart\'s IPO over-priced? Risks investors should know',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'article-10-retail-investor-guide',
    slug: 'lenskart-ipo-retail-investor-guide',
    category: 'markets',
    title: 'Lenskart\'s IPO: What retail investors should watch',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80'
  },
  
  // Business Analysis Category
  {
    id: 'article-03-omnichannel-footprint',
    slug: 'lenskart-2000-stores-omnichannel-strategy',
    category: 'business-analysis',
    title: 'From online to 2,000+ stores: How Lenskart built its omnichannel footprint',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'article-05-ipo-proceeds-usage',
    slug: 'lenskart-ipo-6000-crore-spending-plan',
    category: 'business-analysis',
    title: 'What Lenskart will do with IPO proceeds: Expansion, tech & brand building',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'article-09-market-trends-support',
    slug: 'eyewear-market-trends-2025',
    category: 'business-analysis',
    title: 'How the eyewear market trend supports Lenskart\'s growth story',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'article-12-eyewear-purchase-behavior',
    slug: 'eyewear-purchase-behavior-trends',
    category: 'business-analysis',
    title: 'Emerging eyewear purchase behaviour: More frequent buys, style changes',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=1200&h=630&fit=crop&q=80'
  },
  
  // Startups Category
  {
    id: 'article-04-major-investors',
    slug: 'lenskart-investors-softbank-premji-returns',
    category: 'startups',
    title: 'Major investors behind Lenskart: Who\'s backing the eyewear boom?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'article-08-founder-stake-strategy',
    slug: 'founder-stake-increase-strategy',
    category: 'startups',
    title: 'How the founder increased his stake ahead of listing',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=630&fit=crop&q=80'
  },
  
  // Economy Category
  {
    id: 'article-07-regulatory-nod',
    slug: 'sebi-approval-lenskart-eyewear-industry-impact',
    category: 'economy',
    title: 'Lenskart gets regulatory nod for IPO — what this means for the Indian eyewear sector',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'article-11-eyewear-market-growth',
    slug: 'india-eyewear-market-growth-forecast',
    category: 'economy',
    title: 'Why the eyewear market in India is poised to grow at double-digit rates',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=630&fit=crop&q=80'
  },

  // NEW MARKETS ARTICLES - 10 comprehensive articles
  {
    id: 'stock-market-boom-2026',
    slug: 'india-stock-market-boom-2026-30000-nifty',
    category: 'markets',
    title: 'Stock Market 2026 में 30,000 तक? GDP, Earnings Growth से Bull Run',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'rbi-repo-rate-impact-2025',
    slug: 'rbi-repo-rate-cut-impact-stocks-bonds-fd',
    category: 'markets',
    title: 'RBI Repo Rate Cut का Portfolio पर Impact - Stocks, Bonds, FDs',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'midcap-stocks-outperform-2025',
    slug: '3-midcap-stocks-hidden-gems-250-percent-return',
    category: 'markets',
    title: '3 Mid-Cap Stocks जो Large-Caps को पीछे छोड़ रहे - Hidden Gems',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1642790551116-18e150f248e8?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'rupee-volatility-risk-2025',
    slug: 'rupee-dollar-volatility-portfolio-risk-2025',
    category: 'markets',
    title: 'Rupee Volatility: Dollar 83 to 85 - Portfolio Risk कैसे Manage करें',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'sector-rotation-strategy-2025',
    slug: 'sector-rotation-strategy-portfolio-rebalancing',
    category: 'markets',
    title: 'Sector Rotation Strategy: IT से Banking में Shift - Timing Perfect करें',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'fixed-income-risk-2025',
    slug: 'fixed-income-fd-bonds-hidden-risks-real-returns',
    category: 'markets',
    title: 'Fixed Income अब Safe नहीं! Bank FDs और Bonds में Hidden Risks',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'gold-vs-equities-2025',
    slug: 'gold-vs-equities-2025-2030-investment-battle',
    category: 'markets',
    title: 'Gold vs Indian Equities: 2025-2030 में किसका Rule होगा?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'foreign-money-risks-2025',
    slug: 'fii-foreign-investment-india-risks-opportunities',
    category: 'markets',
    title: 'Foreign Money India में आ रहा - लेकिन Hidden Risks क्या हैं?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'smallcap-bubble-2025',
    slug: 'smallcap-bubble-warning-overvaluation-correction-risk',
    category: 'markets',
    title: 'Small-Cap Bubble Warning! India के Small Caps Overvalued हैं?',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'gov-policy-impact-2025',
    slug: 'government-policy-portfolio-impact-budget-rbi',
    category: 'markets',
    title: 'Government Policy आपका Portfolio बना या बिगाड़ सकती है!',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=630&fit=crop&q=80'
  },

  // NEW BUSINESS ANALYSIS ARTICLES - 6 comprehensive articles
  {
    id: 'reliance-disney-merger-2025',
    slug: 'reliance-disney-merger-70000-crore-ott-jiocinema-hotstar',
    category: 'business-analysis',
    title: 'Reliance-Disney का ₹70,000 Crore Merger - OTT का नया राजा!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'manufacturing-pli-success-2025',
    slug: 'make-in-india-pli-scheme-dixon-waaree-success',
    category: 'business-analysis',
    title: 'Make in India 2.0: PLI Schemes से Dixon, Waaree जैसी Companies 3x!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'tata-ev-dominance-2025',
    slug: 'tata-motors-ev-market-share-70-percent-nexon-punch',
    category: 'business-analysis',
    title: 'Tata Motors का EV में Monopoly! Market Share 70%',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'pharma-api-independence-2025',
    slug: 'pharma-api-india-china-independence-pli-laurus-divis',
    category: 'business-analysis',
    title: 'Pharma API में India का China से आज़ादी का सफर!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'office-real-estate-crisis-2025',
    slug: 'office-real-estate-wfh-crisis-vacancy-dlf-prestige',
    category: 'business-analysis',
    title: 'Office Real Estate Crisis: WFH ने Property को ₹5 Lakh Crore Loss!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'fmcg-rural-slowdown-2025',
    slug: 'fmcg-rural-demand-slowdown-hul-itc-growth-crisis',
    category: 'business-analysis',
    title: 'FMCG में Rural Slowdown! HUL, ITC Growth सिर्फ 2-3%',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=1200&h=630&fit=crop&q=80'
  },

  // NEW STARTUPS ARTICLES - 8 comprehensive Google News-optimized articles
  {
    id: 'india-unicorn-factory-2025',
    slug: 'india-unicorn-startups-110-billion-dollar-companies-funding',
    category: 'startups',
    title: 'India\'s Unicorn Factory: 110+ Billion-Dollar Startups - Next Wave Coming!',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'tier2-startup-revolution',
    slug: 'tier-2-cities-startup-indore-jaipur-kochi-unicorns',
    category: 'startups',
    title: 'Tier-2 Cities Startup Revolution: Indore, Jaipur, Kochi की Companies Unicorn बन रही!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'ai-startups-boom-2025',
    slug: 'ai-startups-india-10-billion-funding-chatgpt-boom',
    category: 'startups',
    title: 'AI Startups India में $10 Billion Funding - ChatGPT के बाद Boom!',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'quick-commerce-battle-2025',
    slug: 'zepto-blinkit-swiggy-instamart-10-minute-delivery-war',
    category: 'startups',
    title: '10-Minute Delivery War: Zepto, Blinkit, Swiggy Instamart - ₹50,000 Crore Battle!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'd2c-brands-consolidation-2025',
    slug: 'd2c-brands-consolidation-mamaearth-boat-survival',
    category: 'startups',
    title: 'D2C Brands की Consolidation शुरू! Mamaearth, boAt - Survive या Shutdown?',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'edtech-crisis-2025',
    slug: 'edtech-crisis-byjus-collapse-unacademy-layoffs',
    category: 'startups',
    title: 'EdTech Crisis: Byju\'s Collapse, Unacademy Layoffs - ₹1 Lakh Crore से ₹10,000 Crore!',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'b2b-saas-exports-2025',
    slug: 'india-b2b-saas-exports-12-billion-freshworks-postman',
    category: 'startups',
    title: 'India\'s B2B SaaS Exports: $12 Billion+ Globally - Freshworks, Postman Leading!',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'fintech-regulation-2025',
    slug: 'fintech-regulation-rbi-phonepe-paytm-razorpay-compliance',
    category: 'startups',
    title: 'FinTech Regulation Tightening: RBI Rules Reshaping PhonePe, Paytm, Razorpay!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&q=80'
  },

  // NEW ECONOMY ARTICLES - 8 comprehensive Google News-optimized articles
  {
    id: 'india-gdp-growth-2025',
    slug: 'india-gdp-growth-7-2-percent-fastest-economy-china',
    category: 'economy',
    title: 'India GDP Growth 7.2% Beats China - World\'s Fastest Growing Major Economy!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'export-growth-challenges-2025',
    slug: 'india-export-growth-1-trillion-target-2030-fta-challenges',
    category: 'economy',
    title: 'India Export Growth Slows to 5% - Can We Hit $1 Trillion Target by 2030?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'inflation-control-2025',
    slug: 'india-inflation-5-4-percent-rbi-rate-cuts-food-prices',
    category: 'economy',
    title: 'India Inflation at 5.4% - RBI\'s Balancing Act Between Growth and Price Stability',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'infrastructure-boom-2025',
    slug: 'india-infrastructure-boom-111-lakh-crore-roads-metros-ports',
    category: 'economy',
    title: 'Infrastructure Boom: India Spending ₹111 Lakh Crore on Roads, Metros, Ports!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'digital-rupee-launch-2025',
    slug: 'digital-rupee-rbi-cbdc-pilot-10-lakh-users-upi',
    category: 'economy',
    title: 'Digital Rupee (e₹) Launch: RBI\'s CBDC Pilot - Will It Replace Cash & UPI?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'green-energy-transition-2025',
    slug: 'india-renewable-energy-500-gw-target-solar-wind-adani-tata',
    category: 'economy',
    title: 'Green Energy Revolution: India\'s 500 GW Renewable Target by 2030 - Solar, Wind Boom!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'agriculture-crisis-2025',
    slug: 'india-agriculture-crisis-farmer-income-stagnant-msp-rural',
    category: 'economy',
    title: 'Agriculture Crisis: Farmer Income Stagnant Despite MSP Hikes - Rural India Struggles!',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'employment-challenge-2025',
    slug: 'india-employment-jobs-10-million-annually-gig-economy-youth',
    category: 'economy',
    title: 'India\'s Employment Challenge: Creating 10-15 Million Jobs Annually - Are We Succeeding?',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop&q=80'
  },

  // NEW TECH BUSINESS ARTICLES - 10 comprehensive Google News-optimized articles
  {
    id: 'ai-enterprise-adoption-2025',
    slug: 'ai-adoption-indian-enterprises-50000-crore-tcs-infosys-wipro',
    category: 'tech-business',
    title: 'Indian Companies Spending ₹50,000 Crore on AI - ChatGPT Revolution Hits Enterprises!',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: '5g-rollout-india-2025',
    slug: '5g-india-rollout-500000-towers-jio-airtel-monetization',
    category: 'tech-business',
    title: '5G India Rollout: 500,000 Towers in 18 Months - Fastest Globally! But Monetization Challenge',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200&h=630&fit=crop&q=80'
  }
];

