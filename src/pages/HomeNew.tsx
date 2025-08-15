import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, ArrowRight, TrendingUp, DollarSign, PieChart, Building, Shield, Search, Menu, X, Star, Users, Zap, Globe, Smartphone } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { SearchBar } from '../components/SearchBar';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const HomeNew: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

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
      default: return 'from-primary-500 to-primary-700';
    }
  };

  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet 
        title="Free Financial Calculators for India - EMI, SIP, Tax, Investment Tools"
        description="India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more."
        keywords="financial calculator india, EMI calculator, SIP calculator, income tax calculator"
        url="/"
        structuredData={{}}
        tags={["financial calculators", "EMI calculator", "SIP calculator", "income tax"]}
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
              <Link to="/blog" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100">Blog</Link>
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
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
              <Link to="/#categories" className="inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all">
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
              {[
                { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate your loan EMI, total interest, and payment schedule', category: 'Loan Calculators' },
                { id: 'sip-calculator', name: 'SIP Calculator', description: 'Plan your investments and calculate returns on SIP investments', category: 'Investment Calculators' },
                { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'Calculate your income tax liability under old and new tax regimes', category: 'Tax Calculators' }
              ].map((calculator, index) => (
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
      </div>
    </>
  );
};

export default HomeNew;
