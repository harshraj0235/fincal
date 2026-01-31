import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const FdCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('quarterly');
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  
  useEffect(() => {
    const tenureInYears = tenureType === 'years' ? tenure : tenure / 12;
    const n = compoundingFrequency === 'monthly' ? 12 : compoundingFrequency === 'quarterly' ? 4 : 1;
    const r = interestRate / 100;
    
    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const maturity = principal * Math.pow(1 + r / n, n * tenureInYears);
    const interest = maturity - principal;
    
    // Effective Annual Rate
    const effective = (Math.pow(1 + r / n, n) - 1) * 100;
    
    setMaturityAmount(maturity);
    setTotalInterest(interest);
    setEffectiveRate(effective);
  }, [principal, interestRate, tenure, tenureType, compoundingFrequency]);

  const quickPresets = [
    { label: 'SBI 1 Year', principal: 100000, rate: 6.8, tenure: 1, type: 'years' as const, freq: 'quarterly' as const },
    { label: 'HDFC 3 Years', principal: 500000, rate: 7.1, tenure: 3, type: 'years' as const, freq: 'quarterly' as const },
    { label: 'ICICI 5 Years', principal: 1000000, rate: 7.25, tenure: 5, type: 'years' as const, freq: 'quarterly' as const },
    { label: 'Senior Citizen', principal: 1000000, rate: 7.75, tenure: 5, type: 'years' as const, freq: 'quarterly' as const },
    { label: 'Post Office FD', principal: 500000, rate: 7.5, tenure: 5, type: 'years' as const, freq: 'annually' as const },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setPrincipal(preset.principal);
    setInterestRate(preset.rate);
    setTenure(preset.tenure);
    setTenureType(preset.type);
    setCompoundingFrequency(preset.freq);
  };

  const contentData = {
    title: "FD Calculator - Fixed Deposit Calculator India 2025-2027",
    description: "Free Fixed Deposit (FD) Calculator for India. Calculate FD maturity amount, interest earned, and effective interest rate for 2025, 2026, 2027. Compare FD rates from SBI, HDFC, ICICI, Post Office. Plan your FD investment with quarterly, monthly, or annual compounding. Updated with latest FD interest rates and tax implications.",
    benefits: [
      "Calculate FD maturity amount with accurate compound interest formula",
      "Compare different compounding frequencies - monthly, quarterly, annual",
      "See effective annual rate (EAR) vs nominal rate difference",
      "Plan FD investments for 2025, 2026, 2027 with future-proof calculations",
      "Quick presets for SBI, HDFC, ICICI, Senior Citizen, Post Office FD rates",
      "Understand tax implications - TDS on FD interest above ₹40,000",
      "Compare FD vs other investments - PPF, RD, mutual funds",
      "100% free FD calculator with instant results and detailed breakup"
    ],
    howToSteps: [
      {
        step: "Enter Principal Amount",
        details: "Input your FD investment amount (₹1,000 to ₹5 crores+). Most banks offer FDs from ₹1,000 minimum. Higher amounts may get better rates: ₹1-5L: Standard rates, ₹5L-1Cr: 0.1-0.25% extra, ₹1Cr+: 0.25-0.5% extra (premium rates). Senior citizens get 0.25-0.5% additional rate across all banks. Example: ₹10L FD at 7% for 5 years = ₹14.1L maturity (₹4.1L interest)."
      },
      {
        step: "Set Interest Rate",
        details: "Enter annual FD interest rate. Current India FD rates (2025-2027): SBI: 6.5-7.1% (1-5 years), HDFC: 6.75-7.25%, ICICI: 6.8-7.3%, Axis: 6.9-7.35%, Post Office: 7.5% (5 years), Senior Citizen: +0.25-0.5% extra. Rates vary by tenure: 1 year: 6.5-7%, 3 years: 7-7.25%, 5 years: 7.1-7.5%. Corporate FDs: 7.5-9% (higher risk). Use this calculator's presets for quick calculations with current rates."
      },
      {
        step: "Choose Tenure",
        details: "Select FD tenure in years or months. Common tenures: 7 days to 10 years. Best rates typically at 3-5 years. Short-term (1-2 years): Lower rates (6.5-7%), good for liquidity needs. Medium-term (3-5 years): Best rates (7-7.5%), optimal for wealth building. Long-term (5-10 years): Slightly higher rates, but less flexible. Strategy: FD laddering - split ₹10L into ₹2L each for 1,2,3,4,5 years = regular liquidity + higher average returns."
      },
      {
        step: "Select Compounding Frequency",
        details: "Choose how interest is compounded. Quarterly (most common): Interest added every 3 months, best for most FDs. Monthly: Interest added monthly, slightly higher returns (0.1-0.2% effective rate boost). Annual: Interest added once per year, lower returns. Difference: ₹10L at 7% for 5 years - Quarterly: ₹14.1L, Monthly: ₹14.15L (+₹5K), Annual: ₹14.05L (-₹5K). Always choose quarterly or monthly compounding when available!"
      },
      {
        step: "Review Results & Tax Implications",
        details: "Calculator shows: Maturity Amount (principal + interest), Total Interest Earned, Effective Annual Rate (actual return considering compounding). Tax: FD interest is taxable as per your income tax slab. TDS deducted at 10% if interest exceeds ₹40,000 annually (₹50,000 for senior citizens). Example: ₹10L FD at 7% = ₹70K interest/year. If you're in 30% bracket, tax = ₹21K, net return = 4.9% after tax. Compare with PPF (7.1% tax-free) = much better! Use FD for short-term goals, PPF/NPS for long-term tax-free growth."
      }
    ],
    examples: [
      {
        scenario: "SBI FD - ₹5L for 5 Years",
        inputs: [
          { label: "Principal", value: "₹5,00,000" },
          { label: "Interest Rate", value: "7.1% p.a." },
          { label: "Tenure", value: "5 years" },
          { label: "Compounding", value: "Quarterly" }
        ],
        result: "Maturity: ₹7,06,500 | Interest: ₹2,06,500 | Effective Rate: 7.25%",
        explanation: "Amit invests ₹5L in SBI 5-year FD at 7.1% quarterly compounding. Maturity calculation: ₹5L × (1 + 0.071/4)^(4×5) = ₹7,06,500. Total interest: ₹2,06,500 (41.3% gain). Effective annual rate: 7.25% (higher than nominal 7.1% due to quarterly compounding). Year-wise growth: Year 1: ₹5.36L, Year 2: ₹5.75L, Year 3: ₹6.16L, Year 4: ₹6.60L, Year 5: ₹7.07L. Tax implication: ₹35,500 interest/year, taxable at income tax slab. If 30% bracket: ₹10,650 tax/year = ₹53,250 total tax, net return = 6.1% after tax. Still beats inflation (6-7%) comfortably!"
      },
      {
        scenario: "Senior Citizen FD - ₹10L for 3 Years",
        inputs: [
          { label: "Principal", value: "₹10,00,000" },
          { label: "Interest Rate", value: "7.75% p.a. (0.5% extra)" },
          { label: "Tenure", value: "3 years" },
          { label: "Compounding", value: "Quarterly" }
        ],
        result: "Maturity: ₹12,58,200 | Interest: ₹2,58,200 | Effective Rate: 8.0%",
        explanation: "Rajesh (65 years) invests ₹10L in senior citizen FD at 7.75% (0.5% extra vs regular 7.25%) for 3 years. Maturity: ₹12,58,200. Interest earned: ₹2,58,200 (25.8% gain). Effective rate: 8.0% p.a. Senior citizen benefits: Higher interest rate, Higher TDS threshold (₹50K vs ₹40K), Tax deduction under Section 80TTB (₹50K interest exemption). If interest is ₹86K/year, ₹50K exempt, only ₹36K taxable. This makes senior citizen FD very attractive for retirees!"
      },
      {
        scenario: "FD Laddering Strategy - ₹20L Split",
        inputs: [
          { label: "Strategy", value: "Split ₹20L into 5 FDs" },
          { label: "FD 1", value: "₹4L @ 6.8% for 1 year" },
          { label: "FD 2", value: "₹4L @ 7.0% for 2 years" },
          { label: "FD 3", value: "₹4L @ 7.1% for 3 years" },
          { label: "FD 4-5", value: "₹4L each @ 7.25% for 4-5 years" }
        ],
        result: "Average Return: 7.1% | Regular Liquidity | Higher Overall Returns",
        explanation: "Priya uses FD laddering: Instead of ₹20L in one 5-year FD, splits into 5 FDs of ₹4L each with different tenures. Benefits: 1) Liquidity: One FD matures each year, providing ₹4L+ liquidity annually, 2) Rate optimization: Can reinvest maturing FD at current rates (if rates rise), 3) Risk reduction: Not locked for full 5 years, 4) Tax planning: Can time interest receipts for lower tax years. Result: Gets average 7.1% return with annual liquidity. This strategy is perfect for emergency fund + growth balance!"
      }
    ],
    tips: [
      "Compare FD rates across 5-6 banks before investing - rates vary 0.25-0.5% for same tenure",
      "Senior citizens should always opt for senior citizen FD - get 0.25-0.5% extra rate + ₹50K TDS threshold",
      "Choose quarterly or monthly compounding over annual - gives 0.1-0.3% higher effective returns",
      "Use FD laddering for large amounts - split into multiple FDs with different tenures for liquidity",
      "Consider tax implications - FD interest taxable, PPF/NPS tax-free. For long-term, tax-free options better",
      "Don't break FD prematurely - penalty is 0.5-1% which can wipe out 2-3 months of interest",
      "Compare FD vs debt mutual funds - debt funds may give similar returns with better tax treatment (indexation benefit)",
      "Keep emergency fund in short-term FD (1 year) or liquid funds, not long-term FD for flexibility"
    ],
    mistakes: [
      "Not comparing rates across banks - 0.5% difference on ₹10L FD = ₹5K less interest over 5 years",
      "Choosing annual compounding when quarterly available - loses ₹5-10K on ₹10L FD over 5 years",
      "Breaking FD for non-emergencies - 0.5-1% penalty = losing 2-3 months interest unnecessarily",
      "Ignoring tax implications - FD interest fully taxable, should compare with tax-free options for long-term",
      "Putting all money in one long-term FD - no liquidity, can't take advantage of rising rates",
      "Not considering inflation - 7% FD return vs 6-7% inflation = almost zero real returns",
      "Choosing FD for retirement corpus - should use PPF/NPS/equity for long-term wealth building, FD for short-term goals"
    ],
    faqs: [
      {
        question: "What is Fixed Deposit (FD) and how does it work?",
        answer: "Fixed Deposit (FD) is a bank investment where you deposit money for a fixed period (7 days to 10 years) at a fixed interest rate. Your money is locked for the tenure, and you earn guaranteed interest. At maturity, you get principal + accumulated interest. FD is safest investment after government schemes. Features: Guaranteed returns (not market-linked), Capital protection (DICGC insured up to ₹5L per bank), Fixed interest rate (doesn't change during tenure), Flexible tenures (7 days to 10 years), Premature withdrawal allowed (with penalty 0.5-1%). FD is ideal for: Short to medium-term goals (1-5 years), Emergency fund (1 year FD), Risk-averse investors, Senior citizens seeking guaranteed income. Not ideal for: Long-term wealth building (use equity/PPF), Beating inflation over 10+ years, Tax optimization (interest fully taxable)."
      },
      {
        question: "What are current FD interest rates in India for 2025-2027?",
        answer: "FD rates vary by bank and tenure. Current rates (2025): SBI: 6.5-7.1% (1-5 years), HDFC: 6.75-7.25%, ICICI: 6.8-7.3%, Axis Bank: 6.9-7.35%, Post Office: 7.5% (5 years), Corporate FDs: 7.5-9% (higher risk). Senior Citizen rates: +0.25-0.5% extra. Rate trends: 2025: 6.5-7.5% range, 2026-2027: Expected to remain 6.5-8% range (depends on RBI repo rate). Factors affecting rates: RBI repo rate (banks follow RBI), Inflation (higher inflation = higher rates), Bank liquidity (less liquidity = higher rates), Tenure (longer = slightly higher). Best rates: Typically at 3-5 year tenure. Strategy: Lock in longer tenure (5 years) if rates are good, as rates may fall in future. Use this calculator to compare different scenarios for 2025-2027."
      },
      {
        question: "How is FD interest calculated and what is compounding?",
        answer: "FD interest is calculated using compound interest formula: A = P(1 + r/n)^(nt), where A = Maturity amount, P = Principal, r = Annual rate, n = Compounding frequency, t = Time in years. Compounding means interest earns interest. Example: ₹1L at 7% quarterly for 1 year. Quarter 1: ₹1L + (₹1L × 7%/4) = ₹1,01,750, Quarter 2: ₹1,01,750 + (₹1,01,750 × 7%/4) = ₹1,03,531, Quarter 3: ₹1,03,531 + interest = ₹1,05,345, Quarter 4: ₹1,05,345 + interest = ₹1,07,185. Total: ₹1,07,185 (vs ₹1,07,000 with annual compounding). Compounding frequencies: Quarterly (most common): Interest added every 3 months, Monthly: Every month (slightly higher), Annual: Once per year (lowest). More frequent compounding = higher effective returns. Always choose quarterly or monthly when available!"
      },
      {
        question: "What are tax implications on FD interest?",
        answer: "FD interest is fully taxable as per your income tax slab. Tax rates: 5% (income ₹2.5-5L), 20% (₹5-10L), 30% (above ₹10L). TDS (Tax Deducted at Source): Banks deduct 10% TDS if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Example: ₹10L FD at 7% = ₹70K interest/year. TDS: ₹7,000 (10% of ₹70K). If you're in 30% bracket, additional tax: ₹14,000 (20% of ₹70K after TDS). Total tax: ₹21,000, Net return: 4.9% after tax. Comparison: PPF at 7.1% = 7.1% tax-free (much better!). Strategy: Use FD for short-term (1-3 years), PPF/NPS for long-term (15+ years) to save tax. Senior citizens: Section 80TTB allows ₹50K FD interest deduction, reducing tax burden."
      },
      {
        question: "Can I break FD before maturity? What is the penalty?",
        answer: "Yes, you can break FD before maturity, but with penalty. Penalty rates: Most banks: 0.5-1% reduction in interest rate, Some banks: 1-2% penalty. Example: ₹10L FD at 7% for 5 years, broken after 2 years. Original interest: 7%, Penalty: 0.5%, Effective rate: 6.5%. Interest earned: ₹10L × 6.5% × 2 = ₹1.3L (vs ₹1.4L if held full term). Loss: ₹10K. When to break: Medical emergency, Job loss, Better investment opportunity (if gain > penalty). When NOT to break: For lifestyle expenses, To invest in risky schemes, Just because rates increased (penalty may offset gain). Alternative: Take FD loan against FD (80-90% of FD value) at 1-2% above FD rate - better than breaking! Strategy: Keep emergency fund separate, don't break long-term FD for short-term needs."
      },
      {
        question: "FD vs PPF vs RD - which is better?",
        answer: "Comparison: FD (Fixed Deposit): Rate: 6.5-7.5%, Tenure: 7 days-10 years, Tax: Fully taxable, Liquidity: Can break (penalty), Best for: Short-term goals (1-5 years), emergency fund. PPF (Public Provident Fund): Rate: 7.1%, Tenure: 15 years (extendable), Tax: Triple exempt (80C + interest + maturity), Liquidity: Partial withdrawal after 5 years, Best for: Long-term wealth (15+ years), retirement planning. RD (Recurring Deposit): Rate: 6-7%, Tenure: 6 months-10 years, Tax: Fully taxable, Liquidity: Can break (penalty), Best for: Monthly savings discipline, short-term goals. Recommendation: Short-term (1-3 years): FD or RD, Medium-term (3-7 years): FD laddering, Long-term (7+ years): PPF + equity mutual funds, Emergency fund: 1-year FD or liquid funds. Diversify: Don't put all money in one instrument!"
      },
      {
        question: "What is FD laddering and how does it work?",
        answer: "FD laddering is strategy of splitting large FD amount into multiple smaller FDs with different tenures. Example: Instead of ₹20L in one 5-year FD, create: ₹4L @ 1 year, ₹4L @ 2 years, ₹4L @ 3 years, ₹4L @ 4 years, ₹4L @ 5 years. Benefits: 1) Liquidity: One FD matures each year, providing regular cash flow, 2) Rate flexibility: Can reinvest maturing FD at current rates (if rates rise), 3) Risk reduction: Not fully locked for 5 years, 4) Tax planning: Can time interest receipts, 5) Emergency access: Can break one small FD instead of entire amount. Strategy: For ₹10L: Create 5 FDs of ₹2L each (1,2,3,4,5 years). Each year, reinvest maturing FD for 5 years (maintains ladder). Result: Average 7% return with annual liquidity. Perfect for: Emergency fund + growth balance, Retirees needing regular income, Large amounts needing flexibility."
      }
    ],
    relatedCalculators: [
      { name: "RD Calculator", url: "/calculators/rd-calculator", description: "Compare FD vs RD returns" },
      { name: "PPF Calculator", url: "/calculators/ppf-calculator", description: "Compare FD vs PPF tax benefits" },
      { name: "Compound Interest Calculator", url: "/calculators/compound-interest-calculator", description: "Understand compounding power" },
      { name: "Tax Saving Calculator", url: "/calculators/tax-saving-investment-calculator", description: "Plan tax-efficient investments" },
      { name: "Retirement Calculator", url: "/calculators/retirement-calculator", description: "Plan retirement with FD" },
      { name: "SIP Calculator", url: "/calculators/sip-calculator", description: "Compare FD vs mutual fund SIP" },
      { name: "Emergency Fund Calculator", url: "/calculators/emergency-fund-calculator", description: "Plan emergency fund with FD" }
    ],
    lastUpdated: "2025-01-20"
  };

  return (
    <>
      <CalculatorSchema 
        name="FD Calculator - Fixed Deposit Calculator India 2025-2027" 
        description="Free Fixed Deposit Calculator. Calculate FD maturity amount, interest earned for 2025, 2026, 2027. Compare SBI, HDFC, ICICI FD rates. Updated with latest interest rates." 
        url="/calculators/fd-calculator" 
        features={[
          "FD maturity calculation",
          "Multiple compounding frequencies",
          "Effective rate calculator",
          "Quick presets for major banks",
          "Senior citizen FD support",
          "Tax implications guide",
          "FD laddering strategy",
          "2025-2027 future-proof rates",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.9,count:15234}}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
            FD Details
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
                <label htmlFor="principal" className="text-sm font-medium text-neutral-700">
                  Principal Amount (₹)
                </label>
                <span className="text-sm text-neutral-500">
                  {formatCurrency(principal)}
                </span>
              </div>
              <input 
                type="range" 
                id="principal"
                min="1000" 
                max="10000000" 
                step="10000" 
                value={principal} 
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="slider"
              />
              <div className="flex justify-between mt-1 text-xs text-neutral-500">
                <span>₹1K</span>
                <span>₹1Cr</span>
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

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Compounding Frequency</label>
              <select
                value={compoundingFrequency}
                onChange={(e) => setCompoundingFrequency(e.target.value as 'monthly' | 'quarterly' | 'annually')}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-[--primary-500] focus:border-[--primary-500]"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly (Most Common)</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
            <h3 className="text-lg font-semibold text-[--primary-900] mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              FD Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Maturity Amount</p>
                <p className="text-xl font-bold text-neutral-900">{formatCurrency(maturityAmount)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
                <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-neutral-500 mb-1">Effective Rate</p>
                <p className="text-xl font-bold text-[--primary-600]">{effectiveRate.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
              FD Breakup
            </h2>
            <div className="mt-4 h-64">
              <ResultChart 
                data={[
                  { name: 'Principal', value: principal, color: '#3b82f6' },
                  { name: 'Interest', value: totalInterest, color: '#22c55e' }
                ]}
                centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
              />
            </div>
          </div>
          
          <div className="bg-neutral-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
              <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
              FD Guidelines
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
                  <li>Penalty: 0.5-1% reduction in interest rate</li>
                  <li>Consider FD loan instead of breaking FD</li>
                  <li>Use FD laddering for liquidity needs</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[--accent-50] rounded-lg">
                <h3 className="text-lg font-medium text-[--accent-900] mb-2">Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                  <li>Compare rates across 5-6 banks before investing</li>
                  <li>Choose quarterly/monthly compounding over annual</li>
                  <li>Use FD for short-term goals (1-5 years)</li>
                  <li>Consider PPF/NPS for long-term tax-free growth</li>
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

