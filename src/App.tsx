import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';

// Import all pages
import Home from './pages/Home';
import { HomeNew } from './pages/HomeNew';
import { CalculatorPage } from './pages/CalculatorPage';
import Blog from './pages/Blog';
import { InsuranceTools } from './pages/InsuranceTools';
import { FinancialEducationHub } from './pages/FinancialEducationHub';
import GovernmentSchemes from './pages/GovernmentSchemes';
import ExcelTool from './pages/ExcelTool';
import Crypto from './pages/Crypto';
import AstroFinance from './pages/AstroFinance';
import HelpCenter from './pages/HelpCenter';
import ContactUs from './pages/ContactUs';
import ToolsHub from './pages/ToolsHub';
import FinanceTools from './pages/FinanceTools';
import BankTools from './pages/BankTools';
import MoneyTool from './pages/MoneyTool';
import StockMarket from './pages/StockMarket';
import FundamentalAnalysis from './pages/FundamentalAnalysis';
import ToolsPracticalApplication from './pages/ToolsPracticalApplication';
import CalculatorCategories from './pages/CalculatorCategories';
import CategoryCalculators from './pages/CategoryCalculators';
import WriteBlog from './pages/WriteBlog';
import SimpleDailyExpenseTracker from './pages/SimpleDailyExpenseTracker';
import NetWorthCalculator from './pages/NetWorthCalculator';
import MoneyBlog from './pages/MoneyBlog';
import BankingKnowledge from './pages/BankingKnowledge';
import AstroFinanceZodiacTips from './pages/AstroFinanceZodiacTips';
import AstroFinanceZodiacSavingsCalculator from './pages/AstroFinanceZodiacSavingsCalculator';
import AstroFinanceMuhuratCalculator from './pages/AstroFinanceMuhuratCalculator';
import AstroFinanceHoroscope from './pages/AstroFinanceHoroscope';
import MonthlyBudgetTracker from './pages/MonthlyBudgetTracker';
import DebtPayoffCalculator from './pages/DebtPayoffCalculator';
import ExcelToolDetail from './pages/ExcelToolDetail';

// Import additional pages
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CookiePolicy from './pages/CookiePolicy';
import Disclaimer from './pages/Disclaimer';
import EditorialPolicy from './pages/EditorialPolicy';
import Sitemap from './pages/Sitemap';
import { SitemapXml } from './pages/SitemapXml';
import NewsHub from './pages/NewsHub';
import NewsReel from './pages/NewsReel';
import TaxToolsHub from './pages/TaxToolsHub';
import InvestingToolsHub from './pages/InvestingToolsHub';
import InvoicingReceivablesHub from './pages/InvoicingReceivablesHub';
import ToolsHubNew from './pages/ToolsHubNew';
import ExcelToolHub from './pages/ExcelToolHub';
import ExcelToolsPage from './pages/ExcelToolsPage';
import ExcelToolBuilder from './pages/ExcelToolBuilder';
import ExcelToolPost from './pages/ExcelToolPost';
import FinancePostPage from './pages/FinancePostPage';
import GovernmentSchemePost from './pages/GovernmentSchemePost';
import CryptoArticlePost from './pages/CryptoArticlePost';
import CryptoSection from './pages/CryptoSection';
import AuthorProfilePage from './pages/AuthorProfilePage';
import InfluencerProfile from './pages/InfluencerProfile';
import BlogPost from './pages/BlogPost';
import CategoryPage from './pages/CategoryPage';
import StockMarketBasics from './pages/StockMarketBasics';
import StockMarketLesson from './pages/StockMarketLesson';
import StockScreener from './pages/StockScreener';
import TechnicalAnalysis from './pages/TechnicalAnalysis';
import CoreMarketConcepts from './pages/CoreMarketConcepts';
import CaseStudiesMarketPsychology from './pages/CaseStudiesMarketPsychology';
import AdvancedTradingStrategies from './pages/AdvancedTradingStrategies';
import InvestmentPortfolioTracker from './pages/InvestmentPortfolioTracker';
import RealTimeStockPortfolioTracker from './pages/RealTimeStockPortfolioTracker';
import IntrinsicValueCalculator from './pages/IntrinsicValueCalculator';
import PERatioCalculator from './pages/PERatioCalculator';
import CAGRCalculator from './pages/CAGRCalculator';
import XIRRCalculator from './pages/XIRRCalculator';
import ChequeBounceChargesCalculator from './pages/ChequeBounceChargesCalculator';
import MissedCallBankingDirectory from './pages/MissedCallBankingDirectory';
import ResumeBuilder from './pages/ResumeBuilder';
import InvoiceGeneratorBusiness from './pages/InvoiceGeneratorBusiness';
import AccountsPayableTracker from './pages/AccountsPayableTracker';
import AccountsReceivableTracker from './pages/AccountsReceivableTracker';
import MonthlyBudgetPlanner from './pages/MonthlyBudgetPlanner';
import VacationBudgetPlanner from './pages/VacationBudgetPlanner';

