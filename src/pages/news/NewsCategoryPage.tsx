import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';
import { formatStaticShortDate } from '../../utils/randomCalculators';

const ARTICLES_PER_PAGE = 15;

const NewsCategoryPage: React.FC = () => {
  const { categorySlug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const category = newsCategories.find(c => c.slug === categorySlug);
  const allArticles = contentRegistry.filter(article => article.category === categorySlug);
  
  // Pagination
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const articles = allArticles.slice(startIndex, endIndex);

  if (!category) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <SEOHelmet
        title={`${category.name} News | MoneyCal`}
        description={category.description}
        keywords={`${category.name}, financial news, market analysis`}
        url={`/news/${categorySlug}`}
      />

      {/* Hero Section - Clean Like Blog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg mb-6 transition-all text-sm font-semibold touch-manipulation active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All News
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            {category.name}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category.description}
          </p>
        </motion.div>
      </div>

      {/* Category Navigation - Show All Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-lg"
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
            <Link
              to="/news"
              className="px-5 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all touch-manipulation min-h-[44px] flex-shrink-0 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:scale-95"
            >
              All
            </Link>
            {newsCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/news/${cat.slug}`}
                className={`px-5 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all touch-manipulation min-h-[44px] flex-shrink-0 ${
                  cat.slug === categorySlug
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:scale-95'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Articles Grid - With Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {category.name} Articles
            </h2>
            <p className="text-lg text-gray-600">
              {allArticles.length} articles • Showing {startIndex + 1}-{Math.min(endIndex, allArticles.length)}
            </p>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => {
            const author = teamProfiles.find(p => p.id === article.authorId);
            const cat = newsCategories.find(c => c.slug === article.category);

            return (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 group active:scale-98 transform"
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
                      {cat?.name || article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-3 group-hover:text-blue-700 transition-colors">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{author?.name || 'MoneyCal Team'}</span>
                    <span>•</span>
                    <time>{formatStaticShortDate(article.datePublished)}</time>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600 mb-4">No articles found in this category yet.</p>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All News
            </Link>
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
        </motion.div>
      </div>
    </div>
  );
};

export default NewsCategoryPage;

