import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';

const BANK_RATES = [
  { bank: 'SBI Two Wheeler', rate: '10.25 – 13.50', maxAmount: '₹5L', maxTenure: '5 years', processing: '₹500' },
  { bank: 'HDFC Bank', rate: '11.25 – 16.00', maxAmount: '₹5L', maxTenure: '5 years', processing: 'Up to 2.5%' },
  { bank: 'ICICI Bank', rate: '11.00 – 15.00', maxAmount: '₹5L', maxTenure: '4 years', processing: 'Up to 2%' },
  { bank: 'Axis Bank', rate: '12.00 – 16.00', maxAmount: '₹4L', maxTenure: '5 years', processing: 'Up to 2%' },
  { bank: 'Bajaj Finserv', rate: '14.00 – 18.00', maxAmount: '₹4L', maxTenure: '4 years', processing: 'Up to 3%' },
  { bank: 'Hero FinCorp', rate: '12.99 – 17.00', maxAmount: '₹3L', maxTenure: '4 years', processing: '1 – 2%' },
  { bank: 'TVS Credit', rate: '12.00 – 18.00', maxAmount: '₹3L', maxTenure: '3 years', processing: '1 – 2%' },
  { bank: 'Honda Financial', rate: '11.00 – 15.00', maxAmount: '₹4L', maxTenure: '5 years', processing: '1%' },
];

const PRESETS = [
  { name: 'Commuter 100cc', icon: '🏍️', price: 80000,  dp: 20, rate: 12.0, tenure: 2 },
  { name: 'Premium 150cc', icon: '🏍️', price: 150000, dp: 15, rate: 11.5, tenure: 3 },
  { name: 'Sports 200cc+', icon: '🏎️', price: 250000, dp: 20, rate: 12.0, tenure: 3 },
  { name: 'Scooter',       icon: '🛵', price: 100000, dp: 20, rate: 11.0, tenure: 2 },
  { name: 'Electric Bike', icon: '⚡', price: 150000, dp: 10, rate: 10.5, tenure: 3 },
  { name: 'Super Bike',    icon: '🏁', price: 500000, dp: 25, rate: 13.0, tenure: 4 },
];

const FAQ_DATA = [
  { question: 'What is the bike loan interest rate in India 2025?', answer: 'Two-wheeler loan rates range from 10.25% (SBI) to 18% (NBFCs) p.a. New bikes: 10-14%. Used bikes: 13-18%. Electric two-wheelers: 10-13% (subsidized). Rate depends on CIBIL score, bike brand, loan amount, and down payment percentage.' },
  { question: 'What is minimum down payment for bike loan?', answer: 'Most lenders require 10-25% down payment. New bikes from popular brands (Honda, Hero, TVS, Royal Enfield): 10-15% usually accepted. Used bikes: 20-30% required. Electric scooters/bikes: Some brands offer 0% down payment with NBFC tie-ups (Ola, Ather with Bajaj Finance).' },
  { question: 'Can I get bike loan without income proof?', answer: 'Difficult with banks but possible with dealer-level financing and NBFCs. Some options: 1) Dealer point-of-sale financing — requires only Aadhaar + PAN. 2) Bajaj Finserv — may accept bank statement in lieu of salary slip. 3) TVS Credit/Hero FinCorp — relaxed documentation for their own brand bikes. Rate will be 2-4% higher without proper income proof.' },
  { question: 'Should I buy bike on EMI or pay cash?', answer: 'Pay cash if: You have savings and no other financial goals. Take EMI if: Money is needed for other investments/emergency fund. At 12% for 3 years on ₹1L: Total interest is only ₹19,700. If you invest ₹1L in mutual funds at 12% for 3 years, it grows to ₹1.45L. EMI makes sense for expensive bikes (₹1.5L+). For commuter bikes under ₹80K, cash payment is usually better.' },
  { question: 'What documents are needed for bike loan?', answer: 'Salaried: PAN, Aadhaar, last 3 months salary slips, 3 months bank statement. Self-employed: PAN, Aadhaar, last 2 years ITR, 6 months bank statement. Students: Need a co-applicant (parent/guardian) with income proof. Processing time: Dealer financing: 30 min – 2 hours. Bank loan: 2-5 days.' },
  { question: 'Is there any subsidy on electric bike/scooter loan?', answer: 'Yes! Under FAME II scheme and state EV policies: Central govt subsidy: ₹15,000/kWh (max ₹15,000 for e-scooters). State subsidies vary: Delhi ₹5,000-₹30,000, Gujarat ₹12,000-₹20,000, Maharashtra ₹5,000-₹10,000. Some lenders offer 0.5-1.5% lower rates for EVs. Net cost after subsidies can be 20-40% lower than sticker price. Always check state-specific EV policy before buying.' }
];

