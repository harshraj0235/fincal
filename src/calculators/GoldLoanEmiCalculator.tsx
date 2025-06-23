import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

// Category tag for internal linking/SEO
const CATEGORY = 'Loans';

const defaultInterest = 10.5;
const defaultTenure = 12;
const defaultGoldValue = 50000;
const defaultLoanAmount = 200000;

function calculateEMI(P: number, r: number, n: number) {
  const monthlyRate = r / 12 / 100;
  return (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
}

const GoldLoanEmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
  const [interestRate, setInterestRate] = useState(defaultInterest);
  const [tenure, setTenure] = useState(defaultTenure);
  const [goldValue, setGoldValue] = useState(defaultGoldValue);
  const [goldWeight, setGoldWeight] = useState(20);
  const [goldPurity, setGoldPurity] = useState(22);

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;
  const maxEligibleLoan = goldWeight * goldValue * (goldPurity / 24) * 0.75;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6">
      <Helmet>
        <title>Gold Loan EMI Calculator India – Calculate Gold Loan Repayment Online</title>
        <meta name="description" content="Instantly calculate your gold loan EMI, interest, and repayment schedule. Use our Gold Loan EMI Calculator tailored for India. Fast, accurate, and free!" />
        <link rel="canonical" href="https://moneycal.in/calculators/gold-loan-emi-calculator" />
        <meta property="og:title" content="Gold Loan EMI Calculator India – Calculate Gold Loan Repayment Online" />
        <meta property="og:description" content="Instantly calculate your gold loan EMI, interest, and repayment schedule. Use our Gold Loan EMI Calculator tailored for India. Fast, accurate, and free!" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-2">Gold Loan EMI Calculator India</h1>
      <p className="mb-4 text-gray-700">Calculate your gold loan EMI, interest, and repayment schedule instantly. Tailored for Indian users with local gold rates and purity options.</p>
      <form className="grid grid-cols-1 gap-4 mb-6">
        <label>
          Gold Weight (grams)
          <input type="number" min={1} value={goldWeight} onChange={e => setGoldWeight(Number(e.target.value))} className="input input-bordered w-full" />
        </label>
        <label>
          Gold Purity (carat)
          <select value={goldPurity} onChange={e => setGoldPurity(Number(e.target.value))} className="input input-bordered w-full">
            <option value={24}>24K</option>
            <option value={22}>22K</option>
            <option value={18}>18K</option>
          </select>
        </label>
        <label>
          Gold Value per Gram (₹)
          <input type="number" min={1000} value={goldValue} onChange={e => setGoldValue(Number(e.target.value))} className="input input-bordered w-full" />
        </label>
        <label>
          Loan Amount (₹) <span className="text-xs text-gray-500">(Max eligible: ₹{maxEligibleLoan.toLocaleString()})</span>
          <input type="number" min={1000} max={maxEligibleLoan} value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="input input-bordered w-full" />
        </label>
        <label>
          Interest Rate (% p.a.)
          <input type="number" min={5} max={30} step={0.1} value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="input input-bordered w-full" />
        </label>
        <label>
          Tenure (months)
          <input type="number" min={1} max={60} value={tenure} onChange={e => setTenure(Number(e.target.value))} className="input input-bordered w-full" />
        </label>
      </form>
      <div className="bg-gray-50 p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Results</h2>
        <p><strong>Monthly EMI:</strong> ₹{emi ? emi.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}</p>
        <p><strong>Total Interest Payable:</strong> ₹{totalInterest ? totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}</p>
        <p><strong>Total Payment (Principal + Interest):</strong> ₹{totalPayment ? totalPayment.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">About Gold Loan EMI Calculator</h2>
        <p className="mb-2">A gold loan is a secured loan where you pledge your gold ornaments as collateral to get quick funds. In India, gold loans are popular due to their fast processing, minimal documentation, and flexible repayment options. The <strong>Gold Loan EMI Calculator</strong> helps you estimate your monthly repayments, total interest, and overall cost, so you can plan your finances better.</p>
        <p className="mb-2">To use this calculator, enter the weight and purity of your gold, current gold value per gram, desired loan amount, interest rate, and tenure. The tool instantly shows your EMI and total repayment, making it easy to compare offers from different banks and NBFCs.</p>
        <p className="mb-2">Factors affecting your gold loan EMI include the loan amount, interest rate, tenure, and the value/purity of your gold. Most Indian lenders offer up to 75% of the gold's value as a loan. Always check the latest gold rates and compare interest rates before applying.</p>
        <p className="mb-2">Use this calculator to make informed decisions, avoid over-borrowing, and choose the best gold loan for your needs. For more tips, read our guide on <a href="/blog/how-to-choose-best-gold-loan" className="text-blue-600 underline">how to choose the best gold loan in India</a>.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions (FAQ)</h2>
        <details className="mb-2"><summary>How is gold loan EMI calculated?</summary><div className="pl-4">Gold loan EMI is calculated using the principal amount, interest rate, and tenure. The EMI formula is the same as other loans: <code>EMI = [P x r x (1+r)^n] / [(1+r)^n-1]</code>, where P = principal, r = monthly interest rate, n = number of months.</div></details>
        <details className="mb-2"><summary>What is the interest rate for gold loans in India?</summary><div className="pl-4">Interest rates for gold loans in India typically range from 7% to 24% p.a., depending on the lender, loan amount, and tenure.</div></details>
        <details className="mb-2"><summary>Can I prepay my gold loan?</summary><div className="pl-4">Yes, most lenders allow prepayment or foreclosure of gold loans, sometimes with minimal or no charges. Check with your lender for specific terms.</div></details>
        <details className="mb-2"><summary>How does gold purity affect my loan amount?</summary><div className="pl-4">Higher gold purity (e.g., 24K) increases the eligible loan amount, as lenders offer loans based on the value and purity of the pledged gold.</div></details>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold">Related Calculators</h3>
        <ul className="list-disc list-inside">
          <li><a href="/calculators/home-loan-emi-calculator" className="text-blue-600 underline">Home Loan EMI Calculator</a></li>
          <li><a href="/calculators/personal-loan-emi-calculator" className="text-blue-600 underline">Personal Loan EMI Calculator</a></li>
          <li><a href="/calculators/gold-investment-calculator" className="text-blue-600 underline">Gold Investment Calculator</a></li>
        </ul>
      </div>
      {/* FAQ Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How is gold loan EMI calculated?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Gold loan EMI is calculated using the principal amount, interest rate, and tenure. The EMI formula is the same as other loans: EMI = [P x r x (1+r)^n] / [(1+r)^n-1], where P = principal, r = monthly interest rate, n = number of months.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is the interest rate for gold loans in India?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Interest rates for gold loans in India typically range from 7% to 24% p.a., depending on the lender, loan amount, and tenure.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I prepay my gold loan?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, most lenders allow prepayment or foreclosure of gold loans, sometimes with minimal or no charges. Check with your lender for specific terms.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How does gold purity affect my loan amount?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Higher gold purity (e.g., 24K) increases the eligible loan amount, as lenders offer loans based on the value and purity of the pledged gold.'
              }
            }
          ]
        })}
      </script>
      {/* Category tag for SEO */}
      <meta name="category" content={CATEGORY} />
    </div>
  );
};

export default GoldLoanEmiCalculator; 