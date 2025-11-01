import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const SeniorCitizenSchemes: React.FC = () => (
  <>
    <SEOHelmet title="Senior Citizen Savings Schemes: SCSS, PMVVY (8.2% Interest) | MoneyCal" description="Complete guide to SCSS, PMVVY for retirees in Hindi & English. Tax benefits, eligibility, interest rates." keywords="senior citizen schemes, SCSS 8.2%, PMVVY, retirement savings, वरिष्ठ नागरिक योजनाएं" url="/learn/savings-bank-products/senior-citizen-savings-schemes-scss-pmvvy-india-benefits" />
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/savings-bank-products" className="flex items-center gap-2 text-gray-600 hover:text-orange-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 5 of 8</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Senior Citizen Savings Schemes</h1>
        <p className="text-xl text-gray-600 mb-8">वरिष्ठ नागरिक बचत योजनाएं - 8.2% ब्याज</p>
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">🏅 Top 2 Schemes for Retirees</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300">
              <h3 className="text-xl font-bold text-green-900 mb-3">SCSS (Post Office)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Interest: <strong className="text-green-700">8.2% p.a.</strong> (Quarterly payout)</li>
                <li>• Deposit: ₹1,000 - ₹30,00,000</li>
                <li>• Tenure: 5 years (extendable 3 years)</li>
                <li>• Eligibility: 60+ years (55+ for retired)</li>
                <li>• Tax: 80C deduction (₹1.5L), interest taxable</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
              <h3 className="text-xl font-bold text-blue-900 mb-3">PMVVY (LIC)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Interest: <strong className="text-blue-700">7.4% p.a.</strong> (Monthly/Quarterly)</li>
                <li>• Deposit: ₹1,50,000 - ₹30,00,000</li>
                <li>• Tenure: 10 years (pension for life)</li>
                <li>• Eligibility: 60+ years</li>
                <li>• Tax: No 80C benefit, interest taxable</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">💡 Recommendation</h2>
          <p className="text-lg">Best strategy: ₹15L in SCSS (8.2%) + ₹15L in PMVVY (7.4%) = ₹30L total. Earn ₹2.34L/year safely!</p>
        </div>
      </div>
    </div>
  </>
);

export default SeniorCitizenSchemes;





