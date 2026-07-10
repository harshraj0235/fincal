import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Smartphone, TrendingUp, Shield, CheckCircle,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Award,
  Zap, Users, Star, Lock, Wifi, CreditCard, Clock, BadgeCheck, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const HighInterestSavings: React.FC = () => {
  const [balance, setBalance] = useState(100000);
  const traditionalRate = 3;
  const highInterestRate = 6.5;

  const traditionalInterest = (balance * traditionalRate) / 100;
  const highInterest = (balance * highInterestRate) / 100;
  const difference = highInterest - traditionalInterest;

  const faqData = [
    {
      question: "Are digital banks safe? What if they shut down?",
      answer: "Yes, 100% safe! Digital banks are licensed by RBI and have DICGC insurance up to ₹5 lakh per depositor. If bank fails, you get ₹5L back within 90 days. Keep max ₹5L per bank."
    },
    {
      question: "Why do small finance banks offer higher interest (7% vs 3%)?",
      answer: "They don't have physical branches → Lower costs → Pass savings to customers as higher interest. They also focus on lending to underserved sectors with higher margins."
    },
    {
      question: "Can I do UPI, NEFT, IMPS from these accounts?",
      answer: "Yes! All digital and small finance banks support full UPI (₹1L/day limit), NEFT, RTGS, IMPS. Works exactly like regular bank account."
    },
    {
      question: "Is there minimum balance requirement?",
      answer: "Most digital banks: Zero balance. Small finance banks: ₹500-₹5,000 monthly average. Check specific bank terms."
    },
    {
      question: "How do I deposit cash in digital-only banks?",
      answer: "Cash deposit options: (1) Partner bank branches, (2) Cash deposit machines, (3) Transfer from other bank via NEFT/UPI. Most people never need cash deposits!"
    },
    {
      question: "Which is better: Jupiter, Fi, or DBS Digibank?",
      answer: "Jupiter: Best app UI, 6.5% interest. Fi: Good budgeting tools, 6% interest. DBS: Established bank, 6-7% interest. All are safe. Choose based on features you need."
    },
    {
      question: "Can NRIs open these high-interest accounts?",
      answer: "NRIs cannot open resident savings accounts. But can open NRE/NRO accounts in banks like ICICI, HDFC. Interest rates: 2-3% for NRE accounts."
    },
    {
      question: "Is interest from high-interest savings taxable?",
      answer: "Yes, fully taxable. But ₹10,000/year interest is tax-free under Section 80TTA (₹50,000 for senior citizens under 80TTB). Interest above this added to income."
    },
    {
      question: "Can I get debit card and ATM access?",
      answer: "Yes! All provide debit cards (Visa/Mastercard/RuPay). ATM: 5-10 free withdrawals/month, then ₹20/transaction. Use UPI to avoid ATM fees!"
    },
    {
      question: "What happens to my money if I lose my phone?",
      answer: "Your money is safe! (1) Login from another device with credentials, (2) Call customer care to block account temporarily, (3) Enable 2FA for extra security."
    },
    {
      question: "AU Bank vs Ujjivan vs Jana - which small finance bank is best?",
      answer: "AU Bank: Largest, 7.25% interest, best network. Ujjivan: 7%, good for tier 2/3 cities. Jana: 7%, focuses on women. All RBI licensed and safe. Choose nearest one."
    },
    {
      question: "Should I move all my money to high-interest account?",
      answer: "Keep only ₹2-5L per bank (DICGC limit). Don't close main account - keep for salary, EMI, credit cards. Use high-interest account for emergency fund."
    },
    {
      question: "Can I take loan against these savings accounts?",
      answer: "Yes, most banks offer overdraft facility at 2-3% above savings rate. Example: ₹1L balance, get ₹80K overdraft at 9-10% interest."
    },
    {
      question: "What is sweep-in facility in these accounts?",
      answer: "Some digital banks auto-convert idle money above threshold (e.g., ₹25K) into FD at higher rate (7-8%). Best of both: Liquidity + Higher returns!"
    },
    {
      question: "Are there any hidden charges?",
      answer: "Most digital banks: Zero fees (no SMS, no minimum balance penalty). Small finance banks: Check for ATM charges after free limit, cheque book charges. Read terms carefully!"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="High-Interest Savings Accounts 2025: Earn 6-7% vs 3% Traditional Banks | MoneyCal"
        description="Complete guide to high-interest savings accounts in India. Compare digital banks (Jupiter 6.5%, Fi 6%, DBS 7%) vs small finance banks (AU 7.25%, Ujjivan 7%) vs traditional (HDFC 3.5%, SBI 2.7%). Safety, features, DICGC insurance, account opening process, tax implications. Earn ₹3,500 more annually on ₹1L balance!"
        keywords="high interest savings account India, digital banks 7 percent, Jupiter Fi DBS comparison, small finance bank interest rates, AU Bank Ujjivan Jana, DICGC insurance, zero balance savings account, best savings account 2025"
        url="/learn/savings-bank-products/high-interest-savings-accounts-digital-banks-india-comparison"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Savings & Bank Products</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 4 of 9</span>
                <Link 
                  to="/learn/savings-bank-products/senior-citizen-savings-schemes-scss-pmvvy-india-benefits"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  Lesson 4 • 40 Minutes • Intermediate
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  High-Interest Savings Accounts
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Earn 6-7% vs Traditional 3% - उच्च ब्याज बचत खाते (7% तक कमाएं!)
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-blue-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Digital banks offering 6-7% interest (Jupiter, Fi, DBS vs HDFC 3.5%)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Small finance banks: AU (7.25%), Ujjivan, Jana - Safety & DICGC insurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Earn ₹3,500 more annually on ₹1L balance (calculator included)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Account opening process, features comparison, pros & cons</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Why Traditional Banks Give Only 3% */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                Why Are You Getting Only 3% Interest?
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  Traditional banks (HDFC, ICICI, SBI) give <strong>only 2.7-3.5% interest</strong> on savings accounts. Why so low? Because:
                </p>
                
                <div className="bg-red-50 p-6 rounded-xl my-6">
                  <h3 className="text-xl font-bold text-red-900 mb-4">💸 Where Your Interest Goes:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li><strong>Physical Branches:</strong> Rent, electricity, salaries for thousands of employees</li>
                    <li><strong>ATM Network:</strong> Maintenance costs for 10,000+ ATMs</li>
                    <li><strong>Marketing:</strong> TV ads, billboards, celebrity endorsements</li>
                    <li><strong>Legacy Systems:</strong> Old technology, expensive to maintain</li>
                  </ul>
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <p className="font-bold text-red-800">Result: They keep 4-5% margin and give you only 3%! 😡</p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-900 mb-4">✅ How Digital Banks Give 6-7%:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li><strong>No Physical Branches:</strong> 100% digital → Save ₹1000s of crores</li>
                    <li><strong>Low Staff:</strong> AI chatbots, automated systems → Lower salary costs</li>
                    <li><strong>Modern Tech:</strong> Cloud-based, efficient, cheap to run</li>
                    <li><strong>Zero Marketing:</strong> Word of mouth, social media (free!)</li>
                  </ul>
                  <div className="mt-4 p-4 bg-white rounded-lg">
                    <p className="font-bold text-green-800">Result: They pass savings to YOU as 6-7% interest! 🎉</p>
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
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                💰 Calculate Your Extra Earnings
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Your Savings Balance (₹)</label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-2xl"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Traditional Bank */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">🏦 Traditional Bank (3%)</h3>
                  <div className="text-sm opacity-90 mb-2">Annual Interest Earned</div>
                  <div className="text-4xl font-bold mb-4">₹{traditionalInterest.toLocaleString('en-IN')}</div>
                  <div className="text-sm">Examples: HDFC, ICICI, Axis</div>
                </div>

                {/* High-Interest Account */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">🚀 High-Interest Account (6.5%)</h3>
                  <div className="text-sm opacity-90 mb-2">Annual Interest Earned</div>
                  <div className="text-4xl font-bold mb-4 text-green-300">₹{highInterest.toLocaleString('en-IN')}</div>
                  <div className="text-sm">Examples: Jupiter, AU Bank, DBS</div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center text-lg">
                💎 You Earn ₹{difference.toLocaleString('en-IN')} More Per Year! ({Math.round((difference / traditionalInterest) * 100)}% extra)
              </div>

              <div className="mt-4 text-sm opacity-90 text-center">
                Over 10 years: Extra ₹{(difference * 10).toLocaleString('en-IN')} + compounding!
              </div>
            </div>
          </motion.section>

          {/* Digital Banks Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📱 Top Digital Banks in India (2025)</h2>

              <div className="space-y-6">
                {/* Jupiter */}
                <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Jupiter Money</h3>
                      <p className="text-gray-600">Powered by Federal Bank</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">6.5%</div>
                      <div className="text-sm text-gray-600">Interest</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">✅ Pros:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Beautiful app UI (best in class)</li>
                        <li>• Zero balance account</li>
                        <li>• Instant account opening (5 mins)</li>
                        <li>• Spend analysis & insights</li>
                        <li>• Jewels rewards program</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">⚠️ Cons:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• No physical branches</li>
                        <li>• Customer support via chat only</li>
                        <li>• 6.5% only on first ₹1L balance</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <strong>Best For:</strong> Young professionals (20-35) who want best app experience + decent interest
                  </div>
                </div>

                {/* Fi Money */}
                <div className="border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Fi Money</h3>
                      <p className="text-gray-600">Powered by Federal Bank</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">6.0%</div>
                      <div className="text-sm text-gray-600">Interest</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">✅ Pros:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Excellent budgeting tools</li>
                        <li>• Auto-categorization of expenses</li>
                        <li>• Smart deposits (auto-save)</li>
                        <li>• Instant FD creation</li>
                        <li>• Free ATM withdrawals</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">⚠️ Cons:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Slightly lower interest than Jupiter</li>
                        <li>• Referral required to join (or waitlist)</li>
                        <li>• Limited partner ATMs</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <strong>Best For:</strong> People who want smart money management + auto-savings features
                  </div>
                </div>

                {/* DBS Digibank */}
                <div className="border-2 border-red-200 rounded-xl p-6 hover:border-red-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">DBS Digibank</h3>
                      <p className="text-gray-600">Singapore's largest bank (AAA rated)</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">7.0%</div>
                      <div className="text-sm text-gray-600">Interest (on ₹1L+)</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">✅ Pros:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Highest interest: 7% (₹1L-5L)</li>
                        <li>• Established international bank</li>
                        <li>• High security standards</li>
                        <li>• Video banking support</li>
                        <li>• Instant account opening</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">⚠️ Cons:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Min ₹25K quarterly avg balance</li>
                        <li>• App UI not as good as Jupiter</li>
                        <li>• Limited UPI cashback offers</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <strong>Best For:</strong> Those prioritizing maximum interest + established bank credibility
                  </div>
                </div>

                {/* Niyo */}
                <div className="border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Niyo</h3>
                      <p className="text-gray-600">Powered by Equitas Small Finance Bank</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">7.0%</div>
                      <div className="text-sm text-gray-600">Interest</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">✅ Pros:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Zero forex markup (best for travel)</li>
                        <li>• Zero balance account</li>
                        <li>• High 7% interest</li>
                        <li>• Good for freelancers/NRIs</li>
                        <li>• Free international ATM withdrawals</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">⚠️ Cons:</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• Fewer features than Jupiter/Fi</li>
                        <li>• Customer support can be slow</li>
                        <li>• App occasionally buggy</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <strong>Best For:</strong> Frequent travelers, freelancers getting international payments
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Small Finance Banks */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🏦 Small Finance Banks - Highest Interest (7%+)</h2>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-6">
                <p className="text-yellow-900 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span><strong>What are Small Finance Banks?</strong> RBI-licensed banks serving underserved sectors. 100% safe with DICGC insurance (₹5L). They offer higher interest because they lend at higher rates to small businesses/farmers.</span>
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="p-4 font-bold text-gray-900">Bank</th>
                      <th className="p-4 font-bold text-gray-900">Interest Rate</th>
                      <th className="p-4 font-bold text-gray-900">Min Balance</th>
                      <th className="p-4 font-bold text-gray-900">Best Feature</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-green-50">
                      <td className="p-4 font-semibold">AU Small Finance Bank</td>
                      <td className="p-4 text-green-600 font-bold text-xl">7.25%</td>
                      <td className="p-4">₹5,000 MAB</td>
                      <td className="p-4">Largest SFB, 600+ branches</td>
                    </tr>
                    <tr className="border-b bg-gray-50 hover:bg-green-50">
                      <td className="p-4 font-semibold">Ujjivan Small Finance Bank</td>
                      <td className="p-4 text-green-600 font-bold text-xl">7.00%</td>
                      <td className="p-4">₹1,000 MAB</td>
                      <td className="p-4">Strong in tier 2/3 cities</td>
                    </tr>
                    <tr className="border-b hover:bg-green-50">
                      <td className="p-4 font-semibold">Jana Small Finance Bank</td>
                      <td className="p-4 text-green-600 font-bold text-xl">7.00%</td>
                      <td className="p-4">₹500 MAB</td>
                      <td className="p-4">Women-focused banking</td>
                    </tr>
                    <tr className="border-b bg-gray-50 hover:bg-green-50">
                      <td className="p-4 font-semibold">Equitas Small Finance Bank</td>
                      <td className="p-4 text-green-600 font-bold text-xl">7.00%</td>
                      <td className="p-4">₹2,500 MAB</td>
                      <td className="p-4">Good digital banking app</td>
                    </tr>
                    <tr className="hover:bg-green-50">
                      <td className="p-4 font-semibold">Suryoday Small Finance Bank</td>
                      <td className="p-4 text-green-600 font-bold text-xl">6.75%</td>
                      <td className="p-4">₹1,000 MAB</td>
                      <td className="p-4">Low minimum balance</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-1">100% Safe</h4>
                  <p className="text-sm text-gray-700">DICGC insured ₹5L per depositor</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <BadgeCheck className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-1">RBI Licensed</h4>
                  <p className="text-sm text-gray-700">Full banking license from Reserve Bank</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <Star className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="font-bold text-gray-900 mb-1">Higher Returns</h4>
                  <p className="text-sm text-gray-700">2x more than traditional banks</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Safety & DICGC */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8" />
                🔒 Is Your Money Safe? DICGC Insurance Explained
              </h2>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">What is DICGC?</h3>
                <p className="mb-4">
                  <strong>Deposit Insurance and Credit Guarantee Corporation (DICGC)</strong> is a subsidiary of RBI that insures all bank deposits.
                </p>
                <div className="bg-white/30 p-4 rounded-lg">
                  <p className="font-bold">Coverage: ₹5,00,000 per depositor per bank</p>
                  <p className="text-sm mt-2">Includes: Savings + FD + RD combined (maximum ₹5L)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-2">✅ What Happens if Bank Fails?</h4>
                  <ol className="space-y-2 text-sm">
                    <li>1. RBI takes over the bank immediately</li>
                    <li>2. DICGC pays you back within 90 days</li>
                    <li>3. You get principal + interest up to ₹5 lakh</li>
                    <li>4. For amount above ₹5L: Paid after asset liquidation (may take time)</li>
                  </ol>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-2">💡 Pro Strategy: Spread Across Banks</h4>
                  <p className="text-sm mb-3">If you have ₹15 lakh to save:</p>
                  <ul className="space-y-2 text-sm">
                    <li>• ₹5L in Bank A (Jupiter) → Fully insured ✅</li>
                    <li>• ₹5L in Bank B (AU Bank) → Fully insured ✅</li>
                    <li>• ₹5L in Bank C (DBS) → Fully insured ✅</li>
                  </ul>
                  <p className="text-sm mt-3 font-bold">Total: ₹15L, 100% insured! 🎯</p>
                </div>

                <div className="bg-yellow-400 text-yellow-900 rounded-xl p-6">
                  <p className="font-bold">⚠️ Important: Each bank = Separate ₹5L limit</p>
                  <p className="text-sm mt-2">Example: If you have ₹3L in Jupiter (Federal Bank) and ₹3L in Fi (also Federal Bank), total coverage is ₹5L only (same bank). Choose different banks!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Feature Comparison Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Complete Feature Comparison</h2>
              
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 font-bold text-gray-900">Feature</th>
                    <th className="p-3 font-bold text-gray-900">Digital Banks</th>
                    <th className="p-3 font-bold text-gray-900">Small Finance</th>
                    <th className="p-3 font-bold text-gray-900">Traditional</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Interest Rate</td>
                    <td className="p-3 text-green-600 font-bold">6-7%</td>
                    <td className="p-3 text-green-600 font-bold">7-7.25%</td>
                    <td className="p-3">2.7-3.5%</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Min Balance</td>
                    <td className="p-3">₹0 (Zero balance)</td>
                    <td className="p-3">₹500-₹5,000</td>
                    <td className="p-3">₹10,000-₹25,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Physical Branches</td>
                    <td className="p-3">❌ None</td>
                    <td className="p-3">✅ 100-600</td>
                    <td className="p-3">✅ 5,000+</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Account Opening</td>
                    <td className="p-3">5-10 mins (100% online)</td>
                    <td className="p-3">1-2 days (online/branch)</td>
                    <td className="p-3">3-7 days (branch visit)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">ATM Withdrawals</td>
                    <td className="p-3">5 free, then ₹20</td>
                    <td className="p-3">5-10 free, then ₹20</td>
                    <td className="p-3">Unlimited free</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">UPI Limit</td>
                    <td className="p-3">₹1L/day</td>
                    <td className="p-3">₹1L/day</td>
                    <td className="p-3">₹1L/day</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Customer Support</td>
                    <td className="p-3">Chat/Email</td>
                    <td className="p-3">Phone/Branch</td>
                    <td className="p-3">Phone/Branch/Email</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-3 font-semibold">Cash Deposit</td>
                    <td className="p-3">Partner ATMs (limited)</td>
                    <td className="p-3">✅ Own branches</td>
                    <td className="p-3">✅ Extensive network</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-semibold">Debit Card</td>
                    <td className="p-3">✅ Visa/Mastercard</td>
                    <td className="p-3">✅ RuPay/Visa</td>
                    <td className="p-3">✅ All types</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Best For</td>
                    <td className="p-3">Young, tech-savvy users</td>
                    <td className="p-3">Max interest + some branches</td>
                    <td className="p-3">Need physical branches</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Account Opening Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📝 How to Open High-Interest Account (5 Minutes!)</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Download App</h3>
                    <p className="text-gray-700">Jupiter / Fi / DBS Digibank / Niyo - Choose one from Play Store/App Store</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Enter Mobile Number</h3>
                    <p className="text-gray-700">Verify via OTP (linked to your Aadhaar mobile number)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Enter PAN Number</h3>
                    <p className="text-gray-700">For KYC verification (mandatory for all bank accounts)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Video KYC (2 minutes)</h3>
                    <p className="text-gray-700">Show PAN card, Aadhaar, take selfie. Banking agent will verify live on video call</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Account Activated!</h3>
                    <p className="text-gray-700">Get virtual debit card instantly. Physical card delivered in 7-10 days</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-900 mb-3">📋 Documents Needed:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ PAN Card (mandatory)</li>
                  <li>✅ Aadhaar Card (for address proof)</li>
                  <li>✅ Mobile number (linked to Aadhaar)</li>
                  <li>✅ Selfie + Live video (for KYC)</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">That's it! No need to visit branch, no paperwork, 100% digital! 🎉</p>
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
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Digital banks offer 6-7% vs traditional 3% = <strong>₹3,500 extra on ₹1L annually!</strong></p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>100% safe: DICGC insurance covers ₹5L per bank. Spread money across banks.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Top picks: Jupiter (6.5%, best app), AU Bank (7.25%, highest rate), DBS (7%, established)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Use for: Emergency fund (₹2-5L). Don't close main account (need for salary/EMI).</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p>Account opening: 5 minutes online via Video KYC. No branch visit needed!</p>
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
                <Link to="/calculators/savings-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <IndianRupee className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Savings Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate interest earnings</p>
                </Link>
                <Link to="/calculators/fd-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">FD Calculator</h3>
                  <p className="text-sm text-gray-600">Compare FD vs Savings</p>
                </Link>
                <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <DollarSign className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Calculator</h3>
                  <p className="text-sm text-gray-600">Tax on interest income</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Senior Citizen Schemes (8.2% Interest!)</h3>
            <p className="mb-6 text-orange-100">Learn about SCSS (8.2%), PMVVY (7.4%) - Best schemes for retirees. Tax benefits, guaranteed returns, monthly income options!</p>
            <Link
              to="/learn/savings-bank-products/senior-citizen-savings-schemes-scss-pmvvy-india-benefits"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Senior Citizen Schemes
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HighInterestSavings;
