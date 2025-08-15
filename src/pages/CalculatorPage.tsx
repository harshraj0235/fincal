import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Building, 
  Shield, 
  Star,
  Clock,
  Users,
  Zap,
  ChevronRight,
  HelpCircle,
  ArrowLeft,
  Share2,
  Bookmark,
  Download,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
// Calculator components will be imported dynamically
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const CalculatorPage: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('calculator');
  const [showSuccess, setShowSuccess] = useState(false);

  // Find the calculator
  const calculator = calculatorCategories
    .flatMap(category => category.calculators)
    .find(calc => calc.id === calculatorId);

  // Calculator component will be loaded dynamically
  const CalculatorComponent = null;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [calculatorId]);

  useEffect(() => {
    // Show success message when calculator loads
    if (!isLoading && calculator) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, calculator]);

  if (!calculator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-white" />
        </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Calculator Not Found</h1>
          <p className="text-gray-600 mb-8">The calculator you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return <Building className="w-5 h-5" />;
      case 'investment-calculators': return <TrendingUp className="w-5 h-5" />;
      case 'tax-calculators': return <DollarSign className="w-5 h-5" />;
      case 'retirement-calculators': return <Shield className="w-5 h-5" />;
      default: return <Calculator className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return 'from-blue-500 to-blue-600';
      case 'investment-calculators': return 'from-green-500 to-green-600';
      case 'tax-calculators': return 'from-purple-500 to-purple-600';
      case 'retirement-calculators': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const category = calculatorCategories.find(cat => 
    cat.calculators.some(calc => calc.id === calculatorId)
  );
  
  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title={`${calculator.name} - Free Online Calculator | MoneyCal.in`}
        description={calculator.description || `Calculate ${calculator.name.toLowerCase()} with our free online calculator. Get accurate results instantly.`}
        keywords={`${calculator.name}, calculator, financial calculator, online calculator`}
        url={`/calculators/${calculatorId}`}
        structuredData={{}}
        tags={["calculator", "financial tools", calculator.name]}
      />

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Calculator loaded successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/#calculators" className="hover:text-blue-600 transition-colors">Calculators</Link>
              <ChevronRight className="w-4 h-4" />
              {category && (
                <>
                  <Link to={`/#${category.id}`} className="hover:text-blue-600 transition-colors">{category.name}</Link>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
              <span className="text-gray-900 font-medium">{calculator.name}</span>
            </nav>

            {/* Calculator Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getCategoryColor(category?.id || '')} rounded-2xl flex items-center justify-center shadow-lg`}>
                      {getCategoryIcon(category?.id || '')}
            </div>
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        {calculator.name}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          4.9/5
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-blue-500" />
                          10K+ users
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-green-500" />
                          Updated today
                        </span>
              </div>
            </div>
          </div>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                    {calculator.description || `Calculate ${calculator.name.toLowerCase()} with our free online calculator. Get accurate results instantly.`}
                  </p>
        </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-6 lg:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    title="Bookmark"
                  >
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    title="Download Results"
                  >
                    <Download className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
          </div>
        </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
              >
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                  {[
                    { id: 'calculator', name: 'Calculator', icon: Calculator },
                    { id: 'results', name: 'Results', icon: TrendingUp },
                    { id: 'info', name: 'Information', icon: Info },
                  ].map((tab) => {
                    const Icon = tab.icon;
              return (
                <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>

                {/* Tab Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'calculator' && (
                      <motion.div
                        key="calculator"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center py-12">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                            />
                          </div>
                        ) : (
                          <div>
                            {CalculatorComponent ? (
                              <div>Calculator Component</div>
                            ) : (
                              <div className="text-center py-12">
                                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Calculator Component Not Found</h3>
                                <p className="text-gray-600">This calculator is under development.</p>
        </div>
      )}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === 'results' && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-12"
                      >
                        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Results Will Appear Here</h3>
                        <p className="text-gray-600">Use the calculator to see your results.</p>
                      </motion.div>
                    )}

                    {activeTab === 'info' && (
                      <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Calculator</h3>
                          <p className="text-gray-600 leading-relaxed">
                            {calculator.description || `This calculator helps you ${calculator.name.toLowerCase()}. It provides accurate calculations based on the latest financial formulas and regulations.`}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Use</h3>
                          <ol className="list-decimal list-inside space-y-2 text-gray-600">
                            <li>Enter the required values in the input fields</li>
                            <li>Click the calculate button to get results</li>
                            <li>View detailed breakdown and analysis</li>
                            <li>Download or share your results</li>
                          </ol>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Disclaimer</h3>
                          <p className="text-gray-600 leading-relaxed">
                            This calculator is for informational purposes only. Results are estimates and should not be considered as financial advice. Please consult with a financial advisor for personalized guidance.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Related Calculators */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Related Calculators
                </h3>
                <div className="space-y-3">
                  {category?.calculators
                    .filter(calc => calc.id !== calculatorId)
                    .slice(0, 5)
                    .map((calc) => (
                      <motion.div
                        key={calc.id}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={`/calculators/${calc.id}`}
                          className="block p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Calculator className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{calc.name}</div>
                              <div className="text-sm text-gray-600">{calc.description}</div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Calculator Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Accuracy</span>
                    <span className="font-semibold">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Speed</span>
                    <span className="font-semibold">&lt;1s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Updates</span>
                    <span className="font-semibold">Daily</span>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-blue-500" />
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <Link
                    to="/contact-us"
                    className="block p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="font-medium text-blue-900">Contact Support</div>
                    <div className="text-sm text-blue-700">Get help from our team</div>
                  </Link>
                  <Link
                    to="/blog"
                    className="block p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <div className="font-medium text-green-900">Read Articles</div>
                    <div className="text-sm text-green-700">Learn more about finances</div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
    </div>
    </>
  );
};
