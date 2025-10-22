import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import LearnLayout from '../../components/learn/LearnLayout';

const ApplicationProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    loanType: '',
    loanAmount: '',
    businessType: '',
    businessAge: '',
    annualRevenue: '',
    creditScore: '',
    hasCollateral: false,
    collateralValue: ''
  });

  const steps = [
    { id: 1, title: 'Pre-Application', description: 'Research and preparation' },
    { id: 2, title: 'Document Collection', description: 'Gather required documents' },
    { id: 3, title: 'Application Submission', description: 'Submit loan application' },
    { id: 4, title: 'Verification', description: 'Bank verification process' },
    { id: 5, title: 'Approval', description: 'Loan approval and disbursement' }
  ];

  const lessonData = {
    title: "Business Loan Application Process - व्यापारिक ऋण आवेदन प्रक्रिया",
    category: "business-loans",
    currentLesson: "application-process",
    breadcrumb: [
      { name: "Learn", url: "/learn" },
      { name: "Business Loans", url: "/learn/business-loans" },
      { name: "Application Process", url: "/learn/business-loans/application-process" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Business Loan Application Process 2024 - Step by Step Guide to Apply for Business Loan | MoneyCal</title>
        <meta name="description" content="Complete step-by-step guide to business loan application process. Learn pre-application steps, document collection, verification process, and approval timeline for business loans in India." />
        <meta name="keywords" content="business loan application process, how to apply business loan, business loan steps, MSME loan application, startup loan process, business loan approval" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Business Loan Application Process",
            "description": "Step-by-step guide to apply for business loan",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Pre-Application Research",
                "text": "Research lenders, compare interest rates, and prepare business plan"
              },
              {
                "@type": "HowToStep", 
                "name": "Document Collection",
                "text": "Gather all required documents including KYC, business registration, and financial statements"
              },
              {
                "@type": "HowToStep",
                "name": "Application Submission",
                "text": "Submit loan application with all documents to chosen lender"
              },
              {
                "@type": "HowToStep",
                "name": "Verification Process",
                "text": "Bank verifies documents, conducts site visit, and evaluates creditworthiness"
              },
              {
                "@type": "HowToStep",
                "name": "Approval and Disbursement",
                "text": "Receive loan approval and disbursement after successful verification"
              }
            ]
          })}
        </script>
      </Helmet>

      <LearnLayout {...lessonData}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4">
              Business Loan Application Process
              <span className="block text-xl mt-2 text-indigo-100">व्यापारिक ऋण आवेदन प्रक्रिया</span>
            </h1>
            <p className="text-lg text-indigo-100">
              Complete step-by-step guide to apply for business loan. 
              Learn the entire process from pre-application research to loan disbursement.
            </p>
          </div>

          {/* Process Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Application Process Overview / आवेदन प्रक्रिया अवलोकन</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                    currentStep === step.id
                      ? 'bg-blue-600 text-white'
                      : currentStep > step.id
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div className="text-2xl font-bold mb-2">{step.id}</div>
                  <div className="text-sm font-semibold">{step.title}</div>
                  <div className="text-xs mt-1">{step.description}</div>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="border-t pt-6">
              {currentStep === 1 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Pre-Application Research / पूर्व-आवेदन अनुसंधान</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Research Lenders / ऋणदाताओं का शोध</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Compare interest rates from different banks</li>
                        <li>• Check processing fees and other charges</li>
                        <li>• Review eligibility criteria</li>
                        <li>• Read customer reviews and ratings</li>
                        <li>• Check loan tenure and EMI options</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Prepare Business Plan / व्यापार योजना तैयार करें</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Define business objectives and goals</li>
                        <li>• Prepare financial projections</li>
                        <li>• Identify funding requirements</li>
                        <li>• Plan loan utilization</li>
                        <li>• Prepare repayment strategy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Document Collection / दस्तावेज संग्रह</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Personal Documents / व्यक्तिगत दस्तावेज</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• PAN Card and Aadhaar Card</li>
                        <li>• Address proof (utility bills)</li>
                        <li>• Bank statements (6 months)</li>
                        <li>• ITR returns (2-3 years)</li>
                        <li>• Passport size photographs</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Business Documents / व्यापारिक दस्तावेज</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Business registration certificate</li>
                        <li>• GST registration and returns</li>
                        <li>• Trade license and permits</li>
                        <li>• Financial statements (2-3 years)</li>
                        <li>• Business bank statements (12 months)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Application Submission / आवेदन जमा करना</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Online Application / ऑनलाइन आवेदन</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Fill application form online</li>
                        <li>• Upload scanned documents</li>
                        <li>• Provide business and personal details</li>
                        <li>• Submit loan amount and tenure</li>
                        <li>• Pay application processing fee</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Branch Application / शाखा आवेदन</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Visit nearest bank branch</li>
                        <li>• Meet with loan officer</li>
                        <li>• Submit physical documents</li>
                        <li>• Complete application form</li>
                        <li>• Get application reference number</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 4: Verification Process / सत्यापन प्रक्रिया</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Document Verification / दस्तावेज सत्यापन</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Bank verifies all submitted documents</li>
                        <li>• Cross-check with government databases</li>
                        <li>• Verify business registration details</li>
                        <li>• Check credit score and history</li>
                        <li>• Validate financial statements</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Site Visit / साइट विजिट</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Bank representative visits business location</li>
                        <li>• Verifies business operations</li>
                        <li>• Checks inventory and assets</li>
                        <li>• Interviews business owner</li>
                        <li>• Prepares site visit report</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 5: Approval and Disbursement / अनुमोदन और वितरण</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Loan Approval / ऋण अनुमोदन</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Bank reviews all verification reports</li>
                        <li>• Credit committee makes decision</li>
                        <li>• Loan terms and conditions finalized</li>
                        <li>• Sanction letter issued</li>
                        <li>• Loan agreement prepared</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Disbursement / वितरण</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Sign loan agreement and documents</li>
                        <li>• Complete collateral formalities</li>
                        <li>• Pay processing and other fees</li>
                        <li>• Loan amount credited to account</li>
                        <li>• Start EMI payments as per schedule</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Timeline and Processing Time */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Processing Timeline / प्रसंस्करण समयसीमा
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Standard Processing Time / मानक प्रसंस्करण समय</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Application Review</span>
                    <span className="text-blue-600 font-semibold">1-2 days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Document Verification</span>
                    <span className="text-blue-600 font-semibold">3-5 days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Site Visit</span>
                    <span className="text-blue-600 font-semibold">2-3 days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Credit Assessment</span>
                    <span className="text-blue-600 font-semibold">2-4 days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Final Approval</span>
                    <span className="text-blue-600 font-semibold">1-2 days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="font-medium">Total Processing Time</span>
                    <span className="text-green-600 font-semibold">7-15 days</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Factors Affecting Processing Time / प्रसंस्करण समय को प्रभावित करने वाले कारक</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Document Completeness</h4>
                    <p className="text-sm text-yellow-700">Incomplete documents can delay processing by 3-5 days</p>
                  </div>
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Loan Amount</h4>
                    <p className="text-sm text-blue-700">Higher loan amounts require more detailed verification</p>
                  </div>
                  <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Credit Score</h4>
                    <p className="text-sm text-green-700">Good credit score speeds up approval process</p>
                  </div>
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Business Type</h4>
                    <p className="text-sm text-red-700">Certain business types require additional verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Checklist */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Application Checklist / आवेदन चेकलिस्ट
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Before Application / आवेदन से पहले</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Research and compare lenders</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Check credit score and improve if needed</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Prepare detailed business plan</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Organize all required documents</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Calculate EMI and repayment capacity</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">During Application / आवेदन के दौरान</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Fill application form accurately</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Submit all required documents</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Pay processing fees</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Keep application reference number</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-700">Be available for verification calls</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Common Application Mistakes */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Common Application Mistakes / सामान्य आवेदन गलतियां
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Application Form Errors / आवेदन फॉर्म त्रुटियां</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Incorrect personal or business details</li>
                  <li>• Wrong loan amount or tenure</li>
                  <li>• Incomplete application form</li>
                  <li>• Missing signatures on forms</li>
                  <li>• Providing false information</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Document Issues / दस्तावेज समस्याएं</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Submitting expired documents</li>
                  <li>• Unclear or blurred photocopies</li>
                  <li>• Missing required documents</li>
                  <li>• Incomplete bank statements</li>
                  <li>• Mismatched names across documents</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips for Faster Approval */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Tips for Faster Approval / तेज अनुमोदन के लिए टिप्स
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Improve Credit Profile / क्रेडिट प्रोफाइल सुधारें</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain credit score above 700</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Pay existing EMIs on time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Keep credit utilization below 30%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Avoid multiple loan applications</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Prepare Strong Application / मजबूत आवेदन तैयार करें</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Show consistent business revenue</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Provide detailed business plan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Maintain healthy bank balance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700">Be transparent about business challenges</span>
                  </li>
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
                  How long does it take to get business loan approval?
                </h3>
                <p className="text-gray-600">
                  Business loan approval typically takes 7-15 days from application submission. The timeline depends on document completeness, loan amount, credit score, and business type. Some banks offer faster processing for pre-approved customers.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I apply for business loan online?
                </h3>
                <p className="text-gray-600">
                  Yes, most banks offer online business loan applications. You can fill the application form, upload documents, and track application status online. However, some banks may require a branch visit for document verification and loan agreement signing.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What happens if my business loan application is rejected?
                </h3>
                <p className="text-gray-600">
                  If your application is rejected, the bank will provide reasons for rejection. You can work on improving those areas and reapply after 3-6 months. Common reasons include low credit score, insufficient revenue, or incomplete documentation.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Can I negotiate business loan terms?
                </h3>
                <p className="text-gray-600">
                  Yes, you can negotiate loan terms based on your business profile, creditworthiness, and relationship with the bank. Strong business performance, good credit score, and existing banking relationship can help in getting better terms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  What should I do if my application is taking longer than expected?
                </h3>
                <p className="text-gray-600">
                  If your application is delayed, contact the bank's customer service or your relationship manager. Provide any additional documents if requested and follow up regularly. Delays can occur due to document verification, site visits, or internal processing issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default ApplicationProcess;
