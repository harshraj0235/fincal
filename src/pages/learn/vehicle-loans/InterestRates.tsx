import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ExternalLink } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const InterestRates: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="interest-rates"
      breadcrumb={['Learn', 'Vehicle Loans', 'Car Loan Interest Rates 2025']}
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Car Loan Interest Rates 2025 | कार लोन ब्याज दरें
        </h1>
        <p className="text-indigo-100 text-lg">Compare latest rates from 15+ banks | 15+ बैंकों की दरें तुलना करें</p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Banks Car Loan Rates | शीर्ष बैंकों की दरें</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank</th>
                <th className="px-6 py-4 text-left">Interest Rate</th>
                <th className="px-6 py-4 text-left">Processing Fee</th>
                <th className="px-6 py-4 text-left">Max Tenure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-indigo-50">
                <td className="px-6 py-4 font-semibold">State Bank of India (SBI)</td>
                <td className="px-6 py-4 text-green-600 font-bold">7.50% - 9.20%</td>
                <td className="px-6 py-4">₹2,000 + GST</td>
                <td className="px-6 py-4">7 years</td>
              </tr>
              <tr className="hover:bg-indigo-50">
                <td className="px-6 py-4 font-semibold">HDFC Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.50% - 10.50%</td>
                <td className="px-6 py-4">₹4,999</td>
                <td className="px-6 py-4">7 years</td>
              </tr>
              <tr className="hover:bg-indigo-50">
                <td className="px-6 py-4 font-semibold">ICICI Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.75% - 11.25%</td>
                <td className="px-6 py-4">₹3,500</td>
                <td className="px-6 py-4">7 years</td>
              </tr>
              <tr className="hover:bg-indigo-50">
                <td className="px-6 py-4 font-semibold">Axis Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">9.00% - 12.00%</td>
                <td className="px-6 py-4">Up to ₹5,000</td>
                <td className="px-6 py-4">7 years</td>
              </tr>
              <tr className="hover:bg-indigo-50">
                <td className="px-6 py-4 font-semibold">Kotak Mahindra Bank</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.70% - 11.00%</td>
                <td className="px-6 py-4">₹999 onwards</td>
                <td className="px-6 py-4">5 years</td>
              </tr>
              <tr className="hover:bg-indigo-50">
                <td className="px-6 py-4 font-semibold">Punjab National Bank (PNB)</td>
                <td className="px-6 py-4 text-green-600 font-bold">8.40% - 9.90%</td>
                <td className="px-6 py-4">₹1,500</td>
                <td className="px-6 py-4">7 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Get Lowest Rate | सबसे कम दर कैसे पाएं</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3">CIBIL Score 750+</h4>
            <p className="text-gray-700">High credit score gives 1-2% lower rates</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-blue-900 mb-3">Salary Account</h4>
            <p className="text-gray-700">Existing customer gets 0.5-1% discount</p>
          </div>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-purple-900 mb-3">High Income</h4>
            <p className="text-gray-700">₹1L+ monthly income = better rates</p>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Calculate Your EMI | EMI कैलकुलेट करें</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/calculators/car-loan-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Car Loan EMI Calculator</div>
            <div className="text-sm text-indigo-100">Calculate with latest rates</div>
          </a>
          <Link to="/learn/vehicle-loans/down-payment-strategy" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Down Payment Strategy</div>
            <div className="text-sm text-indigo-100">How much to pay upfront</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default InterestRates;

