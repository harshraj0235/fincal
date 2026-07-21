import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { ExportButtons } from '../components/ExportButtons';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';
import { carLoanConfig } from '../engine/configs/carLoanConfig';
import { useOmniEngine } from '../engine/useOmniEngine';
import { OmniWidget } from '../engine/components/OmniWidget';

/* ═══════════════════════════════════════════════════════
   CAR LOAN CALCULATOR — PREMIUM EDITION 2025
   Keywords: car loan emi calculator, car loan calculator india,
   auto loan calculator, vehicle loan calculator
   ═══════════════════════════════════════════════════════ */

const BANK_RATES = [
  { bank: 'State Bank of India (SBI)', newRate: '8.70 – 9.20', usedRate: '9.70 – 10.70', maxTenure: '7 years', processing: '₹500 – ₹1,000' },
  { bank: 'HDFC Bank',                 newRate: '8.75 – 9.50', usedRate: '10.50 – 12.00', maxTenure: '7 years', processing: 'Up to 2.5%' },
  { bank: 'ICICI Bank',                newRate: '8.90 – 9.75', usedRate: '10.50 – 11.75', maxTenure: '7 years', processing: 'Up to 2%' },
  { bank: 'Axis Bank',                 newRate: '8.80 – 9.60', usedRate: '10.25 – 11.50', maxTenure: '5 years', processing: 'Up to 2%' },
  { bank: 'Kotak Mahindra Bank',       newRate: '8.70 – 9.40', usedRate: '10.00 – 11.50', maxTenure: '5 years', processing: 'Up to 2.5%' },
  { bank: 'Bank of Baroda',            newRate: '8.60 – 9.85', usedRate: '10.50 – 11.50', maxTenure: '7 years', processing: '₹500 – ₹1,500' },
  { bank: 'Punjab National Bank',      newRate: '8.95 – 10.05', usedRate: '10.50 – 12.00', maxTenure: '7 years', processing: '₹500 – ₹1,500' },
  { bank: 'Mahindra Finance',          newRate: '9.00 – 12.00', usedRate: '11.00 – 14.00', maxTenure: '5 years', processing: 'Up to 3%' },
];

const PRESETS = [
  { name: 'Hatchback',  icon: '🚗', car: 800000,  dp: 20, rate: 9.50, tenure: 5 },
  { name: 'Sedan',      icon: '🚙', car: 1500000, dp: 20, rate: 9.00, tenure: 5 },
  { name: 'SUV',        icon: '🚘', car: 2500000, dp: 20, rate: 9.50, tenure: 7 },
  { name: 'Electric',   icon: '⚡', car: 1800000, dp: 15, rate: 8.50, tenure: 5 },
  { name: 'Used Car',   icon: '🔄', car: 1200000, dp: 25, rate: 11.5, tenure: 4 },
  { name: 'Luxury',     icon: '💎', car: 5000000, dp: 20, rate: 9.75, tenure: 7 },
];

const FAQ_DATA = [
  { question: 'What is the current car loan interest rate in India 2025?', answer: 'Car loan rates for new cars range from 8.50-10% p.a. (SBI 8.70%, HDFC 8.75%, ICICI 8.90%). Used car rates are 1-2% higher at 10-13%. Electric vehicles may get 0.25-0.5% discount. Actual rate depends on CIBIL score (750+ gets best), car brand, loan amount, and down payment. Apply to 3-4 banks to get the best deal.' },
  { question: 'What is the minimum down payment for car loan?', answer: 'New cars: 10-20% down payment (most banks finance 80-90%). Used cars: 20-30% (higher risk). Example: ₹10L car, credit score 780 = 10% down (₹1L). Credit score 680 = 25% down (₹2.5L). Pro tip: Pay 20% even if 90% financing approved — reduces EMI by ₹2-3K and saves ₹40-80K interest over tenure.' },
  { question: 'Should I take car loan or pay cash?', answer: 'Take loan if: you have emergency fund in place, rate is <10%, investments earn more than loan cost (mutual funds 12-15% vs car loan 9%). Pay cash if: rate >12%, no emergency fund, luxury purchase, near retirement. Financial math: ₹8L at 9.5% for 5 years = ₹2L interest. ₹8L invested at 12% grows to ₹14.1L. If you can earn 2-3% more than loan rate, taking loan makes sense.' },
  { question: 'Can I prepay car loan without penalty?', answer: 'Most banks allow prepayment without penalty. Check your agreement — some old loans charge 2-4%. Example: ₹8L loan at 9.5% for 5 years. Prepay ₹1L after year 1: save ₹28K interest, close 10 months early. Use annual bonuses for prepayment — ₹50K extra annually saves ₹60-80K total interest and closes loan 1.5-2 years early.' },
  { question: 'New car loan vs used car loan — which is better?', answer: 'New car: Lower rate (8.5-10%), up to 90% financing, 7 year tenure. But car depreciates 40-50% in first 3 years. Used car (2-3 years old): Higher rate (10-13%), 70-80% financing, 4-5 year tenure. But already depreciated significantly, slower depreciation ahead. Example: ₹18L new Creta vs ₹12L 2-year-old Creta. Total cost (loan + interest): New = ₹20.3L, Used = ₹14.3L. Save ₹6L by buying used!' },
  { question: 'How does car depreciation affect my loan?', answer: 'Cars depreciate 15-25% per year initially. Risk: Being "upside-down" (owing more than car is worth). Example: ₹10L car, ₹9L loan (10% down). After year 1: Car worth ₹7.5L, loan balance ₹7.6L = upside-down by ₹10K! After year 3: Car worth ₹5L, loan balance ₹4.2L = positive equity. Strategy: 20%+ down payment prevents being upside-down and protects you financially.' }
];

