import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, Brain } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';
import { behaviouralFinanceLessons } from '../../../data/learn/behaviouralFinanceLessons';

const BehaviouralFinanceHub: React.FC = () => {
  return (
    <>
      <SEOHelmet 
        title="Behavioural Finance & Money Psychology Guide for Indians | MoneyCal Learn" 
        description="Master money mindset, overcome investing biases (herd mentality, FOMO), control emotional investing, build wealth habits, achieve financial independence (FIRE), manage money in relationships in Hindi & English." 
        keywords="money mindset India, investing biases, emotional investing, FOMO, wealth habits, FIRE financial independence, money relationships, व्यवहारिक वित्त, धन मनोविज्ञान" 
        url="/learn/behavioural-finance-money-psychology" 
      />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pt-20 px-4">
        <div className="max-w-6xl mx-auto py-12">
          <Link to="/learn" className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Learn Hub</span>
          </Link>

          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-12 mb-12 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">🧠</span>
              <div>
                <h1 className="text-4xl font-bold mb-2">Behavioural Finance & Money Psychology</h1>
                <p className="text-xl opacity-90">व्यवहारिक वित्त और धन मनोविज्ञान</p>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              Master the psychology of money! Understand money mindset (scarcity vs abundance), overcome investing biases (herd mentality, FOMO), control emotional investing (fear, greed), build wealth habits, achieve FIRE (Financial Independence Retire Early), and manage money in relationships. The mind matters more than math! 🧠💰
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
                <Brain className="w-5 h-5" />
                <span><strong>Change Your Money Mindset</strong></span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {behaviouralFinanceLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                to={`/learn/behavioural-finance-money-psychology/${lesson.slug}`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-pink-400 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-pink-600 uppercase">{lesson.difficulty}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                <p className="text-sm text-pink-700 font-semibold mb-4">🇮🇳 {lesson.titleHindi}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {lesson.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Start Learning →</span>
                  <div className="w-8 h-8 rounded-full bg-pink-100 group-hover:bg-pink-400 flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 text-pink-600 group-hover:text-white rotate-180" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">💡 Rich Mind = Rich Life!</h2>
            <p className="text-gray-600 mb-6">
              "<strong>The biggest barrier between you and wealth is your mindset</strong>." Start with <strong>Money Mindset & Psychology</strong> to break limiting beliefs, or jump to <strong>Emotional Investing</strong> to stop panic selling!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/learn/behavioural-finance-money-psychology/money-mindset-psychology-scarcity-vs-abundance-wealth-india-2025"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Start with Money Mindset
              </Link>
              <Link
                to="/learn/behavioural-finance-money-psychology/emotional-investing-fear-greed-panic-selling-fomo-india-2025"
                className="px-6 py-3 bg-white border-2 border-pink-500 text-pink-600 rounded-lg font-semibold hover:bg-pink-50 transition-all"
              >
                Control Emotional Investing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BehaviouralFinanceHub;



