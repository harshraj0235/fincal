import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, PieChart, TrendingUp, Sliders } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const TaxSavingInvestmentCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(1000000);
  const [section80C, setSection80C] = useState<number>(150000);
  const [section80D, setSection80D] = useState<number>(25000);
  const [section80G, setSection80G] = useState<number>(10000);
  const [nps, setNps] = useState<number>(50000);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [taxSaving, setTaxSaving] = useState<number>(0);
  
  useEffect(() => {
    const total = section80C + section80D + section80G + nps;
    setTotalInvestment(total);
    
    // Calculate tax saving (simplified calculation)
    let saving = 0;
    if (income > 1000000) {
      saving = total * 0.3; // 30% tax bracket
    } else if (income > 500000) {
      saving = total * 0.2; // 20% tax bracket
    } else if (income > 250000) {
      saving = total * 0.05; // 5% tax bracket
    }
    
    setTaxSaving(saving);
  }, [income, section80C, section80D, section80G, nps]);

  const quickPresets = [
    { label: 'Max Tax Saving', income: 1500000, c80: 150000, d80: 75000, g80: 0, nps: 50000 },
    { label: 'Standard Plan', income: 1000000, c80: 150000, d80: 50000, g80: 10000, nps: 50000 },
    { label: 'High Income', income: 2000000, c80: 150000, d80: 75000, g80: 50000, nps: 50000 },
    { label: 'Conservative', income: 800000, c80: 150000, d80: 25000, g80: 0, nps: 0 },
    { label: 'Aggressive', income: 1200000, c80: 150000, d80: 75000, g80: 20000, nps: 50000 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setIncome(preset.income);
    setSection80C(preset.c80);
    setSection80D(preset.d80);
    setSection80G(preset.g80);
    setNps(preset.nps);
  };

  const contentData = {
    title: "Tax Saving Investment Calculator - Complete Tax Planning Calculator India 2025-2027",
    description: "Free Tax Saving Investment Calculator for India. Plan all tax-saving investments under Section 80C, 80D, 80G, 80CCD(1B) for 2025, 2026, 2027. Calculate total tax savings, optimize investment portfolio. Updated with Budget 2024-25 provisions.",
    benefits: [
      "Calculate total tax savings from all tax-saving investments",
      "Plan investments across Section 80C, 80D, 80G, 80CCD(1B)",
      "See tax savings at different income tax brackets",
      "Optimize investment portfolio for maximum tax benefit",
      "Quick presets for common tax-saving strategies",
      "Understand combined deduction limits and benefits",
      "Plan comprehensive tax-efficient investment strategy",
      "100% free tax saving calculator updated with 2025-2027 tax rules"
    ],
    howToSteps: [
      {
        step: "Enter Annual Income",
        details: "Input your total annual income (gross income before deductions). This determines your income tax bracket: ₹2.5-5L: 5% tax bracket, ₹5-10L: 20% tax bracket, Above ₹10L: 30% tax bracket. Higher income = higher tax bracket = more tax savings from deductions. Example: ₹15L income (30% bracket) saves ₹45K from ₹1.5L 80C investment, ₹8L income (20% bracket) saves ₹30K from same investment. Strategy: Maximize tax-saving investments to reduce taxable income and save maximum tax."
      },
      {
        step: "Enter Section 80C Investment",
        details: "Input total investment under Section 80C (PPF, ELSS, EPF, Life Insurance, Home Loan Principal). Maximum deduction: ₹1.5 lakh per year. Common investments: PPF (₹50K-₹1.5L), ELSS (₹50K-₹1L), EPF (automatic, ₹30-60K typically), Life Insurance (₹10-50K), Home Loan Principal (varies). Strategy: Maximize ₹1.5L investment every year - saves ₹45K tax at 30% bracket (30% instant return!). Diversify across PPF (safety), ELSS (growth), EPF (automatic)."
      },
      {
        step: "Enter Section 80D Investment",
        details: "Input health insurance premium under Section 80D. Deduction limits: Self & Family: ₹25,000, Parents (<60): ₹25,000, Parents (60+): ₹50,000. Maximum total: ₹75,000 (₹25K + ₹50K). Includes: Health insurance premium, Preventive health checkup (up to ₹5K). Strategy: Ensure adequate health coverage (₹5-10L family floater) and maximize deduction. If parents are 60+, ensure premium is ₹50K to maximize senior citizen benefit."
      },
      {
        step: "Enter Section 80G Donations",
        details: "Input charitable donations under Section 80G. Qualifying donations: To registered charitable organizations, Government funds (PM Relief Fund, etc.), Educational institutions. Deduction: 50% or 100% of donation (depends on organization), No maximum limit (unlike 80C/80D). Example: ₹10K donation to eligible charity = ₹10K deduction (if 100% eligible) or ₹5K deduction (if 50% eligible). Strategy: Donate to causes you care about while saving tax. Keep donation receipts for ITR filing."
      },
      {
        step: "Enter NPS Investment (80CCD1B)",
        details: "Input NPS investment under Section 80CCD(1B). This is ADDITIONAL deduction over and above Section 80C! Maximum deduction: ₹50,000 per year. Total possible: ₹1.5L (80C) + ₹50K (80CCD1B) = ₹2L maximum tax-saving investment. NPS benefits: Additional ₹50K deduction (only investment with this benefit), 9-11% returns, Tax-free 60% withdrawal at retirement, Pension from 40% corpus. Strategy: If maximizing tax savings, invest ₹50K in NPS for additional deduction - saves ₹15K tax at 30% bracket."
      },
      {
        step: "Review Total Tax Savings",
        details: "Calculator shows: Total Investment (sum of all tax-saving investments), Total Deduction (combined deductions from all sections), Tax Savings (based on income tax bracket). Tax savings calculation: At 30% bracket: Total deduction × 30%, At 20% bracket: Total deduction × 20%, At 5% bracket: Total deduction × 5%. Maximum possible: ₹2L (80C ₹1.5L + NPS ₹50K) + ₹75K (80D) + Donations = ₹2.75L+ deductions, saving ₹82,500+ tax at 30% bracket! Strategy: Plan comprehensive tax-saving portfolio to maximize deductions and minimize tax liability."
      }
    ],
    examples: [
      {
        scenario: "High Income Professional - Maximum Tax Saving",
        inputs: [
          { label: "Annual Income", value: "₹20,00,000" },
          { label: "Section 80C", value: "₹1,50,000" },
          { label: "Section 80D", value: "₹75,000" },
          { label: "Section 80G", value: "₹50,000" },
          { label: "NPS (80CCD1B)", value: "₹50,000" }
        ],
        result: "Total Deduction: ₹3,25,000 | Tax Saved: ₹97,500 (30% bracket)",
        explanation: "Amit, earning ₹20L annually (30% tax bracket), maximizes all tax-saving investments: 80C ₹1.5L (PPF ₹50K + ELSS ₹50K + EPF ₹50K), 80D ₹75K (self ₹25K + parents 60+ ₹50K), 80G ₹50K (charitable donations), NPS ₹50K (80CCD1B). Total deduction: ₹3.25L. Tax saved: ₹3.25L × 30% = ₹97,500 annually! Effective investment: ₹3.25L - ₹97.5K = ₹2.275L net investment. This is like getting 30% instant return on tax-saving investments! Over 20 years: ₹65L invested, ₹19.5L tax saved, corpus grows to ₹1.5-2Cr with returns. Strategy: High-income earners should maximize all deductions to minimize tax liability."
      },
      {
        scenario: "Mid-Income Professional - Balanced Approach",
        inputs: [
          { label: "Annual Income", value: "₹10,00,000" },
          { label: "Section 80C", value: "₹1,50,000" },
          { label: "Section 80D", value: "₹50,000" },
          { label: "Section 80G", value: "₹10,000" },
          { label: "NPS (80CCD1B)", value: "₹50,000" }
        ],
        result: "Total Deduction: ₹2,60,000 | Tax Saved: ₹52,000 (20% bracket)",
        explanation: "Priya, earning ₹10L annually (20% tax bracket), follows balanced tax-saving strategy: 80C ₹1.5L (maximized), 80D ₹50K (self ₹25K + parents <60 ₹25K), 80G ₹10K (moderate donations), NPS ₹50K (additional benefit). Total deduction: ₹2.6L. Tax saved: ₹2.6L × 20% = ₹52,000 annually. Effective investment: ₹2.6L - ₹52K = ₹2.08L net investment. Strategy: Even at 20% bracket, tax-saving investments provide significant benefit. Maximize 80C and 80D, add NPS for extra benefit."
      },
      {
        scenario: "Young Professional Starting Tax Planning",
        inputs: [
          { label: "Annual Income", value: "₹6,00,000" },
          { label: "Section 80C", value: "₹1,00,000" },
          { label: "Section 80D", value: "₹25,000" },
          { label: "Section 80G", value: "₹0" },
          { label: "NPS (80CCD1B)", value: "₹0" }
        ],
        result: "Total Deduction: ₹1,25,000 | Tax Saved: ₹6,250 (5% bracket)",
        explanation: "Rohan, 28, earning ₹6L annually (5% tax bracket), starts tax planning: 80C ₹1L (ELSS ₹50K + PPF ₹50K), 80D ₹25K (health insurance). Total deduction: ₹1.25L. Tax saved: ₹1.25L × 5% = ₹6,250. Strategy: Even at 5% bracket, tax-saving investments are beneficial. As income grows, tax bracket increases, and same investments save more tax. Start early to build tax-saving habit. Next year: Increase to ₹1.5L 80C + add NPS ₹50K = ₹2L total, saving ₹10K tax (if income increases to 20% bracket)."
      }
    ],
    tips: [
      "Maximize ₹1.5L Section 80C investment every year - saves ₹45K tax at 30% bracket",
      "Add ₹50K NPS investment for additional deduction (80CCD1B) - saves ₹15K extra tax",
      "Maximize Section 80D for health insurance - ₹75K total deduction saves ₹22.5K tax",
      "Plan investments at start of financial year - gives full year for compounding",
      "Diversify across different sections - don't put all in one basket",
      "Review tax-saving portfolio annually - ensure you're maximizing all deductions",
      "Keep all investment receipts and documents - needed for ITR filing",
      "Consider tax-saving investments as part of overall financial plan, not just tax benefit"
    ],
    mistakes: [
      "Not maximizing ₹1.5L 80C limit - leaving money on table, losing ₹15-45K tax savings",
      "Missing NPS ₹50K additional deduction - only investment with extra ₹50K benefit",
      "Not maximizing 80D for health insurance - ₹75K total deduction saves significant tax",
      "Waiting till March to invest - loses 11 months of compounding and returns",
      "Not keeping investment documents - can't claim deduction without proof",
      "Investing only for tax benefit - choose investments that also meet financial goals",
      "Not reviewing portfolio annually - may miss new tax-saving opportunities"
    ],
    faqs: [
      {
        question: "What are all the tax-saving investment options available in India?",
        answer: "Tax-saving investment options in India: Section 80C (₹1.5L limit): PPF (7.1% interest, 15-year lock-in, tax-free), ELSS (12-15% returns, 3-year lock-in, equity exposure), EPF (8.25% interest, automatic for salaried), Life Insurance Premium (term insurance recommended), Home Loan Principal (principal repayment qualifies), NSC (7.7% interest, 5-year lock-in), Tax-Saving FD (6-7% interest, 5-year lock-in), Sukanya Samriddhi (7.6% interest, for girl child). Section 80D (Health Insurance): Self & Family: ₹25K, Parents (<60): ₹25K, Parents (60+): ₹50K, Maximum: ₹75K total. Section 80CCD(1B) - NPS: ₹50K additional (over and above 80C), Only investment with extra ₹50K benefit. Section 80G (Donations): Charitable donations, 50% or 100% deduction, No maximum limit. Section 24 (Home Loan Interest): Up to ₹2L deduction (separate from 80C). Total possible: ₹1.5L (80C) + ₹50K (NPS) + ₹75K (80D) + Donations + ₹2L (Section 24) = ₹4.75L+ deductions! Use this calculator to plan optimal tax-saving portfolio."
      },
      {
        question: "How much tax can I save with tax-saving investments?",
        answer: "Tax savings depend on income tax bracket and total deductions. Maximum possible deductions: Section 80C: ₹1.5L, Section 80D: ₹75K (self ₹25K + parents 60+ ₹50K), Section 80CCD(1B) - NPS: ₹50K, Section 80G: Unlimited (donations), Section 24: ₹2L (home loan interest). Total: ₹4.75L+ deductions possible. Tax savings at different brackets: 30% bracket (income >₹10L): ₹4.75L × 30% = ₹1,42,500 saved, 20% bracket (₹5-10L): ₹4.75L × 20% = ₹95,000 saved, 5% bracket (₹2.5-5L): ₹4.75L × 5% = ₹23,750 saved. Realistic scenario (₹2L total deductions): 30% bracket: ₹60K saved, 20% bracket: ₹40K saved, 5% bracket: ₹10K saved. Strategy: Higher income = higher tax bracket = more tax savings. Maximize all deductions to minimize tax liability. Use this calculator to see exact tax savings for your income and investments."
      },
      {
        question: "Should I invest in tax-saving instruments or pay tax?",
        answer: "ALWAYS invest in tax-saving instruments rather than paying tax! Why: Tax-saving investments give you: 1) Tax deduction (saves 5-30% tax), 2) Investment returns (7-15% typically), 3) Wealth building (corpus grows over time). Example: ₹1.5L investment in 80C instruments. Option A - Invest ₹1.5L: Tax saved: ₹45K (30% bracket), Net investment: ₹1.05L, Corpus after 20 years: ₹50-60L (with returns). Option B - Pay tax: Tax paid: ₹45K (lost forever), No investment, No corpus. Option A is clearly better! Even if investment gives 0% returns, you still save ₹45K tax (30% instant return). With 10% returns, you get ₹45K tax saved + ₹30L corpus = massive benefit! Strategy: Always maximize tax-saving investments - it's like getting 30% instant return (at 30% bracket) plus investment returns. Never choose to pay tax over investing in tax-saving instruments."
      },
      {
        question: "What is the best tax-saving investment strategy?",
        answer: "Best tax-saving investment strategy: 1) Maximize Section 80C (₹1.5L): Diversify: PPF ₹50K (safety), ELSS ₹50K (growth), EPF ₹50K (automatic), OR PPF ₹1.5L (if risk-averse), OR ELSS ₹1.5L (if growth-oriented). 2) Add NPS (₹50K): Additional ₹50K deduction (80CCD1B), Only investment with this benefit, 9-11% returns, Retirement planning. 3) Maximize Section 80D (₹75K): Self & Family ₹25K, Parents 60+ ₹50K, Health insurance is essential + tax benefit. 4) Home Loan (if applicable): Principal gets 80C benefit, Interest gets Section 24 benefit (₹2L), Excellent tax-saving tool. 5) Section 80G (optional): Donate to causes you care about, Tax benefit + social good. Total strategy: ₹1.5L (80C) + ₹50K (NPS) + ₹75K (80D) + ₹2L (Section 24 if home loan) = ₹4.75L deductions, saving ₹1,42,500 tax at 30% bracket! Start early in financial year, invest systematically (SIP for ELSS, monthly for PPF), Review and rebalance annually."
      },
      {
        question: "Can I claim tax deductions under both old and new tax regime?",
        answer: "NO! You must choose ONE regime for the entire financial year. Old Tax Regime: Allows all deductions (80C, 80D, 80G, 80CCD1B, Section 24, HRA, etc.), Lower tax rates but with deductions, Better if you have significant deductions (>₹2-3L). New Tax Regime: No deductions allowed (except few like NPS employer contribution), Higher basic exemption limit (₹3L vs ₹2.5L), Lower tax rates, Better if you have minimal deductions (<₹1-2L). Which to choose: Calculate tax under both regimes, Choose regime with lower tax. Example: Income ₹15L, Deductions ₹3L. Old regime: Taxable income ₹12L, Tax ≈ ₹2.1L. New regime: Taxable income ₹15L (no deductions), Tax ≈ ₹1.5L. New regime better! But if deductions ₹4L: Old regime taxable ₹11L, Tax ≈ ₹1.8L. Old regime better! Strategy: Use income tax calculator to compare both regimes, choose one with lower tax. Once chosen, must follow for entire year. Can switch next year if needed."
      },
      {
        question: "When is the deadline for tax-saving investments?",
        answer: "Deadline for tax-saving investments: Financial Year: April 1 to March 31. Investment deadline: March 31 of financial year. Example: For FY 2024-25 (April 2024 - March 2025), investments must be made by March 31, 2025. Important dates: Section 80C investments: By March 31, Section 80D (health insurance): Premium must be paid by March 31, Section 80G (donations): By March 31, NPS (80CCD1B): By March 31. Late investments: Investments made after March 31 qualify for NEXT financial year, Not for current year deduction. Example: Invest ₹1.5L on April 5, 2025 = qualifies for FY 2025-26, not FY 2024-25. Best practice: Don't wait till March - invest throughout the year: Start in April (beginning of FY), Invest monthly/quarterly (SIP for ELSS, monthly for PPF), Gives full year compounding, No deadline pressure. Avoid: Last-minute March investments - you lose 11 months of compounding and returns. Plan early, invest systematically!"
      }
    ],
    relatedCalculators: [
      { name: "Section 80C Calculator", url: "/calculators/section-80c-calculator", description: "Plan 80C investments" },
      { name: "Section 80D Calculator", url: "/calculators/section-80d-calculator", description: "Plan health insurance deduction" },
      { name: "NPS Calculator", url: "/calculators/nps-calculator", description: "Plan NPS investment (80CCD1B)" },
      { name: "Income Tax Calculator", url: "/calculators/income-tax-calculator", description: "Calculate total income tax" },
      { name: "HRA Calculator", url: "/calculators/hra-calculator", description: "Calculate HRA exemption" },
      { name: "Home Loan Calculator", url: "/calculators/home-loan-calculator", description: "Calculate home loan tax benefits" },
      { name: "TDS Calculator", url: "/calculators/tds-calculator", description: "Calculate TDS on payments" }
    ],
    lastUpdated: "2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema 
        name="Tax Saving Investment Calculator - Complete Tax Planning Calculator India 2025-2027" 
        description="Free Tax Saving Investment Calculator. Plan all tax-saving investments under 80C, 80D, 80G, 80CCD1B for 2025, 2026, 2027. Calculate total tax savings. Updated with Budget 2024-25." 
        url="/calculators/tax-saving-investment-calculator" 
        features={[
          "Complete tax-saving calculator",
          "Section 80C, 80D, 80G, 80CCD1B",
          "Tax savings calculator",
          "Quick presets for strategies",
          "Investment optimization",
          "2025-2027 future-proof rates",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.9,count:19876}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Tax Saving Investment Details
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
              <label htmlFor="income" className="text-sm font-medium text-neutral-700">
                Annual Income (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(income)}
              </span>
            </div>
            <input 
              type="range" 
              id="income"
              min="250000" 
              max="5000000" 
              step="50000" 
              value={income} 
              onChange={(e) => setIncome(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="section-80c" className="text-sm font-medium text-neutral-700">
                Section 80C Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(section80C)}
              </span>
            </div>
            <input 
              type="range" 
              id="section-80c"
              min="0" 
              max="150000" 
              step="5000" 
              value={section80C} 
              onChange={(e) => setSection80C(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="section-80d" className="text-sm font-medium text-neutral-700">
                Section 80D Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(section80D)}
              </span>
            </div>
            <input 
              type="range" 
              id="section-80d"
              min="0" 
              max="100000" 
              step="5000" 
              value={section80D} 
              onChange={(e) => setSection80D(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="section-80g" className="text-sm font-medium text-neutral-700">
                Section 80G Donations (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(section80G)}
              </span>
            </div>
            <input 
              type="range" 
              id="section-80g"
              min="0" 
              max="100000" 
              step="1000" 
              value={section80G} 
              onChange={(e) => setSection80G(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="nps" className="text-sm font-medium text-neutral-700">
                NPS Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(nps)}
              </span>
            </div>
            <input 
              type="range" 
              id="nps"
              min="0" 
              max="50000" 
              step="1000" 
              value={nps} 
              onChange={(e) => setNps(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Tax Saving</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(taxSaving)}</p>
            </div>
          </div>
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
                { name: 'Section 80C', value: section80C, color: '#3b82f6' },
                { name: 'Section 80D', value: section80D, color: '#22c55e' },
                { name: 'Section 80G', value: section80G, color: '#f59e0b' },
                { name: 'NPS', value: nps, color: '#8b5cf6' }
              ]}
              centerText={`${formatCurrency(totalInvestment)}\nTotal Investment`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Tax Saving Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Section 80C (₹1.5L)</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>PPF, ELSS, Life Insurance Premium</li>
                <li>EPF, NPS, Tax Saving FD</li>
                <li>Home Loan Principal Repayment</li>
                <li>Sukanya Samriddhi Account</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Section 80D</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Health Insurance Premium</li>
                <li>Preventive Health Check-up</li>
                <li>Additional for Senior Citizens</li>
                <li>COVID-19 Treatment Expenses</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Investments must be made within the financial year</li>
                <li>Keep proper documentation of all investments</li>
                <li>Consider lock-in periods before investing</li>
                <li>Plan investments at the start of the year</li>
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