import React from 'react';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const CriticalIllnessCalculator: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHelmet
        title="Critical Illness Cover Calculator - Critical Illness Insurance India | MoneyCal.in"
        description="Free critical illness cover calculator for India. Determine the right critical illness coverage based on medical history, income, and potential healthcare costs."
        keywords="critical illness insurance calculator India, critical illness cover estimator, critical illness tool, health insurance calculator"
        url="/insurance-tools/critical-illness-calculator"
        type="website"
        image="/images/critical-illness-calculator.jpg"
        tags={["critical illness insurance", "health insurance", "insurance calculator", "medical coverage"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
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
              <Stethoscope className="h-16 w-16 text-pink-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Critical Illness Cover Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Coming Soon! Determine the right critical illness coverage based on medical history, income, and potential healthcare costs.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Under Development</h2>
            <p className="text-gray-600 mb-6">
              This tool is currently under development and will be available soon. It will help you:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
              <li>• Calculate critical illness coverage based on income and medical history</li>
              <li>• Compare critical illness insurance plans</li>
              <li>• Estimate healthcare costs for critical illnesses</li>
              <li>• Find the best critical illness insurance deals</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriticalIllnessCalculator;
