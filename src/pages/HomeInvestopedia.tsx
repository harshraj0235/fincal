import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, TrendingUp, Shield, Users, Award, CheckCircle,
  ArrowRight, Star, Lock, FileText, BarChart3, PiggyBank,
  Home, CreditCard, Landmark, TrendingDown, Search, Menu, X
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const HomeInvestopedia: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const calculatorCategories = [
    {
      title: 'Investment Calculators',
      icon: TrendingUp,
      color: 'blue',
      calculators: [
        { name: 'SIP Calculator', path: '/calculators/sip-calculator' },
        { name: 'Mutual Fund Returns', path: '/calculators/mutual-fund-returns-calculator' },
        { name: 'PPF Calculator', path: '/calculators/ppf-calculator' },
        { name: 'FD Calculator', path: '/calculators/fixed-deposit-calculator' },
      ]
    },
    {
      title: 'Loan Calculators',
      icon: Home,
      color: 'green',
      calculators: [
        { name: 'EMI Calculator', path: '/calculators/emi-calculator' },
        { name: 'Home Loan Calculator', path: '/calculators/home-loan-calculator' },
        { name: 'Personal Loan', path: '/calculators/personal-loan-calculator' },
        { name: 'Car Loan', path: '/calculators/car-loan-calculator' },
      ]
    },
    {
      title: 'Tax Calculators',
      icon: FileText,
      color: 'purple',
      calculators: [
        { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator' },
        { name: 'HRA Calculator', path: '/calculators/hra-calculator' },
        { name: 'Capital Gains Tax', path: '/calculators/capital-gains-tax-calculator' },
        { name: 'TDS Calculator', path: '/calculators/tds-calculator' },
      ]
    },
    {
      title: 'GST Tools',
      icon: BarChart3,
      color: 'orange',
      calculators: [
        { name: 'GST Calculator', path: '/tools/gst-amount-calculator' },
        { name: 'HSN/SAC Finder', path: '/tools/gst-hsn-sac-finder' },
        { name: 'Reverse GST', path: '/tools/reverse-gst-calculator' },
        { name: 'GST Liability', path: '/tools/gst-liability-calculator' },
      ]
    },
  ];

  const trustIndicators = [
    { icon: Shield, title: '100% Free', description: 'All tools are completely free to use' },
    { icon: Lock, title: 'Secure & Private', description: 'Your data is never stored or shared' },
    { icon: CheckCircle, title: 'Accurate Results', description: 'Calculations verified by experts' },
    { icon: Users, title: '1M+ Users', description: 'Trusted by millions across India' },
  ];

  const stats = [
    { number: '107+', label: 'Financial Calculators' },
    { number: '1M+', label: 'Happy Users' },
    { number: '5M+', label: 'Calculations Done' },
    { number: '100%', label: 'Free Forever' },
  ];

  return (
    <>
      <SEOHelmet
        title="MoneyCal.in - Free Financial Calculators for India | EMI, SIP, Tax, GST"
        description="India's most trusted financial calculator platform. Calculate EMI, SIP returns, income tax, GST, and more. 100% free, secure, and accurate financial planning tools."
        canonicalUrl="https://moneycal.in"
      />

      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MoneyCal.in</h1>
                <p className="text-xs text-gray-600">Financial Calculators</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/calculators" className="text-gray-700 hover:text-blue-600 font-medium">Calculators</Link>
              <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium">Blog</Link>
              <Link to="/learn" className="text-gray-700 hover:text-blue-600 font-medium">Learn</Link>
              <Link to="/about-us" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
              <Link to="/contact-us" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact Us
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link to="/calculators" className="block py-2 text-gray-700 hover:text-blue-600">Calculators</Link>
              <Link to="/blog" className="block py-2 text-gray-700 hover:text-blue-600">Blog</Link>
              <Link to="/learn" className="block py-2 text-gray-700 hover:text-blue-600">Learn</Link>
              <Link to="/about-us" className="block py-2 text-gray-700 hover:text-blue-600">About</Link>
              <Link to="/contact-us" className="block py-2 px-4 bg-blue-600 text-white rounded-lg text-center">Contact Us</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Professional White Theme */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-semibold">India's Most Trusted Financial Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Make Smarter <span className="text-blue-600">Financial Decisions</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Access 107+ professional financial calculators for EMI, SIP, Tax, GST, and more. 
                Trusted by over 1 million Indians for accurate financial planning.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for calculators (EMI, SIP, Tax, GST...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none shadow-lg"
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/calculators"
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Explore All Calculators</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/blog"
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-gray-200"
                >
                  Learn Financial Planning
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <indicator.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{indicator.title}</h3>
                <p className="text-gray-600">{indicator.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Financial Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tools for every financial need - from loans to investments, tax planning to GST
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculatorCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200"
              >
                <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <div className="space-y-2">
                  {category.calculators.map((calc, idx) => (
                    <Link
                      key={idx}
                      to={calc.path}
                      className="block text-gray-700 hover:text-blue-600 hover:pl-2 transition-all font-medium"
                    >
                      → {calc.name}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/calculators"
                  className="mt-4 inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                >
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose MoneyCal.in?
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Accurate & Reliable', desc: 'All calculators are verified by financial experts and updated with latest regulations' },
                  { title: 'Easy to Use', desc: 'Simple, intuitive interface designed for everyone - no financial expertise needed' },
                  { title: 'Completely Free', desc: 'No hidden charges, no registration required. All tools are 100% free forever' },
                  { title: 'Privacy First', desc: 'We don\'t store any of your personal data. All calculations happen in your browser' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted Partner</h3>
                <p className="text-gray-700 mb-6">
                  Join over 1 million Indians who trust MoneyCal.in for their financial calculations
                </p>
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mt-2">4.9/5 Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make Better Financial Decisions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start using our free calculators today and take control of your finances
          </p>
          <Link
            to="/calculators"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-xl"
          >
            Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeInvestopedia;
