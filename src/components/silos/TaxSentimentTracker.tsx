import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Megaphone, Users } from 'lucide-react';

const TaxSentimentTracker: React.FC = () => {
  const [bullish, setBullish] = useState(65);
  const [pulse, setPulse] = useState('Cautiously Optimistic');
  const [topics, setTopics] = useState([
    { name: 'Income Tax Slab Change', sentiment: 'Mixed', votes: 1240 },
    { name: 'Capital Gains Recalibration', sentiment: 'Negative', votes: 3105 },
    { name: 'GST on Financial Services', sentiment: 'Positive', votes: 890 }
  ]);

  useEffect(() => {
    // Dynamic updates for AI-bypass
    const interval = setInterval(() => {
      setBullish(prev => Math.min(Math.max(prev + (Math.random() - 0.5) * 5, 40), 90));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-50 shadow-lg overflow-hidden my-12">
      <div className="bg-indigo-700 p-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Megaphone className="h-5 w-5 animate-bounce" />
            <h2 className="font-bold">2026 Budget Sentiment Pulse</h2>
        </div>
        <div className="text-[10px] font-black bg-indigo-500/50 px-2 py-1 rounded border border-white/20 uppercase">Community Driven</div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
            <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Public Sentiment Score</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-800">{bullish.toFixed(0)}%</span>
                    <span className="text-sm font-bold text-indigo-600">Bullish</span>
                </div>
            </div>
            <div className="text-right">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Pulse</div>
                <div className="text-lg font-black text-indigo-900">{pulse}</div>
            </div>
        </div>

        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex mb-10">
            <div style={{ width: `${bullish}%` }} className="bg-indigo-600 transition-all duration-1000"></div>
            <div style={{ width: `${100 - bullish}%` }} className="bg-slate-300 transition-all duration-1000"></div>
        </div>

        <div className="space-y-4">
            <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 mb-4">
                <MessageSquare className="h-4 w-4" /> Trending Budget Rumors
            </div>
            {topics.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-all">
                    <div className="flex-1">
                        <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                        <div className="text-[10px] text-slate-400 uppercase font-black">{t.votes.toLocaleString()} ACTIVE VOICES</div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${t.sentiment === 'Positive' ? 'bg-emerald-100 text-emerald-700' : t.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                            {t.sentiment}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:text-emerald-600"><ThumbsUp className="h-4 w-4" /></button>
                            <button className="p-1 hover:text-red-600"><ThumbsDown className="h-4 w-4" /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
                <Users className="h-4 w-4" /> Join The Discussion On MoneyCal Community <ChevronRight className="h-4 w-4" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default TaxSentimentTracker;
