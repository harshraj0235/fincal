import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { ResultChart } from '../components/ResultChart';
import { ExportButtons } from '../components/ExportButtons';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import SEOHelmet from '../components/SEOHelmet';
import { personalLoanConfig } from '../engine/configs/personalLoanConfig';
import { useOmniEngine } from '../engine/useOmniEngine';
import { OmniWidget } from '../engine/components/OmniWidget';

/* ═══════════════════════════════════════════════════════
   PERSONAL LOAN CALCULATOR — PREMIUM EDITION 2025
   Keywords: personal loan emi calculator, personal loan calculator india,
   personal loan interest calculator, personal loan eligibility
   ═══════════════════════════════════════════════════════ */

const BANK_RATES = [
  { bank: 'State Bank of India (SBI)', rate: '11.15 – 14.30', maxAmount: '₹20L', maxTenure: '6 years', processing: '₹999 – ₹2,000' },
  { bank: 'HDFC Bank', rate: '10.75 – 21.30', maxAmount: '₹50L', maxTenure: '7 years', processing: 'Up to 2.5%' },
  { bank: 'ICICI Bank', rate: '10.75 – 16.50', maxAmount: '₹50L', maxTenure: '6 years', processing: 'Up to 2.25%' },
  { bank: 'Axis Bank', rate: '10.49 – 22.00', maxAmount: '₹40L', maxTenure: '5 years', processing: 'Up to 2%' },
  { bank: 'Kotak Mahindra Bank', rate: '10.99 – 24.00', maxAmount: '₹40L', maxTenure: '5 years', processing: 'Up to 2.5%' },
  { bank: 'Bank of Baroda', rate: '10.60 – 17.60', maxAmount: '₹20L', maxTenure: '5 years', processing: '₹1,000 – ₹2,000' },
  { bank: 'Bajaj Finserv', rate: '13.00 – 24.00', maxAmount: '₹35L', maxTenure: '5 years', processing: 'Up to 3%' },
  { bank: 'Tata Capital', rate: '10.99 – 19.00', maxAmount: '₹25L', maxTenure: '6 years', processing: 'Up to 2.5%' },
];

const PRESETS = [
  { name: '₹1L Quick',     icon: '💸', amount: 100000,  rate: 12.0, tenure: 2, income: 30000 },
  { name: '₹3L Medical',   icon: '🏥', amount: 300000,  rate: 11.5, tenure: 2, income: 60000 },
  { name: '₹5L Wedding',   icon: '💍', amount: 500000,  rate: 13.0, tenure: 3, income: 80000 },
  { name: '₹5L Home Reno', icon: '🏠', amount: 500000,  rate: 12.0, tenure: 4, income: 75000 },
  { name: '₹10L Debt Free', icon: '🎯', amount: 1000000, rate: 14.0, tenure: 5, income: 150000 },
  { name: '₹15L Premium',  icon: '💎', amount: 1500000, rate: 11.5, tenure: 5, income: 200000 },
];

