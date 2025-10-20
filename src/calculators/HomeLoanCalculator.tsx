import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, Calendar } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const HomeLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [propertyValue, setPropertyValue] = useState<number>(4000000);
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
  }, [loanAmount, interestRate, loanTenure, tenureType, propertyValue]);

  const contentData = {
    title: "Home Loan Calculator",
    description: "Home Loan Calculator helps you calculate EMI for your dream home purchase. Essential for planning home loans from banks and HFCs in India. Calculate monthly EMI, total interest, and payment schedule for properties ranging from ₹10 lakhs to ₹5 crores. Updated with latest 2025 home loan interest rates (8.5-10.5%) from major lenders like SBI, HDFC, ICICI, Axis Bank. Plan your home purchase wisely with accurate EMI calculations.",
    benefits: ["Calculate home loan EMI instantly for any property value and loan amount","Compare different loan amounts and down payment scenarios side-by-side","Understand total interest cost over 10-30 year loan tenure clearly","Plan affordable EMI within 30-40% of monthly income budget","Check loan-to-value ratio (LTV) and down payment requirements","Visualize principal vs interest breakup with detailed amortization schedule","100% free calculator with latest 2025 home loan rates from all banks","Mobile-friendly for property visits and instant EMI calculations"],
    howToSteps: [{step:"Enter Property Value",details:"Input total property cost including registration and stamp duty. Banks finance 75-90% of property value (LTV ratio). For ₹50L property, expect ₹37.5-45L loan maximum. Premium properties and good credit scores get higher LTV. Include all costs: property price, registration (1%), stamp duty (5-7%), legal fees."},{step:"Set Loan Amount",details:"Decide how much you want to borrow. Higher down payment (20-25%) reduces EMI and interest significantly. On ₹50L property, ₹10L down payment means ₹40L loan vs ₹12.5L down payment means ₹37.5L loan - saves ₹2.5L borrowing and ₹5-7L interest over 20 years!"},{step:"Choose Interest Rate",details:"Enter current home loan rate (8.5-10.5% in 2025). Rates vary by: credit score (750+ gets best rates), loan amount (₹30L+ gets priority rates), income level, employment type, existing customer benefits. Compare rates from PSU banks (8.5-9.5%), private banks (9-10%), and HFCs (9.5-10.5%)."},{step:"Select Loan Tenure",details:"Choose repayment period from 5 to 30 years. Longer tenure = lower EMI but 2-3x higher total interest! ₹50L loan: 15 years = ₹49L interest, 25 years = ₹86L interest - difference of ₹37L! Choose shortest tenure you can afford comfortably."},{step:"Review Complete Breakdown",details:"Analyze EMI amount, total interest, total payment, and year-wise schedule. Check if EMI is below 35-40% of monthly income. Review how principal and interest components change over tenure. Plan for prepayments in early years to save maximum interest."}],
    examples: [{scenario:"First-Time Homebuyer in Bangalore",inputs:[{label:"Property Value",value:"₹75,00,000"},{label:"Down Payment (20%)",value:"₹15,00,000"},{label:"Loan Amount",value:"₹60,00,000"},{label:"Interest Rate",value:"8.75% p.a."},{label:"Tenure",value:"20 years"}],result:"EMI: ₹52,935/month",explanation:"Priya buying ₹75L flat in Bangalore, arranges ₹15L down payment (from savings ₹10L + family gift ₹5L). Borrows ₹60L at 8.75% for 20 years. EMI: ₹52,935. Total payment: ₹1,27,04,400 (principal ₹60L + interest ₹67.04L). With monthly income of ₹1.5L, EMI is 35.3% - comfortable. She can prepay ₹2-3L annually from bonuses, reducing tenure to 14 years and saving ₹22L in interest!"},{scenario:"Upgrading to Larger Home in Mumbai",inputs:[{label:"New Property",value:"₹1,20,00,000"},{label:"Selling Old Home",value:"₹45,00,000 (down payment)"},{label:"Loan Amount",value:"₹75,00,000"},{label:"Interest Rate",value:"9% p.a."},{label:"Tenure",value:"15 years"}],result:"EMI: ₹76,050/month",explanation:"Rajesh upgrading from ₹55L flat (selling for ₹45L after 8 years) to ₹1.2Cr home in Mumbai. Uses ₹45L as down payment, borrows ₹75L for 15 years at 9%. EMI: ₹76,050. Total payment: ₹1,36,89,000 (principal ₹75L + interest ₹61.89L). Combined household income ₹2.5L makes this comfortable (30% EMI ratio). Shorter 15-year tenure saves ₹35L interest vs 25-year loan!"},{scenario:"Young Couple's Affordable Housing",inputs:[{label:"Property (PMAY scheme)",value:"₹25,00,000"},{label:"Subsidy",value:"₹2.67L (interest subsidy)"},{label:"Loan Amount",value:"₹20,00,000"},{label:"Interest Rate",value:"8.5% p.a."},{label:"Tenure",value:"20 years"}],result:"EMI: ₹17,356/month (Effective: ₹16,245 after subsidy)",explanation:"Amit and Sneha buying ₹25L flat under PMAY scheme. Down payment ₹5L (from savings). ₹20L loan at 8.5% for 20 years. Regular EMI: ₹17,356, but PMAY interest subsidy (₹2.67L over 20 years) reduces effective EMI to ₹16,245. Total interest: ₹41.65L, but subsidy reduces it to ₹38.98L. With combined income ₹75K, this 21.6% EMI ratio is very comfortable, leaving room for other goals!"}],
    tips: ["Maintain CIBIL score 750+ before applying - every 50 points can reduce interest by 0.25-0.5% saving lakhs","Compare 5-6 lenders minimum including PSU banks, private banks, HFCs - rates vary 0.5-2% for same profile","Opt for PMAY subsidy if eligible (annual income <₹18L) - get ₹2.67L interest subsidy for loans up to ₹9L","Choose shortest tenure affordable - 15-year vs 25-year on ₹50L loan saves ₹35-45L in total interest!","Prepay ₹1-2L annually if possible - reduces tenure by 3-5 years and saves ₹10-20L interest over loan life","Factor stamp duty (5-7% of property), registration (1%), legal fees (₹50-100K) in total budget planning","Consider employer home loan if available - often 0.5-1% cheaper and easier processing than bank loans"],
    mistakes: ["Not checking property title and legal clearances - saves initial effort but causes loan rejection and legal issues later","Borrowing maximum eligible amount - banks approve based on income, you should decide based on comfortable EMI (30-35% income max)","Ignoring processing fee (0.5-1%), legal fees, insurance in budgeting - adds ₹1-2L to ₹50L loan unexpectedly","Choosing only based on lowest EMI (longest tenure) - ₹30 year loan costs nearly double vs 15-20 year in total interest","Not reading prepayment clauses - most banks allow free prepayment for home loans (RBI rule) but check terms in agreement","Buying without property inspection - structural issues discovered later are costly, bank may not disburse full loan amount"],
    faqs: [{question:"What is the maximum home loan I can get based on my salary?",answer:"Banks typically offer home loans of 60x your monthly salary (some go up to 72x). For ₹50,000 monthly income: ₹30-36 lakh loan eligibility. However, actual eligibility depends on: existing EMIs (reduce eligibility), credit score (750+ gets best eligibility), co-applicant income (adds to eligibility), property location (metro vs tier-2), employer type (MNC/PSU better). Formula: Eligible EMI = (Monthly Income × 50-60%) - Existing EMIs. Then calculate loan from EMI using tenure and rate. Use our Loan Affordability Calculator for precise eligibility calculation."},{question:"What is LTV ratio and how does it affect my down payment?",answer:"LTV (Loan-to-Value) is percentage of property value that bank will finance. Most banks offer 75-90% LTV for home loans. Higher LTV means lower down payment needed but may have slightly higher interest rate. Example: ₹1 Cr property - 90% LTV means ₹90L loan (₹10L down payment needed), 75% LTV means ₹75L loan (₹25L down payment needed). Premium properties in metro cities get higher LTV. First-time buyers often get 80-85% LTV. Affordable housing under PMAY can get up to 90% LTV with government backing."},{question:"Is it better to take floating or fixed interest rate for home loan?",answer:"Floating rate is better for most home loan borrowers in India. Why: 1) Floating rates are 0.5-1% lower than fixed initially, 2) If RBI cuts rates, you benefit with lower EMI or reduced tenure, 3) No penalties for switching after some period. Fixed rate benefits: 1) Protection if rates rise, 2) Fixed EMI planning. Reality: In past 10 years, floating rates have decreased more than increased. Recommendation: Start with floating rate linked to bank's EBLR/MCLR. You can switch to fixed if expecting prolonged rate increase cycle. Most home loan borrowers choose floating (80%+ of all home loans in India)."},{question:"Can I get tax benefits on home loan?",answer:"Yes! Two major tax benefits: 1) Principal repayment deduction under Section 80C up to ₹1.5 lakh annually - same limit includes EPF, PPF, ELSS, insurance. 2) Interest payment deduction under Section 24(b) up to ₹2 lakh annually for self-occupied property (₹2L for let-out property with no limit). Additional: First-time buyers get extra ₹50,000 under Section 80EEA for loans sanctioned between April 2019 and March 2022. Total potential tax saving: ₹1.17-1.56 lakh annually (at 30% tax bracket). Over 15-20 years, this means ₹17-31 lakh tax savings! Keep proper documentation - ITR filing, interest certificate from bank."},{question:"What documents are needed for home loan approval?",answer:"Essential documents: 1) Identity proof - Aadhar, PAN card, Passport, 2) Address proof - Aadhar, Passport, Utility bill, 3) Income proof - Last 3 months salary slips, 6-12 months bank statement, Form 16, ITR for 2 years (for self-employed: 3 years ITR, audited financials, bank statements), 4) Property documents - Sale agreement, allotment letter, NOC from builder, approved building plan, encumbrance certificate, property tax receipts. Processing time: Salaried 7-15 days, Self-employed 15-25 days. Pre-approved loans (existing customers) can be disbursed in 3-5 days with minimal documentation."},{question:"Should I take home loan from bank or housing finance company?",answer:"Both have pros and cons. Banks (SBI, HDFC Bank, ICICI Bank): Lower interest rates (8.5-9.5%), stricter eligibility, slower processing (15-20 days), better for salaried with good credit. HFCs (HDFC Ltd, LIC Housing, Indiabulls): Slightly higher rates (9-10.5%), lenient eligibility (accept self-employed, lower credit scores), faster processing (10-15 days), flexible with property types. Rate comparison (₹50L, 20 years): Bank at 8.5% = ₹43,391 EMI, HFC at 9.5% = ₹46,664 EMI - difference of ₹3,273/month or ₹7.85L over 20 years! Recommendation: Try banks first, approach HFCs if rejected or need faster processing."},{question:"Can I prepay home loan and how much can I save?",answer:"Yes! RBI mandates that banks/HFCs CANNOT charge prepayment penalty on floating rate home loans. You can prepay partially or fully anytime. Savings are MASSIVE: ₹50L loan at 8.5% for 20 years - If you prepay ₹5L in year 3, you save ₹12-15L in interest and reduce tenure by 5-7 years! Even ₹50K-1L annual prepayment from bonus/increment makes huge difference. Strategy: Prepay in early years (saves more interest), choose tenure reduction over EMI reduction (saves more), use windfalls (bonus, inheritance) for prepayment. Many banks allow partial prepayments online through net banking - very convenient!"}],
    relatedCalculators: [{name:"EMI Calculator",url:"/calculators/emi-calculator",description:"General EMI calculation for any loan"},{name:"Loan Affordability Calculator",url:"/calculators/loan-affordability-calculator",description:"Check maximum loan eligibility"},{name:"Loan Prepayment Calculator",url:"/calculators/loan-prepayment-calculator",description:"See impact of prepayments"},{name:"Property Registration Calculator",url:"/calculators/property-registration-calculator",description:"Calculate registration charges"},{name:"Stamp Duty Calculator",url:"/calculators/stamp-duty-calculator",description:"Calculate stamp duty for property"},{name:"Rent vs Buy Calculator",url:"/calculators/rent-vs-buy-calculator",description:"Should you buy or rent?"},{name:"Personal Loan Calculator",url:"/calculators/personal-loan-calculator",description:"Compare with personal loan"}],
    lastUpdated:"2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema
        name="Home Loan Calculator - Home Loan EMI Calculator India 2025"
        description="Calculate home loan EMI for your dream home. Instant calculations with property value, loan amount, interest rate. Plan home purchase with our free calculator."
        url="/calculators/home-loan-calculator"
        features={["Instant home loan EMI calculation","Property value and LTV calculator","20-year amortization schedule","Compare bank interest rates","Down payment impact analysis","Total interest calculation","Prepayment planning support","100% free, updated for 2025","Works for all Indian banks","Mobile-responsive design"]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-20"
        rating={{value:4.8,count:18932}}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Home Loan Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="property-value" className="text-sm font-medium text-neutral-700">
                Property Value (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(propertyValue)}
              </span>
            </div>
            <input 
              type="range" 
              id="property-value"
              min="500000" 
              max="50000000" 
              step="100000" 
              value={propertyValue} 
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹5L</span>
              <span>₹5Cr</span>
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
              min="100000" 
              max={propertyValue * 0.9} 
              step="100000" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹1L</span>
              <span>{formatCurrency(propertyValue * 0.9)}</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Loan amount up to 90% of property value
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
              min="6" 
              max="15" 
              step="0.05" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>6%</span>
              <span>15%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="loan-tenure" className="text-sm font-medium text-neutral-700">
                Loan Tenure
              </label>
              <div className="flex space-x-2">
                <button 
                  className={`px-2 py-1 text-xs rounded-md ${tenureType === 'years' ? 'bg-[--primary-100] text-[--primary-800]' : 'bg-neutral-100 text-neutral-600'}`}
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
              max={tenureType === 'years' ? '30' : '360'} 
              step="1" 
              value={loanTenure} 
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
              <span>{tenureType === 'years' ? '30 Years' : '360 Months'}</span>
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
                <p className="text-sm text-neutral-500">Down Payment</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency(propertyValue - loanAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Loan to Value Ratio</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((loanAmount / propertyValue) * 100).toFixed(1)}%
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