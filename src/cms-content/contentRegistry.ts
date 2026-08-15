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
  imageAlt?: string;
  excerpt?: string;
}

export const contentRegistry: NewsArticleMetadata[] = [
  // 19 March 2026: Phase 6 - High Intent Matrix
  { id: 'pmegp-loan-subsidy-2026-guide-100-percent-approval', slug: 'pmegp-loan-subsidy-2026-guide-100-percent-approval', category: 'economy', title: 'PMEGP Loan Subsidy 2026: The Ultimate 100% Approval Guide for New Entrepreneurs', authorId: 'harsh-raj', datePublished: '2026-03-19T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1542744095-2ad39cbe4196?w=1200&h=630&fit=crop&q=80' },
  { id: 'up-chikitsa-pratipoorti-yojana-2026-guide', slug: 'up-chikitsa-pratipoorti-yojana-2026-guide', category: 'economy', title: 'UP Chikitsa Pratipoorti Yojana 2026: रिटायर कर्मचारियों के लिए 100% मेडिकल रीइम्बर्समेंट गाइड', authorId: 'harsh-raj', datePublished: '2026-03-19T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?w=1200&h=630&fit=crop&q=80' },

  // 2 March 2026: 5 New Market Impact News Articles
  { id: 'iran-israel-war-indian-stock-market-crash-2026', slug: 'iran-israel-war-indian-stock-market-crash-2026', category: 'markets', title: 'Sensex Today: Iran-Israel Conflict Impact on Indian Stock Market March 2026', authorId: 'harsh-raj', datePublished: '2026-03-02T08:30:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80', imageAlt: 'Stock market chart showing crash during Iran-Israel conflict' },
  { id: 'new-financial-rules-march-1-2026-sbi-upi', slug: 'new-financial-rules-march-1-2026-sbi-upi', category: 'economy', title: 'New Financial Rules India March 2026: SBI, UPI, Tax Changes Explained', authorId: 'harsh-raj', datePublished: '2026-03-02T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=1200&h=630&fit=crop&q=80', imageAlt: 'SBI bank building representing new financial rules' },
  { id: 'sebi-mutual-fund-rules-overhaul-sip-2026', slug: 'sebi-mutual-fund-rules-overhaul-sip-2026', category: 'investment', title: 'SEBI Mutual Fund Rules 2026: New SIP, IPO & NAV Regulations Explained', authorId: 'harsh-raj', datePublished: '2026-03-02T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6eabc4?w=1200&h=630&fit=crop&q=80', imageAlt: 'SEBI building and financial documents' },
  { id: 'india-gdp-growth-world-4th-largest-economy-2026', slug: 'india-gdp-growth-world-4th-largest-economy-2026', category: 'economy', title: 'India GDP Growth 2026: How India Became the World\'s 4th Largest Economy', authorId: 'harsh-raj', datePublished: '2026-03-02T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80', imageAlt: 'India flag and economic growth chart' },
  { id: 'gold-silver-price-surge-march-2026-investing', slug: 'gold-silver-price-surge-march-2026-investing', category: 'markets', title: 'Gold Price Today March 2026: Should You Buy, Sell or Hold Gold Now?', authorId: 'harsh-raj', datePublished: '2026-03-02T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1610660232502-0dae2380cb33?w=1200&h=630&fit=crop&q=80', imageAlt: 'Gold bars representing price surge' },

  // Batch 11: Future Tech & Sustainability (10 Stories - Hindi)
  { id: 'space-tech-economy-2026', slug: 'space-tech-economy-2026', category: 'economy', title: 'Space Tech Economy 2026: क्या अंतरिक्ष में है अगली बड़ी इन्वेस्टमेंट अपॉर्चुनिटी?', authorId: 'harsh-raj', datePublished: '2026-03-05T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=630&fit=crop&q=80' },
  { id: 'cybersecurity-insurance-2026', slug: 'cybersecurity-insurance-2026', category: 'insurance', title: 'Cybersecurity Insurance 2026: डिजिटल चोरों से अपनी दौलत कैसे बचाएं?', authorId: 'raushan-kumar', datePublished: '2026-03-05T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&q=80' },
  { id: 'vertical-farming-startups-2026', slug: 'vertical-farming-startups-2026', category: 'investment', title: 'Vertical Farming Startups 2026: बिना खेत की खेती! क्या ये भविष्य के मल्टीबैगर हैं?', authorId: 'vikram-kumar', datePublished: '2026-03-05T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1558449197-27a3c7d6c41b?w=1200&h=630&fit=crop&q=80' },
  { id: 'carbon-credit-trading-guide-2026', slug: 'carbon-credit-trading-guide-2026', category: 'economy', title: 'Carbon Credit Trading Guide 2026: प्रदूषण कम करें और पैसे कमाएं!', authorId: 'harsh-raj', datePublished: '2026-03-05T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1473341304170-971dcb9a1985?w=1200&h=630&fit=crop&q=80' },
  { id: 'quantum-computing-finance-2026', slug: 'quantum-computing-finance-2026', category: 'tech', title: 'Quantum Computing in Finance: क्या क्वांटम कंप्यूटर शेयर बाजार को बदल देंगे?', authorId: 'saurabh-kumar', datePublished: '2026-03-05T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop&q=80' },
  { id: 'circular-economy-business-2026', slug: 'circular-economy-business-2026', category: 'economy', title: 'Circular Economy Business 2026: कचरे से कंचन! रिसाइकिलिंग से मुनाफा।', authorId: 'raushan-kumar', datePublished: '2026-03-05T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=630&fit=crop&q=80' },
  { id: 'ev-infrastructure-stocks-2026', slug: 'ev-infrastructure-stocks-2026', category: 'investment', title: 'EV Infrastructure Stocks 2026: चार्जिंग स्टेशन का जाल! छुपे हुए स्टॉक्स।', authorId: 'vikram-kumar', datePublished: '2026-03-05T16:00:00+05:30', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=630&fit=crop&q=80' },
  { id: 'green-hydrogen-investment-2026', slug: 'green-hydrogen-investment-2026', category: 'investment', title: 'Green Hydrogen Investment 2026: भारत का अगला \'तेल\'? पूरी जानकारी।', authorId: 'harsh-raj', datePublished: '2026-03-05T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1509391366360-fe5bb6585823?w=1200&h=630&fit=crop&q=80' },
  { id: 'web3-banking-revolution-2026', slug: 'web3-banking-revolution-2026', category: 'tech', title: 'Web3 Banking Revolution 2026: बिना बैंक के बैंकिंग! ब्लॉकचेन का जादू।', authorId: 'saurabh-kumar', datePublished: '2026-03-05T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop&q=80' },
  { id: 'ai-personal-finance-2026', slug: 'ai-personal-finance-2026', category: 'tech', title: 'AI in Personal Finance 2026: अब आपका पोर्टफोलियो संभालेगा एआई एजेंट!', authorId: 'vikram-kumar', datePublished: '2026-03-05T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80' },

  // Batch 10: Insurance & Real Estate (10 Stories - Hindi)
  { id: 'term-insurance-buying-guide-2026', slug: 'term-insurance-buying-guide-2026', category: 'insurance', title: 'Term Insurance Buying Guide 2026: कम प्रीमियम में ₹2 करोड़ का कवर कैसे पाएं?', authorId: 'raushan-kumar', datePublished: '2026-03-04T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80' },
  { id: 'health-insurance-claim-rejection-2026', slug: 'health-insurance-claim-rejection-2026', category: 'insurance', title: 'Health Insurance Claim Rejection 2026: क्या आपकी पॉलिसी क्लेम देने से मना कर सकती है?', authorId: 'saurabh-kumar', datePublished: '2026-03-04T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1576091160550-217359f4762c?w=1200&h=630&fit=crop&q=80' },
  { id: 'motor-insurance-rule-changes-2026', slug: 'motor-insurance-rule-changes-2026', category: 'insurance', title: 'Motor Insurance Rules 2026: कार और बाइक का बीमा हो गया महंगा? जानिए नए नियम।', authorId: 'harsh-raj', datePublished: '2026-03-04T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1533558701576-23c65e0272fb?w=1200&h=630&fit=crop&q=80' },
  { id: 'ulip-vs-mutual-fund-2026', slug: 'ulip-vs-mutual-fund-2026', category: 'investment', title: 'ULIPs vs Mutual Fund 2026: टैक्स बचाने के लिए कौन सा निवेश है बेहतरीन?', authorId: 'vikram-kumar', datePublished: '2026-03-04T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1579621970795-87faff2f9200?w=1200&h=630&fit=crop&q=80' },
  { id: 'rera-impact-2026-india', slug: 'rera-impact-2026-india', category: 'economy', title: 'RERA Impact 2026: क्या आपका घर वाकई में सुरक्षित है? नए कानून के फायदे।', authorId: 'harsh-raj', datePublished: '2026-03-04T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80' },
  { id: 'affordable-housing-scheme-2026', slug: 'affordable-housing-scheme-2026', category: 'economy', title: 'Affordable Housing Scheme 2026: कम बजट में अपना घर कैसे खरीदें?', authorId: 'raushan-kumar', datePublished: '2026-03-04T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=630&fit=crop&q=80' },
  { id: 'rental-yield-analysis-india-2026', slug: 'rental-yield-analysis-india-2026', category: 'investment', title: 'Rental Yield Analysis 2026: भारत के इन 5 शहरों में मिलेगा सबसे ज्यादा किराया!', authorId: 'saurabh-kumar', datePublished: '2026-03-04T16:00:00+05:30', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=630&fit=crop&q=80' },
  { id: 'coliving-investment-passive-income-2026', slug: 'coliving-investment-passive-income-2026', category: 'investment', title: "Co-living Investment 2026: क्या को-लिविंग है नया 'पैसिव इनकम' का खजाना?", authorId: 'vikram-kumar', datePublished: '2026-03-04T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=630&fit=crop&q=80' },
  { id: 'smart-city-real-estate-buy-2026', slug: 'smart-city-real-estate-buy-2026', category: 'economy', title: 'Smart City Real Estate 2026: निवेश के लिए ये हैं भारत के 5 भविष्य के शहर।', authorId: 'harsh-raj', datePublished: '2026-03-04T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=630&fit=crop&q=80' },
  { id: 'property-tax-online-payment-guide-2026', slug: 'property-tax-online-payment-guide-2026', category: 'economy', title: 'Property Tax 2026 Online Guide: घर बैठे कैसे भरें प्रॉपर्टी टैक्स?', authorId: 'raushan-kumar', datePublished: '2026-03-04T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1200&h=630&fit=crop&q=80' },

  // Batch 9: Economy & Policy (10 Stories - Hindi)
  { id: 'india-gdp-5-trillion-journey-2026', slug: 'india-gdp-5-trillion-journey-2026', category: 'economy', title: 'India GDP $5 Trillion Journey 2026: क्या भारत विकसित राष्ट्र बनने की राह पर है?', authorId: 'saurabh-kumar', datePublished: '2026-03-03T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80' },
  { id: 'rupee-internationalization-global-currency-2026', slug: 'rupee-internationalization-global-currency-2026', category: 'economy', title: 'Indian Rupee Internationalization 2026: अब डॉलर को टक्कर!', authorId: 'vikram-kumar', datePublished: '2026-03-03T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1200&h=630&fit=crop&q=80' },
  { id: 'pli-scheme-results-manufacturing-2026', slug: 'pli-scheme-results-manufacturing-2026', category: 'economy', title: 'PLI Scheme Results 2026: क्या Make in India सफल हुआ?', authorId: 'raushan-kumar', datePublished: '2026-03-03T16:00:00+05:30', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop&q=80' },
  { id: 'china-plus-one-india-benefit-2026', slug: 'china-plus-one-india-benefit-2026', category: 'economy', title: 'China+1 Strategy 2026: क्या भारत दुनिया की अगली फैक्ट्री बन चुका है?', authorId: 'vikram-kumar', datePublished: '2026-03-03T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&h=630&fit=crop&q=80' },
  { id: 'msme-crisis-guide-india-2026', slug: 'msme-crisis-guide-india-2026', category: 'economy', title: 'MSME Crisis 2026: भारत की अर्थव्यवस्था की रीढ़ संकट में?', authorId: 'raushan-kumar', datePublished: '2026-03-03T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1542744095-2ad39cbe4196?w=1200&h=630&fit=crop&q=80' },
  { id: 'gig-economy-workers-rights-india-2026', slug: 'gig-economy-workers-rights-india-2026', category: 'economy', title: 'Gig Economy Workers Rights 2026: डिलीवरी बॉय को भी मिलेगी सोशल सिक्योरिटी?', authorId: 'harsh-raj', datePublished: '2026-03-03T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1624536643663-95ac8d523190?w=1200&h=630&fit=crop&q=80' },
  { id: 'ev-subsidy-fame3-impact-2026', slug: 'ev-subsidy-fame3-impact-2026', category: 'economy', title: 'EV Subsidy India 2026: FAME-3 और PM E-Drive का नया अवतार', authorId: 'raushan-kumar', datePublished: '2026-03-03T20:00:00+05:30', image: 'https://images.unsplash.com/photo-1593941707882-a5bba149b0f7?w=1200&h=630&fit=crop&q=80' },
  { id: 'green-hydrogen-mission-india-2026', slug: 'green-hydrogen-mission-india-2026', category: 'economy', title: "India's Green Hydrogen Mission 2026: क्या पानी से चलेगी दुनिया?", authorId: 'saurabh-kumar', datePublished: '2026-03-03T21:00:00+05:30', image: 'https://images.unsplash.com/photo-1594818379496-da1e34550c19?w=1200&h=630&fit=crop&q=80' },
  { id: 'semiconductor-mission-india-fab-2026', slug: 'semiconductor-mission-india-fab-2026', category: 'economy', title: 'India Semiconductor Mission 2026: क्या हम चिप वार में चीन को हरा पाएंगे?', authorId: 'saurabh-kumar', datePublished: '2026-03-03T22:00:00+05:30', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-africa-trade-new-era-2026', slug: 'india-africa-trade-new-era-2026', category: 'economy', title: 'India-Africa Trade 2026: क्या अफ्रीका बनेगा भारत का नया ग्रोथ पार्टनर?', authorId: 'vikram-kumar', datePublished: '2026-03-03T23:00:00+05:30', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=630&fit=crop&q=80' },

  // Batch 8: Digital India & Fintech (10 Stories - Hindi)
  { id: 'upi-international-launch-2026', slug: 'upi-international-launch-2026', category: 'fintech', title: 'UPI Goes Global 2026: अब 20 देशों में PhonePe से करें Payment', authorId: 'harsh-raj', datePublished: '2026-03-02T16:00:00+05:30', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80' },
  { id: 'digital-rupee-expansion-update-2026', slug: 'digital-rupee-expansion-update-2026', category: 'banking', title: 'Digital Rupee (e₹) Update 2026: बिना इंटरनेट के होगा पेमेंट!', authorId: 'saurabh-kumar', datePublished: '2026-03-02T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'ondc-vs-amazon-ecommerce-2026', slug: 'ondc-vs-amazon-ecommerce-2026', category: 'fintech', title: 'ONDC vs Amazon 2026: क्या शॉपिंग करना वाकई सस्ता है?', authorId: 'raushan-kumar', datePublished: '2026-03-02T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=630&fit=crop&q=80' },
  { id: 'fintech-layoffs-sector-outlook-2026', slug: 'fintech-layoffs-sector-outlook-2026', category: 'startups', title: 'Fintech Layoffs 2026: क्या गोल्डन एरा खत्म हो गया?', authorId: 'raushan-kumar', datePublished: '2026-03-02T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=630&fit=crop&q=80' },
  { id: 'neobank-vs-traditional-bank-comparison-2026', slug: 'neobank-vs-traditional-bank-comparison-2026', category: 'banking', title: 'Neobank vs Traditional Bank 2026: निष्पक्ष तुलना', authorId: 'saurabh-kumar', datePublished: '2026-03-02T20:00:00+05:30', image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1200&h=630&fit=crop&q=80' },
  { id: 'account-aggregator-revolution-india-2026', slug: 'account-aggregator-revolution-india-2026', category: 'fintech', title: 'Account Aggregator Revolution 2026: लोन लेना हुआ चुटकियों का काम', authorId: 'vikram-kumar', datePublished: '2026-03-02T21:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80' },
  { id: 'rbi-sandbox-innovations-2026', slug: 'rbi-sandbox-innovations-2026', category: 'banking', title: 'RBI Regulatory Sandbox 2026: 5 नए बैंकिंग फीचर्स', authorId: 'vikram-kumar', datePublished: '2026-03-02T22:00:00+05:30', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80' },
  { id: 'digilocker-financial-integration-guide-2026', slug: 'digilocker-financial-integration-guide-2026', category: 'banking', title: 'DigiLocker Financial Integration 2026: पेपरलेस बैंकिंग', authorId: 'raushan-kumar', datePublished: '2026-03-02T23:00:00+05:30', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop&q=80' },
  { id: 'open-banking-india-future-2026', slug: 'open-banking-india-future-2026', category: 'fintech', title: 'Open Banking India 2026: सारा बैंक बैलेंस एक साथ!', authorId: 'saurabh-kumar', datePublished: '2026-03-03T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=630&fit=crop&q=80' },
  { id: 'ai-chatbot-banking-revolution-2026', slug: 'ai-chatbot-banking-revolution-2026', category: 'banking', title: 'AI Chatbot Banking 2026: आपका AI मैनेजर हर काम करेगा!', authorId: 'harsh-raj', datePublished: '2026-03-03T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=630&fit=crop&q=80' },

  // Batch 7: Stock Market & Trading (10 Stories - Hindi)
  { id: 'nifty-50-record-high-25000-analysis-2026', slug: 'nifty-50-record-high-25000-analysis-2026', category: 'stock-market', title: 'Nifty 50 at 25,000: Valuation, Risks and Retail Investor Guide 2026', authorId: 'saurabh-kumar', datePublished: '2026-03-01T20:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80' },
  { id: 'sebi-warning-retail-fno-trading-losses-2026', slug: 'sebi-warning-retail-fno-trading-losses-2026', category: 'stock-market', title: 'SEBI Warning 2026: 9 Out of 10 Retail Traders Still Losing Money in F&O', authorId: 'harsh-raj', datePublished: '2026-03-01T21:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'multibagger-stocks-identifying-strategy-2026', slug: 'multibagger-stocks-identifying-strategy-2026', category: 'investment', title: 'Multibagger Stocks 2026: How to Identify High-Growth Stocks', authorId: 'vikram-kumar', datePublished: '2026-03-01T22:00:00+05:30', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80' },
  { id: 'ipo-vs-direct-listing-comparison-2026', slug: 'ipo-vs-direct-listing-comparison-2026', category: 'investment', title: 'IPO Allotment Tricks & Grey Market Premium (GMP) Reality 2026', authorId: 'raushan-kumar', datePublished: '2026-03-01T23:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80' },
  { id: 'high-dividend-yield-stocks-india-2026', slug: 'high-dividend-yield-stocks-india-2026', category: 'investment', title: 'High Dividend Yield Stocks India 2026: PSU & Metal Companies Analysis', authorId: 'harsh-raj', datePublished: '2026-03-02T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80' },
  { id: 'sectoral-mutual-fund-rotation-strategy-2026', slug: 'sectoral-mutual-fund-rotation-strategy-2026', category: 'investment', title: 'Sectoral Funds Rotation 2026: The Riskiest Mutual Fund Strategy', authorId: 'saurabh-kumar', datePublished: '2026-03-02T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'penny-stocks-investment-risks-warning-2026', slug: 'penny-stocks-investment-risks-warning-2026', category: 'investment', title: 'Penny Stocks Trap 2026: The Truth Behind Telegram Pump & Dump', authorId: 'harsh-raj', datePublished: '2026-03-02T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=1200&h=630&fit=crop&q=80' },
  { id: 'demat-account-hidden-charges-comparison-2026', slug: 'demat-account-hidden-charges-comparison-2026', category: 'banking', title: 'Demat Account True Cost 2026: The Hidden Charges of Zero Brokerage', authorId: 'saurabh-kumar', datePublished: '2026-03-02T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80' },
  { id: 'zerodha-vs-groww-brokerage-comparison-2026', slug: 'zerodha-vs-groww-brokerage-comparison-2026', category: 'banking', title: 'Zerodha vs Groww vs Angel One: Brokerage Comparison 2026', authorId: 'raushan-kumar', datePublished: '2026-03-02T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80' },
  { id: 'stock-market-crash-survival-guide-2026', slug: 'stock-market-crash-survival-guide-2026', category: 'stock-market', title: 'Stock Market Crash Guide 2026: 5 Emergency Steps for Bear Markets', authorId: 'saurabh-kumar', datePublished: '2026-03-02T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80' },

  // Batch 6: Personal Finance Hacks (10 Stories - Hindi)
  { id: 'credit-card-rewards-hacking-2026', slug: 'credit-card-rewards-hacking-2026', category: 'savings', title: 'Credit Card Rewards Hacking 2026: फ्री फ्लाइट्स और ₹50,000 कैशबैक', authorId: 'harsh-raj', datePublished: '2026-03-01T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80' },
  { id: 'emi-trap-hidden-charges-2026', slug: 'emi-trap-hidden-charges-2026', category: 'savings', title: 'EMI का जाल 2026: No Cost EMI में कितना Hidden Charge?', authorId: 'saurabh-kumar', datePublished: '2026-03-01T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80' },
  { id: 'section-80c-tax-saving-guide-2026', slug: 'section-80c-tax-saving-guide-2026', category: 'tax', title: 'Section 80C Guide 2026: ₹1.5 लाख टैक्स बचाएं — PPF, ELSS, NPS', authorId: 'vikram-kumar', datePublished: '2026-03-01T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80' },
  { id: 'hra-tax-exemption-guide-2026', slug: 'hra-tax-exemption-guide-2026', category: 'tax', title: 'HRA Exemption 2026: किराये पर ₹2-4 लाख टैक्स बचाएं', authorId: 'raushan-kumar', datePublished: '2026-03-01T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80' },
  { id: 'sukanya-samriddhi-yojana-guide-2026', slug: 'sukanya-samriddhi-yojana-guide-2026', category: 'savings', title: 'Sukanya Samriddhi 2026: बेटी के लिए ₹250/माह से ₹70 लाख+', authorId: 'harsh-raj', datePublished: '2026-03-01T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=630&fit=crop&q=80' },
  { id: 'gratuity-calculation-rules-2026', slug: 'gratuity-calculation-rules-2026', category: 'savings', title: 'Gratuity 2026: 5 साल नौकरी पर कितना मिलेगा? Formula और Rules', authorId: 'vikram-kumar', datePublished: '2026-03-01T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80' },
  { id: 'pf-withdrawal-rules-2026', slug: 'pf-withdrawal-rules-2026', category: 'savings', title: 'PF Withdrawal 2026: EPF से पैसा कैसे निकालें? Online Process', authorId: 'saurabh-kumar', datePublished: '2026-03-01T16:00:00+05:30', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80' },
  { id: 'mutual-fund-sip-mistakes-2026', slug: 'mutual-fund-sip-mistakes-2026', category: 'investment', title: 'MF SIP Mistakes 2026: 10 गलतियां जो करोड़ों का नुकसान करती हैं', authorId: 'harsh-raj', datePublished: '2026-03-01T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974714025-e817d3d14245?w=1200&h=630&fit=crop&q=80' },
  { id: 'upi-credit-line-feature-2026', slug: 'upi-credit-line-feature-2026', category: 'savings', title: 'UPI Credit Line 2026: बिना Credit Card के EMI Shopping — कैसे?', authorId: 'raushan-kumar', datePublished: '2026-03-01T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80' },
  { id: 'fd-rate-comparison-all-banks-2026', slug: 'fd-rate-comparison-all-banks-2026', category: 'savings', title: 'FD Rate 2026: SBI, HDFC, ICICI — किसकी FD सबसे ज्यादा ब्याज?', authorId: 'vikram-kumar', datePublished: '2026-03-01T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80' },

  // Batch 5: 1 March 2026 - Investment & Wealth Building (10 Stories - Hindi)
  { id: 'step-up-sip-strategy-crorepati-2026', slug: 'step-up-sip-strategy-crorepati-2026', category: 'investment', title: 'Step-Up SIP 2026: हर साल ₹500 ज्यादा लगाओ और 10 साल में बनाओ ₹1 करोड़', authorId: 'harsh-raj', datePublished: '2026-03-01T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80' },
  { id: 'emergency-fund-guide-india-2026', slug: 'emergency-fund-guide-india-2026', category: 'savings', title: 'Emergency Fund 2026: कितना होना चाहिए? 6 महीने की सैलरी बचाने का तरीका', authorId: 'saurabh-kumar', datePublished: '2026-03-01T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80' },
  { id: 'gold-vs-fd-comparison-2026', slug: 'gold-vs-fd-comparison-2026', category: 'investment', title: 'Gold vs FD 2026: 5 साल में किसने दिया ज्यादा रिटर्न?', authorId: 'vikram-kumar', datePublished: '2026-03-01T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=630&fit=crop&q=80' },
  { id: 'small-cap-risks-strategy-2026', slug: 'small-cap-risks-strategy-2026', category: 'markets', title: 'Small Cap Fund 2026: 5 बड़े रिस्क जो आपको बर्बाद कर सकते हैं', authorId: 'raushan-kumar', datePublished: '2026-03-01T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974714025-e817d3d14245?w=1200&h=630&fit=crop&q=80' },
  { id: 'cibil-score-improvement-guide-2026', slug: 'cibil-score-improvement-guide-2026', category: 'savings', title: 'CIBIL Score 2026: 750+ कैसे बढ़ाएं? 10 आसान तरीके', authorId: 'harsh-raj', datePublished: '2026-03-01T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80' },
  { id: 'retirement-planning-guide-2026', slug: 'retirement-planning-guide-2026', category: 'investment', title: 'Retirement Planning 2026: ₹5 करोड़ कॉर्पस बनाने की स्टेप-बाय-स्टेप गाइड', authorId: 'vikram-kumar', datePublished: '2026-03-01T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=630&fit=crop&q=80' },
  { id: 'rupee-depreciation-impact-2026', slug: 'rupee-depreciation-impact-2026', category: 'economy', title: 'Rupee vs Dollar 2026: रुपया 87 पार! आम आदमी पर क्या असर?', authorId: 'saurabh-kumar', datePublished: '2026-03-01T16:00:00+05:30', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80' },
  { id: 'gst-changes-april-2026', slug: 'gst-changes-april-2026', category: 'tax', title: 'GST Changes 2026: हेल्थ इंश्योरेंस 18→5%, EV 12→5%', authorId: 'harsh-raj', datePublished: '2026-03-01T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80' },
  { id: 'first-salary-money-management-2026', slug: 'first-salary-money-management-2026', category: 'savings', title: 'First Salary 2026: 50-30-20 रूल से पैसे कैसे मैनेज करें?', authorId: 'raushan-kumar', datePublished: '2026-03-01T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80' },
  { id: 'real-estate-vs-stock-market-2026', slug: 'real-estate-vs-stock-market-2026', category: 'investment', title: 'Real Estate vs Stock Market 2026: ₹50 लाख कहाँ लगाएं?', authorId: 'vikram-kumar', datePublished: '2026-03-01T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80' },

  // Batch 4: 1 March 2026 - Tax & Personal Finance (10 Stories - Hindi)
  { id: 'new-vs-old-tax-regime-comparison-2026', slug: 'new-vs-old-tax-regime-comparison-2026', category: 'tax', title: 'New Tax Regime vs Old Regime 2026: ₹12 लाख तक टैक्स फ्री', authorId: 'priyanka-verma', datePublished: '2026-03-01T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80' },
  { id: 'nps-vatsalya-children-pension-scheme-2026', slug: 'nps-vatsalya-children-pension-scheme-2026', category: 'savings', title: 'NPS Vatsalya 2026: बच्चों के लिए पेंशन अकाउंट', authorId: 'divya-kashyap', datePublished: '2026-03-01T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=630&fit=crop&q=80' },
  { id: 'capital-gains-tax-changes-2026', slug: 'capital-gains-tax-changes-2026', category: 'tax', title: 'Capital Gains Tax 2026: LTCG 12.5%, STCG 20%', authorId: 'amit-sharma', datePublished: '2026-03-01T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974714025-e817d3d14245?w=1200&h=630&fit=crop&q=80' },
  { id: 'sovereign-gold-bond-exit-strategy-2026', slug: 'sovereign-gold-bond-exit-strategy-2026', category: 'gold', title: 'SGB Exit Strategy 2026: ₹4,000 में खरीदा अब ₹8,500+', authorId: 'rajesh-kumar', datePublished: '2026-03-01T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=630&fit=crop&q=80' },
  { id: 'health-insurance-premium-surge-2026', slug: 'health-insurance-premium-surge-2026', category: 'insurance', title: 'Health Insurance Premium 2026: 30-40% बढ़ोतरी', authorId: 'dr-manisha-singh', datePublished: '2026-03-01T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop&q=80' },
  { id: 'home-loan-interest-rate-trends-2026', slug: 'home-loan-interest-rate-trends-2026', category: 'real-estate', title: 'Home Loan Rate 2026: RBI रेट कट के बाद EMI कम', authorId: 'sunil-rathore', datePublished: '2026-03-01T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80' },
  { id: 'ppf-elss-nps-comparison-2026', slug: 'ppf-elss-nps-comparison-2026', category: 'savings', title: 'PPF vs ELSS vs NPS 2026: टैक्स बचाने के लिए कहाँ लगाएं पैसा?', authorId: 'neha-gupta', datePublished: '2026-03-01T16:00:00+05:30', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80' },
  { id: 'crypto-tax-compliance-india-2026', slug: 'crypto-tax-compliance-india-2026', category: 'crypto', title: 'Crypto Tax India 2026: 30% TDS और ITR में कैसे दिखाएं', authorId: 'aakash-jain', datePublished: '2026-03-01T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&h=630&fit=crop&q=80' },
  { id: 'senior-citizen-savings-scheme-2026', slug: 'senior-citizen-savings-scheme-2026', category: 'savings', title: 'SCSS 2026: 8.2% ब्याज, ₹30 लाख तक निवेश', authorId: 'om-prakash-tiwari', datePublished: '2026-03-01T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=630&fit=crop&q=80' },
  { id: 'itr-filing-deadline-penalties-2026', slug: 'itr-filing-deadline-penalties-2026', category: 'tax', title: 'ITR Filing Deadline 2026: 31 जुलाई तक भरें वरना ₹10,000 जुर्माना', authorId: 'ca-vivek-agrawal', datePublished: '2026-03-01T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80' },

  // 1 March 2026: Batch 2 - Markets & Regulations (10 Stories - Hindi)
  { id: 'nifty-bank-reshuffle-yes-bank-union-bank-2026', slug: 'nifty-bank-reshuffle-yes-bank-union-bank-2026', category: 'markets', title: 'Nifty Bank में बड़ा फेरबदल: Yes Bank और Union Bank की एंट्री, क्या बदलेगा आपके पोर्टफोलियो में?', authorId: 'saurabh-kumar', datePublished: '2026-03-01T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'direct-foreign-equity-investment-for-indians-2026', slug: 'direct-foreign-equity-investment-for-indians-2026', category: 'markets', title: 'भारतीयों के लिए अमेरिका में निवेश हुआ आसान: अब सीधे NSE/BSE प्लेटफॉर्म से खरीद सकेंगे Apple और Tesla के शेयर', authorId: 'harsh-raj', datePublished: '2026-03-01T11:45:00+05:30', image: 'https://images.unsplash.com/photo-1611974714025-e817d3d14245?w=1200&h=630&fit=crop&q=80' },
  { id: 'holi-market-holiday-impact-trading-2026', slug: 'holi-market-holiday-impact-trading-2026', category: 'markets', title: 'Holi 2026: शेयर बाजार में 3 दिन की लंबी छुट्टी, ट्रेडिंग और सेटलमेंट पर पड़ेगा बड़ा असर', authorId: 'raushan-kumar', datePublished: '2026-03-01T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=630&fit=crop&q=80' },
  { id: 'fmcg-consumer-stocks-rally-march-2026', slug: 'fmcg-consumer-stocks-rally-march-2026', category: 'economy', title: 'FMCG और Consumer Stocks में जबरदस्त तेजी: ग्रामीण मांग में सुधार और शादी के सीजन का दिखा असर', authorId: 'saurabh-kumar', datePublished: '2026-03-01T16:20:00+05:30', image: 'https://images.unsplash.com/photo-1511317551228-560927df7375?w=1200&h=630&fit=crop&q=80' },
  { id: 'nifty-technical-analysis-bullish-patterns-march-2026', slug: 'nifty-technical-analysis-bullish-patterns-march-2026', category: 'markets', title: 'Nifty Technical Analysis: चार्ट पर बना \'गोल्डन क्रॉस\' पैटर्न, क्या 28,000 की ओर बढ़ेगा बाजार?', authorId: 'saurabh-kumar', datePublished: '2026-03-01T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974714025-e817d3d14245?w=1200&h=630&fit=crop&q=80' },
  { id: 'sebi-sme-ipo-regulations-crackdown-march-2026', slug: 'sebi-sme-ipo-regulations-crackdown-march-2026', category: 'markets', title: 'SME IPO के लिए SEBI के नए कड़े नियम: अब ₹2 लाख से कम के निवेश की अनुमति नहीं!', authorId: 'harsh-raj', datePublished: '2026-03-01T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'esg-reporting-mandate-top-1000-companies-2026', slug: 'esg-reporting-mandate-top-1000-companies-2026', category: 'economy', title: 'भारतीय कंपनियों के लिए ESG नियम हुए सख्त: टॉप 1000 लिस्टेड फर्म्स के लिए BRSR रिपोर्टिंग अनिवार्य', authorId: 'saurabh-kumar', datePublished: '2026-03-01T18:30:00+05:30', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=630&fit=crop&q=80' },
  { id: 'index-vs-active-mutual-fund-performance-2026', slug: 'index-vs-active-mutual-fund-performance-2026', category: 'economy', title: 'Index Fund बनाम Active Mutual Fund: 2026 में कौन जीत रहा है निवेश की लड़ाई?', authorId: 'raushan-kumar', datePublished: '2026-03-01T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-retail-investor-participation-milestone-2026', slug: 'india-retail-investor-participation-milestone-2026', category: 'markets', title: 'भारत का \'इन्वेस्टमेंट\' रिवॉल्यूशन: 20 करोड़ डिमैट अकाउंट्स का ऐतिहासिक आंकड़ा पार!', authorId: 'saurabh-kumar', datePublished: '2026-03-01T20:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'reits-vs-gold-investment-comparison-2026', slug: 'reits-vs-gold-investment-comparison-2026', category: 'economy', title: 'REITs बनाम Physical Gold: निवेश के लिए 2026 में कौन ज्यादा सुरक्षित और फायदेमंद?', authorId: 'raushan-kumar', datePublished: '2026-03-01T21:00:00+05:30', image: 'https://images.unsplash.com/photo-1573163226841-865dc35f9923?w=1200&h=630&fit=crop&q=80' },

  // 1 March 2026: Batch 1 - Banking & UPI (10 Stories - Hindi)
  { id: 'upi-biometric-authentication-2026', slug: 'upi-biometric-authentication-2026', category: 'economy', title: 'UPI ट्रांजैक्शन के लिए अब बायोमेट्रिक जरूरी: ₹5000 से ऊपर के भुगतान पर नई सुरक्षा परत', authorId: 'harsh-raj', datePublished: '2026-03-01T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop&q=80' },
  { id: 'idfc-first-bank-590-crore-fraud-case', slug: 'idfc-first-bank-590-crore-fraud-case', category: 'economy', title: 'IDFC First Bank में ₹590 करोड़ का बड़ा घोटाला: जाली चेक और सरकारी खातों की सुरक्षा पर सवाल', authorId: 'harsh-raj', datePublished: '2026-03-01T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=1200&h=630&fit=crop&q=80' },
  { id: 'psb-reduction-minimum-balance-charges-2026', slug: 'psb-reduction-minimum-balance-charges-2026', category: 'economy', title: 'सरकारी बैंकों में मिनिमम बैलेंस का झंझट खत्म? मार्च 2026 से लागू हो रहे हैं नए नियम', authorId: 'harsh-raj', datePublished: '2026-03-01T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1616077168712-fc6c788bc4ee?w=1200&h=630&fit=crop&q=80' },
  { id: 'lpg-commercial-price-cut-march-2026', slug: 'lpg-commercial-price-cut-march-2026', category: 'economy', title: 'LPG सिलेंडर की कीमतों में भारी गिरावट: 19 किलो वाले कमर्शियल सिलेंडर हुए सस्ते, जानें नए रेट', authorId: 'harsh-raj', datePublished: '2026-03-01T08:00:00+05:30', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=630&fit=crop&q=80' },
  { id: 'atf-price-hike-airfare-impact-2026', slug: 'atf-price-hike-airfare-impact-2026', category: 'economy', title: 'हवाई सफर होगा महंगा! ATF की कीमतों में बढ़ोतरी से विमान कंपनियों ने बढ़ाए दाम', authorId: 'harsh-raj', datePublished: '2026-03-01T08:30:00+05:30', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=630&fit=crop&q=80' },
  { id: 'epfo-interest-rate-8-25-percent-2026', slug: 'epfo-interest-rate-8-25-percent-2026', category: 'economy', title: 'EPFO का बड़ा ऐलान: 31 करोड़ सदस्यों के लिए 8.25% ब्याज दर तय, जानें आपके खाते में कब आएंगे पैसे', authorId: 'harsh-raj', datePublished: '2026-03-01T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'digital-rupee-offline-mode-rbi-launch-2026', slug: 'digital-rupee-offline-mode-rbi-launch-2026', category: 'economy', title: 'बिना इंटरनेट के भी होगा भुगतान: RBI ने लॉन्च किया डिजिटल रुपया (e₹) का \'ऑफलाइन मोड\'', authorId: 'harsh-raj', datePublished: '2026-03-01T11:30:00+05:30', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-household-debt-credit-to-gdp-ratio-2026', slug: 'india-household-debt-credit-to-gdp-ratio-2026', category: 'economy', title: 'भारत में बढ़ता कर्ज: हाउसहोल्ड डेट और क्रेडिट-टू-जीडीपी रेशियो ने बजाई खतरे की घंटी?', authorId: 'harsh-raj', datePublished: '2026-03-01T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&h=630&fit=crop&q=80' },
  { id: 't-plus-zero-instant-settlement-stock-market-india-2026', slug: 't-plus-zero-instant-settlement-stock-market-india-2026', category: 'markets', title: 'शेयर बाजार में बड़ा बदलाव: अब T+0 सेटलमेंट लागू, बेचते ही तुरंत मिलेंगे पैसे!', authorId: 'harsh-raj', datePublished: '2026-03-01T09:15:00+05:30', image: 'https://images.unsplash.com/photo-1611974714025-e817d3d14245?w=1200&h=630&fit=crop&q=80' },
  { id: 'financial-literacy-mandatory-indian-schools-2026', slug: 'financial-literacy-mandatory-indian-schools-2026', category: 'economy', title: 'स्कूली शिक्षा में बड़ा बदलाव: अब कक्षा 6 से अनिवार्य होगा \'फाइनेंशियल लिटरेसी\' विषय', authorId: 'harsh-raj', datePublished: '2026-03-01T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&h=630&fit=crop&q=80' },

  // Batch 3: 1 March 2026 - Fintech & Digital India
  { id: 'ondc-expansion-india-2026', slug: 'ondc-expansion-india-2026', category: 'economy', title: 'ONDC Expansion 2026: The New Era of Digital Commerce', authorId: 'sandeep-chaudhary', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'ai-personal-finance-revolution-2026', slug: 'ai-personal-finance-revolution-2026', category: 'fintech', title: 'AI Personal Finance Revolution 2026', authorId: 'rohan-solanki', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'phonepe-googlepay-market-share-2026', slug: 'phonepe-googlepay-market-share-2026', category: 'fintech', title: 'PhonePe vs Google Pay: The UPI Duopoly of 2026', authorId: 'vishal-garg', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'bnpl-crisis-india-regulations-2026', slug: 'bnpl-crisis-india-regulations-2026', category: 'economy', title: 'BNPL Crisis 2026: Regulatory Crackdown on Digital Credit', authorId: 'anjali-mehra', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'insurtech-boom-india-2026', slug: 'insurtech-boom-india-2026', category: 'fintech', title: 'Insurtech Boom 2026: Digital Insurance Revolution', authorId: 'kiran-ojha', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'wealthtech-rural-india-growth-2026', slug: 'wealthtech-rural-india-growth-2026', category: 'wealth', title: 'WealthTech Rural Growth 2026: Digital Investing in Rural India', authorId: 'arun-pratap-singh', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'whatsapp-banking-popularity-2026', slug: 'whatsapp-banking-popularity-2026', category: 'technology', title: 'WhatsApp Banking 2026: The Rise of Conversational Finance', authorId: 'nidhi-sharma', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'cybersecurity-neobanks-protection-2026', slug: 'cybersecurity-neobanks-protection-2026', category: 'security', title: 'Cybersecurity in Neobanks 2026: Protecting Digital Wealth', authorId: 'samir-sheikh', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'digital-lending-guidelines-rbi-2026', slug: 'digital-lending-guidelines-rbi-2026', category: 'regulations', title: 'Digital Lending Guidelines RBI 2026', authorId: 'neeraj-tyagi', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'fintech-unicorn-pipeline-2026', slug: 'fintech-unicorn-pipeline-2026', category: 'startups', title: 'Fintech Unicorn Pipeline 2026', authorId: 'vishal-saxena', datePublished: '2026-03-01T00:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },

  // 1 March 2026: Viral Finance News – 9 New Stories (Hindi)
  { id: 'rbi-digital-rupee-expansion-2026', slug: 'rbi-digital-rupee-expansion-2026', category: 'economy', title: 'RBI Digital Rupee (e₹) Expansion: 60 लाख यूजर्स और ऑफलाइन पेमेंट्स का आगाज', authorId: 'harsh-raj', datePublished: '2026-03-01T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1621416848440-461918e35963?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-it-ai-crisis-citrini-report', slug: 'india-it-ai-crisis-citrini-report', category: 'tech-business', title: 'भारतीय आईटी सेक्टर और AI का संकट: क्या सिट्रिनी रिपोर्ट सच साबित होगी?', authorId: 'harsh-raj', datePublished: '2026-03-01T11:30:00+05:30', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop&q=80' },
  { id: 'sme-ipo-wave-march-2026-analysis', slug: 'sme-ipo-wave-march-2026-analysis', category: 'markets', title: 'भारत में SME IPO की सुनामी: मार्च 2026 में 15+ कंपनियां मैदान में, क्या यह निवेश का सही मौका है?', authorId: 'harsh-raj', datePublished: '2026-03-01T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-semiconductor-mission-2-micron', slug: 'india-semiconductor-mission-2-micron', category: 'tech-business', title: 'भारत का सेमीकंडक्टर मिशन 2.0: माइक्रोन (Micron) की पहली मेड इन इंडिया चिप और आत्मनिर्भर भारत का आगाज', authorId: 'harsh-raj', datePublished: '2026-03-01T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&q=80' },
  { id: 'crypto-tax-2026-penalty-rules', slug: 'crypto-tax-2026-penalty-rules', category: 'markets', title: 'क्रिप्टो टैक्स 2026: 30% टैक्स के साथ अब भारी जुर्माना भी! जानें नए कड़े नियम', authorId: 'harsh-raj', datePublished: '2026-03-01T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-green-energy-250gw-milestone', slug: 'india-green-energy-250gw-milestone', category: 'economy', title: 'भारत की हरित ऊर्जा क्रांति: 250 GW क्षमता का ऐतिहासिक लक्ष्य और ग्रीन इन्वेस्टमेंट के नए अवसर', authorId: 'harsh-raj', datePublished: '2026-03-01T16:30:00+05:30', image: 'https://images.unsplash.com/photo-1509391366360-fe5bb6585823?w=1200&h=630&fit=crop&q=80' },
  { id: 'fire-movement-india-youth-retirement', slug: 'fire-movement-india-youth-retirement', category: 'economy', title: 'भारत में FIRE मूवमेंट की लहर: क्यों 43% युवा 40 की उम्र से पहले रिटायर होना चाहते हैं?', authorId: 'harsh-raj', datePublished: '2026-03-01T17:00:00+05:30', image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=630&fit=crop&q=80' },
  { id: 'stt-hike-derivative-trading-impact-2026', slug: 'stt-hike-derivative-trading-impact-2026', category: 'markets', title: 'F&O ट्रेडिंग पर STT का झटका: क्या भारत में सट्टेबाजी पर लगाम लगेगी या मार्केट वॉल्यूम गिरेगा?', authorId: 'harsh-raj', datePublished: '2026-03-01T18:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974714025-e817d3d14245?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-gdp-revamp-2026-growth-analysis', slug: 'india-gdp-revamp-2026-growth-analysis', category: 'economy', title: 'भारत की जीडीपी में बड़ा बदलाव: नए बेस ईयर और 7.6% की रफ्तार के साथ तीसरी बड़ी अर्थव्यवस्था का सफर', authorId: 'harsh-raj', datePublished: '2026-03-01T19:00:00+05:30', image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&h=630&fit=crop&q=80' },

  // 1 March 2026: Viral Finance News – 10 Trending Stories (Hindi)
  { id: 'viral-finance-news-march-2026', slug: 'viral-finance-news-march-2026', category: 'markets', title: 'मार्च 2026 की 10 बड़ी वायरल फाइनेंस खबरें: AI, UPI और शेयर बाजार विश्लेषण', authorId: 'harsh-raj', datePublished: '2026-03-01T14:20:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80' },

  // 27 Feb 2026: Viral Finance News – 10 Unique SEO articles
  { id: 'union-budget-2026-stt-hike-futures-options-impact', slug: 'union-budget-2026-stt-hike-futures-options-impact', category: 'markets', subCategory: 'taxation', title: 'Union Budget 2026: STT on F&O Increased—What Traders Need to Know', authorId: 'harsh-raj', datePublished: '2026-02-15T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80' },
  { id: 'rbi-reit-invit-lending-guidelines-2026', slug: 'rbi-reit-invit-lending-guidelines-2026', category: 'economy', subCategory: 'banking-policy', title: 'RBI Relaxes Norms: Banks Can Now Lend Against REIT and InvIT Units', authorId: 'harsh-raj', datePublished: '2026-02-14T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80' },
  { id: 'fii-inflow-record-february-2026-indian-markets', slug: 'fii-inflow-record-february-2026-indian-markets', category: 'markets', subCategory: 'market-movements', title: 'FIIs Pump $5 Billion Into Indian Equities in Just 10 Days', authorId: 'vikram-kumar', datePublished: '2026-02-12T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1200&h=630&fit=crop&q=80' },
  { id: 'bitcoin-price-rally-95000-impact-india', slug: 'bitcoin-price-rally-95000-impact-india', category: 'markets', subCategory: 'crypto', title: 'Bitcoin Nears $95,000 Milestone: What it Means for Indian Crypto Investors', authorId: 'saurabh-kumar', datePublished: '2026-02-16T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=630&fit=crop&q=80' },
  { id: 'irfc-ofs-divestment-update-feb-2026', slug: 'irfc-ofs-divestment-update-feb-2026', category: 'markets', subCategory: 'psu-stocks', title: 'IRFC OFS: Government to Sell 5% Stake in Mega Divestment Drive', authorId: 'raushan-kumar', datePublished: '2026-02-13T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=630&fit=crop&q=80' },
  { id: 'pnb-fixed-deposit-rates-hike-senior-citizens', slug: 'pnb-fixed-deposit-rates-hike-senior-citizens', category: 'economy', subCategory: 'personal-finance', title: 'PNB Increases FD Interest Rates: Senior Citizens to Get up to 8.5%', authorId: 'harsh-raj', datePublished: '2026-02-18T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&h=630&fit=crop&q=80' },
  { id: 'defence-budget-2026-modernization-indiginization', slug: 'defence-budget-2026-modernization-indiginization', category: 'economy', subCategory: 'defence', title: 'Defence Budget 2026: ₹7.2 Lakh Crore Allocated for Massive Modernization', authorId: 'vikram-kumar', datePublished: '2026-02-11T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-rare-earth-mining-policy-2026', slug: 'india-rare-earth-mining-policy-2026', category: 'economy', subCategory: 'mining-policy', title: 'India Unveils New Rare Earth Mining Policy to Break Global Monopoly', authorId: 'harsh-raj', datePublished: '2026-02-19T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80' },
  { id: 'lt-wins-massive-global-order-feb-2026', slug: 'lt-wins-massive-global-order-feb-2026', category: 'business-analysis', subCategory: 'infra', title: 'L&T Secures ₹15,000 Crore "Mega" Order in Saudi Arabia', authorId: 'saurabh-kumar', datePublished: '2026-02-21T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=630&fit=crop&q=80' },
  { id: 'citrini-research-report-indian-it-golden-era', slug: 'citrini-research-report-indian-it-golden-era', category: 'business-analysis', subCategory: 'it-sector', title: 'Citrini Report: Indian IT Entering "Golden Era-2" Driven by Generative AI', authorId: 'harsh-raj', datePublished: '2026-02-23T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80' },

  // 14 Feb 2026: RBI Banking, GIFT City, REIT, M&A, Markets – 15 Google News SEO articles
  { id: 'rbi-banks-acquisition-financing-20-percent-capital-feb-2026', slug: 'rbi-allows-banks-finance-acquisitions-20-percent-capital-corporate-takeovers-feb-2026', category: 'economy', subCategory: 'banking-policy', title: 'RBI ने बैंकों को पूंजी का 20% तक अधिग्रहण वित्तपोषण की अनुमति दी', authorId: 'saurabh-kumar', datePublished: '2026-02-14T09:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80' },
  { id: 'uday-kotak-chairman-gift-city-feb-2026', slug: 'uday-kotak-appointed-chairman-gift-city-gujarat-international-finance-feb-2026', category: 'economy', subCategory: 'financial-hub', title: 'उदय कोटक को GIFT City का चेयरमैन नियुक्त किया गया', authorId: 'harsh-raj', datePublished: '2026-02-14T09:30:00+05:30', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80' },
  { id: 'rbi-proposes-banks-lend-reits-feb-2026', slug: 'rbi-proposes-banks-lend-reits-draft-guidelines-controlled-exposure-feb-2026', category: 'economy', subCategory: 'banking-policy', title: 'RBI ने प्रस्ताव दिया: बैंक REITs को ऋण दे सकेंगे', authorId: 'saurabh-kumar', datePublished: '2026-02-14T10:00:00+05:30', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80' },
  { id: 'rbi-strict-rules-reit-financing-feb-2026', slug: 'rbi-sets-strict-rules-reit-financing-quality-projects-completion-certificates-feb-2026', category: 'economy', subCategory: 'banking-policy', title: 'RBI ने REIT वित्तपोषण के लिए सख्त नियम निर्धारित किए', authorId: 'saurabh-kumar', datePublished: '2026-02-14T10:30:00+05:30', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&fit=crop&q=80' },
  { id: 'rbi-eases-acquisition-finance-stake-top-ups-feb-2026', slug: 'rbi-eases-acquisition-finance-rules-allows-higher-stake-top-ups-26-90-percent-ma-feb-2026', category: 'economy', subCategory: 'banking-policy', title: 'RBI ने अधिग्रहण वित्त नियमों में छूट दी, 26-90% हिस्सेदारी खरीद की अनुमति', authorId: 'saurabh-kumar', datePublished: '2026-02-14T11:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80' },
  { id: 'sensex-nifty-wealth-erosion-7-lakh-crore-feb-2026', slug: 'sensex-nifty-wealth-erosion-investors-lost-7-lakh-crore-market-sell-off-feb-2026', category: 'markets', subCategory: 'market-movements', title: 'सेंसेक्स और निफ्टी: निवेशकों का ₹7 लाख करोड़ से अधिक धन मिटा', authorId: 'raushan-kumar', datePublished: '2026-02-14T14:00:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80' },
  { id: 'major-dips-across-stock-sectors-feb-2026', slug: 'major-dips-across-stock-sectors-midcap-smallcap-bank-nifty-declines-feb-2026', category: 'markets', subCategory: 'sector-update', title: 'अधिकांश इंडेक्स में बड़ी गिरावट – मिड-कैप, स्मॉल-कैप, बैंक निफ्टी', authorId: 'saurabh-kumar', datePublished: '2026-02-14T14:30:00+05:30', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80' },
  { id: 'certain-stocks-buck-trend-rally-feb-2026', slug: 'certain-stocks-buck-trend-rally-10-percent-broad-market-slump-feb-2026', category: 'markets', subCategory: 'stock-update', title: 'कुछ स्टॉक ट्रेंड के खिलाफ चले, 10% तक उछले', authorId: 'vikram-kumar', datePublished: '2026-02-14T15:00:00+05:30', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80' },
  { id: 'key-stocks-to-watch-today-feb-2026', slug: 'key-stocks-to-watch-today-q3-results-dividends-management-updates-feb-2026', category: 'markets', subCategory: 'stock-update', title: 'आज ध्यान में रखने योग्य प्रमुख स्टॉक – Q3 नतीजे, डिविडेंड', authorId: 'vikram-kumar', datePublished: '2026-02-14T15:30:00+05:30', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-forex-reserves-weekly-drop-feb-2026', slug: 'india-forex-reserves-weekly-drop-rbi-data-valuations-gold-movement-feb-2026', category: 'economy', subCategory: 'forex', title: 'भारत के विदेशी मुद्रा भंडार में साप्ताहिक गिरावट – RBI आंकड़े', authorId: 'saurabh-kumar', datePublished: '2026-02-14T11:30:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80' },
  { id: 'india-remains-fast-growing-economy-feb-2026', slug: 'india-remains-fast-growing-economy-strong-outlook-asian-peers-feb-2026', category: 'economy', subCategory: 'economic-growth', title: 'भारत तेजी से बढ़ती अर्थव्यवस्था बना हुआ – वृद्धि आउटलुक मजबूत', authorId: 'harsh-raj', datePublished: '2026-02-14T12:00:00+05:30', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80' },
  { id: 'market-indicators-weakening-rupee-feb-2026', slug: 'market-indicators-show-weakening-rupee-currency-trends-sell-off-inflows-feb-2026', category: 'economy', subCategory: 'forex', title: 'बाजार संकेतक रुपये की कमजोरी दिखाते हैं – मुद्रा रुझान', authorId: 'saurabh-kumar', datePublished: '2026-02-14T12:30:00+05:30', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80' },
  { id: 'bajaj-finance-stock-outperforms-market-feb-2026', slug: 'bajaj-finance-stock-outperforms-market-despite-sell-off-credit-offtake-trends-feb-2026', category: 'tech-business', subCategory: 'fintech', title: 'बजाज फाइनेंस स्टॉक बाजार से बेहतर प्रदर्शन कर रहा है', authorId: 'harsh-raj', datePublished: '2026-02-14T16:00:00+05:30', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80' },
  { id: 'ml-ma-financing-norms-apr-1-2026-feb-2026', slug: 'ml-ma-financing-norms-come-into-effect-apr-1-banks-fund-larger-acquisition-values-feb-2026', category: 'economy', subCategory: 'banking-policy', title: 'ML/M&A वित्तपोषण मानदंड 1 अप्रैल से लागू', authorId: 'saurabh-kumar', datePublished: '2026-02-14T13:00:00+05:30', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80' },
  { id: 'rbi-capital-exposure-ltv-feb-2026', slug: 'rbi-broader-capital-exposure-rule-changes-loans-shares-reits-mutual-funds-etf-ltv-feb-2026', category: 'economy', subCategory: 'banking-policy', title: 'RBI ने पूंजी एक्सपोजर नियम बदले – शेयर, REIT, MF, ETF पर ऋण में LTV', authorId: 'saurabh-kumar', datePublished: '2026-02-14T13:30:00+05:30', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80' },

  // 13 Feb 2026: Stock Market, Economy, Corporate – 15 Google News optimized articles
  {
    id: 'indian-markets-sharp-decline-sensex-1048-feb-2026',
    slug: 'indian-markets-closed-sharply-lower-sensex-down-1048-points-nifty-support-feb-2026',
    category: 'markets',
    subCategory: 'market-movements',
    title: 'भारतीय शेयर बाजार में तीव्र गिरावट: सेंसेक्स 1,048 अंक लुढ़का, निफ्टी ने अहम सपोर्ट तोड़ा',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-13T15:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'sensex-slump-wealth-loss-6-5-lakh-crore-feb-2026',
    slug: 'sensex-slump-investor-wealth-loss-6-5-lakh-crore-bse-session-feb-2026',
    category: 'markets',
    subCategory: 'market-movements',
    title: 'सेंसेक्स गिरावट: निवेशकों का ~₹6.5 लाख करोड़ का धन एक सत्र में मिटा',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-13T15:45:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'indian-markets-it-metal-stocks-red-feb-2026',
    slug: 'indian-markets-under-pressure-it-metal-stocks-red-live-feed-feb-2026',
    category: 'markets',
    subCategory: 'sector-update',
    title: 'भारतीय बाजार IT और मेटल स्टॉक्स के दबाव में लाल निशान पर',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-13T16:15:00+05:30',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'divis-labs-coal-india-stock-prices-feb-2026',
    slug: 'divis-labs-coal-india-stock-prices-moving-today-blue-chip-update-feb-2026',
    category: 'markets',
    subCategory: 'stock-update',
    title: 'Divis Labs और Coal India स्टॉक की कीमतें आज चल रही हैं',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-13T16:45:00+05:30',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'indian-equities-global-investment-potential-feb-2026',
    slug: 'indian-equities-global-investment-potential-foreign-allocation-lag-feb-2026',
    category: 'markets',
    subCategory: 'market-analysis',
    title: 'भारतीय इक्विटी अभी भी पूर्ण वैश्विक निवेश क्षमता पर कब्जा नहीं कर रही',
    authorId: 'harsh-raj',
    datePublished: '2026-02-13T18:45:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'india-forex-reserves-dip-rbi-feb-2026',
    slug: 'india-forex-reserves-dip-6-7-billion-rbi-data-717-billion-feb-2026',
    category: 'economy',
    subCategory: 'forex',
    title: 'भारत के विदेशी मुद्रा भंडार में गिरावट: RBI आंकड़ों के मुताबिक $6.7 बिलियन की कमी',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-13T16:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'fitch-india-fastest-growing-asia-2026',
    slug: 'fitch-india-asia-fastest-growing-economy-2026-ratings-affirmed',
    category: 'economy',
    subCategory: 'economic-growth',
    title: 'Fitch: भारत 2026 में एशिया की सबसे तेजी से बढ़ती अर्थव्यवस्था बना रहेगा',
    authorId: 'harsh-raj',
    datePublished: '2026-02-13T16:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'india-us-trade-deal-economic-pillar-feb-2026',
    slug: 'india-us-trade-deal-new-economic-pillar-exports-growth-feb-2026',
    category: 'economy',
    subCategory: 'trade',
    title: 'भारत-अमेरिका व्यापार समझौता नई आर्थिक स्तंभ के रूप में देखा जा रहा है',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-13T17:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'india-swaps-fy27-bonds-rbi-2040-feb-2026',
    slug: 'india-government-swaps-fy27-bonds-rbi-issues-long-term-2040-bonds-feb-2026',
    category: 'economy',
    subCategory: 'debt-management',
    title: 'भारत RBI के साथ FY27 बॉन्ड स्वैप करता है, दीर्घकालिक 2040 बॉन्ड जारी करता है',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-13T17:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'bond-buybacks-yields-climb-feb-2026',
    slug: 'market-participants-call-bond-buybacks-yields-climb-government-debt-feb-2026',
    category: 'economy',
    subCategory: 'debt-management',
    title: 'यील्ड बढ़ने पर बाजार प्रतिभागी बॉन्ड बायबैक की मांग करते हैं',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-13T17:45:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'sebi-plans-cut-compliance-burden-feb-2026',
    slug: 'sebi-plans-cut-compliance-burden-firms-rules-streamline-feb-2026',
    category: 'economy',
    subCategory: 'regulatory',
    title: 'SEBI ने कंपनियों के लिए अनुपालन बोझ कम करने की योजना बनाई',
    authorId: 'harsh-raj',
    datePublished: '2026-02-13T18:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'rbi-monetary-policy-repo-5-25-feb-2026',
    slug: 'rbi-monetary-policy-repo-rate-5-25-percent-mpc-decision-inflation-feb-2026',
    category: 'economy',
    subCategory: 'monetary-policy',
    title: 'RBI मौद्रिक नीति: रेपो दर 5.25% पर बनाए रखी – स्थिर मुद्रास्फीति',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-13T19:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'torrent-power-20-billion-bonds-feb-2026',
    slug: 'torrent-power-raise-20-billion-rupees-bonds-energy-sector-feb-2026',
    category: 'business-analysis',
    subCategory: 'corporate-finance',
    title: 'टॉरेंट पावर बॉन्ड के जरिए ₹20 अरब जुटाने की योजना बना रही है',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-13T18:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'bajaj-finance-ai-customer-analytics-feb-2026',
    slug: 'bajaj-finance-gains-ai-based-customer-analytics-revenue-growth-feb-2026',
    category: 'tech-business',
    subCategory: 'fintech',
    title: 'बजाज फाइनेंस को AI-आधारित ग्राहक विश्लेषण से लाभ',
    authorId: 'harsh-raj',
    datePublished: '2026-02-13T19:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&q=80'
  },

  // 11 Feb 2026: Latest finance and economy headlines (15 Hindi stories)
  {
    id: 'muthoot-finance-profit-jump-feb-11-2026',
    slug: 'muthoot-finance-profit-jumps-strong-gold-loan-demand-feb-11-2026',
    category: 'markets',
    subCategory: 'results-update',
    title: 'मुथूट फाइनेंस का मुनाफा तेज उछला, गोल्ड-लोन मांग बनी बड़ी ताकत',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-11T08:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'rbi-bond-switch-operation-fy27-feb-11-2026',
    slug: 'rbi-bond-switch-operation-fy27-buyback-2040-issuance-feb-11-2026',
    category: 'economy',
    subCategory: 'debt-management',
    title: 'सरकार-RBI बॉन्ड स्विच ऑपरेशन: कर्ज प्रबंधन में बड़ा कदम',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-11T08:20:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'rbi-banks-can-finance-reits-feb-11-2026',
    slug: 'rbi-policy-banks-can-finance-reits-directly-feb-11-2026',
    category: 'economy',
    subCategory: 'regulatory-policy',
    title: 'RBI का नीति संकेत: बैंक अब REITs को सीधे फंडिंग दे सकेंगे',
    authorId: 'harsh-raj',
    datePublished: '2026-02-11T08:40:00+05:30',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'union-budget-53-47-lakh-crore-feb-11-2026',
    slug: 'union-budget-2026-27-rs-53-47-lakh-crore-spending-plan-feb-11-2026',
    category: 'economy',
    subCategory: 'union-budget',
    title: 'यूनियन बजट 2026-27: ₹53.47 लाख करोड़ खर्च योजना का बड़ा संकेत',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-11T09:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'msci-adds-aditya-birla-capital-lt-finance-feb-11-2026',
    slug: 'msci-adds-aditya-birla-capital-lt-finance-global-index-feb-11-2026',
    category: 'markets',
    subCategory: 'index-update',
    title: 'MSCI इंडेक्स में दो भारतीय वित्तीय कंपनियां शामिल, निवेश प्रवाह की उम्मीद',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-11T09:20:00+05:30',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'standing-committee-india-growth-global-tension-feb-11-2026',
    slug: 'standing-committee-finance-india-growth-resilient-global-tension-feb-11-2026',
    category: 'economy',
    subCategory: 'policy-outlook',
    title: 'वित्त पर स्थायी समिति: वैश्विक तनाव के बावजूद भारत की वृद्धि लचीली',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-11T09:40:00+05:30',
    image: 'https://images.unsplash.com/photo-1541872709922-946f6c871bee?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'sebi-chief-market-evolution-feb-11-2026',
    slug: 'sebi-chief-india-market-evolution-global-fragmentation-feb-11-2026',
    category: 'markets',
    subCategory: 'regulatory-commentary',
    title: 'SEBI प्रमुख का बयान: वैश्विक वित्तीय विखंडन में भारत का बाजार मॉडल चर्चा में',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-11T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'india-cpi-inflation-data-watch-feb-11-2026',
    slug: 'india-cpi-inflation-data-watch-rbi-policy-outlook-feb-11-2026',
    category: 'economy',
    subCategory: 'inflation',
    title: 'भारत में CPI महंगाई आंकड़ों का इंतजार, RBI नीति दृष्टि पर फोकस',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-11T10:20:00+05:30',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'india-retail-inflation-2-75-january-feb-11-2026',
    slug: 'india-retail-inflation-january-2-75-new-cpi-series-feb-11-2026',
    category: 'economy',
    subCategory: 'inflation',
    title: 'जनवरी में खुदरा महंगाई 2.75%: नई CPI श्रृंखला के बाद प्रमुख संकेत',
    authorId: 'harsh-raj',
    datePublished: '2026-02-11T10:40:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'irctc-q3-profit-dividend-feb-11-2026',
    slug: 'irctc-q3-results-profit-up-dividend-declared-feb-11-2026',
    category: 'markets',
    subCategory: 'earnings',
    title: 'IRCTC Q3 नतीजे: मुनाफा बढ़ा, डिविडेंड का ऐलान',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-11T11:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'market-sentiment-global-headwinds-feb-11-2026',
    slug: 'india-market-sentiment-mixed-signals-global-headwinds-feb-11-2026',
    category: 'markets',
    subCategory: 'market-outlook',
    title: 'बाजार भावना में मिश्रित संकेत, वैश्विक हेडविंड्स का असर जारी',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-11T11:20:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'stock-market-mixed-indices-sectors-feb-11-2026',
    slug: 'stock-market-update-mixed-trends-indices-sectors-feb-11-2026',
    category: 'markets',
    subCategory: 'daily-market-update',
    title: 'स्टॉक मार्केट अपडेट: इंडेक्स और सेक्टर में मिला-जुला रुझान',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-11T11:40:00+05:30',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'groww-platform-market-ipo-mf-highlights-feb-11-2026',
    slug: 'groww-and-platforms-live-market-news-ipo-mutual-funds-feb-11-2026',
    category: 'tech-business',
    subCategory: 'fintech-platforms',
    title: 'Groww समेत प्लेटफॉर्म्स पर लाइव मार्केट, IPO और म्यूचुअल फंड ट्रेंड हाइलाइट',
    authorId: 'harsh-raj',
    datePublished: '2026-02-11T12:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'budget-2026-live-key-tax-spending-measures-feb-11-2026',
    slug: 'budget-2026-live-key-tax-spending-economic-measures-feb-11-2026',
    category: 'economy',
    subCategory: 'budget-live',
    title: 'बजट 2026 लाइव कवरेज: टैक्स, खर्च और आर्थिक उपायों पर फोकस',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-11T12:20:00+05:30',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'global-finance-reuters-context-impact-india-feb-11-2026',
    slug: 'global-finance-reuters-developments-impact-indian-markets-feb-11-2026',
    category: 'economy',
    subCategory: 'global-context',
    title: 'वैश्विक वित्तीय परिप्रेक्ष्य: अंतरराष्ट्रीय घटनाक्रम का भारतीय बाजार पर असर',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-11T12:40:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },

  // 10 Feb 2026: India Finance & Economy – 15 Hindi/English news (SEO, Google News)
  {
    id: 'aviom-india-housing-finance-936-crore-tender-feb-2026',
    slug: 'aviom-india-housing-finance-936-crore-tender-areion-group-wins-feb-2026',
    category: 'economy',
    title: 'भारत के Aviom India Housing Finance का ₹936 करोड़ टेंडर — Areion Group ने जीता बोली',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-10T09:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'union-budget-2026-27-policy-reforms-feb-2026',
    slug: 'union-budget-2026-27-policy-reforms-long-term-investment-priority-feb-2026',
    category: 'economy',
    title: 'केंद्र सरकार का बजट 2026-27: नीतियों में सुधार और दीर्घकालीन निवेश का जोर',
    authorId: 'harsh-raj',
    datePublished: '2026-02-10T09:15:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'finance-minister-tamil-nadu-rebuttal-feb-2026',
    slug: 'finance-minister-rejects-tamil-nadu-discrimination-claim-budget-balanced-feb-2026',
    category: 'economy',
    title: 'वित्त मंत्री ने तमिलनाडु पर उठाए गए ‘अलग व्यवहार’ के आरोपों को खारिज किया',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-10T09:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1541872709922-946f6c871bee?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'indian-stock-market-sensex-nifty-strong-open-feb-2026',
    slug: 'indian-stock-market-sensex-nifty-open-strong-84237-feb-10-2026',
    category: 'markets',
    title: 'भारतीय शेयर बाजार मजबूती के साथ खुले — सेंसेक्स और निफ्टी उछले',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-10T09:45:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'stock-market-third-day-rally-fii-buying-feb-2026',
    slug: 'stock-market-third-day-rally-fii-buying-bse-nifty-green-feb-2026',
    category: 'markets',
    title: 'बाजार में लगातार तीसरे दिन तेजी; विदेशी निवेशक खरीदारी में सक्रिय',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-10T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'stocks-to-watch-titan-bse-kotak-tata-motors-feb-2026',
    slug: 'stocks-to-watch-titan-bse-kotak-tata-motors-q3-results-feb-10-2026',
    category: 'markets',
    title: 'आज के शेयर जो निवेशकों की निगाह में रहेंगे – Titan, BSE, Kotak Mahindra, Tata Motors',
    authorId: 'harsh-raj',
    datePublished: '2026-02-10T10:15:00+05:30',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'sgx-nifty-signals-strong-market-open-feb-2026',
    slug: 'sgx-nifty-signals-strong-market-open-global-cues-positive-feb-2026',
    category: 'markets',
    title: 'SGX Nifty संकेत देते हैं बाजार के लिए मजबूत शुरुआत का संकेत',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-10T10:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'q3-results-21-stocks-high-activity-feb-2026',
    slug: 'q3-results-21-stocks-high-activity-glaxosmithkline-pharma-profit-feb-2026',
    category: 'markets',
    title: 'Q3 नतीजों के कारण आज बाजार में 21 स्टॉक्स की गतिविधि अधिक हो सकती है',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-10T10:45:00+05:30',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'indian-banking-sector-2026-strong-position-feb-2026',
    slug: 'indian-banking-sector-2026-strong-asset-quality-capital-feb-2026',
    category: 'economy',
    title: 'भारतीय बैंकिंग क्षेत्र 2026 में अब तक मजबूत स्थिति में प्रवेश',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-10T11:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'rbi-repo-rate-5-25-percent-unchanged-feb-2026',
    slug: 'rbi-repo-rate-5-25-percent-unchanged-inflation-growth-feb-2026',
    category: 'economy',
    title: 'RBI ने नीतिगत दर को 5.25% पर स्थिर रखा – मुद्रास्फीति और वृद्धि संतुलन',
    authorId: 'harsh-raj',
    datePublished: '2026-02-10T11:15:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'indian-rupee-seven-year-biggest-gain-feb-2026',
    slug: 'indian-rupee-seven-year-biggest-single-day-gain-us-trade-deal-feb-2026',
    category: 'economy',
    title: 'भारतीय रुपये ने सात वर्षों में सबसे बड़ा एक दिन का उछाल दर्ज किया (US व्यापार डील के बाद)',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-10T11:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'up-economic-survey-2026-30-lakh-crore-feb-2026',
    slug: 'up-economic-survey-2026-state-economy-30-lakh-crore-exports-feb-2026',
    category: 'economy',
    title: 'UP आर्थिक सर्वेक्षण 2026: राज्य की अर्थव्यवस्था अब ₹30 लाख करोड़ के पार',
    authorId: 'vikram-kumar',
    datePublished: '2026-02-10T11:45:00+05:30',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: '16th-finance-commission-row-south-states-feb-2026',
    slug: '16th-finance-commission-row-south-states-equitable-share-tamil-nadu-feb-2026',
    category: 'economy',
    title: '16वीं वित्त आयोग पर विवाद: दक्षिण राज्यों ने समान संसाधन आवंटन की मांग की',
    authorId: 'raushan-kumar',
    datePublished: '2026-02-10T12:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1541872709922-946f6c871bee?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'delhi-budget-2026-27-infrastructure-employment-feb-2026',
    slug: 'delhi-budget-2026-27-infrastructure-employment-support-feb-2026',
    category: 'economy',
    title: 'दिल्ली को बजट 2026-27 में बड़ी आर्थिक और बुनियादी ढांचा सहायता मिली',
    authorId: 'harsh-raj',
    datePublished: '2026-02-10T12:15:00+05:30',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'pfc-rec-merger-complete-government-stake-feb-2026',
    slug: 'pfc-rec-merger-complete-government-52-63-percent-stake-power-sector-feb-2026',
    category: 'business-analysis',
    title: 'PFC-REC विलय हुआ पूरा — सरकार की 52.63% हिस्सेदारी के साथ',
    authorId: 'saurabh-kumar',
    datePublished: '2026-02-10T12:30:00+05:30',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop&q=80'
  },

  // DEMO Article: Nifty 50 Record High Nov 2025
  {
    id: 'nifty-50-record-high-fii-inflows-november-2025',
    slug: 'nifty-50-record-high-fii-inflows-november-2025',
    category: 'markets',
    subCategory: 'equity-markets',
    title: 'Nifty 50 Hits Record High as FII Inflows Cross Rs 50,000 Crore in November 2025',
    authorId: 'rajesh-sharma',
    datePublished: '2025-11-02T14:30:00+05:30',
    image: '/images/news/nifty-record-high-2025.jpg'
  },

  // NEW Startups Article: Scalable Business Models 2025
  {
    id: 'startups-scalable-business-models-2025',
    slug: 'scalable-business-models-saas-marketplace-network-effects-india-2025',
    category: 'startups',
    subCategory: 'business-models',
    title: '📈 स्केलेबल बिजनेस मॉडल: SaaS, Marketplace—कैसे 10x Growth करें? (2025 Guide)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-09T04:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80'
  },

  // NEW Startups Article: Tier-3 City Startup Funding 2025
  {
    id: 'startups-tier3-city-funding-2025',
    slug: 'tier-3-city-startup-funding-jaipur-indore-coimbatore-ecosystem-2025',
    category: 'startups',
    subCategory: 'tier-3-ecosystem',
    title: '🌆 फंडिंग में तीसरा स्थान: Jaipur, Indore Startups ने ₹2,000 Cr Raise किया! (2025)',
    authorId: 'vikram-kumar',
    datePublished: '2025-11-09T03:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=630&fit=crop&q=80'
  },

  // NEW Business Article: Top Companies Revenue Trends 2025
  {
    id: 'business-top-companies-revenue-2025',
    slug: 'top-companies-revenue-trends-tcs-reliance-hdfc-tata-adani-2025',
    category: 'business',
    subCategory: 'revenue-analysis',
    title: '📊 प्रमुख कंपनियों की राजस्व: Reliance ₹9L Cr, TCS ₹2.4L Cr—कौन बढ़ा, कौन गिरा? (2025)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-09T02:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80'
  },

  // NEW Markets Article: Banking Regulation Policy Changes 2025
  {
    id: 'markets-banking-regulation-policy-2025',
    slug: 'banking-regulation-rbi-policy-digital-lending-norms-reforms-2025',
    category: 'markets',
    subCategory: 'banking-regulation',
    title: '🏛️ नीति बदलाव और बैंकिंग रेगुलेशन: RBI ने Digital Lending Rules सख्त किए! (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-09T01:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200&h=630&fit=crop&q=80'
  },

  // NEW Tech Article: Global Tech Vendors India Entry 2025
  {
    id: 'tech-global-tech-vendors-india-2025',
    slug: 'global-tech-vendors-india-google-meta-apple-data-centers-investment-2025',
    category: 'tech-business',
    subCategory: 'global-tech',
    title: '🌐 ग्लोबल टेक वेंडर्स का भारत प्रवेश: Google, Meta ने ₹1 Lakh Cr Invest किया! (2025)',
    authorId: 'saurabh-kumar',
    datePublished: '2025-11-09T00:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=630&fit=crop&q=80'
  },

  // NEW Economy Article: Climate Change Economic Impact 2025
  {
    id: 'economy-climate-change-impact-2025',
    slug: 'climate-change-economic-impact-agriculture-gdp-carbon-tax-india-2025',
    category: 'economy',
    subCategory: 'climate-economics',
    title: '🌡️ जलवायु परिवर्तन का आर्थिक असर: ₹35 Lakh Cr Loss! Agriculture, GDP Hit—क्या करें? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-08T23:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=630&fit=crop&q=80'
  },

  // NEW Business Article: High Debt Companies Risk 2025
  {
    id: 'business-high-debt-companies-2025',
    slug: 'high-debt-companies-risk-vodafone-idea-suzlon-debt-equity-ratio-2025',
    category: 'business',
    subCategory: 'debt-analysis',
    title: '⚠️ उच्च कर्ज वाली कंपनियां: Vodafone ₹2L Cr Debt! Debt-to-Equity 5+ = Red Flag? (2025)',
    authorId: 'harsh-raj',
    datePublished: '2025-11-08T22:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=630&fit=crop&q=80'
  },

  // NEW Markets Article: Sectors Investors Exiting 2025
  {
    id: 'markets-sectors-investors-exiting-2025',
    slug: 'sectors-investors-exiting-pharma-fmcg-it-valuation-concerns-2025',
    category: 'markets',
    subCategory: 'sector-rotation',
    title: '📉 निवेशकों ने कौन-से सेक्टर छोड़े? Pharma -20%, FMCG Overvalued—क्या Avoid करें? (2025)',
    authorId: 'raushan-kumar',
    datePublished: '2025-11-08T21:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&q=80'
  },

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
  ,
  {
    id: 'rbi-may-pause-rate-cuts-2026-analysis',
    slug: 'rbi-may-pause-rate-cuts-2026-analysis',
    category: 'economy',
    subCategory: 'monetary-policy',
    title: 'RBI 2026 में Rate Cuts रोक सकता है? Inflation, Growth और Liquidity का पूरा विश्लेषण',
    authorId: 'harsh-raj',
    datePublished: '2026-02-12T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop&q=80'
  }
  ,
  // Lenskart IPO Deep Dive Series - Feb 2025
  {
    id: 'lenskart-ipo-matters',
    slug: 'lenskart-ipo-matters',
    category: 'markets',
    subCategory: 'ipo',
    title: "Why Lenskart's ₹6,000 Crore IPO Could Transform India's Eyewear Industry",
    authorId: 'raushan-kumar',
    datePublished: '2025-02-15T09:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'valuation-breakdown',
    slug: 'valuation-breakdown',
    category: 'markets',
    subCategory: 'ipo',
    title: '₹70,000 करोड़ Valuation का सच! Lenskart की कीमत क्यों है इतनी ऊंची? | Complete Analysis',
    authorId: 'raushan-kumar',
    datePublished: '2025-02-15T10:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'ipo-risks',
    slug: 'ipo-risks',
    category: 'markets',
    subCategory: 'ipo',
    title: 'Lenskart IPO Overpriced? Paytm जैसा Crash होगा? 10 बड़े Risks जो हर Investor को पता होने चाहिए',
    authorId: 'raushan-kumar',
    datePublished: '2025-02-15T11:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'retail-investor-guide',
    slug: 'retail-investor-guide',
    category: 'markets',
    subCategory: 'ipo',
    title: 'Lenskart IPO में Retail Investors कैसे Apply करें? Complete A-Z Guide | Allotment Strategy, Risks, Timeline',
    authorId: 'saurabh-kumar',
    datePublished: '2025-02-15T12:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'omnichannel-footprint',
    slug: 'omnichannel-footprint',
    category: 'markets',
    subCategory: 'retail',
    title: 'Online से 2,000+ Stores तक! Lenskart की Omnichannel Success Story | D2C to Retail Journey',
    authorId: 'harsh-raj',
    datePublished: '2025-02-15T13:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'ipo-proceeds-usage',
    slug: 'ipo-proceeds-usage',
    category: 'markets',
    subCategory: 'ipo',
    title: 'What Lenskart Will Do With IPO Proceeds: Expansion, Tech & Brand Building',
    authorId: 'harsh-raj',
    datePublished: '2025-02-15T14:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'eyewear-market-growth',
    slug: 'eyewear-market-growth',
    category: 'economy',
    subCategory: 'india-economy',
    title: '₹45,000 से ₹1,05,000 करोड़! भारत का आईवियर बाजार 5 सालों में दोगुना होगा | पूरी रिपोर्ट',
    authorId: 'raushan-kumar',
    datePublished: '2025-02-15T15:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'founder-stake-strategy',
    slug: 'founder-stake-strategy',
    category: 'startups',
    subCategory: 'founder-strategy',
    title: "How Lenskart's Founder Increased His Stake from 12% to 19% Before IPO",
    authorId: 'harsh-raj',
    datePublished: '2025-02-15T16:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'market-trends-support',
    slug: 'market-trends-support',
    category: 'economy',
    subCategory: 'market-analysis',
    title: "How the Eyewear Market Trend Supports Lenskart's Growth Story",
    authorId: 'harsh-raj',
    datePublished: '2025-02-15T17:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'purchase-behavior',
    slug: 'purchase-behavior',
    category: 'economy',
    subCategory: 'consumer-behavior',
    title: 'Emerging Eyewear Purchase Behaviour: More Frequent Buys, Style Changes',
    authorId: 'harsh-raj',
    datePublished: '2025-02-15T18:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'major-investors',
    slug: 'major-investors',
    category: 'startups',
    subCategory: 'investment',
    title: "Major Investors Behind Lenskart: Who's Backing the Eyewear Boom?",
    authorId: 'vikram-kumar',
    datePublished: '2025-02-15T19:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=630&fit=crop&q=80'
  },
  {
    id: 'regulatory-nod',
    slug: 'regulatory-nod',
    category: 'economy',
    subCategory: 'regulatory',
    title: 'Lenskart Gets Regulatory Nod for IPO — What This Means for the Indian Eyewear Sector',
    authorId: 'raushan-kumar',
    datePublished: '2025-02-15T20:00:00+05:30',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop&q=80'
  }
];

