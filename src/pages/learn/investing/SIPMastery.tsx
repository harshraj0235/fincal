import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const SIPMastery: React.FC = () => (
  <>
    <SEOHelmet title="SIP Mastery: Build ₹1 Crore with Monthly Investments | MoneyCal" description="Master SIP investing in Hindi & English. Rupee cost averaging, step-up SIP, achieving ₹1 crore goal." keywords="SIP India, systematic investment plan, 1 crore goal, SIP strategy, एसआईपी निवेश" url="/learn/investing-wealth/sip-systematic-investment-plan-strategy-india-wealth-building" />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-blue-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 3 of 10</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">SIP Mastery: Build ₹1 Crore</h1>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🎯 How to Reach ₹1 Crore</h2>
          <ul className="space-y-2">
            <li>• ₹10,000/month SIP for 25 years @ 12% = ₹1.89 Crore</li>
            <li>• ₹15,000/month SIP for 20 years @ 12% = ₹1.49 Crore</li>
            <li>• ₹25,000/month SIP for 15 years @ 12% = ₹1.25 Crore</li>
            <li>• Start young (25) = easier. Start at 35 = need 2x monthly investment!</li>
            <li>• Use step-up SIP: Increase 10% annually to reach goal faster</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default SIPMastery;

