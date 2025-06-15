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
import { CategoryPage } from './pages/CategoryPage';
import { CreditCardFinder } from './calculators/CreditCardFinder';

// Import your MoneyBlog and MoneyTool pages
import MoneyBlog from './pages/MoneyBlog';
import MoneyTool from './pages/MoneyTool';

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Dynamically create calculator routes */}
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/sitemap.xml" element={<SitemapXml />} />
        <Route path="/credit-card-finder" element={<CreditCardFinder />} />

        {/* Add MoneyBlog and MoneyTool routes */}
        <Route path="/money/blog" element={<MoneyBlog />} />
        <Route path="/money/tool" element={<MoneyTool />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
