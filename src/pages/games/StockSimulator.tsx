import React, { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, RotateCcw, ArrowRight, ChevronRight, Minus } from 'lucide-react';

interface Stock {
  name: string;
  symbol: string;
  sector: string;
  price: number;
  basePrice: number;
  change: number;
}

interface Holding {
  symbol: string;
  qty: number;
  avgPrice: number;
}

const initialStocks: Stock[] = [
  { name: 'Reliance Digital', symbol: 'RELD', sector: 'Tech', price: 2450, basePrice: 2450, change: 0 },
  { name: 'Tata Motors Ltd', symbol: 'TATM', sector: 'Auto', price: 780, basePrice: 780, change: 0 },
  { name: 'HDFC Banking', symbol: 'HDFB', sector: 'Bank', price: 1650, basePrice: 1650, change: 0 },
  { name: 'Infosys Tech', symbol: 'INFT', sector: 'IT', price: 1420, basePrice: 1420, change: 0 },
  { name: 'Sun Pharma', symbol: 'SUNP', sector: 'Pharma', price: 1180, basePrice: 1180, change: 0 },
  { name: 'Adani Green', symbol: 'ADGR', sector: 'Energy', price: 1890, basePrice: 1890, change: 0 },
  { name: 'ITC Limited', symbol: 'ITCL', sector: 'FMCG', price: 440, basePrice: 440, change: 0 },
  { name: 'Bajaj Finance', symbol: 'BAJF', sector: 'NBFC', price: 7200, basePrice: 7200, change: 0 },
  { name: 'Zomato Ltd', symbol: 'ZOMT', sector: 'Tech', price: 245, basePrice: 245, change: 0 },
  { name: 'Coal India', symbol: 'COAL', sector: 'Mining', price: 380, basePrice: 380, change: 0 },
];

const marketEvents = [
  { text: '📈 RBI cuts repo rate by 25 bps! Banking & real estate stocks surge.', sectors: ['Bank', 'NBFC'], impact: 8 },
  { text: '📉 Global recession fears! IT & Tech stocks face selling pressure.', sectors: ['IT', 'Tech'], impact: -12 },
  { text: '🛢️ Crude oil prices crash 15%. Auto & FMCG stocks rally.', sectors: ['Auto', 'FMCG'], impact: 7 },
  { text: '💊 New drug approval! Pharma sector sees a massive rally.', sectors: ['Pharma'], impact: 15 },
  { text: '⚡ Government announces green energy subsidies worth ₹50,000 Cr.', sectors: ['Energy'], impact: 12 },
  { text: '📊 Q3 results beat expectations. Broad market rally!', sectors: ['Bank', 'IT', 'Auto', 'FMCG'], impact: 5 },
  { text: '😱 FII sell-off! Foreign investors pull out ₹10,000 Cr.', sectors: ['Bank', 'NBFC', 'IT'], impact: -9 },
  { text: '🎉 Budget 2026: Tax relief for middle class. Consumer stocks boom!', sectors: ['FMCG', 'Auto'], impact: 10 },
  { text: '⚠️ Adani controversy returns. Conglomerate stocks volatile.', sectors: ['Energy', 'Mining'], impact: -14 },
  { text: '🚀 AI boom! Tech companies report massive order books.', sectors: ['IT', 'Tech'], impact: 11 },
  { text: '🏦 HDFC merger benefits kick in. Banking sector outperforms.', sectors: ['Bank'], impact: 9 },
  { text: '📉 Rupee falls to 88/$. Export-focused IT stocks benefit.', sectors: ['IT'], impact: 6 },
  { text: '🔥 Zomato-Blinkit synergy drives massive growth.', sectors: ['Tech'], impact: 18 },
  { text: '⛏️ Coal India wins major new mine allocation.', sectors: ['Mining'], impact: 13 },
  { text: '📉 Market correction! Nifty drops 3% in a single day.', sectors: ['Bank', 'IT', 'Auto', 'FMCG', 'Tech', 'Energy', 'Pharma', 'NBFC', 'Mining'], impact: -6 },
];

const INITIAL_CASH = 1000000;
const TOTAL_DAYS = 30;

