import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, Layers, Lock, Users, Star, Sparkles, Clock, BadgeCheck,
  PieChart, Percent, Calculator, Building, Landmark, CreditCard,
  TrendingDown, Info, Download, Share2, FileText, Calendar, Home,
  Smartphone, Globe, XCircle, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const EPFGuide: React.FC = () => {
  // EPF Calculator State
  const [basicSalary, setBasicSalary] = useState(50000);
  const [employeeContribution] = useState(12);
  const [employerContribution] = useState(12);
  const [interestRate] = useState(8.25);
  const [years, setYears] = useState(30);

  // Calculate EPF maturity
  const monthlyEmployee = (basicSalary * employeeContribution) / 100;
  const monthlyEmployer = (basicSalary * employerContribution) / 100;
  const totalMonthly = monthlyEmployee + monthlyEmployer;
  const annualContribution = totalMonthly * 12;
  
  let balance = 0;
  for (let i = 1; i <= years; i++) {
    balance = (balance + annualContribution) * (1 + interestRate / 100);
  }
  const maturityAmount = balance;
  const totalInvested = annualContribution * years;
  const totalInterest = maturityAmount - totalInvested;

  const faqData = [
    {
      question: "What is EPF and how does it work?",
      answer: "EPF (Employee Provident Fund) is a retirement savings scheme for salaried employees. 12% of your basic salary is deducted monthly + employer contributes 12% (3.67% to EPF + 8.33% to EPS pension). Interest: 8.25% compounded annually. At retirement, you get lumpsum + monthly EPS pension!"
    },
    {
      question: "How to check EPF balance online?",
      answer: "3 ways: (1) UMANG app → EPF → View Passbook (login with UAN + password). (2) epfindia.gov.in → Member e-Sewa → Login with UAN. (3) SMS: Send EPFOHO UAN ENG to 7738299899. Balance updated monthly (by 7th of next month)."
    },
    {
      question: "What is UAN and how to activate it?",
      answer: "UAN (Universal Account Number) is your permanent 12-digit EPF ID. One UAN for lifetime, across all jobs. Activation: (1) Get UAN from employer, (2) Visit unifiedportal-mem.epfindia.gov.in/memberinterface, (3) Activate using Aadhaar OTP + set password. Takes 5 minutes!"
    },
    {
      question: "Can I withdraw EPF before retirement?",
      answer: "Partial withdrawal allowed for: (1) Medical emergency (6x monthly salary or 50% balance), (2) Home purchase/construction (90% of balance after 5 years), (3) Marriage (50% after 7 years), (4) Higher education (50% after 7 years). Full withdrawal: After 1 month unemployment OR retirement at 55."
    },
    {
      question: "How much does employer contribute to EPF?",
      answer: "12% of basic salary BUT split: (1) 3.67% to your EPF account (this earns 8.25% interest), (2) 8.33% to EPS (Pension scheme - gives you monthly pension after 58). Employer also pays 0.5% EDLI (insurance) + 0.5% admin charges. Total employer cost: 13% of basic!"
    },
    {
      question: "What is EPS pension and how much will I get?",
      answer: "EPS (Employee Pension Scheme): Monthly pension after age 58. Pension amount = (Pensionable salary × years of service) / 70. Example: ₹15K avg salary × 30 years = ₹6,428/month pension for life! If 10+ years service, eligible. Can defer till 60 for higher pension (+4% per year)."
    },
    {
      question: "Can I increase EPF contribution beyond 12%?",
      answer: "YES! Voluntary Provident Fund (VPF): Contribute extra beyond 12% (up to 100% of salary!). Example: Basic ₹50K → 12% mandatory (₹6K) + 5% VPF (₹2.5K) = ₹8.5K/month. VPF also earns 8.25% interest. Best for extra tax-free retirement savings!"
    },
    {
      question: "What happens to EPF when changing jobs?",
      answer: "DON'T WITHDRAW! Transfer to new employer. How: (1) Inform new employer of old UAN, (2) Submit online transfer request on EPFO portal, (3) Money transfers in 7-15 days. Keep EPF active = compounding continues + tax-free. Withdraw early = break tax-free status + lose compounding!"
    },
    {
      question: "Is EPF interest taxable?",
      answer: "Tax-free if: (1) Withdrawn after 5 continuous years of service, (2) Left job due to illness/company shutdown. Taxable if: Withdrawn before 5 years. Also: Interest on contribution above ₹2.5L/year (₹5L for non-PF employer) is taxable from FY 2021-22."
    },
    {
      question: "How to withdraw EPF online?",
      answer: "4 steps: (1) Login to epfindia.gov.in with UAN, (2) Online Services → Claim (Form 19 for full, Form 31 for partial), (3) Enter Aadhaar + bank details, (4) Submit digitally. Money in bank within 3-7 days! No need to visit office or submit physical forms."
    },
    {
      question: "What if my employer is not depositing EPF?",
      answer: "Illegal! (1) Check EPF passbook monthly on EPFO portal, (2) If not deposited, complaint to EPFO regional office or call 1800 118 005, (3) Employer liable for 12% interest + penalty. EPF is mandatory for companies with 20+ employees!"
    },
    {
      question: "Can I close EPF account completely?",
      answer: "Yes, after 2 months of unemployment or at retirement (age 55+). Process: Submit Form 19 (final settlement) online via EPFO portal. Get full balance (EPF + pension withdrawal) in bank within 7 days. But: Once closed, cannot reopen - new job = new account."
    },
    {
      question: "What happens to EPF after death?",
      answer: "Nominee gets: (1) Full EPF balance (yours + employer + interest), (2) Monthly EPS pension for widow/children, (3) EDLI insurance (₹7 Lakh). Must submit death certificate + claim form. TIP: Always update nominee (spouse/child) in EPFO portal!"
    },
    {
      question: "EPF vs PPF vs NPS: Which is best?",
      answer: "Do ALL if possible! EPF: 8.25% + employer contribution (free money!). PPF: 7.1% tax-free + 80C (safe). NPS: 9-12% + extra ₹50K tax benefit (growth). Diversified retirement = EPF (forced savings) + PPF (safety) + NPS (growth) + Equity MF (wealth)!"
    },
    {
      question: "Can NRI withdraw EPF from abroad?",
      answer: "YES! But: (1) If left India 2+ months ago, can withdraw immediately (Form 19), (2) Money sent to NRO account in India, then repatriate to foreign bank, (3) Need TDS certificate (if taxable), (4) 15CA/15CB forms for amounts above ₹5L. Process same via EPFO portal."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="EPF Guide 2025: Check PF Balance Online, Withdrawal Rules, 8.25% Interest | Employee Provident Fund India | MoneyCal"
        description="Complete EPF (Employee Provident Fund) guide: How to check PF balance online via UAN, UMANG app, SMS. Withdrawal rules for house purchase, medical emergency, marriage. Interest rate 8.25% compounded annually. EPS pension calculation. EPF vs VPF. Transfer EPF when changing jobs. Employer contribution 12% + 8.33% EPS. Hindi + English"
        keywords="EPF India 2025, employee provident fund, PF balance check online, UAN activation, EPF withdrawal rules, 8.25% interest, EPS pension, EPF transfer, VPF benefits, how to check PF balance, EPF गाइड"
        url="/learn/insurance-retirement/epf-employee-provident-fund-withdrawal-interest-rate-pf-balance-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Insurance & Retirement</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 6 of 7</span>
                <Link 
                  to="/learn/insurance-retirement"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl shadow-lg">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-teal-600 uppercase tracking-wide">
                  Lesson 6 • 45 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  EPF Complete Guide 2025
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  Check Balance, Withdrawal, 8.25% Interest - EPF गाइड
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-teal-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Master
              </h3>
              <ul className="space-y-2 text-teal-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>How to check PF balance online (UMANG app, EPFO portal, SMS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>EPF contribution: 12% employee + 12% employer = 24% monthly savings!</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Withdrawal rules: Full (retirement), Partial (house, medical, marriage)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>EPS pension calculation: ₹6,000-12,000/month after age 58</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* EPF Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <IndianRupee className="w-8 h-8" />
                🧮 EPF Maturity Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Monthly Basic Salary (₹)</label>
                  <input
                    type="number"
                    value={basicSalary}
                    onChange={(e) => setBasicSalary(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Years of Service</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 font-bold text-xl"
                  />
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Monthly Contribution Breakdown:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/30 rounded-lg p-4">
                    <div className="text-sm opacity-90">Your Contribution (12%)</div>
                    <div className="text-2xl font-bold">₹{monthlyEmployee.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-white/30 rounded-lg p-4">
                    <div className="text-sm opacity-90">Employer (3.67% EPF)</div>
                    <div className="text-2xl font-bold">₹{((basicSalary * 3.67) / 100).toLocaleString('en-IN')}</div>
                  </div>
                  <div className="bg-green-500 rounded-lg p-4">
                    <div className="text-sm opacity-90">Total EPF/month</div>
                    <div className="text-2xl font-bold">₹{((basicSalary * 15.67) / 100).toLocaleString('en-IN')}</div>
                  </div>
                </div>
                <p className="text-sm opacity-75 mt-3">+ Employer pays 8.33% to EPS (pension) separately</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Total Invested</div>
                  <div className="text-3xl font-bold">₹{(totalInvested / 100000).toFixed(1)}L</div>
                  <div className="text-sm opacity-75">Over {years} years</div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">Interest Earned</div>
                  <div className="text-3xl font-bold text-green-300">₹{(totalInterest / 100000).toFixed(1)}L</div>
                  <div className="text-sm opacity-75">@ {interestRate}% p.a.</div>
                </div>

                <div className="bg-green-500 rounded-xl p-6">
                  <div className="text-sm opacity-90 mb-1">At Retirement</div>
                  <div className="text-4xl font-bold">₹{(maturityAmount / 10000000).toFixed(2)}Cr</div>
                  <div className="text-sm opacity-90">Tax-Free!</div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-400 text-gray-900 rounded-xl p-6 text-center">
                <div className="text-sm font-semibold mb-1">Plus EPS Pension</div>
                <div className="text-3xl font-bold">₹{((basicSalary * years) / 70).toLocaleString('en-IN')}/month</div>
                <p className="text-sm">For life after age 58!</p>
              </div>
            </div>
          </motion.section>

          {/* How to Check Balance */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Smartphone className="w-8 h-8 text-blue-600" />
                How to Check PF Balance (3 Easy Methods)
              </h2>

              <div className="space-y-6">
                {/* Method 1 - UMANG */}
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
                    <Smartphone className="w-6 h-6" />
                    Method 1: UMANG App (Easiest!)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <p className="text-gray-800">Download <strong>UMANG app</strong> (Google Play/App Store)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <p className="text-gray-800">Search for <strong>"EPFO"</strong> → Select <strong>"Employee Centric Services"</strong></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <p className="text-gray-800">Login with <strong>UAN + Password</strong> (or Aadhaar OTP)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                      <p className="text-gray-800">Click <strong>"View Passbook"</strong> → See balance + transaction history!</p>
                    </div>
                  </div>
                </div>

                {/* Method 2 - EPFO Portal */}
                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                    <Globe className="w-6 h-6" />
                    Method 2: EPFO Portal (Desktop)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                      <p className="text-gray-800">Visit <a href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/" className="text-blue-600 underline font-semibold" target="_blank" rel="noopener noreferrer">epfindia.gov.in</a></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                      <p className="text-gray-800">Click <strong>"Member e-Sewa"</strong> → Login with UAN + Password</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                      <p className="text-gray-800">Go to <strong>"View"</strong> → <strong>"Passbook"</strong> → Download PDF!</p>
                    </div>
                  </div>
                </div>

                {/* Method 3 - SMS */}
                <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Method 3: SMS (No Internet Needed!)
                  </h3>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-gray-800 mb-2"><strong>Send SMS to:</strong> 7738299899</p>
                    <div className="bg-purple-100 rounded p-3 font-mono text-sm">
                      <strong>Format:</strong> EPFOHO &lt;UAN&gt; ENG
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Example: EPFOHO 101234567890 ENG</p>
                    <p className="text-sm text-gray-600">You'll get balance + last contribution within seconds!</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <AlertTriangle className="w-6 h-6 text-yellow-600 inline mr-2" />
                <strong className="text-yellow-900">Important:</strong>
                <p className="text-yellow-900 mt-2">
                  Your mobile number + Aadhaar must be linked to UAN for these methods to work. Activate UAN on EPFO portal first!
                </p>
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
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Lock className="w-8 h-8 text-green-600" />
                EPF Withdrawal Rules (When & How Much)
              </h2>

              <div className="space-y-6">
                {/* Full Withdrawal */}
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-green-700 mb-3">Full Withdrawal (100%)</h3>
                  <ul className="space-y-3 text-gray-800">
                    <li><strong>At Retirement (Age 55+):</strong> Get full EPF balance (Form 19)</li>
                    <li><strong>After Unemployment (2 months):</strong> If not employed for 2 months, can withdraw full</li>
                    <li><strong>Emigration:</strong> If leaving India permanently, withdraw after submitting documents</li>
                    <li>
                      <strong>Tax-Free If:</strong> 5+ continuous years of service (otherwise taxable)
                      <p className="text-sm text-gray-600 mt-1">Example: Worked 4 years 11 months → Taxable. 5 years 1 month → Tax-free!</p>
                    </li>
                  </ul>
                </div>

                {/* Partial Withdrawal */}
                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-3">Partial Withdrawal (Before Retirement)</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">1. Home Purchase/Construction (90%)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• After 5 years of service</li>
                        <li>• Can withdraw 90% of employee + employer contribution</li>
                        <li>• For purchase/construction of house, home loan repayment</li>
                        <li>• Documents: Sale deed, construction estimate, loan sanction letter</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">2. Medical Emergency (6x Salary or 50%)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• No minimum service period</li>
                        <li>• Max: 6 months basic salary OR 50% of balance (whichever is lower)</li>
                        <li>• For self, spouse, children, parents</li>
                        <li>• Documents: Medical certificate, hospital bills</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">3. Marriage (50% after 7 years)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• After 7 years of service</li>
                        <li>• Can withdraw 50% of employee contribution only</li>
                        <li>• For self, children, siblings' marriage</li>
                        <li>• Documents: Marriage invitation, declaration</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">4. Higher Education (50% after 7 years)</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• After 7 years of service</li>
                        <li>• 50% of employee contribution</li>
                        <li>• For self or children's higher education</li>
                        <li>• Documents: Admission letter, fee receipt</li>
                      </ul>
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
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>24% total savings:</strong> 12% you + 12% employer = ₹12K/month on ₹50K basic!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>8.25% interest:</strong> Tax-free if withdrawn after 5 years service</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Check balance:</strong> UMANG app (easiest), EPFO portal, or SMS to 7738299899</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Partial withdrawal:</strong> 90% for house (5 yrs), 50% for marriage/education (7 yrs)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Transfer, don't withdraw:</strong> When changing jobs, transfer EPF to keep tax-free status!</p>
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
                <Link to="/learn/insurance-retirement/ppf-public-provident-fund-15-year-lock-in-tax-free-returns-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Landmark className="w-8 h-8 text-yellow-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">PPF Guide</h3>
                  <p className="text-sm text-gray-600">7.1% tax-free returns</p>
                </Link>
                <Link to="/learn/insurance-retirement/retirement-planning-india-corpus-calculation-60-years-goal" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Clock className="w-8 h-8 text-orange-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Retirement Planning</h3>
                  <p className="text-sm text-gray-600">₹3 Crore corpus by 60</p>
                </Link>
                <Link to="/calculators/epf-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <IndianRupee className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">EPF Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate maturity</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Course Complete */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-12 h-12" />
              <h3 className="text-3xl font-bold">🎉 Lesson Complete!</h3>
            </div>
            <p className="text-xl mb-6">You've mastered EPF! Final lesson: Will & Estate Planning.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/learn/insurance-retirement"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                Back to Hub
              </Link>
              <Link
                to="/learn/insurance-retirement/will-estate-planning-india-succession-nomination-inheritance-tax"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Next: Will & Estate
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EPFGuide;
