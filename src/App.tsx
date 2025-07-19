import React, { useEffect, Suspense, lazy } from 'react';

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

// Lazy load all page-level components
const Home = lazy(() => import('./pages/Home'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const WriteBlog = lazy(() => import('./pages/WriteBlog'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const SitemapXml = lazy(() => import('./pages/SitemapXml'));
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

function App() {
  useEffect(() => {
    // AdSense script
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4446717165665089';
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);

    // Google AdSense meta tag
    if (!document.querySelector('meta[name="google-adsense-account"]')) {
      const adsenseMeta = document.createElement('meta');
      adsenseMeta.name = 'google-adsense-account';
      adsenseMeta.content = 'ca-pub-4446717165665089';
      document.head.appendChild(adsenseMeta);
    }

    return () => {
      if (document.head.contains(adsenseScript)) document.head.removeChild(adsenseScript);
      const meta = document.querySelector('meta[name="google-adsense-account"]');
      if (meta) document.head.removeChild(meta);
    };
  }, []);

  return (
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
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/sitemap.xml" element={<SitemapXml />} />
                <Route path="/credit-card-finder" element={<CreditCardFinder />} />
                {/* Crypto Section route */}
                <Route path="/crypto" element={<CryptoSection />} />
                <Route path="/crypto/:slug" element={<CryptoArticlePost />} />
                {/* AstroFinance route */}
                <Route path="/astro-finance" element={<AstroFinance />} />
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
                <Route path="/tools/discount-profit" element={<DiscountProfitCalculator />} />
                <Route path="/tools/product-comparison" element={<ProductComparisonMatrix />} />
                <Route path="/tools/emi-affordability" element={<EMIAffordabilityChecker />} />
                <Route path="/tools/stock-checker" element={<RealTimeStockChecker />} />
                <Route path="/tools/price-tag" element={<PriceTagLabelCreator />} />
                <Route path="/tools/meeting-notes" element={<MeetingAgendaNoteTaker />} />
                <Route path="/tools/business-card" element={<DigitalBusinessCardCreator />} />
                <Route path="/tools/:toolId" element={<ToolPlaceholder />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        } />
      </Routes>
    </Suspense>
  );
}

export default App;
