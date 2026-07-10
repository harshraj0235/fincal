import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Clock, Scale, BookOpen } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { taxationLessons } from '../../../data/learn/taxationLessons';
import { taxArticlesMeta } from '../../../data/blogs/tax-articles';

const TaxationComplianceHub: React.FC = () => {
  return (
    <>
      <SEOHelmet 
        title="Taxation & Compliance Guide for Indians | MoneyCal Learn" 
        description="Master income tax, 80C deductions, ITR filing, TDS, capital gains tax in Hindi & English. 7 comprehensive lessons with calculators & tax-saving strategies." 
        keywords="income tax India, 80C deductions, ITR filing guide, TDS explained, capital gains tax, advance tax, tax planning strategies, कर योजना, आयकर गाइड" 
        url="/learn/taxation-compliance"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Taxation & Compliance', url: '/learn/taxation-compliance' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Taxation & Compliance",
          description: "Taxation education hub with lessons on income tax, 80C, ITR, TDS, and capital gains.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: taxationLessons.length
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900">MoneyCal</span>{' '}
                    <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                      Learn
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600">Taxation & Compliance</p>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/tax-simplifier" className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-semibold hover:bg-amber-200">
                  <Scale className="w-4 h-4" />
                  Tax Simplifier
                </Link>
                <Link to="/learn" className="text-gray-600 hover:text-yellow-600 font-semibold">
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
              <div className="text-6xl mb-6">📋</div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  Taxation & Compliance
                </span>
              </h2>
              <p className="text-2xl text-gray-600 mb-4">कर और अनुपालन</p>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Master income tax in India! Learn tax slabs, 80C deductions (save ₹46,800!), ITR filing, TDS, and tax planning strategies.
              </p>

              <div className="flex gap-6 justify-center mb-12">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-yellow-600">7</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">5h</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-amber-600">Intermediate</div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto mb-10">
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
            <p className="text-gray-700 text-sm">Start with tax slabs, use calculator, apply 80C/80D/HRA deductions, then file ITR.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
            <p className="text-gray-700 text-sm">Pick regime → compute liability → optimize deductions → file ITR → track refunds.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
            <p className="text-gray-700 text-sm">Choose old vs new regime. Max ₹1.5L under 80C. Calculate TDS and claim refund.</p>
          </div>
        </div>
        {/* All Lessons Grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">All Lessons</h3>

          {/* Lessons Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {taxationLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/learn/taxation-compliance/${lesson.slug}`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-yellow-600 uppercase">{lesson.difficulty}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                <p className="text-sm text-yellow-700 font-semibold mb-4">🇮🇳 {lesson.titleHindi}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Start Learning →</span>
                  <div className="w-8 h-8 rounded-full bg-yellow-100 group-hover:bg-yellow-400 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 text-yellow-600 group-hover:text-white rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tax Articles Section - 60+ articles */}
          <section className="mt-12 bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              60+ Tax Articles (कर से जुड़े लेख)
            </h2>
            <p className="text-gray-600 mb-6">
              Basic से Advanced – सभी tax topics पर Hindi + English articles। Proper format, SEO friendly।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {taxArticlesMeta.slice(0, 18).map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="p-3 rounded-lg bg-amber-50 border border-amber-100 hover:border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-amber-700 mt-1">{article.titleHindi}</p>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/tax-simplifier"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-xl"
              >
                <Scale className="w-5 h-5" />
                सभी 60+ Articles – Tax Simplifier
              </Link>
              <Link to="/blog?category=Tax" className="px-6 py-3 bg-white border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50">
                Tax Blog Category
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">💡 Pro Tip: Start with Lesson 1!</h2>
            <p className="text-gray-600 mb-6">
              New to taxation? Begin with <strong>Income Tax Basics</strong> to understand tax slabs and old vs new regime. Already know the basics? Jump to <strong>Section 80C</strong> to start saving taxes immediately!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/learn/taxation-compliance/income-tax-basics-india-slabs-old-vs-new-regime-2025"
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Start with Lesson 1
              </Link>
              <Link
                to="/calculators/income-tax-calculator"
                className="px-6 py-3 bg-white border-2 border-yellow-500 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-50 transition-all"
              >
                Try Tax Calculator
              </Link>
              <Link
                to="/tax-simplifier"
                className="px-6 py-3 bg-white border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all"
              >
                Tax Simplifier (All Learn + Tools + Articles)
              </Link>
            </div>
          </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TaxationComplianceHub;



