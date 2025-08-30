import React from 'react';
import { ArrowLeft, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHelmet from '../../components/SEOHelmet';
import WhatsAppBanner from '../../components/WhatsAppBanner';
import AstroFinanceButton from '../../components/AstroFinanceButton';

export const PortfolioDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHelmet
        title="Insurance Portfolio Dashboard - Manage Insurance Policies India | MoneyCal.in"
        description="Free insurance portfolio dashboard for India. Visualize and manage all your insurance policies in one place. Track premiums, coverage, and renewal dates."
        keywords="insurance portfolio tracker India, manage insurance policies online, insurance dashboard tool, insurance policy management"
        url="/insurance-tools/portfolio-dashboard"
        type="website"
        image="/images/portfolio-dashboard.jpg"
        tags={["insurance portfolio", "policy management", "insurance dashboard", "policy tracker"]}
      />
      
      <WhatsAppBanner />
      <AstroFinanceButton />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
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
              <PieChart className="h-16 w-16 text-teal-600 mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Insurance Portfolio Dashboard
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Coming Soon! Visualize and manage all your insurance policies in one place. Track premiums, coverage, and renewal dates.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Under Development</h2>
            <p className="text-gray-600 mb-6">
              This tool is currently under development and will be available soon. It will help you:
            </p>
            <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
              <li>• Visualize all your insurance policies in one dashboard</li>
              <li>• Track premium payments and renewal dates</li>
              <li>• Analyze coverage gaps and overlaps</li>
              <li>• Manage your complete insurance portfolio</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioDashboard;
