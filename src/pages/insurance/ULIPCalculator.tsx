import React from 'react';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const ULIPCalculator: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHelmet
        title="ULIP Return Calculator - Unit-Linked Insurance Plan Returns India | MoneyCal.in"
        description="Free ULIP return calculator for India. Estimate returns on Unit-Linked Insurance Plans based on investment amount, risk profile, and expected market performance."
        keywords="ULIP return calculator India, unit-linked insurance plan returns, ULIP calculator 2025, ULIP investment calculator"
        url="/insurance-tools/ulip-calculator"
        type="website"
        image="/images/ulip-calculator.jpg"
        tags={["ULIP calculator", "unit linked insurance", "investment calculator", "insurance investment"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
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
              <TrendingUp className="h-16 w-16 text-emerald-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                ULIP Return Calculator
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Coming Soon! Estimate returns on Unit-Linked Insurance Plans based on investment amount, risk profile, and expected market performance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Under Development</h2>
            <p className="text-gray-600 mb-6">
              This tool is currently under development and will be available soon. It will help you:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
              <li>• Calculate ULIP returns based on risk profile and investment amount</li>
              <li>• Compare ULIP plans across different providers</li>
              <li>• Analyze premium allocation and fund performance</li>
              <li>• Estimate maturity value and tax benefits</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ULIPCalculator;
