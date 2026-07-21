import React from 'react';
const useNavigate = React.lazy(() => import('react-router-dom').then(m => ({ default: m.useNavigate })));
const getCalculatorById = React.lazy(() => import('../data/calculatorData').then(m => ({ default: m.getCalculatorById })));
import SEOHelmet from '../components/SEOHelmet';
const BannerAd = React.lazy(() => import('../components/BannerAd').then(m => ({ default: m.BannerAd })));
const PAASection = React.lazy(() => import('../components/PAASection').then(m => ({ default: m.PAASection })));
const CalculatorAIAssistant = React.lazy(() => import('../components/CalculatorAIAssistant').then(m => ({ default: m.CalculatorAIAssistant })));

// Import all calculators
const EmiCalculator = React.lazy(() => import('../calculators/EmiCalculator').then(m => ({ default: m.EmiCalculator })));
const SipCalculator = React.lazy(() => import('../calculators/SipCalculator').then(m => ({ default: m.SipCalculator })));
const PpfCalculator = React.lazy(() => import('../calculators/PpfCalculator').then(m => ({ default: m.PpfCalculator })));
const GstCalculator = React.lazy(() => import('../calculators/GstCalculator').then(m => ({ default: m.GstCalculator })));
const IncomeTaxCalculator = React.lazy(() => import('../calculators/IncomeTaxCalculator').then(m => ({ default: m.IncomeTaxCalculator })));
const HomeLoanCalculator = React.lazy(() => import('../calculators/HomeLoanCalculator').then(m => ({ default: m.HomeLoanCalculator })));
const PersonalLoanCalculator = React.lazy(() => import('../calculators/PersonalLoanCalculator').then(m => ({ default: m.PersonalLoanCalculator })));
const CarLoanCalculator = React.lazy(() => import('../calculators/CarLoanCalculator').then(m => ({ default: m.CarLoanCalculator })));
const BikeLoanCalculator = React.lazy(() => import('../calculators/BikeLoanCalculator').then(m => ({ default: m.BikeLoanCalculator })));
const BusinessLoanCalculator = React.lazy(() => import('../calculators/BusinessLoanCalculator').then(m => ({ default: m.BusinessLoanCalculator })));
const LoanComparisonCalculator = React.lazy(() => import('../calculators/LoanComparisonCalculator').then(m => ({ default: m.LoanComparisonCalculator })));
const LoanPrepaymentCalculator = React.lazy(() => import('../calculators/LoanPrepaymentCalculator').then(m => ({ default: m.LoanPrepaymentCalculator })));
const LoanRefinanceCalculator = React.lazy(() => import('../calculators/LoanRefinanceCalculator').then(m => ({ default: m.LoanRefinanceCalculator })));
const LoanAffordabilityCalculator = React.lazy(() => import('../calculators/LoanAffordabilityCalculator').then(m => ({ default: m.LoanAffordabilityCalculator })));
const LoanTenureConverter = React.lazy(() => import('../calculators/LoanTenureConverter').then(m => ({ default: m.LoanTenureConverter })));
const CreditCardEmiCalculator = React.lazy(() => import('../calculators/CreditCardEmiCalculator').then(m => ({ default: m.CreditCardEmiCalculator })));
const GoldLoanEmiCalculator = React.lazy(() => import('../calculators/GoldLoanEmiCalculator').then(m => ({ default: m.GoldLoanEmiCalculator })));
const MutualFundReturnsCalculator = React.lazy(() => import('../calculators/MutualFundReturnsCalculator').then(m => ({ default: m.MutualFundReturnsCalculator })));
const MutualFundCostCalculator = React.lazy(() => import('../calculators/MutualFundCostCalculator').then(m => ({ default: m.MutualFundCostCalculator })));
const SukanyaSamriddhiCalculator = React.lazy(() => import('../calculators/SukanyaSamriddhiCalculator').then(m => ({ default: m.SukanyaSamriddhiCalculator })));
const NpsCalculator = React.lazy(() => import('../calculators/NpsCalculator').then(m => ({ default: m.NpsCalculator })));
const NpsTier2Calculator = React.lazy(() => import('../calculators/NpsTier2Calculator').then(m => ({ default: m.NpsTier2Calculator })));
const NpsReturnCalculator = React.lazy(() => import('../calculators/NpsReturnCalculator'));
const NscCalculator = React.lazy(() => import('../calculators/NscCalculator').then(m => ({ default: m.NscCalculator })));
const ScssCalculator = React.lazy(() => import('../calculators/ScssCalculator').then(m => ({ default: m.ScssCalculator })));
const PostOfficeMisCalculator = React.lazy(() => import('../calculators/PostOfficeMisCalculator').then(m => ({ default: m.PostOfficeMisCalculator })));
const ApyCalculator = React.lazy(() => import('../calculators/ApyCalculator').then(m => ({ default: m.ApyCalculator })));
const PostOfficeCalculator = React.lazy(() => import('../calculators/PostOfficeCalculator').then(m => ({ default: m.PostOfficeCalculator })));
const GoldInvestmentCalculator = React.lazy(() => import('../calculators/GoldInvestmentCalculator').then(m => ({ default: m.GoldInvestmentCalculator })));
const CompoundInterestCalculator = React.lazy(() => import('../calculators/CompoundInterestCalculator').then(m => ({ default: m.CompoundInterestCalculator })));
const SimpleInterestCalculator = React.lazy(() => import('../calculators/SimpleInterestCalculator').then(m => ({ default: m.SimpleInterestCalculator })));
const FutureValueCalculator = React.lazy(() => import('../calculators/FutureValueCalculator').then(m => ({ default: m.FutureValueCalculator })));
const LiquidFundCalculator = React.lazy(() => import('./tools/LiquidFundCalculator'));
const FdCalculator = React.lazy(() => import('../calculators/FdCalculator').then(m => ({ default: m.FdCalculator })));
const CapitalGainsTaxCalculator = React.lazy(() => import('../calculators/CapitalGainsTaxCalculator').then(m => ({ default: m.CapitalGainsTaxCalculator })));
const TdsCalculator = React.lazy(() => import('../calculators/TdsCalculator').then(m => ({ default: m.TdsCalculator })));
const Section80CCalculator = React.lazy(() => import('../calculators/Section80CCalculator').then(m => ({ default: m.Section80CCalculator })));
const Section80DCalculator = React.lazy(() => import('../calculators/Section80DCalculator').then(m => ({ default: m.Section80DCalculator })));
const HraExemptionCalculator = React.lazy(() => import('../calculators/HraExemptionCalculator').then(m => ({ default: m.HraExemptionCalculator })));
const RetirementCalculator = React.lazy(() => import('../calculators/RetirementCalculator').then(m => ({ default: m.RetirementCalculator })));
const PensionCalculator = React.lazy(() => import('../calculators/PensionCalculator').then(m => ({ default: m.PensionCalculator })));
const HumanLifeValueCalculator = React.lazy(() => import('../calculators/HumanLifeValueCalculator').then(m => ({ default: m.HumanLifeValueCalculator })));
const EpfCalculator = React.lazy(() => import('../calculators/EpfCalculator').then(m => ({ default: m.EpfCalculator })));
const BreakEvenCalculator = React.lazy(() => import('../calculators/BreakEvenCalculator').then(m => ({ default: m.BreakEvenCalculator })));
const ProfitMarginCalculator = React.lazy(() => import('../calculators/ProfitMarginCalculator').then(m => ({ default: m.ProfitMarginCalculator })));
const InventoryTurnoverCalculator = React.lazy(() => import('../calculators/InventoryTurnoverCalculator').then(m => ({ default: m.InventoryTurnoverCalculator })));
const DebtEquityCalculator = React.lazy(() => import('../calculators/DebtEquityCalculator').then(m => ({ default: m.DebtEquityCalculator })));
const RentVsBuyCalculator = React.lazy(() => import('../calculators/RentVsBuyCalculator').then(m => ({ default: m.RentVsBuyCalculator })));
const PropertyInvestmentCalculator = React.lazy(() => import('../calculators/PropertyInvestmentCalculator').then(m => ({ default: m.PropertyInvestmentCalculator })));
const StampDutyCalculator = React.lazy(() => import('../calculators/StampDutyCalculator').then(m => ({ default: m.StampDutyCalculator })));
const PropertyRegistrationCalculator = React.lazy(() => import('../calculators/PropertyRegistrationCalculator').then(m => ({ default: m.PropertyRegistrationCalculator })));
const TermInsuranceCalculator = React.lazy(() => import('../calculators/TermInsuranceCalculator').then(m => ({ default: m.TermInsuranceCalculator })));
const HealthInsuranceCalculator = React.lazy(() => import('../calculators/HealthInsuranceCalculator').then(m => ({ default: m.HealthInsuranceCalculator })));
const LifeInsuranceCalculator = React.lazy(() => import('../calculators/LifeInsuranceCalculator').then(m => ({ default: m.LifeInsuranceCalculator })));
const BudgetCalculator = React.lazy(() => import('../calculators/BudgetCalculator').then(m => ({ default: m.BudgetCalculator })));
const EmergencyFundCalculator = React.lazy(() => import('../calculators/EmergencyFundCalculator').then(m => ({ default: m.EmergencyFundCalculator })));
const FinancialGoalCalculator = React.lazy(() => import('../calculators/FinancialGoalCalculator').then(m => ({ default: m.FinancialGoalCalculator })));
const NetWorthCalculator = React.lazy(() => import('../calculators/NetWorthCalculator').then(m => ({ default: m.NetWorthCalculator })));
const InflationCalculator = React.lazy(() => import('../calculators/InflationCalculator').then(m => ({ default: m.InflationCalculator })));
const InterestRateConverter = React.lazy(() => import('../calculators/InterestRateConverter').then(m => ({ default: m.InterestRateConverter })));
const GratuityCalculator = React.lazy(() => import('../calculators/GratuityCalculator').then(m => ({ default: m.GratuityCalculator })));
const TaxSavingInvestmentCalculator = React.lazy(() => import('../calculators/TaxSavingInvestmentCalculator').then(m => ({ default: m.TaxSavingInvestmentCalculator })));
const BrokerageCalculator = React.lazy(() => import('../calculators/BrokerageCalculator').then(m => ({ default: m.BrokerageCalculator })));
const MarginTradingCalculator = React.lazy(() => import('../calculators/MarginTradingCalculator').then(m => ({ default: m.MarginTradingCalculator })));
const CommodityMarginCalculator = React.lazy(() => import('../calculators/CommodityMarginCalculator').then(m => ({ default: m.CommodityMarginCalculator })));
const ForexMarginCalculator = React.lazy(() => import('../calculators/ForexMarginCalculator').then(m => ({ default: m.ForexMarginCalculator })));
const ForexPipCalculator = React.lazy(() => import('../calculators/ForexPipCalculator').then(m => ({ default: m.ForexPipCalculator })));
const SavingsAccountCalculator = React.lazy(() => import('../calculators/SavingsAccountCalculator').then(m => ({ default: m.SavingsAccountCalculator })));
const CurrencyConverter = React.lazy(() => import('../calculators/CurrencyConverter').then(m => ({ default: m.CurrencyConverter })));

