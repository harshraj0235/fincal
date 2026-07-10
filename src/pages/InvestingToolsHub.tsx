import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BarChart3, 
  Calculator, 
  Target, 
  DollarSign, 
  PieChart, 
  LineChart, 
  Activity,
  Zap,
  Shield,
  Globe,
  Smartphone,
  ArrowRight,
  Search,
  Filter, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const InvestingToolsHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Tools');
  const [searchQuery, setSearchQuery] = useState('');

  const investingTools = [
    {
      id: 'real-time-stock-portfolio-tracker',
      title: 'Real-Time Stock Portfolio Tracker',
      description: 'Track your BSE/NSE investments in real-time with live stock prices and portfolio value.',
      category: 'Portfolio Management',
      url: '/real-time-stock-portfolio-tracker',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-green-500',
      isPopular: true
    },
    {
      id: 'sip-delay-loss-calculator',
      title: 'SIP Delay Loss Calculator',
      description: 'Calculate potential loss from delaying SIP investments.',
      category: 'SIP Planning',
      url: '/finance-tools/sip-delay-loss-calculator',
      icon: <IndianRupee className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'sip-step-up-planner',
      title: 'SIP Step-up Planner',
      description: 'Plan step-up SIP strategy to increase investments systematically.',
      category: 'SIP Planning',
      url: '/finance-tools/sip-step-up-planner',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'mutual-fund-comparison',
      title: 'Mutual Fund Comparison Tool',
      description: 'Compare direct vs regular mutual fund plans and expense ratios.',
      category: 'Mutual Funds',
      url: '/finance-tools/mutual-fund-expense-ratio-calculator',
      icon: <PieChart className="w-6 h-6" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'lumpsum-vs-sip-analyzer',
      title: 'Lumpsum vs SIP Analyzer',
      description: 'Compare lumpsum investment vs SIP for optimal strategy.',
      category: 'Investment Strategy',
      url: '/finance-tools/lumpsum-vs-sip-analyzer',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      id: 'real-vs-nominal-return',
      title: 'Real vs Nominal Return Calculator',
      description: 'Calculate real returns by adjusting for inflation.',
      category: 'Return Analysis',
      url: '/finance-tools/real-vs-nominal-return-calculator',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    {
      id: 'fd-vs-mutual-fund',
      title: 'FD vs Mutual Fund Return Tool',
      description: 'Compare fixed deposit returns with mutual fund performance.',
      category: 'Investment Comparison',
      url: '/finance-tools/fd-vs-mutual-fund-return-tool',
      icon: <LineChart className="w-6 h-6" />,
      color: 'bg-teal-500'
    },
    {
      id: 'stock-cagr-calculator',
      title: 'Stock CAGR Calculator',
      description: 'Calculate Compound Annual Growth Rate for stocks.',
      category: 'Stock Analysis',
      url: '/finance-tools/stock-cagr-calculator',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-pink-500'
    },
    {
      id: 'portfolio-diversification',
      title: 'Portfolio Diversification Visualizer',
      description: 'Visualize portfolio allocation and diversification benefits.',
      category: 'Portfolio Management',
      url: '/finance-tools/portfolio-diversification-visualizer',
      icon: <PieChart className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      id: 'dividend-tracker',
      title: 'Dividend Tracker',
      description: 'Track dividend income from stock investments.',
      category: 'Income Tracking',
      url: '/finance-tools/dividend-tracker',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-600'
    },
    {
      id: 'xirr-calculator',
      title: 'XIRR Calculator',
      description: 'Calculate Extended Internal Rate of Return for irregular cash flows.',
      category: 'Return Analysis',
      url: '/finance-tools/xirr-calculator',
      icon: <IndianRupee className="w-6 h-6" />,
      color: 'bg-blue-600'
    },
    {
      id: 'asset-allocation-tool',
      title: 'Asset Allocation Tool',
      description: 'Create optimal asset allocation based on age and risk profile.',
      category: 'Asset Allocation',
      url: '/finance-tools/asset-allocation-tool',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-600'
    }
  ];

  const categories = [
    'All Tools',
    'Portfolio Management',
    'SIP Planning',
    'Mutual Funds',
    'Investment Strategy',
    'Return Analysis',
    'Investment Comparison',
    'Stock Analysis',
    'Asset Allocation',
    'Income Tracking'
  ];

  const filteredTools = investingTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All Tools' || tool.category === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEOHelmet
        title="50+ Investing Tools - Complete Investment Analysis & Portfolio Management Suite | MoneyCal"
        description="Access 50+ comprehensive investing tools for portfolio management, SIP planning, mutual fund analysis, stock valuation, and investment strategy. Free tools for Indian investors."
        keywords="investing tools, portfolio management, SIP Calculator, mutual fund analysis, stock valuation, investment strategy, financial planning tools, Indian investment tools"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gray-50/50">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100 pt-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                50+ Investing Tools
              </h1>
              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                Complete investment analysis and portfolio management suite. From SIP planning to stock valuation, 
                mutual fund analysis to retirement planning - everything you need for successful investing.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-gray-400 font-medium">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-1.5" />
                  Real-Time Data
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1.5" />
                  No Registration
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1.5" />
                  Indian Markets
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-1.5" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="w-full md:w-96 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search investing tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-base rounded-xl border border-gray-200 bg-gray-50 focus:ring-0 focus:border-blue-400 text-gray-900 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                      selectedCategory === category
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500 font-medium justify-center md:justify-start">
              Showing {filteredTools.length} of {investingTools.length} tools
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTools.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-2xl border border-gray-100"
              >
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Tools');
                  }}
                  className="bg-gray-100 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                  >
                    <Link
                      to={tool.url}
                      className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all block h-full flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-12 w-12 rounded-xl ${tool.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                          <div className="text-white">
                            {tool.icon}
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          {tool.isPopular && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wider">
                              Popular
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {tool.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-blue-600 font-semibold text-xs flex items-center">
                          Open Tool
                          <ArrowRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          {tool.category}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Comprehensive Investment Analysis & Portfolio Management Suite
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  Our comprehensive suite of 50+ investing tools is designed to empower Indian investors with professional-grade 
                  analysis capabilities. From basic SIP calculators to advanced portfolio optimization tools, we provide everything 
                  you need to make informed investment decisions and achieve your financial goals.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Investment Tool Categories</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                      Portfolio Management
                    </h4>
                    <p className="text-gray-700">
                      Track, analyze, and optimize your investment portfolio with real-time data and advanced analytics.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      SIP Planning
                    </h4>
                    <p className="text-gray-700">
                      Plan and optimize your Systematic Investment Plans with advanced calculators and analysis tools.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <PieChart className="w-5 h-5 mr-2 text-purple-600" />
                      Mutual Fund Analysis
                    </h4>
                    <p className="text-gray-700">
                      Comprehensive mutual fund analysis including expense ratios, performance tracking, and fund comparison.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-orange-600" />
                      Investment Strategy
                    </h4>
                    <p className="text-gray-700">
                      Develop optimal investment strategies based on your goals, risk tolerance, and market conditions.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Investing Tools?</h3>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Comprehensive Coverage:</strong> From basic calculators to advanced portfolio optimization tools, 
                    we cover every aspect of investment analysis and planning.
                  </p>
                  <p>
                    <strong>Real-Time Data:</strong> Access live market data and real-time portfolio tracking for accurate analysis.
                  </p>
                  <p>
                    <strong>Indian Market Focus:</strong> All tools are specifically designed for Indian markets, regulations, and tax implications.
                  </p>
                  <p>
                    <strong>No Registration Required:</strong> Start using any tool immediately without creating accounts or providing personal information.
                  </p>
                  <p>
                    <strong>Mobile-Friendly Design:</strong> All tools work perfectly on smartphones, tablets, and desktop computers.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                    <Zap className="w-6 h-6 mr-2" />
                    Start Your Investment Journey Today
                  </h3>
                  <p className="text-blue-700">
                    Explore our comprehensive suite of investing tools and take control of your financial future. 
                    With professional-grade tools, real-time data, and no registration required, you have everything 
                    you need to make informed investment decisions and achieve your financial goals.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvestingToolsHub;
