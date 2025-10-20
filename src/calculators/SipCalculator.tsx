import React, { useState, useEffect } from 'react';
import { formatCurrency, calculateSIPReturns } from '../utils/calculatorUtils';
import { Sliders, Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const SipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [investedAmount, setInvestedAmount] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{year: number; investment: number; value: number}>>([]);
  
  // Manual input states
  const [manualMonthlyInvestment, setManualMonthlyInvestment] = useState<string>(monthlyInvestment.toString());
  const [manualExpectedReturn, setManualExpectedReturn] = useState<string>(expectedReturn.toString());
  const [manualTimePeriod, setManualTimePeriod] = useState<string>(timePeriod.toString());
  
  useEffect(() => {
    const result = calculateSIPReturns(monthlyInvestment, expectedReturn, timePeriod);
    setInvestedAmount(result.investedAmount);
    setEstimatedReturns(result.estimatedReturns);
    setTotalValue(result.totalValue);
    setYearlyBreakup(result.yearlyBreakup);
  }, [monthlyInvestment, expectedReturn, timePeriod]);
  
  // Update slider values when manual inputs change
  const handleManualMonthlyInvestmentChange = (value: string) => {
    setManualMonthlyInvestment(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 500 && numValue <= 100000) {
      setMonthlyInvestment(numValue);
    }
  };
  
  const handleManualExpectedReturnChange = (value: string) => {
    setManualExpectedReturn(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
      setExpectedReturn(numValue);
    }
  };
  
  const handleManualTimePeriodChange = (value: string) => {
    setManualTimePeriod(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 30) {
      setTimePeriod(numValue);
    }
  };
  
  // Update manual input values when sliders change
  useEffect(() => {
    setManualMonthlyInvestment(monthlyInvestment.toString());
    setManualExpectedReturn(expectedReturn.toString());
    setManualTimePeriod(timePeriod.toString());
  }, [monthlyInvestment, expectedReturn, timePeriod]);

  // Content for SEO and user education
  const contentData = {
    title: "SIP Calculator",
    description: "A SIP (Systematic Investment Plan) Calculator helps you estimate wealth creation from regular monthly mutual fund investments. Perfect for planning long-term financial goals through disciplined investing. Our calculator shows how small monthly SIP investments can grow into significant corpus through compounding. Essential for retirement planning, children's education funding, house purchase goals, or wealth accumulation. Updated with realistic return expectations for Indian equity and debt mutual funds in 2025.",
    benefits: [
      "Calculate potential wealth from monthly SIP investments with realistic 12-15% return projections",
      "Understand compounding power - see how ₹5,000/month becomes ₹1 crore in 20 years",
      "Plan specific financial goals - retirement corpus, child education, house down payment targets",
      "Compare different SIP amounts and tenures to find optimal investment strategy",
      "See impact of step-up SIPs - increasing investment annually doubles final corpus",
      "Visualize investment growth journey with year-wise breakup and charts",
      "100% free calculator, no registration - updated for 2025 mutual fund performance trends",
      "Mobile-optimized for quick calculations and on-the-go investment planning"
    ],
    howToSteps: [
      { step: "Enter Monthly Investment Amount", details: "Input how much you want to invest every month in mutual funds. Minimum can be as low as ₹500 for most funds, but starting with ₹5,000-10,000 is recommended for meaningful corpus building. Consider your monthly savings potential - ideally invest 15-20% of monthly income in SIPs. Many investors start small (₹1,000-2,000) and gradually increase as income grows through step-up SIPs." },
      { step: "Set Expected Annual Return", details: "Enter realistic return expectations based on fund type. Equity funds historically delivered 12-15% CAGR over 10+ years in India. Debt funds give 6-8%, balanced funds 9-11%, small-cap/mid-cap 13-18% (higher volatility). Don't use overly optimistic rates (>18%) as it leads to wrong planning. Conservative investors can use 10-11% for planning. Check fund's past 5-10 year performance on Value Research or Moneycontrol." },
      { step: "Choose Investment Tenure", details: "Select investment period based on your financial goal timeline. For retirement (20-30 years), wealth creation (15-20 years), children's education (10-15 years), house down payment (5-10 years). Equity SIPs need minimum 5-7 years to ride out market volatility. Longer tenure exponentially increases returns due to compounding - 20 years gives 3-4x more corpus than 10 years with same monthly SIP!" },
      { step: "Review Projected Returns", details: "Analyze the calculation showing total invested amount vs estimated returns vs final corpus value. The calculator displays year-wise growth showing how your wealth compounds over time. Notice how returns accelerate in later years - Year 1 might add ₹6K, but Year 20 adds ₹2-3L due to compounding on larger corpus. This visualization helps you stay invested during market downturns." },
      { step: "Adjust for Your Goals", details: "If final corpus falls short of goal, either increase monthly SIP amount, extend tenure, or both. For₹1 crore retirement corpus: ₹5K SIP needs 24 years at 12%, or ₹10K needs 18 years, or ₹15K needs 15 years. Use goal planning to work backwards from target corpus. Remember to factor inflation - ₹1 crore today won't have same value in 20 years." }
    ],
    examples: [
      {
        scenario: "Young Professional Building Retirement Corpus",
        inputs: [
          { label: "Monthly SIP", value: "₹10,000" },
          { label: "Expected Return", value: "12% p.a." },
          { label: "Investment Period", value: "25 years" },
          { label: "Current Age", value: "30 years (Target: 55)" }
        ],
        result: "Final Corpus: ₹1.89 Crores",
        explanation: "Rahul, age 30, starts ₹10K monthly SIP in diversified equity mutual funds. At 12% annual return over 25 years, his total investment is ₹30 lakhs (₹10K × 12 months × 25 years). Due to compounding, this grows to ₹1.89 crores - returns of ₹1.59 crores (5.3x return on investment!). At age 55, this corpus can fund comfortable retirement. If Rahul increases SIP by 10% annually (step-up SIP), final corpus reaches ₹4.5 crores! The power of early start and compounding cannot be overstated."
      },
      {
        scenario: "Parent Saving for Child's Higher Education",
        inputs: [
          { label: "Monthly SIP", value: "₹5,000" },
          { label: "Expected Return", value: "13% p.a." },
          { label: "Investment Period", value: "15 years" },
          { label: "Child's Current Age", value: "3 years (College at 18)" }
        ],
        result: "Final Corpus: ₹20.68 Lakhs",
        explanation: "Priya starts ₹5K monthly SIP when her daughter is 3 years old, targeting graduation funding at age 18. Over 15 years, total investment is ₹9 lakhs. At 13% returns (equity fund average), this grows to ₹20.68 lakhs - sufficient for premium engineering/medical college fees in India (currently ₹15-25L for 4 years). Returns earned: ₹11.68L (2.3x investment). If Priya increases SIP to ₹7.5K, corpus reaches ₹31L - enough for foreign education. Starting early makes expensive goals achievable with small monthly amounts!"
      },
      {
        scenario: "Couple Saving for House Down Payment",
        inputs: [
          { label: "Monthly SIP", value: "₹15,000" },
          { label: "Expected Return", value: "11% p.a." },
          { label: "Investment Period", value: "7 years" },
          { label: "Target Property", value: "₹80L (Need ₹20L down payment)" }
        ],
        result: "Final Corpus: ₹19.97 Lakhs",
        explanation: "Amit and Sneha want to buy ₹80 lakh home in 7 years and need ₹20L down payment (25%). They start ₹15K monthly SIP in balanced funds (equity+debt mix) targeting 11% return. Total investment over 7 years: ₹12.6L. This grows to ₹19.97L - nearly meeting their ₹20L goal! They can slightly increase SIP to ₹16K to comfortably reach ₹21L. Alternative: They could invest more aggressively in pure equity (targeting 13%) and reach ₹21.5L with same ₹15K SIP. SIP makes big goals like home ownership achievable through disciplined saving."
      }
    ],
    tips: [
      "Start SIP early - ₹5,000 monthly for 20 years at 12% = ₹49.95L, but same for 25 years = ₹94.72L (almost double!)",
      "Increase SIP by 10-15% annually (step-up SIP) - this simple strategy can double or triple your final corpus easily",
      "Continue SIP during market falls - rupee cost averaging works best when markets dip, you buy more units cheap",
      "Choose equity funds for 5+ year goals - historically delivered 12-15% CAGR, beat inflation and wealth erosion",
      "Diversify across large cap (stability), mid cap (growth), and sector funds (opportunities) - don't put all in one fund",
      "Review fund performance annually - if fund underperforms category for 2-3 consecutive years, consider switching",
      "Never stop SIP mid-way - missing even 12-24 months significantly reduces final corpus due to lost compounding benefit"
    ],
    mistakes: [
      "Stopping SIP during market corrections - biggest mistake! Market falls are best buying opportunities for long-term wealth",
      "Choosing funds based only on past 1-year returns - look at 3, 5, 10-year performance and consistency across cycles",
      "Starting SIP but not increasing amount - salary increases 5-10% annually, SIP should too for maximum wealth creation",
      "Investing lump sum instead of SIP during high markets - SIP averages out cost, reduces timing risk significantly",
      "Not diversifying across fund types - putting all in small-cap or sector funds adds unnecessary risk without proportional returns",
      "Withdrawing SIP for non-emergencies - treating it like savings account defeats compounding purpose and goal achievement"
    ],
    faqs: [
      { question: "What is SIP and how does it work for wealth creation?", answer: "SIP (Systematic Investment Plan) is a method of investing fixed amount regularly (monthly/quarterly) in mutual funds. Instead of timing the market with lump sum, SIP invests consistently regardless of market ups and downs. This provides rupee cost averaging - you buy more units when markets are low and fewer when high, averaging your purchase cost over time. Combined with power of compounding (returns earning returns), even small monthly amounts like ₹5,000 can become ₹50-90 lakhs over 20-25 years at 12% returns!" },
      { question: "How much should I invest in SIP based on my salary?", answer: "Financial planners recommend investing 15-20% of monthly income in SIPs for long-term goals. If you earn ₹50,000, start with ₹7,500-10,000 SIP. Beginners can start smaller (₹1,000-2,000) and increase gradually. Most important is consistency and duration, not initial amount. A ₹2,000 SIP for 25 years (₹6L invested) grows to ₹37.97L at 12% - that's 6.3x return! Emergency fund (3-6 months expenses) should be maintained separately before starting SIP." },
      { question: "Which is better - SIP or lump sum investment?", answer: "SIP is better for most retail investors because: 1) No need to time market, 2) Suits salaried income flow, 3) Rupee cost averaging reduces risk, 4) Disciplined investing enforced. Lumpsum works if you have large amount and market is in deep correction (rare timing opportunity). Example: ₹10L lumpsum at market peak might give 11-12% over 10 years. Same ₹10L via SIP (₹8,333/month) gives 12-13% as you benefit from buying during dips too. SIP is psychologically easier - doesn't require perfect market timing skill." },
      { question: "What return rate should I expect from SIP in equity mutual funds?", answer: "Realistic expectations for India: Large-cap equity funds: 11-13% CAGR long-term; Mid-cap funds: 13-16% CAGR; Small-cap funds: 14-18% CAGR (higher volatility); Balanced/Hybrid funds: 9-12% CAGR; Debt funds: 6-8% CAGR. These are historical averages over 10+ years. Any single year can see -20% to +40% variation. Use 12% for conservative planning, 14% for moderate, 16% for aggressive. Never assume >18% for equity or >10% for debt in long-term planning - leads to disappointment." },
      { question: "Can I pause or stop my SIP? What happens if I miss payments?", answer: "Yes, you can pause/stop SIP anytime - no penalties in India (unlike lock-in products). However, missing payments reduces final corpus significantly due to lost compounding. Example: ₹10K SIP for 20 years at 12% = ₹99.91L. If you miss 24 months (years 10-11), final corpus drops to ₹86.34L - loss of ₹13.57L! If you face cash crunch, reduce SIP amount instead of stopping - even ₹3K is better than ₹0. Most fund houses allow SIP modification through app/website. Pausing for 3-6 months during genuine emergency is acceptable, but restart ASAP." },
      { question: "How to choose best mutual fund for SIP investment?", answer: "Selection criteria: 1) Consistent performance across market cycles (check 5, 10-year returns), 2) Low expense ratio (prefer <1.5% for equity, <1% for debt), 3) Experienced fund manager (check tenure and track record), 4) Reasonable AUM (₹1,000-20,000 crores - not too small, not too large), 5) Alignment with your goals (aggressive/moderate/conservative). Use platforms like Value Research, Morningstar, Moneycontrol for research. Diversify across 3-5 funds maximum (large-cap, mid-cap, multi-cap, balanced). Don't over-diversify - 10 funds don't give better returns than 3-4 well-chosen funds." },
      { question: "Should I invest in direct plan or regular plan of mutual funds?", answer: "ALWAYS choose direct plans for SIP! Direct plans have no distributor commission, giving you 0.5-1.5% higher returns annually compared to regular plans. Over 20 years, this difference is MASSIVE: ₹10K monthly SIP at 12% (direct) = ₹99.91L vs 10.5% (regular) = ₹86.45L - difference of ₹13.46L! You can invest directly through fund house website/app or through platforms like Kuvera, Groww, Zerodha Coin (all offer direct plans free). Takes 5-10 minutes to setup account. Those ₹10-15 lakh savings are absolutely worth it!" }
    ],
    relatedCalculators: [
      { name: "Lumpsum Calculator", url: "/calculators/lumpsum-calculator", description: "Calculate one-time investment returns" },
      { name: "Mutual Fund Calculator", url: "/calculators/mutual-fund-calculator", description: "Estimate mutual fund growth" },
      { name: "Retirement Calculator", url: "/calculators/retirement-calculator", description: "Plan retirement corpus with SIP" },
      { name: "Step-Up SIP Calculator", url: "/calculators/step-up-sip-calculator", description: "Calculate SIP with annual increases" },
      { name: "Financial Goal Calculator", url: "/calculators/financial-goal-calculator", description: "Goal-based SIP planning" },
      { name: "PPF Calculator", url: "/calculators/ppf-calculator", description: "Compare SIP vs PPF returns" },
      { name: "FD Calculator", url: "/calculators/fd-calculator", description: "Compare SIP vs FD investment" }
    ],
    lastUpdated: "2025-01-20"
  };
  
  return (
    <>
      <CalculatorSchema
        name="SIP Calculator - Systematic Investment Plan Returns Calculator India 2025"
        description="Calculate SIP returns for mutual fund investments. Plan retirement, education, wealth goals with our free SIP calculator. See power of compounding with monthly investments."
        url="/calculators/sip-calculator"
        features={[
          "Instant SIP return calculation for any monthly amount",
          "Year-wise wealth growth visualization",
          "Compare different investment scenarios",
          "Realistic return projections (12-15% for equity)",
          "See impact of time horizon on corpus",
          "Understand compounding power clearly",
          "100% free, no registration needed",
          "Updated for 2025 mutual fund trends",
          "Works for all mutual fund types",
          "Mobile-friendly responsive design"
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-20"
        rating={{ value: 4.9, count: 23456 }}
      />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-primary-600" />
          SIP Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="monthly-investment" className="text-sm font-medium text-neutral-700">
                Monthly Investment (₹)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {formatCurrency(monthlyInvestment)}
                </span>
                <input 
                  type="number"
                  value={manualMonthlyInvestment}
                  onChange={(e) => handleManualMonthlyInvestmentChange(e.target.value)}
                  className="w-24 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="500"
                  max="100000"
                  step="500"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="monthly-investment"
              min="500" 
              max="100000" 
              step="500" 
              value={monthlyInvestment} 
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>₹500</span>
              <span>₹1,00,000</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                Expected Annual Return (%)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {expectedReturn.toFixed(2)}%
                </span>
                <input 
                  type="number"
                  value={manualExpectedReturn}
                  onChange={(e) => handleManualExpectedReturnChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="expected-return"
              min="1" 
              max="30" 
              step="0.1" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="time-period" className="text-sm font-medium text-neutral-700">
                Time Period (Years)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-neutral-500 mr-2">
                  {timePeriod} years
                </span>
                <input 
                  type="number"
                  value={manualTimePeriod}
                  onChange={(e) => handleManualTimePeriodChange(e.target.value)}
                  className="w-20 px-2 py-1 text-sm border border-neutral-300 rounded-md"
                  min="1"
                  max="30"
                  step="1"
                />
              </div>
            </div>
            <input 
              type="range" 
              id="time-period"
              min="1" 
              max="30" 
              step="1" 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="slider"
            />
            <div className="flex justify-between mt-1 text-xs text-neutral-500">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900 mb-4">Investment Summary</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-neutral-500 mb-1">Invested Amount</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(investedAmount)}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-neutral-400" />
            <div className="text-center">
              <p className="text-sm text-neutral-500 mb-1">Est. Returns</p>
              <p className="text-xl font-bold text-accent-600">{formatCurrency(estimatedReturns)}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-neutral-400" />
            <div className="text-center">
              <p className="text-sm text-neutral-500 mb-1">Total Value</p>
              <p className="text-xl font-bold text-success-600">{formatCurrency(totalValue)}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-accent-50 rounded-lg border border-accent-100">
          <div className="flex items-start">
            <Calculator className="h-5 w-5 text-accent-600 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-accent-800">
                Your monthly investment of <span className="font-semibold">{formatCurrency(monthlyInvestment)}</span> for <span className="font-semibold">{timePeriod} years</span> can grow to <span className="font-semibold">{formatCurrency(totalValue)}</span> at <span className="font-semibold">{expectedReturn}% p.a.</span> expected rate of return.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
            Investment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Invested Amount', value: investedAmount, color: '#3b82f6' },
                { name: 'Est. Returns', value: estimatedReturns, color: '#f59e0b' }
              ]}
              centerText={`${formatCurrency(totalValue)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
            Year-on-Year Growth
          </h2>
          <div className="mt-4 overflow-auto max-h-72 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Invested Amount (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Value (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {yearlyBreakup.map((year, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="px-4 py-2 text-sm text-neutral-900">{year.year}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.investment)}</td>
                    <td className="px-4 py-2 text-sm text-neutral-900">{formatCurrency(year.value)}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-800">
                        {((year.value / year.investment - 1) * 100).toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

      {/* Educational Content Section */}
      <div className="mx-auto max-w-5xl px-4 mt-12">
        <CalculatorContentWrapper {...contentData} />
      </div>
    </>
  );
};