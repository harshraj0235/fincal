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
  Calculator,
  GraduationCap,
  TrendingUp,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { loadAllBlogData } from '../data/lazyBlogData';

const POSTS_PER_PAGE = 12;

const fadeInUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
const stagger = (i: number) => ({ delay: i * 0.05, duration: 0.35 });
const cardHover = { y: -6, transition: { duration: 0.2 } };
const tapScale = { scale: 0.98 };

export const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'popular'>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(isNaN(pageParam) || pageParam < 1 ? 1 : pageParam);
  const [isLoading, setIsLoading] = useState(true);
  const [allBlogPosts, setAllBlogPosts] = useState<any[]>([]);

  // Sync URL with state
  useEffect(() => {
    setSelectedCategory(categoryParam || 'all');
  }, [categoryParam]);

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(isNaN(page) || page < 1 ? 1 : page);
  }, [searchParams]);

  useEffect(() => {
    loadAllBlogData()
      .then((posts) => {
        setAllBlogPosts(posts || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const categoriesWithCount = useMemo(() => {
    const counts: Record<string, number> = { all: allBlogPosts.length };
    allBlogPosts.forEach((post) => {
      (post.categories || []).forEach((cat: string) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .filter(([k]) => k !== 'all')
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [allBlogPosts]);

  const filteredPosts = useMemo(() => {
    return allBlogPosts
      .filter((post) => {
        const matchesSearch =
          !searchTerm ||
          post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.categories || []).some((c: string) => c.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || (post.categories || []).includes(selectedCategory);
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
  }, [allBlogPosts, searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const currentPosts = useMemo(
    () => filteredPosts.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE),
    [filteredPosts, safePage]
  );

  const featuredPosts = useMemo(() => filteredPosts.slice(0, 3), [filteredPosts]);
  const recentPosts = useMemo(() => filteredPosts.slice(0, 5), [filteredPosts]);
  const newThisWeek = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    return filteredPosts.filter((p: any) => new Date(p.date) >= cutoff);
  }, [filteredPosts]);
  const suggestedByCategory = useMemo(() => {
    if (selectedCategory === 'all' || !selectedCategory) return [];
    return filteredPosts.slice(0, 4);
  }, [filteredPosts, selectedCategory]);

  const setCategory = (cat: string) => {
    setSelectedCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === 'all') next.delete('category');
    else next.set('category', cat);
    next.delete('page');
    setSearchParams(next);
  };

  const setPage = (p: number) => {
    setCurrentPage(p);
    const next = new URLSearchParams(searchParams);
    if (p <= 1) next.delete('page');
    else next.set('page', String(p));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Finance: 'bg-emerald-100 text-emerald-800',
      Investment: 'bg-blue-100 text-blue-800',
      Tax: 'bg-violet-100 text-violet-800',
      Insurance: 'bg-amber-100 text-amber-800',
      Banking: 'bg-indigo-100 text-indigo-800',
      Crypto: 'bg-yellow-100 text-yellow-800',
      'Real Estate': 'bg-rose-100 text-rose-800',
      Business: 'bg-pink-100 text-pink-800',
      Technology: 'bg-cyan-100 text-cyan-800',
      'Government Schemes': 'bg-teal-100 text-teal-800',
    };
    return colors[category] || 'bg-slate-100 text-slate-800';
  };

  const canonicalUrl =
    selectedCategory !== 'all'
      ? `https://moneycal.in/blog?category=${encodeURIComponent(selectedCategory)}${safePage > 1 ? `&page=${safePage}` : ''}`
      : safePage > 1
        ? `https://moneycal.in/blog?page=${safePage}`
        : 'https://moneycal.in/blog';

  const breadcrumbList = [
    { name: 'Home', url: 'https://moneycal.in/' },
    { name: 'Blog', url: 'https://moneycal.in/blog' },
    ...(selectedCategory !== 'all' ? [{ name: selectedCategory, url: `https://moneycal.in/blog?category=${encodeURIComponent(selectedCategory)}` }] : []),
  ];

  return (
    <>
      <SEOHelmet
        title={
          selectedCategory !== 'all'
            ? `${selectedCategory} Articles – Expert Tips & Guides | MoneyCal.in`
            : 'Financial Blog – Latest Articles, Tips & Insights | MoneyCal.in'
        }
        description={
          selectedCategory !== 'all'
            ? `Expert ${selectedCategory.toLowerCase()} articles, guides and insights for Indian users. Practical advice for better financial decisions.`
            : 'Latest financial news, investment tips, tax updates and expert insights. Stay informed and make better money decisions.'
        }
        keywords={
          selectedCategory !== 'all'
            ? `${selectedCategory.toLowerCase()} articles, ${selectedCategory.toLowerCase()} tips, financial blog`
            : 'financial blog, investment tips, tax advice, money management, personal finance India'
        }
        url={canonicalUrl.replace('https://moneycal.in', '')}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: selectedCategory !== 'all' ? `${selectedCategory} Blog – MoneyCal India` : 'MoneyCal India Financial Blog',
          description:
            selectedCategory !== 'all'
              ? `Expert ${selectedCategory.toLowerCase()} articles and insights for Indian users`
              : 'Financial blog covering investments, taxes, banking and more',
          url: canonicalUrl,
          publisher: { '@type': 'Organization', name: 'MoneyCal India', url: 'https://moneycal.in' },
          blogPost: currentPosts.slice(0, 10).map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { '@type': 'Person', name: post.author || 'MoneyCal Team' },
            url: `https://moneycal.in/blog/${post.slug}`,
          })),
        }}
        breadcrumbs={breadcrumbList.map((b) => ({ name: b.name, url: b.url }))}
        tags={selectedCategory !== 'all' ? [selectedCategory.toLowerCase(), 'financial blog'] : ['financial blog', 'investment tips', 'tax advice']}
      />

      {/* Skip to main content (a11y) */}
      <a href="#blog-main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
        Skip to main content
      </a>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumbs */}
          <motion.nav aria-label="Breadcrumb" className="mb-8" {...fadeInUp}>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4 inline text-slate-400" />
              </li>
              <li>
                {selectedCategory !== 'all' ? (
                  <>
                    <Link to="/blog" className="hover:text-blue-600 transition-colors duration-200">Blog</Link>
                    <span className="mx-2 text-slate-400">/</span>
                    <span className="text-slate-900 font-medium">{selectedCategory}</span>
                  </>
                ) : (
                  <span className="text-slate-900 font-medium">Blog</span>
                )}
              </li>
            </ol>
          </motion.nav>

          {/* Hero */}
          <motion.header
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-blue-700 text-sm font-medium mb-6 border border-blue-200/50"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              Latest financial insights
            </motion.span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-[1.1]">
              {selectedCategory !== 'all' ? `${selectedCategory} Articles` : 'Financial Blog'}
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {selectedCategory !== 'all'
                ? `Expert ${selectedCategory.toLowerCase()} guides and tips for Indian readers.`
                : 'Expert articles on investments, tax, banking and personal finance. Easy to read, easy to navigate.'}
            </p>
          </motion.header>

          {/* Browse by category */}
          <motion.section aria-label="Browse by category" className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }}>
            <h2 className="sr-only">Browse by category</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              <motion.button
                onClick={() => setCategory('all')}
                whileHover={{ scale: 1.02 }}
                whileTap={tapScale}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/80 hover:shadow-md'
                }`}
              >
                All ({allBlogPosts.length})
              </motion.button>
              {categoriesWithCount.slice(0, 14).map(({ name, count }, i) => (
                <motion.button
                  key={name}
                  onClick={() => setCategory(name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={tapScale}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={stagger(i)}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === name
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/80 hover:shadow-md'
                  }`}
                >
                  {name} ({count})
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Search & filters */}
          <motion.section
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-4 lg:p-6 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search blog articles"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest' | 'popular')}
                  aria-label="Sort articles"
                  className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="latest">Latest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="popular">Most popular</option>
                </select>
                <div className="flex bg-slate-100 rounded-lg p-0.5" role="group" aria-label="View mode">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                    aria-pressed={viewMode === 'grid'}
                    aria-label="Grid view"
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
                    aria-pressed={viewMode === 'list'}
                    aria-label="List view"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Recent posts */}
          {selectedCategory === 'all' && !searchTerm && recentPosts.length > 0 && (
            <motion.section className="mb-14" aria-label="Recent articles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-100">
                  <Clock className="w-5 h-5 text-blue-600" />
                </span>
                Recent posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {recentPosts.map((post: any, i: number) => (
                  <motion.article
                    key={post.id || post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.06, duration: 0.35 }}
                    whileHover={cardHover}
                    className="group bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/80 overflow-hidden hover:shadow-xl hover:shadow-slate-300/30 hover:border-slate-300 transition-all duration-300"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-video overflow-hidden bg-slate-100">
                        <img src={post.coverImage || post.featuredImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                        <p className="text-xs text-slate-500 mt-2">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          )}

          {/* New this week */}
          {selectedCategory === 'all' && !searchTerm && newThisWeek.length > 0 && (
            <motion.section className="mb-14" aria-label="New this week" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-orange-100">
                  <Flame className="w-5 h-5 text-orange-500" />
                </span>
                New this week
              </h2>
              <div className="flex flex-wrap gap-3">
                {newThisWeek.slice(0, 6).map((post: any, i: number) => (
                  <motion.div key={post.id || post.slug} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.05 }}>
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 text-orange-800 border border-orange-200/80 hover:from-orange-100 hover:to-amber-100 hover:shadow-md hover:border-orange-300 text-sm font-medium transition-all duration-300 group">
                      {post.title?.slice(0, 42)}{post.title?.length > 42 ? '…' : ''}
                      <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Suggested by category */}
          {selectedCategory !== 'all' && suggestedByCategory.length > 0 && (
            <motion.section className="mb-14" aria-label={`Suggested ${selectedCategory} articles`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Suggested in {selectedCategory}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {suggestedByCategory.map((post: any, i: number) => (
                  <motion.article
                    key={post.id || post.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.35 }}
                    whileHover={cardHover}
                    className="group bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-video overflow-hidden bg-slate-100">
                        <img src={post.coverImage || post.featuredImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400'} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                        <p className="text-xs text-slate-500 mt-2">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          )}

          {/* Featured */}
          {selectedCategory === 'all' && !searchTerm && featuredPosts.length >= 3 && (
            <motion.section className="mb-14" aria-label="Featured articles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-violet-100">
                  <TrendingUp className="w-5 h-5 text-violet-600" />
                </span>
                Featured articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPosts.map((post: any, idx: number) => (
                  <motion.article
                    key={post.id || post.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 overflow-hidden hover:shadow-xl hover:shadow-slate-300/40 hover:border-slate-300 transition-all duration-300"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={post.coverImage || post.featuredImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800'}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(post.categories || []).slice(0, 2).map((cat: string) => (
                            <span key={cat} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(cat)}`}>
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {(post as any).readingTime || 5} min read
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          )}

          {/* Results count */}
          <motion.p className="text-slate-600 mb-6 font-medium" id="blog-main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Showing {currentPosts.length} of {filteredPosts.length} articles
            {searchTerm && (
              <span className="ml-2">
                for &quot;<strong className="text-slate-800">{searchTerm}</strong>&quot;
              </span>
            )}
          </motion.p>

          {/* Article grid/list */}
          <main id="blog-main" tabIndex={-1}>
            <h2 className="sr-only">
              {selectedCategory !== 'all' ? `${selectedCategory} articles` : 'All articles'}
            </h2>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
                      <div className="h-52 bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse" />
                        <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : currentPosts.length === 0 ? (
                <motion.div
                  className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-lg"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Search className="w-16 h-16 text-slate-300 mx-auto mb-5" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
                  <p className="text-slate-600 mb-8 max-w-sm mx-auto">Try changing your search or category to find what you need.</p>
                  <motion.button
                    onClick={() => {
                      setSearchTerm('');
                      setCategory('all');
                      setSortBy('latest');
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={tapScale}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-shadow"
                  >
                    Clear filters
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key={`${viewMode}-${safePage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                      : 'space-y-5'
                  }
                >
                  {currentPosts.map((post: any, index: number) => (
                    <motion.article
                      key={post.id || post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={cardHover}
                      className={`bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/80 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 ${
                        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                      }`}
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className={`block overflow-hidden ${viewMode === 'list' ? 'sm:w-80 flex-shrink-0' : ''}`}
                      >
                        <div className={`overflow-hidden bg-slate-100 ${viewMode === 'list' ? 'sm:h-full aspect-video sm:aspect-auto sm:min-h-[200px]' : 'aspect-video'}`}>
                          <img
                            src={post.coverImage || (post as any).featuredImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600'}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                      <div className={`p-6 flex-1 flex flex-col ${viewMode === 'list' ? 'sm:justify-center' : ''}`}>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(post.categories || []).slice(0, 2).map((cat: string) => (
                            <span key={cat} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getCategoryColor(cat)}`}>
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-snug group">
                          <Link to={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-5 flex-1 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(post.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {(post as any).readingTime || 5} min
                            </span>
                          </div>
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:gap-2 transition-all duration-200"
                          >
                            Read <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.nav
              aria-label="Blog pagination"
              className="flex flex-wrap justify-center gap-2 mt-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() => setPage(safePage - 1)}
                disabled={safePage <= 1}
                whileHover={{ scale: safePage > 1 ? 1.05 : 1 }}
                whileTap={tapScale}
                className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                aria-label="Previous page"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
                .map((p, i, arr) => (
                  <React.Fragment key={p}>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span className="px-2 py-2 text-slate-400" aria-hidden="true">
                        …
                      </span>
                    )}
                    <motion.button
                      onClick={() => setPage(p)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={tapScale}
                      className={`min-w-[2.75rem] py-3 px-3 rounded-xl font-semibold transition-all duration-200 ${
                        p === safePage
                          ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                      }`}
                      aria-label={`Page ${p}`}
                      aria-current={p === safePage ? 'page' : undefined}
                    >
                      {p}
                    </motion.button>
                  </React.Fragment>
                ))}
              <motion.button
                onClick={() => setPage(safePage + 1)}
                disabled={safePage >= totalPages}
                whileHover={{ scale: safePage < totalPages ? 1.05 : 1 }}
                whileTap={tapScale}
                className="p-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                aria-label="Next page"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.nav>
          )}

          {/* Explore more */}
          <motion.section
            className="mt-20 pt-14 border-t border-slate-200/80"
            aria-label="Explore more"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore more</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { to: '/calculators', icon: Calculator, label: 'Calculators', desc: 'EMI, SIP, tax & 100+ tools', color: 'blue' },
                { to: '/learn', icon: GraduationCap, label: 'Learn', desc: 'Guides on loans, tax & more', color: 'emerald' },
                { to: '/finance-tools', icon: LayoutGrid, label: 'Finance tools', desc: 'Trackers & planners', color: 'violet' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center gap-5 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-slate-300 transition-all duration-300 group bg-gradient-to-br from-white to-slate-50/50 ${
                      item.color === 'blue' ? 'hover:from-blue-50/30' : item.color === 'emerald' ? 'hover:from-emerald-50/30' : 'hover:from-violet-50/30'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      item.color === 'blue' ? 'bg-blue-100 text-blue-600' : item.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 'bg-violet-100 text-violet-600'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-slate-900 transition-colors ${
                        item.color === 'blue' ? 'group-hover:text-blue-600' : item.color === 'emerald' ? 'group-hover:text-emerald-600' : 'group-hover:text-violet-600'
                      }`}>
                        {item.label}
                      </h3>
                      <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5 ${
                      item.color === 'blue' ? 'text-blue-500' : item.color === 'emerald' ? 'text-emerald-500' : 'text-violet-500'
                    }`} />
                  </Link>
                </motion.div>
              );
              })}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default Blog;
