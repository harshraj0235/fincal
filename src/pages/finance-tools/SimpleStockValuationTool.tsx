import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  TrendingUp, 
  ArrowLeft, 
  BarChart3,
  DollarSign,
  Target,
  PieChart
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

const SimpleStockValuationTool: React.FC = () => {
  const [input1, setInput1] = useState(10000);
  const [input2, setInput2] = useState(12);
  const [input3, setInput3] = useState(10);

  const calculateResult = () => {
    const result = input1 * Math.pow(1 + input2 / 100, input3);
    return {
      result: Math.round(result),
      investment: input1,
      returns: Math.round(result - input1)
    };
  };

  const result = calculateResult();

  return (
    <>
      <SEOHelmet
        title="SimpleStockValuationTool - Financial Calculator | MoneyCal"
        description="Calculate and analyze your financial data with our SimpleStockValuationTool"
        keywords="financial calculator, investment analysis, money management"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-4">
                <Link to="/finance-tools" className="text-white hover:text-gray-200 transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Finance Tools
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SimpleStockValuationTool
              </h1>
              <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
                Advanced financial calculator for investment analysis and planning
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                  Calculator
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input 1 (₹)
                    </label>
                    <input
                      type="number"
                      value={input1}
                      onChange={(e) => setInput1(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input 2 (%)
                    </label>
                    <input
                      type="number"
                      value={input2}
                      onChange={(e) => setInput2(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input 3 (Years)
                    </label>
                    <input
                      type="number"
                      value={input3}
                      onChange={(e) => setInput3(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Result</h3>
                    <Target className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-bold mb-2">₹{result.result.toLocaleString()}</div>
                  <p className="text-gray-100">Total returns: ₹{result.returns.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment:</span>
                      <span className="font-semibold">₹{result.investment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Returns:</span>
                      <span className="font-semibold text-green-600">₹{result.returns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Value:</span>
                      <span className="font-semibold text-blue-600">₹{result.result.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SimpleStockValuationTool;