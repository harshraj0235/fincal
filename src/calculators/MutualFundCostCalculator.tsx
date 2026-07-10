import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { getCalculatorById } from '../data/calculatorData';

export const MutualFundCostCalculator: React.FC = () => {
  // Core Variables
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(15);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [expenseRatio, setExpenseRatio] = useState<number>(1.5);
  const [exitLoad, setExitLoad] = useState<number>(0);

  // Results
  const [grossValue, setGrossValue] = useState<number>(0);
  const [netValue, setNetValue] = useState<number>(0);
  const [totalInv, setTotalInv] = useState<number>(0);
  const [wealthLost, setWealthLost] = useState<number>(0);
  const [wealthLostPercent, setWealthLostPercent] = useState<number>(0);

  useEffect(() => {
    let gValue = 0; 
    let nValue = 0; 
    let tInv = 0;
    
    const grossRate = expectedReturn / 100;
    const netRate = (expectedReturn - expenseRatio) / 100;
    const t = investmentPeriod || 0;
    const p = investmentAmount || 0;

    if (investmentType === 'sip') {
      const gMonthly = grossRate / 12;
      const nMonthly = netRate / 12;
      const months = t * 12;
      
      if (gMonthly > 0) {
        gValue = p * ((Math.pow(1 + gMonthly, months) - 1) / gMonthly) * (1 + gMonthly);
      } else {
        gValue = p * months;
      }

      if (nMonthly > 0) {
        nValue = p * ((Math.pow(1 + nMonthly, months) - 1) / nMonthly) * (1 + nMonthly);
      } else {
        nValue = p * months;
      }
      
      tInv = p * months;
    } else {
      gValue = p * Math.pow(1 + grossRate, t);
      nValue = p * Math.pow(1 + netRate, t);
      tInv = p;
    }
    
    const finalNet = nValue;
    
    const lost = gValue - finalNet;
    const lostPercent = (gValue - tInv) > 0 ? (lost / (gValue - tInv)) * 100 : 0;

    setGrossValue(gValue);
    setNetValue(finalNet);
    setTotalInv(tInv);
    setWealthLost(lost);
    setWealthLostPercent(lostPercent);
  }, [investmentType, investmentAmount, investmentPeriod, expectedReturn, expenseRatio, exitLoad]);

  const calculatorData = getCalculatorById('mutual-fund-cost-calculator');
  const finalContentData = typeof calculatorData?.info === 'object' && !Array.isArray(calculatorData.info) ? calculatorData.info : null;

  const donutOffset = useMemo(() => {
    const ratio = Math.max(0, netValue - totalInv) / (grossValue - totalInv || 1);
    // This is complex for a donut, let's simplify: 
    // Segment 1: Profit Kept (Green/Amber), Segment 2: Fees Lost (Red)
    return 251.2 * (1 - ratio);
  }, [grossValue, netValue, totalInv]);

  return (
    <>

      <style>{`
        .cost-premium { font-family: 'Inter', sans-serif; background-color: #19120e; color: #efdfd8; }
        .cost-glass { background: rgba(60, 51, 46, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4); border-radius: 2rem; }
        .cost-hero { background: linear-gradient(180deg, #19120e 0%, #211a16 100%); border-bottom: 1px solid rgba(251, 191, 36, 0.1); }
        .cost-slider { -webkit-appearance: none; width: 100%; height: 6px; background: #3c332e; border-radius: 9999px; outline: none; }
        .cost-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #fbbf24; border: 4px solid #19120e; cursor: pointer; transition: all 0.2s; box-shadow: 0 0 15px rgba(251, 191, 36, 0.4); }
        .cost-slider::-webkit-slider-thumb:hover { transform: scale(1.15); box-shadow: 0 0 20px rgba(251, 191, 36, 0.6); }
        .cost-input { width: 100%; padding: 12px 16px; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; font-size: 16px; font-weight: 700; color: #fbbf24; background: rgba(0,0,0,0.3); outline: none; transition: border 0.3s; text-align: right; }
        .cost-input:focus { border-color: #fbbf24; }
        .donut-segment { transition: stroke-dashoffset 0.6s ease; }
      `}</style>

      <div className="cost-premium pb-24 md:pb-0 min-h-screen">
        
        {/* Navigation Breadcrumbs */}
        <div className="pt-6 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
            <nav className="flex items-center gap-2 mb-8 text-xs font-semibold tracking-widest uppercase text-amber-300/60">
                <Link to="/" className="hover:text-amber-200 transition-colors">Home</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <Link to="/calculators" className="hover:text-amber-200 transition-colors">Calculators</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-amber-200">Mutual Fund Cost</span>
            </nav>
        </div>

        {/* Hero Header */}
        <section className="cost-hero pt-4 pb-20 px-6 md:px-12 text-center relative overflow-hidden -mt-20">
            <div className="absolute top-0 -left-24 w-96 h-96 bg-[#fbbf24]/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="mt-20 relative z-10">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-on-surface mb-4">
                  Mutual Fund <span className="text-primary-container">Cost 2026</span>
              </h1>
              <p className="text-on-surface-variant max-w-xl mx-auto mb-8 font-medium">The Hidden Fee Analyzer. Uncover the true impact of wealth erosion.</p>
              
              <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-200 flex items-center gap-2">
                     <span className="material-symbols-outlined text-[16px]">info</span> Fee Transparency
                  </span>
                  <span className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-200 flex items-center gap-2">
                     <span className="material-symbols-outlined text-[16px]">verified</span> Actuarial Precise
                  </span>
              </div>
            </div>
        </section>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto -mt-10 px-4 md:px-8 pb-32 relative z-20">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT COLUMN: Input Section */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="cost-glass p-8 rounded-[2rem]">
                        <div className="flex items-center justify-between p-2 bg-surface-container-low rounded-full w-fit mb-12 border border-white/5">
                            <button 
                                onClick={() => setInvestmentType('sip')}
                                className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${investmentType === 'sip' ? 'bg-[#fbbf24] text-[#402d00] shadow-lg shadow-primary-container/20' : 'text-zinc-500'}`}
                            >SIP</button>
                            <button 
                                onClick={() => setInvestmentType('lumpsum')}
                                className={`px-8 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${investmentType === 'lumpsum' ? 'bg-[#fbbf24] text-[#402d00] shadow-lg shadow-primary-container/20' : 'text-zinc-500'}`}
                            >LUMP SUM</button>
                        </div>

                        {/* Main Inputs */}
                        <div className="space-y-10">
                            
                            {/* Amount */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Investment Amount</label>
                                    <div className="relative max-w-[200px]">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 font-bold">₹</span>
                                        <input 
                                          className="cost-input !pl-8" 
                                          type="text" 
                                          value={investmentAmount.toLocaleString('en-IN')}
                                          onChange={(e) => {
                                             const val = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                                             if(!isNaN(val)) setInvestmentAmount(val);
                                          }}
                                        />
                                    </div>
                                </div>
                                <input className="cost-slider" type="range" min={investmentType === 'sip' ? 500 : 5000} max={investmentType === 'sip' ? 500000 : 10000000} step={investmentType === 'sip' ? 500 : 5000} value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))}/>
                            </div>

                            {/* Gross Return */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Gross Return (Before Fees)</label>
                                    <div className="relative max-w-[120px]">
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 font-bold">%</span>
                                        <input 
                                          className="cost-input !pr-10" 
                                          type="text" 
                                          value={expectedReturn}
                                          onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <input className="cost-slider" type="range" min="1" max="30" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}/>
                            </div>

                            {/* Tenure */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Investment Period</label>
                                    <div className="relative max-w-[120px]">
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-400 font-bold">Yr</span>
                                        <input 
                                          className="cost-input !pr-10" 
                                          type="text" 
                                          value={investmentPeriod}
                                          onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <input className="cost-slider" type="range" min="1" max="50" step="1" value={investmentPeriod} onChange={(e) => setInvestmentPeriod(Number(e.target.value))}/>
                            </div>

                            {/* Costs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-amber-300 uppercase tracking-widest">Expense Ratio (TER %)</label>
                                    <div className="bg-surface-container-high rounded-2xl p-4 flex items-center justify-between border border-white/5">
                                        <input 
                                            className="bg-transparent border-none text-2xl font-black text-[#fbbf24] focus:ring-0 w-full outline-none" 
                                            type="number" 
                                            step="0.01"
                                            value={expenseRatio}
                                            onChange={(e) => setExpenseRatio(Number(e.target.value))}
                                        />
                                        <span className="text-on-surface-variant">%</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-amber-300 uppercase tracking-widest">Exit Load (%)</label>
                                    <div className="bg-surface-container-high rounded-2xl p-4 flex items-center justify-between border border-white/5">
                                        <input 
                                            className="bg-transparent border-none text-2xl font-black text-[#fbbf24] focus:ring-0 w-full outline-none" 
                                            type="number" 
                                            step="0.01"
                                            value={exitLoad}
                                            onChange={(e) => setExitLoad(Number(e.target.value))}
                                        />
                                        <span className="text-on-surface-variant">%</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Results Section */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="cost-glass p-8 rounded-[2rem] sticky top-24 border-primary-container/20 overflow-hidden">
                        
                        <div className="text-center mb-10">
                            <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4 block">Estimated Net Value</label>
                            <p className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                               <span className="text-2xl font-light scale-75 inline-block mr-1">₹</span>
                               {Math.round(netValue).toLocaleString('en-IN')}
                            </p>
                        </div>

                        {/* Visual Chart (Donut SVG) */}
                        <div className="relative flex items-center justify-center mb-10">
                            <svg className="w-56 h-56 transform -rotate-90">
                              <circle cx="112" cy="112" r="90" fill="none" stroke="#3c332e" strokeWidth="16" />
                              <circle 
                                cx="112" 
                                cy="112" 
                                r="90" 
                                fill="none" 
                                stroke="#fbbf24" 
                                strokeWidth="16" 
                                strokeDasharray="565.48" 
                                strokeDashoffset={donutOffset / 251.2 * 565.48} 
                                className="donut-segment"
                              />
                              <circle 
                                cx="112" 
                                cy="112" 
                                r="90" 
                                fill="none" 
                                stroke="#ffb4ab" 
                                strokeWidth="16" 
                                strokeDasharray="565.48" 
                                strokeDashoffset={565.48 * (1 - (wealthLostPercent/100))} 
                                strokeLinecap="round"
                                className="donut-segment opacity-80"
                                transform={`rotate(${donutOffset / 251.2 * 360} 112 112)`} 
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-2xl font-black text-[#ffb4ab]">{wealthLostPercent.toFixed(1)}%</span>
                                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Eaten by Fees</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center p-4 rounded-xl bg-surface-container-low border border-white/5">
                                <span className="text-xs font-bold text-on-surface-variant">Wealth Lost to Fees</span>
                                <span className="text-lg font-bold text-[#ffb4ab]">- ₹ {Math.round(wealthLost).toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-xl bg-surface-container-low border border-white/5">
                                <span className="text-xs font-bold text-on-surface-variant">Net Profit Kept</span>
                                <span className="text-lg font-bold text-primary-container">₹ {Math.round(netValue - totalInv).toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <button 
                          onClick={() => window.print()}
                          className="w-full py-5 rounded-[20px] bg-[#fbbf24] text-[#402d00] font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary-container/20 flex items-center justify-center gap-3 active:scale-95 duration-200 transition-all"
                        >
                            <span className="material-symbols-outlined">description</span>
                            Transparency Report
                        </button>
                        
                    </div>
                </div>
            </div>
            
        </div>
        
        {/* SEO Data Container */}
        <div className="mt-16 bg-[#ffffff] text-slate-900 rounded-t-[40px] pt-12 pb-12 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative z-30 text-left">
          <div className="max-w-6xl mx-auto px-6">
            {finalContentData && <CalculatorContentWrapper {...finalContentData} />}
          </div>
        </div>

      </div>
    </>
  );
};
