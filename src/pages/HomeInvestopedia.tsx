import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Calculator, BookOpen, Newspaper, Users, Globe, 
  ArrowRight, Star, Zap, Shield, Award, BarChart3, Target,
  Sparkles, Rocket, Heart, CheckCircle, Play, Search, ChevronRight,
  DollarSign, Building, Briefcase, Umbrella, PartyPopper, GraduationCap,
  HelpCircle, Gift, Sparkle, Layout, FileText, Building2, Clock, Tag,
  Calendar, ShoppingBag, Wallet, Church, Palette, Languages, LineChart,
  Bell, TrendingDown, Menu, X, ChevronDown, Filter, SlidersHorizontal,
  ExternalLink, Share2, Bookmark
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';
import DynamicContentShowcase from '../components/DynamicContentShowcase';

const HomeInvestopedia: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNotification, setShowNotification] = useState(true);

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

  // Auto-hide notification after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      nav: ['Tools', 'Learn', 'Blog', 'News', 'Help'],
      hero: {
        title: 'Master Your Financial Future',
        subtitle: 'India\'s Trusted Source for Financial Education, Tools & Market Insights',
        cta: 'Explore Tools',
        cta2: 'Start Learning'
      },
      search: {
        placeholder: 'Search calculators, guides, tools...',
        trending: ['SIP Calculator', 'GST Calculator', 'Tax Planning', 'EMI Calculator']
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
      ]
    },
    hi: {
      nav: ['टूल्स', 'सीखें', 'ब्लॉग', 'समाचार', 'सहायता'],
      hero: {
        title: 'अपने वित्तीय भविष्य में महारत हासिल करें',
        subtitle: 'वित्तीय शिक्षा, उपकरण और बाजार अंतर्दृष्टि के लिए भारत का विश्वसनीय स्रोत',
        cta: 'टूल्स देखें',
        cta2: 'सीखना शुरू करें'
      },
      search: {
        placeholder: 'कैलकुलेटर, गाइड, टूल्स खोजें...',
        trending: ['SIP कैलकुलेटर', 'GST कैलकुलेटर', 'टैक्स योजना', 'EMI कैलकुलेटर']
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

  // Search suggestions
  const popularSearches = [
    'SIP Calculator', 'GST Calculator', 'Income Tax Calculator', 'EMI Calculator',
    'PPF Calculator', 'Home Loan', 'Credit Score', 'Mutual Funds',
    'Stock Market', 'Gold Rate', 'FD Calculator', 'Retirement Planning'
  ];

  const filteredSearches = searchQuery 
    ? popularSearches.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

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
        {/* Sticky Top Navigation Bar */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MoneyCal
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {[
                  { name: language === 'en' ? 'Tools' : 'टूल्स', url: '/tools', icon: Calculator },
                  { name: language === 'en' ? 'Learn' : 'सीखें', url: '/learn', icon: BookOpen, badge: '40' },
                  { name: language === 'en' ? 'Blog' : 'ब्लॉग', url: '/blog', icon: Newspaper },
                  { name: language === 'en' ? 'Festival' : 'त्योहार', url: '/festival-tools', icon: PartyPopper, badge: 'New' },
                  { name: language === 'en' ? 'Help' : 'सहायता', url: '/help-center', icon: HelpCircle }
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.url}
                    className="relative px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium group flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-gray-200 bg-white"
              >
                <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                  {[
                    { name: language === 'en' ? 'Tools' : 'टूल्स', url: '/tools', icon: Calculator },
                    { name: language === 'en' ? 'Learn' : 'सीखें', url: '/learn', icon: BookOpen },
                    { name: language === 'en' ? 'Blog' : 'ब्लॉग', url: '/blog', icon: Newspaper },
                    { name: language === 'en' ? 'Festival' : 'त्योहार', url: '/festival-tools', icon: PartyPopper },
                    { name: language === 'en' ? 'Help' : 'सहायता', url: '/help-center', icon: HelpCircle }
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.url}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Notification Banner */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 max-w-2xl w-full mx-4"
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-6 h-6 animate-bounce" />
                  <div>
                    <p className="font-bold">{language === 'en' ? '🎉 40 New Lessons Added!' : '🎉 40 नए पाठ जोड़े गए!'}</p>
                    <p className="text-sm text-white/90">
                      {language === 'en' ? 'Gold Loans, Credit Cards & Credit Score' : 'गोल्ड लोन, क्रेडिट कार्ड और क्रेडिट स्कोर'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to="/learn"
                    className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-all"
                  >
                    {language === 'en' ? 'Explore' : 'देखें'}
                  </Link>
                  <button
                    onClick={() => setShowNotification(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Market Ticker */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex items-center space-x-8 whitespace-nowrap"
          >
            {[
              { name: 'NIFTY 50', value: '22,456', change: '+1.2%', positive: true },
              { name: 'SENSEX', value: '74,123', change: '+0.8%', positive: true },
              { name: 'BANK NIFTY', value: '48,321', change: '-0.3%', positive: false },
              { name: 'GOLD', value: '₹62,450', change: '+0.5%', positive: true },
              { name: 'USD/INR', value: '83.25', change: '+0.1%', positive: true }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <span className="font-semibold">{item.name}:</span>
                <span className="font-bold">{item.value}</span>
                <span className={`flex items-center ${item.positive ? 'text-green-300' : 'text-red-300'}`}>
                  {item.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {item.change}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Hero Section with Search */}
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
              {/* Hero Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {t.hero.title}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* Advanced Search Bar */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="relative">
                  <div className={`relative bg-white rounded-2xl shadow-2xl transition-all duration-300 ${searchFocused ? 'ring-4 ring-blue-500/20' : ''}`}>
                    <div className="flex items-center px-6 py-4">
                      <Search className="w-6 h-6 text-gray-400 mr-3" />
                      <input
                        type="text"
                        placeholder={t.search.placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                        className="flex-1 outline-none text-lg text-gray-900 placeholder-gray-400"
                      />
                      <button className="ml-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Search Suggestions Dropdown */}
                    <AnimatePresence>
                      {searchFocused && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
                        >
                          {searchQuery ? (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 mb-3 font-semibold">
                                {language === 'en' ? 'Search Results' : 'खोज परिणाम'}
                              </p>
                              {filteredSearches.length > 0 ? (
                                <div className="space-y-2">
                                  {filteredSearches.slice(0, 5).map((item, idx) => (
                                    <Link
                                      key={idx}
                                      to="/tools"
                                      className="block px-4 py-3 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-between group"
                                    >
                                      <div className="flex items-center gap-3">
                                        <Calculator className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-900">{item}</span>
                                      </div>
                                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 text-center py-4">
                                  {language === 'en' ? 'No results found' : 'कोई परिणाम नहीं मिला'}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="p-4">
                              <p className="text-sm text-gray-600 mb-3 font-semibold flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                {language === 'en' ? 'Trending Searches' : 'ट्रेंडिंग खोज'}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {t.search.trending.map((item, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setSearchQuery(item)}
                                    className="px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg text-sm font-medium text-gray-700 transition-all"
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* MoneyCal Learn Academy Card */}
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
                            <div className="text-white text-2xl font-bold">40</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <div className="text-white/70 text-xs mb-1">{language === 'en' ? 'Categories' : 'श्रेणियाँ'}</div>
                            <div className="text-white text-xl font-bold">3</div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                            <div className="text-white/70 text-xs mb-1">{language === 'en' ? 'Tools' : 'टूल्स'}</div>
                            <div className="text-white text-xl font-bold">100+</div>
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

                        <div className="flex items-center justify-between">
                          <div className="text-white">
                            <p className="text-lg font-semibold mb-1">
                              🎓 {language === 'en' ? '40 Comprehensive Lessons Live!' : '40 व्यापक पाठ लाइव!'}
                            </p>
                            <p className="text-sm text-white/80">
                              {language === 'en' ? 'Gold Loans • Credit Cards • Credit Score' : 'गोल्ड लोन • क्रेडिट कार्ड • क्रेडिट स्कोर'}
                            </p>
                          </div>
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-full font-bold group-hover:scale-110 transition-transform flex items-center gap-2">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span className="hidden sm:inline">{language === 'en' ? 'Start Free' : 'मुफ्त शुरू करें'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/tools"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/learn"
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center border-2 border-gray-200"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  {t.hero.cta2}
                  <Play className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust Indicators - Moved Up */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Users, number: '1M+', text: language === 'en' ? 'Happy Users' : 'खुश उपयोगकर्ता', color: 'from-blue-500 to-cyan-500' },
                { icon: Calculator, number: '100+', text: language === 'en' ? 'Free Tools' : 'मुफ्त टूल्स', color: 'from-green-500 to-emerald-500' },
                { icon: BookOpen, number: '40+', text: language === 'en' ? 'Learn Lessons' : 'सीखने के पाठ', color: 'from-purple-500 to-pink-500' },
                { icon: Star, number: '4.8/5', text: language === 'en' ? 'User Rating' : 'उपयोगकर्ता रेटिंग', color: 'from-yellow-500 to-orange-500' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{item.number}</div>
                  <div className="text-sm text-gray-600">{item.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Content Showcase */}
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
                { name: language === 'en' ? 'Festival' : 'त्योहार', icon: PartyPopper, url: '/festival-tools', color: 'from-pink-500 to-rose-600', badge: 'Hot' },
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
                  className="group relative"
                >
                  <Link to={section.url} className="block text-center">
                    <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${section.color} rounded-3xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-2xl transition-all duration-300`}>
                      <section.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>
                    <p className="text-sm md:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {section.name}
                    </p>
                    {section.badge && (
                      <span className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {section.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Categories */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'en' ? 'Popular Tool Categories' : 'लोकप्रिय टूल श्रेणियां'}
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
                    <p className="text-gray-600 mb-4">{category.count}+ {language === 'en' ? 'Tools Available' : 'टूल्स उपलब्ध'}</p>
                    <Link
                      to={category.url}
                      className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform"
                    >
                      {language === 'en' ? 'Explore Now' : 'अभी देखें'}
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tools Carousel */}
        <section className="py-20 bg-white">
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
              <p className="text-gray-600">{language === 'en' ? 'Join millions of users making smart financial decisions' : 'स्मार्ट वित्तीय निर्णय लेने वाले लाखों उपयोगकर्ताओं से जुड़ें'}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'SIP Calculator', icon: TrendingUp, users: '50K+', url: '/tools/sip-calculator', color: 'from-blue-500 to-cyan-500' },
                { name: 'GST Calculator', icon: Calculator, users: '40K+', url: '/tools/gst-amount-calculator', color: 'from-green-500 to-emerald-500' },
                { name: 'Income Tax', icon: BarChart3, users: '35K+', url: '/tools/income-tax-calculator', color: 'from-purple-500 to-pink-500' },
                { name: 'EMI Calculator', icon: DollarSign, users: '30K+', url: '/tools/loan-emi-calculator', color: 'from-orange-500 to-red-500' },
                { name: 'PPF Calculator', icon: Target, users: '25K+', url: '/calculators/ppf-calculator', color: 'from-indigo-500 to-purple-500' },
                { name: 'FD Calculator', icon: Sparkles, users: '20K+', url: '/calculators/compound-interest-calculator', color: 'from-teal-500 to-cyan-500' },
                { name: 'HSN/SAC Finder', icon: Search, users: '15K+', url: '/tools/gst-hsn-sac-finder', color: 'from-pink-500 to-rose-500' },
                { name: 'CAGR Calculator', icon: TrendingUp, users: '10K+', url: '/calculators/cagr-calculator', color: 'from-yellow-500 to-orange-500' }
              ].map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                >
                  <Link to={tool.url} className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                        {tool.users}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{tool.name}</h3>
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
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {language === 'en' 
                  ? 'Celebrate every occasion with our comprehensive festival planning tools. Budget, plan, and enjoy worry-free celebrations!'
                  : 'हमारे व्यापक त्योहार योजना उपकरणों के साथ हर अवसर मनाएं। बजट बनाएं, योजना बनाएं और चिंता मुक्त उत्सव का आनंद लें!'}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { name: language === 'en' ? 'Festival Dates' : 'त्योहार तिथि', icon: Calendar, url: '/festival-dates', color: 'from-blue-500 to-indigo-600' },
                { name: language === 'en' ? 'Shopping' : 'खरीदारी', icon: ShoppingBag, url: '/festival-shopping', color: 'from-pink-500 to-rose-600' },
                { name: language === 'en' ? 'Finance' : 'वित्त', icon: Wallet, url: '/festival-finance', color: 'from-green-500 to-emerald-600' },
                { name: language === 'en' ? 'Religious' : 'धार्मिक', icon: Church, url: '/religious-tools', color: 'from-purple-500 to-violet-600' },
                { name: language === 'en' ? 'Fun' : 'मनोरंजन', icon: PartyPopper, url: '/fun-engagement', color: 'from-yellow-500 to-orange-600' },
                { name: language === 'en' ? 'Design' : 'डिज़ाइन', icon: Palette, url: '/design-tools', color: 'from-cyan-500 to-blue-600' },
                { name: language === 'en' ? 'Information' : 'जानकारी', icon: BookOpen, url: '/festival-info', color: 'from-amber-500 to-orange-600' },
                { name: language === 'en' ? 'Corporate' : 'कॉर्पोरेट', icon: Briefcase, url: '/festival-corporate-tools', color: 'from-slate-500 to-gray-700' },
                { name: language === 'en' ? 'Regional' : 'क्षेत्रीय', icon: Languages, url: '/regional-tools', color: 'from-teal-500 to-cyan-600' },
                { name: language === 'en' ? 'SEO' : 'SEO', icon: LineChart, url: '/seo-tools', color: 'from-red-500 to-pink-600' }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Link to={category.url} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all h-full block">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                      <div className="mt-auto flex items-center text-white text-sm font-semibold">
                        {language === 'en' ? 'Explore' : 'देखें'}
                        <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/festival-tools" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
              >
                {language === 'en' ? 'Explore All Festival Tools' : 'सभी त्योहार टूल्स देखें'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
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
              <p className="text-xl text-gray-600">{language === 'en' ? 'Trusted by millions for accurate, fast, and free financial tools' : 'सटीक, तेज़ और मुफ्त वित्तीय उपकरणों के लिए लाखों लोगों द्वारा विश्वसनीय'}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: language === 'en' ? 'Lightning Fast' : 'बिजली की तेजी से', description: language === 'en' ? 'Instant calculations with real-time results' : 'वास्तविक समय परिणामों के साथ त्वरित गणना', color: 'from-yellow-400 to-orange-500' },
                { icon: Shield, title: language === 'en' ? '100% Free' : '100% मुफ्त', description: language === 'en' ? 'No registration, no hidden costs, forever free' : 'कोई पंजीकरण नहीं, कोई छिपी लागत नहीं, हमेशा के लिए मुफ्त', color: 'from-green-400 to-emerald-500' },
                { icon: Award, title: language === 'en' ? 'Most Comprehensive' : 'सबसे व्यापक', description: language === 'en' ? '100+ tools - more than any other platform' : '100+ टूल्स - किसी अन्य प्लेटफ़ॉर्म से अधिक', color: 'from-blue-400 to-indigo-500' },
                { icon: Globe, title: language === 'en' ? 'Bilingual Support' : 'द्विभाषी समर्थन', description: language === 'en' ? 'Available in Hindi & English' : 'हिंदी और अंग्रेजी में उपलब्ध', color: 'from-purple-400 to-pink-500' },
                { icon: Users, title: language === 'en' ? 'Trusted by Millions' : 'लाखों द्वारा भरोसा', description: language === 'en' ? 'Join 1M+ users making smarter financial decisions' : '1M+ उपयोगकर्ताओं के साथ जुड़ें', color: 'from-teal-400 to-cyan-500' },
                { icon: Rocket, title: language === 'en' ? 'Always Updated' : 'हमेशा अपडेट', description: language === 'en' ? 'Latest tax rates, GST slabs, and regulations' : 'नवीनतम टैक्स दरें, GST स्लैब और नियम', color: 'from-red-400 to-rose-500' }
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
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all group"
                >
                  <div className="text-xs text-blue-300 mb-2">2 hours ago</div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">Market hits new high as tech stocks rally</h3>
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
                  to="/learn"
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
                  { title: language === 'en' ? 'Gold Loans' : 'गोल्ड लोन', lessons: 10, icon: '🏆' },
                  { title: language === 'en' ? 'Credit Cards' : 'क्रेडिट कार्ड', lessons: 20, icon: '💳' },
                  { title: language === 'en' ? 'Credit Score' : 'क्रेडिट स्कोर', lessons: 10, icon: '📊' },
                  { title: language === 'en' ? 'More Coming' : 'और आ रहा है', lessons: '∞', icon: '🚀' }
                ].map((course, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="text-4xl mb-3">{course.icon}</div>
                    <h4 className="font-bold mb-2 text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.lessons} {language === 'en' ? 'lessons' : 'पाठ'}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Latest Blog Posts */}
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
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
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
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.date}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all mt-auto">
                          {language === 'en' ? 'Read More' : 'और पढ़ें'}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
              >
                <Newspaper className="w-5 h-5 mr-2" />
                {language === 'en' ? 'View All Articles' : 'सभी लेख देखें'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
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
              <Heart className="w-16 h-16 mx-auto mb-6 text-pink-300 animate-pulse" />
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
                  to="/learn"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                >
                  {language === 'en' ? 'Start Learning Free' : 'मुफ्त सीखना शुरू करें'}
                  <BookOpen className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* E-E-A-T Trust Section */}
        <section className="py-12 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, text: language === 'en' ? 'RBI Guidelines Compliant' : 'RBI दिशानिर्देश अनुपालन', color: 'text-green-600' },
                { icon: Shield, text: language === 'en' ? 'Secure & Private' : 'सुरक्षित और निजी', color: 'text-blue-600' },
                { icon: Star, text: language === 'en' ? '4.8/5 User Rating' : '4.8/5 उपयोगकर्ता रेटिंग', color: 'text-yellow-600' },
                { icon: Award, text: language === 'en' ? 'Expert Verified' : 'विशेषज्ञ सत्यापित', color: 'text-purple-600' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <item.icon className={`w-8 h-8 ${item.color} mb-2`} />
                  <span className="font-semibold text-gray-900 text-sm">{item.text}</span>
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
