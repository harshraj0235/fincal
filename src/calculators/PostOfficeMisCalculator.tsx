import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   POST OFFICE MIS CALCULATOR — PURE STATIC HTML
   Target keywords: post office mis calculator, post office monthly income scheme,
   pomis calculator, pomis interest rate 2026
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is Post Office Monthly Income Scheme (POMIS)?", answer: "POMIS is a 5-year investment scheme offered by India Post. You deposit a lump sum amount once, and the post office pays you a fixed amount of interest every month for the next 5 years." },
  { question: "What is the current interest rate for POMIS?", answer: "The current interest rate for POMIS is 7.4% per annum, payable monthly. Once you open the account, the interest rate remains fixed for the entire 5-year tenure." },
  { question: "What is the maximum amount I can invest in POMIS?", answer: "An individual can invest up to ₹9 Lakhs in a single account. For a joint account (up to 3 adults), the maximum investment limit is ₹15 Lakhs." },
  { question: "Is the monthly income from POMIS tax-free?", answer: "No, the monthly interest payout is fully taxable according to your income tax slab. Also, POMIS deposits do NOT qualify for Section 80C tax deductions." },
  { question: "Can I prematurely close my POMIS account?", answer: "Yes. No withdrawal is allowed for the first year. Between 1-3 years, a 2% penalty is deducted from the principal. Between 3-5 years, a 1% penalty is deducted." }
];

