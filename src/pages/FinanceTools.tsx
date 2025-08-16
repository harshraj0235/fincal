import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Calculator, 
  DollarSign, 
  BarChart3, 
  PieChart,
  ArrowRight,
  Search,
  ArrowLeft
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

interface FinanceTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  path: string;
  isPopular?: boolean;
  color: string;
  keywords: string[];
  seoDescription: string;
}

const FinanceTools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const financeTools: FinanceTool[] = [
    {
      id: 'sip-delay-loss-calculator',
      name: 'SIP Delay Loss Calculator',
      description: 'Calculate the opportunity cost of delaying your SIP investments',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-delay-loss-calculator',
      isPopular: true,
      color: 'from-red-500 to-red-600',
      keywords: ['SIP delay loss', 'investment timing', 'opportunity cost calculator'],
      seoDescription: 'Calculate how much money you lose by delaying your SIP investments.'
    },
    {
      id: 'sip-step-up-planner',
      name: 'SIP Step-up Planner',
      description: 'Plan and visualize your step-up SIP strategy for wealth creation',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'SIP Tools',
      path: '/finance-tools/sip-step-up-planner',
      isPopular: true,
      color: 'from-green-500 to-green-600',
      keywords: ['step up SIP', 'SIP planner', 'wealth creation'],
      seoDescription: 'Plan your step-up SIP strategy to increase investments systematically.'
    },
    {
      id: 'mutual-fund-comparison-tool',
      name: 'Mutual Fund Comparison Tool',
      description: 'Compare direct vs regular mutual fund plans and their impact',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Fund Tools',
      path: '/finance-tools/mutual-fund-comparison-tool',
      isPopular: true,
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['direct vs regular', 'mutual fund comparison', 'expense ratio impact'],
      seoDescription: 'Compare direct vs regular mutual fund plans to understand the impact of expense ratios.'
    },
    {
      id: 'portfolio-diversification-visualizer',
      name: 'Portfolio Diversification Visualizer',
      description: 'Visualize and analyze your portfolio diversification across asset classes',
      icon: <PieChart className="h-6 w-6" />,
      category: 'Investment Analysis',
      path: '/finance-tools/portfolio-diversification-visualizer',
      isPopular: true,
      color: 'from-pink-500 to-pink-600',
      keywords: ['portfolio diversification', 'asset allocation', 'risk management'],
      seoDescription: 'Visualize your portfolio diversification across asset classes.'
    },
    {
      id: 'xirr-calculator',
      name: 'XIRR Calculator',
      description: 'Calculate Extended Internal Rate of Return for complex investment scenarios',
      icon: <Calculator className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/xirr-calculator',
      isPopular: true,
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['XIRR calculator', 'internal rate of return', 'investment returns'],
      seoDescription: 'Calculate Extended Internal Rate of Return for complex investment scenarios.'
    },
    {
      id: 'dividend-tracker',
      name: 'Dividend Tracker',
      description: 'Track and analyze dividend income from your investments',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Advanced Investment',
      path: '/finance-tools/dividend-tracker',
      color: 'from-green-500 to-green-600',
      keywords: ['dividend tracker', 'dividend income', 'investment tracking'],
      seoDescription: 'Track and analyze dividend income from your investments.'
    }
  ];

  const categories = ['all', ...Array.from(new Set(financeTools.map(tool => tool.category)))];

  const filteredTools = financeTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularTools = financeTools.filter(tool => tool.isPopular);

  return (
    <>
      <SEOHelmet
        title="Finance Tools Hub - Investment & Financial Planning Tools | MoneyCal"
        description="Access comprehensive finance tools including SIP calculators, mutual fund analyzers, portfolio trackers, and investment planning tools. Make informed financial decisions with our expert tools."
        keywords="finance tools, investment tools, SIP calculator, mutual fund tools, portfolio tracker, investment planning, financial calculators"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Finance Tools Hub
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Comprehensive investment and financial planning tools to help you make informed decisions
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <span>📈 Investment Analysis</span>
                <span>💰 Portfolio Management</span>
                <span>🎯 Goal Planning</span>
                <span>📊 Risk Assessment</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search finance tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Tools' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="py-12 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🔥 Popular Finance Tools</h2>
              <p className="text-lg text-gray-600">Most used tools by our community</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={tool.path}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block"
                  >
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {tool.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm flex items-center">
                        Try Tool
                        <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Popular</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Tools Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {searchTerm || selectedCategory !== 'all' ? 'Filtered Results' : 'All Finance Tools'}
              </h2>
              <p className="text-lg text-gray-600">
                {filteredTools.length} tools found
              </p>
            </motion.div>
            
            {filteredTools.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <Link
                      to={tool.path}
                      className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block h-full"
                    >
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm flex items-center">
                          Try Tool
                          <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
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

        {/* Related Tools Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore More Tools</h2>
              <p className="text-lg text-gray-600">Discover other specialized tool categories</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                to="/tax-tools"
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1 duration-300 block text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Tax Tools
                </h3>
                <p className="text-gray-600 text-sm">Advanced tax planning and calculation tools</p>
              </Link>
              
              <Link
                to="/tools"
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 duration-300 block text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  All Tools Hub
                </h3>
                <p className="text-gray-600 text-sm">Complete collection of financial tools</p>
              </Link>
              
              <Link
                to="/calculators"
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200 transform hover:-translate-y-1 duration-300 block text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  Calculators
                </h3>
                <p className="text-gray-600 text-sm">Basic and advanced financial calculators</p>
              </Link>
              
              <Link
                to="/stock-market"
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1 duration-300 block text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  Stock Market
                </h3>
                <p className="text-gray-600 text-sm">Stock analysis and trading tools</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FinanceTools;
