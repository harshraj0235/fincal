"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, Search, ArrowRight, Star, TrendingUp, Wallet,
  BadgePercent, Home, Car, Building2, Landmark, PiggyBank,
  Shield, ChartBar, Coins, BarChart3, CreditCard, Users,
  GraduationCap, Banknote, Scale
} from 'lucide-react';
import { calculatorCategories } from '@/data/calculatorData';

const categoryIcons: Record<string, React.ReactNode> = {
  'Loan Calculators': <Wallet className="w-5 h-5" />,
  'Investment Calculators': <TrendingUp className="w-5 h-5" />,
  'Tax Calculators': <BadgePercent className="w-5 h-5" />,
  'Real Estate Calculators': <Home className="w-5 h-5" />,
  'Insurance Calculators': <Shield className="w-5 h-5" />,
  'Banking & Finance Tools': <Landmark className="w-5 h-5" />,
  'Business Calculators': <Building2 className="w-5 h-5" />,
  'FinTech & Payments': <CreditCard className="w-5 h-5" />,
  'Investments & Wealth Management': <ChartBar className="w-5 h-5" />,
  'Math & Education': <GraduationCap className="w-5 h-5" />,
  'Personal Finance': <PiggyBank className="w-5 h-5" />,
  'Trading & Markets': <BarChart3 className="w-5 h-5" />,
};

const categoryGradients: string[] = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-violet-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-sky-600',
  'from-lime-500 to-green-600',
  'from-fuchsia-500 to-purple-600',
  'from-red-500 to-rose-600',
  'from-teal-500 to-emerald-600',
  'from-indigo-500 to-blue-600',
  'from-orange-500 to-amber-600',
];

const popularCalcIds = [
  'emi-calculator', 'sip-calculator', 'income-tax-calculator', 'mutual-fund-returns-calculator',
  'ppf-calculator', 'fd-calculator', 'home-loan-calculator', 'gst-calculator',
  'nps-calculator', 'retirement-calculator', 'rd-calculator', 'car-loan-calculator'
];

export default function CalculatorsHubClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCalculators = useMemo(() =>
    calculatorCategories.flatMap(cat =>
      cat.calculators.map(calc => ({ ...calc, categoryName: cat.name, categoryId: cat.id }))
    ), []
  );

  const popularCalculators = useMemo(() =>
    popularCalcIds
      .map(id => allCalculators.find(c => c.id === id))
      .filter(Boolean) as typeof allCalculators,
    [allCalculators]
  );

  const filteredCategories = useMemo(() => {
    if (!search.trim() && !activeCategory) return calculatorCategories;
    
    return calculatorCategories
      .filter(cat => !activeCategory || cat.id === activeCategory)
      .map(cat => ({
        ...cat,
        calculators: cat.calculators.filter(calc =>
          !search.trim() ||
          calc.name.toLowerCase().includes(search.toLowerCase()) ||
          calc.description.toLowerCase().includes(search.toLowerCase()) ||
          (calc.keywords || []).some(k => k.toLowerCase().includes(search.toLowerCase()))
        )
      }))
      .filter(cat => cat.calculators.length > 0);
  }, [search, activeCategory]);

  const totalCalcs = allCalculators.length;

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              <span>{totalCalcs}+ Free Financial Calculators</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
              All Financial Calculators
              <span className="block text-blue-200 text-xl sm:text-2xl font-medium mt-2">
                EMI, SIP, Tax, PPF, NPS & More — India&apos;s Most Trusted
              </span>
            </h1>
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Use our free online calculators for loans, investments, tax planning, insurance and more. 
              Bank-grade accuracy, instant results, no signup required.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search calculators... (e.g., EMI, SIP, Income Tax)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 justify-center -mt-6 mb-10 relative z-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
              !activeCategory
                ? 'bg-indigo-600 text-white shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            All ({totalCalcs})
          </button>
          {calculatorCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-indigo-200'
                  : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-200'
              }`}
            >
              {cat.name.replace(' Calculators', '').replace(' Calculator', '')} ({cat.calculators.length})
            </button>
          ))}
        </div>

        {/* Popular Calculators (when not searching / filtering) */}
        {!search && !activeCategory && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Star className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Most Popular Calculators</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularCalculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.url || `/calculators/${calc.id}`}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white flex-shrink-0 shadow-lg shadow-indigo-200/50">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm leading-snug">
                        {calc.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {calc.description.substring(0, 80)}...
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Calculator <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Categories */}
        {filteredCategories.map((cat, catIndex) => (
          <section key={cat.id} className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${categoryGradients[catIndex % categoryGradients.length]} text-white shadow-lg`}>
                {categoryIcons[cat.name] || <Calculator className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{cat.name}</h2>
                <p className="text-sm text-slate-500">{cat.calculators.length} calculators</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {cat.calculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.url || `/calculators/${calc.id}`}
                  className="group flex items-center gap-3 bg-white rounded-xl border border-slate-200/80 p-4 hover:shadow-lg hover:border-indigo-200 transition-all duration-200"
                >
                  <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${categoryGradients[catIndex % categoryGradients.length]} flex-shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-slate-800 group-hover:text-indigo-600 text-sm truncate transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">{calc.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 flex-shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No calculators found</h3>
            <p className="text-slate-500">Try a different search term or browse all categories.</p>
            <button onClick={() => { setSearch(''); setActiveCategory(null); }} className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
              Show All
            </button>
          </div>
        )}

        {/* Trust Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Why 10 Lakh+ Indians Trust MoneyCal</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Bank-grade accuracy, privacy-first design, and AI-powered insights — all 100% free, forever.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Free Calculators', value: `${totalCalcs}+` },
              { label: 'Monthly Users', value: '2M+' },
              { label: 'Accuracy', value: '100%' },
              { label: 'Cost', value: 'Free' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-blue-400">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
