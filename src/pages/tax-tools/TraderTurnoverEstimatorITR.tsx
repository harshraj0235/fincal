import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, TrendingDown, Info, AlertCircle, CheckCircle, XCircle, BarChart3, Calendar, DollarSign, FileText, ArrowRight } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface TurnoverCalculation {
  totalBuyValue: number;
  totalSellValue: number;
  totalTurnover: number;
  tradingDays: number;
  averageDailyTurnover: number;
  category: string;
  recommendation: string;
  color: string;
  icon: React.ReactNode;
}

const TraderTurnoverEstimatorITR: React.FC = () => {
  const [buyValue, setBuyValue] = useState<string>('');
  const [sellValue, setSellValue] = useState<string>('');
  const [tradingDays, setTradingDays] = useState<string>('');
  const [calculation, setCalculation] = useState<TurnoverCalculation | null>(null);

  const calculateTurnover = () => {
    if (!buyValue || !sellValue || !tradingDays) {
      alert('Please fill in all fields');
      return;
    }

    const buy = parseFloat(buyValue);
    const sell = parseFloat(sellValue);
    const days = parseInt(tradingDays);
    
    const totalTurnover = buy + sell;
    const averageDailyTurnover = totalTurnover / days;
    
    let category: string;
    let recommendation: string;
    let color: string;
    let icon: React.ReactNode;
    
    if (totalTurnover >= 10000000) { // 1 crore
      category = 'High Frequency Trader';
      recommendation = 'Consider professional trader status. Maintain detailed records for ITR.';
      color = 'text-red-600';
      icon = <AlertCircle className="h-5 w-5" />;
    } else if (totalTurnover >= 5000000) { // 50 lakhs
      category = 'Active Trader';
      recommendation = 'Significant trading activity. Ensure proper documentation for ITR.';
      color = 'text-orange-600';
      icon = <Info className="h-5 w-5" />;
    } else if (totalTurnover >= 1000000) { // 10 lakhs
      category = 'Regular Trader';
      recommendation = 'Moderate trading activity. Standard ITR filing required.';
      color = 'text-blue-600';
      icon = <CheckCircle className="h-5 w-5" />;
    } else {
      category = 'Occasional Trader';
      recommendation = 'Low trading activity. Basic ITR filing sufficient.';
      color = 'text-green-600';
      icon = <CheckCircle className="h-5 w-5" />;
    }

    setCalculation({
      totalBuyValue: buy,
      totalSellValue: sell,
      totalTurnover,
      tradingDays: days,
      averageDailyTurnover,
      category,
      recommendation,
      color,
      icon
    });
  };

  const resetForm = () => {
    setBuyValue('');
    setSellValue('');
    setTradingDays('');
    setCalculation(null);
  };

  return (
    <>
      <SEOHelmet
        title="Trader Turnover Estimator for ITR - Calculate Trading Turnover | MoneyCal"
        description="Calculate your trading turnover for ITR filing. Determine if you qualify as a trader and understand your tax obligations with our comprehensive turnover estimator."
        keywords="trader turnover Calculator, ITR filing, trading turnover, professional trader, tax filing, stock trading tax"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Trader Turnover Estimator for ITR
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate your trading turnover and determine your tax filing requirements
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Trading Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Buy Value (₹)
                    </label>
                    <input
                      type="number"
                      value={buyValue}
                      onChange={(e) => setBuyValue(e.target.value)}
                      placeholder="Enter total buy value"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Sell Value (₹)
                    </label>
                    <input
                      type="number"
                      value={sellValue}
                      onChange={(e) => setSellValue(e.target.value)}
                      placeholder="Enter total sell value"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trading Days
                    </label>
                    <input
                      type="number"
                      value={tradingDays}
                      onChange={(e) => setTradingDays(e.target.value)}
                      placeholder="Enter number of trading days"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTurnover}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Turnover
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                  Turnover Analysis
                </h2>

                {calculation ? (
                  <div className="space-y-6">
                    {/* Category */}
                    <div className={`text-center p-4 rounded-lg ${calculation.color.includes('red') ? 'bg-red-50 border border-red-200' : calculation.color.includes('orange') ? 'bg-orange-50 border border-orange-200' : calculation.color.includes('blue') ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200'}`}>
                      <div className={`flex items-center justify-center mb-2 ${calculation.color}`}>
                        {calculation.icon}
                        <span className="ml-2 text-lg font-bold">Trader Category</span>
                      </div>
                      <p className="text-lg font-bold text-gray-800">{calculation.category}</p>
                      <p className="text-sm text-gray-600 mt-2">{calculation.recommendation}</p>
                    </div>

                    {/* Turnover Details */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Turnover Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Buy Value:</span>
                          <span className="font-bold text-blue-600">₹{calculation.totalBuyValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Total Sell Value:</span>
                          <span className="font-bold text-blue-600">₹{calculation.totalSellValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-700 font-semibold">Total Turnover:</span>
                          <span className="font-bold text-blue-600">₹{calculation.totalTurnover.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trading Statistics */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Trading Statistics
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Trading Days:</span>
                          <span className="font-bold text-green-600">{calculation.tradingDays} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Average Daily Turnover:</span>
                          <span className="font-bold text-green-600">₹{calculation.averageDailyTurnover.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* ITR Filing Info */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        ITR Filing Requirements
                      </h3>
                      <div className="space-y-2 text-purple-700">
                        <p>• Report all trading transactions in ITR</p>
                        <p>• Maintain detailed trading records</p>
                        <p>• Consider professional trader status if applicable</p>
                        <p>• Consult tax advisor for complex cases</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter trading details to calculate turnover</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Understanding Trading Turnover for ITR
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <IndianRupee className="h-5 w-5 mr-2" />
                    What is Turnover?
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Sum of buy and sell values</li>
                    <li>• Indicates trading activity level</li>
                    <li>• Determines trader classification</li>
                    <li>• Required for ITR filing</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    ITR Filing Requirements
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Report all trading transactions</li>
                    <li>• Maintain detailed records</li>
                    <li>• Consider professional status</li>
                    <li>• Consult tax advisor if needed</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Considerations
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Turnover includes both buy and sell values</li>
                  <li>• High turnover may indicate professional trading</li>
                  <li>• Maintain detailed transaction records</li>
                  <li>• Consider tax implications of trading frequency</li>
                  <li>• Consult professional for complex cases</li>
                </ul>
              </div>

              <div className="mt-8 bg-purple-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Related Trading Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/tax-tools/stcg-ltcg-classifier" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">STCG vs LTCG Classifier</span>
                    <p className="text-sm text-purple-600">Determine capital gains category</p>
                  </a>
                  <a href="/tax-tools/equity-tax-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Equity Tax Estimator</span>
                    <p className="text-sm text-purple-600">Calculate equity tax by year</p>
                  </a>
                  <a href="/tax-tools/loss-carry-forward-estimator" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Loss Carry Forward</span>
                    <p className="text-sm text-purple-600">Estimate loss carry forward</p>
                  </a>
                  <a href="/tax-tools/turnover-calculator-itr" className="block p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-semibold text-purple-800">Turnover Calculator ITR</span>
                    <p className="text-sm text-purple-600">Calculate turnover for ITR</p>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TraderTurnoverEstimatorITR;
