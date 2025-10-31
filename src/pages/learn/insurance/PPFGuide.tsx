import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const PPFGuide: React.FC = () => (
  <>
    <SEOHelmet title="PPF Guide: 7.1% Tax-Free Returns, 15-Year Lock-In India | MoneyCal" description="Master PPF. Interest rate, investment limits, partial withdrawal, extension, tax benefits." keywords="PPF India, public provident fund, 7.1% tax free, 80C benefits, PPF withdrawal rules, PPF गाइड" url="/learn/insurance-retirement/ppf-public-provident-fund-15-year-lock-in-tax-free-returns-india" />
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 5 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">PPF: Public Provident Fund Complete Guide</h1>
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">✅ PPF Features</h2>
          <ul className="space-y-2">
            <li>• Interest: 7.1% p.a. (compounded annually, 100% tax-free!)</li>
            <li>• Investment: Min ₹500/year, Max ₹1.5L/year (eligible for 80C deduction).</li>
            <li>• Lock-in: 15 years mandatory. Can extend in blocks of 5 years.</li>
            <li>• Partial withdrawal: Allowed from 7th year (50% of balance).</li>
            <li>• Where to open: Any post office or authorized banks (SBI, ICICI, HDFC).</li>
            <li>• Best for: Long-term safe savings, retirement planning, tax saving under 80C.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default PPFGuide;


