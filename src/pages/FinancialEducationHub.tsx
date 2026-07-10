import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, IndianRupee, TrendingUp, Shield, Users, Award, Clock, Target, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const FinancialEducationHub: React.FC = () => {
  const navigate = useNavigate();

  const educationTopics = [
    {
      title: "Personal Finance Basics",
      description: "Learn the fundamentals of managing your money, budgeting, and building wealth",
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
      topics: ["Budgeting", "Emergency Funds", "Debt Management", "Credit Scores"],
      link: "/blog/category/personal-finance"
    },
    {
      title: "Investment Strategies",
      description: "Understand different investment options and how to build a diversified portfolio",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      topics: ["Mutual Funds", "Stocks", "Bonds", "Real Estate"],
      link: "/blog/category/investments"
    },
    {
      title: "Tax Planning",
      description: "Master tax-saving strategies and understand the Indian tax system",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
      topics: ["Income Tax", "Tax Saving", "Deductions", "ITR Filing"],
      link: "/tax-tools"
    },
    {
      title: "Retirement Planning",
      description: "Plan for your golden years with proper retirement strategies",
      icon: Target,
      color: "from-orange-500 to-orange-600",
      topics: ["NPS", "EPF", "PPF", "Retirement Corpus"],
      link: "/calculators/retirement-calculator"
    },
    {
      title: "Insurance & Protection",
      description: "Protect your family and assets with the right insurance coverage",
      icon: Shield,
      color: "from-red-500 to-red-600",
      topics: ["Life Insurance", "Health Insurance", "Term Plans", "ULIPs"],
      link: "/calculators/insurance-calculator"
    },
    {
      title: "Loan Management",
      description: "Understand different types of loans and how to manage them effectively",
      icon: IndianRupee,
      color: "from-indigo-500 to-indigo-600",
      topics: ["Home Loans", "Personal Loans", "EMI Management", "Prepayment"],
      link: "/calculators/emi-calculator"
    }
  ];

  const learningPaths = [
    {
      title: "Beginner's Guide to Personal Finance",
      duration: "2-3 hours",
      level: "Beginner",
      description: "Start your financial journey with this comprehensive guide covering budgeting, saving, and basic investment concepts.",
      modules: ["Understanding Money", "Creating a Budget", "Building Emergency Fund", "Introduction to Investments"],
      link: "/blog/personal-finance-beginners-guide"
    },
    {
      title: "Advanced Investment Strategies",
      duration: "4-5 hours",
      level: "Advanced",
      description: "Dive deep into advanced investment strategies, portfolio management, and risk assessment techniques.",
      modules: ["Portfolio Diversification", "Risk Management", "Market Analysis", "Tax-Efficient Investing"],
      link: "/blog/advanced-investment-strategies"
    },
    {
      title: "Tax Optimization Masterclass",
      duration: "3-4 hours",
      level: "Intermediate",
      description: "Learn how to optimize your taxes legally and maximize your savings through smart tax planning.",
      modules: ["Tax Slabs & Rates", "Deductions & Exemptions", "Tax-Saving Investments", "ITR Filing"],
      link: "/tax-tools"
    }
  ];

  const resources = [
    {
      title: "Financial Calculators",
      description: "50+ free calculators for all your financial planning needs",
      icon: IndianRupee,
      count: "50+",
      link: "/calculators"
    },
    {
      title: "Educational Articles",
      description: "In-depth articles covering all aspects of personal finance",
      icon: BookOpen,
      count: "100+",
      link: "/blog"
    },
    {
      title: "Tax Tools",
      description: "Advanced tools for tax planning and optimization",
      icon: Shield,
      count: "25+",
      link: "/tax-tools"
    },
    {
      title: "Investment Tools",
      description: "Comprehensive tools for investment analysis and planning",
      icon: TrendingUp,
      count: "30+",
      link: "/finance-tools"
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Financial Education Hub - Learn Personal Finance & Investment | MoneyCal.in"
        description="Comprehensive financial education hub with free courses, guides, and tools to help you master personal finance, investments, and tax planning in India."
        keywords="financial education, personal finance course, investment learning, tax planning guide, financial literacy, money management, financial planning"
        url="/financial-education"
        type="website"
        image="/images/financial-education.jpg"
        tags={["financial education", "personal finance", "investment learning", "financial literacy"]}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Financial Education', url: '/financial-education' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Financial Education Hub",
          description: "Courses, topics, and resources for personal finance, investing, and tax.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: learningPaths.length + educationTopics.length + resources.length
          }
        }}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                Financial Education Hub
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Master your finances with our comprehensive educational resources. From basic money management to advanced investment strategies, 
              we provide everything you need to build financial literacy and achieve your financial goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">📚 Free Courses</span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">🛠️ Interactive Tools</span>
              <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">📖 Expert Guides</span>
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">🎯 Practical Examples</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
              <p className="text-gray-700 text-sm">Start with a learning path, explore topic hubs, and use tools/resources alongside lessons. Track progress and revisit summaries.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
              <p className="text-gray-700 text-sm">Beginner → Money management basics. Intermediate → Tax planning. Advanced → Investing and portfolio strategy.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
              <p className="text-gray-700 text-sm">Build a monthly budget → follow lessons. Set up SIP plan → use calculators. Optimize tax → apply deductions in ITR.</p>
            </div>
          </div>

          {/* Learning Paths Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Structured Learning Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {learningPaths.map((path, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      path.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      path.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {path.level}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {path.duration}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{path.title}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">What You'll Learn:</h4>
                    <ul className="space-y-1">
                      {path.modules.map((module, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {module}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to={path.link}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block font-medium"
                  >
                    Start Learning
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Education Topics Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Explore Financial Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {educationTopics.map((topic, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4`}>
                    <topic.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{topic.title}</h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.topics.map((item, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link 
                    to={topic.link}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    Learn More
                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-center hover:shadow-xl transition-shadow">
                  <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <resource.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{resource.count}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <Link 
                    to={resource.link}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Explore →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Rajesh Kumar</h3>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Using MoneyCal's SIP Calculator helped me plan my investments better. I've been able to build a corpus of ₹50 lakhs in just 5 years!"
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Priya Sharma</h3>
                    <p className="text-sm text-gray-600">Marketing Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The tax planning tools saved me ₹2 lakhs in taxes this year. The educational content helped me understand complex tax concepts easily."
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Amit Patel</h3>
                    <p className="text-sm text-gray-600">Business Owner</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The comprehensive guides on retirement planning helped me secure my family's future. Now I'm confident about my financial goals."
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Financial Education Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have improved their financial literacy with our free resources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/calculators"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Explore Calculators
              </Link>
              <Link 
                to="/blog" reloadDocument
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Read Our Blog
              </Link>
              <Link 
                to="/tax-tools"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Tax Planning Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialEducationHub;
