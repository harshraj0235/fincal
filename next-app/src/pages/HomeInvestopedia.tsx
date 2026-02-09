import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Search, TrendingUp, BookOpen, FileText, 
  ArrowRight, Zap, Shield, Award, ChevronRight,
  DollarSign, Building, Home, PiggyBank,
  BarChart3, Gift, Umbrella,
  Rocket, CheckCircle,
  CreditCard, Building2, Briefcase, Heart, GraduationCap,
  X, Wrench,
  Newspaper, Coins, FolderOpen, Sparkles, Play,
  Receipt, Calendar as CalendarIcon, Gem, Scale,
  Flame, LayoutGrid,
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { calculatorCategories } from '../data/calculatorData';
import { getStaticSearchItems, searchStatic, type SearchItem, type SearchItemType } from '../data/siteSearchIndex';
import { loadAllBlogData } from '../data/lazyBlogData';
import { contentRegistry } from '../cms-content/contentRegistry';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Loan Calculators': Home,
  'Investment Calculators': TrendingUp,
  'Tax Calculators': FileText,
  'Retirement Calculators': Umbrella,
  'Business Calculators': Briefcase,
  'Property Calculators': Building,
  'Insurance Calculators': Heart,
  'Banking & Finance Tools': Building2,
  'FinTech & Payments': CreditCard,
  'Investments & Wealth Management': BarChart3,
  'Personal Finance': PiggyBank,
  'Math & Education Calculators': GraduationCap,
};

const TOOL_HUB_LINKS = [
  { name: 'Tax Tools', path: '/tax-tools', icon: FileText, keywords: 'income tax, TDS, GST', color: 'from-emerald-500 to-teal-600' },
  { name: 'Gold Tools', path: '/gold-tools', icon: Gem, keywords: 'gold loan, gold price', color: 'from-amber-500 to-yellow-600' },
  { name: 'GST Tools', path: '/gst-tools', icon: Receipt, keywords: 'GST, invoice', color: 'from-violet-500 to-purple-600' },
  { name: 'Finance Tools', path: '/finance-tools', icon: DollarSign, keywords: 'SIP, mutual fund, FD', color: 'from-blue-500 to-indigo-600' },
  { name: 'Excel Tools', path: '/excel-tools', icon: BarChart3, keywords: 'Excel, spreadsheet', color: 'from-green-500 to-emerald-600' },
  { name: 'Bank Tools', path: '/bank-tools', icon: Building2, keywords: 'IFSC, ATM, bank', color: 'from-cyan-500 to-blue-600' },
  { name: 'Loan Tools', path: '/loan-tools', icon: Home, keywords: 'EMI, home loan, personal loan', color: 'from-rose-500 to-pink-600' },
  { name: 'Insurance Tools', path: '/insurance-tools', icon: Heart, keywords: 'term, health insurance', color: 'from-pink-500 to-rose-600' },
  { name: 'Festival Tools', path: '/festival-tools', icon: CalendarIcon, keywords: 'festival dates, panchang', color: 'from-orange-500 to-amber-600' },
  { name: 'All Tools', path: '/tools', icon: Wrench, keywords: '200+ tools', color: 'from-slate-600 to-slate-800' },
];

const QUICK_LINKS = [
  { name: 'Calculators', path: '/calculators', icon: Calculator },
  { name: 'Learn', path: '/learn', icon: BookOpen },
  { name: 'Blog', path: '/blog', icon: FileText },
  { name: 'News', path: '/news', icon: Newspaper },
  { name: 'Govt Schemes', path: '/government-schemes', icon: Gift },
  { name: 'Crypto', path: '/crypto', icon: Coins },
];

const popularCalculators = [
  { id: 'emi-calculator', name: 'EMI Calculator', path: '/calculators/emi-calculator' },
  { id: 'sip-calculator', name: 'SIP Calculator', path: '/calculators/sip-calculator' },
  { id: 'income-tax-calculator', name: 'Income Tax', path: '/calculators/income-tax-calculator' },
  { id: 'gst-calculator', name: 'GST Calculator', path: '/calculators/gst-calculator' },
  { id: 'ppf-calculator', name: 'PPF Calculator', path: '/calculators/ppf-calculator' },
  { id: 'fd-calculator', name: 'FD Calculator', path: '/calculators/fd-calculator' },
  { id: 'home-loan-calculator', name: 'Home Loan', path: '/calculators/home-loan-calculator' },
  { id: 'gold-investment-calculator', name: 'Gold Investment', path: '/calculators/gold-investment-calculator' },
];

const totalCalculators = calculatorCategories.reduce((sum, c) => sum + c.calculators.length, 0);

const HomeInvestopedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [blogPosts, setBlogPosts] = useState<{ name: string; path: string; category: string; keywords: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'calculators' | 'tools' | 'resources'>('calculators');
  const navigate = useNavigate();

  useEffect(() => {
    loadAllBlogData()
      .then((posts) => {
        if (posts && Array.isArray(posts)) {
          setBlogPosts(
            posts.slice(0, 100).map((p: any) => ({
              name: p.title || '',
              path: `/blog/${p.slug || ''}`,
              category: 'Blog',
              keywords: (p.categories || []).join(' ') + ' ' + (p.excerpt || ''),
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const newsItems = useMemo(
    () =>
      contentRegistry.slice(0, 50).map((a) => ({
        name: a.title,
        path: `/news/${a.category}/${a.slug}`,
        category: 'News',
        keywords: a.category + ' ' + a.title,
      })),
    []
  );

  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return { calculators: [], tools: [], blog: [], news: [], pages: [] };
    const q = searchQuery.trim().toLowerCase();
    const staticResults = searchStatic(searchQuery, 30);
    const blogMatches = blogPosts.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.keywords.toLowerCase().includes(q)
    ).slice(0, 8);
    const newsMatches = newsItems.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.keywords.toLowerCase().includes(q)
    ).slice(0, 8);
    const byType = (type: SearchItemType) => staticResults.filter((r) => r.type === type);
    return {
      calculators: byType('calculator').slice(0, 10),
      tools: byType('tool').slice(0, 8),
      pages: byType('page').slice(0, 6),
      blog: blogMatches,
      news: newsMatches,
    };
  }, [searchQuery, blogPosts, newsItems]);

  const hasSearchResults =
    searchResults.calculators.length > 0 ||
    searchResults.tools.length > 0 ||
    searchResults.pages.length > 0 ||
    searchResults.blog.length > 0 ||
    searchResults.news.length > 0;

  useEffect(() => {
    setShowSearchResults(searchQuery.trim().length >= 2 && hasSearchResults);
  }, [searchQuery, hasSearchResults]);

  const handleSearchItemClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.calculators.length > 0) handleSearchItemClick(searchResults.calculators[0].path);
    else if (searchResults.tools.length > 0) handleSearchItemClick(searchResults.tools[0].path);
    else if (searchResults.blog.length > 0) handleSearchItemClick(searchResults.blog[0].path);
    else if (searchResults.news.length > 0) handleSearchItemClick(searchResults.news[0].path);
  };

  const filteredCategories = useMemo(() => {
    if (!selectedCategory) return calculatorCategories;
    return calculatorCategories.filter((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <SEOHelmet
        title="MoneyCal.in – Free Tax, Gold, GST & Finance Calculators | 200+ Tools India"
        description="India's #1 financial tools hub. Free EMI, SIP, Income Tax, GST, Gold, PPF, FD calculators. Tax tools, loan tools, festival tools. Easy to find any calculator – user & Google friendly."
        keywords="tax calculator, gold calculator, GST calculator, EMI calculator, SIP calculator, income tax India, finance tools, loan calculator, PPF, FD, money control alternative"
        canonicalUrl="https://moneycal.in"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
        {/* Hero – Gen-Z style */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pt-20 pb-12 md:pb-16">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              {totalCalculators}+ free tools • Tax, Gold, GST, Loans & more
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
            >
              Find any financial tool
              <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">in one search</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto"
            >
              Calculators, tax tools, gold, GST, loans, insurance – everything for India. Fast, free, SEO-friendly.
            </motion.p>

            {/* Global search – results appear ABOVE input for clear view */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-2xl mx-auto relative flex flex-col"
            >
              {/* Results panel – above the input */}
              <AnimatePresence>
                {showSearchResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 w-full bottom-full left-0 right-0 mb-2 rounded-2xl bg-white/95 backdrop-blur-xl text-left shadow-2xl shadow-black/25 border border-white/50 max-h-[65vh] overflow-hidden flex flex-col"
                  >
                    <div className="p-3 border-b border-slate-200/80 bg-slate-50/80">
                      <span className="text-sm font-bold text-slate-700">Results for &quot;{searchQuery}&quot;</span>
                    </div>
                    <div className="overflow-y-auto p-3 space-y-4">
                      {searchResults.calculators.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                            <Calculator className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Calculators</span>
                          </div>
                          {searchResults.calculators.map((r, i) => (
                            <button key={i} onClick={() => handleSearchItemClick(r.path)} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-transparent flex items-center justify-between group transition-all">
                              <span className="font-medium text-slate-900 group-hover:text-blue-700 truncate">{r.name}</span>
                              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      )}
                      {searchResults.tools.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                            <Wrench className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Tools</span>
                          </div>
                          {searchResults.tools.map((r, i) => (
                            <button key={i} onClick={() => handleSearchItemClick(r.path)} className="w-full text-left px-4 py-3 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 border border-transparent flex items-center justify-between group transition-all">
                              <span className="font-medium text-slate-900 group-hover:text-emerald-700 truncate">{r.name}</span>
                              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      )}
                      {searchResults.pages.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                            <FolderOpen className="w-4 h-4 text-violet-600" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Pages</span>
                          </div>
                          {searchResults.pages.map((r, i) => (
                            <button key={i} onClick={() => handleSearchItemClick(r.path)} className="w-full text-left px-4 py-3 rounded-xl hover:bg-violet-50 hover:border-violet-200 border border-transparent flex items-center justify-between group transition-all">
                              <span className="font-medium text-slate-900 group-hover:text-violet-700 truncate">{r.name}</span>
                              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      )}
                      {searchResults.blog.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                            <FileText className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Blog</span>
                          </div>
                          {searchResults.blog.map((b, i) => (
                            <button key={i} onClick={() => handleSearchItemClick(b.path)} className="w-full text-left px-4 py-3 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-transparent flex items-center justify-between group transition-all">
                              <span className="font-medium text-slate-900 group-hover:text-amber-700 line-clamp-1 pr-2">{b.name}</span>
                              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      )}
                      {searchResults.news.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                            <Newspaper className="w-4 h-4 text-rose-600" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">News</span>
                          </div>
                          {searchResults.news.map((n, i) => (
                            <button key={i} onClick={() => handleSearchItemClick(n.path)} className="w-full text-left px-4 py-3 rounded-xl hover:bg-rose-50 hover:border-rose-200 border border-transparent flex items-center justify-between group transition-all">
                              <span className="font-medium text-slate-900 group-hover:text-rose-700 line-clamp-1 pr-2">{n.name}</span>
                              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 flex-shrink-0" />
                            </button>
                          ))}
                        </div>
                      )}
                      {!hasSearchResults && searchQuery.trim().length >= 2 && (
                        <div className="px-4 py-8 text-center">
                          <p className="text-slate-500 font-medium">No results for &quot;{searchQuery}&quot;</p>
                          <p className="text-sm text-slate-400 mt-1">Try &quot;EMI&quot;, &quot;tax&quot;, &quot;gold&quot;, or &quot;GST&quot;</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search input – below results */}
                <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                  type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                  placeholder="Search calculators, tax, gold, GST, blog, news..."
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 border-0 shadow-xl shadow-black/20 focus:ring-2 focus:ring-amber-400 outline-none"
                  aria-label="Search all tools and content"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
            </motion.form>
          </div>
        </section>

        {/* Quick nav – internal linking + Money Shorts tab */}
        <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                to="/news/shorts"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-400/40 transition-all"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Money Shorts
              </Link>
              {QUICK_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Money Shorts – Inshorts-style section: click to open & scroll */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/30 py-10 md:py-14">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-80" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="inline-block text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">News in 60 seconds</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Money Shorts
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl">
                Swipe through finance news like Inshorts. One card per story — markets, RBI, economy. Scroll or tap to go to the next.
              </p>
            </div>
                <Link 
              to="/news/shorts"
              className="group flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-500 text-slate-900 font-bold text-lg shadow-xl shadow-amber-500/40 hover:bg-amber-400 hover:shadow-amber-400/50 transition-all"
                >
              <span className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7" fill="currentColor" />
              </span>
              Open &amp; scroll
                </Link>
              </div>
        </section>

        {/* About MoneyCal – substantial visible text for SEO & AdSense */}
        <section className="py-10 bg-white border-b border-slate-100" aria-labelledby="about-moneycal-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="about-moneycal-heading" className="text-2xl font-bold text-slate-900 mb-4">
              About MoneyCal.in – Free Financial Calculators &amp; Tools for India
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
              <p>
                MoneyCal is India&apos;s free hub for financial calculators and tools. Whether you need to plan a home loan EMI, compare SIP returns, estimate income tax under the new slabs, or calculate GST on an invoice, you can do it here without sign-up or fees. Every calculator and tool is built for Indian users: amounts in rupees (₹), current tax rules, and local regulations.
              </p>
              <p>
                We offer 200+ tools across tax, gold, GST, loans, insurance, banking, and investments. Our <strong>Blog</strong> and <strong>Learn</strong> sections publish original articles and guides—from understanding TDS and capital gains to choosing term insurance or PPF. <strong>News</strong> and <strong>Money Shorts</strong> keep you updated on markets, RBI, and economy in a quick, readable format. We do not give personalised investment or tax advice; we help you with numbers and clarity so you can decide with your advisor.
              </p>
              <p>
                MoneyCal is free to use, does not store your data in calculations, and is designed to work on mobile and desktop. Use the search bar above to find any calculator or article, or browse by category: Tax Tools, Gold Tools, GST Tools, Loan Tools, and more. For policy and transparency, see our <Link to="/about" className="text-blue-600 hover:underline font-medium">About Us</Link>, <Link to="/contact" className="text-blue-600 hover:underline font-medium">Contact</Link>, <Link to="/privacy-policy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>, and <Link to="/disclaimer" className="text-blue-600 hover:underline font-medium">Disclaimer</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Explore by category – Tax, Gold, GST, etc. */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-blue-600" />
              Explore by category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {TOOL_HUB_LINKS.map((tool) => {
                const Icon = tool.icon;
                  return (
                    <Link
                    key={tool.path}
                    to={tool.path}
                    className="group relative p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${tool.color} bg-opacity-10`} />
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-700">{tool.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{tool.keywords}</p>
                    </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

        {/* Tabs: Calculators | Tools | Resources */}
        <section className="bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 py-4 overflow-x-auto">
              {(['calculators', 'tools', 'resources'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                    activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab === 'calculators' && <><Calculator className="w-4 h-4 inline mr-2" />Calculators ({totalCalculators}+)</>}
                  {tab === 'tools' && <><Wrench className="w-4 h-4 inline mr-2" />Tools</>}
                  {tab === 'resources' && <><FolderOpen className="w-4 h-4 inline mr-2" />Resources</>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {activeTab === 'calculators' && (
          <>
            <section className="py-8 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Popular calculators</h2>
                  <Link to="/calculators" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {popularCalculators.map((c) => (
                    <Link key={c.id} to={c.path} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center group">
                      <Calculator className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-2">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
            <section className="py-4 bg-slate-50/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>All</button>
                  {calculatorCategories.map((cat) => {
                    const Icon = categoryIcons[cat.name] || Calculator;
                    return (
                      <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1.5 ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
                        <Icon className="w-3.5 h-3.5" />{cat.name.split(' ')[0]} ({cat.calculators.length})
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
            <section className="py-8 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredCategories.map((cat) => {
                  const Icon = categoryIcons[cat.name] || Calculator;
                  return (
                    <div key={cat.id} className="mb-10">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        {cat.name}
                        <span className="text-slate-500 font-normal">({cat.calculators.length})</span>
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {cat.calculators.map((calc) => (
                          <Link key={calc.id} to={`/calculators/${calc.id}`} className="p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
                            <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 line-clamp-2">{calc.name}</h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{calc.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {activeTab === 'tools' && (
          <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">All tool hubs</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {TOOL_HUB_LINKS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.path} to={tool.path} className="p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex items-center gap-4 group">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600">{tool.name}</h3>
                        <p className="text-xs text-slate-500">{tool.keywords}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 ml-auto" />
                    </Link>
                  );
                })}
              </div>
              <p className="mt-6 text-slate-600 text-sm">
                <strong>Internal linking:</strong> Use the search bar above to find tax, gold, GST, loan, or any tool. Every tool is linked from the <Link to="/tools" className="text-blue-600 hover:underline">Tools Hub</Link> and category pages for easy discovery and SEO.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'resources' && (
          <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Discover more</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Learn Finance', path: '/learn', icon: BookOpen, desc: 'Loans, credit, investment guides' },
                  { name: 'Blog', path: '/blog', icon: FileText, desc: 'Articles & tips' },
                  { name: 'News', path: '/news', icon: Newspaper, desc: 'Market & business news' },
                  { name: 'Govt Schemes', path: '/government-schemes', icon: Gift, desc: 'Subsidies & schemes' },
                  { name: 'Crypto', path: '/crypto', icon: Coins, desc: 'Crypto guides' },
                  { name: 'Astro Finance', path: '/astro-finance', icon: Sparkles, desc: 'Horoscope & finance' },
                ].map((r) => {
                  const Icon = r.icon;
                  return (
                    <Link key={r.path} to={r.path} className="p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                      <Icon className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600">{r.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{r.desc}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Why MoneyCal – trust & SEO */}
        <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50/30 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why users & Google love MoneyCal</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, title: '100% Free', desc: 'All tools free forever' },
                { icon: Shield, title: 'Secure', desc: 'No data stored' },
                { icon: Award, title: 'SEO friendly', desc: 'Easy to find any tool' },
                { icon: Zap, title: 'Fast', desc: 'Lightning-fast search' },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="text-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-bold text-slate-900">{f.title}</h3>
                    <p className="text-sm text-slate-600">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeInvestopedia;
