import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, ArrowRight, Target, Calendar, DollarSign } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';

const MutualFundPerformanceTracker: React.FC = () => {
  const [funds, setFunds] = useState([
    { name: 'Fund A', nav: 25.50, units: 1000, purchaseDate: '2023-01-01', category: 'Equity' },
    { name: 'Fund B', nav: 18.75, units: 1500, purchaseDate: '2023-03-15', category: 'Debt' },
    { name: 'Fund C', nav: 32.20, units: 800, purchaseDate: '2022-11-10', category: 'Hybrid' }
  ]);
  const [currentDate, setCurrentDate] = useState('2024-01-15');

  const calculatePerformance = () => {
    const performanceData = funds.map(fund => {
      // Simulate NAV growth based on category
      const categoryReturns = {
        'Equity': 12,
        'Debt': 7,
        'Hybrid': 9,
        'Liquid': 5
      };
      
      const daysHeld = Math.floor((new Date(currentDate).getTime() - new Date(fund.purchaseDate).getTime()) / (1000 * 60 * 60 * 24));
      const yearsHeld = daysHeld / 365;
      const expectedReturn = categoryReturns[fund.category as keyof typeof categoryReturns] || 8;
      
      const currentNAV = fund.nav * Math.pow(1 + expectedReturn / 100, yearsHeld);
      const currentValue = currentNAV * fund.units;
      const investedAmount = fund.nav * fund.units;
      const absoluteReturn = currentValue - investedAmount;
      const percentageReturn = (absoluteReturn / investedAmount) * 100;
      const annualizedReturn = (Math.pow(1 + percentageReturn / 100, 1 / yearsHeld) - 1) * 100;
      
      return {
        ...fund,
        currentNAV,
        currentValue,
        investedAmount,
        absoluteReturn,
        percentageReturn,
        annualizedReturn,
        daysHeld,
        yearsHeld
      };
    });
    
    // Calculate portfolio totals
    const totalInvested = performanceData.reduce((sum, fund) => sum + fund.investedAmount, 0);
    const totalCurrentValue = performanceData.reduce((sum, fund) => sum + fund.currentValue, 0);
    const totalAbsoluteReturn = performanceData.reduce((sum, fund) => sum + fund.absoluteReturn, 0);
    const totalPercentageReturn = (totalAbsoluteReturn / totalInvested) * 100;
    
    // Calculate category-wise performance
    const categoryPerformance = {};
    performanceData.forEach(fund => {
      if (!categoryPerformance[fund.category]) {
        categoryPerformance[fund.category] = {
          invested: 0,
          currentValue: 0,
          absoluteReturn: 0,
          funds: 0
        };
      }
      categoryPerformance[fund.category].invested += fund.investedAmount;
      categoryPerformance[fund.category].currentValue += fund.currentValue;
      categoryPerformance[fund.category].absoluteReturn += fund.absoluteReturn;
      categoryPerformance[fund.category].funds += 1;
    });
    
    // Calculate monthly performance
    const monthlyPerformance = [];
    const months = Math.ceil(Math.max(...performanceData.map(f => f.daysHeld)) / 30);
    
    for (let month = 1; month <= months; month++) {
      const monthDate = new Date(currentDate);
      monthDate.setMonth(monthDate.getMonth() - (months - month));
      
      const monthValue = performanceData.reduce((sum, fund) => {
        const monthDaysHeld = Math.max(0, (monthDate.getTime() - new Date(fund.purchaseDate).getTime()) / (1000 * 60 * 60 * 24));
        const monthYearsHeld = monthDaysHeld / 365;
        const monthNAV = fund.nav * Math.pow(1 + (fund.percentageReturn / 100), monthYearsHeld);
        return sum + (monthNAV * fund.units);
      }, 0);
      
      monthlyPerformance.push({
        month,
        date: monthDate.toLocaleDateString(),
        value: monthValue
      });
    }
    
    return {
      performanceData,
      totalInvested,
      totalCurrentValue,
      totalAbsoluteReturn,
      totalPercentageReturn,
      categoryPerformance,
      monthlyPerformance
    };
  };

  const results = calculatePerformance();

  const addFund = () => {
    setFunds([...funds, { name: 'New Fund', nav: 20, units: 1000, purchaseDate: '2023-01-01', category: 'Equity' }]);
  };

  const removeFund = (index: number) => {
    if (funds.length > 1) {
      setFunds(funds.filter((_, i) => i !== index));
    }
  };

  const updateFund = (index: number, field: string, value: string | number) => {
    const updated = [...funds];
    updated[index] = { ...updated[index], [field]: value };
    setFunds(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SEOHelmet
        title="Mutual Fund Performance Tracker - Track Your Investment Performance"
        description="Track and analyze your mutual fund performance over time. Monitor returns, compare funds, and visualize your investment growth."
        keywords="mutual fund performance tracker, investment tracking, fund comparison, performance analysis"
        url="/finance-tools/mutual-fund-performance-tracker"
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
            Mutual Fund Performance Tracker
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track and analyze your mutual fund performance over time with detailed insights and comparisons.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
              Fund Portfolio
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Current Date</label>
                <input 
                  type="date" 
                  value={currentDate} 
                  onChange={(e) => setCurrentDate(e.target.value)} 
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              {funds.map((fund, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-900">Fund {index + 1}</h3>
                    {funds.length > 1 && (
                      <button 
                        onClick={() => removeFund(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                      <label className="block text-xs text-gray-600 mb-1">Category</label>
                      <select 
                        value={fund.category} 
                        onChange={(e) => updateFund(index, 'category', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                      >
                        <option value="Equity">Equity</option>
                        <option value="Debt">Debt</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Liquid">Liquid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Purchase NAV</label>
                      <input 
                        type="number" 
                        value={fund.nav} 
                        onChange={(e) => updateFund(index, 'nav', Number(e.target.value))} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Units</label>
                      <input 
                        type="number" 
                        value={fund.units} 
                        onChange={(e) => updateFund(index, 'units', Number(e.target.value))} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Purchase Date</label>
                      <input 
                        type="date" 
                        value={fund.purchaseDate} 
                        onChange={(e) => updateFund(index, 'purchaseDate', e.target.value)} 
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
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Portfolio Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Total Invested</h3>
                  <p className="text-2xl font-bold text-blue-900">₹{results.totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Current Value</h3>
                  <p className="text-2xl font-bold text-green-900">₹{results.totalCurrentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Absolute Return</h3>
                  <p className="text-2xl font-bold text-purple-900">₹{results.totalAbsoluteReturn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Percentage Return</h3>
                  <p className="text-2xl font-bold text-orange-900">{results.totalPercentageReturn.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-2 text-blue-600" />
                Individual Fund Performance
              </h2>
              <div className="space-y-3">
                {results.performanceData.map((fund, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-900">{fund.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        fund.percentageReturn > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {fund.percentageReturn > 0 ? '+' : ''}{fund.percentageReturn.toFixed(2)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Current NAV:</span>
                        <span className="font-medium ml-1">₹{fund.currentNAV.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Current Value:</span>
                        <span className="font-medium ml-1">₹{fund.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Return:</span>
                        <span className={`font-medium ml-1 ${fund.absoluteReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{fund.absoluteReturn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Annualized:</span>
                        <span className="font-medium ml-1">{fund.annualizedReturn.toFixed(2)}%</span>
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
            <Target className="h-6 w-6 mr-2 text-blue-600" />
            Category-wise Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(results.categoryPerformance).map(([category, data]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invested:</span>
                    <span className="font-medium">₹{data.invested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current:</span>
                    <span className="font-medium">₹{data.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Return:</span>
                    <span className={`font-medium ${data.absoluteReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{data.absoluteReturn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Funds:</span>
                    <span className="font-medium">{data.funds}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-green-600" />
            Monthly Performance Trend
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.monthlyPerformance.map((month) => (
              <div key={month.month} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{month.date}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Portfolio Value:</span>
                    <span className="font-medium">₹{month.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/finance-tools/mutual-fund-portfolio-rebalancer" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Portfolio Rebalancer</h3>
              <p className="text-sm text-gray-600">Rebalance your mutual fund portfolio</p>
            </Link>
            <Link to="/finance-tools/mutual-fund-risk-analyzer" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
              <h3 className="font-semibold text-gray-900">Risk Analyzer</h3>
              <p className="text-sm text-gray-600">Analyze fund risk profiles</p>
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

export default MutualFundPerformanceTracker;
