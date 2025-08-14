import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { Calculator, TrendingUp, DollarSign, Shield, Users, Clock, ArrowRight, Download, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MoneyTool: React.FC = () => {
  const featuredTools = [
    {
      id: 1,
      name: "EMI Calculator",
      description: "Calculate EMI for home loans, car loans, personal loans, and more. Get detailed breakdown of principal, interest, and total payment.",
      category: "Loan Calculator",
      rating: 4.8,
      users: "50K+",
      image: "/images/emi-calculator.jpg",
      url: "/calculators/emi-calculator"
    },
    {
      id: 2,
      name: "Investment Portfolio Tracker",
      description: "Track your investments across mutual funds, stocks, and other assets. Monitor performance and get insights for better decision making.",
      category: "Portfolio Management",
      rating: 4.7,
      users: "25K+",
      image: "/images/portfolio-tracker.jpg",
      url: "/calculators/investment-portfolio-tracker"
    },
    {
      id: 3,
      name: "Tax Calculator 2025",
      description: "Calculate your income tax liability for FY 2025-26. Includes all deductions, exemptions, and latest tax slabs.",
      category: "Tax Planning",
      rating: 4.9,
      users: "75K+",
      image: "/images/tax-calculator.jpg",
      url: "/calculators/tax-calculator"
    },
    {
      id: 4,
      name: "Budget Planner",
      description: "Create and manage your monthly budget. Track expenses, set savings goals, and achieve financial discipline.",
      category: "Budgeting",
      rating: 4.6,
      users: "30K+",
      image: "/images/budget-planner.jpg",
      url: "/calculators/monthly-budget-planner"
    }
  ];

  const toolCategories = [
    {
      name: "Loan Calculators",
      tools: 12,
      icon: DollarSign,
      description: "EMI, interest, and loan comparison calculators"
    },
    {
      name: "Investment Tools",
      tools: 8,
      icon: TrendingUp,
      description: "Portfolio tracking and investment planning"
    },
    {
      name: "Tax Planning",
      tools: 6,
      icon: Calculator,
      description: "Tax calculation and optimization tools"
    },
    {
      name: "Budgeting",
      tools: 10,
      icon: Shield,
      description: "Budget planning and expense tracking"
    },
    {
      name: "Insurance",
      tools: 5,
      icon: Users,
      description: "Insurance premium and coverage calculators"
    },
    {
      name: "Retirement Planning",
      tools: 7,
      icon: Clock,
      description: "Retirement corpus and pension calculators"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SEOHelmet
        title="Financial Tools & Calculators - Free Money Management Tools India 2025"
        description="Free financial calculators and tools for Indian users. EMI calculator, tax calculator, investment tracker, budget planner, and more. Make informed financial decisions."
        keywords="financial calculator, emi calculator, tax calculator, investment tools, budget planner, loan calculator, money management tools"
        url="/money-tool"
        type="website"
        image="/images/money-tools-banner.jpg"
        tags={["financial tools", "calculators", "money management", "investment tools"]}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Financial Tools & Calculators
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Free financial calculators and tools to help you make informed decisions. 
            From EMI calculations to investment tracking, we've got you covered.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Shield className="h-4 w-4 mr-1" />
            <span>100% Free • No Registration Required • Secure & Private</span>
          </div>
        </div>

        {/* Featured Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            Most Popular Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <Calculator className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {tool.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{tool.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({tool.users})</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  <Link 
                    to={tool.url}
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Use Tool
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tool Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category) => {
              const IconComponent = category.icon;
  return (
                <div key={category.name} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="flex items-center mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-bold text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.tools} tools available</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <Link 
                    to={`/calculators/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    View All Tools
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Tools List */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Financial Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "EMI Calculator", category: "Loan", url: "/calculators/emi-calculator" },
              { name: "Home Loan Calculator", category: "Loan", url: "/calculators/home-loan-calculator" },
              { name: "Car Loan Calculator", category: "Loan", url: "/calculators/car-loan-calculator" },
              { name: "Personal Loan Calculator", category: "Loan", url: "/calculators/personal-loan-calculator" },
              { name: "Tax Calculator 2025", category: "Tax", url: "/calculators/tax-calculator" },
              { name: "GST Calculator", category: "Tax", url: "/calculators/gst-calculator" },
              { name: "Investment Portfolio Tracker", category: "Investment", url: "/calculators/investment-portfolio-tracker" },
              { name: "SIP Calculator", category: "Investment", url: "/calculators/sip-calculator" },
              { name: "FD Calculator", category: "Investment", url: "/calculators/fd-calculator" },
              { name: "Monthly Budget Planner", category: "Budgeting", url: "/calculators/monthly-budget-planner" },
              { name: "Expense Tracker", category: "Budgeting", url: "/calculators/expense-tracker" },
              { name: "Savings Goal Calculator", category: "Budgeting", url: "/calculators/savings-goal-calculator" },
              { name: "Life Insurance Calculator", category: "Insurance", url: "/calculators/life-insurance-calculator" },
              { name: "Health Insurance Premium Calculator", category: "Insurance", url: "/calculators/health-insurance-calculator" },
              { name: "Retirement Corpus Calculator", category: "Retirement", url: "/calculators/retirement-corpus-calculator" },
              { name: "Pension Calculator", category: "Retirement", url: "/calculators/pension-calculator" },
              { name: "Net Worth Calculator", category: "Financial Planning", url: "/calculators/net-worth-calculator" },
              { name: "Debt Payoff Calculator", category: "Financial Planning", url: "/calculators/debt-payoff-calculator" }
            ].map((tool, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {tool.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{tool.name}</h3>
                <Link 
                  to={tool.url}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                >
                  Use Calculator
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Our Financial Tools?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "100% Free",
                description: "All tools are completely free to use with no hidden charges"
              },
              {
                icon: Calculator,
                title: "Accurate Calculations",
                description: "Based on latest RBI guidelines and current market rates"
              },
              {
                icon: Users,
                title: "No Registration",
                description: "Use tools instantly without creating an account"
              },
              {
                icon: Download,
                title: "Export Results",
                description: "Download and save your calculations for future reference"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Start Making Smarter Financial Decisions Today</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of users who trust our financial tools for their money management needs. 
            Get accurate calculations and insights to achieve your financial goals.
          </p>
          <Link 
            to="/calculators"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore All Calculators
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-yellow-700 text-sm">
            These calculators provide estimates based on current rates and guidelines. Actual results may vary. 
            For financial advice, please consult with a qualified financial advisor. The tools are for educational 
            purposes and should not be considered as financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoneyTool;
