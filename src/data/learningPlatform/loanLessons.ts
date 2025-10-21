// MoneyCal Learn - Comprehensive Loan Education Platform
// W3Schools-style structured learning for Indian audience

export interface LessonContent {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: string;
  order: number;
  description: string;
  descriptionHindi: string;
  content: {
    introduction: string;
    introductionHindi: string;
    keyPoints: string[];
    keyPointsHindi: string[];
    formula?: string;
    example?: {
      scenario: string;
      scenarioHindi: string;
      calculation: string;
      result: string;
    };
    tips: string[];
    tipsHindi: string[];
    relatedTools: string[];
    relatedLessons: string[];
  };
  seoKeywords: string[];
  estimatedReadTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface LessonCategory {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  icon: string;
  description: string;
  totalLessons: number;
  estimatedTime: string;
  color: string;
}

// Main Learning Categories
export const learningCategories: LessonCategory[] = [
  {
    id: 'loan-basics',
    name: 'Loan Basics',
    nameHindi: 'लोन की मूल बातें',
    slug: 'loan-basics',
    icon: '💰',
    description: 'Master the fundamentals of loans, EMI, interest, and eligibility',
    totalLessons: 20,
    estimatedTime: '4 hours',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'home-loans',
    name: 'Home Loans',
    nameHindi: 'होम लोन',
    slug: 'home-loans',
    icon: '🏠',
    description: 'Complete guide to home loans, eligibility, tax benefits, and EMI',
    totalLessons: 20,
    estimatedTime: '5 hours',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'personal-loans',
    name: 'Personal Loans',
    nameHindi: 'पर्सनल लोन',
    slug: 'personal-loans',
    icon: '💳',
    description: 'Everything about personal loans, approval, rates, and repayment',
    totalLessons: 20,
    estimatedTime: '4 hours',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'vehicle-loans',
    name: 'Vehicle Loans',
    nameHindi: 'व्हीकल लोन',
    slug: 'vehicle-loans',
    icon: '🚗',
    description: 'Car and two-wheeler loans, interest rates, and eligibility',
    totalLessons: 15,
    estimatedTime: '3 hours',
    color: 'from-red-500 to-orange-600'
  },
  {
    id: 'education-loans',
    name: 'Education Loans',
    nameHindi: 'एजुकेशन लोन',
    slug: 'education-loans',
    icon: '🎓',
    description: 'Student loans for India and abroad, subsidies, and repayment',
    totalLessons: 10,
    estimatedTime: '2 hours',
    color: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'business-loans',
    name: 'Business Loans',
    nameHindi: 'बिजनेस लोन',
    slug: 'business-loans',
    icon: '🏢',
    description: 'MSME loans, Mudra, working capital, and startup financing',
    totalLessons: 15,
    estimatedTime: '4 hours',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'gold-loans',
    name: 'Gold Loans',
    nameHindi: 'गोल्ड लोन',
    slug: 'gold-loans',
    icon: '💎',
    description: 'Quick loans against gold jewelry, rates, and safety',
    totalLessons: 10,
    estimatedTime: '2 hours',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'credit-cards',
    name: 'Credit Cards',
    nameHindi: 'क्रेडिट कार्ड',
    slug: 'credit-cards',
    icon: '💳',
    description: 'Credit cards, rewards, fees, and smart usage',
    totalLessons: 20,
    estimatedTime: '4 hours',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'credit-score',
    name: 'Credit Score & Reports',
    nameHindi: 'क्रेडिट स्कोर',
    slug: 'credit-score',
    icon: '📊',
    description: 'CIBIL score, credit reports, and improving creditworthiness',
    totalLessons: 10,
    estimatedTime: '2 hours',
    color: 'from-pink-500 to-rose-600'
  }
];

// Sample Loan Basics Lessons (20 lessons)
export const loanBasicsLessons: LessonContent[] = [
  {
    id: 'LB001',
    slug: 'what-is-loan',
    title: 'What Is a Loan? Types and Examples Explained',
    titleHindi: 'लोन क्या है? प्रकार और उदाहरण',
    category: 'loan-basics',
    order: 1,
    description: 'Learn the fundamental concept of loans, how they work, and different types available in India',
    descriptionHindi: 'लोन की मूल अवधारणा, इसके कार्य और भारत में उपलब्ध विभिन्न प्रकार जानें',
    content: {
      introduction: 'A loan is money borrowed from a bank or financial institution that you agree to repay with interest over a specific period. Loans help people buy homes, cars, start businesses, or meet emergency expenses.',
      introductionHindi: 'लोन बैंक या वित्तीय संस्थान से उधार लिया गया पैसा है जिसे आप ब्याज के साथ एक निश्चित अवधि में वापस करने के लिए सहमत होते हैं। लोन लोगों को घर, कार खरीदने, व्यवसाय शुरू करने या आपातकालीन खर्चों को पूरा करने में मदद करता है।',
      keyPoints: [
        'Loan = Borrowed money that must be repaid with interest',
        'Principal = Original loan amount borrowed',
        'Interest = Cost of borrowing money',
        'Tenure = Time period for repayment',
        'EMI = Equal Monthly Installment for repayment'
      ],
      keyPointsHindi: [
        'लोन = उधार लिया गया पैसा जो ब्याज के साथ वापस करना होता है',
        'मूल राशि = मूल लोन की राशि',
        'ब्याज = पैसे उधार लेने की लागत',
        'अवधि = पुनर्भुगतान के लिए समय अवधि',
        'EMI = समान मासिक किस्त'
      ],
      formula: 'EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]',
      example: {
        scenario: 'You want to buy a house worth ₹50 lakhs. You have ₹10 lakhs savings. You need a home loan of ₹40 lakhs at 8% interest for 20 years.',
        scenarioHindi: 'आप ₹50 लाख का घर खरीदना चाहते हैं। आपके पास ₹10 लाख की बचत है। आपको 20 साल के लिए 8% ब्याज पर ₹40 लाख के होम लोन की आवश्यकता है।',
        calculation: 'Principal (P) = ₹40,00,000\nInterest Rate (R) = 8% per annum = 0.67% per month\nTenure (N) = 20 years = 240 months\n\nEMI = ₹33,458 per month\nTotal Interest = ₹40,30,000\nTotal Amount Payable = ₹80,30,000',
        result: 'Your monthly EMI will be ₹33,458 for 20 years'
      },
      tips: [
        'Compare interest rates from multiple banks before applying',
        'Check your CIBIL score (750+) for better loan approval',
        'Keep loan tenure as short as possible to save on interest',
        'Read loan agreement carefully before signing',
        'Avoid taking multiple loans simultaneously'
      ],
      tipsHindi: [
        'आवेदन करने से पहले कई बैंकों की ब्याज दरों की तुलना करें',
        'बेहतर लोन अप्रूवल के लिए अपना CIBIL स्कोर (750+) जांचें',
        'ब्याज बचाने के लिए लोन अवधि को यथासंभव कम रखें',
        'साइन करने से पहले लोन एग्रीमेंट को ध्यान से पढ़ें',
        'एक साथ कई लोन लेने से बचें'
      ],
      relatedTools: ['/calculators/emi-calculator', '/calculators/home-loan-calculator'],
      relatedLessons: ['secured-vs-unsecured-loans', 'how-emi-works', 'loan-eligibility']
    },
    seoKeywords: ['what is loan', 'loan meaning', 'types of loans in India', 'loan kya hai', 'loan EMI calculation'],
    estimatedReadTime: 8,
    difficulty: 'Beginner'
  },
  {
    id: 'LB002',
    slug: 'secured-vs-unsecured-loans',
    title: 'Secured vs. Unsecured Loans: Key Differences',
    titleHindi: 'सिक्योर्ड बनाम अनसिक्योर्ड लोन: मुख्य अंतर',
    category: 'loan-basics',
    order: 2,
    description: 'Understand the difference between secured and unsecured loans, with examples and when to choose each',
    descriptionHindi: 'सिक्योर्ड और अनसिक्योर्ड लोन के बीच अंतर को उदाहरणों के साथ समझें',
    content: {
      introduction: 'Loans are classified into two main types: Secured loans (backed by collateral) and Unsecured loans (no collateral required). Understanding this difference helps you choose the right loan type.',
      introductionHindi: 'लोन को दो मुख्य प्रकारों में वर्गीकृत किया जाता है: सिक्योर्ड लोन (गारंटी के साथ) और अनसिक्योर्ड लोन (बिना गारंटी)। इस अंतर को समझने से आपको सही लोन प्रकार चुनने में मदद मिलती है।',
      keyPoints: [
        'Secured Loan: Requires collateral (home, car, gold, FD)',
        'Unsecured Loan: No collateral needed, higher interest rates',
        'Secured loans have lower interest rates (7-10%)',
        'Unsecured loans have higher interest rates (11-24%)',
        'Risk: Secured loan can lead to asset seizure if you default'
      ],
      keyPointsHindi: [
        'सिक्योर्ड लोन: गारंटी की आवश्यकता (घर, कार, सोना, FD)',
        'अनसिक्योर्ड लोन: कोई गारंटी नहीं, अधिक ब्याज दर',
        'सिक्योर्ड लोन में कम ब्याज दरें (7-10%)',
        'अनसिक्योर्ड लोन में अधिक ब्याज दरें (11-24%)',
        'जोखिम: डिफॉल्ट होने पर संपत्ति जब्त हो सकती है'
      ],
      example: {
        scenario: 'Rajesh needs ₹20 lakhs. He can choose: (A) Home loan against his existing flat (secured) at 8.5%, or (B) Personal loan (unsecured) at 14%',
        scenarioHindi: 'राजेश को ₹20 लाख चाहिए। वह चुन सकता है: (A) अपने मौजूदा फ्लैट के खिलाफ होम लोन (सिक्योर्ड) 8.5% पर, या (B) पर्सनल लोन (अनसिक्योर्ड) 14% पर',
        calculation: 'Option A (Secured): EMI = ₹17,245/month for 20 years, Total Interest = ₹21,38,800\nOption B (Unsecured): EMI = ₹31,256/month for 10 years, Total Interest = ₹17,50,720',
        result: 'Secured loan has lower EMI but longer tenure. Choose based on your cash flow and asset availability.'
      },
      tips: [
        'Use secured loans for large amounts (₹10L+)',
        'Use unsecured loans for small urgent needs (₹5L or less)',
        'Never risk your primary residence for risky ventures',
        'Check prepayment charges on both loan types',
        'Unsecured loans are faster to process (2-3 days)'
      ],
      tipsHindi: [
        'बड़ी राशि (₹10L+) के लिए सिक्योर्ड लोन का उपयोग करें',
        'छोटी जरूरी जरूरतों (₹5L या कम) के लिए अनसिक्योर्ड लोन का उपयोग करें',
        'जोखिम भरे उद्यमों के लिए कभी भी अपना प्राथमिक निवास जोखिम में न डालें',
        'दोनों प्रकार के लोन पर प्रीपेमेंट चार्ज की जांच करें',
        'अनसिक्योर्ड लोन तेजी से प्रोसेस होते हैं (2-3 दिन)'
      ],
      relatedTools: ['/calculators/emi-calculator', '/calculators/loan-comparison'],
      relatedLessons: ['what-is-loan', 'how-emi-works', 'loan-eligibility']
    },
    seoKeywords: ['secured vs unsecured loan', 'collateral loan', 'loan types India', 'secured loan kya hai'],
    estimatedReadTime: 7,
    difficulty: 'Beginner'
  },
  {
    id: 'LB003',
    slug: 'how-emi-works',
    title: 'What Is an EMI? Understanding How It Works',
    titleHindi: 'EMI क्या है? यह कैसे काम करता है',
    category: 'loan-basics',
    order: 3,
    description: 'Complete guide to EMI calculation, components (principal + interest), and how to reduce EMI burden',
    descriptionHindi: 'EMI गणना, घटक (मूलधन + ब्याज), और EMI बोझ को कम करने का संपूर्ण गाइड',
    content: {
      introduction: 'EMI (Equated Monthly Installment) is a fixed monthly payment you make to repay your loan. It includes both principal amount and interest. Understanding EMI helps you plan finances better.',
      introductionHindi: 'EMI (समान मासिक किस्त) एक निश्चित मासिक भुगतान है जो आप अपने लोन को चुकाने के लिए करते हैं। इसमें मूलधन और ब्याज दोनों शामिल हैं। EMI को समझने से आपको वित्त बेहतर ढंग से योजना बनाने में मदद मिलती है।',
      keyPoints: [
        'EMI = Principal portion + Interest portion',
        'Initially, interest portion is higher',
        'Over time, principal portion increases',
        'EMI remains constant throughout loan tenure',
        'Lower tenure = Higher EMI but less total interest',
        'Higher tenure = Lower EMI but more total interest'
      ],
      keyPointsHindi: [
        'EMI = मूलधन भाग + ब्याज भाग',
        'शुरुआत में, ब्याज का हिस्सा अधिक होता है',
        'समय के साथ, मूलधन का हिस्सा बढ़ता है',
        'EMI पूरी लोन अवधि में स्थिर रहता है',
        'कम अवधि = अधिक EMI लेकिन कम कुल ब्याज',
        'अधिक अवधि = कम EMI लेकिन अधिक कुल ब्याज'
      ],
      formula: 'EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]\n\nWhere:\nP = Principal loan amount\nR = Monthly interest rate (Annual rate / 12 / 100)\nN = Loan tenure in months',
      example: {
        scenario: 'Priya takes a personal loan of ₹5 lakhs at 12% annual interest for 5 years (60 months)',
        scenarioHindi: 'प्रिया 5 साल (60 महीने) के लिए 12% वार्षिक ब्याज पर ₹5 लाख का पर्सनल लोन लेती है',
        calculation: 'P = ₹5,00,000\nR = 12% / 12 / 100 = 0.01 (1% per month)\nN = 60 months\n\nEMI = [5,00,000 × 0.01 × (1.01)^60] / [(1.01)^60 - 1]\nEMI = ₹11,122 per month\n\nTotal Payment = ₹11,122 × 60 = ₹6,67,320\nTotal Interest = ₹6,67,320 - ₹5,00,000 = ₹1,67,320',
        result: 'Monthly EMI: ₹11,122 | Total Interest: ₹1,67,320 | Total Payment: ₹6,67,320'
      },
      tips: [
        'Use EMI calculator before applying for any loan',
        'Ensure EMI does not exceed 40-50% of your monthly income',
        'Prepay loans whenever possible to reduce interest burden',
        'Set up auto-debit to avoid missing EMI payments',
        'Track EMI schedule monthly to know principal vs interest split'
      ],
      tipsHindi: [
        'किसी भी लोन के लिए आवेदन करने से पहले EMI कैलकुलेटर का उपयोग करें',
        'सुनिश्चित करें कि EMI आपकी मासिक आय के 40-50% से अधिक न हो',
        'ब्याज बोझ कम करने के लिए जब भी संभव हो लोन का प्रीपेमेंट करें',
        'EMI भुगतान मिस करने से बचने के लिए ऑटो-डेबिट सेट करें',
        'मूलधन बनाम ब्याज विभाजन जानने के लिए मासिक EMI शेड्यूल ट्रैक करें'
      ],
      relatedTools: ['/calculators/emi-calculator', '/calculators/loan-affordability-calculator'],
      relatedLessons: ['what-is-loan', 'simple-vs-compound-interest', 'loan-tenure-impact']
    },
    seoKeywords: ['what is EMI', 'EMI meaning', 'how EMI works', 'EMI calculation formula', 'EMI kya hai'],
    estimatedReadTime: 10,
    difficulty: 'Beginner'
  }
];

// Navigation structure for sidebar
export const loanLearningNavigation = {
  title: 'Loans & Credit Mastery',
  titleHindi: 'लोन और क्रेडिट में महारत',
  sections: [
    {
      title: 'Getting Started',
      lessons: ['what-is-loan', 'secured-vs-unsecured-loans', 'how-emi-works']
    },
    {
      title: 'Loan Fundamentals',
      lessons: ['simple-vs-compound-interest', 'loan-tenure-impact', 'collateral-explained', 'fixed-vs-floating-rates']
    },
    {
      title: 'Loan Application',
      lessons: ['check-loan-eligibility', 'loan-agreement-guide', 'documents-required', 'cibil-score-impact']
    },
    {
      title: 'Loan Types Deep Dive',
      lessons: ['home-loans-guide', 'personal-loans-guide', 'car-loans-guide', 'education-loans-guide']
    },
    {
      title: 'Advanced Concepts',
      lessons: ['calculate-true-loan-cost', 'loan-default-consequences', 'loan-repayment-options', 'compare-loan-offers']
    },
    {
      title: 'Practice & Test',
      lessons: ['loan-calculators', 'quiz-loan-basics', 'certificate']
    }
  ]
};

