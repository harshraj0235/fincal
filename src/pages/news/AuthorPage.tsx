import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ArrowRight, ArrowLeft, User, Briefcase, BookOpen, Facebook, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="min-h-screen bg-neutral-50">
      <SEOHelmet
        title={`${author.name} - Author Profile | MoneyCal`}
        description={`Read all articles by ${author.name}, ${author.role} at MoneyCal. ${author.bio}`}
        keywords={`${author.name}, financial writer, market analyst, author`}
        url={`/news/author/${authorId}`}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All News
          </Link>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Author Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold text-5xl border-4 border-white/30 shadow-2xl flex-shrink-0">
              {author.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            {/* Author Info */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{author.name}</h1>
              <div className="flex items-center gap-2 text-xl text-blue-100 mb-4">
                <Briefcase className="h-5 w-5" />
                <span>{author.role}</span>
              </div>
              <p className="text-lg text-blue-50 max-w-3xl mb-6">
                {author.bio}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-blue-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-semibold">{authorArticles.length} Article{authorArticles.length !== 1 ? 's' : ''}</span>
                </div>
                
                {/* Social Links */}
                {author.socialProfiles && (
                  <div className="flex items-center gap-3">
                    {author.socialProfiles.facebook && (
                      <a
                        href={author.socialProfiles.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
                      >
                        <Facebook className="h-4 w-4" />
                        <span className="font-medium text-sm">Facebook</span>
                      </a>
                    )}
                    {author.socialProfiles.instagram && (
                      <a
                        href={author.socialProfiles.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all border border-white/20"
                      >
                        <Instagram className="h-4 w-4" />
                        <span className="font-medium text-sm">Instagram</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles by Author */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              Articles by {author.name}
            </h2>
            <p className="text-neutral-600">
              Showing {startIndex + 1}-{Math.min(endIndex, authorArticles.length)} of {authorArticles.length} article{authorArticles.length !== 1 ? 's' : ''} • Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedArticles.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.category}/${article.slug}`}
              className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 border border-neutral-200 hover:border-blue-400 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-black shadow-2xl border-2 border-white uppercase">
                    {article.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black text-neutral-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors min-h-[3.5rem]">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-neutral-700 mb-4 font-bold bg-neutral-50 px-3 py-2 rounded-lg">
                  <Calendar className="h-3 w-3 text-blue-600" />
                  <span className="text-neutral-900">{new Date(article.datePublished).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all font-black text-sm shadow-xl uppercase">
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
              to="/news"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All News
            </Link>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 1
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-bold transition-all ${
                    currentPage === page
                      ? 'bg-primary-600 text-white shadow-lg scale-110'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === totalPages
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
              }`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;

