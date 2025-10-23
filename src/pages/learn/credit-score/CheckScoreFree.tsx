import React from 'react';
import { Search, CheckCircle, Download, Shield, AlertCircle, Smartphone } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const CheckScoreFree: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="How to Check Credit Score Free in India 2024 - CIBIL Report | MoneyCal"
        description="Check your credit score FREE! Complete guide to getting free CIBIL report from official sources, mobile apps, and online platforms. Step-by-step instructions included."
        keywords="check credit score free, free CIBIL report, check CIBIL score online, credit score check India, free credit report, Paisabazaar, BankBazaar credit score"
        canonicalUrl="https://moneycal.in/learn/credit-score/check-score-free"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Check Credit Score Free in India',
          description: 'Step-by-step guide to check your CIBIL credit score for free',
          totalTime: 'PT10M',
          step: [
            { '@type': 'HowToStep', name: 'Visit CIBIL website', text: 'Go to www.cibil.com and register' },
            { '@type': 'HowToStep', name: 'Verify identity', text: 'Provide PAN, Aadhaar details' },
            { '@type': 'HowToStep', name: 'Get report', text: 'Download your free credit report' }
          ]
        }}
      />
      
      <LearnLayout
        category="credit-score"
        currentLesson="check-score-free"
        breadcrumb={['Learn', 'Credit Score', 'Check Score Free']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Search className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Know Your Score in 5 Minutes - Completely FREE!</h3>
          <p className="text-gray-700">
                You're entitled to 1 free credit report per year from each bureau! Plus multiple platforms offer free monthly checks. 
                This guide shows all legitimate ways to check your score without paying a rupee! 📊✨
          </p>
            </div>
          </div>
        </div>

        {/* Why Check Credit Score */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Why Check Your Credit Score? (क्यों जांचें?)
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-3">✅ Benefits of Regular Checking:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Know your financial standing</li>
                <li>• Spot errors and dispute them</li>
                <li>• Detect fraud/identity theft early</li>
                <li>• Track improvement progress</li>
                <li>• Prepare for loan applications</li>
                <li>• Negotiate better loan rates</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6">
              <Shield className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-3">📊 When to Check:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Monthly:</strong> If actively improving score</li>
                <li>• <strong>Quarterly:</strong> For regular monitoring</li>
                <li>• <strong>Before loan application:</strong> 30 days prior</li>
                <li>• <strong>After major credit events:</strong> Loan closure, new card</li>
                <li>• <strong>If denied credit:</strong> Find out why</li>
                <li>• <strong>Annually:</strong> Minimum requirement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Free Ways to Check */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            7 Ways to Check Credit Score FREE (निःशुल्क)
          </h2>

          <div className="space-y-6">
            {/* Method 1: Official CIBIL */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-10 w-10 text-blue-600 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">1. CIBIL Official Website</h3>
                  <p className="text-sm text-gray-600">Most trusted - Direct from source</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-blue-300 mb-4">
                <p className="font-bold text-gray-900 mb-3">Step-by-Step Process:</p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">1</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Visit Official Website</p>
                      <p className="text-sm text-gray-700 mb-1">
                        Go to <a href="https://www.cibil.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">www.cibil.com</a>
                      </p>
                      <p className="text-xs text-gray-600">⚠️ Make sure it's .com not .in (avoid fake sites!)</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">2</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Click "Get Your Free CIBIL Score"</p>
                      <p className="text-sm text-gray-700">On homepage</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">3</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Fill Registration Form</p>
                      <p className="text-sm text-gray-700">Name, DOB, PAN, Aadhaar, Mobile, Email</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">4</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Identity Verification</p>
                      <p className="text-sm text-gray-700">Answer security questions about your credit history</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">5</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Receive OTP</p>
                      <p className="text-sm text-gray-700">Enter OTP sent to your mobile</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">6</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-900">Get Your Score!</p>
                      <p className="text-sm text-gray-700">View score + detailed report instantly</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-green-100 p-3 rounded">
                  <p className="font-bold text-green-900 text-sm mb-1">✅ Pros:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Official source (100% accurate)</li>
                    <li>• Detailed credit report</li>
                    <li>• No hidden charges</li>
                  </ul>
                </div>
                <div className="bg-red-100 p-3 rounded">
                  <p className="font-bold text-red-900 text-sm mb-1">❌ Cons:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Only 1 free report per year</li>
                    <li>• Takes 10-15 minutes</li>
                    <li>• Registration required</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Method 2: Paisabazaar */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Smartphone className="h-10 w-10 text-green-600 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">2. Paisabazaar (Recommended!)</h3>
                  <p className="text-sm text-gray-600">FREE monthly updates - Most convenient</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border-2 border-green-300 mb-4">
                <p className="font-bold text-gray-900 mb-3">Quick Process:</p>
                <ol className="space-y-2 text-sm text-gray-700 list-decimal ml-5">
                  <li>Visit <a href="https://www.paisabazaar.com/cibil-credit-score/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Paisabazaar Credit Score</a></li>
                  <li>Click "Check Free Credit Score"</li>
                  <li>Enter basic details (PAN, Mobile, Email)</li>
                  <li>Verify OTP</li>
                  <li>Get instant score + monthly email updates FREE!</li>
                </ol>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-green-100 p-3 rounded">
                  <p className="font-bold text-green-900 text-sm mb-1">✅ Pros:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• Unlimited free checks</li>
                    <li>• Monthly email updates</li>
                    <li>• Mobile app available</li>
                    <li>• Shows factors affecting score</li>
                  </ul>
                </div>
                <div className="bg-yellow-100 p-3 rounded">
                  <p className="font-bold text-yellow-900 text-sm mb-1">⚠️ Note:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• May show loan offers (ignore if not interested)</li>
                    <li>• Score updates monthly, not daily</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Method 3: BankBazaar */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-400 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-10 w-10 text-purple-600 mr-3" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">3. BankBazaar</h3>
                  <p className="text-sm text-gray-600">Multiple credit bureau scores</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-purple-300 mb-3">
                <p className="font-bold text-gray-900 mb-2">Process:</p>
                <ol className="space-y-1 text-sm text-gray-700 list-decimal ml-5">
                  <li>Visit <a href="https://www.bankbazaar.com/credit-score.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">BankBazaar Credit Score</a></li>
                  <li>Enter PAN and mobile number</li>
                  <li>Verify via OTP</li>
                  <li>View CIBIL, Experian, Equifax scores</li>
                </ol>
              </div>

              <div className="bg-purple-100 p-3 rounded">
                <p className="text-sm text-gray-800">
                  <strong>✅ Advantage:</strong> Shows scores from 3 bureaus (CIBIL, Experian, Equifax) in one place!
                </p>
              </div>
            </div>

            {/* Method 4-7: Quick List */}
            <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">4-7. Other Free Platforms:</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-bold text-blue-900 mb-2">4. OneScore App</p>
                  <p className="text-sm text-gray-700 mb-2">Mobile app, free unlimited checks</p>
                  <a href="https://www.onescore.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Download App →</a>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-bold text-green-900 mb-2">5. Experian Official</p>
                  <p className="text-sm text-gray-700 mb-2">1 free report per year + paid plans</p>
                  <a href="https://www.experian.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Site →</a>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-purple-900 mb-2">6. CRIF High Mark</p>
                  <p className="text-sm text-gray-700 mb-2">4th credit bureau in India</p>
                  <a href="https://www.crifhighmark.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Check Score →</a>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="font-bold text-orange-900 mb-2">7. Your Bank's App</p>
                  <p className="text-sm text-gray-700 mb-2">Many banks show score in mobile banking</p>
                  <p className="text-xs text-gray-600">Check HDFC, ICICI, Axis bank apps</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-2 border-gray-300 text-sm">
              <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">Platform</th>
                  <th className="border border-gray-300 p-3">Cost</th>
                  <th className="border border-gray-300 p-3">Frequency</th>
                  <th className="border border-gray-300 p-3">Bureaus</th>
                  <th className="border border-gray-300 p-3">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">CIBIL Official</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">FREE</td>
                  <td className="border border-gray-300 p-3 text-center">Once/year</td>
                  <td className="border border-gray-300 p-3 text-center">CIBIL</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">Official report</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 p-3 font-semibold">Paisabazaar</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">FREE</td>
                  <td className="border border-gray-300 p-3 text-center">Monthly</td>
                  <td className="border border-gray-300 p-3 text-center">CIBIL, Experian</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">Regular tracking</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">BankBazaar</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">FREE</td>
                  <td className="border border-gray-300 p-3 text-center">Monthly</td>
                  <td className="border border-gray-300 p-3 text-center">All 3</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">Multi-bureau</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-semibold">OneScore App</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">FREE</td>
                  <td className="border border-gray-300 p-3 text-center">Unlimited</td>
                  <td className="border border-gray-300 p-3 text-center">CIBIL</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">Mobile users</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-semibold">Bank Apps</td>
                  <td className="border border-gray-300 p-3 text-center text-green-700 font-bold">FREE</td>
                  <td className="border border-gray-300 p-3 text-center">Monthly</td>
                  <td className="border border-gray-300 p-3 text-center">Varies</td>
                  <td className="border border-gray-300 p-3 text-center text-sm">Easy access</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <p className="font-bold text-gray-900 mb-2">🎯 Recommended Strategy:</p>
            <p className="text-sm text-gray-700">
              <strong>Use Paisabazaar or BankBazaar for monthly monitoring</strong> (unlimited free checks) + 
              <strong> Get official CIBIL report once a year</strong> for detailed analysis before major loan applications.
            </p>
          </div>
        </section>

        {/* What's in Credit Report */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What's in Your Credit Report? (रिपोर्ट में क्या है?)
          </h2>

          <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-3">Credit Report Contains:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">1. Personal Information</p>
                      <p className="text-xs text-gray-600">Name, DOB, PAN, addresses, phone numbers</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">2. Credit Score</p>
                      <p className="text-xs text-gray-600">3-digit number (300-900)</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">3. Account Summary</p>
                      <p className="text-xs text-gray-600">Total credit cards, loans, overall exposure</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">4. Credit Accounts</p>
                      <p className="text-xs text-gray-600">All cards, loans with details</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">5. Payment History</p>
                      <p className="text-xs text-gray-600">Last 24-36 months record</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">6. Credit Inquiries</p>
                      <p className="text-xs text-gray-600">All loan/card applications (last 2 years)</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">7. Defaults/Write-offs</p>
                      <p className="text-xs text-gray-600">Any payment failures</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-900 text-sm mb-1">8. Employment Info</p>
                      <p className="text-xs text-gray-600">Current and past employers</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-100 p-3 rounded border border-yellow-400">
                <p className="text-sm text-gray-800">
                  <strong>💡 Important:</strong> Check every section carefully! Errors in personal info, wrong loan entries, or incorrect payment status can hurt your score.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Read Report */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Read Your Credit Report
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-400 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Understanding Key Sections:</h3>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-blue-300">
                <p className="font-bold text-blue-900 mb-2">Account Status Codes:</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2 text-sm">
                    <div className="bg-green-100 p-2 rounded flex justify-between">
                      <span className="font-bold text-gray-900">STD (Standard)</span>
                      <span className="text-green-700">✅ Good!</span>
                    </div>
                    <div className="bg-yellow-100 p-2 rounded flex justify-between">
                      <span className="font-bold text-gray-900">SMA (Special Mention)</span>
                      <span className="text-yellow-700">⚠️ Warning</span>
                    </div>
                    <div className="bg-orange-100 p-2 rounded flex justify-between">
                      <span className="font-bold text-gray-900">SUB (Sub-standard)</span>
                      <span className="text-orange-700">⚠️ 90+ days due</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-red-100 p-2 rounded flex justify-between">
                      <span className="font-bold text-gray-900">DBT (Doubtful)</span>
                      <span className="text-red-700">❌ Bad</span>
                    </div>
                    <div className="bg-red-200 p-2 rounded flex justify-between">
                      <span className="font-bold text-gray-900">LOSS</span>
                      <span className="text-red-700">❌ Very Bad</span>
                    </div>
                    <div className="bg-gray-100 p-2 rounded flex justify-between">
                      <span className="font-bold text-gray-900">SETTLED</span>
                      <span className="text-red-700">❌ Negative</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-green-300">
                <p className="font-bold text-green-900 mb-2">Payment Status (DPD - Days Past Due):</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between bg-green-100 p-2 rounded">
                    <span>000 or XXX</span>
                    <span className="font-bold text-green-700">Perfect (on-time payments) ✅</span>
                  </div>
                  <div className="flex justify-between bg-yellow-100 p-2 rounded">
                    <span>030</span>
                    <span className="font-bold text-yellow-700">30 days late ⚠️</span>
                  </div>
                  <div className="flex justify-between bg-orange-100 p-2 rounded">
                    <span>060</span>
                    <span className="font-bold text-orange-700">60 days late ⚠️</span>
                  </div>
                  <div className="flex justify-between bg-red-100 p-2 rounded">
                    <span>090+</span>
                    <span className="font-bold text-red-700">90+ days late (NPA) ❌</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Mistakes When Checking Score
          </h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Using Fake/Scam Websites</p>
                <p className="text-sm text-gray-700">
                  Many fake sites promise free score but steal data. Only use verified platforms listed above!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Checking Too Frequently (Daily/Weekly)</p>
                <p className="text-sm text-gray-700">
                  Score updates monthly, not daily. Checking 10 times a day won't change it! Check monthly max.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Paying for Score Check</p>
                <p className="text-sm text-gray-700">
                  With so many free options, there's NO need to pay ₹500-1,000 for score check!
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 mb-1">Not Reading Full Report</p>
                <p className="text-sm text-gray-700">
                  Score is just 1 number. Read full report to find errors, wrong entries, identity theft!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📚 Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-score/what-is-credit-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">What is Credit Score?</p>
                <p className="text-sm text-gray-600">Understand score ranges</p>
              </a>
              <a href="/learn/credit-score/score-ranges" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">Score Ranges Explained</p>
                <p className="text-sm text-gray-600">300-900 scale breakdown</p>
              </a>
              <a href="/learn/credit-score/dispute-errors" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Dispute Errors</p>
                <p className="text-sm text-gray-600">Fix mistakes in report</p>
              </a>
              <a href="/learn/credit-score/improve-score" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Improve Score Fast</p>
                <p className="text-sm text-gray-600">6-month action plan</p>
              </a>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Key Takeaways</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Check credit score 100% FREE - never pay for it!</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Best platforms: Paisabazaar (monthly), BankBazaar (3 bureaus), CIBIL official (detailed report)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Check monthly if improving score, quarterly for regular monitoring</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Read FULL report, not just score number - spot errors and fraud</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Soft inquiry (self-check) doesn't hurt score - check as needed!</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-green-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Check Your Score NOW! 📊</h2>
          <p className="text-blue-100 mb-6">
            Once you know your score, learn how to improve it with our proven 6-month plan!
          </p>
          <div className="flex flex-wrap gap-4">
          <a
              href="https://www.paisabazaar.com/cibil-credit-score/"
              target="_blank"
              rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
              Check FREE on Paisabazaar →
            </a>
            <a
              href="/learn/credit-score/improve-score"
              className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-800 transition-colors"
            >
              Improve Score Guide
            </a>
          </div>
        </div>
      </LearnLayout>
    </>
  );
};

export default CheckScoreFree;
