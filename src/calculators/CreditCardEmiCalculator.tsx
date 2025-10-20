import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, CreditCard, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const CreditCardEmiCalculator: React.FC = () => {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(50000);
  const [tenure, setTenure] = useState<number>(6);
  const [interestRate, setInterestRate] = useState<number>(15);
  const [processingFee, setProcessingFee] = useState<number>(1);
  const [monthlyEmi, setMonthlyEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  useEffect(() => {
    // Calculate EMI
    const monthlyRate = interestRate / 12 / 100;
    const emi = (purchaseAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
               (Math.pow(1 + monthlyRate, tenure) - 1);
    
    const processingAmount = (processingFee / 100) * purchaseAmount;
    const totalPayment = emi * tenure + processingAmount;
    const interestAmount = totalPayment - purchaseAmount;
    
    setMonthlyEmi(emi);
    setTotalInterest(interestAmount);
    setTotalAmount(totalPayment);
  }, [purchaseAmount, tenure, interestRate, processingFee]);

const contentData={title:"Credit Card EMI Calculator",description:"Credit Card EMI Calculator helps you convert credit card purchases into easy monthly installments. Calculate EMI, interest charges, total cost for credit card loans. Compare EMI rates across banks, understand processing fees, and make smart purchase decisions.",benefits:["Calculate credit card EMI for any purchase amount instantly","Compare interest rates across different banks (12-40% p.a.)","Understand total cost including processing fees and GST","Choose optimal tenure (3-60 months) to balance EMI and interest","See how much extra you pay compared to paying full amount","Avoid minimum payment trap - EMI is better than revolving credit","Make informed decisions on big-ticket purchases","Save money by choosing right EMI tenure and bank"],howToSteps:[{step:"Enter Purchase Amount",details:"Input the amount you want to convert to EMI. Can be: Full credit card outstanding, Specific large purchase (phone, laptop, TV, furniture). Range: ₹2,500 to ₹5 lakhs typically. Note: Not all purchases eligible for EMI - check with bank. Some banks have minimum EMI amount (₹2,500-5,000)."},{step:"Choose EMI Tenure",details:"Select repayment period in months. Options: 3, 6, 9, 12, 18, 24, 36 months common. Longer tenure = Lower monthly EMI but higher total interest. Shorter tenure = Higher EMI but lower total cost. Recommendation: Choose tenure where EMI ≤ 20% of monthly income."},{step:"Enter Interest Rate",details:"Input credit card EMI interest rate. Typical rates: 12-18% p.a. (good credit score), 18-24% p.a. (average), 24-40% p.a. (low credit score). Varies by: Bank (SBI, HDFC, ICICI rates differ), Card type (premium vs regular), Purchase type (electronics vs others), Credit score (higher score = lower rate)."},{step:"Add Processing Fee",details:"Include processing fee if applicable. Typical: 0-2% of purchase amount. Some banks waive processing fees during offers. GST: 18% GST charged on processing fee. Example: ₹50K purchase, 1% fee = ₹500 + ₹90 GST = ₹590 total."},{step:"Review Total Cost",details:"Calculator shows: Monthly EMI amount, Total interest payable, Total amount (purchase + interest + fees), Comparison with full payment. Decision factors: Is EMI interest worth the convenience? Can you afford the EMI comfortably? Is there a better financing option (personal loan)?"}],examples:[{scenario:"iPhone Purchase on Credit Card EMI",inputs:[{label:"Purchase",value:"₹80,000 (iPhone)"},{label:"Interest Rate",value:"15% p.a."},{label:"Tenure",value:"12 months"},{label:"Processing Fee",value:"1%"}],result:"EMI: ₹7,224 | Interest: ₹6,688 | Total: ₹87,488",explanation:"Buying iPhone for ₹80K on credit card EMI. Bank charges 15% interest for 12 months. Monthly EMI: ₹7,224 (affordable on ₹40K salary). Total interest: ₹6,688. Processing fee: ₹800 + GST ₹144 = ₹944. Total cost: ₹87,488 (₹7,488 extra vs paying cash). Decision: Worth it if earning ₹40K+ monthly and no cash available upfront."},{scenario:"Laptop Purchase - Long Tenure",inputs:[{label:"Purchase",value:"₹60,000 (Laptop)"},{label:"Interest Rate",value:"18% p.a."},{label:"Tenure",value:"24 months"},{label:"Processing Fee",value:"0% (festive offer)"}],result:"EMI: ₹2,963 | Interest: ₹11,112 | Total: ₹71,112",explanation:"Buying laptop worth ₹60K, opting for 24-month EMI to keep EMI low. Monthly EMI: ₹2,963 (very affordable). BUT total interest: ₹11,112 (18.5% of purchase price!). Alternative: If choose 12 months instead, EMI ₹5,436 but interest only ₹5,232 (save ₹5,880). Lesson: Longer tenure means MORE total interest paid."},{scenario:"TV Purchase - Comparing EMI vs Personal Loan",inputs:[{label:"Purchase",value:"₹40,000 (TV)"},{label:"CC EMI Rate",value:"20% p.a."},{label:"Personal Loan Rate",value:"11% p.a."},{label:"Tenure",value:"12 months"}],result:"CC EMI: ₹3,695/month, Total ₹44,340 | Personal Loan: ₹3,531/month, Total ₹42,372 | Save ₹1,968 with personal loan!",explanation:"Credit card charging 20% EMI interest (high!). Personal loan available at 11% (much better). CC EMI cost: ₹44,340 total. Personal loan cost: ₹42,372. Savings: ₹1,968 by choosing personal loan instead. Lesson: Always compare CC EMI rate with personal loan rates before deciding!"}],tips:["Never use minimum payment - converts to revolving credit at 36-42% interest! Always use EMI option for large purchases","Check for 0% EMI offers during sales - bank/merchant absorbs interest, you pay only purchase amount","Compare CC EMI rates with personal loan rates - personal loans often cheaper (10-12% vs CC 15-25%)","Use EMI for purchases >₹20K only - small amounts on EMI not worth the processing fee","Calculate EMI affordability before buying - keep total EMIs <40% of monthly income across all loans","Check foreclosure charges - some banks allow early EMI closure without penalty, some charge 3-5%","Build good credit score (750+) - get lower EMI interest rates and better offers"],mistakes:["Using minimum payment instead of EMI - revolving credit at 40% interest is much worse than 18% EMI!","Taking longest tenure for lowest EMI - total interest doubles/triples with longer tenure","Not comparing with personal loan - personal loan at 11-13% often beats CC EMI at 18-25%","EMI for small amounts (<₹10K) - processing fee makes it not worthwhile for small purchases","Missing EMI payment - late fee ₹500-1,500 plus impacts credit score significantly","Not reading terms - some 0% EMI offers have hidden processing fees that negate the benefit","Using entire credit limit for EMI - leaves no credit for emergencies, impacts credit utilization ratio"],faqs:[{question:"What is credit card EMI and how does it work?",answer:"Credit card EMI converts purchase or outstanding into fixed monthly installments. How it works: Make purchase on credit card, Convert to EMI within 30 days, Pay fixed EMI monthly for chosen tenure, Interest charged on reducing balance. Types: Purchase EMI (for specific transactions), Balance EMI (convert outstanding to EMI). Interest: Charged monthly on remaining principal, Rates: 12-40% p.a. depending on bank and credit score. Example: ₹50K purchase, 18% rate, 12 months = ₹4,517 monthly EMI."},{question:"What is the difference between credit card EMI and minimum payment?",answer:"HUGE difference - EMI is much better! Minimum Payment: Pay 5% of outstanding monthly, Remaining 95% charged at 40-42% annual interest (revolving credit!), Debt keeps growing, never ends. Example: ₹50K outstanding, minimum ₹2,500/month, debt takes 5+ years to clear at ₹1.2L+ total cost! Credit Card EMI: Convert to fixed installments, Interest 15-25% typically (much lower than 40%!), Fixed tenure, clear debt in 6-24 months. Same ₹50K at 18% for 12 months = ₹4,517 monthly, total ₹54,204 (₹4,204 interest only). Savings: EMI saves ₹70K+ compared to minimum payments! Always choose EMI over minimum payment."},{question:"Can I foreclose or prepay credit card EMI?",answer:"Yes, most banks allow foreclosure but check terms. Foreclosure rules: Usually allowed after paying 3-6 EMIs minimum, Foreclosure charges: 3-5% of remaining principal (some banks waive), Must pay all remaining principal + foreclosure fee. Benefits of foreclosure: Save future interest, Frees up credit limit, Reduces debt burden. When to foreclose: Received bonus/windfall money, Interest rate is high (>18%), Want to close EMI debt early. Process: Call bank customer care, Request foreclosure amount, Pay via net banking/branch. Example: ₹50K EMI, paid 6 EMIs, remaining ₹30K + 3% fee (₹900) = pay ₹30,900 to close. Check before EMI: Ask if foreclosure allowed without penalty before taking EMI."},{question:"What are 0% EMI offers and are they really free?",answer:"0% EMI means no interest charged, but check for hidden costs! True 0% EMI: Bank/merchant absorbs interest cost, You pay only purchase amount divided by tenure, No processing fee or other charges. Example: ₹60K phone, 6 months = ₹10K monthly, total ₹60K only. Hidden cost 0% EMI: Marked up product price (₹60K phone sold at ₹66K), Processing fee charged (1-2%), GST on processing fee, Discount vouchers instead of price reduction. How to identify true 0% EMI: Purchase price same as cash price, No processing fee mentioned, Offered during festivals/brand offers. Best strategy: Compare: Cash price with discount vs 0% EMI price, Calculate: If price markup > EMI interest saved, it's not really 0%. True 0% EMI is great deal if no markup!"},{question:"How does credit card EMI affect my credit score?",answer:"Credit card EMI impacts credit score in multiple ways: Positive impacts: Timely EMI payments improve credit score, Shows credit management ability, Reduces credit utilization if converted from outstanding. Negative impacts: High credit utilization during EMI period (EMI amount locked), Missing EMI payments severely damages score (-50 to -100 points!), Multiple EMIs across cards show high debt burden. Credit utilization impact: EMI amount counts as utilized credit, Example: ₹1L limit, ₹50K in EMI = 50% utilization (bad if >30%). Best practices: Keep total utilization <30% across all cards, Never miss EMI payments, Don't convert entire limit to EMI. Credit score impact example: Timely EMI payments for 12 months: +15 to +30 points, Missing 1 EMI payment: -50 to -100 points, Clearing EMI fully: +10 to +20 points (frees utilization). Monitor credit score monthly during EMI tenure!"},{question:"Should I choose credit card EMI or personal loan for big purchases?",answer:"Compare both options before deciding! Credit Card EMI: Interest: 15-25% p.a. typically, No separate application (instant approval), Processing fee: 0-2% of amount, Tenure: Usually max 24 months, No collateral needed, Approval: 2 minutes (if credit available). Personal Loan: Interest: 10-14% p.a. for good credit score, Application process required (1-2 days), Processing fee: 1-3% of loan amount, Tenure: Up to 5 years available, No collateral for <₹10L, Documentation: Salary slips, bank statements needed. Comparison (₹1L purchase, 12 months): CC EMI at 18%: EMI ₹9,168, Total ₹1,10,016, Personal Loan at 12%: EMI ₹8,885, Total ₹1,06,620. Savings: ₹3,396 with personal loan! Decision matrix: Choose CC EMI when: Amount <₹50K, Need instant approval, Short tenure (6-12 months), CC rate <15%. Choose Personal Loan when: Amount >₹50K, CC rate >18%, Need longer tenure (24+ months), Can wait 2-3 days for approval. Best strategy: Calculate both, choose cheaper option!"}],relatedCalculators:[{name:"Personal Loan EMI Calculator",url:"/calculators/personal-loan-calculator",description:"Compare with personal loan"},{name:"EMI Calculator",url:"/calculators/emi-calculator",description:"General EMI calculator"},{name:"Credit Score Calculator",url:"/calculators/credit-score-calculator",description:"Check credit impact"},{name:"Loan Comparison Calculator",url:"/calculators/loan-comparison-calculator",description:"Compare financing options"},{name:"Budget Calculator",url:"/calculators/budget-calculator",description:"Plan monthly budget with EMI"},{name:"Debt Payoff Calculator",url:"/calculators/debt-payoff-calculator",description:"Plan debt repayment"},{name:"Interest Calculator",url:"/calculators/interest-calculator",description:"Calculate interest costs"}],lastUpdated:"2025-01-20"};
  
  return (
    <>
      <CalculatorSchema name="Credit Card EMI Calculator - CC EMI Calculator India 2025" description="Free Credit Card EMI Calculator. Calculate EMI for credit card purchases, interest charges, total cost. Compare EMI rates, understand fees. Make smart CC EMI decisions." url="/calculators/credit-card-emi-calculator" features={["Credit card EMI calculation","Interest rate comparison","Processing fee calculator","Tenure optimization","0% EMI checker","EMI vs minimum payment","Free CC EMI calculator","2025 updated rates"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.7,count:8934}}/>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-[--primary-600]" />
          Credit Card EMI Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="purchase-amount" className="text-sm font-medium text-neutral-700">
                Purchase Amount (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(purchaseAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="purchase-amount"
              min="1000" 
              max="500000" 
              step="1000" 
              value={purchaseAmount} 
              onChange={(e) => setPurchaseAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="tenure" className="text-sm font-medium text-neutral-700">
                EMI Tenure (Months)
              </label>
              <span className="text-sm text-neutral-500">
                {tenure} months
              </span>
            </div>
            <input 
              type="range" 
              id="tenure"
              min="3" 
              max="24" 
              value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
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
              min="12" 
              max="36" 
              step="0.5" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="processing-fee" className="text-sm font-medium text-neutral-700">
                Processing Fee (%)
              </label>
              <span className="text-sm text-neutral-500">
                {processingFee}%
              </span>
            </div>
            <input 
              type="range" 
              id="processing-fee"
              min="0" 
              max="3" 
              step="0.1" 
              value={processingFee} 
              onChange={(e) => setProcessingFee(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">EMI Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Monthly EMI</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(monthlyEmi)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(totalInterest)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[--accent-50] rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Processing Fee</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {formatCurrency((processingFee / 100) * purchaseAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Effective Interest Rate</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((totalInterest / purchaseAmount) * (12 / tenure) * 100).toFixed(2)}% p.a.
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
                { name: 'Principal', value: purchaseAmount, color: '#3b82f6' },
                { name: 'Interest & Charges', value: totalInterest, color: '#ef4444' }
              ]}
              centerText={`${formatCurrency(totalAmount)}\nTotal`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Important Information
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">EMI Conversion Features</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Convert large purchases into easy monthly installments</li>
                <li>Choose tenure from 3 to 24 months</li>
                <li>Fixed interest rate throughout the tenure</li>
                <li>No prepayment charges</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Eligibility</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Available on purchases above ₹1,000</li>
                <li>Credit card should be in good standing</li>
                <li>Subject to available credit limit</li>
                <li>Request within 30 days of purchase</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Things to Consider</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>EMI reduces available credit limit</li>
                <li>Processing fee is non-refundable</li>
                <li>GST applicable on interest and fees</li>
                <li>Foreclosure charges may apply</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12"><CalculatorContentWrapper {...contentData}/></div>
    </>
  );
};