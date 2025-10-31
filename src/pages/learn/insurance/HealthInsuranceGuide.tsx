import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const HealthInsuranceGuide: React.FC = () => (
  <>
    <SEOHelmet title="Health Insurance India: ₹5L Family Floater, Claims, Portability | MoneyCal" description="Complete health insurance guide. Individual vs family floater, cover amount, claim process, portability." keywords="health insurance India, family floater, 5 lakh cover, claim process, portability, स्वास्थ्य बीमा" url="/learn/insurance-retirement/health-insurance-india-5-lakh-cover-family-floater-portability" />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/insurance-retirement" className="flex items-center gap-2 text-gray-600 hover:text-green-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 2 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Health Insurance: Protect Against Medical Bankruptcy</h1>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">✅ Key Points</h2>
          <ul className="space-y-2">
            <li>• Minimum cover: ₹5L (family of 4). Ideal: ₹10L base + ₹20L super top-up = ₹30L total.</li>
            <li>• Family floater: ₹5L shared among all members (cheaper). Individual: ₹5L each person (expensive but better).</li>
            <li>• Waiting periods: 30 days (accidents), 2-4 years (pre-existing diseases like diabetes, BP).</li>
            <li>• Cashless hospitals: Network of 5,000-10,000 hospitals. Check before buying!</li>
            <li>• Top insurers: Star Health, Care Health, HDFC Ergo, ICICI Lombard, Niva Bupa.</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default HealthInsuranceGuide;

