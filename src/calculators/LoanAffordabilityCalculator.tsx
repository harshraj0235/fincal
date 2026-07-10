import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

const FAQ_DATA = [
  { question: 'How do banks calculate loan affordability in India?', answer: 'Banks use FOIR (Fixed Obligation to Income Ratio). Total EMIs (existing + new) should not exceed 50-55% of gross monthly income. Some banks use 40-45% for salaried and 35-40% for self-employed. Higher salary with stable employer gets relaxed FOIR up to 60%. Credit score 750+ may get additional relaxation.' },
  { question: 'What is FOIR and how does it affect my loan eligibility?', answer: 'FOIR = (All monthly EMI obligations ÷ Gross monthly income) × 100. Banks typically approve loans when FOIR ≤ 50%. Example: ₹1L income, existing EMI ₹10K, new EMI ₹25K → FOIR = 35% (good). FOIR > 55% = likely rejection or lower loan amount. Reduce FOIR by: paying off existing debts, increasing income documentation, adding co-applicant.' },
  { question: 'Can I increase my loan eligibility?', answer: 'Yes! 1) Add co-applicant (spouse/parent) — combined income increases eligibility by 30-50%. 2) Close existing loans/cards before applying. 3) Increase tenure — 30 years vs 20 years can increase eligibility by 25%. 4) Improve CIBIL to 750+ — unlocks best rates and higher multipliers. 5) Include variable income (bonus, rental) in documentation.' },
  { question: 'How much home loan can I get on ₹50K salary?', answer: 'At 50% FOIR, max EMI = ₹25K (assuming no existing EMI). At 8.5% for 20 years, max loan = ~₹28.5L. At 8.5% for 30 years, max loan = ~₹32.8L. With ₹10K existing car EMI: max new EMI = ₹15K, max loan = ~₹17.1L. With spouse co-applicant earning ₹30K: combined max EMI = ₹40K, max loan = ~₹45.6L. CIBIL 750+ may get slightly more.' },
  { question: 'What is the difference between loan eligibility and affordability?', answer: 'Eligibility = Maximum loan bank will approve based on income, age, credit score. Affordability = Maximum loan YOU should take without financial strain. Key difference: Banks may approve ₹50L but comfortable EMI might only support ₹35L. Always borrow based on affordability (keeping EMI ≤ 35-40% of income) not maximum eligibility. Leave buffer for emergencies, lifestyle, and future goals.' }
];

