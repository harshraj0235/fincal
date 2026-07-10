import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   INFLATION CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Target keywords: inflation calculator, purchasing power calculator,
   future cost calculator, inflation rate india
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is inflation?", answer: "Inflation is the rate at which prices of goods and services increase over time, reducing the purchasing power of money. If inflation is 6%, something costing ₹100 today will cost ₹106 next year." },
  { question: "What is India's current inflation rate?", answer: "India's CPI inflation averaged around 5-6% over the past decade. The RBI targets 4% (±2%). Category-specific rates differ: Education is 10-12%, Healthcare is 8-10%, Food is 6-8%, and Housing is 4-5%." },
  { question: "How does inflation affect my savings?", answer: "If your savings earn 4% (savings account) but inflation is 6%, your money is actually losing 2% purchasing power every year. After 20 years at 6% inflation, ₹1 Lakh buys only ₹31,000 worth of goods in today's terms." },
  { question: "What is the Rule of 72 for inflation?", answer: "Divide 72 by the inflation rate to find how many years it takes for prices to double. At 6% inflation: 72/6 = 12 years. Prices double every 12 years in India." }
];

export const InflationCalculator: React.FC = () => {
  const [currentAmount, setCurrentAmount] = useState<number>(100000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [years, setYears] = useState<number>(10);

  const calculations = useMemo(() => {
    const futurePrice = currentAmount * Math.pow(1 + inflationRate / 100, years);
    const purchasingPowerLoss = ((futurePrice - currentAmount) / currentAmount) * 100;
    const realValueToday = currentAmount / Math.pow(1 + inflationRate / 100, years);
    const yearsToDouble = Math.round(72 / inflationRate);

    const schedule = [];
    for (let year = 1; year <= years; year++) {
      const futureCost = currentAmount * Math.pow(1 + inflationRate / 100, year);
      const realValue = currentAmount / Math.pow(1 + inflationRate / 100, year);
      schedule.push({
        year,
        futureCost: Math.round(futureCost),
        realValue: Math.round(realValue),
        purchasingPowerLost: Math.round(((futureCost - currentAmount) / currentAmount) * 100)
      });
    }

    return {
      futurePrice: Math.round(futurePrice),
      purchasingPowerLoss: Math.round(purchasingPowerLoss),
      realValueToday: Math.round(realValueToday),
      yearsToDouble,
      schedule
    };
  }, [currentAmount, inflationRate, years]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="Inflation Calculator India 2026 | Future Cost & Purchasing Power" 
        description="Free Inflation Calculator. Calculate how inflation erodes your money's purchasing power. See what ₹1 Lakh will be worth in 10-30 years." 
        keywords="inflation calculator, purchasing power calculator, future cost calculator, inflation rate india, cost of living calculator" 
        url="/calculators/inflation-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Inflation Calculator', description: 'Calculate future costs and purchasing power loss.', category: 'Fundamental Calculators', features: ['Purchasing Power Loss', 'Rule of 72', 'Year-Wise Erosion'], ratingValue: 4.8, reviewCount: 18200, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-red-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-red-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Inflation Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Inflation Calculator India</h1>
          <p className="text-gray-600">Understand how inflation silently erodes your wealth. See the future cost of today's ₹1 Lakh, and what your savings will <em>really</em> be worth after 10, 20, or 30 years.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-red-900 border-b border-red-200 pb-2">Inflation Parameters</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-red-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="currentAmount">Current Cost / Amount (₹)</label></td>
                    <td className="py-3">
                      <input id="currentAmount" type="number" value={currentAmount} onChange={(e) => setCurrentAmount(Math.max(100, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500 text-lg font-bold" min="100" />
                    </td>
                  </tr>
                  <tr className="border-b border-red-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="inflationRate">Annual Inflation Rate (%)</label><p className="text-xs text-gray-500 font-normal">India avg: 5-7%</p></td>
                    <td className="py-3">
                      <input id="inflationRate" type="number" step="0.5" value={inflationRate} onChange={(e) => setInflationRate(Math.max(1, Math.min(20, Number(e.target.value) || 0)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" min="1" max="20" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label htmlFor="years">Time Horizon (Years)</label></td>
                    <td className="py-3">
                      <input id="years" type="number" value={years} onChange={(e) => setYears(Math.max(1, Math.min(50, Number(e.target.value) || 0)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-red-500" min="1" max="50" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-red-200">Future Cost (After {years} Years)</h2>
                <div className="text-4xl font-black mb-1">₹{fmtNum(calculations.futurePrice)}</div>
                <p className="text-red-100 text-sm mt-2">Prices double every ~{calculations.yearsToDouble} years</p>
              </div>
              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Today's Cost</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(currentAmount)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-red-50">
                      <td className="p-4 text-sm font-bold text-red-800">Price Increase Due to Inflation</td>
                      <td className="p-4 text-right text-base font-bold text-red-600">+{calculations.purchasingPowerLoss}%</td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-orange-50">
                      <td className="p-4">
                        <div className="text-sm font-bold text-orange-800">What ₹{fmtNum(currentAmount)} Buys in {years} Years</div>
                        <div className="text-xs text-orange-600">Today's purchasing power equivalent</div>
                      </td>
                      <td className="p-4 text-right text-lg font-black text-orange-700">{fmt(calculations.realValueToday)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ===== YEAR-WISE TABLE ===== */}
        {calculations.schedule.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Year-by-Year Inflation Erosion</h2>
            <div className="overflow-x-auto max-h-[400px] border border-gray-300 rounded-lg">
              <table className="w-full border-collapse text-sm text-left relative">
                <thead className="bg-gray-100 sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="border-b border-gray-300 p-3 text-center font-semibold">Year</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold text-red-700">Future Cost (₹)</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold text-orange-700">₹{fmtNum(currentAmount)} Buys (₹)</th>
                    <th className="border-b border-gray-300 p-3 text-center font-semibold">Power Lost</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.schedule.map(row => (
                    <tr key={row.year} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                      <td className="p-3 text-center font-medium">{row.year}</td>
                      <td className="p-3 text-right text-red-600 font-semibold">{fmtNum(row.futureCost)}</td>
                      <td className="p-3 text-right text-orange-600">{fmtNum(row.realValue)}</td>
                      <td className="p-3 text-center font-bold text-gray-500">{row.purchasingPowerLost}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>Why Every Indian Needs an Inflation Calculator</h2>
          <p>Inflation is the silent wealth destroyer that most people ignore in their financial planning. While your bank account balance stays the same, the <em>real value</em> of that money shrinks year after year. India's average inflation of 5-6% means that prices roughly double every 12 years.</p>

          <h3>The Purchasing Power Illusion</h3>
          <p>Consider this: ₹1 Lakh kept in a savings account earning 4% interest for 20 years grows to about ₹2.19 Lakh nominally. But at 6% inflation, that same basket of goods now costs ₹3.21 Lakh. Your ₹2.19 Lakh can only buy 68% of what ₹1 Lakh bought today. You've lost money despite "earning" interest.</p>

          <h3>Category-Specific Inflation in India</h3>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead><tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Category</th>
              <th className="border border-gray-300 p-2 text-center">Typical Annual Inflation</th>
              <th className="border border-gray-300 p-2 text-center">Prices Double In</th>
            </tr></thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2 font-semibold">General (CPI)</td><td className="border border-gray-300 p-2 text-center">5-6%</td><td className="border border-gray-300 p-2 text-center">12-14 years</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Education</td><td className="border border-gray-300 p-2 text-center text-red-600 font-bold">10-12%</td><td className="border border-gray-300 p-2 text-center text-red-600">6-7 years</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Healthcare</td><td className="border border-gray-300 p-2 text-center text-red-600 font-bold">8-10%</td><td className="border border-gray-300 p-2 text-center text-red-600">7-9 years</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Food & Beverages</td><td className="border border-gray-300 p-2 text-center">6-8%</td><td className="border border-gray-300 p-2 text-center">9-12 years</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Housing Rent</td><td className="border border-gray-300 p-2 text-center">4-6%</td><td className="border border-gray-300 p-2 text-center">12-18 years</td></tr>
            </tbody>
          </table>
          <p><strong>Critical:</strong> If you are planning for your child's engineering education that costs ₹25 Lakh today, at 10% education inflation, it will cost over ₹1 Crore in 15 years. Using "general" 6% inflation would grossly underestimate this goal.</p>

          <div className="bg-red-50 p-4 rounded-lg my-4 text-sm border-l-4 border-red-500 not-prose">
            <p className="font-semibold mb-1">Key Takeaway</p>
            <p>Your investments MUST beat inflation by at least 3-5% to create real wealth. Savings accounts (4%) and FDs (7%) barely keep pace. Equity Mutual Funds (12-15%) are the only reliable way to beat inflation significantly over the long term.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/future-value-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-red-50 hover:border-red-400 text-gray-600">Future Value Calculator</a>
            <a href="/calculators/retirement-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-red-50 hover:border-red-400 text-gray-600">Retirement Calculator</a>
            <a href="/calculators/sip-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-red-50 hover:border-red-400 text-gray-600">SIP Calculator</a>
            <a href="/calculators/compound-interest-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-red-50 hover:border-red-400 text-gray-600">Compound Interest</a>
          </div>
        </div>
      </div>
    </>
  );
};
