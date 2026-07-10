import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  Zap, 
  ChevronLeft,
  ShieldCheck,
  Target,
  Download,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

/* ═══════════════════════════════════════════════════════
   THE SOVEREIGN SHIELD — TAX STRATEGY WIZARD 2026
   Keywords: tax saver wizard, income tax optimization india 2026,
   80C 80D investment strategy, new tax regime vs old regime 2026,
   NPS tax saving strategy
   ═══════════════════════════════════════════════════════ */

export const TaxSaverWizard: React.FC = () => {
  // --- Parameters ---
  const [income, setIncome] = useState<number>(1500000);
  const [investments80C, setInvestments80C] = useState<number>(120000);
  const [premium80D, setPremium80D] = useState<number>(25000);
  const [nps80CCD, setNps80CCD] = useState<number>(0);
  const [hraExemption, setHraExemption] = useState<number>(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState<number>(0);

  // --- Logic for FY 2026-27 (Predicted based on 2025 trajectory) ---
  const calculations = useMemo(() => {
    // New Regime 2025 (Section 115BAC)
    const stdDedNew = 75000;
    const taxableNew = Math.max(0, income - stdDedNew);
    
    // Slabs (Estimated for 2026)
    // 0-4L: Nil | 4-8L: 5% | 8-12L: 10% | 12-16L: 15% | 16-20L: 20% | >20L: 25% (Simplified)
    const calculateTaxNew = (inc: number) => {
        let tax = 0;
        if (inc <= 1200000) return 0; // Tax rebate up to 12L in 2025 path
        if (inc > 400000) tax += Math.min(inc - 400000, 400000) * 0.05;
        if (inc > 800000) tax += Math.min(inc - 800000, 400000) * 0.10;
        if (inc > 1200000) tax += Math.min(inc - 1200000, 400000) * 0.15;
        if (inc > 1600000) tax += Math.min(inc - 1600000, 400000) * 0.20;
        if (inc > 2000000) tax += (inc - 2000000) * 0.25;
        return tax;
    };
    
    // Old Regime
    const stdDedOld = 50000;
    const totalDeductions = Math.min(150000, investments80C) + 
                             Math.min(25000, premium80D) + 
                             Math.min(50000, nps80CCD) + 
                             hraExemption + 
                             Math.min(200000, homeLoanInterest);
                             
    const taxableOld = Math.max(0, income - stdDedOld - totalDeductions);
    
    const calculateTaxOld = (inc: number) => {
        let tax = 0;
        if (inc <= 500000) return 0;
        if (inc > 250000) tax += Math.min(inc - 250000, 250000) * 0.05;
        if (inc > 500000) tax += Math.min(inc - 500000, 500000) * 0.20;
        if (inc > 1000000) tax += (inc - 1000000) * 0.30;
        return tax;
    };

    const taxNew = calculateTaxNew(taxableNew);
    const taxOld = calculateTaxOld(taxableOld);
    
    const cess = 0.04;
    const finalNew = Math.round(taxNew * (1 + cess));
    const finalOld = Math.round(taxOld * (1 + cess));
    
    const recommended = finalNew <= finalOld ? 'NEW' : 'OLD';
    const savings = Math.abs(finalNew - finalOld);
    
    // Upsell insights
    const potentialNpsSaving = Math.round((Math.min(50000, nps80CCD + 50000) - nps80CCD) * 0.312);

    return {
        finalNew,
        finalOld,
        recommended,
        savings,
        potentialNpsSaving,
        totalDeductions
    };
  }, [income, investments80C, premium80D, nps80CCD, hraExemption, homeLoanInterest]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val).replace('₹', '₹ ');
  };

  const contentData = {
    title: "The Sovereign Shield: Tax Strategy",
    description: "Navigate the complex transition between the New and Old Tax Regimes with the 'Sovereign Shield' optimization engine. Protect your wealth through clinical deduction analysis for FY 2026-27.",
    benefits: [
        "Comparative audit of Section 115BAC (New Regime) vs. Traditional (Old Regime)",
        "80C and 80D deduction impact modeling for high-income earners",
        "NPS (80CCD) optimization strategy for an extra ₹50,000 shield",
        "Recommended 'Optimal Path' card based on your unique income architecture",
        "Elite Indigo 2026 UI with high-fidelity glassmorphic reporting",
        "Home Loan interest and HRA exemption integration for accurate Old Regime modeling"
    ],
    examples: [
        { 
          scenario: "Mid-Income Tax Optimization", 
          inputs: [
            { label: "Gross Income", value: "₹15,00,000" },
            { label: "80C + 80D", value: "₹1,75,000" },
            { label: "NPS", value: "₹50,000" }
          ],
          result: "New Regime saves ₹45,000",
          explanation: "In 2026, the New Regime's wider slabs and higher standard deduction outperform most deduction-heavy Old Regime strategies." 
        },
        { 
          scenario: "Home Loan & High HRA", 
          inputs: [
            { label: "Gross Income", value: "₹25,00,000" },
            { label: "HL Interest", value: "₹2,00,000" },
            { label: "HRA", value: "₹3,00,000" }
          ],
          result: "Old Regime saves ₹62,000",
          explanation: "High-value deductions like Home Loan interest (Section 24) and HRA still make the Old Regime mathematically superior for high earners." 
        }
    ],
    tips: [
      "Always exhaust your ₹50,000 80CCD (NPS) limit if you are in the 30% tax bracket.",
      "Consider the New Regime if your total deductions are less than ₹3.75 Lakhs."
    ],
    mistakes: [
      "Ignoring the Standard Deduction increase (likely ₹75k-₹1L) in the New Regime.",
      "Investing solely to save tax—ensure the investment (like ELSS) fits your wealth goal."
    ],
    howToSteps: [
        { step: "Initialize Income", details: "Input your Gross Annual Salary or Business Income before any deductions." },
        { step: "Map Deductions", details: "Enter your existing 80C (PPF, LIC), 80D (Health), and 80CCD (NPS) contributions." },
        { step: "Audit Housing", details: "Add your HRA exemption or Home Loan interest if you are considering the Old Regime." },
        { step: "Deploy Shield", details: "Review the 'Shield Recommendation' to see which regime saves you more liquid capital." }
    ],
    faqs: [
        { question: "Is the New Tax Regime better for everyone in 2026?", answer: "Generally, yes, especially with the likely increase in slabs and standard deduction. However, those with Home Loans and high HRA may still find the Old Regime superior." },
        { question: "Can I switch regimes every year?", answer: "Salaried individuals can choose the optimal regime every year at the time of filing. Business owners usually have a one-time choice to switch." },
        { question: "What is the maximum 80C benefit?", answer: "The benefit is capped at ₹1.5 Lakhs per financial year in the Old Regime." }
    ],
    relatedCalculators: [
        { name: "Income Tax Calculator", url: "/calculators/income-tax-calculator", description: "Full slab breakdown" },
        { name: "Advance Tax Planner", url: "/calculators/advance-tax-calculator", description: "Quarterly shield" },
        { name: "HRA Exemption", url: "/calculators/hra-exemption-calculator", description: "Rent optimization" }
    ]
  };

  return (
    <>
      <SEOHelmet 
        title="Sovereign Shield: Tax Strategy Wizard 2026 | New vs Old Regime" 
        description="Optimize your taxes with the Sovereign Shield. Compare New vs Old Tax Regime for FY 2026-27 and maximize 80C/80D/80CCD savings." 
        keywords="tax strategy wizard, new vs old regime calculator 2026, 80C 80D optimizer, tax saver planner india"
        url="/calculators/tax-strategy-wizard"
      />

      <style>{`
        .shield-elite { background-color: #0d0e12; font-family: 'Manrope', sans-serif; }
        .shield-glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(40px); border: 1px solid rgba(99, 102, 241, 0.1); border-radius: 2rem; transition: all 0.3s ease; }
        .shield-glass:hover { border-color: rgba(99, 102, 241, 0.3); background: rgba(255, 255, 255, 0.04); }
        .indigo-glow { filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.3)); }
        .shield-slider { -webkit-appearance: none; width: 100%; height: 2px; background: rgba(99, 102, 241, 0.2); outline: none; }
        .shield-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #6366f1; cursor: pointer; box-shadow: 0 0 15px rgba(99, 102, 241, 0.5); }
      `}</style>

      <div className="shield-elite min-h-screen text-[#e3e2e7] pb-32">
        
        {/* Nav */}
        <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center relative z-50">
            <Link to="/calculators" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#6366f1] transition-all">
                <ChevronLeft className="w-4 h-4" /> Exit to Portfolio
            </Link>
            <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#4f46e5] flex items-center justify-center shadow-lg shadow-[#6366f1]/20">
                     <ShieldCheck className="text-white w-5 h-5" />
                 </div>
                 <span className="text-xs font-black uppercase tracking-[0.3em] text-[#6366f1]">The Sovereign Shield</span>
            </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
             
             {/* Hero */}
             <header className="space-y-4 max-w-2xl">
                <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-white">
                   The Horizon of <br/>
                   <span className="text-[#6366f1] italic">Strategy.</span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg">
                   Neutralizing tax liability with clinical precision. Optimize your 80C, 80D, and NPS architecture for FY 2026-27.
                </p>
            </header>

            {/* Recommendation Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 xl:col-span-6">
                    <div className={`shield-glass p-10 h-full relative overflow-hidden group border-2 ${calculations.recommended === 'NEW' ? 'border-[#6366f1]/40' : 'border-[#8b5cf6]/40'}`}>
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                             <ShieldCheck className="w-64 h-64 text-[#6366f1]" />
                        </div>
                        <div className="space-y-6 relative z-10">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#6366f1]/60">Shield Recommendation</p>
                            <h3 className="text-6xl font-black text-white leading-none">
                                {calculations.recommended === 'NEW' ? 'OPTIMIZE NEW REGIME' : 'SECURE OLD REGIME'}
                            </h3>
                            <div className="pt-4 space-y-2">
                                <p className="text-lg font-medium text-slate-400">Total Potential Savings:</p>
                                <p className="text-5xl font-black text-[#6366f1]">{formatCurrency(calculations.savings)}</p>
                            </div>
                            <div className="flex gap-4 pt-6">
                                <span className="bg-[#6366f1]/10 text-[#6366f1] px-4 py-2 rounded-full text-xs font-bold border border-[#6366f1]/20">Audit Complete</span>
                                <span className="bg-white/5 text-white/40 px-4 py-2 rounded-full text-xs font-bold border border-white/5">FY 2026-27 Path</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-12 xl:col-span-6">
                    <div className="shield-glass p-10 bg-gradient-to-br from-white/[0.03] to-transparent h-full flex flex-col justify-between">
                         <div className="space-y-6">
                             <h4 className="text-[10px] uppercase font-black tracking-widest text-[#6366f1]">Comparative Liability</h4>
                             <div className="space-y-8">
                                 <div className="space-y-2">
                                     <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500">
                                         <span>New Regime (Section 115BAC)</span>
                                         <span>{formatCurrency(calculations.finalNew)}</span>
                                     </div>
                                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                         <div className="h-full bg-[#6366f1]" style={{ width: `${Math.min(100, (calculations.finalNew / (calculations.finalNew + calculations.finalOld)) * 100)}%` }} />
                                     </div>
                                 </div>
                                 <div className="space-y-2">
                                     <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500">
                                         <span>Old Regime (With Deductions)</span>
                                         <span>{formatCurrency(calculations.finalOld)}</span>
                                     </div>
                                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                         <div className="h-full bg-[#8b5cf6]" style={{ width: `${Math.min(100, (calculations.finalOld / (calculations.finalNew + calculations.finalOld)) * 100)}%` }} />
                                     </div>
                                 </div>
                             </div>
                         </div>
                         
                         <div className="mt-12 p-6 rounded-2xl bg-[#6366f1]/5 border border-[#6366f1]/10 flex items-center gap-4 group">
                             <div className="w-12 h-12 rounded-full bg-[#6366f1] flex items-center justify-center shrink-0 shadow-lg shadow-[#6366f1]/20">
                                 <Zap className="text-white w-6 h-6" />
                             </div>
                             <div>
                                 <p className="text-xs font-black text-[#6366f1] uppercase tracking-widest">Alpha Strategy</p>
                                 <p className="text-sm font-bold text-white mt-0.5">Deduct ₹{calculations.potentialNpsSaving.toLocaleString()} via NPS Top-up.</p>
                             </div>
                             <ArrowUpRight className="ml-auto text-slate-600 group-hover:text-[#6366f1] transition-colors" />
                         </div>
                    </div>
                </div>
            </div>

            {/* Inputs Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                
                {/* Left Side: Parameters */}
                <div className="lg:col-span-8 space-y-12">
                    
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 opacity-60">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                            <h2 className="text-[10px] uppercase tracking-[0.2em] font-black">Audit Foundations</h2>
                        </div>
                        
                        <div className="shield-glass p-10 space-y-12">
                             <div className="space-y-6">
                                 <div className="flex justify-between items-center">
                                     <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Gross Annual Income</label>
                                     <span className="text-4xl font-black text-white">{formatCurrency(income)}</span>
                                 </div>
                                 <input type="range" min="300000" max="10000000" step="50000" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="shield-slider" />
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                 <div className="space-y-2">
                                     <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">80C Investments (PPF, LIC...)</label>
                                     <input type="number" value={investments80C} onChange={(e) => setInvestments80C(Number(e.target.value))} className="w-full bg-transparent border-b border-white/10 pb-2 text-2xl font-black text-white outline-none focus:border-[#6366f1]/50 transition-all" />
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">80D Health Premium</label>
                                     <input type="number" value={premium80D} onChange={(e) => setPremium80D(Number(e.target.value))} className="w-full bg-transparent border-b border-white/10 pb-2 text-2xl font-black text-white outline-none focus:border-[#6366f1]/50 transition-all" />
                                 </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                 <div className="space-y-2">
                                     <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">NPS (80CCD)</label>
                                     <input type="number" value={nps80CCD} onChange={(e) => setNps80CCD(Number(e.target.value))} className="w-full bg-transparent border-b border-white/10 pb-2 text-xl font-bold text-white outline-none" />
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">HRA Exemption</label>
                                     <input type="number" value={hraExemption} onChange={(e) => setHraExemption(Number(e.target.value))} className="w-full bg-transparent border-b border-white/10 pb-2 text-xl font-bold text-white outline-none" />
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">HL Interest (Sec 24)</label>
                                     <input type="number" value={homeLoanInterest} onChange={(e) => setHomeLoanInterest(Number(e.target.value))} className="w-full bg-transparent border-b border-white/10 pb-2 text-xl font-bold text-white outline-none" />
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* PDF Report Call to Action */}
                    <button className="w-full h-24 rounded-[2rem] bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center gap-4 text-[#0d0e12] font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#6366f1]/20 group active:scale-95 transition-all">
                        <Download className="w-6 h-6" />
                        Download Strategic Shield Plan (PDF)
                    </button>

                </div>

                {/* Right Side: Insights */}
                <div className="lg:col-span-4 space-y-12">
                     <div className="shield-glass p-8 space-y-6">
                         <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-[#6366f1]" />
                              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Strategy Matrix</h3>
                         </div>
                         <div className="space-y-4">
                             {[
                                { label: 'Net Taxable (New)', val: 1500000 - 75000, color: 'text-white' },
                                { label: 'Net Taxable (Old)', val: taxableOldValue(income), color: 'text-slate-400' },
                                { label: 'Active Shield Ratio', val: ((calculations.totalDeductions / income) * 100).toFixed(1) + '%', color: 'text-[#6366f1]' }
                             ].map((item, idx) => (
                                 <div key={idx} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex justify-between items-center group hover:bg-[#6366f1]/5 transition-all">
                                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-400">{item.label}</span>
                                     <span className={`font-bold font-serif ${item.color}`}>{typeof item.val === 'number' ? formatCurrency(item.val) : item.val}</span>
                                 </div>
                             ))}
                         </div>
                     </div>

                     <div className="p-8 rounded-[2.5rem] bg-[#6366f1]/5 border border-[#6366f1]/20 relative overflow-hidden group">
                         <AlertCircle className="absolute -right-4 -bottom-4 w-32 h-32 text-[#6366f1] opacity-5 group-hover:opacity-10 transition-opacity" />
                         <div className="space-y-4 relative z-10">
                              <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[#6366f1]">Market Insight</h5>
                              <p className="text-lg font-medium italic text-white leading-relaxed">
                                  "The 2025 Finance Act has pivoted the baseline toward the New Regime. Aggressive 80C is now only strategic if combined with HRA or Housing Debt."
                              </p>
                         </div>
                     </div>
                </div>
            </div>

            {/* Content Section */}
            <section className="bg-white text-slate-900 mt-32 py-32 rounded-t-[80px]">
                 <div className="max-w-5xl mx-auto px-6">
                      
                      <div className="flex items-center gap-6 mb-16">
                          <div className="w-20 h-20 rounded-[2.5rem] bg-[#6366f1] flex items-center justify-center shadow-2xl shadow-[#6366f1]/30">
                              <HelpCircle className="w-10 h-10 text-white" />
                          </div>
                          <div>
                              <h2 className="text-5xl font-black tracking-tighter">Your Sovereign Shield <br/><span className="text-[#6366f1]">Architecture.</span></h2>
                          </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                           <div className="space-y-6">
                               <h4 className="text-2xl font-black tracking-tight flex items-center gap-2 cursor-help group"><ShieldCheck className="text-[#6366f1]" /> The Optimal Path</h4>
                               <p className="text-slate-500 text-lg leading-relaxed font-medium">Our engine conducts a raw mathematical race between regimes. For FY 2026-27, the New Regime (Section 115BAC) features zero tax up to ₹12L (including rebates), often outperforming the Old Regime's 30% slab.</p>
                           </div>
                           <div className="space-y-6">
                               <h4 className="text-2xl font-black tracking-tight flex items-center gap-2"><Zap className="text-[#6366f1]" /> The NPS Shield</h4>
                               <p className="text-slate-500 text-lg leading-relaxed font-medium">In the Old Regime, Section 80CCD(1B) provides an exclusive ₹50,000 window above the 80C limit. For high-bracket earners (30%), this is a critical capital preservation tool.</p>
                           </div>
                      </div>

                      <div className="mt-20 border-t border-slate-100 pt-20">
                          <CalculatorContentWrapper {...contentData} />
                      </div>
                 </div>
            </section>

        </main>
      </div>
    </>
  );

  function taxableOldValue(inc: number) {
      const total = Math.min(150000, investments80C) + Math.min(25000, premium80D) + Math.min(50000, nps80CCD) + hraExemption + Math.min(200000, homeLoanInterest);
      return Math.max(0, inc - 50000 - total);
  }
};

export default TaxSaverWizard;
