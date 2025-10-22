import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserCheck, Calculator, TrendingUp, FileText, Shield, 
  Clock, Users, Award, BookOpen, CheckCircle,
  DollarSign, Target, AlertCircle, Briefcase, Search,
  CreditCard, Zap, TrendingDown, RefreshCw, XCircle
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const personalLoansLessons = [
  { id: 1, title: 'What is a Personal Loan?', slug: 'what-is-personal-loan', icon: UserCheck, color: 'from-blue-500 to-cyan-500', difficulty: 'Beginner', duration: '8 min' },
  { id: 2, title: 'Types of Personal Loans in India', slug: 'types-of-personal-loans', icon: BookOpen, color: 'from-purple-500 to-pink-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 3, title: 'Personal Loan Eligibility Calculator', slug: 'personal-loan-eligibility', icon: Calculator, color: 'from-green-500 to-emerald-500', difficulty: 'Beginner', duration: '10 min', badge: 'Calculator' },
  { id: 4, title: 'Interest Rates Explained (11-15%)', slug: 'interest-rates-explained', icon: TrendingUp, color: 'from-orange-500 to-red-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 5, title: 'Secured vs Unsecured Personal Loans', slug: 'secured-vs-unsecured', icon: Shield, color: 'from-indigo-500 to-purple-500', difficulty: 'Beginner', duration: '8 min' },
  { id: 6, title: 'Instant Personal Loan Apps Explained', slug: 'instant-loan-apps', icon: Zap, color: 'from-pink-500 to-rose-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 7, title: 'Documents Required for Personal Loan', slug: 'documents-required', icon: FileText, color: 'from-cyan-500 to-blue-500', difficulty: 'Beginner', duration: '7 min' },
  { id: 8, title: 'Personal Loan Application Process', slug: 'application-process', icon: Search, color: 'from-yellow-500 to-orange-500', difficulty: 'Beginner', duration: '9 min' },
  { id: 9, title: 'CIBIL Score Impact on Personal Loans', slug: 'cibil-score-impact', icon: Award, color: 'from-green-500 to-teal-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 10, title: 'Personal Loan for Debt Consolidation', slug: 'debt-consolidation', icon: RefreshCw, color: 'from-red-500 to-pink-500', difficulty: 'Intermediate', duration: '11 min' },
  { id: 11, title: 'Tax Implications of Personal Loans', slug: 'tax-implications', icon: DollarSign, color: 'from-purple-500 to-indigo-500', difficulty: 'Intermediate', duration: '8 min' },
  { id: 12, title: 'Personal Loan Pre-Approval', slug: 'pre-approval', icon: CheckCircle, color: 'from-blue-500 to-indigo-500', difficulty: 'Beginner', duration: '7 min' },
  { id: 13, title: 'Personal Loan vs Credit Card', slug: 'vs-credit-card', icon: CreditCard, color: 'from-teal-500 to-green-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 14, title: 'Personal Loan Prepayment Strategy', slug: 'prepayment-strategy', icon: Target, color: 'from-orange-500 to-amber-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 15, title: 'Balance Transfer for Personal Loans', slug: 'balance-transfer', icon: RefreshCw, color: 'from-pink-500 to-purple-500', difficulty: 'Advanced', duration: '10 min' },
  { id: 16, title: 'Top-Up on Existing Personal Loan', slug: 'top-up-loans', icon: TrendingUp, color: 'from-cyan-500 to-teal-500', difficulty: 'Intermediate', duration: '8 min' },
  { id: 17, title: 'What If You Can\'t Repay?', slug: 'unable-to-repay', icon: XCircle, color: 'from-red-500 to-orange-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 18, title: 'Personal Loan Frauds & Scams', slug: 'frauds-and-scams', icon: AlertCircle, color: 'from-yellow-500 to-red-500', difficulty: 'Beginner', duration: '9 min' },
  { id: 19, title: 'Common Personal Loan Mistakes', slug: 'common-mistakes', icon: XCircle, color: 'from-orange-500 to-red-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 20, title: 'How to Choose Best Personal Loan?', slug: 'choose-best-loan', icon: Briefcase, color: 'from-indigo-500 to-blue-500', difficulty: 'Advanced', duration: '12 min' },
];

const PersonalLoansHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Personal Loans in India: Complete Guide (20 Lessons) | MoneyCal Learn"
        description="Master personal loans in India with 20 comprehensive lessons. Learn about instant loans, debt consolidation, eligibility, interest rates, and smart borrowing. Free calculators included!"
        keywords="personal loan India, personal loan eligibility, instant personal loan, debt consolidation, personal loan interest rate, personal loan guide"
        canonicalUrl="https://moneycal.in/learn/personal-loans"
        structuredData={{
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
        }}
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
          </motion.div>

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
                    className="block group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-400 h-full">
                      <div className={`bg-gradient-to-r ${lesson.color} p-6 text-white`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <Icon className="h-8 w-8" />
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                              #{lesson.id}
                            </div>
                            {lesson.badge && (
                              <div className="bg-green-500 px-2 py-1 rounded-full text-xs font-bold">
                                {lesson.badge}
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold leading-tight group-hover:scale-105 transition-transform">
                          {lesson.title}
                        </h3>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className={`px-3 py-1 rounded-full font-medium ${
                            lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {lesson.difficulty}
                          </span>
                          <span className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {lesson.duration}
                          </span>
                        </div>
                        
                        <div className="mt-4 flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                          Start Learning
                          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* What You'll Learn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">What You'll Master</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Personal Loan Basics</h3>
                  <p className="text-purple-100">Types, eligibility, instant loans, documentation</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Quick Approval Strategies</h3>
                  <p className="text-purple-100">Apps, CIBIL optimization, instant loans under 24 hours</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Debt Management</h3>
                  <p className="text-purple-100">Consolidation, balance transfer, lowering EMI</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Smart Strategies</h3>
                  <p className="text-purple-100">Prepayment, choosing vs credit card, avoiding frauds</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Interest Rate Optimization</h3>
                  <p className="text-purple-100">11-15% rates, negotiation, reducing costs</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Safety & Security</h3>
                  <p className="text-purple-100">Avoiding scams, what if you can't repay, protection strategies</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back to Learn */}
          <div className="mt-12 text-center">
            <Link
              to="/learn"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Categories
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalLoansHub;


