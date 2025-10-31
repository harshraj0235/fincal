import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SEOHelmet from '../../../components/SEOHelmet';

const BusinessRegistrationGuide: React.FC = () => (
  <>
    <SEOHelmet title="Business Registration India: Sole Proprietorship LLP Private Limited Company Guide 2025 | MoneyCal" description="Choose right business structure. Sole proprietorship (easiest, unlimited liability), LLP (₹15K registration, limited liability), Pvt Ltd (₹10K+, investor-friendly), pros/cons." keywords="business registration India, sole proprietorship, LLP, private limited company, व्यवसाय पंजीकरण" url="/learn/business-finance-entrepreneurship/business-registration-india-sole-proprietorship-llp-private-limited-company-guide-2025" />
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex justify-between mb-8">
          <Link to="/learn/business-finance-entrepreneurship" className="flex items-center gap-2 text-gray-600 hover:text-teal-600"><ArrowLeft className="w-5 h-5" />Back</Link>
          <span className="text-sm text-gray-600">Lesson 5 of 7</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Business Registration: Sole, LLP, or Pvt Ltd?</h1>
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">🏢 Business Structures Compared</h2>
          <div className="space-y-3 text-sm">
            <div className="bg-white/10 p-4 rounded backdrop-blur">
              <strong className="block mb-2">1. Sole Proprietorship (Easiest)</strong>
              <p>Cost: ₹0-5K | Liability: Unlimited | Taxes: Slab rates | Compliance: Minimal | Best for: Small businesses, freelancers</p>
            </div>
            <div className="bg-white/10 p-4 rounded backdrop-blur">
              <strong className="block mb-2">2. LLP (Limited Liability Partnership)</strong>
              <p>Cost: ₹15-20K | Liability: Limited to investment | Taxes: Slab rates | Compliance: Moderate | Best for: Professional services (CA, lawyers, consultants)</p>
            </div>
            <div className="bg-white/10 p-4 rounded backdrop-blur">
              <strong className="block mb-2">3. Private Limited Company</strong>
              <p>Cost: ₹10-15K | Liability: Limited | Taxes: 25% flat | Compliance: High | Best for: Startups seeking VC funding, tech companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default BusinessRegistrationGuide;



