import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { calculatorCategories } from '../data/calculatorData';
import {
  Calculator,
  ChevronRight,
  Search,
  IndianRupee,
  Menu,
  X,
  Compass
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import AstroFinanceButton from '../components/AstroFinanceButton';
import { ResponsiveAd } from '../components/BannerAd';

const CalculatorCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSegment, setActiveSegment] = useState<string>('all-tools');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to section logic
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSegment(id);
        }, 100);
      }
    }
  }, [location]);

  // Handle active state on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (searchTerm) return; // Disable scroll spy during search

      const sections = calculatorCategories.map(c => document.getElementById(c.id));
      const scrollPosition = window.scrollY + 200; // Offset for sticky header

      let currentActive = 'all-tools';
      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition) {
          currentActive = section.id;
        }
      }

      if (window.scrollY < 100) {
        currentActive = 'all-tools';
      }

      setActiveSegment(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchTerm]);

  const scrollToSegment = (id: string) => {
    if (id === 'all-tools') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSegment('all-tools');
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = element.offsetTop - 120; // Accounts for sticky header
        window.scrollTo({ top: offset, behavior: 'smooth' });
        setActiveSegment(id);
      }
    }
    setIsMobileMenuOpen(false);
  };

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

  const totalCalculators = flattenedCalculators.length;

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
      <AstroFinanceButton />
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

      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Mobile Navigation Header */}
        <div className="lg:hidden sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <Compass className="w-5 h-5 text-blue-600" />
            <span>Navigation Hub</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-slate-100 rounded-lg text-slate-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden fixed left-0 right-0 top-[120px] z-30 bg-white shadow-xl border-b border-slate-200 overflow-hidden"
            >
              <nav className="p-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                <button
                  onClick={() => scrollToSegment('all-tools')}
                  className={`text-left px-4 py-3 rounded-xl font-bold transition-colors ${activeSegment === 'all-tools' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  All Tools Menu
                </button>
                {calculatorCategories.map(category => (
                  <button
                    key={`mobile-nav-${category.id}`}
                    onClick={() => scrollToSegment(category.id)}
                    className={`text-left px-4 py-3 rounded-xl font-bold transition-colors ${activeSegment === category.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mx-auto max-w-[1600px] flex flex-col lg:flex-row">
          {/* Desktop Left Sidebar Navigation */}
          <aside className="hidden lg:block w-[280px] shrink-0 border-r border-slate-200 bg-white/50 backdrop-blur-sm relative">
            <div className="sticky top-20 p-6 h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
              <div className="mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Calculator className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-black text-slate-900">Tools Library</h2>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => scrollToSegment('all-tools')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 relative overflow-hidden ${activeSegment === 'all-tools'
                    ? 'text-blue-700 bg-blue-50 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                >
                  {activeSegment === 'all-tools' && (
                    <motion.div layoutId="activeline" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md" />
                  )}
                  Overview
                </button>
                <div className="my-2 border-t border-slate-100" />
                {calculatorCategories.map(category => (
                  <button
                    key={`nav-${category.id}`}
                    onClick={() => scrollToSegment(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 relative group flex items-center justify-between ${activeSegment === category.id
                      ? 'text-blue-700 bg-blue-50 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                      }`}
                  >
                    {activeSegment === category.id && (
                      <motion.div layoutId="activeline" className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md" />
                    )}
                    <span className="truncate pr-2">{category.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${activeSegment === category.id ? 'bg-white/80 text-blue-800' : 'bg-slate-200 text-slate-500 group-hover:bg-white'
                      }`}>
                      {category.calculators.length}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 px-4 lg:px-12 py-8 lg:py-12 max-w-7xl mx-auto w-full">

            {/* Hero & Universal Search */}
            <div id="all-tools" className="mb-16 scroll-mt-24">
              <div className="max-w-3xl">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-4">
                  Find the exact <span className="text-blue-600">calculator</span> you need.
                </h1>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl">
                  Dive into {totalCalculators}+ financial tools designed specifically for the complex landscape of Indian finance.
                </p>

                {/* Massive Search Bar */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search SIP, Home Loan EMI, GST, Fixed Deposit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-14 pr-6 py-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Trending Chips */}
                {!searchTerm && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">Trending:</span>
                    {['SIP Return', 'Home Loan EMI', 'GST Rate', 'Income Tax'].map(term => (
                      <button
                        key={term}
                        onClick={() => setSearchTerm(term)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Results State */}
            {searchTerm ? (
              <div className="mb-16">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  {searchMatches.length} results for "{searchTerm}"
                </h3>
                {searchMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {searchMatches.map(calc => (
                      <Link
                        key={`search-${calc.id}`}
                        to={`/calculators/${calc.id}`}
                        className="group flex flex-col bg-white border border-slate-200 p-5 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <IndianRupee className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">{calc.name}</h4>
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{calc.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                            {calc.categoryName}
                          </span>
                          <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                            &rarr;
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white border border-slate-200 dashed rounded-2xl">
                    <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">No calculators found matching "{searchTerm}".</p>
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
              /* Normal Category Layout (Bento Style) */
              <div className="space-y-16 lg:space-y-24">
                <div className="w-full flex justify-center mb-8">
                  <ResponsiveAd />
                </div>
                {calculatorCategories.map(category => (
                  <section
                    key={`section-${category.id}`}
                    id={category.id}
                    className="scroll-mt-24 pb-8 border-b border-slate-200/60 last:border-0"
                  >
                    <div className="mb-8 max-w-3xl">
                      <h2 className="text-3xl font-black text-slate-900 mb-3">{category.name}</h2>
                      <p className="text-slate-600 text-lg">{category.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {category.calculators.map(calc => (
                        <Link
                          key={`calc-${calc.id}`}
                          to={`/calculators/${calc.id}`}
                          className="group relative bg-white p-6 justify-between flex flex-col rounded-[1.25rem] border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 overflow-hidden min-h-[160px]"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-50 to-transparent pointer-events-none rounded-bl-[3rem] group-hover:from-blue-50 transition-colors" />

                          <div className="relative z-10 w-full mb-4">
                            <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors mb-2 pr-6">
                              {calc.name}
                            </h3>
                            <p className="text-sm text-slate-500 line-clamp-2">
                              {calc.description}
                            </p>
                          </div>

                          <div className="relative z-10 mt-auto flex justify-between items-center w-full transform group-hover:-translate-y-1 transition-transform">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Subdued SEO Text Section at bottom */}
            {!searchTerm && (
              <section className="mt-20 pt-16 border-t border-slate-200">
                <div className="mb-10 text-center max-w-2xl mx-auto">
                  <h2 className="text-2xl font-black text-slate-900 mb-4">Understanding Financial Calculators</h2>
                  <p className="text-slate-600">A brief guide on making the most out of our free computational tools for better financial planning in India.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Why use our tools?</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">Most financial decisions are complex because they involve compound interest, time, and variable taxes. Our calculators remove the guesswork, letting you simulate scenarios safely before committing your money.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Loan Affordability</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">Always calculate your <Link to="/calculators/emi-calculator" className="text-blue-600 hover:underline">EMI</Link> first. Keep your total monthly debt obligations below 40% of your take-home pay. Use our <Link to="/calculators/loan-prepayment-calculator" className="text-blue-600 hover:underline">prepayment calculators</Link> to see how extra payments aggressively reduce total interest.</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Tax Strategies</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">Tax rules change frequently. Use our <Link to="/gst-tools" className="text-blue-600 hover:underline">GST</Link> and <Link to="/calculators/income-tax-calculator" className="text-blue-600 hover:underline">Income Tax calculators</Link> to remain compliant and optimize your returns under the latest budget slabs (Old vs. New regime).</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Investment Discipline</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">Don't just estimate returns; plan for inflation. Our <Link to="/calculators/sip-calculator" className="text-blue-600 hover:underline">SIP calculators</Link> demonstrate how consistency and compounding over long horizons defeat market volatility in the long run.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </main>
        </div>
      </div>
    </>
  );
};

export default CalculatorCategories;
