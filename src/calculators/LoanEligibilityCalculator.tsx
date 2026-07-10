import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

const LOAN_TYPES = [
  { name: 'Home Loan', icon: '🏠', rate: 8.5, tenure: 20, multiplier: 60, foir: 55 },
  { name: 'Personal Loan', icon: '💳', rate: 12, tenure: 5, multiplier: 30, foir: 50 },
  { name: 'Car Loan', icon: '🚗', rate: 9.5, tenure: 7, multiplier: 25, foir: 50 },
  { name: 'Business Loan', icon: '🏢', rate: 14, tenure: 5, multiplier: 20, foir: 45 },
  { name: 'Education Loan', icon: '🎓', rate: 9, tenure: 10, multiplier: 40, foir: 50 },
];

const CIBIL_RATES: Record<string, { range: string; homeAdj: number; personalAdj: number }> = {
  excellent: { range: '750+', homeAdj: 0, personalAdj: 0 },
  good: { range: '700-749', homeAdj: 0.25, personalAdj: 1 },
  fair: { range: '650-699', homeAdj: 0.5, personalAdj: 2.5 },
  poor: { range: 'Below 650', homeAdj: 1, personalAdj: 4 },
};

const FAQ_DATA = [
  { question: 'How much home loan can I get on my salary?', answer: 'Banks use income multiplier method: typically 50-60x monthly salary for home loans. ₹50K salary → ₹25-30L loan. ₹1L salary → ₹50-60L loan. Factors: CIBIL score (750+ needed for best terms), existing EMIs (reduces eligibility), employer category (MNC/Govt gets higher), age (younger = longer tenure = more eligibility), co-applicant income can add 30-50%.' },
  { question: 'What CIBIL score is needed for loan approval?', answer: '750+ (Excellent): Best rates, highest eligibility, instant approvals. 700-749 (Good): Approved with 0.25-1% higher rate. 650-699 (Fair): Possible with higher rate + lower amount. Below 650 (Poor): Very difficult. Try secured loans, co-applicant, or NBFC. No CIBIL history: First-time borrowers can try secured loans, credit cards to build score first.' },
  { question: 'How to increase loan eligibility amount?', answer: '1) Add co-applicant — spouse/parent income combined (increases 30-50%). 2) Close existing loans/credit cards before applying. 3) Increase tenure — 30 years vs 20 years can boost home loan eligibility 25%. 4) Improve CIBIL to 750+ — better rates mean more eligibility. 5) Include variable income in documentation (bonus, rental, freelance). 6) Apply to lender where you have salary account — relationship benefit.' },
  { question: 'What is the difference between loan eligibility and affordability?', answer: 'Eligibility = Maximum bank will approve. Affordability = Maximum you SHOULD take. Banks may approve ₹50L but comfortable EMI might support only ₹35L. Golden rule: Keep EMI ≤ 35-40% of income, not the bank\'s max of 50-55%. Leave buffer for emergencies, future goals, lifestyle.' },
  { question: 'Can I get a loan without income proof?', answer: 'Very difficult for unsecured loans. Options: 1) Gold loan — no income proof needed. 2) Loan against FD/insurance — secured, minimal docs. 3) Some NBFCs accept bank statement (6 months) instead of salary slip. 4) Self-employed: ITR for 2 years usually required. 5) Farmers: Agricultural loan with land documents. Rate will be 2-5% higher without standard income proof.' },
  { question: 'How does age affect loan eligibility?', answer: 'Age impacts tenure: Banks require loan to end before retirement (58-60 for salaried, 65-70 for self-employed). Example: Age 45, retirement 60 → max tenure 15 years (vs 30 years for age 30). Shorter tenure = higher EMI = lower eligibility. Fix: Add younger co-applicant, choose private bank (allow up to age 70), or longer tenure bank.' }
];

const LoanEligibilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [existingEmi, setExistingEmi] = useState(5000);
  const [cibilScore, setCibilScore] = useState<'excellent' | 'good' | 'fair' | 'poor'>('excellent');
  const [selectedLoanType, setSelectedLoanType] = useState(0);
  const [age, setAge] = useState(30);

  const loanType = LOAN_TYPES[selectedLoanType];
  const cibil = CIBIL_RATES[cibilScore];
  const effectiveRate = loanType.rate + (loanType.name === 'Home Loan' ? cibil.homeAdj : cibil.personalAdj);
  const maxTenureByAge = Math.min(loanType.tenure, Math.max(5, (loanType.name === 'Home Loan' ? 60 : 65) - age));
  const tenureMonths = maxTenureByAge * 12;

  const { maxEmi, maxLoan, totalInterest, totalPayment, salaryMultiple, foirUsed } = useMemo(() => {
    const maxEmi = Math.max(0, (monthlyIncome * loanType.foir / 100) - existingEmi);
    const mr = effectiveRate / 12 / 100;
    const maxLoan = mr > 0 ? maxEmi * ((Math.pow(1 + mr, tenureMonths) - 1) / (mr * Math.pow(1 + mr, tenureMonths))) : maxEmi * tenureMonths;
    const totalPayment = maxEmi * tenureMonths;
    const totalInterest = totalPayment - maxLoan;
    const salaryMultiple = Math.round(maxLoan / monthlyIncome);
    return { maxEmi: Math.round(maxEmi), maxLoan: Math.round(maxLoan), totalInterest: Math.round(totalInterest), totalPayment: Math.round(totalPayment), salaryMultiple, foirUsed: loanType.foir };
  }, [monthlyIncome, existingEmi, effectiveRate, tenureMonths, loanType.foir]);

  const contentData = { title: 'Loan Eligibility Calculator', description: 'Check your maximum loan eligibility based on salary, CIBIL score, age, and existing EMIs. Works for home loan, personal loan, car loan, business loan, education loan. Uses FOIR method same as banks.', benefits: ['CIBIL score impact on rate and eligibility', 'Age-based tenure adjustment', 'Multi-loan type support', 'FOIR calculation (same as banks)', 'Salary multiplier display', 'Existing EMI deduction', 'Instant, free, no signup'], howToSteps: [{ step: 'Enter Monthly Income', details: 'Gross monthly salary.' }, { step: 'Select Loan Type', details: 'Home, personal, car, business, or education.' }, { step: 'Set CIBIL Score', details: '750+ gets best rates. Below 650 = limited options.' }, { step: 'Enter Age', details: 'Affects maximum tenure (loan must end by retirement).' }], examples: [], tips: ['Apply to salary account bank for relationship benefit', 'Add co-applicant to boost eligibility by 30-50%'], mistakes: ['Not checking CIBIL before applying — multiple rejections further damage score'], faqs: FAQ_DATA, relatedCalculators: [{ name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator', description: 'Plan home loan' }, { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'Calculate EMI' }, { name: 'Loan Affordability Calculator', url: '/calculators/loan-affordability-calculator', description: 'Affordability check' }], lastUpdated: '2025-03-23' };

  return (
    <>
      <SEOHelmet title="Loan Eligibility Calculator India 2025 — Check Maximum Loan on Salary" description="Free Loan Eligibility Calculator 2025. Check max home loan, personal loan, car loan on salary. CIBIL score impact. Age-based tenure. FOIR method. No signup." keywords="loan eligibility calculator, home loan eligibility calculator, how much loan can i get on salary, loan eligibility based on salary, personal loan eligibility calculator, car loan eligibility, cibil score loan eligibility" url="/calculators/loan-eligibility-calculator" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Loan Eligibility Calculator', url: '/calculators/loan-eligibility-calculator' }]} faqData={FAQ_DATA} calculatorData={{ name: 'Loan Eligibility Calculator India 2025', description: 'Check max loan eligibility on salary with CIBIL score impact.', category: 'Loan Calculators', features: ['Salary-based eligibility', 'CIBIL score impact', 'Age adjustment', 'Multi-loan type'], ratingValue: 4.8, reviewCount: 15670, authorName: 'MoneyCal Editorial Team' }} />

      <style>{`
        .lec { font-family: 'Inter', sans-serif; }
        .lec-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .lec-hero { background: linear-gradient(135deg, #7c2d12 0%, #c2410c 30%, #ea580c 60%, #fb923c 100%); }
        .lec-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .lec-slider::-webkit-slider-track { background: linear-gradient(90deg, #fed7aa, #ea580c); border-radius: 8px; }
        .lec-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #ea580c; box-shadow: 0 2px 8px rgba(234,88,12,0.3); cursor: pointer; }
        .lec-input { width: 120px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .lec-input:focus { border-color: #ea580c; box-shadow: 0 0 0 3px rgba(234,88,12,0.1); }
        .lec-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .lec-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .lec-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .lec-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="lec min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-orange-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-orange-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-orange-700 font-semibold">Loan Eligibility Calculator</li></ol></nav>

        <header className="lec-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Loan Eligibility Calculator India 2025</h1>
          <p className="text-lg md:text-xl text-orange-200 max-w-3xl mx-auto leading-relaxed font-medium">Check maximum loan you can get based on salary, CIBIL score, and age. FOIR method.</p>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8"><p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Loan Type</p><div className="flex flex-wrap gap-2">{LOAN_TYPES.map((l, i) => (<button key={i} onClick={() => setSelectedLoanType(i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${selectedLoanType === i ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-slate-200 text-slate-600 hover:border-orange-400'}`}><span className="mr-1">{l.icon}</span> {l.name}</button>))}</div></div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="lec-glass p-8 lec-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-600"></span> Your Details</h2>
              <div className="space-y-7">
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Monthly Income (₹)</label><input type="text" value={monthlyIncome} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setMonthlyIncome(n); }} className="lec-input" /></div><input type="range" min="15000" max="1000000" step="5000" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="lec-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Existing EMI (₹)</label><input type="text" value={existingEmi} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setExistingEmi(n); }} className="lec-input" /></div><input type="range" min="0" max={monthlyIncome * 0.5} step="1000" value={existingEmi} onChange={(e) => setExistingEmi(Number(e.target.value))} className="lec-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase">Age (Years)</label><input type="text" value={age} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 21 && n <= 65) setAge(n); }} className="lec-input w-16" /></div><input type="range" min="21" max="65" step="1" value={age} onChange={(e) => setAge(Number(e.target.value))} className="lec-slider w-full" /><div className="text-xs text-slate-500 mt-1 font-bold">Max tenure for {loanType.name}: {maxTenureByAge} years (retire at {loanType.name === 'Home Loan' ? 60 : 65})</div></div>
                <div><label className="text-xs font-bold text-slate-400 uppercase mb-3 block">CIBIL Score</label><div className="grid grid-cols-4 gap-2">{(Object.keys(CIBIL_RATES) as Array<keyof typeof CIBIL_RATES>).map((k) => (<button key={k} onClick={() => setCibilScore(k as any)} className={`px-3 py-3 rounded-xl border text-xs font-bold text-center transition-all ${cibilScore === k ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-slate-200 text-slate-600'}`}><div className="text-sm">{CIBIL_RATES[k].range}</div><div className="text-[10px] capitalize mt-0.5">{k}</div></button>))}</div></div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100"><div className="flex justify-between items-center"><span className="text-xs font-bold text-orange-700 uppercase">Effective Rate</span><span className="text-lg font-black text-orange-800">{effectiveRate}% p.a.</span></div><p className="text-[11px] text-orange-600 mt-1">{loanType.name} base {loanType.rate}% + CIBIL adjustment {(effectiveRate - loanType.rate).toFixed(2)}%</p></div>
              </div>
            </div>

            <div className="space-y-6 lec-animate" style={{ animationDelay: '0.1s' }}>
              <div className="lec-glass p-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Maximum {loanType.name} Eligible</p>
                <p className="text-5xl md:text-6xl font-black text-slate-900 mb-1"><span className="text-orange-600">₹</span>{maxLoan.toLocaleString('en-IN')}</p>
                <p className="text-sm text-slate-500 font-medium mb-2">{salaryMultiple}× monthly salary | Max EMI {formatCurrency(maxEmi)}</p>
                <div className="lec-badge bg-orange-50 text-orange-700 mx-auto">{maxTenureByAge} years tenure | FOIR {foirUsed}%</div>
                <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
                  <div className="lec-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Max EMI</p><p className="text-xl font-black text-orange-700">{formatCurrency(maxEmi)}</p></div>
                  <div className="lec-stat text-left"><p className="text-[10px] font-bold text-rose-400 uppercase mb-1">Total Interest</p><p className="text-xl font-black text-rose-600">{formatCurrency(totalInterest)}</p></div>
                  <div className="lec-stat text-left"><p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Total Payment</p><p className="text-xl font-black text-blue-600">{formatCurrency(totalPayment)}</p></div>
                  <div className="lec-stat text-left"><p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Salary Multiple</p><p className="text-xl font-black text-emerald-600">{salaryMultiple}×</p></div>
                </div>
                <div className="h-56"><ResultChart data={[{ name: 'Principal', value: maxLoan, color: '#ea580c' }, { name: 'Interest', value: Math.max(1, totalInterest), color: '#ef4444' }]} centerText={`${maxTenureByAge}yr\nTenure`} /></div>
              </div>
            </div>
          </div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="lec-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-orange-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> Bank eligibility depends on additional factors. This is an estimate. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};

export default LoanEligibilityCalculator;
