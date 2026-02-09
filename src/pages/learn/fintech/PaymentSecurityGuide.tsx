import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, Phone, Mail } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const PaymentSecurityGuide: React.FC = () => {
  const [selectedScam, setSelectedScam] = useState('fake-call');

  return (
    <>
      <SEOHelmet 
        title="Payment Security Guide: Prevent Cyber Fraud UPI Scams OTP Fraud India 2025 | MoneyCal" 
        description="Stay safe online. Common UPI scams (fake calls, QR code scams), OTP security, phishing emails, how to report fraud, refund process, cybercrime helpline (1930)." 
        keywords="payment security India, cyber fraud prevention, UPI scams, OTP security, phishing emails, cybercrime helpline 1930, भुगतान सुरक्षा" 
        url="/learn/fintech-digital-payments/payment-security-cyber-fraud-prevention-upi-scams-india-2025" 
      />
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex justify-between mb-8">
            <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-red-600">
              <ArrowLeft className="w-5 h-5" />Back
            </Link>
            <span className="text-sm text-gray-600">Lesson 4 of 6</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Payment Security: Protect Yourself from Cyber Fraud!</h1>
          <p className="text-xl text-gray-600 mb-8">भुगतान सुरक्षा - साइबर धोखाधड़ी से बचें</p>

          {/* Alert Box */}
          <div className="bg-red-100 border-l-4 border-red-500 p-6 mb-8 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">⚠️ Critical: Indians Lost ₹1,750 Crore to Cyber Fraud in 2024!</h3>
                <p className="text-sm text-gray-700">
                  Over 15 lakh cyber fraud complaints reported. Most common: Fake calls, UPI scams, OTP theft, phishing emails. Learn to protect yourself NOW!
                </p>
              </div>
            </div>
          </div>

          {/* Top 10 Common Scams */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">🚨 Top 10 Cyber Fraud Scams in India (2025)</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { id: 'fake-call', name: 'Fake Bank Calls', icon: '📞' },
                { id: 'qr-scam', name: 'QR Code Scam', icon: '📱' },
                { id: 'otp-theft', name: 'OTP Theft', icon: '🔢' },
                { id: 'phishing', name: 'Phishing Emails', icon: '📧' },
                { id: 'kbc-lottery', name: 'KBC/Lottery Scam', icon: '🎰' },
                { id: 'job-scam', name: 'Fake Job Offers', icon: '💼' }
              ].map((scam) => (
                <button
                  key={scam.id}
                  onClick={() => setSelectedScam(scam.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedScam === scam.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300 bg-white'
                  }`}
                >
                  <span className="text-2xl mr-2">{scam.icon}</span>
                  <strong className="text-gray-900">{scam.name}</strong>
                </button>
              ))}
            </div>

            {/* Scam Details */}
            {selectedScam === 'fake-call' && (
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-900 mb-3">📞 Fake Bank/KYC Update Call Scam</h3>
                
                <div className="mb-4">
                  <strong className="text-red-800 block mb-2">How it works:</strong>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li>Fraudster calls pretending to be from your bank/Paytm/GPay</li>
                    <li>Says "Your KYC is expired" or "Account will be blocked"</li>
                    <li>Asks you to share OTP to "update KYC"</li>
                    <li>Once you share OTP, money gets debited from your account</li>
                    <li>They may also ask to install "AnyDesk" or "QuickSupport" app (remote access)</li>
                  </ol>
                </div>

                <div className="mb-4">
                  <strong className="text-green-800 block mb-2">✅ How to protect yourself:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li><strong>NEVER share OTP</strong> with anyone (not even bank employees!)</li>
                    <li>Banks NEVER call asking for OTP or card CVV</li>
                    <li>Hang up immediately if someone asks for OTP</li>
                    <li>KYC updates are done at bank branch or through official app, NOT over call</li>
                    <li>Don't install unknown apps like AnyDesk, TeamViewer (they get remote access to your phone)</li>
                    <li>Verify caller by calling bank's official helpline number (printed on back of card)</li>
                  </ul>
                </div>

                <div className="bg-yellow-100 p-4 rounded">
                  <strong className="text-yellow-900 block mb-1">💡 Pro Tip:</strong>
                  <p className="text-sm text-gray-700">
                    Add your bank's official helpline to contacts. If you get a suspicious call, cut it and call back on saved official number to verify.
                  </p>
                </div>
              </div>
            )}

            {selectedScam === 'qr-scam' && (
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-900 mb-3">📱 QR Code Scam (Reverse Payment Scam)</h3>
                
                <div className="mb-4">
                  <strong className="text-red-800 block mb-2">How it works:</strong>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li>You're selling something on OLX/Quikr/Facebook Marketplace</li>
                    <li>Buyer says "I'll send advance payment, scan this QR"</li>
                    <li>You scan QR thinking you'll RECEIVE money</li>
                    <li>But it's actually a PAYMENT request - money gets DEBITED from your account!</li>
                    <li>Scammer disappears after stealing your money</li>
                  </ol>
                </div>

                <div className="mb-4">
                  <strong className="text-green-800 block mb-2">✅ How to protect yourself:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li><strong>Check payment screen carefully!</strong> It should say "RECEIVING ₹X" not "PAYING ₹X"</li>
                    <li>When receiving money: Give YOUR QR code or UPI ID (don't scan buyer's QR)</li>
                    <li>When paying: You scan merchant's QR code</li>
                    <li>NEVER scan QR code sent by buyer (it's always a payment request, not receive)</li>
                    <li>For selling: Share your UPI ID (abc@paytm) or generate receive money QR from your app</li>
                    <li>Double-check amount and "PAY" vs "RECEIVE" before entering UPI PIN</li>
                  </ul>
                </div>

                <div className="bg-blue-100 p-4 rounded">
                  <strong className="text-blue-900 block mb-1">🎯 Remember:</strong>
                  <p className="text-sm text-gray-700">
                    <strong>Green screen = Receiving money (safe)</strong><br />
                    <strong>Red/Orange screen = Paying money (check carefully!)</strong>
                  </p>
                </div>
              </div>
            )}

            {selectedScam === 'otp-theft' && (
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-900 mb-3">🔢 OTP Theft Scam</h3>
                
                <div className="mb-4">
                  <strong className="text-red-800 block mb-2">How it works:</strong>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li>Fraudster initiates UPI transaction using your mobile number</li>
                    <li>You receive OTP SMS on your phone</li>
                    <li>Scammer calls pretending to be bank: "There's suspicious activity, share OTP to block"</li>
                    <li>OR sends fake SMS: "Your account will be blocked, reply OTP to verify"</li>
                    <li>Once you share OTP, transaction completes and money is stolen</li>
                  </ol>
                </div>

                <div className="mb-4">
                  <strong className="text-green-800 block mb-2">✅ Golden Rules for OTP Security:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li><strong>OTP is like your bank locker key - NEVER share with ANYONE</strong></li>
                    <li>Banks, Paytm, GPay, Amazon - NO ONE will ever ask for OTP</li>
                    <li>Don't share OTP over call, SMS, WhatsApp, email - ANYWHERE!</li>
                    <li>If you get OTP you didn't request → Someone is trying to access your account → Change password immediately</li>
                    <li>Don't read out OTP to anyone (not even if they say "just for verification")</li>
                    <li>Bank employee, police, cybercrime - NO ONE needs your OTP</li>
                  </ul>
                </div>

                <div className="bg-green-100 p-4 rounded">
                  <strong className="text-green-900 block mb-1">✅ Safe OTP Practices:</strong>
                  <p className="text-sm text-gray-700">
                    • Only enter OTP on official website/app YOU opened yourself<br />
                    • Don't click OTP links in SMS (type website URL manually)<br />
                    • OTP valid for 5-10 minutes only (expired OTP = useless for fraudsters)<br />
                    • Enable "Hide OTP preview" in SMS settings
                  </p>
                </div>
              </div>
            )}

            {selectedScam === 'phishing' && (
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-900 mb-3">📧 Phishing Email/SMS Scam</h3>
                
                <div className="mb-4">
                  <strong className="text-red-800 block mb-2">How it works:</strong>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li>You receive email/SMS that LOOKS like it's from bank/Amazon/Flipkart</li>
                    <li>"Your account has suspicious activity - Click here to verify"</li>
                    <li>Link takes you to FAKE website (looks exactly like real one)</li>
                    <li>You enter UPI PIN / card details / OTP on fake site</li>
                    <li>Fraudsters capture your details and steal money</li>
                  </ol>
                </div>

                <div className="mb-4">
                  <strong className="text-green-800 block mb-2">✅ How to identify phishing:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li><strong>Check sender email carefully:</strong> "support@amazoon.com" (extra 'o') is FAKE</li>
                    <li>Real: support@amazon.in | Fake: support@amazon-verify.com</li>
                    <li>Look for spelling errors, poor grammar (banks don't make such mistakes)</li>
                    <li>Urgent language: "Account will be blocked in 24 hours!" = RED FLAG</li>
                    <li>Check website URL: Real = https://icicibank.com | Fake = https://icici-bank.secure.com</li>
                    <li>Banks NEVER ask for UPI PIN, card CVV, full card number via email</li>
                  </ul>
                </div>

                <div className="bg-purple-100 p-4 rounded">
                  <strong className="text-purple-900 block mb-1">🔒 Stay Safe:</strong>
                  <p className="text-sm text-gray-700">
                    • Don't click links in emails/SMS → Type website URL yourself in browser<br />
                    • Check for HTTPS (lock icon) before entering sensitive info<br />
                    • Use official bank app instead of logging via browser links<br />
                    • Enable email spam filter and SMS fraud alert
                  </p>
                </div>
              </div>
            )}

            {selectedScam === 'kbc-lottery' && (
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-900 mb-3">🎰 KBC/Lottery Winner Scam</h3>
                
                <div className="mb-4">
                  <strong className="text-red-800 block mb-2">How it works:</strong>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li>You receive call/SMS: "Congratulations! You won ₹25 Lakh in KBC/Government Lottery!"</li>
                    <li>They send fake "winner certificate" with Amitabh Bachchan's photo</li>
                    <li>"To claim prize, pay ₹5,000 processing fee / tax"</li>
                    <li>You pay → They ask for more: "courier charges", "insurance fee"</li>
                    <li>You keep paying but never receive prize (it doesn't exist!)</li>
                  </ol>
                </div>

                <div className="mb-4">
                  <strong className="text-green-800 block mb-2">✅ Reality Check:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li><strong>You can't win a lottery you never entered!</strong></li>
                    <li>Real lottery winners NEVER have to pay upfront fees</li>
                    <li>KBC participants are selected through official auditions (not random calls)</li>
                    <li>Government lotteries are illegal in most Indian states</li>
                    <li>"Processing fee", "tax advance" = 100% SCAM indicator</li>
                    <li>If you won ₹25L, prize money is AFTER tax (you don't pay tax to receive prize)</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedScam === 'job-scam' && (
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-900 mb-3">💼 Fake Job Offer Scam</h3>
                
                <div className="mb-4">
                  <strong className="text-red-800 block mb-2">How it works:</strong>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li>Job posting on WhatsApp: "Work from home, earn ₹50K/month, simple data entry"</li>
                    <li>"You're selected! Pay ₹2,000 registration fee to join"</li>
                    <li>You pay → They disappear OR give you impossible targets</li>
                    <li>Some variants: "Complete task and earn ₹500" → But you must invest ₹5K first</li>
                  </ol>
                </div>

                <div className="mb-4">
                  <strong className="text-green-800 block mb-2">✅ Identify Fake Jobs:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-2">
                    <li><strong>Real companies NEVER ask for money to give you a job</strong></li>
                    <li>"Too good to be true" salary for simple work = FAKE</li>
                    <li>WhatsApp/Telegram job offers = 99% scam</li>
                    <li>Verify company: Search "[Company Name] job scam" on Google</li>
                    <li>Ask for offer letter on official company email (not Gmail/Yahoo)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Payment Security Best Practices */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">🔒 Payment Security Best Practices</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Enable UPI Transaction Alerts',
                  desc: "Turn on SMS/email alerts for every UPI transaction. You'll know instantly if someone uses your account.",
                  icon: '🔔'
                },
                {
                  title: 'Set UPI Transaction Limit',
                  desc: 'Go to GPay/PhonePe Settings → Reduce daily limit to ₹10K-₹20K (unless you need more). Even if account is compromised, loss is limited.',
                  icon: '🎯'
                },
                {
                  title: 'Use Strong UPI PIN',
                  desc: "Don't use: 1234, 0000, birth year, mobile number. Use random 6-digit PIN. Change every 6 months.",
                  icon: '🔢'
                },
                {
                  title: 'Enable Biometric Lock',
                  desc: "Use fingerprint/face unlock for payment apps. Even if someone steals your phone, they can't make payments.",
                  icon: '👆'
                },
                {
                  title: "Don't Save Card CVV",
                  desc: 'Never save CVV in phone notes/photos. Memorize it. If phone is hacked, saved CVV = instant card misuse.',
                  icon: '💳'
                },
                {
                  title: 'Use Virtual Cards for Online Shopping',
                  desc: 'Banks offer virtual debit cards (temporary card number). Use for risky websites. Even if stolen, main card is safe.',
                  icon: '🛡️'
                },
                {
                  title: 'Check Bank Statements Monthly',
                  desc: 'Review every transaction in monthly statement. Unknown debit? Report to bank within 3 days for refund.',
                  icon: '📊'
                },
                {
                  title: "Don't Use Public WiFi for Payments",
                  desc: 'Public WiFi (cafes, airports) can be hacked. Use mobile data for UPI/banking. If must use WiFi, enable VPN.',
                  icon: '📶'
                }
              ].map((practice, i) => (
                <div key={i} className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 flex items-start gap-4">
                  <span className="text-3xl">{practice.icon}</span>
                  <div>
                    <strong className="text-blue-900 block mb-1">{practice.title}</strong>
                    <p className="text-sm text-gray-700">{practice.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What to Do If You're Scammed */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">🚨 What to Do If You're Scammed (Act Fast!)</h2>
            <div className="space-y-4">
              <div className="bg-red-100 p-5 rounded-lg">
                <strong className="text-red-900 block mb-3 text-lg">⏱️ Within 30 Minutes (Critical Window):</strong>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 ml-2">
                  <li><strong>Call your bank helpline immediately:</strong> Report fraud. They can block transaction if caught within 30-60 mins.</li>
                  <li><strong>Call Cybercrime Helpline: 1930</strong> (National Cyber Crime Helpline - works 24/7)</li>
                  <li><strong>Screenshot everything:</strong> Fraudster's number, messages, transaction ID, UPI reference number</li>
                  <li><strong>Don't delete messages:</strong> They're evidence for police complaint</li>
                </ol>
              </div>

              <div className="bg-orange-100 p-5 rounded-lg">
                <strong className="text-orange-900 block mb-3 text-lg">Within 24 Hours:</strong>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 ml-2">
                  <li><strong>File online complaint:</strong> Visit https://cybercrime.gov.in → Report cybercrime</li>
                  <li><strong>Lodge FIR at police station:</strong> Get written FIR copy (needed for bank refund claim)</li>
                  <li><strong>Submit bank fraud claim:</strong> Fill bank's fraud claim form + attach FIR copy</li>
                  <li><strong>Block UPI/cards:</strong> Temporarily block all payment methods till investigation completes</li>
                  <li><strong>Change all passwords:</strong> Bank app, UPI apps, email, phone lock</li>
                </ol>
              </div>

              <div className="bg-green-100 p-5 rounded-lg">
                <strong className="text-green-900 block mb-3 text-lg">Follow-up (Next 7-15 Days):</strong>
                <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 ml-2">
                  <li><strong>Track complaint status:</strong> Use complaint reference number on cybercrime.gov.in</li>
                  <li><strong>Follow up with bank:</strong> Call every 3-4 days for refund status</li>
                  <li><strong>Check CIBIL score:</strong> Ensure fraudster didn't take loan in your name</li>
                  <li><strong>Enable transaction alerts:</strong> So you're notified of any future unauthorized transactions</li>
                </ol>
              </div>
            </div>

            <div className="mt-6 bg-blue-100 p-5 rounded-lg">
              <strong className="text-blue-900 block mb-2">📞 Important Helpline Numbers:</strong>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span><strong>Cybercrime:</strong> 1930 (National Helpline)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span><strong>Banking Ombudsman:</strong> 14448</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-700" />
                  <span><strong>Email:</strong> complaints@cybercrime.gov.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span><strong>Consumer Helpline:</strong> 1800-11-4000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Tips */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">✅ Golden Rules to Stay Safe</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Rule 1:</strong> If someone asks for OTP, UPI PIN, CVV → It's 100% SCAM. No exceptions!</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Rule 2:</strong> Banks/Paytm/GPay NEVER call asking for sensitive details. They have all your info already!</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Rule 3:</strong> When selling online: Give your UPI ID. NEVER scan buyer's QR code.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Rule 4:</strong> Too good to be true = It IS a scam (free lottery, easy money, instant jobs).</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Rule 5:</strong> Think before clicking links. Type website URL yourself instead of clicking SMS/email links.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Rule 6:</strong> If in doubt, DON'T proceed. Verify by calling official helpline. Better safe than sorry!</span>
              </li>
            </ul>
          </div>

          {/* Next Lesson CTA */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">🚀 Explore FinTech Apps Next!</h3>
            <p className="text-gray-600 mb-6">
              Now that you know how to stay safe, explore the best <strong>FinTech apps in India</strong> - CRED, Jupiter, Fi, Niyo, and neo banking revolution!
            </p>
            <Link
              to="/learn/fintech-digital-payments/best-fintech-apps-india-cred-jupiter-fi-niyo-salary-accounts-2025"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-bold hover:shadow-xl transition-all"
            >
              Next: FinTech Apps Guide <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSecurityGuide;


