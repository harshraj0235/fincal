import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, Layers, Lock, Users, Star, Sparkles, Clock, BadgeCheck,
  PieChart, Percent, Calculator, Building, Landmark, CreditCard,
  TrendingDown, Info, Download, Share2, FileText, Calendar, XCircle, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const NPSGuide: React.FC = () => {
  // Interactive Calculator state
  const [age, setAge] = useState(30);
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [retirementAge] = useState(60);

  // Calculate returns
  const years = retirementAge - age;
  const months = years * 12;
  const monthlyRate = expectedReturn / 12 / 100;
  const totalInvested = monthlyInvestment * months;
  const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const maturityAmount = futureValue;
  const lumpsum60Percent = maturityAmount * 0.6;
  const annuity40Percent = maturityAmount * 0.4;
  const monthlyPension = (annuity40Percent * 0.06) / 12; // Assuming 6% annuity rate

  // Tax savings
  const taxSavings = 50000 * 0.3; // ₹50K in 30% bracket

  const faqData = [
    {
      question: "What is NPS and how does it work?",
      answer: "NPS (National Pension System) is a government-backed retirement savings scheme. You invest regularly till age 60. Money is invested in equity (E), corporate bonds (C), and government bonds (G) based on your choice. At 60, you get 60% lumpsum + 40% goes to annuity (monthly pension for life). Best part: Extra ₹50,000 tax deduction under 80CCD(1B)!"
    },
    {
      question: "What is the difference between NPS Tier 1 and Tier 2?",
      answer: "Tier 1: Lock-in till 60 (retirement account). Cannot withdraw before 60 except emergencies. Gets tax benefit under 80CCD(1B). Tier 2: Like mutual fund - withdraw anytime, no lock-in. No tax benefits. Use Tier 1 for retirement, Tier 2 for liquid savings."
    },
    {
      question: "How much tax can I save with NPS?",
      answer: "3 tax benefits: (1) Up to ₹1.5L under 80C (same as PPF, ELSS), (2) EXTRA ₹50,000 under 80CCD(1B) over and above 80C!, (3) Employer contribution up to ₹7.5L under 80CCD(2). In 30% bracket, ₹50K 80CCD(1B) = ₹15,600 tax savings yearly!"
    },
    {
      question: "What are E, C, and G asset classes in NPS?",
      answer: "E = Equity (stocks, up to 75% allocation). Highest risk, highest returns (10-12%). C = Corporate bonds (company debt). Medium risk, 7-9% returns. G = Government bonds (safest). Lowest risk, 6-8% returns. Young investors: 75% E + 15% C + 10% G. Near retirement: 50% E + 25% C + 25% G."
    },
    {
      question: "Can I withdraw NPS before 60?",
      answer: "No! Tier 1 has strict lock-in till 60. Only 3 exceptions: (1) Serious illness (25% withdrawal), (2) Child education/marriage (25% withdrawal after 3 years), (3) Home loan (25% withdrawal). Otherwise, money stays locked till 60."
    },
    {
      question: "What happens at retirement (age 60)?",
      answer: "At 60: 60% of corpus you get as lumpsum (tax-free under ₹5L!). 40% MUST buy annuity (monthly pension for life - 6% rate = ₹20,000/month on ₹40L annuity). You can defer withdrawal till 70 if still working. Annuity is taxable as income."
    },
    {
      question: "How to open NPS account online?",
      answer: "3 steps: (1) Go to enps.nsdl.com or CRA website. (2) Click 'Register' → Enter Aadhaar, PAN, bank details. (3) Choose fund manager (SBI, HDFC, ICICI, etc) + asset allocation (E, C, G). Done! You get PRAN (Permanent Retirement Account Number). Takes 10 minutes!"
    },
    {
      question: "Which is better: NPS or PPF?",
      answer: "PPF: 7.1% guaranteed, 15-year lock-in, 100% tax-free. NPS: 9-12% (market-linked), lock-in till 60, extra ₹50K tax benefit. Best strategy: Do BOTH! ₹1.5L in PPF (80C) + ₹50K in NPS (80CCD 1B) = Total ₹2L tax-saving investment. PPF for safety, NPS for growth!"
    },
    {
      question: "Can I change asset allocation in NPS?",
      answer: "Yes! You can change allocation twice a year for free. Example: At 30, keep 75% E. At 50, reduce to 50% E (lower risk as retirement nears). Active choice vs Auto choice: Active = You decide E/C/G. Auto = Age-based (auto reduces equity as you age)."
    },
    {
      question: "What if I change jobs? Can I continue NPS?",
      answer: "Yes! NPS is portable - your PRAN stays same across jobs. Just inform new employer of your PRAN for continuation. If new employer doesn't offer NPS, you can continue yourself via All Citizens' NPS (contribute ₹500-10,000/month)."
    },
    {
      question: "Is NPS safe? What if fund manager fails?",
      answer: "100% safe! (1) Government-regulated by PFRDA. (2) Your money held by Custodian (separate from fund manager). (3) Even if fund manager shuts, your corpus safe. (4) Can change fund manager anytime. (5) 10+ fund managers to choose from (SBI, HDFC, ICICI, LIC, UTI)."
    },
    {
      question: "Should I invest in NPS if I already have EPF?",
      answer: "YES! EPF and NPS are complementary. EPF: 8.25% safe returns (employer contribution). NPS: 10-12% higher growth + EXTRA ₹50K tax benefit. Do both for diversified retirement portfolio. EPF for safety, NPS for growth!"
    },
    {
      question: "Can NRIs invest in NPS?",
      answer: "Yes! NRIs can open and continue NPS. But: (1) No repatriation (money stays in India), (2) Annuity payable in India only, (3) Cannot open new NPS after becoming NRI (must open while resident). Best for NRIs planning to return to India for retirement."
    },
    {
      question: "What are NPS charges and fees?",
      answer: "Very low! (1) Fund management: 0.01-0.09% (cheapest in India!), (2) Account maintenance: ₹67/year, (3) Transaction charge: ₹1.5 per transaction. Example: On ₹10L corpus, fees apenas ₹900/year (0.09%). Compare: Mutual funds charge 1-2%!"
    },
    {
      question: "Can I have multiple NPS accounts?",
      answer: "No! One person = One PRAN number only. But you can have both Tier 1 and Tier 2 under same PRAN. And you can invest in multiple fund managers under same PRAN (but not recommended - stick to one for simplicity)."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="NPS Complete Guide 2025: Tier 1 vs Tier 2, ₹50K Tax Benefit (80CCD 1B), Returns 10-12% | MoneyCal"
        description="Complete NPS (National Pension System) guide: Tier 1 vs Tier 2, asset allocation (E, C, G), extra ₹50,000 tax deduction under 80CCD(1B), withdrawal rules at 60, how to open account online. Retirement planning for Indians with ₹3 crore corpus calculation. Hindi + English"
        keywords="NPS India 2025, national pension system, tier 1 tier 2 difference, 80CCD 1B tax benefit, NPS asset allocation, E C G funds, NPS vs PPF, PRAN account, NPS Calculator, retirement planning India, NPS गाइड"
        url="/learn/insurance-retirement/nps-national-pension-system-tier-1-tier-2-tax-benefits-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Insurance & Retirement</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 3 of 7</span>
                <Link 
                  to="/learn/insurance-retirement"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <span className="hidden sm:inline">Back to Hub</span>
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Lesson 3 • 50 Minutes • Intermediate
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  NPS Complete Guide 2025
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Tier 1 vs Tier 2, ₹50K Extra Tax Benefit - NPS गाइड
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Master
              </h3>
              <ul className="space-y-2 text-purple-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>NPS basics: How it works, Tier 1 vs Tier 2, PRAN account</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Extra ₹50,000 tax deduction under 80CCD(1B) - Save ₹15,600/year!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Asset allocation: E (equity), C (corporate bonds), G (government bonds)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Withdrawal rules at 60: 60% lumpsum + 40% annuity explained</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* NPS Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                🧮 NPS Retirement Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Current Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                {/* Monthly Investment */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly Investment (₹)</label>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                {/* Expected Return */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Expected Return Rate (%)</label>
                  <input
                    type="range"
                    min="6"
                    max="14"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-1">
                    <span>6% (Conservative)</span>
                    <span className="font-bold text-xl">{expectedReturn}%</span>
                    <span>14% (Aggressive)</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Total Invested</div>
                  <div className="text-3xl font-bold">₹{(totalInvested / 100000).toFixed(1)}L</div>
                  <div className="text-sm opacity-75">{years} years × ₹{monthlyInvestment.toLocaleString('en-IN')}/month</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">At Age 60 (Total)</div>
                  <div className="text-3xl font-bold">₹{(maturityAmount / 100000).toFixed(1)}L</div>
                  <div className="text-sm opacity-75">@ {expectedReturn}% annual return</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Wealth Gain</div>
                  <div className="text-3xl font-bold text-green-300">₹{((maturityAmount - totalInvested) / 100000).toFixed(1)}L</div>
                  <div className="text-sm opacity-75">{((maturityAmount / totalInvested - 1) * 100).toFixed(0)}% growth</div>
                </div>
              </div>

              {/* Withdrawal Breakdown */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <h3 className="text-xl font-bold mb-4">At Retirement (Age 60):</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">60% Lumpsum</span>
                    </div>
                    <div className="text-3xl font-bold">₹{(lumpsum60Percent / 100000).toFixed(1)}L</div>
                    <p className="text-sm opacity-90 mt-2">You receive this amount immediately (tax-free up to ₹5L!)</p>
                  </div>

                  <div className="bg-blue-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">40% Annuity</span>
                    </div>
                    <div className="text-3xl font-bold">₹{(annuity40Percent / 100000).toFixed(1)}L</div>
                    <p className="text-sm opacity-90 mt-2">Buy annuity → ₹{monthlyPension.toLocaleString('en-IN')}/month pension for life</p>
                  </div>
                </div>
              </div>

              {/* Tax Savings */}
              <div className="mt-6 bg-yellow-500/20 rounded-xl p-4 text-center">
                <div className="text-sm opacity-90">Annual Tax Savings (80CCD 1B)</div>
                <div className="text-4xl font-bold text-yellow-300">₹{taxSavings.toLocaleString('en-IN')}/year</div>
                <p className="text-sm opacity-90 mt-1">Extra ₹50,000 deduction × 30% tax bracket</p>
              </div>
            </div>
          </motion.section>

          {/* What is NPS */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Info className="w-8 h-8 text-purple-600" />
                What is NPS? (National Pension System)
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>NPS (National Pension System)</strong> is a government-sponsored <strong>retirement savings scheme</strong> launched in 2004. 
                  Think of it as a long-term piggy bank for your golden years! You invest regularly (till age 60), and the government helps you grow that money in <strong>stock markets + bonds</strong>. 
                  At retirement, you get a big lump sum + monthly pension for life!
                </p>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">🎯 Key Highlights:</h3>
                  <ul className="space-y-2 text-purple-900">
                    <li>✅ <strong>Lock-in till 60:</strong> Cannot withdraw before retirement (except emergencies)</li>
                    <li>✅ <strong>Returns:</strong> 9-12% historically (market-linked, better than PPF's 7.1%!)</li>
                    <li>✅ <strong>Tax benefit:</strong> Extra ₹50,000 deduction under 80CCD(1B) over and above ₹1.5L of 80C</li>
                    <li>✅ <strong>Portable:</strong> Your PRAN (account) follows you across jobs, cities, even states!</li>
                    <li>✅ <strong>Low cost:</strong> Fund management fees apenas 0.01-0.09% (cheapest in India!)</li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">How NPS Works (Simple Flowchart):</h3>
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-bold text-gray-900">Open NPS Account (Get PRAN)</h4>
                        <p className="text-sm text-gray-600">Online via enps.nsdl.com or offline via bank. Choose fund manager (SBI, HDFC, ICICI).</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-bold text-gray-900">Invest Regularly (₹500-10,000/month)</h4>
                        <p className="text-sm text-gray-600">Money invested in E (equity), C (corporate bonds), G (government bonds) as per your choice.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-bold text-gray-900">Corpus Grows Till Age 60</h4>
                        <p className="text-sm text-gray-600">Your ₹10K/month for 30 years @ 10% = ₹2.27 crore at retirement!</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">4</div>
                      <div>
                        <h4 className="font-bold text-gray-900">At 60: Get 60% Lumpsum + 40% Annuity</h4>
                        <p className="text-sm text-gray-600">₹2.27Cr → ₹1.36Cr lumpsum + ₹91L annuity (₹45,000/month pension for life).</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-yellow-900">Important:</strong>
                      <p className="text-yellow-900 mt-2">
                        NPS is <strong>NOT</strong> a get-rich-quick scheme. It's a disciplined, long-term retirement savings plan. 
                        Don't expect to withdraw in 5-10 years. Lock-in till 60! If you need liquidity, use Tier 2 or don't invest in NPS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Tier 1 vs Tier 2 Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Layers className="w-8 h-8 text-blue-600" />
                Tier 1 vs Tier 2: Complete Comparison
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 font-bold text-gray-900">Feature</th>
                      <th className="px-4 py-3 font-bold text-green-700">Tier 1 (Retirement)</th>
                      <th className="px-4 py-3 font-bold text-orange-700">Tier 2 (Investment)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { 
                        feature: 'Purpose', 
                        tier1: 'Retirement savings (lock-in till 60)', 
                        tier2: 'Investment savings (withdraw anytime)'
                      },
                      { 
                        feature: 'Lock-in Period', 
                        tier1: 'Till age 60 (cannot withdraw!)', 
                        tier2: 'Zero lock-in (like mutual fund)'
                      },
                      { 
                        feature: 'Tax Benefits', 
                        tier1: '✅ ₹1.5L (80C) + ₹50K (80CCD 1B)', 
                        tier2: '❌ No tax benefits'
                      },
                      { 
                        feature: 'Minimum Annual Investment', 
                        tier1: '₹1,000/year', 
                        tier2: 'No minimum'
                      },
                      { 
                        feature: 'Early Withdrawal', 
                        tier1: 'Only for emergencies (25% of corpus)', 
                        tier2: 'Anytime, no restrictions'
                      },
                      { 
                        feature: 'At Maturity (60)', 
                        tier1: '60% lumpsum + 40% annuity', 
                        tier2: '100% withdrawal allowed'
                      },
                      { 
                        feature: 'Who Should Use', 
                        tier1: 'Everyone for retirement planning', 
                        tier2: 'If you want liquidity + no tax benefit'
                      },
                      { 
                        feature: 'Best For', 
                        tier1: 'Salaried, self-employed, age 18-60', 
                        tier2: 'High income, need investment options'
                      }
                    ].map((row, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50">
                        <td className="px-4 py-3 font-semibold">{row.feature}</td>
                        <td className="px-4 py-3 text-green-700">{row.tier1}</td>
                        <td className="px-4 py-3 text-orange-700">{row.tier2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-green-900 text-lg mb-3 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Recommended Strategy:
                </h3>
                <ul className="space-y-2 text-green-900">
                  <li>✅ <strong>Open Tier 1:</strong> For retirement + tax benefits (₹50K extra deduction)</li>
                  <li>✅ <strong>Open Tier 2 (optional):</strong> If you want NPS-style investment without lock-in</li>
                  <li>✅ <strong>Focus on Tier 1:</strong> 90% of people only need Tier 1. Tier 2 is for specific use cases.</li>
                  <li>✅ <strong>Don't open Tier 2 just because:</strong> Mutual funds give same flexibility + better returns!</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Asset Allocation (E, C, G) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <PieChart className="w-8 h-8 text-green-600" />
                Asset Allocation: E, C, G Funds Explained
              </h2>

              <p className="text-gray-700 mb-6">
                Your NPS money is invested in 3 types of funds. YOU choose the allocation!
              </p>

              {/* E Fund */}
              <div className="mb-6 border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold text-red-700 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  E = Equity (Stocks)
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• <strong>What:</strong> Your money invested in Indian stock market (Nifty 50, Sensex stocks)</li>
                  <li>• <strong>Returns:</strong> 10-14% historically (highest among E, C, G)</li>
                  <li>• <strong>Risk:</strong> High volatility (can fall 20-30% in bad years, but recovers!)</li>
                  <li>• <strong>Limit:</strong> Maximum 75% of your NPS corpus can be in E</li>
                  <li>• <strong>Best for:</strong> Young investors (age 20-40) who have 20-30 years till retirement</li>
                </ul>
              </div>

              {/* C Fund */}
              <div className="mb-6 border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                  <Building className="w-6 h-6" />
                  C = Corporate Bonds
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• <strong>What:</strong> Debt (bonds) issued by companies (HDFC, Reliance, TCS, etc)</li>
                  <li>• <strong>Returns:</strong> 7-9% (better than G, lower than E)</li>
                  <li>• <strong>Risk:</strong> Medium (if company defaults, you lose money, but NPS invests in AAA bonds)</li>
                  <li>• <strong>Limit:</strong> No limit (can be 0-100%)</li>
                  <li>• <strong>Best for:</strong> Balanced investors (age 40-50) who want moderate risk</li>
                </ul>
              </div>

              {/* G Fund */}
              <div className="mb-6 border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  G = Government Securities
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• <strong>What:</strong> Bonds issued by Indian Government (safest option)</li>
                  <li>• <strong>Returns:</strong> 6-8% (lowest among E, C, G, but guaranteed!)</li>
                  <li>• <strong>Risk:</strong> Zero default risk (government will never default)</li>
                  <li>• <strong>Limit:</strong> No limit (can be 0-100%)</li>
                  <li>• <strong>Best for:</strong> Conservative investors (age 50-60) nearing retirement</li>
                </ul>
              </div>

              {/* Recommended Allocation by Age */}
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Allocation by Age:</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div>
                      <strong className="text-gray-900">Age 20-35:</strong>
                      <p className="text-sm text-gray-600">Maximum growth phase</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-red-600">75% E</span> + <span className="font-bold text-blue-600">15% C</span> + <span className="font-bold text-green-600">10% G</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div>
                      <strong className="text-gray-900">Age 35-45:</strong>
                      <p className="text-sm text-gray-600">Balanced growth</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-red-600">65% E</span> + <span className="font-bold text-blue-600">20% C</span> + <span className="font-bold text-green-600">15% G</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div>
                      <strong className="text-gray-900">Age 45-55:</strong>
                      <p className="text-sm text-gray-600">Reducing risk</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-red-600">50% E</span> + <span className="font-bold text-blue-600">25% C</span> + <span className="font-bold text-green-600">25% G</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg p-4">
                    <div>
                      <strong className="text-gray-900">Age 55-60:</strong>
                      <p className="text-sm text-gray-600">Capital protection</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-red-600">30% E</span> + <span className="font-bold text-blue-600">30% C</span> + <span className="font-bold text-green-600">40% G</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Tax Benefits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                🎁 Triple Tax Benefits in NPS
              </h2>

              <div className="space-y-4">
                {/* Benefit 1 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-3">1️⃣ Section 80C: Up to ₹1.5 Lakh</h3>
                  <p className="mb-2">Same as PPF, ELSS, life insurance - NPS investment up to ₹1.5L gets 80C deduction.</p>
                  <div className="bg-white/30 rounded-lg p-3">
                    <strong>Tax Savings:</strong> ₹1.5L × 30% = ₹46,500/year in 30% bracket
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-3">2️⃣ Section 80CCD(1B): EXTRA ₹50,000! 🎉</h3>
                  <p className="mb-2">This is THE UNIQUE BENEFIT of NPS! Over and above ₹1.5L of 80C, you get EXTRA ₹50K deduction!</p>
                  <div className="bg-green-500 rounded-lg p-3">
                    <strong>Extra Tax Savings:</strong> ₹50,000 × 30% = ₹15,600/year!
                  </div>
                  <p className="text-sm mt-2 opacity-90">Total investment: ₹1.5L (80C) + ₹50K (80CCD 1B) = ₹2 Lakh/year tax-saving!</p>
                </div>

                {/* Benefit 3 */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-3">3️⃣ Section 80CCD(2): Employer Contribution</h3>
                  <p className="mb-2">If your employer contributes to your NPS, up to 10% of basic salary (max ₹7.5L) is tax-free!</p>
                  <div className="bg-white/30 rounded-lg p-3">
                    <strong>Example:</strong> Employer contributes ₹1L → You save ₹30,000 tax (30% bracket)
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white rounded-xl p-6 text-gray-900">
                <h3 className="font-bold text-xl mb-3">💰 Total Tax Savings Example:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Self contribution (80C): ₹1.5L</span>
                    <span className="font-bold text-green-600">Save ₹46,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Self contribution (80CCD 1B): ₹50K</span>
                    <span className="font-bold text-green-600">Save ₹15,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Employer contribution (80CCD 2): ₹1L</span>
                    <span className="font-bold text-green-600">Save ₹31,200</span>
                  </div>
                  <div className="border-t-2 border-gray-300 pt-2 flex justify-between text-xl">
                    <strong>Total Annual Tax Savings:</strong>
                    <strong className="text-green-600">₹93,300!</strong>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* How to Open NPS */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-purple-600" />
                How to Open NPS Account (Step-by-Step)
              </h2>

              <div className="space-y-6">
                {/* Method 1: Online */}
                <div>
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">Method 1: Online (Recommended - Takes 10 Minutes!)</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">Visit eNPS Portal</h4>
                        <p className="text-gray-700">Go to <a href="https://enps.nsdl.com" className="text-purple-600 underline" target="_blank" rel="noopener noreferrer">enps.nsdl.com</a> or <a href="https://cra-nsdl.com" className="text-purple-600 underline" target="_blank" rel="noopener noreferrer">cra-nsdl.com</a></p>
                        <p className="text-sm text-gray-600">Click on "National Pension System" → "Register"</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">Enter Details</h4>
                        <p className="text-gray-700">Required documents:</p>
                        <ul className="text-sm text-gray-600 ml-4 space-y-1">
                          <li>• Aadhaar Card (for eKYC)</li>
                          <li>• PAN Card</li>
                          <li>• Bank Account Details (account number, IFSC)</li>
                          <li>• Mobile number + Email</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">Choose Options</h4>
                        <ul className="text-gray-700 space-y-2">
                          <li>• <strong>Tier:</strong> Select Tier 1 (mandatory for tax benefits). Tier 2 optional.</li>
                          <li>• <strong>Fund Manager:</strong> Choose from SBI, HDFC, ICICI, LIC, UTI, Kotak, Axis (all are good!)</li>
                          <li>• <strong>Asset Allocation:</strong> Choose Active (you decide E/C/G) or Auto (age-based)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">Get PRAN & Start Investing</h4>
                        <p className="text-gray-700">You'll receive PRAN (12-digit Permanent Retirement Account Number) via email + SMS.</p>
                        <p className="text-sm text-gray-600">Make first contribution (min ₹500) to activate account.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Method 2: Offline */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Method 2: Offline (Via Bank/Post Office)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Visit any bank branch (SBI, HDFC, ICICI, Axis, etc) or Post Office</li>
                    <li>• Ask for "NPS account opening form"</li>
                    <li>• Submit form + KYC documents (Aadhaar, PAN, photo)</li>
                    <li>• Bank will process & send PRAN within 7-10 days</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Withdrawal Rules */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-red-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Lock className="w-8 h-8 text-red-600" />
                Withdrawal Rules: When Can You Take Money Out?
              </h2>

              {/* At Retirement (60) */}
              <div className="mb-6 border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold text-green-700 mb-3">At Age 60 (Normal Retirement)</h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• <strong>60% Lumpsum:</strong> You get 60% of total corpus immediately (tax-free up to ₹5L!)</li>
                  <li>• <strong>40% Annuity:</strong> MUST use 40% to buy annuity (monthly pension for life)</li>
                  <li>• <strong>Deferral:</strong> Can defer withdrawal till age 70 if still working</li>
                  <li>• <strong>Example:</strong> ₹1 Cr corpus → ₹60L lumpsum + ₹40L annuity (₹20,000/month pension @ 6% rate)</li>
                </ul>
              </div>

              {/* Before 60 - Partial Withdrawal */}
              <div className="mb-6 border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold text-yellow-700 mb-3">Before Age 60 (Partial Withdrawal - Only 3 Cases!)</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">1. Child's Education or Marriage</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Can withdraw 25% of YOUR contribution (not employer's)</li>
                      <li>• Only after 3 years of account opening</li>
                      <li>• Maximum 3 times during NPS tenure</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">2. Purchase/Construction of House</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Can withdraw 25% of YOUR contribution</li>
                      <li>• Only once during NPS tenure</li>
                      <li>• Must be for self-occupied house, not investment property</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">3. Serious Illness/Medical Emergency</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Can withdraw 25% for self, spouse, parents, children</li>
                      <li>• Need medical certificate from hospital</li>
                      <li>• Maximum 3 times</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Exit Before 60 */}
              <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  Premature Exit (Before 60 - NOT Recommended!)
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• Can exit only after 10 years of account opening</li>
                  <li>• 80% of corpus MUST go to annuity (only 20% lumpsum!)</li>
                  <li>• Penalty: Lose liquidity + get lower lumpsum</li>
                  <li>• <strong>Better:</strong> Use Tier 2 for liquid money, keep Tier 1 locked till 60!</li>
                </ul>
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
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>NPS = Best for retirement:</strong> Lock-in till 60, 9-12% returns, extra ₹50K tax benefit</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Tier 1 vs Tier 2:</strong> Tier 1 for retirement (tax benefit), Tier 2 for liquidity (no lock-in)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Asset allocation:</strong> 75% E (young), reduce to 30% E (near retirement)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Tax savings:</strong> ₹1.5L (80C) + ₹50K (80CCD 1B) = Total ₹2L tax-saving investment!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>At 60:</strong> 60% lumpsum (tax-free up to ₹5L) + 40% annuity (monthly pension for life)</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Related Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔗 Related Lessons & Tools</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/learn/insurance-retirement/retirement-planning-india-corpus-calculation-60-years-goal" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Clock className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Retirement Planning</h3>
                  <p className="text-sm text-gray-600">₹3 Crore corpus by 60</p>
                </Link>
                <Link to="/learn/insurance-retirement/ppf-public-provident-fund-15-year-lock-in-tax-free-returns-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Landmark className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">PPF Guide</h3>
                  <p className="text-sm text-gray-600">7.1% tax-free returns</p>
                </Link>
                <Link to="/calculators/nps-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <IndianRupee className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">NPS Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate returns</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Course Complete */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-12 h-12" />
              <h3 className="text-3xl font-bold">🎉 Lesson Complete!</h3>
            </div>
            <p className="text-xl mb-6">You've mastered NPS! Ready to build your ₹3 Crore retirement corpus?</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/learn/insurance-retirement"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                Back to Hub
              </Link>
              <Link
                to="/learn/insurance-retirement/retirement-planning-india-corpus-calculation-60-years-goal"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Next: Retirement Planning
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NPSGuide;
