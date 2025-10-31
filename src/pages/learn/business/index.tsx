import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, Briefcase } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { businessFinanceLessons } from '../../../data/learn/businessFinanceLessons';

const BusinessFinanceHub: React.FC = () => {
  return (
    <>
      <SEOHelmet 
        title="Business Finance & Entrepreneurship Guide for Indians | MoneyCal Learn" 
        description="Master startup funding, business loans (MUDRA, MSME), cash flow management, GST compliance, business registration, scaling strategies in Hindi & English. 7 comprehensive lessons for Indian entrepreneurs." 
        keywords="startup funding India, business loans MUDRA MSME, cash flow management, GST compliance, business registration LLP Pvt Ltd, scaling business strategies, व्यवसाय वित्त, स्टार्टअप फंडिंग" 
        url="/learn/business-finance-entrepreneurship" 
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto py-12">
          <Link to="/learn" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Learn Hub</span>
          </Link>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-12 mb-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">💼</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">Business Finance & Entrepreneurship</h1>
                <p className="text-xl opacity-90">व्यवसाय वित्त और उद्यमिता - भारतीय उद्यमियों के लिए</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Build your business empire in India! Master startup funding (seed, angel, VC), business loans (MUDRA ₹10L, MSME), cash flow management, GST compliance, business registration (LLP vs Pvt Ltd), and scaling strategies. Complete guide for entrepreneurs! 🚀
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span><strong>7 Lessons</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span><strong>~6 Hours</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span><strong>Startup to Scale-Up</strong></span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {businessFinanceLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/learn/business-finance-entrepreneurship/${lesson.slug}`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-400 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-green-600 uppercase">{lesson.difficulty}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                <p className="text-sm text-green-700 font-semibold mb-4">🇮🇳 {lesson.titleHindi}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Start Learning →</span>
                  <div className="w-8 h-8 rounded-full bg-green-100 group-hover:bg-green-400 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 text-green-600 group-hover:text-white rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">🚀 Build the Next Indian Unicorn!</h2>
            <p className="text-gray-600 mb-6">
              India has <strong>100+ unicorns</strong> and counting! Start with <strong>Startup Funding Guide</strong> to understand seed, angel, and VC funding, or jump to <strong>MUDRA Loans</strong> for government-backed financing up to ₹10 lakh!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/learn/business-finance-entrepreneurship/startup-funding-india-seed-angel-vc-bootstrapping-complete-guide-2025"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Start with Funding Guide
              </Link>
              <Link
                to="/learn/business-finance-entrepreneurship/business-loans-india-mudra-msme-working-capital-term-loan-guide-2025"
                className="px-6 py-3 bg-white border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all"
              >
                Explore Business Loans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessFinanceHub;

