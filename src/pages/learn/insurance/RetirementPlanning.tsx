import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const RetirementPlanning: React.FC = () => (
  <>
    <SEOHelmet title="Retirement Planning: Calculate ₹3 Crore Corpus by 60 India | MoneyCal" description="Master retirement planning. Corpus calculation, SIP strategy, 4% withdrawal rule. Retire tension-free." keywords="retirement planning India, retirement corpus, 3 crore goal, 4% rule, SIP retirement, सेवानिवृत्ति योजना" url="/learn/insurance-retirement/retirement-planning-india-corpus-calculation-60-years-goal" />
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-orange-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 4 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Retirement Planning: Build ₹3 Crore by 60</h1>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🎯 Retirement Formula</h2>
          <ul className="space-y-2">
            <li>• Annual expense at retirement: ₹6L → Need corpus: ₹6L ÷ 4% = ₹1.5 Crore (4% withdrawal rule).</li>
            <li>• To build ₹3 Crore: Start ₹15K SIP at age 30 @ 12% for 30 years = ₹3.17 Crore!</li>
            <li>• Retirement accounts: EPF (8.25%), PPF (7.1%), NPS (9-12%), equity MF (12%).</li>
            <li>• 4% Rule: Withdraw max 4% of corpus yearly. ₹3Cr × 4% = ₹12L/year for life.</li>
            <li>• Start early: 25 vs 35 = half the monthly SIP needed (power of compounding)!</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default RetirementPlanning;

