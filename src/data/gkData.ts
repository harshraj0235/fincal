// GK Data - Categories, Topics, and MCQ Types

export type MCQ = {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type GKTopic = {
  slug: string;
  name: string;
  description: string;
  questionCount: number;
};

export type GKCategory = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  topics: GKTopic[];
};

export const gkCategories: GKCategory[] = [
  {
    slug: 'best-gk',
    name: 'Best GK',
    description: 'Best GK Question In Hindi — सबसे लोकप्रिय सामान्य ज्ञान प्रश्न',
    icon: '🏆',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    topics: [{ slug: 'best-gk-question-in-hindi-best-gk-in-hindi', name: 'Best GK In Hindi', description: 'उच्च गुणवत्ता वाले सामान्य ज्ञान प्रश्न', questionCount: 200 }],
  },
  {
    slug: 'general-gk',
    name: 'General GK',
    description: 'General Knowledge in Hindi — सामान्य ज्ञान के महत्वपूर्ण प्रश्न',
    icon: '📚',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    topics: [{ slug: 'general-knowledge-in-hindi', name: 'General Knowledge In Hindi', description: 'सामान्य ज्ञान के लोकप्रिय प्रश्न', questionCount: 200 }],
  },
  {
    slug: 'india-gk',
    name: 'India GK',
    description: 'India GK Questions in Hindi — भारत से जुड़े प्रश्न',
    icon: '🇮🇳',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    topics: [
      { slug: 'national-symbols-gk-in-hindi', name: 'National Symbols GK', description: 'भारत के राष्ट्रीय प्रतीकों पर प्रश्न', questionCount: 200 },
      { slug: 'india-gk-questions-in-hindi', name: 'India GK In Hindi', description: 'भारत से जुड़े सामान्य ज्ञान प्रश्न', questionCount: 200 },
    ],
  },
  {
    slug: 'school-gk',
    name: 'School GK',
    description: 'कक्षा 6 से 10 तक के लिए GK प्रश्न',
    icon: '🎓',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-600',
    topics: [
      { slug: 'kids-gk-in-hindi', name: 'Kids GK In Hindi', description: 'बच्चों के लिए सामान्य ज्ञान', questionCount: 200 },
      { slug: 'class-6-gk-questions-in-hindi', name: 'Class 6 GK In Hindi', description: 'कक्षा 6 के GK प्रश्न', questionCount: 200 },
      { slug: 'class-7-gk-questions-in-hindi', name: 'Class 7 GK In Hindi', description: 'कक्षा 7 के GK प्रश्न', questionCount: 200 },
      { slug: 'class-8-gk-questions-in-hindi', name: 'Class 8 GK In Hindi', description: 'कक्षा 8 के GK प्रश्न', questionCount: 200 },
      { slug: 'class-9-gk-questions-in-hindi', name: 'Class 9 GK In Hindi', description: 'कक्षा 9 के GK प्रश्न', questionCount: 200 },
      { slug: 'class-10-gk-questions-in-hindi', name: 'Class 10 GK In Hindi', description: 'कक्षा 10 के GK प्रश्न', questionCount: 200 },
    ],
  },
  {
    slug: 'competitive-exams',
    name: 'Competitive Exams',
    description: 'SSC, बैंक, रेलवे और UPSC परीक्षा GK',
    icon: '🎯',
    color: 'red',
    gradient: 'from-red-500 to-rose-600',
    topics: [
      { slug: 'competitive-exam-gk-in-hindi', name: 'Competitive Exam GK In Hindi', description: 'प्रतियोगी परीक्षाओं के लिए GK', questionCount: 200 },
      { slug: 'ssc-gk-questions-in-hindi', name: 'SSC GK In Hindi', description: 'SSC के लिए GK प्रश्न', questionCount: 200 },
      { slug: 'railway-gk-questions-in-hindi', name: 'Railway GK', description: 'रेलवे भर्ती परीक्षा के लिए', questionCount: 200 },
      { slug: 'banking-gk-questions-in-hindi', name: 'Banking GK', description: 'RBI, बैंकिंग टर्म्स, और फाइनेंस', questionCount: 50 },
      { slug: 'upsc-gk-questions-in-hindi', name: 'UPSC GK', description: 'IAS, PCS परीक्षा के लिए', questionCount: 200 },
    ],
  },
  {
    slug: 'subject-gk',
    name: 'Subject-Wise GK',
    description: 'विषय आधारित सामान्य ज्ञान प्रश्न',
    icon: '📚',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    topics: [
      { slug: 'indian-polity-gk-in-hindi', name: 'Indian Polity GK', description: 'संविधान और राजनीति', questionCount: 200 },
      { slug: 'indian-history-gk-in-hindi', name: 'Indian History GK', description: 'प्राचीन, मध्यकालीन, आधुनिक भारत', questionCount: 200 },
      { slug: 'indian-geography-gk-in-hindi', name: 'Indian Geography GK', description: 'नदियाँ, भूगोल, प्रादेशिक ज्ञान', questionCount: 200 },
      { slug: 'science-gk-questions-in-hindi', name: 'Science GK', description: 'भौतिकी, रसायन, जीवविज्ञान', questionCount: 200 },
      { slug: 'economy-gk-in-hindi', name: 'Economy GK', description: 'बजट, बैंकिंग, आर्थिक अवधारणाएँ', questionCount: 50 },
      { slug: 'space-gk-and-isro-in-hindi', name: 'Space GK', description: 'ISRO, ग्रह और अंतरिक्ष', questionCount: 200 },
      { slug: 'art-and-culture-gk-in-hindi', name: 'Art & Culture GK', description: 'नृत्य, लोककला, संस्कृति', questionCount: 200 },
      { slug: 'literature-gk-in-hindi', name: 'Literature GK', description: 'हिंदी साहित्य, लेखक, रचनाएँ', questionCount: 200 },
      { slug: 'world-gk-questions-in-hindi', name: 'World GK In Hindi', description: 'विश्व सामान्य ज्ञान प्रश्न', questionCount: 200 },
    ],
  },
  {
    slug: 'language-gk',
    name: 'Language GK',
    description: 'हिंदी व्याकरण और भाषा आधारित प्रश्न',
    icon: '✍️',
    color: 'pink',
    gradient: 'from-pink-500 to-fuchsia-600',
    topics: [{ slug: 'hindi-grammar-gk', name: 'Hindi Grammar GK', description: 'हिंदी व्याकरण पर प्रश्न', questionCount: 200 }],
  },
];

// Helper: get all topics flat
export const getAllTopics = () => gkCategories.flatMap(c => c.topics.map(t => ({ ...t, category: c })));
export const getTotalQuestionCount = () => gkCategories.reduce((sum, c) => sum + c.topics.reduce((s, t) => s + t.questionCount, 0), 0);
