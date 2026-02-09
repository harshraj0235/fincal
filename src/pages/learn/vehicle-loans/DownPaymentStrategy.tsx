import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Calculator, TrendingUp } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const DownPaymentStrategy: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="down-payment-strategy"
      breadcrumb={['Learn', 'Vehicle Loans', 'Down Payment Strategy']}
    >
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Car Loan Down Payment Strategy | डाउन पेमेंट रणनीति
        </h1>
        <p className="text-pink-100 text-lg">How much to pay upfront? 10%, 20%, or 30%? Complete guide</p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Down Payment? | डाउन पेमेंट क्या है?</h2>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>Down payment</strong> is the upfront amount you pay from your own pocket when buying a car. The remaining amount is financed by the bank as a loan.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            <strong>डाउन पेमेंट हिंदी में:</strong> डाउन पेमेंट वह राशि है जो आप कार खरीदते समय अपनी जेब से देते हैं। बाकी राशि बैंक लोन के रूप में देता है।
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Down Payment Comparison | तुलना</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-200">
            <h3 className="text-xl font-bold text-red-700 mb-4">10% Down</h3>
            <div className="space-y-3">
              <div><strong>Car Price:</strong> ₹10,00,000</div>
              <div><strong>Down Payment:</strong> ₹1,00,000</div>
              <div><strong>Loan Amount:</strong> ₹9,00,000</div>
              <div className="pt-3 border-t"><strong>EMI (5yr @ 9%):</strong><br/><span className="text-2xl text-red-600 font-bold">₹18,824</span></div>
              <div><strong>Total Interest:</strong><br/>₹2,29,440</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-400 ring-4 ring-yellow-200">
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">Recommended</div>
            <h3 className="text-xl font-bold text-yellow-700 mb-4">20% Down</h3>
            <div className="space-y-3">
              <div><strong>Car Price:</strong> ₹10,00,000</div>
              <div><strong>Down Payment:</strong> ₹2,00,000</div>
              <div><strong>Loan Amount:</strong> ₹8,00,000</div>
              <div className="pt-3 border-t"><strong>EMI (5yr @ 9%):</strong><br/><span className="text-2xl text-yellow-600 font-bold">₹16,732</span></div>
              <div><strong>Total Interest:</strong><br/>₹2,03,920</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-700 mb-4">30% Down</h3>
            <div className="space-y-3">
              <div><strong>Car Price:</strong> ₹10,00,000</div>
              <div><strong>Down Payment:</strong> ₹3,00,000</div>
              <div><strong>Loan Amount:</strong> ₹7,00,000</div>
              <div className="pt-3 border-t"><strong>EMI (5yr @ 9%):</strong><br/><span className="text-2xl text-green-600 font-bold">₹14,641</span></div>
              <div><strong>Total Interest:</strong><br/>₹1,78,460</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Down Payment Strategy | सर्वोत्तम रणनीति</h2>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200">
          <h4 className="font-bold text-xl text-blue-900 mb-4">💡 Ideal Down Payment: 20-25%</h4>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li>✅ <strong>Lower EMI burden</strong> - More affordable monthly payments</li>
            <li>✅ <strong>Reduced interest cost</strong> - Save ₹25,000-50,000 in interest</li>
            <li>✅ <strong>Better loan approval</strong> - Banks prefer higher down payment</li>
            <li>✅ <strong>Lower interest rate</strong> - May get 0.5% discount</li>
            <li>✅ <strong>Avoid negative equity</strong> - Car value &gt; loan balance</li>
          </ul>
        </div>
      </section>

      <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Plan Your Down Payment | डाउन पेमेंट प्लान करें</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/calculators/car-loan-calculator" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">EMI Calculator</div>
            <div className="text-sm text-pink-100">Compare different down payments</div>
          </a>
          <Link to="/learn/vehicle-loans/documents-required" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="font-bold mb-1">Next: Documents Required</div>
            <div className="text-sm text-pink-100">Get document checklist</div>
          </Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default DownPaymentStrategy;

