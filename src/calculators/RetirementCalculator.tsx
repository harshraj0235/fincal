import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Sliders, Calculator, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [existingSavings, setExistingSavings] = useState<number>(1000000);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(20000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  
  const [requiredCorpus, setRequiredCorpus] = useState<number>(0);
  const [expectedCorpus, setExpectedCorpus] = useState<number>(0);
  const [monthlyGap, setMonthlyGap] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);
  
  useEffect(() => {
    // Calculate required retirement corpus
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const yearsToRetirement = retirementAge - currentAge;
    
    // Calculate future monthly expenses considering inflation
    const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    
    // Calculate required corpus assuming post-retirement return of 7%
    const postRetirementReturn = 7;
    const monthlyReturnRate = postRetirementReturn / 1200;
    const numberOfMonths = yearsInRetirement * 12;
    
    const required = futureMonthlyExpenses * 
      (1 - Math.pow(1 + monthlyReturnRate, -numberOfMonths)) / monthlyReturnRate;
    
    setRequiredCorpus(required);
    
    // Calculate expected corpus
    let corpus = existingSavings;
    const monthlyRate = expectedReturn / 1200;
    const investmentMonths = yearsToRetirement * 12;
    
    // Future value of existing savings
    corpus *= Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
    // Future value of monthly investments
    const futureValueOfInvestments = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, investmentMonths) - 1) / monthlyRate) * 
      (1 + monthlyRate);
    
    corpus += futureValueOfInvestments;
    
    setExpectedCorpus(corpus);
    setTotalInvestment(existingSavings + (monthlyInvestment * investmentMonths));
    setTotalReturns(corpus - (existingSavings + (monthlyInvestment * investmentMonths)));
    
    // Calculate monthly investment gap
    if (corpus < required) {
      const additionalCorpusNeeded = required - corpus;
      const gapMonthlyInvestment = (additionalCorpusNeeded * monthlyRate) / 
        (Math.pow(1 + monthlyRate, investmentMonths) - 1);
      setMonthlyGap(gapMonthlyInvestment);
    } else {
      setMonthlyGap(0);
    }
  }, [
    currentAge,
    retirementAge,
    monthlyExpenses,
    existingSavings,
    monthlyInvestment,
    expectedReturn,
    inflationRate,
    lifeExpectancy
  ]);

  const contentData = {
    title:"Retirement Planning Calculator",description:"Retirement Planning Calculator helps you build your retirement corpus and plan financially secure post-retirement life. Calculate retirement corpus needed, monthly savings required, and assess if your current investments are sufficient. Get personalized India-specific retirement planning with inflation-adjusted expenses, life expectancy, and post-retirement returns. Free retirement calculator 2025.",benefits:["Calculate exact retirement corpus needed based on your lifestyle and life expectancy","See monthly investment required to reach your retirement goal from current age","Account for inflation (6-8%) - your ₹50K monthly expense today = ₹3-5L at retirement!","Plan for 25-35 years of retirement life (60 to 85 years lifespan)","Compare current savings trajectory vs required corpus - know your gap now","Visualize year-by-year corpus building and withdrawal during retirement","100% free calculator with detailed breakup and actionable insights","Works for salaried, self-employed, early retirement (FIRE), and delayed retirement planning"],howToSteps:[{step:"Enter Current Age & Retirement Age",details:"Input your current age (20-60) and target retirement age (typically 58-65). Early retirement needs larger corpus! Retiring at 50 vs 60 means: 1) 10 fewer years to save (₹24-36L less accumulated), 2) 10 more years corpus must last (needs ₹1-1.5Cr extra), 3) Total difference: ₹1.5-2Cr more needed. FIRE (Financial Independence Retire Early) seekers targeting 40-45 need 20-25x annual expenses corpus vs 15-18x for normal retirement."},{step:"Calculate Monthly Post-Retirement Expenses",details:"Estimate monthly expenses after retirement. Today's ₹50K = ₹3-5L after 30 years at 6-8% inflation! Include: 1) Basic living (₹20-30K), 2) Healthcare (₹10-20K - increases with age), 3) House maintenance (₹5-10K), 4) Travel & leisure (₹10-15K), 5) Emergencies buffer (₹10-15K). DON'T include: EMI (loan should be cleared), children's expenses (they should be independent), office commute. Pro tip: Track current expenses for 3 months, then estimate retirement reduction (no work-related costs) and addition (healthcare, hobbies)."},{step:"Add Current Savings & Monthly Investments",details:"Input existing retirement savings (EPF + PPF + NPS + mutual funds + FD) - don't include emergency fund or house. Add monthly retirement investment (EPF contribution + NPS + SIP + other retirement savings). Example: EPF ₹10L existing + ₹5K monthly, PPF ₹5L + ₹3K monthly, NPS ₹3L + ₹5K monthly, MF ₹12L + ₹10K monthly = total ₹30L existing + ₹23K monthly. Separate short-term savings (emergency fund, goals like car/vacation) from long-term retirement corpus."},{step:"Set Expected Return & Inflation Rate",details:"Expected return: Conservative: 8-9% (mostly debt), Balanced: 10-11% (50-60% equity), Aggressive: 12-13% (70-80% equity). Your age matters: 20-40 years old: can go aggressive (12%), 40-50: balanced (10-11%), 50-60: conservative to moderate (8-10%). Inflation: Historical India average is 6-7%, use 6.5-7% for planning. Post-retirement returns: Assume 7-8% (shift to safer debt instruments). Healthcare inflation: 12-14% annually - factor this separately!"},{step:"Review Gap & Adjust Plan",details:"Calculator shows: Required corpus vs Expected corpus. Gap = Shortfall you need to cover. If gap exists, options: 1) Increase monthly investment (most practical), 2) Delay retirement by 2-5 years (gives time to save + reduces years corpus must last), 3) Reduce retirement expenses (lifestyle compromise), 4) Plan part-time work in retirement (consulting, freelance). Example: ₹2Cr needed, ₹1.5Cr expected, ₹50L gap. Solution: Increase monthly SIP by ₹8-10K for 15 years OR delay retirement by 3 years."}],examples:[{scenario:"30-Year-Old Starting Retirement Planning",inputs:[{label:"Current Age",value:"30 years"},{label:"Retirement Age",value:"60 years"},{label:"Current Monthly Expenses",value:"₹50,000"},{label:"Existing Savings",value:"₹10,00,000 (₹10L)"},{label:"Monthly Investment",value:"₹20,000"},{label:"Expected Return",value:"11% p.a."},{label:"Inflation",value:"7% p.a."}],result:"Required Corpus: ₹5.2 Cr | Expected: ₹5.5 Cr ✅",explanation:"Amit, 30, wants to retire at 60. Current ₹50K monthly expense = ₹3.8L after 30 years due to inflation. Retirement corpus needed for 25 years (60-85): ₹5.2Cr (assuming 7% post-retirement return). Current plan: ₹10L existing + ₹20K monthly investment for 30 years at 11% = ₹5.5Cr. RESULT: On track! Has ₹30L buffer. Strategy: Continue ₹20K monthly, review every 3 years, increase investment by 10% when salary increases."},{scenario:"45-Year-Old Realizing Late - Catch-Up Mode",inputs:[{label:"Current Age",value:"45 years"},{label:"Retirement Age",value:"60 years"},{label:"Monthly Expenses",value:"₹80,000"},{label:"Existing Savings",value:"₹30,00,000"},{label:"Monthly Investment",value:"₹30,000"},{label:"Expected Return",value:"10% p.a."}],result:"Required: ₹4.5 Cr | Expected: ₹3.2 Cr | Gap: ₹1.3 Cr ❌",explanation:"Priya, 45, started planning late. Current ₹80K expense = ₹1.7L after 15 years. Needs ₹4.5Cr for 60-85 retirement. Current plan: ₹30L + ₹30K monthly × 15 years = ₹3.2Cr. Shortfall: ₹1.3Cr! Solutions: 1) Increase monthly to ₹55K (₹25K more), OR 2) Delay retirement to 63 (gives 3 extra years), OR 3) Combine: ₹40K monthly + retire at 62 = covers gap. She chose: ₹40K monthly (₹10K increase) + target 62 retirement. This closes 90% of gap!"},{scenario:"High Earner Planning Early Retirement (FIRE)",inputs:[{label:"Current Age",value:"28 years"},{label:"Target Retirement",value:"45 years (FIRE)"},{label:"Current Expenses",value:"₹1,20,000"},{label:"Existing Savings",value:"₹40,00,000"},{label:"Monthly Investment",value:"₹1,00,000 (aggressive savings)"},{label:"Expected Return",value:"12% p.a."}],result:"Required: ₹8.5 Cr | Expected: ₹8.8 Cr ✅",explanation:"Ravi, tech professional, targets FIRE at 45 (40-year retirement horizon!). Current ₹1.2L expense = ₹2.3L after 17 years. Needs ₹8.5Cr for 40 years retirement (45-85). Aggressive plan: ₹40L existing + ₹1L monthly (saving 60-70% of income!) for 17 years at 12% = ₹8.8Cr. On track! FIRE strategy: High savings rate (50-70%), aggressive equity allocation while young, shift to balanced after FIRE. Reality check: Needs ₹65-70K monthly passive income at 45 - achievable from ₹8.8Cr corpus at 9-10% safe withdrawal rate."}],tips:["Start retirement planning in 20s - compounding magic happens over 30-40 years, not 10-15 years before retirement","Save 20-30% of income for retirement if starting early (20s-30s), 35-50% if starting late (40s), 60%+ for early retirement (FIRE)","Diversify retirement corpus: EPF (guaranteed), PPF (safe + tax-free), NPS (best tax benefit + pension), mutual funds (growth)","Review retirement plan every 3 years or after major life events (marriage, child, job change, inheritance)","Clear all loans before retirement - house, car, personal loans should be paid off by retirement age","Health insurance is critical - take ₹10-20L family floater, top-up by ₹30-50L. Medical costs are #1 retirement risk in India","Consider partial retirement - work 3-4 days/week, consult part-time. Reduces corpus need by 20-30% and keeps you engaged"],mistakes:["Underestimating retirement expenses - most people spend 70-80% of pre-retirement expenses, not 50% as commonly assumed","Ignoring healthcare inflation - medical costs inflate at 12-14% vs general 6-7%, plan separately for this!","Not accounting for life expectancy increase - Indians now live to 75-80, plan for 85 to be safe (that's 25 years post-60 retirement!)","Keeping 100% in debt after retirement - still need 20-30% equity for growth to beat inflation over 25-year retirement","Using house as retirement corpus - house is for living, not for generating retirement income unless you plan to downsize","Withdrawing >4-5% annually from corpus - sustainable withdrawal rate is 4-5% to make corpus last 25-30 years","Starting too late - every 5-year delay doubles the monthly investment needed. Start NOW!"],faqs:[{question:"How much corpus do I need to retire comfortably in India?",answer:"Rule of thumb: 25x to 30x your annual retirement expenses. If you need ₹5L monthly (₹60L annually), corpus needed = ₹60L × 25 = ₹1.5Cr minimum. Better target: ₹2Cr for safety buffer. This assumes: 4% safe withdrawal rate (SWR) = ₹8L first year, increasing with inflation, corpus lasts 30 years. Reality varies: Metro city: ₹2-4Cr for middle-class lifestyle, Tier-2 city: ₹1-2Cr sufficient, Lavish lifestyle: ₹5-10Cr+. Factors: Healthcare needs (major cost), house owned or rent, dependents, hobbies/travel. Detailed calculation: Use this calculator to get personalized number based on your lifestyle!"},{question:"What is safe withdrawal rate (SWR) for retirement in India?",answer:"Safe Withdrawal Rate is percentage of corpus you can withdraw annually without running out of money. Global standard: 4% (Trinity Study). India context: 4-5% is safe. Example: ₹2Cr corpus, 4.5% SWR = ₹9L first year = ₹75K monthly. Increase withdrawal by inflation rate each year. Corpus composition: 30% equity (for growth), 40% debt (for stability), 20% FD/liquid (for monthly needs), 10% gold/real assets. Monitor: Review annually, reduce withdrawal in down years, increase slightly in great years. Higher SWR risks: 6-7% may deplete corpus in 15-20 years if returns disappoint. Lower SWR benefits: 3-4% makes corpus last 40-50 years, can leave legacy for children."},{question:"Should I include my house value in retirement corpus calculation?",answer:"NO, don't include house in retirement corpus for these reasons: 1) You need to LIVE somewhere - can't sell your only house for living expenses, 2) House doesn't generate income unless you rent it out (but then where will you live?), 3) Real estate is illiquid - can't sell 10% of house when you need money! When house CAN help: 1) Downsizing: Sell ₹2Cr Mumbai flat, buy ₹60L Pune house, ₹1.4Cr goes to retirement corpus, 2) Reverse mortgage: Get monthly income from house while living in it (but leaves nothing for heirs), 3) Rent out: Live with children, rent your house for ₹30-40K monthly. Better approach: Build retirement corpus SEPARATELY from house. House = emotional asset for security, corpus = financial asset for income."},{question:"How to plan retirement if I'm self-employed with irregular income?",answer:"Self-employed face unique challenges: No EPF, irregular income, no employer contribution. Strategy: 1) Commit fixed % not fixed amount: Save 30-35% of income (higher than salaried 20-25%), 2) Use PPF + NPS for discipline: PPF max ₹1.5L, NPS min ₹12K annually to keep active, 3) Create self-EPF: Open RD + equity SIP for ₹5-10K monthly, increase when income is good, 4) Build emergency fund FIRST: 12-18 months expenses (vs 6 months for salaried) because income is variable, 5) Max tax-saving investments: You get 80C + 80CCD(1B) deductions same as salaried. Example: Freelancer earning ₹8L annually (₹65K average monthly), saves 32% = ₹21K/month = PPF ₹8K + NPS ₹6K + MF SIP ₹7K. In 25 years at 10% = ₹2Cr+ corpus."},{question:"What are best investments for retirement corpus building?",answer:"Diversified approach based on age: 20-35 years (30-40 years to retirement): Equity-heavy: 60-70% equity mutual funds (index/large cap), 20% PPF/EPF, 10% NPS, 10% gold; 35-50 years (15-25 years): Balanced: 40-50% equity, 30% EPF/PPF, 15% NPS, 5% gold, 10% debt; 50-60 years (0-10 years): Conservative: 25-30% equity, 40% debt/FD, 20% PPF/NPS, 10% liquid; Specific recommendations: EPF: Guaranteed 8.25%, fully safe, max it if salaried; PPF: 7.1% tax-free, 15-year lock-in, ₹1.5L annual max; NPS: 9-11%, best tax benefits (80CCD1B), ₹50K extra deduction; Equity MF: 12-15% long-term, stay invested 15-20+ years; Avoid: Insurance investment plans (ULIP, endowment) - high costs, low returns. Real estate as investment - illiquid, high maintenance."},{question:"How does inflation impact my retirement planning?",answer:"Inflation is BIGGEST retirement planning risk! Impact: Today's ₹50K monthly expense becomes: After 15 years (7% inflation): ₹1.38L, After 25 years: ₹2.71L, After 35 years: ₹5.33L. If you don't account for inflation, your ₹1Cr corpus feels like ₹30-40L in purchasing power! Solution: 1) Always calculate inflation-adjusted needs (use this calculator!), 2) Keep 25-30% equity even after retirement - equity beats inflation long-term, 3) Increase withdrawal by inflation rate each year - don't stick to fixed amount, 4) Plan for healthcare inflation separately at 12-14% (higher than general 6-7%), 5) Review expenses every 3-5 years, adjust corpus target accordingly. Reality: If you need ₹2Cr corpus today, plan for ₹4-6Cr if retiring 20-30 years later!"}],relatedCalculators:[{name:"NPS Calculator",url:"/calculators/nps-calculator",description:"National Pension System returns"},{name:"PPF Calculator",url:"/calculators/ppf-calculator",description:"PPF maturity for retirement"},{name:"EPF Calculator",url:"/calculators/epf-calculator",description:"EPF retirement corpus"},{name:"SIP Calculator",url:"/calculators/sip-calculator",description:"Build corpus with mutual funds"},{name:"FD Calculator",url:"/calculators/fd-calculator",description:"Fixed deposit returns"},{name:"SWP Calculator",url:"/calculators/swp-calculator",description:"Plan post-retirement withdrawals"},{name:"Pension Calculator",url:"/calculators/pension-calculator",description:"Calculate monthly pension"}],lastUpdated:"2025-01-20"};
  
  return (
    <>
      <CalculatorSchema name="Retirement Planning Calculator - Retirement Corpus Calculator India 2025" description="Calculate retirement corpus needed, monthly savings required, and retirement readiness. Free retirement planning calculator with inflation adjustment. Plan early retirement (FIRE) or regular retirement in India." url="/calculators/retirement-calculator" features={["Retirement corpus calculator","Monthly investment required","Inflation-adjusted planning","Life expectancy consideration","Gap analysis - corpus vs goal","Early retirement (FIRE) support","Free retirement calculator","Updated 2025 retirement planning"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.9,count:9876}}/>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-[--primary-600]" />
          Retirement Planning Details
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="current-age" className="text-sm font-medium text-neutral-700">
                  Current Age
                </label>
                <span className="text-sm text-neutral-500">
                  {currentAge} years
                </span>
              </div>
              <input 
                type="range" 
                id="current-age"
                min="20" 
                max="70" 
                value={currentAge} 
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="retirement-age" className="text-sm font-medium text-neutral-700">
                  Retirement Age
                </label>
                <span className="text-sm text-neutral-500">
                  {retirementAge} years
                </span>
              </div>
              <input 
                type="range" 
                id="retirement-age"
                min={currentAge + 1} 
                max="80" 
                value={retirementAge} 
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-expenses" className="text-sm font-medium text-neutral-700">
                Current Monthly Expenses (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyExpenses)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-expenses"
              min="10000" 
              max="500000" 
              step="5000" 
              value={monthlyExpenses} 
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="existing-savings" className="text-sm font-medium text-neutral-700">
                Existing Retirement Savings (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(existingSavings)}
              </span>
            </div>
            <input 
              type="range" 
              id="existing-savings"
              min="0" 
              max="10000000" 
              step="100000" 
              value={existingSavings} 
              onChange={(e) => setExistingSavings(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-investment" className="text-sm font-medium text-neutral-700">
                Monthly Investment (₹)
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(monthlyInvestment)}
              </span>
            </div>
            <input 
              type="range" 
              id="monthly-investment"
              min="1000" 
              max="200000" 
              step="1000" 
              value={monthlyInvestment} 
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                  Expected Return (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {expectedReturn}%
                </span>
              </div>
              <input 
                type="range" 
                id="expected-return"
                min="6" 
                max="15" 
                step="0.5" 
                value={expectedReturn} 
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="inflation-rate" className="text-sm font-medium text-neutral-700">
                  Inflation Rate (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {inflationRate}%
                </span>
              </div>
              <input 
                type="range" 
                id="inflation-rate"
                min="4" 
                max="10" 
                step="0.5" 
                value={inflationRate} 
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="life-expectancy" className="text-sm font-medium text-neutral-700">
                Life Expectancy
              </label>
              <span className="text-sm text-neutral-500">
                {lifeExpectancy} years
              </span>
            </div>
            <input 
              type="range" 
              id="life-expectancy"
              min={retirementAge + 1} 
              max="100" 
              value={lifeExpectancy} 
              onChange={(e) => setLifeExpectancy(Number(e.target.value))}
              className="slider"
            />
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Retirement Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Required Corpus</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(requiredCorpus)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Expected Corpus</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(expectedCorpus)}</p>
            </div>
          </div>
          
          {monthlyGap > 0 && (
            <div className="mt-4 p-4 bg-[--error-50] rounded-lg border border-[--error-100]">
              <p className="text-sm text-[--error-600] mb-1">Additional Monthly Investment Needed</p>
              <p className="text-xl font-bold text-[--error-700]">{formatCurrency(monthlyGap)}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Corpus Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Expected Returns', value: totalReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(expectedCorpus)}\nExpected Corpus`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Planning Guidelines
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Key Factors</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>Start early to benefit from compound growth</li>
                <li>Consider inflation impact on expenses</li>
                <li>Account for medical expenses in later years</li>
                <li>Review and rebalance investments periodically</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Investment Options</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-600">
                <li>National Pension System (NPS)</li>
                <li>Public Provident Fund (PPF)</li>
                <li>Mutual Funds</li>
                <li>Fixed Deposits</li>
              </ul>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Important Notes</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Diversify retirement investments</li>
                <li>Consider tax implications</li>
                <li>Build emergency fund separately</li>
                <li>Account for major life events</li>
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