// Import Math & Education Calculators
const LcmHcfCalculator = React.lazy(() => import('../calculators/LcmHcfCalculator'));
const GramToTolaConverter = React.lazy(() => import('../calculators/GramToTolaConverter'));

// Import FinTech & Payments calculators
const StepUpSipCalculator = React.lazy(() => import('../calculators/StepUpSipCalculator').then(m => ({ default: m.StepUpSipCalculator })));
const StepDownSipCalculator = React.lazy(() => import('../calculators/StepDownSipCalculator').then(m => ({ default: m.StepDownSipCalculator })));
const InflationAdjustedSipCalculator = React.lazy(() => import('../calculators/InflationAdjustedSipCalculator').then(m => ({ default: m.InflationAdjustedSipCalculator })));
const RentVsBuyAdvancedCalculator = React.lazy(() => import('../calculators/RentVsBuyAdvancedCalculator').then(m => ({ default: m.RentVsBuyAdvancedCalculator })));
const GoldEtfVsPhysicalCalculator = React.lazy(() => import('../calculators/GoldEtfVsPhysicalCalculator').then(m => ({ default: m.GoldEtfVsPhysicalCalculator })));
const IncomeTaxRegimeComparisonCalculator = React.lazy(() => import('../calculators/IncomeTaxRegimeComparisonCalculator').then(m => ({ default: m.IncomeTaxRegimeComparisonCalculator })));
const CapitalGainsTaxAdvancedCalculator = React.lazy(() => import('../calculators/CapitalGainsTaxAdvancedCalculator').then(m => ({ default: m.CapitalGainsTaxAdvancedCalculator })));
const GstSellerCalculator = React.lazy(() => import('../calculators/GstSellerCalculator').then(m => ({ default: m.GstSellerCalculator })));
const VirtualCardIssuer = React.lazy(() => import('../calculators/VirtualCardIssuer').then(m => ({ default: m.VirtualCardIssuer })));
const BnplCalculator = React.lazy(() => import('../calculators/BnplCalculator').then(m => ({ default: m.BnplCalculator })));
const P2PLendingCalculator = React.lazy(() => import('../calculators/P2PLendingCalculator').then(m => ({ default: m.P2PLendingCalculator })));

