import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const NPSGuide: React.FC = () => (
  <>
    <SEOHelmet title="NPS Guide: Tier 1, Tier 2, Tax Benefits ₹50K Extra India | MoneyCal" description="Master NPS. Tier 1 vs Tier 2, asset allocation, 80CCD(1B) benefits, withdrawal at 60." keywords="NPS India, national pension system, tier 1 tier 2, 80CCD 1B, NPS tax benefits, NPS गाइड" url="/learn/insurance-retirement/nps-national-pension-system-tier-1-tier-2-tax-benefits-india" />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-purple-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 3 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">NPS: National Pension System Complete Guide</h1>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💡 Why NPS?</h2>
          <ul className="space-y-2">
            <li>• Tax benefit: ₹50K extra deduction under 80CCD(1B) (over and above ₹1.5L of 80C)!</li>
            <li>• Returns: 9-12% historically (market-linked, mix of equity & debt).</li>
            <li>• Tier 1: Lock-in till 60 (retirement). Tier 2: Withdraw anytime (like mutual fund).</li>
            <li>• Asset allocation: Choose E (equity 75%), C (corporate bonds), G (government bonds).</li>
            <li>• At 60: Get 60% lumpsum + 40% must buy annuity (monthly pension for life).</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default NPSGuide;

