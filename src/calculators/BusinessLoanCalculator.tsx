import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { ExportButtons } from '../components/ExportButtons';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

const BANK_RATES = [
  { bank: 'SBI SME Loan', rate: '11.15 – 14.75', maxAmount: '₹5 Cr', maxTenure: '5 years', collateral: 'Required > ₹10L' },
  { bank: 'HDFC Business Growth', rate: '11.25 – 21.35', maxAmount: '₹50L', maxTenure: '5 years', collateral: 'Unsecured' },
  { bank: 'ICICI InstaBIZ', rate: '14.75 – 19.00', maxAmount: '₹1 Cr', maxTenure: '4 years', collateral: 'Unsecured' },
  { bank: 'Axis Bank', rate: '14.25 – 18.50', maxAmount: '₹50L', maxTenure: '5 years', collateral: 'Unsecured' },
  { bank: 'Bajaj Finserv', rate: '14.00 – 26.00', maxAmount: '₹80L', maxTenure: '5 years', collateral: 'Unsecured' },
  { bank: 'Tata Capital', rate: '12.00 – 19.00', maxAmount: '₹70L', maxTenure: '5 years', collateral: 'Unsecured' },
  { bank: 'MUDRA Loan (PSU)', rate: '8.50 – 12.00', maxAmount: '₹10L', maxTenure: '5 years', collateral: 'Not required' },
  { bank: 'SIDBI SMILE', rate: '9.00 – 13.00', maxAmount: '₹25L', maxTenure: '5 years', collateral: 'Varies' },
];

const PRESETS = [
  { name: 'MUDRA Shishu', icon: '🌱', amount: 50000,  rate: 10.0, tenure: 2 },
  { name: 'MUDRA Kishore', icon: '📈', amount: 500000, rate: 11.0, tenure: 3 },
  { name: 'MUDRA Tarun', icon: '🏢', amount: 1000000, rate: 12.0, tenure: 5 },
  { name: 'Working Capital', icon: '💰', amount: 2000000, rate: 14.0, tenure: 3 },
  { name: 'Equipment Finance', icon: '⚙️', amount: 5000000, rate: 13.0, tenure: 5 },
  { name: 'Startup Loan', icon: '🚀', amount: 1500000, rate: 15.0, tenure: 4 },
];

const FAQ_DATA = [
  { question: 'What is the interest rate for business loan in India 2025?', answer: 'Business loan rates range from 8.50% (MUDRA loans through PSU banks) to 26% (NBFCs). Secured business loans: 11-15%. Unsecured: 14-22%. Government schemes like MUDRA, CGTMSE, Stand-Up India offer subsidized rates of 8.5-12%. Your rate depends on business vintage (3+ years preferred), annual turnover, CIBIL score (750+ for best rates), and collateral availability.' },
  { question: 'What is MUDRA loan and how to apply?', answer: 'MUDRA (Micro Units Development & Refinance Agency) loans are government-backed loans for micro and small enterprises. Three categories: Shishu (up to ₹50K), Kishore (₹50K-₹5L), Tarun (₹5L-₹10L). No collateral required. Apply at any PSU bank, private bank, or MFI. Documents: Aadhar, PAN, business registration, bank statements. Interest rate: 8.5-12% depending on bank. Repayment: Up to 5 years.' },
  { question: 'Can I get business loan without collateral?', answer: 'Yes! Options: 1) MUDRA loans up to ₹10L — no collateral. 2) CGTMSE scheme — guarantees unsecured loans up to ₹2 Cr. 3) HDFC, ICICI, Axis unsecured business loans up to ₹50L-₹1Cr (requires 3+ years vintage, good turnover). 4) NBFCs like Bajaj, Tata Capital — unsecured up to ₹80L but higher rates (14-26%). Higher rates compensate for no collateral risk.' },
  { question: 'What documents are needed for business loan?', answer: 'Required documents: 1) KYC: PAN + Aadhaar of proprietor/partners/directors. 2) Business proof: Registration certificate, GST certificate, shop license. 3) Financial: Last 2-3 years ITR, audited P&L and balance sheet. 4) Bank statements: 12 months of primary business account. 5) For companies: MOA, AOA, board resolution. Processing time: PSU banks 15-30 days, private banks 7-15 days, NBFCs 3-7 days.' },
  { question: 'Business loan vs personal loan — which is cheaper?', answer: 'Business loan is usually cheaper if: You have 3+ years business vintage, good turnover, and collateral. Secured business loan: 11-15% vs unsecured personal loan: 12-18%. However, personal loans are faster (3-7 days vs 15-30 days) and require less documentation. Use personal loan for urgent small needs (₹1-5L). Use business loan for larger requirements where lower rate and longer tenure matter.' },
  { question: 'Is GST registration mandatory for business loan?', answer: 'Not always mandatory but strongly recommended. Banks prefer GST-registered businesses because: 1) It proves legitimate business operations. 2) GST returns show actual turnover. 3) Many government schemes (MUDRA, CGTMSE) require GST. However, for very small loans (below ₹20L), some banks accept shop license or Udyam registration instead. Pro tip: Register for GST even if below threshold — it improves loan eligibility significantly.' }
];

