import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, FileText, Search, Filter } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { blogPosts } from '../data/blogData';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const Sitemap: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Create a comprehensive list of all pages for search
  const allPages = useMemo(() => {
    const pages = [
      // Main Pages
      { title: 'Home', url: '/', category: 'main' },
      { title: 'Blog', url: '/blog', category: 'main' },
      { title: 'About Us', url: '/about-us', category: 'main' },
      { title: 'Contact Us', url: '/contact-us', category: 'main' },
      { title: 'Privacy Policy', url: '/privacy-policy', category: 'main' },
      { title: 'Terms and Conditions', url: '/terms-and-conditions', category: 'main' },
      { title: 'Disclaimer', url: '/disclaimer', category: 'main' },
      { title: 'Cookie Policy', url: '/cookie-policy', category: 'main' },
      { title: 'Editorial Policy', url: '/editorial-policy', category: 'main' },
      { title: 'Sitemap', url: '/sitemap', category: 'main' },
      
      // Blog Posts
      ...blogPosts.map(post => ({
        title: post.title,
        url: `/blog/${post.slug}`,
        category: 'blog'
      })),
      
      // Finance & Banking Tools
      { title: 'Bank IFSC/MICR Finder', url: '/calculators/bank-ifsc-finder', category: 'finance' },
      { title: 'UPI Failure Troubleshooter', url: '/calculators/upi-failure-troubleshooter', category: 'finance' },
      { title: 'ATM Locator', url: '/calculators/atm-locator', category: 'finance' },
      { title: 'Bank Holiday Calendar', url: '/calculators/bank-holiday-calendar', category: 'finance' },
      { title: 'Best Interest Rates', url: '/calculators/interest-rates-comparison', category: 'finance' },
      { title: 'Banking Knowledge', url: '/calculators/banking-knowledge', category: 'finance' },
      
      // Loan Tools
      { title: 'Loan Tools Hub', url: '/loan-tools', category: 'loan' },
      { title: 'EMI Calculator (Reducing Balance)', url: '/loan-tools/emi-calculator', category: 'loan' },
      { title: 'Flat Rate Loan EMI Calculator', url: '/loan-tools/flat-rate-calculator', category: 'loan' },
      { title: 'Extra Payment Impact Calculator', url: '/loan-tools/prepayment-calculator', category: 'loan' },
      { title: 'Debt Snowball vs Avalanche Simulator', url: '/loan-tools/debt-strategies', category: 'loan' },
      { title: 'Loan Refinancing Calculator', url: '/loan-tools/refinancing-calculator', category: 'loan' },
      { title: 'Loan Affordability Calculator', url: '/loan-tools/loan-affordability', category: 'loan' },
      { title: 'Debt Consolidation Calculator', url: '/loan-tools/debt-consolidation', category: 'loan' },
      { title: 'Amortization Schedule Viewer', url: '/loan-tools/amortization-schedule', category: 'loan' },
      
      // New Platform Features
      { title: 'Comprehensive Finance Hub', url: '/comprehensive-finance-hub', category: 'platform' },
      { title: 'Market Analysis & Trends', url: '/market-analysis', category: 'platform' },
      
      // Calculator Categories
      ...calculatorCategories.flatMap(category => 
        category.calculators.map(calculator => ({
          title: calculator.name,
          url: `/calculators/${calculator.id}`,
          category: 'calculator'
        }))
      )
    ];
    
    return pages;
  }, []);
  
  // Filter pages based on search term and category
  const filteredPages = useMemo(() => {
    let filtered = allPages;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(page => page.category === selectedCategory);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(page => 
        page.title.toLowerCase().includes(term) ||
        page.url.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [allPages, searchTerm, selectedCategory]);
  
  const categories = [
    { value: 'all', label: 'All Pages' },
    { value: 'main', label: 'Main Pages' },
    { value: 'blog', label: 'Blog Posts' },
    { value: 'finance', label: 'Finance Tools' },
    { value: 'loan', label: 'Loan Tools' },
    { value: 'calculator', label: 'Calculators' }
  ];
  
  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Sitemap</h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
            A complete overview of all pages and resources available on MoneyCal India
          </p>
          
          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search pages, tools, or calculators..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[--primary-500] focus:border-transparent transition-all"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[--primary-500] focus:border-transparent transition-all appearance-none bg-white min-w-[180px]"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mt-4 text-sm text-neutral-600">
                {searchTerm || selectedCategory !== 'all' ? (
                  <span>
                    Showing {filteredPages.length} of {allPages.length} pages
                    {searchTerm && ` matching "${searchTerm}"`}
                    {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                  </span>
                ) : (
                  <span>All {allPages.length} pages available</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Results */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Search Results</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              {filteredPages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPages.map((page, index) => (
                    <Link
                      key={`${page.url}-${index}`}
                      to={page.url}
                      className="block p-4 border border-neutral-200 rounded-lg hover:border-[--primary-300] hover:bg-[--primary-50] transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-900 group-hover:text-[--primary-700] transition-colors mb-1">
                            {page.title}
                          </h3>
                          <p className="text-sm text-neutral-500 font-mono">
                            {page.url}
                          </p>
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full">
                            {categories.find(c => c.value === page.category)?.label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No results found</h3>
                  <p className="text-neutral-600">
                    Try adjusting your search terms or category filter
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Traditional Sitemap Layout (shown when no search/filter) */}
        {!searchTerm && selectedCategory === 'all' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Main Pages */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Main Pages
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Terms and Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/disclaimer" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookie-policy" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/editorial-policy" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Editorial Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/sitemap" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Blog */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Blog
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/blog" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      All Blog Posts
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/write" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Write for Us
                    </Link>
                  </li>
                  {blogPosts.slice(0, 8).map(post => (
                    <li key={post.id}>
                      <Link to={`/blog/${post.slug}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Finance & Banking Tools */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Finance & Banking Tools
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/bank-ifsc-finder" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Bank IFSC/MICR Finder
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/upi-failure-troubleshooter" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      UPI Failure Troubleshooter
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/atm-locator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      ATM Locator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/bank-holiday-calendar" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Bank Holiday Calendar
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/interest-rates-comparison" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Best Interest Rates
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/banking-knowledge" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Banking Knowledge
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Loan Tools */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-[--primary-600]" />
                  Loan Tools
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/loan-tools" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Loan Tools Hub
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/emi-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      EMI Calculator (Reducing Balance)
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/flat-rate-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Flat Rate Loan EMI Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/prepayment-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Extra Payment Impact Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/debt-strategies" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Debt Snowball vs Avalanche Simulator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/refinancing-calculator" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Loan Refinancing Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/loan-affordability" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Loan Affordability Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/debt-consolidation" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Debt Consolidation Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/loan-tools/amortization-schedule" className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                      Amortization Schedule Viewer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Calculator Categories */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Calculator Categories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {calculatorCategories.map(category => (
                  <div key={category.id}>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {category.name}
                    </h3>
                    <ul className="space-y-2">
                      {category.calculators.map(calculator => (
                        <li key={calculator.id}>
                          <Link to={`/calculators/${calculator.id}`} className="text-neutral-700 hover:text-[--primary-600] transition-colors">
                            {calculator.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Blog Categories */}
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Blog Categories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {['Government Schemes', 'Investment', 'Tax Planning', 'Retirement Planning', 'Financial Inclusion', 'Banking'].map(category => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {category}
                    </h3>
                    <Link to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-[--primary-600] hover:text-[--primary-800] transition-colors">
                      View all articles
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sitemap;