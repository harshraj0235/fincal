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
      id: 'amortization-schedule-viewer',
      name: 'Amortization Schedule Viewer',
      description: 'Detailed month-by-month breakdown of principal and interest with export options',
      icon: <BarChart3 className="h-6 w-6" />,
      category: 'Analysis Tools',
      path: '/loan-tools/amortization-schedule-viewer',
      color: 'from-teal-500 to-teal-600',
      keywords: ['amortization', 'loan schedule', 'principal interest breakdown', 'export CSV']
    },
    {
      id: 'debt-consolidation-calculator',
      name: 'Debt Consolidation Calculator',
      description: 'Compare consolidating multiple loans into one with savings analysis',
      icon: <Target className="h-6 w-6" />,
      category: 'Debt Management',
      path: '/loan-tools/debt-consolidation-calculator',
      isPopular: true,
      color: 'from-purple-500 to-purple-600',
      keywords: ['debt consolidation', 'multiple loans', 'debt management', 'loan comparison']
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
      name: 'Debt Snowball vs Avalanche Simulator',
      description: 'Compare debt payoff strategies and find the best approach',
      icon: <Zap className="h-6 w-6" />,
      category: 'Debt Management',
      path: '/loan-tools/debt-strategies',
      color: 'from-red-500 to-red-600',
      keywords: ['debt snowball', 'debt avalanche', 'debt payoff', 'debt strategy']
    },
    {
      id: 'refinancing-calculator',
      name: 'Loan Refinancing Calculator',
      description: 'Calculate break-even point and savings from refinancing',
      icon: <Clock className="h-6 w-6" />,
      category: 'Refinancing Tools',
      path: '/loan-tools/refinancing-calculator',
      color: 'from-indigo-500 to-indigo-600',
      keywords: ['refinancing', 'break even', 'loan refinance', 'interest savings']
    },
    {
      id: 'loan-affordability',
      name: 'Loan Affordability Calculator',
      description: 'Calculate how much loan you can afford based on income and expenses',
      icon: <DollarSign className="h-6 w-6" />,
      category: 'Planning Tools',
      path: '/loan-tools/loan-affordability',
      color: 'from-emerald-500 to-emerald-600',
      keywords: ['loan affordability', 'DTI ratio', 'EMI to income', 'loan eligibility']
    }
  ];

  const filteredTools = loanTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [...new Set(loanTools.map(tool => tool.category))];

  return (
    <>
      <SEOHelmet
        title="Loan Tools Hub - MoneyCal.in"
        description="Comprehensive suite of loan calculators and tools. EMI calculator, prepayment analysis, debt consolidation, refinancing calculator, and more."
        keywords="loan tools, EMI calculator, loan calculator, debt consolidation, prepayment calculator, refinancing calculator"
        url="/loan-tools"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">Loan Tools Hub</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive suite of market-sensitive, trend-aware loan calculators and tools. 
              Make informed decisions with our professional-grade financial analysis tools.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search loan tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <Calculator className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Popular Tools */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Star className="h-8 w-8 text-yellow-500 mr-3" />
              Popular Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loanTools.filter(tool => tool.isPopular).map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${tool.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Use Tool <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Tools by Category */}
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools
                    .filter(tool => tool.category === category)
                    .map((tool) => (
                      <Link
                        key={tool.id}
                        to={tool.path}
                        className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200"
                      >
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${tool.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                          {tool.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {tool.description}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Loan Tools?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Market-Sensitive</h3>
                <p className="text-gray-600">
                  Our tools are updated with current market rates and trends to provide accurate calculations.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <Calculator className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Grade</h3>
                <p className="text-gray-600">
                  Enterprise-level calculations and analysis tools used by financial professionals.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
                <p className="text-gray-600">
                  Detailed insights, visualizations, and recommendations for informed decision making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanToolsHub;