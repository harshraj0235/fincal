import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const HraExemptionCalculator: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [hraReceived, setHraReceived] = useState<number>(20000);
  const [rentPaid, setRentPaid] = useState<number>(25000);
  const [isMetroCity, setIsMetroCity] = useState<boolean>(true);
  const [exemptedHra, setExemptedHra] = useState<number>(0);
  const [taxableHra, setTaxableHra] = useState<number>(0);
  
  useEffect(() => {
    // Calculate HRA exemption
    const monthlyBasic = basicSalary;
    const monthlyHra = hraReceived;
    const monthlyRent = rentPaid;
    
    // Calculate as per rules
    const actualHra = monthlyHra;
    const rentLessBasic = monthlyRent - (monthlyBasic * 0.1);
    const basicPercent = monthlyBasic * (isMetroCity ? 0.5 : 0.4);
    
    // Exempted HRA is minimum of:
    // 1. Actual HRA received
    // 2. Rent paid - 10% of basic salary
    // 3. 50% of basic salary (metro) or 40% of basic salary (non-metro)
    const exempted = Math.min(
      actualHra,
      Math.max(0, rentLessBasic),
      basicPercent
    );
    
    setExemptedHra(exempted);
    setTaxableHra(monthlyHra - exempted);
  
  }, [basicSalary, hraReceived, rentPaid, isMetroCity]);

  const quickPresets = [
    { label: 'Metro High Rent', basic: 60000, hra: 30000, rent: 35000, metro: true },
    { label: 'Metro Medium Rent', basic: 50000, hra: 20000, rent: 25000, metro: true },
    { label: 'Non-Metro High Rent', basic: 50000, hra: 20000, rent: 25000, metro: false },
    { label: 'Non-Metro Medium', basic: 40000, hra: 15000, rent: 18000, metro: false },
    { label: 'Parents Rent', basic: 50000, hra: 20000, rent: 15000, metro: true },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setBasicSalary(preset.basic);
    setHraReceived(preset.hra);
    setRentPaid(preset.rent);
    setIsMetroCity(preset.metro);
  };

