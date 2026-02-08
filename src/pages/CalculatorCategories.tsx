import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { calculatorCategories } from '../data/calculatorData';
import { 
  Calculator, 
  Building, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Shield, 
  ChevronRight,
  Search,
  Grid,
  List,
  Filter
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const CalculatorCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return <Building className="h-8 w-8 text-white" />;
      case 'investment-calculators': return <TrendingUp className="h-8 w-8 text-white" />;
      case 'tax-calculators': return <DollarSign className="h-8 w-8 text-white" />;
      case 'retirement-calculators': return <PieChart className="h-8 w-8 text-white" />;
      case 'business-calculators': return <Calculator className="h-8 w-8 text-white" />;
      case 'property-calculators': return <Building className="h-8 w-8 text-white" />;
      case 'insurance-calculators': return <Shield className="h-8 w-8 text-white" />;
      case 'banking-calculators': return <DollarSign className="h-8 w-8 text-white" />;
      case 'fintech-payments': return <Calculator className="h-8 w-8 text-white" />;
      case 'investments-wealth-management': return <TrendingUp className="h-8 w-8 text-white" />;
      case 'personal-finance': return <PieChart className="h-8 w-8 text-white" />;
      default: return <Calculator className="h-8 w-8 text-white" />;
    }
  };
  
  const getCategoryColor = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return 'from-blue-500 to-blue-700';
      case 'investment-calculators': return 'from-green-500 to-green-700';
      case 'tax-calculators': return 'from-purple-500 to-purple-700';
      case 'retirement-calculators': return 'from-orange-500 to-orange-700';
      case 'business-calculators': return 'from-indigo-500 to-indigo-700';
      case 'property-calculators': return 'from-red-500 to-red-700';
      case 'insurance-calculators': return 'from-pink-500 to-pink-700';
      case 'banking-calculators': return 'from-cyan-500 to-cyan-700';
      case 'fintech-payments': return 'from-amber-500 to-amber-700';
      case 'investments-wealth-management': return 'from-emerald-500 to-emerald-700';
      case 'personal-finance': return 'from-teal-500 to-teal-700';
      default: return 'from-primary-500 to-primary-700';
    }
  };

  const filteredCategories = calculatorCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.calculators.some(calc => 
        calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalCalculators = calculatorCategories.reduce((total, cat) => total + cat.calculators.length, 0);

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="All Calculator Categories - Financial Tools & Calculators | MoneyCal.in"
        description="Explore all financial calculator categories including loan calculators, investment calculators, tax calculators, retirement planners, and more. Find the perfect financial tool for your needs."
        keywords="financial calculators, loan calculators, investment calculators, tax calculators, retirement calculators, business calculators, property calculators"
        url="/calculators"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-medium mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              Financial Tools Hub
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              All Calculator Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive financial tools organized by category. From loan calculators to investment planners, find everything you need for smart financial decisions.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{calculatorCategories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{totalCalculators}</div>
              <div className="text-gray-600">Calculators</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Free Tools</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
          </motion.div>

          {/* Search and Filter Controls */}
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
                placeholder="Search calculators and categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none"
              >
                <option value="all">All Categories</option>
                {calculatorCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Categories Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'p-6' : 'p-6'
                }`}
              >
                <div className={`flex items-center mb-4 ${
                  viewMode === 'list' ? 'flex-row' : 'flex-col text-center'
                }`}>
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center ${
                    viewMode === 'list' ? 'mr-4' : 'mx-auto mb-3'
                  } shadow-lg`}>
                    {getCategoryIcon(category.id)}
                  </div>
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {category.calculators.slice(0, viewMode === 'list' ? 8 : 4).map(calculator => (
                    <Link
                      key={calculator.id}
                      to={`/calculators/${calculator.id}`}
                      className="flex items-center text-gray-700 hover:text-blue-600 transition-colors group"
                    >
                      <ChevronRight className="h-4 w-4 mr-2 text-blue-500 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{calculator.name}</span>
                    </Link>
                  ))}
                </div>

                {category.calculators.length > (viewMode === 'list' ? 8 : 4) && (
                  <div className="text-sm text-gray-500 mb-4">
                    +{category.calculators.length - (viewMode === 'list' ? 8 : 4)} more calculators
                  </div>
                )}

                <Link
                  to={`/calculators/category/${category.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group"
                >
                  View all {category.calculators.length} calculators
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* All Calculators Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse All Calculators</h2>
              <p className="text-lg text-gray-600">Find the perfect calculator for your financial needs</p>
            </div>
            
            <div className="space-y-12">
              {calculatorCategories.map(category => (
                <div key={category.id} id={category.id} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center mb-8">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mr-4 shadow-lg`}>
                      {getCategoryIcon(category.id)}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.calculators.map(calculator => (
                      <Link 
                        key={calculator.id}
                        to={`/calculators/${calculator.id}`}
                        className="p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-center">
                          <Calculator className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{calculator.name}</h4>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{calculator.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Our comprehensive collection of financial calculators helps you make informed decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold hover:bg-gray-100 transition-all"
              >
                Back to Home
                <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all"
              >
                Explore More Tools
                <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CalculatorCategories;
