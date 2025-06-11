import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, ArrowRight, Search, TrendingUp, DollarSign, PieChart, Building, Shield, CreditCard } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { CategorySection } from '../components/CategorySection';
import { SearchBar } from '../components/SearchBar';

export const Home: React.FC = () => {
  const [popularCalculators, setPopularCalculators] = useState<Array<{id: string; name: string; description: string; category: string}>>([]);
  const location = useLocation();
  const categoriesRef = useRef<HTMLElement>(null);
  const allCalculatorsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Get popular calculators from different categories
    const popular = [
      { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate your loan EMI, total interest, and payment schedule', category: 'Loan Calculators' },
      { id: 'sip-calculator', name: 'SIP Calculator', description: 'Plan your investments and calculate returns on SIP investments', category: 'Investment Calculators' },
      { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'Calculate your income tax liability under old and new tax regimes', category: 'Tax Calculators' },
      { id: 'mutual-fund-overlap-checker', name: 'Mutual Fund Overlap Checker', description: 'Check portfolio overlap between mutual funds to optimize diversification', category: 'Investments & Wealth Management' },
      { id: 'asset-allocation-planner', name: 'Asset Allocation Planner', description: 'Create a balanced portfolio based on your risk profile', category: 'Investments & Wealth Management' },
      { id: 'nri-stock-investment-dashboard', name: 'NRI Stock Investment Dashboard', description: 'Track and manage your US and Indian stock investments', category: 'Investments & Wealth Management' }
    ];
    
    setPopularCalculators(popular);
  }, []);
  
  // Scroll to categories section if hash is present
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1);
      
      if (hash === 'categories' && allCalculatorsRef.current) {
        allCalculatorsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (categoriesRef.current) {
        const categoryElement = document.getElementById(hash);
        if (categoryElement) {
          categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location.hash]);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-green-800">
                Make Smarter Financial Decisions with Precision
              </h1>
              <p className="text-xl mb-8 text-green-800">
                Comprehensive financial calculators tailored for Indian users. Plan loans, investments, taxes, and more with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/calculators/emi-calculator" className="btn bg-white text-primary-700 hover:bg-primary-50">
                  EMI Calculator
                </Link>
                <Link to="/calculators/income-tax-calculator" className="btn bg-green-600 text-white hover:bg-green-700 border border-green-500">
                  Income Tax Calculator
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-300 rounded-full opacity-20"></div>
                <div className="bg-white p-8 rounded-2xl shadow-xl transform rotate-3 z-10">
                  <div className="transform -rotate-3">
                    <div className="mb-4">
                      <div className="text-primary-600 font-semibold mb-1">Loan Amount</div>
                      <div className="text-2xl font-bold text-neutral-900">₹25,00,000</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-primary-600 font-semibold mb-1">Interest Rate</div>
                      <div className="text-2xl font-bold text-neutral-900">8.5%</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-primary-600 font-semibold mb-1">Loan Tenure</div>
                      <div className="text-2xl font-bold text-neutral-900">20 Years</div>
                    </div>
                    <div className="pt-4 border-t border-neutral-200">
                      <div className="text-primary-600 font-semibold mb-1">Monthly EMI</div>
                      <div className="text-3xl font-bold text-neutral-900">₹21,761</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Find the Right Calculator</h2>
            <p className="text-neutral-600">Search from our collection of 50+ financial calculators</p>
          </div>
          <SearchBar />
        </div>
      </section>
      
      {/* Popular Calculators */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Popular Calculators</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our most frequently used calculators to help you make informed financial decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalculators.map(calculator => (
              <Link 
                key={calculator.id}
                to={`/calculators/${calculator.id}`}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all group"
              >
                <div className="flex items-start mb-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
                    <Calculator className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {calculator.name}
                    </h3>
                    <p className="text-sm text-neutral-500">{calculator.category}</p>
                  </div>
                </div>
                <p className="text-neutral-600 mb-4 text-sm">{calculator.description}</p>
                <div className="flex justify-end">
                  <span className="text-primary-600 group-hover:text-primary-700 font-medium text-sm flex items-center">
                    Try Calculator
                    <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/#categories" className="btn btn-outline">
              View All Calculators
            </Link>
          </div>
        </div>
      </section>
      
      {/* Credit Card Finder Roadmap Button */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 shadow-lg text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="flex items-center mb-3">
                  <CreditCard className="h-8 w-8 mr-3" />
                  <h2 className="text-2xl font-bold">Credit Card Finder & Score Estimator</h2>
                </div>
                <p className="text-white/90 text-lg mb-4">
                  Explore our detailed roadmap for building a comprehensive Credit Card Finder and Credit Score Estimator tool for Indian users.
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6">
                  <li>Compare credit cards based on rewards, fees, and eligibility</li>
                  <li>Estimate your credit score and get personalized improvement tips</li>
                  <li>Find the best credit card for your spending patterns</li>
                </ul>
              </div>
              <div>
                <Link 
                  to="/credit-card-finder-roadmap" 
                  className="inline-flex items-center px-6 py-3 bg-white text-indigo-700 rounded-lg font-medium shadow-md hover:bg-indigo-50 transition-colors"
                >
                  View Detailed Roadmap
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* All Calculators Section */}
      <div id="categories" ref={allCalculatorsRef} className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">All Calculators</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Browse our comprehensive collection of financial calculators organized by category
            </p>
          </div>
          
          <div className="space-y-12">
            {calculatorCategories.map(category => (
              <div key={category.id} id={category.id} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{category.name}</h3>
                <p className="text-neutral-600 mb-6">{category.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.calculators.map(calculator => (
                    <Link 
                      key={calculator.id}
                      to={`/calculators/${calculator.id}`}
                      className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <h4 className="font-medium text-neutral-900 hover:text-primary-600 transition-colors">{calculator.name}</h4>
                      <p className="text-sm text-neutral-600 mt-1 line-clamp-2">{calculator.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Categories Section */}
      <section ref={categoriesRef} id="categories-section" className="py-16 bg-neutral-50">
        <CategorySection />
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Choose Our Calculators?</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Designed specifically for the Indian financial context, our calculators offer precision, ease of use, and comprehensive insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Indian Context</h3>
              <p className="text-neutral-600">
                Tailored for Indian tax laws, investment options, and financial products
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Accurate Results</h3>
              <p className="text-neutral-600">
                Precise calculations based on the latest financial formulas and regulations
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Visual Insights</h3>
              <p className="text-neutral-600">
                Interactive charts and visual breakdowns to understand your finances better
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Privacy Focused</h3>
              <p className="text-neutral-600">
                All calculations happen in your browser with no data stored on our servers
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Investment & Wealth Management Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Investment & Wealth Management Tools</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Advanced tools to optimize your portfolio, track investments, and manage your wealth effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PieChart className="h-20 w-20 text-white opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-purple-900 to-transparent">
                  <h3 className="text-xl font-semibold text-white">Portfolio Optimization</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">
                  Optimize your investment portfolio with tools for diversification, risk assessment, and performance tracking.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>
                    <Link to="/calculators/mutual-fund-overlap-checker" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Mutual Fund Overlap Checker
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/asset-allocation-planner" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Asset Allocation Planner
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/risk-appetite-assessment" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Risk Appetite Assessment
                    </Link>
                  </li>
                </ul>
                <Link to="/#investments-wealth-management" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Explore All Portfolio Tools
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp className="h-20 w-20 text-white opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-green-900 to-transparent">
                  <h3 className="text-xl font-semibold text-white">Investment Tracking</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">
                  Track your investments with advanced tools for calculating returns, analyzing performance, and monitoring dividends.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>
                    <Link to="/calculators/xirr-tracker" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      XIRR Tracker
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/dividend-yield-calculator" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Dividend Yield Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/nri-stock-investment-dashboard" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      NRI Stock Investment Dashboard
                    </Link>
                  </li>
                </ul>
                <Link to="/#investments-wealth-management" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Explore All Tracking Tools
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <DollarSign className="h-20 w-20 text-white opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900 to-transparent">
                  <h3 className="text-xl font-semibold text-white">Alternative Investments</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">
                  Explore alternative investment options with tools for evaluating startups, fixed income, and digital assets.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>
                    <Link to="/calculators/crowdfunding-investment-portal" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Crowdfunding Investment Portal
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/stable-return-fixed-income-aggregator" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Fixed Income Aggregator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/crypto-tax-estimator" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Crypto Tax Estimator
                    </Link>
                  </li>
                </ul>
                <Link to="/#investments-wealth-management" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Explore All Alternative Investments
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Financial Tools Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Financial Tools & Resources</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Beyond calculators, explore our specialized tools and educational resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="h-20 w-20 text-white opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900 to-transparent">
                  <h3 className="text-xl font-semibold text-white">Banking Tools</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">
                  Find ATMs, check bank holidays, troubleshoot UPI failures, and compare interest rates across banks.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>
                    <Link to="/calculators/bank-ifsc-finder" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Bank IFSC Finder
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/upi-failure-troubleshooter" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      UPI Failure Troubleshooter
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/bank-holiday-calendar" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Bank Holiday Calendar
                    </Link>
                  </li>
                </ul>
                <Link to="/#banking-calculators" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Explore All Banking Tools
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">Stay Updated with Financial Insights</h2>
                <p className="text-lg text-neutral-600 mb-6">
                  Subscribe to our newsletter for the latest updates on financial tools, tax changes, investment strategies, and more.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="input w-full"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-neutral-500 mt-4">
                  By subscribing, you agree to our <Link to="/privacy-policy" className="underline">Privacy Policy</Link> and consent to receive financial updates and marketing communications from us.
                </p>
              </div>
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90"></div>
                <img 
                  src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Financial planning" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">Expert Financial Insights</h3>
                    <p className="text-primary-100">
                      Get tips, strategies, and analysis from financial experts delivered to your inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Thousands of users rely on our calculators for their financial planning needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold">RK</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">Rahul Kumar</h3>
                  <p className="text-sm text-neutral-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-neutral-600">
                "The EMI calculator helped me plan my home loan perfectly. I could compare different scenarios and choose the best option for my budget. Highly recommended!"
              </p>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold">SP</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">Sneha Patel</h3>
                  <p className="text-sm text-neutral-500">Financial Analyst</p>
                </div>
              </div>
              <p className="text-neutral-600">
                "As a financial advisor, I recommend these calculators to all my clients. The SIP calculator in particular is incredibly accurate and user-friendly."
              </p>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-semibold">AK</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">Amit Khanna</h3>
                  <p className="text-sm text-neutral-500">Business Owner</p>
                </div>
              </div>
              <p className="text-neutral-600">
                "The GST calculator saves me so much time in my business. It's accurate, fast, and gives me all the details I need for my invoices and tax filings."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Financial Insights & Guides</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Stay informed with our latest articles on personal finance, investments, taxes, and more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sukanya Samriddhi Yojana" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  <Link to="/blog/sukanya-samriddhi-yojana-guide" className="hover:text-primary-600 transition-colors">
                    Sukanya Samriddhi Yojana: A Comprehensive Guide
                  </Link>
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Everything you need to know about SSY - eligibility, benefits, tax advantages, and how to maximize returns.
                </p>
                <Link 
                  to="/blog/sukanya-samriddhi-yojana-guide" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="National Pension System" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  <Link to="/blog/national-pension-system-guide" className="hover:text-primary-600 transition-colors">
                    National Pension System: A Complete Guide
                  </Link>
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Everything you need to know about NPS - structure, benefits, tax advantages, and investment strategies.
                </p>
                <Link 
                  to="/blog/national-pension-system-guide" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Tax Saving Options" 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  <Link to="/blog/tax-saving-investment-options" className="hover:text-primary-600 transition-colors">
                    Tax-Saving Investment Options: Beyond Section 80C
                  </Link>
                </h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Explore tax-saving options beyond the traditional Section 80C investments - maximize deductions and optimize your tax planning.
                </p>
                <Link 
                  to="/blog/tax-saving-investment-options" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/blog" className="btn btn-outline">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;