import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ExternalLink, 
  Filter,
  Search,
  Calendar,
  Globe,
  AlertCircle
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
  imageUrl?: string;
}

interface StockNewsProps {
  symbol?: string;
  onClose?: () => void;
}

const StockNews: React.FC<StockNewsProps> = ({ symbol, onClose }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock news data - in real implementation, this would come from a news API
  const mockNewsData: NewsItem[] = [
    {
      id: '1',
      title: 'Nifty 50 Hits New All-Time High as Banking Stocks Rally',
      description: 'The Nifty 50 index surged to a new record high today, driven by strong performance in banking and financial services stocks. HDFC Bank and ICICI Bank led the gains.',
      url: 'https://example.com/news1',
      publishedAt: '2024-01-15T10:30:00Z',
      source: 'Economic Times',
      sentiment: 'positive',
      category: 'market-update'
    },
    {
      id: '2',
      title: 'RBI Announces New Guidelines for Digital Banking',
      description: 'The Reserve Bank of India has introduced new regulations for digital banking services, focusing on enhanced security and customer protection measures.',
      url: 'https://example.com/news2',
      publishedAt: '2024-01-15T09:15:00Z',
      source: 'Business Standard',
      sentiment: 'neutral',
      category: 'regulatory'
    },
    {
      id: '3',
      title: 'Tech Stocks Face Pressure Amid Global Market Volatility',
      description: 'Information technology stocks experienced selling pressure as global markets reacted to economic uncertainty and inflation concerns.',
      url: 'https://example.com/news3',
      publishedAt: '2024-01-15T08:45:00Z',
      source: 'Moneycontrol',
      sentiment: 'negative',
      category: 'sector-news'
    },
    {
      id: '4',
      title: 'Reliance Industries Reports Strong Q3 Results',
      description: 'Reliance Industries Limited announced better-than-expected quarterly results, with significant growth in its digital and retail segments.',
      url: 'https://example.com/news4',
      publishedAt: '2024-01-15T07:30:00Z',
      source: 'Financial Express',
      sentiment: 'positive',
      category: 'earnings'
    },
    {
      id: '5',
      title: 'SEBI Introduces New Framework for ESG Investing',
      description: 'The Securities and Exchange Board of India has launched a comprehensive framework to promote environmental, social, and governance (ESG) investing.',
      url: 'https://example.com/news5',
      publishedAt: '2024-01-15T06:20:00Z',
      source: 'Livemint',
      sentiment: 'positive',
      category: 'regulatory'
    },
    {
      id: '6',
      title: 'FMCG Sector Shows Resilience Amid Economic Challenges',
      description: 'Fast-moving consumer goods companies continue to demonstrate strong performance, with stable demand across rural and urban markets.',
      url: 'https://example.com/news6',
      publishedAt: '2024-01-15T05:10:00Z',
      source: 'Economic Times',
      sentiment: 'positive',
      category: 'sector-news'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNews(mockNewsData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredNews = news.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50';
      case 'negative': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-4 h-4" />;
      case 'negative': return <TrendingDown className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'market-update', label: 'Market Updates' },
    { value: 'earnings', label: 'Earnings' },
    { value: 'regulatory', label: 'Regulatory' },
    { value: 'sector-news', label: 'Sector News' }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Newspaper className="h-6 w-6 mr-2 text-blue-600" />
            Market News
            {symbol && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                for {symbol}
              </span>
            )}
          </h2>
          <p className="text-gray-600 mt-1">Latest financial news and market updates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <div className="flex items-start space-x-4">
                {/* News Image */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Newspaper className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* News Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* Meta Information */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          {item.source}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(item.publishedAt)}
                        </div>
                        <div className={`flex items-center px-2 py-1 rounded-full ${getSentimentColor(item.sentiment)}`}>
                          {getSentimentIcon(item.sentiment)}
                          <span className="ml-1 capitalize">{item.sentiment}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0 ml-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Read
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <Newspaper className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {filteredNews.length > 0 && (
        <div className="mt-6 text-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Load More News
          </button>
        </div>
      )}

      {/* News Categories Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">News Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(1).map((category) => (
            <div key={category.value} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {news.filter(item => item.category === category.value).length}
              </div>
              <div className="text-sm text-gray-600">{category.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockNews;
