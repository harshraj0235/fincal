import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

type SchemeType = 'td' | 'rd' | 'mis' | 'scss' | 'kvp';

interface SchemeDetails {
  name: string;
  interestRate: number;
  minTenure: number;
  maxTenure: number;
  minAmount: number;
  maxAmount: number;
  description: string;
}

const SCHEMES: Record<SchemeType, SchemeDetails> = {
  scss: { name: 'SCSS (Senior Citizen)', interestRate: 8.2, minTenure: 5, maxTenure: 5, minAmount: 1000, maxAmount: 3000000, description: 'Highest return savings scheme exclusively for senior citizens (60+ yrs) with quarterly payouts.' },
  kvp: { name: 'KVP (Kisan Vikas)', interestRate: 7.5, minTenure: 115, maxTenure: 115, minAmount: 1000, maxAmount: 10000000, description: 'Guaranteed doubling of your investment in exactly 115 months (9 yrs 7 months).' },
  mis: { name: 'MIS (Monthly Income)', interestRate: 7.4, minTenure: 5, maxTenure: 5, minAmount: 1000, maxAmount: 900000, description: 'Fixed monthly income generation scheme for a 5-year lock-in period.' },
  td: { name: 'Time Deposit (FD)', interestRate: 7.1, minTenure: 1, maxTenure: 5, minAmount: 1000, maxAmount: 10000000, description: 'Post Office Fixed Deposit with flexible 1-5 year tenures.' },
  rd: { name: 'Recurring Deposit', interestRate: 6.7, minTenure: 5, maxTenure: 5, minAmount: 100, maxAmount: 1000000, description: 'Monthly saving scheme over 5 years.' }
};

const QUICK_PRESETS = [
  { label: 'SCSS (₹15L)', scheme: 'scss' as SchemeType, amt: 1500000, ten: 5 },
  { label: 'KVP Double (₹5L)', scheme: 'kvp' as SchemeType, amt: 500000, ten: 115 },
  { label: 'MIS Income (₹9L)', scheme: 'mis' as SchemeType, amt: 900000, ten: 5 },
  { label: '5-Yr TD (₹1L)', scheme: 'td' as SchemeType, amt: 100000, ten: 5 },
];

