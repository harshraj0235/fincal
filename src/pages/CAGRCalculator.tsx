import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Info, ExternalLink } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import WhyChooseUs from '../components/WhyChooseUs';

const CAGRCalculator: React.FC = () => {
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [cagr, setCagr] = useState<number | null>(null);

  const calculateCAGR = () => {
    if (!initialValue || !finalValue || !timePeriod) return;

    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);
    const years = parseFloat(timePeriod);

    if (initial <= 0 || final <= 0 || years <= 0) return;

    const cagrValue = Math.pow(final / initial, 1 / years) - 1;
    setCagr(cagrValue * 100);
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title="CAGR Calculator - Compound Annual Growth Rate Calculator | MoneyCal.in"
        description="Calculate Compound Annual Growth Rate (CAGR) for investments, stocks, and mutual funds. Free online CAGR Calculator with detailed analysis."
        keywords="CAGR Calculator, compound annual growth rate, investment Calculator, stock returns, mutual fund returns"
        url="/calculators/cagr-calculator"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">CAGR Calculator</h1>
            <p className="text-xl text-gray-600">Calculate Compound Annual Growth Rate for your investments</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 mr-2 text-green-600" />
                Calculate CAGR
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Investment Value (₹)
                  </label>
                  <input
                    type="number"
                    value={initialValue}
                    onChange={(e) => setInitialValue(e.target.value)}
                    placeholder="Enter initial value"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Final Investment Value (₹)
                  </label>
                  <input
                    type="number"
                    value={finalValue}
                    onChange={(e) => setFinalValue(e.target.value)}
                    placeholder="Enter final value"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period (Years)
                  </label>
                  <input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    placeholder="Enter time period"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={calculateCAGR}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
                >
                  Calculate CAGR
                </button>

                {cagr !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">CAGR Result</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {cagr.toFixed(2)}%
                    </div>
                    <p className="text-sm text-gray-600">
                      Your investment grew at an average annual rate of {cagr.toFixed(2)}%
                    </p>
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
                  What is CAGR?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-4">
                    <strong>Compound Annual Growth Rate (CAGR)</strong> is a financial metric that measures the mean annual growth rate of an investment over a specified time period longer than one year.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                    <h3 className="font-semibold text-blue-800 mb-2">CAGR Formula:</h3>
                    <div className="text-blue-700 font-mono text-lg">
                      CAGR = (Final Value / Initial Value)^(1/Time Period) - 1
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Why CAGR is Important:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Compare investments with different time periods</li>
                    <li>• Understand expected returns for financial planning</li>
                    <li>• Evaluate investment performance against benchmarks</li>
                    <li>• Analyze overall portfolio performance</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-purple-600" />
                  Example Calculation
                </h2>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Stock Investment Example</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Initial Investment:</strong> ₹10,000</p>
                      <p><strong>Final Value:</strong> ₹15,000</p>
                      <p><strong>Time Period:</strong> 3 years</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-800">CAGR Result:</p>
                      <p className="text-2xl font-bold text-green-600">14.47%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional FAQs */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-2 text-blue-600" />
                  CAGR Calculator - FAQs (2025)
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">How to calculate CAGR in India for mutual funds?</h3>
                    <p className="text-gray-600">
                      Use initial NAV and current NAV with the holding period. Our Calculator provides instant results. 
                      Compare with our <a href="/calculators/mutual-fund-returns-calculator" className="underline text-blue-700">Mutual Fund Returns Calculator</a> for detailed analysis.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">What's the difference between CAGR and absolute returns?</h3>
                    <p className="text-gray-600">
                      CAGR smooths out volatility and shows annualized returns, while absolute returns show total percentage gain/loss. 
                      CAGR is better for comparing investments with different time periods.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">What is a good CAGR for stock investments in India?</h3>
                    <p className="text-gray-600">
                      10-15% CAGR is considered good for equity investments. Nifty 50 has delivered ~12% CAGR historically. 
                      Check real-time data on <a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">NSE India <ExternalLink className="w-3 h-3 inline" /></a>.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Can I use CAGR for SIP investments?</h3>
                    <p className="text-gray-600">
                      For SIP (multiple investments over time), use XIRR instead of CAGR for accurate returns. 
                      Try our <a href="/finance-tools/xirr-calculator" className="underline text-blue-700">XIRR Calculator</a> for SIP return calculations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="mt-8">
                <WhyChooseUs />
              </div>

              {/* Related Calculators */}
              <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Investment Calculators</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a
                    href="/finance-tools/xirr-calculator"
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="font-medium text-gray-900">XIRR Calculator</div>
                    <div className="text-sm text-gray-600">Calculate returns for irregular investments</div>
                  </a>
                  <a
                    href="/calculators/sip-calculator"
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="font-medium text-gray-900">SIP Calculator</div>
                    <div className="text-sm text-gray-600">Calculate SIP returns</div>
                  </a>
                  <a
                    href="/calculators/mutual-fund-returns-calculator"
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="font-medium text-gray-900">Mutual Fund Calculator</div>
                    <div className="text-sm text-gray-600">Analyze mutual fund performance</div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CAGRCalculator;
