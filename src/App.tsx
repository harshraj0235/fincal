import React from 'react';
import { Layout } from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ScrollToTop } from './components/ScrollToTop';
import { calculatorCategories } from './data/calculatorData';
import { CalculatorPage } from './pages/CalculatorPage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { WriteBlog } from './pages/WriteBlog';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { Sitemap } from './pages/Sitemap';
import { SitemapXml } from './pages/SitemapXml';
import { BankingKnowledge } from './pages/BankingKnowledge';
import { AstroFinanceInsights } from './pages/AstroFinanceInsights';
import { AstroFinanceInsightsHindi } from './pages/AstroFinanceInsightsHindi';
import { ZodiacTraits } from './pages/ZodiacTraits';
import { ZodiacTraitsDetail } from './pages/ZodiacTraitsDetail';
import { DailyHoroscope } from './pages/DailyHoroscope';
import { DailyHoroscopeDetail } from './pages/DailyHoroscopeDetail';
import { MuhuratFinder } from './pages/MuhuratFinder';
import { DeploymentPage } from './pages/DeploymentPage';

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {calculatorCategories.flatMap(category => 
          category.calculators.map(calculator => (
            <Route 
              key={calculator.id}
              path={`/calculators/${calculator.id}`} 
              element={<CalculatorPage calculatorId={calculator.id} />} 
            />
          ))
        )}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/write" element={<WriteBlog />} />
        <Route path="/blog/category/banking" element={<BankingKnowledge />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/sitemap.xml" element={<SitemapXml />} />
        <Route path="/deploy" element={<DeploymentPage />} />
        
        {/* Astro-Finance Routes */}
        <Route path="/astro-finance-insights" element={<AstroFinanceInsights />} />
        <Route path="/astro-finance-insights/en" element={<AstroFinanceInsights />} />
        <Route path="/astro-finance-insights/hi" element={<AstroFinanceInsightsHindi />} />
        
        {/* Zodiac Traits Routes */}
        <Route path="/astro-finance-insights/zodiac-traits" element={<ZodiacTraits />} />
        <Route path="/astro-finance-insights/hi/zodiac-traits" element={<ZodiacTraits />} />
        <Route path="/astro-finance-insights/zodiac-traits/:sign" element={<ZodiacTraitsDetail />} />
        <Route path="/astro-finance-insights/hi/zodiac-traits/:sign" element={<ZodiacTraitsDetail />} />
        
        {/* Daily Horoscope Routes */}
        <Route path="/astro-finance-insights/daily-horoscope" element={<DailyHoroscope />} />
        <Route path="/astro-finance-insights/hi/daily-horoscope" element={<DailyHoroscope />} />
        <Route path="/astro-finance-insights/daily-horoscope/:sign" element={<DailyHoroscopeDetail />} />
        <Route path="/astro-finance-insights/hi/daily-horoscope/:sign" element={<DailyHoroscopeDetail />} />
        
        {/* Muhurat Finder Routes */}
        <Route path="/astro-finance-insights/muhurat-finder" element={<MuhuratFinder />} />
        <Route path="/astro-finance-insights/hi/muhurat-finder" element={<MuhuratFinder />} />
        
        {/* Add routes for other tools */}
        <Route path="/astro-finance-insights/numerology" element={<Navigate to="/astro-finance-insights" />} />
        <Route path="/astro-finance-insights/gemstone-finder" element={<Navigate to="/astro-finance-insights" />} />
        <Route path="/astro-finance-insights/zodiac-compatibility" element={<Navigate to="/astro-finance-insights" />} />
        <Route path="/astro-finance-insights/moon-sign-calculator" element={<Navigate to="/astro-finance-insights" />} />
        
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;