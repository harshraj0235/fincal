import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingDown, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanTenureExplained: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [rate, setRate] = useState(9);
  const [tenure10, setTenure10] = useState(10);
  const [tenure20, setTenure20] = useState(20);
  const [tenure30, setTenure30] = useState(30);

  const calculateEMI = (principal: number, rate: number, years: number) => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const emi10 = calculateEMI(loanAmount, rate, tenure10);
  const emi20 = calculateEMI(loanAmount, rate, tenure20);
  const emi30 = calculateEMI(loanAmount, rate, tenure30);

  const total10 = emi10 * tenure10 * 12;
  const total20 = emi20 * tenure20 * 12;
  const total30 = emi30 * tenure30 * 12;

  const interest10 = total10 - loanAmount;
  const interest20 = total20 - loanAmount;
  const interest30 = total30 - loanAmount;

  return (
    <>
      <SEOHelmet
        title="Understanding Loan Tenure: How It Affects EMI & Total Cost | MoneyCal Learn"
        description="Learn how loan tenure impacts EMI, total interest, and overall cost. Compare 10, 20, 30-year loans with interactive calculator. Find the ideal tenure for your budget."
        keywords="loan tenure, loan duration, EMI vs tenure, loan repayment period, short term vs long term loan, loan tenure calculator"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="loan-tenure-explained"
        breadcrumb={['Learn', 'Loans & Credit', 'Understanding Loan Tenure']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Understanding Loan Tenure
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            लोन अवधि को समझें - How It Affects Your EMI & Total Cost
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Loan tenure</strong> is the time period you have to repay your loan completely. 
              It's one of the most important decisions - it affects your <strong>monthly EMI</strong> and <strong>total interest paid</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hindi में:</strong> Tenure मतलब लोन चुकाने का समय। Short tenure = ज्यादा EMI लेकिन कम total interest। 
              Long tenure = कम EMI लेकिन ज्यादा total interest। यह एक trade-off है जो आपको अपने budget के हिसाब से choose करना होता है।
            </p>
          </section>

          {/* The Tenure Trade-Off */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Tenure Trade-Off</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingDown className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Shorter Tenure</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 mb-1">✅ Advantages</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Much lower total interest</strong></li>
                      <li>• Debt-free faster</li>
                      <li>• Build equity quickly</li>
                      <li>• Less risk of job loss impact</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 mb-1">❌ Disadvantages</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>High monthly EMI</strong></li>
                      <li>• Less cash for emergencies</li>
                      <li>• Lower loan eligibility</li>
                      <li>• Financial stress if income drops</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                  <h3 className="text-xl font-bold text-orange-900">Longer Tenure</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 mb-1">✅ Advantages</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Low monthly EMI</strong></li>
                      <li>• More cash for other goals</li>
                      <li>• Higher loan eligibility</li>
                      <li>• Comfortable for budget</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 mb-1">❌ Disadvantages</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Much higher total interest</strong></li>
                      <li>• Debt burden for decades</li>
                      <li>• Slow equity building</li>
                      <li>• More years of financial obligation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Comparison Calculator */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compare Different Tenures</h2>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loan Amount
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-lg font-bold text-purple-700">₹{loanAmount.toLocaleString('en-IN')}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="range"
                  min="7"
                  max="15"
                  step="0.5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-lg font-bold text-purple-700">{rate}%</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* 10 Years */}
                <div className="bg-white p-5 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-green-800">10 Years</h3>
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Monthly EMI</p>
                      <p className="text-2xl font-bold text-green-700">₹{emi10.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600">Total Interest</p>
                      <p className="text-lg font-semibold text-orange-700">₹{interest10.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-800">₹{total10.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                {/* 20 Years */}
                <div className="bg-white p-5 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-blue-800">20 Years</h3>
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Monthly EMI</p>
                      <p className="text-2xl font-bold text-blue-700">₹{emi20.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        ₹{(emi10 - emi20).toLocaleString('en-IN')} less than 10Y
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600">Total Interest</p>
                      <p className="text-lg font-semibold text-orange-700">₹{interest20.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-red-600">
                        ₹{(interest20 - interest10).toLocaleString('en-IN')} more!
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-800">₹{total20.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                {/* 30 Years */}
                <div className="bg-white p-5 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-purple-800">30 Years</h3>
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-600">Monthly EMI</p>
                      <p className="text-2xl font-bold text-purple-700">₹{emi30.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-purple-600 mt-1">
                        ₹{(emi10 - emi30).toLocaleString('en-IN')} less than 10Y
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600">Total Interest</p>
                      <p className="text-lg font-semibold text-red-700">₹{interest30.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-red-600 font-bold">
                        ₹{(interest30 - interest10).toLocaleString('en-IN')} more!
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-800">₹{total30.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-yellow-100 p-4 rounded-lg">
                <p className="text-sm font-bold text-yellow-900">
                  💡 Key Insight: 30-year loan costs ₹{(interest30 - interest10).toLocaleString('en-IN')} MORE in interest than 10-year!
                </p>
              </div>
            </div>
          </section>

          {/* Standard Tenures by Loan Type */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Tenures by Loan Type</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Loan Type</th>
                    <th className="p-4 text-left">Typical Tenure</th>
                    <th className="p-4 text-left">Min-Max Range</th>
                    <th className="p-4 text-left">Recommended</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">🏠 Home Loan</td>
                    <td className="p-4">15-20 years</td>
                    <td className="p-4">5-30 years</td>
                    <td className="p-4 text-green-700">15-20 years (balance)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">🚗 Car Loan</td>
                    <td className="p-4">5 years</td>
                    <td className="p-4">1-7 years</td>
                    <td className="p-4 text-green-700">3-5 years (asset depreciates)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">💳 Personal Loan</td>
                    <td className="p-4">3 years</td>
                    <td className="p-4">1-5 years</td>
                    <td className="p-4 text-green-700">2-3 years (high rate)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">🎓 Education Loan</td>
                    <td className="p-4">10-15 years</td>
                    <td className="p-4">5-15 years</td>
                    <td className="p-4 text-green-700">10 years (after studies)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">💼 Business Loan</td>
                    <td className="p-4">5-7 years</td>
                    <td className="p-4">1-10 years</td>
                    <td className="p-4 text-green-700">5-7 years (match cash flow)</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">🏆 Gold Loan</td>
                    <td className="p-4">6-12 months</td>
                    <td className="p-4">3 months - 3 years</td>
                    <td className="p-4 text-green-700">1 year (short-term need)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Choose Ideal Tenure */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">🎯 How to Choose Your Ideal Tenure</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">Consider Your:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>1. Age:</strong> Younger? Can take longer tenure. Older? Keep it short.</li>
                  <li><strong>2. Income Stability:</strong> Stable job? Opt for shorter tenure, save interest.</li>
                  <li><strong>3. Current EMI Burden:</strong> If FOIR &gt;40%, choose longer tenure.</li>
                  <li><strong>4. Future Income Growth:</strong> Expect raises? Start long, prepay later.</li>
                  <li><strong>5. Financial Goals:</strong> Kids' education coming? Keep EMI low.</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">🎓 Pro Strategy:</h4>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>"Take long, prepay strong"</strong>
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✅ Choose 20-year tenure (low EMI = safe)</li>
                  <li>✅ Pay extra ₹10-20K/month as prepayment</li>
                  <li>✅ Effectively clear in 10-12 years</li>
                  <li>✅ Flexibility if income drops (pause prepayment)</li>
                  <li>✅ Save lakhs in interest</li>
                </ul>
                <p className="text-xs text-blue-600 mt-3 italic">
                  Best of both worlds: Low mandatory EMI + high savings if you can afford it!
                </p>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              💡 Critical Points to Remember
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Every extra year adds lakhs in interest</strong> - 30Y vs 20Y = ₹15-20L extra on ₹50L loan!</li>
              <li><strong>Lower EMI ≠ Cheaper loan</strong> - Look at total amount paid, not just monthly payment</li>
              <li><strong>You can change tenure later</strong> through loan restructuring (bank approval needed)</li>
              <li><strong>Prepayment is your best friend</strong> - Even ₹10K/year saves lakhs in interest</li>
              <li><strong>Consider your age at end:</strong> Don't plan EMI after retirement (60-65 years)</li>
              <li><strong>Inflation helps long tenure</strong> - ₹50K EMI feels lighter after 10 years due to salary growth</li>
              <li><strong>Short tenure = faster equity building</strong> in property (good for upgrades/second home)</li>
            </ul>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I change loan tenure after taking the loan?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Yes!</strong> Most banks allow tenure modification: (1) <strong>Increase tenure</strong> - reduces EMI, 
                  needs bank approval, may incur charges; (2) <strong>Decrease tenure</strong> - through part-prepayment, usually free. 
                  Better option: Keep long tenure, make regular prepayments (flexible + no approval needed).
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  What is the ideal home loan tenure?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>15-20 years</strong> is sweet spot for most people. Reasons: (1) EMI manageable (20-30% of income), 
                  (2) Interest not excessive (vs 30Y), (3) Debt-free before retirement, (4) Flexibility to prepay. 
                  <strong>Avoid 30 years</strong> unless absolutely necessary - you'll pay 2-2.5x the principal amount!
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Should I take maximum tenure to get more loan amount?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Bad strategy!</strong> Just because bank approves ₹80L for 30 years doesn't mean you should take it. 
                  Borrow based on: (1) Your <strong>actual need</strong>, not maximum eligibility, (2) EMI &lt;40% of income, 
                  (3) Ability to prepay 10-20% annually. Better: Take moderate loan, shorter tenure, save interest lakhs.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Does tenure affect interest rate?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Usually no</strong> for fixed tenure ranges. Same rate for 10-30 years typically. However: 
                  (1) Some banks offer 0.25-0.5% discount for women borrowers, (2) Shorter tenure (&lt;10Y) may get 
                  0.1-0.25% discount, (3) Special schemes (15-year home loan) may have promotional rates. Always compare 
                  total cost, not just rate.
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/simple-vs-compound-interest" className="text-gray-600 hover:text-blue-600">
              ← Previous: Simple vs Compound Interest
            </a>
            <a href="/learn/loans/fixed-vs-floating-rates" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Fixed vs Floating Rates →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Understanding Loan Tenure: How It Affects EMI & Cost",
            "description": "Complete guide to loan tenure with interactive calculator comparing 10, 20, 30 year loans",
            "educationalLevel": "Beginner",
            "learningResourceType": "Tutorial",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default LoanTenureExplained;

