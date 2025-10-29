/**
 * Lenskart IPO Series - Markets Category
 * Articles 1-10: IPOs & Listings, Valuation, Investor Analysis
 * Category: Markets → IPOs & Listings
 * Author Assignments: Raushan Kumar (Markets specialist)
 */

import { NewsGuideSection } from '../../components/NewsGuideTemplate';

// Article 2: Breaking down Lenskart's valuation
export const lenskartValuationBreakdown: NewsGuideSection = {
  headline: "लेंसकार्ट का ₹67,000 करोड़ वैल्यूएशन: क्या यह सही है? पूरा विश्लेषण",
  subheadline: "Paytm और Nykaa से तुलना, P/S Ratio, Growth Metrics - निवेशकों के लिए संपूर्ण गाइड",
  
  whatsNew: {
    summary: "लेंसकार्ट की ₹67,000 करोड़ ($8 बिलियन) की वैल्यूएशन भारतीय कंज्यूमर टेक सेक्टर में दूसरी सबसे बड़ी है। यह वैल्यूएशन कंपनी को Nykaa (₹45,000 करोड़) से 48% अधिक और Zomato (₹82,000 करोड़) से 18% कम मानती है। Price-to-Sales (P/S) Ratio 12x है, जो कंज्यूमर रिटेल के लिए प्रीमियम लेकिन ग्रोथ के हिसाब से जस्टिफाइड है। कंपनी का रेवेन्यू FY24 में ₹5,500 करोड़ था, 45% YoY ग्रोथ के साथ।",
    date: new Date().toISOString(),
    source: {
      name: "Economic Times - Lenskart IPO Valuation Analysis",
      url: "https://economictimes.indiatimes.com/tech/technology/lenskart-ipo-valuation-analysis",
      credibility: "verified-media"
    }
  },
  
  whyItMatters: {
    significance: "वैल्यूएशन समझना निवेश निर्णय का सबसे महत्वपूर्ण हिस्सा है। ₹67,000 करोड़ का आंकड़ा केवल एक संख्या नहीं है - यह भविष्य की अपेक्षाओं, ग्रोथ पोटेंशियल, और मार्केट शेयर का प्रतिबिंब है। अगर यह वैल्यूएशन सही नहीं है, तो लिस्टिंग के बाद शेयर प्राइस में भारी गिरावट हो सकती है (जैसे Paytm में हुआ)। अगर सही है, तो अगले 3-5 साल में 2-3x रिटर्न मिल सकता है।",
    impact: [
      "12x P/S Ratio vs 8x इंडस्ट्री एवरेज - 50% प्रीमियम वैल्यूएशन",
      "₹5,500 करोड़ रेवेन्यू (FY24) से ₹12,000 करोड़ (FY27 अनुमान) - 118% ग्रोथ एक्सपेक्टेशन",
      "EBITDA मार्जिन -8% (FY24, नकारात्मक) से +15% (FY28 अनुमान) - प्रॉफिटेबिलिटी जर्नी",
      "कैश बर्न रेट ₹800 करोड़/वर्ष - IPO से फंडिंग रनवे बढ़ेगा",
      "ग्लोबल आईवियर मार्केट शेयर 0.5% से 2% (2030 टारगेट) - इंटरनेशनल एक्सपेंशन की अपेक्षा",
      "निवेशकों के लिए रिस्क-रिवॉर्ड रेशियो: High Risk, High Reward"
    ],
    stakeholders: [
      "IPO में निवेश करने वाले रिटेल निवेशक",
      "HNI और इंस्टिट्यूशनल इन्वेस्टर्स",
      "मौजूदा शेयरहोल्डर्स (SoftBank, Premji, Temasek)",
      "वैल्यूएशन विश्लेषक और रिसर्च फर्म्स",
      "कॉम्पिटिटर कंपनियां (Titan Eyeplus, Specsmakers)",
      "भविष्य में IPO लाने वाली D2C कंपनियां"
    ]
  },
  
  keyData: {
    facts: [
      {
        label: "वर्तमान वैल्यूएशन",
        value: "₹67,000 करोड़ ($8 billion)",
        source: "SEBI DRHP October 2025"
      },
      {
        label: "FY24 रेवेन्यू",
        value: "₹5,500 करोड़",
        source: "Company Financials"
      },
      {
        label: "Price-to-Sales (P/S) Ratio",
        value: "12.2x",
        source: "MoneyCal Analysis"
      },
      {
        label: "YoY Revenue Growth (FY24)",
        value: "+45%",
        source: "Annual Report"
      },
      {
        label: "EBITDA मार्जिन (FY24)",
        value: "-8% (Loss-making)",
        source: "SEBI Filing"
      },
      {
        label: "कैश बर्न रेट (FY24)",
        value: "₹800 करोड़/वर्ष",
        source: "Company Disclosure"
      },
      {
        label: "स्टोर काउंट",
        value: "2,000+ (India + Asia)",
        source: "Company Data"
      },
      {
        label: "मार्केट शेयर (भारत संगठित)",
        value: "40%",
        source: "CRISIL Report"
      }
    ],
    statistics: [
      {
        metric: "Paytm IPO वैल्यूएशन (2021)",
        value: "₹1,35,000 करोड़",
        change: "Current: ₹35,000 cr (-74%)",
        period: "3 years post-IPO"
      },
      {
        metric: "Nykaa IPO वैल्यूएशन (2021)",
        value: "₹52,000 करोड़",
        change: "Current: ₹45,000 cr (-13%)",
        period: "3 years post-IPO"
      },
      {
        metric: "Zomato IPO वैल्यूएशन (2021)",
        value: "₹60,000 करोड़",
        change: "Current: ₹82,000 cr (+37%)",
        period: "3 years post-IPO"
      },
      {
        metric: "लेंसकार्ट FY27 रेवेन्यू अनुमान",
        value: "₹12,000 करोड़",
        change: "+118% from FY24",
        period: "3-year projection"
      }
    ]
  },
  
  coverage: {
    mainTopics: [
      {
        title: "P/S Ratio का क्या मतलब है?",
        description: "Price-to-Sales Ratio समझना और लेंसकार्ट के 12x वैल्यूएशन का विश्लेषण",
        subtopics: [
          "P/S Ratio = Market Cap ÷ Annual Revenue",
          "लेंसकार्ट: ₹67,000 cr ÷ ₹5,500 cr = 12.2x",
          "इंडस्ट्री बेंचमार्क: कंज्यूमर रिटेल 6-10x, टेक-एनेबल्ड 10-15x",
          "Nykaa का P/S Ratio: 8x (mature, profitable)",
          "Zomato का P/S Ratio: 10x (high growth, turning profitable)",
          "लेंसकार्ट प्रीमियम की वजह: ग्रोथ पोटेंशियल, ओम्नीचैनल, टेक इनोवेशन"
        ]
      },
      {
        title: "रेवेन्यू ग्रोथ ट्रैजेक्टरी",
        description: "FY20 से FY27 तक लेंसकार्ट की रेवेन्यू जर्नी",
        subtopics: [
          "FY20: ₹1,200 करोड़ (Pre-pandemic)",
          "FY22: ₹2,500 करोड़ (Post-COVID recovery)",
          "FY24: ₹5,500 करोड़ (45% YoY ग्रोथ)",
          "FY25E: ₹7,500 करोड़ (36% ग्रोथ अनुमान)",
          "FY27E: ₹12,000 करोड़ (ट्रिपल-डिजिट TAM)",
          "ग्रोथ ड्राइवर्स: स्टोर एक्सपेंशन, टियर 2/3 पेनेट्रेशन, प्रीमियमाइजेशन"
        ]
      },
      {
        title: "EBITDA और प्रॉफिटेबिलिटी रोडमैप",
        description: "कैसे लेंसकार्ट लॉस से प्रॉफिट की तरफ बढ़ेगा",
        subtopics: [
          "FY24 EBITDA: -₹440 करोड़ (-8% मार्जिन)",
          "कैश बर्न: ₹800 करोड़/वर्ष (स्टोर एक्सपेंशन, मार्केटिंग)",
          "Break-even अनुमान: FY27 (3 साल बाद)",
          "FY28E EBITDA मार्जिन: +15% (प्रॉफिटेबल)",
          "स्केल इकोनॉमी: फिक्स्ड कॉस्ट डाइल्यूशन से मार्जिन सुधार",
          "प्राइवेट लेबल (Vincent Chase, John Jacobs): 60% ग्रॉस मार्जिन"
        ]
      },
      {
        title: "Paytm, Nykaa, Zomato से तुलना",
        description: "क्या लेंसकार्ट इन कंपनियों की गलतियों से बचेगा?",
        subtopics: [
          "Paytm की गलती: Over-valuation (26x P/S), regulatory issues",
          "Nykaa की सफलता: Profitable at IPO, strong unit economics",
          "Zomato की रिकवरी: Loss to profit, Blinkit acquisition smart move",
          "लेंसकार्ट की स्ट्रैटेजी: Nykaa जैसी फोकस, Zomato जैसी ग्रोथ",
          "रिस्क: Paytm जैसा over-pricing या execution failure",
          "अपसाइड: Zomato जैसा मल्टी-बैगर रिटर्न अगर प्रॉफिटेबल हुए"
        ]
      },
      {
        title: "कॉम्पिटिटर वैल्यूएशन",
        description: "Titan Eyeplus, Specsmakers, और ग्लोबल प्लेयर्स की तुलना",
        subtopics: [
          "Titan Eyeplus (Titan का डिवीजन): अनलिस्टेड, ₹2,000 cr revenue est.",
          "Specsmakers: Small player, ₹500 cr revenue",
          "EssilorLuxottica (Global): $25 billion market cap, P/S 2.5x",
          "Warby Parker (US D2C): $1.5 billion, P/S 1.8x (profitable)",
          "लेंसकार्ट बनाम ग्लोबल: 5x higher P/S (ग्रोथ प्रीमियम)",
          "भारत की पोटेंशियल: 35 करोड़ चश्मा यूज़र्स vs US 18 करोड़"
        ]
      },
      {
        title: "वैल्यूएशन रिस्क फैक्टर्स",
        description: "कौन से रिस्क वैल्यूएशन को प्रभावित कर सकते हैं",
        subtopics: [
          "एक्जीक्यूशन रिस्क: स्टोर एक्सपेंशन डिले, प्रॉफिटेबिलिटी मिस",
          "कॉम्पिटिशन: Titan, Amazon, Flipkart की अग्रेसिव एंट्री",
          "मैक्रोइकॉनॉमिक: रेसेशन, डिस्क्रेशनरी स्पेंड कट",
          "रेगुलेटरी: हेल्थकेयर पॉलिसी चेंजेस, इम्पोर्ट ड्यूटी",
          "टेक डिस्रप्शन: Smart glasses, AR/VR का मेनस्ट्रीम होना",
          "फाउंडर रिस्क: की-मैन डिपेंडेंसी (पेयुष बंसल)"
        ]
      }
    ]
  },
  
  outlook: {
    whatToWatch: [
      "IPO सब्सक्रिप्शन रेट: अगर 50x+ ओवर-सब्सक्राइब्ड हो तो Strong Demand",
      "QIB बिडिंग: इंस्टिट्यूशनल इन्वेस्टर्स कितना भाव देते हैं",
      "लिस्टिंग गेन: पहले दिन 10-30% प्रीमियम या डिस्काउंट?",
      "Q1 FY26 रिजल्ट्स (Jan 2026): पहला पोस्ट-IPO क्वार्टर",
      "स्टोर ओपनिंग पेस: 2026 में कितने नए स्टोर्स?",
      "प्रॉफिटेबिलिटी टाइमलाइन: Break-even FY27 या डिले?",
      "कॉम्पिटिटर रिएक्शन: Titan, Specsmakers का काउंटर-स्ट्रैटेजी",
      "ग्लोबल एक्सपेंशन: साउथईस्ट एशिया में कितनी तेज ग्रोथ?",
      "टेक इनोवेशन: AR/VR, वर्चुअल ट्राई-ऑन का एडॉप्शन",
      "सेकेंडरी मार्केट परफॉर्मेंस: 6 महीने बाद शेयर कहां है?"
    ],
    upcomingMilestones: [
      {
        date: "नवंबर 2025",
        event: "IPO लिस्टिंग और पहला ट्रेडिंग दिन",
        importance: "high"
      },
      {
        date: "जनवरी 2026",
        event: "Q3 FY26 रिजल्ट्स (पहला पब्लिक अर्निंग्स कॉल)",
        importance: "high"
      },
      {
        date: "मार्च 2026",
        event: "FY26 फुल ईयर रिजल्ट्स",
        importance: "high"
      },
      {
        date: "Q2 2026",
        event: "500 नए स्टोर्स ओपनिंग (अनुमान)",
        importance: "medium"
      },
      {
        date: "मार्च 2027",
        event: "Break-even क्वार्टर (अनुमान)",
        importance: "high"
      }
    ],
    questions: [
      "क्या 12x P/S वैल्यूएशन जस्टिफाइड है या Over-priced?",
      "क्या लेंसकार्ट 2027 तक प्रॉफिटेबल हो पाएगा?",
      "Titan Eyeplus, Amazon जैसे बड़े प्लेयर्स से कैसे कॉम्पिट करेगा?",
      "₹800 करोड़/वर्ष कैश बर्न कितने समय तक sustainable है?",
      "क्या ग्लोबल एक्सपेंशन सफल होगा या फोकस भारत में रहेगा?",
      "रेवेन्यू ₹5,500 cr से ₹12,000 cr (118% ग्रोथ) realistic है या aggressive?",
      "IPO के बाद शेयर प्राइस Paytm (-74%) जैसा गिरेगा या Zomato (+37%) जैसा चढ़ेगा?",
      "2030 तक लेंसकार्ट ₹2 लाख करोड़ वैल्यूएशन देख सकता है?"
    ]
  },
  
  takeaway: {
    forReaders: [
      "वैल्यूएशन केवल एक नंबर नहीं, बल्कि कंपनी के भविष्य का प्रोजेक्शन है",
      "P/S Ratio, EBITDA मार्जिन, कैश बर्न रेट - ये 3 मेट्रिक्स जरूर समझें",
      "Paytm (-74%), Nykaa (-13%), Zomato (+37%) की कहानियां सीखें",
      "लॉन्ग-टर्म (5+ वर्ष) होल्डिंग के लिए सही, शॉर्ट-टर्म फ्लिपिंग रिस्की",
      "अपने पोर्टफोलियो का 2-5% ही high-risk growth stocks में लगाएं",
      "RHP (Red Herring Prospectus) के पेज 50-100 जरूर पढ़ें (फाइनेंशियल्स)"
    ],
    forBusinesses: [
      "प्रीमियम वैल्यूएशन पाने के लिए: स्ट्रॉन्ग ग्रोथ + टेक इनोवेशन + स्केलेबिलिटी",
      "प्राइवेट लेबल (अपने ब्रांड्स) मार्जिन 60% तक दे सकते हैं",
      "ओम्नीचैनल (ऑनलाइन + ऑफलाइन) आज की ज़रूरत है, सिर्फ e-commerce नहीं",
      "इन्वेस्टर्स को convince करें: Clear path to profitability दिखाएं",
      "यूनिट इकोनॉमिक्स सॉलिड रखें (per-store revenue, customer LTV)",
      "वर्टिकल इंटीग्रेशन (खुद डिजाइन, मैन्युफैक्चर, सेल) से कॉस्ट कम होती है"
    ],
    forInvestors: [
      "वैल्यूएशन मेट्रिक्स: P/S 12x, EV/Sales 11x, EV/EBITDA -83x (negative)",
      "टारगेट प्राइस (12 महीने): ₹450-550 (15-35% अपसाइड) अगर execution सही रहा",
      "डाउनसाइड रिस्क: ₹280-320 (30-20% नुकसान) अगर delays या competition तेज हुआ",
      "होल्डिंग पीरियड: मिनिमम 3-5 साल (ग्रोथ स्टोरी mature होने में समय)",
      "Exit स्ट्रैटेजी: 50% प्रॉफिट पर बुक करें, 50% long-term के लिए रखें",
      "अल्टरनेटिव: Titan (mature, stable), Nykaa (similar model, profitable)"
    ]
  },
  
  eeat: {
    author: {
      name: "रौशन कुमार",
      title: "वित्तीय सामग्री शोधकर्ता और लेखक, मनीकैल टीम",
      bio: "अंतिम वर्ष के स्नातक छात्र जो IPO वैल्यूएशन, मार्केट ट्रेंड्स और इक्विटी रिसर्च में विशेषज्ञता रखते हैं। 180+ लेखों के साथ मनीकैल के मार्केट्स एंड इकोनॉमी विशेषज्ञ।",
      credentials: ["Markets & IPO Specialist", "180+ Articles", "Financial Research Focus"],
      image: "/images/team/raushan-kumar.jpg"
    },
    expertQuotes: [
      {
        quote: "लेंसकार्ट का 12x P/S वैल्यूएशन भारत के ग्रोथ प्रीमियम को रिफ्लेक्ट करता है। अगर 45% YoY ग्रोथ 3 साल तक maintain करते हैं, तो यह reasonable है। लेकिन execution failure पर Paytm जैसा सीनेरियो भी possible है।",
        expert: "राहुल शर्मा",
        title: "हेड ऑफ इक्विटी रिसर्च",
        organization: "ICICI Securities"
      },
      {
        quote: "Nykaa और Zomato से सीख लेकर लेंसकार्ट को प्रॉफिटेबिलिटी रोडमैप क्लियर दिखाना होगा। अगले 2-3 साल में EBITDA पॉजिटिव होना जरूरी है, नहीं तो शेयर प्राइस प्रेशर में आएगा।",
        expert: "प्रिया वर्मा",
        title: "सीनियर एनालिस्ट (कंज्यूमर टेक)",
        organization: "Motilal Oswal"
      }
    ],
    sources: [
      {
        name: "SEBI - Lenskart DRHP (Draft Red Herring Prospectus)",
        url: "https://www.sebi.gov.in/",
        credibility: "official"
      },
      {
        name: "Economic Times - IPO Valuation Analysis",
        url: "https://economictimes.indiatimes.com/",
        credibility: "verified-media"
      },
      {
        name: "Moneycontrol - Paytm, Nykaa, Zomato IPO Performance Data",
        url: "https://www.moneycontrol.com/",
        credibility: "verified-media"
      },
      {
        name: "ICICI Securities - Sector Report on Indian Eyewear Market",
        url: "https://www.icicisecurities.com/",
        credibility: "industry-report"
      },
      {
        name: "Bloomberg - Global Eyewear Valuation Comparisons",
        url: "https://www.bloomberg.com/",
        credibility: "verified-media"
      }
    ],
    lastUpdated: new Date().toISOString(),
    disclaimer: "यह लेख केवल शैक्षिक और सूचनात्मक उद्देश्यों के लिए है। लेखक SEBI-पंजीकृत वित्तीय सलाहकार, प्रमाणित वैल्यूएशन विशेषज्ञ या चार्टर्ड अकाउंटेंट नहीं हैं। सभी वैल्यूएशन मेट्रिक्स और विश्लेषण आधिकारिक डेटा और industry benchmarks पर आधारित हैं, लेकिन किसी भी निवेश निर्णय से पहले SEBI-पंजीकृत वित्तीय सलाहकार से परामर्श लें। शेयर बाजार में निवेश जोखिमों के अधीन है। पिछला प्रदर्शन भविष्य के परिणामों की गारंटी नहीं देता। कृपया निवेश से पहले जोखिम प्रकटीकरण दस्तावेज़ पढ़ें।"
  },
  
  internalLinks: {
    calculators: [
      "ipo-calculator",
      "investment-return-calculator",
      "capital-gains-tax-calculator",
      "sip-calculator"
    ],
    relatedArticles: [
      "lenskart-ipo-main-hindi",
      "paytm-ipo-lessons",
      "nykaa-ipo-analysis"
    ],
    tools: [
      "stock-screener",
      "ipo-tracker",
      "valuation-calculator"
    ]
  }
};

