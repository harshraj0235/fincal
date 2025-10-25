import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Star,
  Clock,
  Users,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Heart,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reserve space for footer to prevent layout shift
  const footerMinHeight = '650px';

  const footerSections = [
    {
      title: 'Popular Calculators',
      links: [
        { name: 'EMI Calculator', href: '/calculators/emi-calculator' },
        { name: 'Income Tax Calculator', href: '/calculators/income-tax-calculator' },
        { name: 'SIP Calculator', href: '/calculators/sip-calculator' },
        { name: 'Mutual Fund Calculator', href: '/calculators/mutual-fund-returns-calculator' },
        { name: 'PPF Calculator', href: '/calculators/ppf-calculator' },
        { name: 'FD Calculator', href: '/calculators/fixed-deposit-calculator' },
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'Financial Education', href: '/financial-education' },
        { name: 'Help Center', href: '/help-center' },
        { name: 'Government Schemes', href: '/government-schemes' },
        { name: 'Excel Tools', href: '/exceltool' },
        { name: 'Crypto', href: '/crypto' },
        { name: 'Contact Us', href: '/contact-us' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'About Us', href: '/about-us' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms & Conditions', href: '/terms-and-conditions' },
        { name: 'Disclaimer', href: '/disclaimer' },
        { name: 'Editorial Policy', href: '/editorial-policy' },
        { name: 'Cookie Policy', href: '/cookie-policy' },
        { name: 'Help Center', href: '/help-center' },
        { name: 'Contact Us', href: '/contact-us' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-800' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden" style={{ minHeight: footerMinHeight }}>
      {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <Link to="/" className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
          <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      MoneyCal.in
                    </h3>
                    <p className="text-blue-200 text-sm">Smart Financial Tools</p>
                  </div>
            </Link>
                <p className="text-gray-300 leading-relaxed mb-6">
                  India's most comprehensive financial calculator platform. Plan loans, investments, taxes, and more with confidence.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">support@moneycal.in</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">Mumbai, Maharashtra, India</span>
            </div>
                </div>
              </motion.div>
          </div>
          
            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
                  {section.title}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="ml-2"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                  </motion.div>
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm flex items-center group"
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {link.name}
                </Link>
                      </motion.div>
              </li>
                  ))}
            </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 pt-8 border-t border-gray-700"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '50+', label: 'Calculators', icon: Calculator },
                { number: '1M+', label: 'Users', icon: Users },
                { number: '24/7', label: 'Support', icon: Clock },
                { number: '100%', label: 'Free', icon: Star },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          </div>
          
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-2 text-gray-400 text-sm"
              >
                <span>© 2024 MoneyCal.in. All rights reserved.</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="hidden sm:inline">in India</span>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-4"
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`text-gray-400 ${social.color} transition-colors duration-300`}
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};