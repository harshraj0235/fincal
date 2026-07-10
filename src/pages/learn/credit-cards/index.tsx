import React from 'react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../../../components/SEOHelmet';

const CreditCardsHub: React.FC = () => {
  const lessons = [
    { id: 1, title: "What is a Credit Card?", slug: "what-is-credit-card", description: "Complete guide to credit cards - how they work, benefits, and basics", duration: "10 min read", difficulty: "Beginner", icon: "💳" },
    { id: 2, title: "Types of Credit Cards in India", slug: "types-of-credit-cards", description: "Explore all types: cashback, rewards, travel, fuel, premium cards", duration: "12 min read", difficulty: "Beginner", icon: "🎴" },
    { id: 3, title: "How to Choose Best Credit Card", slug: "choose-best-card", description: "Compare features, rewards, fees and pick the perfect card", duration: "15 min read", difficulty: "Intermediate", icon: "🎯" },
    { id: 4, title: "Credit Card Application Process", slug: "application-process", description: "Step-by-step guide to apply for credit card online and offline", duration: "11 min read", difficulty: "Beginner", icon: "📝" },
    { id: 5, title: "Documents Required", slug: "documents-required", description: "Complete checklist of documents for credit card application", duration: "8 min read", difficulty: "Beginner", icon: "📄" },
    { id: 6, title: "Credit Card Eligibility Criteria", slug: "eligibility-criteria", description: "Income requirements, age limits, CIBIL score needed", duration: "10 min read", difficulty: "Beginner", icon: "✅" },
    { id: 7, title: "Understanding Credit Limit", slug: "credit-limit", description: "How credit limit is determined and how to increase it", duration: "11 min read", difficulty: "Intermediate", icon: "📊" },
    { id: 8, title: "Interest Rates & Charges Explained", slug: "interest-rates-charges", description: "APR, late fees, processing fees, GST - complete breakdown", duration: "13 min read", difficulty: "Intermediate", icon: "💰" },
    { id: 9, title: "Credit Card Statement Guide", slug: "statement-guide", description: "How to read and understand your credit card statement", duration: "10 min read", difficulty: "Beginner", icon: "📋" },
    { id: 10, title: "Billing Cycle & Payment Due Date", slug: "billing-cycle", description: "Understanding billing cycles and avoiding late payments", duration: "9 min read", difficulty: "Beginner", icon: "📅" },
    { id: 11, title: "Minimum Payment vs Full Payment", slug: "minimum-vs-full-payment", description: "Why paying minimum is dangerous and costs lakhs in interest", duration: "12 min read", difficulty: "Intermediate", icon: "⚠️" },
    { id: 12, title: "Reward Points & Cashback Guide", slug: "rewards-cashback", description: "Maximize rewards, redemption strategies, best value cards", duration: "14 min read", difficulty: "Intermediate", icon: "🎁" },
    { id: 13, title: "Credit Card Frauds & Safety", slug: "fraud-safety", description: "Common frauds, safety tips, what to do if card is stolen", duration: "11 min read", difficulty: "Beginner", icon: "🔒" },
    { id: 14, title: "Credit Card vs Debit Card", slug: "credit-vs-debit", description: "Complete comparison - benefits, risks, when to use which", duration: "10 min read", difficulty: "Beginner", icon: "⚔️" },
    { id: 15, title: "EMI on Credit Card", slug: "emi-on-credit-card", description: "Convert purchases to EMI, interest rates, pros and cons", duration: "12 min read", difficulty: "Intermediate", icon: "💳" },
    { id: 16, title: "Balance Transfer on Credit Cards", slug: "balance-transfer", description: "Transfer high-interest debt to low-interest card and save", duration: "13 min read", difficulty: "Advanced", icon: "🔄" },
    { id: 17, title: "Credit Card Closure Process", slug: "closure-process", description: "How to close credit card properly without hurting CIBIL score", duration: "10 min read", difficulty: "Intermediate", icon: "❌" },
    { id: 18, title: "Credit Card Impact on CIBIL Score", slug: "cibil-impact", description: "How credit cards affect credit score - good and bad ways", duration: "12 min read", difficulty: "Intermediate", icon: "📈" },
    { id: 19, title: "Best Credit Cards in India 2024", slug: "best-credit-cards", description: "Top credit cards comparison - HDFC, SBI, ICICI, Axis, AMEX", duration: "15 min read", difficulty: "Advanced", icon: "🏆" },
    { id: 20, title: "Common Credit Card Mistakes", slug: "common-mistakes", description: "20 mistakes to avoid to save money and protect credit score", duration: "14 min read", difficulty: "Beginner", icon: "🚫" }
  ];

  return (
    <>
      <SEOHelmet
        title="Credit Cards - Complete Guide to Credit Cards in India 2025 | MoneyCal Learn"
        description="Master credit cards with 20 comprehensive lessons. Learn types, rewards, interest rates, CIBIL impact, fraud protection, and smart usage strategies."
        keywords="credit card, credit card India, best credit cards, credit card rewards, credit card eligibility, CIBIL score credit card"
        url="/learn/credit-cards"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Learn', url: '/learn' },
          { name: 'Credit Cards', url: '/learn/credit-cards' }
        ]}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Credit Cards Complete Guide',
          description: '20-lesson course covering types, rewards, interest, statements, billing cycles, fraud safety, CIBIL impact, and smart strategies.',
          provider: {
            '@type': 'Organization',
            name: 'MoneyCal',
            sameAs: 'https://moneycal.in',
          },
          numberOfCredits: lessons.length,
          courseCode: 'CREDIT-CARDS-101',
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online'
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                💳 Credit Cards - क्रेडिट कार्ड
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-6">
                Complete Guide to Credit Cards in India
              </p>
              <p className="text-lg text-purple-100 max-w-3xl mx-auto">
                Master everything about credit cards - from basics to advanced strategies. 
                Learn how to maximize rewards, avoid traps, and build excellent credit score!
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">20</div>
                  <div className="text-sm text-purple-100">Comprehensive Lessons</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">4+ Hrs</div>
                  <div className="text-sm text-purple-100">Learning Content</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-3xl font-bold">⚡</div>
                  <div className="text-sm text-purple-100">Expert Tips</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
              <p className="text-gray-700 text-sm">Start with basics, compare card types, read fees/charges, and set payment discipline. Use lessons to plan rewards.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
              <p className="text-gray-700 text-sm">Choose card → understand billing cycle → pay full by due date → track rewards → avoid minimum payment and late fees.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
              <p className="text-gray-700 text-sm">Pick best cashback card. Read statement correctly. Avoid 36-42% APR by never revolving balance.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="font-bold text-gray-800 mb-2">Rewards & Cashback</h3>
              <p className="text-sm text-gray-600">Earn on every purchase</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-gray-800 mb-2">Fraud Protection</h3>
              <p className="text-sm text-gray-600">Zero liability on frauds</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-bold text-gray-800 mb-2">Build Credit Score</h3>
              <p className="text-sm text-gray-600">Improve CIBIL with usage</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="font-bold text-gray-800 mb-2">Travel Benefits</h3>
              <p className="text-sm text-gray-600">Lounge access, insurance</p>
            </div>
          </div>

          {/* Learning Path */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              🎓 Your Credit Card Mastery Path
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              From beginner to expert in 20 comprehensive lessons. 
              Learn smart usage, maximize benefits, avoid costly mistakes!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/learn/credit-cards/${lesson.slug}`}
                  className="group bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start">
                    <div className="text-4xl mr-4 group-hover:scale-110 transition-transform">
                      {lesson.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
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
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
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

          {/* Why Learn */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Master Credit Cards? 🤔</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="font-bold text-xl mb-2">Save & Earn Money</h3>
                <p className="text-purple-100">
                  Smart credit card usage can give you 2-5% cashback on all purchases. 
                  That's ₹20,000-50,000 saved on ₹10 lakh annual spending!
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-bold text-xl mb-2">Build Credit History</h3>
                <p className="text-purple-100">
                  Proper credit card usage improves CIBIL score to 800+, 
                  making future loans easier and cheaper by 2-3% interest!
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">⚠️</div>
                <h3 className="font-bold text-xl mb-2">Avoid Debt Traps</h3>
                <p className="text-purple-100">
                  Learn to avoid 36-42% interest trap that can cost you lakhs. 
                  Understand minimum payment danger and smart repayment!
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/learn/credit-score" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-gray-800 mb-2">Credit Score</h3>
              <p className="text-sm text-gray-600">Master credit score improvement</p>
            </Link>
            <Link to="/learn/personal-loans" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold text-gray-800 mb-2">Personal Loans</h3>
              <p className="text-sm text-gray-600">Learn about personal financing</p>
            </Link>
            <Link to="/learn" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold text-gray-800 mb-2">All Categories</h3>
              <p className="text-sm text-gray-600">Explore all learning paths</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCardsHub;

