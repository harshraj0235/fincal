import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Plus, Trash2, RefreshCw, Info, AlertCircle, DollarSign, BarChart3, Target, Globe, Zap, Shield, Smartphone } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

interface Stock {
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
  lastUpdated: string;
}

const RealTimeStockPortfolioTracker: React.FC = () => {
  const [portfolio, setPortfolio] = useState<Stock[]>([]);
  const [newStock, setNewStock] = useState({ symbol: '', quantity: '', purchasePrice: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');

  const FINNHUB_API_KEY = 'd2hli01r01qv0ma880dgd2hli01r01qv0ma880e0';
  const API_BASE_URL = 'https://finnhub.io/api/v1';

  useEffect(() => {
    const savedPortfolio = localStorage.getItem('stockPortfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('stockPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const fetchStockPrice = async (symbol: string): Promise<number> => {
    try {
      const response = await fetch(`${API_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      return data.c || 0;
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      throw error;
    }
  };

  const updateAllStockPrices = async () => {
    if (portfolio.length === 0) return;
    setIsLoading(true);
    setError('');
    try {
      const updatedPortfolio = await Promise.all(
        portfolio.map(async (stock) => {
          try {
            const currentPrice = await fetchStockPrice(stock.symbol);
            const totalValue = currentPrice * stock.quantity;
            const gainLoss = totalValue - (stock.purchasePrice * stock.quantity);
            const gainLossPercent = ((gainLoss / (stock.purchasePrice * stock.quantity)) * 100);
            return {
              ...stock,
              currentPrice,
              totalValue,
              gainLoss,
              gainLossPercent,
              lastUpdated: new Date().toLocaleString('en-IN')
            };
          } catch (error) {
            return stock;
          }
        })
      );
      setPortfolio(updatedPortfolio);
      setLastUpdate(new Date().toLocaleString('en-IN'));
    } catch (error) {
      setError('Failed to update stock prices. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addStock = async () => {
    if (!newStock.symbol || !newStock.quantity || !newStock.purchasePrice) {
      setError('Please fill in all fields');
      return;
    }
    const symbol = newStock.symbol.toUpperCase();
    const quantity = parseFloat(newStock.quantity);
    const purchasePrice = parseFloat(newStock.purchasePrice);
    if (quantity <= 0 || purchasePrice <= 0) {
      setError('Quantity and purchase price must be greater than 0');
      return;
    }
    if (portfolio.some(stock => stock.symbol === symbol)) {
      setError('Stock already exists in portfolio');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const currentPrice = await fetchStockPrice(symbol);
      const totalValue = currentPrice * quantity;
      const gainLoss = totalValue - (purchasePrice * quantity);
      const gainLossPercent = ((gainLoss / (purchasePrice * quantity)) * 100);
      const newStockData: Stock = {
        symbol,
        quantity,
        purchasePrice,
        currentPrice,
        totalValue,
        gainLoss,
        gainLossPercent,
        lastUpdated: new Date().toLocaleString('en-IN')
      };
      setPortfolio(prev => [...prev, newStockData]);
      setNewStock({ symbol: '', quantity: '', purchasePrice: '' });
      setLastUpdate(new Date().toLocaleString('en-IN'));
    } catch (error) {
      setError('Invalid stock symbol or API error. Please check the symbol format (e.g., RELIANCE.NS)');
    } finally {
      setIsLoading(false);
    }
  };

  const removeStock = (symbol: string) => {
    setPortfolio(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  const portfolioSummary = portfolio.reduce(
    (summary, stock) => ({
      totalValue: summary.totalValue + stock.totalValue,
      totalGainLoss: summary.totalGainLoss + stock.gainLoss,
      totalInvested: summary.totalInvested + (stock.purchasePrice * stock.quantity)
    }),
    { totalValue: 0, totalGainLoss: 0, totalInvested: 0 }
  );

  portfolioSummary.totalGainLossPercent = portfolioSummary.totalInvested > 0 
    ? (portfolioSummary.totalGainLoss / portfolioSummary.totalInvested) * 100 
    : 0;

  const popularStocks = [
    'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
    'HINDUNILVR.NS', 'ITC.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'KOTAKBANK.NS'
  ];

  return (
    <>
      <SEOHelmet
        title="Real-Time Stock Portfolio Tracker - Free BSE/NSE Stock Monitoring Tool | MoneyCal"
        description="Track your BSE/NSE stock portfolio in real-time with our free Indian stock tracker. Monitor gains/losses, portfolio value, and market trends for Indian stocks like RELIANCE, TCS, HDFC Bank. No registration required."
        keywords="real-time stock portfolio tracker India, BSE stock tracker, NSE stock portfolio, free stock monitoring tool, Indian stock market tracker, portfolio value calculator, stock gains losses tracker"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <section className="py-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Real-Time Stock Portfolio Tracker
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Monitor your BSE/NSE investments in real-time. Track gains, losses, and portfolio value 
                with live stock prices from Indian markets. No registration required.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  BSE/NSE Stocks
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Real-Time Data
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  No Registration
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Mobile Friendly
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Portfolio Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{portfolioSummary.totalValue.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Gain/Loss</p>
                    <p className={`text-2xl font-bold ${portfolioSummary.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{portfolioSummary.totalGainLoss.toLocaleString('en-IN')}
                    </p>
                  </div>
                  {portfolioSummary.totalGainLoss >= 0 ? (
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  ) : (
                    <TrendingDown className="w-8 h-8 text-red-600" />
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gain/Loss %</p>
                    <p className={`text-2xl font-bold ${portfolioSummary.totalGainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {portfolioSummary.totalGainLossPercent.toFixed(2)}%
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Invested</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{portfolioSummary.totalInvested.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Plus className="h-6 w-6 mr-3 text-green-600" />
                Add Stock to Portfolio
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Symbol
                  </label>
                  <input
                    type="text"
                    value={newStock.symbol}
                    onChange={(e) => setNewStock(prev => ({ ...prev, symbol: e.target.value }))}
                    placeholder="e.g., RELIANCE.NS"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={newStock.quantity}
                    onChange={(e) => setNewStock(prev => ({ ...prev, quantity: e.target.value }))}
                    placeholder="Number of shares"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purchase Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newStock.purchasePrice}
                    onChange={(e) => setNewStock(prev => ({ ...prev, purchasePrice: e.target.value }))}
                    placeholder="Price per share"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={addStock}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Plus className="w-5 h-5 mr-2" />
                    )}
                    Add Stock
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Popular Indian Stocks:</p>
                <div className="flex flex-wrap gap-2">
                  {popularStocks.map((stock) => (
                    <button
                      key={stock}
                      onClick={() => setNewStock(prev => ({ ...prev, symbol: stock }))}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {stock}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <p className="text-red-800">{error}</p>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-blue-800 font-medium mb-1">How to use:</p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Enter stock symbol with .NS suffix for NSE stocks (e.g., RELIANCE.NS)</li>
                      <li>• Enter .BO suffix for BSE stocks (e.g., RELIANCE.BO)</li>
                      <li>• Add quantity and purchase price to calculate gains/losses</li>
                      <li>• Portfolio data is automatically saved in your browser</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
                    Your Portfolio
                  </h2>
                  <button
                    onClick={updateAllStockPrices}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Refresh Prices
                  </button>
                </div>
                {lastUpdate && (
                  <p className="text-sm text-gray-500 mt-2">
                    Last updated: {lastUpdate}
                  </p>
                )}
              </div>

              {portfolio.length === 0 ? (
                <div className="p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks in portfolio</h3>
                  <p className="text-gray-600">Add your first stock to start tracking your investments</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purchase Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Gain/Loss
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {portfolio.map((stock) => (
                        <tr key={stock.symbol} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                            <div className="text-sm text-gray-500">Last: {stock.lastUpdated}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {stock.quantity.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{stock.purchasePrice.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{stock.currentPrice.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{stock.totalValue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${stock.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ₹{stock.gainLoss.toLocaleString()}
                            </div>
                            <div className={`text-xs ${stock.gainLossPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {stock.gainLossPercent >= 0 ? '+' : ''}{stock.gainLossPercent.toFixed(2)}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => removeStock(stock.symbol)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Free Real-Time Stock Portfolio Tracker for Indian Investors
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  Our Real-Time Stock Portfolio Tracker is designed specifically for Indian investors who want to monitor their BSE and NSE investments without any registration or subscription fees. This comprehensive tool provides live stock prices, instant portfolio valuation, and detailed gain/loss analysis to help you make informed investment decisions.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features for Indian Stock Market Investors</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-blue-600" />
                      BSE/NSE Stock Support
                    </h4>
                    <p className="text-gray-700">
                      Track stocks from both Bombay Stock Exchange (BSE) and National Stock Exchange (NSE) with proper symbol formatting (.NS for NSE, .BO for BSE).
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-green-600" />
                      Real-Time Price Updates
                    </h4>
                    <p className="text-gray-700">
                      Get live stock prices powered by Finnhub API with automatic refresh options and manual update capabilities.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-purple-600" />
                      No Registration Required
                    </h4>
                    <p className="text-gray-700">
                      Start tracking your portfolio immediately without creating accounts or providing personal information.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Smartphone className="w-5 h-5 mr-2 text-orange-600" />
                      Mobile-Friendly Design
                    </h4>
                    <p className="text-gray-700">
                      Responsive design that works perfectly on smartphones, tablets, and desktop computers.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Stock Portfolio Tracker</h3>
                
                <div className="bg-blue-50 p-6 rounded-xl mb-6">
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li><strong>Add Stocks:</strong> Enter the stock symbol (e.g., RELIANCE.NS for NSE), quantity, and purchase price</li>
                    <li><strong>Monitor Portfolio:</strong> View real-time prices, total value, and gain/loss calculations</li>
                    <li><strong>Auto-Save:</strong> Your portfolio is automatically saved in your browser's local storage</li>
                    <li><strong>Refresh Data:</strong> Click "Refresh Prices" or enable auto-refresh for live updates</li>
                    <li><strong>Manage Holdings:</strong> Remove stocks or add new ones as your portfolio changes</li>
                  </ol>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Popular Indian Stocks to Track</h3>
                
                <p className="text-gray-700 mb-4">
                  Our tool supports all major Indian stocks including:
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {popularStocks.map((stock) => (
                    <div key={stock} className="bg-gray-100 p-3 rounded-lg text-center">
                      <span className="text-sm font-medium text-gray-700">{stock}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Free Stock Portfolio Tracker?</h3>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Cost-Effective:</strong> Unlike paid portfolio tracking services, our tool is completely free to use with no hidden charges or premium features.
                  </p>
                  <p>
                    <strong>Privacy-Focused:</strong> Your portfolio data stays on your device and is never shared with third parties or stored on our servers.
                  </p>
                  <p>
                    <strong>Real-Time Accuracy:</strong> Powered by reliable financial data APIs to ensure accurate stock prices and calculations.
                  </p>
                  <p>
                    <strong>User-Friendly:</strong> Simple, intuitive interface designed for both beginner and experienced investors.
                  </p>
                  <p>
                    <strong>Always Accessible:</strong> No login required means you can access your portfolio anytime, anywhere, without remembering passwords.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RealTimeStockPortfolioTracker;
