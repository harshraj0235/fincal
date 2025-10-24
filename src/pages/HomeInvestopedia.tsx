import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Calculator, BookOpen, Newspaper, Users, Globe, 
  ArrowRight, Star, Zap, Shield, Award, BarChart3, Target,
  Sparkles, Rocket, Heart, CheckCircle, Play, Search, ChevronRight,
  DollarSign, Building, Briefcase, Umbrella, PartyPopper, GraduationCap,
  HelpCircle, Gift, Sparkle, Layout, FileText, Building2, Clock, Tag,
  Calendar, ShoppingBag, Wallet, Church, Palette, Languages, LineChart, X
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';
import DynamicContentShowcase from '../components/DynamicContentShowcase';

// Comprehensive Search Database
const searchDatabase = [
  // Investment Tools
  { name: 'SIP Calculator', path: '/tools/sip-calculator', category: 'Investment', keywords: 'mutual fund sip systematic investment plan' },
  { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', keywords: 'public provident fund ppf retirement savings' },
  { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', keywords: 'fixed deposit fd interest bank' },
  { name: 'CAGR Calculator', path: '/calculators/cagr-calculator', category: 'Investment', keywords: 'compound annual growth rate returns' },
  { name: 'Lumpsum Calculator', path: '/calculators/lumpsum-calculator', category: 'Investment', keywords: 'one time investment returns' },
  { name: 'SWP Calculator', path: '/calculators/swp-calculator', category: 'Investment', keywords: 'systematic withdrawal plan pension' },
  { name: 'Stock Analyzer', path: '/tools/stock-analyzer', category: 'Investment', keywords: 'stock analysis share market nse bse' },
  { name: 'Mutual Fund Analyzer', path: '/tools/mutual-fund-analyzer', category: 'Investment', keywords: 'mf nav sip returns' },
  
  // GST Tools
  { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', keywords: 'goods services tax gst calculator inclusive exclusive' },
  { name: 'HSN/SAC Finder', path: '/tools/gst-hsn-sac-finder', category: 'GST', keywords: 'hsn sac code gst finder search' },
  { name: 'GST Rate Finder', path: '/tools/gst-rate-finder', category: 'GST', keywords: 'gst rate slab tax percentage' },
  { name: 'GST ITC Calculator', path: '/tools/gst-itc-calculator', category: 'GST', keywords: 'input tax credit itc gst' },
  { name: 'Reverse GST Calculator', path: '/tools/reverse-gst-calculator', category: 'GST', keywords: 'reverse gst calculation backward' },
  
  // Tax Tools
  { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator', category: 'Tax', keywords: 'income tax calculator old new regime' },
  { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', keywords: 'house rent allowance hra exemption' },
  { name: 'Capital Gains Tax', path: '/calculators/capital-gains-tax-calculator', category: 'Tax', keywords: 'capital gains ltcg stcg tax' },
  { name: 'TDS Calculator', path: '/calculators/tds-calculator', category: 'Tax', keywords: 'tax deducted at source tds' },
  { name: 'Tax Saving Calculator', path: '/tools/tax-saving-calculator', category: 'Tax', keywords: '80c 80d tax saving deduction' },
  
  // Loan Tools
  { name: 'EMI Calculator', path: '/tools/loan-emi-calculator', category: 'Loan', keywords: 'emi loan home personal car calculator' },
  { name: 'Home Loan EMI', path: '/calculators/home-loan-emi-calculator', category: 'Loan', keywords: 'home loan housing emi calculator' },
  { name: 'Personal Loan EMI', path: '/calculators/personal-loan-emi-calculator', category: 'Loan', keywords: 'personal loan emi calculator' },
  { name: 'Car Loan EMI', path: '/calculators/car-loan-emi-calculator', category: 'Loan', keywords: 'car auto vehicle loan emi' },
  { name: 'Loan Comparison', path: '/calculators/loan-comparison-calculator', category: 'Loan', keywords: 'compare loans interest rate emi' },
  
  // Festival Tools
  { name: 'Parsi New Year', path: '/festival-tools/parsi-new-year', category: 'Festival', keywords: 'navroz parsi new year zoroastrian' },
  { name: 'Panchang Today', path: '/festival-tools/panchang-today', category: 'Festival', keywords: 'daily panchang tithi nakshatra muhurat' },
  { name: 'Hindu Panchang Year', path: '/festival-tools/hindu-panchang-year', category: 'Festival', keywords: 'hindu calendar panchang year' },
  { name: 'Weekly Tithi Finder', path: '/festival-tools/weekly-tithi-finder', category: 'Festival', keywords: 'tithi lunar calendar week' },
  { name: 'Moon Phase Festivals', path: '/festival-tools/moon-phase-festivals', category: 'Festival', keywords: 'moon phase lunar festivals' },
  { name: 'Purnima Amavasya Dates', path: '/festival-tools/purnima-amavasya-dates', category: 'Festival', keywords: 'full moon new moon dates' },
  { name: 'Vrat Upavas Calendar', path: '/festival-tools/vrat-upavas-calendar', category: 'Festival', keywords: 'fasting vrat upavas hindu' },
  { name: 'Nakshatra Festival', path: '/festival-tools/nakshatra-festival', category: 'Festival', keywords: 'nakshatra birth star festival' },
  { name: 'Shubh Muhurat Reminder', path: '/festival-tools/shubh-muhurat-reminder', category: 'Festival', keywords: 'auspicious time muhurat reminder' },
  { name: 'Auspicious Marriage Days', path: '/festival-tools/auspicious-marriage-days', category: 'Festival', keywords: 'marriage wedding dates muhurat auspicious' },
  { name: 'Lunar Eclipse Predictor', path: '/festival-tools/lunar-eclipse-predictor', category: 'Festival', keywords: 'lunar solar eclipse grahan dates timings' },
  
  // Learn Sections
  { name: 'Gold Loans Lessons', path: '/learn/gold-loans', category: 'Learn', keywords: 'gold loan education lessons guide' },
  { name: 'Credit Cards Lessons', path: '/learn/credit-cards', category: 'Learn', keywords: 'credit card lessons guide education' },
  { name: 'Credit Score Lessons', path: '/learn/credit-score', category: 'Learn', keywords: 'credit score cibil lessons guide' },
  
  // Insurance Tools
  { name: 'Life Insurance Calculator', path: '/calculators/life-insurance-calculator', category: 'Insurance', keywords: 'life insurance cover calculator' },
  { name: 'Health Insurance Premium', path: '/calculators/health-insurance-premium-calculator', category: 'Insurance', keywords: 'health insurance premium calculator' },
  
  // Retirement Tools
  { name: 'Retirement Calculator', path: '/calculators/retirement-calculator', category: 'Retirement', keywords: 'retirement planning corpus calculator' },
  { name: 'NPS Calculator', path: '/calculators/nps-calculator', category: 'Retirement', keywords: 'national pension scheme nps calculator' },
  { name: 'EPF Calculator', path: '/calculators/epf-calculator', category: 'Retirement', keywords: 'employees provident fund epf pf' },
  
  // Other Popular Tools
  { name: 'Salary Calculator', path: '/calculators/salary-calculator', category: 'Salary', keywords: 'salary in hand take home ctc calculator' },
  { name: 'Gratuity Calculator', path: '/calculators/gratuity-calculator', category: 'Salary', keywords: 'gratuity calculation retirement' },
  { name: 'Currency Converter', path: '/tools/currency-converter', category: 'Currency', keywords: 'currency exchange converter forex' },
  { name: 'Inflation Calculator', path: '/calculators/inflation-calculator', category: 'Finance', keywords: 'inflation rate calculator future value' },
  { name: 'Break Even Calculator', path: '/calculators/break-even-calculator', category: 'Business', keywords: 'break even analysis business' },
  { name: 'Margin Calculator', path: '/calculators/margin-calculator', category: 'Business', keywords: 'profit margin markup calculator' },
  { name: 'Discount Calculator', path: '/calculators/discount-calculator', category: 'Shopping', keywords: 'discount percentage off calculator' },
  
  // Blog Posts
  ...blogPosts0.map(post => ({ name: post.title, path: `/blog/${post.slug}`, category: 'Blog', keywords: post.categories.join(' ') + ' ' + post.excerpt })),
  ...blogPosts1.map(post => ({ name: post.title, path: `/blog/${post.slug}`, category: 'Blog', keywords: post.categories.join(' ') + ' ' + post.excerpt }))
];

const HomeInvestopedia: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof searchDatabase>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const results = searchDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
      ).slice(0, 10);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearchItemClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const heroSlides = [
    {
      title: language === 'en' ? 'India\'s Most Comprehensive Financial Platform' : 'भारत का सबसे व्यापक वित्तीय मंच',
      subtitle: language === 'en' ? 'Learn, Calculate, Invest with Confidence' : 'सीखें, गणना करें, आत्मविश्वास से निवेश करें',
      gradient: 'from-blue-600 to-purple-600',
      image: '💹'
    },
    {
      title: language === 'en' ? '100+ Free Financial Calculators & Tools' : '100+ मुफ्त वित्तीय कैलकुलेटर और टूल',
      subtitle: language === 'en' ? 'GST, Tax, SIP, EMI, Retirement & More' : 'GST, टैक्स, SIP, EMI, रिटायरमेंट और अधिक',
      gradient: 'from-green-600 to-teal-600',
      image: '🧮'
    },
    {
      title: language === 'en' ? 'Live Market Updates & Expert Analysis' : 'लाइव बाजार अपडेट और विशेषज्ञ विश्लेषण',
      subtitle: language === 'en' ? 'NSE, BSE, Mutual Funds, Crypto & More' : 'NSE, BSE, म्यूचुअल फंड, क्रिप्टो और अधिक',
      gradient: 'from-orange-600 to-red-600',
      image: '📊'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const content = {
    en: {
      nav: ['News', 'Investing', 'Banking', 'Tools', 'Learn', 'Reviews'],
      hero: {
        title: 'Master Your Financial Future',
        subtitle: 'India\'s Trusted Source for Financial Education, Tools & Market Insights',
        cta: 'Explore Tools',
        cta2: 'Start Learning'
      },
      featured: {
        title: 'Featured Tools',
        subtitle: 'Most popular calculators used by Indian investors'
      },
      categories: [
        { name: 'Investment Tools', icon: TrendingUp, count: 50, color: 'from-blue-500 to-indigo-600', url: '/investing-tools' },
        { name: 'Tax Calculators', icon: Calculator, count: 30, color: 'from-green-500 to-emerald-600', url: '/tax-tools' },
        { name: 'GST Tools', icon: BarChart3, count: 100, color: 'from-purple-500 to-pink-600', url: '/gst-tools' },
        { name: 'Loan Calculators', icon: DollarSign, count: 25, color: 'from-orange-500 to-red-600', url: '/loan-tools' },
        { name: 'Banking Tools', icon: Building, count: 20, color: 'from-cyan-500 to-blue-600', url: '/bank-tools' },
        { name: 'Insurance Tools', icon: Shield, count: 15, color: 'from-violet-500 to-purple-600', url: '/insurance-tools' }
      ],
      news: {
        title: 'Latest Financial News',
        subtitle: 'Stay updated with real-time market news and analysis'
      },
      learn: {
        title: 'Start Learning',
        subtitle: 'Build your financial knowledge from basics to advanced'
      }
    },
    hi: {
      nav: ['समाचार', 'निवेश', 'बैंकिंग', 'टूल्स', 'सीखें', 'समीक्षा'],
      hero: {
        title: 'अपने वित्तीय भविष्य में महारत हासिल करें',
        subtitle: 'वित्तीय शिक्षा, उपकरण और बाजार अंतर्दृष्टि के लिए भारत का विश्वसनीय स्रोत',
        cta: 'टूल्स देखें',
        cta2: 'सीखना शुरू करें'
      },
      featured: {
        title: 'विशेष टूल्स',
        subtitle: 'भारतीय निवेशकों द्वारा सबसे अधिक उपयोग किए जाने वाले कैलकुलेटर'
      },
      categories: [
        { name: 'निवेश उपकरण', icon: TrendingUp, count: 50, color: 'from-blue-500 to-indigo-600', url: '/investing-tools' },
        { name: 'कर कैलकुलेटर', icon: Calculator, count: 30, color: 'from-green-500 to-emerald-600', url: '/tax-tools' },
        { name: 'GST उपकरण', icon: BarChart3, count: 100, color: 'from-purple-500 to-pink-600', url: '/gst-tools' },
        { name: 'लोन कैलकुलेटर', icon: DollarSign, count: 25, color: 'from-orange-500 to-red-600', url: '/loan-tools' },
        { name: 'बैंकिंग उपकरण', icon: Building, count: 20, color: 'from-cyan-500 to-blue-600', url: '/bank-tools' },
        { name: 'बीमा उपकरण', icon: Shield, count: 15, color: 'from-violet-500 to-purple-600', url: '/insurance-tools' }
      ]
    }
  };

  const t = content[language];

  return (
    <>
      <SEOHelmet
        title="MoneyCal India - Financial Calculators, Investment Tools & Market News | Indian Investopedia"
        description="India's most comprehensive financial platform. 100+ free calculators, live market news, investment guides, GST tools, tax calculators. Learn investing, trading, personal finance in Hindi & English."
        keywords="financial calculators India, investment tools, GST calculator, tax calculator, SIP calculator, stock market India, mutual funds, personal finance, Hindi financial education, Indian Investopedia"
        url="https://moneycal.in"
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                NIFTY: <span className="font-bold ml-1 text-green-300">22,456 ▲ 1.2%</span>
              </span>
              <span className="hidden md:flex items-center">
                SENSEX: <span className="font-bold ml-1 text-green-300">74,123 ▲ 0.8%</span>
              </span>
              <Link
                to="/learn"
                className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/30 transition-all group"
              >
                <BookOpen className="w-4 h-4 text-yellow-300" />
                <span className="font-bold text-yellow-300">40 Lessons Live!</span>
                <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/learn"
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1.5 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'Learn' : 'सीखें'}</span>
                <span className="sm:hidden">📚</span>
              </Link>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center space-x-1 hover:text-yellow-300 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="sticky top-0 z-50 bg-white border-b-2 border-blue-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? 'Search 100+ calculators, tools, lessons, blogs... (Try: GST, SIP, EMI, Eclipse)' : 'खोजें: 100+ कैलकुलेटर, टूल्स, पाठ, ब्लॉग...'}
                  className="w-full pl-14 pr-12 py-4 text-lg border-2 border-blue-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all outline-none bg-gradient-to-r from-blue-50 to-purple-50"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchResults(false);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                )}
              </div>

              {/* Popular Searches */}
              {!searchQuery && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600 font-semibold">
                    {language === 'en' ? 'Popular:' : 'लोकप्रिय:'}
                  </span>
                  {[
                    { text: 'GST Calculator', query: 'gst' },
                    { text: 'SIP Calculator', query: 'sip' },
                    { text: 'EMI Calculator', query: 'emi' },
                    { text: 'Eclipse Dates', query: 'eclipse' },
                    { text: 'Marriage Dates', query: 'marriage' },
                    { text: 'Income Tax', query: 'income tax' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(item.query)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors"
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              )}

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-blue-200 max-h-96 overflow-y-auto z-50"
                  >
                    <div className="p-2">
                      <div className="text-xs text-gray-500 px-4 py-2 font-semibold">
                        {searchResults.length} {language === 'en' ? 'results found' : 'परिणाम मिले'}
                      </div>
                      {searchResults.map((result, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => handleSearchItemClick(result.path)}
                          whileHover={{ scale: 1.02 }}
                          className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-bold text-gray-900 group-hover:text-blue-600 mb-1">
                                {result.name}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-semibold">
                                  {result.category}
                                </span>
                                <span className="text-gray-400">{result.path}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No Results */}
              <AnimatePresence>
                {showSearchResults && searchResults.length === 0 && searchQuery.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-blue-200 p-6 z-50"
                  >
                    <div className="text-center">
                      <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-semibold mb-2">
                        {language === 'en' ? 'No results found' : 'कोई परिणाम नहीं मिला'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {language === 'en' 
                          ? 'Try searching for: Calculator, GST, Tax, Loan, Festival, Blog' 
                          : 'खोजें: कैलकुलेटर, GST, टैक्स, लोन, त्योहार, ब्लॉग'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'en' ? '100+ New Tools Added!' : '100+ नए टूल्स जोड़े गए!'}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t.hero.title}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Credit Card Learn Button */}
              <div className="max-w-4xl mx-auto mb-12">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <Link to="/learn" className="block">
                    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group cursor-pointer">
                      {/* Animated Background Circles */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20 group-hover:scale-150 transition-transform duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:rotate-12 transition-transform">
                              <BookOpen className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-left">
                              <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                                {language === 'en' ? 'MoneyCal Learn Academy' : 'MoneyCal लर्न अकादमी'}
                              </h3>
                              <p className="text-white/90">
                                {language === 'en' ? 'Free Finance Education Platform' : 'मुफ्त वित्त शिक्षा मंच'}
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                            <div className="text-white/70 text-xs mb-1">{language === 'en' ? 'Lessons' : 'पाठ'}</div>
                            <div className="text-white text-2xl font-bold">20</div>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <div className="text-white/70 text-xs mb-1">{language === 'en' ? 'Categories' : 'श्रेणियाँ'}</div>
                            <div className="text-white text-xl font-bold">9</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <div className="text-white/70 text-xs mb-1">{language === 'en' ? 'Calculators' : 'कैलकुलेटर'}</div>
                            <div className="text-white text-xl font-bold">5</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <div className="text-white/70 text-xs mb-1">{language === 'en' ? 'Words' : 'शब्द'}</div>
                            <div className="text-white text-xl font-bold">50K+</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <div className="text-white/70 text-xs mb-1">{language === 'en' ? 'Cost' : 'मूल्य'}</div>
                            <div className="text-white text-xl font-bold">FREE</div>
                          </div>
                        </div>

                        {/* Action Row */}
                        <div className="flex items-center justify-between">
                          <div className="text-white">
                            <p className="text-lg font-semibold mb-1">
                              🎓 {language === 'en' ? '20 Loan Lessons Complete!' : '20 लोन पाठ पूर्ण!'}
                            </p>
                            <p className="text-sm text-white/80">
                              {language === 'en' ? 'Click to start your finance journey →' : 'अपनी वित्त यात्रा शुरू करने के लिए क्लिक करें →'}
                            </p>
                          </div>
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-full font-bold group-hover:scale-110 transition-transform flex items-center gap-2">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span className="hidden sm:inline">{language === 'en' ? 'Start Learning' : 'सीखना शुरू करें'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/tools"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/financial-education"
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center border-2 border-gray-200"
                >
                  {t.hero.cta2}
                  <Play className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Dynamic Content Showcase - Trending Tools */}
        <DynamicContentShowcase language={language} />

        {/* Quick Navigation - All Sections */}
        <section className="py-16 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'Explore All Sections' : 'सभी अनुभाग देखें'}
                </span>
              </h2>
              <p className="text-gray-600">
                {language === 'en' ? 'Your complete financial toolkit in one place' : 'एक ही स्थान पर आपका पूरा वित्तीय टूलकिट'}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { name: language === 'en' ? 'All Tools' : 'सभी टूल्स', icon: Layout, url: '/tools', color: 'from-blue-500 to-indigo-600' },
                { name: language === 'en' ? 'Calculators' : 'कैलकुलेटर', icon: Calculator, url: '/calculators', color: 'from-green-500 to-emerald-600' },
                { name: language === 'en' ? 'Finance Tools' : 'वित्त टूल्स', icon: TrendingUp, url: '/finance-tools', color: 'from-purple-500 to-pink-600' },
                { name: language === 'en' ? 'Tax Tools' : 'कर टूल्स', icon: FileText, url: '/tax-tools', color: 'from-orange-500 to-red-600' },
                { name: language === 'en' ? 'GST Tools' : 'GST टूल्स', icon: BarChart3, url: '/gst-tools', color: 'from-cyan-500 to-blue-600' },
                { name: language === 'en' ? 'Corporate' : 'कॉर्पोरेट', icon: Building2, url: '/corporate-finance', color: 'from-violet-500 to-purple-600' },
                { name: language === 'en' ? 'Insurance' : 'बीमा', icon: Umbrella, url: '/insurance-tools', color: 'from-teal-500 to-cyan-600' },
                { name: language === 'en' ? 'Festival' : 'त्योहार', icon: PartyPopper, url: '/festival-tools', color: 'from-pink-500 to-rose-600' },
                { name: language === 'en' ? 'Blog' : 'ब्लॉग', icon: Newspaper, url: '/blog', color: 'from-amber-500 to-orange-600' },
                { name: language === 'en' ? 'Education' : 'शिक्षा', icon: GraduationCap, url: '/financial-education', color: 'from-indigo-500 to-purple-600' },
                { name: language === 'en' ? 'Help' : 'सहायता', icon: HelpCircle, url: '/help-center', color: 'from-blue-500 to-cyan-600' },
                { name: language === 'en' ? 'Schemes' : 'योजनाएं', icon: Gift, url: '/government-schemes', color: 'from-green-500 to-teal-600' },
                { name: language === 'en' ? 'Astro' : 'ज्योतिष', icon: Sparkle, url: '/astro-finance', color: 'from-purple-500 to-pink-600' },
                { name: language === 'en' ? 'Loan Tools' : 'लोन टूल्स', icon: DollarSign, url: '/loan-tools', color: 'from-red-500 to-orange-600' }
              ].map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group"
                >
                  <Link
                    to={section.url}
                    className="block text-center"
                  >
                    <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${section.color} rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                      <section.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>
                    <p className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {section.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'Explore Our Tools' : 'हमारे टूल्स देखें'}
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'en' ? 'Everything you need for financial success' : 'वित्तीय सफलता के लिए आपको जो कुछ भी चाहिए'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.count} {language === 'en' ? 'Tools Available' : 'टूल्स उपलब्ध'}</p>
                    <Link
                      to={category.url}
                      className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform"
                    >
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tools Carousel */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'Most Used Tools' : 'सबसे अधिक उपयोग किए जाने वाले टूल्स'}
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'SIP Calculator', icon: TrendingUp, users: '50K+', url: '/tools/sip-calculator' },
                { name: 'GST Calculator', icon: Calculator, users: '40K+', url: '/tools/gst-amount-calculator' },
                { name: 'Income Tax', icon: BarChart3, users: '35K+', url: '/tools/income-tax-calculator' },
                { name: 'EMI Calculator', icon: DollarSign, users: '30K+', url: '/tools/loan-emi-calculator' },
                { name: 'PPF Calculator', icon: Target, users: '25K+', url: '/calculators/ppf-calculator' },
                { name: 'FD Calculator', icon: Sparkles, users: '20K+', url: '/calculators/compound-interest-calculator' },
                { name: 'HSN/SAC Finder', icon: Search, users: '15K+', url: '/tools/gst-hsn-sac-finder' },
                { name: 'CAGR Calculator', icon: TrendingUp, users: '10K+', url: '/calculators/cagr-calculator' }
              ].map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Link
                    to={tool.url}
                    className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <tool.icon className="w-10 h-10 text-blue-600" />
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                        {tool.users} {language === 'en' ? 'users' : 'उपयोगकर्ता'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                    <div className="flex items-center text-blue-600 font-semibold text-sm">
                      {language === 'en' ? 'Use Now' : 'अभी उपयोग करें'}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Festival Tools Categories */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {language === 'en' ? 'Festival Planning Made Easy' : 'त्योहार योजना आसान बनी'}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'Festival Tools & Calculators' : 'त्योहार टूल्स और कैलकुलेटर'}
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'en' 
                  ? 'Celebrate every occasion with our comprehensive festival planning tools. Budget, plan, and enjoy worry-free celebrations!'
                  : 'हमारे व्यापक त्योहार योजना उपकरणों के साथ हर अवसर मनाएं। बजट बनाएं, योजना बनाएं और चिंता मुक्त उत्सव का आनंद लें!'}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Festival Date & Calendar Tools */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                transition={{ delay: 0 * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                <Link
                  to="/festival-dates"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Calendar className="h-8 w-8 text-white" />
                      </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Festival Dates & Calendar' : 'त्योहार तिथि और कैलेंडर'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Plan ahead with muhurat, dates & reminders' : 'मुहूर्त, तिथि और अनुस्मारक के साथ आगे की योजना बनाएं'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                        {language === 'en' ? 'Explore' : 'देखें'}
                        <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>

              {/* Festival Planning & Shopping */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/festival-shopping"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <ShoppingBag className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Planning & Shopping' : 'योजना और खरीदारी'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Budget planners & shopping checklists' : 'बजट योजनाकार और खरीदारी चेकलिस्ट'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Festival Finance & Money */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/festival-finance"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Wallet className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Finance & Money' : 'वित्त और धन'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'EMI, savings & financial planning' : 'EMI, बचत और वित्तीय योजना'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Religious & Traditional */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 3 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/religious-tools"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Church className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Religious & Traditional' : 'धार्मिक और पारंपरिक'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Puja samagri, rituals & traditions' : 'पूजा सामग्री, अनुष्ठान और परंपराएं'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Fun & Engagement */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 4 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/fun-engagement"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <PartyPopper className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Fun & Engagement' : 'मनोरंजन और भागीदारी'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Games, quizzes & entertainment' : 'गेम्स, क्विज़ और मनोरंजन'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Design & Creator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 5 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/design-tools"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Palette className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Design & Creator' : 'डिज़ाइन और रचनाकार'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Cards, wishes & creative tools' : 'कार्ड, शुभकामनाएं और रचनात्मक टूल्स'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Information & History */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 6 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/festival-info"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Information & History' : 'जानकारी और इतिहास'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Stories, origins & cultural insights' : 'कहानियां, मूल और सांस्कृतिक अंतर्दृष्टि'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Corporate & Professional */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 7 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/festival-corporate-tools"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-500 to-gray-700 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Corporate & Professional' : 'कॉर्पोरेट और पेशेवर'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Office celebrations & bonuses' : 'कार्यालय उत्सव और बोनस'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Regional & Language */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 8 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/regional-tools"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Languages className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'Regional & Language' : 'क्षेत्रीय और भाषा'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Multilingual wishes & content' : 'बहुभाषी शुभकामनाएं और सामग्री'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* SEO & Monetization */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 9 * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to="/seo-tools"
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <LineChart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {language === 'en' ? 'SEO & Monetization' : 'SEO और मुद्रीकरण'}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed mb-auto">
                      {language === 'en' ? 'Traffic, analytics & growth tools' : 'ट्रैफ़िक, विश्लेषण और विकास टूल्स'}
                    </p>
                    <div className="mt-4 flex items-center text-white text-sm font-semibold">
                      {language === 'en' ? 'Explore' : 'देखें'}
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>

            <div className="text-center mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
              <Link 
                to="/festival-tools" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
              >
                {language === 'en' ? 'Explore All Festival Tools' : 'सभी त्योहार टूल्स देखें'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'Why Choose MoneyCal?' : 'MoneyCal क्यों चुनें?'}
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: language === 'en' ? 'Lightning Fast' : 'बिजली की तेजी से',
                  description: language === 'en' ? 'Instant calculations with real-time results' : 'वास्तविक समय परिणामों के साथ त्वरित गणना',
                  color: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: Shield,
                  title: language === 'en' ? '100% Free' : '100% मुफ्त',
                  description: language === 'en' ? 'No registration, no hidden costs, forever free' : 'कोई पंजीकरण नहीं, कोई छिपी लागत नहीं, हमेशा के लिए मुफ्त',
                  color: 'from-green-400 to-emerald-500'
                },
                {
                  icon: Award,
                  title: language === 'en' ? 'Most Comprehensive' : 'सबसे व्यापक',
                  description: language === 'en' ? '100+ tools - more than any other platform' : '100+ टूल्स - किसी अन्य प्लेटफ़ॉर्म से अधिक',
                  color: 'from-blue-400 to-indigo-500'
                },
                {
                  icon: Globe,
                  title: language === 'en' ? 'Bilingual Support' : 'द्विभाषी समर्थन',
                  description: language === 'en' ? 'Available in Hindi & English' : 'हिंदी और अंग्रेजी में उपलब्ध',
                  color: 'from-purple-400 to-pink-500'
                },
                {
                  icon: Users,
                  title: language === 'en' ? 'Trusted by Millions' : 'लाखों द्वारा भरोसा',
                  description: language === 'en' ? 'Join 1M+ users making smarter financial decisions' : '1M+ उपयोगकर्ताओं के साथ जुड़ें',
                  color: 'from-teal-400 to-cyan-500'
                },
                {
                  icon: Rocket,
                  title: language === 'en' ? 'Always Updated' : 'हमेशा अपडेट',
                  description: language === 'en' ? 'Latest tax rates, GST slabs, and regulations' : 'नवीनतम टैक्स दरें, GST स्लैब और नियम',
                  color: 'from-red-400 to-rose-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* News Section Preview */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {language === 'en' ? 'Latest Market News' : 'नवीनतम बाजार समाचार'}
              </h2>
              <p className="text-xl text-blue-200">
                {language === 'en' ? 'Stay ahead with real-time financial updates' : 'वास्तविक समय वित्तीय अपडेट के साथ आगे रहें'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all"
                >
                  <div className="text-xs text-blue-300 mb-2">2 hours ago</div>
                  <h3 className="text-lg font-bold mb-2">Market hits new high as tech stocks rally</h3>
                  <p className="text-sm text-gray-300 mb-4">Nifty and Sensex reach record levels on strong FII inflows...</p>
                  <Link to="/news" className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/news"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                <Newspaper className="w-5 h-5 mr-2" />
                {language === 'en' ? 'View All News' : 'सभी समाचार देखें'}
              </Link>
            </div>
          </div>
        </section>

        {/* Learning Center Preview */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600">
                    {language === 'en' ? 'Learning Center' : 'शिक्षण केंद्र'}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {language === 'en' ? 'Build Your Financial Knowledge' : 'अपना वित्तीय ज्ञान बनाएं'}
                  </span>
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {language === 'en' 
                    ? 'From beginner basics to advanced strategies. Learn investing, trading, taxation, and personal finance in simple language.'
                    : 'शुरुआती मूल बातें से उन्नत रणनीतियों तक। सरल भाषा में निवेश, ट्रेडिंग, कराधान और व्यक्तिगत वित्त सीखें।'}
                </p>
                <Link
                  to="/financial-education"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  {language === 'en' ? 'Start Learning' : 'सीखना शुरू करें'}
                  <Rocket className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { title: 'Stock Market Basics', lessons: 50 },
                  { title: 'Mutual Funds Guide', lessons: 40 },
                  { title: 'Tax Planning', lessons: 35 },
                  { title: 'Retirement Planning', lessons: 30 }
                ].map((course, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="text-3xl mb-3">📚</div>
                    <h4 className="font-bold mb-2">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.lessons} {language === 'en' ? 'lessons' : 'पाठ'}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Latest Blog Posts & News */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'Latest Financial Articles & Guides' : 'नवीनतम वित्तीय लेख और गाइड'}
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'en' ? 'Expert insights, tips, and comprehensive guides to master your finances' : 'विशेषज्ञ अंतर्दृष्टि, टिप्स और अपने वित्त में महारत हासिल करने के लिए व्यापक गाइड'}
              </p>
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...blogPosts0, ...blogPosts1].slice(0, 6).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-700">
                            {post.categories[0]}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-1" />
                            {post.author}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                          {language === 'en' ? 'Read More' : 'और पढ़ें'}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Blog Button */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
              <Link
                to="/blog"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
              >
                <Newspaper className="w-5 h-5 mr-2" />
                {language === 'en' ? 'View All Articles' : 'सभी लेख देखें'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Heart className="w-16 h-16 mx-auto mb-6 text-pink-300" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {language === 'en' ? 'Join India\'s Fastest Growing Financial Community' : 'भारत के सबसे तेजी से बढ़ते वित्तीय समुदाय में शामिल हों'}
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                {language === 'en' 
                  ? '1 Million+ users trust MoneyCal for their financial decisions'
                  : '1 मिलियन+ उपयोगकर्ता अपने वित्तीय निर्णयों के लिए MoneyCal पर भरोसा करते हैं'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/tools"
                  className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  {language === 'en' ? 'Explore All Tools' : 'सभी टूल्स देखें'}
                  <Zap className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/financial-education"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                >
                  {language === 'en' ? 'Start Learning Free' : 'मुफ्त सीखना शुरू करें'}
                  <BookOpen className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              {[
                { icon: CheckCircle, text: language === 'en' ? 'RBI Guidelines Compliant' : 'RBI दिशानिर्देश अनुपालन' },
                { icon: Shield, text: language === 'en' ? 'Secure & Private' : 'सुरक्षित और निजी' },
                { icon: Star, text: language === 'en' ? '4.8/5 User Rating' : '4.8/5 उपयोगकर्ता रेटिंग' },
                { icon: Users, text: language === 'en' ? '1M+ Happy Users' : '1M+ खुश उपयोगकर्ता' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <item.icon className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default HomeInvestopedia;
