import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle, CreditCard, Smartphone } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ApplicationProcess: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Application Process 2024 - Step by Step Guide | MoneyCal"
        description="Complete guide to credit card application process in India. Learn eligibility criteria, required documents, online/offline application steps, approval timeline, and tips to get approved."
        keywords="credit card application process, credit card apply online, credit card eligibility, credit card documents required, credit card approval time"
        canonicalUrl="/learn/credit-cards/application-process"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Apply for Credit Card in India',
          description: 'Step-by-step guide to credit card application process',
          totalTime: 'PT30M',
          step: [
            { '@type': 'HowToStep', name: 'Check eligibility', text: 'Verify income and credit score requirements' },
            { '@type': 'HowToStep', name: 'Choose card', text: 'Select best credit card for your needs' },
            { '@type': 'HowToStep', name: 'Apply online', text: 'Fill application form with documents' },
            { '@type': 'HowToStep', name: 'Wait for approval', text: 'Processing takes 7-15 days' }
          ]
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="application-process"
        breadcrumb={['Learn', 'Credit Cards', 'Application Process']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Get Your First Credit Card in 15 Minutes!</h3>
          <p className="text-gray-700">
                Learn the complete credit card application process - from checking eligibility to getting approved. 
                This step-by-step guide ensures you get the best card with highest approval chances! ???
          </p>
            </div>
          </div>
        </div>

        {/* Pre-Application Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Pre-Application Checklist (????? ?? ????)
          </h2>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Before You Apply - Must Check:</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-bold text-gray-900">1. Check Credit Score</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Minimum Required:</strong> 650+ for most cards
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 750+: Premium cards (Infinia, Magnus)</li>
                    <li>• 700+: Mid-range cards (Regalia, Millennia)</li>
                    <li>• 650+: Basic cards (SimplyCLICK, Amazon Pay)</li>
                    <li>• Below 650: Secured cards only</li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-2">
                    Check free: <a href="/learn/credit-score/check-score-free" className="hover:underline">Paisabazaar, BankBazaar</a>
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-bold text-gray-900">2. Verify Income Requirements</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="font-semibold text-gray-900">Salaried:</p>
                      <p className="text-xs text-gray-600">?25K-50K/month (varies by card)</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                      <p className="font-semibold text-gray-900">Self-employed:</p>
                      <p className="text-xs text-gray-600">?3-6 lakhs/year ITR</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-bold text-gray-900">3. Age & Employment</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Age: 21-65 years</li>
                    <li>• Employment: 6+ months at current job</li>
                    <li>• Indian citizen or NRI</li>
                    <li>• No recent defaults or settlements</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-bold text-gray-900">4. Choose Right Card</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="bg-green-50 p-2 rounded">
                      <p className="font-semibold text-gray-900">First-time users:</p>
                      <p className="text-xs text-gray-600">Lifetime free cards (Flipkart Axis, Amazon Pay)</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <p className="font-semibold text-gray-900">Online shoppers:</p>
                      <p className="text-xs text-gray-600">Cashback cards (SBI SimplyCLICK, HDFC Millennia)</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                      <p className="font-semibold text-gray-900">Frequent travelers:</p>
                      <p className="text-xs text-gray-600">Travel cards (Axis Magnus, HDFC Diners Black)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-bold text-gray-900">5. Prepare Documents</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• PAN card (mandatory)</li>
                    <li>• Aadhaar card</li>
                    <li>• Latest salary slip</li>
                    <li>• Bank statements (3-6 months)</li>
                    <li>• Address proof</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-bold text-gray-900">6. Check Existing Cards</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Don't apply for multiple cards simultaneously</li>
                    <li>• Wait 6 months between applications</li>
                    <li>• Close unused cards before applying</li>
                    <li>• Maintain low credit utilization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Apply (????? ???? ????)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Online Application */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Smartphone className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-blue-900">Online Application (Recommended)</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">1</span>
                    <p className="font-bold text-gray-900">Visit Bank Website/App</p>
                  </div>
                  <p className="text-sm text-gray-700">Go to official bank website or download mobile app</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">2</span>
                    <p className="font-bold text-gray-900">Fill Application Form</p>
                  </div>
                  <p className="text-sm text-gray-700">Enter personal, employment, and financial details</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">3</span>
                    <p className="font-bold text-gray-900">Upload Documents</p>
                  </div>
                  <p className="text-sm text-gray-700">Scan and upload required documents</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">4</span>
                    <p className="font-bold text-gray-900">Submit & Track</p>
                  </div>
                  <p className="text-sm text-gray-700">Submit application and track status online</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-100 rounded border border-green-400">
                <p className="font-bold text-green-900 text-sm mb-1">? Advantages:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Faster processing (7-10 days)</li>
                  <li>• 24/7 application</li>
                  <li>• Real-time status tracking</li>
                  <li>• Digital document upload</li>
                  <li>• Instant eligibility check</li>
                </ul>
              </div>
            </div>

            {/* Offline Application */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CreditCard className=" capitalize h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-purple-900">Offline Application</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">1</span>
                    <p className="font-bold text-gray-900">Visit Bank Branch</p>
                  </div>
                  <p className="text-sm text-gray-700">Go to nearest bank branch or meet relationship manager</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">2</span>
                    <p className="font-bold text-gray-900">Get Application Form</p>
                  </div>
                  <p className="text-sm text-gray-700">Collect physical application form</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">3</span>
                    <p className="font-bold text-gray-900">Fill & Submit</p>
                  </div>
                  <p className="text-sm text-gray-700">Complete form with documents and submit</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-100 text-purple-700 font-bold px-3 py-1 rounded-full mr-3 text-sm">4</span>
                    <p className="font-bold text-gray-900">Verification</p>
                  </div>
                  <p className="text-sm text-gray-700">Bank representative may visit for verification</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-400">
                <p className="font-bold text-yellow-900 text-sm mb-1">?? Considerations:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Slower processing (10-15 days)</li>
                  <li>• Physical document submission</li>
                  <li>• Branch visit required</li>
                  <li>• Manual verification process</li>
                  <li>• Less convenient</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Online Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Detailed Online Application Process (??????? ?????????)
          </h2>

          <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Choose Your Card</h4>
                    <p className="text-gray-700 mb-3">Select the best credit card based on your needs and eligibility</p>
                    
                    <div className="bg-white p-4 rounded border-2 border-blue-200">
                      <p className="font-semibold text-gray-900 mb-2">Popular Options by Category:</p>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <div className="bg-green-50 p-2 rounded">
                            <p className="font-bold text-gray-900">First-time Users:</p>
                            <p className="text-gray-600">• Flipkart Axis Bank Credit Card</p>
                            <p className="text-gray-600">• Amazon Pay ICICI Credit Card</p>
                            <p className="text-gray-600">• SBI SimplyCLICK Credit Card</p>
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <p className="font-bold text-gray-900">Cashback Lovers:</p>
                            <p className="text-gray-600">• HDFC Millennia Credit Card</p>
                            <p className="text-gray-600">• SBI Cashback Credit Card</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="bg-purple-50 p-2 rounded">
                            <p className="font-bold text-gray-900">Travel Enthusiasts:</p>
                            <p className="text-gray-600">• Axis Magnus Credit Card</p>
                            <p className="text-gray-600">• HDFC Diners Black Credit Card</p>
                          </div>
                          <div className="bg-orange-50 p-2 rounded">
                            <p className="font-bold text-gray-900">Premium Users:</p>
                            <p className="text-gray-600">• HDFC Infinia Credit Card</p>
                            <p className="text-gray-600">• American Express Platinum</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-green-50 p-5 rounded-lg border-2 border-green-300">
                <div className="flex items-start">
                  <div className="bg-green-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Fill Personal Details</h4>
                    <p className="text-gray-700 mb-3">Enter your basic information accurately</p>
                    
                    <div className="bg-white p-4 rounded border-2 border-green-200">
                      <p className="font-semibold text-gray-900 mb-2">Required Information:</p>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <p className="text-gray-700">• Full Name (as per PAN)</p>
                          <p className="text-gray-700">• Date of Birth</p>
                          <p className="text-gray-700">• PAN Number</p>
                          <p className="text-gray-700">• Mobile Number</p>
                          <p className="text-gray-700">• Email Address</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-700">• Current Address</p>
                          <p className="text-gray-700">• Permanent Address</p>
                          <p className="text-gray-700">• Marital Status</p>
                          <p className="text-gray-700">• Mother's Maiden Name</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-purple-50 p-5 rounded-lg border-2 border-purple-300">
                <div className="flex items-start">
                  <div className="bg-purple-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Employment Details</h4>
                    <p className="text-gray-700 mb-3">Provide your work information and income details</p>
                    
                    <div className="bg-white p-4 rounded border-2 border-purple-200">
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="font-bold text-gray-900 mb-1">For Salaried:</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Company name and address</li>
                            <li>• Job designation</li>
                            <li>• Monthly salary</li>
                            <li>• Employment duration</li>
                            <li>• Official email ID</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <p className="font-bold text-gray-900 mb-1">For Self-employed:</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Business name and nature</li>
                            <li>• Annual income (ITR)</li>
                            <li>• Business address</li>
                            <li>• Years in business</li>
                            <li>• Bank statements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-orange-50 p-5 rounded-lg border-2 border-orange-300">
                <div className="flex items-start">
                  <div className="bg-orange-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Upload Documents</h4>
                    <p className="text-gray-700 mb-3">Scan and upload required documents in correct format</p>
                    
                    <div className="bg-white p-4 rounded border-2 border-orange-200">
                      <p className="font-semibold text-gray-900 mb-3">Document Checklist:</p>
                      <div className="space-y-2">
                        <div className="bg-green-50 p-3 rounded flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">PAN Card</p>
                            <p className="text-xs text-gray-600">Front and back (PDF/JPG, max 2MB)</p>
                          </div>
                          <span className="text-green-700 font-bold">Mandatory</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">Aadhaar Card</p>
                            <p className="text-xs text-gray-600">Front and back (PDF/JPG, max 2MB)</p>
                          </div>
                          <span className="text-green-700 font-bold">Mandatory</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">Salary Slip</p>
                            <p className="text-xs text-gray-600">Latest 3 months (PDF, max 5MB)</p>
                          </div>
                          <span className="text-green-700 font-bold">Mandatory</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">Bank Statements</p>
                            <p className="text-xs text-gray-600">Last 6 months (PDF, max 10MB)</p>
                          </div>
                          <span className="text-blue-700 font-bold">Recommended</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900 text-sm">Address Proof</p>
                            <p className="text-xs text-gray-600">Utility bill, rental agreement (PDF/JPG)</p>
                          </div>
                          <span className="text-blue-700 font-bold">If Required</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-red-50 p-5 rounded-lg border-2 border-red-300">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-lg">5</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Review & Submit</h4>
                    <p className="text-gray-700 mb-3">Double-check all details before final submission</p>
                    
                    <div className="bg-white p-4 rounded border-2 border-red-200">
                      <p className="font-semibold text-gray-900 mb-2">Final Checklist:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">All personal details are correct and match documents</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Income details are accurate and verifiable</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">All documents are uploaded and clear</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Contact details are correct (for verification calls)</span>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">You understand terms and conditions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Approval Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Approval Timeline (??????? ???)
          </h2>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-400 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What Happens After Submission:</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="font-bold text-gray-900">Day 1: Application Received</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">Immediate</span>
                </div>
                <p className="text-sm text-gray-700">You receive SMS/email confirmation with application reference number</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="font-bold text-gray-900">Day 2-3: Initial Verification</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">2-3 Days</span>
                </div>
                <p className="text-sm text-gray-700">Bank verifies documents and basic information</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="font-bold text-gray-900">Day 4-7: Credit Check</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">4-7 Days</span>
                </div>
                <p className="text-sm text-gray-700">CIBIL/credit bureau check and income verification</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="font-bold text-gray-900">Day 8-10: Decision Made</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">8-10 Days</span>
                </div>
                <p className="text-sm text-gray-700">Bank makes approval/rejection decision</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-yellow-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                    <p className="font-bold text-gray-900">Day 11-15: Card Delivery</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">11-15 Days</span>
                </div>
                <p className="text-sm text-gray-700">If approved, card is dispatched and delivered</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-100 rounded border border-green-400">
              <p className="font-bold text-gray-900 mb-2">?? Pro Tips for Faster Approval:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Apply during business hours (Monday-Friday)</li>
                <li>• Ensure all documents are clear and complete</li>
                <li>• Apply when your credit score is at its best</li>
                <li>• Choose cards you're likely to qualify for</li>
                <li>• Respond quickly to verification calls</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Approval Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tips to Increase Approval Chances (??????? ?? ??????? ?????? ?? ?????)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-4">? Do These:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Apply when credit score is 700+</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Keep credit utilization under 30%</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Have stable income for 6+ months</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Apply for cards matching your profile</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Provide accurate information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Maintain existing banking relationship</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-red-900 mb-4">? Avoid These:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Applying for multiple cards simultaneously</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Having high outstanding debt</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Recent defaults or settlements</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Frequent job changes</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Inconsistent income</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Providing false information</span>
                </li>
              </ul>
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
              <a href="/learn/credit-cards/documents-required" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Documents Required</p>
                <p className="text-sm text-gray-600">Complete checklist</p>
              </a>
              <a href="/learn/credit-cards/types-of-credit-cards" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Types of Credit Cards</p>
                <p className="text-sm text-gray-600">Choose the right card</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Improve Credit Score</p>
                <p className="text-sm text-gray-600">Boost approval chances</p>
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
              <span className="text-gray-800">Check eligibility first: credit score 650+, income requirements, age 21-65</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Online application is faster (7-10 days) vs offline (10-15 days)</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Required documents: PAN, Aadhaar, salary slip, bank statements</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Approval timeline: 7-15 days with verification calls possible</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Increase approval chances: good credit score, stable income, accurate documents</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Avoid: multiple applications, high debt, recent defaults, false information</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-green-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply? Let's Go! ??</h2>
          <p className="text-blue-100 mb-6">
            Now that you know the process, choose the right card and apply with confidence!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/learn/credit-cards/types-of-credit-cards"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Next: Choose Your Card ?
            </a>
          <a
            href="/learn/credit-cards"
              className="inline-block bg-blue-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 transition-colors"
          >
              All Credit Card Lessons
          </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default ApplicationProcess;
