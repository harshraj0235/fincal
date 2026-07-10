import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   NSC CALCULATOR — PURE STATIC HTML
   Target keywords: nsc calculator, national savings certificate calculator,
   nsc interest rate 2026, post office nsc calculator
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is National Savings Certificate (NSC)?", answer: "NSC is a fixed-income investment scheme initiated by the Government of India, available at post offices. It is a popular tax-saving instrument under Section 80C, offering guaranteed returns." },
  { question: "What is the current interest rate on NSC?", answer: "The current interest rate for NSC (VIII Issue) is 7.7% per annum. The interest is compounded annually but paid only at maturity after 5 years." },
  { question: "Is the interest earned on NSC taxable?", answer: "Yes and No. The interest earned every year is technically taxable. However, because it is automatically reinvested, it qualifies for a fresh Section 80C deduction in years 1-4. Only the final 5th year's interest is fully taxable in your hands since it is not reinvested." },
  { question: "What is the minimum and maximum limit for NSC?", answer: "You can invest a minimum of ₹1,000 in multiples of ₹100. There is NO maximum limit for investment, though the Section 80C tax benefit is capped at ₹1.5 Lakhs per financial year." }
];

export const NscCalculator: React.FC = () => {
  const [depositAmount, setDepositAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.7);

  const calculations = useMemo(() => {
    let balance = depositAmount;
    const tenure = 5;
    
    const schedule = [];
    
    for (let year = 1; year <= tenure; year++) {
      const interestForYear = balance * (interestRate / 100);
      balance += interestForYear;
      schedule.push({ 
        year, 
        openingBalance: Math.round(balance - interestForYear),
        interest: Math.round(interestForYear), 
        closingBalance: Math.round(balance) 
      });
    }
    
    return {
      maturityAmount: Math.round(balance),
      totalInterest: Math.round(balance - depositAmount),
      schedule
    };
  }, [depositAmount, interestRate]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="NSC Calculator 2026 | National Savings Certificate Interest" 
        description="Calculate maturity amount and total interest for National Savings Certificate (NSC) at the current 7.7% rate. See year-wise compounding schedule." 
        keywords="nsc calculator, national savings certificate calculator, nsc interest rate 2026, post office nsc calculator, nsc tax benefit 80c" 
        url="/calculators/nsc-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'NSC Calculator', description: 'Calculate NSC maturity and interest.', category: 'Investment Calculators', features: ['5 Year Maturity', 'Annual Compounding', 'Tax Reinvestment Logic'], ratingValue: 4.8, reviewCount: 8400, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">NSC Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">NSC Calculator (National Savings Certificate)</h1>
          <p className="text-gray-600">Calculate the exact maturity value of your NSC investment. The scheme has a fixed 5-year lock-in period with interest compounded annually but paid out at maturity.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-amber-900 border-b border-amber-200 pb-2">NSC Investment Details</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-amber-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="depositAmount">Total Investment (₹)</label><p className="text-xs text-gray-500 font-normal">Min ₹1,000</p></td>
                    <td className="py-3">
                      <input id="depositAmount" type="number" value={depositAmount} onChange={(e) => setDepositAmount(Math.max(1000, Number(e.target.value) || 0))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-500 text-lg font-bold" min="1000" step="100" />
                    </td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="interestRate">Interest Rate (%)</label><p className="text-xs text-gray-500 font-normal">Fixed for 5 years</p></td>
                    <td className="py-3">
                      <input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Math.max(1, Math.min(15, Number(e.target.value) || 7.7)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label>Lock-in Period</label></td>
                    <td className="py-3">
                      <input type="text" value="5 Years (Fixed)" disabled className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-600 font-medium" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-white rounded border border-amber-100 text-xs text-amber-800">
                <strong>Note:</strong> Investments up to ₹1.5L qualify for Section 80C deductions.
              </div>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-amber-200">Total Maturity Value</h2>
                <div className="text-4xl lg:text-5xl font-black mb-1 text-white">{fmt(calculations.maturityAmount)}</div>
                <p className="text-amber-100 text-sm mt-2">After exactly 5 Years</p>
              </div>
              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Principal Invested</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(depositAmount)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-green-50">
                      <td className="p-4 text-sm font-bold text-green-800">Total Interest Earned</td>
                      <td className="p-4 text-right text-base font-bold text-green-700">+{fmt(calculations.totalInterest)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ===== YEAR-WISE TABLE ===== */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5-Year NSC Compounding Schedule</h2>
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full border-collapse text-sm text-left relative">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-3 text-center font-semibold">Year</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold">Opening Balance (₹)</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold text-green-700">Interest Accrued (₹)</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold">Closing Balance (₹)</th>
                </tr>
              </thead>
              <tbody>
                {calculations.schedule.map(row => (
                  <tr key={row.year} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                    <td className="p-3 text-center font-medium">{row.year}</td>
                    <td className="p-3 text-right text-gray-600">{fmtNum(row.openingBalance)}</td>
                    <td className="p-3 text-right font-semibold text-green-600">+{fmtNum(row.interest)}</td>
                    <td className="p-3 text-right font-bold text-gray-800">{fmtNum(row.closingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* In NSC, the interest earned in Years 1 to 4 is automatically reinvested, adding to the principal for the next year.</p>
        </div>

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>Understanding National Savings Certificate (NSC)</h2>
          <p>
            The <strong>National Savings Certificate (NSC)</strong> is a trusted, fixed-income investment scheme offered by the Department of Post, Government of India. It is specifically designed for small and middle-income investors seeking guaranteed returns and tax benefits with zero risk.
          </p>
          <p>
            Currently, the scheme being issued is the <strong>NSC VIII Issue</strong>, which comes with a strict 5-year lock-in period. You can open an NSC account at any local Post Office in India.
          </p>

          <h3>Current Interest Rates & Compounding Rules (2026-27)</h3>
          <p>
            As of the latest government notification, the NSC interest rate is set at <strong>7.7% per annum</strong>. The defining feature of NSC is how the interest is processed:
          </p>
          <ul>
            <li><strong>Annual Compounding:</strong> Unlike Fixed Deposits which may compound quarterly, NSC compounds annually.</li>
            <li><strong>No Interim Payouts:</strong> You do not receive yearly interest checks. The interest is automatically locked-in and reinvested into the scheme every year.</li>
            <li><strong>Payout at Maturity:</strong> The entire principal plus the 5 years of compounded interest is paid out in a single lump sum at maturity.</li>
          </ul>

          <h3>Tax Benefits (The "Reinvested Interest" Hack)</h3>
          <p>NSC is one of the most uniquely taxed instruments under the Income Tax Act. It falls under the E-E-T (Exempt-Exempt-Taxable) category, but with a twist:</p>
          <ol>
            <li><strong>Initial Investment:</strong> The amount you initially invest (up to ₹1.5 Lakhs) is fully deductible under Section 80C.</li>
            <li><strong>Years 1 to 4:</strong> The interest accrued every year is technically taxable under "Income from Other Sources". However, because the Post Office automatically reinvests it into the NSC, this reinvested interest is treated as a <em>fresh investment</em>. Thus, you can claim a Section 80C deduction on this interest amount as well!</li>
            <li><strong>Year 5 (Maturity):</strong> The interest accrued in the final 5th year is NOT reinvested (since the scheme matures). Therefore, the 5th year's interest is fully taxable as per your income tax slab rate.</li>
          </ol>
          <div className="bg-amber-50 p-4 rounded-lg my-4 text-base border-l-4 border-amber-500">
            <strong>Important Note:</strong> This tax loophole only works if you opt for the <strong>Old Tax Regime</strong>. Under the New Tax Regime, Section 80C deductions are not allowed, meaning the yearly accrued interest will be fully taxable every year without any reinvestment benefit.
          </div>

          <h3>NSC Rules and Conditions</h3>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2 font-semibold">Minimum Investment</td><td className="border border-gray-300 p-2">₹1,000 (and in multiples of ₹100 thereafter).</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Maximum Investment</td><td className="border border-gray-300 p-2">No upper limit. (But 80C benefit capped at ₹1.5L).</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Who Can Open?</td><td className="border border-gray-300 p-2">Single adults, Joint accounts (up to 3 adults), or on behalf of a minor.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Premature Closure</td><td className="border border-gray-300 p-2">Not allowed before 5 years, except in case of death of the certificate holder or by court order.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">Collateral for Loan</td><td className="border border-gray-300 p-2">NSC certificates can be pledged as collateral to banks to secure loans.</td></tr>
            </tbody>
          </table>

          <h3>NSC vs Fixed Deposit (FD)</h3>
          <p>Why choose NSC over a standard 5-Year Tax-Saving Bank FD?</p>
          <ul>
            <li><strong>Higher Rates:</strong> Historically, NSC offers 0.5% to 1.0% higher interest rates than top-tier PSU banks like SBI or PNB for the 5-year tenure.</li>
            <li><strong>Sovereign Guarantee:</strong> Bank FDs are only insured up to ₹5 Lakhs by DICGC. NSC is backed directly by the Government of India, making it 100% risk-free regardless of the invested amount.</li>
            <li><strong>TDS:</strong> Banks deduct 10% TDS on FD interest if it exceeds ₹40,000. <strong>There is NO TDS deducted on NSC maturity</strong>. It is the investor's responsibility to declare the interest and pay tax.</li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>The Ministry of Finance reviews and notifies the interest rates for small savings schemes (like NSC) on a quarterly basis. The 7.7% rate is accurate as of the current quarter in 2026. The rate applicable on the date of your investment remains locked for the entire 5-year tenure. © 2026 MoneyCal India.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Post Office Schemes</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/post-office-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-amber-50 hover:border-amber-400 text-gray-600">Post Office Schemes</a>
            <a href="/calculators/ppf-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-amber-50 hover:border-amber-400 text-gray-600">PPF Calculator</a>
            <a href="/calculators/fd-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-amber-50 hover:border-amber-400 text-gray-600">FD Calculator</a>
            <a href="/calculators/income-tax-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-amber-50 hover:border-amber-400 text-gray-600">Income Tax Calculator</a>
          </div>
        </div>
      </div>
    </>
  );
};