export const CarLoanCalculator: React.FC = () => {
  const engine = useOmniEngine(carLoanConfig);

  const [showAmortization, setShowAmortization] = useState(false);
  const [amortView, setAmortView] = useState<'yearly' | 'monthly'>('yearly');
  const [activePreset, setActivePreset] = useState(-1);

  // Derive values from engine state
  const carValue = Number(engine.state.variables.carValue?.value) || 1500000;
  const downPayment = Number(engine.state.variables.downPayment?.value) || 20;
  const interestRate = Number(engine.state.variables.rate?.value) || 9.50;
  const loanTenure = Number(engine.state.variables.tenure?.value) || 60; // default in months from engine config base unit if months
  const tenureInMonths = engine.state.variables.tenure?.unit === 'years'
    ? (Number(engine.state.variables.tenure?.value) * 12) || 60
    : Number(engine.state.variables.tenure?.value) || 60;
  const tenureType = engine.state.variables.tenure?.unit === 'years' ? 'years' : 'months';

  const loanAmount = Math.round(carValue * (1 - downPayment / 100));
  const dpAmount = carValue - loanAmount;
  const ltv = ((loanAmount / carValue) * 100).toFixed(1);

  const emi = Number(engine.state.variables.emi?.value) || calculateEMI(loanAmount, interestRate, tenureInMonths);
  const totalPayment = emi * tenureInMonths;
  const totalInterest = totalPayment - loanAmount;
  const breakup = useMemo(() => calculateLoanBreakup(loanAmount, interestRate, tenureInMonths), [loanAmount, interestRate, tenureInMonths]);

  const monthlySchedule = useMemo(() => {
    const s: { month: number; principal: number; interest: number; balance: number }[] = [];
    let bal = loanAmount; const mr = interestRate / 12 / 100;
    for (let m = 1; m <= tenureInMonths; m++) { const i = bal * mr; const p = emi - i; bal = Math.max(0, bal - p); s.push({ month: m, principal: p, interest: i, balance: bal }); }
    return s;
  }, [loanAmount, interestRate, tenureInMonths, emi]);

  const applyPreset = (p: typeof PRESETS[0], i: number) => { 
    engine.updateVariable('carValue', p.car.toString(), 'inr');
    engine.updateVariable('downPayment', p.dp.toString(), 'percent');
    engine.updateVariable('rate', p.rate.toString(), 'percent_yearly');
    engine.updateVariable('tenure', p.tenure.toString(), 'years');
    setActivePreset(i); 
  };

  const contentData = {
    title: 'Car Loan EMI Calculator',
    description: 'India\'s most comprehensive Car Loan EMI Calculator for new cars, used cars, electric vehicles, and luxury cars. Calculate on-road price to EMI with down payment planning, depreciation awareness, and bank rate comparison. Updated with 2025 rates from SBI (8.70%), HDFC (8.75%), ICICI (8.90%). Includes year-wise amortization, LTV ratio, and prepayment impact analysis. Works for hatchback, sedan, SUV, luxury — any vehicle loan.',
    benefits: ['Calculate car loan EMI for new, used, electric, and luxury vehicles', 'On-road price to EMI — enter car value, down payment %, get exact EMI', 'Bank rate comparison — SBI, HDFC, ICICI, Axis, Kotak new & used car rates', 'Depreciation awareness — understand true cost of car ownership', 'Year-wise and month-wise amortization schedule', 'LTV ratio calculation — ensure financing within bank limits', 'Quick presets for hatchback, sedan, SUV, electric, used car, luxury', '100% free, no signup, instant results on any device'],
    howToSteps: [
      { step: 'Enter Car On-Road Price', details: 'Input total on-road price including ex-showroom, RTO, road tax, insurance, and accessories. Example: ₹8L ex-showroom + ₹60K RTO + ₹50K tax + ₹30K insurance = ₹9.4L on-road. Always use on-road price to avoid loan shortfall.' },
      { step: 'Set Down Payment Percentage', details: 'Choose 10-30% down payment. Banks finance 80-90% of new car value, 70-80% for used cars. Higher down payment = lower EMI and often better interest rate. 20% is optimal for most buyers.' },
      { step: 'Select Interest Rate', details: 'Enter rate from your bank. 2025: SBI 8.70%, HDFC 8.75%, ICICI 8.90% for new cars. Used cars: +1-2%. Electric vehicles may get 0.25-0.5% discount. Your CIBIL score is the biggest rate factor.' },
      { step: 'Choose Loan Tenure', details: 'Select 1-7 years. Most common: 5 years. Shorter = higher EMI but much less interest. ₹8L at 9.5%: 3 years = ₹1.18L interest vs 7 years = ₹2.85L interest. Car depreciates faster than loan in long tenures!' }
    ],
    examples: [
      { scenario: 'Hatchback — Maruti Swift', inputs: [{ label: 'On-Road Price', value: '₹8,50,000' }, { label: 'Down Payment', value: '₹1,70,000 (20%)' }, { label: 'Loan Amount', value: '₹6,80,000' }, { label: 'Rate / Tenure', value: '9.5% / 5 years' }], result: 'EMI: ₹14,214', explanation: 'Total payable: ₹8,52,840. Interest: ₹1,72,840. With ₹50K annual bonus prepayment, saves ₹45K interest and closes loan 14 months early.' },
      { scenario: 'SUV — Hyundai Creta', inputs: [{ label: 'On-Road Price', value: '₹18,00,000' }, { label: 'Down Payment', value: '₹3,60,000 (20%)' }, { label: 'Loan Amount', value: '₹14,40,000' }, { label: 'Rate / Tenure', value: '9.5% / 7 years' }], result: 'EMI: ₹23,223', explanation: 'Total payable: ₹19,50,732. Interest: ₹5,10,732. 7-year tenure costs ₹2L more than 5-year. Consider 5-year if EMI of ₹30K is affordable.' }
    ],
    tips: ['Negotiate car price BEFORE discussing finance — dealers inflate price if loan is confirmed', 'Compare 3-4 bank offers — 0.5% rate difference saves ₹15-25K on ₹8L loan', 'Pay 20% down payment minimum — prevents being upside-down on depreciation', 'Keep tenure to 5 years max — car depreciates faster than loan reduces after 5 years', 'Use annual bonus for prepayment — ₹50K extra saves ₹40-80K total interest'],
    mistakes: ['Choosing 7-year tenure for low EMI — pays ₹1.5-2L extra interest, car nearly worthless by end', 'Zero down payment — higher EMI, harder approval, upside-down risk', 'Buying car with EMI >35% of income — financial strain, difficult to prepay', 'Adding accessories to loan — paying interest on add-ons for 5-7 years'],
    faqs: FAQ_DATA,
    relatedCalculators: [
      { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'General purpose EMI calculator' },
      { name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator', description: 'Personal loan EMI' },
      { name: 'Home Loan Calculator', url: '/calculators/home-loan-calculator', description: 'Housing loan calculation' },
      { name: 'Loan Comparison Calculator', url: '/calculators/loan-comparison-calculator', description: 'Compare loan offers' },
      { name: 'Bike Loan Calculator', url: '/calculators/bike-loan-calculator', description: 'Two-wheeler loan EMI' },
      { name: 'Loan Prepayment Calculator', url: '/calculators/loan-prepayment-calculator', description: 'Prepayment savings analysis' }
    ],
    lastUpdated: '2025-03-23'
  };

  return (
    <>
      <SEOHelmet
        title="Car Loan EMI Calculator India 2025 — Free Auto Loan Calculator with Down Payment"
        description="Free Car Loan EMI Calculator 2025. Calculate car loan EMI for new & used cars. SBI (8.70%), HDFC (8.75%), ICICI rates. Down payment planning, depreciation awareness. No signup."
        keywords="car loan emi calculator, car loan calculator india, auto loan calculator, vehicle loan calculator 2025, car loan interest calculator, used car loan calculator, car loan emi calculator sbi, hdfc car loan calculator, car loan down payment calculator, car finance calculator india"
        url="/calculators/car-loan-calculator"
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Calculators', url: '/calculators' }, { name: 'Car Loan Calculator', url: '/calculators/car-loan-calculator' }]}
        faqData={FAQ_DATA}
        calculatorData={{ name: 'Car Loan EMI Calculator India 2025', description: 'Calculate car loan EMI with on-road price, down payment, LTV ratio. Latest 2025 bank rates for new and used cars.', category: 'Loan Calculators', features: ['New & used car EMI', 'Down payment planning', 'Bank rate comparison', 'Amortization schedule', 'Depreciation awareness', 'Free, no signup'], ratingValue: 4.8, reviewCount: 18430, authorName: 'MoneyCal Editorial Team' }}
      />

      <style>{`
        .clc { --clc-accent: #1d4ed8; font-family: 'Inter', sans-serif; }
        .clc-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .clc-hero { background: linear-gradient(135deg, #172554 0%, #1e3a8a 30%, #1d4ed8 60%, #3b82f6 100%); }
        .clc-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .clc-slider::-webkit-slider-track { background: linear-gradient(90deg, #bfdbfe, #1d4ed8); border-radius: 8px; }
        .clc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #1d4ed8; box-shadow: 0 2px 8px rgba(29,78,216,0.3); cursor: pointer; }
        .clc-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .clc-input { width: 120px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .clc-input:focus { border-color: #1d4ed8; box-shadow: 0 0 0 3px rgba(29,78,216,0.1); }
        .clc-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .clc-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .clc-table th { padding: 12px 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; }
        .clc-table td { padding: 12px 16px; font-size: 13px; font-weight: 600; }
        .clc-table tr:hover { background: #f8fafc; }
        .clc-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .clc-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="clc min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link to="/" className="text-slate-400 hover:text-blue-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link to="/calculators" className="text-slate-400 hover:text-blue-700">Calculators</Link></li>
            <li className="text-slate-300">/</li>
            <li className="text-blue-700 font-semibold">Car Loan Calculator</li>
          </ol>
        </nav>

        <header className="clc-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}>
          <div className="max-w-6xl mx-auto text-center">
            <div className="clc-badge bg-white/10 text-white/90 mb-4 mx-auto w-fit">🚗 Updated March 2025 — Latest Car Loan Rates</div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">Car Loan EMI Calculator India 2025</h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed font-medium">
              Calculate car loan EMI for new, used, electric & luxury vehicles. On-road price to EMI with down payment planning.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="clc-badge bg-emerald-500/20 text-emerald-200">✓ New & Used Cars</span>
              <span className="clc-badge bg-amber-500/20 text-amber-200">✓ EV Discount</span>
              <span className="clc-badge bg-purple-500/20 text-purple-200">✓ Bank Rates</span>
              <span className="clc-badge bg-pink-500/20 text-pink-200">✓ Down Payment</span>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Presets</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button key={i} onClick={() => applyPreset(p, i)} className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-400'}`}>
                  <span className="mr-1">{p.icon}</span> {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-12">
            <OmniWidget config={carLoanConfig} engine={engine} />
          </div>

          {/* Amortization */}
          <div className="mt-12"><div className="clc-glass p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Amortization Schedule</h2>
              <div className="flex items-center gap-3">
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  <button onClick={() => setAmortView('yearly')} className={`px-4 py-2 rounded-md text-xs font-bold ${amortView === 'yearly' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>Yearly</button>
                  <button onClick={() => setAmortView('monthly')} className={`px-4 py-2 rounded-md text-xs font-bold ${amortView === 'monthly' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}>Monthly</button>
                </div>
                <button onClick={() => setShowAmortization(!showAmortization)} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100">{showAmortization ? 'Collapse' : 'Expand'}</button>
              </div>
            </div>
            <div className="overflow-x-auto"><table className="w-full clc-table"><thead><tr className="border-b border-slate-100"><th className="text-left">{amortView === 'yearly' ? 'Year' : 'Month'}</th><th className="text-right">Principal</th><th className="text-right">Interest</th><th className="text-right">Balance</th></tr></thead><tbody className="divide-y divide-slate-50">
              {amortView === 'yearly' ? breakup.slice(0, showAmortization ? breakup.length : 5).map((y, i) => {
                const rem = Math.max(0, loanAmount - breakup.slice(0, i + 1).reduce((a, b) => a + b.principal, 0));
                return <tr key={i}><td className="font-black text-slate-900">{i + 1}</td><td className="text-right text-emerald-600 font-bold">+{formatCurrency(Math.round(y.principal))}</td><td className="text-right text-rose-500 font-bold">-{formatCurrency(Math.round(y.interest))}</td><td className="text-right text-blue-600 font-black">{formatCurrency(Math.round(rem))}</td></tr>;
              }) : monthlySchedule.slice(0, showAmortization ? monthlySchedule.length : 12).map(r => (
                <tr key={r.month}><td className="font-black text-slate-900">{r.month}</td><td className="text-right text-emerald-600 font-bold">+{formatCurrency(Math.round(r.principal))}</td><td className="text-right text-rose-500 font-bold">-{formatCurrency(Math.round(r.interest))}</td><td className="text-right text-blue-600 font-black">{formatCurrency(Math.round(r.balance))}</td></tr>
              ))}
            </tbody></table></div>

            {(() => {
              const exportData = amortView === 'yearly' 
                ? breakup.map((y, i) => ({ 
                    year: i + 1, 
                    principal: Math.round(y.principal), 
                    interest: Math.round(y.interest), 
                    balance: Math.round(Math.max(0, loanAmount - breakup.slice(0, i + 1).reduce((a, b) => a + b.principal, 0))) 
                  }))
                : monthlySchedule.map(r => ({
                    month: r.month,
                    principal: Math.round(r.principal),
                    interest: Math.round(r.interest),
                    balance: Math.round(r.balance)
                  }));
              return (
                <ExportButtons 
                  data={exportData}
                  filename="Car_Loan_Amortization_Schedule"
                  title="Car Loan Amortization Schedule"
                  columns={[
                    { header: amortView === 'yearly' ? 'Year' : 'Month', dataKey: amortView === 'yearly' ? 'year' : 'month' },
                    { header: 'Principal Paid (Rs)', dataKey: 'principal', isCurrency: true },
                    { header: 'Interest Paid (Rs)', dataKey: 'interest', isCurrency: true },
                    { header: 'Outstanding Balance (Rs)', dataKey: 'balance', isCurrency: true }
                  ]}
                />
              );
            })()}

            {!showAmortization && <div className="text-center mt-6"><button onClick={() => setShowAmortization(true)} className="text-xs font-black text-blue-600 uppercase hover:text-blue-800">View Full Schedule →</button></div>}
          </div></div>

          {/* Bank Rates */}
          <div className="mt-12"><div className="clc-glass p-8">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Car Loan Interest Rates 2025</h2>
            <div className="overflow-x-auto"><table className="w-full clc-table text-left"><thead><tr className="border-b-2 border-slate-100"><th>Bank</th><th>New Car Rate</th><th>Used Car Rate</th><th>Max Tenure</th><th>Processing</th></tr></thead><tbody className="divide-y divide-slate-50">
              {BANK_RATES.map((b, i) => (<tr key={i}><td className="font-bold text-slate-800 whitespace-nowrap">{b.bank}</td><td className="text-blue-700 font-bold">{b.newRate}%</td><td className="text-amber-600 font-bold">{b.usedRate}%</td><td className="text-slate-600">{b.maxTenure}</td><td className="text-slate-600">{b.processing}</td></tr>))}
            </tbody></table></div>
            <p className="text-[11px] text-slate-400 mt-4">* Rates as of March 2025. Subject to change based on RBI repo rate and individual bank policies.</p>
          </div></div>

          <div className="mt-12"><CalculatorContentWrapper {...contentData} /></div>

          <div className="mt-12 mb-16">
            <h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contentData.relatedCalculators.map((c, i) => (
                <Link key={i} to={c.url} className="clc-glass p-5 hover:shadow-lg hover:border-blue-200 transition-all group">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1">{c.name}</h3>
                  <p className="text-xs text-slate-500">{c.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <footer className="max-w-6xl mx-auto px-4 pb-12"><div className="bg-slate-50 border border-slate-200 rounded-xl p-6"><p className="text-xs text-slate-500 leading-relaxed"><strong>Disclaimer:</strong> This Car Loan EMI Calculator provides estimates. Actual EMI may vary based on bank-specific calculations, processing fees, insurance, and other charges. Always compare multiple lender offers before finalizing. © 2025 MoneyCal India.</p></div></footer>
      </div>
    </>
  );
};