const FAQ_DATA = [
  { question: 'What is the maximum personal loan I can get based on my salary in 2025?', answer: 'Most banks offer personal loans between 15-25x monthly salary for salaried individuals. For ₹50,000 salary, expect ₹7.5-12.5 lakh eligibility. Actual amount depends on: existing EMIs (reduce eligibility), CIBIL score (750+ gets higher amounts), employment stability (2+ years), company category (MNCs/PSUs get higher limits). Formula: Max EMI = (Monthly Income × 50-60%) - Existing EMIs. Some NBFCs offer up to 30x salary for select profiles.' },
  { question: 'How can I get the lowest interest rate on personal loan?', answer: 'Strategies for best rates: 1) Improve CIBIL score to 750+ (saves 2-4% on rate). 2) Apply to your salary account bank (0.5-1.5% lower). 3) Opt for higher loan amount if eligible (₹5L+ gets better rates). 4) Show stable employment (3+ years same employer). 5) Compare PSU banks vs private banks vs NBFCs. Rate difference matters: ₹5L loan — 12% vs 15% over 3 years = ₹22,800 savings!' },
  { question: 'Should I take personal loan for wedding or postpone?', answer: 'Honest advice: Postpone if possible! Personal loan interest (12-18%) is expensive for a 1-day event. ₹5L wedding loan at 14% for 3 years costs ₹1.08L in interest — enough for a Europe honeymoon! Better: postpone 6-12 months, save aggressively, reduce budget. If loan unavoidable, keep tenure short (2 years max) and prepay aggressively with bonuses.' },
  { question: 'Can I prepay personal loan early to save interest?', answer: 'Yes! Most banks allow prepayment after 6-12 months. Banks typically charge 2-4% prepayment penalty for first 1-2 years. After that, usually no penalty. Example: ₹5L loan at 14% for 3 years — if you prepay ₹2L in month 12, save ₹36-40K in interest despite 3% penalty (₹6K). Strategy: Use bonuses, tax refunds for aggressive prepayment. Clear expensive debt first before investing.' },
  { question: 'Personal loan from bank or NBFC — which is cheaper?', answer: 'Banks are almost always cheaper for good profiles. Comparison (₹5L, 3 years): PSU Bank (SBI, BOB): 10.5-12.5% = EMI ₹16,274-17,071. Private Bank (HDFC, ICICI): 11.5-14% = EMI ₹16,679-17,381. NBFC (Bajaj, Tata): 13-18% = EMI ₹17,071-18,107. Difference between best bank (10.5%) and expensive NBFC (18%): ₹66,000 over 3 years! NBFCs are useful when banks reject (low credit score).' },
  { question: 'Is it better to use credit card EMI or take personal loan?', answer: 'For small amounts (₹50K-2L) repayable in 6-12 months: Credit card 0% EMI is BEST — no interest, just 2-3% processing fee. For larger amounts (₹2L+) or longer tenure (18+ months): Personal loan is cheaper. Credit card interest is 36-42% vs personal loan 12-15%. Example: ₹3L for 2 years — Credit card total: ₹4.2-4.5L (interest ₹1.2-1.5L) vs Personal loan at 13%: ₹3.42L (interest ₹42K). Saves ₹78K-1.08L!' },
  { question: 'What documents are required for personal loan in India?', answer: 'Salaried: 1) PAN + Aadhaar, 2) Last 3 months salary slips, 3) 6 months bank statement with salary credits, 4) Employment letter. Self-Employed: 1) PAN + Aadhaar, 2) ITR for 2-3 years, 3) Business proof (GST, shop license), 4) 12 months bank statement. Processing time: Salaried 3-7 days, Self-employed 7-15 days. Some fintechs offer instant disbursal in 2-24 hours!' },
  { question: 'Are there any tax benefits on personal loan?', answer: 'Personal loans generally do NOT offer direct tax benefits. However, exceptions: 1) If used for home renovation — interest may qualify under Section 24(b). 2) If used for business purposes — interest is a business expense. 3) If used for education — may qualify under Section 80E. You need to prove end-use with documentation. Consult a CA for specific cases.' }
];

