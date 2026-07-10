import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewsList, { NewsItem } from "../components/NewsList";
import { loadBlogData } from "../data/lazyBlogData";
import { governmentSchemes } from "../data/governmentSchemesData";
import { calculatorCategories } from "../data/calculatorData";
import { BannerAd, ResponsiveAd } from "../components/BannerAd";
import SEOHelmet from "../components/SEOHelmet";
import { Search, TrendingUp, BookOpen, Landmark, Calculator, Zap } from "lucide-react";

const NewsHub: React.FC = () => {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const categories = ["All", "Blog", "Calculator", "Government Scheme", "News"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const calculators: NewsItem[] = calculatorCategories.flatMap(cat =>
          cat.calculators.map(calc => ({
            id: String(calc.id),
            title: calc.name,
            summary: calc.description,
            category: "Calculator",
            date: "",
            slug: `/calculators/${calc.id}`
          }))
        );

        const posts = await loadBlogData();

        const blogs: NewsItem[] = [
          ...(posts || []).map((post: any) => ({
            id: String(post.id),
            title: post.title,
            summary: post.excerpt || "",
            category: "Blog",
            date: post.date || "",
            slug: `/blog/${post.slug}`
          })),
          ...governmentSchemes.map(scheme => ({
            id: String(scheme.id),
            title: scheme.title,
            summary: scheme.seoDescription || "",
            category: "Government Scheme",
            date: "",
            slug: `/government-schemes/${scheme.slug}`
          })),
          ...calculators
        ];

        setAllBlogs(blogs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!allBlogs.length) return [];
    let result = allBlogs;
    if (activeCategory !== "All") {
      result = result.filter(item => item.category === activeCategory);
    }
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(s) ||
        item.summary.toLowerCase().includes(s) ||
        item.category.toLowerCase().includes(s)
      );
    }
    return result;
  }, [search, allBlogs, activeCategory]);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentItems = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // FIX: Use navigate() to keep users on site instead of window.open('_blank')
  const handleNewsClick = (slug: string) => {
    navigate(slug);
  };

  const stats = [
    { icon: Calculator, label: "Calculators", value: "200+" },
    { icon: BookOpen, label: "Blog Posts", value: "500+" },
    { icon: Landmark, label: "Govt Schemes", value: "100+" },
    { icon: TrendingUp, label: "Tools", value: "50+" },
  ];

  return (
    <>
      <SEOHelmet
        title="Finance News Hub — Calculators, Blogs & Government Schemes India"
        description="Browse India's most comprehensive financial resource hub. 200+ free calculators, 500+ expert blog posts, government schemes, and finance news. All in one place."
        keywords="financial news India, EMI calculator, SIP calculator, government schemes India, finance blog India, tax calculator, mutual fund calculator, IPO news, gold rate today"
        url="/news-hub"
        section="News"
        newsKeywords="EMI calculator, SIP calculator, income tax 2025-26, gold rate India, IPO 2025"
      />

      <div className="min-h-screen bg-gray-50/50">

        {/* ── Hero Section ──────────────────────────────────────────────── */}
        <section className="bg-white border-b border-gray-100 pt-16 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-6 tracking-wide uppercase">
              <Zap className="h-3.5 w-3.5" />
              India's Complete Finance Resource Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Calculators, Blogs &amp;<br />
              <span className="text-blue-600">Finance News</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              Search across 200+ calculators, expert finance blogs, government schemes, and real-time market news — all in one place.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                  <Icon className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-black text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>

            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                id="news-hub-search"
                type="text"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 font-medium text-base shadow-lg border border-gray-100 bg-white focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all"
                placeholder="Search calculators, blogs, schemes..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* ── Category Filters ───────────────────────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({allBlogs.filter(b => b.category === cat).length})
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto text-sm text-gray-400 font-medium self-center">
              {filteredBlogs.length} results
            </span>
          </div>

          {/* ── Mid-page Ad ────────────────────────────────────────────── */}
          <div className="w-full flex justify-center mb-8">
            <div className="ad-container w-full max-w-2xl">
              <ResponsiveAd />
            </div>
          </div>

          {/* ── Content Grid ───────────────────────────────────────────── */}
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="skeleton h-40 w-full rounded-2xl" />
              ))}
            </div>
          ) : currentItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500">Try a different search term or category</p>
            </div>
          ) : (
            <NewsList news={currentItems} onNewsClick={handleNewsClick} />
          )}

          {/* ── Bottom Ad ──────────────────────────────────────────────── */}
          <div className="w-full flex justify-center my-8">
            <div className="ad-container w-full max-w-sm">
              <ResponsiveAd />
            </div>
          </div>

          {/* ── Pagination ─────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <nav aria-label="Page navigation" className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>

              {[...Array(Math.min(totalPages, 7))].map((_, index) => {
                let page: number;
                if (totalPages <= 7) {
                  page = index + 1;
                } else if (currentPage <= 4) {
                  page = index + 1;
                } else if (currentPage >= totalPages - 3) {
                  page = totalPages - 6 + index;
                } else {
                  page = currentPage - 3 + index;
                }

                if (page < 1 || page > totalPages) return null;
                const isActive = page === currentPage;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:border-blue-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-2.5 bg-white rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default NewsHub;
