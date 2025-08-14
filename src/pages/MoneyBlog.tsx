import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { BookOpen, TrendingUp, DollarSign, Calculator, Shield, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MoneyBlog: React.FC = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Complete Guide to Personal Finance Management in India 2025",
      excerpt: "Learn essential personal finance strategies including budgeting, saving, investing, and tax planning for Indian investors. Comprehensive guide with practical tips and tools.",
      category: "Personal Finance",
      readTime: "8 min read",
      image: "/images/personal-finance-guide.jpg",
      slug: "personal-finance-management-india-2025"
    },
    {
      id: 2,
      title: "Investment Strategies for Beginners: Start Your Wealth Journey",
      excerpt: "Discover the best investment options for beginners in India. From mutual funds to stocks, understand risk management and portfolio diversification.",
      category: "Investment",
      readTime: "10 min read",
      image: "/images/investment-strategies.jpg",
      slug: "investment-strategies-beginners-india"
    },
    {
      id: 3,
      title: "Tax Planning Guide 2025: Maximize Your Savings Legally",
      excerpt: "Comprehensive tax planning strategies for FY 2025-26. Learn about deductions, exemptions, and legal ways to reduce your tax liability.",
      category: "Tax Planning",
      readTime: "12 min read",
      image: "/images/tax-planning-guide.jpg",
      slug: "tax-planning-guide-2025-india"
    },
    {
      id: 4,
      title: "Emergency Fund Planning: Financial Security for Uncertain Times",
      excerpt: "Build a robust emergency fund to protect yourself and your family from financial emergencies. Step-by-step guide with practical examples.",
      category: "Emergency Planning",
      readTime: "6 min read",
      image: "/images/emergency-fund.jpg",
      slug: "emergency-fund-planning-guide"
    }
  ];

  const categories = [
    { name: "Personal Finance", count: 25, icon: DollarSign },
    { name: "Investment", count: 18, icon: TrendingUp },
    { name: "Tax Planning", count: 12, icon: Calculator },
    { name: "Insurance", count: 15, icon: Shield },
    { name: "Retirement", count: 8, icon: Users },
    { name: "Real Estate", count: 10, icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <SEOHelmet
        title="Money Blog - Personal Finance, Investment & Tax Planning Guides India 2025"
        description="Expert financial advice, investment strategies, and personal finance tips for Indian investors. Learn about budgeting, saving, investing, and tax planning with practical guides."
        keywords="personal finance india, investment guide, tax planning, money management, financial planning, budgeting tips, investment strategies"
        url="/money-blog"
        type="website"
        image="/images/money-blog-banner.jpg"
        tags={["personal finance", "investment", "tax planning", "financial advice"]}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Money Blog
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Expert financial advice, investment strategies, and personal finance tips 
            to help you make informed decisions and achieve your financial goals.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>Updated daily with fresh financial insights</span>
          </div>
        </div>

        {/* Featured Articles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
            Featured Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="ml-auto text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.name} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
                  <IconComponent className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} articles</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest Articles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Articles</h2>
          
          <div className="space-y-6">
            {[
              {
                title: "How to Create a Monthly Budget That Actually Works",
                excerpt: "Learn proven budgeting techniques that help you save money and achieve your financial goals. Includes templates and tools for effective budget management.",
                category: "Budgeting",
                date: "2025-01-15",
                readTime: "5 min read"
              },
              {
                title: "Mutual Fund Investment Guide for Beginners",
                excerpt: "Complete guide to mutual fund investing in India. Understand different types of funds, risk assessment, and how to choose the right mutual funds.",
                category: "Investment",
                date: "2025-01-14",
                readTime: "7 min read"
              },
              {
                title: "Life Insurance: How Much Coverage Do You Really Need?",
                excerpt: "Calculate your life insurance needs and understand different types of policies. Make informed decisions about protecting your family's financial future.",
                category: "Insurance",
                date: "2025-01-13",
                readTime: "6 min read"
              },
              {
                title: "Saving for Your Child's Education: A Complete Guide",
                excerpt: "Plan your child's education expenses with smart investment strategies. Learn about education loans, scholarships, and saving plans.",
                category: "Education Planning",
                date: "2025-01-12",
                readTime: "8 min read"
              }
            ].map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {article.category}
                      </span>
                      <span className="ml-auto text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.date}</span>
                      <Link 
                        to={`/blog/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                      >
                        Read Full Article
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with Financial Insights</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Get the latest personal finance tips, investment strategies, and market insights 
              delivered directly to your inbox. Join thousands of readers making smarter financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-green-200 mt-3">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About Our Financial Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                We're dedicated to empowering Indian investors with accurate, practical, and 
                up-to-date financial information. Our goal is to help you make informed decisions 
                and achieve financial success.
              </p>
              <p className="text-gray-700">
                Our team of financial experts and certified professionals ensures that all 
                content is accurate, relevant, and follows the latest regulatory guidelines.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What We Cover</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Personal finance and budgeting strategies</li>
                <li>• Investment planning and portfolio management</li>
                <li>• Tax planning and optimization</li>
                <li>• Insurance and risk management</li>
                <li>• Retirement planning and wealth creation</li>
                <li>• Real estate investment guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyBlog;
