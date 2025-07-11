import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow flex items-center justify-between px-4 py-3 md:px-12">
        <Link to="/" className="text-2xl font-extrabold text-green-700 tracking-tight">Moneycal</Link>
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link to="/news" className="hover:text-green-600">News</Link>
          <Link to="/blog" className="hover:text-green-600">Blogs</Link>
          <Link to="/calculators/emi-calculator" className="hover:text-green-600">Calculators</Link>
          <Link to="/government-schemes" className="hover:text-green-600">Schemes</Link>
          <Link to="/about-us" className="hover:text-green-600">About</Link>
          <Link to="/contact-us" className="hover:text-green-600">Contact</Link>
        </div>
        <div className="md:hidden">
          {/* Hamburger menu for mobile (implement as needed) */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-green-100 to-blue-50 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 mb-4">Empowering Your Financial Journey</h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8">India's fastest, most comprehensive finance platform for calculators, news, blogs, and more.</p>
        <div className="max-w-xl mx-auto">
          <SearchBar />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/calculators/emi-calculator" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow transition">Try EMI Calculator</Link>
          <Link to="/news" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition">Latest News</Link>
          <Link to="/blog" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow transition">Read Blogs</Link>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Featured Calculators */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold text-green-700 mb-2">Popular Calculators</h2>
          <ul className="space-y-2 w-full">
            <li><Link to="/calculators/emi-calculator" className="text-blue-700 hover:underline">EMI Calculator</Link></li>
            <li><Link to="/calculators/sip-calculator" className="text-blue-700 hover:underline">SIP Calculator</Link></li>
            <li><Link to="/calculators/income-tax-calculator" className="text-blue-700 hover:underline">Income Tax Calculator</Link></li>
            <li><Link to="/calculators/mutual-fund-overlap-checker" className="text-blue-700 hover:underline">Mutual Fund Overlap Checker</Link></li>
            <li><Link to="/calculators/asset-allocation-planner" className="text-blue-700 hover:underline">Asset Allocation Planner</Link></li>
          </ul>
          <Link to="/calculators/emi-calculator" className="mt-4 text-green-600 hover:underline font-semibold">See All Calculators →</Link>
        </div>
        {/* Featured News */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold text-green-700 mb-2">Latest News</h2>
          <ul className="space-y-2 w-full">
            <li><Link to="/news" className="text-blue-700 hover:underline">Finance News</Link></li>
            <li><Link to="/news" className="text-blue-700 hover:underline">Market Updates</Link></li>
            <li><Link to="/news" className="text-blue-700 hover:underline">Crypto News</Link></li>
          </ul>
          <Link to="/news" className="mt-4 text-green-600 hover:underline font-semibold">See All News →</Link>
        </div>
        {/* Featured Blogs */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold text-green-700 mb-2">Featured Blogs</h2>
          <ul className="space-y-2 w-full">
            <li><Link to="/blog" className="text-blue-700 hover:underline">Personal Finance</Link></li>
            <li><Link to="/blog" className="text-blue-700 hover:underline">Investment Tips</Link></li>
            <li><Link to="/blog" className="text-blue-700 hover:underline">Tax Planning</Link></li>
          </ul>
          <Link to="/blog" className="mt-4 text-green-600 hover:underline font-semibold">See All Blogs →</Link>
        </div>
        {/* Featured Schemes */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold text-green-700 mb-2">Govt. Schemes</h2>
          <ul className="space-y-2 w-full">
            <li><Link to="/government-schemes" className="text-blue-700 hover:underline">PM Kisan Yojana</Link></li>
            <li><Link to="/government-schemes" className="text-blue-700 hover:underline">NPS</Link></li>
            <li><Link to="/government-schemes" className="text-blue-700 hover:underline">PPF</Link></li>
          </ul>
          <Link to="/government-schemes" className="mt-4 text-green-600 hover:underline font-semibold">See All Schemes →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-12 text-center text-gray-500 text-sm">
        <div className="mb-2">
          <Link to="/privacy-policy" className="hover:underline mx-2">Privacy Policy</Link>|
          <Link to="/terms-and-conditions" className="hover:underline mx-2">Terms & Conditions</Link>|
          <Link to="/sitemap" className="hover:underline mx-2">Sitemap</Link>
        </div>
        <div>© {new Date().getFullYear()} Moneycal. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Home;
