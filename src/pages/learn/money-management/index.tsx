import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, CheckCircle, ArrowRight, Award, Clock, TrendingUp, Target, Wallet } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { moneyManagementLessons, moneyManagementCategory, moneyManagementSEO } from '../../../data/learn/moneyManagementLessons';

const MoneyManagementHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title={moneyManagementSEO.metaTitle}
        description={moneyManagementSEO.metaDescription}
        keywords={moneyManagementSEO.keywords}
        url="/learn/money-management"
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn" className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-gray-900">MoneyCal</span>{' '}
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Learn
                    </span>
                  </h1>
                  <p className="text-xs text-gray-600">Money Management Mastery</p>
                </div>
              </Link>

              <div className="flex items-center gap-4">
                <Link to="/learn" className="text-gray-600 hover:text-green-600 font-semibold">
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
              <div className="text-6xl mb-6">{moneyManagementCategory.icon}</div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {moneyManagementCategory.name}
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-2">
                {moneyManagementCategory.description}
              </p>
              <p className="text-lg text-gray-500 italic mb-8">
                {moneyManagementCategory.descriptionHindi}
              </p>

              <div className="flex gap-6 justify-center mb-12 flex-wrap">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">{moneyManagementCategory.totalLessons}</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-blue-600">{moneyManagementCategory.estimatedHours}</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-gray-600">Calculators</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-orange-600">FREE</div>
                  <div className="text-sm text-gray-600">Forever</div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-4xl mx-auto text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3">
                  <Target className="w-8 h-8 text-green-600" />
                  What You'll Learn (आप क्या सीखेंगे)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    '✅ Master budgeting fundamentals (बजट बनाने की मूल बातें)',
                    '✅ Build emergency fund strategically (आपातकालीन फंड बनाएं)',
                    '✅ Track income & expenses effectively (आय-व्यय ट्रैक करें)',
                    '✅ Calculate net worth & cash flow (नेट वर्थ की गणना करें)',
                    '✅ Develop saving-first habits (पहले बचत की आदत)',
                    '✅ Avoid common financial mistakes (गलतियों से बचें)',
                    '✅ Set & achieve financial goals (लक्ष्य निर्धारित करें)',
                    '✅ Review & adjust budget monthly (बजट की समीक्षा करें)'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lessons Grid */}
        <section className="py-12 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              📚 Complete Learning Path (पूर्ण शिक्षण पथ)
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {moneyManagementLessons.map((lesson, index) => {
                const hasCalculator = lesson.relatedCalculators.length > 0;
                
                return (
                  <Link 
                    key={lesson.id}
                    to={`/learn/money-management/${lesson.slug}`}
                    className="group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-green-500 transition-all h-full"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                            {lesson.order}
                          </div>
                          {hasCalculator && (
                            <div className="bg-purple-100 p-2 rounded-lg">
                              <Calculator className="w-5 h-5 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                          lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {lesson.difficulty.toUpperCase()}
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {lesson.title}
                      </h4>
                      <p className="text-sm text-gray-500 italic mb-3">
                        {lesson.titleHindi}
                      </p>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {lesson.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {lesson.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {lesson.duration}
                        </div>
                        <div className="flex items-center text-green-600 font-semibold text-sm">
                          Start Lesson
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Related Calculators CTA */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white shadow-2xl">
              <Calculator className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">Practice with Free Calculators</h3>
              <p className="text-xl mb-6 text-white/90">
                Apply what you learn with 8+ interactive financial calculators
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/calculators/budget-calculator"
                  className="px-6 py-3 bg-white text-green-600 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Budget Calculator
                </Link>
                <Link
                  to="/calculators/emergency-fund"
                  className="px-6 py-3 bg-white text-green-600 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Emergency Fund Calculator
                </Link>
                <Link
                  to="/calculators/net-worth"
                  className="px-6 py-3 bg-white text-green-600 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Net Worth Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                🎯 Why Money Management Matters (क्यों जरूरी है)
              </h3>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  According to a 2024 RBI survey, <strong>68% of Indians don't have a written budget</strong>, and 
                  <strong>45% live paycheck to paycheck</strong> despite earning decent incomes. The problem isn't low income—it's 
                  lack of financial planning and money management skills.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <strong>भारतीय रिजर्व बैंक (RBI)</strong> के 2024 के सर्वेक्षण के अनुसार, <strong>68% भारतीयों के पास लिखित बजट नहीं है</strong>, और 
                  अच्छी कमाई के बावजूद <strong>45% लोग महीने-दर-महीने जीते हैं</strong>। समस्या कम आय की नहीं है—बल्कि वित्तीय योजना और पैसे के प्रबंधन कौशल की कमी है।
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  These 8 lessons will teach you <strong>practical money management skills</strong> used by financially successful 
                  Indians—from budgeting to building emergency funds, tracking expenses to calculating net worth. All with 
                  <strong> real Indian examples, Hindi explanations,</strong> and <strong>interactive calculators</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-4">
                <Award className="w-12 h-12 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-lg text-gray-700 italic mb-3">
                    "These money management lessons transformed how I handle my finances. I went from overspending every month 
                    to saving ₹15,000 monthly—just by applying the budgeting techniques and tracking my expenses. The Hindi 
                    explanations made it easy for my parents to understand too!"
                  </p>
                  <p className="font-bold text-gray-900">— Priya Sharma, Software Engineer, Mumbai</p>
                  <p className="text-sm text-gray-600">Started with ₹0 savings, now has ₹2.5L emergency fund (18 months)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MoneyManagementHub;


