import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

const QUICK_PRESETS = [
  { label: 'Moderate Goal (5 Yrs)', monthly: 10000, expected: 10.5, equity: 50, years: 5 },
  { label: 'Aggressive (10 Yrs)', monthly: 15000, expected: 12, equity: 75, years: 10 },
  { label: 'Safe Parking (3 Yrs)', monthly: 20000, expected: 7.5, equity: 15, years: 3 },
];

export const NpsTier2Calculator: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [existingBalance, setExistingBalance] = useState<number>(0);
  const [equityAllocation, setEquityAllocation] = useState<number>(50);
  const [expectedReturn, setExpectedReturn] = useState<number>(10.5);
  const [timePeriod, setTimePeriod] = useState<number>(5);

  const [activePreset, setActivePreset] = useState<number | null>(null);

  const calculations = useMemo(() => {
    let balance = existingBalance;
    const yearlyContribution = monthlyContribution * 12;
    let totalContrib = existingBalance;
    
    for (let year = 1; year <= timePeriod; year++) {
      totalContrib += yearlyContribution;
      balance += yearlyContribution;
      
      const equityReturns = balance * (equityAllocation / 100) * (expectedReturn / 100);
      const debtReturns = balance * ((100 - equityAllocation) / 100) * ((expectedReturn - 4) / 100);
      const totalReturns = equityReturns + debtReturns;
      
      balance += totalReturns;
    }
    
    const cagr = Math.pow(balance / Math.max(totalContrib, 1), 1 / Math.max(timePeriod, 1)) - 1;

    return {
      maturityAmount: balance,
      totalContribution: totalContrib,
      returnAmount: balance - totalContrib,
      effectiveCagr: cagr * 100
    };
  }, [monthlyContribution, existingBalance, equityAllocation, expectedReturn, timePeriod]);

  const applyPreset = (preset: typeof QUICK_PRESETS[0], index: number) => {
    setMonthlyContribution(preset.monthly);
    setExpectedReturn(preset.expected);
    setEquityAllocation(preset.equity);
    setTimePeriod(preset.years);
    setActivePreset(index);
  };

  const contentData = { title: 'NPS Tier 2 Calculator', description: 'Estimate NPS Tier 2 voluntary corpus projection. Flexible withdrawal planning, expected CAGR with equity allocation, and absolute returns.', benefits: ['100% Equity Allocation supported unlike Tier 1', 'No lock-in periods or restrictions like maturity age 60', 'Extremely low fund management charges (FMC)', 'Perfect for flexible parking and medium-term goals'], howToSteps: [{ step: 'Set Monthly Investment', details: 'Determine the voluntary amount to deposit into your Tier 2 account.' }, { step: 'Choose Allocation', details: 'Set Equity up to 100%. Debt typically returns ~4% less than Equity in this model.' }, { step: 'Investment Horizon', details: 'Because there is no lock-in, you can set short or long horizons (1 - 30 years).' }, { step: 'View Compounding Impact', details: 'Analyze the Effective CAGR compared to standard FDs or Mutual Funds.' }], examples: [], tips: ['Tier 2 has virtually the lowest expense ratios compared to standard mutual funds.', 'You can freely withdraw from Tier 2, but gains are taxed as per your slab (no tax-free exemption unlike Tier 1).'], mistakes: ['Confusing Tier 1 tax rules with Tier 2. Tier 2 does NOT provide the 80CCD(1B) benefit.', 'Using Aggressive 100% Equity for goals less than 3 years away.'], faqs: [{ question: 'Is NPS Tier 2 locked like Tier 1?', answer: 'No. Tier 2 is entirely flexible and allows unrestricted withdrawals at any time, functioning like an open-ended mutual fund.' }, { question: 'Does Tier 2 give tax benefits?', answer: 'Generally, no. Contributions to Tier 2 are not eligible for tax deductions under Section 80C or 80CCD(1B) (except for certain specific deductions available only to Central Govt employees with 3-year lock-in).' }], relatedCalculators: [{ name: 'NPS Calculator', url: '/calculators/nps-calculator', description: 'Plan retirement via Tier 1' }, { name: 'Mutual Fund Returns Calculator', url: '/calculators/mutual-fund-returns-calculator', description: 'Compare with mutual funds' }], lastUpdated: '2026-03-24' };

  return (
    <>
      <SEOHelmet title="NPS Tier 2 Calculator India 2026 | Voluntary Contribution Returns" description="Free NPS Tier 2 Calculator India. Project returns, calculate your effective CAGR, and plan your voluntary, highly flexible NPS withdrawals." keywords="nps tier 2 calculator, voluntary nps calculator india, nps tier 2 returns calculator, nps cagr calculator" url="/calculators/nps-tier2-calculator" faqData={contentData.faqs} calculatorData={{ name: 'NPS Tier 2 Calculator', description: 'Estimate flexible Tier 2 NPS returns.', category: 'Investment Calculators', features: ['Tier 2 Maturity', 'Equity Split model', 'Effective CAGR calculation'], ratingValue: 4.7, reviewCount: 11200, authorName: 'MoneyCal' }} />

      <style>{`
        .npst { font-family: 'Inter', sans-serif; }
        .npst-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .npst-hero { background: linear-gradient(135deg, #4338ca 0%, #4f46e5 30%, #6366f1 60%, #818cf8 100%); }
        .npst-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .npst-slider::-webkit-slider-track { background: linear-gradient(90deg, #e0e7ff, #6366f1); border-radius: 8px; }
        .npst-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #6366f1; box-shadow: 0 2px 8px rgba(99,102,241,0.3); cursor: pointer; }
        .npst-input { width: 130px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .npst-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
        .npst-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .npst-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .npst-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="npst min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-indigo-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-indigo-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-indigo-700 font-semibold">NPS Tier 2 Calculator</li></ol></nav>

        <header className="npst-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">NPS Tier-2 Calculator</h1>
          <p className="text-lg md:text-xl text-indigo-50 max-w-3xl mx-auto leading-relaxed font-medium">Voluntary contributions with flexible withdrawals and ultra-low fund management costs.</p>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8"><p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Goal Scenarios</p><div className="flex flex-wrap gap-2">{QUICK_PRESETS.map((p, i) => (<button key={i} onClick={() => applyPreset(p, i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-400'}`}>{p.label}</button>))}</div></div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="npst-glass p-8 npst-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-600"></span> Investment Parameters</h2>
              <div className="space-y-7">

                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Monthly Deposits (₹)</label><input type="text" value={monthlyContribution} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setMonthlyContribution(n); }} className="npst-input" /></div><input type="range" min="500" max="150000" step="500" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="npst-slider w-full" /></div>
                
                <div><div className="flex flex-col mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Investment Horizon (Years)</label><input type="number" min="1" max="30" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="npst-input w-full mt-1 text-left" /></div><input type="range" min="1" max="30" step="1" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="npst-slider w-full" /></div>

                <div className="pt-4 border-t border-slate-100"><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Equity Allocation (%)</label><input type="text" value={equityAllocation} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n) && n <= 100) setEquityAllocation(n); }} className="npst-input w-20" /></div><input type="range" min="0" max="100" step="5" value={equityAllocation} onChange={(e) => setEquityAllocation(Number(e.target.value))} className="npst-slider w-full" /><p className="text-[10px] text-slate-400 mt-2 font-bold uppercase text-right">No cap in Tier 2</p></div>

                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Expected Return (% p.a.)</label><input type="text" value={expectedReturn} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n)) setExpectedReturn(n); }} className="npst-input w-20" /></div><input type="range" min="6" max="15" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="npst-slider w-full" /></div>
              </div>
            </div>

            <div className="space-y-6 npst-animate" style={{ animationDelay: '0.1s' }}>
              <div className="npst-glass p-8 text-center bg-gradient-to-br from-indigo-700 to-indigo-900 text-white border-none relative overflow-hidden">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200 mb-2">Tier-2 Projected Corpus</p>
                <p className="text-5xl md:text-6xl font-black mb-1">₹{Math.round(calculations.maturityAmount).toLocaleString('en-IN')}</p>
                <div className="flex justify-center flex-wrap gap-2 mt-4 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-xs font-bold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> {calculations.effectiveCagr.toFixed(2)}% Effective CAGR</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="npst-stat text-left"><p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Contributions</p><p className="text-xl font-black text-slate-800">{formatCurrency(calculations.totalContribution)}</p></div>
                <div className="npst-stat text-left"><p className="text-[10px] font-bold text-indigo-500 uppercase mb-1">Estimated Returns</p><p className="text-xl font-black text-indigo-600">{formatCurrency(calculations.returnAmount)}</p></div>
              </div>

              <div className="h-64 mt-4 npst-glass p-4"><ResultChart data={[{ name: 'Contributions', value: calculations.totalContribution, color: '#6366f1' }, { name: 'Interest/Returns Gained', value: calculations.returnAmount, color: '#818cf8' }]} centerText={`${timePeriod} Yrs\nTarget`} /></div>
            </div>
          </div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Explore More Options</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="npst-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> NPS Tier 2 returns are entirely market-linked with absolutely no guaranteed returns. Tax is applicable on Tier 2 withdrawals as per the subscriber's income tax slab. © 2026 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};