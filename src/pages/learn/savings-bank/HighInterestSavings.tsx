import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Smartphone, TrendingUp } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const HighInterestSavings: React.FC = () => (
  <>
    <SEOHelmet title="High-Interest Savings Accounts: Digital vs Traditional India | MoneyCal" description="Discover digital banks offering 6-7% savings interest. Compare safety, features. Maximize returns." keywords="high interest savings, digital banks India, 7% savings account, Ujjivan, Jana, AU Small Finance" url="/learn/savings-bank-products/high-interest-savings-accounts-digital-banks-india-comparison" />
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 4 of 8</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">High-Interest Savings: Up to 7%</h1>
        <p className="text-xl text-gray-600 mb-8">उच्च ब्याज बचत खाते - 7% तक कमाएं</p>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">🏦 Top High-Interest Banks (2025)</h2>
          <div className="space-y-3">
            {[
              { bank: 'AU Small Finance Bank', rate: '7.25%', safety: 'RBI Insured (₹5L)' },
              { bank: 'Ujjivan Small Finance Bank', rate: '7.00%', safety: 'RBI Insured (₹5L)' },
              { bank: 'Jana Small Finance Bank', rate: '7.00%', safety: 'RBI Insured (₹5L)' },
              { bank: 'Equitas Small Finance Bank', rate: '7.00%', safety: 'RBI Insured (₹5L)' },
              { bank: 'HDFC Bank (Regular)', rate: '3.50%', safety: 'Top Tier Bank' },
              { bank: 'SBI (Regular)', rate: '2.70%', safety: 'Government Bank' }
            ].map((b, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <strong className="text-gray-900">{b.bank}</strong>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-700">{b.rate}</div>
                  <div className="text-xs text-gray-600">{b.safety}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">✅ Key Points</h2>
          <ul className="space-y-2">
            <li>• Small finance banks offer 7%+ (vs 3.5% traditional banks) - 2x more!</li>
            <li>• 100% safe: RBI insured up to ₹5L per bank per depositor</li>
            <li>• Digital-only banks: No branches, lower costs = higher interest for you</li>
            <li>• Recommendation: Keep ₹2-3L in high-interest savings for emergency fund</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default HighInterestSavings;





