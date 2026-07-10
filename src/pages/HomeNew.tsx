import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator, ArrowRight, TrendingUp, Shield,
  BarChart3, Newspaper, FileText, Building2, Zap, IndianRupee,
  BookOpen, Target, CreditCard, Percent, Wallet, PiggyBank,
  Coins, Sparkles, Globe, Smartphone, PieChart, GraduationCap,
  Users
} from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { newsCategories } from '../data/newsCategories';
import SEOHelmet from '../components/SEOHelmet';
import RealTimeMarketData from '../components/RealTimeMarketData';
import AdvancedSEO from '../components/AdvancedSEO';
import GlobalSearch from '../components/GlobalSearch';
import { ResponsiveAd, BannerAd } from '../components/BannerAd';

export const HomeNew: React.FC = () => {
  const [allBlogPosts, setAllBlogPosts] = useState<any[]>([]);
  const [allNewsPosts, setAllNewsPosts] = useState<any[]>([]);
  const [govSchemes, setGovSchemes] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [blogMod, schemesMod, newsMod] = await Promise.all([
          import('../data/allBlogData'),
          import('../data/governmentSchemesData'),
          import('../cms-content/contentRegistry'),
        ]);
        if (isMounted) {
          setAllBlogPosts(blogMod.allBlogPosts || []);
          setGovSchemes(schemesMod.governmentSchemes || []);
          setAllNewsPosts(newsMod.contentRegistry || []);
        }
      } catch (e) {
        // silently fail
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, []);

  const featuredBlogs = allBlogPosts.slice(0, 3);
  const featuredNews = allNewsPosts.slice(0, 3);
  const featuredPosts = [...featuredBlogs, ...featuredNews];
  const featuredSchemes = govSchemes.filter((s: any) => s.status === 'active').slice(0, 6);

  // News category icons
  const newsCategoryIcons: Record<string, any> = {
    'markets': TrendingUp,
    'business-analysis': BarChart3,
    'startups': Zap,
    'economy': Globe,
    'tech-business': Sparkles,
  };

  // Popular calculators for quick access
  const popularCalcs = [
    { name: 'EMI Calculator', desc: 'Calculate loan EMIs instantly', icon: CreditCard, color: 'bg-blue-500', path: '/calculators/emi-calculator' },
    { name: 'SIP Calculator', desc: 'Plan systematic investments', icon: TrendingUp, color: 'bg-emerald-500', path: '/calculators/sip-calculator' },
    { name: 'Income Tax', desc: 'Old vs New regime comparison', icon: Percent, color: 'bg-orange-500', path: '/calculators/income-tax-calculator' },
    { name: 'PPF Calculator', desc: 'Public Provident Fund returns', icon: Shield, color: 'bg-indigo-500', path: '/calculators/ppf-calculator' },
    { name: 'FD Calculator', desc: 'Fixed Deposit maturity value', icon: PiggyBank, color: 'bg-purple-500', path: '/calculators/fd-calculator' },
    { name: 'NPS Calculator', desc: 'National Pension Scheme', icon: Wallet, color: 'bg-teal-500', path: '/calculators/nps-calculator' },
  ];

  // Platform sections for the "Explore" grid
  const exploreSections = [
    { name: 'IPO Dashboard', desc: '100+ IPO analyses', icon: Target, color: 'from-rose-500 to-orange-500', path: '/ipo' },
    { name: 'Gold Rate Today', desc: 'Live 22K & 24K prices', icon: Coins, color: 'from-amber-500 to-yellow-500', path: '/gold-rate' },
    { name: 'Silver Rate Today', desc: 'Real-time silver prices', icon: Coins, color: 'from-slate-400 to-slate-600', path: '/silver-rate' },
    { name: 'Stock Market', desc: 'Learn trading strategies', icon: BarChart3, color: 'from-green-500 to-emerald-600', path: '/stock-market' },
    { name: 'Blog', desc: 'Expert financial articles', icon: BookOpen, color: 'from-blue-500 to-indigo-600', path: '/blog' },
    { name: 'Learn', desc: 'Financial education hub', icon: GraduationCap, color: 'from-violet-500 to-purple-600', path: '/learn' },
    { name: 'Government Schemes', desc: 'PM schemes & benefits', icon: Building2, color: 'from-sky-500 to-blue-600', path: '/government-schemes' },
    { name: 'News', desc: 'Latest market updates', icon: Newspaper, color: 'from-emerald-500 to-teal-600', path: '/news' },
    { name: 'Crypto Market', desc: 'Bitcoin, Ethereum & more', icon: Coins, color: 'from-yellow-500 to-orange-600', path: '/crypto' },
    { name: 'Astro Finance', desc: 'Vedic financial guidance', icon: Sparkles, color: 'from-purple-500 to-pink-600', path: '/astro-finance' },
    { name: 'Tool Hub', desc: '200+ financial tools', icon: Zap, color: 'from-blue-600 to-indigo-700', path: '/tools' },
    { name: 'All Calculators', desc: 'Complete calculator suite', icon: Calculator, color: 'from-indigo-500 to-blue-600', path: '/calculators' },
  ];

  // Professional tools
  const proTools = [
    { name: 'GST & Indirect Tax', desc: 'GST Calculator, HSN codes, compliance', icon: IndianRupee, color: 'border-green-200 hover:bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600', path: '/gst-tools' },
    { name: 'Income Tax & TDS', desc: 'Tax Calculator, deductions, ITR filing', icon: FileText, color: 'border-blue-200 hover:bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', path: '/tax-tools' },
    { name: 'Loans & EMI', desc: 'Home, personal, car loan tools', icon: CreditCard, color: 'border-purple-200 hover:bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', path: '/loan-tools' },
    { name: 'Finance & Investment', desc: 'SIP, mutual funds, retirement', icon: TrendingUp, color: 'border-orange-200 hover:bg-orange-50', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', path: '/finance-tools' },
    { name: 'Insurance', desc: 'Life, Health, Car, Travel insurance', icon: Shield, color: 'border-cyan-200 hover:bg-cyan-50', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600', path: '/insurance-tools' },
    { name: 'Corporate Finance', desc: 'Business valuation & analysis', icon: Building2, color: 'border-slate-200 hover:bg-slate-50', iconBg: 'bg-slate-100', iconColor: 'text-slate-600', path: '/corporate-finance' },
  ];


  return (
    <>
      <SEOHelmet
        title="MoneyCal.in - Free Financial Calculators, IPO, Market Rates & Tools for India"
        description="India's #1 financial platform. 200+ free tools — EMI, SIP, Income Tax calculators, live Gold & Silver rates, IPO dashboard, Blog, Government Schemes, and more."
        keywords="financial calculator india, EMI Calculator, SIP Calculator, income tax calculator, PPF calculator, gold rate today, silver rate, IPO 2025, government schemes, mutual fund calculator"
        url="/"
        structuredData={{}}
        tags={["financial calculators", "EMI calculator", "SIP calculator", "income tax", "gold rate", "IPO"]}
      />
      <AdvancedSEO
        pageType="home"
        title="MoneyCal India - Complete Financial Platform"
        description="India's most comprehensive financial platform with 200+ calculators, real-time market data, expert articles, and tools for personal finance, investments, loans, insurance, and tax planning."
        url="/"
        keywords="finance india, personal finance, investment planning, loan calculator, insurance, tax planning, retirement planning, government schemes, gold rate, silver rate, IPO, stock market"
      />

      <div className="min-h-screen bg-white">

        {/* ═══════════ HERO SECTION ═══════════ */}
        <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-8 pb-16 sm:pt-12 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-3">India's #1 Financial Platform</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                  EMI, SIP, Tax —{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">All in One</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  200+ free tools. Built for India. Privacy-first. Plan loans, investments, taxes, and more with confidence.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-10 mt-4 w-full flex justify-center z-50">
                <div className="w-full max-w-2xl">
                  <GlobalSearch />
                </div>
              </motion.div>

              {/* Hero CTAs */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="flex flex-wrap gap-3 justify-center mb-6">
                <Link to="/calculators/emi-calculator" className="group bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center text-sm sm:text-base">
                  <IndianRupee className="w-4 h-4 mr-2" /> EMI Calculator <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/calculators/sip-calculator" className="group bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center text-sm sm:text-base">
                  <TrendingUp className="w-4 h-4 mr-2" /> SIP Calculator <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/calculators/income-tax-calculator" className="group bg-orange-600 text-white hover:bg-orange-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center text-sm sm:text-base">
                  <Percent className="w-4 h-4 mr-2" /> Income Tax <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div><span className="font-bold text-gray-900 text-lg">200+</span> Tools</div>
                <div className="w-px h-6 bg-gray-200"></div>
                <div><span className="font-bold text-gray-900 text-lg">100%</span> Free</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SUB NAVBAR ═══════════ */}
        <section className="bg-white border-b border-gray-100 py-4 overflow-x-auto shadow-sm sticky top-16 z-40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 flex-nowrap min-w-max sm:flex-wrap sm:min-w-0 sm:justify-center py-2">
              <Link to="/calculators" className="px-6 py-3 rounded-full text-sm font-extrabold transition-all bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5 border border-blue-200">Calculators</Link>
              <Link to="/tools" className="px-6 py-3 rounded-full text-sm font-extrabold transition-all bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5 border border-indigo-200">Tools</Link>
              <Link to="/ipo" reloadDocument className="px-6 py-3 rounded-full text-sm font-extrabold transition-all bg-gradient-to-r from-rose-50 to-rose-100 text-rose-800 hover:from-rose-500 hover:to-orange-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5 border border-rose-200 flex items-center gap-2">IPO <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span></span></Link>
              <Link to="/gold-rate" className="px-6 py-3 rounded-full text-sm font-extrabold transition-all bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 hover:from-amber-500 hover:to-yellow-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5 border border-amber-200">Market Rates</Link>
              <Link to="/learn" className="px-6 py-3 rounded-full text-sm font-extrabold transition-all bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 hover:from-purple-600 hover:to-pink-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5 border border-purple-200">Learn</Link>
              <Link to="/blog" reloadDocument className="px-6 py-3 rounded-full text-sm font-extrabold transition-all bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5 border border-emerald-200">Blog</Link>
              <Link to="/news" reloadDocument className="px-6 py-3 rounded-full text-sm font-extrabold transition-all bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-800 hover:from-cyan-500 hover:to-blue-500 hover:text-white hover:shadow-lg hover:-translate-y-0.5 border border-cyan-200">News</Link>
              <Link to="/government-schemes" reloadDocument className="px-6 py-3 rounded-full text-sm font-extrabold transition-all bg-gradient-to-r from-sky-50 to-sky-100 text-sky-800 hover:from-sky-500 hover:to-blue-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5 border border-sky-200">Schemes</Link>
            </div>
          </div>
        </section>

        {/* ═══════════ ADVERTISEMENT ═══════════ */}
        <div className="w-full bg-gray-50 flex justify-center py-4 border-b border-gray-100 hidden md:flex">
          <BannerAd width={728} height={90} slot="home-top-banner" />
        </div>

        {/* ═══════════ MARKET DATA ═══════════ */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RealTimeMarketData />
          </div>
        </section>

        {/* ═══════════ POPULAR CALCULATORS ═══════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Popular Calculators</h2>
              <p className="text-gray-600 text-lg">The most-used financial calculators in India</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCalcs.map((calc) => (
                <Link key={calc.name} to={calc.path} className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-200 text-center">
                  <div className={`w-14 h-14 ${calc.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <calc.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{calc.name}</h3>
                  <p className="text-xs text-gray-500">{calc.desc}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/calculators" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-md transition-all text-sm">
                View All Calculators <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ ADVERTISEMENT ═══════════ */}
        <section className="py-8 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ResponsiveAd slot="home-mid-responsive" />
          </div>
        </section>

        {/* ═══════════ EXPLORE PLATFORM ═══════════ */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Explore MoneyCal</h2>
              <p className="text-gray-600 text-lg">Everything you need for financial success — all in one place</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {exploreSections.map((section) => (
                <Link key={section.name} to={section.path === '/government-schemes' ? '/government-schemes' : section.path} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 duration-200">
                  <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative z-10 p-5 sm:p-6 text-white text-left">
                    <section.icon className="w-8 h-8 mb-3 opacity-90" />
                    <h3 className="font-bold text-base sm:text-lg mb-1">{section.name}</h3>
                    <p className="text-xs sm:text-sm opacity-80">{section.name === 'Government Schemes' ? 'PM schemes & benefits' : section.desc}</p>
                    <ArrowRight className="w-4 h-4 mt-3 group-hover:translate-x-1 transition-transform opacity-70" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ PROFESSIONAL TOOLS ═══════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Professional Tools</h2>
              <p className="text-gray-600 text-lg">Comprehensive solutions for businesses and professionals</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {proTools.map((tool) => (
                <Link key={tool.name} to={tool.path} className={`group bg-white border rounded-2xl p-6 ${tool.color} transition-all hover:-translate-y-1 duration-200 shadow-sm hover:shadow-lg`}>
                  <div className={`w-14 h-14 ${tool.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm">{tool.desc}</p>
                  <div className="flex items-center mt-4 text-sm font-semibold text-blue-600">
                    Explore <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CALCULATOR CATEGORIES ═══════════ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">All Calculator Categories</h2>
              <p className="text-gray-600 text-lg">Browse by category to find the right tool</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {calculatorCategories.map((category) => (
                <Link key={category.id} to={`/category/${category.id}`} className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 transition-colors">
                    <Calculator className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.calculators.length} tools</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FINANCE NEWS ═══════════ */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Finance News</h2>
                <p className="text-gray-600">Stay updated with the latest market & business news</p>
              </div>
              <Link to="/news" reloadDocument className="hidden sm:inline-flex items-center px-5 py-2.5 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all text-sm">
                All News <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {newsCategories.map((cat) => {
                const IconComp = newsCategoryIcons[cat.slug] || Newspaper;
                return (
                  <Link key={cat.slug} to={`/news/${cat.slug}`} className="group bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-600 transition-colors">
                      <IconComp className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{cat.description}</p>
                  </Link>
                );
              })}
            </div>
            <div className="sm:hidden text-center mt-6">
              <Link to="/news" reloadDocument className="inline-flex items-center text-emerald-600 font-semibold">
                View All News <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ LATEST FROM BLOG & NEWS ═══════════ */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Latest from Blog & News</h2>
                  <p className="text-gray-600">Expert financial insights, guides & analysis updated daily</p>
                </div>
                <div className="hidden sm:flex gap-3">
                  <Link to="/blog" reloadDocument className="inline-flex items-center px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all text-sm">
                    All Blogs <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link to="/news" reloadDocument className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md text-sm">
                    All News <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post: any, index: number) => {
                  const isNews = index >= featuredBlogs.length;
                  const itemPath = isNews ? `/news/${post.slug}` : `/blog/${post.slug}`;
                  const categoryTag = isNews ? "News" : (post.categories && post.categories.length > 0 ? post.categories[0] : "Blog");
                  const itemDate = post.date || post.datePublished;

                  return (
                    <Link key={post.id || post.slug} to={itemPath} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-200">
                      {(post.image || post.coverImage) && (
                        <div className="h-44 overflow-hidden shrink-0">
                          <img src={post.image || post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <span className={`inline-block self-start px-2.5 py-0.5 text-xs font-semibold rounded-full mb-2 ${isNews ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{categoryTag}</span>
                        <h3 className={`font-bold text-gray-900 mb-2 line-clamp-2 transition-colors ${isNews ? 'group-hover:text-emerald-600' : 'group-hover:text-blue-600'}`}>{post.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt || ''}</p>
                        {itemDate && <p className="text-xs text-gray-400 mt-3">{new Date(itemDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div className="sm:hidden flex flex-col gap-3 text-center mt-6">
                <Link to="/blog" reloadDocument className="inline-flex justify-center items-center text-blue-600 font-semibold border-2 border-blue-600 rounded-xl py-2.5">
                  View All Blogs <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/news" reloadDocument className="inline-flex justify-center items-center bg-blue-600 text-white font-semibold rounded-xl py-2.5">
                  View All News <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ GOVERNMENT SCHEMES ═══════════ */}
        {featuredSchemes.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <Link to="/government-schemes" reloadDocument className="group block">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">Government Schemes <ArrowRight className="inline-block w-6 h-6 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" /></h2>
                  <p className="text-gray-600">PM schemes & benefits</p>
                </Link>
                <Link to="/government-schemes" reloadDocument className="hidden sm:inline-flex items-center px-5 py-2.5 border-2 border-amber-600 text-amber-600 rounded-xl font-semibold hover:bg-amber-600 hover:text-white transition-all text-sm">
                  All Schemes <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredSchemes.map((scheme: any) => (
                  <Link key={scheme.id} to={`/government-schemes/${scheme.slug}`} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-200">
                    {scheme.coverImage && (
                      <div className="h-40 overflow-hidden relative">
                        <img src={scheme.coverImage} alt={scheme.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        <div className="absolute top-3 left-3">
                          <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full ${scheme.status === 'active' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
                            {scheme.status === 'active' ? '✓ Active' : scheme.status}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-2">{scheme.category}</span>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors text-sm">{scheme.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{scheme.excerpt || ''}</p>
                      {scheme.beneficiaries && (
                        <div className="flex items-center mt-3 text-xs text-gray-400">
                          <Users className="w-3.5 h-3.5 mr-1" /> {scheme.beneficiaries}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="sm:hidden text-center mt-6">
                <Link to="/government-schemes" reloadDocument className="inline-flex items-center text-amber-600 font-semibold">
                  View All Schemes <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </section>
        )}


        {/* ═══════════ WHY MONEYCAL ═══════════ */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why Choose MoneyCal?</h2>
              <p className="text-gray-600 text-lg">Built specifically for the Indian financial context</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Globe, title: 'Indian Context', desc: 'Tailored for Indian tax laws, investment options, and financial products' },
                { icon: TrendingUp, title: 'Accurate Results', desc: 'Precise calculations based on the latest financial formulas and regulations' },
                { icon: PieChart, title: 'Visual Insights', desc: 'Interactive charts and visual breakdowns to understand your finances better' },
                { icon: Smartphone, title: 'Mobile Friendly', desc: 'Optimized for all devices — use on mobile, tablet, or desktop seamlessly' },
              ].map((feature) => (
                <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CTA SECTION ═══════════ */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Financial Journey?</h2>
            <p className="text-xl text-blue-100 mb-8">200+ free tools to help you make smarter financial decisions</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/calculators/emi-calculator" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all text-sm sm:text-base">
                Start Calculating
              </Link>
              <Link to="/tools" className="bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all text-sm sm:text-base">
                Explore All Tools
              </Link>
              <Link to="/blog" reloadDocument className="bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all text-sm sm:text-base">
                Read Our Blog
              </Link>
            </div>
          </div>
        </section>

        <div className="text-center py-4 text-sm text-gray-500">
          No Short Code Provided.
        </div>

      </div>
    </>
  );
};

export default HomeNew;
