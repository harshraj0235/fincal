/**
 * Insurance, Retirement & Estate Planning - Complete Lesson Registry
 * Category: insurance-retirement
 * Total Lessons: 7 comprehensive lessons
 * Target: Indian audience (Hindi + English)
 * SEO: Optimized for Google ranking
 */

export interface LearnLesson {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  relatedCalculators: string[];
  order: number;
}

export const insuranceRetirementCategory = {
  id: 'insurance-retirement',
  slug: 'insurance-retirement',
  name: 'Insurance, Retirement & Estate Planning',
  nameHindi: 'बीमा, सेवानिवृत्ति और संपत्ति योजना',
  icon: '🛡️',
  description: 'Life insurance, health insurance, NPS, retirement planning, and estate basics for Indians',
  descriptionHindi: 'जीवन बीमा, स्वास्थ्य बीमा, NPS, सेवानिवृत्ति योजना, और भारतीयों के लिए संपत्ति की मूल बातें',
  color: 'from-red-500 to-orange-600',
  totalLessons: 7,
  estimatedHours: 6
};

export const insuranceRetirementLessons: LearnLesson[] = [
  {
    id: 'term-insurance-guide',
    slug: 'term-insurance-complete-guide-1-crore-cover-india',
    title: 'Term Insurance Complete Guide: Get ₹1 Crore Cover for ₹12K/Year',
    titleHindi: 'टर्म इंश्योरेंस गाइड: ₹12K/वर्ष में ₹1 करोड़ कवर प्राप्त करें',
    description: 'Complete term insurance guide: What is term insurance, how much cover needed, best companies, online vs offline, riders, and common mistakes',
    descriptionHindi: 'संपूर्ण टर्म इंश्योरेंस गाइड: टर्म इंश्योरेंस क्या है, कितना कवर चाहिए, सर्वश्रेष्ठ कंपनियां, ऑनलाइन बनाम ऑफलाइन, राइडर्स, और सामान्य गलतियां',
    duration: '50 mins',
    difficulty: 'beginner',
    tags: ['Term Insurance', 'Life Insurance', 'Cover Amount', 'Hindi'],
    relatedCalculators: ['/calculators/term-insurance-calculator', '/calculators/human-life-value-calculator'],
    order: 1
  },
  {
    id: 'health-insurance-guide',
    slug: 'health-insurance-india-5-lakh-cover-family-floater-portability',
    title: 'Health Insurance India: ₹5L Family Floater, Portability, Claims',
    titleHindi: 'स्वास्थ्य बीमा भारत: ₹5L फैमिली फ्लोटर, पोर्टेबिलिटी, क्लेम',
    description: 'Complete health insurance guide: Individual vs family floater, cover amount, waiting periods, claim process, portability, and choosing best policy',
    descriptionHindi: 'संपूर्ण स्वास्थ्य बीमा गाइड: व्यक्तिगत बनाम फैमिली फ्लोटर, कवर राशि, प्रतीक्षा अवधि, क्लेम प्रक्रिया, पोर्टेबिलिटी, और सर्वश्रेष्ठ पॉलिसी चुनना',
    duration: '55 mins',
    difficulty: 'beginner',
    tags: ['Health Insurance', 'Family Floater', 'Medical Insurance', 'Hindi'],
    relatedCalculators: ['/calculators/health-insurance-calculator'],
    order: 2
  },
  {
    id: 'nps-complete-guide',
    slug: 'nps-national-pension-system-tier-1-tier-2-tax-benefits-india',
    title: 'NPS Guide: Tier 1, Tier 2, Tax Benefits, ₹50K Extra Deduction',
    titleHindi: 'NPS गाइड: टियर 1, टियर 2, कर लाभ, ₹50K अतिरिक्त कटौती',
    description: 'Master NPS: How it works, Tier 1 vs Tier 2, asset allocation (E, C, G), tax benefits under 80CCD(1B), withdrawal rules at 60',
    descriptionHindi: 'NPS में महारत: यह कैसे काम करता है, टियर 1 बनाम टियर 2, संपत्ति आवंटन (E, C, G), 80CCD(1B) के तहत कर लाभ, 60 पर निकासी नियम',
    duration: '50 mins',
    difficulty: 'intermediate',
    tags: ['NPS', 'Retirement', 'Tax Saving', '80CCD', 'Hindi'],
    relatedCalculators: ['/calculators/nps-calculator', '/calculators/nps-return-calculator'],
    order: 3
  },
  {
    id: 'retirement-planning',
    slug: 'retirement-planning-india-corpus-calculation-60-years-goal',
    title: 'Retirement Planning: Calculate ₹3 Crore Corpus by Age 60',
    titleHindi: 'सेवानिवृत्ति योजना: 60 वर्ष की आयु तक ₹3 करोड़ कॉर्पस की गणना करें',
    description: 'Complete retirement planning: How much corpus needed, retirement corpus calculator, SIP strategy, withdrawal rate (4% rule), and post-retirement investing',
    descriptionHindi: 'संपूर्ण सेवानिवृत्ति योजना: कितना कॉर्पस चाहिए, सेवानिवृत्ति कॉर्पस कैलकुलेटर, SIP रणनीति, निकासी दर (4% नियम), और सेवानिवृत्ति के बाद निवेश',
    duration: '55 mins',
    difficulty: 'intermediate',
    tags: ['Retirement Planning', 'Corpus Calculation', '4% Rule', 'Hindi'],
    relatedCalculators: ['/calculators/retirement-calculator', '/calculators/pension-calculator'],
    order: 4
  },
  {
    id: 'ppf-complete-guide',
    slug: 'ppf-public-provident-fund-15-year-lock-in-tax-free-returns-india',
    title: 'PPF Guide: 15-Year Lock-In, 7.1% Tax-Free Returns, 80C Benefits',
    titleHindi: 'PPF गाइड: 15 साल लॉक-इन, 7.1% टैक्स-फ्री रिटर्न, 80C लाभ',
    description: 'Master PPF: Interest rate, investment limits (₹1.5L/year), 15-year lock-in, partial withdrawal rules, extension options, tax benefits',
    descriptionHindi: 'PPF में महारत: ब्याज दर, निवेश सीमा (₹1.5L/वर्ष), 15 साल लॉक-इन, आंशिक निकासी नियम, विस्तार विकल्प, कर लाभ',
    duration: '40 mins',
    difficulty: 'beginner',
    tags: ['PPF', 'Tax-Free Returns', '80C', 'Hindi'],
    relatedCalculators: ['/calculators/ppf-calculator'],
    order: 5
  },
  {
    id: 'epf-complete-guide',
    slug: 'epf-employee-provident-fund-withdrawal-interest-rate-pf-balance-india',
    title: 'EPF Guide: How to Check PF Balance, Withdrawal Rules, Interest 8.25%',
    titleHindi: 'EPF गाइड: PF बैलेंस कैसे चेक करें, निकासी नियम, ब्याज 8.25%',
    description: 'Everything about EPF: Monthly contribution (12% employer + employee), interest rate 8.25%, online balance check, withdrawal for house/medical, tax implications',
    descriptionHindi: 'EPF के बारे में सब कुछ: मासिक योगदान (12% नियोक्ता + कर्मचारी), ब्याज दर 8.25%, ऑनलाइन बैलेंस चेक, घर/चिकित्सा के लिए निकासी, कर निहितार्थ',
    duration: '45 mins',
    difficulty: 'beginner',
    tags: ['EPF', 'PF Balance', 'Provident Fund', 'Hindi'],
    relatedCalculators: ['/calculators/epf-calculator'],
    order: 6
  },
  {
    id: 'will-estate-planning',
    slug: 'will-estate-planning-india-succession-nomination-inheritance-tax',
    title: 'Will & Estate Planning: Succession, Nomination, Inheritance (No Tax in India!)',
    titleHindi: 'वसीयत और संपत्ति योजना: उत्तराधिकार, नामांकन, विरासत (भारत में कोई कर नहीं!)',
    description: 'Estate planning basics: Writing will, nomination in bank/demat accounts, succession laws, trusts for HNIs, no inheritance tax in India (unlike US)',
    descriptionHindi: 'संपत्ति योजना की मूल बातें: वसीयत लिखना, बैंक/डीमैट खातों में नामांकन, उत्तराधिकार कानून, HNI के लिए ट्रस्ट, भारत में कोई विरासत कर नहीं (US के विपरीत)',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Estate Planning', 'Will', 'Succession', 'Nomination', 'Hindi'],
    relatedCalculators: [],
    order: 7
  }
];

// SEO keywords for the category
export const insuranceRetirementSEO = {
  metaTitle: 'Insurance, Retirement & Estate Planning Guide for Indians | MoneyCal Learn',
  metaDescription: 'Master life insurance, health insurance, NPS, EPF, PPF, retirement planning in Hindi & English. 7 comprehensive lessons with calculators & Indian examples.',
  keywords: 'term insurance India, health insurance guide, NPS benefits, retirement planning, PPF returns, EPF withdrawal, will estate planning Hindi, बीमा गाइड, सेवानिवृत्ति योजना',
  canonicalUrl: 'https://moneycal.in/learn/insurance-retirement'
};





