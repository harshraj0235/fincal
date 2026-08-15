"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { notFound, useRouter } from 'next/navigation';
import { getCalculatorById } from '@/data/calculatorData';

const BannerAd = dynamic(() => import('@/components/BannerAd'), { ssr: false });
const PAASection = dynamic(() => import('@/components/PAASection'), { ssr: false });
const CalculatorAIAssistant = dynamic(() => import('@/components/CalculatorAIAssistant'), { ssr: false });
const AdvanceTaxCalculator = dynamic(() => import('@/calculators/AdvanceTaxCalculator'), { ssr: false });
const ApyCalculator = dynamic(() => import('@/calculators/ApyCalculator'), { ssr: false });
const AssetAllocationPlanner = dynamic(() => import('@/calculators/AssetAllocationPlanner'), { ssr: false });
const AtmLocator = dynamic(() => import('@/calculators/AtmLocator'), { ssr: false });
const BankChargesAnalyzer = dynamic(() => import('@/calculators/BankChargesAnalyzer'), { ssr: false });
const BankHolidayCalendar = dynamic(() => import('@/calculators/BankHolidayCalendar'), { ssr: false });
const BankIfscFinder = dynamic(() => import('@/calculators/BankIfscFinder'), { ssr: false });
const BankLockerFinder = dynamic(() => import('@/calculators/BankLockerFinder'), { ssr: false });
const BikeLoanCalculator = dynamic(() => import('@/calculators/BikeLoanCalculator'), { ssr: false });
const BnplCalculator = dynamic(() => import('@/calculators/BnplCalculator'), { ssr: false });
const BreakEvenCalculator = dynamic(() => import('@/calculators/BreakEvenCalculator'), { ssr: false });
const BrokerageCalculator = dynamic(() => import('@/calculators/BrokerageCalculator'), { ssr: false });
const BudgetCalculator = dynamic(() => import('@/calculators/BudgetCalculator'), { ssr: false });
const BusinessLoanCalculator = dynamic(() => import('@/calculators/BusinessLoanCalculator'), { ssr: false });
const CapitalGainsTaxAdvancedCalculator = dynamic(() => import('@/calculators/CapitalGainsTaxAdvancedCalculator'), { ssr: false });
const CapitalGainsTaxCalculator = dynamic(() => import('@/calculators/CapitalGainsTaxCalculator'), { ssr: false });
const CarLoanCalculator = dynamic(() => import('@/calculators/CarLoanCalculator'), { ssr: false });
const CarLoanEmiCalculator = dynamic(() => import('@/calculators/CarLoanEmiCalculator'), { ssr: false });
const ChequeBounceChargesCalculator = dynamic(() => import('@/calculators/ChequeBounceChargesCalculator'), { ssr: false });
const CommodityMarginCalculator = dynamic(() => import('@/calculators/CommodityMarginCalculator'), { ssr: false });
const CompositionSchemeChecker = dynamic(() => import('@/calculators/CompositionSchemeChecker'), { ssr: false });
const CompoundInterestCalculator = dynamic(() => import('@/calculators/CompoundInterestCalculator'), { ssr: false });
const CreditCardEmiCalculator = dynamic(() => import('@/calculators/CreditCardEmiCalculator'), { ssr: false });
const CreditCardFinder = dynamic(() => import('@/calculators/CreditCardFinder'), { ssr: false });
const CrowdfundingInvestmentPortal = dynamic(() => import('@/calculators/CrowdfundingInvestmentPortal'), { ssr: false });
const CryptoTaxEstimator = dynamic(() => import('@/calculators/CryptoTaxEstimator'), { ssr: false });
const CtcCalculator = dynamic(() => import('@/calculators/CtcCalculator'), { ssr: false });
const CurrencyConverter = dynamic(() => import('@/calculators/CurrencyConverter'), { ssr: false });
const DaArrearsCalculator = dynamic(() => import('@/calculators/DaArrearsCalculator'), { ssr: false });
const DebtEquityCalculator = dynamic(() => import('@/calculators/DebtEquityCalculator'), { ssr: false });
const DigitalWealthRoboAdvisor = dynamic(() => import('@/calculators/DigitalWealthRoboAdvisor'), { ssr: false });
const DividendYieldCalculator = dynamic(() => import('@/calculators/DividendYieldCalculator'), { ssr: false });
const EighthPayCommissionCalculator = dynamic(() => import('@/calculators/EighthPayCommissionCalculator'), { ssr: false });
const EducationLoanCalculator = dynamic(() => import('@/calculators/EducationLoanCalculator'), { ssr: false });
const EmergencyFundCalculator = dynamic(() => import('@/calculators/EmergencyFundCalculator'), { ssr: false });
const EmiCalculator = dynamic(() => import('@/calculators/EmiCalculator'), { ssr: false });
const EpfCalculator = dynamic(() => import('@/calculators/EpfCalculator'), { ssr: false });
const FdCalculator = dynamic(() => import('@/calculators/FdCalculator'), { ssr: false });
const FinancialGoalCalculator = dynamic(() => import('@/calculators/FinancialGoalCalculator'), { ssr: false });
const ForexMarginCalculator = dynamic(() => import('@/calculators/ForexMarginCalculator'), { ssr: false });
const ForexPipCalculator = dynamic(() => import('@/calculators/ForexPipCalculator'), { ssr: false });
const FutureValueCalculator = dynamic(() => import('@/calculators/FutureValueCalculator'), { ssr: false });
const GoldEtfVsPhysicalCalculator = dynamic(() => import('@/calculators/GoldEtfVsPhysicalCalculator'), { ssr: false });
const GoldInvestmentCalculator = dynamic(() => import('@/calculators/GoldInvestmentCalculator'), { ssr: false });
const GoldLoanEmiCalculator = dynamic(() => import('@/calculators/GoldLoanEmiCalculator'), { ssr: false });
const GramToTolaConverter = dynamic(() => import('@/calculators/GramToTolaConverter'), { ssr: false });
const GratuityCalculator = dynamic(() => import('@/calculators/GratuityCalculator'), { ssr: false });
const GreenEnergyInvestmentCalculator = dynamic(() => import('@/calculators/GreenEnergyInvestmentCalculator'), { ssr: false });
const GSTAmountCalculator = dynamic(() => import('@/calculators/GSTAmountCalculator'), { ssr: false });
const GstCalculator = dynamic(() => import('@/calculators/GstCalculator'), { ssr: false });
const GSTLiabilityCalculator = dynamic(() => import('@/calculators/GSTLiabilityCalculator'), { ssr: false });
const Gstr1DeadlineCalculator = dynamic(() => import('@/calculators/Gstr1DeadlineCalculator'), { ssr: false });
const GSTR3BDeadlineCalculator = dynamic(() => import('@/calculators/GSTR3BDeadlineCalculator'), { ssr: false });
const GSTRefundChecker = dynamic(() => import('@/calculators/GSTRefundChecker'), { ssr: false });
const GstSellerCalculator = dynamic(() => import('@/calculators/GstSellerCalculator'), { ssr: false });
const GSTSlabCalculator = dynamic(() => import('@/calculators/GSTSlabCalculator'), { ssr: false });
const HealthInsuranceCalculator = dynamic(() => import('@/calculators/HealthInsuranceCalculator'), { ssr: false });
const HomeLoanCalculator = dynamic(() => import('@/calculators/HomeLoanCalculator'), { ssr: false });
const HomeLoanEmiCalculator = dynamic(() => import('@/calculators/HomeLoanEmiCalculator'), { ssr: false });
const HraExemptionCalculator = dynamic(() => import('@/calculators/HraExemptionCalculator'), { ssr: false });
const HSNSACFinder = dynamic(() => import('@/calculators/HSNSACFinder'), { ssr: false });
const HumanLifeValueCalculator = dynamic(() => import('@/calculators/HumanLifeValueCalculator'), { ssr: false });
const IncomeTaxCalculator = dynamic(() => import('@/calculators/IncomeTaxCalculator'), { ssr: false });
const IncomeTaxRegimeComparisonCalculator = dynamic(() => import('@/calculators/IncomeTaxRegimeComparisonCalculator'), { ssr: false });
const InflationAdjustedSipCalculator = dynamic(() => import('@/calculators/InflationAdjustedSipCalculator'), { ssr: false });
const InflationCalculator = dynamic(() => import('@/calculators/InflationCalculator'), { ssr: false });
const InterestRateConverter = dynamic(() => import('@/calculators/InterestRateConverter'), { ssr: false });
const InterestRatesComparison = dynamic(() => import('@/calculators/InterestRatesComparison'), { ssr: false });
const InventoryTurnoverCalculator = dynamic(() => import('@/calculators/InventoryTurnoverCalculator'), { ssr: false });
const ITCEligibilityChecker = dynamic(() => import('@/calculators/ITCEligibilityChecker'), { ssr: false });
const LcmHcfCalculator = dynamic(() => import('@/calculators/LcmHcfCalculator'), { ssr: false });
const LifeInsuranceCalculator = dynamic(() => import('@/calculators/LifeInsuranceCalculator'), { ssr: false });
const LoanAffordabilityCalculator = dynamic(() => import('@/calculators/LoanAffordabilityCalculator'), { ssr: false });
const LoanCalculator = dynamic(() => import('@/calculators/LoanCalculator'), { ssr: false });
const LoanComparisonCalculator = dynamic(() => import('@/calculators/LoanComparisonCalculator'), { ssr: false });
const LoanEligibilityCalculator = dynamic(() => import('@/calculators/LoanEligibilityCalculator'), { ssr: false });
const LoanPrepaymentCalculator = dynamic(() => import('@/calculators/LoanPrepaymentCalculator'), { ssr: false });
const LoanRefinanceCalculator = dynamic(() => import('@/calculators/LoanRefinanceCalculator'), { ssr: false });
const LoanTenureConverter = dynamic(() => import('@/calculators/LoanTenureConverter'), { ssr: false });
const MarginTradingCalculator = dynamic(() => import('@/calculators/MarginTradingCalculator'), { ssr: false });
const MSMELoanEligibilityChecker = dynamic(() => import('@/calculators/MSMELoanEligibilityChecker'), { ssr: false });
const MutualFundCostCalculator = dynamic(() => import('@/calculators/MutualFundCostCalculator'), { ssr: false });
const MutualFundOverlapChecker = dynamic(() => import('@/calculators/MutualFundOverlapChecker'), { ssr: false });
const MutualFundReturnsCalculator = dynamic(() => import('@/calculators/MutualFundReturnsCalculator'), { ssr: false });
const NetWorthCalculator = dynamic(() => import('@/calculators/NetWorthCalculator'), { ssr: false });
const NpsCalculator = dynamic(() => import('@/calculators/NpsCalculator'), { ssr: false });
const NpsReturnCalculator = dynamic(() => import('@/calculators/NpsReturnCalculator'), { ssr: false });
const NpsTier2Calculator = dynamic(() => import('@/calculators/NpsTier2Calculator'), { ssr: false });
const NriStockInvestmentDashboard = dynamic(() => import('@/calculators/NriStockInvestmentDashboard'), { ssr: false });
const NscCalculator = dynamic(() => import('@/calculators/NscCalculator'), { ssr: false });
const P2PLendingCalculator = dynamic(() => import('@/calculators/P2PLendingCalculator'), { ssr: false });
const PensionCalculator = dynamic(() => import('@/calculators/PensionCalculator'), { ssr: false });
const PersonalLoanCalculator = dynamic(() => import('@/calculators/PersonalLoanCalculator'), { ssr: false });
const PersonalLoanEmiCalculator = dynamic(() => import('@/calculators/PersonalLoanEmiCalculator'), { ssr: false });
const PostOfficeCalculator = dynamic(() => import('@/calculators/PostOfficeCalculator'), { ssr: false });
const PostOfficeMisCalculator = dynamic(() => import('@/calculators/PostOfficeMisCalculator'), { ssr: false });
const PpfCalculator = dynamic(() => import('@/calculators/PpfCalculator'), { ssr: false });
const ProfitMarginCalculator = dynamic(() => import('@/calculators/ProfitMarginCalculator'), { ssr: false });
const PropertyCalculator = dynamic(() => import('@/calculators/PropertyCalculator'), { ssr: false });
const PropertyInvestmentCalculator = dynamic(() => import('@/calculators/PropertyInvestmentCalculator'), { ssr: false });
const PropertyRegistrationCalculator = dynamic(() => import('@/calculators/PropertyRegistrationCalculator'), { ssr: false });
const RCMApplicabilityChecker = dynamic(() => import('@/calculators/RCMApplicabilityChecker'), { ssr: false });
const RdCalculator = dynamic(() => import('@/calculators/RdCalculator'), { ssr: false });
const RentVsBuyAdvancedCalculator = dynamic(() => import('@/calculators/RentVsBuyAdvancedCalculator'), { ssr: false });
const RentVsBuyCalculator = dynamic(() => import('@/calculators/RentVsBuyCalculator'), { ssr: false });
const RetirementCalculator = dynamic(() => import('@/calculators/RetirementCalculator'), { ssr: false });
const ReverseGSTCalculator = dynamic(() => import('@/calculators/ReverseGSTCalculator'), { ssr: false });
const RiskAppetiteAssessment = dynamic(() => import('@/calculators/RiskAppetiteAssessment'), { ssr: false });
const SalaryCalculator = dynamic(() => import('@/calculators/SalaryCalculator'), { ssr: false });
const SalarySlipGenerator = dynamic(() => import('@/calculators/SalarySlipGenerator'), { ssr: false });
const SavingsAccountCalculator = dynamic(() => import('@/calculators/SavingsAccountCalculator'), { ssr: false });
const ScssCalculator = dynamic(() => import('@/calculators/ScssCalculator'), { ssr: false });
const Section80CCalculator = dynamic(() => import('@/calculators/Section80CCalculator'), { ssr: false });
const Section80DCalculator = dynamic(() => import('@/calculators/Section80DCalculator'), { ssr: false });
const SeniorCitizenSavingsPlanner = dynamic(() => import('@/calculators/SeniorCitizenSavingsPlanner'), { ssr: false });
const SimpleInterestCalculator = dynamic(() => import('@/calculators/SimpleInterestCalculator'), { ssr: false });
const SipCalculator = dynamic(() => import('@/calculators/SipCalculator'), { ssr: false });
const StableReturnFixedIncomeAggregator = dynamic(() => import('@/calculators/StableReturnFixedIncomeAggregator'), { ssr: false });
const StampDutyCalculator = dynamic(() => import('@/calculators/StampDutyCalculator'), { ssr: false });
const StepDownSipCalculator = dynamic(() => import('@/calculators/StepDownSipCalculator'), { ssr: false });
const StepUpSipCalculator = dynamic(() => import('@/calculators/StepUpSipCalculator'), { ssr: false });
const SukanyaSamriddhiCalculator = dynamic(() => import('@/calculators/SukanyaSamriddhiCalculator'), { ssr: false });
const TaxSaverWizard = dynamic(() => import('@/calculators/TaxSaverWizard'), { ssr: false });
const TaxSavingInvestmentCalculator = dynamic(() => import('@/calculators/TaxSavingInvestmentCalculator'), { ssr: false });
const TdsCalculator = dynamic(() => import('@/calculators/TdsCalculator'), { ssr: false });
const TermInsuranceCalculator = dynamic(() => import('@/calculators/TermInsuranceCalculator'), { ssr: false });
const UpiFailureTroubleshooter = dynamic(() => import('@/calculators/UpiFailureTroubleshooter'), { ssr: false });
const VirtualCardIssuer = dynamic(() => import('@/calculators/VirtualCardIssuer'), { ssr: false });
const XirrTracker = dynamic(() => import('@/calculators/XirrTracker'), { ssr: false });

