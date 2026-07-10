import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
  ArrowLeft,
  Grid,
  List, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const CategoryCalculators: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const category = calculatorCategories.find(cat => cat.id === categoryId);

  useEffect(() => {
    if (!category) {
      navigate('/calculators');
    }
  }, [category, navigate]);

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return <Building className="h-8 w-8 text-white" />;
      case 'investment-calculators': return <TrendingUp className="h-8 w-8 text-white" />;
      case 'tax-calculators': return <DollarSign className="h-8 w-8 text-white" />;
      case 'retirement-calculators': return <PieChart className="h-8 w-8 text-white" />;
      case 'business-calculators': return <IndianRupee className="h-8 w-8 text-white" />;
      case 'property-calculators': return <Building className="h-8 w-8 text-white" />;
      case 'insurance-calculators': return <Shield className="h-8 w-8 text-white" />;
      case 'banking-calculators': return <DollarSign className="h-8 w-8 text-white" />;
      case 'fintech-payments': return <IndianRupee className="h-8 w-8 text-white" />;
      case 'investments-wealth-management': return <TrendingUp className="h-8 w-8 text-white" />;
      case 'personal-finance': return <PieChart className="h-8 w-8 text-white" />;
      default: return <IndianRupee className="h-8 w-8 text-white" />;
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

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The requested category could not be found.</p>
          <Link
            to="/calculators"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to All Categories
          </Link>
        </div>
      </div>
    );
  }

  const filteredCalculators = category.calculators.filter(calculator =>
    calculator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    calculator.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const categoryKeywords = Array.from(new Set(category.calculators.flatMap(calc => calc.keywords || []).slice(0, 24)));
  const faqItems = [
    {
      question: `What is included in ${category.name}?`,
      answer: `This category includes calculators that help with ${category.description.toLowerCase()}`
    },
    {
      question: `Which ${category.name.toLowerCase()} calculator should I start with?`,
      answer: 'Start with the most common goal in this category and compare two scenarios to understand the impact of rate or tenure changes.'
    },
    {
      question: 'Are these calculators accurate for India?',
      answer: 'Yes. They use standard formulas commonly used by Indian banks and financial institutions.'
    },
    {
      question: 'Can I use these tools on mobile?',
      answer: 'Yes. All calculators are optimized for mobile screens and update instantly as you change inputs.'
    }
  ];

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title={`${category.name} - Financial Calculators | MoneyCal.in`}
        description={`Explore all ${category.name.toLowerCase()} calculators. Compare tools, estimate outcomes, and choose the right plan for your needs.`}
        keywords={[`${category.name} calculators`, 'financial calculators', ...categoryKeywords].join(', ')}
        url={`/calculators/category/${categoryId}`}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: category.name, url: `/calculators/category/${categoryId}` }
        ]}
        faqData={faqItems}
        tags={[category.name, 'calculator category', 'financial tools', 'India calculators']}
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/calculators')}
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to All Categories
            </button>
            
            <div className="flex items-center mb-6">
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mr-6 shadow-lg`}>
                {getCategoryIcon(category.id)}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{category.name}</h1>
                <p className="text-xl text-gray-600">{category.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Search and View Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
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

          {/* Calculators Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}
          >
            {filteredCalculators.map((calculator, index) => (
              <motion.div
                key={calculator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <Link
                  to={`/calculators/${calculator.id}`}
                  className="block group"
                >
                  <div className="flex items-center mb-4">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <IndianRupee className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{calculator.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{calculator.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 group-hover:text-blue-700 font-medium text-sm flex items-center">
                      Use Calculator
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="text-sm text-gray-500">
                      {index + 1} of {filteredCalculators.length}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredCalculators.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No calculators found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all categories.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-16 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{category.name} FAQ</h2>
              <p className="text-gray-600">Quick answers to help you pick the right calculator.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqItems.map(item => (
                <div key={item.question} className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CategoryCalculators;
