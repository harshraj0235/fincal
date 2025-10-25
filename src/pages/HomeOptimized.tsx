import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, Search, TrendingUp, BookOpen, Shield, Award, Users, CheckCircle2,
  Clock, ArrowRight, Star, Target, PiggyBank, FileText, BarChart3, Zap, Heart,
  Home as HomeIcon, Newspaper, Globe, Sun, Moon, X, Menu, ChevronRight, Flame,
  Sparkles, PartyPopper, DollarSign, Umbrella, Gift, Building, Rocket, Bell,
  Calendar, Tag, Lock, BadgeCheck
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LightweightTrustBadges from '../components/LightweightTrustBadges';
import { loadBlogData } from '../data/lazyBlogData';

const getCurrentDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    fullDate: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  };
};

const buildSearchDatabase = (blogPosts: any[] = []) => {
  const calculators = [
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', category: 'Investment', emoji: '📈', keywords: 'sip mutual fund' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', emoji: '🏦', keywords: 'ppf' },
    { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', emoji: '💰', keywords: 'fd' },
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', category: 'Loan', emoji: '🧮', keywords: 'emi loan' },
    { name: 'Home Loan', path: '/calculators/home-loan-calculator', category: 'Loan', emoji: '🏠', keywords: 'home loan' },
    { name: 'Income Tax', path: '/tools/income-tax-calculator', category: 'Tax', emoji: '📄', keywords: 'income tax' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', emoji: '💰', keywords: 'gst' },
    { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', emoji: '🏠', keywords: 'hra' },
    { name: 'Lunar Eclipse', path: '/festival-tools/lunar-eclipse-predictor', category: 'Festival', emoji: '🌑', keywords: 'eclipse' },
    { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', category: 'Festival', emoji: '💍', keywords: 'marriage' },
    ...blogPosts.slice(0, 20).map((post: any) => ({ 
      name: post?.title || '', 
      path: `/blog/${post?.slug || ''}`, 
      category: 'Blog', 
      emoji: '📰',
      keywords: post?.categories?.join(' ') || ''
    }))
  ];
  return calculators;
};

const HomeOptimized: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotationKey, setRotationKey] = useState(0);
  const [blogPostsData, setBlogPostsData] = useState<any[]>([]);
  const navigate = useNavigate();
  const currentDate = getCurrentDate();

  useEffect(() => {
    loadBlogData().then(data => {
      const allPosts = [...(data.blogPosts0 || []), ...(data.blogPosts1 || [])];
      setBlogPostsData(allPosts);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationKey(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const searchDatabase = useMemo(() => buildSearchDatabase(blogPostsData), [blogPostsData]);

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      return searchDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.keywords?.toLowerCase().includes(query)
      ).slice(0, 12);
    }
    return [];
  }, [searchQuery, searchDatabase]);

  useEffect(() => {
    setShowSearchResults(searchResults.length > 0 && searchQuery.length > 1);
  }, [searchResults, searchQuery]);

  const getRandomItems = (pool: any[], count: number) => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const categoryPools = useMemo(() => ({
    calculators: [
      { name: 'SIP Calculator', path: '/calculators/sip-calculator', emoji: '📈', desc: 'Calculate SIP returns & wealth', users: '50K+' },
      { name: 'Home Loan EMI', path: '/calculators/home-loan-emi-calculator', emoji: '🏠', desc: 'Housing loan calculator', users: '45K+' },
      { name: 'Personal Loan EMI', path: '/calculators/personal-loan-emi-calculator', emoji: '💵', desc: 'Instant personal loan EMI', users: '42K+' },
      { name: 'Car Loan EMI', path: '/calculators/car-loan-emi-calculator', emoji: '🚗', desc: 'Auto loan calculator', users: '38K+' },
      { name: 'GST Calculator', path: '/tools/gst-amount-calculator', emoji: '💰', desc: 'GST amount calculator', users: '40K+' },
      { name: 'PPF Calculator', path: '/calculators/ppf-calculator', emoji: '🏦', desc: 'Public Provident Fund', users: '35K+' },
      { name: 'Income Tax', path: '/tools/income-tax-calculator', emoji: '📄', desc: 'Tax calculator 2025', users: '38K+' },
      { name: 'EMI Calculator', path: '/calculators/emi-calculator', emoji: '🧮', desc: 'General EMI calculator', users: '42K+' },
      { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', emoji: '💰', desc: 'Fixed deposit calculator', users: '30K+' },
      { name: 'Retirement Planner', path: '/calculators/retirement-calculator', emoji: '👴', desc: 'Retirement corpus planner', users: '25K+' },
    ],
    learning: [
      { name: 'Gold Loans Mastery', path: '/learn/gold-loans', emoji: '🏆', desc: '10 comprehensive lessons', lessons: '10' },
      { name: 'Credit Card Secrets', path: '/learn/credit-cards', emoji: '💳', desc: '20 detailed lessons', lessons: '20' },
      { name: 'Credit Score Guide', path: '/learn/credit-score', emoji: '📊', desc: '10 expert lessons', lessons: '10' },
      { name: 'What is Gold Loan', path: '/learn/gold-loans/what-is-gold-loan', emoji: '🏆', desc: 'Gold loan basics', lessons: '1' },
      { name: 'Interest Rates Guide', path: '/learn/gold-loans/interest-rates', emoji: '💰', desc: 'Understand interest rates', lessons: '1' },
      { name: 'Balance Transfer Tips', path: '/learn/credit-cards/balance-transfer', emoji: '🔄', desc: 'Save on interest', lessons: '1' },
      { name: 'Improve Credit Score', path: '/learn/credit-score/improve-score', emoji: '📈', desc: 'Boost CIBIL score', lessons: '1' },
    ],
    festivals: [
      { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', emoji: '🌑', desc: '11 eclipses with sutak', events: '11' },
      { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', emoji: '💍', desc: '40+ wedding dates', events: '40+' },
      { name: 'Daily Panchang', path: '/festival-tools/panchang-today', emoji: '📅', desc: 'Tithi & nakshatra', events: '365' },
      { name: 'Weekly Tithi Finder', path: '/festival-tools/weekly-tithi-finder', emoji: '📆', desc: '7-day lunar calendar', events: '52' },
      { name: 'Purnima & Amavasya', path: '/festival-tools/purnima-amavasya-dates', emoji: '🌕', desc: 'Full & new moon dates', events: '24' },
      { name: 'Vrat Calendar', path: '/festival-tools/vrat-upavas-calendar', emoji: '🙏', desc: '50+ fasting dates', events: '50+' },
      { name: 'Shubh Muhurat', path: '/festival-tools/shubh-muhurat-reminder', emoji: '🔔', desc: 'Auspicious timings', events: '100+' },
    ],
    blogs: blogPostsData.slice(0, 10).map((post: any) => ({ 
      name: post?.title || '', 
      path: `/blog/${post?.slug || ''}`, 
      emoji: '📰', 
      desc: (post?.excerpt || '').slice(0, 55) + '...',
      category: post?.categories?.[0] || 'Finance'
    }))
  }), [blogPostsData]);

  const allPlatformCategories = useMemo(() => [
    { name: 'Calculators', path: '/calculators', emoji: '🧮', count: '107' },
    { name: 'Learn', path: '/learn', emoji: '📚', count: '40' },
    { name: 'Festival', path: '/festival-tools', emoji: '🎉', count: '11' },
    { name: 'GST', path: '/gst-tools', emoji: '💰', count: '20+' },
    { name: 'Tax', path: '/tax-tools', emoji: '📄', count: '15+' },
    { name: 'Loans', path: '/loan-tools', emoji: '🏠', count: '12+' },
    { name: 'Insurance', path: '/insurance-tools', emoji: '🛡️', count: '8+' },
    { name: 'Corporate', path: '/corporate-finance', emoji: '💼', count: '25+' },
    { name: 'Gold', path: '/gold-tools', emoji: '🏆', count: '10+' },
    { name: 'Finance', path: '/finance-tools', emoji: '💵', count: '30+' },
    { name: 'Personal', path: '/tools', emoji: '👤', count: '15+' },
    { name: 'Religious', path: '/religious-tools', emoji: '🙏', count: '10+' },
    { name: 'Blog', path: '/blog', emoji: '📰', count: '150+' },
    { name: 'Crypto', path: '/crypto', emoji: '₿', count: '50+' },
    { name: 'Excel Tools', path: '/excel-tools', emoji: '📊', count: '100+' },
    { name: 'Banking', path: '/banking', emoji: '🏦', count: '15+' },
    { name: 'Market', path: '/stock-market', emoji: '📈', count: '20+' },
    { name: 'Schemes', path: '/government-schemes', emoji: '🎁', count: '50+' },
    { name: 'Investment', path: '/finance-tools', emoji: '💹', count: '20+' },
    { name: 'Property', path: '/calculators/property-calculator', emoji: '🏘️', count: '8+' },
    { name: 'Business', path: '/calculators/business-loan-calculator', emoji: '💼', count: '15+' },
    { name: 'Retirement', path: '/calculators/retirement-calculator', emoji: '👴', count: '5+' },
    { name: 'Astro', path: '/astro-finance', emoji: '⭐', count: '12+' },
  ], []);

  const allPopularTags = useMemo(() => [
    { emoji: '🌑', label: 'Eclipse', searchTerm: 'Eclipse' },
    { emoji: '💍', label: 'Marriage', searchTerm: 'Marriage' },
    { emoji: '📄', label: 'Income Tax', searchTerm: 'Income Tax' },
    { emoji: '👴', label: 'Retirement', searchTerm: 'Retirement' },
    { emoji: '₿', label: 'Crypto', searchTerm: 'Crypto' },
    { emoji: '🏆', label: 'Gold', searchTerm: 'Gold' },
    { emoji: '🏆', label: 'Learn', searchTerm: 'Learn' },
  ], []);

  const allFestivalCategories = [
    { name: 'Date & Calendar', emoji: '📅' },
    { name: 'Planning & Shopping', emoji: '🛍️' },
    { name: 'Finance & Money', emoji: '💰' },
    { name: 'Religious', emoji: '🙏' },
    { name: 'Fun & Games', emoji: '🎮' },
    { name: 'Design', emoji: '🎨' },
    { name: 'Information', emoji: '📖' },
    { name: 'Corporate', emoji: '💼' },
    { name: 'Regional', emoji: '🗺️' },
    { name: 'SEO', emoji: '📊' }
  ];

  const allFestivalTools = [
    { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', emoji: '🌑', tag: 'New' },
    { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', emoji: '💍', tag: 'Hot' },
    { name: 'Panchang Today', path: '/festival-tools/panchang-today', emoji: '📅', tag: 'Popular' },
    { name: 'Weekly Tithi Finder', path: '/festival-tools/weekly-tithi-finder', emoji: '📆', tag: '' },
    { name: 'Purnima Amavasya', path: '/festival-tools/purnima-amavasya-dates', emoji: '🌕', tag: 'Trending' },
    { name: 'Vrat Calendar', path: '/festival-tools/vrat-upavas-calendar', emoji: '🙏', tag: 'Popular' },
    { name: 'Nakshatra Festival', path: '/festival-tools/nakshatra-festival', emoji: '⭐', tag: '' },
    { name: 'Shubh Muhurat', path: '/festival-tools/shubh-muhurat-reminder', emoji: '🔔', tag: 'Hot' },
    { name: 'Diwali Date', path: '/festival-tools/diwali-date-finder', emoji: '🪔', tag: '' },
    { name: 'Holi Date', path: '/festival-tools/holi-date-calculator', emoji: '🎨', tag: '' },
    { name: 'Raksha Bandhan', path: '/festival-tools/raksha-bandhan-muhurat', emoji: '🎀', tag: '' },
    { name: 'Ganesh Chaturthi', path: '/festival-tools/ganesh-chaturthi-countdown', emoji: '🐘', tag: '' },
    { name: 'Navratri Dates', path: '/festival-tools/navratri-dates-finder', emoji: '🪔', tag: '' },
    { name: 'Chhath Puja', path: '/festival-tools/chhat-puja-arghya', emoji: '☀️', tag: '' },
    { name: 'Maha Shivratri', path: '/festival-tools/maha-shivratri-duration', emoji: '🔱', tag: '' },
    { name: 'Guru Purnima', path: '/festival-tools/guru-purnima-calendar', emoji: '🙏', tag: '' },
    { name: 'Buddha Purnima', path: '/festival-tools/buddha-purnima-converter', emoji: '☸️', tag: '' },
    { name: 'Eid Date', path: '/festival-tools/eid-date-converter', emoji: '🌙', tag: '' },
    { name: 'Pongal Calendar', path: '/festival-tools/pongal-calendar', emoji: '🌾', tag: '' },
  ];

  const allTrendingItems = [
    { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', emoji: '🌑', tag: 'NEW', desc: '11 eclipse dates with Sutak' },
    { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', emoji: '💍', tag: 'HOT', desc: '40+ auspicious wedding dates' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', emoji: '💰', tag: 'HOT', desc: 'Calculate GST inclusive/exclusive' },
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', emoji: '📈', tag: 'POPULAR', desc: 'Mutual fund SIP returns' },
    { name: 'Income Tax 2025', path: '/tools/income-tax-calculator', emoji: '📄', tag: 'POPULAR', desc: 'Old vs New regime' },
    { name: 'Car Loan EMI', path: '/calculators/car-loan-emi-calculator', emoji: '🚗', tag: 'NEW', desc: 'Auto loan calculator' },
    { name: 'Gold Loans', path: '/learn/gold-loans', emoji: '🏆', tag: 'TRENDING', desc: '10 comprehensive lessons' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', emoji: '🏦', tag: 'POPULAR', desc: 'Retirement planning tool' },
    { name: 'Prepayment Calculator', path: '/calculators/prepayment-calculator', emoji: '💰', tag: 'TRENDING', desc: 'Calculate prepayment savings' },
  ];

  const dynamicPlatformCategories = useMemo(() => 
    getRandomItems(allPlatformCategories, 20), [allPlatformCategories, rotationKey]
  );

  const dynamicFestivalTools = useMemo(() => 
    getRandomItems(allFestivalTools, 12), [rotationKey]
  );

  const dynamicContent = useMemo(() => ({
    calculators: getRandomItems(categoryPools.calculators, 7),
    learning: getRandomItems(categoryPools.learning, 7),
    festivals: getRandomItems(categoryPools.festivals, 7),
    blogs: getRandomItems(categoryPools.blogs, 7)
  }), [categoryPools, rotationKey]);

  const trendingItems = useMemo(() => 
    getRandomItems(allTrendingItems, 6), [rotationKey]
  );

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
        title="MoneyCal India - 100+ Free Financial Calculators & Tools | #1 Platform"
        description="India's most comprehensive financial platform. 100+ free calculators, 40 lessons, 11 festival tools. GST, Tax, SIP, EMI, Eclipse dates."
        keywords="financial calculators India, GST calculator, SIP calculator, EMI calculator, eclipse 2025, marriage muhurat, income tax"
        canonicalUrl="https://moneycal.in"
      />

      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
        
        {/* Navigation */}
        <nav className={`relative z-40 ${theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-lg sticky top-0 shadow-lg border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`} style={{ minHeight: '64px', contain: 'layout style paint' }}>
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-black text-2xl">💰</span>
                </div>
                <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MoneyCal.in
                </span>
              </Link>

              <div className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl px-2 py-2 rounded-2xl border border-white/10 shadow-2xl">
                {mainSections.slice(0, 7).map((item, idx) => (
                  <Link key={idx} to={item.path} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition-colors ${theme === 'dark' ? 'text-gray-300 hover:bg-slate-700/70' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <span className="text-lg">{item.emoji}</span>
                    <span className="hidden xl:inline">{item.name}</span>
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl" aria-label="Toggle menu">
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-3 rounded-xl shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' : 'bg-gradient-to-br from-slate-700 to-blue-900 text-white'}`} aria-label="Toggle theme">
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} className="px-4 py-3 rounded-xl text-sm font-bold shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <Globe className="w-4 h-4 inline mr-1" />
                  {language === 'en' ? 'हिंदी' : 'EN'}
                </button>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className={`lg:hidden border-t ${theme === 'dark' ? 'border-white/10 bg-slate-800/95' : 'border-gray-200 bg-white/95'}`}>
              <div className="px-4 py-4 grid grid-cols-2 gap-2.5">
                {mainSections.map((item, idx) => (
                  <Link key={idx} to={item.path} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm ${theme === 'dark' ? 'bg-slate-700/60 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <span className="text-2xl">{item.emoji}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero */}
        <section className="relative py-20 md:py-24" style={{ minHeight: '600px', contain: 'layout style' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                {language === 'en' ? 'Know Your Money 💰' : 'पैसा आसान 💰'}
              </h1>
              <p className={`text-2xl md:text-3xl mb-12 font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'en' ? '🚀 100+ Tools • 40 Lessons • 11 Festival Tools' : '🚀 100+ टूल्स • 40 पाठ'}
              </p>

              {/* Search */}
              <div className="max-w-4xl mx-auto mb-12 relative">
                <div className="relative">
                  <Search className={`absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={language === 'en' ? '🔍 Search... GST, SIP, EMI, Eclipse, Marriage' : '🔍 खोजें...'} className={`w-full pl-16 pr-16 py-6 text-xl rounded-3xl border-2 focus:ring-4 outline-none font-semibold shadow-2xl ${theme === 'dark' ? 'bg-slate-800/90 border-white/20 focus:ring-blue-500/50 text-white placeholder-gray-400' : 'bg-white border-gray-300 focus:ring-blue-300 text-gray-900 placeholder-gray-500'}`} />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200/30">
                      <X className="w-6 h-6" />
                    </button>
                  )}
                </div>

                {!searchQuery && (
                  <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                    <span className={`text-sm font-bold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Flame className="w-5 h-5 inline mr-1 text-orange-500" /> Popular:
                    </span>
                    {allPopularTags.map((tag, i) => (
                      <button key={i} onClick={() => setSearchQuery(tag.searchTerm)} className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-2xl transition-shadow flex items-center gap-1.5">
                        <span className="text-lg">{tag.emoji}</span>
                        <span>{tag.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {showSearchResults && (
                  <div className={`absolute top-full left-0 right-0 mt-4 rounded-3xl shadow-2xl border-2 max-h-[70vh] overflow-y-auto z-50 ${theme === 'dark' ? 'bg-slate-900/98 border-white/20' : 'bg-white/98 border-gray-300'}`}>
                    <div className="p-5">
                      {searchResults.map((result, idx) => (
                        <button key={idx} onClick={() => navigate(result.path)} className={`w-full flex items-center gap-4 px-5 py-5 text-left rounded-2xl border-2 mb-2 ${theme === 'dark' ? 'bg-slate-800/80 border-white/10 hover:border-blue-500/70' : 'bg-white border-gray-200 hover:border-blue-500'}`}>
                          <div className="text-4xl">{result.emoji}</div>
                          <div className="flex-1">
                            <div className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result.name}</div>
                            <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold">{result.category}</span>
                          </div>
                          <ChevronRight className="w-7 h-7" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link to="/tools" className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-shadow">
                  <Calculator className="w-6 h-6 inline mr-2" />
                  {language === 'en' ? 'Explore Tools' : 'टूल्स देखें'}
                </Link>
                <Link to="/learn" className={`px-10 py-5 border-2 rounded-2xl font-bold text-lg shadow-2xl ${theme === 'dark' ? 'bg-slate-800/70 border-white/30 text-white' : 'bg-white border-gray-400 text-gray-900'}`}>
                  <Rocket className="w-6 h-6 inline mr-2" />
                  {language === 'en' ? 'Start Learning' : 'सीखें'}
                </Link>
              </div>

              {/* Platform Stats */}
              <div className={`max-w-6xl mx-auto p-8 rounded-3xl border-2 ${theme === 'dark' ? 'bg-slate-800/40 border-white/10' : 'bg-white/90 border-gray-200 shadow-2xl'}`}>
                <h3 className={`text-3xl font-black mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  📁 {language === 'en' ? 'Complete Platform' : 'संपूर्ण मंच'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {dynamicPlatformCategories.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60 border border-white/10' : 'bg-white border-2 border-gray-200 shadow-lg'}`}>
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <div className={`text-xs font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</div>
                      <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-semibold ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>{item.count}</div>
                    </Link>
                  ))}
                </div>

                <div className={`mt-8 p-6 rounded-2xl ${theme === 'dark' ? 'bg-orange-900/20 border-2 border-orange-500/30' : 'bg-orange-50 border-2 border-orange-300'}`}>
                  <h4 className={`text-2xl font-black text-center mb-6 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
                    🎊 {language === 'en' ? 'Festival Tool Categories' : 'त्योहार श्रेणियां'}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {allFestivalCategories.map((cat, i) => (
                      <div key={i} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold ${theme === 'dark' ? 'bg-slate-700/50 text-orange-300' : 'bg-white text-orange-700 border-2 border-orange-200 shadow-md'}`}>
                        <span className="text-2xl">{cat.emoji}</span>
                        <span>{cat.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Festival Tools */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-gradient-to-br from-orange-950/30 to-red-950/30' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className={`text-4xl font-black mb-3 text-center ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>
              🎊 {language === 'en' ? 'Festival Tools' : 'त्योहार के औजार'}
            </h2>
            <p className={`text-lg text-center mb-8 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-600'}`}>
              {language === 'en' ? 'Complete festival planning and cultural tools' : 'संपूर्ण त्योहार योजना'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dynamicFestivalTools.map((tool, idx) => (
                <Link key={idx} to={tool.path} className={`p-5 rounded-xl transition-all hover:scale-105 relative ${theme === 'dark' ? 'bg-slate-800/70 border border-orange-500/30' : 'bg-white border-2 border-orange-200 shadow-lg'}`}>
                  {tool.tag && (
                    <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black ${tool.tag === 'New' ? 'bg-green-500 text-white' : tool.tag === 'Hot' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>{tool.tag}</span>
                  )}
                  <div className="text-5xl mb-3">{tool.emoji}</div>
                  <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{tool.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className={`text-4xl font-black text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              🔥 {language === 'en' ? 'Trending & New' : 'ट्रेंडिंग और नया'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingItems.map((item, idx) => (
                <Link key={idx} to={item.path} className={`relative p-6 rounded-2xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/70 border-2 border-white/10' : 'bg-white border-2 border-gray-200 shadow-lg'}`}>
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black ${item.tag === 'NEW' ? 'bg-green-500 text-white' : item.tag === 'HOT' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>{item.tag}</span>
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Content */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className={`text-4xl font-black mb-3 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              ✨ {language === 'en' ? 'Discover More' : 'और खोजें'}
            </h2>
            <p className={`text-lg text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'Content refreshes every 10 seconds' : 'हर 10 सेकंड में नया कंटेंट'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Calculators */}
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/30' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-300'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    🧮 {language === 'en' ? 'Top Calculators' : 'टॉप कैलकुलेटर'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.calculators.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`block p-4 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-white shadow-lg'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                          <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>👥 {item.users} users</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Learning */}
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/30' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                    📚 {language === 'en' ? 'Learn Finance' : 'वित्त सीखें'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.learning.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`block p-4 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-white shadow-lg'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                          <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>📖 {item.lessons} lessons</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Festival */}
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/30' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <PartyPopper className={`w-8 h-8 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>
                    🎉 {language === 'en' ? 'Festival Tools' : 'त्योहार टूल्स'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.festivals.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`block p-4 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-white shadow-lg'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                          <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>🎊 {item.events} events</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Blogs */}
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Newspaper className={`w-8 h-8 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                    📰 {language === 'en' ? 'Latest Articles' : 'नवीनतम लेख'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.blogs.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`block p-4 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-white shadow-lg'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                          <h4 className={`font-bold text-sm mb-1 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                          <p className={`text-xs line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                          <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>📂 {item.category}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-slate-800/60 text-gray-400' : 'bg-white text-gray-600 shadow-md'}`}>
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold">{language === 'en' ? 'Content refreshes every 10 seconds' : 'हर 10 सेकंड में नया'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-slate-900/30' : 'bg-gray-50/50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className={`text-4xl font-black text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              🏆 {language === 'en' ? 'Why Trust MoneyCal' : 'क्यों भरोसा करें'}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle2, title: 'RBI Compliant', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, title: 'Secure', color: 'from-blue-500 to-cyan-500' },
                { icon: Award, title: 'Expert Verified', color: 'from-purple-500 to-pink-500' },
                { icon: Star, title: '4.9/5 Rating', color: 'from-yellow-500 to-orange-500' }
              ].map((t, i) => (
                <div key={i} className={`p-6 rounded-2xl text-center ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white shadow-lg'}`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${t.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <t.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <LightweightTrustBadges />

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" style={{ minHeight: '400px', contain: 'layout style' }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              🚀 {language === 'en' ? 'Ready?' : 'तैयार हैं?'}
            </h2>
            <p className="text-2xl text-white/90 mb-8">
              {language === 'en' ? 'Join India\'s #1 Platform' : 'भारत का #1'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools" className="px-10 py-5 bg-white text-purple-600 rounded-2xl font-black text-xl shadow-2xl transition-transform hover:scale-105">
                {language === 'en' ? 'Start FREE' : 'शुरू करें'}
              </Link>
              <Link to="/learn" className="px-10 py-5 border-2 border-white text-white rounded-2xl font-black text-xl transition-transform hover:scale-105">
                {language === 'en' ? '40 Lessons' : '40 पाठ'}
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-6 border-t ${theme === 'dark' ? 'bg-slate-950 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentDate.year} MoneyCal India. Made with 💙 for India
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomeOptimized;
