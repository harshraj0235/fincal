import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  ArrowRight, 
  Target,
  DollarSign,
  PieChart
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const SIPVsSWPTool: React.FC = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [initialCorpus, setInitialCorpus] = useState(1000000);

  // Calculate SIP vs SWP comparison
  const calculateComparison = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    // SIP Calculation
    const sipCorpus = monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    const sipTotalInvestment = monthlyAmount * totalMonths;
    const sipReturns = sipCorpus - sipTotalInvestment;
    
    // SWP Calculation
    let swpCorpus = initialCorpus;
    const swpWithdrawals = [];
    let totalWithdrawn = 0;
    
    for (let month = 1; month <= totalMonths; month++) {
      // Withdraw monthly amount
      swpCorpus -= monthlyAmount;
      totalWithdrawn += monthlyAmount;
      
      // Apply returns on remaining corpus
      swpCorpus *= (1 + monthlyRate);
      
      if (month % 12 === 0) {
        swpWithdrawals.push({
          year: Math.floor(month / 12),
          yearStartCorpus: swpCorpus / (1 + monthlyRate) + monthlyAmount,
          yearEndCorpus: swpCorpus,
          yearlyWithdrawal: monthlyAmount * 12
        });
      }
    }
    
    const swpReturns = totalWithdrawn - initialCorpus;
    const swpFinalCorpus = swpCorpus;
    
    return {
      sip: {
        corpus: sipCorpus,
        totalInvestment: sipTotalInvestment,
        returns: sipReturns,
        returnPercentage: (sipReturns / sipTotalInvestment) * 100
      },
      swp: {
        corpus: swpFinalCorpus,
        totalWithdrawn: totalWithdrawn,
        returns: swpReturns,
        returnPercentage: (swpReturns / initialCorpus) * 100,
        yearlyBreakdown: swpWithdrawals
      },
      comparison: {
        sipAdvantage: sipCorpus - swpFinalCorpus,
        swpAdvantage: totalWithdrawn - sipTotalInvestment,
        betterOption: sipCorpus > totalWithdrawn ? 'SIP' : 'SWP'
      }
    };
  };

  const results = calculateComparison();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="SIP vs SWP Tool - Compare Systematic Investment vs Withdrawal Plans"
        description="Compare Systematic Investment Plan (SIP) vs Systematic Withdrawal Plan (SWP) to understand which strategy works better for your financial goals."
        keywords="SIP vs SWP, systematic investment plan, systematic withdrawal plan, investment comparison, retirement planning"
        url="/finance-tools/sip-vs-swp-tool"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
          className="text-center mb-8"
            >
              <div className="flex items-center justify-center mb-4">
            <Link to="/finance-tools" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
              <ArrowRight className="h-4 w-4 rotate-180 mr-1" />
                  Back to Finance Tools
                </Link>
              </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SIP vs SWP Tool
              </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare Systematic Investment Plan (SIP) vs Systematic Withdrawal Plan (SWP) to understand which strategy works better for your financial goals.
              </p>
            </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
              Comparison Parameters
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Amount (₹)
                    </label>
                    <input
                      type="number"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Annual Return (%)
                    </label>
                    <input
                      type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Period (Years)
                    </label>
                    <input
                      type="number"
                  value={investmentPeriod}
                  onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10"
                    />
                  </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Corpus for SWP (₹)
                </label>
                <input
                  type="number"
                  value={initialCorpus}
                  onChange={(e) => setInitialCorpus(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000000"
                />
              </div>
                </div>
              </motion.div>

          {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
            {/* SIP Results */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                SIP Results
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Final Corpus</h3>
                  <p className="text-2xl font-bold text-green-900">
                    ₹{results.sip.corpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                  </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Total Investment</h3>
                  <p className="text-2xl font-bold text-blue-900">
                    ₹{results.sip.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Total Returns</h3>
                  <p className="text-2xl font-bold text-purple-900">
                    ₹{results.sip.returns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                    </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Return %</h3>
                  <p className="text-2xl font-bold text-orange-900">
                    {results.sip.returnPercentage.toFixed(2)}%
                  </p>
                    </div>
                    </div>
                  </div>

            {/* SWP Results */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingDown className="h-6 w-6 mr-2 text-red-600" />
                SWP Results
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Final Corpus</h3>
                  <p className="text-2xl font-bold text-red-900">
                    ₹{results.swp.corpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Total Withdrawn</h3>
                  <p className="text-2xl font-bold text-blue-900">
                    ₹{results.swp.totalWithdrawn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Total Returns</h3>
                  <p className="text-2xl font-bold text-purple-900">
                    ₹{results.swp.returns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Return %</h3>
                  <p className="text-2xl font-bold text-orange-900">
                    {results.swp.returnPercentage.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comparison Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Comparison Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">SIP Advantage</h3>
              <p className="text-3xl font-bold text-green-900 mb-2">
                ₹{results.comparison.sipAdvantage.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-green-700">
                SIP builds a larger corpus compared to SWP withdrawals
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">SWP Advantage</h3>
              <p className="text-3xl font-bold text-blue-900 mb-2">
                ₹{results.comparison.swpAdvantage.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-sm text-blue-700">
                SWP provides immediate liquidity and regular income
              </p>
            </div>

            <div className={`rounded-lg p-6 ${results.comparison.betterOption === 'SIP' ? 'bg-green-50' : 'bg-red-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${results.comparison.betterOption === 'SIP' ? 'text-green-900' : 'text-red-900'}`}>
                Better Option
              </h3>
              <p className={`text-3xl font-bold mb-2 ${results.comparison.betterOption === 'SIP' ? 'text-green-900' : 'text-red-900'}`}>
                {results.comparison.betterOption}
              </p>
              <p className={`text-sm ${results.comparison.betterOption === 'SIP' ? 'text-green-700' : 'text-red-700'}`}>
                {results.comparison.betterOption === 'SIP' 
                  ? 'SIP is better for wealth accumulation' 
                  : 'SWP is better for regular income'}
              </p>
            </div>
                </div>
              </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <PieChart className="h-6 w-6 mr-2 text-green-600" />
            Key Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">SIP Benefits</h3>
              <p className="text-sm text-blue-700">
                SIP is ideal for wealth accumulation, rupee cost averaging, and long-term financial goals.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">SWP Benefits</h3>
              <p className="text-sm text-green-700">
                SWP provides regular income, tax efficiency, and helps maintain lifestyle during retirement.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">When to Use Each</h3>
              <p className="text-sm text-purple-700">
                Use SIP for accumulation phase and SWP for distribution phase of your financial journey.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/finance-tools/sip-withdrawal-planner"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">SIP Withdrawal Planner</h3>
              <p className="text-sm text-gray-600">Plan systematic withdrawals from investments</p>
            </Link>
            <Link
              to="/finance-tools/sip-step-up-planner"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">SIP Step-up Planner</h3>
              <p className="text-sm text-gray-600">Plan systematic increases in SIP amount</p>
            </Link>
            <Link
              to="/finance-tools/asset-allocation-tool"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">Asset Allocation Tool</h3>
              <p className="text-sm text-gray-600">Optimize your investment portfolio allocation</p>
            </Link>
            <Link
              to="/finance-tools"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">All Finance Tools</h3>
              <p className="text-sm text-gray-600">Explore our complete collection of financial tools</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SIPVsSWPTool;