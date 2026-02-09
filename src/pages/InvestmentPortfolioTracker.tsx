import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { TrendingUp, DollarSign, Plus, Trash2, Download, Save, BarChart3, PieChart, Target, AlertTriangle } from 'lucide-react';

interface Investment {
  id: number;
  name: string;
  type: string;
  purchasePrice: number;
  currentValue: number;
  quantity: number;
  purchaseDate: string;
  dividends: number;
}

const InvestmentPortfolioTracker: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([
    { id: 1, name: 'HDFC Bank', type: 'Stocks', purchasePrice: 0, currentValue: 0, quantity: 0, purchaseDate: '', dividends: 0 },
    { id: 2, name: 'Axis Bluechip Fund', type: 'Mutual Funds', purchasePrice: 0, currentValue: 0, quantity: 0, purchaseDate: '', dividends: 0 },
    { id: 3, name: 'SBI Gold ETF', type: 'ETFs', purchasePrice: 0, currentValue: 0, quantity: 0, purchaseDate: '', dividends: 0 }
  ]);

  const investmentTypes = [
    'Stocks', 'Mutual Funds', 'ETFs', 'Bonds', 'Real Estate', 'Gold', 'Cryptocurrency', 'Other'
  ];

  const handleInvestmentChange = (id: number, field: string, value: string | number) => {
    setInvestments(investments.map(inv => 
      inv.id === id ? { ...inv, [field]: field === 'purchasePrice' || field === 'currentValue' || field === 'quantity' || field === 'dividends' ? Number(value) : value } : inv
    ));
  };

  const addInvestment = () => {
    const newId = Math.max(...investments.map(i => i.id)) + 1;
    setInvestments([...investments, { 
      id: newId, 
      name: '', 
      type: 'Stocks', 
      purchasePrice: 0, 
      currentValue: 0, 
      quantity: 0, 
      purchaseDate: '', 
      dividends: 0 
    }]);
  };

  const removeInvestment = (id: number) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  const getTotalInvestment = () => investments.reduce((sum, inv) => sum + (inv.purchasePrice * inv.quantity), 0);
  const getCurrentValue = () => investments.reduce((sum, inv) => sum + (inv.currentValue * inv.quantity), 0);
  const getTotalGain = () => getCurrentValue() - getTotalInvestment();
  const getTotalGainPercentage = () => getTotalInvestment() > 0 ? (getTotalGain() / getTotalInvestment()) * 100 : 0;
  const getTotalDividends = () => investments.reduce((sum, inv) => sum + inv.dividends, 0);

  const saveToLocalStorage = () => {
    localStorage.setItem('portfolioData', JSON.stringify(investments));
    alert('Portfolio data saved successfully!');
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      setInvestments(JSON.parse(saved));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <SEOHelmet
        title="Investment Portfolio Tracker - Free Portfolio Management Tool India 2025"
        description="Track your investment portfolio performance with our free online tool. Monitor stocks, mutual funds, ETFs, and calculate returns. Perfect for Indian investors."
        keywords="investment portfolio tracker, portfolio management, investment calculator, stock tracker, mutual fund tracker, investment returns"
        url="/calculators/investment-portfolio-tracker"
        type="website"
        image="/images/portfolio-tracker.jpg"
        tags={["portfolio tracker", "investment management", "returns calculator", "stock tracker"]}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Investment Portfolio Tracker
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your investment portfolio performance, calculate returns, and monitor your 
            financial growth across stocks, mutual funds, ETFs, and more.
          </p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Invested</p>
                <p className="text-2xl font-bold text-blue-600">₹{getTotalInvestment().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Current Value</p>
                <p className="text-2xl font-bold text-green-600">₹{getCurrentValue().toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Gain/Loss</p>
                <p className={`text-2xl font-bold ${getTotalGain() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{getTotalGain().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <PieChart className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Return %</p>
                <p className={`text-2xl font-bold ${getTotalGainPercentage() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {getTotalGainPercentage().toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Management */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
                Your Investments
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={saveToLocalStorage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </button>
                <button
                  onClick={loadFromLocalStorage}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Load
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {investments.map((investment) => (
                <div key={investment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Investment Name</label>
                      <input
                        type="text"
                        value={investment.name}
                        onChange={(e) => handleInvestmentChange(investment.id, 'name', e.target.value)}
                        placeholder="e.g., HDFC Bank"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Type</label>
                      <select
                        value={investment.type}
                        onChange={(e) => handleInvestmentChange(investment.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      >
                        {investmentTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Purchase Price (₹)</label>
                      <input
                        type="number"
                        value={investment.purchasePrice}
                        onChange={(e) => handleInvestmentChange(investment.id, 'purchasePrice', e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Current Value (₹)</label>
                      <input
                        type="number"
                        value={investment.currentValue}
                        onChange={(e) => handleInvestmentChange(investment.id, 'currentValue', e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={investment.quantity}
                        onChange={(e) => handleInvestmentChange(investment.id, 'quantity', e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      />
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1">Dividends (₹)</label>
                        <input
                          type="number"
                          value={investment.dividends}
                          onChange={(e) => handleInvestmentChange(investment.id, 'dividends', e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeInvestment(investment.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addInvestment}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Investment
            </button>
          </div>

          {/* Analysis Section */}
          <div className="space-y-6">
            {/* Performance Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Performance Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">Total Return:</span>
                  <span className="font-bold text-blue-600">{getTotalGainPercentage().toFixed(2)}%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">Total Dividends:</span>
                  <span className="font-bold text-green-600">₹{getTotalDividends().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-700">Portfolio Value:</span>
                  <span className="font-bold text-purple-600">₹{getCurrentValue().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Investment Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Investment Best Practices</h3>
              <div className="space-y-2 text-gray-700">
                <p>• <strong>Diversify:</strong> Spread investments across different asset classes</p>
                <p>• <strong>Long-term focus:</strong> Invest for the long term, not short-term gains</p>
                <p>• <strong>Regular review:</strong> Monitor portfolio performance monthly</p>
                <p>• <strong>Rebalance:</strong> Adjust allocation based on market conditions</p>
                <p>• <strong>Research:</strong> Understand what you're investing in</p>
                <p>• <strong>Emergency fund:</strong> Keep 3-6 months of expenses in liquid assets</p>
              </div>
            </div>

            {/* Export Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Export Portfolio</h3>
              <p className="text-gray-600 mb-4">
                Download your portfolio data for record keeping or sharing with your financial advisor.
              </p>
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                Download Portfolio Report
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-yellow-700">
            This portfolio tracker is for educational purposes. Past performance doesn't guarantee future returns. 
            For investment advice, consult with a qualified financial advisor. Always do your own research 
            before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPortfolioTracker; 