import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const DirectVsRegular: React.FC = () => (
  <>
    <SEOHelmet title="Direct vs Regular Mutual Funds: Save ₹15L India | MoneyCal" description="Understand direct vs regular plans. Expense ratio difference saves ₹15L+ over 30 years." keywords="direct vs regular mutual funds, expense ratio, commission, save money investing, डायरेक्ट फंड" url="/learn/investing-wealth/direct-vs-regular-mutual-funds-expense-ratio-comparison-india" />
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 6 of 10</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Direct vs Regular: Save ₹15 Lakh!</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">💰 The ₹15L Difference</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
              <h3 className="text-xl font-bold text-green-900 mb-4">✅ Direct Plan</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Expense Ratio: 0.5-1.0%</li>
                <li>• No commission to agents</li>
                <li>• Buy directly from AMC website</li>
                <li>• ₹10K SIP × 30 years @ 12% = ₹3.52 Crore</li>
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-300">
              <h3 className="text-xl font-bold text-red-900 mb-4">❌ Regular Plan</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Expense Ratio: 1.5-2.5% (1% more!)</li>
                <li>• Commission paid to agents/banks</li>
                <li>• Bought through advisors</li>
                <li>• ₹10K SIP × 30 years @ 11% = ₹3.07 Crore</li>
              </ul>
            </div>
          </div>
          <div className="bg-yellow-100 p-5 rounded-lg mt-6">
            <strong className="text-yellow-900">💡 Difference: ₹45 Lakh less in regular plan!</strong>
            <p className="text-sm text-gray-700 mt-2">Always choose DIRECT plans. Buy on Groww, Zerodha Coin, Kuvera (commission-free).</p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default DirectVsRegular;





