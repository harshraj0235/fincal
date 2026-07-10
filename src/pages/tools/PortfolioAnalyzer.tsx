import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { TrendingUp, TrendingDown, PieChart, BarChart3, Target, AlertCircle } from 'lucide-react';

const PortfolioAnalyzer: React.FC = () => {
  const [portfolio, setPortfolio] = useState([
    { name: 'Stocks', value: 40, amount: 400000, returns: 12 },
    { name: 'Mutual Funds', value: 30, amount: 300000, returns: 10 },
    { name: 'Bonds', value: 20, amount: 200000, returns: 6 },
    { name: 'Gold', value: 10, amount: 100000, returns: 8 }
  ]);

  const [newAsset, setNewAsset] = useState({ name: '', amount: '', returns: '' });

  const addAsset = () => {
    if (newAsset.name && newAsset.amount && newAsset.returns) {
      const amount = parseFloat(newAsset.amount);
      const returns = parseFloat(newAsset.returns);
      const totalAmount = portfolio.reduce((sum, asset) => sum + asset.amount, 0) + amount;
      
      setPortfolio([...portfolio, {
        name: newAsset.name,
        value: (amount / totalAmount) * 100,
        amount: amount,
        returns: returns
      }]);
      
      setNewAsset({ name: '', amount: '', returns: '' });
    }
  };

  const removeAsset = (index: number) => {
    setPortfolio(portfolio.filter((_, i) => i !== index));
  };

  const totalAmount = portfolio.reduce((sum, asset) => sum + asset.amount, 0);
  const weightedReturns = portfolio.reduce((sum, asset) => sum + (asset.returns * asset.amount / totalAmount), 0);
  const totalReturns = portfolio.reduce((sum, asset) => sum + (asset.amount * asset.returns / 100), 0);

  const getRiskLevel = () => {
    const stockWeight = portfolio.find(asset => asset.name === 'Stocks')?.value || 0;
    if (stockWeight > 70) return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
    if (stockWeight > 40) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const riskLevel = getRiskLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEOHelmet
        title="Portfolio Analyzer - Analyze Your Investment Portfolio | MoneyCal India"
        description="Analyze your investment portfolio performance, risk assessment, and asset allocation. Get detailed insights into your portfolio's returns, diversification, and optimization recommendations."
        keywords="portfolio analyzer, investment portfolio, portfolio analysis, asset allocation, portfolio performance, investment risk, portfolio optimization, portfolio tracker"
        canonicalUrl="/tools/portfolio-analyzer"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Portfolio Analyzer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze your investment portfolio performance, assess risk levels, and get optimization recommendations for better returns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Portfolio Input */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-blue-600" />
                  Portfolio Composition
                </h2>

                {/* Add New Asset */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Asset Name"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={newAsset.amount}
                    onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Expected Returns (%)"
                    value={newAsset.returns}
                    onChange={(e) => setNewAsset({ ...newAsset, returns: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addAsset}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Asset
                  </button>
                </div>

                {/* Portfolio Assets */}
                <div className="space-y-4">
                  {portfolio.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                          <span className="text-sm text-gray-500">{asset.value.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>₹{asset.amount.toLocaleString()}</span>
                          <span className="flex items-center">
                            {asset.returns > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            {asset.returns}% returns
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${asset.value}%` }}
                          ></div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeAsset(index)}
                        className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio Analysis */}
            <div className="space-y-6">
              {/* Portfolio Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                  Portfolio Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-semibold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Weighted Returns</span>
                    <span className="font-semibold text-green-600">{weightedReturns.toFixed(2)}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Expected Annual Returns</span>
                    <span className="font-semibold text-green-600">₹{totalReturns.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-600" />
                  Risk Assessment
                </h2>
                
                <div className={`p-4 rounded-lg ${riskLevel.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Risk Level</span>
                    <span className={`font-semibold ${riskLevel.color}`}>{riskLevel.level}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {riskLevel.level === 'High' && 'High equity exposure. Consider diversifying with bonds and gold.'}
                    {riskLevel.level === 'Medium' && 'Balanced portfolio. Good mix of growth and stability.'}
                    {riskLevel.level === 'Low' && 'Conservative portfolio. Consider adding growth assets for better returns.'}
                  </p>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-blue-600" />
                  Recommendations
                </h2>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Diversification:</strong> Ensure no single asset class exceeds 40% of your portfolio.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Rebalancing:</strong> Review and rebalance your portfolio quarterly for optimal performance.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Tax Optimization:</strong> Consider tax-saving investments like ELSS for better post-tax returns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Detailed Portfolio Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {portfolio.length}
                </div>
                <div className="text-sm text-gray-600">Asset Classes</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {Math.max(...portfolio.map(a => a.value)).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Largest Allocation</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {Math.min(...portfolio.map(a => a.value)).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Smallest Allocation</div>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {(Math.max(...portfolio.map(a => a.returns)) - Math.min(...portfolio.map(a => a.returns))).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Return Range</div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Portfolio Analysis Guide</h2>
            
            <div className="prose max-w-none">
              <h3>Understanding Portfolio Analysis</h3>
              <p>
                Portfolio analysis is crucial for understanding your investment performance and making informed decisions. 
                A well-analyzed portfolio helps you identify strengths, weaknesses, and opportunities for improvement.
              </p>
              
              <h3>Key Metrics to Monitor</h3>
              <ul>
                <li><strong>Asset Allocation:</strong> The percentage distribution of your investments across different asset classes</li>
                <li><strong>Risk Level:</strong> Assessment of portfolio volatility and potential for losses</li>
                <li><strong>Returns:</strong> Historical and expected returns from your investments</li>
                <li><strong>Diversification:</strong> How well your portfolio is spread across different investments</li>
              </ul>
              
              <h3>Portfolio Optimization Tips</h3>
              <ul>
                <li>Maintain a balanced allocation between growth and stability assets</li>
                <li>Regularly rebalance your portfolio to maintain target allocations</li>
                <li>Consider your risk tolerance and investment timeline</li>
                <li>Diversify across different sectors, geographies, and asset classes</li>
                <li>Review and adjust your portfolio based on changing market conditions</li>
              </ul>
              
              <h3>Common Portfolio Mistakes to Avoid</h3>
              <ul>
                <li>Over-concentration in a single asset class or stock</li>
                <li>Ignoring risk management and diversification</li>
                <li>Frequent trading and market timing</li>
                <li>Not considering tax implications of investments</li>
                <li>Failing to review and rebalance regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalyzer;
