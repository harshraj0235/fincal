import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, calculatePPF } from '../utils/calculatorUtils';
import { 
  Sliders, Calculator, LineChart, Info, ExternalLink, TrendingUp, PiggyBank, 
  DollarSign, Calendar, Percent, Award, Download, Share2, BookOpen, 
  CheckCircle2, AlertCircle, ArrowRight, Sparkles, Target, Shield, 
  Clock, TrendingDown, RefreshCw, FileText, ChevronDown, ChevronUp
} from 'lucide-react';
import { ResultChart } from '../components/ResultChart';
import { BarChart } from '../components/BarChart';
import WhyChooseUs from '../components/WhyChooseUs';

export const PpfCalculator: React.FC = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [timePeriod, setTimePeriod] = useState<number>(15);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [maturityValue, setMaturityValue] = useState<number>(0);
  const [yearlyBreakup, setYearlyBreakup] = useState<Array<{year: number; investment: number; interest: number; balance: number}>>([]);
  
  // Advanced features
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [showTaxBenefits, setShowTaxBenefits] = useState<boolean>(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'calculator' | 'guide' | 'comparison'>('calculator');
  
  // Manual input states
  const [manualYearlyInvestment, setManualYearlyInvestment] = useState<string>(yearlyInvestment.toString());
  const [manualInterestRate, setManualInterestRate] = useState<string>(interestRate.toString());
  const [manualTimePeriod, setManualTimePeriod] = useState<string>(timePeriod.toString());
  
  useEffect(() => {
    const result = calculatePPF(yearlyInvestment, interestRate, timePeriod);
    setTotalInvestment(result.totalInvestment);
    setTotalInterest(result.totalInterest);
    setMaturityValue(result.maturityValue);
    setYearlyBreakup(result.yearlyBreakup);
  }, [yearlyInvestment, interestRate, timePeriod]);
  
  // Update slider values when manual inputs change
  const handleManualYearlyInvestmentChange = (value: string) => {
    setManualYearlyInvestment(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 500 && numValue <= 150000) {
      setYearlyInvestment(numValue);
    }
  };
  
  const handleManualInterestRateChange = (value: string) => {
    setManualInterestRate(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 5 && numValue <= 10) {
      setInterestRate(numValue);
    }
  };
  
  const handleManualTimePeriodChange = (value: string) => {
    setManualTimePeriod(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 15 && numValue <= 50) {
      setTimePeriod(numValue);
    }
  };
  
  // Update manual input values when sliders change
  useEffect(() => {
    setManualYearlyInvestment(yearlyInvestment.toString());
    setManualInterestRate(interestRate.toString());
    setManualTimePeriod(timePeriod.toString());
  }, [yearlyInvestment, interestRate, timePeriod]);

  // Calculate tax savings
  const taxSavings = Math.min(yearlyInvestment, 150000) * 0.3; // 30% tax bracket

  // Quick preset buttons
  const presetAmounts = [50000, 100000, 150000];
  
  const handleDownloadReport = () => {
    alert('Download feature - Generate PDF report with all calculations and breakup');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'PPF Calculator Results',
        text: `My PPF investment of ${formatCurrency(yearlyInvestment)} will grow to ${formatCurrency(maturityValue)} in ${timePeriod} years!`,
        url: window.location.href
      });
    }
  };

  const faqs = [
    {
      question: "How to calculate PPF interest for 2025-2026?",
      answer: "PPF interest is calculated monthly on the minimum balance between the 5th and last day of each month, compounded annually. Current rate is 7.1% p.a. (updated quarterly by the Government). Use our calculator for instant results with year-wise breakup.",
      keywords: "PPF interest calculation 2025, PPF monthly interest, PPF compounding frequency"
    },
    {
      question: "What is the minimum and maximum PPF investment per year?",
      answer: "Minimum: ₹500 per financial year (April to March). Maximum: ₹1,50,000 per year. You can invest in a lump sum or up to 12 installments. Investing ₹1.5 lakh maximizes your Section 80C tax deduction.",
      keywords: "PPF minimum investment, PPF maximum limit 1.5 lakh, PPF installment rules"
    },
    {
      question: "When is the best time to invest in PPF for maximum returns?",
      answer: "Invest between 1st-5th of every month to maximize interest calculation. Interest is calculated on the minimum balance from 5th to month-end. Early deposits ensure your entire amount earns interest for that month. For lump sum investors, deposit before April 5th.",
      keywords: "Best time to invest in PPF, PPF deposit date for maximum interest, PPF 5th rule"
    },
    {
      question: "How much tax can I save with PPF investment?",
      answer: "PPF offers EEE (Exempt-Exempt-Exempt) tax benefits: 1) Investment up to ₹1.5 lakh qualifies for Section 80C deduction, 2) Interest earned is completely tax-free, 3) Maturity amount is tax-free. In 30% tax bracket, you save ₹46,350 annually on ₹1.5L investment. Calculate using our Tax Saving Calculator.",
      keywords: "PPF tax benefits 2025, Section 80C PPF, PPF EEE tax exemption, PPF vs ELSS tax saving"
    },
    {
      question: "Can I withdraw money from PPF before 15 years maturity?",
      answer: "Partial withdrawal is allowed from 7th financial year (not 7th year of account opening). You can withdraw up to 50% of the balance at end of 4th preceding year. Loans are available from 3rd to 6th year at 2% above PPF rate. Premature closure allowed only for medical emergencies or higher education.",
      keywords: "PPF withdrawal rules, PPF premature withdrawal, PPF loan against account, PPF 7th year withdrawal"
    },
    {
      question: "How to open PPF account online in 2025?",
      answer: "Open PPF accounts online via: 1) SBI, ICICI, HDFC, or any nationalized bank's internet banking, 2) Post Office iPPF app, 3) Paytm Payments Bank. Required documents: PAN card, Aadhaar (linked to bank), KYC-compliant photos. No physical branch visit needed. NRI cannot open PPF accounts (discontinued from 2003).",
      keywords: "Open PPF account online, PPF online application 2025, SBI PPF account opening, Post Office PPF online"
    },
    {
      question: "PPF vs NPS: Which is better for retirement planning in 2025?",
      answer: "PPF: Guaranteed 7.1% returns, completely tax-free maturity, 15-year lock-in, ₹1.5L annual limit. NPS: Market-linked returns (10-12% historically), 60% tax-free, 60 years maturity, no upper limit. PPF is safer for risk-averse investors. NPS offers higher growth potential. Diversify with both! Compare using our NPS Calculator.",
      keywords: "PPF vs NPS comparison, PPF or NPS which is better, retirement planning India 2025"
    },
    {
      question: "What happens to PPF after 15 years? Extension rules 2025",
      answer: "After 15 years, you have 3 options: 1) Withdraw entire amount, 2) Extend without contributions (earn interest only), 3) Extend with contributions in 5-year blocks. Extensions are unlimited. Interest continues at prevailing rates. Extended accounts maintain all tax benefits. Extension must be applied within 1 year of maturity.",
      keywords: "PPF maturity after 15 years, PPF extension rules, PPF 5 year extension, what to do after PPF matures"
    },
    {
      question: "How much will ₹1.5 lakh PPF investment grow in 15 years?",
      answer: "At current 7.1% rate: Investment: ₹22,50,000 (₹1.5L × 15 years), Interest: ₹18,18,209, Maturity: ₹40,68,209. After 20 years: ₹66,03,847. After 25 years: ₹1,03,39,039 (₹1+ crore!). Power of compounding makes PPF a wealth creator for long-term investors. Use our calculator to try different scenarios.",
      keywords: "PPF 1.5 lakh return after 15 years, PPF maturity value, PPF 15 years return calculator"
    },
    {
      question: "Can I have multiple PPF accounts? Rules for joint account",
      answer: "No, only ONE PPF account allowed per individual (post-2019 rule). Joint accounts NOT allowed. However, you can open separate accounts for: spouse, minor children (up to 2 kids), or elderly parents. Total family PPF investment can be ₹6-7.5 lakhs annually. Guardian operates minor's account until age 18.",
      keywords: "Multiple PPF accounts rules, PPF account for wife, PPF for minor child, family PPF investment strategy"
    }
  ];
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 -mx-4 -my-4 md:-mx-8 md:-my-8">
      {/* Hero Header with Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-12 md:py-16 px-4 md:px-8"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <PiggyBank className="w-16 h-16" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            PPF Calculator 2025-2026 | Public Provident Fund Returns Calculator
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
            Calculate PPF maturity amount, interest earned, and year-wise breakup. Free online PPF calculator with latest 7.1% interest rate, tax benefits analysis, and comparison tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="https://www.nsiindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Official NSI Portal <ExternalLink className="w-4 h-4 ml-2" />
            </motion.a>
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share Results
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="w-full px-4 md:px-8 -mt-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-2 flex flex-wrap gap-2">
          {[
            { id: 'calculator', label: 'Calculator', icon: Calculator },
            { id: 'guide', label: 'How to Use', icon: BookOpen },
            { id: 'comparison', label: 'Comparison', icon: TrendingUp }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="w-full px-4 md:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Left Column - Inputs */}
      <div className="space-y-6">
                {/* Quick Presets */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    Quick Presets
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {presetAmounts.map((amount) => (
                      <motion.button
                        key={amount}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setYearlyInvestment(amount)}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          yearlyInvestment === amount
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ₹{(amount / 1000).toFixed(0)}K
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Input Controls */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-6">
          <Sliders className="w-5 h-5 mr-2 text-primary-600" />
          PPF Investment Details
        </h2>
        
                  <div className="space-y-6">
                    {/* Yearly Investment */}
          <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium text-neutral-700 flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                Yearly Investment (₹)
              </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-indigo-600">
                  {formatCurrency(yearlyInvestment)}
                </span>
                <input 
                  type="number"
                  value={manualYearlyInvestment}
                  onChange={(e) => handleManualYearlyInvestmentChange(e.target.value)}
                            className="w-28 px-3 py-2 text-sm border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                  min="500"
                  max="150000"
                  step="500"
                />
              </div>
            </div>
            <input 
              type="range" 
              min="500" 
              max="150000" 
              step="500" 
              value={yearlyInvestment} 
              onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                        style={{
                          background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((yearlyInvestment - 500) / (150000 - 500)) * 100}%, #e0e7ff ${((yearlyInvestment - 500) / (150000 - 500)) * 100}%, #e0e7ff 100%)`
                        }}
            />
                      <div className="flex justify-between mt-2 text-xs text-neutral-500">
              <span>₹500</span>
                        <span>₹1,50,000 (Max)</span>
            </div>
          </div>
          
                    {/* Interest Rate */}
          <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium text-neutral-700 flex items-center">
                          <Percent className="w-4 h-4 mr-1 text-blue-600" />
                Interest Rate (% p.a.)
              </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-indigo-600">
                  {interestRate.toFixed(2)}%
                </span>
                <input 
                  type="number"
                  value={manualInterestRate}
                  onChange={(e) => handleManualInterestRateChange(e.target.value)}
                            className="w-20 px-3 py-2 text-sm border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  min="5"
                  max="10"
                  step="0.1"
                />
              </div>
            </div>
            <input 
              type="range" 
              min="5" 
              max="10" 
              step="0.1" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((interestRate - 5) / (10 - 5)) * 100}%, #dbeafe ${((interestRate - 5) / (10 - 5)) * 100}%, #dbeafe 100%)`
                        }}
            />
                      <div className="flex justify-between mt-2 text-xs text-neutral-500">
              <span>5%</span>
                        <span className="text-green-600 font-semibold">Current: 7.1%</span>
              <span>10%</span>
            </div>
          </div>
          
                    {/* Time Period */}
          <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-sm font-medium text-neutral-700 flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-purple-600" />
                Time Period (Years)
              </label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-indigo-600">
                  {timePeriod} years
                </span>
                <input 
                  type="number"
                  value={manualTimePeriod}
                  onChange={(e) => handleManualTimePeriodChange(e.target.value)}
                            className="w-20 px-3 py-2 text-sm border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  min="15"
                  max="50"
                  step="5"
                />
              </div>
            </div>
            <input 
              type="range" 
              min="15" 
              max="50" 
              step="5" 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(Number(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${((timePeriod - 15) / (50 - 15)) * 100}%, #f3e8ff ${((timePeriod - 15) / (50 - 15)) * 100}%, #f3e8ff 100%)`
                        }}
            />
                      <div className="flex justify-between mt-2 text-xs text-neutral-500">
                        <span>15 Years (Min)</span>
              <span>50 Years</span>
            </div>
          </div>
        </div>
                </motion.div>

                {/* Results Summary */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white"
                >
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Award className="w-7 h-7 mr-2" />
                    Your PPF Growth Summary
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm opacity-90">Total Investment</p>
                        <DollarSign className="w-5 h-5 opacity-70" />
                      </div>
                      <p className="text-3xl font-bold">{formatCurrency(totalInvestment)}</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm opacity-90">Interest Earned</p>
                        <TrendingUp className="w-5 h-5 opacity-70" />
                      </div>
                      <p className="text-3xl font-bold">{formatCurrency(totalInterest)}</p>
                      <p className="text-sm opacity-80 mt-1">
                        {((totalInterest / totalInvestment) * 100).toFixed(1)}% return
                      </p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl border-2 border-white/50 shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-orange-900">Maturity Value</p>
                        <Target className="w-6 h-6 text-orange-900" />
                      </div>
                      <p className="text-4xl font-extrabold text-orange-900">{formatCurrency(maturityValue)}</p>
                      <div className="flex items-center mt-3 text-orange-900 text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Tax-Free Maturity
                      </div>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownloadReport}
                      className="flex-1 py-3 bg-white text-green-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowTaxBenefits(!showTaxBenefits)}
                      className="flex-1 py-3 bg-white/20 backdrop-blur-sm rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
                    >
                      <Shield className="w-5 h-5" />
                      Tax Benefits
                    </motion.button>
        </div>
        
                  {/* Tax Benefits Breakdown */}
                  <AnimatePresence>
                    {showTaxBenefits && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                      >
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          Annual Tax Savings (30% bracket)
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Section 80C Deduction:</span>
                            <span className="font-bold">{formatCurrency(taxSavings)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest Tax-Free:</span>
                            <span className="font-bold text-yellow-300">✓ Yes</span>
            </div>
                          <div className="flex justify-between">
                            <span>Maturity Tax-Free:</span>
                            <span className="font-bold text-yellow-300">✓ Yes</span>
            </div>
                          <div className="pt-2 border-t border-white/20 mt-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Total Tax Saved ({timePeriod} yrs):</span>
                              <span className="font-bold text-xl text-yellow-300">
                                {formatCurrency(taxSavings * timePeriod)}
                              </span>
            </div>
          </div>
        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Info Box */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-5 bg-blue-50 rounded-xl border-l-4 border-blue-500"
                >
          <div className="flex items-start">
                    <Info className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
                      <p className="text-sm text-blue-900 font-medium mb-2">
                        💡 Pro Tip: Invest before 5th of every month
                      </p>
                      <p className="text-sm text-blue-800">
                        Your yearly investment of <span className="font-semibold">{formatCurrency(yearlyInvestment)}</span> for{' '}
                        <span className="font-semibold">{timePeriod} years</span> at{' '}
                        <span className="font-semibold">{interestRate}% p.a.</span> will grow to{' '}
                        <span className="font-semibold text-green-700">{formatCurrency(maturityValue)}</span>, generating{' '}
                        <span className="font-semibold text-green-700">{formatCurrency(totalInterest)}</span> in tax-free interest!
              </p>
            </div>
          </div>
                </motion.div>
      </div>
      
              {/* Right Column - Charts & Breakup */}
      <div className="space-y-6">
                {/* Pie Chart */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <Calculator className="w-5 h-5 mr-2 text-primary-600" />
                    PPF Amount Breakup
          </h2>
                  <div className="h-72">
            <ResultChart 
              data={[
                { name: 'Total Investment', value: totalInvestment, color: '#3b82f6' },
                { name: 'Interest Earned', value: totalInterest, color: '#22c55e' }
              ]}
              centerText={`${formatCurrency(maturityValue)}\nMaturity Value`}
            />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Investment</span>
                      </div>
                      <p className="text-lg font-bold text-blue-700">
                        {((totalInvestment / maturityValue) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Interest</span>
                      </div>
                      <p className="text-lg font-bold text-green-700">
                        {((totalInterest / maturityValue) * 100).toFixed(1)}%
                      </p>
          </div>
        </div>
                </motion.div>
                
                {/* Bar Chart */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
            <LineChart className="w-5 h-5 mr-2 text-primary-600" />
                    Year-wise Balance Growth
          </h2>
                  <div className="h-72">
            <BarChart 
              data={yearlyBreakup.filter((_, index) => index % 5 === 0 || index === yearlyBreakup.length - 1)}
              xKey="year"
              yKey="balance"
                      color="#8b5cf6"
              xLabel="Year"
              yLabel="Balance (₹)"
              formatY={(value) => formatCurrency(value)}
            />
          </div>
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    📈 Your PPF balance grows exponentially due to compounding interest
                  </p>
                </motion.div>
                
                {/* Year-wise Table */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h2 className="text-xl font-semibold text-neutral-900 flex items-center mb-4">
                    <FileText className="w-5 h-5 mr-2 text-primary-600" />
                    Yearly Investment Breakup
          </h2>
                  <div className="overflow-auto max-h-96 rounded-lg border border-neutral-200">
            <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                            Year
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                            Investment
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                            Interest
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                            Balance
                          </th>
                </tr>
              </thead>
                      <tbody className="bg-white divide-y divide-neutral-100">
                {yearlyBreakup.map((year, index) => (
                          <motion.tr 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className={`${
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            } hover:bg-indigo-50 transition-colors`}
                          >
                            <td className="px-4 py-3 text-sm font-semibold text-indigo-700">
                              {year.year}
                            </td>
                            <td className="px-4 py-3 text-sm text-neutral-900">
                              {formatCurrency(year.investment)}
                            </td>
                            <td className="px-4 py-3 text-sm text-green-700 font-medium">
                              {formatCurrency(year.interest)}
                            </td>
                            <td className="px-4 py-3 text-sm font-bold text-purple-700">
                              {formatCurrency(year.balance)}
                            </td>
                          </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-indigo-600" />
                How to Use PPF Calculator - Complete Guide 2025
              </h2>

              <div className="prose max-w-none">
                <div className="space-y-8">
                  {/* Step 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-indigo-500 pl-6 py-2"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                      Enter Your Annual Investment Amount
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Use the slider or input field to set your yearly PPF contribution. You can invest between ₹500 (minimum) and ₹1,50,000 (maximum) per financial year.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>💡 Smart Tip:</strong> Invest the maximum ₹1.5 lakh annually to maximize tax benefits under Section 80C and get the highest returns. 
                        Even if you can't afford ₹1.5L upfront, you can invest in monthly installments (max 12 per year).
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2 text-gray-700">
                      <li>• <strong>Quick Presets:</strong> Click ₹50K, ₹100K, or ₹150K buttons for instant calculation</li>
                      <li>• <strong>Monthly Planning:</strong> Divide your target by 12 for monthly deposits (e.g., ₹12,500/month for ₹1.5L/year)</li>
                      <li>• <strong>Tax Planning:</strong> ₹1.5 lakh investment saves ₹46,350 in taxes (30% bracket)</li>
                    </ul>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-purple-500 pl-6 py-2"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                      Set the Interest Rate
                    </h3>
                    <p className="text-gray-700 mb-3">
                      The current PPF interest rate for Q4 FY 2024-25 is <strong className="text-green-600">7.1% per annum</strong>, 
                      compounded annually. This rate is set by the Government of India and updated quarterly.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-900">
                        <strong>📊 Historical Rates:</strong> PPF rates have ranged from 7.1% (2023-24) to 8.0% (2019-20). 
                        Our calculator lets you try different rates to see best and worst-case scenarios.
                      </p>
                    </div>
                    <ul className="mt-3 space-y-2 text-gray-700">
                      <li>• <strong>Current Rate:</strong> 7.1% p.a. (April 2024 - March 2025)</li>
                      <li>• <strong>Rate Updates:</strong> Announced quarterly by Ministry of Finance</li>
                      <li>• <strong>Scenario Planning:</strong> Try 6.5% (conservative) to 8% (optimistic) for planning</li>
                      <li>• <strong>Official Source:</strong> Check latest rates on <a href="https://www.nsiindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">NSI India website <ExternalLink className="w-3 h-3 inline" /></a></li>
                    </ul>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-pink-500 pl-6 py-2"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                      Choose Investment Duration
                    </h3>
                    <p className="text-gray-700 mb-3">
                      PPF has a mandatory lock-in period of <strong>15 years</strong>. After maturity, you can extend in 5-year blocks with or without contributions. 
                      Our calculator supports calculations up to 50 years for long-term wealth planning.
                    </p>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-900">
                        <strong>⏰ PPF Timeline:</strong>
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-yellow-900">
                        <li>• <strong>Year 3-6:</strong> Loan facility available (repay before 36 months)</li>
                        <li>• <strong>Year 7+:</strong> Partial withdrawal allowed (max 50% of balance 4 years ago)</li>
                        <li>• <strong>Year 15:</strong> Maturity - withdraw all or extend for 5 years</li>
                        <li>• <strong>Year 15+:</strong> Unlimited 5-year extensions possible</li>
                      </ul>
                    </div>
                    <ul className="mt-3 space-y-2 text-gray-700">
                      <li>• <strong>Minimum Duration:</strong> 15 years (locked)</li>
                      <li>• <strong>Extension Options:</strong> Continue earning interest even after 15 years</li>
                      <li>• <strong>Wealth Building:</strong> Longer duration = exponential growth due to compounding</li>
                      <li>• <strong>Example:</strong> ₹1.5L/year for 25 years = ₹1.03 crore maturity (vs ₹40.68L for 15 years)</li>
                    </ul>
                  </motion.div>

                  {/* Step 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-green-500 pl-6 py-2"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                      View Detailed Results & Analysis
                    </h3>
                    <p className="text-gray-700 mb-3">
                      Our advanced PPF calculator provides instant, comprehensive analysis:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Interactive Charts
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Pie chart showing investment vs interest split</li>
                          <li>• Bar chart depicting year-wise growth</li>
                          <li>• Visual representation of compound interest magic</li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Year-wise Breakup
                        </h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>• Detailed table for every year</li>
                          <li>• Investment, interest, and balance for each year</li>
                          <li>• Track your wealth accumulation journey</li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          Tax Benefits Calculator
                        </h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Section 80C deduction amount</li>
                          <li>• Total tax saved over investment period</li>
                          <li>• EEE (triple tax exempt) benefits explained</li>
                        </ul>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Export & Share
                        </h4>
                        <ul className="text-sm text-orange-800 space-y-1">
                          <li>• Download PDF report of all calculations</li>
                          <li>• Share results with family/advisor</li>
                          <li>• Print-friendly format for records</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Advanced Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Sparkles className="w-7 h-7 mr-3 text-indigo-600" />
                      Advanced Calculator Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Real-time Calculations</p>
                          <p className="text-sm text-gray-700">Instant results as you adjust sliders - no calculate button needed</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Quick Presets</p>
                          <p className="text-sm text-gray-700">One-click common investment amounts (₹50K, ₹100K, ₹150K)</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Dual Input Methods</p>
                          <p className="text-sm text-gray-700">Use sliders for quick changes or input boxes for precise values</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Mobile Optimized</p>
                          <p className="text-sm text-gray-700">Works perfectly on phones, tablets, and desktops</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Comparison Tools</p>
                          <p className="text-sm text-gray-700">Compare PPF with NPS, FD, and other investment options</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Scenario Analysis</p>
                          <p className="text-sm text-gray-700">Test different interest rates and time periods</p>
        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tips Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Target className="w-7 h-7 mr-3 text-green-600" />
                      PPF Investment Strategy - Expert Tips
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">Tip 1</span>
                        <p className="text-gray-700">
                          <strong>Deposit before the 5th:</strong> PPF interest is calculated on the minimum balance between 5th and end of month. 
                          Depositing between 1st-5th ensures your full amount earns interest for that month.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">Tip 2</span>
                        <p className="text-gray-700">
                          <strong>Start early:</strong> A 25-year-old investing ₹1.5L/year for 35 years will accumulate ₹2.68 crores! 
                          Start early to harness the power of compound interest. Use our <a href="https://moneycal.in/calculators/compound-interest-calculator" className="text-blue-600 underline">Compound Interest Calculator</a> to see the magic.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">Tip 3</span>
                        <p className="text-gray-700">
                          <strong>Family PPF accounts:</strong> Open separate PPF accounts for spouse and minor children (max 2 kids). 
                          Total family investment: ₹6-7.5 lakhs annually, multiplying your wealth creation potential.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">Tip 4</span>
                        <p className="text-gray-700">
                          <strong>Extend after maturity:</strong> Don't withdraw at 15 years unless needed. Extend for another 5-10 years 
                          to reach ₹1+ crore corpus. Extended accounts continue earning tax-free interest.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">Tip 5</span>
                        <p className="text-gray-700">
                          <strong>Diversify beyond PPF:</strong> While PPF is safe and tax-free, also invest in market-linked instruments like 
                          <a href="https://moneycal.in/calculators/sip-calculator" className="text-blue-600 underline mx-1">mutual fund SIPs</a> 
                          and <a href="https://moneycal.in/calculators/nps-calculator" className="text-blue-600 underline">NPS</a> for higher returns.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-8 h-8 mr-3 text-purple-600" />
                  PPF vs Other Investment Options - 2025 Comparison
                </h2>

                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                        <th className="px-4 py-3 text-left text-sm font-bold text-purple-900">Features</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-purple-900">PPF</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-purple-900">NPS</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-purple-900">Fixed Deposit</th>
                        <th className="px-4 py-3 text-center text-sm font-bold text-purple-900">Mutual Funds</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Returns (p.a.)</td>
                        <td className="px-4 py-3 text-center text-green-700 font-semibold">7.1% (Guaranteed)</td>
                        <td className="px-4 py-3 text-center">10-12% (Market-linked)</td>
                        <td className="px-4 py-3 text-center">6-7% (Guaranteed)</td>
                        <td className="px-4 py-3 text-center">12-15% (Market-linked)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Risk Level</td>
                        <td className="px-4 py-3 text-center text-green-700 font-semibold">Zero Risk</td>
                        <td className="px-4 py-3 text-center text-yellow-700">Moderate</td>
                        <td className="px-4 py-3 text-center text-green-700">Zero Risk</td>
                        <td className="px-4 py-3 text-center text-orange-700">High</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Lock-in Period</td>
                        <td className="px-4 py-3 text-center">15 years</td>
                        <td className="px-4 py-3 text-center">Till 60 years age</td>
                        <td className="px-4 py-3 text-center">5-10 years (Tax-saving)</td>
                        <td className="px-4 py-3 text-center">3 years (ELSS)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Tax Benefits</td>
                        <td className="px-4 py-3 text-center text-green-700 font-semibold">EEE (Best)</td>
                        <td className="px-4 py-3 text-center">EET (60% exempt)</td>
                        <td className="px-4 py-3 text-center">E only (Interest taxable)</td>
                        <td className="px-4 py-3 text-center">EEE (LTCG)</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Investment Limit</td>
                        <td className="px-4 py-3 text-center">₹1.5 lakh/year</td>
                        <td className="px-4 py-3 text-center">No limit</td>
                        <td className="px-4 py-3 text-center">No limit</td>
                        <td className="px-4 py-3 text-center">No limit</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">Ideal For</td>
                        <td className="px-4 py-3 text-center text-green-700 font-semibold">Risk-averse, Long-term</td>
                        <td className="px-4 py-3 text-center">Retirement</td>
                        <td className="px-4 py-3 text-center">Short-term safety</td>
                        <td className="px-4 py-3 text-center">Wealth creation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Calculator Links */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.a
                    href="https://moneycal.in/calculators/nps-calculator"
                    whileHover={{ scale: 1.03 }}
                    className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-blue-900">NPS Calculator</h3>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-blue-700">Calculate National Pension System returns and compare with PPF</p>
                  </motion.a>
                  <motion.a
                    href="https://moneycal.in/calculators/sip-calculator"
                    whileHover={{ scale: 1.03 }}
                    className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-purple-900">SIP Calculator</h3>
                      <ArrowRight className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-sm text-purple-700">Calculate mutual fund SIP returns for wealth creation</p>
                  </motion.a>
                  <motion.a
                    href="https://moneycal.in/calculators/fd-calculator"
                    whileHover={{ scale: 1.03 }}
                    className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:border-green-400 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-green-900">FD Calculator</h3>
                      <ArrowRight className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700">Calculate Fixed Deposit returns and interest earned</p>
                  </motion.a>
                </div>

                {/* Investment Recommendation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2" />
                    Recommended Investment Strategy 2025
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold mb-2">For Conservative Investors (Age 40+)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 50% PPF (Safety + Tax benefits)</li>
                        <li>• 30% NPS (Retirement corpus)</li>
                        <li>• 20% Debt Mutual Funds</li>
                      </ul>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold mb-2">For Aggressive Investors (Age 25-35)</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 30% PPF (Tax-free base)</li>
                        <li>• 40% Equity Mutual Funds/SIP</li>
                        <li>• 20% NPS (Retirement)</li>
                        <li>• 10% Stocks (Direct equity)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="mt-4 text-sm">
                    💡 <strong>Pro Tip:</strong> Max out PPF ₹1.5L for tax-free safety net, then invest surplus in market-linked instruments for higher growth.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Comprehensive FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-6">
            <Info className="w-8 h-8 mr-3 text-blue-600" />
            PPF Calculator FAQs - Complete Guide 2025-2026
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white">
                        <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        <div className="mt-3 flex flex-wrap gap-2">
                          {faq.keywords.split(', ').map((keyword, kidx) => (
                            <span key={kidx} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Related Resources */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <BookOpen className="w-7 h-7 mr-3 text-indigo-600" />
            Related Financial Tools & Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://moneycal.in/calculators/nps-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">NPS Calculator</div>
              <div className="text-sm text-gray-600">Calculate National Pension System returns</div>
            </a>
            <a
              href="https://moneycal.in/calculators/sip-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">SIP Calculator</div>
              <div className="text-sm text-gray-600">Calculate mutual fund SIP returns</div>
            </a>
            <a
              href="https://moneycal.in/calculators/sukanya-samriddhi-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">Sukanya Samriddhi</div>
              <div className="text-sm text-gray-600">Girl child savings scheme calculator</div>
            </a>
            <a
              href="https://moneycal.in/calculators/section-80c-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">Section 80C Calculator</div>
              <div className="text-sm text-gray-600">Calculate total tax deductions</div>
            </a>
            <a
              href="https://moneycal.in/calculators/compound-interest-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">Compound Interest Calculator</div>
              <div className="text-sm text-gray-600">Understand power of compounding</div>
            </a>
            <a
              href="https://moneycal.in/calculators/fd-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">FD Calculator</div>
              <div className="text-sm text-gray-600">Calculate Fixed Deposit returns</div>
            </a>
            <a
              href="https://moneycal.in/calculators/income-tax-calculator"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">Income Tax Calculator</div>
              <div className="text-sm text-gray-600">Calculate tax liability for FY 2025-26</div>
            </a>
            <a
              href="https://moneycal.in/finance-tools/retirement-planner"
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all"
            >
              <div className="font-medium text-gray-900 mb-1">Retirement Planner</div>
              <div className="text-sm text-gray-600">Plan your retirement corpus</div>
            </a>
          </div>
        </motion.div>

        {/* Official Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 bg-white rounded-xl p-6 border-l-4 border-indigo-500"
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <ExternalLink className="w-5 h-5 mr-2 text-indigo-600" />
            Official Government Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <a
              href="https://www.nsiindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              NSI India - PPF Rates & Rules
            </a>
            <a
              href="https://www.indiapost.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              India Post - Open PPF Account
            </a>
            <a
              href="https://www.incometax.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-700 hover:underline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Income Tax Department - Section 80C
            </a>
          </div>
        </motion.div>
        
        {/* Comprehensive SEO Content Section - 1500+ words */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">PPF Calculator India 2025: Complete Guide to Public Provident Fund</h2>
          
          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">PPF Interest Rates 2025: Current Rate & Historical Trends</h3>
              <p className="leading-relaxed mb-4">
                The Public Provident Fund (PPF) interest rate for Q1 2025 (April-June) is <strong>7.1% per annum</strong>, unchanged from the previous quarter. PPF rates are reviewed quarterly by the Government of India and are typically announced before each quarter. Historical trend: PPF rates have ranged from 7.1% to 8.7% over the past decade, with rates declining from 8.7% (2012-2013) to current 7.1% (2024-2025) due to falling interest rate environment globally.
              </p>
              <p className="leading-relaxed mb-4">
                PPF interest calculation method: Interest is calculated monthly on the minimum balance between the 5th and last day of each month, compounded annually. This means deposits made before the 5th of each month earn interest for that entire month, while deposits after the 5th earn interest from the next month. This is why timing your PPF deposits is crucial - investing before April 5th ensures your entire annual contribution earns interest for the full year.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">PPF Tax Benefits: EEE (Exempt-Exempt-Exempt) Status</h3>
              <p className="leading-relaxed mb-4">
                PPF offers triple tax exemption making it one of the best tax-saving instruments in India: <strong>1) Investment Exempt (E)</strong> - Contributions up to ₹1.5 lakh per year qualify for deduction under Section 80C of Income Tax Act, reducing taxable income. <strong>2) Interest Exempt (E)</strong> - All interest earned on PPF is completely tax-free, unlike fixed deposits where interest is taxable. <strong>3) Maturity Exempt (E)</strong> - The entire maturity amount including principal and interest is tax-free on withdrawal.
              </p>
              <p className="leading-relaxed mb-4">
                Tax savings calculation: For someone in the 30% tax bracket investing ₹1.5 lakh annually in PPF: Tax saved on investment = ₹1.5L × 30% = ₹45,000 per year. Over 15 years, this saves ₹6.75 lakhs in taxes! Additionally, interest of approximately ₹18-20 lakhs earned over 15 years is completely tax-free (would be taxed at 30% in FD = ₹5.4-6L saved). Total tax benefit: ₹12-13 lakhs over 15 years! Use our <Link to="/calculators/income-tax-calculator" className="text-primary-700 underline font-semibold">Income Tax Calculator</Link> to see exact tax savings.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">PPF vs Other Investment Options: Complete Comparison 2025</h3>
              <p className="leading-relaxed mb-4">
                <strong>PPF vs Fixed Deposit:</strong> PPF offers 7.1% tax-free returns vs FD 6-7% taxable returns. After tax (30% bracket), FD gives only 4.2-4.9% net returns. PPF clearly wins for long-term wealth creation. However, FD offers liquidity (can withdraw anytime) while PPF has 15-year lock-in. <strong>PPF vs ELSS:</strong> ELSS offers 12-15% potential returns (equity mutual funds) with 3-year lock-in vs PPF's 7.1% guaranteed returns with 15-year lock-in. ELSS is better for growth-oriented investors, PPF for risk-averse investors. Diversify with both!
              </p>
              <p className="leading-relaxed mb-4">
                <strong>PPF vs NPS:</strong> NPS offers 10-12% market-linked returns (higher risk) with 60% tax-free withdrawal at 60 years vs PPF's 7.1% guaranteed returns with 100% tax-free withdrawal at 15 years. PPF is safer, NPS offers higher growth. <strong>PPF vs Sukanya Samriddhi Yojana (SSY):</strong> SSY offers 8% interest (higher than PPF) but only for girl child, matures at 21 years. Both are excellent tax-saving options. Use our <Link to="/calculators/sukanya-samriddhi-calculator" className="text-primary-700 underline font-semibold">Sukanya Samriddhi Calculator</Link> to compare.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">PPF Withdrawal Rules & Extension Options 2025</h3>
              <p className="leading-relaxed mb-4">
                <strong>Partial Withdrawal:</strong> Allowed from 7th financial year (not 7th year from account opening). You can withdraw up to 50% of the balance at the end of 4th preceding year or 50% of balance at end of preceding year, whichever is lower. Example: In 7th year, you can withdraw 50% of balance at end of 3rd year. Maximum one withdrawal per year allowed. <strong>Loan Against PPF:</strong> Available from 3rd to 6th financial year. Loan amount: 25% of balance at end of 2nd preceding year. Interest rate: 2% above PPF rate (currently 9.1%). Repayment: 36 months.
              </p>
              <p className="leading-relaxed mb-4">
                <strong>Premature Closure:</strong> Allowed only in specific cases: 1) Life-threatening illness of account holder/dependent, 2) Higher education of account holder/dependent, 3) Change in residency status (becoming NRI). Requires medical certificates or education proof. <strong>Extension After 15 Years:</strong> Three options: 1) Withdraw entire amount, 2) Extend without contributions (earn interest only), 3) Extend with contributions in 5-year blocks (unlimited extensions). Extension must be applied within 1 year of maturity. Extended accounts maintain all tax benefits.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Related Financial Calculators for Complete Planning</h3>
              <p className="leading-relaxed mb-4">
                Comprehensive financial planning requires multiple calculators. Use our <Link to="/calculators/sip-calculator" className="text-primary-700 underline font-semibold">SIP Calculator</Link> to compare PPF with equity mutual fund investments. Our <Link to="/calculators/nps-calculator" className="text-primary-700 underline font-semibold">NPS Calculator</Link> helps compare PPF vs NPS for retirement planning. For tax planning, use our <Link to="/calculators/tax-saving-investment-calculator" className="text-primary-700 underline font-semibold">Tax Saving Investment Calculator</Link> to optimize Section 80C investments.
              </p>
              <p className="leading-relaxed mb-4">
                For retirement planning, use our <Link to="/calculators/retirement-calculator" className="text-primary-700 underline font-semibold">Retirement Calculator</Link> to determine if PPF alone is sufficient or if you need additional investments. Our <Link to="/calculators/compound-interest-calculator" className="text-primary-700 underline font-semibold">Compound Interest Calculator</Link> helps understand the power of compounding in PPF. For comparing with other fixed-income options, use our <Link to="/calculators/fd-calculator" className="text-primary-700 underline font-semibold">FD Calculator</Link>.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2025 PPF Trends & Best Practices</h3>
              <p className="leading-relaxed mb-4">
                The PPF landscape in 2025 is characterized by: 1) <strong>Digitalization</strong> - Online PPF account opening through banks and Post Office apps, no physical branch visit needed, 2) <strong>Stable Rates</strong> - PPF rates have stabilized around 7-7.1% after declining from 8.7% peak, 3) <strong>Increased Awareness</strong> - More investors recognizing PPF as safe, tax-efficient long-term investment, 4) <strong>Family Planning</strong> - Investors opening PPF accounts for spouse and children to maximize family tax savings (₹6-7.5L annually possible).
              </p>
              <p className="leading-relaxed mb-4">
                Best practices for 2025: Invest maximum ₹1.5L annually to maximize tax benefits, Deposit before 5th of each month to earn interest for that month, Continue PPF for full 15 years to maximize compounding benefits, Extend account after maturity to continue tax-free growth, Combine PPF with equity investments (ELSS, SIP) for balanced portfolio, Open PPF for family members (spouse, children) to increase total tax savings, Review PPF as part of overall retirement planning strategy.
              </p>
            </section>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PpfCalculator;
