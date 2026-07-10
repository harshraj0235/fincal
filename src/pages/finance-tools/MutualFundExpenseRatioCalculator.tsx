import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Target, IndianRupee, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundExpenseRatioCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [expenseRatio, setExpenseRatio] = useState(1.5);
  const [fundReturn, setFundReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [comparisonExpenseRatio, setComparisonExpenseRatio] = useState(0.5);

  const calculateExpenseImpact = () => {
    // Calculate returns with current expense ratio
    const netReturn = fundReturn - expenseRatio;
    const finalAmount = investmentAmount * Math.pow(1 + netReturn / 100, investmentPeriod);
    const totalExpense = finalAmount - (investmentAmount * Math.pow(1 + fundReturn / 100, investmentPeriod));
    
    // Calculate returns with comparison expense ratio
    const comparisonNetReturn = fundReturn - comparisonExpenseRatio;
    const comparisonFinalAmount = investmentAmount * Math.pow(1 + comparisonNetReturn / 100, investmentPeriod);
    const comparisonTotalExpense = comparisonFinalAmount - (investmentAmount * Math.pow(1 + fundReturn / 100, investmentPeriod));
    
    // Calculate difference
    const expenseDifference = totalExpense - comparisonTotalExpense;
    const amountDifference = comparisonFinalAmount - finalAmount;
    
    // Yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const grossAmount = investmentAmount * Math.pow(1 + fundReturn / 100, year);
      const netAmount = investmentAmount * Math.pow(1 + netReturn / 100, year);
      const comparisonNetAmount = investmentAmount * Math.pow(1 + comparisonNetReturn / 100, year);
      
      yearlyBreakdown.push({
        year,
        grossAmount,
        netAmount,
        comparisonNetAmount,
        expensePaid: grossAmount - netAmount,
        comparisonExpensePaid: grossAmount - comparisonNetAmount,
        expenseDifference: (grossAmount - netAmount) - (grossAmount - comparisonNetAmount)
      });
    }
    
    // Calculate cumulative impact
    const cumulativeExpense = yearlyBreakdown.reduce((sum, year) => sum + year.expensePaid, 0);
    const cumulativeComparisonExpense = yearlyBreakdown.reduce((sum, year) => sum + year.comparisonExpensePaid, 0);
    const cumulativeDifference = cumulativeExpense - cumulativeComparisonExpense;
    
    return {
      netReturn,
      finalAmount,
      totalExpense,
      comparisonNetReturn,
      comparisonFinalAmount,
      comparisonTotalExpense,
      expenseDifference,
      amountDifference,
      yearlyBreakdown,
      cumulativeExpense,
      cumulativeComparisonExpense,
      cumulativeDifference
    };
  };

  const results = calculateExpenseImpact();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund Expense Ratio Calculator - Calculate Expense Impact on Returns"
        description="Calculate the impact of expense ratios on mutual fund returns. Compare different expense ratios and understand how they affect your long-term investment growth."
        keywords="mutual fund expense ratio Calculator, fund expense impact, expense ratio comparison, investment cost calculator"
        url="/finance-tools/mutual-fund-expense-ratio-calculator"
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
            Mutual Fund Expense Ratio Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate the impact of expense ratios on mutual fund returns and compare different fund costs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <IndianRupee className="h-6 w-6 mr-2 text-blue-600" />
              Fund Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₹)</label>
                <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="100000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fund Return (Gross) (%)</label>
                <input type="number" value={fundReturn} onChange={(e) => setFundReturn(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Expense Ratio (%)</label>
                <input type="number" value={expenseRatio} onChange={(e) => setExpenseRatio(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="1.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comparison Expense Ratio (%)</label>
                <input type="number" value={comparisonExpenseRatio} onChange={(e) => setComparisonExpenseRatio(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                <input type="number" value={investmentPeriod} onChange={(e) => setInvestmentPeriod(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="10" />
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Return Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Net Return (Current)</h3>
                  <p className="text-2xl font-bold text-blue-900">{results.netReturn.toFixed(2)}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Net Return (Comparison)</h3>
                  <p className="text-2xl font-bold text-green-900">{results.comparisonNetReturn.toFixed(2)}%</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Final Amount (Current)</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.finalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Final Amount (Comparison)</h3>
                  <p className="text-2xl font-bold text-orange-900">₹{results.comparisonFinalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                Expense Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Total Expense (Current)</h3>
                  <p className="text-2xl font-bold text-red-900">₹{results.totalExpense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Total Expense (Comparison)</h3>
                  <p className="text-2xl font-bold text-green-900">₹{results.comparisonTotalExpense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Expense Difference</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.expenseDifference.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Amount Difference</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.amountDifference.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Expense Impact Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-4">Current Fund</h3>
              <p className="text-3xl font-bold text-red-900 mb-2">₹{results.cumulativeExpense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-red-700">Total expenses paid over {investmentPeriod} years</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">Comparison Fund</h3>
              <p className="text-3xl font-bold text-green-900 mb-2">₹{results.cumulativeComparisonExpense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-green-700">Total expenses paid over {investmentPeriod} years</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Savings Potential</h3>
              <p className="text-3xl font-bold text-blue-900 mb-2">₹{results.cumulativeDifference.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-blue-700">Additional amount you could save</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
            Yearly Expense Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.yearlyBreakdown.map((year) => (
              <div key={year.year} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Year {year.year}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Amount:</span>
                    <span className="font-medium">₹{year.grossAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Amount (Current):</span>
                    <span className="font-medium">₹{year.netAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Amount (Comparison):</span>
                    <span className="font-medium text-green-600">₹{year.comparisonNetAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expense Paid (Current):</span>
                    <span className="font-medium text-red-600">₹{year.expensePaid.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expense Paid (Comparison):</span>
                    <span className="font-medium text-green-600">₹{year.comparisonExpensePaid.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Savings:</span>
                    <span className="font-medium text-blue-600">₹{year.expenseDifference.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/mutual-fund-tax-efficiency-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Tax Efficiency Calculator</h3>
              <p className="text-sm text-gray-600">Calculate tax impact on fund returns</p>
            </Link>
            <Link to="/finance-tools/mutual-fund-performance-tracker" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Performance Tracker</h3>
              <p className="text-sm text-gray-600">Track your fund performance</p>
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

export default MutualFundExpenseRatioCalculator;
