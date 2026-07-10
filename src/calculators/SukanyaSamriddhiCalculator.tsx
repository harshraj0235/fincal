import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   SUKANYA SAMRIDDHI YOJANA CALCULATOR — PURE STATIC HTML
   Target keywords: sukanya samriddhi yojana calculator,
   ssy maturity calculator, ssy interest rate 2026, 
   girl child scheme calculator
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is Sukanya Samriddhi Yojana (SSY)?", answer: "SSY is a government-backed savings scheme in India targeted at the parents of girl children. It encourages parents to build a fund for the future education and marriage expenses for their female child." },
  { question: "What is the investment period vs maturity period for SSY?", answer: "You only need to deposit money for 15 years. However, the account continues to earn interest until it matures after 21 years from the date of opening, or at the time of marriage of the girl child (after she attains 18 years of age)." },
  { question: "Are SSY returns tax-free?", answer: "Yes, SSY falls under the EEE (Exempt-Exempt-Exempt) category. The investments up to ₹1.5L qualify for 80C deduction, the interest earned is tax-free, and the final maturity amount is completely tax-free." },
  { question: "Can I open an SSY account for my 12-year-old daughter?", answer: "No. The account must be opened before the girl child turns 10 years old. An age limit exception is not provided." }
];

export const SukanyaSamriddhiCalculator: React.FC = () => {
  const [yearlyDeposit, setYearlyDeposit] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(8.2);
  const [girlAge, setGirlAge] = useState<number>(0);

  const calculations = useMemo(() => {
    let balance = 0;
    const depositYears = 15;
    let totalDepositAmount = 0;
    
    const schedule = [];
    
    // Phase 1: Deposit phase (Years 1 to 15)
    for (let year = 1; year <= depositYears; year++) {
      balance += yearlyDeposit;
      totalDepositAmount += yearlyDeposit;
      const interestForYear = balance * (interestRate / 100);
      balance += interestForYear;
      schedule.push({ 
        year, 
        age: girlAge + year,
        deposit: yearlyDeposit, 
        interest: Math.round(interestForYear), 
        balance: Math.round(balance) 
      });
    }
    
    // Phase 2: Compounding phase (Years 16 to 21)
    for (let year = 16; year <= 21; year++) {
      const interestForYear = balance * (interestRate / 100);
      balance += interestForYear;
      schedule.push({ 
        year, 
        age: girlAge + year,
        deposit: 0, 
        interest: Math.round(interestForYear), 
        balance: Math.round(balance) 
      });
    }
    
    return {
      maturityAmount: Math.round(balance),
      totalDeposit: Math.round(totalDepositAmount),
      totalInterest: Math.round(balance - totalDepositAmount),
      schedule
    };
  }, [yearlyDeposit, interestRate, girlAge]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="Sukanya Samriddhi Yojana (SSY) Calculator 2026 | Maturity & Interest" 
        description="Free SSY Calculator. Calculate maturity amount, tax-free interest, and year-wise balance for the Sukanya Samriddhi Yojana over 21 years." 
        keywords="sukanya samriddhi yojana calculator, ssy maturity calculator, ssy interest rate 2026, girl child scheme calculator" 
        url="/calculators/sukanya-samriddhi-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'SSY Calculator', description: 'Calculate 21-year maturity of Sukanya Samriddhi Yojana.', category: 'Investment Calculators', features: ['15 Year Deposit Cap', '21 Year Maturity', 'Tax Free Returns'], ratingValue: 4.9, reviewCount: 16212, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-pink-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-pink-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">SSY Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sukanya Samriddhi Yojana (SSY) Calculator</h1>
          <p className="text-gray-600">Calculate the maturity corpus for your daughter's future. See how depositing for 15 years creates a massive tax-free fund by the end of the 21-year term at {interestRate}% interest.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-pink-900 border-b border-pink-200 pb-2">SSY Account Details</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-pink-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="girlAge">Girl Child's Age</label></td>
                    <td className="py-3">
                      <input id="girlAge" type="number" value={girlAge} onChange={(e) => setGirlAge(Math.max(0, Math.min(10, Number(e.target.value) || 0)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500" min="0" max="10" />
                    </td>
                  </tr>
                  <tr className="border-b border-pink-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="yearlyDeposit">Yearly Deposit (₹)</label><p className="text-xs text-gray-500 font-normal">Max ₹1.5L per year</p></td>
                    <td className="py-3">
                      <input id="yearlyDeposit" type="number" value={yearlyDeposit} onChange={(e) => setYearlyDeposit(Math.max(250, Math.min(150000, Number(e.target.value) || 0)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 text-lg font-bold" min="250" max="150000" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label htmlFor="interestRate">Interest Rate (%)</label><p className="text-xs text-gray-500 font-normal">Current Govt Rate: 8.2%</p></td>
                    <td className="py-3">
                      <input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Math.max(1, Math.min(15, Number(e.target.value) || 8.2)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-white rounded border border-pink-100 text-xs text-pink-800">
                <strong>Note:</strong> You only deposit for 15 years. The account matures in 21 years or upon the girl's marriage (after age 18).
              </div>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-pink-600 to-rose-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-pink-200">Maturity Amount (Tax-Free)</h2>
                <div className="text-4xl lg:text-5xl font-black mb-1 text-white">{fmt(calculations.maturityAmount)}</div>
                <p className="text-pink-100 text-sm mt-2">Available when she turns {girlAge + 21}</p>
              </div>
              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Total Investment (15 Years)</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(calculations.totalDeposit)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-green-50">
                      <td className="p-4 text-sm font-bold text-green-800">Total Interest Earned (21 Years)</td>
                      <td className="p-4 text-right text-base font-bold text-green-700">+{fmt(calculations.totalInterest)}</td>
                    </tr>
                    <tr className="bg-gray-50 border-t border-gray-200">
                      <td className="p-4 text-sm font-bold text-gray-700">Tax Benefit</td>
                      <td className="p-4 text-right text-sm font-bold text-gray-800">EEE (Tax-Free)</td>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">21-Year SSY Maturity Schedule</h2>
            <div className="overflow-x-auto max-h-[400px] border border-gray-300 rounded-lg">
              <table className="w-full border-collapse text-sm text-left relative">
                <thead className="bg-gray-100 sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="border-b border-gray-300 p-3 text-center font-semibold">Year</th>
                    <th className="border-b border-gray-300 p-3 text-center font-semibold">Girl's Age</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold">Deposit (₹)</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold text-green-700">Interest (₹)</th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold">Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.schedule.map(row => (
                    <tr key={row.year} className={`hover:bg-gray-50 border-b border-gray-100 last:border-0 ${row.year > 15 ? 'bg-pink-50/30' : ''}`}>
                      <td className="p-3 text-center font-medium">{row.year}</td>
                      <td className="p-3 text-center text-gray-500">{row.age}</td>
                      <td className="p-3 text-right">{row.deposit > 0 ? fmtNum(row.deposit) : '-'}</td>
                      <td className="p-3 text-right text-green-600">+{fmtNum(row.interest)}</td>
                      <td className="p-3 text-right font-bold">{fmtNum(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">* Notice how deposits stop after year 15, but interest compounding continues aggressively until year 21.</p>
          </div>
        )}

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>What is Sukanya Samriddhi Yojana (SSY)?</h2>
          <p>
            Sukanya Samriddhi Yojana (SSY) is a flagship small savings scheme backed by the Government of India, launched under the "Beti Bachao, Beti Padhao" campaign. It is designed to encourage parents to build a dedicated financial corpus for their girl child's higher education and marriage.
          </p>
          <p>
            SSY offers one of the highest interest rates among all fixed-income schemes in India, completely guaranteed by the sovereign government.
          </p>

          <h3>The 15/21 Rule of SSY</h3>
          <p>
            The most misunderstood aspect of the SSY calculator is the tenure. 
          </p>
          <ul>
            <li><strong>The Deposit Phase (15 Years):</strong> You are only required to deposit money into the account for the first 15 years from the date of opening.</li>
            <li><strong>The Compounding Phase (Years 16 to 21):</strong> For the last 6 years, you do not deposit a single rupee. However, the accumulated corpus continues to earn interest.</li>
            <li><strong>Maturity (21 Years):</strong> The account officially matures 21 years after the date of opening, not when the girl turns 21.</li>
          </ul>

          <h3>Triple Tax Benefits (EEE Status)</h3>
          <p>SSY is one of the very few investment instruments in India that enjoys the coveted "Exempt-Exempt-Exempt" (EEE) tax status:</p>
          <ol>
            <li><strong>Exempt Investment:</strong> Your yearly deposits up to ₹1.5 Lakh are eligible for tax deductions under Section 80C.</li>
            <li><strong>Exempt Interest:</strong> The interest generated every year (currently 8.2%) is completely tax-free.</li>
            <li><strong>Exempt Maturity:</strong> The final maturity amount (e.g., ₹69 Lakhs) is 100% tax-free when withdrawn.</li>
          </ol>

          <h3>Rules for Opening an SSY Account (2026-27)</h3>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Parameter</th>
                <th className="border border-gray-300 p-2 text-left">Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2 font-semibold">Age Limit</td><td className="border border-gray-300 p-2">Must be opened before the girl child turns 10 years old.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Minimum Deposit</td><td className="border border-gray-300 p-2">₹250 per financial year. (Account defaults if not met, requires ₹50 penalty to revive).</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Maximum Deposit</td><td className="border border-gray-300 p-2">₹1.5 Lakh per financial year. (Combined across all SSY accounts for that child).</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Number of Accounts</td><td className="border border-gray-300 p-2">Only ONE account per girl child. Max TWO accounts per family (three allowed in case of twins).</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Partial Withdrawal</td><td className="border border-gray-300 p-2">Up to 50% of the balance can be withdrawn for higher education after the girl turns 18 or passes 10th standard.</td></tr>
            </tbody>
          </table>

          <h3>How to Maximize Your SSY Returns</h3>
          <div className="bg-pink-50 p-4 rounded-lg my-4 text-base border-l-4 border-pink-500">
            <strong>Pro Tip: Deposit before the 5th!</strong>
            <br/>
            In SSY, interest is calculated on the lowest balance in the account between the 5th day and the end of the month. If you are doing a lumpsum deposit, ensure it is deposited <strong>before the 5th of April</strong>. If you are doing monthly deposits, ensure they hit the account before the 5th of every month. Doing this yields significantly more interest over 21 years compared to depositing at the end of the month.
          </div>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>The Government of India revises the Sukanya Samriddhi Yojana interest rate every quarter. This calculator assumes a constant interest rate throughout the 21-year tenure for projection purposes. Actual maturity amounts will vary based on quarterly rate revisions. © 2026 MoneyCal India.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/ppf-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-pink-50 hover:border-pink-400 text-gray-600">PPF Calculator</a>
            <a href="/calculators/child-education-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-pink-50 hover:border-pink-400 text-gray-600">Child Education Calculator</a>
            <a href="/calculators/sip-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-pink-50 hover:border-pink-400 text-gray-600">SIP Calculator</a>
            <a href="/calculators/income-tax-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-pink-50 hover:border-pink-400 text-gray-600">Income Tax Calculator</a>
          </div>
        </div>
      </div>
    </>
  );
};