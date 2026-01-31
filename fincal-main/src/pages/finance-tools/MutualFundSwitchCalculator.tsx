import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Target, Calculator, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundSwitchCalculator: React.FC = () => {
  const [currentFundValue, setCurrentFundValue] = useState(100000);
  const [currentFundReturn, setCurrentFundReturn] = useState(10);
  const [newFundReturn, setNewFundReturn] = useState(12);
  const [switchCharges, setSwitchCharges] = useState(1);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [switchAmount, setSwitchAmount] = useState(50000);

  const calculateSwitchAnalysis = () => {
    // Calculate current fund future value
    const currentFundFutureValue = currentFundValue * Math.pow(1 + currentFundReturn / 100, investmentPeriod);
    
    // Calculate switch charges
    const switchChargeAmount = switchAmount * (switchCharges / 100);
    const netSwitchAmount = switchAmount - switchChargeAmount;
    
    // Calculate new fund future value
    const newFundFutureValue = netSwitchAmount * Math.pow(1 + newFundReturn / 100, investmentPeriod);
    
    // Calculate remaining amount in current fund
    const remainingInCurrentFund = currentFundValue - switchAmount;
    const remainingCurrentFundFutureValue = remainingInCurrentFund * Math.pow(1 + currentFundReturn / 100, investmentPeriod);
    
    // Calculate total future value after switch
    const totalFutureValueAfterSwitch = newFundFutureValue + remainingCurrentFundFutureValue;
    
    // Calculate difference
    const switchBenefit = totalFutureValueAfterSwitch - currentFundFutureValue;
    const switchBenefitPercentage = (switchBenefit / currentFundFutureValue) * 100;
    
    // Calculate break-even analysis
    const breakEvenReturn = currentFundReturn + (switchCharges * 100 / investmentPeriod);
    const isSwitchBeneficial = newFundReturn > breakEvenReturn;
    
    // Calculate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const currentFundValueYear = currentFundValue * Math.pow(1 + currentFundReturn / 100, year);
      const newFundValueYear = netSwitchAmount * Math.pow(1 + newFundReturn / 100, year);
      const remainingCurrentValueYear = remainingInCurrentFund * Math.pow(1 + currentFundReturn / 100, year);
      const totalAfterSwitchYear = newFundValueYear + remainingCurrentValueYear;
      
      yearlyBreakdown.push({
        year,
        currentFundValue: currentFundValueYear,
        newFundValue: newFundValueYear,
        remainingCurrentValue: remainingCurrentValueYear,
        totalAfterSwitch: totalAfterSwitchYear,
        difference: totalAfterSwitchYear - currentFundValueYear
      });
    }
    
    // Calculate risk-adjusted analysis
    const riskAdjustment = 0.5; // Simplified risk factor
    const riskAdjustedNewFundReturn = newFundReturn - riskAdjustment;
    const riskAdjustedNewFundFutureValue = netSwitchAmount * Math.pow(1 + riskAdjustedNewFundReturn / 100, investmentPeriod);
    const riskAdjustedTotalFutureValue = riskAdjustedNewFundFutureValue + remainingCurrentFundFutureValue;
    const riskAdjustedBenefit = riskAdjustedTotalFutureValue - currentFundFutureValue;
    
    return {
      currentFundFutureValue,
      switchChargeAmount,
      netSwitchAmount,
      newFundFutureValue,
      remainingInCurrentFund,
      remainingCurrentFundFutureValue,
      totalFutureValueAfterSwitch,
      switchBenefit,
      switchBenefitPercentage,
      breakEvenReturn,
      isSwitchBeneficial,
      yearlyBreakdown,
      riskAdjustedNewFundReturn,
      riskAdjustedTotalFutureValue,
      riskAdjustedBenefit
    };
  };

  const results = calculateSwitchAnalysis();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund Switch Calculator - Calculate Switch Costs and Benefits"
        description="Calculate the costs and benefits of switching between mutual funds. Understand switch charges, break-even analysis, and long-term impact on your investments."
        keywords="mutual fund switch calculator, fund switching costs, switch benefit analysis, fund transfer calculator"
        url="/finance-tools/mutual-fund-switch-calculator"
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
            Mutual Fund Switch Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate the costs and benefits of switching between mutual funds and understand the long-term impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" />
              Fund Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Fund Value (₹)</label>
                <input type="number" value={currentFundValue} onChange={(e) => setCurrentFundValue(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="100000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Fund Return (%)</label>
                <input type="number" value={currentFundReturn} onChange={(e) => setCurrentFundReturn(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Fund Return (%)</label>
                <input type="number" value={newFundReturn} onChange={(e) => setNewFundReturn(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Switch Charges (%)</label>
                <input type="number" value={switchCharges} onChange={(e) => setSwitchCharges(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                <input type="number" value={investmentPeriod} onChange={(e) => setInvestmentPeriod(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Switch Amount (₹)</label>
                <input type="number" value={switchAmount} onChange={(e) => setSwitchAmount(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="50000" />
              </div>
            </div>
          </motion.div>

          <motion.div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Switch Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Current Fund Future Value</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.currentFundFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Total After Switch</h3>
                  <p className="text-2xl font-bold text-green-900">₹{results.totalFutureValueAfterSwitch.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Switch Benefit</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.switchBenefit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Benefit %</h3>
                  <p className="text-2xl font-bold text-orange-900">{results.switchBenefitPercentage.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                Switch Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Switch Charges</h3>
                  <p className="text-2xl font-bold text-red-900">₹{results.switchChargeAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Net Switch Amount</h3>
                  <p className="text-2xl font-bold text-green-900">₹{results.netSwitchAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">New Fund Future Value</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.newFundFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Remaining Current Fund</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.remainingCurrentFundFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Break-even Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-lg p-6 ${results.isSwitchBeneficial ? 'bg-green-50' : 'bg-red-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${results.isSwitchBeneficial ? 'text-green-900' : 'text-red-900'}`}>Switch Recommendation</h3>
              <p className={`text-3xl font-bold mb-2 ${results.isSwitchBeneficial ? 'text-green-900' : 'text-red-900'}`}>
                {results.isSwitchBeneficial ? 'Switch Recommended' : 'Stay with Current Fund'}
              </p>
              <p className={`text-sm ${results.isSwitchBeneficial ? 'text-green-700' : 'text-red-700'}`}>
                {results.isSwitchBeneficial 
                  ? 'New fund return exceeds break-even return' 
                  : 'Current fund return is better than break-even'}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Break-even Return</h3>
              <p className="text-3xl font-bold text-blue-900 mb-2">{results.breakEvenReturn.toFixed(2)}%</p>
              <p className="text-sm text-blue-700">Minimum return needed from new fund to justify switch</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
            Yearly Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.yearlyBreakdown.map((year) => (
              <div key={year.year} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Year {year.year}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Fund:</span>
                    <span className="font-medium">₹{year.currentFundValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">New Fund:</span>
                    <span className="font-medium text-green-600">₹{year.newFundValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining Current:</span>
                    <span className="font-medium text-blue-600">₹{year.remainingCurrentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total After Switch:</span>
                    <span className="font-medium text-purple-600">₹{year.totalAfterSwitch.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difference:</span>
                    <span className={`font-medium ${year.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{year.difference.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Risk-Adjusted Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-orange-900 mb-4">Risk-Adjusted Return</h3>
              <p className="text-3xl font-bold text-orange-900 mb-2">{results.riskAdjustedNewFundReturn.toFixed(2)}%</p>
              <p className="text-sm text-orange-700">New fund return adjusted for risk</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-900 mb-4">Risk-Adjusted Future Value</h3>
              <p className="text-3xl font-bold text-purple-900 mb-2">₹{results.riskAdjustedTotalFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-purple-700">Total value after switch (risk-adjusted)</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Risk-Adjusted Benefit</h3>
              <p className="text-3xl font-bold text-blue-900 mb-2">₹{results.riskAdjustedBenefit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-blue-700">Benefit after considering risk</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/mutual-fund-exit-load-calculator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Exit Load Calculator</h3>
              <p className="text-sm text-gray-600">Calculate exit load charges</p>
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

export default MutualFundSwitchCalculator;