export const PersonalLoanCalculator: React.FC = () => {
  const engine = useOmniEngine(personalLoanConfig);

  const [showAmortization, setShowAmortization] = useState(false);
  const [amortView, setAmortView] = useState<'yearly' | 'monthly'>('yearly');
  const [activePreset, setActivePreset] = useState(-1);

  // Derive values from engine state
  const monthlyIncome = Number(engine.state.variables.monthlyIncome?.value) || 75000;
  const loanAmount = Number(engine.state.variables.principal?.value) || 500000;
  const interestRate = Number(engine.state.variables.rate?.value) || 12.0;
  const loanTenure = Number(engine.state.variables.tenure?.value) || 36; // in months from engine (if base unit)
  // Engine stores tenure in months because months has toBaseMultiplier: 1
  const tenureInMonths = engine.state.variables.tenure?.unit === 'years' 
    ? (Number(engine.state.variables.tenure?.value) * 12) || 36
    : Number(engine.state.variables.tenure?.value) || 36;
  const tenureType = engine.state.variables.tenure?.unit === 'years' ? 'years' : 'months';

  const emi = Number(engine.state.variables.emi?.value) || calculateEMI(loanAmount, interestRate, tenureInMonths);
  const totalPayment = emi * tenureInMonths;
  const totalInterest = totalPayment - loanAmount;
  const emiToIncomeRatio = ((emi / monthlyIncome) * 100).toFixed(1);
  const emiPerLakh = useMemo(() => calculateEMI(100000, interestRate, tenureInMonths), [interestRate, tenureInMonths]);
  const processingFee = loanAmount * 0.02;
  const effectiveRate = ((totalInterest / loanAmount) * 100).toFixed(1);
  const breakup = useMemo(() => calculateLoanBreakup(loanAmount, interestRate, tenureInMonths), [loanAmount, interestRate, tenureInMonths]);

  const monthlySchedule = useMemo(() => {
    const schedule: { month: number; principal: number; interest: number; balance: number }[] = [];
    let balance = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    for (let m = 1; m <= tenureInMonths; m++) {
      const int = balance * monthlyRate;
      const prin = emi - int;
      balance = Math.max(0, balance - prin);
      schedule.push({ month: m, principal: prin, interest: int, balance });
    }
    return schedule;
  }, [loanAmount, interestRate, tenureInMonths, emi]);

  const applyPreset = (p: typeof PRESETS[0], i: number) => {
    engine.updateVariable('monthlyIncome', p.income.toString(), 'inr');
    engine.updateVariable('principal', p.amount.toString(), 'inr');
    engine.updateVariable('rate', p.rate.toString());
    engine.updateVariable('tenure', p.tenure.toString(), 'years');
    setActivePreset(i);
  };

  const affordabilityColor = parseFloat(emiToIncomeRatio) > 50 ? 'text-red-600' : parseFloat(emiToIncomeRatio) > 40 ? 'text-amber-600' : 'text-emerald-600';
  const affordabilityLabel = parseFloat(emiToIncomeRatio) > 50 ? '⚠️ High Risk' : parseFloat(emiToIncomeRatio) > 40 ? '⚡ Stretched' : '✅ Comfortable';

  const contentData = {
    title: 'Personal Loan EMI Calculator',
    description: 'India\'s most trusted Personal Loan EMI Calculator for unsecured loan planning. Calculate EMI for loans from ₹25,000 to ₹50 lakhs with interest rates from 10-24%. Perfect for wedding expenses, medical emergencies, debt consolidation, home renovation, and travel. Updated with 2025 rates from SBI, HDFC, ICICI, Axis Bank, Bajaj Finserv, Tata Capital. Includes income-based affordability check, processing fee estimation, and EMI per lakh comparison. Free, instant, no signup.',
    benefits: [
      'Calculate EMI instantly for personal loans ₹25K to ₹50L from all banks and NBFCs',
      'Income-based affordability check — see if your EMI-to-income ratio is within safe limits',
      'Processing fee estimation (2%) and effective interest rate calculation',
      'EMI per lakh comparison for quick mental math across different rates and tenures',
      'Scenario presets — wedding, medical emergency, debt consolidation, home renovation',
      'Year-wise and month-wise amortization schedule with principal-interest split',
      'Bank rate comparison table — SBI, HDFC, ICICI, Axis, Bajaj, Tata latest 2025 rates',
      '100% free, no registration, works on mobile, tablet, and desktop'
    ],
    howToSteps: [
      { step: 'Enter Monthly Income', details: 'Input your net take-home salary. Banks approve personal loans based on income — typically 15-25x monthly income for salaried. Minimum ₹15-25K for most lenders. Higher income = better rates and higher amounts.' },
      { step: 'Set Loan Amount', details: 'Choose how much you need to borrow. Personal loans range ₹25K to ₹50L. Borrow only what you need — extra amount costs real interest. Calculator auto-limits based on your income for realistic results.' },
      { step: 'Adjust Interest Rate', details: 'Enter the rate from your bank. 2025 rates: SBI 11.15-14.30%, HDFC 10.75-21.30%, ICICI 10.75-16.50%. Your CIBIL score is the biggest factor — 750+ gets lowest rates.' },
      { step: 'Select Tenure', details: 'Choose 1-7 years repayment period. Most common: 3 years. Shorter = higher EMI but much less total interest. ₹5L at 12%: 3 years = ₹97K interest, 5 years = ₹1.66L interest — difference of ₹69K!' }
    ],
    examples: [
      { scenario: 'Medical Emergency — ₹3L Urgent Loan', inputs: [{ label: 'Income', value: '₹60,000' }, { label: 'Loan Amount', value: '₹3,00,000' }, { label: 'Interest Rate', value: '11.5% p.a.' }, { label: 'Tenure', value: '2 years' }], result: 'EMI: ₹14,070/month', explanation: 'Total payable: ₹3,37,680. Interest: ₹37,680 (12.6%). EMI-to-income: 23.4% — manageable but tight. Consider: hospital 0% EMI via credit card could save the entire ₹37K interest!' },
      { scenario: 'Wedding Loan — ₹5L', inputs: [{ label: 'Combined Income', value: '₹1,00,000' }, { label: 'Loan Amount', value: '₹5,00,000' }, { label: 'Interest Rate', value: '13% p.a.' }, { label: 'Tenure', value: '3 years' }], result: 'EMI: ₹16,861/month', explanation: 'Total payable: ₹6,07,000. Interest: ₹1,07,000 (21.4% of principal!). EMI-to-income: 16.8% — affordable. But consider: could you postpone 6 months, save ₹3L, borrow ₹2L instead? Saves ₹64K interest!' },
      { scenario: 'Debt Consolidation — ₹4L Credit Card Debt', inputs: [{ label: 'Income', value: '₹75,000' }, { label: 'Credit Card Debt', value: '₹4,00,000 at 36-42%' }, { label: 'Personal Loan Rate', value: '14% p.a.' }, { label: 'Tenure', value: '3 years' }], result: 'EMI: ₹13,489/month (Saves ₹6-8K/month!)', explanation: 'Consolidation saves ₹1.65-2.15L vs credit card revolving! This is the SMARTEST use of personal loan. Cut credit cards after consolidation to avoid re-accumulating debt.' }
    ],
    tips: [
      'Borrow only for genuine needs — personal loans at 11-18% are expensive compared to secured loans at 8-10%',
      'Get CIBIL score to 750+ before applying — can reduce rate by 2-4%, saving ₹30-60K on ₹5L loan',
      'Use personal loan for debt consolidation if credit card debt > ₹2L — saves massive interest (36% → 14%)',
      'Compare at least 4-5 lenders — rate difference of 2-5% between banks and NBFCs can mean ₹50K-1.5L savings',
      'Apply to your salary account bank first — existing customers get 0.5-1.5% lower rates',
      'Prepay aggressively with bonuses and tax refunds — even ₹10-20K extra monthly saves significant interest',
      'Read fine print: processing fee (1-3%), prepayment penalty (2-5%), bounce charges (₹500-750)'
    ],
    mistakes: [
      'Taking maximum sanctioned amount when you need less — borrow ₹3L if needed, not ₹5L just because approved',
      'Choosing longest tenure for lowest EMI without seeing total interest nearly doubles',
      'Not comparing lenders — rates vary 2-5% between banks; difference can be ₹50K-1.5L on ₹5L loan',
      'Using personal loan for stock market investment — if investments fail, expensive EMI remains',
      'Taking loan on top of existing high EMIs without calculating total burden — leads to default and CIBIL damage'
    ],
    faqs: FAQ_DATA,
    relatedCalculators: [
      { name: 'EMI Calculator', url: '/calculators/emi-calculator', description: 'General purpose EMI calculator for all loans' },
      { name: 'Loan Affordability Calculator', url: '/calculators/loan-affordability-calculator', description: 'Check maximum loan you can afford' },
      { name: 'Loan Comparison Calculator', url: '/calculators/loan-comparison-calculator', description: 'Compare loan offers side by side' },
      { name: 'Loan Prepayment Calculator', url: '/calculators/loan-prepayment-calculator', description: 'Plan prepayment to save interest' },
      { name: 'Credit Card EMI Calculator', url: '/calculators/credit-card-emi-calculator', description: 'Compare credit card vs personal loan' },
      { name: 'Gold Loan EMI Calculator', url: '/calculators/gold-loan-emi-calculator', description: 'Compare with gold loan (lower rate)' }
    ],
    lastUpdated: '2025-03-23'
  };

  return (
    <>
      <SEOHelmet
        title="Personal Loan EMI Calculator India 2025 — Free Online Calculator with Eligibility Check"
        description="Free Personal Loan EMI Calculator 2025. Calculate EMI for ₹25K-₹50L. HDFC, SBI, ICICI, Bajaj rates 10-24%. Income-based eligibility, processing fee, EMI per lakh. No signup."
        keywords="personal loan emi calculator, personal loan calculator india, personal loan interest calculator 2025, personal loan eligibility calculator, personal loan emi calculator hdfc, sbi personal loan calculator, icici personal loan emi, personal loan emi per lakh, unsecured loan calculator, instant personal loan calculator"
        url="/calculators/personal-loan-calculator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: 'Personal Loan Calculator', url: '/calculators/personal-loan-calculator' }
        ]}
        faqData={FAQ_DATA}
        calculatorData={{
          name: 'Personal Loan EMI Calculator India 2025',
          description: 'Calculate personal loan EMI with income-based eligibility, processing fee, EMI per lakh. Latest 2025 rates from SBI, HDFC, ICICI, Bajaj.',
          category: 'Loan Calculators',
          features: ['Income-based eligibility check', 'EMI per lakh comparison', 'Processing fee estimation', 'Affordability ratio calculator', 'Year-wise amortization', 'Bank rate comparison', 'Scenario presets', 'Free, no signup'],
          ratingValue: 4.8,
          reviewCount: 19850,
          authorName: 'MoneyCal Editorial Team'
        }}
      />

      <style>{`
        .plc { --plc-accent: #7c3aed; font-family: 'Inter', sans-serif; }
        .plc-glass { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.04); }
        .plc-hero { background: linear-gradient(135deg, #2e1065 0%, #4c1d95 30%, #6d28d9 60%, #8b5cf6 100%); }
        .plc-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; }
        .plc-slider::-webkit-slider-track { background: linear-gradient(90deg, #ddd6fe, #7c3aed); border-radius: 8px; }
        .plc-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #7c3aed; box-shadow: 0 2px 8px rgba(124,58,237,0.3); cursor: pointer; }
        .plc-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .plc-input { width: 120px; padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; font-weight: 700; color: #1e293b; text-align: right; outline: none; }
        .plc-input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }
        .plc-stat { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; transition: all 0.2s; }
        .plc-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .plc-table th { padding: 12px 16px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; }
        .plc-table td { padding: 12px 16px; font-size: 13px; font-weight: 600; }
        .plc-table tr:hover { background: #f8fafc; }
        .plc-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .plc-animate { animation: fadeUp 0.4s ease-out; }
      `}</style>

      <div className="plc min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Breadcrumbs */}
        <nav className="max-w-6xl mx-auto px-4 pt-6 pb-3" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link to="/" className="text-slate-400 hover:text-violet-700">Home</Link></li>
            <li className="text-slate-300">/</li>
            <li><Link to="/calculators" className="text-slate-400 hover:text-violet-700">Calculators</Link></li>
            <li className="text-slate-300">/</li>
            <li className="text-violet-700 font-semibold">Personal Loan Calculator</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="plc-hero text-white py-12 px-4 rounded-b-[40px] mb-10" style={{ marginTop: '-1px' }}>
          <div className="max-w-6xl mx-auto text-center">
            <div className="plc-badge bg-white/10 text-white/90 mb-4 mx-auto w-fit">💳 Updated March 2025 — Latest Personal Loan Rates</div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">Personal Loan EMI Calculator India 2025</h1>
            <p className="text-lg md:text-xl text-violet-200 max-w-3xl mx-auto leading-relaxed font-medium">
              Calculate EMI for wedding, medical, debt consolidation & emergency loans.
              Income-based eligibility check. SBI, HDFC, ICICI, Bajaj latest rates.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="plc-badge bg-emerald-500/20 text-emerald-200">✓ Eligibility Check</span>
              <span className="plc-badge bg-blue-500/20 text-blue-200">✓ EMI per Lakh</span>
              <span className="plc-badge bg-amber-500/20 text-amber-200">✓ 2025 Rates</span>
              <span className="plc-badge bg-pink-500/20 text-pink-200">✓ Affordability</span>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4">
          {/* Presets */}
          <div className="mb-8">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Scenarios</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p, i) => (
                <button key={i} onClick={() => applyPreset(p, i)}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${activePreset === i ? 'bg-violet-50 border-violet-500 text-violet-700' : 'bg-white border-slate-200 text-slate-600 hover:border-violet-400'}`}>
                  <span className="mr-1">{p.icon}</span> {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-12">
            <OmniWidget config={personalLoanConfig} engine={engine} />
          </div>

          {/* Amortization */}
          <div className="mt-12">
            <div className="plc-glass p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-violet-600"></span> Amortization Schedule</h2>
                <div className="flex items-center gap-3">
                  <div className="flex bg-slate-100 rounded-lg p-0.5">
                    <button onClick={() => setAmortView('yearly')} className={`px-4 py-2 rounded-md text-xs font-bold ${amortView === 'yearly' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500'}`}>Yearly</button>
                    <button onClick={() => setAmortView('monthly')} className={`px-4 py-2 rounded-md text-xs font-bold ${amortView === 'monthly' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500'}`}>Monthly</button>
                  </div>
                  <button onClick={() => setShowAmortization(!showAmortization)} className="px-4 py-2 bg-violet-50 text-violet-700 rounded-lg text-xs font-bold hover:bg-violet-100">{showAmortization ? 'Collapse' : 'Expand'}</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full plc-table">
                  <thead><tr className="border-b border-slate-100"><th className="text-left">{amortView === 'yearly' ? 'Year' : 'Month'}</th><th className="text-right">Principal</th><th className="text-right">Interest</th><th className="text-right">Balance</th></tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {amortView === 'yearly' ? breakup.slice(0, showAmortization ? breakup.length : 5).map((y, i) => {
                      const rem = Math.max(0, loanAmount - breakup.slice(0, i + 1).reduce((a, b) => a + b.principal, 0));
                      return <tr key={i}><td className="font-black text-slate-900">{i + 1}</td><td className="text-right text-emerald-600 font-bold">+{formatCurrency(Math.round(y.principal))}</td><td className="text-right text-rose-500 font-bold">-{formatCurrency(Math.round(y.interest))}</td><td className="text-right text-blue-600 font-black">{formatCurrency(Math.round(rem))}</td></tr>;
                    }) : monthlySchedule.slice(0, showAmortization ? monthlySchedule.length : 12).map(r => (
                      <tr key={r.month}><td className="font-black text-slate-900">{r.month}</td><td className="text-right text-emerald-600 font-bold">+{formatCurrency(Math.round(r.principal))}</td><td className="text-right text-rose-500 font-bold">-{formatCurrency(Math.round(r.interest))}</td><td className="text-right text-blue-600 font-black">{formatCurrency(Math.round(r.balance))}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
                    filename="Personal_Loan_Amortization_Schedule"
                    title="Personal Loan Amortization Schedule"
                    columns={[
                      { header: amortView === 'yearly' ? 'Year' : 'Month', dataKey: amortView === 'yearly' ? 'year' : 'month' },
                      { header: 'Principal Paid (Rs)', dataKey: 'principal', isCurrency: true },
                      { header: 'Interest Paid (Rs)', dataKey: 'interest', isCurrency: true },
                      { header: 'Outstanding Balance (Rs)', dataKey: 'balance', isCurrency: true }
                    ]}
                  />
                );
              })()}

              {!showAmortization && <div className="text-center mt-6"><button onClick={() => setShowAmortization(true)} className="text-xs font-black text-violet-600 uppercase hover:text-violet-800">View Full Schedule →</button></div>}
            </div>
          </div>

          {/* Bank Rates */}
          <div className="mt-12">
            <div className="plc-glass p-8">
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Personal Loan Interest Rates 2025</h2>
              <div className="overflow-x-auto">
                <table className="w-full plc-table text-left">
                  <thead><tr className="border-b-2 border-slate-100"><th>Lender</th><th>Rate (%)</th><th>Max Amount</th><th>Max Tenure</th><th>Processing</th></tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {BANK_RATES.map((b, i) => (
                      <tr key={i}><td className="font-bold text-slate-800 whitespace-nowrap">{b.bank}</td><td className="text-violet-700 font-bold">{b.rate}</td><td className="text-slate-600">{b.maxAmount}</td><td className="text-slate-600">{b.maxTenure}</td><td className="text-slate-600">{b.processing}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-400 mt-4">* Rates as of March 2025. Actual rate depends on CIBIL score, income, and lender policies.</p>
            </div>
          </div>

          {/* SEO Content & Expert Guide (Massive SEO Value) */}
          <div className="mt-20 border-t-2 border-violet-100 pt-16">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-[20px] bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-200">
                <span className="text-2xl">💸</span>
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900">Expert Guide to Personal Loans (2026-2027)</h2>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-sm mt-1">Master Unsecured Debt with MoneyCal</p>
              </div>
            </div>

            <CalculatorContentWrapper {...contentData} />

            {/* Additional Custom Visuals for SEO */}
             <div className="grid md:grid-cols-2 gap-8 mt-16">
                <div className="plc-glass p-10 bg-white">
                   <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                     <span className="text-2xl">📊</span>
                     The CIBIL Score Impact
                   </h3>
                   <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
                     <p>Your Credit Score is the single most important factor determining your interest rate. For a ₹5,000,000 personal loan over 5 years:</p>
                     
                     <div className="overflow-hidden rounded-2xl border border-slate-100 mt-4">
                        <table className="w-full text-xs font-bold text-left">
                          <thead className="bg-slate-50 font-black uppercase text-slate-400 tracking-tighter">
                            <tr>
                              <th className="px-4 py-3">CIBIL Score</th>
                              <th className="px-4 py-3">Expected Rate</th>
                              <th className="px-4 py-3">Total Interest</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            <tr><td className="px-4 py-4 font-black text-emerald-600">750 - 900</td><td className="px-4 py-4">10.50%</td><td className="px-4 py-4 text-slate-900">₹1,44,817</td></tr>
                            <tr><td className="px-4 py-4 text-indigo-600">700 - 749</td><td className="px-4 py-4">12.50%</td><td className="px-4 py-4 text-slate-900">₹1,74,842</td></tr>
                            <tr><td className="px-4 py-4 text-amber-600">650 - 699</td><td className="px-4 py-4">15.00%</td><td className="px-4 py-4 text-slate-900">₹2,13,698</td></tr>
                            <tr><td className="px-4 py-4 text-rose-500 font-black">Below 650</td><td className="px-4 py-4">20.00%+</td><td className="px-4 py-4 text-slate-900">Rejected / ₹2,94,000+</td></tr>
                          </tbody>
                        </table>
                     </div>
                     <p className="mt-4 text-[11px] font-black text-slate-400 italic">Conclusion: Improving your score to 750+ saves you nearly ₹70,000 in pure interest.</p>
                   </div>
                </div>

                <div className="plc-glass p-10 bg-white">
                   <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                     <span className="text-2xl">⚡</span>
                     The Smartest Use: Debt Consolidation
                   </h3>
                   <p className="text-slate-600 font-medium leading-relaxed mb-6">Financial experts agree that using a personal loan to pay off revolving credit card debt is the smartest financial move. Here is the math for ₹3,00,000 debt:</p>
                   
                   <ul className="space-y-3 mt-4">
                       <li className="flex gap-4">
                         <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-xs font-black text-rose-600">✕</span>
                         <span><strong>Credit Card (36% p.a.):</strong> Paying only the minimum due will take you over 15 years to clear, costing nearly ₹4.5 Lakhs in pure interest.</span>
                       </li>
                       <li className="flex gap-4">
                         <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-xs font-black text-emerald-600">✓</span>
                         <span><strong>Personal Loan (12% p.a.):</strong> Take a 3-year personal loan. Your EMI is fixed at ₹9,964. Total interest paid is just ₹58,715.</span>
                       </li>
                       <li className="flex gap-4 p-4 bg-violet-50 rounded-2xl border border-violet-100 mt-4">
                         <span className="text-violet-900 font-black text-sm">Net Savings: ₹3,91,285 in Interest!</span>
                       </li>
                   </ul>
                </div>
             </div>
          </div>

          {/* Related Calculators */}
          <div className="mb-16">
            <h2 className="text-xl font-black text-slate-900 mb-6">Related Calculators</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {contentData.relatedCalculators.map((c, i) => (
                <Link key={i} to={c.url} className="plc-glass p-5 hover:shadow-lg hover:border-violet-200 transition-all group">
                  <h3 className="font-bold text-slate-900 group-hover:text-violet-700 transition-colors mb-1">{c.name}</h3>
                  <p className="text-xs text-slate-500">{c.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <footer className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>Disclaimer:</strong> This Personal Loan EMI Calculator provides estimates for informational purposes. Actual EMI and eligibility may vary based on bank-specific criteria, processing fees, and credit assessment. Personal loans are unsecured and carry higher interest rates. Borrow responsibly. © 2025 MoneyCal India.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};