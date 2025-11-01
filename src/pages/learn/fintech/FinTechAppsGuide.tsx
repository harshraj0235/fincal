import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const FinTechAppsGuide: React.FC = () => (
  <>
    <SEOHelmet title="Best FinTech Apps India: CRED Jupiter Fi Niyo Neo Banks Salary Accounts 2025 | MoneyCal" description="Explore FinTech apps. CRED (credit card payments), Jupiter/Fi (neo banks), Niyo (zero-balance salary account), features, pros & cons, safety." keywords="FinTech apps India, CRED, Jupiter, Fi, Niyo, neo banks, salary account, फिनटेक ऐप्स" url="/learn/fintech-digital-payments/best-fintech-apps-india-cred-jupiter-fi-niyo-salary-accounts-2025" />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/fintech-digital-payments" className="flex items-center gap-2 text-gray-600 hover:text-purple-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 5 of 6</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Best FinTech Apps India 2025</h1>
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🚀 FinTech Revolution in India</h2>
          <ul className="space-y-2">
            <li>• <strong>CRED:</strong> Pay credit card bills, earn CRED coins, premium rewards. Best for credit card users.</li>
            <li>• <strong>Jupiter:</strong> Neo bank with 6.5% interest on savings, instant UPI, salary account. RBI licensed (Federal Bank partner).</li>
            <li>• <strong>Fi Money:</strong> Zero-balance savings account, automated savings pots, insights. Federal Bank partnership.</li>
            <li>• <strong>Niyo:</strong> Zero-fee salary accounts, forex card (0% markup), NRI banking. Best for frequent travelers.</li>
            <li>• Neo banks = Traditional bank features + Modern app UX + AI-powered insights</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default FinTechAppsGuide;





