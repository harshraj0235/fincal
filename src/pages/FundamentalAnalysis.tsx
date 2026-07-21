import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Target, CheckCircle, Play, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';


const FundamentalAnalysis: React.FC = () => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons = [
    {
      id: 'fundamental-analysis-intro',
      title: 'What is Fundamental Analysis?',
      duration: '45 min',
      description: 'Understanding the basics of fundamental analysis and its importance in stock evaluation',
      topics: ['Definition and purpose', 'Types of analysis', 'Key principles', 'When to use fundamental analysis']
    },
    {
      id: 'financial-statements',
      title: 'Reading Financial Statements',
      duration: '60 min',
      description: 'Learn to read and interpret balance sheets, income statements, and cash flow statements',
      topics: ['Balance sheet analysis', 'Income statement breakdown', 'Cash flow statement', 'Key ratios']
    },
    {
      id: 'eps-pe-ratio',
      title: 'EPS and P/E Ratio Analysis',
      duration: '50 min',
      description: 'Deep dive into Earnings Per Share and Price-to-Earnings ratio calculations',
      topics: ['EPS calculation methods', 'P/E ratio interpretation', 'Industry comparisons', 'Growth vs value stocks']
    },
    {
      id: 'roe-analysis',
      title: 'Return on Equity (ROE)',
      duration: '40 min',
      description: 'Understanding ROE and its significance in evaluating company performance',
      topics: ['ROE calculation', 'DuPont analysis', 'Industry benchmarks', 'ROE trends']
    },
    {
      id: 'debt-analysis',
      title: 'Debt and Financial Health',
      duration: '55 min',
      description: 'Analyzing company debt levels and financial stability',
      topics: ['Debt-to-equity ratio', 'Interest coverage ratio', 'Credit ratings', 'Financial risk assessment']
    },
    {
      id: 'valuation-methods',
      title: 'Valuation Methods',
      duration: '70 min',
      description: 'Different approaches to valuing stocks and companies',
      topics: ['DCF valuation', 'Comparable company analysis', 'Asset-based valuation', 'Intrinsic value calculation']
    },
    {
      id: 'industry-analysis',
      title: 'Industry and Sector Analysis',
      duration: '50 min',
      description: 'Understanding industry dynamics and competitive positioning',
      topics: ['Industry life cycle', 'Competitive analysis', 'Market share analysis', 'Sector rotation']
    },
    {
      id: 'management-quality',
      title: 'Management Quality Assessment',
      duration: '45 min',
      description: 'Evaluating company leadership and corporate governance',
      topics: ['Management track record', 'Corporate governance', 'Shareholder alignment', 'Transparency']
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
        title="Fundamental Analysis Course - Stock Market Education | MoneyCal"
        description="Master fundamental analysis with our comprehensive course. Learn to analyze financial statements, calculate key ratios, and make informed investment decisions."
        keywords="fundamental analysis, financial statements, P/E ratio, ROE, stock valuation, investment analysis"
      />
      <WhatsAppBanner />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fundamental Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the art of analyzing company fundamentals to make informed investment decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">{totalLessons}</h3>
              <p className="text-gray-600">Lessons</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-gray-900">6 Hours</h3>
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
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
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
                        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mr-3">
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
                          to={`/stock-market/fundamental-analysis/lesson/${lesson.id}`}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
            className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Ready for the Next Level?</h2>
            <p className="text-lg mb-6 opacity-90">
              After completing Fundamental Analysis, advance to Technical Analysis to learn chart patterns and market indicators.
            </p>
            <Link
              to="/stock-market/technical-analysis"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Technical Analysis Course
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FundamentalAnalysis;
