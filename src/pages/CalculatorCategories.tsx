import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculatorCategories } from '../data/calculatorData';
import {
  Search,
  Building,
  TrendingUp,
  DollarSign,
  PieChart,
  Shield,
  IndianRupee,
  X
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

import { ResponsiveAd } from '../components/BannerAd';

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'loan-calculators': return <Building className="h-10 w-10 text-blue-600 mb-4" />;
    case 'investment-calculators': return <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />;
    case 'tax-calculators': return <DollarSign className="h-10 w-10 text-blue-600 mb-4" />;
    case 'retirement-calculators': return <PieChart className="h-10 w-10 text-blue-600 mb-4" />;
    case 'business-calculators': return <Building className="h-10 w-10 text-blue-600 mb-4" />;
    case 'property-calculators': return <Building className="h-10 w-10 text-blue-600 mb-4" />;
    case 'insurance-calculators': return <Shield className="h-10 w-10 text-blue-600 mb-4" />;
    case 'banking-calculators': return <IndianRupee className="h-10 w-10 text-blue-600 mb-4" />;
    case 'fintech-payments': return <IndianRupee className="h-10 w-10 text-blue-600 mb-4" />;
    case 'investments-wealth-management': return <TrendingUp className="h-10 w-10 text-blue-600 mb-4" />;
    case 'personal-finance': return <PieChart className="h-10 w-10 text-blue-600 mb-4" />;
    default: return <IndianRupee className="h-10 w-10 text-blue-600 mb-4" />;
  }
};

const CalculatorCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const flattenedCalculators = useMemo(() => calculatorCategories.flatMap(category =>
    category.calculators.map(calculator => ({
      ...calculator,
      categoryId: category.id,
      categoryName: category.name
    }))
  ), []);

  const searchMatches = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerSearch = searchTerm.toLowerCase();
    return flattenedCalculators.filter(calculator =>
      calculator.name.toLowerCase().includes(lowerSearch) ||
      calculator.description.toLowerCase().includes(lowerSearch) ||
      calculator.categoryName.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, flattenedCalculators]);

  const faqItems = [
    {
      question: 'How do I choose the right calculator category?',
      answer: 'Start with your goal: loans, investments, taxes, or retirement. Each category groups tools that solve related money decisions.'
    },
    {
      question: 'Are MoneyCal calculators free to use?',
      answer: 'Yes. All calculators are free and work directly in your browser with instant results.'
    },
    {
      question: 'How accurate are the results?',
      answer: 'Results follow standard formulas used in India. For final decisions, verify with your lender or official sources.'
    }
  ];

  return (
    <>
      <SEOHelmet
        title="Finance Calculators Hub - Free Financial Tools | MoneyCal.in"
        description="Explore 100+ free financial calculators for loans, investments, taxes, retirement, GST, and banking in India. Compare tools and plan smarter decisions."
        keywords="financial calculators, loan calculators india, investment calculators, tax calculators india, EMI calculator, SIP calculator, GST calculator"
        url="/calculators"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators Hub', url: '/calculators' }
        ]}
        faqData={faqItems}
        tags={["financial tools", "india calculators", "loan calculators", "investment calculators", "tax calculators"]}
      />

      <div className="min-h-screen bg-[#f7f9fa] pt-8 pb-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          
          {/* Logo / Header (Omni Style) */}
          <div className="text-center mb-12 mt-8 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center gap-3">
              <span className="flex items-center text-blue-600">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <IndianRupee className="w-6 h-6" />
                </div>
                MoneyCal 
              </span>
              <span className="text-blue-600 font-normal">calculator</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="relative group shadow-sm rounded-full">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-14 pr-12 py-4 bg-white border border-gray-200 rounded-full text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          {searchTerm ? (
            <div className="mb-16">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {searchMatches.length} results for "{searchTerm}"
              </h3>
              {searchMatches.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchMatches.map(calc => (
                    <Link
                      key={`search-${calc.id}`}
                      to={`/calculators/${calc.id}`}
                      className="bg-white border border-gray-200 rounded-[1rem] p-6 hover:shadow-lg hover:border-gray-300 transition-all flex flex-col items-center text-center group"
                    >
                      {getCategoryIcon(calc.categoryId)}
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg mb-2 leading-snug">
                        {calc.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {calc.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white border border-gray-200 dashed rounded-2xl">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">No calculators found matching "{searchTerm}".</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-blue-600 font-bold hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Category Grid */
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {calculatorCategories.map(category => (
                  <Link
                    key={category.id}
                    to={`/calculators/category/${category.id}`}
                    className="bg-white border border-gray-200 rounded-[1rem] p-8 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:border-gray-300 transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    {getCategoryIcon(category.id)}
                    <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">
                      {category.calculators.length} calculators
                    </p>
                  </Link>
                ))}
              </div>
              <div className="w-full flex justify-center mb-16">
                <ResponsiveAd />
              </div>
            </div>
          )}

          {/* Simple SEO Section at bottom */}
          {!searchTerm && (
            <div className="mt-16 bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover MoneyCal</h2>
                <p className="text-gray-600">Amazing truths about your finances revealed with calculators.</p>
              </div>
              <div className="shrink-0 flex items-center justify-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Explore More
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CalculatorCategories;
