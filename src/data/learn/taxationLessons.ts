/**
 * Taxation & Compliance - Complete Lesson Registry
 * Category: taxation-compliance
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

export const taxationCategory = {
  id: 'taxation-compliance',
  slug: 'taxation-compliance',
  name: 'Taxation & Compliance',
  nameHindi: 'कर और अनुपालन',
  icon: '📋',
  description: 'Income tax, 80C deductions, ITR filing, and tax optimization for Indians',
  descriptionHindi: 'आयकर, 80C कटौती, ITR फाइलिंग, और भारतीयों के लिए कर अनुकूलन',
  color: 'from-yellow-500 to-amber-600',
  totalLessons: 7,
  estimatedHours: 5
};

export const taxationLessons: LearnLesson[] = [
  {
    id: 'income-tax-basics',
    slug: 'income-tax-basics-india-slabs-old-vs-new-regime-2025',
    title: 'Income Tax Basics: Tax Slabs, Old vs New Regime India 2025',
    titleHindi: 'आयकर की बुनियादी बातें: टैक्स स्लैब, पुरानी बनाम नई व्यवस्था 2025',
    description: 'Understand income tax in India: Tax slabs for FY 2024-25, old regime vs new regime comparison, which is better for you, exemptions and deductions',
    descriptionHindi: 'भारत में आयकर को समझें: वित्त वर्ष 2024-25 के लिए कर स्लैब, पुरानी व्यवस्था बनाम नई व्यवस्था की तुलना, आपके लिए कौन सा बेहतर है, छूट और कटौती',
    duration: '45 mins',
    difficulty: 'beginner',
    tags: ['Income Tax', 'Tax Slabs', 'Old vs New Regime', 'Hindi'],
    relatedCalculators: ['/calculators/income-tax-calculator', '/calculators/tax-regime-comparison'],
    order: 1
  },
  {
    id: 'section-80c-guide',
    slug: 'section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india',
    title: 'Section 80C Guide: Save ₹46,800 Tax with ₹1.5L Deductions (PPF, ELSS, Insurance)',
    titleHindi: 'सेक्शन 80C गाइड: ₹1.5L कटौती से ₹46,800 टैक्स बचाएं (PPF, ELSS, बीमा)',
    description: 'Master Section 80C: All eligible investments (PPF, ELSS, life insurance, FD, NSC), how to maximize ₹1.5L limit, tax saving calculation, and planning',
    descriptionHindi: 'सेक्शन 80C में महारत: सभी पात्र निवेश (PPF, ELSS, जीवन बीमा, FD, NSC), ₹1.5L सीमा को अधिकतम कैसे करें, कर बचत गणना, और योजना',
    duration: '40 mins',
    difficulty: 'intermediate',
    tags: ['80C', 'Tax Saving', 'Deductions', 'PPF', 'ELSS', 'Hindi'],
    relatedCalculators: ['/calculators/section-80c-calculator', '/calculators/tax-saving-calculator'],
    order: 2
  },
  {
    id: 'itr-filing-guide',
    slug: 'itr-filing-complete-guide-online-income-tax-return-india-2025',
    title: 'ITR Filing Complete Guide: File Income Tax Return Online (Step-by-Step 2025)',
    titleHindi: 'ITR फाइलिंग गाइड: ऑनलाइन आयकर रिटर्न कैसे भरें (चरण-दर-चरण 2025)',
    description: 'Learn ITR filing: Which ITR form (ITR-1, ITR-2, ITR-3), documents needed, filing on incometax.gov.in, Form 16, TDS, refund process, deadline (July 31)',
    descriptionHindi: 'ITR फाइलिंग सीखें: कौन सा ITR फॉर्म (ITR-1, ITR-2, ITR-3), आवश्यक दस्तावेज, incometax.gov.in पर फाइलिंग, फॉर्म 16, TDS, रिफंड प्रक्रिया, समय सीमा (31 जुलाई)',
    duration: '50 mins',
    difficulty: 'intermediate',
    tags: ['ITR Filing', 'Income Tax Return', 'Form 16', 'TDS', 'Hindi'],
    relatedCalculators: ['/calculators/income-tax-calculator'],
    order: 3
  },
  {
    id: 'tds-explained',
    slug: 'tds-tax-deducted-at-source-certificate-claim-refund-india',
    title: 'TDS Explained: Tax Deducted at Source, Form 16, Certificate, Claim Refund',
    titleHindi: 'TDS समझाया: स्रोत पर कर कटौती, फॉर्म 16, प्रमाणपत्र, रिफंड का दावा',
    description: 'Complete TDS guide: What is TDS, why deducted, TDS on salary vs interest vs professional fees, Form 16/16A, claiming excess TDS refund in ITR',
    descriptionHindi: 'संपूर्ण TDS गाइड: TDS क्या है, क्यों काटा जाता है, वेतन बनाम ब्याज बनाम व्यावसायिक शुल्क पर TDS, फॉर्म 16/16A, ITR में अतिरिक्त TDS रिफंड का दावा',
    duration: '35 mins',
    difficulty: 'beginner',
    tags: ['TDS', 'Form 16', 'Tax Refund', 'Hindi'],
    relatedCalculators: ['/calculators/tds-calculator'],
    order: 4
  },
  {
    id: 'capital-gains-tax',
    slug: 'capital-gains-tax-ltcg-stcg-equity-debt-property-india-2025',
    title: 'Capital Gains Tax: LTCG, STCG on Equity, Debt, Property (India 2025)',
    titleHindi: 'पूंजीगत लाभ कर: इक्विटी, डेट, संपत्ति पर LTCG, STCG (भारत 2025)',
    description: 'Master capital gains taxation: Long-term vs short-term, rates on stocks (10%), debt (as per slab), property (20%), indexation benefit, exemptions',
    descriptionHindi: 'पूंजीगत लाभ कराधान में महारत: दीर्घकालिक बनाम अल्पकालिक, शेयरों पर दरें (10%), डेट (स्लैब के अनुसार), संपत्ति (20%), इंडेक्सेशन लाभ, छूट',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Capital Gains', 'LTCG', 'STCG', 'Property Tax', 'Hindi'],
    relatedCalculators: ['/calculators/capital-gains-tax-calculator'],
    order: 5
  },
  {
    id: 'advance-tax-guide',
    slug: 'advance-tax-payment-due-dates-calculation-penalty-india',
    title: 'Advance Tax: Payment Due Dates, Calculation, Interest Penalty (India)',
    titleHindi: 'एडवांस टैक्स: भुगतान तिथियां, गणना, ब्याज जुर्माना (भारत)',
    description: 'Learn advance tax: When to pay (quarterly), calculation method, due dates (15 Jun, 15 Sep, 15 Dec, 15 Mar), interest penalty for late payment, exemptions',
    descriptionHindi: 'एडवांस टैक्स सीखें: कब भुगतान करें (त्रैमासिक), गणना विधि, देय तिथियां (15 जून, 15 सितंबर, 15 दिसंबर, 15 मार्च), देर से भुगतान पर ब्याज जुर्माना, छूट',
    duration: '40 mins',
    difficulty: 'advanced',
    tags: ['Advance Tax', 'Quarterly Payment', 'Interest Penalty', 'Hindi'],
    relatedCalculators: ['/calculators/advance-tax-calculator'],
    order: 6
  },
  {
    id: 'tax-planning-strategies',
    slug: 'tax-planning-strategies-minimize-liability-legally-india-2025',
    title: 'Tax Planning Strategies: Minimize Tax Liability Legally (Save ₹1L/Year)',
    titleHindi: 'कर योजना रणनीतियां: कानूनी रूप से कर देयता को कम करें (₹1L/वर्ष बचाएं)',
    description: 'Advanced tax planning: Salary structuring (HRA, LTA), 80C optimization, NPS 80CCD(1B), health insurance 80D, home loan 24(b), charitable donations 80G',
    descriptionHindi: 'उन्नत कर योजना: वेतन संरचना (HRA, LTA), 80C अनुकूलन, NPS 80CCD(1B), स्वास्थ्य बीमा 80D, होम लोन 24(b), धर्मार्थ दान 80G',
    duration: '50 mins',
    difficulty: 'advanced',
    tags: ['Tax Planning', 'Tax Optimization', 'Save Tax', 'Hindi'],
    relatedCalculators: ['/calculators/tax-saving-calculator', '/calculators/hra-calculator'],
    order: 7
  }
];

// SEO keywords for the category
export const taxationSEO = {
  metaTitle: 'Taxation & Compliance Guide for Indians | MoneyCal Learn',
  metaDescription: 'Master income tax, 80C deductions, ITR filing, TDS, capital gains tax in Hindi & English. 7 comprehensive lessons with calculators & tax-saving strategies.',
  keywords: 'income tax India, 80C deductions, ITR filing guide, TDS explained, capital gains tax, advance tax, tax planning strategies, कर योजना, आयकर गाइड',
  canonicalUrl: 'https://moneycal.in/learn/taxation-compliance'
};