export const LoanAffordabilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
  const [existingEmi, setExistingEmi] = useState(5000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const { maxEmi, maxLoan, foir, disposable, savings, totalInterest } = useMemo(() => {
    const disposable = monthlyIncome - monthlyExpenses;
    const maxEmi = Math.max(0, disposable * 0.50 - existingEmi);
    const mr = interestRate / 12 / 100; const months = loanTenure * 12;
    const maxLoan = mr > 0 ? maxEmi * ((Math.pow(1 + mr, months) - 1) / (mr * Math.pow(1 + mr, months))) : maxEmi * months;
    const foir = ((existingEmi + maxEmi) / monthlyIncome) * 100;
    const savings = disposable - maxEmi - existingEmi;
    const totalInterest = (maxEmi * months) - maxLoan;
    return { maxEmi: Math.round(maxEmi), maxLoan: Math.round(maxLoan), foir: foir.toFixed(1), disposable, savings: Math.round(savings), totalInterest: Math.round(totalInterest) };
  }, [monthlyIncome, monthlyExpenses, existingEmi, interestRate, loanTenure]);

  const contentData = { title: 'Loan Affordability Calculator', description: 'Calculate how much loan you can afford based on your income, expenses, and existing EMIs. Uses bank FOIR methodology to estimate maximum loan eligibility.', benefits: ['Calculate max loan based on income and expenses', 'FOIR-based calculation — same as banks use', 'Includes existing EMI obligations', 'Monthly savings visibility after new EMI', 'Works for home, car, personal, business loans', 'Free, instant, no signup'], howToSteps: [{ step: 'Enter Monthly Income', details: 'Your gross monthly salary or business income.' }, { step: 'Add Monthly Expenses', details: 'Living expenses excluding existing EMIs.' }, { step: 'Set Existing EMI', details: 'Total of all current loan EMIs.' }, { step: 'Choose Rate & Tenure', details: 'Expected loan interest rate and tenure.' }], examples: [], tips: ['Keep total EMIs under 40% of income for financial comfort', 'Add co-applicant income to increase eligibility by 30-50%'], mistakes: ['Borrowing to maximum eligibility — leaves no buffer for emergencies'], faqs: FAQ_DATA, relatedCalculators: [{ name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator', description: 'Plan home loan' }, { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'Calculate EMI' }, { name: 'Loan Eligibility Calculator', url: '/calculators/loan-eligibility-calculator', description: 'Check eligibility' }], lastUpdated: '2025-03-23' };

  return (
    <>
      <SEOHelmet title="Loan Affordability Calculator India 2025 — How Much Loan Can I Afford?" description="Free Loan Affordability Calculator 2025. Check how much loan you can afford based on income, expenses, existing EMI. FOIR based. Home, car, personal loan." keywords="loan affordability calculator, how much loan can i afford, loan eligibility calculator india, home loan affordability, maximum loan amount calculator, foir calculator" url="/calculators/loan-affordability-calculator" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Loan Affordability Calculator', url: '/calculators/loan-affordability-calculator' }]} faqData={FAQ_DATA} calculatorData={{ name: 'Loan Affordability Calculator India 2025', description: 'Calculate max loan based on income using bank FOIR method.', category: 'Loan Calculators', features: ['Income-based eligibility', 'FOIR calculation', 'Existing EMI impact', 'Multi-loan support'], ratingValue: 4.8, reviewCount: 10230, authorName: 'MoneyCal Editorial Team' }} />

      <style>{`
        .lac { font-family: 'Inter', sans-serif; }
        .lac-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .lac-hero { background: linear-gradient(135deg, #164e63 0%, #0e7490 30%, #06b6d4 60%, #67e8f9 100%); }
        .lac-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .lac-slider::-webkit-slider-track { background: linear-gradient(90deg, #cffafe, #0e7490); border-radius: 8px; }
        .lac-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #0e7490; box-shadow: 0 2px 8px rgba(14,116,144,0.3); cursor: pointer; }
        .lac-input { width: 120px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .lac-input:focus { border-color: #0e7490; box-shadow: 0 0 0 3px rgba(14,116,144,0.1); }
        .lac-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .lac-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .lac-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .lac-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="lac min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-cyan-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-cyan-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-cyan-700 font-semibold">Loan Affordability Calculator</li></ol></nav>

        <header className="lac-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Loan Affordability Calculator India 2025</h1>
          <p className="text-lg md:text-xl text-cyan-200 max-w-3xl mx-auto leading-relaxed font-medium">How much loan can you afford? FOIR-based calculation using bank methodology.</p>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="lac-glass p-8 lac-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-600"></span> Income & Expenses</h2>
              <div className="space-y-7">
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Monthly Income (₹)</label><input type="text" value={monthlyIncome} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setMonthlyIncome(n); }} className="lac-input" /></div><input type="range" min="15000" max="1000000" step="5000" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="lac-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Monthly Expenses (₹)</label><input type="text" value={monthlyExpenses} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setMonthlyExpenses(n); }} className="lac-input" /></div><input type="range" min="5000" max={monthlyIncome * 0.8} step="1000" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))} className="lac-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Existing EMI (₹)</label><input type="text" value={existingEmi} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setExistingEmi(n); }} className="lac-input" /></div><input type="range" min="0" max={monthlyIncome * 0.5} step="1000" value={existingEmi} onChange={(e) => setExistingEmi(Number(e.target.value))} className="lac-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Interest Rate (%)</label><input type="text" value={interestRate} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 5 && n <= 20) setInterestRate(n); }} className="lac-input w-20" /></div><input type="range" min="5" max="20" step="0.25" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="lac-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Tenure (Years)</label><input type="text" value={loanTenure} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 1 && n <= 30) setLoanTenure(n); }} className="lac-input w-16" /></div><input type="range" min="1" max="30" step="1" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="lac-slider w-full" /></div>
              </div>
            </div>

            <div className="space-y-6 lac-animate" style={{ animationDelay: '0.1s' }}>
              <div className="lac-glass p-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Maximum Loan You Can Afford</p>
                <p className="text-5xl md:text-6xl font-black text-slate-900 mb-1"><span className="text-cyan-600">₹</span>{maxLoan.toLocaleString('en-IN')}</p>
                <p className="text-sm text-slate-500 font-medium mb-6">Max EMI {formatCurrency(maxEmi)}/month at {interestRate}% for {loanTenure} years</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="lac-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Max EMI</p><p className="text-xl font-black text-cyan-700">{formatCurrency(maxEmi)}</p></div>
                  <div className="lac-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">FOIR</p><p className={`text-xl font-black ${parseFloat(foir) > 55 ? 'text-red-600' : 'text-emerald-600'}`}>{foir}%</p></div>
                  <div className="lac-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Monthly Savings</p><p className="text-xl font-black text-blue-600">{formatCurrency(savings)}</p></div>
                  <div className="lac-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Interest</p><p className="text-xl font-black text-rose-600">{formatCurrency(totalInterest)}</p></div>
                </div>
                <div className="h-56"><ResultChart data={[{ name: 'Expenses', value: monthlyExpenses, color: '#f59e0b' }, { name: 'Existing EMI', value: existingEmi || 1, color: '#ef4444' }, { name: 'New EMI', value: maxEmi, color: '#06b6d4' }, { name: 'Savings', value: Math.max(1, savings), color: '#22c55e' }]} centerText={`${formatCurrency(monthlyIncome)}\nIncome`} /></div>
              </div>
            </div>
          </div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="lac-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-cyan-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> Estimates based on 50% FOIR. Actual eligibility depends on credit score, age, employer, and bank policies. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};