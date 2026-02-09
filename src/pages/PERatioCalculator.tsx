import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, BarChart3, Info, TrendingUp } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const PERatioCalculator: React.FC = () => {
  const [stockPrice, setStockPrice] = useState('');
  const [earningsPerShare, setEarningsPerShare] = useState('');
  const [peRatio, setPeRatio] = useState<number | null>(null);

  const calculatePERatio = () => {
    if (!stockPrice || !earningsPerShare) return;

    const price = parseFloat(stockPrice);
    const eps = parseFloat(earningsPerShare);

    if (price <= 0 || eps <= 0) return;

    const ratio = price / eps;
    setPeRatio(ratio);
  };

  const getPERatioAnalysis = (ratio: number) => {
    if (ratio < 15) return { status: 'Undervalued', color: 'text-green-600', bg: 'bg-green-50' };
    if (ratio < 25) return { status: 'Fair Value', color: 'text-blue-600', bg: 'bg-blue-50' };
    return { status: 'Overvalued', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="P/E Ratio Calculator - Price to Earnings Ratio Calculator | MoneyCal.in"
        description="Calculate Price-to-Earnings (P/E) ratio for stocks. Free online P/E ratio calculator with analysis and comparison tools for stock valuation."
        keywords="P/E ratio calculator, price to earnings ratio, stock valuation, PE ratio, earnings per share, stock analysis"
        url="/calculators/pe-ratio-calculator"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">P/E Ratio Calculator</h1>
            <p className="text-xl text-gray-600">Calculate Price-to-Earnings ratio for stock valuation</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-2 text-green-600" />
                Calculate P/E Ratio
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Price (₹)
                  </label>
                  <input
                    type="number"
                    value={stockPrice}
                    onChange={(e) => setStockPrice(e.target.value)}
                    placeholder="Enter current stock price"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Earnings Per Share (₹)
                  </label>
                  <input
                    type="number"
                    value={earningsPerShare}
                    onChange={(e) => setEarningsPerShare(e.target.value)}
                    placeholder="Enter EPS"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={calculatePERatio}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
                >
                  Calculate P/E Ratio
                </button>

                {peRatio !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">P/E Ratio Result</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {peRatio.toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      The stock is trading at {peRatio.toFixed(2)} times its earnings
                    </p>
                    
                    {(() => {
                      const analysis = getPERatioAnalysis(peRatio);
                      return (
                        <div className={`${analysis.bg} border border-gray-200 rounded-lg p-4`}>
                          <p className={`font-semibold ${analysis.color}`}>
                            Analysis: {analysis.status}
                          </p>
                        </div>
                      );
                    })()}
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
                  What is P/E Ratio?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-4">
                    <strong>Price-to-Earnings (P/E) Ratio</strong> is a financial metric used to evaluate a company's stock price relative to its earnings per share. It helps investors determine if a stock is overvalued, undervalued, or fairly priced.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                    <h3 className="font-semibold text-blue-800 mb-2">P/E Ratio Formula:</h3>
                    <div className="text-blue-700 font-mono text-lg">
                      P/E Ratio = Stock Price ÷ Earnings Per Share
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">P/E Ratio Interpretation:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Low P/E (Below 15):</strong> Potentially undervalued stock</li>
                    <li>• <strong>Average P/E (15-25):</strong> Fairly valued stock</li>
                    <li>• <strong>High P/E (Above 25):</strong> Potentially overvalued stock</li>
                    <li>• <strong>Negative P/E:</strong> Company is losing money</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
                  Example Calculation
                </h2>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Stock Example</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Stock Price:</strong> ₹1,500</p>
                      <p><strong>Earnings Per Share:</strong> ₹75</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-800">P/E Ratio:</p>
                      <p className="text-2xl font-bold text-green-600">20.00</p>
                      <p className="text-sm text-green-700">Fairly Valued</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-orange-600" />
                  P/E Ratio Analysis
                </h2>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Low P/E Ratio (Below 15)</h3>
                    <p className="text-green-700 text-sm">
                      May indicate undervalued stock, but could also signal poor growth prospects or financial problems.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Average P/E Ratio (15-25)</h3>
                    <p className="text-blue-700 text-sm">
                      Generally considered fair value, balanced between growth potential and current earnings.
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-2">High P/E Ratio (Above 25)</h3>
                    <p className="text-red-700 text-sm">
                      May indicate overvalued stock or high growth expectations from investors.
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

export default PERatioCalculator;
