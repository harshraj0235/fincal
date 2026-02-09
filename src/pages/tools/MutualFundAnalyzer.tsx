import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { TrendingUp, BarChart3, PieChart, Target, AlertCircle, Calculator, Star } from 'lucide-react';

const MutualFundAnalyzer: React.FC = () => {
  const [fundData, setFundData] = useState({
    fundName: 'Sample Mutual Fund',
    currentNav: 25.50,
    initialNav: 20.00,
    investmentAmount: 100000,
    investmentDate: '2020-01-01',
    currentDate: '2024-01-01',
    expenseRatio: 1.5,
    exitLoad: 1.0
  });

  const [performance, setPerformance] = useState({
    currentValue: 0,
    totalGains: 0,
    totalGainsPercentage: 0,
    annualizedReturns: 0,
    absoluteReturns: 0,
    expenseAmount: 0,
    exitLoadAmount: 0,
    netGains: 0
  });

  const calculatePerformance = () => {
    const { currentNav, initialNav, investmentAmount, expenseRatio, exitLoad } = fundData;
    
    // Calculate current value
    const currentValue = (investmentAmount / initialNav) * currentNav;
    
    // Calculate total gains
    const totalGains = currentValue - investmentAmount;
    const totalGainsPercentage = (totalGains / investmentAmount) * 100;
    
    // Calculate annualized returns
    const investmentDate = new Date(fundData.investmentDate);
    const currentDate = new Date(fundData.currentDate);
    const years = (currentDate.getTime() - investmentDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    const annualizedReturns = (Math.pow(currentValue / investmentAmount, 1 / years) - 1) * 100;
    
    // Calculate absolute returns
    const absoluteReturns = ((currentNav - initialNav) / initialNav) * 100;
    
    // Calculate expenses
    const expenseAmount = (investmentAmount * expenseRatio / 100) * years;
    const exitLoadAmount = currentValue * exitLoad / 100;
    
    // Calculate net gains
    const netGains = totalGains - expenseAmount - exitLoadAmount;
    
    setPerformance({
      currentValue,
      totalGains,
      totalGainsPercentage,
      annualizedReturns: annualizedReturns || 0,
      absoluteReturns,
      expenseAmount,
      exitLoadAmount,
      netGains
    });
  };

  React.useEffect(() => {
    calculatePerformance();
  }, [fundData]);

  const handleInputChange = (field: string, value: string | number) => {
    setFundData({ ...fundData, [field]: value });
  };

  const getPerformanceRating = () => {
    if (performance.annualizedReturns >= 15) return { rating: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', stars: 5 };
    if (performance.annualizedReturns >= 12) return { rating: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-50', stars: 4 };
    if (performance.annualizedReturns >= 10) return { rating: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-50', stars: 3 };
    if (performance.annualizedReturns >= 8) return { rating: 'Average', color: 'text-orange-600', bg: 'bg-orange-50', stars: 2 };
    return { rating: 'Below Average', color: 'text-red-600', bg: 'bg-red-50', stars: 1 };
  };

  const performanceRating = getPerformanceRating();

  const getRiskLevel = () => {
    const { expenseRatio, exitLoad } = fundData;
    const totalCosts = expenseRatio + exitLoad;
    
    if (totalCosts <= 1.5) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (totalCosts <= 2.5) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const riskLevel = getRiskLevel();

  const getRecommendation = () => {
    if (performance.annualizedReturns >= 12 && fundData.expenseRatio <= 1.5) {
      return {
        action: 'HOLD/BUY MORE',
        color: 'text-green-600',
        bg: 'bg-green-50',
        reason: 'Excellent performance with low costs. Consider increasing allocation.'
      };
    } else if (performance.annualizedReturns >= 10) {
      return {
        action: 'HOLD',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        reason: 'Good performance. Monitor closely and consider alternatives if costs are high.'
      };
    } else {
      return {
        action: 'REVIEW/EXIT',
        color: 'text-red-600',
        bg: 'bg-red-50',
        reason: 'Below average performance. Consider switching to better performing funds.'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <SEOHelmet
        title="Mutual Fund Performance Analyzer - Analyze MF Returns and Performance | MoneyCal India"
        description="Analyze mutual fund performance, calculate returns, expenses, and get investment recommendations. Comprehensive mutual fund analysis tool for better investment decisions."
        keywords="mutual fund analyzer, mutual fund performance, mutual fund returns, mutual fund calculator, fund analysis, mutual fund expenses, mutual fund comparison"
        canonicalUrl="https://moneycal.in/tools/mutual-fund-analyzer"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mutual Fund Performance Analyzer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze your mutual fund performance, calculate returns, expenses, and get data-driven recommendations for better investment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Fund Details Input */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                  Fund Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fund Name
                    </label>
                    <input
                      type="text"
                      value={fundData.fundName}
                      onChange={(e) => handleInputChange('fundName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter fund name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current NAV (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={fundData.currentNav}
                      onChange={(e) => handleInputChange('currentNav', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter current NAV"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial NAV (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={fundData.initialNav}
                      onChange={(e) => handleInputChange('initialNav', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter initial NAV"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={fundData.investmentAmount}
                      onChange={(e) => handleInputChange('investmentAmount', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter investment amount"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Date
                    </label>
                    <input
                      type="date"
                      value={fundData.investmentDate}
                      onChange={(e) => handleInputChange('investmentDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Date
                    </label>
                    <input
                      type="date"
                      value={fundData.currentDate}
                      onChange={(e) => handleInputChange('currentDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expense Ratio (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={fundData.expenseRatio}
                      onChange={(e) => handleInputChange('expenseRatio', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter expense ratio"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exit Load (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={fundData.exitLoad}
                      onChange={(e) => handleInputChange('exitLoad', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter exit load"
                    />
                  </div>
                </div>
              </div>

              {/* Performance Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                  Performance Analysis
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-700 font-medium">Current Value</span>
                        <span className="font-bold text-green-600">
                          ₹{performance.currentValue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-700 font-medium">Total Gains</span>
                        <span className={`font-bold ${performance.totalGains >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{performance.totalGains.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-blue-600">
                        {performance.totalGainsPercentage.toFixed(2)}%
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-700 font-medium">Annualized Returns</span>
                        <span className={`font-bold ${performance.annualizedReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {performance.annualizedReturns.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-orange-700 font-medium">Absolute Returns</span>
                        <span className={`font-bold ${performance.absoluteReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {performance.absoluteReturns.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-red-700 font-medium">Total Expenses</span>
                        <span className="font-bold text-red-600">
                          ₹{performance.expenseAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-yellow-700 font-medium">Exit Load</span>
                        <span className="font-bold text-yellow-600">
                          ₹{performance.exitLoadAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="space-y-6">
              {/* Performance Rating */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-600" />
                  Performance Rating
                </h2>
                
                <div className={`p-4 rounded-lg ${performanceRating.bg}`}>
                  <div className="text-center mb-4">
                    <div className={`text-2xl font-bold ${performanceRating.color} mb-2`}>
                      {performanceRating.rating}
                    </div>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < performanceRating.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Recommendation */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-600" />
                  Investment Recommendation
                </h2>
                
                <div className={`p-4 rounded-lg ${recommendation.bg}`}>
                  <div className="text-center mb-4">
                    <div className={`text-2xl font-bold ${recommendation.color} mb-2`}>
                      {recommendation.action}
                    </div>
                    <p className="text-sm text-gray-600">{recommendation.reason}</p>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
                  Cost Analysis
                </h2>
                
                <div className={`p-4 rounded-lg ${riskLevel.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Cost Level</span>
                    <span className={`font-semibold ${riskLevel.color}`}>{riskLevel.level}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {riskLevel.level === 'Low' && 'Low costs with good value for money.'}
                    {riskLevel.level === 'Medium' && 'Moderate costs. Consider alternatives.'}
                    {riskLevel.level === 'High' && 'High costs. Look for lower-cost alternatives.'}
                  </p>
                </div>
              </div>

              {/* Net Analysis */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-blue-600" />
                  Net Analysis
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Initial Investment</span>
                    <span className="font-semibold text-gray-900">
                      ₹{fundData.investmentAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">Current Value</span>
                    <span className="font-semibold text-green-600">
                      ₹{performance.currentValue.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-red-700">Total Costs</span>
                    <span className="font-semibold text-red-600">
                      ₹{(performance.expenseAmount + performance.exitLoadAmount).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">Net Gains</span>
                    <span className={`font-semibold ${performance.netGains >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{performance.netGains.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fund Selection Tips */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Fund Selection Tips
                </h2>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Expense Ratio:</strong> Look for funds with expense ratio below 1.5%.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Performance:</strong> Check 3-5 year returns and consistency.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Exit Load:</strong> Prefer funds with no or low exit loads.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Fund Manager:</strong> Research the fund manager's track record.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mutual Fund Analysis Guide</h2>
            
            <div className="prose max-w-none">
              <h3>Understanding Mutual Fund Performance</h3>
              <p>
                Mutual fund performance analysis involves evaluating various metrics to determine how well a fund 
                has performed and whether it meets your investment objectives. Key factors include returns, 
                expenses, risk, and consistency of performance.
              </p>
              
              <h3>Key Performance Metrics</h3>
              <ul>
                <li><strong>Annualized Returns:</strong> Average annual return over the investment period</li>
                <li><strong>Absolute Returns:</strong> Total return from NAV appreciation</li>
                <li><strong>Expense Ratio:</strong> Annual fee charged by the fund</li>
                <li><strong>Exit Load:</strong> Fee charged when redeeming units</li>
                <li><strong>Sharpe Ratio:</strong> Risk-adjusted return measure</li>
              </ul>
              
              <h3>Types of Mutual Funds</h3>
              <ul>
                <li><strong>Equity Funds:</strong> Invest primarily in stocks for growth</li>
                <li><strong>Debt Funds:</strong> Invest in bonds and fixed income securities</li>
                <li><strong>Hybrid Funds:</strong> Mix of equity and debt investments</li>
                <li><strong>Index Funds:</strong> Track specific market indices</li>
                <li><strong>ELSS:</strong> Tax-saving equity funds with 3-year lock-in</li>
              </ul>
              
              <h3>Fund Selection Criteria</h3>
              <ul>
                <li>Consistent performance across different market cycles</li>
                <li>Low expense ratio and exit loads</li>
                <li>Experienced and stable fund management</li>
                <li>Appropriate risk level for your profile</li>
                <li>Good track record of the fund house</li>
              </ul>
              
              <h3>Common Mistakes to Avoid</h3>
              <ul>
                <li>Chasing past performance without considering consistency</li>
                <li>Ignoring expense ratios and their impact on returns</li>
                <li>Not diversifying across different fund categories</li>
                <li>Frequent switching between funds</li>
                <li>Not considering tax implications of fund investments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundAnalyzer;
