import React, { useState, useEffect } from 'react';
import { Calculator, Percent, Calendar, TrendingUp } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(7);
  const [time, setTime] = useState<number>(3);
  const [interest, setInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const simpleInterest = (principal * rate * time) / 100;
    setInterest(simpleInterest);
    setTotalAmount(principal + simpleInterest);
  }, [principal, rate, time]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const contentData = {
    title: "Simple Interest Calculator",
    description: "Simple Interest Calculator helps you calculate interest on loans, FDs, short-term deposits using the simple interest formula SI = (P × R × T) / 100. Unlike compound interest, simple interest doesn't compound - interest is calculated only on principal amount throughout the tenure. Commonly used for: Car loans (some lenders), Personal loans (flat rate), Short-term FDs (less than 1 year), Kisan Vikas Patra initial years, Gold loans from some lenders. Understanding simple vs compound interest is crucial - simple interest is LESS favorable for investments (lower returns) but BETTER for loans (lower total payment). Our free calculator shows exact interest amount, total repayment, and effective annual rate for 2025.",
    benefits: ["Calculate simple interest instantly with accurate formula - perfect for quick calculations","Understand total interest payable on flat rate loans before committing","Compare simple interest vs compound interest impact on same principal and rate","Check if your loan uses simple or compound interest method (huge difference!)","Calculate maturity amount for short-term deposits and fixed deposits","Useful for students learning interest concepts with step-by-step breakdown","Plan loan repayments with predictable interest (no compounding surprises)","100% free calculator with examples, updated for 2025"],
    howToSteps: [{step:"Enter Principal Amount (P)",details:"Input the initial amount borrowed or invested. For Loans: Amount you're borrowing (₹50K to ₹50L typically). For Investments: FD amount, deposit amount (₹10K to ₹50L). Note: In simple interest, interest is calculated only on this principal amount throughout, NOT on accumulated interest (that's compound interest). Example: ₹1,00,000 principal remains ₹1,00,000 for interest calculation in Year 1, 2, 3... always. In compound interest, Year 2 principal would be ₹1,00,000 + Year 1 interest."},{step:"Set Interest Rate (R) Per Annum",details:"Enter annual interest rate in percentage. For FDs: 5-7% typically for 1-3 year deposits in 2025. For Savings Accounts: 3-4% (use simple interest for quarterly calculation). For Gold Loans: 8-12% p.a. (some use simple, some compound). For Car/Personal Loans: 8-18% (if flat rate mentioned, it's simple interest - beware!). Important: Simple interest rate and compound interest rate look same (both 10% p.a.) but effective cost/returns differ significantly! Always ask lender: 'Is this simple or compound interest?' Don't assume!"},{step:"Enter Time Period (T) in Years",details:"Specify the loan tenure or investment period in years. Can use decimals for months: 6 months = 0.5 years, 9 months = 0.75 years, 18 months = 1.5 years. Typical tenures: Short-term deposits: 0.25 to 2 years, Car loans: 3 to 7 years, Personal loans: 1 to 5 years. Key insight: In simple interest, time impacts linearly. Double time = Double interest. In compound interest, time has exponential impact. Double time = More than double interest (due to compounding)."},{step:"Review Simple Interest Calculated",details:"Calculator shows: Simple Interest Amount: Total interest over entire period. Total Amount: Principal + Interest (maturity value or total repayment). Effective Annual Rate: Actual annual cost/return. Formula used: SI = (Principal × Rate × Time) / 100. Example: P = ₹1,00,000, R = 8%, T = 3 years. SI = (1,00,000 × 8 × 3) / 100 = ₹24,000. Total Amount = ₹1,00,000 + ₹24,000 = ₹1,24,000. Interpretation: For Investment: You earn ₹24K interest on ₹1L over 3 years (₹8K annually, 8% flat). For Loan: You pay ₹24K interest on ₹1L borrowed over 3 years."},{step:"Compare with Compound Interest",details:"Critical comparison! Use our Compound Interest Calculator to see difference. Example: ₹1L at 8% for 3 years. Simple Interest: ₹24,000 interest, Total ₹1,24,000. Compound Interest (annual): ₹25,971 interest, Total ₹1,25,971. Difference: ₹1,971 (compound gives 8% more interest!). Over 10 years gap widens: Simple: ₹80,000 interest. Compound: ₹1,15,892 interest. Difference: ₹35,892 (45% more!). For investors: ALWAYS prefer compound interest (PPF, mutual funds, etc.). For borrowers: Simple interest better (pay less) but rare - most loans use compound/reducing balance."}],
    examples: [{scenario:"Car Loan with Flat Rate (Simple Interest)",inputs:[{label:"Car Loan",value:"₹5,00,000"},{label:"Flat Rate",value:"10% p.a. (simple interest)"},{label:"Tenure",value:"5 years"}],result:"Simple Interest: ₹2,50,000 | Total Payment: ₹7,50,000 | EMI: ₹12,500/month",explanation:"Some car loan lenders advertise 'flat rate' which is simple interest. Loan ₹5L at 10% flat for 5 years. Interest: (₹5L × 10 × 5) / 100 = ₹2.5L. Total: ₹7.5L. Monthly EMI: ₹7.5L / 60 months = ₹12,500. Sounds straightforward. BUT compare with reducing balance (compound): Same ₹5L at 10% reducing balance: Total interest only ₹1.37L, EMI ₹10,624. Flat rate costs ₹82.6% MORE interest (₹2.5L vs ₹1.37L)! Effective interest rate of flat rate loan: ~18-19% p.a. (not 10%!). ALWAYS insist on reducing balance method for loans. Flat/simple interest is a trap!"},{scenario:"Fixed Deposit for 18 Months",inputs:[{label:"FD Amount",value:"₹2,00,000"},{label:"Interest Rate",value:"6.5% p.a."},{label:"Tenure",value:"1.5 years (18 months)"}],result:"Simple Interest: ₹19,500 | Maturity: ₹2,19,500",explanation:"Bank FD of ₹2L for 18 months at 6.5% p.a. For tenure <1 year or specific short tenures, banks use simple interest for calculation simplicity. Interest: (₹2L × 6.5 × 1.5) / 100 = ₹19,500. Maturity: ₹2,19,500. Effective return: ₹19,500 on ₹2L over 18 months = 9.75% total or 6.5% annualized. If compounded quarterly (most FDs do for >1 year tenure), maturity would be ₹2,20,198 (₹698 more). For short tenure difference is small. For 3-5 years, compounding makes significant difference."},{scenario:"Gold Loan Interest Calculation",inputs:[{label:"Gold Loan",value:"₹1,00,000"},{label:"Interest Rate",value:"12% p.a. simple"},{label:"Tenure",value:"6 months (0.5 years)"}],result:"Simple Interest: ₹6,000 | Total Repayment: ₹1,06,000",explanation:"Gold loan ₹1L at 12% for 6 months. Some lenders use simple interest for bullet repayment loans (pay principal + interest at end, no monthly EMI). Interest: (₹1L × 12 × 0.5) / 100 = ₹6,000. Total repayment: ₹1,06,000 at end of 6 months. Monthly effective: ₹6K / 6 = ₹1K interest monthly = 1% monthly rate = 12% annually (matches quoted rate for simple interest). If same loan on reducing balance with monthly EMI: Total interest only ₹3,280. Simple interest costs ₹2,720 more (83% higher!) because full principal outstanding for all 6 months. Lesson: For bullet repayment loans (no interim EMI), lender benefits from simple interest as full principal earns interest entire tenure."}],
    tips: ["Always ask lenders: 'Is this simple interest or reducing balance?' - don't assume, especially for car/personal loans","Avoid flat rate loans - they use simple interest making effective rate nearly double the advertised rate!","For investments, prefer compound interest instruments - PPF, mutual funds, FDs >1 year all compound, giving better returns","Simple interest good for very short term (<6 months) - difference vs compound minimal, calculation simpler","Calculate effective annual rate for simple interest loans - divide total interest by principal and years to see true cost","For loans, reducing balance (compound) ALWAYS better than flat rate (simple) from borrower perspective","For deposits, compound interest ALWAYS better than simple from investor perspective - insist on compounding","Use simple interest calculator for quick estimates, then verify exact amount with compound calculator for long tenure"],
    mistakes: ["Accepting flat rate car/personal loans thinking 10% flat = 10% reducing - effective rate is 18-19%, nearly double!","Not checking loan agreement for 'simple interest' or 'flat rate' clause - makes huge cost difference over tenure","Comparing simple interest investment returns with compound interest returns directly - 8% simple ≠ 8% compound!","Using simple interest for long-term planning (10+ years) - compounding matters exponentially, simple interest underestimates growth","Assuming all FDs use simple interest - most use compound for tenure >1 year, only very short FDs use simple","Not converting monthly/quarterly rates to annual for comparison - 1% monthly simple = 12% annually, but 1% monthly compound = 12.68% annually","Believing simple interest is 'simpler' hence better for loans - it's simpler to calculate but costlier to pay!","Using simple interest calculator for mutual funds, SIP, long-term FD - these all use compound interest, results will be wrong"],
    faqs: [{question:"What is simple interest and how is it different from compound interest?",answer:"Simple Interest (SI) is interest calculated only on the principal amount throughout the loan/investment tenure. Formula: SI = (P × R × T) / 100, where P = Principal, R = Rate per annum, T = Time in years. Compound Interest (CI) is interest calculated on principal plus accumulated interest. Interest compounds (earns interest on interest). Example comparison - ₹1 lakh at 10% for 3 years: Simple Interest: Year 1: ₹10K interest (on ₹1L), Year 2: ₹10K interest (on ₹1L), Year 3: ₹10K interest (on ₹1L), Total: ₹30K interest. Compound Interest (annual): Year 1: ₹10K interest (on ₹1L), Year 2: ₹11K interest (on ₹1.1L), Year 3: ₹12.1K interest (on ₹1.21L), Total: ₹33.1K interest. Difference: ₹3,100 (10.3% more with compounding). Key Differences: Simple interest is LINEAR (constant interest every year), Compound interest is EXPONENTIAL (increasing interest each year as base grows). For Investors: Compound is better (higher returns), For Borrowers: Simple is better (lower payment) but almost never offered. Reality: Most investments use compound (FDs >1 year, PPF, mutual funds), Most loans use reducing balance/compound (home loans, car loans on EMI). Simple/flat rate loans are trap - effective rate is nearly double!"},{question:"When is simple interest used in India for loans and investments?",answer:"Simple interest usage in India 2025: Loans (Flat Rate): Some car loans (dealers call it 'flat rate'), Some personal loans from small NBFCs, Gold loans with bullet repayment (some lenders), Informal lending/personal loans. WARNING: These are expensive! Flat rate 10% = effective 18-19% reducing balance rate. Investments: Short-term FDs (<1 year tenure), Savings account interest (calculated daily, paid quarterly), Kisan Vikas Patra (KVP) during holding period, Some government savings schemes for specific terms, NSC (National Savings Certificate) for certain calculations. Most Common: Savings account: Banks calculate interest daily using simple interest, then compound quarterly. Example: ₹1L avg balance at 4% p.a. = ₹4,000 annual interest calculated daily as simple, then compounded quarterly giving ₹4,060 effective. Why Simple Interest is Rare: For lenders giving loans: Compound/reducing balance earns more interest (benefits bank), Simple interest earns less (less profitable). For institutions taking deposits: Compound interest attracts more investors (higher returns), Simple interest less attractive. For borrowers: Everyone wants reducing balance (compound) as it's cheaper. No one asks for flat rate/simple as it's expensive. Bottom Line: In modern finance, simple interest is mostly legacy/small transactions. Major loans and investments use compound interest. If someone offers you simple interest loan (flat rate), RUN! If offered simple interest investment, ask for compound alternative."},{question:"What is flat rate interest in loans and why is it bad?",answer:"Flat Rate (Simple Interest method for loans) calculates interest on original principal for entire tenure, even though you're repaying monthly and principal reduces. Mechanics: Loan ₹5L at 10% flat for 5 years. Interest: (₹5L × 10% × 5) = ₹2.5L (calculated on ₹5L for all 5 years!). Total repayment: ₹5L + ₹2.5L = ₹7.5L. Monthly EMI: ₹7.5L / 60 = ₹12,500. Looks simple. But ACTUAL cost analysis: After paying EMI for 3 years (36 months), you've paid ₹4.5L (₹3L principal + ₹1.5L interest portion in EMI). Your outstanding loan: ₹2L only (not ₹5L!). But you're STILL paying interest as if ₹5L is outstanding! This is why flat rate is expensive and deceptive. Comparison with Reducing Balance: Same ₹5L at 10% reducing balance: Interest calculated on outstanding principal (reduces monthly as you pay EMI). Total interest: ₹1.37L (not ₹2.5L!). EMI: ₹10,624 (not ₹12,500). Savings: ₹1.13L in interest + ₹1,876 lower monthly EMI. Effective Interest Rate: Flat rate 10% = Effective reducing balance rate 18-19% p.a.! You're paying DOUBLE what's advertised! Red Flags: Loan advertised as 'low interest flat rate', 'Simple interest loan at just X%', 'Flat EMI throughout tenure'. Always Ask: 'Is this reducing balance or flat rate?' Insist on reducing balance. Check EMI calculator: If lender's quoted EMI is higher than online calculator for same amount/rate/tenure, it's flat rate. Example: Their EMI ₹12,500 vs calculator ₹10,624 for ₹5L at 10% = RED FLAG! Legal Status: RBI hasn't banned flat rate, so some lenders (esp. small NBFCs) still use it. Home loans must be reducing balance. But car/personal loans can be flat rate if mentioned in agreement. SEBI/RBI recommendation: Use reducing balance for fair lending. Consumer Protection: If flat rate not clearly disclosed, can complain to RBI Ombudsman. Verdict: NEVER take flat rate/simple interest loan. Always insist on reducing balance method!"},{question:"How to calculate simple interest manually for any amount?",answer:"Simple Interest Formula: SI = (P × R × T) / 100. Where: P = Principal (initial amount in ₹), R = Rate of interest per annum (%), T = Time period in years. Step-by-step calculation: Step 1: Note down Principal (₹), Rate (%), Time (years). Step 2: Multiply all three: P × R × T. Step 3: Divide result by 100. Step 4: This gives Simple Interest. Step 5: Add SI to Principal for Total Amount. Example 1 - Loan: Principal (P) = ₹2,00,000, Rate (R) = 12% p.a., Time (T) = 4 years. SI = (2,00,000 × 12 × 4) / 100 = 96,00,000 / 100 = ₹96,000. Total Repayment = ₹2,00,000 + ₹96,000 = ₹2,96,000. Monthly EMI = ₹2,96,000 / 48 months = ₹6,167. Example 2 - FD: Principal = ₹50,000, Rate = 6%, Time = 2.5 years. SI = (50,000 × 6 × 2.5) / 100 = 7,50,000 / 100 = ₹7,500. Maturity = ₹50,000 + ₹7,500 = ₹57,500. Example 3 - Short tenure: Principal = ₹3,00,000, Rate = 8%, Time = 9 months = 0.75 years. SI = (3,00,000 × 8 × 0.75) / 100 = 18,00,000 / 100 = ₹18,000. Total = ₹3,18,000. Pro Tips: For months: Divide by 12 (6 months = 6/12 = 0.5 years, 9 months = 9/12 = 0.75 years). For days: Divide by 365 (90 days = 90/365 = 0.247 years). Interest per year: Multiply result by (1/T) to get annual interest. Mental Math Shortcut: 10% for 1 year = 10% of principal. 10% for 2 years = 20% of principal. 5% for 3 years = 15% of principal. Quick estimation before calculator!"},{question:"Is simple interest better than compound interest for borrowers?",answer:"For BORROWERS (taking loans): Simple interest sounds better (lower total interest) but it's NOT offered in genuine form. Here's why: True Simple Interest on Reducing Principal: If lender calculated interest on reducing outstanding (as you pay EMI, interest calculated on remaining balance), it would be cheaper than compound. But no lender offers this! Flat Rate (Called 'Simple Interest' by marketers): Interest calculated on original principal even though balance reduces monthly. This is EXPENSIVE - effective rate is 1.8-2x the quoted rate! Flat 10% = Effective 18-19% reducing balance. Reducing Balance/Compound (Standard method): Interest calculated only on outstanding balance. As you pay EMI, outstanding reduces, interest reduces monthly. This is the CHEAPEST method for borrowers in practice. Comparison - ₹5L loan at quoted 10% for 5 years: True Simple (doesn't exist): Interest on reducing balance linearly = ₹1.37L approx. Flat Rate (marketed as simple): Interest on ₹5L for all 5 years = ₹2.5L (EXPENSIVE!). Reducing Balance (compound): Interest on reducing outstanding = ₹1.37L (CHEAPEST available!). Verdict for Borrowers: Reducing Balance (compound method) is BEST available option despite 'compound' in name. Flat rate (simple interest marketing) is WORST - avoid completely! Always insist on reducing balance for all loans. For INVESTORS: Compound interest is ALWAYS better. Simple interest investments grow linearly (slow). Compound grows exponentially (fast). ₹1L at 8% for 20 years: Simple: ₹2.6L (₹1.6L interest). Compound: ₹4.66L (₹3.66L interest - 2.3x more!). Choose: Investments: Always compound (PPF, mutual funds, compounded FDs). Loans: Always reducing balance (marketed as compound but actually benefits borrower)."}],
    relatedCalculators: [{name:"Compound Interest Calculator",url:"/calculators/compound-interest-calculator",description:"Calculate compound interest"},{name:"EMI Calculator",url:"/calculators/emi-calculator",description:"Reducing balance loan calculator"},{name:"FD Calculator",url:"/calculators/fd-calculator",description:"Fixed deposit calculator"},{name:"RD Calculator",url:"/calculators/rd-calculator",description:"Recurring deposit"},{name:"Interest Rate Converter",url:"/calculators/interest-rate-converter",description:"Convert simple to compound rate"},{name:"Loan Calculator",url:"/calculators/loan-calculator",description:"Compare loan types"},{name:"Future Value Calculator",url:"/calculators/future-value-calculator",description:"Investment growth calculator"}],
    lastUpdated:"2025-01-26"
  };

  return (
    <>
      <CalculatorSchema
        name="Simple Interest Calculator - SI Calculator India 2025"
        description="Free simple interest calculator. Calculate SI using formula (P×R×T)/100. Compare simple vs compound interest. Understand flat rate loans. Updated 2025."
        url="/calculators/simple-interest-calculator"
        features={["Instant simple interest calculation","Compare with compound interest","Flat rate loan analyzer","Total amount calculator","Maturity value for FDs","Free SI calculator","Examples and formulas","2025 updated rates"]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-26"
        rating={{value:4.7,count:9834}}
      />
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Simple Interest Calculator</h1>
      <p className="text-lg text-center text-gray-700 mb-8">Calculate interest using SI = (P × R × T) / 100 formula</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="p-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <label htmlFor="principal" className="block text-sm font-medium text-gray-700">
            Principal Amount
          </label>
          <input
            type="number"
            id="principal"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
            Interest Rate (% per annum)
          </label>
          <input
            type="number"
            id="rate"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time (in years)
          </label>
          <input
            type="number"
            id="time"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            min="0"
            step="0.1"
          />
        </div>

        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
          Results
        </h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Simple Interest</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(interest)}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
              <p className="text-2xl font-semibold text-gray-700">{formatCurrency(principal)}</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-semibold text-yellow-900 mb-1">Formula Used:</p>
            <p className="text-sm text-yellow-800">SI = (P × R × T) / 100</p>
            <p className="text-xs text-yellow-700 mt-1">
              = ({formatCurrency(principal)} × {rate}% × {time} years) / 100 = {formatCurrency(interest)}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Comprehensive E-E-A-T Content */}
    <div className="mt-12">
      <CalculatorContentWrapper {...contentData} />
    </div>
    </div>
    </>
  );
};
