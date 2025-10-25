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

  // Simplified footer - only essential links
  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'All Calculators', path: '/calculators' },
        { name: 'Learn Finance', path: '/learn' },
        { name: 'Blog', path: '/blog' },
        { name: 'Festival Tools', path: '/festival-tools' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'About Us', path: '/about-us' },
        { name: 'Contact Us', path: '/contact-us' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms & Conditions', path: '/terms-and-conditions' },
        { name: 'Disclaimer', path: '/disclaimer' },
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
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden py-12" style={{ contain: 'layout style paint' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div className="text-lg font-bold">MoneyCal.in</div>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              India's #1 financial calculator platform
            </p>
          </div>

          {/* Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-3 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-300 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-gray-400">
              © {currentYear} MoneyCal.in • Made with <Heart className="w-3 h-3 inline text-red-400" /> in India
            </div>
            <div className="flex gap-4">
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
            <button
              onClick={scrollToTop}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
            <span>🏆 ISO Certified</span>
            <span>•</span>
            <span>🔒 SSL Secured</span>
            <span>•</span>
            <span>✅ RBI Compliant</span>
            <span>•</span>
            <span>👥 1M+ Users</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BeautifulFooter;

