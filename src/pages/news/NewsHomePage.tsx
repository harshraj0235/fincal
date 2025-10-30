import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, TrendingUp, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';
import NewsSearch from '../../components/NewsSearch';
import { formatStaticDate, formatStaticShortDate } from '../../utils/randomCalculators';

const ARTICLES_PER_PAGE = 15;

const NewsHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Show all articles on homepage
  const filteredArticles = contentRegistry;

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  const featuredArticle = contentRegistry[0];
  
  // Navigate to category page when category is selected
  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      navigate('/news');
    } else {
      navigate(`/news/${category}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <SEOHelmet
        title="Financial News & Market Analysis | MoneyCal"
        description="Latest financial news, market analysis, IPO updates, and economic insights. Expert coverage of Indian markets, startups, and business trends."
        keywords="financial news, market analysis, IPO news, economy news, business news, startup news"
        url="/news"
      />

      {/* Hero Section - Simple & Clean Like Blog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Latest Financial News
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            MoneyCal News
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Business news, IPO coverage, market insights, and economic trends - {contentRegistry.length} articles
          </p>
        </motion.div>
      </div>

      {/* Search Section - Full Width No Overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200"
        >
          {/* Search Bar */}
          <NewsSearch />
        </motion.div>
      </div>

      {/* Category Buttons - Horizontal Scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button
            onClick={() => handleCategoryChange('all')}
            className="px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 touch-manipulation min-h-[48px] flex-shrink-0 active:scale-95 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
          >
            All
          </button>
          {newsCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className="px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 touch-manipulation min-h-[48px] flex-shrink-0 active:scale-95 bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-700 hover:shadow-lg"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article - Clean & Simple */}
      {featuredArticle && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Featured Story
              </div>
            </div>
            <Link
              to={`/news/${featuredArticle.category}/${featuredArticle.slug}`}
              className="block group"
            >
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-neutral-200">
                <div className="w-full md:w-3/5">
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-56 sm:h-72 md:h-80 lg:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      fetchpriority="high"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Featured+Article';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden"></div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/5 flex flex-col justify-center p-6 sm:p-8">
                  <div className="mb-3 sm:mb-4">
                    <span className="inline-block px-3 py-1 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 rounded-full uppercase tracking-wider">
                      {newsCategories.find(c => c.slug === featuredArticle.category)?.name || featuredArticle.category}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-tight group-hover:text-blue-700 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  
                  <div className="flex items-center gap-3 text-sm sm:text-base text-neutral-600">
                    <Link 
                      to={`/news/author/${featuredArticle.authorId}`}
                      className="hover:text-blue-700 font-semibold transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {teamProfiles.find(p => p.id === featuredArticle.authorId)?.name}
                    </Link>
                    <span>•</span>
                    <time className="font-medium">{formatStaticDate(featuredArticle.datePublished)}</time>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      )}

      {/* Articles Grid - Clean & Simple Like Blog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600">
              {filteredArticles.length} articles • Updated daily
            </p>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {paginatedArticles.map((article) => {
            const author = teamProfiles.find(p => p.id === article.authorId);
            const category = newsCategories.find(c => c.slug === article.category);

            return (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="block bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-neutral-200 group active:scale-98 transform"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 sm:h-52 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-all"></div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-bold text-blue-700 bg-blue-50 rounded-full uppercase tracking-wider">
                      {category?.name || article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors line-clamp-3 min-h-[3.5rem] sm:min-h-[4rem]">
                    {article.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                    <Link 
                      to={`/news/author/${article.authorId}`}
                      className="font-medium hover:text-blue-700 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {author?.name || 'MoneyCal Team'}
                    </Link>
                    <span>•</span>
                    <time>{formatStaticShortDate(article.datePublished)}</time>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination Controls - Enhanced Mobile Friendly */}
        {totalPages > 1 && (
          <div className="mt-10 sm:mt-16 pb-8">
            {/* Mobile: Show only prev/next and current page */}
            <div className="flex sm:hidden items-center justify-between gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold min-h-[44px] transition-all ${
                  currentPage === 1
                    ? 'text-neutral-300 bg-neutral-100 cursor-not-allowed'
                    : 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg active:scale-95'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
                Prev
              </button>
              
              <div className="flex-1 text-center px-4 py-3 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
                <span className="text-sm font-bold text-neutral-900">
                  {currentPage} <span className="text-neutral-500">of</span> {totalPages}
                </span>
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold min-h-[44px] transition-all ${
                  currentPage === totalPages
                    ? 'text-neutral-300 bg-neutral-100 cursor-not-allowed'
                    : 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg active:scale-95'
                }`}
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Desktop: Show full pagination */}
            <div className="hidden sm:flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`p-3 rounded-full transition-all ${
                  currentPage === 1
                    ? 'text-neutral-300 cursor-not-allowed bg-neutral-100'
                    : 'text-blue-700 hover:bg-blue-50 active:bg-blue-100'
                }`}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[44px] h-11 rounded-xl font-bold text-sm transition-all ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-110'
                        : 'text-neutral-700 hover:bg-blue-50 active:bg-blue-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`p-3 rounded-full transition-all ${
                  currentPage === totalPages
                    ? 'text-neutral-300 cursor-not-allowed bg-neutral-100'
                    : 'text-blue-700 hover:bg-blue-50 active:bg-blue-100'
                }`}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
        </motion.div>
      </div>
    </div>
  );
};

export default NewsHomePage;

