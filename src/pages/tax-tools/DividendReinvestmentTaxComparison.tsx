import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Info, TrendingUp, DollarSign, RefreshCw } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';


interface DividendComparisonResult {
  directInvestment: {
    initialAmount: number;
    finalAmount: number;
    totalTax: number;
    netAmount: number;
  };
  dividendReinvestment: {
    initialAmount: number;
    finalAmount: number;
    totalTax: number;
    netAmount: number;
  };
  difference: number;
  recommendation: string;
}

const DividendReinvestmentTaxComparison: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [dividendYield, setDividendYield] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [holdingPeriod, setHoldingPeriod] = useState('');
  const [incomeSlab, setIncomeSlab] = useState('30');
  const [result, setResult] = useState<DividendComparisonResult | null>(null);

  const calculateComparison = () => {
    if (!initialInvestment || !dividendYield || !growthRate || !holdingPeriod) {
      alert('Please fill in all fields');
      return;
    }

    const initial = parseFloat(initialInvestment);
    const dividendYieldRate = parseFloat(dividendYield) / 100;
    const growth = parseFloat(growthRate) / 100;
    const years = parseInt(holdingPeriod);
    const slabRate = parseInt(incomeSlab) / 100;

    // Direct Investment (no dividend reinvestment)
    const directFinal = initial * Math.pow(1 + growth, years);
    const directTax = 0; // No dividend tax if not taking dividends
    const directNet = directFinal - directTax;

    // Dividend Reinvestment
    let reinvestedAmount = initial;
    let totalDividendTax = 0;

    for (let year = 1; year <= years; year++) {
      const dividend = reinvestedAmount * dividendYieldRate;
      const dividendTax = dividend * slabRate;
      totalDividendTax += dividendTax;
      const afterTaxDividend = dividend - dividendTax;
      reinvestedAmount += afterTaxDividend;
      reinvestedAmount *= (1 + growth);
    }

    const reinvestmentFinal = reinvestedAmount;
    const reinvestmentNet = reinvestmentFinal - totalDividendTax;

    const difference = reinvestmentNet - directNet;
    const recommendation = difference > 0 
      ? 'Dividend reinvestment strategy is more beneficial'
      : 'Direct investment strategy is more beneficial';

    setResult({
      directInvestment: {
        initialAmount: initial,
        finalAmount: directFinal,
        totalTax: directTax,
        netAmount: directNet
      },
      dividendReinvestment: {
        initialAmount: initial,
        finalAmount: reinvestmentFinal,
        totalTax: totalDividendTax,
        netAmount: reinvestmentNet
      },
      difference,
      recommendation
    });
  };

  const resetForm = () => {
    setInitialInvestment('');
    setDividendYield('');
    setGrowthRate('');
    setHoldingPeriod('');
    setIncomeSlab('30');
    setResult(null);
  };

  return (
    <>
      <SEOHelmet
        title="Dividend Reinvestment Tax Comparison - Compare Investment Strategies | MoneyCal"
        description="Compare tax implications of dividend reinvestment vs direct investment strategies. Calculate which approach gives better returns."
        keywords="dividend reinvestment Calculator, dividend tax comparison, investment strategy Calculator, dividend vs growth"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Dividend Reinvestment Tax Comparison
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Compare tax implications of dividend reinvestment vs direct investment
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <IndianRupee className="h-6 w-6 mr-3 text-blue-600" />
                  Investment Parameters
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment (₹)
                    </label>
                    <input
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(e.target.value)}
                      placeholder="Enter initial investment amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dividend Yield (%)
                    </label>
                    <input
                      type="number"
                      value={dividendYield}
                      onChange={(e) => setDividendYield(e.target.value)}
                      placeholder="Enter annual dividend yield"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Growth Rate (%)
                    </label>
                    <input
                      type="number"
                      value={growthRate}
                      onChange={(e) => setGrowthRate(e.target.value)}
                      placeholder="Enter annual growth rate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Holding Period (Years)
                    </label>
                    <input
                      type="number"
                      value={holdingPeriod}
                      onChange={(e) => setHoldingPeriod(e.target.value)}
                      placeholder="Enter holding period in years"
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
                      onClick={calculateComparison}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Compare Strategies
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

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Strategy Comparison
                </h2>

                {result ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-3">Direct Investment</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Final Amount:</span>
                            <span className="font-bold">₹{result.directInvestment.finalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Tax:</span>
                            <span className="font-bold">₹{result.directInvestment.totalTax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-blue-700 font-semibold">
                            <span>Net Amount:</span>
                            <span>₹{result.directInvestment.netAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-900 mb-3">Dividend Reinvestment</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Final Amount:</span>
                            <span className="font-bold">₹{result.dividendReinvestment.finalAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Tax:</span>
                            <span className="font-bold">₹{result.dividendReinvestment.totalTax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-green-700 font-semibold">
                            <span>Net Amount:</span>
                            <span>₹{result.dividendReinvestment.netAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
                      <h3 className="font-semibold text-purple-900 mb-2">Difference</h3>
                      <p className={`text-lg font-bold ${result.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{Math.abs(result.difference).toLocaleString()} 
                        {result.difference > 0 ? ' (Better)' : ' (Worse)'}
                      </p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-900 mb-2">Recommendation</h3>
                      <p className="text-yellow-800">{result.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter investment parameters to compare strategies</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DividendReinvestmentTaxComparison;
