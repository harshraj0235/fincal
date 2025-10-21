import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Coins } from 'lucide-react';

interface GoldPriceWidgetProps {
  city: string;
}

// Simulated gold price data (in real app, this would come from API)
const getGoldPrice = (city: string) => {
  // Base prices (per 10g)
  const basePrices = {
    gold24k: 72500,
    gold22k: 66500,
    silver: 87000 // per kg
  };

  // City-wise variations (small differences based on local taxes and demand)
  const cityVariations: { [key: string]: number } = {
    'Mumbai': 1.02,
    'Delhi': 1.00,
    'Bangalore': 1.01,
    'Kolkata': 0.99,
    'Chennai': 1.015,
    'Hyderabad': 1.005,
    'Pune': 1.018,
    'Ahmedabad': 1.008,
    'Jaipur': 0.998,
    'Lucknow': 0.995
  };

  const multiplier = cityVariations[city] || 1.0;

  // Add small random fluctuation to simulate real-time prices
  const randomFluctuation = 1 + (Math.random() - 0.5) * 0.002; // ±0.1% variation

  return {
    gold24k: Math.round(basePrices.gold24k * multiplier * randomFluctuation),
    gold22k: Math.round(basePrices.gold22k * multiplier * randomFluctuation),
    silver: Math.round(basePrices.silver * multiplier * randomFluctuation),
    change24k: (Math.random() - 0.5) * 2, // -1% to +1%
    change22k: (Math.random() - 0.5) * 2,
    changeSilver: (Math.random() - 0.5) * 2
  };
};

const GoldPriceWidget: React.FC<GoldPriceWidgetProps> = ({ city }) => {
  const [prices, setPrices] = useState(getGoldPrice(city));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Update prices when city changes
    setPrices(getGoldPrice(city));
    setLastUpdated(new Date());
  }, [city]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPrices(getGoldPrice(city));
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 500);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const formatChange = (change: number) => {
    const isPositive = change > 0;
    return {
      value: `${isPositive ? '+' : ''}${change.toFixed(2)}%`,
      color: isPositive ? 'text-green-600' : 'text-red-600',
      Icon: isPositive ? TrendingUp : TrendingDown
    };
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-300 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Coins className="w-6 h-6 text-yellow-600" />
          <h3 className="text-xl font-bold text-gray-900">Live Gold Rates</h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
          title="Refresh prices"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        📍 {city} • Updated: {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
      </div>

      <div className="space-y-4">
        {/* 24K Gold */}
        <div className="bg-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Gold 24K (99.9% pure)</p>
              <p className="text-2xl font-bold text-yellow-700">{formatPrice(prices.gold24k)}</p>
              <p className="text-xs text-gray-500">per 10 grams</p>
            </div>
            <div className="text-right">
              {(() => {
                const { value, color, Icon } = formatChange(prices.change24k);
                return (
                  <div className={`flex items-center ${color} font-semibold`}>
                    <Icon className="w-4 h-4 mr-1" />
                    {value}
                  </div>
                );
              })()}
              <p className="text-xs text-gray-500 mt-1">Today</p>
            </div>
          </div>
        </div>

        {/* 22K Gold */}
        <div className="bg-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Gold 22K (91.6% pure)</p>
              <p className="text-2xl font-bold text-amber-600">{formatPrice(prices.gold22k)}</p>
              <p className="text-xs text-gray-500">per 10 grams</p>
            </div>
            <div className="text-right">
              {(() => {
                const { value, color, Icon } = formatChange(prices.change22k);
                return (
                  <div className={`flex items-center ${color} font-semibold`}>
                    <Icon className="w-4 h-4 mr-1" />
                    {value}
                  </div>
                );
              })()}
              <p className="text-xs text-gray-500 mt-1">Today</p>
            </div>
          </div>
        </div>

        {/* Silver */}
        <div className="bg-white p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Silver (99.9% pure)</p>
              <p className="text-2xl font-bold text-gray-600">{formatPrice(prices.silver)}</p>
              <p className="text-xs text-gray-500">per kilogram</p>
            </div>
            <div className="text-right">
              {(() => {
                const { value, color, Icon } = formatChange(prices.changeSilver);
                return (
                  <div className={`flex items-center ${color} font-semibold`}>
                    <Icon className="w-4 h-4 mr-1" />
                    {value}
                  </div>
                );
              })()}
              <p className="text-xs text-gray-500 mt-1">Today</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
        <p className="text-xs text-gray-700">
          <strong>💡 Note:</strong> Prices are indicative and may vary by jeweler. GST (3%) and making charges are additional. 
          Always verify current rates before purchase.
        </p>
      </div>
    </div>
  );
};

export default GoldPriceWidget;

