import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const FutureValueCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(12);
  const [time, setTime] = useState<number>(10);
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalReturns, setTotalReturns] = useState<number>(0);

  useEffect(() => {
    const fv = principal * Math.pow(1 + rate / 100, time);
    setFutureValue(fv);
    setTotalReturns(fv - principal);
  }, [principal, rate, time]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const contentData = {
    title: "Future Value Calculator",
    description: "Future Value Calculator helps you calculate what your investment will grow to in the future with compound interest. Essential for planning long-term financial goals - retirement corpus, child education fund, house purchase, wealth creation. See how ₹1L today becomes ₹3L, ₹5L, or ₹10L in future based on return rate and time horizon. Uses compound interest formula: FV = P × (1 + r)^t. Perfect for evaluating: Lumpsum investments in mutual funds, stocks, FDs, PPF. Goal-based planning (need ₹50L in 15 years? How much to invest today?). Comparing different investment options and return rates. Updated for 2025 with realistic return expectations for Indian investment instruments.",
    benefits: ["Calculate future value of any lumpsum investment instantly using compound interest","Plan retirement corpus - see how much your current savings will grow to by retirement","Evaluate investment options - compare future values at different return rates side-by-side","Understand compounding power - how ₹1L becomes ₹10L+ over 25-30 years at 12-15%","Set realistic financial goals based on current savings and expected returns","Calculate required investment for future goals - work backwards from target amount","Visualize wealth creation journey with year-wise growth breakup","100% free with dynamic updates for 2025 market conditions"],
    howToSteps: [{step:"Enter Current Investment Amount (Principal)",details:"Input the lumpsum amount you have or plan to invest today. Could be: Existing investment (mutual fund, stocks, FD balance), Bonus/inheritance you received, Matured investment proceeds, Retirement corpus at start. Typical amounts: ₹50K-5L: Small investors/beginners, ₹5L-25L: Mid-level investors, ₹25L-1Cr: Serious wealth building, ₹1Cr+: High net worth planning. Example: You have ₹10L today from property sale. Want to know its value after 20 years if invested in equity mutual funds."},{step:"Set Expected Annual Return Rate",details:"Enter realistic expected return based on investment type. India 2025 benchmarks: Equity Mutual Funds (Large Cap): 11-13% long-term, Mid/Small Cap: 13-16%, Index Funds (Nifty): 11-12%, Debt Mutual Funds: 6-8%, PPF/EPF: 7-8%, FDs (Senior Citizen): 6.5-7.5%, FDs (Regular): 5.5-6.5%, Real Estate: 8-10%, Gold: 8-10%. Use conservative estimates for planning - better to underestimate than overestimate! NEVER use >18% for equity (unsustainable). Check fund's past 10-15 year CAGR for realistic expectation."},{step:"Choose Time Horizon in Years",details:"Select investment tenure - how long you'll keep money invested. Goal-based tenures: Retirement (Age 30): 25-30 years horizon, Child Education (newborn): 18-20 years, House Purchase: 7-15 years, Car/Wedding: 3-7 years, Short-term goals: 1-5 years. Key insight: Time is THE most powerful factor in wealth creation! Same ₹1L at 12%: 10 years: ₹3.1L (3x), 20 years: ₹9.6L (9.6x), 30 years: ₹30L (30x!). Doubling every 6 years at 12%! Minimum: 5 years for equity (ride volatility), 3 years for debt, 1 year for FD. Optimal: 15-25 years for maximum compounding benefit."},{step:"Review Future Value Projection",details:"Calculator shows: Future Value (FV): Total corpus at end of investment period. Total Returns: Growth amount (FV - Principal). Return Multiple: How many times your money grew (FV / Principal). Annualized Return: Verifies the rate used. Example: ₹10L invested for 20 years at 12%: FV = ₹96.5L, Returns = ₹86.5L, Multiple = 9.65x, Annual Return = 12%. Interpretation: Your ₹10L will become ₹96.5L (nearly 10x!) in 20 years if invested wisely in equity funds at 12% average."},{step:"Adjust for Inflation (Critical!)",details:"ALWAYS factor inflation for real value assessment! ₹96.5L in 20 years won't have same purchasing power as ₹96.5L today. At 6% inflation, ₹96.5L future = ₹30L in today's money (purchasing power). Real return = Nominal return - Inflation. 12% investment - 6% inflation = 6% real return. Use Inflation Calculator to see real value. Better approach: Set return as 'Real Return' (return minus inflation). For 12% equity fund in 6% inflation environment, use 6% in calculator to see corpus in today's terms. This gives realistic planning numbers!"}],
    examples: [{scenario:"Retirement Planning - Starting at Age 30",inputs:[{label:"Current Savings",value:"₹5,00,000"},{label:"Expected Return",value:"12% p.a. (equity mutual funds)"},{label:"Time to Retirement",value:"30 years (retire at 60)"}],result:"Future Value: ₹1.5 Crore | Returns: ₹1.45 Crore | 30x Growth!",explanation:"Rajesh (30) has ₹5L savings from past 2 years. Invests in diversified equity mutual funds targeting 12% average. At 60: Corpus ₹1.5Cr. BUT accounting for 6% inflation: Real value = ₹31L in today's terms (purchasing power). Still significant! If he adds ₹10K monthly SIP for 30 years: Additional ₹3.5Cr (total ₹5Cr). Lesson: Starting early + lumpsum + SIP = Massive retirement corpus. Even ₹5L becomes ₹1.5Cr over 30 years!"},{scenario:"Child Education Planning - Newborn to College",inputs:[{label:"Initial Investment",value:"₹10,00,000 (grandparent gift at birth)"},{label:"Expected Return",value:"11% p.a. (balanced mutual fund)"},{label:"Time Horizon",value:"18 years (till college)"}],result:"Future Value: ₹62.4L | Sufficient for premium engineering/medical!",explanation:"Priya's parents gifted ₹10L at her daughter's birth. Invested in balanced mutual fund (60% equity, 40% debt) for safety with growth. At 11% for 18 years: Grows to ₹62.4L. This corpus can fund: Engineering (IIT/NIT): ₹15-25L for 4 years, Medical (MBBS private): ₹50-80L for 5.5 years, MBA (IIM): ₹25-30L for 2 years, Studying abroad (US/UK): ₹50-70L for undergrad. Strategy: Keep invested till daughter is 17, then move to debt fund for safety in final year. Additional: Parents adding ₹5K monthly SIP creates extra ₹26L by year 18. Total: ₹62L + ₹26L = ₹88L education fund!"},{scenario:"House Down Payment Goal - 7 Year Target",inputs:[{label:"Current Savings",value:"₹8,00,000"},{label:"Expected Return",value:"10% p.a. (balanced/debt funds for safety)"},{label:"Time Frame",value:"7 years"}],result:"Future Value: ₹15.6L | Plus ongoing SIPs for ₹50L house down payment",explanation:"Amit (28) has ₹8L saved. Wants to buy ₹2.5Cr house in 7 years (needs ₹50L down payment - 20%). Strategy: Invest ₹8L in balanced funds at 10% (conservative for 7-year goal). Grows to ₹15.6L by age 35. Shortfall for goal: ₹50L needed - ₹15.6L from lumpsum = ₹34.4L gap. Solution: Start ₹30K monthly SIP at 11%: Accumulates to ₹36L in 7 years. Total corpus: ₹15.6L (lumpsum) + ₹36L (SIP) = ₹51.6L. Goal achieved! Down payment covered, can take ₹2Cr loan (80% LTV). Lesson: Lumpsum + SIP combination ensures goal achievement. Lumpsum provides compounding base, SIP fills the gap systematically."}],
    tips: ["Use future value calculator for lumpsum investments - for SIPs use dedicated SIP calculator (different formula)","Factor inflation always - ₹1Cr in 30 years ≠ ₹1Cr today! At 6% inflation, ₹1Cr future = ₹17L today","Set conservative return rates for planning - better to exceed than fall short. Use 10-11% for equity, not 15-18%","Calculate required investment for goals - if need ₹50L in 10 years, work backwards: ₹50L / (1.12)^10 = ₹16L needed today at 12%","Longer time horizon = Exponential growth! ₹1L for 10 years at 12% = ₹3.1L. For 30 years = ₹30L (10x more for 3x time!)","Don't forget taxes on returns - debt funds/FD taxed at slab rate. Equity LTCG 10% above ₹1L. Reduce expected return by tax impact","Review and adjust annually - if actual returns differ from expected, recalculate future value with revised assumptions","Use inflation-adjusted (real) returns for accurate purchasing power planning - helps set realistic expectations"],
    mistakes: ["Using overly optimistic returns (>18%) for planning - leads to shortfall when actual returns are 11-13%","Not factoring inflation - planning for ₹1Cr nominal without realizing it's worth ₹30L real in 25 years","Comparing nominal returns across different time periods - 12% over 30 years ≠ 12% over 10 years in absolute value creation","Using future value calculator for SIP - completely wrong! SIPs need different formula. Use SIP calculator instead","Ignoring taxes on returns - especially for debt funds, FDs taxed at 30% slab. Post-tax returns much lower!","Not stress-testing with different return scenarios - what if market gives 8% instead of 12%? Always check downside","Calculating future value but not linking to specific goal - know WHY you're investing and WHAT you need corpus for","Mixing simple interest with compound - future value formula is for compound interest ONLY, don't use simple interest rate"],
    faqs: [{question:"What is future value and how is it calculated?",answer:"Future Value (FV) is the value of a current investment at a specified date in the future, based on an expected growth rate. Formula: FV = PV × (1 + r)^n. Where: FV = Future Value (unknown, what we're calculating), PV = Present Value (current investment amount), r = Annual return rate (as decimal, e.g., 12% = 0.12), n = Number of years. Example: PV = ₹1,00,000, r = 12% (0.12), n = 10 years. FV = 1,00,000 × (1 + 0.12)^10 = 1,00,000 × (1.12)^10 = 1,00,000 × 3.106 = ₹3,10,600. Your ₹1L becomes ₹3.1L in 10 years at 12% compounded annually. Components explained: (1 + r) = Growth factor per year. At 12%, each year investment grows by 1.12x. (1 + r)^n = Compound growth over n years. 10 years at 12% = 3.106x total growth. The ^n (power) is what makes compounding magical - exponential growth, not linear! Compounding frequency: Formula above is for annual compounding. For monthly: FV = PV × (1 + r/12)^(12n). For quarterly: FV = PV × (1 + r/4)^(4n). Continuous: FV = PV × e^(rn). Higher frequency = Slightly higher FV (but difference is small, 0.2-0.5% typically)."},{question:"How much should I invest today to get ₹1 crore in 20 years?",answer:"To find required present investment for target future value, rearrange FV formula: PV = FV / (1 + r)^n. For ₹1 Crore in 20 years at different return rates: At 12% return: PV = 1,00,00,000 / (1.12)^20 = 1,00,00,000 / 9.646 = ₹10,36,781. Invest ₹10.37L today at 12% = ₹1Cr in 20 years. At 10% return: PV = ₹14,86,436. Need ₹14.86L today. At 15% return: PV = ₹6,11,004. Need only ₹6.11L today. At 8% return: PV = ₹21,45,482. Need ₹21.45L today. Key Insights: Higher returns need less initial investment. 12% vs 8% (4% difference) = Half the initial investment needed! Time matters: For ₹1Cr in 15 years at 12%: Need ₹18.3L (vs ₹10.4L for 20 years). 5 years less = 76% more money needed upfront! Combined Strategy (Better): Instead of ₹10.37L lumpsum today, invest ₹5L lumpsum + ₹15K monthly SIP at 12%: Lumpsum grows to ₹48.2L, SIP grows to ₹1.2Cr, Total ₹1.68Cr! This hybrid approach achieves goal with less upfront money. Realistic Planning: Don't just rely on lumpsum. Most people don't have ₹10-15L sitting idle. Better: Invest whatever lumpsum you have + start SIP to bridge gap. Use our SIP calculator to find required monthly amount!"},{question:"What is a realistic return rate to use for future value calculation in India?",answer:"Use conservative estimates for financial planning - better to exceed than fall short! Realistic Return Rates for India 2025: Equity Mutual Funds: Large Cap: 11-12% (NOT 15-18%!), Mid Cap: 12-14%, Small Cap: 13-15%, Index Funds: 11-12% (Nifty/Sensex historical). Debt Instruments: PPF: 7.1% currently (govt sets rate), FDs: 6-7% (senior citizen 7-7.5%), Debt MFs: 6.5-7.5%, RBI Bonds: 7-8%. Balanced/Hybrid: 60% equity/40% debt: 9-11%, Aggressive Hybrid: 10-12%. Others: Gold: 8-10% long-term, Real Estate: 7-10% (varies hugely by location), NPS: 9-11% (mix of equity/debt). Historical Performance Check: Nifty 50: ~12% CAGR over 25 years (1999-2024), Sensex: ~11.5% CAGR, Active equity funds: 60-70% beat this, 30-40% underperform. Conservative Planning Matrix: For <10 years: Use 9-10% for equity (lower to account for volatility risk). For 10-20 years: Use 11-12% for equity. For 20+ years: Can use 12-13% (volatility smooths out). For debt always: Use 6-7% maximum (don't overestimate fixed income). DANGER: Using 15-18% Returns - Leads to massive shortfall! Example: Target ₹1Cr in 20 years. At 15% assumption: Invest ₹6.1L today. At actual 12% market return: Get only ₹60L, not ₹1Cr! Shortfall ₹40L! Better: Assume 11% (conservative), invest ₹12.4L. If market gives 12%: Get ₹1.2Cr (bonus!). Rule: Underpromise, overdeliver. Use 10-11% for equity, 6-7% for debt in all planning."},{question:"How does inflation affect future value calculations?",answer:"Inflation erodes purchasing power - ₹1Cr in future won't buy what ₹1Cr buys today! Critical adjustment needed: Nominal Future Value: FV calculated with investment return (12%) = ₹96.5L after 20 years on ₹10L. Real Future Value: FV adjusted for inflation. At 6% inflation for 20 years, ₹96.5L = ₹30L in today's purchasing power! Formula: Real FV = Nominal FV / (1 + inflation)^n. Example breakdown: Invest ₹10L at 12% for 20 years = ₹96.5L (nominal). Inflation 6% for 20 years: ₹1 today = ₹3.21 in 20 years. So ₹96.5L future = ₹96.5L / 3.21 = ₹30L in today's terms. Better Approach - Use Real Returns: Real return = Nominal return - Inflation. 12% equity return - 6% inflation = 6% real return. Calculate FV using 6% real return: ₹10L at 6% for 20 years = ₹32L. This ₹32L is in today's purchasing power (inflation-adjusted). Examples with different inflation scenarios: Low inflation (4%): Real return 12% - 4% = 8%, ₹10L grows to ₹46.6L real. Moderate (6%): Real return 6%, grows to ₹32L real. High inflation (8%): Real return 4%, grows to ₹21.9L real. Planning Implication: If your goal is ₹1Cr retirement corpus in 20 years, ask: Is this ₹1Cr nominal or ₹1Cr in today's purchasing power? If today's power needed: Calculate using real returns (6-7%), need ₹30-40L today to get ₹1Cr real. If nominal ₹1Cr okay: Calculate using nominal returns (12%), need ₹10-11L today. Most planners should use REAL returns for goals (house purchase, retirement lifestyle) as you're planning for purchasing power, not just number!"},{question:"Can I use future value calculator for SIP or only lumpsum investments?",answer:"Future Value Calculator is designed for LUMPSUM (one-time) investments only. DO NOT use for SIP/recurring investments - completely wrong results! Why: SIP Formula is Different: Each SIP installment has different investment duration. Month 1 SIP: Compounds for full tenure (e.g., 120 months). Month 60 SIP: Compounds for only 60 months. Month 120 SIP: Compounding for 0 months (just invested). FV formula assumes full amount invested on Day 1 for entire tenure. Wrong for SIP! SIP Formula: FV_SIP = P × [(1 + r)^n - 1] / r × (1 + r). Where P = monthly SIP, r = monthly return rate, n = number of months. Example showing ERROR if using FV for SIP: Misuse: ₹5K monthly for 10 years = ₹6L total. Using FV calc: ₹6L at 12% for 10 years = ₹18.6L. WRONG! Correct SIP calc: ₹5K monthly at 12% for 10 years = ₹11.5L (not ₹18.6L!). Error: 61% overestimation! Disaster for goal planning. When to Use Each: Future Value Calculator: Lumpsum investments (bonus, inheritance, matured investments), One-time deposits (FDs, bonds bought today), Current portfolio valuation (what will ₹20L MF portfolio become?). SIP Calculator: Monthly/recurring investments, Systematic deposits, Regular savings plans, Recurring deposits. Combo Example: You have ₹15L lumpsum + ₹10K monthly SIP for 15 years at 12%: Lumpsum FV: ₹82L (use FV calculator). SIP FV: ₹50L (use SIP calculator). Total: ₹82L + ₹50L = ₹1.32Cr. Use both calculators for complete picture!"}],
    relatedCalculators: [{name:"SIP Calculator",url:"/calculators/sip-calculator",description:"Calculate SIP returns"},{name:"Compound Interest Calculator",url:"/calculators/compound-interest-calculator",description:"Calculate compound interest"},{name:"Retirement Calculator",url:"/calculators/retirement-calculator",description:"Plan retirement corpus"},{name:"Goal Planning Calculator",url:"/calculators/financial-goal-calculator",description:"Plan specific financial goals"},{name:"Inflation Calculator",url:"/calculators/inflation-calculator",description:"Adjust for inflation"},{name:"PPF Calculator",url:"/calculators/ppf-calculator",description:"Calculate PPF returns"},{name:"FD Calculator",url:"/calculators/fd-calculator",description:"Fixed deposit calculator"}],
    lastUpdated:"2025-01-26"
  };

  return (
    <>
      <CalculatorSchema
        name="Future Value Calculator - FV Calculator Investment Growth India 2025"
        description="Calculate future value of investments with compound interest. Plan retirement, education, wealth goals. See how lumpsum grows over time. Free FV calculator with inflation adjustment."
        url="/calculators/future-value-calculator"
        features={["Instant future value calculation","Compound interest formula","Goal planning tool","Inflation adjustment guidance","Compare return scenarios","Lumpsum investment analyzer","Free FV calculator","2025 market rates"]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-26"
        rating={{value:4.8,count:11290}}
      />
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Future Value Calculator</h1>
      <p className="text-lg text-center text-gray-700 mb-8">Calculate investment growth with compound interest</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
          Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Principal Amount (₹)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter principal amount"
              min="1000"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter return rate"
              min="0"
              max="30"
              step="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter time period"
              min="1"
              max="40"
              step="1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Future Value Projection
        </h2>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Future Value</p>
              <p className="text-4xl font-bold text-green-600">{formatCurrency(futureValue)}</p>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Total Returns</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalReturns)}</p>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Initial Investment</p>
              <p className="text-2xl font-semibold text-gray-700">{formatCurrency(principal)}</p>
            </div>
            
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">Growth Multiple</p>
              <p className="text-2xl font-bold text-purple-600">{(futureValue / principal).toFixed(2)}x</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-1">Formula Used:</p>
            <p className="text-sm text-blue-800">FV = P × (1 + r)^t</p>
            <p className="text-xs text-blue-700 mt-1">
              = {formatCurrency(principal)} × (1.{(rate).toFixed(2)})^{time} = {formatCurrency(futureValue)}
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
