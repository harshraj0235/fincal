import React from 'react';
import { AlertCircle, XCircle, CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CommonMistakes: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="10 Common Home Loan Mistakes Indians Make - Avoid & Save Lakhs! 2025"
        description="Top 10 home loan mistakes in India that cost you lakhs - not comparing banks, wrong loan type, EMI ratio, CIBIL issues. Learn from others' errors!"
        keywords="home loan mistakes, home loan errors, home loan tips, avoid home loan mistakes"
        canonicalUrl="https://moneycal.in/learn/home-loans/common-mistakes"
      />
      
      <LearnLayout
        category="home-loans"
        currentLesson="common-mistakes"
        breadcrumb={['Learn', 'Home Loans', 'Common Mistakes']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Learn From Others' Mistakes!</h3>
              <p className="text-gray-700">
                These 10 mistakes cost Indians ₹3-15 lakhs EACH! Don't be one of them. Knowledge is savings! 💰
              </p>
            </div>
          </div>
        </div>

        {/* Top 10 Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top 10 Home Loan Mistakes</h2>
          
          <div className="space-y-6">
            {/* Mistake 1 */}
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-start mb-3">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">Not Comparing 5+ Banks</h3>
                  <p className="text-red-700 text-sm font-semibold mt-1">Cost: ₹3-7 Lakhs over 20 years</p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">
                <strong>Mistake:</strong> Going with first bank or your salary account bank without shopping around.
              </p>
              <div className="bg-white border-2 border-red-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">✅ Solution:</p>
                <p className="text-gray-700">Apply to 5-6 banks: SBI, HDFC, ICICI, LIC Housing, Axis, Kotak. Compare final offers. 0.5% difference = ₹3-5L savings!</p>
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-start mb-3">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">Taking Plot-Only Loan</h3>
                  <p className="text-red-700 text-sm font-semibold mt-1">Cost: ₹5-8 Lakhs (NO tax benefits!)</p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">
                <strong>Mistake:</strong> Taking loan to buy plot only (will build later). No tax benefits + higher rate (9-11%)!
              </p>
              <div className="bg-white border-2 border-red-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">✅ Solution:</p>
                <p className="text-gray-700">Take combined "land + construction" loan. Get 8.5% rate + ₹3.5L/year tax benefits. Save ₹10-15L total!</p>
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-start mb-3">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">EMI &gt; 40% of Income</h3>
                  <p className="text-red-700 text-sm font-semibold mt-1">Risk: Lifestyle squeeze + default risk</p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">
                <strong>Mistake:</strong> Taking maximum loan bank offers, making EMI 45-50% of income. No buffer for emergencies!
              </p>
              <div className="bg-white border-2 border-red-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">✅ Solution:</p>
                <p className="text-gray-700">Keep EMI ≤ 35% of gross income. Pay larger down payment or buy smaller property. Safety &gt; Stretch!</p>
              </div>
            </div>

            {/* Mistake 4 */}
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-start mb-3">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">Choosing Fixed Over Floating</h3>
                  <p className="text-red-700 text-sm font-semibold mt-1">Cost: ₹4-8 Lakhs + No prepayment flexibility</p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">
                <strong>Mistake:</strong> Choosing fixed rate (9.5%) instead of floating (8.5%) due to fear.
              </p>
              <div className="bg-white border-2 border-red-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">✅ Solution:</p>
                <p className="text-gray-700">Choose floating in 90% cases. It's cheaper + NO prepayment penalty. Floating wins historically!</p>
              </div>
            </div>

            {/* Mistake 5 */}
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-start mb-3">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">5</div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">Not Claiming Tax Benefits</h3>
                  <p className="text-red-700 text-sm font-semibold mt-1">Cost: ₹20-40 Lakhs over 20 years!</p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">
                <strong>Mistake:</strong> Paying EMI but forgetting to claim ₹3.5L deduction in ITR! Losing ₹1+ lakh/year!
              </p>
              <div className="bg-white border-2 border-red-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">✅ Solution:</p>
                <p className="text-gray-700">Get interest + principal certificate from bank every March. File ITR claiming Section 80C (₹1.5L) + Section 24 (₹2L)!</p>
              </div>
            </div>

            {/* Mistake 6 */}
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-start mb-3">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">6</div>
                <div>
                  <h3 className="text-xl font-bold text-red-900">Ignoring Processing Fees & Hidden Charges</h3>
                  <p className="text-red-700 text-sm font-semibold mt-1">Cost: ₹50K-4 Lakhs!</p>
                </div>
              </div>
              <p className="text-gray-800 mb-3">
                <strong>Mistake:</strong> Comparing only interest rates. Bank offers 8.4% but charges 1% processing + ₹10K for everything!
              </p>
              <div className="bg-white border-2 border-red-300 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-2">✅ Solution:</p>
                <p className="text-gray-700">Compare total cost: Rate + Processing fee + Legal charges + Valuation + Insurance. Bank B at 8.6% with ₹10K fees better than Bank A at 8.4% with ₹80K fees!</p>
              </div>
            </div>

            {/* Mistake 7-10 Summary */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-4">Other Critical Mistakes:</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800"><strong>7. Not Reading Loan Agreement:</strong> Missing fine print on foreclosure, rate change terms</p>
                </div>
                <div className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800"><strong>8. Being Guarantor Without Tracking:</strong> Their default = your CIBIL drops</p>
                </div>
                <div className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800"><strong>9. Not Prepaying in Early Years:</strong> Missing out on ₹5-10L savings</p>
                </div>
                <div className="flex items-start">
                  <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800"><strong>10. Not Checking CIBIL Before Applying:</strong> Rejection due to unknown errors in report</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Compare 5+ banks - 0.5% difference = ₹3-5L savings</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Never take plot-only loan - no tax benefits + higher rates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Keep EMI ≤ 35% of income for safety</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Choose floating over fixed (saves ₹4-8L + prepayment flexibility)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">ALWAYS claim tax benefits - ₹1+ lakh/year saved!</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Final Lesson: Choose Best Loan! 🎯</h2>
          <p className="text-blue-100 mb-6">
            Complete decision framework to choose the absolute best home loan for your situation!
          </p>
          <a
            href="/learn/home-loans/choose-best-loan"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Choose Best Loan →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CommonMistakes;


