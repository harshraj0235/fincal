import React from 'react';

import { Layout } from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ScrollToTop } from './components/ScrollToTop';
import { calculatorCategories } from './data/calculatorData';
import { CalculatorPage } from './pages/CalculatorPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { WriteBlog } from './pages/WriteBlog';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { Sitemap } from './pages/Sitemap';
import { SitemapXml } from './pages/SitemapXml';
import { BankingKnowledge } from './pages/BankingKnowledge';
import { CategoryPage } from './pages/CategoryPage';
import { CreditCardFinder } from './calculators/CreditCardFinder';
import MissedCallBankingDirectory from './pages/MissedCallBankingDirectory';

// Excel Tool blog section
import ExcelTool from './pages/ExcelTool';
import ExcelToolPost from './pages/ExcelToolPost';

// Government Schemes section
import GovernmentSchemes from './pages/GovernmentSchemes';
import GovernmentSchemePost from './pages/GovernmentSchemePost';

// Crypto Section
import CryptoSection from './pages/CryptoSection';
import CryptoArticlePost from './pages/CryptoArticlePost';

// AstroFinance page
import AstroFinance from './pages/AstroFinance';
import AstroFinanceHoroscope from './pages/AstroFinanceHoroscope';
import AstroFinanceZodiacTips from './pages/AstroFinanceZodiacTips';
import AstroFinanceLuckyNumberGenerator from './pages/AstroFinanceLuckyNumberGenerator';
import AstroFinanceMuhuratCalculator from './pages/AstroFinanceMuhuratCalculator';
import AstroFinanceZodiacSavingsCalculator from './pages/AstroFinanceZodiacSavingsCalculator';
import AstroFinanceGemstoneCalculator from './pages/AstroFinanceGemstoneCalculator';
import AstroFinanceNakshatraCalculator from './pages/AstroFinanceNakshatraCalculator';
import AstroFinancePlanetaryCalculator from './pages/AstroFinancePlanetaryCalculator';
import AstroFinanceDailyHoroscope from './pages/AstroFinanceDailyHoroscope';
import AstroFinanceCompatibilityCalculator from './pages/AstroFinanceCompatibilityCalculator';
import AstroFinanceYearlyForecast from './pages/AstroFinanceYearlyForecast';
import AstroFinanceCrystalCalculator from './pages/AstroFinanceCrystalCalculator';

// News Reel
import NewsReel from './pages/NewsReel';

import ChequeBounceChargesCalculator from './pages/ChequeBounceChargesCalculator';
import BankLockerFinder from './pages/BankLockerFinder';

function App() {
  return (
    <>
      <Routes>
        {/* Missed Call Banking Directory route - outside Layout */}
        <Route path="/missedcallbankingdirectory" element={<MissedCallBankingDirectory />} />
        
        {/* All other routes inside Layout */}
        <Route path="*" element={
          <Layout>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/calculators/cheque-bounce-charges-calculator" element={<ChequeBounceChargesCalculator />} />

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

              <Route path="/calculators/bank-locker-finder" element={<BankLockerFinder />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </>
  );
}

export default App;
