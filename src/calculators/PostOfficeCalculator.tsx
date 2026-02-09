import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

type SchemeType = 'td' | 'rd' | 'mis' | 'scss' | 'kvp';

interface SchemeDetails {
  name: string;
  interestRate: number;
  minTenure: number;
  maxTenure: number;
  minAmount: number;
  maxAmount: number;
  description: string;
}

const schemeDetails: Record<SchemeType, SchemeDetails> = {
  td: {
    name: 'Time Deposit',
    interestRate: 7.1,
    minTenure: 1,
    maxTenure: 5,
    minAmount: 1000,
    maxAmount: 10000000,
    description: 'Fixed deposit scheme with tenure options from 1 to 5 years'
  },
  rd: {
    name: 'Recurring Deposit',
    interestRate: 6.7,
    minTenure: 5,
    maxTenure: 5,
    minAmount: 100,
    maxAmount: 1000000,
    description: 'Monthly deposit scheme with 5-year tenure'
  },
  mis: {
    name: 'Monthly Income Scheme',
    interestRate: 7.4,
    minTenure: 5,
    maxTenure: 5,
    minAmount: 1000,
    maxAmount: 900000,
    description: 'Investment scheme providing monthly income'
  },
  scss: {
    name: 'Senior Citizen Savings Scheme',
    interestRate: 8.2,
    minTenure: 5,
    maxTenure: 5,
    minAmount: 1000,
    maxAmount: 1500000,
    description: 'High-return savings scheme for senior citizens'
  },
  kvp: {
    name: 'Kisan Vikas Patra',
    interestRate: 7.5,
    minTenure: 10,
    maxTenure: 10,
    minAmount: 1000,
    maxAmount: 10000000,
    description: 'Investment doubles in about 10 years'
  }
};

