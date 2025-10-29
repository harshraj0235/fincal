import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { contentRegistry } from '../../cms-content/contentRegistry';
import { newsCategories } from '../../data/newsCategories';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';

const NewsCategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const category = newsCategories.find(cat => cat.slug === categorySlug);
  const articles = contentRegistry.filter(article => article.category === categorySlug);

  if (!category || articles.length === 0) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/news"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All News
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{category.name}</h1>
          <p className="text-xl text-blue-100">{category.description}</p>
          <p className="text-blue-200 mt-2">{articles.length} Articles</p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.category}/${article.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center">
                <span className="text-6xl">📰</span>
              </div>
              <div className="p-6">
                {article.subCategory && (
                  <span className="text-xs font-semibold text-primary-600 uppercase block mb-2">
                    {article.subCategory}
                  </span>
                )}
                <h2 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>
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
                      <span>{article.readTime} min</span>
                    </div>
                  )}
                </div>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCategoryPage;

