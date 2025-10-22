import React from 'react';
import { FileText, CheckCircle, Briefcase, Users, Home } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const DocumentsRequired: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Home Loan Documents Required: Complete Checklist 2025 | MoneyCal"
        description="Complete list of documents needed for home loan in India. Separate checklists for salaried, self-employed, and NRI borrowers. Don't miss any document!"
        keywords="home loan documents, documents for home loan, home loan papers required, home loan document checklist India, KYC documents"
        canonicalUrl="https://moneycal.in/learn/home-loans/documents-required"
      />
      
      <LearnLayout
        title="Documents Required for Home Loan"
        description="Complete checklist - never miss a document! 📄"
        category="Home Loans"
        difficulty="Beginner"
        readTime="9 min read"
        prevLesson={{
          title: 'EMI Calculator & How to Use It',
          slug: '/learn/home-loans/emi-calculator-guide'
        }}
        nextLesson={{
          title: 'Home Loan Application Process',
          slug: '/learn/home-loans/application-process'
        }}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Missing even ONE document can delay your approval by 2-4 weeks! 80% of loan delays happen due to incomplete documentation. Get it right the first time! ✅
              </p>
            </div>
          </div>
        </div>

        {/* Quick Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3 Main Document Categories</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">1. Identity & Address</h3>
              <p className="text-gray-700 text-sm">PAN, Aadhaar, Passport, Driving License</p>
            </div>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
              <Briefcase className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">2. Income Proof</h3>
              <p className="text-gray-700 text-sm">Salary slips, ITR, bank statements, Form 16</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-6">
              <Home className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">3. Property Documents</h3>
              <p className="text-gray-700 text-sm">Sale deed, NOC, approved plan, encumbrance certificate</p>
            </div>
          </div>
        </section>

        {/* Salaried Employees */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents for Salaried Employees</h2>
          
          <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
            {/* Category 1: KYC */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">A. Identity & Address Proof (KYC)</h3>
              <div className="space-y-3">
                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">1. PAN Card (Mandatory)</p>
                    <p className="text-sm text-gray-600">Original + self-attested copy</p>
                  </div>
                </div>

                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">2. Aadhaar Card (Mandatory)</p>
                    <p className="text-sm text-gray-600">Original + copy. Will be linked to loan account</p>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-blue-300">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">3. Address Proof (Any ONE)</p>
                    <ul className="text-sm text-gray-700 ml-4 mt-1">
                      <li>• Passport</li>
                      <li>• Driving License</li>
                      <li>• Voter ID</li>
                      <li>• Electricity/Gas bill (latest)</li>
                      <li>• Bank statement with address</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-blue-300">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">4. Passport Size Photos</p>
                    <p className="text-sm text-gray-600">4-6 recent photographs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2: Income Proof */}
            <div className="mb-6 pb-6 border-b-2 border-gray-200">
              <h3 className="text-xl font-bold text-green-900 mb-4">B. Income Proof</h3>
              <div className="space-y-3">
                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">5. Salary Slips (Last 3 months)</p>
                    <p className="text-sm text-gray-600">Original signed and stamped by employer</p>
                  </div>
                </div>

                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">6. Bank Statements (Last 6 months)</p>
                    <p className="text-sm text-gray-600">Salary account statements showing salary credits</p>
                  </div>
                </div>

                <div className="flex items-start bg-green-50 rounded-lg p-4 border border-green-300">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">7. Form 16 (Last 2 years)</p>
                    <p className="text-sm text-gray-600">TDS certificate from employer</p>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 rounded-lg p-4 border border-blue-300">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">8. Employment Letter</p>
                    <p className="text-sm text-gray-600">Letter from employer confirming employment & salary</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: Property Docs */}
            <div>
              <h3 className="text-xl font-bold text-purple-900 mb-4">C. Property Documents</h3>
              <div className="space-y-3">
                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">9. Sale Agreement/Allotment Letter</p>
                    <p className="text-sm text-gray-600">Agreement between you and seller/builder</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">10. Property Title Deed</p>
                    <p className="text-sm text-gray-600">Proof of seller's ownership</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">11. Approved Building Plan</p>
                    <p className="text-sm text-gray-600">From local municipal authority</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">12. NOC from Builder/Society</p>
                    <p className="text-sm text-gray-600">No Objection Certificate for loan</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">13. Encumbrance Certificate (EC)</p>
                    <p className="text-sm text-gray-600">Proof that property has no legal dues (last 13 years)</p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 rounded-lg p-4 border border-purple-300">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">14. Property Tax Receipts</p>
                    <p className="text-sm text-gray-600">Latest paid receipts from municipal corporation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Self-Employed */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Documents for Self-Employed</h2>
          
          <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
            <p className="text-gray-700 mb-4">
              Self-employed need ALL salaried documents (except salary slips/Form 16) PLUS these:
            </p>

            <div className="space-y-3">
              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">15. Income Tax Returns (ITR) - Last 2 Years</p>
                  <p className="text-sm text-gray-600">Acknowledged by Income Tax Department with computation</p>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">16. Business Proof</p>
                  <ul className="text-sm text-gray-700 ml-4 mt-1">
                    <li>• GST Registration Certificate</li>
                    <li>• Shop/Establishment License</li>
                    <li>• Partnership Deed (if partnership)</li>
                    <li>• MOA/AOA (if company)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">17. Business Bank Statements (Last 12 months)</p>
                  <p className="text-sm text-gray-600">Current account statements showing business transactions</p>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">18. Balance Sheet & P&L (Last 2 years)</p>
                  <p className="text-sm text-gray-600">Audited by CA (if turnover &gt; ₹1 crore)</p>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">19. GST Returns (Last 6 months)</p>
                  <p className="text-sm text-gray-600">GSTR-1, GSTR-3B filed returns</p>
                </div>
              </div>

              <div className="flex items-start bg-white rounded-lg p-4 border-2 border-orange-400">
                <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">20. Business Continuity Proof</p>
                  <p className="text-sm text-gray-600">Business must be operational for 3+ years (minimum 2 for some banks)</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
              <p className="font-bold text-yellow-900">⚠️ Important:</p>
              <p className="text-gray-800 text-sm mt-1">
                Self-employed applications take 5-10 days longer for verification. Start early!
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pro Tips for Document Submission</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">1. Make Multiple Sets</h3>
              <p className="text-gray-700">Create 3 sets: 1 for bank, 1 for legal verification, 1 for your records. Saves time if original is lost!</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">2. Self-Attest All Copies</h3>
              <p className="text-gray-700">Sign across each photocopied document. No need for notarization for most docs.</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">3. Organize by Category</h3>
              <p className="text-gray-700">Use separate folders: KYC, Income Proof, Property Docs. Makes verification faster.</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">4. Keep Digital Backup</h3>
              <p className="text-gray-700">Scan all documents and keep in Google Drive. Many banks accept digital submissions for initial review.</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5">
              <h3 className="font-bold text-blue-900 mb-2">5. Check Validity Dates</h3>
              <p className="text-gray-700">Bank statements: Within 30 days. Salary slips: Last 3 months. Expired documents = rejection!</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: I don't have 6 months bank statements. Will 3 months work?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Depends on bank.</strong> Some banks accept 3 months IF:<br/>
                • Your CIBIL is 750+<br/>
                • Salary is credited regularly<br/>
                • You provide last 2 years Form 16<br/>
                <br/>
                But 6 months is standard. If you have only 3, apply to multiple banks - some will approve!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: I get salary in cash. How to prove income?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: Difficult but not impossible.</strong> Options:<br/>
                1. Deposit cash monthly in bank for 6 months before applying<br/>
                2. Get salary certificate from employer (notarized)<br/>
                3. Show ITR if you file taxes<br/>
                4. Some HFCs/NBFCs consider cash salary if employer provides sworn affidavit<br/>
                <br/>
                <strong>Best approach:</strong> Start depositing fixed amount monthly NOW. After 6 months, you'll have bank statement proof!
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: Do I need all property documents before applying?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: NO! Apply with basic docs first.</strong><br/>
                <br/>
                <strong>For Initial Application:</strong><br/>
                • Your KYC + Income proof<br/>
                • Property details (address, price, seller name)<br/>
                • Sale agreement (if signed)<br/>
                <br/>
                <strong>Bank will ask for full property docs only AFTER:</strong><br/>
                • Your eligibility is confirmed<br/>
                • In-principle approval given<br/>
                <br/>
                This saves time! Don't delay application waiting for seller's documents.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5 cursor-pointer">
              <summary className="font-bold text-gray-900 text-lg">Q: My salary account is with Bank A, applying to Bank B. Problem?</summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>A: NO problem at all!</strong> You can apply to ANY bank regardless of salary account.<br/>
                <br/>
                <strong>But consider this:</strong><br/>
                • Salary account bank often gives 0.10-0.25% discount<br/>
                • Faster processing (they already have your history)<br/>
                • May waive processing fees<br/>
                <br/>
                <strong>Smart move:</strong> Apply to BOTH Bank A and 2-3 others. Compare final offers!
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
                <span className="text-gray-800">3 categories: KYC (PAN, Aadhaar), Income (salary slips, bank statements), Property (sale deed, NOC)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Salaried: 14 documents. Self-employed: 20 documents (ITR, GST returns mandatory)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Bank statements must be within 30 days, salary slips last 3 months</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Make 3 sets, self-attest, organize by category, keep digital backup</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Can apply with basic docs first. Full property docs needed only after pre-approval</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Application Process Next! 🚀</h2>
          <p className="text-blue-100 mb-6">
            Documents ready? Now learn the complete step-by-step application process from start to disbursement!
          </p>
          <a
            href="/learn/home-loans/application-process"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Application Process →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default DocumentsRequired;



