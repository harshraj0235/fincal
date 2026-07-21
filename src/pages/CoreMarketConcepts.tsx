import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  Video,
  CheckSquare
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';


const CoreMarketConcepts: React.FC = () => {
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    {
      id: 1,
      title: 'Bull and Bear Markets',
      duration: '30 minutes',
      description: 'Understand the difference between bull and bear markets and their characteristics'
    },
    {
      id: 2,
      title: 'Market Capitalization',
      duration: '35 minutes',
      description: 'Learn about market cap and how it categorizes companies'
    },
    {
      id: 3,
      title: 'Dividends and Types',
      duration: '40 minutes',
      description: 'Explore different types of dividends and their importance'
    },
    {
      id: 4,
      title: 'Sectors and Indices',
      duration: '45 minutes',
      description: 'Understand market sectors and major stock indices'
    },
    {
      id: 5,
      title: 'Economic Cycles and Market Impact',
      duration: '50 minutes',
      description: 'Learn how economic cycles affect stock markets'
    }
  ];

  const handleLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <>
      <WhatsAppBanner />
      <SEOHelmet
        title="Core Market Concepts - Stock Market Course | MoneyCal.in"
        description="Learn core market concepts including bull and bear markets, market capitalization, dividends, sectors and economic cycles."
        keywords="core market concepts, bull market, bear market, market capitalization, dividends, stock market sectors"
        url="/stock-market/core-market-concepts"
        structuredData={{}}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate('/stock-market')}
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to All Courses
            </button>
            
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mr-6 shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Core Market Concepts</h1>
                <p className="text-xl text-gray-600">Bull and Bear markets, Market cap, Dividends and Sectors</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Course Progress</h3>
                <span className="text-sm text-gray-600">{completedLessons.length}/{lessons.length} completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                <span>Intermediate</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
            </div>
          </motion.div>

          {/* Course Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{lessons.length}</div>
              <div className="text-gray-600">Lessons</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">3 hours</div>
              <div className="text-gray-600">Total Time</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">Intermediate</div>
              <div className="text-gray-600">Level</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">Free</div>
              <div className="text-gray-600">Price</div>
            </div>
          </motion.div>

          {/* Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Lessons</h2>
            
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        completedLessons.includes(lesson.id) 
                          ? 'bg-green-500' 
                          : 'bg-gray-200'
                      }`}>
                        {completedLessons.includes(lesson.id) ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <span className="text-gray-600 font-semibold">{lesson.id}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-gray-900 mr-3">{lesson.title}</h3>
                          {completedLessons.includes(lesson.id) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{lesson.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {lesson.duration}
                          </div>
                          <div className="flex items-center">
                            <Video className="h-4 w-4 mr-1" />
                            Video Lesson
                          </div>
                          <div className="flex items-center">
                            <CheckSquare className="h-4 w-4 mr-1" />
                            Quiz
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleLessonComplete(lesson.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          completedLessons.includes(lesson.id)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {completedLessons.includes(lesson.id) ? 'Completed' : 'Mark Complete'}
                      </button>
                      
                      <Link
                        to={`/stock-market/core-market-concepts/lesson/${lesson.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-green-600 hover:to-blue-700 transition-all"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Next Course */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 bg-gradient-to-br from-green-600 to-blue-700 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Next Course</h2>
            <p className="text-xl mb-8 text-green-100">
              After completing this course, move on to "Fundamental Analysis" to learn about company financial health
            </p>
            <Link
              to="/stock-market/fundamental-analysis"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-2xl font-semibold hover:bg-gray-100 transition-all"
            >
              Start Next Course
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CoreMarketConcepts;
