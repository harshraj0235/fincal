/**
 * 60+ Tax Articles - Hindi + English, SEO, Basic to Advanced
 * Each article 2000+ words, proper format (headings, paragraphs, lists)
 */

import { BlogPost, ContentBlock } from './types';
import { incomeTaxBasicsExpanded, section80cExpanded, generateExpandedContent } from './tax-articles-expanded';

const COVER = 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
const AUTHOR = 'Harsh Raj';
const AUTH_IMG = 'https://pbs.twimg.com/profile_images/1634415500418588677/uz8L8JKQ_400x400.png';

function cleanQuestionArtifacts(input: string, fallback = ''): string {
  if (!input) return fallback;
  let cleaned = input
    .replace(/\?{2,}/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const qCount = (cleaned.match(/\?/g) || []).length;
  if (qCount > Math.max(3, Math.floor(cleaned.length * 0.08))) {
    cleaned = cleaned.replace(/\?/g, '').replace(/\s{2,}/g, ' ').trim();
  }

  const significant = cleaned.replace(/[?\s|]/g, '');
  if (significant.length < 6) return fallback;
  return cleaned;
}

function createTaxArticle(
  id: number,
  slug: string,
  title: string,
  titleHindi: string,
  metaDesc: string,
  keywords: string[],
  content: ContentBlock[],
  featured: boolean = false
): BlogPost {
  const safeHindiTitle = cleanQuestionArtifacts(titleHindi, '');
  const safeMetaDesc = cleanQuestionArtifacts(
    metaDesc,
    `${title} - practical tax guide for Indian taxpayers with examples and updated rules.`
  );
  const safeKeywords = keywords
    .map((keyword) => cleanQuestionArtifacts(keyword, ''))
    .filter(Boolean);

  return {
    id,
    slug,
    title: safeHindiTitle ? `${title} - ${safeHindiTitle}` : title,
    author: AUTHOR,
    authorImage: AUTH_IMG,
    authorTitle: 'Tax & Finance Expert',
    metaDescription: safeMetaDesc,
    excerpt: safeMetaDesc,
    categories: ['Tax', 'Tax Planning', 'Tax Guide'],
    keywords: safeKeywords.length ? safeKeywords : ['tax planning', 'income tax india', 'tax guide'],
    date: 'February 28, 2026',
    coverImage: COVER,
    featured,
    content: content && content.length ? content : [
      { type: 'heading', content: title },
      { type: 'paragraph', content: safeMetaDesc }
    ]
  };
}

const taxArticlesDataBase: Array<{ id: number; slug: string; title: string; titleHindi: string; metaDesc: string; keywords: string[]; content: ContentBlock[]; featured?: boolean }> = [
  {
    id: 801,
    slug: 'income-tax-basics-india-hindi-2025',
    title: 'Income Tax Basics India 2025',
    titleHindi: 'आयकर बेसिक्स भारत 2025',
    metaDesc: 'भारत में आयकर की बुनियादी जानकारी, टैक्स स्लैब 2025, पुरानी बनाम नई टैक्स व्यवस्था और छूट के नियमों की पूरी गाइड। Income tax basics India 2025.',
    keywords: ['income tax basics india', 'आयकर बेसिक्स', 'tax slabs 2025', 'old vs new regime'],
    content: [], // Use expanded
    featured: true
  },
  {
    id: 802,
    slug: 'section-80c-complete-guide-hindi-2025',
    title: 'Section 80C Complete Guide',
    titleHindi: 'सेक्शन 80C पूरी गाइड',
    metaDesc: 'सेक्शन 80C के तहत ₹1.5 लाख की टैक्स बचत कैसे करें? PPF, ELSS, सुकन्या समृद्धि और FD में निवेश के लाभ जानें।',
    keywords: ['section 80c', '80c deductions', 'tax saving 1.5 lakh', 'PPF ELSS'],
    content: [], // Use expanded
    featured: true
  },
  {
    id: 803,
    slug: 'itr-filing-step-by-step-hindi-2025',
    title: 'ITR Filing Step by Step Hindi',
    titleHindi: 'ITR फाइलिंग स्टेप बाय स्टेप हिंदी',
    metaDesc: 'आयकर रिटर्न (ITR) फाइल करने की पूरी प्रक्रिया हिंदी में। FY 2024-25 (AY 2025-26) के लिए डेडलाइन और जरूरी दस्तावेजों की जानकारी।',
    keywords: ['ITR filing', 'income tax return', 'ITR kab file kare', 'ITR form', 'ITR deadline 2025'],
    content: [
      { type: 'heading', content: 'ITR फाइलिंग स्टेप बाय स्टेप हिंदी' },
      { type: 'paragraph', content: 'ITR फाइल करने के लिए इनकम टैक्स पोर्टल पर लॉगिन करें। AY 2025-26 के लिए डेडलाइन जुलाई से बढ़ाकर सितंबर 15, 2025 कर दी गई है।' },
      { type: 'list', items: ['पंजीकरण और लॉगिन', 'Form 16 की जांच', 'सही ITR फॉर्म चुनें', 'टैक्स लायबिलिटी कैलकुलेट करें', 'ई-वेरिफाई करें'] }
    ]
  },
  {
    id: 804,
    slug: 'tds-kya-hai-claim-refund-hindi',
    title: 'TDS Kya Hai - Claim Refund',
    titleHindi: 'TDS क्या है और रिफंड कैसे क्लेम करें',
    metaDesc: 'TDS (Tax Deducted at Source) की पूरी जानकारी। क्या आपका TDS कटा है? जानें कैसे ITR फाइल करके रिफंड क्लेम करें।',
    keywords: ['TDS kya hai', 'TDS refund', 'Form 16', 'TDS certificate'],
    content: [
      { type: 'heading', content: 'TDS क्या है और रिफंड कैसे क्लेम करें' },
      { type: 'paragraph', content: 'TDS का मतलब है स्रोत पर टैक्स कटौती। यह आपकी सैलरी, ब्याज या कमीशन से काटकर सरकार को जमा किया जाता है।' }
    ]
  },
  {
    id: 805,
    slug: 'capital-gains-tax-ltcg-stcg-hindi',
    title: 'Capital Gains Tax LTCG STCG',
    titleHindi: 'कैपिटल गेन्स टैक्स LTCG STCG',
    metaDesc: 'शेयर और प्रॉपर्टी बेचने पर लगने वाले कैपिटल गेन्स टैक्स (LTCG और STCG) के नए रेट्स और ₹1.25 लाख की छूट की जानकारी।',
    keywords: ['LTCG', 'STCG', 'capital gains tax', 'पूंजीगत लाभ', 'LTCG 1.25 lakh'],
    content: [
      { type: 'heading', content: 'पूंजीगत लाभ टैक्स (Capital Gains Tax)' },
      { type: 'paragraph', content: 'जब आप कोई संपत्ति जैसे शेयर या घर बेचते हैं, तो उस पर होने वाले मुनाफे पर कैपिटल गेन्स टैक्स लगता है। LTCG पर अब ₹1.25 लाख तक की छूट मिलती है।' }
    ]
  },
  {
    id: 806,
    slug: 'advance-tax-payment-dates-hindi',
    title: 'Advance Tax Payment Dates',
    titleHindi: 'एडवांस टैक्स भुगतान की तारीखें',
    metaDesc: 'एडवांस टैक्स कब और किसे भरना चाहिए? 15 जून, 15 सितंबर, 15 दिसंबर और 15 मार्च की महत्वपूर्ण तिथियां जानें।',
    keywords: ['advance tax', 'advance tax dates', 'quarterly tax', 'अग्रिम कर', '234B 234C'],
    content: [
      { type: 'heading', content: 'एडवांस टैक्स भुगतान की तारीखें' },
      { type: 'list', items: ['15 जून - 15% भुगतान', '15 सितंबर - 45% भुगतान', '15 दिसंबर - 75% भुगतान', '15 मार्च - 100% भुगतान'] },
      { type: 'paragraph', content: 'यदि आपकी अनुमानित टैक्स देनदारी ₹10,000 से अधिक है, तो आपको एडवांस टैक्स भरना अनिवार्य है।' }
    ]
  },
  {
    id: 807,
    slug: 'tax-planning-strategies-save-1-lakh',
    title: 'Tax Planning Strategies Save 1 Lakh',
    titleHindi: 'टैक्स प्लानिंग रणनीतियां: 1 लाख बचाएं',
    metaDesc: 'HRA, 80C, 80D और NPS का सही इस्तेमाल करके साल में 1 लाख रुपये तक टैक्स कैसे बचाएं? स्मार्ट टैक्स सेविंग टिप्स।',
    keywords: ['tax planning', 'save tax', 'टैक्स बचाएं', 'tax saving strategies'],
    content: [
      { type: 'heading', content: 'टैक्स प्लानिंग रणनीतियां - 1 लाख बचाएं' },
      { type: 'paragraph', content: 'सही टैक्स प्लानिंग से आप अपनी मेहनत की कमाई का बड़ा हिस्सा बचा सकते हैं। HRA और निवेश के सही तालमेल से यह संभव है।' }
    ]
  },
  {
    id: 808,
    slug: 'gst-basics-india-hindi-2025',
    title: 'GST Basics India Hindi 2025',
    titleHindi: 'GST बेसिक्स भारत 2025',
    metaDesc: 'GST क्या है? GST 2.0 के नए नियम, स्लैब (5%, 18%, 40%) और रजिस्ट्रेशन की पूरी जानकारी हिंदी में।',
    keywords: ['GST basics', 'GST kya hai', 'GST slabs', 'GST registration', 'GST 2.0'],
    content: [
      { type: 'heading', content: 'GST बेसिक्स भारत 2025' },
      { type: 'paragraph', content: 'GST एक अप्रत्यक्ष कर है जिसने भारत की कर व्यवस्था को सरल बनाया है। 2025 के नए सुधारों के बाद अब स्लैब और भी स्पष्ट हो गए हैं।' }
    ]
  },
  {
    id: 809,
    slug: 'elss-vs-ppf-tax-saving-comparison',
    title: 'ELSS vs PPF Tax Saving Comparison',
    titleHindi: 'ELSS vs PPF टैक्स सेविंग तुलना',
    metaDesc: 'टैक्स बचाने के लिए ELSS बेहतर है या PPF? रिटर्न, लॉक-इन पीरियड और रिस्क के आधार पर विस्तृत तुलना।',
    keywords: ['ELSS vs PPF', 'ELSS tax saving', 'PPF tax saving', 'tax saving mutual fund'],
    content: [
      { type: 'heading', content: 'ELSS vs PPF - टैक्स सेविंग तुलना' },
      { type: 'paragraph', content: 'ELSS में 3 साल का लॉक-इन है और शेयर बाजार का रिटर्न, जबकि PPF 15 साल के लिए सुरक्षित सरकारी गारंटी देता है।' }
    ]
  },
  {
    id: 810,
    slug: 'nps-tax-benefits-80ccd-hindi',
    title: 'NPS Tax Benefits 80CCD',
    titleHindi: 'NPS टैक्स बेनिफिट्स 80CCD',
    metaDesc: 'एनपीएस (NPS) में निवेश पर अतिरिक्त ₹50,000 की छूट कैसे लें? 80CCD(1B) के फायदे और रिटायरमेंट प्लानिंग।',
    keywords: ['NPS tax benefit', '80CCD', 'NPS 50k deduction', 'NPS retirement'],
    content: [
      { type: 'heading', content: 'NPS टैक्स बेनिफिट्स - 80CCD' },
      { type: 'paragraph', content: 'NPS में 80C के अलावा ₹50,000 की अतिरिक्त टैक्स छूट मिलती है, जो इसे रिटायरमेंट के लिए बेहतरीन बनाती है।' }
    ],
    featured: true
  }
];

// Extend with more articles to reach 60+
const moreTaxArticles = [
  { slug: 'hra-exemption-calculation-hindi', title: 'HRA Exemption Calculation', titleHindi: 'HRA छूट की गणना', metaDesc: 'किराये के घर में रहने वालों के लिए HRA छूट कैसे कैलकुलेट करें? नियम और शर्तों की पूरी जानकारी।', k: ['HRA exemption', 'HRA calculator', 'house rent allowance'] },
  { slug: 'form-16-explained-hindi', title: 'Form 16 Explained', titleHindi: 'Form 16 क्या है', metaDesc: 'सैलरी पाने वालों के लिए Form 16 की पूरी जानकारी। Part A और Part B का महत्व और ITR में उपयोग।', k: ['Form 16', 'Form 16A', 'TDS certificate'] },
  { slug: 'income-tax-refund-status-hindi', title: 'Income Tax Refund Status', titleHindi: 'आयकर रिफंड स्टेटस', metaDesc: 'अपना इनकम टैक्स रिफंड स्टेटस ऑनलाइन कैसे चेक करें? रिफंड में देरी होने पर क्या करें?', k: ['tax refund', 'refund status', 'CPC refund'] },
  { slug: 'old-vs-new-tax-regime-which-better', title: 'Old vs New Tax Regime Which Better', titleHindi: 'पुरानी बनाम नई टैक्स व्यवस्था: कौन सी बेहतर है', metaDesc: '80C और HRA के साथ पुरानी व्यवस्था या कम दरों वाली नई व्यवस्था? आपके लिए क्या सही है, जानें।', k: ['old regime', 'new regime', 'tax regime comparison'] },
  { slug: 'dividend-tax-rate-india-2025', title: 'Dividend Tax Rate India 2025', titleHindi: 'डिविडेंड पर टैक्स की दर 2025', metaDesc: 'शेयरों से मिलने वाले डिविडेंड पर कितना टैक्स लगता है? टीडीएस के नियम और छूट की जानकारी।', k: ['dividend tax', 'TDS on dividend', 'dividend income tax'] },
  { slug: 'mutual-fund-tax-stcg-ltcg', title: 'Mutual Fund Tax STCG LTCG', titleHindi: 'म्यूचुअल फंड पर टैक्स: STCG और LTCG', metaDesc: 'इक्विटी और डेब्ट म्यूचुअल फंड पर लगने वाले टैक्स के नियम। ₹1.25 लाख की LTCG छूट का लाभ कैसे लें?', k: ['mutual fund tax', 'STCG LTCG', 'fund tax', 'LTCG 1.25 lakh'] },
  { slug: 'property-sale-capital-gains-tax', title: 'Property Sale Capital Gains Tax', titleHindi: 'प्रॉपर्टी बेचने पर कैपिटल गेन्स टैक्स', metaDesc: 'पुराना घर या जमीन बेचने पर कितना टैक्स लगता है? 54EC बॉन्ड्स के जरिए टैक्स बचाने के तरीके।', k: ['property tax', 'capital gains property', '54EC 54F'] },
  { slug: 'section-80d-health-insurance', title: 'Section 80D Health Insurance', titleHindi: 'सेक्शन 80D: हेल्थ इंश्योरेंस छूट', metaDesc: 'मेडिकल इंश्योरेंस प्रीमियम पर ₹1 लाख तक की टैक्स छूट कैसे पाएं? माता-पिता और स्वयं के लिए नियम।', k: ['80D', 'health insurance tax', 'medical insurance deduction'] },
  { slug: 'income-tax-slab-ay-2025-26', title: 'Income Tax Slab AY 2025-26', titleHindi: 'आयकर स्लैब 2025-26', metaDesc: 'वित्तीय वर्ष 2024-25 (AY 2025-26) के लिए नए इनकम टैक्स स्लैब और रेट्स की पूरी जानकारी।', k: ['tax slab 2025', 'AY 2025-26', 'income tax rates'] },
  { slug: 'itr-filing-last-date-hindi', title: 'ITR Filing Last Date', titleHindi: 'ITR फाइल करने की अंतिम तिथि', metaDesc: 'AY 2025-26 के लिए ITR फाइल करने की लास्ट डेट 15 सितंबर 2025 है। लेट फीस से बचने के लिए अभी फाइल करें।', k: ['ITR deadline', 'ITR last date', '15 September 2025 ITR'] },
  { slug: 'pan-card-aadhaar-link-mandatory', title: 'PAN Aadhaar Link Mandatory', titleHindi: 'पैन और आधार लिंक करना अनिवार्य', metaDesc: 'अपना पैन कार्ड आधार से लिंक कैसे करें? लिंक न करने पर होने वाले नुकसान और प्रोसेस।', k: ['PAN Aadhaar link', 'PAN mandatory', 'link PAN'] },
  { slug: 'tds-on-fixed-deposit-interest', title: 'TDS on Fixed Deposit Interest', titleHindi: 'FD ब्याज पर टीडीएस', metaDesc: 'फिक्स्ड डिपॉजिट (FD) के ब्याज पर बैंक कितना टीडीएस काटते हैं? Form 15G/15H भरकर टीडीएस कैसे बचाएं।', k: ['TDS FD', 'FD interest tax', 'Form 15H'] },
  { slug: 'section-80g-donation-tax', title: 'Section 80G Donation Tax', titleHindi: 'सेक्शन 80G: दान पर टैक्स छूट', metaDesc: 'चैरिटी और दान के जरिए टैक्स कैसे बचाएं? 50% और 100% छूट वाली संस्थाओं की सूची।', k: ['80G', 'donation tax', 'charity deduction'] },
  { slug: 'home-loan-interest-tax-benefit-24b', title: 'Home Loan Interest Tax Benefit 24b', titleHindi: 'होम लोन ब्याज पर टैक्स लाभ 24(b)', metaDesc: 'होम लोन के ब्याज भुगतान पर ₹2 लाख तक की छूट कैसे क्लेम करें? किराये के घर और स्वयं के घर के नियम।', k: ['24b', 'home loan tax', 'housing loan interest'] },
  { slug: 'tax-on-crypto-bitcoin-india', title: 'Tax on Crypto Bitcoin India', titleHindi: 'क्रिप्टो और बिटकॉइन पर टैक्स भारत', metaDesc: 'क्रिप्टोकरेंसी से होने वाली कमाई पर 30% फ्लैट टैक्स और 1% टीडीएस के नियम। लॉस सेट-ऑफ की जानकारी।', k: ['crypto tax', 'bitcoin tax india', 'crypto 30%', 'VDA tax'] },
  { slug: 'freelancer-tax-filing-india', title: 'Freelancer Tax Filing India', titleHindi: 'फ्रीलांसर के लिए टैक्स फाइलिंग', metaDesc: 'फ्रीलांसिंग और प्रोफेशनल कमाई पर टैक्स कैसे भरें? Section 44ADA के तहत 50% प्रॉफिट पर टैक्स के लाभ।', k: ['freelancer tax', '44ADA', 'self employed ITR'] },
  { slug: 'salary-structure-tax-optimization', title: 'Salary Structure Tax Optimization', titleHindi: 'सैलरी स्ट्रक्चर और टैक्स बचत', metaDesc: 'अपनी सैलरी को टैक्स बचाने के लिए कैसे स्ट्रक्चर करें? HRA, LTA और अन्य भत्तों का अधिकतम लाभ उठाएं।', k: ['salary structure', 'tax optimization salary', 'salary components'] },
  { slug: 'senior-citizen-tax-benefits', title: 'Senior Citizen Tax Benefits', titleHindi: 'वरिष्ठ नागरिकों के लिए टैक्स लाभ', metaDesc: '60 वर्ष से अधिक आयु वालों के लिए विशेष छूट और ₹50,000 तक ब्याज पर टीडीएस माफी की जानकारी।', k: ['senior citizen tax', 'वरिष्ठ नागरिक', 'old age tax'] },
  { slug: 'tax-on-stock-market-trading', title: 'Tax on Stock Market Trading', titleHindi: 'शेयर बाजार ट्रेडिंग पर टैक्स', metaDesc: 'इंट्राडे, डिलीवरी और ऑप्शंस ट्रेडिंग से होने वाली कमाई पर टैक्स कैसे लगता है? ऑडिट कब जरूरी है?', k: ['stock trading tax', 'intraday tax', 'delivery tax'] },
  { slug: 'itr-1-2-3-4-5-6-7-difference', title: 'ITR 1 2 3 4 5 6 7 Difference', titleHindi: 'ITR 1 से 7 में अंतर', metaDesc: 'इनकम टैक्स रिटर्न के 7 फॉर्म्स में क्या अंतर है? अपनी आय के हिसाब से सही फॉर्म कैसे चुनें।', k: ['ITR form', 'ITR 1 2 3', 'which ITR'] },
  { slug: 'tax-saving-fd-vs-elss', title: 'Tax Saving FD vs ELSS', titleHindi: 'Tax Saving FD बनाम ELSS', metaDesc: '5 साल की FD या 3 साल का ELSS? सुरक्षित भविष्य और अच्छे रिटर्न के लिए क्या चुनें।', k: ['tax saving FD', 'FD vs ELSS', '5 year FD'] },
  { slug: 'section-80tta-interest-deduction', title: 'Section 80TTA Interest Deduction', titleHindi: 'सेक्शन 80TTA: ब्याज पर बचत', metaDesc: 'सेविंग्स अकाउंट के ब्याज पर ₹10,000 तक की छूट कैसे पाएं? वरिष्ठ नागरिकों के लिए 80TTB।', k: ['80TTA', 'savings interest', 'bank interest deduction'] },
  { slug: 'income-tax-calculation-example', title: 'Income Tax Calculation Example', titleHindi: 'आयकर गणना का उदाहरण', metaDesc: 'स्टेप-बाय-स्टेप समझें कि आपकी सैलरी पर टैक्स कैसे कैलकुलेट होता है। उदाहरण के साथ विस्तार से।', k: ['tax calculation', 'आयकर गणना', 'income tax example'] },
  { slug: 'gst-on-rental-income', title: 'GST on Rental Income', titleHindi: 'किराये की आय पर GST', metaDesc: 'कमर्शियल और रेजिडेंशियल प्रॉपर्टी के किराये पर GST कब देना पड़ता है? ₹20 लाख की लिमिट।', k: ['GST rental', 'rent GST', 'house rent GST'] },
  { slug: 'capital-loss-carry-forward', title: 'Capital Loss Carry Forward', titleHindi: 'कैपिटल लॉस कैरी फॉरवर्ड', metaDesc: 'शेयर बाजार में हुए घाटे को अगले 8 सालों तक टैक्स बचाने के लिए कैसे इस्तेमाल करें?', k: ['capital loss', 'loss carry forward', 'STCG loss'] },
  { slug: 'form-26as-annual-tax-statement', title: 'Form 26AS Annual Tax Statement', titleHindi: 'Form 26AS की पूरी जानकारी', metaDesc: 'आपका सालाना टैक्स स्टेटमेंट (26AS) क्या है? टीडीएस और टैक्स क्रेडिट चेक करने का तरीका।', k: ['Form 26AS', '26AS', 'tax credit statement'] },
  { slug: 'nri-tax-rules-india', title: 'NRI Tax Rules India', titleHindi: 'NRI के लिए टैक्स नियम भारत', metaDesc: 'अनिवासी भारतीयों (NRI) के लिए भारत में होने वाली आय पर टैक्स और डीटीएए (DTAA) के लाभ।', k: ['NRI tax', 'NRI income tax', 'NRI TDS'] },
  { slug: 'gift-tax-india-relationship', title: 'Gift Tax India Relationship', titleHindi: 'गिफ्ट टैक्स और रिश्तेदार', metaDesc: 'रिश्तेदारों से मिलने वाले गिफ्ट पर टैक्स क्यों नहीं लगता? ₹50,000 की लिमिट और नियम।', k: ['gift tax', 'gift from relative', 'gift tax free'] },
  { slug: 'agricultural-income-tax-exempt', title: 'Agricultural Income Tax Exempt', titleHindi: 'कृषि आय और टैक्स छूट', metaDesc: 'खेती से होने वाली आय कब टैक्स फ्री होती है? आंशिक एकीकरण (Partial Integration) का नियम।', k: ['agricultural income', 'कृषि आय', 'farm income tax'] },
  { slug: 'section-80e-education-loan', title: 'Section 80E Education Loan', titleHindi: 'सेक्शन 80E: एजुकेशन लोन ब्याज', metaDesc: 'बेटे या बेटी की पढ़ाई के लिए लिए गए लोन के ब्याज पर टैक्स छूट कैसे पाएं। कोई अपर लिमिट नहीं।', k: ['80E', 'education loan', 'education loan deduction'] },
  { slug: 'income-tax-notice-types', title: 'Income Tax Notice Types', titleHindi: 'इनकम टैक्स नोटिस के प्रकार', metaDesc: '143(1), 148 और 131 जैसे नोटिस क्यों आते हैं? इनका जवाब कैसे देना चाहिए।', k: ['tax notice', 'income tax notice', '143(1)'] },
  { slug: 'tax-on-gold-investment', title: 'Tax on Gold Investment', titleHindi: 'सोने में निवेश पर टैक्स', metaDesc: 'फिजिकल गोल्ड, गोल्ड ईटीएफ और सावरेन गोल्ड बॉन्ड (SGB) पर टैक्स के नियमों में अंतर।', k: ['gold tax', 'gold investment tax', 'gold ETF tax'] },
  { slug: 'startup-tax-benefits-80-iac', title: 'Startup Tax Benefits 80-IAC', titleHindi: 'स्टार्टअप के लिए टैक्स लाभ 80-IAC', metaDesc: 'नए स्टार्टअप्स के लिए 3 साल तक 100% टैक्स फ्री इनकम की सुविधा। डीपीआईआईटी की शर्तें।', k: ['startup tax', '80-IAC', 'startup exemption'] },
  { slug: 'partnership-firm-tax-rates', title: 'Partnership Firm Tax Rates', titleHindi: 'पार्टनरशिप फर्म के लिए टैक्स दरें', metaDesc: 'फर्म पर लगने वाला 30% फ्लैट टैक्स और पार्टनर्स को होने वाली आय पर टैक्स की गणना।', k: ['partnership tax', 'firm tax', 'partnership tax rate'] },
  { slug: 'llp-tax-filing-india', title: 'LLP Tax Filing India', titleHindi: 'LLP टैक्स फाइलिंग भारत', metaDesc: 'लिमिटेड लायबिलिटी पार्टनरशिप (LLP) के लिए टैक्स नियम, ऑडिट और सालाना कंप्लायंस।', k: ['LLP tax', 'LLP filing', 'LLP tax return'] },
  { slug: 'dividend-stripping-tax', title: 'Dividend Stripping Tax', titleHindi: 'डिविडेंड स्ट्रिपिंग और टैक्स', metaDesc: 'डिविडेंड के जरिए होने वाले लॉस को टैक्स बचाने के लिए इस्तेमाल करने पर पाबंदी के नियम।', k: ['dividend stripping', 'dividend tax', 'ex-dividend'] },
  { slug: 'wealth-tax-abolished-india', title: 'Wealth Tax Abolished India', titleHindi: 'वेल्थ टैक्स खत्म: नया सरचार्ज क्या है', metaDesc: 'भारत में वेल्थ टैक्स क्यों खत्म किया गया और अमीरों पर नया सरचार्ज कैसे काम करता है।', k: ['wealth tax', 'wealth tax abolished', 'super rich tax'] },
  { slug: 'service-tax-to-gst-transition', title: 'Service Tax to GST Transition', titleHindi: 'सर्विसे टैक्स से GST का सफर', metaDesc: 'भारत में सर्विस टैक्स की जगह GST ने कैसे ली? मुख्य बदलाव और फायदा।', k: ['service tax', 'GST transition', 'service tax GST'] },
  { slug: 'minimum-alternate-tax-mat', title: 'Minimum Alternate Tax MAT', titleHindi: 'MAT क्या है: कॉर्पोरेट के लिए नियम', metaDesc: 'मिनिमम अल्टरनेट टैक्स (MAT) क्या है और यह कंपनियों पर कैसे लागू होता है। 15% का गणित।', k: ['MAT', 'minimum alternate tax', 'MAT credit'] },
  { slug: 'tax-on-rental-income-house', title: 'Tax on Rental Income House', titleHindi: 'घर के किराये की आय पर टैक्स', metaDesc: 'किराये की आय पर 30% स्टैंडर्ड डिडक्शन और रिपेयरिंग के खर्चों पर छूट के नियम।', k: ['rental income tax', 'house rent tax', '30% deduction'] },
  { slug: 'income-from-other-sources', title: 'Income from Other Sources', titleHindi: 'अन्य स्रोतों से आय (Other Sources)', metaDesc: 'ब्याज, लाटरी और गिफ्ट से होने वाली कमाई पर टैक्स कैसे लगता है। हेड ऑफ इनकम।', k: ['other sources', 'income from other sources', 'interest income'] },
  { slug: 'tax-on-winning-lottery', title: 'Tax on Winning Lottery', titleHindi: 'लॉटरी और ईनाम जीतने पर टैक्स', metaDesc: 'लॉटरी, पजल और गेम शो में जीतने वाली राशि पर 31.2% का भारी टैक्स। TDS की जानकारी।', k: ['lottery tax', 'gambling tax', 'lottery tax rate'] },
  { slug: 'perquisites-tax-salary', title: 'Perquisites Tax Salary', titleHindi: 'परिलब्धियां (Perquisites) और टैक्स', metaDesc: 'कंपनी से मिलने वाली कार, घर और नौकर जैसी सुविधाओं पर टैक्स की गणना कैसे होती है।', k: ['perquisites', 'salary perquisites', 'perk tax'] },
  { slug: 'leave-encashment-tax', title: 'Leave Encashment Tax', titleHindi: 'लीव एनकैशमेंट पर टैक्स लाभ', metaDesc: 'बची हुई छुट्टियों के बदले मिलने वाले पैसे पर कितनी टैक्स छूट मिलती है। रिटायरमेंट नियम।', k: ['leave encashment', 'leave encashment tax', 'retirement leave'] },
  { slug: 'gratuity-tax-exemption', title: 'Gratuity Tax Exemption', titleHindi: 'ग्रेच्युटी पर टैक्स छूट', metaDesc: 'रिटायरमेंट के बाद मिलने वाली ग्रेच्युटी राशि पर ₹20 लाख तक की टैक्स माफी की पूरी जानकारी।', k: ['gratuity tax', 'gratuity exemption', 'gratuity limit'] },
  { slug: 'voluntary-retirement-vrs-tax', title: 'VRS Voluntary Retirement Tax', titleHindi: 'VRS और टैक्स के नियम', metaDesc: 'स्वैच्छिक रिटायरमेंट (VRS) के समय मिलने वाले मुआवजे पर ₹5 लाख तक की टैक्स छूट।', k: ['VRS tax', 'VRS exemption', 'voluntary retirement'] },
  { slug: 'esop-tax-rules-india', title: 'ESOP Tax Rules India', titleHindi: 'ESOP टैक्स रूल्स भारत', metaDesc: 'कर्मचारियों को मिलने वाले शेयर्स (ESOP) पर कब और कितना टैक्स लगता है। स्टार्टअप के नियम।', k: ['ESOP tax', 'employee stock option', 'ESOP taxation'] },
  { slug: 'capital-gains-tax-bonds-54ec', title: 'Capital Gains Tax Bonds 54EC', titleHindi: '54EC बॉन्ड्स: टैक्स बचत का तरीका', metaDesc: 'प्रॉपर्टी बेचने पर होने वाले फायदे को 54EC बॉन्ड्स में निवेश करके टैक्स कैसे बचाएं।', k: ['54EC', 'capital gains bonds', '54EC bonds'] },
  { slug: 'reverse-charge-mechanism-gst', title: 'Reverse Charge Mechanism GST', titleHindi: 'GST में रिवर्स चार्ज (RCM)', metaDesc: 'अनरजिस्टर्ड डीलर्स से सामान खरीदने पर टैक्स भरने की जिम्मेदारी किसकी होती है? RCM गाइड।', k: ['RCM GST', 'reverse charge', 'GST reverse charge'] },
  { slug: 'input-tax-credit-gst', title: 'Input Tax Credit GST', titleHindi: 'GST इनपुट टैक्स क्रेडिट (ITC)', metaDesc: 'बिजनेस में चुकाए गए टैक्स को आउटपुट टैक्स से कैसे घटाएं? ITC के लिए जरूरी शर्तें।', k: ['ITC GST', 'input tax credit', 'GST credit'] },
  { slug: 'tax-on-fd-interest-senior', title: 'Tax on FD Interest Senior', titleHindi: 'बुजुर्गों के लिए FD ब्याज पर टैक्स', metaDesc: 'वरिष्ठ नागरिकों के लिए ₹50,000 तक बैंक ब्याज पर टीडीएस माफी और Section 80TTB।', k: ['senior FD', 'FD TDS senior', 'senior citizen FD'] },
];

// Base content for moreTaxArticles - will be expanded to 2000+ words
const extendedContentBase = (a: typeof moreTaxArticles[0]): ContentBlock[] => [
  { type: 'heading', content: `${a.title} (${a.titleHindi})` },
  { type: 'paragraph', content: a.metaDesc },
  { type: 'paragraph', content: 'भारत में आयकर और टैक्स से जुड़े सभी विषयों को विस्तार से समझने के लिए इस लेख को अंत तक पढ़ें। यह MoneyCal Tax Simplifier का हिस्सा है जो आयकर, GST, कैपिटल गेन्स, 80C, और ITR फाइलिंग की पूरी और सटीक जानकारी आप तक सरल भाषा में पहुँचाता है।' }
];

// Resolve content: 801=incomeTaxBasicsExpanded, 802=section80cExpanded, 803+=generateExpandedContent
function getContent(d: typeof taxArticlesDataBase[0]): ContentBlock[] {
  if (d.id === 801) return incomeTaxBasicsExpanded as ContentBlock[];
  if (d.id === 802) return section80cExpanded as ContentBlock[];
  return generateExpandedContent(d.title, d.titleHindi, d.metaDesc, d.content.length ? d.content : [
    { type: 'heading', content: `${d.title} (${d.titleHindi})` },
    { type: 'paragraph', content: d.metaDesc }
  ]) as ContentBlock[];
}

const moreArticles: BlogPost[] = moreTaxArticles.map((a, i) => {
  const base = extendedContentBase(a);
  const content = generateExpandedContent(a.title, a.titleHindi, a.metaDesc, base) as ContentBlock[];
  return createTaxArticle(811 + i, a.slug, a.title, a.titleHindi, a.metaDesc, a.k, content);
});

// Combine all tax articles - with 2000+ word expanded content
export const taxArticles: BlogPost[] = [
  ...taxArticlesDataBase.map((d) => createTaxArticle(d.id, d.slug, d.title, d.titleHindi, d.metaDesc, d.keywords, getContent(d))),
  ...moreArticles
];

// Metadata for Tax Simplifier / Learn display (slug, title, titleHindi)
export const taxArticlesMeta: { slug: string; title: string; titleHindi: string }[] = [
  ...taxArticlesDataBase.map((d) => ({ slug: d.slug, title: d.title, titleHindi: d.titleHindi })),
  ...moreTaxArticles.map((a) => ({ slug: a.slug, title: a.title, titleHindi: a.titleHindi }))
];

