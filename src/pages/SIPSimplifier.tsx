import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronRight, BookOpen, Calculator, FileText,
  FileSpreadsheet, TrendingUp, BarChart3, PiggyBank, Wallet,
  Sparkles, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

// SIP & MF focused learn lessons (from investing + RD vs SIP from savings)
const SIP_LEARN_LESSONS = [
  { id: 'mf', slug: 'mutual-funds-complete-guide-sip-nav-expense-ratio-india', title: 'Mutual Funds Complete Guide: SIP, NAV, Expense Ratio', titleHindi: 'म्यूचुअल फंड गाइड: SIP, NAV, व्यय अनुपात', category: 'investing-wealth' },
  { id: 'sip', slug: 'sip-systematic-investment-plan-strategy-india-wealth-building', title: 'SIP Mastery: How to Build ₹1 Crore with Monthly Investments', titleHindi: 'SIP में महारत: मासिक निवेश से ₹1 करोड़', category: 'investing-wealth' },
  { id: 'rd-sip', slug: 'recurring-deposits-rd-vs-sip-monthly-savings-india', title: 'RD vs SIP: Which is Better for Monthly Savings?', titleHindi: 'RD बनाम SIP: मासिक बचत के लिए कौन बेहतर?', category: 'savings-bank-products' },
  { id: 'index', slug: 'index-funds-etfs-nifty-sensex-passive-investing-india', title: 'Index Funds & ETFs: Nifty 50, Sensex - Passive Investing', titleHindi: 'इंडेक्स फंड और ETF: निफ्टी 50, सेंसेक्स', category: 'investing-wealth' },
  { id: 'direct', slug: 'direct-vs-regular-mutual-funds-expense-ratio-comparison-india', title: 'Direct vs Regular Mutual Funds: Save ₹15L', titleHindi: 'डायरेक्ट बनाम रेगुलर म्यूचुअल फंड', category: 'investing-wealth' },
  { id: 'stock', slug: 'stock-market-basics-shares-nse-bse-demat-india', title: 'Stock Market Basics: NSE, BSE, Demat Account', titleHindi: 'शेयर बाजार बेसिक्स: NSE, BSE, डीमैट', category: 'investing-wealth' },
  { id: 'asset', slug: 'asset-allocation-equity-debt-gold-diversification-india', title: 'Asset Allocation: Equity, Debt, Gold - Diversification', titleHindi: 'परिसंपत्ति आवंटन: इक्विटी, डेट, गोल्ड', category: 'investing-wealth' },
  { id: 'mistakes', slug: 'investing-mistakes-to-avoid-panic-selling-timing-market-india', title: 'Top 10 Investing Mistakes: Panic Selling, Timing Market', titleHindi: '10 निवेश गलतियाँ: घबराहट में बेचना', category: 'investing-wealth' },
];

