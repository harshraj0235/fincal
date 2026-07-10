import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, Layers, Lock, Users, Star, Sparkles, Clock, BadgeCheck,
  PieChart, Percent, Calculator, Building, Landmark, CreditCard,
  TrendingDown, Info, Download, Share2, FileText, Calendar, Home, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const RetirementPlanning: React.FC = () => {
  // Retirement Calculator State
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentMonthlyExpense, setCurrentMonthlyExpense] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(500000);

  // Calculations
  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  const inflationFactor = Math.pow(1 + inflation / 100, yearsToRetirement);
  const monthlyExpenseAtRetirement = currentMonthlyExpense * inflationFactor;
  const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12;
  
  // Using 4% withdrawal rule
  const corpusNeeded = annualExpenseAtRetirement / 0.04;
  
  // Future value of current savings
  const futureValueOfSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
  
  // Additional corpus needed
  const additionalCorpusNeeded = Math.max(0, corpusNeeded - futureValueOfSavings);
  
  // Monthly SIP needed
  const monthlyRate = expectedReturn / 12 / 100;
  const months = yearsToRetirement * 12;
  const monthlySIPNeeded = additionalCorpusNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

  const faqData = [
    {
      question: "How much corpus do I need to retire comfortably in India?",
      answer: "Use the 4% rule: Annual expense ÷ 4% = Corpus needed. Example: If you need ₹10L/year at retirement → Corpus = ₹10L ÷ 0.04 = ₹2.5 Crore. This ensures your money lasts for 25-30 years of retirement. Adjust for inflation!"
    },
    {
      question: "What is the 4% withdrawal rule?",
      answer: "Withdraw maximum 4% of your corpus in first year, then adjust for inflation. Example: ₹3 Cr corpus → Year 1: ₹12L (4%). Year 2: ₹12.72L (adjusted for 6% inflation). This ensures money lasts 25-30 years with 90%+ success rate."
    },
    {
      question: "How much should I save monthly for ₹3 Crore corpus?",
      answer: "Depends on age! Age 25 (35 years): ₹11,000/month @ 12% = ₹3.1 Cr. Age 30 (30 years): ₹15,000/month = ₹3.17 Cr. Age 35 (25 years): ₹23,000/month = ₹3.06 Cr. Age 40 (20 years): ₹36,000/month = ₹3.04 Cr. Start EARLY!"
    },
    {
      question: "Should I invest in equity after retirement?",
      answer: "YES! Don't go 100% debt. Maintain 40-50% equity even after 60 for inflation protection. Example: ₹3 Cr → ₹1.5 Cr debt (safety) + ₹1.5 Cr equity (growth). Equity beats inflation over 10-20 year retirement."
    },
    {
      question: "EPF vs PPF vs NPS vs Mutual Funds for retirement?",
      answer: "Use ALL! EPF: 8.25% (employer match - free money!). PPF: 7.1% tax-free (safety). NPS: 9-12% + ₹50K extra tax benefit. Equity MF: 12-15% (growth). Diversified portfolio = best retirement plan!"
    },
    {
      question: "Can I retire at 45 with ₹5 Crore (FIRE movement)?",
      answer: "Yes, if annual expense under ₹20L! FIRE = Financial Independence Retire Early. 4% rule: ₹5 Cr × 4% = ₹20L/year. But: Need aggressive saving (50-70% income), health insurance (₹10L+ cover), and 30-40 year corpus (not 20-25)."
    },
    {
      question: "How to plan for medical expenses in retirement?",
      answer: "3-step: (1) Health insurance ₹10L+ (family floater) + ₹25L super top-up, (2) Keep ₹10-15L emergency medical fund (liquid), (3) Factor ₹50K-1L/year medical inflation (10-12%). Medical costs double every 7-8 years!"
    },
    {
      question: "Should I buy a house or rent in retirement?",
      answer: "Own house = better! Avoid rent burden (₹20-30K/month = ₹2.4-3.6L/year). Buy before retirement or use 50% corpus to buy at 60. Paid house reduces retirement corpus need by ₹30-50L (20-25 year rent saved)."
    },
    {
      question: "What if I start retirement planning late (age 40-45)?",
      answer: "No problem, but need aggressive saving! Age 40 (20 years left): SIP ₹36,000/month @ 12% = ₹3 Cr. Age 45 (15 years): SIP ₹62,000/month = ₹3 Cr. Alternate: Work 5 more years (till 65) to reduce monthly SIP by 40%!"
    },
    {
      question: "How to calculate inflation-adjusted retirement corpus?",
      answer: "3 steps: (1) Current annual expense: ₹6L, (2) Inflation-adjusted (30 years @ 6%): ₹6L × 5.74 = ₹34.4L/year at retirement, (3) Corpus needed (4% rule): ₹34.4L ÷ 0.04 = ₹8.6 Crore! Don't ignore inflation!"
    },
    {
      question: "Can I depend only on EPF/PF for retirement?",
      answer: "NO! EPF gives apenas ₹50L-1 Cr for most people. Not enough for 25-year retirement. EPF + PPF + NPS + Equity MF = diversified retirement portfolio. Don't put all eggs in one basket!"
    },
    {
      question: "What is sequence of returns risk in retirement?",
      answer: "If market crashes in first 5 years of retirement, your corpus depletes faster! Solution: Keep 2-3 years expenses in debt (bucket strategy). Withdraw from debt in bear market, from equity in bull market. Don't sell equity at bottom!"
    },
    {
      question: "How much life insurance do I need for retirement planning?",
      answer: "Term insurance = Income replacement. Coverage = 10-15x annual income till retirement. Example: Age 30, ₹10L income → ₹1-1.5 Cr cover for 30 years. After retirement (60+), no income = no life insurance needed (unless debt/dependents)."
    },
    {
      question: "Should I take reverse mortgage in retirement?",
      answer: "Only if no other option! Reverse mortgage: Bank pays you monthly against your house. Good: Regular income. Bad: House goes to bank after death (kids get nothing). Better: Rent out part of house or downsize to smaller house + invest lump sum."
    },
    {
      question: "How to calculate post-retirement income sources?",
      answer: "Add all: (1) EPF maturity + monthly EPS pension, (2) PPF maturity, (3) NPS: 60% lumpsum + 40% annuity, (4) Rental income if any, (5) 4% withdrawal from equity/debt portfolio, (6) Senior citizen FD interest. Total = Monthly income at 60."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Retirement Planning 2025: Calculate ₹3 Crore Corpus by Age 60 | 4% Withdrawal Rule India | MoneyCal"
        description="Complete retirement planning guide for Indians: How much corpus needed, SIP strategy to reach ₹3 crore goal, 4% withdrawal rule explained, EPF/PPF/NPS/equity allocation, post-retirement investing, FIRE movement, early retirement at 45. Retire tension-free with inflation-adjusted calculations. Hindi + English"
        keywords="retirement planning India 2025, retirement corpus Calculator, 3 crore goal, 4% withdrawal rule, SIP retirement strategy, how much to retire India, FIRE movement India, early retirement 45, post retirement investing, सेवानिवृत्ति योजना"
        url="/learn/insurance-retirement/retirement-planning-india-corpus-calculation-60-years-goal"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Insurance & Retirement</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 4 of 7</span>
                <Link 
                  to="/learn/insurance-retirement"
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                  Lesson 4 • 55 Minutes • Intermediate
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Retirement Planning 2025
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Build ₹3 Crore Corpus by Age 60 - सेवानिवृत्ति योजना
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Master
              </h3>
              <ul className="space-y-2 text-orange-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>How much corpus you need to retire (inflation-adjusted calculation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>4% withdrawal rule: Make your money last 25-30 years</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>SIP strategy to reach ₹3 Crore goal (start at 25, 30, 35, 40)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Post-retirement investing: 40-50% equity even after 60!</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Retirement Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                🧮 Retirement Corpus Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Current Age */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Current Age</label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                {/* Retirement Age */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Retirement Age</label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                {/* Current Monthly Expense */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Current Monthly Expense (₹)</label>
                  <input
                    type="number"
                    value={currentMonthlyExpense}
                    onChange={(e) => setCurrentMonthlyExpense(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                {/* Current Savings */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Current Retirement Savings (₹)</label>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                {/* Inflation Rate */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Expected Inflation (%)</label>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    step="0.5"
                    value={inflation}
                    onChange={(e) => setInflation(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-xl font-bold mt-1">{inflation}%</div>
                </div>

                {/* Expected Return */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Expected Return (%)</label>
                  <input
                    type="range"
                    min="8"
                    max="15"
                    step="0.5"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-xl font-bold mt-1">{expectedReturn}%</div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">At Retirement (Age {retirementAge}):</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm opacity-90">Monthly Expense (Inflation-Adjusted)</div>
                      <div className="text-3xl font-bold">₹{monthlyExpenseAtRetirement.toLocaleString('en-IN', {maximumFractionDigits: 0})}</div>
                      <div className="text-sm opacity-75">Currently: ₹{currentMonthlyExpense.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Annual Expense</div>
                      <div className="text-3xl font-bold">₹{(annualExpenseAtRetirement / 100000).toFixed(1)}L</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500 rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Corpus Needed (4% Rule)</div>
                  <div className="text-5xl font-bold mb-2">₹{(corpusNeeded / 10000000).toFixed(2)} Cr</div>
                  <p className="text-sm opacity-90">This ensures money lasts {yearsInRetirement} years (till age {lifeExpectancy})</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-sm opacity-90">Current Savings Will Grow To</div>
                    <div className="text-3xl font-bold">₹{(futureValueOfSavings / 10000000).toFixed(2)} Cr</div>
                    <div className="text-sm opacity-75">From ₹{(currentSavings / 100000).toFixed(1)}L today</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-sm opacity-90">Additional Corpus Needed</div>
                    <div className="text-3xl font-bold">₹{(additionalCorpusNeeded / 10000000).toFixed(2)} Cr</div>
                  </div>
                </div>

                <div className="bg-yellow-400 text-gray-900 rounded-xl p-6 text-center">
                  <div className="text-sm font-semibold mb-1">Start SIP of</div>
                  <div className="text-5xl font-bold mb-2">₹{monthlySIPNeeded.toLocaleString('en-IN', {maximumFractionDigits: 0})}/month</div>
                  <p className="text-sm">For {yearsToRetirement} years @ {expectedReturn}% to reach your goal!</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* The 4% Withdrawal Rule */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Percent className="w-8 h-8 text-blue-600" />
                The 4% Withdrawal Rule Explained
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  The <strong>4% rule</strong> is the most popular retirement withdrawal strategy. It states: 
                  <strong> Withdraw 4% of your corpus in the first year, then adjust for inflation every year.</strong> 
                  This ensures your money lasts 25-30 years with 90%+ success rate (based on US data, works for India too!).
                </p>

                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Example: How 4% Rule Works</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <div>
                        <strong>Retirement Corpus:</strong> ₹3 Crore
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <div>
                        <strong>Year 1 Withdrawal:</strong> ₹3 Cr × 4% = ₹12 Lakh (₹1 Lakh/month)
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <div>
                        <strong>Year 2 Withdrawal:</strong> ₹12L × 1.06 (6% inflation) = ₹12.72 Lakh
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <div>
                        <strong>Year 3 Withdrawal:</strong> ₹12.72L × 1.06 = ₹13.48 Lakh
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                      <div>
                        <strong>Continue...</strong> Adjust for inflation every year till age 85-90!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-green-900 text-xl mb-3 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Why 4% Works:
                  </h3>
                  <ul className="space-y-2 text-green-900">
                    <li>✅ Your remaining corpus (₹2.88 Cr after year 1) continues to grow @ 8-10%</li>
                    <li>✅ Growth offsets withdrawals + inflation over 25-30 years</li>
                    <li>✅ Historical data: 90%+ success rate (corpus doesn't run out)</li>
                    <li>✅ Conservative: In good years, you may have surplus!</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-yellow-900">Important Adjustments for India:</strong>
                      <ul className="text-yellow-900 mt-2 space-y-1">
                        <li>• If market crashes in early retirement, reduce to 3% for 2-3 years</li>
                        <li>• Keep 2-3 years expenses in debt/liquid funds (bucket strategy)</li>
                        <li>• Maintain 40-50% equity even after 60 for inflation protection</li>
                        <li>• Review annually, adjust withdrawal if needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* SIP Strategy by Age */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                SIP Strategy to Reach ₹3 Crore
              </h2>

              <p className="text-gray-700 mb-6">
                The earlier you start, the less you need to invest monthly! Power of compounding ⚡
              </p>

              <div className="space-y-4">
                {[
                  { age: 25, years: 35, sip: 11000, total: 46.2, maturity: 31000 },
                  { age: 30, years: 30, sip: 15000, total: 54, maturity: 31700 },
                  { age: 35, years: 25, sip: 23000, total: 69, maturity: 30600 },
                  { age: 40, years: 20, sip: 36000, total: 86.4, maturity: 30400 },
                  { age: 45, years: 15, sip: 62000, total: 111.6, maturity: 30600 }
                ].map((item, i) => (
                  <div key={i} className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-xl">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <div className="text-sm text-gray-600">Start at Age</div>
                        <div className="text-3xl font-bold text-purple-700">{item.age}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Monthly SIP</div>
                        <div className="text-2xl font-bold text-gray-900">₹{item.sip.toLocaleString('en-IN')}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Total Invested</div>
                        <div className="text-xl font-bold text-blue-600">₹{item.total}L</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">At Age 60</div>
                        <div className="text-2xl font-bold text-green-600">₹{item.maturity / 100}Cr</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">@ 12% annual return for {item.years} years</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-red-100 border-2 border-red-300 rounded-xl p-6">
                <h3 className="font-bold text-red-900 text-lg mb-3">⚠️ Starting Late Costs You LAKHS!</h3>
                <ul className="space-y-2 text-red-900">
                  <li>• Age 25 → Total invested: ₹46.2L</li>
                  <li>• Age 35 → Total invested: ₹69L (₹23L more!)</li>
                  <li>• Age 45 → Total invested: ₹1.11 Cr (₹65L more than age 25!)</li>
                  <li><strong>Lesson: Start NOW, not tomorrow! Every 5 years delay = 50% higher investment</strong></li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Post-Retirement Investing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <PieChart className="w-8 h-8 text-green-600" />
                Post-Retirement Asset Allocation
              </h2>

              <p className="text-gray-700 mb-6">
                <strong>DON'T go 100% debt after retirement!</strong> You need equity to beat inflation over 20-25 years.
              </p>

              <div className="space-y-6">
                {/* Age 60-65 */}
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Age 60-65 (Early Retirement)</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Equity</div>
                      <div className="text-3xl font-bold text-red-600">50%</div>
                      <p className="text-xs text-gray-500">Index funds, large-cap MF</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Debt</div>
                      <div className="text-3xl font-bold text-blue-600">40%</div>
                      <p className="text-xs text-gray-500">FD, debt funds, bonds</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Liquid</div>
                      <div className="text-3xl font-bold text-teal-600">10%</div>
                      <p className="text-xs text-gray-500">Savings, liquid funds</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Still 25 years ahead! Keep equity for growth.</p>
                </div>

                {/* Age 65-75 */}
                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Age 65-75 (Mid Retirement)</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Equity</div>
                      <div className="text-3xl font-bold text-red-600">40%</div>
                      <p className="text-xs text-gray-500">Still need inflation protection</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Debt</div>
                      <div className="text-3xl font-bold text-blue-600">50%</div>
                      <p className="text-xs text-gray-500">Increase safety</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Liquid</div>
                      <div className="text-3xl font-bold text-teal-600">10%</div>
                      <p className="text-xs text-gray-500">Emergency buffer</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Reduce equity gradually, but don't eliminate!</p>
                </div>

                {/* Age 75+ */}
                <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-xl">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">Age 75+ (Late Retirement)</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Equity</div>
                      <div className="text-3xl font-bold text-red-600">30%</div>
                      <p className="text-xs text-gray-500">For legacy/heirs</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Debt</div>
                      <div className="text-3xl font-bold text-blue-600">60%</div>
                      <p className="text-xs text-gray-500">Maximum safety</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Liquid</div>
                      <div className="text-3xl font-bold text-teal-600">10%</div>
                      <p className="text-xs text-gray-500">Medical emergencies</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Focus on capital preservation.</p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold text-yellow-900 text-lg mb-3">💡 Bucket Strategy for Retirement:</h3>
                <div className="space-y-3 text-yellow-900">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <strong>Bucket 1 (2-3 years expenses):</strong> Liquid funds, savings. Withdraw monthly from here.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <strong>Bucket 2 (5-10 years):</strong> Debt funds, FDs. Medium-term money.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <strong>Bucket 3 (10+ years):</strong> Equity funds. Long-term growth to beat inflation.
                    </div>
                  </div>
                </div>
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
                  <p><strong>4% Rule:</strong> Annual expense ÷ 4% = Corpus needed. ₹10L/year → Need ₹2.5 Crore</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Start early:</strong> Age 25 → ₹11K/month. Age 45 → ₹62K/month for same ₹3 Cr goal!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Don't ignore inflation:</strong> ₹50K/month today = ₹2.87L/month in 30 years @ 6% inflation</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Post-retirement:</strong> Keep 40-50% equity even after 60 for inflation protection</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Diversify:</strong> EPF + PPF + NPS + Equity MF = Complete retirement portfolio</p>
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
                <Link to="/learn/insurance-retirement/nps-national-pension-system-tier-1-tier-2-tax-benefits-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Shield className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">NPS Guide</h3>
                  <p className="text-sm text-gray-600">₹50K extra tax deduction</p>
                </Link>
                <Link to="/learn/insurance-retirement/ppf-public-provident-fund-15-year-lock-in-tax-free-returns-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Landmark className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">PPF Guide</h3>
                  <p className="text-sm text-gray-600">7.1% tax-free returns</p>
                </Link>
                <Link to="/calculators/retirement-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <IndianRupee className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Retirement Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate your needs</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Course Complete */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-12 h-12" />
              <h3 className="text-3xl font-bold">🎉 Lesson Complete!</h3>
            </div>
            <p className="text-xl mb-6">You now know how to retire with ₹3 Crore! Time to learn about PPF.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/learn/insurance-retirement"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                Back to Hub
              </Link>
              <Link
                to="/learn/insurance-retirement/ppf-public-provident-fund-15-year-lock-in-tax-free-returns-india"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Next: PPF Guide
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RetirementPlanning;
