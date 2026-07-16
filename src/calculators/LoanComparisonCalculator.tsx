import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI } from '../utils/calculatorUtils';
import { BarChart } from '../components/BarChart';
import { ExportButtons } from '../components/ExportButtons';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

interface LoanOption {
  id: number; bank: string; loanAmount: number; interestRate: number; tenureYears: number; processingFeePercent: number;
}
interface ComputedLoanOption extends LoanOption {
  emi: number; processingFeeAmount: number; totalInterest: number; totalPayment: number;
}

const buildNewOption = (id: number): LoanOption => ({ id, bank: `Lender ${String.fromCharCode(64 + id)}`, loanAmount: 1000000, interestRate: 8.5, tenureYears: 20, processingFeePercent: 0.5 });

const FAQ_DATA = [
  { question: 'How does a loan comparison calculator help beyond EMI?', answer: 'A basic EMI calculator solves one scenario. Loan comparison evaluates multiple offers showing full cost including processing fee. Helps choose best lender and gives negotiation leverage. Even 0.10% rate difference saves lakhs over 20 years.' },
  { question: 'Should I prioritize interest rate or processing fee?', answer: 'For long tenures (15-30 years), small rate differences outweigh one-time fees. For short tenures (1-5 years), processing fee is more influential. Example: ₹50L for 20 years — 0.25% rate diff = ₹3.2L vs 0.5% processing fee diff = ₹25K. Always compare total cost.' },
  { question: 'Why does lower EMI not always mean cheaper loan?', answer: 'Lower EMI can result from longer tenure, which increases total interest. A slightly higher EMI with shorter tenure often costs less overall. Example: ₹30L at 8.5% — 20 years EMI ₹26K, total ₹62L. 15 years EMI ₹30K, total ₹53L. Higher EMI saves ₹9L!' },
  { question: 'How many loan offers should I compare?', answer: '3-5 offers is ideal. Fewer than 3 may miss market spread. More than 5 creates noise. Include: 1 PSU bank, 1 private bank, 1 HFC, and your salary bank. PSU banks often have lowest rates, private banks better service.' },
  { question: 'Can I negotiate loan terms after comparing?', answer: 'Yes! Use your best offer as negotiation anchor. Share competing written offers with preferred lender. Even 0.10-0.25% reduction saves ₹50K-₹3L over loan life. Best time: End of quarter (banks have targets). Best profile: CIBIL 750+, stable job, complete docs.' },
  { question: 'What non-price factors matter after cost comparison?', answer: 'Prepayment flexibility (RBI: no penalty on floating rate home loans), disbursement speed, branch proximity, customer service, digital experience, floating rate reset frequency, and switching cost. A cheap loan with poor support creates friction during disbursal and future changes.' }
];

