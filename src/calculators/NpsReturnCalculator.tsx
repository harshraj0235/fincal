import React, { useState, useMemo } from 'react';
import { IndianRupee, Info } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { formatCurrency } from '../utils/calculatorUtils';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    question: 'How is NPS maturity amount calculated?',
    answer:
      'NPS maturity is calculated using the future value of a recurring investment formula, considering monthly contributions, expected annual return, and investment duration.',
  },
  {
    question: 'What is the minimum contribution for NPS?',
    answer:
      'For Tier I, the minimum annual contribution is ₹1,000. For Tier II, there is no minimum annual contribution.',
  },
  {
    question: 'Are NPS returns guaranteed?',
    answer:
      'No, NPS returns are market-linked and depend on the performance of the chosen pension funds. Past performance does not guarantee future returns.',
  },
  {
    question: 'What are the tax benefits of NPS?',
    answer:
      'Tier I NPS contributions are eligible for tax deductions under Section 80CCD(1), 80CCD(1B), and 80CCD(2) of the Income Tax Act.',
  },
];

const INFO_PARAGRAPHS = [
  'The National Pension System (NPS) is a regulated, long-term retirement product in India. This NPS Return calculator estimates maturity value, total invested amount, and total gain for both Tier I and Tier II accounts so you can plan retirement with clarity.',
  'To use this calculator, enter your monthly contribution, investment duration, expected annual return, and account type. The tool instantly projects future corpus and helps you compare multiple scenarios before committing to a contribution plan.',
  'NPS Tier I usually focuses on retirement with tax benefits under Section 80CCD(1), 80CCD(1B), and 80CCD(2). Tier II is more flexible for withdrawals but typically does not carry the same tax profile. Always confirm latest tax rules before filing.',
  'A strong NPS strategy is scenario-based: run conservative, moderate, and optimistic return assumptions. This gives a range of possible outcomes and reduces the risk of overestimating retirement income.',
  'Long-tail users often search for "NPS tier 1 and tier 2 calculator with annuity" or "how much pension will I get from NPS". This page is designed to answer exactly that intent with transparent inputs and outputs.',
  'For complete retirement planning, combine NPS with EPF, PPF, and SIP tools. You can then map both guaranteed and market-linked components of your retirement corpus.',
];

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "NPS Return Calculator",
  "description":
    "Free online NPS Return calculator for India. Calculate your NPS maturity, total investment, and expected returns for Tier I and Tier II accounts.",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "provider": {
    "@type": "Organization",
    "name": "MoneyCal",
    "url": "https://moneycal.in",
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
  },
  "featureList": [
    "NPS maturity calculation",
    "Tier I & Tier II support",
    "Maturity, investment, gain breakdown",
    "Mobile responsive",
    "Free, no registration",
  ],
  "url": "https://moneycal.in/calculators/nps-return-calculator",
  "softwareVersion": "1.0",
};

function calculateNpsMaturity(P: number, r: number, n: number): number {
  // P: monthly contribution, r: annual rate (%), n: years
  const months = n * 12;
  const monthlyRate = r / 12 / 100;
  if (monthlyRate === 0) return P * months;
  return (
    P *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate)
  );
}

const defaultContribution = 5000;
const defaultYears = 25;
const defaultReturn = 10;
const defaultTier = 'Tier I';

