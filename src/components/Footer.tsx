import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  ArrowUp,
  Mail,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Calculators',
      links: [
        { name: 'EMI Calculator', href: '/calculators/emi-calculator' },
        { name: 'SIP Calculator', href: '/calculators/sip-calculator' },
        { name: 'Income Tax Calculator', href: '/calculators/income-tax-calculator' },
        { name: 'Mutual Fund Calculator', href: '/calculators/mutual-fund-returns-calculator' },
        { name: 'PPF Calculator', href: '/calculators/ppf-calculator' },
        { name: 'All Calculators', href: '/calculators' },
      ]
    },
    {
      title: 'Tools',
      links: [
        { name: 'Finance Tools', href: '/finance-tools' },
        { name: 'Tax Tools', href: '/tax-tools' },
        { name: 'GST Tools', href: '/gst-tools' },
        { name: 'Excel Tools', href: '/exceltool' },
        { name: 'Bank Tools', href: '/bank-tools' },
        { name: 'All Tools', href: '/tools' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Learn', href: '/learn' },
        { name: 'Blog', href: '/blog' },
        { name: 'News', href: '/news' },
        { name: 'Government Schemes', href: '/government-schemes' },
        { name: 'Crypto', href: '/crypto' },
        { name: 'Help Center', href: '/help-center' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about-us' },
        { name: 'Contact Us', href: '/contact-us' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Use', href: '/terms-of-use' },
        { name: 'Terms & Conditions', href: '/terms-and-conditions' },
        { name: 'Disclaimer', href: '/disclaimer' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/MoneyCalIN' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/moneycal' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/harshraj0235/fincal' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                MoneyCal.in
              </h3>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              India's most comprehensive financial calculator platform. Free tools for loans, investments, taxes, and more.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@moneycal.in" className="hover:text-blue-600">
                support@moneycal.in
              </a>
            </div>
          </div>
          
          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} MoneyCal.in. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
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
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
