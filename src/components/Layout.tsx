import React from 'react';
import BeautifulFooter from './BeautifulFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow" style={{ contain: 'layout style paint' }} role="main" id="main-content">
              {children}
        </main>
      <BeautifulFooter />
    </div>
  );
};
