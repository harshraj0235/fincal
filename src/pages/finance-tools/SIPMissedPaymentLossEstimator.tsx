import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  ArrowRight, 
  Target 
} from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const SIPMissedPaymentLossEstimator: React.FC = () => {
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [missedMonths, setMissedMonths] = useState(3);
  const [missedAmount, setMissedAmount] = useState(10000);
  const [targetAmount, setTargetAmount] = useState(2000000);

  // Calculate the impact of missed payments
  const calculateMissedPaymentImpact = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    // Regular SIP corpus without missed payments
    const regularCorpus = monthlySIP * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    // Corpus with missed payments
    const effectiveMonths = totalMonths - missedMonths;
    const corpusWithMissed = monthlySIP * ((Math.pow(1 + monthlyRate, effectiveMonths) - 1) / monthlyRate);
    
    // Additional loss from missed amount
    const missedAmountLoss = missedAmount * Math.pow(1 + monthlyRate, effectiveMonths);
    
    const totalCorpusWithMissed = corpusWithMissed + missedAmountLoss;
    const corpusLoss = regularCorpus - totalCorpusWithMissed;
    const percentageLoss = (corpusLoss / regularCorpus) * 100;
    
    // Years to recover
    const yearsToRecover = Math.log(targetAmount / totalCorpusWithMissed) / Math.log(1 + expectedReturn / 100);
    
    return {
      regularCorpus,
      totalCorpusWithMissed,
      corpusLoss,
      percentageLoss,
      yearsToRecover: Math.max(0, yearsToRecover),
      missedOpportunity: missedAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod) - missedAmount
    };
  };

  const results = calculateMissedPaymentImpact();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="SIP Missed Payment Loss Estimator - Calculate Impact of Skipped SIP Payments"
        description="Estimate the impact of missing SIP payments on your investment goals. Calculate corpus loss, recovery time, and missed opportunities with our comprehensive SIP missed payment calculator."
        keywords="SIP missed payment, investment loss calculator, SIP impact analysis, missed SIP payment loss, investment goal calculator"
        url="/finance-tools/sip-missed-payment-loss-estimator"
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
            SIP Missed Payment Loss Estimator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate the impact of missing SIP payments on your investment goals and understand the long-term consequences of skipped investments.
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
              Investment Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly SIP Amount (₹)
                </label>
                <input
                  type="number"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(Number(e.target.value))}
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
                  Number of Missed Months
                </label>
                <input
                  type="number"
                  value={missedMonths}
                  onChange={(e) => setMissedMonths(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Missed Amount (₹)
                </label>
                <input
                  type="number"
                  value={missedAmount}
                  onChange={(e) => setMissedAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Amount (₹)
                </label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000000"
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
            {/* Impact Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
                Impact Analysis
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Regular SIP Corpus</h3>
                  <p className="text-2xl font-bold text-green-900">
                    ₹{results.regularCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Corpus with Missed Payments</h3>
                  <p className="text-2xl font-bold text-red-900">
                    ₹{results.totalCorpusWithMissed.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Corpus Loss</h3>
                  <p className="text-2xl font-bold text-orange-900">
                    ₹{results.corpusLoss.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Percentage Loss</h3>
                  <p className="text-2xl font-bold text-purple-900">
                    {results.percentageLoss.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Recovery Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Recovery Analysis
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Years to Reach Target</span>
                  <span className="text-xl font-bold text-blue-900">
                    {results.yearsToRecover.toFixed(1)} years
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700">Missed Opportunity Cost</span>
                  <span className="text-xl font-bold text-yellow-900">
                    ₹{results.missedOpportunity.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-gray-700">Total Financial Impact</span>
                  <span className="text-xl font-bold text-red-900">
                    ₹{(results.corpusLoss + results.missedOpportunity).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
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
              <h3 className="font-semibold text-blue-900 mb-2">Compounding Impact</h3>
              <p className="text-sm text-blue-700">
                Missing SIP payments has a compounding effect that grows over time, making it harder to achieve your financial goals.
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Recovery Strategy</h3>
              <p className="text-sm text-green-700">
                Consider increasing your SIP amount or extending your investment period to compensate for missed payments.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Opportunity Cost</h3>
              <p className="text-sm text-purple-700">
                The real cost includes not just the missed amount but also the potential returns that could have been earned.
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
              to="/finance-tools/sip-delay-loss-calculator"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">SIP Delay Loss Calculator</h3>
              <p className="text-sm text-gray-600">Calculate losses due to delayed SIP investments</p>
            </Link>
            <Link
              to="/finance-tools/sip-step-up-planner"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">SIP Step-up Planner</h3>
              <p className="text-sm text-gray-600">Plan systematic increases in your SIP amount</p>
            </Link>
            <Link
              to="/finance-tools/sip-inflation-adjusted-calculator"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <h3 className="font-semibold text-gray-900">SIP Inflation Calculator</h3>
              <p className="text-sm text-gray-600">Calculate real returns after inflation adjustment</p>
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

export default SIPMissedPaymentLossEstimator;