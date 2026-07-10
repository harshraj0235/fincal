import React, { useState } from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Link } from 'react-router-dom';
import { IndianRupee, FileText, TrendingUp, Target, Shield, PiggyBank, CreditCard, Car, Heart, Globe, Star, Building, Users, BookOpen, BarChart3 } from 'lucide-react';

const PersonalFinanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tools' | 'articles'>('tools');

  const tools = [
    {
      id: 'monthly-budget-planner',
      title: 'Monthly Budget Planner India',
      description: 'Create and manage your monthly budget with Excel templates and mobile app integration',
      icon: <IndianRupee className="w-6 h-6" />,
      url: '/tools/monthly-budget-planner',
      category: 'Budgeting',
      features: ['Excel Templates', 'Mobile App', 'Expense Tracking', 'Income Management']
    },
    {
      id: 'personal-finance-dashboard',
      title: 'Personal Finance Dashboard',
      description: 'Comprehensive Google Sheets dashboard for tracking all your financial activities',
      icon: <BarChart3 className="w-6 h-6" />,
      url: '/tools/personal-finance-dashboard',
      category: 'Dashboard',
      features: ['Google Sheets', 'Real-time Tracking', 'Visual Charts', 'Data Export']
    },
    {
      id: 'savings-goal-calculator',
      title: 'Savings Goal Calculator India',
      description: 'Calculate how much you need to save monthly to reach your financial goals',
      icon: <Target className="w-6 h-6" />,
      url: '/tools/savings-goal-calculator',
      category: 'Savings',
      features: ['Goal Setting', 'Monthly Calculation', 'Time Planning', 'Progress Tracking']
    },
    {
      id: 'debt-snowball-calculator',
      title: 'Debt Snowball Calculator India',
      description: 'Pay off debts faster using the snowball method - start with smallest debts first',
      icon: <TrendingUp className="w-6 h-6" />,
      url: '/tools/debt-snowball-calculator',
      category: 'Debt Management',
      features: ['Debt Prioritization', 'Payment Schedule', 'Interest Savings', 'Progress Tracking']
    },
    {
      id: 'debt-avalanche-calculator',
      title: 'Debt Avalanche Calculator',
      description: 'Pay off debts using the avalanche method - start with highest interest rates',
      icon: <Shield className="w-6 h-6" />,
      url: '/tools/debt-avalanche-calculator',
      category: 'Debt Management',
      features: ['Interest Optimization', 'Payment Strategy', 'Cost Analysis', 'Time Estimation']
    },
    {
      id: 'net-worth-tracker',
      title: 'Net Worth Tracker India',
      description: 'Track your total net worth including assets, liabilities, and investments',
      icon: <PiggyBank className="w-6 h-6" />,
      url: '/tools/net-worth-tracker',
      category: 'Wealth Tracking',
      features: ['Asset Tracking', 'Liability Management', 'Net Worth Calculation', 'Trend Analysis']
    },
    {
      id: 'expense-splitter-tool',
      title: 'Expense Splitter Tool',
      description: 'Split expenses with friends, roommates, and couples easily and fairly',
      icon: <Users className="w-6 h-6" />,
      url: '/tools/expense-splitter-tool',
      category: 'Expense Management',
      features: ['Group Splitting', 'Fair Distribution', 'Receipt Tracking', 'Payment Reminders']
    },
    {
      id: 'pf-withdrawal-calculator',
      title: 'PF Withdrawal Calculator (2025 India)',
      description: 'Calculate your EPF withdrawal amount, tax implications, and eligibility',
      icon: <Building className="w-6 h-6" />,
      url: '/tools/pf-withdrawal-calculator',
      category: 'Retirement',
      features: ['Withdrawal Calculation', 'Tax Analysis', 'Eligibility Check', 'Form Guidance']
    },
    {
      id: 'ppf-vs-fd-comparison',
      title: 'PPF vs FD Return Comparison Tool',
      description: 'Compare returns between PPF and Fixed Deposits to make informed decisions',
      icon: <Star className="w-6 h-6" />,
      url: '/tools/ppf-vs-fd-comparison',
      category: 'Investment Comparison',
      features: ['Return Comparison', 'Tax Analysis', 'Risk Assessment', 'Recommendation']
    },
    {
      id: 'emergency-fund-calculator',
      title: 'Emergency Fund Calculator India',
      description: 'Calculate how much emergency fund you need based on your expenses and lifestyle',
      icon: <Shield className="w-6 h-6" />,
      url: '/tools/emergency-fund-calculator',
      category: 'Emergency Planning',
      features: ['Expense Analysis', 'Fund Calculation', 'Investment Options', 'Withdrawal Strategy']
    },
    {
      id: 'financial-goal-tracker',
      title: 'Financial Goal Tracker',
      description: 'Track progress towards major life goals like wedding, house, and travel savings',
      icon: <Heart className="w-6 h-6" />,
      url: '/tools/financial-goal-tracker',
      category: 'Goal Planning',
      features: ['Multiple Goals', 'Progress Tracking', 'Timeline Management', 'Investment Planning']
    },
    {
      id: 'retirement-corpus-estimator',
      title: 'Retirement Corpus Estimator India',
      description: 'Estimate how much you need to save for a comfortable retirement in India',
      icon: <Globe className="w-6 h-6" />,
      url: '/tools/retirement-corpus-estimator',
      category: 'Retirement Planning',
      features: ['Corpus Calculation', 'Inflation Adjustment', 'Investment Planning', 'Withdrawal Strategy']
    },
    {
      id: 'credit-card-payoff-calculator',
      title: 'Credit Card Payoff Calculator India',
      description: 'Calculate the fastest and most cost-effective way to pay off credit card debt',
      icon: <CreditCard className="w-6 h-6" />,
      url: '/tools/credit-card-payoff-calculator',
      category: 'Debt Management',
      features: ['Payment Strategy', 'Interest Calculation', 'Time Estimation', 'Cost Analysis']
    },
    {
      id: 'emi-affordability-calculator',
      title: 'Monthly EMI Affordability Calculator',
      description: 'Calculate how much EMI you can afford for car, bike, and home loans',
      icon: <Car className="w-6 h-6" />,
      url: '/tools/emi-affordability-calculator',
      category: 'Loan Planning',
      features: ['Affordability Check', 'Multiple Loans', 'Income Analysis', 'Risk Assessment']
    },
    {
      id: 'tax-saving-investment-comparison',
      title: 'Tax-Saving Investment Comparison Tool',
      description: 'Compare ELSS, PPF, and NPS to choose the best tax-saving investment',
      icon: <BookOpen className="w-6 h-6" />,
      url: '/tools/tax-saving-investment-comparison',
      category: 'Tax Planning',
      features: ['Investment Comparison', 'Tax Analysis', 'Return Calculation', 'Recommendation']
    }
  ];

  const articles = [
    {
      id: 'how-to-manage-personal-finances-india-beginners',
      title: 'How to Manage Personal Finances in India for Beginners',
      description: 'Complete guide to personal finance management for beginners in India with step-by-step instructions',
      readTime: '12 min read',
      category: 'Beginner Guide',
      url: '/personal-finance/how-to-manage-personal-finances-india-beginners'
    },
    {
      id: 'best-money-management-apps-india-2025',
      title: 'Best Money Management Apps in India 2025',
      description: 'Top-rated personal finance apps for Indians to track expenses, budget, and manage money',
      readTime: '8 min read',
      category: 'Apps & Tools',
      url: '/personal-finance/best-money-management-apps-india-2025'
    },
    {
      id: 'how-to-start-budgeting-salary-under-30000',
      title: 'How to Start Budgeting with a Salary Under ₹30,000',
      description: 'Practical budgeting tips and strategies for low-income earners in India',
      readTime: '10 min read',
      category: 'Budgeting',
      url: '/personal-finance/how-to-start-budgeting-salary-under-30000'
    },
    {
      id: 'top-mistakes-indians-make-personal-finance',
      title: 'Top Mistakes Indians Make in Personal Finance',
      description: 'Common financial mistakes Indians make and how to avoid them for better money management',
      readTime: '9 min read',
      category: 'Mistakes to Avoid',
      url: '/personal-finance/top-mistakes-indians-make-personal-finance'
    },
    {
      id: 'personal-finance-tips-college-students-india',
      title: 'Personal Finance Tips for College Students in India',
      description: 'Essential money management tips for college students to build good financial habits',
      readTime: '7 min read',
      category: 'Student Finance',
      url: '/personal-finance/personal-finance-tips-college-students-india'
    },
    {
      id: 'how-to-track-monthly-expenses-easily',
      title: 'How to Track Monthly Expenses Easily (Apps + Excel India)',
      description: 'Complete guide to tracking expenses using apps and Excel templates for Indians',
      readTime: '11 min read',
      category: 'Expense Tracking',
      url: '/personal-finance/how-to-track-monthly-expenses-easily'
    },
    {
      id: 'personal-finance-guide-newly-married-couples',
      title: 'Personal Finance Guide for Newly Married Couples',
      description: 'Financial planning guide for newly married couples to manage money together effectively',
      readTime: '13 min read',
      category: 'Couples Finance',
      url: '/personal-finance/personal-finance-guide-newly-married-couples'
    },
    {
      id: 'how-to-save-money-low-salary-india',
      title: 'How to Save Money on a Low Salary in India',
      description: 'Proven strategies to save money even with a low salary in India',
      readTime: '9 min read',
      category: 'Saving Money',
      url: '/personal-finance/how-to-save-money-low-salary-india'
    },
    {
      id: 'best-free-budget-templates-indians',
      title: 'Best Free Budget Templates for Indians',
      description: 'Free Excel and Google Sheets budget templates designed specifically for Indian households',
      readTime: '6 min read',
      category: 'Templates',
      url: '/personal-finance/best-free-budget-templates-indians'
    },
    {
      id: 'how-to-reduce-monthly-household-expenses',
      title: 'How to Reduce Monthly Household Expenses',
      description: 'Practical tips to cut down monthly household expenses without compromising on quality',
      readTime: '10 min read',
      category: 'Expense Reduction',
      url: '/personal-finance/how-to-reduce-monthly-household-expenses'
    },
    {
      id: 'emergency-fund-rules-how-much-save-india',
      title: 'Emergency Fund Rules: How Much Should You Save in India',
      description: 'Complete guide to building an emergency fund in India with practical examples',
      readTime: '8 min read',
      category: 'Emergency Fund',
      url: '/personal-finance/emergency-fund-rules-how-much-save-india'
    },
    {
      id: 'top-10-financial-habits-successful-indians',
      title: 'Top 10 Financial Habits of Successful Indians',
      description: 'Learn the money habits that successful Indians follow to build wealth',
      readTime: '7 min read',
      category: 'Financial Habits',
      url: '/personal-finance/top-10-financial-habits-successful-indians'
    },
    {
      id: 'how-to-manage-multiple-loans-emis-india',
      title: 'How to Manage Multiple Loans and EMIs in India',
      description: 'Strategies to manage multiple loans and EMIs effectively without financial stress',
      readTime: '11 min read',
      category: 'Loan Management',
      url: '/personal-finance/how-to-manage-multiple-loans-emis-india'
    },
    {
      id: 'pf-ppf-nps-explained-retirement-india',
      title: 'PF, PPF, and NPS Explained: Which is Best for Retirement in India',
      description: 'Complete comparison of PF, PPF, and NPS for retirement planning in India',
      readTime: '12 min read',
      category: 'Retirement Planning',
      url: '/personal-finance/pf-ppf-nps-explained-retirement-india'
    },
    {
      id: 'best-personal-finance-books-indians-2025',
      title: 'Best Personal Finance Books for Indians (2025 Edition)',
      description: 'Top personal finance books written by Indian authors and for Indian context',
      readTime: '6 min read',
      category: 'Books & Resources',
      url: '/personal-finance/best-personal-finance-books-indians-2025'
    },
    {
      id: 'how-to-save-first-home-india',
      title: 'How to Save for Your First Home in India',
      description: 'Step-by-step guide to saving for your first home purchase in India',
      readTime: '10 min read',
      category: 'Home Buying',
      url: '/personal-finance/how-to-save-first-home-india'
    },
    {
      id: 'personal-finance-checklist-before-age-30',
      title: 'Personal Finance Checklist Before Age 30',
      description: 'Essential financial milestones and checklist for Indians before turning 30',
      readTime: '8 min read',
      category: 'Life Planning',
      url: '/personal-finance/personal-finance-checklist-before-age-30'
    },
    {
      id: 'how-to-improve-credit-score-india-fast',
      title: 'How to Improve Your Credit Score in India Fast',
      description: 'Proven methods to improve your credit score quickly in India',
      readTime: '9 min read',
      category: 'Credit Score',
      url: '/personal-finance/how-to-improve-credit-score-india-fast'
    },
    {
      id: 'money-saving-challenges-work-india',
      title: 'Money-Saving Challenges That Actually Work in India',
      description: 'Fun and effective money-saving challenges designed for Indian lifestyle',
      readTime: '7 min read',
      category: 'Saving Challenges',
      url: '/personal-finance/money-saving-challenges-work-india'
    },
    {
      id: 'how-to-teach-kids-about-money-india',
      title: 'How to Teach Kids About Money in India',
      description: 'Age-appropriate ways to teach children about money and financial responsibility',
      readTime: '8 min read',
      category: 'Kids Finance',
      url: '/personal-finance/how-to-teach-kids-about-money-india'
    },
    {
      id: 'digital-banking-vs-traditional-banking-india',
      title: 'Digital Banking vs Traditional Banking: What Indians Prefer',
      description: 'Comparison of digital and traditional banking options in India',
      readTime: '6 min read',
      category: 'Banking',
      url: '/personal-finance/digital-banking-vs-traditional-banking-india'
    },
    {
      id: 'top-budgeting-hacks-indian-housewives',
      title: 'Top Budgeting Hacks for Indian Housewives',
      description: 'Practical budgeting tips and money-saving hacks for Indian housewives',
      readTime: '9 min read',
      category: 'Household Finance',
      url: '/personal-finance/top-budgeting-hacks-indian-housewives'
    },
    {
      id: 'personal-finance-freelancers-gig-workers-india',
      title: 'Personal Finance for Freelancers and Gig Workers in India',
      description: 'Financial planning guide for freelancers and gig workers in India',
      readTime: '11 min read',
      category: 'Freelancer Finance',
      url: '/personal-finance/personal-finance-freelancers-gig-workers-india'
    },
    {
      id: 'how-to-plan-finances-big-life-goals',
      title: 'How to Plan Your Finances for Big Life Goals',
      description: 'Financial planning strategies for major life events like marriage, education, and retirement',
      readTime: '12 min read',
      category: 'Life Planning',
      url: '/personal-finance/how-to-plan-finances-big-life-goals'
    },
    {
      id: 'step-by-step-personal-finance-roadmap-indians-2025',
      title: 'Step-by-Step Personal Finance Roadmap for Indians (2025 Guide)',
      description: 'Complete roadmap for personal finance management in India for 2025',
      readTime: '15 min read',
      category: 'Complete Guide',
      url: '/personal-finance/step-by-step-personal-finance-roadmap-indians-2025'
    }
  ];

  const categories = {
    tools: ['All', 'Budgeting', 'Debt Management', 'Savings', 'Investment Comparison', 'Emergency Planning', 'Goal Planning', 'Retirement Planning', 'Loan Planning', 'Tax Planning', 'Dashboard', 'Wealth Tracking', 'Expense Management'],
    articles: ['All', 'Beginner Guide', 'Apps & Tools', 'Budgeting', 'Mistakes to Avoid', 'Student Finance', 'Expense Tracking', 'Couples Finance', 'Saving Money', 'Templates', 'Expense Reduction', 'Emergency Fund', 'Financial Habits', 'Loan Management', 'Retirement Planning', 'Books & Resources', 'Home Buying', 'Life Planning', 'Credit Score', 'Saving Challenges', 'Kids Finance', 'Banking', 'Household Finance', 'Freelancer Finance', 'Complete Guide']
  };

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <SEOHelmet
        title="Personal Finance Management - Complete Guide & Tools for Indians | MoneyCal India"
        description="Comprehensive personal finance management guide for Indians. Access 15+ financial tools, calculators, and 25+ detailed articles to manage your money effectively."
        keywords="personal finance management, personal finance tools, budgeting tools, financial planning, money management, personal finance calculator, financial tools India"
        canonicalUrl="/personal-finance-management"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Personal Finance Management', url: '/personal-finance-management' }
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Personal Finance Management",
          description: "Tools and guides for budgeting, savings, debt, retirement, and more.",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: tools.length + articles.length
          }
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Personal Finance Management
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Master your personal finances with our comprehensive collection of tools, calculators, and expert guides. 
              From budgeting to retirement planning, we have everything you need to achieve financial success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">How to use</h3>
              <p className="text-gray-700 text-sm">Pick a category, open a tool or article, follow the steps, and track progress in your dashboard or sheet.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Decision pathways</h3>
              <p className="text-gray-700 text-sm">Budget → monthly plan. Debt → snowball/avalanche. Savings → goals and emergency fund. Retirement → corpus estimator.</p>
            </div>
            <div className="border rounded-xl p-4 bg-white">
              <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
              <p className="text-gray-700 text-sm">Create a ₹50k budget → cut 10% expenses. Pay off credit card → snowball. Build 6-month emergency fund → track monthly.</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('tools')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === 'tools'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <IndianRupee className="w-5 h-5 inline mr-2" />
                Tools & Calculators
              </button>
              <button
                onClick={() => setActiveTab('articles')}
                className={`px-6 py-3 rounded-md font-semibold transition-all ${
                  activeTab === 'articles'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <FileText className="w-5 h-5 inline mr-2" />
                Articles & Guides
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories[activeTab].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeTab === 'tools' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={tool.url}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg mr-4">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {tool.title}
                      </h3>
                      <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={article.url}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-4">
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2 inline-block">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Why Choose Our Personal Finance Tools?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Financial Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                <div className="text-gray-600">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600">Free to Use</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">India</div>
                <div className="text-gray-600">Focused</div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
                <IndianRupee className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Advanced Calculators
              </h3>
              <p className="text-gray-600">
                Use our sophisticated financial calculators to make informed decisions about your money.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Expert Articles
              </h3>
              <p className="text-gray-600">
                Read comprehensive guides written by financial experts specifically for Indian context.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your financial progress with our tracking tools and dashboards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFinanceManagement;
