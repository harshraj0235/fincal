import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Target, CheckCircle, Play, ArrowRight, Star, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const AdvancedTradingStrategies: React.FC = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons = [
    {
      id: 'swing-trading',
      title: 'Swing Trading Strategies',
      duration: '60 min',
      description: 'Master swing trading techniques for medium-term profits',
      topics: ['Swing trading basics', 'Entry and exit timing', 'Position sizing', 'Risk management']
    },
    {
      id: 'day-trading',
      title: 'Day Trading Fundamentals',
      duration: '75 min',
      description: 'Learn day trading strategies and intraday techniques',
      topics: ['Day trading setup', 'Intraday patterns', 'Scalping techniques', 'Market timing']
    },
    {
      id: 'options-futures',
      title: 'Options and Futures Trading',
      duration: '80 min',
      description: 'Advanced derivatives trading strategies',
      topics: ['Options basics', 'Futures trading', 'Hedging strategies', 'Leverage management']
    },
    {
      id: 'risk-management',
      title: 'Advanced Risk Management',
      duration: '55 min',
      description: 'Comprehensive risk management for professional trading',
      topics: ['Portfolio risk', 'Stop-loss strategies', 'Position sizing', 'Correlation analysis']
    },
    {
      id: 'algorithmic-trading',
      title: 'Algorithmic Trading Basics',
      duration: '70 min',
      description: 'Introduction to algorithmic and automated trading',
      topics: ['Trading algorithms', 'Backtesting', 'Execution strategies', 'Market microstructure']
    },
    {
      id: 'psychology-trading',
      title: 'Trading Psychology',
      duration: '50 min',
      description: 'Master the psychological aspects of trading',
      topics: ['Emotional control', 'Discipline', 'Mental frameworks', 'Stress management']
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
        title="Advanced Trading Strategies Course - Stock Market Education | MoneyCal"
        description="Master advanced trading strategies including swing trading, day trading, options, and risk management for professional trading success."
        keywords="advanced trading, swing trading, day trading, options trading, risk management, trading psychology"
      />
      <WhatsAppBanner />
      <AstroFinanceButton />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Advanced Trading Strategies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master sophisticated trading techniques including swing trading, day trading, options, and advanced risk management.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{totalLessons}</h3>
              <p className="text-gray-600">Lessons</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">6.5 Hours</h3>
              <p className="text-gray-600">Total Content</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Users className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">Expert</h3>
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
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
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
                        <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full mr-3">
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
                          to={`/stock-market/advanced-trading-strategies/lesson/${lesson.id}`}
                          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
            className="mt-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Ready for Practical Application?</h2>
            <p className="text-lg mb-6 opacity-90">
              After completing Advanced Trading Strategies, explore Tools & Practical Application to learn real-world trading tools and techniques.
            </p>
            <Link
              to="/stock-market/tools-practical-application"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Tools & Practical Application Course
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdvancedTradingStrategies;
