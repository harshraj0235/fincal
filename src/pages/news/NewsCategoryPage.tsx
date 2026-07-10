import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, TrendingUp, Filter } from 'lucide-react';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { teamProfiles } from '../../data/teamProfiles';
import SEOHelmet from '../../components/SEOHelmet';
import { formatStaticShortDate } from '../../utils/randomCalculators';
import CategoryFAQSchema, { categoryFAQs } from '../../components/CategoryFAQSchema';

const ARTICLES_PER_PAGE = 15;

const NewsCategoryPage: React.FC = () => {
  const { categorySlug: directCategorySlug, slug: topLevelSlug } = useParams();
  const categorySlug = directCategorySlug || topLevelSlug;
  const [currentPage, setCurrentPage] = useState(1);

  const category = newsCategories.find(c => c.slug === categorySlug);
  const allArticles = contentRegistry.filter(article => article.category === categorySlug);
  const reviewedDate = '2026-02-10';
  
  // Pagination
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const articles = allArticles.slice(startIndex, endIndex);

  if (!category) {
    return <Navigate to="/news" replace />;
  }

  const baseUrl = 'https://moneycal.in';
  const listForSchema = articles.slice(0, 5).map((a, i) => ({
    '@type': 'ListItem' as const,
    position: i + 1,
    name: a.title,
    url: `${baseUrl}/news/${a.category}/${a.slug}`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <SEOHelmet
        title={`${category.name} News | MoneyCal India`}
        description={category.description}
        keywords={`${category.name}, financial news, market analysis, India news, ${category.slug}`}
        url={`/news/${categorySlug}`}
      />
      <CategoryFAQSchema category={categorySlug || ''} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${category.name} News | MoneyCal`,
        description: category.description,
        url: `${baseUrl}/news/${categorySlug}`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: allArticles.length,
          itemListElement: listForSchema,
        },
        publisher: { '@type': 'Organization', name: 'MoneyCal India', url: baseUrl },
      }) }} />

      {/* Breadcrumb - Home > News > Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-600">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li aria-hidden="true"> &gt; </li>
            <li><Link to="/news" reloadDocument className="hover:text-blue-600 transition-colors">News</Link></li>
            <li aria-hidden="true"> &gt; </li>
            <li className="text-neutral-900 font-medium" aria-current="page">{category.name}</li>
          </ol>
        </nav>
      </div>

      {/* Category Navigation Bar - Big News Website Style */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link
              to="/news" reloadDocument
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">All News</span>
            </Link>
            <div className="text-sm text-neutral-600">
              {allArticles.length} article{allArticles.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          {/* Category Navigation - Clickable Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
            <Link
              to="/news" reloadDocument
              className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 touch-manipulation flex-shrink-0"
            >
              <Filter className="inline h-4 w-4 mr-1" />
              All
            </Link>
            {newsCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/news/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all touch-manipulation flex-shrink-0 ${
                  cat.slug === categorySlug
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section - Compact & Clean */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            {category.name} News
          </div>
          <h1 className="text-4xl lg:text-5xl news-serif font-bold text-gray-900 mb-3">{category.name}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category.description}
          </p>
        </motion.div>

      </div>

      {/* Articles Grid - With Pagination */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl lg:text-4xl news-serif font-bold text-gray-900 mb-2">
            Latest {category.name} Articles
          </h2>
          <p className="text-lg text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, allArticles.length)} of {allArticles.length} article{allArticles.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {articles.map((article) => {
            const author = teamProfiles.find(p => p.id === article.authorId);

            return (
              <Link
                key={article.id}
                to={`/news/${article.category}/${article.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all"
              >
                <div className="flex-shrink-0 w-full h-36 sm:h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=News';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {category?.name || article.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatStaticShortDate(article.datePublished)}
                    </span>
                  </div>
                  <h3 className="font-bold news-serif text-gray-900 line-clamp-2 text-base sm:text-lg mb-2 group-hover:text-blue-700 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-3">
                    <span className="font-medium">{author?.name || 'MoneyCal Team'}</span>
                    <span>·</span>
                    <time>{formatStaticShortDate(article.datePublished)}</time>
                  </div>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all mt-auto">
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600 mb-4">No articles found in this category yet.</p>
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

        {/* Category FAQs (Visible for SEO) */}
        {categoryFAQs[categorySlug || '']?.length > 0 && (
          <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm">?</span>
              Frequently Asked Questions about {category.name}
            </h2>
            <div className="space-y-6">
              {categoryFAQs[categorySlug || ''].map((faq, idx) => (
                <div key={idx} className="border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-sm p-6 mt-12">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Editorial desk</h2>
          <p className="text-sm text-gray-600">
            Blog guides reviewed by the MoneyCal editorial team. Last reviewed: {reviewedDate}.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link to="/editorial-policy" className="text-blue-700 underline">Editorial policy</Link>
            <Link to="/about-us" className="text-blue-700 underline">About MoneyCal</Link>
            <Link to="/contact-us" className="text-blue-700 underline">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCategoryPage;

