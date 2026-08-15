import React, { ReactNode } from 'react';
import { CalculatorConfig } from '../types';
import { OmniWidget } from './OmniWidget';
import { useOmniEngine } from '../useOmniEngine';

interface OmniCalculatorLayoutProps {
  config: CalculatorConfig;
  children: ReactNode;
  renderCustomBottomWidget?: (engine: ReturnType<typeof useOmniEngine>) => ReactNode;
}

export const OmniCalculatorLayout: React.FC<OmniCalculatorLayoutProps> = ({ config, children, renderCustomBottomWidget }) => {
  const engine = useOmniEngine(config);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top: The Interactive Omni Widget */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        <OmniWidget config={config} engine={engine} />
      </div>

      {/* Custom Bottom Widget (e.g., Amortization Schedule tables) */}
      {renderCustomBottomWidget && (
         <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            {renderCustomBottomWidget(engine)}
         </div>
      )}
      
      {/* Bottom: The Legacy SEO Article Content */}
      <div className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 prose prose-lg dark:prose-invert">
          {children}
        </article>
      </div>
    </div>
  );
};
