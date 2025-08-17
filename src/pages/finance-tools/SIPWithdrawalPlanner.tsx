import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  ArrowRight, 
  Target,
  Calendar,
  PieChart
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const SIPWithdrawalPlanner: React.FC = () => {
  const [currentCorpus, setCurrentCorpus] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [withdrawalPeriod, setWithdrawalPeriod] = useState(20);
  const [inflationRate, setInflationRate] = useState(6);

  // Calculate withdrawal plan
  const calculateWithdrawalPlan = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const monthlyInflation = inflationRate / 100 / 12;
    const totalMonths = withdrawalPeriod * 12;
    
    let remainingCorpus = currentCorpus;
    const yearlyBreakdown = [];
    let totalWithdrawn = 0;
    let corpusAtEnd = 0;
    
    for (let year = 1; year <= withdrawalPeriod; year++) {
      let yearlyWithdrawal = 0;
      const yearStartCorpus = remainingCorpus;
      
      for (let month = 1; month <= 12; month++) {
        // Calculate inflation-adjusted withdrawal
        const inflationAdjustedWithdrawal = monthlyWithdrawal * Math.pow(1 + monthlyInflation, (year - 1) * 12 + month - 1);
        
        // Apply withdrawal
        remainingCorpus -= inflationAdjustedWithdrawal;
        yearlyWithdrawal += inflationAdjustedWithdrawal;
        
        // Apply returns on remaining corpus
        remainingCorpus *= (1 + monthlyRate);
      }
      
      yearlyBreakdown.push({
        year,
        yearStartCorpus,
        yearlyWithdrawal,
        yearEndCorpus: remainingCorpus,
        withdrawalPercentage: (yearlyWithdrawal / yearStartCorpus) * 100
      });
      
      totalWithdrawn += yearlyWithdrawal;
    }
    
    corpusAtEnd = remainingCorpus;
    
    // Calculate sustainable withdrawal rate
    const sustainableWithdrawalRate = (monthlyWithdrawal * 12 / currentCorpus) * 100;
    
    // Calculate years until corpus depletion
    let yearsToDepletion = 0;
    let testCorpus = currentCorpus;
    while (testCorpus > 0 && yearsToDepletion < 50) {
      for (let month = 1; month <= 12; month++) {
        const inflationAdjustedWithdrawal = monthlyWithdrawal * Math.pow(1 + monthlyInflation, yearsToDepletion * 12 + month - 1);
        testCorpus -= inflationAdjustedWithdrawal;
        if (testCorpus <= 0) break;
        testCorpus *= (1 + monthlyRate);
      }
      yearsToDepletion++;
    }
    
    return {
      yearlyBreakdown,
      totalWithdrawn,
      corpusAtEnd,
      sustainableWithdrawalRate,
      yearsToDepletion: Math.min(yearsToDepletion, withdrawalPeriod),
      isSustainable: corpusAtEnd > 0
    };
  };

  const results = calculateWithdrawalPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="SIP Withdrawal Planner - Plan Systematic Withdrawals from Investments"
        description="Plan systematic withdrawals from your SIP investments. Calculate sustainable withdrawal rates, corpus longevity, and create a comprehensive withdrawal strategy for retirement planning."
        keywords="SIP withdrawal planner, systematic withdrawal plan, retirement planning, investment withdrawal calculator, corpus longevity"
        url="/finance-tools/sip-withdrawal-planner"
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
            SIP Withdrawal Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plan systematic withdrawals from your SIP investments and ensure your corpus lasts throughout your retirement years.
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
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Withdrawal Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Corpus (₹)
                </label>
                <input
                  type="number"
                  value={currentCorpus}
                  onChange={(e) => setCurrentCorpus(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Withdrawal (₹)
                </label>
                <input
                  type="number"
                  value={monthlyWithdrawal}
                  onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50000"
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
                  placeholder="8"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Period (Years)
                </label>
                <input
                  type="number"
                  value={withdrawalPeriod}
                  onChange={(e) => setWithdrawalPeriod(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inflation Rate (%)
                </label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6"
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
            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-green-600" />
                Withdrawal Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`rounded-lg p-4 ${results.isSustainable ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className={`text-sm font-medium mb-2 ${results.isSustainable ? 'text-green-800' : 'text-red-800'}`}>
                    Corpus Status
                  </h3>
                  <p className={`text-2xl font-bold ${results.isSustainable ? 'text-green-900' : 'text-red-900'}`}>
                    {results.isSustainable ? 'Sustainable' : 'Not Sustainable'}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Withdrawal Rate</h3>
                  <p className="text-2xl font-bold text-blue-900">
                    {results.sustainableWithdrawalRate.toFixed(2)}%
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Years to Depletion</h3>
                  <p className="text-2xl font-bold text-purple-900">
                    {results.yearsToDepletion} years
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Corpus at End</h3>
                  <p className="text-2xl font-bold text-orange-900">
                    ₹{results.corpusAtEnd.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>

            {/* Yearly Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Yearly Breakdown
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {results.yearlyBreakdown.slice(0, 10).map((year) => (
                  <div key={year.year} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-semibold text-gray-900">Year {year.year}</span>
                      <p className="text-sm text-gray-600">
                        Withdrawal: ₹{year.yearlyWithdrawal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ₹{year.yearEndCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-xs text-gray-600">
                        {year.withdrawalPercentage.toFixed(1)}% of corpus
                      </p>
                    </div>
                  </div>
                ))}
                {results.yearlyBreakdown.length > 10 && (
                  <p className="text-sm text-gray-600 text-center">
                    ... and {results.yearlyBreakdown.length - 10} more years
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
            Key Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Sustainable Withdrawal Rate</h3>
              <p className="text-sm text-blue-700">
                A withdrawal rate of 4-5% is generally considered sustainable for long-term retirement planning.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Inflation Impact</h3>
              <p className="text-sm text-green-700">
                Inflation reduces the purchasing power of your withdrawals over time, requiring higher withdrawal amounts.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Corpus Longevity</h3>
              <p className="text-sm text-purple-700">
                Higher returns and lower withdrawal rates increase the likelihood of your corpus lasting throughout retirement.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/finance-tools/sip-vs-swp-tool"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">SIP vs SWP Tool</h3>
              <p className="text-sm text-gray-600">Compare systematic investment vs withdrawal plans</p>
            </Link>
            <Link
              to="/finance-tools/sip-inflation-adjusted-calculator"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">SIP Inflation Calculator</h3>
              <p className="text-sm text-gray-600">Calculate real returns after inflation adjustment</p>
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

export default SIPWithdrawalPlanner;