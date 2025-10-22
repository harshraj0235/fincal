import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, TrendingDown } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const BalanceTransfer: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="balance-transfer"
      breadcrumb={['Learn', 'Vehicle Loans', 'Balance Transfer for Car Loans']}
    >
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Car Loan Balance Transfer 2025 | बैलेंस ट्रांसफर गाइड</h1>
        <p className="text-purple-100 text-lg">Switch to lower interest rates, reduce EMI, save lakhs</p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Balance Transfer? | बैलेंस ट्रांसफर क्या है?</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-4">
            <strong>Balance Transfer</strong> means shifting your existing car loan from one bank to another bank offering lower interest rate. This reduces your EMI and total interest cost.
          </p>
          <p className="text-lg text-gray-700">
            <strong>हिंदी में:</strong> बैलेंस ट्रांसफर का मतलब है अपने मौजूदा कार लोन को एक बैंक से दूसरे बैंक में ट्रांसफर करना जो कम ब्याज दर दे रहा है। इससे आपकी EMI कम हो जाती है।
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Savings Example | बचत उदाहरण</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
            <h3 className="text-xl font-bold text-red-700 mb-4">Current Loan (Old Bank)</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Outstanding Amount:</strong> ₹4,00,000</p>
              <p><strong>Interest Rate:</strong> 11% p.a.</p>
              <p><strong>Remaining Tenure:</strong> 3 years</p>
              <p><strong>Current EMI:</strong> ₹13,123</p>
              <p className="pt-3 border-t"><strong>Total to Pay:</strong> <span className="text-2xl text-red-600 font-bold">₹4,72,428</span></p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 ring-4 ring-green-100">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">✅ After Balance Transfer</div>
            <h3 className="text-xl font-bold text-green-700 mb-4">New Loan (New Bank)</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Transfer Amount:</strong> ₹4,00,000</p>
              <p><strong>New Interest Rate:</strong> 8.5% p.a.</p>
              <p><strong>Tenure:</strong> 3 years</p>
              <p><strong>New EMI:</strong> ₹12,617</p>
              <p className="pt-3 border-t"><strong>Total to Pay:</strong> <span className="text-2xl text-green-600 font-bold">₹4,54,212</span></p>
              <p className="pt-3 border-t"><strong>💰 Total Savings:</strong> <span className="text-3xl text-green-600 font-bold">₹18,216</span></p>
              <p><strong>EMI Reduction:</strong> ₹506/month</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When to do Balance Transfer? | कब करें?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 text-xl">✅ Do Balance Transfer If:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Current rate is 2%+ higher than market rate</li>
              <li>• Remaining tenure is 2+ years</li>
              <li>• Outstanding amount is ₹2L+</li>
              <li>• Your CIBIL score improved to 750+</li>
              <li>• No balance transfer in last 6 months</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-red-900 mb-3 text-xl">❌ Don't Do If:</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Rate difference is less than 1%</li>
              <li>• Only 6-12 months remaining</li>
              <li>• Outstanding amount is very small</li>
              <li>• Processing fees are too high</li>
              <li>• Your CIBIL score dropped</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Balance Transfer Process | प्रक्रिया</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="font-bold text-xl text-gray-900 mb-2">Step 1: Compare Rates | दरें तुलना करें</div>
            <p className="text-gray-700">Check current market rates from SBI, HDFC, ICICI, Axis. Target 1-2% lower rate.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="font-bold text-xl text-gray-900 mb-2">Step 2: Apply to New Bank | नए बैंक में आवेदन</div>
            <p className="text-gray-700">Submit loan statement, NOC request letter, ID/income proofs to new bank.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="font-bold text-xl text-gray-900 mb-2">Step 3: Get Approval | मंजूरी प्राप्त करें</div>
            <p className="text-gray-700">New bank verifies documents and approves balance transfer within 3-5 days.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="font-bold text-xl text-gray-900 mb-2">Step 4: Loan Transfer | लोन ट्रांसफर</div>
            <p className="text-gray-700">New bank directly pays outstanding amount to old bank. Hypothecation transferred.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Charges & Fees | शुल्क</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Fee Type</th>
                <th className="px-6 py-4 text-left">Old Bank</th>
                <th className="px-6 py-4 text-left">New Bank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4">Foreclosure Charges</td><td className="px-6 py-4">0-4% of outstanding</td><td className="px-6 py-4">-</td></tr>
              <tr><td className="px-6 py-4">Processing Fee</td><td className="px-6 py-4">-</td><td className="px-6 py-4">₹2,000 - ₹5,000</td></tr>
              <tr><td className="px-6 py-4">Legal Charges</td><td className="px-6 py-4">-</td><td className="px-6 py-4">₹1,000 - ₹2,000</td></tr>
              <tr><td className="px-6 py-4">Stamp Duty</td><td className="px-6 py-4">-</td><td className="px-6 py-4">0.1% of loan</td></tr>
              <tr className="bg-yellow-50"><td className="px-6 py-4 font-bold">Total Cost</td><td className="px-6 py-4 font-bold">₹3,000 - ₹8,000</td><td className="px-6 py-4 font-bold">₹5,000 - ₹10,000</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/best-banks" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Next: Best Banks 2025</div><div className="text-sm text-purple-100">Compare all lenders</div></Link>
          <Link to="/learn/vehicle-loans/dealer-vs-bank" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Dealer vs Bank Loan</div><div className="text-sm text-purple-100">Which is better?</div></Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default BalanceTransfer;

