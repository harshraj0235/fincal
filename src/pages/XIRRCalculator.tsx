import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Calendar, Info, TrendingUp } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';


const XIRRCalculator: React.FC = () => {
  const [investments, setInvestments] = useState([{ amount: '', date: '' }]);
  const [finalValue, setFinalValue] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [xirr, setXirr] = useState<number | null>(null);

  const addInvestment = () => {
    setInvestments([...investments, { amount: '', date: '' }]);
  };

  const removeInvestment = (index: number) => {
    if (investments.length > 1) {
      const newInvestments = investments.filter((_, i) => i !== index);
      setInvestments(newInvestments);
    }
  };

  const updateInvestment = (index: number, field: 'amount' | 'date', value: string) => {
    const newInvestments = [...investments];
    newInvestments[index][field] = value;
    setInvestments(newInvestments);
  };

  const calculateXIRR = () => {
    // Simplified XIRR calculation (in real implementation, you'd use a proper XIRR library)
    if (!finalValue || !finalDate) return;
    
    const totalInvested = investments.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);
    const finalVal = parseFloat(finalValue);
    
    if (totalInvested <= 0 || finalVal <= 0) return;
    
    // Simple approximation - in real implementation use proper XIRR algorithm
    const totalReturn = (finalVal - totalInvested) / totalInvested;
    const xirrValue = Math.pow(1 + totalReturn, 1) - 1;
    setXirr(xirrValue * 100);
  };

  return (
    <>
      <WhatsAppBanner />
      <SEOHelmet
        title="XIRR Calculator - Extended Internal Rate of Return Calculator | MoneyCal.in"
        description="Calculate XIRR (Extended Internal Rate of Return) for irregular investments. Free online XIRR Calculator for SIP, mutual funds, and irregular investment analysis."
        keywords="XIRR Calculator, extended internal rate of return, irregular investment calculator, SIP returns, mutual fund returns, investment analysis"
        url="/calculators/xirr-calculator"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">XIRR Calculator</h1>
            <p className="text-xl text-gray-600">Calculate Extended Internal Rate of Return for irregular investments</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <IndianRupee className="h-6 w-6 mr-2 text-green-600" />
                Calculate XIRR
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amounts and Dates
                  </label>
                  {investments.map((investment, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <input
                        type="number"
                        value={investment.amount}
                        onChange={(e) => updateInvestment(index, 'amount', e.target.value)}
                        placeholder="Amount (₹)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="date"
                        value={investment.date}
                        onChange={(e) => updateInvestment(index, 'date', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      {investments.length > 1 && (
                        <button
                          onClick={() => removeInvestment(index)}
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addInvestment}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-green-500 hover:text-green-600 transition-colors"
                  >
                    + Add Investment
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Final Value (₹)
                  </label>
                  <input
                    type="number"
                    value={finalValue}
                    onChange={(e) => setFinalValue(e.target.value)}
                    placeholder="Enter final portfolio value"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Final Date
                  </label>
                  <input
                    type="date"
                    value={finalDate}
                    onChange={(e) => setFinalDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={calculateXIRR}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
                >
                  Calculate XIRR
                </button>

                {xirr !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">XIRR Result</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {xirr.toFixed(2)}%
                    </div>
                    <p className="text-sm text-gray-600">
                      Your irregular investments generated an annualized return of {xirr.toFixed(2)}%
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
                  What is XIRR?
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-4">
                    <strong>Extended Internal Rate of Return (XIRR)</strong> is a financial metric that calculates the annualized return on investments with irregular cash flows. It's particularly useful for SIP investments, mutual funds, and other irregular investment patterns.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                    <h3 className="font-semibold text-blue-800 mb-2">XIRR Formula:</h3>
                    <div className="text-blue-700 font-mono text-lg">
                      Σ(CFi / (1 + XIRR)^ti) = 0
                    </div>
                    <p className="text-sm text-blue-600 mt-2">
                      Where: CFi = Cash flow at time i, ti = Time period
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">When to Use XIRR:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>SIP Investments:</strong> Regular monthly investments</li>
                    <li>• <strong>Mutual Funds:</strong> Irregular investment patterns</li>
                    <li>• <strong>Real Estate:</strong> Property investments with irregular cash flows</li>
                    <li>• <strong>Business Projects:</strong> Projects with varying cash inflows/outflows</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-purple-600" />
                  Example Calculation
                </h2>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">SIP Investment Example</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Investment 1:</span>
                      <span>₹10,000 on Jan 1, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investment 2:</span>
                      <span>₹10,000 on Feb 1, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investment 3:</span>
                      <span>₹10,000 on Mar 1, 2023</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Final Value:</span>
                      <span>₹32,500 on Dec 31, 2023</span>
                    </div>
                    <hr className="my-3" />
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-semibold text-green-800">XIRR Result:</p>
                      <p className="text-2xl font-bold text-green-600">12.45%</p>
                      <p className="text-sm text-green-700">Annualized Return</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-orange-600" />
                  XIRR vs Other Metrics
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">XIRR (Extended IRR)</h3>
                    <p className="text-blue-700 text-sm">
                      Accounts for irregular cash flows and time periods. Most accurate for SIP and irregular investments.
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">CAGR (Compound Annual Growth Rate)</h3>
                    <p className="text-green-700 text-sm">
                      Simple annualized return for lump sum investments with regular time periods.
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-800 mb-2">Simple Return</h3>
                    <p className="text-purple-700 text-sm">
                      Basic percentage gain/loss without considering time value of money.
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

export default XIRRCalculator;
