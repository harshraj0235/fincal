import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, Target } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { advancedFinanceLessons } from '../../../data/learn/advancedFinanceLessons';

const AdvancedSpecialisedFinanceHub: React.FC = () => {
  return (
    <>
      <SEOHelmet 
        title="Advanced Topics & Specialised Finance Guide for Indians | MoneyCal Learn" 
        description="Master real estate investment, commodities trading (MCX/NCDEX), global investing (US stocks), derivatives (F&O), cryptocurrency, alternative investments (AIF/PMS), estate planning in Hindi & English." 
        keywords="real estate investment India, commodities trading MCX, global investing US stocks, derivatives F&O, cryptocurrency Bitcoin, alternative investments AIF PMS, estate planning, उन्नत वित्त विषय" 
        url="/learn/advanced-specialised-finance" 
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto py-12">
          <Link to="/learn" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Learn Hub</span>
          </Link>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-12 mb-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">🎯</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">Advanced Topics / Specialised Finance</h1>
                <p className="text-xl opacity-90">उन्नत विषय / विशेष वित्त - अनुभवी निवेशकों के लिए</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Take your investing to the next level! Master real estate (REITs, property investment), commodities trading (MCX gold/silver), global investing (US stocks), derivatives (F&O), cryptocurrency (Bitcoin/Ethereum), alternative investments (AIF/PMS), and estate planning. Advanced strategies for wealth multiplication! 📈
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
                <Target className="w-5 h-5" />
                <span><strong>For Experienced Investors</strong></span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {advancedFinanceLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/learn/advanced-specialised-finance/${lesson.slug}`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-400 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-purple-600 uppercase">{lesson.difficulty}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                <p className="text-sm text-purple-700 font-semibold mb-4">🇮🇳 {lesson.titleHindi}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Start Learning →</span>
                  <div className="w-8 h-8 rounded-full bg-purple-100 group-hover:bg-purple-400 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 text-purple-600 group-hover:text-white rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">⚠️ Advanced Content - High Risk, High Reward!</h2>
            <p className="text-gray-600 mb-6">
              These lessons cover <strong>advanced investment strategies</strong> with higher risk. Start with <strong>Real Estate Investment</strong> for tangible asset diversification, or explore <strong>Derivatives (F&O)</strong> for leveraged trading. Only for experienced investors!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/learn/advanced-specialised-finance/real-estate-investment-india-residential-commercial-reits-property-guide-2025"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Start with Real Estate
              </Link>
              <Link
                to="/learn/advanced-specialised-finance/derivatives-trading-futures-options-nifty-bank-nifty-hedging-india-2025"
                className="px-6 py-3 bg-white border-2 border-purple-500 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
              >
                Explore Derivatives F&O
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedSpecialisedFinanceHub;


