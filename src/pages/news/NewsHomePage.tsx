import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ArrowRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Search,
  Clock,
  User,
  ChevronDown,
  Filter,
  Sparkles,
  Zap
} from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';
import NewsCategoryCard from '../../components/NewsCategoryCard';
import { formatStaticDate, formatStaticShortDate } from '../../utils/randomCalculators';

const ARTICLES_PER_PAGE = 12;
const TRENDING_COUNT = 6;

// Precompute how many articles exist per category
const categoryCounts: Record<string, number> = contentRegistry.reduce(
  (acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

const NewsHomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (categoryFromUrl && newsCategories.some(c => c.slug === categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
      setCurrentPage(1);
    } else if (!categoryFromUrl) {
      setSelectedCategory('all');
    }
  }, [categoryFromUrl]);

  const sortedAllArticles = useMemo(() =>
    [...contentRegistry].sort((a, b) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
    ), []);

  const filteredArticles = useMemo(() => {
    let filtered = selectedCategory === 'all'
      ? sortedAllArticles
      : sortedAllArticles.filter(article => article.category === selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [selectedCategory, sortedAllArticles, searchQuery]);

  const trendingArticles = useMemo(() => sortedAllArticles.slice(1, TRENDING_COUNT + 1), [sortedAllArticles]);
  const featuredArticle = sortedAllArticles[0];

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'all') newParams.delete('category');
    else newParams.set('category', category);
    setSearchParams(newParams, { replace: true });
  };

  const faqItems = [
    {
      question: 'What is MoneyCal News?',
      answer: 'MoneyCal News is India\'s curated financial news hub covering stock market updates, IPO analysis, RBI policy changes, mutual fund trends, business news, and economic analysis — all data-driven and verified.'
    },
    {
      question: 'How often is news updated?',
      answer: 'Our newsroom publishes daily updates with breaking market news, IPO reviews, quarterly earnings analysis, and weekly deep-dive reports on Indian economic trends.'
    },
    {
      question: 'Can I trust MoneyCal News for investment decisions?',
      answer: 'Our articles follow a strict editorial policy focused on data-driven insights and verified sources. However, all content is for educational purposes — always consult a SEBI-registered advisor before making investment decisions.'
    },
    {
      question: 'What topics does MoneyCal News cover?',
      answer: 'We cover Indian stock markets (NSE/BSE), IPO tracking and analysis, RBI monetary policy, mutual fund NFOs, banking updates, startup funding, real estate trends, cryptocurrency regulations, and government budget analysis.'
    },
    {
      question: 'How is MoneyCal News different from other financial news sites?',
      answer: 'We combine news coverage with 200+ interactive calculators. Read about a new FD rate change and instantly calculate your returns. Learn about a tax policy update and compare old vs new regime — all in one platform.'
    },
    {
      question: 'Is MoneyCal News free to read?',
      answer: 'Yes, all MoneyCal News articles are completely free with no paywall or mandatory registration. We believe everyone deserves access to quality financial information.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 pb-20">
      <SEOHelmet
        title="MoneyCal News — Indian Market Updates, IPO News, Business Trends & Financial Analysis"
        description="Stay updated with MoneyCal News. Expert coverage on Indian stock markets, IPO updates, RBI policy, mutual fund trends, business news, and economic analysis. Free, accurate, data-driven."
        keywords="Indian market news, IPO updates India, stock market news today, RBI policy news, mutual fund news, business news India, financial news, economy news India"
        url="/news"
        faqData={faqItems}
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'News', url: '/news' }]}
        tags={['Indian market news', 'IPO updates', 'stock market', 'RBI policy', 'business news India']}
      />

      {/* Header Section */}
      <header className="relative bg-white border-b border-slate-200 pt-10 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4"
              >
                <Sparkles className="w-3 h-3" />
                Real-time Intelligence
              </motion.div>
              <h1 className="text-5xl lg:text-7xl news-serif font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                The Pulse of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Indian Finance</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Expert analysis, breaking market news, and actionable economic insights delivered with precision.
              </p>
            </div>

            <div className="w-full lg:w-96">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search market news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation - New Swipable Cards */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="flex overflow-x-auto pb-6 pt-2 gap-4 snap-x hide-scrollbar">
          <NewsCategoryCard
            slug="all"
            name="Top Stories"
            count={contentRegistry.length}
            isSelected={selectedCategory === 'all'}
          />
          {newsCategories.map((cat) => (
            <NewsCategoryCard
              key={cat.slug}
              slug={cat.slug}
              name={cat.name}
              icon={cat.icon}
              count={categoryCounts[cat.slug] ?? 0}
              isSelected={selectedCategory === cat.slug}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Bento Grid */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                Breaking Highlights
              </h2>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                Live Updates
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
              {/* Main Feature */}
              <div className="lg:col-span-8 h-full">
                <Link
                  to={`/news/${featuredArticle.category}/${featuredArticle.slug}`}
                  className="group relative flex flex-col h-full bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="relative mt-auto p-8 sm:p-12">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-6">
                      {newsCategories.find(c => c.slug === featuredArticle.category)?.name}
                    </span>
                    <h3 className="text-3xl sm:text-5xl news-serif font-black text-white leading-tight mb-6 group-hover:text-blue-400 transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <div className="flex items-center gap-6 text-slate-300 text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <User className="w-4 h-4" />
                        </div>
                        {teamProfiles.find(p => p.id === featuredArticle.authorId)?.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatStaticDate(featuredArticle.datePublished)}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Sidebar Trending */}
              <div className="lg:col-span-4 h-full hidden lg:block overflow-y-auto hide-scrollbar space-y-6">
                <div className="sticky top-0 bg-[#f8fafc] z-10 pb-4">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Trending Now</h3>
                </div>
                {trendingArticles.map((art) => (
                  <Link
                    key={art.id}
                    to={`/news/${art.category}/${art.slug}`}
                    className="flex gap-4 group p-2 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 rounded-2xl transition-all"
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-200">
                      <img src={art.image} alt="" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1.5">
                        {newsCategories.find(c => c.slug === art.category)?.name}
                      </span>
                      <h4 className="font-bold news-serif text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {art.title}
                      </h4>
                      <time className="text-[10px] text-slate-400 font-bold mt-2 uppercase">{formatStaticShortDate(art.datePublished)}</time>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest Stream */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {selectedCategory === 'all' ? 'Latest Stories' : `${newsCategories.find(c => c.slug === selectedCategory)?.name} Feed`}
              </h2>
              <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest flex items-center gap-2">
                <Filter className="w-3 h-3" />
                {filteredArticles.length} Analysis Available
              </p>
            </div>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => handleCategoryChange('all')}
                className="p-3 bg-white border border-slate-200 rounded-xl text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {paginatedArticles.map((article, index) => {
                const author = teamProfiles.find(p => p.id === article.authorId);
                const category = newsCategories.find(c => c.slug === article.category);

                return (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={`/news/${article.category}/${article.slug}`}
                      className="group flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[2rem]">
                        <img
                          src={article.image}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                            {category?.name}
                          </span>
                        </div>
                      </div>

                      <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            5 min read
                          </span>
                          <span>•</span>
                          <span>{formatStaticShortDate(article.datePublished)}</span>
                        </div>

                        <h3 className="text-xl news-serif font-bold text-slate-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                          {article.excerpt || "Expert analysis and critical updates regarding " + article.title.toLowerCase() + " in the Indian landscape."}
                        </p>

                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-700">{author?.name || 'Editorial'}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform shadow-lg">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No matching stories found</h3>
              <p className="text-slate-500 font-medium max-w-sm mx-auto mb-8">
                Try adjusting your search query or exploring a different category.
              </p>
              <button
                onClick={() => { setSearchQuery(''); handleCategoryChange('all'); }}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-colors active:scale-95"
              >
                Show all stories
              </button>
            </div>
          )}

          {/* Premium Pagination */}
          {totalPages > 1 && (
            <div className="mt-20 flex flex-col items-center gap-8">
              <div className="flex items-center gap-2 p-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-900 hover:bg-slate-50 disabled:opacity-30 transition-all font-black"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, i, arr) => (
                    <React.Fragment key={p}>
                      {i > 0 && p - arr[i - 1] > 1 && (
                        <span className="px-2 text-slate-300 font-bold">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(p)}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl text-sm font-black transition-all ${currentPage === p ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 flex items-center justify-center rounded-xl text-slate-900 hover:bg-slate-50 disabled:opacity-30 transition-all font-black"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Showing Page {currentPage} of {totalPages}
              </p>
            </div>
          )}
        </section>

        {/* Knowledge & Trust Section */}
        <section className="mt-32 space-y-8">
          {/* SEO Content Block */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-4">Indian Financial News & Market Analysis Hub</h2>
            <div className="text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                MoneyCal News delivers comprehensive coverage of India's financial landscape. From <strong>stock market movements on NSE and BSE</strong> to <strong>RBI monetary policy decisions</strong>, we provide the context and analysis you need to understand how economic events impact your money.
              </p>
              <p>
                Our coverage includes <Link to="/ipo" reloadDocument className="text-blue-600 hover:text-blue-800 font-semibold">IPO tracking and analysis</Link> with GMP estimates, <Link to="/calculators/mutual-fund-returns-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">mutual fund performance tracking</Link>, banking sector updates, and startup funding news. Pair our news with MoneyCal's <Link to="/calculators/sip-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">SIP Calculator</Link>, <Link to="/calculators/emi-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">EMI Calculator</Link>, and <Link to="/calculators/income-tax-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">Income Tax Calculator</Link> for a complete financial planning experience.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/blog" reloadDocument className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">Finance Blog →</Link>
              <Link to="/learn" className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">Learn Finance →</Link>
              <Link to="/calculators" className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">200+ Calculators →</Link>
              <Link to="/ipo" reloadDocument className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors">IPO Dashboard →</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                Editorial Desk
              </h2>
              <div className="space-y-6">
                <p className="text-slate-600 font-medium leading-relaxed">
                  MoneyCal articles are reviewed by our team of financial enthusiasts and experts to ensure clarity, accuracy, and depth.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                  <Link to="/editorial-policy" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors italic border-b border-transparent hover:border-blue-600">Editorial Policy</Link>
                  <Link to="/about-us" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors italic border-b border-transparent hover:border-blue-600">Our Experts</Link>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Clock className="h-5 w-5 text-indigo-400" />
                </div>
                Quick Intelligence
              </h2>
              <div className="space-y-4">
                {faqItems.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                    <h3 className="text-sm font-black text-indigo-300 uppercase tracking-widest mb-1">{item.question}</h3>
                    <p className="text-slate-400 text-sm font-medium">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewsHomePage;

