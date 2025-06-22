// src/App.tsx
import React from "react";
import { Layout } from "./components/Layout";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { ScrollToTop } from "./components/ScrollToTop";
import { calculatorCategories } from "./data/calculatorData";
import { CalculatorPage } from "./pages/CalculatorPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { WriteBlog } from "./pages/WriteBlog";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { Sitemap } from "./pages/Sitemap";
import { SitemapXml } from "./pages/SitemapXml";
import { BankingKnowledge } from "./pages/BankingKnowledge";
import { CategoryPage } from "./pages/CategoryPage";
import { CreditCardFinder } from "./calculators/CreditCardFinder";

// Excel Tool blog section
import ExcelTool from "./pages/ExcelTool";
import ExcelToolPost from "./pages/ExcelToolPost";

// New UI/context providers
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// If you have custom pages like ResumeBuilder or NotFound, import them as needed
// import ResumeBuilder from "./pages/ResumeBuilder";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Both types of toasters can be included if your UI uses both */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />

              {calculatorCategories.flatMap((category) =>
                category.calculators.map((calculator) => (
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

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/sitemap.xml" element={<SitemapXml />} />
              <Route path="/credit-card-finder" element={<CreditCardFinder />} />

              {/* Add any additional custom routes above the catch-all route */}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
