import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const BankCharges: React.FC = () => (
  <>
    <SEOHelmet title="Bank Charges & Hidden Fees: Avoid ₹5,000/Year Penalties | MoneyCal" description="Identify all bank charges in Hindi & English: minimum balance, ATM fees, SMS charges. Avoid or minimize penalties." keywords="bank charges India, hidden fees, minimum balance penalty, ATM charges, बैंक शुल्क" url="/learn/savings-bank-products/bank-charges-hidden-fees-minimum-balance-penalty-india" />
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-red-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 7 of 8</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Bank Charges: Avoid ₹5K/Year Waste</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">💸 Common Bank Charges</h2>
          <div className="space-y-3">
            {[
              { charge: 'Minimum Balance Penalty', amount: '₹500-750/quarter', avoidHow: 'Maintain minimum or switch to zero balance' },
              { charge: 'ATM Withdrawal (Other Bank)', amount: '₹20 + GST per transaction after 5 free', avoidHow: 'Use own bank ATM only' },
              { charge: 'Cheque Book', amount: '₹2-5 per leaf', avoidHow: 'Use UPI/NEFT (free)' },
              { charge: 'SMS Alerts', amount: '₹25-50/month', avoidHow: 'Use mobile app (free)' },
              { charge: 'Debit Card Annual Fee', amount: '₹100-500/year', avoidHow: 'Request fee waiver or free variant' }
            ].map((fee, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex-1">
                  <strong className="text-gray-900 block">{fee.charge}</strong>
                  <p className="text-xs text-gray-600 mt-1">How to avoid: {fee.avoidHow}</p>
                </div>
                <div className="text-red-700 font-bold">{fee.amount}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💡 Save ₹5,000/Year</h2>
          <p className="text-lg">By avoiding these charges, save ₹5K yearly = ₹50K in 10 years. Use zero balance account or maintain minimum to avoid penalties!</p>
        </div>
      </div>
    </div>
  </>
);

export default BankCharges;


