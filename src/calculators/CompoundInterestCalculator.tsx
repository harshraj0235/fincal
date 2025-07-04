import React, { useState, useEffect } from 'react';

export const CompoundInterestCalculator: React.FC = () => {
  // State variables for inputs
  const [principal, setPrincipal] = useState<number>(10000); // Initial investment
  const [rate, setRate] = useState<number>(5);           // Annual interest rate (%)
  const [time, setTime] = useState<number>(10);           // Time in years
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Compounding periods per year (e.g., 12 for monthly)

  // State variables for results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Function to calculate compound interest
  const calculateCompoundInterest = () => {
    // Convert rate from percentage to decimal
    const r = rate / 100;
    // Number of times interest is compounded per year (n)
    const n = compoundingFrequency;
    // Number of years the money is invested (t)
    const t = time;

    // Compound Interest Formula: A = P (1 + r/n)^(nt)
    // A = Future value
    // P = Principal
    const A = principal * Math.pow((1 + r / n), (n * t));

    // Calculate total interest earned
    const interest = A - principal;

    setFutureValue(A);
    setTotalInterest(interest);
  };

  // Recalculate whenever inputs change
  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, compoundingFrequency]);

  // Helper function for formatting currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', // Using Indian Rupee for example, can be changed
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4 sm:p-6 font-inter">
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-4xl border border-gray-200">
        {/* The main title of the page was here, now removed as per request */}

        {/* Calculator Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-100">
          <div className="flex flex-col">
            <label htmlFor="principal" className="text-sm font-medium text-gray-700 mb-2">
              Initial Investment (Principal)
            </label>
            <input
              type="number"
              id="principal"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full transition duration-150 ease-in-out"
              placeholder="e.g., 10000"
              aria-label="Initial Investment"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rate" className="text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full transition duration-150 ease-in-out"
              placeholder="e.g., 5"
              step="0.1"
              aria-label="Annual Interest Rate"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="time" className="text-sm font-medium text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full transition duration-150 ease-in-out"
              placeholder="e.g., 10"
              aria-label="Time Period in Years"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="compoundingFrequency" className="text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency (Times per Year)
            </label>
            <select
              id="compoundingFrequency"
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
              className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full bg-white transition duration-150 ease-in-out"
              aria-label="Compounding Frequency"
            >
              <option value={1}>Annually (1)</option>
              <option value={2}>Semi-Annually (2)</option>
              <option value={4}>Quarterly (4)</option>
              <option value={12}>Monthly (12)</option>
              <option value={365}>Daily (365)</option>
            </select>
          </div>
        </div>

        {/* Calculator Results */}
        <div className="bg-indigo-600 text-white p-6 sm:p-8 rounded-lg shadow-xl text-center mb-8"> {/* Added mb-8 for spacing before SEO content */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Investment Growth:</h2>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-8">
            <div className="bg-white text-indigo-800 p-4 rounded-lg shadow-md flex-1 w-full sm:w-auto">
              <p className="text-sm font-medium opacity-90 mb-1">Future Value</p>
              <p className="text-3xl sm:text-4xl font-extrabold">
                {formatCurrency(futureValue)}
              </p>
            </div>
            <div className="bg-white text-indigo-800 p-4 rounded-lg shadow-md flex-1 w-full sm:w-auto">
              <p className="text-sm font-medium opacity-90 mb-1">Total Interest Earned</p>
              <p className="text-3xl sm:text-4xl font-extrabold">
                {formatCurrency(totalInterest)}
              </p>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <section className="mb-8 text-gray-700 text-lg">
          <p className="mb-4">
            Welcome to our free online <strong className="font-semibold text-indigo-600">Compound Interest Calculator</strong>. This powerful tool helps you visualize how your investments can grow over time, thanks to the magic of <strong className="font-semibold text-purple-600">compounding</strong>. Whether you're planning for retirement, saving for a down payment, or just curious about financial growth, understanding compound interest is key to smart <strong className="font-semibold text-teal-600">financial planning</strong> and <strong className="font-semibold text-pink-600">wealth accumulation</strong>.
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">What is Compound Interest?</h2>
          <p className="mb-4">
            <strong className="font-semibold">Compound interest</strong> is interest on interest. It's the process where the interest you earn on your initial principal (the amount you invest) is reinvested, and then that reinvested interest also starts earning interest. This creates an accelerating growth effect, often described as the "eighth wonder of the world" by Albert Einstein. Unlike simple interest, which is calculated only on the principal amount, compound interest allows your money to grow exponentially over time.
          </p>
          <p className="mb-4">
            This calculator is an essential <strong className="font-semibold text-green-600">investment tool</strong> for anyone looking to understand the potential returns on their <strong className="font-semibold text-blue-600">savings</strong> or <strong className="font-semibold text-red-600">investment strategies</strong>.
          </p>
        </section>

        {/* More SEO Content & FAQs */}
        <section className="mt-8 text-gray-700 text-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">Why Use a Compound Interest Calculator?</h2>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong className="font-semibold">Financial Planning:</strong> Plan for long-term goals like retirement, education, or a down payment.</li>
            <li><strong className="font-semibold">Investment Analysis:</strong> Compare different investment scenarios by adjusting rates and timeframes.</li>
            <li><strong className="font-semibold">Savings Growth:</strong> See how consistent savings, even small amounts, can grow significantly over decades.</li>
            <li><strong className="font-semibold">Debt Management:</strong> Understand how compounding can work against you with loans, highlighting the importance of paying off high-interest debt.</li>
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">How to Use This Calculator</h2>
          <p className="mb-4">
            Simply input your desired values into the fields above:
          </p>
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong className="font-semibold">Initial Investment (Principal):</strong> The starting amount you invest.</li>
            <li><strong className="font-semibold">Annual Interest Rate (%):</strong> The percentage rate your investment will earn annually.</li>
            <li><strong className="font-semibold">Time Period (Years):</strong> How many years you plan to keep your money invested.</li>
            <li><strong className="font-semibold">Compounding Frequency:</strong> How often the interest is added to your principal (e.g., monthly, quarterly, annually).</li>
          </ul>
          <p className="mb-4">
            Our calculator will instantly display the <strong className="font-semibold text-purple-600">future value</strong> of your investment and the <strong className="font-semibold text-indigo-600">total interest earned</strong>, giving you a clear picture of your potential returns.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 mt-6">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: How does compounding frequency affect my returns?</h3>
              <p>A: The more frequently your interest compounds (e.g., daily vs. annually), the faster your money will grow, as interest is added and starts earning interest more often. This is a crucial factor in maximizing your <strong className="font-semibold">investment growth</strong>.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: Is this calculator suitable for mortgage or loan calculations?</h3>
              <p>A: While the principle of compounding applies to loans, this calculator is primarily designed for investment growth. Loan interest calculations often involve different amortization schedules and fees. For specific loan calculations, a dedicated <strong className="font-semibold">loan calculator</strong> would be more appropriate.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: What is a good interest rate for compound interest?</h3>
              <p>A: A "good" interest rate depends on the type of investment and associated risks. High-yield savings accounts might offer 4-5%, while stock market investments could average 7-10% historically, but with higher volatility. Always consider your risk tolerance and <strong className="font-semibold">financial goals</strong> when evaluating rates.</p>
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm mt-10 pt-6 border-t border-gray-200">
          <p>&copy; {new Date().getFullYear()} Compound Interest Calculator. All rights reserved.</p>
          <p className="mt-2">Disclaimer: This calculator is for educational purposes only and should not be considered financial advice. Please consult with a financial professional for personalized guidance.</p>
        </footer>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
