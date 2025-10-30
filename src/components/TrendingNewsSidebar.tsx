import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Eye, Clock } from 'lucide-react';
import { contentRegistry } from '../cms-content/contentRegistry';
import { formatStaticShortDate } from '../utils/randomCalculators';

/**
 * Trending News Sidebar
 * Shows trending/popular articles - standard news website feature
 */
export const TrendingNewsSidebar: React.FC = () => {
  // Get latest 10 articles sorted by date
  const trendingArticles = [...contentRegistry]
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 10);

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-neutral-100 overflow-hidden sticky top-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          Trending Now
        </h3>
      </div>

      {/* Trending List */}
      <div className="divide-y divide-neutral-100">
        {trendingArticles.map((article, index) => (
          <Link
            key={article.id}
            to={`/news/${article.category}/${article.slug}`}
            className="block p-4 hover:bg-neutral-50 transition-colors group"
          >
            <div className="flex gap-3">
              {/* Rank Number */}
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-black text-sm ${
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                index === 1 ? 'bg-gradient-to-br from-neutral-400 to-neutral-500 text-white' :
                index === 2 ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white' :
                'bg-neutral-200 text-neutral-700'
              }`}>
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-neutral-900 line-clamp-2 mb-1.5 group-hover:text-indigo-600 transition-colors leading-snug">
                  {article.title}
                </h4>
                
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatStaticShortDate(article.datePublished)}
                  </span>
                  <span className="text-neutral-300">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {Math.floor(Math.random() * 5000) + 1000}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All */}
      <Link
        to="/news"
        className="block p-4 bg-neutral-50 text-center font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
      >
        View All Articles →
      </Link>
    </div>
  );
};

export default TrendingNewsSidebar;

