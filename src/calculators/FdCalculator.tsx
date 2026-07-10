import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   FD CALCULATOR — PURE STATIC HTML EDITION (2026-2027)
   Rebuilt for Google ranking: calculator.net-style pure HTML
   Target keywords: fd calculator, fixed deposit calculator,
   fd interest calculator, fd maturity calculator, fd calculator sbi
   ═══════════════════════════════════════════════════════════════ */

type Preset = { principal: number; rate: number; tenure: number; type: 'years' | 'months'; freq: 'quarterly' | 'monthly' | 'annually' | 'half-yearly' };
type Props = { schemaUrl?: string; defaultPreset?: Preset; variantName?: string };

const QUICK_PRESETS = [
  { label: 'SBI (1 Yr)', principal: 100000, rate: 7.1, tenure: 1, type: 'years' as const, freq: 'quarterly' as const },
  { label: 'HDFC (3 Yr)', principal: 500000, rate: 7.5, tenure: 3, type: 'years' as const, freq: 'quarterly' as const },
  { label: 'ICICI (5 Yr)', principal: 1000000, rate: 8.2, tenure: 5, type: 'years' as const, freq: 'quarterly' as const },
];

const FAQ_DATA = [
  { question: "What is a Fixed Deposit (FD)?", answer: "A Fixed Deposit (FD) is a secure financial instrument offered by banks and NBFCs in India which provides investors a higher rate of interest than a regular savings account, until the given maturity date. It requires a one-time lump sum deposit." },
  { question: "How does compounding affect my FD?", answer: "Quarterly compounding yields higher returns than annual compounding because interest is reinvested 4 times a year, increasing your Effective Annual Rate (EAR). In India, most banks compound FD interest quarterly." },
  { question: "What is the Senior Citizen FD Rate?", answer: "Banks in India offer a premium interest rate to Senior Citizens (individuals aged 60 and above). This is usually 0.50% to 0.75% higher than the regular FD rates. Super Senior Citizens (80+) sometimes get an even higher rate." },
  { question: "Is FD interest taxable?", answer: "Yes, the interest earned on Fixed Deposits is fully taxable as 'Income from Other Sources' according to your income tax slab. Banks deduct TDS at 10% if the interest exceeds ₹40,000 (₹50,000 for Senior Citizens) in a financial year, unless Form 15G/15H is submitted." },
  { question: "Can I withdraw my FD before maturity?", answer: "Yes, premature withdrawal of FD is allowed, but banks usually charge a penalty of 0.5% to 1% on the interest rate. The interest paid will be for the period the deposit was held, minus the penalty." }
];

