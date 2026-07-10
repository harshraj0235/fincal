import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BookOpen, 
  Calculator, 
  Users, 
  Award, 
  Play,
  ChevronRight,
  Search,
  Grid,
  List,
  Star,
  Clock,
  Target,
  Zap,
  Shield,
  Brain,
  BarChart3,
  DollarSign,
  PieChart,
  LineChart, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const StockMarket: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const courseLevels = [
    {
      id: 'stock-market-basics',
      title: 'Stock Market Basics',
      englishTitle: 'Stock Market Basics',
      description: 'Basic information about stock market and fundamental concepts',
      lessons: 5,
      duration: '2 hours',
      level: 'Beginner',
      color: 'from-blue-500 to-blue-700',
      icon: <BookOpen className="h-8 w-8 text-white" />,
      topics: [
        'What is Stock Market?',
        'Key Market Participants',
        'Demat and Trading Account',
        'What is IPO?',
        'Basic Stock Market Terms'
      ]
    },
    {
      id: 'core-market-concepts',
      title: 'Core Market Concepts',
      englishTitle: 'Core Market Concepts',
      description: 'Bull and Bear markets, Market cap, Dividends and Sectors',
      lessons: 5,
      duration: '3 hours',
      level: 'Intermediate',
      color: 'from-green-500 to-green-700',
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      topics: [
        'Bull and Bear Markets',
        'Market Capitalization',
        'Dividends and Types',
        'Sectors and Indices',
        'Economic Cycles and Market Impact'
      ]
    },
    {
      id: 'fundamental-analysis',
      title: 'Fundamental Analysis',
      englishTitle: 'Fundamental Analysis',
      description: 'Analysis and evaluation of company financial health',
      lessons: 6,
      duration: '4 hours',
      level: 'Advanced',
      color: 'from-purple-500 to-purple-700',
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      topics: [
        'What is Fundamental Analysis?',
        'EPS and P/E Ratio',
        'Return on Equity (ROE)',
        'Understanding Balance Sheet',
        'Important Financial Ratios',
        'Company Valuation'
      ]
    },
    {
      id: 'technical-analysis',
      title: 'Technical Analysis',
      englishTitle: 'Technical Analysis',
      description: 'Chart patterns, indicators and price movement analysis',
      lessons: 5,
      duration: '4 hours',
      level: 'Advanced',
      color: 'from-orange-500 to-orange-700',
      icon: <LineChart className="h-8 w-8 text-white" />,
      topics: [
        'What is Technical Analysis?',
        'Candlestick Charts',
        'Support and Resistance',
        'Popular Technical Indicators',
        'Volume Analysis'
      ]
    },
    {
      id: 'advanced-trading',
      title: 'Advanced Trading Strategies',
      englishTitle: 'Advanced Trading Strategies',
      description: 'Swing trading, day trading and risk management',
      lessons: 5,
      duration: '5 hours',
      level: 'Expert',
      color: 'from-red-500 to-red-700',
      icon: <Zap className="h-8 w-8 text-white" />,
      topics: [
        'Swing Trading',
        'Day Trading Basics',
        'Options and Futures',
        'Chart Patterns',
        'Risk Management Techniques'
      ]
    },
    {
      id: 'tools-practical',
      title: 'Tools & Practical Application',
      englishTitle: 'Tools & Practical Application',
      description: 'Practical tools, paper trading and market news',
      lessons: 5,
      duration: '3 hours',
      level: 'Intermediate',
      color: 'from-indigo-500 to-indigo-700',
      icon: <IndianRupee className="h-8 w-8 text-white" />,
      topics: [
        'Using Stock Screeners',
        'Trading Platforms',
        'Investment Calculators',
        'Paper Trading',
        'Reading Market News'
      ]
    },
    {
      id: 'case-studies-psychology',
      title: 'Case Studies & Market Psychology',
      englishTitle: 'Case Studies & Market Psychology',
      description: 'Real case studies and behavioral finance',
      lessons: 4,
      duration: '3 hours',
      level: 'Expert',
      color: 'from-pink-500 to-pink-700',
      icon: <Brain className="h-8 w-8 text-white" />,
      topics: [
        'Famous Stock Market Case Studies',
        'Behavioral Finance Basics',
        'Emotional Discipline in Trading',
        'Developing Trading Mindset'
      ]
    }
  ];

  const tools = [
    {
      id: 'sip-calculator',
      title: 'SIP Calculator',
      description: 'Calculate returns for Systematic Investment Plan',
      icon: <IndianRupee className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'cagr-calculator',
      title: 'CAGR Calculator',
      description: 'Calculate Compound Annual Growth Rate',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'pe-ratio-calculator',
      title: 'P/E Ratio Calculator',
      description: 'Calculate Price-to-Earnings Ratio',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'intrinsic-value-calculator',
      title: 'Intrinsic Value Calculator',
      description: 'Calculate intrinsic value of stocks',
      icon: <Target className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'xirr-calculator',
      title: 'XIRR Calculator',
      description: 'Calculate returns for irregular investments',
      icon: <PieChart className="h-6 w-6" />,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'stock-screener',
      title: 'Stock Screener',
      description: 'Filter stocks according to your strategy',
      icon: <Search className="h-6 w-6" />,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const filteredLevels = courseLevels.filter(level =>
    level.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.englishTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Stock Market Course - Learn Trading & Investment | MoneyCal.in"
        description="India's most comprehensive stock market course. Learn from beginner to expert level with free tools, calculators and practical guides."
        keywords="stock market course, learn trading, investment guide, stock market basics, technical analysis, fundamental analysis"
        url="/stock-market"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              MoneyCal Varsity
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Stock Market Course
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              India's most comprehensive stock market education platform. Learn everything from beginner to expert level 
              and enhance your investment knowledge with our structured courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="#courses"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Course
              </Link>
              <Link
                to="#tools"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-green-500 hover:text-green-600 transition-all"
              >
                <IndianRupee className="h-5 w-5 mr-2" />
                View Tools
              </Link>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">7</div>
              <div className="text-gray-600">Course Levels</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">39</div>
              <div className="text-gray-600">Lessons</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
              <div className="text-gray-600">Hours Content</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Free</div>
            </div>
          </motion.div>

          {/* Search and View Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Course Levels */}
          <motion.div
            id="courses"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Levels</h2>
              <p className="text-lg text-gray-600">Learn step-by-step from beginner to expert level</p>
            </div>
            
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}>
              {filteredLevels.map((level, index) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${level.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${level.color} flex items-center justify-center mr-4 shadow-lg`}>
                        {level.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{level.title}</h3>
                        <p className="text-sm text-gray-500">{level.englishTitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{level.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {level.level}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {level.duration}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {level.topics.slice(0, 3).map((topic, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <ChevronRight className="h-4 w-4 mr-2 text-green-500" />
                          {topic}
                        </div>
                      ))}
                      {level.topics.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{level.topics.length - 3} more topics
                        </div>
                      )}
                    </div>
                    
                    <Link
                      to={`/stock-market/${level.id}`}
                      className="inline-flex items-center w-full justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all group"
                    >
                      Start Course
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tools Section */}
          <motion.div
            id="tools"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Tools</h2>
              <p className="text-lg text-gray-600">Useful calculators and tools for stock market analysis</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                >
                  <Link to={`/calculators/${tool.id}`} className="block group">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
              <p className="text-lg text-gray-600">Key features of our stock market platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Courses</h3>
                <p className="text-gray-600 text-sm">Complete education with 39 lessons in 7 levels</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Tools</h3>
                <p className="text-gray-600 text-sm">6 useful calculators and analysis tools</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate</h3>
                <p className="text-gray-600 text-sm">Free certificate upon course completion</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Discuss and learn with other investors</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-green-600 to-blue-700 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Start Today</h2>
            <p className="text-xl mb-8 text-green-100">
              Begin your journey in the stock market world and achieve your financial goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="#courses"
                className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-2xl font-semibold hover:bg-gray-100 transition-all"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Course
              </Link>
              <Link
                to="#tools"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-green-600 transition-all"
              >
                <IndianRupee className="h-5 w-5 mr-2" />
                View Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StockMarket;
