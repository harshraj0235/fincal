import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, TrendingUp, AlertCircle, DollarSign, Calendar } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const WhatIsEMI: React.FC = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(60);

  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const n = tenure;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - principal;

  return (
    <>
      <SEOHelmet
        title="What is EMI? How EMI Works, Formula & Calculator | MoneyCal Learn"
        description="Complete guide to EMI (Equated Monthly Installment) in India. Learn EMI meaning, formula, calculation with examples, how to reduce EMI, EMI vs income ratio, flat vs reducing balance."
        keywords="EMI, EMI meaning, EMI calculation, EMI formula, EMI calculator, how EMI works, equated monthly installment, EMI kya hai"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="what-is-emi"
        breadcrumb={['Learn', 'Loans & Credit', 'What Is EMI?']}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              What Is EMI?
            </h1>
            <p className="text-lg text-gray-600">
              EMI क्या है? - Understanding How It Works
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
              <span>📖 10 min read</span>
              <span>📊 Beginner</span>
              <span>🔄 Updated: Oct 21, 2025</span>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>EMI (Equated Monthly Installment)</strong> is a fixed payment you make to your lender every month 
              until you fully repay your loan. It includes both the principal amount and the interest.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Hindi में समझें:</strong> EMI (Equated Monthly Installment) यानी <strong>मासिक किस्त</strong> एक fixed amount है 
              जो आप हर महीने bank को pay करते हैं। इसमें आपकी मूल राशि (principal) और ब्याज (interest) दोनों शामिल होते हैं।
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether it's a home loan, car loan, or personal loan, EMI makes big purchases affordable by spreading 
              the cost over months or years.
            </p>
          </section>

          {/* Key Concept */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              EMI Formula
            </h3>
            <div className="bg-white p-6 rounded-lg">
              <div className="text-center mb-4">
                <p className="text-2xl font-mono font-bold text-blue-700 mb-2">
                  EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-900">P = Principal</p>
                  <p className="text-gray-600">Loan amount (मूल राशि)</p>
                  <p className="text-blue-700 font-bold">Example: ₹10,00,000</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-900">r = Monthly Rate</p>
                  <p className="text-gray-600">Annual rate / 12 / 100</p>
                  <p className="text-blue-700 font-bold">If 10% p.a. → 0.00833</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-900">n = Tenure</p>
                  <p className="text-gray-600">Months (महीनों में अवधि)</p>
                  <p className="text-blue-700 font-bold">5 years = 60 months</p>
                </div>
              </div>
            </div>
          </div>

          {/* How EMI Works */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Does EMI Work?</h2>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-purple-900 mb-3">EMI Components</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5" />
                        Principal Amount
                      </h4>
                      <p className="text-sm text-gray-700">
                        The actual loan amount that reduces your outstanding balance. 
                        <strong> This portion increases over time.</strong>
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                      <h4 className="font-semibold text-orange-800 flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5" />
                        Interest Amount
                      </h4>
                      <p className="text-sm text-gray-700">
                        The cost of borrowing money from the bank. 
                        <strong> This portion decreases over time.</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-purple-900 mb-3">EMI Over Time</h3>
                  <div className="bg-white p-4 rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-purple-100">
                        <tr>
                          <th className="p-2 text-left">Month</th>
                          <th className="p-2 text-right">Principal</th>
                          <th className="p-2 text-right">Interest</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="p-2">Month 1</td>
                          <td className="p-2 text-right text-green-700">₹4,000</td>
                          <td className="p-2 text-right text-orange-700">₹8,000</td>
                        </tr>
                        <tr>
                          <td className="p-2">Month 30</td>
                          <td className="p-2 text-right text-green-700">₹6,500</td>
                          <td className="p-2 text-right text-orange-700">₹5,500</td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="p-2 font-bold">Last Month</td>
                          <td className="p-2 text-right text-green-700 font-bold">₹11,800</td>
                          <td className="p-2 text-right text-orange-700 font-bold">₹200</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-xs text-gray-600 mt-2 italic">
                      * Principal increases, Interest decreases over time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step-by-Step Calculation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step EMI Calculation</h2>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
              <h3 className="font-bold text-green-900 mb-4 text-lg">Example: Rajesh's Car Loan</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">📋 Given Information</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>💵 <strong>Loan Amount (P):</strong> ₹10,00,000</li>
                    <li>📊 <strong>Interest Rate:</strong> 10% per annum</li>
                    <li>📅 <strong>Loan Tenure:</strong> 5 years (60 months)</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">🔢 Step-by-Step Calculation</h4>
                  <div className="space-y-2 text-sm text-gray-700 font-mono">
                    <p><strong>Step 1:</strong> P = 10,00,000</p>
                    <p><strong>Step 2:</strong> r = 10/12/100 = 0.00833</p>
                    <p><strong>Step 3:</strong> n = 5 × 12 = 60 months</p>
                    <p className="text-xs text-gray-600 mt-2">Now apply formula:</p>
                    <p className="text-xs">EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]</p>
                    <p className="text-xs">= [1000000 × 0.00833 × 1.645] / [0.645]</p>
                    <p className="text-lg font-bold text-green-700 mt-2">
                      EMI = ₹21,247
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white p-5 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">💳 Final Result</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Monthly EMI</p>
                    <p className="text-2xl font-bold text-green-700">₹21,247</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Total Amount Paid</p>
                    <p className="text-2xl font-bold text-blue-700">₹12,74,820</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-2xl font-bold text-orange-700">₹2,74,820</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Calculator */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Try It Yourself - EMI Calculator</h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loan Amount (Principal)
                    </label>
                    <input
                      type="range"
                      min="50000"
                      max="10000000"
                      step="50000"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-blue-700">₹{principal.toLocaleString('en-IN')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interest Rate (% per annum)
                    </label>
                    <input
                      type="range"
                      min="7"
                      max="24"
                      step="0.5"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-blue-700">{rate}%</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loan Tenure (months)
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="360"
                      step="12"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-lg font-bold text-blue-700">{tenure} months ({(tenure/12).toFixed(1)} years)</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Your EMI</h3>
                  <div className="space-y-4">
                    <div className="bg-green-100 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Monthly EMI</p>
                      <p className="text-3xl font-bold text-green-700">₹{emi.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Principal Amount:</span>
                        <span className="font-semibold">₹{principal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span>Total Interest:</span>
                        <span className="font-semibold text-orange-700">₹{totalInterest.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-blue-50 rounded">
                        <span className="font-bold">Total Amount:</span>
                        <span className="font-bold text-blue-700">₹{totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EMI vs Income Ratio */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ideal EMI to Income Ratio</h2>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Rule of Thumb:</strong> Your total EMI should not exceed <strong>40-50%</strong> of your monthly income.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                  <div className="text-3xl mb-2">✅</div>
                  <h4 className="font-bold text-green-800 mb-2">Safe Zone</h4>
                  <p className="text-sm text-gray-700">EMI ≤ 40% of income</p>
                  <p className="text-xs text-gray-600 mt-2">Comfortable financial life, room for savings & emergencies</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                  <div className="text-3xl mb-2">⚠️</div>
                  <h4 className="font-bold text-yellow-800 mb-2">Caution Zone</h4>
                  <p className="text-sm text-gray-700">EMI = 40-50% of income</p>
                  <p className="text-xs text-gray-600 mt-2">Manageable but tight, limited savings capacity</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                  <div className="text-3xl mb-2">❌</div>
                  <h4 className="font-bold text-red-800 mb-2">Danger Zone</h4>
                  <p className="text-sm text-gray-700">EMI &gt; 50% of income</p>
                  <p className="text-xs text-gray-600 mt-2">High stress, risk of default, no emergency fund</p>
                </div>
              </div>

              <div className="mt-4 bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Example Calculation:</h4>
                <p className="text-sm text-gray-700">
                  If your monthly income = ₹50,000<br/>
                  Safe EMI limit = ₹20,000 (40%)<br/>
                  Maximum EMI = ₹25,000 (50%)
                </p>
              </div>
            </div>
          </section>

          {/* How to Reduce EMI */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6 Ways to Reduce Your EMI</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  1. Make Larger Down Payment
                </h3>
                <p className="text-sm text-gray-700">
                  Pay 20-30% upfront to reduce principal. ₹20L loan vs ₹15L = ₹5,000-7,000 less EMI
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  2. Choose Longer Tenure
                </h3>
                <p className="text-sm text-gray-700">
                  20 years vs 10 years = 40% lower EMI (but 2x total interest paid)
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">3. Negotiate Lower Interest</h3>
                <p className="text-sm text-gray-700">
                  Compare 3-4 banks. Even 0.5% lower = ₹2-3L savings on ₹50L, 20-year loan
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">4. Prepay Regularly</h3>
                <p className="text-sm text-gray-700">
                  Part-payment of principal reduces future interest. ₹1L prepayment = ₹15K-20K saved
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">5. Balance Transfer</h3>
                <p className="text-sm text-gray-700">
                  Switch to bank with 1-2% lower rate. Saves ₹5-10L on long-term loans
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">6. Improve Credit Score</h3>
                <p className="text-sm text-gray-700">
                  750+ score gets 1-2% better rates automatically. Worth ₹3-5L savings
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              ⚠️ Common EMI Mistakes to Avoid
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Only looking at EMI amount,</strong> not total interest paid</li>
              <li><strong>Taking longest tenure</strong> without calculating total cost</li>
              <li><strong>Missing EMI payments</strong> (₹500-1000 late fee + credit score damage)</li>
              <li><strong>Not checking prepayment penalty</strong> before signing</li>
              <li><strong>Exceeding 50% EMI-to-income ratio</strong> (high stress risk)</li>
              <li><strong>Ignoring processing fees</strong> (1-2% of loan amount)</li>
              <li><strong>Not comparing 3-4 banks</strong> for better rates</li>
            </ul>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What happens if I miss an EMI payment?
                </summary>
                <p className="mt-3 text-gray-700">
                  Missing EMI has serious consequences: (1) Late fee (₹500-1000), (2) Credit score drops by 50-100 points, 
                  (3) Penalty interest charged, (4) After 90 days, loan becomes NPA and legal action may start. Always pay on time or contact bank immediately if facing issues.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I reduce EMI mid-way through the loan?
                </summary>
                <p className="mt-3 text-gray-700">
                  Yes, two ways: (1) <strong>Increase tenure</strong> - extends loan period, reduces EMI (bank approval needed), 
                  or (2) <strong>Make part-prepayment</strong> - reduces principal, then choose lower EMI (same tenure) or shorter tenure (same EMI).
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Is it better to prepay or invest the money?
                </summary>
                <p className="mt-3 text-gray-700">
                  Compare returns: If loan interest is 10% and you can earn 12%+ from investments (mutual funds, stocks), invest instead. 
                  If loan is 14%+ (personal loan), prepay immediately as safe returns &gt;14% are rare. For home loans (8-9%), it's a judgment call.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Why does interest decrease and principal increase in EMI over time?
                </summary>
                <p className="mt-3 text-gray-700">
                  Because interest is calculated on the <strong>outstanding balance</strong>. Initially, balance is high so interest is high. 
                  As you pay EMI, outstanding reduces, so next month's interest is lower. Since EMI is fixed, more goes toward principal. This is called "reducing balance" method.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I have multiple EMIs at the same time?
                </summary>
                <p className="mt-3 text-gray-700">
                  Yes, you can have multiple loans (home, car, personal) simultaneously. But <strong>total EMI should be ≤50% of income</strong>. 
                  Banks check your FOIR (Fixed Obligations to Income Ratio) before approving new loans. Higher existing EMIs reduce future borrowing capacity.
                </p>
              </details>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/emi-calculator" className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="text-3xl mb-2">🧮</div>
                <h4 className="font-bold text-blue-600 mb-1">EMI Calculator</h4>
                <p className="text-sm text-gray-600">Calculate any loan EMI instantly</p>
              </a>
              <a href="/calculators/home-loan-calculator" className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="text-3xl mb-2">🏠</div>
                <h4 className="font-bold text-blue-600 mb-1">Home Loan EMI</h4>
                <p className="text-sm text-gray-600">Housing loan with tax benefits</p>
              </a>
              <a href="/calculators/car-loan-calculator" className="bg-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="text-3xl mb-2">🚗</div>
                <h4 className="font-bold text-blue-600 mb-1">Car Loan EMI</h4>
                <p className="text-sm text-gray-600">Vehicle loan calculator</p>
              </a>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a 
              href="/learn/loans/secured-vs-unsecured" 
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              ← Previous: Secured vs Unsecured
            </a>
            <a 
              href="/learn/loans/simple-vs-compound-interest" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
            >
              Next: Simple vs Compound Interest →
            </a>
          </div>

        </motion.div>

        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "What is EMI? How It Works, Formula & Calculator",
            "description": "Complete guide to EMI calculation with interactive calculator, formula, examples",
            "educationalLevel": "Beginner",
            "learningResourceType": "Tutorial",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default WhatIsEMI;

