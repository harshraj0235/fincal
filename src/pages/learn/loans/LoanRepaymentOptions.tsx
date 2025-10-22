import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanRepaymentOptions: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Loan Repayment Options in India | EMI, Bullet Payment, Step-Up & More"
        description="Complete guide to loan repayment methods: standard EMI, balloon payment, bullet payment, step-up EMI, flexible EMI. Learn which option saves you money."
        keywords="loan repayment options, EMI payment, bullet payment, balloon payment, step-up EMI, flexible EMI, loan repayment methods"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="repayment-options"
        breadcrumb={['Learn', 'Loans & Credit', 'Loan Repayment Options']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Loan Repayment Options You Should Know
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            लोन repayment के विकल्प - Choose the Best for You
          </p>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Most borrowers only know about <strong>standard EMI</strong>, but banks offer multiple repayment methods. 
              Choosing the right one can save you lakhs in interest or give you flexibility when needed.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hindi में:</strong> EMI केवल एक option नहीं है! Banks कई तरह के repayment methods देते हैं - 
              step-up EMI, balloon payment, bullet payment, flexible EMI. अपनी income pattern के हिसाब से choose करें।
            </p>
          </section>

          {/* 6 Repayment Methods */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6 Loan Repayment Methods</h2>
            
            <div className="space-y-4">
              {/* 1. Standard EMI */}
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-3">1. Standard EMI (Most Common)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">How It Works:</p>
                    <p className="text-sm text-gray-700">
                      Fixed equal monthly payments throughout tenure. Principal increases, interest decreases each month.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">Best For:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ Stable salary employees</li>
                      <li>✅ Predictable income</li>
                      <li>✅ First-time borrowers</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. Step-Up EMI */}
              <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-3">2. Step-Up EMI (Increasing)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">How It Works:</p>
                    <p className="text-sm text-gray-700 mb-2">
                      EMI starts low, increases every 2-3 years (10-15% step-up)
                    </p>
                    <p className="text-xs text-gray-600">
                      Example: Year 1-2: ₹30K | Year 3-4: ₹35K | Year 5-6: ₹40K
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">Best For:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ Young professionals (expect salary hikes)</li>
                      <li>✅ Starting career (low initial income)</li>
                      <li>✅ Business with growth potential</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Balloon Payment */}
              <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="text-xl font-bold text-purple-900 mb-3">3. Balloon Payment (Final Lump Sum)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">How It Works:</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Small EMIs throughout + Large final payment (30-50% of loan) at end
                    </p>
                    <p className="text-xs text-gray-600">
                      Example: ₹20K monthly + ₹25L final payment in year 5
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">Best For:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ Expecting lump sum (maturity, inheritance)</li>
                      <li>✅ Business with seasonal income</li>
                      <li>⚠️ Risky if lump sum doesn't come!</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Bullet Repayment */}
              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <h3 className="text-xl font-bold text-orange-900 mb-3">4. Bullet Repayment (Pay Only Interest)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">How It Works:</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Pay only interest monthly. Full principal at end of tenure.
                    </p>
                    <p className="text-xs text-gray-600">
                      Example: ₹50L loan @ 12% = ₹5K/month interest + ₹50L at year 3
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">Best For:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ Short-term business loans (1-3 years)</li>
                      <li>✅ Project financing</li>
                      <li>❌ NOT for salaried/long-term</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 5. Flexible EMI */}
              <div className="bg-teal-50 p-6 rounded-xl border-2 border-teal-200">
                <h3 className="text-xl font-bold text-teal-900 mb-3">5. Flexible EMI (Adjust Amount)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">How It Works:</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Pay more in good months, less in lean months (within limits)
                    </p>
                    <p className="text-xs text-gray-600">
                      Example: ₹20-40K range, average ₹30K
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">Best For:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ Freelancers (variable income)</li>
                      <li>✅ Commission-based jobs</li>
                      <li>✅ Seasonal businesses</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 6. Part-Prepayment */}
              <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-900 mb-3">6. Regular Prepayment (Smart Strategy)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">How It Works:</p>
                    <p className="text-sm text-gray-700 mb-2">
                      Standard EMI + extra ₹10-50K whenever possible to reduce principal
                    </p>
                    <p className="text-xs text-gray-600">
                      Saves MASSIVE interest over time!
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 mb-2">Best For:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✅ Anyone who can save extra!</li>
                      <li>✅ Annual bonuses/increments</li>
                      <li>✅ Long-tenure loans (home)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Method</th>
                    <th className="p-4 text-left">Monthly Payment</th>
                    <th className="p-4 text-left">Total Interest</th>
                    <th className="p-4 text-left">Flexibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Standard EMI</td>
                    <td className="p-4">Fixed</td>
                    <td className="p-4 text-orange-700">Moderate</td>
                    <td className="p-4 text-yellow-700">Low</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Step-Up EMI</td>
                    <td className="p-4">Increasing</td>
                    <td className="p-4 text-red-700">Higher</td>
                    <td className="p-4 text-green-700">Medium</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Balloon Payment</td>
                    <td className="p-4">Low + Large final</td>
                    <td className="p-4 text-red-700">Higher</td>
                    <td className="p-4 text-red-700">Risky</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Flexible EMI</td>
                    <td className="p-4">Variable</td>
                    <td className="p-4 text-orange-700">Moderate</td>
                    <td className="p-4 text-green-700 font-bold">Highest</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-4 font-semibold">Regular Prepayment</td>
                    <td className="p-4">EMI + Extra</td>
                    <td className="p-4 text-green-700 font-bold">Lowest</td>
                    <td className="p-4 text-green-700">High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Which repayment option saves the most interest?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Regular prepayment strategy</strong> saves the most. Even ₹10K extra per month on ₹50L loan can save ₹10-15L in interest over 20 years. 
                  Second best: <strong>Standard EMI with shorter tenure</strong>. Worst: Balloon/bullet payment - you pay full interest on entire principal.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I change repayment method mid-way?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Difficult but possible.</strong> Requires bank approval and loan restructuring. Usually charged ₹5-10K fee. 
                  <strong>Exception:</strong> Switching from standard to prepayment is free (just pay extra whenever you want - no approval needed).
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Is step-up EMI a good idea?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Good if:</strong> (1) You're young with assured increments, (2) EMI starts at comfortable 25-30% of income, (3) Step-up matches salary growth. 
                  <strong>Risky if:</strong> Income doesn't grow as expected (job loss, business slow). Total interest paid is 10-20% more than standard EMI.
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/loan-default-consequences" className="text-gray-600 hover:text-blue-600">
              ← Previous: Loan Default
            </a>
            <a href="/learn/loans/loan-application-process" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Application Process →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "Loan Repayment Options You Should Know",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default LoanRepaymentOptions;