const StockSimulator: React.FC = () => {
  const [cash, setCash] = useState(INITIAL_CASH);
  const [day, setDay] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>(initialStocks.map(s => ({ ...s })));
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [currentEvent, setCurrentEvent] = useState('🔔 Market opens! Start trading to build your portfolio.');
  const [gameOver, setGameOver] = useState(false);
  const [buyQty, setBuyQty] = useState<{ [key: string]: number }>({});

  const portfolioValue = useMemo(() => {
    return holdings.reduce((total, h) => {
      const stock = stocks.find(s => s.symbol === h.symbol);
      return total + (stock ? stock.price * h.qty : 0);
    }, 0);
  }, [holdings, stocks]);

  const totalValue = cash + portfolioValue;
  const returnPct = ((totalValue - INITIAL_CASH) / INITIAL_CASH * 100).toFixed(1);

  const buyStock = (symbol: string) => {
    const qty = buyQty[symbol] || 1;
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock || cash < stock.price * qty) return;

    setCash(prev => prev - stock.price * qty);
    setHoldings(prev => {
      const existing = prev.find(h => h.symbol === symbol);
      if (existing) {
        const totalQty = existing.qty + qty;
        const newAvg = ((existing.avgPrice * existing.qty) + (stock.price * qty)) / totalQty;
        return prev.map(h => h.symbol === symbol ? { ...h, qty: totalQty, avgPrice: newAvg } : h);
      }
      return [...prev, { symbol, qty, avgPrice: stock.price }];
    });
  };

  const sellStock = (symbol: string) => {
    const holding = holdings.find(h => h.symbol === symbol);
    const stock = stocks.find(s => s.symbol === symbol);
    if (!holding || !stock) return;

    setCash(prev => prev + stock.price * holding.qty);
    setHoldings(prev => prev.filter(h => h.symbol !== symbol));
  };

  const nextDay = useCallback(() => {
    if (day >= TOTAL_DAYS) {
      setGameOver(true);
      return;
    }

    const event = marketEvents[Math.floor(Math.random() * marketEvents.length)];
    setCurrentEvent(event.text);

    setStocks(prev => prev.map(stock => {
      const isAffected = event.sectors.includes(stock.sector);
      const baseChange = isAffected ? event.impact : (Math.random() - 0.5) * 6;
      const randomness = (Math.random() - 0.5) * 4;
      const totalChange = baseChange + randomness;
      const changePct = totalChange / 100;
      const newPrice = Math.max(10, Math.round(stock.price * (1 + changePct)));
      const change = ((newPrice - stock.price) / stock.price) * 100;
      return { ...stock, price: newPrice, change: Math.round(change * 100) / 100 };
    }));

    setDay(prev => prev + 1);
  }, [day]);

  const resetGame = () => {
    setCash(INITIAL_CASH);
    setDay(1);
    setStocks(initialStocks.map(s => ({ ...s })));
    setHoldings([]);
    setCurrentEvent('🔔 Market opens! Start trading.');
    setGameOver(false);
    setBuyQty({});
  };

  const getGrade = () => {
    const ret = parseFloat(returnPct);
    if (ret >= 20) return { grade: 'A+', emoji: '🏆', title: 'Warren Buffett Level!' };
    if (ret >= 10) return { grade: 'A', emoji: '⭐', title: 'Ace Trader!' };
    if (ret >= 0) return { grade: 'B', emoji: '👍', title: 'Profitable!' };
    if (ret >= -10) return { grade: 'C', emoji: '😬', title: 'Small Loss' };
    return { grade: 'D', emoji: '📉', title: 'Market Ate Your Money!' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-20 pb-16">
      <Helmet>
        <title>Stock Market Simulator - Free Trading Game | MoneyCal</title>
        <meta name="description" content="Play the Stock Market Simulator: start with ₹10 Lakh, buy & sell stocks, react to market events. Free investing game - no real money needed!" />
        <link rel="canonical" href="https://moneycal.in/games/stock-simulator" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6">
          <Link to="/games" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-3 font-medium">← Back to Games</Link>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">📈 Stock Market Simulator</h1>
          <p className="text-slate-600">₹10 लाख से शुरू करो, 30 दिनों में पोर्टफोलियो बढ़ाओ! | Grow ₹10L in 30 days!</p>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
            <p className="text-xs text-slate-500">Day</p>
            <p className="text-xl font-black">{day}/{TOTAL_DAYS}</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-green-200 text-center">
            <p className="text-xs text-green-600">Cash</p>
            <p className="text-xl font-black text-green-600">₹{cash.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-blue-200 text-center">
            <p className="text-xs text-blue-600">Portfolio</p>
            <p className="text-xl font-black text-blue-600">₹{portfolioValue.toLocaleString('en-IN')}</p>
          </div>
          <div className={`bg-white rounded-xl p-3 border text-center ${parseFloat(returnPct) >= 0 ? 'border-emerald-200' : 'border-red-200'}`}>
            <p className="text-xs text-slate-500">Return</p>
            <p className={`text-xl font-black ${parseFloat(returnPct) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{returnPct}%</p>
          </div>
        </div>

        {/* Event Banner */}
        <div className="bg-slate-900 text-white rounded-xl px-4 py-3 mb-4 text-sm font-medium">
          {currentEvent}
        </div>

        {!gameOver ? (
          <>
            {/* Stock Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-3 font-bold text-slate-700">Stock</th>
                      <th className="text-right px-3 py-3 font-bold text-slate-700">Price</th>
                      <th className="text-right px-3 py-3 font-bold text-slate-700">Change</th>
                      <th className="text-center px-3 py-3 font-bold text-slate-700">Qty</th>
                      <th className="text-center px-3 py-3 font-bold text-slate-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map(stock => {
                      const holding = holdings.find(h => h.symbol === stock.symbol);
                      return (
                        <tr key={stock.symbol} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <p className="font-bold text-slate-900">{stock.symbol}</p>
                            <p className="text-xs text-slate-500">{stock.name}</p>
                          </td>
                          <td className="text-right px-3 py-3 font-bold text-slate-900">₹{stock.price.toLocaleString('en-IN')}</td>
                          <td className={`text-right px-3 py-3 font-bold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <span className="flex items-center justify-end gap-0.5">
                              {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                            </span>
                          </td>
                          <td className="text-center px-3 py-3">
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={buyQty[stock.symbol] || 1}
                              onChange={(e) => setBuyQty(prev => ({ ...prev, [stock.symbol]: Math.max(1, parseInt(e.target.value) || 1) }))}
                              className="w-14 text-center border border-slate-300 rounded-lg py-1 text-sm"
                            />
                          </td>
                          <td className="text-center px-3 py-3">
                            <div className="flex gap-1 justify-center">
                              <button
                                onClick={() => buyStock(stock.symbol)}
                                disabled={cash < stock.price * (buyQty[stock.symbol] || 1)}
                                className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                Buy
                              </button>
                              {holding && (
                                <button
                                  onClick={() => sellStock(stock.symbol)}
                                  className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                                >
                                  Sell {holding.qty}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={nextDay}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-4 rounded-2xl text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Next Day → (Day {day + 1})
            </button>
          </>
        ) : (
          /* Game Over */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-center">
              <p className="text-6xl mb-4">{getGrade().emoji}</p>
              <h2 className="text-3xl font-black text-white mb-2">{getGrade().title}</h2>
              <p className="text-5xl font-black text-white mt-4">₹{totalValue.toLocaleString('en-IN')}</p>
              <p className="text-blue-200 mt-2">Return: {returnPct}% | Grade: {getGrade().grade}</p>
            </div>
            <div className="p-8 flex gap-3">
              <button onClick={resetGame} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-2xl hover:bg-blue-700">
                <RotateCcw className="w-5 h-5" /> Play Again
              </button>
              <Link to="/games" className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-800 font-bold py-3 rounded-2xl hover:bg-slate-300">
                More Games <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {/* SEO FAQ */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800">Is this a real trading platform?</h3>
              <p className="text-sm text-slate-600 mt-1">No! This is a 100% free simulator. No real money is involved. It's designed to teach stock market basics through gameplay.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">How does the stock price change?</h3>
              <p className="text-sm text-slate-600 mt-1">Prices change based on random market events (like RBI rate cuts, earnings reports) that affect specific sectors, similar to how real markets work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockSimulator;
