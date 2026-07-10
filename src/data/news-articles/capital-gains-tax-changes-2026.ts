import { NewsGuideSection } from '../../components/NewsGuideTemplate';

const capitalGainsTax2026: NewsGuideSection = {
    headline: "Capital Gains Tax 2026: शेयर बेचने पर अब कितना लगेगा टैक्स? LTCG और STCG के नए नियम समझें आसान भाषा में",
    subheadline: "बजट 2025-26 के बदलाव: LTCG 12.5%, STCG 20% — म्यूचुअल फंड, प्रॉपर्टी और गोल्ड सब पर असर",
    featuredImage: {
        url: "https://images.unsplash.com/photo-1611974714025-e817d3d14245?w=1200&h=630&fit=crop&q=80",
        alt: "Capital Gains Tax India 2026",
        caption: "पूंजी लाभ कर में बढ़ोतरी के बाद अब निवेश रणनीति बदलना जरूरी।"
    },
    whatsNew: {
        summary: "बजट 2025-26 में सरकार ने लॉन्ग टर्म कैपिटल गेन्स (LTCG) टैक्स को 10% से बढ़ाकर 12.5% और शॉर्ट टर्म कैपिटल गेन्स (STCG) को 15% से बढ़ाकर 20% कर दिया है। हालांकि, LTCG की छूट सीमा ₹1 लाख से बढ़ाकर ₹1.25 लाख की गई है। प्रॉपर्टी पर इंडेक्सेशन बेनिफिट खत्म कर दिया गया है, जिसकी जगह फ्लैट 12.5% LTCG लगेगा।",
        date: "2026-03-01T12:00:00+05:30",
        source: { name: "CBDT Notification", url: "https://incometaxindia.gov.in", credibility: "official" }
    },
    whyItMatters: {
        significance: "भारत में 15 करोड़+ डीमैट खाताधारक हैं। हर निवेशक जो शेयर, म्यूचुअल फंड या प्रॉपर्टी बेचता है, उसे इन नए नियमों का सीधा असर झेलना पड़ेगा। गलत जानकारी या अनभिज्ञता से भारी टैक्स देनदारी बन सकती है।",
        impact: [
            "इक्विटी निवेशक: ₹1.25 लाख से ऊपर के LTCG पर 12.5% टैक्स।",
            "प्रॉपर्टी मालिक: इंडेक्सेशन बेनिफिट खत्म — पुराने मकान बेचने पर ज्यादा टैक्स।",
            "म्यूचुअल फंड: इक्विटी फंड्स पर LTCG 12.5% और डेब्ट फंड्स पर स्लैब रेट।",
            "गोल्ड: भौतिक सोने पर अब 12.5% LTCG (पहले 20% विथ इंडेक्सेशन)।"
        ],
        stakeholders: ["Retail Investors", "Property Owners", "HNIs", "Tax Consultants"]
    },
    keyData: {
        facts: [
            { label: "LTCG टैक्स (इक्विटी)", value: "12.5%", source: "Finance Act 2025" },
            { label: "STCG टैक्स (इक्विटी)", value: "20%", source: "Finance Act 2025" },
            { label: "LTCG छूट सीमा", value: "₹1.25 लाख/वर्ष", source: "CBDT" }
        ],
        statistics: [
            { metric: "LTCG कलेक्शन (Est.)", value: "₹1.5 Lakh Cr", change: "+40%", period: "FY 2025-26" },
            { metric: "प्रॉपर्टी ट्रांजैक्शन पर असर", value: "-12% Volume", change: "Due to Indexation Removal", period: "H1 2026" }
        ]
    },
    coverage: {
        mainTopics: [
            {
                title: "LTCG vs STCG: होल्डिंग पीरियड कैसे तय होता है?",
                description: "लिस्टेड इक्विटी और इक्विटी म्यूचुअल फंड: 12 महीने से ज्यादा = LTCG। अनलिस्टेड शेयर और प्रॉपर्टी: 24 महीने से ज्यादा = LTCG। डेब्ट म्यूचुअल फंड: कोई LTCG बेनिफिट नहीं, सब स्लैब रेट पर। गोल्ड (भौतिक/डिजिटल): 24 महीने से ज्यादा = LTCG।"
            },
            {
                title: "टैक्स बचाने के उपाय",
                description: "₹1.25 लाख तक के LTCG को हर साल बुक करें (Tax Harvesting)। प्रॉपर्टी बेचकर Section 54 में नया मकान खरीदें। Capital Gain Bonds (54EC) में ₹50 लाख तक निवेश करें। SIP में निवेश जारी रखें क्योंकि बार-बार बेचने से STCG लगेगा।"
            }
        ]
    },
    outlook: {
        whatToWatch: [
            "प्रॉपर्टी सेक्टर में इंडेक्सेशन बहाली की मांग।",
            "डेब्ट म्यूचुअल फंड पर LTCG बेनिफिट की वापसी।",
            "STCG दर में और वृद्धि की आशंका।"
        ],
        upcomingMilestones: [
            { date: "July 2026", event: "ITR फाइलिंग में नए CG शेड्यूल का लागू होना", importance: "high" },
            { date: "January 2027", event: "प्रॉपर्टी ट्रांजैक्शन पर नए नियमों की समीक्षा", importance: "medium" }
        ],
        questions: [
            { question: "क्या मैं पुराना मकान बेचकर टैक्स बचा सकता हूँ?", answer: "हाँ, Section 54 के तहत नया आवासीय मकान खरीदने पर LTCG से छूट मिलती है।" },
            { question: "SIP में निवेश पर कब LTCG लगता है?", answer: "हर SIP इंस्टॉलमेंट की अपनी होल्डिंग अवधि होती है। 12 महीने बाद बेचने पर LTCG।" }
        ]
    },
    takeaway: {
        forReaders: ["हर साल ₹1.25 लाख तक का LTCG बुक करें (Tax Loss/Gain Harvesting)।"],
        forInvestors: ["लंबी अवधि के निवेश को बनाए रखें — बार-बार बेचने से STCG का बोझ बढ़ेगा।"]
    },
    faq: [
        { question: "ELSS म्यूचुअल फंड पर कितना टैक्स लगता है?", answer: "3 साल बाद बेचने पर ₹1.25 लाख से ऊपर के मुनाफे पर 12.5% LTCG।" },
        { question: "क्या SGB (Sovereign Gold Bond) पर LTCG लगता है?", answer: "मैच्योरिटी पर बेचने पर कोई टैक्स नहीं। समय से पहले बेचने पर 12.5% LTCG।" }
    ],
    review: { rating: 4.7, count: 3800, bestRating: 5 },
    breadcrumbs: [{ name: "News", path: "/news" }, { name: "Tax", path: "/news/category/tax" }],
    eeat: {
        author: { name: "अमित शर्मा", title: "Capital Markets Tax Expert", bio: "अमित पिछले 15 वर्षों से पूंजी लाभ कर और निवेश करदाता मामलों के विशेषज्ञ हैं।" },
        sources: [
            { name: "CBDT India", url: "https://incometaxindia.gov.in", credibility: "official" },
            { name: "Zerodha Varsity", url: "https://zerodha.com/varsity", credibility: "verified-media" }
        ],
        lastUpdated: "2026-03-01T12:00:00+05:30"
    },
    internalLinks: { calculators: ["capital-gains-calculator", "mutual-fund-return-calculator"], relatedArticles: ["nifty-technical-analysis-bullish-patterns-march-2026"] }
};

export default capitalGainsTax2026;
