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
  BookOpen,
  Calculator,
  GraduationCap,
  TrendingUp,
  ChevronRight,
  LayoutGrid,
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { loadAllBlogData } from '../data/lazyBlogData';

const POSTS_PER_PAGE = 12;

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

      <div className="min-h-screen bg-slate-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-4 h-4 inline text-slate-400" />
              </li>
              <li>
                {selectedCategory !== 'all' ? (
                  <>
                    <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
                    <span className="mx-2 text-slate-400">/</span>
                    <span className="text-slate-900 font-medium">{selectedCategory}</span>
                  </>
                ) : (
                  <span className="text-slate-900 font-medium">Blog</span>
                )}
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <header className="text-center mb-10 lg:mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <Flame className="w-4 h-4" />
              Latest financial insights
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              {selectedCategory !== 'all' ? `${selectedCategory} Articles` : 'Financial Blog'}
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
              {selectedCategory !== 'all'
                ? `Expert ${selectedCategory.toLowerCase()} guides and tips for Indian readers.`
                : 'Expert articles on investments, tax, banking and personal finance. Easy to navigate and always up to date.'}
            </p>
          </header>

          {/* Browse by category – SEO-friendly navigation */}
          <section aria-label="Browse by category" className="mb-10">
            <h2 className="sr-only">Browse by category</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                All ({allBlogPosts.length})
              </button>
              {categoriesWithCount.slice(0, 14).map(({ name, count }) => (
                <button
                  key={name}
                  onClick={() => setCategory(name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === name
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {name} ({count})
                </button>
              ))}
            </div>
          </section>

          {/* Search & filters */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 lg:p-6 mb-8">
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
          </section>

          {/* Featured (top 3 when no filter) */}
          {selectedCategory === 'all' && !searchTerm && featuredPosts.length >= 3 && (
            <section className="mb-12" aria-label="Featured articles">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Featured articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map((post, idx) => (
                  <article
                    key={post.id || post.slug}
                    className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={post.coverImage || (post as any).featuredImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800'}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(post.categories || []).slice(0, 2).map((cat: string) => (
                            <span key={cat} className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(cat)}`}>
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
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
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Results count */}
          <p className="text-slate-600 mb-6" id="blog-main">
            Showing {currentPosts.length} of {filteredPosts.length} articles
            {searchTerm && (
              <span className="ml-2">
                for &quot;<strong>{searchTerm}</strong>&quot;
              </span>
            )}
          </p>

          {/* Article grid/list */}
          <main id="blog-main" tabIndex={-1}>
            <h2 className="sr-only">
              {selectedCategory !== 'all' ? `${selectedCategory} articles` : 'All articles'}
            </h2>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                      <div className="h-48 bg-slate-200 rounded-xl mb-4" />
                      <div className="h-4 bg-slate-200 rounded mb-2 w-3/4" />
                      <div className="h-3 bg-slate-200 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : currentPosts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                  <Search className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
                  <p className="text-slate-600 mb-6">Try changing search or category.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCategory('all');
                      setSortBy('latest');
                    }}
                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <motion.div
                  key={`${viewMode}-${safePage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {currentPosts.map((post, index) => (
                    <motion.article
                      key={post.id || post.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all ${
                        viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                      }`}
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className={`block overflow-hidden ${viewMode === 'list' ? 'sm:w-72 flex-shrink-0' : ''}`}
                      >
                        <div className={`overflow-hidden bg-slate-100 ${viewMode === 'list' ? 'sm:h-full aspect-video sm:aspect-auto' : 'aspect-video'}`}>
                          <img
                            src={post.coverImage || (post as any).featuredImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600'}
                            alt=""
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <div className={`p-5 flex-1 flex flex-col ${viewMode === 'list' ? 'sm:justify-center' : ''}`}>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(post.categories || []).slice(0, 2).map((cat: string) => (
                            <span key={cat} className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(cat)}`}>
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-slate-500">
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
                            className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm hover:underline"
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
            <nav aria-label="Blog pagination" className="flex flex-wrap justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(safePage - 1)}
                disabled={safePage <= 1}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 2)
                .map((p, i, arr) => (
                  <React.Fragment key={p}>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span className="px-2 py-2 text-slate-400" aria-hidden="true">
                        …
                      </span>
                    )}
                    <button
                      onClick={() => setPage(p)}
                      className={`min-w-[2.5rem] py-2.5 px-3 rounded-xl font-medium transition-colors ${
                        p === safePage
                          ? 'bg-blue-600 text-white shadow'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                      aria-label={`Page ${p}`}
                      aria-current={p === safePage ? 'page' : undefined}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                ))}
              <button
                onClick={() => setPage(safePage + 1)}
                disabled={safePage >= totalPages}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </nav>
          )}

          {/* Explore more – internal links for SEO */}
          <section className="mt-16 pt-12 border-t border-slate-200" aria-label="Explore more">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore more</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link
                to="/calculators"
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Calculators</h3>
                  <p className="text-sm text-slate-600">EMI, SIP, tax & 100+ tools</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 ml-auto group-hover:text-blue-600" />
              </Link>
              <Link
                to="/learn"
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Learn</h3>
                  <p className="text-sm text-slate-600">Guides on loans, tax & more</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 ml-auto group-hover:text-emerald-600" />
              </Link>
              <Link
                to="/finance-tools"
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                  <LayoutGrid className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-violet-600 transition-colors">Finance tools</h3>
                  <p className="text-sm text-slate-600">Trackers & planners</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 ml-auto group-hover:text-violet-600" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Blog;
