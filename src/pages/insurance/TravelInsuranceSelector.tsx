import React from 'react';
import { ArrowLeft, Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const TravelInsuranceSelector: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHelmet
        title="Travel Insurance Selector - Best Travel Insurance Plans India | MoneyCal.in"
        description="Free travel insurance selector for India. Get personalized travel insurance recommendations for domestic and international trips with comprehensive coverage options."
        keywords="travel insurance selector India, best travel insurance for international trips, travel insurance calculator, domestic travel insurance"
        url="/insurance-tools/travel-insurance-selector"
        type="website"
        image="/images/travel-insurance-selector.jpg"
        tags={["travel insurance", "insurance selector", "travel planning", "international travel"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
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
              <Plane className="h-16 w-16 text-orange-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Travel Insurance Selector
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Coming Soon! Get personalized travel insurance recommendations for domestic and international trips.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Under Development</h2>
            <p className="text-gray-600 mb-6">
              This tool is currently under development and will be available soon. It will help you:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
              <li>• Compare travel insurance plans for domestic and international trips</li>
              <li>• Get personalized recommendations based on destination and trip duration</li>
              <li>• Calculate premiums and coverage options</li>
              <li>• Find the best travel insurance deals</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelInsuranceSelector;
