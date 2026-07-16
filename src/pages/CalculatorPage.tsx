import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCalculatorById } from '../data/calculatorData';
import SEOHelmet from '../components/SEOHelmet';
import { BannerAd } from '../components/BannerAd';
import { PAASection } from '../components/PAASection';
import { CalculatorAIAssistant } from '../components/CalculatorAIAssistant';

// Import all calculators
import { EmiCalculator } from '../calculators/EmiCalculator';
import { SipCalculator } from '../calculators/SipCalculator';
import { PpfCalculator } from '../calculators/PpfCalculator';
import { GstCalculator } from '../calculators/GstCalculator';
import { IncomeTaxCalculator } from '../calculators/IncomeTaxCalculator';
import { HomeLoanCalculator } from '../calculators/HomeLoanCalculator';
import { PersonalLoanCalculator } from '../calculators/PersonalLoanCalculator';
import { CarLoanCalculator } from '../calculators/CarLoanCalculator';
import { BikeLoanCalculator } from '../calculators/BikeLoanCalculator';
import { BusinessLoanCalculator } from '../calculators/BusinessLoanCalculator';
import { LoanComparisonCalculator } from '../calculators/LoanComparisonCalculator';
import { LoanPrepaymentCalculator } from '../calculators/LoanPrepaymentCalculator';
import { LoanRefinanceCalculator } from '../calculators/LoanRefinanceCalculator';
import { LoanAffordabilityCalculator } from '../calculators/LoanAffordabilityCalculator';
import { LoanTenureConverter } from '../calculators/LoanTenureConverter';
import { CreditCardEmiCalculator } from '../calculators/CreditCardEmiCalculator';
import { GoldLoanEmiCalculator } from '../calculators/GoldLoanEmiCalculator';
import { MutualFundReturnsCalculator } from '../calculators/MutualFundReturnsCalculator';
import { MutualFundCostCalculator } from '../calculators/MutualFundCostCalculator';
import { SukanyaSamriddhiCalculator } from '../calculators/SukanyaSamriddhiCalculator';
import { NpsCalculator } from '../calculators/NpsCalculator';
import { NpsTier2Calculator } from '../calculators/NpsTier2Calculator';
import NpsReturnCalculator from '../calculators/NpsReturnCalculator';
import { NscCalculator } from '../calculators/NscCalculator';
import { ScssCalculator } from '../calculators/ScssCalculator';
import { PostOfficeMisCalculator } from '../calculators/PostOfficeMisCalculator';
import { ApyCalculator } from '../calculators/ApyCalculator';
import { PostOfficeCalculator } from '../calculators/PostOfficeCalculator';
import { GoldInvestmentCalculator } from '../calculators/GoldInvestmentCalculator';
import { CompoundInterestCalculator } from '../calculators/CompoundInterestCalculator';
import { SimpleInterestCalculator } from '../calculators/SimpleInterestCalculator';
import { FutureValueCalculator } from '../calculators/FutureValueCalculator';
import LiquidFundCalculator from './tools/LiquidFundCalculator';
import { FdCalculator } from '../calculators/FdCalculator';
import { CapitalGainsTaxCalculator } from '../calculators/CapitalGainsTaxCalculator';
import { TdsCalculator } from '../calculators/TdsCalculator';
import { Section80CCalculator } from '../calculators/Section80CCalculator';
import { Section80DCalculator } from '../calculators/Section80DCalculator';
import { HraExemptionCalculator } from '../calculators/HraExemptionCalculator';
import { RetirementCalculator } from '../calculators/RetirementCalculator';
import { PensionCalculator } from '../calculators/PensionCalculator';
import { HumanLifeValueCalculator } from '../calculators/HumanLifeValueCalculator';
import { EpfCalculator } from '../calculators/EpfCalculator';
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

// Import Math & Education Calculators
import LcmHcfCalculator from '../calculators/LcmHcfCalculator';
import GramToTolaConverter from '../calculators/GramToTolaConverter';

// Import FinTech & Payments calculators
import { StepUpSipCalculator } from '../calculators/StepUpSipCalculator';
import { StepDownSipCalculator } from '../calculators/StepDownSipCalculator';
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
import { BankChargesAnalyzer } from '../calculators/BankChargesAnalyzer';

