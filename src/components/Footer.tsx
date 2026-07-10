import React from 'react';
import { Link } from 'react-router-dom';
import {
  IndianRupee,
  ArrowUp,
  Mail,
  Twitter,
  Linkedin,
  Shield,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  const footerSections = [
    {
      title: 'Loan Calculators',
      links: [
        { name: 'EMI Calculator', href: '/calculators/emi-calculator' },
        { name: 'Home Loan Calculator', href: '/calculators/home-loan-calculator' },
        { name: 'Personal Loan Calculator', href: '/calculators/personal-loan-calculator' },
        { name: 'Car Loan Calculator', href: '/calculators/car-loan-calculator' },
        { name: 'Bike Loan Calculator', href: '/calculators/bike-loan-calculator' },
        { name: 'Business Loan Calculator', href: '/calculators/business-loan-calculator' },
        { name: 'Gold Loan EMI', href: '/calculators/gold-loan-emi-calculator' },
        { name: 'Loan Comparison', href: '/calculators/loan-comparison-calculator' },
        { name: 'Loan Prepayment', href: '/calculators/prepayment-calculator' },
        { name: 'Education Loan', href: '/calculators/education-loan-calculator' },
      ]
    },
    {
      title: 'Investment Tools',
      links: [
        { name: 'SIP Calculator', href: '/calculators/sip-calculator' },
        { name: 'Mutual Fund Returns', href: '/calculators/mutual-fund-returns-calculator' },
        { name: 'PPF Calculator', href: '/calculators/ppf-calculator' },
        { name: 'FD Calculator', href: '/calculators/fd-calculator' },
        { name: 'RD Calculator', href: '/calculators/rd-calculator' },
        { name: 'NPS Calculator', href: '/calculators/nps-calculator' },
        { name: 'Step-Up SIP', href: '/calculators/step-up-sip-calculator' },
        { name: 'Retirement Planner', href: '/calculators/retirement-calculator' },
        { name: 'Compound Interest', href: '/calculators/compound-interest-calculator' },
        { name: 'Sukanya Samriddhi', href: '/calculators/sukanya-samriddhi-calculator' },
      ]
    },
    {
      title: 'Tax & GST Tools',
      links: [
        { name: 'Income Tax Calculator', href: '/calculators/income-tax-calculator' },
        { name: 'GST Calculator', href: '/calculators/gst-calculator' },
        { name: 'Old vs New Regime', href: '/calculators/income-tax-regime-comparison-calculator' },
        { name: 'HRA Exemption', href: '/calculators/hra-exemption-calculator' },
        { name: 'TDS Calculator', href: '/calculators/tds-calculator' },
        { name: 'Capital Gains Tax', href: '/calculators/capital-gains-tax-calculator' },
        { name: 'Section 80C Calculator', href: '/calculators/section-80c-calculator' },
        { name: 'Salary Calculator', href: '/calculators/take-home-salary-calculator' },
        { name: 'GST Tools Hub', href: '/gst-tools' },
        { name: 'Tax Tools Hub', href: '/tax-tools' },
      ]
    },
    {
      title: 'Tools & Resources',
      links: [
        { name: 'Gold Rate Today', href: '/gold-rate' },
        { name: 'Silver Rate Today', href: '/silver-rate' },
        { name: 'IPO Dashboard 2025', href: '/ipo' },
        { name: 'Stock Market', href: '/stock-market' },
        { name: 'Crypto Market', href: '/crypto' },
        { name: 'Government Schemes', href: '/schemes-finder' },
        { name: 'Stamp Duty Calculator', href: '/calculators/stamp-duty-calculator' },
        { name: 'Excel Tools', href: '/excel-tools' },
        { name: 'Bank Tools', href: '/bank-tools' },
        { name: 'Insurance Tools', href: '/insurance-tools' },
        { name: 'Discover Articles', href: '/discover' },
        { name: 'Government Schemes', href: '/government-schemes' },
      ]
    },
    {
      title: 'Learn Finance',
      links: [
        { name: 'Loan Basics (20 Lessons)', href: '/learn/loans' },
        { name: 'Investing & Wealth', href: '/learn/investing' },
        { name: 'Income Tax Guide', href: '/learn/taxation' },
        { name: 'Credit Cards Guide', href: '/learn/credit-cards' },
        { name: 'Credit Score Guide', href: '/learn/credit-score' },
        { name: 'Insurance Guide', href: '/learn/insurance' },
        { name: 'Savings Bank Guide', href: '/learn/savings-bank' },
        { name: 'Finance Blog', href: '/blog' },
        { name: 'Market News', href: '/news' },
        { name: 'All Courses', href: '/learn' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about-us' },
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Editorial Policy', href: '/editorial-policy' },
        { name: 'Disclaimer', href: '/disclaimer' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
        { name: 'Help Center', href: '/help-center' },
        { name: 'Sitemap', href: '/sitemap' },
        { name: 'Browse All Pages', href: '/browse-all' },
      ]
    }
  ];

  // City-specific SEO links for local search
  const cityLinks = [
    { name: 'Gold Rate Mumbai', href: '/gold-rate' },
    { name: 'Gold Rate Delhi', href: '/gold-rate' },
    { name: 'Gold Rate Bangalore', href: '/gold-rate' },
    { name: 'Gold Rate Chennai', href: '/gold-rate' },
    { name: 'Gold Rate Hyderabad', href: '/gold-rate' },
    { name: 'Stamp Duty Maharashtra', href: '/calculators/stamp-duty-calculator' },
    { name: 'Stamp Duty Delhi', href: '/calculators/stamp-duty-calculator' },
    { name: 'SBI Home Loan Rate', href: '/calculators/home-loan-calculator' },
    { name: 'HDFC Home Loan EMI', href: '/calculators/emi-calculator' },
    { name: 'ICICI Personal Loan', href: '/calculators/personal-loan-calculator' },
  ];

  const socialLinks = [
    { name: 'Twitter / X', icon: Twitter, href: 'https://twitter.com/MoneyCalIN' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/moneycal' },
  ];

  const trustBadges = [
    { icon: Shield, text: 'No data stored' },
    { icon: Star, text: '4.8★ Rated' },
    { icon: TrendingUp, text: '2M+ Users/month' },
    { icon: Clock, text: 'Updated June 2026' },
  ];

  return (
    <footer className="bg-[#fafbfc] border-t border-gray-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* ── Brand + Trust Section ────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Brand */}
            <div className="lg:w-72 flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3 mb-5" aria-label="MoneyCal.in Home">
                <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-gray-900">
                  MoneyCal<span className="text-blue-600">.in</span>
                </span>
              </Link>

              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                India's premier free financial calculator platform. 200+ tools for EMI, SIP, tax planning, investments, and more — built for Indian users. No login required.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {trustBadges.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <Icon className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Contact */}
              <a
                href="mailto:support@moneycal.in"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                </div>
                support@moneycal.in
              </a>
            </div>

            {/* Newsletter signup */}
            <div className="flex-1 bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl p-8 text-white">
              <h3 className="text-lg font-black mb-2">📧 Get Weekly Finance Tips</h3>
              <p className="text-blue-100 text-sm mb-5">
                Join 50,000+ Indians who get our weekly newsletter with tax-saving tips, investment insights, and new calculator updates.
              </p>
              <form
                onSubmit={e => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  id="footer-email-subscribe"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder-blue-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-blue-700 rounded-xl text-sm font-black hover:bg-blue-50 transition-colors whitespace-nowrap"
                >
                  Subscribe Free →
                </button>
              </form>
              <p className="text-blue-200 text-xs mt-3">No spam. Unsubscribe anytime. 100% free.</p>
            </div>
          </div>
        </div>

        {/* ── Trust Stats Bar ─────────────────────────────────────────── */}
        <div className="trust-bar border-t border-gray-100 pt-8 mb-8">
          <div className="trust-bar-item">
            <span className="number">200+</span>
            <span className="label">Free Calculators</span>
          </div>
          <div className="trust-bar-item">
            <span className="number">50+</span>
            <span className="label">Learning Modules</span>
          </div>
          <div className="trust-bar-item">
            <span className="number">2M+</span>
            <span className="label">Monthly Users</span>
          </div>
          <div className="trust-bar-item">
            <span className="number">100%</span>
            <span className="label">Free Forever</span>
          </div>
        </div>

        {/* ── Main Link Grid ───────────────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-12 mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-[13px] text-gray-600 hover:text-blue-600 font-medium transition-colors inline-block leading-snug"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── City & Bank SEO Links ─────────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-8 mb-8">
          <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Popular Searches</h5>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {cityLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Disclaimer ───────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-8 mb-8">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            <strong>Disclaimer:</strong> MoneyCal.in provides financial calculators and information for educational purposes only. 
            Results should not be considered as financial advice. Calculations may vary from actual bank figures. 
            Always verify with your bank or a qualified financial advisor before making financial decisions. 
            MoneyCal.in is not affiliated with any bank, SEBI, RBI, or government body.
          </p>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-400 font-medium text-center sm:text-left">
              © 2024–{currentYear} MoneyCal.in · All rights reserved · Last updated {lastUpdated}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-sm transition-all"
                    aria-label={`Follow MoneyCal on ${social.name}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-bold text-gray-500 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
