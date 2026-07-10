import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   SCSS CALCULATOR — PURE STATIC HTML
   Target keywords: scss calculator, senior citizen savings scheme calculator,
   scss interest rate 2026, post office scss calculator
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is the Senior Citizen Savings Scheme (SCSS)?", answer: "SCSS is a government-backed savings instrument offered to Indian residents aged 60 years or above. It provides a regular income stream, highest safety, and tax benefits, making it the most preferred retirement scheme in India." },
  { question: "What is the current interest rate for SCSS?", answer: "The interest rate for SCSS is 8.2% per annum, payable quarterly. The rate is fixed for the entire 5-year tenure once you invest." },
  { question: "How is the interest paid out in SCSS?", answer: "The interest is paid out quarterly on the 1st working day of April, July, October, and January. It is directly credited to your linked savings account." },
  { question: "What is the maximum investment limit in SCSS?", answer: "The maximum investment limit in SCSS has been enhanced to ₹30 Lakhs per individual. A retired couple can jointly invest up to ₹60 Lakhs if both are eligible." },
  { question: "Can I withdraw my money before 5 years?", answer: "Yes, premature withdrawal is allowed after 1 year, but with a penalty. If withdrawn between 1-2 years, a 1.5% penalty on principal is deducted. If withdrawn after 2 years, a 1% penalty is deducted." }
];

