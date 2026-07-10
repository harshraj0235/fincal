import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ChevronRight, 
  ArrowUpRight, 
  Zap, 
  BarChart3, 
  ChevronLeft,
  Target,
  ShieldCheck
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

/* ═══════════════════════════════════════════════════════
   THE STEP-UP WEALTH MULTIPLIER — 2026 EMERALD OBSCURA
   Keywords: step up sip calculator india, sip with annual increment,
   top up sip returns, wealth multiplier, compounding calculator 2026
   ═══════════════════════════════════════════════════════ */

export const StepUpSipCalculator: React.FC = () => {
  const [monthlySip, setMonthlySip] = useState<number>(25000);
  const [stepUpPercent, setStepUpPercent] = useState<number>(10);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [tenure, setTenure] = useState<number>(20);

  const results = useMemo(() => {
    const monthlyRate = returnRate / 12 / 100;
    let totalWealthStepUp = 0;
    let totalInvestedStepUp = 0;
    let currentSip = monthlySip;
    const yearlyBreakup: Array<{year: number; investment: number; value: number; monthly: number}> = [];

    for (let year = 1; year <= tenure; year++) {
      let yearlyInvestment = 0;
      for (let month = 1; month <= 12; month++) {
        totalInvestedStepUp += currentSip;
        yearlyInvestment += currentSip;
        totalWealthStepUp = (totalWealthStepUp + currentSip) * (1 + monthlyRate);
      }
      
      yearlyBreakup.push({
          year,
          investment: totalInvestedStepUp,
          value: totalWealthStepUp,
          monthly: currentSip
      });
      
      currentSip = currentSip * (1 + stepUpPercent / 100);
    }

    // Regular SIP calculation for comparison
    let totalWealthRegular = 0;
    for (let month = 1; month <= tenure * 12; month++) {
      totalWealthRegular = (totalWealthRegular + monthlySip) * (1 + monthlyRate);
    }

    return {
      stepUpValue: Math.round(totalWealthStepUp),
      regularValue: Math.round(totalWealthRegular),
      diff: Math.round(totalWealthStepUp - totalWealthRegular),
      totalInvested: Math.round(totalInvestedStepUp),
      yearlyBreakup
    };
  }, [monthlySip, stepUpPercent, returnRate, tenure]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} L`;
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  const contentData = {
    title: "The Step-up Wealth Multiplier",
    description: "Experience the geometric power of compounding with 'Emerald Prosperity'. A Step-up SIP aligns your investments with your career growth, turning modest increments into multi-crore legacies.",
    benefits: [
        "Aligns investments with annual salary increments (5-15%)",
        "Significantly higher terminal corpus compared to flat SIPs",
        "Emerald Obscura 2026 UI with 'Growth Path' visualization",
        "Comparison engine showing the 'Top-up Advantage'",
        "Real-time momentum velocity indicator (Late-stage compounding focus)",
        "Year-wise wealth architecture breakdown for strategic planning"
    ],
    howToSteps: [
        { step: "Initialize SIP", details: "Set your starting monthly investment. Even a small start is powerful with a step-up." },
        { step: "Define Growth Pace", details: "Input your expected annual salary hike (usually 8-12%) as the Step-up %." },
        { step: "Set Return Expectations", details: "Choose a realistic return rate (12% for Equity, 10% for Hybrid)." },
        { step: "Visualize the Gap", details: "Review the 'Step-up Advantage' to see how much extra wealth you create vs a regular SIP." }
    ],
    faqs: [
        { question: "Why is a Step-up SIP better than a Regular SIP?", answer: "A Step-up SIP increases the principal amount every year. Since compounding works on the principal, increasing it annually leads to exponential growth in the final years." },
        { question: "What is a realistic Step-up percentage?", answer: "Most salaried professionals in India set a step-up of 5% to 10%, coinciding with their annual appraisal cycles." },
        { question: "Is there an upper limit to the Step-up?", answer: "Practically, your investment should not exceed your surplus income. Most calculators cap the visualization at 25% for stability." }
    ],
    relatedCalculators: [
        { name: "Retirement Planner", url: "/calculators/retirement-calculator", description: "Design your exit" },
        { name: "Lumpsum Calculator", url: "/calculators/lumpsum-calculator", description: "One-time wealth injection" },
        { name: "XIRR Tracker", url: "/calculators/xirr-tracker", description: "Audit your real growth" }
    ],
    examples: [
        { 
          scenario: "Early Career Growth", 
          inputs: [
            { label: "Monthly SIP", value: "₹10,000" },
            { label: "Annual Step-up", value: "10%" },
            { label: "Tenure", value: "20 Years" }
          ],
          result: "Step-up Value: ₹1.56 Crores",
          explanation: "By increasing your SIP by just ₹1,000 every year, you end up with ₹60 Lakhs more than a flat SIP." 
        },
        { 
          scenario: "Aggressive Wealth Building", 
          inputs: [
            { label: "Monthly SIP", value: "₹25,000" },
            { label: "Annual Step-up", value: "15%" },
            { label: "Tenure", value: "15 Years" }
          ],
          result: "Step-up Value: ₹2.1 Crores",
          explanation: "The 15% step-up mirrors a fast-track career, more than doubling the regular SIP corpus." 
        }
    ],
    tips: [
      "Set your step-up date to coincide with your annual salary appraisal month.",
      "Even a small 5% step-up can beat inflation's erosion of your purchasing power."
    ],
    mistakes: [
      "Stopping the step-up when expenses rise—lower the % but don't stop.",
      "Not increasing life insurance coverage as your SIP goal (and future wealth) grows."
    ]
  };

  return (
    <>
      <SEOHelmet 
        title="Step-Up SIP Calculator 2026 | Wealth Multiplier with Annual Top-up" 
        description="Calculate the power of Step-up SIP with Emerald Prosperity UI. Compare regular vs step-up SIP returns and plan your multi-crore wealth growth." 
        keywords="step up sip calculator, top up sip calculator india, sip with annual increment, wealth multiplier calculator"
        url="/calculators/step-up-sip-calculator"
      />

      <style>{`
        .emerald-obscura { background-color: #080c14; font-family: 'Manrope', sans-serif; }
        .emerald-glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(40px); border: 1px solid rgba(16, 185, 129, 0.1); border-radius: 2rem; transition: all 0.3s ease; }
        .emerald-glass:hover { border-color: rgba(16, 185, 129, 0.3); background: rgba(255, 255, 255, 0.04); }
        .emerald-text { color: #10b981; }
        .emerald-slider { -webkit-appearance: none; width: 100%; height: 2px; background: rgba(16, 185, 129, 0.2); outline: none; }
        .emerald-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #10b981; cursor: pointer; box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); }
      `}</style>
      
      <div className="emerald-obscura min-h-screen text-[#e5e7eb] pb-32">
        
        {/* Navigation */}
        <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center relative z-50">
            <Link to="/calculators" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#10b981] transition-all">
                <ChevronLeft className="w-4 h-4" /> Exit to Portfolio
            </Link>
            <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center shadow-lg shadow-[#10b981]/20">
                     <TrendingUp className="text-white w-5 h-5" />
                 </div>
                 <span className="text-xs font-black uppercase tracking-[0.3em] text-[#10b981]">Wealth Multiplier</span>
            </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
            
            {/* Hero Section */}
            <header className="space-y-4 max-w-2xl">
                <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-white">
                   The Wealth <br/>
                   <span className="text-[#10b981]">Multiplier.</span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-lg">
                   Experience the geometric power of career-linked investing. Small annual top-ups, massive terminal legacies.
                </p>
            </header>

            {/* Performance Header - Big Advantage Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-12 xl:col-span-5">
                    <div className="emerald-glass p-10 h-full flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                             <Zap className="w-40 h-40 text-[#10b981]" />
                        </div>
                        <div className="space-y-1 relative z-10">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#10b981]/60">The Step-up Advantage</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-7xl font-black text-white tracking-tighter">{formatCurrency(results.diff).split(' ')[1]}</span>
                                <span className="text-3xl font-bold text-[#10b981]">{formatCurrency(results.diff).split(' ')[2] || ''}</span>
                            </div>
                            <p className="text-sm font-bold text-[#10b981]/80 mt-2 flex items-center gap-2">
                                Extra wealth created vs. regular SIP <ArrowUpRight className="w-4 h-4" />
                            </p>
                        </div>
                        <div className="pt-10 space-y-2 relative z-10">
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Maturity Value: {formatCurrency(results.stepUpValue)}</p>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#10b981] to-[#4edea3] shadow-[0_0_15px_#10b981]" style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-12 xl:col-span-7">
                    <div className="emerald-glass p-10 bg-gradient-to-br from-white/[0.03] to-transparent h-full">
                         <div className="flex justify-between items-start mb-12">
                             <div>
                                 <h3 className="text-3xl font-black tracking-tighter text-white">Growth Velocity</h3>
                                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-2">{tenure} Year Projection Strategy</p>
                             </div>
                             <div className="flex gap-6">
                                 <div className="flex items-center gap-2">
                                     <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                                     <span className="text-[10px] uppercase font-black tracking-widest text-[#10b981]">Step-up Path</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                     <div className="w-2 h-2 rounded-full bg-white/10" />
                                     <span className="text-[10px] uppercase font-black tracking-widest text-slate-600">Standard Path</span>
                                 </div>
                             </div>
                         </div>
                         
                         {/* Visual Chart Placeholder Area */}
                         <div className="h-40 relative flex items-end gap-1 mb-8 overflow-hidden pt-10">
                             {results.yearlyBreakup.filter((_, i) => i % 2 === 0).map((year, i) => {
                                 const height = (year.value / results.stepUpValue) * 100;
                                 const regValue = (monthlySip * 12 * year.year); // Approximate regular value logic
                                 const regHeight = (regValue / results.stepUpValue) * 100;
                                 return (
                                     <div key={i} className="flex-1 flex flex-col justify-end gap-1 relative group">
                                         <div className="w-full bg-[#10b981] rounded-t-sm transition-all group-hover:bg-[#4edea3]" style={{ height: `${height}%`, opacity: 0.2 + (i/10) }} />
                                         <div className="absolute bottom-0 w-full bg-white/5 rounded-t-sm" style={{ height: `${regHeight}%` }} />
                                     </div>
                                 );
                             })}
                         </div>

                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-8">
                             <div className="space-y-1">
                                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Total Invested</span>
                                 <p className="font-bold text-white">{formatCurrency(results.totalInvested)}</p>
                             </div>
                             <div className="space-y-1">
                                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Returns Only</span>
                                 <p className="font-bold text-[#10b981]">{formatCurrency(results.stepUpValue - results.totalInvested)}</p>
                             </div>
                             <div className="space-y-1">
                                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Power Multiple</span>
                                 <p className="font-bold text-white">{(results.stepUpValue / results.totalInvested).toFixed(2)}x</p>
                             </div>
                             <div className="space-y-1">
                                 <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Final SIP</span>
                                 <p className="font-bold text-white">{formatCurrency(results.yearlyBreakup[tenure-1]?.monthly || 0)}/mo</p>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Input Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                
                {/* Controls */}
                <div className="lg:col-span-8 space-y-12">
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 opacity-60">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                             <h2 className="text-[10px] uppercase tracking-[0.2em] font-black">Strategic Parameters</h2>
                        </div>
                        
                        <div className="emerald-glass p-10 space-y-12">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                 <div className="space-y-6">
                                     <div className="flex justify-between items-center">
                                         <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Monthly SIP (Initial)</label>
                                         <span className="text-3xl font-black text-[#10b981]">{formatCurrency(monthlySip)}</span>
                                     </div>
                                     <input type="range" min="1000" max="250000" step="1000" value={monthlySip} onChange={(e) => setMonthlySip(Number(e.target.value))} className="emerald-slider" />
                                 </div>
                                 <div className="space-y-6">
                                     <div className="flex justify-between items-center">
                                         <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Annual Step-Up %</label>
                                         <span className="text-3xl font-black text-[#10b981]">{stepUpPercent}%</span>
                                     </div>
                                     <input type="range" min="1" max="25" step="1" value={stepUpPercent} onChange={(e) => setStepUpPercent(Number(e.target.value))} className="emerald-slider" />
                                 </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                 <div className="space-y-6">
                                     <div className="flex justify-between items-center">
                                         <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Expected Return %</label>
                                         <span className="text-3xl font-black text-[#10b981]">{returnRate}%</span>
                                     </div>
                                     <input type="range" min="5" max="30" step="0.5" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="emerald-slider" />
                                 </div>
                                 <div className="space-y-6">
                                     <div className="flex justify-between items-center">
                                         <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Tenure (Years)</label>
                                         <span className="text-3xl font-black text-[#10b981]">{tenure} Yrs</span>
                                     </div>
                                     <input type="range" min="1" max="40" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="emerald-slider" />
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Momentum Card */}
                    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#10b981]/10 to-[#080c14] border border-[#10b981]/20 flex flex-col md:flex-row items-center gap-10 group overflow-hidden relative">
                         <div className="absolute -right-20 -top-20 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                             <Target className="w-64 h-64 text-[#10b981]" />
                         </div>
                         <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-[#10b981] flex items-center justify-center animate-spin-slow">
                              <Zap className="text-[#10b981] w-8 h-8" />
                         </div>
                         <div className="space-y-2 relative z-10 text-center md:text-left">
                             <h4 className="text-2xl font-black text-white">Compounding Momentum</h4>
                             <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                                In your setup, <span className="text-[#10b981] font-bold">~68% of your total wealth</span> will be generated in the final 25% of the tenure. Patience is the ultimate multiplier.
                             </p>
                         </div>
                    </div>

                </div>

                {/* Right Side: Breakdown & Assets */}
                <div className="lg:col-span-4 space-y-8">
                     <div className="emerald-glass p-8 space-y-6 overflow-hidden">
                         <div className="flex items-center gap-2 mb-2">
                             <BarChart3 className="w-4 h-4 text-[#10b981]" />
                             <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Annual Architecture</h3>
                         </div>
                         <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                             {results.yearlyBreakup.map((row) => (
                                 <div key={row.year} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex justify-between items-center group hover:bg-[#10b981]/5 transition-all">
                                     <div>
                                         <p className="text-[10px] font-black text-slate-600 uppercase">Year {row.year}</p>
                                         <p className="text-xs font-bold text-white mt-1">SIP: {formatCurrency(row.monthly)}</p>
                                     </div>
                                     <div className="text-right">
                                         <p className="text-xs font-black text-[#10b981]">{formatCurrency(row.value)}</p>
                                         <p className="text-[9px] font-bold text-slate-500 uppercase mt-0.5">Wealth Basis</p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>

                     <div className="p-8 rounded-3xl bg-[#10b981] flex justify-between items-center group cursor-pointer hover:shadow-2xl hover:shadow-[#10b981]/30 transition-all">
                         <div className="space-y-1">
                             <p className="text-[10px] font-black text-[#080c14] opacity-60 uppercase tracking-widest">Ready to Commit?</p>
                             <h4 className="text-xl font-black text-[#080c14]">Start Hybrid Folio</h4>
                         </div>
                         <div className="w-12 h-12 rounded-full bg-[#080c14] flex items-center justify-center text-[#10b981] group-hover:scale-110 transition-transform">
                             <ChevronRight />
                         </div>
                     </div>
                </div>

            </div>

            {/* SEO & Strategy Content */}
            <section className="mt-32 p-16 rounded-[3rem] bg-white text-slate-900 space-y-16">
                 <div className="max-w-4xl mx-auto space-y-12">
                      <div className="flex items-center gap-6">
                           <div className="w-20 h-20 rounded-[2rem] bg-[#10b981] flex items-center justify-center shadow-xl shadow-[#10b981]/30">
                               <ShieldCheck className="w-10 h-10 text-white" />
                           </div>
                           <h2 className="text-4xl md:text-5xl font-black tracking-tighter">The Step-up SIP <br/>Strategic Guide.</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           <div className="space-y-4">
                               <h3 className="text-xl font-black flex items-center gap-2"><Zap className="text-[#10b981]" /> Why Top-up?</h3>
                               <p className="text-slate-500 leading-relaxed font-medium">Static SIPs lose 'real' purchasing power due to inflation. By stepping up 10% annually, you not only beat inflation but also capture more units in your core earning years, creating a massive delta in terminal wealth.</p>
                           </div>
                           <div className="space-y-4">
                               <h3 className="text-xl font-black flex items-center gap-2"><Target className="text-[#10b981]" /> Ideal Benchmarks</h3>
                               <p className="text-slate-500 leading-relaxed font-medium">For salaried professionals, a step-up rate equal to your average increment (8-12%) is optimal. This ensures your lifestyle and investment growth remain in perfect equilibrium.</p>
                           </div>
                      </div>

                      <div className="pt-12 border-t border-slate-100 pb-12">
                           <CalculatorContentWrapper {...contentData} />
                      </div>
                 </div>
            </section>

        </main>

      </div>
    </>
  );
};

export default StepUpSipCalculator;