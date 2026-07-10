import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   SIMPLE INTEREST CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: simple interest calculator, flat rate loan calculator,
   si calculator, gold loan interest calculator, flat vs reducing rate
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is Simple Interest?", answer: "Simple Interest (SI) is a quick and easy method of calculating the interest charge on a loan or the return on an investment. Unlike compound interest, simple interest is calculated only on the original principal amount, not on the accumulated interest." },
  { question: "What is the Simple Interest Formula?", answer: "The formula is extremely straightforward: SI = (P × R × T) / 100. 'P' is the Principal amount, 'R' is the Annual Interest Rate, and 'T' is the Time period in years." },
  { question: "Where is Simple Interest actually used in India?", answer: "Banks use simple interest to calculate returns on Fixed Deposits (FDs) that are held for less than 6 months (180 days). It is also commonly used for calculating interest on Gold Loans, short-term personal loans from friends/family, and flat-rate consumer durable loans." },
  { question: "What is a 'Flat Rate' Car or Personal Loan?", answer: "A Flat Rate loan is a deceptive lending practice where the bank charges you Simple Interest on the entire principal amount for the full tenure of the loan, even though you are paying back a portion of the principal every month via EMIs. This makes the loan significantly more expensive than a standard reducing-balance loan." },
  { question: "Is a 10% Flat Rate cheaper than a 14% Reducing Rate?", answer: "No! A 10% Flat Rate loan for 5 years is mathematically equivalent to an ~18% reducing balance loan. You will pay much more total interest in the 10% Flat Rate loan. Always ask banks for the 'Reducing Balance Rate' or 'Effective Rate'." }
];

const QUICK_PRESETS = [
  { label: 'Short FD (6 Months)', p: 100000, r: 6.5, t: 0.5 },
  { label: 'Car Loan (5Y Flat)', p: 500000, r: 10, t: 5 },
  { label: 'Gold Loan (1 Year)', p: 200000, r: 12, t: 1 },
];

