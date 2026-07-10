import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Shield, CheckCircle, Target, AlertTriangle, 
  DollarSign, Heart, Users, TrendingUp, Calculator, Lightbulb,
  XCircle, FileText, Award, Clock, Zap, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TermInsuranceGuide: React.FC = () => {
  const [age, setAge] = useState(30);
  const [annualIncome, setAnnualIncome] = useState(600000);
  
  const recommendedCover = annualIncome * 15; // 15x annual income rule
  const estimatedPremium = (recommendedCover / 100000) * (age < 30 ? 600 : age < 40 ? 800 : 1200);

  return (
    <>
      <SEOHelmet 
        title="Term Insurance Guide: ₹1 Crore Cover for ₹12K/Year India | MoneyCal" 
        description="Complete term insurance guide in Hindi & English. Cover amount Calculator, best companies, online vs offline, riders explained. Real Indian examples." 
        keywords="term insurance India, 1 crore cover, term insurance Calculator, best term plans, टर्म इंश्योरेंस, life insurance guide" 
        url="/learn/insurance-retirement/term-insurance-complete-guide-1-crore-cover-india" 
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Insurance & Retirement</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 1 of 7</span>
                <Link 
                  to="/learn/insurance-retirement/health-insurance-india-5-lakh-cover-family-floater-portability"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Lesson Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  Lesson 1 • 55 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Term Insurance Complete Guide
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  टर्म इंश्योरेंस - ₹1 करोड़ कवर सिर्फ ₹12K/वर्ष में
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  `Understand what term insurance is and why it's the cheapest life cover`,
                  'Calculate how much cover you need (15x income rule)',
                  'Compare online vs offline term plans (save 30-40% buying online)',
                  'Choose best insurance company (claim settlement ratio 95%+)',
                  'Add riders wisely (critical illness, accidental death, waiver of premium)',
                  'Avoid common mistakes (buying insufficient cover, mixing insurance with investment)'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* What is Term Insurance */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💡 What is Term Insurance? (टर्म इंश्योरेंस क्या है?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Term insurance</strong> is pure life cover - if you die during the policy term, your family gets the sum assured (e.g., ₹1 crore). 
                If you survive, you get <strong>nothing back</strong>. That's why it's <strong>10x cheaper</strong> than traditional policies.
              </p>

              <p className="text-lg text-gray-700 mb-4">
                <strong>Hindi में समझें:</strong> टर्म इंश्योरेंस एक शुद्ध जीवन बीमा है। अगर पॉलिसी अवधि के दौरान आपकी मृत्यु हो जाती है, 
                तो आपके परिवार को बीमा राशि (जैसे ₹1 करोड़) मिलती है। अगर आप जीवित रहते हैं, तो कुछ नहीं मिलता - इसलिए यह सबसे सस्ता है।
              </p>

              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500 my-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">Real Example: 30-year-old Earning ₹6L/year</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Recommended Cover:</strong> ₹6L × 15 = ₹90 lakh (round to ₹1 crore)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Premium (Online Term Plan):</strong> ₹10,000-12,000 per year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Policy Term:</strong> 30 years (till age 60)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Total Premium Paid:</strong> ₹12K × 30 years = ₹3.6 lakh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Family Gets (if you die):</strong> ₹1 crore (tax-free!)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>You Get (if you survive till 60):</strong> ₹0 - pero your family was protected for 30 years!</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Cover Amount Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <IndianRupee className="w-8 h-8 text-blue-600" />
              🧮 How Much Cover Do YOU Need?
            </h2>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Your Age:</label>
                  <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg font-semibold"
                    min="18"
                    max="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Annual Income (₹):</label>
                  <input 
                    type="number" 
                    value={annualIncome} 
                    onChange={(e) => setAnnualIncome(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg font-semibold"
                    min="100000"
                    max="10000000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-blue-500">
                  <div className="text-sm text-gray-600 mb-1">Recommended Cover (15x Rule)</div>
                  <div className="text-3xl font-bold text-blue-700">
                    ₹{(recommendedCover / 10000000).toFixed(2)} Cr
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Ensures family can maintain lifestyle for 15+ years</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-green-500">
                  <div className="text-sm text-gray-600 mb-1">Estimated Premium/Year</div>
                  <div className="text-3xl font-bold text-green-700">
                    ₹{estimatedPremium.toFixed(0).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Online term plan, non-smoker, good health</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-900 mb-3">📏 Cover Amount Formula (3 Methods):</h3>
              <ol className="space-y-3 text-gray-700">
                <li><strong>1. Income Method (Most Common):</strong> Annual income × 15 = Cover amount</li>
                <li><strong>2. Human Life Value:</strong> (Annual income - Annual expenses) × Remaining working years</li>
                <li><strong>3. Need-Based:</strong> Outstanding loans + Children education + Family expenses for 10 years</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Pro Tip:</strong> Use method 1 for quick estimate. Method 3 for precise calculation. 
                Most Indians need ₹50L-₹2 Cr cover depending on income and liabilities.
              </p>
            </div>
          </motion.section>

          {/* Term vs Traditional Plans */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg overflow-x-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚖️ Term Insurance vs Traditional Plans (LIC Jeevan Saral, Endowment)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-3 text-left">Feature</th>
                    <th className="p-3">Term Insurance ✅</th>
                    <th className="p-3">Traditional/Endowment ❌</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Cover Amount (₹1 Cr)</td>
                    <td className="p-3 text-center font-bold text-green-700">₹12,000/year</td>
                    <td className="p-3 text-center font-bold text-red-700">₹1,20,000/year</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Purpose</td>
                    <td className="p-3 text-center">Pure protection for family</td>
                    <td className="p-3 text-center">Protection + Savings (mixed)</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Returns if Survive</td>
                    <td className="p-3 text-center">₹0 (no maturity)</td>
                    <td className="p-3 text-center">₹30-40 lakh (4-5% returns)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Better Alternative</td>
                    <td className="p-3 text-center">Term + Invest difference</td>
                    <td className="p-3 text-center">Expensive, low returns</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Example (30 years)</td>
                    <td className="p-3 text-center">
                      ₹12K/year term + ₹1.08L/year SIP @ 12% = ₹1 Cr cover + ₹3.5 Cr wealth
                    </td>
                    <td className="p-3 text-center">
                      ₹1.2L/year endowment = ₹1 Cr cover + apenas ₹50L maturity
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Verdict</td>
                    <td className="p-3 text-center">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">BEST OPTION</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-bold">AVOID</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-green-50 rounded-xl p-6">
              <strong className="text-green-900 text-lg block mb-3">💰 The Math is Clear:</strong>
              <p className="text-gray-700">
                If you have ₹1.2 lakh/year to spend: <br/>
                <strong>Option A (Traditional):</strong> Pay ₹1.2L to endowment plan. Get ₹1 Cr cover + ₹50L after 30 years.<br/>
                <strong>Option B (Term + SIP):</strong> Pay ₹12K for term (₹1 Cr cover) + invest ₹1.08L in SIP. 
                Get ₹1 Cr cover + ₹3.5 Cr wealth after 30 years.<br/><br/>
                <strong className="text-green-700">Option B gives you ₹3 CRORE MORE!</strong> That's why financial experts say: 
                <strong> "Never mix insurance with investment."</strong>
              </p>
            </div>
          </motion.section>

          {/* Real Indian Examples */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📖 Real Indian Success Stories
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <strong className="text-lg text-green-900">Life Saved: Ramesh's Family (IT Professional, Hyderabad)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Background:</strong> Ramesh, 35, software engineer earning ₹12L/year. Bought ₹1.5 Cr term plan 
                  (HDFC Life Click 2 Protect) for ₹18,000/year in 2018.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Tragedy:</strong> In 2023, died in car accident. Wife Kavita (homemaker), 2 kids (age 6, 9), 
                  ₹40L home loan outstanding.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Claim Settled:</strong> ₹1.5 Cr paid to Kavita in 18 days (HDFC has 99.1% claim settlement ratio). 
                  She cleared ₹40L home loan. Invested ₹1.1 Cr in FD (₹7.7L annual interest). Kids' education secured.
                </p>
                <p className="text-green-700 font-bold">
                  ✅ Total premium paid: apenas ₹90,000 (₹18K × 5 years). Family got ₹1.5 CRORE. 
                  This is why term insurance is critical.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                  <strong className="text-lg text-blue-900">Smart Planning: Neha (Doctor, Pune)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> 28, earning ₹8L/year. LIC agent (uncle) pushing Jeevan Anand plan 
                  (₹50,000/year for ₹50L cover + returns).
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Decision:</strong> Rejected LIC Jeevan Anand. Bought <strong>Max Life term plan online</strong> 
                  (₹1.2 Cr cover for ₹15,000/year). Invested remaining ₹35,000 in mutual fund SIP.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>After 25 years:</strong><br/>
                  LIC Jeevan Anand: ₹50L cover + ₹20L maturity (5% returns) + family uncle unhappy pero who cares 😄<br/>
                  Neha's choice: ₹1.2 Cr cover + ₹1.3 Cr SIP corpus (12% returns on ₹35K/year SIP)
                </p>
                <p className="text-blue-700 font-bold">
                  ✅ Neha got 2.4x MORE cover + ₹1.1 Cr EXTRA wealth by avoiding LIC endowment plan!
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <strong className="text-lg text-red-900">Mistake to Avoid: Suresh (Businessman, Chennai)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> 40 years old, earning ₹20L/year. Thought "I'm healthy, don't need insurance." 
                  Kept delaying.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Problem:</strong> At age 45, detected diabetes. Now every insurance company either rejects 
                  or charges 40-50% higher premium (₹40K instead of ₹25K for ₹1 Cr).
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Lesson:</strong> Buy term insurance YOUNG and HEALTHY. Even if you feel you don't "need" it now. 
                  Age 25-30 is the cheapest time. Every 5 years delay = 30-40% higher premium.
                </p>
                <p className="text-red-700 font-bold">
                  ❌ Suresh's delay cost him ₹90,000 extra over 20 years (₹15K extra × 20 years)!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Best Companies (Claim Settlement Ratio) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🏆 Best Term Insurance Companies (2024-25)
            </h2>

            <p className="text-gray-700 mb-6">
              <strong>Most Important Metric:</strong> <strong>Claim Settlement Ratio (CSR)</strong> - 
              Percentage of death claims paid by insurance company. Higher = better. Aim for 95%+.
            </p>

            <div className="space-y-4">
              {[
                {
                  company: 'Max Life Insurance',
                  csr: '99.51%',
                  premium: '₹11,000',
                  pros: ['Highest CSR in India', 'Fast claim settlement (10-15 days)', 'Excellent customer service'],
                  plans: 'Max Life Smart Secure Plus, Max Life Online Term Plan Pro'
                },
                {
                  company: 'HDFC Life',
                  csr: '99.10%',
                  premium: '₹12,500',
                  pros: ['Very high CSR', 'Wide branch network', 'Multiple riders available'],
                  plans: 'HDFC Life Click 2 Protect 3D Plus, HDFC Life Sanchay Plus'
                },
                {
                  company: 'ICICI Prudential Life',
                  csr: '98.50%',
                  premium: '₹13,000',
                  pros: ['Trusted brand', 'Quick online purchase', 'Good for critical illness rider'],
                  plans: 'ICICI Pru iProtect Smart, ICICI Pru iProtect Genius'
                },
                {
                  company: 'Tata AIA Life',
                  csr: '98.32%',
                  premium: '₹12,800',
                  pros: ['AIA global backing', 'Return of premium option', 'Flexible payout modes'],
                  plans: 'Tata AIA Life Insurance Sampoorna Raksha Supreme, Tata AIA Maha Raksha Supreme'
                },
                {
                  company: 'SBI Life',
                  csr: '97.50%',
                  premium: '₹14,000',
                  pros: ['Government backing (trust)', 'Large distribution', 'Senior citizens friendly'],
                  plans: 'SBI Life eShield, SBI Life Smart Shield'
                },
                {
                  company: 'LIC (Life Insurance Corporation)',
                  csr: '97.45%',
                  premium: '₹16,000',
                  pros: ['Government owned', 'Highest trust in India', 'Claim settlement guaranteed'],
                  cons: ['15-20% costlier than private', 'Slower digital processes'],
                  plans: 'LIC Tech Term, LIC Jeevan Amar'
                }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300">
                  <div className="flex items-center justify-between mb-3">
                    <strong className="text-xl text-blue-900">{item.company}</strong>
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold">
                      CSR: {item.csr}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-sm text-gray-600">Premium (₹1 Cr cover, age 30)</div>
                      <div className="text-2xl font-bold text-blue-700">{item.premium}/year</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-sm text-gray-600">Popular Plans</div>
                      <div className="text-sm font-semibold text-gray-800">{item.plans}</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <strong className="text-green-800 block mb-2">✅ Why Choose:</strong>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {item.pros.map((pro, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                    {item.cons && (
                      <div className="mt-3">
                        <strong className="text-red-800 block mb-2">⚠️ Cons:</strong>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {item.cons.map((con, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Riders Explained */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🛡️ Riders: Extra Protection Add-Ons
            </h2>

            <p className="text-gray-700 mb-6">
              <strong>Riders</strong> are additional benefits you can add to your base term plan for extra premium. 
              Think of them as insurance upgrades. Add only what you NEED, not everything bank offers.
            </p>

            <div className="space-y-4">
              {[
                {
                  name: 'Critical Illness Rider',
                  nameHindi: 'गंभीर बीमारी राइडर',
                  cost: '₹2,000-4,000/year',
                  cover: '₹20-50 lakh',
                  description: 'Pays lump sum if diagnosed with cancer, heart attack, stroke, kidney failure (36 diseases covered)',
                  worth: 'YES - 90% recommended',
                  why: 'Critical illness treatment costs ₹10-30L. This covers it without touching family savings.',
                  example: 'Rajesh (38) got cancer. Insurance paid ₹30L immediately (separate from ₹1 Cr death cover). Used for treatment at Tata Memorial.'
                },
                {
                  name: 'Accidental Death Benefit Rider',
                  nameHindi: 'दुर्घटना मृत्यु लाभ',
                  cost: '₹500-1,000/year',
                  cover: 'Additional ₹50L-1 Cr',
                  description: 'Pays DOUBLE the sum assured if death is due to accident',
                  worth: 'MAYBE - 60% recommended',
                  why: 'Very cheap. Pero only useful if you travel a lot (daily commute, frequent flights).',
                  example: 'Sanjay (₹1 Cr term + accident rider) died in bike accident. Family got ₹1 Cr (base) + ₹1 Cr (rider) = ₹2 Cr total.'
                },
                {
                  name: 'Waiver of Premium Rider',
                  nameHindi: 'प्रीमियम छूट राइडर',
                  cost: '₹1,500-3,000/year',
                  cover: 'Future premiums waived',
                  description: 'If you become disabled/critically ill, insurance company pays all future premiums for you',
                  worth: 'YES - 85% recommended',
                  why: `If you can't work (disability), at least your family stays protected even if you can't pay premium.`,
                  example: 'Priya (30) had accident, 80% disabled. Insurance waived her ₹15K/year premium for remaining 25 years = ₹3.75L saved. Cover continued.'
                },
                {
                  name: 'Income Benefit Rider',
                  nameHindi: 'आय लाभ राइडर',
                  cost: '₹3,000-5,000/year',
                  cover: 'Monthly income for 10-20 years',
                  description: 'Instead of lump sum, pays monthly income (₹50K/month for 20 years) to family',
                  worth: 'MAYBE - 40% recommended',
                  why: `Good if your spouse is not financially savvy (can't manage ₹1 Cr lump sum). Bad if they can invest properly.`,
                  example: `Amit's wife doesn't understand investments. Opted for income rider. Gets ₹50K/month for 20 years = ₹1.2 Cr total (vs ₹1 Cr lump sum).`
                },
                {
                  name: 'Return of Premium Rider',
                  nameHindi: 'प्रीमियम वापसी राइडर',
                  cost: '200-300% higher premium!',
                  cover: 'Get all premiums back if you survive',
                  description: 'If you survive policy term, insurance returns all premiums paid (but no interest)',
                  worth: 'NO - Apenas 15% recommended',
                  why: 'Sounds good pero makes premium 3x higher. Better to buy regular term + invest difference in mutual fund.',
                  example: '₹12K regular term vs ₹36K TROP. Invest ₹24K/year in SIP for 30 years @ 12% = ₹70L (vs apenas ₹10.8L premium returned). NO BRAINER!'
                }
              ].map((rider, i) => (
                <div key={i} className={`rounded-xl p-6 border-l-4 ${
                  rider.worth.includes('YES') ? 'bg-green-50 border-green-500' :
                  rider.worth.includes('MAYBE') ? 'bg-yellow-50 border-yellow-500' :
                  'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <strong className="text-lg text-gray-900">{rider.name}</strong>
                      <p className="text-sm text-gray-600">{rider.nameHindi}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-bold text-sm ${
                      rider.worth.includes('YES') ? 'bg-green-600 text-white' :
                      rider.worth.includes('MAYBE') ? 'bg-yellow-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {rider.worth}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600">Extra Cost</div>
                      <div className="font-bold text-gray-900">{rider.cost}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-xs text-gray-600">Coverage</div>
                      <div className="font-bold text-gray-900">{rider.cover}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3"><strong>What it does:</strong> {rider.description}</p>
                  <p className="text-gray-700 mb-3"><strong>Why {rider.worth.split(' - ')[0]}:</strong> {rider.why}</p>
                  <p className="text-sm text-gray-600 bg-white rounded-lg p-3"><strong>Example:</strong> {rider.example}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 rounded-xl p-6 border-2 border-blue-400">
              <strong className="text-blue-900 text-lg block mb-3">🎯 Which Riders Should YOU Take?</strong>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Must Have:</strong> Critical Illness Rider (cancer is common, costs ₹15-30L)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Highly Recommended:</strong> Waiver of Premium (protects if you become disabled)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Optional:</strong> Accidental Death (apenas if daily commute risky, frequent travel)</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Skip:</strong> Return of Premium (makes plan 3x expensive, bad deal mathematically)</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Common Mistakes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ⚠️ 10 Common Term Insurance Mistakes Indians Make
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: `Buying LIC endowment plan thinking it's "better" than term`,
                  reality: 'LIC endowment gives apenas 4-5% returns + expensive cover. Term (₹12K) + SIP (₹1L) gives ₹1 Cr cover + ₹3 Cr wealth. Endowment (₹1.12L) gives apenas ₹50L maturity.',
                  fix: 'Buy pure term insurance. Invest separately in mutual funds. NEVER mix insurance with investment.'
                },
                {
                  mistake: 'Buying insufficient cover (₹10-20L apenas)',
                  reality: `₹20L sounds big pero it's apenas 3-4 years' expenses for family. If spouse is homemaker + 2 kids in school, they need ₹50L-1 Cr minimum.`,
                  fix: 'Use formula: Annual income × 15. If earning ₹6L/year, buy ₹90L-1 Cr cover minimum.'
                },
                {
                  mistake: `Delaying because "I'm young and healthy"`,
                  reality: 'Age 25: ₹1 Cr cover = ₹8K/year. Age 40: Same cover = ₹25K/year. 15 years delay = ₹5.1 lakh extra paid over policy lifetime!',
                  fix: 'Buy before age 30. Even if unmarried. Lock low premium for 30-40 years. Increase cover later when salary increases.'
                },
                {
                  mistake: 'Hiding smoking/drinking habits',
                  reality: 'If claim investigation finds you smoked (pero declared non-smoker), claim can be REJECTED! Family gets nothing.',
                  fix: `Declare honestly. Smoker premium is 40% higher pero at least claim will be paid. Don't risk ₹1 Cr claim for ₹5K saving.`
                },
                {
                  mistake: 'Buying from agent to "help relative/friend"',
                  reality: 'Offline plans are 30-40% costlier. Agent commission comes from YOUR pocket. Over 30 years = ₹1.5-2L extra paid!',
                  fix: `Buy online directly. If agent is close relative, explain politely. Your family's ₹1 Cr protection > agent's ₹15K commission.`
                },
                {
                  mistake: 'Not adding critical illness rider',
                  reality: `1 in 3 Indians get cancer/heart attack before 60. Treatment costs ₹15-30L. If you survive pero exhaust savings, family financially ruined even while you're alive.`,
                  fix: 'Add critical illness rider (₹3-4K/year for ₹30L cover). Cheap insurance for expensive diseases.'
                },
                {
                  mistake: 'Taking return of premium (TROP) option',
                  reality: 'TROP makes premium 3x. ₹12K becomes ₹36K. You pay ₹10.8L over 30 years to get apenas ₹10.8L back (no interest!). FD would give ₹28L instead.',
                  fix: 'Buy regular term (₹12K). Invest ₹24K/year in mutual fund. After 30 years: ₹70L corpus vs apenas ₹10.8L premium refund.'
                },
                {
                  mistake: `Buying when you don't have dependents`,
                  reality: `Single, no parents to support, no spouse/kids? Then you don't need life insurance. Nobody suffers financially if you die.`,
                  fix: 'Invest that ₹12K in equity mutual fund instead. Buy term insurance only when you marry or have dependent parents.'
                },
                {
                  mistake: 'Not reading policy exclusions',
                  reality: 'Suicide in first year = no payout. Death while skydiving/adventure sports = rejected. Pre-existing disease not disclosed = rejected.',
                  fix: `Read policy document pages 8-12 (exclusions section). Understand what's NOT covered. Declare all health issues honestly.`
                },
                {
                  mistake: 'Stopping premium payment midway',
                  reality: 'Miss 2-3 payments = policy lapses. All protection gone. Family gets ZERO if you die after lapse.',
                  fix: `Set auto-debit from bank. Never let it lapse. If struggling financially, reduce cover pero don't stop. Cheaper to continue ₹25L cover than buy new later.`
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-3">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <div>
                      <p className="text-red-900 font-bold mb-2 text-lg">❌ {item.mistake}</p>
                      <p className="text-gray-700 mb-2"><strong>Reality:</strong> {item.reality}</p>
                      <p className="text-green-700"><strong>✅ Fix:</strong> {item.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Expert Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 shadow-lg border-2 border-yellow-400"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              💡 Pro Tips from Insurance Experts
            </h2>

            <div className="space-y-4">
              {[
                'Buy 2 smaller plans instead of 1 big plan: ₹50L from HDFC + ₹50L from Max Life (₹1 Cr total). If one company rejects claim, other pays. Risk diversification.',
                'Buy before age 30. Lock premium for lifetime. Even if unmarried now, premium stays same when you marry/have kids later.',
                `Don't trust agent's "guaranteed returns" claim. Term insurance has NO returns if you survive. That's the point - cheap protection, not investment.`,
                'Declare ALL health issues. Even minor (diabetes, BP). Insurance companies investigate thoroughly during claims. Hiding info = claim rejection risk.',
                'Increase cover when salary increases. Bought ₹50L at age 25? Increase to ₹1 Cr at age 30 when income doubles. Family needs grow, cover should too.',
                'Online is 35% cheaper. ₹12K online vs ₹18K offline for same ₹1 Cr cover. Save ₹1.8L over 30 years. Buy from company website directly.',
                'Take critical illness rider (₹3-4K/year for ₹30L cover). Cancer treatment alone costs ₹15-25L in India. This covers major diseases.',
                'Policy term = Age 60 or 65. Most people retire by 60. After that, kids are settled, loans cleared. No need for huge cover post-retirement.',
                `Don't buy if you're single with no dependents. Insurance protects DEPENDENTS. If parents are financially independent, skip it until you marry.`,
                'Review every 5 years. If you bought ₹50L in 2015, it might be insufficient now. Top up to ₹1-2 Cr as income/responsibilities grow.'
              ].map((tip, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800"><strong>Tip {i + 1}:</strong> {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'I have company life insurance (₹10L). Do I still need term insurance?',
                  a: 'YES! Company insurance stops when you leave job. Also ₹10L is insufficient. Buy personal term plan (₹1 Cr minimum) that stays with you forever, regardless of job changes.'
                },
                {
                  q: 'Should I buy from LIC or private company?',
                  a: 'Private companies (HDFC, Max Life, ICICI) have 99%+ claim settlement ratio and 30-40% cheaper. LIC is trustworthy pero expensive. For term insurance, Max Life/HDFC are better deals.'
                },
                {
                  q: 'Can insurance company reject my claim after taking premiums for 10 years?',
                  a: `Yes, if you provided false information (hid smoking, pre-existing disease). Otherwise no - after 3 years, claim cannot be rejected except for fraud. That's why honesty is critical.`
                },
                {
                  q: `I'm 40, unmarried, no kids. Should I buy term insurance?`,
                  a: 'Apenas if your parents depend on your income. If parents have own pension/savings and you have no spouse/kids, skip term insurance. Buy when you marry or have dependents.'
                },
                {
                  q: 'What happens if I stop paying premium after 5 years?',
                  a: `Policy lapses. All protection gone immediately. Family gets ₹0 if you die after lapse. Term insurance has no surrender value - you paid ₹60K (₹12K × 5), get back ₹0. That's why never lapse.`
                },
                {
                  q: 'Online vs offline - any real difference or just price?',
                  a: 'Apenas price difference (online 35% cheaper). Claims process, customer service, coverage - all exactly same. HDFC Life term bought online or through agent, claim settlement is identical. Save money, buy online.'
                },
                {
                  q: 'Should I take ₹50L at age 25 and increase later, or buy ₹1 Cr now?',
                  a: 'Buy maximum you can afford NOW. ₹1 Cr at age 25 = ₹9K/year. Same ₹1 Cr at age 35 = ₹16K/year. Increasing cover later costs 40-50% more. Start big.'
                },
                {
                  q: 'I have health issues (diabetes, BP). Can I still get term insurance?',
                  a: `Yes pero premium will be 30-50% higher. Declare honestly. Some companies specialize in substandard lives (Bajaj Allianz, PNB MetLife). Don't hide - claim can be rejected later.`
                },
                {
                  q: 'Will insurance company investigate every claim?',
                  a: 'Yes. For death claims, insurance does thorough investigation (medical records, employment verification, death certificate analysis). Takes 15-45 days. If everything is honest, 99% claims get approved.'
                },
                {
                  q: 'After I retire and kids are settled, should I continue paying premium?',
                  a: 'Depends. If spouse will struggle financially without you, continue. If both of you have enough retirement corpus (₹2-3 Cr), you can stop. Most term plans allow surrender after 10-15 years.'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <p className="font-bold text-lg text-gray-900 mb-2">Q{i + 1}: {faq.q}</p>
                  <p className="text-gray-700"><strong>A:</strong> {faq.a}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Step-by-Step Buying Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              📝 How to Buy Term Insurance Online (Step-by-Step)
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</span>
                  <strong className="text-lg text-blue-900">Choose Company & Plan</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  Go to company website directly (HDFC Life, Max Life, ICICI Pru). Don't use aggregators - they charge commission.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Recommendation:</strong> Max Life Smart Secure Plus (99.51% CSR), HDFC Life Click 2 Protect (99.10% CSR), 
                  ICICI Pru iProtect Smart (98.50% CSR)
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</span>
                  <strong className="text-lg text-blue-900">Calculate Cover Amount</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  Use Calculator above or formula: Annual income × 15. Add outstanding loans (home loan ₹30L + car loan ₹5L = add ₹35L extra).
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> Salary ₹8L/year + ₹40L home loan = (₹8L × 15) + ₹40L = ₹1.6 Cr minimum cover needed.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</span>
                  <strong className="text-lg text-blue-900">Fill Basic Details (5 minutes)</strong>
                </div>
                <ul className="text-gray-700 space-y-2">
                  <li>• Name, DOB, gender, mobile, email</li>
                  <li>• Occupation, annual income, PAN card</li>
                  <li>• Nominee details (spouse, parent, child)</li>
                  <li>• Nominee relationship + DOB</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">4</span>
                  <strong className="text-lg text-blue-900">Health Questions (BE HONEST!)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  Questions about: Smoking, alcohol, diabetes, BP, heart issues, cancer, surgeries in last 5 years.
                </p>
                <div className="bg-red-100 rounded-lg p-4 border-2 border-red-400">
                  <strong className="text-red-900">⚠️ CRITICAL: Declare everything honestly!</strong>
                  <p className="text-red-800 text-sm mt-2">
                    Even if premium increases 40%, at least claim will be paid. Hiding info can cause ₹1 Cr claim rejection - 
                    family gets nothing!
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">5</span>
                  <strong className="text-lg text-blue-900">Choose Riders (Optional)</strong>
                </div>
                <p className="text-gray-700 mb-2"><strong>Recommended:</strong></p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>✓ Critical Illness Rider (₹30L cover, ₹3-4K/year) - MUST have</li>
                  <li>✓ Waiver of Premium (₹2-3K/year) - Highly recommended</li>
                  <li>✗ Return of Premium (makes plan 3x expensive) - SKIP</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">6</span>
                    <strong className="text-lg text-blue-900">Medical Tests (If Cover &gt; ₹1 Cr)</strong>
                  </div>
                <p className="text-gray-700 mb-3">
                  For ₹50L-₹1 Cr cover: Usually no medical tests (apenas self-declaration). 
                  For ₹1 Cr+ cover or age 40+: Blood test, urine test, ECG, height/weight measurement.
                </p>
                <p className="text-sm text-gray-600">
                  Insurance company arranges free home sample collection. Report comes in 3-5 days. 
                  If all normal, instant approval.
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">7</span>
                  <strong className="text-lg text-blue-900">Pay Premium & Get Policy</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Payment:</strong> Net banking, credit card, UPI. Premium is annual (pay ₹12K once/year) or monthly (₹1,100/month).
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Policy Document:</strong> Emailed immediately. Also physical copy in 7-10 days.
                </p>
                <p className="text-sm text-green-700 font-semibold">
                  ✅ Total time: 15-30 minutes. Protection starts immediately. Family covered for ₹1 crore!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Action Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your Action Plan (आज ही करें!)
            </h2>

            <div className="space-y-3">
              {[
                'Calculate your cover need: Annual income × 15 + Outstanding loans',
                'Check your age: Buy before 30 to lock cheap premium for lifetime',
                'Compare 3 companies: Max Life, HDFC Life, ICICI Pru (check CSR 99%+)',
                'Buy ONLINE directly from company website (35% cheaper)',
                'Add Critical Illness Rider (₹30L cover for apenas ₹3-4K/year)',
                'Declare ALL health issues honestly (even BP, diabetes)',
                'Set auto-debit: Never miss premium payment (policy will lapse)',
                'Keep policy document safe: Give copy to spouse, update nominee every 5 years'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>⏰ Don't Delay:</strong> Every year you wait, premium increases 8-10%. 
                A 25-year-old pays ₹8K/year. A 35-year-old pays ₹16K/year for same ₹1 Cr cover. 
                <strong> 10 years delay = ₹2.4 lakh extra paid over lifetime!</strong>
              </p>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Health Insurance ₹5 Lakh Cover Guide</h3>
            <p className="mb-6 text-purple-100">
              Learn family floater, room rent limits, copay, portability, cashless vs reimbursement. 
              Get ₹5L cover for ₹15-20K/year!
            </p>
            <Link
              to="/learn/insurance-retirement/health-insurance-india-5-lakh-cover-family-floater-portability"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Health Insurance Complete Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermInsuranceGuide;
