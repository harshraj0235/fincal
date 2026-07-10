import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Eye, Clock, Flame } from 'lucide-react';
import { contentRegistry } from '../cms-content/contentRegistry';
import { formatStaticShortDate } from '../utils/randomCalculators';

/**
 * Smart Trending News Sidebar
 * Context-aware: Shows trending articles related to current article + latest
 * Powerful algorithm combining relevance, recency, and popularity
 */
interface TrendingNewsSidebarProps {
  currentArticle?: {
    id: string;
    title: string;
    category: string;
  };
}

export const TrendingNewsSidebar: React.FC<TrendingNewsSidebarProps> = ({ currentArticle }) => {
  // Smart trending algorithm: relevance + recency + popularity
  const trendingArticles = [...contentRegistry]
    .filter(a => currentArticle ? a.id !== currentArticle.id : true)
    .map(article => {
      let trendingScore = 0;
      
      // Recency boost (latest articles score higher)
      const daysSincePublished = (new Date().getTime() - new Date(article.datePublished).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePublished < 1) trendingScore += 15; // Published today
      else if (daysSincePublished < 7) trendingScore += 10; // Last week
      else if (daysSincePublished < 30) trendingScore += 5; // Last month
      
      // Topic relevance (if current article provided)
      if (currentArticle) {
        // Same category gets huge boost
        if (article.category === currentArticle.category) {
          trendingScore += 12;
        }
        
        // Title keyword overlap (semantic relevance)
        const currentWords = currentArticle.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const articleWords = article.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        const commonWords = currentWords.filter(w => articleWords.includes(w));
        trendingScore += commonWords.length * 4; // Higher weight for keyword match
        
        // Hot topics bonus (India, AI, Startup, Market, etc.)
        const hotTopics = ['india', 'market', 'startup', 'growth', 'crore', 'billion', 'economy'];
        const hasHotTopic = articleWords.some(w => hotTopics.includes(w));
        if (hasHotTopic) trendingScore += 3;
      }
      
      // Simulated popularity (view count proxy)
      const simulatedViews = Math.floor(Math.random() * 5000) + 1000;
      trendingScore += Math.floor(simulatedViews / 500); // Views boost
      
      return { ...article, trendingScore, simulatedViews };
    })
    .sort((a, b) => b.trendingScore - a.trendingScore)
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

      {/* Trending List - Context-Aware */}
      <div className="divide-y divide-neutral-100">
        {trendingArticles.map((article, index) => {
          const isVeryHot = article.trendingScore > 25; // Super relevant + recent
          const isHot = article.trendingScore > 18; // Relevant + recent
          
          return (
            <Link
              key={article.id}
              to={`/news/${article.category}/${article.slug}`}
              className="block p-4 hover:bg-neutral-50 transition-colors group"
            >
              <div className="flex gap-3">
                {/* Rank Number with Hotness Indicator */}
                <div className={`relative flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-black text-sm ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' :
                  index === 1 ? 'bg-gradient-to-br from-neutral-400 to-neutral-500 text-white' :
                  index === 2 ? 'bg-gradient-to-br from-orange-600 to-orange-700 text-white' :
                  'bg-neutral-200 text-neutral-700'
                }`}>
                  {index + 1}
                  {/* Hot indicator for very relevant articles */}
                  {isVeryHot && (
                    <div className="absolute -top-1 -right-1">
                      <Flame className="h-4 w-4 text-red-500 drop-shadow-lg" fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-neutral-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-snug flex-1">
                      {article.title}
                    </h4>
                    {/* Relevance indicator */}
                    {isHot && (
                      <span className="flex-shrink-0 text-xs font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        HOT
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatStaticShortDate(article.datePublished)}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.simulatedViews.toLocaleString()}
                    </span>
                    {/* Topic match indicator */}
                    {currentArticle && article.category === currentArticle.category && (
                      <>
                        <span className="text-neutral-300">•</span>
                        <span className="text-indigo-600 font-semibold">Related</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All */}
      <Link
        to="/news" reloadDocument
        className="block p-4 bg-neutral-50 text-center font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
      >
        View All Articles →
      </Link>
    </div>
  );
};

export default TrendingNewsSidebar;

