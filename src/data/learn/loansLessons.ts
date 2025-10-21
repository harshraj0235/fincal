// Loans & Credit Learning Lessons Metadata
// Complete structure for 150 loan articles

export interface LessonMetadata {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  subcategory: string;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readingTime: number; // minutes
  keywords: string[];
  calculatorEmbed: string | null;
  nextLesson: string | null;
  prevLesson: string | null;
  relatedTools: string[];
  relatedLessons: string[];
  publishDate: string;
  lastUpdated: string;
}

// A. Loan Basics (20 lessons)
export const loanBasicsLessons: LessonMetadata[] = [
  {
    id: 'what-is-loan',
    slug: 'what-is-loan',
    title: 'What Is a Loan? Types and Examples Explained',
    titleHindi: 'लोन क्या है? प्रकार और उदाहरण',
    category: 'loans',
    subcategory: 'basics',
    order: 1,
    difficulty: 'beginner',
    readingTime: 8,
    keywords: ['loan', 'types of loans', 'loan basics', 'what is loan'],
    calculatorEmbed: null,
    nextLesson: 'types-of-loans',
    prevLesson: null,
    relatedTools: ['/calculators/emi-calculator', '/calculators/loan-calculator'],
    relatedLessons: ['types-of-loans', 'secured-vs-unsecured'],
    publishDate: '2025-10-21',
    lastUpdated: '2025-10-21'
  },
  {
    id: 'types-of-loans',
    slug: 'types-of-loans',
    title: 'Types of Loans in India - Complete Guide',
    titleHindi: 'भारत में लोन के प्रकार - पूर्ण गाइड',
    category: 'loans',
    subcategory: 'basics',
    order: 2,
    difficulty: 'beginner',
    readingTime: 10,
    keywords: ['types of loans', 'loan types India', 'secured loan', 'unsecured loan'],
    calculatorEmbed: null,
    nextLesson: 'secured-vs-unsecured',
    prevLesson: 'what-is-loan',
    relatedTools: ['/calculators/home-loan-calculator', '/calculators/personal-loan-calculator'],
    relatedLessons: ['secured-vs-unsecured', 'what-is-emi'],
    publishDate: '2025-10-21',
    lastUpdated: '2025-10-21'
  },
  {
    id: 'secured-vs-unsecured',
    slug: 'secured-vs-unsecured',
    title: 'Secured vs Unsecured Loans: Key Differences',
    titleHindi: 'सिक्योर्ड बनाम अनसिक्योर्ड लोन: मुख्य अंतर',
    category: 'loans',
    subcategory: 'basics',
    order: 3,
    difficulty: 'beginner',
    readingTime: 9,
    keywords: ['secured loan', 'unsecured loan', 'collateral', 'loan types'],
    calculatorEmbed: null,
    nextLesson: 'how-banks-evaluate',
    prevLesson: 'types-of-loans',
    relatedTools: ['/calculators/home-loan-calculator', '/calculators/personal-loan-calculator'],
    relatedLessons: ['understanding-collateral', 'types-of-loans'],
    publishDate: '2025-10-21',
    lastUpdated: '2025-10-21'
  },
  {
    id: 'what-is-emi',
    slug: 'what-is-emi',
    title: 'What Is EMI? Understanding How It Works',
    titleHindi: 'EMI क्या है? यह कैसे काम करता है',
    category: 'loans',
    subcategory: 'basics',
    order: 5,
    difficulty: 'beginner',
    readingTime: 8,
    keywords: ['EMI', 'EMI meaning', 'EMI calculation', 'EMI formula', 'equated monthly installment'],
    calculatorEmbed: '/calculators/emi-calculator',
    nextLesson: 'simple-vs-compound-interest',
    prevLesson: 'how-banks-evaluate',
    relatedTools: ['/calculators/emi-calculator', '/calculators/home-loan-calculator', '/calculators/car-loan-calculator'],
    relatedLessons: ['simple-vs-compound-interest', 'loan-tenure-explained'],
    publishDate: '2025-10-21',
    lastUpdated: '2025-10-21'
  }
  // ... Will add remaining 16 lessons in implementation
];

