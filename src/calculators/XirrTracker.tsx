import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, Trash2, TrendingUp, Download, RefreshCw, History, ShieldCheck, Info } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { getCalculatorById } from '../data/calculatorData';

interface CashFlow {
  id: string;
  date: string;
  amount: number;
  type: 'investment' | 'redemption';
}

export const XirrTracker: React.FC = () => {
  const calculatorData = getCalculatorById('xirr-tracker');
  const contentData = (calculatorData?.info && typeof calculatorData.info === 'object' && !Array.isArray(calculatorData.info)) ? calculatorData.info : null;

  const [cashFlows, setCashFlows] = useState<CashFlow[]>([
    { id: '1', date: '2023-01-15', amount: 125000, type: 'investment' },
    { id: '2', date: '2024-03-22', amount: 45000, type: 'investment' },
    { id: '3', date: '2025-06-10', amount: 20000, type: 'redemption' },
  ]);
  const [currentValue, setCurrentValue] = useState<number>(245000);
  
  const [xirrValue, setXirrValue] = useState<number | null>(null);
  const [absoluteGain, setAbsoluteGain] = useState<number>(0);
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [totalRedeemed, setTotalRedeemed] = useState<number>(0);
  const [horizon, setHorizon] = useState<number>(0);

  // Newton-Raphson implementation for XIRR
  const calculateXirrInternal = (flows: { date: Date, amount: number }[]) => {
    const xnpv = (rate: number) => {
      return flows.reduce((acc, flow) => {
        const time = (flow.date.getTime() - flows[0].date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
        return acc + flow.amount / Math.pow(1 + rate, time);
      }, 0);
    };

    const xnpvDeriv = (rate: number) => {
      return flows.reduce((acc, flow) => {
        const time = (flow.date.getTime() - flows[0].date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
        return acc - time * flow.amount / Math.pow(1 + rate, time + 1);
      }, 0);
    };

    let rate = 0.1; // Initial guess
    for (let i = 0; i < 50; i++) {
      const fv = xnpv(rate);
      const dfv = xnpvDeriv(rate);
      if (Math.abs(dfv) < 1e-10) break;
      const newRate = rate - fv / dfv;
      if (Math.abs(newRate - rate) < 0.00001) return newRate * 100;
      rate = newRate;
    }
    return rate * 100;
  };

  useEffect(() => {
    if (cashFlows.length === 0) return;

    const sorted = [...cashFlows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Convert to calculation format (investments are negative outflows, current value is positive inflow)
    const calcFlows = sorted.map(cf => ({
      date: new Date(cf.date),
      amount: cf.type === 'investment' ? -cf.amount : cf.amount
    }));
    
    // Add current terminal value as a positive inflow today
    const now = new Date();
    calcFlows.push({ date: now, amount: currentValue });

    const xirr = calculateXirrInternal(calcFlows);
    
    let invested = 0;
    let redeemed = 0;
    sorted.forEach(cf => {
      if (cf.type === 'investment') invested += cf.amount;
      else redeemed += cf.amount;
    });

    const gain = (currentValue + redeemed) - invested;
    const firstDate = new Date(sorted[0].date);
    const years = (now.getTime() - firstDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);

    setXirrValue(xirr);
    setAbsoluteGain(gain);
    setTotalInvested(invested);
    setTotalRedeemed(redeemed);
    setHorizon(years);
  }, [cashFlows, currentValue]);

  const addTransaction = () => {
    const today = new Date().toISOString().split('T')[0];
    setCashFlows([...cashFlows, { id: Date.now().toString(), date: today, amount: 0, type: 'investment' }]);
  };

  const removeTransaction = (id: string) => {
    setCashFlows(cashFlows.filter(cf => cf.id !== id));
  };

  const updateTransaction = (id: string, field: keyof CashFlow, value: any) => {
    setCashFlows(cashFlows.map(cf => cf.id === id ? { ...cf, [field]: value } : cf));
  };

  const loadSample = () => {
    const today = new Date();
    const subYears = (y: number) => new Date(today.getFullYear() - y, today.getMonth(), 15).toISOString().split('T')[0];
    setCashFlows([
      { id: 's1', date: subYears(3), amount: 100000, type: 'investment' },
      { id: 's2', date: subYears(2), amount: 50000, type: 'investment' },
      { id: 's3', date: subYears(1), amount: 30000, type: 'redemption' },
    ]);
    setCurrentValue(185000);
  };

  const clearAll = () => {
    setCashFlows([]);
    setCurrentValue(0);
    setXirrValue(null);
  };

  return (
    <div className="xirr-premium pb-24 md:pb-0 min-h-screen">
      <style>{`
        .xirr-premium { font-family: 'Inter', sans-serif; background-color: #0b1326; color: #dae2fd; }
        .xirr-glass { background: rgba(17, 13, 35, 0.4); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4); border-radius: 2rem; }
        .xirr-hero { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%); border-bottom: 1px solid rgba(192, 193, 255, 0.1); }
        .xirr-input { width: 100%; padding: 10px 14px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; font-size: 14px; font-weight: 700; color: #fff; background: rgba(0, 0, 0, 0.3); outline: none; transition: all 0.3s; }
        .xirr-input:focus { border-color: #c0c1ff; box-shadow: 0 0 10px rgba(192, 193, 255, 0.2); }
        .xirr-btn-primary { background: linear-gradient(to right, #6366f1, #4f46e5); color: white; font-weight: 800; border-radius: 9999px; transition: all 0.3s; }
        .xirr-btn-primary:hover { transform: scale(1.02); box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
        .glass-text { background: linear-gradient(to bottom right, #fff 30%, rgba(255,255,255,0.4) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
        
        {/* Breadcrumbs */}
        <div className="pt-6 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-xs font-semibold tracking-widest uppercase text-indigo-300/60">
                <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
                <span className="text-[10px]">/</span>
                <Link to="/calculators" className="hover:text-indigo-200 transition-colors">Calculators</Link>
                <span className="text-[10px]">/</span>
                <span className="text-indigo-200">XIRR Tracker</span>
            </nav>
        </div>

        {/* Hero Section */}
        <section className="xirr-hero pt-4 pb-24 px-6 md:px-12 rounded-b-[40px] relative overflow-hidden -mt-20">
            <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[130px] rounded-full"></div>
            <div className="max-w-7xl mx-auto pt-24 text-center md:text-left">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-4 leading-none">
                  XIRR <span className="text-indigo-300">Tracker 2026</span>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200/60 font-medium max-w-xl">
                  The Precision Timing Engine for Irregular Cash Flows.
              </p>
            </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto -mt-12 px-4 md:px-8 pb-32 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Table Area */}
            <div className="lg:col-span-8 space-y-6">
              <div className="xirr-glass p-8">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-2xl">
                      <Calendar className="text-indigo-400 w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Cash Flow Log</h3>
                  </div>
                  <button 
                    onClick={addTransaction}
                    className="flex items-center gap-2 py-3 px-6 bg-white/5 hover:bg-white/10 text-indigo-200 font-bold rounded-full border border-white/5 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Transaction
                  </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 mb-4 text-[10px] font-black text-indigo-300/40 uppercase tracking-[0.2em] border-b border-white/5">
                  <div className="col-span-4">Date</div>
                  <div className="col-span-3">Amount (₹)</div>
                  <div className="col-span-3 text-center">Type</div>
                  <div className="col-span-2 text-right">Delete</div>
                </div>

                {/* Rows */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                  {cashFlows.map(cf => (
                    <div key={cf.id} className="grid grid-cols-12 gap-4 items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/5 transition-all group">
                      <div className="col-span-4">
                        <input 
                          type="date" 
                          className="xirr-input !bg-transparent !border-transparent hover:!border-white/20" 
                          value={cf.date}
                          onChange={(e) => updateTransaction(cf.id, 'date', e.target.value)}
                        />
                      </div>
                      <div className="col-span-3">
                        <input 
                          type="text" 
                          className="xirr-input !bg-transparent !border-transparent hover:!border-white/20" 
                          value={cf.amount.toLocaleString('en-IN')}
                          onChange={(e) => {
                            const val = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                            if(!isNaN(val)) updateTransaction(cf.id, 'amount', val);
                          }}
                        />
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <button 
                          onClick={() => updateTransaction(cf.id, 'type', cf.type === 'investment' ? 'redemption' : 'investment')}
                          className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter border transition-all ${cf.type === 'investment' ? 'bg-indigo-500/20 text-indigo-200 border-indigo-500/30' : 'bg-rose-500/20 text-rose-200 border-rose-500/30'}`}
                        >
                          {cf.type}
                        </button>
                      </div>
                      <div className="col-span-2 text-right">
                        <button 
                          onClick={() => removeTransaction(cf.id)}
                          className="p-2 text-white/20 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {cashFlows.length === 0 && <p className="text-center py-10 text-indigo-300/40 font-medium">No transactions added.</p>}
                </div>

                {/* Final Market Value */}
                <div className="mt-10 pt-10 border-t border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300/40 mb-2 block text-center md:text-left">Final Market Value</label>
                      <p className="text-sm text-indigo-200/50 mb-4 text-center md:text-left">The current total valuation of this portfolio.</p>
                    </div>
                    <div className="relative w-full md:w-72">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-400 font-bold">₹</span>
                      <input 
                        type="text" 
                        className="w-full bg-indigo-900/30 border-2 border-indigo-400/40 rounded-2xl pl-12 pr-6 py-4 text-2xl font-black text-white focus:outline-none focus:border-indigo-400/80 transition-all shadow-[0_0_30px_rgba(99,102,241,0.1)]"
                        value={currentValue.toLocaleString('en-IN')}
                        onChange={(e) => {
                          const val = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                          if(!isNaN(val)) setCurrentValue(val);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Method Note */}
              <div className="xirr-glass p-8 flex items-start gap-5">
                <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0" />
                <div>
                  <h4 className="font-bold mb-1">Newton-Raphson Verification</h4>
                  <p className="text-xs text-indigo-200/50 leading-relaxed">
                    Our tracker uses a precision iterative solver (Newton-Raphson) to find the internal rate of return for irregular periods. This is the industry standard used by banks and wealth management platforms for IRR reporting.
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Result Panel */}
            <div className="lg:col-span-4">
              <div className="xirr-glass p-8 sticky top-24 overflow-hidden border-indigo-400/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>
                
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300/40 mb-4">Annualized Returns</p>
                <div className="mb-10">
                  <span className="text-7xl font-black glass-text block mb-2">
                    {xirrValue ? xirrValue.toFixed(2) : '--'}
                    <span className="text-2xl font-light ml-1">%</span>
                  </span>
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Real-time XIRR Yield</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-10">
                  <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                    <p className="text-[9px] font-black text-indigo-300/40 uppercase mb-1">Absolute Gain</p>
                    <p className="text-[14px] font-bold text-white">₹{Math.round(absoluteGain).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                    <p className="text-[9px] font-black text-indigo-300/40 uppercase mb-1">Horizon</p>
                    <p className="text-[14px] font-bold text-white">{horizon.toFixed(1)} Yrs</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                    <p className="text-[9px] font-black text-indigo-300/40 uppercase mb-1">Total Invested</p>
                    <p className="text-[14px] font-bold text-indigo-300">₹{Math.round(totalInvested).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                    <p className="text-[9px] font-black text-indigo-300/40 uppercase mb-1">Redeemed</p>
                    <p className="text-[14px] font-bold text-rose-300">₹{Math.round(totalRedeemed).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => window.print()}
                    className="w-full xirr-btn-primary py-5 px-6 flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest font-black"
                  >
                    <ShieldCheck className="w-5 h-5" /> Generate Performance Audit
                  </button>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={loadSample} className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all">
                      <History className="w-4 h-4 text-indigo-300/60" />
                      <span className="text-[8px] font-bold uppercase tracking-tighter">Sample</span>
                    </button>
                    <button className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all">
                      <Download className="w-4 h-4 text-indigo-300/60" />
                      <span className="text-[8px] font-bold uppercase tracking-tighter">Export</span>
                    </button>
                    <button onClick={clearAll} className="bg-white/5 hover:bg-white/10 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all">
                      <RefreshCw className="w-4 h-4 text-indigo-300/60" />
                      <span className="text-[8px] font-bold uppercase tracking-tighter">Clear</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Content Section */}
      {contentData && (
        <div className="mt-16 bg-white text-slate-900 rounded-t-[40px] pt-12 pb-12 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative z-30">
          <div className="max-w-6xl mx-auto px-6">
            <CalculatorContentWrapper {...contentData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default XirrTracker;