const SIP_TOOLS = [
  { name: 'SIP Calculator', path: '/calculators/sip-calculator', desc: 'Estimate SIP returns & wealth' },
  { name: 'Step-Up SIP Planner', path: '/finance-tools/sip-step-up-planner', desc: 'Increasing SIP over time' },
  { name: 'Lumpsum vs SIP Analyzer', path: '/finance-tools/lumpsum-vs-sip-analyzer', desc: 'Compare lumpsum vs SIP' },
  { name: 'SIP vs SWP Tool', path: '/finance-tools/sip-vs-swp-tool', desc: 'SIP vs Systematic Withdrawal' },
  { name: 'SIP Delay Loss Calculator', path: '/finance-tools/sip-delay-loss-calculator', desc: 'Cost of delaying SIP' },
  { name: 'SIP Missed Payment Loss', path: '/finance-tools/sip-missed-payment-loss-estimator', desc: 'Missed SIP impact' },
  { name: 'SIP Withdrawal Planner', path: '/finance-tools/sip-withdrawal-planner', desc: 'Post-retirement withdrawal' },
  { name: 'SIP Inflation Adjusted', path: '/finance-tools/sip-inflation-adjusted-calculator', desc: 'Inflation-adjusted SIP' },
  { name: 'MF SIP vs Lumpsum Analyzer', path: '/finance-tools/mutual-fund-sip-vs-lumpsum-analyzer', desc: 'MF SIP vs lumpsum' },
  { name: 'Mutual Fund Goal Planner', path: '/finance-tools/mutual-fund-goal-planner', desc: 'Goal-based MF planning' },
  { name: 'Mutual Fund Returns', path: '/calculators/mutual-fund-returns-calculator', desc: 'CAGR & returns' },
  { name: 'Mutual Fund Expense Ratio', path: '/finance-tools/mutual-fund-expense-ratio-calculator', desc: 'Expense ratio impact' },
  { name: 'Mutual Fund Tax Efficiency', path: '/finance-tools/mutual-fund-tax-efficiency-calculator', desc: 'Tax on MF gains' },
  { name: 'FD vs Mutual Fund Return', path: '/finance-tools/fd-vs-mutual-fund-return-tool', desc: 'FD vs MF comparison' },
  { name: 'MF Portfolio Rebalancer', path: '/finance-tools/mutual-fund-portfolio-rebalancer', desc: 'Portfolio rebalance' },
  { name: 'MF Exit Load Calculator', path: '/finance-tools/mutual-fund-exit-load-calculator', desc: 'Exit load charges' },
];

const SIP_ARTICLES = [
  { slug: 'sip-calculator-complete-guide-india-2025', title: 'SIP Calculator Complete Guide India 2025', titleHindi: 'SIP कैलकुलेटर गाइड 2025' },
  { slug: 'sip-step-up-strategy-wealth-building-india-2025', title: 'SIP Step-Up Strategy: Build ₹2 Crore+', titleHindi: 'स्टेप अप SIP रणनीति' },
  { slug: 'sip-vs-lumpsum-investment-india-2025', title: 'SIP vs Lumpsum: Which is Better?', titleHindi: 'SIP बनाम एकमुश्त' },
  { slug: 'mutual-funds', title: 'Mutual Funds Investment Guide 2025', titleHindi: 'म्यूचुअल फंड गाइड 2025' },
  { slug: 'investment-guides', title: 'Complete Investment Guides for Beginners', titleHindi: 'बिगिनर्स के लिए निवेश गाइड' },
  { slug: 'equity-investment-for-beginners', title: 'Equity Investment for Beginners', titleHindi: 'बिगिनर्स के लिए इक्विटी निवेश' },
  { slug: 'tax-saving-investment-options', title: 'Best Tax Saving Investment Options (ELSS, PPF)', titleHindi: 'टैक्स सेविंग निवेश (ELSS, PPF)' },
  { slug: 'calculators', title: 'Financial Calculators Guide (SIP, EMI, Tax)', titleHindi: 'फाइनेंशियल कैलकुलेटर गाइड' },
  { slug: 'core-concepts', title: 'Core Finance Concepts: Compounding, SIP', titleHindi: 'कोर फाइनेंस कॉन्सेप्ट्स' },
];

