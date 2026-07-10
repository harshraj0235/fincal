import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Grid,
  List,
  Flame,
  Newspaper,
  FolderOpen,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Briefcase,
  Coins,
  Home,
  Bitcoin,
  Heart,
  FileText,
  Smartphone,
  Filter
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { loadAllBlogData } from '../data/lazyBlogData';
import { contentRegistry } from '../cms-content/contentRegistry';

const LATEST_NEWS_COUNT = 4;

const getCategoryIcon = (category: string) => {
  const normCat = category.toLowerCase();
  if (normCat.includes('tax')) return <Landmark className="w-5 h-5" />;
  if (normCat.includes('insur')) return <ShieldCheck className="w-5 h-5" />;
  if (normCat.includes('invest') || normCat.includes('stock') || normCat.includes('market')) return <TrendingUp className="w-5 h-5" />;
  if (normCat.includes('finance') || normCat.includes('money')) return <Coins className="w-5 h-5" />;
  if (normCat.includes('bank') || normCat.includes('credit')) return <Briefcase className="w-5 h-5" />;
  if (normCat.includes('real estate') || normCat.includes('home')) return <Home className="w-5 h-5" />;
  if (normCat.includes('crypto') || normCat.includes('bitcoin')) return <Bitcoin className="w-5 h-5" />;
  if (normCat.includes('health')) return <Heart className="w-5 h-5" />;
  if (normCat.includes('tech') || normCat.includes('app') || normCat.includes('mobile')) return <Smartphone className="w-5 h-5" />;
  return <FileText className="w-5 h-5" />;
};


