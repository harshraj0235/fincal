import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import LearnLayout from '../../../components/learn/LearnLayout';

const DealerVsBank: React.FC = () => {
  return (
    <LearnLayout
      category="vehicle-loans"
      currentLesson="dealer-vs-bank"
      breadcrumb={['Learn', 'Vehicle Loans', 'Dealer Finance vs Bank Loan']}
    >
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Dealer Finance vs Bank Loan | डीलर बनाम बैंक लोन</h1>
        <p className="text-orange-100 text-lg">Which is better? In-house financing or bank loan? Complete comparison</p>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Comparison | विस्तृत तुलना</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Factor</th>
                <th className="px-6 py-4 text-left">Dealer Finance</th>
                <th className="px-6 py-4 text-left">Bank Loan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><td className="px-6 py-4 font-semibold">Interest Rate</td><td className="px-6 py-4 text-orange-600">10% - 14% (Higher)</td><td className="px-6 py-4 text-green-600 font-bold">7.5% - 10% (Lower)</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Approval Time</td><td className="px-6 py-4 text-green-600 font-bold">Instant (30 mins)</td><td className="px-6 py-4 text-orange-600">24-48 hours</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Documentation</td><td className="px-6 py-4 text-green-600 font-bold">Minimal (ID + Bank statement)</td><td className="px-6 py-4 text-orange-600">Extensive (Income proof, ITR, etc.)</td></tr>
              <tr><td className="px-6 py-4 font-semibold">CIBIL Requirement</td><td className="px-6 py-4 text-green-600 font-bold">Flexible (650+ accepted)</td><td className="px-6 py-4 text-orange-600">Strict (750+ preferred)</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Processing Fee</td><td className="px-6 py-4 text-green-600">Often waived</td><td className="px-6 py-4 text-orange-600">₹2,000 - ₹5,000</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Loan Tenure</td><td className="px-6 py-4 text-orange-600">Up to 5 years</td><td className="px-6 py-4 text-green-600 font-bold">Up to 7 years</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Down Payment</td><td className="px-6 py-4 text-orange-600">15-25%</td><td className="px-6 py-4 text-green-600 font-bold">10-20%</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Additional Discounts</td><td className="px-6 py-4 text-green-600 font-bold">Yes (up to ₹30,000)</td><td className="px-6 py-4 text-orange-600">No</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Prepayment Charges</td><td className="px-6 py-4 text-orange-600">2-4%</td><td className="px-6 py-4 text-green-600 font-bold">0% (Free)</td></tr>
              <tr><td className="px-6 py-4 font-semibold">Foreclosure Charges</td><td className="px-6 py-4 text-orange-600">Yes (4-6%)</td><td className="px-6 py-4 text-green-600 font-bold">No charges</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost Comparison Example | लागत तुलना</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-300">
            <h3 className="text-xl font-bold text-orange-700 mb-4">Dealer Finance</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Car Price:</strong> ₹10,00,000</p>
              <p className="text-green-600"><strong>Dealer Discount:</strong> -₹30,000</p>
              <p><strong>Effective Price:</strong> ₹9,70,000</p>
              <p><strong>Down Payment (20%):</strong> ₹1,94,000</p>
              <p><strong>Loan Amount:</strong> ₹7,76,000</p>
              <p><strong>Interest Rate:</strong> 12% p.a.</p>
              <p><strong>Tenure:</strong> 5 years</p>
              <p className="pt-3 border-t"><strong>Monthly EMI:</strong> <span className="text-2xl text-orange-600 font-bold">₹17,263</span></p>
              <p><strong>Total Interest:</strong> ₹2,59,780</p>
              <p><strong>Total to Pay:</strong> ₹12,29,780</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 ring-4 ring-green-100">
            <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">✅ Recommended</div>
            <h3 className="text-xl font-bold text-green-700 mb-4">Bank Loan</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Car Price:</strong> ₹10,00,000</p>
              <p className="text-gray-500"><strong>Dealer Discount:</strong> -₹0</p>
              <p><strong>Effective Price:</strong> ₹10,00,000</p>
              <p><strong>Down Payment (20%):</strong> ₹2,00,000</p>
              <p><strong>Loan Amount:</strong> ₹8,00,000</p>
              <p><strong>Interest Rate:</strong> 9% p.a.</p>
              <p><strong>Tenure:</strong> 5 years</p>
              <p className="pt-3 border-t"><strong>Monthly EMI:</strong> <span className="text-2xl text-green-600 font-bold">₹16,732</span></p>
              <p><strong>Total Interest:</strong> ₹2,03,920</p>
              <p><strong>Total to Pay:</strong> ₹12,03,920</p>
              <p className="pt-3 border-t"><strong>💰 You Save:</strong> <span className="text-3xl text-green-600 font-bold">₹25,860</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">When to Choose What? | कब क्या चुनें?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-orange-900 mb-3 text-xl">Choose Dealer Finance If:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>You need instant approval (same-day)</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>Your CIBIL score is low (650-700)</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>Dealer offers huge discount (₹50K+)</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>You want minimal documentation</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-orange-600 mr-2 mt-1 flex-shrink-0" /><span>You are self-employed without ITR</span></li>
            </ul>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 text-xl">Choose Bank Loan If:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>Your CIBIL score is 750+ (get best rates)</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>You want lowest interest rate (save lakhs)</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>You need longer tenure (6-7 years)</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>You plan to prepay loan (0% charges)</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" /><span>You have stable salaried job</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Hidden Costs to Watch | छुपी हुई लागत</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
          <h4 className="font-bold text-red-900 mb-3 text-xl flex items-center"><AlertCircle className="h-6 w-6 mr-2" />Dealer Finance Hidden Costs:</h4>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Insurance markups:</strong> Dealer may charge ₹5,000-10,000 more for same insurance</li>
            <li>• <strong>Mandatory add-ons:</strong> Forced to buy accessories worth ₹20,000-50,000</li>
            <li>• <strong>Processing fee in EMI:</strong> Hidden in interest, not shown upfront</li>
            <li>• <strong>High prepayment charges:</strong> 4-6% if you want to close loan early</li>
            <li>• <strong>Hidden foreclosure fee:</strong> Can be ₹10,000-20,000</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Expert Recommendation | विशेषज्ञ सलाह</h2>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">💡 Our Recommendation:</h3>
          <p className="text-lg mb-4">
            <strong>Choose Bank Loan for most cases.</strong> Even though dealer finance is faster, you will save ₹30,000-80,000 over 5 years with lower bank rates. 
            The 1-2 days extra wait is worth the savings!
          </p>
          <p className="text-lg">
            <strong>Only choose dealer finance if:</strong> Your CIBIL is below 700 OR dealer discount is ₹1 lakh+ OR you absolutely need same-day approval.
          </p>
        </div>
      </section>

      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Continue Learning | अगला पाठ</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/learn/vehicle-loans/ev-loan-subsidy" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Next: EV Loan & Government Subsidy</div><div className="text-sm text-orange-100">Electric vehicle benefits</div></Link>
          <Link to="/learn/vehicle-loans" className="bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all"><div className="font-bold mb-1">Back to Vehicle Loans Hub</div><div className="text-sm text-orange-100">All 15 lessons</div></Link>
        </div>
      </div>
    </LearnLayout>
  );
};

export default DealerVsBank;

