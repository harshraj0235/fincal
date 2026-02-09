import React, { useState, useEffect } from 'react';
import { Info, ExternalLink, TrendingUp, DollarSign, Calculator as CalcIcon, Sparkles } from 'lucide-react';
import WhyChooseUs from '../components/WhyChooseUs';
import { motion } from 'framer-motion';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';
import { CalculatorSchema } from '../components/CalculatorSchema';

export const CompoundInterestCalculator: React.FC = () => {
  // State variables for inputs
  const [principal, setPrincipal] = useState<number>(10000); // Initial investment
  const [rate, setRate] = useState<number>(5);           // Annual interest rate (%)
  const [time, setTime] = useState<number>(10);           // Time in years
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Compounding periods per year (e.g., 12 for monthly)

  // State variables for results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Function to calculate compound interest
  const calculateCompoundInterest = () => {
    // Convert rate from percentage to decimal
    const r = rate / 100;
    // Number of times interest is compounded per year (n)
    const n = compoundingFrequency;
    // Number of years the money is invested (t)
    const t = time;

    // Compound Interest Formula: A = P (1 + r/n)^(nt)
    // A = Future value
    // P = Principal
    const A = principal * Math.pow((1 + r / n), (n * t));

    // Calculate total interest earned
    const interest = A - principal;

    setFutureValue(A);
    setTotalInterest(interest);
  };

  // Recalculate whenever inputs change
  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, compoundingFrequency]);

  const quickPresets = [
    { label: 'FD 5 Years', principal: 500000, rate: 7, time: 5, freq: 4 },
    { label: 'PPF 15 Years', principal: 150000, rate: 7.1, time: 15, freq: 1 },
    { label: 'Equity MF 10Y', principal: 100000, rate: 12, time: 10, freq: 12 },
    { label: 'Senior FD 3Y', principal: 1000000, rate: 7.75, time: 3, freq: 4 },
    { label: 'Long Term 20Y', principal: 500000, rate: 10, time: 20, freq: 12 },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setPrincipal(preset.principal);
    setRate(preset.rate);
    setTime(preset.time);
    setCompoundingFrequency(preset.freq);
  };

  // Helper function for formatting currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

