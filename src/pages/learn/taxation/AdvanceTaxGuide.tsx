import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const AdvanceTaxGuide: React.FC = () => (
  <>
    <SEOHelmet title="Advance Tax: Payment Due Dates, Calculation, Interest Penalty India | MoneyCal" description="Learn advance tax. When to pay (quarterly), calculation method, due dates (15 Jun, 15 Sep, 15 Dec, 15 Mar), interest penalty for late payment." keywords="advance tax India, quarterly tax payment, advance tax due dates, interest penalty, एडवांस टैक्स" url="/learn/taxation-compliance/advance-tax-payment-due-dates-calculation-penalty-india" />
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/taxation-compliance" className="flex items-center gap-2 text-gray-600 hover:text-orange-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 6 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Advance Tax: Quarterly Payment Guide</h1>
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">📅 Advance Tax Due Dates</h2>
          <ul className="space-y-2">
            <li>• <strong>15 June:</strong> Pay 15% of estimated annual tax</li>
            <li>• <strong>15 September:</strong> Pay 45% of estimated annual tax (cumulative)</li>
            <li>• <strong>15 December:</strong> Pay 75% of estimated annual tax (cumulative)</li>
            <li>• <strong>15 March:</strong> Pay 100% of estimated annual tax</li>
            <li>• Who must pay: If tax liability &gt; ₹10,000 after TDS (freelancers, business owners, capital gains)</li>
            <li>• Salaried with TDS from employer: Usually exempt (employer handles via TDS)</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default AdvanceTaxGuide;



