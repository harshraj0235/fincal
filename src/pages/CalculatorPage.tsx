import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark, Info } from 'lucide-react';
import { getCalculatorById } from '../data/calculatorData';
import SEOHelmet from '../components/SEOHelmet';

// Import all calculators
import { EmiCalculator } from '../calculators/EmiCalculator';
import { SipCalculator } from '../calculators/SipCalculator';
import { PpfCalculator } from '../calculators/PpfCalculator';
import { GstCalculator } from '../calculators/GstCalculator';
import { IncomeTaxCalculator } from '../calculators/IncomeTaxCalculator';
import { HomeLoanCalculator } from '../calculators/HomeLoanCalculator';
import { PersonalLoanCalculator } from '../calculators/PersonalLoanCalculator';
import { CarLoanCalculator } from '../calculators/CarLoanCalculator';
import { BusinessLoanCalculator } from '../calculators/BusinessLoanCalculator';
import { LoanComparisonCalculator } from '../calculators/LoanComparisonCalculator';
import { LoanPrepaymentCalculator } from '../calculators/LoanPrepaymentCalculator';
import { LoanRefinanceCalculator } from '../calculators/LoanRefinanceCalculator';
import { LoanAffordabilityCalculator } from '../calculators/LoanAffordabilityCalculator';
import { LoanTenureConverter } from '../calculators/LoanTenureConverter';
import { CreditCardEmiCalculator } from '../calculators/CreditCardEmiCalculator';
import GoldLoanEmiCalculator from '../calculators/GoldLoanEmiCalculator';
import NpsReturnCalculator from '../calculators/NpsReturnCalculator';
import { MutualFundReturnsCalculator } from '../calculators/MutualFundReturnsCalculator';
import { MutualFundCostCalculator } from '../calculators/MutualFundCostCalculator';
import { SukanyaSamriddhiCalculator } from '../calculators/SukanyaSamriddhiCalculator';
import { NpsCalculator } from '../calculators/NpsCalculator';
import { NpsTier2Calculator } from '../calculators/NpsTier2Calculator';
import { PostOfficeCalculator } from '../calculators/PostOfficeCalculator';
import { GoldInvestmentCalculator } from '../calculators/GoldInvestmentCalculator';
import { CompoundInterestCalculator } from '../calculators/CompoundInterestCalculator';
import { SimpleInterestCalculator } from '../calculators/SimpleInterestCalculator';
import { FutureValueCalculator } from '../calculators/FutureValueCalculator';
import { CapitalGainsTaxCalculator } from '../calculators/CapitalGainsTaxCalculator';
import { TdsCalculator } from '../calculators/TdsCalculator';
import { Section80CCalculator } from '../calculators/Section80CCalculator';
import { Section80DCalculator } from '../calculators/Section80DCalculator';
import { HraExemptionCalculator } from '../calculators/HraExemptionCalculator';
import { RetirementCalculator } from '../calculators/RetirementCalculator';
import { PensionCalculator } from '../calculators/PensionCalculator';
import { HumanLifeValueCalculator } from '../calculators/HumanLifeValueCalculator';
import { BreakEvenCalculator } from '../calculators/BreakEvenCalculator';
import { ProfitMarginCalculator } from '../calculators/ProfitMarginCalculator';
import { InventoryTurnoverCalculator } from '../calculators/InventoryTurnoverCalculator';
import { DebtEquityCalculator } from '../calculators/DebtEquityCalculator';
import { RentVsBuyCalculator } from '../calculators/RentVsBuyCalculator';
import { PropertyInvestmentCalculator } from '../calculators/PropertyInvestmentCalculator';
import { StampDutyCalculator } from '../calculators/StampDutyCalculator';
import { PropertyRegistrationCalculator } from '../calculators/PropertyRegistrationCalculator';
import { TermInsuranceCalculator } from '../calculators/TermInsuranceCalculator';
import { HealthInsuranceCalculator } from '../calculators/HealthInsuranceCalculator';
import { LifeInsuranceCalculator } from '../calculators/LifeInsuranceCalculator';
import { BudgetCalculator } from '../calculators/BudgetCalculator';
import { EmergencyFundCalculator } from '../calculators/EmergencyFundCalculator';
import { FinancialGoalCalculator } from '../calculators/FinancialGoalCalculator';
import { NetWorthCalculator } from '../calculators/NetWorthCalculator';
import { InflationCalculator } from '../calculators/InflationCalculator';
import { InterestRateConverter } from '../calculators/InterestRateConverter';
import { GratuityCalculator } from '../calculators/GratuityCalculator';
import { TaxSavingInvestmentCalculator } from '../calculators/TaxSavingInvestmentCalculator';
import { BrokerageCalculator } from '../calculators/BrokerageCalculator';
import { MarginTradingCalculator } from '../calculators/MarginTradingCalculator';
import { CommodityMarginCalculator } from '../calculators/CommodityMarginCalculator';
import { ForexMarginCalculator } from '../calculators/ForexMarginCalculator';
import { ForexPipCalculator } from '../calculators/ForexPipCalculator';
import { SavingsAccountCalculator } from '../calculators/SavingsAccountCalculator';
import { CurrencyConverter } from '../calculators/CurrencyConverter';

