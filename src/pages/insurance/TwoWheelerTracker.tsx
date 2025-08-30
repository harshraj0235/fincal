import React from 'react';
import { ArrowLeft, Bike } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const TwoWheelerTracker: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHelmet
        title="Two-Wheeler Insurance Tracker - Bike Insurance Calculator India | MoneyCal.in"
        description="Free two-wheeler insurance tracker for India. Compare bike insurance quotes, track renewal dates, and manage your two-wheeler insurance portfolio efficiently."
        keywords="two-wheeler insurance calculator India, bike insurance renewal tracker, bike insurance cost tool, two wheeler insurance comparison"
        url="/insurance-tools/two-wheeler-tracker"
        type="website"
        image="/images/two-wheeler-tracker.jpg"
        tags={["two wheeler insurance", "bike insurance", "insurance tracker", "vehicle insurance"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
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
              <Bike className="h-16 w-16 text-cyan-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Two-Wheeler Insurance Tracker
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Coming Soon! Compare bike insurance quotes, track renewal dates, and manage your two-wheeler insurance portfolio.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Under Development</h2>
            <p className="text-gray-600 mb-6">
              This tool is currently under development and will be available soon. It will help you:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
              <li>• Compare bike insurance quotes across providers</li>
              <li>• Track renewal dates and policy details</li>
              <li>• Calculate premiums based on bike model and age</li>
              <li>• Manage your two-wheeler insurance portfolio</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoWheelerTracker;
