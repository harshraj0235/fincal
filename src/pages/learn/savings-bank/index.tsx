import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Clock, Award, Target,
  CreditCard, CheckCircle, Calculator, IndianRupee, PieChart, TrendingUp
} from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { savingsBankCategory, savingsBankLessons, savingsBankSEO } from '../../../data/learn/savingsBankLessons';

const SavingsBankHub: React.FC = () => {
  return (
    <>
      <SEOHelmet
        title={savingsBankSEO.metaTitle}
        description={savingsBankSEO.metaDescription}
        keywords={savingsBankSEO.keywords}
        url="/learn/savings-bank-products"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Savings & Bank Products', url: '/learn/savings-bank-products' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Savings & Bank Products",
          description: "Savings and bank products education hub covering account types, FDs, RDs, high-interest accounts, SCSS, and bank fee optimization.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: savingsBankLessons.length
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
        {/* Sticky Header */}
        <header className="bg-white shadow-md sticky top-0 z-50 border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/learn" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-semibold">All Categories</span>
              </Link>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">
                  {savingsBankCategory.totalLessons} Lessons • {savingsBankCategory.estimatedHours} Hours
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-lg mb-6">
              <CreditCard className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {savingsBankCategory.name}
            </h1>
            <p className="text-2xl text-gray-600 mb-2">
              {savingsBankCategory.nameHindi}
            </p>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              {savingsBankCategory.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { icon: <BookOpen className="w-5 h-5" />, label: 'Lessons', value: savingsBankCategory.totalLessons },
                { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: savingsBankCategory.estimatedHours },
                { icon: <Award className="w-5 h-5" />, label: 'Level', value: 'Beginner' },
                { icon: <Target className="w-5 h-5" />, label: 'Language', value: 'Hi+En' }
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex justify-center text-blue-600 mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
              <p className="text-gray-700 text-sm">Start with account types, set auto-sweep, ladder FDs, use SCSS/PMVVY if eligible, and avoid hidden bank fees.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
              <p className="text-gray-700 text-sm">Choose account → enable sweep-in → allocate to FD/RD → compare digital banks → review charges quarterly.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
              <p className="text-gray-700 text-sm">Zero balance + premium combo, 1-3-6-12 month FD ladder, SCSS for seniors, and fee-free transactions strategy.</p>
            </div>
          </div>

          {/* Recommended Savings Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 bg-white rounded-2xl shadow-xl p-6 border border-blue-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-blue-600" />
                Recommended Savings Tools
              </h3>
              <Link to="/calculators" className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 group">
                All Calculators
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/calculators/fd-calculator" className="group">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 group-hover:bg-blue-100 transition-colors h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <Calculator className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-blue-900 text-sm">FD Calculator</h4>
                  </div>
                  <p className="text-[10px] text-blue-700 leading-tight">Maturity & interest for Fixed Deposits.</p>
                </div>
              </Link>
              <Link to="/calculators/rd-calculator" className="group">
                <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-100 group-hover:bg-cyan-100 transition-colors h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h4 className="font-bold text-cyan-900 text-sm">RD Calculator</h4>
                  </div>
                  <p className="text-[10px] text-cyan-700 leading-tight">Returns on monthly Recurring Deposits.</p>
                </div>
              </Link>
              <Link to="/calculators/savings-account-calculator" className="group">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-100 transition-colors h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <IndianRupee className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-emerald-900 text-sm">Savings Interst</h4>
                  </div>
                  <p className="text-[10px] text-emerald-700 leading-tight">Calculate quarterly savings interest.</p>
                </div>
              </Link>
              <Link to="/calculators/post-office-calculator" className="group">
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 group-hover:bg-purple-100 transition-colors h-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                      <PieChart className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-purple-900 text-sm">Post Office</h4>
                  </div>
                  <p className="text-[10px] text-purple-700 leading-tight">NSC, KVP & Monthly Income Scheme.</p>
                </div>
              </Link>
            </div>
          </motion.div>
          {/* What You'll Learn */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-7 h-7 text-blue-600" />
              What You'll Master (आप क्या सीखेंगे)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Choose the right savings account (zero balance vs premium)',
                'Maximize FD returns with laddering strategy (earn 7.5%)',
                'Compare RD vs SIP for monthly savings',
                'Access high-interest digital bank accounts (6-7%)',
                'Use senior citizen schemes (SCSS 8.2%, PMVVY)',
                'Enable auto-sweep to earn FD rates on savings',
                'Avoid bank charges and hidden fees (save ₹5K/year)',
                'Implement strategies to earn 2-3% more on bank savings'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lessons Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              📚 Course Lessons (पाठ्यक्रम)
            </h2>
            <div className="grid gap-6">
              {savingsBankLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={`/learn/savings-bank-products/${lesson.slug}`}
                    className="block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden group border-2 border-gray-200 hover:border-blue-500"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                            {lesson.order}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {lesson.title}
                            </h3>
                            <p className="text-blue-700 text-sm mb-2">{lesson.titleHindi}</p>
                            <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {lesson.tags.slice(0, 4).map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 ml-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">
                            {lesson.duration}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            lesson.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                            lesson.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                        Start Lesson
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center text-white shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4">
              Ready to Maximize Your Savings?
            </h3>
            <p className="text-xl mb-8 text-white/90">
              Start with Lesson 1 and master bank products in 5 hours!
            </p>
            <Link
              to={`/learn/savings-bank-products/${savingsBankLessons[0].slug}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              <BookOpen className="w-6 h-6" />
              Start Lesson 1
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default SavingsBankHub;






