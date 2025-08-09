import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';
import CookieConsent from './CookieConsent';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isMoneyPage = location.pathname.startsWith('/money/');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
        
      <main className="flex-grow flex">
        {/* Show Sidebar on all pages except home and /money/* routes */}
        {!isHomePage && !isMoneyPage && (
            <div className="hidden lg:block w-64 bg-neutral-50 border-r border-neutral-200">
            <Sidebar />
          </div>
        )}
          
          <div className="flex-1">
            {children}
        </div>
      </main>
        
      <Footer />
      <CookieConsent />
    </div>
  );
};
