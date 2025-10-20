import { useEffect, Suspense, lazy } from 'react';
import { initPerformanceOptimizations } from './utils/performance';
import { initAnalytics } from './utils/analytics';
import WebVitalsMonitor from './components/WebVitalsMonitor';

import { Layout } from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { calculatorCategories } from './data/calculatorData';
import ToolPlaceholder from './pages/tools/ToolPlaceholder';
import DiscountProfitCalculator from './pages/tools/DiscountProfitCalculator';
import ProductComparisonMatrix from './pages/tools/ProductComparisonMatrix';
import EMIAffordabilityChecker from './pages/tools/EMIAffordabilityChecker';
import RealTimeStockChecker from './pages/tools/RealTimeStockChecker';
import PriceTagLabelCreator from './pages/tools/PriceTagLabelCreator';
import MeetingAgendaNoteTaker from './pages/tools/MeetingAgendaNoteTaker';
import DigitalBusinessCardCreator from './pages/tools/DigitalBusinessCardCreator';
import QRCodeGenerator from './pages/tools/QRCodeGenerator';
import CustomerPersonaBuilder from './pages/tools/CustomerPersonaBuilder';
import TimeZoneConverter from './pages/tools/TimeZoneConverter';
import SalesScriptAssistant from './pages/tools/SalesScriptAssistant';
import SalesPerformanceTracker from './pages/tools/SalesPerformanceTracker';
import CompetitiveAnalysisCheatSheet from './pages/tools/CompetitiveAnalysisCheatSheet';
import OfferProposalTemplateBuilder from './pages/tools/OfferProposalTemplateBuilder';
import SimpleFeedbackFormGenerator from './pages/tools/SimpleFeedbackFormGenerator';

