import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Target, IndianRupee, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundExitLoadCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [currentValue, setCurrentValue] = useState(120000);
  const [exitLoadPercentage, setExitLoadPercentage] = useState(1);
  const [holdingPeriod, setHoldingPeriod] = useState(2);
  const [exitLoadPeriod, setExitLoadPeriod] = useState(1);
  const [redemptionAmount, setRedemptionAmount] = useState(50000);

  const calculateExitLoad = () => {
    // Calculate exit load based on holding period
    let applicableExitLoad = 0;
    if (holdingPeriod < exitLoadPeriod) {
      applicableExitLoad = exitLoadPercentage;
    }
    
    // Calculate exit load amount
    const exitLoadAmount = redemptionAmount * (applicableExitLoad / 100);
    const netRedemptionAmount = redemptionAmount - exitLoadAmount;
    
    // Calculate effective return after exit load
    const totalInvestment = investmentAmount;
    const totalCurrentValue = currentValue;
    const remainingValue = totalCurrentValue - redemptionAmount;
    const remainingValueAfterExitLoad = remainingValue - exitLoadAmount;
    
    // Calculate returns
    const grossReturn = ((totalCurrentValue - totalInvestment) / totalInvestment) * 100;
    const netReturnAfterExitLoad = ((remainingValueAfterExitLoad - (totalInvestment - redemptionAmount)) / (totalInvestment - redemptionAmount)) * 100;
    
    // Calculate break-even analysis
    const breakEvenValue = totalInvestment + exitLoadAmount;
    const breakEvenReturn = ((breakEvenValue - totalInvestment) / totalInvestment) * 100;
    
    // Calculate impact on different redemption amounts
    const redemptionScenarios = [25, 50, 75, 100].map(percentage => {
      const amount = (totalCurrentValue * percentage) / 100;
      const exitLoad = amount * (applicableExitLoad / 100);
      const netAmount = amount - exitLoad;
      
      return {
        percentage,
        amount,
        exitLoad,
        netAmount,
        effectiveReturn: ((netAmount - (totalInvestment * percentage / 100)) / (totalInvestment * percentage / 100)) * 100
      };
    });
    
    // Calculate time-based exit load reduction
    const timeBasedReduction = [];
    for (let year = 0; year <= exitLoadPeriod; year++) {
      const exitLoadForYear = year < exitLoadPeriod ? exitLoadPercentage * (1 - year / exitLoadPeriod) : 0;
      const exitLoadAmountForYear = redemptionAmount * (exitLoadForYear / 100);
      const netAmountForYear = redemptionAmount - exitLoadAmountForYear;
      
      timeBasedReduction.push({
        year,
        exitLoadPercentage: exitLoadForYear,
        exitLoadAmount: exitLoadAmountForYear,
        netAmount: netAmountForYear
      });
    }
    
    return {
      applicableExitLoad,
      exitLoadAmount,
      netRedemptionAmount,
      remainingValue,
      remainingValueAfterExitLoad,
      grossReturn,
      netReturnAfterExitLoad,
      breakEvenValue,
      breakEvenReturn,
      redemptionScenarios,
      timeBasedReduction
    };
  };

  const results = calculateExitLoad();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund Exit Load Calculator - Calculate Redemption Charges"
        description="Calculate exit load charges when redeeming mutual fund units. Understand the impact of exit loads on your returns and plan your redemptions effectively."
        keywords="mutual fund exit load Calculator, redemption charges, fund withdrawal Calculator, exit load impact"
        url="/finance-tools/mutual-fund-exit-load-calculator"
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
            Mutual Fund Exit Load Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate exit load charges when redeeming mutual fund units and understand their impact on returns.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Value (₹)</label>
                <input type="number" value={currentValue} onChange={(e) => setCurrentValue(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="120000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exit Load (%)</label>
                <input type="number" value={exitLoadPercentage} onChange={(e) => setExitLoadPercentage(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exit Load Period (Years)</label>
                <input type="number" value={exitLoadPeriod} onChange={(e) => setExitLoadPeriod(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Holding Period (Years)</label>
                <input type="number" value={holdingPeriod} onChange={(e) => setHoldingPeriod(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Redemption Amount (₹)</label>
                <input type="number" value={redemptionAmount} onChange={(e) => setRedemptionAmount(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="50000" />
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Exit Load Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Applicable Exit Load</h3>
                  <p className="text-2xl font-bold text-blue-900">{results.applicableExitLoad.toFixed(2)}%</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Exit Load Amount</h3>
                  <p className="text-2xl font-bold text-red-900">₹{results.exitLoadAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Net Redemption</h3>
                  <p className="text-2xl font-bold text-green-900">₹{results.netRedemptionAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Remaining Value</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.remainingValueAfterExitLoad.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                Return Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Gross Return</h3>
                  <p className="text-2xl font-bold text-blue-900">{results.grossReturn.toFixed(2)}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Net Return (After Exit Load)</h3>
                  <p className="text-2xl font-bold text-green-900">{results.netReturnAfterExitLoad.toFixed(2)}%</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Break-even Value</h3>
                  <p className="text-2xl font-bold text-orange-900">₹{results.breakEvenValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Break-even Return</h3>
                  <p className="text-2xl font-bold text-purple-900">{results.breakEvenReturn.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Redemption Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.redemptionScenarios.map((scenario) => (
              <div key={scenario.percentage} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{scenario.percentage}% Redemption</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">₹{scenario.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exit Load:</span>
                    <span className="font-medium text-red-600">₹{scenario.exitLoad.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Amount:</span>
                    <span className="font-medium text-green-600">₹{scenario.netAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Return:</span>
                    <span className={`font-medium ${scenario.effectiveReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {scenario.effectiveReturn.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
            Time-based Exit Load Reduction
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.timeBasedReduction.map((year) => (
              <div key={year.year} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Year {year.year}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exit Load %:</span>
                    <span className="font-medium">{year.exitLoadPercentage.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exit Load Amount:</span>
                    <span className="font-medium text-red-600">₹{year.exitLoadAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Amount:</span>
                    <span className="font-medium text-green-600">₹{year.netAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/mutual-fund-expense-ratio-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Expense Ratio Calculator</h3>
              <p className="text-sm text-gray-600">Calculate expense ratio impact</p>
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

export default MutualFundExitLoadCalculator;
