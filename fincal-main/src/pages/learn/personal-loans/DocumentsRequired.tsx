import React from 'react';
import { FileText, User, Building, CreditCard, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const DocumentsRequired: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Documents Required: Complete Checklist 2025 | MoneyCal"
        description="Complete list of documents required for personal loan in India. Identity proof, address proof, income documents, bank statements. Download checklist!"
        keywords="personal loan documents required, personal loan documents list, documents for personal loan application, personal loan document checklist India"
        canonicalUrl="https://moneycal.in/learn/personal-loans/documents-required"
      />
      
      <LearnLayout
        category="personal-loans"
        currentLesson="documents-required"
        breadcrumb={['Learn', 'Personal Loans', 'Documents Required']}
      >
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Personal Loan Documents Checklist</h2>
            <p className="text-gray-700 text-lg">
              Personal loans require minimal documentation compared to home loans! Most banks need just 4-6 key documents. Keep them ready to speed up your application process. 📋
            </p>
          </div>
        </section>

        {/* Essential Documents */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Documents (Must Have)</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Identity Proof */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 p-3 rounded-xl mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900">Identity Proof</h3>
                  <p className="text-green-700 text-sm">Any ONE of these</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>PAN Card (Mandatory)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Aadhaar Card</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Driving License</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Passport</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Voter ID Card</span>
                </div>
              </div>
            </div>

            {/* Address Proof */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-xl mr-4">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Address Proof</h3>
                  <p className="text-blue-700 text-sm">Any ONE of these</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Aadhaar Card</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Utility Bill (Electricity/Water/Gas)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Bank Statement (3 months)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Rent Agreement + NOC</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Property Documents</span>
                </div>
              </div>
            </div>

            {/* Income Proof */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 p-3 rounded-xl mr-4">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-900">Income Proof</h3>
                  <p className="text-purple-700 text-sm">For Salaried Employees</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span>Salary Slips (3 months)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span>Bank Statements (6 months)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span>Form 16 (Latest)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span>Employment Certificate</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                  <span>ITR (2 years)</span>
                </div>
              </div>
            </div>

            {/* Bank Statements */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-orange-500 p-3 rounded-xl mr-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-900">Bank Statements</h3>
                  <p className="text-orange-700 text-sm">Primary Account</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span>6 months bank statements</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span>Salary account preferred</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span>No bounced cheques</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span>Regular salary credits</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                  <span>Maintain minimum balance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Self-Employed Documents */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents for Self-Employed</h2>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-indigo-900 mb-3">Business Documents:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Business Registration Certificate</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>GST Registration (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Business Bank Statements (12 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Audited Financial Statements</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-indigo-900 mb-3">Personal Documents:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>ITR (3 years) with computation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Personal Bank Statements (6 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Business Address Proof</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Partnership Deed (if applicable)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Document Preparation Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Preparation Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-green-900 mb-4 text-xl">✅ Do's:</h3>
              <div className="space-y-3">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Keep Documents Ready</p>
                  <p className="text-sm text-gray-700">Scan and save all documents in PDF format</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Check Validity</p>
                  <p className="text-sm text-gray-700">Ensure all documents are current and valid</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Clear Copies</p>
                  <p className="text-sm text-gray-700">Take clear, readable photos/scans</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Consistent Names</p>
                  <p className="text-sm text-gray-700">Ensure name spelling matches across all documents</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-red-900 mb-4 text-xl">❌ Don'ts:</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Submit Expired Documents</p>
                  <p className="text-sm text-gray-700">Check expiry dates on ID proofs</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Blurry Photos</p>
                  <p className="text-sm text-gray-700">Poor quality scans delay processing</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Missing Pages</p>
                  <p className="text-sm text-gray-700">Submit complete bank statements</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">Inconsistent Information</p>
                  <p className="text-sm text-gray-700">Address/name should match across documents</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digital vs Physical Documents */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Digital vs Physical Documents</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Document Type</th>
                  <th className="border border-gray-300 p-3 text-left">Digital (Online)</th>
                  <th className="border border-gray-300 p-3 text-left">Physical (Branch)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Identity Proof</td>
                  <td className="border border-gray-300 p-3 bg-green-50">PDF/Photo scan</td>
                  <td className="border border-gray-300 p-3 bg-blue-50">Original + Copy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Address Proof</td>
                  <td className="border border-gray-300 p-3 bg-green-50">PDF/Photo scan</td>
                  <td className="border border-gray-300 p-3 bg-blue-50">Original + Copy</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Salary Slips</td>
                  <td className="border border-gray-300 p-3 bg-green-50">PDF scan</td>
                  <td className="border border-gray-300 p-3 bg-blue-50">Original + Copy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Bank Statements</td>
                  <td className="border border-gray-300 p-3 bg-green-50">PDF download</td>
                  <td className="border border-gray-300 p-3 bg-blue-50">Bank stamped copy</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Form 16</td>
                  <td className="border border-gray-300 p-3 bg-green-50">PDF scan</td>
                  <td className="border border-gray-300 p-3 bg-blue-50">Original + Copy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">ITR</td>
                  <td className="border border-gray-300 p-3 bg-green-50">PDF download</td>
                  <td className="border border-gray-300 p-3 bg-blue-50">ITR-V copy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Document Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Document Checklist</h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-blue-900 mb-3">For Salaried Employees:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>PAN Card</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aadhaar Card</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Salary Slips (3 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Bank Statements (6 months)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Form 16</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Employment Certificate</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-3">For Self-Employed:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>PAN Card</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aadhaar Card</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>ITR (3 years)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Business Registration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Business Bank Statements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Audited Financials</span>
                  </li>
                </ul>
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
                <span className="text-gray-800">Personal loans need minimal documents: PAN, Aadhaar, salary slips, bank statements</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Self-employed need additional: ITR, business registration, audited financials</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Keep documents ready in digital format for faster online applications</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Ensure all documents are current, clear, and names match across all papers</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Application Process Next! 📝</h2>
          <p className="text-purple-100 mb-6">
            Now that you have your documents ready, let's understand the complete personal loan application process!
          </p>
          <a
            href="/learn/personal-loans/application-process"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: Application Process →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default DocumentsRequired;

