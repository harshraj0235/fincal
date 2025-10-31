import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const OnlineBankingGuide: React.FC = () => (
  <>
    <SEOHelmet title="Online Banking Guide: Net Banking Mobile Banking NEFT RTGS IMPS India 2025 | MoneyCal" description="Master online banking. Net banking vs mobile banking, NEFT/RTGS/IMPS explained, transaction limits, charges, security (2FA, OTP)." keywords="online banking India, net banking, mobile banking, NEFT, RTGS, IMPS, 2FA OTP, ऑनलाइन बैंकिंग" url="/learn/fintech-digital-payments/online-banking-net-banking-mobile-banking-complete-guide-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-purple-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 3 of 6</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Online Banking: NEFT, RTGS, IMPS Explained!</h1>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🏦 NEFT vs RTGS vs IMPS vs UPI</h2>
          <ul className="space-y-2 text-sm">
            <li>• <strong>NEFT:</strong> ₹1 - No limit. Batch processing (hourly). ₹2-₹25 charges. 2-3 hours.</li>
            <li>• <strong>RTGS:</strong> Minimum ₹2L. Real-time (instant). ₹25-₹50 charges. For large amounts.</li>
            <li>• <strong>IMPS:</strong> ₹1 - ₹5L. Instant 24/7. ₹5-₹15 charges. Faster than NEFT.</li>
            <li>• <strong>UPI:</strong> ₹1 - ₹1L. Instant 24/7. ₹0 charges. Best for most transactions!</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default OnlineBankingGuide;

