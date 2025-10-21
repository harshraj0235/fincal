import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Award } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CIBILScoreImpact: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How CIBIL Score Impacts Loan Approval & Interest Rates | Complete Guide"
        description="Learn how CIBIL score affects loan approval chances, interest rates, loan amount. Understand score ranges (300-900), how banks use it, and tips to improve for better loans."
        keywords="CIBIL score, credit score, CIBIL score for loan, how CIBIL affects loan, improve CIBIL score, credit score India, 750 credit score"
      />

      <LearnLayout 
        category="loans" 
        currentLesson="cibil-score-impact"
        breadcrumb={['Learn', 'Loans & Credit', 'CIBIL Score Impact on Loans']}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            How CIBIL Score Impacts Loan Approval
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            CIBIL स्कोर लोन approval को कैसे प्रभावित करता है
          </p>

          {/* Score Ranges */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">CIBIL Score Ranges & Impact</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold mb-2">750-900</div>
                <div className="text-lg font-semibold mb-2">Excellent</div>
                <div className="text-sm opacity-90">
                  ✅ Instant approval<br/>
                  ✅ Best interest rates<br/>
                  ✅ Higher loan amount<br/>
                  ✅ Negotiate power
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold mb-2">650-749</div>
                <div className="text-lg font-semibold mb-2">Good</div>
                <div className="text-sm opacity-90">
                  ⚠️ Likely approved<br/>
                  ⚠️ Standard rates<br/>
                  ⚠️ Moderate amount<br/>
                  ⚠️ Limited negotiation
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold mb-2">550-649</div>
                <div className="text-lg font-semibold mb-2">Fair</div>
                <div className="text-sm opacity-90">
                  ❌ Difficult approval<br/>
                  ❌ High interest rates<br/>
                  ❌ Lower loan amount<br/>
                  ❌ Secured loans only
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl font-bold mb-2">&lt;550</div>
                <div className="text-lg font-semibold mb-2">Poor</div>
                <div className="text-sm opacity-90">
                  ❌ Mostly rejected<br/>
                  ❌ Very high rates<br/>
                  ❌ Strong collateral needed<br/>
                  ❌ Limited options
                </div>
              </div>
            </div>
          </section>

          {/* Impact on Different Aspects */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How CIBIL Score Affects Different Loan Aspects</h2>
            
            <div className="space-y-4">
              {/* Interest Rate */}
              <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
                <h3 className="font-bold text-blue-900 mb-3">1. Interest Rate Impact</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="p-3 text-left">CIBIL Score</th>
                        <th className="p-3 text-left">Personal Loan</th>
                        <th className="p-3 text-left">Home Loan</th>
                        <th className="p-3 text-left">Car Loan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="p-3 font-semibold">750-900</td>
                        <td className="p-3 text-green-700">11-13%</td>
                        <td className="p-3 text-green-700">8.5-9%</td>
                        <td className="p-3 text-green-700">9-10%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">650-749</td>
                        <td className="p-3 text-yellow-700">13-16%</td>
                        <td className="p-3 text-yellow-700">9-10%</td>
                        <td className="p-3 text-yellow-700">10-12%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">550-649</td>
                        <td className="p-3 text-red-700">18-24%</td>
                        <td className="p-3 text-red-700">10.5-12%</td>
                        <td className="p-3 text-red-700">12-14%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  💡 <strong>100-point score improvement</strong> can save 1-2% interest = ₹2-5L on ₹50L, 20-year loan!
                </p>
              </div>

              {/* Approval Chances */}
              <div className="bg-white p-6 rounded-xl border-2 border-green-200">
                <h3 className="font-bold text-green-900 mb-3">2. Approval Probability</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-semibold">750-900</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                      <div className="bg-green-600 h-4 rounded-full" style={{width: '95%'}}></div>
                    </div>
                    <span className="font-bold text-green-700">95%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="font-semibold">650-749</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                      <div className="bg-yellow-600 h-4 rounded-full" style={{width: '70%'}}></div>
                    </div>
                    <span className="font-bold text-yellow-700">70%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-semibold">550-649</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                      <div className="bg-orange-600 h-4 rounded-full" style={{width: '35%'}}></div>
                    </div>
                    <span className="font-bold text-orange-700">35%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="font-semibold">&lt;550</span>
                    <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                      <div className="bg-red-600 h-4 rounded-full" style={{width: '10%'}}></div>
                    </div>
                    <span className="font-bold text-red-700">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Points */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              💡 Critical Insights
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>CIBIL score = 40% of loan decision</strong> (most important single factor)</li>
              <li><strong>750+ is the magic number</strong> for best rates and instant approval</li>
              <li><strong>Each 100-point drop</strong> increases interest by ~1-2%</li>
              <li><strong>Score below 650</strong> = very difficult for unsecured loans</li>
              <li><strong>Building from scratch takes 6-12 months</strong> (responsible credit behavior)</li>
              <li><strong>Checking own score = no impact</strong> (soft inquiry)</li>
            </ul>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  Can I get a loan with 600 CIBIL score?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>Very difficult</strong> for unsecured (personal) loans. For <strong>secured loans</strong> (home, gold): (1) Possible but with 2-4% higher interest, 
                  (2) Need strong collateral, (3) Lower LTV (60-70%), (4) Co-applicant mandatory. <strong>Better approach:</strong> Wait 6 months, improve score to 700+, then apply.
                </p>
              </details>

              <details className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <summary className="font-semibold text-gray-800 cursor-pointer">
                  How quickly can I improve my CIBIL score?
                </summary>
                <p className="mt-3 text-gray-700">
                  <strong>650 to 750</strong> = 6-12 months with: (1) Pay all EMIs on time, (2) Reduce credit card utilization to &lt;30%, 
                  (3) Don't apply for new credit, (4) Clear old dues. <strong>500 to 700</strong> = 12-18 months. 
                  <strong>No overnight fixes</strong> - scams offering "instant score boost" don't work!
                </p>
              </details>
            </div>
          </section>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t-2 border-gray-200">
            <a href="/learn/loans/co-applicant-benefits" className="text-gray-600 hover:text-blue-600">
              ← Previous: Co-Applicant Benefits
            </a>
            <a href="/learn/loans/calculate-true-cost" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Next: Calculate True Cost →
            </a>
          </div>

        </motion.div>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": "How CIBIL Score Impacts Loan Approval",
            "educationalLevel": "Beginner",
            "inLanguage": ["en", "hi"]
          })}
        </script>
      </LearnLayout>
    </>
  );
};

export default CIBILScoreImpact;

