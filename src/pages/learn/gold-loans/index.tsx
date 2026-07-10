import React from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import { Link } from 'react-router-dom';

const GoldLoansHub: React.FC = () => {
  const lessons = [
    {
      id: 1,
      title: "What is Gold Loan?",
      slug: "what-is-gold-loan",
      description: "Complete guide to gold loans in India - how they work, benefits, and eligibility",
      duration: "12 min read",
      difficulty: "Beginner",
      icon: "📚"
    },
    {
      id: 2,
      title: "Gold Loan Interest Rates",
      slug: "interest-rates",
      description: "Compare gold loan interest rates from top banks and NBFCs",
      duration: "10 min read",
      difficulty: "Beginner",
      icon: "💰"
    },
    {
      id: 3,
      title: "Gold Loan Eligibility",
      slug: "eligibility-calculator",
      description: "Check your gold loan eligibility and calculate loan amount",
      duration: "8 min read",
      difficulty: "Beginner",
      icon: "✅"
    },
    {
      id: 4,
      title: "Documents Required",
      slug: "documents-required",
      description: "Complete list of documents needed for gold loan application",
      duration: "7 min read",
      difficulty: "Beginner",
      icon: "📄"
    },
    {
      id: 5,
      title: "Application Process",
      slug: "application-process",
      description: "Step-by-step guide to apply for gold loan online and offline",
      duration: "11 min read",
      difficulty: "Intermediate",
      icon: "📝"
    },
    {
      id: 6,
      title: "Gold Valuation Process",
      slug: "valuation-process",
      description: "How banks value your gold and determine loan amount",
      duration: "9 min read",
      difficulty: "Intermediate",
      icon: "⚖️"
    },
    {
      id: 7,
      title: "Repayment Options",
      slug: "repayment-options",
      description: "Different repayment schemes and EMI options for gold loans",
      duration: "10 min read",
      difficulty: "Intermediate",
      icon: "💳"
    },
    {
      id: 8,
      title: "Gold Loan vs Personal Loan",
      slug: "gold-vs-personal-loan",
      description: "Compare gold loans with personal loans to choose the best option",
      duration: "11 min read",
      difficulty: "Intermediate",
      icon: "⚔️"
    },
    {
      id: 9,
      title: "Best Banks for Gold Loans",
      slug: "best-banks",
      description: "Top banks and NBFCs offering gold loans with best rates and features",
      duration: "13 min read",
      difficulty: "Advanced",
      icon: "🏆"
    },
    {
      id: 10,
      title: "Gold Loan Tax Benefits",
      slug: "tax-benefits",
      description: "Tax implications and benefits of taking gold loans in India",
      duration: "9 min read",
      difficulty: "Advanced",
      icon: "🎯"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Gold Loans - Complete Guide to Gold Loans in India 2024 | MoneyCal Learn"
        description="Complete guide to gold loans in India. Learn about gold loan interest rates, eligibility, application process, documents required, and best banks offering gold loans."
        keywords="gold loan, gold loan interest rate, gold loan eligibility, gold loan amount, gold loan online, gold loan banks"
        url="/learn/gold-loans"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Gold Loans', url: '/learn/gold-loans' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Gold Loans - Complete Guide",
          description: "Gold loan education hub covering interest rates, eligibility, valuation, documents, repayment options, and bank comparisons.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: lessons.length
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                💎 Gold Loans - स्वर्ण ऋण
              </h1>
              <p className="text-xl md:text-2xl text-yellow-100 mb-6">
                Complete Guide to Gold Loans in India
              </p>
              <p className="text-lg text-yellow-100 max-w-3xl mx-auto">
                Learn everything about gold loans - from eligibility and interest rates to application process and best banks. 
                Quick, easy loans against your gold jewelry!
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">10</div>
                  <div className="text-sm text-yellow-100">Comprehensive Lessons</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-sm text-yellow-100">Minutes of Content</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">⚡</div>
                  <div className="text-sm text-yellow-100">Quick Learning</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto mt-8">
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
            <p className="text-gray-700 text-sm">Check LTV limits, compare bank/NBFC rates, prepare documents, choose repayment plan, and avoid auction risks.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
            <p className="text-gray-700 text-sm">Need cash → compare rates → select LTV & tenure → choose interest-only/EMI → plan early closure.</p>
          </div>
          <div className="border rounded-xl p-4 bg-white">
            <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
            <p className="text-gray-700 text-sm">Use 70% LTV for short-term need, pick interest-only for 3 months, then close with minimal cost.</p>
          </div>
        </div>
        {/* Key Benefits */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Quick Approval</h3>
              <p className="text-sm text-gray-600">Get loan in 15-30 minutes</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-gray-800 mb-2">Low Interest</h3>
              <p className="text-sm text-gray-600">Starting from 7.35% p.a.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="font-bold text-gray-800 mb-2">Minimal Documents</h3>
              <p className="text-sm text-gray-600">Just ID and gold jewelry</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-gray-800 mb-2">Safe Storage</h3>
              <p className="text-sm text-gray-600">Bank vaults with insurance</p>
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              🎓 Your Gold Loan Learning Path
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Master everything about gold loans with our comprehensive 10-lesson course. 
              Each lesson is packed with practical examples, real scenarios, and actionable insights in both Hindi and English.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/learn/gold-loans/${lesson.slug}`}
                  className="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start">
                    <div className="text-4xl mr-4 group-hover:scale-110 transition-transform">
                      {lesson.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full">
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
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
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

          {/* Why Learn About Gold Loans */}
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Learn About Gold Loans? 🤔</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-bold text-xl mb-2">Fastest Loans</h3>
                <p className="text-yellow-100">
                  Get instant cash without selling your precious gold jewelry. 
                  Perfect for emergencies and urgent financial needs.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-bold text-xl mb-2">Smart Borrowing</h3>
                <p className="text-yellow-100">
                  Lower interest rates than personal loans, no credit score needed, 
                  and flexible repayment options make it ideal for businesses and individuals.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-xl mb-2">Make Informed Decisions</h3>
                <p className="text-yellow-100">
                  Understand loan-to-value ratios, compare banks, 
                  choose the best scheme, and avoid common pitfalls.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/learn/personal-loans" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-bold text-gray-800 mb-2">Personal Loans</h3>
              <p className="text-sm text-gray-600">Explore unsecured loan options</p>
            </Link>
            <Link to="/learn/business-loans" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-bold text-gray-800 mb-2">Business Loans</h3>
              <p className="text-sm text-gray-600">Funding for your business growth</p>
            </Link>
            <Link to="/learn/home-loans" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-gray-800 mb-2">Home Loans</h3>
              <p className="text-sm text-gray-600">Complete guide to home financing</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoldLoansHub;
