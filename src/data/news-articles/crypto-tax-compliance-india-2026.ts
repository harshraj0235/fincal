import { NewsGuideSection } from '../../components/NewsGuideTemplate';

const cryptoTax2026: NewsGuideSection = {
    headline: "Crypto Tax India 2026: बिटकॉइन बेचने पर कितना लगेगा टैक्स? जानें 30% TDS, लॉस एडजस्टमेंट और ITR में कैसे दिखाएं",
    subheadline: "क्रिप्टो निवेशकों के लिए जरूरी गाइड: VDA टैक्स नियम, TDS कटौती और गैर-अनुपालन पर भारी जुर्माना",
    featuredImage: {
        url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&h=630&fit=crop&q=80",
        alt: "Crypto Tax India 2026",
        caption: "भारत में क्रिप्टो निवेशकों को टैक्स नियमों का पालन करना अनिवार्य है।"
    },
    whatsNew: {
        summary: "2026 में भारत में क्रिप्टोकरेंसी (Virtual Digital Assets - VDA) पर टैक्स नियम पहले की तरह सख्त बने हुए हैं। किसी भी क्रिप्टो एसेट (Bitcoin, Ethereum, NFT) पर मुनाफे पर फ्लैट 30% टैक्स लगता है। 1% TDS (Section 194S) हर ट्रांसफर पर कटता है। सबसे बड़ी बात — एक क्रिप्टो का नुकसान दूसरे क्रिप्टो के मुनाफे से एडजस्ट नहीं किया जा सकता, और न ही किसी अन्य आय मद (जैसे सैलरी) से।",
        date: "2026-03-01T17:00:00+05:30",
        source: { name: "CBDT VDA Guidelines", url: "https://incometaxindia.gov.in", credibility: "official" }
    },
    whyItMatters: {
        significance: "भारत में अनुमानित 5 करोड़+ लोग क्रिप्टो होल्ड करते हैं। कई नए निवेशकों को यह नहीं पता कि सिर्फ 'होल्ड' करने पर तो टैक्स नहीं लगता, लेकिन बेचने, स्वैप करने (ETH → BTC) या NFT ट्रेड करने पर भी 30% टैक्स देना होता है।",
        impact: [
            "30% फ्लैट टैक्स: कोई स्लैब नहीं, ₹100 का मुनाफा हो या ₹1 करोड़ का — 30% कटेगा।",
            "1% TDS: हर ट्रांसफर पर — चाहे मुनाफा हो या नहीं।",
            "लॉस सेट-ऑफ नहीं: BTC में ₹5 लाख का नुकसान ETH के ₹3 लाख के मुनाफे से एडजस्ट नहीं होगा।",
            "ITR में डिक्लेरेशन: सही शेड्यूल (VDA) में डिक्लेयर न करने पर जुर्माना और नोटिस।"
        ],
        stakeholders: ["Crypto Investors", "Crypto Exchanges", "Tax Consultants", "CBDT"]
    },
    keyData: {
        facts: [
            { label: "क्रिप्टो टैक्स रेट", value: "30% (Flat)", source: "Section 115BBH" },
            { label: "TDS दर", value: "1% per Transfer", source: "Section 194S" },
            { label: "अनुमानित क्रिप्टो होल्डर्स", value: "5 Cr+", source: "Industry Estimates" }
        ],
        statistics: [
            { metric: "क्रिप्टो TDS कलेक्शन", value: "₹8,000 Cr+", change: "+60%", period: "FY 2025-26" },
            { metric: "भारतीय क्रिप्टो ट्रेडिंग वॉल्यूम", value: "$50 Bn+", change: "+30%", period: "Annual" }
        ]
    },
    coverage: {
        mainTopics: [
            {
                title: "ITR में क्रिप्टो कैसे दिखाएं?",
                description: "ITR-2 या ITR-3 में 'Schedule VDA' भरें। हर ट्रांजैक्शन की तारीख, खरीद मूल्य, बिक्री मूल्य और मुनाफा/नुकसान दर्ज करें। एक्सचेंज (WazirX, CoinDCX) से 'Tax Report' डाउनलोड करें जो सारी जानकारी तैयार देती है।"
            },
            {
                title: "क्या माइनिंग और स्टेकिंग पर भी टैक्स लगता है?",
                description: "हाँ, माइनिंग से मिली क्रिप्टो 'Income from Other Sources' में दिखानी होगी और स्लैब रेट पर टैक्स लगेगा। स्टेकिंग रिवॉर्ड्स भी टैक्सेबल हैं और इनकी वैल्यू प्राप्ति की तारीख पर तय की जाती है।"
            }
        ]
    },
    outlook: {
        whatToWatch: [
            "सरकार 30% से TDS/टैक्स रेट घटाने पर विचार कर सकती है।",
            "CBDC (Digital Rupee) के साथ क्रिप्टो के सह-अस्तित्व पर नई नीति।",
            "G20 में ग्लोबल क्रिप्टो टैक्स फ्रेमवर्क पर चर्चा।"
        ],
        upcomingMilestones: [
            { date: "July 2026", event: "ITR में VDA शेड्यूल का अपडेटेड फॉर्म", importance: "high" },
            { date: "October 2026", event: "क्रिप्टो रेगुलेशन बिल संसद में पेश होने की संभावना", importance: "medium" }
        ],
        questions: [
            { question: "क्या क्रिप्टो होल्ड करने पर टैक्स लगता है?", answer: "नहीं, केवल बेचने, स्वैप करने या ट्रांसफर करने पर टैक्स लगता है।" },
            { question: "विदेशी एक्सचेंज (Binance) पर ट्रेडिंग करने पर क्या होगा?", answer: "भारतीय टैक्स कानून दुनिया भर की आय पर लागू हैं। विदेशी एक्सचेंज पर ट्रेडिंग भी टैक्सेबल है और ITR में दिखानी होगी।" }
        ]
    },
    takeaway: {
        forReaders: ["हर क्रिप्टो ट्रांजैक्शन का रिकॉर्ड रखें और मार्च से पहले टैक्स प्लान करें।"],
        forInvestors: ["लंबी अवधि के लिए होल्ड करें ताकि बार-बार बेचने पर TDS और टैक्स न कटे।"]
    },
    faq: [
        { question: "क्रिप्टो गिफ्ट करने पर टैक्स लगता है?", answer: "₹50,000 से ऊपर की क्रिप्टो गिफ्ट प्राप्तकर्ता के लिए टैक्सेबल है।" },
        { question: "P2P (Peer-to-Peer) ट्रेडिंग पर TDS कौन काटेगा?", answer: "खरीदार TDS काटने के लिए जिम्मेदार है।" }
    ],
    review: { rating: 4.5, count: 3100, bestRating: 5 },
    breadcrumbs: [{ name: "News", path: "/news" }, { name: "Crypto", path: "/news/category/crypto" }],
    eeat: {
        author: { name: "आकाश जैन", title: "Crypto Tax & Compliance Expert", bio: "आकाश पिछले 6 वर्षों से ब्लॉकचेन और क्रिप्टो टैक्सेशन पर सलाह दे रहे हैं।" },
        sources: [
            { name: "CBDT India", url: "https://incometaxindia.gov.in", credibility: "official" },
            { name: "CoinGabbar Tax Guide", url: "https://coingabbar.com", credibility: "verified-media" }
        ],
        lastUpdated: "2026-03-01T17:00:00+05:30"
    },
    internalLinks: { calculators: ["income-tax-calculator-new-regime", "capital-gains-calculator"], relatedArticles: ["capital-gains-tax-changes-2026"] }
};

export default cryptoTax2026;