interface CalculatorPageProps {
  calculatorId: string;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ calculatorId }) => {
  const navigate = useNavigate();
  const calculator = getCalculatorById(calculatorId);
  // Removed unused categoryMeta logic as headers are now handled within components or removed for clarity.

  if (!calculator) {
    return (
      <>
        <SEOHelmet
          title="Calculator Not Found - MoneyCal India"
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
    "@type": "SoftwareApplication",
    "name": calculator.name,
    "description": calculator.description,
    "url": `/calculators/${calculatorId}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "provider": {
      "@type": "Organization",
      "name": "MoneyCal India",
      "url": "https://moneycal.in"
    },
    "featureList": [
      "Free online calculator",
      "Accurate calculations",
      "Indian financial context",
      "Mobile responsive",
      "No registration required"
    ],
    "screenshot": "/images/calculator-screenshot.jpg",
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

    if (calculator.category.includes('loan')) {
      baseKeywords.push('loan calculator', 'emi calculator', 'loan emi', 'loan repayment');
    }
    if (calculator.category.includes('tax')) {
      baseKeywords.push('tax calculator', 'income tax', 'tax planning', 'tax saving');
    }
    if (calculator.category.includes('investment')) {
      baseKeywords.push('investment calculator', 'investment planning', 'returns calculator');
    }

    const combined = [
      ...(calculator.keywords || []),
      ...baseKeywords
    ];

    const deduped = Array.from(new Set(combined.map((keyword) => keyword.trim()).filter(Boolean)));
    return deduped.join(', ');
  };

  const generateDescription = () => {
    const base = calculator.description.endsWith('.') ? calculator.description : `${calculator.description}.`;
    return `${base} Use this free online calculator for Indian users with instant results and clear assumptions.`;
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
      case 'bike-loan-calculator':
        return <BikeLoanCalculator />;
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

      // Investment Calculators
      case 'sip-calculator':
        return <SipCalculator />;
      case 'fd-calculator':
        return <FdCalculator />;
      case 'sbi-fd-calculator':
        return <FdCalculator schemaUrl="/calculators/sbi-fd-calculator" defaultPreset={{ principal: 100000, rate: 6.8, tenure: 1, type: 'years', freq: 'quarterly' }} variantName="SBI FD" />;
      case 'hdfc-fd-calculator':
        return <FdCalculator schemaUrl="/calculators/hdfc-fd-calculator" defaultPreset={{ principal: 500000, rate: 7.25, tenure: 3, type: 'years', freq: 'quarterly' }} variantName="HDFC FD" />;
      case 'icici-fd-calculator':
        return <FdCalculator schemaUrl="/calculators/icici-fd-calculator" defaultPreset={{ principal: 1000000, rate: 7.3, tenure: 5, type: 'years', freq: 'quarterly' }} variantName="ICICI FD" />;
      case 'axis-fd-calculator':
        return <FdCalculator schemaUrl="/calculators/axis-fd-calculator" defaultPreset={{ principal: 300000, rate: 7.35, tenure: 3, type: 'years', freq: 'quarterly' }} variantName="Axis Bank FD" />;
      case 'post-office-fd-calculator':
        return <FdCalculator schemaUrl="/calculators/post-office-fd-calculator" defaultPreset={{ principal: 200000, rate: 7.5, tenure: 5, type: 'years', freq: 'annually' }} variantName="Post Office TD" />;
      case 'yes-bank-fd-calculator':
        return <FdCalculator schemaUrl="/calculators/yes-bank-fd-calculator" defaultPreset={{ principal: 250000, rate: 7.5, tenure: 2, type: 'years', freq: 'quarterly' }} variantName="YES Bank FD" />;
      case 'kotak-fd-calculator':
        return <FdCalculator schemaUrl="/calculators/kotak-fd-calculator" defaultPreset={{ principal: 400000, rate: 7.4, tenure: 3, type: 'years', freq: 'quarterly' }} variantName="Kotak FD" />;
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
      case 'nsc-calculator':
        return <NscCalculator />;
      case 'scss-calculator':
        return <ScssCalculator />;
      case 'post-office-mis-calculator':
        return <PostOfficeMisCalculator />;
      case 'apy-calculator':
        return <ApyCalculator />;
      case 'gold-investment-calculator':
        return <GoldInvestmentCalculator />;
      case 'compound-interest-calculator':
        return <CompoundInterestCalculator />;
      case 'simple-interest-calculator':
        return <SimpleInterestCalculator />;
      case 'future-value-calculator':
        return <FutureValueCalculator />;
      case 'liquid-fund-calculator':
        return <LiquidFundCalculator />;

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
      case 'nps-return-calculator':
        return <NpsReturnCalculator />;
      case 'epf-calculator':
        return <EpfCalculator />;

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
      case 'property-registration-charges-calculator':
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
      case 'bank-charges-analyzer':
        return <BankChargesAnalyzer />;

      // FinTech & Payments Calculators
      case 'step-up-sip-calculator':
        return <StepUpSipCalculator />;
      case 'step-down-sip-calculator':
        // New tapered investing tool: decreasing SIP annually
        // Import at top: import StepDownSipCalculator from '../calculators/StepDownSipCalculator';
        return <StepDownSipCalculator />;
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

      // Math & Education Calculators
      case 'lcm-hcf-calculator':
        return <LcmHcfCalculator />;
      case 'gram-to-tola-converter':
        return <GramToTolaConverter />;

      default:
        return (
          <div className="space-y-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Quick calculation guide</h3>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-700">
                <li>List the key inputs required for {calculator.name.toLowerCase()} (amount, rate, time period, or category-specific values).</li>
                <li>Apply the standard formula and calculate results step by step.</li>
                <li>Use the related tools below to compare scenarios or validate your calculation.</li>
              </ol>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-5">
              <h4 className="text-md font-semibold text-neutral-900 mb-2">Common inputs</h4>
              <div className="flex flex-wrap gap-2">
                {(calculator.keywords || []).slice(0, 6).map((keyword) => (
                  <span key={keyword} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-neutral-600">
              Looking for an interactive calculator? Explore the related tools below or search from the MoneyCal home page.
            </p>
          </div>
        );
    }
  };

  // Unused SEO helpers removed to declutter wrapper. SEO is now handled primarily via individual components or SEOHelmet below.







  const normalizedName = calculator.name.replace(/\s+/g, ' ').trim();
  const titleName = normalizedName.toLowerCase().includes('calculator') ? normalizedName : `${normalizedName} Calculator`;
  const titleWithIndia = titleName.toLowerCase().includes('india') ? titleName : `${titleName} India`;

  return (
    <>
      <SEOHelmet
        title={`${titleWithIndia} | MoneyCal India`}
        description={generateDescription()}
        keywords={generateKeywords()}
        url={`/calculators/${calculatorId}`}
        image="/images/calculator-default.jpg"
        type="website"
        structuredData={{
          ...calculatorStructuredData,
          "@type": "WebApplication",
          "name": calculator.name,
          "url": `/calculators/${calculatorId}`,
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web Browser",
          "featureList": (calculator.keywords && calculator.keywords.length > 0)
            ? calculator.keywords.slice(0, 5)
            : [
              "Free online calculator",
              "Accurate Indian financial calculations",
              "Mobile responsive design",
              "Instant results",
              "No registration required"
            ]
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: calculator.name, url: `/calculators/${calculatorId}` },
        ]}
        faqData={calculator.faqs}
        calculatorData={{
          name: calculator.name,
          description: calculator.description,
          category: calculator.category,
          features: (calculator.keywords && calculator.keywords.length > 0)
            ? calculator.keywords.slice(0, 5)
            : [
              calculator.category,
              'Free online calculator',
              'India-focused assumptions',
              'Instant results',
              'No signup required'
            ],
          authorName: 'Harsh Raj'
        }}
        tags={[calculator.name, 'financial calculator', 'india', 'free calculator']}
        alternateLanguages={{
          'en-IN': `/calculators/${calculatorId}`
        }}
      />

      {renderCalculator()}
      
      {/* AI Assistant */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 mb-16">
        <CalculatorAIAssistant 
          calculatorName={calculator.name} 
          calculatorDescription={calculator.description} 
        />
      </div>
      
      {/* Banner Ad below calculator form */}
      <div className="w-full flex justify-center py-8">
        <BannerAd width={728} height={90} />
      </div>

      {/* PAA Section */}
      <PAASection faqs={calculator.faqs} title={calculator.name} />
    </>
  );
};

export default CalculatorPage;
