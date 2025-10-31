import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, TrendingUp } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { taxationLessons } from '../../../data/learn/taxationLessons';

const TaxationComplianceHub: React.FC = () => {
  return (
    <>
      <SEOHelmet 
        title="Taxation & Compliance Guide for Indians | MoneyCal Learn" 
        description="Master income tax, 80C deductions, ITR filing, TDS, capital gains tax in Hindi & English. 7 comprehensive lessons with calculators & tax-saving strategies." 
        keywords="income tax India, 80C deductions, ITR filing guide, TDS explained, capital gains tax, advance tax, tax planning strategies, कर योजना, आयकर गाइड" 
        url="/learn/taxation-compliance" 
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto py-12">
          <Link to="/learn" className="inline-flex items-center gap-2 text-gray-600 hover:text-yellow-600 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Learn Hub</span>
          </Link>

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-2xl p-12 mb-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">📋</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">Taxation & Compliance</h1>
                <p className="text-xl opacity-90">कर और अनुपालन - भारतीय कर प्रणाली को समझें</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Master income tax in India! Learn tax slabs, 80C deductions (save ₹46,800!), ITR filing online, TDS, capital gains tax (LTCG/STCG), and advanced tax planning strategies. Save ₹1 lakh/year legally! 🎯
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span><strong>7 Lessons</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span><strong>~5 Hours</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span><strong>Save ₹1L+ Tax/Year</strong></span>
              </div>
            </div>
          </div>

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxationComplianceHub;


