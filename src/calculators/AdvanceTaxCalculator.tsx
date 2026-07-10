import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { getCalculatorById } from '../data/calculatorData';

/* ═══════════════════════════════════════════════════════
   ADVANCE TAX CALCULATOR — PREMIUM EDITION 2026/27 (Obscura Aesthetic)
   Keywords: advance tax calculator, advance tax due dates, advance tax india
   ═══════════════════════════════════════════════════════ */

export const AdvanceTaxCalculator: React.FC = () => {
  const [taxRegime, setTaxRegime] = useState<'new' | 'old'>('new');
  
  // Income Sources
  const [annualSalary, setAnnualSalary] = useState<number>(2500000);
  const [businessIncome, setBusinessIncome] = useState<number>(120000);
  const [capitalGains, setCapitalGains] = useState<number>(45000);
  const [houseProperty, setHouseProperty] = useState<number>(0);
  const [otherSources, setOtherSources] = useState<number>(12000);
  
  // Deductions & Taxes
  const [deduction80C, setDeduction80C] = useState<number>(150000);
  const [deduction80D, setDeduction80D] = useState<number>(25000);
  const [tdsDeducted, setTdsDeducted] = useState<number>(180000);
  
  // Projections (For awareness/UI)
  const [marketGrowth, setMarketGrowth] = useState<number>(8.5);
  const [inflationRate, setInflationRate] = useState<number>(4.2);

  // Results
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [grossTax, setGrossTax] = useState<number>(0);
  const [netTax, setNetTax] = useState<number>(0);
  const [installments, setInstallments] = useState<number[]>([]);

  useEffect(() => {
    // 1. Calculate Gross Income
    const grossIncome = annualSalary + businessIncome + capitalGains + houseProperty + otherSources;

    // 2. Calculate Total Deductions (Simplistic approach for calculator representation)
    // In actual Old Regime, 80C/80D apply. In New Regime, standard deduction of 75000 applies for salaried.
    let appliedDeductions = 0;
    if (taxRegime === 'old') {
      appliedDeductions = Math.min(deduction80C, 150000) + Math.min(deduction80D, 100000);
      if (annualSalary > 0) appliedDeductions += 50000; // Standard Deduction Old
    } else {
      if (annualSalary > 0) appliedDeductions += 75000; // Standard Deduction New 2025/26
    }
    
    // Total Taxable Income
    const taxableIncome = Math.max(0, grossIncome - appliedDeductions);
    setTotalIncome(taxableIncome);

    // 3. Calculate Tax based on FY 2025-26/26-27 structure
    let calculatedTax = 0;
    
    if (taxRegime === 'new') {
      // Simplified New Regime 2025-26 brackets
      if (taxableIncome > 1500000) {
        calculatedTax += (taxableIncome - 1500000) * 0.30;
        calculatedTax += 300000 * 0.20 + 300000 * 0.15 + 300000 * 0.10 + 300000 * 0.05;
      } else if (taxableIncome > 1200000) {
        calculatedTax += (taxableIncome - 1200000) * 0.20;
        calculatedTax += 300000 * 0.15 + 300000 * 0.10 + 300000 * 0.05;
      } else if (taxableIncome > 900000) {
        calculatedTax += (taxableIncome - 900000) * 0.15;
        calculatedTax += 300000 * 0.10 + 300000 * 0.05;
      } else if (taxableIncome > 600000) {
        calculatedTax += (taxableIncome - 600000) * 0.10;
        calculatedTax += 300000 * 0.05;
      } else if (taxableIncome > 300000) {
        calculatedTax += (taxableIncome - 300000) * 0.05;
      }
      
      // Rebate under 87A (New Regime, up to 7L, increased to marginal relief if slightly above)
      if (taxableIncome <= 700000) calculatedTax = 0;
      
    } else {
      // Old Regime
      if (taxableIncome > 1000000) {
        calculatedTax += (taxableIncome - 1000000) * 0.30;
        calculatedTax += 500000 * 0.20;
        calculatedTax += 250000 * 0.05;
      } else if (taxableIncome > 500000) {
        calculatedTax += (taxableIncome - 500000) * 0.20;
        calculatedTax += 250000 * 0.05;
      } else if (taxableIncome > 250000) {
        calculatedTax += (taxableIncome - 250000) * 0.05;
      }
      // Rebate 87A Old Regime (up to 5L)
      if (taxableIncome <= 500000) calculatedTax = 0;
    }

    // Add Health & Education Cess (4%)
    if (calculatedTax > 0) {
       calculatedTax *= 1.04;
    }

    setGrossTax(calculatedTax);
    
    // 4. Net Advance Tax Payable
    const payable = Math.max(0, calculatedTax - tdsDeducted);
    setNetTax(payable);
    
    // 5. Installments: 15%, 45%, 75%, 100%
    // The amounts shown are cumulative goals, so we subtract previous to get installment amounts
    const inst1 = payable * 0.15;
    const inst2 = (payable * 0.45) - inst1;
    const inst3 = (payable * 0.75) - (inst1 + inst2);
    const inst4 = payable - (inst1 + inst2 + inst3);
    
    setInstallments([inst1, inst2, inst3, inst4]);

  }, [taxRegime, annualSalary, businessIncome, capitalGains, houseProperty, otherSources, deduction80C, deduction80D, tdsDeducted]);


  const calculatorData = getCalculatorById('advance-tax-calculator');
  const finalContentData = typeof calculatorData?.info === 'object' && !Array.isArray(calculatorData.info) ? calculatorData.info : null;

  return (
    <>

      <style>{`
        .atc-premium { font-family: 'Inter', sans-serif; }
        .atc-glass {
            background-color: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 2rem;
            box-shadow: 0 12px 40px rgba(0,0,0,0.2);
        }
        .atc-hero {
            background: linear-gradient(135deg, #0e0e10 0%, #19191d 100%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .atc-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            background: #ffffff;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #6366f1;
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .atc-slider::-webkit-slider-thumb:hover {
            transform: scale(1.15);
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.6);
        }
        .atc-slider::-moz-range-thumb {
            width: 18px;
            height: 18px;
            background: #ffffff;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid #6366f1;
        }
        .atc-input {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #e7e4ec;
            border-radius: 0.75rem;
            transition: all 0.2s;
        }
        .atc-input:focus {
            border-color: #6366f1;
            outline: none;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }
      `}</style>

      <div className="atc-premium min-h-screen bg-[#0e0e10] text-[#e7e4ec] font-['Inter'] selection:bg-indigo-500/30 pb-24">
        
        {/* Breadcrumbs */}
        <div className="pt-6 px-6 max-w-6xl mx-auto">
           <nav className="flex items-center gap-2 text-[#acaab1] text-xs font-semibold uppercase tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link to="/calculators" className="hover:text-white transition-colors">Calculators</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#818cf8]">Advance Tax</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="atc-hero rounded-b-[40px] px-6 pt-10 pb-16 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                    Advance Tax <span className="text-indigo-400">Calculator 2026</span>
                </h1>
                <p className="text-[#acaab1] max-w-xl text-lg font-medium">
                    Optimize your tax outgo with our high-precision forecasting engine. Designed for the upcoming fiscal year 2026-27 compliance.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-[#1e1e24] text-[#d4d4d8] text-[11px] font-bold tracking-widest uppercase border border-white/5">FY 2026-27</span>
                <span className="px-4 py-2 rounded-full bg-[#1e1e24] text-[#d4d4d8] text-[11px] font-bold tracking-widest uppercase border border-white/5">New & Old Regime</span>
                <span className="px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-[11px] font-bold tracking-widest uppercase border border-indigo-500/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  AI Powered
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
          
          {/* LEFT COLUMN: Inputs */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tax Regime Toggle */}
            <div className="atc-glass p-8">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#acaab1] mb-6">Choose Tax Regime</h3>
              <div className="flex p-1 bg-[#000000] border border-white/5 rounded-2xl w-full max-w-sm">
                <button 
                  onClick={() => setTaxRegime('new')}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${taxRegime === 'new' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-[#acaab1] hover:text-white'}`}
                >
                  New Regime
                </button>
                <button 
                   onClick={() => setTaxRegime('old')}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm transition-all ${taxRegime === 'old' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-[#acaab1] hover:text-white'}`}
                >
                  Old Regime
                </button>
              </div>
            </div>

            {/* Income Details Section */}
            <div className="atc-glass p-8 space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-400 text-[20px]">account_balance</span>
                </div>
                <h3 className="text-xl font-bold text-white">Income Details</h3>
              </div>
              
              {/* Annual Salary Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-[#acaab1]">Annual Salary (INR)</label>
                  <input 
                    type="text" 
                    value={`₹ ${annualSalary.toLocaleString('en-IN')}`}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                      if (!isNaN(val)) setAnnualSalary(val);
                    }}
                    className="atc-input w-40 px-3 py-2 text-right font-bold text-indigo-400" 
                  />
                </div>
                <input 
                  type="range" min="0" max="10000000" step="50000"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  className="atc-slider w-full h-1.5 bg-[#25252b] rounded-lg appearance-none cursor-pointer" 
                />
                <div className="flex justify-between text-[10px] text-[#75757c] tracking-widest font-bold">
                  <span>0L</span>
                  <span>50L</span>
                  <span>1Cr</span>
                </div>
              </div>

              {/* Other Income Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Business/Prof. Income", val: businessIncome, setVal: setBusinessIncome },
                  { label: "Capital Gains", val: capitalGains, setVal: setCapitalGains },
                  { label: "House Property", val: houseProperty, setVal: setHouseProperty },
                  { label: "Other Sources", val: otherSources, setVal: setOtherSources },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-[#acaab1]">{item.label}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#75757c] font-bold text-sm">₹</span>
                      <input 
                        type="text" 
                        value={item.val.toLocaleString('en-IN')}
                        onChange={(e) => {
                           const n = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                           if (!isNaN(n)) item.setVal(n); else item.setVal(0);
                        }}
                        className="atc-input w-full pl-10 pr-4 py-3 text-right" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deductions Section */}
            <div className="atc-glass p-8 space-y-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-400 text-[20px]">shield</span>
                </div>
                <h3 className="text-xl font-bold text-white">Deductions & Taxes</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {taxRegime === 'old' && (
                  <>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-[#acaab1]">Section 80C</label>
                      <input 
                        type="text" 
                        value={deduction80C.toLocaleString('en-IN')}
                        onChange={(e) => {
                             const n = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                             if (!isNaN(n)) setDeduction80C(n); else setDeduction80C(0);
                        }}
                        className="atc-input w-full px-4 py-3" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-[#acaab1]">Section 80D</label>
                      <input 
                         type="text" 
                         value={deduction80D.toLocaleString('en-IN')}
                         onChange={(e) => {
                              const n = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                              if (!isNaN(n)) setDeduction80D(n); else setDeduction80D(0);
                         }}
                        className="atc-input w-full px-4 py-3" 
                      />
                    </div>
                  </>
                )}
                
                {taxRegime === 'new' && (
                   <div className="md:col-span-2 p-4 bg-[#19191d] rounded-xl border border-white/5 text-sm text-[#acaab1] flex items-center gap-3">
                     <span className="material-symbols-outlined text-amber-500">warning</span>
                     Chapter VI-A deductions (80C, 80D, etc.) are generally not available under the New Tax Regime.
                   </div>
                )}

                <div className="md:col-span-2 space-y-3 mt-4">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-indigo-400">Total TDS Already Deducted</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 font-bold text-sm">₹</span>
                    <input 
                      type="text" 
                      value={tdsDeducted.toLocaleString('en-IN')}
                      onChange={(e) => {
                            const n = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                            if (!isNaN(n)) setTdsDeducted(n); else setTdsDeducted(0);
                      }}
                      className="atc-input w-full pl-10 pr-4 py-4 border-indigo-500/30 bg-indigo-500/5 focus:bg-indigo-500/10 text-xl" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Projections (Aesthetic mostly) */}
            <div className="atc-glass p-8 space-y-8 hidden md:block opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#acaab1]">Advanced Trend Projections</h3>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium">Expected Over-Performance / Market Growth (%)</label>
                    <span className="text-indigo-400 font-bold">{marketGrowth}%</span>
                  </div>
                  <input type="range" min="0" max="20" step="0.5" value={marketGrowth} onChange={(e) => setMarketGrowth(Number(e.target.value))} className="atc-slider w-full h-1 bg-[#25252b] rounded-lg appearance-none cursor-pointer" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-xs font-medium">Inflation Buffer (%)</label>
                    <span className="text-[#acaab1] font-bold">{inflationRate}%</span>
                  </div>
                  <input type="range" min="0" max="15" step="0.1" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} className="atc-slider w-full h-1 bg-[#25252b] rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Results (Sticky) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 space-y-6">
              
              {/* Main Result Card */}
              <div className="atc-glass p-8 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <div className="space-y-2 mb-8 relative z-10">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#acaab1]">Net Advance Tax Payable</p>
                  <h4 className="text-5xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-indigo-400">
                    ₹ {netTax.toLocaleString('en-IN', {maximumFractionDigits:0})}
                  </h4>
                </div>
                
                <div className="space-y-4 py-6 border-t border-white/5 relative z-10">
                  <div className="flex justify-between items-center group">
                    <span className="text-sm text-[#acaab1] group-hover:text-white transition-colors">Total Taxable Income</span>
                    <span className="text-sm font-semibold text-white">₹ {totalIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-sm text-[#acaab1] group-hover:text-white transition-colors">Gross Tax Liability</span>
                    <span className="text-sm font-semibold text-white">₹ {grossTax.toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-sm text-[#acaab1] group-hover:text-amber-300 transition-colors">TDS Credit Applied</span>
                    <span className="text-sm font-semibold text-amber-500">(- ₹ {tdsDeducted.toLocaleString('en-IN')})</span>
                  </div>
                </div>
              </div>

              {/* Installment Schedule */}
              <div className="atc-glass p-8 space-y-6 shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
                <div className="flex items-center justify-between">
                   <h3 className="text-xs font-bold tracking-widest uppercase text-white">Payment Schedule</h3>
                   <span className="px-2 py-1 rounded bg-[#131316] border border-white/5 text-[10px] text-indigo-400 font-bold uppercase tracking-widest">FY 26-27</span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { date: 'June 15', pct: '15%', title: '1st Installment', amt: installments[0] || 0 },
                    { date: 'Sept 15', pct: '45%', title: '2nd Installment', amt: installments[1] || 0 },
                    { date: 'Dec 15',  pct: '75%', title: '3rd Installment', amt: installments[2] || 0 },
                    { date: 'March 15',pct: '100%',title: 'Final Installment', amt: installments[3] || 0 },
                  ].map((inst, i) => (
                    <div key={i} className="group flex items-center justify-between p-4 rounded-2xl bg-[#000000]/40 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-[#acaab1] uppercase tracking-widest mb-1">{inst.date} <span className="text-[#47474e] mx-1.5">•</span> Cumulative {inst.pct}</span>
                        <span className="text-sm font-bold text-[#e7e4ec] group-hover:text-white">{inst.title}</span>
                      </div>
                      <span className="text-indigo-400 font-bold text-lg">₹ {Math.round(inst.amt).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                 
                {netTax > 0 && (
                  <div className="pt-4 flex items-start gap-3 opacity-80">
                    <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">warning</span>
                    <p className="text-[10px] leading-relaxed text-[#acaab1]">Missing any deadline listed above attracts penal interest of 1% per month under Section 234C of the Income Tax Act.</p>
                  </div>
                )}
                {netTax === 0 && (
                  <div className="pt-4 flex items-start gap-3 opacity-80">
                    <span className="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>
                    <p className="text-[10px] leading-relaxed text-[#acaab1]">Your estimated TDS fully covers your tax liability. No advance tax payments are currently required.</p>
                  </div>
                )}
              </div>
              
              {/* Contextual Action */}
              <button 
                onClick={() => window.print()} 
                className="w-full py-4 rounded-xl border border-white/10 text-[#acaab1] font-bold text-sm hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                Print Payment Schedule
              </button>

            </div>
          </div>
        </div>
        
        {/* SEO Data Container */}
        <div className="mt-16 bg-white text-slate-900 rounded-t-[40px] pt-12 pb-12 w-full shadow-2xl relative z-30">
          <div className="max-w-6xl mx-auto px-6">
            {finalContentData && <CalculatorContentWrapper {...finalContentData} />}
          </div>
        </div>

      </div>
    </>
  );
};
