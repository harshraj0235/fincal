import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, BarChart3, ArrowRight, Calendar, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundGoalPlanner: React.FC = () => {
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [timeHorizon, setTimeHorizon] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlyIncome, setMonthlyIncome] = useState(50000);

  const calculateGoalPlan = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = timeHorizon * 12;
    
    // Calculate required monthly SIP
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, timeHorizon);
    const additionalAmountNeeded = goalAmount - futureValueOfCurrentSavings;
    
    let requiredMonthlySIP = 0;
    if (additionalAmountNeeded > 0) {
      requiredMonthlySIP = additionalAmountNeeded / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    }
    
    // Calculate total investment needed
    const totalInvestment = currentSavings + (requiredMonthlySIP * totalMonths);
    const totalReturns = goalAmount - totalInvestment;
    
    // Calculate affordability
    const maxAffordableSIP = monthlyIncome * 0.3; // 30% of monthly income
    const isAffordable = requiredMonthlySIP <= maxAffordableSIP;
    
    // Yearly breakdown
    const yearlyBreakdown = [];
    let runningCorpus = currentSavings;
    
    for (let year = 1; year <= timeHorizon; year++) {
      runningCorpus *= (1 + expectedReturn / 100);
      runningCorpus += requiredMonthlySIP * 12 * Math.pow(1 + monthlyRate, (year - 1) * 12 + 6);
      
      yearlyBreakdown.push({
        year,
        corpus: runningCorpus,
        investment: currentSavings + (requiredMonthlySIP * year * 12),
        returns: runningCorpus - (currentSavings + (requiredMonthlySIP * year * 12)),
        percentageComplete: (runningCorpus / goalAmount) * 100
      });
    }
    
    return {
      requiredMonthlySIP,
      totalInvestment,
      totalReturns,
      isAffordable,
      maxAffordableSIP,
      yearlyBreakdown,
      futureValueOfCurrentSavings,
      additionalAmountNeeded
    };
  };

  const results = calculateGoalPlan();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund Goal Planner - Plan Your Financial Goals"
        description="Plan your mutual fund investments to achieve specific financial goals. Calculate required SIP amounts and track your progress towards financial milestones."
        keywords="mutual fund goal planner, financial goal planning, SIP calculator, investment planning"
        url="/finance-tools/mutual-fund-goal-planner"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Link to="/finance-tools" className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium">
              <ArrowRight className="h-4 w-4 rotate-180 mr-1" />
              Back to Finance Tools
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mutual Fund Goal Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plan your mutual fund investments to achieve your financial goals with precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2 text-blue-600" />
              Goal Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Amount (₹)</label>
                <input type="number" value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="1000000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon (Years)</label>
                <input type="number" value={timeHorizon} onChange={(e) => setTimeHorizon(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Annual Return (%)</label>
                <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Savings (₹)</label>
                <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="100000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="50000" />
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Investment Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`rounded-lg p-4 ${results.isAffordable ? 'bg-green-50' : 'bg-red-50'}`}>
                  <h3 className={`text-sm font-medium mb-2 ${results.isAffordable ? 'text-green-800' : 'text-red-800'}`}>Required Monthly SIP</h3>
                  <p className={`text-2xl font-bold ${results.isAffordable ? 'text-green-900' : 'text-red-900'}`}>₹{results.requiredMonthlySIP.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Total Investment</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Expected Returns</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.totalReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Max Affordable SIP</h3>
                  <p className="text-2xl font-bold text-orange-900">₹{results.maxAffordableSIP.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                Goal Progress
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Current Savings Future Value</span>
                  <span className="text-xl font-bold text-blue-900">₹{results.futureValueOfCurrentSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Additional Amount Needed</span>
                  <span className="text-xl font-bold text-green-900">₹{results.additionalAmountNeeded.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Goal Achievement</span>
                  <span className={`text-xl font-bold ${results.isAffordable ? 'text-green-900' : 'text-red-900'}`}>
                    {results.isAffordable ? 'Achievable' : 'Needs Adjustment'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-blue-600" />
            Yearly Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.yearlyBreakdown.map((year) => (
              <div key={year.year} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Year {year.year}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Corpus:</span>
                    <span className="font-medium">₹{year.corpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment:</span>
                    <span className="font-medium">₹{year.investment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Returns:</span>
                    <span className="font-medium text-green-600">₹{year.returns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-medium text-blue-600">{year.percentageComplete.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/sip-step-up-planner" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">SIP Step-up Planner</h3>
              <p className="text-sm text-gray-600">Plan systematic increases in SIP amount</p>
            </Link>
            <Link to="/finance-tools/asset-allocation-tool" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Asset Allocation Tool</h3>
              <p className="text-sm text-gray-600">Optimize your investment portfolio</p>
            </Link>
            <Link to="/finance-tools" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">All Finance Tools</h3>
              <p className="text-sm text-gray-600">Explore our complete collection</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MutualFundGoalPlanner;
