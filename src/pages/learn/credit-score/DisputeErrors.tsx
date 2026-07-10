import React from 'react';
import { AlertCircle, CheckCircle, FileText, Shield, Mail, Phone } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const DisputeErrors: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Dispute Credit Report Errors 2024 - Fix CIBIL Mistakes | MoneyCal"
        description="Complete guide to disputing credit report errors in India. Step-by-step process to fix wrong entries, late payments, fraud, and boost your CIBIL score by 50-100 points."
        keywords="dispute credit report errors, CIBIL error dispute, credit report mistakes, fix CIBIL errors, credit report correction"
        canonicalUrl="/learn/credit-score/dispute-errors"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Dispute Credit Report Errors',
          description: 'Step-by-step guide to disputing and correcting errors in your credit report',
          step: [
            { '@type': 'HowToStep', name: 'Get credit report', text: 'Obtain free credit report from CIBIL' },
            { '@type': 'HowToStep', name: 'Identify errors', text: 'Review report for mistakes' },
            { '@type': 'HowToStep', name: 'File dispute', text: 'Submit dispute online or via email' },
            { '@type': 'HowToStep', name: 'Follow up', text: 'Track dispute status and verify correction' }
          ]
        }}
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="dispute-errors"
        breadcrumb={['Learn', 'Credit Score', 'Dispute Errors']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">30% of Credit Reports Have Errors - Fix Them!</h3>
          <p className="text-gray-700">
                Wrong loan entries, incorrect late payments, identity theft - errors can cost you lakhs in higher interest rates! 
                Learn how to spot and fix them in 30 days. ???
          </p>
        </div>
          </div>
        </div>

        {/* Common Errors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            10 Most Common Credit Report Errors (??????? ???????)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <div className="space-y-3">
              {[
                { error: "Incorrect Personal Information", example: "Wrong name spelling, old address, incorrect DOB", impact: "Low" },
                { error: "Accounts You Don't Recognize", example: "Loans/cards you never applied for (identity theft!)", impact: "High" },
                { error: "Wrong Payment Status", example: "Shows late when you paid on time", impact: "Very High" },
                { error: "Closed Accounts Showing as Open", example: "Loan fully paid but still showing active", impact: "Medium" },
                { error: "Duplicate Accounts", example: "Same loan listed twice", impact: "High" },
                { error: "Incorrect Credit Limit", example: "?50K limit shown as ?25K", impact: "Medium" },
                { error: "Wrong Ownership Type", example: "Joint account shown as individual or vice versa", impact: "Medium" },
                { error: "Outdated Information", example: "Old defaults still showing after 7 years", impact: "Very High" },
                { error: "Incorrect Balance Amount", example: "Shows ?50K outstanding when it's ?10K", impact: "High" },
                { error: "Account Not Updated After Closure", example: "Paid & closed but report doesn't reflect", impact: "High" }
              ].map((item, idx) => (
                <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-gray-900 text-sm">{idx + 1}. {item.error}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.impact === 'Very High' ? 'bg-red-200 text-red-800' :
                      item.impact === 'High' ? 'bg-orange-200 text-orange-800' :
                      'bg-yellow-200 text-yellow-800'
                    }`}>
                      {item.impact} Impact
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{item.example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dispute Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Step-by-Step Dispute Process (????? ?????????)
          </h2>

          <div className="bg-white border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">5-Step Resolution Process:</h3>

            <div className="space-y-5">
              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Get Your Credit Report</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Download official report from CIBIL, Experian, Equifax or CRIF High Mark
                    </p>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Where to Get:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• CIBIL: <a href="https://www.cibil.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cibil.com</a> (?550 or 1 free/year)</li>
                        <li>• Experian: <a href="https://www.experian.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.experian.in</a></li>
                        <li>• Free via: Paisabazaar, BankBazaar, OneScore</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Identify & Document Errors</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Review every section carefully and note all mistakes with proof
                    </p>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Gather Proof:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Payment receipts (if shows late but you paid on time)</li>
                        <li>• Loan closure certificate (if shows open but closed)</li>
                        <li>• Bank statements (showing payments made)</li>
                        <li>• Police report (if identity theft/fraud)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-300">
                <div className="flex items-start">
                  <div className="bg-purple-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">File Dispute Online</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Submit dispute through official CIBIL portal or write to bureau
                    </p>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">How to File:</p>
                      <div className="space-y-2 text-xs">
                        <div className="bg-purple-50 p-2 rounded">
                          <p className="font-bold text-gray-900">Online (Fastest):</p>
                          <p className="text-gray-700">Login to CIBIL.com ? Dispute Center ? Raise Dispute ? Upload proof</p>
                        </div>
                        <div className="bg-purple-50 p-2 rounded">
                          <p className="font-bold text-gray-900">Email:</p>
                          <p className="text-gray-700">consumersupport@cibil.com with details & proof</p>
                        </div>
                        <div className="bg-purple-50 p-2 rounded">
                          <p className="font-bold text-gray-900">Post:</p>
                          <p className="text-gray-700">TransUnion CIBIL Ltd., One World Centre, Mumbai</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-5 rounded-lg border-2 border-orange-300">
                <div className="flex items-start">
                  <div className="bg-orange-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Wait for Investigation (30 Days)</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      CIBIL investigates with the lender/bank that reported the information
                    </p>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">Timeline:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Bureau forwards dispute to lender: 3-5 days</li>
                        <li>• Lender investigates: 15-20 days</li>
                        <li>• Bureau updates report: 5-7 days</li>
                        <li>• <strong>Total: Maximum 30 days by law</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border-2 border-yellow-300">
                <div className="flex items-start">
                  <div className="bg-yellow-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">5</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Verify Correction & Follow Up</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Check if error is fixed, escalate if not resolved
                    </p>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-2">If Not Resolved:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Contact lender directly with proof</li>
                        <li>• File complaint with RBI Ombudsman</li>
                        <li>• Legal notice to bureau/lender (last resort)</li>
                        <li>• Add statement of dispute to report (your side of story)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Credit Bureau Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-5">
              <h3 className="font-bold text-lg text-blue-900 mb-3">CIBIL (TransUnion)</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  consumersupport@cibil.com
                </p>
                <p className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  1800-425-3475 (Toll-free)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Website:</strong> <a href="https://www.cibil.com/raise-dispute" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Online Dispute Center</a>
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-5">
              <h3 className="font-bold text-lg text-green-900 mb-3">Experian</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2 text-green-600" />
                  support@experian.in
                </p>
                <p className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-green-600" />
                  1800-121-2760
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Website:</strong> <a href="https://www.experian.in/dispute" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Experian Dispute</a>
                </p>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-5">
              <h3 className="font-bold text-lg text-purple-900 mb-3">Equifax</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2 text-purple-600" />
                  customerservice@equifax.co.in
                </p>
                <p className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-purple-600" />
                  1800-419-1065
                </p>
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-5">
              <h3 className="font-bold text-lg text-orange-900 mb-3">CRIF High Mark</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2 text-orange-600" />
                  inquiry@crifhighmark.com
                </p>
                <p className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2 text-orange-600" />
                  1800-425-3475
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/check-score-free" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Check Score Free</p>
                <p className="text-sm text-gray-600">Get your report first</p>
              </a>
              <a href="/learn/credit-score/score-vs-report" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Score vs Report</p>
                <p className="text-sm text-gray-600">Understand the difference</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Improve Score</p>
                <p className="text-sm text-gray-600">After fixing errors</p>
              </a>
              <a href="/learn/credit-cards/fraud-safety" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Fraud Protection</p>
                <p className="text-sm text-gray-600">Prevent identity theft</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">?? Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">30% of credit reports have errors - check yours monthly!</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Common errors: Wrong payments, unrecognized accounts, incorrect balances, outdated info</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">5-step process: Get report ? Identify errors ? File dispute ? Wait 30 days ? Verify fix</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">File online via CIBIL dispute center or email with proof documents</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Resolution time: 30 days maximum (by RBI law)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Fixing errors can boost score by 50-100 points instantly!</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Fix Errors, Boost Score! ??</h2>
          <p className="text-orange-100 mb-6">
            Check your report now and dispute any errors you find!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.cibil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-xl hover:bg-orange-50 transition-colors"
            >
              Get Your Report ?
            </a>
            <a
              href="/learn/credit-score/improve-score"
              className="inline-block bg-orange-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-orange-800 transition-colors"
            >
              Improve Score
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default DisputeErrors;
