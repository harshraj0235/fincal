import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, Search, ArrowLeft, Share2, Bookmark, Info } from 'lucide-react';
import { getCalculatorById } from '../data/calculatorData';
import { SEOHead } from '../components/SEOHead';
import { EmiCalculator } from '../calculators/EmiCalculator';
import { SipCalculator } from '../calculators/SipCalculator';
import { GstCalculator } from '../calculators/GstCalculator';
import { PpfCalculator } from '../calculators/PpfCalculator';
import { IncomeTaxCalculator } from '../calculators/IncomeTaxCalculator';
import { HomeLoanCalculator } from '../calculators/HomeLoanCalculator';
import { CarLoanCalculator } from '../calculators/CarLoanCalculator';
import { PersonalLoanCalculator } from '../calculators/PersonalLoanCalculator';
import { LoanComparisonCalculator } from '../calculators/LoanComparisonCalculator';
import { LoanPrepaymentCalculator } from '../calculators/LoanPrepaymentCalculator';
import { LoanRefinanceCalculator } from '../calculators/LoanRefinanceCalculator';
import { CapitalGainsTaxCalculator } from '../calculators/CapitalGainsTaxCalculator';
import { TdsCalculator } from '../calculators/TdsCalculator';
import { HraExemptionCalculator } from '../calculators/HraExemptionCalculator';
import { Section80CCalculator } from '../calculators/Section80CCalculator';
import { Section80DCalculator } from '../calculators/Section80DCalculator';
import { RetirementCalculator } from '../calculators/RetirementCalculator';
import { PensionCalculator } from '../calculators/PensionCalculator';
import { GratuityCalculator } from '../calculators/GratuityCalculator';
import { TermInsuranceCalculator } from '../calculators/TermInsuranceCalculator';
import { HealthInsuranceCalculator } from '../calculators/HealthInsuranceCalculator';
import { LifeInsuranceCalculator } from '../calculators/LifeInsuranceCalculator';
import { HumanLifeValueCalculator } from '../calculators/HumanLifeValueCalculator';
import { NetWorthCalculator } from '../calculators/NetWorthCalculator';
import { EmergencyFundCalculator } from '../calculators/EmergencyFundCalculator';
import { FinancialGoalCalculator } from '../calculators/FinancialGoalCalculator';
import { BudgetCalculator } from '../calculators/BudgetCalculator';
import { InflationCalculator } from '../calculators/InflationCalculator';
import { FutureValueCalculator } from '../calculators/FutureValueCalculator';
import { CompoundInterestCalculator } from '../calculators/CompoundInterestCalculator';
import SimpleInterestCalculator from '../calculators/SimpleInterestCalculator';
import { StampDutyCalculator } from '../calculators/StampDutyCalculator';
import { PropertyRegistrationCalculator } from '../calculators/PropertyRegistrationCalculator';
import { PropertyInvestmentCalculator } from '../calculators/PropertyInvestmentCalculator';
import { RentVsBuyCalculator } from '../calculators/RentVsBuyCalculator';
import { CurrencyConverter } from '../calculators/CurrencyConverter';
import { InterestRateConverter } from '../calculators/InterestRateConverter';
import { LoanTenureConverter } from '../calculators/LoanTenureConverter';
import { CreditCardEmiCalculator } from '../calculators/CreditCardEmiCalculator';
import { SavingsAccountCalculator } from '../calculators/SavingsAccountCalculator';
import { LoanAffordabilityCalculator } from '../calculators/LoanAffordabilityCalculator';
import { BusinessLoanCalculator } from '../calculators/BusinessLoanCalculator';
import { ProfitMarginCalculator } from '../calculators/ProfitMarginCalculator';
import { BreakEvenCalculator } from '../calculators/BreakEvenCalculator';
import { InventoryTurnoverCalculator } from '../calculators/InventoryTurnoverCalculator';
import { DebtEquityCalculator } from '../calculators/DebtEquityCalculator';
import { TaxSavingInvestmentCalculator } from '../calculators/TaxSavingInvestmentCalculator';
import { AdvanceTaxCalculator } from '../calculators/AdvanceTaxCalculator';
import { ForexMarginCalculator } from '../calculators/ForexMarginCalculator';
import { ForexPipCalculator } from '../calculators/ForexPipCalculator';
import { CommodityMarginCalculator } from '../calculators/CommodityMarginCalculator';
import { GoldInvestmentCalculator } from '../calculators/GoldInvestmentCalculator';
import { BrokerageCalculator } from '../calculators/BrokerageCalculator';
import { MarginTradingCalculator } from '../calculators/MarginTradingCalculator';
import { MutualFundReturnsCalculator } from '../calculators/MutualFundReturnsCalculator';
import { MutualFundCostCalculator } from '../calculators/MutualFundCostCalculator';
import { SukanyaSamriddhiCalculator } from '../calculators/SukanyaSamriddhiCalculator';
import { NpsCalculator } from '../calculators/NpsCalculator';
import { NpsTier2Calculator } from '../calculators/NpsTier2Calculator';
import { PostOfficeCalculator } from '../calculators/PostOfficeCalculator';
import { BankIfscFinder } from '../calculators/BankIfscFinder';
import { UpiFailureTroubleshooter } from '../calculators/UpiFailureTroubleshooter';
import { AtmLocator } from '../calculators/AtmLocator';
import { BankHolidayCalendar } from '../calculators/BankHolidayCalendar';
import { InterestRatesComparison } from '../calculators/InterestRatesComparison';

