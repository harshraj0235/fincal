import React from 'react';
import { FileText, CheckCircle, AlertCircle, UserCheck, Home, Briefcase } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const DocumentsRequired: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Gold Loan Documents Required - Complete Checklist 2024 | MoneyCal"
        description="Complete list of documents required for gold loan in India. Simple checklist for salaried, self-employed individuals with step-by-step guide for quick loan approval."
        keywords="gold loan documents, gold loan papers required, gold loan documents list, documents for gold loan, gold loan eligibility documents"
        canonicalUrl="/learn/gold-loans/documents-required"
      />
      
      <LearnLayout
        category="gold-loans"
        currentLesson="documents-required"
        breadcrumb={['Learn', 'Gold Loans', 'Documents Required']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Gold loans need minimal documentation compared to other loans! Having the right papers ready ensures approval in just 15-30 minutes. This lesson covers everything you need! 📄✨
              </p>
            </div>
          </div>
        </div>

        {/* Essential Documents */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Essential Documents for Gold Loan (सभी के लिए)
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">1. Identity Proof (पहचान पत्र)</h3>
                  <p className="text-gray-700 mb-3">Any ONE of the following:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700">✅ <strong>Aadhaar Card</strong> (Most commonly accepted)</li>
                    <li className="text-gray-700">✅ <strong>PAN Card</strong> (Mandatory for loans &gt; ₹50,000)</li>
                    <li className="text-gray-700">✅ <strong>Voter ID Card</strong></li>
                    <li className="text-gray-700">✅ <strong>Passport</strong></li>
                    <li className="text-gray-700">✅ <strong>Driving License</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">2. Address Proof (निवास प्रमाण)</h3>
                  <p className="text-gray-700 mb-3">Any ONE of the following (not older than 3 months):</p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700">✅ <strong>Aadhaar Card</strong></li>
                    <li className="text-gray-700">✅ <strong>Electricity Bill</strong></li>
                    <li className="text-gray-700">✅ <strong>Telephone Bill</strong></li>
                    <li className="text-gray-700">✅ <strong>Bank Statement</strong> (with current address)</li>
                    <li className="text-gray-700">✅ <strong>Rent Agreement</strong> (registered)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">3. Passport Size Photographs</h3>
                  <p className="text-gray-700">
                    <strong>2-3 recent passport size photos</strong> (Some banks may skip this for digital KYC)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-yellow-300 rounded-xl p-6">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">4. Gold Jewelry (स्वर्ण आभूषण)</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Gold ornaments you want to pledge</strong>
                  </p>
                  <ul className="space-y-2 ml-4 text-gray-700">
                    <li>💍 Minimum purity: 18 Karat (75%)</li>
                    <li>💍 Gold coins/bars from banks also accepted</li>
                    <li>💍 Old jewelry purchase receipts (if available) help faster valuation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Salaried vs Self-Employed */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Documents by Category</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="h-7 w-7 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Salaried Individuals</h3>
              </div>
              <p className="text-gray-700 mb-4">Usually just basic documents are enough! Some banks may ask:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">Latest <strong>Salary Slip</strong> (1-2 months)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700"><strong>Bank Statement</strong> (3 months) for higher loans</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-blue-200 rounded-lg">
                <p className="text-sm text-gray-800">
                  💡 <strong>Tip:</strong> Most gold loans don't need income proof! Only for loans above ₹1 lakh.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <UserCheck className="h-7 w-7 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Self-Employed / Business</h3>
              </div>
              <p className="text-gray-700 mb-4">Similar minimal docs, but banks may request:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700"><strong>Business Proof</strong> (Shop license, GST registration)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700"><strong>Bank Statement</strong> (3-6 months) for large loans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-gray-700"><strong>ITR</strong> (Income Tax Return) - only for loans &gt; ₹5 lakhs</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-green-200 rounded-lg">
                <p className="text-sm text-gray-800">
                  💡 <strong>Tip:</strong> Business owners can get gold loans easier than personal loans!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Documents NOT Required */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What You DON'T Need ✅ (Great News!)
          </h2>

          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>No CIBIL Score Check</strong> - Perfect for those with low credit score!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>No Income Proof</strong> - For loans up to ₹1 lakh usually</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>No Property Papers</strong> - Unlike home loans!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>No Guarantor Required</strong> - Gold itself is security</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800"><strong>No Processing Fee Documents</strong> - Most banks charge minimal fees</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Quick Checklist */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">📋 Quick Checklist Before Visiting Bank</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-xl mb-3">✅ Must Carry:</h3>
                <ul className="space-y-2">
                  <li>□ Aadhaar Card (Original + Xerox)</li>
                  <li>□ PAN Card (Original + Xerox)</li>
                  <li>□ Address Proof</li>
                  <li>□ 2 Passport Photos</li>
                  <li>□ Gold Jewelry to pledge</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-3">⚡ Good to Have:</h3>
                <ul className="space-y-2">
                  <li>□ Bank passbook/statement</li>
                  <li>□ Gold purchase bills (if available)</li>
                  <li>□ Cancelled cheque</li>
                  <li>□ Salary slip (for higher loans)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Online vs Offline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Online vs Offline Documentation</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Document Type</th>
                  <th className="border border-gray-300 p-3 text-center">Online Application</th>
                  <th className="border border-gray-300 p-3 text-center">Branch Visit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Aadhaar Card</td>
                  <td className="border border-gray-300 p-3 text-center">eKYC/Upload</td>
                  <td className="border border-gray-300 p-3 text-center">Original + Copy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">PAN Card</td>
                  <td className="border border-gray-300 p-3 text-center">Upload Scanned Copy</td>
                  <td className="border border-gray-300 p-3 text-center">Original + Copy</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Address Proof</td>
                  <td className="border border-gray-300 p-3 text-center">Upload PDF/Image</td>
                  <td className="border border-gray-300 p-3 text-center">Original + Copy</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Photograph</td>
                  <td className="border border-gray-300 p-3 text-center">Upload Digital Photo</td>
                  <td className="border border-gray-300 p-3 text-center">2-3 Physical Photos</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Gold Jewelry</td>
                  <td className="border border-gray-300 p-3 text-center text-red-600">Must Visit Branch</td>
                  <td className="border border-gray-300 p-3 text-center text-green-600">Carry to Branch</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <p className="text-gray-800">
              <strong>💡 Pro Tip:</strong> Even for online applications, you must visit the branch with gold for valuation and loan disbursal!
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <details className="bg-white border-2 border-gray-300 rounded-lg p-5">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Can I get gold loan with only Aadhaar card?
              </summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>Yes!</strong> For loans up to ₹50,000, most banks accept just Aadhaar + one address proof. 
                For loans above ₹50,000, PAN card is mandatory as per RBI rules.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Do I need gold purchase bill/invoice?
              </summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>NO!</strong> Gold purchase bill is NOT mandatory. Banks will check purity and weight themselves. 
                However, having bill helps in faster valuation.
              </p>
            </details>

            <details className="bg-white border-2 border-gray-300 rounded-lg p-5">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Can I apply with someone else's gold jewelry?
              </summary>
              <p className="text-gray-700 mt-3 pl-4">
                <strong>Yes, with permission!</strong> You need a consent letter from the actual owner + their ID proof. 
                Some banks allow family members' gold (spouse, parents) with proper documentation.
              </p>
            </details>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Only 3-4 basic documents needed: Aadhaar, PAN, Address Proof, Photos</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">No CIBIL score or income proof required for loans up to ₹1 lakh</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Gold purchase bills are helpful but not mandatory</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Keep original + photocopies ready to speed up approval</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready for Next Step? 🚀</h2>
          <p className="text-yellow-100 mb-6">
            Now that you know what documents you need, let's learn the complete application process!
          </p>
          <a
            href="/learn/gold-loans/application-process"
            className="inline-block bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-yellow-50 transition-colors"
          >
            Next: Application Process →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default DocumentsRequired;

