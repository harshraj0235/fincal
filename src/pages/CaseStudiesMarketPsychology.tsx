import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Target, CheckCircle, Play, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';


const CaseStudiesMarketPsychology: React.FC = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons = [
    {
      id: 'famous-case-studies',
      title: 'Famous Stock Market Case Studies',
      duration: '70 min',
      description: 'Learn from historical market events and their lessons',
      topics: ['Dot-com bubble', '2008 financial crisis', 'GameStop saga', 'Tesla rise']
    },
    {
      id: 'behavioral-finance',
      title: 'Behavioral Finance Basics',
      duration: '55 min',
      description: 'Understand psychological biases in financial decision making',
      topics: ['Cognitive biases', 'Emotional trading', 'Herd mentality', 'Overconfidence']
    },
    {
      id: 'emotional-discipline',
      title: 'Emotional Discipline in Trading',
      duration: '45 min',
      description: 'Master emotional control for consistent trading performance',
      topics: ['Fear and greed', 'Stress management', 'Mental frameworks', 'Discipline techniques']
    },
    {
      id: 'market-psychology',
      title: 'Market Psychology Patterns',
      duration: '50 min',
      description: 'Recognize psychological patterns in market behavior',
      topics: ['Market sentiment', 'Crowd psychology', 'Contrarian investing', 'Sentiment indicators']
    },
    {
      id: 'risk-psychology',
      title: 'Psychology of Risk Management',
      duration: '40 min',
      description: 'Understand psychological aspects of risk management',
      topics: ['Loss aversion', 'Risk tolerance', 'Position sizing psychology', 'Stop-loss psychology']
    },
    {
      id: 'success-psychology',
      title: 'Psychology of Successful Traders',
      duration: '35 min',
      description: 'Learn mental habits of successful traders and investors',
      topics: ['Mindset development', 'Goal setting', 'Continuous learning', 'Resilience building']
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
        title="Case Studies & Market Psychology Course - Stock Market Education | MoneyCal"
        description="Learn from real market case studies and master the psychology of trading for long-term success in the stock market."
        keywords="case studies, market psychology, behavioral finance, trading psychology, emotional discipline, stock market success"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Case Studies & Market Psychology
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from real market events and master the psychology of trading for long-term success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <BookOpen className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{totalLessons}</h3>
              <p className="text-gray-600">Lessons</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">4.5 Hours</h3>
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
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
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
                        <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full mr-3">
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
                          to={`/stock-market/case-studies-market-psychology/lesson/${lesson.id}`}
                          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
            className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg mb-6 opacity-90">
              You've completed the comprehensive Stock Market education program. You're now equipped with the knowledge and skills for successful investing.
            </p>
            <Link
              to="/stock-market"
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Return to Stock Market Hub
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CaseStudiesMarketPsychology;