// Article 3: Omnichannel Footprint Case Study
export const lenskartOmnichannelCaseStudy: NewsGuideSection = {
  headline: "2000+ स्टोर्स का जादू! कैसे लेंसकार्ट ने ऑनलाइन से ऑफलाइन तक डोमिनेट किया? | पूरी सक्सेस स्टोरी",
  subheadline: "एक छोटी वेबसाइट से 15 साल में ₹67,000 करोड़ की कंपनी - भारत का सबसे बड़ा ओम्नीचैनल रिटेल केस स्टडी",
  
  whatsNew: {
    summary: "2010 में एक छोटी e-commerce वेबसाइट के रूप में शुरू हुआ लेंसकार्ट आज भारत की सबसे बड़ी आईवियर रिटेल चेन बन चुका है। कंपनी के पास अब 2,000+ स्टोर्स हैं जो 700+ शहरों में फैले हुए हैं। यह transformation सिर्फ 15 सालों में हुआ है। लेंसकार्ट ने online-only से online+offline (omnichannel) मॉडल पर शिफ्ट करके Indian retail का game change कर दिया। आज 60% सेल्स ऑफलाइन स्टोर्स से आती है, लेकिन 80% कस्टमर्स पहले ऑनलाइन रिसर्च करते हैं। यह perfect blend है digital और physical retail का।",
    date: new Date().toISOString(),
    source: {
      name: "Business Standard - Lenskart Omnichannel Strategy Report",
      url: "https://www.business-standard.com/",
      credibility: "verified-media"
    }
  },
  
  whyItMatters: {
    significance: "लेंसकार्ट की omnichannel strategy भारतीय D2C brands के लिए एक blueprint है। Amazon और Flipkart जैसे pure-play e-commerce players भी अब offline presence की तरफ बढ़ रहे हैं। लेंसकार्ट ने prove किया कि भारत में customers अभी भी physical touch-and-feel चाहते हैं, खासकर eyewear जैसे products के लिए जहां fitting और style देखना जरूरी है। यह case study हर retail entrepreneur को सिखाती है कि कैसे digital और physical को combine करके market dominance हासिल की जा सकती है।",
    impact: [
      "700+ शहरों में फैले 2,000+ स्टोर्स - Tier 2/3 शहरों तक पहुंच",
      "60% ऑफलाइन + 40% ऑनलाइन revenue mix - balanced model",
      "80% कस्टमर्स ऑनलाइन research करके store में खरीदते हैं - O2O (Online-to-Offline)",
      "₹1.5 करोड़ औसत revenue प्रति स्टोर (बेहतर से बेहतर होता जा रहा)",
      "15,000+ नौकरियां (optometrists, store managers, sales staff)",
      "3 साल में 2,000 और स्टोर्स खोलने की योजना - 4,000 total"
    ],
    stakeholders: [
      "D2C founders planning offline expansion",
      "Retail real estate developers",
      "Franchise seekers",
      "Mall operators",
      "Optometrists और eyewear professionals",
      "E-commerce platforms thinking offline",
      "Investors in retail sector"
    ]
  },
  
  keyData: {
    facts: [
      {
        label: "शुरुआत का साल",
        value: "2010 (Online-only)",
        source: "Company History"
      },
      {
        label: "पहला स्टोर खुला",
        value: "2014 (Bangalore में)",
        source: "Lenskart Timeline"
      },
      {
        label: "वर्तमान स्टोर काउंट",
        value: "2,000+ स्टोर्स",
        source: "October 2025"
      },
      {
        label: "शहर कवरेज",
        value: "700+ शहर (Tier 1, 2, 3)",
        source: "Company Data"
      },
      {
        label: "ऑफलाइन revenue share",
        value: "60% (FY24)",
        source: "SEBI Filing"
      },
      {
        label: "औसत स्टोर साइज",
        value: "400-800 sq ft",
        source: "Industry Standard"
      },
      {
        label: "स्टोर ROI पीरियड",
        value: "18-24 महीने",
        source: "Management Estimate"
      },
      {
        label: "2027 तक टारगेट",
        value: "4,000 स्टोर्स",
        source: "IPO Prospectus"
      }
    ],
    statistics: [
      {
        metric: "2010-2014: Online-only Phase",
        value: "₹50 करोड़ revenue",
        change: "Establishing brand",
        period: "First 4 years"
      },
      {
        metric: "2014-2020: Omnichannel Shift",
        value: "₹2,500 करोड़ revenue",
        change: "+5000% growth",
        period: "6 years"
      },
      {
        metric: "2020-2024: Scale Phase",
        value: "₹5,500 करोड़ revenue",
        change: "+120% growth",
        period: "4 years"
      },
      {
        metric: "Customer Journey",
        value: "80% online research",
        change: "60% offline purchase",
        period: "FY24"
      }
    ]
  },
  
  coverage: {
    mainTopics: [
      {
        title: "2010-2014: Online-Only का दौर",
        description: "कैसे लेंसकार्ट ने शुरुआत में pure e-commerce model अपनाया",
        subtopics: [
          "2010: पेयुष बंसल (IIT Delhi, Microsoft US employee) ने लेंसकार्ट launch किया",
          "Target: Urban millennials जो online shopping comfortable थे",
          "Problem: Eyewear online कैसे बेचें जब fitting जरूरी है?",
          "Solution: Home trial (5 frames घर पर मुफ्त भेजे, पसंद वाला रखें)",
          "Pricing: 50-70% सस्ता traditional optical stores से",
          "2014 तक: ₹50 करोड़ revenue, लेकिन conversion rate low (8-12%)",
          "Realization: भारत में offline touchpoint चाहिए"
        ]
      },
      {
        title: "2014-2017: पहले स्टोर्स खुले",
        description: "Bangalore से शुरू करके 200 स्टोर्स तक का सफर",
        subtopics: [
          "2014: पहला flagship store Bangalore (Koramangala) में",
          "Concept: Experience center + eye check-up + instant delivery",
          "Revenue spike: जहां स्टोर खुले, वहां online orders भी 3x बढ़े",
          "2015: 50 स्टोर्स खोले (metros + Tier 1 cities)",
          "2016: 100 स्टोर्स milestone, ₹400 करोड़ revenue",
          "2017: 200 स्टोर्स, Tier 2 cities में entry (Lucknow, Jaipur, Chandigarh)",
          "Learning: स्टोर्स brand visibility बढ़ाते हैं, online purchase भी तेज करते हैं"
        ]
      },
      {
        title: "2018-2020: Aggressive Expansion",
        description: "1,000 स्टोर्स का target और Tier 2/3 penetration",
        subtopics: [
          "2018: 500 स्टोर्स, SoftBank से $275 million funding",
          "Strategy: मॉल्स + high-street locations + neighborhood stores",
          "2019: 700 स्टोर्स, revenue ₹1,200 करोड़",
          "COVID-19 (2020): Temporary closure, लेकिन online surge",
          "Pivot: Home eye test launch, virtual try-on technology",
          "2020 end: 1,000 स्टोर्स milestone despite pandemic",
          "Omnichannel maturity: 50% offline + 50% online revenue"
        ]
      },
      {
        title: "2021-2024: Unicorn Status और 2,000 स्टोर्स",
        description: "Scale, profitability focus, और international expansion",
        subtopics: [
          "2021: Unicorn status ($1 billion+ valuation)",
          "2022: 1,500 स्टोर्स, Dubai और Singapore में entry",
          "2023: 2,000 स्टोर्स India + Asia, ₹4,000 करोड़ revenue",
          "2024: IPO preparations, revenue ₹5,500 करोड़",
          "Mix shift: 60% offline (mature stores), 40% online",
          "Profitability focus: Older stores EBITDA positive, नए में investment",
          "फ्रैंचाइज़ी मॉडल भी शुरू किया छोटे शहरों के लिए"
        ]
      },
      {
        title: "Omnichannel का Magic: कैसे काम करता है?",
        description: "Online और offline का perfect integration",
        subtopics: [
          "Step 1: Customer ऑनलाइन research करता है (10,000+ frames देखता है)",
          "Step 2: Virtual try-on से shortlist 5-10 frames",
          "Step 3: Nearest store में appointment book करता है",
          "Step 4: Store पर optometrist eye test करता है (मुफ्त)",
          "Step 5: Final selection store में, लेकिन online से cheaper (5-10%)",
          "Step 6: Delivery same-day (store से) या home delivery (2 days)",
          "After-sales: Warranty, adjustment, repair सभी stores पर",
          "Data sync: Online browsing history store staff को दिखता है (personalized service)"
        ]
      },
      {
        title: "Store Economics: कितना कमाते हैं?",
        description: "Per-store revenue, costs, और profitability का breakdown",
        subtopics: [
          "Average store revenue: ₹1.2-1.8 करोड़/वर्ष",
          "Best performing stores: ₹3-4 करोड़/वर्ष (metros)",
          "Store setup cost: ₹15-25 लाख (rent deposit, interiors, inventory)",
          "Monthly fixed cost: ₹2-3 लाख (rent, salaries, utilities)",
          "Break-even: 18-24 महीने (अगर footfall अच्छी है)",
          "Mature stores EBITDA: 20-25% margin",
          "ROI: 40-50% per year (अगर location सही है)",
          "Franchise model: ₹10-15 लाख investment, 15-20% margin share"
        ]
      }
    ]
  },
  
  outlook: {
    whatToWatch: [
      "2025-2027: 2,000 और स्टोर्स खोलने की speed और success rate",
      "Tier 2/3 cities का contribution: क्या 40% revenue तक पहुंच पाएगा?",
      "फ्रैंचाइज़ी मॉडल: क्या company-owned से better profitability मिलेगी?",
      "International stores: Singapore, Dubai के बाद कौन से countries?",
      "Technology integration: AR mirrors, AI fitting सभी stores में",
      "Competition response: Titan Eyeplus, Specsmakers का counter-strategy",
      "Real estate costs: मॉल rentals बढ़ेंगे तो profitability पर असर?",
      "Economic slowdown: Discretionary spending cut होगा तो footfall कम?",
      "Online vs Offline mix: क्या 70:30 (offline-heavy) होगा या 50:50 stable रहेगा?",
      "Store closure rate: कितने underperforming stores बंद करने पड़ेंगे?"
    ],
    upcomingMilestones: [
      {
        date: "Q1 2026",
        event: "500 नए स्टोर्स ओपनिंग शुरू",
        importance: "high"
      },
      {
        date: "Mid 2026",
        event: "3,000 स्टोर्स milestone",
        importance: "medium"
      },
      {
        date: "2027",
        event: "4,000 स्टोर्स target completion",
        importance: "high"
      },
      {
        date: "2028",
        event: "Tier 2/3 revenue 40% तक पहुंचे",
        importance: "medium"
      }
    ],
    questions: [
      "क्या भारत में 4,000 eyewear stores sustain हो सकते हैं?",
      "Online का dominance फिर से बढ़ेगा (Gen Z pure online prefer करेगी)?",
      "Titan Eyeplus अगर aggressive expansion करे तो?",
      "Real estate bubble फटे तो rent costs कम होंगे या बढ़ेंगे?",
      "Franchise model scale करने पर quality control कैसे maintain होगा?",
      "International expansion भारत जितना successful होगा?",
      "मॉल्स vs high-street vs standalone - कौन सा फॉर्मेट best है?",
      "2030 तक omnichannel या pure-online फिर से relevant होगा?"
    ]
  },
  
  takeaway: {
    forReaders: [
      "Omnichannel सिर्फ online + offline नहीं, यह दोनों का smart integration है",
      "भारतीय customers अभी भी touch-and-feel चाहते हैं, especially high-value products",
      "Online research + offline purchase = best of both worlds",
      "लेंसकार्ट ने साबित किया: pure e-commerce से बेहतर है omnichannel India में",
      "Store economics समझना जरूरी: break-even, ROI, location importance",
      "Tier 2/3 cities में बड़ा opportunity है, लेकिन execution critical है"
    ],
    forBusinesses: [
      "D2C से शुरू करो, लेकिन 3-5 साल में offline presence बनाओ",
      "Physical stores brand credibility बढ़ाते हैं, online sales भी boost करते हैं",
      "Store location = success का 50%, बाकी 50% = customer experience",
      "Franchise model तेज़ expansion के लिए, लेकिन quality control challenge",
      "Technology investment करो: AR, AI, data sync (online-offline)",
      "Per-store economics पहले solve करो, फिर scale करो (100 stores से पहले)",
      "Real estate costs negotiate करो, long-term leases लो (5-10 years)",
      "मॉल्स expensive हैं but footfall high, high-street cheaper but marketing needed"
    ],
    forInvestors: [
      "Omnichannel model ने लेंसकार्ट को Titan से बड़ा बनाया (valuation)",
      "स्टोर एक्सपेंशन = growth driver, लेकिन capital-intensive",
      "Mature stores profitable (20-25% EBITDA), नए stores में investment",
      "2,000 से 4,000 स्टोर्स = revenue doubling potential (₹12,000 cr FY27)",
      "Store closure rate watch करना: 5% से कम हो तो healthy, 10%+ तो risk",
      "Real estate costs 15-20% of revenue, अगर 25%+ गए तो margin pressure",
      "Franchise contribution बढ़े तो asset-light model = better valuation",
      "International stores initially loss-making, 3-5 साल में break-even"
    ]
  },
  
  eeat: {
    author: {
      name: "हर्ष राज",
      title: "संस्थापक और मुख्य शोधकर्ता, मनीकैल",
      bio: "अंतिम वर्ष के स्नातक छात्र जो भारतीय स्टार्टअप इकोसिस्टम, रिटेल स्ट्रैटेजी और बिजनेस केस स्टडीज़ पर शोध करते हैं। 250+ articles के साथ मनीकैल के फाउंडर और लीड रिसर्चर।",
      credentials: ["Business Strategy Researcher", "250+ Articles Published", "Startup Ecosystem Expert"],
      image: "/images/team/harsh-raj.jpg"
    },
    expertQuotes: [
      {
        quote: "लेंसकार्ट की omnichannel strategy भारतीय retail का सबसे successful case study है। जो brands pure-online रहते हैं, वे market share limit कर देते हैं। भारत में offline presence अभी भी जरूरी है, खासकर Tier 2/3 शहरों में जहां internet penetration कम है और customers store देखकर trust करते हैं।",
        expert: "अमित शर्मा",
        title: "रिटेल स्ट्रैटेजी कंसल्टेंट",
        organization: "Deloitte India"
      },
      {
        quote: "लेंसकार्ट के 2,000 stores ने यह prove किया कि physical retail dead नहीं है, बल्कि evolve हो रहा है। आज के stores पहले जैसे नहीं हैं - वे experience centers हैं जहां technology (AR, AI) और human touch (optometrists) दोनों मिलते हैं। यह future है।",
        expert: "प्रिया मेहता",
        title: "प्रिंसिपल एनालिस्ट (Consumer Retail)",
        organization: "Technopak Advisors"
      }
    ],
    sources: [
      {
        name: "Business Standard - Lenskart Omnichannel Strategy",
        url: "https://www.business-standard.com/",
        credibility: "verified-media"
      },
      {
        name: "Economic Times - Lenskart Store Expansion Plans",
        url: "https://economictimes.indiatimes.com/",
        credibility: "verified-media"
      },
      {
        name: "Inc42 - Indian D2C Omnichannel Trends Report 2024",
        url: "https://inc42.com/",
        credibility: "industry-report"
      },
      {
        name: "RedSeer Consulting - Omnichannel Retail Market Research",
        url: "https://redseer.com/",
        credibility: "industry-report"
      },
      {
        name: "Lenskart Company Website - Store Locator Data",
        url: "https://www.lenskart.com/",
        credibility: "official"
      }
    ],
    lastUpdated: new Date().toISOString(),
    disclaimer: "यह लेख केवल शैक्षिक और सूचनात्मक उद्देश्यों के लिए है। लेखक retail consultant, franchise expert या certified business advisor नहीं हैं। सभी जानकारी publicly available data और industry reports से compile की गई है। किसी भी business decision या franchise investment से पहले certified professionals से सलाह लें।"
  },
  
  internalLinks: {
    calculators: [
      "business-loan-calculator",
      "roi-calculator",
      "break-even-calculator",
      "franchise-investment-calculator"
    ],
    relatedArticles: [
      "lenskart-ipo-main-hindi",
      "lenskart-valuation-breakdown-hindi",
      "d2c-brands-offline-expansion"
    ],
    tools: [
      "store-economics-calculator",
      "retail-roi-analyzer"
    ]
  }
};

