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

      {/* Hero Section - Mobile Responsive */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                MoneyCal News
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-neutral-600">
                Business news, IPO coverage, market insights, and economic trends
              </p>
            </div>
            <div className="flex sm:hidden items-center gap-3">
              <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-700">{contentRegistry.length}</div>
                <div className="text-xs text-neutral-600">Articles</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{contentRegistry.length}</div>
                <div className="text-xs text-neutral-600">Articles</div>
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

      {/* Category Filter - Clean Google News Style - Mobile Optimized */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide px-3 sm:px-0" style={{ WebkitOverflowScrolling: 'touch' }}>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all touch-manipulation ${
                selectedCategory === 'all'
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200'
              }`}
            >
              For you
            </button>
            {newsCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 sm:px-5 py-2.5 sm:py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all touch-manipulation ${
                  selectedCategory === category.slug
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article - Fully Mobile Responsive */}
      {selectedCategory === 'all' && featuredArticle && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
            <Link
              to={`/news/${featuredArticle.category}/${featuredArticle.slug}`}
              className="block group"
            >
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
                <div className="w-full md:w-3/5">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] object-cover group-hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Featured+Article';
                      }}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-2/5 flex flex-col justify-center">
                  <div className="mb-2 sm:mb-3">
                    <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      {newsCategories.find(c => c.slug === featuredArticle.category)?.name || featuredArticle.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  
                  <div className="text-xs sm:text-sm text-neutral-600">
                    <Link 
                      to={`/news/author/${featuredArticle.authorId}`}
                      className="hover:text-blue-700 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {teamProfiles.find(p => p.id === featuredArticle.authorId)?.name}
                    </Link>
                    <span className="mx-2">•</span>
                    <time>{formatStaticDate(featuredArticle.datePublished)}</time>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Articles Grid - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 bg-neutral-50">
        <div className="mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
            {selectedCategory === 'all' ? 'Latest Articles' : newsCategories.find(c => c.slug === selectedCategory)?.name}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} • Updated daily
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {paginatedArticles.map((article) => {
            const author = teamProfiles.find(p => p.id === article.authorId);
            const category = newsCategories.find(c => c.slug === article.category);

            return (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="block bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-neutral-200 group active:scale-95 active:shadow-sm"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 sm:h-48 md:h-52 object-cover group-hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="mb-2 sm:mb-3">
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
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

        {/* Pagination Controls - Mobile Friendly */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-12 pb-6">
            {/* Mobile: Show only prev/next and current page */}
            <div className="flex sm:hidden items-center justify-between px-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                  currentPage === 1
                    ? 'text-neutral-300 cursor-not-allowed'
                    : 'text-neutral-700 bg-white border border-neutral-300 active:bg-neutral-100'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              
              <div className="text-sm font-semibold text-neutral-700">
                Page {currentPage} of {totalPages}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                  currentPage === totalPages
                    ? 'text-neutral-300 cursor-not-allowed'
                    : 'text-neutral-700 bg-white border border-neutral-300 active:bg-neutral-100'
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop: Show full pagination */}
            <div className="hidden sm:flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-full transition-all ${
                  currentPage === 1
                    ? 'text-neutral-300 cursor-not-allowed'
                    : 'text-neutral-700 hover:bg-neutral-100'
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
                    className={`w-10 h-10 rounded-full font-semibold text-sm transition-all ${
                      currentPage === pageNum
                        ? 'bg-blue-700 text-white'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full transition-all ${
                  currentPage === totalPages
                    ? 'text-neutral-300 cursor-not-allowed'
                    : 'text-neutral-700 hover:bg-neutral-100'
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

