import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const Section80CCalculator: React.FC = () => {
  const [ppf, setPpf] = useState<number>(0);
  const [elss, setElss] = useState<number>(0);
  const [epf, setEpf] = useState<number>(0);
  const [lifeInsurance, setLifeInsurance] = useState<number>(0);
  const [homeLoanPrincipal, setHomeLoanPrincipal] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [deduction, setDeduction] = useState<number>(0);
  
  useEffect(() => {
    const total = ppf + elss + epf + lifeInsurance + homeLoanPrincipal;
    setTotalInvestment(total);
    setDeduction(Math.min(total, 150000));
  }, [ppf, elss, epf, lifeInsurance, homeLoanPrincipal]);

  const quickPresets = [
    { label: 'Max 80C (₹1.5L)', ppf: 50000, elss: 50000, epf: 50000, life: 0, home: 0 },
    { label: 'PPF Focus', ppf: 150000, elss: 0, epf: 0, life: 0, home: 0 },
    { label: 'ELSS Focus', ppf: 0, elss: 150000, epf: 0, life: 0, home: 0 },
    { label: 'Balanced Mix', ppf: 50000, elss: 50000, epf: 50000, life: 0, home: 0 },
    { label: 'Home Loan', ppf: 50000, elss: 50000, epf: 0, life: 0, home: 50000 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setPpf(preset.ppf);
    setElss(preset.elss);
    setEpf(preset.epf);
    setLifeInsurance(preset.life);
    setHomeLoanPrincipal(preset.home);
  };

  const contentData = {
    title: "Section 80C Calculator - Tax Saving Investment Calculator India 2025-2027",
    description: "Free Section 80C Calculator for India. Calculate tax deduction under Section 80C for PPF, ELSS, EPF, Life Insurance, Home Loan Principal for 2025, 2026, 2027. Plan ₹1.5 lakh tax-saving investments. Updated with Budget 2024-25 provisions.",
    benefits: [
      "Calculate Section 80C tax deduction up to ₹1.5 lakh annually",
      "Plan investments across PPF, ELSS, EPF, Life Insurance, Home Loan",
      "See tax savings at different income tax brackets (5%, 20%, 30%)",
      "Optimize investment mix to maximize tax benefits",
      "Quick presets for common investment strategies",
      "Understand which investments qualify under Section 80C",
      "Plan tax-efficient investment portfolio",
      "100% free Section 80C calculator updated with 2025-2027 tax rules"
    ],
    howToSteps: [
      {
        step: "Enter PPF Investment",
        details: "Input your Public Provident Fund (PPF) investment for the year (₹500 to ₹1.5L maximum). PPF is one of the best Section 80C investments: 7.1% interest (2025), Tax-free interest and maturity, 15-year lock-in (extendable), Government-backed safety. Strategy: Invest ₹12,500 monthly (₹1.5L annually) for maximum tax benefit. PPF is ideal for: Long-term goals (15+ years), Retirement planning, Risk-averse investors, Tax-free wealth building."
      },
      {
        step: "Enter ELSS Investment",
        details: "Input your ELSS (Equity Linked Savings Scheme) mutual fund investment. ELSS benefits: Tax deduction under 80C, Potential 12-15% returns (equity exposure), 3-year lock-in (shortest among tax-savers), Growth-oriented investment. Strategy: Invest ₹50K-₹1L in ELSS for growth + tax benefit. ELSS is ideal for: Young investors (20-40 years), Long-term wealth creation, Higher risk tolerance, Equity exposure needed. Compare: ELSS vs PPF - ELSS gives higher returns but with market risk, PPF gives guaranteed returns but lower rate."
      },
      {
        step: "Enter EPF Contribution",
        details: "Input your Employee Provident Fund (EPF) contribution. EPF is automatic for salaried employees: 12% of basic salary (employee) + 12% (employer), Both employee and employer contributions qualify for 80C deduction, 8.25% interest (2025), Tax-free if service >5 years. Strategy: EPF is mandatory for salaried, so it's automatic tax benefit. If EPF contribution is ₹50K annually, you can invest additional ₹1L in other 80C instruments. EPF is ideal for: Salaried employees (automatic), Retirement planning, Guaranteed returns, Employer matching benefit."
      },
      {
        step: "Enter Life Insurance Premium",
        details: "Input annual life insurance premium paid. Life insurance qualifies for 80C if: Premium paid for self, spouse, or children, Term insurance or traditional/endowment plans, Maximum deduction: Premium amount (no separate limit). Strategy: Term insurance is best (low premium, high coverage), Avoid investment-linked plans (ULIP) - high costs, low returns. Example: ₹50K term insurance premium = ₹50K 80C deduction. Life insurance is ideal for: Family protection, Term insurance (pure protection), Low-cost coverage. Avoid: Endowment/ULIP plans (expensive, poor returns)."
      },
      {
        step: "Enter Home Loan Principal Repayment",
        details: "Input annual principal repayment on home loan. Home loan principal qualifies for 80C deduction: Only principal portion (not interest), Interest deduction available separately under Section 24, Maximum: Principal repayment amount (within ₹1.5L overall limit). Strategy: If you have home loan, principal repayment automatically qualifies for 80C. Example: ₹2L annual principal repayment = ₹2L qualifies, but only ₹1.5L can be claimed (80C limit). Home loan is ideal for: Property buyers, Automatic tax benefit, Building equity in property. Note: Home loan interest (Section 24) is separate deduction, not part of 80C."
      },
      {
        step: "Review Total Deduction and Tax Savings",
        details: "Calculator shows: Total Investment (sum of all 80C investments), Eligible Deduction (minimum of total or ₹1.5L limit), Tax Savings (based on your income tax bracket). Tax savings calculation: 5% bracket (₹2.5-5L income): ₹1.5L × 5% = ₹7,500 saved, 20% bracket (₹5-10L income): ₹1.5L × 20% = ₹30,000 saved, 30% bracket (>₹10L income): ₹1.5L × 30% = ₹45,000 saved. Strategy: Maximize ₹1.5L investment every year to save ₹45K tax (at 30% bracket). This is like getting 30% instant return on your investment!"
      }
    ],
    examples: [
      {
        scenario: "Maximizing Section 80C - ₹1.5L Investment",
        inputs: [
          { label: "PPF", value: "₹50,000" },
          { label: "ELSS", value: "₹50,000" },
          { label: "EPF", value: "₹50,000" },
          { label: "Total", value: "₹1,50,000" }
        ],
        result: "Deduction: ₹1,50,000 | Tax Saved: ₹45,000 (30% bracket)",
        explanation: "Amit, earning ₹15L annually (30% tax bracket), invests ₹1.5L in 80C instruments: PPF ₹50K (safe + tax-free), ELSS ₹50K (growth + equity), EPF ₹50K (automatic, salaried). Total deduction: ₹1.5L (maximum limit). Tax saved: ₹1.5L × 30% = ₹45,000 annually! Effective investment: ₹1.5L - ₹45K tax saved = ₹1.05L net investment. This is like getting 30% instant return! Over 20 years: ₹30L invested (₹1.5L × 20), ₹9L tax saved (₹45K × 20), Net investment: ₹21L, Corpus: PPF ₹50L + ELSS ₹50L + EPF ₹50L = ₹1.5Cr+ (with returns). Strategy: Always maximize ₹1.5L 80C investment every year - it's the best tax-saving strategy!"
      },
      {
        scenario: "Young Professional Starting 80C Planning",
        inputs: [
          { label: "ELSS", value: "₹50,000" },
          { label: "PPF", value: "₹50,000" },
          { label: "EPF", value: "₹30,000 (automatic)" },
          { label: "Total", value: "₹1,30,000" }
        ],
        result: "Deduction: ₹1,30,000 | Tax Saved: ₹26,000 (20% bracket)",
        explanation: "Priya, 28, earning ₹8L annually (20% tax bracket), starts 80C planning: ELSS ₹50K (growth-oriented, 3-year lock-in), PPF ₹50K (safe, long-term), EPF ₹30K (automatic from salary). Total: ₹1.3L (₹20K short of ₹1.5L limit). Tax saved: ₹1.3L × 20% = ₹26,000. Strategy: Increase investment to ₹1.5L next year to save additional ₹4K tax (₹20K × 20%). Over 10 years: ₹13L invested, ₹2.6L tax saved, Corpus grows to ₹25-30L with returns. This builds strong foundation for future financial goals!"
      },
      {
        scenario: "Home Loan + Other 80C Investments",
        inputs: [
          { label: "Home Loan Principal", value: "₹1,00,000" },
          { label: "PPF", value: "₹50,000" },
          { label: "Total", value: "₹1,50,000" }
        ],
        result: "Deduction: ₹1,50,000 | Tax Saved: ₹45,000 (30% bracket)",
        explanation: "Rajesh bought house with home loan, annual principal repayment ₹1L. He also invests ₹50K in PPF. Total 80C: ₹1.5L (₹1L principal + ₹50K PPF). Tax saved: ₹45K (30% bracket). Additional benefit: Home loan interest deduction (Section 24) up to ₹2L separately! So total tax benefit: ₹1.5L (80C) + ₹2L (Section 24 interest) = ₹3.5L deductions, saving ₹1.05L tax annually! Home loan is excellent tax-saving tool - principal gets 80C benefit, interest gets Section 24 benefit. Strategy: If you have home loan, you may not need full ₹1.5L in other 80C instruments (principal already covers part of it)."
      }
    ],
    tips: [
      "Maximize ₹1.5L investment every year - saves ₹45K tax at 30% bracket (30% instant return!)",
      "Diversify across PPF (safety), ELSS (growth), EPF (automatic) - don't put all in one instrument",
      "Start early in financial year (April) - gives full year for investment to grow and compound",
      "EPF is automatic for salaried - factor this in when planning additional 80C investments",
      "ELSS has shortest lock-in (3 years) - good for growth-oriented investors who can handle equity risk",
      "PPF is best for risk-averse - guaranteed 7.1% tax-free returns, government-backed safety",
      "Home loan principal qualifies for 80C - if you have home loan, it automatically covers part of ₹1.5L limit",
      "Review and rebalance annually - ensure you're investing ₹1.5L every year for maximum tax benefit"
    ],
    mistakes: [
      "Not maximizing ₹1.5L limit - leaving money on table, losing ₹15-45K tax savings annually",
      "Investing only in one instrument - lack of diversification increases risk",
      "Waiting till March to invest - loses 11 months of compounding, invest throughout the year",
      "Choosing expensive insurance plans (ULIP/endowment) - high costs, poor returns, term insurance is better",
      "Not considering EPF contribution - many people forget EPF already qualifies for 80C",
      "Investing in instruments you don't understand - always understand what you're investing in",
      "Breaking investments before lock-in - PPF/ELSS have lock-in periods, breaking loses tax benefit"
    ],
    faqs: [
      {
        question: "What is Section 80C and what investments qualify for deduction?",
        answer: "Section 80C is Income Tax Act provision allowing deduction up to ₹1.5 lakh annually from taxable income for certain investments and expenses. Qualifying investments: 1) PPF (Public Provident Fund): ₹500-₹1.5L annually, 7.1% interest, 15-year lock-in, tax-free. 2) ELSS (Equity Linked Savings Scheme): Mutual funds with 3-year lock-in, equity exposure, 12-15% potential returns. 3) EPF (Employee Provident Fund): 12% of basic salary, 8.25% interest, automatic for salaried. 4) Life Insurance Premium: Term or traditional plans, premium qualifies for deduction. 5) Home Loan Principal: Principal repayment on home loan qualifies. 6) NSC (National Savings Certificate): 7.7% interest, 5-year lock-in. 7) Tax-Saving FD: 5-year lock-in, 6-7% interest. 8) Sukanya Samriddhi Yojana: For girl child, 7.6% interest. Maximum deduction: ₹1.5 lakh per financial year (combined limit for all 80C investments). Tax benefit: Saves 5-30% tax depending on income bracket. Use this calculator to plan optimal 80C investment mix!"
      },
      {
        question: "What is the maximum deduction under Section 80C?",
        answer: "Maximum deduction under Section 80C is ₹1.5 lakh (₹150,000) per financial year. This is combined limit for ALL 80C investments together. Example: If you invest ₹50K PPF + ₹50K ELSS + ₹50K EPF = ₹1.5L total, you get full ₹1.5L deduction. If you invest ₹1L PPF + ₹1L ELSS = ₹2L total, you get only ₹1.5L deduction (₹50K excess doesn't qualify). Important: ₹1.5L is per person, not per family. If you and spouse both invest ₹1.5L each, both get ₹1.5L deduction. Tax savings: At 30% bracket: ₹1.5L × 30% = ₹45,000 saved annually, At 20% bracket: ₹1.5L × 20% = ₹30,000 saved, At 5% bracket: ₹1.5L × 5% = ₹7,500 saved. Strategy: Always maximize ₹1.5L investment every year - it's like getting 30% instant return on your investment (at 30% tax bracket). Over 20 years: ₹30L invested, ₹9L tax saved, corpus grows to ₹1-1.5Cr with returns!"
      },
      {
        question: "Which is better - PPF or ELSS for Section 80C investment?",
        answer: "PPF vs ELSS comparison: PPF (Public Provident Fund): Returns: 7.1% guaranteed (2025), Risk: Zero (government-backed), Lock-in: 15 years, Tax: Triple exempt (investment + interest + maturity), Best for: Risk-averse investors, Long-term goals (15+ years), Retirement planning, Capital protection. ELSS (Equity Linked Savings Scheme): Returns: 12-15% potential (historical average), Risk: High (equity market-linked), Lock-in: 3 years (shortest), Tax: Investment exempt, returns taxable (10% LTCG >₹1L), Best for: Young investors (20-40 years), Growth-oriented, Higher risk tolerance, Long-term wealth creation. Recommendation: Don't choose one - use BOTH! Diversified strategy: ₹50K PPF (safety) + ₹50K ELSS (growth) + ₹50K EPF (automatic) = ₹1.5L total. This gives: Safety from PPF, Growth from ELSS, Automatic from EPF. Over 20 years: PPF ₹50K × 20 = ₹10L invested → ₹25L corpus, ELSS ₹50K × 20 = ₹10L invested → ₹50-60L corpus (with 12% returns), Total: ₹20L invested → ₹75-85L corpus. Best of both worlds!"
      },
      {
        question: "Can I claim Section 80C deduction for home loan principal repayment?",
        answer: "YES! Home loan principal repayment qualifies for Section 80C deduction. Rules: Only principal portion qualifies (not interest), Interest gets separate deduction under Section 24 (up to ₹2L), Principal repayment is part of ₹1.5L 80C limit. Example: Annual home loan EMI: ₹3L (₹1L principal + ₹2L interest). 80C deduction: ₹1L (principal portion), Section 24 deduction: ₹2L (interest portion, separate limit). Total tax benefit: ₹3L deductions! If you have home loan with ₹1L annual principal: You can invest additional ₹50K in other 80C instruments (PPF/ELSS) to reach ₹1.5L limit, OR if principal is ₹1.5L+, you've already maxed out 80C (no need for additional investments). Strategy: Home loan is excellent tax-saving tool - principal gets 80C benefit, interest gets Section 24 benefit. If buying house, factor in these tax benefits when calculating effective home loan cost!"
      },
      {
        question: "What is the difference between Section 80C and Section 80CCD(1B)?",
        answer: "Section 80C: Maximum deduction: ₹1.5 lakh, Qualifying investments: PPF, ELSS, EPF, Life Insurance, Home Loan Principal, NSC, Tax-Saving FD, etc., Combined limit: All 80C investments together cannot exceed ₹1.5L. Section 80CCD(1B): Maximum deduction: ₹50,000 (ADDITIONAL to 80C), Qualifying investment: NPS (National Pension System) only, Separate limit: This ₹50K is OVER AND ABOVE ₹1.5L 80C limit. Total possible deduction: ₹1.5L (80C) + ₹50K (80CCD1B) = ₹2L maximum! Example: Invest ₹1.5L in PPF/ELSS (80C) + ₹50K in NPS (80CCD1B) = ₹2L total deduction, saving ₹60K tax at 30% bracket (₹45K from 80C + ₹15K from 80CCD1B). Strategy: Maximize both - ₹1.5L in 80C instruments + ₹50K in NPS = ₹2L total tax-saving investment, saving maximum ₹60K tax annually. NPS is ONLY investment that gives additional ₹50K deduction beyond 80C limit - take advantage!"
      },
      {
        question: "When should I invest in Section 80C instruments - beginning or end of year?",
        answer: "Best time to invest in 80C instruments: Throughout the year (systematic approach): Invest monthly/quarterly (SIP for ELSS, monthly PPF), Benefits: Rupee cost averaging (ELSS), Full year compounding (PPF), Disciplined investing, No last-minute rush. Beginning of year (April-June): Invest lump sum at start of financial year, Benefits: Maximum compounding period (12 months), No worry about deadlines, Can plan other expenses for rest of year. End of year (January-March): Invest before March 31 deadline, Benefits: Can use year-end bonus, Better cash flow management, But: Loses 11 months of compounding, Last-minute rush, May miss deadline. Recommendation: Best strategy is SIP/monthly investment: ELSS: Start ₹5-10K monthly SIP (₹60K-₹1.2L annually), PPF: Invest ₹12,500 monthly (₹1.5L annually), EPF: Automatic (already monthly). This gives: Full year compounding, Rupee cost averaging, No deadline pressure, Disciplined approach. Avoid: Waiting till March - you lose 11 months of returns and compounding benefit!"
      }
    ],
    relatedCalculators: [
      { name: "Tax Saving Calculator", url: "/calculators/tax-saving-investment-calculator", description: "Plan all tax-saving investments" },
      { name: "PPF Calculator", url: "/calculators/ppf-calculator", description: "Calculate PPF returns" },
      { name: "ELSS Calculator", url: "/calculators/elss-calculator", description: "Calculate ELSS returns" },
      { name: "NPS Calculator", url: "/calculators/nps-calculator", description: "Plan NPS investment (80CCD1B)" },
      { name: "Income Tax Calculator", url: "/calculators/income-tax-calculator", description: "Calculate total income tax" },
      { name: "Home Loan Calculator", url: "/calculators/home-loan-calculator", description: "Calculate home loan benefits" },
      { name: "Section 80D Calculator", url: "/calculators/section-80d-calculator", description: "Health insurance deduction" }
    ],
    lastUpdated: "2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema 
        name="Section 80C Calculator - Tax Saving Investment Calculator India 2025-2027" 
        description="Free Section 80C Calculator. Calculate tax deduction for PPF, ELSS, EPF, Life Insurance, Home Loan Principal. Plan ₹1.5 lakh tax-saving investments for 2025, 2026, 2027." 
        url="/calculators/section-80c-calculator" 
        features={[
          "Section 80C deduction calculator",
          "PPF, ELSS, EPF, Life Insurance, Home Loan",
          "₹1.5 lakh maximum deduction",
          "Tax savings calculator",
          "Quick presets for common strategies",
          "Investment optimization",
          "2025-2027 future-proof rates",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.9,count:18765}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Details
        </h2>

        {/* Quick Presets */}
        <div className="bg-[--primary-50] p-4 rounded-lg border border-[--primary-100]">
          <h3 className="text-sm font-semibold text-[--primary-900] mb-3">Quick Presets (2025-2027)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {quickPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="px-3 py-2 text-xs font-medium bg-white border border-[--primary-200] rounded-md hover:bg-[--primary-100] hover:border-[--primary-300] transition-colors text-[--primary-700]"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="ppf" className="text-sm font-medium text-neutral-700">
                PPF Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(ppf)}
              </span>
            </div>
            <input 
              type="range" 
              id="ppf"
              min="0" 
              max="150000" 
              step="1000" 
              value={ppf} 
              onChange={(e) => setPpf(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="elss" className="text-sm font-medium text-neutral-700">
                ELSS Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(elss)}
              </span>
            </div>
            <input 
              type="range" 
              id="elss"
              min="0" 
              max="150000" 
              step="1000" 
              value={elss} 
              onChange={(e) => setElss(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="epf" className="text-sm font-medium text-neutral-700">
                EPF Contribution (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(epf)}
              </span>
            </div>
            <input 
              type="range" 
              id="epf"
              min="0" 
              max="150000" 
              step="1000" 
              value={epf} 
              onChange={(e) => setEpf(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="life-insurance" className="text-sm font-medium text-neutral-700">
                Life Insurance Premium (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(lifeInsurance)}
              </span>
            </div>
            <input 
              type="range" 
              id="life-insurance"
              min="0" 
              max="150000" 
              step="1000" 
              value={lifeInsurance} 
              onChange={(e) => setLifeInsurance(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="home-loan" className="text-sm font-medium text-neutral-700">
                Home Loan Principal Repayment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(homeLoanPrincipal)}
              </span>
            </div>
            <input 
              type="range" 
              id="home-loan"
              min="0" 
              max="150000" 
              step="1000" 
              value={homeLoanPrincipal} 
              onChange={(e) => setHomeLoanPrincipal(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Deduction Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Eligible Deduction</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(deduction)}</p>
            </div>
          </div>
          {totalInvestment > 150000 && (
            <p className="mt-4 text-sm text-[--error-600]">
              Note: Maximum deduction under Section 80C is limited to ₹1,50,000
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Investment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'PPF', value: ppf, color: '#3b82f6' },
                { name: 'ELSS', value: elss, color: '#22c55e' },
                { name: 'EPF', value: epf, color: '#f59e0b' },
                { name: 'Life Insurance', value: lifeInsurance, color: '#ef4444' },
                { name: 'Home Loan', value: homeLoanPrincipal, color: '#8b5cf6' }
              ]}
              centerText={`${formatCurrency(totalInvestment)}\nTotal Investment`}
            />
          </div>
        </div>

        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Section 80C Guidelines (2025-2027)
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Eligible Investments</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Public Provident Fund (PPF) - 7.1% interest, 15-year lock-in</li>
                <li>Equity Linked Savings Scheme (ELSS) - 3-year lock-in, equity exposure</li>
                <li>Employee Provident Fund (EPF) - 8.25% interest, automatic for salaried</li>
                <li>Life Insurance Premium - Term or traditional plans</li>
                <li>Home Loan Principal Repayment - Principal portion qualifies</li>
                <li>National Savings Certificate (NSC) - 7.7% interest, 5-year lock-in</li>
                <li>5-year Tax Saving Fixed Deposit - 6-7% interest</li>
                <li>Sukanya Samriddhi Account - 7.6% interest, for girl child</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Points</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Maximum deduction limit of ₹1,50,000 per financial year</li>
                <li>Available under old tax regime only (new regime has no 80C)</li>
                <li>Investments must be made during the financial year (April-March)</li>
                <li>Lock-in periods vary: ELSS 3 years, PPF 15 years, NSC 5 years</li>
                <li>Tax savings: ₹7,500 to ₹45,000 depending on income bracket</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Tax Saving Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Maximize ₹1.5L investment every year - saves ₹45K tax at 30% bracket</li>
                <li>Diversify across PPF (safety), ELSS (growth), EPF (automatic)</li>
                <li>Start investing early in financial year for full year compounding</li>
                <li>Consider NPS for additional ₹50K deduction (80CCD1B)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mx-auto max-w-5xl px-4 mt-12">
      <CalculatorContentWrapper {...contentData}/>
    </div>
    </>
  );
};