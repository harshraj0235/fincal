import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Calculator, TrendingUp, FileText, Shield, 
  Clock, Users, Award, BookOpen, CheckCircle,
  DollarSign, Target, AlertCircle, Briefcase, Search,
  PieChart, CreditCard, Settings, MapPin, IndianRupee } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const homeLoansLessons = [
  { id: 1, title: 'What is a Home Loan?', slug: 'what-is-home-loan', icon: Home, color: 'from-blue-500 to-cyan-500', difficulty: 'Beginner', duration: '8 min' },
  { id: 2, title: 'Types of Home Loans in India', slug: 'types-of-home-loans', icon: BookOpen, color: 'from-purple-500 to-pink-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 3, title: 'Home Loan Eligibility Calculator', slug: 'home-loan-eligibility', icon: IndianRupee, color: 'from-green-500 to-emerald-500', difficulty: 'Beginner', duration: '12 min', badge: 'Calculator' },
  { id: 4, title: 'Understanding Loan-to-Value (LTV) Ratio', slug: 'loan-to-value-ratio', icon: PieChart, color: 'from-orange-500 to-red-500', difficulty: 'Intermediate', duration: '9 min', badge: 'Calculator' },
  { id: 5, title: 'Home Loan Interest Rates Explained', slug: 'interest-rates-explained', icon: TrendingUp, color: 'from-indigo-500 to-purple-500', difficulty: 'Beginner', duration: '10 min' },
  { id: 6, title: 'Fixed vs Floating Rate Home Loans', slug: 'fixed-vs-floating', icon: Settings, color: 'from-pink-500 to-rose-500', difficulty: 'Intermediate', duration: '11 min' },
  { id: 7, title: 'EMI Calculator & How to Use It', slug: 'emi-calculator-guide', icon: IndianRupee, color: 'from-cyan-500 to-blue-500', difficulty: 'Beginner', duration: '10 min', badge: 'Calculator' },
  { id: 8, title: 'Documents Required for Home Loan', slug: 'documents-required', icon: FileText, color: 'from-yellow-500 to-orange-500', difficulty: 'Beginner', duration: '9 min' },
  { id: 9, title: 'Home Loan Application Process', slug: 'application-process', icon: Search, color: 'from-green-500 to-teal-500', difficulty: 'Beginner', duration: '12 min' },
  { id: 10, title: 'CIBIL Score & Home Loan Approval', slug: 'cibil-score-impact', icon: Award, color: 'from-red-500 to-pink-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 11, title: 'Tax Benefits on Home Loans', slug: 'tax-benefits', icon: DollarSign, color: 'from-purple-500 to-indigo-500', difficulty: 'Intermediate', duration: '13 min' },
  { id: 12, title: 'Home Loan Pre-Approval Process', slug: 'pre-approval', icon: CheckCircle, color: 'from-blue-500 to-indigo-500', difficulty: 'Beginner', duration: '8 min' },
  { id: 13, title: 'Co-Applicant & Joint Home Loans', slug: 'co-applicant-benefits', icon: Users, color: 'from-teal-500 to-green-500', difficulty: 'Intermediate', duration: '11 min' },
  { id: 14, title: 'Home Loan Prepayment & Foreclosure', slug: 'prepayment-foreclosure', icon: Target, color: 'from-orange-500 to-amber-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 15, title: 'Balance Transfer: When & How?', slug: 'balance-transfer', icon: CreditCard, color: 'from-pink-500 to-purple-500', difficulty: 'Advanced', duration: '12 min' },
  { id: 16, title: 'Top-Up Home Loans Explained', slug: 'top-up-loans', icon: TrendingUp, color: 'from-cyan-500 to-teal-500', difficulty: 'Intermediate', duration: '9 min' },
  { id: 17, title: 'Home Loan Insurance (Must or Skip?)', slug: 'home-loan-insurance', icon: Shield, color: 'from-red-500 to-orange-500', difficulty: 'Intermediate', duration: '10 min' },
  { id: 18, title: 'Property Valuation Process', slug: 'property-valuation', icon: MapPin, color: 'from-green-500 to-lime-500', difficulty: 'Intermediate', duration: '8 min' },
  { id: 19, title: 'Common Home Loan Mistakes to Avoid', slug: 'common-mistakes', icon: AlertCircle, color: 'from-yellow-500 to-red-500', difficulty: 'Beginner', duration: '11 min' },
  { id: 20, title: 'How to Choose Best Home Loan?', slug: 'choose-best-loan', icon: Briefcase, color: 'from-indigo-500 to-blue-500', difficulty: 'Advanced', duration: '14 min' },
];

const HomeLoansHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title="Home Loans in India: Complete Guide (20 Lessons + Calculators) | MoneyCal"
        description="Master home loans in India with 20 comprehensive lessons. Learn eligibility, EMI calculation, tax benefits, interest rates, prepayment, balance transfer and smart strategies. 3 free calculators included!"
        keywords="home loan India, home loan eligibility, home loan EMI Calculator, home loan interest rates, tax benefits home loan, CIBIL score home loan"
        url="/learn/home-loans"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Home Loans', url: '/learn/home-loans' }
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Home Loans in India: Complete Guide',
          description: 'Comprehensive 20-lesson course on home loans in India covering eligibility, types, EMI calculation, tax benefits, prepayment, balance transfer, and smart strategies.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            sameAs: 'https://moneycal.in',
          },
          numberOfCredits: 20,
          courseCode: 'HOME-LOANS-101',
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: 'PT3H30M',
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Home className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Home Loans in India
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Master everything about home loans in India - from eligibility to tax benefits, EMI calculations to smart strategies. Your complete guide to buying your dream home! 🏠
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-blue-600">20</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-green-600">3.5h</div>
                <div className="text-sm text-gray-600">Total Duration</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Calculators</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[140px]">
                <div className="text-3xl font-bold text-orange-600">Free</div>
                <div className="text-sm text-gray-600">100% Free</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
              <p className="text-gray-700 text-sm">Follow lessons in order. Use eligibility and EMI calculators while learning. Save notes and revisit summaries.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
              <p className="text-gray-700 text-sm">Eligibility → docs → interest rate choice → EMI planning → prepayment/balance transfer strategy.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
              <p className="text-gray-700 text-sm">Check eligibility with co-applicant. Compare fixed vs floating. Plan tax savings under 80C and 24(b).</p>
            </div>
          </div>

          {/* Recommended Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 bg-white rounded-2xl shadow-xl p-6 border border-blue-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              Recommended Home Loan Tools
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/calculators/home-loan-emi-calculator" className="group">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 group-hover:bg-blue-100 transition-colors h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-blue-900">EMI Calculator</h4>
                  </div>
                  <p className="text-xs text-blue-700">Calculate exact monthly payments with interest breakup.</p>
                </div>
              </Link>
              <Link to="/calculators/loan-eligibility-calculator" className="group">
                <div className="p-4 rounded-xl bg-green-50 border border-green-100 group-hover:bg-green-100 transition-colors h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-bold text-green-900">Eligibility Check</h4>
                  </div>
                  <p className="text-xs text-green-700">Check how much loan you can get based on income.</p>
                </div>
              </Link>
              <Link to="/calculators/loan-prepayment-calculator" className="group">
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 group-hover:bg-purple-100 transition-colors h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-purple-900">Balance Transfer</h4>
                  </div>
                  <p className="text-xs text-purple-700">Calculate savings by switching to a lower interest rate.</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeLoansLessons.map((lesson, index) => {
              const Icon = lesson.icon;
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/learn/home-loans/${lesson.slug}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-400 h-full">
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
                        
                        <div className="mt-4 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
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
            className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">What You'll Master</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Home Loan Basics</h3>
                  <p className="text-blue-100">Types, eligibility, documentation, and application process</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Financial Calculations</h3>
                  <p className="text-blue-100">3 interactive calculators: Eligibility, LTV, EMI</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Tax Benefits</h3>
                  <p className="text-blue-100">Section 80C, 24(b) - Save ₹1+ lakh in taxes annually</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Smart Strategies</h3>
                  <p className="text-blue-100">Pre-approval, joint loans, choosing best rates</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Credit Score Impact</h3>
                  <p className="text-blue-100">CIBIL 750+ strategy, improving score in 6 months</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Interest Rates</h3>
                  <p className="text-blue-100">Fixed vs floating, negotiation tips, saving lakhs</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back to Learn */}
          <div className="mt-12 text-center">
            <Link
              to="/learn"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
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

export default HomeLoansHub;
