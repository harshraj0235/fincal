import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Trash2, 
  Eye,
  EyeOff,
  RefreshCw,
  AlertCircle,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { getStockQuote, StockQuote } from '../services/stockApi';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  isFavorite: boolean;
  isVisible: boolean;
}

interface MarketWatchlistProps {
  onClose?: () => void;
}

const MarketWatchlist: React.FC<MarketWatchlistProps> = ({ onClose }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStock, setNewStock] = useState({ symbol: '', name: '' });

  // Default watchlist items
  const defaultWatchlist: WatchlistItem[] = [
    {
      symbol: 'NIFTY50',
      name: 'Nifty 50 Index',
      price: 22500.50,
      change: 125.30,
      changePercent: 0.56,
      volume: 0,
      marketCap: 'N/A',
      isFavorite: true,
      isVisible: true
    },
    {
      symbol: 'SENSEX',
      name: 'BSE Sensex',
      price: 74250.75,
      change: 85.20,
      changePercent: 0.11,
      volume: 0,
      marketCap: 'N/A',
      isFavorite: true,
      isVisible: true
    },
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries',
      price: 2450.50,
      change: 45.25,
      changePercent: 1.88,
      volume: 2500000,
      marketCap: '15.2L Cr',
      isFavorite: true,
      isVisible: true
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3850.75,
      change: -45.80,
      changePercent: -1.17,
      volume: 1800000,
      marketCap: '14.1L Cr',
      isFavorite: true,
      isVisible: true
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank',
      price: 1650.25,
      change: 12.50,
      changePercent: 0.76,
      volume: 3200000,
      marketCap: '9.8L Cr',
      isFavorite: true,
      isVisible: true
    }
  ];

  useEffect(() => {
    // Load watchlist from localStorage or use default
    const savedWatchlist = localStorage.getItem('marketWatchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    } else {
      setWatchlist(defaultWatchlist);
    }
  }, []);

  useEffect(() => {
    // Save watchlist to localStorage
    localStorage.setItem('marketWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Update prices periodically
  useEffect(() => {
    const updatePrices = async () => {
      if (watchlist.length === 0) return;

      setLoading(true);
      const updatedWatchlist = await Promise.all(
        watchlist.map(async (item) => {
          // Skip indices as they don't have real-time quotes
          if (item.symbol === 'NIFTY50' || item.symbol === 'SENSEX') {
            // Simulate index updates
            const randomChange = (Math.random() - 0.5) * 200;
            const randomPercent = (Math.random() - 0.5) * 2;
            return {
              ...item,
              price: item.price + randomChange,
              change: randomChange,
              changePercent: randomPercent
            };
          }

          try {
            const quote = await getStockQuote(item.symbol);
            if (quote) {
              return {
                ...item,
                price: quote.price,
                change: quote.change,
                changePercent: quote.changePercent,
                volume: quote.volume
              };
            }
            return item;
          } catch (error) {
            console.error(`Error updating ${item.symbol}:`, error);
            return item;
          }
        })
      );

      setWatchlist(updatedWatchlist);
      setLoading(false);
    };

    updatePrices();
    
    // Update every 30 seconds
    const interval = setInterval(updatePrices, 30000);
    return () => clearInterval(interval);
  }, [watchlist.length]);

  const addStock = async () => {
    if (!newStock.symbol || !newStock.name) {
      alert('Please fill all fields');
      return;
    }

    try {
      const quote = await getStockQuote(newStock.symbol);
      if (!quote) {
        alert('Stock not found. Please check the symbol.');
        return;
      }

      const newItem: WatchlistItem = {
        symbol: newStock.symbol.toUpperCase(),
        name: newStock.name,
        price: quote.price,
        change: quote.change,
        changePercent: quote.changePercent,
        volume: quote.volume,
        marketCap: 'N/A', // Would need additional API call for market cap
        isFavorite: true,
        isVisible: true
      };

      setWatchlist([...watchlist, newItem]);
      setNewStock({ symbol: '', name: '' });
      setShowAddForm(false);
    } catch (error) {
      alert('Error adding stock. Please try again.');
    }
  };

  const removeStock = (symbol: string) => {
    setWatchlist(watchlist.filter(item => item.symbol !== symbol));
  };

  const toggleVisibility = (symbol: string) => {
    setWatchlist(watchlist.map(item => 
      item.symbol === symbol 
        ? { ...item, isVisible: !item.isVisible }
        : item
    ));
  };

  const toggleFavorite = (symbol: string) => {
    setWatchlist(watchlist.map(item => 
      item.symbol === symbol 
        ? { ...item, isFavorite: !item.isFavorite }
        : item
    ));
  };

  const visibleItems = watchlist.filter(item => item.isVisible);
  const favoriteItems = watchlist.filter(item => item.isFavorite);

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const totalMarketValue = visibleItems.reduce((sum, item) => sum + item.price, 0);
  const totalChange = visibleItems.reduce((sum, item) => sum + item.change, 0);
  const totalChangePercent = totalMarketValue > 0 ? (totalChange / (totalMarketValue - totalChange)) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            Market Watchlist
          </h2>
          <p className="text-gray-600 mt-1">Track your favorite stocks and market indices</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stock
          </button>
          <button
            onClick={() => window.location.reload()}
            disabled={loading}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Value</p>
              <p className="text-2xl font-bold">₹{totalMarketValue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 opacity-80" />
          </div>
        </div>
        
        <div className={`rounded-xl p-4 ${
          totalChange >= 0 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Change</p>
              <p className="text-2xl font-bold">
                {totalChange >= 0 ? '+' : ''}₹{totalChange.toLocaleString()}
              </p>
            </div>
            {totalChange >= 0 ? (
              <TrendingUp className="h-8 w-8 opacity-80" />
            ) : (
              <TrendingDown className="h-8 w-8 opacity-80" />
            )}
          </div>
        </div>
        
        <div className={`rounded-xl p-4 ${
          totalChangePercent >= 0 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Change %</p>
              <p className="text-2xl font-bold">
                {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
              </p>
            </div>
            <BarChart3 className="h-8 w-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Watchlist</p>
              <p className="text-2xl font-bold">{visibleItems.length}</p>
            </div>
            <Star className="h-8 w-8 opacity-80" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Stock Symbol (e.g., RELIANCE)"
              value={newStock.symbol}
              onChange={(e) => setNewStock({...newStock, symbol: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={newStock.name}
              onChange={(e) => setNewStock({...newStock, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={addStock}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

      {/* Watchlist Table */}
      {visibleItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visibleItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleFavorite(item.symbol)}
                        className={`p-1 rounded-full transition-colors ${
                          item.isFavorite
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className="h-4 w-4" />
                      </button>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{item.symbol}</div>
                        <div className="text-sm text-gray-500">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getChangeIcon(item.changePercent)}
                      <span className={`text-sm font-medium ml-1 ${getChangeColor(item.changePercent)}`}>
                        {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.volume > 0 ? item.volume.toLocaleString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.marketCap}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleVisibility(item.symbol)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => removeStock(item.symbol)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks in watchlist</h3>
          <p className="text-gray-600 mb-4">Add your first stock to start tracking</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Stock
          </button>
        </div>
      )}

      {/* Hidden Items Summary */}
      {watchlist.filter(item => !item.isVisible).length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <EyeOff className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {watchlist.filter(item => !item.isVisible).length} hidden items
              </span>
            </div>
            <button
              onClick={() => setWatchlist(watchlist.map(item => ({ ...item, isVisible: true })))}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Show All
            </button>
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Last updated: {new Date().toLocaleTimeString()}
        {loading && (
          <div className="ml-2 inline-flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            <span className="ml-1">Updating...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketWatchlist;
