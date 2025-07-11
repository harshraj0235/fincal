import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, ArrowRight, TrendingUp, DollarSign, PieChart, Building, Shield } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';
import { SearchBar } from '../components/SearchBar';
import SEOHelmet from '../components/SEOHelmet';

export const Home: React.FC = () => {
  const [popularCalculators, setPopularCalculators] = useState<Array<{id: string; name: string; description: string; category: string}>>([]);
  const location = useLocation();
  const allCalculatorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPopularCalculators([
      { id: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate your loan EMI, total interest, and payment schedule', category: 'Loan Calculators' },
      { id: 'sip-calculator', name: 'SIP Calculator', description: 'Plan your investments and calculate returns on SIP investments', category: 'Investment Calculators' },
      { id: 'income-tax-calculator', name: 'Income Tax Calculator', description: 'Calculate your income tax liability under old and new tax regimes', category: 'Tax Calculators' },
      { id: 'mutual-fund-overlap-checker', name: 'Mutual Fund Overlap Checker', description: 'Check portfolio overlap between mutual funds to optimize diversification', category: 'Investments & Wealth Management' },
      { id: 'asset-allocation-planner', name: 'Asset Allocation Planner', description: 'Create a balanced portfolio based on your risk profile', category: 'Investments & Wealth Management' },
      { id: 'credit-card-finder', name: 'Credit Card Finder', description: 'Find the best credit card based on your spending patterns', category: 'Banking & Finance Tools' }
    ]);
  }, []);

  useEffect(() => {
    if (location.hash && allCalculatorsRef.current) {
      allCalculatorsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  // Only import icons/components used above
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

  return (
    <>
      <SEOHelmet
        title="Free Financial Calculators for India - EMI, SIP, Tax, Investment Tools"
        description="India's most comprehensive financial calculator platform. Calculate EMI, SIP returns, income tax, mutual fund returns, and more. Free online financial planning tools for Indian users. Get accurate calculations for loans, investments, and tax planning."
        keywords="financial calculator india, EMI calculator, SIP calculator, income tax calculator, mutual fund calculator, loan calculator, investment calculator, personal finance tools, financial planning india, free financial calculator"
        url="/"
      />
      <div className="min-h-screen">
        {/* Hero Section - critical only */}
        <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
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
                  <Link to="/calculators/emi-calculator" className="btn bg-white text-primary-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all px-6 py-3 text-base font-medium rounded-xl">
                    EMI Calculator
                  </Link>
                  <Link to="/calculators/income-tax-calculator" className="btn bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all px-6 py-3 text-base font-medium rounded-xl">
                    Income Tax
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <picture>
                  <source srcSet="/images/hero.webp" type="image/webp" />
                  <img src="/images/hero.webp" alt="Finance Hero" width={400} height={300} style={{ objectFit: 'cover', borderRadius: '1.5rem' }} loading="eager" />
                </picture>
              </div>
            </div>
          </div>
        </section>
        {/* Search Section - critical only */}
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
        {/* Quick Access Categories - critical only */}
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
                <Link key={category.id} to={`/#${category.id}`} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center group">
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
        {/* Popular Calculators - critical only */}
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
                <Link key={calculator.id} to={`/calculators/${calculator.id}`} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group border border-neutral-100 hover:border-primary-200">
                  <div className="flex items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
                      <Calculator className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{calculator.name}</h3>
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
              <Link to="/#categories" className="btn bg-primary-600 text-black hover:bg-primary-700 shadow-md hover:shadow-lg transition-all">
                View All Calculators
              </Link>
            </div>
          </div>
        </section>
        {/* All Calculators Section - lazy loaded below the fold */}
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
                      <Link key={calculator.id} to={`/calculators/${calculator.id}`} className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors flex items-center">
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
      </div>
    </>
  );
};

export default Home;
