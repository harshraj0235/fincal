import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Smartphone, Building, CreditCard } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ApplicationProcess: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Application Process: Step-by-Step Guide 2025 | MoneyCal"
        description="Complete personal loan application process in India - online vs offline, step-by-step guide, timeline, documents, approval process. Get your loan approved quickly!"
        keywords="personal loan application process, how to apply personal loan, personal loan application steps, personal loan approval process India"
        canonicalUrl="https://moneycal.in/learn/personal-loans/application-process"
      />
      
      <LearnLayout
        category="personal-loans"
        currentLesson="application-process"
        breadcrumb={['Learn', 'Personal Loans', 'Application Process']}
      >
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Personal Loan Application Process</h2>
            <p className="text-gray-700 text-lg">
              Applying for a personal loan is now easier than ever! You can apply online in 15 minutes or visit a branch. Here's the complete step-by-step process to get your loan approved quickly. 🚀
            </p>
          </div>
        </section>

        {/* Application Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Methods</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Online Application */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 p-3 rounded-xl mr-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900">Online Application</h3>
                  <p className="text-green-700 text-sm">Fast & Convenient ⚡</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Apply in 15 minutes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Upload documents digitally</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Track application status</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>24/7 availability</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span>Instant eligibility check</span>
                </div>
              </div>
            </div>

            {/* Offline Application */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 p-3 rounded-xl mr-4">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900">Branch Application</h3>
                  <p className="text-blue-700 text-sm">Personal Assistance 🏢</p>
                </div>
              </div>
              <div className="space-y-2 text-gray-800">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Face-to-face guidance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Document verification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Immediate clarifications</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Relationship building</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>Better negotiation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Application Process</h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-purple-900 mb-2">Pre-Application</h3>
                <p className="text-sm text-gray-700">Check eligibility, compare rates, gather documents</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-purple-900 mb-2">Application</h3>
                <p className="text-sm text-gray-700">Fill form, upload documents, submit application</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-purple-900 mb-2">Verification</h3>
                <p className="text-sm text-gray-700">Document check, credit assessment, verification calls</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="font-bold text-purple-900 mb-2">Approval</h3>
                <p className="text-sm text-gray-700">Final approval, loan agreement, disbursement</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Application Steps</h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-blue-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Pre-Application Preparation</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Check Eligibility:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Use online eligibility calculator</li>
                        <li>• Verify income requirements</li>
                        <li>• Check CIBIL score (700+)</li>
                        <li>• Calculate EMI affordability</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Compare Options:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Compare interest rates</li>
                        <li>• Check processing fees</li>
                        <li>• Review terms & conditions</li>
                        <li>• Read customer reviews</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-green-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Application Submission</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Fill Application Form:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Personal details</li>
                        <li>• Employment information</li>
                        <li>• Loan amount & tenure</li>
                        <li>• Bank account details</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Upload Documents:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Identity proof (PAN, Aadhaar)</li>
                        <li>• Address proof</li>
                        <li>• Income documents</li>
                        <li>• Bank statements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-orange-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Verification Process</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Document Verification:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Cross-check all documents</li>
                        <li>• Verify employment details</li>
                        <li>• Check bank statements</li>
                        <li>• Validate income proof</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Credit Assessment:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• CIBIL score check</li>
                        <li>• Credit history analysis</li>
                        <li>• Existing loan verification</li>
                        <li>• Risk assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <div className="flex items-start">
                <div className="bg-purple-500 p-3 rounded-xl mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Approval & Disbursement</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Final Approval:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Loan sanction letter</li>
                        <li>• Interest rate confirmation</li>
                        <li>• EMI schedule</li>
                        <li>• Terms & conditions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Disbursement:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Sign loan agreement</li>
                        <li>• Pay processing fees</li>
                        <li>• Money credited to account</li>
                        <li>• Start EMI payments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Timeline</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Stage</th>
                  <th className="border border-gray-300 p-3 text-left">Online Application</th>
                  <th className="border border-gray-300 p-3 text-left">Branch Application</th>
                  <th className="border border-gray-300 p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Application Submission</td>
                  <td className="border border-gray-300 p-3 bg-green-50">15 minutes</td>
                  <td className="border border-gray-300 p-3 bg-blue-50">30-60 minutes</td>
                  <td className="border border-gray-300 p-3">Fill form, upload documents</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Initial Verification</td>
                  <td className="border border-gray-300 p-3 bg-green-50">2-4 hours</td>
                  <td className="border border-gray-300 p-3 bg-blue-50">Same day</td>
                  <td className="border border-gray-300 p-3">Document check, eligibility</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Credit Assessment</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">1-2 days</td>
                  <td className="border border-gray-300 p-3 bg-yellow-50">1-2 days</td>
                  <td className="border border-gray-300 p-3">CIBIL check, risk analysis</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">Final Approval</td>
                  <td className="border border-gray-300 p-3 bg-green-50">1-3 days</td>
                  <td className="border border-gray-300 p-3 bg-green-50">1-3 days</td>
                  <td className="border border-gray-300 p-3">Loan sanction, rate confirmation</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Disbursement</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Same day</td>
                  <td className="border border-gray-300 p-3 bg-green-50">Same day</td>
                  <td className="border border-gray-300 p-3">Money credited to account</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold"><strong>Total Time</strong></td>
                  <td className="border border-gray-300 p-3 bg-green-50"><strong>2-5 days</strong></td>
                  <td className="border border-gray-300 p-3 bg-blue-50"><strong>3-7 days</strong></td>
                  <td className="border border-gray-300 p-3"><strong>End-to-end process</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips for Faster Approval */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for Faster Approval</h2>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-900 mb-3">Before Applying:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Improve CIBIL score to 750+</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Keep all documents ready</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Maintain good bank balance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Apply with existing bank</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-green-900 mb-3">During Application:</h3>
                <ul className="space-y-2 text-gray-800">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Fill form completely and accurately</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Upload clear document copies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Respond to verification calls quickly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Be available for any clarifications</span>
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
                <span className="text-gray-800">Personal loan application: 4 simple steps from eligibility check to disbursement</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Online application: 2-5 days total, Branch application: 3-7 days total</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Keep documents ready, improve CIBIL score, apply with existing bank for faster approval</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">Respond quickly to verification calls and be available for clarifications</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">CIBIL Score Impact Next! 📊</h2>
          <p className="text-purple-100 mb-6">
            Now that you know the application process, let's understand how your CIBIL score affects your personal loan approval and interest rates!
          </p>
          <a
            href="/learn/personal-loans/cibil-score-impact"
            className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-xl hover:bg-purple-50 transition-colors"
          >
            Next: CIBIL Score Impact →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default ApplicationProcess;