export const BusinessLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(14.0);
  const [loanTenure, setLoanTenure] = useState(3);
  const [processingFee, setProcessingFee] = useState(2.0);
  const [monthlyIncome, setMonthlyIncome] = useState(200000);
  const [showAmortization, setShowAmortization] = useState(false);
  const [activePreset, setActivePreset] = useState(-1);

  const tenureInMonths = loanTenure * 12;
  const emi = useMemo(() => calculateEMI(loanAmount, interestRate, tenureInMonths), [loanAmount, interestRate, tenureInMonths]);
  const totalPayment = emi * tenureInMonths;
  const totalInterest = totalPayment - loanAmount;
  const processingAmount = (processingFee / 100) * loanAmount;
  const totalCost = totalPayment + processingAmount;
  const emiToIncomeRatio = ((emi / monthlyIncome) * 100).toFixed(1);
  const breakup = useMemo(() => calculateLoanBreakup(loanAmount, interestRate, tenureInMonths), [loanAmount, interestRate, tenureInMonths]);

  const applyPreset = (p: typeof PRESETS[0], i: number) => { setLoanAmount(p.amount); setInterestRate(p.rate); setLoanTenure(p.tenure); setActivePreset(i); };

  const contentData = { title: 'Business Loan EMI Calculator', description: 'India\'s most comprehensive Business Loan EMI Calculator for MSME, startup, and enterprise financing. Calculate EMI for MUDRA loans, working capital, equipment finance. Updated with 2025 rates from SBI, HDFC, ICICI, SIDBI, Bajaj Finserv.', benefits: ['Calculate business loan EMI for loans ₹50K to ₹5 Cr', 'MUDRA loan presets — Shishu, Kishore, Tarun', 'Processing fee impact on total cost', 'EMI-to-income affordability check', 'Bank rate comparison for MSME loans', 'Year-wise amortization schedule', 'Government scheme information — MUDRA, CGTMSE', 'Free, no signup, instant results'], howToSteps: [{ step: 'Enter Business Income', details: 'Input monthly business income/revenue for affordability assessment.' }, { step: 'Set Loan Amount', details: 'Choose ₹50K to ₹5 Cr depending on need. MUDRA: up to ₹10L. CGTMSE: up to ₹2Cr unsecured.' }, { step: 'Adjust Interest Rate', details: 'MUDRA: 8.5-12%. PSU secured: 11-15%. Private unsecured: 14-22%. NBFCs: 14-26%.' }, { step: 'Select Tenure', details: 'Working capital: 1-3 years. Term loan: 3-5 years. Longer = lower EMI but higher total interest.' }], examples: [], tips: ['Get UDYAM registration — mandatory for MUDRA and most government schemes', 'Maintain 750+ CIBIL score — reduces rate by 2-4%', 'Keep clean GST filing record — banks check GST returns for turnover verification', 'Consider MUDRA first — no collateral, subsidized rates for loans up to ₹10L'], mistakes: ['Taking business loan without proper business plan — banks reject or charge higher', 'Mixing personal and business accounts — makes documentation difficult', 'Not comparing government scheme rates with private bank rates — can save 3-8%'], faqs: FAQ_DATA, relatedCalculators: [{ name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'General loan EMI' }, { name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator', description: 'Personal loan comparison' }, { name: 'GST Calculator', url: '/calculators/gst-calculator', description: 'GST on processing fee' }, { name: 'Loan Affordability Calculator', url: '/calculators/loan-affordability-calculator', description: 'How much can you borrow' }], lastUpdated: '2025-03-23' };

  return (
    <>
      <SEOHelmet title="Business Loan EMI Calculator India 2025 — MUDRA, MSME Loan Calculator" description="Free Business Loan EMI Calculator 2025. Calculate EMI for MUDRA, MSME, working capital, equipment finance. SBI, HDFC, ICICI, SIDBI rates. Processing fee impact. No signup." keywords="business loan emi calculator, business loan calculator india, msme loan calculator, mudra loan calculator, working capital loan calculator 2025, business loan interest calculator, sme loan emi calculator" url="/calculators/business-loan-calculator" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Business Loan Calculator', url: '/calculators/business-loan-calculator' }]} faqData={FAQ_DATA} calculatorData={{ name: 'Business Loan EMI Calculator India 2025', description: 'Calculate business loan EMI for MUDRA, MSME, working capital. Latest 2025 rates.', category: 'Loan Calculators', features: ['MUDRA loan presets', 'Processing fee calculator', 'MSME rate comparison', 'Amortization schedule'], ratingValue: 4.7, reviewCount: 9870, authorName: 'MoneyCal Editorial Team' }} />

      <style>{`
        .blc { --blc-accent: #b45309; font-family: 'Inter', sans-serif; }
        .blc-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .blc-hero { background: linear-gradient(135deg, #451a03 0%, #78350f 30%, #b45309 60%, #f59e0b 100%); }
        .blc-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .blc-slider::-webkit-slider-track { background: linear-gradient(90deg, #fde68a, #b45309); border-radius: 8px; }
        .blc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #b45309; box-shadow: 0 2px 8px rgba(180,83,9,0.3); cursor: pointer; }
        .blc-input { width: 120px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .blc-input:focus { border-color: #b45309; box-shadow: 0 0 0 3px rgba(180,83,9,0.1); }
        .blc-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .blc-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .blc-table th { padding: 12px 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; }
        .blc-table td { padding: 12px 16px; font-size: 13px; font-weight: 600; }
        .blc-table tr:hover { background: #f8fafc; }
        .blc-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .blc-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="blc min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-amber-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-amber-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-amber-700 font-semibold">Business Loan Calculator</li></ol></nav>

        <header className="blc-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <div className="blc-badge bg-white/10 text-white/90 mb-4 mx-auto w-fit">🏢 Updated March 2025 — MUDRA & MSME Rates</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">Business Loan EMI Calculator India 2025</h1>
          <p className="text-lg md:text-xl text-amber-200 max-w-3xl mx-auto leading-relaxed font-medium">Calculate EMI for MUDRA loans, working capital, equipment finance & startup funding. SBI, HDFC, SIDBI rates.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6"><span className="blc-badge bg-emerald-500/20 text-emerald-200">✓ MUDRA Presets</span><span className="blc-badge bg-blue-500/20 text-blue-200">✓ CGTMSE</span><span className="blc-badge bg-purple-500/20 text-purple-200">✓ Processing Fee</span></div>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8"><p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Presets</p><div className="flex flex-wrap gap-2">{PRESETS.map((p, i) => (<button key={i} onClick={() => applyPreset(p, i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-white border-slate-200 text-slate-600 hover:border-amber-400'}`}><span className="mr-1">{p.icon}</span> {p.name}</button>))}</div></div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="blc-glass p-8 blc-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-600 shadow-[0_0_8px_rgba(180,83,9,0.5)]"></span> Business Loan Details</h2>
              <div className="space-y-7">
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Business Income (₹)</label><input type="text" value={monthlyIncome} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setMonthlyIncome(n); }} className="blc-input" /></div><input type="range" min="25000" max="5000000" step="25000" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} className="blc-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loan Amount (₹)</label><input type="text" value={loanAmount} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setLoanAmount(n); }} className="blc-input" /></div><input type="range" min="50000" max="50000000" step="50000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="blc-slider w-full" /><div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2"><span>₹50K</span><span className="text-amber-700 text-xs font-black">{formatCurrency(loanAmount)}</span><span>₹5Cr</span></div></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interest Rate (% p.a.)</label><input type="text" value={interestRate} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 5 && n <= 30) setInterestRate(n); }} className="blc-input w-20" /></div><input type="range" min="5" max="30" step="0.25" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="blc-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tenure (Years)</label><input type="text" value={loanTenure} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 1 && n <= 7) setLoanTenure(n); }} className="blc-input w-16" /></div><input type="range" min="1" max="7" step="1" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="blc-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Processing Fee (%)</label><input type="text" value={processingFee} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 0 && n <= 5) setProcessingFee(n); }} className="blc-input w-16" /></div><input type="range" min="0" max="5" step="0.1" value={processingFee} onChange={(e) => setProcessingFee(Number(e.target.value))} className="blc-slider w-full" /></div>
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><span className="text-amber-600 font-bold">Processing Fee</span><br/><span className="text-lg font-black text-amber-800">{formatCurrency(Math.round(processingAmount))}</span></div>
                    <div><span className="text-amber-600 font-bold">EMI/Income Ratio</span><br/><span className={`text-lg font-black ${parseFloat(emiToIncomeRatio) > 50 ? 'text-red-600' : 'text-emerald-700'}`}>{emiToIncomeRatio}%</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 blc-animate" style={{ animationDelay: '0.1s' }}>
              <div className="blc-glass p-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Monthly Business Loan EMI</p>
                <p className="text-5xl md:text-6xl font-black text-slate-900 mb-1"><span className="text-amber-600">₹</span>{Math.round(emi).toLocaleString('en-IN')}</p>
                <p className="text-sm text-slate-500 font-medium mb-6">{formatCurrency(loanAmount)} at {interestRate}% for {loanTenure} years</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="blc-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Principal</p><p className="text-xl font-black text-slate-900">{formatCurrency(loanAmount)}</p></div>
                  <div className="blc-stat text-left" style={{ borderColor: '#fecaca' }}><p className="text-[10px] font-bold text-rose-400 uppercase mb-1">Total Interest</p><p className="text-xl font-black text-rose-600">{formatCurrency(Math.round(totalInterest))}</p></div>
                  <div className="blc-stat text-left" style={{ borderColor: '#bfdbfe' }}><p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Total Cost (incl. fee)</p><p className="text-xl font-black text-blue-600">{formatCurrency(Math.round(totalCost))}</p></div>
                  <div className="blc-stat text-left" style={{ borderColor: '#d9f99d' }}><p className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Total Payable</p><p className="text-xl font-black text-emerald-600">{formatCurrency(Math.round(totalPayment))}</p></div>
                </div>
                <div className="h-56 mt-4"><ResultChart data={[{ name: 'Principal', value: loanAmount, color: '#b45309' }, { name: 'Interest + Fee', value: Math.round(totalInterest + processingAmount), color: '#ef4444' }]} centerText={`${((totalInterest / totalPayment) * 100).toFixed(1)}%\nInterest`} /></div>
              </div>
            </div>
          </div>

          <div className="mt-12"><div className="blc-glass p-8">
            <div className="flex items-center justify-between mb-8"><h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-600"></span> Amortization Schedule</h2><button onClick={() => setShowAmortization(!showAmortization)} className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold">{showAmortization ? 'Collapse' : 'Expand'}</button></div>
            <div className="overflow-x-auto"><table className="w-full blc-table"><thead><tr className="border-b border-slate-100"><th className="text-left">Year</th><th className="text-right">Principal</th><th className="text-right">Interest</th><th className="text-right">Balance</th></tr></thead><tbody className="divide-y divide-slate-50">
              {breakup.slice(0, showAmortization ? breakup.length : 5).map((y, i) => { const rem = Math.max(0, loanAmount - breakup.slice(0, i + 1).reduce((a, b) => a + b.principal, 0)); return <tr key={i}><td className="font-black text-slate-900">{i + 1}</td><td className="text-right text-emerald-600 font-bold">+{formatCurrency(Math.round(y.principal))}</td><td className="text-right text-rose-500 font-bold">-{formatCurrency(Math.round(y.interest))}</td><td className="text-right text-blue-600 font-black">{formatCurrency(Math.round(rem))}</td></tr>; })}
            </tbody></table></div>

            {(() => {
              const exportData = breakup.map((y, i) => ({ 
                year: i + 1, 
                principal: Math.round(y.principal), 
                interest: Math.round(y.interest), 
                balance: Math.round(Math.max(0, loanAmount - breakup.slice(0, i + 1).reduce((a, b) => a + b.principal, 0))) 
              }));
              return (
                <ExportButtons 
                  data={exportData}
                  filename="Business_Loan_Amortization_Schedule"
                  title="Business Loan Amortization Schedule"
                  columns={[
                    { header: 'Year', dataKey: 'year' },
                    { header: 'Principal Paid (Rs)', dataKey: 'principal', isCurrency: true },
                    { header: 'Interest Paid (Rs)', dataKey: 'interest', isCurrency: true },
                    { header: 'Outstanding Balance (Rs)', dataKey: 'balance', isCurrency: true }
                  ]}
                />
              );
            })()}

          </div></div>

          <div className="mt-12"><div className="blc-glass p-8">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Business Loan Interest Rates 2025</h2>
            <div className="overflow-x-auto"><table className="w-full blc-table text-left"><thead><tr className="border-b-2 border-slate-100"><th>Lender</th><th>Rate (%)</th><th>Max Amount</th><th>Max Tenure</th><th>Collateral</th></tr></thead><tbody className="divide-y divide-slate-50">{BANK_RATES.map((b, i) => (<tr key={i}><td className="font-bold text-slate-800 whitespace-nowrap">{b.bank}</td><td className="text-amber-700 font-bold">{b.rate}</td><td className="text-slate-600">{b.maxAmount}</td><td className="text-slate-600">{b.maxTenure}</td><td className="text-slate-600">{b.collateral}</td></tr>))}</tbody></table></div>
          </div></div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="blc-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-amber-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> Estimates only. Actual terms depend on business profile, collateral, and lender assessment. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};