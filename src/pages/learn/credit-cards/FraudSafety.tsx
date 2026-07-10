import React from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle, XCircle, Phone, Mail } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';
import SEOHelmet from '../../../components/SEOHelmet';

const FraudSafety: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Credit Card Fraud Protection & Safety Tips 2024 | MoneyCal"
        description="Complete guide to credit card fraud prevention in India. Learn common scams (phishing, cloning, OTP fraud), safety tips, what to do if card is stolen, and zero liability protection."
        keywords="credit card fraud, credit card safety, phishing scams, card cloning, OTP fraud, stolen card, credit card security tips, fraud protection India"
        canonicalUrl="/learn/credit-cards/fraud-safety"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Credit Card Fraud Protection - Complete Safety Guide',
          description: 'Comprehensive guide to protecting yourself from credit card fraud, recognizing scams, and what to do if your card is compromised.',
          author: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          },
          datePublished: '2024-10-23',
          dateModified: '2024-10-23'
        }}
      />
      
      <LearnLayout
        category="credit-cards"
        currentLesson="fraud-safety"
        breadcrumb={['Learn', 'Credit Cards', 'Fraud & Safety']}
      >
        {/* Introduction */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <Shield className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Protect Yourself from ? Lakhs in Losses!</h3>
          <p className="text-gray-700">
                Credit card fraud is rising in India! But with the right knowledge, you can protect yourself 100%. 
                This guide covers all scams and safety measures. ????
              </p>
            </div>
          </div>
        </div>

        {/* Common Fraud Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            10 Common Credit Card Frauds in India (???????? ?? ??????)
          </h2>

          <div className="space-y-4">
            {/* 1. Phishing */}
            <div className="bg-white border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-red-700 text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-red-900">Phishing (???????) - #1 Most Common</h3>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>What it is:</strong> Fake emails/SMS claiming to be from bank, asking for card details, CVV, OTP
              </p>

              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300 mb-4">
                <p className="font-bold text-red-900 mb-3">?? Common Phishing Examples:</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 mb-1">Fake SMS:</p>
                    <p className="text-gray-700 italic">
                      "Your card has been blocked due to suspicious activity. Click here to unblock: http://fake-bank-link.com"
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 mb-1">Fake Email:</p>
                    <p className="text-gray-700 italic">
                      "Dear customer, your KYC needs updating. Share card details to avoid account suspension."
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 mb-1">Fake Call:</p>
                    <p className="text-gray-700 italic">
                      "I'm calling from HDFC fraud department. There's suspicious activity. Share your CVV and OTP to secure account."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                <p className="font-bold text-green-900 mb-2">??? How to Protect:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>? NEVER share CVV, OTP, PIN with anyone (including "bank staff")</li>
                  <li>? Banks NEVER ask for these details via call/SMS/email</li>
                  <li>? Check sender email domain (hdfc.bank@gmail.com is FAKE!)</li>
                  <li>? Don't click links in SMS/email - visit official website directly</li>
                  <li>? Call bank's official helpline to verify if unsure</li>
                </ul>
              </div>
            </div>

            {/* 2. Card Cloning/Skimming */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-orange-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-orange-700 text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-orange-900">Card Cloning/Skimming</h3>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>What it is:</strong> Fraudsters copy your card data using skimming devices at ATMs/POS machines
              </p>

              <div className="bg-orange-50 p-4 rounded-lg mb-4">
                <p className="font-bold text-gray-900 mb-3">How It Happens:</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Skimming device attached to ATM card slot</p>
                  <p>• Hidden camera records PIN entry</p>
                  <p>• Fraudster creates duplicate card</p>
                  <p>• Makes unauthorized purchases/withdrawals</p>
                </div>
              </div>

              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                <p className="font-bold text-green-900 mb-2">??? How to Protect:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>? Check ATM for loose/suspicious attachments before inserting card</li>
                  <li>? Cover keypad while entering PIN (hide from cameras)</li>
                  <li>? Use ATMs inside bank branches (safer than standalone)</li>
                  <li>? Enable SMS alerts for ALL transactions</li>
                  <li>? Prefer contactless/tap payments (more secure)</li>
                  <li>? Check statement weekly for unauthorized charges</li>
                </ul>
              </div>
            </div>

            {/* 3. OTP Fraud */}
            <div className="bg-white border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-red-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-red-700 text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-red-900">OTP Fraud - Very Common in India!</h3>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>What it is:</strong> Scammers trick you into sharing One-Time Password (OTP) to complete fraudulent transactions
              </p>

              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300 mb-4">
                <p className="font-bold text-red-900 mb-3">?? Common OTP Scam Scripts:</p>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 mb-1">Scam 1: "Reverse Transaction"</p>
                    <p className="text-gray-700 italic">
                      "Sir, ?25,000 has been debited by mistake. To reverse it, share the OTP we're sending now."
                    </p>
                    <p className="text-xs text-red-600 mt-2">
                      Reality: OTP authorizes PAYMENT, not reversal!
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 mb-1">Scam 2: "KYC Update"</p>
                    <p className="text-gray-700 italic">
                      "Your KYC is expiring. Share OTP to update and avoid account block."
                    </p>
                    <p className="text-xs text-red-600 mt-2">
                      Reality: Banks NEVER ask OTP for KYC updates!
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-bold text-gray-900 mb-1">Scam 3: "Prize Winner"</p>
                    <p className="text-gray-700 italic">
                      "Congratulations! You won ?50,000. Share OTP to claim prize."
                    </p>
                    <p className="text-xs text-red-600 mt-2">
                      Reality: OTP authorizes payment FROM your account, not TO!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                <p className="font-bold text-green-900 mb-2 text-lg">??? GOLDEN RULE:</p>
                <p className="text-gray-800 font-semibold">
                  NEVER share OTP with ANYONE - Not bank staff, not family, not friends! 
                  OTP is ONLY for YOU to authorize YOUR transactions!
                </p>
              </div>
            </div>

            {/* 4. Online Shopping Fraud */}
            <div className="bg-white border-2 border-yellow-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-yellow-700 text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-900">Fake E-commerce Websites</h3>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>What it is:</strong> Fake shopping sites that look real but steal your card details
              </p>

              <div className="bg-yellow-50 p-4 rounded-lg mb-3">
                <p className="font-bold text-gray-900 mb-3">Warning Signs:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Unbelievable discounts (iPhone for ?10,000)</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Poor English, spelling mistakes on site</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>No HTTPS (secure padlock missing in browser)</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>New/unknown website (check domain age)</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>No customer reviews or contact info</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                <p className="font-bold text-green-900 mb-2">??? Safe Shopping Practices:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>? Shop only on trusted sites (Amazon, Flipkart, brand websites)</li>
                  <li>? Verify HTTPS and padlock icon in browser</li>
                  <li>? Use virtual card numbers when available (disposable cards)</li>
                  <li>? Enable 3D Secure/Verified by Visa (adds OTP layer)</li>
                  <li>? Check seller reviews and ratings</li>
                  <li>? Use PayPal/UPI for extra protection layer</li>
                </ul>
              </div>
            </div>

            {/* 5. Social Engineering */}
            <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-purple-700 text-xl">5</span>
                </div>
                <h3 className="text-xl font-bold text-purple-900">Social Engineering Scams</h3>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>What it is:</strong> Psychological manipulation to trick you into revealing sensitive information
              </p>

              <div className="space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-3">Common Tactics:</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-3 rounded flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900">Urgency Creation:</p>
                        <p className="text-gray-700">"Your card will be blocked in 2 hours if you don't verify!"</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900">Authority Impersonation:</p>
                        <p className="text-gray-700">"This is RBI calling. We need to verify your card details."</p>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900">Reward/Prize Bait:</p>
                        <p className="text-gray-700">"You've won lottery! Pay ?5,000 processing fee to claim ?10 lakhs."</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
                  <p className="font-bold text-green-900 mb-2">??? Protection Strategy:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>? Stay calm - urgency is a red flag</li>
                    <li>? Verify caller identity - call bank's official number yourself</li>
                    <li>? Never pay fees to claim prizes (it's a scam!)</li>
                    <li>? Remember: Banks NEVER call asking for card details</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6. Lost/Stolen Card */}
            <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-3 rounded-xl mr-3">
                  <span className="font-bold text-blue-700 text-xl">6</span>
                </div>
                <h3 className="text-xl font-bold text-blue-900">Lost or Stolen Physical Card</h3>
              </div>

              <p className="text-gray-700 mb-4">
                Card falls into wrong hands - can be misused within minutes if not blocked!
              </p>

              <div className="bg-red-100 p-4 rounded-lg border-2 border-red-400 mb-4">
                <p className="font-bold text-red-900 mb-2">?? Act IMMEDIATELY (Within Minutes!):</p>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded flex items-start">
                    <span className="font-bold text-red-700 mr-2">1.</span>
                    <div>
                      <p className="font-bold text-gray-900">Call Bank Helpline & Block Card</p>
                      <p className="text-gray-600">
                        HDFC: 1800-266-4332 | ICICI: 1860-120-7777 | SBI: 1800-180-1290
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex items-start">
                    <span className="font-bold text-red-700 mr-2">2.</span>
                    <div>
                      <p className="font-bold text-gray-900">Block via Mobile App/Internet Banking</p>
                      <p className="text-gray-600">Faster than calling - do BOTH!</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex items-start">
                    <span className="font-bold text-red-700 mr-2">3.</span>
                    <div>
                      <p className="font-bold text-gray-900">File Police Complaint (FIR)</p>
                      <p className="text-gray-600">Needed for insurance claim if fraud happens</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded flex items-start">
                    <span className="font-bold text-red-700 mr-2">4.</span>
                    <div>
                      <p className="font-bold text-gray-900">Inform Bank in Writing</p>
                      <p className="text-gray-600">Email + written letter within 3 days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 p-3 rounded">
                <p className="text-sm text-gray-800">
                  <strong>? Good News:</strong> You have ZERO liability for unauthorized transactions if you report within 3 days!
                  <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">(RBI Rule)</a>
                </p>
              </div>
            </div>

            {/* 7-10 Quick Overview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Other Common Frauds (Quick Overview):</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="font-bold text-gray-900 mb-1">7. Vishing (Voice Phishing)</p>
                  <p className="text-sm text-gray-600">Fake calls impersonating bank/police</p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="font-bold text-gray-900 mb-1">8. SMiShing (SMS Phishing)</p>
                  <p className="text-sm text-gray-600">Fake SMS with malicious links</p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="font-bold text-gray-900 mb-1">9. Application Fraud</p>
                  <p className="text-sm text-gray-600">Identity theft to get card in your name</p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <p className="font-bold text-gray-900 mb-1">10. CNP Fraud (Card Not Present)</p>
                  <p className="text-sm text-gray-600">Online shopping with stolen card details</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            20 Credit Card Safety Rules (??????? ????)
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-green-900 mb-4">? DO These Always:</h3>
              <div className="space-y-2 text-sm">
                {[
                  "Set up transaction SMS/email alerts for ALL amounts",
                  "Enable OTP/2-factor authentication",
                  "Cover keypad when entering PIN",
                  "Sign card immediately upon receiving",
                  "Keep card in sight at restaurants/shops",
                  "Use only secure websites (HTTPS)",
                  "Check ATM for skimming devices",
                  "Review statement weekly",
                  "Set transaction limits (daily/monthly)",
                  "Use virtual cards for online shopping"
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start bg-white p-3 rounded">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-400 rounded-xl p-6">
              <h3 className="font-bold text-lg text-red-900 mb-4">? NEVER Do These:</h3>
              <div className="space-y-2 text-sm">
                {[
                  "Share CVV, OTP, or PIN with anyone",
                  "Write PIN on card or keep in wallet",
                  "Click links in SMS/emails claiming to be bank",
                  "Use card on HTTP sites (not HTTPS)",
                  "Save card details on unknown websites",
                  "Let waiter take card out of sight",
                  "Share card photo on WhatsApp/social media",
                  "Use public WiFi for card transactions",
                  "Ignore unknown transaction notifications",
                  "Throw away card statements without shredding"
                ].map((tip, idx) => (
                  <div key={idx} className="flex items-start bg-white p-3 rounded">
                    <XCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What to Do If Fraud Happens */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What to Do If You're a Fraud Victim (???? ?????)
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-400 rounded-xl p-6">
            <h3 className="font-bold text-xl text-red-900 mb-4">Immediate Action Plan (Next 24 Hours):</h3>

            <div className="space-y-4">
              <div className="bg-white border-2 border-red-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-red-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-red-700 text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Block Card Immediately (5 minutes)</h4>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Call These Numbers:</p>
                      <div className="space-y-1 text-xs text-gray-700">
                        <p>• HDFC: 1800-266-4332</p>
                        <p>• ICICI: 1860-120-7777</p>
                        <p>• SBI: 1800-180-1290</p>
                        <p>• Axis: 1860-419-5555</p>
                        <p>• Or use mobile banking app to block</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-orange-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-orange-700 text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">File Police Complaint (Same Day)</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Go to nearest police station or file online FIR. Get complaint number - mandatory for insurance!
                    </p>
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="text-sm text-gray-800">
                        <strong>Online FIR:</strong> <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">National Cyber Crime Portal</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-blue-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-blue-700 text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Dispute Fraudulent Charges (Within 3 Days)</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Send written complaint to bank's fraud department. Include FIR copy, transaction details.
                    </p>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-semibold text-gray-900 mb-1">RBI Zero Liability Rule:</p>
                      <p className="text-xs text-gray-700">
                        If you report within 3 working days, you have ZERO liability for unauthorized transactions!
                        Bank must refund within 10 days.
          </p>
        </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-purple-300 rounded-lg p-5">
                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-3 mr-4 flex-shrink-0">
                    <span className="font-bold text-purple-700 text-lg">4</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Follow Up & Documentation</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>? Keep copies of all complaints</p>
                      <p>? Note down reference numbers</p>
                      <p>? Follow up every 2-3 days</p>
                      <p>? Escalate to RBI ombudsman if bank doesn't respond in 10 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bank Helpline Numbers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Emergency Bank Helpline Numbers (24/7)
          </h2>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
            <p className="font-bold text-gray-900 mb-4">Save These Numbers in Your Phone:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900 mb-2">HDFC Bank</p>
                <p className="text-sm text-gray-700 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  1800-266-4332 (Toll-free)
                </p>
                <p className="text-xs text-gray-600 mt-1">For lost/stolen card blocking</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900 mb-2">ICICI Bank</p>
                <p className="text-sm text-gray-700 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  1860-120-7777
                </p>
                <p className="text-xs text-gray-600 mt-1">24x7 customer care</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900 mb-2">SBI Cards</p>
                <p className="text-sm text-gray-700 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  1800-180-1290
                </p>
                <p className="text-xs text-gray-600 mt-1">Toll-free helpline</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold text-blue-900 mb-2">Axis Bank</p>
                <p className="text-sm text-gray-700 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  1860-419-5555
                </p>
                <p className="text-xs text-gray-600 mt-1">Card hotline</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-bold text-red-900 mb-2">National Cyber Crime</p>
                <p className="text-sm text-gray-700 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  1930 (Cyber Helpline)
                </p>
                <p className="text-xs text-gray-600 mt-1">Report online fraud</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-bold text-red-900 mb-2">RBI Ombudsman</p>
                <p className="text-sm text-gray-700 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CMS Portal</a>
                </p>
                <p className="text-xs text-gray-600 mt-1">If bank doesn't help</p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">?? Related Lessons:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/learn/credit-cards/what-is-credit-card" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-blue-200">
                <p className="font-semibold text-blue-600 mb-1">Credit Card Basics</p>
                <p className="text-sm text-gray-600">Understand how cards work</p>
              </a>
              <a href="/learn/credit-cards/statement-guide" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-purple-200">
                <p className="font-semibold text-purple-600 mb-1">Read Your Statement</p>
                <p className="text-sm text-gray-600">Spot unauthorized charges</p>
              </a>
              <a href="/learn/credit-cards/common-mistakes" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-orange-200">
                <p className="font-semibold text-orange-600 mb-1">Common Mistakes</p>
                <p className="text-sm text-gray-600">Avoid costly errors</p>
              </a>
              <a href="/learn/credit-score/cibil-impact" className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow border-2 border-green-200">
                <p className="font-semibold text-green-600 mb-1">CIBIL Impact</p>
                <p className="text-sm text-gray-600">Fraud affects credit score</p>
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
              <span className="text-gray-800">NEVER share CVV, OTP, or PIN - banks never ask for these!</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Enable SMS alerts for ALL transactions to detect fraud instantly</span>
            </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">If card lost/stolen: Block within minutes via app or helpline</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Zero liability if you report fraud within 3 working days (RBI rule)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Common scams: Phishing (fake emails), OTP fraud, card cloning, fake websites</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800">Always use HTTPS sites, avoid public WiFi for transactions, review statements weekly</span>
              </li>
            </ul>
          </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Stay Safe, Stay Smart! ??</h2>
          <p className="text-blue-100 mb-6">
            Learn more about credit card management and build your financial knowledge!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/learn/credit-cards/statement-guide"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Next: Statement Guide ?
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

export default FraudSafety;
