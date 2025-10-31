import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const CommoditiesTrading: React.FC = () => (
  <>
    <SEOHelmet title="Commodities Trading India: Gold Silver Crude Oil MCX NCDEX Guide 2025 | MoneyCal" description="Trade commodities. MCX (Multi Commodity Exchange), NCDEX (agricultural), gold/silver futures, crude oil, margin trading, hedging strategies." keywords="commodities trading India, MCX, NCDEX, gold trading, crude oil futures, कमोडिटी ट्रेडिंग" url="/learn/advanced-specialised-finance/commodities-trading-india-gold-silver-crude-oil-mcx-ncdex-guide-2025" />
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/advanced-specialised-finance" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 2 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Commodities Trading: Gold, Oil, Silver!</h1>
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💰 MCX & NCDEX Explained</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>MCX (Multi Commodity Exchange):</strong> Trade gold, silver, crude oil, copper, zinc. Lot size: 1kg gold (₹6L), 100g gold mini (₹60K). Margin: 5-10% (₹3-6K for gold mini). Highly volatile!</li>
            <li>• <strong>NCDEX (National Commodity & Derivatives Exchange):</strong> Agricultural commodities - wheat, soybean, cotton, sugar. For farmers & traders to hedge price risk.</li>
            <li>• <strong>Gold Futures:</strong> Buy/sell gold at future date. If gold ₹6,000/g today, buy 1-month future at ₹6,050. If actual price in 1 month is ₹6,200 → Profit ₹150/g × 1000g = ₹1.5L profit!</li>
            <li>• <strong>Risk:</strong> High leverage = High profit OR loss. Can lose entire margin (₹6K) if gold falls ₹60/g. Not for beginners!</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default CommoditiesTrading;

