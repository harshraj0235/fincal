import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const CapitalGainsTax: React.FC = () => (
  <>
    <SEOHelmet title="Capital Gains Tax: LTCG, STCG on Equity, Debt, Property India 2025 | MoneyCal" description="Master capital gains taxation. Long-term vs short-term, rates on stocks (10%), debt (as per slab), property (20%), indexation benefit." keywords="capital gains tax India, LTCG, STCG, equity taxation, property tax, indexation benefit, पूंजीगत लाभ कर" url="/learn/taxation-compliance/capital-gains-tax-ltcg-stcg-equity-debt-property-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-pink-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 5 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Capital Gains Tax: Complete Guide</h1>
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">📈 Capital Gains on Equity (Stocks & Equity MF)</h2>
          <ul className="space-y-2">
            <li>• <strong>STCG (held &lt; 1 year):</strong> 20% tax (₹1L profit = ₹20K tax)</li>
            <li>• <strong>LTCG (held &gt; 1 year):</strong> 12.5% tax above ₹1.25L exemption</li>
            <li>• Example: Sold shares after 2 years → Profit ₹3L → Tax = (₹3L - ₹1.25L) × 12.5% = ₹21,875</li>
            <li>• Must report in ITR-2 even if profit &lt; ₹1.25L (broker reports to IT dept!)</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default CapitalGainsTax;