// Import FinTech & Payments calculators
import { StepUpSipCalculator } from '../calculators/StepUpSipCalculator';
import { InflationAdjustedSipCalculator } from '../calculators/InflationAdjustedSipCalculator';
import { RentVsBuyAdvancedCalculator } from '../calculators/RentVsBuyAdvancedCalculator';
import { GoldEtfVsPhysicalCalculator } from '../calculators/GoldEtfVsPhysicalCalculator';
import { IncomeTaxRegimeComparisonCalculator } from '../calculators/IncomeTaxRegimeComparisonCalculator';
import { CapitalGainsTaxAdvancedCalculator } from '../calculators/CapitalGainsTaxAdvancedCalculator';
import { GstSellerCalculator } from '../calculators/GstSellerCalculator';
import { VirtualCardIssuer } from '../calculators/VirtualCardIssuer';
import { BnplCalculator } from '../calculators/BnplCalculator';
import { P2PLendingCalculator } from '../calculators/P2PLendingCalculator';

// Import Investments & Wealth Management calculators
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

// Import Banking & Finance Tools
import { BankIfscFinder } from '../calculators/BankIfscFinder';
import { AtmLocator } from '../calculators/AtmLocator';
import { BankHolidayCalendar } from '../calculators/BankHolidayCalendar';
import { InterestRatesComparison } from '../calculators/InterestRatesComparison';
import { UpiFailureTroubleshooter } from '../calculators/UpiFailureTroubleshooter';
import { AdvanceTaxCalculator } from '../calculators/AdvanceTaxCalculator';
import { CreditCardFinder } from '../calculators/CreditCardFinder';

