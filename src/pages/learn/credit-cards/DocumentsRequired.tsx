import React from 'react';
import { FileText, CheckCircle, AlertCircle, Upload, User, Briefcase } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const DocumentsRequired: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Documents Required in India 2024 - Complete List | MoneyCal"
        description="Complete list of documents required for credit card application in India. KYC documents, income proof, address proof for salaried and self-employed. Get approved faster!"
        keywords="credit card documents required, credit card application documents, KYC documents for credit card, income proof credit card, address proof"
        canonicalUrl="/learn/credit-cards/documents-required"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card Documents Required - Complete Checklist',
          description: 'Comprehensive guide to all documents needed for credit card application in India',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="documents-required"
        breadcrumb={['Learn', 'Credit Cards', 'Documents Required']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Get Your Documents Ready - Approval in 24 Hours!</h3>
          <p className="text-gray-700">
                Having the right documents ready speeds up approval from 7-15 days to just 24-48 hours! 
                This complete checklist ensures you have everything needed. ???
          </p>
            </div>
          </div>
        </div>

        {/* Essential Documents Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Essential Documents Overview (?????? ????????)
          </h2>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">3 Main Categories of Documents:</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-lg border-2 border-blue-300">
                <User className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-lg text-gray-900 mb-2">1. Identity Proof</h4>
                <p className="text-sm text-gray-700 mb-3">Who you are (KYC)</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• PAN Card (Mandatory)</li>
                  <li>• Aadhaar Card</li>
                  <li>• Passport</li>
                  <li>• Voter ID</li>
                  <li>• Driving License</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300">
                <Briefcase className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-bold text-lg text-gray-900 mb-2">2. Income Proof</h4>
                <p className="text-sm text-gray-700 mb-3">Can you repay?</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Salary Slips (3 months)</li>
                  <li>• Bank Statements (6 months)</li>
                  <li>• ITR (2-3 years)</li>
                  <li>• Form 16</li>
                  <li>• Employment Letter</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-orange-300">
                <FileText className="h-8 w-8 text-orange-600 mb-3" />
                <h4 className="font-bold text-lg text-gray-900 mb-2">3. Address Proof</h4>
                <p className="text-sm text-gray-700 mb-3">Where you live</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Aadhaar Card</li>
                  <li>• Utility Bills</li>
                  <li>• Rental Agreement</li>
                  <li>• Bank Statement</li>
                  <li>• Passport</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
              <p className="font-bold text-gray-900 mb-2">? Quick Tip:</p>
              <p className="text-sm text-gray-700">
                PAN Card is <strong>MANDATORY</strong> for all credit card applications. Aadhaar is also becoming mandatory per RBI guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Document List */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Complete Document Checklist (????? ????)
          </h2>

          <div className="space-y-6">
            {/* Identity Documents */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <User className="h-7 w-7 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Identity Documents (????? ????)</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-300">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-bold text-green-900 text-lg">? PAN Card</p>
                      <p className="text-sm text-gray-600">Permanent Account Number</p>
                    </div>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">MANDATORY</span>
                  </div>
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="text-gray-700"><strong>Why Needed:</strong> Primary identity & income tax verification</p>
                    <p className="text-gray-700"><strong>Format:</strong> Self-attested photocopy or scanned copy</p>
                    <p className="text-gray-700"><strong>Note:</strong> 100% mandatory - No credit card without PAN</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-bold text-blue-900 text-lg">? Aadhaar Card</p>
                      <p className="text-sm text-gray-600">Unique Identification Number</p>
                    </div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">HIGHLY RECOMMENDED</span>
                  </div>
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="text-gray-700"><strong>Why Needed:</strong> Identity + Address proof (2-in-1)</p>
                    <p className="text-gray-700"><strong>Format:</strong> Front & back copy, e-Aadhaar accepted</p>
                    <p className="text-gray-700"><strong>Benefit:</strong> Faster KYC verification with e-KYC</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-purple-900 mb-2">Alternative Identity Proofs (if Aadhaar not available):</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Passport</p>
                      <p className="text-xs text-gray-600">Valid passport with photo</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Voter ID</p>
                      <p className="text-xs text-gray-600">Election Commission ID card</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Driving License</p>
                      <p className="text-xs text-gray-600">Valid DL with photo</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900">Government ID</p>
                      <p className="text-xs text-gray-600">Any govt-issued photo ID</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Income Documents */}
            <div className="bg-white border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="h-7 w-7 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Income Proof Documents (?? ??????)</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-bold text-blue-900 text-lg mb-3">For Salaried Individuals:</p>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">1. Salary Slips</p>
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">PRIMARY</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Duration:</strong> Latest 3 months</li>
                        <li>• <strong>Format:</strong> Original or company-sealed copies</li>
                        <li>• <strong>Details needed:</strong> CTC, in-hand salary, deductions</li>
                        <li>• <strong>Tip:</strong> Ensure salary credited to bank matches slip amount</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">2. Bank Statements</p>
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">PRIMARY</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Duration:</strong> Latest 6 months</li>
                        <li>• <strong>Type:</strong> Salary account preferred</li>
                        <li>• <strong>Format:</strong> Bank-stamped or PDF from net banking</li>
                        <li>• <strong>Shows:</strong> Regular salary credits, spending pattern</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">3. Form 16</p>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">SUPPORTING</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Duration:</strong> Latest financial year</li>
                        <li>• <strong>Purpose:</strong> TDS certificate from employer</li>
                        <li>• <strong>Shows:</strong> Annual income, tax deductions</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">4. Employment Letter</p>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">OPTIONAL</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Format:</strong> On company letterhead</li>
                        <li>• <strong>Contents:</strong> Designation, salary, joining date</li>
                        <li>• <strong>Helps:</strong> Verify employment stability</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-bold text-orange-900 text-lg mb-3">For Self-Employed/Business Owners:</p>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border-2 border-orange-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">1. ITR (Income Tax Returns)</p>
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">MANDATORY</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Duration:</strong> Latest 2-3 years</li>
                        <li>• <strong>Type:</strong> ITR-3 or ITR-4 for business</li>
                        <li>• <strong>Format:</strong> Acknowledged copy with computation</li>
                        <li>• <strong>Minimum:</strong> ?3-6 lakhs annual income shown</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded border-2 border-orange-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">2. Bank Statements</p>
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">MANDATORY</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Duration:</strong> Latest 6-12 months</li>
                        <li>• <strong>Type:</strong> Business current account + personal</li>
                        <li>• <strong>Shows:</strong> Regular business transactions</li>
                        <li>• <strong>Tip:</strong> Higher turnover = better approval</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded border-2 border-orange-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">3. Business Proof</p>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">REQUIRED</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Business registration certificate</li>
                        <li>• GST registration (if applicable)</li>
                        <li>• Shop & Establishment license</li>
                        <li>• Partnership deed/MOA-AOA</li>
                      </ul>
                    </div>

                    <div className="bg-white p-3 rounded border-2 border-orange-300">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-900">4. Financial Statements</p>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">OPTIONAL</span>
                      </div>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Audited balance sheet</li>
                        <li>• Profit & Loss statement</li>
                        <li>• CA certified documents</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Documents */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-7 w-7 text-orange-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Address Proof Documents (??? ??????)</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-900 mb-3">? Accepted Address Proofs:</p>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded border-2 border-green-300">
                      <p className="font-bold text-gray-900 mb-1">Aadhaar Card</p>
                      <p className="text-xs text-gray-600">Most preferred (Identity + Address)</p>
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-green-300">
                      <p className="font-bold text-gray-900 mb-1">Passport</p>
                      <p className="text-xs text-gray-600">Valid passport with current address</p>
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <p className="font-bold text-gray-900 mb-1">Utility Bills</p>
                      <p className="text-xs text-gray-600">Electricity, water, gas (max 3 months old)</p>
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <p className="font-bold text-gray-900 mb-1">Bank Statement</p>
                      <p className="text-xs text-gray-600">Latest statement with address</p>
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <p className="font-bold text-gray-900 mb-1">Rental Agreement</p>
                      <p className="text-xs text-gray-600">Registered rent agreement</p>
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-blue-300">
                      <p className="font-bold text-gray-900 mb-1">Property Documents</p>
                      <p className="text-xs text-gray-600">Sale deed, property tax receipt</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-100 p-3 rounded border border-yellow-400">
                  <p className="font-bold text-gray-900 mb-2">?? Important Notes:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Document should show your <strong>current</strong> address</li>
                    <li>• Utility bills should not be older than <strong>3 months</strong></li>
                    <li>• If address differs from Aadhaar, provide additional proof</li>
                    <li>• For rented accommodation, rental agreement mandatory</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Documents */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Additional Documents (???????? ????????)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-bold text-purple-900 mb-3">May Be Required in Some Cases:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900 mb-1">?? Photographs</p>
                    <p className="text-sm text-gray-600">Passport size (2-4 copies)</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900 mb-1">?? Signature</p>
                    <p className="text-sm text-gray-600">On blank paper for verification</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900 mb-1">?? Office Address</p>
                    <p className="text-sm text-gray-600">Proof of office address</p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-gray-900 mb-1">?? Office Landline</p>
                    <p className="text-sm text-gray-600">For verification calls</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900 mb-3">For Premium/High-Limit Cards:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Existing credit card statements (if upgrading)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Investment proofs (FDs, mutual funds, stocks)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Property ownership documents</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Higher income proof (?10L+ annual)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Document Submission Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Document Submission Best Practices
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">? Do These:</h3>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Self-Attest All Documents</p>
                  <p className="text-sm text-gray-600">Sign across photocopies with date</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Ensure Clear, Legible Copies</p>
                  <p className="text-sm text-gray-600">All text and photos should be clearly visible</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Keep Documents Up-to-Date</p>
                  <p className="text-sm text-gray-600">Recent salary slips & bank statements (not older than 3 months)</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Match Details Across Documents</p>
                  <p className="text-sm text-gray-600">Name, address should be consistent everywhere</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Scan/Upload in Correct Format</p>
                  <p className="text-sm text-gray-600">PDF or JPG, max 2-5MB per document</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Keep Original Copies Ready</p>
                  <p className="text-sm text-gray-600">May be required for verification visit</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Document Issues & Solutions
          </h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900 mb-1">? Issue: Address Mismatch</p>
                  <p className="text-sm text-gray-700 mb-2">Aadhaar shows old address, currently living elsewhere</p>
                  <p className="text-sm text-green-700 font-semibold">? Solution: Provide recent utility bill + rental agreement for current address</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900 mb-1">? Issue: No ITR for Self-Employed</p>
                  <p className="text-sm text-gray-700 mb-2">New business, haven't filed ITR yet</p>
                  <p className="text-sm text-green-700 font-semibold">? Solution: Provide 12-month bank statements showing regular business income + GST registration</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900 mb-1">? Issue: Low Salary in Slips</p>
                  <p className="text-sm text-gray-700 mb-2">In-hand salary below bank's requirement</p>
                  <p className="text-sm text-green-700 font-semibold">? Solution: Show additional income sources (rent, freelancing) or apply with co-applicant</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900 mb-1">? Issue: Blurry/Unclear Scans</p>
                  <p className="text-sm text-gray-700 mb-2">Photos or scans not legible</p>
                  <p className="text-sm text-green-700 font-semibold">? Solution: Use scanning apps (CamScanner, Adobe Scan) for clear, well-lit copies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/eligibility-criteria" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Eligibility Criteria</p>
                <p className="text-sm text-gray-600">Check if you qualify</p>
              </a>
              <a href="/learn/credit-cards/application-process" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Application Process</p>
                <p className="text-sm text-gray-600">Complete application guide</p>
              </a>
              <a href="/learn/credit-cards/choose-best-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Choose Best Card</p>
                <p className="text-sm text-gray-600">Find perfect card for you</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Better approval chances</p>
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
              <span className="text-gray-800">3 main categories: Identity (PAN mandatory), Income proof, Address proof</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Salaried: 3-month salary slips + 6-month bank statements + Form 16</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Self-employed: 2-3 years ITR + 6-12 month statements + business proof</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Aadhaar highly recommended (2-in-1 identity + address proof)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Self-attest all documents, ensure clear copies, match details across documents</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Having documents ready = 24-48 hour approval vs 7-15 days!</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-green-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Documents Ready? Check Eligibility! ?</h2>
          <p className="text-blue-100 mb-6">
            Now that you know what documents you need, check if you meet the eligibility criteria!
          </p>
          <a
            href="/learn/credit-cards/eligibility-criteria"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Next: Eligibility Criteria ?
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default DocumentsRequired;
