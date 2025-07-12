import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark, Info } from 'lucide-react';
import { getCalculatorById } from '../data/calculatorData';
import SEOHelmet from '../components/SEOHelmet';
import WhatsAppBanner from '../components/WhatsAppBanner';
import AstroFinanceButton from '../components/AstroFinanceButton';

// Dynamic import map for calculators
const calculatorLazyMap: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  'emi-calculator': lazy(() => import('../calculators/EmiCalculator').then(m => ({ default: m.EmiCalculator }))),
  'home-loan-calculator': lazy(() => import('../calculators/HomeLoanCalculator').then(m => ({ default: m.HomeLoanCalculator }))),
  'personal-loan-calculator': lazy(() => import('../calculators/PersonalLoanCalculator').then(m => ({ default: m.PersonalLoanCalculator }))),
  'car-loan-calculator': lazy(() => import('../calculators/CarLoanCalculator').then(m => ({ default: m.CarLoanCalculator }))),
  'business-loan-calculator': lazy(() => import('../calculators/BusinessLoanCalculator').then(m => ({ default: m.BusinessLoanCalculator }))),
  'loan-comparison-calculator': lazy(() => import('../calculators/LoanComparisonCalculator').then(m => ({ default: m.LoanComparisonCalculator }))),
  'loan-prepayment-calculator': lazy(() => import('../calculators/LoanPrepaymentCalculator').then(m => ({ default: m.LoanPrepaymentCalculator }))),
  'loan-refinance-calculator': lazy(() => import('../calculators/LoanRefinanceCalculator').then(m => ({ default: m.LoanRefinanceCalculator }))),
  'loan-affordability-calculator': lazy(() => import('../calculators/LoanAffordabilityCalculator').then(m => ({ default: m.LoanAffordabilityCalculator }))),
  'loan-tenure-converter': lazy(() => import('../calculators/LoanTenureConverter').then(m => ({ default: m.LoanTenureConverter }))),
  'credit-card-emi-calculator': lazy(() => import('../calculators/CreditCardEmiCalculator').then(m => ({ default: m.CreditCardEmiCalculator }))),
  'gold-loan-emi-calculator': lazy(() => import('../calculators/GoldLoanEmiCalculator').then(m => ({ default: m.GoldLoanEmiCalculator }))),
  'sip-calculator': lazy(() => import('../calculators/SipCalculator').then(m => ({ default: m.SipCalculator }))),
  'mutual-fund-returns-calculator': lazy(() => import('../calculators/MutualFundReturnsCalculator').then(m => ({ default: m.MutualFundReturnsCalculator }))),
  'mutual-fund-cost-calculator': lazy(() => import('../calculators/MutualFundCostCalculator').then(m => ({ default: m.MutualFundCostCalculator }))),
  'ppf-calculator': lazy(() => import('../calculators/PpfCalculator').then(m => ({ default: m.PpfCalculator }))),
  'sukanya-samriddhi-calculator': lazy(() => import('../calculators/SukanyaSamriddhiCalculator').then(m => ({ default: m.SukanyaSamriddhiCalculator }))),
  'nps-calculator': lazy(() => import('../calculators/NpsCalculator').then(m => ({ default: m.NpsCalculator }))),
  'nps-tier2-calculator': lazy(() => import('../calculators/NpsTier2Calculator').then(m => ({ default: m.NpsTier2Calculator }))),
  'nps-return-calculator': lazy(() => import('../calculators/NpsReturnCalculator').then(m => ({ default: m.default }))),
  'post-office-calculator': lazy(() => import('../calculators/PostOfficeCalculator').then(m => ({ default: m.PostOfficeCalculator }))),
  'gold-investment-calculator': lazy(() => import('../calculators/GoldInvestmentCalculator').then(m => ({ default: m.GoldInvestmentCalculator }))),
  'compound-interest-calculator': lazy(() => import('../calculators/CompoundInterestCalculator').then(m => ({ default: m.CompoundInterestCalculator }))),
  'simple-interest-calculator': lazy(() => import('../calculators/SimpleInterestCalculator').then(m => ({ default: m.SimpleInterestCalculator }))),
  'future-value-calculator': lazy(() => import('../calculators/FutureValueCalculator').then(m => ({ default: m.FutureValueCalculator }))),
  'income-tax-calculator': lazy(() => import('../calculators/IncomeTaxCalculator').then(m => ({ default: m.IncomeTaxCalculator }))),
  'gst-calculator': lazy(() => import('../calculators/GstCalculator').then(m => ({ default: m.GstCalculator }))),
  'tds-calculator': lazy(() => import('../calculators/TdsCalculator').then(m => ({ default: m.TdsCalculator }))),
  'capital-gains-tax-calculator': lazy(() => import('../calculators/CapitalGainsTaxCalculator').then(m => ({ default: m.CapitalGainsTaxCalculator }))),
  'tax-saving-investment-calculator': lazy(() => import('../calculators/TaxSavingInvestmentCalculator').then(m => ({ default: m.TaxSavingInvestmentCalculator }))),
  'section-80c-calculator': lazy(() => import('../calculators/Section80CCalculator').then(m => ({ default: m.Section80CCalculator }))),
  'section-80d-calculator': lazy(() => import('../calculators/Section80DCalculator').then(m => ({ default: m.Section80DCalculator }))),
  'hra-exemption-calculator': lazy(() => import('../calculators/HraExemptionCalculator').then(m => ({ default: m.HraExemptionCalculator }))),
  'advance-tax-calculator': lazy(() => import('../calculators/AdvanceTaxCalculator').then(m => ({ default: m.AdvanceTaxCalculator }))),
  'retirement-calculator': lazy(() => import('../calculators/RetirementCalculator').then(m => ({ default: m.RetirementCalculator }))),
  'pension-calculator': lazy(() => import('../calculators/PensionCalculator').then(m => ({ default: m.PensionCalculator }))),
  'human-life-value-calculator': lazy(() => import('../calculators/HumanLifeValueCalculator').then(m => ({ default: m.HumanLifeValueCalculator }))),
  'break-even-calculator': lazy(() => import('../calculators/BreakEvenCalculator').then(m => ({ default: m.BreakEvenCalculator }))),
  'profit-margin-calculator': lazy(() => import('../calculators/ProfitMarginCalculator').then(m => ({ default: m.ProfitMarginCalculator }))),
  'inventory-turnover-calculator': lazy(() => import('../calculators/InventoryTurnoverCalculator').then(m => ({ default: m.InventoryTurnoverCalculator }))),
  'debt-equity-calculator': lazy(() => import('../calculators/DebtEquityCalculator').then(m => ({ default: m.DebtEquityCalculator }))),
  'rent-vs-buy-calculator': lazy(() => import('../calculators/RentVsBuyCalculator').then(m => ({ default: m.RentVsBuyCalculator }))),
  'property-investment-calculator': lazy(() => import('../calculators/PropertyInvestmentCalculator').then(m => ({ default: m.PropertyInvestmentCalculator }))),
  'stamp-duty-calculator': lazy(() => import('../calculators/StampDutyCalculator').then(m => ({ default: m.StampDutyCalculator }))),
  'property-registration-calculator': lazy(() => import('../calculators/PropertyRegistrationCalculator').then(m => ({ default: m.PropertyRegistrationCalculator }))),
  'term-insurance-calculator': lazy(() => import('../calculators/TermInsuranceCalculator').then(m => ({ default: m.TermInsuranceCalculator }))),
  'health-insurance-calculator': lazy(() => import('../calculators/HealthInsuranceCalculator').then(m => ({ default: m.HealthInsuranceCalculator }))),
  'life-insurance-calculator': lazy(() => import('../calculators/LifeInsuranceCalculator').then(m => ({ default: m.LifeInsuranceCalculator }))),
  'budget-calculator': lazy(() => import('../calculators/BudgetCalculator').then(m => ({ default: m.BudgetCalculator }))),
  'emergency-fund-calculator': lazy(() => import('../calculators/EmergencyFundCalculator').then(m => ({ default: m.EmergencyFundCalculator }))),
  'financial-goal-calculator': lazy(() => import('../calculators/FinancialGoalCalculator').then(m => ({ default: m.FinancialGoalCalculator }))),
  'net-worth-calculator': lazy(() => import('../calculators/NetWorthCalculator').then(m => ({ default: m.NetWorthCalculator }))),
  'inflation-calculator': lazy(() => import('../calculators/InflationCalculator').then(m => ({ default: m.InflationCalculator }))),
  'interest-rate-converter': lazy(() => import('../calculators/InterestRateConverter').then(m => ({ default: m.InterestRateConverter }))),
  'gratuity-calculator': lazy(() => import('../calculators/GratuityCalculator').then(m => ({ default: m.GratuityCalculator }))),
  'brokerage-calculator': lazy(() => import('../calculators/BrokerageCalculator').then(m => ({ default: m.BrokerageCalculator }))),
  'margin-trading-calculator': lazy(() => import('../calculators/MarginTradingCalculator').then(m => ({ default: m.MarginTradingCalculator }))),
  'commodity-margin-calculator': lazy(() => import('../calculators/CommodityMarginCalculator').then(m => ({ default: m.CommodityMarginCalculator }))),
  'forex-margin-calculator': lazy(() => import('../calculators/ForexMarginCalculator').then(m => ({ default: m.ForexMarginCalculator }))),
  'forex-pip-calculator': lazy(() => import('../calculators/ForexPipCalculator').then(m => ({ default: m.ForexPipCalculator }))),
  'savings-account-calculator': lazy(() => import('../calculators/SavingsAccountCalculator').then(m => ({ default: m.SavingsAccountCalculator }))),
  'currency-converter': lazy(() => import('../calculators/CurrencyConverter').then(m => ({ default: m.CurrencyConverter }))),
  'lcm-hcf-calculator': lazy(() => import('../calculators/LcmHcfCalculator').then(m => ({ default: m.default }))),
  'step-up-sip-calculator': lazy(() => import('../calculators/StepUpSipCalculator').then(m => ({ default: m.StepUpSipCalculator }))),
  'inflation-adjusted-sip-calculator': lazy(() => import('../calculators/InflationAdjustedSipCalculator').then(m => ({ default: m.InflationAdjustedSipCalculator }))),
  'rent-vs-buy-advanced-calculator': lazy(() => import('../calculators/RentVsBuyAdvancedCalculator').then(m => ({ default: m.RentVsBuyAdvancedCalculator }))),
  'gold-etf-vs-physical-calculator': lazy(() => import('../calculators/GoldEtfVsPhysicalCalculator').then(m => ({ default: m.GoldEtfVsPhysicalCalculator }))),
  'income-tax-regime-comparison-calculator': lazy(() => import('../calculators/IncomeTaxRegimeComparisonCalculator').then(m => ({ default: m.IncomeTaxRegimeComparisonCalculator }))),
  'capital-gains-tax-advanced-calculator': lazy(() => import('../calculators/CapitalGainsTaxAdvancedCalculator').then(m => ({ default: m.CapitalGainsTaxAdvancedCalculator }))),
  'gst-seller-calculator': lazy(() => import('../calculators/GstSellerCalculator').then(m => ({ default: m.GstSellerCalculator }))),
  'virtual-card-issuer': lazy(() => import('../calculators/VirtualCardIssuer').then(m => ({ default: m.VirtualCardIssuer }))),
  'bnpl-calculator': lazy(() => import('../calculators/BnplCalculator').then(m => ({ default: m.BnplCalculator }))),
  'p2p-lending-calculator': lazy(() => import('../calculators/P2PLendingCalculator').then(m => ({ default: m.P2PLendingCalculator }))),
  'mutual-fund-overlap-checker': lazy(() => import('../calculators/MutualFundOverlapChecker').then(m => ({ default: m.MutualFundOverlapChecker }))),
  'xirr-tracker': lazy(() => import('../calculators/XirrTracker').then(m => ({ default: m.XirrTracker }))),
  'dividend-yield-calculator': lazy(() => import('../calculators/DividendYieldCalculator').then(m => ({ default: m.DividendYieldCalculator }))),
  'asset-allocation-planner': lazy(() => import('../calculators/AssetAllocationPlanner').then(m => ({ default: m.AssetAllocationPlanner }))),
  'risk-appetite-assessment': lazy(() => import('../calculators/RiskAppetiteAssessment').then(m => ({ default: m.RiskAppetiteAssessment }))),
  'crowdfunding-investment-portal': lazy(() => import('../calculators/CrowdfundingInvestmentPortal').then(m => ({ default: m.CrowdfundingInvestmentPortal }))),
  'digital-wealth-robo-advisor': lazy(() => import('../calculators/DigitalWealthRoboAdvisor').then(m => ({ default: m.DigitalWealthRoboAdvisor }))),
  'stable-return-fixed-income-aggregator': lazy(() => import('../calculators/StableReturnFixedIncomeAggregator').then(m => ({ default: m.StableReturnFixedIncomeAggregator }))),
  'crypto-tax-estimator': lazy(() => import('../calculators/CryptoTaxEstimator').then(m => ({ default: m.CryptoTaxEstimator }))),
  'nri-stock-investment-dashboard': lazy(() => import('../calculators/NriStockInvestmentDashboard').then(m => ({ default: m.NriStockInvestmentDashboard }))),
  'bank-ifsc-finder': lazy(() => import('../calculators/BankIfscFinder').then(m => ({ default: m.BankIfscFinder }))),
  'atm-locator': lazy(() => import('../calculators/AtmLocator').then(m => ({ default: m.AtmLocator }))),
  'bank-holiday-calendar': lazy(() => import('../calculators/BankHolidayCalendar').then(m => ({ default: m.BankHolidayCalendar }))),
  'interest-rates-comparison': lazy(() => import('../calculators/InterestRatesComparison').then(m => ({ default: m.InterestRatesComparison }))),
  'upi-failure-troubleshooter': lazy(() => import('../calculators/UpiFailureTroubleshooter').then(m => ({ default: m.UpiFailureTroubleshooter }))),
  'credit-card-finder': lazy(() => import('../calculators/CreditCardFinder').then(m => ({ default: m.CreditCardFinder }))),
  'bank-charges-analyzer': lazy(() => import('../calculators/BankChargesAnalyzer').then(m => ({ default: m.BankChargesAnalyzer }))),
};

interface CalculatorPageProps {
  calculatorId: string;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ calculatorId }) => {
  const navigate = useNavigate();
  const calculator = getCalculatorById(calculatorId);
  const LazyCalculator = calculatorLazyMap[calculatorId];

  if (!calculator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Calculator Not Found</h1>
          <p className="text-gray-600 mb-4">The calculator you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }


  
  return (
    <>
      <WhatsAppBanner />
      <AstroFinanceButton />
      <SEOHelmet
        title={`${calculator.name} - Free Online Calculator | FinCalc India`}
        description={`Use our free ${calculator.name.toLowerCase()} to ${calculator.description.toLowerCase()}. Accurate calculations, instant results, and expert guidance.`}
        keywords={`${calculator.name.toLowerCase()}, calculator, financial calculator, ${calculator.category.toLowerCase()}, india`}
        url={`/calculators/${calculatorId}`}
        tags={[calculator.category, 'calculator', 'financial tools']}
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
        <Suspense fallback={<div className="p-8 text-center">Loading calculator...</div>}>
          {LazyCalculator ? <LazyCalculator /> : (
            <div className="text-center py-8">
              <p className="text-neutral-600">
                This calculator is coming soon. Please check back later!
              </p>
            </div>
          )}
        </Suspense>
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
