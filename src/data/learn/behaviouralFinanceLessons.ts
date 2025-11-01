/**
 * Behavioural Finance & Money Psychology - Complete Lesson Registry
 * Category: behavioural-finance
 * Total Lessons: 7 comprehensive lessons  
 * Target: All Indian investors (Hindi + English)
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

export const behaviouralFinanceCategory = {
  id: 'behavioural-finance',
  slug: 'behavioural-finance-money-psychology',
  name: 'Behavioural Finance & Money Psychology',
  nameHindi: 'व्यवहारिक वित्त और धन मनोविज्ञान',
  icon: '🧠',
  description: 'Money mindset, investing biases, emotional investing, money habits, wealth psychology for Indians',
  descriptionHindi: 'धन मानसिकता, निवेश पूर्वाग्रह, भावनात्मक निवेश, धन आदतें, भारतीयों के लिए धन मनोविज्ञान',
  color: 'from-pink-500 to-purple-600',
  totalLessons: 7,
  estimatedHours: 5
};

export const behaviouralFinanceLessons: LearnLesson[] = [
  {
    id: 'money-mindset-psychology',
    slug: 'money-mindset-psychology-scarcity-vs-abundance-wealth-india-2025',
    title: 'Money Mindset & Psychology: Scarcity vs Abundance, Wealth Consciousness (India 2025)',
    titleHindi: 'धन मानसिकता और मनोविज्ञान: कमी बनाम प्रचुरता, धन चेतना (भारत 2025)',
    description: 'Develop wealth mindset: Scarcity vs abundance mentality, money beliefs from childhood, breaking poverty cycle, wealth consciousness, positive money affirmations',
    descriptionHindi: 'धन मानसिकता विकसित करें: कमी बनाम प्रचुरता मानसिकता, बचपन से धन विश्वास, गरीबी चक्र तोड़ना, धन चेतना, सकारात्मक धन पुष्टि',
    duration: '45 mins',
    difficulty: 'beginner',
    tags: ['Money Mindset', 'Wealth Psychology', 'Abundance Mentality', 'Hindi'],
    relatedCalculators: [],
    order: 1
  },
  {
    id: 'investing-biases',
    slug: 'investing-biases-cognitive-errors-herd-mentality-confirmation-bias-india-2025',
    title: 'Investing Biases: Cognitive Errors, Herd Mentality, Confirmation Bias (India 2025)',
    titleHindi: 'निवेश पूर्वाग्रह: संज्ञानात्मक त्रुटियां, भीड़ मानसिकता, पुष्टि पूर्वाग्रह (भारत 2025)',
    description: 'Overcome biases: Herd mentality (buying because everyone is buying), confirmation bias (only reading news that confirms your view), recency bias, loss aversion, anchoring',
    descriptionHindi: 'पूर्वाग्रहों पर काबू पाएं: भीड़ मानसिकता (सभी खरीद रहे हैं इसलिए खरीदना), पुष्टि पूर्वाग्रह (केवल वही समाचार पढ़ना जो आपके दृष्टिकोण की पुष्टि करता है), हाल की पूर्वाग्रह, हानि से बचने, लंगर डालना',
    duration: '50 mins',
    difficulty: 'intermediate',
    tags: ['Investing Biases', 'Herd Mentality', 'Cognitive Errors', 'Hindi'],
    relatedCalculators: [],
    order: 2
  },
  {
    id: 'emotional-investing',
    slug: 'emotional-investing-fear-greed-panic-selling-fomo-india-2025',
    title: 'Emotional Investing: Fear, Greed, Panic Selling, FOMO (Fear of Missing Out) India 2025',
    titleHindi: 'भावनात्मक निवेश: भय, लालच, पैनिक सेलिंग, FOMO (छूट जाने का डर) भारत 2025',
    description: 'Control emotions: Fear (selling at bottom), greed (buying at top), panic selling during crashes, FOMO (buying because friends made profit), how to stay rational',
    descriptionHindi: 'भावनाओं को नियंत्रित करें: भय (तल पर बेचना), लालच (शीर्ष पर खरीदना), दुर्घटनाओं के दौरान पैनिक सेलिंग, FOMO (दोस्तों ने लाभ कमाया इसलिए खरीदना), तर्कसंगत कैसे रहें',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Emotional Investing', 'Fear', 'Greed', 'FOMO', 'Hindi'],
    relatedCalculators: [],
    order: 3
  },
  {
    id: 'money-habits',
    slug: 'money-habits-discipline-delayed-gratification-compound-effect-india-2025',
    title: 'Money Habits: Discipline, Delayed Gratification, Compound Effect (India 2025)',
    titleHindi: 'धन आदतें: अनुशासन, विलंबित संतुष्टि, चक्रवृद्धि प्रभाव (भारत 2025)',
    description: 'Build wealth habits: Pay yourself first, automate savings, delayed gratification (save today for tomorrow), compound effect of small daily actions, 1% improvement daily',
    descriptionHindi: 'धन आदतें बनाएं: पहले खुद को भुगतान करें, बचत स्वचालित करें, विलंबित संतुष्टि (कल के लिए आज बचाएं), छोटी दैनिक कार्रवाइयों का चक्रवृद्धि प्रभाव, दैनिक 1% सुधार',
    duration: '40 mins',
    difficulty: 'beginner',
    tags: ['Money Habits', 'Discipline', 'Delayed Gratification', 'Hindi'],
    relatedCalculators: [],
    order: 4
  },
  {
    id: 'wealth-building-strategies',
    slug: 'wealth-building-strategies-get-rich-slow-consistency-patience-india-2025',
    title: 'Wealth Building Strategies: Get Rich Slow, Consistency, Patience (India 2025)',
    titleHindi: 'धन निर्माण रणनीतियां: धीरे-धीरे अमीर बनें, निरंतरता, धैर्य (भारत 2025)',
    description: 'Build wealth slowly: No get-rich-quick schemes, consistency beats intensity, patience (20+ year horizon), avoiding lottery mentality, sustainable wealth creation',
    descriptionHindi: 'धीरे-धीरे धन बनाएं: कोई जल्दी अमीर बनने की योजना नहीं, निरंतरता तीव्रता को हराती है, धैर्य (20+ वर्ष क्षितिज), लॉटरी मानसिकता से बचना, टिकाऊ धन निर्माण',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Wealth Building', 'Consistency', 'Patience', 'Long-term Investing', 'Hindi'],
    relatedCalculators: [],
    order: 5
  },
  {
    id: 'financial-independence',
    slug: 'financial-independence-fire-movement-early-retirement-india-2025',
    title: 'Financial Independence & FIRE: Early Retirement at 40 (India 2025)',
    titleHindi: 'वित्तीय स्वतंत्रता और FIRE: 40 पर जल्दी रिटायरमेंट (भारत 2025)',
    description: 'Achieve FIRE (Financial Independence Retire Early): Save 50-70% of income, invest aggressively, FI number calculation (25× annual expenses), coast FIRE, barista FIRE',
    descriptionHindi: 'FIRE प्राप्त करें (वित्तीय स्वतंत्रता जल्दी रिटायर): आय का 50-70% बचाएं, आक्रामक रूप से निवेश करें, FI नंबर गणना (वार्षिक खर्च का 25×), कोस्ट FIRE, बरिस्ता FIRE',
    duration: '50 mins',
    difficulty: 'advanced',
    tags: ['Financial Independence', 'FIRE', 'Early Retirement', 'Hindi'],
    relatedCalculators: ['/calculators/retirement-calculator'],
    order: 6
  },
  {
    id: 'money-relationships',
    slug: 'money-relationships-family-finance-couples-money-management-india-2025',
    title: 'Money & Relationships: Family Finance, Couples Money Management (India 2025)',
    titleHindi: 'धन और रिश्ते: पारिवारिक वित्त, जोड़ों के लिए धन प्रबंधन (भारत 2025)',
    description: 'Manage money in relationships: Discussing finances with partner, joint vs separate accounts, financial goals alignment, teaching kids about money, family budget meetings',
    descriptionHindi: 'रिश्तों में धन प्रबंधित करें: साथी के साथ वित्त पर चर्चा, संयुक्त बनाम अलग खाते, वित्तीय लक्ष्य संरेखण, बच्चों को धन के बारे में सिखाना, पारिवारिक बजट बैठकें',
    duration: '45 mins',
    difficulty: 'intermediate',
    tags: ['Money Relationships', 'Family Finance', 'Couples Money', 'Hindi'],
    relatedCalculators: [],
    order: 7
  }
];

// SEO keywords for the category
export const behaviouralFinanceSEO = {
  metaTitle: 'Behavioural Finance & Money Psychology Guide for Indians | MoneyCal Learn',
  metaDescription: 'Master money mindset, overcome investing biases (herd mentality, FOMO), control emotional investing, build wealth habits, achieve financial independence (FIRE), manage money in relationships in Hindi & English. 7 comprehensive lessons on wealth psychology.',
  keywords: 'money mindset India, investing biases, emotional investing, FOMO, wealth habits, FIRE financial independence, money relationships, व्यवहारिक वित्त, धन मनोविज्ञान',
  canonicalUrl: 'https://moneycal.in/learn/behavioural-finance-money-psychology'
};





