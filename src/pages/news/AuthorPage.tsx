import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft, User, Briefcase, BookOpen, Facebook, Instagram, Linkedin, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';

const ARTICLES_PER_PAGE = 8;

const AuthorPage: React.FC = () => {
  const { authorId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const author = teamProfiles.find(p => p.id === authorId);
  const authorArticles = contentRegistry.filter(article => article.authorId === authorId);

  // Pagination
  const totalPages = Math.ceil(authorArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = authorArticles.slice(startIndex, endIndex);

  if (!author) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-16 lg:pt-20">
      <SEOHelmet
        title={`${author.name} - Author Profile | MoneyCal`}
        description={`Read all articles by ${author.name}, ${author.role} at MoneyCal. ${author.bio}`}
        keywords={`${author.name}, financial writer, market analyst, author`}
        url={`/news/author/${authorId}`}
      />

      {/* Hero Section - Mobile Optimized */}
      <div className="bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <Link
            to="/news" reloadDocument
            className="inline-flex items-center gap-2 px-3 py-2 text-blue-100 hover:text-white hover:bg-white/10 active:bg-white/20 rounded-lg mb-4 sm:mb-6 transition-all text-sm sm:text-base touch-manipulation active:scale-95 -ml-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All News
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 md:gap-8">
            {/* Author Avatar */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold text-3xl sm:text-4xl md:text-5xl border-2 sm:border-4 border-white/30 shadow-2xl flex-shrink-0">
              {author.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Author Info */}
            <div className="flex-1 w-full">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">{author.name}</h1>
              <div className="flex items-center gap-2 text-base sm:text-lg md:text-xl text-blue-100 mb-3 sm:mb-4">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{author.role}</span>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-blue-50 max-w-3xl mb-4 sm:mb-6">
                {author.bio}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-semibold">{authorArticles.length} Article{authorArticles.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Social Links - Mobile Optimized */}
                {author.socialProfiles && (
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {author.socialProfiles.linkedin && (
                      <a
                        href={author.socialProfiles.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm rounded-lg transition-all border border-white/20 active:scale-95"
                      >
                        <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="font-medium text-xs sm:text-sm">LinkedIn</span>
                      </a>
                    )}
                    {author.socialProfiles.twitter && (
                      <a
                        href={author.socialProfiles.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm rounded-lg transition-all border border-white/20 active:scale-95"
                      >
                        <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="font-medium text-xs sm:text-sm">Twitter</span>
                      </a>
                    )}
                    {author.socialProfiles.facebook && (
                      <a
                        href={author.socialProfiles.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm rounded-lg transition-all border border-white/20 active:scale-95"
                      >
                        <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="font-medium text-xs sm:text-sm">Facebook</span>
                      </a>
                    )}
                    {author.socialProfiles.instagram && (
                      <a
                        href={author.socialProfiles.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm rounded-lg transition-all border border-white/20 active:scale-95"
                      >
                        <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="font-medium text-xs sm:text-sm">Instagram</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles by Author - Mobile Optimized */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
            Articles by {author.name}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Showing {startIndex + 1}-{Math.min(endIndex, authorArticles.length)} of {authorArticles.length} article{authorArticles.length !== 1 ? 's' : ''} • Page {currentPage} of {totalPages}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {paginatedArticles.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.category}/${article.slug}`}
              className="block bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-2xl active:shadow-sm transition-all hover:-translate-y-2 active:scale-95 border border-neutral-200 hover:border-blue-400 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-600 text-white rounded-md sm:rounded-lg text-xs font-black shadow-2xl border border-white sm:border-2 uppercase">
                    {article.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-black text-neutral-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors min-h-[3rem] sm:min-h-[3.5rem] line-clamp-3">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-neutral-700 mb-3 sm:mb-4 font-bold bg-neutral-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg">
                  <Calendar className="h-3 w-3 text-blue-600 flex-shrink-0" />
                  <span className="text-neutral-900 truncate">{new Date(article.datePublished).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2 w-full justify-center px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 active:from-blue-800 active:via-purple-800 active:to-pink-800 transition-all font-black text-xs sm:text-sm shadow-xl uppercase">
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {authorArticles.length === 0 && (
          <div className="text-center py-20">
            <User className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <p className="text-xl text-neutral-600 mb-4">No articles published yet.</p>
            <Link
              to="/news" reloadDocument
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
            <div className="flex sm:hidden items-center justify-between px-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${currentPage === 1
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white active:bg-primary-700 shadow-md active:scale-95'
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-sm transition-all ${currentPage === totalPages
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white active:bg-primary-700 shadow-md active:scale-95'
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === 1
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                  }`}
              >
                <ChevronLeft className="h-4 w-4" />
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
                      className={`w-10 h-10 rounded-lg font-bold transition-all ${currentPage === pageNum
                        ? 'bg-primary-600 text-white shadow-lg scale-110'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === totalPages
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                  }`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;