// Import Astro Finance additional pages
import AstroFinanceCompatibilityCalculator from './pages/AstroFinanceCompatibilityCalculator';
import AstroFinanceCrystalCalculator from './pages/AstroFinanceCrystalCalculator';
import AstroFinanceDailyHoroscope from './pages/AstroFinanceDailyHoroscope';
import AstroFinanceGemstoneCalculator from './pages/AstroFinanceGemstoneCalculator';
import AstroFinanceLuckyNumberGenerator from './pages/AstroFinanceLuckyNumberGenerator';
import AstroFinanceNakshatraCalculator from './pages/AstroFinanceNakshatraCalculator';
import AstroFinancePlanetaryCalculator from './pages/AstroFinancePlanetaryCalculator';
import AstroFinanceYearlyForecast from './pages/AstroFinanceYearlyForecast';

// Import Fino components
import FinoHome from './fino/pages/FinoHome';
import FinoChat from './fino/components/FinoChat';

// Import insurance tools
import { LifeInsuranceCalculator } from './pages/insurance/LifeInsuranceCalculator';
import { HealthInsuranceEstimator } from './pages/insurance/HealthInsuranceEstimator';
import { CarInsuranceCalculator } from './pages/insurance/CarInsuranceCalculator';
import { TermInsurancePlanner } from './pages/insurance/TermInsurancePlanner';
import { TravelInsuranceSelector } from './pages/insurance/TravelInsuranceSelector';
import { HomeInsuranceEstimator } from './pages/insurance/HomeInsuranceEstimator';
import { TwoWheelerTracker } from './pages/insurance/TwoWheelerTracker';
import { CriticalIllnessCalculator } from './pages/insurance/CriticalIllnessCalculator';
import { PortfolioDashboard } from './pages/insurance/PortfolioDashboard';
import { ULIPCalculator } from './pages/insurance/ULIPCalculator';

// Wrapper component for CalculatorPage to handle URL params
const CalculatorPageWrapper: React.FC = () => {
  const { calculatorId } = useParams<{ calculatorId: string }>();
  return <CalculatorPage calculatorId={calculatorId || ''} />;
};

