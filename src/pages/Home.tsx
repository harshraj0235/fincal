import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, ArrowRight, TrendingUp, DollarSign, PieChart, Building, Shield, Menu, X, Star, Globe, Smartphone, Sparkles, Heart, Car, Target, Plane, Calendar, ShoppingBag, Wallet, Church, PartyPopper, Palette, BookOpen, Briefcase, Languages, LineChart } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { SearchBar } from '../components/SearchBar';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';
import FinanceNewsSection from '../components/FinanceNewsSection';

export const Home: React.FC = () => {
  const [popularCalculators, setPopularCalculators] = useState<Array<{id: string; name: string; description: string; category: string}>>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const allCalculatorsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
  
  // Intersection Observer for smooth scrolling navigation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  
  // Scroll to categories section if hash is present
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.substring(1);
      if (hash === 'categories' && allCalculatorsRef.current) {
        allCalculatorsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location.hash]);

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return <Building className="h-6 w-6 text-white" />;
      case 'investment-calculators': return <TrendingUp className="h-6 w-6 text-white" />;
      case 'tax-calculators': return <DollarSign className="h-6 w-6 text-white" />;
      default: return <Calculator className="h-6 w-6 text-white" />;
    }
  };
  
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet 
        title="Free Financial Calculators for India - EMI, SIP, Tax, Investment Tools"
        description="India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users."
        keywords="financial calculator india, EMI calculator, SIP calculator, income tax calculator, mutual fund calculator, loan calculator, investment calculator, personal finance tools, financial planning india, free financial calculator"
        url="/"
        structuredData={{}}
        tags={["financial calculators", "EMI calculator", "SIP calculator", "income tax", "mutual funds", "personal finance", "investment planning"]}
      />
      
      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-white h-full w-80 max-w-[80vw] p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="space-y-4">
              <button onClick={() => scrollToSection('hero')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">Home</button>
              <button onClick={() => scrollToSection('popular')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">Popular Tools</button>
              <button onClick={() => scrollToSection('categories')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">All Categories</button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">Features</button>
              <Link to="/blog" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">Blog</Link>
              <Link to="/government-schemes" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">Government Schemes</Link>
            </nav>
          </div>
        </div>
      )}
      
    <div className="min-h-screen">
        {/* Floating Navigation Bar */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 px-4 py-2 hidden lg:flex items-center space-x-1">
          <button onClick={() => scrollToSection('hero')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'hero' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>Home</button>
          <button onClick={() => scrollToSection('popular')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'popular' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>Popular</button>
          <button onClick={() => scrollToSection('categories')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'categories' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>Categories</button>
          <button onClick={() => scrollToSection('features')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'features' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}>Features</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 right-4 z-40 lg:hidden bg-white/90 backdrop-blur-md rounded-full p-3 shadow-lg border border-gray-200"
        >
          <Menu className="h-6 w-6" />
        </button>
      
      {/* Hero Section */}
        <section id="hero" className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
              </div>
                </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                  <Star className="h-4 w-4 mr-2" />
                  Trusted by 1M+ Users
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                  Smart Financial
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Decisions</span>
                  Start Here
              </h1>
                <p className="text-xl sm:text-2xl mb-8 text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  India's most comprehensive financial calculator platform. Plan loans, investments, taxes, and more with confidence.
              </p>
                
                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link 
                  to="/calculators/emi-calculator" 
                    className="group bg-white text-primary-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center"
                >
                    <Calculator className="h-5 w-5 mr-2" />
                  EMI Calculator
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/calculators/income-tax-calculator" 
                    className="group bg-green-500 text-white hover:bg-green-600 shadow-xl hover:shadow-2xl transition-all px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center"
                >
                    <DollarSign className="h-5 w-5 mr-2" />
                  Income Tax
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-white/80 text-sm">Calculators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">1M+</div>
                    <div className="text-white/80 text-sm">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-white/80 text-sm">Free</div>
                  </div>
              </div>
            </div>
              
              {/* Interactive Calculator Preview */}
            <div className="hidden lg:block">
              <div className="relative">
                  <div className="absolute -top-8 -left-8 w-32 h-32 bg-yellow-400/20 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="transform -rotate-2">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">EMI Calculator</h3>
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Loan Amount</label>
                          <div className="text-2xl font-bold text-gray-900">₹25,00,000</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Interest Rate</label>
                          <div className="text-2xl font-bold text-gray-900">8.5%</div>
          </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Loan Tenure</label>
                          <div className="text-2xl font-bold text-gray-900">20 Years</div>
                    </div>
                        <div className="pt-4 border-t border-gray-200">
                          <label className="text-sm font-medium text-gray-600">Monthly EMI</label>
                          <div className="text-3xl font-bold text-primary-600">₹21,761</div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Smart Search Section */}
        <section className="py-16 bg-white relative z-20 -mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
          <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Find Your Perfect Calculator</h2>
                <p className="text-gray-600 text-lg">Search from our collection of 50+ financial calculators</p>
          </div>
              <div className="relative">
            <SearchBar />
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-gray-500">Popular:</span>
                  {['EMI', 'SIP', 'Income Tax', 'Mutual Fund'].map((term) => (
                    <button key={term} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Quick Access Categories */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Access Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the financial tools you need, organized by category
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {calculatorCategories.slice(0, 6).map(category => (
              <Link 
                key={category.id}
                to={`/#${category.id}`} 
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-center transform hover:-translate-y-2 duration-300"
              >
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {getCategoryIcon(category.id)}
                </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-sm">{category.name.split(' ')[0]}</h3>
                  <p className="text-xs text-gray-500 mt-1">{category.calculators.length} tools</p>
              </Link>
            ))}
          </div>
          
            <div className="text-center mt-12">
              <Link to="/calculators" className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all">
              View All Categories
                <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
        <section id="popular" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Popular Calculators</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most frequently used calculators to help you make informed financial decisions
            </p>
          </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularCalculators.map((calculator, index) => (
              <Link
                key={calculator.id}
                to={`/calculators/${calculator.id}`}
                  className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-primary-200 transform hover:-translate-y-2 duration-300"
                >
                  <div className="flex items-start mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Calculator className="h-7 w-7 text-white" />
                  </div>
                  <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {calculator.name}
                    </h3>
                      <p className="text-sm text-gray-500">{calculator.category}</p>
                  </div>
                </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{calculator.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary-600 group-hover:text-primary-700 font-semibold flex items-center">
                    Try Calculator
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                    <div className="text-2xl font-bold text-gray-300">#{index + 1}</div>
                </div>
              </Link>
            ))}
          </div>
          
            <div className="text-center mt-16">
              <Link to="/calculators" className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all">
              View All Calculators
                <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Festival Tools Categories */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Festival Planning Made Easy
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Festival Tools & Calculators</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrate every occasion with our comprehensive festival planning tools. Budget, plan, and enjoy worry-free celebrations!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Festival Date & Calendar Tools */}
            <Link
              to="/festival-dates"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Festival Dates & Calendar</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Plan ahead with muhurat, dates & reminders</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Festival Planning & Shopping */}
            <Link
              to="/festival-shopping"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <ShoppingBag className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Planning & Shopping</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Budget planners & shopping checklists</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Festival Finance & Money */}
            <Link
              to="/festival-finance"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Finance & Money</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">EMI, savings & financial planning</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Religious & Traditional */}
            <Link
              to="/religious-tools"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Church className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Religious & Traditional</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Puja samagri, rituals & traditions</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Fun & Engagement */}
            <Link
              to="/fun-engagement"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <PartyPopper className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Fun & Engagement</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Games, quizzes & entertainment</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Design & Creator */}
            <Link
              to="/design-tools"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Design & Creator</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Cards, wishes & creative tools</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Information & History */}
            <Link
              to="/festival-info"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Information & History</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Stories, origins & cultural insights</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Corporate & Professional */}
            <Link
              to="/festival-corporate-tools"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500 to-gray-700 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Corporate & Professional</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Office celebrations & bonuses</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Regional & Language */}
            <Link
              to="/festival-tools/regional-language"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Languages className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Regional & Language</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Multilingual wishes & content</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* SEO & Monetization */}
            <Link
              to="/festival-tools/seo-monetization"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 bg-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <LineChart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">SEO & Monetization</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-auto">Traffic, analytics & growth tools</p>
                <div className="mt-4 flex items-center text-white text-sm font-semibold">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/festival-tools" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-2xl font-semibold hover:from-orange-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
            >
              Explore All Festival Tools
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Calculators?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed specifically for the Indian financial context, our calculators offer precision, ease of use, and comprehensive insights
            </p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-primary-200 transition-all transform hover:-translate-y-2 duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-6 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Indian Context</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tailored for Indian tax laws, investment options, and financial products
                </p>
            </div>
            
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-primary-200 transition-all transform hover:-translate-y-2 duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mb-6 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Accurate Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  Precise calculations based on the latest financial formulas and regulations
                </p>
            </div>
            
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-primary-200 transition-all transform hover:-translate-y-2 duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6 shadow-lg">
                  <PieChart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visual Insights</h3>
                <p className="text-gray-600 leading-relaxed">
                  Interactive charts and visual breakdowns to understand your finances better
              </p>
            </div>
            
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-primary-200 transition-all transform hover:-translate-y-2 duration-300">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 shadow-lg">
                  <Smartphone className="h-8 w-8 text-white" />
                  </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mobile Friendly</h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimized for all devices - use on mobile, tablet, or desktop seamlessly
                </p>
              </div>
            </div>
          </div>
        </section>
      
      {/* All Categories Grid */}
        <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore All Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect calculator for your financial needs
            </p>
          </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculatorCategories.map(category => (
            <Link
                key={category.id}
                to={`/#${category.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category.id)} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="mb-auto">
                      <div className="h-16 w-16 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center mb-6 shadow-lg">
                      {getCategoryIcon(category.id)}
                    </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{category.name}</h3>
                      <p className="text-white text-opacity-90 leading-relaxed">{category.description}</p>
                  </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-white text-sm font-medium">{category.calculators.length} calculators</span>
                      <span className="text-white flex items-center text-sm font-semibold">
                      Explore
                        <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
            </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Calculators Section */}
        <div id="all-calculators" ref={allCalculatorsRef} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">All Calculators</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our comprehensive collection of financial calculators organized by category
            </p>
          </div>
          
          <div className="space-y-12">
            {calculatorCategories.map(category => (
                <div key={category.id} id={category.id} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center mb-8">
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mr-4 shadow-lg`}>
                    {getCategoryIcon(category.id)}
                  </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.calculators.map(calculator => (
                    <Link 
                      key={calculator.id}
                      to={`/calculators/${calculator.id}`}
                        className="p-6 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all group"
                    >
                        <div className="flex items-center">
                          <Calculator className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0" />
                      <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{calculator.name}</h4>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{calculator.description}</p>
                          </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insurance Tools Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Insurance Planning Tools
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Insurance Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protect your family and assets with our advanced insurance planning tools. Calculate coverage needs, compare premiums, and make informed decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Life Insurance Calculator",
                description: "Calculate the right amount of life insurance coverage based on your income, dependents, and financial goals using the Human Life Value method.",
                icon: Shield,
                color: "from-blue-500 to-blue-600",
                link: "/insurance-tools/life-insurance-calculator",
                features: ["HLV Method", "Income Analysis", "Dependent Coverage", "Tax Benefits"]
              },
              {
                title: "Health Insurance Estimator",
                description: "Compare health insurance premiums across top providers and find the best family health insurance plans with comprehensive coverage.",
                icon: Heart,
                color: "from-red-500 to-red-600",
                link: "/insurance-tools/health-insurance-estimator",
                features: ["Provider Comparison", "Family Coverage", "Pre-existing Conditions", "Section 80D Benefits"]
              },
              {
                title: "Car Insurance Calculator",
                description: "Calculate comprehensive car insurance premiums based on vehicle details, location, and coverage options for optimal protection.",
                icon: Car,
                color: "from-green-500 to-green-600",
                link: "/insurance-tools/car-insurance-calculator",
                features: ["IDV Calculation", "Premium Estimation", "Add-on Coverage", "NCB Benefits"]
              },
              {
                title: "Term Insurance Planner",
                description: "Plan your term insurance coverage with detailed analysis of premium payments, coverage duration, and beneficiary planning.",
                icon: Target,
                color: "from-purple-500 to-purple-600",
                link: "/insurance-tools/term-insurance-planner",
                features: ["Coverage Planning", "Premium Analysis", "Beneficiary Setup", "Tax Benefits"]
              },
              {
                title: "Travel Insurance Selector",
                description: "Find the perfect travel insurance plan for domestic and international trips with comprehensive coverage options.",
                icon: Plane,
                color: "from-orange-500 to-orange-600",
                link: "/insurance-tools/travel-insurance-selector",
                features: ["Trip Coverage", "Medical Emergency", "Baggage Protection", "Trip Cancellation"]
              },
              {
                title: "Insurance Portfolio Dashboard",
                description: "Visualize and manage all your insurance policies in one place. Track premiums, coverage, and renewal dates.",
                icon: PieChart,
                color: "from-teal-500 to-teal-600",
                link: "/insurance-tools/portfolio-dashboard",
                features: ["Policy Visualization", "Premium Tracking", "Renewal Alerts", "Coverage Analysis"]
              }
            ].map((tool) => (
              <Link
                key={tool.title}
                to={tool.link}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mr-4 shadow-lg`}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium">
                    Try Tool
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/insurance-tools" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
            >
              Explore All Insurance Tools
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Astro Finance Blog Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Vedic Astrology & Finance
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Astro Finance Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Vedic astrology can guide your financial decisions and wealth creation strategies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "राशि के अनुसार धन कमाने के तरीके",
                excerpt: "अपनी राशि के अनुसार सही व्यवसाय चुनें और धन कमाने के लिए ज्योतिषीय मार्गदर्शन प्राप्त करें।",
                slug: "rashike-anusar-dhan-kamane-ke-tariqe",
                image: "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/67b7102abc3091001dddd452.png",
                category: "ज्योतिष",
                readingTime: "8 min read"
              },
              {
                title: "ज्योतिष में ग्रहों का वित्तीय जीवन पर प्रभाव",
                excerpt: "ग्रहों की स्थिति और उनका आपके वित्तीय जीवन पर क्या प्रभाव पड़ता है, जानें विस्तार से।",
                slug: "grahon-ka-vittiya-jeevan-par-prabhav",
                image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                category: "ग्रह विज्ञान",
                readingTime: "6 min read"
              },
              {
                title: "कुंडली में धन योग: कैसे पहचानें",
                excerpt: "अपनी कुंडली में धन योग को कैसे पहचानें और उसका लाभ कैसे उठाएं।",
                slug: "kundli-mein-dhan-yog",
                image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                category: "कुंडली विश्लेषण",
                readingTime: "10 min read"
              }
            ].map((blog) => (
              <Link
                key={blog.slug}
                to={`/astro-finance/blog/${blog.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{blog.readingTime}</span>
                    <span className="text-purple-600 group-hover:text-purple-700 font-medium text-sm flex items-center">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/astro-finance" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
            >
              Explore All Astro Finance Articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Finance News Section */}
      <FinanceNewsSection />

      {/* CTA Section */}
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-12 md:p-16">
                  <h2 className="text-4xl font-bold mb-6 text-white">Stay Updated with Financial Insights</h2>
                  <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  Subscribe to our newsletter for the latest updates on financial tools, tax changes, investment strategies, and more.
                </p>
                  <form className="space-y-6">
                  <div>
                    <input
                      type="email"
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 rounded-2xl text-lg border-0 focus:ring-2 focus:ring-white/20"
                      required
                    />
                  </div>
                    <button type="submit" className="w-full bg-white text-primary-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all px-8 py-4 text-lg font-semibold rounded-2xl">
                      Subscribe Now
                  </button>
                </form>
                  <p className="text-sm text-white/80 mt-6">
                    By subscribing, you agree to our Privacy Policy and consent to receive financial updates.
                </p>
              </div>
              <div className="hidden md:block relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img 
                    src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Financial planning" 
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Home;
