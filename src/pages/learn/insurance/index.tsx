import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Shield, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { insuranceRetirementCategory, insuranceRetirementLessons, insuranceRetirementSEO } from '../../../data/learn/insuranceRetirementLessons';

const InsuranceRetirementHub: React.FC = () => (
  <>
    <SEOHelmet title={insuranceRetirementSEO.metaTitle} description={insuranceRetirementSEO.metaDescription} keywords={insuranceRetirementSEO.keywords} url="/learn/insurance-retirement" />
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50">
      <header className="bg-white shadow-md sticky top-0 z-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/learn" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"><ArrowLeft className="h-5 w-5" /><span className="font-semibold">All Categories</span></Link>
            <span className="text-sm text-gray-600">{insuranceRetirementCategory.totalLessons} Lessons • {insuranceRetirementCategory.estimatedHours} Hours</span>
          </div>
        </div>
      </header>
      
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl shadow-lg mb-6">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{insuranceRetirementCategory.name}</h1>
          <p className="text-2xl text-gray-600 mb-2">{insuranceRetirementCategory.nameHindi}</p>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">{insuranceRetirementCategory.description}</p>
        </motion.div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📚 Course Lessons</h2>
          <div className="grid gap-6">
            {insuranceRetirementLessons.map((lesson, index) => (
              <motion.div key={lesson.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={`/learn/insurance-retirement/${lesson.slug}`} className="block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden group border-2 border-gray-200 hover:border-red-500">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">{lesson.order}</div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">{lesson.title}</h3>
                          <p className="text-red-700 text-sm mb-2">{lesson.titleHindi}</p>
                          <p className="text-gray-600 text-sm">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">{lesson.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-red-600 font-semibold group-hover:translate-x-1 transition-transform mt-4">Start Lesson <ArrowRight className="w-4 h-4 ml-1" /></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Secure Your Financial Future</h3>
          <p className="text-xl mb-8 text-white/90">Master insurance and retirement in 6 hours!</p>
          <Link to={`/learn/insurance-retirement/${insuranceRetirementLessons[0].slug}`} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            <BookOpen className="w-6 h-6" />Start Lesson 1<ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  </>
);

export default InsuranceRetirementHub;



