import React, { useState } from 'react';
import SEOHelmet from '../../components/SEOHelmet';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Target, AlertCircle, Calculator } from 'lucide-react';

const StockAnalyzer: React.FC = () => {
  const [stockData, setStockData] = useState({
    currentPrice: 100,
    targetPrice: 120,
    stopLoss: 90,
    quantity: 100,
    entryPrice: 95
  });

  const [analysis, setAnalysis] = useState({
    riskRewardRatio: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    riskAmount: 0,
    potentialGain: 0,
    potentialGainPercentage: 0
  });

  const calculateAnalysis = () => {
    const { currentPrice, targetPrice, stopLoss, quantity, entryPrice } = stockData;
    
    // Calculate potential gain
    const potentialGain = (targetPrice - currentPrice) * quantity;
    const potentialGainPercentage = ((targetPrice - currentPrice) / currentPrice) * 100;
    
    // Calculate potential loss
    const riskAmount = (currentPrice - stopLoss) * quantity;
    const riskPercentage = ((currentPrice - stopLoss) / currentPrice) * 100;
    
    // Calculate risk-reward ratio
    const riskRewardRatio = potentialGain / riskAmount;
    
    // Calculate current P&L
    const profitLoss = (currentPrice - entryPrice) * quantity;
    const profitLossPercentage = ((currentPrice - entryPrice) / entryPrice) * 100;
    
    setAnalysis({
      riskRewardRatio: riskRewardRatio || 0,
      profitLoss,
      profitLossPercentage,
      riskAmount,
      potentialGain,
      potentialGainPercentage
    });
  };

  React.useEffect(() => {
    calculateAnalysis();
  }, [stockData]);

  const handleInputChange = (field: string, value: number) => {
    setStockData({ ...stockData, [field]: value });
  };

  const getRiskLevel = () => {
    if (analysis.riskRewardRatio >= 2) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50' };
    if (analysis.riskRewardRatio >= 1) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const riskLevel = getRiskLevel();

  const getRecommendation = () => {
    if (analysis.riskRewardRatio >= 2) {
      return {
        action: 'BUY',
        color: 'text-green-600',
        bg: 'bg-green-50',
        reason: 'Excellent risk-reward ratio. Strong potential for profits.'
      };
    } else if (analysis.riskRewardRatio >= 1) {
      return {
        action: 'HOLD',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        reason: 'Moderate risk-reward ratio. Consider your risk tolerance.'
      };
    } else {
      return {
        action: 'AVOID',
        color: 'text-red-600',
        bg: 'bg-red-50',
        reason: 'Poor risk-reward ratio. High risk with low potential returns.'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEOHelmet
        title="Stock Analyzer - Analyze Stock Performance and Risk | MoneyCal India"
        description="Analyze stock performance, calculate risk-reward ratios, and get investment recommendations. Comprehensive stock analysis tool for informed investment decisions."
        keywords="stock analyzer, stock analysis, risk reward ratio, stock calculator, investment analysis, stock performance, technical analysis, fundamental analysis"
        canonicalUrl="https://moneycal.in/tools/stock-analyzer"
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Stock Performance Analyzer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze stock performance, calculate risk-reward ratios, and get data-driven investment recommendations for better trading decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stock Data Input */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                  Stock Data
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={stockData.currentPrice}
                      onChange={(e) => handleInputChange('currentPrice', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter current price"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entry Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={stockData.entryPrice}
                      onChange={(e) => handleInputChange('entryPrice', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter entry price"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={stockData.targetPrice}
                      onChange={(e) => handleInputChange('targetPrice', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter target price"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stop Loss (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={stockData.stopLoss}
                      onChange={(e) => handleInputChange('stopLoss', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter stop loss"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity (Shares)
                    </label>
                    <input
                      type="number"
                      value={stockData.quantity}
                      onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                  Analysis Results
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-700 font-medium">Current P&L</span>
                        <span className={`font-bold ${analysis.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{analysis.profitLoss.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-green-600">
                        {analysis.profitLossPercentage.toFixed(2)}%
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-700 font-medium">Potential Gain</span>
                        <span className="font-bold text-blue-600">
                          ₹{analysis.potentialGain.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-blue-600">
                        {analysis.potentialGainPercentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-red-700 font-medium">Risk Amount</span>
                        <span className="font-bold text-red-600">
                          ₹{analysis.riskAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-red-600">
                        {(((stockData.currentPrice - stockData.stopLoss) / stockData.currentPrice) * 100).toFixed(2)}%
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-700 font-medium">Risk-Reward Ratio</span>
                        <span className="font-bold text-purple-600">
                          {analysis.riskRewardRatio.toFixed(2)}:1
                        </span>
                      </div>
                      <div className="text-sm text-purple-600">
                        {analysis.riskRewardRatio >= 2 ? 'Excellent' : analysis.riskRewardRatio >= 1 ? 'Good' : 'Poor'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="space-y-6">
              {/* Investment Recommendation */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-orange-600" />
                  Investment Recommendation
                </h2>
                
                <div className={`p-4 rounded-lg ${recommendation.bg}`}>
                  <div className="text-center mb-4">
                    <div className={`text-3xl font-bold ${recommendation.color} mb-2`}>
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
                  Risk Assessment
                </h2>
                
                <div className={`p-4 rounded-lg ${riskLevel.bg}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Risk Level</span>
                    <span className={`font-semibold ${riskLevel.color}`}>{riskLevel.level}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {riskLevel.level === 'Low' && 'Low risk with good potential returns.'}
                    {riskLevel.level === 'Medium' && 'Moderate risk with balanced potential.'}
                    {riskLevel.level === 'High' && 'High risk with uncertain returns.'}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <PieChart className="w-6 h-6 mr-2 text-blue-600" />
                  Key Metrics
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(stockData.entryPrice * stockData.quantity).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Current Value</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(stockData.currentPrice * stockData.quantity).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Target Value</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(stockData.targetPrice * stockData.quantity).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Stop Loss Value</span>
                    <span className="font-semibold text-gray-900">
                      ₹{(stockData.stopLoss * stockData.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trading Tips */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                  Trading Tips
                </h2>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Risk Management:</strong> Never risk more than 2% of your portfolio on a single trade.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Position Sizing:</strong> Calculate position size based on your risk tolerance.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Stop Loss:</strong> Always set a stop loss to limit your downside risk.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Take Profit:</strong> Set realistic profit targets based on technical analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Stock Analysis Guide</h2>
            
            <div className="prose max-w-none">
              <h3>Understanding Stock Analysis</h3>
              <p>
                Stock analysis is the process of evaluating stocks to make informed investment decisions. 
                It involves analyzing financial data, market trends, and company fundamentals to determine 
                the potential value and risk of a stock investment.
              </p>
              
              <h3>Key Analysis Metrics</h3>
              <ul>
                <li><strong>Risk-Reward Ratio:</strong> Compares potential profit to potential loss</li>
                <li><strong>Current P&L:</strong> Profit or loss from current position</li>
                <li><strong>Potential Gain:</strong> Expected profit if target price is reached</li>
                <li><strong>Risk Amount:</strong> Maximum loss if stop loss is triggered</li>
              </ul>
              
              <h3>Types of Stock Analysis</h3>
              <ul>
                <li><strong>Fundamental Analysis:</strong> Analyzing company financials and business model</li>
                <li><strong>Technical Analysis:</strong> Studying price charts and market patterns</li>
                <li><strong>Quantitative Analysis:</strong> Using mathematical models and statistics</li>
                <li><strong>Sentiment Analysis:</strong> Evaluating market mood and investor behavior</li>
              </ul>
              
              <h3>Risk Management Principles</h3>
              <ul>
                <li>Never invest more than you can afford to lose</li>
                <li>Diversify your portfolio across different stocks and sectors</li>
                <li>Set stop losses to limit downside risk</li>
                <li>Use position sizing to manage risk exposure</li>
                <li>Regularly review and adjust your investment strategy</li>
              </ul>
              
              <h3>Common Trading Mistakes to Avoid</h3>
              <ul>
                <li>Emotional trading based on fear or greed</li>
                <li>Not setting stop losses or profit targets</li>
                <li>Overtrading and excessive position sizes</li>
                <li>Ignoring risk management principles</li>
                <li>Chasing hot stocks without proper analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAnalyzer;
