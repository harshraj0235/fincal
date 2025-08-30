import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';

// Import main pages
import { Home } from './pages/Home';
import { HomeNew } from './pages/HomeNew';

// Import Fino components
import FinoChat from './fino/components/FinoChat';
import FinoHome from './fino/pages/FinoHome';

// Import other essential pages that we know exist
import { Blog } from './pages/Blog';
import { ContactUs } from './pages/ContactUs';
import { AboutUs } from './pages/AboutUs';
import { HelpCenter } from './pages/HelpCenter';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { Disclaimer } from './pages/Disclaimer';
import { CookiePolicy } from './pages/CookiePolicy';
import { EditorialPolicy } from './pages/EditorialPolicy';

// Import sitemap
import { Sitemap } from './pages/Sitemap';
import { SitemapXml } from './pages/SitemapXml';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Layout>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomeNew />} />
          <Route path="/home" element={<Home />} />
          
          {/* Fino Routes */}
          <Route path="/fino" element={<FinoChat />} />
          <Route path="/fino-home" element={<FinoHome />} />
          
          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          
          {/* Legal Pages */}
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/editorial-policy" element={<EditorialPolicy />} />
          
          {/* Sitemap Routes */}
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/sitemap.xml" element={<SitemapXml />} />
          
          {/* Redirects */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/fino-home" element={<Navigate to="/fino" replace />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HelmetProvider>
  );
};

export default App;