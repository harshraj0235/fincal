import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, DollarSign, CheckCircle, Shield, Award,
  AlertTriangle, Calculator, Target, HelpCircle, XCircle, Zap,
  TrendingUp, Users, Star, Smartphone, FileText, BadgeCheck, Percent
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const DirectVsRegular: React.FC = () => {
  const [sipAmount, setSipAmount] = useState(10000);
  const [years, setYears] = useState(20);
  
  const directExpense = 0.5; // 0.5% expense ratio
  const regularExpense = 1.5; // 1.5% expense ratio (1% commission)
  
  const directReturn = 12;
  const regularReturn = directReturn - (regularExpense - directExpense); // 11%
  
  const monthlyRate = (directReturn / 100) / 12;
  const months = years * 12;
  const directMaturity = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  
  const regularMonthlyRate = (regularReturn / 100) / 12;
  const regularMaturity = sipAmount * ((Math.pow(1 + regularMonthlyRate, months) - 1) / regularMonthlyRate) * (1 + regularMonthlyRate);
  
  const savings = directMaturity - regularMaturity;

  const faqData = [
    {
      question: "What is the difference between Direct and Regular mutual fund plans?",
      answer: "Direct Plan: Buy directly from fund house (AMC) or platforms like Groww/Zerodha. No middleman. Expense ratio: 0.5-1%. Regular Plan: Buy through agents/banks. They get 1% commission. Expense ratio: 1.5-2.5%. SAME fund, SAME stocks, but Regular costs 1% more annually!"
    },
    {
      question: "How much can I really save with direct plans over 20-30 years?",
      answer: "On ₹10,000/month SIP for 30 years: Direct = ₹3.52 crore vs Regular = ₹3.07 crore. Difference: ₹45 LAKH! This is real money lost to unnecessary commissions. Always choose Direct!"
    },
    {
      question: "Can I switch my existing Regular plan to Direct?",
      answer: "Yes! Two ways: (1) Switch within same fund (tax-free but fund-specific rules), (2) Redeem Regular + Buy Direct (triggers capital gains tax). For long-term holdings, switch gradually during rebalancing."
    },
    {
      question: "Who should use Regular plans then?",
      answer: "ONLY if you genuinely need hand-holding advice and willing to pay 1% annually (₹10,000 on ₹10L). For most people: Learn basics yourself (free on MoneyCal!) and use Direct plans. Save lakhs!"
    },
    {
      question: "Best platforms to buy direct mutual funds?",
      answer: "Top free platforms: (1) Groww - Best UI, beginner-friendly, (2) Zerodha Coin - Zero commission, (3) Kuvera - Good tracking tools, (4) Paytm Money - Easy UPI payment, (5) ET Money. All are 100% free!"
    },
    {
      question: "Do direct plans have same fund manager and stocks?",
      answer: "YES! Exactly same. Same fund manager, same stocks, same strategy. ONLY difference: Regular plan deducts 1% extra annually for agent commission. Performance slightly worse due to higher cost."
    },
    {
      question: "Can I get advice if I buy direct plans?",
      answer: "Yes! (1) Free: YouTube, blogs, MoneyCal Learn (free!), (2) Paid: SEBI RIA (Registered Investment Advisor) at ₹5,000-20,000/year (cheaper than 1% commission on ₹10L+). Better than regular plan commission!"
    },
    {
      question: "How to identify if my current fund is Regular or Direct?",
      answer: "Check your statement or app. It will clearly say 'Direct Plan' or 'Regular Plan'. Or check expense ratio: >1.5% = Regular, <1% = Direct. If unsure, call AMC customer care with folio number."
    },
    {
      question: "Are NAVs different for Direct vs Regular?",
      answer: "Yes! Direct plan has HIGHER NAV because lower expense ratio. Example: Fund X - Direct NAV ₹150, Regular NAV ₹140. Over time, Direct NAV grows faster. This is GOOD for you!"
    },
    {
      question: "Can I start SIP in direct plan via bank?",
      answer: "Some banks allow (HDFC, ICICI) but will push Regular plan (they earn commission!). Better: Use Groww/Zerodha - they ONLY offer Direct plans (no conflict of interest)."
    },
    {
      question: "What is expense ratio and how is it calculated?",
      answer: "Annual fee as % of your investment. Deducted daily from NAV. Example: ₹10L investment, 1% expense = ₹10,000/year charged. Direct: 0.5% = ₹5,000. Regular: 1.5% = ₹15,000. ₹10K extra wasted!"
    },
    {
      question: "If I have ₹50 lakh in Regular plans, should I switch?",
      answer: "Calculate: You're losing ₹50,000/year (1% extra on ₹50L). Over 10 years = ₹5 lakh + compounding! Yes, switch gradually. Redeem ₹5L/year, buy Direct. Or switch units if fund allows."
    },
    {
      question: "Do direct plans have exit load?",
      answer: "Same as regular! If fund has 1% exit load before 1 year, both Direct and Regular have it. Exit load is fund-specific, not plan-specific. Typically: Equity funds 1% before 1 year, Debt funds nil."
    },
    {
      question: "Can company give me regular plan as part of salary?",
      answer: "Some companies invest via agents (Regular plan). Ask HR to use Direct plan instead! If they refuse, take cash salary and invest yourself in Direct. You'll earn ₹lakhs more over career!"
    },
    {
      question: "Is there any benefit of Regular plan over Direct?",
      answer: "ONLY if agent provides genuine ongoing advice: rebalancing, tax planning, financial planning. But 95% agents just sell and forget. Better: Learn yourself (free!) or hire fee-only advisor (₹10-20K/year, cheaper than 1%)."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Direct vs Regular Mutual Funds 2025: Save ₹15 Lakh Over 20 Years | MoneyCal"
        description="Complete Direct vs Regular mutual fund comparison. How 1% expense ratio difference costs ₹45 lakh on ₹10K SIP (30 years). Commission structure explained, how to switch Regular to Direct (tax implications), best platforms (Groww, Zerodha Coin, Kuvera). Stop paying unnecessary 1% agent fees - save lakhs!"
        keywords="direct vs regular mutual fund, direct plan save money, expense ratio difference, mutual fund commission, switch regular to direct, best direct plan platforms Groww Zerodha, डायरेक्ट बनाम रेगुलर म्यूचुअल फंड"
        url="/learn/investing-wealth/direct-vs-regular-mutual-funds-save-15-lakh-direct-plans-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Investing & Wealth</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 6 of 11</span>
                <Link 
                  to="/learn/investing-wealth/taxation-investments-ltcg-stcg-equity-debt-gold-tax-guide-india"
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <span className="hidden sm:inline">Next Lesson</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Lesson 6 • 40 Minutes • Intermediate</div>
                <h1 className="text-4xl font-bold text-gray-900">Direct vs Regular Mutual Funds</h1>
                <p className="text-xl text-gray-600 mt-1">Save ₹15-45 Lakh Over 20-30 Years! - डायरेक्ट प्लान से बचत</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Learn
              </h3>
              <ul className="space-y-2 text-yellow-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>Direct vs Regular: SAME fund, but 1% expense difference = ₹45L loss!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>How commission structure works (agents earn 1% of YOUR money annually)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>How to switch Regular to Direct (step-by-step guide)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>Best platforms: Groww, Zerodha Coin, Kuvera (100% free!)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* The Shocking Truth */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-6">🚨 The Shocking Truth About Regular Plans</h2>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="font-bold text-2xl mb-4">💸 Where Your Money Goes (Regular Plan):</h3>
                <p className="text-lg mb-4">
                  When you invest ₹10,000 in Regular plan mutual fund through an agent or bank:
                </p>
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between bg-white/30 p-3 rounded">
                    <span>Agent/Bank Commission:</span>
                    <span className="font-bold text-red-300">₹100/month (1%)</span>
                  </div>
                  <div className="flex justify-between bg-white/30 p-3 rounded">
                    <span>Fund Management Fee:</span>
                    <span className="font-bold">₹50/month (0.5%)</span>
                  </div>
                  <div className="flex justify-between bg-yellow-400 text-yellow-900 p-3 rounded font-bold">
                    <span>Total Expense Ratio:</span>
                    <span>1.5%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold text-2xl mb-4">✅ Direct Plan (No Middleman):</h3>
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between bg-white/30 p-3 rounded">
                    <span>Agent/Bank Commission:</span>
                    <span className="font-bold text-green-300">₹0 (NO COMMISSION!)</span>
                  </div>
                  <div className="flex justify-between bg-white/30 p-3 rounded">
                    <span>Fund Management Fee:</span>
                    <span className="font-bold">₹50/month (0.5%)</span>
                  </div>
                  <div className="flex justify-between bg-green-400 text-green-900 p-3 rounded font-bold">
                    <span>Total Expense Ratio:</span>
                    <span>0.5%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center text-xl">
                💰 You Save: 1% annually = LAKHS over time!
              </div>
            </div>
          </motion.section>

          {/* Interactive Calculator */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                🧮 Calculate YOUR Savings with Direct Plans
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly SIP Amount (₹)</label>
                  <input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Investment Period (Years)</label>
                  <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    Direct Plan (0.5% expense)
                  </h3>
                  <div className="space-y-3">
                    <div><div className="text-sm opacity-90">Total Invested</div><div className="text-2xl font-bold">₹{((sipAmount * years * 12)/100000).toFixed(2)}L</div></div>
                    <div><div className="text-sm opacity-90">Expected Returns @ 12%</div><div className="text-2xl font-bold text-green-300">₹{((directMaturity - sipAmount * years * 12)/100000).toFixed(2)}L</div></div>
                    <div className="border-t border-white/30 pt-3"><div className="text-sm opacity-90">Maturity Value</div><div className="text-4xl font-bold text-green-300">₹{(directMaturity/100000).toFixed(2)}L</div></div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-red-300" />
                    Regular Plan (1.5% expense)
                  </h3>
                  <div className="space-y-3">
                    <div><div className="text-sm opacity-90">Total Invested</div><div className="text-2xl font-bold">₹{((sipAmount * years * 12)/100000).toFixed(2)}L</div></div>
                    <div><div className="text-sm opacity-90">Expected Returns @ 11%</div><div className="text-2xl font-bold text-orange-300">₹{((regularMaturity - sipAmount * years * 12)/100000).toFixed(2)}L</div></div>
                    <div className="border-t border-white/30 pt-3"><div className="text-sm opacity-90">Maturity Value</div><div className="text-4xl font-bold text-orange-300">₹{(regularMaturity/100000).toFixed(2)}L</div></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center text-xl">
                💎 Direct Plan Saves: ₹{(savings/100000).toFixed(2)} LAKH!
              </div>
              <p className="text-center text-sm mt-3 opacity-90">This is YOUR money - don't give it away as commission!</p>
            </div>
          </motion.section>

          {/* How to Buy Direct */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🛒 How to Buy Direct Mutual Funds (5 Minutes!)</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Choose Platform</h3>
                    <p className="text-gray-700 mb-3">Download: Groww / Zerodha Coin / Kuvera / Paytm Money (all free!)</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <strong>Best for Beginners:</strong> Groww (easiest UI, Hindi support)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Complete KYC</h3>
                    <p className="text-gray-700">PAN + Aadhaar + Bank Account linking (one-time, 10 minutes)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Search Fund</h3>
                    <p className="text-gray-700 mb-3">Example: "Axis Bluechip Fund" → Will show Direct plan automatically</p>
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                      <p className="text-yellow-900 text-sm flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>Groww/Zerodha show ONLY Direct plans (they don't earn commission). Banks show Regular (they earn commission). Choose wisely!</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Start SIP</h3>
                    <p className="text-gray-700">Set amount, date (1st or 10th), auto-debit from bank. Done!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Sit Back & Relax</h3>
                    <p className="text-gray-700">Money auto-debits every month. You're investing in DIRECT plan and saving lakhs!</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Platform Comparison */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📱 Best Platforms for Direct Mutual Funds</h2>

              <div className="space-y-6">
                {[
                  {
                    name: 'Groww',
                    rating: '4.5/5',
                    users: '4 Crore+',
                    pros: ['Best UI/UX (easiest for beginners)', 'Hindi language support', 'Instant withdrawals', 'Goal-based planning'],
                    cons: ['Occasional app crashes during market hours'],
                    best: 'Beginners & Hindi users'
                  },
                  {
                    name: 'Zerodha Coin',
                    rating: '4.4/5',
                    users: '1 Crore+',
                    pros: ['Zero commissions (truly free)', 'Direct demat holding (own units directly)', 'Trusted brand (Zerodha)', 'Good for stock traders too'],
                    cons: ['UI not as polished as Groww', 'Need Zerodha demat account'],
                    best: 'Serious investors & traders'
                  },
                  {
                    name: 'Kuvera',
                    rating: '4.3/5',
                    users: '50 Lakh+',
                    pros: ['Excellent tracking tools', 'Family portfolio management', 'Tax reports', 'Goal planning'],
                    cons: ['Smaller user base than Groww'],
                    best: 'Portfolio tracking enthusiasts'
                  },
                  {
                    name: 'Paytm Money',
                    rating: '4.2/5',
                    users: '1 Crore+',
                    pros: ['Easy UPI payments', 'Paytm wallet integration', 'Simple interface', 'Quick KYC'],
                    cons: ['Limited advanced features'],
                    best: 'Paytm users & UPI fans'
                  }
                ].map((platform, idx) => (
                  <div key={idx} className="border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-400 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{platform.name}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">{platform.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Users className="w-6 h-6 text-purple-600 inline mr-1" />
                        <span className="font-bold text-purple-600">{platform.users}</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <strong className="text-green-700">✅ Pros:</strong>
                        <ul className="text-sm space-y-1 text-gray-700 mt-2">
                          {platform.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-red-700">⚠️ Cons:</strong>
                        <ul className="text-sm space-y-1 text-gray-700 mt-2">
                          {platform.cons.map((con, i) => <li key={i}>• {con}</li>)}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <strong className="text-yellow-900">Best For:</strong> {platform.best}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
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
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>ALWAYS buy Direct:</strong> Save ₹15-45L over 20-30 years. Same fund, lower cost!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Regular = Paying 1% commission</strong> to agent/bank for NO value. Learn yourself!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Best platforms:</strong> Groww (beginners), Zerodha (serious investors), Kuvera (tracking).</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Switch now:</strong> If you have Regular plans, switch gradually to Direct. Save thousands annually!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Tools</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/calculators/sip-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Calculator className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">SIP Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate your SIP returns</p>
                </Link>
                <Link to="/calculators/mutual-fund-returns-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">MF Returns Calculator</h3>
                  <p className="text-sm text-gray-600">Compare fund returns</p>
                </Link>
              </div>
            </div>
          </motion.section>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Taxation on Investments (LTCG, STCG Guide)</h3>
            <p className="mb-6 text-purple-100">Learn about 10% LTCG tax, 15% STCG, tax harvesting strategies, and how to minimize tax legally!</p>
            <Link to="/learn/investing-wealth/taxation-investments-ltcg-stcg-equity-debt-gold-tax-guide-india" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
              Next Lesson: Investment Taxation
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectVsRegular;
