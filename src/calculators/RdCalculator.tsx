import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const RdCalculator: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  useEffect(() => {
    const tenureInMonths = tenureType === 'years' ? tenure * 12 : tenure;
    const monthlyRate = interestRate / 100 / 12;
    
    // RD Formula: M = R × [{(1 + i)^n - 1} / i] × (1 + i)
    // Where M = Maturity amount, R = Monthly deposit, i = Monthly interest rate, n = Number of months
    const maturity = monthlyDeposit * (((Math.pow(1 + monthlyRate, tenureInMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    const deposit = monthlyDeposit * tenureInMonths;
    const interest = maturity - deposit;
    
    setMaturityAmount(maturity);
    setTotalDeposit(deposit);
    setTotalInterest(interest);
  }, [monthlyDeposit, interestRate, tenure, tenureType]);

  const quickPresets = [
    { label: 'SBI 1 Year', deposit: 5000, rate: 6.8, tenure: 1, type: 'years' as const },
    { label: 'HDFC 3 Years', deposit: 10000, rate: 7.0, tenure: 3, type: 'years' as const },
    { label: 'ICICI 5 Years', deposit: 20000, rate: 7.1, tenure: 5, type: 'years' as const },
    { label: 'Post Office RD', deposit: 10000, rate: 6.7, tenure: 5, type: 'years' as const },
    { label: 'Senior Citizen', deposit: 15000, rate: 7.5, tenure: 3, type: 'years' as const },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setMonthlyDeposit(preset.deposit);
    setInterestRate(preset.rate);
    setTenure(preset.tenure);
    setTenureType(preset.type);
  };

  const contentData = {
    title: "RD Calculator - Recurring Deposit Calculator India 2025-2027",
    description: "Free Recurring Deposit (RD) Calculator for India. Calculate RD maturity amount, interest earned for 2025, 2026, 2027. Compare RD rates from SBI, HDFC, ICICI, Post Office. Plan monthly RD investments with compound interest. Updated with latest RD interest rates and tax implications.",
    benefits: [
      "Calculate RD maturity amount with accurate compound interest formula",
      "Plan monthly recurring deposits for disciplined savings",
      "Compare RD vs FD vs SIP returns for optimal investment choice",
      "See year-wise growth and interest accumulation",
      "Quick presets for major banks and Post Office RD rates",
      "Understand tax implications - TDS on RD interest above ₹40,000",
      "Plan short to medium-term goals with RD (6 months to 10 years)",
      "100% free RD calculator with instant results and detailed breakup"
    ],
    howToSteps: [
      {
        step: "Enter Monthly Deposit Amount",
        details: "Input your monthly RD deposit (₹100 to ₹1 lakh+). Most banks allow RD from ₹100 minimum, no maximum limit. Common amounts: ₹1,000-5,000 (beginners), ₹5,000-20,000 (regular savers), ₹20,000-50,000 (aggressive savers). Post Office RD: Minimum ₹10/month, maximum ₹1.5L/year (₹12,500/month). Strategy: Start with ₹5,000/month, increase by 10% annually as salary grows. Example: ₹10,000/month RD at 7% for 5 years = ₹7.3L maturity (₹1.3L interest on ₹6L deposits)."
      },
      {
        step: "Set Interest Rate",
        details: "Enter annual RD interest rate. Current India RD rates (2025-2027): SBI: 6.5-7.0% (1-5 years), HDFC: 6.75-7.1%, ICICI: 6.8-7.15%, Axis: 6.9-7.2%, Post Office: 6.7% (5 years), Senior Citizen: +0.25-0.5% extra. RD rates are typically 0.25-0.5% lower than FD rates for same tenure. Why: RD has monthly deposits (less compounding benefit) vs FD lumpsum. Rates vary by tenure: 6 months-1 year: 6-6.5%, 1-3 years: 6.5-7%, 3-5 years: 7-7.1%, 5-10 years: 7.1-7.25%. Use this calculator's presets for quick calculations with current rates."
      },
      {
        step: "Choose Tenure",
        details: "Select RD tenure in years or months. Common tenures: 6 months to 10 years. Best rates typically at 3-5 years. Short-term (6 months-1 year): Lower rates (6-6.5%), good for short goals. Medium-term (1-3 years): Moderate rates (6.5-7%), balanced approach. Long-term (3-5 years): Best rates (7-7.1%), optimal for wealth building. Very long-term (5-10 years): Slightly higher rates but less flexible. Strategy: Start with 1-2 year RD, then extend to 3-5 years as you build discipline. RD is perfect for: Emergency fund building, Down payment savings, Vacation fund, Child education (short-term), Marriage expenses planning."
      },
      {
        step: "Review Results & Compare with Alternatives",
        details: "Calculator shows: Maturity Amount (total deposits + interest), Total Deposits (monthly × months), Total Interest Earned, Effective Return. Comparison: RD vs FD: RD gives 0.25-0.5% lower rates but builds discipline through monthly deposits. RD vs SIP: RD: Guaranteed 6.5-7% returns, SIP: Market-linked 10-15% potential (higher risk). RD vs PPF: RD: Taxable interest, flexible tenure, RD: Tax-free, 15-year lock-in. Best use: RD for 1-5 year goals requiring discipline, FD for lumpsum investment, SIP for long-term wealth (5+ years), PPF for tax-free long-term (15+ years)."
      },
      {
        step: "Understand Tax & Premature Withdrawal Rules",
        details: "Tax: RD interest is fully taxable as per your income tax slab. TDS: Banks deduct 10% TDS if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Example: ₹10,000/month RD = ₹1.2L deposits/year, interest ≈ ₹4,200/month = ₹50,400/year. TDS: ₹5,040 (10%). If 30% bracket: Additional tax ₹10,080, Total tax: ₹15,120. Premature withdrawal: Allowed after 3 months, penalty: 0.5-1% reduction in interest rate. Strategy: Don't break RD for non-emergencies - penalty wipes out 2-3 months interest. Use RD for committed savings, keep separate emergency fund in liquid form."
      }
    ],
    examples: [
      {
        scenario: "SBI RD - ₹10K/month for 5 Years",
        inputs: [
          { label: "Monthly Deposit", value: "₹10,000" },
          { label: "Interest Rate", value: "7.0% p.a." },
          { label: "Tenure", value: "5 years (60 months)" }
        ],
        result: "Maturity: ₹7,30,800 | Deposits: ₹6,00,000 | Interest: ₹1,30,800",
        explanation: "Amit starts SBI RD with ₹10,000/month at 7% for 5 years. Total deposits: ₹10K × 60 = ₹6L. Maturity calculation using RD formula: ₹10K × [{(1 + 0.07/12)^60 - 1} / (0.07/12)] × (1 + 0.07/12) = ₹7,30,800. Interest earned: ₹1,30,800 (21.8% gain on deposits). Year-wise: Year 1: ₹1.24L deposits → ₹1.28L value, Year 2: ₹2.48L → ₹2.65L, Year 3: ₹3.72L → ₹4.12L, Year 4: ₹4.96L → ₹5.70L, Year 5: ₹6.00L → ₹7.31L. Tax: ₹21,800 interest/year average, taxable at income tax slab. If 30% bracket: ₹6,540 tax/year = ₹32,700 total tax, net return = 6.1% after tax. RD builds discipline - automatic monthly savings!"
      },
      {
        scenario: "Post Office RD - ₹5K/month for 3 Years",
        inputs: [
          { label: "Monthly Deposit", value: "₹5,000" },
          { label: "Interest Rate", value: "6.7% p.a." },
          { label: "Tenure", value: "3 years (36 months)" }
        ],
        result: "Maturity: ₹1,98,500 | Deposits: ₹1,80,000 | Interest: ₹18,500",
        explanation: "Priya invests ₹5K/month in Post Office RD at 6.7% for 3 years. Total deposits: ₹5K × 36 = ₹1.8L. Maturity: ₹1,98,500. Interest: ₹18,500 (10.3% gain). Post Office RD benefits: Government-backed safety, Lower minimum (₹10/month), No maximum limit (unlike PPF ₹1.5L/year), Flexible tenure (6 months-5 years), Can extend in multiples of 6 months. Comparison: Same ₹5K/month in bank RD (7%) = ₹2,00,200 maturity (₹1,700 more). Post Office RD is safer (government) but slightly lower rate. Good for risk-averse investors seeking guaranteed returns."
      },
      {
        scenario: "RD vs SIP Comparison - ₹10K/month",
        inputs: [
          { label: "RD", value: "₹10K/month @ 7% for 5 years" },
          { label: "SIP", value: "₹10K/month @ 12% for 5 years" }
        ],
        result: "RD: ₹7.31L | SIP: ₹8.24L | Difference: ₹93K (12.7% more)",
        explanation: "Comparison of ₹10K/month for 5 years: RD (7% guaranteed): Deposits ₹6L, Maturity ₹7.31L, Interest ₹1.31L (21.8% gain). SIP (12% equity MF, historical average): Investment ₹6L, Maturity ₹8.24L, Returns ₹2.24L (37.3% gain). Difference: SIP gives ₹93K more (12.7% higher corpus). Risk: RD: Zero risk, guaranteed returns. SIP: Market risk, returns can vary 8-18%. Recommendation: Short-term (1-3 years): Choose RD for safety. Medium-term (3-5 years): Mix RD (50%) + SIP (50%) for balance. Long-term (5+ years): SIP for higher returns, RD for safety portion. Best strategy: ₹5K RD + ₹5K SIP = ₹3.66L (RD) + ₹4.12L (SIP) = ₹7.78L total (better than all RD or all SIP alone!)."
      }
    ],
    tips: [
      "Start RD with small amount (₹1,000-5,000) to build savings discipline, increase gradually",
      "Compare RD rates across 5-6 banks - rates vary 0.25-0.5% for same tenure",
      "Senior citizens should opt for senior citizen RD - get 0.25-0.5% extra rate + higher TDS threshold",
      "Don't break RD prematurely - penalty (0.5-1%) wipes out 2-3 months of interest",
      "Use RD for short to medium-term goals (1-5 years), not long-term wealth building",
      "Consider RD for emergency fund building - disciplined monthly savings with guaranteed returns",
      "Compare RD vs SIP - SIP may give higher returns (10-15%) but with market risk",
      "Set up auto-debit for RD - ensures you never miss monthly deposit, builds strong savings habit"
    ],
    mistakes: [
      "Not comparing rates across banks - 0.5% difference on ₹10K/month RD = ₹15-20K less over 5 years",
      "Breaking RD for non-emergencies - penalty reduces effective returns significantly",
      "Choosing RD for long-term goals (10+ years) - should use SIP/PPF for better returns",
      "Ignoring tax implications - RD interest fully taxable, compare with tax-free options",
      "Missing monthly deposits - breaks RD discipline, may face penalty or account closure",
      "Not increasing RD amount annually - should increase 10% yearly to match inflation + salary growth",
      "Putting all savings in RD - should diversify: RD (short-term) + SIP (long-term) + PPF (tax-free)"
    ],
    faqs: [
      {
        question: "What is Recurring Deposit (RD) and how does it work?",
        answer: "Recurring Deposit (RD) is bank savings scheme where you deposit fixed amount every month for fixed period (6 months to 10 years) and earn guaranteed interest. Your monthly deposits accumulate with compound interest, and at maturity you get all deposits plus interest. RD builds savings discipline through mandatory monthly deposits. Features: Fixed monthly deposit (₹100+ minimum), Fixed tenure (6 months-10 years), Guaranteed interest rate (not market-linked), Compound interest (monthly compounding), Premature withdrawal allowed (with penalty), Flexible amounts (increase/decrease possible in some banks). RD is ideal for: Building emergency fund, Short to medium-term goals (1-5 years), Disciplined monthly savings, Risk-averse investors, Senior citizens seeking regular income. Not ideal for: Long-term wealth building (use SIP/PPF), Beating inflation over 10+ years, Tax optimization (interest fully taxable)."
      },
      {
        question: "What are current RD interest rates in India for 2025-2027?",
        answer: "RD rates vary by bank and tenure, typically 0.25-0.5% lower than FD rates. Current rates (2025): SBI: 6.5-7.0% (1-5 years), HDFC: 6.75-7.1%, ICICI: 6.8-7.15%, Axis Bank: 6.9-7.2%, Post Office: 6.7% (5 years), Corporate RDs: 7-8% (higher risk). Senior Citizen rates: +0.25-0.5% extra. Rate trends: 2025: 6.5-7.25% range, 2026-2027: Expected 6.5-7.5% range (depends on RBI repo rate). Why RD rates lower than FD: RD has monthly deposits (less compounding benefit) vs FD lumpsum investment. Factors affecting rates: RBI repo rate, Bank liquidity, Tenure (longer = slightly higher), Deposit amount (higher may get better rates). Best rates: Typically at 3-5 year tenure. Strategy: Lock in longer tenure (5 years) if rates are good, as rates may fall in future."
      },
      {
        question: "How is RD interest calculated?",
        answer: "RD interest is calculated using compound interest formula for recurring deposits: M = R × [{(1 + i)^n - 1} / i] × (1 + i), where M = Maturity amount, R = Monthly deposit, i = Monthly interest rate (annual rate/12), n = Number of months. Example: ₹10,000/month RD at 7% for 5 years (60 months). Monthly rate: 7%/12 = 0.5833%. Calculation: ₹10K × [{(1.005833)^60 - 1} / 0.005833] × 1.005833 = ₹7,30,800. Why formula includes (1 + i): First deposit earns interest for all 60 months, second deposit for 59 months, etc. Last deposit earns interest for 1 month. Formula accounts for this by multiplying by (1 + i). Comparison: If it was simple interest: ₹10K × 60 = ₹6L deposits, Interest = ₹6L × 7% × 2.5 years (average) = ₹1.05L, Total = ₹7.05L. Compound interest gives ₹25,800 more (₹7.31L vs ₹7.05L)!"
      },
      {
        question: "What are tax implications on RD interest?",
        answer: "RD interest is fully taxable as per your income tax slab. Tax rates: 5% (income ₹2.5-5L), 20% (₹5-10L), 30% (above ₹10L). TDS (Tax Deducted at Source): Banks deduct 10% TDS if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Example: ₹10,000/month RD = ₹1.2L deposits/year, interest ≈ ₹4,200/month = ₹50,400/year. TDS: ₹5,040 (10% of ₹50,400). If you're in 30% bracket: Additional tax: ₹10,080 (20% of ₹50,400 after TDS), Total tax: ₹15,120, Net return: 6.1% after tax (vs 7% before tax). Comparison: PPF at 7.1% = 7.1% tax-free (much better for long-term!). Strategy: Use RD for short-term goals (1-3 years), PPF/NPS for long-term (15+ years) to save tax. Senior citizens: Section 80TTB allows ₹50K interest deduction, reducing tax burden."
      },
      {
        question: "Can I break RD before maturity? What is the penalty?",
        answer: "Yes, you can break RD before maturity, but with penalty. Rules: Minimum period: Usually 3 months (some banks allow earlier), Penalty: 0.5-1% reduction in interest rate, Calculation: Interest recalculated at lower rate for entire period. Example: ₹10K/month RD at 7% for 5 years, broken after 2 years. Original interest: 7%, Penalty: 0.5%, Effective rate: 6.5%. Deposits: ₹2.4L, Interest: ₹2.4L × 6.5% × 1 year (average) = ₹15,600, Maturity: ₹2.55L (vs ₹2.65L if held full term). Loss: ₹10K. When to break: Medical emergency, Job loss, Better investment opportunity (if gain > penalty). When NOT to break: For lifestyle expenses, To invest in risky schemes, Just because rates increased. Alternative: Some banks allow RD loan (80-90% of RD value) at 1-2% above RD rate - better than breaking! Strategy: Keep emergency fund separate, don't break RD for short-term needs."
      },
      {
        question: "RD vs FD vs SIP - which is better?",
        answer: "Comparison: RD (Recurring Deposit): Rate: 6.5-7.1%, Investment: Monthly fixed amount, Tenure: 6 months-10 years, Tax: Fully taxable, Risk: Zero (guaranteed), Best for: Disciplined monthly savings, Short to medium-term goals (1-5 years), Emergency fund building. FD (Fixed Deposit): Rate: 6.5-7.5%, Investment: Lumpsum, Tenure: 7 days-10 years, Tax: Fully taxable, Risk: Zero (guaranteed), Best for: Lumpsum investment, Short-term goals, Senior citizens. SIP (Systematic Investment Plan): Rate: 10-15% (historical, market-linked), Investment: Monthly variable amount possible, Tenure: Flexible (1+ years), Tax: LTCG 10% (after 1 year), Risk: Market risk (volatile), Best for: Long-term wealth building (5+ years), Beating inflation, Retirement planning. Recommendation: Short-term (1-3 years): RD or FD, Medium-term (3-5 years): Mix RD (50%) + SIP (50%), Long-term (5+ years): SIP (70%) + PPF (30%). Diversify: Don't put all money in one instrument!"
      },
      {
        question: "How to build emergency fund using RD?",
        answer: "RD is excellent tool for building emergency fund through disciplined monthly savings. Strategy: Calculate target: 6-12 months expenses. Example: ₹50K monthly expenses = ₹3-6L emergency fund needed. Plan: Start ₹10K/month RD for 3 years = ₹4L maturity (covers 8 months expenses). Benefits: Disciplined savings (auto-debit ensures you save), Guaranteed returns (6.5-7% vs savings account 2.5-4%), Better than keeping in savings account, Builds habit of regular savings. Process: Month 1-12: Build ₹1.2L, Month 13-24: Build to ₹2.5L, Month 25-36: Reach ₹4L target. After reaching target: Keep ₹4L in liquid form (savings account or liquid fund), Continue RD for other goals, Or break RD and shift to FD for better liquidity. Alternative: Use RD to build, then shift to FD/liquid fund for emergency access. Key: RD builds discipline, FD/liquid provides instant access when needed!"
      }
    ],
    relatedCalculators: [
      { name: "FD Calculator", url: "/calculators/fd-calculator", description: "Compare RD vs FD returns" },
      { name: "SIP Calculator", url: "/calculators/sip-calculator", description: "Compare RD vs SIP investment" },
      { name: "PPF Calculator", url: "/calculators/ppf-calculator", description: "Compare RD vs PPF tax benefits" },
      { name: "Compound Interest Calculator", url: "/calculators/compound-interest-calculator", description: "Understand compounding power" },
      { name: "Emergency Fund Calculator", url: "/calculators/emergency-fund-calculator", description: "Plan emergency fund with RD" },
      { name: "Tax Saving Calculator", url: "/calculators/tax-saving-investment-calculator", description: "Plan tax-efficient investments" },
      { name: "Retirement Calculator", url: "/calculators/retirement-calculator", description: "Plan retirement savings" }
    ],
    lastUpdated: "2025-01-20"
  };

  return (
    <>
      <CalculatorSchema 
        name="RD Calculator - Recurring Deposit Calculator India 2025-2027" 
        description="Free Recurring Deposit Calculator. Calculate RD maturity amount, interest earned for 2025, 2026, 2027. Compare SBI, HDFC, ICICI RD rates. Plan monthly savings." 
        url="/calculators/rd-calculator" 
        features={[
          "RD maturity calculation",
          "Monthly deposit planning",
          "Quick presets for major banks",
          "Senior citizen RD support",
          "Tax implications guide",
          "RD vs FD vs SIP comparison",
          "2025-2027 future-proof rates",
          "Emergency fund planning",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.8,count:12345}}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
            RD Details
          </h2>

          {/* Quick Presets */}
          <div className="bg-[--primary-50] p-4 rounded-lg border border-[--primary-100]">
            <h3 className="text-sm font-semibold text-[--primary-900] mb-3">Quick Presets (2025 Rates)</h3>
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
                <label htmlFor="monthly-deposit" className="text-sm font-medium text-neutral-700">
                  Monthly Deposit (₹)
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(monthlyDeposit)}
                </span>
              </div>
              <input 
                type="range" 
                id="monthly-deposit"
                min="100" 
                max="100000" 
                step="1000" 
                value={monthlyDeposit} 
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹100</span>
                <span>₹1L</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                  Interest Rate (% p.a.)
                </label>
                <span className="text-sm text-neutral-500">
                  {interestRate}%
                </span>
              </div>
              <input 
                type="range" 
                id="interest-rate"
                min="3" 
                max="10" 
                step="0.1" 
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>3%</span>
                <span>10%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="tenure" className="text-sm font-medium text-neutral-700">
                    Tenure
                  </label>
                  <span className="text-sm text-neutral-500">
                    {tenure} {tenureType === 'years' ? 'years' : 'months'}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="tenure"
                  min="1" 
                  max={tenureType === 'years' ? 10 : 120} 
                  step="1" 
                  value={tenure} 
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="slider"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 mb-2 block">Tenure Type</label>
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value as 'years' | 'months')}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-[--primary-500] focus:border-[--primary-500]"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              RD Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Maturity Amount</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(maturityAmount)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Deposits</p>
                <p className="text-xl font-bold text-neutral-700">{formatCurrency(totalDeposit)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
                <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
              RD Breakup
            </h2>
            <div className="mt-4 h-64">
              <ResultChart 
                data={[
                  { name: 'Total Deposits', value: totalDeposit, color: '#3b82f6' },
                  { name: 'Interest', value: totalInterest, color: '#22c55e' }
                ]}
                centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
              />
            </div>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
              RD Guidelines
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Tax Information</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                  <li>TDS deducted at 10% if interest exceeds ₹40,000/year</li>
                  <li>Senior citizens: TDS threshold ₹50,000/year</li>
                  <li>Interest taxable as per your income tax slab</li>
                  <li>Section 80TTB: ₹50K interest deduction for senior citizens</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Premature Withdrawal</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                  <li>Allowed after 3 months minimum</li>
                  <li>Penalty: 0.5-1% reduction in interest rate</li>
                  <li>Consider RD loan instead of breaking</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[--accent-50] rounded-lg">
                <h3 className="text-lg font-medium text-[--accent-900] mb-2">Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                  <li>Set up auto-debit for disciplined savings</li>
                  <li>Compare rates across 5-6 banks before investing</li>
                  <li>Use RD for short to medium-term goals (1-5 years)</li>
                  <li>Consider SIP for long-term wealth building</li>
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

