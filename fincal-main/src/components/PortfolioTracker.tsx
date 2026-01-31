import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Calendar,
  Target,
  AlertCircle
} from 'lucide-react';
import { getStockQuote, StockQuote } from '../services/stockApi';

interface PortfolioStock {
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  changePercent: number;
  totalValue: number;
  totalCost: number;
  profitLoss: number;
  profitLossPercent: number;
}

interface PortfolioTrackerProps {
  onClose?: () => void;
}

const PortfolioTracker: React.FC<PortfolioTrackerProps> = ({ onClose }) => {
  const [portfolio, setPortfolio] = useState<PortfolioStock[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newStock, setNewStock] = useState({
    symbol: '',
    name: '',
    quantity: 0,
    buyPrice: 0
  });

  // Load portfolio from localStorage
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('stockPortfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  // Save portfolio to localStorage
  useEffect(() => {
    localStorage.setItem('stockPortfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  // Update portfolio with real-time prices
  useEffect(() => {
    const updatePortfolioPrices = async () => {
      if (portfolio.length === 0) return;

      setLoading(true);
      const updatedPortfolio = await Promise.all(
        portfolio.map(async (stock) => {
          try {
            const quote = await getStockQuote(stock.symbol);
            if (quote) {
              const currentPrice = quote.price;
              const totalValue = stock.quantity * currentPrice;
              const totalCost = stock.quantity * stock.buyPrice;
              const profitLoss = totalValue - totalCost;
              const profitLossPercent = (profitLoss / totalCost) * 100;

              return {
                ...stock,
                currentPrice,
                changePercent: quote.changePercent,
                totalValue,
                profitLoss,
                profitLossPercent
              };
            }
            return stock;
          } catch (error) {
            console.error(`Error updating ${stock.symbol}:`, error);
            return stock;
          }
        })
      );

      setPortfolio(updatedPortfolio);
      setLoading(false);
    };

    updatePortfolioPrices();
    
    // Update every 5 minutes
    const interval = setInterval(updatePortfolioPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [portfolio.length]);

  const addStock = async () => {
    if (!newStock.symbol || !newStock.name || newStock.quantity <= 0 || newStock.buyPrice <= 0) {
      alert('Please fill all fields correctly');
      return;
    }

    try {
      const quote = await getStockQuote(newStock.symbol);
      if (!quote) {
        alert('Stock not found. Please check the symbol.');
        return;
      }

      const currentPrice = quote.price;
      const totalValue = newStock.quantity * currentPrice;
      const totalCost = newStock.quantity * newStock.buyPrice;
      const profitLoss = totalValue - totalCost;
      const profitLossPercent = (profitLoss / totalCost) * 100;

      const stockToAdd: PortfolioStock = {
        symbol: newStock.symbol.toUpperCase(),
        name: newStock.name,
        quantity: newStock.quantity,
        buyPrice: newStock.buyPrice,
        currentPrice,
        changePercent: quote.changePercent,
        totalValue,
        totalCost,
        profitLoss,
        profitLossPercent
      };

      setPortfolio([...portfolio, stockToAdd]);
      setNewStock({ symbol: '', name: '', quantity: 0, buyPrice: 0 });
      setShowAddForm(false);
    } catch (error) {
      alert('Error adding stock. Please try again.');
    }
  };

  const removeStock = (symbol: string) => {
    setPortfolio(portfolio.filter(stock => stock.symbol !== symbol));
  };

  const totalPortfolioValue = portfolio.reduce((sum, stock) => sum + stock.totalValue, 0);
  const totalPortfolioCost = portfolio.reduce((sum, stock) => sum + stock.totalCost, 0);
  const totalProfitLoss = totalPortfolioValue - totalPortfolioCost;
  const totalProfitLossPercent = totalPortfolioCost > 0 ? (totalProfitLoss / totalPortfolioCost) * 100 : 0;

  const topGainers = [...portfolio].sort((a, b) => b.profitLossPercent - a.profitLossPercent).slice(0, 3);
  const topLosers = [...portfolio].sort((a, b) => a.profitLossPercent - b.profitLossPercent).slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <PieChart className="h-6 w-6 mr-2 text-green-600" />
            Portfolio Tracker
          </h2>
          <p className="text-gray-600 mt-1">Track your stock investments and performance</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Value</p>
              <p className="text-2xl font-bold">₹{totalPortfolioValue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Cost</p>
              <p className="text-2xl font-bold">₹{totalPortfolioCost.toLocaleString()}</p>
            </div>
            <Target className="h-8 w-8 opacity-80" />
          </div>
        </div>
        
        <div className={`rounded-xl p-4 ${
          totalProfitLoss >= 0 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">P&L</p>
              <p className="text-2xl font-bold">
                ₹{totalProfitLoss.toLocaleString()}
              </p>
            </div>
            {totalProfitLoss >= 0 ? (
              <TrendingUp className="h-8 w-8 opacity-80" />
            ) : (
              <TrendingDown className="h-8 w-8 opacity-80" />
            )}
          </div>
        </div>
        
        <div className={`rounded-xl p-4 ${
          totalProfitLossPercent >= 0 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">P&L %</p>
              <p className="text-2xl font-bold">
                {totalProfitLossPercent >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
              </p>
            </div>
            <BarChart3 className="h-8 w-8 opacity-80" />
          </div>
        </div>
      </div>

      {/* Add Stock Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-xl p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Stock</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Stock Symbol (e.g., RELIANCE)"
              value={newStock.symbol}
              onChange={(e) => setNewStock({...newStock, symbol: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={newStock.name}
              onChange={(e) => setNewStock({...newStock, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newStock.quantity}
              onChange={(e) => setNewStock({...newStock, quantity: Number(e.target.value)})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Buy Price (₹)"
              value={newStock.buyPrice}
              onChange={(e) => setNewStock({...newStock, buyPrice: Number(e.target.value)})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={addStock}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Stock
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Portfolio Table */}
      {portfolio.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buy Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P&L %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portfolio.map((stock, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{stock.buyPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{stock.currentPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{stock.totalValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      stock.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.profitLoss >= 0 ? '+' : ''}₹{stock.profitLoss.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      stock.profitLossPercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.profitLossPercent >= 0 ? '+' : ''}{stock.profitLossPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => removeStock(stock.symbol)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <PieChart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks in portfolio</h3>
          <p className="text-gray-600 mb-4">Add your first stock to start tracking your investments</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Your First Stock
          </button>
        </div>
      )}

      {/* Performance Summary */}
      {portfolio.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Gainers */}
          <div className="bg-green-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Top Gainers
            </h3>
            {topGainers.map((stock, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-700">{stock.symbol}</span>
                <span className="text-sm text-green-600">+{stock.profitLossPercent.toFixed(2)}%</span>
              </div>
            ))}
          </div>

          {/* Top Losers */}
          <div className="bg-red-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
              <TrendingDown className="h-5 w-5 mr-2" />
              Top Losers
            </h3>
            {topLosers.map((stock, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-red-700">{stock.symbol}</span>
                <span className="text-sm text-red-600">{stock.profitLossPercent.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
        <Calendar className="h-4 w-4 mr-1" />
        Last updated: {new Date().toLocaleTimeString()}
        {loading && (
          <div className="ml-2 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
            <span className="ml-1">Updating...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioTracker;