// B. Home Loans (20 lessons)
export const homeLoansLessons: LessonMetadata[] = [
  {
    id: 'home-loan-basics',
    slug: 'basics',
    title: 'Home Loan Basics: Everything You Need to Know',
    titleHindi: 'होम लोन बेसिक्स: आपको जो कुछ भी जानना चाहिए',
    category: 'home-loans',
    subcategory: 'basics',
    order: 1,
    difficulty: 'beginner',
    readingTime: 12,
    keywords: ['home loan', 'home loan basics', 'housing loan', 'home loan India'],
    calculatorEmbed: '/calculators/home-loan-calculator',
    nextLesson: 'eligibility-criteria',
    prevLesson: null,
    relatedTools: ['/calculators/home-loan-calculator', '/calculators/emi-calculator'],
    relatedLessons: ['eligibility-criteria', 'emi-calculation'],
    publishDate: '2025-10-21',
    lastUpdated: '2025-10-21'
  },
  {
    id: 'home-loan-eligibility',
    slug: 'eligibility-criteria',
    title: 'Home Loan Eligibility Criteria in India',
    titleHindi: 'भारत में होम लोन पात्रता मानदंड',
    category: 'home-loans',
    subcategory: 'basics',
    order: 2,
    difficulty: 'beginner',
    readingTime: 10,
    keywords: ['home loan eligibility', 'home loan criteria', 'loan eligibility calculator'],
    calculatorEmbed: '/calculators/home-loan-calculator',
    nextLesson: 'fixed-vs-floating-rates',
    prevLesson: 'basics',
    relatedTools: ['/calculators/home-loan-calculator'],
    relatedLessons: ['basics', 'emi-calculation'],
    publishDate: '2025-10-21',
    lastUpdated: '2025-10-21'
  }
  // ... Will add remaining 18 lessons
];

// C. Personal Loans (20 lessons)
export const personalLoansLessons: LessonMetadata[] = [
  {
    id: 'what-is-personal-loan',
    slug: 'what-is-personal-loan',
    title: 'What Is a Personal Loan and How It Works',
    titleHindi: 'पर्सनल लोन क्या है और यह कैसे काम करता है',
    category: 'personal-loans',
    subcategory: 'basics',
    order: 1,
    difficulty: 'beginner',
    readingTime: 9,
    keywords: ['personal loan', 'personal loan India', 'unsecured loan', 'instant personal loan'],
    calculatorEmbed: '/calculators/personal-loan-calculator',
    nextLesson: 'best-uses',
    prevLesson: null,
    relatedTools: ['/calculators/personal-loan-calculator', '/calculators/emi-calculator'],
    relatedLessons: ['best-uses', 'online-application'],
    publishDate: '2025-10-21',
    lastUpdated: '2025-10-21'
  }
  // ... Will add remaining 19 lessons
];

// All lessons combined
export const allLoansLessons = [
  ...loanBasicsLessons,
  ...homeLoansLessons,
  ...personalLoansLessons
];

// Category structure for navigation
export const loanCategories = [
  {
    id: 'basics',
    name: 'Loan Basics',
    nameHindi: 'लोन बेसिक्स',
    icon: '📚',
    lessons: loanBasicsLessons,
    description: 'Fundamental concepts of loans, EMI, interest rates'
  },
  {
    id: 'home-loans',
    name: 'Home Loans',
    nameHindi: 'होम लोन',
    icon: '🏠',
    lessons: homeLoansLessons,
    description: 'Complete guide to housing finance and home loans'
  },
  {
    id: 'personal-loans',
    name: 'Personal Loans',
    nameHindi: 'पर्सनल लोन',
    icon: '💳',
    lessons: personalLoansLessons,
    description: 'Everything about unsecured personal loans'
  },
  {
    id: 'vehicle-loans',
    name: 'Vehicle Loans',
    nameHindi: 'वाहन लोन',
    icon: '🚗',
    lessons: [],
    description: 'Car and two-wheeler loan guides'
  },
  {
    id: 'education-loans',
    name: 'Education Loans',
    nameHindi: 'शिक्षा लोन',
    icon: '🎓',
    lessons: [],
    description: 'Student loans for India and abroad'
  },
  {
    id: 'business-loans',
    name: 'Business Loans',
    nameHindi: 'बिजनेस लोन',
    icon: '💼',
    lessons: [],
    description: 'MSME and business financing'
  },
  {
    id: 'gold-loans',
    name: 'Gold Loans',
    nameHindi: 'गोल्ड लोन',
    icon: '🏆',
    lessons: [],
    description: 'Quick loans against gold'
  },
  {
    id: 'credit-cards',
    name: 'Credit Cards',
    nameHindi: 'क्रेडिट कार्ड',
    icon: '💳',
    lessons: [],
    description: 'Credit card usage and management'
  },
  {
    id: 'credit-score',
    name: 'Credit Score',
    nameHindi: 'क्रेडिट स्कोर',
    icon: '📊',
    lessons: [],
    description: 'CIBIL score and credit reports'
  }
];

