import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronRight, BookOpen, Calculator, FileText,
  FileSpreadsheet, Home, Car, GraduationCap, Briefcase, CreditCard,
  BarChart3, Coins, Shield, Wallet, PiggyBank, Globe, Sparkles, Brain, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { taxationLessons } from '../data/learn/taxationLessons';
import { taxArticlesMeta } from '../data/blogs/tax-articles';

// ALL Learn categories – routes from learn index
const ALL_LEARN_CATEGORIES = [
  { name: 'Money Management', route: '/learn/money-management', icon: Wallet, cls: 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100 text-emerald-600' },
  { name: 'Savings & Bank Products', route: '/learn/savings-bank-products', icon: PiggyBank, cls: 'bg-cyan-50 border-cyan-100 hover:bg-cyan-100 text-cyan-600' },
  { name: 'Investing & Wealth', route: '/learn/investing-wealth', icon: BarChart3, cls: 'bg-purple-50 border-purple-100 hover:bg-purple-100 text-purple-600' },
  { name: 'Insurance & Retirement', route: '/learn/insurance-retirement', icon: Shield, cls: 'bg-red-50 border-red-100 hover:bg-red-100 text-red-600' },
  { name: 'Taxation & Compliance', route: '/learn/taxation-compliance', icon: FileText, cls: 'bg-amber-50 border-amber-100 hover:bg-amber-100 text-amber-600' },
  { name: 'FinTech & Digital Payments', route: '/learn/fintech-digital-payments', icon: Coins, cls: 'bg-blue-50 border-blue-100 hover:bg-blue-100 text-blue-600' },
  { name: 'Business Finance', route: '/learn/business-finance-entrepreneurship', icon: Briefcase, cls: 'bg-lime-50 border-lime-100 hover:bg-lime-100 text-lime-600' },
  { name: 'Advanced Finance', route: '/learn/advanced-specialised-finance', icon: Globe, cls: 'bg-violet-50 border-violet-100 hover:bg-violet-100 text-violet-600' },
  { name: 'Behavioural Finance', route: '/learn/behavioural-finance-money-psychology', icon: Brain, cls: 'bg-fuchsia-50 border-fuchsia-100 hover:bg-fuchsia-100 text-fuchsia-600' },
  { name: 'Loan Basics', route: '/learn/loans', icon: BookOpen, cls: 'bg-blue-50 border-blue-100 hover:bg-blue-100 text-blue-600' },
  { name: 'Home Loans', route: '/learn/home-loans', icon: Home, cls: 'bg-green-50 border-green-100 hover:bg-green-100 text-green-600' },
  { name: 'Personal Loans', route: '/learn/personal-loans', icon: CreditCard, cls: 'bg-purple-50 border-purple-100 hover:bg-purple-100 text-purple-600' },
  { name: 'Vehicle Loans', route: '/learn/vehicle-loans', icon: Car, cls: 'bg-orange-50 border-orange-100 hover:bg-orange-100 text-orange-600' },
  { name: 'Education Loans', route: '/learn/education-loans', icon: GraduationCap, cls: 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100 text-indigo-600' },
  { name: 'Business Loans', route: '/learn/business-loans', icon: Briefcase, cls: 'bg-teal-50 border-teal-100 hover:bg-teal-100 text-teal-600' },
  { name: 'Gold Loans', route: '/learn/gold-loans', icon: Coins, cls: 'bg-yellow-50 border-yellow-100 hover:bg-yellow-100 text-yellow-600' },
  { name: 'Credit Cards', route: '/learn/credit-cards', icon: CreditCard, cls: 'bg-red-50 border-red-100 hover:bg-red-100 text-red-600' },
  { name: 'Credit Score', route: '/learn/credit-score', icon: BarChart3, cls: 'bg-pink-50 border-pink-100 hover:bg-pink-100 text-pink-600' },
];

const TAX_TOOLS = [
  { name: 'STCG vs LTCG Classifier', path: '/tax-tools/stcg-ltcg-classifier', desc: 'Capital gains category' },
  { name: 'Equity Tax Estimator', path: '/tax-tools/equity-tax-estimator', desc: 'Equity tax by AY' },
  { name: 'Dividend Tax Estimator', path: '/tax-tools/dividend-tax-estimator', desc: 'Dividend tax 2020+' },
  { name: 'Loss Carry Forward', path: '/tax-tools/loss-carry-forward-estimator', desc: 'Loss carry forward' },
  { name: 'Turnover Calculator ITR', path: '/tax-tools/turnover-calculator-itr', desc: 'ITR form turnover' },
  { name: 'Intraday vs Delivery Tax', path: '/tax-tools/intraday-vs-delivery-tax-calculator', desc: 'Trading tax compare' },
  { name: 'Section 80C Tally', path: '/tax-tools/section-80c-tally-analyzer', desc: '80C optimization' },
  { name: 'Short-Term Loss Benefit', path: '/tax-tools/short-term-capital-loss-benefit-estimator', desc: 'STCG loss benefits' },
  { name: 'Partial Selloff Tax', path: '/tax-tools/tax-on-partial-selloff-calculator', desc: 'Partial sale tax' },
  { name: 'LTCG Exemption Tool', path: '/tax-tools/offset-ltcg-with-annual-exemptions-tool', desc: '₹1L LTCG exemption' },
  { name: 'Dividend Reinvestment Tax', path: '/tax-tools/dividend-reinvestment-tax-comparison', desc: 'Dividend tax compare' },
  { name: 'Bonus Shares Tax', path: '/tax-tools/tax-on-bonus-shares-tracker', desc: 'Bonus shares tax' },
  { name: 'TDS Impact Visualizer', path: '/tax-tools/tds-impact-visualizer-on-gains', desc: 'TDS on gains' },
  { name: 'Debt Fund Tax', path: '/tax-tools/debt-fund-tax-calculator', desc: 'Debt fund tax' },
  { name: 'NPS Tax Benefit', path: '/tax-tools/nps-tax-benefit-vs-growth-estimator', desc: 'NPS vs growth' },
  { name: 'Tax Filing Deadline', path: '/tax-tools/tax-filing-deadline-reminder-widget', desc: 'ITR deadlines' },
  { name: 'ITR Form Helper', path: '/tax-tools/itr-form-type-helper', desc: 'Choose ITR form' },
  { name: 'Tax Loss Harvesting', path: '/tax-tools/tax-loss-harvesting-calculator', desc: 'Loss harvesting' },
  { name: 'CSV to Tax Summary', path: '/tax-tools/csv-to-tax-summary-tool', desc: 'Trading CSV to tax' },
  { name: 'ELSS Lock-in vs Benefit', path: '/tax-tools/elss-lockin-vs-tax-benefit-visualizer', desc: 'ELSS analysis' },
  { name: 'PF vs NPS Compare', path: '/tax-tools/pf-vs-nps-tax-growth-comparison', desc: 'Retirement tax' },
  { name: 'Gifted Shares Tax', path: '/tax-tools/gifted-shares-tax-estimator', desc: 'Gift tax' },
  { name: 'Bonus Shares Impact', path: '/tax-tools/bonus-shares-tax-impact-tool', desc: 'Bonus tax' },
  { name: 'Switch MF Tax', path: '/tax-tools/switch-mf-tax-calculator', desc: 'MF switch tax' },
  { name: '80C Bucket Visualizer', path: '/tax-tools/80c-deduction-bucket-visualizer', desc: '80C planning' },
  { name: 'Trader Turnover ITR', path: '/tax-tools/trader-turnover-estimator-itr', desc: 'Trading turnover' },
  { name: 'Intra-Year Redemption', path: '/tax-tools/intra-year-redemption-tax-tracker', desc: 'Multiple redemptions' },
  { name: 'Double Tax Relief', path: '/tax-tools/double-tax-relief-tool', desc: 'DTAA relief' },
  { name: 'Tax-Efficient Withdrawal', path: '/tax-tools/tax-efficient-withdrawal-planner', desc: 'Withdrawal planning' },
  { name: 'PF Withdrawal Tax', path: '/tax-tools/pf-withdrawal-tax-preview', desc: 'PF withdrawal' },
  { name: 'High Dividend Tax', path: '/tax-tools/high-dividend-tax-impact-calculator', desc: 'Dividend tax' },
  { name: 'Tax Year Compare', path: '/tax-tools/tax-year-comparison-slider-tool', desc: 'FY comparison' },
  { name: 'Short-Term Loss Offset', path: '/tax-tools/short-term-loss-offset-visualizer', desc: 'Loss offset' },
  { name: 'Exit Strategy Tax', path: '/tax-tools/exit-strategy-tax-visualizer', desc: 'Exit planning' },
  { name: 'HRA vs LTA Compare', path: '/tax-tools/hra-vs-lta-tax-comparison-tool', desc: 'HRA LTA' },
  { name: 'Old vs New Regime', path: '/tax-tools/old-vs-new-tax-regime-helper', desc: 'Regime choice' },
];

const TaxSimplifier: React.FC = () => {
  const [learnOpen, setLearnOpen] = useState(true);
  const [allLearnOpen, setAllLearnOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(true);
  const [blogsOpen, setBlogsOpen] = useState(true);

  return (
    <>
      <SEOHelmet
        title="Tax Simplifier - Complete Tax Knowledge, Tools & Learn India 2025 | MoneyCal"
        description="Tax Simplifier: All tax learn lessons, 36+ tax tools, 60+ tax articles. Income tax, GST, capital gains, 80C, ITR filing. Hindi + English. Free. SEO friendly."
        keywords="tax simplifier, tax learn india, tax tools, income tax guide, GST guide, capital gains tax, 80C deductions, ITR filing, कर सरलीकरण, आयकर गाइड"
        url="/tax-simplifier"
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tax Simplifier
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              कर सरलीकरण – सभी टैक्स ज्ञान, टूल्स और लेख एक जगह
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Complete tax knowledge hub: Tax Learn lessons, 36+ tax tools, 60+ tax articles. Basic to advanced. Hindi + English. Free.
            </p>
            <a
              href="/calculators/income-tax-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-xl font-bold text-lg hover:bg-amber-600 transition-colors shadow-lg"
            >
              <IndianRupee className="w-6 h-6" />
              Income Tax Calculator
            </a>
          </div>

          {/* Tax Learn Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden mb-6">
            <button
              onClick={() => setLearnOpen(!learnOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-amber-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Tax Learn</h2>
                  <p className="text-sm text-gray-600">कर सीखें – Income Tax, 80C, ITR, TDS, Capital Gains</p>
                </div>
              </div>
              {learnOpen ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronRight className="w-6 h-6 text-gray-500" />}
            </button>
            <AnimatePresence>
              {learnOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-amber-100"
                >
                  <div className="p-6 grid md:grid-cols-2 gap-4">
                    {taxationLessons.map((lesson, i) => (
                      <Link
                        key={lesson.id}
                        to={`/learn/taxation-compliance/${lesson.slug}`}
                        className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 hover:bg-amber-100/70 border border-amber-100 transition-colors"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-sm flex items-center justify-center">{i + 1}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{lesson.titleHindi}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* ALL Learn Categories Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden mb-6">
            <button
              onClick={() => setAllLearnOpen(!allLearnOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-purple-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">All Learn Categories</h2>
                  <p className="text-sm text-gray-600">18 Categories – 200+ Lessons – Money Management, Loans, Investing, Tax & More</p>
                </div>
              </div>
              {allLearnOpen ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronRight className="w-6 h-6 text-gray-500" />}
            </button>
            <AnimatePresence>
              {allLearnOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-purple-100"
                >
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ALL_LEARN_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.route}
                          to={cat.route}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${cat.cls}`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium text-gray-900 truncate">{cat.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="px-6 pb-6">
                    <Link to="/learn" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                      <BookOpen className="w-5 h-5" />
                      MoneyCal Learn – सभी Categories
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Tax Tools Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden mb-6">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Tax Tools</h2>
                  <p className="text-sm text-gray-600">36+ टैक्स कैलकुलेटर और टूल्स</p>
                </div>
              </div>
              {toolsOpen ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronRight className="w-6 h-6 text-gray-500" />}
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-blue-100"
                >
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {TAX_TOOLS.map((tool) => (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50 hover:bg-blue-100/70 border border-blue-100 transition-colors"
                      >
                        <FileSpreadsheet className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <span className="font-medium text-gray-900 truncate block">{tool.name}</span>
                          <span className="text-xs text-gray-500">{tool.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Tax Blog Articles Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden mb-6">
            <button
              onClick={() => setBlogsOpen(!blogsOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-green-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Tax Articles & Blogs</h2>
                  <p className="text-sm text-gray-600">60+ कर से जुड़े articles – Basic से Advanced</p>
                </div>
              </div>
              {blogsOpen ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronRight className="w-6 h-6 text-gray-500" />}
            </button>
            <AnimatePresence>
              {blogsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-green-100"
                >
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">सभी 60+ tax articles – Basic से Advanced। Proper format, SEO friendly, Hindi + English:</p>
                    <Link
                      to="/blog?category=Tax"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors mb-6"
                    >
                      सभी Tax Articles (Blog Category)
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {taxArticlesMeta.map((article) => (
                        <Link
                          key={article.slug}
                          to={`/blog/${article.slug}`}
                          className="flex flex-col gap-1 p-3 rounded-lg bg-green-50 border border-green-100 hover:border-green-200 hover:bg-green-100/70 transition-colors"
                        >
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">{article.title}</h4>
                          <p className="text-xs text-gray-600 line-clamp-1">{article.titleHindi}</p>
                        </Link>
                      ))}
                    </div>
                    <Link to="/blog/tax-saving-investment-options" reloadDocument className="inline-block mt-4 text-sm text-green-700 font-medium hover:underline">
                      + Best Tax Saving Options 2025 (ELSS, PPF, NPS)
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/tax-tools" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
              Tax Tools Hub
            </Link>
            <Link to="/learn/taxation-compliance" className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700">
              Tax Learn
            </Link>
            <Link to="/calculators/income-tax-calculator" className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
              Income Tax Calculator
            </Link>
            <Link to="/emi-simplifier" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
              EMI Simplifier
            </Link>
            <Link to="/sip-simplifier" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700">
              SIP Simplifier
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxSimplifier;