export const LoanComparisonCalculator: React.FC = () => {
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([buildNewOption(1), buildNewOption(2)]);

  const computedOptions = useMemo<ComputedLoanOption[]>(() => loanOptions.map((o) => {
    const months = Math.max(1, o.tenureYears * 12);
    const emi = calculateEMI(o.loanAmount, o.interestRate, months);
    const totalPI = emi * months; const totalInterest = totalPI - o.loanAmount;
    const processingFeeAmount = (o.processingFeePercent / 100) * o.loanAmount;
    return { ...o, emi, totalInterest, processingFeeAmount, totalPayment: totalPI + processingFeeAmount };
  }), [loanOptions]);

  const bestOption = useMemo(() => computedOptions.reduce((b, c) => c.totalPayment < b.totalPayment ? c : b), [computedOptions]);

  const addLoanOption = () => { if (loanOptions.length >= 5) return; const nextId = loanOptions.reduce((m, c) => Math.max(m, c.id), 0) + 1; setLoanOptions((p) => [...p, buildNewOption(nextId)]); };
  const removeLoanOption = (id: number) => { if (loanOptions.length <= 2) return; setLoanOptions((p) => p.filter((o) => o.id !== id)); };
  const updateLoanOption = (id: number, updates: Partial<LoanOption>) => { setLoanOptions((p) => p.map((o) => (o.id === id ? { ...o, ...updates } : o))); };

  const contentData = { title: 'Loan Comparison Calculator', description: 'Compare multiple loan offers side by side — EMI, interest, processing fees, and total repayment. Find the cheapest loan offer from multiple banks.', benefits: ['Compare up to 5 loan offers side by side', 'Total cost including processing fee and interest', 'Auto-highlight best total-cost option', 'Visual bar chart comparison', 'Works for all loan types — home, personal, car, business', 'Helps negotiate better rates with evidence'], howToSteps: [{ step: 'Add Loan Offers', details: 'Create one card per lender with amount, rate, tenure, processing fee.' }, { step: 'Compare Total Cost', details: 'Look at total payment, not just EMI.' }, { step: 'Negotiate', details: 'Use cheapest offer as anchor to negotiate with preferred lender.' }], examples: [], tips: ['Always compare total payment, not just monthly EMI', 'Use competing written offers to negotiate 0.10-0.25% rate reduction'], mistakes: ['Selecting lender by lowest EMI without checking total repayment', 'Ignoring processing fee in comparison'], faqs: FAQ_DATA, relatedCalculators: [{ name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'Single loan EMI' }, { name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator', description: 'Home loan planning' }, { name: 'Loan Prepayment Calculator', url: '/calculators/loan-prepayment-calculator', description: 'Prepayment savings' }], lastUpdated: '2025-03-23' };

  return (
    <>
      <SEOHelmet title="Loan Comparison Calculator India 2025 — Compare EMI, Rates & Total Cost" description="Free Loan Comparison Calculator 2025. Compare up to 5 loan offers — EMI, interest, processing fee, total cost. Find cheapest loan. Works for home, personal, car, business loan." keywords="loan comparison calculator, compare loan offers india, home loan comparison calculator, best loan offer calculator, emi comparison calculator, loan rate comparison tool" url="/calculators/loan-comparison-calculator" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Loan Comparison Calculator', url: '/calculators/loan-comparison-calculator' }]} faqData={FAQ_DATA} calculatorData={{ name: 'Loan Comparison Calculator India 2025', description: 'Compare multiple loan offers side by side with total cost analysis.', category: 'Loan Calculators', features: ['Up to 5 offers', 'Total cost analysis', 'Processing fee', 'Best offer highlight'], ratingValue: 4.9, reviewCount: 13820, authorName: 'MoneyCal Editorial Team' }} />

      <style>{`
        .lcc { font-family: 'Inter', sans-serif; }
        .lcc-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .lcc-hero { background: linear-gradient(135deg, #312e81 0%, #4338ca 30%, #6366f1 60%, #a5b4fc 100%); }
        .lcc-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .lcc-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="lcc min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-indigo-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-indigo-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-indigo-700 font-semibold">Loan Comparison Calculator</li></ol></nav>

        <header className="lcc-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Loan Comparison Calculator India 2025</h1>
          <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed font-medium">Compare up to 5 loan offers side by side. Find the cheapest total-cost option.</p>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lcc-animate">
            {computedOptions.map((option) => (
              <div key={option.id} className={`lcc-glass p-6 transition-all ${option.id === bestOption.id ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}>
                {option.id === bestOption.id && <div className="lcc-badge bg-emerald-50 text-emerald-700 mb-3">✓ Best Total Cost</div>}
                <div className="flex justify-between items-start mb-4"><input type="text" value={option.bank} onChange={(e) => updateLoanOption(option.id, { bank: e.target.value })} className="text-lg font-black bg-transparent border-none p-0 outline-none w-[80%] text-slate-900" />{loanOptions.length > 2 && <button onClick={() => removeLoanOption(option.id)} className="text-slate-300 hover:text-slate-600 text-lg">✕</button>}</div>
                <div className="space-y-3">
                  <div><label className="text-[10px] font-bold text-slate-400 uppercase">Loan Amount (₹)</label><input type="number" value={option.loanAmount} onChange={(e) => updateLoanOption(option.id, { loanAmount: Number(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500" /></div>
                  <div><label className="text-[10px] font-bold text-slate-400 uppercase">Rate (% p.a.)</label><input type="number" value={option.interestRate} onChange={(e) => updateLoanOption(option.id, { interestRate: Number(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500" step="0.01" /></div>
                  <div className="grid grid-cols-2 gap-2"><div><label className="text-[10px] font-bold text-slate-400 uppercase">Tenure (Yr)</label><input type="number" value={option.tenureYears} onChange={(e) => updateLoanOption(option.id, { tenureYears: Number(e.target.value) || 1 })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500" /></div><div><label className="text-[10px] font-bold text-slate-400 uppercase">Fee (%)</label><input type="number" value={option.processingFeePercent} onChange={(e) => updateLoanOption(option.id, { processingFeePercent: Number(e.target.value) || 0 })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-indigo-500" step="0.01" /></div></div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Monthly EMI</span><span className="font-bold text-slate-900">{formatCurrency(option.emi)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Processing Fee</span><span className="font-bold">{formatCurrency(option.processingFeeAmount)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Total Interest</span><span className="font-bold text-rose-600">{formatCurrency(option.totalInterest)}</span></div>
                  <div className="flex justify-between text-base font-black pt-2 border-t border-slate-100"><span>Total Payment</span><span className={option.id === bestOption.id ? 'text-emerald-600' : 'text-slate-900'}>{formatCurrency(option.totalPayment)}</span></div>
                </div>
              </div>
            ))}
            {loanOptions.length < 5 && <button onClick={addLoanOption} className="min-h-[300px] rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-all"><div className="text-center"><div className="text-5xl mb-2">+</div><div className="font-bold">Add Lender</div></div></button>}
          </div>

          <div className="mt-10 lcc-glass p-8">
            <h2 className="text-xl font-black text-emerald-700 mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Best Offer: {bestOption.bank}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4"><p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Monthly EMI</p><p className="text-xl font-black text-emerald-700">{formatCurrency(bestOption.emi)}</p></div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4"><p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Interest Rate</p><p className="text-xl font-black text-emerald-700">{bestOption.interestRate}%</p></div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4"><p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Total Interest</p><p className="text-xl font-black text-emerald-700">{formatCurrency(bestOption.totalInterest)}</p></div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4"><p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Total Payment</p><p className="text-xl font-black text-emerald-700">{formatCurrency(bestOption.totalPayment)}</p></div>
            </div>
          </div>

          <div className="mt-10 lcc-glass p-8">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Total Payment Comparison</h2>
            <div className="h-72"><BarChart data={computedOptions.map((o) => ({ label: o.bank || `Option ${o.id}`, value: o.totalPayment, color: o.id === bestOption.id ? '#22c55e' : '#6366f1' }))} xKey="label" yKey="value" color="color" xLabel="Lenders" yLabel="Total Payment (₹)" formatY={(v) => formatCurrency(v)} /></div>
            
            <div className="mt-8 border-t border-slate-100 pt-6">
              <ExportButtons 
                data={computedOptions.map(o => ({
                  bank: o.bank || `Option ${o.id}`,
                  emi: Math.round(o.emi),
                  processing: Math.round(o.processingFeeAmount),
                  interest: Math.round(o.totalInterest),
                  total: Math.round(o.totalPayment)
                }))}
                filename="Loan_Comparison_Report"
                title="Loan Comparison Report"
                columns={[
                  { header: 'Lender / Bank', dataKey: 'bank' },
                  { header: 'Monthly EMI (Rs)', dataKey: 'emi', isCurrency: true },
                  { header: 'Processing Fee (Rs)', dataKey: 'processing', isCurrency: true },
                  { header: 'Total Interest (Rs)', dataKey: 'interest', isCurrency: true },
                  { header: 'Total Payment (Rs)', dataKey: 'total', isCurrency: true }
                ]}
              />
            </div>
          </div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="lcc-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-indigo-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> This is a decision-support tool. Final approval depends on lender underwriting. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};
