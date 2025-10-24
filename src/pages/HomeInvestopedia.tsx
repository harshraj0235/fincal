import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Calculator, BookOpen, Newspaper, Users, Globe, 
  ArrowRight, Star, Zap, Shield, Award, BarChart3, Target,
  Sparkles, Rocket, Heart, CheckCircle, Search, ChevronRight,
  DollarSign, Building, Briefcase, Umbrella, PartyPopper, GraduationCap,
  HelpCircle, Gift, Layout, FileText, Calendar, Sun, Moon, X, Flame, Menu
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';

// Get current dynamic date - Fixed
const getCurrentDate = () => {
  const now = new Date();
  return {
    day: now.getDate(),
    month: now.toLocaleDateString('en-IN', { month: 'long' }),
    year: now.getFullYear(),
    fullDate: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  };
};

// Comprehensive Search Database - Complete
const searchDatabase = [
  // Investment
  { name: 'SIP Calculator', path: '/tools/sip-calculator', category: 'Investment', emoji: '📈' },
  { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', emoji: '🏦' },
  { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', emoji: '💰' },
  // GST
  { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', emoji: '🧮' },
  { name: 'HSN/SAC Finder', path: '/tools/gst-hsn-sac-finder', category: 'GST', emoji: '🔍' },
  // Tax
  { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator', category: 'Tax', emoji: '📄' },
  { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', emoji: '🏠' },
  // Loans
  { name: 'EMI Calculator', path: '/tools/loan-emi-calculator', category: 'Loan', emoji: '🧮' },
  { name: 'Home Loan EMI', path: '/calculators/home-loan-emi-calculator', category: 'Loan', emoji: '🏠' },
  // Festival
  { name: 'Lunar Eclipse Predictor', path: '/festival-tools/lunar-eclipse-predictor', category: 'Festival', emoji: '🌑' },
  { name: 'Auspicious Marriage Days', path: '/festival-tools/auspicious-marriage-days', category: 'Festival', emoji: '💍' },
  { name: 'Panchang Today', path: '/festival-tools/panchang-today', category: 'Festival', emoji: '📅' },
  // Learn
  { name: 'Gold Loans - 10 Lessons', path: '/learn/gold-loans', category: 'Learn', emoji: '🏆' },
  { name: 'Credit Cards - 20 Lessons', path: '/learn/credit-cards', category: 'Learn', emoji: '💳' },
  { name: 'Credit Score - 10 Lessons', path: '/learn/credit-score', category: 'Learn', emoji: '📊' },
  // Blogs
  ...blogPosts0.map(post => ({ name: post.title, path: `/blog/${post.slug}`, category: 'Blog', emoji: '📰' })),
  ...blogPosts1.map(post => ({ name: post.title, path: `/blog/${post.slug}`, category: 'Blog', emoji: '📰' }))
];

const HomeInvestopedia: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof searchDatabase>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const currentDate = getCurrentDate();

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const results = searchDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
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

  const mainSections = [
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
  ];

  return (
    <>
      <SEOHelmet
        title="MoneyCal India - Free Financial Calculators, Investment Tools & Market News | #1 Indian Finance Platform"
        description="India's most comprehensive financial platform. 100+ free calculators, 40 learn lessons, 11 festival tools. Master GST, Tax, SIP, EMI. Mobile-friendly financial education."
        keywords="financial calculators India, investment tools, GST calculator, tax calculator, SIP calculator, EMI calculator, stock market India, personal finance"
        canonicalUrl="https://moneycal.in"
      />

      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-400/20'}`} style={{ top: '10%', left: '10%' }}></div>
          <div className={`absolute w-96 h-96 rounded-full blur-3xl ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-400/20'}`} style={{ top: '50%', right: '10%' }}></div>
        </div>

        {/* Top Navigation - Mobile Friendly */}
        <nav className={`relative z-50 ${
          theme === 'dark' ? 'bg-slate-900/98' : 'bg-white/98'
        } backdrop-blur-xl sticky top-0 shadow-xl border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all shadow-lg">
                  <span className="text-white font-black text-2xl">💰</span>
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MoneyCal.in
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-2">
                {mainSections.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span className="hidden xl:inline">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg active:scale-90 transition-all"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-2.5 rounded-xl transition-all active:scale-90 shadow-lg ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' 
                      : 'bg-gradient-to-br from-slate-700 to-blue-900 text-white'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Language Toggle */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="px-4 py-2.5 rounded-xl transition-all text-sm font-bold active:scale-90 shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                >
                  <Globe className="w-4 h-4 inline mr-1.5" />
                  <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`lg:hidden border-t ${theme === 'dark' ? 'border-white/10 bg-slate-800/95' : 'border-gray-200 bg-white/95'} backdrop-blur-xl`}
              >
                <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-2">
                  {mainSections.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                        theme === 'dark'
                          ? 'bg-slate-700/50 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section with Search */}
        <section className="relative py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {/* Hero Title */}
              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight`}>
                {language === 'en' ? 'Money Made Easy 💰' : 'पैसा आसान 💰'}
              </h1>
              
              <p className={`text-xl sm:text-2xl md:text-3xl mb-10 font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {language === 'en' 
                  ? '🚀 100+ Free Tools • 40 Lessons • 11 Festival Tools'
                  : '🚀 100+ टूल्स • 40 पाठ • 11 त्योहार'}
              </p>

              {/* Global Search */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="relative">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30"></div>
                    <div className="relative">
                      <Search className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 ${
                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={language === 'en' 
                          ? '🔍 Search... GST, SIP, EMI, Eclipse, Marriage' 
                          : '🔍 खोजें... GST, SIP, EMI'}
                        className={`w-full pl-16 pr-16 py-6 text-xl backdrop-blur-xl border-2 rounded-3xl focus:ring-4 transition-all outline-none font-medium shadow-2xl ${
                          theme === 'dark'
                            ? 'bg-slate-800/80 border-white/20 focus:ring-blue-500/50 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 focus:ring-blue-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setShowSearchResults(false);
                          }}
                          className="absolute right-6 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-200/50 transition-all active:scale-90"
                        >
                          <X className="w-6 h-6 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Popular Tags */}
                  {!searchQuery && (
                    <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                      <span className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Flame className="w-5 h-5 inline mr-1 text-orange-500" />
                        {language === 'en' ? 'Popular:' : 'लोकप्रिय:'}
                      </span>
                      {['💰 GST', '📈 SIP', '🏠 EMI', '🌑 Eclipse', '💍 Marriage', '📊 Tax', '🏆 Learn'].map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSearchQuery(tag.split(' ')[1].toLowerCase())}
                          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Search Results - Full Width Mobile */}
                  <AnimatePresence>
                    {showSearchResults && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`absolute top-full left-0 right-0 mt-4 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 max-h-[60vh] overflow-y-auto z-50 ${
                          theme === 'dark'
                            ? 'bg-slate-900/98 border-white/20'
                            : 'bg-white/98 border-gray-300'
                        }`}
                      >
                        <div className="p-4">
                          <div className={`text-sm px-4 py-2 font-bold mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            ✨ {searchResults.length} {language === 'en' ? 'Results - Tap to open' : 'परिणाम - टैप करें'}
                          </div>
                          <div className="space-y-2">
                            {searchResults.map((result, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSearchItemClick(result.path)}
                                className={`w-full flex items-center gap-4 px-5 py-5 text-left rounded-2xl border transition-all active:scale-98 ${
                                  theme === 'dark'
                                    ? 'bg-slate-800/70 border-white/10 hover:border-blue-500/50'
                                    : 'bg-white border-gray-200 hover:border-blue-500 shadow-sm'
                                }`}
                              >
                                <div className="text-4xl">{result.emoji}</div>
                                <div className="flex-1 min-w-0">
                                  <div className={`font-bold text-base mb-1 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                  }`}>
                                    {result.name}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold">
                                      {result.category}
                                    </span>
                                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                                      {result.path}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  to="/tools"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 active:scale-95 transition-all"
                >
                  <Calculator className="w-6 h-6" />
                  {language === 'en' ? 'Explore 100+ Tools' : '100+ टूल्स'}
                  <Zap className="w-6 h-6" />
                </Link>
                <Link
                  to="/learn"
                  className={`inline-flex items-center justify-center gap-3 px-8 py-5 backdrop-blur-xl border-2 rounded-2xl font-bold text-lg shadow-2xl active:scale-95 transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-800/70 border-white/30 text-white'
                      : 'bg-white border-gray-400 text-gray-900'
                  }`}
                >
                  <Rocket className="w-6 h-6" />
                  {language === 'en' ? 'Start Learning FREE' : 'मुफ्त सीखें'}
                </Link>
              </div>

              {/* All Platform Sections - Grid */}
              <div className={`max-w-6xl mx-auto p-6 rounded-3xl border-2 ${
                theme === 'dark'
                  ? 'bg-slate-800/30 border-white/10'
                  : 'bg-white/80 border-gray-200 shadow-2xl'
              }`}>
                <h3 className={`text-2xl font-bold text-center mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  📁 {language === 'en' ? 'Complete Platform' : 'पूर्ण प्लेटफॉर्म'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {[
                    { name: 'Calculators', path: '/calculators', emoji: '🧮', count: '107' },
                    { name: 'Learn', path: '/learn', emoji: '📚', count: '40' },
                    { name: 'Festival', path: '/festival-tools', emoji: '🎉', count: '11' },
                    { name: 'GST', path: '/gst-tools', emoji: '💰', count: '20+' },
                    { name: 'Tax', path: '/tax-tools', emoji: '📄', count: '15+' },
                    { name: 'Loans', path: '/loan-tools', emoji: '🏠', count: '12+' },
                    { name: 'Insurance', path: '/insurance-tools', emoji: '🛡️', count: '8+' },
                    { name: 'Corporate', path: '/corporate-finance', emoji: '💼', count: '25+' },
                    { name: 'Gold', path: '/gold-tools', emoji: '🏆', count: '10+' },
                    { name: 'Blog', path: '/blog', emoji: '📰', count: '150+' },
                    { name: 'Crypto', path: '/crypto', emoji: '₿', count: '50+' },
                    { name: 'Excel', path: '/excel-tools', emoji: '📊', count: '100+' },
                    { name: 'Banking', path: '/bank-tools', emoji: '🏦', count: '15+' },
                    { name: 'Market', path: '/stock-market', emoji: '📈', count: '20+' },
                    { name: 'Schemes', path: '/government-schemes', emoji: '🎁', count: '50+' },
                    { name: 'Astro', path: '/astro-finance', emoji: '⭐', count: '12+' }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.02 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.path}
                        className={`block p-4 rounded-2xl text-center transition-all ${
                          theme === 'dark'
                            ? 'bg-slate-800/50 border border-white/10 hover:border-blue-500/50'
                            : 'bg-white border-2 border-gray-200 hover:border-blue-500 shadow-md hover:shadow-lg'
                        }`}
                      >
                        <div className="text-4xl mb-2">{item.emoji}</div>
                        <div className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {item.name}
                        </div>
                        <div className={`text-xs px-2 py-0.5 rounded-full inline-block font-semibold ${
                          theme === 'dark'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.count}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Festival Sub-Categories */}
                <div className={`mt-8 p-5 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-orange-900/20 to-pink-900/20 border border-orange-500/30'
                    : 'bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-300'
                }`}>
                  <h4 className={`text-lg font-bold text-center mb-4 ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-700'
                  }`}>
                    🎊 {language === 'en' ? 'Festival Categories' : 'त्योहार श्रेणियां'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {[
                      { name: 'Date & Calendar', path: '/festival-dates', emoji: '📅' },
                      { name: 'Shopping', path: '/festival-shopping', emoji: '🛍️' },
                      { name: 'Finance', path: '/festival-finance', emoji: '💰' },
                      { name: 'Religious', path: '/religious-tools', emoji: '🙏' },
                      { name: 'Fun', path: '/fun-engagement', emoji: '🎮' },
                      { name: 'Design', path: '/design-tools', emoji: '🎨' },
                      { name: 'Info', path: '/festival-info', emoji: '📖' },
                      { name: 'Corporate', path: '/festival-corporate-tools', emoji: '💼' },
                      { name: 'Regional', path: '/regional-tools', emoji: '🗺️' },
                      { name: 'SEO', path: '/seo-tools', emoji: '📊' }
                    ].map((cat, idx) => (
                      <Link
                        key={idx}
                        to={cat.path}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95 ${
                          theme === 'dark'
                            ? 'bg-slate-700/50 text-orange-300 hover:bg-slate-600'
                            : 'bg-white text-orange-700 hover:bg-orange-100 border border-orange-200'
                        }`}
                      >
                        <span className="text-lg">{cat.emoji}</span>
                        <span className="truncate">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Section */}
        <section className={`py-16 border-y ${
          theme === 'dark' ? 'border-white/10 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              🏆 {language === 'en' ? 'Why Trust MoneyCal' : 'क्यों भरोसा करें'}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, title: language === 'en' ? 'RBI Compliant' : 'RBI अनुपालन', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, title: language === 'en' ? 'Secure' : 'सुरक्षित', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, title: language === 'en' ? 'Expert Verified' : 'विशेषज्ञ', color: 'from-purple-500 to-pink-500' },
                { icon: Star, title: '4.9/5 Rating', color: 'from-yellow-500 to-orange-500' }
              ].map((trust, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl text-center ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-white/10'
                      : 'bg-white border-2 border-gray-200 shadow-lg'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${trust.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <trust.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {trust.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              {language === 'en' ? '🚀 Ready to Master Finances?' : '🚀 वित्त में महारत?'}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {language === 'en' ? 'Join India\'s #1 Financial Platform' : 'भारत का #1 प्लेटफॉर्म'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools"
                className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/50 active:scale-95 transition-all"
              >
                <Zap className="w-6 h-6 inline mr-2" />
                {language === 'en' ? 'Get Started FREE' : 'मुफ्त शुरू करें'}
              </Link>
              <Link
                to="/learn"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-lg active:scale-95 transition-all"
              >
                <BookOpen className="w-6 h-6 inline mr-2" />
                {language === 'en' ? '40 Free Lessons' : '40 पाठ'}
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-8 border-t ${
          theme === 'dark' ? 'bg-slate-950 border-white/10' : 'bg-gray-100 border-gray-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentDate.year} MoneyCal India. Made with 💙 for India. Last updated: {currentDate.fullDate}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeInvestopedia;
