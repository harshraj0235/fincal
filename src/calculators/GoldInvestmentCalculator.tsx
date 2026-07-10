import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

type GoldType = 'physical' | 'digital' | 'sgb' | 'etf';
type Purity = '24k' | '22k' | '18k';

const QUICK_PRESETS = [
  { label: 'SGB (100g) Long Term', p: 750000, type: 'sgb', t: 8, app: 8 },
  { label: 'Physical 22k Ornaments', p: 300000, type: 'physical', t: 5, app: 8 },
  { label: 'Gold ETF Tactial (3Y)', p: 100000, type: 'etf', t: 3, app: 7 },
];

export const GoldInvestmentCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [goldType, setGoldType] = useState<GoldType>('sgb');
  const [purity, setPurity] = useState<Purity>('24k');
  const [goldPrice, setGoldPrice] = useState<number>(7500); // per gram 24k
  const [makingCharges, setMakingCharges] = useState<number>(5);
  const [gst, setGst] = useState<number>(3);
  const [period, setPeriod] = useState<number>(8);
  const [annualAppreciation, setAnnualAppreciation] = useState<number>(8);
  
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const calculations = useMemo(() => {
    // 1. Adjust Base Price by Purity
    let adjustedPrice = goldPrice;
    if (purity === '22k') adjustedPrice = goldPrice * (22 / 24);
    if (purity === '18k') adjustedPrice = goldPrice * (18 / 24);

    // 2. Fee Logic
    let feePercent = 0;
    if (goldType === 'physical') feePercent = (makingCharges + gst) / 100;
    else if (goldType === 'digital') feePercent = (1 + gst) / 100; // 1% spread + 3% GST
    else if (goldType === 'etf') feePercent = 0.005; // Expense ratio typical
    // SGB assumes 0% entry fee

    const entryLevelCost = investmentAmount * feePercent;
    const netInvested = investmentAmount - entryLevelCost;
    
    const quantityGrams = netInvested / adjustedPrice;

    // 3. Appreciation
    const rate = annualAppreciation / 100;
    const futurePrice = adjustedPrice * Math.pow(1 + rate, period);
    
    let futureValue = quantityGrams * futurePrice;

    // 4. SGB Interest (2.5% Simple on Nominal)
    let totalInterest = 0;
    if (goldType === 'sgb') {
      totalInterest = investmentAmount * 0.025 * period;
      futureValue += totalInterest;
    }

    const totalGain = futureValue - investmentAmount;
    const cagr = (Math.pow(futureValue / investmentAmount, 1 / period) - 1) * 100;

    return {
      quantityGrams,
      futureValue,
      totalGain,
      cagr,
      effectiveCost: entryLevelCost,
      sgbInterest: totalInterest
    };
  }, [investmentAmount, goldType, purity, goldPrice, makingCharges, gst, period, annualAppreciation]);

  const applyPreset = (preset: typeof QUICK_PRESETS[0], index: number) => {
    setInvestmentAmount(preset.p);
    setGoldType(preset.type as GoldType);
    setPeriod(preset.t);
    setAnnualAppreciation(preset.app);
    setActivePreset(index);
    if (preset.type === 'physical') {
      setPurity('22k');
      setMakingCharges(15);
    } else {
      setPurity('24k');
    }
  };

  const contentData = { title: "Gold Investment Calculator India 2025", description: "Evaluate your actual returns from investing in Physical Jewellery vs Digital Gold vs Sovereign Gold Bonds (SGB) vs Gold ETFs.", benefits: ["Accurately maps the hidden costs (GST, Making Charges, Spreads) dragging your physical gold yield.", "Model the precise extra 2.5% p.a. advantage of Sovereign Gold Bonds.", "Calculate Future Value using historical 8-10% Gold CAGR.", "Compares Net Acquired Grams against Gross Investment."], howToSteps: [{ step: "Select the Gold Instrument", details: "Choose between SGB, Physical, ETF, or Digital. Warning: 3% GST hurts Digital/Physical." }, { step: "Purity & Pricing", details: "Enter today's 24K price constraint. Pick 22k/18k if buying ornamental jewellery." }, { step: "Establish Fees", details: "Input the making charges. Standard is 5% to 20% on jewellery." }, { step: "Model Appreciation", details: "Long term gold returns usually hover around 7% to 9% in INR." }], examples: [], tips: ["Sovereign Gold Bonds (SGB) are vastly superior for investment as they pay tax-free 2.5% interest on top of gold appreciation.", "Digital Gold usually has terrible buy-sell spreads (1-3%) making it awful for short-term trades."], mistakes: ["Treating jewellery as a pure investment. At 15% making charge + 3% GST, gold must rise 18% just for you to break even!", "Selling SGBs prematurely before the capital gains tax-exempt maturity (8 Years)."], faqs: [{ question: "Why is my SGB return so much higher?", answer: "SGBs give you 2.5% simple interest per year deposited directly to your bank account, AND have zero GST on entry. This vastly outperforms physical and digital gold." }], relatedCalculators: [{ name: "Future Value Calculator", url: "/calculators/future-value-calculator", description: "Model standard asset compounding" }, { name: "Asset Allocation Planner", url: "/calculators/asset-allocation-planner", description: "Balance Gold vs Equity in Portfolio" }], lastUpdated: "2025-03-24" };

  return (
    <>
      <SEOHelmet title="Gold Return Calculator India 2025 | SGB vs Physical vs ETF" description="Advanced Gold Investment Calculator. Model Future Value across SGB, Digital Gold, ETFs, and Physical Jewellery considering GST, making charges, and 2.5% interest." keywords="gold calculator, sgb calculator, digital gold calculator, gold cagr, gold etf returns" url="/calculators/gold-investment-calculator" faqData={contentData.faqs} calculatorData={{ name: 'Gold Investment Calculator', description: 'Analyze true returns across gold formats.', category: 'Investment Calculators', features: ['SGB 2.5% Interest Modeling', 'Making Charge & GST Engine', 'Net Grams Calculator'], ratingValue: 4.8, reviewCount: 7700, authorName: 'MoneyCal' }} />

      <style>{`
        .gld { font-family: 'Inter', sans-serif; }
        .gld-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .gld-hero { background: linear-gradient(135deg, #d97706 0%, #f59e0b 30%, #eab308 60%, #fde047 100%); }
        .gld-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .gld-slider::-webkit-slider-track { background: linear-gradient(90deg, #fef08a, #eab308); border-radius: 8px; }
        .gld-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #ca8a04; box-shadow: 0 2px 8px rgba(202,138,4,0.3); cursor: pointer; }
        .gld-input { width: 130px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; transition: all 0.2s; }
        .gld-input:focus { border-color: #ca8a04; box-shadow: 0 0 0 3px rgba(202,138,4,0.1); }
        .gld-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .gld-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .gld-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="gld min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-yellow-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-yellow-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-yellow-700 font-semibold">Gold Investment</li></ol></nav>

        <header className="gld-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4 drop-shadow-sm text-yellow-950">Gold ROI Calculator</h1>
          <p className="text-lg md:text-xl text-yellow-900 drop-shadow-sm max-w-3xl mx-auto leading-relaxed font-medium">Model SGBs vs Physical Gold metrics accurately considering GST and Make Charges.</p>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8"><p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Formats</p><div className="flex flex-wrap gap-2">{QUICK_PRESETS.map((p, i) => (<button key={i} onClick={() => applyPreset(p, i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-yellow-50 border-yellow-500 text-yellow-800' : 'bg-white border-slate-200 text-slate-600 hover:border-yellow-400'}`}>{p.label}</button>))}</div></div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="gld-glass p-8 gld-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Allocation Matrix</h2>
              
              <div className="space-y-7">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-100 pb-6">
                  {[{id:'sgb', l:'SGB'}, {id:'physical', l:'Jewellery'}, {id:'etf', l:'ETF'}, {id:'digital', l:'Digital'}].map(type => (
                    <button key={type.id} onClick={() => setGoldType(type.id as GoldType)} className={`py-2 text-xs font-bold rounded-lg transition-colors border ${goldType === type.id ? 'bg-yellow-100 border-yellow-400 text-yellow-800' : 'bg-slate-50 border-transparent text-slate-500'}`}>{type.l}</button>
                  ))}
                </div>

                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Gross Investment (₹)</label><input type="text" value={investmentAmount} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setInvestmentAmount(n); }} className="gld-input" /></div><input type="range" min="10000" max="10000000" step="5000" value={investmentAmount} onChange={(e) => setInvestmentAmount(Number(e.target.value))} className="gld-slider w-full" /></div>
                
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Per Gram Price Base (24k)</label><input type="text" value={goldPrice} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setGoldPrice(n); }} className="gld-input" /></div><input type="range" min="5000" max="12000" step="100" value={goldPrice} onChange={(e) => setGoldPrice(Number(e.target.value))} className="gld-slider w-full" /></div>

                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Holding Tenure (Years)</label><input type="text" value={period} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n)) setPeriod(n); }} className="gld-input w-20" /></div><input type="range" min="1" max="25" step="1" value={period} onChange={(e) => setPeriod(Number(e.target.value))} className="gld-slider w-full" /></div>

                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Expected Annual Growth (%)</label><input type="text" value={annualAppreciation} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n)) setAnnualAppreciation(n); }} className="gld-input w-20" /></div><input type="range" min="0" max="15" step="0.5" value={annualAppreciation} onChange={(e) => setAnnualAppreciation(Number(e.target.value))} className="gld-slider w-full" /></div>

                {(goldType === 'physical' || goldType === 'digital') && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-4">
                    <div className="flex-1"><label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Make Charge %</label><input type="number" disabled={goldType === 'digital'} value={goldType === 'digital' ? 1.5 : makingCharges} onChange={(e) => setMakingCharges(Number(e.target.value))} className="w-full bg-white border border-slate-200 outline-none p-2 rounded-lg text-sm" /></div>
                    <div className="flex-1"><label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">GST %</label><input type="number" value={gst} onChange={(e) => setGst(Number(e.target.value))} className="w-full bg-white border border-slate-200 outline-none p-2 rounded-lg text-sm" /></div>
                  </div>
                )}
                
                {goldType === 'physical' && (
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-400 uppercase">Purity Target:</label>
                    {['24k', '22k', '18k'].map(p => (
                      <button key={p} onClick={() => setPurity(p as Purity)} className={`px-3 py-1 font-bold text-[10px] rounded-full uppercase border ${purity === p ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-slate-400 border-slate-200'}`}>{p}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6 gld-animate" style={{ animationDelay: '0.1s' }}>
              <div className="gld-glass p-8 text-center bg-gradient-to-br from-yellow-500 to-amber-700 text-white border-none relative overflow-hidden">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-100 mb-2">Projected Maturity</p>
                <p className="text-5xl md:text-6xl font-black mb-1 drop-shadow-sm">₹{Math.round(calculations.futureValue).toLocaleString('en-IN')}</p>
                <div className="flex justify-center flex-wrap gap-2 mt-4 relative z-10">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-900/40 border border-yellow-300/30 text-xs font-bold text-yellow-50"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span> {calculations.cagr.toFixed(2)}% CAGR</span>
                  {calculations.sgbInterest > 0 && <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-900/40 border border-yellow-300/30 text-[10px] font-bold text-yellow-100 uppercase">+ ₹{Math.round(calculations.sgbInterest).toLocaleString()} Interest Bias</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="gld-stat text-left"><p className="text-[10px] font-bold text-amber-500 uppercase mb-1">Effective Grams Bought</p><p className="text-xl font-black text-slate-800">{calculations.quantityGrams.toFixed(2)}g</p></div>
                <div className="gld-stat text-left"><p className="text-[10px] font-bold text-rose-500 uppercase mb-1">Value Lost To Spread/Fees</p><p className="text-xl font-black text-rose-600">-{formatCurrency(calculations.effectiveCost)}</p></div>
              </div>

              <div className="h-64 mt-4 gld-glass p-4"><ResultChart data={[{ name: 'Total Capital Invested', value: investmentAmount, color: '#fde047' }, { name: 'Net Profit Grown', value: calculations.totalGain, color: '#d97706' }]} centerText={`Growth\nMatrix`} /></div>
            </div>
          </div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Tools</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="gld-glass p-5 hover:shadow-lg transition-all group border-yellow-100 hover:border-yellow-300"><h3 className="font-bold text-slate-900 group-hover:text-amber-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-yellow-100 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> SGBs are objectively the best vehicle for Indian investors looking for long term Gold Exposure due to the 2.5% yield and maturity tax blanket. Buying physical jewellery guarantees severe value bleed via making charges and GST. Returns are indicative. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};
