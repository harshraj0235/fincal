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
  ArrowLeft,
  Share2,
  Bookmark,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

// Static imports for key calculators
import { EmiCalculator } from '../calculators/EmiCalculator';
import { SipCalculator } from '../calculators/SipCalculator';
import { IncomeTaxCalculator } from '../calculators/IncomeTaxCalculator';
import { HomeLoanCalculator } from '../calculators/HomeLoanCalculator';
import { PersonalLoanCalculator } from '../calculators/PersonalLoanCalculator';
import { CarLoanCalculator } from '../calculators/CarLoanCalculator';
import { BusinessLoanCalculator } from '../calculators/BusinessLoanCalculator';
import { PpfCalculator } from '../calculators/PpfCalculator';
import { MutualFundReturnsCalculator } from '../calculators/MutualFundReturnsCalculator';
import { GstCalculator } from '../calculators/GstCalculator';
import { TdsCalculator } from '../calculators/TdsCalculator';
import { RetirementCalculator } from '../calculators/RetirementCalculator';
import { BreakEvenCalculator } from '../calculators/BreakEvenCalculator';
import { PropertyInvestmentCalculator } from '../calculators/PropertyInvestmentCalculator';
import { LifeInsuranceCalculator } from '../calculators/LifeInsuranceCalculator';
import { CurrencyConverter } from '../calculators/CurrencyConverter';
import { CompoundInterestCalculator } from '../calculators/CompoundInterestCalculator';
import { SimpleInterestCalculator } from '../calculators/SimpleInterestCalculator';
import { FutureValueCalculator } from '../calculators/FutureValueCalculator';
import { InflationCalculator } from '../calculators/InflationCalculator';

// Static component mapping
const calculatorComponents: { [key: string]: React.ComponentType } = {
  'emi-calculator': EmiCalculator,
  'sip-calculator': SipCalculator,
  'income-tax-calculator': IncomeTaxCalculator,
  'home-loan-calculator': HomeLoanCalculator,
  'personal-loan-calculator': PersonalLoanCalculator,
  'car-loan-calculator': CarLoanCalculator,
  'business-loan-calculator': BusinessLoanCalculator,
  'ppf-calculator': PpfCalculator,
  'mutual-fund-returns-calculator': MutualFundReturnsCalculator,
  'gst-calculator': GstCalculator,
  'tds-calculator': TdsCalculator,
  'retirement-calculator': RetirementCalculator,
  'break-even-calculator': BreakEvenCalculator,
  'property-investment-calculator': PropertyInvestmentCalculator,
  'life-insurance-calculator': LifeInsuranceCalculator,
  'currency-converter': CurrencyConverter,
  'compound-interest-calculator': CompoundInterestCalculator,
  'simple-interest-calculator': SimpleInterestCalculator,
  'future-value-calculator': FutureValueCalculator,
  'inflation-calculator': InflationCalculator,
};

export const CalculatorPage: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Find the calculator
  const calculator = calculatorCategories
    .flatMap(category => category.calculators)
    .find(calc => calc.id === calculatorId);

  // Get the calculator component
  const CalculatorComponent = calculatorId ? calculatorComponents[calculatorId] : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [calculatorId]);

  useEffect(() => {
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
          <p className="text-gray-600 mb-4">The calculator you're looking for doesn't exist.</p>
          <p className="text-sm text-gray-500 mb-8">Requested ID: {calculatorId}</p>
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

  const getCategoryName = (categoryId: string) => {
    const category = calculatorCategories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Calculators';
  };

  const category = calculatorCategories.find(cat => 
    cat.calculators.some(calc => calc.id === calculatorId)
  );

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title={`${calculator.name} - Free Online Calculator`}
        description={calculator.description}
        keywords={calculator.keywords.join(', ')}
        url={`/calculators/${calculator.id}`}
        structuredData={{}}
        tags={calculator.keywords}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Calculator loaded successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(category?.id || '')}`}>
                    {getCategoryIcon(category?.id || '')}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{calculator.name}</h1>
                    <p className="text-gray-600">{getCategoryName(category?.id || '')}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : CalculatorComponent ? (
                  <CalculatorComponent />
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Info className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Calculator Coming Soon</h3>
                    <p className="text-gray-600 mb-4">This calculator is currently under development.</p>
                    <p className="text-sm text-gray-500">Available calculators: EMI, SIP, Income Tax, Home Loan, Personal Loan, Car Loan, Business Loan, PPF, Mutual Fund Returns, GST, TDS, Retirement, Break Even, Property Investment, Life Insurance, Currency Converter, Compound Interest, Simple Interest, Future Value, Inflation</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Calculator</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {calculator.description}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>2-3 min read</span>
                  </div>
                </div>

                {calculator.relatedCalculators && calculator.relatedCalculators.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Calculators</h3>
                    <div className="space-y-3">
                      {calculator.relatedCalculators.slice(0, 3).map((relatedId) => {
                        const relatedCalc = calculatorCategories
                          .flatMap(category => category.calculators)
                          .find(calc => calc.id === relatedId);
                        
                        if (!relatedCalc) return null;
              
                        return (
                          <Link
                            key={relatedId}
                            to={`/calculators/${relatedId}`}
                            className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                          >
                            <h4 className="font-medium text-gray-900 text-sm">{relatedCalc.name}</h4>
                            <p className="text-gray-600 text-xs mt-1">{relatedCalc.description}</p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Accuracy</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Usage</span>
                      <span className="text-sm font-medium text-gray-900">High</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Updated</span>
                      <span className="text-sm font-medium text-gray-900">Recently</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
