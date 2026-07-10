import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { insuranceRetirementLessons, insuranceRetirementSEO } from '../../../data/learn/insuranceRetirementLessons';

const InsuranceRetirementHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title={insuranceRetirementSEO.metaTitle}
        description={insuranceRetirementSEO.metaDescription}
        keywords={insuranceRetirementSEO.keywords}
        url="/learn/insurance-retirement"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Insurance & Retirement', url: '/learn/insurance-retirement' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Insurance, Retirement & Estate Planning",
          description: "Insurance and retirement education hub with lessons and planning guides.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: insuranceRetirementLessons.length
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900">MoneyCal</span>{' '}
                    <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      Learn
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600">Insurance, Retirement & Estate</p>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/learn" className="text-gray-600 hover:text-red-600 font-semibold">
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
              <div className="text-6xl mb-6">🛡️</div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Insurance, Retirement & Estate
                </span>
              </h2>
              <p className="text-2xl text-gray-600 mb-4">बीमा, सेवानिवृत्ति और संपत्ति</p>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Life, health insurance, NPS, retirement planning, and estate basics
              </p>

              <div className="flex gap-6 justify-center mb-12">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-red-600">7</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">6h</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-600">Intermediate</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600">FREE</div>
                  <div className="text-sm text-gray-600">Forever</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto mb-10">
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
            <p className="text-gray-700 text-sm">Follow lessons, calculate coverage, compare policies, and track beneficiaries. Use NPS/PPF/EPF modules for retirement.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
            <p className="text-gray-700 text-sm">Term coverage → health cover → retirement vehicles (NPS/PPF/EPF) → estate planning (will/nomination).</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
            <p className="text-gray-700 text-sm">Compute 1 crore term cover. Choose 5L family floater. Plan NPS contributions for tax benefits.</p>
          </div>
        </div>
        {/* All Lessons Grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">All Lessons</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {insuranceRetirementLessons.map((lesson, index) => (
                <Link key={lesson.id} to={`/learn/insurance-retirement/${lesson.slug}`} className="group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 hover:border-red-500"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="text-4xl">{index === 0 ? '🛡️' : index === 1 ? '🏥' : index === 2 ? '💼' : index === 3 ? '👴' : index === 4 ? '🏦' : index === 5 ? '📊' : '📜'}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-bold text-red-600">Lesson {lesson.order}</span>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-red-700 mb-2">{lesson.titleHindi}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {lesson.duration}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-600">
                              <CheckCircle className="w-4 h-4" />
                              Intermediate
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Completion Badge */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">
                Complete All Lessons & Secure Your Future!
              </h3>
              <p className="text-gray-700 mb-6">
                Finish all 7 lessons and build a robust financial protection plan
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to={`/learn/insurance-retirement/${insuranceRetirementLessons[0].slug}`}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-all"
                >
                  Start from Lesson 1 →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      
    </>
  );
};

export default InsuranceRetirementHub;



