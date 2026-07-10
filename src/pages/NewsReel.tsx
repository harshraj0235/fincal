import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, ChevronDown, ExternalLink, RefreshCw, AlertCircle, Share2, Wifi, WifiOff } from 'lucide-react';
import { NewsItem, getNews, formatDate, truncateText, isMobile, startAutoRefresh } from '../utils/newsUtils';
import SEOHelmet from '../components/SEOHelmet';

const NewsReel: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [nextRefreshIn, setNextRefreshIn] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const autoRefreshCleanup = useRef<(() => void) | null>(null);

  const fetchNews = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const newsData = await getNews();
      setNews(newsData);
      setLastFetch(Date.now());
      setNextRefreshIn(10); // Reset countdown
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefreshEnabled) {
      autoRefreshCleanup.current = startAutoRefresh((updatedNews) => {
        setNews(updatedNews);
        setLastFetch(Date.now());
        setNextRefreshIn(10);
      });
    }

    return () => {
      if (autoRefreshCleanup.current) {
        autoRefreshCleanup.current();
      }
    };
  }, [autoRefreshEnabled]);

  // Countdown timer for next refresh
  useEffect(() => {
    if (!autoRefreshEnabled) return;

    const interval = setInterval(() => {
      setNextRefreshIn((prev) => {
        if (prev <= 1) {
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefreshEnabled]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSwipe = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < news.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex, news.length]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      handleSwipe('up');
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      handleSwipe('down');
    }
  }, [handleSwipe]);

  // Touch gesture handling for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handleSwipe('up');
      } else {
        handleSwipe('down');
      }
    }
  }, [handleSwipe]);

  // Share functionality
  const handleShare = useCallback(async (item: NewsItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: item.url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${item.title}\n\n${item.description}\n\nRead more: ${item.url}`);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  }, []);

  // Toggle auto-refresh
  const toggleAutoRefresh = useCallback(() => {
    setAutoRefreshEnabled(prev => !prev);
    if (autoRefreshCleanup.current) {
      autoRefreshCleanup.current();
      autoRefreshCleanup.current = null;
    }
  }, []);

  // SEO structured data
  const newsStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Latest Finance News Reel - Indian Stock Market, Business & Crypto Updates",
    "description": "Stay updated with the latest finance news from India. Real-time updates on Sensex, Nifty, stock market, business news, and cryptocurrency trends. Unlimited content from free Indian news sources with auto-refresh every 10 seconds.",
    "url": "/news-reel",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Finance News",
      "description": "Latest finance and business news from multiple Indian news sources",
      "numberOfItems": news.length,
      "itemListElement": news.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": item.title,
          "description": item.description,
          "url": item.url,
          "author": {
            "@type": "Organization",
            "name": item.source
          },
          "publisher": {
            "@type": "Organization",
            "name": item.source
          },
          "datePublished": item.publishedAt,
          "image": item.urlToImage
        }
      }))
    }
  };

  if (loading) {
    return (
      <>
        <SEOHelmet
          title="Latest Finance News Reel - Indian Stock Market & Business Updates"
          description="Stay updated with the latest finance news from India. Real-time updates on Sensex, Nifty, stock market, business news, and cryptocurrency trends. Unlimited content from free Indian news sources with auto-refresh every 10 seconds."
          keywords="finance news india, stock market news, sensex nifty updates, business news india, crypto news, indian news sources, real-time finance updates, moneycontrol, economic times, business standard"
          url="/news-reel"
          structuredData={newsStructuredData}
          tags={["finance news", "stock market", "business news", "crypto news", "sensex", "nifty", "indian news sources"]}
        />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Loading Latest Finance News...</h2>
            <p className="text-gray-500 mt-2">Fetching the most recent updates from Indian news sources</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEOHelmet
          title="Latest Finance News Reel - Indian Stock Market & Business Updates"
          description="Stay updated with the latest finance news from India. Real-time updates on Sensex, Nifty, stock market, business news, and cryptocurrency trends. Unlimited content from free Indian news sources with auto-refresh every 10 seconds."
          keywords="finance news india, stock market news, sensex nifty updates, business news india, crypto news, indian news sources, real-time finance updates, moneycontrol, economic times, business standard"
          url="/news-reel"
          structuredData={newsStructuredData}
          tags={["finance news", "stock market", "business news", "crypto news", "sensex", "nifty", "indian news sources"]}
        />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Unable to Load News</h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <button 
              onClick={() => fetchNews(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHelmet
        title="Latest Finance News Reel - Indian Stock Market & Business Updates"
        description="Stay updated with the latest finance news from India. Real-time updates on Sensex, Nifty, stock market, business news, and cryptocurrency trends. Unlimited content from free Indian news sources with auto-refresh every 10 seconds."
        keywords="finance news india, stock market news, sensex nifty updates, business news india, crypto news, indian news sources, real-time finance updates, moneycontrol, economic times, business standard"
        url="/news-reel"
        structuredData={newsStructuredData}
        tags={["finance news", "stock market", "business news", "crypto news", "sensex", "nifty", "indian news sources"]}
      />
      <div 
        className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 relative overflow-hidden"
        onKeyDown={handleKeyPress}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
      >
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-gray-800">Finance News Reel</h1>
                <span className="text-xs text-gray-500">
                  {currentIndex + 1} of {news.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Auto-refresh indicator */}
                <div className="flex items-center space-x-1">
                  {autoRefreshEnabled ? (
                    <Wifi className="w-4 h-4 text-green-600" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-xs text-gray-500">
                    {autoRefreshEnabled ? `${nextRefreshIn}s` : 'Off'}
                  </span>
                </div>
                
                {/* Auto-refresh toggle */}
                <button
                  onClick={toggleAutoRefresh}
                  className={`p-2 rounded-full transition-colors ${
                    autoRefreshEnabled 
                      ? 'text-green-600 hover:text-green-700' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title={autoRefreshEnabled ? 'Disable auto-refresh' : 'Enable auto-refresh'}
                >
                  <RefreshCw className={`w-4 h-4 ${autoRefreshEnabled && isRefreshing ? 'animate-spin' : ''}`} />
                </button>
                
                {/* Manual refresh */}
                <button 
                  onClick={() => fetchNews(true)}
                  disabled={isRefreshing}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
                  title="Refresh news"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* News Container */}
        <div 
          ref={containerRef}
          className="pt-16 pb-20 h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        >
          {news.map((item, index) => (
            <div
              key={item.id}
              className={`min-h-screen flex flex-col justify-center snap-start p-4 ${
                index === currentIndex ? 'opacity-100' : 'opacity-50'
              } transition-opacity duration-300`}
            >
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* News Image */}
                {item.urlToImage && (
                  <div className="h-48 sm:h-56 bg-gradient-to-br from-blue-400 to-purple-600 relative">
                    <img 
                      src={item.urlToImage} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
                
                {/* News Content */}
                <div className="p-4 sm:p-6">
                  {/* Source and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                      {item.source}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 leading-tight">
                    {item.title}
                  </h2>

                  {/* Description - Exactly 250 words */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                    {truncateText(item.content, 250)}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mb-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                    <button
                      onClick={() => handleShare(item)}
                      className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                      title="Share article"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls - Hidden on mobile, shown on larger screens */}
        {!isMobile() && (
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 space-y-2">
            <button
              onClick={() => handleSwipe('down')}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full shadow-lg transition-all ${
                currentIndex === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-110'
              }`}
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleSwipe('up')}
              disabled={currentIndex === news.length - 1}
              className={`p-3 rounded-full shadow-lg transition-all ${
                currentIndex === news.length - 1 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:scale-110'
              }`}
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex space-x-1">
            {news.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="fixed bottom-4 right-4 z-40">
          <p className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
            Updated: {formatDate(new Date(lastFetch).toISOString())}
          </p>
        </div>

        {/* Mobile Swipe Instructions */}
        {isMobile() && (
          <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-40">
            <p className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
              Swipe up/down to navigate
            </p>
          </div>
        )}

        {/* Auto-refresh status */}
        <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40">
          <div className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
            {autoRefreshEnabled ? (
              <span className="flex items-center space-x-1">
                <Wifi className="w-3 h-3 text-green-600" />
                <span>Auto-refresh: {nextRefreshIn}s</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1">
                <WifiOff className="w-3 h-3 text-gray-400" />
                <span>Auto-refresh: Off</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsReel; 
