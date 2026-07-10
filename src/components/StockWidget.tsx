import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

interface StockWidgetProps {
  ticker: string;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

export const StockWidget: React.FC<StockWidgetProps> = ({ ticker }) => {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const fetchStockData = async () => {
      try {
        setLoading(true);
        // Add .NS for Indian stocks if no suffix is provided
        const symbol = ticker.includes('.') ? ticker.toUpperCase() : `${ticker.toUpperCase()}.NS`;
        
        const yfUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(yfUrl)}`;
        
        const res = await fetch(proxyUrl);
        if (!res.ok) throw new Error('Network response was not ok');
        
        const json = await res.json();
        const content = JSON.parse(json.contents);
        
        if (content.chart.error) {
           throw new Error(content.chart.error.description);
        }

        const result = content.chart.result[0];
        const meta = result.meta;
        
        const currentPrice = meta.regularMarketPrice;
        const previousClose = meta.chartPreviousClose;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;

        if (mounted) {
          setData({
            symbol: meta.symbol,
            price: currentPrice,
            change: change,
            changePercent: changePercent,
            timestamp: new Date(meta.regularMarketTime * 1000)
          });
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch stock data:', err);
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchStockData();
    
    return () => { mounted = false; };
  }, [ticker]);

  if (loading) {
    return (
      <div className="w-full max-w-sm rounded-2xl bg-white p-4 border border-gray-100 shadow-sm animate-pulse my-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-12 bg-gray-200 rounded-md"></div>
        </div>
        <div className="h-8 w-32 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full max-w-sm rounded-2xl bg-red-50 p-4 border border-red-100 my-4 flex items-center gap-2 text-sm text-red-600">
        <Activity className="w-4 h-4" /> Could not load data for <strong>{ticker}</strong>. It may not be a valid stock symbol.
      </div>
    );
  }

  const isPositive = data.change >= 0;

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 my-4 overflow-hidden relative">
      {/* Decorative background glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20 pointer-events-none rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'} -translate-y-1/2 translate-x-1/2`}></div>
      
      <div className="p-5 relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Stock Price</div>
            <h3 className="text-lg font-bold text-gray-900">{data.symbol}</h3>
          </div>
          <div className={`p-2 rounded-xl ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
        </div>
        
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-extrabold text-gray-900">
            ₹{data.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{data.change.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
            ({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-2 border-t border-gray-100 flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
        <Clock className="w-3 h-3" />
        Last updated: {data.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default StockWidget;
