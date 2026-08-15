import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learn Finance Free - Personal Finance Courses in Hindi & English | MoneyCal',
  description: 'Free financial literacy courses - learn about loans, investing, taxation, credit score, insurance, mutual funds & more in Hindi & English.',
  keywords: 'learn finance free, financial literacy India, personal finance course Hindi, loan basics, investing course, tax guide India',
  alternates: { canonical: 'https://moneycal.in/learn' }
};

const LEARN_CATEGORIES = [
  { name: 'Personal Loans', slug: 'personal-loans', desc: 'Everything about personal loans - eligibility, interest rates, EMI & more', icon: '💰' },
  { name: 'Home Loans', slug: 'home-loans', desc: 'Home loan guide - rates, eligibility, tax benefits & tips', icon: '🏠' },
  { name: 'Credit Score', slug: 'credit-score', desc: 'Improve your CIBIL score - tips, factors & monitoring', icon: '📊' },
  { name: 'Credit Cards', slug: 'credit-cards', desc: 'Best credit cards, rewards, cashback & management tips', icon: '💳' },
  { name: 'Education Loans', slug: 'education-loans', desc: 'Education loan guide - abroad & India, interest rates', icon: '🎓' },
  { name: 'Investing & Wealth', slug: 'investing', desc: 'Mutual funds, SIP, stocks & wealth building strategies', icon: '📈' },
  { name: 'Savings Bank', slug: 'savings-bank', desc: 'Best savings accounts, FD, RD rates & banking tips', icon: '🏦' },
  { name: 'Insurance', slug: 'insurance', desc: 'Health, life & term insurance - comparison & guide', icon: '🛡️' },
  { name: 'Taxation', slug: 'taxation', desc: 'Income tax, GST, TDS - filing guide & saving tips', icon: '📋' },
  { name: 'Gold Loans', slug: 'gold-loans', desc: 'Gold loan guide - rates, eligibility & best banks', icon: '🥇' },
  { name: 'Vehicle Loans', slug: 'vehicle-loans', desc: 'Car & bike loan guide - EMI, rates & comparison', icon: '🚗' },
  { name: 'Business Loans', slug: 'business-loans', desc: 'MSME & business loans - eligibility & application', icon: '🏢' },
  { name: 'Money Management', slug: 'money-management', desc: 'Budgeting, saving & managing money effectively', icon: '💵' },
];

export default function LearnHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-violet-100 text-violet-700 text-sm font-semibold rounded-full mb-4">📚 FREE COURSES</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Learn Finance — Free</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Master personal finance with our comprehensive courses in Hindi & English. From loans to investing — learn everything for free.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEARN_CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/learn/${cat.slug}`} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 p-6">
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors mb-2">{cat.name}</h2>
              <p className="text-sm text-gray-500">{cat.desc}</p>
              <div className="mt-4 text-violet-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">Start Learning →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
