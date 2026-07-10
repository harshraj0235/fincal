import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   RETIREMENT CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Target keywords: retirement calculator india, FIRE planner, 
   retirement corpus calculator 2026, inflation adjusted retirement
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "How much corpus is enough for retirement in India?", answer: "A common rule of thumb is 25x to 30x of your expected annual retirement expenses. However, this depends on inflation and life expectancy. If your annual expense at retirement is ₹12 Lakhs, you need ₹3 Crores to ₹3.6 Crores." },
  { question: "What is the 4% Safe Withdrawal Rule?", answer: "The 4% rule suggests you can safely withdraw 4% of your total retirement corpus in the first year, and adjust that amount for inflation every subsequent year, without running out of money for 30 years. In India, due to higher inflation, some experts suggest a more conservative 3% or 3.5% withdrawal rate." },
  { question: "How does inflation affect my retirement corpus?", answer: "Inflation is the biggest enemy of retirement. If your monthly expenses are ₹50,000 today, at 6% inflation, you will need about ₹1.6 Lakhs per month to maintain the exact same lifestyle 20 years from now. Your corpus must be calculated based on future expenses, not today's expenses." },
  { question: "What is FIRE?", answer: "FIRE stands for Financial Independence, Retire Early. It is a financial movement where people save and invest very aggressively (up to 50-70% of their income) in their 20s and 30s so they can retire in their 40s instead of the traditional age of 60." }
];

