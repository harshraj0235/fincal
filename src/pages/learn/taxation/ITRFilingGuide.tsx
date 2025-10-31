import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, FileText, CheckCircle, AlertTriangle, Download, Upload } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const ITRFilingGuide: React.FC = () => {
  const [selectedITR, setSelectedITR] = useState('ITR-1');

  return (
    <>
      <SEOHelmet title="ITR Filing Complete Guide: File Income Tax Return Online India 2025 | MoneyCal" description="Learn ITR filing step-by-step. Which ITR form, documents needed, filing on incometax.gov.in, Form 16, TDS, refund process." keywords="ITR filing India, income tax return, ITR-1, ITR-2, Form 16, TDS, tax refund, ITR फाइलिंग गाइड" url="/learn/taxation-compliance/itr-filing-complete-guide-online-income-tax-return-india-2025" />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex justify-between mb-8">
            <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-purple-600"><ArrowLeft className="w-5 h-5" />Back</Link>
            <span className="text-sm text-gray-600">Lesson 3 of 7</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">ITR Filing Complete Guide</h1>
          <p className="text-xl text-gray-600 mb-8">ऑनलाइन आयकर रिटर्न कैसे भरें - Step by Step</p>

          {/* Which ITR Form Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">📋 Step 1: Choose Correct ITR Form</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {['ITR-1', 'ITR-2', 'ITR-3'].map((form) => (
                <button
                  key={form}
                  onClick={() => setSelectedITR(form)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedITR === form
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <strong className="text-lg block mb-2">{form}</strong>
                  <span className="text-xs text-gray-600">
                    {form === 'ITR-1' && 'Salaried'}
                    {form === 'ITR-2' && 'Multiple sources'}
                    {form === 'ITR-3' && 'Business'}
                  </span>
                </button>
              ))}
            </div>

            {selectedITR === 'ITR-1' && (
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-900 mb-3">ITR-1 (Sahaj) - Most Common</h3>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Who can use:</strong> Salaried employees, pensioners with income up to ₹50 lakh from salary, one house property, and other sources (interest, etc.)
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ Salary income (Form 16 from employer)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ One house property (self-occupied or rented)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ Interest from savings account/FD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>❌ Capital gains (shares sold)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>❌ Business income</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>❌ Foreign income/assets</span>
                  </div>
                </div>
              </div>
            )}

            {selectedITR === 'ITR-2' && (
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-900 mb-3">ITR-2 - For Investors & Multiple Properties</h3>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Who must use:</strong> Individuals with capital gains (shares/property sold), multiple house properties, foreign income, or income &gt; ₹50 lakh
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ Capital gains from stocks/mutual funds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ More than one house property</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ Foreign income/assets (must declare)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ Director in company</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>❌ Business/profession income</span>
                  </div>
                </div>
              </div>
            )}

            {selectedITR === 'ITR-3' && (
              <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-900 mb-3">ITR-3 - For Business Owners & Professionals</h3>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Who must use:</strong> Individuals with business/professional income (doctors, lawyers, freelancers, traders, shop owners)
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ Business income (proprietary)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ Professional income (doctor, CA, lawyer)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ Partner in firm</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>✅ All capital gains, salary, house property</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Documents Required Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">📂 Step 2: Documents Required</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { doc: 'Form 16 (from employer)', icon: '📄', why: 'Shows salary, TDS deducted' },
                { doc: 'Form 26AS (Tax Credit Statement)', icon: '🧾', why: 'All TDS on your PAN' },
                { doc: 'Bank account details', icon: '🏦', why: 'For refund (IFSC, account no.)' },
                { doc: 'Savings account interest certificates', icon: '💰', why: 'Interest earned on FD/savings' },
                { doc: 'Home loan interest certificate', icon: '🏠', why: 'For 24(b) deduction' },
                { doc: 'Investment proofs (80C, 80D)', icon: '📊', why: 'PPF, ELSS, insurance receipts' },
                { doc: 'Capital gains statement (if stocks sold)', icon: '📈', why: 'From broker (Zerodha, Groww)' },
                { doc: 'Aadhaar card', icon: '🆔', why: 'Mandatory for e-verification' }
              ].map((item, i) => (
                <div key={i} className="bg-purple-50 p-4 rounded-lg flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <strong className="text-purple-900 block">{item.doc}</strong>
                    <span className="text-xs text-gray-600">{item.why}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Filing Process */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">🚀 Step 3: Filing Process (Online on incometax.gov.in)</h2>
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Login to Income Tax Portal',
                  desc: 'Go to incometax.gov.in → Login with PAN, password. Register if first time (use Aadhaar OTP).',
                  time: '2 mins'
                },
                {
                  step: 2,
                  title: 'Go to e-File → Income Tax Return',
                  desc: 'Select Assessment Year (AY 2025-26 for FY 2024-25). Choose correct ITR form (ITR-1/2/3).',
                  time: '1 min'
                },
                {
                  step: 3,
                  title: 'Online vs Offline Filing',
                  desc: 'Online: Fill form directly on portal (easier, auto-calculated). Offline: Download Excel/Java utility, upload later.',
                  time: '0 min'
                },
                {
                  step: 4,
                  title: 'Pre-Filled Data Auto-Loaded',
                  desc: 'Portal auto-fills: Salary (from Form 16), TDS (from 26AS), interest, dividends. Verify all details!',
                  time: '5 mins'
                },
                {
                  step: 5,
                  title: 'Enter Deductions (80C, 80D, etc.)',
                  desc: 'Fill investment details: PPF, ELSS, life insurance, home loan interest, health insurance. Upload proofs if asked.',
                  time: '10 mins'
                },
                {
                  step: 6,
                  title: 'Tax Computation Auto-Calculated',
                  desc: 'Portal calculates total tax, TDS paid, refund/payment due. Cross-verify with your calculation.',
                  time: '2 mins'
                },
                {
                  step: 7,
                  title: 'Preview & Submit Return',
                  desc: 'Preview full ITR PDF. Check all sections. Click "Submit". You get Acknowledgement Number.',
                  time: '3 mins'
                },
                {
                  step: 8,
                  title: 'E-Verify (Mandatory!)',
                  desc: 'Verify within 30 days using: Aadhaar OTP (easiest), net banking, or send ITR-V to Bangalore CPC.',
                  time: '2 mins'
                }
              ].map((item) => (
                <div key={item.step} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                      <strong className="text-lg text-purple-900">{item.title}</strong>
                    </div>
                    <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 ml-11">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-green-100 p-4 rounded-lg">
              <strong className="text-green-900 block mb-2">⏱️ Total Time: ~25-30 minutes (first time may take 45 mins)</strong>
              <p className="text-sm text-gray-700">💡 Pro Tip: Keep all documents ready before starting. File early (don't wait till July 31 deadline)!</p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">⚠️ Common ITR Filing Mistakes</h2>
            <div className="space-y-3">
              {[
                { mistake: 'Wrong ITR form selected', fix: 'Capital gains? Use ITR-2, not ITR-1. Business income? Use ITR-3.' },
                { mistake: 'Not matching Form 26AS with Form 16', fix: 'TDS shown in 26AS must match Form 16. Mismatched TDS = notice!' },
                { mistake: 'Forgetting to e-verify', fix: 'Return not processed without e-verification. Do it immediately after filing.' },
                { mistake: 'Not reporting bank interest', fix: 'Bank interest above ₹10K is auto-reported to IT dept. Must declare even if <₹10K.' },
                { mistake: 'Wrong bank account for refund', fix: 'Pre-validate bank account in profile. Wrong account = refund delayed/rejected.' },
                { mistake: 'Not reporting capital gains', fix: 'Sold shares/MF? Must report even if no profit. Broker reports to IT dept!' },
                { mistake: 'Claiming deductions without proofs', fix: 'Keep all receipts (insurance, PPF, ELSS). IT can ask for proof anytime in 6 years.' },
                { mistake: 'Filing after deadline (July 31)', fix: 'Late filing penalty: ₹5,000 (₹1,000 if income <₹5L). Losses can\'t be carried forward.' }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <strong className="text-red-900 block mb-1">{item.mistake}</strong>
                      <p className="text-sm text-gray-700"><strong className="text-green-700">Fix:</strong> {item.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Process */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">💸 Tax Refund Process</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg">
                <h3 className="text-lg font-bold text-blue-900 mb-3">When Do You Get Refund?</h3>
                <p className="text-sm text-gray-700 mb-3">
                  If TDS deducted by employer is <strong>more than</strong> your actual tax liability (after deductions), you get refund!
                </p>
                <div className="bg-white p-3 rounded border-2 border-blue-300">
                  <p className="text-xs text-gray-600 mb-1">Example:</p>
                  <p className="text-sm">
                    Salary: ₹8L → TDS deducted: ₹50K<br />
                    After 80C (₹1.5L), actual tax: ₹35K<br />
                    <strong className="text-green-700">Refund = ₹50K - ₹35K = ₹15,000</strong>
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-lg font-bold text-green-900 mb-3">Refund Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span><strong>Step 1:</strong> File ITR + E-verify → Acknowledgement generated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span><strong>Step 2:</strong> IT Dept processes return (2-8 weeks)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span><strong>Step 3:</strong> Refund approved → Credited to bank (within 7 days)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  💡 Track refund status: Login to incometax.gov.in → View Returns/Forms → Refund Status
                </p>
              </div>
            </div>
          </div>

          {/* Key Dates */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">📅 Important Deadlines</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
                <strong className="block text-lg mb-2">July 31, 2025</strong>
                <p className="text-sm">Deadline for salaried individuals (ITR-1, ITR-4)</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
                <strong className="block text-lg mb-2">October 31, 2025</strong>
                <p className="text-sm">For tax audit cases (ITR-3 with audit)</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
                <strong className="block text-lg mb-2">December 31, 2025</strong>
                <p className="text-sm">Belated/Revised return deadline (with penalty)</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
                <strong className="block text-lg mb-2">March 31, 2026</strong>
                <p className="text-sm">Absolute last date (loss carry-forward not allowed)</p>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">💡 Pro Tips for Smooth ITR Filing</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Download Form 26AS before filing:</strong> Login → My Account → View Form 26AS. This shows all TDS credited to your PAN.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Pre-validate bank account:</strong> Profile Settings → My Bank Accounts → Add account. Validates instantly via penny drop.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Use JSON download for ITR-2/3:</strong> For complex returns, download prefilled JSON, edit offline, re-upload. Faster than online form.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>File early (by June):</strong> Avoid last-minute rush. Portal crashes on July 30-31. Early filing = faster refund.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Keep email/mobile updated:</strong> IT Dept sends notices to registered email. Update in Profile → Communication.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Save acknowledgement PDF:</strong> After filing, download ITR Acknowledgement. Keep for records. Needed for loans/visa.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>Link Aadhaar with PAN:</strong> Mandatory! Unlinked PAN = ITR not processed. Link at incometax.gov.in → Link Aadhaar.</span>
              </li>
            </ul>
          </div>

          {/* Next Lesson CTA */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">🎓 Master TDS Next!</h3>
            <p className="text-gray-600 mb-6">
              Now that you know ITR filing, learn about <strong>TDS (Tax Deducted at Source)</strong> - what it is, how to claim excess TDS refund, and Form 16 explained.
            </p>
            <Link
              to="/learn/taxation-compliance/tds-tax-deducted-at-source-certificate-claim-refund-india"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-bold hover:shadow-xl transition-all"
            >
              Next: TDS Explained <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ITRFilingGuide;