// Import Investments & Wealth Management calculators
const MutualFundOverlapChecker = React.lazy(() => import('../calculators/MutualFundOverlapChecker').then(m => ({ default: m.MutualFundOverlapChecker })));
const XirrTracker = React.lazy(() => import('../calculators/XirrTracker').then(m => ({ default: m.XirrTracker })));
const DividendYieldCalculator = React.lazy(() => import('../calculators/DividendYieldCalculator').then(m => ({ default: m.DividendYieldCalculator })));
const AssetAllocationPlanner = React.lazy(() => import('../calculators/AssetAllocationPlanner').then(m => ({ default: m.AssetAllocationPlanner })));
const RiskAppetiteAssessment = React.lazy(() => import('../calculators/RiskAppetiteAssessment').then(m => ({ default: m.RiskAppetiteAssessment })));
const CrowdfundingInvestmentPortal = React.lazy(() => import('../calculators/CrowdfundingInvestmentPortal').then(m => ({ default: m.CrowdfundingInvestmentPortal })));
const DigitalWealthRoboAdvisor = React.lazy(() => import('../calculators/DigitalWealthRoboAdvisor').then(m => ({ default: m.DigitalWealthRoboAdvisor })));
const StableReturnFixedIncomeAggregator = React.lazy(() => import('../calculators/StableReturnFixedIncomeAggregator').then(m => ({ default: m.StableReturnFixedIncomeAggregator })));
const CryptoTaxEstimator = React.lazy(() => import('../calculators/CryptoTaxEstimator').then(m => ({ default: m.CryptoTaxEstimator })));
const NriStockInvestmentDashboard = React.lazy(() => import('../calculators/NriStockInvestmentDashboard').then(m => ({ default: m.NriStockInvestmentDashboard })));

