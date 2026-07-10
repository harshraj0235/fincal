import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveAd } from '../BannerAd';

interface MasterArticleLayoutProps {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  hero?: React.ReactNode;
  maxWidth?: string;
}

const MasterArticleLayout: React.FC<MasterArticleLayoutProps> = ({
  children,
  leftSidebar,
  rightSidebar,
  hero,
  maxWidth = 'max-w-4xl'
}) => {
  return (
    <div className="bg-gray-50/50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_350px] gap-8 items-start">
          
          {/* Left Sidebar - Sticky Social Bar */}
          <aside className="hidden lg:block sticky top-32 h-fit">
            {leftSidebar}
          </aside>
 
          {/* Main Content Column */}
          <main className={`${maxWidth} mx-auto w-full`}>
            {hero && <div className="w-full">{hero}</div>}
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-b-2xl p-6 md:p-12 pt-0 md:pt-0 shadow-md border border-gray-100 border-t-0 overflow-hidden"
            >
              {children}
              <div className="mt-12 border-t border-gray-100 pt-8">
                  <ResponsiveAd slot="article-bottom" />
              </div>
            </motion.article>
          </main>

          {/* Right Sidebar - Trending / Related Tools */}
          <aside className="hidden lg:block sticky top-32 h-fit space-y-8">
            {rightSidebar}
          </aside>

          {/* Mobile Floating Action Bar (Optional replacement for left sidebar) */}
          <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
            {/* Logic for mobile share usually goes in specific page, but layout provides the slot if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterArticleLayout;
