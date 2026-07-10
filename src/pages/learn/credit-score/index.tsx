import React from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import { Link } from 'react-router-dom';

const CreditScoreHub: React.FC = () => {
  const lessons = [
    { id: 1, title: "What is Credit Score (CIBIL)?", slug: "what-is-credit-score", description: "Complete guide to credit scores and CIBIL in India", duration: "12 min read", difficulty: "Beginner", icon: "📊" },
    { id: 2, title: "How Credit Score is Calculated", slug: "how-calculated", description: "5 factors that determine your credit score", duration: "14 min read", difficulty: "Intermediate", icon: "🧮" },
    { id: 3, title: "Credit Score Ranges Explained", slug: "score-ranges", description: "300-900 scale: Excellent, Good, Fair, Poor categories", duration: "9 min read", difficulty: "Beginner", icon: "📈" },
    { id: 4, title: "How to Check Credit Score Free", slug: "check-score-free", description: "Free CIBIL report, online platforms, step-by-step guide", duration: "10 min read", difficulty: "Beginner", icon: "✅" },
    { id: 5, title: "Improve Credit Score in 6 Months", slug: "improve-score", description: "Proven strategies to boost score from 650 to 750+", duration: "15 min read", difficulty: "Intermediate", icon: "🚀" },
    { id: 6, title: "Common Credit Score Mistakes", slug: "common-mistakes", description: "15 mistakes that damage your credit score", duration: "12 min read", difficulty: "Beginner", icon: "⚠️" },
    { id: 7, title: "Credit Score vs Credit Report", slug: "score-vs-report", description: "Difference between score and report, what lenders see", duration: "10 min read", difficulty: "Beginner", icon: "📄" },
    { id: 8, title: "Dispute Credit Report Errors", slug: "dispute-errors", description: "How to correct mistakes and improve score instantly", duration: "13 min read", difficulty: "Intermediate", icon: "🔧" },
    { id: 9, title: "Credit Score for Loan Approval", slug: "loan-approval", description: "Minimum scores needed for home, car, personal loans", duration: "11 min read", difficulty: "Intermediate", icon: "🏦" },
    { id: 10, title: "Build Credit Score from Scratch", slug: "build-from-scratch", description: "Step-by-step guide for first-time credit builders", duration: "14 min read", difficulty: "Advanced", icon: "🏗️" }
  ];

  return (
    <>
      <SEOHelmet
        title="Credit Score (CIBIL) - Complete Guide 2024 | MoneyCal Learn"
        description="Master credit scores with 10 comprehensive lessons. Learn CIBIL, how it's calculated, how to improve from 650 to 800+, and get better loan rates."
        keywords="credit score, CIBIL score, how to improve credit score, check CIBIL free, credit score range, credit report"
        url="/learn/credit-score"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Credit Score', url: '/learn/credit-score' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Credit Score (CIBIL) - Complete Guide",
          description: "Credit score education hub with lessons on CIBIL calculation, improvement, disputes, and loan approval.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: lessons.length
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                📊 Credit Score (CIBIL) - क्रेडिट स्कोर
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-6">
                Complete Guide to Credit Scores in India
              </p>
              <p className="text-lg text-green-100 max-w-3xl mx-auto">
                Master your credit score! Learn how CIBIL works, improve your score to 750+, 
                and save lakhs on loans with better interest rates.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">10</div>
                  <div className="text-sm text-green-100">Expert Lessons</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">2+ Hrs</div>
                  <div className="text-sm text-green-100">Learning Time</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">750+</div>
                  <div className="text-sm text-green-100">Target Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto mb-10">
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
            <p className="text-gray-700 text-sm">Learn score factors, check CIBIL, fix errors, reduce utilization, and track monthly.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
            <p className="text-gray-700 text-sm">Check report → dispute errors → auto-pay setup → utilization &lt; 30% → new credit sparingly.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
            <p className="text-gray-700 text-sm">Move from 650→750 with EMI autopay, lower card usage, and remove duplicate loan entries.</p>
          </div>
        </div>
        {/* Key Benefits */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-gray-800 mb-2">Lower Interest Rates</h3>
              <p className="text-sm text-gray-600">Save 2-3% on loans</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-gray-800 mb-2">Easy Loan Approval</h3>
              <p className="text-sm text-gray-600">750+ gets instant yes</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="font-bold text-gray-800 mb-2">Premium Credit Cards</h3>
              <p className="text-sm text-gray-600">Access best rewards</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold text-gray-800 mb-2">Higher Loan Amounts</h3>
              <p className="text-sm text-gray-600">Get 20-30% more</p>
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              🎓 Your Credit Score Mastery Path
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Transform your credit score from average to excellent in 6 months! 
              Learn every secret to build, maintain, and maximize your CIBIL score.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/learn/credit-score/${lesson.slug}`}
                  className="group bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start">
                    <div className="text-4xl mr-4 group-hover:scale-110 transition-transform">
                      {lesson.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Lesson {lesson.id}
                        </span>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          lesson.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {lesson.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {lesson.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {lesson.duration}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Score Impact */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Credit Score Matters 💯</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">💸</div>
                <h3 className="font-bold text-xl mb-2">Save Lakhs in Interest</h3>
                <p className="text-green-100">
                  Score 750+ vs 650: Save ₹5-7 lakhs on ₹50L home loan!  
                  2-3% lower interest rate = massive savings over 20 years.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold text-xl mb-2">Instant Approvals</h3>
                <p className="text-green-100">
                  800+ score = Pre-approved loans & premium credit cards. 
                  Banks compete for your business with best rates!
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-xl mb-2">Financial Freedom</h3>
                <p className="text-green-100">
                  Good credit opens doors: business loans, car loans, 
                  home loans, premium cards - all at lowest rates!
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/learn/credit-cards" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-bold text-gray-800 mb-2">Credit Cards</h3>
              <p className="text-sm text-gray-600">Master credit card usage</p>
            </Link>
            <Link to="/learn/home-loans" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-gray-800 mb-2">Home Loans</h3>
              <p className="text-sm text-gray-600">Complete home loan guide</p>
            </Link>
            <Link to="/learn" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-bold text-gray-800 mb-2">All Categories</h3>
              <p className="text-sm text-gray-600">Explore all learning paths</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditScoreHub;

