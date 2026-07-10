import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { BookOpen, TrendingUp, DollarSign, IndianRupee, Shield, Users, Clock, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveAd } from '../components/BannerAd';

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
    { name: "Tax Planning", count: 12, icon: IndianRupee },
    { name: "Insurance", count: 15, icon: Shield },
    { name: "Retirement", count: 8, icon: Users },
    { name: "Real Estate", count: 10, icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SEOHelmet
        title="Money Blog - Personal Finance, Investment & Tax Planning Guides India 2025"
        description="Expert financial advice, investment strategies, and personal finance tips for Indian investors. Learn about budgeting, saving, investing, and tax planning with practical guides."
        keywords="personal finance india, investment guide, tax planning, money management, financial planning, budgeting tips, investment strategies"
        url="/money-blog"
        type="website"
        image="/images/money-blog-banner.jpg"
        tags={["personal finance", "investment", "tax planning", "financial advice"]}
      />
      
      {/* Modern Hero Section */}
      <div className="bg-white border-b border-gray-100 pt-16 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-6 tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            Expert Financial Advice
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Money <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-6">
            Expert financial advice, investment strategies, and personal finance tips 
            to help you make informed decisions and achieve your financial goals.
          </p>
          <div className="flex items-center justify-center text-xs font-medium text-gray-400 uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>Updated daily with fresh financial insights</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Featured Articles Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
            Featured Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <div key={article.id} className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col">
                <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <BookOpen className="h-12 w-12 text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                      {article.category}
                    </span>
                    <span className="ml-auto flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {article.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold text-xs uppercase tracking-wider mt-auto group-hover:text-blue-700 transition-colors"
                  >
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.name} className="group bg-white rounded-2xl shadow-sm p-5 text-center hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-blue-200">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{category.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{category.count} articles</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Banner Ad in the middle of Money Blog */}
        <div className="w-full flex justify-center mb-12">
          <ResponsiveAd />
        </div>

        {/* Latest Articles Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div key={index} className="group bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col">
                <div className="flex items-center mb-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <span className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-md border border-gray-200">
                    {article.category}
                  </span>
                  <span className="ml-auto flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-400 font-medium flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {article.date && !isNaN(new Date(article.date).getTime()) 
                        ? new Date(article.date).toLocaleDateString('hi-IN', { year: 'numeric', month: 'short', day: 'numeric' })
                        : ''}
                  </span>
                  <Link 
                    to={`/blog/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-xs uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform"
                  >
                    Read <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-lg mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4 tracking-tight">Stay Updated with Financial Insights</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Get the latest personal finance tips, investment strategies, and market insights 
              delivered directly to your inbox. Join thousands of readers making smarter financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 bg-white/95 focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-sm transition-all placeholder-gray-400"
              />
              <button className="bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-xl active:scale-95 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-blue-200 mt-4 opacity-80">
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
