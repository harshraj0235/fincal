import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserCheck, Calculator, TrendingUp, FileText, Shield, 
  Clock, Award, BookOpen, CheckCircle,
  DollarSign, Target, AlertCircle, Briefcase, Search,
  Zap, TrendingDown, RefreshCw, XCircle,
  ArrowRight, Star, Flame, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const personalLoansLessons = [
  { id: 1, title: 'What is a Personal Loan?', slug: 'what-is-personal-loan', icon: UserCheck, color: 'from-blue-500 to-cyan-500', difficulty: 'Beginner', duration: '8 min' },
  { id: 2, title: 'Types of Personal Loans in India', slug: 'types-of-personal-loans', icon: BookOpen, color: 'from-purple-500 to-pink-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 3, title: 'Personal Loan Eligibility Calculator', slug: 'personal-loan-eligibility', icon: IndianRupee, color: 'from-green-500 to-emerald-500', difficulty: 'Beginner', duration: '10 min', badge: 'Calculator' },
  { id: 4, title: 'Interest Rates Explained (11-15%)', slug: 'interest-rates-explained', icon: TrendingUp, color: 'from-orange-500 to-red-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 5, title: 'Secured vs Unsecured Personal Loans', slug: 'secured-vs-unsecured', icon: Shield, color: 'from-indigo-500 to-purple-500', difficulty: 'Beginner', duration: '8 min' },
  { id: 6, title: 'Instant Personal Loan Apps Explained', slug: 'instant-loan-apps', icon: Zap, color: 'from-pink-500 to-rose-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 7, title: 'Documents Required for Personal Loan', slug: 'documents-required', icon: FileText, color: 'from-cyan-500 to-blue-500', difficulty: 'Beginner', duration: '7 min' },
  { id: 8, title: 'Personal Loan Application Process', slug: 'application-process', icon: Search, color: 'from-yellow-500 to-orange-500', difficulty: 'Beginner', duration: '9 min' },
  { id: 9, title: 'CIBIL Score Impact on Personal Loans', slug: 'cibil-score-impact', icon: Award, color: 'from-green-500 to-teal-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 10, title: 'Personal Loan for Debt Consolidation', slug: 'debt-consolidation', icon: RefreshCw, color: 'from-red-500 to-pink-500', difficulty: 'Intermediate', duration: '11 min' },
  { id: 11, title: 'Processing Fees and Hidden Charges', slug: 'processing-fees', icon: DollarSign, color: 'from-purple-500 to-indigo-500', difficulty: 'Intermediate', duration: '8 min' },
  { id: 12, title: 'Personal Loan Repayment Strategies', slug: 'repayment-strategies', icon: Target, color: 'from-blue-500 to-indigo-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 13, title: 'Personal Loan Prepayment Options', slug: 'prepayment-options', icon: TrendingDown, color: 'from-teal-500 to-green-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 14, title: 'Loan Refinancing and Balance Transfer', slug: 'loan-refinancing', icon: RefreshCw, color: 'from-orange-500 to-amber-500', difficulty: 'Advanced', duration: '10 min' },
  { id: 15, title: 'Loan Rejection Reasons', slug: 'loan-rejection-reasons', icon: XCircle, color: 'from-pink-500 to-purple-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 16, title: 'Loan Comparison Tools', slug: 'loan-comparison-tools', icon: Search, color: 'from-cyan-500 to-teal-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 17, title: 'Improving Approval Chances', slug: 'improving-approval-chances', icon: TrendingUp, color: 'from-green-500 to-emerald-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 18, title: 'Personal Loan Fraud Protection', slug: 'loan-fraud-protection', icon: Shield, color: 'from-red-500 to-orange-500', difficulty: 'Beginner', duration: '9 min' },
  { id: 19, title: 'Common Personal Loan Myths Debunked', slug: 'loan-myths-debunked', icon: AlertCircle, color: 'from-yellow-500 to-red-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 20, title: 'How to Choose Best Personal Loan?', slug: 'loan-closure-process', icon: Briefcase, color: 'from-indigo-500 to-blue-500', difficulty: 'Advanced', duration: '12 min' },
];

const PersonalLoansHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loans in India: Complete Guide (20 Lessons) | MoneyCal Learn"
        description="Master personal loans in India with 20 comprehensive lessons. Learn about instant loans, debt consolidation, eligibility, interest rates, and smart borrowing. Free calculators included!"
        keywords="personal loan India, personal loan eligibility, instant personal loan, debt consolidation, personal loan interest rate, personal loan guide"
        canonicalUrl="/learn/personal-loans"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Personal Loans', url: '/learn/personal-loans' }
        ]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Personal Loans in India: Complete Guide',
            description: 'Comprehensive 20-lesson course on personal loans in India covering instant loans, eligibility, debt consolidation, and smart strategies.',
            provider: {
              '@type': 'Organization',
              name: 'MoneyCal',
              sameAs: 'https://moneycal.in',
            },
            numberOfCredits: 20,
            courseCode: 'PERSONAL-LOANS-101',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'online',
              courseWorkload: 'PT3H',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Personal Loans Lessons',
            description: 'Curated collection of personal loan lessons and calculators in India',
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: personalLoansLessons.length,
              itemListOrder: 'Ascending',
              itemListElement: personalLoansLessons.map((lesson, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: lesson.title,
                url: `/learn/personal-loans/${lesson.slug}`
              }))
            }
          }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg">
                <UserCheck className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Personal Loans in India
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Master personal loans - from instant approval to debt consolidation, eligibility to smart repayment. Your complete guide to quick, unsecured finance! 💳
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-purple-600">20</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-green-600">3h</div>
                <div className="text-sm text-gray-600">Total Duration</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-pink-600">2</div>
                <div className="text-sm text-gray-600">Calculators</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-orange-600">Free</div>
                <div className="text-sm text-gray-600">100% Free</div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/learn"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                ← Back to All Courses
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
              <p className="text-gray-700 text-sm">Start with basics, check eligibility, compare offers, and plan repayment. Use calculators during lessons.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
              <p className="text-gray-700 text-sm">Eligibility → documents → rate & fees → EMI planning → prepayment/refinance options.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
              <p className="text-gray-700 text-sm">Compare two lender offers. Plan debt consolidation. Optimize approval chances via CIBIL and FOIR.</p>
            </div>
          </div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalLoansLessons.map((lesson, index) => {
              const Icon = lesson.icon;
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/learn/personal-loans/${lesson.slug}`}
                    className="block h-full"
                  >
                    <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-300 overflow-hidden group">
                      {/* Card Header */}
                      <div className={`bg-gradient-to-r ${lesson.color} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 opacity-10">
                          <Icon className="h-32 w-32 transform rotate-12" />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-3">
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                              #{lesson.id}
                            </div>
                            {lesson.badge && (
                              <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                                {lesson.badge}
                              </div>
                            )}
                          </div>
                          <Icon className="h-10 w-10 mb-3" />
                          <h3 className="text-lg font-bold leading-tight group-hover:scale-105 transition-transform">
                            {lesson.title}
                          </h3>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            lesson.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {lesson.difficulty}
                          </span>
                          <span className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {lesson.duration}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-purple-600 font-semibold group-hover:text-purple-700 flex items-center">
                            Start Learning
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Course Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🎓 What You'll Learn
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Instant Loan Apps</h4>
                    <p className="text-gray-600 text-sm">Get money in 24 hours with digital lending platforms</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Eligibility Calculator</h4>
                    <p className="text-gray-600 text-sm">Check how much loan you can get based on income</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Interest Rates (11-15%)</h4>
                    <p className="text-gray-600 text-sm">Understand rates and negotiate for the lowest</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">CIBIL Score Impact</h4>
                    <p className="text-gray-600 text-sm">How credit score affects approval and rates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Debt Consolidation</h4>
                    <p className="text-gray-600 text-sm">Pay off credit cards with one low-interest loan</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Prepayment Strategies</h4>
                    <p className="text-gray-600 text-sm">Save thousands by prepaying smartly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Balance Transfer</h4>
                    <p className="text-gray-600 text-sm">Switch to lower rates and reduce EMI</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Fraud Protection</h4>
                    <p className="text-gray-600 text-sm">Identify and avoid loan scams and frauds</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Rejection Reasons</h4>
                    <p className="text-gray-600 text-sm">Why loans get rejected and how to fix it</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Loan Closure</h4>
                    <p className="text-gray-600 text-sm">Complete guide to closing your loan properly</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links to Calculators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">🧮 Related Calculators</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <a 
                href="/calculators/personal-loan-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">Personal Loan Calculator</div>
                  <div className="text-sm text-purple-100">Calculate EMI & interest</div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </a>

              <a 
                href="/calculators/emi-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">EMI Calculator</div>
                  <div className="text-sm text-purple-100">Calculate monthly payments</div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </a>

              <a 
                href="/loan-tools/prepayment-calculator"
                className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all border border-white/40"
              >
                <div>
                  <div className="font-semibold">Prepayment Calculator</div>
                  <div className="text-sm text-purple-100">Calculate savings</div>
                </div>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Related Learning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📚 Related Learning Paths</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                to="/learn"
                className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200"
              >
                <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Loan Basics</h4>
                <p className="text-sm text-gray-600">20 lessons on loan fundamentals</p>
              </Link>

              <Link
                to="/learn/home-loans"
                className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all border-2 border-green-200"
              >
                <Flame className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Home Loans</h4>
                <p className="text-sm text-gray-600">20 lessons on housing finance</p>
              </Link>

              <Link
                to="/calculators/loan-calculator"
                className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200"
              >
                <IndianRupee className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Loan Calculator</h4>
                <p className="text-sm text-gray-600">Advanced loan Calculator tool</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PersonalLoansHub;
