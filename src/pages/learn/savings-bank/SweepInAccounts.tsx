import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const SweepInAccounts: React.FC = () => (
  <>
    <SEOHelmet title="Sweep-In Accounts: Auto-Sweep Facility Banks India | MoneyCal" description="Learn sweep-in/auto-sweep accounts. Get FD returns on idle savings automatically. Best banks offering this." keywords="sweep-in account, auto-sweep facility, FD returns savings, स्वीप-इन खाता" url="/learn/savings-bank-products/sweep-in-accounts-auto-sweep-facility-banks-india" />
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-teal-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 6 of 8</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Sweep-In Accounts: Get FD Returns on Savings</h1>
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">✅ How It Works</h2>
          <ul className="space-y-2">
            <li>• Keep ₹50K minimum in savings (3.5% interest)</li>
            <li>• Any amount &gt;₹50K automatically moves to FD (7% interest)</li>
            <li>• If you need money, FD auto-breaks and comes back</li>
            <li>• Best of both: Liquidity + Higher returns!</li>
            <li>• Top banks: HDFC, ICICI, Axis, Kotak offer this facility</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default SweepInAccounts;

