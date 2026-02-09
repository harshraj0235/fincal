import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  DollarSign, 
  Globe,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle,
  Info,
  ArrowRight,
  RefreshCw,
  Download,
  Share2,
  Bookmark,
  Eye,
  Users,
  Clock,
  Star,
  Zap,
  Shield,
  Lightbulb,
  Activity,
  LineChart
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import AdvancedSEO from '../components/AdvancedSEO';

interface MarketTrend {
  id: string;
  name: string;
  currentValue: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  prediction: {
    shortTerm: 'bullish' | 'bearish' | 'neutral';
    mediumTerm: 'bullish' | 'bearish' | 'neutral';
    longTerm: 'bullish' | 'bearish' | 'neutral';
  };
  confidence: number;
  lastUpdated: string;
}

interface MarketAnalysis {
  id: string;
  title: string;
  summary: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  date: string;
  author: string;
  readTime: number;
  views: number;
  tags: string[];
}

const MarketAnalysis: React.FC = () => {
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trends' | 'analysis' | 'predictions'>('trends');

  useEffect(() => {
    fetchMarketData();
  }, [selectedTimeframe]);

  const fetchMarketData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMarketTrends([
        {
          id: 'nifty50',
          name: 'Nifty 50',
          currentValue: 24567.89,
          change: 125.45,
          changePercent: 0.51,
          trend: 'up',
          prediction: {
            shortTerm: 'bullish',
            mediumTerm: 'bullish',
            longTerm: 'neutral'
          },
          confidence: 78,
          lastUpdated: new Date().toLocaleTimeString('en-IN')
        },
        {
          id: 'sensex',
          name: 'Sensex',
          currentValue: 81234.56,
          change: 234.12,
          changePercent: 0.29,
          trend: 'up',
          prediction: {
            shortTerm: 'bullish',
            mediumTerm: 'neutral',
            longTerm: 'bullish'
          },
          confidence: 72,
          lastUpdated: new Date().toLocaleTimeString('en-IN')
        },
        {
          id: 'gold',
          name: 'Gold (₹/10g)',
          currentValue: 62500,
          change: -250,
          changePercent: -0.40,
          trend: 'down',
          prediction: {
            shortTerm: 'bearish',
            mediumTerm: 'neutral',
            longTerm: 'bullish'
          },
          confidence: 65,
          lastUpdated: new Date().toLocaleTimeString('en-IN')
        },
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          currentValue: 4250000,
          change: 125000,
          changePercent: 3.02,
          trend: 'up',
          prediction: {
            shortTerm: 'bullish',
            mediumTerm: 'bullish',
            longTerm: 'neutral'
          },
          confidence: 82,
          lastUpdated: new Date().toLocaleTimeString('en-IN')
        },
        {
          id: 'dollar',
          name: 'USD/INR',
          currentValue: 83.45,
          change: -0.12,
          changePercent: -0.14,
          trend: 'down',
          prediction: {
            shortTerm: 'bearish',
            mediumTerm: 'neutral',
            longTerm: 'neutral'
          },
          confidence: 70,
          lastUpdated: new Date().toLocaleTimeString('en-IN')
        },
        {
          id: 'silver',
          name: 'Silver (₹/kg)',
          currentValue: 78500,
          change: 450,
          changePercent: 0.58,
          trend: 'up',
          prediction: {
            shortTerm: 'bullish',
            mediumTerm: 'bullish',
            longTerm: 'bullish'
          },
          confidence: 75,
          lastUpdated: new Date().toLocaleTimeString('en-IN')
        }
      ]);

      setMarketAnalysis([
        {
          id: '1',
          title: 'RBI Monetary Policy Impact on Equity Markets',
          summary: 'Analysis of RBI\'s latest monetary policy decisions and their impact on equity markets, banking stocks, and overall market sentiment.',
          impact: 'high',
          category: 'Monetary Policy',
          date: '2025-01-15',
          author: 'Market Research Team',
          readTime: 8,
          views: 15420,
          tags: ['RBI', 'Monetary Policy', 'Equity Markets', 'Banking']
        },
        {
          id: '2',
          title: 'Global Inflation Trends and Indian Market Response',
          summary: 'Comprehensive analysis of global inflation patterns and how Indian markets are responding to international economic conditions.',
          impact: 'high',
          category: 'Global Economics',
          date: '2025-01-14',
          author: 'Economic Analysis Team',
          readTime: 12,
          views: 12850,
          tags: ['Inflation', 'Global Markets', 'Economic Trends']
        },
        {
          id: '3',
          title: 'Technology Sector Growth and Investment Opportunities',
          summary: 'Deep dive into technology sector performance, emerging trends, and investment opportunities in Indian tech companies.',
          impact: 'medium',
          category: 'Sector Analysis',
          date: '2025-01-13',
          author: 'Sector Research Team',
          readTime: 10,
          views: 9650,
          tags: ['Technology', 'Sector Analysis', 'Investment']
        },
        {
          id: '4',
          title: 'Cryptocurrency Market Volatility and Regulatory Updates',
          summary: 'Analysis of recent cryptocurrency market movements and regulatory developments affecting digital assets in India.',
          impact: 'medium',
          category: 'Cryptocurrency',
          date: '2025-01-12',
          author: 'Crypto Research Team',
          readTime: 6,
          views: 18750,
          tags: ['Cryptocurrency', 'Regulation', 'Volatility']
        },
        {
          id: '5',
          title: 'Real Estate Market Trends and Investment Outlook',
          summary: 'Comprehensive analysis of real estate market trends, pricing patterns, and investment opportunities across major Indian cities.',
          impact: 'medium',
          category: 'Real Estate',
          date: '2025-01-11',
          author: 'Real Estate Research Team',
          readTime: 9,
          views: 11200,
          tags: ['Real Estate', 'Investment', 'Market Trends']
        }
      ]);

      setIsLoading(false);
    }, 1500);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPredictionColor = (prediction: 'bullish' | 'bearish' | 'neutral') => {
    switch (prediction) {
      case 'bullish':
        return 'text-green-600 bg-green-50';
      case 'bearish':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  const formatCurrency = (num: number) => {
    return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  return (
    <>
      <SEOHelmet
        title="Market Analysis & Trends - Real-time Financial Market Insights"
        description="Comprehensive market analysis, trend predictions, and real-time insights for Indian financial markets. Expert analysis on Nifty, Sensex, Gold, Bitcoin, and more."
        keywords="market analysis, stock market trends, nifty 50 analysis, sensex prediction, gold price analysis, bitcoin trends, market insights, financial market research"
        url="/market-analysis"
        image="https://moneycal.in/images/market-analysis.jpg"
      />
      <AdvancedSEO
        pageType="hub"
        title="Market Analysis & Trends - Real-time Financial Market Insights"
        description="Comprehensive market analysis, trend predictions, and real-time insights for Indian financial markets. Expert analysis on Nifty, Sensex, Gold, Bitcoin, and more."
        url="/market-analysis"
        keywords="market analysis, stock market trends, nifty 50 analysis, sensex prediction, gold price analysis, bitcoin trends, market insights, financial market research, equity analysis, commodity trends"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Market Analysis &
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                    {' '}Trend Insights
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Real-time market analysis, trend predictions, and expert insights for informed investment decisions. 
                  Stay ahead with comprehensive market intelligence.
                </p>
              </motion.div>

              {/* Timeframe Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
                  {(['1D', '1W', '1M', '3M', '1Y'] as const).map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedTimeframe === timeframe
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
              {[
                { id: 'trends', label: 'Market Trends', icon: <TrendingUp className="h-4 w-4" /> },
                { id: 'analysis', label: 'Expert Analysis', icon: <BarChart3 className="h-4 w-4" /> },
                { id: 'predictions', label: 'Predictions', icon: <Target className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <AnimatePresence mode="wait">
            {activeTab === 'trends' && (
              <motion.div
                key="trends"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    [...Array(6)].map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    ))
                  ) : (
                    marketTrends.map((trend) => (
                      <div key={trend.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{trend.name}</h3>
                          {getTrendIcon(trend.trend)}
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-2xl font-bold text-gray-900">
                            {trend.id === 'bitcoin' ? formatCurrency(trend.currentValue) : 
                             trend.id === 'dollar' ? `₹${trend.currentValue}` :
                             formatCurrency(trend.currentValue)}
                          </p>
                          <div className={`flex items-center mt-1 ${
                            trend.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {trend.change >= 0 ? 
                              <TrendingUp className="h-4 w-4 mr-1" /> : 
                              <TrendingDown className="h-4 w-4 mr-1" />
                            }
                            <span className="text-sm font-medium">
                              {formatNumber(Math.abs(trend.change))} ({Math.abs(trend.changePercent).toFixed(2)}%)
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Short Term</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPredictionColor(trend.prediction.shortTerm)}`}>
                              {trend.prediction.shortTerm}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Medium Term</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPredictionColor(trend.prediction.mediumTerm)}`}>
                              {trend.prediction.mediumTerm}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Long Term</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPredictionColor(trend.prediction.longTerm)}`}>
                              {trend.prediction.longTerm}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Confidence</span>
                            <span className="text-xs font-medium text-gray-900">{trend.confidence}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${trend.confidence}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          Updated {trend.lastUpdated}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {isLoading ? (
                    [...Array(5)].map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))
                  ) : (
                    marketAnalysis.map((analysis) => (
                      <div key={analysis.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(analysis.impact)}`}>
                                {analysis.impact.toUpperCase()} IMPACT
                              </span>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {analysis.category}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{analysis.title}</h3>
                            <p className="text-gray-600 mb-4">{analysis.summary}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {analysis.views.toLocaleString()} views
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {analysis.readTime} min read
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(analysis.date).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Bookmark className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              Read Analysis
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {analysis.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'predictions' && (
              <motion.div
                key="predictions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* AI Predictions */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Zap className="h-6 w-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">AI-Powered Predictions</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-800">Nifty 50 Bullish Trend</span>
                        </div>
                        <p className="text-sm text-green-700">
                          AI models predict 15-20% upside potential over next 3 months based on technical indicators and market sentiment.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                          <span className="font-medium text-yellow-800">Gold Volatility Expected</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                          Increased volatility expected in gold prices due to global economic uncertainty and inflation concerns.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Info className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Bitcoin Momentum</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Strong momentum indicators suggest continued upward movement in Bitcoin prices with potential resistance at ₹45L.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expert Consensus */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Expert Consensus</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">Nifty 50 Target</span>
                        <span className="text-lg font-bold text-green-600">26,500</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">Sensex Target</span>
                        <span className="text-lg font-bold text-green-600">85,000</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">Gold Price Target</span>
                        <span className="text-lg font-bold text-yellow-600">₹68,000</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">USD/INR Target</span>
                        <span className="text-lg font-bold text-blue-600">₹82.50</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Market Outlook</h4>
                      <p className="text-sm text-blue-800">
                        Overall market sentiment remains positive with strong fundamentals supporting continued growth. 
                        Key factors include robust corporate earnings, government policy support, and improving economic indicators.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Ahead with Market Intelligence
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get real-time market updates, expert analysis, and AI-powered predictions delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe to Updates
              </button>
              <Link
                to="/comprehensive-finance-hub"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore All Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketAnalysis;
