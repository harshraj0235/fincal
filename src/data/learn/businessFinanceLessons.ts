/**
 * Business Finance & Entrepreneurship - Complete Lesson Registry
 * Category: business-finance
 * Total Lessons: 7 comprehensive lessons
 * Target: Indian entrepreneurs & business owners (Hindi + English)
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

export const businessFinanceCategory = {
  id: 'business-finance',
  slug: 'business-finance-entrepreneurship',
  name: 'Business Finance & Entrepreneurship',
  nameHindi: 'व्यवसाय वित्त और उद्यमिता',
  icon: '💼',
  description: 'Startup financing, business loans, cash flow management, scaling strategies for Indian entrepreneurs',
  descriptionHindi: 'स्टार्टअप फंडिंग, व्यवसाय ऋण, कैश फ्लो प्रबंधन, भारतीय उद्यमियों के लिए स्केलिंग रणनीतियां',
  color: 'from-green-500 to-emerald-600',
  totalLessons: 7,
  estimatedHours: 6
};

export const businessFinanceLessons: LearnLesson[] = [
  {
    id: 'startup-funding-guide',
    slug: 'startup-funding-india-seed-angel-vc-bootstrapping-complete-guide-2025',
    title: 'Startup Funding Guide: Seed, Angel, VC, Bootstrapping (India 2025)',
    titleHindi: 'स्टार्टअप फंडिंग गाइड: सीड, एंजेल, VC, बूटस्ट्रैपिंग (भारत 2025)',
    description: 'Complete startup funding guide: Bootstrapping vs external funding, seed funding (₹25L-₹1Cr), angel investors, venture capital, equity dilution, valuation, term sheets',
    descriptionHindi: 'संपूर्ण स्टार्टअप फंडिंग गाइड: बूटस्ट्रैपिंग बनाम बाहरी फंडिंग, सीड फंडिंग (₹25L-₹1Cr), एंजेल निवेशक, वेंचर कैपिटल, इक्विटी डाइल्यूशन, वैल्यूएशन, टर्म शीट',
    duration: '60 mins',
    difficulty: 'advanced',
    tags: ['Startup Funding', 'Seed Funding', 'Angel Investors', 'VC', 'Bootstrapping', 'Hindi'],
    relatedCalculators: [],
    order: 1
  },
  {
    id: 'business-loans-guide',
    slug: 'business-loans-india-mudra-msme-working-capital-term-loan-guide-2025',
    title: 'Business Loans India: MUDRA, MSME, Working Capital, Term Loan Guide 2025',
    titleHindi: 'व्यवसाय ऋण भारत: मुद्रा, MSME, वर्किंग कैपिटल, टर्म लोन गाइड 2025',
    description: 'Master business loans: MUDRA loan (₹50K-₹10L, no collateral), MSME loans, working capital loan, term loan, eligibility, interest rates (9-15%), documents, application process',
    descriptionHindi: 'व्यवसाय ऋण में महारत: मुद्रा ऋण (₹50K-₹10L, कोई संपार्श्विक नहीं), MSME ऋण, वर्किंग कैपिटल ऋण, टर्म ऋण, पात्रता, ब्याज दरें (9-15%), दस्तावेज, आवेदन प्रक्रिया',
    duration: '55 mins',
    difficulty: 'intermediate',
    tags: ['Business Loans', 'MUDRA', 'MSME', 'Working Capital', 'Hindi'],
    relatedCalculators: ['/calculators/business-loan-calculator'],
    order: 2
  },
  {
    id: 'cash-flow-management',
    slug: 'cash-flow-management-business-receivables-payables-working-capital-india',
    title: 'Cash Flow Management: Manage Receivables, Payables, Working Capital (India)',
    titleHindi: 'कैश फ्लो प्रबंधन: प्राप्य, देय, वर्किंग कैपिटल प्रबंधित करें (भारत)',
    description: 'Master cash flow: Cash flow statement, managing receivables (30-90 day payment terms), payables optimization, working capital cycle, cash runway, preventing cash crunch',
    descriptionHindi: 'कैश फ्लो में महारत: कैश फ्लो स्टेटमेंट, प्राप्य प्रबंधन (30-90 दिन भुगतान शर्तें), देय अनुकूलन, वर्किंग कैपिटल चक्र, कैश रनवे, कैश संकट की रोकथाम',
    duration: '50 mins',
    difficulty: 'advanced',
    tags: ['Cash Flow', 'Working Capital', 'Receivables', 'Business Finance', 'Hindi'],
    relatedCalculators: [],
    order: 3
  },
  {
    id: 'gst-compliance-guide',
    slug: 'gst-compliance-india-registration-filing-returns-input-credit-composition-scheme-2025',
    title: 'GST Compliance India: Registration, Filing Returns, Input Credit, Composition Scheme 2025',
    titleHindi: 'GST अनुपालन भारत: पंजीकरण, रिटर्न फाइलिंग, इनपुट क्रेडिट, कंपोजीशन स्कीम 2025',
    description: 'Complete GST guide: GST registration (mandatory if turnover &gt; ₹40L), GSTR-1/3B filing, input tax credit, composition scheme (turnover <₹1.5Cr), penalties, e-way bill',
    descriptionHindi: 'संपूर्ण GST गाइड: GST पंजीकरण (टर्नओवर &gt; ₹40L अनिवार्य), GSTR-1/3B फाइलिंग, इनपुट टैक्स क्रेडिट, कंपोजीशन स्कीम (टर्नओवर <₹1.5Cr), जुर्माना, ई-वे बिल',
    duration: '55 mins',
    difficulty: 'intermediate',
    tags: ['GST', 'GST Compliance', 'GSTR Filing', 'Input Credit', 'Hindi'],
    relatedCalculators: ['/calculators/gst-calculator'],
    order: 4
  },
  {
    id: 'business-registration-guide',
    slug: 'business-registration-india-sole-proprietorship-llp-private-limited-company-guide-2025',
    title: 'Business Registration India: Sole Proprietorship, LLP, Private Limited Company Guide 2025',
    titleHindi: 'व्यवसाय पंजीकरण भारत: एकल स्वामित्व, LLP, प्राइवेट लिमिटेड कंपनी गाइड 2025',
    description: 'Choose right business structure: Sole proprietorship (easiest, unlimited liability), LLP (₹15K registration, limited liability), Pvt Ltd (₹10K+, investor-friendly), pros/cons',
    descriptionHindi: 'सही व्यवसाय संरचना चुनें: एकल स्वामित्व (सबसे आसान, असीमित देयता), LLP (₹15K पंजीकरण, सीमित देयता), Pvt Ltd (₹10K+, निवेशक-अनुकूल), फायदे/नुकसान',
    duration: '45 mins',
    difficulty: 'beginner',
    tags: ['Business Registration', 'Sole Proprietorship', 'LLP', 'Private Limited', 'Hindi'],
    relatedCalculators: [],
    order: 5
  },
  {
    id: 'scaling-business-strategies',
    slug: 'scaling-business-strategies-india-hiring-automation-expansion-profitability-2025',
    title: 'Scaling Business Strategies: Hiring, Automation, Expansion, Profitability (India 2025)',
    titleHindi: 'व्यवसाय स्केलिंग रणनीतियां: भर्ती, स्वचालन, विस्तार, लाभप्रदता (भारत 2025)',
    description: 'Scale your business: When to scale (product-market fit), hiring strategies, automation tools, geographical expansion, maintaining profitability while scaling, avoiding scale-up traps',
    descriptionHindi: 'अपने व्यवसाय को स्केल करें: कब स्केल करें (प्रोडक्ट-मार्केट फिट), भर्ती रणनीतियां, स्वचालन उपकरण, भौगोलिक विस्तार, स्केल करते समय लाभप्रदता बनाए रखना, स्केल-अप जाल से बचना',
    duration: '50 mins',
    difficulty: 'advanced',
    tags: ['Scaling Business', 'Hiring', 'Automation', 'Expansion', 'Hindi'],
    relatedCalculators: [],
    order: 6
  },
  {
    id: 'business-financial-statements',
    slug: 'business-financial-statements-profit-loss-balance-sheet-cash-flow-india-guide',
    title: 'Business Financial Statements: Profit & Loss, Balance Sheet, Cash Flow (India Guide)',
    titleHindi: 'व्यवसाय वित्तीय विवरण: लाभ-हानि, बैलेंस शीट, कैश फ्लो (भारत गाइड)',
    description: 'Understand financials: P&L statement (revenue, expenses, net profit), balance sheet (assets, liabilities, equity), cash flow statement, financial ratios, reading financial health',
    descriptionHindi: 'वित्तीय विवरणों को समझें: P&L स्टेटमेंट (राजस्व, खर्च, शुद्ध लाभ), बैलेंस शीट (संपत्ति, देयताएं, इक्विटी), कैश फ्लो स्टेटमेंट, वित्तीय अनुपात, वित्तीय स्वास्थ्य पढ़ना',
    duration: '55 mins',
    difficulty: 'intermediate',
    tags: ['Financial Statements', 'P&L', 'Balance Sheet', 'Cash Flow', 'Hindi'],
    relatedCalculators: [],
    order: 7
  }
];

// SEO keywords for the category
export const businessFinanceSEO = {
  metaTitle: 'Business Finance & Entrepreneurship Guide for Indians | MoneyCal Learn',
  metaDescription: 'Master startup funding, business loans (MUDRA, MSME), cash flow management, GST compliance, business registration, scaling strategies in Hindi & English. 7 comprehensive lessons for Indian entrepreneurs.',
  keywords: 'startup funding India, business loans MUDRA MSME, cash flow management, GST compliance, business registration LLP Pvt Ltd, scaling business strategies, व्यवसाय वित्त, स्टार्टअप फंडिंग',
  canonicalUrl: 'https://moneycal.in/learn/business-finance-entrepreneurship'
};





