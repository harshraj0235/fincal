import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Award, Search, Home, Car, GraduationCap, Briefcase, CreditCard, BarChart3, Coins, UserCheck, Globe, Sparkles, ArrowRight, Play, CheckCircle, Star, Zap } from 'lucide-react';
import SEOHelmet from '../../components/SEOHelmet';
import { loanCategories } from '../../data/learn/loansLessons';

const LearnHome: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  return (
    <>
      <SEOHelmet
        title="MoneyCal Learn - Free Finance Education Platform | 200+ Lessons | Hindi+English"
        description="India's largest free finance academy! 200+ lessons on loans, investing, taxation, insurance, retirement, FinTech, business finance. Interactive calculators, Hindi+English, real Indian examples. Master money management, stock market, mutual funds, SIP, tax saving, and more!"
        keywords="finance education India, learn finance Hindi, loan guide, EMI calculator, investment tutorial, stock market guide, mutual funds SIP, tax guide, insurance NPS, retirement planning, budgeting, financial literacy India, निवेश गाइड, वित्तीय शिक्षा"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Top Bar - Investopedia Style */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-yellow-300" />
                <span className="font-bold text-yellow-300">200+ Lessons Live!</span>
              </span>
              <span className="hidden md:inline">
                <span className="text-white/80">18 Categories |</span>
                <span className="font-bold ml-1 text-green-300">All Topics Available!</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center space-x-1 hover:text-yellow-300 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Header - Sticky */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900">MoneyCal</span>{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Learn
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600">India's Finance Academy</p>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-6">
                <Link to="/calculators" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  🧮 Calculators
                </Link>
                <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  📰 Blog
                </Link>
                <Link to="/festival-tools" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  🎊 Festival Tools
                </Link>
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                  🏠 Home
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Credit Card Style Hero with Animated Background */}
        <section className="relative py-16 px-4 overflow-hidden">
          {/* Animated Blob Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Credit Card */}
              <div 
                className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl overflow-hidden"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                        <BookOpen className="w-12 h-12 text-white" />
                      </div>
                      <div className="text-left">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                          MoneyCal Learn
                        </h1>
                        <p className="text-white/90 text-lg">
                          Your Personal Finance Academy
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="text-right">
                        <div className="text-white/70 text-sm mb-1">Live Lessons</div>
                        <div className="text-white text-4xl font-bold">200+</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white/70 text-sm mb-1">Categories</div>
                      <div className="text-white text-2xl font-bold">{loanCategories.length}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white/70 text-sm mb-1">Lessons</div>
                      <div className="text-white text-2xl font-bold">200+</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white/70 text-sm mb-1">Languages</div>
                      <div className="text-white text-2xl font-bold">2</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white/70 text-sm mb-1">Cost</div>
                      <div className="text-white text-2xl font-bold">FREE</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-white/90">
                      <p className="text-lg font-semibold mb-1">🎓 Learn • 🧮 Calculate • 📊 Master</p>
                      <p className="text-sm text-white/70">Click to explore all categories →</p>
                    </div>
                    <motion.div
                      animate={{ rotate: showAllCategories ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Expandable Categories Section */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: showAllCategories ? 'auto' : 0,
                  opacity: showAllCategories ? 1 : 0
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  {loanCategories.map((category, index) => (
                    <Link 
                      key={category.id}
                      to={`/learn/${category.id}`}
                      onMouseEnter={() => setActiveCard(index)}
                      onMouseLeave={() => setActiveCard(null)}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
                          activeCard === index 
                            ? 'border-purple-500 shadow-xl scale-105' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl">{category.icon}</div>
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {category.lessonsCount} lessons
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">{category.nameHindi}</p>
                        <p className="text-sm text-gray-600 mb-4">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>⏱️ {category.duration}</span>
                          <span className={`px-2 py-1 rounded-full ${
                            category.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                            category.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            category.level === 'Advanced' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {category.level}
                          </span>
                        </div>
                        <div className="flex items-center text-purple-600 font-semibold text-sm">
                          Start Learning →
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Search Bar Below Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto mt-8"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for loans, EMI, investment, tax..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-lg shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Master Financial Literacy
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Interactive Calculators | Hindi + English | Real Indian Examples
              </p>
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

              {/* Money Management */}
              <Link to="/learn/money-management" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-emerald-200 hover:border-emerald-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-emerald-100 rounded-xl">
                      <span className="text-4xl">💰</span>
                    </div>
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      8 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600">
                    💰 Money Management
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Budgeting, emergency fund, financial habits, and smart money management
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs">Budgeting</span>
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs">Emergency Fund</span>
                  </div>
                </motion.div>
              </Link>

              {/* Savings & Bank Products */}
              <Link to="/learn/savings-bank-products" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-cyan-200 hover:border-cyan-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-cyan-100 rounded-xl">
                      <span className="text-4xl">🏦</span>
                    </div>
                    <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      8 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600">
                    🏦 Savings & Bank Products
                  </h4>
                  <p className="text-gray-600 mb-4">
                    FD, RD, savings accounts, and bank product comparison
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs">FD</span>
                    <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs">Savings</span>
                  </div>
                </motion.div>
              </Link>

              {/* Investing & Wealth Creation */}
              <Link to="/learn/investing-wealth" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-purple-200 hover:border-purple-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-purple-100 rounded-xl">
                      <TrendingUp className="w-10 h-10 text-purple-600" />
                    </div>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      10 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600">
                    📈 Investing & Wealth Creation
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Stocks, mutual funds, SIPs, asset allocation for long-term wealth
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs">Stock Market</span>
                    <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs">SIP</span>
                  </div>
                </motion.div>
              </Link>

              {/* Insurance, Retirement & Estate */}
              <Link to="/learn/insurance-retirement" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-200 hover:border-red-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-red-100 rounded-xl">
                      <span className="text-4xl">🛡️</span>
                    </div>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      7 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600">
                    🛡️ Insurance, Retirement & Estate
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Life, health insurance, NPS, retirement planning, and estate basics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs">Term Insurance</span>
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs">NPS</span>
                  </div>
                </motion.div>
              </Link>

              {/* Taxation & Compliance */}
              <Link to="/learn/taxation-compliance" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-amber-200 hover:border-amber-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-amber-100 rounded-xl">
                      <span className="text-4xl">📋</span>
                    </div>
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      7 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-amber-600">
                    📋 Taxation & Compliance
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Income tax, 80C deductions, ITR filing, and tax optimization
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs">Income Tax</span>
                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs">80C</span>
                  </div>
                </motion.div>
              </Link>

              {/* FinTech & Digital Payments */}
              <Link to="/learn/fintech-digital-payments" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-sky-200 hover:border-sky-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-sky-100 rounded-xl">
                      <span className="text-4xl">📱</span>
                    </div>
                    <span className="bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      6 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-sky-600">
                    📱 FinTech & Digital Payments
                  </h4>
                  <p className="text-gray-600 mb-4">
                    UPI, digital wallets, online banking, and cybersecurity
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs">UPI</span>
                    <span className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs">Digital Wallets</span>
                  </div>
                </motion.div>
              </Link>

              {/* Business Finance & Entrepreneurship */}
              <Link to="/learn/business-finance-entrepreneurship" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-lime-200 hover:border-lime-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-lime-100 rounded-xl">
                      <span className="text-4xl">🚀</span>
                    </div>
                    <span className="bg-lime-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      7 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-lime-600">
                    🚀 Business Finance & Entrepreneurship
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Startup funding, business loans, cash flow, scaling strategies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-lime-50 text-lime-700 px-3 py-1 rounded-full text-xs">Startup Funding</span>
                    <span className="bg-lime-50 text-lime-700 px-3 py-1 rounded-full text-xs">GST</span>
                  </div>
                </motion.div>
              </Link>

              {/* Advanced Topics & Specialised Finance */}
              <Link to="/learn/advanced-specialised-finance" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-violet-200 hover:border-violet-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-violet-100 rounded-xl">
                      <span className="text-4xl">⚡</span>
                    </div>
                    <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      7 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-violet-600">
                    ⚡ Advanced Topics & Specialised Finance
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Real estate, commodities, forex, global markets, derivatives
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs">Real Estate</span>
                    <span className="bg-violet-50 text-violet-700 px-3 py-1 rounded-full text-xs">F&O</span>
                  </div>
                </motion.div>
              </Link>

              {/* Behavioural Finance & Money Psychology */}
              <Link to="/learn/behavioural-finance-money-psychology" className="group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-8 shadow-lg border-2 border-fuchsia-200 hover:border-fuchsia-500 transition-all h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-fuchsia-100 rounded-xl">
                      <span className="text-4xl">🧠</span>
                    </div>
                    <span className="bg-fuchsia-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      7 Lessons
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-fuchsia-600">
                    🧠 Behavioural Finance & Money Psychology
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Money mindset, biases, habits, emotional spending control
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-fuchsia-50 text-fuchsia-700 px-3 py-1 rounded-full text-xs">Money Mindset</span>
                    <span className="bg-fuchsia-50 text-fuchsia-700 px-3 py-1 rounded-full text-xs">FIRE</span>
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