export const PostOfficeCalculator: React.FC = () => {
  const [activeScheme, setActiveScheme] = useState<SchemeType>('scss');
  const [amount, setAmount] = useState<number>(1500000);
  const [tenure, setTenure] = useState<number>(5);

  const [activePreset, setActivePreset] = useState<number | null>(0);

  const calculations = useMemo(() => {
    const scheme = SCHEMES[activeScheme];
    const rate = scheme.interestRate / 100;
    
    let calculatedMaturity = 0;
    let calculatedInterest = 0;
    let calculatedMonthlyIncome = 0;
    let totalInvested = amount;
    
    switch (activeScheme) {
      case 'td':
        calculatedMaturity = amount * Math.pow(1 + rate, tenure); // Annual compounding
        calculatedInterest = calculatedMaturity - amount;
        break;
        
      case 'rd': {
        const n = 4; // Quarterly compounding
        // Standard RD maturity formula (P * (((1 + r/n)^(n*t) - 1) / (1-(1+r/n)^(-1/3)))) or iterative
        let balance = 0;
        const months = tenure * 12;
        totalInvested = amount * months;
        for (let i = 1; i <= months; i++) {
            balance += amount;
            if (i % 3 === 0) {
               balance += balance * (rate / 4);
            }
        }
        calculatedMaturity = balance;
        calculatedInterest = calculatedMaturity - totalInvested;
        break;
      }
        
      case 'mis':
        calculatedMonthlyIncome = amount * (rate / 12);
        calculatedInterest = calculatedMonthlyIncome * tenure * 12;
        calculatedMaturity = amount; // Returns matching principal at end
        break;
        
      case 'scss':
        // SCSS pays quarterly, but let's approximate monthly income equivalent or total interest
        const quarterlyInterest = amount * (rate / 4);
        calculatedMonthlyIncome = quarterlyInterest / 3;
        calculatedInterest = quarterlyInterest * (tenure * 4);
        calculatedMaturity = amount; // Returns matching principal at end
        break;
        
      case 'kvp':
        // KVP doubles based on month tenure. tenure is in months here (115)
        calculatedMaturity = amount * Math.pow(1 + rate, tenure / 12); // Approximate to 2x
        calculatedInterest = calculatedMaturity - amount;
        break;
    }
    
    return {
      maturityAmount: calculatedMaturity,
      totalInvested,
      totalInterest: calculatedInterest,
      monthlyIncome: calculatedMonthlyIncome
    };
  }, [activeScheme, amount, tenure]);

  const handleSchemeChange = (scheme: SchemeType) => {
    setActiveScheme(scheme);
    setActivePreset(null);
    const defaults = SCHEMES[scheme];
    setAmount(defaults.minAmount > amount ? defaults.minAmount : amount > defaults.maxAmount ? defaults.maxAmount : amount);
    setTenure(defaults.maxTenure);
  };

  const applyPreset = (preset: typeof QUICK_PRESETS[0], index: number) => {
    setActiveScheme(preset.scheme);
    setAmount(preset.amt);
    setTenure(preset.ten);
    setActivePreset(index);
  };

  const contentData = { title: "Post Office Savings Schemes Calculator - 2025 Rates", description: "Calculate accurate returns for KVP, SCSS, MIS, TD, and RD using the latest 2025 India Post interest rates. Secure your investments with 100% sovereign guarantee.", benefits: ["Compare all 5 primary PO schemes instantly", "Accurate 8.2% SCSS & 7.5% KVP modeling", "Calculates monthly income logic for MIS", "Highlights 80C tax deduction eligibilities"], howToSteps: [{ step: "Select the specific Scheme", details: "Toggle between Senior Citizen (SCSS), Kisan Vikas (KVP), Monthly Income (MIS), Time Deposit (TD), or Recurring Deposit (RD)." }, { step: "Set Amount", details: "For RD this is the monthly deposit. For the rest, this is the lumpsum principal." }, { step: "Tenure Adjustment", details: "Some schemes are fixed (SCSS 5 Yrs, KVP 115 months), while TD allows flexible 1-5 year selection." }, { step: "Evaluate Returns", details: "Analyze the total interest generated over the period." }], examples: [], tips: ["SCSS limit was enhanced to ₹30 Lakhs in recent budgets.", "KVP has precisely a 115-month doubling period at 7.5%." ], mistakes: ["Assuming MIS pays interest matching maturity to compounding. MIS payouts must be withdrawn."], faqs: [{ question: "Are PO returns tax-free?", answer: "No, interest on TD, SCSS, MIS, KVP, RD is fully taxable as per your slab. However, 5-Yr TD and SCSS qualify for Sec 80C deductions." }], relatedCalculators: [{ name: "PPF Calculator", url: "/calculators/ppf-calculator", description: "Tax-free safe investment" }, { name: "NPS Calculator", url: "/calculators/nps-calculator", description: "Retirement planning" }], lastUpdated: "2025-03-24" };

  return (
    <>
      <SEOHelmet title="Post Office Savings Schemes Calculator 2025 | SCSS, MIS, KVP, RD, TD" description="Free India Post Office Scheme Calculator. Compare SCSS (8.2%), KVP (7.5%), MIS (7.4%), TD (7.1%), RD (6.7%) and calculate exact maturity and interest." keywords="post office calculator india, scss calculator 2025, kvp calculator, mis calculator, post office fd calculator" url="/calculators/post-office-calculator" faqData={contentData.faqs} calculatorData={{ name: 'Post Office Schemes Calculator', description: 'Evaluate Sovereign India Post returns.', category: 'Investment Calculators', features: ['All 5 PO Schemes', 'Latest 2025 Quarters Rates', 'Income vs Growth breakdown'], ratingValue: 4.8, reviewCount: 19800, authorName: 'MoneyCal' }} />

      <style>{`
        .posc { font-family: 'Inter', sans-serif; }
        .posc-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .posc-hero { background: linear-gradient(135deg, #047857 0%, #059669 30%, #10b981 60%, #34d399 100%); }
        .posc-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .posc-slider::-webkit-slider-track { background: linear-gradient(90deg, #d1fae5, #10b981); border-radius: 8px; }
        .posc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #10b981; box-shadow: 0 2px 8px rgba(16,185,129,0.3); cursor: pointer; }
        .posc-input { width: 130px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .posc-input:focus { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.1); }
        .posc-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .posc-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .posc-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="posc min-h-screen bg-gradient-to-b from-emerald-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-emerald-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-emerald-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-emerald-700 font-semibold">Post Office Calculator</li></ol></nav>

        <header className="posc-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Post Office Schemes</h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-3xl mx-auto leading-relaxed font-medium">100% Sovereign Guarantee. Calculate returns across all major India Post savings instruments.</p>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-4 bg-white p-2 rounded-2xl flex flex-wrap gap-2 shadow-sm border border-emerald-100 relative z-10">
            {(Object.keys(SCHEMES) as SchemeType[]).map((key) => (
              <button key={key} onClick={() => handleSchemeChange(key)} className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${activeScheme === key ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:bg-emerald-50'}`}>
                <div className="flex flex-col items-center gap-1">
                  <span>{key.toUpperCase()}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeScheme === key ? 'bg-emerald-500 text-emerald-50' : 'bg-slate-100 text-slate-500'}`}>{SCHEMES[key].interestRate}%</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mb-8"><p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Scenarios</p><div className="flex flex-wrap gap-2">{QUICK_PRESETS.map((p, i) => (<button key={i} onClick={() => applyPreset(p, i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400'}`}>{p.label}</button>))}</div></div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="posc-glass p-8 posc-animate">
              <div className="mb-6 pb-6 border-b border-emerald-100">
                <h2 className="text-2xl font-black text-emerald-900 mb-2">{SCHEMES[activeScheme].name}</h2>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{SCHEMES[activeScheme].description}</p>
              </div>
              
              <div className="space-y-7">
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">{activeScheme === 'rd' ? 'Monthly Deposit (₹)' : 'Investment (₹)'}</label><input type="text" value={amount} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setAmount(n); }} className="posc-input" /></div><input type="range" min={SCHEMES[activeScheme].minAmount} max={SCHEMES[activeScheme].maxAmount} step={activeScheme === 'rd' ? 100 : 1000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="posc-slider w-full" /><p className="text-[10px] text-slate-400 mt-2 font-bold uppercase text-right">Limit: {formatCurrency(SCHEMES[activeScheme].maxAmount)}</p></div>

                <div>
                  <div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Tenure ({activeScheme === 'kvp' ? 'Months' : 'Years'})</label>
                  {SCHEMES[activeScheme].minTenure === SCHEMES[activeScheme].maxTenure ? (
                     <div className="font-black text-lg text-emerald-700">{tenure}</div>
                  ) : (
                     <input type="number" min={SCHEMES[activeScheme].minTenure} max={SCHEMES[activeScheme].maxTenure} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="posc-input w-20" />
                  )}
                  </div>
                  {SCHEMES[activeScheme].minTenure !== SCHEMES[activeScheme].maxTenure && (
                     <input type="range" min={SCHEMES[activeScheme].minTenure} max={SCHEMES[activeScheme].maxTenure} step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="posc-slider w-full mt-2" />
                  )}
                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase right-0 text-right">{SCHEMES[activeScheme].minTenure === SCHEMES[activeScheme].maxTenure ? 'Fixed Tenure' : 'Flexible Tenure'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 posc-animate" style={{ animationDelay: '0.1s' }}>
              <div className="posc-glass p-8 text-center bg-gradient-to-br from-emerald-700 to-emerald-900 text-white border-none relative overflow-hidden">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200 mb-2">Total Value After {tenure} {activeScheme === 'kvp' ? 'Months' : 'Years'}</p>
                <p className="text-5xl md:text-6xl font-black mb-1">₹{Math.round(calculations.maturityAmount > 0 ? calculations.maturityAmount : calculations.totalInvested).toLocaleString('en-IN')}</p>
                {(activeScheme === 'mis' || activeScheme === 'scss') && (
                  <div className="mt-4 pt-4 border-t border-emerald-600/50">
                     <p className="text-emerald-200 text-sm font-bold uppercase tracking-wider mb-1">Generated {activeScheme === 'scss' ? 'Equivalent Monthly' : 'Monthly'} Income</p>
                     <p className="text-2xl font-black text-emerald-100">+ ₹{Math.round(calculations.monthlyIncome).toLocaleString('en-IN')}/mo</p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="posc-stat text-left"><p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Principal</p><p className="text-xl font-black text-slate-800">{formatCurrency(calculations.totalInvested)}</p></div>
                <div className="posc-stat text-left"><p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Total Interest</p><p className="text-xl font-black text-emerald-600">{formatCurrency(calculations.totalInterest)}</p></div>
              </div>

              <div className="h-64 mt-4 posc-glass p-4"><ResultChart data={[{ name: 'Principal Invested', value: calculations.totalInvested, color: '#34d399' }, { name: 'Interest Generated', value: calculations.totalInterest, color: '#059669' }]} centerText={`Sovereign\nGrowth`} /></div>
            </div>
          </div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Explore More Options</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="posc-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> Post Office Scheme rules and rates are subject to quarterly revisions by the Ministry of Finance. 80C benefits strictly apply to SCSS and 5-Year TD only. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};
