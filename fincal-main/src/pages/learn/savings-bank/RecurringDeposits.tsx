import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Repeat, TrendingUp, CheckCircle, Shield, 
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle,
  TrendingDown, Zap, Award, Clock, Users, BarChart3
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const RecurringDeposits: React.FC = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [years, setYears] = useState(5);
  const [rdRate, setRdRate] = useState(7);
  const [sipRate, setSipRate] = useState(12);

  // RD Calculation (Monthly Compound)
  const calculateRD = () => {
    const n = years * 12;
    const r = rdRate / 100 / 12;
    const maturity = monthlyAmount * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = monthlyAmount * n;
    const interest = maturity - invested;
    return { maturity: Math.round(maturity), invested, interest: Math.round(interest) };
  };

  // SIP Calculation
  const calculateSIP = () => {
    const n = years * 12;
    const r = sipRate / 100 / 12;
    const maturity = monthlyAmount * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = monthlyAmount * n;
    const returns = maturity - invested;
    return { maturity: Math.round(maturity), invested, returns: Math.round(returns) };
  };

  const rdResult = calculateRD();
  const sipResult = calculateSIP();

  const faqData = [
    {
      question: "Can I do both RD and SIP together?",
      answer: "Yes! Many people do 50-50 split. RD for safety (emergency fund, short-term goals) and SIP for long-term wealth building (retirement, children's education)."
    },
    {
      question: "Which is better for emergency fund - RD or SIP?",
      answer: "RD is better for emergency fund because: (1) Principal is 100% safe, (2) Guaranteed returns, (3) Can break anytime. SIP can fall 20-30% in crash, so not suitable for emergency money."
    },
    {
      question: "What happens if I miss an RD installment?",
      answer: "Penalty of ₹1-₹5 per ₹100 depending on bank. After 3-4 missed installments, RD account may be closed and money refunded at savings account interest (3%). Keep reminders!"
    },
    {
      question: "Can I increase my SIP amount mid-way?",
      answer: "Yes! You can start additional SIP in same fund. Or some platforms allow SIP top-up (5-10% increase annually). Cannot increase existing SIP amount directly."
    },
    {
      question: "RD vs FD - which gives higher returns?",
      answer: "FD gives slightly higher interest (0.25-0.50% more) because lump sum investment. But RD better for monthly savings. If you have lump sum, choose FD. If monthly savings, choose RD."
    },
    {
      question: "Is my money safe in SIP during market crash?",
      answer: "SIP can fall 30-40% in severe crash (like March 2020). BUT if you stay invested 5+ years, historically recovered and gave 12%+ returns. Never invest short-term money in SIP!"
    },
    {
      question: "Can NRIs invest in RD and SIP in India?",
      answer: "Yes! NRIs can open NRE/NRO RD in Indian banks. For SIP, can invest in Indian mutual funds. Returns repatriable. Check tax implications in your country of residence."
    },
    {
      question: "RD vs PPF - which is better for tax saving?",
      answer: "PPF better: 7.1% tax-free returns + Section 80C deduction. RD interest is fully taxable. But PPF has 15-year lock-in. For flexibility + tax saving, use tax-saver FD (5 years lock-in)."
    },
    {
      question: "What is the minimum and maximum amount for RD?",
      answer: "Minimum: ₹100/month (varies by bank). Maximum: No limit, but only ₹5 lakh per bank is insured by DICGC. If investing more, split across multiple banks for safety."
    },
    {
      question: "Can I take loan against RD?",
      answer: "Yes, 80-90% of RD value as loan at 1-2% above RD interest rate. Example: ₹1 lakh RD @ 7%, loan @ 8-9%. Useful for emergency without breaking RD."
    },
    {
      question: "SIP returns: 12% guaranteed or not?",
      answer: "NOT guaranteed! 12% is historical average over 10+ years. In any given year, can be -20% to +30%. That's why minimum 5-year horizon needed for SIP."
    },
    {
      question: "Can I stop RD or SIP mid-way?",
      answer: "RD: Can stop, money returned with interest till date minus penalty. SIP: Can stop anytime, no penalty. Already invested amount remains in fund, can redeem later."
    },
    {
      question: "RD interest is paid monthly or at maturity?",
      answer: "Quarterly credited but reinvested (compound interest). Full amount paid at maturity. Some banks offer monthly interest payout RDs for senior citizens."
    },
    {
      question: "Which mutual fund is best for SIP?",
      answer: "For beginners: Index funds (Nifty 50, Sensex) - low cost, diversified. For higher returns: Large-cap or flexi-cap funds. Check fund's 5-10 year track record before investing."
    },
    {
      question: "Can I withdraw money from SIP anytime?",
      answer: "Yes! Most equity funds allow redemption anytime. Money credited in 1-3 days. But if you withdraw before 1 year, pay 15% short-term capital gains tax. After 1 year, only 10% LTCG tax."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="RD vs SIP Complete Comparison 2025: Which is Better for Monthly Savings? | MoneyCal"
        description="Detailed RD vs SIP comparison in Hindi & English. Returns (7% vs 12%), taxation (income tax vs LTCG), liquidity, risk, calculation examples. Interactive calculator included. Best for short-term vs long-term goals India."
        keywords="RD vs SIP comparison, recurring deposit vs mutual fund, monthly savings India, RD returns, SIP calculator, RD or SIP which is better, आरडी बनाम एसआईपी, monthly investment options"
        url="/learn/savings-bank-products/recurring-deposit-rd-vs-sip-monthly-savings-comparison-india"
        faqData={faqData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Savings & Bank Products</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 3 of 9</span>
                <Link 
                  to="/learn/savings-bank-products/high-interest-savings-accounts-digital-banks-india-comparison"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Lesson 3 • 45 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  RD vs SIP: Complete Comparison
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  रेकरिंग डिपॉजिट बनाम एसआईपी - कौन बेहतर है मंथली सेविंग के लिए?
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
                  <span>Complete understanding of RD vs SIP (returns, risk, taxation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Interactive calculator to compare your monthly investment (₹5,000 example)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>When to choose RD vs SIP based on your goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Bank-wise RD interest rates comparison (SBI, HDFC, ICICI)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* What is RD */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Repeat className="w-8 h-8 text-blue-600" />
                What is Recurring Deposit (RD)?
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Recurring Deposit (RD)</strong> is a bank product where you save a <strong>fixed amount every month</strong> for a fixed period (6 months to 10 years) and earn <strong>guaranteed interest</strong> (currently 6.5-7.5% per annum).
                </p>
                
                <div className="bg-blue-50 p-6 rounded-xl my-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">📌 RD Key Features:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li><strong>Monthly Investment:</strong> ₹100 to unlimited (₹5,000 most common)</li>
                    <li><strong>Interest Rate:</strong> 6.5-7.5% (varies by bank, senior citizens get 0.5% extra)</li>
                    <li><strong>Tenure:</strong> 6 months to 10 years</li>
                    <li><strong>Safety:</strong> 100% principal safe + DICGC insured up to ₹5 lakh per bank</li>
                    <li><strong>Taxation:</strong> Interest is fully taxable as per your income tax slab</li>
                    <li><strong>Liquidity:</strong> Can break anytime with 1% penalty on interest</li>
                  </ul>
                </div>

                <p className="text-lg text-gray-700">
                  <strong>Example:</strong> You invest ₹5,000/month for 5 years in RD @ 7% interest. At maturity, you get <strong>₹3.57 lakh</strong> (₹3L invested + ₹57,000 interest).
                </p>
              </div>
            </div>
          </motion.section>

          {/* What is SIP */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                What is SIP (Systematic Investment Plan)?
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">
                  <strong>SIP (Systematic Investment Plan)</strong> is a method of investing a <strong>fixed amount every month</strong> in <strong>mutual funds</strong> (stock market). Returns are <strong>market-linked</strong> (historically 10-12% over 10+ years, but can be negative in short term).
                </p>
                
                <div className="bg-green-50 p-6 rounded-xl my-6">
                  <h3 className="text-xl font-bold text-green-900 mb-4">📌 SIP Key Features:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li><strong>Monthly Investment:</strong> ₹500 to unlimited</li>
                    <li><strong>Returns:</strong> 10-12% average over 10+ years (NOT guaranteed, can be -20% to +30% in any year)</li>
                    <li><strong>Tenure:</strong> Recommended minimum 5 years (no lock-in for regular funds)</li>
                    <li><strong>Safety:</strong> Market risk - can lose 20-30% in bear market</li>
                    <li><strong>Taxation:</strong> Long-term capital gains (LTCG) tax 10% after 1 year (much better than RD!)</li>
                    <li><strong>Liquidity:</strong> Can redeem anytime, money in 1-3 days</li>
                  </ul>
                </div>

                <p className="text-lg text-gray-700">
                  <strong>Example:</strong> You invest ₹5,000/month for 5 years in SIP @ 12% average returns. At maturity, you get <strong>₹4.12 lakh</strong> (₹3L invested + ₹1.12L returns). <span className="text-green-600 font-bold">55% more than RD!</span>
                </p>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mt-4">
                  <p className="text-yellow-900 flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span><strong>Warning:</strong> SIP can give negative returns in short term (1-3 years). Only invest if you can stay for 5+ years and handle 20-30% temporary falls.</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Interactive Comparison Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                🧮 Interactive RD vs SIP Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly Investment (₹)</label>
                  <input
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Investment Period (Years)</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">RD Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rdRate}
                    onChange={(e) => setRdRate(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">SIP Expected Return (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* RD Results */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Recurring Deposit (RD)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm opacity-90">Total Invested</div>
                      <div className="text-2xl font-bold">₹{(rdResult.invested / 100000).toFixed(2)}L</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Interest Earned</div>
                      <div className="text-2xl font-bold text-blue-300">₹{(rdResult.interest / 100000).toFixed(2)}L</div>
                    </div>
                    <div className="border-t border-white/30 pt-3">
                      <div className="text-sm opacity-90">Maturity Value</div>
                      <div className="text-3xl font-bold">₹{(rdResult.maturity / 100000).toFixed(2)}L</div>
                    </div>
                    <div className="text-sm opacity-75">
                      ✅ 100% Safe | Guaranteed Returns
                    </div>
                  </div>
                </div>

                {/* SIP Results */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    SIP (Mutual Fund)
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm opacity-90">Total Invested</div>
                      <div className="text-2xl font-bold">₹{(sipResult.invested / 100000).toFixed(2)}L</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Returns Earned</div>
                      <div className="text-2xl font-bold text-green-300">₹{(sipResult.returns / 100000).toFixed(2)}L</div>
                    </div>
                    <div className="border-t border-white/30 pt-3">
                      <div className="text-sm opacity-90">Expected Value</div>
                      <div className="text-3xl font-bold">₹{(sipResult.maturity / 100000).toFixed(2)}L</div>
                    </div>
                    <div className="text-sm opacity-75">
                      ⚠️ Market Risk | 5+ years recommended
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-lg p-4 font-bold text-center">
                💰 SIP Advantage: ₹{((sipResult.maturity - rdResult.maturity) / 100000).toFixed(2)}L more ({Math.round(((sipResult.maturity - rdResult.maturity) / rdResult.maturity) * 100)}% higher returns)
              </div>
            </div>
          </motion.section>

          {/* Detailed Comparison Table */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg overflow-x-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📊 Detailed Comparison Table</h2>
              
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 font-bold text-gray-900">Parameter</th>
                    <th className="p-4 font-bold text-blue-900">Recurring Deposit (RD)</th>
                    <th className="p-4 font-bold text-green-900">SIP (Mutual Fund)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Returns</td>
                    <td className="p-4">6.5-7.5% <span className="text-green-600">✅ Guaranteed</span></td>
                    <td className="p-4">10-12% average <span className="text-orange-600">⚠️ Not guaranteed</span></td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Risk</td>
                    <td className="p-4"><span className="text-green-600 font-bold">Zero risk</span> - Principal 100% safe</td>
                    <td className="p-4"><span className="text-red-600 font-bold">Market risk</span> - Can lose 20-30% temporarily</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Taxation</td>
                    <td className="p-4">Interest fully taxable at your slab (20-30%)</td>
                    <td className="p-4">LTCG 10% after 1 year <span className="text-green-600">✅ Better!</span></td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Liquidity</td>
                    <td className="p-4">Can break anytime, 1% penalty on interest</td>
                    <td className="p-4">Can redeem anytime, money in 1-3 days <span className="text-green-600">✅ Better!</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Minimum Investment</td>
                    <td className="p-4">₹100/month</td>
                    <td className="p-4">₹500/month</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Tenure</td>
                    <td className="p-4">6 months to 10 years (fixed)</td>
                    <td className="p-4">No lock-in, but 5+ years recommended</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-semibold">Insurance</td>
                    <td className="p-4">DICGC ₹5 lakh per bank</td>
                    <td className="p-4">No insurance (market-linked)</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-semibold">Best For</td>
                    <td className="p-4">Short-term goals (1-3 years), risk-averse</td>
                    <td className="p-4">Long-term goals (5+ years), wealth creation</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Tax Benefits</td>
                    <td className="p-4">Tax-saver FD under 80C (5-year lock-in)</td>
                    <td className="p-4">ELSS funds under 80C (3-year lock-in) <span className="text-green-600">✅ Better!</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Real Examples */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">💡 Real-Life Calculation Examples</h2>

              <div className="space-y-6">
                {/* Example 1 */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Example 1: ₹5,000/month for 5 years</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">RD @ 7%:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Total Invested: ₹3,00,000</li>
                        <li>• Interest Earned: ₹57,212</li>
                        <li className="font-bold text-lg">• Maturity: ₹3,57,212</li>
                        <li className="text-red-600">• Tax on interest (30% slab): -₹17,164</li>
                        <li className="font-bold text-green-600">• After-tax: ₹3,40,048</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 mb-2">SIP @ 12%:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Total Invested: ₹3,00,000</li>
                        <li>• Returns Earned: ₹1,12,432</li>
                        <li className="font-bold text-lg">• Expected Value: ₹4,12,432</li>
                        <li className="text-red-600">• LTCG tax (10%): -₹11,243</li>
                        <li className="font-bold text-green-600">• After-tax: ₹4,01,189</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 bg-yellow-100 p-4 rounded-lg text-center font-bold text-yellow-900">
                    SIP gives ₹61,141 more (18% higher) after taxes!
                  </div>
                </div>

                {/* Example 2 */}
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-green-900 mb-4">Example 2: ₹10,000/month for 10 years</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-blue-800 mb-2">RD @ 7%:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Total Invested: ₹12,00,000</li>
                        <li>• Interest Earned: ₹5,28,000</li>
                        <li className="font-bold text-lg">• Maturity: ₹17,28,000</li>
                        <li className="text-red-600">• Tax (30% slab): -₹1,58,400</li>
                        <li className="font-bold text-green-600">• After-tax: ₹15,69,600</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 mb-2">SIP @ 12%:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Total Invested: ₹12,00,000</li>
                        <li>• Returns Earned: ₹11,04,947</li>
                        <li className="font-bold text-lg">• Expected Value: ₹23,04,947</li>
                        <li className="text-red-600">• LTCG tax (10%): -₹1,10,495</li>
                        <li className="font-bold text-green-600">• After-tax: ₹21,94,452</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 bg-yellow-100 p-4 rounded-lg text-center font-bold text-yellow-900">
                    SIP gives ₹6,24,852 more (40% higher) after taxes! This is the power of long-term investing.
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* When to Choose What */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-3xl font-bold mb-6">🎯 When to Choose RD vs SIP - Decision Framework</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Choose RD if:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Your goal is <strong>less than 3 years</strong> away (e.g., car down payment, vacation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>You are <strong>risk-averse</strong> and can't handle 20-30% falls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>You want <strong>100% guaranteed</strong> returns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Building <strong>emergency fund</strong> (3-6 months expenses)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>You are a <strong>senior citizen</strong> needing regular income</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Choose SIP if:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>Your goal is <strong>5+ years</strong> away (retirement, children's education)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>You want <strong>wealth creation</strong> and can handle market ups/downs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>You want <strong>better tax efficiency</strong> (10% LTCG vs 30% slab)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>You want to <strong>beat inflation</strong> (12% returns vs 6% inflation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>You are <strong>young (20s-40s)</strong> with long investment horizon</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-yellow-900 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-2">💡 Pro Tip: Do BOTH!</h4>
                <p>Smart strategy: 50% in RD (safety net) + 50% in SIP (growth). Example: ₹10,000/month → ₹5,000 RD + ₹5,000 SIP. This balances safety and returns!</p>
              </div>
            </div>
          </motion.section>

          {/* Bank-wise RD Rates */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🏦 Bank-wise RD Interest Rates (2025)</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="p-4 font-bold text-gray-900">Bank</th>
                      <th className="p-4 font-bold text-gray-900">General Public</th>
                      <th className="p-4 font-bold text-gray-900">Senior Citizens</th>
                      <th className="p-4 font-bold text-gray-900">Best Tenure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">SBI (State Bank of India)</td>
                      <td className="p-4">6.50% - 7.00%</td>
                      <td className="p-4 text-green-600 font-bold">7.00% - 7.50%</td>
                      <td className="p-4">5 years</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">HDFC Bank</td>
                      <td className="p-4">6.75% - 7.25%</td>
                      <td className="p-4 text-green-600 font-bold">7.25% - 7.75%</td>
                      <td className="p-4">5 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">ICICI Bank</td>
                      <td className="p-4">6.70% - 7.20%</td>
                      <td className="p-4 text-green-600 font-bold">7.20% - 7.70%</td>
                      <td className="p-4">5 years</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="p-4 font-semibold">Axis Bank</td>
                      <td className="p-4">6.75% - 7.25%</td>
                      <td className="p-4 text-green-600 font-bold">7.25% - 7.75%</td>
                      <td className="p-4">5 years</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Kotak Mahindra Bank</td>
                      <td className="p-4">6.50% - 7.10%</td>
                      <td className="p-4 text-green-600 font-bold">7.00% - 7.60%</td>
                      <td className="p-4">3-5 years</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-semibold">Post Office (NSC RD)</td>
                      <td className="p-4 text-blue-600 font-bold">7.00% (Govt backed)</td>
                      <td className="p-4 text-green-600 font-bold">7.00%</td>
                      <td className="p-4">5 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Note:</strong> Interest rates change quarterly. Check your bank's website for latest rates. Senior citizens (60+ years) get 0.5% extra in most banks.
                </p>
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
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3 text-lg">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>RD:</strong> Safe, guaranteed 6.5-7.5% returns. Best for short-term goals (1-3 years) and emergency fund.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>SIP:</strong> Higher returns 10-12% average but risky. Best for long-term goals (5+ years) and wealth creation.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Taxation:</strong> RD interest fully taxable (20-30% slab). SIP: Only 10% LTCG tax after 1 year (much better!).</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Pro Strategy:</strong> Do both! 50% RD (safety) + 50% SIP (growth) = Balanced portfolio.</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Never mix:</strong> Don't use SIP for short-term goals. Don't use RD for long-term goals (lose to inflation).</p>
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
                <Link to="/calculators/rd-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Calculator className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">RD Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate RD maturity value</p>
                </Link>
                <Link to="/calculators/sip-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">SIP Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate SIP returns</p>
                </Link>
                <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <DollarSign className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Tax Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate tax on RD/SIP</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: High-Interest Savings Accounts (6-7%)</h3>
            <p className="mb-6 text-purple-100">Learn about digital banks offering 6-7% interest vs traditional 3%. Compare Jupiter, Fi, DBS Digibank safety & features!</p>
            <Link
              to="/learn/savings-bank-products/high-interest-savings-accounts-digital-banks-india-comparison"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: High-Interest Savings Accounts
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecurringDeposits;
