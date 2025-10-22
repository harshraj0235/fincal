import React from 'react';
import { Award, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CIBILScoreImpact: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="CIBIL Score Impact on Home Loan: 750+ Gets Best Rates 2025 | MoneyCal"
        description="How CIBIL score affects home loan approval, interest rates, and loan amount in India. Learn to improve score to 750+ in 6 months for best home loan rates!"
        keywords="CIBIL score home loan, credit score home loan, CIBIL 750 home loan, improve CIBIL score, credit score impact interest rate"
        canonicalUrl="https://moneycal.in/learn/home-loans/cibil-score-impact"
      />
      
      <LearnLayout
        title="CIBIL Score & Home Loan Approval"
        description="750+ score = best rates! Learn how to achieve it 📊"
        category="Home Loans"
        difficulty="Intermediate"
        readTime="10 min read"
        prevLesson={{
          title: 'Home Loan Application Process',
          slug: '/learn/home-loans/application-process'
        }}
        nextLesson={{
          title: 'Tax Benefits on Home Loans',
          slug: '/learn/home-loans/tax-benefits'
        }}
      >
        {/* Score Impact Table */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">CIBIL Score = Your Financial Report Card</h2>
            <p className="text-gray-700">
              Just like marks matter in exams, CIBIL score matters for loans! 750+ = Excellent (easy approval + best rates). Below 650 = Failed (rejection or very high rates). Let's fix yours! 💪
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-4 text-left">CIBIL Score</th>
                  <th className="border border-gray-300 p-4 text-left">Rating</th>
                  <th className="border border-gray-300 p-4 text-left">Interest Rate</th>
                  <th className="border border-gray-300 p-4 text-left">Approval Chances</th>
                  <th className="border border-gray-300 p-4 text-left">Impact on ₹40L Loan</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3 font-bold">800-900</td>
                  <td className="border border-gray-300 p-3 text-green-700 font-bold">Excellent ⭐⭐⭐⭐⭐</td>
                  <td className="border border-gray-300 p-3">8.25-8.50%</td>
                  <td className="border border-gray-300 p-3">95-100%</td>
                  <td className="border border-gray-300 p-3 text-sm">Best rates, instant approval, max loan</td>
                </tr>
                <tr className="bg-green-100">
                  <td className="border border-gray-300 p-3 font-bold">750-799</td>
                  <td className="border border-gray-300 p-3 text-green-600 font-bold">Very Good ⭐⭐⭐⭐</td>
                  <td className="border border-gray-300 p-3">8.50-8.75%</td>
                  <td className="border border-gray-300 p-3">90-95%</td>
                  <td className="border border-gray-300 p-3 text-sm">Standard rates, quick approval</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 p-3 font-bold">700-749</td>
                  <td className="border border-gray-300 p-3 text-yellow-700 font-bold">Good ⭐⭐⭐</td>
                  <td className="border border-gray-300 p-3">8.75-9.25%</td>
                  <td className="border border-gray-300 p-3">70-85%</td>
                  <td className="border border-gray-300 p-3 text-sm">+0.25-0.50% higher rate</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 p-3 font-bold">650-699</td>
                  <td className="border border-gray-300 p-3 text-orange-700 font-bold">Average ⭐⭐</td>
                  <td className="border border-gray-300 p-3">9.50-10.50%</td>
                  <td className="border border-gray-300 p-3">40-60%</td>
                  <td className="border border-gray-300 p-3 text-sm">+1% rate, 20% less loan amount</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 p-3 font-bold">Below 650</td>
                  <td className="border border-gray-300 p-3 text-red-700 font-bold">Poor ⭐</td>
                  <td className="border border-gray-300 p-3">11-13% (if approved)</td>
                  <td className="border border-gray-300 p-3">10-30%</td>
                  <td className="border border-gray-300 p-3 text-sm">Mostly rejected OR 30% less loan</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-100 border-2 border-blue-400 rounded-xl p-5">
            <h3 className="font-bold text-blue-900 mb-2">Real Money Impact (₹40L loan, 20 years):</h3>
            <div className="space-y-1 text-gray-800">
              <p>• CIBIL 800: 8.35% → Pay ₹80.58L total</p>
              <p>• CIBIL 750: 8.60% → Pay ₹82.90L total</p>
              <p>• CIBIL 700: 9.00% → Pay ₹86.39L total</p>
              <p>• CIBIL 650: 10.00% → Pay ₹96.67L total</p>
              <p className="pt-2 border-t-2 border-blue-500 font-bold text-lg text-red-700">
                650 vs 800: Pay ₹16.09 LAKHS MORE! 😱
              </p>
            </div>
          </div>
        </section>

        {/* How to Improve CIBIL */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Improve CIBIL Score to 750+ (6 Months Plan)</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                1. Pay ALL Bills ON TIME (35% weightage!)
              </h3>
              <p className="text-gray-700">Even one missed payment = -50 to -100 points! Set auto-pay for credit cards, EMIs, utility bills.</p>
              <p className="text-sm text-green-700 mt-2"><strong>Impact:</strong> +50-100 points in 6 months</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                2. Keep Credit Card Usage Below 30% (30% weightage)
              </h3>
              <p className="text-gray-700">If card limit is ₹1L, never use more than ₹30K. Using 90% = looks desperate to banks!</p>
              <p className="text-sm text-green-700 mt-2"><strong>Impact:</strong> +30-60 points in 3 months</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                3. Don't Apply for Multiple Loans/Cards (10% weightage)
              </h3>
              <p className="text-gray-700">Each application = "hard inquiry" = -5 to -10 points. Apply to max 3 banks in 30-day window.</p>
              <p className="text-sm text-green-700 mt-2"><strong>Impact:</strong> Prevents -20 to -40 point drop</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                4. Keep Old Credit Accounts Active (15% weightage)
              </h3>
              <p className="text-gray-700">Longer credit history = better score. DON'T close your oldest credit card even if not using!</p>
              <p className="text-sm text-green-700 mt-2"><strong>Impact:</strong> +20-40 points over time</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                5. Mix of Secured & Unsecured Loans (10% weightage)
              </h3>
              <p className="text-gray-700">Having home loan (secured) + credit card (unsecured) is better than only credit cards.</p>
              <p className="text-sm text-green-700 mt-2"><strong>Impact:</strong> +10-20 points</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
              <h3 className="font-bold text-green-900 mb-2 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                6. Check & Fix Errors in Report
              </h3>
              <p className="text-gray-700">20% reports have errors! Check free on CIBIL website. Dispute wrong entries within 30 days.</p>
              <p className="text-sm text-green-700 mt-2"><strong>Impact:</strong> Can jump +50-150 points if errors fixed!</p>
            </div>
          </div>

          <div className="mt-6 bg-yellow-100 border-2 border-yellow-400 rounded-xl p-5">
            <h3 className="font-bold text-yellow-900 mb-3">6-Month Action Plan:</h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Month 1:</strong> Get CIBIL report, identify issues, set all auto-pays</p>
              <p><strong>Month 2-3:</strong> Keep credit card usage &lt;30%, pay everything on time</p>
              <p><strong>Month 4-5:</strong> Clear small dues, don't apply for new credit</p>
              <p><strong>Month 6:</strong> Check score (should be 750+), apply for home loan!</p>
              <p className="pt-2 border-t-2 border-yellow-500 font-bold text-green-700">
                Starting from 650? Can reach 750+ in 6 months with discipline! 💪
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5 CIBIL Mistakes That Cost You Lakhs</h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <h3 className="font-bold text-red-900 mb-2 flex items-center">
                <XCircle className="h-6 w-6 mr-2" />
                1. Paying Only Minimum Due on Credit Card
              </h3>
              <p className="text-gray-700">Banks see this as "struggling to pay." Always pay FULL amount before due date! Minimum payment = -10 to -20 points per month.</p>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <h3 className="font-bold text-red-900 mb-2 flex items-center">
                <XCircle className="h-6 w-6 mr-2" />
                2. Closing Oldest Credit Card
              </h3>
              <p className="text-gray-700">Your 10-year-old card contributes to "credit age." Closing it = instant -30 to -50 points! Keep it active with ₹100 transaction every 3 months.</p>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <h3 className="font-bold text-red-900 mb-2 flex items-center">
                <XCircle className="h-6 w-6 mr-2" />
                3. Being Guarantor for Someone's Loan
              </h3>
              <p className="text-gray-700">If they default, YOUR score drops! Their loan shows on YOUR report. Be guarantor only for immediate family (and track their payments!).</p>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <h3 className="font-bold text-red-900 mb-2 flex items-center">
                <XCircle className="h-6 w-6 mr-2" />
                4. Not Checking Report Before Applying
              </h3>
              <p className="text-gray-700">20% reports have errors (closed loans still showing, wrong address, identity mix-up). Check 3 months before applying and fix errors!</p>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <h3 className="font-bold text-red-900 mb-2 flex items-center">
                <XCircle className="h-6 w-6 mr-2" />
                5. Settling Loans Instead of Paying Full
              </h3>
              <p className="text-gray-700">"Settled" status = you negotiated to pay less = looks bad! Always pay FULL amount. Settled account = -100 to -150 points and stays on report for 7 years!</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: I have no credit history (new to credit). What's my CIBIL?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: You have NO score (shows as -1 or NH).</strong> This is actually better than 600-650 score! Banks will approve based on income + down payment. To build score: Get secured credit card (FD-backed), use 20% of limit, pay full for 6 months → You'll have 720+ score!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Can I get home loan with 680 CIBIL?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: YES, but expensive!</strong> You'll get:<br/>
                • 0.50-1% higher interest rate (₹5-8L more over 20 years)<br/>
                • 20% less loan amount (if eligible for ₹40L, might get ₹32L only)<br/>
                • Stricter income verification<br/>
                <br/>
                <strong>Better strategy:</strong> Wait 4-6 months, improve to 730+, then apply. You'll save ₹5+ lakhs!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: How often does CIBIL score update?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Every 30-45 days.</strong> Banks report to CIBIL monthly. So if you paid credit card on Jan 5, it reflects in CIBIL by Feb 15-20. Don't expect immediate jump! Consistent good behavior for 3-6 months = significant improvement.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: My spouse has 800 CIBIL, mine is 650. Should we apply jointly?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: ABSOLUTELY YES!</strong> Joint application uses BETTER score (not average). Benefits:<br/>
                • Your application judged on 800 score = best rates<br/>
                • Higher loan amount (both incomes)<br/>
                • Both claim tax benefits (₹7L vs ₹3.5L)<br/>
                <br/>
                <strong>Bonus:</strong> Timely EMI payments will improve YOUR 650 score too!
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
                <span className="text-gray-800">750+ CIBIL = best rates (8.25-8.75%). Below 650 = rejection or 2% higher rates</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">650 vs 800 score = pay ₹16 lakhs MORE on ₹40L loan over 20 years!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Top factors: Payment history (35%), credit utilization (30%), credit age (15%)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Can improve 650→750 in 6 months: Pay on time, keep usage &lt;30%, don't apply for new credit</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Check CIBIL report 3 months before applying - 20% have errors!</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Tax Benefits Next! 💰</h2>
          <p className="text-blue-100 mb-6">
            CIBIL sorted? Now learn how to save ₹3.5 lakhs per year in taxes with home loan!
          </p>
          <a
            href="/learn/home-loans/tax-benefits"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Tax Benefits →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default CIBILScoreImpact;



