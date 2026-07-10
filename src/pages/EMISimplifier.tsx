import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronRight, BookOpen, Calculator, FileText,
  FileSpreadsheet, Home, Car, CreditCard, Wallet, Building,
  BarChart3, PiggyBank, Sparkles, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

// EMI & Loan focused learn lessons
const EMI_LEARN_LESSONS = [
  { id: 'emi', slug: 'what-is-emi', title: 'What Is EMI? Understanding How It Works', titleHindi: 'EMI क्या है? यह कैसे काम करता है', category: 'loans' },
  { id: 'loan-basics', slug: 'what-is-loan', title: 'What Is a Loan? Types and Examples', titleHindi: 'लोन क्या है? प्रकार और उदाहरण', category: 'loans' },
  { id: 'types', slug: 'types-of-loans', title: 'Types of Loans in India - Complete Guide', titleHindi: 'भारत में लोन के प्रकार', category: 'loans' },
  { id: 'home-basics', slug: 'what-is-home-loan', title: 'Home Loan Basics: Everything You Need', titleHindi: 'होम लोन बेसिक्स', category: 'home-loans' },
  { id: 'home-emi', slug: 'emi-calculator-guide', title: 'Home Loan EMI Calculator Guide', titleHindi: 'होम लोन EMI गाइड', category: 'home-loans' },
  { id: 'personal', slug: 'what-is-personal-loan', title: 'What Is Personal Loan? Eligibility', titleHindi: 'पर्सनल लोन क्या है?', category: 'personal-loans' },
  { id: 'car', slug: 'car-loan-basics', title: 'Car Loan Basics: Interest, EMI, Documents', titleHindi: 'कार लोन बेसिक्स', category: 'vehicle-loans' },
  { id: 'prepayment', slug: 'prepayment-foreclosure', title: 'Home Loan Prepayment & Foreclosure', titleHindi: 'होम लोन प्रीपेमेंट', category: 'home-loans' },
  { id: 'eligibility', slug: 'home-loan-eligibility', title: 'Home Loan Eligibility Criteria', titleHindi: 'होम लोन पात्रता', category: 'home-loans' },
  { id: 'interest', slug: 'simple-vs-compound-interest', title: 'Simple vs Compound Interest on Loans', titleHindi: 'साधारण बनाम चक्रवृद्धि ब्याज', category: 'loans' },
];

const EMI_TOOLS = [
  { name: 'EMI Calculator', path: '/calculators/emi-calculator', desc: 'Reduce balance EMI, amortization' },
  { name: 'Loan EMI Calculator', path: '/loan-tools/emi-calculator', desc: 'Detailed EMI breakdown' },
  { name: 'Home Loan Calculator', path: '/calculators/home-loan-calculator', desc: 'Home loan EMI & tenure' },
  { name: 'Personal Loan Calculator', path: '/calculators/personal-loan-calculator', desc: 'Personal loan EMI' },
  { name: 'Car Loan EMI', path: '/calculators/car-loan-emi-calculator', desc: 'Vehicle loan EMI' },
  { name: 'Flat Rate EMI Calculator', path: '/loan-tools/flat-rate-calculator', desc: 'Flat vs reducing balance' },
  { name: 'Prepayment Calculator', path: '/loan-tools/prepayment-calculator', desc: 'Extra payment impact' },
  { name: 'Loan Comparison', path: '/calculators/loan-comparison-calculator', desc: 'Compare multiple loans' },
  { name: 'Amortization Schedule', path: '/loan-tools/amortization-schedule-viewer', desc: 'Principal-interest breakup' },
  { name: 'Loan Affordability', path: '/loan-tools/loan-affordability', desc: 'How much loan you can afford' },
  { name: 'Debt Consolidation', path: '/loan-tools/debt-consolidation-calculator', desc: 'Merge multiple loans' },
  { name: 'Refinancing Calculator', path: '/loan-tools/refinancing-calculator', desc: 'Break-even, savings' },
  { name: 'Debt Snowball vs Avalanche', path: '/loan-tools/debt-strategies', desc: 'Debt payoff strategies' },
  { name: 'Loan Eligibility', path: '/calculators/loan-eligibility', desc: 'Check loan eligibility' },
];

const EMI_ARTICLES = [
  { slug: 'best-emi-calculator-india-2025-free-online-tool-guide', title: 'Best EMI Calculator India 2025: Free Online Tool', titleHindi: 'सर्वश्रेष्ठ EMI कैलकुलेटर भारत 2025' },
  { slug: 'emi-calculator-complete-guide-india-2025', title: 'EMI Calculator Complete Guide India 2025', titleHindi: 'EMI कैलकुलेटर गाइड 2025' },
  { slug: 'home-loan-emi-calculation-formula-india-2025', title: 'Home Loan EMI Calculation Formula India', titleHindi: 'होम लोन EMI फॉर्मूला' },
  { slug: 'personal-loan-emi-vs-home-loan-india-2025', title: 'Personal Loan vs Home Loan EMI Comparison', titleHindi: 'पर्सनल लोन बनाम होम लोन EMI' },
  { slug: 'calculators', title: 'Financial Calculators Guide (EMI, SIP, Tax)', titleHindi: 'फाइनेंशियल कैलकुलेटर गाइड' },
  { slug: 'core-concepts', title: 'Core Finance Concepts: EMI, Interest', titleHindi: 'कोर फाइनेंस कॉन्सेप्ट्स' },
];

