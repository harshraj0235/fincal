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
  Home, PiggyBank, Smartphone, Trophy, Grid,
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
    time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: 'digit' }),
    dayName: now.toLocaleDateString('en-IN', { weekday: 'long' }),
    fullDate: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  };
};

// Comprehensive Search Database
const searchDatabase = [
  // Investment Tools
  { name: 'SIP Calculator', path: '/tools/sip-calculator', category: 'Investment', keywords: 'mutual fund sip systematic investment plan monthly', emoji: '📈' },
  { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', keywords: 'public provident fund ppf retirement savings', emoji: '🏦' },
  { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', keywords: 'fixed deposit fd interest bank', emoji: '💰' },
  { name: 'CAGR Calculator', path: '/calculators/cagr-calculator', category: 'Investment', keywords: 'compound annual growth rate returns', emoji: '📊' },
  
  // GST Tools
  { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', keywords: 'goods services tax gst calculator inclusive exclusive', emoji: '🧮' },
  { name: 'HSN/SAC Finder', path: '/tools/gst-hsn-sac-finder', category: 'GST', keywords: 'hsn sac code gst finder search product service', emoji: '🔍' },
  
  // Tax Tools
  { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator', category: 'Tax', keywords: 'income tax calculator old new regime 2025 2026', emoji: '📄' },
  { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', keywords: 'house rent allowance hra exemption calculator', emoji: '🏠' },
  
  // Loan Tools
  { name: 'EMI Calculator', path: '/tools/loan-emi-calculator', category: 'Loan', keywords: 'emi loan home personal car calculator monthly', emoji: '🧮' },
  { name: 'Home Loan EMI', path: '/calculators/home-loan-emi-calculator', category: 'Loan', keywords: 'home loan housing emi calculator interest', emoji: '🏠' },
  
  // Festival Tools
  { name: 'Lunar Eclipse Predictor', path: '/festival-tools/lunar-eclipse-predictor', category: 'Festival', keywords: 'lunar solar eclipse grahan dates timings sutak', emoji: '🌑' },
  { name: 'Auspicious Marriage Days', path: '/festival-tools/auspicious-marriage-days', category: 'Festival', keywords: 'marriage wedding dates muhurat auspicious vivah', emoji: '💍' },
  { name: 'Panchang Today', path: '/festival-tools/panchang-today', category: 'Festival', keywords: 'daily panchang tithi nakshatra muhurat today', emoji: '📅' },
  
  // Learn Sections
  { name: 'Gold Loans - 10 Lessons', path: '/learn/gold-loans', category: 'Learn', keywords: 'gold loan education lessons guide complete', emoji: '🏆' },
  { name: 'Credit Cards - 20 Lessons', path: '/learn/credit-cards', category: 'Learn', keywords: 'credit card lessons guide education complete', emoji: '💳' },
  { name: 'Credit Score - 10 Lessons', path: '/learn/credit-score', category: 'Learn', keywords: 'credit score cibil lessons guide complete', emoji: '📊' },
  
  // Blog Posts
  ...blogPosts0.map(post => ({ 
    name: post.title, 
    path: `/blog/${post.slug}`, 
    category: 'Blog', 
    keywords: post.categories.join(' ') + ' ' + post.excerpt,
    emoji: '📰'
  })),
  ...blogPosts1.map(post => ({ 
    name: post.title, 
    path: `/blog/${post.slug}`, 
    category: 'Blog', 
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

        {/* Simple Top Navbar */}
        <div className={`relative z-10 ${
          theme === 'dark' 
            ? 'bg-slate-900/95 border-white/10' 
            : 'bg-white/95 border-gray-200'
        } backdrop-blur-xl sticky top-0 shadow-lg border-b`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-white font-bold text-xl sm:text-2xl">M</span>
                </div>
                <span className="text-lg sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MoneyCal
                </span>
              </Link>

              {/* Right Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-2 sm:p-2.5 rounded-xl transition-all active:scale-95 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>

                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all text-sm sm:text-base font-bold active:scale-95 ${
                    theme === 'dark'
                      ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
                </button>
              </div>
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
                className="inline-block mb-6 sm:mb-8"
              >
                <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight ${
                  theme === 'dark' ? '' : 'drop-shadow-sm'
                }`} style={{ backgroundSize: '200% 200%' }}>
                  {language === 'en' ? 'Money Made Easy 💰' : 'पैसा आसान 💰'}
                </h1>
              </motion.div>

              {/* Search Section - Below Hero Title */}
              <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
                <div className="relative">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                    <div className="relative">
                      <Search className={`absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={language === 'en' 
                          ? '🔍 Search anything... GST, SIP, EMI, Eclipse, Marriage Dates'
                          : '🔍 खोजें... GST, SIP, EMI, ग्रहण, शादी'}
                        className={`w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-4 sm:py-5 text-base sm:text-lg md:text-xl backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl focus:ring-4 transition-all outline-none font-medium ${
                          theme === 'dark'
                            ? 'bg-slate-800/70 border-white/20 focus:ring-blue-500/40 focus:border-blue-500 text-white placeholder-gray-400'
                            : 'bg-white/90 border-gray-300 focus:ring-blue-300 focus:border-blue-600 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setShowSearchResults(false);
                          }}
                          className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                        >
                          <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Popular Tags */}
                  {!searchQuery && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-2.5"
                    >
                      <span className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
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
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSearchQuery(item.query)}
                          className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r ${item.color} text-white rounded-full text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all`}
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
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute top-full left-0 right-0 mt-3 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 max-h-[400px] overflow-y-auto z-50 ${
                          theme === 'dark'
                            ? 'bg-slate-800/98 border-white/10'
                            : 'bg-white/98 border-gray-300'
                        }`}
                      >
                        <div className="p-3 sm:p-4">
                          <div className={`text-xs sm:text-sm px-3 py-2 font-bold mb-2 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {searchResults.length} {language === 'en' ? 'found' : 'मिले'}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {searchResults.map((result, idx) => (
                              <motion.button
                                key={idx}
                                onClick={() => handleSearchItemClick(result.path)}
                                whileTap={{ scale: 0.98 }}
                                className={`text-left px-3 sm:px-4 py-3 rounded-xl sm:rounded-2xl transition-all group ${
                                  theme === 'dark'
                                    ? 'hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20'
                                    : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-transparent hover:border-gray-200'
                                }`}
                              >
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className="text-2xl sm:text-3xl">{result.emoji}</div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`font-bold text-sm sm:text-base mb-0.5 truncate ${
                                      theme === 'dark'
                                        ? 'text-white group-hover:text-blue-400'
                                        : 'text-gray-900 group-hover:text-blue-600'
                                    }`}>
                                      {result.name}
                                    </div>
                                    <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-[10px] sm:text-xs font-bold">
                                      {result.category}
                                    </span>
                                  </div>
                                  <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
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
                        className={`absolute top-full left-0 right-0 mt-3 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border-2 p-6 sm:p-8 z-50 ${
                          theme === 'dark'
                            ? 'bg-slate-800/98 border-white/10'
                            : 'bg-white/98 border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <Search className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${
                            theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                          }`} />
                          <p className={`font-bold text-lg sm:text-xl mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {language === 'en' ? 'No results found' : 'कोई परिणाम नहीं'}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {language === 'en' 
                              ? 'Try: GST, SIP, EMI, Eclipse, Marriage' 
                              : 'खोजें: GST, SIP, EMI, ग्रहण, शादी'}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* All Platform Sections */}
              <div className={`max-w-6xl mx-auto mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl border-2 ${
                theme === 'dark'
                  ? 'bg-slate-800/30 border-white/10 backdrop-blur-xl'
                  : 'bg-white/80 border-gray-200 backdrop-blur-xl shadow-xl'
              }`}>
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
                  <Layout className={`w-5 h-5 sm:w-6 sm:h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-base sm:text-lg md:text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {language === 'en' ? '📁 All Sections' : '📁 सभी अनुभाग'}
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 md:gap-3 mb-6">
                  {[
                    { name: language === 'en' ? 'Calculators' : 'कैलकुलेटर', path: '/calculators', emoji: '🧮', count: '107' },
                    { name: language === 'en' ? 'Learn' : 'सीखें', path: '/learn', emoji: '📚', count: '40' },
                    { name: language === 'en' ? 'Festival' : 'त्योहार', path: '/festival-tools', emoji: '🎉', count: '11' },
                    { name: 'GST', path: '/gst-tools', emoji: '💰', count: '20+' },
                    { name: language === 'en' ? 'Tax' : 'कर', path: '/tax-tools', emoji: '📄', count: '15+' },
                    { name: language === 'en' ? 'Loans' : 'लोन', path: '/loan-tools', emoji: '🏠', count: '12+' },
                    { name: language === 'en' ? 'Insurance' : 'बीमा', path: '/insurance-tools', emoji: '🛡️', count: '8+' },
                    { name: language === 'en' ? 'Corporate' : 'कॉर्पोरेट', path: '/corporate-finance', emoji: '💼', count: '25+' },
                    { name: language === 'en' ? 'Gold' : 'गोल्ड', path: '/gold-tools', emoji: '🏆', count: '10+' },
                    { name: language === 'en' ? 'Finance' : 'वित्त', path: '/finance-tools', emoji: '💵', count: '30+' },
                    { name: language === 'en' ? 'Personal' : 'व्यक्तिगत', path: '/personal-finance', emoji: '👤', count: '15+' },
                    { name: language === 'en' ? 'Religious' : 'धार्मिक', path: '/religious-tools', emoji: '🙏', count: '10+' },
                    { name: language === 'en' ? 'Invoicing' : 'चालान', path: '/invoicing-tools', emoji: '📋', count: '8+' },
                    { name: language === 'en' ? 'Blog' : 'ब्लॉग', path: '/blog', emoji: '📰', count: '150+' },
                    { name: language === 'en' ? 'Crypto' : 'क्रिप्टो', path: '/crypto', emoji: '₿', count: '50+' },
                    { name: language === 'en' ? 'Excel' : 'एक्सेल', path: '/excel-tools', emoji: '📊', count: '100+' },
                    { name: language === 'en' ? 'Banking' : 'बैंकिंग', path: '/bank-tools', emoji: '🏦', count: '15+' },
                    { name: language === 'en' ? 'Market' : 'बाज़ार', path: '/stock-market', emoji: '📈', count: '20+' },
                    { name: language === 'en' ? 'Schemes' : 'योजनाएं', path: '/government-schemes', emoji: '🎁', count: '50+' },
                    { name: language === 'en' ? 'Astro' : 'ज्योतिष', path: '/astro-finance', emoji: '⭐', count: '12+' }
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
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Festival Tool Categories */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-orange-900/20 to-pink-900/20 border-orange-500/30'
                    : 'bg-gradient-to-br from-orange-50 to-pink-50 border-orange-300'
                }`}>
                  <h4 className={`text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 text-center ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-700'
                  }`}>
                    🎊 {language === 'en' ? 'Festival Tool Categories' : 'त्योहार श्रेणियां'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-2.5">
                    {[
                      { name: language === 'en' ? 'Date & Calendar' : 'तिथि', path: '/festival-dates', emoji: '📅' },
                      { name: language === 'en' ? 'Shopping' : 'खरीदारी', path: '/festival-shopping', emoji: '🛍️' },
                      { name: language === 'en' ? 'Finance' : 'वित्त', path: '/festival-finance', emoji: '💰' },
                      { name: language === 'en' ? 'Religious' : 'धार्मिक', path: '/religious-tools', emoji: '🙏' },
                      { name: language === 'en' ? 'Fun' : 'मज़ा', path: '/fun-engagement', emoji: '🎮' },
                      { name: language === 'en' ? 'Design' : 'डिज़ाइन', path: '/design-tools', emoji: '🎨' },
                      { name: language === 'en' ? 'Info' : 'जानकारी', path: '/festival-info', emoji: '📖' },
                      { name: language === 'en' ? 'Corporate' : 'कॉर्पोरेट', path: '/festival-corporate-tools', emoji: '💼' },
                      { name: language === 'en' ? 'Regional' : 'क्षेत्रीय', path: '/regional-tools', emoji: '🗺️' },
                      { name: 'SEO', path: '/seo-tools', emoji: '📊' }
                    ].map((cat, idx) => (
                      <Link
                        key={idx}
                        to={cat.path}
                        className={`flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all active:scale-95 ${
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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/tools"
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-xl active:scale-95 transition-transform"
                  >
                    <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                    {language === 'en' ? 'Explore 100+ Tools' : '100+ टूल्स'}
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/learn"
                    className={`inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-xl border-2 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-xl active:scale-95 transition-transform ${
                      theme === 'dark'
                        ? 'bg-slate-800/50 border-white/20 text-white hover:bg-slate-700/50'
                        : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                    {language === 'en' ? 'Start Learning FREE' : 'मुफ्त सीखें'}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
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
                <Filter className={`w-5 h-5 sm:w-6 sm:h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className="hidden sm:inline">{language === 'en' ? 'Browse by Category' : 'श्रेणी'}</span>
                <span className="sm:hidden">{language === 'en' ? 'Filter' : 'फ़िल्टर'}</span>
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
            <div className="flex overflow-x-auto gap-2 sm:gap-2.5 md:gap-3 pb-2 -mx-3 sm:-mx-0 px-3 sm:px-0">
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
                    <cat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap">{cat.name}</span>
                    <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                      selectedCategory === cat.id ? 'bg-white/20' : theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                    }`}>
                      {cat.count}
                    </span>
                  </div>
                  {cat.badge && (
                    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full animate-pulse">
                      {cat.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="relative py-6 sm:py-10 md:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5' : 'space-y-3 sm:space-y-4'}>
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
                    className={`block h-full backdrop-blur-xl border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 transition-all group active:scale-95 ${
                      theme === 'dark'
                        ? 'bg-slate-800/50 border-white/10 hover:border-blue-500/50'
                        : 'bg-white border border-gray-200 hover:border-blue-500 shadow-md hover:shadow-lg'
                    } ${viewMode === 'list' ? 'flex items-center gap-3 sm:gap-4' : ''}`}
                  >
                    <div className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform ${viewMode === 'list' ? 'mb-0' : ''}`}>
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
                        <span className={`text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-bold border truncate ${
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
          </div>
        </section>

        {/* Trust Section */}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {[
                { icon: CheckCircle, title: language === 'en' ? 'RBI Compliant' : 'RBI अनुपालन', desc: language === 'en' ? 'Following regulations' : 'नियमों का पालन', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, title: language === 'en' ? 'Secure' : 'सुरक्षित', desc: language === 'en' ? 'No data stored' : 'कोई डेटा नहीं', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, title: language === 'en' ? 'Expert Verified' : 'विशेषज्ञ', desc: language === 'en' ? 'CA & Finance experts' : 'CA विशेषज्ञ', color: 'from-purple-500 to-pink-500' },
                { icon: Star, title: '4.9/5', desc: language === 'en' ? '10,000+ Reviews' : '10,000+ समीक्षा', color: 'from-yellow-500 to-orange-500' }
              ].map((trust, idx) => (
                <motion.div
                  key={idx}
                  className={`backdrop-blur-xl border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center active:scale-95 transition-transform ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border-white/10'
                      : 'bg-white border border-gray-200 shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${trust.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg`}>
                    <trust.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-1.5 ${
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

        {/* Footer CTA */}
        <section className="relative py-10 sm:py-14 md:py-16 lg:py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-5 px-2">
              {language === 'en' ? '🚀 Master Your Finances' : '🚀 वित्त में महारत'}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-7 px-2">
              {language === 'en' 
                ? 'Join India\'s #1 Financial Platform'
                : 'भारत का #1 प्लेटफॉर्म'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
              <Link
                to="/tools"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-xl active:scale-95 transition-transform"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                {language === 'en' ? 'Get Started FREE' : 'मुफ्त शुरू करें'}
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base active:scale-95 transition-transform"
              >
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                {language === 'en' ? 'Explore 40 Lessons' : '40 पाठ'}
              </Link>
            </div>
          </div>
        </section>

        {/* Mini Footer */}
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
