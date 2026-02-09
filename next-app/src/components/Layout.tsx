import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import UniversalCanonical from './UniversalCanonical';
import { Sidebar } from './Sidebar';
import { useLocation } from '../lib/router-compat';
import CookieConsent from './CookieConsent';

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <UniversalCanonical />
      <CookieConsent />
      
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex pt-16">
        {!isHomePage && !isMoneyPage && !isNewsPage && (
          <>
            <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-white">
              <Sidebar />
            </aside>

            {/* Mobile Sidebar - CSS transitions (framer-motion removed for bundle size) */}
            {sidebarOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
                  onClick={() => setSidebarOpen(false)}
                  style={{ animation: 'fadeIn 0.2s ease-out' }}
                />
                <div
                  className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white z-50 lg:hidden shadow-xl border-r border-gray-200"
                  style={{ animation: 'slideIn 0.3s ease-out' }}
                >
                  <Sidebar />
                </div>
              </>
            )}
          </>
        )}
        
        <main className="flex-1 min-w-0">
          <div key={location.pathname} className="h-full animate-contentIn" style={{ animation: 'contentIn 0.2s ease-out' }}>
            {children}
          </div>
        </main>
      </div>

      <Footer />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(-300px); } to { transform: translateX(0); } }
        @keyframes slideInFromLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes contentIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};
