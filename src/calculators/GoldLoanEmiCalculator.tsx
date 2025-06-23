import React, { useState, useMemo } from 'react';
import { Calculator, Info } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { formatCurrency } from '../utils/calculatorUtils';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    question: 'How is Gold Loan EMI calculated?',
    answer: 'Gold Loan EMI is calculated using the principal amount, interest rate, and tenure. The formula used is the standard loan amortization formula, ensuring equal monthly payments throughout the tenure.',
  },
  {
    question: 'What is the typical tenure for a gold loan in India?',
    answer: 'Most gold loan tenures in India range from 3 months to 36 months. Some lenders may allow up to 48 or 60 months.',
  },
  {
    question: 'Is there any processing fee on gold loans?',
    answer: 'Many banks and NBFCs charge a processing fee, usually a small percentage of the loan amount. It varies by lender.',
  },
];

const INFO_PARAGRAPHS = [
  'A Gold Loan EMI Calculator helps you estimate your monthly repayments, total interest, and total payment for your gold loan. Enter the loan amount (based on the value of your gold), interest rate, and desired tenure.',
  'Gold loan interest rates and terms may vary based on your lender, gold purity, and loan-to-value ratio. Always check with the lender for the latest rates and policies.',
];

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Gold Loan EMI Calculator",
  "description": "Free online Gold Loan EMI Calculator for India. Calculate your gold loan EMI, total interest, and repayment schedule instantly. Mobile-friendly and accurate.",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "provider": {
    "@type": "Organization",
    "name": "FinanceGurus Directory",
    "url": "https://financegurus.directory"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "featureList": [
    "Gold Loan EMI calculation",
    "Indian gold loan rates",
    "EMI, interest, repayment schedule",
    "Mobile responsive",
    "Free, no registration"
  ],
  "url": "https://financegurus.directory/calculators/gold-loan-emi-calculator",
  "softwareVersion": "1.0"
};

const GoldLoanEmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(11);
  const [tenure, setTenure] = useState<number>(12);

  const { emi, totalPayment, totalInterest } = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const n = tenure;
    let emi = 0;
    if (monthlyRate > 0 && n > 0) {
      emi =
        principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, n) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;
    return {
      emi: emi || 0,
      totalPayment: totalPayment || 0,
      totalInterest: totalInterest || 0,
    };
  }, [loanAmount, interestRate, tenure]);

  const metaDescription =
    'Gold Loan EMI Calculator (India) - Instantly calculate your gold loan EMI, total interest, and repayment schedule. Free, mobile-friendly, and accurate.';

  const metaKeywords =
    'gold loan emi calculator, gold loan calculator india, emi calculator, gold loan interest, monthly installment, gold loan repayment, financegurus';

  return (
    <>
      <SEOHelmet
        title="Gold Loan EMI Calculator (India) – Free, Accurate, Online | FinanceGurus"
        description={metaDescription}
        keywords={metaKeywords}
        url="/calculators/gold-loan-emi-calculator"
        image="/images/calculator-default.jpg"
        type="website"
        structuredData={SCHEMA_ORG}
        tags={['gold loan emi calculator', 'india', 'financegurus']}
        alternateLanguages={{
          'en-IN': "https://financegurus.directory/calculators/gold-loan-emi-calculator",
          'hi-IN': "https://financegurus.directory/hi/calculators/gold-loan-emi-calculator"
        }}
      />

      <article className="max-w-2xl mx-auto p-4">
        <header>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Gold Loan EMI Calculator
          </h1>
          <p className="text-neutral-700 mb-4">
            Instantly estimate your monthly EMI, total interest, and total payment for your gold loan in India. Enter your loan details below.
          </p>
        </header>

        <form
          className="bg-white rounded-lg border border-neutral-200 p-6 mb-8 grid gap-4"
          itemScope
          itemType="https://schema.org/FinancialProduct"
          aria-label="Gold Loan EMI Calculator Form"
        >
          <div>
            <label htmlFor="loan-amount" className="block text-sm font-medium text-neutral-700 mb-1">
              Loan Amount (₹)
            </label>
            <input
              id="loan-amount"
              name="loan-amount"
              type="number"
              min="5000"
              max="5000000"
              step="500"
              value={loanAmount}
              onChange={e => setLoanAmount(Number(e.target.value))}
              required
              className="input"
              autoComplete="off"
              inputMode="numeric"
            />
          </div>

          <div>
            <label htmlFor="interest-rate" className="block text-sm font-medium text-neutral-700 mb-1">
              Interest Rate (% per annum)
            </label>
            <input
              id="interest-rate"
              name="interest-rate"
              type="number"
              min="6"
              max="36"
              step="0.1"
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              required
              className="input"
              autoComplete="off"
              inputMode="decimal"
            />
          </div>

          <div>
            <label htmlFor="tenure" className="block text-sm font-medium text-neutral-700 mb-1">
              Tenure (months)
            </label>
            <input
              id="tenure"
              name="tenure"
              type="number"
              min="1"
              max="60"
              step="1"
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              required
              className="input"
              autoComplete="off"
              inputMode="numeric"
            />
          </div>
        </form>

        <section className="bg-[--primary-50] border border-[--primary-200] rounded-lg p-6 mb-8" aria-label="Gold Loan EMI Results">
          <h2 className="text-lg font-semibold text-[--primary-900] mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-[--primary-600]" />
            EMI Results
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <dt className="text-sm text-neutral-500 mb-1">Monthly EMI</dt>
              <dd className="text-xl font-bold text-neutral-900">{formatCurrency(emi)}</dd>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <dt className="text-sm text-neutral-500 mb-1">Total Interest</dt>
              <dd className="text-xl font-bold text-[--error-600]">{formatCurrency(totalInterest)}</dd>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <dt className="text-sm text-neutral-500 mb-1">Total Payment</dt>
              <dd className="text-xl font-bold text-[--primary-600]">{formatCurrency(totalPayment)}</dd>
            </div>
          </dl>
        </section>

        <section className="mb-8" aria-label="About this Calculator">
          <div className="bg-[--primary-50] border border-[--primary-200] rounded-lg p-6 flex items-start">
            <Info className="h-5 w-5 text-[--primary-600] mt-0.5" />
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-[--primary-900] mb-2">About Gold Loan EMI Calculator</h2>
              <div className="text-[--primary-800] space-y-2">
                {INFO_PARAGRAPHS.map((text, i) => (<p key={i}>{text}</p>))}
              </div>
            </div>
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
                    <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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
            <Link to="/calculators/emi-calculator" className="block p-4 bg-white rounded border hover:shadow">
              <strong>Personal Loan EMI Calculator</strong>
              <p className="text-sm text-neutral-600">Calculate EMI for personal loans in India.</p>
            </Link>
            <Link to="/calculators/home-loan-calculator" className="block p-4 bg-white rounded border hover:shadow">
              <strong>Home Loan EMI Calculator</strong>
              <p className="text-sm text-neutral-600">Estimate home loan EMIs and repayment.</p>
            </Link>
            <Link to="/calculators/business-loan-calculator" className="block p-4 bg-white rounded border hover:shadow">
              <strong>Business Loan EMI Calculator</strong>
              <p className="text-sm text-neutral-600">Plan your business loan repayments.</p>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
};

export default GoldLoanEmiCalculator;
