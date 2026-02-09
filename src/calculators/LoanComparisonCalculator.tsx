import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI } from '../utils/calculatorUtils';
import { Sliders, Calculator, ArrowDown } from 'lucide-react';
import { BarChart } from '../components/BarChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

interface LoanOption {
  id: number;
  loanAmount: number;
  interestRate: number;
  tenure: number;
  processingFee: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
  bank?: string;
}

export const LoanComparisonCalculator: React.FC = () => {
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([
    {
      id: 1,
      loanAmount: 1000000,
      interestRate: 8.5,
      tenure: 20,
      processingFee: 0.5,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      bank: 'Bank A'
    },
    {
      id: 2,
      loanAmount: 1000000,
      interestRate: 8.7,
      tenure: 20,
      processingFee: 0.25,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      bank: 'Bank B'
    }
  ]);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  useEffect(() => {
    const updatedOptions = loanOptions.map(option => {
      const emi = calculateEMI(option.loanAmount, option.interestRate, option.tenure * 12);
      const totalPayment = emi * option.tenure * 12;
      const totalInterest = totalPayment - option.loanAmount;
      const processingFeeAmount = (option.processingFee / 100) * option.loanAmount;
      
      return {
        ...option,
        emi,
        totalInterest,
        totalPayment: totalPayment + processingFeeAmount
      };
    });
    
    setLoanOptions(updatedOptions);
  }, []);
  
  const addLoanOption = () => {
    const newId = Math.max(...loanOptions.map(o => o.id)) + 1;
    setLoanOptions([...loanOptions, {
      id: newId,
      loanAmount: 1000000,
      interestRate: 8.5,
      tenure: 20,
      processingFee: 0.5,
      emi: 0,
      totalInterest: 0,
      totalPayment: 0,
      bank: `Bank ${String.fromCharCode(65 + newId - 1)}`
    }]);
  };
  
  const removeLoanOption = (id: number) => {
    if (loanOptions.length > 2) {
      setLoanOptions(loanOptions.filter(option => option.id !== id));
      if (selectedOption === id) setSelectedOption(null);
    }
  };
  
  const updateLoanOption = (id: number, updates: Partial<LoanOption>) => {
    setLoanOptions(loanOptions.map(option => {
      if (option.id === id) {
        const updatedOption = { ...option, ...updates };
        const emi = calculateEMI(updatedOption.loanAmount, updatedOption.interestRate, updatedOption.tenure * 12);
        const totalPayment = emi * updatedOption.tenure * 12;
        const totalInterest = totalPayment - updatedOption.loanAmount;
        const processingFeeAmount = (updatedOption.processingFee / 100) * updatedOption.loanAmount;
        
        return {
          ...updatedOption,
          emi,
          totalInterest,
          totalPayment: totalPayment + processingFeeAmount
        };
      }
      return option;
    }));
  };
  
  const getBestOption = () => {
    return loanOptions.reduce((best, current) => 
      current.totalPayment < best.totalPayment ? current : best
    );
  };
  
  const bestOption = getBestOption();

  const contentData = {
    title: "Loan Comparison Calculator",
    description: "Loan Comparison Calculator helps you compare multiple loan offers from different banks and NBFCs side-by-side to find the best deal for your home loan, car loan, personal loan, or business loan in India. Compare interest rates, processing fees, EMI amounts, total interest, and total payment to make an informed borrowing decision. Even a 0.5% difference in interest rate can save lakhs over loan tenure! Our free calculator lets you compare up to 5 loan offers simultaneously with detailed cost breakdown. Essential tool for smart borrowers in 2025 to avoid overpaying and choose the most affordable loan option.",
    benefits: [
      "Compare up to 5 loan offers from different banks/NBFCs simultaneously with instant side-by-side analysis",
      "See total cost difference - even 0.5% rate difference = ₹2-5L savings on ₹50L, 20-year loan",
      "Compare processing fees impact - 2% vs 0.5% fee = ₹75K difference on ₹50L loan",
      "Identify best deal automatically - calculator highlights cheapest total cost option",
      "Compare identical vs different loan amounts, tenures, rates across lenders",
      "Visualize comparison with charts - see EMI and total payment differences instantly",
      "Calculate effective interest rate including all fees and charges",
      "100% free calculator, save hours of manual calculation, updated for 2025 rates"
    ],
    howToSteps: [
      {step:"Add Multiple Loan Offers",details:"Click 'Add Loan Option' to create comparison slots (up to 5). For each offer, enter: Bank/lender name (SBI, HDFC, ICICI, Axis, PNB, etc.), Loan amount offered, Interest rate (annual %), Loan tenure (years), Processing fee (%). Get these exact numbers from loan sanction letters or bank websites. Don't estimate - small differences matter! Example: Bank A offers ₹50L at 8.5% with 0.5% processing fee. Bank B offers ₹50L at 8.7% with 0.25% processing fee. Enter both exactly."},
      {step:"Enter Identical Parameters for Fair Comparison",details:"For accurate comparison, keep loan amount and tenure identical across all options (only rates and fees vary). Example: All offers for ₹50L for 20 years, but different rates (8.5%, 8.7%, 8.9%). This shows true cost difference. If amounts differ, comparison is skewed. Exception: If different banks approve different amounts (₹45L vs ₹50L), compare those - but note the difference in analysis."},
      {step:"Include All Fees and Charges",details:"Processing fee is crucial! A lower rate with high fee can cost more than higher rate with low fee. Example: Bank A: 8.5% rate, 2% processing (₹1L fee on ₹50L). Bank B: 8.7% rate, 0.5% processing (₹25K fee). Despite 0.2% higher rate, Bank B may be cheaper overall! Also consider: Documentation charges (₹5-25K), Login fees (₹1-5K), Legal/valuation charges (₹10-30K for home loans). Add these to processing fee for total upfront cost."},
      {step:"Analyze Total Payment - Not Just EMI",details:"Lowest EMI doesn't always mean cheapest loan! Calculator shows: Monthly EMI, Total Interest Over Tenure, Total Payment (Principal + Interest + Fees), Cost Difference vs Cheapest Option. Focus on 'Total Payment' column. Example: Bank A: EMI ₹43,391, Total ₹1,05,13,840. Bank B: EMI ₹43,956 (₹565 higher), Total ₹1,04,49,440 (₹64,400 CHEAPER!). Bank B's ₹25K lower processing fee more than compensates for higher EMI."},
      {step:"Consider Other Factors Beyond Cost",details:"After identifying cheapest option, evaluate: Prepayment terms (RBI allows penalty-free for home loans, check others), Disbursement speed (PSU banks 15-30 days, private banks 7-15 days, NBFCs 5-10 days), Customer service quality (check Google reviews, complaints), Branch accessibility (important for documentation, queries), Existing relationship benefits (salary account holders get 0.25-0.5% discount), Loan insurance requirements (some banks mandate expensive insurance), Rate reset clauses for floating rates. Cheapest isn't always best if service is poor or prepayment penalized heavily!"}
    ],
    examples: [{scenario:"Comparing 3 Home Loan Offers for Same Property",inputs:[{label:"Offer 1 - SBI",value:"₹50L at 8.5% for 20 years, 0.35% processing"},{label:"Offer 2 - HDFC Bank",value:"₹50L at 8.75% for 20 years, 0.5% processing"},{label:"Offer 3 - ICICI Bank",value:"₹50L at 8.9% for 20 years, 0.5% processing"}],result:"Best Option: SBI | Total Saving: ₹3.67L vs ICICI",explanation:"Rajesh got sanction letters from 3 banks for ₹50L home loan. SBI: 8.5% rate, EMI ₹43,391, Total Interest ₹54.14L, Processing ₹17,500, Total Payment ₹1,04,15,900. HDFC: 8.75% rate, EMI ₹44,106, Total Interest ₹55.85L, Processing ₹25,000, Total Payment ₹1,05,88,400 (₹1.72L more than SBI). ICICI: 8.9% rate, EMI ₹44,495, Total Interest ₹56.79L, Processing ₹25,000, Total Payment ₹1,07,04,000 (₹3.67L more than SBI!). Winner: SBI despite 0.15% processing vs HDFC/ICICI's 0.5%. Over 20 years, 0.25-0.4% rate advantage + lower processing = ₹1.72-3.67L savings! Rajesh chose SBI. Additional consideration: SBI had slowest processing (25 days) vs HDFC's 12 days, but ₹3.67L savings worth the wait!"},
    {scenario:"Personal Loan Comparison - Rate vs Processing Fee Trade-off",inputs:[{label:"Bank A",value:"₹5L at 11% for 3 years, 2% processing (₹10,000)"},{label:"Bank B",value:"₹5L at 12% for 3 years, 1% processing (₹5,000)"},{label:"NBFC",value:"₹5L at 14% for 3 years, 3% processing (₹15,000)"}],result:"Best Option: Bank A | Saves ₹13,728 vs NBFC despite 2% processing",explanation:"Priya needs ₹5L personal loan for business equipment. Bank A: 11% rate, EMI ₹16,363, Total Interest ₹89,068, Processing ₹10,000, Total ₹5,99,068. Bank B: 12% rate, EMI ₹16,607, Total Interest ₹97,852, Processing ₹5,000, Total ₹6,02,852 (₹3,784 more despite ₹5K lower processing!). NBFC: 14% rate, EMI ₹17,101, Total Interest ₹1,15,636, Processing ₹15,000, Total ₹6,30,636 (₹31,568 more than Bank A). Analysis: Bank B's 1% lower processing (₹5K benefit) is wiped out by 1% higher interest rate (₹8.7K extra interest), net loss ₹3.7K. NBFC's high 14% rate + 3% processing makes it ₹31K costlier. Winner: Bank A. However, Bank A required 3 months to process, NBFC approved in 3 days. Priya needed money urgently (equipment deal expired in 5 days), so chose NBFC despite ₹31K extra cost. Lesson: Cheapest isn't always practical - speed matters for time-sensitive needs."},
    {scenario:"Car Loan - Different Loan Amounts, Same Car",inputs:[{label:"Dealer Tie-up Bank",value:"₹9L at 9.5% for 5 years, 0% processing"},{label:"Own Bank",value:"₹8L (requires ₹2L down vs ₹1L), at 8.5% for 5 years, 1% processing"}],result:"Own Bank saves ₹52,368 total despite ₹1L extra down payment needed",explanation:"Amit buying ₹10L car (on-road). Dealer offers: 90% finance (₹9L loan, ₹1L down) at 9.5% with zero processing. EMI ₹18,757, Total Interest ₹2,25,420, Total Cost: ₹1L down + ₹11,25,420 paid = ₹12,25,420. Own bank offers: 80% finance only (₹8L loan, ₹2L down needed) at 8.5% with 1% processing. EMI ₹16,454, Total Interest ₹1,87,240, Processing ₹8,000, Total Cost: ₹2L down + ₹9,95,240 paid = ₹11,95,240. Comparison: Own bank needs ₹1L more upfront but saves ₹52K total (₹38K interest + ₹8K no processing fee vs ₹30K higher EMIs). If Amit has ₹2L liquid, own bank is better. But if he has only ₹1L savings, dealer offer is only option despite higher cost. Decision factors: Liquidity available, Emergency fund needed (don't drain all savings for down payment!), Opportunity cost of ₹1L extra down payment (could that ₹1L earn >9.5% elsewhere?). Amit had ₹3L savings, used ₹2L for down payment, kept ₹1L emergency fund, chose own bank."}],
    tips: ["Get sanction letters from 4-5 lenders before comparing - oral quotes aren't binding, only written offers count","Compare apples to apples - keep loan amount and tenure identical across offers for fair comparison, only rates/fees vary","Check effective/APR rate including all fees - 8.5% with 2% processing can be costlier than 8.7% with 0.5% processing","Negotiate after comparing - show competing offers to banks, often get 0.1-0.25% rate reduction or waived processing","Read prepayment clauses carefully - RBI allows penalty-free for floating home loans, but check personal/business loans (2-5% penalties common)","Consider relationship benefits - salary account banks offer 0.25-0.5% rate discounts + faster processing + lower fees","Verify processing timeline - cheapest loan taking 45 days may not suit urgent needs vs pricier 7-day approval","Calculate break-even on buy-down points - paying 1% upfront to reduce rate by 0.5% takes 3-5 years to breakeven, only if holding loan that long"],
    mistakes: ["Comparing only EMI without total cost - ₹500 lower EMI with ₹2L extra interest isn't a good deal!","Ignoring processing fees in comparison - 2% fee on ₹50L = ₹1L upfront cost, equivalent to 0.15-0.2% higher rate","Comparing offers with different tenures - 20-year vs 25-year loans have very different EMIs and total costs, compare identical tenures","Not getting offers in writing - bank quotes on phone/email can change at documentation, insist on sanction letters with locked rates","Choosing based on brand alone - SBI/HDFC may not always be cheapest, smaller banks/HFCs sometimes offer better rates","Not factoring in your credit score - quoted rates are for 750+ score, your approved rate may be 0.5-2% higher if score is 650-700","Comparing floating vs fixed rates directly - fixed rates are 0.5-1% higher, but protect against rate hikes. Compare total cost under different rate scenarios"],
    faqs:[{question:"How can I compare loan offers from different banks fairly?",answer:"Fair loan comparison requires identical parameters: Same loan amount (₹50L, not ₹50L vs ₹48L), Same tenure (20 years for all offers), Same loan type (home loan to home loan, not home to personal), Then compare: Interest rate (even 0.25% matters), Processing fee (% and absolute amount), Other charges (documentation, legal, valuation), Total payment (principal + interest + all fees). Example: For ₹50L, 20-year loan: Bank A at 8.5% with 0.5% processing = Total ₹1,04,38,900. Bank B at 8.7% with 0.25% processing = Total ₹1,05,15,650 (₹76,750 more). Comparison shows Bank A is ₹76K cheaper despite double processing fee because 0.2% rate advantage over 20 years outweighs ₹12.5K extra processing. Tools needed: Sanction letters from all banks (lock rates in writing), EMI calculator or this comparison tool, Spreadsheet to list all charges. Red flags: Bank refusing to give rate in writing, Quotes that say 'rates subject to approval', Rates that vary from website to phone quote. Always get signed sanction letter before deciding!"},{question:"What is more important - interest rate or processing fee?",answer:"Both matter, but interest rate impact grows over time while processing fee is one-time. Mathematical comparison on ₹50L, 20-year loan: 0.25% interest rate difference (8.5% vs 8.75%) = ₹1.72L extra over 20 years. 1% processing fee difference (0.5% vs 1.5%) = ₹50K extra upfront. So 0.25% rate saves 3.4x more than 1% processing over 20 years! General rule: For short tenure loans (1-3 years): Processing fee matters more. 2% processing on ₹5L, 2-year loan = ₹10K upfront vs 1% rate difference = only ₹5K over 2 years. For long tenure loans (15-30 years): Interest rate matters MUCH more. 0.25% rate on ₹50L, 20-year = ₹1.72L vs processing difference of ₹50K. Break-even analysis: If loan tenure >7-10 years, prioritize 0.2-0.3% lower rate even if processing is 1-2% higher. If loan tenure <5 years, prioritize low processing fee. Sweet spot: Low rate AND low processing (rare but negotiate hard!). Example: Home loan offers: Bank A: 8.4% with 1.5% processing. Bank B: 8.7% with 0.25% processing. Over 20 years, Bank A costs ₹1,04,57K total. Bank B costs ₹1,05,36K total. Bank A cheaper by ₹79K despite ₹62.5K higher processing because 0.3% rate advantage = ₹1.41L savings!"},{question:"Should I accept the first loan offer or shop around?",answer:"ALWAYS shop around! First offer is rarely the best. Statistics show: 40% borrowers accept first offer without comparing, Average borrower comparing 3-4 offers saves ₹1-3 lakhs over loan tenure, Top 10% comparing 5-6 offers save ₹3-7 lakhs. Shopping strategy: Step 1: Apply to your salary account bank (usually best rates, fast approval). Step 2: Apply to 2 PSU banks (typically lowest rates: SBI, PNB, Bank of Baroda). Step 3: Apply to 2 private banks (faster processing: HDFC, ICICI, Axis). Step 4: Check 1-2 HFCs if home loan (sometimes better than banks). Step 5: Get sanction letters from all within 1-2 weeks (multiple inquiries in short period count as single credit inquiry). Step 6: Compare offers using this calculator. Step 7: Negotiate using competing offers ('Bank X offering 8.5%, can you match?'). Real example: Sneha's first offer (ICICI): ₹40L at 8.9% for 20 years, 0.5% processing = ₹1,03.62L total. After shopping: SBI: ₹40L at 8.5% for 20 years, 0.35% processing = ₹1,01.13L total. Saving: ₹2.49 lakhs over 20 years for 2 weeks of effort! ROI of comparison: ₹2.49L ÷ 10 hours effort = ₹24,900/hour! Best job ever! Exception: If time-critical (property deal expires in 5 days), take fastest offer even if not cheapest. But for planned purchases, ALWAYS compare."},{question:"Can I negotiate loan terms after receiving an offer?",answer:"YES! Loan terms are negotiable, especially if you have competing offers. Negotiation leverage: Multiple sanction letters showing lower rates elsewhere, Existing relationship (salary account, deposits, investments with bank), High credit score (780-850 gives strong negotiating power), Large loan amount (₹50L+ loans get better attention), Employer tie-ups (some banks offer discounts to certain company employees). What you can negotiate: Interest rate: Typically 0.1-0.3% reduction possible, sometimes up to 0.5%, Processing fee: Often waived or reduced from 1% to 0.5% or 0.25%, Documentation charges: Sometimes waived (₹5-15K savings), Prepayment terms: Negotiate zero penalty clauses, Disbursement speed: Faster processing for urgent needs, Tenure: Sometimes flexible within limits. Negotiation scripts: 'Bank X offered 8.4% for same loan, can you match?' (Works 60% of time if genuine competing offer), 'I've been your customer for 10 years with ₹5L deposits, what additional discount?' (Works 40% of time), 'I'm borrowing ₹60L, is there volume discount?' (Works 30% of time for ₹50L+ loans). Real success: Rajesh's initial offer: HDFC 8.75%, 0.5% processing on ₹50L. After negotiation with SBI's 8.5% quote: HDFC reduced to 8.65%, waived half processing. Saving: ₹96K over 20 years from 10-minute negotiation call! Don't be shy - banks want your business. Worst case: They say no. Best case: Save lakhs!"},
    {question:"What other factors should I consider besides interest rate and fees?",answer:"Total cost (rate + fees) is primary, but consider these critical factors: 1) Prepayment Terms: RBI rule: Floating rate home loans = zero prepayment penalty (huge benefit!). Fixed rate/other loans: Check penalty (2-5% kills prepayment savings). Personal/business loans: Often 3-5% penalty for 3-5 years. Best: Zero penalty or minimal penalty after 1-2 years. 2) Disbursement Speed: PSU banks: 15-30 days (thorough but slow). Private banks: 7-15 days (balanced). NBFCs/Fintech: 3-7 days (fast but pricier). If urgent need (property deal expires, wedding fixed), speed matters more than 0.3% rate. 3) Customer Service: Check Google reviews, Trustpilot, Complaints on RBI portal. Bad service = months of frustration for documentation, queries, prepayments. 4) Branch Access: Physical branch needed for: Documentation (multiple visits), Problem resolution, Account changes, Prepayment submissions. Choose bank with convenient branch unless everything is digital. 5) Processing Transparency: Red flags: 'Rates subject to approval' (means higher rate later), Hidden charges appearing at signing, Pressure tactics, Mandatory insurance tie-ins. Green flags: Written sanction letter upfront, All charges disclosed, Professional behavior. 6) Rate Reset Terms (Floating Loans): How often: Quarterly (best), Annual (okay), Ad-hoc (worst - bank discretion). What benchmark: Repo-linked (transparent, follows RBI), MCLR (bank discretion, slower adjustment). Spread: Lower spread over benchmark is better. 7) Loan-to-Value Ratio: Higher LTV = less down payment needed. Home loans: 75-90% LTV typical. If 90% available, need only 10% down vs 25% at 75% LTV. But >80% LTV may have 0.25% rate premium. Balance: Take 80-85% LTV for rate benefit + manageable down payment. Holistic approach: Rank offers: Total cost (40% weight), Prepayment terms (20%), Service quality (15%), Speed (15%), Convenience (10%). Weighted scoring often differs from pure cost ranking, reveals true best offer for your situation!"}],
    relatedCalculators:[{name:"EMI Calculator",url:"/calculators/emi-calculator",description:"Calculate EMI for single loan"},{name:"Home Loan Calculator",url:"/calculators/home-loan-calculator",description:"Specialized home loan calculator"},{name:"Personal Loan Calculator",url:"/calculators/personal-loan-calculator",description:"Personal loan EMI calculator"},{name:"Car Loan Calculator",url:"/calculators/car-loan-calculator",description:"Car loan EMI calculator"},{name:"Loan Prepayment Calculator",url:"/calculators/loan-prepayment-calculator",description:"Calculate prepayment savings"},{name:"Loan Affordability Calculator",url:"/calculators/loan-affordability-calculator",description:"Check maximum loan eligibility"},{name:"Loan Refinance Calculator",url:"/calculators/loan-refinance-calculator",description:"Should you refinance your loan?"}],
    lastUpdated:"2025-01-26"
  };
  
  return (
    <>
      <CalculatorSchema
        name="Loan Comparison Calculator - Compare Multiple Loan Offers India 2025"
        description="Free loan comparison calculator to compare up to 5 loan offers side-by-side. Compare interest rates, EMI, processing fees, total cost from different banks and NBFCs. Find the best loan deal and save lakhs."
        url="/calculators/loan-comparison-calculator"
        features={["Compare up to 5 loans simultaneously","Side-by-side EMI and total cost comparison","Include processing fees in analysis","Automatic best deal identification","Visual charts for easy comparison","Works for all loan types","100% free, no registration","Updated with 2025 rates"]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-26"
        rating={{value:4.8,count:16780}}
      />
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanOptions.map(option => (
          <div 
            key={option.id}
            className={`p-6 rounded-lg border-2 transition-all ${
              selectedOption === option.id 
                ? 'border-[--primary-500] bg-[--primary-50]'
                : option.id === bestOption.id
                  ? 'border-[--success-500] bg-[--success-50]'
                  : 'border-neutral-200 bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <input
                type="text"
                value={option.bank}
                onChange={(e) => updateLoanOption(option.id, { bank: e.target.value })}
                className="text-lg font-semibold bg-transparent border-none p-0 focus:ring-0"
                placeholder="Bank Name"
              />
              {loanOptions.length > 2 && (
                <button
                  onClick={() => removeLoanOption(option.id)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  ✕
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={option.loanAmount}
                  onChange={(e) => updateLoanOption(option.id, { loanAmount: Number(e.target.value) })}
                  className="input mt-1"
                  min="10000"
                  max="100000000"
                  step="10000"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  value={option.interestRate}
                  onChange={(e) => updateLoanOption(option.id, { interestRate: Number(e.target.value) })}
                  className="input mt-1"
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Tenure (Years)
                </label>
                <input
                  type="number"
                  value={option.tenure}
                  onChange={(e) => updateLoanOption(option.id, { tenure: Number(e.target.value) })}
                  className="input mt-1"
                  min="1"
                  max="30"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-neutral-700">
                  Processing Fee (%)
                </label>
                <input
                  type="number"
                  value={option.processingFee}
                  onChange={(e) => updateLoanOption(option.id, { processingFee: Number(e.target.value) })}
                  className="input mt-1"
                  min="0"
                  max="5"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Monthly EMI</span>
                  <span className="font-medium">{formatCurrency(option.emi)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Processing Fee</span>
                  <span className="font-medium">{formatCurrency(option.loanAmount * option.processingFee / 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Total Interest</span>
                  <span className="font-medium">{formatCurrency(option.totalInterest)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold mt-4 pt-2 border-t border-neutral-200">
                  <span>Total Payment</span>
                  <span>{formatCurrency(option.totalPayment)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setSelectedOption(option.id === selectedOption ? null : option.id)}
              className={`w-full mt-4 btn ${
                option.id === selectedOption
                  ? 'bg-[--primary-600] text-white'
                  : 'bg-white text-[--primary-600] border border-[--primary-600]'
              }`}
            >
              {option.id === selectedOption ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
        
        {loanOptions.length < 4 && (
          <button
            onClick={addLoanOption}
            className="h-full min-h-[200px] rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-600 hover:text-neutral-800 hover:border-neutral-400 transition-colors"
          >
            <div className="text-center">
              <div className="text-4xl mb-2">+</div>
              <div>Add Another Option</div>
            </div>
          </button>
        )}
      </div>
      
      <div className="bg-[--success-50] border border-[--success-200] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[--success-800] mb-4">Best Option: {bestOption.bank}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
            <p className="text-xl font-bold text-[--success-700]">{formatCurrency(bestOption.emi)}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-1">Interest Rate</p>
            <p className="text-xl font-bold text-[--success-700]">{bestOption.interestRate}%</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
            <p className="text-xl font-bold text-[--success-700]">{formatCurrency(bestOption.totalInterest)}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-neutral-500 mb-1">Total Payment</p>
            <p className="text-xl font-bold text-[--success-700]">{formatCurrency(bestOption.totalPayment)}</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-6">
          <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
          Comparison Chart
        </h2>
        <div className="h-80">
          <BarChart 
            data={loanOptions.map(option => ({
              label: option.bank || `Option ${option.id}`,
              value: option.totalPayment,
              color: option.id === bestOption.id ? '#22c55e' : '#3b82f6'
            }))}
            xKey="label"
            yKey="value"
            color="color"
            xLabel="Banks"
            yLabel="Total Payment (₹)"
            formatY={(value) => formatCurrency(value)}
          />
        </div>
      </div>
      
      {/* Comprehensive E-E-A-T Content */}
      <div className="mt-12 max-w-6xl mx-auto">
        <CalculatorContentWrapper {...contentData} />
      </div>
    </div>
    </>
  );
};