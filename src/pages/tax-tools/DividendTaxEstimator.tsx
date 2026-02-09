import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, AlertCircle, DollarSign, TrendingUp, Percent } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface DividendResult {
  dividendAmount: number;
  taxRate: number;
  taxAmount: number;
  netAmount: number;
  description: string;
  category: string;
}

const DividendTaxEstimator: React.FC = () => {
  const [dividendAmount, setDividendAmount] = useState('');
  const [dividendType, setDividendType] = useState<'equity' | 'debt' | 'mutual-fund'>('equity');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<DividendResult | null>(null);

  const calculateTax = () => {
    if (!dividendAmount) {
      alert('Please enter dividend amount');
      return;
    }

    const amount = parseFloat(dividendAmount);
    let taxRate = 0;
    let description = '';
    let category = '';

    if (dividendType === 'equity') {
      // Equity dividends - TDS at 10% (post-2020)
      taxRate = 10;
      description = 'Equity dividends - TDS at 10% (post-2020 rules)';
      category = 'Equity Dividend';
    } else if (dividendType === 'debt') {
      // Debt fund dividends - TDS at 25% for resident individuals
      taxRate = 25;
      description = 'Debt fund dividends - TDS at 25% for resident individuals';
      category = 'Debt Fund Dividend';
    } else if (dividendType === 'mutual-fund') {
      // Mutual fund dividends - TDS at 10% (post-2020)
      taxRate = 10;
      description = 'Mutual fund dividends - TDS at 10% (post-2020 rules)';
      category = 'Mutual Fund Dividend';
    }

    const taxAmount = (amount * taxRate) / 100;
    const netAmount = amount - taxAmount;

    setResult({
      dividendAmount: amount,
      taxRate: taxRate,
      taxAmount: taxAmount,
      netAmount: netAmount,
      description: description,
      category: category
    });
  };

  const resetForm = () => {
    setDividendAmount('');
    setDividendType('equity');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Dividend Tax Estimator - Calculate Dividend Tax (Post-2020 Rules) | MoneyCal"
        description="Calculate dividend tax under new regulations. Estimate TDS on equity, debt, and mutual fund dividends with our comprehensive calculator."
        keywords="dividend tax calculator, TDS on dividends, equity dividend tax, mutual fund dividend tax, post-2020 dividend rules"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

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
                Dividend Tax Estimator
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate dividend tax under new post-2020 regulations
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
                  <Calculator className="h-6 w-6 mr-3 text-blue-600" />
                  Dividend Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dividend Type
                    </label>
                    <select
                      value={dividendType}
                      onChange={(e) => setDividendType(e.target.value as 'equity' | 'debt' | 'mutual-fund')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="equity">Equity Dividend</option>
                      <option value="debt">Debt Fund Dividend</option>
                      <option value="mutual-fund">Mutual Fund Dividend</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dividend Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={dividendAmount}
                      onChange={(e) => setDividendAmount(e.target.value)}
                      placeholder="Enter dividend amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Tax Slab (%)
                    </label>
                    <select
                      value={incomeSlab}
                      onChange={(e) => setIncomeSlab(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="5">5% (Up to ₹2.5L)</option>
                      <option value="20">20% (₹2.5L - ₹5L)</option>
                      <option value="30">30% (Above ₹5L)</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateTax}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Tax
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
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Tax Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Dividend Type Badge */}
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-600">Dividend Type</p>
                      <p className="text-xl font-bold text-blue-900">{result.category}</p>
                    </div>

                    {/* Tax Calculation */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Gross Dividend:</span>
                        <span className="font-bold text-green-600">₹{result.dividendAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">TDS Rate:</span>
                        <span className="font-bold text-red-600">{result.taxRate}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-700">TDS Amount:</span>
                        <span className="font-bold text-yellow-600">₹{result.taxAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-300">
                        <span className="text-gray-700 font-semibold">Net Dividend:</span>
                        <span className="font-bold text-purple-600">₹{result.netAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter dividend details to calculate tax</p>
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
                Understanding Dividend Tax (Post-2020)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Equity Dividends
                  </h3>
                  <ul className="space-y-2 text-blue-700">
                    <li>• TDS: 10%</li>
                    <li>• Applicable on equity shares</li>
                    <li>• Post-2020 rules</li>
                    <li>• No threshold limit</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Debt Fund Dividends
                  </h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• TDS: 25%</li>
                    <li>• For resident individuals</li>
                    <li>• No threshold limit</li>
                    <li>• Higher rate than equity</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                    <Percent className="h-5 w-5 mr-2" />
                    Mutual Fund Dividends
                  </h3>
                  <ul className="space-y-2 text-purple-700">
                    <li>• TDS: 10%</li>
                    <li>• Post-2020 rules</li>
                    <li>• No threshold limit</li>
                    <li>• Same as equity dividends</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• TDS is deducted at source by the company/fund</li>
                  <li>• Additional tax may apply based on your income slab</li>
                  <li>• This calculator shows TDS calculation only</li>
                  <li>• Consult a tax professional for complete tax planning</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DividendTaxEstimator;
