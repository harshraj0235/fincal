import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const ApplicationProcess: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="application-process"
      breadcrumb={['Learn', 'Vehicle Loans', 'Car Loan Application Process']}
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center mb-4">
          <Search className="h-12 w-12 mr-4" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Car Loan Application Process 2025 | कार लोन आवेदन प्रक्रिया
            </h1>
            <p className="text-yellow-100 text-lg">
              Complete step-by-step guide: Online & offline application, approval timeline, documents submission
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">15 Minutes</div>
            <div className="text-sm text-yellow-100">Online Apply</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">24-48 Hours</div>
            <div className="text-sm text-yellow-100">Approval Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm text-yellow-100">Digital Process</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="text-2xl font-bold">Same Day</div>
            <div className="text-sm text-yellow-100">Disbursement</div>
          </div>
        </div>
      </div>

      {/* Online Application Process */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Search className="h-8 w-8 mr-3 text-yellow-600" />
          Online Application Process | ऑनलाइन आवेदन प्रक्रिया
        </h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-yellow-600">
            <div className="p-8">
              <div className="flex items-start">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">1</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Choose Your Vehicle | वाहन चुनें</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Visit car showroom or online portal (CarDekho, CarWale, dealer website). Select make, model, variant, and color. Get on-road price quotation.
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>हिंदी में:</strong> शोरूम या ऑनलाइन पोर्टल पर जाएं। कार का मॉडल, वेरिएंट चुनें और ऑन-रोड प्राइस लें।
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <h5 className="font-semibold text-yellow-900 mb-2">💡 Pro Tip:</h5>
                    <p className="text-gray-700 text-sm">
                      Get quotations from multiple dealers. Prices can vary by ₹20,000-50,000 between dealers. Negotiate for best deal!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-yellow-600">
            <div className="p-8">
              <div className="flex items-start">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">2</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Check Eligibility & EMI | पात्रता जांचें</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Use online <Link to="/calculators/car-loan-calculator" className="text-yellow-600 underline font-semibold">car loan calculator</Link> to check:
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Loan eligibility</strong> based on your income (₹25,000+ monthly)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Monthly EMI</strong> for different loan amounts & tenures</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Total interest</strong> payable over loan period</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Down payment</strong> required (10-30% of car price)</span>
                    </li>
                  </ul>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Example Calculation:</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>Car On-Road Price:</strong> ₹8,00,000</div>
                      <div><strong>Down Payment (20%):</strong> ₹1,60,000</div>
                      <div><strong>Loan Amount:</strong> ₹6,40,000</div>
                      <div><strong>Interest Rate:</strong> 9% p.a.</div>
                      <div><strong>Tenure:</strong> 5 years</div>
                      <div className="text-xl font-bold text-yellow-600">EMI: ₹13,386</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-yellow-600">
            <div className="p-8">
              <div className="flex items-start">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">3</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Fill Online Application | ऑनलाइन फॉर्म भरें</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Visit bank website or dealer finance portal. Fill application form with:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-semibold text-blue-900 mb-2">Personal Details:</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Full name, date of birth</li>
                        <li>• PAN, Aadhaar number</li>
                        <li>• Current address</li>
                        <li>• Mobile, email</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-semibold text-green-900 mb-2">Employment Details:</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Company name, designation</li>
                        <li>• Monthly salary/income</li>
                        <li>• Employment type</li>
                        <li>• Work experience</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h5 className="font-semibold text-purple-900 mb-2">Vehicle Details:</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Make, model, variant</li>
                        <li>• Ex-showroom price</li>
                        <li>• Dealer name</li>
                        <li>• Insurance details</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h5 className="font-semibold text-orange-900 mb-2">Loan Details:</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Loan amount required</li>
                        <li>• Preferred tenure</li>
                        <li>• Down payment amount</li>
                        <li>• Existing loan details</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-yellow-600">
            <div className="p-8">
              <div className="flex items-start">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">4</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload Documents | दस्तावेज अपलोड करें</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Upload scanned copies of required documents (PDF/JPG format, under 5MB each):
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Identity Proof:</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ PAN Card (mandatory)</li>
                        <li>✓ Aadhaar Card</li>
                        <li>✓ Passport (optional)</li>
                        <li>✓ Voter ID (optional)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Income Proof:</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ Salary slips (3 months)</li>
                        <li>✓ Bank statements (6 months)</li>
                        <li>✓ Form 16 / ITR</li>
                        <li>✓ Employment letter</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">Vehicle Documents:</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ Proforma invoice</li>
                        <li>✓ Down payment receipt</li>
                        <li>✓ Insurance copy</li>
                        <li>✓ Passport photo (2)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h5 className="font-semibold text-red-900 mb-2 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Important | महत्वपूर्ण:
                    </h5>
                    <p className="text-gray-700 text-sm">
                      Ensure all documents are clear, legible, and not expired. Blurry or incomplete documents will delay approval.
                      सभी दस्तावेज साफ़ और स्पष्ट होने चाहिए।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-yellow-600">
            <div className="p-8">
              <div className="flex items-start">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">5</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Bank Verification | बैंक वेरिफिकेशन</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Bank will verify your application through multiple checks:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900">CIBIL Score Check</h5>
                        <p className="text-gray-600 text-sm">Bank checks your credit score and credit history. 750+ score gives instant approval.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900">Employment Verification</h5>
                        <p className="text-gray-600 text-sm">HR department verification call to confirm your employment and salary details.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900">Document Verification</h5>
                        <p className="text-gray-600 text-sm">All uploaded documents verified for authenticity. May request original documents at branch.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900">Income Assessment</h5>
                        <p className="text-gray-600 text-sm">Bank verifies income stability and calculates maximum eligible loan amount.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-700"><strong>Timeline:</strong> Verification typically takes 24-48 hours. Keep your phone accessible for verification calls.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-green-600">
            <div className="p-8">
              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">6</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Loan Approval & Sanction Letter | लोन मंजूरी</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Once verified, bank sends <strong>sanction letter</strong> (loan approval letter) via email/SMS with:
                  </p>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                    <h5 className="font-semibold text-green-900 mb-3">Sanction Letter Contains:</h5>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span><strong>Approved loan amount</strong> (e.g., ₹6,40,000)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span><strong>Interest rate</strong> (e.g., 9.25% p.a.)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span><strong>Loan tenure</strong> (e.g., 60 months)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span><strong>Monthly EMI amount</strong> (e.g., ₹13,386)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span><strong>Processing fee</strong> (if any)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span><strong>Prepayment charges</strong> (if any)</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span><strong>Insurance requirements</strong></span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span><strong>Validity period</strong> (usually 30 days)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <p className="text-gray-700 text-sm">
                      <strong>Note:</strong> Sanction letter is valid for 30 days. You must complete vehicle purchase within this period.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-l-4 border-purple-600">
            <div className="p-8">
              <div className="flex items-start">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4 flex-shrink-0">7</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Loan Agreement & Disbursement | लोन डिस्बर्समेंट</h3>
                  <p className="text-gray-700 text-lg mb-4">
                    Final step - sign loan agreement and get money:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h5 className="font-semibold text-purple-900 mb-2">Visit Bank Branch or Dealer:</h5>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Bring original documents for verification</li>
                        <li>• Sign loan agreement and other legal documents</li>
                        <li>• Provide post-dated cheques (PDC) for EMI (if required)</li>
                        <li>• Set up auto-debit mandate for EMI payments</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-semibold text-green-900 mb-2">Loan Disbursement:</h5>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li>• Bank directly pays loan amount to car dealer (not to you)</li>
                        <li>• Dealer receives payment within 1-2 hours</li>
                        <li>• Dealer hands over car keys and RC papers</li>
                        <li>• Your EMI starts from next month</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-semibold text-blue-900 mb-2">RC (Registration Certificate):</h5>
                      <p className="text-gray-700 text-sm">
                        Car RC will show bank as <strong>hypothecation holder</strong> (लीनधारक). Once you complete all EMI payments, 
                        bank will provide <strong>NOC (No Objection Certificate)</strong> to remove hypothecation from RC.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Infographic */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Application Timeline | समय-सीमा</h2>
        
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-7 gap-4">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <div className="font-bold text-2xl">Day 0</div>
              </div>
              <div className="text-sm">Application Submitted</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <div className="font-bold text-2xl">Day 1</div>
              </div>
              <div className="text-sm">Document Verification</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <div className="font-bold text-2xl">Day 2</div>
              </div>
              <div className="text-sm">CIBIL Check</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <div className="font-bold text-2xl">Day 2-3</div>
              </div>
              <div className="text-sm">Employment Verification</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <div className="font-bold text-2xl">Day 3</div>
              </div>
              <div className="text-sm">Loan Approved</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <div className="font-bold text-2xl">Day 4</div>
              </div>
              <div className="text-sm">Agreement Signing</div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <div className="font-bold text-2xl">Day 4-5</div>
              </div>
              <div className="text-sm">Loan Disbursed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Rejection Reasons */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Applications Get Rejected | अस्वीकृति के कारण</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3 text-xl">❌ Top Rejection Reasons:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Low CIBIL score</strong> (below 650)</li>
              <li>• <strong>High existing EMI burden</strong> (&gt;50% of income)</li>
              <li>• <strong>Insufficient income</strong> (below ₹25,000/month)</li>
              <li>• <strong>Unstable employment</strong> (frequent job changes)</li>
              <li>• <strong>Incomplete documents</strong> (missing/expired)</li>
              <li>• <strong>Default history</strong> (previous loan defaults)</li>
              <li>• <strong>Negative bank balance</strong> (frequent overdrafts)</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 text-xl">✅ How to Avoid Rejection:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Improve CIBIL score to 750+ before applying</li>
              <li>• Close existing loans/credit cards if possible</li>
              <li>• Submit complete, accurate documents</li>
              <li>• Maintain 6 months stable employment</li>
              <li>• Keep healthy bank balance (₹50,000+)</li>
              <li>• Apply for realistic loan amount</li>
              <li>• Add co-applicant (spouse/parent) if needed</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bank Links */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply Online Now | अभी ऑनलाइन आवेदन करें</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://sbi.co.in/web/personal-banking/loans/auto-loans/car-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-yellow-400">
            <span className="font-semibold text-gray-900">SBI Car Loan Apply</span>
            <ExternalLink className="h-5 w-5 text-yellow-600" />
          </a>
          <a href="https://www.hdfcbank.com/personal/borrow/popular-loans/car-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-yellow-400">
            <span className="font-semibold text-gray-900">HDFC Car Loan Apply</span>
            <ExternalLink className="h-5 w-5 text-yellow-600" />
          </a>
          <a href="https://www.icicibank.com/personal-banking/loans/car-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-yellow-400">
            <span className="font-semibold text-gray-900">ICICI Car Loan Apply</span>
            <ExternalLink className="h-5 w-5 text-yellow-600" />
          </a>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <p className="mb-6">Now that you know the process, learn about insurance and EMI management:</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/vehicle-insurance" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Next: Vehicle Insurance with Loan</div>
            <div className="text-sm text-yellow-100">Comprehensive vs Third Party</div>
          </Link>
          <Link to="/learn/vehicle-loans/emi-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all border border-white/30">
            <div className="font-bold mb-1">Car Loan EMI Calculator</div>
            <div className="text-sm text-yellow-100">Calculate your monthly payments</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default ApplicationProcess;

