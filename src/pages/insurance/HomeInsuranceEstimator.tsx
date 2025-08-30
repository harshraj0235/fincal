import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const HomeInsuranceEstimator: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHelmet
        title="Home Insurance Cost Estimator - Property Insurance Calculator India | MoneyCal.in"
        description="Free home insurance cost estimator for India. Calculate home insurance premiums based on property value, location, and coverage type. Protect your biggest asset."
        keywords="home insurance premium calculator India, property insurance cost estimator, home insurance tool 2025, property insurance calculator"
        url="/insurance-tools/home-insurance-estimator"
        type="website"
        image="/images/home-insurance-estimator.jpg"
        tags={["home insurance", "property insurance", "insurance calculator", "home protection"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Home className="h-16 w-16 text-indigo-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Home Insurance Cost Estimator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Coming Soon! Estimate home insurance premiums based on property value, location, and coverage type.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Under Development</h2>
            <p className="text-gray-600 mb-6">
              This tool is currently under development and will be available soon. It will help you:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
              <li>• Calculate home insurance premiums based on property value</li>
              <li>• Compare coverage options for structure and contents</li>
              <li>• Get location-based premium estimates</li>
              <li>• Find the best home insurance deals</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeInsuranceEstimator;