const NpsReturnCalculator: React.FC = () => {
  const [contribution, setContribution] = useState<number>(defaultContribution);
  const [years, setYears] = useState<number>(defaultYears);
  const [expectedReturn, setExpectedReturn] = useState<number>(defaultReturn);
  const [tier, setTier] = useState<string>(defaultTier);

  const { maturity, totalInvested, totalGain } = useMemo(() => {
    const maturity = calculateNpsMaturity(contribution, expectedReturn, years);
    const totalInvested = contribution * 12 * years;
    const totalGain = maturity - totalInvested;
    return { maturity, totalInvested, totalGain };
  }, [contribution, expectedReturn, years]);

  const metaDescription =
    'NPS Return Calculator India - Estimate NPS maturity, total investment, and expected returns for Tier I and Tier II. Free, accurate, mobile-friendly.';
  const metaKeywords =
    'nps return calculator india, nps maturity calculator, nps tier 1 tier 2 calculator, national pension system return estimator, nps pension planning india';

  return (
    <>
      <SEOHelmet
        title="NPS Return Calculator India 2026 - Tier I & Tier II Maturity Estimator | MoneyCal"
        description={metaDescription}
        keywords={metaKeywords}
        url="/calculators/nps-return-calculator"
        image="/images/calculator-default.jpg"
        type="website"
        structuredData={SCHEMA_ORG}
        tags={['nps return calculator', 'india', 'moneycal']}
        alternateLanguages={{
          'en-IN': "https://moneycal.in/calculators/nps-return-calculator",
        }}
      />

      <article className="max-w-2xl mx-auto p-4">
        <header>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            NPS Return Calculator India
          </h1>
          <p className="text-neutral-700 mb-4">
            Calculate your National Pension System (NPS) maturity amount, total investment, and estimated returns. Supports Tier I and Tier II accounts, tailored for Indian investors.
          </p>
        </header>

        <form
          className="bg-white rounded-lg border border-neutral-200 p-6 mb-8 grid gap-4"
          itemScope
          itemType="https://schema.org/FinancialProduct"
          aria-label="NPS Return Calculator Form"
          onSubmit={e => e.preventDefault()}
        >
          <div>
            <label htmlFor="contribution" className="block text-sm font-medium text-neutral-700 mb-1">
              Monthly Contribution (₹)
            </label>
            <input
              id="contribution"
              name="contribution"
              type="number"
              min={500}
              step={100}
              value={contribution}
              onChange={e => setContribution(Number(e.target.value))}
              required
              className="input input-bordered w-full"
              autoComplete="off"
              inputMode="numeric"
            />
          </div>
          <div>
            <label htmlFor="years" className="block text-sm font-medium text-neutral-700 mb-1">
              Investment Duration (years)
            </label>
            <input
              id="years"
              name="years"
              type="number"
              min={1}
              max={40}
              step={1}
              value={years}
              onChange={e => setYears(Number(e.target.value))}
              required
              className="input input-bordered w-full"
              autoComplete="off"
              inputMode="numeric"
            />
          </div>
          <div>
            <label htmlFor="expectedReturn" className="block text-sm font-medium text-neutral-700 mb-1">
              Expected Annual Return (%)
            </label>
            <input
              id="expectedReturn"
              name="expectedReturn"
              type="number"
              min={4}
              max={15}
              step={0.1}
              value={expectedReturn}
              onChange={e => setExpectedReturn(Number(e.target.value))}
              required
              className="input input-bordered w-full"
              autoComplete="off"
              inputMode="decimal"
            />
          </div>
          <div>
            <label htmlFor="tier" className="block text-sm font-medium text-neutral-700 mb-1">
              NPS Account Type
            </label>
            <select
              id="tier"
              name="tier"
              value={tier}
              onChange={e => setTier(e.target.value)}
              className="input input-bordered w-full"
            >
              <option value="Tier I">Tier I</option>
              <option value="Tier II">Tier II</option>
            </select>
          </div>
        </form>

        <section className="bg-[--primary-50] border border-[--primary-200] rounded-lg p-6 mb-8" aria-label="NPS Results">
          <h2 className="text-lg font-semibold text-[--primary-900] mb-4 flex items-center">
            <IndianRupee className="w-5 h-5 mr-2 text-[--primary-600]" />
            Results
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <dt className="text-sm text-neutral-500 mb-1">Maturity Amount</dt>
              <dd className="text-xl font-bold text-neutral-900" itemProp="maturityAmount">
                {formatCurrency(maturity)}
              </dd>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <dt className="text-sm text-neutral-500 mb-1">Total Invested</dt>
              <dd className="text-xl font-bold text-blue-700" itemProp="totalInvested">
                {formatCurrency(totalInvested)}
              </dd>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <dt className="text-sm text-neutral-500 mb-1">Total Gain</dt>
              <dd className="text-xl font-bold text-green-700" itemProp="totalGain">
                {formatCurrency(totalGain)}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-8" aria-label="About this Calculator">
          <div className="bg-[--primary-50] border border-[--primary-200] rounded-lg p-6 flex items-start">
            <Info className="h-5 w-5 text-[--primary-600] mt-0.5" />
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-[--primary-900] mb-2">About NPS Return Calculator</h2>
              <div className="text-[--primary-800] space-y-2">
                {INFO_PARAGRAPHS.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
                <p className="mb-2">
                  For more details, read our guide on{' '}
                  <a href="/blog/nps-benefits-india" className="text-blue-600 underline">
                    NPS benefits and rules in India
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8" aria-label="NPS Planning Guide">
          <div className="bg-white border border-neutral-200 rounded-lg p-6 space-y-3">
            <h2 className="text-2xl font-bold text-neutral-900">NPS Return Calculator India: complete planning guide</h2>
            <p className="text-neutral-700">
              The best way to use an NPS calculator is to think in retirement outcomes, not just maturity value. Start by choosing a target age, expected retirement
              lifestyle, and desired monthly pension. Then back-calculate required corpus and monthly contributions. This is especially useful for users comparing long-tail
              intents like "NPS maturity calculator with annuity" and "NPS monthly pension estimator India".
            </p>
            <p className="text-neutral-700">
              Tier I generally serves retirement goals with restricted withdrawal and tax advantages, while Tier II is used for flexibility and tactical allocation.
              In retirement design, Tier I can be your core pension bucket and Tier II can be an optional liquid support bucket. Keep assumptions realistic: use one
              conservative run and one moderate run to avoid over-optimistic pension projections.
            </p>
            <p className="text-neutral-700">
              For a complete framework, combine this page with{' '}
              <Link to="/calculators/pension-calculator" className="underline">Pension Calculator</Link>,{' '}
              <Link to="/calculators/epf-calculator" className="underline">EPF Calculator</Link>, and{' '}
              <Link to="/calculators/retirement-calculator" className="underline">Retirement Calculator</Link>. For official references, review{' '}
              <a href="https://www.pfrda.org.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">PFRDA</a> and{' '}
              <a href="https://npstrust.org.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">NPS Trust</a>.
            </p>
          </div>
        </section>

        <section className="mb-8" aria-label="Frequently Asked Questions">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group bg-white border border-neutral-200 rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer py-4 px-6">
                  <h3 className="text-lg font-medium text-neutral-900">{faq.question}</h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-4 text-neutral-600">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/calculators/retirement-calculator" className="block p-4 bg-white rounded border hover:shadow">
              <strong>Retirement Calculator</strong>
              <p className="text-sm text-neutral-600">Estimate your retirement corpus in India.</p>
            </Link>
            <Link to="/calculators/pension-calculator" className="block p-4 bg-white rounded border hover:shadow">
              <strong>Pension Calculator</strong>
              <p className="text-sm text-neutral-600">Calculate expected pension after retirement.</p>
            </Link>
            <Link to="/calculators/ppf-calculator" className="block p-4 bg-white rounded border hover:shadow">
              <strong>PPF Calculator</strong>
              <p className="text-sm text-neutral-600">Estimate returns from a Public Provident Fund.</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};

export default NpsReturnCalculator;
