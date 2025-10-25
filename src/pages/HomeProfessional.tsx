import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, Search, TrendingUp, BookOpen, Shield, Award, Users,
  CheckCircle2, ArrowRight, Star, Heart, Zap, Target, FileText,
  BarChart3, PiggyBank, Home as HomeIcon, DollarSign, Building,
  Umbrella, Gift, PartyPopper, Rocket, Tag, Sparkles, ChevronRight,
  Newspaper, Clock, Flame, Globe, Sun, Moon, X, Menu
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import BeautifulFooter from '../components/BeautifulFooter';
import LightweightTrustBadges from '../components/LightweightTrustBadges';
import GlobalSearch from '../components/GlobalSearch';
import { loadBlogData } from '../data/lazyBlogData';
import { calculatorCategories } from '../data/calculatorData';

const HomeProfessional: React.FC = () => {
  const [blogPostsData, setBlogPostsData] = useState<any[]>([]);
  const [rotationKey, setRotationKey] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const currentDate = useMemo(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.toLocaleDateString('en-IN', { month: 'long' }),
      day: now.getDate(),
      fullDate: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  }, []);

  // Lazy load blog data
  useEffect(() => {
    loadBlogData().then(data => {
      const allPosts = [...(data.blogPosts0 || []), ...(data.blogPosts1 || [])];
      setBlogPostsData(allPosts);
    }).catch(() => {});
  }, []);

  // Auto-refresh content every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationKey(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // DYNAMIC: Build search database from actual codebase data
  // Search is now handled by GlobalSearch component - no local search state needed

  const getRandomItems = (pool: any[], count: number) => {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // DYNAMIC: Popular calculators from actual data
  const allPopularCalculators = useMemo(() => 
    calculatorCategories.flatMap(cat => 
      cat.calculators.slice(0, 3).map(calc => ({
        name: calc.name,
        path: `/calculators/${calc.id}`,
        icon: cat.name.includes('Loan') ? '🏠' : cat.name.includes('Investment') ? '📈' : 
              cat.name.includes('Tax') ? '📄' : '🧮',
        desc: calc.description.slice(0, 50) + '...',
        users: ['50K+', '45K+', '40K+', '38K+', '35K+', '42K+'][Math.floor(Math.random() * 6)]
      }))
    ), []);

  const popularCalculators = useMemo(() => 
    getRandomItems(allPopularCalculators, 6), [allPopularCalculators, rotationKey]
  );

  // DYNAMIC: Main categories from actual data
  const mainCategories = useMemo(() => {
    const categories = calculatorCategories.map(cat => ({
      name: cat.name,
      path: `/calculators`,
      icon: cat.name.includes('Loan') ? '🏠' : cat.name.includes('Investment') ? '📈' : 
            cat.name.includes('Tax') ? '📄' : cat.name.includes('Retirement') ? '👴' : 
            cat.name.includes('Business') ? '💼' : '🧮',
      count: `${cat.calculators.length}+`,
      color: cat.name.includes('Loan') ? 'from-blue-500 to-cyan-600' :
             cat.name.includes('Investment') ? 'from-green-500 to-emerald-600' :
             cat.name.includes('Tax') ? 'from-purple-500 to-pink-600' :
             cat.name.includes('Retirement') ? 'from-pink-500 to-rose-600' :
             'from-indigo-500 to-purple-600',
      desc: cat.description.slice(0, 50) + '...'
    }));
    return categories.slice(0, 6);
  }, []);

  // DYNAMIC: Festival categories
  const festivalCategories = [
    { name: 'Date & Calendar', path: '/festival-tools', icon: '📅', desc: 'Panchang, Tithi, Muhurat dates' },
    { name: 'Planning & Shopping', path: '/festival-tools', icon: '🛍️', desc: 'Festival shopping planners' },
    { name: 'Finance & Money', path: '/festival-tools', icon: '💰', desc: 'Festival budget calculators' },
    { name: 'Religious', path: '/festival-tools', icon: '🙏', desc: 'Puja, Vrat, Religious dates' },
    { name: 'Fun & Games', path: '/fun-engagement', icon: '🎮', desc: 'Festival games & quizzes' },
    { name: 'Design', path: '/design-tools', icon: '🎨', desc: 'Cards, invitations, templates' },
    { name: 'Information', path: '/festival-info', icon: '📖', desc: 'Festival history & traditions' },
    { name: 'Corporate', path: '/festival-corporate-tools', icon: '💼', desc: 'Corporate festival bonuses' },
    { name: 'Regional', path: '/regional-tools', icon: '🗺️', desc: 'Regional festival calendars' },
    { name: 'SEO Tools', path: '/seo-tools', icon: '📊', desc: 'Festival content optimization' },
  ];

  // DYNAMIC: Festival tools
  const allFestivalTools = [
    { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', icon: '🌑', tag: 'New' },
    { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', icon: '💍', tag: 'Hot' },
    { name: 'Panchang Today', path: '/festival-tools/panchang-today', icon: '📅', tag: 'Popular' },
    { name: 'Weekly Tithi', path: '/festival-tools/weekly-tithi-finder', icon: '📆', tag: '' },
    { name: 'Purnima Amavasya', path: '/festival-tools/purnima-amavasya-dates', icon: '🌕', tag: 'Trending' },
    { name: 'Vrat Calendar', path: '/festival-tools/vrat-upavas-calendar', icon: '🙏', tag: 'Popular' },
    { name: 'Nakshatra', path: '/festival-tools/nakshatra-festival', icon: '⭐', tag: '' },
    { name: 'Shubh Muhurat', path: '/festival-tools/shubh-muhurat-reminder', icon: '🔔', tag: 'Hot' },
    { name: 'Diwali Date', path: '/festival-tools/diwali-date-finder', icon: '🪔', tag: '' },
    { name: 'Holi Date', path: '/festival-tools/holi-date-calculator', icon: '🎨', tag: '' },
    { name: 'Raksha Bandhan', path: '/festival-tools/raksha-bandhan-muhurat', icon: '🎀', tag: '' },
    { name: 'Ganesh Chaturthi', path: '/festival-tools/ganesh-chaturthi-countdown', icon: '🐘', tag: '' },
  ];

  const festivalTools = useMemo(() => 
    getRandomItems(allFestivalTools, 12), [rotationKey]
  );

  // DYNAMIC: Learning courses
  const learningCourses = [
    { name: 'Gold Loans', path: '/learn/gold-loans', icon: '🏆', lessons: '10' },
    { name: 'Credit Cards', path: '/learn/credit-cards', icon: '💳', lessons: '20' },
    { name: 'Credit Score', path: '/learn/credit-score', icon: '📊', lessons: '10' },
  ];

  // DYNAMIC: All platform categories
  const allPlatformCategories = [
    { name: 'Calculators', path: '/calculators', emoji: '🧮', count: calculatorCategories.reduce((acc, cat) => acc + cat.calculators.length, 0) + '+' },
    { name: 'Learn', path: '/learn', emoji: '📚', count: '40' },
    { name: 'Festival', path: '/festival-tools', emoji: '🎉', count: '11+' },
    { name: 'GST', path: '/gst-tools', emoji: '💰', count: '20+' },
    { name: 'Tax', path: '/tax-tools', emoji: '📄', count: '15+' },
    { name: 'Loans', path: '/loan-tools', emoji: '🏠', count: '12+' },
    { name: 'Insurance', path: '/insurance-tools', emoji: '🛡️', count: '8+' },
    { name: 'Corporate', path: '/corporate-finance', emoji: '💼', count: '25+' },
    { name: 'Gold', path: '/gold-tools', emoji: '🏆', count: '10+' },
    { name: 'Finance', path: '/finance-tools', emoji: '💵', count: '30+' },
    { name: 'Blog', path: '/blog', emoji: '📰', count: '150+' },
    { name: 'Crypto', path: '/crypto', emoji: '₿', count: '50+' },
    { name: 'Excel', path: '/excel-tools', emoji: '📊', count: '100+' },
    { name: 'Banking', path: '/banking', emoji: '🏦', count: '15+' },
    { name: 'Market', path: '/stock-market', emoji: '📈', count: '20+' },
    { name: 'Schemes', path: '/government-schemes', emoji: '🎁', count: '50+' },
    { name: 'Retirement', path: '/calculators/retirement-calculator', emoji: '👴', count: '5+' },
    { name: 'Astro', path: '/astro-finance', emoji: '⭐', count: '12+' },
  ];

  const platformCategories = useMemo(() => 
    getRandomItems(allPlatformCategories, 18), [rotationKey]
  );

  // DYNAMIC: Popular tags
  const allPopularTags = [
    { emoji: '🌑', label: 'Eclipse', searchTerm: 'Eclipse' },
    { emoji: '💍', label: 'Marriage', searchTerm: 'Marriage' },
    { emoji: '📄', label: 'Income Tax', searchTerm: 'Income Tax' },
    { emoji: '🏠', label: 'EMI', searchTerm: 'EMI' },
    { emoji: '📈', label: 'SIP', searchTerm: 'SIP' },
    { emoji: '💰', label: 'GST', searchTerm: 'GST' },
    { emoji: '🏦', label: 'PPF', searchTerm: 'PPF' },
  ];

  const popularTags = useMemo(() => 
    getRandomItems(allPopularTags, 5), [rotationKey]
  );

  // DYNAMIC: Trending items
  const allTrendingItems = [
    { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', emoji: '🌑', tag: 'NEW', desc: '11 eclipse dates with Sutak timings' },
    { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', emoji: '💍', tag: 'HOT', desc: '40+ auspicious wedding dates' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', emoji: '💰', tag: 'HOT', desc: 'Calculate GST inclusive/exclusive' },
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', emoji: '📈', tag: 'POPULAR', desc: 'Mutual fund SIP returns calculator' },
    { name: 'Income Tax 2025', path: '/tools/income-tax-calculator', emoji: '📄', tag: 'POPULAR', desc: 'Old vs New regime comparison' },
    { name: 'Car Loan EMI', path: '/calculators/car-loan-emi-calculator', emoji: '🚗', tag: 'NEW', desc: 'Auto loan calculator with down payment' },
    { name: 'Gold Loans', path: '/learn/gold-loans', emoji: '🏆', tag: 'TRENDING', desc: '10 comprehensive lessons' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', emoji: '🏦', tag: 'POPULAR', desc: 'Retirement planning tool' },
    { name: 'Prepayment Calculator', path: '/calculators/prepayment-calculator', emoji: '💰', tag: 'TRENDING', desc: 'Calculate loan prepayment savings' },
  ];

  const trendingItems = useMemo(() => 
    getRandomItems(allTrendingItems, 6), [rotationKey]
  );

  // DYNAMIC: Content pools
  const dynamicContent = useMemo(() => ({
    calculators: getRandomItems(popularCalculators, 7),
    learning: learningCourses,
    festivals: getRandomItems(allFestivalTools, 7),
    blogs: blogPostsData.slice(0, 7).map((post: any) => ({
      name: post?.title || '',
      path: `/blog/${post?.slug || ''}`,
      emoji: '📰',
      desc: (post?.excerpt || '').slice(0, 55) + '...',
      category: post?.categories?.[0] || 'Finance'
    }))
  }), [popularCalculators, blogPostsData, rotationKey]);

  // Statistics
  const stats = [
    { number: `${calculatorCategories.reduce((acc, cat) => acc + cat.calculators.length, 0)}+`, label: 'Calculators', icon: Calculator },
    { number: '1M+', label: 'Users', icon: Users },
    { number: '4.9/5', label: 'Rating', icon: Star },
    { number: '100%', label: 'Free', icon: Heart },
  ];

  const mainSections = [
    { name: language === 'en' ? 'All Tools' : 'सभी टूल्स', path: '/tools', emoji: '🧰' },
    { name: language === 'en' ? 'Calculators' : 'कैलकुलेटर', path: '/calculators', emoji: '🧮' },
    { name: language === 'en' ? 'Finance Tools' : 'वित्त टूल्स', path: '/finance-tools', emoji: '💵' },
    { name: language === 'en' ? 'Tax Tools' : 'कर टूल्स', path: '/tax-tools', emoji: '📄' },
    { name: language === 'en' ? 'GST Tools' : 'जीएसटी टूल्स', path: '/gst-tools', emoji: '💰' },
    { name: language === 'en' ? 'Corporate Finance' : 'कॉर्पोरेट', path: '/corporate-finance', emoji: '💼' },
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
        title="MoneyCal.in - #1 Financial Calculator Platform in India | EMI, SIP, Tax, GST"
        description="India's most comprehensive financial calculator platform. Free EMI, SIP, Income Tax, GST calculators. Trusted by 1M+ users. RBI-compliant & secure."
        keywords="financial calculator, EMI calculator, SIP calculator, income tax calculator, GST calculator, loan calculator India"
        canonicalUrl="https://moneycal.in"
      />

      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
        
        {/* Beautiful Comprehensive Navbar */}
        <nav className={`relative z-40 ${theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-lg sticky top-0 shadow-lg border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`} style={{ minHeight: '72px' }}>
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all shadow-xl">
                  <span className="text-white font-black text-2xl">💰</span>
                </div>
                <div>
                  <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    MoneyCal.in
                  </span>
                  <div className={`text-xs font-medium -mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Smart Financial Tools
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation Pills */}
              <div className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl px-2 py-2 rounded-2xl border border-white/10 shadow-2xl">
                {mainSections.slice(0, 8).map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition-all hover:scale-105 ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-slate-700/70'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="hidden xl:inline">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2.5">
                {/* Mobile Menu */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl transition-colors"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Theme Toggle */}
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-3 rounded-xl transition-all active:scale-90 shadow-xl ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white' 
                      : 'bg-gradient-to-br from-slate-700 to-blue-900 text-white'
                  }`}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Language Toggle */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="px-4 py-3 rounded-xl text-sm font-bold active:scale-90 shadow-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white transition-all"
                  aria-label="Toggle language"
                >
                  <Globe className="w-4 h-4 inline mr-1" />
                  {language === 'en' ? 'हिंदी' : 'EN'}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div 
              className={`lg:hidden border-t ${theme === 'dark' ? 'border-white/10 bg-slate-800/95' : 'border-gray-200 bg-white/95'}`}
            >
              <div className="px-4 py-4 grid grid-cols-2 gap-2.5 max-h-[70vh] overflow-y-auto">
                {mainSections.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                      theme === 'dark'
                        ? 'bg-slate-700/60 text-white hover:bg-slate-600/60'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero */}
        <section className="pt-24 pb-16 px-4" style={{ minHeight: '650px' }}>
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Trusted by 1,000,000+ Indians • Updated {currentDate.fullDate}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {language === 'en' ? "India's #1 Financial" : 'भारत का #1 वित्तीय'}<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'en' ? 'Calculator Platform' : 'कैलकुलेटर प्लेटफ़ॉर्म'}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {language === 'en' ? 'Free EMI, SIP, Tax & GST Calculators — Secure, Accurate & RBI-Compliant' : 'मुफ़्त EMI, SIP, टैक्स और GST कैलकुलेटर'}
            </p>

             {/* DYNAMIC Global Search from Entire Codebase */}
            <div className="max-w-2xl mx-auto mb-10">
              <GlobalSearch />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/calculators" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow">
                <Calculator className="w-5 h-5" />
                {language === 'en' ? 'Start Calculating Free' : 'गणना शुरू करें'}
              </Link>
              <Link to="/learn" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-purple-500 transition-colors">
                <BookOpen className="w-5 h-5" />
                {language === 'en' ? 'MoneyLearn (40 Lessons)' : 'सीखें (40 पाठ)'}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="w-10 h-10 mx-auto mb-2 text-blue-600" />
                    <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DYNAMIC Platform Categories */}
        <section className={`py-12 px-4 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                📁 {language === 'en' ? 'Complete Platform' : 'संपूर्ण मंच'}
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Sparkles className="w-4 h-4 inline text-yellow-500" /> {language === 'en' ? 'Content refreshes every 10 seconds' : 'हर 10 सेकंड में'}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {platformCategories.map((item, idx) => (
                <Link key={idx} to={item.path} className={`p-4 rounded-xl text-center transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60 border border-white/10' : 'bg-white border-2 border-gray-200 shadow-md hover:border-blue-500'}`}>
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className={`text-xs font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</div>
                  <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block font-semibold ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>{item.count}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DYNAMIC Popular Calculators */}
        <section className={`py-16 px-4 ${theme === 'dark' ? 'bg-slate-950/30' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {language === 'en' ? 'Most Popular Financial Calculators' : 'सबसे लोकप्रिय कैलकुलेटर'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCalculators.map((calc, idx) => (
                <Link key={idx} to={calc.path} className={`group p-6 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-xl ${theme === 'dark' ? 'bg-slate-800/70 border-white/10 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{calc.icon}</div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>{calc.name}</h3>
                      <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{calc.desc}</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 font-medium">{calc.users} users</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-600'}`} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Festival Tool Categories */}
        <section className={`py-16 px-4 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold mb-3 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              🎊 {language === 'en' ? 'Festival Tool Categories' : 'त्योहार श्रेणियाँ'}
            </h2>
            <p className={`text-lg text-center mb-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'Complete festival planning and cultural tools' : 'संपूर्ण त्योहार योजना'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {festivalCategories.map((cat, idx) => (
                <Link key={idx} to={cat.path} className={`group p-4 rounded-xl border-2 transition-all hover:scale-105 text-center ${theme === 'dark' ? 'bg-orange-900/20 border-orange-500/30 hover:border-orange-400' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-500 shadow-md'}`}>
                  <span className="text-4xl mb-3 block">{cat.icon}</span>
                  <h3 className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{cat.name}</h3>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{cat.desc}</p>
                </Link>
              ))}
            </div>

            {/* DYNAMIC Festival Tools Grid */}
            <div className="mt-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {festivalTools.map((tool, idx) => (
                  <Link key={idx} to={tool.path} className={`relative p-4 rounded-lg border transition-all hover:scale-105 text-center ${theme === 'dark' ? 'bg-slate-800/50 border-orange-500/20 hover:border-orange-400' : 'bg-white border-gray-200 hover:border-orange-500 shadow-sm hover:shadow-md'}`}>
                    {tool.tag && (
                      <span className={`absolute top-1 right-1 px-2 py-0.5 rounded-full text-[9px] font-black ${tool.tag === 'New' ? 'bg-green-500' : tool.tag === 'Hot' ? 'bg-red-500' : 'bg-blue-500'} text-white`}>{tool.tag}</span>
                    )}
                    <span className="text-4xl mb-2 block">{tool.icon}</span>
                    <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{tool.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DYNAMIC Trending & New */}
        <section className={`py-16 px-4 ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl font-black text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              🔥 {language === 'en' ? 'Trending & New' : 'ट्रेंडिंग और नया'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingItems.map((item, idx) => (
                <Link key={idx} to={item.path} className={`relative p-6 rounded-2xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/70 border-2 border-white/10' : 'bg-white border-2 border-gray-200 shadow-lg'}`}>
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black ${item.tag === 'NEW' ? 'bg-green-500' : item.tag === 'HOT' ? 'bg-red-500' : 'bg-blue-500'} text-white`}>{item.tag}</span>
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DYNAMIC Discover More - 4 Columns */}
        <section className={`py-16 px-4 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl font-black mb-3 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              ✨ {language === 'en' ? 'Discover More' : 'और खोजें'}
            </h2>
            <p className={`text-lg text-center mb-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'en' ? 'Content refreshes every 10 seconds • Explore our platform' : 'हर 10 सेकंड में नया कंटेंट'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Calculators Column */}
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-blue-900/20 border-blue-500/30' : 'bg-blue-50 border-blue-300'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-8 h-8 text-blue-600" />
                  <h3 className="text-xl font-bold text-blue-700">🧮 Top Calculators</h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.calculators.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`block p-4 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-white shadow-md'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                          <span className="text-xs font-semibold text-blue-600">👥 {item.users} users</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Learning Column */}
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-purple-900/20 border-purple-500/30' : 'bg-purple-50 border-purple-300'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-700">📚 Learn Finance</h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.learning.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`block p-4 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-white shadow-md'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                          <span className="text-xs font-semibold text-purple-600">📖 {item.lessons} lessons</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Festival Column */}
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-orange-900/20 border-orange-500/30' : 'bg-orange-50 border-orange-300'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <PartyPopper className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-700">🎉 Festival Tools</h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.festivals.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`block p-4 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-white shadow-md'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h4 className={`font-bold text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Blog Column */}
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-green-900/20 border-green-500/30' : 'bg-green-50 border-green-300'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Newspaper className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">📰 Latest Articles</h3>
                </div>
                <div className="space-y-3">
                  {dynamicContent.blogs.map((item, idx) => (
                    <Link key={idx} to={item.path} className={`block p-4 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800/60' : 'bg-white shadow-md'}`}>
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div>
                          <h4 className={`font-bold text-sm mb-1 line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                          <span className="text-xs font-semibold text-green-600">📂 {item.category}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <LightweightTrustBadges />

         {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" style={{ minHeight: '350px' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              🚀 {language === 'en' ? 'Ready to Take Control?' : 'तैयार हैं?'}
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              {language === 'en' ? 'Join 1,000,000+ Indians using MoneyCal.in' : 'भारत का #1 प्लेटफ़ॉर्म'}
            </p>
            <Link to="/calculators" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg hover:shadow-2xl transition-shadow">
              <Calculator className="w-6 h-6" />
              {language === 'en' ? 'Calculate Now - Free!' : 'अभी गणना करें'}
            </Link>
          </div>
        </section>

        <BeautifulFooter />
      </div>
    </>
  );
};

export default HomeProfessional;
