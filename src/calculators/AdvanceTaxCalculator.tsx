import React from 'react';
import { Link } from 'react-router-dom';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { getCalculatorById } from '../data/calculatorData';
import { advanceTaxConfig } from '../engine/configs/advanceTaxConfig';
import { useOmniEngine } from '../engine/useOmniEngine';
import { OmniWidget } from '../engine/components/OmniWidget';

/* ═══════════════════════════════════════════════════════
   ADVANCE TAX CALCULATOR — PREMIUM EDITION 2026/27 (Obscura Aesthetic)
   Keywords: advance tax calculator, advance tax due dates, advance tax india
   ═══════════════════════════════════════════════════════ */

export const AdvanceTaxCalculator: React.FC = () => {
  const engine = useOmniEngine(advanceTaxConfig);

  const netTax = Number(engine.state.netTax?.value) || 0;
  
  // Installments: 15%, 45%, 75%, 100%
  const inst1 = netTax * 0.15;
  const inst2 = (netTax * 0.45) - inst1;
  const inst3 = (netTax * 0.75) - (inst1 + inst2);
  const inst4 = netTax - (inst1 + inst2 + inst3);
  const installments = [inst1, inst2, inst3, inst4];


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
          
          {/* LEFT COLUMN: Inputs & OmniWidget Results */}
          <div className="lg:col-span-7 space-y-8 atc-glass p-8">
            <OmniWidget config={advanceTaxConfig} engine={engine} />
          </div>

          {/* RIGHT COLUMN: Results (Sticky) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 space-y-6">

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
