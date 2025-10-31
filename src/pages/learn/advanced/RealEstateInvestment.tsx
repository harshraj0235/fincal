import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const RealEstateInvestment: React.FC = () => (
  <>
    <SEOHelmet title="Real Estate Investment India: Residential Commercial REITs Property Guide 2025 | MoneyCal" description="Complete real estate guide. Residential vs commercial, REITs (₹10K minimum), rental yield (3-5%), capital appreciation, stamp duty, property taxes." keywords="real estate investment India, REITs, property investment, rental yield, commercial real estate, रियल एस्टेट निवेश" url="/learn/advanced-specialised-finance/real-estate-investment-india-residential-commercial-reits-property-guide-2025" />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/advanced-specialised-finance" className="flex items-center gap-2 text-gray-600 hover:text-blue-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 1 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Real Estate Investment: Build Wealth Through Property!</h1>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🏠 Real Estate Options in India</h2>
          <ul className="space-y-2">
            <li>• <strong>Residential Property:</strong> ₹50L-₹5Cr. Rental yield: 2-3%. Capital appreciation: 5-8%/year. Stamp duty: 5-7%. Best for: Long-term wealth, retirement home.</li>
            <li>• <strong>Commercial Property:</strong> ₹1Cr+. Rental yield: 6-9% (higher than residential!). Longer leases (3-9 years). Tenant: Companies. Best for: High rental income.</li>
            <li>• <strong>REITs (Real Estate Investment Trusts):</strong> ₹10K-₹50K minimum. Invest in commercial properties (malls, offices). Dividend yield: 5-7%. Liquid (sell on stock exchange). Tax: 10% on dividends. Best for: Small investors wanting real estate exposure without buying property.</li>
            <li>• Top REITs in India: Embassy Office Parks (₹350/unit), Mindspace Business Parks (₹290/unit), Brookfield India (₹280/unit)</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default RealEstateInvestment;



