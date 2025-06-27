import React from 'react';
import { Link } from 'react-router-dom';

const AstroFinance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-yellow-700 glow-text">Astro-Finance Insights Hub</h1>
        <p className="text-lg text-neutral-700 mb-8">
          Discover how astrology and finance intersect to help you make smarter money decisions. Explore personalized financial horoscopes, zodiac-based investment tips, Vedic wealth guides, and more.
        </p>
        <div className="flex flex-col gap-4 items-center mb-10">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 mt-8">
          <div className="cosmic-card p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Personalized Financial Horoscope</h2>
            <p className="mb-4 text-neutral-600">Get your financial forecast based on your zodiac sign and birth date. Plan your investments, savings, and spending for 2025 and beyond.</p>
            <Link to="/astro-finance/horoscope" className="astro-finance-btn">Get My Horoscope</Link>
          </div>
          <div className="cosmic-card p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Zodiac-Based Investment Tips</h2>
            <p className="mb-4 text-neutral-600">Explore investment strategies tailored to your astrological profile. Find your lucky numbers, best investment days, and more.</p>
            <Link to="/astro-finance/zodiac-tips" className="astro-finance-btn">Explore Tips</Link>
          </div>
          <div className="cosmic-card p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Lucky Number Generator</h2>
            <p className="mb-4 text-neutral-600">Generate personalized lucky numbers for financial decisions, stock picking, and investment timing based on your zodiac.</p>
            <Link to="/astro-finance/lucky-numbers" className="astro-finance-btn">Generate Numbers</Link>
          </div>
          <div className="cosmic-card p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Muhurat Calculator</h2>
            <p className="mb-4 text-neutral-600">Find the most auspicious dates and times for financial activities like investments, property purchase, and business decisions.</p>
            <Link to="/astro-finance/muhurat" className="astro-finance-btn">Calculate Muhurat</Link>
          </div>
          <div className="cosmic-card p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">Zodiac Savings Calculator</h2>
            <p className="mb-4 text-neutral-600">Get personalized savings recommendations based on your zodiac traits, income, and financial goals.</p>
            <Link to="/astro-finance/savings-calculator" className="astro-finance-btn">Calculate Savings</Link>
          </div>
        </div>
        <div className="mt-16 text-left">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>Comprehensive Astro-Finance Blog & Guides</li>
            <li>Interactive Tools: Lucky Number Generator, Zodiac Savings Calculator</li>
            <li>Downloadable 2025 Financial Horoscope PDF</li>
            <li>Video Insights & More</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AstroFinance; 