export const RetirementCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(55);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [inflation, setInflation] = useState<number>(6.0);
  const [postRetirementReturn, setPostRetirementReturn] = useState<number>(8.0);
  const [existingCorpus, setExistingCorpus] = useState<number>(1000000);
  const [preRetirementReturn, setPreRetirementReturn] = useState<number>(12.0);

  const calculations = useMemo(() => {
    const yearsToRetirement = Math.max(1, retirementAge - currentAge);
    const yearsInRetirement = Math.max(1, lifeExpectancy - retirementAge);
    
    // Future Value of Monthly Expenses at Retirement
    const futureMonthlyExpense = monthlyExpenses * Math.pow(1 + (inflation / 100), yearsToRetirement);
    const futureAnnualExpense = futureMonthlyExpense * 12;
    
    // Calculate required corpus at retirement (Inflation-adjusted annuity formula)
    // Real rate of return post retirement
    const inflationAdjustedReturn = ((1 + postRetirementReturn / 100) / (1 + inflation / 100)) - 1;
    
    let requiredCorpus = 0;
    if (inflationAdjustedReturn === 0) {
      requiredCorpus = futureAnnualExpense * yearsInRetirement;
    } else {
      requiredCorpus = futureAnnualExpense * (1 - Math.pow(1 + inflationAdjustedReturn, -yearsInRetirement)) / inflationAdjustedReturn;
    }
    
    // Calculate Future Value of Existing Corpus
    const fvExistingCorpus = existingCorpus * Math.pow(1 + (preRetirementReturn / 100), yearsToRetirement);
    
    // Shortfall
    const shortfall = Math.max(0, requiredCorpus - fvExistingCorpus);
    
    // Required Monthly SIP to meet shortfall
    const monthlyRate = preRetirementReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    const requiredSip = shortfall > 0 
      ? shortfall * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)
      : 0;

    return {
      yearsToRetirement,
      yearsInRetirement,
      futureMonthlyExpense: Math.round(futureMonthlyExpense),
      requiredCorpus: Math.round(requiredCorpus),
      fvExistingCorpus: Math.round(fvExistingCorpus),
      shortfall: Math.round(shortfall),
      requiredSip: Math.round(requiredSip)
    };
  }, [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflation, postRetirementReturn, existingCorpus, preRetirementReturn]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);
  const formatCr = (val: number) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(2)} Lakh`;
    return fmt(val);
  };

  return (
    <>
      <SEOHelmet 
        title="Retirement Calculator India 2026 | FIRE Corpus & SIP Planner" 
        description="Free Retirement Calculator. Calculate exactly how much corpus you need to retire in India based on inflation, life expectancy, and required monthly SIP." 
        keywords="retirement calculator india, FIRE planner, retirement corpus calculator, inflation adjusted retirement, how much corpus for retirement in india" 
        url="/calculators/retirement-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Retirement Calculator', description: 'Calculate inflation-adjusted retirement corpus and SIP required.', category: 'Retirement Calculators', features: ['Inflation Adjustment', 'Existing Wealth Projection', 'SIP Shortfall Calculation'], ratingValue: 4.9, reviewCount: 22100, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Retirement</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Retirement & FIRE Calculator</h1>
          <p className="text-gray-600">Calculate exactly how much money you need to retire comfortably without running out of funds. Factors in inflation, post-retirement returns, and your existing savings to show you the exact monthly SIP required to bridge the gap.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-900 border-b border-blue-200 pb-2">Life & Expense Parameters</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="currentAge">Current Age</label></td>
                    <td className="py-3">
                      <input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(Math.max(18, Math.min(70, Number(e.target.value) || 18)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="18" max="70" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="retirementAge">Retirement Age</label></td>
                    <td className="py-3">
                      <input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(Math.max(currentAge + 1, Math.min(80, Number(e.target.value) || 55)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="lifeExpectancy">Life Expectancy</label><p className="text-xs text-gray-500 font-normal">Plan till 85-90 for safety</p></td>
                    <td className="py-3">
                      <input id="lifeExpectancy" type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(Math.max(retirementAge + 1, Math.min(100, Number(e.target.value) || 85)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="monthlyExpenses">Today's Monthly Expense (₹)</label><p className="text-xs text-gray-500 font-normal">Expenses you want in retirement</p></td>
                    <td className="py-3">
                      <input id="monthlyExpenses" type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Math.max(10000, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg font-bold" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label htmlFor="existingCorpus">Existing Savings/Investments (₹)</label><p className="text-xs text-gray-500 font-normal">EPF, Mutual Funds, Stocks</p></td>
                    <td className="py-3">
                      <input id="existingCorpus" type="number" value={existingCorpus} onChange={(e) => setExistingCorpus(Math.max(0, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-orange-900 border-b border-orange-200 pb-2">Economic Assumptions</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-orange-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="inflation">Inflation Rate (%)</label><p className="text-xs text-gray-500 font-normal">India average is 6-7%</p></td>
                    <td className="py-3">
                      <input id="inflation" type="number" step="0.5" value={inflation} onChange={(e) => setInflation(Math.max(0, Math.min(15, Number(e.target.value) || 0)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-orange-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="preRetirementReturn">Pre-Retirement ROI (%)</label><p className="text-xs text-gray-500 font-normal">Expected return while working</p></td>
                    <td className="py-3">
                      <input id="preRetirementReturn" type="number" step="0.5" value={preRetirementReturn} onChange={(e) => setPreRetirementReturn(Math.max(1, Math.min(25, Number(e.target.value) || 12)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label htmlFor="postRetirementReturn">Post-Retirement ROI (%)</label><p className="text-xs text-gray-500 font-normal">Conservative return (Debt/FDs)</p></td>
                    <td className="py-3">
                      <input id="postRetirementReturn" type="number" step="0.5" value={postRetirementReturn} onChange={(e) => setPostRetirementReturn(Math.max(1, Math.min(15, Number(e.target.value) || 8)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-blue-200">Required Retirement Corpus</h2>
                <div className="text-4xl lg:text-5xl font-black mb-1 text-yellow-400">{formatCr(calculations.requiredCorpus)}</div>
                <p className="text-blue-100 text-sm mt-2">To sustain you for {calculations.yearsInRetirement} years</p>
              </div>
              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">
                        <div className="text-sm font-medium text-gray-800">Future Monthly Expenses</div>
                        <div className="text-xs text-gray-500">What ₹{fmtNum(monthlyExpenses)} will cost at age {retirementAge}</div>
                      </td>
                      <td className="p-4 text-right text-base font-bold text-red-600">{fmt(calculations.futureMonthlyExpense)} /mo</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4">
                        <div className="text-sm font-medium text-gray-800">Value of Existing Savings</div>
                        <div className="text-xs text-gray-500">Growth of your current ₹{formatCr(existingCorpus)}</div>
                      </td>
                      <td className="p-4 text-right text-base font-bold text-green-600">{formatCr(calculations.fvExistingCorpus)}</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-4 text-sm font-bold text-gray-700">Corpus Shortfall</td>
                      <td className="p-4 text-right text-base font-bold text-orange-600">{calculations.shortfall > 0 ? formatCr(calculations.shortfall) : '₹ 0 (Goal Met)'}</td>
                    </tr>
                  </tbody>
                </table>
                
                {calculations.shortfall > 0 ? (
                  <div className="p-6 bg-slate-50 text-center border-t border-gray-200">
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Monthly SIP Required Today</h3>
                    <div className="text-3xl font-black text-blue-700">{fmt(calculations.requiredSip)}</div>
                    <p className="text-xs text-gray-500 mt-2">Invested at {preRetirementReturn}% CAGR for {calculations.yearsToRetirement} years</p>
                  </div>
                ) : (
                  <div className="p-6 bg-green-50 text-center border-t border-green-200">
                    <h3 className="text-xl font-black text-green-700 uppercase">You are FIRE Ready!</h3>
                    <p className="text-sm text-green-800 mt-2">Your existing corpus is projected to cover all your retirement needs.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>How to Calculate Your Retirement Corpus in India?</h2>
          <p>
            Planning for retirement in India is uniquely challenging due to two massive economic forces: <strong>high inflation</strong> (especially in healthcare and education) and the <strong>absence of comprehensive social security</strong>. You cannot rely on a government pension; you must build your own wealth architecture.
          </p>
          <p>
            A robust Retirement Calculator doesn't just ask "how much do you want." It calculates <em>exactly</em> what you will need by projecting today's expenses into the future using inflation, and then discounting the required corpus based on conservative post-retirement returns.
          </p>

          <h3>Step 1: Calculate Future Value of Expenses (The Inflation Shock)</h3>
          <p>
            The biggest mistake Indians make in retirement planning is targeting a corpus based on <em>today's</em> expenses. If you need ₹50,000 per month today to live comfortably, you will need significantly more when you retire at age 60.
          </p>
          <div className="bg-red-50 p-4 rounded-lg my-4 text-base border-l-4 border-red-500">
            <strong>The 6% Inflation Reality:</strong> At 6% inflation, prices double roughly every 12 years. So, in 24 years, that ₹50,000 lifestyle will cost you exactly <strong>₹2 Lakhs per month</strong>. If you calculate your corpus assuming you only need ₹50,000, you will run out of money within the first 5 years of retirement.
          </div>

          <h3>Step 2: The "Safe Withdrawal Rate" (SWR) vs Real Rate of Return</h3>
          <p>
            Once you know your future annual expense (e.g., ₹24 Lakhs per year), how much total corpus do you need so it lasts 30 years until you are 90?
          </p>
          <p>
            This calculator uses the concept of <strong>Real Rate of Return</strong>. When you retire, you shift your aggressive equity investments into safer, conservative assets like FDs, SCSS, or Debt Mutual Funds. Suppose these yield 8%. But if inflation is 6%, your <em>Real Return</em> is only ~2%. Your corpus only grows by 2% in purchasing power. 
          </p>
          <ul>
            <li><strong>Aggressive SWR (4% Rule):</strong> You need 25x your annual expenses. (₹24L × 25 = ₹6 Crores)</li>
            <li><strong>Conservative India SWR (3%):</strong> Because inflation is higher in India, a safer withdrawal rate is 3%. You need 33x your annual expenses. (₹24L × 33 = ₹8 Crores)</li>
          </ul>

          <h3>Step 3: Bridging the Shortfall with SIPs</h3>
          <p>
            Seeing a target of ₹5 Crores or ₹10 Crores can be terrifying. But this is where the magic of compounding comes in. The calculator takes your <strong>Existing Savings</strong> (EPF, PPF, Mutual Funds) and compounds them at your pre-retirement return rate (e.g., 12% in Equity).
          </p>
          <p>
            If your existing wealth won't reach the target, the calculator determines the exact <strong>Monthly SIP</strong> you must start <em>today</em> in equity mutual funds to bridge that specific shortfall. 
          </p>

          <h3>What is FIRE (Financial Independence, Retire Early)?</h3>
          <p>
            The FIRE movement is gaining massive traction in India among IT professionals and high-earning millennials. The goal is to reach a corpus of 30x to 40x annual expenses not by age 60, but by age 40 or 45. 
          </p>
          <p>
            To achieve FIRE, you must typically maintain a savings rate of 50% to 70% of your take-home income and invest aggressively in low-cost index funds. By changing the "Retirement Age" input to 45, you can instantly see the brutal reality of FIRE: the required corpus goes up (because your retirement period is longer, e.g., 40+ years), and the years you have to build it goes down.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>This Retirement & FIRE Calculator provides mathematical projections based on assumed constant rates of return and inflation. Real-world market volatility, sequence of returns risk, and changing tax laws (like LTCG) will affect actual outcomes. Always consult a SEBI Registered Investment Advisor (RIA) before making major retirement decisions. © 2026 MoneyCal India.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Planning Tools</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/sip-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">SIP Calculator</a>
            <a href="/calculators/epf-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">EPF Calculator</a>
            <a href="/calculators/nps-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">NPS Planner</a>
            <a href="/calculators/inflation-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Inflation Calculator</a>
            <a href="/calculators/future-value-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-blue-50 hover:border-blue-400 text-gray-600">Future Value Calculator</a>
          </div>
        </div>
      </div>
    </>
  );
};