import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Target, Calculator, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundTaxEfficiencyCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [fundReturn, setFundReturn] = useState(12);
  const [expenseRatio, setExpenseRatio] = useState(1.5);
  const [turnoverRatio, setTurnoverRatio] = useState(80);
  const [holdingPeriod, setHoldingPeriod] = useState(3);
  const [taxRate, setTaxRate] = useState(10);

  const calculateTaxEfficiency = () => {
    // Calculate gross returns
    const grossReturn = fundReturn / 100;
    const netReturn = grossReturn - (expenseRatio / 100);
    
    // Calculate turnover impact (higher turnover = more tax events)
    const turnoverImpact = (turnoverRatio / 100) * 0.5; // Simplified model
    const taxEfficiencyFactor = 1 - (turnoverImpact * (taxRate / 100));
    
    // Calculate final returns after taxes
    const finalReturn = netReturn * taxEfficiencyFactor;
    
    // Calculate corpus after taxes
    const grossCorpus = investmentAmount * Math.pow(1 + grossReturn, holdingPeriod);
    const netCorpus = investmentAmount * Math.pow(1 + netReturn, holdingPeriod);
    const finalCorpus = investmentAmount * Math.pow(1 + finalReturn, holdingPeriod);
    
    // Calculate tax impact
    const taxImpact = netCorpus - finalCorpus;
    const taxEfficiency = (finalCorpus / netCorpus) * 100;
    
    // Calculate expense impact
    const expenseImpact = grossCorpus - netCorpus;
    
    // Calculate total impact
    const totalImpact = grossCorpus - finalCorpus;
    
    // Yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= holdingPeriod; year++) {
      const yearGrossCorpus = investmentAmount * Math.pow(1 + grossReturn, year);
      const yearNetCorpus = investmentAmount * Math.pow(1 + netReturn, year);
      const yearFinalCorpus = investmentAmount * Math.pow(1 + finalReturn, year);
      
      yearlyBreakdown.push({
        year,
        grossCorpus: yearGrossCorpus,
        netCorpus: yearNetCorpus,
        finalCorpus: yearFinalCorpus,
        taxPaid: yearNetCorpus - yearFinalCorpus,
        expensePaid: yearGrossCorpus - yearNetCorpus
      });
    }
    
    return {
      grossReturn: grossReturn * 100,
      netReturn: netReturn * 100,
      finalReturn: finalReturn * 100,
      grossCorpus,
      netCorpus,
      finalCorpus,
      taxImpact,
      expenseImpact,
      totalImpact,
      taxEfficiency,
      yearlyBreakdown,
      taxEfficiencyFactor: taxEfficiencyFactor * 100
    };
  };

  const results = calculateTaxEfficiency();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund Tax Efficiency Calculator - Calculate Tax Impact on Returns"
        description="Calculate the tax efficiency of mutual funds and understand how taxes impact your investment returns. Compare different funds based on their tax efficiency."
        keywords="mutual fund tax efficiency, tax impact calculator, fund comparison, investment tax calculator"
        url="/finance-tools/mutual-fund-tax-efficiency-calculator"
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
            Mutual Fund Tax Efficiency Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate the tax efficiency of mutual funds and understand how taxes impact your investment returns.
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₹)</label>
                <input type="number" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="100000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fund Return (%)</label>
                <input type="number" value={fundReturn} onChange={(e) => setFundReturn(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expense Ratio (%)</label>
                <input type="number" value={expenseRatio} onChange={(e) => setExpenseRatio(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="1.5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Turnover Ratio (%)</label>
                <input type="number" value={turnoverRatio} onChange={(e) => setTurnoverRatio(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Holding Period (Years)</label>
                <input type="number" value={holdingPeriod} onChange={(e) => setHoldingPeriod(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="10" />
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
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Gross Return</h3>
                  <p className="text-2xl font-bold text-blue-900">{results.grossReturn.toFixed(2)}%</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Net Return (After Expenses)</h3>
                  <p className="text-2xl font-bold text-green-900">{results.netReturn.toFixed(2)}%</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Final Return (After Taxes)</h3>
                  <p className="text-2xl font-bold text-purple-900">{results.finalReturn.toFixed(2)}%</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Tax Efficiency Factor</h3>
                  <p className="text-2xl font-bold text-orange-900">{results.taxEfficiencyFactor.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                Corpus Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Gross Corpus</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.grossCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Net Corpus (After Expenses)</h3>
                  <p className="text-2xl font-bold text-green-900">₹{results.netCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Final Corpus (After Taxes)</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.finalCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Total Impact</h3>
                  <p className="text-2xl font-bold text-red-900">₹{results.totalImpact.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Impact Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-4">Tax Impact</h3>
              <p className="text-3xl font-bold text-red-900 mb-2">₹{results.taxImpact.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-red-700">Loss due to taxes on turnover</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-orange-900 mb-4">Expense Impact</h3>
              <p className="text-3xl font-bold text-orange-900 mb-2">₹{results.expenseImpact.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              <p className="text-sm text-orange-700">Loss due to fund expenses</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-900 mb-4">Tax Efficiency</h3>
              <p className="text-3xl font-bold text-green-900 mb-2">{results.taxEfficiency.toFixed(1)}%</p>
              <p className="text-sm text-green-700">Percentage of net returns retained after taxes</p>
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
                    <span className="text-gray-600">Gross Corpus:</span>
                    <span className="font-medium">₹{year.grossCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Corpus:</span>
                    <span className="font-medium">₹{year.netCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Final Corpus:</span>
                    <span className="font-medium text-green-600">₹{year.finalCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Paid:</span>
                    <span className="font-medium text-red-600">₹{year.taxPaid.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expense Paid:</span>
                    <span className="font-medium text-orange-600">₹{year.expensePaid.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/mutual-fund-expense-ratio-estimator" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Expense Ratio Estimator</h3>
              <p className="text-sm text-gray-600">Calculate impact of expense ratios</p>
            </Link>
            <Link to="/finance-tools/mutual-fund-portfolio-rebalancer" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Portfolio Rebalancer</h3>
              <p className="text-sm text-gray-600">Rebalance your mutual fund portfolio</p>
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

export default MutualFundTaxEfficiencyCalculator;
