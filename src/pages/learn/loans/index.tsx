import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, CheckCircle, ArrowRight, Award, Clock } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const LoansHub: React.FC = () => {
  const lessons = [
    { id: 1, title: 'What Is a Loan?', slug: 'what-is-loan', time: 8, icon: '📚' },
    { id: 2, title: 'Types of Loans', slug: 'types-of-loans', time: 10, icon: '🏠' },
    { id: 3, title: 'Secured vs Unsecured', slug: 'secured-vs-unsecured', time: 9, icon: '⚖️' },
    { id: 4, title: 'What Is EMI?', slug: 'what-is-emi', time: 10, icon: '🧮', hasCalc: true },
    { id: 5, title: 'Simple vs Compound Interest', slug: 'simple-vs-compound-interest', time: 9, icon: '📊', hasCalc: true },
    { id: 6, title: 'How Banks Evaluate', slug: 'how-banks-evaluate', time: 10, icon: '🏦' },
    { id: 7, title: 'Loan Tenure Explained', slug: 'loan-tenure-explained', time: 9, icon: '📅', hasCalc: true },
    { id: 8, title: 'Fixed vs Floating Rates', slug: 'fixed-vs-floating-rates', time: 9, icon: '📈' },
    { id: 9, title: 'Understanding Collateral', slug: 'understanding-collateral', time: 8, icon: '🏆' },
    { id: 10, title: 'Check Loan Eligibility', slug: 'check-eligibility', time: 9, icon: '✅', hasCalc: true },
    { id: 11, title: 'Loan Agreement Guide', slug: 'loan-agreement-guide', time: 10, icon: '📝' },
    { id: 12, title: 'Co-Applicant Benefits', slug: 'co-applicant-benefits', time: 9, icon: '👥' },
    { id: 13, title: 'CIBIL Score Impact', slug: 'cibil-score-impact', time: 9, icon: '📊' },
    { id: 14, title: 'Calculate True Cost', slug: 'calculate-true-cost', time: 9, icon: '💰', hasCalc: true },
    { id: 15, title: 'Loan Default Consequences', slug: 'loan-default-consequences', time: 10, icon: '⚠️' },
    { id: 16, title: 'Loan Repayment Options', slug: 'repayment-options', time: 8, icon: '💳' },
    { id: 17, title: 'Application Process', slug: 'loan-application-process', time: 9, icon: '📋' },
    { id: 18, title: 'Compare Loan Offers', slug: 'compare-loan-offers', time: 9, icon: '⚖️' },
    { id: 19, title: 'Documents Required', slug: 'documents-required', time: 8, icon: '📄' },
    { id: 20, title: 'Common Loan Terms', slug: 'common-loan-terms', time: 10, icon: '📖' }
  ];

  return (
    <>
      <SEOHelmet
        title="Loans & Credit - Complete Guide | 20 Free Lessons | MoneyCal Learn"
        description="Master loans and credit with 20 comprehensive lessons. Learn EMI, interest rates, CIBIL score, loan types, eligibility, and smart borrowing strategies. Free interactive calculators included."
        keywords="loan guide, learn loans, EMI, CIBIL score, loan types, credit guide, loan eligibility, home loan, personal loan, financial education"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900">MoneyCal</span>{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Learn
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600">Loans & Credit Mastery</p>
                </div>
              </Link>

              <div className="flex items-center gap-4">
                <Link to="/learn" className="text-gray-600 hover:text-blue-600 font-semibold">
                  ← All Categories
                </Link>
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
            >
              <div className="text-6xl mb-6">📚</div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Loans & Credit Mastery
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                20 comprehensive lessons to master loans, EMI, credit scores, and smart borrowing
              </p>

              <div className="flex gap-6 justify-center mb-12">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-blue-600">20</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Calculators</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-600">FREE</div>
                  <div className="text-sm text-gray-600">Forever</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* All Lessons Grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">All Lessons</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {lessons.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  to={`/learn/loans/${lesson.slug}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-blue-500"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-4xl">{lesson.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-bold text-blue-600">Lesson {lesson.id}</span>
                            {lesson.hasCalc && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                                Calculator
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {lesson.time} min
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              Beginner
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Completion Badge */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">
                Complete All Lessons & Get Certified!
              </h3>
              <p className="text-gray-700 mb-6">
                Finish all 20 lessons, take the quiz, and earn your MoneyCal Loans & Credit Certificate
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/learn/loans/what-is-loan"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
                >
                  Start from Lesson 1 →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Loans & Credit Mastery",
          "description": "Complete course on loans and credit in India",
          "provider": {
            "@type": "Organization",
            "name": "MoneyCal Learn"
          },
          "numberOfCredits": 20,
          "educationalLevel": "Beginner"
        })}
      </script>
    </>
  );
};

export default LoansHub;