// Lazy load all page-level components
const Home = lazy(() => import('./pages/HomeInvestopedia'));
const HomeOld = lazy(() => import('./pages/HomeNew'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const WriteBlog = lazy(() => import('./pages/WriteBlog'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const SitemapXml = lazy(() => import('./pages/SitemapXml').then(m => ({ default: m.SitemapXml })));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const EditorialPolicy = lazy(() => import('./pages/EditorialPolicy'));
const BankingKnowledge = lazy(() => import('./pages/BankingKnowledge'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const CreditCardFinder = lazy(() => import('./calculators/CreditCardFinder'));
const BankLockerFinder = lazy(() => import('./calculators/BankLockerFinder'));
const MissedCallBankingDirectory = lazy(() => import('./pages/MissedCallBankingDirectory'));
const ExcelTool = lazy(() => import('./pages/ExcelTool'));
const ExcelToolPost = lazy(() => import('./pages/ExcelToolPost'));
const ExcelToolsPage = lazy(() => import('./pages/ExcelToolsPage'));
const ExcelToolDetail = lazy(() => import('./pages/ExcelToolDetail'));
const GovernmentSchemes = lazy(() => import('./pages/GovernmentSchemes'));
const GovernmentSchemePost = lazy(() => import('./pages/GovernmentSchemePost'));
const CryptoSection = lazy(() => import('./pages/CryptoSection'));
const CryptoArticlePost = lazy(() => import('./pages/CryptoArticlePost'));
const AstroFinance = lazy(() => import('./pages/AstroFinance'));
const StockMarket = lazy(() => import('./pages/StockMarket'));
const StockMarketBasics = lazy(() => import('./pages/StockMarketBasics'));
const StockMarketLesson = lazy(() => import('./pages/StockMarketLesson'));
const CoreMarketConcepts = lazy(() => import('./pages/CoreMarketConcepts'));
const FundamentalAnalysis = lazy(() => import('./pages/FundamentalAnalysis'));
const TechnicalAnalysis = lazy(() => import('./pages/TechnicalAnalysis'));
const AdvancedTradingStrategies = lazy(() => import('./pages/AdvancedTradingStrategies'));
const ToolsPracticalApplication = lazy(() => import('./pages/ToolsPracticalApplication'));
const CaseStudiesMarketPsychology = lazy(() => import('./pages/CaseStudiesMarketPsychology'));
const ToolsHub = lazy(() => import('./pages/ToolsHub'));
const TaxToolsHub = lazy(() => import('./pages/TaxToolsHub'));
const FinanceTools = lazy(() => import('./pages/FinanceTools'));
const SIPDelayLossCalculator = lazy(() => import('./pages/finance-tools/SIPDelayLossCalculator'));
const SIPStepUpPlanner = lazy(() => import('./pages/finance-tools/SIPStepUpPlanner'));
const LumpsumVsSIPAnalyzer = lazy(() => import('./pages/finance-tools/LumpsumVsSIPAnalyzer'));
const RealVsNominalReturnCalculator = lazy(() => import('./pages/finance-tools/RealVsNominalReturnCalculator'));
const FDVsMutualFundReturnTool = lazy(() => import('./pages/finance-tools/FDVsMutualFundReturnTool'));
const StockCAGRCalculator = lazy(() => import('./pages/finance-tools/StockCAGRCalculator'));
const PortfolioDiversificationVisualizer = lazy(() => import('./pages/finance-tools/PortfolioDiversificationVisualizer'));
const DividendTracker = lazy(() => import('./pages/finance-tools/DividendTracker'));
const XIRRCalculator = lazy(() => import('./pages/finance-tools/XIRRCalculator'));
const MutualFundExpenseRatioEstimator = lazy(() => import('./pages/finance-tools/MutualFundExpenseRatioEstimator'));
const NiftyVsSensexPerformanceTracker = lazy(() => import('./pages/finance-tools/NiftyVsSensexPerformanceTracker'));
const IndexFundReturnComparison = lazy(() => import('./pages/finance-tools/IndexFundReturnComparison'));
const SIPInflationAdjustedCalculator = lazy(() => import('./pages/finance-tools/SIPInflationAdjustedCalculator'));
const EquityVsDebtSplitRecommender = lazy(() => import('./pages/finance-tools/EquityVsDebtSplitRecommender'));
const AssetAllocationTool = lazy(() => import('./pages/finance-tools/AssetAllocationTool'));
const MutualFundExitLoadTracker = lazy(() => import('./pages/finance-tools/MutualFundExitLoadTracker'));
const SIPMissedPaymentLossEstimator = lazy(() => import('./pages/finance-tools/SIPMissedPaymentLossEstimator'));
const SIPWithdrawalPlanner = lazy(() => import('./pages/finance-tools/SIPWithdrawalPlanner'));
const SIPVsSWPTool = lazy(() => import('./pages/finance-tools/SIPVsSWPTool'));
const MutualFundSIPvsLumpsumAnalyzer = lazy(() => import('./pages/finance-tools/MutualFundSIPvsLumpsumAnalyzer'));
const MutualFundGoalPlanner = lazy(() => import('./pages/finance-tools/MutualFundGoalPlanner'));
const MutualFundPortfolioRebalancer = lazy(() => import('./pages/finance-tools/MutualFundPortfolioRebalancer'));
const MutualFundTaxEfficiencyCalculator = lazy(() => import('./pages/finance-tools/MutualFundTaxEfficiencyCalculator'));
const MutualFundRiskAnalyzer = lazy(() => import('./pages/finance-tools/MutualFundRiskAnalyzer'));
const MutualFundPerformanceTracker = lazy(() => import('./pages/finance-tools/MutualFundPerformanceTracker'));
const MutualFundExpenseRatioCalculator = lazy(() => import('./pages/finance-tools/MutualFundExpenseRatioCalculator'));
const MutualFundExitLoadCalculator = lazy(() => import('./pages/finance-tools/MutualFundExitLoadCalculator'));
const MutualFundSwitchCalculator = lazy(() => import('./pages/finance-tools/MutualFundSwitchCalculator'));
const STCGLTCGClassifier = lazy(() => import('./pages/tax-tools/STCGLTCGClassifier'));
const EquityTaxEstimator = lazy(() => import('./pages/tax-tools/EquityTaxEstimator'));
const MutualFundExitLoadChecker = lazy(() => import('./pages/tax-tools/MutualFundExitLoadChecker'));
const DividendTaxEstimator = lazy(() => import('./pages/tax-tools/DividendTaxEstimator'));
const LossCarryForwardEstimator = lazy(() => import('./pages/tax-tools/LossCarryForwardEstimator'));
const TurnoverCalculatorITR = lazy(() => import('./pages/tax-tools/TurnoverCalculatorITR'));
const IntradayVsDeliveryTaxCalculator = lazy(() => import('./pages/tax-tools/IntradayVsDeliveryTaxCalculator'));
const Section80CTallyAnalyzer = lazy(() => import('./pages/tax-tools/Section80CTallyAnalyzer'));
const ShortTermCapitalLossBenefitEstimator = lazy(() => import('./pages/tax-tools/ShortTermCapitalLossBenefitEstimator'));
const TaxOnPartialSelloffCalculator = lazy(() => import('./pages/tax-tools/TaxOnPartialSelloffCalculator'));
const OffsetLTCGWithAnnualExemptionsTool = lazy(() => import('./pages/tax-tools/OffsetLTCGWithAnnualExemptionsTool'));
const DividendReinvestmentTaxComparison = lazy(() => import('./pages/tax-tools/DividendReinvestmentTaxComparison'));
const TaxOnBonusSharesTracker = lazy(() => import('./pages/tax-tools/TaxOnBonusSharesTracker'));
const TDSImpactVisualizerOnGains = lazy(() => import('./pages/tax-tools/TDSImpactVisualizerOnGains'));
const DebtFundTaxCalculator = lazy(() => import('./pages/tax-tools/DebtFundTaxCalculator'));
const NPSTaxBenefitVsGrowthEstimator = lazy(() => import('./pages/tax-tools/NPSTaxBenefitVsGrowthEstimator'));
const TaxFilingDeadlineReminderWidget = lazy(() => import('./pages/tax-tools/TaxFilingDeadlineReminderWidget'));
const ITRFormTypeHelper = lazy(() => import('./pages/tax-tools/ITRFormTypeHelper'));
const TaxLossHarvestingCalculator = lazy(() => import('./pages/tax-tools/TaxLossHarvestingCalculator'));
const CSVToTaxSummaryTool = lazy(() => import('./pages/tax-tools/CSVToTaxSummaryTool'));
const ELSSLockinVsTaxBenefitVisualizer = lazy(() => import('./pages/tax-tools/ELSSLockinVsTaxBenefitVisualizer'));
const PFvsNPSTaxGrowthComparison = lazy(() => import('./pages/tax-tools/PFvsNPSTaxGrowthComparison'));
const GiftedSharesTaxEstimator = lazy(() => import('./pages/tax-tools/GiftedSharesTaxEstimator'));
const BonusSharesTaxImpactTool = lazy(() => import('./pages/tax-tools/BonusSharesTaxImpactTool'));
const SwitchMFTaxCalculator = lazy(() => import('./pages/tax-tools/SwitchMFTaxCalculator'));
const DeductionBucketVisualizer = lazy(() => import('./pages/tax-tools/80CDeductionBucketVisualizer'));
const TraderTurnoverEstimatorITR = lazy(() => import('./pages/tax-tools/TraderTurnoverEstimatorITR'));
const IntraYearRedemptionTaxTracker = lazy(() => import('./pages/tax-tools/IntraYearRedemptionTaxTracker'));
const DoubleTaxReliefTool = lazy(() => import('./pages/tax-tools/DoubleTaxReliefTool'));
const TaxEfficientWithdrawalPlanner = lazy(() => import('./pages/tax-tools/TaxEfficientWithdrawalPlanner'));
const PFWithdrawalTaxPreview = lazy(() => import('./pages/tax-tools/PFWithdrawalTaxPreview'));
const HighDividendTaxImpactCalculator = lazy(() => import('./pages/tax-tools/HighDividendTaxImpactCalculator'));
const TaxYearComparisonSliderTool = lazy(() => import('./pages/tax-tools/TaxYearComparisonSliderTool'));
const ShortTermLossOffsetVisualizer = lazy(() => import('./pages/tax-tools/ShortTermLossOffsetVisualizer'));
const ExitStrategyTaxVisualizer = lazy(() => import('./pages/tax-tools/ExitStrategyTaxVisualizer'));
const HRAvsLTATaxComparisonTool = lazy(() => import('./pages/tax-tools/HRAvsLTATaxComparisonTool'));
const OldVsNewTaxRegimeHelper = lazy(() => import('./pages/tax-tools/OldVsNewTaxRegimeHelper'));
const CAGRCalculator = lazy(() => import('./pages/CAGRCalculator'));
const PERatioCalculator = lazy(() => import('./pages/PERatioCalculator'));
const IntrinsicValueCalculator = lazy(() => import('./pages/IntrinsicValueCalculator'));

const StockScreener = lazy(() => import('./pages/StockScreener'));
const AstroFinanceHoroscope = lazy(() => import('./pages/AstroFinanceHoroscope'));
const AstroFinanceZodiacTips = lazy(() => import('./pages/AstroFinanceZodiacTips'));
const AstroFinanceLuckyNumberGenerator = lazy(() => import('./pages/AstroFinanceLuckyNumberGenerator'));
const AstroFinanceMuhuratCalculator = lazy(() => import('./pages/AstroFinanceMuhuratCalculator'));
const AstroFinanceZodiacSavingsCalculator = lazy(() => import('./pages/AstroFinanceZodiacSavingsCalculator'));
const AstroFinanceGemstoneCalculator = lazy(() => import('./pages/AstroFinanceGemstoneCalculator'));
const AstroFinanceNakshatraCalculator = lazy(() => import('./pages/AstroFinanceNakshatraCalculator'));
const AstroFinancePlanetaryCalculator = lazy(() => import('./pages/AstroFinancePlanetaryCalculator'));
const AstroFinanceDailyHoroscope = lazy(() => import('./pages/AstroFinanceDailyHoroscope'));
const AstroFinanceCompatibilityCalculator = lazy(() => import('./pages/AstroFinanceCompatibilityCalculator'));
const AstroFinanceYearlyForecast = lazy(() => import('./pages/AstroFinanceYearlyForecast'));
const AstroFinanceCrystalCalculator = lazy(() => import('./pages/AstroFinanceCrystalCalculator'));
const CalculatorCategories = lazy(() => import('./pages/CalculatorCategories'));
const CategoryCalculators = lazy(() => import('./pages/CategoryCalculators'));
const NewsReel = lazy(() => import('./pages/NewsReel'));
const NewsHub = lazy(() => import('./pages/NewsHub'));
const ChequeBounceChargesCalculator = lazy(() => import('./pages/ChequeBounceChargesCalculator'));
const BankTools = lazy(() => import('./pages/BankTools'));
const FinancePostPage = lazy(() => import('./pages/FinancePostPage'));
const ExcelToolHub = lazy(() => import('./pages/ExcelToolHub'));
const SeniorCitizenSavingsPlanner = lazy(() => import('./calculators/SeniorCitizenSavingsPlanner'));
const MSMELoanEligibilityChecker = lazy(() => import('./calculators/MSMELoanEligibilityChecker'));
const GreenEnergyInvestmentCalculator = lazy(() => import('./calculators/GreenEnergyInvestmentCalculator'));
const AuthorProfilePage = lazy(() => import('./pages/AuthorProfilePage'));
const RealTimeStockPortfolioTracker = lazy(() => import('./pages/RealTimeStockPortfolioTracker'));
const InvestingToolsHub = lazy(() => import('./pages/InvestingToolsHub'));
const FinancialEducationHub = lazy(() => import('./pages/FinancialEducationHub'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const InsuranceTools = lazy(() => import('./pages/InsuranceTools'));
const CorporateFinance = lazy(() => import('./pages/CorporateFinance'));
const BusinessValuationCalculator = lazy(() => import('./pages/corporate/BusinessValuationCalculator'));
const LoanAmortizationGenerator = lazy(() => import('./pages/corporate/LoanAmortizationGenerator'));
const MASynergyEstimator = lazy(() => import('./pages/corporate/MASynergyEstimator'));
const WorkingCapitalOptimizer = lazy(() => import('./pages/corporate/WorkingCapitalOptimizer'));
const CapitalStructureAnalyzer = lazy(() => import('./pages/corporate/CapitalStructureAnalyzer'));
const BreakEvenCalculator = lazy(() => import('./pages/corporate/BreakEvenCalculator'));
const DividendPolicyImpactTool = lazy(() => import('./pages/corporate/DividendPolicyImpactTool'));
const FXExposureRiskCalculator = lazy(() => import('./pages/corporate/FXExposureRiskCalculator'));
const CostOfCapitalBenchmarking = lazy(() => import('./pages/corporate/CostOfCapitalBenchmarking'));
const ScenarioAnalysisSimulator = lazy(() => import('./pages/corporate/ScenarioAnalysisSimulator'));
const LifeInsuranceCalculator = lazy(() => import('./pages/insurance/LifeInsuranceCalculator'));
const HealthInsuranceEstimator = lazy(() => import('./pages/insurance/HealthInsuranceEstimator'));
const CarInsuranceCalculator = lazy(() => import('./pages/insurance/CarInsuranceCalculator'));
const TermInsurancePlanner = lazy(() => import('./pages/insurance/TermInsurancePlanner'));
const TravelInsuranceSelector = lazy(() => import('./pages/insurance/TravelInsuranceSelector'));
const HomeInsuranceEstimator = lazy(() => import('./pages/insurance/HomeInsuranceEstimator'));
const TwoWheelerTracker = lazy(() => import('./pages/insurance/TwoWheelerTracker'));
const CriticalIllnessCalculator = lazy(() => import('./pages/insurance/CriticalIllnessCalculator'));
const PortfolioDashboard = lazy(() => import('./pages/insurance/PortfolioDashboard'));
const ULIPCalculator = lazy(() => import('./pages/insurance/ULIPCalculator'));
const GSTTools = lazy(() => import('./pages/GSTTools'));
const GSTCalculator = lazy(() => import('./pages/gst/GSTCalculator'));
const GSTToolPlaceholder = lazy(() => import('./pages/gst/GSTToolPlaceholder'));
const GSTDueDateTracker = lazy(() => import('./pages/gst/GSTDueDateTracker'));
const GSTR3BAutoPrep = lazy(() => import('./pages/gst/GSTR3BAutoPrep'));
const GSTHSNSACFinder = lazy(() => import('./pages/gst/GSTHSNSACFinder'));
const GSTSlabFinder = lazy(() => import('./pages/gst/GSTSlabFinder'));
const GSTCompositionEligibility = lazy(() => import('./pages/gst/GSTCompositionEligibility'));
const GSTLiabilityCalculator = lazy(() => import('./pages/gst/GSTLiabilityCalculator'));
const GSTPenaltyInterestCalculator = lazy(() => import('./pages/gst/GSTPenaltyInterestCalculator'));
const GSTEInvoiceQRValidator = lazy(() => import('./pages/gst/GSTEInvoiceQRValidator'));
const GSTInvoiceGenerator = lazy(() => import('./pages/gst/GSTInvoiceGenerator'));
const GSTEWayDistanceCalculator = lazy(() => import('./pages/gst/GSTEWayDistanceCalculator'));
const GSTRCMCalculator = lazy(() => import('./pages/gst/GSTRCMCalculator'));
const GSTTurnoverTracker = lazy(() => import('./pages/gst/GSTTurnoverTracker'));
const GSTRateImpactAnalyzer = lazy(() => import('./pages/gst/GSTRateImpactAnalyzer'));
const Gstr1DeadlineCalculatorPage = lazy(() => import('./pages/Gstr1DeadlineCalculatorPage'));
const GSTAmountCalculatorPage = lazy(() => import('./pages/gst/GSTAmountCalculatorPage'));
const ReverseGSTCalculatorPage = lazy(() => import('./pages/gst/ReverseGSTCalculatorPage'));
const GSTSlabCalculatorPage = lazy(() => import('./pages/gst/GSTSlabCalculatorPage'));
const GSTR3BDeadlineCalculatorPage = lazy(() => import('./pages/gst/GSTR3BDeadlineCalculatorPage'));
const HSNSACFinderPage = lazy(() => import('./pages/gst/HSNSACFinderPage'));
const GSTLiabilityCalculatorPage = lazy(() => import('./pages/gst/GSTLiabilityCalculatorPage'));
const CompositionSchemeCheckerPage = lazy(() => import('./pages/gst/CompositionSchemeCheckerPage'));
const ITCEligibilityCheckerPage = lazy(() => import('./pages/gst/ITCEligibilityCheckerPage'));
const RCMApplicabilityCheckerPage = lazy(() => import('./pages/gst/RCMApplicabilityCheckerPage'));
const GSTRefundCheckerPage = lazy(() => import('./pages/gst/GSTRefundCheckerPage'));
const InvoicingReceivablesHub = lazy(() => import('./pages/InvoicingReceivablesHub'));
const CustomInvoiceGenerator = lazy(() => import('./pages/invoicing-tools/CustomInvoiceGenerator'));
const InvoiceDueDateTracker = lazy(() => import('./pages/invoicing-tools/InvoiceDueDateTracker'));
const RecurringInvoiceScheduler = lazy(() => import('./pages/invoicing-tools/RecurringInvoiceScheduler'));
const InvoiceAgeingReportVisualizer = lazy(() => import('./pages/invoicing-tools/InvoiceAgeingReportVisualizer'));
const GSTTaxAutoFillInvoiceTool = lazy(() => import('./pages/invoicing-tools/GSTTaxAutoFillInvoiceTool'));
const MultiCurrencyInvoiceGenerator = lazy(() => import('./pages/invoicing-tools/MultiCurrencyInvoiceGenerator'));
const InvoiceToCashCycleTracker = lazy(() => import('./pages/invoicing-tools/InvoiceToCashCycleTracker'));
const PaymentReminderTool = lazy(() => import('./pages/invoicing-tools/PaymentReminderTool'));
const InvoiceDisputeTracker = lazy(() => import('./pages/invoicing-tools/InvoiceDisputeTracker'));
const POToInvoiceConverter = lazy(() => import('./pages/invoicing-tools/POToInvoiceConverter'));
const ReceivablesVsPayablesDashboard = lazy(() => import('./pages/invoicing-tools/ReceivablesVsPayablesDashboard'));
const InvoiceTermsExplainer = lazy(() => import('./pages/invoicing-tools/InvoiceTermsExplainer'));
const ClientWiseInvoiceHistoryVisualizer = lazy(() => import('./pages/invoicing-tools/ClientWiseInvoiceHistoryVisualizer'));
const CustomInvoiceThemeCreator = lazy(() => import('./pages/invoicing-tools/CustomInvoiceThemeCreator'));
const ClientPaymentBehaviorScoreTool = lazy(() => import('./pages/invoicing-tools/ClientPaymentBehaviorScoreTool'));
const PartialPaymentInvoiceTracker = lazy(() => import('./pages/invoicing-tools/PartialPaymentInvoiceTracker'));
const TimeVsBillableHoursGraph = lazy(() => import('./pages/invoicing-tools/TimeVsBillableHoursGraph'));
const InvoiceEmailTracker = lazy(() => import('./pages/invoicing-tools/InvoiceEmailTracker'));
const GSTInclusiveInvoiceBuilder = lazy(() => import('./pages/invoicing-tools/GSTInclusiveInvoiceBuilder'));
const OutstandingReceivableHeatmap = lazy(() => import('./pages/invoicing-tools/OutstandingReceivableHeatmap'));
const FestivalTools = lazy(() => import('./pages/FestivalTools'));
const FestivalLanding = lazy(() => import('./pages/FestivalLanding'));
const FestivalToolPage = lazy(() => import('./pages/festival/FestivalToolPage'));
const GoldTools = lazy(() => import('./pages/GoldTools'));
const GoldToolPage = lazy(() => import('./pages/gold/GoldToolPage'));
const Top10 = lazy(() => import('./pages/Top10'));
const LoanToolsHub = lazy(() => import('./pages/loan-tools/LoanToolsHub'));
const EMICalculator = lazy(() => import('./pages/loan-tools/EMICalculator'));
const FlatRateCalculator = lazy(() => import('./pages/loan-tools/FlatRateCalculator'));
const PrepaymentCalculator = lazy(() => import('./pages/loan-tools/PrepaymentCalculator'));
const DebtStrategies = lazy(() => import('./pages/loan-tools/DebtStrategies'));
const RefinancingCalculator = lazy(() => import('./pages/loan-tools/RefinancingCalculator'));
const LoanAffordabilityCalculator = lazy(() => import('./pages/loan-tools/LoanAffordabilityCalculator'));
const DebtConsolidationCalculator = lazy(() => import('./pages/loan-tools/DebtConsolidationCalculator'));
const AmortizationScheduleViewer = lazy(() => import('./pages/loan-tools/AmortizationScheduleViewer'));
const ComprehensiveFinanceHub = lazy(() => import('./pages/ComprehensiveFinanceHub'));
const MarketAnalysis = lazy(() => import('./pages/MarketAnalysis'));
const SEOBlogManager = lazy(() => import('./components/SEOBlogManager'));
const SEOBlogPost = lazy(() => import('./pages/SEOBlogPost'));
const ContentMarketingHub = lazy(() => import('./components/ContentMarketingHub'));
const KeywordResearchHub = lazy(() => import('./components/KeywordResearchHub'));
const SocialMediaHub = lazy(() => import('./components/SocialMediaHub'));
const UserEngagementHub = lazy(() => import('./components/UserEngagementHub'));
const LocalSEOHub = lazy(() => import('./components/LocalSEOHub'));
const BacklinkHub = lazy(() => import('./components/BacklinkHub'));
const VideoContentHub = lazy(() => import('./components/VideoContentHub'));
const AIPersonalizationHub = lazy(() => import('./components/AIPersonalizationHub'));
const CommunityHub = lazy(() => import('./components/CommunityHub'));
const FinanceCategoriesHub = lazy(() => import('./components/FinanceCategoriesHub'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));
const BudgetCalculator = lazy(() => import('./pages/tools/BudgetCalculator'));
const ExpenseTracker = lazy(() => import('./pages/tools/ExpenseTracker'));
const EmergencyFundCalculator = lazy(() => import('./pages/tools/EmergencyFundCalculator'));
const DebtPayoffCalculator = lazy(() => import('./pages/tools/DebtPayoffCalculator'));
const SavingsGoalCalculator = lazy(() => import('./pages/tools/SavingsGoalCalculator'));
const NetWorthCalculator = lazy(() => import('./pages/tools/NetWorthCalculator'));
const RetirementCalculator = lazy(() => import('./pages/tools/RetirementCalculator'));
const FinancialGoalPlanner = lazy(() => import('./pages/tools/FinancialGoalPlanner'));
const InvestmentCalculator = lazy(() => import('./pages/tools/InvestmentCalculator'));
const TaxCalculator = lazy(() => import('./pages/tools/TaxCalculator'));
const InsuranceCalculator = lazy(() => import('./pages/tools/InsuranceCalculator'));
const CreditScoreCalculator = lazy(() => import('./pages/tools/CreditScoreCalculator'));
const IncomeTaxCalculator = lazy(() => import('./pages/tools/IncomeTaxCalculator'));
const LoanEMICalculator = lazy(() => import('./pages/tools/LoanEMICalculator'));
const MutualFundCalculator = lazy(() => import('./pages/tools/MutualFundCalculator'));
const HomeLoanCalculator = lazy(() => import('./pages/tools/HomeLoanCalculator'));
const PersonalLoanCalculator = lazy(() => import('./pages/tools/PersonalLoanCalculator'));
const SIPCalculator = lazy(() => import('./pages/tools/SIPCalculator'));
const PortfolioAnalyzer = lazy(() => import('./pages/tools/PortfolioAnalyzer'));
const RiskAssessment = lazy(() => import('./pages/tools/RiskAssessment'));
const AssetAllocation = lazy(() => import('./pages/tools/AssetAllocation'));
const LumpsumCalculator = lazy(() => import('./pages/tools/LumpsumCalculator'));
const StockAnalyzer = lazy(() => import('./pages/tools/StockAnalyzer'));
const MutualFundAnalyzer = lazy(() => import('./pages/tools/MutualFundAnalyzer'));
const TaxSavingCalculator = lazy(() => import('./pages/tools/TaxSavingCalculator'));
const InvestmentGoalPlanner = lazy(() => import('./pages/tools/InvestmentGoalPlanner'));
const CompoundInterestCalculator = lazy(() => import('./pages/tools/CompoundInterestCalculator'));
const PersonalFinanceManagement = lazy(() => import('./pages/PersonalFinanceManagement'));
const MonthlyBudgetPlanner = lazy(() => import('./pages/tools/MonthlyBudgetPlanner'));
const PersonalFinanceDashboard = lazy(() => import('./pages/tools/PersonalFinanceDashboard'));
const HowToManagePersonalFinancesIndiaBeginners = lazy(() => import('./pages/personal-finance/HowToManagePersonalFinancesIndiaBeginners'));
const NotFound404 = lazy(() => import('./pages/NotFound404'));

function App() {
  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Initialize analytics
    initAnalytics();
    
    const CONSENT_KEY = 'fincal_cookie_consent_v1';
    const loadAds = () => {
      if (document.querySelector('script[data-adsbygoogle-script]')) return;
      const adsenseScript = document.createElement('script');
      adsenseScript.async = true;
      adsenseScript.dataset.adsbygoogleScript = 'true';
      adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4446717165665089';
      adsenseScript.crossOrigin = 'anonymous';
      document.head.appendChild(adsenseScript);

      if (!document.querySelector('meta[name="google-adsense-account"]')) {
        const adsenseMeta = document.createElement('meta');
        adsenseMeta.name = 'google-adsense-account';
        adsenseMeta.content = 'ca-pub-4446717165665089';
        document.head.appendChild(adsenseMeta);
      }
    };

    const stored = ((): 'accepted' | 'rejected' | 'unset' => {
      try {
        const v = localStorage.getItem(CONSENT_KEY);
        return v === 'accepted' || v === 'rejected' ? v : 'unset';
      } catch {
        return 'unset';
      }
    })();

    if (stored === 'accepted') {
      loadAds();
    } else {
      const onAccept = () => {
        loadAds();
        window.removeEventListener('cookie-consent-accepted', onAccept);
      };
      window.addEventListener('cookie-consent-accepted', onAccept);
      return () => window.removeEventListener('cookie-consent-accepted', onAccept);
    }
  }, []);

  return (
    <>
      <WebVitalsMonitor />
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <Routes>
        {/* Missed Call Banking Directory route - outside Layout */}
        <Route path="/missed-call-banking-directory" element={<MissedCallBankingDirectory />} />
        {/* All other routes inside Layout */}
        <Route path="*" element={
          <Layout>
            <ScrollToTop />
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home-old" element={<HomeOld />} />
                <Route path="/calculators/cheque-bounce-charges-calculator" element={<ChequeBounceChargesCalculator />} />
                {/* Direct Calculator Routes */}
                <Route path="/calculators/emi-calculator" element={<CalculatorPage calculatorId="emi-calculator" />} />
                {/* Math & Education Calculators */}
                <Route path="/calculators/lcm-hcf-calculator" element={<CalculatorPage calculatorId="lcm-hcf-calculator" />} />
                {calculatorCategories.flatMap(category =>
                  category.calculators.map(calculator => (
                    <Route
                      key={calculator.id}
                      path={`/calculators/${calculator.id}`}
                      element={<CalculatorPage calculatorId={calculator.id} />}
                    />
                  ))
                )}
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blog/write" element={<WriteBlog />} />
                <Route path="/blog/category/banking" element={<BankingKnowledge />} />
                {/* SEO Blog Routes */}
                <Route path="/finance-blog" element={<SEOBlogManager />} />
                <Route path="/finance-blog/:slug" element={<SEOBlogPost />} />
                {/* Content Marketing Hub */}
                <Route path="/content-marketing" element={<ContentMarketingHub />} />
                {/* SEO and Marketing Tools */}
                <Route path="/keyword-research" element={<KeywordResearchHub />} />
                <Route path="/social-media" element={<SocialMediaHub />} />
                <Route path="/user-engagement" element={<UserEngagementHub />} />
                <Route path="/local-seo" element={<LocalSEOHub />} />
                <Route path="/backlink-building" element={<BacklinkHub />} />
                <Route path="/video-content" element={<VideoContentHub />} />
                <Route path="/ai-personalization" element={<AIPersonalizationHub />} />
                <Route path="/community" element={<CommunityHub />} />
                <Route path="/finance-categories" element={<FinanceCategoriesHub />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/tools/budget-calculator" element={<BudgetCalculator />} />
                <Route path="/tools/expense-tracker" element={<ExpenseTracker />} />
                <Route path="/tools/emergency-fund-calculator" element={<EmergencyFundCalculator />} />
                <Route path="/tools/debt-payoff-calculator" element={<DebtPayoffCalculator />} />
                <Route path="/tools/savings-goal-calculator" element={<SavingsGoalCalculator />} />
                <Route path="/tools/net-worth-calculator" element={<NetWorthCalculator />} />
                <Route path="/tools/retirement-calculator" element={<RetirementCalculator />} />
                <Route path="/tools/financial-goal-planner" element={<FinancialGoalPlanner />} />
                <Route path="/tools/investment-calculator" element={<InvestmentCalculator />} />
                <Route path="/tools/tax-calculator" element={<TaxCalculator />} />
                <Route path="/tools/insurance-calculator" element={<InsuranceCalculator />} />
                <Route path="/tools/credit-score-calculator" element={<CreditScoreCalculator />} />
                <Route path="/tools/income-tax-calculator" element={<IncomeTaxCalculator />} />
                <Route path="/tools/loan-emi-calculator" element={<LoanEMICalculator />} />
                <Route path="/tools/mutual-fund-calculator" element={<MutualFundCalculator />} />
                <Route path="/tools/home-loan-calculator" element={<HomeLoanCalculator />} />
                <Route path="/tools/personal-loan-calculator" element={<PersonalLoanCalculator />} />
                <Route path="/tools/sip-calculator" element={<SIPCalculator />} />
            <Route path="/tools/portfolio-analyzer" element={<PortfolioAnalyzer />} />
            <Route path="/tools/risk-assessment" element={<RiskAssessment />} />
            <Route path="/tools/asset-allocation" element={<AssetAllocation />} />
            <Route path="/tools/lumpsum-calculator" element={<LumpsumCalculator />} />
            <Route path="/tools/stock-analyzer" element={<StockAnalyzer />} />
            <Route path="/tools/mutual-fund-analyzer" element={<MutualFundAnalyzer />} />
            <Route path="/tools/tax-saving-calculator" element={<TaxSavingCalculator />} />
            <Route path="/tools/investment-goal-planner" element={<InvestmentGoalPlanner />} />
            <Route path="/tools/compound-interest-calculator" element={<CompoundInterestCalculator />} />
            <Route path="/personal-finance-management" element={<PersonalFinanceManagement />} />
            <Route path="/tools/monthly-budget-planner" element={<MonthlyBudgetPlanner />} />
            <Route path="/tools/personal-finance-dashboard" element={<PersonalFinanceDashboard />} />
            <Route path="/tools/savings-goal-calculator" element={<SavingsGoalCalculator />} />
            <Route path="/personal-finance/how-to-manage-personal-finances-india-beginners" element={<HowToManagePersonalFinancesIndiaBeginners />} />
                {/* Excel Tool blog section routes */}
                <Route path="/exceltool" element={<ExcelTool />} />
                <Route path="/exceltool/:slug" element={<ExcelToolPost />} />
                {/* Excel Tools section routes */}
                <Route path="/excel-tools" element={<ExcelToolsPage />} />
                <Route path="/excel-tools/:slug" element={<ExcelToolDetail />} />
                {/* Government Schemes routes */}
                <Route path="/government-schemes" element={<GovernmentSchemes />} />
                <Route path="/government-schemes/:slug" element={<GovernmentSchemePost />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/editorial-policy" element={<EditorialPolicy />} />
                <Route path="/about" element={<Navigate to="/about-us" replace />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/sitemap.xml" element={<SitemapXml />} />
                <Route path="/credit-card-finder" element={<CreditCardFinder />} />
                {/* Crypto Section route */}
                <Route path="/crypto" element={<CryptoSection />} />
                {/* Comprehensive Finance Hub */}
                <Route path="/comprehensive-finance-hub" element={<ComprehensiveFinanceHub />} />
                {/* Market Analysis */}
                <Route path="/market-analysis" element={<MarketAnalysis />} />
                <Route path="/crypto/:slug" element={<CryptoArticlePost />} />
                {/* AstroFinance route */}
                <Route path="/astro-finance" element={<AstroFinance />} />
                 {/* Stock Market route */}
                 <Route path="/stock-market" element={<StockMarket />} />
                                   <Route path="/stock-market/stock-market-basics" element={<StockMarketBasics />} />
                  <Route path="/stock-market/stock-market-basics/lesson/:lessonId" element={<StockMarketLesson />} />
                  <Route path="/stock-market/core-market-concepts" element={<CoreMarketConcepts />} />
                  <Route path="/stock-market/fundamental-analysis" element={<FundamentalAnalysis />} />
                  <Route path="/stock-market/technical-analysis" element={<TechnicalAnalysis />} />
                  <Route path="/stock-market/advanced-trading-strategies" element={<AdvancedTradingStrategies />} />
                  <Route path="/stock-market/tools-practical-application" element={<ToolsPracticalApplication />} />
                  <Route path="/stock-market/case-studies-market-psychology" element={<CaseStudiesMarketPsychology />} />
                  <Route path="/tools" element={<ToolsHub />} />
                  <Route path="/tools/" element={<ToolsHub />} />
                  <Route path="/tax-tools" element={<TaxToolsHub />} />
                                     <Route path="/finance-tools" element={<FinanceTools />} />
                   <Route path="/finance-tools/sip-delay-loss-calculator" element={<SIPDelayLossCalculator />} />
                   <Route path="/finance-tools/sip-step-up-planner" element={<SIPStepUpPlanner />} />
                   <Route path="/finance-tools/lumpsum-vs-sip-analyzer" element={<LumpsumVsSIPAnalyzer />} />
                   <Route path="/finance-tools/real-vs-nominal-return-calculator" element={<RealVsNominalReturnCalculator />} />
                   <Route path="/finance-tools/fd-vs-mutual-fund-return-tool" element={<FDVsMutualFundReturnTool />} />
                   <Route path="/finance-tools/stock-cagr-calculator" element={<StockCAGRCalculator />} />
                   <Route path="/finance-tools/portfolio-diversification-visualizer" element={<PortfolioDiversificationVisualizer />} />
                   <Route path="/finance-tools/dividend-tracker" element={<DividendTracker />} />
                   <Route path="/finance-tools/xirr-calculator" element={<XIRRCalculator />} />
                   <Route path="/finance-tools/mutual-fund-expense-ratio-estimator" element={<MutualFundExpenseRatioEstimator />} />
                   <Route path="/finance-tools/nifty-vs-sensex-performance-tracker" element={<NiftyVsSensexPerformanceTracker />} />
                   <Route path="/finance-tools/index-fund-return-comparison" element={<IndexFundReturnComparison />} />
                   <Route path="/finance-tools/sip-inflation-adjusted-calculator" element={<SIPInflationAdjustedCalculator />} />
                   <Route path="/finance-tools/equity-vs-debt-split-recommender" element={<EquityVsDebtSplitRecommender />} />
                                   <Route path="/finance-tools/asset-allocation-tool" element={<AssetAllocationTool />} />
                <Route path="/finance-tools/mutual-fund-exit-load-tracker" element={<MutualFundExitLoadTracker />} />
                <Route path="/finance-tools/sip-missed-payment-loss-estimator" element={<SIPMissedPaymentLossEstimator />} />
                <Route path="/finance-tools/sip-withdrawal-planner" element={<SIPWithdrawalPlanner />} />
                <Route path="/finance-tools/sip-vs-swp-tool" element={<SIPVsSWPTool />} />
                <Route path="/finance-tools/mutual-fund-sip-vs-lumpsum-analyzer" element={<MutualFundSIPvsLumpsumAnalyzer />} />
                <Route path="/finance-tools/mutual-fund-goal-planner" element={<MutualFundGoalPlanner />} />
                <Route path="/finance-tools/mutual-fund-portfolio-rebalancer" element={<MutualFundPortfolioRebalancer />} />
                <Route path="/finance-tools/mutual-fund-tax-efficiency-calculator" element={<MutualFundTaxEfficiencyCalculator />} />
                <Route path="/finance-tools/mutual-fund-risk-analyzer" element={<MutualFundRiskAnalyzer />} />
                <Route path="/finance-tools/mutual-fund-performance-tracker" element={<MutualFundPerformanceTracker />} />
                <Route path="/finance-tools/mutual-fund-expense-ratio-calculator" element={<MutualFundExpenseRatioCalculator />} />
                <Route path="/finance-tools/mutual-fund-exit-load-calculator" element={<MutualFundExitLoadCalculator />} />
                <Route path="/finance-tools/mutual-fund-switch-calculator" element={<MutualFundSwitchCalculator />} />
                <Route path="/tax-tools/stcg-ltcg-classifier" element={<STCGLTCGClassifier />} />
                  <Route path="/tax-tools/equity-tax-estimator" element={<EquityTaxEstimator />} />
                  <Route path="/tax-tools/mutual-fund-exit-load-checker" element={<MutualFundExitLoadChecker />} />
                  <Route path="/tax-tools/dividend-tax-estimator" element={<DividendTaxEstimator />} />
                  <Route path="/tax-tools/loss-carry-forward-estimator" element={<LossCarryForwardEstimator />} />
                  <Route path="/tax-tools/turnover-calculator-itr" element={<TurnoverCalculatorITR />} />
                  <Route path="/tax-tools/intraday-vs-delivery-tax-calculator" element={<IntradayVsDeliveryTaxCalculator />} />
                  <Route path="/tax-tools/section-80c-tally-analyzer" element={<Section80CTallyAnalyzer />} />
                  <Route path="/tax-tools/short-term-capital-loss-benefit-estimator" element={<ShortTermCapitalLossBenefitEstimator />} />
                  <Route path="/tax-tools/tax-on-partial-selloff-calculator" element={<TaxOnPartialSelloffCalculator />} />
                  <Route path="/tax-tools/offset-ltcg-with-annual-exemptions-tool" element={<OffsetLTCGWithAnnualExemptionsTool />} />
                  <Route path="/tax-tools/dividend-reinvestment-tax-comparison" element={<DividendReinvestmentTaxComparison />} />
                  <Route path="/tax-tools/tax-on-bonus-shares-tracker" element={<TaxOnBonusSharesTracker />} />
                  <Route path="/tax-tools/tds-impact-visualizer-on-gains" element={<TDSImpactVisualizerOnGains />} />
                  <Route path="/tax-tools/debt-fund-tax-calculator" element={<DebtFundTaxCalculator />} />
                  <Route path="/tax-tools/nps-tax-benefit-vs-growth-estimator" element={<NPSTaxBenefitVsGrowthEstimator />} />
                  <Route path="/tax-tools/tax-filing-deadline-reminder-widget" element={<TaxFilingDeadlineReminderWidget />} />
                  <Route path="/tax-tools/itr-form-type-helper" element={<ITRFormTypeHelper />} />
                  <Route path="/tax-tools/tax-loss-harvesting-calculator" element={<TaxLossHarvestingCalculator />} />
                  <Route path="/tax-tools/csv-to-tax-summary-tool" element={<CSVToTaxSummaryTool />} />
                  <Route path="/tax-tools/elss-lockin-vs-tax-benefit-visualizer" element={<ELSSLockinVsTaxBenefitVisualizer />} />
                  <Route path="/tax-tools/pf-vs-nps-tax-growth-comparison" element={<PFvsNPSTaxGrowthComparison />} />
                  <Route path="/tax-tools/gifted-shares-tax-estimator" element={<GiftedSharesTaxEstimator />} />
                  <Route path="/tax-tools/bonus-shares-tax-impact-tool" element={<BonusSharesTaxImpactTool />} />
                  <Route path="/tax-tools/switch-mf-tax-calculator" element={<SwitchMFTaxCalculator />} />
                  <Route path="/tax-tools/80c-deduction-bucket-visualizer" element={<DeductionBucketVisualizer />} />
                  <Route path="/tax-tools/trader-turnover-estimator-itr" element={<TraderTurnoverEstimatorITR />} />
                  <Route path="/tax-tools/intra-year-redemption-tax-tracker" element={<IntraYearRedemptionTaxTracker />} />
                  <Route path="/tax-tools/double-tax-relief-tool" element={<DoubleTaxReliefTool />} />
                  <Route path="/tax-tools/tax-efficient-withdrawal-planner" element={<TaxEfficientWithdrawalPlanner />} />
                  <Route path="/tax-tools/pf-withdrawal-tax-preview" element={<PFWithdrawalTaxPreview />} />
                  <Route path="/tax-tools/high-dividend-tax-impact-calculator" element={<HighDividendTaxImpactCalculator />} />
                                      <Route path="/tax-tools/tax-year-comparison-slider-tool" element={<TaxYearComparisonSliderTool />} />
                    <Route path="/tax-tools/short-term-loss-offset-visualizer" element={<ShortTermLossOffsetVisualizer />} />
                    <Route path="/tax-tools/exit-strategy-tax-visualizer" element={<ExitStrategyTaxVisualizer />} />
                    <Route path="/tax-tools/hra-vs-lta-tax-comparison-tool" element={<HRAvsLTATaxComparisonTool />} />
                    <Route path="/tax-tools/old-vs-new-tax-regime-helper" element={<OldVsNewTaxRegimeHelper />} />
                    <Route path="/calculators/cagr-calculator" element={<CAGRCalculator />} />
                  <Route path="/calculators/pe-ratio-calculator" element={<PERatioCalculator />} />
                  <Route path="/calculators/intrinsic-value-calculator" element={<IntrinsicValueCalculator />} />
                  
                  <Route path="/calculators/stock-screener" element={<StockScreener />} />
                <Route path="/astro-finance/horoscope" element={<AstroFinanceHoroscope />} />
                <Route path="/astro-finance/zodiac-tips" element={<AstroFinanceZodiacTips />} />
                <Route path="/astro-finance/lucky-numbers" element={<AstroFinanceLuckyNumberGenerator />} />
                <Route path="/astro-finance/muhurat" element={<AstroFinanceMuhuratCalculator />} />
                <Route path="/astro-finance/savings-calculator" element={<AstroFinanceZodiacSavingsCalculator />} />
                <Route path="/astro-finance/gemstone-calculator" element={<AstroFinanceGemstoneCalculator />} />
                <Route path="/astro-finance/nakshatra-calculator" element={<AstroFinanceNakshatraCalculator />} />
                <Route path="/astro-finance/planetary-calculator" element={<AstroFinancePlanetaryCalculator />} />
                <Route path="/astro-finance/daily-horoscope" element={<AstroFinanceDailyHoroscope />} />
                <Route path="/astro-finance/compatibility" element={<AstroFinanceCompatibilityCalculator />} />
                <Route path="/astro-finance/yearly-forecast" element={<AstroFinanceYearlyForecast />} />
                <Route path="/astro-finance/crystal-calculator" element={<AstroFinanceCrystalCalculator />} />
                <Route path="/astro-finance/blog/:slug" element={<BlogPost />} />
                {/* Calculator Categories route */}
                <Route path="/calculators" element={<CalculatorCategories />} />
                <Route path="/calculators/category/:categoryId" element={<CategoryCalculators />} />
                {/* News Reel route */}
                <Route path="/news-reel" element={<NewsReel />} />
                {/* NewsHub route */}
                <Route path="/news" element={<NewsHub />} />
                {/* Finance Blog Post route */}
                <Route path="/finance/:slug" element={<FinancePostPage />} />
                <Route path="/calculators/bank-locker-finder" element={<BankLockerFinder />} />
                <Route path="/bank-tools" element={<BankTools />} />
                {/* Excel Tool Hub route */}
                <Route path="/excel-tool" element={<ExcelToolHub />} />
                <Route path="/calculators/senior-citizen-savings-planner" element={<SeniorCitizenSavingsPlanner />} />
                <Route path="/calculators/msme-loan-eligibility" element={<MSMELoanEligibilityChecker />} />
                <Route path="/calculators/green-energy-investment-calculator" element={<GreenEnergyInvestmentCalculator />} />
                <Route path="/author/harsh-raj" element={<AuthorProfilePage />} />
                <Route path="/real-time-stock-portfolio-tracker" element={<RealTimeStockPortfolioTracker />} />
                <Route path="/festival-tools" element={<FestivalTools />} />
                <Route path="/festival-tools/:festivalSlug" element={<FestivalLanding />} />
                <Route path="/festival-tools/:festivalSlug/:toolSlug" element={<FestivalToolPage />} />
                <Route path="/gold-tools" element={<GoldTools />} />
                <Route path="/gold-tools/:toolSlug" element={<GoldToolPage />} />
                <Route path="/top-10" element={<Top10 />} />
                <Route path="/financial-navigator" element={<Navigate to="/financial-education" replace />} />
                <Route path="/excel" element={<Navigate to="/excel-tools" replace />} />
                {/* Loan Tools Routes */}
                <Route path="/loan-tools" element={<LoanToolsHub />} />
                <Route path="/loan-tools/emi-calculator" element={<EMICalculator />} />
                <Route path="/loan-tools/flat-rate-calculator" element={<FlatRateCalculator />} />
                <Route path="/loan-tools/prepayment-calculator" element={<PrepaymentCalculator />} />
                <Route path="/loan-tools/debt-strategies" element={<DebtStrategies />} />
                <Route path="/loan-tools/refinancing-calculator" element={<RefinancingCalculator />} />
                <Route path="/loan-tools/loan-affordability" element={<LoanAffordabilityCalculator />} />
                <Route path="/loan-tools/debt-consolidation-calculator" element={<DebtConsolidationCalculator />} />
                <Route path="/loan-tools/amortization-schedule-viewer" element={<AmortizationScheduleViewer />} />
                <Route path="/investing-tools" element={<InvestingToolsHub />} />
                            <Route path="/financial-education" element={<FinancialEducationHub />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/insurance-tools" element={<InsuranceTools />} />
            <Route path="/corporate-finance" element={<CorporateFinance />} />
            <Route path="/corporate-finance/business-valuation-calculator" element={<BusinessValuationCalculator />} />
            <Route path="/corporate-finance/loan-amortization-generator" element={<LoanAmortizationGenerator />} />
            <Route path="/corporate-finance/ma-synergy-estimator" element={<MASynergyEstimator />} />
            <Route path="/corporate-finance/working-capital-optimizer" element={<WorkingCapitalOptimizer />} />
            <Route path="/corporate-finance/capital-structure-analyzer" element={<CapitalStructureAnalyzer />} />
            <Route path="/corporate-finance/break-even-calculator" element={<BreakEvenCalculator />} />
            <Route path="/corporate-finance/dividend-policy-impact-tool" element={<DividendPolicyImpactTool />} />
            <Route path="/corporate-finance/fx-exposure-risk-calculator" element={<FXExposureRiskCalculator />} />
            <Route path="/corporate-finance/cost-capital-benchmarking" element={<CostOfCapitalBenchmarking />} />
            <Route path="/corporate-finance/scenario-analysis-simulator" element={<ScenarioAnalysisSimulator />} />
            <Route path="/insurance-tools/life-insurance-calculator" element={<LifeInsuranceCalculator />} />
            <Route path="/insurance-tools/health-insurance-estimator" element={<HealthInsuranceEstimator />} />
            <Route path="/insurance-tools/car-insurance-calculator" element={<CarInsuranceCalculator />} />
            <Route path="/insurance-tools/term-insurance-planner" element={<TermInsurancePlanner />} />
            <Route path="/insurance-tools/travel-insurance-selector" element={<TravelInsuranceSelector />} />
            <Route path="/insurance-tools/home-insurance-estimator" element={<HomeInsuranceEstimator />} />
            <Route path="/insurance-tools/two-wheeler-tracker" element={<TwoWheelerTracker />} />
            <Route path="/insurance-tools/critical-illness-calculator" element={<CriticalIllnessCalculator />} />
            <Route path="/insurance-tools/portfolio-dashboard" element={<PortfolioDashboard />} />
            <Route path="/insurance-tools/ulip-calculator" element={<ULIPCalculator />} />
            <Route path="/gst-tools" element={<GSTTools />} />
            <Route path="/gst-tools/gst-calculator" element={<GSTCalculator />} />
            <Route path="/gst-tools/gst-due-date-tracker" element={<GSTDueDateTracker />} />
            <Route path="/gst-tools/gstr-3b-preparation" element={<GSTR3BAutoPrep />} />
            <Route path="/gst-tools/gst-hsn-sac-finder" element={<GSTHSNSACFinder />} />
            <Route path="/gst-tools/gst-slab-finder" element={<GSTSlabFinder />} />
            <Route path="/gst-tools/gst-liability-calculator" element={<GSTLiabilityCalculator />} />
            <Route path="/gst-tools/gst-penalty-interest-calculator" element={<GSTPenaltyInterestCalculator />} />
            <Route path="/gst-tools/gst-rcm-calculator" element={<GSTRCMCalculator />} />
            <Route path="/gst-tools/gst-composition-eligibility" element={<GSTCompositionEligibility />} />
            <Route path="/gst-tools/gst-einvoice-qr-validator" element={<GSTEInvoiceQRValidator />} />
            <Route path="/gst-tools/gst-invoice-generator" element={<GSTInvoiceGenerator />} />
            <Route path="/gst-tools/gst-eway-distance-calculator" element={<GSTEWayDistanceCalculator />} />
            <Route path="/gst-tools/gst-turnover-tracker" element={<GSTTurnoverTracker />} />
            <Route path="/gst-tools/gst-rate-impact-analyzer" element={<GSTRateImpactAnalyzer />} />
            <Route path="/gst-tools/gstr-1-deadline-calculator" element={<Gstr1DeadlineCalculatorPage />} />
            <Route path="/tools/gstr-1-deadline-calculator" element={<Gstr1DeadlineCalculatorPage />} />
            <Route path="/gst-tools/gst-amount-calculator" element={<GSTAmountCalculatorPage />} />
            <Route path="/tools/gst-amount-calculator" element={<GSTAmountCalculatorPage />} />
            <Route path="/gst-tools/reverse-gst-calculator" element={<ReverseGSTCalculatorPage />} />
            <Route path="/tools/reverse-gst-calculator" element={<ReverseGSTCalculatorPage />} />
            <Route path="/gst-tools/gst-slab-calculator" element={<GSTSlabCalculatorPage />} />
            <Route path="/tools/gst-slab-calculator" element={<GSTSlabCalculatorPage />} />
            <Route path="/gst-tools/gstr-3b-deadline-calculator" element={<GSTR3BDeadlineCalculatorPage />} />
            <Route path="/tools/gstr-3b-deadline-calculator" element={<GSTR3BDeadlineCalculatorPage />} />
            <Route path="/gst-tools/gst-hsn-sac-finder" element={<HSNSACFinderPage />} />
            <Route path="/tools/hsn-sac-finder" element={<HSNSACFinderPage />} />
            <Route path="/tools/gst-hsn-sac-finder" element={<HSNSACFinderPage />} />
            <Route path="/gst-tools/gst-liability-calculator" element={<GSTLiabilityCalculatorPage />} />
            <Route path="/tools/gst-liability-calculator" element={<GSTLiabilityCalculatorPage />} />
            <Route path="/gst-tools/composition-scheme-eligibility-checker" element={<CompositionSchemeCheckerPage />} />
            <Route path="/tools/composition-scheme-checker" element={<CompositionSchemeCheckerPage />} />
            <Route path="/gst-tools/itc-eligibility-checker" element={<ITCEligibilityCheckerPage />} />
            <Route path="/tools/itc-eligibility-checker" element={<ITCEligibilityCheckerPage />} />
            <Route path="/gst-tools/rcm-applicability-checker" element={<RCMApplicabilityCheckerPage />} />
            <Route path="/tools/rcm-applicability-checker" element={<RCMApplicabilityCheckerPage />} />
            <Route path="/gst-tools/gst-refund-eligibility-checker" element={<GSTRefundCheckerPage />} />
            <Route path="/tools/gst-refund-checker" element={<GSTRefundCheckerPage />} />
            <Route path="/gst-tools/:slug" element={<GSTToolPlaceholder />} />
        <Route path="/invoicing-receivables" element={<InvoicingReceivablesHub />} />
        <Route path="/invoicing-tools" element={<InvoicingReceivablesHub />} />
        <Route path="/invoicing-tools/custom-invoice-generator" element={<CustomInvoiceGenerator />} />
        <Route path="/invoicing-tools/invoice-due-date-tracker" element={<InvoiceDueDateTracker />} />
        <Route path="/invoicing-tools/recurring-invoice-scheduler" element={<RecurringInvoiceScheduler />} />
        <Route path="/invoicing-tools/invoice-ageing-report-visualizer" element={<InvoiceAgeingReportVisualizer />} />
        <Route path="/invoicing-tools/gst-tax-auto-fill-invoice-tool" element={<GSTTaxAutoFillInvoiceTool />} />
        <Route path="/invoicing-tools/multi-currency-invoice-generator" element={<MultiCurrencyInvoiceGenerator />} />
        <Route path="/invoicing-tools/invoice-to-cash-cycle-tracker" element={<InvoiceToCashCycleTracker />} />
        <Route path="/invoicing-tools/payment-reminder-tool" element={<PaymentReminderTool />} />
        <Route path="/invoicing-tools/invoice-dispute-tracker" element={<InvoiceDisputeTracker />} />
        <Route path="/invoicing-tools/po-to-invoice-converter" element={<POToInvoiceConverter />} />
        <Route path="/invoicing-tools/receivables-vs-payables-dashboard" element={<ReceivablesVsPayablesDashboard />} />
        <Route path="/invoicing-tools/invoice-terms-explainer" element={<InvoiceTermsExplainer />} />
        <Route path="/invoicing-tools/client-wise-invoice-history-visualizer" element={<ClientWiseInvoiceHistoryVisualizer />} />
        <Route path="/invoicing-tools/custom-invoice-theme-creator" element={<CustomInvoiceThemeCreator />} />
        <Route path="/invoicing-tools/client-payment-behavior-score-tool" element={<ClientPaymentBehaviorScoreTool />} />
        <Route path="/invoicing-tools/partial-payment-invoice-tracker" element={<PartialPaymentInvoiceTracker />} />
        <Route path="/invoicing-tools/time-vs-billable-hours-graph" element={<TimeVsBillableHoursGraph />} />
        <Route path="/invoicing-tools/invoice-email-tracker" element={<InvoiceEmailTracker />} />
        <Route path="/invoicing-tools/gst-inclusive-invoice-builder" element={<GSTInclusiveInvoiceBuilder />} />
        <Route path="/invoicing-tools/outstanding-receivable-heatmap" element={<OutstandingReceivableHeatmap />} />
                <Route path="/tools/discount-profit" element={<DiscountProfitCalculator />} />
                <Route path="/tools/product-comparison" element={<ProductComparisonMatrix />} />
                <Route path="/tools/emi-affordability" element={<EMIAffordabilityChecker />} />
                <Route path="/tools/stock-checker" element={<RealTimeStockChecker />} />
                <Route path="/tools/price-tag" element={<PriceTagLabelCreator />} />
                <Route path="/tools/meeting-notes" element={<MeetingAgendaNoteTaker />} />
                <Route path="/tools/business-card" element={<DigitalBusinessCardCreator />} />
                <Route path="/tools/qr-generator" element={<QRCodeGenerator />} />
                <Route path="/tools/persona-builder" element={<CustomerPersonaBuilder />} />
                <Route path="/tools/timezone-converter" element={<TimeZoneConverter />} />
                <Route path="/tools/sales-script" element={<SalesScriptAssistant />} />
                <Route path="/tools/sales-tracker" element={<SalesPerformanceTracker />} />
                <Route path="/tools/competitive-analysis" element={<CompetitiveAnalysisCheatSheet />} />
                <Route path="/tools/proposal-template" element={<OfferProposalTemplateBuilder />} />
                <Route path="/tools/feedback-form" element={<SimpleFeedbackFormGenerator />} />
                <Route path="/tools/:toolId" element={<ToolPlaceholder />} />
                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </Suspense>
          </Layout>
        } />
      </Routes>
    </Suspense>
    </>
  );
}

export default App;
