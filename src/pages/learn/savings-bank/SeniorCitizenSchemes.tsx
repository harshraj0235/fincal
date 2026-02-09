import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Users, Shield, TrendingUp, CheckCircle,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Award,
  Clock, BadgeCheck, FileText, Home, Wallet, Star, Zap
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const SeniorCitizenSchemes: React.FC = () => {
  const [investment, setInvestment] = useState(1000000);
  const scssRate = 8.2;
  const pmvvyRate = 7.4;
  const fdRate = 7.5;

  const scssInterest = (investment * scssRate) / 100;
  const pmvvyInterest = (investment * pmvvyRate) / 100;
  const fdInterest = (investment * fdRate) / 100;

  const faqData = [
    {
      question: "I am 58 years old. Can I invest in SCSS?",
      answer: "No, SCSS is only for 60+ years. If you're a retired defense/civil servant, eligible at 55+ (with retirement benefits). Otherwise, wait till 60."
    },
    {
      question: "Can I invest more than ₹30 lakh in SCSS?",
      answer: "No, maximum ₹30 lakh total (₹15L per account). If you have ₹50L, invest ₹30L in SCSS and remaining ₹20L in PMVVY (₹15L) + Senior Citizen FD (₹5L)."
    },
    {
      question: "SCSS vs PMVVY - which is better for monthly income?",
      answer: "PMVVY gives monthly payout option (₹9,250/month on ₹15L). SCSS pays quarterly (₹20,500/quarter on ₹10L). For monthly income needs, choose PMVVY."
    },
    {
      question: "Is TDS deducted on SCSS interest?",
      answer: "Yes, if total interest from all banks exceeds ₹50,000/year. But you can submit Form 15H to avoid TDS if total income below taxable limit."
    },
    {
      question: "Can I close SCSS before 5 years?",
      answer: "Yes, but penalty: (1) Before 1 year: No interest paid, (2) 1-2 years: 1.5% penalty on deposit, (3) 2-5 years: 1% penalty. Better to wait if possible."
    },
    {
      question: "Is PMVVY still open for investment in 2025?",
      answer: "PMVVY was closed on March 31, 2023. Check RBI/LIC website if reopened. Alternative: SCSS (8.2%) or Post Office Monthly Income Scheme (7.4%)."
    },
    {
      question: "Can husband and wife both invest ₹15L each in SCSS?",
      answer: "Yes! Each senior citizen can invest ₹15L individually (total ₹30L per family). You can also open joint account (₹15L) + individual accounts."
    },
    {
      question: "What is the lock-in period for SCSS?",
      answer: "5 years mandatory. After 5 years, can extend for 3 more years (total 8 years maximum). Interest rate continues at prevailing rate during extension."
    },
    {
      question: "Can NRI senior citizens invest in SCSS?",
      answer: "No, SCSS is only for Indian residents. NRIs can invest in senior citizen FDs in NRE/NRO accounts (but lower interest, 2-3% only)."
    },
    {
      question: "Is SCSS better than FD for senior citizens?",
      answer: "Yes! SCSS gives 8.2% vs FD 7.5% + Section 80C tax benefit (₹1.5L deduction). But FD offers more flexibility. Do both: ₹1.5L in SCSS (80C benefit) + rest in FDs."
    },
    {
      question: "What documents needed to open SCSS account?",
      answer: "Age proof (Aadhaar, PAN, passport), address proof, passport-size photos, initial deposit (cash/cheque/DD). Visit post office or designated bank branch."
    },
    {
      question: "Can I take loan against SCSS?",
      answer: "Yes, can pledge SCSS account and get loan (up to 75% of balance) from the same bank. Interest on loan: 1-2% above SCSS rate. Useful for emergencies."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Senior Citizen Savings Schemes 2025: SCSS 8.2% vs PMVVY 7.4% Complete Guide | MoneyCal"
        description="Complete guide to senior citizen schemes in India. SCSS (8.2% interest, ₹30L max, Section 80C benefits), PMVVY (7.4% guaranteed, ₹15L max), Post Office MIS. Eligibility, tax benefits, application process, monthly income options. Best retirement planning for 60+ Indians."
        keywords="SCSS senior citizen savings scheme, PMVVY pradhan mantri vaya vandana yojana, senior citizen FD rates, Post Office MIS, retirement schemes India, 80C tax benefit, monthly income pension, वरिष्ठ नागरिक बचत योजना"
        url="/learn/savings-bank-products/senior-citizen-savings-schemes-scss-pmvvy-india-benefits"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Savings & Bank Products</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 5 of 9</span>
                <Link 
                  to="/learn/savings-bank-products/sweep-in-accounts-auto-sweep-facility-banks-india"
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                  Lesson 5 • 45 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Senior Citizen Savings Schemes
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  SCSS 8.2% vs PMVVY 7.4% - वरिष्ठ नागरिक बचत योजनाएं (60+ के लिए)
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-orange-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>SCSS: 8.2% interest, ₹30L max investment, Section 80C tax benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>PMVVY: 7.4% guaranteed for 10 years, monthly income option</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Post Office schemes comparison & complete application process</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Best retirement income planning strategies for 60+ Indians</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* SCSS Detailed Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-orange-600" />
                🏆 SCSS - Senior Citizen Savings Scheme (Best Returns!)
              </h2>
              
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">8.2%</div>
                  <div className="text-xl">Per Annum Interest (Guaranteed by Government)</div>
                  <div className="text-sm mt-2 opacity-90">Highest safe returns for senior citizens!</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">📋 Key Features:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Interest:</strong> 8.2% per annum (revised quarterly)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Max Investment:</strong> ₹30 lakh total (₹15L per account)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Min Investment:</strong> ₹1,000 (multiples of ₹1,000)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Tenure:</strong> 5 years (extendable by 3 years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Interest Payout:</strong> Quarterly (April, July, Oct, Jan)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Tax Benefit:</strong> Section 80C deduction (up to ₹1.5L)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">👥 Eligibility:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Age: 60 years or above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Retired civilians: 55-60 years (within 3 months of retirement)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Retired defense: 50 years+ (within 1 month)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Can be opened: Single or joint (with spouse)</span>
                    </li>
                  </ul>

                  <div className="bg-orange-50 p-4 rounded-lg mt-4">
                    <p className="text-sm text-orange-900">
                      <strong>Example:</strong> Mr. Sharma (62 years) invests ₹10 lakh. Earns ₹82,000/year (₹20,500 quarterly) guaranteed!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h4 className="font-bold text-green-900 mb-3">✅ Why SCSS is Best for Senior Citizens:</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Star className="w-6 h-6 text-green-600 mb-2" />
                    <strong className="text-gray-900">Highest Safe Returns</strong>
                    <p className="text-sm text-gray-700 mt-1">8.2% government-backed (vs 7.5% FD)</p>
                  </div>
                  <div>
                    <Shield className="w-6 h-6 text-green-600 mb-2" />
                    <strong className="text-gray-900">100% Safe</strong>
                    <p className="text-sm text-gray-700 mt-1">Government of India guarantee</p>
                  </div>
                  <div>
                    <DollarSign className="w-6 h-6 text-green-600 mb-2" />
                    <strong className="text-gray-900">Tax Benefits</strong>
                    <p className="text-sm text-gray-700 mt-1">80C deduction up to ₹1.5L</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* PMVVY Guide */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Wallet className="w-8 h-8 text-blue-600" />
                💼 PMVVY - Pradhan Mantri Vaya Vandana Yojana
              </h2>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
                <p className="text-yellow-900 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span><strong>Update:</strong> PMVVY was closed on March 31, 2023. Government may reopen in future budgets. This guide is for reference if/when reopened. Current alternative: SCSS or Post Office MIS.</span>
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">7.4%</div>
                  <div className="text-xl">Guaranteed Returns for 10 Years</div>
                  <div className="text-sm mt-2 opacity-90">LIC-managed, 100% government guarantee</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">📋 Key Features (When Active):</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Max Investment: ₹15 lakh per senior citizen</li>
                    <li>• Tenure: 10 years (non-extendable)</li>
                    <li>• Interest: 7.4% per annum (guaranteed)</li>
                    <li>• Payout: Monthly/Quarterly/Yearly/Annual options</li>
                    <li>• Eligibility: 60 years or above</li>
                    <li>• No TDS deduction</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">💰 Monthly Income Examples:</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <strong className="text-gray-900">₹5,00,000 investment:</strong>
                      <p className="text-blue-600 font-bold text-xl">₹3,083/month</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <strong className="text-gray-900">₹10,00,000 investment:</strong>
                      <p className="text-blue-600 font-bold text-xl">₹6,167/month</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <strong className="text-gray-900">₹15,00,000 investment:</strong>
                      <p className="text-blue-600 font-bold text-xl">₹9,250/month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Interactive Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                🧮 Senior Citizen Schemes Comparison Calculator
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Investment Amount (₹)</label>
                <input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-2xl"
                />
                <p className="text-sm mt-2 opacity-80">Max: ₹30L for SCSS, ₹15L for PMVVY</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* SCSS */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">SCSS (8.2%)</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm opacity-90">Annual Interest</div>
                      <div className="text-3xl font-bold text-orange-300">₹{scssInterest.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Quarterly Payout</div>
                      <div className="text-xl font-bold">₹{(scssInterest / 4).toLocaleString('en-IN')}</div>
                    </div>
                    <div className="text-sm mt-2">
                      ✅ Section 80C benefit<br/>
                      ✅ Govt guaranteed
                    </div>
                  </div>
                </div>

                {/* PMVVY */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">PMVVY (7.4%)</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm opacity-90">Annual Interest</div>
                      <div className="text-3xl font-bold text-blue-300">₹{pmvvyInterest.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Monthly Payout</div>
                      <div className="text-xl font-bold">₹{(pmvvyInterest / 12).toLocaleString('en-IN')}</div>
                    </div>
                    <div className="text-sm mt-2">
                      ✅ 10-year guarantee<br/>
                      ✅ No TDS
                    </div>
                  </div>
                </div>

                {/* Senior Citizen FD */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Sr Citizen FD (7.5%)</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm opacity-90">Annual Interest</div>
                      <div className="text-3xl font-bold text-cyan-300">₹{fdInterest.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Quarterly Payout</div>
                      <div className="text-xl font-bold">₹{(fdInterest / 4).toLocaleString('en-IN')}</div>
                    </div>
                    <div className="text-sm mt-2">
                      ✅ Flexible tenure<br/>
                      ⚠️ No 80C benefit
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center">
                🏆 SCSS gives ₹{(scssInterest - fdInterest).toLocaleString('en-IN')} more than regular FD annually!
              </div>
            </div>
          </motion.section>

          {/* Comparison Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Complete Comparison: SCSS vs PMVVY vs FD vs POMIS</h2>
              
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="p-4 font-bold text-gray-900">Parameter</th>
                    <th className="p-4 font-bold text-orange-900">SCSS</th>
                    <th className="p-4 font-bold text-blue-900">PMVVY</th>
                    <th className="p-4 font-bold text-green-900">Sr Citizen FD</th>
                    <th className="p-4 font-bold text-purple-900">PO MIS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Interest Rate</td>
                    <td className="p-4 text-orange-600 font-bold text-xl">8.2%</td>
                    <td className="p-4 text-blue-600 font-bold text-xl">7.4%</td>
                    <td className="p-4 font-bold">7.5%</td>
                    <td className="p-4 font-bold">7.4%</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Max Investment</td>
                    <td className="p-4">₹30 lakh</td>
                    <td className="p-4">₹15 lakh</td>
                    <td className="p-4">No limit</td>
                    <td className="p-4">₹9 lakh</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Tenure</td>
                    <td className="p-4">5 years (extend 3)</td>
                    <td className="p-4">10 years</td>
                    <td className="p-4">1-10 years</td>
                    <td className="p-4">5 years</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Interest Payout</td>
                    <td className="p-4">Quarterly</td>
                    <td className="p-4">Monthly/Quarterly/Yearly</td>
                    <td className="p-4">Monthly/Quarterly</td>
                    <td className="p-4">Monthly</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Tax Benefit (80C)</td>
                    <td className="p-4 text-green-600 font-bold">✅ Yes (₹1.5L)</td>
                    <td className="p-4">❌ No</td>
                    <td className="p-4 text-green-600">✅ 5-year tax-saver FD</td>
                    <td className="p-4">❌ No</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Premature Closure</td>
                    <td className="p-4">After 1 year (1-1.5% penalty)</td>
                    <td className="p-4">After 3 years (penalty)</td>
                    <td className="p-4">Anytime (penalty)</td>
                    <td className="p-4">After 1 year (penalty)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Where to Open</td>
                    <td className="p-4">Post Office or designated banks</td>
                    <td className="p-4">LIC offices</td>
                    <td className="p-4">Any bank</td>
                    <td className="p-4">Post Office</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 font-semibold">Best For</td>
                    <td className="p-4">Highest returns + 80C</td>
                    <td className="p-4">Monthly income needs</td>
                    <td className="p-4">Flexibility</td>
                    <td className="p-4">Regular monthly income</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-6 bg-orange-50 p-4 rounded-lg">
                <p className="font-bold text-orange-900">🎯 Recommendation: Invest ₹15L in SCSS first (highest rate + 80C), then remaining in POMIS/FD</p>
              </div>
            </div>
          </motion.section>

          {/* Post Office Monthly Income Scheme */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📮 Post Office Monthly Income Scheme (POMIS)</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-purple-900 mb-3">Key Features:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Interest: 7.4% per annum</li>
                    <li>• Max: ₹9 lakh (₹4.5L single, ₹9L joint)</li>
                    <li>• Tenure: 5 years</li>
                    <li>• Payout: Monthly (every month on 1st)</li>
                    <li>• Eligibility: Any age (not just seniors)</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-green-900 mb-3">Monthly Income on ₹9L:</h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">₹5,550</div>
                  <p className="text-sm text-gray-700">Every month guaranteed for 5 years!</p>
                  <div className="mt-4 p-3 bg-white rounded">
                    <p className="text-sm"><strong>Total in 5 years:</strong></p>
                    <p className="text-lg font-bold text-green-600">₹3,33,000 interest</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-900 mb-3">✅ Best Use Case:</h4>
                <p className="text-gray-700 mb-3">
                  Perfect for senior citizens who need <strong>regular monthly income</strong> for daily expenses. Example:
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-800">
                    <strong>Mrs. Gupta (65 years):</strong> Invests ₹9L in POMIS → Gets ₹5,550/month pension.
                    Uses for groceries, medicine, household expenses. Principal ₹9L returned after 5 years!
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Tax Implications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">💼 Tax Implications for Senior Citizens</h2>

              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-yellow-900 mb-3">🎁 Special Tax Benefits for Seniors (60+):</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Basic Exemption:</strong> ₹3,00,000 (vs ₹2.5L for others)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Super Seniors (80+):</strong> ₹5,00,000 exemption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Section 80TTB:</strong> ₹50,000 deduction on interest income (vs ₹10K for others)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Section 80C:</strong> SCSS investment deduction up to ₹1.5L</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-blue-900 mb-3">📊 Tax Calculation Example:</h3>
                  <p className="text-gray-700 mb-3"><strong>Mr. Verma (65 years):</strong></p>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Pension income:</span>
                      <span className="font-semibold">₹2,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SCSS interest (₹15L @ 8.2%):</span>
                      <span className="font-semibold">₹1,23,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>FD interest:</span>
                      <span className="font-semibold">₹60,000</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total Income:</span>
                      <span>₹3,83,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Less: Basic exemption</span>
                      <span>-₹3,00,000</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Less: 80TTB (interest exemption)</span>
                      <span>-₹50,000</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg bg-white p-2 rounded mt-2">
                      <span>Taxable Income:</span>
                      <span className="text-green-600">₹33,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax @ 5% slab:</span>
                      <span className="font-bold text-red-600">₹1,650 only!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Application Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📝 How to Open SCSS Account</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Visit Post Office or Bank</h3>
                    <p className="text-gray-700">SCSS available at: All post offices, SBI, ICICI, HDFC, Axis, PNB, other designated banks</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Fill SCSS Application Form</h3>
                    <p className="text-gray-700">Available at counter or download from post office website</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Submit Documents</h3>
                    <div className="bg-gray-50 p-4 rounded-lg mt-2">
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✅ Age proof: Aadhaar, PAN, Passport, Voter ID</li>
                        <li>✅ Address proof: Aadhaar, Utility bill</li>
                        <li>✅ PAN card (mandatory for deposits above ₹50,000)</li>
                        <li>✅ Passport-size photos (2)</li>
                        <li>✅ Retirement documents (if 55-60 years old)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Make Initial Deposit</h3>
                    <p className="text-gray-700">Via cash (up to ₹2L), cheque, or demand draft. Get passbook immediately.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Receive Quarterly Interest</h3>
                    <p className="text-gray-700">Interest credited to your savings account every quarter (April, July, October, January)</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-green-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-green-900 mb-2">⏱️ Processing Time:</h4>
                <p className="text-gray-700">Account opens same day! Interest starts from deposit date.</p>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-blue-600" />
                ❓ Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Q{index + 1}: {faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Key Takeaways */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>SCSS: Best choice!</strong> 8.2% interest + 80C benefit + govt guarantee. Max ₹30L investment.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>PMVVY closed</strong> (March 2023). Alternative: Post Office MIS 7.4% for monthly income.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Tax planning:</strong> ₹50,000 interest exempt under 80TTB + ₹3L basic exemption for 60+.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Strategy:</strong> ₹15L SCSS + ₹9L POMIS + Rest in Sr Citizen FD = Balanced portfolio!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Optimal Portfolio Strategy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">💼 Optimal Portfolio Strategy for Retirees</h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4">For ₹30 Lakh Retirement Corpus:</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm p-3 rounded">
                      <span>SCSS (Maximum):</span>
                      <span className="font-bold">₹15,00,000 @ 8.2%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm p-3 rounded">
                      <span>Post Office MIS:</span>
                      <span className="font-bold">₹9,00,000 @ 7.4%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm p-3 rounded">
                      <span>Senior Citizen FD:</span>
                      <span className="font-bold">₹5,00,000 @ 7.5%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm p-3 rounded">
                      <span>Liquid Savings:</span>
                      <span className="font-bold">₹1,00,000 @ 3%</span>
                    </div>
                  </div>
                  <div className="mt-6 bg-yellow-400 text-yellow-900 p-4 rounded-lg font-bold text-center">
                    Annual Income: ₹2,26,100 (₹18,841/month passive income!)
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">✅ Why This Strategy Works:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Maximum safety:</strong> All government-backed schemes (zero risk)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Regular income:</strong> POMIS gives monthly ₹5,550, SCSS quarterly ₹30,750</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Tax efficient:</strong> 80C benefit on SCSS + 80TTB exemption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Liquidity:</strong> ₹1L liquid for emergencies, rest can be broken if needed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Calculators */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Calculators</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/calculators/retirement-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Calculator className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Retirement Calculator</h3>
                  <p className="text-sm text-gray-600">Plan your retirement corpus</p>
                </Link>
                <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <DollarSign className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate tax on interest</p>
                </Link>
                <Link to="/calculators/fd-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">FD Calculator</h3>
                  <p className="text-sm text-gray-600">Compare FD vs SCSS</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Sweep-In Accounts (Get FD Returns on Savings!)</h3>
            <p className="mb-6 text-teal-100">Learn how auto-sweep gives you 6-7% on idle savings automatically. Best banks offering this facility!</p>
            <Link
              to="/learn/savings-bank-products/sweep-in-accounts-auto-sweep-facility-banks-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Sweep-In Accounts Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeniorCitizenSchemes;
