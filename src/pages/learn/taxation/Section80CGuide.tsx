import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Shield, CheckCircle, Target,
  Lightbulb, TrendingUp, XCircle, Award, Clock, DollarSign,
  Zap, AlertTriangle, Calculator, PiggyBank, FileText
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const Section80CGuide: React.FC = () => {
  const [investment, setInvestment] = useState(150000);
  const [taxSlab, setTaxSlab] = useState(30);
  
  const taxSaved = investment * (taxSlab / 100) * 1.04; // Including 4% cess
  const netCost = investment - taxSaved;

  return (
    <>
      <SEOHelmet 
        title="Section 80C Guide: Save ₹46,800 Tax with ₹1.5L Deductions India 2025 | MoneyCal" 
        description="Master Section 80C in Hindi & English. All eligible investments (PPF, ELSS, insurance, FD), how to maximize ₹1.5L limit, best combinations, real examples." 
        keywords="section 80C, tax saving investments, PPF, ELSS, life insurance, 1.5 lakh deduction, 80C गाइड, tax deduction India" 
        url="/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india" 
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">Taxation & Compliance</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">Lesson 2 of 7</span>
                <Link 
                  to="/learn/taxation-compliance/capital-gains-tax-ltcg-stcg-indexation-india-complete-guide"
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                  Lesson 2 • 50 Minutes • All Levels
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Section 80C: Save ₹46,800 Tax Annually!
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  80C गाइड: ₹1.5 लाख निवेश = ₹46,800 टैक्स बचत
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
                  'Master all 8 eligible investments under Section 80C',
                  'Calculate exact tax savings (₹7,800 to ₹46,800 based on slab)',
                  'Choose best combination: PPF + ELSS + EPF for balanced growth',
                  'Avoid common mistakes (life insurance apenas for tax = bad deal)',
                  'Maximize ₹1.5 lakh limit efficiently',
                  'Understand lock-in periods (3-15 years across instruments)'
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-green-900">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Tax Savings Calculator */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-green-600" />
              🧮 Section 80C Tax Savings Calculator
            </h2>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Investment Amount (₹):</label>
                  <select
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                  >
                    <option value={50000}>₹50,000</option>
                    <option value={100000}>₹1,00,000</option>
                    <option value={150000}>₹1,50,000 (Max limit)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Your Tax Slab (%):</label>
                  <select
                    value={taxSlab}
                    onChange={(e) => setTaxSlab(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-lg font-semibold"
                  >
                    <option value={5}>5% (₹3-7 lakh income)</option>
                    <option value={20}>20% (₹7-10 lakh income)</option>
                    <option value={30}>30% (₹10L+ income)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-5 border-2 border-blue-500">
                  <div className="text-sm text-gray-600 mb-1">Investment Amount</div>
                  <div className="text-3xl font-bold text-blue-700">₹{(investment/1000).toFixed(0)}K</div>
                </div>
                <div className="bg-white rounded-lg p-5 border-2 border-green-500">
                  <div className="text-sm text-gray-600 mb-1">Tax Saved (incl. 4% cess)</div>
                  <div className="text-3xl font-bold text-green-700">₹{taxSaved.toFixed(0).toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-lg p-5 border-2 border-purple-500">
                  <div className="text-sm text-gray-600 mb-1">Net Cost (After Tax Benefit)</div>
                  <div className="text-3xl font-bold text-purple-700">₹{netCost.toFixed(0).toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-4 bg-green-100 rounded-lg p-4">
                <strong className="text-green-900">💰 Real Cost: You invest ₹{(investment/1000).toFixed(0)}K pero effective cost is apenas ₹{(netCost/1000).toFixed(0)}K!</strong>
                <p className="text-sm text-gray-600 mt-2">
                  Tax benefit = {((taxSaved/investment)*100).toFixed(1)}% instant return. 
                  Plus investment grows at 7-15% annually. Double benefit!
                </p>
              </div>
            </div>
          </motion.section>

          {/* All 80C Investment Options Detailed */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              💰 8 Eligible Investments Under Section 80C
            </h2>

            <div className="space-y-6">
              {[
                {
                  name: 'PPF (Public Provident Fund)',
                  return: '7.1% (tax-free!)',
                  lock: '15 years',
                  minMax: '₹500 - ₹1.5L/year',
                  pros: ['Completely tax-free returns (EEE status)', 'Safest option (government-backed)', 'Partial withdrawal after 7 years', 'Loan available after 3 years'],
                  cons: ['Long 15-year lock-in', 'Low returns (apenas 7.1%, lower than mutual funds)', 'Cannot invest >₹1.5L annually'],
                  bestFor: 'Conservative investors, retirement planning, those in 30% tax bracket',
                  example: 'Invest ₹1.5L annually for 15 years. Corpus: ₹40.7 lakh (tax-free!). Continues to earn 7.1% post-maturity.',
                  color: 'blue'
                },
                {
                  name: 'ELSS (Equity Linked Savings Scheme)',
                  return: '12-15% (average)',
                  lock: '3 years (shortest!)',
                  minMax: '₹500 - No upper limit',
                  pros: ['Highest returns (12-15% average)', 'Shortest lock-in (apenas 3 years)', 'Unlimited investment (though 80C limit is ₹1.5L)', 'LTCG tax apenas 10% above ₹1L/year'],
                  cons: ['Market-linked (can fall 30-50% short term)', 'Returns not guaranteed', 'Need 5-10 year horizon for good returns'],
                  bestFor: 'Young investors (<40 age), high risk appetite, 5+ year investment horizon',
                  example: '₹1.5L annual SIP in ELSS for 15 years @ 12% = ₹49.5 lakh! (vs PPF ₹40.7L). Extra ₹9L wealth!',
                  color: 'green'
                },
                {
                  name: 'Life Insurance Premium',
                  return: '5-7% (traditional), -5% to 0% (term)',
                  lock: 'Policy term (10-30 years)',
                  minMax: 'Upto 10% of sum assured',
                  pros: ['Life cover + tax benefit combo', `Forced savings (can't withdraw)`, 'Term insurance cheapest (₹1Cr cover = ₹15K premium)'],
                  cons: ['Traditional policies have low returns (5-7%)', 'High charges eat returns', 'Term insurance gives zero returns (apenas insurance, no maturity)'],
                  bestFor: 'Term insurance ONLY for life cover. Avoid traditional/endowment policies!',
                  example: '₹1Cr term insurance costs ₹15K/year (₹4,680 tax saved @ 30% slab). Net cost: ₹10,320 for ₹1Cr cover!',
                  color: 'orange'
                },
                {
                  name: 'EPF (Employee Provident Fund)',
                  return: '8.25%',
                  lock: 'Till retirement (58+ age)',
                  minMax: 'Auto-deducted (12% of basic salary)',
                  pros: ['Auto-deducted (no discipline needed)', 'Employer contributes 12% extra (free money!)', 'Tax-free returns (EEE status)', 'Safe, government-backed'],
                  cons: ['Locked till retirement', 'Cannot control investment amount', 'Withdrawal before 5 years taxable'],
                  bestFor: 'All salaried employees (mandatory contribution)',
                  example: '₹40K salary → ₹4,800 monthly EPF (₹57,600/year). Employer adds ₹57,600 (total ₹1.15L/year growing @ 8.25%!)',
                  color: 'purple'
                },
                {
                  name: 'NSC (National Savings Certificate)',
                  return: '7.7%',
                  lock: '5 years',
                  minMax: '₹1,000 - No limit',
                  lock: '5 years',
                  pros: ['Safe (post office, government-backed)', 'Offline option (no demat/online needed)', 'Can use as collateral for loans'],
                  cons: ['Low returns (7.7%)', 'Interest taxable (apenas principal gets 80C)', '5-year lock-in'],
                  bestFor: 'Senior citizens, those without bank access, rural investors',
                  example: '₹1L invested → maturity ₹1.45L after 5 years. Interest taxable pero principal gets 80C deduction.',
                  color: 'yellow'
                },
                {
                  name: '5-Year Bank FD (Tax-Saving FD)',
                  return: '6-7%',
                  lock: '5 years (strict)',
                  minMax: '₹100 - No limit',
                  pros: ['Safe (bank deposit)', 'Fixed guaranteed returns', 'Available at all banks'],
                  cons: ['Lowest returns (6-7%)', 'Interest fully taxable (no EEE benefit)', 'Cannot break before 5 years (emergency issue)'],
                  bestFor: 'Ultra-conservative investors, seniors wanting guaranteed income',
                  example: '₹1L FD @ 7% for 5 years = ₹1.40L. Pero interest ₹40K is taxable (₹12,480 tax @ 30% slab). Net: ₹1.27L apenas!',
                  color: 'red'
                },
                {
                  name: 'Sukanya Samriddhi Yojana (Girl Child)',
                  return: '8.2% (tax-free!)',
                  lock: '21 years (or marriage after 18)',
                  minMax: '₹250 - ₹1.5L/year',
                  pros: ['Highest interest rate (8.2%!)', 'Tax-free returns (EEE)', `Secures daughter's future (education/marriage)`, 'Partial withdrawal allowed for education'],
                  cons: ['Long 21-year lock-in', 'Apenas for girl child &lt;10 years age', 'Max 2 girls per family'],
                  bestFor: 'Parents with daughter <10 years age',
                  example: '₹1.5L annual investment for 15 years @ 8.2% = ₹65.9 lakh maturity (tax-free!). Beats PPF by ₹25L!',
                  color: 'pink'
                },
                {
                  name: 'Home Loan Principal Repayment',
                  return: 'Saves loan interest (8-10%)',
                  lock: 'Loan tenure (15-30 years)',
                  minMax: 'Principal portion of EMI',
                  pros: ['Get deduction for home you are anyway buying', 'Interest portion separately deductible under 24(b) (₹2L extra)', 'Asset creation (own house)'],
                  cons: ['Need to have home loan first', 'Apenas principal repayment gets 80C (interest is separate)', 'Property must be self-occupied'],
                  bestFor: 'Anyone with home loan',
                  example: 'EMI ₹30K/month. ₹15K principal + ₹15K interest. Principal ₹1.8L/year gets 80C. Interest ₹1.8L gets 24(b). Total ₹3.6L deduction!',
                  color: 'indigo'
                }
              ].map((item, i) => (
                <div key={i} className={`rounded-xl p-6 border-l-4 ${
                  item.color === 'blue' ? 'bg-blue-50 border-blue-500' :
                  item.color === 'green' ? 'bg-green-50 border-green-500' :
                  item.color === 'orange' ? 'bg-orange-50 border-orange-500' :
                  item.color === 'purple' ? 'bg-purple-50 border-purple-500' :
                  item.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
                  item.color === 'red' ? 'bg-red-50 border-red-500' :
                  item.color === 'pink' ? 'bg-pink-50 border-pink-500' :
                  'bg-indigo-50 border-indigo-500'
                }`}>
                  <div className="mb-4">
                    <strong className="text-2xl text-gray-900 block mb-2">
                      {i + 1}. {item.name}
                    </strong>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div className="bg-white rounded p-2">
                        <div className="text-xs text-gray-600">Returns</div>
                        <div className="font-bold text-green-700">{item.return}</div>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="text-xs text-gray-600">Lock-in</div>
                        <div className="font-bold text-orange-700">{item.lock}</div>
                      </div>
                      <div className="bg-white rounded p-2 col-span-2">
                        <div className="text-xs text-gray-600">Investment Range</div>
                        <div className="font-bold text-blue-700">{item.minMax}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <strong className="text-green-900 block mb-2 text-sm">✅ Pros:</strong>
                      <ul className="space-y-1 text-xs text-gray-700">
                        {item.pros.map((pro, j) => (
                          <li key={j} className="flex items-start gap-1">
                            <span className="text-green-600">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <strong className="text-red-900 block mb-2 text-sm">❌ Cons:</strong>
                      <ul className="space-y-1 text-xs text-gray-700">
                        {item.cons.map((con, j) => (
                          <li key={j} className="flex items-start gap-1">
                            <span className="text-red-600">•</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-3">
                    <strong className="text-gray-900 block mb-1 text-sm">🎯 Best For:</strong>
                    <p className="text-gray-700 text-sm">{item.bestFor}</p>
                  </div>

                  <div className="bg-blue-100 rounded-lg p-4">
                    <strong className="text-blue-900 block mb-1 text-sm">💰 Real Example:</strong>
                    <p className="text-gray-700 text-sm">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Smart Combinations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🎯 Smart 80C Combinations (How to Invest ₹1.5L)
            </h2>

            <div className="space-y-6">
              {[
                {
                  profile: 'Young Investor (Age 25-35, Aggressive)',
                  combo: '₹1L ELSS + ₹50K PPF',
                  why: 'ELSS gives highest returns (12-15%). PPF adds safety net. Balanced pero growth-focused.',
                  returns: '15Y: ELSS ₹1L → ₹33L, PPF ₹50K → ₹13.5L. Total: ₹46.5L!'
                },
                {
                  profile: 'Mid-Career (Age 35-45, Moderate)',
                  combo: '₹60K ELSS + ₹60K PPF + ₹30K EPF',
                  why: 'Balanced: 40% equity (ELSS), 40% safe (PPF), 20% auto (EPF). Moderate risk.',
                  returns: '15Y: ELSS ₹60K → ₹19.8L, PPF ₹60K → ₹16.2L, EPF ₹30K → ₹8.8L. Total: ₹44.8L'
                },
                {
                  profile: 'Conservative (Age 45-55, Low Risk)',
                  combo: '₹1L PPF + ₹50K NSC/FD',
                  why: 'Zero equity risk. PPF 7.1% + NSC/FD 7-7.7%. Safe, guaranteed returns.',
                  returns: '10Y: PPF ₹1L → ₹20.3L, NSC ₹50K → ₹10.5L. Total: ₹30.8L (safe!)'
                },
                {
                  profile: 'Parent with Girl Child (<10 age)',
                  combo: '₹1L Sukanya + ₹50K ELSS',
                  why: `Sukanya 8.2% tax-free + ELSS growth. Secures daughter's education/marriage.`,
                  returns: '15Y: Sukanya ₹1L → ₹43.9L, ELSS ₹50K → ₹16.5L. Total: ₹60.4L (₹44L tax-free!)'
                },
                {
                  profile: 'Home Loan Holder',
                  combo: 'Home Loan Principal (Auto) + ₹50K ELSS',
                  why: 'Principal repayment auto-gets 80C. Add ELSS for growth. Plus ₹2L interest deduction (24b).',
                  returns: 'Principal ₹1L deduction + Interest ₹2L deduction = ₹3L total deduction! Tax saved: ₹93,600 (30% slab)'
                }
              ].map((strategy, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-300">
                  <strong className="text-xl text-blue-900 block mb-3">{strategy.profile}</strong>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1"><strong>Recommended Combo:</strong></p>
                      <p className="font-bold text-lg text-blue-700">{strategy.combo}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1"><strong>Why This Works:</strong></p>
                      <p className="text-sm text-gray-700">{strategy.why}</p>
                    </div>
                  </div>
                  <div className="bg-green-100 rounded-lg p-4 mt-4">
                    <strong className="text-green-900 text-sm">💰 Expected Returns:</strong>
                    <p className="text-gray-700 text-sm mt-1">{strategy.returns}</p>
                  </div>
                </div>
              ))}
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
              ⚠️ 7 Section 80C Mistakes to Avoid
            </h2>

            <div className="space-y-4">
              {[
                {
                  mistake: 'Buying Life Insurance ONLY for Tax Saving',
                  why: 'Traditional life insurance policies have 5-7% returns + high charges. Loses to ELSS (12-15%) by ₹10-15L over 20 years!',
                  fix: 'Buy cheap term insurance (₹1Cr cover = ₹15K). Invest remaining ₹1.35L in ELSS. Better returns + better cover!'
                },
                {
                  mistake: 'Not Using Full ₹1.5L Limit',
                  why: 'Invest apenas ₹80K → save ₹25K tax (30% slab). Missed ₹70K investment → missed ₹22K tax saving annually = ₹3.3L over 15 years!',
                  fix: 'Max out ₹1.5L limit. If short on money, start ₹12.5K/month SIP in ELSS. Discipline builds wealth!'
                },
                {
                  mistake: 'Investing in Last Month (March Rush)',
                  why: 'March rush = panic decisions. Buy bad LIC policy for ₹1.5L in haste. Stuck for 20 years with 5% returns!',
                  fix: 'Plan in April. Start monthly SIPs (₹12.5K/month in ELSS). Spreads over 12 months, better averaging.'
                },
                {
                  mistake: 'Choosing 5-Year FD Over ELSS',
                  why: 'FD: 7% taxable returns = 4.9% post-tax (30% slab). ELSS: 12% tax-free (till ₹1L). FD ₹1.5L → ₹2.1L. ELSS → ₹2.64L. Loss: ₹54K!',
                  fix: 'Use FD apenas if ultra-conservative. Otherwise ELSS beats FD by massive margin over 5-10 years.'
                },
                {
                  mistake: 'Forgetting EPF is Auto-Covered',
                  why: 'EPF deduction ₹50K already happening. Buy ₹1.5L insurance thinking you need 80C. Pero EPF already covered ₹50K! Wasted ₹50K on bad policy.',
                  fix: 'Check Form 16. EPF auto-counts in 80C. Apenas invest remaining (₹1.5L - EPF amount) in ELSS/PPF.'
                },
                {
                  mistake: 'Not Considering Lock-in Periods',
                  why: 'Invested entire ₹1.5L in PPF (15 years). Emergency after 5 years, cannot withdraw! Forced to take loan @ 12% when your own money locked @ 7%!',
                  fix: 'Diversify lock-ins: ₹50K ELSS (3Y) + ₹50K PPF (15Y) + ₹50K liquid. Emergency? ELSS available after 3 years.'
                },
                {
                  mistake: 'Ignoring Sukanya for Daughter',
                  why: 'Daughter 8 years old. Invested ₹1.5L in PPF (7.1%). Missed Sukanya (8.2% tax-free, 21Y). Opportunity cost: ₹8-10L over 21 years!',
                  fix: 'Have daughter <10 age? Sukanya is BEST 80C option. Highest rate (8.2%) + tax-free + secures future!'
                }
              ].map((item, i) => (
                <div key={i} className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    <strong className="text-lg text-red-900">{item.mistake}</strong>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <strong className="text-red-900 text-sm block mb-1">😱 Why It's Bad:</strong>
                      <p className="text-gray-700 text-sm">{item.why}</p>
                    </div>
                    <div className="bg-green-100 rounded-lg p-4">
                      <strong className="text-green-900 text-sm block mb-1">✅ How to Fix:</strong>
                      <p className="text-gray-700 text-sm">{item.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
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
              💡 Pro 80C Tips (Save Extra Tax!)
            </h2>

            <div className="space-y-4">
              {[
                'Combine with 80CCD(1B): After ₹1.5L in 80C, invest ₹50K in NPS for EXTRA ₹15,600 tax saving (30% slab). Total: ₹62,400 saved!',
                `Check Form 16: EPF auto-deducted might already fill ₹60-80K of 80C limit. Don't over-invest thinking you need full ₹1.5L!`,
                'Start Early (April): ₹12.5K monthly SIP better than ₹1.5L lump sum in March. Better returns due to rupee cost averaging.',
                'Home Loan? Use It!: Principal repayment gets 80C + interest gets 24(b) ₹2L deduction. Combined ₹3.5L deduction possible!',
                'Direct ELSS Plans: Regular plans have 1% higher expense ratio. Over 20 years, direct plans give ₹5-8L extra! Always choose direct.',
                'PPF + Sukanya Both?: If 2 daughters, open 2 Sukanya accounts (₹1.5L each = ₹3L total). Mother/father can have separate PPF (₹1.5L each = ₹3L). Combined ₹6L annual deduction possible!',
                'Avoid ULIP/Endowment: These give apenas 5-7% returns vs ELSS 12-15%. High charges eat returns. Never mix insurance with investment!',
                `Track Annually: Review which investments used for 80C. Don't accidentally invest ₹2L thinking limit is ₹2L (it's ₹1.5L!). Excess ₹50K gets no deduction.`
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

          {/* Action Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8" />
              ✅ Your 80C Action Plan
            </h2>

            <div className="space-y-3">
              {[
                'Check Form 16: How much EPF already deducted? (Subtract from ₹1.5L limit)',
                'Choose combo: ELSS (growth) + PPF (safety) ideal for most investors',
                'If girl child <10: Open Sukanya Samriddhi (8.2% tax-free beats everything!)',
                `Start ₹12.5K monthly ELSS SIP (₹1.5L annual). Don't wait till March!`,
                'Have home loan? Check principal repayment amount (auto-gets 80C benefit)',
                'Open PPF account online (SBI, ICICI, post office). Invest ₹50K/year minimum.',
                'Avoid traditional life insurance for 80C. Buy cheap term + invest in ELSS instead.',
                'Add NPS ₹50K for 80CCD(1B) extra deduction (after using ₹1.5L 80C limit)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  <p className="text-white pt-1">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/30 rounded-xl p-5">
              <p className="text-white text-lg">
                <strong>🎯 Goal:</strong> Save ₹46,800 tax annually (30% slab) by maxing ₹1.5L limit. 
                Over 30 years, that's ₹14L tax saved + ₹40-60L wealth created through investments. 
                <strong> Section 80C is FREE MONEY - use it!</strong>
              </p>
            </div>
          </motion.section>

          {/* Next Lesson */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Next: Capital Gains Tax Complete Guide</h3>
            <p className="mb-6 text-purple-100">
              Learn LTCG vs STCG, indexation benefit, how to save tax on stock/mutual fund profits, 
              tax harvesting strategies (sell before ₹1L limit!)
            </p>
            <Link
              to="/learn/taxation-compliance/capital-gains-tax-ltcg-stcg-indexation-india-complete-guide"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Next Lesson: Capital Gains Tax
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section80CGuide;