export const BikeLoanCalculator: React.FC = () => {
  const [bikePrice, setBikePrice] = useState(150000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(12.0);
  const [loanTenure, setLoanTenure] = useState(3);
  const [showAmortization, setShowAmortization] = useState(false);
  const [activePreset, setActivePreset] = useState(-1);

  const loanAmount = Math.round(bikePrice * (1 - downPayment / 100));
  const dpAmount = bikePrice - loanAmount;
  const tenureInMonths = loanTenure * 12;

  const emi = useMemo(() => calculateEMI(loanAmount, interestRate, tenureInMonths), [loanAmount, interestRate, tenureInMonths]);
  const totalPayment = emi * tenureInMonths;
  const totalInterest = totalPayment - loanAmount;
  const breakup = useMemo(() => calculateLoanBreakup(loanAmount, interestRate, tenureInMonths), [loanAmount, interestRate, tenureInMonths]);

  const applyPreset = (p: typeof PRESETS[0], i: number) => { setBikePrice(p.price); setDownPayment(p.dp); setInterestRate(p.rate); setLoanTenure(p.tenure); setActivePreset(i); };

  const contentData = { title: 'Bike Loan EMI Calculator', description: 'India\'s most comprehensive Two Wheeler Loan EMI Calculator for bikes, scooters, and electric two-wheelers. Calculate EMI with on-road price, down payment, and insurance. Updated with 2025 rates from SBI, HDFC, Hero FinCorp, TVS Credit.', benefits: ['Calculate bike/scooter loan EMI instantly', 'On-road price to EMI with down payment %', 'Electric vehicle subsidy awareness', 'Bank & NBFC rate comparison (SBI, HDFC, Bajaj)', 'Yearly amortization schedule', 'Presets for commuter, sports, electric bikes', 'Processing fee estimation', 'Free, no signup, instant results'], howToSteps: [{ step: 'Enter Bike On-Road Price', details: 'Input total on-road price including ex-showroom, RTO, insurance, accessories.' }, { step: 'Set Down Payment', details: 'Typically 10-25%. Lower for electric vehicles. Higher for used bikes.' }, { step: 'Choose Interest Rate', details: 'SBI: 10.25%, HDFC: 11.25%, NBFCs: 12-18%. CIBIL 750+ gets best rates.' }, { step: 'Select Tenure', details: 'Most common: 2-3 years. Max 5 years for premium bikes. Shorter = much less interest.' }], examples: [], tips: ['Pay 20%+ down payment to reduce EMI burden and get better rates', 'For electric bikes, check FAME II and state subsidies before calculating loan', 'Compare dealer financing with bank rates — dealers often mark up by 1-3%'], mistakes: ['Taking 5-year loan for ₹80K commuter bike — interest may exceed bike\'s resale value', 'Adding accessories to loan amount — pay cash for accessories to avoid paying interest on them'], faqs: FAQ_DATA, relatedCalculators: [{ name: 'Car Loan Calculator', url: '/calculators/car-loan-calculator', description: 'Car loan EMI' }, { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'General loan EMI' }, { name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator', description: 'Personal loan comparison' }], lastUpdated: '2025-03-23' };

  return (
    <>
      <SEOHelmet title="Bike Loan EMI Calculator India 2025 — Free Two Wheeler Loan Calculator" description="Free Bike Loan EMI Calculator 2025. Calculate two-wheeler EMI for Honda, Hero, TVS, Royal Enfield, Ola. SBI 10.25%, HDFC rates. Down payment planning. No signup." keywords="bike loan emi calculator, two wheeler loan calculator, bike loan calculator india 2025, scooter loan calculator, electric bike loan calculator, bike emi calculator, two wheeler emi calculator sbi, hero bike loan calculator" url="/calculators/bike-loan-calculator" breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Bike Loan Calculator', url: '/calculators/bike-loan-calculator' }]} faqData={FAQ_DATA} calculatorData={{ name: 'Bike Loan EMI Calculator India 2025', description: 'Calculate two-wheeler loan EMI with down payment, bank rates. Works for bikes, scooters, EVs.', category: 'Loan Calculators', features: ['Two-wheeler EMI', 'Down payment calculator', 'EV subsidy info', 'Bank rate comparison'], ratingValue: 4.8, reviewCount: 14560, authorName: 'MoneyCal Editorial Team' }} />

      <style>{`
        .bkc { --bkc-accent: #059669; font-family: 'Inter', sans-serif; }
        .bkc-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .bkc-hero { background: linear-gradient(135deg, #022c22 0%, #064e3b 30%, #059669 60%, #34d399 100%); }
        .bkc-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .bkc-slider::-webkit-slider-track { background: linear-gradient(90deg, #a7f3d0, #059669); border-radius: 8px; }
        .bkc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #059669; box-shadow: 0 2px 8px rgba(5,150,105,0.3); cursor: pointer; }
        .bkc-input { width: 120px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .bkc-input:focus { border-color: #059669; box-shadow: 0 0 0 3px rgba(5,150,105,0.1); }
        .bkc-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .bkc-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .bkc-table th { padding: 12px 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; }
        .bkc-table td { padding: 12px 16px; font-size: 13px; font-weight: 600; }
        .bkc-table tr:hover { background: #f8fafc; }
        .bkc-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .bkc-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="bkc min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb"><ol className="flex items-center gap-2 text-sm"><li><Link to="/" className="text-slate-400 hover:text-emerald-700">Home</Link></li><li className="text-slate-300">/</li><li><Link to="/calculators" className="text-slate-400 hover:text-emerald-700">Calculators</Link></li><li className="text-slate-300">/</li><li className="text-emerald-700 font-semibold">Bike Loan Calculator</li></ol></nav>

        <header className="bkc-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}><div className="max-w-6xl mx-auto text-center">
          <div className="bkc-badge bg-white/10 text-white/90 mb-4 mx-auto w-fit">🏍️ Updated March 2025 — Two Wheeler Loan Rates</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4">Bike Loan EMI Calculator India 2025</h1>
          <p className="text-lg md:text-xl text-emerald-200 max-w-3xl mx-auto leading-relaxed font-medium">Calculate two-wheeler loan EMI for bikes, scooters & electric vehicles. SBI, HDFC, Hero FinCorp rates.</p>
          <div className="flex flex-wrap justify-center gap-3 mt-6"><span className="bkc-badge bg-emerald-500/20 text-emerald-200">✓ All Brands</span><span className="bkc-badge bg-blue-500/20 text-blue-200">✓ Electric Bikes</span><span className="bkc-badge bg-amber-500/20 text-amber-200">✓ Scooters</span></div>
        </div></header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8"><p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Presets</p><div className="flex flex-wrap gap-2">{PRESETS.map((p, i) => (<button key={i} onClick={() => applyPreset(p, i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400'}`}><span className="mr-1">{p.icon}</span> {p.name}</button>))}</div></div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="bkc-glass p-8 bkc-animate">
              <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.5)]"></span> Bike Loan Details</h2>
              <div className="space-y-7">
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bike On-Road Price (₹)</label><input type="text" value={bikePrice} onChange={(e) => { const n = parseInt(e.target.value.replace(/[^0-9]/g, '')); if (!isNaN(n)) setBikePrice(n); }} className="bkc-input" /></div><input type="range" min="30000" max="600000" step="5000" value={bikePrice} onChange={(e) => setBikePrice(Number(e.target.value))} className="bkc-slider w-full" /><div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2"><span>₹30K</span><span className="text-emerald-700 text-xs font-black">{formatCurrency(bikePrice)}</span><span>₹6L</span></div></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Down Payment (%)</label><div className="flex items-center gap-2"><input type="text" value={downPayment} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 0 && n <= 80) setDownPayment(n); }} className="bkc-input w-16" /><span className="text-xs text-slate-500 font-bold">{formatCurrency(dpAmount)}</span></div></div><input type="range" min="0" max="80" step="1" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="bkc-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interest Rate (% p.a.)</label><input type="text" value={interestRate} onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n) && n >= 5 && n <= 22) setInterestRate(n); }} className="bkc-input w-20" /></div><input type="range" min="5" max="22" step="0.25" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="bkc-slider w-full" /></div>
                <div><div className="flex justify-between items-center mb-3"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tenure (Years)</label><input type="text" value={loanTenure} onChange={(e) => { const n = parseInt(e.target.value); if (!isNaN(n) && n >= 1 && n <= 5) setLoanTenure(n); }} className="bkc-input w-16" /></div><input type="range" min="1" max="5" step="1" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="bkc-slider w-full" /></div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100"><div className="flex justify-between items-center"><span className="text-xs font-bold text-emerald-700 uppercase">Loan Amount</span><span className="text-lg font-black text-emerald-800">{formatCurrency(loanAmount)}</span></div></div>
              </div>
            </div>

            <div className="space-y-6 bkc-animate" style={{ animationDelay: '0.1s' }}>
              <div className="bkc-glass p-8 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Monthly Bike Loan EMI</p>
                <p className="text-5xl md:text-6xl font-black text-slate-900 mb-1"><span className="text-emerald-600">₹</span>{Math.round(emi).toLocaleString('en-IN')}</p>
                <p className="text-sm text-slate-500 font-medium mb-6">{formatCurrency(loanAmount)} at {interestRate}% for {loanTenure} years</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bkc-stat text-left"><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Loan Amount</p><p className="text-xl font-black text-slate-900">{formatCurrency(loanAmount)}</p></div>
                  <div className="bkc-stat text-left" style={{ borderColor: '#fecaca' }}><p className="text-[10px] font-bold text-rose-400 uppercase mb-1">Total Interest</p><p className="text-xl font-black text-rose-600">{formatCurrency(Math.round(totalInterest))}</p></div>
                  <div className="bkc-stat text-left" style={{ borderColor: '#bfdbfe' }}><p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Total Payable</p><p className="text-xl font-black text-blue-600">{formatCurrency(Math.round(totalPayment))}</p></div>
                  <div className="bkc-stat text-left" style={{ borderColor: '#d9f99d' }}><p className="text-[10px] font-bold text-amber-500 uppercase mb-1">Down Payment</p><p className="text-xl font-black text-amber-600">{formatCurrency(dpAmount)}</p></div>
                </div>
                <div className="h-56 mt-4"><ResultChart data={[{ name: 'Principal', value: loanAmount, color: '#059669' }, { name: 'Interest', value: Math.round(totalInterest), color: '#f59e0b' }]} centerText={`${((totalInterest / (totalPayment || 1)) * 100).toFixed(1)}%\nInterest`} /></div>
              </div>
            </div>
          </div>

          <div className="mt-12"><div className="bkc-glass p-8">
            <div className="flex items-center justify-between mb-8"><h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> Amortization Schedule</h2><button onClick={() => setShowAmortization(!showAmortization)} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">{showAmortization ? 'Collapse' : 'Expand'}</button></div>
            <div className="overflow-x-auto"><table className="w-full bkc-table"><thead><tr className="border-b border-slate-100"><th className="text-left">Year</th><th className="text-right">Principal</th><th className="text-right">Interest</th><th className="text-right">Balance</th></tr></thead><tbody className="divide-y divide-slate-50">
              {breakup.slice(0, showAmortization ? breakup.length : 5).map((y, i) => { const rem = Math.max(0, loanAmount - breakup.slice(0, i + 1).reduce((a, b) => a + b.principal, 0)); return <tr key={i}><td className="font-black text-slate-900">{i + 1}</td><td className="text-right text-emerald-600 font-bold">+{formatCurrency(Math.round(y.principal))}</td><td className="text-right text-rose-500 font-bold">-{formatCurrency(Math.round(y.interest))}</td><td className="text-right text-blue-600 font-black">{formatCurrency(Math.round(rem))}</td></tr>; })}
            </tbody></table></div>
          </div></div>

          <div className="mt-12"><div className="bkc-glass p-8">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Two Wheeler Loan Rates 2025</h2>
            <div className="overflow-x-auto"><table className="w-full bkc-table text-left"><thead><tr className="border-b-2 border-slate-100"><th>Lender</th><th>Rate (%)</th><th>Max Amount</th><th>Max Tenure</th><th>Processing</th></tr></thead><tbody className="divide-y divide-slate-50">{BANK_RATES.map((b, i) => (<tr key={i}><td className="font-bold text-slate-800 whitespace-nowrap">{b.bank}</td><td className="text-emerald-700 font-bold">{b.rate}</td><td className="text-slate-600">{b.maxAmount}</td><td className="text-slate-600">{b.maxTenure}</td><td className="text-slate-600">{b.processing}</td></tr>))}</tbody></table></div>
          </div></div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>
          <div className="mt-12 mb-16"><h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{contentData.relatedCalculators.map((c, i) => (<Link key={i} to={c.url} className="bkc-glass p-5 hover:shadow-lg transition-all group"><h3 className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">{c.name}</h3><p className="text-xs text-slate-500">{c.description}</p></Link>))}</div></div>
        </div>
        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500"><strong>Disclaimer:</strong> Estimates only. Actual terms depend on bike brand, dealer, and lender. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};

export default BikeLoanCalculator;
