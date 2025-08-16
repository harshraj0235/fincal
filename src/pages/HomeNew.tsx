import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Building, 
  Shield, 
  Search, 
  Menu, 
  X, 
  Users, 
  Globe, 
  Smartphone,
  Clock,
  BarChart3,
  Newspaper
} from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { allBlogPosts } from '../data/allBlogData';
import SEOHelmet from '../components/SEOHelmet';


export const HomeNew: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    type: string;
    id: string;
    name: string;
    description: string;
    category: string;
    url: string;
  }>>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

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

  // Search functionality
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      const results: Array<{
        type: string;
        id: string;
        name: string;
        description: string;
        category: string;
        url: string;
      }> = [];
      
      // Search in calculator categories
      calculatorCategories.forEach(category => {
        category.calculators.forEach(calculator => {
          if (calculator.name.toLowerCase().includes(term.toLowerCase()) ||
              calculator.description.toLowerCase().includes(term.toLowerCase())) {
            results.push({
              type: 'calculator',
              id: calculator.id,
              name: calculator.name,
              description: calculator.description,
              category: category.name,
              url: `/calculators/${calculator.id}`
            });
          }
        });
      });

      // Search in blog posts
      allBlogPosts.forEach(blog => {
        if (blog.title.toLowerCase().includes(term.toLowerCase()) ||
            (blog.excerpt || '').toLowerCase().includes(term.toLowerCase())) {
          results.push({
            type: 'blog',
            id: String(blog.id),
            name: blog.title,
            description: blog.excerpt || blog.title,
            category: 'Blog',
            url: `/blog/${blog.slug}`
          });
        }
      });

      setSearchResults(results.slice(0, 10));
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleSearchSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  const handleSearchResultClick = (result: {
    type: string;
    id: string;
    name: string;
    description: string;
    category: string;
    url: string;
  }) => {
    navigate(result.url);
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const getCategoryIcon = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return <Building className="h-6 w-6 text-white" />;
      case 'investment-calculators': return <TrendingUp className="h-6 w-6 text-white" />;
      case 'tax-calculators': return <DollarSign className="h-6 w-6 text-white" />;
      case 'retirement-calculators': return <Shield className="h-6 w-6 text-white" />;
      case 'business-calculators': return <BarChart3 className="h-6 w-6 text-white" />;
      case 'property-calculators': return <Building className="h-6 w-6 text-white" />;
      case 'insurance-calculators': return <Shield className="h-6 w-6 text-white" />;
      case 'banking-calculators': return <Building className="h-6 w-6 text-white" />;
      default: return <Calculator className="h-6 w-6 text-white" />;
    }
  };
  
  const getCategoryColor = (categoryId: string) => {
    switch(categoryId) {
      case 'loan-calculators': return 'from-blue-600 to-blue-700';
      case 'investment-calculators': return 'from-green-600 to-green-700';
      case 'tax-calculators': return 'from-purple-600 to-purple-700';
      case 'retirement-calculators': return 'from-orange-600 to-orange-700';
      case 'business-calculators': return 'from-indigo-600 to-indigo-700';
      case 'property-calculators': return 'from-red-600 to-red-700';
      case 'insurance-calculators': return 'from-pink-600 to-pink-700';
      case 'banking-calculators': return 'from-cyan-600 to-cyan-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  // Get featured blog posts
  const featuredBlogs = allBlogPosts.slice(0, 6);

  // Quick search suggestions
  const searchSuggestions = ['EMI', 'SIP', 'Income Tax', 'Mutual Fund', 'PPF', 'FD', 'GST', 'TDS'];

  return (
    <>
      <SEOHelmet 
        title="Free Financial Calculators for India - EMI, SIP, Tax, Investment Tools"
        description="India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more."
        keywords="financial calculator india, EMI calculator, SIP calculator, income tax calculator"
        url="/"
        structuredData={{}}
        tags={["financial calculators", "EMI calculator", "SIP calculator", "income tax"]}
      />
      
      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="bg-white h-full w-80 max-w-[80vw] p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-4">
                <button onClick={() => scrollToSection('hero')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Home</button>
                <button onClick={() => scrollToSection('popular')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Popular Tools</button>
                <button onClick={() => scrollToSection('categories')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">All Categories</button>
                <button onClick={() => scrollToSection('blog')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Blog</button>
                <button onClick={() => scrollToSection('news')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">News</button>
                <button onClick={() => scrollToSection('features')} className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Features</button>
                <Link to="/tools" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900 font-semibold text-blue-600">🛠️ All Tools Hub</Link>
                <Link to="/tax-tools" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">💰 Tax Tools</Link>
                <Link to="/finance-tools" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">📈 Finance Tools</Link>
                <Link to="/blog" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">View All Blog Posts</Link>
                <Link to="/government-schemes" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Government Schemes</Link>
                <Link to="/exceltool" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Excel Tools</Link>
                <Link to="/crypto" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Crypto</Link>
                <Link to="/astro-finance" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Astro Finance</Link>
                <Link to="/stock-market" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Stock Market</Link>
                <Link to="/contact-us" className="block w-full text-left p-3 rounded-lg hover:bg-gray-100 text-gray-900">Contact Us</Link>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white">
        {/* Floating Navigation Bar */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200 px-4 py-2 hidden lg:flex items-center space-x-1">
          <button onClick={() => scrollToSection('hero')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'hero' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}`}>Home</button>
          <button onClick={() => scrollToSection('popular')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'popular' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}`}>Popular</button>
          <button onClick={() => scrollToSection('categories')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'categories' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}`}>Categories</button>
          <button onClick={() => scrollToSection('blog')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'blog' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}`}>Blog</button>
          <button onClick={() => scrollToSection('news')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSection === 'news' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}`}>News</button>
          <Link to="/tools" className="px-4 py-2 rounded-full text-sm font-medium text-blue-600 hover:text-blue-700 transition-all font-semibold">🛠️ Tools</Link>
          <Link to="/tax-tools" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all">💰 Tax</Link>
          <Link to="/finance-tools" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all">📈 Finance</Link>
          <Link to="/government-schemes" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all">Schemes</Link>
          <Link to="/exceltool" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all">Excel</Link>
          <Link to="/crypto" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all">Crypto</Link>
          <Link to="/astro-finance" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all">Astro</Link>
          <Link to="/stock-market" className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-all">Stock</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 right-4 z-40 lg:hidden bg-white/95 backdrop-blur-md rounded-full p-3 shadow-lg border border-gray-200"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
        
        {/* Hero Section */}
        <section id="hero" className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full blur-3xl animate-pulse opacity-30"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900"
                >
                  Smart Financial
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Decisions</span>
                  Start Here
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl sm:text-2xl mb-8 text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                >
                  India's most comprehensive financial calculator platform. Plan loans, investments, taxes, and more with confidence.
                </motion.p>
                
                {/* Quick Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                >
                  <Link 
                    to="/calculators/emi-calculator" 
                    className="group bg-blue-600 text-white hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center"
                  >
                    <Calculator className="h-5 w-5 mr-2" />
                    EMI Calculator
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/calculators/income-tax-calculator" 
                    className="group bg-green-600 text-white hover:bg-green-700 shadow-xl hover:shadow-2xl transition-all px-8 py-4 text-lg font-semibold rounded-2xl flex items-center justify-center"
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Income Tax
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">50+</div>
                    <div className="text-gray-600 text-sm">Calculators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-gray-600 text-sm">Free</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-gray-600 text-sm">Available</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Interactive Calculator Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-200 rounded-full animate-pulse opacity-50"></div>
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-indigo-200 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
                  <div className="bg-white p-8 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-gray-100">
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
                          <div className="text-3xl font-bold text-blue-600">₹21,761</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Smart Search Section */}
        <section className="py-16 bg-white relative z-20 -mt-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100 relative"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Find Your Perfect Calculator</h2>
                <p className="text-gray-600 text-lg">Search from our collection of 50+ financial calculators</p>
              </div>
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for calculators..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                
                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto"
                    >
                      {searchResults.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-start space-x-3"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            result.type === 'calculator' ? 'bg-blue-100' : 'bg-green-100'
                          }`}>
                            {result.type === 'calculator' ? (
                              <Calculator className="w-4 h-4 text-blue-600" />
                            ) : (
                              <Newspaper className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{result.name}</div>
                            <div className="text-sm text-gray-500">{result.description}</div>
                            <div className="text-xs text-gray-400 mt-1">{result.category}</div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <span className="text-sm text-gray-500">Popular:</span>
                  {searchSuggestions.map((term) => (
                    <button 
                      key={term} 
                      onClick={() => handleSearchSuggestion(term)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Access Categories */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Access Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find the financial tools you need, organized by category
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {calculatorCategories.slice(0, 6).map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/category/${category.id}`}
                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-center transform hover:-translate-y-2 duration-300 block"
                  >
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      {getCategoryIcon(category.id)}
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">{category.name.split(' ')[0]}</h3>
                    <p className="text-xs text-gray-500 mt-1">{category.calculators.length} tools</p>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link to="/calculators" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
                View All Categories
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Top Tools Section */}
        <section id="tools" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Financial Tools</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive collection of financial tools and calculators
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  name: 'Financial Calculators', 
                  description: 'EMI, SIP, Tax, and more calculators',
                  icon: Calculator,
                  color: 'from-blue-500 to-blue-600',
                  path: '/calculators'
                },
                { 
                  name: 'Tax Tools Hub', 
                  description: 'Advanced tax planning and calculation tools',
                  icon: DollarSign,
                  color: 'from-green-500 to-green-600',
                  path: '/tax-tools'
                },
                { 
                  name: 'Stock Market Tools', 
                  description: 'Stock analysis, screening, and learning tools',
                  icon: TrendingUp,
                  color: 'from-purple-500 to-purple-600',
                  path: '/stock-market'
                },
                { 
                  name: 'Astro Finance', 
                  description: 'Vedic astrology-based financial guidance',
                  icon: BarChart3,
                  color: 'from-pink-500 to-pink-600',
                  path: '/astro-finance'
                }
              ].map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    to={tool.path}
                    className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 duration-300 block"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 group-hover:text-blue-700 font-semibold flex items-center">
                        Explore Tools
                        <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link to="/tools" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                View All Tools
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Popular Calculators */}
        <section id="popular" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Popular Calculators</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our most frequently used calculators to help you make informed financial decisions
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate your loan EMI, total interest, and payment schedule', category: 'Loan Calculators' },
                { id: 'sip-calculator', name: 'SIP Calculator', description: 'Plan your investments and calculate returns on SIP investments', category: 'Investment Calculators' },
                { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'Calculate your income tax liability under old and new tax regimes', category: 'Tax Calculators' }
              ].map((calculator, index) => (
                <motion.div
                  key={calculator.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/calculators/${calculator.id}`}
                    className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 duration-300 block"
                  >
                    <div className="flex items-start mb-6">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg">
                        <Calculator className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {calculator.name}
                        </h3>
                        <p className="text-sm text-gray-500">{calculator.category}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{calculator.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 group-hover:text-blue-700 font-semibold flex items-center">
                        Try Calculator
                        <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="text-2xl font-bold text-gray-300">#{index + 1}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Financial Insights</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest financial news, investment tips, and expert insights
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.slice(0, 6).map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
                >
                  <Link to={`/blog/${blog.slug}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={blog.coverImage || 'https://via.placeholder.com/400x250'}
                        alt={blog.title}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        {blog.categories?.slice(0, 2).map((category) => (
                          <span
                            key={category}
                            className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-blue-600 mr-2 mb-2"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(blog.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {Math.floor(Math.random() * 1000) + 100} reads
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={blog.authorImage || 'https://via.placeholder.com/32x32'}
                            alt={blog.author}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">{blog.author}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link to="/blog" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
                View All Blog Posts
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Financial News</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest financial news, market updates, and economic insights
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "RBI Announces New Monetary Policy Changes",
                  excerpt: "The Reserve Bank of India has announced significant changes to monetary policy affecting interest rates and lending norms.",
                  date: "2024-01-15",
                  category: "Banking",
                  image: "https://via.placeholder.com/400x250/1e40af/ffffff?text=RBI+News"
                },
                {
                  title: "Stock Market Reaches New Highs",
                  excerpt: "Indian stock markets have reached new record highs with strong performance across multiple sectors.",
                  date: "2024-01-14",
                  category: "Markets",
                  image: "https://via.placeholder.com/400x250/059669/ffffff?text=Stock+Market"
                },
                {
                  title: "New Tax Benefits for Home Buyers",
                  excerpt: "Government announces new tax benefits and incentives for first-time home buyers in 2024.",
                  date: "2024-01-13",
                  category: "Tax",
                  image: "https://via.placeholder.com/400x250/dc2626/ffffff?text=Tax+News"
                }
              ].map((news, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group border border-gray-100"
                >
                  <Link to="/news" className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-blue-600">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(news.date).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Financial News</span>
                        <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link to="/news" className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 shadow-lg hover:shadow-xl transition-all">
                <Newspaper className="h-5 w-5 mr-2" />
                View All News
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Calculators?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed specifically for the Indian financial context, our calculators offer precision, ease of use, and comprehensive insights
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Globe, title: 'Indian Context', description: 'Tailored for Indian tax laws, investment options, and financial products' },
                { icon: TrendingUp, title: 'Accurate Results', description: 'Precise calculations based on the latest financial formulas and regulations' },
                { icon: PieChart, title: 'Visual Insights', description: 'Interactive charts and visual breakdowns to understand your finances better' },
                { icon: Smartphone, title: 'Mobile Friendly', description: 'Optimized for all devices - use on mobile, tablet, or desktop seamlessly' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all transform hover:-translate-y-2 duration-300"
                >
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 shadow-lg">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Categories Section */}
        <section id="categories" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore All Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find the perfect calculator for your financial needs
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculatorCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/category/${category.id}`}
                    className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 duration-300 block"
                  >
                    <div className="flex items-start mb-6">
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${getCategoryColor(category.id)} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg`}>
                        {getCategoryIcon(category.id)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">{category.calculators.length} calculators</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 group-hover:text-blue-700 font-semibold flex items-center">
                        Explore
                        <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Categories Grid */}
        <section id="categories" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore All Categories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find the perfect calculator for your financial needs
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculatorCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    to={`/calculators/${category.calculators[0]?.id || 'emi-calculator'}`}
                    className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 block"
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Financial Journey?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join millions of users who trust our calculators for their financial planning needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <Link
                  to="/calculators/emi-calculator"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Start Calculating
                </Link>
                <Link
                  to="/tools"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  🛠️ All Tools Hub
                </Link>
                <Link
                  to="/tax-tools"
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  💰 Tax Tools
                </Link>
                <Link
                  to="/finance-tools"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  📈 Finance Tools
                </Link>
                <Link
                  to="/blog"
                  className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold transition-all"
                >
                  Read Our Blog
                </Link>
                <Link
                  to="/astro-finance"
                  className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl font-semibold transition-all"
                >
                  Astro Finance
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeNew;
