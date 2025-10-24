import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Calculator, BookOpen, Newspaper, Users, Globe, 
  ArrowRight, Star, Zap, Shield, Award, BarChart3, Target,
  Sparkles, Rocket, Heart, CheckCircle, Play, Search, ChevronRight,
  DollarSign, Building, Briefcase, Umbrella, PartyPopper, GraduationCap,
  HelpCircle, Gift, Sparkle, Layout, FileText, Building2, Clock, Tag,
  Calendar, ShoppingBag, Wallet, Church, Palette, Languages, LineChart,
  Bell, TrendingDown, Menu, X, ChevronDown, Filter, SlidersHorizontal,
  ExternalLink, Share2, Bookmark, Moon, Sun, Flame, Percent, CreditCard,
  Home, PiggyBank, Briefcase as BriefcaseIcon, Smartphone, Trophy, Grid,
  List, Mail, Phone, MessageCircle, ThumbsUp, Eye, Download, Upload
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';

// Get current dynamic date
const getCurrentDate = () => {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.toLocaleDateString('en-IN', { month: 'long' }),
    year: now.getFullYear(),
    time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    dayName: now.toLocaleDateString('en-IN', { weekday: 'long' }),
    fullDate: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  };
};

// Comprehensive Search Database
const searchDatabase = [
  // Investment Tools
  { name: 'SIP Calculator', path: '/tools/sip-calculator', category: 'Investment', icon: TrendingUp, keywords: 'mutual fund sip systematic investment plan monthly', emoji: '📈' },
  { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', icon: PiggyBank, keywords: 'public provident fund ppf retirement savings', emoji: '🏦' },
  { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', icon: Target, keywords: 'fixed deposit fd interest bank', emoji: '💰' },
  { name: 'CAGR Calculator', path: '/calculators/cagr-calculator', category: 'Investment', icon: LineChart, keywords: 'compound annual growth rate returns', emoji: '📊' },
  { name: 'Lumpsum Calculator', path: '/calculators/lumpsum-calculator', category: 'Investment', icon: DollarSign, keywords: 'one time investment returns', emoji: '💵' },
  { name: 'SWP Calculator', path: '/calculators/swp-calculator', category: 'Investment', icon: Wallet, keywords: 'systematic withdrawal plan pension', emoji: '👛' },
  { name: 'Stock Analyzer', path: '/tools/stock-analyzer', category: 'Investment', icon: TrendingUp, keywords: 'stock analysis share market nse bse equity', emoji: '📈' },
  { name: 'Mutual Fund Analyzer', path: '/tools/mutual-fund-analyzer', category: 'Investment', icon: BarChart3, keywords: 'mf nav sip returns scheme', emoji: '📊' },
  
  // GST Tools
  { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', icon: Calculator, keywords: 'goods services tax gst calculator inclusive exclusive', emoji: '🧮' },
  { name: 'HSN/SAC Finder', path: '/tools/gst-hsn-sac-finder', category: 'GST', icon: Search, keywords: 'hsn sac code gst finder search product service', emoji: '🔍' },
  { name: 'GST Rate Finder', path: '/tools/gst-rate-finder', category: 'GST', icon: Percent, keywords: 'gst rate slab tax percentage 5 12 18 28', emoji: '💹' },
  { name: 'GST ITC Calculator', path: '/tools/gst-itc-calculator', category: 'GST', icon: Calculator, keywords: 'input tax credit itc gst claim', emoji: '🧮' },
  { name: 'Reverse GST Calculator', path: '/tools/reverse-gst-calculator', category: 'GST', icon: TrendingDown, keywords: 'reverse gst calculation backward', emoji: '🔄' },
  
  // Tax Tools
  { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator', category: 'Tax', icon: FileText, keywords: 'income tax calculator old new regime 2025 2026', emoji: '📄' },
  { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', icon: Home, keywords: 'house rent allowance hra exemption calculator', emoji: '🏠' },
  { name: 'Capital Gains Tax', path: '/calculators/capital-gains-tax-calculator', category: 'Tax', icon: TrendingUp, keywords: 'capital gains ltcg stcg tax property stock', emoji: '💹' },
  { name: 'TDS Calculator', path: '/calculators/tds-calculator', category: 'Tax', icon: Percent, keywords: 'tax deducted at source tds salary', emoji: '💰' },
  { name: 'Tax Saving Calculator', path: '/tools/tax-saving-calculator', category: 'Tax', icon: PiggyBank, keywords: '80c 80d tax saving deduction investment', emoji: '🏦' },
  
  // Loan Tools
  { name: 'EMI Calculator', path: '/tools/loan-emi-calculator', category: 'Loan', icon: Calculator, keywords: 'emi loan home personal car calculator monthly', emoji: '🧮' },
  { name: 'Home Loan EMI', path: '/calculators/home-loan-emi-calculator', category: 'Loan', icon: Home, keywords: 'home loan housing emi calculator interest', emoji: '🏠' },
  { name: 'Personal Loan EMI', path: '/calculators/personal-loan-emi-calculator', category: 'Loan', icon: DollarSign, keywords: 'personal loan emi calculator instant', emoji: '💵' },
  { name: 'Car Loan EMI', path: '/calculators/car-loan-emi-calculator', category: 'Loan', icon: Target, keywords: 'car auto vehicle loan emi calculator', emoji: '🚗' },
  { name: 'Loan Comparison', path: '/calculators/loan-comparison-calculator', category: 'Loan', icon: BarChart3, keywords: 'compare loans interest rate emi bank', emoji: '📊' },
  
  // Festival Tools
  { name: 'Parsi New Year', path: '/festival-tools/parsi-new-year', category: 'Festival', icon: PartyPopper, keywords: 'navroz parsi new year zoroastrian fasli', emoji: '🎊' },
  { name: 'Panchang Today', path: '/festival-tools/panchang-today', category: 'Festival', icon: Calendar, keywords: 'daily panchang tithi nakshatra muhurat today', emoji: '📅' },
  { name: 'Hindu Panchang Year', path: '/festival-tools/hindu-panchang-year', category: 'Festival', icon: BookOpen, keywords: 'hindu calendar panchang year festival', emoji: '📖' },
  { name: 'Weekly Tithi Finder', path: '/festival-tools/weekly-tithi-finder', category: 'Festival', icon: Calendar, keywords: 'tithi lunar calendar week hindu', emoji: '📆' },
  { name: 'Moon Phase Festivals', path: '/festival-tools/moon-phase-festivals', category: 'Festival', icon: Moon, keywords: 'moon phase lunar festivals purnima', emoji: '🌙' },
  { name: 'Purnima Amavasya Dates', path: '/festival-tools/purnima-amavasya-dates', category: 'Festival', icon: Moon, keywords: 'full moon new moon dates calendar', emoji: '🌕' },
  { name: 'Vrat Upavas Calendar', path: '/festival-tools/vrat-upavas-calendar', category: 'Festival', icon: Calendar, keywords: 'fasting vrat upavas hindu calendar', emoji: '🙏' },
  { name: 'Nakshatra Festival', path: '/festival-tools/nakshatra-festival', category: 'Festival', icon: Star, keywords: 'nakshatra birth star festival horoscope', emoji: '⭐' },
  { name: 'Shubh Muhurat Reminder', path: '/festival-tools/shubh-muhurat-reminder', category: 'Festival', icon: Bell, keywords: 'auspicious time muhurat reminder alert', emoji: '🔔' },
  { name: 'Auspicious Marriage Days', path: '/festival-tools/auspicious-marriage-days', category: 'Festival', icon: Heart, keywords: 'marriage wedding dates muhurat auspicious vivah', emoji: '💍' },
  { name: 'Lunar Eclipse Predictor', path: '/festival-tools/lunar-eclipse-predictor', category: 'Festival', icon: Moon, keywords: 'lunar solar eclipse grahan dates timings sutak', emoji: '🌑' },
  
  // Learn Sections
  { name: 'Gold Loans - 10 Lessons', path: '/learn/gold-loans', category: 'Learn', icon: Trophy, keywords: 'gold loan education lessons guide complete', emoji: '🏆' },
  { name: 'Credit Cards - 20 Lessons', path: '/learn/credit-cards', category: 'Learn', icon: CreditCard, keywords: 'credit card lessons guide education complete', emoji: '💳' },
  { name: 'Credit Score - 10 Lessons', path: '/learn/credit-score', category: 'Learn', icon: BarChart3, keywords: 'credit score cibil lessons guide complete', emoji: '📊' },
  
  // Insurance Tools
  { name: 'Life Insurance Calculator', path: '/calculators/life-insurance-calculator', category: 'Insurance', icon: Shield, keywords: 'life insurance cover calculator term', emoji: '🛡️' },
  { name: 'Health Insurance Premium', path: '/calculators/health-insurance-premium-calculator', category: 'Insurance', icon: Heart, keywords: 'health insurance premium calculator medical', emoji: '❤️' },
  
  // Retirement Tools
  { name: 'Retirement Calculator', path: '/calculators/retirement-calculator', category: 'Retirement', icon: PiggyBank, keywords: 'retirement planning corpus calculator savings', emoji: '👴' },
  { name: 'NPS Calculator', path: '/calculators/nps-calculator', category: 'Retirement', icon: Target, keywords: 'national pension scheme nps calculator tier', emoji: '🎯' },
  { name: 'EPF Calculator', path: '/calculators/epf-calculator', category: 'Retirement', icon: Building, keywords: 'employees provident fund epf pf calculator', emoji: '🏢' },
  
  // Other Popular Tools
  { name: 'Salary Calculator', path: '/calculators/salary-calculator', category: 'Salary', icon: DollarSign, keywords: 'salary in hand take home ctc calculator', emoji: '💰' },
  { name: 'Gratuity Calculator', path: '/calculators/gratuity-calculator', category: 'Salary', icon: Gift, keywords: 'gratuity calculation retirement amount', emoji: '🎁' },
  { name: 'Currency Converter', path: '/tools/currency-converter', category: 'Currency', icon: Globe, keywords: 'currency exchange converter forex usd inr', emoji: '🌍' },
  { name: 'Inflation Calculator', path: '/calculators/inflation-calculator', category: 'Finance', icon: TrendingUp, keywords: 'inflation rate calculator future value', emoji: '📈' },
  { name: 'Break Even Calculator', path: '/calculators/break-even-calculator', category: 'Business', icon: Target, keywords: 'break even analysis business profit', emoji: '🎯' },
  { name: 'Margin Calculator', path: '/calculators/margin-calculator', category: 'Business', icon: Percent, keywords: 'profit margin markup calculator business', emoji: '💹' },
  { name: 'Discount Calculator', path: '/calculators/discount-calculator', category: 'Shopping', icon: Tag, keywords: 'discount percentage off calculator sale', emoji: '🏷️' },
  
  // Blog Posts
  ...blogPosts0.map(post => ({ 
    name: post.title, 
    path: `/blog/${post.slug}`, 
    category: 'Blog', 
    icon: Newspaper,
    keywords: post.categories.join(' ') + ' ' + post.excerpt,
    emoji: '📰'
  })),
  ...blogPosts1.map(post => ({ 
    name: post.title, 
    path: `/blog/${post.slug}`, 
    category: 'Blog', 
    icon: Newspaper,
    keywords: post.categories.join(' ') + ' ' + post.excerpt,
    emoji: '📰'
  }))
];

const HomeInvestopedia: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof searchDatabase>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const navigate = useNavigate();

  // Update date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(getCurrentDate());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const results = searchDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query)
      ).slice(0, 12);
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

  const categories = [
    { id: 'all', name: language === 'en' ? 'All Tools' : 'सभी टूल्स', icon: Grid, color: 'from-blue-500 to-cyan-500', count: '100+' },
    { id: 'investment', name: language === 'en' ? 'Investment' : 'निवेश', icon: TrendingUp, color: 'from-green-500 to-emerald-500', count: '15+' },
    { id: 'gst', name: 'GST', icon: Calculator, color: 'from-purple-500 to-pink-500', count: '20+' },
    { id: 'tax', name: language === 'en' ? 'Tax' : 'कर', icon: FileText, color: 'from-orange-500 to-red-500', count: '10+' },
    { id: 'loan', name: language === 'en' ? 'Loans' : 'लोन', icon: Home, color: 'from-indigo-500 to-purple-500', count: '8+' },
    { id: 'festival', name: language === 'en' ? 'Festival' : 'त्योहार', icon: PartyPopper, color: 'from-pink-500 to-rose-500', count: '11', badge: 'Hot' },
    { id: 'learn', name: language === 'en' ? 'Learn' : 'सीखें', icon: BookOpen, color: 'from-yellow-500 to-orange-500', count: '40', badge: 'New' },
    { id: 'blog', name: language === 'en' ? 'Blog' : 'ब्लॉग', icon: Newspaper, color: 'from-cyan-500 to-blue-500', count: '50+' }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? searchDatabase 
    : searchDatabase.filter(tool => tool.category.toLowerCase() === selectedCategory);

  return (
    <>
      <SEOHelmet
        title="MoneyCal India - Free Financial Calculators, Investment Tools & Market News | #1 Indian Finance Platform"
        description="India's most comprehensive financial platform. 100+ free calculators, 40 learn lessons, 11 festival tools, live market news. Master GST, Tax, SIP, EMI, Eclipse dates. E-E-A-T compliant financial education in Hindi & English."
        keywords="financial calculators India, investment tools, GST calculator, tax calculator 2025, SIP calculator, EMI calculator, eclipse dates 2025, marriage muhurat, stock market India, mutual funds, personal finance, Hindi financial education"
        canonicalUrl="https://moneycal.in"
      />

      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute w-96 h-96 rounded-full blur-3xl animate-pulse ${
            theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-400/20'
          }`} style={{ top: '10%', left: '10%' }}></div>
          <div className={`absolute w-96 h-96 rounded-full blur-3xl animate-pulse ${
            theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-400/20'
          }`} style={{ top: '50%', right: '10%', animationDelay: '1s' }}></div>
          <div className={`absolute w-96 h-96 rounded-full blur-3xl animate-pulse ${
            theme === 'dark' ? 'bg-pink-500/10' : 'bg-pink-400/20'
          }`} style={{ bottom: '10%', left: '50%', animationDelay: '2s' }}></div>
                </div>

        {/* Top Navigation Menu Bar - Beautiful Structure */}
        <div className={`relative z-10 ${
          theme === 'dark' 
            ? 'bg-slate-900/95' 
            : 'bg-white/95'
        } backdrop-blur-xl sticky top-0 shadow-2xl`}>
          {/* Main Navigation */}
          <div className={`border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
              <div className="flex justify-between items-center gap-2">
                {/* Logo */}
                <Link to="/" className="flex flex-col group flex-shrink-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <span className="text-white font-bold text-lg sm:text-xl">M</span>
                    </div>
                    <div>
                      <span className={`text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block`}>
                        MoneyCal.in
                      </span>
                      <span className={`text-[9px] sm:text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Smart Financial Tools
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Link
                    to="/learn"
                    className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold hover:shadow-lg active:scale-95 transition-all text-xs sm:text-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">📚</span>
                  </Link>

                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`p-1.5 sm:p-2 rounded-full transition-all active:scale-95 ${
                      theme === 'dark' 
                        ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>

                  <button
                    onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                    className={`flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all text-xs sm:text-sm font-medium active:scale-95 ${
                      theme === 'dark'
                        ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{language === 'en' ? 'हिंदी' : 'EN'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mega Menu - All Sections */}
          <div className={`${theme === 'dark' ? 'bg-slate-800/50' : 'bg-gray-50/80'} border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
              <div className="flex overflow-x-auto gap-1.5 sm:gap-2 pb-2 scrollbar-thin scrollbar-thumb-blue-500 -mx-3 sm:-mx-0 px-3 sm:px-0">
                {[
                  { name: language === 'en' ? 'All Tools' : 'सभी', path: '/tools', emoji: '🧰' },
                  { name: language === 'en' ? 'Calculators' : 'कैलकुलेटर', path: '/calculators', emoji: '🧮' },
                  { name: language === 'en' ? 'Finance' : 'वित्त', path: '/finance-tools', emoji: '💵' },
                  { name: language === 'en' ? 'Tax' : 'कर', path: '/tax-tools', emoji: '📄' },
                  { name: 'GST', path: '/gst-tools', emoji: '💰' },
                  { name: language === 'en' ? 'Corporate' : 'कॉर्पोरेट', path: '/corporate-finance', emoji: '💼' },
                  { name: language === 'en' ? 'Insurance' : 'बीमा', path: '/insurance-tools', emoji: '🛡️' },
                  { name: language === 'en' ? 'Festival' : 'त्योहार', path: '/festival-tools', emoji: '🎉' },
                  { name: language === 'en' ? 'Blog' : 'ब्लॉग', path: '/blog', emoji: '📰' },
                  { name: language === 'en' ? 'Education' : 'शिक्षा', path: '/learn', emoji: '🎓' },
                  { name: language === 'en' ? 'Help' : 'सहायता', path: '/help-center', emoji: '❓' },
                  { name: language === 'en' ? 'Schemes' : 'योजना', path: '/government-schemes', emoji: '🎁' },
                  { name: language === 'en' ? 'Astro' : 'ज्योतिष', path: '/astro-finance', emoji: '⭐' }
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`flex-shrink-0 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap active:scale-95 ${
                      theme === 'dark'
                        ? 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/70 hover:text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{item.emoji}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mega Search Bar - Mobile Optimized */}
        <div className={`border-b ${
          theme === 'dark' 
            ? 'bg-slate-900/95 border-white/10' 
            : 'bg-white/95 border-gray-200'
        } backdrop-blur-xl shadow-xl`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
            <div className="relative">
              <div className="relative group">
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative">
                  <Search className={`absolute left-3 sm:left-4 md:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'en' 
                      ? window.innerWidth < 640 
                        ? '🔍 Search tools, calculators...' 
                        : '🔍 Search anything... GST, SIP, EMI, Eclipse, Marriage Dates'
                      : '🔍 खोजें... GST, SIP, EMI'}
                    className={`w-full pl-10 sm:pl-12 md:pl-16 pr-10 sm:pr-12 md:pr-16 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl focus:ring-4 transition-all outline-none font-medium ${
                      theme === 'dark'
                        ? 'bg-slate-800/50 border-white/10 focus:ring-blue-500/30 focus:border-blue-500 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 focus:ring-blue-200 focus:border-blue-500 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  {searchQuery && (
                  <button
                      onClick={() => {
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                  </button>
                  )}
                </div>
              </div>

              {/* Popular Quick Access */}
              {!searchQuery && (
          <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  <span className={`text-sm font-semibold flex items-center gap-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Flame className="w-4 h-4 text-orange-500" />
                    {language === 'en' ? 'Popular:' : 'लोकप्रिय:'}
                  </span>
                  {[
                    { text: '💰 GST', query: 'gst', color: 'from-purple-500 to-pink-500' },
                    { text: '📈 SIP', query: 'sip', color: 'from-green-500 to-emerald-500' },
                    { text: '🏠 EMI', query: 'emi', color: 'from-blue-500 to-cyan-500' },
                    { text: '🌑 Eclipse', query: 'eclipse', color: 'from-indigo-500 to-purple-500' },
                    { text: '💍 Marriage', query: 'marriage', color: 'from-pink-500 to-rose-500' },
                    { text: '📊 Tax', query: 'tax', color: 'from-orange-500 to-red-500' },
                    { text: '🏆 Learn', query: 'learn', color: 'from-yellow-500 to-orange-500' }
            ].map((item, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchQuery(item.query)}
                      className={`px-4 py-2 bg-gradient-to-r ${item.color} text-white rounded-full text-sm font-bold hover:shadow-lg transition-all`}
                    >
                      {item.text}
                    </motion.button>
            ))}
          </motion.div>
              )}

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
            <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className={`absolute top-full left-0 right-0 mt-2 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 max-h-[500px] overflow-y-auto ${
                      theme === 'dark'
                        ? 'bg-slate-800/95 border-white/10'
                        : 'bg-white/95 border-gray-200'
                    }`}
                  >
                    <div className="p-3">
                      <div className={`text-xs px-4 py-2 font-semibold flex items-center justify-between ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <span>{searchResults.length} {language === 'en' ? 'results found' : 'परिणाम मिले'}</span>
                        <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>
                          {language === 'en' ? 'Click to open' : 'खोलने के लिए क्लिक करें'}
                </span>
                    </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {searchResults.map((result, idx) => (
                          <motion.button
                                      key={idx}
                            onClick={() => handleSearchItemClick(result.path)}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className={`text-left px-4 py-3 rounded-2xl transition-all group border border-transparent ${
                              theme === 'dark'
                                ? 'hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-white/10'
                                : 'hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:border-gray-300'
                            }`}
                                    >
                                      <div className="flex items-center gap-3">
                              <div className="text-3xl">{result.emoji}</div>
                              <div className="flex-1 min-w-0">
                                <div className={`font-bold mb-1 truncate ${
                                  theme === 'dark'
                                    ? 'text-white group-hover:text-blue-400'
                                    : 'text-gray-900 group-hover:text-blue-600'
                                }`}>
                                  {result.name}
                                      </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold">
                                    {result.category}
                                  </span>
                                  <span className={`text-xs truncate ${
                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                                  }`}>{result.path}</span>
                                </div>
                            </div>
                              <ArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${
                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                              }`} />
                            </div>
                          </motion.button>
                                ))}
                              </div>
                            </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

              {/* No Results */}
              <AnimatePresence>
                {showSearchResults && searchResults.length === 0 && searchQuery.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-white/10 p-8"
                  >
                    <div className="text-center">
                      <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-white font-bold text-xl mb-2">
                        {language === 'en' ? 'No results found' : 'कोई परिणाम नहीं मिला'}
                      </p>
                      <p className="text-gray-400">
                        {language === 'en' 
                          ? 'Try: Calculator, GST, Tax, Loan, Festival, Eclipse, Marriage' 
                          : 'खोजें: कैलकुलेटर, GST, टैक्स, लोन, त्योहार, ग्रहण, शादी'}
                            </p>
                          </div>
                </motion.div>
                )}
              </AnimatePresence>
              </div>
              </div>
          </div>

        {/* Hero Section - Mobile Optimized */}
        <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 sm:mb-10 md:mb-12"
            >
            <motion.div
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="inline-block mb-4 sm:mb-5 md:mb-6"
              >
                <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight ${
                  theme === 'dark' ? '' : 'drop-shadow-sm'
                }`} style={{ backgroundSize: '200% 200%' }}>
                  {language === 'en' ? 'Money Made Easy 💰' : 'पैसा आसान 💰'}
                </h1>
            </motion.div>
              <p className={`text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-7 md:mb-8 max-w-4xl mx-auto font-medium leading-relaxed px-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {language === 'en' 
                  ? '🚀 100+ Free Tools • 40 Lessons • 11 Festival Tools'
                  : '🚀 100+ टूल्स • 40 पाठ • 11 त्योहार'}
              </p>

              {/* All Folders Navigation - Comprehensive */}
              <div className={`max-w-6xl mx-auto mb-6 sm:mb-8 md:mb-10 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border-2 ${
                theme === 'dark'
                  ? 'bg-slate-800/30 border-white/10 backdrop-blur-xl'
                  : 'bg-white/80 border-gray-200 backdrop-blur-xl shadow-xl'
              }`}>
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5 md:mb-6">
                  <Layout className={`w-5 h-5 sm:w-6 sm:h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {language === 'en' ? '📁 Complete Platform' : '📁 पूर्ण प्लेटफॉर्म'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3">
                  {[
                    // Main Page Folders
                    { name: language === 'en' ? 'Calculators' : 'कैलकुलेटर', path: '/calculators', emoji: '🧮', count: '107', color: 'from-green-500 to-emerald-500' },
                    { name: language === 'en' ? 'Learn' : 'सीखें', path: '/learn', emoji: '📚', count: '40', color: 'from-yellow-500 to-orange-500' },
                    { name: language === 'en' ? 'Festival' : 'त्योहार', path: '/festival-tools', emoji: '🎉', count: '11', color: 'from-pink-500 to-rose-500' },
                    { name: language === 'en' ? 'GST' : 'GST', path: '/gst-tools', emoji: '💰', count: '20+', color: 'from-purple-500 to-pink-500' },
                    { name: language === 'en' ? 'Tax' : 'कर', path: '/tax-tools', emoji: '📄', count: '15+', color: 'from-orange-500 to-red-500' },
                    { name: language === 'en' ? 'Loans' : 'लोन', path: '/loan-tools', emoji: '🏠', count: '12+', color: 'from-indigo-500 to-purple-500' },
                    { name: language === 'en' ? 'Insurance' : 'बीमा', path: '/insurance-tools', emoji: '🛡️', count: '8+', color: 'from-teal-500 to-cyan-500' },
                    { name: language === 'en' ? 'Corporate' : 'कॉर्पोरेट', path: '/corporate-finance', emoji: '💼', count: '25+', color: 'from-violet-500 to-purple-500' },
                    { name: language === 'en' ? 'Gold' : 'गोल्ड', path: '/gold-tools', emoji: '🏆', count: '10+', color: 'from-yellow-600 to-orange-600' },
                    { name: language === 'en' ? 'Finance' : 'वित्त', path: '/finance-tools', emoji: '💵', count: '30+', color: 'from-green-600 to-emerald-600' },
                    { name: language === 'en' ? 'Personal' : 'व्यक्तिगत', path: '/personal-finance', emoji: '👤', count: '15+', color: 'from-blue-600 to-cyan-600' },
                    { name: language === 'en' ? 'Religious' : 'धार्मिक', path: '/religious-tools', emoji: '🙏', count: '10+', color: 'from-orange-600 to-red-600' },
                    { name: language === 'en' ? 'Invoicing' : 'चालान', path: '/invoicing-tools', emoji: '📋', count: '8+', color: 'from-slate-600 to-gray-600' },
                    { name: language === 'en' ? 'Blog' : 'ब्लॉग', path: '/blog', emoji: '📰', count: '150+', color: 'from-cyan-500 to-blue-500' },
                    { name: language === 'en' ? 'Crypto' : 'क्रिप्टो', path: '/crypto', emoji: '₿', count: '50+', color: 'from-orange-500 to-yellow-500' },
                    { name: language === 'en' ? 'Excel Tools' : 'एक्सेल', path: '/excel-tools', emoji: '📊', count: '100+', color: 'from-green-500 to-teal-500' },
                    { name: language === 'en' ? 'Banking' : 'बैंकिंग', path: '/bank-tools', emoji: '🏦', count: '15+', color: 'from-blue-500 to-indigo-500' },
                    { name: language === 'en' ? 'Market' : 'बाज़ार', path: '/stock-market', emoji: '📈', count: '20+', color: 'from-red-500 to-pink-500' },
                    { name: language === 'en' ? 'Schemes' : 'योजनाएं', path: '/government-schemes', emoji: '🎁', count: '50+', color: 'from-indigo-600 to-purple-600' },
                    { name: language === 'en' ? 'Astro' : 'ज्योतिष', path: '/astro-finance', emoji: '⭐', count: '12+', color: 'from-purple-600 to-pink-600' }
                  ].map((folder, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={folder.path}
                        className={`block p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl text-center transition-all relative overflow-hidden group ${
                          theme === 'dark'
                            ? 'bg-slate-800/40 border border-white/10 hover:border-white/30'
                            : 'bg-white border border-gray-200 hover:border-gray-400 shadow-md hover:shadow-lg'
                        }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${folder.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                        <div className="relative z-10">
                          <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{folder.emoji}</div>
                          <div className={`text-[10px] sm:text-xs md:text-sm font-bold mb-1 truncate ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {folder.name}
                          </div>
                          <div className={`text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 rounded-full inline-block font-semibold ${
                            theme === 'dark'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {folder.count}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Festival Categories Section */}
                <div className={`mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-orange-900/20 to-pink-900/20 border-orange-500/30'
                    : 'bg-gradient-to-br from-orange-50 to-pink-50 border-orange-300'
                }`}>
                  <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 text-center ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-700'
                  }`}>
                    🎊 {language === 'en' ? 'Festival Tool Categories' : 'त्योहार टूल श्रेणियां'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5">
                    {[
                      { name: language === 'en' ? 'Date & Calendar' : 'तिथि कैलेंडर', path: '/festival-dates', emoji: '📅' },
                      { name: language === 'en' ? 'Planning & Shopping' : 'योजना खरीदारी', path: '/festival-shopping', emoji: '🛍️' },
                      { name: language === 'en' ? 'Finance & Money' : 'वित्त धन', path: '/festival-finance', emoji: '💰' },
                      { name: language === 'en' ? 'Religious' : 'धार्मिक', path: '/religious-tools', emoji: '🙏' },
                      { name: language === 'en' ? 'Fun & Games' : 'मज़ेदार', path: '/fun-engagement', emoji: '🎮' },
                      { name: language === 'en' ? 'Design' : 'डिज़ाइन', path: '/design-tools', emoji: '🎨' },
                      { name: language === 'en' ? 'Information' : 'जानकारी', path: '/festival-info', emoji: '📖' },
                      { name: language === 'en' ? 'Corporate' : 'कॉर्पोरेट', path: '/festival-corporate-tools', emoji: '💼' },
                      { name: language === 'en' ? 'Regional' : 'क्षेत्रीय', path: '/regional-tools', emoji: '🗺️' },
                      { name: 'SEO', path: '/seo-tools', emoji: '📊' }
                    ].map((cat, idx) => (
                      <Link
                        key={idx}
                        to={cat.path}
                        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all active:scale-95 ${
                          theme === 'dark'
                            ? 'bg-slate-700/50 text-orange-300 hover:bg-slate-600/70'
                            : 'bg-white text-orange-700 hover:bg-orange-100 border border-orange-200'
                        }`}
                      >
                        <span className="text-base sm:text-lg">{cat.emoji}</span>
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/tools"
                    className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-lg sm:shadow-xl md:shadow-2xl overflow-hidden active:scale-95 transition-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10" />
                    <span className="relative z-10">{language === 'en' ? 'Explore 100+ Tools' : '100+ टूल्स'}</span>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10" />
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/learn"
                    className={`inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 backdrop-blur-xl border-2 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-lg sm:shadow-xl md:shadow-2xl transition-all active:scale-95 ${
                      theme === 'dark'
                        ? 'bg-slate-800/50 border-white/20 text-white hover:bg-slate-700/50'
                        : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span>{language === 'en' ? 'Start Learning FREE' : 'मुफ्त सीखें'}</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Category Filters - Mobile Optimized */}
        <section className={`relative py-4 sm:py-6 md:py-8 border-y ${
          theme === 'dark'
            ? 'border-white/10 bg-slate-900/50'
            : 'border-gray-200 bg-gray-50/50'
        }`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
              <h2 className={`text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-1.5 sm:gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Filter className={`w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className="hidden xs:inline">{language === 'en' ? 'Browse by Category' : 'श्रेणी'}</span>
                <span className="xs:hidden">{language === 'en' ? 'Categories' : 'श्रेणी'}</span>
              </h2>
              <div className="flex gap-1.5 sm:gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all active:scale-95 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white' 
                      : theme === 'dark' ? 'bg-slate-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all active:scale-95 ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white' 
                      : theme === 'dark' ? 'bg-slate-800 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>
          </div>
            <div className="flex overflow-x-auto gap-2 sm:gap-2.5 md:gap-3 pb-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-slate-800 -mx-3 sm:-mx-0 px-3 sm:px-0">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative flex-shrink-0 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl font-bold transition-all text-xs sm:text-sm active:scale-95 ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                      : theme === 'dark'
                        ? 'bg-slate-800/50 text-gray-400 hover:text-white border border-white/10'
                        : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <cat.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                    <span className="whitespace-nowrap">{cat.name}</span>
                    <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                      selectedCategory === cat.id ? 'bg-white/20' : theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                    }`}>
                      {cat.count}
                    </span>
                  </div>
                  {cat.badge && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                      {cat.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid/List - Mobile Optimized */}
        <section className="relative py-6 sm:py-10 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6' : 'space-y-3 sm:space-y-4'}>
              {filteredTools.slice(0, 20).map((tool, idx) => (
            <motion.div
                  key={idx}
              initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Link
                    to={tool.path}
                    className={`block h-full backdrop-blur-xl border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 transition-all group active:scale-95 ${
                      theme === 'dark'
                        ? 'bg-slate-800/50 border-white/10 hover:border-blue-500/50'
                        : 'bg-white border border-gray-200 hover:border-blue-500 shadow-md hover:shadow-lg'
                    } ${viewMode === 'list' ? 'flex items-center gap-3 sm:gap-4' : ''}`}
                  >
                    <div className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform ${viewMode === 'list' ? 'mb-0' : ''}`}>
                      {tool.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1.5 sm:mb-2 transition-colors line-clamp-2 ${
                        theme === 'dark'
                          ? 'text-white group-hover:text-blue-400'
                          : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {tool.name}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] sm:text-xs px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full font-bold border truncate ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-300'
                        }`}>
                          {tool.category}
                        </span>
                        <ArrowRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-all flex-shrink-0 ${
                          theme === 'dark'
                            ? 'text-gray-400 group-hover:text-blue-400'
                            : 'text-gray-600 group-hover:text-blue-600'
                        }`} />
                      </div>
                    </div>
                  </Link>
              </motion.div>
              ))}
            </div>

            {/* Show More - Mobile Optimized */}
            {filteredTools.length > 20 && (
              <div className="text-center mt-8 sm:mt-10 md:mt-12">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl sm:rounded-2xl font-bold shadow-lg sm:shadow-xl md:shadow-2xl text-sm sm:text-base active:scale-95 transition-transform"
                >
                  {language === 'en' ? `View All ${filteredTools.length} Tools` : `सभी ${filteredTools.length} देखें`}
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 inline ml-2" />
                </motion.button>
              </div>
            )}
          </div>
        </section>

        {/* Trust & E-E-A-T Section - Mobile Optimized */}
        <section className={`relative py-8 sm:py-12 md:py-16 border-y ${
          theme === 'dark'
            ? 'border-white/10 bg-slate-900/50'
            : 'border-gray-200 bg-gray-50/50'
        }`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {language === 'en' ? '🏆 Why Trust MoneyCal' : '🏆 क्यों भरोसा करें'}
              </h2>
              <p className={`text-xs sm:text-sm md:text-base lg:text-lg px-2 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {language === 'en' ? 'E-E-A-T Compliant • Expert Verified • RBI Guidelines' : 'E-E-A-T • विशेषज्ञ • RBI'}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {[
                { icon: CheckCircle, title: language === 'en' ? 'RBI Compliant' : 'RBI अनुपालन', desc: language === 'en' ? 'Following all regulations' : 'सभी नियमों का पालन', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, title: language === 'en' ? 'Secure & Private' : 'सुरक्षित और निजी', desc: language === 'en' ? 'No data stored' : 'कोई डेटा संग्रहीत नहीं', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, title: language === 'en' ? 'Expert Verified' : 'विशेषज्ञ सत्यापित', desc: language === 'en' ? 'CA & Finance experts' : 'CA और वित्त विशेषज्ञ', color: 'from-purple-500 to-pink-500' },
                { icon: Star, title: '4.9/5 Rating', desc: language === 'en' ? '10,000+ Reviews' : '10,000+ समीक्षाएं', color: 'from-yellow-500 to-orange-500' }
              ].map((trust, idx) => (
                <motion.div
                  key={idx}
                  className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 text-center active:scale-95 transition-transform ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border-white/10'
                      : 'bg-white border border-gray-200 shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${trust.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg`}>
                    <trust.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-1.5 md:mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{trust.title}</h3>
                  <p className={`text-[10px] sm:text-xs md:text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>{trust.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA - Mobile Optimized */}
        <section className="relative py-10 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-5 md:mb-6 px-2">
                {language === 'en' ? '🚀 Ready to Master Finances?' : '🚀 वित्त में महारत?'}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-7 md:mb-8 px-2">
                {language === 'en' 
                  ? 'Join India\'s #1 Financial Platform'
                  : 'भारत के #1 वित्तीय प्लेटफॉर्म से जुड़ें'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/tools"
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white text-purple-600 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-lg sm:shadow-xl md:shadow-2xl active:scale-95 transition-transform"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    {language === 'en' ? 'Get Started FREE' : 'मुफ्त शुरू करें'}
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/learn"
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 bg-transparent border-2 border-white text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg active:scale-95 transition-transform"
                  >
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    {language === 'en' ? 'Explore 40 Lessons' : '40 पाठ'}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mini Footer - Mobile Optimized */}
        <footer className={`relative py-4 sm:py-6 md:py-8 border-t ${
          theme === 'dark'
            ? 'bg-slate-950 border-white/10'
            : 'bg-gray-100 border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 text-center">
            <p className={`text-[10px] sm:text-xs md:text-sm px-2 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'en' 
                ? `© ${currentDate.year} MoneyCal India. Made with 💙 for India.`
                : `© ${currentDate.year} MoneyCal India. भारत के लिए 💙`}
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> Last updated: </span>
              <span className="sm:hidden text-[9px]"> • </span>
              {currentDate.day} {currentDate.month} {currentDate.year}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeInvestopedia;