export const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || '';
  const queryFromUrl = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [allBlogPosts, setAllBlogPosts] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const postsPerPage = 12;
  const reviewedDate = '2026-02-10';
  const categoryLabel = selectedCategory === 'all' ? 'financial' : selectedCategory.toLowerCase();
  const faqItems = [
    {
      question: selectedCategory === 'all' ? 'What is MoneyCal Blog?' : `What will I find in ${selectedCategory} articles?`,
      answer: selectedCategory === 'all'
        ? 'MoneyCal Blog is India\'s comprehensive personal finance knowledge hub covering investments, tax planning, loans, insurance, banking, and wealth creation strategies for every Indian.'
        : `Our ${categoryLabel} section features in-depth guides, expert analysis, comparison articles, and actionable tips tailored specifically for Indian readers.`
    },
    {
      question: 'How often are new articles published?',
      answer: 'We publish 5-10 new articles every week covering the latest changes in tax laws, investment strategies, loan comparisons, and market trends relevant to Indian consumers.'
    },
    {
      question: 'Are the articles written by finance experts?',
      answer: 'Yes. Our articles are researched and written by certified financial planners and reviewed by the MoneyCal editorial team to ensure accuracy, especially for YMYL (Your Money Your Life) topics.'
    },
    {
      question: 'Can I use MoneyCal calculators alongside blog articles?',
      answer: 'Absolutely! Each article links to relevant MoneyCal calculators (EMI, SIP, Tax, etc.) so you can immediately apply what you learn with real numbers.'
    },
    {
      question: 'How is MoneyCal Blog different from other finance blogs?',
      answer: 'We combine expert-written guides with 200+ interactive calculators. Instead of just reading about EMI or SIP, you can calculate instantly. Plus, all our content is India-specific with latest FY 2026-27 data.'
    },
    {
      question: 'Is the blog content free to read?',
      answer: 'Yes, all MoneyCal blog articles are completely free with no paywall. We believe financial literacy should be accessible to everyone in India.'
    }
  ];

  // Sync URL to state
  useEffect(() => {
    if (categoryFromUrl && allBlogPosts.length) {
      const cats = Array.from(new Set(allBlogPosts.flatMap(post => post.categories || [])));
      if (cats.includes(categoryFromUrl)) setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, allBlogPosts.length]);
  useEffect(() => {
    setSearchTerm(queryFromUrl);
  }, [queryFromUrl]);
  // Lazy load blog data — isLoading only cleared in finally, never by a timer
  useEffect(() => {
    let isActive = true;
    const loadPosts = async () => {
      try {
        const posts = await loadAllBlogData();
        if (isActive && Array.isArray(posts) && posts.length > 0) {
          setAllBlogPosts(posts.filter(Boolean));
          setIsLoading(false);
          return;
        }
        // Fallback: try loading the two largest files individually
        const [m0, m1] = await Promise.allSettled([
          import('../data/blogData'),
          import('../data/blogData1'),
        ]);
        const fallback: any[] = [
          ...(m0.status === 'fulfilled' ? (m0.value.blogPosts || []) : []),
          ...(m1.status === 'fulfilled' ? (m1.value.blogPosts || []) : []),
        ].filter(Boolean);
        if (isActive) setAllBlogPosts(fallback.length > 0 ? fallback : []);
      } catch (err) {
        console.error('Blog load error:', err);
        if (isActive) setAllBlogPosts([]);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };
    loadPosts();
    return () => { isActive = false; };
  }, []);

  const categoryList = useMemo(() => {
    const countMap: Record<string, number> = {};
    allBlogPosts.forEach(post => {
      (post.categories || []).forEach((cat: string) => {
        countMap[cat] = (countMap[cat] || 0) + 1;
      });
    });
    return Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [allBlogPosts]);

  // Latest news for internal linking (blog ↔ news)
  const latestNews = useMemo(() =>
    [...contentRegistry]
      .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
      .slice(0, LATEST_NEWS_COUNT),
    []
  );

  // Filter and sort posts
  const filteredPosts = allBlogPosts
    .filter(post => {
      const normalizedSearch = searchTerm.toLowerCase();
      const matchesSearch = (post.title || '').toLowerCase().includes(normalizedSearch) ||
        (post.excerpt || '').toLowerCase().includes(normalizedSearch) ||
        (post.categories || []).some((cat: string) => cat.toLowerCase().includes(normalizedSearch));
      const matchesCategory = selectedCategory === 'all' || post.categories?.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return ((b as any).readingTime || 0) - ((a as any).readingTime || 0);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = showAll ? filteredPosts : filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Keep URL in sync for shareable links and crawlers (no extra history entry)
  useEffect(() => {
    const next = new URLSearchParams();
    if (searchTerm.trim()) next.set('q', searchTerm.trim());
    if (selectedCategory !== 'all') next.set('category', selectedCategory);
    const nextStr = next.toString();
    const currentStr = searchParams.toString();
    if (nextStr !== currentStr) setSearchParams(next, { replace: true });
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>

      <SEOHelmet
        title={selectedCategory !== 'all' ? `${selectedCategory} Articles - Expert Insights & Tips | MoneyCal.in` : "MoneyCal Blog - Financial Guides, Taxes, Investing & Banking | MoneyCal.in"}
        description={selectedCategory !== 'all' ? `Explore expert ${selectedCategory.toLowerCase()} articles, guides, and insights for Indian users. Get practical advice and strategies for better financial decisions.` : "Read expert financial guides, investing tips, tax updates, and money management insights tailored for India."}
        keywords={selectedCategory !== 'all' ? `${selectedCategory.toLowerCase()} articles, ${selectedCategory.toLowerCase()} tips, ${selectedCategory.toLowerCase()} advice, financial blog` : "financial blog, investment tips, tax advice, money management, india finance"}
        url={selectedCategory !== 'all' ? `/blog?category=${selectedCategory}` : "/blog"}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": selectedCategory !== 'all' ? `${selectedCategory} Blog - MoneyCal India` : "MoneyCal India Financial Blog",
          "description": selectedCategory !== 'all' ? `Expert ${selectedCategory.toLowerCase()} articles and insights for Indian users` : "Comprehensive financial blog covering investments, taxes, banking, and more",
          "url": `/blog${selectedCategory !== 'all' ? '?category=' + selectedCategory : ''}`,
          "publisher": {
            "@type": "Organization",
            "name": "MoneyCal India",
            "url": "https://moneycal.in"
          },
          "blogPost": currentPosts.slice(0, 5).map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt || (post as any).description || (post as any).metaDescription || (post.content && post.content.find((c: any) => c.type === 'paragraph')?.content) || post.title,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": "Harsh Raj"
            }
          }))
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          ...(selectedCategory !== 'all' ? [{ name: selectedCategory, url: `/blog?category=${encodeURIComponent(selectedCategory)}` }] : [])
        ]}
        faqData={faqItems}
        tags={selectedCategory !== 'all' ? [`${selectedCategory.toLowerCase()} articles`, `${selectedCategory.toLowerCase()} tips`, "india finance"] : ["financial blog", "investment tips", "tax advice", "money management", "india finance"]}
      />

      <main role="main" className="min-h-screen bg-white pt-20" id="blog-list-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb - SEO & navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link></li>
              <li aria-hidden="true"> &gt; </li>
              <li className={selectedCategory === 'all' ? 'text-gray-900 font-medium' : ''} aria-current={selectedCategory === 'all' ? 'page' : undefined}>
                {selectedCategory === 'all' ? 'Blog' : <Link to="/blog" reloadDocument className="hover:text-emerald-600 transition-colors">Blog</Link>}
              </li>
              {selectedCategory !== 'all' && (
                <>
                  <li aria-hidden="true"> &gt; </li>
                  <li className="text-gray-900 font-medium" aria-current="page">{selectedCategory}</li>
                </>
              )}
            </ol>
          </nav>

          {/* Aesthetic Hero + Prominent Search */}
          <div className="relative py-16 sm:py-24 mb-12 rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
            {/* Background subtle elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs sm:text-sm font-bold mb-6">
                <Flame className="w-4 h-4 mr-2 text-blue-600" />
                EXPERT FINANCIAL GUIDES
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                Master Your <span className="text-blue-600">Money</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-4 leading-relaxed font-medium">
                Expert guides on investing, taxes, loans, insurance, and personal finance — written for India, backed by 200+ free calculators.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <Link to="/calculators/emi-calculator" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all">EMI Calculator</Link>
                <Link to="/calculators/sip-calculator" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all">SIP Calculator</Link>
                <Link to="/calculators/income-tax-calculator" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all">Tax Calculator</Link>
                <Link to="/calculators/gst-calculator" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-all">GST Calculator</Link>
              </div>

              {/* Prominent Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative flex items-center bg-white border border-gray-200 shadow-xl shadow-gray-200/50 rounded-2xl p-2 transition-all duration-300 focus-within:border-blue-300">
                  <div className="pl-4 pr-3 text-gray-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <input
                    id="blog-search"
                    type="search"
                    placeholder="Search by topic, keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 text-base sm:text-lg py-3 outline-none"
                    autoComplete="off"
                    aria-label="Search blog articles"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 hidden sm:block whitespace-nowrap">
                    Search
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Aesthetic Category Pills (Horizontal Scroll on Mobile) */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mb-10 sm:mb-14"
            aria-label="Explore by topic"
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FolderOpen className="w-6 h-6 text-indigo-600" />
                Explore Topics
              </h2>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-full"
                >
                  View All
                </button>
              )}
            </div>

            <div className="relative">
              {/* Horizontal scrollable container */}
              <div className="flex overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 sm:gap-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`snap-start group flex-shrink-0 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 ${selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105 border border-transparent z-10'
                    : 'bg-white text-gray-700 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'
                    }`}
                >
                  <Grid className={`w-5 h-5 ${selectedCategory === 'all' ? 'text-white' : 'text-blue-600'}`} />
                  All Topics
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {allBlogPosts.length}
                  </span>
                </button>

                {categoryList.map(({ name, count }) => {
                  const isSelected = selectedCategory === name;
                  return (
                    <button
                      key={name}
                      onClick={() => setSelectedCategory(name)}
                      className={`snap-start group flex-shrink-0 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 ${isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105 border border-transparent z-10'
                        : 'bg-white text-gray-700 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'
                        }`}
                    >
                      <span className={`p-1.5 rounded-xl transition-colors ${isSelected ? 'bg-white/20' : 'bg-blue-50 group-hover:bg-blue-100 text-blue-600'}`}>
                        {getCategoryIcon(name)}
                      </span>
                      {name}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.section>

          {/* Category-Specific Content Section */}
          {selectedCategory !== 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-600 rounded-3xl p-10 mb-12 text-white shadow-xl shadow-blue-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4">{selectedCategory} Guides</h2>
                <p className="text-lg opacity-90 mb-6 max-w-3xl leading-relaxed font-medium">
                  {selectedCategory === 'Finance' && 'Discover comprehensive guides on personal finance, budgeting, savings strategies, and financial planning for Indians. Learn how to manage your money effectively, build wealth, and achieve financial independence.'}
                  {selectedCategory === 'Investment' && 'Explore investment opportunities in India including mutual funds, stocks, bonds, real estate, and alternative investments. Get expert insights on portfolio diversification, risk management, and long-term wealth creation strategies.'}
                  {selectedCategory === 'Tax' && 'Comprehensive Tax Guide 2025: Explore 61+ detailed articles and expert guides covering Income Tax slabs, 80C deductions, ITR filing, GST 2.0, Capital Gains, and smart tax planning strategies for Indians to minimize liability legally.'}
                  {selectedCategory === 'Insurance' && 'Understand different types of insurance products including life insurance, health insurance, motor insurance, and property insurance. Learn how to choose the right coverage, compare policies, and protect your family\'s financial future.'}
                  {selectedCategory === 'Banking' && 'Everything you need to know about banking in India - from opening accounts to digital banking services, loan products, credit cards, and managing your finances with modern banking tools and apps.'}
                  {selectedCategory === 'Crypto' && 'Navigate the world of cryptocurrency and blockchain technology. Learn about Bitcoin, Ethereum, altcoins, crypto trading strategies, regulations in India, and how to invest safely in digital assets.'}
                  {selectedCategory === 'Real Estate' && 'Get insights into the Indian real estate market, property investment strategies, home loans, legal aspects of property buying, and tips for first-time homebuyers and real estate investors.'}
                  {(!['Finance', 'Investment', 'Tax', 'Insurance', 'Banking', 'Crypto', 'Real Estate'].includes(selectedCategory)) && `Explore our curated collection of ${selectedCategory} articles featuring expert analysis, practical tips, and actionable insights to help you make informed financial decisions.`}
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-sm font-bold">{filteredPosts.length} Articles</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    <span className="text-sm font-bold">Expert Context</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Featured / Latest strip - when viewing all, no search */}
          {selectedCategory === 'all' && !searchTerm && filteredPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
              aria-label="Latest articles"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Latest articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(0, 6).map((post, idx) => (
                  <article
                    key={post.id}
                    className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-emerald-200 transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden flex-shrink-0">
                      <img
                        src={post.coverImage || (post as any).featuredImage || 'https://via.placeholder.com/400x250'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        fetchPriority={idx < 2 ? 'high' : 'auto'}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          {post.categories?.[0] || 'Finance'}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 line-clamp-2 text-base mb-1 group-hover:text-emerald-700 transition-colors">
                        <Link to={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-1">{post.excerpt || (post as any).description || (post as any).metaDescription || (post.content && post.content.find((c: any) => c.type === 'paragraph')?.content) || ''}</p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm group-hover:gap-2 transition-all"
                      >
                        Read article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>
          )}

          {/* Filters toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-6"
          >
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto ml-auto">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                <Filter className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 p-0 text-gray-900 font-bold cursor-pointer outline-none"
                  aria-label="Sort order"
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Most read</option>
                </select>
              </div>
              <div className="flex bg-gray-100/80 rounded-xl p-1 shadow-inner" role="group" aria-label="View mode">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 sm:p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </motion.div>


          {/* Results Count - clear for users and crawlers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-2 mb-6"
          >
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && (
                <span> in <span className="font-medium">{selectedCategory}</span></span>
              )}
            </p>
            {searchTerm && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Search results for:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  "{searchTerm}"
                </span>
              </div>
            )}
          </motion.div>

          {/* Blog Posts Grid/List */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`${viewMode}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
                }
              >
                {currentPosts.map((post, index) => (
                  <motion.article
                    key={post?.id || `post-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 12) * 0.05 }}
                    className={`group bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'
                      }`}
                  >
                    <div className={`relative overflow-hidden flex-shrink-0 bg-gray-50 ${viewMode === 'list' ? 'md:w-2/5 md:max-w-xs' : 'aspect-[16/10]'}`}>
                      <img
                        src={post?.coverImage || (post as any)?.featuredImage || 'https://via.placeholder.com/600x400'}
                        alt={post?.title || 'Blog Post'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading={index < 3 ? "eager" : "lazy"}
                        fetchPriority={index < 3 ? "high" : "auto"}
                        decoding="async"
                      />
                      <Link to={`/blog/${post?.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post?.title}`}></Link>
                    </div>

                    <div className={`p-6 sm:p-7 flex flex-col flex-1 min-w-0 ${viewMode === 'list' ? 'md:w-3/5' : ''}`}>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                          {post?.categories?.[0] || 'Finance'}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          {(post as any)?.readingTime || 5} MIN READ
                        </span>
                      </div>
                      <h2 className="font-black text-gray-900 line-clamp-2 text-xl sm:text-2xl mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        <Link to={`/blog/${post?.slug}`} className="focus:outline-none rounded">
                          {post?.title}
                        </Link>
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base line-clamp-3 mb-6 flex-1 leading-relaxed font-medium">
                        {post?.excerpt || (post as any)?.description || (post as any)?.metaDescription || ''}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-50">
                        <span className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {post?.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : 'RECENTLY'}
                        </span>
                        <Link
                          to={`/blog/${post?.slug}`}
                          className="text-blue-600 font-black text-sm flex items-center gap-2 group/btn"
                        >
                          READ ARTICLE
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Internal link: Latest from News - moved to bottom to emphasize blog content */}
          {latestNews.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-12 mb-4 p-6 rounded-2xl bg-slate-100/80 border border-slate-200 shadow-sm"
              aria-label="Latest from News"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-600" />
                Latest from News
              </h2>
              <p className="text-sm text-gray-600 mb-6">Market updates and business headlines</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestNews.map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.category}/${news.slug}`}
                    className="group flex gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200">
                      <img src={news.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{news.category}</span>
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mt-0.5">{news.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link to="/news" reloadDocument className="text-sm font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 hover:border-blue-300 transition-all">
                  View all news
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.section>
          )}

          {/* Pagination & Show All */}
          <div className="flex flex-col items-center gap-6 mt-12 mb-8">
            <button
              onClick={() => {
                setShowAll(!showAll);
                setCurrentPage(1);
              }}
              className="px-6 py-2.5 rounded-xl font-bold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all shadow-sm flex items-center gap-2"
            >
              <Grid className="w-4 h-4 text-blue-600" />
              {showAll ? 'Show Paginated' : `Show All ${filteredPosts.length} Articles`}
            </button>
          </div>

          {/* Pagination */}
          {!showAll && totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-2 mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;
                const isNearActive = Math.abs(page - currentPage) <= 2;

                if (isActive || isNearActive || page === 1 || page === totalPages) {
                  return (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg border border-white/20'
                        }`}
                    >
                      {page}
                    </motion.button>
                  );
                } else if (page === currentPage - 3 || page === currentPage + 3) {
                  return <span key={page} className="px-2 text-gray-500">...</span>;
                }
                return null;
              })}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* No Results */}
          {!isLoading && currentPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('latest');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* SEO Content Block — Blog bottom */}
          <div className="bg-white border border-gray-100 rounded-2xl p-8 mt-12">
            <h2 className="text-xl font-black text-gray-900 mb-4">Personal Finance Blog for India — Expert Guides & Tips</h2>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              <p>
                The MoneyCal Blog is your go-to resource for <strong>personal finance education in India</strong>. Whether you're a first-time investor exploring <Link to="/calculators/sip-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">SIP mutual funds</Link>, a homebuyer comparing <Link to="/calculators/home-loan-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">home loan EMIs</Link>, or a salaried professional looking to save tax under <Link to="/calculators/section-80c-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">Section 80C</Link> and <Link to="/calculators/section-80d-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">Section 80D</Link>, our articles provide actionable, India-specific advice.
              </p>
              <p>
                Every guide is paired with the relevant MoneyCal calculator so you can apply concepts instantly. Read about <Link to="/calculators/income-tax-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">Old vs New Tax Regime</Link> and then calculate your exact savings. Learn about <Link to="/calculators/ppf-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">PPF returns</Link> and project your maturity amount. Explore <Link to="/calculators/fd-calculator" className="text-blue-600 hover:text-blue-800 font-semibold">FD interest rates</Link> across SBI, HDFC, and ICICI — all for free, with no login required.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/learn" className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">Learn Finance →</Link>
              <Link to="/news" reloadDocument className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">Market News →</Link>
              <Link to="/calculators" className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">All Calculators →</Link>
            </div>
          </div>

          <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-sm p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faqItems.map(item => (
                <div key={item.question} className="border border-gray-200 rounded-xl p-4 bg-white hover:border-blue-200 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-sm p-6 mt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Editorial Desk</h2>
            <p className="text-sm text-gray-600">
              Blog guides are researched and reviewed by the MoneyCal editorial team. Last reviewed: {reviewedDate}.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link to="/editorial-policy" className="text-blue-700 underline">Editorial policy</Link>
              <Link to="/about-us" className="text-blue-700 underline">About MoneyCal</Link>
              <Link to="/contact-us" className="text-blue-700 underline">Contact</Link>
            </div>
          </div>
        </div>
      </main >
    </>
  );
};

export default Blog;
