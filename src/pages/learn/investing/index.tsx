import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Award, Target, TrendingUp, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { investingCategory, investingLessons, investingSEO } from '../../../data/learn/investingLessons';

const InvestingHub: React.FC = () => (
  <>
    <SEOHelmet title={investingSEO.metaTitle} description={investingSEO.metaDescription} keywords={investingSEO.keywords} url="/learn/investing-wealth" />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-md sticky top-0 z-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/learn" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">All Categories</span>
            </Link>
            <span className="text-sm text-gray-600">{investingCategory.totalLessons} Lessons • {investingCategory.estimatedHours} Hours</span>
          </div>
        </div>
      </header>
      
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <TrendingUp className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{investingCategory.name}</h1>
          <p className="text-2xl text-gray-600 mb-2">{investingCategory.nameHindi}</p>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{investingCategory.description}</p>
        </motion.div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📚 Course Lessons</h2>
          <div className="grid gap-6">
            {investingLessons.map((lesson, index) => (
              <motion.div key={lesson.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={`/learn/investing-wealth/${lesson.slug}`} className="block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden group border-2 border-gray-200 hover:border-purple-500">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">{lesson.order}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">{lesson.title}</h3>
                          <p className="text-purple-700 text-sm mb-2">{lesson.titleHindi}</p>
                          <p className="text-gray-600 text-sm">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">{lesson.duration}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
                      Start Lesson <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Build Wealth?</h3>
          <p className="text-xl mb-8 text-white/90">Start with Lesson 1 and master investing in 8 hours!</p>
          <Link to={`/learn/investing-wealth/${investingLessons[0].slug}`} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            <BookOpen className="w-6 h-6" />
            Start Lesson 1
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  </>
);

export default InvestingHub;


