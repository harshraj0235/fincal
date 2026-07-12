import React, { useEffect, useState } from 'react';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
  volume: string;
  marketCap: string;
  currency: string;
}

interface StockLiveWidgetProps {
  ticker: string;
}

const StockLiveWidget: React.FC<StockLiveWidgetProps> = ({ ticker }) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        setError(false);

        // Use Yahoo Finance v8 API via CORS proxy
        const cleanTicker = ticker.trim();
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://query1.finance.yahoo.com/v8/finance/chart/${cleanTicker}?interval=1d&range=1d`
        )}`;

        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Fetch failed');

        const proxyData = await response.json();
        const data = JSON.parse(proxyData.contents);

        const result = data?.chart?.result?.[0];
        if (!result) throw new Error('No data');

        const meta = result.meta;
        const price = meta.regularMarketPrice || 0;
        const prevClose = meta.chartPreviousClose || meta.previousClose || price;
        const change = price - prevClose;
        const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0;

        // Format volume
        const vol = meta.regularMarketVolume || 0;
        const volStr = vol >= 10000000
          ? (vol / 10000000).toFixed(2) + ' Cr'
          : vol >= 100000
          ? (vol / 100000).toFixed(2) + ' L'
          : vol.toLocaleString('en-IN');

        setStockData({
          symbol: meta.symbol || cleanTicker,
          name: meta.shortName || meta.longName || cleanTicker.replace('.NS', '').replace('.BO', ''),
          price,
          change,
          changePercent,
          high: meta.regularMarketDayHigh || 0,
          low: meta.regularMarketDayLow || 0,
          open: meta.regularMarketOpen || 0,
          prevClose,
          volume: volStr,
          marketCap: '',
          currency: meta.currency || 'INR',
        });
      } catch (err) {
        console.error('Stock fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [ticker]);

  if (loading) {
    return (
      <div className="stock-live-widget stock-live-loading">
        <div className="stock-live-shimmer"></div>
        <span className="stock-live-loading-text">📊 {ticker} का live data load हो रहा है...</span>
      </div>
    );
  }

  if (error || !stockData) {
    return (
      <div className="stock-live-widget stock-live-error">
        <span className="stock-live-icon">📈</span>
        <span className="stock-live-ticker-name">{ticker}</span>
        <p className="stock-live-error-text">Live data currently unavailable. Try again later.</p>
      </div>
    );
  }

  const isPositive = stockData.change >= 0;
  const arrow = isPositive ? '▲' : '▼';
  const changeClass = isPositive ? 'stock-positive' : 'stock-negative';
  const currencySymbol = stockData.currency === 'INR' ? '₹' : '$';

  return (
    <div className="stock-live-widget">
      {/* Header */}
      <div className="stock-live-header">
        <div className="stock-live-info">
          <span className="stock-live-icon">📈</span>
          <div>
            <span className="stock-live-name">{stockData.name}</span>
            <span className="stock-live-symbol">{stockData.symbol}</span>
          </div>
        </div>
        <span className="stock-live-badge">🟢 LIVE</span>
      </div>

      {/* Price */}
      <div className="stock-live-price-row">
        <span className="stock-live-price">{currencySymbol}{stockData.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        <span className={`stock-live-change ${changeClass}`}>
          {arrow} {currencySymbol}{Math.abs(stockData.change).toFixed(2)} ({Math.abs(stockData.changePercent).toFixed(2)}%)
        </span>
      </div>

      {/* Details Grid */}
      <div className="stock-live-details">
        <div className="stock-live-detail">
          <span className="stock-live-detail-label">Open</span>
          <span className="stock-live-detail-value">{currencySymbol}{stockData.open.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="stock-live-detail">
          <span className="stock-live-detail-label">Prev Close</span>
          <span className="stock-live-detail-value">{currencySymbol}{stockData.prevClose.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="stock-live-detail">
          <span className="stock-live-detail-label">Day High</span>
          <span className="stock-live-detail-value stock-positive">{currencySymbol}{stockData.high.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="stock-live-detail">
          <span className="stock-live-detail-label">Day Low</span>
          <span className="stock-live-detail-value stock-negative">{currencySymbol}{stockData.low.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="stock-live-detail">
          <span className="stock-live-detail-label">Volume</span>
          <span className="stock-live-detail-value">{stockData.volume}</span>
        </div>
      </div>
    </div>
  );
};

export default StockLiveWidget;
