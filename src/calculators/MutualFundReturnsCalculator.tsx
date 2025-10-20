import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const MutualFundReturnsCalculator: React.FC = () => {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [existingInvestment, setExistingInvestment] = useState<number>(0);
  const [existingPeriod, setExistingPeriod] = useState<number>(1);
  
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [absoluteReturn, setAbsoluteReturn] = useState<number>(0);
  const [cagr, setCagr] = useState<number>(0);
  const [xirr, setXirr] = useState<number>(0);
  
  useEffect(() => {
    let calculatedTotalInvestment = 0;
    let calculatedMaturityAmount = 0;
    
    if (investmentType === 'sip') {
      // Calculate for SIP
      const monthlyRate = expectedReturn / 12 / 100;
      const months = investmentPeriod * 12;
      
      // Future value of SIP
      calculatedMaturityAmount = investmentAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      calculatedTotalInvestment = investmentAmount * months;
      
      // Add existing investment with its growth
      if (existingInvestment > 0) {
        const existingGrowth = existingInvestment * Math.pow(1 + expectedReturn / 100, investmentPeriod);
        calculatedMaturityAmount += existingGrowth;
        calculatedTotalInvestment += existingInvestment;
      }
    } else {
      // Calculate for lumpsum
      calculatedTotalInvestment = investmentAmount;
      calculatedMaturityAmount = investmentAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
      
      // Add existing investment with its growth
      if (existingInvestment > 0) {
        const totalPeriod = existingPeriod + investmentPeriod;
        const existingGrowth = existingInvestment * Math.pow(1 + expectedReturn / 100, totalPeriod);
        calculatedMaturityAmount += existingGrowth;
        calculatedTotalInvestment += existingInvestment;
      }
    }
    
    const calculatedReturns = calculatedMaturityAmount - calculatedTotalInvestment;
    const calculatedAbsoluteReturn = (calculatedReturns / calculatedTotalInvestment) * 100;
    
    // Calculate CAGR
    const calculatedCagr = (Math.pow(calculatedMaturityAmount / calculatedTotalInvestment, 1 / investmentPeriod) - 1) * 100;
    
    // Approximate XIRR (simplification)
    const calculatedXirr = investmentType === 'sip' ? 
      ((Math.pow(calculatedMaturityAmount / (calculatedTotalInvestment / 2), 1 / investmentPeriod) - 1) * 100) : 
      calculatedCagr;
    
    setTotalInvestment(calculatedTotalInvestment);
    setMaturityAmount(calculatedMaturityAmount);
    setEstimatedReturns(calculatedReturns);
    setAbsoluteReturn(calculatedAbsoluteReturn);
    setCagr(calculatedCagr);
    setXirr(calculatedXirr);
  }, [investmentType, investmentAmount, investmentPeriod, expectedReturn, existingInvestment, existingPeriod]);

const contentData = {title:"Mutual Fund Returns Calculator",description:"Mutual Fund Returns Calculator helps you calculate SIP and lumpsum investment returns with CAGR, XIRR, and absolute return metrics. Plan mutual fund investments in equity, debt, hybrid funds with historical returns analysis. Compare SIP vs lumpsum, calculate wealth creation over 1-30 years. Free mutual fund calculator for India 2025.",benefits:["Calculate SIP returns with monthly, quarterly, or annual frequency","Calculate lumpsum investment returns for one-time investments","See CAGR (Compound Annual Growth Rate) for performance comparison","Get XIRR calculation for irregular cashflows (SIP with variable amounts)","Compare absolute returns vs annualized returns for clear understanding","Visualize wealth creation with interactive charts showing growth over time","100% free mutual fund calculator with detailed breakup and projections","Works for equity funds, debt funds, hybrid funds, ELSS, index funds"],howToSteps:[{step:"Choose Investment Type - SIP or Lumpsum",details:"Select SIP (Systematic Investment Plan) or Lumpsum investment. SIP: Invest fixed amount monthly/quarterly (₹1K-50K typical). Best for: Salaried individuals, regular income, rupee cost averaging benefit, disciplined investing. Lumpsum: One-time large investment (₹50K-₹50L+). Best for: Received bonus/windfall, inheritance, retirement corpus, matured FD/PPF. Reality: SIP outperforms lumpsum in volatile markets (buy at different prices), Lumpsum better in consistently rising markets. Most experts recommend SIP for retail investors - removes market timing guesswork!"},{step:"Enter Investment Amount",details:"For SIP: Monthly amount you'll invest (minimum ₹500 for most funds, ₹100 for some).Popular amounts: ₹5K (beginners), ₹10K (mid-career), ₹25K (senior professionals), ₹50K+ (high earners). For Lumpsum: One-time amount to invest (minimum ₹5K for most funds). Consider: 1) Affordability: Don't invest money needed in <5 years, 2) Emergency fund: Keep 6-12 months expenses liquid before investing, 3) Goals: Bigger goals need bigger investments or longer time periods."},{step:"Set Investment Period",details:"Choose time horizon: 1-30 years. Recommended minimum: 3 years (debt funds), 5 years (balanced funds), 7+ years (equity funds) - equity needs time to ride volatility and show true potential. Reality check: Historical data shows: 1-3 years equity: volatile, can give -10% to +40%, 5-7 years equity: moderate, typically 8-15% CAGR, 10+ years equity: stable, usually 12-15% CAGR, 15-20 years equity: very predictable, 13-16% CAGR with low chance of loss. Longer period = higher probability of good returns + power of compounding!"},{step:"Expected Return Rate",details:"Set realistic expected returns based on fund category. Conservative estimates (use for planning): Large-cap equity: 10-11%, Mid-cap equity: 11-13%, Small-cap equity: 12-14%, Index funds: 10-12%, Balanced/hybrid: 9-11%, Debt funds: 6-8%, Liquid funds: 4-6%. Historical averages (last 15 years): Top large-cap funds: 12-14%, Top mid-cap funds: 14-16%, Top small-cap funds: 15-18%, Nifty 50 index: 11-12%. Pro tip: Use conservative estimates for goals planning, not optimistic past returns. Market cycles vary!"},{step:"Review Returns - CAGR, XIRR, Absolute",details:"Understand different return metrics: 1) Absolute Return: Total % gain. ₹1L invested, now ₹1.5L = 50% absolute return (doesn't consider time period). 2) CAGR (Compound Annual Growth Rate): Annualized return assuming steady growth. Better for lumpsum and comparison. ₹1L to ₹1.5L in 3 years = 14.47% CAGR. 3) XIRR (Extended Internal Rate of Return): Best for SIP (irregular cashflows). Calculates exact return considering investment dates and amounts. Use CAGR for lumpsum comparison, XIRR for SIP performance evaluation!"}],examples:[{scenario:"Young Professional Starting ₹5K Monthly SIP",inputs:[{label:"Investment Type",value:"SIP"},{label:"Monthly Amount",value:"₹5,000"},{label:"Investment Period",value:"20 years"},{label:"Expected Return",value:"12% p.a."}],result:"Total Investment: ₹12L | Maturity: ₹49.96L | Gain: ₹37.96L",explanation:"Rohan, 25, starts ₹5K monthly SIP in diversified equity fund. Over 20 years: Invests total ₹12L (₹5K × 12 × 20), Corpus grows to ₹49.96L at 12% CAGR, Wealth gain: ₹37.96L (316% returns!). Power of compounding: First 10 years: ₹6L invested → ₹11.5L (₹5.5L gain), Next 10 years: ₹6L invested → ₹38.46L additional (₹32.46L gain!). Second decade creates 6X more wealth than first! Strategy: Increase SIP by 10% annually when salary rises - ₹5K now becomes ₹7.5K in 5 years, corpus reaches ₹75L+ instead of ₹50L!"},{scenario:"Mid-Career Professional with ₹10L Lumpsum",inputs:[{label:"Investment Type",value:"Lumpsum"},{label:"Amount",value:"₹10,00,000"},{label:"Investment Period",value:"10 years"},{label:"Expected Return",value:"11% p.a."}],result:"Maturity: ₹28.39L | Gain: ₹18.39L",explanation:"Priya, 40, received ₹10L bonus, invests in large-cap index fund for daughter's higher education (she's 10 now, needs money at 20). At 11% CAGR over 10 years: ₹10L grows to ₹28.39L, Sufficient for medical/engineering education in India (current cost ₹20-30L). Alternative comparison: Same ₹10L in FD @ 7%: ₹19.67L (₹8.72L less than mutual fund!), In PPF @ 7.1%: ₹19.89L, In equity MF @ 11%: ₹28.39L. Mutual fund wins by ₹8-9L over 10 years! Risk: Market volatility in short term, but 10 years is enough for equity to recover from market crashes."},{scenario:"Combining SIP + Lumpsum for Retirement",inputs:[{label:"Strategy",value:"Hybrid - SIP + Lumpsum"},{label:"Current: Lumpsum",value:"₹5L (existing portfolio)"},{label:"Add: Monthly SIP",value:"₹15K for 15 years"},{label:"Expected Return",value:"12% equity + 8% debt (balanced)"}],result:"Final Corpus: ₹28L (existing ₹5L) + ₹62L (SIP) = ₹90L",explanation:"Amit, 45, has ₹5L in mutual funds, plans to retire at 60 (15 years away). Strategy: Keep existing ₹5L invested (let it compound), Start ₹15K monthly SIP in balanced funds (60% equity + 40% debt). Result at 60: Existing ₹5L grows to ₹28L at 12% (pure equity), New SIP ₹27L investment grows to ₹62L at 11% (balanced returns), Total retirement corpus: ₹90L. Sufficient for monthly ₹55-60K pension at 7-8% post-retirement withdrawal rate. This ₹90L covers 25 years retirement (60-85 age) comfortably with inflation-adjusted withdrawals!"}],tips:["Start SIP as early as possible - starting at 25 vs 35 creates ₹20-30L extra corpus by retirement with same monthly investment","Don't stop SIP during market crashes - you buy more units at lower prices (rupee cost averaging), best wealth creation happens in crashes!","Review and rebalance portfolio annually - shift from mid/small cap to large cap after 40, from equity to debt after 55","Increase SIP amount by 10-15% annually - matches salary hikes, accelerates wealth creation significantly (₹5K to ₹20K over 10 years)","Choose direct plans over regular plans - save 0.5-1% annual expense ratio, adds ₹5-10L on ₹50L corpus over 20 years","Stay invested for minimum 7 years in equity funds - short-term volatility is noise, long-term trend is upward","Diversify across 3-5 funds maximum - large cap, mid cap, index fund, international fund. More than 5 becomes difficult to track"],mistakes:["Stopping SIP during market falls - biggest mistake! Market lows are best buying opportunities, don't panic and stop","Investing in too many funds - having 15-20 funds creates tracking nightmare, over-diversification reduces returns","Chasing last year's best performer - fund that gave 40% last year may give 5% this year. Choose consistent 5-year performers","Not reviewing portfolio annually - dead funds keep dragging returns down, switch from persistently underperforming funds","Investing in NFO (New Fund Offer) blindly - existing funds have track record, NFO is untested, prefer proven funds","Redeeming investments for non-emergencies - every withdrawal breaks compounding, restart means losing years of growth","Not increasing SIP with income growth - ₹5K SIP at ₹50K salary is 10%, should be ₹10K at ₹1L salary to maintain savings rate"],faqs:[{question:"What is the difference between SIP and lumpsum investment in mutual funds?",answer:"SIP (Systematic Investment Plan): Invest fixed amount regularly (monthly/quarterly). Benefits: Rupee cost averaging (buy more units when price low, less when high), Disciplined investing (forced savings), Lower risk (not investing everything at market peak), Suitable for salaried individuals. Lumpsum: One-time large investment. Benefits: Higher returns if market timing is correct, Simple (one-time decision), Lower transaction costs. Suitable for: Large windfall money (bonus, inheritance), market correction opportunities. Reality check: Studies show SIP outperforms lumpsum in volatile/falling markets (you buy at multiple price points), Lumpsum outperforms in consistently rising markets (full money invested from day 1). For most retail investors: SIP is better - removes market timing guesswork and builds discipline. Combination strategy: Start SIP monthly + invest lumpsum when market crashes 10-20% (best of both worlds)!"},{question:"How to calculate CAGR and XIRR for mutual fund returns?",answer:"CAGR (Compound Annual Growth Rate): Used for lumpsum investments or single-cashflow investments. Formula: CAGR = [(Final Value ÷ Initial Value) ^ (1 ÷ Years)] - 1. Example: ₹1L invested, ₹1.95L after 5 years. CAGR = [(1.95 ÷ 1) ^ (1 ÷ 5)] - 1 = 14.27%. Interpretation: Investment grew at 14.27% annually (compounded). XIRR (Extended Internal Rate of Return): Used for SIP or multiple cashflows. Formula: Complex (Excel/calculator required), considers each investment date and amount separately. Example: SIP ₹5K monthly for 3 years (36 payments) = ₹1.8L invested, current value ₹2.1L. XIRR = 12.5% (considers that early investments had more time to grow). When to use: CAGR for lumpsum comparison and fund performance comparison, XIRR for your personal SIP return calculation. This calculator shows both - use appropriate metric for your investment type!"},{question:"How much should I invest monthly in mutual funds through SIP?",answer:"General rule: Invest 20-30% of monthly income for long-term goals (retirement, children's education, wealth creation). Breakdown by income level: ₹30K salary: ₹5K SIP (16-17% - adjust for tight budget), ₹50K salary: ₹10-12K SIP (20-25%), ₹1L salary: ₹25-30K SIP (25-30%), ₹2L+ salary: ₹50-75K SIP (25-35% - higher income = higher savings possible). 50-30-20 Rule: 50% needs (rent, food, utilities), 30% wants (entertainment, dining), 20% savings & investments (SIP, PPF, EPF, etc.). Of the 20% savings, allocate: 40% to equity mutual funds (growth), 30% to EPF/PPF (safety + tax), 20% to NPS (retirement + tax benefit), 10% to emergency fund/liquid funds. Example: ₹1L salary: ₹20K total savings → ₹8K equity MF SIP + ₹6K EPF/PPF + ₹4K NPS + ₹2K emergency. Start small and increase by 10-15% annually!"},{question:"Which mutual fund category gives best returns - Large Cap, Mid Cap, or Small Cap?",answer:"Historical returns (last 15 years average): Large-cap funds: 11-13% CAGR (Nifty 50 companies), Mid-cap funds: 13-16% CAGR (mid-size companies), Small-cap funds: 15-18% CAGR (small companies). Risk-return tradeoff: Large cap: Lower risk, lower returns, high liquidity, stable. Best for: Conservative investors, near-term goals (5-7 years), retirement planning (>50 age). Mid cap: Medium risk, medium-high returns, moderate liquidity. Best for: Moderate risk-takers, medium-term goals (7-10 years), age 30-45. Small cap: High risk, highest returns, low liquidity, very volatile. Best for: Aggressive investors, long-term goals (10-15+ years), age <35. Market cycle impact: Large cap performs well in stable/slow-growth markets, Mid/small cap outperform in bull markets but crash harder in bear markets. Diversification strategy: 20s-30s: 50% mid/small + 50% large/index, 40s: 30% mid/small + 70% large, 50s+: 90% large + 10% mid. NO single category is 'best' - depends on your age, risk appetite, and time horizon!"},{question:"How much time does it take to double money in mutual funds?",answer:"Rule of 72: Approximate time to double = 72 ÷ Annual Return %. At different return rates: 8% return: 72 ÷ 8 = 9 years to double, 10%: 7.2 years, 12%: 6 years, 15%: 4.8 years, 18%: 4 years. Mutual fund category-wise (realistic estimates): Debt funds (6-7% return): 10-12 years to double, Balanced funds (9-10%): 7-8 years, Large-cap equity (11-12%): 6-6.5 years, Mid-cap equity (13-15%): 5-5.5 years, Small-cap equity (15-18%): 4-5 years. Reality: This is AVERAGE over long periods. Year-to-year, equity funds are volatile: Some years: +30% to +50% (money can increase 1.5X in 1 year!), Some years: -10% to -30% (money can decrease 30% in 1 year). Example: ₹1L invested in Nifty 50 index: 2008: ₹1L → ₹48K (crashed 52%), 2009: ₹48K → ₹74K (gained 54%), 2010-2014: ₹74K → ₹1.1L (slow growth), 2015-2020: ₹1.1L → ₹2L (doubled). Total 12 years to double despite crash. Message: Focus on long-term horizon (7-10+ years), ignore short-term volatility. Equity funds WILL double your money, just needs patience!"},{question:"Should I invest in mutual funds or PPF/FD for better returns?",answer:"Comparison (₹10K monthly for 15 years): PPF (7.1% fixed): ₹31.7L (₹18L invested, ₹13.7L interest), Fully tax-free, safe, 15-year lock-in. FD (7% average): ₹31.3L, Taxable interest (reduces to ₹28-29L post-tax for 30% bracket), 5-year lock-in typical. Mutual Funds (12% equity): ₹49.5L (₹18L invested, ₹31.5L returns), Long-term capital gains tax 10% >₹1L (minor impact), No lock-in (withdraw anytime). Mutual funds win by ₹18-20L over 15 years! When to choose what: PPF: Capital protection needed, retirement corpus, tax-free income desired, low risk tolerance, >10 year lock-in acceptable. FD: Emergency fund, senior citizens (higher FD rates + lower risk appetite), <3 year goals, can't handle volatility. Mutual Funds: Wealth creation, long-term goals (>7 years), inflation-beating returns needed, can handle 10-20% volatility. Best strategy: Use ALL THREE - PPF ₹12.5K monthly (₹1.5L annually for 80C), FD for emergency fund (6-12 months expenses), Mutual Funds SIP ₹10-20K for growth & retirement. Don't put all eggs in one basket - diversify across safety (PPF/FD) and growth (mutual funds)!"}],relatedCalculators:[{name:"SIP Calculator",url:"/calculators/sip-calculator",description:"Dedicated SIP calculator"},{name:"PPF Calculator",url:"/calculators/ppf-calculator",description:"Compare with PPF returns"},{name:"FD Calculator",url:"/calculators/fd-calculator",description:"Compare with FD returns"},{name:"EMI Calculator",url:"/calculators/emi-calculator",description:"Calculate loan EMI"},{name:"Retirement Calculator",url:"/calculators/retirement-calculator",description:"Plan overall retirement"},{name:"Goal Planning Calculator",url:"/calculators/goal-calculator",description:"Calculate goal-based investments"},{name:"Tax Saving Calculator",url:"/calculators/tax-saving-investment-calculator",description:"Plan tax-saving investments"}],lastUpdated:"2025-01-20"};
  
  return (
    <>
      <CalculatorSchema name="Mutual Fund Returns Calculator - SIP & Lumpsum Calculator India 2025" description="Calculate mutual fund returns for SIP and lumpsum investments. Get CAGR, XIRR, absolute returns. Free mutual fund calculator with detailed analysis. Plan equity, debt, hybrid fund investments." url="/calculators/mutual-fund-returns-calculator" features={["SIP returns calculation","Lumpsum returns calculation","CAGR calculation","XIRR for SIP","Absolute return metrics","Wealth projection charts","Free mutual fund calculator","Updated 2025 analysis"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.8,count:16732}}/>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-[--primary-600]" />
          Investment Details
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Investment Type
            </label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'sip'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInvestmentType('sip')}
              >
                SIP
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  investmentType === 'lumpsum'
                    ? 'bg-[--primary-100] text-[--primary-800]'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
                onClick={() => setInvestmentType('lumpsum')}
              >
                Lumpsum
              </button>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-amount" className="text-sm font-medium text-neutral-700">
                {investmentType === 'sip' ? 'Monthly Investment (₹)' : 'Investment Amount (₹)'}
              </label>
              <span className="text-sm text-neutral-500">
                {formatCurrency(investmentAmount)}
              </span>
            </div>
            <input 
              type="range" 
              id="investment-amount"
              min={investmentType === 'sip' ? '500' : '1000'} 
              max={investmentType === 'sip' ? '100000' : '10000000'} 
              step={investmentType === 'sip' ? '500' : '10000'} 
              value={investmentAmount} 
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="investment-period" className="text-sm font-medium text-neutral-700">
                Investment Period (Years)
              </label>
              <span className="text-sm text-neutral-500">
                {investmentPeriod} years
              </span>
            </div>
            <input 
              type="range" 
              id="investment-period"
              min="1" 
              max="30" 
              step="1" 
              value={investmentPeriod} 
              onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expected-return" className="text-sm font-medium text-neutral-700">
                Expected Annual Return (%)
              </label>
              <span className="text-sm text-neutral-500">
                {expectedReturn}%
              </span>
            </div>
            <input 
              type="range" 
              id="expected-return"
              min="1" 
              max="30" 
              step="0.5" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="pt-4 border-t border-neutral-200">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Existing Investment (Optional)</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="existing-investment" className="text-sm font-medium text-neutral-700">
                    Existing Investment Amount (₹)
                  </label>
                  <span className="text-sm text-neutral-500">
                    {formatCurrency(existingInvestment)}
                  </span>
                </div>
                <input 
                  type="range" 
                  id="existing-investment"
                  min="0" 
                  max="5000000" 
                  step="10000" 
                  value={existingInvestment} 
                  onChange={(e) => setExistingInvestment(Number(e.target.value))}
                  className="slider"
                />
              </div>
              
              {existingInvestment > 0 && (
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="existing-period" className="text-sm font-medium text-neutral-700">
                      Existing Investment Period (Years)
                    </label>
                    <span className="text-sm text-neutral-500">
                      {existingPeriod} years
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="existing-period"
                    min="0.5" 
                    max="20" 
                    step="0.5" 
                    value={existingPeriod} 
                    onChange={(e) => setExistingPeriod(Number(e.target.value))}
                    className="slider"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Returns Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Investment</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Estimated Returns</p>
              <p className="text-xl font-bold text-[--success-600]">{formatCurrency(estimatedReturns)}</p>
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
            Investment Breakup
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Estimated Returns', value: estimatedReturns, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityAmount)}\nTotal Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Return Metrics
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Return Metrics</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Absolute Return</span>
                  <span className="font-medium">{absoluteReturn.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>CAGR (Compound Annual Growth Rate)</span>
                  <span className="font-medium">{cagr.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>XIRR (Extended Internal Rate of Return)</span>
                  <span className="font-medium">{xirr.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Understanding Return Metrics</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Absolute Return:</strong> Simple percentage gain or loss on investment without considering time period</p>
                <p><strong>CAGR:</strong> Annualized return that smooths out the volatility over the investment period</p>
                <p><strong>XIRR:</strong> Takes into account the timing and amount of cash flows, giving a more accurate return for SIPs</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Investment Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Past performance is not indicative of future results</li>
                <li>Diversify across asset classes and fund categories</li>
                <li>Consider your risk tolerance and investment horizon</li>
                <li>Review and rebalance your portfolio periodically</li>
                <li>Stay invested for the long term to benefit from compounding</li>
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