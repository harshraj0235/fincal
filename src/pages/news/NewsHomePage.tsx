import React from 'react';
import { Link } from 'react-router-dom';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { Clock, Calendar, TrendingUp } from 'lucide-react';

const NewsHomePage: React.FC = () => {
  // Group articles by category
  const articlesByCategory = contentRegistry.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, typeof contentRegistry>);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8" />
            <h1 className="text-4xl md:text-5xl font-bold">MoneyCal News</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Latest financial news, market updates, and investment insights in Hindi
          </p>
          <p className="text-blue-200 mt-2">
            भारतीय निवेशकों के लिए खास - Hinglish में पूरी जानकारी
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {newsCategories.map((category) => {
            const articleCount = articlesByCategory[category.slug]?.length || 0;
            return (
              <Link
                key={category.slug}
                to={`/news/${category.slug}`}
                className="p-6 bg-white rounded-xl border-2 border-neutral-200 hover:border-primary-600 hover:shadow-lg transition-all"
              >
                <h3 className="font-bold text-neutral-900 mb-2">{category.name}</h3>
                <p className="text-sm text-neutral-600 mb-3">{category.description}</p>
                <p className="text-xs text-primary-600 font-semibold">
                  {articleCount} Articles
                </p>
              </Link>
            );
          })}
        </div>

        {/* All Articles */}
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentRegistry.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.category}/${article.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center">
                <span className="text-6xl">📰</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary-600 uppercase">
                    {article.category}
                  </span>
                  {article.subCategory && (
                    <>
                      <span className="text-neutral-300">•</span>
                      <span className="text-xs text-neutral-500">
                        {article.subCategory}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(article.datePublished).toLocaleDateString('en-IN')}</span>
                  </div>
                  {article.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime} min read</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsHomePage;

