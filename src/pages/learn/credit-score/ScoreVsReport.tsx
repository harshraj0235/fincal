import React from 'react';
import { FileText, Target, CheckCircle, AlertCircle, TrendingUp, Eye } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ScoreVsReport: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Score vs Credit Report - Key Differences 2024 | MoneyCal"
        description="Understand difference between credit score and credit report. What each contains, how to read both, when to check, and why you need both for loan applications."
        keywords="credit score vs credit report, CIBIL score vs report, credit report contents, what is credit report, difference between score and report"
        canonicalUrl="https://moneycal.in/learn/credit-score/score-vs-report"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Score vs Credit Report - Complete Comparison',
          description: 'Comprehensive guide to understanding credit score versus credit report',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="score-vs-report"
        breadcrumb={['Learn', 'Credit Score', 'Score vs Report']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Score vs Report - Know the Difference!</h3>
          <p className="text-gray-700">
                Many confuse credit score with credit report! They're different but related. Understanding both is crucial for loan approvals and financial health. 
                Complete comparison guide! 📊📄
              </p>
            </div>
          </div>
        </div>

        {/* Quick Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Score vs Credit Report - Quick Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-4 text-left">Aspect</th>
                  <th className="border border-gray-300 p-4">Credit Score 🎯</th>
                  <th className="border border-gray-300 p-4">Credit Report 📄</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">What It Is</td>
                  <td className="border border-gray-300 p-3">3-digit number (300-900)</td>
                  <td className="border border-gray-300 p-3">Detailed document (10-20 pages)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Information</td>
                  <td className="border border-gray-300 p-3">Summary (single number)</td>
                  <td className="border border-gray-300 p-3">Complete credit history (all details)</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Purpose</td>
                  <td className="border border-gray-300 p-3">Quick creditworthiness snapshot</td>
                  <td className="border border-gray-300 p-3">Detailed credit behavior analysis</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Length</td>
                  <td className="border border-gray-300 p-3">1 number</td>
                  <td className="border border-gray-300 p-3">10-20 pages</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">What's Included</td>
                  <td className="border border-gray-300 p-3">Just the score</td>
                  <td className="border border-gray-300 p-3">Score + all accounts + payment history + inquiries</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">When Used</td>
                  <td className="border border-gray-300 p-3">Loan application screening</td>
                  <td className="border border-gray-300 p-3">Detailed verification, error checking</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Free Access</td>
                  <td className="border border-gray-300 p-3 text-green-700">Unlimited (on platforms)</td>
                  <td className="border border-gray-300 p-3 text-yellow-700">1/year from each bureau</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* What's in Credit Report */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What's Inside a Credit Report? (रिपोर्ट में क्या है?)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">8 Main Sections:</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-bold text-blue-900 mb-2">1. Personal Information</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Name, DOB, Gender</li>
                    <li>• PAN, Aadhaar, Passport</li>
                    <li>• Phone numbers, email</li>
                    <li>• Current & previous addresses</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-900 mb-2">2. Credit Score</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• 3-digit number (300-900)</li>
                    <li>• Score range indicator</li>
                    <li>• Score factors summary</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-purple-900 mb-2">3. Account Summary</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Total number of accounts</li>
                    <li>• Active vs closed accounts</li>
                    <li>• Total credit limit</li>
                    <li>• Total outstanding balance</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-bold text-orange-900 mb-2">4. Credit Accounts (Detailed)</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• All credit cards (limits, balances)</li>
                    <li>• All loans (amounts, EMIs)</li>
                    <li>• Account opening/closing dates</li>
                    <li>• Ownership type (individual/joint)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="font-bold text-red-900 mb-2">5. Payment History (Last 36 months)</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Month-by-month payment record</li>
                    <li>• On-time vs late payments</li>
                    <li>• DPD (Days Past Due) codes</li>
                    <li>• Defaults, write-offs, settlements</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-bold text-yellow-900 mb-2">6. Credit Inquiries</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Hard inquiries (loan applications)</li>
                    <li>• Soft inquiries (self-checks)</li>
                    <li>• Last 24 months history</li>
                    <li>• Lender names and dates</li>
                  </ul>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <p className="font-bold text-pink-900 mb-2">7. Employment Information</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Current employer</li>
                    <li>• Past employers</li>
                    <li>• Income details (if reported)</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="font-bold text-indigo-900 mb-2">8. Public Records (if any)</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Court judgments</li>
                    <li>• Bankruptcies</li>
                    <li>• Tax liens</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Both Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why You Need Both (दोनों क्यों जरूरी हैं)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-blue-900 mb-4">🎯 Credit Score For:</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Quick eligibility check before applying for loans</span>
                </div>
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Monthly monitoring of credit health</span>
                </div>
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Tracking improvement progress</span>
                </div>
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Instant financial health snapshot</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-4">📄 Credit Report For:</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Finding errors and disputing them</span>
                </div>
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Detecting fraud or identity theft</span>
                </div>
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Understanding WHY score is low/high</span>
                </div>
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Verifying loan closure status</span>
                </div>
                <div className="bg-white p-3 rounded flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Checking for unknown accounts opened in your name</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Check What */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            When to Check Score vs Report (कब क्या जांचें)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg text-blue-900 mb-4">📊 Check Credit SCORE When:</h3>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">1</span>
                    <span className="text-gray-700">Monthly monitoring of credit health</span>
                  </div>
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">2</span>
                    <span className="text-gray-700">Before applying for loans (30 days prior)</span>
                  </div>
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">3</span>
                    <span className="text-gray-700">Tracking improvement progress</span>
                  </div>
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">4</span>
                    <span className="text-gray-700">Quick financial health check</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3 bg-blue-100 p-2 rounded">
                  <strong>Frequency:</strong> Monthly via free platforms (Paisabazaar, BankBazaar)
          </p>
        </div>

              <div>
                <h3 className="font-bold text-lg text-green-900 mb-4">📄 Check Credit REPORT When:</h3>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">1</span>
                    <span className="text-gray-700">Applying for major loans (home, car)</span>
                  </div>
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">2</span>
                    <span className="text-gray-700">Score suddenly dropped (find cause)</span>
                  </div>
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">3</span>
                    <span className="text-gray-700">Suspecting fraud or identity theft</span>
                  </div>
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">4</span>
                    <span className="text-gray-700">Loan got rejected (understand why)</span>
                  </div>
                  <div className="bg-white p-3 rounded text-sm flex items-start">
                    <span className="bg-green-100 text-green-700 font-bold px-2 py-1 rounded mr-2 flex-shrink-0 text-xs">5</span>
                    <span className="text-gray-700">Annual detailed review</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3 bg-green-100 p-2 rounded">
                  <strong>Frequency:</strong> Quarterly or when needed (1 free/year official)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/check-score-free" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Check Score Free</p>
                <p className="text-sm text-gray-600">Get both score & report</p>
              </a>
              <a href="/learn/credit-score/dispute-errors" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Dispute Report Errors</p>
                <p className="text-sm text-gray-600">Fix mistakes found</p>
              </a>
              <a href="/learn/credit-score/what-is-credit-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Credit Score Basics</p>
                <p className="text-sm text-gray-600">Understand fundamentals</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Improve Score</p>
                <p className="text-sm text-gray-600">6-month action plan</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Credit Score = 1 number (300-900), Credit Report = Detailed document (10-20 pages)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Score: Quick eligibility, monthly monitoring | Report: Error checking, fraud detection, detailed analysis</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Report contains: Personal info, all accounts, 36-month payment history, inquiries, employment</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Check score monthly (free unlimited), report quarterly or before major loans</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Both needed: Score for quick check, report for complete understanding and error detection</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Get Both Score & Report! 📊</h2>
          <p className="text-blue-100 mb-6">
            Check your score monthly and review full report quarterly for complete credit health!
          </p>
          <a
            href="/learn/credit-score/check-score-free"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Check Free Now →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default ScoreVsReport;
