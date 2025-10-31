import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, X } from 'lucide-react';
import { contentRegistry } from '../cms-content/contentRegistry';

/**
 * Breaking News Banner
 * Sticky top banner showing latest breaking news
 * Standard feature on major news websites (CNN, BBC, Times of India)
 */
export const BreakingNewsBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get latest 3 articles for rotation
  const breakingNews = [...contentRegistry]
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, 3);

  // Auto-rotate breaking news every 5 seconds
  useEffect(() => {
    if (breakingNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [breakingNews.length]);

  if (!visible || breakingNews.length === 0) return null;

  const currentNews = breakingNews[currentIndex];

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Breaking News Badge */}
          <div className="flex-shrink-0 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <Zap className="h-5 w-5 text-yellow-300 animate-pulse" fill="currentColor" />
            <span className="font-black text-sm uppercase tracking-wider">Breaking</span>
          </div>

          {/* News Content - Clickable */}
          <Link
            to={`/news/${currentNews.category}/${currentNews.slug}`}
            className="flex-1 min-w-0"
          >
            <p className="font-bold text-sm sm:text-base truncate hover:underline">
              {currentNews.title}
            </p>
          </Link>

          {/* Rotation Indicator */}
          {breakingNews.length > 1 && (
            <div className="hidden sm:flex items-center gap-1.5">
              {breakingNews.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => setVisible(false)}
            className="flex-shrink-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close breaking news"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;