const ALL_LEARN_CATEGORIES = [
  { name: 'Money Management', route: '/learn/money-management', icon: Wallet, cls: 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100 text-emerald-600' },
  { name: 'Savings & Bank Products', route: '/learn/savings-bank-products', icon: PiggyBank, cls: 'bg-cyan-50 border-cyan-100 hover:bg-cyan-100 text-cyan-600' },
  { name: 'Investing & Wealth', route: '/learn/investing-wealth', icon: BarChart3, cls: 'bg-purple-50 border-purple-100 hover:bg-purple-100 text-purple-600' },
  { name: 'Insurance & Retirement', route: '/learn/insurance-retirement', icon: FileText, cls: 'bg-red-50 border-red-100 hover:bg-red-100 text-red-600' },
  { name: 'Taxation & Compliance', route: '/learn/taxation-compliance', icon: FileText, cls: 'bg-amber-50 border-amber-100 hover:bg-amber-100 text-amber-600' },
];

const SIPSimplifier: React.FC = () => {
  const [learnOpen, setLearnOpen] = useState(true);
  const [allLearnOpen, setAllLearnOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(true);
  const [blogsOpen, setBlogsOpen] = useState(true);

  return (
    <>
      <SEOHelmet
        title="SIP Simplifier - SIP, Mutual Fund Learn, Tools & Articles India 2025 | MoneyCal"
        description="SIP Simplifier: All SIP & mutual fund learn lessons, 16+ SIP calculators, investing articles. SIP Calculator, step-up SIP, lumpsum vs SIP, wealth building. Hindi + English. Free."
        keywords="SIP simplifier, SIP Calculator India, mutual fund guide, systematic investment plan, SIP vs lumpsum, wealth building, एसआईपी सरलीकरण, म्यूचुअल फंड गाइड"
        url="/sip-simplifier"
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              SIP Simplifier
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              एसआईपी सरलीकरण – सभी SIP एवं म्यूचुअल फंड ज्ञान, टूल्स और लेख एक जगह
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Complete SIP & mutual fund knowledge hub: Learn lessons, 16+ SIP calculators, investing articles. Build wealth with systematic investing. Hindi + English. Free.
            </p>
            <Link
              to="/calculators/sip-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-600 transition-colors shadow-lg"
            >
              <IndianRupee className="w-6 h-6" />
              SIP Calculator
            </Link>
          </div>

          {/* SIP Learn Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden mb-6">
            <button
              onClick={() => setLearnOpen(!learnOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-emerald-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">SIP & Mutual Fund Learn</h2>
                  <p className="text-sm text-gray-600">SIP सीखें – बेसिक्स से एडवांस्ड, म्यूचुअल फंड बेसिक्स</p>
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
                  className="border-t border-emerald-100"
                >
                  <div className="p-6 grid md:grid-cols-2 gap-4">
                    {SIP_LEARN_LESSONS.map((lesson, i) => (
                      <Link
                        key={lesson.id}
                        to={`/learn/${lesson.category}/${lesson.slug}`}
                        className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/50 hover:bg-emerald-100/70 border border-emerald-100 transition-colors"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center">{i + 1}</span>
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

          {/* All Learn Categories Section */}
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
                  <p className="text-sm text-gray-600">Money Management, Investing, Tax, Loans – सभी Learn Topics</p>
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

          {/* SIP Tools Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden mb-6">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">SIP & Mutual Fund Tools</h2>
                  <p className="text-sm text-gray-600">16+ SIP कैलकुलेटर और म्यूचुअल फंड टूल्स</p>
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
                    {SIP_TOOLS.map((tool) => (
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

          {/* SIP Articles Section */}
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
                  <h2 className="text-xl font-bold text-gray-900">SIP & Investing Articles</h2>
                  <p className="text-sm text-gray-600">म्यूचुअल फंड, निवेश, SIP से जुड़े लेख</p>
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
                    <p className="text-gray-600 mb-4">सभी SIP और investing articles – Basic से Advanced। Hindi + English:</p>
                    <Link
                      to="/blog?category=Investment"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors mb-6"
                    >
                      सभी Investment Articles (Blog)
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {SIP_ARTICLES.map((article) => (
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/finance-tools" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
              Finance Tools Hub
            </Link>
            <Link to="/learn/investing-wealth" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700">
              Investing Learn
            </Link>
            <Link to="/calculators/sip-calculator" className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
              SIP Calculator
            </Link>
            <Link to="/emi-simplifier" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
              EMI Simplifier
            </Link>
            <Link to="/tax-simplifier" className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700">
              Tax Simplifier
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SIPSimplifier;
