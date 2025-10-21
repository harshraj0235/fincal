import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Award, Search, Home, Car, GraduationCap, Briefcase, CreditCard, BarChart3, Coins, UserCheck } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { loanCategories } from '../../data/learn/loansLessons';

const LearnHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
      <SEOHelmet
        title="MoneyCal Learn - Free Finance Education Platform | Loans, Investment, Tax"
        description="Learn finance the easy way with 150+ free tutorials on loans, EMI, investment, taxation, credit score. Interactive calculators, Hindi+English, real Indian examples."
        keywords="finance education, learn finance, loan guide, EMI calculator, investment tutorial, tax guide, financial literacy India"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    MoneyCal <span className="text-blue-600">Learn</span>
                  </h1>
                  <p className="text-sm text-gray-600">Learn Finance the Easy Way</p>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                <Link to="/calculators" className="text-gray-700 hover:text-blue-600 font-semibold">
                  Calculators
                </Link>
                <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-semibold">
                  Blog
                </Link>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-semibold">
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Master Financial Literacy
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                150+ Free Tutorials | Interactive Calculators | Hindi + English | Real Indian Examples
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search for loans, EMI, investment, tax..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
                  <div className="text-gray-600">Free Lessons</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">9</div>
                  <div className="text-gray-600">Categories</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-200">
                  <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-600">Calculators</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-orange-200">
                  <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
                  <div className="text-gray-600">Free Forever</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Choose Your Learning Path
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Loan Basics */}
              <Link to="/learn/loans" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200 hover:border-blue-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-blue-100 rounded-xl">
                      <BookOpen className="w-10 h-10 text-blue-600" />
                    </div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      20 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    📚 Loan Basics
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Master loan fundamentals, EMI, interest rates, eligibility, and smart borrowing
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">EMI</span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">Interest Rates</span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs">Eligibility</span>
                  </div>
                </motion.div>
              </Link>

              {/* Home Loans */}
              <Link to="/learn/home-loans" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-200 hover:border-green-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-green-100 rounded-xl">
                      <Home className="w-10 h-10 text-green-600" />
                    </div>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      20 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600">
                    🏠 Home Loans
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Everything about housing finance, tax benefits, eligibility, and smart home buying
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">Tax Benefits</span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">PMAY</span>
                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs">Prepayment</span>
                  </div>
                </motion.div>
              </Link>

              {/* Personal Loans */}
              <Link to="/learn/personal-loans" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-purple-200 hover:border-purple-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-purple-100 rounded-xl">
                      <UserCheck className="w-10 h-10 text-purple-600" />
                    </div>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      20 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600">
                    💳 Personal Loans
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Quick loans, debt consolidation, instant approval, and credit score strategies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs">Quick Approval</span>
                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs">No Collateral</span>
                  </div>
                </motion.div>
              </Link>

              {/* Vehicle Loans */}
              <Link to="/learn/vehicle-loans" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-orange-200 hover:border-orange-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-orange-100 rounded-xl">
                      <Car className="w-10 h-10 text-orange-600" />
                    </div>
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      15 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">
                    🚗 Vehicle Loans
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Car loans, two-wheeler finance, used vehicle loans, and refinancing options
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs">Car Loans</span>
                    <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs">Bike Loans</span>
                  </div>
                </motion.div>
              </Link>

              {/* Education Loans */}
              <Link to="/learn/education-loans" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-indigo-200 hover:border-indigo-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-indigo-100 rounded-xl">
                      <GraduationCap className="w-10 h-10 text-indigo-600" />
                    </div>
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      10 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600">
                    🎓 Education Loans
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Student loans for India & abroad, scholarships, tax benefits, and repayment
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs">Study Abroad</span>
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs">Section 80E</span>
                  </div>
                </motion.div>
              </Link>

              {/* Business Loans */}
              <Link to="/learn/business-loans" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-teal-200 hover:border-teal-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-teal-100 rounded-xl">
                      <Briefcase className="w-10 h-10 text-teal-600" />
                    </div>
                    <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      15 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600">
                    💼 Business Loans
                  </h4>
                  <p className="text-gray-600 mb-4">
                    MSME loans, Mudra scheme, working capital, startup funding, and growth finance
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs">MSME</span>
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs">Mudra</span>
                  </div>
                </motion.div>
              </Link>

              {/* Gold Loans */}
              <Link to="/learn/gold-loans" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-yellow-200 hover:border-yellow-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-yellow-100 rounded-xl">
                      <Coins className="w-10 h-10 text-yellow-600" />
                    </div>
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      10 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600">
                    🏆 Gold Loans
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Quick loans against gold, LTV ratio, interest rates, and safe gold loan practices
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs">Quick Cash</span>
                    <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs">Low Interest</span>
                  </div>
                </motion.div>
              </Link>

              {/* Credit Cards */}
              <Link to="/learn/credit-cards" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-200 hover:border-red-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-red-100 rounded-xl">
                      <CreditCard className="w-10 h-10 text-red-600" />
                    </div>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      20 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600">
                    💳 Credit Cards
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Smart credit card usage, rewards, debt traps, building credit, and best practices
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs">Rewards</span>
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs">Cashback</span>
                  </div>
                </motion.div>
              </Link>

              {/* Credit Score */}
              <Link to="/learn/credit-score" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-pink-200 hover:border-pink-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-pink-100 rounded-xl">
                      <BarChart3 className="w-10 h-10 text-pink-600" />
                    </div>
                    <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      10 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-pink-600">
                    📊 Credit Score
                  </h4>
                  <p className="text-gray-600 mb-4">
                    CIBIL score, how to improve, factors affecting, checking for free, and maintaining
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs">CIBIL</span>
                    <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs">750+ Score</span>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Lessons */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🌟 Featured Lessons
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <Link to="/learn/loans/what-is-loan" className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">📚</div>
                <h4 className="font-bold text-blue-900 mb-2">What Is a Loan?</h4>
                <p className="text-sm text-gray-600">Learn loan basics with real examples</p>
              </Link>
              <Link to="/learn/loans/types-of-loans" className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🏠</div>
                <h4 className="font-bold text-green-900 mb-2">Types of Loans</h4>
                <p className="text-sm text-gray-600">8 loan types compared</p>
              </Link>
              <Link to="/learn/loans/what-is-emi" className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">🧮</div>
                <h4 className="font-bold text-purple-900 mb-2">What Is EMI?</h4>
                <p className="text-sm text-gray-600">Interactive calculator included</p>
              </Link>
              <Link to="/learn/loans/secured-vs-unsecured" className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">⚖️</div>
                <h4 className="font-bold text-orange-900 mb-2">Secured vs Unsecured</h4>
                <p className="text-sm text-gray-600">Complete comparison guide</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
            <h3 className="text-4xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of Indians mastering finance for free!
            </p>
            <Link 
              to="/learn/loans" 
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              Start with Loan Basics →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
              © 2025 MoneyCal Learn. Free Finance Education for Everyone. Made with ❤️ in India.
            </p>
          </div>
        </footer>
      </div>

      {/* Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "MoneyCal Learn",
          "description": "Free finance education platform for Indians",
          "url": "https://moneycal.in/learn",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
          }
        })}
      </script>
    </>
  );
};

export default LearnHome;

