import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingDown, CheckCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const PrepaymentGuide: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="prepayment-guide"
      breadcrumb={['Learn', 'Vehicle Loans', 'Vehicle Loan Prepayment Guide']}
    >
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Car Loan Prepayment Guide 2025 | प्रीपेमेंट गाइड</h1>
        <p className="text-blue-100 text-lg">Save lakhs by prepaying smartly | स्मार्ट प्रीपेमेंट से लाखों बचाएं</p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Loan Prepayment? | प्रीपेमेंट क्या है?</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-4">
            <strong>Prepayment</strong> means paying extra amount towards your loan (over and above monthly EMI) to reduce principal and close loan faster.
          </p>
          <p className="text-lg text-gray-700">
            <strong>हिंदी में:</strong> प्रीपेमेंट का मतलब है अपने लोन की मासिक EMI से अधिक राशि चुकाना ताकि मूलधन कम हो और ब्याज बचत हो।
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Prepayment Example | उदाहरण</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
            <h3 className="text-xl font-bold text-red-700 mb-4">Without Prepayment</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Loan Amount:</strong> ₹5,00,000</p>
              <p><strong>Tenure:</strong> 5 years (60 months)</p>
              <p><strong>Interest Rate:</strong> 9% p.a.</p>
              <p><strong>Monthly EMI:</strong> ₹10,458</p>
              <p className="pt-3 border-t"><strong>Total Interest Paid:</strong> <span className="text-2xl text-red-600 font-bold">₹1,27,480</span></p>
              <p><strong>Total Payment:</strong> ₹6,27,480</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 ring-4 ring-green-100">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">✅ With Prepayment</div>
            <h3 className="text-xl font-bold text-green-700 mb-4">Prepay ₹50,000 after 1 year</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Loan Amount:</strong> ₹5,00,000</p>
              <p><strong>Reduced Tenure:</strong> 3.8 years (46 months)</p>
              <p><strong>Interest Rate:</strong> 9% p.a.</p>
              <p><strong>Monthly EMI:</strong> ₹10,458</p>
              <p className="pt-3 border-t"><strong>Total Interest Paid:</strong> <span className="text-2xl text-green-600 font-bold">₹90,250</span></p>
              <p><strong>Total Payment:</strong> ₹5,90,250</p>
              <p className="pt-3 border-t"><strong>💰 You Save:</strong> <span className="text-3xl text-green-600 font-bold">₹37,230</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Prepayment Charges | प्रीपेमेंट शुल्क</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Bank</th>
                <th className="px-6 py-4 text-left">Prepayment Charges</th>
                <th className="px-6 py-4 text-left">Lock-in Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 font-semibold">SBI</td><td className="px-6 py-4 text-green-600 font-bold">0% (Free)</td><td className="px-6 py-4">None</td></tr>
              <tr><td className="px-6 py-4 font-semibold">HDFC Bank</td><td className="px-6 py-4 text-green-600 font-bold">0% (Free)</td><td className="px-6 py-4">None</td></tr>
              <tr><td className="px-6 py-4 font-semibold">ICICI Bank</td><td className="px-6 py-4 text-green-600 font-bold">0% (Free)</td><td className="px-6 py-4">None</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Axis Bank</td><td className="px-6 py-4">4% after 6 months</td><td className="px-6 py-4">6 months</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
          <p className="text-gray-700"><strong>Good News:</strong> Most banks now offer zero prepayment charges on car loans! सभी बैंक अब फ्री प्रीपेमेंट देते हैं!</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Prepayment Strategy | सर्वोत्तम रणनीति</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">1. Prepay in Early Years</h4>
            <p className="text-gray-700">Maximum interest is charged in first 2-3 years. Prepay early to save maximum interest.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">2. Use Bonus/Incentives</h4>
            <p className="text-gray-700">Use annual bonus, tax refunds, or windfall gains for lump-sum prepayment.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <h4 className="font-bold text-xl text-gray-900 mb-2">3. Keep Emergency Fund</h4>
            <p className="text-gray-700">Don't exhaust all savings for prepayment. Keep 6 months expenses as emergency fund.</p>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/balance-transfer" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Next: Balance Transfer</div><div className="text-sm text-blue-100">Switch to lower rates</div></Link>
          <Link to="/learn/vehicle-loans/best-banks" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Best Banks 2025</div><div className="text-sm text-blue-100">Compare all lenders</div></Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default PrepaymentGuide;

