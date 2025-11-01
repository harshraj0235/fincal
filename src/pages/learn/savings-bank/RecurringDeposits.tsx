import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Repeat, TrendingUp, CheckCircle } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const RecurringDeposits: React.FC = () => (
  <>
    <SEOHelmet
      title="RD vs SIP: Which is Better for Monthly Savings? | MoneyCal Learn"
      description="Compare Recurring Deposits vs SIP in Hindi & English. Returns, taxation, liquidity comparison. Choose best for your goals."
      keywords="RD vs SIP, recurring deposit India, monthly savings, RD returns, SIP comparison, आरडी बनाम एसआईपी"
      url="/learn/savings-bank-products/recurring-deposits-rd-vs-sip-monthly-savings-india"
    />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <span className="text-sm text-gray-600">Lesson 3 of 8</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">RD vs SIP: Complete Comparison</h1>
        <p className="text-xl text-gray-600 mb-8">रेकरिंग डिपॉजिट बनाम एसआईपी - कौन बेहतर?</p>
        
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">📊 Recurring Deposit (RD)</h3>
              <ul className="space-y-2 text-sm">
                <li>• Returns: 6.5-7.5% (guaranteed)</li>
                <li>• Safety: 100% principal safe</li>
                <li>• Tenure: 6 months - 10 years</li>
                <li>• Best for: Conservative, short-term</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-4">📈 SIP (Mutual Fund)</h3>
              <ul className="space-y-2 text-sm">
                <li>• Returns: 10-12% (market-linked)</li>
                <li>• Safety: Market risk, can lose 20-30%</li>
                <li>• Tenure: Recommended 5+ years</li>
                <li>• Best for: Long-term wealth building</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">✅ Key Takeaways</h2>
          <ul className="space-y-2">
            <li>• RD: Safe, guaranteed 6.5-7.5%. Best for goals &lt;3 years.</li>
            <li>• SIP: Higher returns 10-12% but risky. Best for goals &gt;5 years.</li>
            <li>• Taxation: RD interest fully taxable. SIP: LTCG 10% after 1 year (better!)</li>
            <li>• Liquidity: RD can break anytime (penalty 1%). SIP can redeem in 1-2 days.</li>
            <li>• Recommendation: RD for short-term safety, SIP for long-term wealth!</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default RecurringDeposits;





