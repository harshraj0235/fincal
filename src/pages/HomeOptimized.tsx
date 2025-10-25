import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, Search, TrendingUp, BookOpen, Shield, 
  Award, Users, CheckCircle2, Clock, ArrowRight,
  Star, Target, PiggyBank, Home as HomeIcon, FileText,
  BarChart3, Zap, Heart
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import ModernNavbar from '../components/ModernNavbar';
import { Footer } from '../components/Footer';

const HomeOptimized: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();

  // Minimal search database - only essential items
  const searchDatabase = [
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', category: 'Loan' },
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', category: 'Investment' },
    { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator', category: 'Tax' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment' },
    { name: 'Home Loan Calculator', path: '/calculators/home-loan-calculator', category: 'Loan' },
    { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment' },
    { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax' },
  ];

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      const results = searchDatabase.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      ).slice(0, 8);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Popular calculators
  const popularCalculators = [
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', icon: '🧮', description: 'Calculate loan EMI easily', users: '50K+' },
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', icon: '📈', description: 'Plan SIP investments', users: '45K+' },
    { name: 'Income Tax', path: '/tools/income-tax-calculator', icon: '📄', description: 'Calculate tax liability', users: '40K+' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', icon: '💰', description: 'GST calculations', users: '38K+' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', icon: '🏦', description: 'Retirement planning', users: '35K+' },
    { name: 'Home Loan', path: '/calculators/home-loan-calculator', icon: '🏠', description: 'Housing loan EMI', users: '42K+' },
  ];

  // Main categories
  const mainCategories = [
    { name: 'Investment', path: '/finance-tools', icon: '📈', count: '20+', color: 'from-green-500 to-emerald-600' },
    { name: 'Loans', path: '/loan-tools', icon: '🏠', count: '15+', color: 'from-blue-500 to-cyan-600' },
    { name: 'Tax', path: '/tax-tools', icon: '📄', count: '15+', color: 'from-purple-500 to-pink-600' },
    { name: 'GST', path: '/gst-tools', icon: '💰', count: '20+', color: 'from-orange-500 to-red-600' },
    { name: 'Insurance', path: '/insurance-tools', icon: '🛡️', count: '10+', color: 'from-indigo-500 to-purple-600' },
    { name: 'Retirement', path: '/calculators/retirement-calculator', icon: '👴', count: '8+', color: 'from-pink-500 to-rose-600' },
  ];

  // Trust badges - Google E-E-A-T
  const trustBadges = [
    { icon: Shield, title: 'Secure & Private', description: 'Data never leaves your browser' },
    { icon: CheckCircle2, title: 'RBI Compliant', description: 'Follows Reserve Bank guidelines' },
    { icon: Users, title: '1M+ Users', description: 'Trusted by professionals' },
    { icon: Award, title: 'Expert Verified', description: 'Reviewed by financial experts' },
  ];

  // Statistics - E-E-A-T signals
  const statistics = [
    { number: '107+', label: 'Calculators', icon: Calculator },
    { number: '1M+', label: 'Monthly Users', icon: Users },
    { number: '4.9/5', label: 'User Rating', icon: Star },
    { number: '100%', label: 'Free Tools', icon: Heart },
  ];

  return (
    <>
      <SEOHelmet
        title="MoneyCal.in - Free Financial Calculators for India | EMI, SIP, Tax, GST"
        description="India's most trusted financial calculator platform. Calculate EMI, SIP returns, income tax, GST, and more. 100% free, secure, and RBI-compliant tools for smart financial planning."
        keywords="financial calculator, EMI calculator, SIP calculator, income tax calculator, GST calculator, loan calculator, investment calculator India"
        canonicalUrl="https://moneycal.in"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <ModernNavbar />

        {/* Hero Section - Above the fold, minimal code */}
        <section className="pt-24 pb-16 px-4" style={{ minHeight: '600px' }}>
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Heading - H1 for SEO */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              India's Most Trusted<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Financial Calculator Platform
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Calculate EMI, SIP, Income Tax, GST & More — 100% Free, Secure & RBI Compliant
            </p>

            {/* Search Bar - Critical UX */}
            <div className="max-w-2xl mx-auto mb-8 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search calculators... EMI, SIP, Tax, GST"
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  aria-label="Search financial calculators"
                />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  <div className="p-4">
                    {searchResults.map((result, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate(result.path)}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-semibold text-gray-900">{result.name}</div>
                        <div className="text-sm text-gray-600">{result.category}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/calculators/emi-calculator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow"
              >
                <Calculator className="w-5 h-5" />
                Start Calculating
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-blue-500 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Learn Finance
              </Link>
            </div>

            {/* Statistics - E-E-A-T Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {statistics.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Calculators - Quick Access */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
              Most Popular Calculators
            </h2>
            <p className="text-gray-600 text-center mb-10">
              Used by over 1 million Indians for smart financial planning
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCalculators.map((calc, idx) => (
                <Link
                  key={idx}
                  to={calc.path}
                  className="group p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{calc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {calc.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{calc.description}</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{calc.users} users</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>

            {/* View All */}
            <div className="text-center mt-8">
              <Link
                to="/calculators"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All 107+ Calculators
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Categories - Clear Navigation */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
              Browse by Category
            </h2>
            <p className="text-gray-600 text-center mb-10">
              Find the perfect calculator for your financial needs
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mainCategories.map((category, idx) => (
                <Link
                  key={idx}
                  to={category.path}
                  className="group p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} tools</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & E-E-A-T Section - Google Compliance */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
              Why Choose MoneyCal.in?
            </h2>
            <p className="text-gray-600 text-center mb-10">
              Trusted by over 1 million Indians for accurate financial calculations
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustBadges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div key={idx} className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{badge.title}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                );
              })}
            </div>

            {/* E-E-A-T Expertise Signals */}
            <div className="mt-12 p-8 bg-blue-50 rounded-2xl border-l-4 border-blue-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <h3 className="font-bold text-gray-900 mb-2">Expert Verified</h3>
                  <p className="text-sm text-gray-600">Reviewed by certified financial advisors</p>
                </div>
                <div className="text-center">
                  <Shield className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h3 className="font-bold text-gray-900 mb-2">RBI Guidelines</h3>
                  <p className="text-sm text-gray-600">Compliant with Indian regulations</p>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                  <h3 className="font-bold text-gray-900 mb-2">Regular Updates</h3>
                  <p className="text-sm text-gray-600">Updated with latest tax & interest rates</p>
                </div>
              </div>
            </div>

            {/* Legal Disclaimer - Transparency for E-E-A-T */}
            <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Important Disclaimer</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    MoneyCal.in provides financial calculators for educational purposes only. 
                    Results are estimates and should not be considered as professional financial advice. 
                    Please consult with a certified financial advisor, chartered accountant, or tax 
                    professional before making financial decisions. We do not collect or store your personal data.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Privacy Policy →
                    </Link>
                    <Link to="/terms-and-conditions" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Terms & Conditions →
                    </Link>
                    <Link to="/disclaimer" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Full Disclaimer →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - User Journey */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Choose Calculator', description: 'Select from 107+ financial calculators', icon: Target },
                { step: '2', title: 'Enter Details', description: 'Fill in your financial information', icon: FileText },
                { step: '3', title: 'Get Results', description: 'Instant, accurate calculations', icon: Zap },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {item.step}
                    </div>
                    <Icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 1 million+ Indians using MoneyCal.in for smart financial planning
            </p>
            <Link
              to="/calculators/emi-calculator"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg hover:shadow-2xl transition-shadow"
            >
              <Calculator className="w-6 h-6" />
              Calculate Now - It's Free!
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomeOptimized;

