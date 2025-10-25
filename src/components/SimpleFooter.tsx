import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const SimpleFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-6" style={{ minHeight: '80px', contain: 'layout style paint' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm">
            <span>© {currentYear} MoneyCal.in. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span className="hidden sm:inline">in India</span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-and-conditions" className="text-gray-300 hover:text-white transition-colors">Terms</Link>
            <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors">Disclaimer</Link>
            <Link to="/contact-us" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;

