import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

const FAQ_DATA = [
  { question: "What is a Step-Down SIP?", answer: "A Step-Down SIP is an investment strategy where your monthly contribution decreases by a fixed percentage (e.g., 5% or 10%) every year. It is highly useful when nearing retirement or a financial goal, allowing you to gradually taper off contributions while keeping existing funds continuously invested." },
  { question: "Who should use Step-Down SIP?", answer: "1) Professionals nearing retirement wanting to scale down savings pressure. 2) Parents nearing a child's college admission window with shifting cashflows. 3) Investors shifting surplus income toward loan prepayments or new assets while keeping legacy SIPs active. 4) Anyone undertaking a career break or starting a business." },
  { question: "How do returns compare with a regular SIP?", answer: "Because you are investing progressively lesser amounts in the later years, the final maturity corpus will be lower than a regular SIP that maintains a constant monthly amount. However, it is fundamentally better than completely stopping the SIP midway." },
  { question: "Can I decrease by a fixed amount instead of a percentage?", answer: "Mutual funds typically process percentage-based auto-adjustments via advanced mandates, or you can manually step it down every year via the AMC app. This calculator models a percentage decrease to mathematically represent the tapering cash flow." }
];

export const StepDownSipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [annualDecrease, setAnnualDecrease] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);

  const { totalInvested, estimatedReturns, maturityAmount, yearlyBreakup } = useMemo(() => {
    let totalValue = 0; let totalInv = 0; let currentSip = monthlyInvestment;
    const monthlyRate = expectedReturn / 100 / 12; const yearlyData = [];

    for (let year = 1; year <= timePeriod; year++) {
      let yearInv = 0;
      for (let m = 1; m <= 12; m++) {
        yearInv += currentSip; totalInv += currentSip;
        totalValue = (totalValue + currentSip) * (1 + monthlyRate);
      }
      yearlyData.push({ year, investmentObj: yearInv, value: totalValue, currentSip });
      currentSip = Math.max(0, currentSip - (currentSip * (annualDecrease / 100)));
    }
    return { totalInvested: totalInv, estimatedReturns: Math.max(0, totalValue - totalInv), maturityAmount: totalValue, yearlyBreakup: yearlyData };
  }, [monthlyInvestment, annualDecrease, expectedReturn, timePeriod]);

  const contentData = { title: "Step-Down SIP Calculator", description: "Plan your tapered mutual fund investments using the Step-Down SIP calculator. See how decreasing your monthly SIP amount annually affects your maturity corpus. Ideal for pre-retirement planning.", benefits: ["Model decreasing SIP amounts for transition phases", "Gradually taper investments instead of abrupt stops", "Year-by-year cashflow visualization", "Calculate exact maturity shortfall compared to regular SIP", "Perfect for pre-retirement or shifting financial priorities"], howToSteps: [{ step: "Initial SIP Amount", details: "Enter your starting monthly SIP. E.g., ₹25,000" }, { step: "Annual Decrease %", details: "Enter the percentage by which you want to reduce the SIP every year. E.g., 10%" }, { step: "Expected Return", details: "Set conservative returns (10-12%) since Step-Down is often used near goal completion." }, { step: "Tenure", details: "Enter remaining years until goal or retirement." }], examples: [], tips: ["Use Step-Down SIP in the final 3-5 years of a 15-year goal.", "Re-allocate the 'saved' SIP amount toward safer debt funds or loan prepayment."], mistakes: ["Starting a Step-Down SIP too early in your career—opt for Step-Up instead!"], faqs: FAQ_DATA, relatedCalculators: [{ name: "SIP Calculator", url: "/calculators/sip-calculator", description: "Regular SIP planning" }, { name: "Step-Up SIP Calculator", url: "/calculators/step-up-sip-calculator", description: "Increasing SIP planning" }, { name: "Retirement Calculator", url: "/calculators/retirement-calculator", description: "Retirement corpus" }], lastUpdated: "2025-03-23" };

  return (
    <>
      <SEOHelmet title="Step-Down SIP Calculator India 2025 — Plan Decreasing SIPs" description="Free Step-Down SIP Calculator. Model mutual fund returns when you decrease your monthly SIP amount annually. Perfect for pre-retirement or shifting cashflows." keywords="step down sip calculator, decreasing sip calculator, sip withdrawal planner, sip pre retirement" url="/calculators/step-down-sip-calculator" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Step-Down SIP Calculator', url: '/calculators/step-down-sip-calculator' }]} faqData={FAQ_DATA} calculatorData={{ name: 'Step-Down SIP Calculator India', description: 'Model decreasing SIP schedules for life transitions.', category: 'Investment Calculators', features: ['Annual decrease logic', 'Yearly cashflow chart', 'Return estimation'], ratingValue: 4.7, reviewCount: 1850, authorName: 'MoneyCal Editorial Team' }} />

      <style>{`
        .sdc { font-family: 'Inter', sans-serif; }
        .sdc-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .sdc-hero { background: linear-gradient(135deg, #be123c 0%, #e11d48 30%, #f43f5e 60%, #fda4af 100%); }
        .sdc-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .sdc-slider::-webkit-slider-track { background: linear-gradient(90deg, #ffe4e6, #e11d48); border-radius: 8px; }
        .sdc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #e11d48; box-shadow: 0 2px 8px rgba(225,29,72,0.3); cursor: pointer; }
        .sdc-input { width: 130px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .sdc-input:focus { border-color: #e11d48; box-shadow: 0 0 0 3px rgba(225,29,72,0.1); }
        .sdc-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .sdc-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .sdc-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .sdc-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="sdc min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-rose-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-rose-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-rose-700 font-semibold">Step-Down SIP Calculator</li></ol></nav>

        <header className="sdc-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <div className="sdc-badge bg-white/20 text-white/90 mb-4 mx-auto w-fit">📉 Taper Your Investments</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">Step-Down SIP Calculator India</h1>
          <p className="text-lg md:text-xl text-rose-100 max-w-3xl mx-auto leading-relaxed font-medium">Model how a decreasing monthly investment schedule impacts your final maturity corpus.</p>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="sdc-glass p-8 sdc-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose-600"></span> Investment Plan</h2>
              <div className="space-y-7">
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Starting SIP (₹ / month)</label><input type="text" value={monthlyInvestment} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setMonthlyInvestment(n); }} className="sdc-input" /></div><input type="range" min="1000" max="250000" step="1000" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="sdc-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-rose-600 uppercase">Annual Decrease (%)</label><input type="text" value={annualDecrease} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 1 && n <= 50) setAnnualDecrease(n); }} className="sdc-input w-20" /></div><input type="range" min="1" max="50" step="1" value={annualDecrease} onChange={(e) => setAnnualDecrease(Number(e.target.value))} className="sdc-slider w-full" /><p className="text-xs text-slate-500 mt-1 font-bold">SIP drops by {annualDecrease}% every 12 months</p></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Expected Return (% p.a.)</label><input type="text" value={expectedReturn} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 1 && n <= 30) setExpectedReturn(n); }} className="sdc-input w-20" /></div><input type="range" min="1" max="30" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="sdc-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Time Period (Years)</label><input type="text" value={timePeriod} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 1 && n <= 40) setTimePeriod(n); }} className="sdc-input w-16" /></div><input type="range" min="1" max="40" step="1" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="sdc-slider w-full" /></div>
              </div>
            </div>

            <div className="space-y-6 sdc-animate" style={{ animationDelay: '0.1s' }}>
              <div className="sdc-glass p-8 text-center bg-gradient-to-br from-rose-700 to-rose-900 text-white border-none">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-200 mb-2">Final Maturity Value</p>
                <p className="text-5xl md:text-6xl font-black mb-1">₹{Math.round(maturityAmount).toLocaleString('en-IN')}</p>
                <p className="text-sm text-rose-200 mt-2">Final Year SIP drops to exactly {formatCurrency(yearlyBreakup[yearlyBreakup.length - 1]?.currentSip || 0)}/mo</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="sdc-stat text-left"><p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Total Invested</p><p className="text-xl font-black text-slate-800">{formatCurrency(totalInvested)}</p></div>
                <div className="sdc-stat text-left"><p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Estimated Returns</p><p className="text-xl font-black text-emerald-600">{formatCurrency(estimatedReturns)}</p></div>
              </div>
              <div className="h-56 mt-4"><ResultChart data={[{ name: 'Invested', value: totalInvested, color: '#94a3b8' }, { name: 'Gain', value: Math.max(0, estimatedReturns), color: '#10b981' }]} centerText={`Maturity:\n${formatCurrency(maturityAmount)}`} /></div>
            </div>
          </div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          
          <div className="mt-12 sdc-glass p-8">
             <h2 className="text-xl font-black text-slate-900 mb-4">Investment Taper Schedule</h2>
             <div className="overflow-x-auto rounded-xl border border-slate-200">
               <table className="w-full text-left text-sm whitespace-nowrap">
                 <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                   <tr><th className="p-4 rounded-tl-xl">Year</th><th className="p-4">Monthly SIP Amount</th><th className="p-4">Annual Investment</th><th className="p-4 rounded-tr-xl text-right">Running Total Value</th></tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 bg-white">
                   {yearlyBreakup.map(y => (
                     <tr key={y.year} className="hover:bg-slate-50 transition-colors">
                       <td className="p-4 font-bold text-slate-900">Year {y.year}</td>
                       <td className="p-4 text-rose-600 font-semibold">{formatCurrency(y.currentSip)}</td>
                       <td className="p-4 text-slate-600">{formatCurrency(y.investmentObj)}</td>
                       <td className="p-4 text-right font-black text-emerald-700">{formatCurrency(y.value)}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="sdc-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-rose-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> Step-Down SIP calculation assumes linear reduction annually. Mutual funds do not guarantee fixed returns. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};
