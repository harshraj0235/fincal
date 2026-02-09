import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ExternalLink } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const BestBanks: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="best-banks"
      breadcrumb={['Learn', 'Vehicle Loans', 'Best Banks for Car Loan 2025']}
    >
      <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Best Banks for Car Loan 2025 | बेस्ट बैंक</h1>
        <p className="text-teal-100 text-lg">Compare SBI, HDFC, ICICI, Axis - rates, fees, approval time</p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Top 10 Banks Comparison | शीर्ष 10 बैंक तुलना</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-teal-600 to-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Rank</th>
                <th className="px-6 py-4 text-left">Bank</th>
                <th className="px-6 py-4 text-left">Interest Rate</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
                <th className="px-6 py-4 text-left">Max Tenure</th>
                <th className="px-6 py-4 text-left">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-teal-50 bg-green-50">
                <td className="px-6 py-4 font-bold text-green-600">🏆 #1</td>
                <td className="px-6 py-4 font-bold">State Bank of India (SBI)</td>
                <td className="px-6 py-4 text-green-600 font-bold">7.50% - 9.20%</td>
                <td className="px-6 py-4">₹2,000 + GST</td>
                <td className="px-6 py-4">7 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐⭐ 4.8/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4 font-bold text-blue-600">#2</td>
                <td className="px-6 py-4 font-semibold">HDFC Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.50% - 10.50%</td>
                <td className="px-6 py-4">₹4,999</td>
                <td className="px-6 py-4">7 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐⭐ 4.7/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4 font-bold text-orange-600">#3</td>
                <td className="px-6 py-4 font-semibold">ICICI Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.75% - 11.25%</td>
                <td className="px-6 py-4">₹3,500</td>
                <td className="px-6 py-4">7 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐ 4.6/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4">#4</td>
                <td className="px-6 py-4 font-semibold">Axis Bank</td>
                <td className="px-6 py-4">9.00% - 12.00%</td>
                <td className="px-6 py-4">Up to ₹5,000</td>
                <td className="px-6 py-4">7 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐ 4.5/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4">#5</td>
                <td className="px-6 py-4 font-semibold">Kotak Mahindra Bank</td>
                <td className="px-6 py-4">8.70% - 11.00%</td>
                <td className="px-6 py-4">₹999 onwards</td>
                <td className="px-6 py-4">5 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐ 4.4/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4">#6</td>
                <td className="px-6 py-4 font-semibold">Punjab National Bank (PNB)</td>
                <td className="px-6 py-4">8.40% - 9.90%</td>
                <td className="px-6 py-4">₹1,500</td>
                <td className="px-6 py-4">7 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐ 4.3/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4">#7</td>
                <td className="px-6 py-4 font-semibold">Bank of Baroda</td>
                <td className="px-6 py-4">8.60% - 10.20%</td>
                <td className="px-6 py-4">₹2,500</td>
                <td className="px-6 py-4">7 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐ 4.2/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4">#8</td>
                <td className="px-6 py-4 font-semibold">Canara Bank</td>
                <td className="px-6 py-4">8.55% - 9.85%</td>
                <td className="px-6 py-4">₹1,000</td>
                <td className="px-6 py-4">7 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐ 4.1/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4">#9</td>
                <td className="px-6 py-4 font-semibold">IndusInd Bank</td>
                <td className="px-6 py-4">9.50% - 12.50%</td>
                <td className="px-6 py-4">2% of loan amount</td>
                <td className="px-6 py-4">5 years</td>
                <td className="px-6 py-4">⭐⭐⭐⭐ 4.0/5</td>
              </tr>
              <tr className="hover:bg-teal-50">
                <td className="px-6 py-4">#10</td>
                <td className="px-6 py-4 font-semibold">YES Bank</td>
                <td className="px-6 py-4">9.25% - 11.75%</td>
                <td className="px-6 py-4">₹2,999</td>
                <td className="px-6 py-4">5 years</td>
                <td className="px-6 py-4">⭐⭐⭐ 3.9/5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Bank by Category | श्रेणी के अनुसार बेस्ट</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
            <h3 className="text-xl font-bold text-green-700 mb-3">🏆 Best Overall</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">SBI</p>
            <p className="text-gray-700 text-sm">Lowest rates, highest approval, longest tenure, minimal fees</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-300">
            <h3 className="text-xl font-bold text-blue-700 mb-3">⚡ Fastest Approval</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">HDFC Bank</p>
            <p className="text-gray-700 text-sm">Instant approval, 24-hour disbursal, digital process</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-300">
            <h3 className="text-xl font-bold text-purple-700 mb-3">💼 Best for Self-Employed</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">ICICI Bank</p>
            <p className="text-gray-700 text-sm">Flexible docs, ITR-based, easy approval</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply Now | अभी आवेदन करें</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="https://sbi.co.in/web/personal-banking/loans/auto-loans/car-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-teal-400"><span className="font-semibold text-gray-900">SBI Car Loan Apply</span><ExternalLink className="h-5 w-5 text-teal-600" /></a>
          <a href="https://www.hdfcbank.com/personal/borrow/popular-loans/car-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-teal-400"><span className="font-semibold text-gray-900">HDFC Car Loan Apply</span><ExternalLink className="h-5 w-5 text-teal-600" /></a>
          <a href="https://www.icicibank.com/personal-banking/loans/car-loan" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all border-2 border-gray-200 hover:border-teal-400"><span className="font-semibold text-gray-900">ICICI Car Loan Apply</span><ExternalLink className="h-5 w-5 text-teal-600" /></a>
        </div>
      </section>

      <div className="bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/dealer-vs-bank" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Next: Dealer vs Bank Loan</div><div className="text-sm text-teal-100">Which is better?</div></Link>
          <Link to="/learn/vehicle-loans/ev-loan-subsidy" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">EV Loan & Subsidy</div><div className="text-sm text-teal-100">Electric vehicle benefits</div></Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default BestBanks;

