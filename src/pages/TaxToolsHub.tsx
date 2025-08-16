import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Star, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Zap, 
  BarChart3, 
  Wrench, 
  Clock, 
  Rocket,
  TrendingDown,
  Percent,
  Activity
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

interface TaxTool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  path: string;
  isPopular?: boolean;
  isNew?: boolean;
  color: string;
  status: 'available' | 'coming-soon';
}

const TaxToolsHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const taxTools: TaxTool[] = [
    // Available Tools
    {
      id: 'stcg-ltcg-classifier',
      name: 'STCG vs LTCG Classifier',
      description: 'Determine your capital gains tax category based on holding period',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/stcg-ltcg-classifier',
      isPopular: true,
      color: 'from-blue-500 to-blue-600',
      status: 'available'
    },
    {
      id: 'equity-tax-estimator',
      name: 'Equity Tax Estimator by Assessment Year',
      description: 'Calculate equity tax liability by assessment year with precision',
      icon: <Calculator className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/equity-tax-estimator',
      isPopular: true,
      color: 'from-green-500 to-green-600',
      status: 'available'
    },
    {
      id: 'mutual-fund-exit-load-checker',
      name: 'Mutual Fund Exit Load Checker',
      description: 'Check exit load charges for mutual fund redemptions',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Mutual Funds',
      path: '/tax-tools/mutual-fund-exit-load-checker',
      isNew: true,
      color: 'from-indigo-500 to-indigo-600',
      status: 'available'
    },
    {
      id: 'dividend-tax-estimator',
      name: 'Dividend Tax Estimator (Post-2020 Rules)',
      description: 'Calculate dividend tax under new regulations',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Dividends',
      path: '/tax-tools/dividend-tax-estimator',
      isPopular: true,
      color: 'from-yellow-500 to-yellow-600',
      status: 'available'
    },
    {
      id: 'loss-carry-forward-estimator',
      name: 'Loss Carry Forward Estimator',
      description: 'Calculate and track capital loss carry forward',
      icon: <TrendingDown className="h-6 w-6" />,
      category: 'Loss Management',
      path: '/tax-tools/loss-carry-forward-estimator',
      isNew: true,
      color: 'from-red-500 to-red-600',
      status: 'available'
    },
    // Coming Soon Tools
    {
      id: 'intraday-vs-delivery-tax-calculator',
      name: 'Intraday vs Delivery Tax Calculator',
      description: 'Compare tax implications of intraday vs delivery trading',
      icon: <Activity className="h-6 w-6" />,
      category: 'Capital Gains',
      path: '/tax-tools/intraday-vs-delivery-tax-calculator',
      color: 'from-purple-500 to-purple-600',
      status: 'available'
    },
    {
      id: 'turnover-calculator-itr',
      name: 'Turnover Calculator for ITR Form Filling',
      description: 'Calculate turnover for ITR form selection',
      icon: <FileText className="h-6 w-6" />,
      category: 'Filing & Compliance',
      path: '/tax-tools/turnover-calculator-itr',
      color: 'from-orange-500 to-orange-600',
      status: 'available'
    },
    {
      id: 'section-80c-tally-analyzer',
      name: 'Section 80C Tally Analyzer',
      description: 'Analyze and optimize your Section 80C investments',
      icon: <Percent className="h-6 w-6" />,
      category: 'Tax Planning',
      path: '/tax-tools/section-80c-tally-analyzer',
      color: 'from-teal-500 to-teal-600',
      status: 'available'
    },
    {
      id: 'short-term-capital-loss-benefit-estimator',
      name: 'Short-Term Capital Loss Benefit Estimator',
      description: 'Calculate benefits of STCG losses and optimize tax strategy',
      icon: <TrendingDown className="h-6 w-6" />,
      category: 'Loss Management',
      path: '/tax-tools/short-term-capital-loss-benefit-estimator',
      color: 'from-pink-500 to-pink-600',
      status: 'available'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tools', icon: <Zap className="h-5 w-5" /> },
    { id: 'Capital Gains', name: 'Capital Gains', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'Mutual Funds', name: 'Mutual Funds', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'Dividends', name: 'Dividends', icon: <DollarSign className="h-5 w-5" /> },
    { id: 'Loss Management', name: 'Loss Management', icon: <TrendingDown className="h-5 w-5" /> },
    { id: 'Tax Planning', name: 'Tax Planning', icon: <Percent className="h-5 w-5" /> },
    { id: 'Filing & Compliance', name: 'Filing & Compliance', icon: <FileText className="h-5 w-5" /> },
    { id: 'Advanced Tools', name: 'Advanced Tools', icon: <Wrench className="h-5 w-5" /> }
  ];

  const filteredTools = taxTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHelmet
        title="Tax & Profit Simplifiers - Comprehensive Tax Tools Hub | MoneyCal"
        description="Explore our comprehensive collection of tax and profit simplification tools. From STCG/LTCG classifiers to advanced tax planning calculators, find everything you need for smart tax management."
        keywords="tax tools, profit simplifiers, capital gains tax calculator, STCG LTCG calculator, tax planning tools, mutual fund tax calculator, dividend tax calculator"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Tax & Profit Simplifiers
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Comprehensive collection of tax tools and calculators designed to simplify your financial planning and tax management.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for tax tools, calculators, or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-lg focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredTools.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 duration-300 block h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          {tool.icon}
                        </div>
                        <div className="flex space-x-2">
                          {tool.isPopular && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </span>
                          )}
                          {tool.isNew && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Rocket className="h-3 w-3 mr-1" />
                              New
                            </span>
                          )}
                          {tool.status === 'coming-soon' && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Soon
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {tool.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {tool.status === 'available' ? (
                          <Link
                            to={tool.path}
                            className="text-blue-600 group-hover:text-blue-700 font-semibold text-sm flex items-center"
                          >
                            Open Tool
                            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : (
                          <span className="text-gray-500 font-semibold text-sm flex items-center">
                            Coming Soon
                            <Clock className="h-4 w-4 ml-1" />
                          </span>
                        )}
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{taxTools.length}+</div>
                <div className="text-gray-600">Tax Tools Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">{categories.length - 1}</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600">Free Access</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Available</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TaxToolsHub;
