import React, { useState, useEffect } from 'react';
import { Info, ExternalLink, TrendingUp, DollarSign, Calculator as CalcIcon, Sparkles } from 'lucide-react';
import WhyChooseUs from '../components/WhyChooseUs';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 sm:p-6 font-inter">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-5xl border-2 border-indigo-100 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
        
        {/* Header with Icon */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Compound Interest Calculator
          </h1>
          <p className="text-gray-600 text-lg">Watch your money grow with the power of compounding</p>
        </motion.div>
        {/* The main title of the page was here, now removed as per request */}

        {/* Calculator Inputs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gradient-to-br from-gray-50 to-indigo-50 p-8 rounded-2xl shadow-inner border border-indigo-100"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <label htmlFor="principal" className="text-sm font-bold text-gray-800 mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-indigo-600" />
              Initial Investment (Principal)
            </label>
            <input
              type="number"
              id="principal"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="mt-1 p-4 border-2 border-indigo-200 rounded-xl shadow-sm focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 block w-full transition-all duration-200 hover:border-indigo-300"
              placeholder="e.g., 10000"
              aria-label="Initial Investment"
            />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <label htmlFor="rate" className="text-sm font-bold text-gray-800 mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-1 p-4 border-2 border-green-200 rounded-xl shadow-sm focus:ring-4 focus:ring-green-300 focus:border-green-500 block w-full transition-all duration-200 hover:border-green-300"
              placeholder="e.g., 5"
              step="0.1"
              aria-label="Annual Interest Rate"
            />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <label htmlFor="time" className="text-sm font-bold text-gray-800 mb-2 flex items-center">
              <CalcIcon className="w-4 h-4 mr-1 text-purple-600" />
              Time Period (Years)
            </label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="mt-1 p-4 border-2 border-purple-200 rounded-xl shadow-sm focus:ring-4 focus:ring-purple-300 focus:border-purple-500 block w-full transition-all duration-200 hover:border-purple-300"
              placeholder="e.g., 10"
              aria-label="Time Period in Years"
            />
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
          >
            <label htmlFor="compoundingFrequency" className="text-sm font-bold text-gray-800 mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-pink-600" />
              Compounding Frequency
            </label>
            <select
              id="compoundingFrequency"
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
              className="mt-1 p-4 border-2 border-pink-200 rounded-xl shadow-sm focus:ring-4 focus:ring-pink-300 focus:border-pink-500 block w-full bg-white transition-all duration-200 hover:border-pink-300"
              aria-label="Compounding Frequency"
            >
              <option value={1}>Annually (1)</option>
              <option value={2}>Semi-Annually (2)</option>
              <option value={4}>Quarterly (4)</option>
              <option value={12}>Monthly (12)</option>
              <option value={365}>Daily (365)</option>
            </select>
          </motion.div>
        </motion.div>

        {/* Calculator Results */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 sm:p-10 rounded-2xl shadow-2xl text-center mb-8 relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          ></motion.div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 relative z-10">✨ Your Investment Growth</h2>
          <div className="flex flex-col sm:flex-row justify-around items-center gap-6 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white text-indigo-800 p-6 rounded-2xl shadow-lg flex-1 w-full sm:w-auto border-4 border-indigo-200"
            >
              <p className="text-sm font-bold text-indigo-600 mb-2">💰 Future Value</p>
              <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {formatCurrency(futureValue)}
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white text-green-800 p-6 rounded-2xl shadow-lg flex-1 w-full sm:w-auto border-4 border-green-200"
            >
              <p className="text-sm font-bold text-green-600 mb-2">📈 Interest Earned</p>
              <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {formatCurrency(totalInterest)}
              </p>
            </motion.div>
          </div>
        </motion.div>

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
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: How does compound interest differ from simple interest?</h3>
              <p>A: Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest. 
              Compare using our <a href="https://moneycal.in/calculators/simple-interest-calculator" className="underline text-blue-700">Simple Interest Calculator</a>.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Q: Which investments offer compound interest in India?</h3>
              <p>A: Fixed Deposits, PPF, NPS, Mutual Funds (SIP), and Bonds offer compound interest. 
              Explore our <a href="https://moneycal.in/calculators/ppf-calculator" className="underline text-blue-700">PPF Calculator</a> and 
              <a href="https://moneycal.in/calculators/sip-calculator" className="underline text-blue-700 ml-1">SIP Calculator</a> for specific investments.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Related Calculators */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Investment Calculators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://moneycal.in/calculators/sip-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-gray-900">SIP Calculator</div>
              <div className="text-sm text-gray-600">Calculate mutual fund SIP returns</div>
            </a>
            <a
              href="https://moneycal.in/calculators/ppf-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-gray-900">PPF Calculator</div>
              <div className="text-sm text-gray-600">Public Provident Fund calculator</div>
            </a>
            <a
              href="https://moneycal.in/calculators/nps-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="font-medium text-gray-900">NPS Calculator</div>
              <div className="text-sm text-gray-600">National Pension System returns</div>
            </a>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-10 pt-6 border-t border-gray-200">
          <p>&copy; {new Date().getFullYear()} Compound Interest Calculator. All rights reserved.</p>
          <p className="mt-2">Disclaimer: This calculator is for educational purposes only and should not be considered financial advice. Please consult with a financial professional for personalized guidance.</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default CompoundInterestCalculator;
