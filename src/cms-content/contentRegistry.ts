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
  // NEW Tech Article: Tech IPO Boom India 2025
  {
    id: 'tech-tech-ipo-boom-2025',
    slug: 'tech-ipo-boom-zomato-paytm-nykaa-listing-gains-losses-2025',
    category: 'tech-business',
    subCategory: 'ipo',
    title: '📈 टेक कंपनियों का IPO: Zomato +100%, Paytm -70%—किसमें Invest करें? (2025 Analysis)',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-08T20:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: Foreign Trade Current Account 2025
  {
    id: 'economy-foreign-trade-current-account-2025',
    slug: 'foreign-trade-current-account-deficit-exports-imports-bharat-2025',
    category: 'economy',
    subCategory: 'foreign-trade',
    title: '🌍 विदेशी व्यापार और चालू खाता: Trade Deficit $250 Billion! Exports बढ़ाने का Plan? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-08T19:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Startups Article: Corporate Startup Partnerships 2025
  {
    id: 'startups-corporate-partnerships-2025',
    slug: 'corporate-startup-partnerships-tata-reliance-accel-india-2025',
    category: 'startups',
    subCategory: 'corporate-partnerships',
    title: '🤝 कॉरपोरेट-स्टार्टअप साझेदारी: Tata, Reliance ने ₹5,000 Cr Invest किया! Win-Win Strategy (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-08T18:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Business Article: Corporate Governance Scandals 2025
  {
    id: 'business-corporate-governance-2025',
    slug: 'corporate-governance-scandals-satyam-pnb-fraud-sebi-reforms-2025',
    category: 'business',
    subCategory: 'corporate-governance',
    title: '⚖️ कॉर्पोरेट गवर्नेंस मामले: PNB ₹14,000 Cr Scam, Satyam—क्यों Fail होते हैं Audits? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-08T17:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Tech Article: D2C Brands SaaS Tools 2025
  {
    id: 'tech-d2c-brands-saas-2025',
    slug: 'd2c-brands-saas-shopify-woocommerce-razorpay-india-2025',
    category: 'tech-business',
    subCategory: 'saas-ecommerce',
    title: '🛒 D2C ब्रांड्स के लिए SaaS: Shopify, Razorpay ने ₹10K Crore Market! किस Tool से Start करें? (2025)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-08T16:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1556742400-b5b7f3f333d0?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: Poverty Income Inequality 2025
  {
    id: 'economy-poverty-income-inequality-2025',
    slug: 'poverty-income-inequality-wealth-gap-gini-index-bharat-2025',
    category: 'economy',
    subCategory: 'income-inequality',
    title: '📊 गरीबी और आय असमानता: Top 1% के पास 40% Wealth! Gini Index 0.82—क्या Solution है? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-08T15:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Tech Article: E-Waste Electronic Waste India 2025
  {
    id: 'tech-ewaste-electronic-waste-2025',
    slug: 'ewaste-electronic-waste-recycling-india-32-lakh-tons-2025',
    category: 'tech-business',
    subCategory: 'e-waste',
    title: '🗑️ इलेक्ट्रॉनिक कचरा (E-Waste): 32 Lakh Tons/Year! कहां जाता है पुराना Mobile-Laptop? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-08T14:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Startups Article: Tech Unicorn Dream India 2025
  {
    id: 'startups-tech-unicorn-dream-2025',
    slug: 'tech-unicorn-1-billion-valuation-zerodha-cred-razorpay-india-2025',
    category: 'startups',
    subCategory: 'unicorns',
    title: '🦄 Tech Unicorn बनने की चाहत: ₹8,500 Cr Valuation—कैसे मिलती है? Zerodha, CRED Story (2025)',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-08T13:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Business Article: FDI Foreign Investment India 2025
  {
    id: 'business-fdi-foreign-investment-2025',
    slug: 'fdi-foreign-direct-investment-india-apple-tesla-china-plus-one-2025',
    category: 'business',
    subCategory: 'foreign-investment',
    title: '🌍 FDI में बदलाव: Apple, Tesla India आ रहे! China+1 Strategy—₹5 Lakh Crore Opportunity (2025)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-08T12:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Markets Article: Retail Investors Role India 2025
  {
    id: 'markets-retail-investors-role-2025',
    slug: 'retail-investors-demat-accounts-sip-india-stock-market-2025',
    category: 'markets',
    subCategory: 'retail-investing',
    title: '📈 Retail Investors की भूमिका: 15 Crore Demat Accounts! Stock Market को Democratize कर रहे हैं (2025)',
    authorId: 'raushan-kumar',
    datePublished: '2025-11-08T11:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Tech Article: Cloud AI Infrastructure AWS Azure 2025
  {
    id: 'tech-cloud-ai-infrastructure-2025',
    slug: 'cloud-computing-ai-infrastructure-aws-azure-google-bharat-2025',
    category: 'tech-business',
    subCategory: 'cloud-computing',
    title: '☁️ Cloud और AI Infrastructure: AWS, Azure ने ₹1 Lakh Crore Invest किया! (India 2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-08T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Startups Article: Govt Schemes Grants Startup India 2025
  {
    id: 'startups-govt-schemes-grants-2025',
    slug: 'startup-india-govt-schemes-grants-seed-fund-tax-benefits-2025',
    category: 'startups',
    subCategory: 'government-schemes',
    title: '🏛️ Startup India: Govt Schemes और ₹10,000 Cr Fund! कैसे लें Grants? (2025 Complete Guide)',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-08T09:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Business Article: Digital Transformation Companies 2025
  {
    id: 'business-digital-transformation-2025',
    slug: 'digital-transformation-cloud-ai-companies-bharat-reliance-tata-2025',
    category: 'business',
    subCategory: 'digital-transformation',
    title: '💻 डिजिटल ट्रांसफॉर्मेशन: Reliance, Tata ने ₹50,000 Cr Invest किया! Cloud-AI Shift (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-07T23:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Markets Article: GST Collection Record 2025
  {
    id: 'markets-gst-collection-record-2025',
    slug: 'gst-collection-record-1-87-lakh-crore-tax-compliance-bharat-2025',
    category: 'markets',
    subCategory: 'taxation',
    title: '📊 GST Collection रिकॉर्ड ₹1.87 Lakh Crore/Month! क्या Economy Boom कर रही है? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-07T22:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: Global Recession Impact India 2025
  {
    id: 'economy-global-recession-india-2025',
    slug: 'global-recession-us-europe-bharat-impact-exports-jobs-2025',
    category: 'economy',
    subCategory: 'global-economy',
    title: '🌐 ग्लोबल मंदी का India पर असर: US-Europe Recession—हम कितने Safe हैं? (2025)',
    authorId: 'raushan-kumar',
    datePublished: '2025-11-07T21:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Tech Article: Blockchain Supply Chain India 2025
  {
    id: 'tech-blockchain-supply-chain-2025',
    slug: 'blockchain-supply-chain-logistics-transparency-fraud-bharat-2025',
    category: 'tech-business',
    subCategory: 'blockchain',
    title: '⛓️ Blockchain और Supply Chain: Fake Products 40% कम! पारदर्शिता क्रांति (2025)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-07T20:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Business Article: M&A Mergers Acquisitions Trends 2025
  {
    id: 'business-ma-mergers-acquisitions-2025',
    slug: 'mergers-acquisitions-ma-trends-reliance-disney-tata-air-india-2025',
    category: 'business',
    subCategory: 'mergers-acquisitions',
    title: '🤝 M&A Boom: Reliance-Disney ₹70,000 Cr, Tata-Air India! भारत में Mega Mergers क्यों? (2025)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-07T19:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: Financial Inclusion Jan Dhan 2025
  {
    id: 'economy-financial-inclusion-2025',
    slug: 'financial-inclusion-jan-dhan-pmjdy-banking-bharat-2025',
    category: 'economy',
    subCategory: 'financial-inclusion',
    title: '💳 वित्तीय समावेशन: 50 Crore Jan Dhan खाते! गरीबों तक Banking कैसे पहुंची? (2025)',
    authorId: 'raushan-kumar',
    datePublished: '2025-11-07T18:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Markets Article: Banking Stocks Volatility NPA 2025
  {
    id: 'markets-banking-stocks-volatility-2025',
    slug: 'banking-stocks-hdfc-icici-sbi-volatility-npa-analysis-2025',
    category: 'markets',
    subCategory: 'banking-sector',
    title: '🏦 Banking Stocks में उतार-चढ़ाव: HDFC, ICICI, SBI—अब खरीदें या बेचें? (2025 Analysis)',
    authorId: 'raushan-kumar',
    datePublished: '2025-11-07T17:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Tech Article: Green-Tech Climate-Tech 2025
  {
    id: 'tech-green-tech-climate-tech-2025',
    slug: 'green-tech-climate-tech-carbon-credits-ev-solar-bharat-2025',
    category: 'tech-business',
    subCategory: 'climate-technology',
    title: '🌱 Green-Tech और Climate-Tech: Carbon Credits से EV तक—भारत का ₹10 Lakh Crore Opportunity!',
    authorId: 'harsh-raj',
    datePublished: '2025-11-07T16:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Business Article: Industry 4.0 Automation Tata Mahindra 2025
  {
    id: 'business-industry-4-0-automation-2025',
    slug: 'industry-4-0-automation-robots-iot-tata-mahindra-bharat-2025',
    category: 'business',
    subCategory: 'manufacturing-automation',
    title: '🤖 उद्योग 4.0: Tata, Mahindra ने Robots लगाए! Manufacturing में AI-IoT Revolution (2025)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-07T15:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: Agriculture Economy Farmer Income 2025
  {
    id: 'economy-agriculture-farmer-income-2025',
    slug: 'krishi-arthvyavastha-farmer-income-msp-rural-distress-2025',
    category: 'economy',
    subCategory: 'agriculture',
    title: '🌾 कृषि अर्थव्यवस्था: 2022 तक Income Double का वादा—हुआ क्या? Farmers की असली हालत (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-07T14:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Startups Article: Startup Failures Analysis 2025
  {
    id: 'startups-failures-analysis-2025',
    slug: 'startup-failures-byju-dunzo-gomechanic-kyon-fail-2025',
    category: 'startups',
    subCategory: 'failure-analysis',
    title: '💥 Startup Failures: Byju $22B → $3B! Dunzo, GoMechanic—क्यों Fail हुए? 10 Lessons (2025)',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-07T13:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Markets Article: FPI Foreign Investment Impact 2025
  {
    id: 'markets-fpi-foreign-investment-2025',
    slug: 'fpi-foreign-portfolio-investment-bharat-market-impact-2025',
    category: 'markets',
    subCategory: 'foreign-investment',
    title: '🌍 FPI का भारतीय बाजार पर असर: ₹94,000 Crore बेचा, फिर ₹40,000 Crore खरीदा—क्यों? (2025)',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-07T12:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Tech Article: Cybersecurity Data Privacy 2025
  {
    id: 'tech-cybersecurity-data-privacy-2025',
    slug: 'cybersecurity-data-privacy-breaches-india-hacks-2025',
    category: 'tech-business',
    subCategory: 'cybersecurity',
    title: '🔒 साइबरसिक्योरिटी Crisis: ₹35,000 Crore Breaches! आपका Data कितना Safe? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-07T11:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Business Article: VC Investment Decline Funding Winter 2025
  {
    id: 'business-vc-investment-decline-2025',
    slug: 'venture-capital-investment-giravat-funding-winter-bharat-2025',
    category: 'business',
    subCategory: 'venture-capital',
    title: '💰 V.C. Investment में 65% गिरावट! Funding Winter से कैसे निकलेंगे Startups? (2025)',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-07T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: Job Market Employment 2025
  {
    id: 'economy-job-market-employment-2025',
    slug: 'naukri-bazar-badlav-jobs-india-ai-automation-2025',
    category: 'economy',
    subCategory: 'employment',
    title: '💼 नौकरी बाजार में बड़ा बदलाव: AI ने 5 Lakh Jobs खाईं, 10 Lakh नई बनीं! (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-07T09:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Markets Article: Cryptocurrency vs Stock Market 2025
  {
    id: 'markets-crypto-vs-stocks-2025',
    slug: 'cryptocurrency-vs-stock-market-bitcoin-ethereum-bharat-2025',
    category: 'markets',
    subCategory: 'crypto-investment',
    title: '₿ Crypto vs Stock Market: Bitcoin ₹75 Lakh! निवेश कहां करें? Risk-Return Analysis 2025',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-06T23:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Startups Article: Women Female Founders 2025
  {
    id: 'startups-female-founders-women-2025',
    slug: 'mahila-female-founders-women-startups-bharat-funding-gap-2025',
    category: 'startups',
    subCategory: 'women-entrepreneurship',
    title: '👩‍💼 महिला Founders का उभार: Nykaa से Mamaearth—₹1 Lakh Crore! लेकिन Funding Gap 90%',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-06T22:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Startups Article: Deep-Tech Startups India 2025
  {
    id: 'startups-deep-tech-india-2025',
    slug: 'deep-tech-startups-bharat-ai-robotics-quantum-drone-2025',
    category: 'startups',
    subCategory: 'deep-technology',
    title: '🔬 डीप-टेक स्टार्टअप्स का उभार: AI, Robotics, Drones—भारत का नया Future! (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-06T21:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Tech Article: 5G IoT Smart Cities 2025
  {
    id: 'tech-5g-iot-smart-cities-2025',
    slug: '5g-iot-smart-cities-jio-airtel-bharat-2025-future',
    category: 'tech-business',
    subCategory: '5g-iot',
    title: '📡 5G और Smart Cities: Jio-Airtel ने 5 Lakh Towers लगाए! IoT Revolution आ रहा है (2025)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-06T20:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: Digital Economy UPI Cashless 2025
  {
    id: 'economy-digital-economy-upi-2025',
    slug: 'digital-economy-bharat-cashless-upi-fintech-2025-growth',
    category: 'economy',
    subCategory: 'digital-transformation',
    title: '💳 डिजिटल अर्थव्यवस्था: UPI ने कैश को मार दिया! 15 Billion Transactions/Month (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-06T19:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Markets Article: Mutual Funds vs Direct Stocks Comparison 2025
  {
    id: 'markets-mf-vs-stocks-comparison-2025',
    slug: 'mutual-fund-vs-khud-ka-stock-investment-kaun-behtar-2025',
    category: 'markets',
    subCategory: 'investment-comparison',
    title: '📊 Mutual Fund vs खुद का Stock निवेश: कौन बना रहा बेहतर Return? Complete Comparison 2025',
    authorId: 'raushan-kumar',
    datePublished: '2025-11-06T18:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Business Article: Green Energy Renewable Sector 2025
  {
    id: 'business-green-energy-india-2025',
    slug: 'green-energy-solar-wind-renewable-bharat-sector-analysis-2025',
    category: 'business',
    subCategory: 'renewable-energy',
    title: '⚡ हरित ऊर्जा क्रांति: भारत 500 GW लक्ष्य की ओर! Solar, Wind—कहां निवेश करें? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-06T17:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: Inflation Impact on Common People 2025
  {
    id: 'economy-inflation-impact-2025',
    slug: 'mehngai-inflation-aam-aadmi-assar-kharch-badha-bachat-ghati-2025',
    category: 'economy',
    subCategory: 'inflation',
    title: '💸 महंगाई का आम आदमी पर असर: प्याज ₹80, पेट्रोल ₹105—कैसे बचाएं अपना पैसा? (2025)',
    authorId: 'raushan-kumar',
    datePublished: '2025-11-06T16:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Startups Article: India Space-Tech Startups 2025
  {
    id: 'startups-space-tech-india-2025',
    slug: 'bharat-space-tech-startups-agni-skyroot-pixxel-isro-2025',
    category: 'startups',
    subCategory: 'space-technology',
    title: '🚀 भारत का Space-Tech Boom: ISRO के बाद अब Startups अंतरिक्ष में! Skyroot, Agnikul, Pixxel',
    authorId: 'harsh-raj',
    datePublished: '2025-11-06T15:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Markets Article: Gold Silver Commodities Boom 2025
  {
    id: 'markets-gold-silver-commodities-2025',
    slug: 'sona-chandi-copper-commodities-teji-bharat-2025-munafa-jokhim',
    category: 'markets',
    subCategory: 'commodities',
    title: '🪙 सोना ₹75,000/10g पार! Gold, Silver, Copper में तेजी—अब निवेश करें या इंतज़ार करें?',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-06T14:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Business Article: Manufacturing vs Services 2025
  {
    id: 'business-manufacturing-vs-services-2025',
    slug: 'manufacturing-vs-services-sector-bharat-chunauti-avsar-2025',
    category: 'business',
    subCategory: 'sector-analysis',
    title: '🏭 Manufacturing vs Services: भारत को कौन-सा सेक्टर बनाएगा Developed Nation? (2025 Analysis)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-06T13:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Tech Article: India AI Global Race 2025
  {
    id: 'tech-india-ai-global-race-2025',
    slug: 'bharat-aur-ai-global-race-artificial-intelligence-india-2025',
    category: 'tech-business',
    subCategory: 'artificial-intelligence',
    title: '🤖 भारत और AI: Global AI Race में India कैसे US-China को टक्कर दे रहा है? (2025 Analysis)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-06T12:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Economy Article: GDP Growth Rate 2025-26
  {
    id: 'economy-gdp-growth-2025-26',
    slug: 'bharat-gdp-growth-rate-2025-26-badhti-ghatati-economic-forecast',
    category: 'economy',
    subCategory: 'economic-growth',
    title: '📈 भारत की GDP ग्रोथ दर 2025-26: 7% रहेगी या गिरेगी 5% पर? पूरा Economic Forecast',
    authorId: 'harsh-raj',
    datePublished: '2025-11-06T11:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Startups Article: Rural & Tier-3 Startup Ecosystem 2025
  {
    id: 'startups-rural-tier3-ecosystem-2025',
    slug: 'gramin-tier3-shahar-startup-ecosystem-avsar-chunauti-2025',
    category: 'startups',
    subCategory: 'startup-ecosystem',
    title: '🌾 ग्रामीण और Tier-3 शहरों में स्टार्टअप क्रांति: इंदौर से कोच्चि तक—नए Unicorns यहाँ बन रहे हैं!',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-06T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW Markets Article: Bull Market Coming 2025
  {
    id: 'markets-bull-market-retail-investors-2025',
    slug: 'kya-agla-bull-market-aa-raha-hai-bharat-retail-investors-taiyari-2025',
    category: 'markets',
    subCategory: 'market-analysis',
    title: '🚀 क्या अगला बुल मार्केट आ रहा है? भारत के घरेलू निवेशकों की तैयारियाँ और रणनीति 2025',
    authorId: 'raushan-kumar',
    datePublished: '2025-11-06T09:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  
  // NEW: Diwali Market Rally 2025 - Comprehensive Analysis
  {
    id: 'markets-diwali-rally-2025-analysis-hindi',
    slug: 'bharatiya-share-bazar-diwali-2025-rally-kyon-aayi-analysis',
    category: 'markets',
    title: '🎆 दिवाली के बाद शेयर बाजार में धमाका! Nifty 26,000 पार—क्या अब खरीदें या इंतज़ार करें?',
    authorId: 'harsh-raj',
    datePublished: '2025-11-05T09:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  // NEW: Startup Funding Winter 2025 - Survival Guide
  {
    id: 'startups-funding-winter-2025-survival',
    slug: 'bharat-startup-funding-gir-gayi-2025-kaise-bachein-hindi-guide',
    category: 'startups',
    title: '❄️ भारत में Startup Funding 65% गिरी! Founders अब क्या करें? (Survival Guide 2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-05T11:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop&q=80'
  },
  // Markets Category
  {
    id: 'article-01-lenskart-ipo-matters',
    slug: 'lenskart-ipo-announcement-hindi',
    category: 'markets',
    title: `Why Lenskart's upcoming IPO matters for Indian eyewear`,
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
  },
  {
    id: 'it-services-automation-2025',
    slug: 'it-services-automation-tcs-infosys-margins-compression',
    category: 'tech-business',
    title: 'IT Services Automation: TCS, Infosys Margins Under Pressure - AI Eating Into Profits!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'semiconductor-mission-india-2025',
    slug: 'india-semiconductor-mission-76000-crore-micron-tata-chip-fabs',
    category: 'tech-business',
    title: 'India Semiconductor Mission: ₹76,000 Crore for 3 Chip Fabs - Self-Reliance Dream!',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'upi-global-expansion-2025',
    slug: 'upi-global-expansion-10-countries-200-billion-opportunity',
    category: 'tech-business',
    title: 'UPI Goes Global: India\'s Payment System in 10 Countries - $200 Billion Opportunity!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'cloud-computing-india-2025',
    slug: 'cloud-computing-india-1-lakh-crore-aws-azure-google',
    category: 'tech-business',
    title: 'Cloud Computing India: ₹1 Lakh Crore Market - AWS, Azure, Google Fighting for Share!',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'cybersecurity-india-2025',
    slug: 'cybersecurity-india-35000-crore-breaches-skills-shortage',
    category: 'tech-business',
    title: 'Cybersecurity India: ₹35,000 Crore Market - Breaches Up 40%, Skills Shortage Acute!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'it-exports-slowdown-2025',
    slug: 'it-exports-slowdown-200-billion-us-recession-automation',
    category: 'tech-business',
    title: 'IT Exports Slowdown: $200 Billion at Risk - US Recession, Automation Threats!',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'manufacturing-automation-2025',
    slug: 'manufacturing-automation-industry-4-robots-iot-tata-mahindra',
    category: 'tech-business',
    title: 'Industry 4.0 India: Manufacturing Automation ₹60,000 Cr Investment - Robots, IoT, AI!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'tech-talent-shortage-2025',
    slug: 'tech-talent-shortage-india-ai-ml-cloud-cybersecurity-jobs',
    category: 'tech-business',
    title: 'Tech Talent Crisis: India Needs 2 Million Engineers But Quality Shortage Acute!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop&q=80'
  },
  
  // MARKETS TRENDING 2025 - 10 Dynamic Market-Based Articles
  {
    id: 'sensex-bear-phase-2025',
    slug: 'sensex-plunges-500-points-india-bear-phase-analysis',
    category: 'markets',
    title: 'Sensex Plunges 500 Points - Is This the Start of India\'s Quiet Bear Phase?',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'rupee-crisis-88-2025',
    slug: 'rupee-slips-88-43-dollar-currency-crash-portfolio-risk',
    category: 'markets',
    title: 'Rupee Slips to ₹88.43 vs Dollar - Is Your Portfolio at Risk from Currency Crash?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'metal-stocks-collapse-2025',
    slug: 'metal-stocks-collapse-global-demand-china-slowdown',
    category: 'markets',
    title: 'Metal Stocks Collapse as Global Demand Evaporates - India\'s Commodity Bet Failing?',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'top-stock-picks-oct-2025',
    slug: 'top-stock-picks-october-2025-hdfc-reliance-tcs',
    category: 'markets',
    title: 'Top Stock Picks for October 30, 2025: Stocks You\'ll Wish You Bought Yesterday',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'sebi-fee-cut-amc-2025',
    slug: 'sebi-fee-cuts-amc-selloff-mutual-fund-impact',
    category: 'markets',
    title: 'SEBI Fee Cuts Trigger Sell-off in AMCs: Why Your Mutual Fund Might Be Next',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'ipo-season-8billion-2025',
    slug: 'ipo-season-india-8-billion-hyundai-swiggy-ola',
    category: 'markets',
    title: 'IPO Season Set to Explode: India\'s $8 Billion Year-End Blitz About to Begin',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'fii-double-edged-2025',
    slug: 'foreign-money-india-fii-inflows-two-edged-sword',
    category: 'markets',
    title: 'Foreign Money Rushing Into India: Two-Edged Sword for Markets',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'smallcap-rotation-2025',
    slug: 'small-caps-surge-big-caps-stumble-market-rotation',
    category: 'markets',
    title: 'Small-Caps Surge While Big-Caps Stumble - Market Rotation You Shouldn\'t Ignore',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'us-rate-hike-crash-2025',
    slug: 'us-interest-rate-hike-india-market-crash-risk',
    category: 'markets',
    title: 'US Interest Rate Hike: Could This Trigger a Crash in India?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'gold-vs-equities-2025',
    slug: 'gold-vs-equities-india-investment-next-five-years',
    category: 'markets',
    title: 'Gold vs Equities: Where Should Indians Invest in the Next Five Years?',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=630&fit=crop&q=80'
  },
  
  // BUSINESS ANALYSIS TRENDING 2025 - 10 Dynamic Business Sector Articles
  {
    id: 'honda-india-growth-2025',
    slug: 'honda-motors-india-key-growth-market-auto-sector',
    category: 'business-analysis',
    title: 'Honda Motors Picks India as Key Growth Market - What It Means for Auto Sector',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'corporate-debt-bomb-2025',
    slug: 'india-corporate-debt-time-bomb-70-lakh-crore',
    category: 'business-analysis',
    title: 'India\'s Corporate Debt Time-Bomb: ₹70 Lakh Cr Outstanding - Boom or Bubble?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'manufacturing-states-2025',
    slug: 'manufacturing-3-india-states-factory-hubs',
    category: 'business-analysis',
    title: 'Manufacturing 3.0 in India: Which States Will Become the Next Factory Hubs?',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'retail-disruption-2025',
    slug: 'retail-giants-disrupted-quick-commerce-blinkit-zepto',
    category: 'business-analysis',
    title: 'Retail Giants Being Disrupted Before You Realize: Quick Commerce Eating Market Share',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'ev-supplier-trap-2025',
    slug: 'ev-push-trap-auto-suppliers-hidden-costs',
    category: 'business-analysis',
    title: 'EV Push Might Be a Trap for Auto Suppliers: Hidden Costs Crushing Margins',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'csr-esg-transformation-2025',
    slug: 'csr-to-esg-indian-businesses-playbook-carbon-neutral',
    category: 'business-analysis',
    title: 'From CSR to ESG: Indian Businesses Changing Playbook - Are You Prepared?',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'supply-chain-india-2025',
    slug: 'global-supply-chains-india-china-plus-one-ready',
    category: 'business-analysis',
    title: 'Global Supply Chains Rerouting via India: China+1 Opportunity - But Is India Ready?',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'banks-fintech-2028',
    slug: 'banks-vs-fintech-india-financial-sector-2028',
    category: 'business-analysis',
    title: 'Banks vs Fintech: India\'s Financial Sector Will Look Totally Different by 2028',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'real-estate-risk-2025',
    slug: 'real-estate-india-next-big-risk-sector-debt',
    category: 'business-analysis',
    title: 'Real Estate Could Be India\'s Next Big Risk Sector: ₹12 Lakh Cr Debt, Demand Slowdown',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'infra-delivery-failure-2025',
    slug: 'infrastructure-spending-delivery-mechanism-failing',
    category: 'business-analysis',
    title: 'Infrastructure Spending Huge - But India\'s Delivery Mechanism Failing: ₹11L Cr Stuck',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=1200&h=630&fit=crop&q=80'
  },
  
  // STARTUPS TRENDING 2025 - 10 Dynamic Startup Ecosystem Articles
  {
    id: 'campus-startups-2025',
    slug: 'campus-startups-india-next-unicorn-from-hostel',
    category: 'startups',
    title: 'Campus Startups Taking Over India: Next Unicorn Coming From a Hostel!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'deeptech-fund-2025',
    slug: 'deeptech-battleground-10000-crore-fund-of-funds',
    category: 'startups',
    title: 'Deep-Tech Battleground: Government\'s ₹10,000 Crore Fund of Funds - India\'s Startup Future',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'tier2-startup-boom-2025',
    slug: 'tier2-tier3-cities-india-hidden-startup-boom-zones',
    category: 'startups',
    title: 'Tier-2 & Tier-3 Cities: India\'s Hidden Startup Boom Zones - Jaipur, Indore Leading!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'ai-startup-wave-2025',
    slug: 'ai-startup-wave-india-25000-crore-who-winning',
    category: 'startups',
    title: 'AI Startup Wave in India: Everyone\'s Talking, ₹25,000 Cr Invested - But Who\'s Winning?',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'startup-ipo-tracker-2025',
    slug: 'india-startup-ipo-tracker-2025-breakout-year',
    category: 'startups',
    title: 'India\'s Startup IPO Tracker 2025: Could Be the Breakout Year - ₹44,000 Cr Public Fundraising!',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'vc-playbook-shift-2025',
    slug: 'vcs-india-shifting-playbook-profitability-over-growth',
    category: 'startups',
    title: 'VCs in India Shifting Playbook: Profitability Over Growth - Founders, Heads Up!',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'female-founder-gap-2025',
    slug: 'female-founder-funding-india-gap-how-changing',
    category: 'startups',
    title: 'Female-Founder Funding in India Still Lags: Apenas 3% of ₹1.2 Lakh Cr - How It\'s Changing',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'climate-agri-food-2025',
    slug: 'climate-tech-agritech-foodtech-india-next-big-three',
    category: 'startups',
    title: 'Climate Tech, AgriTech & FoodTech: India\'s Next Startup Big Three - ₹35,000 Cr Opportunity',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'founders-global-2025',
    slug: 'indian-founders-going-global-day-one-50000-crore',
    category: 'startups',
    title: 'Indian Founders Going Global from Day One: ₹50,000 Cr Revenue from Overseas!',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'private-vs-public-markets-2025',
    slug: 'startups-preferring-public-markets-44000-crore-ipo',
    category: 'startups',
    title: 'Startups Preferring Public Markets: ₹44,000 Cr vs ₹22,000 Cr Private - What It Means',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  // ECONOMY/TECH TRENDING 2025 - 20 ARTICLES
  {
    id: 'india-gdp-7-percent-fy26-test',
    slug: 'india-gdp-7-percent-growth-fy26-test',
    category: 'economy',
    title: 'India on Track for 7%+ GDP Growth - But Real Test Starts in 2026!',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'ai-call-center-jobs-risk',
    slug: 'ai-chatbots-replacing-call-centre-2-lakh-jobs',
    category: 'tech-business',
    title: 'AI Chatbots Replacing India\'s Call-Center Workers: 2 Lakh Jobs at Risk!',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'india-export-1-trillion-challenge',
    slug: 'india-exports-1-trillion-target-challenges',
    category: 'economy',
    title: 'India Export Growth Slows to 5%: Can We Hit $1 Trillion by 2030?',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'digital-rupee-data-law-privacy',
    slug: 'digital-rupee-data-law-privacy-2026',
    category: 'tech-business',
    title: 'Digital Rupee, Data Law & Privacy: India\'s Tech Regulation 2026 Playbook!',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'green-economy-greenwashing',
    slug: 'green-economy-15-lakh-crore-greenwashing',
    category: 'economy',
    title: 'Green Economy in India: ₹15 Lakh Cr Opportunity - or Greenwashing Trap?',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'it-sector-200b-risk',
    slug: 'it-sector-200-billion-revenue-ai-recession-risk',
    category: 'tech-business',
    title: 'IT Sector at Risk: $200B Revenue Threatened by AI, Recession',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'defence-tech-75k-crore',
    slug: 'defence-tech-spending-75000-crore-tata-lt',
    category: 'economy',
    title: 'Defence Tech Spending Creating Manufacturing Boom: ₹75k Cr Orders',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'data-center-2-lakh-crore',
    slug: 'data-center-boom-2-lakh-crore-yotta-airtel',
    category: 'tech-business',
    title: 'Data Center Boom in India: ₹2 Lakh Cr Investment by 2027',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'workforce-automation-5-million-jobs',
    slug: 'workforce-automation-5-million-jobs-risk',
    category: 'economy',
    title: 'Workforce Automation Hitting 5 Million Indian Jobs by 2030',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'banking-fintech-50k-crore',
    slug: 'banking-sector-fintech-50000-crore-disruption',
    category: 'economy',
    title: 'Banking Sector Transformation: Fintech Eating ₹50k Cr Revenue',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'state-economy-divide',
    slug: 'state-economy-divide-maharashtra-tn-up-bihar',
    category: 'economy',
    title: 'State Economy Divide Widening: Maharashtra, TN Leading - UP, Bihar Lagging',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'make-in-india-100-lakh-crore',
    slug: 'make-in-india-100-lakh-crore-30-delivered',
    category: 'economy',
    title: 'Make in India\'s ₹100 Lakh Cr Dream: Only ₹30L Cr Delivered',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'global-tech-layoffs-350k',
    slug: 'global-tech-layoffs-350000-india-it-impact',
    category: 'tech-business',
    title: 'Global Tech Layoffs Hit 3.5 Lakh: Google, Meta, Amazon Cutting',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'infrastructure-111-lakh-crore',
    slug: 'infrastructure-spending-111-lakh-crore-lt-adani',
    category: 'economy',
    title: 'India Infrastructure Spending ₹111 Lakh Crore: Roads, Metros, Ports',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'tax-cuts-50k-relief',
    slug: 'tax-cut-expectations-2026-50000-relief',
    category: 'economy',
    title: 'Tax Cut Expectations 2026: Will Modi Govt Deliver ₹50k Relief?',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'innovation-startup-150k-crore',
    slug: 'india-innovation-startups-150000-crore-funding',
    category: 'tech-business',
    title: 'India Innovation Economy: Startups Raising ₹1.5L Cr',
    authorId: 'raushan-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'telecom-jio-airtel-war',
    slug: 'telecom-war-jio-airtel-5g-tariff-hikes',
    category: 'tech-business',
    title: 'Telecom War: Jio vs Airtel - 5G, Tariff Hikes, ARPU Battle',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'public-private-capital-battle',
    slug: 'public-private-capital-5-lakh-crore-psu',
    category: 'economy',
    title: 'Public vs Private Capital Battle: PSUs Getting ₹5L Cr',
    authorId: 'harsh-raj',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'ai-factory-race-india',
    slug: 'india-ai-factory-reliance-tata-adani-1-lakh-crore',
    category: 'tech-business',
    title: 'India\'s AI Factory Race: Reliance, Tata, Adani Investing ₹1L Cr',
    authorId: 'saurabh-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'credit-gdp-ratio-58-percent',
    slug: 'credit-gdp-ratio-58-percent-household-debt-risk',
    category: 'economy',
    title: 'India Credit-to-GDP Ratio Hits 58%: Household Debt Surging',
    authorId: 'vikram-kumar',
    datePublished: '2025-10-30T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80'
  }
];

