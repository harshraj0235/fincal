import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Award, Target, TrendingUp, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { investingCategory, investingLessons, investingSEO } from '../../../data/learn/investingLessons';

const InvestingHub: React.FC = () => {
  return (
    <>
      <SEOHelmet title={investingSEO.metaTitle} description={investingSEO.metaDescription} keywords={investingSEO.keywords} url="/learn/investing-wealth" />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900">MoneyCal</span>{' '}
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Learn
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600">Investing & Wealth Creation</p>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/learn" className="text-gray-600 hover:text-purple-600 font-semibold">
                  ← All Categories
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-6xl mb-6">📈</div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Investing & Wealth Creation
                </span>
              </h2>
              <p className="text-2xl text-gray-600 mb-4">निवेश और संपत्ति निर्माण</p>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Master stock market, mutual funds, SIPs, asset allocation for long-term wealth building
              </p>

              <div className="flex gap-6 justify-center mb-12">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600">10</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">8h</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-indigo-600">Mixed</div>
                  <div className="text-sm text-gray-600">Level</div>
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
              {investingLessons.map((lesson, index) => (
                <Link key={lesson.id} to={`/learn/investing-wealth/${lesson.slug}`} className="group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-purple-500"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-4xl">{index === 0 ? '📊' : index === 1 ? '📈' : index === 2 ? '💰' : index === 3 ? '📉' : index === 4 ? '⚖️' : index === 5 ? '🎯' : index === 6 ? '💼' : index === 7 ? '📚' : index === 8 ? '🎓' : '⚠️'}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-bold text-purple-600">Lesson {lesson.order}</span>
                            {lesson.relatedCalculators.length > 0 && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                                Calculator
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-purple-700 mb-2">{lesson.titleHindi}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {lesson.duration}
                            </span>
                            <span className={`flex items-center gap-1 ${lesson.difficulty === 'beginner' ? 'text-green-600' : lesson.difficulty === 'intermediate' ? 'text-yellow-600' : 'text-red-600'}`}>
                              <CheckCircle className="w-4 h-4" />
                              {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Completion Badge */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">
                Complete All Lessons & Build Your Wealth Portfolio!
              </h3>
              <p className="text-gray-700 mb-6">
                Finish all 10 lessons and start your wealth creation journey with confidence
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to={`/learn/investing-wealth/${investingLessons[0].slug}`}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition-all"
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
          "name": "Investing & Wealth Creation",
          "description": "Complete course on investing and wealth building in India",
          "provider": {
            "@type": "Organization",
            "name": "MoneyCal Learn"
          },
          "numberOfCredits": 10,
          "educationalLevel": "Mixed"
        })}
      </script>
    </>
  );
};

export default InvestingHub;



