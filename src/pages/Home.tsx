import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Calculator, ArrowRight, ChevronRight, BookOpen, MapPin, Check, Star, TrendingUp, DollarSign, Shield, Zap, Award, BarChart4, PieChart, Calendar, Home } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';

export const Home: React.FC = () => {
  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FinCalc India",
    "url": "https://moneycal.in/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://moneycal.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "description": "Comprehensive financial calculators for Indian users - EMI, SIP, PPF, Income Tax, Loan Comparison and more."
  };

  return (
    <>
      <SEOHead 
        title="Indian Financial Calculators | EMI, SIP, PPF, Income Tax & More | FinCalc India"
        description="Comprehensive financial calculators for Indian users - EMI, SIP, PPF, Income Tax, Loan Comparison and more. Make informed financial decisions with accurate calculations tailored for Indian financial products."
        canonicalUrl="/"
        keywords="financial calculator, EMI calculator, SIP calculator, PPF calculator, income tax calculator, loan calculator, India, financial planning, investment calculator"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="bg-white py-20 md:py-28 border-b border-neutral-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent opacity-50 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 leading-tight">
                India's Most Comprehensive Financial Calculator Suite
              </h1>
              <p className="text-xl mb-8 text-neutral-700 leading-relaxed">
                50+ calculators tailored for Indian financial needs - from EMI and taxes to investments and retirement planning
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/calculators/emi-calculator" className="btn bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <Calculator className="h-5 w-5 mr-2" />
                  EMI Calculator
                </Link>
                <Link to="/calculators/sip-calculator" className="btn bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <BarChart4 className="h-5 w-5 mr-2" />
                  SIP Calculator
                </Link>
                <a href="/financial-navigator.html" target="_blank" className="btn bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Financial Navigator
                </a>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-100 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-100 rounded-full opacity-50"></div>
              <img 
                src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Financial planning with calculators and charts"
                className="rounded-xl shadow-xl relative z-10 transform hover:scale-105 transition-transform duration-500"
                width="600"
                height="400"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Access Tools */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link to="/calculators/income-tax-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Income Tax Calculator</h3>
              <p className="text-sm text-neutral-600">Calculate your tax liability</p>
            </Link>
            
            <Link to="/calculators/loan-comparison-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-success-100 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Loan Comparison</h3>
              <p className="text-sm text-neutral-600">Find the best loan option</p>
            </Link>
            
            <Link to="/calculators/retirement-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Retirement Planner</h3>
              <p className="text-sm text-neutral-600">Plan for your future</p>
            </Link>
            
            <Link to="/calculators/gst-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-warning-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">GST Calculator</h3>
              <p className="text-sm text-neutral-600">Calculate GST amounts</p>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Financial Navigator Section */}
      <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Financial Navigator: Your Guide to Indian Finance</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Navigate the complex world of banking and finance with our comprehensive educational tools designed to improve your financial literacy
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1 bg-white rounded-xl p-8 border border-primary-100 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Financial Literacy Hub</h3>
              <p className="text-neutral-700 mb-6">
                Our Financial Navigator is a comprehensive guide to help you understand and navigate the Indian financial system. From UPI payments to KYC processes, loan comparisons to scam detection, we've got you covered with practical knowledge and interactive tools.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-primary-600" />
                  </div>
                  <span className="text-neutral-700">UPI Explainer</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-primary-600" />
                  </div>
                  <span className="text-neutral-700">KYC Help</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-primary-600" />
                  </div>
                  <span className="text-neutral-700">Loan Comparison</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-primary-600" />
                  </div>
                  <span className="text-neutral-700">CIBIL Education</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-primary-600" />
                  </div>
                  <span className="text-neutral-700">Scam Detection</span>
                </li>
              </ul>
              <a 
                href="/financial-navigator.html" 
                target="_blank"
                className="btn bg-primary-600 text-white hover:bg-primary-700 w-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                Launch Financial Navigator
              </a>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">UPI Explainer</h4>
                <p className="text-neutral-600 mb-4">Understand how UPI works with our interactive simulator</p>
                <a href="/financial-navigator.html#upi-guide" target="_blank" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">KYC Help</h4>
                <p className="text-neutral-600 mb-4">Step-by-step guidance for completing KYC processes</p>
                <a href="/financial-navigator.html#kyc-explained" target="_blank" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">EMI Calculator</h4>
                <p className="text-neutral-600 mb-4">Visual calculator to understand loan payments</p>
                <Link to="/calculators/emi-calculator" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Try Calculator
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary-600" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Scam Detector</h4>
                <p className="text-neutral-600 mb-4">Identify and avoid common financial scams</p>
                <a href="/financial-navigator.html#scam-detection" target="_blank" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-neutral-700 mb-6 max-w-3xl mx-auto">
              Our Financial Navigator is designed to simplify complex financial concepts and empower you with the knowledge to make informed decisions.
            </p>
            <a 
              href="/financial-navigator.html" 
              target="_blank"
              className="btn bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Explore Financial Navigator
            </a>
          </div>
        </div>
      </section>
      
      {/* Astro-Finance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Astro-Finance Insights Hub</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Where traditional astrological wisdom meets modern financial planning, offering a unique perspective on your financial journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-8 border border-purple-100">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Where Astrology Meets Finance</h3>
              <p className="text-neutral-700 mb-4">
                Explore our unique Astro-Finance Insights Hub, where traditional astrological wisdom meets modern financial planning. Discover how cosmic influences might align with your financial decisions and life path.
              </p>
              <p className="text-neutral-700 mb-4">
                While we emphasize that financial decisions should always be based on sound financial principles, many in India also consider astrological insights as a complementary perspective.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Daily Finance Horoscopes</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Zodiac Compatibility</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Lucky Numbers</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Auspicious Timing</span>
              </div>
              <a 
                href="/astro-finance-insights.html" 
                target="_blank"
                className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
              >
                Explore Astro-Finance Insights
                <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-purple-100 transform hover:-translate-y-1 duration-300">
                <div className="text-3xl mb-4">🌙</div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Moon Sign Calculator</h4>
                <p className="text-neutral-600 mb-4">Find your Vedic Moon Sign (Janma Rashi) and its financial implications</p>
                <a href="/astro-finance-insights.html#moon-sign-calculator" target="_blank" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                  Calculate Now
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-purple-100 transform hover:-translate-y-1 duration-300">
                <div className="text-3xl mb-4">💰</div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Finance Horoscope</h4>
                <p className="text-neutral-600 mb-4">Daily and monthly financial predictions for your zodiac sign</p>
                <a href="/astro-finance-insights.html#daily-finance-horoscope" target="_blank" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                  View Horoscope
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-purple-100 transform hover:-translate-y-1 duration-300">
                <div className="text-3xl mb-4">⏰</div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Muhurat Finder</h4>
                <p className="text-neutral-600 mb-4">Find auspicious times for important financial decisions</p>
                <a href="/astro-finance-insights.html#auspicious-time-finder" target="_blank" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                  Find Muhurat
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-purple-100 transform hover:-translate-y-1 duration-300">
                <div className="text-3xl mb-4">🔢</div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Numerology</h4>
                <p className="text-neutral-600 mb-4">Discover your lucky numbers for financial decisions</p>
                <a href="/astro-finance-insights.html#life-path-numerology" target="_blank" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                  Calculate Numbers
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md max-w-3xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Disclaimer:</strong> The astrological insights provided are for entertainment and cultural interest only. Financial decisions should always be based on sound financial principles.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/astro-finance-insights.html" 
              target="_blank"
              className="btn bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <Star className="h-5 w-5 mr-2" />
              Explore All Astro-Finance Tools
            </a>
          </div>
        </div>
      </section>
      
      {/* Popular Calculators */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Most Popular Calculators
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto text-center mb-12">
            Our most used financial tools that help thousands of Indians make better financial decisions every day
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/calculators/emi-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-2 duration-300 group">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <Calculator className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">EMI Calculator</h3>
              <p className="text-neutral-600 mb-4">Calculate your monthly loan payments</p>
              <span className="text-primary-600 font-medium flex items-center">
                Try Now
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </span>
            </Link>
            
            <Link to="/calculators/sip-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-2 duration-300 group">
              <div className="h-12 w-12 rounded-full bg-success-100 flex items-center justify-center mb-4 group-hover:bg-success-200 transition-colors">
                <BarChart4 className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-success-600 transition-colors">SIP Calculator</h3>
              <p className="text-neutral-600 mb-4">Plan your investment returns over time</p>
              <span className="text-success-600 font-medium flex items-center">
                Try Now
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </span>
            </Link>
            
            <Link to="/calculators/income-tax-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-2 duration-300 group">
              <div className="h-12 w-12 rounded-full bg-accent-100 flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
                <DollarSign className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-accent-600 transition-colors">Income Tax Calculator</h3>
              <p className="text-neutral-600 mb-4">Estimate your income tax liability</p>
              <span className="text-accent-600 font-medium flex items-center">
                Try Now
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </span>
            </Link>
            
            <Link to="/calculators/ppf-calculator" className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-2 duration-300 group">
              <div className="h-12 w-12 rounded-full bg-warning-100 flex items-center justify-center mb-4 group-hover:bg-warning-200 transition-colors">
                <PieChart className="h-6 w-6 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-warning-600 transition-colors">PPF Calculator</h3>
              <p className="text-neutral-600 mb-4">Project your PPF account growth</p>
              <span className="text-warning-600 font-medium flex items-center">
                Try Now
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Finance & Banking Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Finance & Banking Tools
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto text-center mb-12">
            Essential tools for everyday banking needs, transaction troubleshooting, and financial information
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <MapPin className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Bank IFSC/MICR Finder</h3>
              <p className="text-neutral-600 mb-4">Quickly find IFSC and MICR codes for any bank branch in India for seamless fund transfers and banking operations.</p>
              <Link to="/calculators/bank-ifsc-finder" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                Find Bank Codes
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-error-100 flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-error-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">UPI Failure Troubleshooter</h3>
              <p className="text-neutral-600 mb-4">Diagnose and resolve UPI transaction failures with step-by-step guidance and recover your stuck payments.</p>
              <Link to="/calculators/upi-failure-troubleshooter" className="text-error-600 hover:text-error-700 font-medium flex items-center">
                Troubleshoot UPI Issues
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-success-100 flex items-center justify-center mb-4">
                <MapPin className="h-7 w-7 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">ATM Locator</h3>
              <p className="text-neutral-600 mb-4">Find nearby ATMs with real-time status information on cash availability and operational conditions.</p>
              <Link to="/calculators/atm-locator" className="text-success-600 hover:text-success-700 font-medium flex items-center">
                Find ATMs Near You
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-warning-100 flex items-center justify-center mb-4">
                <Calendar className="h-7 w-7 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Bank Holiday Calendar</h3>
              <p className="text-neutral-600 mb-4">Comprehensive calendar of bank holidays across all Indian states to help plan your banking activities.</p>
              <Link to="/calculators/bank-holiday-calendar" className="text-warning-600 hover:text-warning-700 font-medium flex items-center">
                View Bank Holidays
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Best Interest Rates</h3>
              <p className="text-neutral-600 mb-4">Compare current interest rates across banks for loans, deposits, and savings accounts to find the best deals.</p>
              <Link to="/calculators/interest-rates-comparison" className="text-accent-600 hover:text-accent-700 font-medium flex items-center">
                Compare Rates
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
              <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Star className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Astro-Finance Insights</h3>
              <p className="text-neutral-600 mb-4">Explore astrological perspectives on financial decisions, lucky numbers, and auspicious timing for investments.</p>
              <a href="/astro-finance-insights.html" target="_blank" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
                Explore Astro-Finance Tools
                <ArrowRight className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" />
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-neutral-700 mb-6 max-w-3xl mx-auto">
              Our banking tools are designed to simplify your financial transactions and provide quick access to essential banking information.
            </p>
            <Link to="/calculators/banking-knowledge" className="btn bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              Explore all banking tools and resources
            </Link>
          </div>
        </div>
      </section>
      
      {/* Government Schemes Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Government Schemes for Indians
          </h2>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto text-center mb-12">
            Explore various government schemes designed to provide financial security and benefits to Indian citizens
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200 flex items-center">
                <Award className="h-5 w-5 text-primary-600 mr-2" />
                Investment & Savings
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Public Provident Fund (PPF)</h4>
                    <p className="text-neutral-600 text-sm mb-2">Long-term savings with tax benefits under Section 80C</p>
                    <Link to="/calculators/ppf-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Returns
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Sukanya Samriddhi Yojana</h4>
                    <p className="text-neutral-600 text-sm mb-2">Savings scheme for girl child with high interest rates</p>
                    <Link to="/calculators/sukanya-samriddhi-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Returns
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">National Pension System (NPS)</h4>
                    <p className="text-neutral-600 text-sm mb-2">Voluntary retirement savings scheme with tax benefits</p>
                    <Link to="/calculators/nps-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Returns
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Kisan Vikas Patra (KVP)</h4>
                    <p className="text-neutral-600 text-sm mb-2">Investment scheme that doubles your money in about 10 years</p>
                    <Link to="/calculators/post-office-schemes-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Returns
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200 flex items-center">
                <Shield className="h-5 w-5 text-primary-600 mr-2" />
                Insurance & Social Security
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Pradhan Mantri Jeevan Jyoti Bima Yojana</h4>
                    <p className="text-neutral-600 text-sm mb-2">Life insurance coverage of ₹2 lakh at just ₹330 per year</p>
                    <Link to="/calculators/term-insurance-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Compare with Term Insurance
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Pradhan Mantri Suraksha Bima Yojana</h4>
                    <p className="text-neutral-600 text-sm mb-2">Accidental death coverage of ₹2 lakh at just ₹12 per year</p>
                    <Link to="/calculators/human-life-value-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Coverage Needs
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Atal Pension Yojana</h4>
                    <p className="text-neutral-600 text-sm mb-2">Guaranteed pension of ₹1,000 to ₹5,000 per month after 60</p>
                    <Link to="/calculators/pension-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Pension
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Ayushman Bharat</h4>
                    <p className="text-neutral-600 text-sm mb-2">Health insurance coverage up to ₹5 lakh per family per year</p>
                    <Link to="/calculators/health-insurance-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Health Insurance
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200 flex items-center">
                <Zap className="h-5 w-5 text-primary-600 mr-2" />
                Business & Employment
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Pradhan Mantri Mudra Yojana</h4>
                    <p className="text-neutral-600 text-sm mb-2">Loans up to ₹10 lakh for small businesses without collateral</p>
                    <Link to="/calculators/business-loan-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Business Loan EMI
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Stand-Up India</h4>
                    <p className="text-neutral-600 text-sm mb-2">Loans from ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs</p>
                    <Link to="/calculators/loan-affordability-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Loan Affordability
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">PM-KISAN</h4>
                    <p className="text-neutral-600 text-sm mb-2">Direct income support of ₹6,000 per year to farmer families</p>
                    <Link to="/calculators/financial-goal-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Plan Financial Goals
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 pb-2 border-b border-neutral-200 flex items-center">
                <Home className="h-5 w-5 text-primary-600 mr-2" />
                Housing & Property
              </h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">Pradhan Mantri Awas Yojana (PMAY)</h4>
                    <p className="text-neutral-600 text-sm mb-2">Housing subsidy up to ₹2.67 lakh for affordable housing</p>
                    <Link to="/calculators/home-loan-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Home Loan EMI
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">CLSS for MIG</h4>
                    <p className="text-neutral-600 text-sm mb-2">Interest subsidy for middle income groups on home loans</p>
                    <Link to="/calculators/loan-affordability-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Check Loan Affordability
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="h-6 w-6 rounded-full bg-success-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="h-3 w-3 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900">RERA Protection</h4>
                    <p className="text-neutral-600 text-sm mb-2">Regulatory framework to protect homebuyers' interests</p>
                    <Link to="/calculators/property-registration-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      Calculate Registration Costs
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/blog/category/government-schemes" className="btn bg-success-600 text-white hover:bg-success-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              Read our detailed guides on government schemes
            </Link>
          </div>
        </div>
      </section>
      
      {/* Browse by Category */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculatorCategories.map(category => (
              <div key={category.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-neutral-100 transform hover:-translate-y-1 duration-300">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{category.name}</h3>
                <p className="text-neutral-600 mb-4 text-sm">{category.description}</p>
                
                <div className="space-y-2 mb-4">
                  {category.calculators.slice(0, 3).map(calculator => (
                    <Link 
                      key={calculator.id}
                      to={`/calculators/${calculator.id}`}
                      className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                    >
                      <div className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                        <ChevronRight className="h-3 w-3 text-primary-600" />
                      </div>
                      <span className="text-sm">{calculator.name}</span>
                    </Link>
                  ))}
                </div>
                
                <Link 
                  to={`/#${category.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  View all {category.calculators.length} calculators
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Detailed Category Listings */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {calculatorCategories.slice(0, 1).map(category => (
              <div key={category.id} id={category.id}>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-primary-600" />
                  {category.name}
                </h3>
                <p className="text-neutral-600 mb-8 text-lg">{category.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.calculators.slice(0, 6).map(calculator => (
                    <div key={calculator.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-neutral-100 p-6 transform hover:-translate-y-1 duration-300">
                      <h4 className="text-lg font-semibold text-neutral-900 mb-2">{calculator.name}</h4>
                      <p className="text-neutral-600 text-sm mb-4">{calculator.description}</p>
                      <Link 
                        to={`/calculators/${calculator.id}`}
                        className="btn bg-primary-600 text-white hover:bg-primary-700 w-full"
                      >
                        Use Calculator
                      </Link>
                    </div>
                  ))}
                </div>
                
                {category.calculators.length > 6 && (
                  <div className="text-center mt-8">
                    <Link 
                      to={`/#${category.id}`}
                      className="btn bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 shadow-md hover:shadow-lg transition-all"
                    >
                      View all {category.calculators.length} calculators
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to make informed financial decisions?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Our calculators help you plan loans, investments, taxes, and more with precision and ease.
          </p>
          <Link 
            to="/calculators/financial-goal-calculator"
            className="btn bg-white text-primary-700 hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg px-8 py-3"
          >
            Plan Your Financial Goals
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;