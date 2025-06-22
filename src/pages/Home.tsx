import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, ArrowRight, TrendingUp, DollarSign, PieChart, 
  Building, Shield, ChevronRight
} from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { CategorySection } from '../components/CategorySection';
import { SearchBar } from '../components/SearchBar';
import { governmentSchemes } from '../data/governmentSchemesData';

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
      { id: 'credit-card-finder', name: 'Credit Card Finder', description: 'Find the best credit card based on your spending patterns', category: 'Banking & Finance Tools' }
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

  // Get category icon based on category ID
  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return <Building className="h-6 w-6 text-white" />;
      case 'investment-calculators': return <TrendingUp className="h-6 w-6 text-white" />;
      case 'tax-calculators': return <DollarSign className="h-6 w-6 text-white" />;
      default: return <Calculator className="h-6 w-6 text-white" />;
    }
  };
  
  // Get category color based on category ID
  const getCategoryColor = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return 'from-blue-500 to-blue-700';
      case 'investment-calculators': return 'from-green-500 to-green-700';
      case 'tax-calculators': return 'from-purple-500 to-purple-700';
      case 'retirement-calculators': return 'from-orange-500 to-orange-700';
      case 'business-calculators': return 'from-indigo-500 to-indigo-700';
      case 'property-calculators': return 'from-red-500 to-red-700';
      case 'insurance-calculators': return 'from-pink-500 to-pink-700';
      case 'banking-calculators': return 'from-cyan-500 to-cyan-700';
      case 'fintech-payments': return 'from-amber-500 to-amber-700';
      case 'investments-wealth-management': return 'from-emerald-500 to-emerald-700';
      case 'personal-finance': return 'from-teal-500 to-teal-700';
      default: return 'from-primary-500 to-primary-700';
    }
  };
  
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-20 md:py-28 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="0.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-black">
                Smart Financial Decisions Start Here
              </h1>
              <p className="text-xl mb-8 text-black">
                Comprehensive financial calculators tailored for Indian users. Plan loans, investments, taxes, and more with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/calculators/emi-calculator" className="btn bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all">
                  EMI Calculator
                </Link>
                <Link to="/calculators/income-tax-calculator" className="btn bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all">
                  Income Tax
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="bg-white p-8 rounded-2xl shadow-2xl transform rotate-3 z-10 backdrop-blur-sm bg-opacity-95">
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
      <section className="py-12 bg-white relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">Find the Right Calculator</h2>
            <p className="text-neutral-600">Search from our collection of 50+ financial calculators</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-neutral-100">
            <SearchBar />
          </div>
        </div>
      </section>
      
      {/* Quick Access Categories */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Quick Access Categories</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Find the financial tools you need, organized by category
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {calculatorCategories.slice(0, 6).map(category => (
              <Link 
                key={category.id}
                to={`/#${category.id}`} 
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center group"
              >
                <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {getCategoryIcon(category.id)}
                </div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{category.name.split(' ')[0]}</h3>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/#categories" className="text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center">
              View All Categories
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Popular Calculators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Most Popular Calculators</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our most frequently used calculators to help you make informed financial decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalculators.map(calculator => (
              <Link 
                key={calculator.id}
                to={`/calculators/${calculator.id}`}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group border border-neutral-100 hover:border-primary-200"
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
            <Link to="/#categories" className="btn bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all">
              View All Calculators
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Tools Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Featured Financial Tools</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Specialized tools designed to solve complex financial challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all border border-neutral-100">
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
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Mutual Fund Overlap Checker
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/asset-allocation-planner" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Asset Allocation Planner
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/risk-appetite-assessment" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 mr-1" />
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
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all border border-neutral-100">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="h-20 w-20 text-white opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-green-900 to-transparent">
                  <h3 className="text-xl font-semibold text-white">Banking Tools</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">
                  Essential banking tools to help you navigate financial services, find ATMs, and troubleshoot common issues.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>
                    <Link to="/calculators/bank-ifsc-finder" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Bank IFSC Finder
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/upi-failure-troubleshooter" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      UPI Failure Troubleshooter
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/bank-holiday-calendar" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 mr-1" />
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
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all border border-neutral-100">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <DollarSign className="h-20 w-20 text-white opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900 to-transparent">
                  <h3 className="text-xl font-semibold text-white">Tax Tools</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">
                  Comprehensive tax calculators to help you plan your taxes, maximize deductions, and stay compliant.
                </p>
                <ul className="space-y-2 mb-4">
                  <li>
                    <Link to="/calculators/income-tax-calculator" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Income Tax Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/income-tax-regime-comparison-calculator" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      Tax Regime Comparison
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/gst-calculator" className="text-primary-600 hover:text-primary-700 flex items-center text-sm">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      GST Calculator
                    </Link>
                  </li>
                </ul>
                <Link to="/#tax-calculators" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  Explore All Tax Tools
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Excel Tools & Government Schemes Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Excel Tools & Government Schemes</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Professional Excel templates and comprehensive government scheme information
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Excel Tools Card */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all border border-neutral-100">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calculator className="h-20 w-20 text-white opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-orange-900 to-transparent">
                  <h3 className="text-xl font-semibold text-white">Excel Tools & Templates</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">
                  Professional Excel templates for personal finance, budgeting, investment tracking, and financial analysis. Download ready-to-use templates.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm text-neutral-600">• Monthly Budget Templates</li>
                  <li className="text-sm text-neutral-600">• Investment Tracking Sheets</li>
                  <li className="text-sm text-neutral-600">• Tax Planning Tools</li>
                  <li className="text-sm text-neutral-600">• Business Financial Models</li>
                </ul>
                <Link to="/exceltool" className="btn bg-orange-600 text-white hover:bg-orange-700 shadow-md hover:shadow-lg transition-all w-full text-center">
                  Explore Excel Tools
                </Link>
              </div>
            </div>
            
            {/* Government Schemes Card */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all border border-neutral-100">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-20 w-20 text-white opacity-20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-green-900 to-transparent">
                  <h3 className="text-xl font-semibold text-white">Government Schemes</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-4">
                  Complete information on 100+ government schemes - eligibility, benefits, application process, and latest updates in Hindi and English.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm text-neutral-600">• 100+ Government Schemes</li>
                  <li className="text-sm text-neutral-600">• Detailed Application Guides</li>
                  <li className="text-sm text-neutral-600">• Eligibility & Benefits</li>
                  <li className="text-sm text-neutral-600">• Latest Updates & News</li>
                </ul>
                <Link to="/government-schemes" className="btn bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg transition-all w-full text-center" onClick={() => console.log('View All Schemes clicked')}>
                  View All Schemes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Government Schemes Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">भारत सरकार की योजनाएं</h2>
            <p className="text-lg text-green-700 max-w-3xl mx-auto">
              सभी सरकारी योजनाओं की पूरी जानकारी - आवेदन से लेकर लाभ तक, हिंदी में।
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {governmentSchemes.slice(0, 6).map(scheme => (
              <Link
                key={scheme.id}
                to={`/government-schemes/${scheme.slug}`}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-green-100 group overflow-hidden transition-all"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={scheme.coverImage}
                    alt={scheme.titleHindi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-green-600 text-white shadow">
                    {scheme.categoryHindi}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                    {scheme.titleHindi}
                  </h3>
                  <p className="text-green-800 text-sm mb-4 line-clamp-3">{scheme.excerptHindi}</p>
                  <div className="flex items-center gap-2 text-xs text-green-600 mb-2">
                    <span>लाभार्थी: {scheme.beneficiaries || 'लाखों'}</span>
                    <span>•</span>
                    <span>{scheme.status === 'active' ? 'सक्रिय' : scheme.status === 'upcoming' ? 'आगामी' : 'पुरानी'}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-green-700">{scheme.benefits.length} लाभ</span>
                    <span className="text-green-600 font-medium flex items-center">विवरण <ArrowRight className="h-4 w-4 ml-1" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/government-schemes" className="btn bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg transition-all">
              सभी योजनाएं देखें
            </Link>
          </div>
        </div>
      </section>
      
      {/* All Categories Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Explore All Categories</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Find the perfect calculator for your financial needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculatorCategories.map(category => (
              <Link 
                key={category.id}
                to={`/#${category.id}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category.id)} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className="mb-auto">
                    <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-4">
                      {getCategoryIcon(category.id)}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white text-opacity-90 text-sm mb-4">{category.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm">{category.calculators.length} calculators</span>
                    <span className="text-white flex items-center text-sm font-medium">
                      Explore
                      <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
              <div key={category.id} id={category.id} className="bg-white rounded-xl p-8 shadow-lg border border-neutral-100">
                <div className="flex items-center mb-6">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mr-3`}>
                    {getCategoryIcon(category.id)}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">{category.name}</h3>
                </div>
                <p className="text-neutral-600 mb-6 max-w-3xl">{category.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.calculators.map(calculator => (
                    <Link 
                      key={calculator.id}
                      to={`/calculators/${calculator.id}`}
                      className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors flex items-center"
                    >
                      <Calculator className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-neutral-900 hover:text-primary-600 transition-colors">{calculator.name}</h4>
                        <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{calculator.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
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
            <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-100 hover:shadow-xl transition-all">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <Calculator className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Indian Context</h3>
              <p className="text-neutral-600">
                Tailored for Indian tax laws, investment options, and financial products
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-100 hover:shadow-xl transition-all">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Accurate Results</h3>
              <p className="text-neutral-600">
                Precise calculations based on the latest financial formulas and regulations
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-100 hover:shadow-xl transition-all">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <PieChart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Visual Insights</h3>
              <p className="text-neutral-600">
                Interactive charts and visual breakdowns to understand your finances better
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-neutral-100 hover:shadow-xl transition-all">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Privacy Focused</h3>
              <p className="text-neutral-600">
                All calculations happen in your browser with no data stored on our servers
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
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-neutral-100 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7063778/pexels-photo-7063778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sukanya Samriddhi Yojana" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-primary-600 font-medium mb-2">Government Schemes</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  <Link to="/blog/sukanya-samriddhi-yojana-guide">
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
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-neutral-100 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="National Pension System" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-primary-600 font-medium mb-2">Retirement Planning</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  <Link to="/blog/national-pension-system-guide">
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
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-neutral-100 group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Tax Saving Options" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                />
              </div>
              <div className="p-6">
                <div className="text-xs text-primary-600 font-medium mb-2">Tax Planning</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  <Link to="/blog/tax-saving-investment-options">
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
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/blog" className="btn bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4 text-black">Stay Updated with Financial Insights</h2>
                <p className="text-lg mb-6 text-black">
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
                  <button type="submit" className="btn bg-white text-primary-700 hover:bg-primary-50 shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-black mt-4">
                  By subscribing, you agree to our <Link to="/privacy-policy" className="underline text-white">Privacy Policy</Link> and consent to receive financial updates and marketing communications from us.
                </p>
              </div>
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <img 
                  src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Financial planning" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section ref={categoriesRef} id="categories-section" className="py-16 bg-neutral-50">
        <CategorySection />
      </section>
    </div>
  );
};

export default Home;
