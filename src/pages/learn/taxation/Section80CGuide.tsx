import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const Section80CGuide: React.FC = () => (
  <>
    <SEOHelmet title="Section 80C Guide: Save ₹46,800 Tax with ₹1.5L Deductions India | MoneyCal" description="Master Section 80C. All eligible investments (PPF, ELSS, insurance, FD), how to maximize ₹1.5L limit." keywords="section 80C, tax saving investments, PPF, ELSS, life insurance, 1.5 lakh deduction, 80C गाइड" url="/learn/taxation-compliance/section-80c-deductions-ppf-elss-insurance-tax-saving-1-5-lakh-india" />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-green-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 2 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Section 80C: Save ₹46,800 Tax/Year!</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">💰 Eligible Investments (Max: ₹1.5L/year)</h2>
          <div className="space-y-3">
            {[
              { name: 'PPF', return: '7.1%', lock: '15 years', best: 'Long-term safe savings' },
              { name: 'ELSS (Tax-Saver Mutual Fund)', return: '12-15%', lock: '3 years', best: 'Highest returns' },
              { name: 'Life Insurance Premium', return: '-', lock: 'Policy term', best: 'Life cover + tax benefit' },
              { name: 'EPF (Employee Provident Fund)', return: '8.25%', lock: 'Till retirement', best: 'Auto-deducted from salary' },
              { name: 'NSC (National Savings Certificate)', return: '7.7%', lock: '5 years', best: 'Post office investment' },
              { name: '5-Year Bank FD', return: '6-7%', lock: '5 years', best: 'Safe but lowest return' },
              { name: 'Sukanya Samriddhi (Girl Child)', return: '8.2%', lock: '21 years', best: 'Highest rate, girl education' },
              { name: 'Home Loan Principal Repayment', return: '-', lock: '-', best: 'If you have home loan' }
            ].map((inv, i) => (
              <div key={i} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 flex justify-between items-center">
                <div>
                  <strong className="text-green-900 block">{inv.name}</strong>
                  <span className="text-xs text-gray-600">{inv.best}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-700">{inv.return}</div>
                  <div className="text-xs text-gray-600">Lock: {inv.lock}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🎯 Smart 80C Strategy</h2>
          <p className="mb-4">If you invest full ₹1.5L in 80C, you save tax based on your slab:</p>
          <ul className="space-y-2">
            <li>• 30% slab (income &gt; ₹10L): Save <strong>₹46,800</strong> (₹1.5L × 31.2% incl. cess)</li>
            <li>• 20% slab: Save <strong>₹31,200</strong></li>
            <li>• 5% slab: Save <strong>₹7,800</strong></li>
          </ul>
          <p className="mt-4 text-sm">💡 <strong>Recommended split:</strong> ₹50K PPF (safe) + ₹50K ELSS (growth) + ₹50K EPF (auto) = ₹1.5L covered!</p>
        </div>
      </div>
    </div>
  </>
);

export default Section80CGuide;



