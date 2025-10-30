/**
 * Savings & Bank Products - Complete Lesson Registry
 * Category: savings-bank-products
 * Total Lessons: 8 comprehensive lessons
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

export const savingsBankCategory = {
  id: 'savings-bank-products',
  slug: 'savings-bank-products',
  name: 'Savings & Bank Products',
  nameHindi: 'बचत और बैंक उत्पाद',
  icon: '🏦',
  description: 'Master FDs, RDs, savings accounts, and maximizing bank returns in India',
  descriptionHindi: 'एफडी, आरडी, बचत खातों में महारत हासिल करें और भारत में बैंक रिटर्न को अधिकतम करें',
  color: 'from-blue-500 to-cyan-600',
  totalLessons: 8,
  estimatedHours: 5
};

export const savingsBankLessons: LearnLesson[] = [
  {
    id: 'types-of-savings-accounts',
    slug: 'types-of-savings-accounts-zero-balance-salary-india',
    title: 'Types of Savings Accounts in India (Zero Balance, Salary, Premium)',
    titleHindi: 'भारत में बचत खातों के प्रकार (ज़ीरो बैलेंस, सैलरी, प्रीमियम)',
    description: 'Understand different savings accounts: zero balance, regular, salary, premium. Compare features, charges, and choose the best for your needs',
    descriptionHindi: 'विभिन्न बचत खातों को समझें: ज़ीरो बैलेंस, नियमित, सैलरी, प्रीमियम। सुविधाओं, शुल्कों की तुलना करें और अपनी ज़रूरतों के लिए सर्वश्रेष्ठ चुनें',
    duration: '40 mins',
    difficulty: 'beginner',
    tags: ['Savings Account', 'Zero Balance', 'Salary Account', 'Banking', 'Hindi'],
    relatedCalculators: ['/calculators/savings-account-calculator', '/calculators/interest-calculator'],
    order: 1
  },
  {
    id: 'fixed-deposits-guide',
    slug: 'fixed-deposits-fd-interest-rates-tax-ladder-strategy-india',
    title: 'Fixed Deposits (FD): Interest Rates, Tax, Laddering Strategy',
    titleHindi: 'फिक्स्ड डिपॉजिट (एफडी): ब्याज दरें, कर, सीढ़ी रणनीति',
    description: 'Complete FD guide for Indians: How FDs work, current interest rates, tax implications, FD laddering, and when to choose FD over other options',
    descriptionHindi: 'भारतीयों के लिए संपूर्ण एफडी गाइड: एफडी कैसे काम करता है, वर्तमान ब्याज दरें, कर निहितार्थ, एफडी लैडरिंग, और कब एफडी को अन्य विकल्पों पर चुनें',
    duration: '50 mins',
    difficulty: 'beginner',
    tags: ['Fixed Deposit', 'FD', 'Interest Rates', 'Tax', 'Laddering', 'Hindi'],
    relatedCalculators: ['/calculators/fd-calculator', '/calculators/compound-interest-calculator'],
    order: 2
  },
  {
    id: 'recurring-deposits',
    slug: 'recurring-deposits-rd-vs-sip-monthly-savings-india',
    title: 'Recurring Deposits (RD) vs SIP: Which is Better for Monthly Savings?',
    titleHindi: 'रेकरिंग डिपॉजिट (आरडी) बनाम एसआईपी: मासिक बचत के लिए कौन बेहतर?',
    description: 'Compare RD vs SIP for monthly savings. Interest rates, returns, taxation, liquidity. Learn which is best for your financial goals',
    descriptionHindi: 'मासिक बचत के लिए आरडी बनाम एसआईपी की तुलना करें। ब्याज दरें, रिटर्न, कराधान, तरलता। जानें कि आपके वित्तीय लक्ष्यों के लिए कौन सा सबसे अच्छा है',
    duration: '45 mins',
    difficulty: 'beginner',
    tags: ['Recurring Deposit', 'RD', 'SIP', 'Comparison', 'Hindi'],
    relatedCalculators: ['/calculators/rd-calculator', '/calculators/sip-calculator'],
    order: 3
  },
  {
    id: 'high-interest-savings',
    slug: 'high-interest-savings-accounts-digital-banks-india-comparison',
    title: 'High-Interest Savings Accounts: Digital Banks vs Traditional (Up to 7%)',
    titleHindi: 'उच्च ब्याज बचत खाते: डिजिटल बैंक बनाम पारंपरिक (7% तक)',
    description: 'Discover digital banks offering 6-7% savings interest (vs 3% traditional). Compare safety, features, and maximize your savings returns',
    descriptionHindi: 'डिजिटल बैंकों की खोज करें जो 6-7% बचत ब्याज देते हैं (पारंपरिक 3% के मुकाबले)। सुरक्षा, सुविधाओं की तुलना करें और अपनी बचत रिटर्न को अधिकतम करें',
    duration: '40 mins',
    difficulty: 'intermediate',
    tags: ['High Interest', 'Digital Banks', 'Savings', 'Comparison', 'Hindi'],
    relatedCalculators: ['/calculators/savings-calculator', '/calculators/interest-comparison'],
    order: 4
  },
  {
    id: 'senior-citizen-schemes',
    slug: 'senior-citizen-savings-schemes-scss-pmvvy-india-benefits',
    title: 'Senior Citizen Savings Schemes: SCSS, PMVVY (8.2% Interest)',
    titleHindi: 'वरिष्ठ नागरिक बचत योजनाएं: एससीएसएस, पीएमवीवीवाई (8.2% ब्याज)',
    description: 'Complete guide to senior citizen schemes: SCSS (8.2%), PMVVY, tax benefits, eligibility. Best options for retirees in India',
    descriptionHindi: 'वरिष्ठ नागरिक योजनाओं के लिए संपूर्ण गाइड: एससीएसएस (8.2%), पीएमवीवीवाई, कर लाभ, पात्रता। भारत में सेवानिवृत्त लोगों के लिए सर्वश्रेष्ठ विकल्प',
    duration: '45 mins',
    difficulty: 'beginner',
    tags: ['Senior Citizen', 'SCSS', 'PMVVY', 'Retirement', 'Hindi'],
    relatedCalculators: ['/calculators/scss-calculator', '/calculators/senior-citizen-fd'],
    order: 5
  },
  {
    id: 'sweep-in-accounts',
    slug: 'sweep-in-accounts-auto-sweep-facility-banks-india',
    title: 'Sweep-In Accounts: Get FD Returns on Savings Balance (Auto-Sweep)',
    titleHindi: 'स्वीप-इन खाते: बचत शेष पर एफडी रिटर्न प्राप्त करें (ऑटो-स्वीप)',
    description: 'Learn how sweep-in/auto-sweep works: Get 6-7% on idle savings automatically. Best banks offering this facility in India',
    descriptionHindi: 'जानें कि स्वीप-इन/ऑटो-स्वीप कैसे काम करता है: निष्क्रिय बचत पर स्वचालित रूप से 6-7% प्राप्त करें। भारत में यह सुविधा देने वाले सर्वश्रेष्ठ बैंक',
    duration: '35 mins',
    difficulty: 'intermediate',
    tags: ['Sweep-In', 'Auto-Sweep', 'FD', 'Savings', 'Hindi'],
    relatedCalculators: ['/calculators/sweep-in-calculator', '/calculators/fd-calculator'],
    order: 6
  },
  {
    id: 'bank-charges-hidden-fees',
    slug: 'bank-charges-hidden-fees-minimum-balance-penalty-india',
    title: 'Bank Charges & Hidden Fees: How to Avoid ₹5,000/Year in Penalties',
    titleHindi: 'बैंक शुल्क और छिपी फीस: ₹5,000/वर्ष जुर्माने से कैसे बचें',
    description: 'Identify all bank charges: minimum balance penalty, ATM fees, SMS charges, cheque fees. Learn how to avoid or minimize them',
    descriptionHindi: 'सभी बैंक शुल्कों की पहचान करें: न्यूनतम शेष जुर्माना, एटीएम शुल्क, एसएमएस शुल्क, चेक शुल्क। जानें कि उनसे कैसे बचें या कम करें',
    duration: '30 mins',
    difficulty: 'beginner',
    tags: ['Bank Charges', 'Hidden Fees', 'Minimum Balance', 'Penalties', 'Hindi'],
    relatedCalculators: ['/calculators/bank-charges-calculator'],
    order: 7
  },
  {
    id: 'maximizing-bank-returns',
    slug: 'maximizing-bank-savings-returns-strategies-india-2025',
    title: 'Maximizing Bank Returns: 10 Strategies to Earn More on Savings',
    titleHindi: 'बैंक रिटर्न को अधिकतम करना: बचत पर अधिक कमाने के लिए 10 रणनीतियां',
    description: 'Advanced strategies: High-interest accounts, FD laddering, sweep-in, quarterly interest compounding. Earn 2-3% more annually',
    descriptionHindi: 'उन्नत रणनीतियां: उच्च ब्याज खाते, एफडी लैडरिंग, स्वीप-इन, त्रैमासिक ब्याज चक्रवृद्धि। सालाना 2-3% अधिक कमाएं',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Maximize Returns', 'Strategies', 'Bank Savings', 'Advanced', 'Hindi'],
    relatedCalculators: ['/calculators/interest-calculator', '/calculators/compound-interest-calculator'],
    order: 8
  }
];

// SEO keywords for the category
export const savingsBankSEO = {
  metaTitle: 'Savings & Bank Products Guide for Indians | MoneyCal Learn',
  metaDescription: 'Master savings accounts, FDs, RDs, and bank products in Hindi & English. 8 comprehensive lessons with interest comparison, tax guide, and strategies to maximize returns.',
  keywords: 'savings account India, fixed deposit guide, RD vs SIP, high interest savings, bank charges, senior citizen schemes, sweep in accounts, FD laddering, बचत खाता, फिक्स्ड डिपॉजिट',
  canonicalUrl: 'https://moneycal.in/learn/savings-bank-products'
};

