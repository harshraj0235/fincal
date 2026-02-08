import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  Video,
  CheckSquare,
  FileText,
  Download,
  Share2,
  Star,
  Users,
  MessageCircle
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

const StockMarketLesson: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const lessonData = {
    id: lessonId,
    title: 'What is Stock Market?',
    duration: '25 minutes',
    description: 'Learn the basic definition of stock market and understand its importance in the financial world.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
      <div class="lesson-content">
        <h2>What is Stock Market?</h2>
        <p>The stock market is a marketplace where shares of publicly traded companies are bought and sold. When you buy a share, you become a partial owner of that company. The stock market serves as a platform for companies to raise capital and for investors to potentially earn profits.</p>
        
        <div class="info-box bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
          <h3 class="font-semibold text-blue-800 mb-2">Key Points:</h3>
          <ul class="text-blue-700 space-y-1">
            <li>• Stock market is where company shares are traded</li>
            <li>• Buying shares makes you a partial owner</li>
            <li>• Companies raise capital through stock market</li>
            <li>• Investors can earn through price appreciation and dividends</li>
          </ul>
        </div>

        <h3>Major Stock Exchanges in India</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div class="bg-white p-6 rounded-lg shadow-md border">
            <h4 class="font-bold text-lg text-blue-600 mb-3">NSE (National Stock Exchange)</h4>
            <ul class="space-y-2 text-gray-700">
              <li>• India's largest stock exchange</li>
              <li>• Founded in 1992</li>
              <li>• Electronic trading platform</li>
              <li>• Nifty 50 index</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md border">
            <h4 class="font-bold text-lg text-green-600 mb-3">BSE (Bombay Stock Exchange)</h4>
            <ul class="space-y-2 text-gray-700">
              <li>• Asia's oldest stock exchange</li>
              <li>• Founded in 1875</li>
              <li>• Sensex index</li>
              <li>• Traditional and electronic trading</li>
            </ul>
          </div>
        </div>

        <h3>How Stock Market Works</h3>
        <div class="bg-gray-50 p-6 rounded-lg my-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div class="bg-white p-4 rounded-lg shadow">
              <div class="text-2xl font-bold text-blue-600 mb-2">1</div>
              <h4 class="font-semibold mb-2">Company Goes Public</h4>
              <p class="text-sm text-gray-600">Company offers shares to public through IPO</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <div class="text-2xl font-bold text-green-600 mb-2">2</div>
              <h4 class="font-semibold mb-2">Shares Listed</h4>
              <p class="text-sm text-gray-600">Shares are listed on stock exchange</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <div class="text-2xl font-bold text-purple-600 mb-2">3</div>
              <h4 class="font-semibold mb-2">Trading Begins</h4>
              <p class="text-sm text-gray-600">Investors buy and sell shares</p>
            </div>
          </div>
        </div>

        <h3>Benefits of Stock Market</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div class="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h4 class="font-bold text-green-800 mb-3">For Companies:</h4>
            <ul class="space-y-2 text-green-700">
              <li>• Raise capital for expansion</li>
              <li>• Increase brand visibility</li>
              <li>• Access to public funds</li>
              <li>• Better corporate governance</li>
            </ul>
          </div>
          <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
            <h4 class="font-bold text-blue-800 mb-3">For Investors:</h4>
            <ul class="space-y-2 text-blue-700">
              <li>• Potential for high returns</li>
              <li>• Ownership in companies</li>
              <li>• Dividend income</li>
              <li>• Portfolio diversification</li>
            </ul>
          </div>
        </div>

        <h3>Important Stock Market Terms</h3>
        <div class="overflow-x-auto my-6">
          <table class="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Definition</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Share</td>
                <td class="px-6 py-4 text-gray-700">A unit of ownership in a company</td>
                <td class="px-6 py-4 text-gray-700">1 share of Reliance Industries</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">IPO</td>
                <td class="px-6 py-4 text-gray-700">Initial Public Offering - first sale of shares to public</td>
                <td class="px-6 py-4 text-gray-700">Paytm's IPO in 2021</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Market Cap</td>
                <td class="px-6 py-4 text-gray-700">Total value of company's shares</td>
                <td class="px-6 py-4 text-gray-700">Tata Consultancy Services - ₹12 lakh crore</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Dividend</td>
                <td class="px-6 py-4 text-gray-700">Share of company's profit paid to shareholders</td>
                <td class="px-6 py-4 text-gray-700">₹10 per share dividend</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <h3 class="font-semibold text-yellow-800 mb-2">💡 Pro Tip:</h3>
          <p class="text-yellow-700">Always research a company before investing. Look at their financial statements, business model, and market position. Don't invest based on rumors or tips alone.</p>
        </div>
      </div>
    `,
    quiz: [
      {
        question: 'What is the main function of a stock market?',
        options: [
          'Buying groceries',
          'Buying and selling shares',
          'Saving money in banks'
        ],
        correct: 1
      },
      {
        question: 'What does IPO stand for?',
        options: [
          'Initial Public Offering',
          'Investment Portfolio Option',
          'International Price Order'
        ],
        correct: 0
      },
      {
        question: 'Which is India\'s largest stock exchange?',
        options: [
          'BSE',
          'NSE',
          'MCX'
        ],
        correct: 1
      },
      {
        question: 'What happens when you buy a share?',
        options: [
          'You become a partial owner of the company',
          'You lend money to the company',
          'You become an employee of the company'
        ],
        correct: 0
      }
    ]
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // Here you would typically save progress to backend
  };

  const handleQuizSubmit = (answers: number[]) => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === lessonData.quiz[index].correct
    ).length;
    const score = (correctAnswers / lessonData.quiz.length) * 100;
    alert(`Quiz completed! Your score: ${score}%`);
    setShowQuiz(false);
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title={`${lessonData.title} - Stock Market Basics | MoneyCal.in`}
        description={lessonData.description}
        keywords="stock market basics, what is stock market, share market, trading, investment"
        url={`/stock-market/lesson/${lessonId}`}
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
              onClick={() => navigate('/stock-market/stock-market-basics')}
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Course
            </button>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{lessonData.title}</h1>
                  <p className="text-gray-600">{lessonData.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{lessonData.duration}</div>
                    <div className="text-sm text-gray-500">Duration</div>
                  </div>
                  {isCompleted && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-6 w-6 mr-2" />
                      <span className="font-semibold">Completed</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleComplete}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCompleted
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  {isCompleted ? 'Completed' : 'Mark as Complete'}
                </button>
                <button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                >
                  Take Quiz
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  <Download className="h-4 w-4 mr-1 inline" />
                  Download Notes
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  <Share2 className="h-4 w-4 mr-1 inline" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={lessonData.videoUrl}
                  title={lessonData.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: lessonData.content }}
              />
            </div>
          </motion.div>

          {/* Quiz Section */}
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Lesson Quiz</h2>
                <div className="space-y-6">
                  {lessonData.quiz.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={optionIndex}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => handleQuizSubmit([1, 0, 1, 0])} // Example answers
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 transition-all"
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center"
          >
            <button
              onClick={() => navigate('/stock-market/stock-market-basics')}
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous Lesson
            </button>
            
            <Link
              to="/stock-market/stock-market-basics/lesson/2"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all"
            >
              Next Lesson
              <ChevronRight className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default StockMarketLesson;
