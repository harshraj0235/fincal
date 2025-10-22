import React from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../components/learn/LearnLayout';

const DocumentsRequired: React.FC = () => {
  const lessonData = {
    title: "Business Loan Documents Required - व्यापारिक ऋण के लिए आवश्यक दस्तावेज",
    category: "business-loans",
    currentLesson: "documents-required",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Business Loans", url: "/learn/business-loans" },
      { name: "Documents Required", url: "/learn/business-loans/documents-required" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Business Loan Documents Required 2024 - Complete Checklist for Business Loan Application | MoneyCal</title>
        <meta name="description" content="Complete checklist of documents required for business loan application. Know all mandatory documents, KYC papers, financial statements, and business registration documents needed." />
        <meta name="keywords" content="business loan documents, business loan application documents, MSME loan documents, startup loan documents, business loan checklist, loan application papers" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Business Loan Documents Required",
            "description": "Complete guide to documents needed for business loan application",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Identity and Address Proof",
                "text": "Collect KYC documents like PAN, Aadhaar, and address proof"
              },
              {
                "@type": "HowToStep", 
                "name": "Business Registration Documents",
                "text": "Gather business registration, GST, and trade license documents"
              },
              {
                "@type": "HowToStep",
                "name": "Financial Documents",
                "text": "Prepare bank statements, ITR returns, and financial statements"
              }
            ]
          })}
        </script>
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Business Loan Documents Required
              <span className="block text-xl mt-2 text-green-100">व्यापारिक ऋण के लिए आवश्यक दस्तावेज</span>
            </h1>
            <p className="text-lg text-green-100">
              Complete checklist of all documents required for business loan application. 
              Ensure you have all mandatory papers ready to speed up your loan approval process.
            </p>
          </div>

          {/* Quick Checklist */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Document Checklist / दस्तावेज चेकलिस्ट</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Personal Documents / व्यक्तिगत दस्तावेज</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">PAN Card / पैन कार्ड</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Aadhaar Card / आधार कार्ड</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Voter ID / मतदाता पहचान पत्र</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Driving License / ड्राइविंग लाइसेंस</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Passport / पासपोर्ट</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Business Documents / व्यापारिक दस्तावेज</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Business Registration / व्यापार पंजीकरण</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">GST Registration / जीएसटी पंजीकरण</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Trade License / व्यापार लाइसेंस</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Partnership Deed / साझेदारी दस्तावेज</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Board Resolution / बोर्ड प्रस्ताव</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Documents */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Documents / व्यक्तिगत दस्तावेज
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Identity Proof / पहचान प्रमाण</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">PAN Card / पैन कार्ड</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Mandatory for all loan applications</li>
                      <li>• Should be in applicant's name</li>
                      <li>• Clear photocopy required</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Aadhaar Card / आधार कार्ड</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Primary identity document</li>
                      <li>• Both front and back copy</li>
                      <li>• Should be linked with mobile</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Address Proof / पता प्रमाण</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Utility Bills / उपयोगिता बिल</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Electricity bill (last 3 months)</li>
                      <li>• Water bill or gas bill</li>
                      <li>• Should be in applicant's name</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Bank Statement / बैंक स्टेटमेंट</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Last 6 months statement</li>
                      <li>• Should show current address</li>
                      <li>• From primary bank account</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Income Proof / आय प्रमाण</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">ITR Returns / आयकर रिटर्न</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Last 2-3 years ITR</li>
                      <li>• Form 16 (if applicable)</li>
                      <li>• Should be filed on time</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Salary Certificate / वेतन प्रमाण पत्र</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Current salary certificate</li>
                      <li>• Last 3 months payslips</li>
                      <li>• Employment letter</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Documents */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Business Documents / व्यापारिक दस्तावेज
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Business Registration / व्यापार पंजीकरण</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Sole Proprietorship / एकल स्वामित्व</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Shop & Establishment License</li>
                      <li>• Business registration certificate</li>
                      <li>• Current account bank statement</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Partnership Firm / साझेदारी फर्म</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Partnership deed</li>
                      <li>• Partnership registration certificate</li>
                      <li>• PAN of all partners</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Private Limited / प्राइवेट लिमिटेड</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Certificate of Incorporation</li>
                      <li>• MOA & AOA</li>
                      <li>• Board resolution for loan</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">LLP / सीमित देयता भागीदारी</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• LLP agreement</li>
                      <li>• Certificate of incorporation</li>
                      <li>• PAN of LLP</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Tax & Compliance / कर और अनुपालन</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">GST Registration / जीएसटी पंजीकरण</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• GST registration certificate</li>
                      <li>• GST returns (last 6 months)</li>
                      <li>• GST payment challans</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Professional Tax / व्यावसायिक कर</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Professional tax registration</li>
                      <li>• Payment receipts</li>
                      <li>• Compliance certificates</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Business Licenses / व्यापार लाइसेंस</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Trade License / व्यापार लाइसेंस</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Municipal trade license</li>
                      <li>• Industry-specific licenses</li>
                      <li>• Renewal certificates</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">MSME Registration / एमएसएमई पंजीकरण</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Udyam registration certificate</li>
                      <li>• MSME benefits certificate</li>
                      <li>• Industry classification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Documents */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Financial Documents / वित्तीय दस्तावेज
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-teal-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Bank Statements / बैंक स्टेटमेंट</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Business Account / व्यापार खाता</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Last 12 months statement</li>
                      <li>• All pages with bank stamp</li>
                      <li>• Should show regular transactions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Personal Account / व्यक्तिगत खाता</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Last 6 months statement</li>
                      <li>• Salary credits visible</li>
                      <li>• No bounced cheques</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Financial Statements / वित्तीय विवरण</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Profit & Loss Statement / लाभ-हानि विवरण</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Last 2-3 years P&L</li>
                      <li>• Audited (if applicable)</li>
                      <li>• Signed by authorized person</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Balance Sheet / तुलन पत्र</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Last 2-3 years balance sheet</li>
                      <li>• Assets and liabilities details</li>
                      <li>• CA certified (preferred)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Tax Documents / कर दस्तावेज</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Income Tax Returns / आयकर रिटर्न</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Last 3 years ITR</li>
                      <li>• Form 16/16A</li>
                      <li>• Tax payment challans</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">TDS Certificates / टीडीएस प्रमाण पत्र</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Form 16A (if applicable)</li>
                      <li>• TDS payment receipts</li>
                      <li>• TAN registration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Requirements by Loan Type */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Document Requirements by Loan Type / ऋण प्रकार के अनुसार दस्तावेज
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Loan Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Basic Documents</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Additional Documents</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Working Capital / कार्यशील पूंजी</td>
                    <td className="border border-gray-300 px-4 py-3">KYC, Business Registration, Bank Statements</td>
                    <td className="border border-gray-300 px-4 py-3">Stock statements, Sales invoices</td>
                    <td className="border border-gray-300 px-4 py-3">7-15 days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Term Loan / अवधि ऋण</td>
                    <td className="border border-gray-300 px-4 py-3">KYC, Business Registration, Financial Statements</td>
                    <td className="border border-gray-300 px-4 py-3">Project report, Quotations</td>
                    <td className="border border-gray-300 px-4 py-3">15-30 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Equipment Loan / उपकरण ऋण</td>
                    <td className="border border-gray-300 px-4 py-3">KYC, Business Registration, Bank Statements</td>
                    <td className="border border-gray-300 px-4 py-3">Equipment quotations, Technical specs</td>
                    <td className="border border-gray-300 px-4 py-3">10-20 days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Startup Loan / स्टार्टअप ऋण</td>
                    <td className="border border-gray-300 px-4 py-3">KYC, Business Plan, Bank Statements</td>
                    <td className="border border-gray-300 px-4 py-3">Market research, Financial projections</td>
                    <td className="border border-gray-300 px-4 py-3">20-45 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Document Preparation Tips */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Document Preparation Tips / दस्तावेज तैयारी के टिप्स
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Before Application / आवेदन से पहले</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Keep all documents updated and valid</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Make clear photocopies of all documents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Organize documents in proper order</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Ensure all signatures are present</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">During Application / आवेदन के दौरान</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Submit original documents when required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Provide additional documents if requested</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Keep copies of all submitted documents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Follow up regularly on application status</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Common Document Mistakes */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Common Document Mistakes to Avoid / बचने योग्य सामान्य दस्तावेज गलतियां
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Document Issues / दस्तावेज समस्याएं</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Expired documents or certificates</li>
                  <li>• Unclear or blurred photocopies</li>
                  <li>• Missing signatures on important documents</li>
                  <li>• Incomplete bank statements</li>
                  <li>• Mismatched names across documents</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Application Issues / आवेदन समस्याएं</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Incomplete application forms</li>
                  <li>• Wrong loan amount or tenure</li>
                  <li>• Incorrect business details</li>
                  <li>• Missing co-applicant documents</li>
                  <li>• Delayed document submission</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions / अक्सर पूछे जाने वाले प्रश्न
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What are the most important documents for business loan?
                </h3>
                <p className="text-gray-600">
                  The most important documents are KYC documents (PAN, Aadhaar), business registration certificate, bank statements (last 12 months), ITR returns (last 2-3 years), and financial statements. These form the core requirement for most business loans.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I apply for business loan without GST registration?
                </h3>
                <p className="text-gray-600">
                  While GST registration is preferred, some banks may consider applications without it for smaller loan amounts. However, having GST registration significantly improves your chances of approval and may get you better interest rates.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  How long should my bank statements be for business loan?
                </h3>
                <p className="text-gray-600">
                  Most banks require bank statements for the last 12 months for business accounts and 6 months for personal accounts. The statements should show regular business transactions and healthy account balance.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Do I need audited financial statements for business loan?
                </h3>
                <p className="text-gray-600">
                  Audited financial statements are preferred but not always mandatory. For smaller loan amounts, self-certified financial statements may be accepted. However, audited statements increase credibility and may help in getting better terms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What if some documents are missing or incomplete?
                </h3>
                <p className="text-gray-600">
                  If documents are missing, the bank will typically ask for additional documents or clarifications. It's better to prepare all documents in advance to avoid delays. Some banks may accept provisional documents with a commitment to submit originals later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default DocumentsRequired;
