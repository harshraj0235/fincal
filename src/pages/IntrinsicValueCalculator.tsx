import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Target, Info, DollarSign } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const IntrinsicValueCalculator: React.FC = () => {
  const [currentEPS, setCurrentEPS] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [intrinsicValue, setIntrinsicValue] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState('');

  const calculateIntrinsicValue = () => {
    if (!currentEPS || !growthRate || !discountRate) return;

    const eps = parseFloat(currentEPS);
    const growth = parseFloat(growthRate) / 100;
    const discount = parseFloat(discountRate) / 100;

    if (eps <= 0 || growth < 0 || discount <= 0) return;

    // Using Gordon Growth Model (Dividend Discount Model)
    const intrinsic = eps * (1 + growth) / (discount - growth);
    setIntrinsicValue(intrinsic);
  };

  const getValuationAnalysis = (intrinsic: number, current: number) => {
    const ratio = current / intrinsic;
    if (ratio < 0.8) return { status: 'Undervalued', color: 'text-green-600', bg: 'bg-green-50' };
    if (ratio < 1.2) return { status: 'Fair Value', color: 'text-blue-600', bg: 'bg-blue-50' };
    return { status: 'Overvalued', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="Intrinsic Value Calculator - Stock Intrinsic Value Calculator | MoneyCal.in"
        description="Calculate intrinsic value of stocks using Gordon Growth Model. Free online intrinsic value Calculator for stock valuation and investment analysis."
        keywords="intrinsic value calculator, stock valuation, gordon growth model, dividend discount model, stock analysis, fair value calculator"
        url="/calculators/intrinsic-value-calculator"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Intrinsic Value Calculator</h1>
            <p className="text-xl text-gray-600">Calculate intrinsic value of stocks using Gordon Growth Model</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 mr-2 text-green-600" />
                Calculate Intrinsic Value
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Earnings Per Share (₹)
                  </label>
                  <input
                    type="number"
                    value={currentEPS}
                    onChange={(e) => setCurrentEPS(e.target.value)}
                    placeholder="Enter current EPS"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Growth Rate (%)
                  </label>
                  <input
                    type="number"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(e.target.value)}
                    placeholder="Enter growth rate"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Rate of Return (%)
                  </label>
                  <input
                    type="number"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                    placeholder="Enter discount rate"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Stock Price (₹) - Optional
                  </label>
                  <input
                    type="number"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    placeholder="Enter current price for comparison"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={calculateIntrinsicValue}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
                >
                  Calculate Intrinsic Value
                </button>

                {intrinsicValue !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Intrinsic Value Result</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      ₹{intrinsicValue.toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      The intrinsic value of the stock is ₹{intrinsicValue.toFixed(2)}
                    </p>
                    
                    {currentPrice && (
                      (() => {
                        const current = parseFloat(currentPrice);
                        const analysis = getValuationAnalysis(intrinsicValue, current);
                        return (
                          <div className={`${analysis.bg} border border-gray-200 rounded-lg p-4`}>
                            <p className={`font-semibold ${analysis.color}`}>
                              Analysis: {analysis.status}
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              Current Price: ₹{current} | Intrinsic Value: ₹{intrinsicValue.toFixed(2)}
                            </p>
                          </div>
                        );
                      })()
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-2 text-blue-600" />
                  What is Intrinsic Value?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-4">
                    <strong>Intrinsic Value</strong> is the true value of a stock based on its fundamentals, independent of market price. It represents what a stock is actually worth based on its earnings, growth potential, and risk.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                    <h3 className="font-semibold text-blue-800 mb-2">Gordon Growth Model Formula:</h3>
                    <div className="text-blue-700 font-mono text-lg">
                      Intrinsic Value = EPS × (1 + g) ÷ (r - g)
                    </div>
                    <p className="text-sm text-blue-600 mt-2">
                      Where: g = growth rate, r = required rate of return
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Components:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Earnings Per Share (EPS):</strong> Company's profit per share</li>
                    <li>• <strong>Growth Rate:</strong> Expected annual earnings growth</li>
                    <li>• <strong>Discount Rate:</strong> Required rate of return for investors</li>
                    <li>• <strong>Risk Assessment:</strong> Company and market risk factors</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-purple-600" />
                  Example Calculation
                </h2>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Stock Valuation Example</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Current EPS:</strong> ₹50</p>
                      <p><strong>Growth Rate:</strong> 8%</p>
                      <p><strong>Discount Rate:</strong> 12%</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-800">Intrinsic Value:</p>
                      <p className="text-2xl font-bold text-green-600">₹1,350</p>
                      <p className="text-sm text-green-700">Fair Value Range</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-orange-600" />
                  Valuation Analysis
                </h2>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Undervalued (Below 80% of Intrinsic Value)</h3>
                    <p className="text-green-700 text-sm">
                      Stock price is significantly below intrinsic value. May present a buying opportunity, but research the reasons for undervaluation.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Fair Value (80-120% of Intrinsic Value)</h3>
                    <p className="text-blue-700 text-sm">
                      Stock price is close to intrinsic value. Consider other factors like market conditions and company prospects.
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2">Overvalued (Above 120% of Intrinsic Value)</h3>
                    <p className="text-red-700 text-sm">
                      Stock price is above intrinsic value. May indicate high growth expectations or market speculation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntrinsicValueCalculator;
