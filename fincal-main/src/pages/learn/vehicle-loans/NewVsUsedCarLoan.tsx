import React from 'react';
import { Link } from 'react-router-dom';
import { Car, TrendingUp, Calculator, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const NewVsUsedCarLoan: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="new-vs-used-car-loan"
      breadcrumb={['Learn', 'Vehicle Loans', 'New vs Used Car Loan']}
    >
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          New Car vs Used Car Loan 2025 | नई बनाम पुरानी कार लोन
        </h1>
        <p className="text-purple-100 text-lg">Complete comparison: interest rates, EMI, down payment, loan amount, documents</p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Differences | मुख्य अंतर</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Factor</th>
                <th className="px-6 py-4 text-left">New Car Loan</th>
                <th className="px-6 py-4 text-left">Used Car Loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 font-semibold">Interest Rate</td>
                <td className="px-6 py-4 text-green-600 font-bold">7.5% - 10%</td>
                <td className="px-6 py-4 text-orange-600 font-bold">10% - 15%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold">Loan Amount</td>
                <td className="px-6 py-4">Up to 90% of on-road price</td>
                <td className="px-6 py-4">Up to 70-80% of car value</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold">Down Payment</td>
                <td className="px-6 py-4">10-20%</td>
                <td className="px-6 py-4">20-30%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold">Loan Tenure</td>
                <td className="px-6 py-4">Up to 7 years</td>
                <td className="px-6 py-4">Up to 5 years</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold">Car Age Limit</td>
                <td className="px-6 py-4">New (0 years)</td>
                <td className="px-6 py-4">Max 5-7 years old</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold">Approval Time</td>
                <td className="px-6 py-4">24-48 hours</td>
                <td className="px-6 py-4">2-5 days (valuation needed)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">EMI Comparison | EMI तुलना</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-green-700 mb-4">New Car (₹5L @ 9%)</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span>Monthly EMI:</span><span className="font-bold text-2xl text-green-600">₹10,458</span></div>
              <div className="flex justify-between"><span>Total Interest:</span><span className="font-bold text-red-600">₹1,27,480</span></div>
              <div className="flex justify-between"><span>Total Payment:</span><span className="font-bold">₹6,27,480</span></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 border-2 border-orange-200">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">Used Car (₹3L @ 12%)</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span>Monthly EMI:</span><span className="font-bold text-2xl text-orange-600">₹6,672</span></div>
              <div className="flex justify-between"><span>Total Interest:</span><span className="font-bold text-red-600">₹1,00,320</span></div>
              <div className="flex justify-between"><span>Total Payment:</span><span className="font-bold">₹4,00,320</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 text-xl">✅ Choose New Car Loan If:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>You want latest model with warranty</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>You can afford 10-20% down payment</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>You want lower interest rate (7-10%)</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>You need longer tenure (up to 7 years)</span></li>
            </ul>
          </div>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-orange-900 mb-3 text-xl">✅ Choose Used Car Loan If:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>You have limited budget</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>You can afford higher down payment</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>You want lower depreciation hit</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>You are OK with 10-15% interest</span></li>
            </ul>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Calculate Your EMI | अपना EMI कैलकुलेट करें</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/calculators/car-loan-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">New Car Loan Calculator</div>
            <div className="text-sm text-purple-100">Calculate EMI for new cars</div>
          </a>
          <Link to="/learn/vehicle-loans/interest-rates" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Interest Rates 2025</div>
            <div className="text-sm text-purple-100">Compare all bank rates</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default NewVsUsedCarLoan;

