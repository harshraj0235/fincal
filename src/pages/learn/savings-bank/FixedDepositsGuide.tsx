import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, PiggyBank, TrendingUp, Calculator, CheckCircle, Target, DollarSign, Clock, Award } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const FixedDepositsGuide: React.FC = () => {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(3);
  
  const maturityAmount = principal * Math.pow(1 + rate / 400, 4 * years);
  const interest = maturityAmount - principal;

  return (
    <>
      <SEOHelmet
        title="Fixed Deposit Guide: Interest Rates, Tax, Laddering Strategy India | MoneyCal"
        description="Complete FD guide in Hindi & English. Current interest rates, tax implications, FD laddering strategy. Maximize returns safely."
        keywords="fixed deposit India, FD interest rates, FD laddering, FD tax, best FD rates 2025, फिक्स्ड डिपॉजिट"
        url="/learn/savings-bank-products/fixed-deposits-fd-interest-rates-tax-ladder-strategy-india"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          <div className="flex justify-between mb-8">
            <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-green-600">
              <ArrowLeft className="w-5 h-5" />
              Back to Savings & Bank
            </Link>
            <span className="text-sm text-gray-600">Lesson 2 of 8 • 50 mins</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Fixed Deposits (FD) Complete Guide</h1>
          <p className="text-xl text-gray-600 mb-8">फिक्स्ड डिपॉजिट: ब्याज दरें, कर, सीढ़ी रणनीति</p>

          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">🧮 FD Calculator</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Principal Amount (₹)</label>
                <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Interest Rate (%)</label>
                <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Years</label>
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span>Principal:</span><strong>₹{principal.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between mb-2">
                <span>Interest:</span><strong className="text-green-700">₹{interest.toFixed(0).toLocaleString()}</strong>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Maturity Amount:</span><strong className="text-green-700">₹{maturityAmount.toFixed(0).toLocaleString()}</strong>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">✅ Key Takeaways</h2>
            <ul className="space-y-2">
              <li>• FDs offer 6-7.5% safe returns (senior citizens get 0.5% extra)</li>
              <li>• Interest is taxable (TDS deducted if interest &gt;₹40K/year)</li>
              <li>• FD Laddering: Split ₹5L into 5 FDs of ₹1L each (1,2,3,4,5 years) for liquidity</li>
              <li>• Best for: Emergency fund, short-term goals (1-3 years), conservative investors</li>
              <li>• Top banks 2025: SBI 7.1%, HDFC 7.25%, ICICI 7.2%, small finance banks 8.5%</li>
            </ul>
          </div>

          <Link to="/learn/savings-bank-products/recurring-deposits-rd-vs-sip-monthly-savings-india" className="block bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-8 text-center shadow-xl hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-bold mb-4">Next: RD vs SIP Comparison</h3>
            <div className="flex items-center justify-center gap-3 text-lg font-semibold">
              Continue Learning <ArrowRight className="w-6 h-6" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FixedDepositsGuide;

