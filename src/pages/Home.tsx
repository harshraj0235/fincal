import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, TrendingUp, DollarSign, PieChart, FileText, Award, Shield, Building, Search, MapPin, CreditCard, Globe, BookOpen } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { CategorySection } from '../components/CategorySection';

export const Home: React.FC = () => {
  const location = useLocation();
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const govtSchemesRef = useRef<HTMLDivElement | null>(null);
  const bankingToolsRef = useRef<HTMLDivElement | null>(null);
  const financialNavigatorRef = useRef<HTMLDivElement | null>(null);
  const astroFinanceRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash) {
      const categoryId = location.hash.substring(1);
      
      if (categoryId === 'govt-schemes' && govtSchemesRef.current) {
        // Scroll to government schemes section
        setTimeout(() => {
          govtSchemesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else if (categoryId === 'banking-tools' && bankingToolsRef.current) {
        // Scroll to banking tools section
        setTimeout(() => {
          bankingToolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else if (categoryId === 'financial-navigator' && financialNavigatorRef.current) {
        // Scroll to financial navigator section
        setTimeout(() => {
          financialNavigatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else if (categoryId === 'astro-finance' && astroFinanceRef.current) {
        // Scroll to astro-finance section
        setTimeout(() => {
          astroFinanceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        const element = categoryRefs.current[categoryId];
        
        if (element) {
          // Scroll to the category with a small delay to ensure rendering is complete
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }
  }, [location]);
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-white text-neutral-900 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              India's Most Comprehensive Financial Calculator Suite
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-neutral-600">
              50+ calculators tailored for Indian financial needs - from EMI and taxes to investments and retirement planning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculators/emi-calculator" className="btn bg-[--primary-600] text-white hover:bg-[--primary-700]">
                EMI Calculator
              </Link>
              <Link to="/calculators/sip-calculator" className="btn bg-white text-[--primary-800] border border-[--primary-200] hover:bg-neutral-50">
                SIP Calculator
              </Link>
              <Link to="#financial-navigator" className="btn bg-[--accent-600] text-white hover:bg-[--accent-700]">
                Financial Navigator
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Financial Navigator Section */}
      <section 
        id="financial-navigator" 
        ref={financialNavigatorRef}
        className="py-12 sm:py-16 bg-gradient-to-r from-[--accent-50] to-[--primary-50]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Financial Navigator: Your Guide to Indian Finance</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Navigate the complex world of banking and finance with our comprehensive educational tools designed to improve your financial literacy
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-[--accent-100]">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-[--accent-600]" />
                  Financial Literacy Hub
                </h3>
                <p className="text-neutral-700 mb-4">
                  Our Financial Navigator is a comprehensive guide to help you understand and navigate the Indian financial system. From UPI payments to KYC processes, loan comparisons to scam detection, we've got you covered with practical knowledge and interactive tools.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[--accent-100] text-[--accent-800] rounded-full text-sm">UPI Explainer</span>
                  <span className="px-3 py-1 bg-[--accent-100] text-[--accent-800] rounded-full text-sm">KYC Help</span>
                  <span className="px-3 py-1 bg-[--accent-100] text-[--accent-800] rounded-full text-sm">Loan Comparison</span>
                  <span className="px-3 py-1 bg-[--accent-100] text-[--accent-800] rounded-full text-sm">CIBIL Education</span>
                  <span className="px-3 py-1 bg-[--accent-100] text-[--accent-800] rounded-full text-sm">Scam Detection</span>
                </div>
                <a 
                  href="/financial-navigator.html" 
                  target="_blank"
                  className="inline-flex items-center text-[--accent-600] hover:text-[--accent-700] font-medium"
                >
                  Launch Financial Navigator
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[--accent-50] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Globe className="h-5 w-5 text-[--accent-600] mr-2" />
                      <h4 className="font-medium text-[--accent-800]">UPI Explainer</h4>
                    </div>
                    <p className="text-sm text-[--accent-700]">Understand how UPI works with our interactive simulator</p>
                  </div>
                  <div className="bg-[--primary-50] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-[--primary-600] mr-2" />
                      <h4 className="font-medium text-[--primary-800]">KYC Help</h4>
                    </div>
                    <p className="text-sm text-[--primary-700]">Step-by-step guidance for completing KYC processes</p>
                  </div>
                  <div className="bg-[--success-50] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Calculator className="h-5 w-5 text-[--success-600] mr-2" />
                      <h4 className="font-medium text-[--success-800]">EMI Calculator</h4>
                    </div>
                    <p className="text-sm text-[--success-700]">Visual calculator to understand loan payments</p>
                  </div>
                  <div className="bg-[--error-50] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Search className="h-5 w-5 text-[--error-600] mr-2" />
                      <h4 className="font-medium text-[--error-800]">Scam Detector</h4>
                    </div>
                    <p className="text-sm text-[--error-700]">Identify and avoid common financial scams</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-neutral-700 mb-4">
              Our Financial Navigator is designed to simplify complex financial concepts and empower you with the knowledge to make informed decisions.
            </p>
            <a 
              href="/financial-navigator.html" 
              target="_blank"
              className="btn bg-[--accent-600] text-white hover:bg-[--accent-700]"
            >
              Explore Financial Navigator
            </a>
          </div>
        </div>
      </section>
      
      {/* Astro-Finance Insights Section */}
      <section 
        id="astro-finance" 
        ref={astroFinanceRef}
        className="py-12 sm:py-16 bg-gradient-to-r from-[--primary-50] to-[--secondary-50]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Astro-Finance Insights Hub</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore the intersection of astrology and finance with our specialized tools that provide unique perspectives on financial decisions
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-[--primary-100]">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🌌</span>
                  Astrological Financial Guidance
                </h3>
                <p className="text-neutral-700 mb-4">
                  Our Astro-Finance Insights Hub offers a unique blend of traditional astrological wisdom and modern financial concepts. Discover how cosmic energies might influence your financial decisions and explore personalized insights based on your birth details.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[--primary-100] text-[--primary-800] rounded-full text-sm">Daily Finance Horoscope</span>
                  <span className="px-3 py-1 bg-[--primary-100] text-[--primary-800] rounded-full text-sm">Zodiac Compatibility</span>
                  <span className="px-3 py-1 bg-[--primary-100] text-[--primary-800] rounded-full text-sm">Lucky Number Calculator</span>
                  <span className="px-3 py-1 bg-[--primary-100] text-[--primary-800] rounded-full text-sm">Auspicious Timing</span>
                </div>
                <a 
                  href="/astro-finance-insights.html" 
                  target="_blank"
                  className="inline-flex items-center text-[--primary-600] hover:text-[--primary-700] font-medium"
                >
                  Explore Astro-Finance Tools
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </a>
              </div>
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[--primary-50] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💸</span>
                      <h4 className="font-medium text-[--primary-800]">Finance Horoscope</h4>
                    </div>
                    <p className="text-sm text-[--primary-700]">Daily and monthly financial predictions for your zodiac sign</p>
                  </div>
                  <div className="bg-[--secondary-50] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">📈</span>
                      <h4 className="font-medium text-[--secondary-800]">Market Timing</h4>
                    </div>
                    <p className="text-sm text-[--secondary-700]">Astrological insights for stock market trends and timing</p>
                  </div>
                  <div className="bg-[--accent-50] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">⏰</span>
                      <h4 className="font-medium text-[--accent-800]">Auspicious Timing</h4>
                    </div>
                    <p className="text-sm text-[--accent-700]">Find favorable times for financial activities and investments</p>
                  </div>
                  <div className="bg-[--success-50] p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">💎</span>
                      <h4 className="font-medium text-[--success-800]">Gemstone Finder</h4>
                    </div>
                    <p className="text-sm text-[--success-700]">Discover gemstones that may enhance your financial prospects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--primary-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">🔢</div>
                  <h3 className="text-xl font-semibold text-neutral-900">Numerology & Finance</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Discover how your personal numbers might influence your financial decisions and wealth potential. Calculate your Life Path Number and Lucky Numbers.
                </p>
                <a 
                  href="/astro-finance-insights.html#numerology" 
                  className="text-[--primary-600] font-medium flex items-center"
                >
                  Explore Numerology Tools
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--accent-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">🗓️</div>
                  <h3 className="text-xl font-semibold text-neutral-900">Auspicious Timing</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Find the most favorable times for important financial activities like business launches, property purchases, or major investments.
                </p>
                <a 
                  href="/astro-finance-insights.html#timing" 
                  className="text-[--accent-600] font-medium flex items-center"
                >
                  Find Auspicious Times
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--success-500] to-[--success-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">🌙</div>
                  <h3 className="text-xl font-semibold text-neutral-900">Vedic Astrology</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Explore traditional Vedic astrological tools like Kundli generation, Moon Sign calculation, and Nakshatra analysis for financial insights.
                </p>
                <a 
                  href="/astro-finance-insights.html#vedic" 
                  className="text-[--success-600] font-medium flex items-center"
                >
                  Explore Vedic Tools
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-[--primary-50] rounded-lg p-6 border border-[--primary-100]">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-[--primary-600]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="ml-3 text-sm text-[--primary-700]">
                <strong>Disclaimer:</strong> Our Astro-Finance tools are provided for entertainment and educational purposes only. Financial decisions should be based primarily on sound financial principles, research, and professional advice. Astrological insights should be considered supplementary.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/astro-finance-insights.html" 
              target="_blank"
              className="btn bg-[--primary-600] text-white hover:bg-[--primary-700]"
            >
              Explore All Astro-Finance Tools
            </a>
          </div>
        </div>
      </section>
      
      {/* Popular Calculators */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Most Popular Calculators</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Our most used financial tools that help thousands of Indians make better financial decisions every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                id: 'emi-calculator',
                name: 'EMI Calculator',
                description: 'Calculate your monthly loan payments',
                icon: <Calculator className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'sip-calculator',
                name: 'SIP Calculator',
                description: 'Plan your investment returns over time',
                icon: <TrendingUp className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'income-tax-calculator',
                name: 'Income Tax Calculator',
                description: 'Estimate your income tax liability',
                icon: <DollarSign className="h-6 w-6 text-[--primary-600]" />
              },
              {
                id: 'ppf-calculator',
                name: 'PPF Calculator',
                description: 'Project your PPF account growth',
                icon: <PieChart className="h-6 w-6 text-[--primary-600]" />
              }
            ].map(calculator => (
              <Link 
                key={calculator.id}
                to={`/calculators/${calculator.id}`} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="rounded-full bg-[--primary-50] p-4 mb-4">
                  {calculator.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">{calculator.name}</h3>
                <p className="text-neutral-600">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Finance & Banking Tools Section */}
      <section 
        id="banking-tools" 
        ref={bankingToolsRef}
        className="py-12 sm:py-16 bg-gradient-to-r from-[--primary-50] to-[--secondary-50]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Finance & Banking Tools</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Essential tools for everyday banking needs, transaction troubleshooting, and financial information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bank IFSC/MICR Finder */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--primary-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--primary-100] p-3 mr-4">
                    <Search className="h-6 w-6 text-[--primary-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Bank IFSC/MICR Finder</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Quickly find IFSC and MICR codes for any bank branch in India for seamless fund transfers and banking operations.
                </p>
                <Link to="/calculators/bank-ifsc-finder" className="text-[--primary-600] font-medium flex items-center">
                  Find Bank Codes
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* UPI Transaction Failure Troubleshooter */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--error-500] to-[--error-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--error-100] p-3 mr-4">
                    <CreditCard className="h-6 w-6 text-[--error-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">UPI Failure Troubleshooter</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Diagnose and resolve UPI transaction failures with step-by-step guidance and recover your stuck payments.
                </p>
                <Link to="/calculators/upi-failure-troubleshooter" className="text-[--error-600] font-medium flex items-center">
                  Troubleshoot UPI Issues
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* ATM Locator with Status */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--success-500] to-[--success-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--success-100] p-3 mr-4">
                    <MapPin className="h-6 w-6 text-[--success-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">ATM Locator</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Find nearby ATMs with real-time status information on cash availability and operational conditions.
                </p>
                <Link to="/calculators/atm-locator" className="text-[--success-600] font-medium flex items-center">
                  Find ATMs Near You
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Bank Holiday Calendar */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--accent-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--accent-100] p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[--accent-600]">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                      <path d="M8 14h.01"></path>
                      <path d="M12 14h.01"></path>
                      <path d="M16 14h.01"></path>
                      <path d="M8 18h.01"></path>
                      <path d="M12 18h.01"></path>
                      <path d="M16 18h.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Bank Holiday Calendar</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Comprehensive calendar of bank holidays across all Indian states to help plan your banking activities.
                </p>
                <Link to="/calculators/bank-holiday-calendar" className="text-[--accent-600] font-medium flex items-center">
                  View Bank Holidays
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Best Interest Rates Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--secondary-500]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--secondary-100] p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[--secondary-600]">
                      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"></path>
                      <path d="M17 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"></path>
                      <path d="M12 12v9"></path>
                      <path d="M8 21h8"></path>
                      <path d="M12 3v9"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Best Interest Rates</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Compare current interest rates across banks for loans, deposits, and savings accounts to find the best deals.
                </p>
                <Link to="/calculators/interest-rates-comparison" className="text-[--secondary-600] font-medium flex items-center">
                  Compare Rates
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Financial Navigator */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--accent-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--accent-100] p-3 mr-4">
                    <BookOpen className="h-6 w-6 text-[--accent-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Financial Navigator</h3>
                </div>
                <p className="text-neutral-600 mb-4">
                  Interactive guide to help you understand UPI, KYC, loans, and protect yourself from financial scams.
                </p>
                <a href="/financial-navigator.html" target="_blank" className="text-[--accent-600] font-medium flex items-center">
                  Launch Financial Navigator
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-neutral-700 mb-4">
              Our banking tools are designed to simplify your financial transactions and provide quick access to essential banking information.
            </p>
            <Link to="/calculators/finance-banking-tools" className="inline-flex items-center text-[--primary-600] hover:text-[--primary-700] font-medium">
              Explore all banking tools and resources
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Government Schemes Section */}
      <section 
        id="govt-schemes" 
        ref={govtSchemesRef}
        className="py-12 sm:py-16 bg-gradient-to-r from-[--success-50] to-[--primary-50]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">Government Schemes for Indians</h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore various government schemes designed to provide financial security and benefits to Indian citizens
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Investment & Savings Schemes */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--primary-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--primary-100] p-3 mr-4">
                    <PieChart className="h-6 w-6 text-[--primary-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Investment & Savings</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Public Provident Fund (PPF)</p>
                      <p className="text-sm text-neutral-600">Long-term savings with tax benefits under Section 80C</p>
                      <Link to="/calculators/ppf-calculator" className="text-xs text-[--primary-600] font-medium hover:underline">Calculate Returns →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Sukanya Samriddhi Yojana</p>
                      <p className="text-sm text-neutral-600">Savings scheme for girl child with high interest rates</p>
                      <Link to="/calculators/sukanya-samriddhi-calculator" className="text-xs text-[--primary-600] font-medium hover:underline">Calculate Returns →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">National Pension System (NPS)</p>
                      <p className="text-sm text-neutral-600">Voluntary retirement savings scheme with tax benefits</p>
                      <Link to="/calculators/nps-calculator" className="text-xs text-[--primary-600] font-medium hover:underline">Calculate Returns →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--primary-100] text-[--primary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Kisan Vikas Patra (KVP)</p>
                      <p className="text-sm text-neutral-600">Investment scheme that doubles your money in about 10 years</p>
                      <Link to="/calculators/post-office-schemes-calculator" className="text-xs text-[--primary-600] font-medium hover:underline">Calculate Returns →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Insurance & Social Security */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--success-500] to-[--success-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--success-100] p-3 mr-4">
                    <Shield className="h-6 w-6 text-[--success-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Insurance & Social Security</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Pradhan Mantri Jeevan Jyoti Bima Yojana</p>
                      <p className="text-sm text-neutral-600">Life insurance coverage of ₹2 lakh at just ₹330 per year</p>
                      <Link to="/calculators/term-insurance-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Compare with Term Insurance →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Pradhan Mantri Suraksha Bima Yojana</p>
                      <p className="text-sm text-neutral-600">Accidental death coverage of ₹2 lakh at just ₹12 per year</p>
                      <Link to="/calculators/human-life-value-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Calculate Coverage Needs →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Atal Pension Yojana</p>
                      <p className="text-sm text-neutral-600">Guaranteed pension of ₹1,000 to ₹5,000 per month after 60</p>
                      <Link to="/calculators/pension-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Calculate Pension →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--success-100] text-[--success-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Ayushman Bharat</p>
                      <p className="text-sm text-neutral-600">Health insurance coverage up to ₹5 lakh per family per year</p>
                      <Link to="/calculators/health-insurance-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Calculate Health Insurance →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Business & Employment */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--accent-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--accent-100] p-3 mr-4">
                    <Building className="h-6 w-6 text-[--accent-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Business & Employment</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Pradhan Mantri Mudra Yojana</p>
                      <p className="text-sm text-neutral-600">Loans up to ₹10 lakh for small businesses without collateral</p>
                      <Link to="/calculators/business-loan-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Calculate Business Loan EMI →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Stand-Up India</p>
                      <p className="text-sm text-neutral-600">Loans from ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs</p>
                      <Link to="/calculators/loan-affordability-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Calculate Loan Affordability →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">PM-KISAN</p>
                      <p className="text-sm text-neutral-600">Direct income support of ₹6,000 per year to farmer families</p>
                      <Link to="/calculators/financial-goal-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Plan Financial Goals →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">MGNREGA</p>
                      <p className="text-sm text-neutral-600">Guarantees 100 days of wage employment in rural areas</p>
                      <Link to="/calculators/budget-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Create Budget Plan →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Housing & Property */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--primary-500] to-[--secondary-500]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--secondary-100] p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[--secondary-600]">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Housing & Property</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--secondary-100] text-[--secondary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Pradhan Mantri Awas Yojana (PMAY)</p>
                      <p className="text-sm text-neutral-600">Housing subsidy up to ₹2.67 lakh for affordable housing</p>
                      <Link to="/calculators/home-loan-calculator" className="text-xs text-[--secondary-600] font-medium hover:underline">Calculate Home Loan EMI →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--secondary-100] text-[--secondary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">CLSS for MIG</p>
                      <p className="text-sm text-neutral-600">Interest subsidy for middle income groups on home loans</p>
                      <Link to="/calculators/loan-affordability-calculator" className="text-xs text-[--secondary-600] font-medium hover:underline">Check Loan Affordability →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--secondary-100] text-[--secondary-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">RERA Protection</p>
                      <p className="text-sm text-neutral-600">Regulatory framework to protect homebuyers' interests</p>
                      <Link to="/calculators/property-registration-calculator" className="text-xs text-[--secondary-600] font-medium hover:underline">Calculate Registration Costs →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Education & Skill Development */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--error-500] to-[--error-600]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--error-100] p-3 mr-4">
                    <FileText className="h-6 w-6 text-[--error-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Education & Skills</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--error-100] text-[--error-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Vidya Lakshmi Portal</p>
                      <p className="text-sm text-neutral-600">Single window for education loans from multiple banks</p>
                      <Link to="/calculators/emi-calculator" className="text-xs text-[--error-600] font-medium hover:underline">Calculate Education Loan EMI →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--error-100] text-[--error-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">PM Kaushal Vikas Yojana</p>
                      <p className="text-sm text-neutral-600">Free skill training for youth with certification and monetary reward</p>
                      <Link to="/calculators/financial-goal-calculator" className="text-xs text-[--error-600] font-medium hover:underline">Plan Career Goals →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--error-100] text-[--error-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">National Scholarship Portal</p>
                      <p className="text-sm text-neutral-600">Single platform for all scholarship schemes across ministries</p>
                      <Link to="/calculators/compound-interest-calculator" className="text-xs text-[--success-600] font-medium hover:underline">Calculate Education Fund →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Tax Benefits & Subsidies */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-[--accent-500] to-[--primary-500]"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-[--accent-100] p-3 mr-4">
                    <Award className="h-6 w-6 text-[--accent-600]" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900">Tax Benefits & Subsidies</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Section 80C Deductions</p>
                      <p className="text-sm text-neutral-600">Tax benefits up to ₹1.5 lakh on various investments</p>
                      <Link to="/calculators/section-80c-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Calculate Tax Savings →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">LPG Subsidy</p>
                      <p className="text-sm text-neutral-600">Direct benefit transfer for LPG cylinder subsidies</p>
                      <Link to="/calculators/budget-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Plan Monthly Budget →</Link>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[--accent-100] text-[--accent-600] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Electricity Subsidies</p>
                      <p className="text-sm text-neutral-600">State-specific subsidies for electricity consumption</p>
                      <Link to="/calculators/tax-saving-investment-calculator" className="text-xs text-[--accent-600] font-medium hover:underline">Plan Tax Savings →</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/blog" className="inline-flex items-center text-[--primary-600] hover:text-[--primary-700] font-medium">
              <FileText className="h-5 w-5 mr-2" />
              Read our detailed guides on government schemes
            </Link>
          </div>
        </div>
      </section>
      
      {/* Category Section */}
      <CategorySection />
      
      {/* Categories */}
      {calculatorCategories.map((category, index) => (
        <section 
          key={category.id}
          id={category.id}
          ref={el => categoryRefs.current[category.id] = el}
          className="py-12 sm:py-16 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">{category.name}</h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {category.calculators.map(calculator => (
                <Link 
                  key={calculator.id}
                  to={`/calculators/${calculator.id}`} 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">{calculator.name}</h3>
                  <p className="text-neutral-600 mb-4">{calculator.description}</p>
                  <div className="text-[--primary-600] font-medium flex items-center">
                    Use Calculator
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-neutral-900">Ready to make informed financial decisions?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-neutral-600">
            Our calculators help you plan loans, investments, taxes, and more with precision and ease.
          </p>
          <Link 
            to="/calculators/financial-goal-calculator" 
            className="btn bg-[--primary-600] text-white hover:bg-[--primary-700] text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3"
          >
            Plan Your Financial Goals
          </Link>
        </div>
      </section>
    </div>
  );
};