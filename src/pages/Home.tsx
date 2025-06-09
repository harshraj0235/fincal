import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Home as HomeIcon,
  BookOpen,
  CreditCard,
  DollarSign,
  PieChart,
  Briefcase,
  GraduationCap,
  Heart,
  Search
} from 'lucide-react';
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
    "description": "Comprehensive financial calculators for Indian users - EMI, SIP, PPF, Income Tax, Loan Comparison and more"
  };

  return (
    <div className="bg-white text-neutral-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              India's Most Comprehensive Financial Calculator Suite
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              50+ calculators tailored for Indian financial needs - from EMI and taxes to investments and retirement planning
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/calculators/emi-calculator" className="btn bg-white text-primary-700 hover:bg-neutral-100">
                EMI Calculator
              </Link>
              <Link to="/calculators/sip-calculator" className="btn bg-white text-primary-700 hover:bg-neutral-100">
                SIP Calculator
              </Link>
              <Link to="/financial-navigator.html" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
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
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Financial Navigator: Your Guide to Indian Finance
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Navigate the complex world of banking and finance with our comprehensive educational tools designed to improve your financial literacy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Financial Literacy Hub</h3>
              <p className="text-neutral-700 mb-6">
                Our Financial Navigator is a comprehensive guide to help you understand and navigate the Indian financial system. From UPI payments to KYC processes, loan comparisons to scam detection, we've got you covered with practical knowledge and interactive tools.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <DollarSign className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">UPI Explainer</h4>
                    <p className="text-sm text-neutral-700">Understand how UPI works with our interactive simulator</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">KYC Help</h4>
                    <p className="text-sm text-neutral-700">Step-by-step guidance for completing KYC processes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Calculator className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">EMI Calculator</h4>
                    <p className="text-sm text-neutral-700">Visual calculator to understand loan payments</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Scam Detector</h4>
                    <p className="text-sm text-neutral-700">Identify and avoid common financial scams</p>
                  </div>
                </div>
              </div>
              <p className="text-neutral-700 mb-6">
                Our Financial Navigator is designed to simplify complex financial concepts and empower you with the knowledge to make informed decisions.
              </p>
              <a 
                href="/financial-navigator.html" 
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
              >
                Explore Financial Navigator
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Astro-Finance Insights Hub</h3>
              <p className="text-neutral-700 mb-6">
                Where traditional astrological wisdom meets modern financial planning, offering a unique perspective on your financial journey
              </p>
              
              <div className="flex flex-col space-y-6 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-3xl mr-4">🌟</div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Where Astrology Meets Finance</h4>
                    <p className="text-sm text-neutral-700">
                      Explore our unique Astro-Finance Insights Hub, where traditional astrological wisdom meets modern financial planning. Discover how cosmic influences might align with your financial decisions and life path.
                    </p>
                    <p className="text-sm text-neutral-700 mt-2">
                      While we emphasize that financial decisions should always be based on sound financial principles, many in India also consider astrological insights as a complementary perspective.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Daily Finance Horoscopes</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Zodiac Compatibility</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Lucky Numbers</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Auspicious Timing</span>
                </div>
              </div>
              
              <a 
                href="/astro-finance-insights.html" 
                className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
              >
                Explore Astro-Finance Insights
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Calculators */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Most Popular Calculators
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Our most used financial tools that help thousands of Indians make better financial decisions every day
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/calculators/emi-calculator" 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">EMI Calculator</h3>
              <p className="text-neutral-700">Calculate your monthly loan payments</p>
            </Link>
            
            <Link 
              to="/calculators/sip-calculator" 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">SIP Calculator</h3>
              <p className="text-neutral-700">Plan your investment returns over time</p>
            </Link>
            
            <Link 
              to="/calculators/income-tax-calculator" 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Income Tax Calculator</h3>
              <p className="text-neutral-700">Estimate your income tax liability</p>
            </Link>
            
            <Link 
              to="/calculators/ppf-calculator" 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-neutral-200"
            >
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">PPF Calculator</h3>
              <p className="text-neutral-700">Project your PPF account growth</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Finance & Banking Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Finance & Banking Tools
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Essential tools for everyday banking needs, transaction troubleshooting, and financial information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Bank IFSC/MICR Finder</h3>
                <p className="text-neutral-700 mb-4">
                  Quickly find IFSC and MICR codes for any bank branch in India for seamless fund transfers and banking operations.
                </p>
                <Link 
                  to="/calculators/bank-ifsc-finder" 
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Find Bank Codes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">UPI Failure Troubleshooter</h3>
                <p className="text-neutral-700 mb-4">
                  Diagnose and resolve UPI transaction failures with step-by-step guidance and recover your stuck payments.
                </p>
                <Link 
                  to="/calculators/upi-failure-troubleshooter" 
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Troubleshoot UPI Issues
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">ATM Locator</h3>
                <p className="text-neutral-700 mb-4">
                  Find nearby ATMs with real-time status information on cash availability and operational conditions.
                </p>
                <Link 
                  to="/calculators/atm-locator" 
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Find ATMs Near You
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Bank Holiday Calendar</h3>
                <p className="text-neutral-700 mb-4">
                  Comprehensive calendar of bank holidays across all Indian states to help plan your banking activities.
                </p>
                <Link 
                  to="/calculators/bank-holiday-calendar" 
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  View Bank Holidays
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Best Interest Rates</h3>
                <p className="text-neutral-700 mb-4">
                  Compare current interest rates across banks for loans, deposits, and savings accounts to find the best deals.
                </p>
                <Link 
                  to="/calculators/interest-rates-comparison" 
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Compare Rates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Astro-Finance Insights</h3>
                <p className="text-neutral-700 mb-4">
                  Explore astrological perspectives on financial decisions, lucky numbers, and auspicious timing for investments.
                </p>
                <a 
                  href="/astro-finance-insights.html" 
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Explore Astro-Finance Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-neutral-700 mb-6">
              Our banking tools are designed to simplify your financial transactions and provide quick access to essential banking information.
            </p>
            <Link 
              to="/calculators/banking-knowledge" 
              className="btn btn-primary"
            >
              Explore all banking tools and resources
            </Link>
          </div>
        </div>
      </section>

      {/* Government Schemes */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Government Schemes for Indians
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Explore various government schemes designed to provide financial security and benefits to Indian citizens
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Investment & Savings</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Public Provident Fund (PPF)</h4>
                      <p className="text-neutral-700 text-sm mb-2">Long-term savings with tax benefits under Section 80C</p>
                      <Link 
                        to="/calculators/ppf-calculator" 
                        className="text-sm text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Calculate Returns
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Sukanya Samriddhi Yojana</h4>
                      <p className="text-neutral-700 text-sm mb-2">Savings scheme for girl child with high interest rates</p>
                      <Link 
                        to="/calculators/sukanya-samriddhi-calculator" 
                        className="text-sm text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Calculate Returns
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">National Pension System (NPS)</h4>
                      <p className="text-neutral-700 text-sm mb-2">Voluntary retirement savings scheme with tax benefits</p>
                      <Link 
                        to="/calculators/nps-calculator" 
                        className="text-sm text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Calculate Returns
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Kisan Vikas Patra (KVP)</h4>
                      <p className="text-neutral-700 text-sm mb-2">Investment scheme that doubles your money in about 10 years</p>
                      <Link 
                        to="/calculators/post-office-schemes-calculator" 
                        className="text-sm text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Calculate Returns
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Insurance & Social Security</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Pradhan Mantri Jeevan Jyoti Bima Yojana</h4>
                      <p className="text-neutral-700 text-sm mb-2">Life insurance coverage of ₹2 lakh at just ₹330 per year</p>
                      <Link 
                        to="/calculators/term-insurance-calculator" 
                        className="text-sm text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Compare with Term Insurance
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Pradhan Mantri Suraksha Bima Yojana</h4>
                      <p className="text-neutral-700 text-sm mb-2">Accidental death coverage of ₹2 lakh at just ₹12 per year</p>
                      <Link 
                        to="/calculators/human-life-value-calculator" 
                        className="text-sm text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Calculate Coverage Needs
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Atal Pension Yojana</h4>
                      <p className="text-neutral-700 text-sm mb-2">Guaranteed pension of ₹1,000 to ₹5,000 per month after 60</p>
                      <Link 
                        to="/calculators/pension-calculator" 
                        className="text-sm text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Calculate Pension
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-success-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">Ayushman Bharat</h4>
                      <p className="text-neutral-700 text-sm mb-2">Health insurance coverage up to ₹5 lakh per family per year</p>
                      <Link 
                        to="/calculators/health-insurance-calculator" 
                        className="text-sm text-primary-600 font-medium hover:text-primary-700 inline-flex items-center"
                      >
                        Calculate Health Insurance
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/blog/category/government-schemes" 
              className="btn btn-primary"
            >
              Read our detailed guides on government schemes
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white" id="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Find the perfect calculator for your financial needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {calculatorCategories.slice(0, 6).map(category => (
              <div key={category.id} id={category.id} className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{category.name}</h3>
                <p className="text-neutral-700 text-sm mb-4">{category.description}</p>
                <ul className="space-y-2 mb-4">
                  {category.calculators.slice(0, 3).map(calculator => (
                    <li key={calculator.id}>
                      <Link 
                        to={`/calculators/${calculator.id}`} 
                        className="text-neutral-800 hover:text-primary-600 transition-colors flex items-center"
                      >
                        <ArrowRight className="h-3 w-3 mr-2 text-primary-500" />
                        <span>{calculator.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={`/#${category.id}`} 
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  View all {category.calculators.length} calculators
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculatorCategories.slice(6).map(category => (
              <div key={category.id} id={category.id} className="bg-white rounded-xl shadow-md p-6 border border-neutral-200">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{category.name}</h3>
                <p className="text-neutral-700 text-sm mb-4">{category.description}</p>
                <ul className="space-y-2 mb-4">
                  {category.calculators.slice(0, 3).map(calculator => (
                    <li key={calculator.id}>
                      <Link 
                        to={`/calculators/${calculator.id}`} 
                        className="text-neutral-800 hover:text-primary-600 transition-colors flex items-center"
                      >
                        <ArrowRight className="h-3 w-3 mr-2 text-primary-500" />
                        <span>{calculator.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={`/#${category.id}`} 
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                >
                  View all {category.calculators.length} calculators
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Category Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Finance & Banking Tools
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Essential tools for everyday banking needs, transaction troubleshooting, and financial information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Bank IFSC/MICR Finder</h3>
                <p className="text-neutral-700 mb-4">
                  Quickly find IFSC and MICR codes for any bank branch in India for seamless fund transfers and banking operations
                </p>
                <Link 
                  to="/calculators/bank-ifsc-finder" 
                  className="btn btn-primary w-full"
                >
                  Use Calculator
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">UPI Failure Troubleshooter</h3>
                <p className="text-neutral-700 mb-4">
                  Diagnose and resolve UPI transaction failures with step-by-step guidance and recover your stuck payments
                </p>
                <Link 
                  to="/calculators/upi-failure-troubleshooter" 
                  className="btn btn-primary w-full"
                >
                  Use Calculator
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">ATM Locator</h3>
                <p className="text-neutral-700 mb-4">
                  Find nearby ATMs with real-time status information on cash availability and operational conditions
                </p>
                <Link 
                  to="/calculators/atm-locator" 
                  className="btn btn-primary w-full"
                >
                  Use Calculator
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Bank Holiday Calendar</h3>
                <p className="text-neutral-700 mb-4">
                  Comprehensive calendar of bank holidays across all Indian states to help plan your banking activities
                </p>
                <Link 
                  to="/calculators/bank-holiday-calendar" 
                  className="btn btn-primary w-full"
                >
                  Use Calculator
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Best Interest Rates</h3>
                <p className="text-neutral-700 mb-4">
                  Compare current interest rates across banks for loans, deposits, and savings accounts to find the best deals
                </p>
                <Link 
                  to="/calculators/interest-rates-comparison" 
                  className="btn btn-primary w-full"
                >
                  Use Calculator
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Astro-Finance Insights</h3>
                <p className="text-neutral-700 mb-4">
                  Explore astrological perspectives on financial decisions, lucky numbers, and auspicious timing for investments
                </p>
                <a 
                  href="/astro-finance-insights.html" 
                  className="btn btn-primary w-full"
                >
                  Explore Astro-Finance Tools
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to make informed financial decisions?</h2>
          <p className="text-xl mb-8 text-white/90">
            Our calculators help you plan loans, investments, taxes, and more with precision and ease.
          </p>
          <Link 
            to="/calculators/financial-goal-calculator" 
            className="btn bg-white text-primary-700 hover:bg-neutral-100 text-lg px-8 py-3"
          >
            Plan Your Financial Goals
          </Link>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
};

export default Home;