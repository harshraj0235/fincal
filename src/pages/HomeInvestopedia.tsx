import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calculator, Search, TrendingUp, BookOpen, FileText,
  ArrowRight, Star, Zap, Shield, Award, ChevronRight,
  DollarSign, Building, Home, PiggyBank,
  Target, BarChart3, Gift, Umbrella,
  Rocket, Calendar, CheckCircle,
  CreditCard, Building2, Briefcase, Heart, GraduationCap,
  Wrench, Newspaper, Coins, FolderOpen, Sparkles,
  Receipt, Calendar as CalendarIcon, Gem, Scale, IndianRupee } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { calculatorCategories } from '../data/calculatorData';
import { blogPosts as blogPosts0 } from '../data/blogData';
import { blogPosts as blogPosts1 } from '../data/blogData1';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Loan Calculators': Home,
  'Investment Calculators': TrendingUp,
  'Tax Calculators': FileText,
  'Retirement Calculators': Umbrella,
  'Business Calculators': Briefcase,
  'Property Calculators': Building,
  'Insurance Calculators': Heart,
  'Banking & Finance Tools': Building2,
  'FinTech & Payments': CreditCard,
  'Investments & Wealth Management': BarChart3,
  'Personal Finance': PiggyBank,
  'Math & Education Calculators': GraduationCap,
};

const buildSearchDatabase = () => {
  const calculators = calculatorCategories.flatMap(category =>
    category.calculators.map(calc => ({
      name: calc.name,
      path: `/calculators/${calc.id}`,
      category: category.name,
      keywords: calc.keywords.join(' '),
      description: calc.description,
    }))
  );
  const blogs = [
    ...blogPosts0.slice(0, 20).map(post => ({
      name: post.title,
      path: `/blog/${post.slug}`,
      category: 'Blog',
      keywords: post.categories?.join(' ') || '',
      description: post.excerpt || '',
    })),
    ...blogPosts1.slice(0, 20).map(post => ({
      name: post.title,
      path: `/blog/${post.slug}`,
      category: 'Blog',
      keywords: post.categories?.join(' ') || '',
      description: post.excerpt || '',
    })),
  ];
  return [...calculators, ...blogs];
};

const HomeInvestopedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedSearchIndex, setSelectedSearchIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'calculators' | 'tools' | 'resources'>('calculators');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultListRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const searchDatabase = useMemo(() => buildSearchDatabase(), []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 120);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return searchDatabase
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q) ||
          item.path.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [debouncedQuery, searchDatabase]);

  const showSearchResults = searchResults.length > 0 && searchQuery.length >= 2 && isSearchFocused;

  useEffect(() => {
    setSelectedSearchIndex(0);
  }, [searchResults.length]);

  useEffect(() => {
    if (!showSearchResults || !resultListRef.current) return;
    const el = resultListRef.current.querySelector(`[data-result-index="${selectedSearchIndex}"]`);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedSearchIndex, showSearchResults]);

  const handleSearchItemClick = useCallback(
    (path: string) => {
      navigate(path);
      setSearchQuery('');
      setIsSearchFocused(false);
      searchInputRef.current?.blur();
    },
    [navigate]
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchResults.length > 0) {
        handleSearchItemClick(searchResults[selectedSearchIndex]?.path ?? searchResults[0].path);
      }
    },
    [searchResults, selectedSearchIndex, handleSearchItemClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showSearchResults) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSearchIndex((i) => (i + 1) % searchResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSearchIndex((i) => (searchResults.length + i - 1) % searchResults.length);
      } else if (e.key === 'Enter' && searchResults.length > 0) {
        e.preventDefault();
        handleSearchItemClick(searchResults[selectedSearchIndex]?.path ?? searchResults[0].path);
      } else if (e.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    },
    [showSearchResults, searchResults, selectedSearchIndex, handleSearchItemClick]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCategories = useMemo(() => {
    if (!selectedCategory) return calculatorCategories;
    return calculatorCategories.filter((cat) => cat.id === selectedCategory);
  }, [selectedCategory]);

  const popularCalculators = [
    { id: 'emi-calculator', name: 'EMI', path: '/calculators/emi-calculator', icon: IndianRupee },
    { id: 'sip-calculator', name: 'SIP', path: '/calculators/sip-calculator', icon: TrendingUp },
    { id: 'income-tax-calculator', name: 'Income Tax', path: '/calculators/income-tax-calculator', icon: FileText },
    { id: 'gst-calculator', name: 'GST', path: '/calculators/gst-calculator', icon: DollarSign },
    { id: 'ppf-calculator', name: 'PPF', path: '/calculators/ppf-calculator', icon: PiggyBank },
    { id: 'home-loan-calculator', name: 'Home Loan', path: '/calculators/home-loan-calculator', icon: Home },
    { id: 'fd-calculator', name: 'FD', path: '/calculators/fd-calculator', icon: Building2 },
    { id: 'retirement-calculator', name: 'Retirement', path: '/calculators/retirement-calculator', icon: Umbrella },
  ];

  const totalCalculators = calculatorCategories.reduce((s, c) => s + c.calculators.length, 0);

  return (
    <>
      <SEOHelmet
        title="MoneyCal.in - Free Financial Calculators & Tools for India | 100+ Calculators"
        description="India's most comprehensive financial platform. 100+ free calculators for EMI, SIP, Income Tax, GST, PPF, FD, Home Loan, and more. Mobile-friendly, fast, and trusted by 1M+ users."
        keywords="financial calculators India, GST Calculator, SIP Calculator, EMI Calculator, income tax calculator, PPF Calculator, FD Calculator, home loan calculator, tax calculator, investment calculator"
        canonicalUrl="https://moneycal.in"
      />

      <div className="min-h-screen bg-slate-50/60">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-slate-50/40 pt-6 pb-8 sm:pt-8 sm:pb-10 safe-area-inset-top">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)] pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                Free financial tools
                <span className="text-emerald-600"> for India</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
                {totalCalculators}+ calculators • Expert guides • Always free
              </p>

              {/* Search */}
              <div ref={searchContainerRef} className="relative max-w-2xl mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:shadow-emerald-500/20 transition-all duration-200">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search calculators, tools, articles…"
                      className="w-full pl-12 pr-12 py-3.5 sm:py-4 text-base rounded-2xl border-0 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0 min-h-[48px] sm:min-h-[52px]"
                      autoComplete="off"
                      aria-label="Search calculators and articles"
                      aria-expanded={showSearchResults}
                      aria-controls="search-results-list"
                      aria-activedescendant={showSearchResults ? `result-${selectedSearchIndex}` : undefined}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors touch-manipulation"
                        aria-label="Clear search"
                      >
                        <span className="sr-only">Clear</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </div>

                  {showSearchResults && (
                    <div
                      id="search-results-list"
                      ref={resultListRef}
                      role="listbox"
                      className="absolute z-50 w-full mt-2 rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden max-h-[min(70vh,320px)] overflow-y-auto custom-scrollbar"
                    >
                      <div className="sticky top-0 bg-slate-50/95 backdrop-blur px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>{searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</span>
                        <span className="hidden sm:inline">↑↓ navigate · Enter open · Esc close</span>
                      </div>
                      <div className="py-1">
                        {searchResults.map((result, idx) => {
                          const isSelected = idx === selectedSearchIndex;
                          return (
                            <button
                              key={`${result.path}-${idx}`}
                              type="button"
                              role="option"
                              id={showSearchResults ? `result-${idx}` : undefined}
                              data-result-index={idx}
                              aria-selected={isSelected}
                              onClick={() => handleSearchItemClick(result.path)}
                              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors touch-manipulation min-h-[48px] ${
                                isSelected ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-slate-50 text-slate-900'
                              }`}
                            >
                              <span className="flex-1 min-w-0">
                                <span className="font-medium block truncate">{result.name}</span>
                                <span className="text-xs text-slate-500 mt-0.5 block">{result.category}</span>
                              </span>
                              <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-300'}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs - sticky, touch-friendly */}
        <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm safe-area-inset-top">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-1 overflow-x-auto py-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                onClick={() => setActiveTab('calculators')}
                className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all touch-manipulation active-scale ${
                  activeTab === 'calculators'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <IndianRupee className="w-4 h-4 inline mr-2 -translate-y-0.5" />
                Calculators ({totalCalculators}+)
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all touch-manipulation active-scale ${
                  activeTab === 'tools'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Wrench className="w-4 h-4 inline mr-2 -translate-y-0.5" />
                Tools
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`min-h-[44px] min-w-[44px] px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all touch-manipulation active-scale ${
                  activeTab === 'resources'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FolderOpen className="w-4 h-4 inline mr-2 -translate-y-0.5" />
                Resources
              </button>
            </div>
          </div>
        </section>

        {activeTab === 'calculators' && (
          <>
            <section className="py-6 sm:py-8 bg-white border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Popular</h2>
                  <Link
                    to="/calculators"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 touch-manipulation"
                  >
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {popularCalculators.map((calc) => {
                    const Icon = calc.icon;
                    return (
                      <Link
                        key={calc.id}
                        to={calc.path}
                        className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-0.5 transition-all duration-200 group text-center touch-manipulation active-scale"
                      >
                        <div className="w-11 h-11 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-600 transition-colors">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-emerald-700 line-clamp-2">{calc.name}</h3>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="py-4 bg-slate-50/50 border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors touch-manipulation min-h-[40px] ${
                      selectedCategory === null ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    All
                  </button>
                  {calculatorCategories.map((category) => {
                    const Icon = categoryIcons[category.name] || Calculator;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 touch-manipulation min-h-[40px] ${
                          selectedCategory === category.id ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        {category.name.split(' ')[0]} ({category.calculators.length})
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="py-6 sm:py-8 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredCategories.map((category) => {
                  const CategoryIcon = categoryIcons[category.name] || Calculator;
                  return (
                    <div key={category.id} className="mb-8 last:mb-0">
                      <div className="flex items-center gap-2 mb-4">
                        <CategoryIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <h3 className="text-lg font-bold text-slate-900">{category.name}</h3>
                        <span className="text-xs text-slate-500">({category.calculators.length})</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {category.calculators.map((calc) => (
                          <Link
                            key={calc.id}
                            to={`/calculators/${calc.id}`}
                            className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group touch-manipulation active-scale"
                          >
                            <h4 className="font-semibold text-sm text-slate-900 mb-1 group-hover:text-emerald-700 line-clamp-2">
                              {calc.name}
                            </h4>
                            <p className="text-xs text-slate-600 line-clamp-2">{calc.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {activeTab === 'tools' && (
          <section className="py-6 sm:py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {[
                  { name: 'Finance Tools', path: '/finance-tools', icon: DollarSign, count: '25+', color: 'bg-blue-50 text-blue-600' },
                  { name: 'Tax Tools', path: '/tax-tools', icon: FileText, count: '40+', color: 'bg-green-50 text-green-600' },
                  { name: 'GST Tools', path: '/gst-tools', icon: IndianRupee, count: '20+', color: 'bg-purple-50 text-purple-600' },
                  { name: 'Excel Tools', path: '/excel-tools', icon: BarChart3, count: '50+', color: 'bg-orange-50 text-orange-600' },
                  { name: 'Bank Tools', path: '/bank-tools', icon: Building2, count: '10+', color: 'bg-cyan-50 text-cyan-600' },
                  { name: 'Loan Tools', path: '/loan-tools', icon: Home, count: '15+', color: 'bg-teal-50 text-teal-600' },
                  { name: 'Insurance Tools', path: '/insurance-tools', icon: Heart, count: '8+', color: 'bg-pink-50 text-pink-600' },
                  { name: 'Gold Tools', path: '/gold-tools', icon: Gem, count: '5+', color: 'bg-amber-50 text-amber-600' },
                  { name: 'Invoicing Tools', path: '/invoicing-tools', icon: Receipt, count: '12+', color: 'bg-violet-50 text-violet-600' },
                  { name: 'Festival Tools', path: '/festival-tools', icon: CalendarIcon, count: '10+', color: 'bg-rose-50 text-rose-600' },
                  { name: 'Corporate Tools', path: '/corporate-finance', icon: Briefcase, count: '20+', color: 'bg-slate-100 text-slate-600' },
                  { name: 'All Tools', path: '/tools', icon: Wrench, count: '200+', color: 'bg-indigo-50 text-indigo-600' },
                ].map((tool, idx) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={idx}
                      to={tool.path}
                      className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200/80 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center group touch-manipulation active-scale"
                    >
                      <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-sm text-slate-900 mb-1 group-hover:text-emerald-700">{tool.name}</h3>
                      <span className="text-xs text-slate-500">{tool.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'resources' && (
          <section className="py-6 sm:py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {[
                  { name: 'Learn', path: '/learn', icon: BookOpen, count: '40+', color: 'bg-emerald-50 text-emerald-600' },
                  { name: 'Blog', path: '/blog', icon: FileText, count: '150+', color: 'bg-blue-50 text-blue-600' },
                  { name: 'News', path: '/news', icon: Newspaper, count: '100+', color: 'bg-red-50 text-red-600' },
                  { name: 'Govt Schemes', path: '/government-schemes', icon: Gift, count: '50+', color: 'bg-amber-50 text-amber-600' },
                  { name: 'Crypto', path: '/crypto', icon: Coins, count: '30+', color: 'bg-purple-50 text-purple-600' },
                  { name: 'Astro Finance', path: '/astro-finance', icon: Sparkles, count: '13+', color: 'bg-indigo-50 text-indigo-600' },
                  { name: 'Festival', path: '/festival-tools', icon: CalendarIcon, count: '25+', color: 'bg-rose-50 text-rose-600' },
                  { name: 'Corporate', path: '/corporate-finance', icon: Briefcase, count: '15+', color: 'bg-slate-100 text-slate-600' },
                  { name: 'Personal Finance', path: '/personal-finance-management', icon: PiggyBank, count: '20+', color: 'bg-cyan-50 text-cyan-600' },
                  { name: 'Religious', path: '/religious-tools', icon: Scale, count: '10+', color: 'bg-amber-50 text-amber-600' },
                ].map((resource, idx) => {
                  const Icon = resource.icon;
                  return (
                    <Link
                      key={idx}
                      to={resource.path}
                      className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200/80 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center group touch-manipulation active-scale"
                    >
                      <div className={`w-12 h-12 ${resource.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold text-sm text-slate-900 mb-1 group-hover:text-emerald-700">{resource.name}</h3>
                      <span className="text-xs text-slate-500">{resource.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Why us */}
        <section className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100 pb-safe">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">Why MoneyCal.in</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: CheckCircle, title: '100% Free', desc: 'No signup, no limits' },
                { icon: Shield, title: 'Secure', desc: 'Data stays in your browser' },
                { icon: Award, title: 'Expert verified', desc: 'Reliable calculations' },
                { icon: Zap, title: 'Fast', desc: 'Lightweight & quick' },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 text-center shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-900 mb-1">{feature.title}</h3>
                    <p className="text-xs text-slate-600">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomeInvestopedia;
