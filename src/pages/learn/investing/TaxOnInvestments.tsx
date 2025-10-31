import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TaxOnInvestments: React.FC = () => (
  <>
    <SEOHelmet title="Taxation on Investments: LTCG, STCG India 2025 | MoneyCal" description="Complete tax guide for investors. Long-term, short-term capital gains on equity, debt, gold." keywords="LTCG STCG India, capital gains tax, investment taxation, equity tax, debt tax, निवेश कर" url="/learn/investing-wealth/taxation-on-investments-ltcg-stcg-equity-debt-india" />
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/investing-wealth" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 7 of 10</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Taxation on Investments (2025 Rules)</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="space-y-4">
            <div className="bg-green-50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-green-900 mb-3">📈 Equity (Stocks & Equity MF)</h3>
              <ul className="text-sm space-y-1">
                <li>• <strong>LTCG (&gt;1 year):</strong> 10% on gains &gt;₹1L (₹1L exempt)</li>
                <li>• <strong>STCG (&lt;1 year):</strong> 15% flat tax</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-3">📊 Debt Funds</h3>
              <ul className="text-sm space-y-1">
                <li>• <strong>All gains:</strong> Added to income, taxed as per slab (20-30%)</li>
                <li>• No LTCG benefit anymore (changed in 2023)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default TaxOnInvestments;



