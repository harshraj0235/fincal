import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Target, RefreshCw, PieChart } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundPortfolioRebalancer: React.FC = () => {
  const [currentPortfolio, setCurrentPortfolio] = useState([
    { name: 'Large Cap', amount: 300000, target: 40 },
    { name: 'Mid Cap', amount: 200000, target: 30 },
    { name: 'Small Cap', amount: 150000, target: 20 },
    { name: 'Debt Funds', amount: 50000, target: 10 }
  ]);
  const [totalPortfolio, setTotalPortfolio] = useState(700000);

  const calculateRebalancing = () => {
    const currentTotal = currentPortfolio.reduce((sum, fund) => sum + fund.amount, 0);
    const totalToUse = totalPortfolio || currentTotal;
    
    const rebalancingPlan = currentPortfolio.map(fund => {
      const currentPercentage = (fund.amount / currentTotal) * 100;
      const targetAmount = (fund.target / 100) * totalToUse;
      const difference = targetAmount - fund.amount;
      const action = difference > 0 ? 'Buy' : difference < 0 ? 'Sell' : 'Hold';
      
      return {
        ...fund,
        currentPercentage,
        targetAmount,
        difference,
        action,
        newAmount: targetAmount
      };
    });
    
    const totalBuyAmount = rebalancingPlan
      .filter(fund => fund.action === 'Buy')
      .reduce((sum, fund) => sum + fund.difference, 0);
    
    const totalSellAmount = rebalancingPlan
      .filter(fund => fund.action === 'Sell')
      .reduce((sum, fund) => sum + Math.abs(fund.difference), 0);
    
    return {
      rebalancingPlan,
      totalBuyAmount,
      totalSellAmount,
      currentTotal,
      targetTotal: totalToUse
    };
  };

  const results = calculateRebalancing();

  const addFund = () => {
    setCurrentPortfolio([...currentPortfolio, { name: 'New Fund', amount: 0, target: 0 }]);
  };

  const removeFund = (index: number) => {
    if (currentPortfolio.length > 1) {
      setCurrentPortfolio(currentPortfolio.filter((_, i) => i !== index));
    }
  };

  const updateFund = (index: number, field: string, value: string | number) => {
    const updated = [...currentPortfolio];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentPortfolio(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund Portfolio Rebalancer - Optimize Your Asset Allocation"
        description="Rebalance your mutual fund portfolio to maintain optimal asset allocation. Calculate buy/sell recommendations and track portfolio performance."
        keywords="portfolio rebalancer, mutual fund rebalancing, asset allocation, portfolio optimization"
        url="/finance-tools/mutual-fund-portfolio-rebalancer"
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
            Mutual Fund Portfolio Rebalancer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Rebalance your mutual fund portfolio to maintain optimal asset allocation and maximize returns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
              Current Portfolio
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Total Portfolio Value (₹)</label>
                <input 
                  type="number" 
                  value={totalPortfolio} 
                  onChange={(e) => setTotalPortfolio(Number(e.target.value))} 
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              {currentPortfolio.map((fund, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">Fund {index + 1}</h3>
                    {currentPortfolio.length > 1 && (
                      <button 
                        onClick={() => removeFund(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Fund Name</label>
                      <input 
                        type="text" 
                        value={fund.name} 
                        onChange={(e) => updateFund(index, 'name', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Current Amount (₹)</label>
                      <input 
                        type="number" 
                        value={fund.amount} 
                        onChange={(e) => updateFund(index, 'amount', Number(e.target.value))} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Target %</label>
                      <input 
                        type="number" 
                        value={fund.target} 
                        onChange={(e) => updateFund(index, 'target', Number(e.target.value))} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={addFund}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Add Fund
              </button>
            </div>
          </motion.div>

          <motion.div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <RefreshCw className="h-6 w-6 mr-2 text-green-600" />
                Rebalancing Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Total Buy Amount</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.totalBuyAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Total Sell Amount</h3>
                  <p className="text-2xl font-bold text-red-900">₹{results.totalSellAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Current Total</h3>
                  <p className="text-2xl font-bold text-green-900">₹{results.currentTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Target Total</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.targetTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Rebalancing Actions
              </h2>
              <div className="space-y-3">
                {results.rebalancingPlan.map((fund, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">{fund.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        fund.action === 'Buy' ? 'bg-green-100 text-green-800' :
                        fund.action === 'Sell' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {fund.action}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Current:</span>
                        <span className="font-medium ml-1">{fund.currentPercentage.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Target:</span>
                        <span className="font-medium ml-1">{fund.target}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Amount:</span>
                        <span className={`font-medium ml-1 ${fund.difference > 0 ? 'text-green-600' : fund.difference < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {fund.difference > 0 ? '+' : ''}₹{fund.difference.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">New Value:</span>
                        <span className="font-medium ml-1">₹{fund.newAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <PieChart className="h-6 w-6 mr-2 text-green-600" />
            Portfolio Allocation Chart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.rebalancingPlan.map((fund, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700">{fund.target}%</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{fund.name}</h3>
                <p className="text-sm text-gray-600">₹{fund.newAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/asset-allocation-tool" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Asset Allocation Tool</h3>
              <p className="text-sm text-gray-600">Optimize your investment portfolio</p>
            </Link>
            <Link to="/finance-tools/portfolio-diversification-visualizer" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Portfolio Diversification</h3>
              <p className="text-sm text-gray-600">Visualize portfolio diversification</p>
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

export default MutualFundPortfolioRebalancer;
