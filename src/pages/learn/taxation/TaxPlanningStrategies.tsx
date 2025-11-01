import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const TaxPlanningStrategies: React.FC = () => (
  <>
    <SEOHelmet title="Tax Planning Strategies: Minimize Tax Liability Legally Save ₹1L/Year India | MoneyCal" description="Advanced tax planning. Salary structuring (HRA, LTA), 80C optimization, NPS 80CCD(1B), health insurance 80D, home loan 24(b), charitable donations 80G." keywords="tax planning India, minimize tax liability, salary structuring, HRA LTA, 80C 80D 80CCD, home loan tax benefits, कर योजना रणनीतियां" url="/learn/taxation-compliance/tax-planning-strategies-minimize-liability-legally-india-2025" />
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 7 of 7 - FINAL!</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Tax Planning: Save ₹1L+ Legally!</h1>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">🎯 Ultimate Tax Saving Strategy</h2>
          <div className="space-y-3">
            {[
              { section: '80C', amount: '₹1.5L', tax: '₹46,800', tip: 'PPF ₹50K + ELSS ₹50K + Insurance ₹50K' },
              { section: '80CCD(1B) - NPS', amount: '₹50K', tax: '₹15,600', tip: 'Extra NPS over 80C limit' },
              { section: '80D - Health Insurance', amount: '₹25K', tax: '₹7,800', tip: '₹50K for parents (seniors)' },
              { section: '24(b) - Home Loan Interest', amount: '₹2L', tax: '₹62,400', tip: 'Self-occupied property' },
              { section: '80G - Donations', amount: '₹10K', tax: '₹3,120', tip: '100% deduction for PM CARES' },
              { section: 'HRA Exemption', amount: '₹2L', tax: '₹62,400', tip: 'Least of 3 calculations' },
              { section: 'LTA (Leave Travel)', amount: '₹30K', tax: '₹9,360', tip: 'Twice in 4 years' }
            ].map((item, i) => (
              <div key={i} className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 flex justify-between items-center">
                <div>
                  <strong className="text-indigo-900 block">{item.section}</strong>
                  <span className="text-xs text-gray-600">{item.tip}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-indigo-700">{item.amount}</div>
                  <div className="text-xs text-green-700">Save: {item.tax}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg">
            <strong className="text-2xl block mb-2">Total Tax Saved: ₹2,07,480/year!</strong>
            <p className="text-sm">By maximizing all deductions (30% tax slab)</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🎉 Taxation & Compliance Category Complete!</h2>
          <p className="text-xl mb-6">You've mastered all 7 lessons on income tax in India!</p>
          <Link to="/learn" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
            Explore More Categories <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default TaxPlanningStrategies;