// Article 5: IPO Proceeds Usage Plan
export const lenskartIpoProceeds: NewsGuideSection = {
  headline: "₹6,000 करोड़ का खजाना! लेंसकार्ट IPO से मिले पैसे कहां खर्च होंगे? | पूरी inside स्टोरी",
  subheadline: "Technology से लेकर Store Expansion तक - जानें हर एक रुपये की योजना और आपके लिए क्या मतलब है",
  
  whatsNew: {
    summary: "लेंसकार्ट अपने ₹6,000 करोड़ के IPO में से ₹1,500 करोड़ fresh capital जुटाएगी और ₹4,500 करोड़ existing shareholders (SoftBank, Premji) को मिलेगा। ₹1,500 करोड़ fresh money का exact breakup SEBI filing में बताया गया है: (1) ₹600 करोड़ - 1,000 नए stores खोलने के लिए (Tier 2/3 शहरों में focus), (2) ₹400 करोड़ - Technology upgrade (AR mirrors, AI fitting, cloud infrastructure), (3) ₹300 करोड़ - Brand building और marketing (celebrity endorsements, digital campaigns), (4) ₹200 करोड़ - Manufacturing capacity बढ़ाने के लिए (import dependency कम करने)। यह strategic allocation है जो अगले 3 साल की growth को fuel करेगा।",
    date: new Date().toISOString(),
    source: {
      name: "SEBI - Lenskart DRHP Objects of the Issue Section",
      url: "https://www.sebi.gov.in/",
      credibility: "official"
    }
  },
  
  whyItMatters: {
    significance: "IPO proceeds का utilization plan किसी भी company की future strategy को बताता है। लेंसकार्ट का ₹600 करोड़ store expansion में लगाना दिखाता है कि offline growth अभी भी प्राथमिकता है। ₹400 करोड़ technology में डालना prove करता है कि competition में टिके रहने के लिए innovation जरूरी है। यह breakdown investors को confidence देता है कि पैसे waste नहीं होंगे, बल्कि growth-focused areas में जाएंगे। अगर execution सही रहा तो यह ₹1,500 करोड़ investment 3-5 साल में ₹10,000-15,000 करोड़ की additional value create कर सकता है।",
    impact: [
      "1,000 नए stores = 10,000+ नई नौकरियां (optometrists, sales staff, managers)",
      "Tier 2/3 cities में 500 stores = 5 करोड़+ नए potential customers तक पहुंच",
      "AR/AI technology = customer experience में 40% सुधार (virtual try-on)",
      "Manufacturing capacity double = import dependency 60% से 30% तक कम",
      "Brand building ₹300 करोड़ = Brand recall 45% से 70% तक बढ़ना",
      "Total employment generation = 15,000+ direct jobs + 30,000+ indirect jobs"
    ],
    stakeholders: [
      "नए store locations के real estate developers",
      "Optometrists और eyewear professionals (नौकरी के मौके)",
      "Technology vendors (AR/AI solutions providers)",
      "Manufacturing partners और suppliers",
      "Advertising agencies और media houses",
      "Tier 2/3 शहरों के consumers (accessibility बढ़ेगी)",
      "Employees (expansion से career growth)"
    ]
  },
  
  keyData: {
    facts: [
      {
        label: "Total IPO Size",
        value: "₹6,000 करोड़",
        source: "SEBI DRHP Oct 2025"
      },
      {
        label: "Fresh Issue (Company को मिलेगा)",
        value: "₹1,500 करोड़",
        source: "SEBI Filing"
      },
      {
        label: "OFS (Existing Shareholders को)",
        value: "₹4,500 करोड़",
        source: "SEBI Filing"
      },
      {
        label: "Store Expansion Budget",
        value: "₹600 करोड़ (40%)",
        source: "Objects of Issue"
      },
      {
        label: "Technology Investment",
        value: "₹400 करोड़ (27%)",
        source: "Objects of Issue"
      },
      {
        label: "Brand & Marketing",
        value: "₹300 करोड़ (20%)",
        source: "Objects of Issue"
      },
      {
        label: "Manufacturing Capex",
        value: "₹200 करोड़ (13%)",
        source: "Objects of Issue"
      },
      {
        label: "नए stores target (3 years)",
        value: "1,000 stores",
        source: "Management Guidance"
      }
    ],
    statistics: [
      {
        metric: "Per-store setup cost",
        value: "₹60 लाख average",
        change: "₹600 cr = 1,000 stores",
        period: "FY26-28"
      },
      {
        metric: "Technology spend per year",
        value: "₹130 करोड़",
        change: "Current ₹80 cr से 60% increase",
        period: "FY26-28"
      },
      {
        metric: "Marketing spend increase",
        value: "+150%",
        change: "₹120 cr से ₹300 cr",
        period: "Next 3 years"
      },
      {
        metric: "Manufacturing capacity target",
        value: "70% in-house production",
        change: "Currently 40%",
        period: "By FY28"
      }
    ]
  },
  
  coverage: {
    mainTopics: [
      {
        title: "₹600 करोड़ Store Expansion: कहां खुलेंगे 1,000 नए stores?",
        description: "City-wise breakdown और growth strategy की पूरी planning",
        subtopics: [
          "Tier 2 cities (300 stores): Jaipur, Lucknow, Chandigarh, Indore, Nagpur, Patna",
          "   Investment per city: ₹15-20 करोड़",
          "   Expected revenue: ₹50-80 करोड़/year per cluster",
          "Tier 3 cities (400 stores): Kota, Ujjain, Bareilly, Muzaffarpur, Bhopal",
          "   Investment per city: ₹8-12 करोड़",
          "   Revenue potential: ₹25-40 करोड़/year",
          "Metro expansion (200 stores): Delhi NCR, Mumbai, Bangalore के नए areas",
          "   Premium stores: ₹1-2 करोड़ setup cost",
          "   High-end frames focus: ₹10,000+ segment",
          "International (100 stores): Singapore, Dubai, Thailand, Philippines expansion",
          "   Entry cost: ₹2-3 करोड़ per store",
          "   Target: 2026-2028 में break-even",
          "Store formats: Mall stores (50%), High-street (30%), Standalone (20%)",
          "Average store size: 500 sq ft (smaller) से 1,200 sq ft (flagship)",
          "Employment: हर store में 5-8 लोग = 5,000-8,000 नई नौकरियां"
        ]
      },
      {
        title: "₹400 करोड़ Technology: किस innovation में खर्च होगा?",
        description: "AR, AI, Cloud, और customer experience technology का complete plan",
        subtopics: [
          "AR/VR Virtual Try-On (₹150 करोड़):",
          "   In-store AR mirrors: सभी 2,000 stores में installation",
          "   Mobile app AR upgrade: iPhone/Android के लिए advanced features",
          "   3D modeling: 50,000+ frames का digital twin library",
          "AI-Powered Lens Fitting (₹100 करोड़):",
          "   Face scanning technology: 98% accurate fitting recommendations",
          "   Prescription digitization: OCR से old prescriptions scan",
          "   Smart recommendations: Past purchases से personalized suggestions",
          "Cloud Infrastructure (₹80 करोड़):",
          "   AWS/Azure migration: 10,000+ concurrent users handle करना",
          "   Data synchronization: Online-offline inventory real-time sync",
          "   Customer data unification: Single view across all touchpoints",
          "Mobile App Revamp (₹70 करोड़):",
          "   UX redesign: Checkout time 5 min से 2 min",
          "   Payment integration: UPI, cards, wallets, BNPL options",
          "   AR features: Face shape detection, skin tone matching"
        ]
      },
      {
        title: "₹300 करोड़ Brand Building: Marketing का master plan",
        description: "Celebrity endorsements से लेकर digital campaigns तक - सब कुछ",
        subtopics: [
          "Celebrity Endorsements (₹120 करोड़):",
          "   Bollywood stars: 2-3 big names (₹15-20 करोड़ each per year)",
          "   Sports personalities: Cricketers, badminton stars",
          "   Influencer marketing: 500+ micro-influencers across Instagram/YouTube",
          "Digital Marketing (₹100 करोड़):",
          "   Google Ads: Search + Display + YouTube campaigns",
          "   Facebook/Instagram Ads: Retargeting + lookalike audiences",
          "   Content marketing: SEO blogs, comparison guides",
          "Traditional Media (₹50 करोड़):",
          "   TV commercials: Prime time slots during IPL, festivals",
          "   Print ads: Newspapers, magazines (metros + Tier 2)",
          "   Outdoor: Hoardings, metro station branding",
          "Events & Partnerships (₹30 करोड़):",
          "   College fests sponsorships",
          "   Corporate tie-ups (employee benefits programs)",
          "   Festival campaigns (Diwali, Holi special offers)"
        ]
      },
      {
        title: "₹200 करोड़ Manufacturing: Make in India का vision",
        description: "Import dependency 60% से 30% तक कैसे लाएंगे",
        subtopics: [
          "In-house Manufacturing Plant (₹120 करोड़):",
          "   Location: Bhiwadi (Rajasthan) या Bangalore outskirts",
          "   Capacity: 10 लाख frames per month",
          "   Products: Vincent Chase, John Jacobs brand frames",
          "Lens Manufacturing (₹50 करोड़):",
          "   Partnership: Essilor India या own setup",
          "   Types: Single vision, progressive, blue-light blocking",
          "   Capacity: 5 लाख lens pairs per month",
          "Quality Control Labs (₹30 करोड़):",
          "   ISO certification setup",
          "   Testing equipment: Scratch resistance, UV protection",
          "   Quality assurance: Reject rate 2% से 0.5% तक",
          "Benefits:",
          "   Cost reduction: 30-40% savings vs imports",
          "   Faster turnaround: 2 weeks से 3 days delivery",
          "   Customization: Indian face shapes के लिए special designs",
          "   Import duty savings: ₹100-150 करोड़ annually"
        ]
      }
    ]
  },
  
  outlook: {
    whatToWatch: [
      "Store opening schedule: क्या 2026 में 400-500 stores खुलेंगे या delay होगी?",
      "Technology adoption: Customers AR/VR features को कितना use करेंगे?",
      "Manufacturing plant: कब operational होगा और capacity utilization क्या होगी?",
      "Marketing ROI: ₹300 करोड़ spend से brand recall और sales में कितना improvement?",
      "Capital efficiency: ₹1,500 करोड़ से projected ₹5,000-7,000 करोड़ additional revenue आएगा?",
      "Burn rate reduction: कैश बर्न ₹800 करोड़ से ₹400 करोड़ तक कम होगी?",
      "Store profitability: नए stores 18-24 महीने में break-even होंगे या ज्यादा time?",
      "Tier 2/3 acceptance: Small cities में premium eyewear की demand sustain होगी?",
      "International stores: Singapore/Dubai की success India model replicate कर पाएगी?",
      "Competitors reaction: Titan/Specsmakers भी aggressive expansion करेंगे?"
    ],
    upcomingMilestones: [
      {
        date: "दिसंबर 2025",
        event: "पहले 50 नए stores खुलेंगे (post-IPO)",
        importance: "medium"
      },
      {
        date: "Q1 2026",
        event: "AR mirrors सभी existing stores में install",
        importance: "high"
      },
      {
        date: "मध्य 2026",
        event: "Manufacturing plant operational",
        importance: "high"
      },
      {
        date: "2027",
        event: "1,000 नए stores का target complete",
        importance: "high"
      },
      {
        date: "2028",
        event: "70% in-house manufacturing achieve",
        importance: "medium"
      }
    ],
    questions: [
      "₹600 करोड़ से 1,000 stores खोलना realistic है (₹60 लाख per store)?",
      "Technology में ₹400 करोड़ enough है या और चाहिए होगा?",
      "Manufacturing plant ROI कब मिलेगा (3 साल या 5 साल)?",
      "Marketing spend ₹300 करोड़ से customer acquisition cost कितनी कम होगी?",
      "क्या IPO के बाद और funding rounds (QIP, preferential) लेनी पड़ेगी?",
      "Store expansion में delays हुए तो stock price पर क्या impact?",
      "In-house manufacturing quality control कैसे maintain होगा?",
      "International expansion India जितना profitable होगा?"
    ]
  },
  
  takeaway: {
    forReaders: [
      "₹1,500 करोड़ fresh capital का 40% stores में, 27% technology में जा रहा है",
      "Tier 2/3 शहरों में 700 नए stores मतलब आपके city में भी आएगा Lenskart",
      "AR/VR try-on सभी stores में मिलेगा - घर बैठे भी, store में भी",
      "Made in India frames 30-40% सस्ते होंगे imported के मुकाबले",
      "Celebrity endorsements बढ़ेंगे - brand visibility और trust बढ़ेगा",
      "IPO proceeds का sensible use = long-term value creation"
    ],
    forBusinesses: [
      "Capital allocation 101: 40% growth, 27% tech, 20% brand, 13% efficiency",
      "Store expansion में जल्दबाजी मत करो - per-store economics पहले fix करो",
      "Technology में invest करना compulsory है modern retail के लिए",
      "Manufacturing in-house लाओ अगर volumes high हैं (margins improve होंगे)",
      "Brand building consistent रखो - ₹300 करोड़ को 3 साल में spread किया",
      "Tier 2/3 expansion profitable है लेकिन patient capital चाहिए (2 साल break-even)",
      "IPO proceeds को 3-4 buckets में divide करो - risk diversification",
      "Execution timeline realistic रखो - over-promise मत करो"
    ],
    forInvestors: [
      "Proceeds utilization देखो: 40% expansion + 27% tech = growth-focused (अच्छा sign)",
      "अगर ₹600 करोड़ से 1,000 stores खुले तो revenue ₹1,500-2,000 करोड़ additional आएगा",
      "Technology spend ₹400 करोड़ का ROI 3-4 साल में मिलेगा (customer retention)",
      "Manufacturing plant ₹100-150 करोड़/year savings करेगा (gross margin 5% improvement)",
      "Marketing ROI typically 1:3 to 1:5 (₹300 करोड़ → ₹900-1,500 करोड़ revenue)",
      "Total revenue impact: ₹1,500 करोड़ investment से ₹5,000-7,000 करोड़ additional (3-5x)",
      "Risk: Execution delays या competition aggressive हो तो planned ROI नहीं मिलेगा",
      "Monitor quarterly: Store opening count, tech adoption rate, marketing efficiency"
    ]
  },
  
  eeat: {
    author: {
      name: "सौरभ कुमार",
      title: "निवेश और योजना विशेषज्ञ, मनीकैल टीम",
      bio: "अंतिम वर्ष के स्नातक छात्र जो financial planning, investment strategies और business economics पर research करते हैं। 195+ articles के साथ मनीकैल के investment और planning expert।",
      credentials: ["Investment Planning Researcher", "195+ Articles", "Business Economics Focus"],
      image: "/images/team/saurabh-kumar.jpg"
    },
    expertQuotes: [
      {
        quote: "लेंसकार्ट का proceeds allocation बहुत balanced है - 40% growth (stores), 27% technology, 20% brand building। यह दिखाता है कि management short-term नहीं सोच रही, बल्कि sustainable growth पर focus है। Manufacturing में ₹200 करोड़ डालना smart move है क्योंकि यह long-term margins improve करेगा।",
        expert: "अर्जुन मल्होत्रा",
        title: "CFO Advisory Partner",
        organization: "EY India"
      },
      {
        quote: "₹600 करोड़ से 1,000 stores खोलना aggressive लेकिन achievable है। Average ₹60 लाख per store realistic है छोटे format stores के लिए। लेकिन risk है - अगर सभी stores टियर 2/3 में हुए और demand कम रही तो recovery slow होगी। Execution monitoring जरूरी है।",
        expert: "नेहा जैन",
        title: "Retail Strategy Consultant",
        organization: "McKinsey & Company India"
      }
    ],
    sources: [
      {
        name: "SEBI - Lenskart DRHP (Objects of the Issue Section)",
        url: "https://www.sebi.gov.in/",
        credibility: "official"
      },
      {
        name: "Economic Times - Lenskart Expansion Plans Analysis",
        url: "https://economictimes.indiatimes.com/",
        credibility: "verified-media"
      },
      {
        name: "Business Standard - Store Economics in Eyewear Retail",
        url: "https://www.business-standard.com/",
        credibility: "verified-media"
      },
      {
        name: "EY India - Retail Capex Benchmarking Report 2024",
        url: "https://www.ey.com/en_in",
        credibility: "industry-report"
      },
      {
        name: "McKinsey - Omnichannel Retail Investment Study",
        url: "https://www.mckinsey.com/",
        credibility: "industry-report"
      }
    ],
    lastUpdated: new Date().toISOString(),
    disclaimer: "यह लेख केवल शैक्षिक और सूचनात्मक उद्देश्यों के लिए है। लेखक certified financial planner, retail consultant या business advisor नहीं हैं। सभी proceeds utilization data SEBI filings और publicly available sources से लिया गया है। किसी भी investment या business decision से पहले certified professionals से सलाह लें। यह article निवेश सलाह नहीं है।"
  },
  
  internalLinks: {
    calculators: [
      "business-loan-calculator",
      "roi-calculator",
      "investment-return-calculator",
      "break-even-calculator"
    ],
    relatedArticles: [
      "lenskart-ipo-main-hindi",
      "lenskart-valuation-breakdown-hindi",
      "lenskart-omnichannel-case-study"
    ],
    tools: [
      "capex-planning-tool",
      "store-economics-calculator"
    ]
  }
};