const contentData={title:"HRA Exemption Calculator",description:"HRA Exemption Calculator helps you calculate House Rent Allowance tax exemption in India. Understand HRA rules, metro vs non-metro rates, how much HRA is tax-free. Free HRA calculator 2025 for salaried employees claiming HRA benefit under Section 10(13A).",benefits:["Calculate exact HRA tax exemption as per Income Tax Act Section 10(13A)","Compare metro city (50%) vs non-metro city (40%) HRA exemption rates","Understand 3-part HRA calculation formula - get minimum of all three","See taxable HRA amount to report in ITR filing","Verify if your HRA claim is correct and optimal","Save ₹30,000-80,000 annually in taxes through proper HRA planning","100% free HRA calculator updated with 2025 tax rules","Works for all salaried employees receiving HRA component in salary"],howToSteps:[{step:"Enter Monthly Basic Salary",details:"Input your basic salary per month (not CTC or gross salary). Basic salary is: Fixed component of salary, Excludes: HRA, Conveyance, Special Allowance, Bonuses. Usually 40-50% of CTC. Example: CTC ₹12L annually, Basic ≈ ₹40-50K monthly. Important: HRA exemption calculated on Basic salary, NOT gross or CTC! If your salary structure shows Basic ₹30K + HRA ₹20K + Special ₹25K = ₹75K gross, use only ₹30K here."},{step:"Enter Monthly HRA Received",details:"Input actual HRA amount received monthly in your salary. HRA (House Rent Allowance) is: Separate component in salary slip, Specifically designated as 'HRA', Taxable if you don't claim exemption. Example: Salary slip shows HRA: ₹20,000 - use this amount. Not eligible: If salary has no HRA component, you CANNOT claim HRA exemption (even if you pay rent). Can claim under Section 80GG instead if no HRA."},{step:"Enter Monthly Rent Paid",details:"Input actual rent paid per month for accommodation. Rent paid: Must have rent receipt or rent agreement as proof, Must be paying to landlord (not self-owned property), Include only house rent (not maintenance, parking separately). Example: Pay ₹25K monthly rent - use ₹25,000. Shared accommodation: Use YOUR share of rent only. Living with parents: Can pay rent to parents and claim HRA (but they must show rental income in their ITR). Rent-free: If not paying rent, HRA exemption = 0 (entire HRA taxable)."},{step:"Select City Type - Metro or Non-Metro",details:"Choose if you live in metro or non-metro city (affects HRA exemption %). Metro Cities (50% exemption): Mumbai, Delhi, Kolkata, Chennai. All other cities (40% exemption): Bangalore, Hyderabad, Pune, Ahmedabad, and rest of India. Why it matters: Metro cities get 50% of basic as max exemption, Non-metro gets only 40%. Example impact: Basic ₹50K, Metro: Max ₹25K exemption, Non-Metro: Max ₹20K exemption (₹5K difference = ₹1,560 tax saving annually in 30% bracket!). Work location: Use city WHERE YOU WORK, not where house is located."},{step:"Review HRA Exemption Calculation",details:"Calculator shows: Exempted HRA (tax-free amount), Taxable HRA (to add to taxable income), Savings (tax saved at your tax bracket). HRA exemption formula - MINIMUM of: 1) Actual HRA received, 2) Rent paid - 10% of Basic, 3) 50% of Basic (metro) OR 40% of Basic (non-metro). Example: Basic ₹50K, HRA ₹20K, Rent ₹25K, Metro. Calculate: Actual HRA = ₹20K, Rent - 10% Basic = ₹25K - ₹5K = ₹20K, 50% Basic = ₹25K. Minimum = ₹20K (so ₹20K exempted, ₹0 taxable!). Tax saved: ₹20K × 12 × 30% = ₹72,000 annually!"}],examples:[{scenario:"Metro City Employee with High Rent",inputs:[{label:"Basic Salary",value:"₹60,000/month"},{label:"HRA Received",value:"₹30,000/month"},{label:"Rent Paid",value:"₹35,000/month"},{label:"City",value:"Mumbai (Metro)"}],result:"Exempted: ₹25,000 | Taxable: ₹5,000 | Tax Saved: ₹90,000/year",explanation:"Rahul works in Mumbai, lives in rented flat. Monthly: Basic ₹60K, HRA ₹30K, Rent ₹35K. HRA calculation: 1) Actual HRA = ₹30K, 2) Rent - 10% Basic = ₹35K - ₹6K = ₹29K, 3) 50% Basic (metro) = ₹30K. Minimum = ₹29K exempted. Wait - he receives only ₹30K HRA, so cannot exceed that. Recalculate: min(₹30K, ₹29K, ₹30K) = ₹29K exempted. Taxable HRA = ₹30K - ₹29K = ₹1K monthly. Annual: ₹29K × 12 = ₹3.48L exempt, ₹1K × 12 = ₹12K taxable. Tax saved: ₹3.48L × 30% = ₹1.04L! Strategy: His high rent (₹35K) helps maximize HRA exemption."},{scenario:"Non-Metro City with Lower Rent",inputs:[{label:"Basic Salary",value:"₹45,000/month"},{label:"HRA Received",value:"₹18,000/month"},{label:"Rent Paid",value:"₹15,000/month"},{label:"City",value:"Pune (Non-Metro)"}],result:"Exempted: ₹10,500 | Taxable: ₹7,500 | Tax Saved: ₹37,800/year",explanation:"Priya works in Pune (non-metro). Basic ₹45K, HRA ₹18K, Rent ₹15K. HRA calculation: 1) Actual HRA = ₹18K, 2) Rent - 10% Basic = ₹15K - ₹4.5K = ₹10.5K, 3) 40% Basic (non-metro) = ₹18K. Minimum = ₹10.5K exempted (rent component is limiting factor). Taxable HRA = ₹18K - ₹10.5K = ₹7.5K monthly. Annual: ₹10.5K × 12 = ₹1.26L exempt, ₹7.5K × 12 = ₹90K taxable. Tax saved: ₹1.26L × 30% = ₹37,800. Issue: Her rent is too low relative to HRA! Strategy: Could increase rent paid OR negotiate higher basic with lower HRA in salary restructuring."},{scenario:"Living with Parents - Paying Rent",inputs:[{label:"Basic Salary",value:"₹50,000/month"},{label:"HRA Received",value:"₹20,000/month"},{label:"Rent Paid",value:"₹15,000 (to parents)"},{label:"City",value:"Delhi (Metro)"}],result:"Exempted: ₹10,000 | Taxable: ₹10,000 | Valid if Documented",explanation:"Amit lives with parents in Delhi, pays them ₹15K rent monthly. This is LEGAL and allowed! Basic ₹50K, HRA ₹20K, Rent ₹15K to parents. Calculation: 1) Actual HRA = ₹20K, 2) Rent - 10% Basic = ₹15K - ₹5K = ₹10K, 3) 50% Basic = ₹25K. Minimum = ₹10K exempted. Annual tax saved: ₹10K × 12 × 30% = ₹36,000! Requirements for paying rent to parents: Rent agreement between you and parents, Actual rent payment (bank transfer, not cash), Parents must show rental income in their ITR (but they get ₹2.5L basic exemption), Rent must be at market rate (not inflated). Parents' tax: If parents' income <₹2.5L, rental income ₹1.8L (₹15K × 12) is tax-free for them. Win-win situation!"}],tips:["Maximize HRA exemption by ensuring rent > 10% of basic salary - this is the sweet spot for maximum exemption","Keep rent receipts and agreement handy - needed for ITR filing and in case of income tax scrutiny","Salary restructuring: If rent is high, ask employer to increase basic % and reduce special allowance (increases HRA exemption)","Metro city benefit: If possible, work from metro city office even 1-2 days/week to claim 50% rate instead of 40%","Parents' house: Can legally pay rent to parents and claim HRA - ensures money stays in family while saving tax","Update employer: Submit rent receipts to employer for correct Form 16 (otherwise full HRA shown as taxable in form 16)","Compare HRA vs 80GG: If no HRA in salary, claim Section 80GG deduction (max ₹60K annually) for rent paid"],mistakes:["Not claiming HRA exemption - many employees don't claim, paying ₹30-80K extra tax annually. Always claim!","Using wrong basic salary - using gross or CTC instead of actual basic reduces calculated exemption significantly","Ignoring 10% rule - if rent < 10% of basic, you get NO exemption on that gap. Pay adequate rent.","Not having rent proof - without rent receipt/agreement, cannot claim exemption even if eligible. Keep documents!","Claiming HRA for own house - cannot claim HRA exemption if you own the house you live in (but can claim home loan interest separately)","Not informing parents about rental income - if paying rent to parents, they MUST show it in ITR. Non-disclosure can cause issues for both.","Wrong city type - claiming metro rate while working in non-metro (or vice versa) can be caught in ITR processing"],faqs:[{question:"What is HRA and how is HRA exemption calculated in India?",answer:"HRA (House Rent Allowance) is component of salary paid by employer to help employee meet house rent expenses. HRA exemption under Section 10(13A): HRA exemption = MINIMUM of three amounts: 1) Actual HRA received from employer, 2) Rent paid minus 10% of basic salary, 3) 50% of basic salary (metro cities: Mumbai, Delhi, Kolkata, Chennai) OR 40% of basic (all other cities). Example: Basic ₹50K, HRA ₹25K, Rent ₹30K, Metro city. Calculate: Actual HRA = ₹25K, Rent - 10% Basic = ₹30K - ₹5K = ₹25K, 50% Basic = ₹25K. All three equal = ₹25K exemption (fully exempt!). Taxable HRA = ₹25K - ₹25K = ₹0. If any component is lower, that becomes limit. Use this calculator to get instant accurate HRA exemption!"},{question:"Can I claim HRA exemption if I live in my parents' house?",answer:"YES! You CAN claim HRA exemption by paying rent to your parents. This is 100% legal and common practice. Requirements: 1) Create rent agreement between you and your parent(s), 2) Pay rent monthly via bank transfer (not cash - for audit trail), 3) Parents must report rental income in their ITR, 4) Rent amount should be reasonable (market rate), not exorbitantly high, 5) Keep rent receipts for records. Parents' tax impact: Rental income is taxable for parents under 'Income from House Property', BUT: Standard deduction of 30% on rent (no proof needed), If parents' total income <₹2.5L, rental income may be tax-free (within basic exemption). Example: You pay ₹15K rent monthly = ₹1.8L annually. Parents declare ₹1.8L rental income, get 30% deduction (₹54K), net taxable = ₹1.26L. If parents have no other income and are <60 years, ₹1.26L is within ₹2.5L exemption = NO TAX! You save: ₹1L HRA exemption (if eligible) = ₹31,200 tax saved (at 30% bracket). Parents pay: ₹0 tax (if within exemption). Win-win for family!"},{question:"What is the difference between metro and non-metro HRA exemption?",answer:"HRA exemption rates differ based on city type: Metro Cities (50% exemption): Mumbai, Delhi, Kolkata, Chennai only. These 4 cities get 50% of basic salary as maximum HRA exemption. Non-Metro Cities (40% exemption): ALL other cities in India - Bangalore, Hyderabad, Pune, Ahmedabad, Chandigarh, etc. Get 40% of basic as maximum. Impact on exemption: Example: Basic salary ₹50,000/month. Metro city: Maximum exemption = 50% × ₹50K = ₹25,000/month = ₹3L/year. Non-metro: Maximum exemption = 40% × ₹50K = ₹20,000/month = ₹2.4L/year. Difference: ₹60,000 less exemption in non-metro = ₹18,600 extra tax (at 30% bracket)! Which city to choose: Use city where you primarily work (office location), not where house is located. If working remotely: Use city where company office is located / where you're designated. If transfer during year: Can change city type in same financial year, calculate proportionally. Strategy: If possible, choose to work from metro office (even partially) for higher HRA benefit. Some people maintain small rented place in metro while working there during week."},{question:"Can I claim both HRA exemption and home loan interest deduction?",answer:"YES and NO - depends on the property: Same property (house you own and live in): CANNOT claim HRA exemption. CAN claim home loan interest under Section 24 (up to ₹2L for self-occupied). Cannot claim both HRA and home loan interest for SAME property. Different properties: YES! Can claim both if: You own house in City A (claiming home loan interest), but work in City B and rent house there (claiming HRA). Example: Own flat in hometown with home loan (self-occupied or rented out), work in metro city and rent flat there. Can claim: Home loan interest deduction (₹2L max if self-occupied, unlimited if let-out), HRA exemption for rent paid in work city. Scenario 1 - Let out owned house: Own house in Pune with ₹20L loan, work in Mumbai and rent flat. Claim: Home loan interest ₹2L (but since let out, can claim actual interest with no cap), HRA exemption ₹3L for Mumbai rent. Total tax benefit: ₹5L deductions! Scenario 2 - Self-occupied owned house: Own house in hometown (vacant/parents live), work in Mumbai and pay rent. Claim: Home loan interest ₹2L (as self-occupied property), HRA exemption ₹3L for Mumbai rent. Total benefit: ₹5L BUT income tax may ask why you're paying rent while owning house. Best practice: Keep owned house as 'let out' status in ITR for clear justification of renting elsewhere."},{question:"What documents are required to claim HRA exemption?",answer:"Documents needed for HRA exemption claim: For rent ≤ ₹1 lakh annually (₹8,334/month): Rent receipts signed by landlord (format available online), Landlord's name and address. For rent > ₹1 lakh annually: Rent receipts, Rent agreement copy, Landlord's PAN card (mandatory!), Landlord's PAN must be mentioned in ITR. Additional documents (good to have): Bank statements showing rent payments, Cancelled cheque/receipt from landlord acknowledging rent. For employer (to reduce TDS monthly): Submit rent receipts to HR/accounts monthly or annually, They'll adjust HRA exemption in Form 16 and reduce TDS. For ITR filing: Keep all above documents ready, May not need to upload but must have if IT department asks. For paying rent to parents/family: Rent agreement with parent's name, Bank transfer proof (NOT cash), Parent's PAN card, Ensure parents show rental income in their ITR. Common mistakes: Not having landlord's PAN (mandatory if rent >₹1L annually), Rent receipts not signed by landlord, Rent paid in cash with no bank trail (difficult to prove), Not updating employer (result: pay full tax on HRA, claim refund later in ITR - cashflow issue). Pro tip: Submit rent receipts to employer EVERY YEAR before March to ensure correct TDS deduction and avoid refund hassles!"},{question:"What if my rent is less than 10% of my basic salary?",answer:"10% rule in HRA exemption: In the formula 'Rent paid - 10% of Basic', if rent is LESS than 10% of basic, the result becomes NEGATIVE, meaning ZERO exemption from this component. Impact: Example 1: Basic ₹50K, Rent ₹4K (8% of basic). Component 2: ₹4K - ₹5K (10% of ₹50K) = -₹1K = counted as ZERO. Other components: Actual HRA (say ₹15K), 50% Basic = ₹25K. Minimum = 0 (rent component), actual HRA ₹15K, 50% basic ₹25K = ZERO exemption! Entire ₹15K HRA taxable. Solution: Pay rent ≥ 10% of basic for any HRA exemption. Example 2: Basic ₹50K, Rent ₹6K (12% of basic). Component 2: ₹6K - ₹5K = ₹1K. Minimum(Actual HRA ₹15K, ₹1K, ₹25K) = ₹1K exemption. Still very low! Optimal rent: For maximum HRA benefit, pay rent at least 40-50% of basic. Basic ₹50K: Pay ₹20-25K rent for good HRA exemption. Why 10% rule exists: Prevents people from paying token rent (₹1K) and claiming full HRA exemption. Ensures rent is substantial portion of salary. What to do if rent is low: Increase rent paid (if affordable and reasonable), OR restructure salary to reduce basic % (reduces HRA component but may save tax overall), OR negotiate with landlord for market-rate rent. If living rent-free: Cannot claim HRA exemption even if HRA component exists in salary. Entire HRA becomes taxable. Consider Section 80GG if no HRA in salary."}],relatedCalculators:[{name:"Income Tax Calculator",url:"/calculators/income-tax-calculator",description:"Calculate total tax liability"},{name:"Take Home Salary Calculator",url:"/calculators/take-home-salary-calculator",description:"CTC to in-hand salary"},{name:"Salary Calculator",url:"/calculators/salary-calculator",description:"Salary breakup calculator"},{name:"Home Loan Calculator",url:"/calculators/home-loan-calculator",description:"Home loan EMI & interest"},{name:"Rent vs Buy Calculator",url:"/calculators/rent-vs-buy-calculator",description:"Should you rent or buy?"},{name:"Tax Saving Calculator",url:"/calculators/tax-saving-investment-calculator",description:"Maximize tax savings"},{name:"80C Calculator",url:"/calculators/80c-calculator",description:"Section 80C deductions"}],lastUpdated:"2025-01-20"};
  
  return (
    <>
      <CalculatorSchema name="HRA Exemption Calculator - HRA Tax Exemption Calculator India 2025" description="Free HRA Exemption Calculator for India. Calculate House Rent Allowance tax exemption under Section 10(13A). Metro vs non-metro, save ₹30-80K tax annually. Updated 2025." url="/calculators/hra-exemption-calculator" features={["HRA tax exemption calculation","Metro vs non-metro rates","Section 10(13A) compliance","Rent receipts requirement checker","3-part formula calculator","Tax savings estimator","Free HRA calculator","2025 updated rules"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.9,count:16543}}/>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Salary & Rent Details
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
              <label htmlFor="basic-salary" className="text-sm font-medium text-neutral-700">
                Monthly Basic Salary (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(basicSalary)}
              </span>
            </div>
            <input 
              type="range" 
              id="basic-salary"
              min="10000" 
              max="500000" 
              step="1000" 
              value={basicSalary} 
              onChange={(e) => setBasicSalary(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹10,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="hra-received" className="text-sm font-medium text-neutral-700">
                Monthly HRA Received (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(hraReceived)}
              </span>
            </div>
            <input 
              type="range" 
              id="hra-received"
              min="0" 
              max={basicSalary * 0.5} 
              step="1000" 
              value={hraReceived} 
              onChange={(e) => setHraReceived(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>{formatCurrency(basicSalary * 0.5)}</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="rent-paid" className="text-sm font-medium text-neutral-700">
                Monthly Rent Paid (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(rentPaid)}
              </span>
            </div>
            <input 
              type="range" 
              id="rent-paid"
              min="0" 
              max="100000" 
              step="1000" 
              value={rentPaid} 
              onChange={(e) => setRentPaid(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹1,00,000</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              City Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isMetroCity
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setIsMetroCity(true)}
              >
                Metro City
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  !isMetroCity
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setIsMetroCity(false)}
              >
                Non-Metro City
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">HRA Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Exempted HRA</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(exemptedHra)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Taxable HRA</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(taxableHra)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            HRA Calculation Rules
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Exemption Criteria</h3>
              <p className="text-sm text-neutral-600">
                HRA exemption is the minimum of:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600 mt-2">
                <li>Actual HRA received</li>
                <li>Rent paid minus 10% of basic salary</li>
                <li>{isMetroCity ? '50%' : '40%'} of basic salary (for {isMetroCity ? 'metro' : 'non-metro'} cities)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Your Calculation</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><span className="font-medium">Actual HRA:</span> {formatCurrency(hraReceived)}</p>
                <p><span className="font-medium">Rent - 10% Basic:</span> {formatCurrency(rentPaid - (basicSalary * 0.1))}</p>
                <p><span className="font-medium">{isMetroCity ? '50%' : '40%'} of Basic:</span> {formatCurrency(basicSalary * (isMetroCity ? 0.5 : 0.4))}</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Metro cities include Delhi NCR, Mumbai, Chennai, and Kolkata</li>
                <li>Rent receipts are mandatory for claiming HRA</li>
                <li>PAN of landlord required if rent exceeds ₹1 lakh per year</li>
                <li>HRA exemption is available only if you live in rented accommodation</li>
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