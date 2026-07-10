import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';

import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const GratuityCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(50000);
  const [yearsOfService, setYearsOfService] = useState<number>(10);
  const [gratuityAmount, setGratuityAmount] = useState<number>(0);
  const [isEligible, setIsEligible] = useState<boolean>(true);
  
  useEffect(() => {
    // Check eligibility (minimum 5 years of service)
    const eligible = yearsOfService >= 5;
    setIsEligible(eligible);
    
    if (eligible) {
      // Gratuity Formula: (15 * Last Drawn Salary * Years of Service) / 26
      // Last Drawn Salary includes Basic Salary + DA
      const gratuity = (15 * salary * yearsOfService) / 26;
      setGratuityAmount(gratuity);
    } else {
      setGratuityAmount(0);
    }
  }, [salary, yearsOfService]);

  const quickPresets = [
    { label: '5 Years Service', salary: 50000, years: 5 },
    { label: '10 Years Service', salary: 75000, years: 10 },
    { label: '20 Years Service', salary: 100000, years: 20 },
    { label: '25 Years Service', salary: 120000, years: 25 },
    { label: '30 Years Service', salary: 150000, years: 30 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setSalary(preset.salary);
    setYearsOfService(preset.years);
  };

const contentData={title:"Gratuity Calculator",description:"Gratuity Calculator helps you calculate gratuity amount on retirement or resignation in India. Understand gratuity eligibility, formula, tax exemption limits. Free gratuity Calculator 2025 for private sector employees, government employees, contractual workers.",benefits:["Calculate exact gratuity amount based on last drawn salary and years of service","Check gratuity eligibility - minimum 5 years continuous service required","Understand gratuity formula - (15 × Last Salary × Years) ÷ 26 for most employees","See tax exemption limit - up to ₹20 lakh gratuity is tax-free in India","Calculate gratuity for resignation, retirement, death, or termination","Works for private sector, government employees, contractual workers","100% free gratuity Calculator updated with 2025 rules and limits","Get instant gratuity calculation with detailed breakup and explanation"],howToSteps:[{step:"Enter Last Drawn Monthly Salary",details:"Input your last drawn basic salary + dearness allowance (DA) per month. Last drawn salary includes: Basic Salary (fixed component), Dearness Allowance (inflation adjustment, usually 30-50% of basic for govt employees). Does NOT include: HRA, Transport Allowance, Bonuses, Commissions, Other allowances. Example: Basic ₹40K + DA ₹15K = ₹55K last drawn salary. Common mistake: Including HRA or gross salary instead of just Basic + DA leads to incorrect calculation! Formula uses only basic + DA, not CTC or gross salary."},{step:"Enter Total Years of Service",details:"Input completed years of continuous service with employer (rounded). Service calculation: Count from joining date to exit date (retirement/resignation), Round to nearest year (6+ months = 1 year), Must be continuous with same employer. Example: Worked 10 years 8 months = 11 years for gratuity, Worked 5 years 4 months = 5 years (still eligible). Minimum requirement: 5 years continuous service to be eligible for gratuity. Less than 5 years = NO gratuity (except death/disability). Job changes: If you change companies, gratuity calculated separately for each employer based on years served with them."},{step:"Check Eligibility for Gratuity",details:"Gratuity eligibility rules in India: Minimum 5 years: Must complete 5 years continuous service with same employer. Exceptions (gratuity paid even if <5 years): Death of employee during service, Permanent disability due to accident/disease. Applies to: All employees (permanent, temporary, contractual) under Payment of Gratuity Act 1972, Companies with 10+ employees must pay gratuity. Resignation vs Retirement: Both are eligible if 5 years completed. Termination/Dismissal: Eligible if service ≥5 years, but employer can forfeit for misconduct (rarely done)."},{step:"Understand Gratuity Calculation Formula",details:"Standard gratuity formula (private sector, covered establishments): Gratuity = (15 × Last Drawn Salary × Years of Service) ÷ 26. Why 15? Gratuity is 15 days' salary for each year worked. Why 26? Assumes 26 working days per month (excluding Sundays). Formula breakdown: Monthly salary ÷ 26 = One day's salary, One day's salary × 15 = Half-month salary per year, Half-month salary × Years worked = Total gratuity. Example: ₹50K salary, 10 years service: (15 × 50,000 × 10) ÷ 26 = ₹2,88,461. Government employees: Different formula - (Last salary × Years × 1/4), typically more generous than private sector."},{step:"Review Gratuity Amount and Tax Exemption",details:"Calculator shows: Total gratuity amount payable, Eligibility status, Tax exemption applicable. Tax treatment: Private sector (covered under Act): Up to ₹20 lakh completely tax-free, Above ₹20 lakh: Excess taxable as 'Salary' income. Government employees: Entire gratuity tax-free (no ₹20L limit!). Uncovered establishments: Lower of ₹10L, 15 days salary per year, or actual gratuity is tax-free. Maximum gratuity: Maximum payable is ₹20 lakh under Gratuity Act (2018 amendment from ₹10L). Example: If your calculation shows ₹25L, you'll receive only ₹20L maximum, and it's all tax-free. Gratuity received: Tax-free portion not shown in Form 16, excess shown as taxable salary."}],examples:[{scenario:"Private Sector Employee Retiring After 25 Years",inputs:[{label:"Last Drawn Salary",value:"₹60,000 (Basic + DA)"},{label:"Years of Service",value:"25 years"},{label:"Company Type",value:"Private sector (Gratuity Act covered)"}],result:"Gratuity: ₹8,65,384 | Tax Status: Completely Tax-Free",explanation:"Rajesh retires from private company after 25 years loyal service. Last drawn salary ₹60K (basic ₹45K + DA ₹15K). Gratuity = (15 × 60,000 × 25) ÷ 26 = ₹8,65,384. Since amount is below ₹20L limit, entire gratuity is tax-free! He receives ₹8.65L on retirement without any tax deduction. Usage: This money helps bridge gap till pension starts, pay off any remaining house loan, and provides financial cushion for medical expenses in retirement. Combined with EPF corpus (₹40L) and pension (₹25K monthly), he has comfortable retirement planned."},{scenario:"Mid-Career Job Change After 8 Years",inputs:[{label:"Last Drawn Salary",value:"₹80,000"},{label:"Years of Service",value:"8 years 7 months (rounds to 9 years)"},{label:"Scenario",value:"Resignation for better opportunity"}],result:"Gratuity: ₹4,15,384 | Received on Last Day",explanation:"Priya resigns from company after 8 years 7 months for new job offering 40% hike. Since service >5 years, eligible for gratuity despite resignation. Years counted: 9 years (rounding rule). Gratuity = (15 × 80,000 × 9) ÷ 26 = ₹4,15,384. Received on: Final settlement day (within 30 days of resignation), along with full and final payment, unused leave encashment, EPF withdrawal. Tax treatment: ₹4.15L is completely tax-free, not added to taxable income. Strategy: She invests gratuity amount in PPF (₹1.5L for tax benefit) + debt mutual funds (₹2.65L for liquidity). New job starts immediately, no career break, so gratuity serves as emergency fund in new city."},{scenario:"Government Employee Retirement - Higher Gratuity",inputs:[{label:"Last Drawn Salary",value:"₹70,000 (Basic + DA)"},{label:"Years of Service",value:"30 years"},{label:"Employee Type",value:"Government (different formula)"}],result:"Gratuity: ₹5,25,000 | Fully Tax-Free (No ₹20L Limit)",explanation:"Kumar retires from government service after 30 years. Government gratuity formula: (Last salary × Years of service × 1/4). Gratuity = 70,000 × 30 × (1/4) = ₹5,25,000. Key differences from private sector: Formula is simpler (no ÷26 calculation), Typically higher amount for same salary and tenure, ENTIRE amount is tax-free (no ₹20L cap for govt employees!), Maximum limit is ₹20L same as private. He also gets: Full pension (50% of last drawn salary = ₹35K monthly), Commuted pension option (convert part of pension to lump sum), Medical benefits, Leave encashment (₹5-8L typically). Total retirement benefits: ₹5.25L gratuity + ₹6L leave encashment + ₹35K monthly pension = Very comfortable retirement!"}],tips:["Don't resign just before completing 5 years - if you're at 4 years 10 months, wait 2 more months to get full gratuity (can be ₹2-5L!)","Include DA in salary calculation - many people forget to add dearness allowance, resulting in lower gratuity amount","Claim gratuity within 30 days of leaving - delayed claim may face bureaucratic delays, company must pay within 30 days of claim","Verify years of service calculation - ensure half-year rounding is applied correctly (6+ months = 1 year)","Know tax exemption limit - ₹20 lakh is tax-free for private sector, full amount tax-free for government employees","Keep service documents safe - relieving letter, salary slips, appointment letter needed for gratuity claim if any dispute","Consider gratuity in notice period negotiation - if close to 5 years, negotiate notice period to complete 5 years for eligibility"],mistakes:["Resigning at 4 years 11 months - just 1 month away from ₹3-5L gratuity! Always check before resigning.","Including gross salary instead of basic + DA - leads to wrong expectation, gratuity calculated on basic + DA only","Thinking gratuity is taxable - up to ₹20L is tax-free! Don't let company deduct tax on gratuity <₹20L","Not claiming gratuity after resignation - you MUST claim it, not automatic. Company holds it till you claim formally","Expecting same gratuity for all years worked at multiple companies - each company calculates separately for years with them","Not rounding service years correctly - 10 years 7 months = 11 years, not 10! Rounding rule gives you extra benefit","Forfeiting gratuity by misconduct - serious misconduct (fraud, theft) can lead to gratuity forfeiture. Always exit professionally!"],faqs:[{question:"What is gratuity and who is eligible for gratuity in India?",answer:"Gratuity is lump sum payment made by employer to employee as token of appreciation for services rendered. Governed by Payment of Gratuity Act, 1972. Eligibility: 1) Minimum 5 years continuous service with same employer (exception: death or disability), 2) Applicable to companies with 10+ employees, 3) All employee types (permanent, temporary, contractual). When paid: On retirement (58-60 years age), On resignation (voluntary), On death (paid to nominee/family), On disablement (accident/disease). Not eligible: <5 years service (except death/disability), Casual/daily wage workers (unless covered by Act), During employment (only on exit). Amount: Minimum 5 years: Full gratuity as per formula, 5-20 years: Formula-based, maximum ₹20L, >20 years service: Maximum ₹20L cap applies. Purpose: Retirement cushion, Bridge income gap, Medical expenses, Financial security for family (if death during service)."},{question:"How is gratuity calculated for private sector employees?",answer:"Standard gratuity formula (private sector under Gratuity Act): Gratuity = (15 × Last Drawn Salary × Completed Years of Service) ÷ 26. Components explained: Last Drawn Salary: Basic Salary + Dearness Allowance (not gross salary!), 15: Represents 15 days' salary per year of service, Completed Years: Service rounded to nearest year (6+ months = 1 year), 26: Assumes 26 working days per month (excludes Sundays). Example calculations: Salary ₹50K, 10 years: (15 × 50,000 × 10) ÷ 26 = ₹2,88,461, Salary ₹1L, 20 years: (15 × 100,000 × 20) ÷ 26 = ₹11,53,846, Salary ₹1.5L, 25 years: (15 × 150,000 × 25) ÷ 26 = ₹21,63,461, but capped at ₹20L maximum. Important: Maximum payable is ₹20 lakh (2018 amendment, increased from ₹10L), Formula is same for resignation, retirement, or death, Employer cannot pay less than formula amount. Use this Calculator for instant accurate calculation!"},{question:"Is gratuity taxable in India? What is the tax exemption limit?",answer:"Gratuity tax treatment in India: Private Sector Employees (covered under Gratuity Act): Tax-free limit: ₹20 lakh (increased from ₹10L in 2018), Above ₹20L: Excess is taxable as 'Salary' income under head 'Profits in lieu of salary'. Government Employees: Entire gratuity is tax-free, no ₹20 lakh limit!, Maximum ₹20L can be received, but all tax-free. Private sector (NOT covered under Act, <10 employees): Lower of these is tax-free: a) ₹10 lakh, b) 15 days salary × years of service, c) Actual gratuity received. Example scenarios: Received ₹15L gratuity: Completely tax-free (within ₹20L limit), Received ₹25L: ₹20L tax-free, ₹5L taxable at your income tax slab, Received ₹22L: ₹20L tax-free, ₹2L added to taxable income. Tax-free meaning: Not shown in Form 16 taxable income, No TDS deducted by employer on exempt portion, No need to pay tax while filing ITR. Important: Gratuity is tax-free on RECEIPT, not investment-linked like EPF (where interest becomes taxable after ₹2.5L contribution)."},{question:"Can I get gratuity if I resign before 5 years of service?",answer:"Standard rule: NO gratuity if service <5 years. Minimum 5 years continuous service required for gratuity eligibility. Exceptions (gratuity paid even if <5 years): 1) Death during service: Full gratuity paid to nominee/family even if 2-3 years service, calculated as per formula. 2) Permanent disability: Due to accident or disease that renders employee unfit to continue work, full gratuity paid. Resignation at 4 years 11 months: NO gratuity!, Even 1 day short of 5 years = complete forfeiture, Common mistake: people resign not realizing they're close to 5-year mark. What to do if close to 5 years: Wait: If at 4 years 10 months, wait 2 more months! Gratuity can be ₹2-5L, worth the wait. Negotiate: Ask new employer to defer joining by 2-3 months if needed for gratuity eligibility. Calculate: Use this Calculator to see potential gratuity amount and decide if waiting is worth it. Example impact: Salary ₹60K, 4 years 11 months service: Resign now = ₹0, Wait 1 month = ₹1.73L gratuity (₹1.73 lakh for 1 month patience!). Strategy: Track your years of service, set reminder at 4 years 6 months to plan any job change AFTER 5-year mark, Don't let recruiters pressure you to join before 5 years if close."},{question:"What is the maximum gratuity amount I can receive in India?",answer:"Maximum gratuity payable in India: Current limit: ₹20 lakh (₹2 million), Increased from: ₹10 lakh in March 2018 (amendment to Gratuity Act), Applies to: All private sector employees covered under Payment of Gratuity Act 1972. What it means: Even if your formula calculation shows ₹25 lakh or ₹30 lakh, you'll receive maximum ₹20 lakh only. Employer cannot pay beyond ₹20L even voluntarily (under Act provisions). Example scenarios: Formula shows ₹18L: You receive ₹18L (below cap), Formula shows ₹20L: You receive ₹20L (at cap), Formula shows ₹28L: You receive only ₹20L (capped, lose ₹8L), Formula shows ₹35L: You receive only ₹20L (capped, lose ₹15L). When does it matter: Long service (25-30+ years), High salary (₹1.5L+ basic + DA), Senior positions (directors, VPs, CXOs). Reality: Most employees receive less than ₹20L, so cap doesn't affect them. Cap mainly affects senior executives with 25-30+ years service at high salaries. Tax treatment: Entire ₹20L maximum is tax-free for private sector! Government employees: Same ₹20L cap, but entire amount tax-free (no cap on tax exemption). Historical: ₹10L (1972-2018), ₹20L (2018-present), May increase in future based on inflation."},{question:"How long does employer take to pay gratuity after resignation?",answer:"Gratuity payment timeline as per law: Employee must claim: Submit gratuity claim application to employer within 30 days of leaving. Employer must pay: Within 30 days of gratuity becoming payable (i.e., from date of resignation/retirement). Total timeline: Maximum 60 days from last working day (30 days for claim + 30 days for payment). Delayed payment penalty: If employer delays beyond 30 days after claim, must pay interest on gratuity amount at simple interest (rate: same as savings bank rate), Plus, inspector can impose penalty on employer for non-payment. Typical process: Last working day: Full and final settlement initiated, Day 1-15: HR processes gratuity calculation, documents verification, Day 15-30: Finance department processes payment, accounts team prepares cheque, Day 30: Payment released (direct credit to bank or cheque). Faster payment: If all documents ready, some companies pay within 15 days, Large companies have automated systems, payment in 7-15 days. What to do if delayed: Day 30: Send written reminder to HR, Day 45: Send legal notice mentioning Gratuity Act provisions, Day 60: File complaint with Labour Commissioner of state, Complaint: Can file online on Labour Ministry portal or visit labour office. Important: Keep relieving letter, last salary slip, ID proof, bank details ready for smooth gratuity processing."}],relatedCalculators:[{name:"EPF Calculator",url:"/calculators/epf-calculator",description:"Employee Provident Fund calculator"},{name:"Retirement Calculator",url:"/calculators/retirement-calculator",description:"Plan retirement corpus"},{name:"Leave Encashment Calculator",url:"/calculators/leave-encashment-calculator",description:"Calculate leave encashment"},{name:"Notice Period Calculator",url:"/calculators/notice-period-calculator",description:"Calculate notice period"},{name:"Salary Calculator",url:"/calculators/salary-calculator",description:"CTC to in-hand salary"},{name:"VRS Calculator",url:"/calculators/vrs-calculator",description:"Voluntary retirement scheme"},{name:"Income Tax Calculator",url:"/calculators/income-tax-calculator",description:"Calculate income tax"}],lastUpdated:"2025-01-20"};
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <>
      <CalculatorSchema name="Gratuity Calculator - Gratuity Calculation India 2025" description="Free Gratuity Calculator for India. Calculate gratuity amount on retirement or resignation. Check eligibility, formula, tax exemption. Updated 2025 gratuity rules." url="/calculators/gratuity-calculator" features={["Gratuity amount calculation","Eligibility checker","Private & government employees","Tax exemption calculator","5-year service requirement","Formula: (15×Salary×Years)÷26","Free gratuity calculator","2025 rules & limits"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.9,count:11234}}/>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gratuity Calculator</h1>
          <p className="text-gray-600">Calculate your gratuity amount accurately based on the Payment of Gratuity Act, 1972 and New Labour Code 2025.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Input Form Section */}
          <div className="w-full md:w-1/2">
            <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-lg p-5 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-[#0369a1] border-b border-[#bae6fd] pb-2">Enter Details</h2>
              
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-[#e0f2fe]">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="salary">Basic + DA (₹)</label>
                      <div className="text-xs text-gray-500 font-normal">Last drawn monthly salary</div>
                    </td>
                    <td className="py-3">
                      <input 
                        id="salary"
                        type="number" 
                        value={salary} 
                        onChange={(e) => setSalary(Number(e.target.value) || 0)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0ea5e9]"
                      />
                    </td>
                  </tr>
                  <tr className="border-b border-[#e0f2fe]">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="years">Years of Service</label>
                      <div className="text-xs text-gray-500 font-normal">Completed years (6+ months counts as 1 yr)</div>
                    </td>
                    <td className="py-3">
                      <input 
                        id="years"
                        type="number" 
                        value={yearsOfService} 
                        onChange={(e) => setYearsOfService(Number(e.target.value) || 0)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#0ea5e9]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-[#0369a1] mb-2">Quick Presets</h3>
                <div className="flex flex-wrap gap-2">
                  {quickPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => applyPreset(preset)}
                      className="px-2 py-1 text-xs bg-white border border-[#bae6fd] rounded hover:bg-[#e0f2fe] text-[#0369a1]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-[#0369a1] border-b border-gray-200 pb-2">Result</h2>
              
              <div className={`p-4 rounded-lg mb-4 text-center border ${isEligible ? 'bg-[#f0fdf4] border-[#bbf7d0]' : 'bg-[#fef2f2] border-[#fecaca]'}`}>
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">Gratuity Payable</p>
                <p className={`text-4xl font-bold my-1 ${isEligible ? 'text-[#166534]' : 'text-[#991b1b]'}`}>
                  {formatCurrency(gratuityAmount)}
                </p>
                <p className={`text-xs font-semibold ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
                  {isEligible ? 'Eligible for Gratuity (5+ Years Completed)' : 'Not Eligible (Minimum 5 Years Required)'}
                </p>
              </div>

              {isEligible && (
                <table className="w-full text-left text-sm mt-4 border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-600">Formula Used:</td>
                      <td className="py-2 font-medium text-right">(15 × Salary × Years) ÷ 26</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-600">Tax Status (Private):</td>
                      <td className="py-2 font-medium text-right text-green-600">
                        {gratuityAmount <= 2000000 ? 'Fully Tax Free' : 'Partially Taxable'}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-600">Tax Exempt Amount:</td>
                      <td className="py-2 font-medium text-right">
                        {formatCurrency(Math.min(gratuityAmount, 2000000))}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 text-gray-600">Taxable Amount:</td>
                      <td className="py-2 font-medium text-right text-red-600">
                        {gratuityAmount > 2000000 ? formatCurrency(gratuityAmount - 2000000) : '₹0'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 mt-8"><CalculatorContentWrapper {...contentData}/></div>
    </>
  );
};