// Import Banking & Finance Tools
const BankIfscFinder = React.lazy(() => import('../calculators/BankIfscFinder').then(m => ({ default: m.BankIfscFinder })));
const AtmLocator = React.lazy(() => import('../calculators/AtmLocator').then(m => ({ default: m.AtmLocator })));
const BankHolidayCalendar = React.lazy(() => import('../calculators/BankHolidayCalendar').then(m => ({ default: m.BankHolidayCalendar })));
const InterestRatesComparison = React.lazy(() => import('../calculators/InterestRatesComparison').then(m => ({ default: m.InterestRatesComparison })));
const UpiFailureTroubleshooter = React.lazy(() => import('../calculators/UpiFailureTroubleshooter').then(m => ({ default: m.UpiFailureTroubleshooter })));
const AdvanceTaxCalculator = React.lazy(() => import('../calculators/AdvanceTaxCalculator').then(m => ({ default: m.AdvanceTaxCalculator })));
const CreditCardFinder = React.lazy(() => import('../calculators/CreditCardFinder').then(m => ({ default: m.CreditCardFinder })));
const BankChargesAnalyzer = React.lazy(() => import('../calculators/BankChargesAnalyzer').then(m => ({ default: m.BankChargesAnalyzer })));

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
        // Import at top: const StepDownSipCalculator = React.lazy(() => import('../calculators/StepDownSipCalculator'));
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

      <React.Suspense fallback={<div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[--primary-600]"></div></div>}>
        {renderCalculator()}
      </React.Suspense>
      
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