export default function ClientCalculatorDispatcher({ calculatorId }: { calculatorId: string }) {
  const navigate = useRouter();
  const calculator = getCalculatorById(calculatorId);

  if (!calculator) { notFound(); }

  const renderCalculator = () => {
    switch (calculatorId) {
      case 'advance-tax-calculator': return <AdvanceTaxCalculator />;
      case 'apy-calculator': return <ApyCalculator />;
      case 'asset-allocation-planner': return <AssetAllocationPlanner />;
      case 'atm-locator': return <AtmLocator />;
      case 'bank-charges-analyzer': return <BankChargesAnalyzer />;
      case 'bank-holiday-calendar': return <BankHolidayCalendar />;
      case 'bank-ifsc-finder': return <BankIfscFinder />;
      case 'bank-locker-finder': return <BankLockerFinder />;
      case 'bike-loan-calculator': return <BikeLoanCalculator />;
      case 'bnpl-calculator': return <BnplCalculator />;
      case 'break-even-calculator': return <BreakEvenCalculator />;
      case 'brokerage-calculator': return <BrokerageCalculator />;
      case 'budget-calculator': return <BudgetCalculator />;
      case 'business-loan-calculator': return <BusinessLoanCalculator />;
      case 'capital-gains-tax-advanced-calculator': return <CapitalGainsTaxAdvancedCalculator />;
      case 'capital-gains-tax-calculator': return <CapitalGainsTaxCalculator />;
      case 'car-loan-calculator': return <CarLoanCalculator />;
      case 'car-loan-emi-calculator': return <CarLoanEmiCalculator />;
      case 'cheque-bounce-charges-calculator': return <ChequeBounceChargesCalculator />;
      case 'commodity-margin-calculator': return <CommodityMarginCalculator />;
      case 'composition-scheme-checker': return <CompositionSchemeChecker />;
      case 'compound-interest-calculator': return <CompoundInterestCalculator />;
      case 'credit-card-emi-calculator': return <CreditCardEmiCalculator />;
      case 'credit-card-finder': return <CreditCardFinder />;
      case 'crowdfunding-investment-portal': return <CrowdfundingInvestmentPortal />;
      case 'crypto-tax-estimator': return <CryptoTaxEstimator />;
      case 'ctc-calculator': return <CtcCalculator />;
      case 'currency-converter': return <CurrencyConverter />;
      case 'da-arrears-calculator': return <DaArrearsCalculator />;
      case 'debt-equity-calculator': return <DebtEquityCalculator />;
      case 'digital-wealth-robo-advisor': return <DigitalWealthRoboAdvisor />;
      case 'dividend-yield-calculator': return <DividendYieldCalculator />;
      case 'eighth-pay-commission-calculator': return <EighthPayCommissionCalculator />;
      case 'emergency-fund-calculator': return <EmergencyFundCalculator />;
      case 'emi-calculator': return <EmiCalculator />;
      case 'epf-calculator': return <EpfCalculator />;
      case 'fd-calculator': return <FdCalculator />;
      case 'financial-goal-calculator': return <FinancialGoalCalculator />;
      case 'forex-margin-calculator': return <ForexMarginCalculator />;
      case 'forex-pip-calculator': return <ForexPipCalculator />;
      case 'future-value-calculator': return <FutureValueCalculator />;
      case 'education-loan-calculator': return <EducationLoanCalculator />;
      case 'gold-etf-vs-physical-calculator': return <GoldEtfVsPhysicalCalculator />;
      case 'gold-investment-calculator': return <GoldInvestmentCalculator />;
      case 'gold-loan-emi-calculator': return <GoldLoanEmiCalculator />;
      case 'gram-to-tola-converter': return <GramToTolaConverter />;
      case 'gratuity-calculator': return <GratuityCalculator />;
      case 'green-energy-investment-calculator': return <GreenEnergyInvestmentCalculator />;
      case 'g-s-t-amount-calculator': return <GSTAmountCalculator />;
      case 'gst-calculator': return <GstCalculator />;
      case 'g-s-t-liability-calculator': return <GSTLiabilityCalculator />;
      case 'gstr1-deadline-calculator': return <Gstr1DeadlineCalculator />;
      case 'g-s-t-r3-b-deadline-calculator': return <GSTR3BDeadlineCalculator />;
      case 'g-s-t-refund-checker': return <GSTRefundChecker />;
      case 'gst-seller-calculator': return <GstSellerCalculator />;
      case 'g-s-t-slab-calculator': return <GSTSlabCalculator />;
      case 'health-insurance-calculator': return <HealthInsuranceCalculator />;
      case 'home-loan-calculator': return <HomeLoanCalculator />;
      case 'home-loan-emi-calculator': return <HomeLoanEmiCalculator />;
      case 'hra-exemption-calculator': return <HraExemptionCalculator />;
      case 'h-s-n-s-a-c-finder': return <HSNSACFinder />;
      case 'human-life-value-calculator': return <HumanLifeValueCalculator />;
      case 'income-tax-calculator': return <IncomeTaxCalculator />;
      case 'income-tax-regime-comparison-calculator': return <IncomeTaxRegimeComparisonCalculator />;
      case 'inflation-adjusted-sip-calculator': return <InflationAdjustedSipCalculator />;
      case 'inflation-calculator': return <InflationCalculator />;
      case 'interest-rate-converter': return <InterestRateConverter />;
      case 'interest-rates-comparison': return <InterestRatesComparison />;
      case 'inventory-turnover-calculator': return <InventoryTurnoverCalculator />;
      case 'i-t-c-eligibility-checker': return <ITCEligibilityChecker />;
      case 'lcm-hcf-calculator': return <LcmHcfCalculator />;
      case 'life-insurance-calculator': return <LifeInsuranceCalculator />;
      case 'loan-affordability-calculator': return <LoanAffordabilityCalculator />;
      case 'loan-calculator': return <LoanCalculator />;
      case 'loan-comparison-calculator': return <LoanComparisonCalculator />;
      case 'loan-eligibility-calculator': return <LoanEligibilityCalculator />;
      case 'loan-prepayment-calculator': return <LoanPrepaymentCalculator />;
      case 'loan-refinance-calculator': return <LoanRefinanceCalculator />;
      case 'loan-tenure-converter': return <LoanTenureConverter />;
      case 'margin-trading-calculator': return <MarginTradingCalculator />;
      case 'm-s-m-e-loan-eligibility-checker': return <MSMELoanEligibilityChecker />;
      case 'mutual-fund-cost-calculator': return <MutualFundCostCalculator />;
      case 'mutual-fund-overlap-checker': return <MutualFundOverlapChecker />;
      case 'mutual-fund-returns-calculator': return <MutualFundReturnsCalculator />;
      case 'net-worth-calculator': return <NetWorthCalculator />;
      case 'nps-calculator': return <NpsCalculator />;
      case 'nps-return-calculator': return <NpsReturnCalculator />;
      case 'nps-tier2-calculator': return <NpsTier2Calculator />;
      case 'nri-stock-investment-dashboard': return <NriStockInvestmentDashboard />;
      case 'nsc-calculator': return <NscCalculator />;
      case 'p2-p-lending-calculator': return <P2PLendingCalculator />;
      case 'pension-calculator': return <PensionCalculator />;
      case 'personal-loan-calculator': return <PersonalLoanCalculator />;
      case 'personal-loan-emi-calculator': return <PersonalLoanEmiCalculator />;
      case 'post-office-calculator': return <PostOfficeCalculator />;
      case 'post-office-mis-calculator': return <PostOfficeMisCalculator />;
      case 'ppf-calculator': return <PpfCalculator />;
      case 'profit-margin-calculator': return <ProfitMarginCalculator />;
      case 'property-calculator': return <PropertyCalculator />;
      case 'property-investment-calculator': return <PropertyInvestmentCalculator />;
      case 'property-registration-calculator': return <PropertyRegistrationCalculator />;
      case 'r-c-m-applicability-checker': return <RCMApplicabilityChecker />;
      case 'rd-calculator': return <RdCalculator />;
      case 'rent-vs-buy-advanced-calculator': return <RentVsBuyAdvancedCalculator />;
      case 'rent-vs-buy-calculator': return <RentVsBuyCalculator />;
      case 'retirement-calculator': return <RetirementCalculator />;
      case 'reverse-g-s-t-calculator': return <ReverseGSTCalculator />;
      case 'risk-appetite-assessment': return <RiskAppetiteAssessment />;
      case 'salary-calculator': return <SalaryCalculator />;
      case 'salary-slip-generator': return <SalarySlipGenerator />;
      case 'savings-account-calculator': return <SavingsAccountCalculator />;
      case 'scss-calculator': return <ScssCalculator />;
      case 'section80-c-calculator': return <Section80CCalculator />;
      case 'section80-d-calculator': return <Section80DCalculator />;
      case 'senior-citizen-savings-planner': return <SeniorCitizenSavingsPlanner />;
      case 'simple-interest-calculator': return <SimpleInterestCalculator />;
      case 'sip-calculator': return <SipCalculator />;
      case 'stable-return-fixed-income-aggregator': return <StableReturnFixedIncomeAggregator />;
      case 'stamp-duty-calculator': return <StampDutyCalculator />;
      case 'step-down-sip-calculator': return <StepDownSipCalculator />;
      case 'step-up-sip-calculator': return <StepUpSipCalculator />;
      case 'sukanya-samriddhi-calculator': return <SukanyaSamriddhiCalculator />;
      case 'tax-saver-wizard': return <TaxSaverWizard />;
      case 'tax-saving-investment-calculator': return <TaxSavingInvestmentCalculator />;
      case 'tds-calculator': return <TdsCalculator />;
      case 'term-insurance-calculator': return <TermInsuranceCalculator />;
      case 'upi-failure-troubleshooter': return <UpiFailureTroubleshooter />;
      case 'virtual-card-issuer': return <VirtualCardIssuer />;
      case 'xirr-tracker': return <XirrTracker />;
      default:
        return <div className="p-8 text-center text-red-500 font-bold">Calculator component mapping not found for {calculatorId}</div>;
    }
  };

  const normalizedName = calculator.name.replace(/\s+/g, ' ').trim();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {(calculator.hinglishTitle || calculator.introduction) && (
        <div className="mb-8 text-center max-w-4xl mx-auto">
          {calculator.hinglishTitle && (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {calculator.primaryKeyword ? `${calculator.primaryKeyword} – ` : ''}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-600">
                {calculator.hinglishTitle}
              </span>
            </h1>
          )}
          {calculator.introduction && (
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
              {calculator.introduction}
            </p>
          )}
        </div>
      )}

      <React.Suspense fallback={<div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200/60 overflow-hidden mb-12">
          {renderCalculator()}
        </div>
      </React.Suspense>

      <div className="w-full flex justify-center py-6">
        <BannerAd width={728} height={90} />
      </div>

      {calculator.howToSteps && calculator.howToSteps.length > 0 && (
        <div className="max-w-4xl mx-auto mb-12 bg-white rounded-3xl shadow-sm border border-gray-200/60 p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            How to Use {calculator.name}
          </h2>
          <div className="space-y-6">
            {calculator.howToSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{step.step}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mb-16">
        <CalculatorAIAssistant 
          calculatorName={calculator.name} 
          calculatorDescription={calculator.description} 
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <PAASection faqs={calculator.faqs} title={calculator.name} />
      </div>

      {(calculator.authorName || calculator.lastUpdated || calculator.methodology) && (
        <div className="max-w-4xl mx-auto mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">About This Tool (E-E-A-T Information)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            {calculator.authorName && (
              <div>
                <span className="font-semibold text-gray-900 block">Created By:</span>
                <a href="/about-us" className="text-blue-600 hover:underline">{calculator.authorName}</a>
              </div>
            )}
            {calculator.lastUpdated && (
              <div>
                <span className="font-semibold text-gray-900 block">Last Updated:</span>
                {calculator.lastUpdated}
              </div>
            )}
            {calculator.methodology && (
              <div className="sm:col-span-2">
                <span className="font-semibold text-gray-900 block">Calculation Methodology:</span>
                {calculator.methodology}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
