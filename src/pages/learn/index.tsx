import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, TrendingUp, Sparkles, 
  ArrowRight, Clock, Target, Zap, Filter, X, Star,
  Calculator, IndianRupee, PieChart
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { ResponsiveAd } from '../../components/BannerAd';

// Import all lesson data for comprehensive search
import { moneyManagementLessons } from '../../data/learn/moneyManagementLessons';
import { savingsBankLessons } from '../../data/learn/savingsBankLessons';
import { investingLessons } from '../../data/learn/investingLessons';
import { insuranceRetirementLessons } from '../../data/learn/insuranceRetirementLessons';
import { taxationLessons } from '../../data/learn/taxationLessons';
import { fintechLessons } from '../../data/learn/fintechLessons';
import { behaviouralFinanceLessons } from '../../data/learn/behaviouralFinanceLessons';
import { businessFinanceLessons } from '../../data/learn/businessFinanceLessons';
import { advancedFinanceLessons } from '../../data/learn/advancedFinanceLessons';
import { msmeSchemes } from '../../data/silos/msmeSubsidiesData';
import { landRecordGuides } from '../../data/silos/landRecordsData';
import { scholarships } from '../../data/silos/scholarshipsData';
import { youthBankingProducts } from '../../data/silos/youthBankingData';
import { taxationUpdates } from '../../data/silos/taxation2026Data';
import { scamReports } from '../../data/silos/scamDiagnosticsData';
import { tradingTerminalGuides } from '../../data/silos/tradingTerminalsData';
import { macroTrends } from '../../data/silos/macroTrendsData';
import { insuranceNiches } from '../../data/silos/insuranceNicheData';

/**
 * MoneyCal Learn - Premium Financial Education Platform
 * 18 Categories | 200+ Comprehensive Lessons | 76+ Featured Lessons in 9 Core Categories
 * Advanced Search | Mobile Optimized | SEO-Optimized | Google-Friendly
 * Updated: Nov 1, 2025 - All core categories now have 8+ lessons
 */

interface Category {
  id: string;
  name: string;
  nameHindi: string;
  icon: string;
  description: string;
  lessonsCount: number;
  duration: string;
  level: string;
  route: string;
  color: string;
  tags: string[];
  featured?: boolean;
}

interface SearchableLesson {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  description: string;
  tags: string[];
  category: string;
  categoryIcon: string;
  route: string;
  difficulty: string;
  duration: string;
}

const LearnHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Comprehensive lesson database for search (ALL lessons from all categories)
  const allLessons: SearchableLesson[] = useMemo(() => {
    const lessons: SearchableLesson[] = [];
    
    // Money Management
    moneyManagementLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'Money Management',
        categoryIcon: '💰',
        route: `/learn/money-management/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // Savings & Bank
    savingsBankLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'Savings & Bank Products',
        categoryIcon: '🏦',
        route: `/learn/savings-bank-products/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // Investing
    investingLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'Investing & Wealth',
        categoryIcon: '📈',
        route: `/learn/investing-wealth/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // Insurance & Retirement
    insuranceRetirementLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'Insurance & Retirement',
        categoryIcon: '🛡️',
        route: `/learn/insurance-retirement/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // Taxation
    taxationLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'Taxation & Compliance',
        categoryIcon: '📋',
        route: `/learn/taxation-compliance/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // FinTech
    fintechLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'FinTech & Digital Payments',
        categoryIcon: '💳',
        route: `/learn/fintech-digital-payments/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // Behavioural Finance
    behaviouralFinanceLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'Behavioural Finance',
        categoryIcon: '🧠',
        route: `/learn/behavioural-finance-money-psychology/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // Business Finance
    businessFinanceLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'Business Finance',
        categoryIcon: '💼',
        route: `/learn/business-finance-entrepreneurship/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // Advanced Finance
    advancedFinanceLessons.forEach(lesson => {
      lessons.push({
        ...lesson,
        category: 'Advanced Finance',
        categoryIcon: '🎓',
        route: `/learn/advanced-specialised-finance/${lesson.slug}`,
        difficulty: lesson.difficulty
      });
    });

    // --- 2026 Strategic Silos ---
    msmeSchemes.forEach((s: any) => lessons.push({ ...s, category: 'MSME & Subsidies', categoryIcon: '💼', route: `/msme-subsidies/${s.slug}`, difficulty: 'intermediate', duration: '5h', tags: s.keywords }));
    landRecordGuides.forEach((s: any) => lessons.push({ ...s, category: 'Land Records', categoryIcon: '🗺️', route: `/land-records/${s.slug}`, difficulty: 'beginner', duration: '4h', tags: s.keywords }));
    scholarships.forEach((s: any) => lessons.push({ ...s, category: 'Scholarships', categoryIcon: '🎓', route: `/scholarships/${s.slug}`, difficulty: 'beginner', duration: '4h', tags: s.keywords }));
    youthBankingProducts.forEach((s: any) => lessons.push({ ...s, category: 'Youth Banking', categoryIcon: '💳', route: `/youth-banking/${s.slug}`, difficulty: 'beginner', duration: '5h', tags: s.keywords }));
    taxationUpdates.forEach((s: any) => lessons.push({ ...s, category: 'Taxation 2026', categoryIcon: '📋', route: `/taxation-2026/${s.slug}`, difficulty: 'intermediate', duration: '6h', tags: s.keywords }));
    scamReports.forEach((s: any) => lessons.push({ ...s, category: 'Scam Diagnostics', categoryIcon: '🛡️', route: `/scam-diagnostics/${s.slug}`, difficulty: 'beginner', duration: '3h', tags: s.keywords }));
    tradingTerminalGuides.forEach((s: any) => lessons.push({ ...s, category: 'Trading Terminals', categoryIcon: '📈', route: `/trading-terminals/${s.slug}`, difficulty: 'advanced', duration: '7h', tags: s.keywords }));
    macroTrends.forEach((s: any) => lessons.push({ ...s, category: 'Macro Trends', categoryIcon: '🌍', route: `/macro-trends/${s.slug}`, difficulty: 'intermediate', duration: '5h', tags: s.keywords }));
    insuranceNiches.forEach((s: any) => lessons.push({ ...s, category: 'Insurance Niche', categoryIcon: '🛡️', route: `/insurance-niche/${s.slug}`, difficulty: 'intermediate', duration: '4h', tags: s.keywords }));

    return lessons;
  }, []);

  // All 18 Categories with Complete Data
  const allCategories: Category[] = [
    {
      id: 'money-management',
      name: 'Money Management & Budgeting',
      nameHindi: 'धन प्रबंधन और बजट',
      icon: '💰',
      description: 'Master budgeting, emergency funds, cash flow, and wealth-building habits for Indians',
      lessonsCount: 8,
      duration: '6h',
      level: 'Beginner',
      route: '/learn/money-management',
      color: 'from-emerald-500 to-green-600',
      tags: ['budgeting', 'emergency fund', 'financial habits', 'cash flow', 'बजट', 'आपातकालीन फंड'],
      featured: true
    },
    {
      id: 'savings-bank',
      name: 'Savings & Bank Products',
      nameHindi: 'बचत और बैंक उत्पाद',
      icon: '🏦',
      description: 'FD, RD, savings accounts, and maximize bank returns in India',
      lessonsCount: 8,
      duration: '5h',
      level: 'Beginner',
      route: '/learn/savings-bank-products',
      color: 'from-cyan-500 to-blue-600',
      tags: ['FD', 'RD', 'savings account', 'bank products', 'फिक्स्ड डिपॉजिट', 'बचत खाता'],
      featured: true
    },
    {
      id: 'investing',
      name: 'Investing & Wealth Creation',
      nameHindi: 'निवेश और संपत्ति निर्माण',
      icon: '📈',
      description: 'Stocks, mutual funds, SIPs, asset allocation for long-term wealth building',
      lessonsCount: 10,
      duration: '8h',
      level: 'Mixed',
      route: '/learn/investing-wealth',
      color: 'from-purple-500 to-indigo-600',
      tags: ['stock market', 'mutual funds', 'SIP', 'investing', 'शेयर बाजार', 'निवेश'],
      featured: true
    },
    {
      id: 'insurance',
      name: 'Insurance, Retirement & Estate',
      nameHindi: 'बीमा, सेवानिवृत्ति और संपत्ति',
      icon: '🛡️',
      description: 'Life, health insurance, NPS, retirement planning, PPF, EPF, estate basics',
      lessonsCount: 8,
      duration: '6h',
      level: 'Intermediate',
      route: '/learn/insurance-retirement',
      color: 'from-red-500 to-orange-600',
      tags: ['insurance', 'retirement', 'NPS', 'PPF', 'EPF', 'बीमा', 'सेवानिवृत्ति'],
      featured: true
    },
    {
      id: 'taxation',
      name: 'Taxation & Compliance',
      nameHindi: 'कर और अनुपालन',
      icon: '📋',
      description: 'Income tax, 80C deductions, ITR filing, TDS, and tax optimization strategies',
      lessonsCount: 8,
      duration: '5h',
      level: 'Intermediate',
      route: '/learn/taxation-compliance',
      color: 'from-yellow-500 to-amber-600',
      tags: ['income tax', '80C', 'ITR filing', 'tax saving', 'आयकर', 'कर बचत'],
      featured: true
    },
    {
      id: 'fintech',
      name: 'FinTech & Digital Payments',
      nameHindi: 'फिनटेक और डिजिटल भुगतान',
      icon: '📱',
      description: 'UPI, digital wallets, online banking, payment security, and cybersecurity',
      lessonsCount: 8,
      duration: '5h',
      level: 'Beginner',
      route: '/learn/fintech-digital-payments',
      color: 'from-blue-500 to-cyan-600',
      tags: ['UPI', 'digital wallet', 'online banking', 'payment security', 'यूपीआई', 'डिजिटल भुगतान'],
      featured: true
    },
    {
      id: 'business',
      name: 'Business Finance & Entrepreneurship',
      nameHindi: 'व्यवसाय वित्त और उद्यमिता',
      icon: '🚀',
      description: 'Startup funding, business loans, cash flow, GST, scaling strategies for entrepreneurs',
      lessonsCount: 8,
      duration: '6h',
      level: 'Advanced',
      route: '/learn/business-finance-entrepreneurship',
      color: 'from-lime-500 to-green-600',
      tags: ['startup funding', 'business loans', 'GST', 'cash flow', 'स्टार्टअप', 'व्यवसाय'],
      featured: true
    },
    {
      id: 'advanced',
      name: 'Advanced & Specialised Finance',
      nameHindi: 'उन्नत और विशेष वित्त',
      icon: '⚡',
      description: 'Real estate, commodities, derivatives, cryptocurrency, global investing',
      lessonsCount: 8,
      duration: '7h',
      level: 'Advanced',
      route: '/learn/advanced-specialised-finance',
      color: 'from-violet-500 to-purple-600',
      tags: ['real estate', 'commodities', 'derivatives', 'crypto', 'F&O', 'रियल एस्टेट'],
      featured: true
    },
    {
      id: 'behavioural',
      name: 'Behavioural Finance & Psychology',
      nameHindi: 'व्यवहार वित्त और मनोविज्ञान',
      icon: '🧠',
      description: 'Money mindset, biases, habits, emotional investing, FIRE movement',
      lessonsCount: 8,
      duration: '5h',
      level: 'Mixed',
      route: '/learn/behavioural-finance-money-psychology',
      color: 'from-fuchsia-500 to-pink-600',
      tags: ['money mindset', 'FIRE', 'investing biases', 'wealth habits', 'धन मनोविज्ञान'],
      featured: true
    },
    {
      id: 'loans',
      name: 'Loan Basics & Fundamentals',
      nameHindi: 'लोन की बुनियादी बातें',
      icon: '📚',
      description: 'EMI, interest rates, CIBIL score, eligibility, secured vs unsecured loans',
      lessonsCount: 20,
      duration: '8h',
      level: 'Beginner',
      route: '/learn/loans',
      color: 'from-blue-500 to-indigo-600',
      tags: ['loan basics', 'EMI', 'CIBIL', 'interest rates', 'लोन', 'ईएमआई']
    },
    {
      id: 'home-loans',
      name: 'Home Loans Complete Guide',
      nameHindi: 'होम लोन संपूर्ण गाइड',
      icon: '🏠',
      description: 'Home loan eligibility, tax benefits, prepayment, balance transfer, PMAY',
      lessonsCount: 20,
      duration: '10h',
      level: 'Intermediate',
      route: '/learn/home-loans',
      color: 'from-green-500 to-emerald-600',
      tags: ['home loan', 'tax benefits', 'PMAY', 'balance transfer', 'होम लोन']
    },
    {
      id: 'personal-loans',
      name: 'Personal Loans Mastery',
      nameHindi: 'पर्सनल लोन में महारत',
      icon: '💳',
      description: 'Instant personal loans, debt consolidation, interest rates, eligibility',
      lessonsCount: 20,
      duration: '8h',
      level: 'Beginner',
      route: '/learn/personal-loans',
      color: 'from-purple-500 to-pink-600',
      tags: ['personal loan', 'instant loan', 'debt consolidation', 'पर्सनल लोन']
    },
    {
      id: 'vehicle-loans',
      name: 'Vehicle Loans (Car & Bike)',
      nameHindi: 'वाहन लोन (कार और बाइक)',
      icon: '🚗',
      description: 'Car loans, bike loans, interest rates, insurance, down payment strategies',
      lessonsCount: 15,
      duration: '6h',
      level: 'Beginner',
      route: '/learn/vehicle-loans',
      color: 'from-orange-500 to-red-600',
      tags: ['car loan', 'bike loan', 'vehicle financing', 'कार लोन', 'बाइक लोन']
    },
    {
      id: 'education-loans',
      name: 'Education Loans Guide',
      nameHindi: 'शिक्षा लोन गाइड',
      icon: '🎓',
      description: 'Study in India/abroad, collateral-free loans, scholarships, tax benefits',
      lessonsCount: 10,
      duration: '5h',
      level: 'Intermediate',
      route: '/learn/education-loans',
      color: 'from-indigo-500 to-blue-600',
      tags: ['education loan', 'study abroad', 'scholarship', 'Section 80E', 'शिक्षा लोन']
    },
    {
      id: 'business-loans',
      name: 'Business Loans & MSME',
      nameHindi: 'व्यवसाय लोन और एमएसएमई',
      icon: '💼',
      description: 'MSME loans, Mudra scheme, working capital, startup financing',
      lessonsCount: 15,
      duration: '7h',
      level: 'Advanced',
      route: '/learn/business-loans',
      color: 'from-teal-500 to-cyan-600',
      tags: ['business loan', 'MSME', 'Mudra loan', 'working capital', 'बिजनेस लोन']
    },
    {
      id: 'gold-loans',
      name: 'Gold Loans Complete Guide',
      nameHindi: 'गोल्ड लोन संपूर्ण गाइड',
      icon: '🏆',
      description: 'Gold loan basics, LTV ratio, interest rates, best banks, repayment options',
      lessonsCount: 10,
      duration: '4h',
      level: 'Beginner',
      route: '/learn/gold-loans',
      color: 'from-yellow-500 to-orange-600',
      tags: ['gold loan', 'LTV ratio', 'gold financing', 'गोल्ड लोन']
    },
    {
      id: 'credit-cards',
      name: 'Credit Cards Complete Guide',
      nameHindi: 'क्रेडिट कार्ड संपूर्ण गाइड',
      icon: '💳',
      description: 'Credit card rewards, cashback, EMI, interest charges, fraud protection',
      lessonsCount: 20,
      duration: '8h',
      level: 'Beginner',
      route: '/learn/credit-cards',
      color: 'from-red-500 to-pink-600',
      tags: ['credit card', 'rewards', 'cashback', 'क्रेडिट कार्ड']
    },
    {
      id: 'credit-score',
      name: 'Credit Score & CIBIL',
      nameHindi: 'क्रेडिट स्कोर और सिबिल',
      icon: '📊',
      description: 'Check CIBIL free, improve credit score, dispute errors, loan approval tips',
      lessonsCount: 10,
      duration: '4h',
      level: 'Beginner',
      route: '/learn/credit-score',
      color: 'from-pink-500 to-rose-600',
      tags: ['CIBIL score', 'credit report', 'credit score improvement', 'सिबिल स्कोर']
    },
    {
      id: '2026-strategy-hub',
      name: '2026 Strategic Hub',
      nameHindi: '2026 रणनीतिक हब',
      icon: '🚀',
      description: 'AI-proof strategies for MSME, Tax, Banking, and Scam Defense in 2026',
      lessonsCount: 150,
      duration: '50h+',
      level: 'Mixed',
      route: '/2026-financial-strategy', // I'll create this route/page too
      color: 'from-indigo-600 to-blue-700',
      tags: ['2026 strategy', 'AI-proof', 'tax 2026', 'msme subsidies', 'scam prevention'],
      featured: true
    }
  ];

  // Advanced Search & Filter Logic - Categories
  const filteredCategories = useMemo(() => {
    return allCategories.filter(category => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        category.name.toLowerCase().includes(searchLower) ||
        category.nameHindi.includes(searchQuery) ||
        category.description.toLowerCase().includes(searchLower) ||
        category.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchesLevel = selectedLevel === 'all' || category.level === selectedLevel;
      
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel, allCategories]);

  // Powerful Lesson-Level Search (searches through ALL lesson content)
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    
    const searchLower = searchQuery.toLowerCase();
    return allLessons.filter(lesson => {
      return (
        lesson.title.toLowerCase().includes(searchLower) ||
        lesson.titleHindi.includes(searchQuery) ||
        lesson.description.toLowerCase().includes(searchLower) ||
        lesson.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        lesson.category.toLowerCase().includes(searchLower)
      );
    }).slice(0, 12); // Limit to 12 most relevant results
  }, [searchQuery, allLessons]);

  const stats = {
    totalCategories: allCategories.length,
    totalLessons: allCategories.reduce((sum, cat) => sum + cat.lessonsCount, 0),
    totalHours: allCategories.reduce((sum, cat) => sum + parseInt(cat.duration), 0)
  };

  const featuredCategories = allCategories.filter(cat => cat.featured);

  return (
    <>
      <SEOHelmet
        title="MoneyCal Learn - India's #1 Free Finance Education Platform | 200+ Lessons Hindi+English"
        description="Master personal finance with 200+ free lessons across 18 categories. Learn loans, investing, taxation, insurance, business finance in Hindi & English. Interactive calculators, expert guidance, real Indian examples."
        keywords="financial education India, learn finance Hindi, personal finance course, loan guide EMI, investment tutorial stock market mutual funds SIP, tax guide 80C ITR, insurance NPS retirement, business finance startup, budgeting emergency fund, CIBIL credit score, वित्तीय शिक्षा, निवेश गाइड, लोन, बीमा, कर योजना"
        url="/learn"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "MoneyCal Learn",
          description: "Finance education platform with categories, lessons, calculators, and guides.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: stats.totalLessons
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="font-bold text-yellow-300">200+ Lessons Live!</span>
              </span>
            <span className="hidden md:inline">•</span>
            <span>18 Complete Categories</span>
            <span className="hidden md:inline">•</span>
            <span className="font-semibold text-green-300">100% Free Forever</span>
          </div>
        </div>

        {/* Main Header - Sticky */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900">MoneyCal</span>{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Learn
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600">India's #1 Finance Academy</p>
                </div>
              </Link>

              <nav className="flex items-center gap-4 text-sm">
                <Link to="/calculators" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  🧮 Calculators
                </Link>
                <Link to="/blog" reloadDocument className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  📰 Blog
                </Link>
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  🏠 Home
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section with Advanced Search */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Master Personal Finance
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mb-2">
                वित्तीय शिक्षा - आपके भविष्य के लिए
              </p>
              <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                200+ comprehensive lessons across 18 categories. Hindi + English. Real Indian examples. Interactive calculators.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="border rounded-xl p-4 bg-white">
                <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
                <p className="text-gray-700 text-sm">Search topics, open a category hub, follow lesson sequence, and use calculators alongside reading.</p>
              </div>
              <div className="border rounded-xl p-4 bg-white">
                <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
                <p className="text-gray-700 text-sm">Beginners → budgeting and EMIs. Intermediate → tax planning. Advanced → investing and portfolio.</p>
              </div>
              <div className="border rounded-xl p-4 bg-white">
                <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
                <p className="text-gray-700 text-sm">Plan monthly budget → track expenses. Learn SIP → use calculator. File ITR → apply deductions.</p>
              </div>
            </div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stats.totalCategories}
                      </div>
                <div className="text-sm text-gray-600">Categories</div>
                      </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {stats.totalLessons}+
                    </div>
                <div className="text-sm text-gray-600">Lessons</div>
                      </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {stats.totalHours}h+
                    </div>
                <div className="text-sm text-gray-600">Content</div>
                  </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  FREE
                    </div>
                <div className="text-sm text-gray-600">Forever</div>
                    </div>
            </motion.div>

            {/* Powerful Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search: SIP, tax, insurance, loan, UPI, बजट, निवेश..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-12 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                    </div>

                {/* Level Filter */}
                <div className="md:w-64 relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-lg appearance-none bg-white cursor-pointer"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                    </div>
                  </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>{searchResults.length}</strong> lesson{searchResults.length === 1 ? '' : 's'} + <strong>{filteredCategories.length}</strong> categor{filteredCategories.length === 1 ? 'y' : 'ies'} found matching "<strong>{searchQuery}</strong>"
                  </p>
                    </div>
              )}
            </motion.div>

            <div className="w-full flex justify-center mb-8">
              <ResponsiveAd />
            </div>

            {/* Quick Access: Featured Calculators */}
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-blue-600" />
                    Quick Access: Featured Calculators
                  </h3>
                  <Link to="/calculators" className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 group">
                    View All Tools
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      name: 'Loan EMI Calculator', 
                      desc: 'Calculate monthly EMIs for home, car or personal loans',
                      icon: IndianRupee, 
                      route: '/calculators/loan-emi-calculator',
                      color: 'bg-blue-50 text-blue-700 border-blue-100'
                    },
                    { 
                      name: 'SIP Calculator', 
                      desc: 'Plan your wealth creation through systematic investments',
                      icon: TrendingUp, 
                      route: '/calculators/sip-calculator',
                      color: 'bg-green-50 text-green-700 border-green-100'
                    },
                    { 
                      name: 'Income Tax Calculator', 
                      desc: 'Estimate your tax liability for FY 2024-25 (AY 2025-26)',
                      icon: PieChart, 
                      route: '/calculators/income-tax-calculator',
                      color: 'bg-purple-50 text-purple-700 border-purple-100'
                    }
                  ].map((tool, i) => (
                    <Link key={i} to={tool.route} className="group">
                      <div className={`p-5 rounded-2xl border-2 ${tool.color} hover:shadow-lg transition-all flex items-start gap-4 h-full`}>
                        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                          <tool.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold mb-1">{tool.name}</h4>
                          <p className="text-xs opacity-80 leading-relaxed">{tool.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Lesson-Level Search Results (Priority Display) */}
            {searchQuery && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border-2 border-purple-200"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                  📚 Matching Lessons ({searchResults.length})
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Click any lesson below to start learning immediately
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((lesson, index) => (
                    <Link 
                      key={lesson.id} 
                      to={lesson.route}
                      className="group"
                    >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-400 h-full flex flex-col"
                      >
                        {/* Category Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{lesson.categoryIcon}</span>
                          <div className="flex-1">
                            <div className="text-xs font-semibold text-purple-600">{lesson.category}</div>
                            <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                              lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                              lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                  </div>
                </div>
              </div>

                        {/* Lesson Title */}
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {lesson.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-3 italic">{lesson.titleHindi}</p>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                          {lesson.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {lesson.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200">
                          <span className="text-gray-600 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lesson.duration}
                          </span>
                          <span className="text-purple-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                            Start Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {searchResults.length === 12 && (
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Showing top 12 results. Refine your search for more specific lessons.
                  </p>
                )}
            </motion.div>
            )}
          </div>
        </section>

        {/* Featured Categories Section */}
        {!searchQuery && featuredCategories.length > 0 && (
          <section className="py-8 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                Featured Learning Paths
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredCategories.slice(0, 3).map((category, index) => (
            <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={category.route} className="block group">
                      <div className={`bg-gradient-to-br ${category.color} text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105`}>
                        <div className="text-5xl mb-3">{category.icon}</div>
                        <h4 className="text-2xl font-bold mb-2">{category.name}</h4>
                        <p className="text-sm opacity-90 mb-4">{category.nameHindi}</p>
                        <div className="flex items-center justify-between text-sm mb-4">
                          <span>{category.lessonsCount} Lessons</span>
                          <span>{category.duration}</span>
                          <span>{category.level}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Start Learning</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
            </motion.div>
                ))}
              </div>
          </div>
        </section>
        )}

        {/* All Categories Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {searchQuery ? `Search Results (${filteredCategories.length})` : 'All Learning Categories'}
            </h3>

            <AnimatePresence mode="wait">
              <motion.div 
                key={searchQuery + selectedLevel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCategories.map((category, index) => (
                <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Link to={category.route} className="block h-full">
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border-2 border-gray-100 hover:border-purple-400">
                        
                        {/* Category Header with Gradient */}
                        <div className={`bg-gradient-to-r ${category.color} p-6 text-white relative`}>
                          {category.featured && (
                            <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                              ⭐ POPULAR
                    </div>
                          )}
                          <div className="text-5xl mb-3">{category.icon}</div>
                          <h4 className="text-2xl font-bold mb-1 group-hover:scale-105 transition-transform">
                            {category.name}
                          </h4>
                          <p className="text-sm opacity-90">{category.nameHindi}</p>
                  </div>

                        {/* Category Body */}
                        <div className="p-6 flex-1 flex flex-col">
                          <p className="text-gray-700 mb-4 flex-1 text-sm leading-relaxed">
                            {category.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {category.tags.slice(0, 3).map((tag, i) => (
                              <span 
                                key={i}
                                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                              >
                                {tag}
                    </span>
                            ))}
                  </div>

                          {/* Stats Row */}
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            <div className="text-center bg-gray-50 rounded-lg py-2">
                              <div className="text-lg font-bold text-gray-900">{category.lessonsCount}</div>
                              <div className="text-xs text-gray-600">Lessons</div>
                  </div>
                            <div className="text-center bg-gray-50 rounded-lg py-2">
                              <div className="text-lg font-bold text-gray-900">{category.duration}</div>
                              <div className="text-xs text-gray-600">Duration</div>
                    </div>
                            <div className={`text-center rounded-lg py-2 ${
                              category.level === 'Beginner' ? 'bg-green-100' :
                              category.level === 'Intermediate' ? 'bg-yellow-100' :
                              category.level === 'Advanced' ? 'bg-red-100' :
                              'bg-blue-100'
                            }`}>
                              <div className={`text-xs font-bold ${
                                category.level === 'Beginner' ? 'text-green-700' :
                                category.level === 'Intermediate' ? 'text-yellow-700' :
                                category.level === 'Advanced' ? 'text-red-700' :
                                'text-blue-700'
                              }`}>{category.level}</div>
                              <div className="text-xs text-gray-600">Level</div>
                  </div>
                  </div>

                          {/* CTA Button */}
                          <div className="flex items-center justify-between text-purple-600 font-semibold group-hover:text-purple-700">
                            <span>Start Learning Now</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                  </div>
                    </Link>
                  </motion.div>
                ))}
                </motion.div>
            </AnimatePresence>

            {/* No Results Message */}
            {filteredCategories.length === 0 && (
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-600 mb-6">Try different keywords or clear filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLevel('all');
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
                    </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Popular Topics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'EMI Calculator', link: '/calculators/emi-calculator', icon: '🧮' },
                { name: 'SIP Guide', link: '/learn/investing-wealth/sip-systematic-investment-plan-strategy-india-wealth-building', icon: '💰' },
                { name: 'Tax Saving', link: '/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india', icon: '💼' },
                { name: 'Home Loan', link: '/learn/home-loans', icon: '🏠' },
                { name: 'Credit Score', link: '/learn/credit-score/improve-cibil-score-fast', icon: '📊' },
                { name: 'UPI Guide', link: '/learn/fintech-digital-payments/upi-complete-guide-gpay-phonepe-paytm-limit-charges-india-2025', icon: '📱' }
              ].map((topic, i) => (
                <Link
                  key={i}
                  to={topic.link}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 p-4 rounded-xl text-center shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="text-3xl mb-2">{topic.icon}</div>
                  <div className="text-sm font-semibold text-gray-900 group-hover:text-purple-600">
                    {topic.name}
                    </div>
                </Link>
              ))}
                  </div>
                  </div>
        </section>

        {/* Internal Linking - Related Resources */}
        <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Explore More Resources
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/calculators" className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl text-white">
                    <Target className="w-8 h-8" />
                    </div>
                  <h4 className="text-2xl font-bold text-gray-900">100+ Calculators</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                  Free financial calculators: EMI, SIP, tax, retirement, PPF, loan eligibility, and more
                  </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                  Explore Calculators <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
              </Link>

              <Link to="/blog" reloadDocument className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
                    <BookOpen className="w-8 h-8" />
                    </div>
                  <h4 className="text-2xl font-bold text-gray-900">Expert Blog</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                  In-depth articles, how-to guides, and financial strategies for Indian investors
                  </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                  Read Articles <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
              </Link>

              <Link to="/news" reloadDocument className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl text-white">
                    <TrendingUp className="w-8 h-8" />
                    </div>
                  <h4 className="text-2xl font-bold text-gray-900">Financial News</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                  Daily updates on markets, economy, IPOs, business trends, and policy changes
                </p>
                <div className="flex items-center text-red-600 font-semibold group-hover:translate-x-1 transition-transform">
                  Latest News <ArrowRight className="w-5 h-5 ml-2" />
          </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-center text-white shadow-2xl"
            >
              <div className="text-5xl mb-6">🎓</div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Master Your Finances?
              </h3>
              <p className="text-xl mb-8 text-white/90">
                Join 100,000+ Indians building wealth through financial education
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/learn/money-management" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  <BookOpen className="w-6 h-6" />
                  Start with Budgeting
                </Link>
            <Link 
                  to="/learn/investing-wealth" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all"
            >
                  <TrendingUp className="w-6 h-6" />
                  Learn Investing
            </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* About */}
              <div>
                <h4 className="text-lg font-bold mb-4">MoneyCal Learn</h4>
                <p className="text-gray-400 text-sm">
                  India's most comprehensive free finance education platform. Learn, calculate, and master your money.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/learn/money-management" className="text-gray-400 hover:text-white">Money Management</Link></li>
                  <li><Link to="/learn/investing-wealth" className="text-gray-400 hover:text-white">Investing Guide</Link></li>
                  <li><Link to="/learn/taxation-compliance" className="text-gray-400 hover:text-white">Tax Planning</Link></li>
                  <li><Link to="/calculators" className="text-gray-400 hover:text-white">Calculators</Link></li>
                </ul>
              </div>

              {/* Popular Topics */}
              <div>
                <h4 className="text-lg font-bold mb-4">Popular Topics</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/learn" className="text-gray-400 hover:text-white">Loan Basics</Link></li>
                  <li><Link to="/learn/home-loans" className="text-gray-400 hover:text-white">Home Loans</Link></li>
                  <li><Link to="/learn/credit-cards" className="text-gray-400 hover:text-white">Credit Cards</Link></li>
                  <li><Link to="/learn/insurance-retirement" className="text-gray-400 hover:text-white">Insurance & NPS</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-lg font-bold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/blog" reloadDocument className="text-gray-400 hover:text-white">Blog & Guides</Link></li>
                  <li><Link to="/news" reloadDocument className="text-gray-400 hover:text-white">Financial News</Link></li>
                  <li><Link to="/tools" className="text-gray-400 hover:text-white">Tools & Utilities</Link></li>
                  <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400 text-sm">
              © 2025 MoneyCal Learn. Free Finance Education for Everyone. Made with ❤️ in India.
            </p>
              <p className="text-gray-500 text-xs mt-2">
                All content bilingual (Hindi + English) | 100% Free Forever | Expert Verified
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "MoneyCal Learn",
          "description": "India's premier free finance education platform",
          "url": "/learn",
          "sameAs": [
            "/blog",
            "/calculators"
          ],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Finance Courses",
            "itemListElement": allCategories.map((cat, index) => ({
              "@type": "Course",
              "position": index + 1,
              "name": cat.name,
              "description": cat.description,
              "provider": {
                "@type": "Organization",
                "name": "MoneyCal"
              },
              "educationalLevel": cat.level,
              "timeRequired": `PT${cat.duration}`,
              "numberOfCredits": cat.lessonsCount,
              "inLanguage": ["en", "hi"]
            }))
          }
        })}
      </script>
    </>
  );
};

export default LearnHome;
