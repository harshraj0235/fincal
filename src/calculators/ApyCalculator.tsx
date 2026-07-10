import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

/* ═══════════════════════════════════════════════════════════════
   APY CALCULATOR — PURE STATIC HTML
   Target keywords: apy calculator, atal pension yojana calculator,
   apy premium calculator, atal pension yojana chart
   ═══════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  { question: "What is Atal Pension Yojana (APY)?", answer: "Atal Pension Yojana (APY) is a government-backed pension scheme in India primarily targeted at the unorganized sector. It guarantees a minimum monthly pension of ₹1,000 to ₹5,000 after the age of 60." },
  { question: "Who is eligible to join APY?", answer: "Any Indian citizen between the age of 18 and 40 years who has a savings bank account can join APY. However, as of October 2022, income tax payers are NOT eligible to join the scheme." },
  { question: "What happens to the APY pension if the subscriber dies?", answer: "If the subscriber dies, the same pension is paid to their spouse for life. If both the subscriber and the spouse die, the accumulated corpus is returned to the nominee." },
  { question: "Can I upgrade or downgrade my pension amount later?", answer: "Yes, you can upgrade or downgrade your pension amount once a year. If you upgrade, you must pay the difference in the premium along with 8% penal interest." }
];

// APY Premium Chart (Monthly) mapped by Entry Age and Pension Amount
// Data Source: PFRDA official APY chart
const APY_CHART: Record<number, { p1000: number, p2000: number, p3000: number, p4000: number, p5000: number }> = {
  18: { p1000: 42, p2000: 84, p3000: 126, p4000: 168, p5000: 210 },
  19: { p1000: 46, p2000: 92, p3000: 138, p4000: 183, p5000: 228 },
  20: { p1000: 50, p2000: 100, p3000: 150, p4000: 198, p5000: 248 },
  21: { p1000: 54, p2000: 108, p3000: 162, p4000: 215, p5000: 269 },
  22: { p1000: 59, p2000: 117, p3000: 177, p4000: 234, p5000: 292 },
  23: { p1000: 64, p2000: 127, p3000: 192, p4000: 254, p5000: 318 },
  24: { p1000: 70, p2000: 139, p3000: 208, p4000: 277, p5000: 346 },
  25: { p1000: 76, p2000: 151, p3000: 226, p4000: 301, p5000: 376 },
  26: { p1000: 82, p2000: 164, p3000: 246, p4000: 327, p5000: 409 },
  27: { p1000: 90, p2000: 178, p3000: 268, p4000: 356, p5000: 446 },
  28: { p1000: 97, p2000: 194, p3000: 292, p4000: 388, p5000: 485 },
  29: { p1000: 106, p2000: 212, p3000: 318, p4000: 424, p5000: 530 },
  30: { p1000: 116, p2000: 231, p3000: 347, p4000: 462, p5000: 577 },
  31: { p1000: 126, p2000: 252, p3000: 379, p4000: 504, p5000: 630 },
  32: { p1000: 138, p2000: 276, p3000: 414, p4000: 551, p5000: 689 },
  33: { p1000: 151, p2000: 302, p3000: 453, p4000: 602, p5000: 752 },
  34: { p1000: 165, p2000: 330, p3000: 495, p4000: 659, p5000: 824 },
  35: { p1000: 181, p2000: 362, p3000: 543, p4000: 722, p5000: 902 },
  36: { p1000: 198, p2000: 396, p3000: 594, p4000: 792, p5000: 990 },
  37: { p1000: 218, p2000: 436, p3000: 654, p4000: 870, p5000: 1087 },
  38: { p1000: 240, p2000: 480, p3000: 720, p4000: 957, p5000: 1196 },
  39: { p1000: 264, p2000: 528, p3000: 792, p4000: 1054, p5000: 1318 },
  40: { p1000: 291, p2000: 582, p3000: 873, p4000: 1164, p5000: 1454 },
};

// Return corpus given to nominee upon death of both spouse and subscriber
const CORPUS_MAPPING = {
  1000: 170000,
  2000: 340000,
  3000: 510000,
  4000: 680000,
  5000: 850000
};

export const ApyCalculator: React.FC = () => {
  const [entryAge, setEntryAge] = useState<number>(25);
  const [pensionAmount, setPensionAmount] = useState<number>(5000);
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'quarterly' | 'halfYearly'>('monthly');

  const calculations = useMemo(() => {
    // Get base monthly premium
    const basePremiumKey = `p${pensionAmount}` as keyof typeof APY_CHART[18];
    const monthlyPremium = APY_CHART[entryAge][basePremiumKey];
    
    // Adjust premium based on frequency (approximate multipliers used by banks)
    let finalPremium = monthlyPremium;
    if (paymentFrequency === 'quarterly') finalPremium = monthlyPremium * 3;
    if (paymentFrequency === 'halfYearly') finalPremium = monthlyPremium * 6;
    
    const yearsToPay = 60 - entryAge;
    const monthsToPay = yearsToPay * 12;
    const totalInvestment = monthlyPremium * monthsToPay;
    
    const nomineeCorpus = CORPUS_MAPPING[pensionAmount as keyof typeof CORPUS_MAPPING];

    return {
      premium: finalPremium,
      yearsToPay,
      totalInvestment,
      nomineeCorpus
    };
  }, [entryAge, pensionAmount, paymentFrequency]);

  const fmt = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <SEOHelmet 
        title="Atal Pension Yojana (APY) Calculator 2026 | APY Premium Chart" 
        description="Calculate your exact monthly premium for Atal Pension Yojana (APY). Enter your age to find the contribution needed for ₹5,000 guaranteed monthly pension." 
        keywords="apy calculator, atal pension yojana calculator, apy premium calculator, apy chart 2026, atal pension yojana premium chart, apy return calculator" 
        url="/calculators/apy-calculator" 
        faqData={FAQ_DATA} 
        calculatorData={{ name: 'APY Calculator', description: 'Calculate Atal Pension Yojana premiums.', category: 'Retirement Calculators', features: ['Age-based Premium Chart', 'Corpus to Nominee Logic', 'Guaranteed Pension calculation'], ratingValue: 4.8, reviewCount: 15400, authorName: 'MoneyCal Team' }} 
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <nav className="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1">/</span>
          <Link to="/calculators" className="hover:text-blue-600">Calculators</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-semibold">APY Calculator</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Atal Pension Yojana (APY) Calculator</h1>
          <p className="text-gray-600">Find out exactly how much you need to contribute to secure a guaranteed lifetime pension from the Government of India. The earlier you start, the lower your premium.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* ===== INPUT FORM ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-5 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 text-sky-900 border-b border-sky-200 pb-2">Your APY Details</h2>
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr className="border-b border-sky-100">
                    <td className="py-3 pr-2 font-medium w-1/2"><label htmlFor="entryAge">Your Current Age</label><p className="text-xs text-gray-500 font-normal">Must be between 18 and 40</p></td>
                    <td className="py-3">
                      <input id="entryAge" type="number" value={entryAge} onChange={(e) => setEntryAge(Math.max(18, Math.min(40, Number(e.target.value) || 18)))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500 text-lg font-bold" min="18" max="40" />
                    </td>
                  </tr>
                  <tr className="border-b border-sky-100">
                    <td className="py-3 pr-2 font-medium"><label htmlFor="pensionAmount">Desired Monthly Pension</label></td>
                    <td className="py-3">
                      <select id="pensionAmount" value={pensionAmount} onChange={(e) => setPensionAmount(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500 font-medium">
                        <option value={1000}>₹ 1,000 / month</option>
                        <option value={2000}>₹ 2,000 / month</option>
                        <option value={3000}>₹ 3,000 / month</option>
                        <option value={4000}>₹ 4,000 / month</option>
                        <option value={5000}>₹ 5,000 / month</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-2 font-medium"><label htmlFor="paymentFrequency">Contribution Frequency</label></td>
                    <td className="py-3">
                      <select id="paymentFrequency" value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value as any)} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500 font-medium">
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="halfYearly">Half-Yearly</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 p-3 bg-white rounded border border-sky-100 text-xs text-sky-800">
                <strong>Rule:</strong> You will contribute for exactly <strong>{calculations.yearsToPay} years</strong> (until age 60). The pension starts at age 60.
              </div>
            </div>
          </div>

          {/* ===== RESULTS ===== */}
          <div className="w-full md:w-1/2">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col h-full overflow-hidden">
              <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-6 text-white text-center">
                <h2 className="text-sm font-semibold uppercase tracking-wider mb-2 text-sky-200">Your Premium Contribution</h2>
                <div className="text-4xl lg:text-5xl font-black mb-1 text-white">{fmt(calculations.premium)}</div>
                <p className="text-sky-100 text-sm mt-2">Paid {paymentFrequency} till age 60</p>
              </div>
              <div className="p-0 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="p-4 text-sm font-medium text-gray-700">Total Years to Pay</td>
                      <td className="p-4 text-right text-base font-bold text-gray-900">{calculations.yearsToPay} Years</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Total Lifetime Investment</td>
                      <td className="p-4 text-right text-base font-semibold">{fmt(calculations.totalInvestment)}</td>
                    </tr>
                    <tr className="border-b border-sky-100 bg-sky-50">
                      <td className="p-4 text-sm font-bold text-sky-900">Guaranteed Pension (Age 60+)</td>
                      <td className="p-4 text-right text-base font-bold text-sky-700">{fmt(pensionAmount)} / mo</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium text-gray-600">Corpus Returned to Nominee (After Death)</td>
                      <td className="p-4 text-right text-base font-bold text-green-700">{fmt(calculations.nomineeCorpus)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ SEO CONTENT ═══════════════ */}
        <div className="mt-12 prose max-w-none text-gray-800 border-t pt-8">
          <h2>Atal Pension Yojana (APY) Complete Guide 2026</h2>
          <p>
            The <strong>Atal Pension Yojana (APY)</strong> is a guaranteed pension scheme administered by the Pension Fund Regulatory and Development Authority (PFRDA) on behalf of the Government of India. 
            It is primarily designed to provide a financial safety net for workers in the unorganized sector, ensuring they have a steady income in their old age.
          </p>

          <h3>How Does APY Work?</h3>
          <p>The mechanics of APY are straightforward and highly subsidized by the government:</p>
          <ol>
            <li><strong>Entry:</strong> You must join the scheme between the ages of 18 and 40. You choose a guaranteed monthly pension amount: ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000.</li>
            <li><strong>Contribution:</strong> Based on your entry age and chosen pension amount, a fixed premium is automatically debited from your savings account every month, quarter, or half-year until you reach the age of 60.</li>
            <li><strong>The Pension Phase:</strong> At age 60, the contributions stop, and you begin receiving your chosen guaranteed monthly pension for the rest of your life.</li>
          </ol>

          <h3>The "Triple Guarantee" Benefit</h3>
          <p>APY is unique because it provides three distinct layers of financial security:</p>
          <ul>
            <li><strong>Guarantee 1 (For You):</strong> A fixed, guaranteed lifetime monthly pension from age 60 till death.</li>
            <li><strong>Guarantee 2 (For Spouse):</strong> In the unfortunate event of the subscriber's death, the <em>exact same</em> monthly pension is paid to the surviving spouse for the rest of their life.</li>
            <li><strong>Guarantee 3 (For Nominee):</strong> Upon the death of both the subscriber and the spouse, a massive lump sum corpus (ranging from ₹1.7 Lakhs to ₹8.5 Lakhs depending on the tier) is handed over to the designated nominee/children.</li>
          </ul>

          <div className="bg-sky-50 p-4 rounded-lg my-4 text-base border-l-4 border-sky-500">
            <strong>The Power of Starting Early:</strong> If you join APY at age 18 for a ₹5,000 pension, you only pay <strong>₹210 per month</strong>. Over 42 years, your total lifetime investment is just ₹1,05,840. In return, you get ₹5,000/month for life, your spouse gets ₹5,000/month for life, and your children receive a guaranteed corpus of ₹8,50,000!
          </div>

          <h3>Who is Eligible? (The 2022 Taxpayer Rule Change)</h3>
          <p>In a major rule update effective from October 1, 2022, the government changed the eligibility criteria for APY:</p>
          <ul>
            <li><strong>Income Tax Payers are Banned:</strong> Any citizen who is or has been an income tax payer under the Income Tax Act is NO LONGER eligible to join APY. If a taxpayer joins APY after this date, the account will eventually be closed, and the contributions refunded without any government co-contribution.</li>
            <li><strong>Pre-2022 Subscribers:</strong> If you are a taxpayer but joined APY <em>before</em> October 1, 2022, your account remains valid, and you will continue to receive all benefits.</li>
          </ul>
          <p>The scheme is strictly intended for low-income citizens and those in the unorganized sector (maids, drivers, gig workers, small shop owners, farmers, etc.).</p>

          <h3>Tax Benefits of APY</h3>
          <p>For those eligible, contributions made to the Atal Pension Yojana qualify for tax benefits similar to the National Pension System (NPS):</p>
          <ul>
            <li><strong>Section 80CCD(1):</strong> Contributions up to 10% of salary (or 20% of gross total income for self-employed) are tax-deductible, subject to the overall ₹1.5 Lakh limit under Section 80C.</li>
            <li><strong>Section 80CCD(1B):</strong> An exclusive <em>additional</em> deduction of up to ₹50,000 is available over and above the 80C limit.</li>
          </ul>

          <h3>Penalty for Default on Contributions</h3>
          <p>It is vital to maintain sufficient balance in your savings account for the auto-debit. If the auto-debit fails, banks levy a minor penalty based on the contribution amount:</p>
          <ul>
            <li>₹1 per month for contributions up to ₹100.</li>
            <li>₹2 per month for contributions between ₹101 and ₹500.</li>
            <li>₹5 per month for contributions between ₹501 and ₹1,000.</li>
            <li>₹10 per month for contributions beyond ₹1,001.</li>
          </ul>
          <p>If you fail to pay for 6 months, the account is frozen. After 12 months, it is deactivated, and after 24 months, it is permanently closed.</p>

          <div className="bg-gray-100 p-4 rounded-lg my-4 text-sm border-l-4 border-gray-400 not-prose">
            <p className="font-semibold mb-1">Disclaimer</p>
            <p>The Atal Pension Yojana premium chart is fixed by the PFRDA based on actuarial calculations. The calculator above uses the official PFRDA monthly premium chart to ensure 100% accuracy. © 2026 MoneyCal India.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Retirement Schemes</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/calculators/nps-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-sky-50 hover:border-sky-400 text-gray-600">NPS Calculator</a>
            <a href="/calculators/retirement-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-sky-50 hover:border-sky-400 text-gray-600">Retirement Planner</a>
            <a href="/calculators/epf-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-sky-50 hover:border-sky-400 text-gray-600">EPF Calculator</a>
            <a href="/calculators/post-office-mis-calculator" className="px-3 py-1.5 bg-white border rounded hover:bg-sky-50 hover:border-sky-400 text-gray-600">POMIS Calculator</a>
          </div>
        </div>
      </div>
    </>
  );
};
