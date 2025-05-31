import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Facebook, Twitter, Linkedin, Instagram, FileText, Map } from 'lucide-react';
import { calculatorCategories } from '../data/calculatorData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white">FinCalc India</span>
            </Link>
            <p className="text-neutral-300 mb-4">
              Your trusted source for all financial calculations tailored for the Indian context. 
              Make informed financial decisions with our precise and easy-to-use calculators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Popular Calculators</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/calculators/emi-calculator" className="text-neutral-300 hover:text-white transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/gst-calculator" className="text-neutral-300 hover:text-white transition-colors">
                  GST Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/sip-calculator" className="text-neutral-300 hover:text-white transition-colors">
                  SIP Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/income-tax-calculator" className="text-neutral-300 hover:text-white transition-colors">
                  Income Tax Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/ppf-calculator" className="text-neutral-300 hover:text-white transition-colors">
                  PPF Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/sukanya-samriddhi-calculator" className="text-neutral-300 hover:text-white transition-colors">
                  Sukanya Samriddhi Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/nps-calculator" className="text-neutral-300 hover:text-white transition-colors">
                  NPS Calculator
                </Link>
              </li>
              <li>
                <Link to="/calculators/post-office-schemes-calculator" className="text-neutral-300 hover:text-white transition-colors">
                  Post Office Schemes Calculator
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Banking Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/calculators/bank-ifsc-finder" className="text-neutral-300 hover:text-white transition-colors">
                  Bank IFSC/MICR Finder
                </Link>
              </li>
              <li>
                <Link to="/calculators/upi-failure-troubleshooter" className="text-neutral-300 hover:text-white transition-colors">
                  UPI Failure Troubleshooter
                </Link>
              </li>
              <li>
                <Link to="/calculators/atm-locator" className="text-neutral-300 hover:text-white transition-colors">
                  ATM Locator
                </Link>
              </li>
              <li>
                <Link to="/calculators/bank-holiday-calendar" className="text-neutral-300 hover:text-white transition-colors">
                  Bank Holiday Calendar
                </Link>
              </li>
              <li>
                <Link to="/calculators/interest-rates-comparison" className="text-neutral-300 hover:text-white transition-colors">
                  Best Interest Rates
                </Link>
              </li>
              <li>
                <Link to="/blog/category/banking" className="text-neutral-300 hover:text-white transition-colors">
                  Banking Guides
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Finance Blog
                </Link>
              </li>
              <li>
                <Link to="/blog/write" className="text-neutral-300 hover:text-white transition-colors">
                  Write for Us
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-neutral-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-neutral-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-neutral-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-neutral-300 hover:text-white transition-colors flex items-center">
                  <Map className="h-4 w-4 mr-1" />
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-6 text-center text-neutral-400 text-sm">
          <p>© {new Date().getFullYear()} FinCalc India. All rights reserved.</p>
          <p className="mt-2">Disclaimer: The calculators provided are for informational purposes only and do not constitute financial advice.</p>
        </div>
      </div>
    </footer>
  );
};