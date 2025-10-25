import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, Mail, Phone, MapPin, Heart, ArrowUp,
  Facebook, Twitter, Instagram, Linkedin, Youtube
} from 'lucide-react';

export const BeautifulFooter: React.FC = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleDateString('en-IN', { month: 'long' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Popular Calculators',
      links: [
        { name: 'EMI Calculator', path: '/calculators/emi-calculator' },
        { name: 'SIP Calculator', path: '/calculators/sip-calculator' },
        { name: 'Income Tax Calculator', path: '/tools/income-tax-calculator' },
        { name: 'GST Calculator', path: '/tools/gst-amount-calculator' },
        { name: 'PPF Calculator', path: '/calculators/ppf-calculator' },
        { name: 'Home Loan Calculator', path: '/calculators/home-loan-calculator' },
        { name: 'FD Calculator', path: '/calculators/compound-interest-calculator' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'All Calculators', path: '/calculators' },
        { name: 'Financial Education', path: '/learn' },
        { name: 'Blog & Articles', path: '/blog' },
        { name: 'Festival Tools', path: '/festival-tools' },
        { name: 'Government Schemes', path: '/government-schemes' },
        { name: 'Excel Tools', path: '/excel-tools' },
        { name: 'Help Center', path: '/help-center' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Contact Us', path: '/contact-us' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms & Conditions', path: '/terms-and-conditions' },
        { name: 'Disclaimer', path: '/disclaimer' },
        { name: 'Editorial Policy', path: '/editorial-policy' },
        { name: 'Cookie Policy', path: '/cookie-policy' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/moneycal', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/moneycal', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/moneycal', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/moneycal', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@moneycal', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden" style={{ contain: 'layout style paint' }}>
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">MoneyCal.in</div>
                  <div className="text-blue-200 text-sm">Smart Financial Tools</div>
                </div>
              </Link>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                India's most comprehensive financial calculator platform. Trusted by 1M+ users.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:support@moneycal.in" className="hover:text-white">support@moneycal.in</a>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-bold mb-4 text-white">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright with Dynamic Date */}
              <div className="text-gray-400 text-sm text-center md:text-left">
                <p className="mb-1">
                  © {currentYear} MoneyCal.in. All rights reserved.
                </p>
                <p className="text-xs">
                  Last Updated: {currentMonth} {currentYear} • Made with <Heart className="w-3 h-3 inline text-red-400" /> in India
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Legal & Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                🏆 ISO 9001:2015 Certified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                🔒 SSL Secured
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                ✅ RBI Compliant
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                🇮🇳 Made in India
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                👥 1M+ Active Users
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BeautifulFooter;

