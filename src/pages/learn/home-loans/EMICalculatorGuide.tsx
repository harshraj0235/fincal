import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const EMICalculatorGuide: React.FC = () => {
  const [principal, setPrincipal] = useState('4000000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [emi, setEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const P = parseFloat(principal) || 0;
    const R = parseFloat(rate) / 12 / 100;
    const N = parseInt(tenure) * 12;

    if (P > 0 && R > 0 && N > 0) {
      const emiCalc = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const total = emiCalc * N;
      const interest = total - P;

      setEMI(Math.round(emiCalc));
      setTotalAmount(Math.round(total));
      setTotalInterest(Math.round(interest));
    }
  }, [principal, rate, tenure]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <>
      <SEOHelmet
        title="Home Loan EMI Calculator: Calculate & Understand Your EMI 2025 | MoneyCal"
        description="Free home loan EMI calculator with formula explanation. Calculate monthly EMI, total interest, and payment breakdown. Master EMI calculation in 5 minutes!"
        keywords="EMI calculator, home loan EMI, EMI formula, calculate EMI, EMI calculation, home loan calculator India"
        canonicalUrl="https://moneycal.in/learn/home-loans/emi-calculator-guide"
      />
      
      <LearnLayout
        title="EMI Calculator & How to Use It"
        description="Master EMI calculation and plan your repayment strategy! 🧮"
        category="Home Loans"
        difficulty="Beginner"
        readTime="10 min read"
        prevLesson={{
          title: 'Fixed vs Floating Rate Home Loans',
          slug: '/learn/home-loans/fixed-vs-floating'
        }}
        nextLesson={{
          title: 'Documents Required for Home Loan',
          slug: '/learn/home-loans/documents-required'
        }}
      >
        {/* What is EMI */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What is EMI?</h2>
            <p className="text-gray-700 text-lg">
              <strong>EMI (Equated Monthly Installment)</strong> is a fixed payment you make to the bank every month to repay your loan. It includes BOTH:
            </p>
            <div className="mt-4 space-y-2">
              <div className="bg-white rounded-lg p-3 border border-blue-300">
                <strong>1. Principal</strong> - Part of the original loan amount
              </div>
              <div className="bg-white rounded-lg p-3 border border-blue-300">
                <strong>2. Interest</strong> - Cost of borrowing (bank's profit)
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-5">
            <h3 className="font-bold text-yellow-900 mb-2">Key Insight:</h3>
            <p className="text-gray-800">
              In initial years, most of your EMI goes toward interest (70-80%). In later years, most goes toward principal (70-80%). This is called the <strong>"reducing balance"</strong> method.
            </p>
          </div>
        </section>

        {/* Interactive Calculator */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Calculator className="h-10 w-10" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">Home Loan EMI Calculator</h2>
            <p className="text-center text-indigo-100">Calculate your monthly payment instantly</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Loan Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interest Rate (% per year)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
                <p className="text-green-100 text-sm font-semibold mb-2">Monthly EMI</p>
                <div className="text-5xl font-bold mb-6">{formatCurrency(emi)}</div>
                
                <div className="space-y-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm text-green-100 mb-1">Loan Amount</p>
                    <p className="text-2xl font-bold">{formatCurrency(parseFloat(principal) || 0)}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm text-green-100 mb-1">Total Interest</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-sm text-green-100 mb-1">Total Amount Payable</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-2">EMI Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Principal ÷ Total:</span>
                    <strong>{((parseFloat(principal) / totalAmount) * 100).toFixed(1)}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest ÷ Total:</span>
                    <strong className="text-red-600">{((totalInterest / totalAmount) * 100).toFixed(1)}%</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-yellow-400">
                    <span>Months to Pay:</span>
                    <strong>{parseInt(tenure) * 12} months</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMI Formula */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">EMI Formula Explained</h2>
          
          <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-5 mb-4">
              <h3 className="font-bold text-blue-900 mb-3">Standard EMI Formula:</h3>
              <div className="font-mono text-lg bg-white p-4 rounded border-2 border-blue-500 overflow-x-auto">
                EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]
              </div>
            </div>

            <div className="space-y-3 text-gray-800">
              <p><strong>Where:</strong></p>
              <ul className="ml-6 space-y-2">
                <li>• <strong>P</strong> = Principal loan amount (₹40,00,000)</li>
                <li>• <strong>r</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100). If 8.5% yearly, then r = 8.5/12/100 = 0.00708</li>
                <li>• <strong>n</strong> = Total months (20 years × 12 = 240 months)</li>
              </ul>
            </div>

            <div className="mt-4 bg-green-50 border-2 border-green-300 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-2">Example Calculation:</h4>
              <div className="space-y-2 text-sm text-gray-800">
                <p>P = ₹40,00,000</p>
                <p>Annual Rate = 8.5% → r = 0.00708</p>
                <p>n = 20 years × 12 = 240 months</p>
                <p className="pt-2 border-t-2 border-green-400 font-bold text-base">
                  EMI = ₹40,00,000 × 0.00708 × (1.00708)^240 / [(1.00708)^240 - 1]
                </p>
                <p className="font-bold text-lg text-green-700">
                  = ₹34,604 per month
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How EMI Changes Over Time */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How EMI Composition Changes (Reducing Balance)</h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              Your EMI remains <strong>constant (₹34,604)</strong>, but the principal vs interest split changes every month!
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-red-300 rounded-lg p-5">
                <h4 className="font-bold text-red-800 mb-3">Year 1 (Month 1)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>EMI:</span>
                    <strong>₹34,604</strong>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Interest:</span>
                    <strong>₹28,333 (82%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <strong>₹6,271 (18%)</strong>
                  </div>
                  <div className="text-xs text-gray-600 pt-2 border-t">Outstanding: ₹39,93,729</div>
                </div>
              </div>

              <div className="bg-white border-2 border-yellow-300 rounded-lg p-5">
                <h4 className="font-bold text-yellow-800 mb-3">Year 10 (Month 120)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>EMI:</span>
                    <strong>₹34,604</strong>
                  </div>
                  <div className="flex justify-between text-yellow-600">
                    <span>Interest:</span>
                    <strong>₹19,245 (56%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <strong>₹15,359 (44%)</strong>
                  </div>
                  <div className="text-xs text-gray-600 pt-2 border-t">Outstanding: ₹27,16,742</div>
                </div>
              </div>

              <div className="bg-white border-2 border-green-300 rounded-lg p-5">
                <h4 className="font-bold text-green-800 mb-3">Year 20 (Month 240)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>EMI:</span>
                    <strong>₹34,604</strong>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Interest:</span>
                    <strong>₹243 (1%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Principal:</span>
                    <strong>₹34,361 (99%)</strong>
                  </div>
                  <div className="text-xs text-gray-600 pt-2 border-t">Outstanding: ₹0 🎉</div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-100 rounded-lg border-2 border-blue-400">
              <p className="text-gray-800">
                <strong>Key Insight:</strong> In first 10 years, you pay mostly interest! That's why prepaying in early years saves massive amounts (we'll cover in Lesson #14).
              </p>
            </div>
          </div>
        </section>

        {/* Factors Affecting EMI */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3 Factors That Determine Your EMI</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                1. Loan Amount (Principal)
              </h3>
              <p className="text-gray-700 mb-3">
                Higher loan = higher EMI. Simple direct relationship!
              </p>
              <div className="bg-white rounded p-3 border border-green-400 text-sm">
                <p>₹30L loan @ 8.5%, 20 years = <strong>₹25,953 EMI</strong></p>
                <p>₹40L loan @ 8.5%, 20 years = <strong>₹34,604 EMI</strong> (+33%)</p>
                <p>₹50L loan @ 8.5%, 20 years = <strong>₹43,255 EMI</strong> (+67%)</p>
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-5">
              <h3 className="font-bold text-orange-900 mb-2 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                2. Interest Rate (Most Important!)
              </h3>
              <p className="text-gray-700 mb-3">
                Even 0.5% difference = ₹3-5L saved over 20 years!
              </p>
              <div className="bg-white rounded p-3 border border-orange-400 text-sm">
                <p>₹40L @ <strong>8.0%</strong>, 20 years = ₹33,459 EMI (Total: ₹80.30L)</p>
                <p>₹40L @ <strong>8.5%</strong>, 20 years = ₹34,604 EMI (Total: ₹83.05L)</p>
                <p>₹40L @ <strong>9.0%</strong>, 20 years = ₹35,997 EMI (Total: ₹86.39L)</p>
                <p className="mt-2 font-bold text-red-700">Difference 8% vs 9% = ₹6.09L! 🤯</p>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-5">
              <h3 className="font-bold text-purple-900 mb-2 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2" />
                3. Loan Tenure (Years)
              </h3>
              <p className="text-gray-700 mb-3">
                Longer tenure = lower EMI BUT much more interest paid!
              </p>
              <div className="bg-white rounded p-3 border border-purple-400 text-sm">
                <p>₹40L @ 8.5%, <strong>10 years</strong> = ₹49,354 EMI (Total: ₹59.22L, Interest: ₹19.22L)</p>
                <p>₹40L @ 8.5%, <strong>20 years</strong> = ₹34,604 EMI (Total: ₹83.05L, Interest: ₹43.05L)</p>
                <p>₹40L @ 8.5%, <strong>30 years</strong> = ₹30,759 EMI (Total: ₹1.11Cr, Interest: ₹71.07L)</p>
                <p className="mt-2 font-bold text-orange-700">10 vs 30 years = pay ₹51.85L MORE interest! 😱</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I reduce my EMI without changing loan amount?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES! 3 ways:</strong><br/><br/>
                <strong>1. Extend Tenure:</strong> 15 years → 20 years reduces EMI by 20-25%<br/>
                <strong>2. Lower Interest Rate:</strong> Negotiate 0.5% less OR do balance transfer<br/>
                <strong>3. Prepay Principal:</strong> Every ₹1L prepaid reduces EMI by ₹800-900<br/>
                <br/>
                <strong>Example:</strong> ₹40L, 8.5%, 20 years = ₹34,604 EMI<br/>
                • Extend to 25 years → EMI drops to ₹32,177 (-7%)<br/>
                • Get 8.0% rate → EMI drops to ₹33,459 (-3.3%)<br/>
                • Prepay ₹5L → EMI drops to ₹30,778 (-11%)
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Should I choose lower EMI (long tenure) or higher EMI (short tenure)?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Smart Strategy - Take longest tenure BUT prepay aggressively!</strong><br/><br/>
                <strong>Why?</strong><br/>
                • Longest tenure = lowest mandatory EMI = maximum flexibility<br/>
                • If finances are tight any month, you only pay minimum<br/>
                • When you have surplus, prepay extra (no penalty for floating rate)<br/>
                • Finish loan in 12-15 years while having flexibility of 20-25 year tenure!<br/>
                <br/>
                <strong>Example:</strong><br/>
                • Take 25-year loan (EMI ₹32,177)<br/>
                • Pay ₹40,000/month when comfortable (₹7,823 extra goes to principal)<br/>
                • Loan finishes in 14 years instead of 25<br/>
                • Save ₹15-20 lakhs in interest!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: My EMI is 50% of my income. Is this safe?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: NO! Very risky!</strong> Here's the safe rule:<br/><br/>
                <strong>Safe EMI Ratios:</strong><br/>
                • <strong>Ideal:</strong> EMI ≤ 30-35% of gross income<br/>
                • <strong>Maximum:</strong> EMI ≤ 40% of gross income<br/>
                • <strong>Dangerous:</strong> EMI &gt; 45% of income<br/>
                <br/>
                <strong>Why 50% is risky:</strong><br/>
                • No buffer for emergencies<br/>
                • Can't save/invest<br/>
                • Lifestyle suffers<br/>
                • One job loss = immediate default<br/>
                <br/>
                <strong>Solution if at 50%:</strong><br/>
                1. Extend tenure to reduce EMI<br/>
                2. Add co-applicant to increase income consideration<br/>
                3. Pay larger down payment (reduce loan amount)<br/>
                4. Consider smaller/cheaper property
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: How to manually calculate EMI without calculator?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Use this quick approximation formula (accurate within 2-3%):</strong><br/><br/>
                <div className="bg-blue-50 p-3 rounded border border-blue-300 my-2">
                  <strong>Simple EMI ≈ (P + Total Interest) ÷ Total Months</strong><br/>
                  <strong>Total Interest ≈ P × Rate × Years</strong>
                </div>
                <br/>
                <strong>Example: ₹40L @ 8.5% for 20 years</strong><br/>
                1. Total Interest ≈ 40,00,000 × 8.5% × 20 = ₹68,00,000<br/>
                2. Total Amount ≈ ₹40L + ₹68L = ₹1.08Cr<br/>
                3. EMI ≈ 1.08Cr ÷ 240 months = <strong>₹45,000</strong><br/>
                <br/>
                <strong>Actual EMI (exact formula): ₹34,604</strong><br/>
                <br/>
                <strong>Why difference?</strong> Simple method doesn't account for reducing balance (you pay less interest as principal reduces). But it's good for quick estimates!
              </p>
            </details>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">EMI = Principal + Interest. In early years, 70-80% is interest!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">0.5% interest rate difference = ₹3-5L saved over 20 years</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Longer tenure = Lower EMI BUT 2-3x more total interest paid</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Safe EMI: ≤ 35% of income. Maximum: 40%. Above 45% is risky!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Smart strategy: Take longest tenure for flexibility, then prepay aggressively</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Documents Needed Next! 📄</h2>
          <p className="text-blue-100 mb-6">
            Now that you understand EMI, let's prepare all documents needed for your application!
          </p>
          <a
            href="/learn/home-loans/documents-required"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Documents Required →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default EMICalculatorGuide;