interface CalculatorPageProps {
  calculatorId: string;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ calculatorId }) => {
  const navigate = useNavigate();
  const calculator = getCalculatorById(calculatorId);
  
  if (!calculator) {
    return (
      <div className="text-center py-16">
        <SEOHead 
          title="Calculator Not Found | FinCalc India"
          description="The calculator you're looking for doesn't exist or may have been moved."
          canonicalUrl="/404"
        />
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
  
  // Create structured data for calculator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calculator.name,
    "description": calculator.description,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "url": `https://moneycal.in/calculators/${calculatorId}`
  };
  
  const renderCalculator = () => {
    switch (calculatorId) {
      case 'emi-calculator':
        return <EmiCalculator />;
      case 'sip-calculator':
        return <SipCalculator />;
      case 'gst-calculator':
        return <GstCalculator />;
      case 'ppf-calculator':
        return <PpfCalculator />;
      case 'income-tax-calculator':
        return <IncomeTaxCalculator />;
      case 'home-loan-calculator':
        return <HomeLoanCalculator />;
      case 'car-loan-calculator':
        return <CarLoanCalculator />;
      case 'personal-loan-calculator':
        return <PersonalLoanCalculator />;
      case 'loan-comparison-calculator':
        return <LoanComparisonCalculator />;
      case 'loan-prepayment-calculator':
        return <LoanPrepaymentCalculator />;
      case 'loan-refinance-calculator':
        return <LoanRefinanceCalculator />;
      case 'capital-gains-tax-calculator':
        return <CapitalGainsTaxCalculator />;
      case 'tds-calculator':
        return <TdsCalculator />;
      case 'hra-exemption-calculator':
        return <HraExemptionCalculator />;
      case 'section-80c-calculator':
        return <Section80CCalculator />;
      case 'section-80d-calculator':
        return <Section80DCalculator />;
      case 'retirement-calculator':
        return <RetirementCalculator />;
      case 'pension-calculator':
        return <PensionCalculator />;
      case 'gratuity-calculator':
        return <GratuityCalculator />;
      case 'term-insurance-calculator':
        return <TermInsuranceCalculator />;
      case 'health-insurance-calculator':
        return <HealthInsuranceCalculator />;
      case 'life-insurance-calculator':
        return <LifeInsuranceCalculator />;
      case 'human-life-value-calculator':
        return <HumanLifeValueCalculator />;
      case 'net-worth-calculator':
        return <NetWorthCalculator />;
      case 'emergency-fund-calculator':
        return <EmergencyFundCalculator />;
      case 'financial-goal-calculator':
        return <FinancialGoalCalculator />;
      case 'budget-calculator':
        return <BudgetCalculator />;
      case 'inflation-calculator':
        return <InflationCalculator />;
      case 'future-value-calculator':
        return <FutureValueCalculator />;
      case 'compound-interest-calculator':
        return <CompoundInterestCalculator />;
      case 'simple-interest-calculator':
        return <SimpleInterestCalculator />;
      case 'stamp-duty-calculator':
        return <StampDutyCalculator />;
      case 'property-registration-calculator':
        return <PropertyRegistrationCalculator />;
      case 'property-investment-calculator':
        return <PropertyInvestmentCalculator />;
      case 'rent-vs-buy-calculator':
        return <RentVsBuyCalculator />;
      case 'currency-converter':
        return <CurrencyConverter />;
      case 'interest-rate-converter':
        return <InterestRateConverter />;
      case 'loan-tenure-converter':
        return <LoanTenureConverter />;
      case 'credit-card-emi-calculator':
        return <CreditCardEmiCalculator />;
      case 'savings-account-calculator':
        return <SavingsAccountCalculator />;
      case 'loan-affordability-calculator':
        return <LoanAffordabilityCalculator />;
      case 'business-loan-calculator':
        return <BusinessLoanCalculator />;
      case 'profit-margin-calculator':
        return <ProfitMarginCalculator />;
      case 'break-even-calculator':
        return <BreakEvenCalculator />;
      case 'inventory-turnover-calculator':
        return <InventoryTurnoverCalculator />;
      case 'debt-equity-calculator':
        return <DebtEquityCalculator />;
      case 'tax-saving-investment-calculator':
        return <TaxSavingInvestmentCalculator />;
      case 'advance-tax-calculator':
        return <AdvanceTaxCalculator />;
      case 'forex-margin-calculator':
        return <ForexMarginCalculator />;
      case 'forex-pip-calculator':
        return <ForexPipCalculator />;
      case 'commodity-margin-calculator':
        return <CommodityMarginCalculator />;
      case 'gold-investment-calculator':
        return <GoldInvestmentCalculator />;
      case 'brokerage-calculator':
        return <BrokerageCalculator />;
      case 'margin-trading-calculator':
        return <MarginTradingCalculator />;
      case 'mutual-fund-returns-calculator':
        return <MutualFundReturnsCalculator />;
      case 'mutual-fund-cost-calculator':
        return <MutualFundCostCalculator />;
      case 'sukanya-samriddhi-calculator':
        return <SukanyaSamriddhiCalculator />;
      case 'nps-calculator':
        return <NpsCalculator />;
      case 'nps-tier-2-calculator':
        return <NpsTier2Calculator />;
      case 'post-office-schemes-calculator':
        return <PostOfficeCalculator />;
      case 'bank-ifsc-finder':
        return <BankIfscFinder />;
      case 'upi-failure-troubleshooter':
        return <UpiFailureTroubleshooter />;
      case 'atm-locator':
        return <AtmLocator />;
      case 'bank-holiday-calendar':
        return <BankHolidayCalendar />;
      case 'interest-rates-comparison':
        return <InterestRatesComparison />;
      case 'banking-knowledge':
        return <div className="text-center py-8">
          <p className="text-neutral-600">
            This calculator is coming soon. Please check back later!
          </p>
        </div>;
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
      <SEOHead 
        title={`${calculator.name} | Free Online Calculator | FinCalc India`}
        description={calculator.description}
        canonicalUrl={`/calculators/${calculatorId}`}
        keywords={calculator.keywords?.join(', ')}
        structuredData={structuredData}
      />
      
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