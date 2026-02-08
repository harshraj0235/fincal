/**
 * Money Management & Budgeting - Complete Lesson Registry
 * Category: money-management
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

export const moneyManagementCategory = {
  id: 'money-management',
  slug: 'money-management',
  name: 'Money Management & Budgeting',
  nameHindi: 'पैसे का प्रबंधन और बजट',
  icon: '💰',
  description: 'Master the fundamentals of money management, budgeting, and building financial discipline',
  descriptionHindi: 'पैसे के प्रबंधन, बजट बनाने और वित्तीय अनुशासन की बुनियादी बातें सीखें',
  color: 'from-green-500 to-emerald-600',
  totalLessons: 8,
  estimatedHours: 6
};

export const moneyManagementLessons: LearnLesson[] = [
  {
    id: 'what-is-money',
    slug: 'what-is-money-income-expenses-wealth',
    title: 'What is Money? Understanding Income, Expenses & Wealth',
    titleHindi: 'पैसा क्या है? आय, खर्च और संपत्ति को समझें',
    description: 'Learn the fundamental concepts of money, income streams, expense categories, and wealth building in the Indian context',
    descriptionHindi: 'भारतीय संदर्भ में पैसे, आय के स्रोतों, खर्च की श्रेणियों और संपत्ति निर्माण की मूल अवधारणाओं को सीखें',
    duration: '45 mins',
    difficulty: 'beginner',
    tags: ['Money Basics', 'Income', 'Expenses', 'Wealth', 'Hindi'],
    relatedCalculators: ['/calculators/income-tax', '/calculators/budget-planner', '/calculators/net-worth'],
    order: 1
  },
  {
    id: 'financial-goals',
    slug: 'setting-financial-goals-short-medium-long-term',
    title: 'Setting Financial Goals (Short-, Medium-, Long-Term)',
    titleHindi: 'वित्तीय लक्ष्य निर्धारित करना (छोटी, मध्यम, लंबी अवधि)',
    description: 'Learn how to set SMART financial goals for different time horizons and create actionable plans to achieve them',
    descriptionHindi: 'विभिन्न समय सीमा के लिए SMART वित्तीय लक्ष्य कैसे निर्धारित करें और उन्हें प्राप्त करने के लिए कार्य योजना बनाएं',
    duration: '50 mins',
    difficulty: 'beginner',
    tags: ['Goal Setting', 'Financial Planning', 'SMART Goals', 'Hindi'],
    relatedCalculators: ['/calculators/sip-calculator', '/calculators/goal-planner', '/calculators/retirement-calculator'],
    order: 2
  },
  {
    id: 'budgeting-guide',
    slug: 'budgeting-how-to-track-income-expenses-india',
    title: 'Budgeting: How to Track Income & Expenses',
    titleHindi: 'बजट बनाना: आय और खर्चों को कैसे ट्रैक करें',
    description: 'Master the art of budgeting with practical Indian examples, 50-30-20 rule, 5 budgeting methods, and effective expense tracking',
    descriptionHindi: 'व्यावहारिक भारतीय उदाहरणों, 50-30-20 नियम, 5 बजट विधियों और प्रभावी खर्च ट्रैकिंग के साथ बजट बनाने की कला में महारत हासिल करें',
    duration: '55 mins',
    difficulty: 'beginner',
    tags: ['Budgeting', '50-30-20 Rule', 'Expense Tracking', 'Zero-Based', 'Envelope Method', 'Hindi'],
    relatedCalculators: ['/calculators/budget-calculator', '/calculators/budget-planner', '/calculators/expense-tracker'],
    order: 3
  },
  {
    id: 'emergency-fund',
    slug: 'building-emergency-fund-india-6-12-months',
    title: 'Building an Emergency Fund: The Financial Safety Net',
    titleHindi: 'आपातकालीन फंड बनाना: वित्तीय सुरक्षा जाल',
    description: 'Learn why an emergency fund is crucial, how much to save (6-12 months), where to keep it, and step-by-step building strategies for Indians',
    descriptionHindi: 'जानें कि आपातकालीन फंड क्यों महत्वपूर्ण है, कितनी बचत करें (6-12 महीने), इसे कहां रखें, और भारतीयों के लिए चरण-दर-चरण निर्माण रणनीतियां',
    duration: '50 mins',
    difficulty: 'beginner',
    tags: ['Emergency Fund', 'Financial Safety', 'Savings', 'Hindi'],
    relatedCalculators: ['/calculators/emergency-fund', '/calculators/savings-goal', '/calculators/compound-interest'],
    order: 4
  },
  {
    id: 'cash-flow-net-worth',
    slug: 'cash-flow-net-worth-assets-vs-liabilities-india',
    title: 'Cash Flow & Net Worth: Assets vs Liabilities',
    titleHindi: 'कैश फ्लो और नेट वर्थ: संपत्ति बनाम देनदारियां',
    description: 'Understand the difference between assets and liabilities, calculate your net worth, and manage cash flow effectively',
    descriptionHindi: 'संपत्ति और देनदारियों के बीच अंतर को समझें, अपनी नेट वर्थ की गणना करें, और कैश फ्लो को प्रभावी ढंग से प्रबंधित करें',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Net Worth', 'Cash Flow', 'Assets', 'Liabilities', 'Hindi'],
    relatedCalculators: ['/calculators/net-worth', '/calculators/cash-flow', '/calculators/asset-allocation'],
    order: 5
  },
  {
    id: 'financial-habits',
    slug: 'financial-habits-saving-first-spending-later-discipline',
    title: 'Financial Habits: Saving-First, Spending-Later',
    titleHindi: 'वित्तीय आदतें: पहले बचत, बाद में खर्च',
    description: 'Develop powerful financial habits like paying yourself first, automating savings, and building long-term wealth discipline',
    descriptionHindi: 'खुद को पहले भुगतान करना, बचत को स्वचालित करना, और दीर्घकालिक धन अनुशासन बनाने जैसी शक्तिशाली वित्तीय आदतें विकसित करें',
    duration: '40 mins',
    difficulty: 'beginner',
    tags: ['Habits', 'Discipline', 'Automation', 'Savings', 'Hindi'],
    relatedCalculators: ['/calculators/sip-calculator', '/calculators/savings-calculator', '/calculators/goal-planner'],
    order: 6
  },
  {
    id: 'review-budget',
    slug: 'reviewing-adjusting-budget-monthly-quarterly-annual',
    title: 'Reviewing & Adjusting Your Budget: Stay on Track',
    titleHindi: 'अपने बजट की समीक्षा और समायोजन: ट्रैक पर बने रहें',
    description: 'Learn how to review your budget monthly, identify overspending, adjust for life changes, and stay financially disciplined',
    descriptionHindi: 'जानें कि मासिक बजट की समीक्षा कैसे करें, अधिक खर्च की पहचान करें, जीवन परिवर्तनों के लिए समायोजन करें, और वित्तीय रूप से अनुशासित रहें',
    duration: '35 mins',
    difficulty: 'intermediate',
    tags: ['Budget Review', 'Financial Discipline', 'Tracking', 'Hindi'],
    relatedCalculators: ['/calculators/budget-calculator', '/calculators/expense-tracker', '/calculators/savings-goal'],
    order: 7
  },
  {
    id: 'common-mistakes',
    slug: 'financial-mistakes-to-avoid-impulse-spending-india',
    title: 'Financial Mistakes to Avoid: Impulse Spending, Lack of Planning',
    titleHindi: 'वित्तीय गलतियों से बचें: आवेगपूर्ण खर्च, योजना की कमी',
    description: 'Discover the top 15 financial mistakes Indians make, from impulse buying to lack of emergency fund, and how to avoid them',
    descriptionHindi: 'भारतीयों द्वारा की जाने वाली शीर्ष 15 वित्तीय गलतियों को जानें, आवेगपूर्ण खरीदारी से लेकर आपातकालीन फंड की कमी तक, और उनसे कैसे बचें',
    duration: '40 mins',
    difficulty: 'beginner',
    tags: ['Mistakes', 'Spending', 'Planning', 'Financial Discipline', 'Hindi'],
    relatedCalculators: ['/calculators/debt-payoff', '/calculators/emergency-fund', '/calculators/savings-calculator'],
    order: 8
  }
];

// SEO keywords for the category
export const moneyManagementSEO = {
  metaTitle: 'Money Management & Budgeting Guide for Indians | MoneyCal Learn',
  metaDescription: 'Learn money management, budgeting, emergency fund creation, and financial habits in Hindi & English. 8 comprehensive lessons with Indian examples, calculators & expert tips.',
  keywords: 'money management India, budgeting guide Hindi, emergency fund calculator, financial habits, income expense tracking, net worth calculation, personal finance basics India, वित्तीय प्रबंधन, बजट बनाना',
  canonicalUrl: 'https://moneycal.in/learn/money-management'
};

