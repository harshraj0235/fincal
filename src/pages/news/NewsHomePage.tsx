import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, TrendingUp, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';

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
    <div className="min-h-screen bg-neutral-50">
      <SEOHelmet
        title="Financial News & Market Analysis | MoneyCal"
        description="Latest financial news, market analysis, IPO updates, and economic insights. Expert coverage of Indian markets, startups, and business trends."
        keywords="financial news, market analysis, IPO news, economy news, business news, startup news"
        url="/news"
      />

      {/* Hero Section - Google News Style */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                MoneyCal News
              </h1>
              <p className="text-lg text-neutral-600">
                Business news, IPO coverage, market insights, and economic trends
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{contentRegistry.length}</div>
                <div className="text-xs text-neutral-600">Articles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter - Clean Google News Style */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-700 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              For you
            </button>
            {newsCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category.slug
                    ? 'bg-blue-700 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article - Google News Style */}
      {selectedCategory === 'all' && featuredArticle && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              to={`/news/${featuredArticle.category}/${featuredArticle.slug}`}
              className="block group"
            >
              <div className="md:flex gap-8">
                <div className="md:w-3/5 mb-6 md:mb-0">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-[400px] object-cover group-hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Featured+Article';
                      }}
                    />
                  </div>
                </div>
                
                <div className="md:w-2/5 flex flex-col justify-center">
                  <div className="mb-3">
                    <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-wider">
                      {newsCategories.find(c => c.slug === featuredArticle.category)?.name || featuredArticle.category}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  
                  <div className="text-sm text-neutral-600 mb-4">
                    <Link 
                      to={`/news/author/${featuredArticle.authorId}`}
                      className="hover:text-blue-700 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {teamProfiles.find(p => p.id === featuredArticle.authorId)?.name}
                    </Link>
                    <span className="mx-2">•</span>
                    <time>29 October 2025</time>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-neutral-50">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gradient-to-b from-primary-600 to-purple-600 rounded"></div>
            <h2 className="text-3xl font-bold text-neutral-900">
              {selectedCategory === 'all' ? 'Latest Articles' : newsCategories.find(c => c.slug === selectedCategory)?.name}
            </h2>
          </div>
          <p className="text-lg text-neutral-600 ml-5">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} • Updated daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((article) => {
            const author = teamProfiles.find(p => p.id === article.authorId);
            const category = newsCategories.find(c => c.slug === article.category);

            return (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 border border-neutral-200 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-black shadow-2xl border-2 border-white uppercase tracking-wide">
                      {category?.name || article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-black text-xs shadow-lg flex-shrink-0">
                        {author?.name.split(' ').map(n => n[0]).join('') || 'MC'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-white text-xs">{author?.name || 'MoneyCal Team'}</div>
                        <div className="text-[10px] text-yellow-300 font-bold">{author?.role || 'Writer'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-neutral-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors min-h-[4rem]">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-neutral-700 mb-5 font-bold bg-neutral-50 px-4 py-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-neutral-900">{new Date(article.datePublished).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full justify-center px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all font-black text-base shadow-xl group-hover:shadow-2xl uppercase tracking-wide">
                    <span>Read Full Article</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-6">
            <div className="text-sm text-neutral-600 font-semibold">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles • Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all ${
                  currentPage === 1
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>

              <div className="flex items-center gap-2">
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
                      className={`w-12 h-12 rounded-xl font-black text-base transition-all ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-125 ring-4 ring-blue-300'
                          : 'bg-white text-neutral-800 hover:bg-neutral-100 border-2 border-neutral-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all ${
                  currentPage === totalPages
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                }`}
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsHomePage;

