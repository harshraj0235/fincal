import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Clock, 
  Eye, 
  Share2,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  Grid,
  List,
  Star,
  Sparkles
} from 'lucide-react';
import { astroBlog1 } from '../data/astroBlogs/astroBlog1';
import { astroBlog2 } from '../data/astroBlogs/astroBlog2';
import { astroBlog3 } from '../data/astroBlogs/astroBlog3';
import { astroBlog4 } from '../data/astroBlogs/astroBlog4';
import { astroBlog5 } from '../data/astroBlogs/astroBlog5';
import { astroBlog6 } from '../data/astroBlogs/astroBlog6';
import SEOHelmet from '../components/SEOHelmet';

const AstroFinance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Combine all astro blogs
  const allAstroBlogs = [
    { ...astroBlog1, date: '2024-12-15', readingTime: 8, views: 1250, featured: true, authorTitle: 'Vedic Astrology Specialist' },
    { ...astroBlog2, date: '2024-12-14', readingTime: 6, views: 980, featured: false, authorTitle: 'Vedic Astrology Specialist' },
    { ...astroBlog3, date: '2024-12-13', readingTime: 10, views: 1450, featured: true, authorTitle: 'Vedic Astrology Specialist' },
    { ...astroBlog4, date: '2024-12-12', readingTime: 7, views: 890, featured: false, authorTitle: 'Vedic Astrology Specialist' },
    { ...astroBlog5, date: '2024-12-11', readingTime: 9, views: 1120, featured: true, authorTitle: 'Vedic Astrology Specialist' },
    { ...astroBlog6, date: '2024-12-10', readingTime: 12, views: 1680, featured: true, authorTitle: 'Vedic Astrology Specialist' }
  ];

  // Categories for astro blogs
  const categories = ['all', 'Zodiac', 'Vedic', 'Investment', 'Wealth', 'Compatibility', 'Gemstones'];

  // Filter and sort posts
  const filteredPosts = allAstroBlogs
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                            post.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

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
        title="Astro-Finance Insights Hub - Zodiac Based Financial Guidance | MoneyCal.in"
        description="Discover how astrology and finance intersect. Get personalized financial horoscopes, zodiac-based investment tips, Vedic wealth guides, and astrological financial insights."
        keywords="astro finance, zodiac finance, vedic astrology, financial horoscope, investment tips, wealth guidance"
        url="/astro-finance"
        structuredData={{}}
        tags={["astro finance", "zodiac finance", "vedic astrology", "financial horoscope"]}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-purple-50 to-indigo-50 pt-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Cosmic Financial Wisdom
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Astro-Finance Insights Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover how astrology and finance intersect to help you make smarter money decisions. Explore personalized financial horoscopes, zodiac-based investment tips, Vedic wealth guides, and more.
        </p>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
          >
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Personalized Financial Horoscope</h2>
            <p className="mb-4 text-neutral-600">Get your financial forecast based on your zodiac sign and birth date. Plan your investments, savings, and spending for 2025 and beyond.</p>
            <Link to="/astro-finance/horoscope" className="astro-finance-btn">Get My Horoscope</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Zodiac-Based Investment Tips</h2>
            <p className="mb-4 text-neutral-600">Explore investment strategies tailored to your astrological profile. Find your lucky numbers, best investment days, and more.</p>
            <Link to="/astro-finance/zodiac-tips" className="astro-finance-btn">Explore Tips</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Lucky Number Generator</h2>
            <p className="mb-4 text-neutral-600">Generate personalized lucky numbers for financial decisions, stock picking, and investment timing based on your zodiac.</p>
            <Link to="/astro-finance/lucky-numbers" className="astro-finance-btn">Generate Numbers</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Muhurat Calculator</h2>
            <p className="mb-4 text-neutral-600">Find the most auspicious dates and times for financial activities like investments, property purchase, and business decisions.</p>
            <Link to="/astro-finance/muhurat" className="astro-finance-btn">Calculate Muhurat</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Zodiac Savings Calculator</h2>
            <p className="mb-4 text-neutral-600">Get personalized savings recommendations based on your zodiac traits, income, and financial goals.</p>
            <Link to="/astro-finance/savings-calculator" className="astro-finance-btn">Calculate Savings</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Gemstone Calculator</h2>
            <p className="mb-4 text-neutral-600">Discover the perfect gemstone to enhance your financial prosperity based on your zodiac sign and birth details.</p>
            <Link to="/astro-finance/gemstone-calculator" className="astro-finance-btn">Find Gemstone</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Nakshatra Calculator</h2>
            <p className="mb-4 text-neutral-600">Discover your financial destiny based on your birth star (Nakshatra) in Vedic astrology.</p>
            <Link to="/astro-finance/nakshatra-calculator" className="astro-finance-btn">Calculate Nakshatra</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Planetary Calculator</h2>
            <p className="mb-4 text-neutral-600">Understand how planetary positions influence your financial decisions and timing.</p>
            <Link to="/astro-finance/planetary-calculator" className="astro-finance-btn">Analyze Planets</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Daily Financial Horoscope</h2>
            <p className="mb-4 text-neutral-600">Get your daily financial forecast for all zodiac signs. Perfect for daily financial planning.</p>
            <Link to="/astro-finance/daily-horoscope" className="astro-finance-btn">Read Daily Horoscope</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Financial Compatibility</h2>
            <p className="mb-4 text-neutral-600">Check how well zodiac signs work together in business partnerships and investments.</p>
            <Link to="/astro-finance/compatibility" className="astro-finance-btn">Check Compatibility</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">2025 Yearly Forecast</h2>
            <p className="mb-4 text-neutral-600">Get comprehensive 2025 financial predictions with monthly breakdowns for your zodiac.</p>
            <Link to="/astro-finance/yearly-forecast" className="astro-finance-btn">Get 2025 Forecast</Link>
          </div>
            <div className="cosmic-card p-6 rounded-xl shadow-lg bg-white/80 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-semibold mb-2">Crystal & Feng Shui</h2>
            <p className="mb-4 text-neutral-600">Discover crystals and feng shui arrangements for financial success based on your zodiac.</p>
            <Link to="/astro-finance/crystal-calculator" className="astro-finance-btn">Find Crystals</Link>
          </div>
          </motion.div>

          {/* Astro Blogs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Featured Astro-Finance Articles
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Cosmic Financial Wisdom
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our collection of astro-finance articles, combining ancient Vedic wisdom with modern financial insights.
              </p>
            </div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search astro-finance articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-4">
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>

                  {/* Sort Filter */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Most Popular</option>
                    <option value="featured">Featured</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between mb-8"
            >
              <p className="text-gray-600">
                Showing {currentPosts.length} of {filteredPosts.length} articles
              </p>
              {searchTerm && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Search results for:</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    "{searchTerm}"
                  </span>
                </div>
              )}
            </motion.div>

            {/* Blog Posts Grid/List */}
            <AnimatePresence mode="wait">
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
                  <Link
                    key={post.id}
                    to={`/astro-finance/blog/${post.slug}`}
                    className="block"
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all cursor-pointer ${
                        viewMode === 'list' ? 'flex flex-col lg:flex-row' : ''
                      } ${post.featured ? 'ring-2 ring-purple-500' : ''}`}
                    >
                    {/* Featured Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'lg:w-1/3' : ''
                    }`}>
                      <img
                        src={post.coverImage || 'https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Astro+Finance'}
                        alt={post.title}
                        className="w-full h-48 lg:h-64 object-cover transition-transform hover:scale-105"
                      />
                      {post.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-600">
                            <Star className="w-3 h-3 inline mr-1" />
                            Featured
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                        >
                          <Bookmark className="w-4 h-4 text-gray-600" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`p-6 flex-1 ${
                      viewMode === 'list' ? 'lg:w-2/3' : ''
                    }`}>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readingTime} min read
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
                        <Link to={`/astro-finance/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={post.authorImage || 'https://via.placeholder.com/32x32/8B5CF6/FFFFFF?text=AF'}
                            alt={post.author || 'Astro Finance Expert'}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{post.author || 'Astro Finance Expert'}</div>
                            <div className="text-xs text-gray-500">{post.authorTitle || 'Vedic Astrology Specialist'}</div>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
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
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
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
            {currentPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Coming Soon</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-600">Enhanced Features</h3>
                <ul className="list-disc list-inside text-neutral-700 space-y-2">
                  <li>Interactive Astro-Finance Blog & Guides</li>
                  <li>Personalized Financial Horoscope PDF Downloads</li>
                  <li>Video Insights & Tutorials</li>
                  <li>Real-time Planetary Position Tracking</li>
                </ul>
        </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-600">Advanced Tools</h3>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
                  <li>AI-Powered Financial Predictions</li>
                  <li>Zodiac Portfolio Optimization</li>
                  <li>Muhurat Calendar Integration</li>
                  <li>Community Astro-Finance Forum</li>
          </ul>
        </div>
            </div>
          </motion.div>
      </div>
    </div>
    </>
  );
};

export default AstroFinance; 