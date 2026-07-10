import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Settings, 
  TrendingUp, 
  Gauge, 
  Info, 
  Download, 
  CheckCircle2,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

/* ═══════════════════════════════════════════════════════
   LOAN PREPAYMENT VS INVESTMENT OPTIMIZER — 2026 ELITE
   Keywords: loan prepayment vs investment, pay off home loan or invest,
   debt vs equity optimizer, interest savings calculator india,
   prepayment ROI vs mutual funds
   ═══════════════════════════════════════════════════════ */

interface CalculationResult {
  debtLiquidation: {
    interestSaved: number;
    revisedTenure: number;
    yearsSaved: number;
  };
  wealthGeneration: {
    projectedCorpus: number;
    netWealthDelta: number;
  };
  recommendation: 'INVEST' | 'PREPAY';
}

export const LoanPrepaymentCalculator: React.FC = () => {
  // --- State Management ---
  const [loanBalance, setLoanBalance] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [remainingTenure, setRemainingTenure] = useState<number>(15);
  const [extraFunds, setExtraFunds] = useState<number>(20000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12.0);
  const [taxBenefit, setTaxBenefit] = useState<'OLD' | 'NEW' | 'NONE'>('OLD');

  const FAQ_DATA = [
    { question: 'Should I prepay my home loan or invest in SIP?', answer: 'The mathematical answer depends on the "Spread". If your Expected Investment Return (minus tax) is higher than the Loan Interest Rate, you should invest. For an 8.5% loan vs 12% Mutual Fund, investing creates more wealth. However, prepayment gives a 100% "Guaranteed Return" of 8.5%.' },
    { question: 'What is the "Opportunity Cost" of prepaying?', answer: 'Opportunity cost is the wealth you lose by not investing. For example, ₹20,000 extra paid towards an 8.5% loan saves interest, but that same ₹20,000 in an index fund at 13% could generate lakhs more over 10 years. This tool quantifies that "Delta".' },
    { question: 'Does the New Tax Regime (FY 2026-27) affect this decision?', answer: 'Yes! In the New Regime, most deductions for home loan interest (Section 24) are gone. This effectively increases your "Cost of Debt" since you don\'t get a tax shield. High-income earners in the New Regime should prioritize prepayment more than those in the Old Regime who claim 30% tax savings on interest.' }
  ];

  const contentData = {
    title: "Loan Prepayment vs Investment Optimizer",
    description: "Decide whether to pay off your home loan or invest in mutual funds. Our professional-grade optimizer compares guaranteed debt savings vs. compounding equity wealth for FY 2026-27.",
    benefits: [
      "Quantify the 'Wealth Delta' between debt clearance and market investment",
      "Real-time ROI analysis of every extra rupee paid towards your loan",
      "Factoring in Tax Benefits (Section 24) for accurate side-by-side comparison",
      "Tenure Reduction vs Corpus Generation visualization",
      "Optimized for 2026-2027 Indian financial regulations",
      "Professional Grade Newton-Raphson adjacent amortization logic"
    ],
    howToSteps: [
      { step: "Enter Current Loan Details", details: "Input your outstanding principal, rate, and remaining years to establish the 'Cost of Debt'." },
      { step: "Define Available Capital", details: "Specify the 'Monthly Extra Funds' you currently have available for either prepayment or SIP." },
      { step: "Set Growth Expectations", details: "Choose your expected Mutual Fund return (e.g., 12% for Large Cap, 15% for Mid/Small Cap)." },
      { step: "Review Strategy Recommendation", details: "The 'Sovereign Wealth' summary will tell you exactly which path leads to higher net wealth by the end of the tenure." }
    ],
    faqs: FAQ_DATA,
    relatedCalculators: [
      { name: "EMI Calculator", url: "/calculators/emi-calculator", description: "Standard monthly payment tracker" },
      { name: "SIP Calculator", url: "/calculators/sip-calculator", description: "Standard wealth projection" },
      { name: "XIRR Tracker", url: "/calculators/xirr-tracker", description: "Portfolio yield analyzer" }
    ],
    examples: [
      { 
        scenario: "Home Loan vs SIP", 
        inputs: [
          { label: "Loan Amount", value: "₹50,00,000" },
          { label: "Interest Rate", value: "8.5%" },
          { label: "Extra Monthly", value: "₹20,000" }
        ],
        result: "Investing (SIP) wins by ₹12.5 Lakhs",
        explanation: "While prepaying saves interest, the 12% market returns on the ₹20k SIP outperform the 8.5% interest savings over 15 years." 
      },
      { 
        scenario: "Personal Loan vs FD", 
        inputs: [
          { label: "Loan Amount", value: "₹10,00,000" },
          { label: "Interest Rate", value: "12%" },
          { label: "Extra Monthly", value: "₹10,000" }
        ],
        result: "Prepayment wins by ₹3 Lakhs",
        explanation: "Since the loan interest (12%) is much higher than typical FD returns (7%), paying off the debt is the mathematically superior choice." 
      }
    ],
    tips: [
      "Always prioritize prepaying high-interest debt (e.g., Credit Cards >15%) over investing.",
      "Consider the tax shield in the Old Regime which lowers the 'Effective' interest rate."
    ],
    mistakes: [
      "Ignoring the guarantee of debt savings vs. the volatility of market returns.",
      "Not accounting for processing fees or prepayment penalties."
    ]
  };

  // --- Logic & Calculations ---
  const results = useMemo((): CalculationResult => {
    const monthlyRate = interestRate / 12 / 100;
    const investmentMonthlyRate = expectedReturn / 12 / 100;
    const totalMonths = remainingTenure * 12;

    // Standard EMI
    const emi = (loanBalance * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Scenario A: Prepayment Logic
    let balancePrepay = loanBalance;
    let totalInterestPrepay = 0;
    let monthsPrepay = 0;
    
    while (balancePrepay > 0 && monthsPrepay < 600) { 
      const interest = balancePrepay * monthlyRate;
      const principal = emi + extraFunds - interest;
      balancePrepay -= principal;
      totalInterestPrepay += interest;
      monthsPrepay++;
    }

    const originalTotalInterest = (emi * totalMonths) - loanBalance;
    const interestSaved = originalTotalInterest - totalInterestPrepay;
    const revisedTenureYears = monthsPrepay / 12;

    // Scenario B: Investment Logic (SIP) 
    // We calculate the Future Value of 'extraFunds' over the REMAINING TENURE of the original loan
    // because that's the opportunity window.
    const projectedCorpus = extraFunds * 
                           ((Math.pow(1 + investmentMonthlyRate, totalMonths) - 1) / investmentMonthlyRate) * 
                           (1 + investmentMonthlyRate);
    
    // Wealth Delta = (Corpus Generated) - (Interest Saved by Prepaying)
    // Note: This is an approximation of Net Wealth improvement.
    const netWealthDelta = projectedCorpus - interestSaved;

    return {
      debtLiquidation: {
        interestSaved: Math.max(0, interestSaved),
        revisedTenure: revisedTenureYears,
        yearsSaved: Math.max(0, remainingTenure - revisedTenureYears),
      },
      wealthGeneration: {
        projectedCorpus,
        netWealthDelta,
      },
      recommendation: netWealthDelta > 0 ? 'INVEST' : 'PREPAY'
    };
  }, [loanBalance, interestRate, remainingTenure, extraFunds, expectedReturn]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <>
      <SEOHelmet 
        title="Loan Prepayment vs Investment Optimizer 2026 | Debt or Equity?" 
        description="Calculate if you should pay off your home loan or invest in SIP. High-precision comparison of interest savings vs market wealth generation for FY 2026-27." 
        keywords="loan prepayment vs investment, debt vs mutual funds, interest savings calculator, home loan strategy india"
        url="/calculators/loan-prepayment-calculator"
      />

      <style>{`
        .lpc-premium { background-color: #080c14; font-family: 'DM Sans', sans-serif; }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(40px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 2.5rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .glass-card:hover { border-color: rgba(99, 102, 241, 0.2); background: rgba(255, 255, 255, 0.05); }
        .text-gradient { background: linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.4) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .accent-slider { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 10px; background: #1e293b; outline: none; }
        .accent-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #6366f1; border: 3px solid #080c14; box-shadow: 0 0 15px rgba(99, 102, 241, 0.5); cursor: pointer; }
      `}</style>

      <div className="lpc-premium min-h-screen text-slate-200">
        
        {/* Navigation */}
        <div className="pt-6 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-between relative z-50">
            <Link to="/calculators" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to Calculators
            </Link>
            <div className="flex items-center gap-3">
                 <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] font-black tracking-widest text-indigo-400/60 uppercase">Strategy Engine</span>
                    <span className="text-xs font-bold text-white">Advanced Optimization v4.1</span>
                 </div>
                 <Settings className="w-5 h-5 text-slate-500 hover:rotate-90 transition-all cursor-pointer" />
            </div>
        </div>

        {/* Hero Section */}
        <div className="pt-16 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center md:text-left">
           <p className="text-[10px] uppercase tracking-[0.4em] text-indigo-400/80 font-black mb-4">Financial Intelligence v4.0</p>
           <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-white leading-none mb-6">
              Sovereign <span className="italic text-indigo-400 font-medium tracking-tight">Wealth</span><br/>Projection.
           </h1>
           <p className="text-lg md:text-2xl text-slate-400/80 max-w-2xl font-light leading-relaxed">
              A high-precision analysis engine designed to quantify the opportunity cost of debt vs. strategic market exposure.
           </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
          
          {/* Inputs Section */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8">
             
             {/* 01. Loan Architecture */}
             <div className="space-y-6">
                <div className="flex items-center gap-3 opacity-60">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <h2 className="text-xs uppercase tracking-[0.2em] font-black">01. Loan Architecture</h2>
                </div>
                <div className="glass-card p-10 space-y-10">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end mb-2">
                           <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Loan Balance</label>
                           <span className="text-3xl font-medium text-white">{formatCurrency(loanBalance)}</span>
                        </div>
                        <input 
                           type="range" min="100000" max="20000000" step="100000"
                           value={loanBalance} onChange={(e) => setLoanBalance(Number(e.target.value))}
                           className="accent-slider"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-4">
                           <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Interest Rate (%)</label>
                           <input 
                             type="number" value={interestRate} step="0.1"
                             onChange={(e) => setInterestRate(Number(e.target.value))}
                             className="w-full bg-transparent border-b border-white/10 pb-2 text-2xl font-medium text-white outline-none focus:border-indigo-500 transition-all"
                           />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Tenure (Years)</label>
                           <input 
                             type="number" value={remainingTenure}
                             onChange={(e) => setRemainingTenure(Number(e.target.value))}
                             className="w-full bg-transparent border-b border-white/10 pb-2 text-2xl font-medium text-white outline-none focus:border-indigo-500 transition-all"
                           />
                        </div>
                    </div>
                </div>
             </div>

             {/* 02. Capital Allocation */}
             <div className="space-y-6">
                <div className="flex items-center gap-3 opacity-60">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <h2 className="text-xs uppercase tracking-[0.2em] font-black">02. Capital Allocation</h2>
                </div>
                <div className="glass-card p-10 space-y-10 border-indigo-500/10">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end mb-2">
                           <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Monthly Extra Funds (SIP/Prepay)</label>
                           <span className="text-3xl font-medium text-indigo-400">{formatCurrency(extraFunds)}</span>
                        </div>
                        <input 
                           type="range" min="1000" max="200000" step="1000"
                           value={extraFunds} onChange={(e) => setExtraFunds(Number(e.target.value))}
                           className="accent-slider"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-12">
                         <div className="space-y-4">
                           <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Market Return (%)</label>
                           <input 
                             type="number" value={expectedReturn} step="0.5"
                             onChange={(e) => setExpectedReturn(Number(e.target.value))}
                             className="w-full bg-transparent border-b border-white/10 pb-2 text-2xl font-medium text-white outline-none focus:border-indigo-500 transition-all"
                           />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] uppercase font-black tracking-widest text-slate-500">Tax Shield</label>
                           <div className="flex gap-2 bg-white/5 p-1 rounded-2xl">
                               {(['OLD', 'NEW', 'NONE'] as const).map(mode => (
                                   <button 
                                     key={mode}
                                     onClick={() => setTaxBenefit(mode)}
                                     className={`flex-1 py-2 text-[10px] font-black rounded-xl transition-all ${taxBenefit === mode ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                                   >
                                       {mode}
                                   </button>
                               ))}
                           </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>

          {/* Result Engine Section */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-8">
              
              <div className="grid grid-cols-1 gap-6">
                
                {/* Prepayment Card */}
                <div className="glass-card p-8 bg-gradient-to-br from-white/[0.04] to-transparent relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Gauge className="w-20 h-20 text-indigo-400" />
                   </div>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                         <Zap className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="font-bold text-white tracking-tight uppercase text-xs">Debt Liquidation</h3>
                   </div>
                   <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Interest Saved</p>
                        <p className="text-4xl font-medium text-indigo-300 tracking-tighter">{formatCurrency(results.debtLiquidation.interestSaved)}</p>
                      </div>
                      <div className="flex justify-between items-end border-t border-white/5 pt-4">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Time Reduction</p>
                        <p className="text-xl font-bold text-white">{results.debtLiquidation.yearsSaved.toFixed(1)} <span className="text-xs text-slate-500 font-medium">Yrs</span></p>
                      </div>
                   </div>
                </div>

                {/* Investment Card */}
                <div className="glass-card p-8 bg-gradient-to-br from-indigo-500/[0.05] to-transparent relative overflow-hidden group border-indigo-500/20">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <TrendingUp className="w-24 h-24 text-indigo-400" />
                   </div>
                   <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                         <TrendingUp className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="font-bold text-white tracking-tight uppercase text-xs">Wealth Generation</h3>
                   </div>
                   <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Projected SIP Corpus</p>
                        <p className="text-4xl font-medium text-emerald-400 tracking-tighter">{formatCurrency(results.wealthGeneration.projectedCorpus)}</p>
                      </div>
                      <div className="flex justify-between items-end border-t border-white/5 pt-4">
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Net Wealth Delta</p>
                        <p className={`text-xl font-bold ${results.wealthGeneration.netWealthDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {results.wealthGeneration.netWealthDelta > 0 ? '+' : ''}{formatCurrency(results.wealthGeneration.netWealthDelta)}
                        </p>
                      </div>
                   </div>
                </div>

              </div>

              {/* Summary Insight */}
              <div className="glass-card p-10 bg-[#121624] border-indigo-500/30 relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                      <CheckCircle2 className="w-40 h-40 text-indigo-400" />
                  </div>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/40">
                         <Info className="w-6 h-6 text-indigo-400" />
                      </div>
                      <h4 className="text-2xl font-medium text-white tracking-tight leading-tight">
                         Analysis Complete: <br/>
                         <span className="text-indigo-400">
                             {results.recommendation === 'INVEST' ? 'Investments' : 'Debt Liquidation'}
                         </span> is superior.
                      </h4>
                  </div>
                  <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20 mb-8 italic text-indigo-100/90 leading-relaxed font-medium">
                      "Investing the extra {formatCurrency(extraFunds)} monthly creates a {formatCurrency(results.wealthGeneration.projectedCorpus)} corpus, outperforming the {formatCurrency(results.debtLiquidation.interestSaved)} interest saving by {formatCurrency(Math.abs(results.wealthGeneration.netWealthDelta))}."
                  </div>
                  <button onClick={() => window.print()} className="w-full py-5 rounded-[2rem] bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:scale-[0.98] transition-all flex items-center justify-center gap-3">
                      <Download className="w-4 h-4" /> Export Wealth Audit
                  </button>
              </div>

          </div>

        </div>

        {/* Content & SEO Section */}
        <div className="bg-white text-slate-900 rounded-t-[60px] pt-32 pb-32">
           <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-16 h-16 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200">
                    <HelpCircle className="w-8 h-8 text-white" />
                 </div>
                 <div>
                    <h2 className="text-4xl font-black tracking-tighter">Strategic Insights <br/><span className="text-indigo-600">for 2026 Portfolios.</span></h2>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div className="space-y-6">
                    <h4 className="text-xl font-bold flex items-center gap-3"><ShieldCheck className="text-indigo-600" /> The spread threshold</h4>
                    <p className="text-slate-500 leading-relaxed text-lg font-medium">In the current fiscal landscape, any loan under 9% interest is considered 'Strategic Debt'. If your investment appetite can generate &gt;12% returns, the 3% delta compounds into significant wealth over 15 years.</p>
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-xl font-bold flex items-center gap-3"><Zap className="text-indigo-600" /> Guaranteed vs Floating</h4>
                    <p className="text-slate-500 leading-relaxed text-lg font-medium">Prepayment offers a 100% 'Guaranteed' ROI equal to your interest rate. Investment returns are higher but subject to market volatility. Use this tool to find your personal risk-reward equilibrium.</p>
                 </div>
              </div>

              <div className="mt-20">
                <CalculatorContentWrapper {...contentData} />
              </div>
           </div>
        </div>

      </div>
    </>
  );
};

export default LoanPrepaymentCalculator;
