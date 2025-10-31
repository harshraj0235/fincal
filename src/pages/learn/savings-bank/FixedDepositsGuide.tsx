import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, PiggyBank, TrendingUp, Calculator, CheckCircle, 
  Target, DollarSign, Clock, Award, AlertTriangle, Lightbulb, Zap,
  XCircle, TrendingDown, Shield, FileText
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const FixedDepositsGuide: React.FC = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(3);
  
  const maturityAmount = principal * Math.pow(1 + rate / 400, 4 * years);
  const interest = maturityAmount - principal;
  const taxOnInterest = interest * 0.30; // Assuming 30% tax bracket
  const postTaxReturns = interest - taxOnInterest;

  return (
    <>
      <SEOHelmet
        title="Fixed Deposit Guide: Interest Rates 8%, Tax, FD Laddering Strategy India 2025 | MoneyCal"
        description="Complete FD guide in Hindi & English. Current interest rates 7-8%, tax implications, FD laddering strategy, senior citizen rates, premature withdrawal. Maximize returns safely."
        keywords="fixed deposit India, FD interest rates 2025, FD laddering, FD tax, best FD rates, senior citizen FD, फिक्स्ड डिपॉजिट गाइड, एफडी ब्याज दरें"
        url="/learn/savings-bank-products/fixed-deposits-fd-interest-rates-tax-ladder-strategy-india"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Savings & Bank Products</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 2 of 8</span>
                <Link 
                  to="/learn/savings-bank-products/recurring-deposits-rd-vs-sip-monthly-savings-india"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <PiggyBank className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                  Lesson 2 • 55 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Fixed Deposits (FD) Complete Guide
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  फिक्स्ड डिपॉजिट: 7-8% गारंटीड रिटर्न्स
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6">
              <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Learning Objectives (सीखने के उद्देश्य)
              </h3>
              <ul className="space-y-2">
                {[
                  'Understand what Fixed Deposits are and how they work (guaranteed returns)',
                  'Compare FD interest rates across banks (7-8% for regular, 8-8.5% for seniors)',
                  'Learn FD Laddering strategy to beat liquidity problem',
                  'Calculate tax on FD interest (TDS rules, Form 15G/15H)',
                  'Know when to break FD vs when to continue (premature withdrawal penalty)',
                  'Choose between cumulative vs non-cumulative FD payout options'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* What is FD */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💡 What is Fixed Deposit? (फिक्स्ड डिपॉजिट क्या है?)
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Fixed Deposit (FD)</strong> is a safe investment where you deposit money in a bank for a fixed period 
                (7 days to 10 years) at a <strong>guaranteed interest rate</strong> (6.5-8%). 
                You get your money back with interest on maturity. <strong>Zero risk</strong> - government insures up to ₹5 lakh per bank.
              </p>

              <p className="text-lg text-gray-700 mb-4">
                <strong>Hindi में समझें:</strong> फिक्स्ड डिपॉजिट (एफडी) एक सुरक्षित निवेश है जहां आप बैंक में पैसा जमा करते हैं 
                और तय ब्याज दर (7-8%) पर गारंटीड रिटर्न पाते हैं। कोई जोखिम नहीं - सरकार ₹5 लाख तक की गारंटी देती है।
              </p>

              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500 my-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">Real Example: ₹1 Lakh FD for 3 Years</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Amount Invested:</strong> ₹1,00,000</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Interest Rate:</strong> 7.1% per annum (compounded quarterly)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Tenure:</strong> 3 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Maturity Amount:</strong> ₹1,23,348</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Interest Earned:</strong> ₹23,348</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">→</span>
                    <span><strong>Tax on Interest:</strong> ₹7,004 (if 30% bracket)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">→</span>
                    <span><strong>Post-Tax Returns:</strong> ₹16,344 (5% effective return)</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Interactive FD Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-green-600" />
              🧮 FD Maturity Calculator
            </h2>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Principal Amount (₹):</label>
                  <input 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                    min="1000"
                    step="10000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Interest Rate (%):</label>
                  <input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                    min="3"
                    max="10"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Tenure (Years):</label>
                  <input 
                    type="number" 
                    value={years} 
                    onChange={(e) => setYears(Number(e.target.value))} 
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-green-500">
                  <div className="text-sm text-gray-600 mb-1">Maturity Amount</div>
                  <div className="text-3xl font-bold text-green-700">
                    ₹{maturityAmount.toFixed(0).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Total amount you receive</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-blue-500">
                  <div className="text-sm text-gray-600 mb-1">Interest Earned (Pre-Tax)</div>
                  <div className="text-3xl font-bold text-blue-700">
                    ₹{interest.toFixed(0).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Gross interest before tax</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-orange-500">
                  <div className="text-sm text-gray-600 mb-1">Tax (30% bracket)</div>
                  <div className="text-3xl font-bold text-orange-700">
                    -₹{taxOnInterest.toFixed(0).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Tax deducted on interest</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-teal-500">
                  <div className="text-sm text-gray-600 mb-1">Post-Tax Returns</div>
                  <div className="text-3xl font-bold text-teal-700">
                    ₹{postTaxReturns.toFixed(0).toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Actual profit after tax</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
              <strong className="text-yellow-900 text-lg block mb-3">📐 FD Formula (Quarterly Compounding):</strong>
              <p className="text-gray-700 font-mono bg-white rounded-lg p-3 mb-3">
                A = P × (1 + r/4)^(4×t)
              </p>
              <p className="text-sm text-gray-600">
                <strong>Where:</strong> A = Maturity Amount, P = Principal (₹1L), r = Rate (7.1% = 0.071), t = Time (3 years)<br/>
                <strong>Calculation:</strong> ₹1,00,000 × (1 + 0.071/4)^(4×3) = ₹1,00,000 × (1.01775)^12 = ₹1,23,348
              </p>
            </div>
          </motion.section>

          {/* Best FD Rates Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg overflow-x-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🏆 Best FD Interest Rates (2025) - Bank Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="p-3 text-left">Bank</th>
                    <th className="p-3">Regular (% p.a.)</th>
                    <th className="p-3">Senior Citizen</th>
                    <th className="p-3">₹1L - 3Y Returns</th>
                    <th className="p-3">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-green-50">
                    <td className="p-3 font-semibold">SBI (State Bank of India)</td>
                    <td className="p-3 text-center">7.00%</td>
                    <td className="p-3 text-center">7.50%</td>
                    <td className="p-3 text-center">₹1.2 3K</td>
                    <td className="p-3 text-center">Most trusted, government</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">HDFC Bank</td>
                    <td className="p-3 text-center">7.00%</td>
                    <td className="p-3 text-center">7.50%</td>
                    <td className="p-3 text-center">₹1.23K</td>
                    <td className="p-3 text-center">Best digital banking</td>
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="p-3 font-semibold">ICICI Bank</td>
                    <td className="p-3 text-center">7.00%</td>
                    <td className="p-3 text-center">7.50%</td>
                    <td className="p-3 text-center">₹1.23K</td>
                    <td className="p-3 text-center">Fast processing</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Axis Bank</td>
                    <td className="p-3 text-center">7.10%</td>
                    <td className="p-3 text-center">7.60%</td>
                    <td className="p-3 text-center">₹1.23K</td>
                    <td className="p-3 text-center">Slightly higher rates</td>
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="p-3 font-semibold">Kotak Mahindra Bank</td>
                    <td className="p-3 text-center">7.20%</td>
                    <td className="p-3 text-center">7.70%</td>
                    <td className="p-3 text-center">₹1.24K</td>
                    <td className="p-3 text-center">Good for online FD</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">IDFC FIRST Bank</td>
                    <td className="p-3 text-center">7.50%</td>
                    <td className="p-3 text-center">8.00%</td>
                    <td className="p-3 text-center">₹1.25K</td>
                    <td className="p-3 text-center">High rates, safe</td>
                  </tr>
                  <tr className="border-b bg-green-50">
                    <td className="p-3 font-semibold">IndusInd Bank</td>
                    <td className="p-3 text-center">7.75%</td>
                    <td className="p-3 text-center">8.25%</td>
                    <td className="p-3 text-center">₹1.26K</td>
                    <td className="p-3 text-center">Highest among safe banks</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Small Finance Banks (Ujjivan, Equitas)</td>
                    <td className="p-3 text-center">8.00-8.50%</td>
                    <td className="p-3 text-center">8.50-9.00%</td>
                    <td className="p-3 text-center">₹1.27-1.29K</td>
                    <td className="p-3 text-center">Highest rates, DICGC insured</td>
                  </tr>
                  <tr className="border-b bg-yellow-50">
                    <td className="p-3 font-semibold">Post Office FD (5Y)</td>
                    <td className="p-3 text-center">7.50%</td>
                    <td className="p-3 text-center">7.50%</td>
                    <td className="p-3 text-center">₹1.25K</td>
                    <td className="p-3 text-center">Government scheme, tax-saving option</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 rounded-xl p-6">
              <strong className="text-blue-900 text-lg block mb-3">🎯 Which Bank to Choose?</strong>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span><strong>For Safety:</strong> SBI, HDFC, ICICI (lowest risk, pero slightly lower rates 7%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span><strong>For Higher Returns:</strong> IndusInd (7.75%), IDFC FIRST (7.50%) - still very safe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span><strong>For Highest Rates:</strong> Small Finance Banks (8-8.5%) - DICGC insured up to ₹5L</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span><strong>Avoid:</strong> Cooperative banks, chit funds offering 10-12% (high risk of default)</span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* FD Laddering Strategy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🪜 FD Laddering Strategy (Advanced!)
            </h2>

            <p className="text-gray-700 mb-6">
              <strong>Problem with single FD:</strong> If you put ₹5L in 5-year FD and need money in year 2, 
              you must break FD (1% penalty + lose interest). <strong>Solution: FD Laddering!</strong>
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-400 mb-6">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Example: ₹5 Lakh FD Laddering</h3>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-purple-900">FD #1: ₹1 Lakh for 1 Year</strong>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">7.0%</span>
                  </div>
                  <p className="text-sm text-gray-600">Matures in: Jan 2026 | Amount: ₹1.07L | Use: Emergency access in 1 year</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-purple-900">FD #2: ₹1 Lakh for 2 Years</strong>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">7.1%</span>
                  </div>
                  <p className="text-sm text-gray-600">Matures in: Jan 2027 | Amount: ₹1.15L | Use: Access in 2 years if needed</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-purple-900">FD #3: ₹1 Lakh for 3 Years</strong>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">7.25%</span>
                  </div>
                  <p className="text-sm text-gray-600">Matures in: Jan 2028 | Amount: ₹1.24L</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-purple-900">FD #4: ₹1 Lakh for 5 Years</strong>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">7.50%</span>
                  </div>
                  <p className="text-sm text-gray-600">Matures in: Jan 2030 | Amount: ₹1.44L | Tax-saving option available</p>
                </div>

                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-purple-900">FD #5: ₹1 Lakh for 10 Years</strong>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">7.75%</span>
                  </div>
                  <p className="text-sm text-gray-600">Matures in: Jan 2035 | Amount: ₹2.11L | Long-term wealth</p>
                </div>
              </div>

              <div className="mt-6 bg-green-100 rounded-lg p-5">
                <strong className="text-green-900 text-lg block mb-3">✅ Benefits of Laddering:</strong>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span><strong>Liquidity Every Year:</strong> One FD matures annually, access to ₹1L+ without penalty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span><strong>Higher Average Returns:</strong> Mix of short + long tenure = better rates than all short-term</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span><strong>Reinvestment Option:</strong> When FD #1 matures, reinvest for 5Y at higher rate. Continuous cycle.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span><strong>Rate Hedging:</strong> If rates fall, you have long-term FDs locked at old rates. If rates rise, short-term FDs can be reinvested at new rates.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Tax Implications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💰 FD Tax Rules (Must Know!)
            </h2>

            <div className="space-y-6">
              <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                <h3 className="text-xl font-bold text-orange-900 mb-3">TDS (Tax Deducted at Source)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>Rule:</strong> If your FD interest in a financial year exceeds <strong>₹40,000</strong> 
                  (₹50,000 for senior citizens), bank deducts <strong>10% TDS</strong> automatically.
                </p>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <p className="text-gray-700"><strong>Example:</strong></p>
                  <p className="text-sm text-gray-600">
                    Rajesh has ₹8L FD @ 7% = ₹56,000 interest/year. Since > ₹40K, bank deducts 10% TDS = ₹5,600. 
                    He receives ₹50,400. At ITR filing, if his actual tax slab is 30%, he must pay remaining ₹11,200.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-900 mb-3">Form 15G/15H (Avoid TDS!)</h3>
                <p className="text-gray-700 mb-3">
                  <strong>If your total income is below ₹2.5L/year</strong>, you can submit Form 15G (below 60) or 15H (above 60) 
                  to bank. Bank will NOT deduct TDS.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-700 mb-2"><strong>Example:</strong></p>
                  <p className="text-sm text-gray-600 mb-3">
                    Retiree Mrs. Sharma (65) has apenas ₹8L FD. Interest ₹56K/year. Total income apenas ₹56K (below ₹3L senior citizen limit). 
                    She submits Form 15H. Bank doesn't deduct TDS. She gets full ₹56,000.
                  </p>
                  <p className="text-sm text-green-700 font-semibold">
                    ✅ Saved ₹5,600 TDS deduction! No need to file ITR to claim refund.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Taxation in Your Tax Slab</h3>
                <p className="text-gray-700 mb-3">
                  FD interest is added to your income and taxed at YOUR income tax slab rate (not a separate tax).
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">If You're in 5% Slab</div>
                    <div className="font-bold text-gray-900">₹1L FD → ₹7.1K interest</div>
                    <div className="text-sm text-gray-600">Tax: apenas ₹355 (5%)</div>
                    <div className="text-green-700 font-bold">Post-tax: ₹6,745 (6.7% returns)</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">If You're in 20% Slab</div>
                    <div className="font-bold text-gray-900">₹1L FD → ₹7.1K interest</div>
                    <div className="text-sm text-gray-600">Tax: ₹1,420 (20%)</div>
                    <div className="text-orange-700 font-bold">Post-tax: ₹5,680 (5.7% returns)</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">If You're in 30% Slab</div>
                    <div className="font-bold text-gray-900">₹1L FD → ₹7.1K interest</div>
                    <div className="text-sm text-gray-600">Tax: ₹2,130 (30%)</div>
                    <div className="text-red-700 font-bold">Post-tax: ₹4,970 (5% returns)</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Key Insight:</strong> Higher your tax slab, lower your FD returns. For 30% bracket earners, 
                  FD gives apenas 5% post-tax (below inflation 6%). Better to invest in equity mutual funds (tax-efficient).
                </p>
              </div>
            </div>
          </motion.section>

          {/* Cumulative vs Non-Cumulative */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🔄 Cumulative vs Non-Cumulative FD
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Cumulative FD</h3>
                <p className="text-gray-700 mb-4">
                  Interest is <strong>reinvested</strong> (compounded). You get principal + all interest at maturity (lump sum).
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Example: ₹1L @ 7% for 5 years</p>
                  <p className="text-gray-700">Year 1: ₹1.07L → Year 2: ₹1.14L → ... → Year 5: <strong>₹1.40L</strong></p>
                  <p className="text-sm text-gray-600 mt-2">Interest earned: ₹40,250 (compounded)</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-green-700">✅ Best For:</strong> Wealth building, long-term goals (retirement, child education)</p>
                  <p><strong className="text-green-700">✅ Pros:</strong> Higher returns (compounding), lump sum at end</p>
                  <p><strong className="text-red-700">❌ Cons:</strong> No regular income, all interest taxable in maturity year</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-400">
                <h3 className="text-2xl font-bold text-green-900 mb-4">Non-Cumulative FD</h3>
                <p className="text-gray-700 mb-4">
                  Interest is <strong>paid out</strong> monthly/quarterly/yearly. You get regular income. Principal returned at maturity.
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold mb-2">Example: ₹1L @ 7% for 5 years (monthly payout)</p>
                  <p className="text-gray-700">
                    Every month: ₹583 credited to account. After 5 years: Principal ₹1L returned + Total interest ₹35,000 (simple interest)
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-green-700">✅ Best For:</strong> Retirees, monthly income seekers</p>
                  <p><strong className="text-green-700">✅ Pros:</strong> Regular cash flow, tax spread over years</p>
                  <p><strong className="text-red-700">❌ Cons:</strong> Lower returns (no compounding), ₹5K less interest vs cumulative</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-purple-100 rounded-xl p-6">
              <strong className="text-purple-900 text-lg block mb-3">🎯 Which to Choose?</strong>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Age 25-50:</strong> Cumulative FD (higher returns, don't need monthly income)</li>
                <li><strong>Age 60+ (Retired):</strong> Non-Cumulative monthly payout (use interest for expenses, preserve principal)</li>
                <li><strong>Pro Tip:</strong> Cumulative gives ₹5-10K more on ₹1L FD over 5 years. Choose cumulative unless you specifically need monthly income.</li>
              </ul>
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
              📖 Real Indian Examples (Success & Mistakes)
            </h2>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <strong className="text-lg text-green-900">Smart Strategy: Mr. Iyer (Retired, 67, Chennai)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> Retirement corpus ₹50 lakh. Needs ₹40K/month for expenses. 
                  No pension, apenas this money for rest of life.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>FD Strategy (Laddered):</strong><br/>
                  • ₹10L in Post Office MIS (monthly payout 7.4% = ₹7,400/month)<br/>
                  • ₹15L in senior citizen FD (8.5% annual payout = ₹1.27L/year = ₹10,583/month)<br/>
                  • ₹10L in 3-year FD ladder (7.5% cumulative for emergencies)<br/>
                  • ₹15L in debt mutual funds (8% for growth)
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Monthly Income:</strong> ₹7,400 + ₹10,583 = ₹17,983/month guaranteed + debt fund growth
                </p>
                <p className="text-green-700 font-bold">
                  ✅ Result: Stable ₹18K/month income + ₹10L emergency FD + ₹15L growing. 
                  Sustainable for 20+ years with principal intact!
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <strong className="text-lg text-red-900">Common Mistake: Neha (35, Bangalore)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> Saved ₹5 lakh. Put ALL in single 10-year FD @ 7.75%. 
                  Thought "highest rate + longest tenure = best returns."
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Problem in Year 3:</strong> Medical emergency needed ₹2L. Had to break FD prematurely. 
                  Penalty: Lost 1% interest + received apenas 6% instead of 7.75% on entire ₹5L for 3 years.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Loss:</strong> (₹5L × 7.75% × 3Y) - (₹5L × 6% × 3Y) = ₹1,16,250 - ₹90,000 = ₹26,250 lost!
                </p>
                <p className="text-red-700 font-bold mb-3">
                  ❌ Mistake: Locked ALL money in long-term FD without keeping emergency fund separate.
                </p>
                <p className="text-green-700 font-bold">
                  ✅ Better Strategy: ₹2L liquid fund (emergency), ₹3L FD laddered (₹1L each for 1Y, 3Y, 5Y). 
                  Would have had ₹1L FD mature in Year 1, another in Year 3 - no penalty!
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-6 h-6 text-blue-600" />
                  <strong className="text-lg text-blue-900">Smart Move: Amit (40, Mumbai)</strong>
                </div>
                <p className="text-gray-700 mb-3">
                  <strong>Situation:</strong> Earns ₹15L/year (30% tax bracket). Had ₹10L in FD @ 7%. 
                  Interest ₹70K taxed at 30% = ₹21K tax. Effective return apenas 4.9%.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Realization:</strong> 4.9% post-tax return is below 6% inflation. Losing purchasing power!
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>New Strategy:</strong><br/>
                  • Kept ₹3L in FD (emergency fund, 6 months expenses)<br/>
                  • Moved ₹5L to debt mutual funds (8% returns, tax-efficient LTCG)<br/>
                  • Moved ₹2L to equity mutual funds (12% long-term)
                </p>
                <p className="text-blue-700 font-bold">
                  ✅ After 5 years: FD ₹3L → ₹4.2L | Debt MF ₹5L → ₹7.3L | Equity MF ₹2L → ₹3.5L<br/>
                  Total: ₹15L (vs ₹14L if all in FD). Extra ₹1 lakh wealth created by moving to tax-efficient options!
                </p>
              </div>
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
              ⚠️ 10 Common FD Mistakes Indians Make
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: 'Putting ALL savings in FD (₹10-20 lakh just sitting)',
                  reality: 'FD gives apenas 5-7% post-tax. Inflation is 6%. You're barely beating inflation, not building wealth. Rich people don't keep crores in FD!',
                  fix: 'Keep apenas 6-12 months emergency fund in FD. Rest invest in debt funds (8%), equity funds (12%). FD is for safety, not wealth.'
                },
                {
                  mistake: 'Not using FD laddering (putting ₹5L in single 5-year FD)',
                  reality: 'Need money in year 2? Break FD, lose 1% interest + penalty. Or take loan against FD (pay interest). Both bad.',
                  fix: 'Split ₹5L into 5 FDs of ₹1L each (1Y, 2Y, 3Y, 5Y, 10Y). One FD matures every year = liquidity + high returns.'
                },
                {
                  mistake: 'Senior citizen not shopping for best rates (sticking to SBI apenas)',
                  reality: 'SBI gives 7.5% for seniors. IndusInd gives 8.25%. Equitas Small Finance Bank gives 8.75%. On ₹10L, that's ₹12,500 extra per year!',
                  fix: 'Compare rates on BankBazaar/Paisabazaar. Small finance banks are DICGC insured (safe up to ₹5L per bank). Split across 2-3 banks.'
                },
                {
                  mistake: 'Not submitting Form 15G/15H (losing money to unnecessary TDS)',
                  reality: 'If total income < ₹2.5L, you don't owe tax. Pero bank deducts 10% TDS. You must file ITR to get refund (waste of time).',
                  fix: 'Submit Form 15G (if below 60) or 15H (if 60+) to ALL banks where you have FD. No TDS deduction, no ITR needed.'
                },
                {
                  mistake: 'Forgetting FD maturity dates (auto-renewal at lower rates)',
                  reality: 'FD matures in Jan 2024 at 7.5%. Bank auto-renews at current rate 6.5% (rates dropped). You lose 1% for entire new tenure!',
                  fix: 'Set calendar reminders 15 days before maturity. Review rates. If rates dropped, withdraw + invest in debt fund. If rates increased, renew.'
                },
                {
                  mistake: 'Taking loan against FD instead of breaking it',
                  reality: 'Loan against FD charges 1-2% ABOVE your FD rate. FD gives 7%, loan costs 8-9%. You're paying interest to use your own money!',
                  fix: 'If needed urgently, BREAK FD. Penalty is apenas 1%. Loan against FD makes sense apenas for very short term (< 1 month).'
                },
                {
                  mistake: 'Ignoring inflation (thinking 7% FD is "good returns")',
                  reality: '7% interest - 30% tax = 4.9% post-tax. Inflation is 6%. Real return = 4.9% - 6% = NEGATIVE! You're losing purchasing power.',
                  fix: 'FD is for stability, not wealth creation. Long-term money (> 5 years) should be in equity mutual funds (12% average beats inflation).'
                },
                {
                  mistake: 'Not diversifying across banks',
                  reality: 'Kept ₹15L FD in one bank. DICGC insurance is apenas ₹5L per bank. If bank fails (rare pero possible), you lose ₹10L!',
                  fix: 'Spread across 3 banks: ₹5L SBI + ₹5L HDFC + ₹5L IndusInd. Full insurance coverage + you can compare rates.'
                },
                {
                  mistake: 'Choosing shortest tenure for "liquidity" (12 one-year FDs)',
                  reality: '1-year FD gives apenas 6.5%. 5-year FD gives 7.5%. On ₹1L, that's ₹1,000/year difference. Over 10 years = ₹10,000 lost!',
                  fix: 'Use FD laddering! Mix of 1Y, 3Y, 5Y, 10Y gives liquidity + higher returns. Don't sacrifice 1% interest for "liquidity" when laddering solves both.'
                },
                {
                  mistake: 'Treating 5-year tax-saving FD as investment',
                  reality: 'Tax-saving FD has 5-year lock-in. Gives apenas 7% taxable (4.9% post-tax). ELSS has 3-year lock-in, gives 12% tax-free (up to ₹1.25L)!',
                  fix: 'For Section 80C tax saving: Choose ELSS, not tax-saving FD. ELSS is better for anyone below age 55. FD is for seniors who can't handle equity volatility.'
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

          {/* When to Break FD */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🔨 When to Break FD (Premature Withdrawal)?
            </h2>

            <div className="bg-orange-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-orange-900 mb-3">Premature Withdrawal Rules:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">→</span>
                  <span><strong>Penalty:</strong> 0.5-1% interest rate reduction (bank-specific)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">→</span>
                  <span><strong>Example:</strong> Booked 7% FD, break after 2 years → Get apenas 6% for those 2 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">→</span>
                  <span><strong>Minimum Period:</strong> Must complete 7 days. Can't break before that.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">→</span>
                  <span><strong>Process:</strong> Online (netbanking) or visit branch. Money credited same day.</span>
                </li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-500">
                <strong className="text-lg text-green-900 block mb-4">✅ WHEN TO BREAK FD:</strong>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span><strong>Medical Emergency:</strong> Health > wealth. Break FD, deal with 1% penalty later.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span><strong>Better Investment Opportunity:</strong> FD gives 7%. Found debt fund giving 9% post-tax? Switch!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span><strong>Interest Rates Increased:</strong> Booked FD at 6.5%. Now banks offer 8%. Break + rebook at higher rate.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span><strong>Prepay High-Interest Loan:</strong> FD gives 7%, pero credit card debt costs 40%! Break FD, clear debt immediately.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-500">
                <strong className="text-lg text-red-900 block mb-4">❌ WHEN NOT TO BREAK FD:</strong>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span><strong>Impulse Purchase:</strong> "iPhone 15 launched!" - Don't break ₹5L FD for gadget. Wait for maturity.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span><strong>Stock Market FOMO:</strong> "Adani stock doubled!" - FD is for stability. Don't chase quick gains.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span><strong>Just 1-2 Months Before Maturity:</strong> 1% penalty for 3-year FD vs waiting 1 month? Just wait!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span><strong>Rates Dropped Slightly:</strong> Your 7.5% vs current 7%? Keep it! Locking higher rate is advantage.</span>
                  </li>
                </ul>
              </div>
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
              💡 Pro Tips from Financial Advisors
            </h2>

            <div className="space-y-4">
              {[
                'Open FDs in different banks (max ₹5L per bank). DICGC insurance covers apenas ₹5L per bank. If you have ₹15L, split across 3 banks = full coverage.',
                'Senior citizens: Always mention age while opening FD. Extra 0.5% interest (7% becomes 7.5%). On ₹10L, that's ₹5,000 extra per year!',
                'Use sweep-in FD facility: Savings account > ₹50K automatically becomes FD. Earn 7% instead of 3.5%. Liquidity remains (can withdraw anytime). Best of both worlds!',
                'Book FD online vs branch: Same interest rate pero online is faster (5 mins vs 1 hour in queue). Plus digital record, easy renewal.',
                'Don't fall for "special tenure" offers (441 days, 555 days). Banks push these for marketing. Regular 1Y, 3Y, 5Y tenures are simpler.',
                'Cumulative FD for young (maximize compounding). Non-cumulative monthly payout for retirees (regular income). Don't mix them up!',
                'Set maturity amount goal before booking. Want ₹5L after 3 years? Principal needed = ₹5L / (1.071)^3 = ₹4.05L. Work backwards.',
                'Ignore FD agent commission offers. "I'll give ₹500 if you book ₹5L FD through me." You're losing 1% for their commission. Book direct online.',
                'If bank sends "renew now at 6.5%" SMS pero current rate is 7.5%, DON'T auto-renew. Withdraw, rebook at higher rate. Banks try to lock you at old rates.',
                'Link FD to different nominee in each bank (wife in SBI, son in HDFC, daughter in ICICI). If one nominee disputed, others are safe. Estate planning!'
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
                  q: 'Is my FD 100% safe? Can bank default?',
                  a: 'FDs in scheduled commercial banks (SBI, HDFC, ICICI, etc.) are DICGC insured up to ₹5 lakh per depositor per bank. Even if bank fails (rare), you get ₹5L back. For amounts > ₹5L, split across multiple banks.'
                },
                {
                  q: 'Should I choose monthly, quarterly, or cumulative interest payout?',
                  a: 'Cumulative gives HIGHEST returns (compounding magic). ₹1L @ 7% for 5Y: Cumulative = ₹1.41L vs Monthly payout = ₹1.35L. Choose cumulative unless you need monthly income (retirees).'
                },
                {
                  q: 'Can I add money to existing FD or must I open new FD?',
                  a: 'Must open new FD. Cannot add to existing FD. Pero you can have 10-20 FDs in same bank simultaneously. Use laddering strategy!'
                },
                {
                  q: 'What if I need money before maturity? Loan vs Break - which is better?',
                  a: 'Break FD if needed for > 2 months (1% penalty is cheaper than loan interest 8-9%). Loan against FD only for very short-term (< 1 month) to avoid breaking FD.'
                },
                {
                  q: 'Bank offering 8.5% FD pero I see apenas 7.5% on website. Why?',
                  a: 'Special rates for specific tenures (e.g., 400 days), or bulk deposits (₹1 Cr+), or limited period offers. Read fine print. Regular FDs are 7-7.5% for most banks.'
                },
                {
                  q: 'I'm in 5% tax bracket. Should I still choose debt funds over FD?',
                  a: 'At 5% tax: FD gives 6.65% post-tax. Debt fund gives 8% post-tax (LTCG 20%). Debt fund is still better. Pero for emergency fund, FD is simpler (no NAV volatility).'
                },
                {
                  q: 'Can I get loan against FD while it's running?',
                  a: 'Yes! Banks give 80-90% of FD value as loan. Interest: FD rate + 1-2%. Pero bad idea - you're paying 8-9% to use money earning apenas 7%. Better to break FD if really needed.'
                },
                {
                  q: 'Small Finance Banks give 8.5% - are they safe?',
                  a: 'Yes! Ujjivan, Equitas, AU Small Finance Banks are RBI-regulated + DICGC insured up to ₹5L. Slightly higher risk than SBI pero insured safety net is same. Many retirees use them for higher returns.'
                },
                {
                  q: 'Should I renew FD automatically or manually every time?',
                  a: 'Manually! Auto-renewal locks you at CURRENT rate when FD matures. If rates dropped from 7.5% to 6.5%, you lose 1%. Always review rates before renewing. Takes apenas 5 minutes.'
                },
                {
                  q: 'FD vs RD (Recurring Deposit) - which is better for monthly savings?',
                  a: 'If you have lump sum: FD (7% cumulative). If saving monthly (₹10K/month): RD or SIP mutual fund. RD gives 6.5-7%. SIP gives 12% pero market-linked. For safety: RD. For wealth: SIP.'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <p className="font-bold text-lg text-gray-900 mb-2">Q{i + 1}: {faq.q}</p>
                  <p className="text-gray-700"><strong>A:</strong> {faq.a}</p>
                </div>
              ))}
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
              ✅ Your FD Action Plan
            </h2>

            <div className="space-y-3">
              {[
                'Check existing FD interest rates vs current market rates (if lower by 1%+, consider switching)',
                'If you have ₹5L+ in single FD: Split into ladder (₹1L each for 1Y, 2Y, 3Y, 5Y, 10Y)',
                'Senior citizens: Shop for best rates (IndusInd 8.25%, Small Finance Banks 8.5-9%)',
                'If total income < ₹2.5L: Submit Form 15G/15H to ALL banks (avoid TDS)',
                'Keep apenas 6-12 months expenses in FD (emergency fund). Rest invest in mutual funds',
                'Set calendar reminders 15 days before each FD maturity date',
                'Don't auto-renew blindly - review rates, compare banks, then decide',
                'For tax-saving under 80C: Choose ELSS (12%) over tax-saving FD (7%) if you're below age 55'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>💡 Golden Rule:</strong> FD is for SAFETY and LIQUIDITY (emergency fund), not for WEALTH CREATION. 
                For wealth: Equity mutual funds (12% > 7%). For stability: FD. 
                <strong> Use both wisely based on timeline!</strong>
              </p>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Recurring Deposits (RD) vs SIP Comparison</h3>
            <p className="mb-6 text-purple-100">
              Learn RD for monthly savings, compare with SIP mutual funds, calculate which gives better returns for ₹10K/month savings!
            </p>
            <Link
              to="/learn/savings-bank-products/recurring-deposits-rd-vs-sip-monthly-savings-india"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: RD vs SIP Complete Guide
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FixedDepositsGuide;