interface CalculatorPageProps {
  calculatorId: string;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ calculatorId }) => {
  const navigate = useNavigate();
  const calculator = getCalculatorById(calculatorId);
  
  if (!calculator) {
    return (
      <>
        <SEOHelmet
          title="Calculator Not Found - FinanceGurus Directory"
          description="The requested financial calculator could not be found. Browse our comprehensive collection of 50+ financial calculators for Indian users."
          url={`/calculators/${calculatorId}`}
          noIndex={true}
        />
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
      </>
    );
  }

  // Generate structured data for the calculator
  const calculatorStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calculator.name,
    "description": calculator.description,
    "url": `https://financegurus.directory/calculators/${calculatorId}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "Organization",
      "name": "FinanceGurus Directory",
      "url": "https://financegurus.directory"
    },
    "featureList": [
      "Free online calculator",
      "Accurate calculations",
      "Indian financial context",
      "Mobile responsive",
      "No registration required"
    ],
    "screenshot": "https://financegurus.directory/images/calculator-screenshot.jpg",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  // Generate keywords based on calculator type
  const generateKeywords = () => {
    const baseKeywords = [
      calculator.name.toLowerCase(),
      'calculator',
      'financial calculator',
      'india',
      'free calculator',
      'online calculator'
    ];
    
    // Add category-specific keywords
    if (calculator.category.includes('loan')) {
      baseKeywords.push('loan calculator', 'emi calculator', 'loan emi', 'loan repayment');
    }
    if (calculator.category.includes('tax')) {
      baseKeywords.push('tax calculator', 'income tax', 'tax planning', 'tax saving');
    }
    if (calculator.category.includes('investment')) {
      baseKeywords.push('investment calculator', 'investment planning', 'returns calculator');
    }
    
    return baseKeywords.join(', ');
  };

  // Generate description
  const generateDescription = () => {
    return `${calculator.name} - Free online ${calculator.name.toLowerCase()} for Indian users. ${calculator.description} Get accurate calculations instantly. No registration required.`;
  };
  
  const renderCalculator = () => {
    switch (calculatorId) {
      // Loan Calculators
      case 'emi-calculator':
        return <EmiCalculator />;
      case 'home-loan-calculator':
        return <HomeLoanCalculator />;
      case 'personal-loan-calculator':
        return <PersonalLoanCalculator />;
      case 'car-loan-calculator':
        return <CarLoanCalculator />;
      case 'business-loan-calculator':
        return <BusinessLoanCalculator />;
      case 'loan-comparison-calculator':
        return <LoanComparisonCalculator />;
      case 'loan-prepayment-calculator':
        return <LoanPrepaymentCalculator />;
      case 'loan-refinance-calculator':
        return <LoanRefinanceCalculator />;
      case 'loan-affordability-calculator':
        return <LoanAffordabilityCalculator />;
      case 'loan-tenure-converter':
        return <LoanTenureConverter />;
      case 'credit-card-emi-calculator':
        return <CreditCardEmiCalculator />;
      case 'gold-loan-emi-calculator':
        return <GoldLoanEmiCalculator />;
      case 'nps-return-calculator':
        return <NpsReturnCalculator />;
      
        
      // Investment Calculators
      case 'sip-calculator':
        return <SipCalculator />;
      case 'mutual-fund-returns-calculator':
        return <MutualFundReturnsCalculator />;
      case 'mutual-fund-cost-calculator':
        return <MutualFundCostCalculator />;
      case 'ppf-calculator':
        return <PpfCalculator />;
      case 'sukanya-samriddhi-calculator':
        return <SukanyaSamriddhiCalculator />;
      case 'nps-calculator':
        return <NpsCalculator />;
      case 'nps-tier2-calculator':
        return <NpsTier2Calculator />;
      case 'post-office-calculator':
        return <PostOfficeCalculator />;
      case 'gold-investment-calculator':
        return <GoldInvestmentCalculator />;
      case 'compound-interest-calculator':
        return <CompoundInterestCalculator />;
      case 'simple-interest-calculator':
        return <SimpleInterestCalculator />;
      case 'future-value-calculator':
        return <FutureValueCalculator />;
        
      // Tax Calculators
      case 'income-tax-calculator':
        return <IncomeTaxCalculator />;
      case 'gst-calculator':
        return <GstCalculator />;
      case 'tds-calculator':
        return <TdsCalculator />;
      case 'capital-gains-tax-calculator':
        return <CapitalGainsTaxCalculator />;
      case 'tax-saving-investment-calculator':
        return <TaxSavingInvestmentCalculator />;
      case 'section-80c-calculator':
        return <Section80CCalculator />;
      case 'section-80d-calculator':
        return <Section80DCalculator />;
      case 'hra-exemption-calculator':
        return <HraExemptionCalculator />;
      case 'advance-tax-calculator':
        return <AdvanceTaxCalculator />;
        
      // Retirement Calculators
      case 'retirement-calculator':
        return <RetirementCalculator />;
      case 'pension-calculator':
        return <PensionCalculator />;
      case 'human-life-value-calculator':
        return <HumanLifeValueCalculator />;
        
      // Business Calculators
      case 'break-even-calculator':
        return <BreakEvenCalculator />;
      case 'profit-margin-calculator':
        return <ProfitMarginCalculator />;
      case 'inventory-turnover-calculator':
        return <InventoryTurnoverCalculator />;
      case 'debt-equity-calculator':
        return <DebtEquityCalculator />;
        
      // Property Calculators
      case 'rent-vs-buy-calculator':
        return <RentVsBuyCalculator />;
      case 'property-investment-calculator':
        return <PropertyInvestmentCalculator />;
      case 'stamp-duty-calculator':
        return <StampDutyCalculator />;
      case 'property-registration-calculator':
        return <PropertyRegistrationCalculator />;
        
      // Insurance Calculators
      case 'term-insurance-calculator':
        return <TermInsuranceCalculator />;
      case 'health-insurance-calculator':
        return <HealthInsuranceCalculator />;
      case 'life-insurance-calculator':
        return <LifeInsuranceCalculator />;
        
      // Personal Finance
      case 'budget-calculator':
        return <BudgetCalculator />;
      case 'emergency-fund-calculator':
        return <EmergencyFundCalculator />;
      case 'financial-goal-calculator':
        return <FinancialGoalCalculator />;
      case 'net-worth-calculator':
        return <NetWorthCalculator />;
      case 'inflation-calculator':
        return <InflationCalculator />;
      case 'interest-rate-converter':
        return <InterestRateConverter />;
      case 'gratuity-calculator':
        return <GratuityCalculator />;
        
      // Investment & Trading
      case 'brokerage-calculator':
        return <BrokerageCalculator />;
      case 'margin-trading-calculator':
        return <MarginTradingCalculator />;
      case 'commodity-margin-calculator':
        return <CommodityMarginCalculator />;
      case 'forex-margin-calculator':
        return <ForexMarginCalculator />;
      case 'forex-pip-calculator':
        return <ForexPipCalculator />;
        
      // Banking & Finance Tools
      case 'savings-account-calculator':
        return <SavingsAccountCalculator />;
      case 'currency-converter':
        return <CurrencyConverter />;
      case 'bank-ifsc-finder':
        return <BankIfscFinder />;
      case 'atm-locator':
        return <AtmLocator />;
      case 'bank-holiday-calendar':
        return <BankHolidayCalendar />;
      case 'interest-rates-comparison':
        return <InterestRatesComparison />;
      case 'upi-failure-troubleshooter':
        return <UpiFailureTroubleshooter />;
      case 'credit-card-finder':
        return <CreditCardFinder />;
        
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
    <>
      <SEOHelmet
        title={`${calculator.name} - Free Online Calculator | FinanceGurus Directory`}
        description={generateDescription()}
        keywords={generateKeywords()}
        url={`/calculators/${calculatorId}`}
        image="/images/calculator-default.jpg"
        type="website"
        structuredData={calculatorStructuredData}
        tags={[calculator.name, 'financial calculator', 'india', 'free calculator']}
        alternateLanguages={{
          'en-IN': `https://financegurus.directory/calculators/${calculatorId}`,
          'hi-IN': `https://financegurus.directory/hi/calculators/${calculatorId}`
        }}
      />
      
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
    </>
  );
};

export default CalculatorPage;
