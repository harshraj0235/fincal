import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import UniversalCanonical from './UniversalCanonical';
import { Sidebar } from './Sidebar';
import { useLocation } from '../lib/router-compat';
import CookieConsent from './CookieConsent';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const isHomePage = location.pathname === '/';
  const isMoneyPage = location.pathname.startsWith('/money/');
  const isNewsPage = location.pathname.startsWith('/news');
  const isCalculatorPage = location.pathname.includes('/calculators/');
  const isBlogPage = location.pathname.includes('/blog');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // Close sidebar when route changes
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <UniversalCanonical />
      <CookieConsent />
      
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Layout */}
      <div className="flex-1 flex pt-16">
        {/* Sidebar for non-home pages */}
        {!isHomePage && !isMoneyPage && !isNewsPage && (
          <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
              <Sidebar />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
              {sidebarOpen && (
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
          </>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