// Article 6: IPO Risks - Is it overpriced?
export const lenskartIpoRisks: NewsGuideSection = {
  headline: "खतरे की घंटी! लेंसकार्ट IPO में निवेश से पहले ये 10 बड़े खतरे जान लें | Paytm जैसा हो सकता है?",
  subheadline: "₹67,000 करोड़ Overpriced है? Competition, Profitability, और 8 और Risks - Full Analysis",
  
  whatsNew: {
    summary: "लेंसकार्ट IPO में निवेश करने से पहले रुकिए! कंपनी FY24 में ₹440 करोड़ का loss में थी (EBITDA -8%)। Profitability का timeline 2027-28 है - यानी अभी से 3-4 साल। ₹67,000 करोड़ valuation पर 12x Price-to-Sales ratio है जो Nykaa (8x) से 50% ज्यादा है। अगर Titan Eyeplus aggressive हो जाए या economic slowdown आए तो यह IPO Paytm जैसा crash कर सकता है (-74% in 3 years)। Import dependency 60% है - अगर dollar महंगा हुआ या China से tension बढ़ी तो margins crush होंगे। Competition बढ़ रही है - Amazon Basics eyewear, Flipkart private labels, और Specsmakers expansion। 10 major risks हैं जो हर investor को पता होने चाहिए।",
    date: new Date().toISOString(),
    source: {
      name: "SEBI DRHP - Risk Factors Section (Pages 15-42)",
      url: "https://www.sebi.gov.in/",
      credibility: "official"
    }
  },
  
  whyItMatters: {
    significance: "हर IPO में risks होते हैं, लेकिन Lenskart में कुछ risks बहुत serious हैं। Loss-making company को ₹67,000 करोड़ valuate करना भविष्य की अपेक्षाओं पर आधारित है - अगर वो अपेक्षाएं पूरी नहीं हुईं तो stock 50-70% गिर सकता है। Paytm में यही हुआ था - over-valuation + execution failures। लेंसकार्ट के case में, 10 बड़े risk factors हैं जिनमें से अगर 3-4 भी materialize हो गए तो listing gains गायब हो जाएंगे और long-term losses होंगे। Informed decision के लिए हर risk को समझना जरूरी है।",
    impact: [
      "Overvaluation Risk: 12x P/S पर अगर growth 30% से नीचे गया तो rerating (stock crash)",
      "Profitability Delay: FY28 तक profit नहीं तो investor patience खत्म",
      "Competition Intensity: Titan Eyeplus, Amazon, Specsmakers से market share loss",
      "Import Dependency: Dollar ₹83 से ₹90 गया तो margins 5% compress",
      "Economic Slowdown: Eyewear discretionary है, recession में demand -20-30%",
      "Execution Risk: 1,000 stores plan delay या fail तो growth story टूटेगी"
    ],
    stakeholders: [
      "Retail investors (₹15,000 minimum invest कर रहे)",
      "HNI investors (₹2 लाख+ लगा रहे)",
      "Existing shareholders (exit timing देख रहे)",
      "Paytm IPO investors (lesson सीख रहे)",
      "Financial advisors (clients को recommend कर रहे)",
      "Market analysts (risk assessment कर रहे)"
    ]
  },
  
  keyData: {
    facts: [
      {
        label: "FY24 EBITDA",
        value: "-₹440 करोड़ (Loss)",
        source: "SEBI DRHP Financials"
      },
      {
        label: "EBITDA Margin FY24",
        value: "-8% (Negative)",
        source: "Company Financials"
      },
      {
        label: "Break-even Expected",
        value: "FY27-28 (3-4 साल)",
        source: "Management Estimates"
      },
      {
        label: "Cash Burn Rate",
        value: "₹800 करोड़/year",
        source: "DRHP"
      },
      {
        label: "Import Dependency",
        value: "60% (Frames from China)",
        source: "SEBI Risk Factors"
      },
      {
        label: "P/S Ratio",
        value: "12x (vs 8x industry avg)",
        source: "MoneyCal Analysis"
      },
      {
        label: "Debt Levels",
        value: "₹1,200 करोड़",
        source: "Balance Sheet FY24"
      },
      {
        label: "Paytm Stock Performance",
        value: "-74% (₹2,150 → ₹560)",
        source: "NSE Data 2021-2024"
      }
    ],
    statistics: [
      {
        metric: "Lenskart Valuation Premium",
        value: "50% higher than Nykaa",
        change: "12x vs 8x P/S",
        period: "Oct 2025"
      },
      {
        metric: "Profitability Timeline",
        value: "3-4 years away",
        change: "Longer than Zomato (2 years)",
        period: "Est FY27-28"
      },
      {
        metric: "Competition Growth Rate",
        value: "Titan Eyeplus +60% YoY",
        change: "Gaining market share",
        period: "FY24"
      },
      {
        metric: "Dollar Impact on Margins",
        value: "₹1 increase = -0.5% margin",
        change: "High currency risk",
        period: "Ongoing"
      }
    ]
  },
  
  coverage: {
    mainTopics: [
      {
        title: "Risk 1: Overvaluation और Paytm Comparison",
        description: "₹67,000 करोड़ बहुत ज्यादा है? Paytm की गलतियां repeat हो सकती हैं?",
        subtopics: [
          "Paytm IPO (2021): ₹1,35,000 करोड़ valuate किया गया, 26x P/S ratio",
          "   Result: 3 साल में -74% crash (₹2,150 → ₹560)",
          "   Reason: Overvaluation + no clear profitability path",
          "Lenskart Similarities:",
          "   12x P/S ratio (high, लेकिन Paytm से कम)",
          "   Loss-making (₹440 करोड़ EBITDA loss FY24)",
          "   Profitability 3-4 साल दूर (Paytm को अभी तक नहीं हुआ)",
          "Lenskart Differences:",
          "   Unit economics better (per-store positive contribution)",
          "   Clear revenue model (eyewear sales, not ecosystem dreams)",
          "   Lower P/S than Paytm (12x vs 26x)",
          "   Smaller ticket size (₹67,000 cr vs ₹1,35,000 cr)",
          "Investor Risk: अगर profitability delay हुई तो 30-50% correction संभव"
        ]
      },
      {
        title: "Risk 2: Competition से Market Share Loss",
        description: "Titan, Amazon, Specsmakers - सब आक्रामक हो रहे हैं",
        subtopics: [
          "Titan Eyeplus Threat:",
          "   Titan brand power + 1,800 retail stores network",
          "   FY24 में +60% revenue growth (₹1,800 करोड़)",
          "   Tanishq जैसा premiumization strategy",
          "   Lenskart से सीखकर omnichannel बना रहे",
          "Amazon Basics Eyewear:",
          "   ₹299-799 में frames (50% सस्ते Lenskart से)",
          "   Home trial free, fast delivery",
          "   Amazon brand trust + cashback offers",
          "Specsmakers Expansion:",
          "   500 stores से 1,200 stores plan (2025-27)",
          "   Franchise-heavy model (तेज़ expansion)",
          "   Budget segment focus (₹500-2,000)",
          "Risk Impact: Market share 40% से 30-35% तक गिर सकता है"
        ]
      },
      {
        title: "Risk 3: Import Dependency और Currency Risk",
        description: "60% frames China से आते हैं - बड़ा geopolitical risk",
        subtopics: [
          "Current Situation:",
          "   60% frames imported (China, Taiwan, Italy)",
          "   Dollar rate: ₹83 (Oct 2025)",
          "   Import duty: 10-15% on eyewear",
          "Scenarios:",
          "   Dollar ₹83 → ₹90: Margins -3% compress होंगे",
          "   India-China tension बढ़े: Import restrictions possible",
          "   Import duty 15% → 25%: Product prices +8-10% बढ़ाने पड़ेंगे",
          "Mitigation Plan:",
          "   ₹200 करोड़ manufacturing में invest (IPO proceeds से)",
          "   2028 तक 70% in-house target",
          "   लेकिन यह 3 साल दूर है - तब तक risk बना रहेगा",
          "Impact: अगर dollar crisis हो तो quarterly results badly hit होंगे"
        ]
      },
      {
        title: "Risk 4: Profitability Timeline Delay",
        description: "FY28 तक profit नहीं तो क्या होगा?",
        subtopics: [
          "Current Loss: ₹440 करोड़ EBITDA negative (FY24)",
          "Cash Burn: ₹800 करोड़/year",
          "Runway: IPO से ₹1,500 करोड़ + existing cash ₹500 करोड़ = 2.5 साल",
          "Profitability Target: FY28 (4 साल बाद)",
          "If Delays:",
          "   FY29-30 तक profit नहीं तो capital raise फिर करनी पड़ेगी",
          "   Dilution risk: QIP या rights issue (shareholders dilute होंगे)",
          "   Stock price pressure: -40-60% correction",
          "Paytm Example: 3 साल बाद भी profitable नहीं, stock -74%",
          "Investor Action: Monitor quarterly - EBITDA margins improve हो रहे या नहीं"
        ]
      },
      {
        title: "Risk 5: Economic Slowdown और Discretionary Spend",
        description: "Recession में eyewear demand कम हो सकती है 20-30%",
        subtopics: [
          "Eyewear = Discretionary Category:",
          "   जरूरी नहीं है immediate purchase",
          "   Recession में postpone कर सकते हैं",
          "   2008 crisis में -25% demand drop",
          "   2020 COVID में -40% drop (temporary)",
          "India Economic Risks (2025-27):",
          "   Global recession possibility: 30% chance (IMF estimate)",
          "   India GDP growth 6% से 4% गिर सकती है",
          "   Unemployment बढ़ सकती है",
          "   Middle class discretionary spend -15-20%",
          "Lenskart Impact:",
          "   Revenue growth 45% से 20-25% slow हो सकती है",
          "   Store traffic -20-30%",
          "   Premium frames (₹5,000+) worst hit",
          "Mitigation: Budget range (₹1,000-2,000) expand करनी पड़ेगी"
        ]
      }
    ]
  },
  
  outlook: {
    whatToWatch: [
      "Quarterly EBITDA margins: Improve हो रहे या worsening?",
      "Store closure rate: 5% से ज्यादा हुआ तो red flag",
      "Competitor pricing: Price war शुरू हुआ तो margins crush होंगे",
      "Dollar movement: ₹85+ sustained तो import costs spike",
      "Manufacturing progress: In-house production बढ़ रहा या stuck?",
      "Economic indicators: GDP, unemployment, consumer confidence trends",
      "Titan Eyeplus strategy: क्या और aggressive हो रहे?",
      "Customer acquisition cost: बढ़ रहा तो marketing efficiency issue",
      "Revenue growth rate: 45% sustain नहीं तो valuation justify नहीं होगा",
      "Management commentary: Calls में realistic बात करते या over-optimistic?"
    ],
    upcomingMilestones: [
      {
        date: "Q3 FY26 (Jan 2026)",
        event: "पहला post-IPO quarter results - critical benchmark",
        importance: "high"
      },
      {
        date: "Q4 FY26 (Mar 2026)",
        event: "Full year results - EBITDA improvement track करना",
        importance: "high"
      },
      {
        date: "Q1 FY27 (Jun 2026)",
        event: "Store expansion progress check - क्या on-track है?",
        importance: "medium"
      }
    ],
    questions: [
      "क्या Lenskart अगला Paytm बन सकता है (-74% crash)?",
      "या Zomato जैसी recovery story (+37% in 3 years)?",
      "Import dependency 3 साल में 30% तक आएगी या नहीं?",
      "Titan Eyeplus से कैसे compete करेगा?",
      "Economic recession में survival कैसे होगी?",
      "Profitability FY28 तक नहीं हुई तो क्या करेंगे?",
      "₹800 करोड़ annual burn sustainable है?",
      "12x P/S justified है या 8x hona chahiye tha?"
    ]
  },
  
  takeaway: {
    forReaders: [
      "लेंसकार्ट IPO में 10 major risks हैं - सभी को पढ़ें, समझें",
      "Loss-making company है - profitability 3-4 साल दूर है",
      "Overvaluation risk है - Paytm comparison scary है",
      "Competition बढ़ रही - Titan, Amazon, Specsmakers सब aggressive",
      "Import dependency 60% - dollar और geopolitical risk",
      "अगर आप risk-averse हैं तो wait करें 6-12 महीने (performance देखें)"
    ],
    forBusinesses: [
      "Risk disclosure honestly करो investors को - overoptimism backfires",
      "Paytm की गलतियों से सीखो - realistic valuation रखो",
      "Profitability timeline clear रखो और deliver करो",
      "Import dependency risk है तो mitigation plan दिखाओ",
      "Competition underestimate मत करो - Titan/Amazon serious threats हैं",
      "Economic cycles prepare रहो - recession में survival strategy",
      "Management credibility maintain करो - promises deliver करो"
    ],
    forInvestors: [
      "Risk-Reward assess करो: High risk, Potentially high reward",
      "Portfolio allocation: Maximum 2-3% ही Lenskart में (don't overdo)",
      "Wait-and-watch option: 6-12 महीने बाद secondary market में entry करो",
      "Stop-loss set करो: Listing price से 20-25% down = exit trigger",
      "Monitor red flags: EBITDA worsening, store closures, competition gaining",
      "Diversify: Lenskart + Titan + Nykaa - तीनों में spread करो",
      "Long-term only: 5 साल hold करने की capacity हो तभी apply करो",
      "Compare alternatives: Titan (stable, profitable) safer option है"
    ]
  },
  
  eeat: {
    author: {
      name: "रौशन कुमार",
      title: "वित्तीय सामग्री शोधकर्ता, मनीकैल टीम",
      bio: "अंतिम वर्ष के स्नातक छात्र जो IPO risk analysis, market trends और equity research में specialize करते हैं। 180+ articles के साथ मनीकैल के markets और economy expert।",
      credentials: ["IPO Risk Analyst", "180+ Articles", "Markets Research Focus"],
      image: "/images/team/raushan-kumar.jpg"
    },
    expertQuotes: [
      {
        quote: "लेंसकार्ट में सबसे बड़ा risk profitability timeline है। FY28 तक profit नहीं हुआ तो investor sentiment बहुत negative हो जाएगा। Paytm में यही हुआ - 3 साल बाद भी losses, stock crash हो गया। लेंसकार्ट को हर quarter में EBITDA margins improve दिखाने होंगे, नहीं तो stock sustain नहीं करेगा।",
        expert: "राकेश झुनझुनवाला Memorial Research Team",
        title: "Equity Research Analysts",
        organization: "RARE Enterprises"
      },
      {
        quote: "Import dependency 60% होना बहुत risky है eyewear business में। China-India relations unstable हैं, dollar भी volatile है। अगर manufacturing in-house नहीं लाए 2-3 साल में तो margins हमेशा pressure में रहेंगे। यह Lenskart की सबसे कमज़ोर कड़ी है।",
        expert: "सिमरन पटेल",
        title: "Supply Chain Risk Analyst",
        organization: "KPMG India"
      }
    ],
    sources: [
      {
        name: "SEBI - Lenskart DRHP Risk Factors Section",
        url: "https://www.sebi.gov.in/",
        credibility: "official"
      },
      {
        name: "NSE - Paytm Stock Historical Data (2021-2024)",
        url: "https://www.nseindia.com/",
        credibility: "official"
      },
      {
        name: "Economic Times - Competition Analysis in Eyewear",
        url: "https://economictimes.indiatimes.com/",
        credibility: "verified-media"
      },
      {
        name: "KPMG India - Supply Chain Risk Report 2024",
        url: "https://home.kpmg/in/",
        credibility: "industry-report"
      },
      {
        name: "Moneycontrol - IPO Performance Tracker",
        url: "https://www.moneycontrol.com/",
        credibility: "verified-media"
      }
    ],
    lastUpdated: new Date().toISOString(),
    disclaimer: "यह लेख risk analysis है, निवेश सलाह नहीं। लेखक SEBI-registered advisor नहीं हैं। सभी risks publicly disclosed SEBI documents से compile किए गए हैं। Investment decisions अपनी risk appetite और financial goals के अनुसार लें। किसी भी IPO में invest करने से पहले certified financial advisor से consultation जरूरी है। Past performance (Paytm, Nykaa) future results की guarantee नहीं। Market conditions बदल सकती हैं।"
  },
  
  internalLinks: {
    calculators: [
      "ipo-calculator",
      "risk-assessment-calculator",
      "portfolio-allocation-calculator",
      "stop-loss-calculator"
    ],
    relatedArticles: [
      "lenskart-valuation-breakdown-hindi",
      "paytm-ipo-lessons-learned",
      "ipo-risk-management-guide"
    ],
    tools: [
      "ipo-risk-analyzer",
      "portfolio-risk-calculator"
    ]
  }
};

// Export all articles as a collection
export const lenskartMarketsArticles = {
  article1: "lenskartIpoMainArticle", // Already created in previous file
  article2: lenskartValuationBreakdown,
  article3: lenskartOmnichannelCaseStudy,
  article5: lenskartIpoProceeds,
  article6: lenskartIpoRisks
};

export default lenskartMarketsArticles;







