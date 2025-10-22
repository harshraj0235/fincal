import React, { useState, useEffect } from 'react';
import { PieChart, Home, TrendingDown, AlertCircle, CheckCircle, Calculator } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanToValueRatio: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<string>('5000000');
  const [ltvPercent, setLtvPercent] = useState<string>('85');
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [downPayment, setDownPayment] = useState<number>(0);

  useEffect(() => {
    const propValue = parseFloat(propertyValue) || 0;
    const ltv = parseFloat(ltvPercent) || 0;
    
    const loan = (propValue * ltv) / 100;
    const down = propValue - loan;
    
    setLoanAmount(Math.round(loan));
    setDownPayment(Math.round(down));
  }, [propertyValue, ltvPercent]);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <>
      <SEOHelmet
        title="Loan-to-Value (LTV) Ratio Explained: Home Loan Guide 2025 | MoneyCal"
        description="Understand LTV ratio in home loans - what is it, how it affects your down payment, RBI limits, and how to get maximum LTV in India. Interactive LTV calculator included!"
        keywords="LTV ratio, loan to value ratio, home loan LTV, LTV in home loan, down payment calculation, maximum LTV India, RBI LTV limits"
        canonicalUrl="https://moneycal.in/learn/home-loans/loan-to-value-ratio"
      />
      
      <LearnLayout
        title="Understanding Loan-to-Value (LTV) Ratio"
        description="Master LTV ratio and optimize your down payment strategy 📊"
        category="Home Loans"
        difficulty="Intermediate"
        readTime="9 min read"
        prevLesson={{
          title: 'Home Loan Eligibility Calculator',
          slug: '/learn/home-loans/home-loan-eligibility'
        }}
        nextLesson={{
          title: 'Home Loan Interest Rates Explained',
          slug: '/learn/home-loans/interest-rates-explained'
        }}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <PieChart className="h-6 w-6 text-orange-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why LTV Matters</h3>
              <p className="text-gray-700">
                LTV determines how much down payment you need! Higher LTV = less cash upfront. Understanding this can save you from being cash-strapped after home purchase! 💰
              </p>
            </div>
          </div>
        </div>

        {/* What is LTV */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is LTV (Loan-to-Value) Ratio?</h2>
          
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
            <p className="text-lg text-gray-800 mb-4">
              <strong>LTV (Loan-to-Value) ratio</strong> is the percentage of property value that a bank will finance as a loan.
            </p>
            
            <div className="bg-white border-2 border-blue-400 rounded-lg p-5">
              <h4 className="font-bold text-blue-900 mb-3">Simple Formula:</h4>
              <div className="font-mono text-xl bg-blue-100 p-4 rounded text-center">
                LTV = (Loan Amount ÷ Property Value) × 100
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">Simple Explanation:</h3>
            <div className="space-y-3 text-gray-800">
              <p className="text-lg">
                <strong>If LTV = 80%</strong> → Bank gives 80% as loan, you pay 20% down payment
              </p>
              <p className="text-lg">
                <strong>If LTV = 90%</strong> → Bank gives 90% as loan, you pay only 10% down payment
              </p>
              <p className="text-lg font-semibold text-green-700 mt-4">
                Higher LTV = Less money needed upfront = Easier to buy home! 🎉
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Calculator */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                <Calculator className="h-10 w-10" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center mb-2">LTV Calculator</h2>
            <p className="text-center text-purple-100">See your loan amount and down payment</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Property Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Value (₹)
                  </label>
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LTV Percentage (%)
                  </label>
                  <input
                    type="range"
                    min="60"
                    max="90"
                    step="5"
                    value={ltvPercent}
                    onChange={(e) => setLtvPercent(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>60%</span>
                    <span className="font-bold text-xl text-purple-600">{ltvPercent}%</span>
                    <span>90%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
                <p className="text-blue-100 text-sm font-semibold mb-2">Loan Amount ({ltvPercent}%)</p>
                <div className="text-4xl font-bold mb-4">{formatCurrency(loanAmount)}</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-blue-100 mb-1">Down Payment Required ({100 - parseFloat(ltvPercent)}%)</p>
                  <p className="text-3xl font-bold">{formatCurrency(downPayment)}</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-3">Breakdown:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-yellow-200">
                    <span>Property Value:</span>
                    <strong>{formatCurrency(parseFloat(propertyValue) || 0)}</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-yellow-200">
                    <span>Bank Finances ({ltvPercent}%):</span>
                    <strong className="text-blue-600">{formatCurrency(loanAmount)}</strong>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>You Pay ({100 - parseFloat(ltvPercent)}%):</span>
                    <strong className="text-red-600">{formatCurrency(downPayment)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RBI LTV Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">RBI LTV Guidelines for India (2025)</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Property Value</th>
                  <th className="border border-gray-300 p-3 text-left">Maximum LTV</th>
                  <th className="border border-gray-300 p-3 text-left">Min Down Payment</th>
                  <th className="border border-gray-300 p-3 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3">Up to ₹30 Lakhs</td>
                  <td className="border border-gray-300 p-3 font-bold text-green-700">90%</td>
                  <td className="border border-gray-300 p-3">10%</td>
                  <td className="border border-gray-300 p-3 text-sm">₹30L → Pay ₹3L, get ₹27L loan</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3">₹30 L - ₹75 L</td>
                  <td className="border border-gray-300 p-3 font-bold text-blue-700">80%</td>
                  <td className="border border-gray-300 p-3">20%</td>
                  <td className="border border-gray-300 p-3 text-sm">₹50L → Pay ₹10L, get ₹40L loan</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3">Above ₹75 Lakhs</td>
                  <td className="border border-gray-300 p-3 font-bold text-orange-700">75%</td>
                  <td className="border border-gray-300 p-3">25%</td>
                  <td className="border border-gray-300 p-3 text-sm">₹1Cr → Pay ₹25L, get ₹75L loan</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5 mt-6">
            <p className="text-gray-800">
              <strong>Note:</strong> These are RBI's MAXIMUM limits. Individual banks may offer lower LTV (more conservative lending) based on your profile, CIBIL score, and location.
            </p>
          </div>
        </section>

        {/* Real Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real Examples: How LTV Works</h2>
          
          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-900 mb-4">Example 1: First Home (₹25 Lakhs) - Best LTV!</h3>
              <div className="space-y-2 text-gray-800">
                <div className="flex justify-between py-2 border-b border-green-200">
                  <span>Property Value:</span>
                  <strong>₹25,00,000</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-green-200">
                  <span>LTV Allowed:</span>
                  <strong className="text-green-700">90% (Maximum!)</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-green-200">
                  <span>Loan Amount:</span>
                  <strong className="text-blue-700">₹22,50,000</strong>
                </div>
                <div className="flex justify-between py-3 bg-white rounded-lg px-3 mt-3">
                  <span className="font-semibold">You Need Only:</span>
                  <strong className="text-red-700 text-xl">₹2,50,000 (10%)</strong>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-700">
                  ✅ <strong>Best scenario for first-time buyers!</strong> Need just ₹2.5L savings to buy ₹25L home!
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Example 2: Mid-Range Home (₹50 Lakhs)</h3>
              <div className="space-y-2 text-gray-800">
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span>Property Value:</span>
                  <strong>₹50,00,000</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span>LTV Allowed:</span>
                  <strong className="text-blue-700">80%</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span>Loan Amount:</span>
                  <strong className="text-blue-700">₹40,00,000</strong>
                </div>
                <div className="flex justify-between py-3 bg-white rounded-lg px-3 mt-3">
                  <span className="font-semibold">You Need:</span>
                  <strong className="text-red-700 text-xl">₹10,00,000 (20%)</strong>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-700">
                  💡 <strong>Tip:</strong> Plus keep ₹1-2L extra for registration, stamp duty, and loan processing fees!
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Example 3: Premium Home (₹1 Crore)</h3>
              <div className="space-y-2 text-gray-800">
                <div className="flex justify-between py-2 border-b border-orange-200">
                  <span>Property Value:</span>
                  <strong>₹1,00,00,000</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-orange-200">
                  <span>LTV Allowed:</span>
                  <strong className="text-orange-700">75%</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-orange-200">
                  <span>Loan Amount:</span>
                  <strong className="text-blue-700">₹75,00,000</strong>
                </div>
                <div className="flex justify-between py-3 bg-white rounded-lg px-3 mt-3">
                  <span className="font-semibold">You Need:</span>
                  <strong className="text-red-700 text-xl">₹25,00,000 (25%)</strong>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-700">
                  ⚠️ <strong>High-value properties need MORE down payment.</strong> Banks want you to have more "skin in the game"!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Factors Affecting LTV */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7 Factors That Affect Your LTV</h2>
          
          <div className="space-y-4">
            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">1. Property Value (Biggest Factor!)</h3>
                <p className="text-gray-700">Up to ₹30L = 90% LTV. Above ₹75L = only 75% LTV. Lower value = higher LTV!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">2. CIBIL Score</h3>
                <p className="text-gray-700">Score 750+: Get maximum LTV. Score 650-700: Banks may reduce LTV to 70-75% (need more down payment!)</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">3. Property Type</h3>
                <p className="text-gray-700">Ready property: Full LTV. Under-construction: 75-80% only. Resale (old): May get 75-80%.</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">4. Location</h3>
                <p className="text-gray-700">Metro cities (Mumbai, Delhi): Full LTV. Tier-3/rural areas: Banks may give only 70-75%.</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">5. Builder Reputation</h3>
                <p className="text-gray-700">Reputed builder (DLF, Lodha): Full LTV. Unknown builder: 70-75% only. Banks check builder track record!</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">6. Your Income & Profile</h3>
                <p className="text-gray-700">Salaried employee, top company: Full LTV. Self-employed/freelancer: May get 75-80%.</p>
              </div>
            </div>

            <div className="flex items-start bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">7. Number of Properties Owned</h3>
                <p className="text-gray-700">First home: Full LTV. 2nd/3rd property: Banks reduce to 60-70% (investment property = higher risk for bank).</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I get 100% home loan (no down payment)?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Usually NO.</strong> Maximum LTV in India is 90% (for properties up to ₹30L). Very rare cases:<br/>
                • PSU employees with salary account in that bank (some banks offer 95%)<br/>
                • CIBIL 800+ with very high income (few banks offer 95%)<br/>
                • Defense personnel (special schemes allow 95%)<br/>
                <br/>
                <strong>Reality:</strong> You'll need at least 10-25% down payment depending on property value.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: What if property valuation is less than agreement value?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: BIG PROBLEM!</strong> Example:<br/>
                • Agreement value (what you're paying): ₹50L<br/>
                • Bank's valuation: ₹45L<br/>
                • LTV 80% on ₹45L = Bank gives only ₹36L (not ₹40L!)<br/>
                • You pay: ₹50L - ₹36L = <strong>₹14L down payment (not ₹10L!)</strong><br/>
                <br/>
                <strong>Solution:</strong> Always get property independently valued BEFORE paying booking amount!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Should I pay more down payment (lower LTV) to get better interest rate?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: MAYBE.</strong> Some banks offer 0.05-0.15% rate discount if you pay 30%+ down payment.<br/>
                <br/>
                <strong>Example:</strong> ₹50L property, 20-year loan<br/>
                • At 85% LTV (₹42.5L loan, 8.5% rate): EMI = ₹36,740<br/>
                • At 70% LTV (₹35L loan, 8.35% rate): EMI = ₹30,130<br/>
                <br/>
                <strong>But you need ₹7.5L extra upfront!</strong> Only worth it if:<br/>
                1. You have surplus cash lying idle<br/>
                2. Can't invest that money at &gt;8% returns<br/>
                3. Want lower EMI for peace of mind
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Does paying higher down payment improve my loan approval chances?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES! Definitely!</strong> Lower LTV = lower risk for bank. Benefits:<br/>
                • Higher approval chance (90% vs 70% if you pay 30% down)<br/>
                • Slightly better interest rate (save 0.1-0.15%)<br/>
                • Faster processing (less scrutiny needed)<br/>
                <br/>
                <strong>Smart Move:</strong> If CIBIL is 650-700 or income is borderline, paying 25-30% down can turn rejection into approval!
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
                <span className="text-gray-800">LTV = (Loan ÷ Property Value) × 100. Higher LTV = less down payment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Maximum LTV in India: 90% (up to ₹30L), 80% (₹30-75L), 75% (above ₹75L)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Lower-value properties get BETTER LTV (easier for first-time buyers!)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">CIBIL 750+ crucial for maximum LTV. Below 700? Expect 70-75% only</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Bank's valuation matters, not agreement value! Always get pre-valuation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Paying 25-30% down can improve approval odds + get 0.1-0.15% rate discount</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Learn About Interest Rates Next! 📈</h2>
          <p className="text-blue-100 mb-6">
            Now that you understand LTV, let's master home loan interest rates and how they're calculated!
          </p>
          <a
            href="/learn/home-loans/interest-rates-explained"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Interest Rates Explained →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default LoanToValueRatio;


