import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, ChevronRight, BookOpen, MapPin, Check, Star, TrendingUp, DollarSign, Shield, Zap, Award, BarChart4, PieChart, Calendar, Home as HomeIcon } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { SEOHead } from '../components/SEOHead';

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
    <div className="bg-white text-neutral-900">
      <SEOHead 
        title="Indian Financial Calculators | EMI, SIP, PPF, Income Tax & More"
        description="Comprehensive financial calculators for Indian users - EMI, SIP, PPF, Income Tax, Loan Comparison and more. Make informed financial decisions with accurate calculations."
        canonicalUrl="/"
        keywords="financial calculator, EMI calculator, SIP calculator, PPF calculator, income tax calculator, loan calculator, India, financial planning"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">India's Most Comprehensive Financial Calculator Suite</h1>
            <p className="text-xl mb-8">50+ calculators tailored for Indian financial needs - from EMI and taxes to investments and retirement planning</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/calculators/emi-calculator" className="btn bg-white text-primary-700 hover:bg-neutral-100">
                EMI Calculator
              </Link>
              <Link to="/calculators/sip-calculator" className="btn bg-white text-primary-700 hover:bg-neutral-100">
                SIP Calculator
              </Link>
              <Link to="/financial-navigator.html" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                Financial Navigator
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Financial Navigator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Financial Navigator: Your Guide to Indian Finance</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Navigate the complex world of banking and finance with our comprehensive educational tools designed to improve your financial literacy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Financial Literacy Hub</h3>
              <p className="text-neutral-700 mb-6">
                Our Financial Navigator is a comprehensive guide to help you understand and navigate the Indian financial system. From UPI payments to KYC processes, loan comparisons to scam detection, we've got you covered with practical knowledge and interactive tools.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Check className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">UPI Explainer</h4>
                    <p className="text-neutral-700 text-sm">Understand how UPI works with our interactive simulator</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Check className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">KYC Help</h4>
                    <p className="text-neutral-700 text-sm">Step-by-step guidance for completing KYC processes</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Check className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">EMI Calculator</h4>
                    <p className="text-neutral-700 text-sm">Visual calculator to understand loan payments</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Check className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">Scam Detector</h4>
                    <p className="text-neutral-700 text-sm">Identify and avoid common financial scams</p>
                  </div>
                </div>
              </div>
              
              <p className="text-neutral-700 mb-6">
                Our Financial Navigator is designed to simplify complex financial concepts and empower you with the knowledge to make informed decisions.
              </p>
              
              <a href="/financial-navigator.html" className="btn bg-primary-600 text-white hover:bg-primary-700">
                Explore Financial Navigator
              </a>
            </div>
            
            <div className="bg-neutral-50 p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm hover-card-effect">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">UPI Explainer</h4>
                  <p className="text-neutral-700 text-sm">Learn how UPI works, troubleshoot issues, and maximize its benefits</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm hover-card-effect">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">KYC Help</h4>
                  <p className="text-neutral-700 text-sm">Complete guide to KYC processes across different financial institutions</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm hover-card-effect">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Calculator className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">EMI Calculator</h4>
                  <p className="text-neutral-700 text-sm">Interactive tool to visualize loan payments and interest components</p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm hover-card-effect">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 mb-2">Scam Detector</h4>
                  <p className="text-neutral-700 text-sm">Learn to identify and protect yourself from financial fraud</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a href="/financial-navigator.html" className="text-lg font-semibold text-primary-600 hover:text-primary-700 flex items-center justify-center">
              Explore Financial Navigator
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Astro-Finance Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Astro-Finance Insights Hub</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Where traditional astrological wisdom meets modern financial planning, offering a unique perspective on your financial journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Where Astrology Meets Finance</h3>
              <p className="text-neutral-700 mb-4">
                Explore our unique Astro-Finance Insights Hub, where traditional astrological wisdom meets modern financial planning. Discover how cosmic influences might align with your financial decisions and life path.
              </p>
              <p className="text-neutral-700 mb-6">
                While we emphasize that financial decisions should always be based on sound financial principles, many in India also consider astrological insights as a complementary perspective.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Daily Finance Horoscopes</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Zodiac Compatibility</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Lucky Numbers</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Auspicious Timing</span>
              </div>
              
              <a href="/astro-finance-insights.html" className="btn bg-purple-600 text-white hover:bg-purple-700">
                Explore Astro-Finance Insights
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm hover-card-effect">
                <div className="text-3xl mb-3">☀️</div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Daily Horoscopes</h4>
                <p className="text-neutral-700 text-sm">Get daily astrological predictions for your zodiac sign, with special focus on financial aspects and opportunities.</p>
                <a href="/astro-finance-insights.html#daily-horoscope" className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-3 inline-block">
                  View Your Horoscope
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover-card-effect">
                <div className="text-3xl mb-3">🔢</div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Numerology Tools</h4>
                <p className="text-neutral-700 text-sm">Calculate your Life Path Number and discover your lucky numbers for financial decisions and investments.</p>
                <a href="/astro-finance-insights.html#numerology" className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-3 inline-block">
                  Calculate Your Numbers
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover-card-effect">
                <div className="text-3xl mb-3">⏰</div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">Auspicious Timing</h4>
                <p className="text-neutral-700 text-sm">Find the most favorable times for important financial activities like business launches or major investments.</p>
                <a href="/astro-finance-insights.html#muhurat" className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-3 inline-block">
                  Find Auspicious Times
                </a>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover-card-effect">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                  <p className="text-sm text-yellow-700">
                    <strong>Disclaimer:</strong> The astrological insights provided are for entertainment and cultural interest only. Financial decisions should always be based on sound financial principles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <a href="/astro-finance-insights.html" className="text-lg font-semibold text-purple-600 hover:text-purple-700 flex items-center justify-center">
              Explore All Astro-Finance Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Popular Calculators Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Most Popular Calculators</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Our most used financial tools that help thousands of Indians make better financial decisions every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link to="/calculators/emi-calculator" className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">EMI Calculator</h3>
              <p className="text-neutral-700 mb-4">Calculate your monthly loan payments</p>
              <span className="text-primary-600 font-medium flex items-center">
                Calculate Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
            
            <Link to="/calculators/sip-calculator" className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">SIP Calculator</h3>
              <p className="text-neutral-700 mb-4">Plan your investment returns over time</p>
              <span className="text-primary-600 font-medium flex items-center">
                Calculate Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
            
            <Link to="/calculators/income-tax-calculator" className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Income Tax Calculator</h3>
              <p className="text-neutral-700 mb-4">Estimate your income tax liability</p>
              <span className="text-primary-600 font-medium flex items-center">
                Calculate Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
            
            <Link to="/calculators/ppf-calculator" className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">PPF Calculator</h3>
              <p className="text-neutral-700 mb-4">Project your PPF account growth</p>
              <span className="text-primary-600 font-medium flex items-center">
                Calculate Now
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Banking Tools Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Finance & Banking Tools</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Essential tools for everyday banking needs, transaction troubleshooting, and financial information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <Link to="/calculators/bank-ifsc-finder" className="block">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Bank IFSC/MICR Finder</h3>
                <p className="text-neutral-700 mb-4">Quickly find IFSC and MICR codes for any bank branch in India for seamless fund transfers and banking operations.</p>
                <span className="text-primary-600 font-medium flex items-center">
                  Find Bank Codes
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <Link to="/calculators/upi-failure-troubleshooter" className="block">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">UPI Failure Troubleshooter</h3>
                <p className="text-neutral-700 mb-4">Diagnose and resolve UPI transaction failures with step-by-step guidance and recover your stuck payments.</p>
                <span className="text-primary-600 font-medium flex items-center">
                  Troubleshoot UPI Issues
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <Link to="/calculators/atm-locator" className="block">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">ATM Locator</h3>
                <p className="text-neutral-700 mb-4">Find nearby ATMs with real-time status information on cash availability and operational conditions.</p>
                <span className="text-primary-600 font-medium flex items-center">
                  Find ATMs Near You
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <Link to="/calculators/bank-holiday-calendar" className="block">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Bank Holiday Calendar</h3>
                <p className="text-neutral-700 mb-4">Comprehensive calendar of bank holidays across all Indian states to help plan your banking activities.</p>
                <span className="text-primary-600 font-medium flex items-center">
                  View Bank Holidays
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <Link to="/calculators/interest-rates-comparison" className="block">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Best Interest Rates</h3>
                <p className="text-neutral-700 mb-4">Compare current interest rates across banks for loans, deposits, and savings accounts to find the best deals.</p>
                <span className="text-primary-600 font-medium flex items-center">
                  Compare Rates
                  <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover-card-effect">
              <div className="text-3xl mb-3">🌟</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Astro-Finance Insights</h3>
              <p className="text-neutral-700 mb-4">Explore astrological perspectives on financial decisions, lucky numbers, and auspicious timing for investments.</p>
              <a href="/astro-finance-insights.html" className="text-purple-600 font-medium flex items-center">
                Explore Astro-Finance Tools
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-neutral-700 mb-6">
              Our banking tools are designed to simplify your financial transactions and provide quick access to essential banking information.
            </p>
            <Link to="/#finance-banking-tools" className="text-lg font-semibold text-primary-600 hover:text-primary-700 flex items-center justify-center">
              Explore all banking tools and resources
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Government Schemes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Government Schemes for Indians</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Explore various government schemes designed to provide financial security and benefits to Indian citizens
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Investment & Savings</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Public Provident Fund (PPF)</h4>
                      <p className="text-neutral-700 mb-2">Long-term savings with tax benefits under Section 80C</p>
                      <Link to="/calculators/ppf-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Returns →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Sukanya Samriddhi Yojana</h4>
                      <p className="text-neutral-700 mb-2">Savings scheme for girl child with high interest rates</p>
                      <Link to="/calculators/sukanya-samriddhi-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Returns →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">National Pension System (NPS)</h4>
                      <p className="text-neutral-700 mb-2">Voluntary retirement savings scheme with tax benefits</p>
                      <Link to="/calculators/nps-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Returns →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Kisan Vikas Patra (KVP)</h4>
                      <p className="text-neutral-700 mb-2">Investment scheme that doubles your money in about 10 years</p>
                      <Link to="/calculators/post-office-schemes-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Returns →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Insurance & Social Security</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Pradhan Mantri Jeevan Jyoti Bima Yojana</h4>
                      <p className="text-neutral-700 mb-2">Life insurance coverage of ₹2 lakh at just ₹330 per year</p>
                      <Link to="/calculators/term-insurance-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Compare with Term Insurance →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Pradhan Mantri Suraksha Bima Yojana</h4>
                      <p className="text-neutral-700 mb-2">Accidental death coverage of ₹2 lakh at just ₹12 per year</p>
                      <Link to="/calculators/human-life-value-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Coverage Needs →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Atal Pension Yojana</h4>
                      <p className="text-neutral-700 mb-2">Guaranteed pension of ₹1,000 to ₹5,000 per month after 60</p>
                      <Link to="/calculators/pension-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Pension →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Ayushman Bharat</h4>
                      <p className="text-neutral-700 mb-2">Health insurance coverage up to ₹5 lakh per family per year</p>
                      <Link to="/calculators/health-insurance-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Health Insurance →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Business & Employment</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Pradhan Mantri Mudra Yojana</h4>
                      <p className="text-neutral-700 mb-2">Loans up to ₹10 lakh for small businesses without collateral</p>
                      <Link to="/calculators/business-loan-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Business Loan EMI →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Stand-Up India</h4>
                      <p className="text-neutral-700 mb-2">Loans from ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs</p>
                      <Link to="/calculators/loan-affordability-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Loan Affordability →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Housing & Property</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">Pradhan Mantri Awas Yojana (PMAY)</h4>
                      <p className="text-neutral-700 mb-2">Housing subsidy up to ₹2.67 lakh for affordable housing</p>
                      <Link to="/calculators/home-loan-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Calculate Home Loan EMI →
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-neutral-200 hover-card-effect">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <Check className="h-5 w-5 text-success-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900">CLSS for MIG</h4>
                      <p className="text-neutral-700 mb-2">Interest subsidy for middle income groups on home loans</p>
                      <Link to="/calculators/loan-affordability-calculator" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Check Loan Affordability →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/blog/category/government-schemes" className="text-lg font-semibold text-primary-600 hover:text-primary-700 flex items-center justify-center">
              Read our detailed guides on government schemes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-neutral-50" id="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
              Explore our comprehensive collection of financial calculators organized by category
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {calculatorCategories.slice(0, 6).map(category => (
              <div key={category.id} className="bg-white rounded-xl shadow-md p-6 hover-card-effect">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{category.name}</h3>
                <p className="text-neutral-700 mb-4 text-sm">{category.description}</p>
                
                <div className="space-y-2 mb-4">
                  {category.calculators.slice(0, 3).map(calculator => (
                    <Link 
                      key={calculator.id}
                      to={`/calculators/${calculator.id}`}
                      className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 mr-1 text-primary-500" />
                      <span className="text-sm">{calculator.name}</span>
                    </Link>
                  ))}
                </div>
                
                <Link 
                  to={`/#${category.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  View all {category.calculators.length} calculators
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
          
          {/* Featured Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                Finance & Banking Tools
              </h3>
              <p className="text-neutral-700 mb-4">
                Essential tools for everyday banking needs, transaction troubleshooting, and financial information
              </p>
              
              <div className="space-y-3 mb-4">
                <Link to="/calculators/bank-ifsc-finder" className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary-500" />
                  <span>Bank IFSC/MICR Finder</span>
                </Link>
                <Link to="/calculators/upi-failure-troubleshooter" className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary-500" />
                  <span>UPI Failure Troubleshooter</span>
                </Link>
                <Link to="/calculators/atm-locator" className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary-500" />
                  <span>ATM Locator</span>
                </Link>
              </div>
              
              <Link to="/#finance-banking-tools" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                View all 6 calculators
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary-600" />
                Government Schemes
              </h3>
              <p className="text-neutral-700 mb-4">
                Calculate returns and benefits from various government-backed financial schemes in India
              </p>
              
              <div className="space-y-3 mb-4">
                <Link to="/calculators/sukanya-samriddhi-calculator" className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary-500" />
                  <span>Sukanya Samriddhi Yojana Calculator</span>
                </Link>
                <Link to="/calculators/nps-calculator" className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary-500" />
                  <span>National Pension System Calculator</span>
                </Link>
                <Link to="/calculators/nps-tier-2-calculator" className="flex items-center text-neutral-700 hover:text-primary-600 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary-500" />
                  <span>NPS Tier-2 Calculator</span>
                </Link>
              </div>
              
              <Link to="/#government-schemes" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                View all 6 calculators
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Detailed Category Listings */}
      {calculatorCategories.map((category, index) => (
        <section 
          key={category.id} 
          id={category.id} 
          className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">{category.name}</h2>
            <p className="text-xl text-neutral-700 mb-8">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {category.calculators.map(calculator => (
                <div key={calculator.id} className="bg-white p-6 rounded-lg border border-neutral-200 hover-card-effect">
                  <Link to={`/calculators/${calculator.id}`} className="block">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">{calculator.name}</h3>
                    <p className="text-neutral-700 mb-4 text-sm">{calculator.description}</p>
                    <span className="text-primary-600 font-medium flex items-center">
                      Use Calculator
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to make informed financial decisions?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Our calculators help you plan loans, investments, taxes, and more with precision and ease.
          </p>
          <Link to="/#categories" className="btn bg-white text-primary-700 hover:bg-neutral-100">
            Plan Your Financial Goals
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;