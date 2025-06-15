import React, { Suspense } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';

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
          <div className="hidden md:block w-64 flex-shrink-0">
            <Sidebar />
          </div>
        )}
        <div className={`flex-grow ${isHomePage || isMoneyPage ? '' : 'p-6'}`}>
          <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};
