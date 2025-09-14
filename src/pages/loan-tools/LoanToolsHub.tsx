import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target, 
  BarChart3,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

const LoanToolsHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const loanTools = [
    {
      id: 'emi-calculator',
      name: 'EMI Calculator (Reducing Balance)',
      description: 'Calculate EMI using standard formula with amortization schedule',
      icon: <Calculator className="h-6 w-6" />,
      category: 'Basic Calculators',
      path: '/loan-tools/emi-calculator',
      isPopular: true,
      color: 'from-blue-500 to-blue-600',
      keywords: ['EMI calculator', 'loan EMI', 'reducing balance', 'amortization']
    },
    {
      id: 'flat-rate-calculator',
      name: 'Flat Rate Loan EMI Calculator',
      description: 'Calculate EMI for flat rate loans with comparison to reducing balance',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Basic Calculators',
      path: '/loan-tools/flat-rate-calculator',
      isPopular: true,
      color: 'from-green-500 to-green-600',
      keywords: ['flat rate EMI', 'loan comparison', 'interest calculation']
    },
    {
      id: 'amortization-schedule',
      name: 'Amortization Schedule Viewer',
      description: 'Detailed month-by-month breakdown of principal and interest',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Analysis Tools',
      path: '/loan-tools/amortization-schedule',
      color: 'from-purple-500 to-purple-600',
      keywords: ['amortization', 'loan schedule', 'principal interest breakdown']
    },
    {
      id: 'prepayment-calculator',
      name: 'Extra Payment Impact Calculator',
      description: 'Calculate savings from extra payments and prepayments',
      icon: <TrendingUp className="h-6 w-6" />,
      category: 'Prepayment Tools',
      path: '/loan-tools/prepayment-calculator',
      isPopular: true,
      color: 'from-orange-500 to-orange-600',
      keywords: ['prepayment', 'extra payment', 'loan savings', 'early payoff']
    },
    {
      id: 'debt-strategies',
      name: 'Debt Snowball vs Avalanche',
      description: 'Compare debt payoff strategies for optimal results',
      icon: <Target className="h-6 w-6" />,
      category: 'Debt Management',
      path: '/loan-tools/debt-strategies',
      isPopular: true,
      color: 'from-red-500 to-red-600',
      keywords: ['debt snowball', 'debt avalanche', 'debt payoff strategy']
    },
    {
      id: 'refinancing-calculator',
      name: 'Refinancing Break-even Calculator',
      description: 'Calculate if refinancing will save you money',
      icon: <Zap className="h-6 w-6" />,
      category: 'Refinancing Tools',
      path: '/loan-tools/refinancing-calculator',
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['refinancing', 'break even', 'loan switch', 'interest rate']
    },
    {
      id: 'loan-affordability',
      name: 'Loan Affordability Calculator',
      description: 'Calculate how much loan you can afford based on income',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Planning Tools',
      path: '/loan-tools/loan-affordability',
      color: 'from-teal-500 to-teal-600',
      keywords: ['loan affordability', 'EMI to income ratio', 'borrowing capacity']
    },
    {
      id: 'debt-consolidation',
      name: 'Debt Consolidation Calculator',
      description: 'Compare consolidating multiple loans into one',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Debt Management',
      path: '/loan-tools/debt-consolidation',
      color: 'from-pink-500 to-pink-600',
      keywords: ['debt consolidation', 'multiple loans', 'loan combination']
    }
  ];

  const categories = ['All', 'Basic Calculators', 'Analysis Tools', 'Prepayment Tools', 'Debt Management', 'Refinancing Tools', 'Planning Tools'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = loanTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHelmet
        title="Loan Tools - Advanced Financial Calculators | MoneyCal.in"
        description="Comprehensive suite of loan calculators including EMI, prepayment, refinancing, debt management tools. Market-sensitive, trend-aware financial planning for Indians."
        keywords={['loan tools', 'EMI calculator', 'prepayment calculator', 'debt management', 'refinancing calculator', 'loan planning']}
        url="https://moneycal.in/loan-tools"
        image="https://moneycal.in/images/loan-tools-hub.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loan Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Market-sensitive, trend-aware loan calculators for smart borrowing decisions
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search loan tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Calculator className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Tools Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Popular Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanTools.filter(tool => tool.isPopular).map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center text-white`}>
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-medium text-sm">
                        <span>Use Tool</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Tools Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Loan Tools ({filteredTools.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center text-white`}>
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        {tool.isPopular && (
                          <Star className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {tool.category}
                        </span>
                        <div className="flex items-center text-blue-600 font-medium text-sm">
                          <span>Use Tool</span>
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose Our Loan Tools?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Market-Sensitive</h3>
                <p className="text-gray-600 text-sm">Tools updated with current market trends and interest rate scenarios</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Accurate Calculations</h3>
                <p className="text-gray-600 text-sm">Precise formulas used by banks and financial institutions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
                <p className="text-gray-600 text-sm">Detailed breakdowns and multiple scenario comparisons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanToolsHub;