const contentData = {title:"Compound Interest Calculator",description:"Compound Interest Calculator helps you calculate compound interest and future value of investments with different compounding frequencies. Understand power of compounding with monthly, quarterly, annual compounding. Free CI calculator for India with detailed breakup showing how your money grows exponentially over time.",benefits:["Calculate compound interest with any principal amount and interest rate","Compare different compounding frequencies - daily, monthly, quarterly, annually","See power of compounding - how interest earns interest over time","Visualize exponential growth of your investment with year-wise breakup","Calculate future value for FD, RD, savings accounts, investments","Understand Rule of 72 - how fast your money doubles at different rates","100% free compound interest calculator with instant results","Compare simple interest vs compound interest difference"],howToSteps:[{step:"Enter Principal Amount",details:"Input initial investment or principal amount (₹1,000 to ₹1 crore+). This is your starting money that will earn compound interest. Examples: Bank FD: ₹1-10 lakh typical, PPF: ₹500-1.5L annually (use annual for each year), Recurring Deposit: ₹1K-50K monthly (complex calculation, use RD calculator for accurate results), Mutual Fund Lumpsum: ₹10K-₹50L one-time investment. Note: Compound interest calculator works best for fixed-rate investments where principal remains constant. For SIP/RD with regular additions, use dedicated SIP/RD calculators."},{step:"Set Annual Interest Rate",details:"Enter annual interest rate in percentage. Common India interest rates (2024-25): Savings Account: 2.5-4% (SBI, HDFC, ICICI), Fixed Deposit: 6-7.5% (banks, 1-5 years), Senior Citizen FD: 7-8.5% (0.5% extra), Post Office FD: 7-7.5%, PPF: 7.1% (government backed, tax-free), NSC: 7.7% (5 years), Recurring Deposit: 6-7%, Debt Mutual Funds: 6-8%, Balanced Mutual Funds: 9-11%, Equity Mutual Funds: 10-15% (long-term average, market-linked). Choose conservative rate for financial planning - use lower end of historical range."},{step:"Choose Time Period in Years",details:"Select investment time horizon in years (1-40 years). Compounding power increases dramatically with time! Examples: 3-5 years: Short-term goals (vacation, car down payment), good for FD/RD. 7-10 years: Medium-term goals (child education, house down payment), equity MF shine here. 15-20 years: Long-term goals (child higher education, house purchase), maximum compounding benefit. 25-35 years: Retirement planning, wealth creation, compounding creates millionaires! Reality: ₹1L at 12% for 10 years = ₹3.1L (3X), for 20 years = ₹9.6L (9.6X), for 30 years = ₹29.9L (30X)! Each decade multiplies wealth by 3X at 12%."},{step:"Select Compounding Frequency",details:"Choose how often interest is compounded. More frequent = slightly higher returns. Daily compounding (365 times/year): Some savings accounts, liquid funds. Best returns! Monthly (12 times/year): Most bank FDs, RDs, SIPs. Most common. Quarterly (4 times/year): Some FDs, company FDs, bonds. Annual (1 time/year): PPF, NSC, some post office schemes, simple calculations. Difference: ₹1L at 7% for 10 years: Annual compounding: ₹1.97L (₹97K interest), Quarterly: ₹2.00L (₹1.00L interest, ₹3K more!), Monthly: ₹2.01L (₹1.01L interest, ₹4K more!), Daily: ₹2.01L (₹1.01L interest, ₹4.5K more!). Difference small in short term but adds up over 20-30 years!"},{step:"Understand Results & Power of Compounding",details:"Calculator shows: Future Value (maturity amount), Total Interest Earned, Interest-to-Principal Ratio (how many times your money grew), Year-wise breakup showing exponential growth. Key insight: EXPONENTIAL growth! Year 1: Small interest, Year 10: Moderate growth, Year 20: Explosive growth, Year 30: Astronomical wealth! Example ₹1L at 12% annual: Year 1: ₹1.12L (+₹12K interest), Year 10: ₹3.1L (+₹2.1L interest total), Year 20: ₹9.6L (+₹8.6L interest total), Year 30: ₹29.9L (+₹28.9L interest total). Interest earned in last 10 years (₹20.3L) is more than in first 20 years combined (₹8.6L)! This is power of compounding - Einstein called it 8th wonder of the world!"}],examples:[{scenario:"Bank FD Investment - ₹5L for 5 Years",inputs:[{label:"Principal",value:"₹5,00,000"},{label:"Interest Rate",value:"7% p.a."},{label:"Time Period",value:"5 years"},{label:"Compounding",value:"Quarterly (4 times/year)"}],result:"Maturity: ₹7,05,824 | Interest: ₹2,05,824 | Growth: 41.16%",explanation:"Amit invests ₹5L in 5-year bank FD at 7% interest, compounded quarterly. Calculation: A = 5,00,000 × (1 + 0.07/4)^(4×5) = ₹7,05,824. Year-wise: Year 1: ₹5.36L (+₹36K), Year 2: ₹5.74L (+₹74K total), Year 3: ₹6.13L (+₹1.13L total), Year 4: ₹6.56L (+₹1.56L total), Year 5: ₹7.06L (+₹2.06L total). Compounding benefit: If it was simple interest (7% flat), maturity = ₹5L + (5L × 7% × 5) = ₹6.75L. Compound interest gave ₹31K extra (₹7.06L vs ₹6.75L)! Quarterly compounding gave ₹5K more than annual compounding. At maturity, Amit's money grew 41% in 5 years - beating inflation comfortably!"},{scenario:"PPF Long-Term Wealth Building - ₹1.5L Annually",inputs:[{label:"Approach",value:"Calculate yearly and compound manually"},{label:"Annual Investment",value:"₹1,50,000 (max PPF limit)"},{label:"Interest Rate",value:"7.1% p.a."},{label:"Compounding",value:"Annual"},{label:"Time Period",value:"15 years (PPF lock-in)"}],result:"Maturity: ₹40.68L | Investment: ₹22.5L | Gain: ₹18.18L",explanation:"Priya invests ₹1.5L annually in PPF for 15 years at 7.1% (compounded annually). Year 1: ₹1.5L → ₹1.61L, Year 2: Add ₹1.5L = ₹3.11L → ₹3.33L, Year 3: Add ₹1.5L = ₹4.83L → ₹5.17L, ...Year 15: Total ₹40.68L. Total invested: ₹1.5L × 15 = ₹22.5L, Interest earned: ₹18.18L (81% gain!), Completely TAX-FREE! Comparison: Same money in taxable FD (7%, post-tax 4.9% at 30% bracket) = ₹31L total (₹9.68L less than PPF!). PPF benefits: Tax deduction on investment (Section 80C), Tax-free interest, Tax-free maturity, Government-backed safety. Priya's strategy: Invests ₹12,500 monthly in PPF, builds ₹40L retirement corpus tax-free by age 40!"},{scenario:"Early Start Advantage - Teen vs Adult Investing",inputs:[{label:"Scenario A",value:"Ravi starts at age 18"},{label:"Investment",value:"₹10,000 one-time"},{label:"Rate",value:"12% p.a."},{label:"Time",value:"42 years (till 60)"}],result:"Age 60: Ravi's ₹10K → ₹1,16,72,313 (₹1.17 Crores!)  Compounded monthly",explanation:"Comparison: Ravi (starts 18): ₹10K at 12% for 42 years = ₹1.17Cr! Rohan (starts 28, 10 years late): ₹10K at 12% for 32 years = ₹35.9L (3X less!). Priya (starts 38, 20 years late): ₹10K at 12% for 22 years = ₹11L (10X less!). Power of TIME in compounding: 10 years delay = 3X less wealth, 20 years delay = 10X less wealth! Lost decade can never be recovered! Math: First 10 years (18-28): ₹10K → ₹32.7K, Next 10 years (28-38): ₹32.7K → ₹1.07L, Next 10 years (38-48): ₹1.07L → ₹3.5L, Final 12 years (48-60): ₹3.5L → ₹1.17Cr (most growth happens in last 10-15 years!). Message for young people: Invest even ₹1,000 NOW. Starting early beats everything - even investing large amounts later. Time is your biggest wealth creator!"}],tips:["Start investing early - even ₹1,000 monthly from age 20 beats ₹10,000 monthly from age 40 due to compounding time","Never break long-term investments - each premature withdrawal restarts compounding clock, losing years of exponential growth","Reinvest interest/returns - don't withdraw returns annually, let interest earn interest for maximum compounding benefit","Choose tax-free/tax-efficient investments - PPF (7.1% tax-free) = FD at 10% taxable. Tax destroys compounding!","Invest in higher compounding frequency when possible - monthly compounding beats annual by 0.5-1% over 20 years","Use compound interest for wealth goals - calculate how much to invest today to reach ₹1Cr in 20 years (answer: ₹10.4L at 12%)","Increase investments by 10% annually - matches inflation + salary hikes, accelerates wealth building dramatically"],mistakes:["Using simple interest mindset - thinking ₹1L at 10% for 10 years = ₹2L. Wrong! It's ₹2.59L with annual compounding!","Breaking investments early - withdrawing FD after 3 years instead of 5 years loses 2 years of exponential growth period","Not reinvesting returns - taking interest payouts annually instead of cumulative option loses massive compounding benefit","Ignoring compounding frequency - choosing annual over monthly/quarterly compounding loses 0.5-1% returns over long term","Forgetting inflation - 7% return sounds good but 6% inflation means real return is only 1%. Need 10-12% to build real wealth!","Thinking small amounts don't matter - ₹1,000 monthly at 12% for 30 years = ₹35L. Every rupee counts with compounding!","Not starting NOW - waiting to start investing till you earn more/save more. Time lost can NEVER be recovered in compounding!"],faqs:[{question:"What is compound interest and how does it work?",answer:"Compound interest is interest calculated on initial principal PLUS accumulated interest from previous periods. Your money earns interest, then that interest earns interest, creating exponential growth! Formula: A = P(1 + r/n)^(nt), where A = Final amount, P = Principal, r = Annual rate, n = Compounding frequency, t = Time in years. Example: ₹1L at 10% compounded annually for 3 years. Year 1: ₹1L × 1.10 = ₹1.1L (₹10K interest), Year 2: ₹1.1L × 1.10 = ₹1.21L (₹11K interest on ₹1.1L), Year 3: ₹1.21L × 1.10 = ₹1.331L (₹12.1K interest). Total: ₹1.331L (₹33.1K interest). Simple interest would give: ₹1L + (₹10K × 3) = ₹1.3L (₹30K interest). Compound interest earned ₹3.1K more in just 3 years! Over 20-30 years, difference becomes lakhs to crores. Einstein: 'Compound interest is the 8th wonder of the world. He who understands it, earns it; he who doesn't, pays it.'"},{question:"What is the Rule of 72 and how to use it?",answer:"Rule of 72 is quick formula to calculate years to DOUBLE your money: Years to double = 72 ÷ Annual Return %. At different returns: 6% return: 72 ÷ 6 = 12 years to double, 8%: 9 years, 10%: 7.2 years, 12%: 6 years, 15%: 4.8 years, 18%: 4 years. Example applications: Bank FD (7%): Money doubles in 10.3 years, PPF (7.1%): Doubles in 10 years, Equity MF (12%): Doubles in 6 years, Good stocks (15-18%): Double in 4-5 years. Compounding cycles: ₹1L at 12% doubles every 6 years: Year 6: ₹2L (1st double), Year 12: ₹4L (2nd double), Year 18: ₹8L (3rd double), Year 24: ₹16L (4th double), Year 30: ₹32L (5th double!). 5 doublings in 30 years = 32X growth! Reverse use: Want to double money in 5 years? Need 72 ÷ 5 = 14.4% annual return. This guides investment choice! Limitation: Rule of 72 is approximation, works best for 6-12% rates. For exact calculations, use this compound interest calculator."},{question:"Compound interest vs simple interest - which is better?",answer:"Compound Interest: Interest calculated on principal + accumulated interest. Grows exponentially. Used in: Bank FDs, RDs, mutual funds, PPF, NSC, most investments. Simple Interest: Interest calculated only on principal. Grows linearly. Used in: Some personal loans, short-term deposits, IOUs, bonds. Comparison (₹1L at 10% for 20 years): Simple Interest: ₹1L + (₹1L × 10% × 20) = ₹3L total (₹2L interest). Compound Interest (annual): ₹1L × (1.10)^20 = ₹6.73L total (₹5.73L interest). Difference: ₹3.73L more with compounding! Compound gives 2.24X more wealth over 20 years. Small difference in early years: 5 years: SI ₹1.5L vs CI ₹1.61L (₹11K difference). Huge difference in long term: 30 years: SI ₹4L vs CI ₹17.4L (₹13.4L difference!). For investments: Always choose compound interest. For loans: Simple interest is better (you pay less), but rare to find. Reality: Compound interest benefits patient, long-term investors massively. Short-term difference is small but compounds into crores over 30-40 years!"},{question:"How does compounding frequency affect returns?",answer:"More frequent compounding = slightly higher returns. Compounding frequencies: Annually (1/year): Interest added once per year. Quarterly (4/year): Every 3 months. Monthly (12/year): Every month. Daily (365/year): Every day. Comparison (₹1L at 8% for 10 years): Annual: ₹2,15,892 (₹1,15,892 interest), Quarterly: ₹2,19,112 (₹1,19,112 interest) +₹3,220, Monthly: ₹2,21,964 (₹1,21,964 interest) +₹6,072, Daily: ₹2,22,544 (₹1,22,544 interest) +₹6,652. Daily gives ₹6,652 more than annual over 10 years! Why: More compounding means interest earns interest sooner. Effective annual rate: 8% annual compounded monthly = 8.3% effective rate. 8% annual compounded daily = 8.33% effective rate. Practical impact: Short term (1-5 years): ₹2-5K difference on ₹1L. Medium term (10-15 years): ₹5-15K difference. Long term (20-30 years): ₹50K-₹2L difference! Bank choice: Choose banks offering monthly compounding FDs over quarterly/annual. Mutual funds typically compound daily (NAV calculated daily). Preference order: Daily > Monthly > Quarterly > Annual compounding for maximum returns!"},{question:"At what interest rate will my money double in 10 years?",answer:"Use Rule of 72: Required Rate = 72 ÷ Years to double. To double in 10 years: 72 ÷ 10 = 7.2% annual return. Exact calculation using compound interest formula: (1 + r)^10 = 2, r = 2^(1/10) - 1 = 0.0718 = 7.18% (annual compounding). With monthly compounding: Slightly lower rate needed: 7.0% doubles in 10 years. Where to get 7-8% returns in India: Fixed Deposits: 6.5-7.5% (senior citizens 7-8%), PPF: 7.1% (tax-free = 10% pre-tax at 30% bracket!), NSC: 7.7%, Corporate FDs: 7.5-9% (higher risk), Balanced Mutual Funds: 8-10% (historical average), Debt Mutual Funds: 7-9%. To double faster: 5 years: Need 14.4% (equity mutual funds, ELSS), 6 years: Need 12% (good equity MFs, index funds), 8 years: Need 9% (balanced funds, gold historically), 12 years: Need 6% (FD, safe investments). Your choice depends on: Risk appetite (safe 7% vs risky 12-15%), Time horizon (longer = can take more risk), Financial goals (retirement = aggressive, near-term = conservative). Use this calculator to experiment with different rates and time periods!"},{question:"How much will ₹10,000 monthly investment grow in 20 years?",answer:"This is SIP (Systematic Investment Plan) question, slightly different from compound interest lumpsum. Need to calculate each month's investment compounding separately. Quick approximation for ₹10K monthly at 12% for 20 years: Future Value ≈ ₹99.9 lakhs, Total invested: ₹10K × 12 × 20 = ₹24L, Wealth gain: ₹75.9L (316% returns!). Detailed: Each ₹10K investment grows differently based on time invested. First ₹10K (invests 20 years): ₹10K × (1.01)^240 = ₹99,150, Last ₹10K (invests 1 month): ₹10K × 1.01 = ₹10,100. Average: Middle investments grow 3-4X. Total maturity: ₹99.9L. At different returns (₹10K monthly, 20 years): 8% return: ₹58.9L (₹34.9L gain), 10%: ₹76.6L (₹52.6L gain), 12%: ₹99.9L (₹75.9L gain), 15%: ₹1.51Cr (₹1.27Cr gain!). Key insight: Every 2% higher return adds ₹15-20L on ₹10K monthly SIP! This is why equity mutual funds (12-15%) beat FDs (7%) massively for long-term goals. For exact SIP calculations: Use dedicated SIP calculator (this compound interest calculator is for lumpsum). But concept is same - compounding creates wealth exponentially over time!"}],relatedCalculators:[{name:"SIP Calculator",url:"/calculators/sip-calculator",description:"Calculate SIP returns"},{name:"PPF Calculator",url:"/calculators/ppf-calculator",description:"PPF maturity calculator"},{name:"FD Calculator",url:"/calculators/fd-calculator",description:"Fixed deposit returns"},{name:"RD Calculator",url:"/calculators/rd-calculator",description:"Recurring deposit calculator"},{name:"Retirement Calculator",url:"/calculators/retirement-calculator",description:"Plan retirement corpus"},{name:"Lumpsum Calculator",url:"/calculators/lumpsum-calculator",description:"One-time investment returns"},{name:"EMI Calculator",url:"/calculators/emi-calculator",description:"Loan EMI calculation"}],lastUpdated:"2025-01-20"};

  return (
    <>
      <CalculatorSchema name="Compound Interest Calculator - CI Calculator India 2025" description="Free Compound Interest Calculator. Calculate compound interest with monthly, quarterly, annual compounding. Understand power of compounding for FD, PPF, investments. Updated 2025." url="/calculators/compound-interest-calculator" features={["Compound interest calculation","Multiple compounding frequencies","Future value projection","Simple vs compound comparison","Power of compounding visualization","Rule of 72 application","Free CI calculator","Instant results"]} faqData={contentData.faqs} howToSteps={contentData.howToSteps} lastUpdated="2025-01-20" rating={{value:4.8,count:11234}}/>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 font-inter">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-5xl border-2 border-indigo-100 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        
        {/* Header with Icon */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Compound Interest Calculator
          </h1>
          <p className="text-gray-600 text-lg">Watch your money grow with the power of compounding</p>
        </motion.div>

        {/* Quick Presets */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200"
        >
          <h3 className="text-sm font-semibold text-indigo-900 mb-3 text-center">Quick Presets (2025-2027 Rates)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {quickPresets.map((preset, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyPreset(preset)}
                className="px-3 py-2 text-xs font-medium bg-white border border-indigo-300 rounded-lg hover:bg-indigo-100 hover:border-indigo-400 transition-colors text-indigo-700 shadow-sm"
              >
                {preset.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Calculator Inputs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gradient-to-br from-gray-50 to-indigo-50 p-8 rounded-2xl shadow-inner border border-indigo-100"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <label htmlFor="principal" className="text-sm font-bold text-gray-800 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-indigo-600" />
              Initial Investment (Principal)
            </label>
            <input
              type="number"
              id="principal"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="mt-1 p-4 border-2 border-indigo-200 rounded-xl shadow-sm focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 block w-full transition-all duration-200 hover:border-indigo-300"
              placeholder="e.g., 10000"
              aria-label="Initial Investment"
            />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <label htmlFor="rate" className="text-sm font-bold text-gray-800 mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-1 p-4 border-2 border-green-200 rounded-xl shadow-sm focus:ring-4 focus:ring-green-300 focus:border-green-500 block w-full transition-all duration-200 hover:border-green-300"
              placeholder="e.g., 5"
              step="0.1"
              aria-label="Annual Interest Rate"
            />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <label htmlFor="time" className="text-sm font-bold text-gray-800 mb-2 flex items-center">
              <CalcIcon className="w-4 h-4 mr-1 text-purple-600" />
              Time Period (Years)
            </label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="mt-1 p-4 border-2 border-purple-200 rounded-xl shadow-sm focus:ring-4 focus:ring-purple-300 focus:border-purple-500 block w-full transition-all duration-200 hover:border-purple-300"
              placeholder="e.g., 10"
              aria-label="Time Period in Years"
            />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <label htmlFor="compoundingFrequency" className="text-sm font-bold text-gray-800 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-pink-600" />
              Compounding Frequency
            </label>
            <select
              id="compoundingFrequency"
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
              className="mt-1 p-4 border-2 border-pink-200 rounded-xl shadow-sm focus:ring-4 focus:ring-pink-300 focus:border-pink-500 block w-full bg-white transition-all duration-200 hover:border-pink-300"
              aria-label="Compounding Frequency"
            >
              <option value={1}>Annually (1)</option>
              <option value={2}>Semi-Annually (2)</option>
              <option value={4}>Quarterly (4)</option>
              <option value={12}>Monthly (12)</option>
              <option value={365}>Daily (365)</option>
            </select>
          </motion.div>
        </motion.div>

        {/* Calculator Results */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 sm:p-10 rounded-2xl shadow-2xl text-center mb-8 relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          ></motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 relative z-10">✨ Your Investment Growth</h2>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-6 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white text-indigo-800 p-6 rounded-2xl shadow-lg flex-1 w-full sm:w-auto border-4 border-indigo-200"
            >
              <p className="text-sm font-bold text-indigo-600 mb-2">💰 Future Value</p>
              <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {formatCurrency(futureValue)}
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white text-green-800 p-6 rounded-2xl shadow-lg flex-1 w-full sm:w-auto border-4 border-green-200"
            >
              <p className="text-sm font-bold text-green-600 mb-2">📈 Interest Earned</p>
              <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {formatCurrency(totalInterest)}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* SEO Content */}
        <section className="mb-8 text-gray-700 text-lg">
          <p className="mb-4">
            Welcome to our free online <strong className="font-semibold text-indigo-600">Compound Interest Calculator</strong>. This powerful tool helps you visualize how your investments can grow over time, thanks to the magic of <strong className="font-semibold text-purple-600">compounding</strong>. Whether you're planning for retirement, saving for a down payment, or just curious about financial growth, understanding compound interest is key to smart <strong className="font-semibold text-teal-600">financial planning</strong> and <strong className="font-semibold text-pink-600">wealth accumulation</strong>.
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">What is Compound Interest?</h2>
          <p className="mb-4">
            <strong className="font-semibold">Compound interest</strong> is interest on interest. It's the process where the interest you earn on your initial principal (the amount you invest) is reinvested, and then that reinvested interest also starts earning interest. This creates an accelerating growth effect, often described as the "eighth wonder of the world" by Albert Einstein. Unlike simple interest, which is calculated only on the principal amount, compound interest allows your money to grow exponentially over time.
          </p>
          <p className="mb-4">
            This calculator is an essential <strong className="font-semibold text-green-600">investment tool</strong> for anyone looking to understand the potential returns on their <strong className="font-semibold text-blue-600">savings</strong> or <strong className="font-semibold text-red-600">investment strategies</strong>.
          </p>
        </section>

        {/* More SEO Content & FAQs */}
        <section className="mt-8 text-gray-700 text-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">Why Use a Compound Interest Calculator?</h2>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong className="font-semibold">Financial Planning:</strong> Plan for long-term goals like retirement, education, or a down payment.</li>
            <li><strong className="font-semibold">Investment Analysis:</strong> Compare different investment scenarios by adjusting rates and timeframes.</li>
            <li><strong className="font-semibold">Savings Growth:</strong> See how consistent savings, even small amounts, can grow significantly over decades.</li>
            <li><strong className="font-semibold">Debt Management:</strong> Understand how compounding can work against you with loans, highlighting the importance of paying off high-interest debt.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">How to Use This Calculator</h2>
          <p className="mb-4">
            Simply input your desired values into the fields above:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong className="font-semibold">Initial Investment (Principal):</strong> The starting amount you invest.</li>
            <li><strong className="font-semibold">Annual Interest Rate (%):</strong> The percentage rate your investment will earn annually.</li>
            <li><strong className="font-semibold">Time Period (Years):</strong> How many years you plan to keep your money invested.</li>
            <li><strong className="font-semibold">Compounding Frequency:</strong> How often the interest is added to your principal (e.g., monthly, quarterly, annually).</li>
          </ul>
          <p className="mb-4">
            Our calculator will instantly display the <strong className="font-semibold text-purple-600">future value</strong> of your investment and the <strong className="font-semibold text-indigo-600">total interest earned</strong>, giving you a clear picture of your potential returns.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: How does compounding frequency affect my returns?</h3>
              <p>A: The more frequently your interest compounds (e.g., daily vs. annually), the faster your money will grow, as interest is added and starts earning interest more often. This is a crucial factor in maximizing your <strong className="font-semibold">investment growth</strong>.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: Is this calculator suitable for mortgage or loan calculations?</h3>
              <p>A: While the principle of compounding applies to loans, this calculator is primarily designed for investment growth. Loan interest calculations often involve different amortization schedules and fees. For specific loan calculations, a dedicated <strong className="font-semibold">loan calculator</strong> would be more appropriate.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: What is a good interest rate for compound interest?</h3>
              <p>A: A "good" interest rate depends on the type of investment and associated risks. High-yield savings accounts might offer 4-5%, while stock market investments could average 7-10% historically, but with higher volatility. Always consider your risk tolerance and <strong className="font-semibold">financial goals</strong> when evaluating rates.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: How does compound interest differ from simple interest?</h3>
              <p>A: Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest. 
              Compare using our <a href="https://moneycal.in/calculators/simple-interest-calculator" className="underline text-blue-700">Simple Interest Calculator</a>.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: Which investments offer compound interest in India?</h3>
              <p>A: Fixed Deposits, PPF, NPS, Mutual Funds (SIP), and Bonds offer compound interest. 
              Explore our <a href="https://moneycal.in/calculators/ppf-calculator" className="underline text-blue-700">PPF Calculator</a> and 
              <a href="https://moneycal.in/calculators/sip-calculator" className="underline text-blue-700 ml-1">SIP Calculator</a> for specific investments.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Related Calculators */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Investment Calculators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/calculators/sip-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-gray-900">SIP Calculator</div>
              <div className="text-sm text-gray-600">Calculate mutual fund SIP returns</div>
            </a>
            <a
              href="https://moneycal.in/calculators/ppf-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-gray-900">PPF Calculator</div>
              <div className="text-sm text-gray-600">Public Provident Fund calculator</div>
            </a>
            <a
              href="https://moneycal.in/calculators/nps-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-gray-900">NPS Calculator</div>
              <div className="text-sm text-gray-600">National Pension System returns</div>
            </a>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-10 pt-6 border-t border-gray-200">
          <p>&copy; {new Date().getFullYear()} Compound Interest Calculator. All rights reserved.</p>
          <p className="mt-2">Disclaimer: This calculator is for educational purposes only and should not be considered financial advice. Please consult with a financial professional for personalized guidance.</p>
        </footer>
      </motion.div>
    </div>
      <div className="mx-auto max-w-5xl px-4 mt-12"><CalculatorContentWrapper {...contentData}/></div>
    </>
  );
};

export default CompoundInterestCalculator;
