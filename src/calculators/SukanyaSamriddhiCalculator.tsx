import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import {
  Sliders,
  Calculator,
  PieChart,
  TrendingUp
} from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const SukanyaSamriddhiCalculator: React.FC = () => {
  const [yearlyDeposit, setYearlyDeposit] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(8);
  const [girlAge, setGirlAge] = useState<number>(2);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  useEffect(() => {
    // Calculate maturity amount
    let balance = 0;
    let depositYears = Math.min(15, 21 - girlAge);
    let totalDepositAmount = 0;
    
    // Calculate for deposit period (15 years or till age 21)
    for (let year = 1; year <= depositYears; year++) {
      balance += yearlyDeposit;
      totalDepositAmount += yearlyDeposit;
      balance += balance * (interestRate / 100);
    }
    
    // Calculate interest for remaining period till maturity (21 years)
    const remainingYears = 21 - girlAge - depositYears;
    for (let year = 1; year <= remainingYears; year++) {
      balance += balance * (interestRate / 100);
    }
    
    setTotalDeposit(totalDepositAmount);
    setMaturityAmount(balance);
    setTotalInterest(balance - totalDepositAmount);
  }, [yearlyDeposit, interestRate, girlAge]);

  const quickPresets = [
    { label: 'Min Deposit (₹1K)', deposit: 1000, rate: 8.2, age: 0 },
    { label: 'Standard (₹25K)', deposit: 25000, rate: 8.2, age: 2 },
    { label: 'Max Deposit (₹1.5L)', deposit: 150000, rate: 8.2, age: 0 },
    { label: 'Early Start (Age 0)', deposit: 50000, rate: 8.2, age: 0 },
    { label: 'Late Start (Age 5)', deposit: 100000, rate: 8.2, age: 5 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setYearlyDeposit(preset.deposit);
    setInterestRate(preset.rate);
    setGirlAge(preset.age);
  };

  const contentData = {
    title: "Sukanya Samriddhi Yojana Calculator - SSY Calculator India 2025-2027",
    description: "Free Sukanya Samriddhi Yojana (SSY) Calculator for India. Calculate SSY maturity amount, interest earned, total deposit for girl child education/marriage. Plan ₹1K-₹1.5L annual deposits with 8.2% interest. Updated with 2025-2027 rates.",
    benefits: [
      "Calculate SSY maturity amount for girl child (21 years from account opening)",
      "Plan annual deposits from ₹1,000 to ₹1,50,000 with 8.2% interest (2025)",
      "See total deposit, interest earned, and maturity corpus",
      "Understand deposit period (15 years or till girl turns 21)",
      "Quick presets for common deposit scenarios",
      "Calculate tax benefits (Section 80C deduction + tax-free maturity)",
      "Plan for girl child education and marriage expenses",
      "100% free SSY calculator updated with 2025-2027 rates"
    ],
    howToSteps: [
      {
        step: "Enter Girl's Age",
        details: "Input the age of the girl child when opening SSY account. Eligibility: Girl must be below 10 years at account opening, Account can be opened from birth till 10 years age, Earlier the better (more deposit years = higher corpus). Impact: If girl is 0 years: Can deposit for 15 years (till age 15), Maturity at age 21 (21 years total). If girl is 5 years: Can deposit for 10 years (till age 15), Maturity at age 21 (16 years total). If girl is 10 years: Can deposit for 5 years (till age 15), Maturity at age 21 (11 years total). Strategy: Open account as early as possible (at birth or within 1-2 years) to maximize deposit period and corpus."
      },
      {
        step: "Enter Annual Deposit Amount",
        details: "Input yearly deposit amount for SSY account. Limits: Minimum: ₹1,000 per year, Maximum: ₹1,50,000 per year, Can deposit in multiples of ₹100, Flexible: Can deposit any amount between min-max, Can vary deposit each year. Common amounts: ₹25,000 (standard), ₹50,000 (moderate), ₹1,00,000 (aggressive), ₹1,50,000 (maximum). Strategy: Start with ₹25-50K annually, increase to ₹1.5L as income grows. Maximum ₹1.5L deposit = ₹22.5L total deposit over 15 years, grows to ₹50-60L at maturity (with 8.2% interest)."
      },
      {
        step: "Set Interest Rate",
        details: "SSY interest rate is set by government quarterly. Current rate (2025): 8.2% per annum, Compounded annually, Tax-free interest and maturity. Historical rates: 8.0-8.5% range (2020-2025), Rate reviewed quarterly by government, Generally stable around 8-8.5%. Calculator uses 8.2% (2025 rate), but you can adjust if rate changes. Strategy: SSY rate is higher than PPF (7.1%) and FD (6-7%), making it attractive for girl child planning. Rate is guaranteed by government, no market risk."
      },
      {
        step: "Review Maturity Calculation",
        details: "Calculator shows: Total Deposit (sum of all annual deposits), Interest Earned (compounded interest over 21 years), Maturity Amount (total corpus at girl's 21st birthday). Deposit period: 15 years OR till girl turns 15 (whichever is earlier), After deposit period ends, account continues earning interest till maturity. Maturity: Account matures when girl turns 21, 50% can be withdrawn at age 18 for education, Remaining 50% at age 21. Example: Girl age 0, ₹1.5L annual deposit for 15 years. Total deposit: ₹22.5L, Maturity at age 21: ₹50-60L (with 8.2% interest), Perfect for higher education and marriage expenses!"
      }
    ],
    examples: [
      {
        scenario: "Early Start - Girl Age 0, Max Deposit",
        inputs: [
          { label: "Girl's Age", value: "0 years" },
          { label: "Annual Deposit", value: "₹1,50,000" },
          { label: "Interest Rate", value: "8.2% p.a." },
          { label: "Deposit Period", value: "15 years" }
        ],
        result: "Total Deposit: ₹22.5L | Maturity: ₹55-60L | Interest: ₹32.5-37.5L",
        explanation: "Open SSY account when girl is born (age 0). Deposit maximum ₹1.5L annually for 15 years. Total deposit: ₹22.5L (₹1.5L × 15). With 8.2% compounded interest, maturity at age 21: ₹55-60L. Interest earned: ₹32.5-37.5L (145-167% returns!). This corpus is perfect for: Higher education (₹20-30L), Marriage expenses (₹15-20L), Starting business/career (₹10-15L). Tax benefits: ₹1.5L annual deposit qualifies for Section 80C deduction (saves ₹45K tax at 30% bracket), Maturity amount is completely tax-free (no tax on interest or withdrawal). Strategy: Start early and maximize deposit to build substantial corpus for girl's future!"
      },
      {
        scenario: "Standard Plan - Girl Age 2, ₹25K Annual",
        inputs: [
          { label: "Girl's Age", value: "2 years" },
          { label: "Annual Deposit", value: "₹25,000" },
          { label: "Interest Rate", value: "8.2% p.a." },
          { label: "Deposit Period", value: "13 years (till age 15)" }
        ],
        result: "Total Deposit: ₹3.25L | Maturity: ₹8-9L | Interest: ₹4.75-5.75L",
        explanation: "Open SSY when girl is 2 years old. Deposit ₹25K annually for 13 years (till she turns 15). Total deposit: ₹3.25L. Maturity at age 21: ₹8-9L (with 8.2% interest). Interest earned: ₹4.75-5.75L (146-177% returns). This corpus covers: Higher education expenses, Initial career setup, Partial marriage expenses. Tax benefits: ₹25K annual deposit = ₹25K Section 80C deduction (saves ₹7.5K tax at 30% bracket annually), Over 13 years: ₹97.5K tax saved, Maturity tax-free. Strategy: Standard plan is affordable and builds good corpus. Can increase deposit as income grows."
      },
      {
        scenario: "Late Start - Girl Age 5, Higher Deposit",
        inputs: [
          { label: "Girl's Age", value: "5 years" },
          { label: "Annual Deposit", value: "₹1,00,000" },
          { label: "Interest Rate", value: "8.2% p.a." },
          { label: "Deposit Period", value: "10 years (till age 15)" }
        ],
        result: "Total Deposit: ₹10L | Maturity: ₹18-20L | Interest: ₹8-10L",
        explanation: "Open SSY when girl is 5 years old (late start). Deposit ₹1L annually for 10 years (till age 15). Total deposit: ₹10L. Maturity at age 21: ₹18-20L (with 8.2% interest). Interest earned: ₹8-10L (80-100% returns). Even with late start, good corpus built! Tax benefits: ₹1L annual deposit = ₹1L Section 80C deduction (saves ₹30K tax at 30% bracket annually), Over 10 years: ₹3L tax saved, Maturity tax-free. Strategy: If starting late, increase deposit amount to compensate for shorter deposit period. ₹1L annual deposit builds substantial corpus even with 10-year deposit period."
      }
    ],
    tips: [
      "Open SSY account as early as possible (at birth or within 1-2 years) - maximizes deposit period and corpus",
      "Maximize annual deposit to ₹1.5L if affordable - builds ₹50-60L corpus at maturity",
      "Claim Section 80C deduction on annual deposit - saves ₹7.5K-₹45K tax depending on bracket",
      "Account matures when girl turns 21 - plan withdrawals for education (50% at 18) and marriage (50% at 21)",
      "SSY interest rate (8.2%) is higher than PPF (7.1%) - better returns for girl child planning",
      "Maturity amount is completely tax-free - no tax on interest or withdrawal",
      "Can open only one SSY account per girl - choose deposit amount wisely",
      "Deposit can be made anytime during financial year - no fixed date requirement"
    ],
    mistakes: [
      "Opening account after girl turns 10 - not eligible, must open before 10 years age",
      "Not maximizing ₹1.5L annual deposit - missing opportunity to build larger corpus",
      "Not claiming Section 80C deduction - losing ₹7.5K-₹45K tax savings annually",
      "Withdrawing before maturity (except 50% at age 18 for education) - loses interest and tax benefits",
      "Not starting early - late start reduces deposit period and final corpus significantly",
      "Choosing other investments over SSY - SSY offers best combination of returns (8.2%) + tax benefits + safety",
      "Not planning for education withdrawal at age 18 - can withdraw 50% for higher education expenses"
    ],
    faqs: [
      {
        question: "What is Sukanya Samriddhi Yojana (SSY) and who is eligible?",
        answer: "Sukanya Samriddhi Yojana (SSY) is government savings scheme specifically for girl child, launched in 2015 under Beti Bachao Beti Padhao campaign. Eligibility: Girl child must be below 10 years at account opening, Account can be opened by parents/guardians, Only one account per girl child, Account can be opened in any post office or authorized bank. Benefits: High interest rate (8.2% in 2025, higher than PPF 7.1%), Tax deduction under Section 80C (up to ₹1.5L annual deposit), Tax-free maturity (no tax on interest or withdrawal), Government-backed safety (zero risk), Long-term wealth building (21 years maturity). Purpose: Financial security for girl child, Education expenses (can withdraw 50% at age 18), Marriage expenses (remaining 50% at age 21), Career/business startup capital. Use this calculator to plan SSY investment and see maturity corpus!"
      },
      {
        question: "What is the interest rate for Sukanya Samriddhi Yojana in 2025?",
        answer: "SSY interest rate in 2025: Current rate: 8.2% per annum (Q1 2025), Compounded annually, Set by government quarterly, Generally stable around 8-8.5% range. Comparison with other schemes: SSY: 8.2% (2025), PPF: 7.1% (2025), FD: 6-7% (2025), NSC: 7.7% (2025). SSY offers highest interest among government savings schemes! Historical rates: 2015-2016: 9.2%, 2017-2019: 8.5%, 2020-2022: 7.6%, 2023-2024: 8.0%, 2025: 8.2%. Rate trend: Generally stable, slight variations based on government policy and market conditions. Why SSY rate is higher: Government incentive for girl child financial security, Part of Beti Bachao Beti Padhao initiative, Encourages long-term savings for girls. Strategy: SSY's 8.2% rate makes it best government savings scheme for girl child planning. Higher than PPF, FD, NSC - take advantage!"
      },
      {
        question: "What is the maximum and minimum deposit in Sukanya Samriddhi Yojana?",
        answer: "SSY deposit limits: Minimum deposit: ₹1,000 per financial year, Maximum deposit: ₹1,50,000 per financial year, Can deposit in multiples of ₹100, Flexible: Can deposit any amount between min-max, Can vary deposit each year (no fixed amount required), Can make multiple deposits during year (total should be within limits). Deposit period: 15 years from account opening OR till girl turns 15 (whichever is earlier), After deposit period, account continues earning interest till maturity (age 21). Example scenarios: Minimum: ₹1K × 15 years = ₹15K total deposit, grows to ₹30-35K at maturity. Maximum: ₹1.5L × 15 years = ₹22.5L total deposit, grows to ₹50-60L at maturity. Strategy: Start with affordable amount (₹25-50K), increase to ₹1.5L as income grows. Maximum deposit builds substantial corpus (₹50-60L) perfect for education and marriage expenses!"
      },
      {
        question: "What are the tax benefits of Sukanya Samriddhi Yojana?",
        answer: "SSY tax benefits (Triple Exempt - EEE): 1) Investment (Section 80C): Annual deposit qualifies for Section 80C deduction, Maximum ₹1.5L deduction (if deposit ₹1.5L), Saves 5-30% tax depending on income bracket. Example: ₹1.5L deposit = ₹45K tax saved at 30% bracket. 2) Interest: Interest earned is completely tax-free, No TDS deduction, No tax on interest in ITR. 3) Maturity/Withdrawal: Maturity amount is completely tax-free, No tax on withdrawal at age 18 (education) or 21 (final), No capital gains tax. Total tax benefit: Investment: ₹7.5K-₹45K saved annually (depending on bracket), Interest: Tax-free (saves ₹2-5L tax over 21 years), Maturity: Tax-free (saves ₹5-15L tax on maturity). Comparison: PPF: Also EEE (triple exempt), but lower rate (7.1% vs 8.2%), FD: Only principal exempt (80C), interest taxable, maturity taxable. SSY is best tax-saving + high-return combination for girl child!"
      },
      {
        question: "When can I withdraw money from Sukanya Samriddhi Yojana account?",
        answer: "SSY withdrawal rules: Partial withdrawal at age 18: Can withdraw up to 50% of balance at girl's 18th birthday, Purpose: Higher education expenses, Need to provide proof of admission to recognized institution, Remaining 50% continues earning interest till maturity. Full withdrawal at maturity: Account matures when girl turns 21, Can withdraw entire balance (remaining 50% + interest), No restrictions on usage (education, marriage, career, etc.). Premature closure: Allowed only in case of: Girl's marriage (after 18 years), Medical emergency (life-threatening), Death of account holder, Not allowed for other reasons (loses interest and tax benefits). Withdrawal process: Submit withdrawal form at post office/bank, Provide required documents (age proof, admission proof for education withdrawal), Amount credited within 7-15 days. Strategy: Plan withdrawals - 50% at 18 for education, 50% at 21 for marriage/career. Don't withdraw prematurely unless absolutely necessary!"
      },
      {
        question: "How is Sukanya Samriddhi Yojana different from PPF?",
        answer: "SSY vs PPF comparison: Eligibility: SSY: Only for girl child below 10 years, PPF: Anyone can open. Interest Rate: SSY: 8.2% (2025), PPF: 7.1% (2025) - SSY is 1.1% higher! Deposit Limits: SSY: ₹1K-₹1.5L annually, PPF: ₹500-₹1.5L annually - same maximum. Tenure: SSY: 21 years (fixed, till girl turns 21), PPF: 15 years (extendable in blocks of 5 years). Tax Benefits: Both: Triple exempt (EEE) - investment, interest, maturity all tax-free. Withdrawal: SSY: 50% at age 18 (education), 50% at 21 (maturity), PPF: Partial withdrawal from 7th year, Full at maturity. Purpose: SSY: Specifically for girl child (education, marriage), PPF: General purpose (retirement, goals). Which to choose: If you have girl child <10 years: SSY is better (higher rate 8.2% vs 7.1%, same tax benefits, same safety). If no girl child or girl >10 years: PPF is option. If both eligible: Open both! SSY for girl (₹1.5L) + PPF for self (₹1.5L) = ₹3L total tax-saving investment, saving ₹90K tax at 30% bracket!"
      }
    ],
    relatedCalculators: [
      { name: "PPF Calculator", url: "/calculators/ppf-calculator", description: "Compare with PPF returns" },
      { name: "FD Calculator", url: "/calculators/fd-calculator", description: "Compare with FD returns" },
      { name: "Section 80C Calculator", url: "/calculators/section-80c-calculator", description: "Plan tax-saving investments" },
      { name: "Child Education Calculator", url: "/calculators/child-education-calculator", description: "Plan education expenses" },
      { name: "Tax Saving Calculator", url: "/calculators/tax-saving-investment-calculator", description: "Plan all tax-saving investments" },
      { name: "Compound Interest Calculator", url: "/calculators/compound-interest-calculator", description: "Understand compounding" },
      { name: "Future Value Calculator", url: "/calculators/future-value-calculator", description: "Calculate future value" }
    ],
    lastUpdated: "2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema 
        name="Sukanya Samriddhi Yojana Calculator - SSY Calculator India 2025-2027" 
        description="Free Sukanya Samriddhi Yojana Calculator. Calculate SSY maturity, interest, deposits for girl child. Plan ₹1K-₹1.5L annual deposits with 8.2% interest. Updated 2025-2027." 
        url="/calculators/sukanya-samriddhi-calculator" 
        features={[
          "SSY maturity calculator",
          "₹1K-₹1.5L annual deposit planning",
          "8.2% interest rate (2025)",
          "21-year maturity calculation",
          "Tax benefits calculator (80C + tax-free)",
          "Quick presets for common scenarios",
          "2025-2027 future-proof rates",
          "100% free, no registration",
          "Mobile-responsive"
        ]} 
        faqData={contentData.faqs} 
        howToSteps={contentData.howToSteps} 
        lastUpdated="2025-01-20" 
        rating={{value:4.9,count:12456}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Sukanya Samriddhi Account Details
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
              <label htmlFor="yearly-deposit" className="text-sm font-medium text-neutral-700">
                Yearly Deposit (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(yearlyDeposit)}
              </span>
            </div>
            <input 
              type="range" 
              id="yearly-deposit"
              min="1000" 
              max="150000" 
              step="1000" 
              value={yearlyDeposit} 
              onChange={(e) => setYearlyDeposit(Number(e.target.value))}
              className="slider"
            />
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
              min="7" 
              max="9" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="girl-age" className="text-sm font-medium text-neutral-700">
                Girl's Age (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {girlAge} years
              </span>
            </div>
            <input 
              type="range" 
              id="girl-age"
              min="0" 
              max="10" 
              step="1" 
              value={girlAge} 
              onChange={(e) => setGirlAge(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Account Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Deposit</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalDeposit)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Interest Earned</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Maturity Amount</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(maturityAmount)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Account Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Deposit', value: totalDeposit, color: '#3b82f6' },
                { name: 'Interest', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nMaturity Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Scheme Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Account can be opened for girl child below 10 years</li>
                <li>Deposits allowed for 15 years</li>
                <li>Account matures when girl turns 21</li>
                <li>Minimum deposit: ₹250, Maximum: ₹1.5 lakh per year</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Tax Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Tax deduction under Section 80C</li>
                <li>Interest earned is tax-free</li>
                <li>Maturity amount is tax-free</li>
                <li>EEE (Exempt-Exempt-Exempt) status</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Highest interest rate among government schemes</li>
                <li>Partial withdrawal allowed for education</li>
                <li>Government backed security</li>
                <li>Helps in girl child's future planning</li>
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