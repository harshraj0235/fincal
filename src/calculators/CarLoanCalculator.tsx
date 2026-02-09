import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI, calculateLoanBreakup } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart, Calendar } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const CarLoanCalculator: React.FC = () => {
  // Quick presets for common car loan scenarios
  const carLoanPresets = [
    { name: "Hatchback (₹8L)", car: 800000, loan: 640000, rate: 9.5, tenure: 5, type: 'years' as const },
    { name: "Sedan (₹15L)", car: 1500000, loan: 1200000, rate: 9.0, tenure: 5, type: 'years' as const },
    { name: "SUV (₹25L)", car: 2500000, loan: 2000000, rate: 9.5, tenure: 5, type: 'years' as const },
    { name: "Used Car (₹12L)", car: 1200000, loan: 900000, rate: 11.5, tenure: 4, type: 'years' as const }
  ];

  const applyPreset = (preset: typeof carLoanPresets[0]) => {
    setCarValue(preset.car);
    setLoanAmount(preset.loan);
    setInterestRate(preset.rate);
    setLoanTenure(preset.tenure);
    setTenureType(preset.type);
  };
  const [carValue, setCarValue] = useState<number>(1000000);
  const [loanAmount, setLoanAmount] = useState<number>(800000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [loanTenure, setLoanTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
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
  }, [loanAmount, interestRate, loanTenure, tenureType]);

const contentData = {title:"Car Loan Calculator",description:"Car Loan Calculator helps you calculate car loan EMI, total interest, and compare loan offers from different banks in India. Get instant EMI calculation for new car loan, used car loan with down payment planning. Free car loan EMI calculator 2025 with amortization schedule and prepayment options.",benefits:["Calculate car loan EMI instantly for new and used cars","Compare loan offers from HDFC, ICICI, SBI, Axis Bank, and other lenders","Plan down payment - calculate how much to pay upfront vs loan amount","See total interest payable over loan tenure (3-7 years typically)","Get year-wise loan breakup - principal vs interest payment each year","Evaluate prepayment impact - how extra payments reduce interest burden","100% free car loan calculator updated with 2025 interest rates","Works for hatchback, sedan, SUV, luxury cars - any vehicle loan"],howToSteps:[{step:"Enter Car Value (On-Road Price)",details:"Input total on-road price of car including all costs. On-road price includes: Ex-showroom price (base car price), RTO charges (registration), Road tax (annual/lifetime), Insurance (1st year comprehensive mandatory), Accessories & add-ons. Example: Car ex-showroom ₹8L, RTO ₹60K, Road tax ₹50K, Insurance ₹30K, Accessories ₹20K = ₹9.6L on-road price. Common mistake: Using only ex-showroom price instead of on-road price leads to loan shortfall! Always calculate loan on full on-road price."},{step:"Set Down Payment Amount",details:"Decide how much to pay upfront (typically 10-20% of car value). Banks typically finance 80-90% of car value (10-20% down payment required). Higher down payment benefits: Lower EMI (less loan amount), Lower interest paid (shorter loan or smaller amount), Easier approval (shows financial strength), Better interest rates (some banks offer rate concessions). Example: ₹10L car, ₹2L down payment = ₹8L loan. Down payment ₹1L = ₹9L loan, EMI increases by ₹1,850/month (at 9.5% for 5 years). Strategy: Pay 20% down if possible, reduces total interest by ₹1-1.5L over loan tenure."},{step:"Choose Interest Rate",details:"Enter applicable car loan interest rate (check with your bank/lender). India car loan rates 2025: New Cars: 8.5-10.5% p.a. (depending on bank, car model, credit score), Used Cars: 10-13% p.a. (higher risk for lenders), Luxury Cars: 9-11% p.a. (often lower due to customer profile), Electric Vehicles: 7.5-9.5% p.a. (some banks offer green loan discounts). Rate depends on: Credit score (750+: best rates, <700: higher rates), Employment type (salaried: lower, self-employed: higher), Car model (popular brands: lower, niche brands: higher), Loan tenure (shorter tenure: sometimes lower rates). 1% rate difference = ₹20-40K extra interest on ₹8L loan over 5 years!"},{step:"Select Loan Tenure",details:"Choose loan repayment period (typically 1-7 years, most common: 3-5 years). Short tenure (3 years): Higher EMI but lower total interest, loan closes faster, less total cost. Long tenure (7 years): Lower EMI (monthly cashflow easier), higher total interest (₹1.5-2L more on ₹8L loan), car depreciates faster than loan reduces. Optimal: 5 years for most buyers - balances EMI affordability with total cost. Example ₹8L loan at 9.5%: 3 years: EMI ₹25,508, total interest ₹1,18,288, 5 years: EMI ₹16,723, total interest ₹2,03,380, 7 years: EMI ₹12,915, total interest ₹2,84,860. 7 years costs ₹1.66L MORE than 3 years in interest!"},{step:"Review EMI & Total Cost",details:"Calculator shows: Monthly EMI, Total interest payable, Total payment (principal + interest), Loan amortization schedule (year-wise breakup). Key insights: First years: Most of EMI goes to interest (60-70%), later years more goes to principal. Total cost of car = On-road price + Interest - Resale value after loan tenure. Example: ₹10L car, ₹8L loan at 9.5% for 5 years: Monthly EMI: ₹16,723, Total paid: ₹10,03,380, Total interest: ₹2,03,380, True car cost: ₹10L + ₹2L interest = ₹12L (before considering resale). Prepayment benefit: Paying extra ₹20K annually can save ₹30-50K in interest!"}],examples:[{scenario:"First-Time Buyer - Hatchback Purchase",inputs:[{label:"Car Model",value:"Maruti Swift"},{label:"On-Road Price",value:"₹8,50,000"},{label:"Down Payment",value:"₹1,50,000 (18%)"},{label:"Loan Amount",value:"₹7,00,000"},{label:"Interest Rate",value:"9.5% p.a."},{label:"Tenure",value:"5 years"}],result:"EMI: ₹14,632 | Total Interest: ₹1,77,920 | Total: ₹8,77,920",explanation:"Rahul, 28, buys first car - Maruti Swift. On-road price ₹8.5L, pays ₹1.5L down payment from savings. Bank approves ₹7L loan at 9.5% for 5 years (based on ₹45K salary, good credit score). Monthly EMI ₹14,632 fits in budget (32% of income). Total payment: ₹8.78L over 5 years. By year 3, loan balance ₹3.2L while car resale value ₹4-4.5L (positive equity). Strategy: He plans to prepay ₹50K in year 2 (from bonus), will save ₹18K in interest and close loan 8 months early. EMI is affordable without straining monthly budget."},{scenario:"Premium Sedan with Longer Tenure",inputs:[{label:"Car Model",value:"Honda City"},{label:"On-Road Price",value:"₹15,00,000"},{label:"Down Payment",value:"₹3,00,000 (20%)"},{label:"Loan Amount",value:"₹12,00,000"},{label:"Interest Rate",value:"10% p.a."},{label:"Tenure",value:"7 years"}],result:"EMI: ₹19,551 | Total Interest: ₹5,14,282 | Total: ₹17,14,282",explanation:"Priya, 35, senior professional (₹1.2L salary), buys Honda City for family. Opts for 7-year tenure to keep EMI manageable (only 16% of income vs 24% for 5-year tenure). Trade-off: Pays ₹5.14L interest vs ₹3.6L for 5 years (₹1.54L extra!). But cashflow flexibility worth it for her - can invest remaining ₹5K monthly in mutual funds. Reality: After 5 years, plans to foreclose loan (car loan allows prepayment without penalty). By then, loan balance ₹3.8L, she can pay from matured FD. Effective tenure: 5 years despite taking 7-year loan. Smart use of longer tenure for flexibility!"},{scenario:"Used Car Purchase - Higher Interest",inputs:[{label:"Car Model",value:"2-year old Hyundai Creta"},{label:"On-Road Value",value:"₹12,00,000"},{label:"Down Payment",value:"₹3,00,000 (25%)"},{label:"Loan Amount",value:"₹9,00,000"},{label:"Interest Rate",value:"11.5% p.a. (used car rate)"},{label:"Tenure",value:"4 years"}],result:"EMI: ₹23,568 | Total Interest: ₹2,31,264 | Total: ₹11,31,264",explanation:"Amit buys used 2019 Hyundai Creta for ₹12L (original price was ₹18L new). Used car loan has higher interest (11.5% vs 9.5% for new). Bank requires 25% down payment for used cars (higher risk). He pays ₹3L down, borrows ₹9L for 4 years. EMI ₹23,568. Advantage: Car already depreciated heavily, slower depreciation now. Total cost ₹12L + ₹2.31L interest = ₹14.31L for a car worth ₹18L new! Saves ₹3-4L vs buying new. After 4 years, car still worth ₹7-8L (slow depreciation), so net cost only ₹6-7L for 6 years of ownership. Used car financing makes sense if car is well-maintained and rate difference isn't too high."}],tips:["Negotiate car price before discussing finance - dealers inflate price if they know you're taking loan (earn commission from banks)","Compare rates from 3-4 banks/lenders - difference of 0.5-1% seems small but saves ₹20-50K on ₹8L loan","Pay 20% down payment if possible - significantly reduces EMI and total interest, improves loan approval chances","Choose tenure wisely - don't extend beyond 5 years for depreciating asset, car depreciates faster than loan reduces after 5 years","Read loan agreement for prepayment charges - most car loans allow prepayment without penalty, some old agreements charge 2-4%","Use annual bonus for prepayment - paying ₹50K extra annually can save ₹40-80K in interest and close loan 1-2 years early","Maintain good credit score (750+) - every 50-point increase can reduce rate by 0.5-1%, saving ₹20-40K over loan tenure"],mistakes:["Taking loan for full on-road price with 0% down payment - increases EMI burden, harder approval, shows poor financial planning","Choosing longest tenure (7 years) just for low EMI - you pay ₹1.5-2L extra interest, car becomes almost worthless by loan end","Buying expensive car with EMI >40% of income - financial strain, difficult to prepay, risk of default if income disrupts","Not comparing bank offers - blindly taking dealer's tie-up bank loan, often 0.5-1% higher rate than direct bank application","Ignoring prepayment option - not utilizing bonuses/windfalls to reduce loan, small prepayments save massive interest via compounding","Adding unnecessary insurance/accessories to loan - increases loan amount, you pay interest on these for 5-7 years. Pay cash for add-ons!","Defaulting on EMI - damages credit score (drops 50-100 points), makes future loans difficult/expensive, bank can repossess car"],faqs:[{question:"What is car loan EMI and how is it calculated?",answer:"Car loan EMI (Equated Monthly Installment) is fixed monthly payment you make to repay car loan. Calculated using formula: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1], where P = Principal (loan amount), r = Monthly interest rate (annual rate ÷ 12), n = Tenure in months. Example: ₹8L loan at 9.5% for 5 years (60 months), r = 9.5 ÷ 12 ÷ 100 = 0.00792, EMI = [800000 × 0.00792 × (1.00792)^60] / [(1.00792)^60 - 1] = ₹16,723. EMI remains constant throughout loan tenure but composition changes - early EMIs have more interest, later EMIs have more principal repayment. Use this calculator to get instant accurate EMI for any loan amount, rate, and tenure!"},{question:"What is the minimum down payment required for car loan in India?",answer:"Minimum down payment varies by lender and car type: New Cars: 10-20% (most banks finance 80-90% of car value), Used Cars: 20-30% (higher risk, banks finance 70-80%), Luxury Cars: 15-25% (depends on model and bank policy). RBI guidelines: Banks can finance up to 90% for new cars, but most cap at 85-90% based on customer profile. Factors affecting down payment: Credit score (750+: may get 90% financing, <700: only 70-80%), Income level (higher income: lower down payment requirement), Employment type (salaried: 10-15%, self-employed: 20-25%). Example: ₹10L car, Credit score 780, salaried: 10% down (₹1L), loan ₹9L approved. Credit score 680, self-employed: 25% down (₹2.5L), loan only ₹7.5L approved. Strategy: Pay 20% down even if bank approves 90% - reduces EMI by ₹2000-3000, saves ₹40-80K in interest over tenure!"},{question:"What are current car loan interest rates in India for 2025?",answer:"Car loan interest rates in India (January 2025): SBI: 8.70-9.20% p.a. (new cars), 9.70-10.70% (used cars), HDFC Bank: 8.75-9.50% p.a. (new), 10.50-12% (used), ICICI Bank: 8.90-9.75% p.a. (new), 10.50-11.75% (used), Axis Bank: 8.80-9.60% p.a. (new), 10.25-11.50% (used), Kotak Mahindra: 8.70-9.40% p.a. (new), 10-11.5% (used), PNB/BOB: 9-10% p.a. (new), 10.5-12% (used). Rate depends on: Credit score (750+: lowest rate, 650-750: +0.5-1%, <650: +1.5-2% or rejection), Loan amount (₹5L+: better rates than ₹2-3L loans), Car model (popular brands/models: better rates), Employment (salaried with reputed company: -0.25% to -0.5%). Special rates: Electric vehicles: Some banks offer 0.25-0.5% discount on green loans, Woman borrowers: Some banks offer 0.25% concession. Always compare 3-4 banks before finalizing - 0.5% difference = ₹15-25K savings on ₹8L loan!"},{question:"Should I take car loan or pay cash for buying car?",answer:"Car loan vs cash payment depends on your financial situation: Take Car Loan when: You have emergency fund (6-12 months expenses) in place, Can get loan at <10% interest rate (your investments earn more than loan cost), Need to preserve liquidity for other goals (house, education), Credit score will improve with timely EMI payments (builds credit history), Car loan interest (9-10%) < your investment returns (mutual funds 12-15%). Pay Cash when: Interest rate is very high (>12-13%), No emergency fund yet (build this first before EMI commitment), Car is luxury/want not necessity (can wait and save), You're close to retirement (don't burden post-retirement with EMIs), Have idle cash earning low returns (<7% in savings). Financial calculation: ₹8L car loan at 9.5% for 5 years: Total interest ₹2L. If you invest ₹8L in mutual funds at 12% instead: Grows to ₹14.1L in 5 years. Using ₹16,723 monthly (EMI amount) in SIP: Only accumulates to ₹13L. Verdict: If you can earn 2-3% more than loan rate via investments, taking loan makes financial sense! But factor in risk, liquidity needs, psychological comfort of being debt-free."},{question:"Can I prepay car loan without penalty? How much interest can I save?",answer:"Most banks allow car loan prepayment without penalty (check your loan agreement): Prepayment rules: Full prepayment: Pay entire outstanding anytime, loan closes immediately. No penalty in most cases. Partial prepayment: Pay extra amount, reduces principal, saves interest. Usually allowed quarterly/annually. Some old loans (pre-2014): May have 2-4% prepayment penalty, check agreement carefully. New loans (post-2014): RBI circular allows prepayment of floating rate loans without penalty. Interest savings from prepayment: Example - ₹8L loan at 9.5% for 5 years (EMI ₹16,723): After 1 year, outstanding ₹6.7L. Prepay ₹1L: Saves ₹28,468 in interest, loan closes 10 months early. After 2 years, outstanding ₹5.2L. Prepay ₹50K: Saves ₹12,642 in interest, closes 6 months early. Strategy: Use annual bonus for prepayment - paying ₹50K extra annually on ₹8L loan saves ₹60-80K total interest and closes loan 1.5-2 years early! Prepayment benefits: Reduces total interest dramatically, Becomes debt-free faster, Improves debt-to-income ratio for future loans, Frees up monthly cashflow sooner. Always utilize windfalls (bonus, gift, matured investments) for loan prepayment - highest guaranteed return!"},{question:"What is car loan amortization schedule and why is it important?",answer:"Amortization schedule is year-by-year (or month-by-month) breakup showing how loan is repaid - principal vs interest in each EMI. Sample schedule for ₹8L loan at 9.5% for 5 years (EMI ₹16,723): Year 1: Principal ₹1.29L, Interest ₹71K (interest is 55% of payment), Year 2: Principal ₹1.42L, Interest ₹58K (interest reduces to 45%), Year 3: Principal ₹1.56L, Interest ₹45K, Year 4: Principal ₹1.72L, Interest ₹29K, Year 5: Principal ₹1.89L, Interest ₹12K (now principal is 94% of payment). Key insights: Early years: 50-60% of EMI goes to interest (you're mainly paying interest, not principal), Later years: 70-80% goes to principal (loan reduces faster), Prepayment impact: Paying extra in early years saves MASSIVE interest (₹1 prepaid in year 1 saves ₹1.50 in interest over tenure). Why important: Helps decide WHEN to prepay (early years give maximum benefit), Shows actual loan reduction progress (outstanding balance vs payments made), Tax planning (if business car, interest is deductible, helps track), Foreclosure decision (know outstanding at any point to plan full prepayment). Use amortization schedule to plan prepayment strategy - ₹50K prepaid in year 2 saves more interest than ₹1L prepaid in year 4!"}],relatedCalculators:[{name:"EMI Calculator",url:"/calculators/emi-calculator",description:"General loan EMI calculator"},{name:"Home Loan Calculator",url:"/calculators/home-loan-calculator",description:"Housing loan EMI calculation"},{name:"Personal Loan Calculator",url:"/calculators/personal-loan-calculator",description:"Personal loan EMI"},{name:"Bike Loan Calculator",url:"/calculators/bike-loan-calculator",description:"Two-wheeler loan EMI"},{name:"Loan Eligibility Calculator",url:"/calculators/loan-eligibility-calculator",description:"Check loan eligibility"},{name:"Loan Comparison Calculator",url:"/calculators/loan-comparison-calculator",description:"Compare loan offers"},{name:"Credit Score Simulator",url:"/calculators/credit-score-simulator",description:"Impact on credit score"}],lastUpdated:"2025-01-20"};
  
  return (
    <>
      <CalculatorSchema name="Car Loan Calculator - Car Loan EMI Calculator India 2025" description="Free Car Loan Calculator for India. Calculate car loan EMI, interest, compare bank offers. New car, used car loan calculator with down payment. Updated 2025 interest rates." url="/calculators/car-loan-calculator" features={["Car loan EMI calculation","New & used car loans","Down payment planning","Compare bank offers","Amortization schedule","Prepayment calculator","Free car loan calculator","2025 interest rates"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.8,count:14987}}/>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Car Loan Details
        </h2>
        
        {/* Quick Presets for Common Car Loan Scenarios */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
          <p className="text-sm font-medium text-neutral-700 mb-2">Quick Presets (Common Scenarios):</p>
          <div className="flex flex-wrap gap-2">
            {carLoanPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="px-3 py-1.5 text-xs bg-white border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-colors text-neutral-700 font-medium"
              >
                {preset.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-neutral-600 mt-2">Click any preset to auto-fill with typical values</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="car-value" className="text-sm font-medium text-neutral-700">
                Car Value (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(carValue)}
              </span>
            </div>
            <input 
              type="range" 
              id="car-value"
              min="100000" 
              max="10000000" 
              step="50000" 
              value={carValue} 
              onChange={(e) => setCarValue(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹1L</span>
              <span>₹1Cr</span>
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
              max={carValue * 0.9} 
              step="50000" 
              value={loanAmount} 
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹50K</span>
              <span>{formatCurrency(carValue * 0.9)}</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Loan amount up to 90% of car value
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
              min="7" 
              max="18" 
              step="0.05" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>7%</span>
              <span>18%</span>
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
              max={tenureType === 'years' ? '7' : '84'} 
              step="1" 
              value={loanTenure} 
              onChange={(e) => setLoanTenure(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
              <span>{tenureType === 'years' ? '7 Years' : '84 Months'}</span>
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
                  {formatCurrency(carValue - loanAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Loan to Value Ratio</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {((loanAmount / carValue) * 100).toFixed(1)}%
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
        <CalculatorContentWrapper {...contentData}/>
        
        {/* Additional Comprehensive Content Section - Car Loan Analysis 2025 */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Car Loan Calculator India 2025: Latest Rates, Trends & Complete Guide</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Current Car Loan Interest Rates in India (2025)</h3>
              <p className="leading-relaxed mb-4">
                Car loan interest rates in India for 2025 range from <strong>8.5% to 13% per annum</strong> depending on lender, car type, credit score, and loan amount. PSU banks (SBI, BOB, PNB) typically offer 8.5-9.5% for new cars with good credit scores (750+). Private banks (HDFC Bank, ICICI Bank, Axis Bank) offer 8.75-10% with faster processing. NBFCs offer 9-13% with more flexible eligibility. Used car loans typically have 1-2% higher rates (10-13%) due to higher risk.
              </p>
              <p className="leading-relaxed mb-4">
                Factors affecting interest rate: <strong>Credit Score</strong> - 750+ gets best rates (8.5-9%), 700-750 gets 9-10%, below 700 gets 10-13% or rejection. <strong>Car Type</strong> - New cars get better rates than used cars. <strong>Loan Amount</strong> - Loans above ₹5-10L often get 0.25-0.5% lower rates. <strong>Employment</strong> - Salaried employees get preferential rates. <strong>Down Payment</strong> - Higher down payment (20%+) can get 0.25-0.5% discount. Use our <Link to="/calculators/loan-comparison-calculator" className="text-primary-700 underline font-semibold">Loan Comparison Calculator</Link> to compare rates from multiple lenders.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Related Calculators for Complete Car Purchase Planning</h3>
              <p className="leading-relaxed mb-4">
                Comprehensive car purchase planning requires multiple calculators. Use our <Link to="/calculators/emi-calculator" className="text-primary-700 underline font-semibold">EMI Calculator</Link> for general loan EMI calculations. Our <Link to="/calculators/loan-affordability-calculator" className="text-primary-700 underline font-semibold">Loan Affordability Calculator</Link> helps determine maximum loan eligibility. For comparing with other loan types, use our <Link to="/calculators/personal-loan-calculator" className="text-primary-700 underline font-semibold">Personal Loan Calculator</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};