const ALL_LEARN_CATEGORIES = [
  { name: 'Loans Basics', route: '/learn/loans', icon: CreditCard, cls: 'bg-blue-50 border-blue-100 hover:bg-blue-100 text-blue-600' },
  { name: 'Home Loans', route: '/learn/home-loans', icon: Home, cls: 'bg-green-50 border-green-100 hover:bg-green-100 text-green-600' },
  { name: 'Personal Loans', route: '/learn/personal-loans', icon: Wallet, cls: 'bg-purple-50 border-purple-100 hover:bg-purple-100 text-purple-600' },
  { name: 'Vehicle Loans', route: '/learn/vehicle-loans', icon: Car, cls: 'bg-orange-50 border-orange-100 hover:bg-orange-100 text-orange-600' },
  { name: 'Money Management', route: '/learn/money-management', icon: PiggyBank, cls: 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100 text-emerald-600' },
  { name: 'Investing & Wealth', route: '/learn/investing-wealth', icon: BarChart3, cls: 'bg-indigo-50 border-indigo-100 hover:bg-indigo-100 text-indigo-600' },
];

const EMISimplifier: React.FC = () => {
  const [learnOpen, setLearnOpen] = useState(true);
  const [allLearnOpen, setAllLearnOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(true);
  const [blogsOpen, setBlogsOpen] = useState(true);

  return (
    <>
      <SEOHelmet
        title="EMI Simplifier - EMI Calculator, Loan Learn, Tools & Articles India 2025 | MoneyCal"
        description="EMI Simplifier: All EMI & loan learn lessons, 15+ EMI calculators, home loan, personal loan, car loan tools. EMI formula, prepayment, refinancing. Hindi + English. Free."
        keywords="EMI simplifier, EMI Calculator India, home loan EMI, personal loan EMI, EMI formula, loan Calculator, किश्त सरलीकरण, ईएमआई कैलकुलेटर"
        url="/emi-simplifier"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              EMI Simplifier
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              किश्त सरलीकरण – सभी EMI एवं लोन ज्ञान, टूल्स और लेख एक जगह
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Complete EMI & loan knowledge hub: Learn lessons, 15+ EMI calculators, home loan, personal loan, car loan tools. Plan your borrowings smartly. Hindi + English. Free.
            </p>
            <Link
              to="/calculators/emi-calculator"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg"
            >
              <IndianRupee className="w-6 h-6" />
              EMI Calculator
            </Link>
          </div>

          {/* EMI Learn Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden mb-6">
            <button
              onClick={() => setLearnOpen(!learnOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">EMI & Loan Learn</h2>
                  <p className="text-sm text-gray-600">EMI सीखें – बेसिक्स से एडवांस्ड, होम लोन, पर्सनल लोन</p>
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
                  className="border-t border-blue-100"
                >
                  <div className="p-6 grid md:grid-cols-2 gap-4">
                    {EMI_LEARN_LESSONS.map((lesson, i) => (
                      <Link
                        key={lesson.id}
                        to={`/learn/${lesson.category}/${lesson.slug}`}
                        className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 hover:bg-blue-100/70 border border-blue-100 transition-colors"
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex items-center justify-center">{i + 1}</span>
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
                  <h2 className="text-xl font-bold text-gray-900">All Loan & Learn Categories</h2>
                  <p className="text-sm text-gray-600">Loans, Home, Personal, Vehicle – सभी Learn Topics</p>
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

          {/* EMI Tools Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden mb-6">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-green-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">EMI & Loan Tools</h2>
                  <p className="text-sm text-gray-600">15+ EMI कैलकुलेटर और लोन टूल्स</p>
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
                  className="border-t border-green-100"
                >
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {EMI_TOOLS.map((tool) => (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        className="flex items-center gap-3 p-3 rounded-lg bg-green-50/50 hover:bg-green-100/70 border border-green-100 transition-colors"
                      >
                        <FileSpreadsheet className="w-5 h-5 text-green-600 flex-shrink-0" />
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

          {/* EMI Articles Section */}
          <section className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden mb-6">
            <button
              onClick={() => setBlogsOpen(!blogsOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-amber-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">EMI & Loan Articles</h2>
                  <p className="text-sm text-gray-600">EMI, होम लोन, पर्सनल लोन से जुड़े लेख</p>
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
                  className="border-t border-amber-100"
                >
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">सभी EMI और loan articles – Basic से Advanced। Hindi + English:</p>
                    <Link
                      to="/blog?category=Loans"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors mb-6"
                    >
                      सभी Loan Articles (Blog)
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {EMI_ARTICLES.map((article) => (
                        <Link
                          key={article.slug}
                          to={`/blog/${article.slug}`}
                          className="flex flex-col gap-1 p-3 rounded-lg bg-amber-50 border border-amber-100 hover:border-amber-200 hover:bg-amber-100/70 transition-colors"
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
            <Link to="/loan-tools" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
              Loan Tools Hub
            </Link>
            <Link to="/learn" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">
              Loans Learn
            </Link>
            <Link to="/calculators/emi-calculator" className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700">
              EMI Calculator
            </Link>
            <Link to="/sip-simplifier" className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700">
              SIP Simplifier
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

export default EMISimplifier;
