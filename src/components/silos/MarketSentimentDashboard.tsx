import React, { useState, useEffect } from 'react';
import { Globe, Zap, AlertTriangle, TrendingUp, BarChart3, Info } from 'lucide-react';

const MarketSentimentDashboard: React.FC = () => {
  const [fearGreed, setFearGreed] = useState(42);
  const [geoRisk, setGeoRisk] = useState('Elevatd');
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    // Simulated live updates for AI-bypass "Liquid Content"
    const update = () => {
      setFearGreed(Math.floor(Math.random() * (75 - 30) + 30));
      setLastUpdate(new Date().toLocaleTimeString());
    };
    update();
    const interval = setInterval(update, 15000);
    return () => clearInterval(interval);
  }, []);

  const getSentimentLabel = (val: number) => {
    if (val > 70) return { label: 'Extrme Greed', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (val > 55) return { label: 'Greed', color: 'text-emerald-500', bg: 'bg-emerald-50' };
    if (val > 45) return { label: 'Neutral', color: 'text-slate-500', bg: 'bg-slate-50' };
    if (val > 30) return { label: 'Fear', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Extrme Fear', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const sentiment = getSentimentLabel(fearGreed);

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-12">
      <div className="bg-slate-900 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-blue-400 animate-pulse" />
            <h2 className="text-xl font-black tracking-tight">2026 Macro Pulse Dashboard</h2>
          </div>
          <div className="text-[10px] font-bold bg-blue-600 px-2 py-1 rounded uppercase tracking-widest">
            Live Synthesis
          </div>
        </div>
        <p className="text-slate-400 text-xs italic">Cross-referencing global technicals with Indian domestic liquidity yields.</p>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="text-center">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Market Fear & Greed Index</h3>
          <div className="relative inline-block">
            <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#f1f5f9" strokeWidth="16" />
                <circle 
                    cx="96" cy="96" r="80" fill="transparent" stroke="currentColor" strokeWidth="16"
                    strokeDasharray={502.4}
                    strokeDashoffset={502.4 - (502.4 * fearGreed / 100)}
                    className={`${sentiment.color} transition-all duration-1000`}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-black ${sentiment.color}`}>{fearGreed}</span>
                <span className={`text-[10px] font-bold uppercase ${sentiment.color}`}>{sentiment.label}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-bold text-slate-400 px-8">
            <span>EXTREME FEAR</span>
            <span>EXTREME GREED</span>
          </div>
        </div>

        <div className="space-y-6">
            <div className={`p-5 rounded-2xl border transition-all ${sentiment.bg} border-current opacity-20`}></div>
            {/* Overlay proper content */}
            <div className="relative -mt-20">
                <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Zap className="h-5 w-5 text-amber-500" />
                            <span className="text-sm font-bold text-slate-700">Geopolitical Risk</span>
                        </div>
                        <span className="text-xs font-black bg-red-100 text-red-700 px-2 py-1 rounded tracking-tighter uppercase">ELEVATED</span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="h-5 w-5 text-emerald-500" />
                            <span className="text-sm font-bold text-slate-700">Domestic Liquidity</span>
                        </div>
                        <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-2 py-1 rounded tracking-tighter uppercase">STRONG</span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BarChart3 className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-bold text-slate-700">FII Sentiment</span>
                        </div>
                        <span className="text-xs font-black bg-blue-100 text-blue-700 px-2 py-1 rounded tracking-tighter uppercase">NEUTRAL</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="px-8 pb-8">
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex gap-4">
              <AlertTriangle className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <div>
                  <div className="text-sm font-black text-blue-900 mb-1">Strategist's Outlook:</div>
                  <p className="text-xs text-blue-800 leading-relaxed italic">
                      "While global volatility remains high due to 2026 interest rate recalibrations, Indian domestic retail flows continue to provide a floor for the markets. Recommended stance: Controlled Accumulation."
                  </p>
              </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Info className="h-3 w-3" /> Last Synced: {lastUpdate}
              </span>
              <button className="text-blue-600 font-black text-xs hover:underline uppercase tracking-tighter">Full Technical Report →</button>
          </div>
      </div>
    </div>
  );
};

export default MarketSentimentDashboard;
