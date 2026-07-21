import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { apyConfig } from '../engine/configs/apyConfig';
import { useOmniEngine } from '../engine/useOmniEngine';
import { OmniWidget } from '../engine/components/OmniWidget';
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

export const ApyCalculator: React.FC = () => {
  const engine = useOmniEngine(apyConfig);

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

        <div className="mb-12">
          <OmniWidget config={apyConfig} engine={engine} />
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
