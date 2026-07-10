import React from 'react';
import { ClipboardCheck, CheckCircle, Clock, Shield, CreditCard, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const ApplicationProcess: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Gold Loan Application Process - Step by Step Guide 2024 | MoneyCal"
        description="Complete step-by-step guide for gold loan application in India. Learn online and offline process, documents needed, approval time, and get your loan in 30 minutes!"
        keywords="gold loan application, how to apply for gold loan, gold loan process, gold loan application online, gold loan steps"
        canonicalUrl="/learn/gold-loans/application-process"
      />
      
      <LearnLayout
        category="gold-loans"
        currentLesson="application-process"
        breadcrumb={['Learn', 'Gold Loans', 'Application Process']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <ClipboardCheck className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-700">
                Gold loan approval happens in just 15-30 minutes! Understanding the process ensures smooth, hassle-free experience and instant cash when you need it most. ⚡💰
              </p>
            </div>
          </div>
        </div>

        {/* Complete Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Gold Loan Application Process (स्वर्ण ऋण प्रक्रिया)
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start bg-white border-2 border-blue-300 rounded-xl p-6">
              <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="font-bold text-blue-700 text-lg">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Choose Your Lender</h3>
                <p className="text-gray-700 mb-3">
                  Select bank or NBFC based on interest rates, loan amount, and reputation
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-800">
                    <strong>Top Options:</strong> SBI, HDFC, ICICI, Muthoot Finance, Manappuram Finance
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    💡 <strong>Tip:</strong> Compare 3-4 lenders before deciding!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-green-300 rounded-xl p-6">
              <div className="bg-green-100 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="font-bold text-green-700 text-lg">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Collect Documents</h3>
                <p className="text-gray-700 mb-3">Gather required documents (minimal paperwork!)</p>
                <ul className="space-y-1 text-gray-700">
                  <li>✅ Aadhaar Card</li>
                  <li>✅ PAN Card</li>
                  <li>✅ Address Proof</li>
                  <li>✅ 2 Passport Photos</li>
                  <li>✅ Gold jewelry to pledge</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-purple-300 rounded-xl p-6">
              <div className="bg-purple-100 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="font-bold text-purple-700 text-lg">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Fill Application Form</h3>
                <p className="text-gray-700 mb-3">
                  Complete simple form with personal and contact details
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-gray-900">Online:</p>
                    <p className="text-sm text-gray-700">Fill form on bank website/app</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-gray-900">Offline:</p>
                    <p className="text-sm text-gray-700">Fill physical form at branch</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-yellow-300 rounded-xl p-6">
              <div className="bg-yellow-100 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="font-bold text-yellow-700 text-lg">4</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Gold Valuation (मूल्यांकन)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Most Important Step!</strong> Bank checks purity, weight, and value
                </p>
                <div className="space-y-2 bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-800">⚖️ <strong>Purity Test:</strong> Using electronic testers (non-destructive)</p>
                  <p className="text-gray-800">⚖️ <strong>Weight Check:</strong> Precise digital weighing scale</p>
                  <p className="text-gray-800">⚖️ <strong>Valuation:</strong> Based on current gold rate per gram</p>
                  <p className="text-sm text-gray-700 mt-3">
                    <strong>Time:</strong> 10-15 minutes only! ⏱️
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-orange-300 rounded-xl p-6">
              <div className="bg-orange-100 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="font-bold text-orange-700 text-lg">5</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Loan Sanction</h3>
                <p className="text-gray-700 mb-3">
                  Bank calculates eligible loan amount (75-90% of gold value)
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-gray-800 font-semibold mb-2">Example:</p>
                  <div className="space-y-1 text-gray-700">
                    <p>Gold Weight: 50 grams (22K)</p>
                    <p>Gold Rate: ₹6,000/gram</p>
                    <p>Gold Value: ₹3,00,000</p>
                    <p className="font-bold text-green-700">→ Loan Amount: ₹2,25,000 (75% LTV)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-red-300 rounded-xl p-6">
              <div className="bg-red-100 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="font-bold text-red-700 text-lg">6</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Sign Agreement</h3>
                <p className="text-gray-700 mb-3">
                  Read and sign loan agreement with terms & conditions
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-gray-800 font-semibold mb-2">Important Points:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✓ Interest rate and EMI amount</li>
                    <li>✓ Loan tenure (repayment period)</li>
                    <li>✓ Processing fees & charges</li>
                    <li>✓ Gold storage and insurance details</li>
                    <li>✓ Prepayment and foreclosure terms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-green-400 rounded-xl p-6 shadow-lg">
              <div className="bg-green-200 rounded-full p-3 mr-4 flex-shrink-0">
                <span className="font-bold text-green-800 text-lg">7</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-2">Loan Disbursal 💸</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Money in your account instantly!</strong>
                </p>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg">
                  <div className="space-y-2">
                    <p className="text-gray-800">💳 <strong>Bank Transfer:</strong> 5-10 minutes</p>
                    <p className="text-gray-800">💰 <strong>Cash:</strong> Immediate (up to ₹2 lakhs)</p>
                    <p className="text-gray-800">📱 <strong>UPI/NEFT:</strong> Real-time transfer</p>
                    <p className="font-bold text-green-700 mt-3 text-lg">
                      ⚡ Total Time: 15-30 minutes from start to finish!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Online vs Offline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Online vs Offline Application</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🌐 Online Application</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Process:</p>
                  <ol className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>1. Visit bank website/mobile app</li>
                    <li>2. Fill online form & upload docs</li>
                    <li>3. Get instant pre-approval</li>
                    <li>4. Visit branch with gold</li>
                    <li>5. Gold valuation & disbursal</li>
                  </ol>
                </div>
                <div className="bg-blue-200 p-3 rounded">
                  <p className="text-sm font-semibold text-gray-900">✅ Advantages:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Apply 24/7 from home</li>
                    <li>• Faster documentation</li>
                    <li>• Track application status</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <p className="text-sm font-semibold text-gray-900">❌ Limitations:</p>
                  <ul className="text-sm text-gray-700">
                    <li>• Still need branch visit for gold valuation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🏦 Offline Application</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Process:</p>
                  <ol className="text-sm text-gray-700 space-y-1 ml-4">
                    <li>1. Visit bank/NBFC branch</li>
                    <li>2. Carry documents + gold jewelry</li>
                    <li>3. Fill application form</li>
                    <li>4. Gold valuation on the spot</li>
                    <li>5. Instant loan approval & cash</li>
                  </ol>
                </div>
                <div className="bg-green-200 p-3 rounded">
                  <p className="text-sm font-semibold text-gray-900">✅ Advantages:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Single visit - everything done</li>
                    <li>• Get cash immediately</li>
                    <li>• Face-to-face assistance</li>
                    <li>• Negotiate better rates</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <p className="text-sm font-semibold text-gray-900">❌ Limitations:</p>
                  <ul className="text-sm text-gray-700">
                    <li>• Must visit during banking hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Typical Timeline ⏱️</h2>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-yellow-600 mr-3" />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Form Filling: <span className="text-yellow-600">5 minutes</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-6 w-6 text-orange-600 mr-3" />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Gold Valuation: <span className="text-orange-600">10-15 minutes</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-6 w-6 text-blue-600 mr-3" />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Documentation: <span className="text-blue-600">5 minutes</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '15%'}}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <Clock className="h-6 w-6 text-green-600 mr-3" />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Loan Disbursal: <span className="text-green-600">5-10 minutes</span></p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 border-2 border-green-400 rounded-lg p-4 mt-4">
                <p className="text-center text-lg font-bold text-green-800">
                  🎉 Total Time: 25-35 minutes (Fastest loan in India!)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips for Fast Approval */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips for Instant Approval 🚀</h2>

          <div className="space-y-4">
            <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Clean Your Gold Before Visiting</h3>
                <p className="text-gray-700">Cleaned gold speeds up valuation process</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Carry All Documents in Original + Photocopy</h3>
                <p className="text-gray-700">Saves time at branch</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Visit During Non-Peak Hours</h3>
                <p className="text-gray-700">Early morning (10-11 AM) or late afternoon (3-4 PM) are best</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Keep Bank Account Details Ready</h3>
                <p className="text-gray-700">Account number, IFSC code for instant transfer</p>
              </div>
            </div>

            <div className="flex items-start bg-white border-2 border-green-300 rounded-lg p-5">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Have Gold Purchase Bills (If Available)</h3>
                <p className="text-gray-700">Not mandatory but helps in faster verification</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid ⚠️</h2>

          <div className="space-y-4">
            <div className="flex items-start bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Not Reading Loan Agreement</h3>
                <p className="text-gray-700">Always read fine print for hidden charges!</p>
              </div>
            </div>

            <div className="flex items-start bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Not Checking Gold Weight Certificate</h3>
                <p className="text-gray-700">Verify weight and purity certificate before pledging</p>
              </div>
            </div>

            <div className="flex items-start bg-red-50 border-2 border-red-300 rounded-lg p-5">
              <AlertCircle className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Taking More Loan Than Needed</h3>
                <p className="text-gray-700">Borrow only what you need to minimize interest</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Gold loan approval in 15-30 minutes - fastest loan in India!</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">7 simple steps: Choose lender → Documents → Form → Valuation → Approval → Agreement → Money</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Offline application is fastest - everything done in single visit</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Minimal documentation, no CIBIL check, instant disbursal</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Next: Learn About Gold Valuation! ⚖️</h2>
          <p className="text-yellow-100 mb-6">
            Understand how banks value your gold and calculate the maximum loan amount you can get!
          </p>
          <a
            href="/learn/gold-loans/valuation-process"
            className="inline-block bg-white text-yellow-600 font-bold py-3 px-8 rounded-xl hover:bg-yellow-50 transition-colors"
          >
            Next: Gold Valuation Process →
          </a>
        </div>
      </LearnLayout>
    </>
  );
};

export default ApplicationProcess;

