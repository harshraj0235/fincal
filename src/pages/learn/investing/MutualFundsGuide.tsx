import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, PieChart } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const MutualFundsGuide: React.FC = () => (
  <>
    <SEOHelmet title="Mutual Funds Guide: SIP, NAV, Expense Ratio India | MoneyCal" description="Master mutual funds in Hindi & English. SIP vs lumpsum, NAV, types, choosing best funds." keywords="mutual funds India, SIP guide, NAV calculation, expense ratio, म्यूचुअल फंड" url="/learn/investing-wealth/mutual-funds-complete-guide-sip-nav-expense-ratio-india" />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-green-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 2 of 10</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Mutual Funds Complete Guide</h1>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">✅ Key Concepts</h2>
          <ul className="space-y-2">
            <li>• Mutual Fund = Pool money from many investors → professional manager invests</li>
            <li>• SIP (₹1K/month) better than lumpsum (₹1L once) for rupee cost averaging</li>
            <li>• NAV = Price per unit (like share price). Calculated daily at 4 PM.</li>
            <li>• Expense Ratio: 0.5-2.5% annual fee. Lower = better (direct plans have 1% less)</li>
            <li>• Types: Equity (high risk, 12% returns), Debt (low risk, 7%), Hybrid (mix)</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default MutualFundsGuide;



