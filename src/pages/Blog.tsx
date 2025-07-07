import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, Filter, X } from 'lucide-react';
import { blogPosts as oldPosts } from '../data/blogData';
import { blogPosts as newPosts } from '../data/blogData1';

// Show latest articles from newPosts on top, then older articles, with pagination (15 per page)
const latestArticles = [...newPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const olderArticles = [...oldPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const POSTS_PER_PAGE = 15;

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);

  // Get unique categories
  const categories = Array.from(
    new Set([...latestArticles, ...olderArticles].flatMap(post => post.categories))
  );

  // Filter and combine
  const filterPosts = (posts: typeof latestArticles) =>
    posts.filter(post => {
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === null || post.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

  const filteredLatest = filterPosts(latestArticles);
  const filteredOlder = filterPosts(olderArticles);

  // Pagination logic
  const allFiltered = [...filteredLatest, ...filteredOlder];
  const totalPosts = allFiltered.length;
  const pageCount = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIdx = (page - 1) * POSTS_PER_PAGE;
  const endIdx = startIdx + POSTS_PER_PAGE;
  const paginatedPosts = allFiltered.slice(startIdx, endIdx);

  // Reset to page 1 on filter/search/category change
  React.useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  // Featured Post (top of the page)
  const featuredPost = allFiltered.length > 0 ? allFiltered[0] : null;

  // Filter sidebar/modal content
  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setShowFilter(false);
            }}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedCategory === null
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setShowFilter(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Government Schemes</h3>
        <p className="text-sm text-blue-700 mb-3">
          Explore comprehensive guides on government financial schemes.
        </p>
        <Link
          to="/blog/category/government-schemes"
          className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1"
        >
          View all guides
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Write for Us</h3>
        <p className="text-sm text-green-700 mb-3">
          Share your financial expertise with our community.
        </p>
        <Link
          to="/blog/write"
          className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
        >
          Learn more
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );

  // --- Responsive Pagination component ---
  const Pagination = () => {
    // Show max 5 pages at once, with scroll on mobile if needed
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
      <nav
        className="w-full flex justify-center mt-4 mb-8"
        aria-label="Pagination"
      >
        <div
          className="inline-flex rounded-lg shadow-sm bg-white border border-gray-200 overflow-x-auto scrollbar-hide"
          style={{
            maxWidth: '100%',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <button
            className="px-4 py-2 text-base rounded-l border-r border-gray-200 bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[48px]"
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            Prev
          </button>
          <div className="flex flex-nowrap overflow-x-auto">
            {pageNumbers.map((num) => (
              <button
                key={num}
                className={`px-4 py-2 text-base border-r border-gray-200 ${
                  page === num
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                } focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[48px]`}
                onClick={() => setPage(num)}
                aria-label={`Go to page ${num}`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 text-base rounded-r bg-white text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[48px]"
            disabled={page === pageCount}
            onClick={() => setPage(p => Math.min(pageCount, p + 1))}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Finance Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert insights, tips, and guides to help you make better financial decisions
            </p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
          <Link to={`/blog/${featuredPost.slug}`} className="block group rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-2xl transition-shadow">
            <div className="md:flex">
              <img src={featuredPost.coverImage} alt={featuredPost.title} className="h-64 w-full md:w-96 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none group-hover:scale-105 transition-transform duration-300" />
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{featuredPost.date}</span>
                  <span className="mx-2">•</span>
                  <User className="h-3 w-3 mr-1" />
                  <span>{featuredPost.author}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">{featuredPost.title}</h2>
                <p className="text-gray-700 text-base mb-3 line-clamp-3">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {featuredPost.categories.slice(0, 2).map(category => (
                    <span key={category} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">{category}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Mobile Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Mobile Filter Toggle */}
            <div className="sm:hidden">
              <button
                className="w-full flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                onClick={() => setShowFilter(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {selectedCategory && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">{selectedCategory}</span>
                )}
              </button>
            </div>
          </div>
          {/* Active Filters */}
          {(selectedCategory || searchTerm) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-xs">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-gray-200 px-2 py-1 rounded text-xs">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Filter Modal (mobile only) */}
        {showFilter && (
          <div className="fixed inset-0 z-40 bg-black/40 flex justify-start sm:hidden">
            <div className="bg-white w-80 max-w-full h-full p-6 overflow-y-auto shadow-lg relative animate-slide-in-left">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={() => setShowFilter(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <FilterContent />
            </div>
            <div className="flex-1" onClick={() => setShowFilter(false)} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <FilterContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {paginatedPosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-lg text-gray-600 mb-4">No articles found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {paginatedPosts.map((post, idx) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group bg-white rounded-xl shadow hover:shadow-2xl transition-shadow duration-300 border border-gray-100 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      style={{ animation: `fadeInUp 0.4s ${0.05 * idx}s both` }}
                      tabIndex={0}
                      aria-label={post.title}
                    >
                      <div className="h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <User className="h-3 w-3 mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.categories.slice(0, 2).map(category => (
                            <span key={category} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Government Schemes Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-12">
                  <h2 className="text-2xl font-bold text-green-900 mb-4">Government Scheme Guides</h2>
                  <p className="text-green-700 mb-6">
                    Comprehensive guides to help you understand and maximize benefits from various government financial schemes in India.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        title: "Sukanya Samriddhi Yojana: Complete Guide",
                        description: "Everything you need to know about SSY - eligibility, benefits, tax advantages, and how to maximize returns.",
                        link: "/blog/sukanya-samriddhi-yojana-guide"
                      },
                      {
                        title: "National Pension System: Tier 1 vs Tier 2",
                        description: "Detailed comparison of NPS Tier 1 and Tier 2 accounts - features, benefits, tax implications, and investment strategies.",
                        link: "/blog/nps-tier1-vs-tier2-comparison"
                      },
                      {
                        title: "Post Office Savings Schemes: Which One is Right for You?",
                        description: "Compare KVP, NSC, SCSS, MIS, and other post office schemes to find the best option for your financial goals.",
                        link: "/blog/post-office-savings-schemes-comparison"
                      },
                      {
                        title: "PM Vaya Vandana Yojana: Pension Scheme for Senior Citizens",
                        description: "A detailed look at PMVVY - benefits, eligibility, comparison with other senior citizen schemes, and application process.",
                        link: "/blog/pm-vaya-vandana-yojana-guide"
                      }
                    ].map((scheme, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">{scheme.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{scheme.description}</p>
                        <Link to={scheme.link} className="text-xs text-green-600 font-medium hover:underline">
                          Read More →
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Link
                      to="/blog/category/government-schemes"
                      className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
                    >
                      View all government scheme guides
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>

                {/* Mobile Friendly Pagination */}
                <Pagination />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add fadeInUp animation and hide scrollbar utility */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Hide scrollbar for pagination on mobile */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Blog;
