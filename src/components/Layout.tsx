import React from 'react';
import ModernNavbar from './ModernNavbar';
import BeautifulFooter from './BeautifulFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ModernNavbar />
      <main className="flex-grow pt-16" style={{ contain: 'layout style paint' }} role="main" id="main-content">
        {children}
      </main>
      <BeautifulFooter />
    </div>
  );
};