const App: React.FC = () => {
  return (
      <Layout>
        <Routes>
          {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home-new" element={<HomeNew />} />
        
        {/* Calculator Routes */}
        <Route path="/calculators" element={<CalculatorCategories />} />
        <Route path="/calculators/:category" element={<CategoryCalculators />} />
        <Route path="/calculators/:category/:calculatorId" element={<CalculatorPageWrapper />} />
        
        {/* Insurance Tools Routes */}
        <Route path="/insurance-tools" element={<InsuranceTools />} />
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
        
        {/* Blog Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/money-blog" element={<MoneyBlog />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        
        {/* Tools Routes */}
        <Route path="/tools" element={<ToolsHub />} />
        <Route path="/tools-new" element={<ToolsHubNew />} />
        <Route path="/tools/:toolId" element={<ExcelToolDetail />} />
        <Route path="/exceltool" element={<ExcelTool />} />
        <Route path="/excel-tools" element={<ExcelToolsPage />} />
        <Route path="/excel-tool-hub" element={<ExcelToolHub />} />
        <Route path="/excel-tool-builder" element={<ExcelToolBuilder />} />
        <Route path="/excel-tool/:slug" element={<ExcelToolPost />} />
        <Route path="/finance-tools" element={<FinanceTools />} />
        <Route path="/bank-tools" element={<BankTools />} />
        <Route path="/money-tool" element={<MoneyTool />} />
        <Route path="/tax-tools" element={<TaxToolsHub />} />
        <Route path="/investing-tools" element={<InvestingToolsHub />} />
        <Route path="/invoicing-tools" element={<InvoicingReceivablesHub />} />
        
        {/* Education Routes */}
        <Route path="/financial-education" element={<FinancialEducationHub />} />
        <Route path="/stock-market" element={<StockMarket />} />
        <Route path="/stock-market-basics" element={<StockMarketBasics />} />
        <Route path="/stock-market-lesson/:lessonId" element={<StockMarketLesson />} />
        <Route path="/stock-screener" element={<StockScreener />} />
        <Route path="/technical-analysis" element={<TechnicalAnalysis />} />
        <Route path="/core-market-concepts" element={<CoreMarketConcepts />} />
        <Route path="/case-studies-market-psychology" element={<CaseStudiesMarketPsychology />} />
        <Route path="/advanced-trading-strategies" element={<AdvancedTradingStrategies />} />
        <Route path="/fundamental-analysis" element={<FundamentalAnalysis />} />
        <Route path="/tools-practical-application" element={<ToolsPracticalApplication />} />
        <Route path="/banking-knowledge" element={<BankingKnowledge />} />
        
        {/* Investment Tools */}
        <Route path="/investment-portfolio-tracker" element={<InvestmentPortfolioTracker />} />
        <Route path="/real-time-stock-portfolio-tracker" element={<RealTimeStockPortfolioTracker />} />
        <Route path="/intrinsic-value-calculator" element={<IntrinsicValueCalculator />} />
        <Route path="/pe-ratio-calculator" element={<PERatioCalculator />} />
        <Route path="/cagr-calculator" element={<CAGRCalculator />} />
        <Route path="/xirr-calculator" element={<XIRRCalculator />} />
        
        {/* Government Schemes */}
        <Route path="/government-schemes" element={<GovernmentSchemes />} />
        <Route path="/government-scheme/:slug" element={<GovernmentSchemePost />} />
        
        {/* Crypto Routes */}
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/crypto-section" element={<CryptoSection />} />
        <Route path="/crypto-article/:slug" element={<CryptoArticlePost />} />
        
        {/* Astro Finance Routes */}
        <Route path="/astro-finance" element={<AstroFinance />} />
        <Route path="/astro-finance/zodiac-tips" element={<AstroFinanceZodiacTips />} />
        <Route path="/astro-finance/zodiac-savings-calculator" element={<AstroFinanceZodiacSavingsCalculator />} />
        <Route path="/astro-finance/muhurat" element={<AstroFinanceMuhuratCalculator />} />
        <Route path="/astro-finance/horoscope" element={<AstroFinanceHoroscope />} />
        <Route path="/astro-finance/daily-horoscope" element={<AstroFinanceDailyHoroscope />} />
        <Route path="/astro-finance/yearly-forecast" element={<AstroFinanceYearlyForecast />} />
        <Route path="/astro-finance/compatibility-calculator" element={<AstroFinanceCompatibilityCalculator />} />
        <Route path="/astro-finance/crystal-calculator" element={<AstroFinanceCrystalCalculator />} />
        <Route path="/astro-finance/gemstone-calculator" element={<AstroFinanceGemstoneCalculator />} />
        <Route path="/astro-finance/lucky-number-generator" element={<AstroFinanceLuckyNumberGenerator />} />
        <Route path="/astro-finance/nakshatra-calculator" element={<AstroFinanceNakshatraCalculator />} />
        <Route path="/astro-finance/planetary-calculator" element={<AstroFinancePlanetaryCalculator />} />
        
        {/* Fino AI Routes */}
          <Route path="/fino" element={<FinoChat />} />
          <Route path="/fino-home" element={<FinoHome />} />
          
        {/* Personal Finance Tools */}
        <Route path="/daily-expense-tracker" element={<SimpleDailyExpenseTracker />} />
        <Route path="/net-worth-calculator" element={<NetWorthCalculator />} />
        <Route path="/monthly-budget-tracker" element={<MonthlyBudgetTracker />} />
        <Route path="/monthly-budget-planner" element={<MonthlyBudgetPlanner />} />
        <Route path="/vacation-budget-planner" element={<VacationBudgetPlanner />} />
        <Route path="/debt-payoff-calculator" element={<DebtPayoffCalculator />} />
        
        {/* Business Tools */}
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/invoice-generator-business" element={<InvoiceGeneratorBusiness />} />
        <Route path="/accounts-payable-tracker" element={<AccountsPayableTracker />} />
        <Route path="/accounts-receivable-tracker" element={<AccountsReceivableTracker />} />
        
        {/* Banking Tools */}
        <Route path="/cheque-bounce-charges-calculator" element={<ChequeBounceChargesCalculator />} />
        <Route path="/missed-call-banking-directory" element={<MissedCallBankingDirectory />} />
        
        {/* News and Content */}
        <Route path="/news" element={<NewsHub />} />
        <Route path="/news-reel" element={<NewsReel />} />
        <Route path="/finance-post/:slug" element={<FinancePostPage />} />
        
        {/* Profile Pages */}
        <Route path="/author/:authorId" element={<AuthorProfilePage />} />
        <Route path="/influencer/:influencerId" element={<InfluencerProfile />} />
        
        {/* Support Routes */}
        <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
        
        {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          
        {/* Sitemap */}
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/sitemap.xml" element={<SitemapXml />} />
          
          {/* Redirects */}
          <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/calculator" element={<Navigate to="/calculators" replace />} />
        <Route path="/insurance" element={<Navigate to="/insurance-tools" replace />} />
        <Route path="/tools" element={<Navigate to="/tools" replace />} />
        <Route path="/blog/:slug" element={<Navigate to="/blog/:slug" replace />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
  );
};

export default App;