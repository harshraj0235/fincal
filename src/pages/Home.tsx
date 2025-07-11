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
import SEOHelmet from '../components/SEOHelmet';

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
  
  // Structured data for the home page
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "FinanceGurus Directory - India's Top Financial Calculators & Tools",
    "description": "Comprehensive financial calculators for Indian users. Calculate EMI, SIP, income tax, mutual funds, and more. Free online financial planning tools.",
    "url": "https://financegurus.directory",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Financial Calculators",
      "description": "Collection of 50+ financial calculators for Indian users",
      "numberOfItems": calculatorCategories.reduce((total, cat) => total + cat.calculators.length, 0),
      "itemListElement": calculatorCategories.flatMap((category, catIndex) =>
        category.calculators.map((calculator, calcIndex) => ({
          "@type": "ListItem",
          "position": catIndex * 10 + calcIndex + 1,
          "item": {
            "@type": "WebApplication",
            "name": calculator.name,
            "description": calculator.description,
            "url": `https://financegurus.directory/calculators/${calculator.id}`,
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            }
          }
        }))
      )
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://financegurus.directory"
        }
      ]
    }
  };
  
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
    <>
      <SEOHelmet
        title="Free Financial Calculators for India - EMI, SIP, Tax, Investment Tools"
        description="India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users. Get accurate calculations for loans, investments, and tax planning."
        keywords="financial calculator india, EMI calculator, SIP calculator, income tax calculator, mutual fund calculator, loan calculator, investment calculator, personal finance tools, financial planning india, free financial calculator"
        url="/"
        structuredData={homeStructuredData}
        tags={["financial calculators", "EMI calculator", "SIP calculator", "income tax", "mutual funds", "personal finance", "investment planning"]}
      />
      
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-black">
                Smart Financial Decisions Start Here
              </h1>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-black/90 max-w-2xl mx-auto lg:mx-0">
                Comprehensive financial calculators tailored for Indian users. Plan loans, investments, taxes, and more with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link 
                  to="/calculators/emi-calculator" 
                  className="btn bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all px-6 py-3 text-base font-medium rounded-xl"
                >
                  EMI Calculator
                </Link>
                <Link 
                  to="/calculators/income-tax-calculator" 
                  className="btn bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all px-6 py-3 text-base font-medium rounded-xl"
                >
                  Income Tax
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-primary-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl transform rotate-3 z-10 backdrop-blur-sm bg-opacity-95">
                  <div className="transform -rotate-3">
                    <div className="mb-4">
                      <div className="text-primary-600 font-semibold mb-1 text-sm">Loan Amount</div>
                      <div className="text-xl sm:text-2xl font-bold text-neutral-900">₹25,00,000</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-primary-600 font-semibold mb-1 text-sm">Interest Rate</div>
                      <div className="text-xl sm:text-2xl font-bold text-neutral-900">8.5%</div>
                    </div>
                    <div className="mb-4">
                      <div className="text-primary-600 font-semibold mb-1 text-sm">Loan Tenure</div>
                      <div className="text-xl sm:text-2xl font-bold text-neutral-900">20 Years</div>
                    </div>
                    <div className="pt-4 border-t border-neutral-200">
                      <div className="text-primary-600 font-semibold mb-1 text-sm">Monthly EMI</div>
                      <div className="text-2xl sm:text-3xl font-bold text-neutral-900">₹21,761</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Quick Links to Calculators */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 text-center">Popular Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularCalculators.map(calc => (
            <Link
              key={calc.id}
              to={`/calculators/${calc.id}`}
              className="group bg-white rounded-xl shadow hover:shadow-2xl transition-shadow border border-gray-100 hover:border-blue-200 p-6 flex flex-col items-start hover:-translate-y-1"
            >
              <div className="text-lg font-semibold text-blue-700 group-hover:text-blue-900 mb-2">{calc.name}</div>
              <div className="text-sm text-neutral-600 mb-3 line-clamp-2">{calc.description}</div>
              <span className="mt-auto text-xs text-green-600 font-medium">Try Now →</span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/category/loan-calculators" className="text-blue-600 font-semibold hover:underline">View all 12 calculators</Link>
        </div>
      </section>
      {/* Blog Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 text-center">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* The original code had featuredBlogs, but featuredBlogs is not defined.
              Assuming the intent was to use popularCalculators or a placeholder for blogs.
              For now, I'll keep the original blog section structure but remove the undefined variable.
              If the user wants to add a blog section, they need to define featuredBlogs. */}
          {/* This section is currently empty as featuredBlogs is not defined in the original file. */}
          {/* If you want to add a blog section, you'll need to define featuredBlogs. */}
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/blog" className="text-green-600 font-semibold hover:underline">View All Blogs</Link>
        </div>
      </section>
      {/* Excel Tools & Government Schemes Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Excel Tools Hub</h3>
          <p className="text-neutral-700 mb-6">Download 100+ ready-to-use Excel templates for finance, business, and productivity. Free, customizable, and easy to use.</p>
          <Link to="/excel-tools" className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition self-start">Browse Excel Tools</Link>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl transition">
          <h3 className="text-xl font-bold text-green-700 mb-4">Government Schemes</h3>
          <p className="text-neutral-700 mb-6">Explore comprehensive guides and calculators for all major Indian government schemes. Stay informed and maximize your benefits.</p>
          <Link to="/government-schemes" className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition self-start">Explore Schemes</Link>
        </div>
      </section>
      {/* News/Updates or Reels (Optional) */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 text-center">Finance News & Updates</h2>
        <div className="bg-gradient-to-r from-blue-100 via-green-100 to-yellow-100 rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <p className="text-lg text-neutral-700 mb-2">Stay updated with the latest in finance, banking, and investments. Check out our news reel for daily updates!</p>
            <Link to="/news" className="px-5 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition">Go to News Hub</Link>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src="/images/blog-default.webp" alt="Finance News" className="w-48 h-32 object-cover rounded-xl shadow-lg border-4 border-white" loading="lazy" />
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section ref={categoriesRef} id="categories-section" className="py-16 bg-neutral-50">
        <CategorySection />
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
          {/* The rest of the all calculators grid remains unchanged */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {calculatorCategories.flatMap(category =>
              category.calculators.map(calculator => (
                <Link
                  key={calculator.id}
                  to={`/calculators/${calculator.id}`}
                  className="group bg-white rounded-xl shadow hover:shadow-2xl transition-shadow border border-gray-100 hover:border-blue-200 p-6 flex flex-col items-start hover:-translate-y-1"
                >
                  <div className="text-lg font-semibold text-blue-700 group-hover:text-blue-900 mb-2">{calculator.name}</div>
                  <div className="text-sm text-neutral-600 mb-3 line-clamp-2">{calculator.description}</div>
                  <span className="mt-auto text-xs text-green-600 font-medium">Try Now →</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-green-700 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-lg font-bold">Moneycal © {new Date().getFullYear()}</div>
          <div className="flex gap-6 text-sm">
            <Link to="/about-us" className="hover:underline">About</Link>
            <Link to="/contact-us" className="hover:underline">Contact</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Home;
