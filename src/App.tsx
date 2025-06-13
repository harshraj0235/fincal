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
// Assuming src/data/influencers.ts exports an array of influencer data
// You would typically import it here if you were using it directly in App.js
// For a dedicated page, the page component itself would import it.
// import { influencers } from './data/influencers'; 

// --- New InfluencersPage Component (Placeholder) ---
// This would be a new file, e.g., src/pages/InfluencersPage.jsx
// For demonstration, it's included here, but in a real app, keep it separate.
const InfluencersPage = () => {
  // In a real application, you would import and use the 'influencers' data here
  // import { influencers } from '../data/influencers';
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Influencers</h1>
      <p className="text-lg text-gray-700 text-center">
        This is where you would display information about your key influencers.
        The data from `src/data/influencers.ts` would be fetched and rendered here.
      </p>
      {/* Example of how influencer data might be displayed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/*
        {influencers.map(influencer => (
          <div key={influencer.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{influencer.name}</h2>
            <p className="text-gray-600">{influencer.bio}</p>
            <a href={influencer.socialLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
              Connect
            </a>
          </div>
        ))}
        */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">John Doe</h2>
          <p className="text-gray-600">Financial expert and content creator.</p>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
            Connect
          </a>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">Jane Smith</h2>
          <p className="text-gray-600">Investment advisor and author.</p>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
            Connect
          </a>
        </div>
      </div>
    </div>
  );
};
// --- End New InfluencersPage Component ---

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
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/write" element={<WriteBlog />} />
        <Route path="/blog/category/banking" element={<BankingKnowledge />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {/* New route for influencers */}
        <Route path="/influencers" element={<InfluencersPage />} /> 
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/sitemap.xml" element={<SitemapXml />} />
        <Route path="/credit-card-finder" element={<CreditCardFinder />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
