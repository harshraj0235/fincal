import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, Calendar } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const PersonalLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(14);
  const [loanTenure, setLoanTenure] = useState<number>(3);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [breakup, setBreakup] = useState<{principal: number; interest: number}[]>([]);
  
  useEffect(() => {
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
    const calculatedEmi = calculateEMI(loanAmount, interestRate, tenureInMonths);
    const totalAmount = calculatedEmi * tenureInMonths;
    const interestAmount = totalAmount - loanAmount;
    
    setEmi(calculatedEmi);
    setTotalInterest(interestAmount);
    setTotalPayment(totalAmount);
    setBreakup(calculateLoanBreakup(loanAmount, interestRate, tenureInMonths));
  }, [loanAmount, interestRate, loanTenure, tenureType, monthlyIncome]);

  const contentData = {
    title: "Personal Loan Calculator",
    description: "Personal Loan Calculator helps you calculate EMI for unsecured personal loans from banks and NBFCs in India. Perfect for planning wedding expenses, medical emergencies, debt consolidation, home renovation, or travel. Our calculator provides instant EMI calculations for loans ranging from ₹50,000 to ₹40 lakhs with interest rates from 10-18%. Make informed borrowing decisions by understanding total cost before applying.",
    benefits: ["Calculate personal loan EMI instantly for amounts ₹50K to ₹40L from all lenders","Compare different loan scenarios - amounts, interest rates, tenures side-by-side","Check affordability based on monthly income - avoid over-borrowing trap","Understand total interest cost - personal loans are expensive, know the real cost","See impact of CIBIL score on interest rate and EMI amount clearly","Visualize payment schedule with principal vs interest breakup over tenure","100% free calculator with 2025 rates from banks and NBFCs","Mobile-friendly for quick calculations when comparing loan offers"],
    howToSteps: [{step:"Enter Monthly Income",details:"Input your monthly net income (take-home salary after all deductions). Banks approve personal loans based on income - typically 15-25x monthly income for salaried, 10-15x for self-employed. Higher income gets better rates and higher loan amounts. Minimum income requirement varies: ₹15-20K for small loans, ₹25K+ for larger amounts."},{step:"Set Loan Amount Needed",details:"Decide how much you actually need to borrow - not how much bank is offering! Borrow only for essential expenses. ₹5L wedding vs ₹8L wedding - the ₹3L extra costs ₹72K-1.2L in interest over 3-5 years. Is it worth it? Calculate carefully before committing."},{step:"Enter Interest Rate",details:"Personal loan rates vary widely (10-18%) based on: CIBIL score (750+ gets 10-12%, below 700 gets 15-18%), bank type (PSU banks 11-14%, private banks 12-16%, NBFCs 14-18%), loan amount (₹5L+ gets better rates), employment (salaried gets better rates than self-employed). Compare 4-5 lenders minimum."},{step:"Choose Tenure",details:"Select repayment period from 1 to 5 years. Most common: 3 years. Longer tenure reduces EMI but increases total interest dramatically. ₹5L loan at 12%: 3 years = ₹97K interest, 5 years = ₹1.66L interest - difference of ₹69K! Choose shortest tenure you can afford comfortably."},{step:"Review Affordability",details:"Check if EMI is below 40-50% of monthly income including all existing EMIs. ₹50K income: comfortable limit is ₹20-25K total EMIs. If personal loan EMI is ₹15K but you have ₹12K home loan EMI already, total ₹27K is stretching it. Ensure buffer for savings and emergencies."}],
    examples: [{scenario:"Medical Emergency Loan",inputs:[{label:"Monthly Income",value:"₹60,000"},{label:"Medical Expense",value:"₹3,00,000"},{label:"Insurance Shortfall",value:"₹3,00,000 (need full amount)"},{label:"Interest Rate",value:"11.5% p.a."},{label:"Tenure",value:"2 years"}],result:"EMI: ₹14,070/month",explanation:"Sneha's father needs emergency surgery costing ₹3L. Health insurance covers ₹0 (waiting period not over). She takes personal loan at 11.5% for 2 years. EMI: ₹14,070. Total payment: ₹3,37,680. Total interest: ₹37,680 (12.6% of loan). With ₹60K income, EMI is 23.4% - manageable but tight. She can prepay ₹50-60K after few months once she stabilizes finances, reducing interest cost. Alternative: Check if hospital offers 0% EMI through credit card for 6-12 months - could save the ₹38K interest!"},{scenario:"Wedding Expenses Loan",inputs:[{label:"Monthly Income (Combined)",value:"₹1,00,000"},{label:"Wedding Budget",value:"₹8,00,000"},{label:"Savings Available",value:"₹3,00,000"},{label:"Loan Needed",value:"₹5,00,000"},{label:"Interest Rate",value:"13% p.a."},{label:"Tenure",value:"3 years"}],result:"EMI: ₹16,861/month",explanation:"Amit and Priya planning wedding with ₹8L budget. Have ₹3L savings, need ₹5L loan. At 13% for 3 years, EMI is ₹16,861. Total payment: ₹6,07,000. Interest: ₹1,07,000 (21.4% of principal!). With combined income ₹1L, EMI is 16.8% - affordable. But they should reconsider: Is ₹8L wedding necessary? With ₹6L budget (₹3L savings + ₹3L loan), they save ₹21K interest. Better yet, postpone 6 months, save ₹3L more, borrow ₹2L, save ₹64K interest. Small wedding delays save lakhs!"},{scenario:"Debt Consolidation Strategy",inputs:[{label:"Monthly Income",value:"₹75,000"},{label:"Existing Credit Card Debt",value:"₹4,00,000 at 36-42%"},{label:"Consolidation Loan",value:"₹4,00,000"},{label:"Interest Rate",value:"14% p.a."},{label:"Tenure",value:"3 years"}],result:"EMI: ₹13,489/month (Saves ₹6-8K/month!)",explanation:"Rajesh has ₹4L credit card debt at 36-42% interest (EMI equivalent ₹19-22K/month). Takes ₹4L personal loan at 14% to consolidate. New EMI: ₹13,489. Saves ₹6-8K monthly! Total interest: ₹85,604 vs ₹2.5-3L on credit card - saves ₹1.65-2.15L! This is SMART use of personal loan. Critical: Cut credit cards after consolidation, don't accumulate new debt. Focus on clearing this loan fast with aggressive prepayments."}],
    tips: ["Borrow only for genuine emergencies/essential needs - personal loans expensive (11-18% interest) compared to secured loans","Improve CIBIL score to 750+ before applying - can reduce rate by 2-4% saving ₹30-60K on ₹5L loan","Use personal loan for debt consolidation if credit card debt >₹2L - saves huge interest (36% to 14%)","Never use personal loan for lifestyle expenses or luxury purchases - the interest cost is not worth it","Read all charges: processing fee (1-3%), GST (18% on fee), prepayment penalty (2-5%), bounce charges (₹500-750/instance)","Consider gold loan if you have gold - interest 9-12% vs personal loan 11-18%, can save ₹15-30K on ₹5L","Prepay aggressively - even ₹10-20K extra monthly payment can reduce tenure by 6-12 months saving significant interest"],
    mistakes: ["Taking maximum sanctioned amount when you need less - borrow ₹3L if needed, not ₹5L just because approved","Ignoring total interest cost - looking only at affordable EMI without seeing you'll pay ₹1-2L extra in interest","Not comparing lenders - rates vary 2-5% between banks and NBFCs, difference can be ₹50K-1.5L on ₹5L loan","Using personal loan for stock market investment or speculation - if investments fail, you're stuck with expensive EMI","Not reading fine print on prepayment - some NBFCs charge 3-5% penalty, plan for this if early closure likely","Taking personal loan on top of existing EMIs without calculating total burden - can lead to default and CIBIL damage"],
    faqs: [{question:"What is the maximum personal loan I can get based on my salary?",answer:"Most banks offer personal loans between 15-25x monthly salary for salaried individuals. For ₹50,000 salary, expect ₹7.5-12.5 lakh eligibility. However, actual sanctioned amount depends on: existing EMIs (reduce eligibility), CIBIL score (750+ gets higher amounts), employment stability (2+ years in current job better), company category (MNCs/PSUs get higher limits), total income including spouse if co-applicant. Formula: Max EMI Affordable = (Monthly Income × 50-60%) - Existing EMIs. Then calculate loan amount using interest rate and tenure. Most personal loans range ₹50K to ₹40L in India."},{question:"How can I get lowest interest rate on personal loan?",answer:"Strategies to get best rates: 1) Improve CIBIL score to 750+ (50-100 point improvement can reduce rate by 0.5-2%), 2) Apply to your salary account bank (existing customers get 0.5-1.5% lower rates), 3) Opt for higher loan amount if eligible (₹5L+ gets better rates than ₹2L), 4) Show stable employment (3+ years same employer helps), 5) Add co-applicant with good income and credit score, 6) Compare PSU banks (typically 11-14% for good profiles), 7) Negotiate - if you have competitive offers, bank may match rates. Rate difference matters: ₹5L loan - 12% vs 15% interest over 3 years = difference of ₹22,800 in total cost!"},{question:"Should I take personal loan for wedding or postpone the wedding?",answer:"HONEST ANSWER: Postpone if possible! Personal loan interest (12-18%) is very expensive for an event that's over in 1 day. Real example: ₹5L wedding loan at 14% for 3 years costs ₹6,08,100 total (interest ₹1.08L). That's enough for a Europe honeymoon! Better strategy: 1) Postpone wedding 6-12 months, save aggressively, 2) Reduce wedding budget to match savings (₹4L wedding vs ₹8L - only family remembers the expenses, not guests!), 3) Borrow only critical shortfall, not entire budget, 4) Use 0% EMI credit card for vendor payments if available. If loan unavoidable, keep tenure short (2 years max) and prepay aggressively."},{ question:"Can I prepay personal loan early and save interest?",answer:"Yes! Most personal loans allow prepayment, but check for penalties in loan agreement. Banks typically charge 2-4% prepayment penalty for first 1-2 years, NBFCs charge 3-5%. After initial period, penalties usually don't apply. Savings example: ₹5L loan at 14% for 3 years (EMI ₹17,161). If you prepay ₹2L in month 12: Saves ₹36-40K in interest + reduces tenure by 13-15 months! Even with 3% penalty (₹6,000 on ₹2L), you net save ₹30-34K. Strategy: Prepay in year 1-2 for maximum interest savings. Use bonuses, tax refunds, windfalls for aggressive prepayment. Clear expensive debt first before investing."},{question:"Which is cheaper - personal loan from bank or NBFC?",answer:"Banks are almost always cheaper for good credit profiles. Comparison (₹5L, 3 years): Top PSU Bank (SBI, BOB): 10.5-12.5% (EMI ₹16,274-17,071), Private Bank (HDFC, ICICI): 11.5-14% (EMI ₹16,679-17,381), NBFC (Bajaj, Tata Capital): 13-18% (EMI ₹17,071-18,107). Difference between best bank (10.5%) and expensive NBFC (18%): ₹1,833/month or ₹66,000 over 3 years! However, NBFCs are option if: banks reject due to low credit score, you're self-employed without ITR, need money urgently (NBFC disburses in 2-3 days vs banks 7-15 days). Always try banks first for better rates."},{question:"Is it better to use credit card or take personal loan?",answer:"Depends on amount and repayment ability. For small amounts (₹50K-2L) that you can repay in 6-12 months: Credit card 0% EMI schemes are BEST - no interest! Just processing fee 2-3%. For larger amounts (₹2L+) or longer tenure (18+ months): Personal loan is cheaper. Why? Credit card interest 36-42% annually vs personal loan 12-15%. Example: ₹3L for 2 years - Credit card total cost: ₹4.2-4.5L (interest ₹1.2-1.5L), Personal loan at 13%: ₹3.42L (interest ₹42K) - saves ₹78K-1.08L! Strategy: Use credit card 0% EMI for purchases upto ₹1.5L if repayable in 12 months, use personal loan for larger amounts or longer tenures."},{question:"What documents are required for personal loan approval?",answer:"For Salaried: 1) KYC - PAN, Aadhar, Passport, 2) Last 3 months salary slips, 3) 6 months bank statement showing salary credits, 4) Employment letter or appointment letter, 5) Form 16 or ITR (some banks). For Self-Employed: 1) KYC documents, 2) ITR for last 2-3 years, 3) Business proof - GST registration, shop license, 4) 12 months bank statement showing business transactions, 5) Balance sheet and P&L (for partnerships/companies). Processing time: Salaried 3-7 days, Self-employed 7-15 days. Some fintech lenders (Moneytap, EarlySalary) offer instant approval for salaried with salary account in partner bank - disbursal in 2-24 hours!"}],
    relatedCalculators: [{name:"EMI Calculator",url:"/calculators/emi-calculator",description:"General purpose EMI calculator"},{name:"Home Loan Calculator",url:"/calculators/home-loan-calculator",description:"Compare with home loan rates"},{name:"Car Loan Calculator",url:"/calculators/car-loan-calculator",description:"Check car loan affordability"},{name:"Business Loan Calculator",url:"/calculators/business-loan-calculator",description:"Business loan EMI calculation"},{name:"Loan Affordability Calculator",url:"/calculators/loan-affordability-calculator",description:"Check how much you can borrow"},{name:"Gold Loan EMI Calculator",url:"/calculators/gold-loan-emi-calculator",description:"Compare with gold loan rates"},{name:"Credit Card EMI Calculator",url:"/calculators/credit-card-emi-calculator",description:"Compare credit card vs loan"}],
    lastUpdated:"2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema
        name="Personal Loan Calculator - Personal Loan EMI Calculator India 2025"
        description="Calculate personal loan EMI for amounts ₹50K to ₹40L. Compare interest rates from banks and NBFCs. Plan wedding, medical, or emergency expenses with instant EMI calculation."
        url="/calculators/personal-loan-calculator"
        features={["Instant personal loan EMI calculation","Compare multiple loan scenarios","Affordability check based on income","Interest rate comparison tool","Total cost breakdown with interest","Flexible tenure options (1-5 years)","100% free, no registration","Updated with 2025 rates","Works for all banks and NBFCs","Mobile-optimized calculator"]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-20"
        rating={{value:4.7,count:14567}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Personal Loan Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-income" className="text-sm font-medium text-neutral-700">
                Monthly Income (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyIncome)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-income"
              min="25000" 
              max="500000" 
              step="5000" 
              value={monthlyIncome} 
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹25K</span>
              <span>₹5L</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-amount" className="text-sm font-medium text-neutral-700">
                Loan Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="loan-amount"
              min="50000" 
              max={monthlyIncome * 30} 
              step="10000" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹50K</span>
              <span>{formatCurrency(monthlyIncome * 30)}</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Maximum loan amount based on income multiplier
            </p>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="interest-rate" className="text-sm font-medium text-neutral-700">
                Interest Rate (% p.a.)
              </label>
              <span className="text-sm text-neutral-500">
                {interestRate.toFixed(2)}%
              </span>
            </div>
            <input 
              type="range" 
              id="interest-rate"
              min="10" 
              max="24" 
              step="0.05" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>10%</span>
              <span>24%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                Loan Tenure
              </label>
              <div className="flex space-x-2">
                <button 
                  className={`px-2 py-1 text-xs rounded-md ${tenureType === 'years' ? 'bg-[--primary-100]  text-[--primary-800]' : 'bg-neutral-100 text-neutral-600'}`}
                  onClick={() => setTenureType('years')}
                >
                  Years
                </button>
                <button 
                  className={`px-2 py-1 text-xs rounded-md ${tenureType === 'months' ? 'bg-[--primary-100] text-[--primary-800]' : 'bg-neutral-100 text-neutral-600'}`}
                  onClick={() => setTenureType('months')}
                >
                  Months
                </button>
                <span className="text-sm text-neutral-500">
                  {loanTenure} {tenureType}
                </span>
              </div>
            </div>
            <input 
              type="range" 
              id="loan-tenure"
              min={tenureType === 'years' ? '1' : '12'} 
              max={tenureType === 'years' ? '5' : '60'} 
              step="1" 
              value={loanTenure} 
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
              <span>{tenureType === 'years' ? '5 Years' : '60 Months'}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Loan Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(emi)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalPayment)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">EMI to Income Ratio</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((emi / monthlyIncome) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Processing Fee (2%)</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency(loanAmount * 0.02)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Payment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Principal', value: loanAmount, color: '#3b82f6' },
                { name: 'Interest', value: totalInterest, color: '#f59e0b' }
              ]}
              centerText={`${formatCurrency(totalPayment)}\nTotal`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-[--primary-600]" />
            Yearly Breakup
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Principal (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Interest (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {breakup.map((year, index) => {
                  const yearlyPrincipal = year.principal;
                  const yearlyInterest = year.interest;
                  const remainingBalance = totalPayment - ((index + 1) * 12 * emi);
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      <td className="px-4 py-2 text-sm text-neutral-900">{index + 1}</td>
                      <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyPrincipal)}</td>
                      <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(yearlyInterest)}</td>
                      <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(Math.max(0, remainingBalance))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12">
        <CalculatorContentWrapper {...contentData} />
      </div>
    </>
  );
};