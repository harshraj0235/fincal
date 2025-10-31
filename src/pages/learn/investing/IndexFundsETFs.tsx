import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const IndexFundsETFs: React.FC = () => (
  <>
    <SEOHelmet title="Index Funds & ETFs: Nifty 50 Passive Investing India | MoneyCal" description="Learn passive investing with index funds. Why Nifty 50 beats 80% active funds. Low cost, high returns." keywords="index funds India, Nifty 50 ETF, passive investing, index fund vs active, इंडेक्स फंड" url="/learn/investing-wealth/index-funds-etfs-nifty-sensex-passive-investing-india" />
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-teal-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 4 of 10</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Index Funds & ETFs: Passive Wealth Building</h1>
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💡 Why Index Funds Win</h2>
          <ul className="space-y-2">
            <li>• 80% of active fund managers FAIL to beat Nifty 50 over 10 years</li>
            <li>• Index fund expense ratio: 0.1-0.5% vs active funds 1.5-2.5% (saves ₹2-3L over 20 years)</li>
            <li>• Automatic diversification: 1 fund = 50 companies (Nifty) or 30 (Sensex)</li>
            <li>• Nifty 50 has given 12% average returns over 20 years</li>
            <li>• Best for beginners: No stock picking needed, low cost, proven returns</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default IndexFundsETFs;


