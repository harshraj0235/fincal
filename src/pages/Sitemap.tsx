import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, FileText } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { blogPosts } from '../data/blogData';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

export const Sitemap: React.FC = () => {
  const navigate = useNavigate();
  
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
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          A complete overview of all pages and resources available on FinCalc India
        </p>
      </div>
      
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
            {blogPosts.map(post => (
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
    </div>
    </>
  );
};

export default Sitemap;