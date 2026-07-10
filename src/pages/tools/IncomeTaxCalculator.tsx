import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Sector } from 'recharts';
import SEOHelmet from '../../components/SEOHelmet';
import { CalculatorContentWrapper } from '../../components/CalculatorContentWrapper';

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/* ═══════════════════════════════════════════════════════
   INCOME TAX CALCULATOR — PREMIUM BUDGET 2024 EDITION
   ═══════════════════════════════════════════════════════ */

export default function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState(1200000);
  const [age, setAge] = useState<30 | 60 | 80>(30);
  const [regime, setRegime] = useState<'new' | 'old'>('new');
  
  // Deductions
  const [deduction80c, setDeduction80c] = useState(0); // Max 1.5L
  const [deduction80ccd, setDeduction80ccd] = useState(0); // NPS Max 50k
  const [deduction80d, setDeduction80d] = useState(0); // Health insurance Max 75k
  const [hraExemption, setHraExemption] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0); // Max 2L
  const [otherDeductions, setOtherDeductions] = useState(0);

  // Sync direct input states
  const [inputIncome, setInputIncome] = useState(grossIncome.toString());
  useEffect(() => { setInputIncome(grossIncome.toString()); }, [grossIncome]);

  const handleIncomeInput = (v: string) => {
    setInputIncome(v);
    const n = parseFloat(v.replace(/[^0-9]/g, ''));
    if (!isNaN(n) && n >= 0 && n <= 100000000) setGrossIncome(n);
  };

  const calculations = useMemo(() => {
    // 1. STANDARD DEDUCTION
    // Old Regime: 50,000 | New Regime (Budget 2024): 75,000
    const sdOld = 50000;
    const sdNew = 75000;

    // 2. CAP DEDUCTIONS
    const capped80c = Math.min(deduction80c, 150000);
    const capped80ccd = Math.min(deduction80ccd, 50000);
    const capped80d = Math.min(deduction80d, age >= 60 ? 100000 : 75000);
    const cappedHomeLoan = Math.min(homeLoanInterest, 200000);

    const totalOldDeductions = sdOld + capped80c + capped80ccd + capped80d + hraExemption + cappedHomeLoan + otherDeductions;
    const taxableOld = Math.max(0, grossIncome - totalOldDeductions);
    const taxableNew = Math.max(0, grossIncome - sdNew); // Only Standard Deduction allowed in New Regime for salaried

    // 3. CALCULATE TAX
    // OLD REGIME
    let taxOld = 0;
    if (taxableOld <= 500000) {
      taxOld = 0; // 87A rebate
    } else {
      let basicExemption = age >= 80 ? 500000 : (age >= 60 ? 300000 : 250000);
      if (taxableOld > basicExemption) {
        if (taxableOld <= 500000) {
          taxOld += (taxableOld - basicExemption) * 0.05;
        } else if (taxableOld <= 1000000) {
          taxOld += (500000 - basicExemption) * 0.05;
          taxOld += (taxableOld - 500000) * 0.20;
        } else {
          taxOld += (500000 - basicExemption) * 0.05;
          taxOld += (1000000 - 500000) * 0.20;
          taxOld += (taxableOld - 1000000) * 0.30;
        }
      }
    }

    // NEW REGIME (Budget 2024 Slabs)
    let taxNew = 0;
    if (taxableNew <= 700000) {
      taxNew = 0; // 87A rebate
    } else {
      if (taxableNew > 300000) {
        taxNew += (Math.min(taxableNew, 700000) - 300000) * 0.05;
      }
      if (taxableNew > 700000) {
        taxNew += (Math.min(taxableNew, 1000000) - 700000) * 0.10;
      }
      if (taxableNew > 1000000) {
        taxNew += (Math.min(taxableNew, 1200000) - 1000000) * 0.15;
      }
      if (taxableNew > 1200000) {
        taxNew += (Math.min(taxableNew, 1500000) - 1200000) * 0.20;
      }
      if (taxableNew > 1500000) {
        taxNew += (taxableNew - 1500000) * 0.30;
      }
      
      // Marginal Relief for 87A (New Regime)
      if (taxableNew > 700000 && taxableNew <= 727777) {
        const taxExceeding7L = taxableNew - 700000;
        if (taxNew > taxExceeding7L) {
          taxNew = taxExceeding7L;
        }
      }
    }

    // 4. ADD CESS (4%)
    const finalTaxOld = taxOld > 0 ? taxOld * 1.04 : 0;
    const finalTaxNew = taxNew > 0 ? taxNew * 1.04 : 0;

    return {
      taxableOld,
      taxableNew,
      totalOldDeductions,
      sdNew,
      finalTaxOld,
      finalTaxNew,
      diff: Math.abs(finalTaxOld - finalTaxNew),
      betterRegime: finalTaxOld < finalTaxNew ? 'old' : 'new'
    };
  }, [grossIncome, age, deduction80c, deduction80ccd, deduction80d, hraExemption, homeLoanInterest, otherDeductions]);

  // Selected regime stats
  const activeTax = regime === 'new' ? calculations.finalTaxNew : calculations.finalTaxOld;
  const activeTaxable = regime === 'new' ? calculations.taxableNew : calculations.taxableOld;
  const netIncome = grossIncome - activeTax;
  const effectiveRate = grossIncome > 0 ? (activeTax / grossIncome) * 100 : 0;

  // Chart Data
  const comparisonData = [
    { name: 'Old Regime', tax: Math.round(calculations.finalTaxOld) },
    { name: 'New Regime (2024)', tax: Math.round(calculations.finalTaxNew) }
  ];

  const pieData = [
    { name: 'Net Income', value: netIncome, color: '#10b981' },
    { name: 'Total Tax', value: activeTax, color: '#f43f5e' }
  ];

  return (
    <>
      <SEOHelmet
        title="Income Tax Calculator FY 2024-25 (Budget 2024) | MoneyCal"
        description="Calculate income tax for FY 2024-25 (AY 2025-26) with latest Budget 2024 slabs. Compare Old vs New Tax Regimes instantly. Features ₹75,000 standard deduction."
        keywords="income tax calculator, tax calculator budget 2024, new tax regime 2024, old vs new tax regime, tax calculator india, standard deduction 75000, 87a rebate"
        url="/calculators/income-tax-calculator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: 'Income Tax Calculator', url: '/calculators/income-tax-calculator' }
        ]}
      />

      <style>{`
        .tax-premium {
          --tax-accent: #3b82f6;
          --tax-success: #10b981;
          font-family: 'Inter', sans-serif;
        }
        .tax-glass {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02);
        }
        .tax-hero-gradient {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%);
        }
        .tax-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 8px; outline: none; background: linear-gradient(90deg, #bfdbfe, #3b82f6); }
        .tax-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: white; border: 3px solid #3b82f6; cursor: pointer; transition: transform 0.15s; }
        .tax-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .tax-input { width: 100px; padding: 8px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-weight: 700; text-align: right; outline: none; transition: border 0.2s; }
        .tax-input:focus { border-color: #3b82f6; }
        .tax-badge { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; }
      `}</style>

      <div className="tax-premium min-h-screen bg-slate-50">
        <header className="tax-hero-gradient text-white py-12 px-4 rounded-b-[40px] mb-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="tax-badge bg-emerald-500/20 text-emerald-300 mb-4 border border-emerald-500/30">
              ⚡ UPDATED FOR BUDGET 2024-2025
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">Income Tax Calculator</h1>
            <p className="text-lg text-blue-200 font-medium">Compare Old vs. New Regime instantly using the latest Govt slabs and standard deductions.</p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-start pb-12">
          
          {/* Left Column: Inputs */}
          <div className="tax-glass p-8">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Income Details
            </h2>

            <div className="space-y-8">
              {/* Gross Income */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Annual Income</label>
                  <input type="text" value={inputIncome} onChange={(e) => handleIncomeInput(e.target.value)} className="tax-input w-28" />
                </div>
                <input type="range" min="300000" max="50000000" step="50000" value={grossIncome} onChange={(e) => setGrossIncome(Number(e.target.value))} className="tax-slider" />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
                  <span>₹3L</span>
                  <span className="text-blue-600 font-black">{formatCurrency(grossIncome)}</span>
                  <span>₹5Cr</span>
                </div>
              </div>

              {/* Age Selection */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Age Group</label>
                <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                  {[30, 60, 80].map((a) => (
                    <button key={a} onClick={() => setAge(a as any)} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${age === a ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                      {a === 30 ? '< 60 Yrs' : a === 60 ? '60 - 80 Yrs' : '> 80 Yrs'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <h2 className="text-xl font-black text-slate-900">Tax Deductions (Old Regime)</h2>
                </div>
                <p className="text-xs text-slate-500 mb-6 font-medium">These apply primarily to the Old Regime to reduce your taxable income.</p>

                <div className="space-y-4">
                  {[
                    { label: '80C Investments (EPF, PPF, ELSS)', val: deduction80c, set: setDeduction80c, max: 150000 },
                    { label: '80CCD(1B) NPS', val: deduction80ccd, set: setDeduction80ccd, max: 50000 },
                    { label: '80D Health Insurance', val: deduction80d, set: setDeduction80d, max: age >= 60 ? 100000 : 75000 },
                    { label: 'HRA Exemption', val: hraExemption, set: setHraExemption, max: 2000000 },
                    { label: 'Home Loan Interest (Sec 24b)', val: homeLoanInterest, set: setHomeLoanInterest, max: 200000 },
                    { label: 'Other Deductions', val: otherDeductions, set: setOtherDeductions, max: 1000000 }
                  ].map((field, idx) => (
                    <div key={idx} className="flex justify-between items-center group">
                      <label className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{field.label}</label>
                      <input 
                        type="number" 
                        value={field.val || ''} 
                        onChange={(e) => field.set(Math.min(field.max, Number(e.target.value)))} 
                        className="tax-input"
                        placeholder="₹0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            
            {/* The Winner Banner */}
            <div className={`p-6 rounded-2xl border shadow-sm ${calculations.betterRegime === 'new' ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex gap-4 items-center mb-2">
                <span className="text-3xl">🏆</span>
                <div>
                  <h3 className={`text-lg font-black ${calculations.betterRegime === 'new' ? 'text-emerald-800' : 'text-blue-800'}`}>
                    {calculations.betterRegime === 'new' ? 'New Tax Regime (2024)' : 'Old Tax Regime'} is better!
                  </h3>
                  <p className={`text-sm font-medium ${calculations.betterRegime === 'new' ? 'text-emerald-700' : 'text-blue-700'}`}>
                    You save <strong>{formatCurrency(calculations.diff)}</strong> by choosing this regime.
                  </p>
                </div>
              </div>
            </div>

            <div className="tax-glass p-8">
              {/* Regime Selector */}
              <div className="flex bg-slate-100 rounded-xl p-1 gap-1 mb-8">
                <button onClick={() => setRegime('new')} className={`flex-1 py-3 text-sm font-black rounded-lg transition-all ${regime === 'new' ? 'bg-white text-emerald-600 shadow-sm border border-emerald-100' : 'text-slate-500'}`}>
                  New Regime (2024)
                </button>
                <button onClick={() => setRegime('old')} className={`flex-1 py-3 text-sm font-black rounded-lg transition-all ${regime === 'old' ? 'bg-white text-blue-600 shadow-sm border border-blue-100' : 'text-slate-500'}`}>
                  Old Regime
                </button>
              </div>

              <div className="text-center mb-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Total Tax Payable</p>
                <p className={`text-5xl md:text-6xl font-black mb-1 ${regime === 'new' ? 'text-emerald-500' : 'text-blue-500'}`}>
                  {formatCurrency(Math.round(activeTax))}
                </p>
                <p className="text-xs font-bold text-slate-400 mt-2">
                  Taxable Income: <span className="text-slate-700">{formatCurrency(Math.round(activeTaxable))}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Standard Deduction</p>
                  <p className="text-xl font-black text-slate-800">{formatCurrency(regime === 'new' ? calculations.sdNew : 50000)}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Effective Rate</p>
                  <p className="text-xl font-black text-slate-800">{effectiveRate.toFixed(1)}%</p>
                </div>
              </div>

              {/* Charts */}
              <div className="h-64 mt-4 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} dy={10} />
                    <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 700 }} formatter={(val: number) => `₹${val.toLocaleString('en-IN')}`} />
                    <Bar dataKey="tax" radius={[6, 6, 0, 0]}>
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name.includes('New') ? '#10b981' : '#3b82f6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="tax-glass p-8 text-center flex flex-col items-center justify-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Income Breakdown</h3>
                <div className="h-48 w-full max-w-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(val: number) => `₹${val.toLocaleString('en-IN')}`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 mt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Net Income</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Tax</div>
                </div>
            </div>
          </div>
        </div>

        {/* Informational Content below */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <CalculatorContentWrapper
            title="Understanding Budget 2024 Tax Slabs"
            description="The July 2024 Union Budget made the New Tax Regime more attractive for salaried taxpayers. The standard deduction was increased from ₹50,000 to ₹75,000, and the tax slabs were adjusted to offer more relief. The Old Regime remained unchanged, continuing to offer deductions like 80C, 80D, and HRA."
            benefits={[
              "Identify instantly which tax regime saves you more money.",
              "Accurately calculate tax with the latest Budget 2024 slabs and ₹75k standard deduction.",
              "See exactly how your 80C and HRA deductions impact your Old Regime tax.",
              "Calculations include marginal relief for Section 87A and 4% Health & Education cess."
            ]}
            howToSteps={[
              { step: "Enter Gross Income", details: "Input your total salary and other income before any deductions." },
              { step: "Select Age", details: "Senior citizens get a higher basic exemption limit in the Old Regime." },
              { step: "Add Deductions", details: "Enter your PPF, ELSS, Health Insurance, and HRA to see if the Old Regime beats the New Regime." },
              { step: "Compare", details: "The calculator instantly reveals the winner and exactly how much tax you save." }
            ]}
            examples={[]}
            tips={[
              "The new ₹75,000 standard deduction is only for salaried individuals and pensioners in the New Regime.",
              "Under the New Regime, income up to ₹7,00,000 is tax-free due to the Section 87A rebate.",
              "If you have high deductions (Rent, Home Loan, 80C), the Old Regime might still be better."
            ]}
            mistakes={[]}
            faqs={[
              { question: "What are the New Tax Regime slabs for 2024-25?", answer: "0-3L: 0%, 3-7L: 5%, 7-10L: 10%, 10-12L: 15%, 12-15L: 20%, >15L: 30%." },
              { question: "Is the standard deduction available in the New Regime?", answer: "Yes, it has been increased to ₹75,000 for FY 2024-25 under the New Regime." }
            ]}
            relatedCalculators={[]}
            lastUpdated="2024-07-25"
            calculatorId="income-tax-calculator"
          />
        </div>
      </div>
    </>
  );
}
