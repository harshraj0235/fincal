import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, Search, TrendingUp, BookOpen, Shield, Award, Users,
  CheckCircle2, ArrowRight, Star, Heart, Zap, Target, FileText,
  BarChart3, PiggyBank, Home as HomeIcon, DollarSign, Building,
  Umbrella, Gift, PartyPopper, Rocket, Tag, Sparkles, ChevronRight
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import ProfessionalNavbar from '../components/ProfessionalNavbar';
import { Footer } from '../components/Footer';
import { loadBlogData } from '../data/lazyBlogData';

const HomeProfessional: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBlogData().then(data => {
      setBlogPosts([...(data.blogPosts0 || []).slice(0, 6), ...(data.blogPosts1 || []).slice(0, 6)]);
    }).catch(() => {});
  }, []);

  const searchDatabase = [
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', category: 'Loan', icon: '🧮' },
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', category: 'Investment', icon: '📈' },
    { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator', category: 'Tax', icon: '📄' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', category: 'GST', icon: '💰' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', category: 'Investment', icon: '🏦' },
    { name: 'Home Loan Calculator', path: '/calculators/home-loan-calculator', category: 'Loan', icon: '🏠' },
    { name: 'FD Calculator', path: '/calculators/compound-interest-calculator', category: 'Investment', icon: '💰' },
    { name: 'HRA Calculator', path: '/calculators/hra-calculator', category: 'Tax', icon: '🏠' },
    { name: 'Retirement Calculator', path: '/calculators/retirement-calculator', category: 'Planning', icon: '👴' },
    { name: 'NPS Calculator', path: '/calculators/nps-calculator', category: 'Planning', icon: '🎯' },
  ];

  const searchResults = useMemo(() => {
    if (searchQuery.trim().length > 1) {
      return searchDatabase.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8);
    }
    return [];
  }, [searchQuery]);

  // Popular calculators
  const popularCalculators = [
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', icon: '🧮', desc: 'Calculate loan EMI & interest', users: '50K+' },
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', icon: '📈', desc: 'Plan mutual fund investments', users: '45K+' },
    { name: 'Income Tax', path: '/tools/income-tax-calculator', icon: '📄', desc: 'Calculate tax liability 2025', users: '40K+' },
    { name: 'GST Calculator', path: '/tools/gst-amount-calculator', icon: '💰', desc: 'GST inclusive/exclusive', users: '38K+' },
    { name: 'PPF Calculator', path: '/calculators/ppf-calculator', icon: '🏦', desc: 'Public Provident Fund returns', users: '35K+' },
    { name: 'Home Loan', path: '/calculators/home-loan-calculator', icon: '🏠', desc: 'Housing loan EMI calculator', users: '42K+' },
  ];

  // Main categories
  const mainCategories = [
    { name: 'Investment Tools', path: '/finance-tools', icon: '📈', count: '20+', color: 'from-green-500 to-emerald-600', desc: 'SIP, PPF, FD, Mutual Funds' },
    { name: 'Loan Calculators', path: '/loan-tools', icon: '🏠', count: '15+', color: 'from-blue-500 to-cyan-600', desc: 'EMI, Home, Car, Personal' },
    { name: 'Tax Planning', path: '/tax-tools', icon: '📄', count: '15+', color: 'from-purple-500 to-pink-600', desc: 'Income Tax, HRA, Capital Gains' },
    { name: 'GST Tools', path: '/gst-tools', icon: '💰', count: '20+', color: 'from-orange-500 to-red-600', desc: 'GST Calculator, HSN/SAC Finder' },
    { name: 'Insurance', path: '/insurance-tools', icon: '🛡️', count: '10+', color: 'from-indigo-500 to-purple-600', desc: 'Life, Health, Term Insurance' },
    { name: 'Retirement', path: '/calculators/retirement-calculator', icon: '👴', count: '8+', color: 'from-pink-500 to-rose-600', desc: 'NPS, EPF, Pension, Gratuity' },
  ];

  // Festival Tool Categories with CORRECT routes
  const festivalCategories = [
    { name: 'Date & Calendar', path: '/festival-tools', icon: '📅', desc: 'Panchang, Tithi, Muhurat dates' },
    { name: 'Planning & Shopping', path: '/festival-tools', icon: '🛍️', desc: 'Festival shopping planners' },
    { name: 'Finance & Money', path: '/festival-tools', icon: '💰', desc: 'Festival budget calculators' },
    { name: 'Religious', path: '/festival-tools', icon: '🙏', desc: 'Puja, Vrat, Religious dates' },
    { name: 'Fun & Games', path: '/fun-engagement', icon: '🎮', desc: 'Festival games & quizzes' },
    { name: 'Design', path: '/design-tools', icon: '🎨', desc: 'Cards, invitations, templates' },
    { name: 'Information', path: '/festival-info', icon: '📖', desc: 'Festival history & traditions' },
    { name: 'Corporate', path: '/festival-corporate-tools', icon: '💼', desc: 'Corporate festival bonuses' },
    { name: 'Regional', path: '/regional-tools', icon: '🗺️', desc: 'Regional festival calendars' },
    { name: 'SEO Tools', path: '/seo-tools', icon: '📊', desc: 'Festival content optimization' },
  ];

  // Festival tools
  const festivalTools = [
    { name: 'Lunar Eclipse 2025', path: '/festival-tools/lunar-eclipse-predictor', icon: '🌑' },
    { name: 'Marriage Muhurat', path: '/festival-tools/auspicious-marriage-days', icon: '💍' },
    { name: 'Panchang Today', path: '/festival-tools/panchang-today', icon: '📅' },
    { name: 'Weekly Tithi', path: '/festival-tools/weekly-tithi-finder', icon: '📆' },
    { name: 'Purnima Amavasya', path: '/festival-tools/purnima-amavasya-dates', icon: '🌕' },
    { name: 'Vrat Calendar', path: '/festival-tools/vrat-upavas-calendar', icon: '🙏' },
  ];

  // Learning courses
  const learningCourses = [
    { name: 'Gold Loans', path: '/learn/gold-loans', icon: '🏆', lessons: '10' },
    { name: 'Credit Cards', path: '/learn/credit-cards', icon: '💳', lessons: '20' },
    { name: 'Credit Score', path: '/learn/credit-score', icon: '📊', lessons: '10' },
  ];

  // Statistics
  const stats = [
    { number: '107+', label: 'Calculators', icon: Calculator },
    { number: '1M+', label: 'Users', icon: Users },
    { number: '4.9/5', label: 'Rating', icon: Star },
    { number: '100%', label: 'Free', icon: Heart },
  ];

  // Trust signals
  const trustSignals = [
    { icon: CheckCircle2, title: 'RBI Compliant', desc: 'Follows Reserve Bank guidelines' },
    { icon: Shield, title: 'Secure & Private', desc: 'Data never leaves your browser' },
    { icon: Award, title: 'Expert Verified', desc: 'Reviewed by financial advisors' },
    { icon: Users, title: '1M+ Trusted Users', desc: 'Used by professionals daily' },
  ];

  return (
    <>
      <SEOHelmet
        title="MoneyCal.in - #1 Financial Calculator Platform in India | EMI, SIP, Tax, GST"
        description="India's most comprehensive financial calculator platform. Free EMI, SIP, Income Tax, GST, PPF, and 100+ calculators. RBI-compliant, secure, and trusted by 1M+ users."
        keywords="financial calculator, EMI calculator, SIP calculator, income tax calculator, GST calculator, PPF calculator, home loan, investment calculator India"
        canonicalUrl="https://moneycal.in"
      />

      <div className="min-h-screen bg-gray-50">
        <ProfessionalNavbar />

        {/* Hero Section - Professional */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" style={{ minHeight: '650px' }}>
          <div className="max-w-6xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Trusted by 1,000,000+ Indians
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              India's #1 Financial<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Calculator Platform
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
              Free EMI, SIP, Tax & GST Calculators — Secure, Accurate & RBI-Compliant
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-10 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators... EMI, SIP, Tax, GST, PPF"
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none bg-white shadow-sm"
              />
              
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto z-50">
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => { navigate(result.path); setSearchQuery(''); }}
                      className="w-full text-left px-4 py-3.5 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3"
                    >
                      <span className="text-2xl">{result.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{result.name}</div>
                        <div className="text-sm text-gray-600">{result.category}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/calculators/emi-calculator"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow"
              >
                <Calculator className="w-5 h-5" />
                Start Calculating Free
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-blue-500 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Learn Finance (40 Lessons)
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="w-10 h-10 mx-auto mb-2 text-blue-600" />
                    <div className="text-3xl md:text-4xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular Calculators */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Most Popular Financial Calculators
              </h2>
              <p className="text-lg text-gray-600">
                Calculate EMI, SIP, Tax & more — Used by 1M+ Indians
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCalculators.map((calc) => (
                <Link
                  key={calc.path}
                  to={calc.path}
                  className="group p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{calc.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {calc.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">{calc.desc}</p>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 font-medium">{calc.users} users</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/calculators"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All 107+ Calculators
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Browse by Category
              </h2>
              <p className="text-lg text-gray-600">
                Find the perfect calculator for your financial needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainCategories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="group p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all"
                >
                  <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-md`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{category.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600">{category.count} tools</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Festival Tool Categories - CORRECT ROUTES */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                🎊 Festival Tool Categories
              </h2>
              <p className="text-lg text-gray-600">
                Complete festival planning and cultural tools for all occasions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {festivalCategories.map((category) => (
                <Link
                  key={category.path + category.name}
                  to={category.path}
                  className="group p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200 hover:border-orange-500 hover:shadow-lg transition-all text-center"
                >
                  <span className="text-4xl mb-3 block">{category.icon}</span>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600">{category.desc}</p>
                </Link>
              ))}
            </div>

            {/* Festival Tools Grid */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {festivalTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all text-center"
                >
                  <span className="text-4xl mb-2 block">{tool.icon}</span>
                  <div className="text-xs font-semibold text-gray-900">{tool.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                📚 Learn Financial Planning
              </h2>
              <p className="text-lg text-gray-600">
                40+ comprehensive lessons to master your finances
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningCourses.map((course) => (
                <Link
                  key={course.path}
                  to={course.path}
                  className="group p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all"
                >
                  <span className="text-6xl mb-4 block">{course.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.lessons} detailed lessons</p>
                  <div className="flex items-center gap-2 text-purple-600 font-semibold">
                    <span>Start Learning</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section - E-E-A-T */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Why 1M+ Indians Trust MoneyCal.in
              </h2>
              <p className="text-lg text-gray-600">
                Secure, accurate, and compliant with Indian financial regulations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {trustSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div key={signal.title} className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{signal.title}</h3>
                    <p className="text-sm text-gray-600">{signal.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Legal Disclaimer */}
            <div className="p-6 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Important Legal Disclaimer</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    MoneyCal.in provides financial calculators for educational and informational purposes only. 
                    Results are estimates and should not be considered as professional financial advice. 
                    Please consult with a certified financial advisor, chartered accountant, or tax professional 
                    before making any financial decisions. We do not collect, store, or share your personal data. 
                    All calculations are performed locally in your browser for maximum security and privacy.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      Privacy Policy →
                    </Link>
                    <Link to="/terms-and-conditions" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      Terms & Conditions →
                    </Link>
                    <Link to="/disclaimer" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      Full Disclaimer →
                    </Link>
                    <Link to="/about-us" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      About Us →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join 1,000,000+ Indians using MoneyCal.in for smart financial planning
            </p>
            <Link
              to="/calculators/emi-calculator"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-lg font-bold text-lg hover:shadow-2xl transition-shadow"
            >
              <Calculator className="w-6 h-6" />
              Calculate Now - Completely Free!
            </Link>
            <p className="mt-6 text-blue-100 text-sm">
              ✅ No signup required • ✅ 100% free forever • ✅ Your data stays private
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomeProfessional;

