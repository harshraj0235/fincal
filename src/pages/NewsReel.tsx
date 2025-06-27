import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { NewsItem, getNews, formatDate, truncateText } from '../utils/newsUtils';
import SEOHelmet from '../components/SEOHelmet';

const NewsReel: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const newsData = await getNews();
      setNews(newsData);
      setLastFetch(Date.now());
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentIndex < news.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'down' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      handleSwipe('up');
    } else if (e.key === 'ArrowDown') {
      handleSwipe('down');
    }
  };

  // SEO structured data
  const newsStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Latest Finance News Reel - Indian Stock Market, Business & Crypto Updates",
    "description": "Stay updated with the latest finance news from India. Real-time updates on Sensex, Nifty, stock market, business news, and cryptocurrency trends. Swipeable news reel format for mobile-friendly reading.",
    "url": "https://moneycal.in/news-reel",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Finance News",
      "description": "Latest finance and business news from top Indian sources",
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
          description="Stay updated with the latest finance news from India. Real-time updates on Sensex, Nifty, stock market, business news, and cryptocurrency trends."
          keywords="finance news india, stock market news, sensex nifty updates, business news india, crypto news, moneycontrol, economic times, business standard"
          url="/news-reel"
          structuredData={newsStructuredData}
          tags={["finance news", "stock market", "business news", "crypto news", "sensex", "nifty"]}
        />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Loading Latest Finance News...</h2>
            <p className="text-gray-500 mt-2">Fetching the most recent updates from top sources</p>
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
          description="Stay updated with the latest finance news from India. Real-time updates on Sensex, Nifty, stock market, business news, and cryptocurrency trends."
          keywords="finance news india, stock market news, sensex nifty updates, business news india, crypto news, moneycontrol, economic times, business standard"
          url="/news-reel"
          structuredData={newsStructuredData}
          tags={["finance news", "stock market", "business news", "crypto news", "sensex", "nifty"]}
        />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Unable to Load News</h2>
            <p className="text-gray-500 mb-4">{error}</p>
            <button 
              onClick={fetchNews}
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
        description="Stay updated with the latest finance news from India. Real-time updates on Sensex, Nifty, stock market, business news, and cryptocurrency trends."
        keywords="finance news india, stock market news, sensex nifty updates, business news india, crypto news, moneycontrol, economic times, business standard"
        url="/news-reel"
        structuredData={newsStructuredData}
        tags={["finance news", "stock market", "business news", "crypto news", "sensex", "nifty"]}
      />
      <div 
        className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 relative overflow-hidden"
        onKeyDown={handleKeyPress}
        tabIndex={0}
      >
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold text-gray-800">Finance News Reel</h1>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {currentIndex + 1} of {news.length}
                </span>
                <button 
                  onClick={fetchNews}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Refresh news"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* News Container */}
        <div 
          ref={containerRef}
          className="pt-16 pb-20 h-screen overflow-y-auto snap-y snap-mandatory"
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
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 relative">
                    <img 
                      src={item.urlToImage} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
                
                {/* News Content */}
                <div className="p-6">
                  {/* Source and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {item.source}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {truncateText(item.description, 250)}
                  </p>

                  {/* Read More Button */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Read Full Article
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
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
      </div>
    </>
  );
};

export default NewsReel; 