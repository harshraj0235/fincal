import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, TrendingUp, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';
import NewsSearch from '../../components/NewsSearch';
import { formatStaticDate, formatStaticShortDate } from '../../utils/randomCalculators';

const ARTICLES_PER_PAGE = 15;

const NewsHomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = selectedCategory === 'all'
    ? contentRegistry
    : contentRegistry.filter(article => article.category === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  const featuredArticle = contentRegistry[0];
  
  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-16 lg:pt-20">
      <SEOHelmet
        title="Financial News & Market Analysis | MoneyCal"
        description="Latest financial news, market analysis, IPO updates, and economic insights. Expert coverage of Indian markets, startups, and business trends."
        keywords="financial news, market analysis, IPO news, economy news, business news, startup news"
        url="/news"
      />

      {/* Hero Section - Enhanced Mobile Responsive */}
      <div className="bg-gradient-to-b from-white to-neutral-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-2 sm:mb-3">
                MoneyCal News
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed">
                Business news, IPO coverage, market insights, and economic trends
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center px-5 py-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                <div className="text-2xl sm:text-3xl font-bold text-blue-700">{contentRegistry.length}</div>
                <div className="text-xs sm:text-sm text-neutral-600 font-medium">Articles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section - Powerful & Beautiful */}
      <div className="bg-gradient-to-b from-blue-50 to-white border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
          <NewsSearch />
        </div>
      </div>

      {/* Category Filter - Enhanced Mobile-Friendly */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-md backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide px-4 sm:px-0" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-3 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap transition-all touch-manipulation min-h-[44px] ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 active:scale-95'
              }`}
            >
              For you
            </button>
            {newsCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-5 py-3 rounded-full font-semibold text-sm sm:text-base whitespace-nowrap transition-all touch-manipulation min-h-[44px] ${
                  selectedCategory === category.slug
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 active:scale-95'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article - Enhanced Mobile Responsive */}
      {selectedCategory === 'all' && featuredArticle && (
        <div className="bg-gradient-to-b from-white to-neutral-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
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
          </div>
        </div>
      )}

      {/* Articles Grid - Enhanced Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-neutral-50">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4">
            {selectedCategory === 'all' ? 'Latest Articles' : newsCategories.find(c => c.slug === selectedCategory)?.name}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-medium">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} • Updated daily
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

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600">No articles found in this category.</p>
            <button
              onClick={() => handleCategoryChange('all')}
              className="mt-4 text-primary-600 hover:text-primary-800 font-semibold"
            >
              View All Articles
            </button>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default NewsHomePage;