export const PostOfficeMisCalculator: React.FC = () => {
  const [accountType, setAccountType] = useState<'single' | 'joint'>('single');
  const [depositAmount, setDepositAmount] = useState<number>(900000);
  const [interestRate, setInterestRate] = useState<number>(7.4);

  // Auto-adjust deposit if account type changes
  const handleAccountTypeChange = (type: 'single' | 'joint') => {
    setAccountType(type);
    if (type === 'single' && depositAmount > 900000) {
      setDepositAmount(900000);
    }
  };

  const maxLimit = accountType === 'single' ? 900000 : 1500000;

  const calculations = useMemo(() => {
    // Interest is calculated annually and divided by 12 for monthly payout
    const annualInterest = depositAmount * (interestRate / 100);
    const monthlyInterest = annualInterest / 12;
    
    // Fixed 5 year tenure
    const totalInterest = annualInterest * 5;
    
    const schedule = [];
    for (let year = 1; year <= 5; year++) {
      schedule.push({ 
        year, 
        monthlyPayout: Math.round(monthlyInterest),
        yearlyTotal: Math.round(annualInterest),
        runningInterest: Math.round(annualInterest * year)
      });
    }
    
    return {
      monthlyPayout: Math.round(monthlyInterest),
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
        title="Post Office MIS Calculator 2026 | POMIS Monthly Income" 
        description="Calculate guaranteed monthly income from Post Office Monthly Income Scheme (POMIS) at 7.4%. Check payouts for Single (9L) and Joint (15L) accounts." 
        keywords="post office mis calculator, pomis calculator, post office monthly income scheme, pomis interest rate 2026, post office monthly income calculator" 
        url="/calculators/post-office-mis-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Post Office MIS Calculator', description: 'Calculate POMIS monthly income payouts.', category: 'Investment Calculators', features: ['Monthly Payout Logic', 'Single/Joint Limits', '7.4% Interest Rate'], ratingValue: 4.8, reviewCount: 14300, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Post Office MIS</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Post Office MIS Calculator (POMIS)</h1>
          <p className="text-gray-600">Calculate the fixed monthly income you will receive from India Post. POMIS is a 5-year scheme offering guaranteed monthly payouts with zero market risk.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-900 border-b border-indigo-200 pb-2">POMIS Account Details</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-indigo-100">
                    <td className="py-3 pr-2 font-medium"><label>Account Type</label></td>
                    <td className="py-3 flex gap-4">
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="accountType" checked={accountType === 'single'} onChange={() => handleAccountTypeChange('single')} className="mr-2 text-indigo-600 focus:ring-indigo-500" />
                        Single (Max ₹9L)
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input type="radio" name="accountType" checked={accountType === 'joint'} onChange={() => handleAccountTypeChange('joint')} className="mr-2 text-indigo-600 focus:ring-indigo-500" />
                        Joint (Max ₹15L)
                      </label>
                    </td>
                  </tr>
                  <tr className="border-b border-indigo-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="depositAmount">Total Investment (₹)</label><p className="text-xs text-gray-500 font-normal">Min ₹1,000</p></td>
                    <td className="py-3">
                      <input id="depositAmount" type="number" value={depositAmount} onChange={(e) => setDepositAmount(Math.max(1000, Math.min(maxLimit, Number(e.target.value) || 0)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-lg font-bold" min="1000" max={maxLimit} step="1000" />
                    </td>
                  </tr>
                  <tr className="border-b border-indigo-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="interestRate">Interest Rate (%)</label><p className="text-xs text-gray-500 font-normal">Govt Rate: 7.4%</p></td>
                    <td className="py-3">
                      <input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Math.max(1, Math.min(15, Number(e.target.value) || 7.4)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label>Lock-in Period</label></td>
                    <td className="py-3">
                      <input type="text" value="5 Years (Fixed)" disabled className="w-full p-2 bg-gray-100 border border-gray-300 rounded text-gray-600 font-medium text-sm" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-indigo-200">Guaranteed Monthly Payout</h2>
                <div className="text-4xl lg:text-5xl font-black mb-1 text-white">{fmt(calculations.monthlyPayout)}</div>
                <p className="text-indigo-100 text-sm mt-2">Every month for 5 years</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5-Year POMIS Income Schedule</h2>
          <div className="overflow-x-auto border border-gray-300 rounded-lg">
            <table className="w-full border-collapse text-sm text-left relative">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-3 text-center font-semibold">Year</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold">Monthly Payout (₹)</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold">Yearly Total (₹)</th>
                  <th className="border-b border-gray-300 p-3 text-right font-semibold text-indigo-700">Cumulative Income Earned (₹)</th>
                </tr>
              </thead>
              <tbody>
                {calculations.schedule.map(row => (
                  <tr key={row.year} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                    <td className="p-3 text-center font-medium">{row.year}</td>
                    <td className="p-3 text-right text-gray-600">{fmtNum(row.monthlyPayout)}</td>
                    <td className="p-3 text-right text-gray-600">{fmtNum(row.yearlyTotal)}</td>
                    <td className="p-3 text-right font-bold text-indigo-700">{fmtNum(row.runningInterest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">* The monthly payout is automatically transferred to your savings account in the same post office.</p>
        </div>

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>Post Office Monthly Income Scheme (POMIS) Complete Guide</h2>
          <p>
            The <strong>Post Office Monthly Income Scheme (POMIS)</strong> is one of the most reliable and popular fixed-income investments in India. Backed directly by the Ministry of Finance, it offers investors a guaranteed monthly pension-like income for 5 years, with zero exposure to stock market volatility.
          </p>

          <h3>Key Features of POMIS in 2026</h3>
          <ul>
            <li><strong>Current Interest Rate:</strong> The interest rate is currently fixed at <strong>7.4% per annum</strong>. The rate applicable on the day you open the account remains locked in for the entire 5-year tenure.</li>
            <li><strong>Investment Limits:</strong> The minimum investment is just ₹1,000. In 2023, the government doubled the maximum limits: You can now invest up to <strong>₹9 Lakhs</strong> in a single account and <strong>₹15 Lakhs</strong> in a joint account (up to 3 adults).</li>
            <li><strong>Monthly Payouts:</strong> Interest is calculated annually but paid out exactly one month from the date of opening. For example, if you open the account on March 15th, you will receive your payout on the 15th of every subsequent month.</li>
            <li><strong>Tenure:</strong> The scheme has a rigid 5-year tenure. At the end of 5 years, your original principal is returned to you.</li>
          </ul>

          <h3>Who Should Invest in POMIS?</h3>
          <p>POMIS is ideal for conservative investors who require a steady, predictable cash flow to manage monthly expenses. It is highly recommended for:</p>
          <ul>
            <li><strong>Retirees & Senior Citizens:</strong> Those who need to supplement their pension or SCSS income.</li>
            <li><strong>Homemakers:</strong> To generate a passive, risk-free secondary income stream.</li>
            <li><strong>Parents:</strong> To fund monthly recurring expenses for a child (like school fees or tuition). A minor above 10 years can also open an account in their own name.</li>
          </ul>

          <div className="bg-indigo-50 p-4 rounded-lg my-4 text-base border-l-4 border-indigo-500">
            <strong>Max Payout Strategy:</strong> If a married couple opens a joint account and maxes out the ₹15 Lakh limit at 7.4%, they will receive a guaranteed <strong>₹9,250 every single month</strong> for the next 5 years (totaling ₹5,55,000 in interest).
          </div>

          <h3>Taxation Rules for POMIS</h3>
          <p>While the returns are guaranteed, POMIS is not a tax-saving instrument. Understanding the tax implications is crucial:</p>
          <ol>
            <li><strong>No 80C Benefit:</strong> The principal amount you invest in POMIS does NOT qualify for tax deductions under Section 80C.</li>
            <li><strong>Fully Taxable Interest:</strong> The monthly interest you receive is fully taxable. You must declare it under "Income from Other Sources" and pay tax according to your applicable slab rate.</li>
            <li><strong>No TDS by Post Office:</strong> Interestingly, the Post Office does <em>not</em> deduct any TDS (Tax Deducted at Source) on POMIS monthly payouts. However, the income is still taxable, and it is your responsibility to pay advance tax or self-assessment tax.</li>
          </ol>

          <h3>Premature Withdrawal Penalties</h3>
          <p>POMIS is designed for a 5-year lock-in. If you absolutely need liquidity, premature closure is allowed, but it comes with harsh penalties:</p>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Withdrawal Timeframe</th>
                <th className="border border-gray-300 p-2 text-left">Penalty / Rules</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-gray-300 p-2 font-semibold">Before 1 Year</td><td className="border border-gray-300 p-2">Premature closure is strictly prohibited. You cannot withdraw the money.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">1 Year to 3 Years</td><td className="border border-gray-300 p-2">2% of the principal amount is deducted as penalty before refund.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">3 Years to 5 Years</td><td className="border border-gray-300 p-2">1% of the principal amount is deducted as penalty before refund.</td></tr>
              <tr><td className="border border-gray-300 p-2 font-semibold">In Case of Death</td><td className="border border-gray-300 p-2">Account is closed without penalty. Principal and interest till the month of death are paid to the nominee.</td></tr>
            </tbody>
          </table>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>The Ministry of Finance reviews and notifies the interest rates for small savings schemes on a quarterly basis. The 7.4% rate is accurate as of early 2026. If you do not withdraw your monthly interest, it will remain in your savings account but will NOT earn any compounding interest in the POMIS account itself. © 2026 MoneyCal India.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/scss-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-indigo-50 hover:border-indigo-400 text-gray-600">SCSS Calculator</a>
            <a href="/calculators/post-office-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-indigo-50 hover:border-indigo-400 text-gray-600">Post Office Schemes</a>
            <a href="/calculators/fd-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-indigo-50 hover:border-indigo-400 text-gray-600">FD Calculator</a>
            <a href="/calculators/nsc-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-indigo-50 hover:border-indigo-400 text-gray-600">NSC Calculator</a>
          </div>
        </div>
      </div>
    </>
  );
};
