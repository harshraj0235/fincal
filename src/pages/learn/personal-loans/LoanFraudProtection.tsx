import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Shield, AlertTriangle, CheckCircle, XCircle, Eye, Lock, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const LoanFraudProtection: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loan Fraud Protection: Complete Safety Guide 2025 | MoneyCal"
        description="Protect yourself from personal loan frauds and scams in India. Learn to identify fake lenders, secure application process, and avoid common fraud schemes. Complete safety guide."
        keywords="personal loan fraud, loan scams, fake lenders, loan fraud protection, secure loan application, loan safety tips"
        canonicalUrl="/learn/personal-loans/loan-fraud-protection"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: 'Personal Loan Fraud Protection: Complete Safety Guide',
          description: 'Comprehensive guide to protect yourself from personal loan frauds and scams with practical safety tips and fraud identification techniques.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            url: 'https://moneycal.in'
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <Link 
                to="/learn/personal-loans" 
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Personal Loans
              </Link>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Lesson 18 of 20
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Critical
                </span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Personal Loan Fraud Protection
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Stay safe from loan frauds and scams with comprehensive protection strategies and fraud identification techniques
              </p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2" />
                <span>11 min read</span>
                <span className="mx-2">•</span>
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Safety Guide</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-8 h-8 text-red-600 mr-3" />
                  Complete Fraud Protection Guide
                </h2>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    Personal loan frauds are on the rise in India, with scammers using sophisticated techniques to 
                    trick borrowers. Learn to identify and protect yourself from these fraudulent schemes.
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                    <h3 className="text-xl font-semibold text-red-900 mb-3">
                      ⚠️ Critical Warning
                    </h3>
                    <p className="text-red-800">
                      Loan frauds can result in financial loss, identity theft, and legal issues. Always verify 
                      lender credentials and never share sensitive information with unverified sources.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Common Types of Loan Frauds
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-red-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        🚨 Advance Fee Fraud
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Scammers ask for upfront fees before processing your loan application.
                      </p>
                      <div className="bg-red-50 p-4 rounded border border-red-200">
                        <h5 className="font-semibold text-red-900 mb-2">Red Flags:</h5>
                        <ul className="text-sm text-red-800 space-y-1">
                          <li>• Asking for processing fees before loan approval</li>
                          <li>• Demanding payment through gift cards or cryptocurrency</li>
                          <li>• Pressure tactics to pay immediately</li>
                          <li>• Promising guaranteed approval for a fee</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        🚨 Fake Lender Websites
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Fraudulent websites that mimic legitimate banks and NBFCs to steal personal information.
                      </p>
                      <div className="bg-orange-50 p-4 rounded border border-orange-200">
                        <h5 className="font-semibold text-orange-900 mb-2">Red Flags:</h5>
                        <ul className="text-sm text-orange-800 space-y-1">
                          <li>• Poor website design and grammar errors</li>
                          <li>• No physical address or contact information</li>
                          <li>• Unrealistic interest rates (too low)</li>
                          <li>• No RBI license number displayed</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        🚨 Identity Theft Scams
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Scammers steal your personal information to apply for loans in your name.
                      </p>
                      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                        <h5 className="font-semibold text-yellow-900 mb-2">Red Flags:</h5>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Unsolicited calls asking for personal details</li>
                          <li>• Requests for Aadhaar, PAN, or bank details</li>
                          <li>• Calls claiming to be from banks you don't have accounts with</li>
                          <li>• Pressure to share OTP or passwords</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        🚨 Loan Modification Scams
                      </h4>
                      <p className="text-gray-700 mb-3">
                        Fraudsters offer to help modify existing loans for a fee, often targeting struggling borrowers.
                      </p>
                      <div className="bg-purple-50 p-4 rounded border border-purple-200">
                        <h5 className="font-semibold text-purple-900 mb-2">Red Flags:</h5>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>• Unsolicited offers to reduce loan payments</li>
                          <li>• Requests for upfront fees for loan modification</li>
                          <li>• Pressure to stop paying current lender</li>
                          <li>• Promises of guaranteed loan forgiveness</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    How to Identify Legitimate Lenders
                  </h3>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">
                      ✅ Legitimate Lender Checklist
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">RBI Registration:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Check RBI website for license</li>
                          <li>• Verify registration number</li>
                          <li>• Confirm authorized activities</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">Physical Presence:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Registered office address</li>
                          <li>• Branch network</li>
                          <li>• Customer service centers</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">Transparent Terms:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Clear interest rates</li>
                          <li>• Detailed fee structure</li>
                          <li>• Proper documentation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">Professional Service:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Proper customer support</li>
                          <li>• Secure website (HTTPS)</li>
                          <li>• Privacy policy</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Red Flags to Watch Out For
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                      <h4 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        Immediate Red Flags
                      </h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>• Guaranteed approval promises</li>
                        <li>• No credit check required</li>
                        <li>• Interest rates too good to be true</li>
                        <li>• Pressure to decide immediately</li>
                        <li>• Requests for upfront payments</li>
                        <li>• Unprofessional communication</li>
                        <li>• No physical address</li>
                        <li>• Requests for unusual payment methods</li>
                      </ul>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                      <h4 className="text-lg font-semibold text-orange-900 mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Warning Signs
                      </h4>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Poor website quality</li>
                        <li>• Generic email addresses</li>
                        <li>• No customer reviews</li>
                        <li>• Vague loan terms</li>
                        <li>• Requests for excessive documentation</li>
                        <li>• Unusual verification processes</li>
                        <li>• No privacy policy</li>
                        <li>• Suspicious contact methods</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Safe Application Process
                  </h3>

                  <div className="space-y-6 mb-8">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Research the Lender</h4>
                        <p className="text-gray-700 text-sm">Verify RBI registration, check reviews, and confirm physical presence</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Use Official Channels</h4>
                        <p className="text-gray-700 text-sm">Apply through official website, app, or branch only</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Protect Personal Information</h4>
                        <p className="text-gray-700 text-sm">Never share sensitive details over phone or email</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Read All Documents</h4>
                        <p className="text-gray-700 text-sm">Carefully review terms, conditions, and fee structure</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">5</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Verify Before Signing</h4>
                        <p className="text-gray-700 text-sm">Double-check all details and get clarifications</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">6</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Keep Records</h4>
                        <p className="text-gray-700 text-sm">Maintain copies of all documents and communications</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Digital Security Best Practices
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                        <Lock className="w-5 h-5 mr-2" />
                        Online Security
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Use strong, unique passwords</li>
                        <li>• Enable two-factor authentication</li>
                        <li>• Check for HTTPS in URLs</li>
                        <li>• Avoid public Wi-Fi for applications</li>
                        <li>• Keep software updated</li>
                        <li>• Use antivirus protection</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        Information Protection
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Never share OTP with anyone</li>
                        <li>• Be cautious with personal details</li>
                        <li>• Verify caller identity</li>
                        <li>• Don't click suspicious links</li>
                        <li>• Check email sender authenticity</li>
                        <li>• Report suspicious activities</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    What to Do If You're a Victim
                  </h3>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-red-900 mb-3">
                      🚨 Immediate Action Steps
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Stop all communication</h5>
                          <p className="text-red-800 text-sm">Immediately cease contact with the fraudulent party</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Report to authorities</h5>
                          <p className="text-red-800 text-sm">File complaint with cybercrime cell and RBI</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Inform your bank</h5>
                          <p className="text-red-800 text-sm">Alert your bank about potential fraud</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Monitor your accounts</h5>
                          <p className="text-red-800 text-sm">Check for unauthorized transactions</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-red-100 p-1 rounded-full mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-900">Document everything</h5>
                          <p className="text-red-800 text-sm">Keep records of all communications and transactions</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Reporting Fraud
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                        <Phone className="w-5 h-5 mr-2" />
                        Government Agencies
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Cyber Crime Cell: 1930</li>
                        <li>• RBI Grievance Portal</li>
                        <li>• Banking Ombudsman</li>
                        <li>• Consumer Forum</li>
                        <li>• Local Police Station</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                        <Mail className="w-5 h-5 mr-2" />
                        Information to Provide
                      </h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Fraudster's contact details</li>
                        <li>• Screenshots of communications</li>
                        <li>• Transaction records</li>
                        <li>• Timeline of events</li>
                        <li>• Financial loss details</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
                    Prevention Checklist
                  </h3>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-green-900 mb-3">
                      ✅ Daily Protection Habits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">Before Applying:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Verify lender credentials</li>
                          <li>• Check RBI registration</li>
                          <li>• Read customer reviews</li>
                          <li>• Compare multiple options</li>
                          <li>• Understand all terms</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-green-900 mb-2">During Application:</h5>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Use secure connections</li>
                          <li>• Never share OTP</li>
                          <li>• Verify all requests</li>
                          <li>• Keep records</li>
                          <li>• Ask questions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8 mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How can I verify if a lender is legitimate?
                    </h3>
                    <p className="text-gray-700">
                      Check the RBI website for the lender's registration, verify their physical address, 
                      look for customer reviews, and ensure they have proper licensing and documentation.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What should I do if someone asks for upfront fees?
                    </h3>
                    <p className="text-gray-700">
                      Never pay upfront fees for loan processing. Legitimate lenders deduct processing fees 
                      from the loan amount or collect them after approval. This is a major red flag.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Is it safe to apply for loans online?
                    </h3>
                    <p className="text-gray-700">
                      Yes, if you use legitimate, RBI-licensed lenders with secure websites (HTTPS). 
                      Always verify the lender's credentials and avoid sharing sensitive information over unsecured connections.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What information should I never share?
                    </h3>
                    <p className="text-gray-700">
                      Never share OTP, PIN, passwords, or CVV numbers. Be cautious about sharing Aadhaar, 
                      PAN, or bank account details unless you're certain about the lender's legitimacy.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      How do I report loan fraud?
                    </h3>
                    <p className="text-gray-700">
                      Report to cybercrime cell (1930), RBI grievance portal, your bank, and local police. 
                      Provide all relevant details including communications, transaction records, and fraudster information.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-8"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Loans Course
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between py-2 px-3 bg-red-50 rounded-lg">
                    <span className="text-red-800 font-medium">Fraud Protection</span>
                    <span className="text-red-600">Current</span>
                  </div>
                  
                  <Link to="/learn/personal-loans/loan-refinancing" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Loan Refinancing</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-closure-process" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Loan Closure</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-success-tips" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Success Tips</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-future-trends" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Future Trends</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  
                  <Link to="/learn/personal-loans/loan-case-studies" className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-gray-700">Case Studies</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">18/20</div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-between items-center mt-8"
          >
            <Link
              to="/learn/personal-loans/loan-myths-debunked"
              className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: Myths Debunked
            </Link>
            
            <Link
              to="/learn/personal-loans/loan-refinancing"
              className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Next: Loan Refinancing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoanFraudProtection;