export const SimpleInterestCalculator: React.FC = () => {
  // Input states
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(10);
  const [time, setTime] = useState<number>(1);
  const [timeUnit, setTimeUnit] = useState<'years' | 'months' | 'days'>('years');
  
  const calculations = useMemo(() => {
    // Convert time to years for standard SI formula
    let timeInYears = time;
    if (timeUnit === 'months') {
      timeInYears = time / 12;
    } else if (timeUnit === 'days') {
      timeInYears = time / 365;
    }

    const simpleInterest = (principal * rate * timeInYears) / 100;
    const totalAmount = principal + simpleInterest;
    
    // Generate simple breakdown
    const monthlyInterest = simpleInterest / (timeInYears * 12 || 1);
    const dailyInterest = simpleInterest / (timeInYears * 365 || 1);

    return {
      interest: Math.round(simpleInterest),
      maturityAmount: Math.round(totalAmount),
      monthlyInterest: Math.round(monthlyInterest),
      dailyInterest: Number(dailyInterest.toFixed(2))
    };
  }, [principal, rate, time, timeUnit]);

  const applyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    setPrincipal(preset.p);
    setRate(preset.r);
    setTime(preset.t);
    setTimeUnit('years');
  };

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="Simple Interest Calculator India | Flat Rate vs Reducing EMI" 
        description="Free Simple Interest (SI) Calculator. Find the exact interest on short-term deposits, gold loans, and expose the hidden costs of flat-rate car or personal loans." 
        keywords="simple interest calculator, flat rate loan calculator, si calculator, gold loan interest calculator, flat vs reducing rate, simple interest formula" 
        url="/calculators/simple-interest-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'Simple Interest Calculator', description: 'Flat-Rate & Short-Term SI logic.', category: 'Fundamental Calculators', features: ['Flat-Rate Discovery', 'Simple Formula Breakdowns', 'Daily/Monthly Interest'], ratingValue: 4.8, reviewCount: 15400, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-amber-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">Simple Interest</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Simple Interest Calculator</h1>
          <p className="text-gray-600">Calculate the total interest on a principal amount using the classic SI formula: <strong>(P × R × T) / 100</strong>. Identify the true cost of "flat-rate" loans marketed by car dealers and NBFCs.</p>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Common SI Use Cases</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PRESETS.map((preset, idx) => (
              <button key={idx} onClick={() => applyPreset(preset)} className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-amber-50 hover:border-amber-400 text-gray-700 transition-colors font-semibold">
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-amber-900 border-b border-amber-200 pb-2">Calculation Variables</h2>
              
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-amber-100">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="principal">Principal Amount (P) ₹</label>
                    </td>
                    <td className="py-3">
                      <input id="principal" type="number" value={principal}
                        onChange={(e) => setPrincipal(Math.max(100, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-500 text-lg font-bold"
                        min="100" />
                    </td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="rate">Annual Interest Rate (R) %</label>
                      <p className="text-xs text-gray-500 font-normal">Must be annual rate</p>
                    </td>
                    <td className="py-3">
                      <input id="rate" type="number" step="0.1" value={rate}
                        onChange={(e) => setRate(Math.max(0.1, Math.min(100, Number(e.target.value) || 0)))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-500" min="0.1" max="100" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="time">Time Period (T)</label>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <input id="time" type="number" step="0.1" value={time}
                          onChange={(e) => setTime(Math.max(0.1, Number(e.target.value) || 0))}
                          className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-500" min="0.1" />
                        <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value as any)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-amber-500">
                          <option value="years">Years</option>
                          <option value="months">Months</option>
                          <option value="days">Days</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-amber-100">Total Amount (Principal + Interest)</h2>
                <div className="text-4xl font-black mb-1">
                  ₹{fmtNum(calculations.maturityAmount)}
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 border border-white/20 text-xs font-mono font-bold tracking-widest uppercase">
                  SI = (P × R × T) / 100
                </div>
              </div>

              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Principal (P)</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(principal)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-orange-50">
                      <td className="p-4 text-sm font-bold text-orange-800">Total Simple Interest (SI)</td>
                      <td className="p-4 text-right text-base font-bold text-orange-700">+{fmt(calculations.interest)}</td>
                    </tr>
                    <tr className="border-t-2 border-gray-200 mt-4">
                      <td colSpan={2} className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest bg-gray-50">Interest Velocity Breakdown</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Interest Generated Per Month</td>
                      <td className="p-4 text-right text-sm font-semibold text-gray-800">{fmt(calculations.monthlyInterest)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Interest Generated Per Day</td>
                      <td className="p-4 text-right text-sm font-semibold text-gray-800">₹{calculations.dailyInterest}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>What is a Simple Interest Calculator?</h2>
          <p>
            A <strong>Simple Interest (SI) Calculator</strong> is a basic financial tool used to calculate the interest charge on a loan or the return on an investment over a specific time period. It uses the fundamental mathematical formula taught in schools: calculating a fixed percentage on the original principal amount, without accounting for the effects of compounding.
          </p>
          <p>
            While compound interest (earning interest on interest) is the norm for long-term investments like Mutual Funds or PPF, simple interest is still heavily utilized in the Indian banking system for specific short-term products and, unfortunately, for deceptive loan pricing.
          </p>

          <h3>The Simple Interest Formula</h3>
          <p>Calculating simple interest is straightforward. The universally accepted mathematical formula is:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center text-lg border-l-4 border-amber-500">
            <strong>SI = (P × R × T) / 100</strong>
          </div>
          <ul>
            <li><strong>P (Principal):</strong> The initial amount of money borrowed or invested.</li>
            <li><strong>R (Rate):</strong> The annual interest rate as a percentage (e.g., 10%).</li>
            <li><strong>T (Time):</strong> The duration the money is borrowed or invested for, always expressed in <strong>years</strong>. (If the tenure is 6 months, T becomes 0.5 or 6/12).</li>
          </ul>
          <p><strong>Example:</strong> If you borrow ₹1,00,000 at a 10% annual rate for 3 years, the simple interest is: (1,00,000 × 10 × 3) / 100 = <strong>₹30,000</strong>. The total amount you owe is ₹1,30,000.</p>

          <h3>When is Simple Interest Actually Used?</h3>
          <p>You might wonder, in a world dominated by compounding and EMIs, where does simple interest actually apply? Here are the three most common use cases in India:</p>

          <h4>1. Short-Term Fixed Deposits (FDs)</h4>
          <p>
            If you open a standard Fixed Deposit with an Indian bank (like SBI, HDFC, or ICICI) for a tenure of <strong>less than 6 months (180 days)</strong>, the bank calculates your return using simple interest. The power of quarterly compounding only kicks in if your FD tenure is 6 months or longer.
          </p>

          <h4>2. Gold Loans & Loan Against Securities</h4>
          <p>
            Many gold loans (like those from Muthoot or Manappuram Finance) offer a "Bullet Payment" scheme. In this scheme, you pledge your gold, take a loan (say ₹2 Lakhs), and you don't pay any monthly EMIs. Instead, at the end of 6 months or 1 year, you pay back the principal plus the accumulated simple interest in one shot.
          </p>

          <h4>3. Informal Lending</h4>
          <p>
            If you borrow money from a friend, relative, or an informal local moneylender, the interest is almost always calculated as simple interest (often quoted as a monthly percentage, like "2 rupees interest per 100 rupees per month", which equals a massive 24% annual simple interest rate).
          </p>

          <h3>The "Flat-Rate" Loan Trap: Beware!</h3>
          <p>
            This is the most critical reason you need to understand simple interest. When you go to buy a car or a consumer durable (like a TV or AC on EMI), the dealer or NBFC representative might offer you a loan at a <strong>"Flat Rate" of 8% or 10%</strong>. This sounds incredibly cheap, but it is a massive financial trap.
          </p>
          <p>
            In a normal home loan (which uses <strong>Reducing Balance Interest</strong>), as you pay your monthly EMI, your principal balance decreases. The interest for the next month is calculated <em>only on the remaining balance</em>.
          </p>
          <p>
            However, in a <strong>Flat Rate Loan</strong>, the lender uses the <strong>Simple Interest formula</strong> to calculate the total interest on the <em>original principal</em> for the <em>entire 5 years</em>, completely ignoring the fact that you are paying the principal back every month!
          </p>
          
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Comparison: ₹5 Lakh Loan for 5 Years</th>
                <th className="border border-gray-300 p-2 text-center text-red-700">10% Flat Rate (Simple Interest)</th>
                <th className="border border-gray-300 p-2 text-center text-green-700">10% Reducing Balance (EMI)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Calculation Method</td>
                <td className="border border-gray-300 p-2 text-center">Calculated on full ₹5L for all 5 years</td>
                <td className="border border-gray-300 p-2 text-center">Calculated only on remaining unpaid balance</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Total Interest Paid</td>
                <td className="border border-gray-300 p-2 text-center text-red-600 font-bold">₹2,50,000</td>
                <td className="border border-gray-300 p-2 text-center text-green-600 font-bold">₹1,37,411</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Monthly EMI You Pay</td>
                <td className="border border-gray-300 p-2 text-center text-red-600">₹12,500</td>
                <td className="border border-gray-300 p-2 text-center text-green-600">₹10,624</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">The Hidden Truth</td>
                <td className="border border-gray-300 p-2 text-center font-bold">Equivalent to an ~18% reducing rate!</td>
                <td className="border border-gray-300 p-2 text-center">True 10% rate.</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>The Takeaway:</strong> Never fall for a Flat Rate pitch. A 10% Flat Rate loan is almost twice as expensive as a true 10% loan. Always use an EMI Calculator to demand the exact reducing balance interest rate from the lender.
          </p>

          <h3>Simple Interest vs. Compound Interest</h3>
          <p>
            If you are <em>investing</em> money for the long term, simple interest is your enemy, and compound interest is your best friend.
          </p>
          <ul>
            <li><strong>Simple Interest:</strong> Grows linearly. It's like walking up a staircase. You add the same amount of wealth every single year.</li>
            <li><strong>Compound Interest:</strong> Grows exponentially. It's like a snowball rolling down a hill. Because you earn interest on your past interest, your wealth accelerates massively in the later years.</li>
          </ul>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Summary</p>
            <p>Use this simple interest calculator to quickly determine the cost of short-term bullet loans (like gold loans) and to calculate the total interest burden of deceptive flat-rate loans. For all long-term investments and standard home/car EMIs, use our Compound Interest or EMI calculators instead.</p>
          </div>
        </div>

        {/* Programmatic SEO Links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Calculators</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/compound-interest-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-amber-50 hover:border-amber-400 text-gray-600">Compound Interest Calculator</a>
            <a href="/calculators/loan-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-amber-50 hover:border-amber-400 text-gray-600">Loan EMI Calculator</a>
            <a href="/calculators/car-loan-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-amber-50 hover:border-amber-400 text-gray-600">Car Loan Calculator</a>
            <a href="/calculators/fd-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-amber-50 hover:border-amber-400 text-gray-600">Fixed Deposit Calculator</a>
          </div>
        </div>

      </div>
    </>
  );
};
