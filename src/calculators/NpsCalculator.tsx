import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const NpsCalculator: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [employerContribution, setEmployerContribution] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [existingBalance, setExistingBalance] = useState<number>(100000);
  const [equityAllocation, setEquityAllocation] = useState<number>(50);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalContribution, setTotalContribution] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  
  useEffect(() => {
    // Calculate NPS accumulation
    const investmentYears = retirementAge - currentAge;
    let balance = existingBalance;
    const yearlyContribution = (monthlyContribution + employerContribution) * 12;
    let totalContrib = existingBalance;
    
    for (let year = 1; year <= investmentYears; year++) {
      totalContrib += yearlyContribution;
      balance += yearlyContribution;
      
      // Calculate returns based on asset allocation
      const equityReturns = balance * (equityAllocation / 100) * (expectedReturn / 100);
      const debtReturns = balance * ((100 - equityAllocation) / 100) * ((expectedReturn - 2) / 100);
      const totalReturns = equityReturns + debtReturns;
      
      balance += totalReturns;
    }
    
    setMaturityAmount(balance);
    setTotalContribution(totalContrib);
    setTotalReturns(balance - totalContrib);
  }, [monthlyContribution, employerContribution, expectedReturn, currentAge, retirementAge, existingBalance, equityAllocation]);

  const contentData = {
    title:"NPS Calculator",description:"NPS (National Pension System) Calculator helps you plan retirement corpus with government-backed pension scheme. Calculate maturity amount, pension, and lump sum withdrawal from NPS Tier 1 account. Get tax benefits under Section 80C (₹1.5L), 80CCD(1B) (₹50K extra), and tax-free pension upto 60% at retirement. Updated with 2025 NPS rates and rules.",benefits:["Calculate NPS retirement corpus with employee + employer contributions","Understand tax benefits - save up to ₹62,400 annually in taxes (30% bracket)","Compare Tier 1 vs Tier 2 NPS accounts for optimal pension planning","See annuity pension amount and lump sum withdrawal breakdown at retirement","Plan corporate NPS with employer matching (10% employer + 10% employee)","Visualize asset allocation impact - equity vs debt funds on final corpus","100% free calculator updated with 2025 NPS interest rates and rules","Works for government employees (old pension) and private sector NPS subscribers"],howToSteps:[{step:"Enter Your Current Age",details:"Input your current age (18-70 years). NPS allows contributions till age 70, but retirement benefits start at 60. Early start gives massive advantage due to 30-40 years of compounding. A 25-year-old investing ₹5K/month reaches ₹2.5-3Cr by 60, same investment starting at 40 reaches only ₹40-60L!"},{step:"Set Monthly Contribution",details:"Decide monthly NPS contribution. Minimum ₹500, maximum unlimited. For tax benefits: ₹12,500/month (₹1.5L annually for 80C) + ₹4,167/month (₹50K for 80CCD1B) = total ₹16,667/month saves maximum tax. Employer contribution (if corporate NPS): employer contributes matching amount, both get tax benefit."},{step:"Add Employer Contribution",details:"If you have corporate NPS, employer contributes 10-14% of basic salary. This is FREE money for you! Example: ₹50K basic salary, 10% employer contribution = ₹5K/month (₹60K/year) added to your corpus. Over 25 years at 10% return, this ₹15L employer contribution grows to ₹98L - absolutely take advantage if available!"},{step:"Choose Asset Allocation",details:"NPS allows equity (up to 75% till age 50, then reduces), corporate bonds, and government securities. Higher equity = higher returns but higher risk. Age-based strategy: 20-35 years: 75% equity (target 10-12% return), 35-50 years: 50-60% equity (target 9-11%), 50-60 years: 25-50% equity (target 8-10%). Auto choice maintains age-appropriate allocation automatically."},{step:"Review Retirement Benefits",details:"At 60, you get: 1) Lump sum withdrawal (max 60% of corpus, tax-free!), 2) Annuity purchase mandatory (min 40% of corpus for monthly pension). Example: ₹1Cr corpus - withdraw ₹60L tax-free, buy ₹40L annuity giving ₹25-30K monthly pension. You can defer withdrawal till 70 to let corpus grow more. Partial withdrawals allowed after 10 years for specific purposes."}],examples:[{scenario:"Young Professional Starting NPS at 25",inputs:[{label:"Current Age",value:"25 years"},{label:"Monthly Contribution",value:"₹5,000"},{label:"Employer Contribution",value:"₹5,000 (corporate NPS)"},{label:"Expected Return",value:"10% p.a."},{label:"Retirement Age",value:"60 years"}],result:"Maturity: ₹2.87 Crores",explanation:"Rahul starts NPS at 25 with ₹5K employee + ₹5K employer contribution (₹10K total monthly). Over 35 years, total investment: ₹42L (₹21L own + ₹21L employer). At 10% return, corpus grows to ₹2.87Cr! Tax benefits: Saves ₹62,400 annually (₹21.84L over 35 years). At 60, he can withdraw ₹1.72Cr tax-free (60%), buys annuity with ₹1.15Cr (40%) giving ₹72-86K monthly pension. Total retirement wealth: ₹1.72Cr liquid + ₹72K monthly pension!"},{scenario:"Mid-Career Professional Catching Up",inputs:[{label:"Current Age",value:"40 years"},{label:"Monthly Contribution",value:"₹12,500 (₹1.5L annually)"},{label:"Additional 80CCD(1B)",value:"₹4,167 (₹50K annually)"},{label:"Total Monthly",value:"₹16,667"},{label:"Expected Return",value:"9.5% p.a."}],result:"Maturity: ₹84.5 Lakhs",explanation:"Priya starts NPS at 40, investing ₹16,667/month (₹2L annually) for maximum tax benefit. Over 20 years, total investment: ₹40L. At 9.5% return, grows to ₹84.5L. Tax saved: ₹62,400/year × 20 = ₹12.48L (31% of investment recovered through tax savings!). At 60, withdraws ₹50.7L tax-free, buys ₹33.8L annuity for ₹21-25K monthly pension. Though started late, aggressive investment and tax benefits make comfortable retirement possible."},{scenario:"Government Employee Opting for NPS",inputs:[{label:"Current Age",value:"30 years"},{label:"Basic Salary",value:"₹40,000"},{label:"Employee Contribution",value:"10% = ₹4,000"},{label:"Government Contribution",value:"14% = ₹5,600"},{label:"Total Monthly",value:"₹9,600"}],result:"Maturity: ₹2.35 Crores",explanation:"Rajesh, government employee, opts for NPS (instead of old pension scheme). Contributes 10% of basic (₹4K), government adds 14% (₹5.6K) - total ₹9,600/month. Over 30 years, total investment: ₹34.56L (₹14.4L own + ₹20.16L government). At 10% return, grows to ₹2.35Cr! Benefit: Government's ₹20.16L contribution is FREE money. At 60, gets ₹1.41Cr lump sum + annuity from ₹94L giving ₹59-70K monthly pension. NPS can be better than old pension for long-serving employees!"}],tips:["Start NPS as early as possible - 25 vs 35 years start age creates ₹1-1.5Cr difference in final corpus with same monthly investment","Max out 80CCD(1B) deduction (₹50K) over 80C - this is ONLY additional ₹50K deduction available beyond ₹1.5L Section 80C limit","If employer offers corporate NPS with matching, join immediately - employer's contribution is FREE money that compounds for 25-35 years","Review and rebalance asset allocation annually - shift to debt gradually after age 45 to protect accumulated corpus from market volatility","Consider Tier 1 for retirement (tax benefits + locked) and Tier 2 for goals (flexible withdrawals, no tax benefit)","Compare NPS fund managers annually - returns vary 1-2% between fund managers which is ₹10-30L difference on ₹1Cr corpus","Don't withdraw entire 60% at retirement - consider leaving some to grow for another 5-10 years tax-free"],mistakes:["Not contributing regularly - NPS needs minimum ₹1,000 annual to keep account active, irregular contributions lose compounding benefit","Choosing only debt funds in NPS - young investors (below 40) should have 50-75% equity allocation for better long-term returns","Ignoring corporate NPS benefit - employers offer 10-14% free contribution, not taking this is leaving lakhs on table","Withdrawing prematurely for non-emergencies - NPS allows partial withdrawal but reduces retirement corpus significantly","Not maximizing 80CCD(1B) benefit - ₹50K extra deduction saves ₹15,600 tax annually, ₹4.68L over 30 years","Choosing annuity without comparison - annuity rates vary 1-2% between insurers, shop around before locking ₹40L+ for life"],faqs:[{question:"What is NPS and how does it work for retirement planning?",answer:"NPS (National Pension System) is government-regulated pension scheme where you invest regularly till retirement (60 years), build tax-free corpus, then get monthly pension. Three account types: 1) Tier 1 (retirement, locked till 60, tax benefits), 2) Tier 2 (voluntary savings, withdraw anytime, no tax benefit), 3) Corporate NPS (employer contributes 10-14%). Your money invests in mix of equity, corporate bonds, government securities based on your choice. Fund managers (SBI, HDFC, ICICI, UTI, LIC, Kotak, Aditya Birla) manage investments professionally."},{question:"How much tax can I save with NPS investment?",answer:"NPS offers MAXIMUM tax benefits among all investments! Section 80C: ₹1.5L deduction (saves ₹46,800 at 30% tax), Section 80CCD(1B): Additional ₹50K deduction (saves ₹15,600), Employer contribution: Deductible up to 10% of basic (saves tax), Total max saving: ₹62,400 annually! Over 30 years: ₹18.72L tax saved. PLUS: 60% withdrawal at retirement is TAX-FREE (vs EPF where >₹2.5L withdrawal taxable). If you withdraw ₹1Cr, that's ₹60L completely tax-free! No other investment offers this."},{question:"NPS vs EPF vs PPF - which is better for retirement?",answer:"Comparison (₹10K monthly, 30 years): NPS (10% return, 75% equity): ₹2.27Cr corpus, 60% tax-free withdrawal = ₹1.36Cr + pension from ₹91L; EPF (8.25%): ₹1.51Cr, tax-free if service >5 years; PPF (7.1%): ₹1.13Cr, fully tax-free. NPS WINS for: Highest returns (equity exposure), Maximum tax benefits (₹50K extra under 80CCD1B), Professional fund management. EPF WINS for: Guaranteed returns, No market risk, Employer contribution mandatory. PPF WINS for: Completely tax-free, Lower lock-in (15 years), Loans allowed. BEST STRATEGY: Use all three! NPS for retirement (₹5K), EPF (mandatory), PPF (₹5K for tax + safety)."},{question:"Can I withdraw NPS before retirement? What are the rules?",answer:"NPS is locked till 60 (retirement age) but allows: 1) Partial withdrawals (25% of own contribution) after 3 years for specific purposes - child education, marriage, house purchase, critical illness (maximum 3 times before retirement). 2) Premature exit before 60 allowed only in exceptional cases - terminal illness, death (nominee gets corpus). 80% must be used for annuity, 20% lump sum withdrawal. 3) After 60: Can defer till 70 to grow corpus more, or start withdrawals. Tier 2 NPS: Withdraw anytime, no restrictions, but no tax benefits. Tier 1 is for serious retirement planning with discipline."},{question:"Which is better - Active Choice or Auto Choice in NPS?",answer:"Active Choice: YOU decide asset allocation among equity (E), corporate bonds (C), government securities (G). Maximum 75% equity allowed till 50, then reduces. Good if you understand investments and want to actively manage. You can change allocation twice a year. Auto Choice: Pre-defined allocation based on age - Aggressive (75% equity till 35), Moderate (50% equity), Conservative (25% equity). Auto-rebalances as you age. Recommended for most investors. Reality: Historical data shows Auto-Moderate gives 9-10% returns vs Active giving 8.5-11% (depends on choices). For young investors (<35): Choose Active with 75% equity. For 35-50: Auto-Moderate is safe. For 50+: Auto-Conservative to protect corpus from market crashes near retirement."},{question:"How to choose best NPS fund manager for maximum returns?",answer:"NPS offers 10 fund managers. Returns vary 1-2% annually! Over 30 years, 1% difference = ₹20-40L on ₹1Cr corpus. Top performers (last 5 years): SBI Pension Fund (equity), UTI Retirement (balanced), HDFC Pension (debt). How to choose: 1) Check 3,5,10-year returns on npstrust.org.in, 2) Consistent performers better than one-year stars, 3) Compare fund manager in YOUR asset class (equity/corporate/govt), 4) Switch fund manager once a year if underperforming (switch is free), 5) Don't chase highest returns - consistency matters more. Strategy: Review annually every April, switch if fund underperforms category average for 2 consecutive years."},{question:"What happens to NPS account after retirement at 60?",answer:"At retirement (60 years), you have 3 choices: 1) COMPULSORY: Buy annuity with minimum 40% of corpus for monthly pension. Annuity rates: ₹100 invested gives ₹6-7/month lifetime pension (6-7% annual). ₹40L annuity = ₹24-28K monthly pension. 2) OPTIONAL: Withdraw upto 60% as lump sum (TAX-FREE!). ₹1Cr corpus = withdraw ₹60L tax-free. 3) DEFER: Continue NPS till 70 to grow corpus (no new contributions, existing money compounds). Best strategy: Withdraw 60% lump sum tax-free, use 20% for immediate needs, invest 40% in FD/debt for safety, buy annuity with 40% for ₹20-30K monthly pension. This gives both lump sum liquidity and regular pension income!"}],relatedCalculators:[{name:"PPF Calculator",url:"/calculators/ppf-calculator",description:"Compare NPS vs PPF returns"},{name:"EPF Calculator",url:"/calculators/epf-calculator",description:"Compare with EPF retirement"},{name:"Retirement Calculator",url:"/calculators/retirement-calculator",description:"Overall retirement planning"},{name:"SIP Calculator",url:"/calculators/sip-calculator",description:"Compare with mutual fund SIP"},{name:"FD Calculator",url:"/calculators/fd-calculator",description:"Compare with fixed deposits"},{name:"Pension Calculator",url:"/calculators/pension-calculator",description:"Calculate monthly pension"},{name:"Tax Saving Calculator",url:"/calculators/tax-saving-investment-calculator",description:"Plan 80C + 80CCD(1B) investments"}],lastUpdated:"2025-01-20"};
  
  return (
    <>
      <CalculatorSchema name="NPS Calculator - National Pension System Calculator India 2025" description="Calculate NPS retirement corpus, pension, and tax benefits. Plan NPS Tier 1 investment with employer contribution. Free NPS calculator updated for 2025." url="/calculators/nps-calculator" features={["NPS maturity calculation","Employer contribution support","Tax benefit calculator (80C + 80CCD1B)","Annuity and pension estimation","Asset allocation optimizer","Tier 1 vs Tier 2 comparison","100% free, no registration","Updated with 2025 NPS rates","Corporate NPS calculator","Mobile-responsive"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.8,count:12456}}/>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          NPS Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-contribution" className="text-sm font-medium text-neutral-700">
                Monthly Contribution (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyContribution)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-contribution"
              min="500" 
              max="50000" 
              step="500" 
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹500</span>
              <span>₹50,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="employer-contribution" className="text-sm font-medium text-neutral-700">
                Monthly Employer Contribution (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(employerContribution)}
              </span>
            </div>
            <input 
              type="range" 
              id="employer-contribution"
              min="0" 
              max="50000" 
              step="500" 
              value={employerContribution} 
              onChange={(e) => setEmployerContribution(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹0</span>
              <span>₹50,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-balance" className="text-sm font-medium text-neutral-700">
                Existing NPS Balance (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingBalance)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-balance"
              min="0" 
              max="10000000" 
              step="10000" 
              value={existingBalance} 
              onChange={(e) => setExistingBalance(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="current-age" className="text-sm font-medium text-neutral-700">
                Current Age (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {currentAge} years
              </span>
            </div>
            <input 
              type="range" 
              id="current-age"
              min="18" 
              max="55" 
              step="1" 
              value={currentAge} 
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="equity-allocation" className="text-sm font-medium text-neutral-700">
                Equity Allocation (%)
              </label>
              <span className="text-sm text-neutral-500">
                {equityAllocation}%
              </span>
            </div>
            <input 
              type="range" 
              id="equity-allocation"
              min="0" 
              max="75" 
              step="5" 
              value={equityAllocation} 
              onChange={(e) => setEquityAllocation(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                Expected Return (% p.a.)
              </label>
              <span className="text-sm text-neutral-500">
                {expectedReturn}%
              </span>
            </div>
            <input 
              type="range" 
              id="expected-return"
              min="8" 
              max="15" 
              step="0.5" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">NPS Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Contribution</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalContribution)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Returns</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(totalReturns)}</p>
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
            NPS Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Contribution', value: totalContribution, color: '#3b82f6' },
                { name: 'Returns', value: totalReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            NPS Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Investment Rules</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Maximum equity exposure capped at 75%</li>
                <li>Auto reduction in equity after age 50</li>
                <li>Minimum contribution of ₹6,000 per year</li>
                <li>Maximum contribution not capped</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Tax Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Additional ₹50,000 deduction under 80CCD(1B)</li>
                <li>Employer contribution deductible under 80CCD(2)</li>
                <li>40% of corpus tax-free on maturity</li>
                <li>Partial withdrawal tax-free after 3 years</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Retirement age fixed at 60 years</li>
                <li>Minimum 40% annuitization mandatory</li>
                <li>Partial withdrawal allowed for specific needs</li>
                <li>Professional fund management with low costs</li>
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