import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import ToolQualityFooter from './ToolQualityFooter';
import { useLocation } from 'react-router-dom';
import ConsentBanner from './ConsentBanner';
import { BannerAd } from './BannerAd';
import { AutoBreadcrumbs } from './Breadcrumbs';
import { ArrowUp } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const setMeta = (attr: string, value: string, key: string = 'name') => {
    let meta = document.querySelector(`meta[${key}="${attr}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(key, attr);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', value);
  };

  const [showBackToTop, setShowBackToTop] = useState(false);

  const isHomePage = location.pathname === '/';
  const isMoneyPage = location.pathname.startsWith('/money/');
  const isNewsPage = location.pathname.startsWith('/news');
  const isCalculatorPage = location.pathname.includes('/calculators/');
  const isBlogPage = location.pathname.includes('/blog');

  // Back-to-top scroll listener
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const toolSlug = location.pathname.startsWith('/tools/')
    ? location.pathname.split('/')[2] || ''
    : '';
  const showToolFooter = Boolean(toolSlug) && toolSlug !== 'tools';
  const toolName = toolSlug
    ? toolSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    : '';

  useEffect(() => {
    // Close sidebar when route changes
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const sanitizeSeoText = (value: string): string => String(value)
        .replace(/â€”/g, '-')
        .replace(/â€“/g, '-')
        .replace(/â€˜|â€™/g, "'")
        .replace(/â€œ|â€�/g, '"')
        .replace(/â‚¹/g, 'Rs ')
        .replace(/Â©/g, 'Copyright')
        .replace(/Â/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const normalizePath = (pathname: string): string => {
        let cleanPath = pathname || '/';
        cleanPath = cleanPath.replace(/^\/moneycal\.in(?=\/|$)/i, '');
        if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
        cleanPath = cleanPath.replace(/\/+/g, '/');
        if (cleanPath !== '/' && cleanPath.endsWith('/')) cleanPath = cleanPath.slice(0, -1);
        return cleanPath || '/';
      };

      const currentPath = normalizePath(location.pathname);
      const marker = document.querySelector('meta[name="mc:seo-source"]')?.getAttribute('content') || '';
      if (marker === currentPath) return;

      const segments = currentPath.split('/').filter(Boolean);
      const lastSegment = segments[segments.length - 1] || '';

      // ── Proper route-to-title mapping for SEO ──
      const routeTitleMap: Record<string, { title: string; desc: string }> = {
        '/': { title: 'MoneyCal.in - Free Financial Calculators, IPO, Market Rates & Tools for India', desc: 'India\'s #1 financial platform. 200+ free tools — EMI, SIP, Income Tax calculators, live Gold & Silver rates, IPO dashboard, Blog, Government Schemes, and more.' },
        '/ipo': { title: 'IPO Dashboard - Latest IPO Analysis, GMP & Reviews 2026', desc: 'Track upcoming, ongoing & listed IPOs in India. Get detailed GMP, subscription status, allotment dates, and expert analysis for all IPOs.' },
        '/gold-rate': { title: 'Gold Rate Today - Live 22K & 24K Gold Prices in India', desc: 'Check today\'s gold rate in India. Live 22K and 24K gold prices for all major cities including Mumbai, Delhi, Chennai, Bangalore.' },
        '/silver-rate': { title: 'Silver Rate Today - Live Silver Prices in India', desc: 'Check today\'s silver rate in India. Live silver prices per kg and per gram for all major cities.' },
        '/blog': { title: 'Financial Blog - Expert Articles on Personal Finance & Investments', desc: 'Read expert articles on personal finance, investments, tax planning, mutual funds, and more. In-depth guides for Indian investors.' },
        '/news': { title: 'Finance News - Latest Market Updates & Business News India', desc: 'Stay updated with the latest finance news, market updates, business analysis, startup news, and economy insights from India.' },
        '/learn': { title: 'Learn Finance - Financial Education Hub for India', desc: 'Learn personal finance, investing, loans, credit scores, and more with comprehensive educational guides tailored for India.' },
        '/calculators': { title: 'Financial Calculators - 100+ Free Online Calculators India', desc: 'Use 100+ free financial calculators: EMI, SIP, Income Tax, PPF, FD, NPS, Home Loan, Mutual Fund, and more. Built for India.' },
        '/tools': { title: 'Financial Tools - 200+ Free Tools for India', desc: 'Access 200+ free financial tools for loans, investments, tax planning, insurance, and more. Complete financial toolkit for India.' },
        '/schemes-finder': { title: 'Government Schemes India - PM Schemes & Benefits 2026', desc: 'Explore India\'s top government schemes including PM Kisan, Ayushman Bharat, PM Awas Yojana, and more. Check eligibility and benefits.' },
        '/crypto': { title: 'Crypto Market - Live Bitcoin, Ethereum & Altcoin Prices', desc: 'Track live cryptocurrency prices including Bitcoin, Ethereum, and all major altcoins. Real-time crypto market data for Indian investors.' },
        '/stock-market': { title: 'Stock Market India - Learn Trading & Investment Strategies', desc: 'Learn stock market basics, technical analysis, fundamental analysis, and advanced trading strategies. Free stock market education hub.' },
        '/astro-finance': { title: 'Astro Finance - Vedic Financial Guidance & Insights', desc: 'Explore finance through Vedic astrology. Get personalized financial insights based on your zodiac sign and planetary positions.' },
        '/gst-tools': { title: 'GST Tools - GST Calculator, HSN Codes & Compliance Tools', desc: 'Free GST tools including GST calculator, HSN code finder, GST return filing guides, and compliance tools for Indian businesses.' },
        '/tax-tools': { title: 'Income Tax Tools - Tax Calculator, TDS & ITR Filing', desc: 'Free income tax tools: tax calculator, TDS calculator, Section 80C deductions, old vs new regime comparison, and ITR filing guides.' },
        '/loan-tools': { title: 'Loan Tools - EMI Calculator, Home Loan & Personal Loan', desc: 'Free loan tools: EMI calculator, home loan eligibility, personal loan comparison, car loan planner, and debt management tools.' },
        '/finance-tools': { title: 'Finance & Investment Tools - SIP, Mutual Funds & Retirement', desc: 'Free finance tools: SIP calculator, mutual fund analyzer, retirement planner, wealth builder, and investment comparison tools.' },
        '/insurance-tools': { title: 'Insurance Tools - Life, Health, Car & Travel Insurance', desc: 'Free insurance tools: premium calculator, coverage comparison, claim process guides for life, health, car, and travel insurance.' },
        '/corporate-finance': { title: 'Corporate Finance Tools - Business Valuation & Analysis', desc: 'Free corporate finance tools: business valuation, break-even analysis, capital structure optimization, and scenario analysis.' },
        '/excel-tools': { title: 'Excel Tools - Financial Templates & Spreadsheet Tools', desc: 'Free Excel financial templates: budget tracker, portfolio manager, loan amortization, and investment analysis spreadsheets.' },
        '/bank-tools': { title: 'Bank Tools - IFSC Finder, Holiday Calendar & Banking Help', desc: 'Free banking tools: IFSC code finder, bank holiday calendar, FD rates comparison, and banking utility tools for India.' },
        '/gold-tools': { title: 'Gold Tools - Gold Calculators & Price Estimators', desc: 'Free gold tools: purity calculator, weight converter, gold SIP planner, jewellery price estimator, and sovereign gold bond calculator.' },
        '/financial-education': { title: 'Financial Education - Learn Personal Finance India', desc: 'Comprehensive financial education hub. Learn about investments, savings, loans, insurance, and tax planning for Indian users.' },
        '/about-us': { title: 'About MoneyCal.in - India\'s Financial Platform', desc: 'Learn about MoneyCal.in — India\'s most comprehensive free financial platform with 200+ calculators and tools.' },
        '/contact-us': { title: 'Contact Us - MoneyCal.in', desc: 'Get in touch with the MoneyCal.in team. We\'re here to help with your financial planning needs.' },
        '/privacy-policy': { title: 'Privacy Policy - MoneyCal.in', desc: 'Read MoneyCal.in\'s privacy policy. We respect your privacy and protect your data.' },
        '/terms-of-service': { title: 'Terms of Service - MoneyCal.in', desc: 'Read MoneyCal.in\'s terms of service for using our financial calculators and tools.' },
        '/disclaimer': { title: 'Disclaimer - MoneyCal.in', desc: 'Read MoneyCal.in\'s disclaimer regarding financial information and calculator results.' },
        '/editorial-policy': { title: 'Editorial Policy - MoneyCal.in', desc: 'Learn about MoneyCal.in\'s editorial standards and commitment to accurate financial information.' },
      };

      // Try exact path match first, then parent path
      const mapped = routeTitleMap[currentPath] || routeTitleMap['/' + segments[0]];

      let title: string;
      let rawDescription: string;

      if (mapped) {
        title = mapped.title;
        rawDescription = mapped.desc;
      } else {
        // Improved fallback: better slug-to-title conversion
        const titleBase = lastSegment
          ? lastSegment
            .split('-')
            .map((word) => {
              // Keep common abbreviations uppercase
              const upperWords = ['ipo', 'emi', 'sip', 'gst', 'tds', 'itr', 'nps', 'ppf', 'fd', 'nri', 'etf', 'pdf', 'cagr', 'sgb', 'roi'];
              return upperWords.includes(word.toLowerCase())
                ? word.toUpperCase()
                : word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ')
          : 'MoneyCal India';
        title = segments.length
          ? `${titleBase} - Free Online Tool | MoneyCal.in`
          : 'MoneyCal India - Financial Calculators and Tools';
        rawDescription = segments.length
          ? `Use ${titleBase} on MoneyCal.in — free financial calculators, guides, and planning tools tailored for India.`
          : `Use MoneyCal India for free financial calculators, investment tools, loan planners, and tax insights built for Indian users.`;
      }

      const normalizeDescription = (text: string, maxLen: number = 160): string => {
        const clean = String(text)
          .replace(/\s+/g, ' ')
          .replace(/[\r\n]+/g, ' ')
          .trim();
        if (clean.length <= maxLen) return clean;
        const truncated = clean.slice(0, maxLen - 1);
        const lastSpace = truncated.lastIndexOf(' ');
        return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trim();
      };
      title = sanitizeSeoText(title);
      const description = normalizeDescription(sanitizeSeoText(rawDescription));

      document.title = title;
      setMeta('description', description);
      // Do NOT remove keywords - they support ranking signals
      setMeta('og:title', title, 'property');
      setMeta('og:description', description, 'property');
      setMeta('og:url', `https://moneycal.in${currentPath}`, 'property');
      setMeta('og:locale', 'en_IN', 'property');
      setMeta('twitter:title', title);
      setMeta('twitter:description', description);
      setMeta('last-modified', new Date().toISOString());
      setMeta('mc:seo-source', currentPath);
      setMeta('mc:seo', 'default');
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Breadcrumbs — auto-generated from URL */}
      <div className="pt-16">
        <AutoBreadcrumbs />
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar — always in DOM to prevent CLS, hidden via CSS on pages that don't need it */}
        <aside
          className={`hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-white ${isHomePage || isMoneyPage || isNewsPage || isBlogPage ? '!hidden' : ''
            }`}
        >
          <Sidebar />
        </aside>

        {/* Mobile Sidebar Overlay — only when open */}
        <AnimatePresence>
          {sidebarOpen && !isHomePage && !isMoneyPage && !isNewsPage && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white z-50 lg:hidden shadow-xl border-r border-gray-200"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 min-w-0 flex flex-col" role="main">
          {!isHomePage && (
              <div className="hidden sm:flex w-full justify-center border-b border-gray-100 bg-gray-50/50 pt-4 pb-2 mb-4">
                <BannerAd width={728} height={90} />
              </div>
            )}

          <div className="flex-1">
            {children}
          </div>

          {!isHomePage && (
              <div className="w-full flex justify-center border-t border-gray-100 bg-gray-50/50 py-6 mt-8">
                <BannerAd width={300} height={250} />
              </div>
            )}

          {showToolFooter && !isCalculatorPage && !isBlogPage && !isNewsPage && (
            <ToolQualityFooter toolName={toolName} />
          )}
        </main>
      </div>

      {/* Footer — hidden on homepage for clean chat UI */}
      {!isHomePage && <Footer />}
      <ConsentBanner />

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};
