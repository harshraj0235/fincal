import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, DollarSign, Building, Shield, FileText, Users, Award, Clock, Target } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const ToolsHubNew: React.FC = () => {
  const toolCategories = [
    {
      id: 'calculators',
      title: 'Financial Calculators',
      description: 'Comprehensive suite of financial calculators for loans, investments, taxes, and more',
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      tools: [
        { name: 'EMI Calculator', path: '/calculators/emi-calculator' },
        { name: 'SIP Calculator', path: '/calculators/sip-calculator' },
        { name: 'Income Tax Calculator', path: '/calculators/income-tax-calculator' },
        { name: 'Mutual Fund Calculator', path: '/calculators/mutual-fund-returns-calculator' }
      ]
    },
    {
      id: 'insurance',
      title: 'Insurance Tools',
      description: 'Insurance planning and comparison tools for life, health, and general insurance',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      tools: [
        { name: 'Life Insurance Calculator', path: '/insurance-tools/life-insurance-calculator' },
        { name: 'Health Insurance Estimator', path: '/insurance-tools/health-insurance-estimator' },
        { name: 'Car Insurance Calculator', path: '/insurance-tools/car-insurance-calculator' },
        { name: 'Term Insurance Planner', path: '/insurance-tools/term-insurance-planner' }
      ]
    },
    {
      id: 'investment',
      title: 'Investment Tools',
      description: 'Tools for portfolio management, stock analysis, and investment planning',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      tools: [
        { name: 'Portfolio Tracker', path: '/investment-portfolio-tracker' },
        { name: 'Stock Screener', path: '/stock-screener' },
        { name: 'PE Ratio Calculator', path: '/pe-ratio-calculator' },
        { name: 'CAGR Calculator', path: '/cagr-calculator' }
      ]
    },
    {
      id: 'personal-finance',
      title: 'Personal Finance',
      description: 'Budgeting, expense tracking, and personal finance management tools',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      tools: [
        { name: 'Budget Tracker', path: '/monthly-budget-tracker' },
        { name: 'Expense Tracker', path: '/daily-expense-tracker' },
        { name: 'Net Worth Calculator', path: '/net-worth-calculator' },
        { name: 'Debt Payoff Calculator', path: '/debt-payoff-calculator' }
      ]
    }
  ];

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Financial Tools Hub - Comprehensive Financial Planning Tools"
        description="Access our complete suite of financial tools including calculators, insurance planners, investment trackers, and personal finance management tools."
        keywords="financial tools, calculators, insurance tools, investment tools, personal finance, budgeting, portfolio tracker"
        url="/tools-new"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Financial Tools Hub
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Comprehensive suite of financial planning tools to help you make informed decisions and achieve your financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/calculators"
                  className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <Calculator className="inline h-5 w-5 mr-2" />
                  Start Calculating
                </Link>
                <Link
                  to="/insurance-tools"
                  className="bg-green-500 text-white hover:bg-green-600 px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <Shield className="inline h-5 w-5 mr-2" />
                  Plan Insurance
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Categories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">All Financial Tools</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Organized by category for easy navigation and discovery
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {toolCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mr-4 shadow-lg`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.name}
                          to={tool.path}
                          className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-600">Financial Tools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">1M+</div>
                <div className="text-gray-600">Users Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-gray-600">Free to Use</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-gray-600">Available</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ToolsHubNew;
