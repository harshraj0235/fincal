import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ExternalLink,
  Bookmark,
  Share2,
  Eye,
  Tag,
  Calendar,
  Globe,
  AlertCircle,
  CheckCircle,
  Info,
  RefreshCw
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  views: number;
  impact: 'high' | 'medium' | 'low';
  sentiment: 'positive' | 'negative' | 'neutral';
  imageUrl?: string;
  url: string;
}

interface NewsCategory {
  id: string;
  name: string;
  count: number;
  color: string;
}

const FinancialNewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchNewsData();
  }, [selectedCategory]);

  const fetchNewsData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockArticles: NewsArticle[] = [
        {
          id: '1',
          title: 'RBI Maintains Repo Rate at 6.5% - Impact on Home Loans and Investments',
          summary: 'The Reserve Bank of India keeps the repo rate unchanged at 6.5% for the fourth consecutive time, providing stability to borrowers and investors.',
          content: 'The Reserve Bank of India (RBI) has decided to maintain the repo rate at 6.5% in its latest monetary policy meeting...',
          author: 'Economic Times',
          source: 'Economic Times',
          publishedAt: new Date().toISOString(),
          category: 'Monetary Policy',
          tags: ['RBI', 'Repo Rate', 'Home Loans', 'Interest Rates'],
          readTime: 5,
          views: 15420,
          impact: 'high',
          sentiment: 'neutral',
          imageUrl: 'https://moneycal.in/images/news/rbi-policy.jpg',
          url: '/news/rbi-repo-rate-maintained'
        },
        {
          id: '2',
          title: 'Nifty 50 Hits New All-Time High - Market Rally Continues',
          summary: 'Indian equity markets continue their upward trajectory with Nifty 50 reaching new record levels, driven by strong corporate earnings and positive global cues.',
          content: 'The Nifty 50 index has reached a new all-time high of 24,567 points, continuing the strong market rally...',
          author: 'Business Standard',
          source: 'Business Standard',
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          category: 'Equity Markets',
          tags: ['Nifty 50', 'Stock Market', 'All Time High', 'Market Rally'],
          readTime: 4,
          views: 12850,
          impact: 'high',
          sentiment: 'positive',
          imageUrl: 'https://moneycal.in/images/news/nifty-high.jpg',
          url: '/news/nifty-all-time-high'
        },
        {
          id: '3',
          title: 'Gold Prices Decline 2% - Investment Opportunities Emerge',
          summary: 'Gold prices have fallen by 2% in the domestic market, creating potential investment opportunities for long-term investors.',
          content: 'Gold prices in the domestic market have declined by approximately 2% over the past week...',
          author: 'Financial Express',
          source: 'Financial Express',
          publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          category: 'Commodities',
          tags: ['Gold', 'Commodities', 'Investment', 'Price Decline'],
          readTime: 3,
          views: 9650,
          impact: 'medium',
          sentiment: 'neutral',
          imageUrl: 'https://moneycal.in/images/news/gold-prices.jpg',
          url: '/news/gold-prices-decline'
        },
        {
          id: '4',
          title: 'Bitcoin Surges 15% - Cryptocurrency Market Recovery',
          summary: 'Bitcoin has gained 15% in the past 24 hours, leading a broader cryptocurrency market recovery with increased institutional interest.',
          content: 'Bitcoin has experienced a significant surge of 15% in the past 24 hours, reaching new monthly highs...',
          author: 'CoinDesk India',
          source: 'CoinDesk India',
          publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          category: 'Cryptocurrency',
          tags: ['Bitcoin', 'Cryptocurrency', 'Market Recovery', 'Institutional Investment'],
          readTime: 6,
          views: 18750,
          impact: 'medium',
          sentiment: 'positive',
          imageUrl: 'https://moneycal.in/images/news/bitcoin-surge.jpg',
          url: '/news/bitcoin-surge-15-percent'
        },
        {
          id: '5',
          title: 'Government Announces New Tax Benefits for Home Buyers',
          summary: 'The government has introduced new tax incentives for first-time home buyers, including increased deduction limits and reduced stamp duty.',
          content: 'In a move to boost the real estate sector, the government has announced new tax benefits...',
          author: 'Hindu Business Line',
          source: 'Hindu Business Line',
          publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          category: 'Tax Policy',
          tags: ['Tax Benefits', 'Home Buyers', 'Real Estate', 'Government Policy'],
          readTime: 7,
          views: 11200,
          impact: 'high',
          sentiment: 'positive',
          imageUrl: 'https://moneycal.in/images/news/tax-benefits.jpg',
          url: '/news/tax-benefits-home-buyers'
        },
        {
          id: '6',
          title: 'Mutual Fund SIP Inflows Reach Record High in December',
          summary: 'Systematic Investment Plan (SIP) inflows in mutual funds have reached a record high of ₹17,610 crore in December 2024.',
          content: 'Mutual fund SIP inflows have reached a new record high of ₹17,610 crore in December 2024...',
          author: 'Moneycontrol',
          source: 'Moneycontrol',
          publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          category: 'Mutual Funds',
          tags: ['SIP', 'Mutual Funds', 'Record High', 'Investment'],
          readTime: 4,
          views: 8750,
          impact: 'medium',
          sentiment: 'positive',
          imageUrl: 'https://moneycal.in/images/news/sip-inflows.jpg',
          url: '/news/sip-inflows-record-high'
        }
      ];

      const mockCategories: NewsCategory[] = [
        { id: 'all', name: 'All News', count: mockArticles.length, color: 'bg-gray-500' },
        { id: 'Monetary Policy', name: 'Monetary Policy', count: mockArticles.filter(a => a.category === 'Monetary Policy').length, color: 'bg-blue-500' },
        { id: 'Equity Markets', name: 'Equity Markets', count: mockArticles.filter(a => a.category === 'Equity Markets').length, color: 'bg-green-500' },
        { id: 'Commodities', name: 'Commodities', count: mockArticles.filter(a => a.category === 'Commodities').length, color: 'bg-yellow-500' },
        { id: 'Cryptocurrency', name: 'Cryptocurrency', count: mockArticles.filter(a => a.category === 'Cryptocurrency').length, color: 'bg-purple-500' },
        { id: 'Tax Policy', name: 'Tax Policy', count: mockArticles.filter(a => a.category === 'Tax Policy').length, color: 'bg-red-500' },
        { id: 'Mutual Funds', name: 'Mutual Funds', count: mockArticles.filter(a => a.category === 'Mutual Funds').length, color: 'bg-indigo-500' }
      ];

      setArticles(mockArticles);
      setCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  };

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getSentimentIcon = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Newspaper className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Financial News</h2>
              <p className="text-sm text-gray-600">Latest updates from Indian financial markets</p>
            </div>
          </div>
          <button 
            onClick={fetchNewsData}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Refresh news"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* News Articles */}
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {article.imageUrl && (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(article.impact)}`}>
                            {article.impact.toUpperCase()} IMPACT
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {article.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getSentimentIcon(article.sentiment)}
                          <button 
                            onClick={() => toggleBookmark(article.id)}
                            className={`p-1 rounded transition-colors ${
                              bookmarkedArticles.has(article.id) 
                                ? 'text-blue-600' 
                                : 'text-gray-400 hover:text-blue-600'
                            }`}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        <Link to={article.url}>{article.title}</Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.summary}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4" />
                            {article.source}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatTimeAgo(article.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {article.readTime} min read
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                          <Link
                            to={article.url}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                            Read More
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Load More */}
      {!isLoading && filteredArticles.length > 0 && (
        <div className="p-6 border-t border-gray-200 text-center">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Load More News
          </button>
        </div>
      )}
    </div>
  );
};

export default FinancialNewsFeed;