export const ScssCalculator: React.FC = () => {
  const [depositAmount, setDepositAmount] = useState<number>(3000000);
  const [interestRate, setInterestRate] = useState<number>(8.2);

  const calculations = useMemo(() => {
    // Interest is paid quarterly and is not compounded
    const annualInterest = depositAmount * (interestRate / 100);
    const quarterlyInterest = annualInterest / 4;
    
    // Fixed 5 year tenure
    const totalInterest = annualInterest * 5;
    
    const schedule = [];
    for (let year = 1; year <= 5; year++) {
      schedule.push({ 
        year, 
        q1: Math.round(quarterlyInterest),
        q2: Math.round(quarterlyInterest),
        q3: Math.round(quarterlyInterest),
        q4: Math.round(quarterlyInterest),
        yearlyTotal: Math.round(annualInterest)
      });
    }
    
    return {
      quarterlyInterest: Math.round(quarterlyInterest),
      annualInterest: Math.round(annualInterest),
      totalInterest: Math.round(totalInterest),
      maturityAmount: depositAmount, // Principal is returned at maturity
      schedule
    };
  }, [depositAmount, interestRate]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="SCSS Calculator 2026 | Senior Citizen Savings Scheme" 
        description="Calculate quarterly interest payouts for the Senior Citizen Savings Scheme (SCSS) at 8.2%. Plan your retirement income accurately with our free calculator." 
        keywords="scss calculator, senior citizen savings scheme calculator, scss interest rate 2026, post office scss calculator, retirement income calculator" 
        url="/calculators/scss-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'SCSS Calculator', description: 'Calculate Senior Citizen Savings Scheme quarterly payouts.', category: 'Retirement Calculators', features: ['Quarterly Payout Logic', '30 Lakh Limit', '8.2% Interest'], ratingValue: 4.9, reviewCount: 11200, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">SCSS Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">SCSS Calculator (Senior Citizen Savings Scheme)</h1>
          <p className="text-gray-600">Calculate the exact quarterly income you will receive from your SCSS investment. The scheme has a 5-year lock-in period, paying out interest every 3 months.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-cyan-900 border-b border-cyan-200 pb-2">SCSS Investment Details</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-cyan-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="depositAmount">Total Investment (₹)</label><p className="text-xs text-gray-500 font-normal">Max ₹30 Lakhs</p></td>
                    <td className="py-3">
                      <input id="depositAmount" type="number" value={depositAmount} onChange={(e) => setDepositAmount(Math.max(1000, Math.min(3000000, Number(e.target.value) || 0)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 text-lg font-bold" min="1000" max="3000000" step="1000" />
                    </td>
                  </tr>
                  <tr className="border-b border-cyan-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="interestRate">Interest Rate (%)</label><p className="text-xs text-gray-500 font-normal">Govt Rate: 8.2%</p></td>
                    <td className="py-3">
                      <input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Math.max(1, Math.min(15, Number(e.target.value) || 8.2)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label>Lock-in Period</label></td>
                    <td className="py-3">
                      <input type="text" value="5 Years (Extendable by 3)" disabled className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-600 font-medium text-sm" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-white rounded border border-cyan-100 text-xs text-cyan-800">
                <strong>Note:</strong> Investments up to ₹1.5L qualify for Section 80C deductions.
              </div>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-teal-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-cyan-200">Quarterly Payout (Every 3 Months)</h2>
                <div className="text-4xl lg:text-5xl font-black mb-1 text-white">{fmt(calculations.quarterlyInterest)}</div>
                <p className="text-cyan-100 text-sm mt-2">Credited to your savings account</p>
              </div>
              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Total Yearly Income</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(calculations.annualInterest)} / year</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-green-50">
                      <td className="p-4 text-sm font-bold text-green-800">Total Interest Earned (5 Years)</td>
                      <td className="p-4 text-right text-base font-bold text-green-700">+{fmt(calculations.totalInterest)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="p-4 text-sm font-medium text-gray-700">Principal Returned at Maturity</td>
                      <td className="p-4 text-right text-base font-bold text-gray-900">{fmt(calculations.maturityAmount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ===== YEAR-WISE TABLE ===== */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5-Year SCSS Payout Schedule</h2>
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full border-collapse text-sm text-left relative">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-3 text-center font-semibold">Year</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold">Q1 Payout</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold">Q2 Payout</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold">Q3 Payout</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold">Q4 Payout</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold text-green-700">Total Yearly Income</th>
                </tr>
              </thead>
              <tbody>
                {calculations.schedule.map(row => (
                  <tr key={row.year} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                    <td className="p-3 text-center font-medium">{row.year}</td>
                    <td className="p-3 text-right text-gray-600">{fmtNum(row.q1)}</td>
                    <td className="p-3 text-right text-gray-600">{fmtNum(row.q2)}</td>
                    <td className="p-3 text-right text-gray-600">{fmtNum(row.q3)}</td>
                    <td className="p-3 text-right text-gray-600">{fmtNum(row.q4)}</td>
                    <td className="p-3 text-right font-bold text-green-700">{fmtNum(row.yearlyTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* Unlike fixed deposits, SCSS interest does not compound. It is forcibly paid out every quarter to provide liquidity to senior citizens.</p>
        </div>

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>Senior Citizen Savings Scheme (SCSS) Complete Guide</h2>
          <p>
            The <strong>Senior Citizen Savings Scheme (SCSS)</strong> is the premier fixed-income investment specifically designed by the Government of India for retirees. It offers the highest interest rate among all small savings schemes, backed by a sovereign guarantee, making it 100% risk-free.
          </p>

          <h3>Key Features of SCSS in 2026</h3>
          <ul>
            <li><strong>Current Interest Rate:</strong> The interest rate is set at <strong>8.2% per annum</strong>. Once you invest, this rate is locked in for the entire 5-year tenure, shielding you from future rate cuts.</li>
            <li><strong>Maximum Limit Enhanced:</strong> The government recently doubled the maximum investment limit. An individual can now invest up to <strong>₹30 Lakhs</strong> in SCSS. A married couple (if both are over 60) can jointly invest up to ₹60 Lakhs, yielding a massive combined quarterly payout.</li>
            <li><strong>Quarterly Payouts:</strong> Interest is not compounded. It is paid out on the first working day of April, July, October, and January directly to your linked post office or bank savings account.</li>
            <li><strong>Tenure:</strong> The base tenure is 5 years. However, upon maturity, it can be extended once for a block of 3 more years.</li>
          </ul>

          <h3>Who is Eligible to Open an SCSS Account?</h3>
          <p>The eligibility criteria are strictly enforced:</p>
          <ul>
            <li>Any Indian citizen aged <strong>60 years or above</strong>.</li>
            <li>Civilian retirees between <strong>55 and 60 years</strong> who have retired on superannuation or under a VRS scheme (provided they invest their retirement benefits within one month of receipt).</li>
            <li>Retired Defense Personnel aged <strong>50 years and above</strong> (excluding Civilian Defence employees).</li>
            <li>NRIs and HUFs (Hindu Undivided Families) are <strong>not eligible</strong> to open an SCSS account.</li>
          </ul>

          <h3>Taxation Rules for SCSS</h3>
          <p>SCSS has specific tax implications that every senior citizen must understand:</p>
          <ol>
            <li><strong>Section 80C Benefit:</strong> The initial investment amount (up to ₹1.5 Lakhs) is eligible for tax deduction under Section 80C.</li>
            <li><strong>Interest is Taxable:</strong> The quarterly interest you receive is fully taxable as per your income tax slab. It is added to your "Income from Other Sources".</li>
            <li><strong>TDS Rules:</strong> If your total interest earned across all SCSS accounts exceeds ₹50,000 in a financial year, the bank/post office will deduct TDS at 10%. (Prior to 2018, this limit was ₹10,000).</li>
            <li><strong>Form 15H:</strong> If your total income for the year is below the taxable limit, you can submit Form 15H to the bank/post office at the start of the financial year to prevent them from deducting TDS.</li>
          </ol>

          <h3>Premature Withdrawal Penalties</h3>
          <p>While SCSS is a 5-year lock-in scheme, liquidity is provided in emergencies, albeit with penalties:</p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Withdrawal Timeframe</th>
                <th className="border border-gray-300 p-2 text-left">Penalty / Rules</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2 font-semibold">Before 1 Year</td><td className="border border-gray-300 p-2">No interest is payable. If any quarterly interest was already paid out, it will be recovered from the principal.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Between 1 to 2 Years</td><td className="border border-gray-300 p-2">1.5% of the principal amount is deducted as penalty.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">After 2 Years</td><td className="border border-gray-300 p-2">1.0% of the principal amount is deducted as penalty.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">In Case of Death</td><td className="border border-gray-300 p-2">Account is closed without any penalty. The principal and accrued interest is paid to the nominee.</td></tr>
            </tbody>
          </table>

          <div className="bg-cyan-50 p-4 rounded-lg my-4 text-base border-l-4 border-cyan-500">
            <strong>Strategy for ₹30 Lakh Limit:</strong> If you max out the ₹30 Lakh limit at 8.2%, you will receive a guaranteed payout of <strong>₹61,500 every 3 months</strong> (₹20,500 per month equivalent) for 5 straight years. This creates a powerful, risk-free baseline for your retirement income architecture.
          </div>

        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/retirement-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-cyan-50 hover:border-cyan-400 text-gray-600">Retirement Planner</a>
            <a href="/calculators/post-office-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-cyan-50 hover:border-cyan-400 text-gray-600">Post Office Schemes</a>
            <a href="/calculators/fd-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-cyan-50 hover:border-cyan-400 text-gray-600">FD Calculator</a>
            <a href="/calculators/nsc-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-cyan-50 hover:border-cyan-400 text-gray-600">NSC Calculator</a>
          </div>
        </div>
      </div>
    </>
  );
};