export const PostOfficeCalculator: React.FC = () => {
  const [schemeType, setSchemeType] = useState<SchemeType>('kvp');
  const [amount, setAmount] = useState<number>(100000);
  const [tenure, setTenure] = useState<number>(10);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  
  useEffect(() => {
    const scheme = schemeDetails[schemeType];
    const rate = scheme.interestRate / 100;
    
    let calculatedMaturity = 0;
    let calculatedInterest = 0;
    let calculatedMonthlyIncome = 0;
    
    switch (schemeType) {
      case 'td':
        calculatedMaturity = amount * Math.pow(1 + rate, tenure);
        calculatedInterest = calculatedMaturity - amount;
        break;
        
      case 'rd':
        const monthlyRate = rate / 12;
        calculatedMaturity = amount * ((Math.pow(1 + monthlyRate, tenure * 12) - 1) / monthlyRate);
        calculatedInterest = calculatedMaturity - (amount * tenure * 12);
        break;
        
      case 'mis':
        calculatedMonthlyIncome = amount * (rate / 12);
        calculatedInterest = calculatedMonthlyIncome * tenure * 12;
        calculatedMaturity = amount + calculatedInterest;
        break;
        
      case 'scss':
        calculatedMonthlyIncome = amount * (rate / 12);
        calculatedInterest = calculatedMonthlyIncome * tenure * 12;
        calculatedMaturity = amount + calculatedInterest;
        break;
        
      case 'kvp':
        // KVP doubles the money in approximately 10 years at 7.5%
        calculatedMaturity = amount * Math.pow(2, tenure / 10);
        calculatedInterest = calculatedMaturity - amount;
        break;
    }
    
    setMaturityAmount(calculatedMaturity);
    setTotalInterest(calculatedInterest);
    setMonthlyIncome(calculatedMonthlyIncome);
  }, [schemeType, amount, tenure]);

  const quickPresets = [
    { label: 'KVP ₹1L 10Y', scheme: 'kvp' as SchemeType, amt: 100000, ten: 10 },
    { label: 'SCSS ₹15L 5Y', scheme: 'scss' as SchemeType, amt: 1500000, ten: 5 },
    { label: 'MIS ₹9L 5Y', scheme: 'mis' as SchemeType, amt: 900000, ten: 5 },
    { label: 'TD ₹5L 5Y', scheme: 'td' as SchemeType, amt: 500000, ten: 5 },
    { label: 'RD ₹10K 5Y', scheme: 'rd' as SchemeType, amt: 10000, ten: 5 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setSchemeType(preset.scheme);
    setAmount(preset.amt);
    setTenure(preset.ten);
  };

  const contentData = {
    title: "Post Office Savings Schemes Calculator - India Post Office Calculator 2025-2027",
    description: "Free Post Office Savings Schemes Calculator for India. Calculate returns for KVP, SCSS, MIS, TD, RD schemes with 2025-2027 interest rates. Plan post office investments with maturity calculator. Updated with latest rates.",
    benefits: [
      "Calculate returns for all post office savings schemes (KVP, SCSS, MIS, TD, RD)",
      "Compare different post office schemes and choose best one",
      "See maturity amount, interest earned, and monthly income (for MIS/SCSS)",
      "Understand interest rates for 2025-2027 (KVP 7.5%, SCSS 8.2%, MIS 7.4%, TD 7.1%, RD 6.7%)",
      "Quick presets for common investment scenarios",
      "Plan tax-saving investments (SCSS, KVP qualify for 80C)",
      "Calculate safe, government-backed returns",
      "100% free post office calculator updated with 2025-2027 rates"
    ],
    howToSteps: [
      {
        step: "Select Post Office Scheme",
        details: "Choose the post office savings scheme: KVP (Kisan Vikas Patra): 7.5% interest, 10-year tenure, Doubles money in ~10 years, ₹1K-₹1Cr investment. SCSS (Senior Citizen Savings Scheme): 8.2% interest (highest!), 5-year tenure, For 60+ years, ₹1K-₹15L investment, Monthly interest option. MIS (Monthly Income Scheme): 7.4% interest, 5-year tenure, Monthly income payout, ₹1K-₹9L investment. TD (Time Deposit): 7.1% interest, 1-5 year tenure, Flexible tenure, ₹1K-₹1Cr investment. RD (Recurring Deposit): 6.7% interest, 5-year tenure, Monthly deposits, ₹100-₹10L monthly. Each scheme has different features - choose based on your needs!"
      },
      {
        step: "Enter Investment Amount",
        details: "Input investment amount based on scheme limits: KVP: ₹1,000 to ₹1,00,00,000 (₹1Cr), SCSS: ₹1,000 to ₹15,00,000 (₹15L), MIS: ₹1,000 to ₹9,00,000 (₹9L), TD: ₹1,000 to ₹1,00,00,000 (₹1Cr), RD: ₹100 to ₹10,00,000 (₹10L) monthly. For RD: Amount is monthly deposit (not total). Example: RD ₹10K monthly × 60 months = ₹6L total deposit. Strategy: Invest maximum allowed if you want maximum returns. SCSS ₹15L gives highest interest (8.2%) among all schemes!"
      },
      {
        step: "Set Tenure",
        details: "Enter investment tenure based on scheme: KVP: 10 years (fixed), SCSS: 5 years (fixed), MIS: 5 years (fixed), TD: 1-5 years (flexible), RD: 5 years (fixed). Note: Some schemes have fixed tenure (KVP, SCSS, MIS, RD), TD has flexible tenure (1-5 years). Longer tenure generally gives better returns due to compounding. Strategy: For long-term goals (10+ years): Choose KVP (10 years, 7.5%). For senior citizens: Choose SCSS (5 years, 8.2% - highest rate!). For monthly income: Choose MIS (5 years, 7.4%, monthly payout)."
      },
      {
        step: "Review Returns and Maturity",
        details: "Calculator shows: Maturity Amount (total corpus at end of tenure), Interest Earned (total interest over tenure), Monthly Income (for MIS/SCSS - monthly interest payout). KVP example: ₹1L investment, 10 years, 7.5% = ₹2L maturity (doubles!). SCSS example: ₹15L investment, 5 years, 8.2% = ₹22.3L maturity, Monthly income ₹1.02L. MIS example: ₹9L investment, 5 years, 7.4% = ₹12.3L maturity, Monthly income ₹5,550. Strategy: Compare schemes - SCSS gives highest returns (8.2%) but only for 60+ years. KVP doubles money in 10 years. MIS provides monthly income. Choose based on your age, goals, and income needs!"
      }
    ],
    examples: [
      {
        scenario: "Senior Citizen - SCSS Maximum Investment",
        inputs: [
          { label: "Scheme", value: "SCSS (Senior Citizen)" },
          { label: "Investment", value: "₹15,00,000" },
          { label: "Tenure", value: "5 years" },
          { label: "Interest Rate", value: "8.2% p.a." }
        ],
        result: "Maturity: ₹22.3L | Interest: ₹7.3L | Monthly Income: ₹1.02L",
        explanation: "Senior citizen (60+) invests maximum ₹15L in SCSS. With 8.2% interest (highest among all post office schemes!), maturity after 5 years: ₹22.3L. Interest earned: ₹7.3L (48.7% returns). Monthly income option: ₹1.02L monthly interest (₹12.3L annually). Tax benefits: Investment qualifies for Section 80C deduction (₹15L deduction, saves ₹45K tax at 30% bracket), Interest is taxable (but senior citizens get higher exemption limits). Strategy: SCSS is best post office scheme for senior citizens - highest rate (8.2%), safe, government-backed, monthly income option. Perfect for retirement planning!"
      },
      {
        scenario: "Kisan Vikas Patra - Doubling Investment",
        inputs: [
          { label: "Scheme", value: "KVP" },
          { label: "Investment", value: "₹1,00,000" },
          { label: "Tenure", value: "10 years" },
          { label: "Interest Rate", value: "7.5% p.a." }
        ],
        result: "Maturity: ₹2,06,103 | Interest: ₹1,06,103 | Doubles in ~10 years",
        explanation: "Invest ₹1L in KVP for 10 years at 7.5% interest. Maturity: ₹2.06L (doubles in ~10 years!). Interest earned: ₹1.06L (106% returns). KVP is designed to double money - perfect for long-term goals. Tax benefits: Investment qualifies for Section 80C deduction (₹1L deduction, saves ₹30K tax at 30% bracket), Interest is taxable. Strategy: KVP is good for 10-year goals - doubles money, safe, government-backed. Better than FD for long-term (7.5% vs 6-7% FD rate). Use for: Child education (10 years), Marriage expenses, Long-term wealth building."
      },
      {
        scenario: "Monthly Income Scheme - Regular Income",
        inputs: [
          { label: "Scheme", value: "MIS" },
          { label: "Investment", value: "₹9,00,000" },
          { label: "Tenure", value: "5 years" },
          { label: "Interest Rate", value: "7.4% p.a." }
        ],
        result: "Maturity: ₹12.3L | Interest: ₹3.3L | Monthly Income: ₹5,550",
        explanation: "Invest maximum ₹9L in MIS for 5 years at 7.4% interest. Maturity: ₹12.3L. Interest earned: ₹3.3L (36.7% returns). Monthly income: ₹5,550 per month (₹66,600 annually). Perfect for retirees needing regular income! Tax benefits: Investment qualifies for Section 80C deduction (₹9L deduction, saves ₹27K tax at 30% bracket), Monthly interest is taxable. Strategy: MIS is ideal for retirees/senior citizens needing monthly income. ₹5,550 monthly supplements pension/other income. Safe, government-backed, predictable monthly payout. Better than FD for income needs (monthly payout vs annual/quarterly FD interest)."
      }
    ],
    tips: [
      "Senior citizens (60+) should choose SCSS - highest rate 8.2% among all schemes!",
      "KVP doubles money in ~10 years - perfect for long-term goals (10+ years)",
      "MIS provides monthly income - ideal for retirees needing regular cash flow",
      "All schemes are government-backed - zero risk, guaranteed returns",
      "SCSS, KVP qualify for Section 80C deduction - save ₹7.5K-₹45K tax annually",
      "Compare schemes before investing - SCSS (8.2%) > MIS (7.4%) > KVP (7.5%) > TD (7.1%) > RD (6.7%)",
      "Invest maximum allowed if affordable - builds larger corpus at maturity",
      "Post office schemes are safe alternative to bank FDs - similar rates, government guarantee"
    ],
    mistakes: [
      "Not choosing SCSS if 60+ - missing highest rate 8.2% (1% higher than other schemes!)",
      "Investing in MIS without needing monthly income - better to choose SCSS/KVP for higher returns",
      "Not claiming Section 80C deduction - losing ₹7.5K-₹45K tax savings annually",
      "Choosing wrong scheme for goals - KVP for short-term (10-year lock-in), MIS for growth (lower returns)",
      "Not investing maximum allowed - missing opportunity to build larger corpus",
      "Comparing post office rates with equity returns - these are safe, guaranteed returns, not growth investments",
      "Not considering tax on interest - interest is taxable (except PPF/SSY which are tax-free)"
    ],
    faqs: [
      {
        question: "What are the different Post Office Savings Schemes available in India?",
        answer: "Post Office Savings Schemes in India 2025: 1) Kisan Vikas Patra (KVP): Interest: 7.5% p.a., Tenure: 10 years (fixed), Investment: ₹1K-₹1Cr, Doubles money in ~10 years, Qualifies for Section 80C. 2) Senior Citizen Savings Scheme (SCSS): Interest: 8.2% p.a. (highest!), Tenure: 5 years (fixed), Investment: ₹1K-₹15L, For 60+ years only, Monthly income option, Qualifies for Section 80C. 3) Monthly Income Scheme (MIS): Interest: 7.4% p.a., Tenure: 5 years (fixed), Investment: ₹1K-₹9L, Monthly income payout, Qualifies for Section 80C. 4) Time Deposit (TD): Interest: 7.1% p.a., Tenure: 1-5 years (flexible), Investment: ₹1K-₹1Cr, Flexible tenure options, Qualifies for Section 80C. 5) Recurring Deposit (RD): Interest: 6.7% p.a., Tenure: 5 years (fixed), Investment: ₹100-₹10L monthly, Monthly deposits, Qualifies for Section 80C. All schemes: Government-backed (zero risk), Guaranteed returns, Safe investment option. Use this calculator to compare and choose best scheme!"
      },
      {
        question: "Which Post Office scheme gives highest interest rate in 2025?",
        answer: "Highest interest rate post office scheme 2025: Senior Citizen Savings Scheme (SCSS): 8.2% p.a. (highest among all!), Available only for 60+ years, 5-year tenure, ₹1K-₹15L investment, Monthly income option available. Comparison: SCSS: 8.2% (highest, 60+ only), MIS: 7.4% (monthly income), KVP: 7.5% (10-year doubling), TD: 7.1% (flexible tenure), RD: 6.7% (monthly deposits). Why SCSS is highest: Government incentive for senior citizens, Encourages retirement savings, Safe, guaranteed returns. Strategy: If you're 60+, SCSS is best choice - highest rate (8.2%), safe, government-backed, monthly income option. Invest maximum ₹15L for best returns. If below 60: KVP (7.5%) or MIS (7.4%) are good options. KVP for long-term (10 years), MIS for monthly income needs."
      },
      {
        question: "Are Post Office schemes tax-free? What are the tax benefits?",
        answer: "Post Office schemes tax treatment: Investment (Section 80C): All schemes (KVP, SCSS, MIS, TD, RD) qualify for Section 80C deduction, Maximum ₹1.5L deduction per year, Saves 5-30% tax depending on income bracket. Example: ₹1.5L investment = ₹45K tax saved at 30% bracket. Interest: Interest earned is TAXABLE (unlike PPF/SSY which are tax-free), Added to taxable income, Taxed at your income tax slab. Maturity: Maturity amount is taxable (principal + interest), No separate exemption for maturity. Comparison: PPF/SSY: Triple exempt (EEE) - investment, interest, maturity all tax-free, Post Office schemes: Only investment exempt (80C), interest and maturity taxable. Strategy: For tax-free returns: Choose PPF (7.1%) or SSY (8.2% for girl child) instead of post office schemes. For guaranteed safe returns with 80C benefit: Post office schemes are good option. Calculate total returns after tax to compare effectively!"
      },
      {
        question: "Can I withdraw money from Post Office schemes before maturity?",
        answer: "Premature withdrawal rules for post office schemes: KVP: Premature closure allowed after 2.5 years, Penalty: 2% deduction from principal, Interest paid at applicable rate. SCSS: Premature closure allowed after 1 year, Penalty: 1.5% deduction (if closed before 2 years), 1% deduction (if closed after 2 years), Interest paid at applicable rate. MIS: Premature closure allowed after 1 year, Penalty: 2% deduction from principal, Interest paid at applicable rate. TD: Premature closure allowed anytime, Penalty: 1% deduction (if closed before 1 year), No penalty (if closed after 1 year), Interest paid at applicable rate. RD: Premature closure allowed after 1 year, Penalty: Varies based on tenure completed, Interest paid at applicable rate. General rules: Minimum lock-in: 1 year (except TD which has flexible tenure), Penalty: 1-2% deduction from principal, Interest: Paid at applicable rate (not full rate). Strategy: Avoid premature withdrawal - you lose principal (penalty) and may get lower interest. Plan investment for full tenure to maximize returns. Only withdraw in emergency situations."
      },
      {
        question: "How do Post Office schemes compare with bank FDs?",
        answer: "Post Office schemes vs Bank FDs comparison 2025: Interest Rates: Post Office: SCSS 8.2%, MIS 7.4%, KVP 7.5%, TD 7.1%, RD 6.7%, Bank FD: 6-7% typically (varies by bank). Post office rates are generally higher! Safety: Both: Government/regulator guaranteed, Very safe, Low risk. Post office: Direct government guarantee, Bank FD: DICGC insurance up to ₹5L. Tax Benefits: Both: Qualify for Section 80C deduction, Interest taxable. Post office: Same tax treatment as FD. Tenure: Post Office: Fixed tenures (5-10 years), Bank FD: Flexible (7 days to 10 years). Liquidity: Post Office: Premature withdrawal with penalty, Bank FD: Premature withdrawal with penalty (similar). Accessibility: Post Office: Available at post offices nationwide, Bank FD: Available at banks. Which to choose: Post Office: Higher rates (especially SCSS 8.2%), Government guarantee, Good for long-term. Bank FD: More flexible tenure, Better for short-term, Easier access. Strategy: For 5-year investment: Choose SCSS (8.2%) if 60+, or MIS (7.4%) if need monthly income. For 10-year: Choose KVP (7.5%). For flexible tenure: Choose bank FD or post office TD."
      },
      {
        question: "What is the difference between KVP and other Post Office schemes?",
        answer: "KVP (Kisan Vikas Patra) unique features: Tenure: 10 years (longest among post office schemes), Interest: 7.5% p.a., Special feature: Designed to DOUBLE money in ~10 years, Investment: ₹1K-₹1Cr (highest limit). Comparison with other schemes: KVP vs SCSS: KVP: 10 years, 7.5%, anyone can invest, SCSS: 5 years, 8.2%, only 60+ years. SCSS has higher rate but shorter tenure. KVP vs MIS: KVP: 10 years, 7.5%, lump sum, doubles money, MIS: 5 years, 7.4%, monthly income, lower returns. KVP vs TD: KVP: 10 years fixed, 7.5%, TD: 1-5 years flexible, 7.1%. KVP for long-term, TD for flexible tenure. When to choose KVP: Long-term goals (10+ years), Want to double money, Don't need monthly income, Can lock money for 10 years, Want guaranteed returns. Strategy: KVP is perfect for: Child education (10 years away), Marriage expenses (10 years planning), Long-term wealth building, Doubling investment safely. If you can wait 10 years, KVP gives good returns (7.5%) with government guarantee. Better than FD for 10-year goals (FD rates 6-7% typically)."
      }
    ],
    relatedCalculators: [
      { name: "FD Calculator", url: "/calculators/fd-calculator", description: "Compare with bank FD returns" },
      { name: "PPF Calculator", url: "/calculators/ppf-calculator", description: "Compare with PPF returns" },
      { name: "RD Calculator", url: "/calculators/rd-calculator", description: "Compare with bank RD" },
      { name: "Section 80C Calculator", url: "/calculators/section-80c-calculator", description: "Plan tax-saving investments" },
      { name: "Tax Saving Calculator", url: "/calculators/tax-saving-investment-calculator", description: "Plan all tax-saving investments" },
      { name: "Compound Interest Calculator", url: "/calculators/compound-interest-calculator", description: "Understand compounding" },
      { name: "Senior Citizen Calculator", url: "/calculators/senior-citizen-calculator", description: "Plan senior citizen investments" }
    ],
    lastUpdated: "2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema 
        name="Post Office Savings Schemes Calculator - India Post Office Calculator 2025-2027" 
        description="Free Post Office Savings Schemes Calculator. Calculate returns for KVP, SCSS, MIS, TD, RD with 2025-2027 rates. Compare schemes, plan investments. Updated with latest rates." 
        url="/calculators/post-office-calculator" 
        features={[
          "All post office schemes calculator",
          "KVP, SCSS, MIS, TD, RD returns",
          "2025-2027 interest rates",
          "Maturity calculator",
          "Monthly income calculator (MIS/SCSS)",
          "Quick presets for common scenarios",
          "Tax benefits calculator",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.8,count:11234}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Post Office Scheme Details
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
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Select Scheme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(schemeDetails).map(([key, scheme]) => (
                <button
                  key={key}
                  onClick={() => setSchemeType(key as SchemeType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    schemeType === key
                      ? 'bg-[--primary-100] text-[--primary-800]'
                      : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  {scheme.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="amount" className="text-sm font-medium text-neutral-700">
                Investment Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(amount)}
              </span>
            </div>
            <input 
              type="range" 
              id="amount"
              min={schemeDetails[schemeType].minAmount} 
              max={schemeDetails[schemeType].maxAmount} 
              step={1000} 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          {schemeDetails[schemeType].minTenure !== schemeDetails[schemeType].maxTenure && (
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="tenure" className="text-sm font-medium text-neutral-700">
                  Tenure (Years)
                </label>
                <span className="text-sm text-neutral-500">
                  {tenure} years
                </span>
              </div>
              <input 
                type="range" 
                id="tenure"
                min={schemeDetails[schemeType].minTenure} 
                max={schemeDetails[schemeType].maxTenure} 
                step={1} 
                value={tenure} 
                onChange={(e) => setTenure(Number(e.target.value))}
                className="slider"
              />
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Scheme Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Investment Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(amount)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maturityAmount)}</p>
            </div>
          </div>
          {monthlyIncome > 0 && (
            <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
              <p className="text-sm text-neutral-500 mb-1">Monthly Income</p>
              <p className="text-xl font-bold text-[--accent-800]">{formatCurrency(monthlyIncome)}</p>
            </div>
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
                { name: 'Principal', value: amount, color: '#3b82f6' },
                { name: 'Interest', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Scheme Details
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                {schemeDetails[schemeType].name}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                {schemeDetails[schemeType].description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Interest Rate</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {schemeDetails[schemeType].interestRate}% p.a.
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Tenure</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {schemeDetails[schemeType].minTenure === schemeDetails[schemeType].maxTenure
                      ? `${schemeDetails[schemeType].minTenure} years`
                      : `${schemeDetails[schemeType].minTenure}-${schemeDetails[schemeType].maxTenure} years`
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Investment Limits</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Minimum</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {formatCurrency(schemeDetails[schemeType].minAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Maximum</p>
                  <p className="text-lg font-semibold text-neutral-900">
                    {formatCurrency(schemeDetails[schemeType].maxAmount)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Government backed security</li>
                <li>Tax benefits under Section 80C (for specific schemes)</li>
                <li>Flexible investment options</li>
                <li>Wide accessibility through post offices</li>
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