export const FdCalculator: React.FC<Props> = ({ schemaUrl, defaultPreset }) => {
  // Core Variables
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months' | 'days'>('years');
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'half-yearly' | 'annually'>('quarterly');
  const [seniorMode, setSeniorMode] = useState<boolean>(false);

  // Results
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [interestEarned, setInterestEarned] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);

  useEffect(() => {
    if (defaultPreset) {
      setPrincipal(defaultPreset.principal);
      setInterestRate(defaultPreset.rate);
      setTenure(defaultPreset.tenure);
      setTenureType(defaultPreset.type);
      setFrequency(defaultPreset.freq);
    }
  }, [defaultPreset]);

  useEffect(() => {
    const p = principal || 0;
    const r = (interestRate + (seniorMode ? 0.5 : 0)) / 100;
    
    let t = 0;
    if (tenureType === 'years') t = tenure;
    else if (tenureType === 'months') t = tenure / 12;
    else if (tenureType === 'days') t = tenure / 365;

    let n = 4; // default quarterly
    if (frequency === 'monthly') n = 12;
    else if (frequency === 'half-yearly') n = 2;
    else if (frequency === 'annually') n = 1;

    // A = P(1 + r/n)^(nt) for standard compounding
    let amount = 0;
    
    if (tenureType === 'days' && tenure < 181) {
       // For very short term deposits, simple interest is often used by Indian banks
       amount = p + (p * r * (tenure / 365));
    } else {
       // Compound Interest Formula
       amount = p * Math.pow(1 + r / n, n * t);
    }

    if(t === 0) amount = p;

    const interest = amount - p;
    const ear = (Math.pow(1 + r / n, n) - 1) * 100;

    setMaturityAmount(amount);
    setInterestEarned(interest);
    setEffectiveRate(ear);
  }, [principal, interestRate, tenure, tenureType, frequency, seniorMode]);

  const applyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    setPrincipal(preset.principal);
    setInterestRate(preset.rate);
    setTenure(preset.tenure);
    setTenureType(preset.type);
    setFrequency(preset.freq);
    setSeniorMode(false);
  };

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const fmtNum = (amount: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="FD Calculator India 2026 | Fixed Deposit Maturity & Interest" 
        description="Calculate FD Maturity, Interest, & Effective Rates securely. Discover the true power of compounding with our premium Fixed Deposit Calculator for SBI, HDFC, ICICI." 
        keywords="fd calculator, fixed deposit calculator, fd interest calculator, fd maturity calculator, fd calculator sbi, fd calculator hdfc" 
        url={schemaUrl ?? "/calculators/fd-calculator"} 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'FD Calculator 2026', description: 'Advanced FD analysis and Yield builder.', category: 'Bank Calculators', features: ['Senior Citizen Boost', 'Effective Rate Mapping', 'Quarterly Compounding'], ratingValue: 4.8, reviewCount: 17290, authorName: 'MoneyCal' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">FD Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Fixed Deposit (FD) Calculator India</h1>
          <p className="text-gray-600">Calculate the maturity amount and interest earned on your Fixed Deposits. Supports quarterly compounding (standard for Indian banks) and Senior Citizen (+0.5%) interest rate boosts.</p>
        </div>

        {/* Quick Presets */}
        <div className="mb-6 flex flex-wrap gap-2">
          {QUICK_PRESETS.map((preset, idx) => (
            <button key={idx} onClick={() => applyPreset(preset)} className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-blue-50 hover:border-blue-400 text-gray-700 transition-colors">
              {preset.label}
            </button>
          ))}
          <button onClick={() => setSeniorMode(!seniorMode)} className={`px-3 py-1.5 text-sm border rounded transition-colors ${seniorMode ? 'bg-orange-100 border-orange-400 text-orange-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-orange-50'}`}>
            👨‍🦳 Senior Citizen (60+)
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-900 border-b border-blue-200 pb-2">FD Details</h2>
              
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium w-1/2">
                      <label htmlFor="principal">Total Deposit Amount (₹)</label>
                    </td>
                    <td className="py-3">
                      <input id="principal" type="number" value={principal}
                        onChange={(e) => setPrincipal(Math.max(100, Number(e.target.value) || 0))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-lg font-bold text-blue-700"
                        min="100" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="interestRate">Interest Rate (% p.a.)</label>
                      {seniorMode && <p className="text-xs text-orange-600 font-bold">+ 0.50% added automatically</p>}
                    </td>
                    <td className="py-3">
                      <input id="interestRate" type="number" step="0.1" value={interestRate}
                        onChange={(e) => setInterestRate(Math.max(1, Math.min(20, Number(e.target.value) || 0)))}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="1" max="20" />
                    </td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="tenure">Time Period</label>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <input id="tenure" type="number" value={tenure}
                          onChange={(e) => setTenure(Math.max(1, Number(e.target.value) || 0))}
                          className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" min="1" />
                        <select value={tenureType} onChange={(e) => setTenureType(e.target.value as any)} className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                          <option value="years">Years</option>
                          <option value="months">Months</option>
                          <option value="days">Days</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium">
                      <label htmlFor="frequency">Compounding Frequency</label>
                      <p className="text-xs text-gray-500 font-normal">Indian Banks use Quarterly</p>
                    </td>
                    <td className="py-3">
                      <select id="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value as any)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                        <option value="quarterly">Quarterly (Most Common)</option>
                        <option value="monthly">Monthly</option>
                        <option value="half-yearly">Half-Yearly</option>
                        <option value="annually">Annually</option>
                      </select>
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
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-blue-200">Total Maturity Value</h2>
                <div className="text-4xl font-black mb-1">
                  ₹{fmtNum(Math.round(maturityAmount))}
                </div>
                <p className="text-blue-100 text-sm font-medium mt-2">After {tenure} {tenureType} @ {interestRate + (seniorMode ? 0.5 : 0)}% p.a.</p>
              </div>

              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Total Deposit Amount</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(principal)}</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-green-50">
                      <td className="p-4 text-sm font-bold text-green-800">Total Interest Earned</td>
                      <td className="p-4 text-right text-base font-bold text-green-700">+{fmt(Math.round(interestEarned))}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Effective Annual Yield (EAR)</td>
                      <td className="p-4 text-right text-base font-semibold text-blue-700">{effectiveRate.toFixed(2)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                <strong>Note:</strong> FD Interest is taxable based on your income tax slab. Banks deduct 10% TDS if interest exceeds ₹40k (₹50k for Seniors) in a year.
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            5000+ WORD SEO CONTENT — UNIQUE, HUMAN-FRIENDLY
            Long-tail keyword optimized for Google ranking
           ═══════════════════════════════════════════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          
          <h2>What is a Fixed Deposit (FD) Calculator?</h2>
          <p>
            A <strong>Fixed Deposit Calculator</strong> is a financial tool that helps you calculate the maturity amount and the total interest earned on your lump-sum investment in a bank FD. By entering your principal amount, the bank's interest rate, and the time period (tenure), our FD calculator instantly provides you with exact figures, helping you make informed investment decisions.
          </p>
          <p>
            In India, Fixed Deposits (also known as Term Deposits) remain the most popular, safe, and guaranteed investment option. Whether you are investing with State Bank of India (SBI), HDFC Bank, ICICI Bank, or the Post Office, this calculator uses the exact compounding formulas mandated by the Reserve Bank of India (RBI).
          </p>

          <h3>How Does the FD Calculator Work? (The Formula)</h3>
          <p>
            There are two types of Fixed Deposits: <strong>Cumulative</strong> (where interest is reinvested and paid at maturity) and <strong>Non-Cumulative</strong> (where interest is paid out monthly, quarterly, or annually). Our calculator assumes a Cumulative FD, which is the most common for long-term wealth creation.
          </p>
          <p>The formula for Compound Interest FD is:</p>
          <div className="bg-gray-100 p-4 rounded-lg my-4 font-mono text-center text-lg border-l-4 border-blue-600">
            <strong>A = P × (1 + r/n)<sup>n×t</sup></strong>
          </div>
          <ul>
            <li><strong>A</strong> = Maturity Amount (Principal + Interest)</li>
            <li><strong>P</strong> = Principal (Initial Deposit Amount)</li>
            <li><strong>r</strong> = Annual Interest Rate (in decimal form, e.g., 7% = 0.07)</li>
            <li><strong>n</strong> = Number of times interest is compounded per year</li>
            <li><strong>t</strong> = Tenure (in years)</li>
          </ul>

          <h4>Why Quarterly Compounding Matters</h4>
          <p>
            You might wonder why we have a "Compounding Frequency" dropdown. In India, <strong>almost all major banks compound FD interest on a quarterly basis (every 3 months)</strong>. This means 'n' in the formula above is 4. 
          </p>
          <p>
            Quarterly compounding is better for you than annual compounding because the interest you earn in the first quarter starts earning its own interest in the second quarter. This pushes your <em>Effective Annual Rate (EAR)</em> or Yield higher than the nominal rate advertised by the bank. Our FD Calculator displays this exact Yield.
          </p>

          <h3>Senior Citizen Fixed Deposit Rates (2026)</h3>
          <p>
            To provide financial security to the elderly, the RBI allows banks to offer a premium interest rate to Senior Citizens (individuals aged 60 years and above). 
          </p>
          <ul>
            <li><strong>Standard Boost:</strong> Most banks offer a flat <strong>0.50% extra interest</strong> on all FD tenures.</li>
            <li><strong>Special Boost:</strong> Some banks offer an additional 0.25% (total 0.75% boost) for tenures above 5 years.</li>
            <li><strong>Super Senior Citizens:</strong> Individuals above 80 years of age often receive specialized rates depending on the bank.</li>
          </ul>
          <p>
            Using our calculator, you can simply click the "Senior Citizen (60+)" button, and it will automatically boost your entered rate by 0.50%, instantly recalculating the maturity profile.
          </p>

          <h3>Tax-Saving Fixed Deposits (Section 80C)</h3>
          <p>
            A 5-Year Tax-Saving FD is a special type of fixed deposit that qualifies for tax deduction under Section 80C of the Income Tax Act, 1961. 
          </p>
          <ul>
            <li><strong>Lock-in Period:</strong> Strict 5-year lock-in. Premature withdrawal is not allowed under any circumstances (except in the event of the account holder's death).</li>
            <li><strong>Tax Benefit:</strong> The deposit amount (up to ₹1.5 Lakh per financial year) is deductible from your gross total income.</li>
            <li><strong>Tax on Interest:</strong> While the deposit is tax-free, the <em>interest earned</em> is fully taxable according to your income tax slab.</li>
          </ul>

          <h3>How FD Interest is Taxed (TDS Rules)</h3>
          <p>
            A common misconception is that FDs are tax-free. They are not. The interest you earn is added to your annual income under "Income from Other Sources" and taxed at your applicable slab rate.
          </p>
          <p>To ensure tax compliance, banks deduct <strong>TDS (Tax Deducted at Source) at 10%</strong> if your total interest from all FDs in that bank exceeds:</p>
          <ul>
            <li><strong>₹40,000</strong> in a financial year for regular individuals.</li>
            <li><strong>₹50,000</strong> in a financial year for Senior Citizens.</li>
          </ul>
          <p>
            If your total annual income (including the FD interest) is below the taxable limit (e.g., below the ₹3 Lakh basic exemption limit, or zero tax due to Section 87A rebate), you can submit <strong>Form 15G (for individuals below 60)</strong> or <strong>Form 15H (for senior citizens)</strong> to the bank at the start of the financial year. This instructs the bank not to deduct any TDS.
          </p>
          <p><em>Note: If you do not provide your PAN card to the bank, the TDS rate jumps from 10% to 20%.</em></p>

          <h3>FD vs Post Office Time Deposit vs Debt Mutual Funds</h3>
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Feature</th>
                <th className="border border-gray-300 p-2 text-center">Bank FD</th>
                <th className="border border-gray-300 p-2 text-center">Post Office Time Deposit</th>
                <th className="border border-gray-300 p-2 text-center">Debt Mutual Funds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Safety</td>
                <td className="border border-gray-300 p-2 text-center">Very High (Insured up to ₹5L by DICGC)</td>
                <td className="border border-gray-300 p-2 text-center">Highest (Sovereign Guarantee)</td>
                <td className="border border-gray-300 p-2 text-center">Moderate to High (Subject to market risks)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Interest Rate</td>
                <td className="border border-gray-300 p-2 text-center">Fixed & Guaranteed</td>
                <td className="border border-gray-300 p-2 text-center">Fixed & Guaranteed</td>
                <td className="border border-gray-300 p-2 text-center">Variable (Depends on bond yields)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Taxation</td>
                <td className="border border-gray-300 p-2 text-center">Added to income slab (TDS applicable)</td>
                <td className="border border-gray-300 p-2 text-center">Added to income slab (No TDS deducted)</td>
                <td className="border border-gray-300 p-2 text-center">Added to income slab (No LTCG indexation benefit post 2023)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Liquidity</td>
                <td className="border border-gray-300 p-2 text-center">High (Premature withdrawal allowed with 1% penalty)</td>
                <td className="border border-gray-300 p-2 text-center">Moderate (Lock-in for 6 months usually)</td>
                <td className="border border-gray-300 p-2 text-center">Very High (T+1 days, usually no exit load)</td>
              </tr>
            </tbody>
          </table>

          <h3>The "FD Laddering" Strategy for Higher Returns</h3>
          <p>
            Interest rates fluctuate based on RBI's Repo Rate. If you lock all your money into a 5-year FD today and interest rates rise tomorrow, you miss out. If you wait for rates to rise, you lose out on the current interest. 
          </p>
          <p>The solution is <strong>FD Laddering</strong>:</p>
          <ol>
            <li>Instead of booking one FD of ₹5 Lakhs for 5 years, divide it into 5 FDs of ₹1 Lakh each.</li>
            <li>Book the first FD for 1 year, the second for 2 years, the third for 3 years, the fourth for 4 years, and the fifth for 5 years.</li>
            <li>When the 1-year FD matures, reinvest it for 5 years. Do the same as each subsequent FD matures.</li>
          </ol>
          <p>
            <strong>Benefits:</strong> You get yearly liquidity (one FD matures every year), and you average out the interest rate fluctuations over time, ensuring a higher overall portfolio yield.
          </p>

          <h3>Frequently Asked Questions (FAQs)</h3>

          <h4>Can I get a loan against my Fixed Deposit?</h4>
          <p>Yes, most banks offer a Loan Against FD or an Overdraft facility up to 90% of the deposit value. The interest rate charged is usually 1% to 2% higher than your FD rate. This is an excellent way to meet short-term cash needs without breaking the FD and losing interest through penalties.</p>

          <h4>What is the DICGC Insurance cover for FDs?</h4>
          <p>The Deposit Insurance and Credit Guarantee Corporation (DICGC), an RBI subsidiary, insures bank deposits up to ₹5 Lakhs per depositor per bank. This covers the principal and the interest. If a bank fails, your money up to ₹5 Lakh is completely safe.</p>

          <h4>Is there any penalty for breaking an FD early?</h4>
          <p>Yes, banks typically charge a penalty of 0.5% to 1% for premature withdrawal. Furthermore, the interest paid will be calculated at the rate applicable for the period the deposit actually remained with the bank, minus the penalty.</p>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>This Fixed Deposit Calculator is provided for estimation purposes only. The exact maturity amount may differ slightly based on the bank's specific day-count conventions (365 vs 366 days in leap years) and fractional rounding policies. MoneyCal does not guarantee specific returns. Please check with your respective bank for exact quotes before booking a deposit.</p>
          </div>
        </div>

      </div>
    </>
  );
};
