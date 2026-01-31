import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ChevronLeft, ChevronRight, Newspaper, LayoutGrid, Clock } from 'lucide-react';
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

  const filteredArticles =
    selectedCategory === 'all'
      ? contentRegistry
      : contentRegistry.filter((article) => article.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  const featuredArticle = contentRegistry[0];
  const headlinesStrip = contentRegistry.slice(1, 6);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <SEOHelmet
        title="MoneyCal News – Financial News, Markets, Business & Economy | India"
        description="Latest financial news, market analysis, IPO updates, business and economy. Find any news by category – Markets, Business, Startups, Tech, Economy. Easy to navigate like Google News."
        keywords="financial news India, market news, business news, IPO news, economy news, startup news, tech business, MoneyCal news"
        url="/news"
      />

      {/* Google News–style header: search + category tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-slate-900">MoneyCal News</h1>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 max-w-xl">
                <NewsSearch />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                {newsCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* News in 60 Seconds – Inshorts-style shorts */}
        <section className="mb-8">
          <Link
            to="/news/shorts"
            className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Moneycal News in 60 Seconds</h2>
                <p className="text-sm text-slate-600">Short. Clear. Actionable. Read in 30–45 seconds.</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
          </Link>
        </section>

        {/* Top story / For you – big card (only when All) */}
        {selectedCategory === 'all' && featuredArticle && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">Top story</h2>
            </div>
            <Link
              to={`/news/${featuredArticle.category}/${featuredArticle.slug}`}
              className="block group"
            >
              <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="lg:w-2/3">
                  <div className="relative aspect-video lg:aspect-[16/10] overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Top+Story';
                      }}
                    />
                  </div>
                </div>
                <div className="lg:w-1/3 flex flex-col justify-center p-6 lg:p-8">
                  <span className="inline-block px-3 py-1 text-xs font-bold text-blue-700 bg-blue-50 rounded-full uppercase tracking-wider mb-3">
                    {newsCategories.find((c) => c.slug === featuredArticle.category)?.name || featuredArticle.category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors line-clamp-3">
                    {featuredArticle.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Link
                      to={`/news/author/${featuredArticle.authorId}`}
                      className="font-medium hover:text-blue-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {teamProfiles.find((p) => p.id === featuredArticle.authorId)?.name}
                    </Link>
                    <span>·</span>
                    <time>{formatStaticDate(featuredArticle.datePublished)}</time>
                  </div>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* Headlines strip – Google News style (only when All) */}
        {selectedCategory === 'all' && headlinesStrip.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900">Headlines</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {headlinesStrip.map((article) => {
                const cat = newsCategories.find((c) => c.slug === article.category);
                return (
                  <Link
                    key={article.id}
                    to={`/news/${article.category}/${article.slug}`}
                    className="flex-shrink-0 w-64 sm:w-72 rounded-xl bg-white border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all group"
                  >
                    <div className="aspect-video overflow-hidden bg-slate-100">
                      <img
                        src={article.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=News';
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <span className="text-xs font-semibold text-blue-600 uppercase">{cat?.name || article.category}</span>
                      <h3 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 text-sm mt-1">
                        {article.title}
                      </h3>
                      <time className="text-xs text-slate-500 mt-1 block">{formatStaticShortDate(article.datePublished)}</time>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Section title + grid */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedCategory === 'all' ? 'Latest' : newsCategories.find((c) => c.slug === selectedCategory)?.name}
              </h2>
              <p className="text-slate-600 mt-1">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              </p>
            </div>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => handleCategoryChange('all')}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View all categories
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => {
              const author = teamProfiles.find((p) => p.id === article.authorId);
              const category = newsCategories.find((c) => c.slug === article.category);
              return (
                <Link
                  key={article.id}
                  to={`/news/${article.category}/${article.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all group"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=News';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 rounded-full uppercase">
                      {category?.name || article.category}
                    </span>
                    <h3 className="font-bold text-slate-900 mt-3 mb-2 line-clamp-3 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Link
                        to={`/news/author/${article.authorId}`}
                        className="font-medium hover:text-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {author?.name || 'MoneyCal'}
                      </Link>
                      <span>·</span>
                      <time>{formatStaticShortDate(article.datePublished)}</time>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-600 mb-4">No articles in this category.</p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
              >
                View all
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {(() => {
                const pages: number[] = [];
                let start = Math.max(1, currentPage - 2);
                let end = Math.min(totalPages, start + 4);
                if (end - start < 4) start = Math.max(1, end - 4);
                for (let i = start; i <= end; i++) pages.push(i);
                return pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`min-w-[40px] h-10 rounded-xl font-semibold text-sm ${
                      currentPage === p ? 'bg-blue-600 text-white' : 'border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ));
              })()}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default NewsHomePage;
