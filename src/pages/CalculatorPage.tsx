// Update the CalculatorPage.tsx file to include the new calculators
// This is a partial update showing only the relevant parts

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, Search, ArrowLeft, Share2, Bookmark, Info } from 'lucide-react';
import { getCalculatorById } from '../data/calculatorData';
// Import existing calculators...

// Import new calculators
import { MutualFundOverlapChecker } from '../calculators/MutualFundOverlapChecker';
import { XirrTracker } from '../calculators/XirrTracker';
import { DividendYieldCalculator } from '../calculators/DividendYieldCalculator';
import { AssetAllocationPlanner } from '../calculators/AssetAllocationPlanner';
import { RiskAppetiteAssessment } from '../calculators/RiskAppetiteAssessment';
import { CrowdfundingInvestmentPortal } from '../calculators/CrowdfundingInvestmentPortal';
import { DigitalWealthRoboAdvisor } from '../calculators/DigitalWealthRoboAdvisor';
import { StableReturnFixedIncomeAggregator } from '../calculators/StableReturnFixedIncomeAggregator';
import { CryptoTaxEstimator } from '../calculators/CryptoTaxEstimator';
import { NriStockInvestmentDashboard } from '../calculators/NriStockInvestmentDashboard';

interface CalculatorPageProps {
  calculatorId: string;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ calculatorId }) => {
  const navigate = useNavigate();
  const calculator = getCalculatorById(calculatorId);
  
  if (!calculator) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Calculator Not Found</h2>
        <p className="text-lg text-neutral-600 mb-8">
          The calculator you're looking for doesn't exist or may have been moved.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Go to Home
        </button>
      </div>
    );
  }
  
  const renderCalculator = () => {
    switch (calculatorId) {
      // FinTech & Payments Calculators
      case 'step-up-sip-calculator':
        return <StepUpSipCalculator />;
      case 'inflation-adjusted-sip-calculator':
        return <InflationAdjustedSipCalculator />;
      case 'rent-vs-buy-advanced-calculator':
        return <RentVsBuyAdvancedCalculator />;
      case 'gold-etf-vs-physical-calculator':
        return <GoldEtfVsPhysicalCalculator />;
      case 'income-tax-regime-comparison-calculator':
        return <IncomeTaxRegimeComparisonCalculator />;
      case 'capital-gains-tax-advanced-calculator':
        return <CapitalGainsTaxAdvancedCalculator />;
      case 'gst-seller-calculator':
        return <GstSellerCalculator />;
      case 'virtual-card-issuer':
        return <VirtualCardIssuer />;
      case 'bnpl-calculator':
        return <BnplCalculator />;
      case 'p2p-lending-calculator':
        return <P2PLendingCalculator />;
        
      // Investments & Wealth Management Calculators
      case 'mutual-fund-overlap-checker':
        return <MutualFundOverlapChecker />;
      case 'xirr-tracker':
        return <XirrTracker />;
      case 'dividend-yield-calculator':
        return <DividendYieldCalculator />;
      case 'asset-allocation-planner':
        return <AssetAllocationPlanner />;
      case 'risk-appetite-assessment':
        return <RiskAppetiteAssessment />;
      case 'crowdfunding-investment-portal':
        return <CrowdfundingInvestmentPortal />;
      case 'digital-wealth-robo-advisor':
        return <DigitalWealthRoboAdvisor />;
      case 'stable-return-fixed-income-aggregator':
        return <StableReturnFixedIncomeAggregator />;
      case 'crypto-tax-estimator':
        return <CryptoTaxEstimator />;
      case 'nri-stock-investment-dashboard':
        return <NriStockInvestmentDashboard />;
        
      // Other existing calculators...
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-neutral-600">
              This calculator is coming soon. Please check back later!
            </p>
          </div>
        );
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </button>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">{calculator.name}</h1>
        <p className="text-lg text-neutral-600">{calculator.description}</p>
      </div>
      
      <div className="flex justify-end space-x-3 mb-6">
        <button className="btn btn-outline flex items-center">
          <Share2 className="h-4 w-4 mr-2" />
          <span>Share</span>
        </button>
        <button className="btn btn-outline flex items-center">
          <Bookmark className="h-4 w-4 mr-2" />
          <span>Save</span>
        </button>
      </div>
      
      <div className="card mb-8">
        {renderCalculator()}
      </div>
      
      {calculator.info && (
        <div className="bg-[--primary-50] border border-[--primary-200] rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Info className="h-5 w-5 text-[--primary-600]" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-[--primary-900] mb-2">About this calculator</h3>
              <div className="text-[--primary-800] space-y-2">
                {calculator.info.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {calculator.faqs && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {calculator.faqs.map((faq, index) => (
              <details key={index} className="group bg-white border border-neutral-200 rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer py-4 px-6">
                  <h3 className="text-lg font-medium text-neutral-900">{faq.question}</h3>
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-4 text-neutral-600">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      )}
      
      {calculator.relatedCalculators && (
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculator.relatedCalculators.map(id => {
              const related = getCalculatorById(id);
              if (!related) return null;
              
              return (
                <button 
                  key={id}
                  onClick={() => navigate(`/calculators/${id}`)}
                  className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                >
                  <h3 className="text-lg font-medium text-neutral-900 mb-1">{related.name}</h3>
                  <p className="text-sm text-neutral-600 line-clamp-2">{related.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;