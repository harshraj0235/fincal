import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const AssetAllocation: React.FC = () => (
  <>
    <SEOHelmet title="Asset Allocation: Equity, Debt, Gold Diversification India | MoneyCal" description="Master portfolio diversification. 60-30-10 rule, age-based allocation, rebalancing for Indians." keywords="asset allocation India, portfolio diversification, equity debt gold, 60-30-10 rule, परिसंपत्ति आवंटन" url="/learn/investing-wealth/asset-allocation-equity-debt-gold-diversification-india" />
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-orange-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 5 of 10</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Asset Allocation: Don't Put All Eggs in One Basket</h1>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">📊 Age-Based Allocation Formula</h2>
          <ul className="space-y-2">
            <li>• <strong>Age 20-30:</strong> 70% Equity, 20% Debt, 10% Gold (aggressive growth)</li>
            <li>• <strong>Age 30-40:</strong> 60% Equity, 30% Debt, 10% Gold (balanced)</li>
            <li>• <strong>Age 40-50:</strong> 50% Equity, 40% Debt, 10% Gold (conservative)</li>
            <li>• <strong>Age 50-60:</strong> 30% Equity, 60% Debt, 10% Gold (capital preservation)</li>
            <li>• Rebalance annually: If equity grows to 80%, sell some and buy debt to maintain ratio</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default AssetAllocation;





