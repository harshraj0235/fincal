import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft, FileQuestion, Calculator, BookOpen } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const NotFound404: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set proper 404 status for SEO
    if (typeof window !== 'undefined') {
      window.document.title = '404 - Page Not Found | MoneyCal India';
    }
  }, []);

  const popularLinks = [
    { title: 'Financial Calculators', path: '/calculators', icon: Calculator, description: 'Access 100+ free financial calculators' },
    { title: 'Finance Blog', path: '/blog', icon: BookOpen, description: 'Read expert financial advice and guides' },
    { title: 'GST Tools', path: '/gst-tools', icon: Calculator, description: 'GST calculators and compliance tools' },
    { title: 'Investment Tools', path: '/investing-tools', icon: Calculator, description: 'Plan your investments smartly' }
  ];

  return (
    <>
      <SEOHelmet
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Explore MoneyCal India's financial calculators, tools, and expert blog content."
        url={typeof window !== 'undefined' ? window.location.pathname : '/404'}
        noIndex={true}
        noFollow={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* 404 Error Display */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <FileQuestion className="w-32 h-32 text-blue-600 opacity-20" strokeWidth={1} />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or may have been moved. 
              Don't worry, you can still explore our comprehensive financial tools and resources below.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 shadow hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Blog
            </Link>
          </div>

          {/* Popular Links */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Explore Popular Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group flex items-start p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border-2 border-transparent hover:border-blue-300"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {link.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Looking for a specific calculator or tool?
            </p>
            <Link
              to="/calculators"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Browse all 100+ financial calculators →
            </Link>
          </div>

          {/* SEO Content */}
          <div className="mt-12 prose prose-sm max-w-none text-gray-600 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About MoneyCal India</h3>
            <p className="mb-2">
              MoneyCal India is your trusted destination for free financial calculators, tools, and expert advice. 
              We help Indian users make informed financial decisions with our comprehensive suite of over 100 calculators 
              covering investments, taxes, loans, GST, insurance, and more.
            </p>
            <p>
              Whether you're planning your retirement, calculating EMIs, filing taxes, or exploring investment options, 
              our tools are designed specifically for the Indian financial ecosystem with accurate calculations and 
              up-to-date information.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound404;

