import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Target, CheckCircle, Play, ArrowRight, Star, TrendingUp, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const TechnicalAnalysis: React.FC = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons = [
    {
      id: 'technical-analysis-intro',
      title: 'What is Technical Analysis?',
      duration: '40 min',
      description: 'Understanding the basics of technical analysis and chart patterns',
      topics: ['Definition and principles', 'Price action analysis', 'Market psychology', 'Technical vs fundamental']
    },
    {
      id: 'candlestick-charts',
      title: 'Candlestick Chart Patterns',
      duration: '55 min',
      description: 'Master candlestick patterns and their significance in trading',
      topics: ['Doji patterns', 'Hammer and hanging man', 'Engulfing patterns', 'Morning and evening stars']
    },
    {
      id: 'support-resistance',
      title: 'Support and Resistance Levels',
      duration: '50 min',
      description: 'Learn to identify and trade support and resistance levels',
      topics: ['Identifying key levels', 'Breakout trading', 'False breakouts', 'Volume confirmation']
    },
    {
      id: 'trend-analysis',
      title: 'Trend Analysis and Direction',
      duration: '45 min',
      description: 'Understanding market trends and directional trading',
      topics: ['Trend identification', 'Higher highs and lows', 'Trend reversal signals', 'Trend strength']
    },
    {
      id: 'technical-indicators',
      title: 'Technical Indicators',
      duration: '70 min',
      description: 'Master popular technical indicators for trading decisions',
      topics: ['Moving averages', 'RSI and momentum', 'MACD strategy', 'Bollinger Bands']
    },
    {
      id: 'chart-patterns',
      title: 'Chart Patterns and Formations',
      duration: '60 min',
      description: 'Recognize and trade major chart patterns',
      topics: ['Head and shoulders', 'Double tops and bottoms', 'Triangles and wedges', 'Flags and pennants']
    },
    {
      id: 'volume-analysis',
      title: 'Volume Analysis',
      duration: '40 min',
      description: 'Understanding volume and its role in technical analysis',
      topics: ['Volume confirmation', 'Volume divergence', 'Volume patterns', 'Market participation']
    },
    {
      id: 'trading-strategies',
      title: 'Technical Trading Strategies',
      duration: '65 min',
      description: 'Combine technical analysis tools into effective trading strategies',
      topics: ['Multiple timeframe analysis', 'Risk management', 'Entry and exit points', 'Backtesting strategies']
    }
  ];

  const handleComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  return (
    <>
      <SEOHelmet
        title="Technical Analysis Course - Stock Market Education | MoneyCal"
        description="Master technical analysis with our comprehensive course. Learn chart patterns, indicators, and trading strategies for successful stock market trading."
        keywords="technical analysis, chart patterns, candlestick, support resistance, trading indicators, stock market course"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Technical Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master chart patterns, technical indicators, and trading strategies to make informed trading decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{totalLessons}</h3>
              <p className="text-gray-600">Lessons</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">5.5 Hours</h3>
              <p className="text-gray-600">Total Content</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Advanced</h3>
              <p className="text-gray-600">Level</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
              <p className="text-gray-600">Price</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Course Progress</h2>
              <span className="text-sm text-gray-600">{completedCount}/{totalLessons} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {progressPercentage.toFixed(0)}% complete
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mr-3">
                          Lesson {index + 1}
                        </span>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {lesson.duration}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {lesson.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {lesson.description}
                      </p>

                      <div className="flex items-center space-x-4">
                        <Link
                          to={`/stock-market/technical-analysis/lesson/${lesson.id}`}
                          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          View Lesson
                        </Link>
                        
                        <button
                          onClick={() => handleComplete(lesson.id)}
                          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                            completedLessons.includes(lesson.id)
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {completedLessons.includes(lesson.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Target className="h-4 w-4 mr-2" />
                              Mark Complete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Ready for Advanced Trading?</h2>
            <p className="text-lg mb-6 opacity-90">
              After completing Technical Analysis, advance to Advanced Trading Strategies to learn sophisticated trading techniques.
            </p>
            <Link
              to="/stock-market/advanced-trading-strategies"
              className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Advanced Trading Strategies Course
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TechnicalAnalysis;
