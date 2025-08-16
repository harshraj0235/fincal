import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info, AlertCircle, DollarSign, Clock, TrendingDown } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

interface ExitLoadResult {
  fundName: string;
  exitLoad: number;
  exitLoadAmount: number;
  netAmount: number;
  description: string;
}

const MutualFundExitLoadChecker: React.FC = () => {
  const [fundName, setFundName] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [holdingPeriod, setHoldingPeriod] = useState('');
  const [result, setResult] = useState<ExitLoadResult | null>(null);

  const calculateExitLoad = () => {
    if (!fundName || !investmentAmount || !holdingPeriod) {
      alert('Please fill in all fields');
      return;
    }

    const amount = parseFloat(investmentAmount);
    const period = parseInt(holdingPeriod);

    let exitLoadRate = 0;
    let description = '';

    // Exit load calculation based on holding period
    if (period <= 7) {
      exitLoadRate = 1.0; // 1% for first 7 days
      description = 'Exit load: 1% (within 7 days)';
    } else if (period <= 30) {
      exitLoadRate = 0.5; // 0.5% for 8-30 days
      description = 'Exit load: 0.5% (8-30 days)';
    } else if (period <= 365) {
      exitLoadRate = 0.25; // 0.25% for 31-365 days
      description = 'Exit load: 0.25% (31-365 days)';
    } else {
      exitLoadRate = 0; // No exit load after 1 year
      description = 'No exit load (after 1 year)';
    }

    const exitLoadAmount = (amount * exitLoadRate) / 100;
    const netAmount = amount - exitLoadAmount;

    setResult({
      fundName,
      exitLoad: exitLoadRate,
      exitLoadAmount,
      netAmount,
      description
    });
  };

  const resetForm = () => {
    setFundName('');
    setInvestmentAmount('');
    setHoldingPeriod('');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Mutual Fund Exit Load Checker - Calculate Exit Charges | MoneyCal"
        description="Check exit load charges for mutual fund redemptions. Calculate how much you'll pay when redeeming your mutual fund investments."
        keywords="mutual fund exit load calculator, exit charges, fund redemption calculator, mutual fund fees"
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
                Mutual Fund Exit Load Checker
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Calculate exit load charges for your mutual fund redemptions
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
                  Fund Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fund Name
                    </label>
                    <input
                      type="text"
                      value={fundName}
                      onChange={(e) => setFundName(e.target.value)}
                      placeholder="Enter fund name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Enter investment amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Holding Period (Days)
                    </label>
                    <input
                      type="number"
                      value={holdingPeriod}
                      onChange={(e) => setHoldingPeriod(e.target.value)}
                      placeholder="Enter holding period in days"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={calculateExitLoad}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Calculate Exit Load
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
                  Exit Load Analysis
                </h2>

                {result ? (
                  <div className="space-y-6">
                    {/* Fund Info */}
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-blue-600">Fund Name</p>
                      <p className="text-xl font-bold text-blue-900">{result.fundName}</p>
                    </div>

                    {/* Exit Load Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">Investment Amount:</span>
                        <span className="font-bold text-green-600">₹{parseFloat(investmentAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <span className="text-gray-700">Exit Load Rate:</span>
                        <span className="font-bold text-red-600">{result.exitLoad}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-700">Exit Load Amount:</span>
                        <span className="font-bold text-yellow-600">₹{result.exitLoadAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg border-2 border-purple-300">
                        <span className="text-gray-700 font-semibold">Net Amount:</span>
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
                    <p className="text-gray-600">Enter fund details to calculate exit load</p>
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
                Understanding Exit Load
              </h2>
              
              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Exit Load Structure
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Within 7 days:</span>
                      <span className="font-bold text-blue-900">1.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">8-30 days:</span>
                      <span className="font-bold text-blue-900">0.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">31-365 days:</span>
                      <span className="font-bold text-blue-900">0.25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">After 1 year:</span>
                      <span className="font-bold text-blue-900">0%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Exit load rates may vary between funds</li>
                  <li>• Check fund's offer document for exact rates</li>
                  <li>• This calculator provides general estimates</li>
                  <li>• Consult fund house for accurate charges</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MutualFundExitLoadChecker;
