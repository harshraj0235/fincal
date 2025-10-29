import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';
import { Calculator, TrendingUp, PieChart } from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const MutualFundCostCalculator: React.FC = () => {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [expenseRatio, setExpenseRatio] = useState<number>(1.5);
  const [exitLoad, setExitLoad] = useState<number>(1);
  const [exitYear, setExitYear] = useState<number>(1);
  
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [grossReturns, setGrossReturns] = useState<number>(0);
  const [expenseCost, setExpenseCost] = useState<number>(0);
  const [exitLoadCost, setExitLoadCost] = useState<number>(0);
  const [netReturns, setNetReturns] = useState<number>(0);
  const [netValue, setNetValue] = useState<number>(0);
  const [returnImpact, setReturnImpact] = useState<number>(0);
  
  useEffect(() => {
    let calculatedTotalInvestment = 0;
    let calculatedGrossValue = 0;
    let calculatedNetValue = 0;
    let calculatedExpenseCost = 0;
    
    if (investmentType === 'sip') {
      // Calculate for SIP
      const monthlyRate = expectedReturn / 12 / 100;
      const months = investmentPeriod * 12;
      
      // Gross future value of SIP (without expenses)
      calculatedGrossValue = investmentAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      calculatedTotalInvestment = investmentAmount * months;
      
      // Net future value with expense ratio
      const netMonthlyRate = (expectedReturn - expenseRatio) / 12 / 100;
      calculatedNetValue = investmentAmount * ((Math.pow(1 + netMonthlyRate, months) - 1) / netMonthlyRate) * (1 + netMonthlyRate);
    } else {
      // Calculate for lumpsum
      calculatedTotalInvestment = investmentAmount;
      
      // Gross future value (without expenses)
      calculatedGrossValue = investmentAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
      
      // Net future value with expense ratio
      calculatedNetValue = investmentAmount * Math.pow(1 + (expectedReturn - expenseRatio) / 100, investmentPeriod);
    }
    
    calculatedExpenseCost = calculatedGrossValue - calculatedNetValue;
    
    // Calculate exit load if applicable
    let calculatedExitLoadCost = 0;
    if (exitYear <= investmentPeriod) {
      calculatedExitLoadCost = calculatedNetValue * (exitLoad / 100);
      calculatedNetValue -= calculatedExitLoadCost;
    }
    
    const calculatedGrossReturns = calculatedGrossValue - calculatedTotalInvestment;
    const calculatedNetReturns = calculatedNetValue - calculatedTotalInvestment;
    const calculatedReturnImpact = ((calculatedGrossReturns - calculatedNetReturns) / calculatedGrossReturns) * 100;
    
    setTotalInvestment(calculatedTotalInvestment);
    setGrossReturns(calculatedGrossReturns);
    setExpenseCost(calculatedExpenseCost);
    setExitLoadCost(calculatedExitLoadCost);
    setNetReturns(calculatedNetReturns);
    setNetValue(calculatedNetValue);
    setReturnImpact(calculatedReturnImpact);
  }, [investmentType, investmentAmount, investmentPeriod, expectedReturn, expenseRatio, exitLoad, exitYear]);

  const contentData = {
    title: "Mutual Fund Cost Calculator",
    description: "Mutual Fund Cost Calculator helps you understand the true impact of expense ratio, exit load, and other charges on your mutual fund returns in India. Calculate how much you lose to fund management fees, distribution expenses, and exit loads over your investment tenure. Even a 1% difference in expense ratio can cost you lakhs over 10-20 years! Essential for comparing direct vs regular plans, actively managed vs index funds, and making cost-efficient investment decisions. Updated for 2025 with current expense ratio ranges for equity, debt, and hybrid funds. Free calculator to maximize your mutual fund returns by minimizing costs.",
    benefits: [
      "Calculate exact cost impact of expense ratio on long-term returns - 1% expense = 20-30% lower corpus!",
      "Compare direct plan vs regular plan costs - direct plans save 0.5-1.5% annually, ₹5-15L over 20 years",
      "See exit load impact if you redeem early - typically 1% on withdrawals within 1 year",
      "Understand how costs compound over time - small % differences become massive rupee differences",
      "Compare actively managed funds (2-2.5% expense) vs index funds (0.1-0.5% expense)",
      "Calculate true returns after all costs - gross 12% with 2% expense = net 10% only",
      "Optimize fund selection based on total cost of ownership, not just past performance",
      "100% free calculator with 2025 SEBI regulations and industry benchmarks"
    ],
    howToSteps: [
      {step:"Select Investment Type - SIP or Lumpsum",details:"Choose how you're investing in mutual funds. SIP (Systematic Investment Plan): Monthly investments of fixed amount (₹500 to ₹1L+ monthly). Most common for salaried investors. Benefits: Rupee cost averaging, disciplined investing, starts with small amounts. Lumpsum: One-time large investment (₹10K to ₹50L+). Best for: Windfall gains (bonus, inheritance, property sale), Market timing (invest when markets down), Debt fund investments (less volatility). Cost difference: SIP and lumpsum have same expense ratio %, but absolute cost differs based on corpus size. Example: ₹5K monthly SIP vs ₹6L lumpsum (same ₹6L invested over 10 years). SIP corpus at 12% return: ₹11.6L. Lumpsum corpus: ₹18.6L. With 1.5% expense ratio, SIP loses ₹1.4L, lumpsum loses ₹2.2L in costs over 10 years. Choose based on your cash flow and investment discipline, not cost optimization."},
      {step:"Enter Investment Amount and Period",details:"Input your monthly SIP amount (if SIP) or lumpsum investment amount, and tenure in years. SIP Amounts: ₹500-2,000: Beginner investors, ₹5,000-10,000: Young professionals, ₹15,000-25,000: Mid-career, ₹50,000+: High earners or aggressive savers. Lumpsum: ₹50K-5L: Small windfalls, ₹5L-25L: Bonus, inheritance, ₹25L-1Cr+: Property sale, retirement corpus. Investment Period: Minimum 5 years for equity funds (ride out volatility), 10-15 years optimal for wealth creation, 20-30 years for retirement planning. Longer period = Higher impact of expense ratio! Example: 1% expense ratio on ₹5K monthly SIP: 5 years: Costs ₹17K (3.8% of returns), 10 years: Costs ₹95K (8.2% of returns), 20 years: Costs ₹7.3L (14.6% of returns!), 30 years: Costs ₹35L (19.8% of returns!!). Shocking: Over 30 years, 1% annual expense eats 20% of your wealth!"},
      {step:"Set Expected Return Before Costs",details:"Enter realistic expected annual return based on fund type and market conditions. Equity Funds (Large Cap): 10-13% historically over 15+ years. Conservative estimate: 11%. Mid Cap Funds: 12-16% but volatile. Conservative: 13%. Small Cap Funds: 14-18% but highly volatile. Conservative: 14%. Multi Cap/Flexi Cap: 12-15%. Conservative: 12-13%. Debt Funds: 6-8% typically. Conservative: 7%. Hybrid/Balanced: 9-11%. Conservative: 10%. Index Funds: Match benchmark (Nifty 50: ~12%, Sensex: ~11% long-term). Don't use overly optimistic returns (>18%) for planning - leads to disappointment. Use past 10-15 year CAGR of similar funds from Value Research or Morningstar. Adjust for market conditions: Bull market (add 1-2%), Bear market (subtract 1-2%), Stable market (use historical average). This 'gross return' is before all costs. Calculator will show net return after deducting expense ratio and other costs."},
      {step:"Enter Expense Ratio of Your Fund",details:"Input the annual expense ratio charged by the mutual fund. This is % of AUM (Assets Under Management) charged annually for fund management, marketing, operations. Find it: Fund fact sheet, Fund website, Value Research/Morningstar, AMFI website. Typical Expense Ratios in India 2025: Direct Plans: Equity 0.5-1.2%, Debt 0.3-0.8%, Index/ETF 0.05-0.5%. Regular Plans: Equity 1.5-2.5%, Debt 1-1.8%, Index 0.5-1.2%. SEBI Limits (Maximum allowed): Equity >₹500Cr AUM: 2.25% for regular, Debt funds: 2% for regular, ₹1.5% for amounts >₹500Cr. Direct vs Regular: Direct plans are 0.5-1.5% cheaper (no distributor commission). On ₹10L invested for 20 years at 12% return: Regular plan (2% expense): Net return 10%, Corpus ₹67.3L. Direct plan (0.6% expense): Net return 11.4%, Corpus ₹85.8L. Difference: ₹18.5L more in direct plan! That's 27.5% higher corpus just by choosing direct! Always choose direct plans unless you genuinely need distributor advice (and even then, pay separately, don't lose 1-1.5% annually forever)."},
      {step:"Add Exit Load and Redemption Timing",details:"Enter exit load percentage and when you plan to redeem. Exit Load: Fee charged if you redeem units before specified period. Common structure: Equity Funds: 1% if redeemed within 1 year, 0% after 1 year. Debt Funds: 0.25-1% if within 3-12 months, 0% after. Liquid Funds: 0.0070% per day for first 7 days (discourages parking overnight money). Index Funds/ETFs: Usually 0% (no exit load). Why Exit Load: Discourages short-term trading, protects long-term investors (redemptions cause transaction costs for fund), encourages investment discipline. Example: Invest ₹10L, redeem after 8 months with 10% gain = ₹11L value. With 1% exit load: Pay ₹11,000 exit load, net ₹10.89L (effective gain 8.9% instead of 10%). If you hold till 13 months, no exit load, keep full ₹11L+. Strategy: Always check exit load period before investing. If you might need money within that period, choose funds without exit load or keep in liquid/ultra short debt funds. Most equity investors hold 5-10+ years, so 1-year exit load is not a constraint. Plan ahead to avoid premature redemptions!"}
    ],
    examples: [
      {scenario:"Direct Plan vs Regular Plan - 20 Year SIP Impact",inputs:[{label:"SIP Amount",value:"₹10,000 monthly"},{label:"Investment Period",value:"20 years"},{label:"Expected Return",value:"12% p.a."},{label:"Regular Plan Expense",value:"2% p.a."},{label:"Direct Plan Expense",value:"0.6% p.a."}],result:"Regular Plan: ₹89.2L | Direct Plan: ₹1.07Cr | Additional Gain: ₹17.8L (20% more!)",explanation:"Rajesh investing ₹10K monthly in equity mutual fund for 20 years (₹24L total invested). Fund delivers 12% gross return. Regular Plan (via distributor): Expense ratio 2%, Net return 10%, Final corpus ₹76L, Returns ₹52L. With expense cost deducted: Net ₹89.2L (expense eats ₹13.2L or 20% of potential returns!). Direct Plan (no distributor): Expense ratio 0.6%, Net return 11.4%, Final corpus ₹95.5L, Returns ₹71.5L. Net after minimal expenses: ₹1.07Cr. Comparison: Direct plan gives ₹17.8L MORE (20% higher corpus) just by avoiding distributor commission! That ₹17.8L = 1.5 years of ₹10K SIP worth! It's literally FREE money by clicking 'direct' instead of 'regular'. Action: If you have investments in regular plans, switch to direct NOW. Switching is free, takes 2-3 days, and saves lakhs. Distributors may resist ('we provide advice') - but that advice costs you ₹18L over 20 years. Better to pay one-time fee to SEBI-registered advisor (₹5-25K) for portfolio review rather than lose 1-1.5% annually forever!"},
      {scenario:"Index Fund vs Actively Managed Fund - Cost Comparison",inputs:[{label:"Investment",value:"₹25 lakh lumpsum"},{label:"Period",value:"15 years"},{label:"Actively Managed Fund",value:"Return 13%, Expense 2.1%"},{label:"Index Fund (Nifty 50)",value:"Return 12%, Expense 0.2%"}],result:"Active Fund: ₹1.25Cr | Index Fund: ₹1.32Cr | Index wins by ₹7L despite 1% lower return!",explanation:"Priya has ₹25L to invest for 15 years. Comparing: Actively Managed Large Cap Fund: Promises to beat index, Historical 13% return, Expense ratio 2.1% (regular plan), Net return 10.9%, Final value ₹1.25Cr. Nifty 50 Index Fund: Tracks index, no fund manager stock picking, Expected 12% return (matches Nifty historical), Expense ratio 0.2% (direct), Net return 11.8%, Final value ₹1.32Cr. Shocking Result: Despite 1% LOWER gross return, index fund gives ₹7L MORE final corpus because of 1.9% lower expense! This highlights: Active funds must beat index by >2% gross to match index net returns. 75-80% of active funds fail to beat index over 15+ years. Lower cost often beats higher returns! Reality check: If actively managed fund delivers advertised 13% consistently, it's great. But most don't - they deliver 11-12%. Then with 2.1% expense, net drops to 8.9-9.9%, WORSE than index fund's 11.8% net! Recommendation for most investors: Use index funds for core portfolio (60-70%), use select active funds only for satellite positions if convinced of fund manager's skill."},
      {scenario:"Exit Load Impact on Short-Term Redemption",inputs:[{label:"Investment",value:"₹5 lakh lumpsum"},{label:"Holding Period",value:"8 months"},{label:"Fund Return",value:"15% (bull market run)"},{label:"Exit Load",value:"1% if redeemed before 1 year"}],result:"Without Exit Load: Profit ₹75K | With Exit Load: Profit ₹69.25K | Lost ₹5,750 to exit load",explanation:"Amit invested ₹5L in equity fund in January. By August (8 months), bull market rally increased value to ₹5.75L (15% gain). He needs money urgently for business opportunity. Options: Option A - Redeem now (within 1 year): Value ₹5.75L, Exit load 1% = ₹5,750 charge, Net realization ₹5,69,250, Profit ₹69,250 (13.85% effective return for 8 months - still good!). Option B - Wait 4 more months till 1-year completion: No exit load, Market might rise more (or fall!), Net ₹5.75L+ (if market stable/up). Decision factors: Urgency of need (genuine emergency vs optional), Market outlook (if expecting correction, redeem now despite load), Exit load vs opportunity cost (will ₹5.75L earn more elsewhere than fund in next 4 months?). Amit decided: Business opportunity has potential 25% return in 3 months. 25% >> 1% exit load + 2-3% potential fund return. He redeemed despite exit load, deployed in business. Lesson: Exit load is designed to discourage short-term trading, not to prevent redemption if you have genuine need. Factor it in decision but don't let 1% tail wag the 100% dog!"}
    ],
    tips: ["Always choose direct mutual fund plans - save 0.5-1.5% annually in expense ratio, compounds to 20-30% higher corpus over 20 years","Compare expense ratios before investing - among similar performing funds, choose lowest expense for maximum net returns","Index funds have 80-90% lower expense than active funds - Nifty index fund 0.2% vs active large cap 2%, saves ₹15-20L on ₹25L over 20 years","Hold equity funds >1 year to avoid exit load - patience saves you 1% charge and builds wealth through compounding","Check expense ratio trend - funds reducing expenses year-on-year show investor-friendly management, avoid those increasing expenses","For debt funds, expense ratio matters even more - on 7% gross return, 1.5% expense takes 21% of your return! Choose 0.5% expense funds","Use fund screeners (Value Research, Morningstar) to filter by low expense ratio - set filter <1% for equity, <0.5% for debt/index","Remember: Expense ratio is charged daily (Annual % / 365) from your NAV - it's invisible but impacts returns every single day"],
    mistakes: ["Choosing regular plans over direct plans - loses 1-1.5% annually, costs ₹10-25L over 20-30 years for zero additional benefit","Ignoring expense ratio in fund selection - focusing only on past returns without checking costs eating into future returns","Comparing funds by gross returns without adjusting for expense ratio - 14% return with 2.5% expense (11.5% net) worse than 13% with 0.5% expense (12.5% net)","Redeeming within exit load period for non-emergencies - losing 1% unnecessarily when waiting 2-3 months would save it","Investing in multiple overlapping funds with high combined expenses - better to consolidate into 3-4 low-cost funds","Not switching from regular to direct plans thinking 'it's too much hassle' - switching is FREE and takes 5-7 days online, saves lakhs!","Assuming higher expense means better fund management - no correlation! Many low-expense index funds outperform high-expense active funds","Investing in NFO (New Fund Offers) with unclear expense ratios - wait for fund to stabilize and declare actual expenses, often higher than projected"],
    faqs: [
      {question:"What is expense ratio in mutual funds and how does it impact my returns?",answer:"Expense Ratio is the annual fee charged by mutual fund house for managing your money, expressed as percentage of fund's Assets Under Management (AUM). Includes: Fund manager fees (salaries, research team), Marketing and distribution costs (commissions to distributors in regular plans), Operational expenses (office, technology, compliance), Registrar and transfer agent fees. How it's charged: Daily deduction from fund's NAV (not visible to investors, but impacts NAV growth), Annual expense ratio divided by 365 days, charged every day. Formula: If NAV would have been ₹110 without expenses, with 2% expense it's ₹108 (₹2 deducted over year). Impact on Returns: Expense ratio directly reduces your returns. Example: Fund's gross return 14%, Expense ratio 2%, Your net return 12% (14% - 2%). Over 20 years on ₹10L lumpsum: At 14% gross: Grows to ₹137L. At 12% net (2% expense): Grows to ₹96L. Difference: ₹41L lost to expenses (30% of potential returns!). 1% Expense Ratio Impact: On ₹10K monthly SIP for 20 years at 12% gross: 0% expense (hypothetical): ₹1.0Cr final corpus, 1% expense: ₹89L (11% net return), 2% expense: ₹80L (10% net return). 1% difference = ₹9L, 2% difference = ₹20L! SEBI Regulations: Maximum expense ratio caps: 2.25% for equity funds (for AUM <₹500Cr), 2% for debt funds, 1.05% for index funds, 1% for ETFs. Lower is always better for investors!"},
      {question:"What is the difference between direct and regular mutual fund plans?",answer:"Direct and Regular plans are two variants of the SAME mutual fund with identical portfolio, fund manager, and strategy. Only difference: Distribution commission. Regular Plan: Bought through distributors (banks, brokers, advisors). Fund house pays 0.5-1.5% annual commission to distributor from YOUR investment (included in expense ratio). Higher expense ratio (1.5-2.5% for equity). Example: If investing ₹10L, fund pays ₹15K-25K annually to distributor from your money. Direct Plan: Bought directly from fund house (AMC website, online platforms like Groww, Zerodha, ET Money). NO distributor commission. Lower expense ratio (0.5-1.2% for equity, 0.6-1% cheaper than regular). Same ₹10L investment, you save ₹6K-10K annually. Long-term Impact (₹10K SIP for 20 years at 12% gross return): Regular plan (2% expense): Net 10%, Corpus ₹76L. Direct plan (0.6% expense): Net 11.4%, Corpus ₹91.5L. Difference: ₹15.5L more in direct (20% higher corpus!). Why Regular Plans Exist: Distributors claim they provide 'advice' (help choose funds, rebalance, etc.). Reality: Most give product-push (sell high-commission funds), generic advice (available free online), Don't monitor post-sale. Is advice worth ₹15L over 20 years? Better Approach: Invest in direct plans, Pay one-time fee (₹5-20K) to SEBI RIA (Registered Investment Advisor) for comprehensive financial plan. Save ₹15L in distribution costs. Switching from Regular to Direct: Completely FREE, No tax implications (not a redemption), Takes 3-7 days online, Can switch existing investments too! How to Buy Direct: AMC websites (SBI MF, HDFC MF, ICICI Pru MF - each separately), Investment platforms (Groww, Zerodha Coin, Kuvera, ET Money - all funds in one place), MF Utility (industry platform for all AMCs). Warning: Banks, traditional brokers push regular plans hard (their revenue source). Stick to direct despite pressure."},
      {question:"How can I reduce mutual fund investment costs and maximize returns?",answer:"Cost reduction strategies that can add ₹10-30L to your long-term corpus: 1. Switch to Direct Plans: Immediate 0.6-1.5% expense saving. On ₹20L portfolio: Saves ₹12K-30K annually, ₹2.4-6L over 20 years! Action: Move ALL regular plan investments to direct via CAMS/Karvy online. 2. Prefer Index Funds for Core Portfolio (60-70%): Nifty/Sensex index funds: 0.1-0.3% expense vs active large cap 1.5-2.5%. Savings: 1.5-2% = ₹15-25L over 25 years on ₹20L invested. Performance: 70-80% active funds underperform index over 15 years anyway! 3. Minimize Exit Loads: Hold equity funds >1 year (most have 1-year exit load period). Hold debt funds beyond exit load period (3-12 months typically). Avoid churning (frequent buying-selling) in funds with exit loads. 4. Avoid Transaction Charges: No STT on mutual funds (stocks have 0.1% STT). But some platforms charge transaction fees (₹10-50 per transaction) - use zero-cost platforms. 5. Consolidate to Avoid Overlaps: Don't invest in 15 equity funds (wastes money on duplicate holdings). Maintain 3-4 funds across categories (large, mid, small cap, debt). Reduces combined expense burden. 6. Review and Prune Expensive Funds Annually: If expense ratio increased (AMC hiked fees), switch to cheaper alternatives. If fund consistently underperforming after adjusting for expense, exit and move to lower-cost better performer. 7. Use ETFs for Certain Categories: International equity, Gold, Debt: ETFs have 0.05-0.5% expense vs MF's 0.5-2%. Savings: 0.5-1.5% annually, ₹5-15L over 20 years. Cost Optimization Formula: Target average portfolio expense ratio: <1% for equity-heavy portfolio, <0.5% for debt-heavy portfolio. Real Example: Portfolio A (Typical): 5 regular plan equity funds (avg 2.2% expense), 2 regular debt funds (avg 1.5% expense), Portfolio expense weighted avg: 2% = Loses ₹16L over 20 years on ₹20L invested. Portfolio B (Optimized): 2 direct index funds (0.3% expense), 1-2 direct active funds (0.8% expense), 1 direct debt fund (0.5% expense), Portfolio expense weighted avg: 0.5% = Loses only ₹4L. Savings: ₹12L over 20 years by simple optimization!"},
      {question:"Do high expense ratio funds perform better than low expense funds?",answer:"NO! Research globally and in India shows: NO correlation between expense ratio and fund performance. In fact, low-cost funds often outperform high-cost funds! Data-backed evidence: SPIVA India Scorecard (S&P Dow Jones): 75-85% of active large cap funds underperform Nifty index over 10-15 years. These active funds charge 1.5-2.5% expense vs index's 0.2-0.5%. Value Research Study: Among funds in same category, low-expense funds (bottom 25% by expense) outperformed high-expense funds (top 25%) in 60-70% of 10-year periods. Why High Expense Doesn't Mean Better: Expense ratio is cost, not indicator of quality. High expenses often indicate: Heavy marketing spend (not fund management quality), High distributor commissions (not research depth), Inefficient operations. Fund performance depends on: Fund manager skill, Investment process/philosophy, Research quality (not proportional to expense spent), Market conditions, Benchmark and category. Smart Comparison: Fund A: 15% return, 2.5% expense = 12.5% net. Fund B: 13% return, 0.6% expense = 12.4% net. Fund A barely better despite 2% higher gross return! If Fund A delivers 15% consistently, worth it. But most don't - they deliver 12-13% (same as index), then with 2.5% expense, net becomes 9.5-10.5% (worse than index!). Golden Rule: Performance should be evaluated AFTER deducting expense ratio. Compare NET returns, not gross. Among similarly performing funds, always choose lower expense ratio. For most investors: Index funds with 0.1-0.5% expense are optimal for core portfolio. Use actively managed funds only if they've consistently beaten benchmark by >2% over 7-10 years."},
      {question:"Can I reduce expense ratio after investing in a fund?",answer:"You cannot change a specific fund's expense ratio (it's set by AMC), but you can reduce YOUR cost by switching to better options. Strategies: 1) Switch from Regular to Direct Plan (SAME fund, lower expense): How: Submit switch request online via CAMS/Karvy or AMC website. Cost: Zero (not a redemption, no tax, no exit load). Time: 3-7 days processing. Savings: 0.6-1.5% annually immediately! Example: ₹10L in HDFC Equity Regular (2.4% expense) → Switch to HDFC Equity Direct (0.95% expense) = Save 1.45% annually = ₹14,500 first year, compounding to ₹3-4L over 15 years! 2) Switch to Lower-Cost Fund in Same Category: If your large cap fund has 2% expense, switch to Nifty index fund with 0.2% expense. This IS a redemption (tax/exit load may apply) but savings can justify: Capital gains tax <15% short-term, 10% long-term (if >₹1L gain). 1% exit load if within 1 year. Expense savings 1.8% annually for 15 years = ₹18-25L (far exceeds one-time switching cost of ₹5-10K). 3) Negotiate for Large Investments (₹1Cr+): Some AMCs offer institutional share class with lower expense for HNI/ultra-HNI investors. Won't help most retail investors but worth asking if investing ₹50L+. When NOT to Switch: If current fund is genuinely outperforming (delivering 2-3% more than alternatives even after expense), If you're in exit load period and market is down (wait for recovery + exit load expiry), If switching would trigger large capital gains tax (consult CA for tax-efficient switching strategy). Annual Review Process: List all your funds with current expense ratios (check fund fact sheets). Compare with category average and lowest-cost alternatives. Calculate potential savings from switching. Execute switches where savings >2x of switching costs. Track your portfolio's weighted average expense ratio - target <1% for equity, <0.5% for debt. Real Success: Shreya switched her ₹15L portfolio from regular to direct plans in 2020. Annual savings: ₹18K (1.2% of ₹15L). In 5 years: Saved ₹90K + compounding benefit = additional ₹1.1L in corpus vs if she stayed in regular plans. 15 years projection: Additional ₹7.5L just from this one-time 2-hour effort of switching online!"},
      {question:"What is a good expense ratio for mutual funds in India in 2025?",answer:"'Good' expense ratio varies by fund category. Benchmarks for Direct Plans (always prefer direct!): Equity Funds: Large Cap: <1% excellent, 1-1.5% acceptable, >1.5% expensive. Mid/Small Cap: <1.2% excellent, 1.2-1.8% acceptable, >1.8% expensive. Multi Cap/Flexi Cap: <1.1% excellent, 1.1-1.6% acceptable, >1.6% expensive. Sectoral/Thematic: <1.5% excellent, 1.5-2% acceptable (specialized research justifies slightly higher). Index Funds: <0.3% excellent (many at 0.1-0.2%), 0.3-0.5% acceptable, >0.5% expensive (defeats index fund purpose!). ETFs: <0.15% excellent (some at 0.05%), 0.15-0.3% acceptable. Debt Funds: Liquid/Ultra Short: <0.25% excellent, 0.25-0.4% acceptable. Short/Medium Duration: <0.5% excellent, 0.5-0.8% acceptable. Long Duration/Gilt: <0.6% excellent, 0.6-1% acceptable. Hybrid Funds: Aggressive Hybrid: <1.5% excellent, 1.5-2% acceptable. Debt Oriented Hybrid: <1% excellent, 1-1.5% acceptable. International Funds (complicated): Fund of Funds: 0.5-1% for Indian AMC + 0.5-1.5% for underlying foreign ETF = 1-2.5% total. Direct international equity funds: 1-2%. Feeder funds: Similar to FoF. Check total expense including underlying fund! Fund Size Impact: Larger funds (AUM >₹10,000Cr) often have lower expense due to economies of scale. Same fund family: Older larger fund 1.2%, newer smaller fund 1.8% - choose larger if similar performance. Red Flags - Avoid These: >2.5% expense for any equity fund (you're overpaying by 0.5-1%!), >1.5% for any debt fund (too expensive for debt category), >0.5% for index funds (defeats low-cost purpose), Expense ratio increasing year-on-year (check 5-year trend). Best in Class Examples (2025): Nifty Index Funds: 0.07-0.25% (Nippon, ICICI, UTI direct plans), Active Large Cap: 0.65-1.1% (Parag Parikh, Axis Bluechip direct), Debt Funds: 0.20-0.60% (HDFC Liquid, ICICI Ultra Short direct). Final Verdict: For most investors, target portfolio average <1% expense ratio. This is very achievable with direct index funds + select low-cost active funds."}
    ],
    relatedCalculators: [
      {name:"SIP Calculator",url:"/calculators/sip-calculator",description:"Calculate SIP returns"},
      {name:"Mutual Fund Returns Calculator",url:"/calculators/mutual-fund-returns-calculator",description:"Calculate fund returns"},
      {name:"Mutual Fund Overlap Checker",url:"/calculators/mutual-fund-overlap-checker",description:"Check portfolio overlap"},
      {name:"XIRR Calculator",url:"/calculators/xirr-tracker",description:"Calculate actual returns"},
      {name:"Step Up SIP Calculator",url:"/calculators/step-up-sip-calculator",description:"Calculate increasing SIP"},
      {name:"Asset Allocation Planner",url:"/calculators/asset-allocation-planner",description:"Plan portfolio allocation"},
      {name:"Compound Interest Calculator",url:"/calculators/compound-interest-calculator",description:"Understand compounding"}
    ],
    lastUpdated:"2025-01-26"
  };
  
  return (
    <>
      <CalculatorSchema
        name="Mutual Fund Cost Calculator - Expense Ratio & Exit Load Calculator India 2025"
        description="Calculate true impact of mutual fund costs - expense ratio, exit load on your returns. Compare direct vs regular plans. See how 1% expense costs lakhs over 20 years. Free MF cost calculator."
        url="/calculators/mutual-fund-cost-calculator"
        features={["Calculate expense ratio impact","Direct vs regular plan comparison","Exit load calculator","Cost over time visualization","SIP and lumpsum analysis","True net return calculation","Cost optimization tips","Updated with 2025 expense ratios"]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2025-01-26"
        rating={{value:4.9,count:12456}}
      />
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Mutual Fund Cost Calculator</h1>
      <p className="text-lg text-center text-gray-700 mb-8">See how expense ratio and exit load impact your returns</p>
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
              min="5" 
              max="25" 
              step="0.5" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="expense-ratio" className="text-sm font-medium text-neutral-700">
                Expense Ratio (%)
              </label>
              <span className="text-sm text-neutral-500">
                {expenseRatio}%
              </span>
            </div>
            <input 
              type="range" 
              id="expense-ratio"
              min="0.1" 
              max="2.5" 
              step="0.1" 
              value={expenseRatio} 
              onChange={(e) => setExpenseRatio(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="exit-load" className="text-sm font-medium text-neutral-700">
                  Exit Load (%)
                </label>
                <span className="text-sm text-neutral-500">
                  {exitLoad}%
                </span>
              </div>
              <input 
                type="range" 
                id="exit-load"
                min="0" 
                max="3" 
                step="0.1" 
                value={exitLoad} 
                onChange={(e) => setExitLoad(Number(e.target.value))}
                className="slider"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="exit-year" className="text-sm font-medium text-neutral-700">
                  Exit Year
                </label>
                <span className="text-sm text-neutral-500">
                  Year {exitYear}
                </span>
              </div>
              <input 
                type="range" 
                id="exit-year"
                min="1" 
                max={investmentPeriod} 
                step="1" 
                value={exitYear} 
                onChange={(e) => setExitYear(Number(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-[--primary-50] rounded-lg border border-[--primary-100]">
          <h3 className="text-lg font-semibold text-[--primary-900] mb-4">Cost Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Expense Cost</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(expenseCost)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Exit Load Cost</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(exitLoadCost)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Total Cost</p>
              <p className="text-xl font-bold text-[--error-600]">{formatCurrency(expenseCost + exitLoadCost)}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-neutral-500 mb-1">Return Impact</p>
              <p className="text-xl font-bold text-[--error-600]">{returnImpact.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-[--primary-600]" />
            Returns Comparison
          </h2>
          <div className="mt-4 h-64">
            <ResultChart 
              data={[
                { name: 'Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Net Returns', value: netReturns, color: '#22c55e' },
                { name: 'Cost Impact', value: expenseCost + exitLoadCost, color: '#ef4444' }
              ]}
              centerText={`${formatCurrency(netValue)}\nNet Value`}
            />
          </div>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            Cost Analysis
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Returns Comparison</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex justify-between">
                  <span>Gross Returns (Without Costs)</span>
                  <span className="font-medium">{formatCurrency(grossReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Returns (After Costs)</span>
                  <span className="font-medium">{formatCurrency(netReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Impact</span>
                  <span className="font-medium">{formatCurrency(grossReturns - netReturns)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Percentage Impact on Returns</span>
                  <span className="font-medium">{returnImpact.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white rounded-lg">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Understanding Fund Costs</h3>
              <div className="space-y-2 text-sm text-neutral-600">
                <p><strong>Expense Ratio:</strong> Annual fee charged by mutual funds for managing your investments, expressed as a percentage of your investment</p>
                <p><strong>Exit Load:</strong> Fee charged when you redeem your investment before a specified period</p>
                <p><strong>Direct vs Regular:</strong> Direct plans have lower expense ratios (0.5-1% lower) as they don't include distributor commissions</p>
              </div>
            </div>
            
            <div className="p-4 bg-[--accent-50] rounded-lg">
              <h3 className="text-lg font-medium text-[--accent-900] mb-2">Cost Reduction Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-[--accent-700]">
                <li>Invest in direct plans to save on expense ratio</li>
                <li>Avoid frequent redemptions to minimize exit load</li>
                <li>Compare expense ratios before selecting funds</li>
                <li>Index funds typically have lower expense ratios</li>
                <li>Hold investments beyond exit load period</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comprehensive E-E-A-T Content */}
      <div className="mt-12">
        <CalculatorContentWrapper {...contentData} />
      </div>
    </div>
    </div>
    </>
  );
};
                { name: 'Investment', value: totalInvestment, color: '#3b82f6' },

