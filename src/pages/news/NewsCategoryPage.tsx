import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';

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
    <div className="min-h-screen bg-neutral-50">
      <SEOHelmet
        title={`${category.name} News | MoneyCal`}
        description={category.description}
        keywords={`${category.name}, financial news, market analysis`}
        url={`/news/${categorySlug}`}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All News
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {category.description}
          </p>
        </div>
      </div>

      {/* Articles Grid - With Pagination */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
            {category.name} News
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Showing {startIndex + 1}-{Math.min(endIndex, allArticles.length)} of {allArticles.length} article{allArticles.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const author = teamProfiles.find(p => p.id === article.authorId);

            return (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 border border-neutral-200 hover:border-blue-400 group"
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
      </div>
    </div>
  );
};

export default NewsCategoryPage;

