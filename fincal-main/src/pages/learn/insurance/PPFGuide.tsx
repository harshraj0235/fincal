import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, TrendingUp, CheckCircle, Shield, Award,
  AlertTriangle, DollarSign, Calculator, Target, HelpCircle, Zap,
  BarChart3, Layers, Lock, Users, Star, Sparkles, Clock, BadgeCheck,
  PieChart, Percent, IndianRupee, Building, Landmark, CreditCard,
  TrendingDown, Info, Download, Share2, FileText, Calendar, Home
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const PPFGuide: React.FC = () => {
  // PPF Calculator State
  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [interestRate] = useState(7.1);
  const [years] = useState(15);

  // Calculate PPF maturity
  const calculatePPF = () => {
    let balance = 0;
    for (let i = 1; i <= years; i++) {
      balance = (balance + yearlyInvestment) * (1 + interestRate / 100);
    }
    return balance;
  };

  const maturityAmount = calculatePPF();
  const totalInvested = yearlyInvestment * years;
  const totalInterest = maturityAmount - totalInvested;

  const faqData = [
    {
      question: "What is PPF and how does it work?",
      answer: "PPF (Public Provident Fund) is a government-backed long-term savings scheme. Interest: 7.1% compounded annually (100% tax-free!). Lock-in: 15 years. Investment: ₹500-₹1.5L/year. At maturity, get lumpsum (principal + interest tax-free). EEE status: Invest exempt, Interest exempt, Maturity exempt!"
    },
    {
      question: "How much should I invest in PPF annually?",
      answer: "Maximize ₹1.5L/year if you can! Why: (1) Full 80C deduction (save ₹46,500 tax in 30% bracket), (2) Compounding benefit (₹1.5L/year for 15 years @ 7.1% = ₹40.7L!), (3) Use full quota before it expires yearly. If tight budget: Min ₹500/year to keep account active."
    },
    {
      question: "When can I withdraw money from PPF?",
      answer: "Partial withdrawal: From 7th year onwards, once per year, max 50% of balance 4 years ago. Full withdrawal: After 15 years maturity OR premature closure after 5 years (only for medical emergency/higher education - penalty: interest reduced to Post Office savings rate)."
    },
    {
      question: "Can I extend PPF after 15 years?",
      answer: "YES! Two options: (1) With contribution: Extend in blocks of 5 years, continue investing ₹1.5L/year (still gets 80C benefit!). (2) Without contribution: Extend without adding money, existing balance continues to earn 7.1%. Best: Keep extending till age 60 for tax-free compounding!"
    },
    {
      question: "Where to open PPF account?",
      answer: "3 options: (1) Post Office (any branch), (2) Authorized banks (SBI, ICICI, HDFC, PNB, BOB, Canara, Axis), (3) Online via SBI, HDFC netbanking. Documents: Aadhaar, PAN, photo, address proof. Takes 10 minutes. You can have only ONE PPF account (self). Can open separate for minor child."
    },
    {
      question: "What is PPF account maturity period?",
      answer: "Exactly 15 years from end of financial year in which account opened. Example: Opened on Jan 15, 2023 → Matures on March 31, 2038 (15 years + 3 months). After maturity, can withdraw full amount OR extend for 5 more years."
    },
    {
      question: "Can I take loan against PPF?",
      answer: "YES! From 3rd year to 6th year only. Loan amount: Up to 25% of balance 2 years ago. Interest: PPF rate + 1% (8.1% now). Repayment: Within 36 months. After 6th year, no loan (but partial withdrawal available from 7th year)."
    },
    {
      question: "PPF vs FD: Which is better?",
      answer: "PPF wins for long-term! PPF: 7.1% tax-free (effective 10%+ for 30% taxpayer), 15-year lock-in. FD: 7.5% taxable (effective 5.25% after 30% tax), flexible. PPF better for retirement/tax saving. FD better for liquidity/short-term goals."
    },
    {
      question: "Can NRI invest in PPF?",
      answer: "NO! NRIs cannot OPEN new PPF account. But: If you opened PPF as resident, can CONTINUE till maturity even after becoming NRI (but no extension). On maturity, must close account and repatriate money. Alternative for NRIs: NRE FD (6-7% tax-free)."
    },
    {
      question: "What happens to PPF after death?",
      answer: "Nominee gets full balance (principal + interest) tax-free. NO inheritance tax in India! Must submit death certificate + claim form. If no nominee, legal heirs get it as per succession law. TIP: Always add nominee (spouse/child) when opening account!"
    },
    {
      question: "Can I have multiple PPF accounts?",
      answer: "NO! Only ONE PPF account per person. If opened 2nd account (by mistake), it's INVALID - no interest, no tax benefit, only principal returned. BUT: Can open separate PPF for minor child (max ₹1.5L combined in parent+child account for 80C)."
    },
    {
      question: "What is the best date to deposit in PPF?",
      answer: "Deposit by 5th of month for maximum interest! PPF interest calculated on lowest balance between 5th and month-end. Example: Deposit ₹1L on April 1 vs April 10 → April 1 earns interest for full year, April 10 loses 10 days interest (₹192 loss!). Best: Auto-debit on 1st of every month."
    },
    {
      question: "PPF vs NPS: Which is better for retirement?",
      answer: "Use BOTH! PPF: 7.1% guaranteed tax-free, 15-year lock-in, safe. NPS: 9-12% market-linked, lock-in till 60, EXTRA ₹50K tax benefit. Strategy: ₹1.5L in PPF (80C) + ₹50K in NPS (80CCD 1B) = Total ₹2L tax-saving + diversified retirement corpus!"
    },
    {
      question: "Can I transfer PPF account to another bank/post office?",
      answer: "YES! Free of cost. Visit new bank/post office with: (1) Transfer application, (2) Passbook, (3) ID proof. They'll transfer entire balance. Takes 7-10 days. Useful if you relocate cities or want better service."
    },
    {
      question: "How to check PPF balance online?",
      answer: "If account in bank: Login to netbanking → View PPF balance + statement. If in Post Office: Visit IndiaPost ebanking portal, register with account number, view balance. Or: Visit branch with passbook for entry. Balance updated after each deposit + yearly interest credit (March 31)."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="PPF Guide 2025: 7.1% Tax-Free Returns, 15-Year Lock-In, Withdrawal Rules | Public Provident Fund India | MoneyCal"
        description="Complete PPF (Public Provident Fund) guide: 7.1% interest compounded annually (100% tax-free!), investment limits ₹500-₹1.5L/year, 15-year maturity, partial withdrawal from 7th year, extension options, loan facility, 80C tax benefits. How to open PPF account online in SBI/HDFC/Post Office. PPF vs FD vs NPS comparison. Hindi + English"
        keywords="PPF India 2025, public provident fund, 7.1% tax free returns, PPF calculator, PPF withdrawal rules, PPF extension, PPF vs FD, 80C tax benefit, how to open PPF, PPF गाइड"
        url="/learn/insurance-retirement/ppf-public-provident-fund-15-year-lock-in-tax-free-returns-india"
        faqData={faqData}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Insurance & Retirement</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 5 of 7</span>
                <Link 
                  to="/learn/insurance-retirement"
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
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
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                <Landmark className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">
                  Lesson 5 • 40 Minutes • Beginner
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  PPF Complete Guide 2025
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  7.1% Tax-Free Returns, 15-Year Lock-In - PPF गाइड
                </p>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                What You'll Master
              </h3>
              <ul className="space-y-2 text-yellow-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>PPF features: 7.1% interest (100% tax-free!), EEE status explained</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>Investment limits: ₹500-₹1.5L/year, 80C tax benefit (save ₹46,500!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>Withdrawal rules: Partial (7th year), Full (15 years), Loan (3-6 years)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <span>How to open PPF online in 10 minutes (SBI, HDFC, Post Office)</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* PPF Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-2xl p-8 shadow-2xl text-white">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                🧮 PPF Maturity Calculator
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Yearly Investment (₹)</label>
                <input
                  type="range"
                  min="500"
                  max="150000"
                  step="5000"
                  value={yearlyInvestment}
                  onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                  className="w-full mb-2"
                />
                <div className="text-center">
                  <input
                    type="number"
                    value={yearlyInvestment}
                    onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                    className="w-48 px-4 py-3 rounded-lg text-gray-900 font-bold text-2xl text-center"
                  />
                  <p className="text-sm opacity-75 mt-1">Max ₹1.5L/year for full 80C benefit</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
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
                  <div className="text-sm opacity-90 mb-1">Maturity Amount</div>
                  <div className="text-4xl font-bold">₹{(maturityAmount / 100000).toFixed(1)}L</div>
                  <div className="text-sm opacity-90">100% Tax-Free!</div>
                </div>
              </div>

              <div className="bg-yellow-400 text-gray-900 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">💰 Tax Savings:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm">On Investment (80C)</div>
                    <div className="text-2xl font-bold">₹{(yearlyInvestment * 0.3).toLocaleString('en-IN')}/year</div>
                    <p className="text-xs">In 30% tax bracket</p>
                  </div>
                  <div>
                    <div className="text-sm">On Maturity (Tax-Free)</div>
                    <div className="text-2xl font-bold">₹0 Tax!</div>
                    <p className="text-xs">Interest + Principal fully exempt</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Withdrawal Rules Detailed */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                <Lock className="w-8 h-8 text-green-600" />
                PPF Withdrawal Rules (Detailed)
              </h2>

              <div className="space-y-6">
                {/* Partial Withdrawal */}
                <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-green-700 mb-3">Partial Withdrawal (From 7th Year)</h3>
                  <ul className="space-y-3 text-gray-800">
                    <li>
                      <strong>When:</strong> From 7th financial year onwards (not 7th year from opening!)
                      <p className="text-sm text-gray-600 mt-1">Example: Opened April 2020 → Can withdraw from April 2027 onwards</p>
                    </li>
                    <li>
                      <strong>How much:</strong> Maximum 50% of balance 4 years ago OR 50% of previous year balance (whichever is lower)
                      <p className="text-sm text-gray-600 mt-1">Example: Balance in FY 2023 = ₹10L → In FY 2027, can withdraw up to ₹5L</p>
                    </li>
                    <li>
                      <strong>Frequency:</strong> Once per financial year only
                    </li>
                    <li>
                      <strong>Interest impact:</strong> NO penalty! Balance continues to earn 7.1% on remaining amount
                    </li>
                  </ul>
                </div>

                {/* Loan Facility */}
                <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-blue-700 mb-3">Loan Against PPF (3rd-6th Year Only)</h3>
                  <ul className="space-y-3 text-gray-800">
                    <li>
                      <strong>When:</strong> From 3rd year to end of 6th year
                      <p className="text-sm text-gray-600 mt-1">After 6th year, no loan but withdrawal available!</p>
                    </li>
                    <li>
                      <strong>Amount:</strong> Up to 25% of balance at end of 2nd preceding year
                      <p className="text-sm text-gray-600 mt-1">Example: In FY 2025, balance in FY 2023 = ₹5L → Max loan ₹1.25L</p>
                    </li>
                    <li>
                      <strong>Interest:</strong> PPF rate + 1% (currently 8.1%)
                    </li>
                    <li>
                      <strong>Repayment:</strong> Within 36 months, no prepayment penalty
                    </li>
                  </ul>
                </div>

                {/* Premature Closure */}
                <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-r-xl">
                  <h3 className="text-2xl font-bold text-red-700 mb-3">Premature Closure (Before 15 Years)</h3>
                  <ul className="space-y-3 text-gray-800">
                    <li>
                      <strong>Allowed after:</strong> Completion of 5 years
                    </li>
                    <li>
                      <strong>Conditions:</strong> Only for (1) Life-threatening illness of self/spouse/dependent children, (2) Higher education of child
                    </li>
                    <li>
                      <strong>Penalty:</strong> Interest reduced to Post Office Savings rate (4%) - huge loss!
                    </li>
                    <li>
                      <strong>Documents:</strong> Medical certificate from govt hospital OR admission letter from educational institute
                    </li>
                    <li className="bg-white p-3 rounded">
                      <AlertTriangle className="w-5 h-5 text-red-600 inline mr-2" />
                      <strong className="text-red-700">Not Recommended!</strong> On ₹20L balance, you lose ₹6L+ if closed prematurely. Better: Take loan or partial withdrawal.
                    </li>
                  </ul>
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
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-8 h-8" />
                ✅ Key Takeaways
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>7.1% tax-free:</strong> Effective 10%+ return for 30% taxpayer (beats FD!)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>₹1.5L max:</strong> Invest full ₹1.5L for 15 years → Get ₹40.7L tax-free!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Partial withdrawal:</strong> From 7th year, take 50% once per year (no penalty!)</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Extension:</strong> After 15 years, extend in 5-year blocks, keep earning tax-free!</p>
                </div>
                <div className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <p><strong>Best for:</strong> Long-term safe savings, retirement, child education/marriage goals</p>
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
                <Link to="/learn/insurance-retirement/epf-employee-provident-fund-withdrawal-interest-rate-pf-balance-india" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Building className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">EPF Guide</h3>
                  <p className="text-sm text-gray-600">8.25% interest, withdrawal</p>
                </Link>
                <Link to="/calculators/ppf-calculator" className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                  <Calculator className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">PPF Calculator</h3>
                  <p className="text-sm text-gray-600">Calculate maturity</p>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Course Complete */}
          <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-12 h-12" />
              <h3 className="text-3xl font-bold">🎉 Lesson Complete!</h3>
            </div>
            <p className="text-xl mb-6">You've mastered PPF! Now learn about EPF (Employee Provident Fund).</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/learn/insurance-retirement"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-yellow-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                Back to Hub
              </Link>
              <Link
                to="/learn/insurance-retirement/epf-employee-provident-fund-withdrawal-interest-rate-pf-balance-india"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
              >
                Next: EPF Guide
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PPFGuide;