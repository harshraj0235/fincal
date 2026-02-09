import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, ExternalLink } from 'lucide-react';

interface MarketData {
  nifty50: {
    value: number;
    change: number;
    changePercent: number;
  };
  sensex: {
    value: number;
    change: number;
    changePercent: number;
  };
  gold: {
    value: number;
    change: number;
    changePercent: number;
  };
  silver: {
    value: number;
    change: number;
    changePercent: number;
  };
  dollar: {
    value: number;
    change: number;
    changePercent: number;
  };
  bitcoin: {
    value: number;
    change: number;
    changePercent: number;
  };
  lastUpdated: string;
}

const RealTimeMarketData: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate real-time market data fetch
  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call with realistic market data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: MarketData = {
        nifty50: {
          value: 24567.89 + (Math.random() - 0.5) * 200,
          change: (Math.random() - 0.5) * 100,
          changePercent: (Math.random() - 0.5) * 2
        },
        sensex: {
          value: 81234.56 + (Math.random() - 0.5) * 500,
          change: (Math.random() - 0.5) * 200,
          changePercent: (Math.random() - 0.5) * 2
        },
        gold: {
          value: 62500 + (Math.random() - 0.5) * 1000,
          change: (Math.random() - 0.5) * 500,
          changePercent: (Math.random() - 0.5) * 1.5
        },
        silver: {
          value: 78500 + (Math.random() - 0.5) * 2000,
          change: (Math.random() - 0.5) * 1000,
          changePercent: (Math.random() - 0.5) * 2
        },
        dollar: {
          value: 83.45 + (Math.random() - 0.5) * 0.5,
          change: (Math.random() - 0.5) * 0.2,
          changePercent: (Math.random() - 0.5) * 0.5
        },
        bitcoin: {
          value: 4250000 + (Math.random() - 0.5) * 200000,
          change: (Math.random() - 0.5) * 100000,
          changePercent: (Math.random() - 0.5) * 5
        },
        lastUpdated: new Date().toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        })
      };
      
      setMarketData(mockData);
    } catch (err) {
      setError('Failed to fetch market data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Update data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatValue = (value: number, type: 'currency' | 'number' = 'number') => {
    if (type === 'currency') {
      return value.toLocaleString('en-IN', { 
        style: 'currency', 
        currency: 'INR',
        maximumFractionDigits: 0
      });
    }
    return value.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? 
      <TrendingUp className="h-4 w-4" /> : 
      <TrendingDown className="h-4 w-4" />;
  };

  const getChangeBgColor = (change: number) => {
    return change >= 0 ? 'bg-green-50' : 'bg-red-50';
  };

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-red-600">
          <p>Failed to load market data</p>
          <button 
            onClick={fetchMarketData}
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center mx-auto"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Market Data</h3>
        <div className="flex items-center gap-2">
          {isLoading && <RefreshCw className="h-4 w-4 animate-spin text-gray-400" />}
          <button 
            onClick={fetchMarketData}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <span className="text-xs text-gray-500">
            {marketData?.lastUpdated && `Updated ${marketData.lastUpdated}`}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : marketData ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            {/* Nifty 50 */}
            <div className="text-center p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Nifty 50</p>
              <p className="font-semibold text-gray-900 text-sm">
                {formatValue(marketData.nifty50.value)}
              </p>
              <div className={`flex items-center justify-center mt-1 ${getChangeColor(marketData.nifty50.change)}`}>
                {getChangeIcon(marketData.nifty50.change)}
                <span className="text-xs ml-1">
                  {Math.abs(marketData.nifty50.changePercent).toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Sensex */}
            <div className="text-center p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Sensex</p>
              <p className="font-semibold text-gray-900 text-sm">
                {formatValue(marketData.sensex.value)}
              </p>
              <div className={`flex items-center justify-center mt-1 ${getChangeColor(marketData.sensex.change)}`}>
                {getChangeIcon(marketData.sensex.change)}
                <span className="text-xs ml-1">
                  {Math.abs(marketData.sensex.changePercent).toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Gold */}
            <div className="text-center p-3 rounded-lg border border-gray-100 hover:border-yellow-200 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Gold (₹/10g)</p>
              <p className="font-semibold text-gray-900 text-sm">
                ₹{formatValue(marketData.gold.value)}
              </p>
              <div className={`flex items-center justify-center mt-1 ${getChangeColor(marketData.gold.change)}`}>
                {getChangeIcon(marketData.gold.change)}
                <span className="text-xs ml-1">
                  {Math.abs(marketData.gold.changePercent).toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Silver */}
            <div className="text-center p-3 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Silver (₹/kg)</p>
              <p className="font-semibold text-gray-900 text-sm">
                ₹{formatValue(marketData.silver.value)}
              </p>
              <div className={`flex items-center justify-center mt-1 ${getChangeColor(marketData.silver.change)}`}>
                {getChangeIcon(marketData.silver.change)}
                <span className="text-xs ml-1">
                  {Math.abs(marketData.silver.changePercent).toFixed(2)}%
                </span>
              </div>
            </div>

            {/* USD/INR */}
            <div className="text-center p-3 rounded-lg border border-gray-100 hover:border-green-200 transition-colors">
              <p className="text-xs text-gray-500 mb-1">USD/INR</p>
              <p className="font-semibold text-gray-900 text-sm">
                ₹{formatValue(marketData.dollar.value, 'number')}
              </p>
              <div className={`flex items-center justify-center mt-1 ${getChangeColor(marketData.dollar.change)}`}>
                {getChangeIcon(marketData.dollar.change)}
                <span className="text-xs ml-1">
                  {Math.abs(marketData.dollar.changePercent).toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Bitcoin */}
            <div className="text-center p-3 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors">
              <p className="text-xs text-gray-500 mb-1">Bitcoin</p>
              <p className="font-semibold text-gray-900 text-sm">
                ₹{(marketData.bitcoin.value / 100000).toFixed(1)}L
              </p>
              <div className={`flex items-center justify-center mt-1 ${getChangeColor(marketData.bitcoin.change)}`}>
                {getChangeIcon(marketData.bitcoin.change)}
                <span className="text-xs ml-1">
                  {Math.abs(marketData.bitcoin.changePercent).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Market Summary */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Market Summary</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {marketData.nifty50.change >= 0 ? 'Markets are trading higher' : 'Markets are trading lower'} today
                </p>
              </div>
              <a 
                href="/market-analysis" 
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
              >
                View Analysis
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default RealTimeMarketData;
